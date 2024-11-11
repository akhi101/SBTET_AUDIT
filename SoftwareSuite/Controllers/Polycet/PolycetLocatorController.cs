using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using Newtonsoft.Json;
using SoftwareSuite.Models;
using SoftwareSuite.Models.Database;

namespace SoftwareSuite.Controllers.Polycet
{
    public class PolycetLocatorController : ApiController
    {


        [HttpGet, ActionName("GetPolycetAcademicYear")]
        public HttpResponseMessage GetPolycetAcademicYear()
        {
            try
            {
                var dbHandler = new dbHandler();
                string StrQuery = "";
                StrQuery = "exec USP_Affiliation_GET_Poly_Acayr";
                var dt = dbHandler.ReturnDataSet(StrQuery);               
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt.Tables[0]);
                return response;
            }
            catch (Exception ex)
            {
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, ex.Message);
                return response;
            }
        }

        [HttpGet, ActionName("GetExamcenterInfo")]
        public HttpResponseMessage GetExamcenterInfo(string AcademicYear, int type, int Value)
        {

            using (HttpClient client = new HttpClient())
            {
                try
                {

                    var dbHandler = new dbHandler();
                    var param = new SqlParameter[3];
                    param[0] = new SqlParameter("@AcademicYear", AcademicYear);
                    param[1] = new SqlParameter("@Type", type);
                    param[2] = new SqlParameter("@Value", Value);
                    var dt = dbHandler.ReturnDataWithStoredProcedureTable("USP_Poly_CentersInfo", param);
                    HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                    return response;

                }
                catch (Exception ex)
                {
                    HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, ex.Message);
                    return response;

                }
            }
        }
    }
}
