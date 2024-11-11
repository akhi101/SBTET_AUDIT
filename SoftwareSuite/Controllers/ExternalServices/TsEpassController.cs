using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using Newtonsoft.Json;
using SoftwareSuite.BLL;
using SoftwareSuite.Models.Database;

namespace SoftwareSuite.Controllers.ExternalServices
{

    public class StudentRegistration
    {
        public string ssc_board { get; set; }
        public string ssc_exam_no { get; set; }
        public string ssc_pass_year { get; set; }
        public string ssc_pass_type { get; set; }
        public string max_marks { get; set; }
        public string marks_obtained { get; set; }
        public string applicant_name { get; set; }
        public string father_name { get; set; }
        public string appl_dob { get; set; }
        public string uid { get; set; }
        public string comm_dist_code { get; set; }
        public string comm_dist_name { get; set; }
        public string comm_mandal_code { get; set; }
        public string comm_mandal_name { get; set; }
        public string comm_vill_code { get; set; }
        public string comm_village_name { get; set; }
        public string comm_door_no { get; set; }
        public string comm_email { get; set; }
        public string comm_mobile_no { get; set; }
        public string comm_pincode { get; set; }
        public string bank_name { get; set; }
        public string bank_acc_no { get; set; }
        public string bank_branch_code { get; set; }
        public string bank_state_code { get; set; }
        public string bank_dist_code { get; set; }
        public string bank_mandal_code { get; set; }
        public string phc { get; set; }
        public string disable_status { get; set; }
        public string caste_code { get; set; }
        public string religion { get; set; }
        public string permanent_dist_code { get; set; }
        public string permanent_mandal_code { get; set; }
        public string permanent_vill_code { get; set; }
        public string permanent_address { get; set; }
        public string permanent_pincode { get; set; }
        public string institution_state_code { get; set; }
        public string institution_dist_code { get; set; }
        public string institution_mand_code { get; set; }
        public string institution_code { get; set; }
        public string institution_course_code { get; set; }
        public string institution_course_year { get; set; }
        public string institution_name { get; set; }
        public string institution_dist_name { get; set; }
        public string institution_course_name { get; set; }
        public string institution_admission_no { get; set; }
        public string institution_admission_date { get; set; }
        public string cet_rank { get; set; }
        public string cet_hallticketno { get; set; }
        public string cet_year { get; set; }
        public string cet_type { get; set; }
        public string cet_college_code { get; set; }
        public string cet_course_code { get; set; }
        public string cet_seat_category { get; set; }
        public string cet_fee_excempted { get; set; }
        public string income_cert_no { get; set; }
        public string income_cert_date { get; set; }
        public string address { get; set; }
        public string caste_cert_no { get; set; }
        public string caste_cert_date { get; set; }
        public bool fee_exempted { get; set; }

    }
    public class sysresp
    {
        public int respcode { get; set; }
        public string respdesc { get; set; }
    }

    public class CollegeDetails
    {
        public string CollegeCode { get; set; }
        public string HostelAvailable { get; set; }
        public string CollegeType { get; set; }
        public string NatureOfCollege { get; set; }
        public string DistrictName { get; set; }
        public string MandalName { get; set; }
        public string CollegeVillage { get; set; }
        public string CollegeAddress { get; set; }
        public string PinCode { get; set; }
        public string PrincipalMobileNo { get; set; }
        public string CollegeMobileNo { get; set; }
        public string ScholarshipAssistantMobileNo { get; set; }
        public string HostelLocatedinCollegeCampus { get; set; }
        public string HostelIntake { get; set; }
        public string wardenMobileNo { get; set; }

        public List<CollegeCourseDetails> CollegeCourseDetails { get; set; }
    }

    public class CollegeCourseDetails
    {
        public string CollegeCode { get; set; }
        public string CourseName { get; set; }
        public string CourseCode { get; set; }
        public string Intake { get; set; }
       
    }

    public class TsEpassController : ApiController
    {
        [HttpGet, ActionName("GetStudentEpassData")]
        public HttpResponseMessage GetStudentEpassData(HttpRequestMessage request)
        {

            try
            {
                var apikey = request.Headers.GetValues("apikey").FirstOrDefault();
                var apikeyOrig = ConfigurationManager.AppSettings["TsEpassDataSharingApiKey"].ToString();
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
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@pin", queryParams["Pin"]);              
                var dt = db.ReturnDataWithStoredProcedureTable("USP_GET_TSEpassStudentsDetailsByPin", param);               
                List<StudentRegistration> StudentRegistration = dt.DataTableToList<StudentRegistration>().ToList();
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, StudentRegistration);
                return response;

            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_GET_TSEpassStudentsDetailsByPin", 0, ex.Message);
                var retMsg = "{\"status\":\"400\",\"statusdesc\": \"" + ex.Message + "\"}";
                return Request.CreateResponse(HttpStatusCode.OK, retMsg);
            }
        }

        [HttpGet, ActionName("GetCollegeDetails")]
        public HttpResponseMessage GetCollegeDetails(HttpRequestMessage request)
        {

            try
            {
                var apikey = request.Headers.GetValues("apikey").FirstOrDefault();
                var apikeyOrig = ConfigurationManager.AppSettings["TsEpassDataSharingApiKey"].ToString();
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
                var db = new dbHandler();
                string StrQuery = "";
                StrQuery = "exec USP_GET_TSEpassCollegeDetails";
                var ds = db.ReturnDataSet(StrQuery);
                List<CollegeDetails> CollegeDetails = ds.Tables[0].DataTableToList<CollegeDetails>().ToList();
                List<CollegeCourseDetails> CollegeCourseDetails = ds.Tables[1].DataTableToList<CollegeCourseDetails>().ToList();

                var distinctcollegecodes = CollegeDetails.GroupBy(x => x.CollegeCode)
                                         .Select(grp => grp.First())
                                         .Distinct()
                                         .ToList();
                foreach (var collegecod in distinctcollegecodes)
                {
                    var CourseDetails = CollegeCourseDetails.Where(x => x.CollegeCode == collegecod.CollegeCode)
                                            .Distinct()
                                           .ToList();
                    collegecod.CollegeCourseDetails = CourseDetails;
                }
                   
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, distinctcollegecodes);
                return response;

            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_GET_TSEpassCollegeDetails", 0, ex.Message);
                var retMsg = "{\"status\":\"400\",\"statusdesc\": \"" + ex.Message + "\"}";
                return Request.CreateResponse(HttpStatusCode.OK, retMsg);
            }
        }
    }
}
