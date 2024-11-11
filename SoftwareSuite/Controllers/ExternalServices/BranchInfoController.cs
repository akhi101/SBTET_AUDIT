using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Configuration;
using Newtonsoft.Json;
using System.Web.Http;
using SoftwareSuite.Models.Database;
using SoftwareSuite.BLL;
using System;
using System.Data.SqlClient;

namespace SoftwareSuite.Controllers.ExternalServices
{
    public class BranchData
    {
        public string CollegeCode { get; set; }
        public string CollegeName { get; set; }
        public string CollegeNo { get; set; }
        public string PrincipalName { get; set; }
        public string PrincipalNo { get; set; }
        public string Type { get; set; }
        public string BranchCode { get; set; }
        public string BranchName { get; set; }
    }
        public class BranchInfoController : ApiController
    {
        [HttpGet, ActionName("GetBranchesBycollege")]
        public HttpResponseMessage 
            GetBranchesBycollege(HttpRequestMessage request)
        {

            try
            {
                var apikey = request.Headers.GetValues("apiKey").FirstOrDefault();
                var apikeyOrig = ConfigurationManager.AppSettings["QBGDDataSharingApiKey"].ToString();
                if (apikey != apikeyOrig)
                {
                    var response = Request.CreateResponse(HttpStatusCode.Forbidden);
                    response.Content = new StringContent(JsonConvert.SerializeObject("{\"respcode\":\"403\",\"respdesc\" = \"Invalid Api Key\"\" }"), System.Text.Encoding.UTF8, "application/json");

                    return response;
                }
            }
            catch (Exception ex)
            {
                var response = Request.CreateResponse(HttpStatusCode.Forbidden);
                response.Content = new StringContent(JsonConvert.SerializeObject("{\"respcode\":\"403\",\"respdesc\" = \"Invalid Api Key\"\" }"), System.Text.Encoding.UTF8, "application/json");
                return response;
            }

            try
            {

                IDictionary<string, string> queryParams = request.GetQueryNameValuePairs().ToDictionary(x => x.Key, x => x.Value);
                var db = new dbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@ExamMonthYearId", Convert.ToInt32(queryParams["ExamMonthYearId"]));
                param[1] = new SqlParameter("@StudentTypeId", Convert.ToInt32(queryParams["StudentTypeId"]));
                param[2] = new SqlParameter("@ExamTypeId", Convert.ToInt32(queryParams["ExamTypeId"]));
                var dt = db.ReturnDataWithStoredProcedure("USP_EXTS_GET_BranchBYcollege", param);             
               // List<BranchData> BranchData = dt.DataTableToList<BranchData>().ToList();
                var data = JsonConvert.SerializeObject(dt);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, data);
                return response;

            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_EXTS_GET_BranchBYcollege", 0, ex.Message);
                var retMsg = "{\"status\":\"400\",\"statusdesc\": \"" + ex.Message + "\"}";
                return Request.CreateResponse(HttpStatusCode.OK, retMsg);
            }
        }

    }
}
