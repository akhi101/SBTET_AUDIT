using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using SoftwareSuite.Models.Database;

namespace SoftwareSuite.Controllers.ExternalServices
{
    public class PolycetDataController  : ApiController
    {
        //USP_SS_GET_InteriamCertificateDetails

        #region Post Methods
        [HttpPost, ActionName("PostStudentData")]
        public HttpResponseMessage PostStudentData(HttpRequestMessage request)
        {
            try {

                var apikey = request.Headers.GetValues("apikey").FirstOrDefault();
                var apikeyOrig = ConfigurationManager.AppSettings["PolycetDataSharingApiKey"].ToString();
                if (apikey != apikeyOrig) {
                    var response = Request.CreateResponse(HttpStatusCode.Forbidden);
                    response.Content = new StringContent(JsonConvert.SerializeObject("{\"respcode\":\"403\",\"respdesc\" = \"Invalid Api Key\"\" }"), System.Text.Encoding.UTF8, "application/json");                  
                    return response;
                }
            }
            catch (Exception) {
                var response = Request.CreateResponse(HttpStatusCode.Forbidden);
                response.Content = new StringContent(JsonConvert.SerializeObject("{\"respcode\":\"403\",\"respdesc\" = \"Invalid Api Key\"\" }"), System.Text.Encoding.UTF8, "application/json");
                return response;
            }
            try {

                string PolycetDatajson = "" + request.Content.ReadAsStringAsync().Result;
              
                if (PolycetDatajson != "") {
                    var dbHandler = new dbHandler();
                    var param = new SqlParameter[1];
                    param[0] = new SqlParameter("@json", PolycetDatajson);
                    DataTable dt = dbHandler.ReturnDataWithStoredProcedureTable("USP_SET_POLYCETDATA_API_INSERTION", param);

                    if (dt.Rows.Count > 0)
                    {
                        string rescode = (string)dt.Rows[0]["ResponceCode"];
                        string respdesc = (string)dt.Rows[0]["ResponceDescription"];
                        var response = Request.CreateResponse(HttpStatusCode.OK);
                        response.Content = new StringContent(JsonConvert.SerializeObject("{\"respcode\":\"" + rescode + "\",\"respdesc\" : \"" + respdesc + "\"\" }"), System.Text.Encoding.UTF8, "application/json");
                         return response;


                    }
                    else {

                        var response = Request.CreateResponse(HttpStatusCode.InternalServerError);
                        response.Content = new StringContent(JsonConvert.SerializeObject("{\"respcode\":\"500\",\"respdesc\" : \"Server Error\"\" }"), System.Text.Encoding.UTF8, "application/json");
                        return response;

                    }
                }
            }
            catch (FormatException) {

                var response = Request.CreateResponse(HttpStatusCode.NotAcceptable);
                response.Content = new StringContent(JsonConvert.SerializeObject("{\"respcode\":\"406\",\"respdesc\" : \"Unprocessable Entity, Check the json data format \" }"), System.Text.Encoding.UTF8, "application/json");
                return response;
            }
            catch (Exception ex)
            {
                var response = Request.CreateResponse(HttpStatusCode.InternalServerError);
                response.Content = new StringContent(JsonConvert.SerializeObject("{\"respcode\":\"500\",\"respdesc\" : \"" + ex.Message + "\" }"), System.Text.Encoding.UTF8, "application/json");
                return response;

            }
            var res = Request.CreateResponse(HttpStatusCode.NotAcceptable);
            res.Content = new StringContent(JsonConvert.SerializeObject("{\"respcode\":\"406\",\"respdesc\" : \"Unprocessable Entity, Check the json data format \" }"), System.Text.Encoding.UTF8, "application/json");
            return res;
        }





        #endregion
	}
}
