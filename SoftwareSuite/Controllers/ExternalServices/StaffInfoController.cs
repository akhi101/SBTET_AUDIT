using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Data;
using System.Web.Http;
using System.Data.SqlClient;
using SoftwareSuite.Models.Database;
using Newtonsoft.Json;
using SoftwareSuite.BLL;
using System.Configuration;
using SoftwareSuite.Models.Security;
using Newtonsoft.Json.Linq;
using System.Text;
using System.Web.Script.Serialization;

namespace SoftwareSuite.Controllers.ExternalServices
{
    public class StaffData
    {
        public string AcademicYearId { get; set; }
        public string AcademicYear { get; set; }
        public string StaffName { get; set; }
        public string Designation { get; set; }
        public string StaffId { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string AadhaarNumber { get; set; }
        public string CollegeCode { get; set; }
        public string CollegeType { get; set; }
        public int Shift { get; set; }
        public string Branch { get; set; }
        public string WorkingBranch { get; set; }
        public string Semester { get; set; }
        public string SubjectTeaching { get; set; }
        public string SubjectCode { get; set; }
        public string TeachingExperience { get; set; }
        public string EmployeeType { get; set; }
        public int PCode { get; set; }
        public string CollegeManagement { get; set; }
        public string BankName { get; set; }
        public string PanNumber { get; set; }
        public string IFSCCode { get; set; }
        public string BankAccountNumber { get; set; }
        public string IndustryExp { get; set; }

    }
    public class StaffInfoController : ApiController
    {

        [HttpGet, ActionName("GetTeachingStaff")]
        public HttpResponseMessage GetTeachingStaff(HttpRequestMessage request)
        {

            try
            {
                var apikey = request.Headers.GetValues("apiKey").FirstOrDefault();
                var apikeyOrig = ConfigurationManager.AppSettings["osdesFacultyDataSharingApiKey"].ToString();
                if (apikey != apikeyOrig)
                {
                    var response = Request.CreateResponse(HttpStatusCode.Forbidden);
                    response.Content = new StringContent(JsonConvert.SerializeObject("{\"respcode\":\"403\",\"respdesc\" = \"Invalid Api Key\"\" }"), System.Text.Encoding.UTF8, "application/json");

                    return response;
                }
            }
            catch (Exception)
            {
                var response = Request.CreateResponse(HttpStatusCode.Forbidden);
                response.Content = new StringContent(JsonConvert.SerializeObject("{\"respcode\":\"403\",\"respdesc\" = \"Invalid Api Key\"\" }"), System.Text.Encoding.UTF8, "application/json");
                return response;
            }

            try
            {
                var crypt = new HbCrypt("BaohWeanLone0D1q");
                var dbHandler = new dbHandler();
                string StrQuery = "";
                StrQuery = "exec usp_VND_TeachingStaffInfo";
                var dt = dbHandler.ReturnData(StrQuery);
                List<StaffData> staffData = dt.DataTableToList<StaffData>().ToList();
                var cipherdata = crypt.Encrypt(JsonConvert.SerializeObject(staffData));
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, cipherdata);
                return response;

            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("SBP_Ext_TeachingStaffInfo", 0, ex.Message);
                var retMsg = "{\"status\":\"400\",\"statusdesc\": \"" + ex.Message + "\"}";
                return Request.CreateResponse(HttpStatusCode.OK, retMsg);
            }
        }

        [HttpGet, ActionName("GetFacultyInfo")]
        public HttpResponseMessage GetFacultyInfo(HttpRequestMessage request)
        {

            try
            {
                var apikey = request.Headers.GetValues("apiKey").FirstOrDefault();
                var apikeyOrig = ConfigurationManager.AppSettings["osdesFacultyDataSharingApiKey"].ToString();
                if (apikey != apikeyOrig)
                {
                    var response = Request.CreateResponse(HttpStatusCode.Forbidden);
                    response.Content = new StringContent(JsonConvert.SerializeObject("{\"respcode\":\"403\",\"respdesc\" = \"Invalid Api Key\"\" }"), System.Text.Encoding.UTF8, "application/json");

                    return response;
                }
            }
            catch (Exception)
            {
                var response = Request.CreateResponse(HttpStatusCode.Forbidden);
                response.Content = new StringContent(JsonConvert.SerializeObject("{\"respcode\":\"403\",\"respdesc\" = \"Invalid Api Key\"\" }"), System.Text.Encoding.UTF8, "application/json");
                return response;
            }

            try
            {
                var crypt = new HbCrypt("BaohWeanLone0D1q");
                var dbHandler = new dbHandler();
                string StrQuery = "";
                StrQuery = "exec usp_VND_TeachingStaffInfo";
                var dt = dbHandler.ReturnData(StrQuery);
                List<StaffData> staffData = dt.DataTableToList<StaffData>().ToList();
               // var cipherdata = crypt.Encrypt(JsonConvert.SerializeObject(staffData));
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, staffData);
                return response;

            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("usp_VND_TeachingStaffInfo", 0, ex.Message);
                var retMsg = "{\"status\":\"400\",\"statusdesc\": \"" + ex.Message + "\"}";
                return Request.CreateResponse(HttpStatusCode.OK, retMsg);
            }
        }

    }
}
