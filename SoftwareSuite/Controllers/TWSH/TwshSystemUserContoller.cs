using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Net.Http;
using System.Data.SqlClient;
using System.Net;
using Newtonsoft.Json;
using System.Web.Http;
using SoftwareSuite.Models.TWSH;
using SoftwareSuite.Models.Database;
using SoftwareSuite.Controllers.ExternalServices;
using SoftwareSuite.Models.Security;
using System.Threading.Tasks;

namespace SoftwareSuite.Controllers.TWSH
{
    public class TwshSystemUserController : ApiController
    {
        //[HttpPost, ActionName("PostCredentials")]
       
        public async Task<HttpResponseMessage> PostCredentials()
        {
            try
            {
               
                var data = await Request.Content.ReadAsStringAsync();
                var res = data.Split(new string[] { "$$@@$$" }, StringSplitOptions.None);
                var crypt = new HbCrypt(res[2]);
                var passcrypt = new HbCrypt();
                string UserName = crypt.AesDecrypt(res[1]);
                string Password = crypt.AesDecrypt(res[0]).Replace("'", "''");

                var dbHandler = new Twshdbandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@UserName", UserName);
                param[1] = new SqlParameter("@Password", Password);
                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_GET_UserLoginPermission", param);

                if (((dt.Tables[1].Rows[0]["UserTypeId"]).ToString() == "1" || (dt.Tables[1].Rows[0]["UserTypeId"]).ToString() == "2") && (dt.Tables[1].Rows[0]["IsHighSchool"]).ToString() == "0" && dt.Tables[1].Rows[0]["UserTypeId"] != DBNull.Value) {
                    var sso = new SsoController();
                    var ssoauthobj = new SsoAuthenticateObj();
                   ssoauthobj.OrgId = "";
                    ssoauthobj.Username = UserName;
                    ssoauthobj.Password = Password;
                   var resp = sso.Authenticate(ssoauthobj);
                    String[] ssoresp = resp.Split('|');
                    if (ssoresp[0].ToString() == "IsValidUser=true") {
                        return Request.CreateResponse(HttpStatusCode.OK, dt);
                    } else if (ssoresp[0].ToString() == "IsValidUser=false") {
                        return Request.CreateResponse(HttpStatusCode.OK, "");
                    }
                    else {
                        return Request.CreateResponse(HttpStatusCode.OK, "");
                    }
                }
                else if (((dt.Tables[1].Rows[0]["UserTypeId"]).ToString() == "3" || ((dt.Tables[1].Rows[0]["UserTypeId"]).ToString() == "2" && (dt.Tables[1].Rows[0]["IsHighSchool"]).ToString() == "1")) && dt.Tables[1].Rows[0]["UserTypeId"] != DBNull.Value) {
                    return Request.CreateResponse(HttpStatusCode.OK, dt);
                }
                return Request.CreateResponse(HttpStatusCode.OK, dt);

            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }

    }
}
