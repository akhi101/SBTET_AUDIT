using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using Newtonsoft.Json;
using SoftwareSuite.BLL;
using SoftwareSuite.Models.Security;
using SoftwareSuite.Services;

namespace SoftwareSuite.Controllers.ExternalServices
{
    public class SsoController : ApiController
    {
        public readonly ExternalPortalService _eps;
        public SsoController()
        {
            _eps = new ExternalPortalService();
        }

        [HttpPost, ActionName("Authenticate")]
        public string Authenticate(SsoAuthenticateObj data)
        {
            var ekey = _eps.GetEncryptionKeyByOrgId(data.OrgId);
            var crypt = new HbCrypt();
            string encrypassword = crypt.Encrypt(data.Password);
            var userBll = new SystemUserBLL();
            var User = userBll.GetUserLogin(data.Username.Replace("'", "''"), encrypassword, "");
            if (User.SystemUser.Count > 0 && User.UserAuth[0].ResponceCode == "200")
            {
                return $"IsValidUser=true|SessionTimeOut={DateTime.Now.AddHours(3)}";
            }
            else
            {
                return $"IsValidUser=false|SessionTimeOut={DateTime.Now}";
            }
        }

        public async Task<string> ResetPassword(SsoResetPasswordObj data)
        {
            var ekey = _eps.GetEncryptionKeyByOrgId(data.OrgId);
            try
            {
                var newPasswd = GetNewPassword();
                var crypt = new HbCrypt();
                string encrypassword = crypt.Encrypt(newPasswd);
                var dt = _eps.ResetPassword(data.Username, encrypassword);
                if (dt.Rows.Count > 0)
                {
                    var mob = dt.Rows[0]["CellNo"].ToString();
                    if (mob.Length > 7)
                    {
                        var sms = new SmsService();
                        var res = await sms.SendSms(mob, $"Your password has been reset as per request from {data.OrgId}, Your new password is: {newPasswd}.\nSecretary, TSSBTET");
                        if (res.Contains("error"))
                        {
                            return "Status=Failure|Message=Sms Sending Failed. Password Not Reset.";
                        }
                        else
                        {
                            return "Status=Success|Message=Password Sent to Users Mobile";
                        }
                    }
                    else
                    {
                        return "Status=Failure|Message=User Mobile Number Not Found";
                    }
                }
                return "Status=Failure|Message=User Not Found";
            }
            catch (Exception ex)
            {
                return "Status=Failure|Message=Server Error";
            }
        }

        private string GetNewPassword()
        {
            var builder = new StringBuilder();
            var random = new Random();
            char ch;
            for (int i = 0; i < 10; i++)
            {
                ch = Convert.ToChar(Convert.ToInt32(Math.Floor(26 * random.NextDouble() + 65)));
                builder.Append(ch);
            }
            return builder.ToString().ToLower();
        }
    }

    public class SsoAuthenticateObj
    {
        public string OrgId { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
    }

    public class SsoResetPasswordObj
    {
        public string OrgId { get; set; }
        public string Username { get; set; }
    }
}
