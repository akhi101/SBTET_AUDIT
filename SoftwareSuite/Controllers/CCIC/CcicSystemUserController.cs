using System;
using System.Collections.Generic;
using System.Linq;
using System.Data;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Data.SqlClient;
using System.Diagnostics;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using System.Configuration;
using System.Web.Script.Serialization;
using SoftwareSuite.Models.Database;
using SoftwareSuite.BLL;
using System.Net.Http.Headers;
using SoftwareSuite.BLL.CCIC;
using SoftwareSuite.Models.CCIC;
using RestSharp;
using SoftwareSuite.Models.Security;
using static SoftwareSuite.BLL.CcicSystemUserBLL;

namespace SoftwareSuite.Controllers.CCIC
{
    public class CcicSystemUserController : ApiController
    {
        public string GetEKey()
        {
            StringBuilder builder = new StringBuilder();
            Random random = new Random();
            char ch;
            for (int i = 0; i < 10; i++)
            {
                ch = Convert.ToChar(Convert.ToInt32(Math.Floor(26 * random.NextDouble() + 65)));
                builder.Append(ch);
            }
            return builder.ToString().ToLower();
        }

        public string GetSessionEkey()
        {
            StringBuilder builder = new StringBuilder();
            Random random = new Random();
            char ch;
            for (int i = 0; i < 30; i++)
            {
                ch = Convert.ToChar(Convert.ToInt32(Math.Floor(26 * random.NextDouble() + 65)));
                builder.Append(ch);
            }
            return builder.ToString().ToLower();
        }

        public class CcicSystemUserencypass
        {
            public int id { get; set; }
            public string UserName { get; set; }
            public string UserPassword { get; set; }
            public string EncriptedPassword { get; set; }
        }


