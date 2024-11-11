using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace SoftwareSuite.Controllers.PaymentGateway
{
    public class TwalletController : ApiController
    {
        #region GetMethod
        [HttpGet, ActionName("getCipherRequest")]
        public HttpResponseMessage getCipherRequest(string Callbackurl, string addInfo1, string addInfo2, string addInfo3, string addInfo4, string chalanaNo, string amount)
        {

            try
            {
               var agencycode = ConfigurationManager.AppSettings["agencycode"];
               var agencyName = ConfigurationManager.AppSettings["agencyName"].ToString();
                SoftwareSuite.Models.Security.TwalletCrypt CheckSum = new SoftwareSuite.Models.Security.TwalletCrypt();
                var hash = CheckSum.RequestCipher(Callbackurl, agencycode, agencyName, addInfo1, addInfo2, addInfo3, addInfo4, chalanaNo, amount);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, hash);
                return response;
            }
            catch (Exception ex)
            {
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
                return response;
            }

        }
        #endregion
    }
}
