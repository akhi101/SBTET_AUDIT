
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using RestSharp;
using SoftwareSuite.BLL;
using SoftwareSuite.Controllers.Common;
using SoftwareSuite.Models.CCIC;
using SoftwareSuite.Models.Database;
using static System.Windows.Forms.VisualStyles.VisualStyleElement.StartPanel;
using static SoftwareSuite.Controllers.Common.CommunicationController;

namespace SoftwareSuite.Controllers.CCIC
{
    public class CcicStudentRegistrationController : ApiController
    {
      

        [HttpGet, ActionName("GetCcicCourses")]
        public HttpResponseMessage GetCcicCourses()
        {
            try
            {
                var db = new ccicdbHandler();
                var Courselist = new List<CcicModels>();
                var dt = db.ReturnDataSet("exec SP_Get_AffiliatedCourses");
                Courselist = dt.DataTableToList<CcicModels>();
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, Courselist);
                return response;
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("SP_Get_AffiliatedCourses", 0, ex.Message);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, ex.Message);
                return response;
            }

        }

        [HttpGet, ActionName("GetCcicInstitutions")]
        public HttpResponseMessage GetCcicInstitutions()
        {
            try
            {
                var db = new ccicdbHandler();
                var Institutionlist = new List<CcicInstitutions>();
                var dt = db.ReturnDataSet("exec SP_Get_AffiliatedInsttitutions");
                Institutionlist = dt.DataTableToList<CcicInstitutions>();
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, Institutionlist);
                return response;
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("SP_Get_AffiliatedInsttitutions", 0, ex.Message);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, ex.Message);
                return response;
            }

        }


        [HttpGet, ActionName("GetCcicInstitutionsByCourse")]
        public HttpResponseMessage GetCcicInstitutionsByCourse(HttpRequestMessage request)
        {
            try
            {
                var db = new ccicdbHandler();
                var InstitutionlistByCourse = new List<CcicInstitutionsByCourse>();
                IDictionary<string, string> queryParams = request.GetQueryNameValuePairs().ToDictionary(x => x.Key, x => x.Value);
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@CourseID", Convert.ToInt32(queryParams["CourseId"]));
                var dt = db.ReturnDataWithStoredProcedureTable("SP_Get_AffiliatedInsttitutionsByCourse", param);
                InstitutionlistByCourse = dt.DataTableToList<CcicInstitutionsByCourse>();
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, InstitutionlistByCourse);
                return response;
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("SP_Get_AffiliatedInsttitutionsByCourse", 0, ex.Message);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, ex.Message);
                return response;
            }

        }


        [HttpGet, ActionName("GetCcicCoursesByInstitution")]
        public HttpResponseMessage GetCcicCoursesByInstitution(HttpRequestMessage request)
        {
            try
            {
                var db = new ccicdbHandler();
                var CourselistByInstitution = new List<CcicCoursesByInstitution>();
                IDictionary<string, string> queryParams = request.GetQueryNameValuePairs().ToDictionary(x => x.Key, x => x.Value);
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@InstitutionID", Convert.ToInt32(queryParams["InstitutionId"]));
                var dt = db.ReturnDataWithStoredProcedureTable("SP_Get_AffiliatedCoursesByInstitution", param);
                CourselistByInstitution = dt.DataTableToList<CcicCoursesByInstitution>();
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, CourselistByInstitution);
                return response;
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("SP_Get_AffiliatedCoursesByInstitution", 0, ex.Message);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, ex.Message);
                return response;
            }

        }




        [HttpPost, ActionName("SendMail")]
        public async Task<HttpResponseMessage> SendMail([FromBody] JsonObject data)
        {
            try
            {
                var test = string.Empty;
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[4];
                param[0] = new SqlParameter("@CandidateEmail", data["CandidateEmail"]);
                param[1] = new SqlParameter("@InstitutionID", data["InstitutionID"]);
                param[2] = new SqlParameter("@CourseID", data["CourseID"]);
                param[3] = new SqlParameter("@CandidateName", data["CandidateName"]);
                DataSet dt = dbHandler.ReturnDataSet("SP_Get_RegistrationEmailOTP", param);
                if (dt.Tables[0].Rows[0]["StatusCode"].ToString() == "200")
                {

                    var msgbdy = new MailRequest()
                    {
                        From = "sbtet-helpdesk[at]telangana[dot]gov[dot]in",
                        To = data["CandidateEmail"].ToString(),
                        Subject = "test mail",
                        Message = "Your Verification Code for Email verification is " + dt.Tables[1].Rows[0]["EmailOTP"].ToString(),
                        attachmentdata = "Attachment"
                    };
                    var com = new CommunicationController();
                    test = await com.SendMail(msgbdy);
                }
                else
                {
                    List<HttpResponse> Resp = dt.Tables[0].DataTableToList<HttpResponse>();
                    HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, Resp);
                    return response;
                }
                if (test == "success")
                {
                    HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt.Tables[0].DataTableToList<HttpResponse>());
                    return response;
                }
                else
                {
                    HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.NoContent, "mail error");
                    return response;
                }

            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("SP_Get_RegistrationEmailOTP", 0, ex.Message);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, ex.Message);
                return response;
            }
        }


        [HttpPost, ActionName("SendSms")]
        public async Task<HttpResponseMessage> SendSms([FromBody] JsonObject data)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[4];
                param[0] = new SqlParameter("@CandidateMobile", data["CandidateMobile"]);
                param[1] = new SqlParameter("@InstitutionID", data["InstitutionID"]);
                param[2] = new SqlParameter("@CourseID", data["CourseID"]);
                param[3] = new SqlParameter("@CandidateName", data["CandidateName"]);
                DataSet dt = dbHandler.ReturnDataSet("SP_Get_RegistrationMobileOTP", param);
                if (dt.Tables[0].Rows[0]["StatusCode"].ToString() == "200")
                {
                    var com = new CommunicationController();
                    var msg = dt.Tables[1].Rows[0]["MobileOTP"].ToString() + " is your otp for validating your Mobile no on" + data["CandidateMobile"].ToString().Substring(0, 2) + "xxxxx" + data["CandidateMobile"].ToString().Substring(6, 4) + ", SBTET TS";
                    var test = await com.SendSms(data["CandidateMobile"].ToString(), msg, "1007161770830309481");
                };

                HttpResponseMessage HttpResponse = Request.CreateResponse(HttpStatusCode.OK, dt.Tables[0].DataTableToList<HttpResponse>());
                return HttpResponse;
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("SP_Get_RegistrationMobileOTP", 0, ex.Message);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, ex.Message);
                return response;
            }
        }



        [HttpPost, ActionName("VerifyMailOtp")]
        public HttpResponseMessage VerifyMailOtp([FromBody] JsonObject data)
        {
            try
            {
                var test = string.Empty;
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[5];
                param[0] = new SqlParameter("@CandidateEmail", data["CandidateEmail"]);
                param[1] = new SqlParameter("@InstitutionID", data["InstitutionID"]);
                param[2] = new SqlParameter("@CourseID", data["CourseID"]);
                param[3] = new SqlParameter("@CandidateName", data["CandidateName"]);
                param[4] = new SqlParameter("@EmailOTP", data["EmailOTP"]);
                DataSet dt = dbHandler.ReturnDataSet("SP_Verify_RegistrationEmailOTP", param);
                List<HttpResponse> Resp = dt.Tables[0].DataTableToList<HttpResponse>();
                HttpResponseMessage HttpResponse = Request.CreateResponse(HttpStatusCode.OK, Resp);
                return HttpResponse;

            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("SP_Verify_RegistrationEmailOTP", 0, ex.Message);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, ex.Message);
                return response;
            }
        }


        [HttpPost, ActionName("VerifyMobileOtp")]
        public HttpResponseMessage VerifyMobileOtp([FromBody] JsonObject data)
        {
            try
            {
                var test = string.Empty;
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[5];
                param[0] = new SqlParameter("@CandidateMobile", data["CandidateMobile"]);
                param[1] = new SqlParameter("@InstitutionID", data["InstitutionID"]);
                param[2] = new SqlParameter("@CourseID", data["CourseID"]);
                param[3] = new SqlParameter("@CandidateName", data["CandidateName"]);
                param[4] = new SqlParameter("@MobileOTP", data["MobileOTP"]);
                DataSet dt = dbHandler.ReturnDataSet("SP_Verify_RegistrationMobileOTP", param);
                var Resp = NewMethod(dt);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, Resp);
                return response;

            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("SP_Verify_RegistrationMobileOTP", 0, ex.Message);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, ex.Message);
                return response;
            }
        }

        [HttpPost, ActionName("PostMultipleApplicationPaymentdata")]
        public HttpResponseMessage PostMultipleApplicationPaymentdata(HttpRequestMessage request)
        {

            try
            {
                string Appdata = "" + request.Content.ReadAsStringAsync().Result;
                JObject obj = JObject.Parse(Appdata);
                int Amount = Convert.ToInt32("" + obj["TotalAmount"]);
                int ApplicationCount = Convert.ToInt32("" + obj["ApplicationCount"]);
                int AcademicYearID = Convert.ToInt32("" + obj["AcademicYearID"]);
                int ExamMonthYearID = Convert.ToInt32("" + obj["ExamMonthYearID"]);
                int FeePaymentTypeID = Convert.ToInt32("" + obj["FeePaymentTypeID"]);
                string UserName = Convert.ToString("" + obj["UserName"]);
                JArray dataarray = obj["AppData"].Value<JArray>();
                var json = JsonConvert.SerializeObject(dataarray);
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[7];
                param[0] = new SqlParameter("@json", json);
                param[1] = new SqlParameter("@Amount", Amount);
                param[2] = new SqlParameter("@ApplicationCount", ApplicationCount);
                param[3] = new SqlParameter("@AcademicYearID", AcademicYearID);
                param[4] = new SqlParameter("@ExamMonthYearID", ExamMonthYearID);
                param[5] = new SqlParameter("@FeePaymentTypeID", FeePaymentTypeID);
                param[6] = new SqlParameter("@UserName", UserName);
                var dt = dbHandler.ReturnDataSet("SP_GET_FeePaymentChallanNo", param);
                //string StatusCode = dt;
                //string ChallanNumber = (string)dt;
                //string AppCount = (string)dt;
                //string FeeAmount = (string)dt;
                //string FeeType = (string)dt;

                var response = Request.CreateResponse(HttpStatusCode.OK,dt);
                //response.Content = new StringContent(JsonConvert.SerializeObject("{\"StatusCode\":\"" + StatusCode + "\",\"ChallanNumber\":\"" + ChallanNumber + "\",\"FeeAmount\":\"" + Amount + "\",\"AppCount\":\"" + ApplicationCount + "\",\"FeeType\":\"" + FeeType + "\"}"), System.Text.Encoding.UTF8, "application/json");
                return response;



            }
            catch (Exception ex)
            {
                var response = Request.CreateResponse(HttpStatusCode.InternalServerError);
                response.Content = new StringContent(JsonConvert.SerializeObject("{\"respcode\":\"StatusCode\",\"respdesc\" : \"Server Error\" }"), System.Text.Encoding.UTF8, "application/json");
                return response;

            }
        }

        private object NewMethod(DataSet dt)
        {
            throw new NotImplementedException();
        }
    }
}










