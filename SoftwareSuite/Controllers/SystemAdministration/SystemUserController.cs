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
using RestSharp;
using System.Web.Script.Serialization;
using SoftwareSuite.Models.Security;
using SoftwareSuite.Models.Database;
using SoftwareSuite.BLL;
using System.Net.Http.Headers;
using System.Web;

namespace SoftwareSuite.Controllers.SystemAdministration
{
    public class SystemUserController : ApiController
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

        #region GetMethod
        public class SystemUserencypass
        {
            public int id { get; set; }
            public string UserName { get; set; }
            public string UserPassword { get; set; }
            public string EncriptedPassword { get; set; }
        }

        [HttpPost, ActionName("GetUserLogin")]
        public async Task<HttpResponseMessage> GetUserLogin()
        {
            string token = "";
            var data = await Request.Content.ReadAsStringAsync();
            var res = data.Split(new string[] { "$$@@$$" }, StringSplitOptions.None);
            var crypt = new HbCrypt(res[2]);
            var passcrypt = new HbCrypt();
            string UserName = crypt.AesDecrypt(res[1]);
            string Password = crypt.AesDecrypt(res[0]).Replace("'", "''");
            string encrypassword = passcrypt.Encrypt(Password);
            string clientIpAddress = System.Web.HttpContext.Current.Request.UserHostAddress;
            SystemUserBLL SystemUserBLL = new SystemUserBLL();
            SystemUserAuth User;
            User = SystemUserBLL.GetUserLogin(UserName.Replace("'", "''"), encrypassword, clientIpAddress);
          
            if (User.SystemUser.Count > 0 && User.UserAuth[0].ResponceCode == "200")
            {
                var u = User.SystemUser[0];
                AuthToken t = new AuthToken { UserId = u.UserId, UserTypeId = u.UserTypeId, CollegeCode = u.CollegeCode, collegeType=u.collegeType, ExpiryDate = DateTime.Now.AddHours(1) };

                token = crypt.Encrypt(JsonConvert.SerializeObject(t));
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, new { token, data = User, clientIpAddress });
                return response;

            }
            else
            {
                var u = User.SystemUser[0];
                AuthToken t = new AuthToken { UserId = u.UserId, UserTypeId = u.UserTypeId, CollegeCode = u.CollegeCode, collegeType = u.collegeType, ExpiryDate = DateTime.Now.AddHours(1) };

                token = crypt.Encrypt(JsonConvert.SerializeObject(t));
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, new { token, data = User });
                return response;

            }

        }


        [HttpGet]
        public string DecryptCipher(string ciphertxt)
        {                  
            var crypt = new HbCrypt();
            string msg = crypt.Decrypt(ciphertxt);
            return msg;
        }

        [HttpPost]
        public string encryptPasswords()
        {
            SystemUserencypass SystemUserencypass = new SystemUserencypass();
            var dbHandler = new dbHandler();
            DataTable tblSystemUser = new DataTable();
            var StrQuery = "exec USP_GET_UserIdsPasswordBulk";
            var crypt = new HbCrypt();
            tblSystemUser = dbHandler.ReturnData(StrQuery);
            List<SystemUserencypass> passwordList = tblSystemUser.DataTableToList<SystemUserencypass>().ToList();
            var SystemUserencypasslist = new List<SystemUserencypass>();
            int size = tblSystemUser.Rows.Count;
            var length = passwordList.Count;
            for (int i = 0; i < length; i++)
            {
                passwordList[i].EncriptedPassword = crypt.Encrypt(passwordList[i].UserPassword);

                //tblSystemUser.Rows[i]["EncriptedPassword"] = crypt.Encrypt(tblSystemUser.Rows[i]["UserPassword"].ToString());

                SystemUserencypasslist.Add(passwordList[i]);
            }
            var json = new JavaScriptSerializer().Serialize(SystemUserencypasslist);
            var param = new SqlParameter[1];
            param[0] = new SqlParameter("@json", json);
            var res = dbHandler.ReturnDataWithStoredProcedureTable("USP_SET_UserIdsPasswordBulk", param);
            return "";
        }


        [HttpPost]
        public async Task<HttpResponseMessage> GetCheckOldPassword()
        {
            var data = await Request.Content.ReadAsStringAsync();
            var res = data.Split(new string[] { "$$@@$$" }, StringSplitOptions.None);
            var crypt = new HbCrypt(res[2]);
            int LoggedUserId = Int32.Parse(crypt.AesDecrypt(res[1]));
            string OldPassword = crypt.AesDecrypt(res[0]);
            SystemUserBLL SystemUserBLL = new SystemUserBLL();
            var dt = SystemUserBLL.GetCheckOldPassword(OldPassword.Replace("'", "''"), LoggedUserId);
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
            return response;
        }
        [HttpPost]
        public async Task<HttpResponseMessage> GetForgetPassword()
        {

            var data = await Request.Content.ReadAsStringAsync();
            var res = data.Split(new string[] { "$$@@$$" }, StringSplitOptions.None);
            var crypt = new HbCrypt(res[2]);
            string LoginName = crypt.AesDecrypt(res[0]);
            long CellNo = Convert.ToInt64(crypt.AesDecrypt(res[1]));
            string mobile = crypt.AesDecrypt(res[1]);
            SystemUserBLL SystemUserBLL = new SystemUserBLL();
            SystemRes ForgetRes = new SystemRes();
            var passcrypt = new HbCrypt();
            ForgetRes = SystemUserBLL.GetForgetPassword(LoginName.Replace("'", "''"), CellNo);
            string retMsg = string.Empty;
            if (ForgetRes.ResponceCode == "200" && ForgetRes.userType == "sbtet")
            {
                try {
                    string decryptpassword = passcrypt.Decrypt(ForgetRes.Password);
                    string url = ConfigurationManager.AppSettings["SMS_API"].ToString();
                    //string smsusername = ConfigurationManager.AppSettings["SMS_Service_Username"].ToString();
                    //string smspassword = ConfigurationManager.AppSettings["SMS_Service_Password"].ToString();
                    //SBTET Portal Login Credentials, UserName = {#var#}, Password = {#var#}, Secretary,SBTET TS.1007161786891783450


                    string Msg = "SBTET Portal Login Credentials, UserName = {0}, Password = {1}, Secretary,SBTET TS.";
                    var Message = string.Format(Msg, LoginName.Replace("'", "''"), decryptpassword);
                    string urlParameters = "?mobile=" + mobile + "&message=" + HttpUtility.UrlEncode(Message) +"&templateid=1007161786891783450"; 
                    HttpClient client = new HttpClient();
                    client.BaseAddress = new Uri(url);
                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                    HttpResponseMessage response = client.GetAsync(urlParameters).Result;
                    retMsg = "{\"status\":\"" + ForgetRes.ResponceCode + "\",\"statusdesc\": \"" + ForgetRes.ResponceDescription + "\"}";
                    return Request.CreateResponse(HttpStatusCode.OK, retMsg);
                } catch (Exception ex) {
                    retMsg = "{\"status\":\"400\",\"statusdesc\": \"" + ex.Message + "\"}";
                    return Request.CreateResponse(HttpStatusCode.OK, retMsg);
                }
            }
            else if (ForgetRes.ResponceCode == "200" && ForgetRes.userType == "twsh") {
                try
                {
                   // string decryptpassword = passcrypt.Decrypt(ForgetRes.Password);
                    string url = ConfigurationManager.AppSettings["SMS_API"].ToString();
                    //string smsusername = ConfigurationManager.AppSettings["SMS_Service_Username"].ToString();
                    //string smspassword = ConfigurationManager.AppSettings["SMS_Service_Password"].ToString();
                    string Msg = "SBTET Portal Login Credentials, UserName = {0}, Password = {1}, Secretary,SBTET TS.";
                    var Message = string.Format(Msg, LoginName.Replace("'", "''"), ForgetRes.Password);
                    string urlParameters = "?mobile=" + mobile + "&message=" + HttpUtility.UrlEncode(Message) + "&templateid=1007161786891783450";
                    HttpClient client = new HttpClient();
                    client.BaseAddress = new Uri(url);
                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                    HttpResponseMessage response = client.GetAsync(urlParameters).Result;
                    retMsg = "{\"status\":\"" + ForgetRes.ResponceCode + "\",\"statusdesc\": \"" + ForgetRes.ResponceDescription + "\"}";
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
                retMsg = "{\"status\":\"" + ForgetRes.ResponceCode + "\",\"statusdesc\": \"" + ForgetRes.ResponceDescription + "\"}";
                return Request.CreateResponse(HttpStatusCode.OK, retMsg);

            }

        }

        [HttpPost]
        public async Task<HttpResponseMessage> GetForgotPassword()
        {

            var data = await Request.Content.ReadAsStringAsync();
            var res = data.Split(new string[] { "$$@@$$" }, StringSplitOptions.None);
            var crypt = new HbCrypt(res[1]);
            string UserName = crypt.AesDecrypt(res[0]);
            SystemUserBLL SystemUserBLL = new SystemUserBLL();
            SystemRes ForgetRes = new SystemRes();
            var passcrypt = new HbCrypt();
            ForgetRes = SystemUserBLL.GetForgotPassword(UserName.Replace("'", "''"));
            string retMsg = string.Empty;             
            if (ForgetRes.ResponceCode == "200")
            {
                try
                {
                    string decryptpassword = passcrypt.Decrypt(ForgetRes.Password);
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
                retMsg = "{\"status\":\"" + ForgetRes.ResponceCode + "\",\"statusdesc\": \"" + ForgetRes.ResponceDescription + "\"}";
                return Request.CreateResponse(HttpStatusCode.OK, retMsg);

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
                    var res = JsonConvert.DeserializeObject<ReCaptcha>(resContent);
                    if (res.score > 0.5)
                    {
                        return res.Success;
                    }
                    else {
                        return false;
                    }
                   
                }
                catch (Exception ex)
                {
                    return false;
                }
            }
        }

                     

        [HttpPost]
        public async Task<HttpResponseMessage> GetChangePassword()
        {
            var data = await Request.Content.ReadAsStringAsync();
            var res = data.Split(new string[] { "$$@@$$" }, StringSplitOptions.None);
            var crypt = new HbCrypt(res[3]);
            string NewPassword = crypt.AesDecrypt(res[0]).Replace("'", "''");
            string oldPassword = crypt.AesDecrypt(res[1]).Replace("'", "''");
            int UserID = Int32.Parse(crypt.AesDecrypt(res[2]));
            var passcrypt = new HbCrypt();
            SystemUserBLL SystemUserBLL = new SystemUserBLL();
            SystemRes SystemRes = new SystemRes();
            var encOldpass = passcrypt.Encrypt(oldPassword);
            var encNewpass = passcrypt.Encrypt(NewPassword);
            SystemRes = SystemUserBLL.GetChangePassword(UserID, encOldpass, encNewpass);
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, SystemRes);
            return response;
        }


        [HttpGet, ActionName("GetLoginAccess")]
        public HttpResponseMessage GetLoginAccess(string UserName)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@username", UserName);
                Debug.WriteLine("param" + param);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("USP_GET_LOGIN_PERMISSION", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_GET_LOGIN_PERMISSION", 0, ex.Message);
                throw ex;
            }
        }

        #endregion
        #region PostMethod
        [HttpPost, ActionName("PostLoginLog")]
        public HttpResponseMessage PostLoginLog([FromBody]LogSystemUser reqdata)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@username", reqdata.UserName);
                string clientIpAddress = System.Web.HttpContext.Current.Request.UserHostAddress;
                param[1] = new SqlParameter("@ipaddress", clientIpAddress);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_lOGIN_LOG", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_lOGIN_LOG", 0, ex.Message);
                throw ex;
            }
        }

        [HttpPost, ActionName("PostLogoutLog")]
        public HttpResponseMessage PostLogoutLog([FromBody]LogSystemUser reqdata)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@username", reqdata.UserName);
                string clientIpAddress = System.Web.HttpContext.Current.Request.UserHostAddress;
                param[1] = new SqlParameter("@ipaddress", clientIpAddress);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_lOGOUT_LOG", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_lOGOUT_LOG", 0, ex.Message);
                throw ex;
            }
        }
        #endregion

    }
}
