using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Configuration;
using Newtonsoft.Json;
using System.Web.Http;
using SoftwareSuite.Models.Database;
using System.Net.Http;
using System.Net;
using System.Data.SqlClient;
using System.Data;

namespace SoftwareSuite.Controllers.ExternalServices
{
    public class QbgdController : ApiController
    {
        [HttpGet, ActionName("GetTimetale")]
        public HttpResponseMessage GetTimetale(HttpRequestMessage request)
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
                var dt = db.ReturnDataWithStoredProcedure("USP_GET_DataForEDEP", param);
                // List<BranchData> BranchData = dt.DataTableToList<BranchData>().ToList();
                var data = JsonConvert.SerializeObject(dt);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, data);
                return response;

            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_GET_DataForEDEP", 0, ex.Message);
                var retMsg = "{\"status\":\"400\",\"statusdesc\": \"" + ex.Message + "\"}";
                return Request.CreateResponse(HttpStatusCode.OK, retMsg);
            }
        }

        [HttpGet, ActionName("getSubjectList")]
        public HttpResponseMessage getSubjectList(HttpRequestMessage request)
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
                dbHandler dbHandler = new dbHandler();
                string StrQuery = "";
                StrQuery = "exec USP_SS_GET_SubjectMaster";
                DataTable ds = dbHandler.ReturnData(StrQuery);
                // List<BranchData> BranchData = dt.DataTableToList<BranchData>().ToList();
                var data = JsonConvert.SerializeObject(ds);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, data);
                return response;

            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_SS_GET_SubjectMaster", 0, ex.Message);
                var retMsg = "{\"status\":\"400\",\"statusdesc\": \"" + ex.Message + "\"}";
                return Request.CreateResponse(HttpStatusCode.OK, retMsg);
            }
        }

        [HttpGet, ActionName("getBranchInfo")]
        public HttpResponseMessage getBranchInfo(HttpRequestMessage request)
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
                dbHandler dbHandler = new dbHandler();
                string StrQuery = "";
                StrQuery = "exec USP_COM_M_GET_Branches";
                DataTable ds = dbHandler.ReturnData(StrQuery);
                // List<BranchData> BranchData = dt.DataTableToList<BranchData>().ToList();
                var data = JsonConvert.SerializeObject(ds);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, data);
                return response;

            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_COM_M_GET_Branches", 0, ex.Message);
                var retMsg = "{\"status\":\"400\",\"statusdesc\": \"" + ex.Message + "\"}";
                return Request.CreateResponse(HttpStatusCode.OK, retMsg);
            }
        }
    }
}
