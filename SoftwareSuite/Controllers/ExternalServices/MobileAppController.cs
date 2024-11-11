using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using SoftwareSuite.BLL;
using SoftwareSuite.Models.Database;

namespace SoftwareSuite.Controllers.ExternalServices
{

   
    public class MobileAppController : ApiController
    {

        public class AppInfo
        {
            public bool IsUpdateReleased { get; set; }
            public string UpdateDescription { get; set; }
            public string UpdateVersion { get; set; }
            public bool IsInMaintainance { get; set; }
            public string ManitainanceDescription { get; set; }

        }


        [HttpGet, ActionName("MaintainanceInfo")]
        public HttpResponseMessage MaintainanceInfo()
        {         

            try
            {           
                var dbHandler = new dbHandler();
                string StrQuery = "";
                StrQuery = "exec USP_GET_MobileAppSettingData";
                var DS = dbHandler.ReturnDataSet(StrQuery);
                List<AppInfo> AppInfo = DS.Tables[1].DataTableToList<AppInfo>().ToList();              
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, AppInfo);
                return response;

            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_GET_MobileAppSettingData", 0, ex.Message);
                var retMsg = "{\"status\":\"400\",\"statusdesc\": \"" + ex.Message + "\"}";
                return Request.CreateResponse(HttpStatusCode.OK, retMsg);
            }
        }

        
    }
}
