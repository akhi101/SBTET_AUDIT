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
using SoftwareSuite.Models;
//using RestSharp;
using SoftwareSuite.Models.Security;
using RestSharp;
using System.Web;
using SoftwareSuite.Models.IVC;

namespace SoftwareSuite.Controllers
{
    public class IVCSystemUserController : ApiController
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

        public class SystemUserencypass
        {
            public int id { get; set; }
            public string UserName { get; set; }
            public string UserPassword { get; set; }
            public string EncriptedPassword { get; set; }
        }


        [HttpPost, ActionName("GetIVCUserLogin")]
        public async Task<HttpResponseMessage> GetIVCUserLogin()
        {
            string token = "";
            var data = await Request.Content.ReadAsStringAsync();
            var res = data.Split(new string[] { "$$@@$$" }, StringSplitOptions.None);
            var crypt = new HbCrypt(res[2]);
            var passcrypt = new HbCrypt();
            string UserName = crypt.AesDecrypt(res[1]);
            string UserPassDecrypt1 = crypt.AesDecrypt(res[0]).Replace("'", "''");
            string UserPassword = passcrypt.AesDecrypt(UserPassDecrypt1);
            string encryptpassword = passcrypt.Encrypt(UserPassword);
            string SessionID = res[3];
            string Type = res[4];
            //int id = res[4];

            string clientIPAddress = System.Web.HttpContext.Current.Request.UserHostAddress;
            IVCSystemUserBLL IVCSystemUserBLL = new IVCSystemUserBLL();
            IVCSystemUserAuth User;
            User = IVCSystemUserBLL.GetIVCUserLogin(UserName.Replace("'", "''"), encryptpassword, clientIPAddress, SessionID, Type);

            if (User.IVCSystemUser.Count > 0 && User.IVCUserAuth[0].ResponceCode == "200" && Type == "official")
            {
                //string decryptpassword = passcrypt.AesDecrypt(ForgetRes.RegistrationPassword);

                var u = User.IVCSystemUser[0];
                IVCAuthToken t = new IVCAuthToken { UserTypeID = u.UserTypeID, UserID = u.UserID, UserTypeName = u.UserTypeName, ExpiryDate = DateTime.Now.AddHours(1) };

                token = crypt.Encrypt(JsonConvert.SerializeObject(t));
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, new { token, data = User, clientIPAddress });
                return response;

            }

            else if (User.IVCSystemUser.Count > 0 && User.IVCUserAuth[0].ResponceCode == "200" && Type == "student")
            {
                //string decryptpassword = passcrypt.AesDecrypt(ForgetRes.RegistrationPassword);

                var u = User.IVCSystemUser[0];
                IVCAuthToken t = new IVCAuthToken { UserTypeID = u.UserTypeID, UserID = u.UserID, UserTypeName = u.UserTypeName, ExpiryDate = DateTime.Now.AddHours(1) };

                token = crypt.Encrypt(JsonConvert.SerializeObject(t));
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, new { token, data = User, clientIPAddress });
                return response;

            }
            else
            {
                var u = User.IVCSystemUser[0];
                IVCAuthToken t = new IVCAuthToken { UserTypeID = u.UserTypeID, UserID = u.UserID, UserTypeName = u.UserTypeName, ExpiryDate = DateTime.Now.AddHours(1) };

                token = crypt.Encrypt(JsonConvert.SerializeObject(t));
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, new { token, data = User });
                return response;

            }

        }


        [HttpPost, ActionName("GetIVCUserLogout")]
        public HttpResponseMessage GetIVCUserLogout([FromBody] JsonObject data)
        {
            try
            {
                string DataType = data["DataType"].ToString();
                string UserName = data["UserName"].ToString();
                string clientIPAddress = System.Web.HttpContext.Current.Request.UserHostAddress;
                string SessionID = data["SessionID"].ToString();
                IVCSystemUserBLL IVCSystemUserBLL = new IVCSystemUserBLL();
                var User = IVCSystemUserBLL.GetIVCUserLogout(DataType, UserName.Replace("'", "''"), clientIPAddress, SessionID);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, User);
                return response;

            }
            catch (Exception ex)
            {
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.NotFound, ex.Message);
                return response;
            }

        }

    }
}
