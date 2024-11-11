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
using System.Xml;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using RestSharp;
using System.Data;
using System.IO;
using SoftwareSuite.Models.Database;
using SoftwareSuite.BLL;
using SoftwareSuite.Services;
using SoftwareSuite.Models.TWSH;
using System.Text;
using System.Xml.Serialization;
using SoftwareSuite.Models.Security;
using SoftwareSuite.Controllers.Common;
using System.Net.Http.Headers;
using System.Timers;
using SoftwareSuite.Models;


namespace SoftwareSuite.Controllers.TWSH
{
    public class TwshAdminController : ApiController
    {
        [HttpGet, ActionName("GetTwshMonthYear")]
        public object GetTwshMonthYear()
        {
            try
            {
                var db = new Twshdbandler();
                var res = db.ReturnData("USP_GET_CurrentAcademicYear");
                return res;
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }

        [HttpGet, ActionName("SetTwshAcademicYear")]
        public string SetTwshAcademicYear(int DataTypeId, string AcademicYear, int AcademicStartYear, DateTime StartDate, DateTime EndDate, string UserName, bool IsCurrentAcademicYear, int AcademicID, int ActiveFlag)
        {
            try
            {
                var dbHandler = new Twshdbandler();
                var param = new SqlParameter[9];
                param[0] = new SqlParameter("@DataTypeId", DataTypeId);
                param[1] = new SqlParameter("@AcademicYear", AcademicYear);
                param[2] = new SqlParameter("@AcademicStartYear", AcademicStartYear);
                param[3] = new SqlParameter("@StartDate", StartDate);
                param[4] = new SqlParameter("@EndDate", EndDate);
                param[5] = new SqlParameter("@UserName", UserName);
                param[6] = new SqlParameter("@IsCurrentAcademicYear", IsCurrentAcademicYear);
                param[7] = new SqlParameter("@AcademicID", AcademicID);
                param[8] = new SqlParameter("@ActiveFlag", ActiveFlag);
                param[8] = new SqlParameter("@ActiveFlag", ActiveFlag);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("ADM_SET_CreateOrUpdateAcademicYears", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("ADM_SET_CreateOrUpdateAcademicYears", 0, ex.Message);
                return ex.Message;
            }

        }



    }
}