        [HttpPost, ActionName("GetCcicUserLogin")]
        public async Task<HttpResponseMessage> GetCcicUserLogin()
        {
            string token = "";
            var data = await Request.Content.ReadAsStringAsync();
            var res = data.Split(new string[] { "$$@@$$" }, StringSplitOptions.None);
            var crypt = new HbCrypt(res[2]);
            var passcrypt = new HbCrypt();
            string UserName = crypt.AesDecrypt(res[1]);
            string UserPassword = crypt.AesDecrypt(res[0]).Replace("'", "''");
            string encrypassword = passcrypt.Encrypt(UserPassword);
            string SessionID= res[3];
            string clientIPAddress = System.Web.HttpContext.Current.Request.UserHostAddress;
            CcicSystemUserBLL CcicSystemUserBLL = new CcicSystemUserBLL();
            CcicSystemUserAuth User;
            User = CcicSystemUserBLL.GetCcicUserLogin(UserName.Replace("'", "''"), encrypassword, clientIPAddress, SessionID);

            if (User.CcicSystemUser.Count > 0 && User.CcicUserAuth[0].ResponceCode == "200")
            {
                var u = User.CcicSystemUser[0];
                CcicAuthToken t = new CcicAuthToken { CourseID = u.CourseID,InstitutionID = u.InstitutionID, InstitutionCode = u.InstitutionCode, InstitutionName =u.InstitutionName, UserTypeID = u.UserTypeID, UserID = u.UserID,ExpiryDate = DateTime.Now.AddHours(1) };

                token = crypt.Encrypt(JsonConvert.SerializeObject(t));
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, new { token, data = User, clientIPAddress });
                return response;

            }
            else
            {
                var u = User.CcicSystemUser[0];
                CcicAuthToken t = new CcicAuthToken { CourseID = u.CourseID, InstitutionID = u.InstitutionID, InstitutionCode = u.InstitutionCode, InstitutionName = u.InstitutionName, UserTypeID = u.UserTypeID, UserID = u.UserID, ExpiryDate = DateTime.Now.AddHours(1) };

                token = crypt.Encrypt(JsonConvert.SerializeObject(t));
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, new { token, data = User });
                return response;

            }

        }


        [HttpPost, ActionName("GetCcicUserLogout")]
        public HttpResponseMessage GetCcicUserLogout([FromBody] JsonObject data)
        {
            try {
                string UserName = data["UserName"].ToString();
                string clientIPAddress = System.Web.HttpContext.Current.Request.UserHostAddress;
                string SessionID = data["SessionID"].ToString();
                CcicSystemUserBLL CcicSystemUserBLL = new CcicSystemUserBLL();
                var User = CcicSystemUserBLL.GetCcicUserLogout(UserName.Replace("'", "''"), clientIPAddress, SessionID);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, User);
                return response;

            }
            catch (Exception ex) {
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.NotFound, ex.Message);
                return response;
            }
          
           

           

        }




        [HttpPost]
        public async Task<bool> ValidateReCaptcha(string encodedResponse)
        {
            var secretkey = ConfigurationManager.AppSettings["ReCaptcha_Secret_Key"];
            if (string.IsNullOrEmpty(encodedResponse))
            {
                return false;
            }
            if (string.IsNullOrEmpty(secretkey))
            {
                return false;
            }
            using (HttpClient client = new HttpClient())
            {
                var url = "https://www.google.com/recaptcha/api/siteverify";
                try
                {
                    string IpAddress = System.Web.HttpContext.Current.Request.UserHostAddress;

                    var googleReply = await client.GetAsync(string.Format(url + "?secret={0}&response={1}&remoteip={2}", secretkey, encodedResponse, IpAddress));
                    var resContent = await googleReply.Content.ReadAsStringAsync();
                    var res = JsonConvert.DeserializeObject<CcicReCaptcha>(resContent);
                    if (res.score > 0.5)
                    {
                        return res.Success;
                    }
                    else
                    {
                        return false;
                    }

                }
                catch (Exception ex)
                {
                    return false;
                }
            }



        }



        [HttpPost, ActionName("GetCcicForgetPassword")]
        public async Task<HttpResponseMessage> GetCcicForgetPassword()
        {

            var data = await Request.Content.ReadAsStringAsync();
            var res = data.Split(new string[] { "$$@@$$" }, StringSplitOptions.None);
            var crypt = new CcicCrypt(res[2]);
            string UserName = crypt.AesDecrypt(res[0]);
            long UserMobile = Convert.ToInt64(crypt.AesDecrypt(res[1]));
            string mobile = crypt.AesDecrypt(res[1]);
            CcicSystemUserBLL CcicSystemUserBLL = new CcicSystemUserBLL();
            CcicSystemRes CcicForgetRes = new CcicSystemRes();
            var passcrypt = new CcicCrypt();
            CcicForgetRes = CcicSystemUserBLL.GetCcicForgetPassword(UserName.Replace("'", "''"),UserMobile);
            string retMsg = string.Empty;
            if (CcicForgetRes.ResponceCode == "200")
            {
                try
                {
                    string decryptpassword = passcrypt.CcicDecrypt(CcicForgetRes.UserPassword);
                    string url = ConfigurationManager.AppSettings["SMS_API"].ToString();
                    //string smsusername = ConfigurationManager.AppSettings["SMS_Service_Username"].ToString();
                    //string smspassword = ConfigurationManager.AppSettings["SMS_Service_Password"].ToString();
                    string Msg = "SBTET Portal Login Credentials, UserName = {0}, UserPassword = {1} , Secretary,SBTET TS.";
                    var Message = string.Format(Msg, UserName.Replace("'", "''"), decryptpassword);
                    string urlParameters = "?mobile=" + mobile + "&message=" + Message + "&templateid=1007161786891783450";
                    HttpClient client = new HttpClient();
                    client.BaseAddress = new Uri(url);
                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                    HttpResponseMessage response = client.GetAsync(urlParameters).Result;
                    retMsg = "{\"status\":\"" + CcicForgetRes.ResponceCode + "\",\"statusdesc\": \"" + CcicForgetRes.ResponceDescription + "\"}";
                    return Request.CreateResponse(HttpStatusCode.OK, retMsg);
                }
                catch (Exception ex)
                {
                    retMsg = "{\"status\":\"400\",\"statusdesc\": \"" + ex.Message + "\"}";
                    return Request.CreateResponse(HttpStatusCode.OK, retMsg);
                }
            }
            else if (CcicForgetRes.ResponceCode == "200")
            {
                try
                {
                    //string decryptpassword = passcrypt.Decrypt(CcicForgetRes.UserPassword);
                    string url = ConfigurationManager.AppSettings["SMS_API"].ToString();
                    //string smsusername = ConfigurationManager.AppSettings["SMS_Service_Username"].ToString();
                    //string smspassword = ConfigurationManager.AppSettings["SMS_Service_Password"].ToString();
                    string Msg = "SBTET Portal Login Credentials, UserName = {0}, Password = {1}, Secretary,SBTET TS.";
                    var Message = string.Format(Msg, UserName.Replace("'", "''"), CcicForgetRes.UserPassword);
                    string urlParameters = "?mobile=" + mobile + "&message=" + Message + "&templateid=1007161786891783450";
                    HttpClient client = new HttpClient();
                    client.BaseAddress = new Uri(url);
                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                    HttpResponseMessage response = client.GetAsync(urlParameters).Result;
                    retMsg = "{\"status\":\"" + CcicForgetRes.ResponceCode + "\",\"statusdesc\": \"" + CcicForgetRes.ResponceDescription + "\"}";
                    return Request.CreateResponse(HttpStatusCode.OK, retMsg);
                }
                catch (Exception ex)
                {
                    retMsg = "{\"status\":\"400\",\"statusdesc\": \"" + ex.Message + "\"}";
                    return Request.CreateResponse(HttpStatusCode.OK, retMsg);

                }
            }
            else
            {
                retMsg = "{\"status\":\"" + CcicForgetRes.ResponceCode + "\",\"statusdesc\": \"" + CcicForgetRes.ResponceDescription + "\"}";
                return Request.CreateResponse(HttpStatusCode.OK, retMsg);

            }

        }

        [HttpPost, ActionName("GetCcicForgotPassword")]
        public async Task<HttpResponseMessage> GetCcicForgotPassword()
        {

            var data = await Request.Content.ReadAsStringAsync();
            var res = data.Split(new string[] { "$$@@$$" }, StringSplitOptions.None);
            var crypt = new CcicCrypt(res[1]);
            string UserName = crypt.AesDecrypt(res[0]);
            CcicSystemUserBLL CcicSystemUserBLL = new CcicSystemUserBLL();
            CcicSystemRes CcicForgetRes = new CcicSystemRes();
            var passcrypt = new CcicCrypt();
            CcicForgetRes = CcicSystemUserBLL.GetCcicForgotPassword(UserName.Replace("'", "''"));
            string retMsg = string.Empty;
            if (CcicForgetRes.ResponceCode == "200")
            {
                try
                {
                    string decryptpassword = passcrypt.CcicDecrypt(CcicForgetRes.UserPassword);
                    return Request.CreateResponse(HttpStatusCode.OK, decryptpassword);
                }
                catch (Exception ex)
                {
                    retMsg = "{\"status\":\"400\",\"statusdesc\": \"" + ex.Message + "\"}";
                    return Request.CreateResponse(HttpStatusCode.OK, retMsg);
                }
            }
            
            else
            {
                retMsg = "{\"status\":\"" + CcicForgetRes.ResponceCode + "\",\"statusdesc\": \"" + CcicForgetRes.ResponceDescription + "\"}";
                return Request.CreateResponse(HttpStatusCode.OK, retMsg);

            }

        }


        [HttpPost]
        public async Task<HttpResponseMessage> GetCcicChangePassword()
        {
            var data = await Request.Content.ReadAsStringAsync();
            var res = data.Split(new string[] { "$$@@$$" }, StringSplitOptions.None);
            var crypt = new HbCrypt(res[3]);
            string NewPassword = crypt.AesDecrypt(res[0]).Replace("'", "''");
            string OldPassword = crypt.AesDecrypt(res[1]).Replace("'", "''");
            int UserID = Int32.Parse(crypt.AesDecrypt(res[2]));
            var passcrypt = new HbCrypt();
            CcicSystemUserBLL CcicSystemUserBLL = new CcicSystemUserBLL();
            CcicSystemRes CcicSystemRes = new CcicSystemRes();
            var encOldpass = passcrypt.Encrypt(OldPassword);
            var encNewpass = passcrypt.Encrypt(NewPassword);
            CcicSystemRes = CcicSystemUserBLL.GetCcicChangePassword(UserID, encOldpass, encNewpass);
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, CcicSystemRes);
            return response;
        }


        [HttpPost]
        public async Task<HttpResponseMessage> GetCcicCheckOldPassword()
        {
            var data = await Request.Content.ReadAsStringAsync();
            var res = data.Split(new string[] { "$$@@$$" }, StringSplitOptions.None);
            var crypt = new HbCrypt(res[2]);
            int LoggedUserId = Int32.Parse(crypt.AesDecrypt(res[1]));
            string OldPassword = crypt.AesDecrypt(res[0]);
            CcicSystemUserBLL CcicSystemUserBLL = new CcicSystemUserBLL();
            var dt = CcicSystemUserBLL.GetCcicCheckOldPassword(OldPassword.Replace("'", "''"), LoggedUserId);
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
            return response;
        }



    }
}
