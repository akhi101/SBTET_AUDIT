using System;
using System.Data;
using System.Net.Http;
using System.Configuration;
using System.Xml;
using Syntizen.Aadhaar.AUAKUA;
using System.Data.SqlClient;
using System.Threading.Tasks;
using Newtonsoft.Json;
using System.Diagnostics;
using System.Web.Mvc;
using FromBody = System.Web.Http.FromBodyAttribute;
using SoftwareSuite.Services.Admission;
using SoftwareSuite.Models.Database;
using SoftwareSuite.Models.Admission;
using System.Net;
using System.Collections.Generic;
using System.Net.Http.Headers;
using System.IO;
using RestSharp;
//using DocumentFormat.OpenXml.Drawing.Charts;
using SoftwareSuite.Models.Security;
using DataTable = System.Data.DataTable;
// using X15 = DocumentFormat.OpenXml.Office2013.Excel;






namespace SoftwareSuite.Controllers.Admission
{
    public class AdmissionController : BaseController
    {
        private object excelWorkBook;
        private object _repository;
        #region Get Methods


        //[HttpGet, ActionName("GetDataForAdmissionDashboard")]
        //public string GetDataForAdmissionDashboard(string CollegeCode, int UserId, int AcademicYearId)
        //{
        //    try
        //    {
        //        AdmissionService admService = new AdmissionService();
        //        var dbHandler = new dbHandler();
        //        DataSet hodDashboardData;
        //        hodDashboardData = admService.GetDataForAdmissionDashboard(dbHandler, CollegeCode, UserId, AcademicYearId);
        //        return JsonConvert.SerializeObject(hodDashboardData);
        //    }
        //    catch (Exception ex)
        //    {
        //        dbHandler.SaveErorr("USP_Admission_GET_DashBoradReports", 0, ex.Message);
        //        return ex.Message;
        //    }
        //}

        [HttpGet, ActionName("GetDataForAdmissionDashboard")]
        public string GetDataForAdmissionDashboard(int UserId, string CollegeId, int AcademicYearId)
        {
            try
            {
                AdmissionService admService = new AdmissionService();
                var dbHandler = new dbHandler();
                DataSet hodDashboardData;
                hodDashboardData = admService.GetDataForAdmissionDashboard(dbHandler, CollegeId, UserId, AcademicYearId);
                return JsonConvert.SerializeObject(hodDashboardData);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpGet, ActionName("GetSixthSemStudents")]
        public string GetSixthSemStudents(string CollegeCode, int BranchId, int AcademicYearId)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@CollegeCode", CollegeCode);
                param[1] = new SqlParameter("@BranchId", BranchId);
                param[2] = new SqlParameter("@AcademicYearId", AcademicYearId);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("USP_GET_StudentsPinListFor6thSemAlreadyStudied", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

    
        

        [HttpGet, ActionName("SetSixthSemStudentsSubmit")]
        public string SetSixthSemStudentsSubmit(string CollegeCode, int BranchId, int AcademicYearId,float IsSubmitted)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[4];
                param[0] = new SqlParameter("@CollegeCode", CollegeCode);
                param[1] = new SqlParameter("@BranchId", BranchId);
                param[2] = new SqlParameter("@AcademicYearId", AcademicYearId);
                param[3] = new SqlParameter("@IsSubmitted", IsSubmitted);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("USP_SS_SET_6thSemSubmitted", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpGet, ActionName("GetExamMonthYear")]
        public string GetExamMonthYear()
        {
            try
            {
                var dbHandler = new dbHandler();
                string StrQuery = "";
                StrQuery = "exec USP_Results_GET_ExamMonthYear";
                var dt = dbHandler.ReturnDataSet(StrQuery);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_Results_GET_ExamMonthYear", 0, ex.Message);
                return ex.Message;
            }
        }

        [HttpGet, ActionName("GetOdcDataByPin")]
        public string GetOdcDataByPin(string pin)
        {
            try
            {

                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@pin", pin);

                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_GET_UpdateStudentODCDetailsByPin", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }

        [HttpGet, ActionName("GetCollegeTypes")]
        public string GetCollegeTypes()
        {
            try
            {
                var dbHandler = new dbHandler();
                string StrQuery = "";
                StrQuery = "exec SBP_COM_CollegeTypes";
                var dt = dbHandler.ReturnDataSet(StrQuery);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("SBP_COM_CollegeTypes", 0, ex.Message);
                return ex.Message;
            }
        }

        
            [HttpGet, ActionName("GetAdmissionTypes")]
        public string GetAdmissionTypes()
        {
            try
            {
                var dbHandler = new dbHandler();
                string StrQuery = "";
                StrQuery = "exec SBP_COM_AdmissionType";
                var dt = dbHandler.ReturnDataSet(StrQuery);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("SBP_COM_AdmissionType", 0, ex.Message);
                return ex.Message;
            }
        }


        [HttpGet, ActionName("GetPolycetAcademicYear")]
        public string GetPolycetAcademicYear()
        {
            try
            {
                var dbHandler = new dbHandler();
                string StrQuery = "";
                StrQuery = "exec USP_Affiliation_GET_Poly_Acayr";
                var dt = dbHandler.ReturnDataSet(StrQuery);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_Affiliation_GET_Poly_Acayr", 0, ex.Message);
                return ex.Message;
            }
        }


        [HttpGet, ActionName("GetCollegesSchemeSemInfo")]
        public string GetCollegesSchemeSemInfo(string CollegeId)
        {
            try
            {
                AdmissionService admService = new AdmissionService();
                var dbHandler = new dbHandler();
                DataSet hodDashboardData;
                hodDashboardData = admService.GetCollegesSchemeSemInfo();
                return JsonConvert.SerializeObject(hodDashboardData);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("usp_Get_Colleges_SCHEME_SEM_INFO", 0, ex.Message);
                return ex.Message;
            }
        }

        [HttpGet, ActionName("SetReAdmissionDate")]
        public string SetReAdmissionDate(DateTime StartDate,DateTime LastDate)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@StartDate", StartDate);
                param[1] = new SqlParameter("@LastDate", LastDate);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("usp_AdmissionDetainedDate", param);

                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("usp_AdmissionDetainedDate", 0, ex.Message);
                return ex.Message;
            }
        }

        
        [HttpGet, ActionName("GetPolycetExamCenters")]
        public string GetPolycetExamCenters(string AcademicYear)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@AcademicYear", AcademicYear);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("USP_Affiliation_GET_Polycet_ExamCenters", param);

                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_Affiliation_GET_Polycet_ExamCenters", 0, ex.Message);
                return ex.Message;
            }
        }

        [HttpGet, ActionName("GetAcademicYearsActive")]
        public string GetAcademicYearsActive(string CollegeId)
        {
            try
            {
                AdmissionService admService = new AdmissionService();
                var dbHandler = new dbHandler();
                DataSet acdemicYearsData;
                acdemicYearsData = admService.GetAcademicYearsActive();
                return JsonConvert.SerializeObject(acdemicYearsData);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_GetAcademicYearsActive", 0, ex.Message);
                return ex.Message;
            }
        }

        [HttpGet, ActionName("getActiveBranches")]
        public string getActiveBranches()
        {
            try
            {
                var dbHandler = new dbHandler();
                string StrQuery = "";
                StrQuery = "exec USP_GET_ActiveBranches";
                var dt = dbHandler.ReturnDataSet(StrQuery);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_GET_ActiveBranches", 0, ex.Message);
                return ex.Message;
            }
        }

        [HttpGet, ActionName("getSchemes")]
        public string getSchemes()
        {
            try
            {
                var dbHandler = new dbHandler();
                string StrQuery = "";
                StrQuery = "exec USP_GET_SCHEMES";
                var dt = dbHandler.ReturnDataSet(StrQuery);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_GET_SCHEMES", 0, ex.Message);
                return ex.Message;
            }
        }

        [HttpGet, ActionName("getAcademicYears")]
        public string getAcademicYears()
        {
            try
            {
                var dbHandler = new dbHandler();
                string StrQuery = "";
                StrQuery = "exec USP_GET_ACADEMICYEARS";
                var dt = dbHandler.ReturnDataSet(StrQuery);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_GET_ACADEMICYEARS", 0, ex.Message);
                return ex.Message;
            }
        }



        [HttpGet, ActionName("getAdmissionSetDates")]
        public string getAdmissionSetDates()
        {
            try
            {
                var dbHandler = new dbHandler();
                string StrQuery = "";
                StrQuery = "exec ADM_Admission_GET_ActiveSemesterDates";
                var dt = dbHandler.ReturnDataSet(StrQuery);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("ADM_Admission_GET_ActiveSemesterDates", 0, ex.Message);
                return ex.Message;
            }
        }

        [HttpGet, ActionName("getActiveSemisters")]
        public string getActiveSemisters()
        {
            try
            {
                var dbHandler = new dbHandler();
                string StrQuery = "";
                StrQuery = "exec USP_GET_ACTIVE_SEMESTER";
                var dt = dbHandler.ReturnDataSet(StrQuery);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_GET_ACTIVE_SEMESTER", 0, ex.Message);
                return ex.Message;
            }
        }

        [HttpGet, ActionName("getSscBoard")]
        public string getSscBoard()
        {
            try
            {
                var dbHandler = new dbHandler();
                string StrQuery = "";
                StrQuery = "exec USP_GET_TenthBoard";
                var dt = dbHandler.ReturnDataSet(StrQuery);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_GET_TenthBoard", 0, ex.Message);
                return ex.Message;
            }
        }

        [HttpGet, ActionName("getIncomeCategory")]
        public string getIncomeCategory()
        {
            try
            {
                var dbHandler = new dbHandler();
                string StrQuery = "";
                StrQuery = "exec USP_GET_IncomeCategory";
                var dt = dbHandler.ReturnDataSet(StrQuery);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_GET_IncomeCategory", 0, ex.Message);
                return ex.Message;
            }
        }

        [HttpGet, ActionName("GetAdmissionReportsBySemester")]
        public string GetAdmissionReportsBySemester()
        {
            try
            {
                var dbHandler = new dbHandler();
                string StrQuery = "";
                StrQuery = "exec ADM_GET_AdmissionReports";
                var res = dbHandler.ReturnDataSet(StrQuery);
                return JsonConvert.SerializeObject(res);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("ADM_GET_AdmissionReports", 0, ex.Message);
                return ex.Message;
            }
        }

        [HttpGet, ActionName("GetAdminAdmissionReports")]
        public string GetAdminAdmissionReports(int dataType)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@dataType", dataType);
                var dt = dbHandler.ReturnDataWithStoredProcedure("ADM_Get_AdmissionReportsBySemesterandBranch ", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }


        [HttpGet, ActionName("GetAdminAdmissionSubReports")]
        public string GetAdminAdmissionSubReports(int dataType,int Id)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@dataType", dataType);
                param[1] = new SqlParameter("@Id", Id);
                var dt = dbHandler.ReturnDataWithStoredProcedure("ADM_Get_CollegeAdmissionReportsBySemesterandBranch  ", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }



       


        [HttpGet, ActionName("GetAdminStudentCategory")]
        public string GetAdminStudentCategory(int AcademicID)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@AcademicID", AcademicID);
                
                var dt = dbHandler.ReturnDataWithStoredProcedure("ADM_GET_StudentCategory  ", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }



        [HttpGet, ActionName("GetWadhStr")]
        public string GetWadhStr()
        {
            try
            {
                var wadhStr = ConfigurationManager.AppSettings["WadhStr"].ToString();

                return JsonConvert.SerializeObject(wadhStr);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }



        [HttpGet, ActionName("StudentAadhaarVerified")]
        public string StudentAadhaarVerified(int StudentId, string AadhaarNo)
        {
            try
            {
                var dbHandler = new dbHandler();
                //string encriptedaadhar = "";

                //var res = AadhaarNo.Split(new string[] { "$$@@$$" }, StringSplitOptions.None);
                //var crypt = new HbCrypt(res[1]);
                //var aadharencrypt = new HbCrypt();
                //string aadhar = crypt.AesDecrypt(res[0]);
                //string decryptaadhar = aadharencrypt.AesDecrypt(aadhar);
                //encriptedaadhar = aadharencrypt.Encrypt(decryptaadhar);
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@StudentID", StudentId);
                param[1] = new SqlParameter("@AadhaarNo", AadhaarNo);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("usp_StudentAadharVerify", param);
                string Msg = "PIN successfully generated, Your PIN : {0}, Secretary, SBTETTS.";
                string url = ConfigurationManager.AppSettings["SMS_API"].ToString();
                if (dt.Rows[0]["PIN"].ToString() != "" && dt.Rows[0]["StudentContact"].ToString() != "" && dt.Rows[0]["StudentContact"].ToString() != null)
                {
                  var Message = string.Format(Msg, dt.Rows[0]["PIN"].ToString());
                        if (dt.Rows[0]["StudentContact"].ToString() != null && dt.Rows[0]["StudentContact"].ToString() != string.Empty && dt.Rows[0]["PIN"].ToString() != "")
                        {
                            string urlParameters = "?mobile=" + dt.Rows[0]["StudentContact"].ToString() + "&message=" + Message + "&templateid=1007161786877766451";
                        HttpClient client = new HttpClient();
                            client.BaseAddress = new Uri(url);
                            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                            HttpResponseMessage response = client.GetAsync(urlParameters).Result;
                        }                 
                }
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("usp_StudentAadharVerify", 0, ex.Message);
                return ex.Message;
            }
        }


        [HttpGet, ActionName("GetAdmissionPinReports")]
        public string GetAdmissionPinReports(string CollegeCode, int BranchId, int SemId, int AcademicYearId, int DataFormatTypeId)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[5];
                param[0] = new SqlParameter("@CollegeCode", CollegeCode);
                param[1] = new SqlParameter("@BranchId", BranchId);
                param[2] = new SqlParameter("@SemId", SemId);
                param[3] = new SqlParameter("@AcademicYearId", AcademicYearId);
                param[4] = new SqlParameter("@DataFormatTypeId", DataFormatTypeId);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("USP_Admission_GET_DashBoradReportPinList_old", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_Admission_GET_DashBoradReportPinList_old", 0, ex.Message);
                return ex.Message;
            }
        }

        
             [HttpGet, ActionName("GetStudentCategoryPinList")]
        public string GetStudentCategoryPinList(int DataFormatTypeId, string CollegeCode, int semid, int branchid, int schemeid, int gender)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[6];
                param[0] = new SqlParameter("@DataFormatTypeId", DataFormatTypeId);
                param[1] = new SqlParameter("@CollegeCode", CollegeCode);
                param[2] = new SqlParameter("@semid", semid);
                param[3] = new SqlParameter("@branchid", branchid);
                param[4] = new SqlParameter("@schemeid", schemeid);
                param[5] = new SqlParameter("@gender", gender);

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("USP_GET_StudentCategoryPinList", param);

                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_GET_StudentCategoryPinList", 0, ex.Message);
                return ex.Message;
            }
        }
         

        [HttpGet, ActionName("GetReleaseAadharBypin")]
        public string GetReleaseAadharBypin(string Pin,string UserName)
        {
            try
            {
                string IpAddress = System.Web.HttpContext.Current.Request.UserHostAddress;
                var dbHandler = new dbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@pin", Pin);
                param[1] = new SqlParameter("@UserName", UserName);
                param[2] = new SqlParameter("@IpAdress", IpAddress);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("USP_RELEASE_ADHAR_ATTENDEE_BY_PIN", param);
                if(dt.Rows[0]["ResponceCode"].ToString() == "200")
                {
                    var attendeeid =dt.Rows[0]["attendeeid"].ToString();
                    DeleteBmaAttendee(attendeeid, "Aadhaar Issue");
                }
                
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_RELEASE_ADHAR_ATTENDEE_BY_PIN", 0, ex.Message);
                return ex.Message;
            }
        }

        public class DeactAttendeeId
        {
            public string attendeeid { get; set; }
            public string remarks { get; set; }
        }

        [HttpGet]
        public async Task<string> DeleteBmaAttendee(string attendeeid, string remarks)
        {
            var apikey = ConfigurationManager.AppSettings["BMA_API_Key"].ToString();
            var url = ConfigurationManager.AppSettings["BMA_API_Delete"].ToString();
            var Deactivatejsonreq = new DeactAttendeeId();
            Deactivatejsonreq.attendeeid = attendeeid;
            Deactivatejsonreq.remarks = remarks;
            using (HttpClient client = new HttpClient())
            {
                try
                {
                    client.DefaultRequestHeaders.Add("apikey", apikey);
                    var resMsg = await client.PostAsJsonAsync(url, Deactivatejsonreq);
                    var content = await resMsg.Content.ReadAsStringAsync();
                    return content;

                }
                catch (HttpRequestException ex)
                {
                    Console.WriteLine(ex.Message);
                  //  dbHandler.SaveErorr("usp_TransferAttendeeId", 0, ex.Message);
                    return ex.Message;

                }
            }

        }

     



        [HttpGet, ActionName("GetReleaseAttendeeIdBypin")]
        public string GetReleaseAttendeeIdBypin(string Pin,string UserName)
        {
            try
            {
                string IpAddress = System.Web.HttpContext.Current.Request.UserHostAddress;
                var dbHandler = new dbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@pin", Pin);
                param[1] = new SqlParameter("@UserName", UserName);
                param[2] = new SqlParameter("@IpAdress", IpAddress);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("USP_RELEASE_ATTENDEEID_BY_PIN", param);
                if (dt.Rows[0]["ResponceCode"].ToString() == "200")
                {
                    var attendeeid = dt.Rows[0]["attendeeid"].ToString();
                    DeleteBmaAttendee(attendeeid, "AttendeeId Issue");
                }
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_RELEASE_ATTENDEEID_BY_PIN", 0, ex.Message);
                return ex.Message;
            }
        }

        [HttpGet, ActionName("GetAdmissionStatistics")]
        public string GetAdmissionStatistics(int AcademicId)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@AcadamicYear", AcademicId);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("usp_GetAdmissionStatistics", param);

                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("usp_GetAdmissionStatistics", 0, ex.Message);
                return ex.Message;
            }
        }

        [HttpGet, ActionName("GetReAdmissionListByCollegeCode")]
        public string GetReAdmissionListByCollegeCode(string CollegeCode)
        {

            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@collegecode", CollegeCode);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("usp_cwise_detainedList", param);

                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("usp_cwise_detainedList", 0, ex.Message);
                return ex.Message;
            }
        }

        [HttpGet, ActionName("GetReAdmissionListByBranchCode")]
        public string GetReAdmissionListByBranchCode(string CollegeCode, string BranchCode, int semid, string AcademicYear, string Scheme)
        {

            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[5];
                param[0] = new SqlParameter("@collegecode", CollegeCode);
                param[1] = new SqlParameter("@branchcode", BranchCode);
                param[2] = new SqlParameter("@semid", semid);
                param[3] = new SqlParameter("@AcademicYear", AcademicYear);
                param[4] = new SqlParameter("@Scheme", Scheme);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("usp_bwise_detainedList", param);

                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("usp_bwise_detainedList", 0, ex.Message);
                return ex.Message;
            }

        }



        [HttpGet, ActionName("GetReAdmissionDisplayList")]
        public string GetReAdmissionDisplayList(string CollegeCode)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@CollegeCode", CollegeCode);
                var ds = dbHandler.ReturnDataWithStoredProcedure("usp_cwise_addStudentDisplay", param);
                //  HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);
                //  response.Content = new StringContent(JsonConvert.SerializeObject(ds));
                return JsonConvert.SerializeObject(ds);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("usp_cwise_addStudentDisplay", 0, ex.Message);
                return ex.Message;
            }



        }
        [HttpGet, ActionName("GetStudentByPin")]
        public string GetStudentByPin(string Pin)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@pin", Pin);
                var ds = dbHandler.ReturnDataWithStoredProcedure("USP_GET_STUDENT_BY_PIN_dup", param);
                // HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);
                //  response.Content = new StringContent(JsonConvert.SerializeObject(ds), System.Text.Encoding.UTF8, "application/json");
                return JsonConvert.SerializeObject(ds);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_GET_STUDENT_BY_PIN_dup", 0, ex.Message);
                return ex.Message;
            }



        }

        [HttpGet, ActionName("GetStudentBackLogByPin")]
        public string GetStudentBackLogByPin(string Pin)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@pin", Pin);
                var ds = dbHandler.ReturnDataWithStoredProcedure("USP_GET_STUDENTBACKLOG_BY_PIN", param);
                // HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);
                //  response.Content = new StringContent(JsonConvert.SerializeObject(ds), System.Text.Encoding.UTF8, "application/json");
                return JsonConvert.SerializeObject(ds);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_GET_STUDENTBACKLOG_BY_PIN", 0, ex.Message);
                return ex.Message;
            }



        }
        [HttpGet, ActionName("GetSudentByAadhaar")]
        public string GetSudentByAadhaar(string AadhaarNo)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@aadhar", AadhaarNo);
                var ds = dbHandler.ReturnDataWithStoredProcedure("USP_GET_STUDENT_BY_AADHAR", param);
                //   HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);
                //  response.Content = new StringContent(JsonConvert.SerializeObject(ds), System.Text.Encoding.UTF8, "application/json");
                return JsonConvert.SerializeObject(ds);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_GET_STUDENT_BY_AADHAR", 0, ex.Message);
                return ex.Message;
            }
        }





        [HttpGet, ActionName("DeleteAadhaarbypin")]
        public string DeleteAadhaarbypin(string Pin)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@pin", Pin);
                var ds = dbHandler.ReturnDataWithStoredProcedure("USP_RELEASE_ADHAR_ATTENDEE_BY_PIN", param);
                //    HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);
                //    response.Content = new StringContent(JsonConvert.SerializeObject(ds), System.Text.Encoding.UTF8, "application/json");
                return JsonConvert.SerializeObject(ds);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_RELEASE_ADHAR_ATTENDEE_BY_PIN", 0, ex.Message);
                return ex.Message;
            }
        }



        [HttpGet, ActionName("GetStudentByattendeeId")]
        public string GetStudentByattendeeId(string AttendeeId)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@AttendeeId", AttendeeId);
                var ds = dbHandler.ReturnDataWithStoredProcedure("USP_GET_STUDENT_BY_ATTENDEE", param);
                //    HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);
                //    response.Content = new StringContent(JsonConvert.SerializeObject(ds), System.Text.Encoding.UTF8, "application/json");
                return JsonConvert.SerializeObject(ds);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_GET_STUDENT_BY_ATTENDEE", 0, ex.Message);
                return ex.Message;
            }
        }

        [HttpGet, ActionName("GetStudentCategory")]
        public string GetStudentCategory(int AcademicYearId,string CollegeCode)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@AcademicYearId ", AcademicYearId);
                param[1] = new SqlParameter("@CollegeCode ", CollegeCode);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("USP_GET_StudentCategory", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_GET_StudentCategory", 0, ex.Message);
                return ex.Message;
            }

        }

        [HttpGet, ActionName("GetAadharUpdationDetails")]
        public string GetAadharUpdationDetails(string PolycetHTNO)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@PolycetHTNO", PolycetHTNO);
                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_Get_AadharUpdtionDetails", param);

                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("SP_Get_AadharUpdtionDetails", 0, ex.Message);
                return ex.Message;
            }
        }

        [HttpGet, ActionName("SetAadharUpdationDetails")]
        public string SetAadharUpdationDetails(string PolycetHTNO,int StudentId,string AadharNo, string UserName)
        {
            try
            {
                string IpAddress = System.Web.HttpContext.Current.Request.UserHostAddress;
                var dbHandler = new dbHandler();
                var param = new SqlParameter[5];
                param[0] = new SqlParameter("@PolycetHTNO", PolycetHTNO);
                param[1] = new SqlParameter("@StudentId", StudentId);
                param[2] = new SqlParameter("@AadharNo", AadharNo);
                param[3] = new SqlParameter("@UserName", UserName);
                param[4] = new SqlParameter("@IpAdress", IpAddress);
                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_Set_AadharUpdtionDetails", param);

                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("SP_Set_AadharUpdtionDetails", 0, ex.Message);
                return ex.Message;
            }
        }





        //master Controller

        //set Academi
        //[HttpPost, ActionName("setAcademicyear")]
        //public string setAcademicyear(int AcadearemicYear)
        //{
        //    try
        //    {
        //        var dbHandler = new dbHandler();
        //        var param = new SqlParameter[1];
        //        param[0] = new SqlParameter("@AcadearemicYear", AcadearemicYear);

        //        var dt = dbHandler.ReturnDataWithStoredProcedureTable("SBT_ADM_SET_ACADEMICYEAR", param);
        //        return JsonConvert.SerializeObject(dt);
        //    }
        //    catch (Exception ex)
        //    {
        //        dbHandler.SaveErorr("USP_GET_STUDENT_BY_ATTENDEE", 0, ex.Message);
        //        return ex.Message;
        //    }

        //}

        //[HttpGet, ActionName("GetAcademicyears")]
        //public string GetAcademicyears()
        //{
        //    try
        //    {
        //        var dbHandler = new dbHandler();
        //        string StrQuery = "";
        //        StrQuery = "exec SBT_ADM_GET_ACADEMICYEAR";

        //        var res = dbHandler.ReturnDataSet(StrQuery);
        //        return JsonConvert.SerializeObject(res);
        //    }
        //    catch (Exception ex)
        //    {
        //        dbHandler.SaveErorr("USP_GET_StudentCategory", 0, ex.Message);
        //        return ex.Message;
        //    }
        //}

        //[HttpGet, ActionName("getStudentFeePyment")]
        //public string getStudentFeePyment()
        //{
        //    AdmissionController ks = new AdmissionController();
        //    try
        //    {


        //        var dbHandler = new dbHandler();
        //        string StrQuery = "";
        //        StrQuery = "exec usp_SFP_GET_FeePaymentReports";
        //        DataTable dt = dbHandler.ReturnData(StrQuery);
        //        dt.Columns.Add("Department ID");
        //        dt.Columns.Add("Department Name");

        //        DataSet ds = new DataSet();
        //        ds.Tables.Add(dt);
        //        //ds.Tables.Add(departmentTable);

        //        ks.ExportDataSetToExcel(ds);
        //        return JsonConvert.SerializeObject(dt);
        //    }
        //    catch (Exception ex)
        //    {

        //        dbHandler.SaveErorr("usp_SFP_GET_FeePaymentReports", 0, ex.Message);
        //        throw ex;
        //    }
        //}

        //private void ExportDataSetToExcel(DataSet ds)
        //{
        //    //Creae an Excel application instance
        //    Excel.Application excelApp = new Excel.Application();

        //    //Create an Excel workbook instance and open it from the predefined location
        //    Excel.Workbook excelWorkBook = excelApp.Workbooks.Open(@"E:\Org.xlsx");

        //    foreach (DataTable table in ds.Tables)
        //    {
        //        //Add a new worksheet to workbook with the Datatable name
        //        Excel.Worksheet excelWorkSheet = excelWorkBook.Sheets.Add();
        //        excelWorkSheet.Name = table.TableName;

        //        for (int i = 1; i < table.Columns.Count + 1; i++)
        //        {
        //            excelWorkSheet.Cells[1, i] = table.Columns[i - 1].ColumnName;
        //        }

        //        for (int j = 0; j < table.Rows.Count; j++)
        //        {
        //            for (int k = 0; k < table.Columns.Count; k++)
        //            {
        //                excelWorkSheet.Cells[j + 2, k + 1] = table.Rows[j].ItemArray[k].ToString();
        //            }
        //        }
        //    }

        //    excelWorkBook.Save();
        //    excelWorkBook.Close();
        //    excelApp.Quit();

        //}

        #endregion

        #region POST Methods
        //[HttpPost, ActionName("AddDetainedStudent")]
        //public HttpResponseMessage AddDetainedStudent([FromBody]DetainedStudentData ReqData)
        //{

        //}

        [HttpPost, ActionName("DoAadhaarKyc")]
        public string DoAadhaarKyc([System.Web.Http.FromBody]AadhaarReqData ReqData)
        {
            string errCode = "1";
            string errInfo = "NA";
            string dc = "";
            string mi = "";
            string mc = "";
            string dpId = "";
            string rdsId = "";
            string rdsVer = "";
            string SKEY = "";
            string Data = "";
            string Hmac = "";
            string ci = "";
            string SrnoValue = "";
            Authentication objauth = new Authentication();
            AUAKUAParameters parms = new AUAKUAParameters();
            AUAKUAResponse resp = new AUAKUAResponse();
            //Default Pre Production Environment if Not Set if you want to Set Production Environment please uncomment below line 


            parms.LAT = "12.009";
            parms.LONG = "12.088";
            parms.DEVMACID = "";
            parms.DEVID = "";
            parms.SRNO = "2040444";
            parms.CONSENT = "Y";
            parms.SHRC = "Y";
            parms.LANG = "N";
            parms.PFR = "N";
            parms.VER = "2.5";
            parms.SERTYPE = ReqData.ServiceType; //Auth with finger 24  or ekyc 25
            parms.AADHAARID = ReqData.AadhaarNo;
            parms.SLK = ConfigurationManager.AppSettings["SLK"];
            parms.RRN = DateTime.Now.ToString("yyyyMMddHHmmssfff");

            var auaEnv = ConfigurationManager.AppSettings["AUA_ENV"].ToString();
            if (auaEnv == "PREPROD")
            {
                parms.ENV = "2";
                objauth.SystemEnvironment = Syntizen.Aadhaar.AUAKUA.Environment.PreProduction;
            }
            else
            {
                parms.ENV = "1";
                objauth.SystemEnvironment = Syntizen.Aadhaar.AUAKUA.Environment.Production;
            }

            XmlDocument xmldoc = new XmlDocument();
            //xmldoc.Load(System.Environment.CurrentDirectory + "\\PIDXML.xml");
            xmldoc.LoadXml(ReqData.ReqXml);
            string PIDXML = xmldoc.InnerXml;

            if (PIDXML.Length > 0)
            {
                XmlDocument PIDResponseXML = new XmlDocument();
                PIDResponseXML.LoadXml(PIDXML);
                var SubXmlTags = PIDResponseXML.GetElementsByTagName("Resp");
                errInfo = SubXmlTags[0].Attributes["errInfo"].Value.ToString();
                errCode = SubXmlTags[0].Attributes["errCode"].Value.ToString();
                if (errCode == "0")//Success
                {
                    XmlNode XmlDeviceInfoNode = PIDResponseXML.GetElementsByTagName("DeviceInfo")[0];
                    rdsVer = XmlDeviceInfoNode.Attributes["rdsVer"].Value;
                    dpId = XmlDeviceInfoNode.Attributes["dpId"].Value;
                    rdsId = XmlDeviceInfoNode.Attributes["rdsId"].Value;
                    mc = XmlDeviceInfoNode.Attributes["mc"].Value;
                    mi = XmlDeviceInfoNode.Attributes["mi"].Value;
                    dc = XmlDeviceInfoNode.Attributes["dc"].Value;
                    string srno = "";
                    if (XmlDeviceInfoNode.Attributes["srno"] == null)
                    {
                        XmlNodeList Xmladditionalinfo = PIDResponseXML.GetElementsByTagName("additional_info");
                        if (Xmladditionalinfo.Count > 0) {
                            XmlNodeList Params = Xmladditionalinfo[0].ChildNodes;
                            if (Params.Count > 1)
                            {
                                SrnoValue = Params[0].Attributes["value"].Value;
                            }
                        }
                        srno = SrnoValue;
                    }
                    else
                    {
                        srno = XmlDeviceInfoNode.Attributes["srno"].Value;
                        SrnoValue = XmlDeviceInfoNode.Attributes["srno"].Value;
                    }
                    XmlNode XmlSkeyNode = PIDResponseXML.GetElementsByTagName("Skey")[0];
                    ci = XmlSkeyNode.Attributes["ci"].Value;
                    SKEY = PIDResponseXML.GetElementsByTagName("Skey")[0].InnerText;
                    Hmac = PIDResponseXML.GetElementsByTagName("Hmac")[0].InnerText;
                    Data = PIDResponseXML.GetElementsByTagName("Data")[0].InnerText;
                }
            }
            parms.DC = dc;
            parms.MC = mc;
            parms.MI = mi;
            parms.DPID = dpId;
            parms.RDSID = rdsId;
            parms.RDSVER = rdsVer;
            parms.CI = ci;
            parms.DATA = Data;
            parms.SKEY = SKEY;
            parms.HMAC = Hmac;
            parms.SRNO = SrnoValue;
            resp = objauth.DoKYC(parms);

            if (resp.Status == 200)
            {

                return resp.Response.ToString();
                //HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);
                //response.Content = new StringContent(resp.Response.ToString(), System.Text.Encoding.UTF8, "application/json");
                //return response;
            }
            else
            {
                return resp.Response.ToString();
                //HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.InternalServerError);
                //response.Content = new StringContent(resp.Response.ToString(), System.Text.Encoding.UTF8, "application/json");
                //return response;
            }

            //Console.WriteLine("################################# Start Response ############################################");
            //Console.WriteLine(resp.ToString());
            //Console.WriteLine("################################# End Response ############################################");
        }

        [HttpPost]
        public async Task<string> RegisterBmaAttendee([System.Web.Http.FromBody]BmaReq ReqData)
        {

            var apikey = ConfigurationManager.AppSettings["BMA_API_Key"].ToString();
            var url = ConfigurationManager.AppSettings["BMA_API_Register"].ToString();
            ReqData.attdcodefalg = "0";
            ReqData.email = ReqData.email ?? "";
            ReqData.mobile = ReqData.mobile ?? "";
            ReqData.designation = "50";
            ReqData.category = "2";
            Task<int> reqid = PostBmaAttendeeReqLog(ReqData);
            var id = await reqid;
            Debug.WriteLine("responselog id" + id);
            using (HttpClient client = new HttpClient())
            {
                try
                {
                    client.DefaultRequestHeaders.Add("apikey", apikey);
                    var resMsg = await client.PostAsJsonAsync(url, ReqData);
                    var content = await resMsg.Content.ReadAsStringAsync();

                    try
                    {
                        var bmaRes = JsonConvert.DeserializeObject<BmaRes>(content);
                        // bmaRes.id = id1;
                        Task<string> resid = PostBmaAttendeeResLog(bmaRes, ReqData.attdcode, id);
                        var res = await resid;
                        Debug.WriteLine("response log" + res);
                        if (bmaRes.respcode == "200" || bmaRes.respcode == "408" || bmaRes.respcode == "409")
                        {
                            var db2 = new dbHandler();
                            var param2 = new SqlParameter[2];
                            param2[0] = new SqlParameter("@PIN", bmaRes.attendeecode ?? ReqData.attdcode);
                            param2[1] = new SqlParameter("@AttdId", bmaRes.attdid);
                            db2.ExecuteNonQueryWithStoredProcedure("usp_UpdateAttendeeId", param2);
                        }

                        string Msg = "AttendeeId successfully generated, Your AttendeeId : {0} for PIN : {1}, Secretary, SBTETTS.";
                        string smsurl = ConfigurationManager.AppSettings["SMS_API"].ToString();
                        if (ReqData.attdcode.ToString() != "" && ReqData.mobile.ToString() != "" && ReqData.mobile.ToString() != null)
                        {
                            var Message = string.Format(Msg, bmaRes.attdid.ToString(), ReqData.attdcode.ToString());
                            if (ReqData.mobile.ToString().ToString() != null && ReqData.mobile.ToString().ToString() != string.Empty && bmaRes.attdid.ToString() != "")
                            {
                                string urlParameters = "?mobile=" + ReqData.mobile.ToString() + "&message=" + Message + "&templateid=1007161786884459814";
                                HttpClient client1 = new HttpClient();
                                client1.BaseAddress = new Uri(smsurl);
                                client1.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                                HttpResponseMessage response = client1.GetAsync(urlParameters).Result;
                            }
                        }
                    }
                    catch (Exception ex)
                    {
                        dbHandler.SaveErorr("usp_UpdateAttendeeId", 0, ex.Message);
                        return ex.Message;
                    }

                    return content;
                    //HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);
                    //response.Content = new StringContent(content);
                    //return response;
                }
                catch (Exception ex)//HttpRequestException e
                {
                    dbHandler.SaveErorr("usp_UpdateAttendeeId", 0, ex.Message);
                    return ex.Message;
                    //HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.NotFound);
                    //response.Content = new StringContent(ex.Message);
                    //return response;
                }
            }

        }


        [HttpPost]
        public async Task<string> UpdateBmaAttendee([System.Web.Http.FromBody]BmaReq ReqData)
        {
            var apikey = ConfigurationManager.AppSettings["BMA_API_Key"].ToString();
            var url = ConfigurationManager.AppSettings["BMA_API_Update"].ToString();
            ReqData.attdcodefalg = "0";
            ReqData.email = ReqData.email ?? "";
            ReqData.mobile = ReqData.mobile ?? "";
            ReqData.designation = "50";
            ReqData.category = "2";

            Task<int> reqid = PostBmaAttendeeReqLog(ReqData);
            var id = await reqid;
            Debug.WriteLine("responselog id" + id);
            using (HttpClient client = new HttpClient())
            {
                try
                {
                    client.DefaultRequestHeaders.Add("apikey", apikey);
                    var resMsg = await client.PostAsJsonAsync(url, ReqData);
                    var content = await resMsg.Content.ReadAsStringAsync();

                    try
                    {
                        var bmaRes = JsonConvert.DeserializeObject<BmaRes>(content);
                        // bmaRes.id = id1;
                        Task<string> resid = PostBmaAttendeeResLog(bmaRes, ReqData.attdcode, id);
                        var res = await resid;
                        Debug.WriteLine("response log" + res);
                        if (bmaRes.respcode == "200" || bmaRes.respcode == "408" || bmaRes.respcode == "409")
                        {
                            var db2 = new dbHandler();
                            var param2 = new SqlParameter[2];
                            param2[0] = new SqlParameter("@PIN", bmaRes.attendeecode ?? ReqData.attdcode);
                            param2[1] = new SqlParameter("@AttdId", bmaRes.attdid);
                            db2.ExecuteNonQueryWithStoredProcedure("usp_UpdateAttendeeId", param2);
                        }
                    }
                    catch (Exception ex)
                    {
                        dbHandler.SaveErorr("usp_UpdateAttendeeId", 0, ex.Message);
                        return ex.Message;
                    }
                    return content;
                    //HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);
                    //response.Content = new StringContent(content);
                    //return response;
                }
                catch (Exception ex)
                {

                    Console.WriteLine(ex.Message);
                    //HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.InternalServerError);
                    //response.Content = new StringContent(ex.Message);
                    dbHandler.SaveErorr("usp_UpdateAttendeeId", 0, ex.Message);
                    return ex.Message;
                }
            }

        }



        [HttpPost]
        public async Task<string> TransferBmaAttendee([FromBody]BmaTransferReq ReqData)
        {
            var apikey = ConfigurationManager.AppSettings["BMA_API_Key"].ToString();
            var url = ConfigurationManager.AppSettings["BMA_API_Transfer"].ToString();
            ReqData.semester = ReqData.semester ?? "";
            ReqData.ref1 = ReqData.ref1 ?? "";
            ReqData.ref2 = ReqData.ref2 ?? "";
            ReqData.remarks = ReqData.remarks ?? "";          
            using (HttpClient client = new HttpClient())
            {
                try
                {
                    client.DefaultRequestHeaders.Add("apikey", apikey);
                    var resMsg = await client.PostAsJsonAsync(url, ReqData);
                    var content = await resMsg.Content.ReadAsStringAsync();

                    try
                    {
                        var bmaRes = JsonConvert.DeserializeObject<BmaRes>(content);                       
                        var db2 = new dbHandler();
                        var param2 = new SqlParameter[4];
                        param2[0] = new SqlParameter("@PIN", bmaRes.attendeecode);
                        param2[1] = new SqlParameter("@AttdId", bmaRes.attdid);
                        param2[2] = new SqlParameter("@Status", bmaRes.respcode);
                        param2[3] = new SqlParameter("@Remarks", bmaRes.respdesc);
                        db2.ExecuteNonQueryWithStoredProcedure("usp_TransferAttendeeId", param2);
                      
                    }
                    catch (Exception ex)
                    {
                        dbHandler.SaveErorr("usp_TransferAttendeeId", 0, ex.Message);
                        return ex.Message;
                    }                 
                    return content;
                }
                catch (HttpRequestException ex)
                {
                    Console.WriteLine(ex.Message);                 
                    dbHandler.SaveErorr("usp_TransferAttendeeId", 0, ex.Message);
                    return ex.Message;
                  
                }
            }

        }

      

        [HttpPost, ActionName("TransferStudent")]
        public string TransferStudent([FromBody]TransferReq ReqData)
        {
            try
            {
                BmaTransferReq BmaTransferReq = new BmaTransferReq();
                BmaTransferReq.orgcode = ReqData.collegecode;
                BmaTransferReq.attendeeid = ReqData.attendeeid;
                BmaTransferReq.branch = ReqData.branch;
                BmaTransferReq.semester = ReqData.semester;
                BmaTransferReq.ref1 ="";
                BmaTransferReq.ref2 ="";
                BmaTransferReq.remarks = ReqData.remarks;
                Task<string> bmares = TransferBmaAttendee(BmaTransferReq);
                var db = new dbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@pin", ReqData.pin);
                param[1] = new SqlParameter("@collegecode", ReqData.collegecode);
                param[2] = new SqlParameter("@oldCollegecode", ReqData.oldCollegecode);
                var ds = db.ReturnDataWithStoredProcedure("USP_TRANSFER_STUDENT", param);
                return JsonConvert.SerializeObject(ds);

            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_TRANSFER_STUDENT", 0, ex.Message);
                return ex.Message;
            }

        }

        [HttpGet, ActionName("GetTransferStudentdetails")]
        public string GetTransferStudentdetails(string Pin)
        {
            try
            {
                var db = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@pin", Pin);
                var ds = db.ReturnDataWithStoredProcedure("USP_GET_StudentDetailsForTransfer", param);
                return JsonConvert.SerializeObject(ds);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_GET_StudentDetailsForTransfer", 0, ex.Message);
                return ex.Message;
            }

        }

        [HttpGet, ActionName("GetTransferCollegeDetails")]
        public string GetTransferCollegeDetails(int AcademicYearId,string CollegeCode,string BranchCode,int SemId)
        {
            try
            {
                var db = new dbHandler();
                var param = new SqlParameter[4];
                param[0] = new SqlParameter("@CollegeCode", CollegeCode);
                param[1] = new SqlParameter("@AcademicYearId", AcademicYearId);
                param[2] = new SqlParameter("@BranchCode", BranchCode);
                param[3] = new SqlParameter("@SemId", SemId);
                var ds = db.ReturnDataWithStoredProcedure("USP_GET_TransferCollegeDetails", param);
                return JsonConvert.SerializeObject(ds);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_GET_TransferCollegeDetails", 0, ex.Message);
                return ex.Message;
            }

        }

        [HttpPost, ActionName("AdminSetDates")]
        public string AdminSetDates([FromBody] SetDates ReqData)
        {
            try
            {
                var db = new dbHandler();
                var param = new SqlParameter[5];
                param[0] = new SqlParameter("@Schemeid ", ReqData.Schemeid);
                param[1] = new SqlParameter("@SemId ", ReqData.SemId);
                param[2] = new SqlParameter("@StartDate ", ReqData.StartDate);
                param[3] = new SqlParameter("@EndDate ", ReqData.EndDate);
                param[4] = new SqlParameter("@AcademicYearId ", ReqData.AcademicYearId);
                var ds = db.ReturnDataWithStoredProcedure("ADM_Admission_SET_SemesterDates", param);
                return JsonConvert.SerializeObject(ds);

            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("ADM_Admission_SET_SemesterDates", 0, ex.Message);
                return ex.Message;
            }

        }



        private string GetBranchNameForId(string branchId)
        {
            var branchName = "";
            switch (branchId)
            {
                default:
                    branchName = branchId;
                    break;
            }
            return branchName;
        }

        public async static Task<int> PostBmaAttendeeReqLog(BmaReq ReqData)
        {
            try
            {
                DataTable idinfo = new DataTable();
                var db = new dbHandler();
                var param = new SqlParameter[12];
                param[0] = new SqlParameter("@orgcode", ReqData.orgcode);
                param[1] = new SqlParameter("@orgname", ReqData.orgname);
                param[2] = new SqlParameter("@branch", ReqData.branch);
                param[3] = new SqlParameter("@semester", ReqData.semester);
                param[4] = new SqlParameter("@aadhaarno", ReqData.aadhaarno);
                param[5] = new SqlParameter("@attdname", ReqData.attdname);
                param[6] = new SqlParameter("@attdcode", ReqData.attdcode);
                param[7] = new SqlParameter("@category", ReqData.category);
                param[8] = new SqlParameter("@designation", ReqData.designation);
                param[9] = new SqlParameter("@gender", ReqData.gender);
                param[10] = new SqlParameter("@email", ReqData.email);
                param[11] = new SqlParameter("@mobile", ReqData.mobile);
                idinfo = db.ReturnDataWithStoredProcedureTable("USP_SET_ATTENDEE_API_SEND_LOG", param);
                int id = Convert.ToInt32(idinfo.Rows[0]["id"]);
                Debug.WriteLine("response Sp " + id);
                return await Task.FromResult(id);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_SET_ATTENDEE_API_SEND_LOG", 0, ex.Message);
                return 0;
            }
        }

        public async static Task<string> PostBmaAttendeeResLog(BmaRes bmaRes, string ReqAttid, int id)
        {
            try
            {
                var dbHand = new dbHandler();
                var parameters = new SqlParameter[5];
                parameters[0] = new SqlParameter("@respcode", bmaRes.respcode);
                parameters[1] = new SqlParameter("@respdesc", bmaRes.respdesc);
                parameters[2] = new SqlParameter("@attdid", bmaRes.attdid);
                parameters[3] = new SqlParameter("@attendeecode", bmaRes.attendeecode ?? ReqAttid);
                parameters[4] = new SqlParameter("@id", id);
                var response = dbHand.ExecuteNonQueryWithStoredProcedure("USP_SET_ATTENDEE_API_RECEIVE_LOG", parameters);
                var res = await Task.FromResult(response.ToString());
                Debug.WriteLine(res);
                return res;
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_SET_ATTENDEE_API_RECEIVE_LOG", 0, ex.Message);
                return ex.Message;
            }
        }
        [HttpPost, ActionName("AddDetainedStudent")]
        public string AddDetainedStudent([FromBody]Add_Detained_Student ReqData)
        {
            try
            {
                var db = new dbHandler();
                var param = new SqlParameter[5];
                param[0] = new SqlParameter("@collegecode", ReqData.collegecode);
                param[1] = new SqlParameter("@AcademicYear", ReqData.AcademicYear);
                param[2] = new SqlParameter("@scheme", ReqData.scheme);
                param[3] = new SqlParameter("@semid", ReqData.semid);
                param[4] = new SqlParameter("@pin", ReqData.pin);
                var res = db.ReturnDataWithStoredProcedure("usp_cwise_addStudentUpdate", param);

                return JsonConvert.SerializeObject(res);
                //HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);
                //response.Content = new StringContent(JsonConvert.SerializeObject(res));
                //return response;
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("usp_cwise_addStudentUpdate", 0, ex.Message);
                return ex.Message;
            }

        }

        [HttpGet, ActionName("GetDistricts")]
        public string getDistricts()
        {
            try
            {
                var dbHandler = new dbHandler();
                string StrQuery = "";
                StrQuery = "exec USP_GET_Districts";
                var res = dbHandler.ReturnDataSet(StrQuery);
                return JsonConvert.SerializeObject(res);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_GET_Districts", 0, ex.Message);
                return ex.Message;
            }
        }

        [HttpGet, ActionName("GetAdmissionReports")] 
        public string GetAdmissionReports()
        {
            try
            {
                var dbHandler = new dbHandler();
                string StrQuery = "";
                StrQuery = "exec ADM_GET_AdmissionReports_old";
                var res = dbHandler.ReturnDataSet(StrQuery);
                return JsonConvert.SerializeObject(res);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("ADM_GET_AdmissionReports_old", 0, ex.Message);
                throw ex;
            }
        }


        [HttpGet, ActionName("GetCategory")]
        public string GetCategory()
        {
            try
            {
                var dbHandler = new dbHandler();
                string StrQuery = "";
                StrQuery = "exec USP_GET_Category";
                var res = dbHandler.ReturnDataSet(StrQuery);
                return JsonConvert.SerializeObject(res);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_GET_Category", 0, ex.Message);
                return ex.Message;
            }
        }

        [HttpGet, ActionName("GetBanks")]
        public string GetBanks()
        {
            try
            {
                var dbHandler = new dbHandler();
                string StrQuery = "";
                StrQuery = "exec USP_BankNames";
                var res = dbHandler.ReturnDataSet(StrQuery);
                return JsonConvert.SerializeObject(res);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_BankNames", 0, ex.Message);
                return ex.Message;
            }
        }



        [HttpGet, ActionName("GetSpecialCategory")]
        public string GetSpecialCategory()
        {
            try
            {
                var dbHandler = new dbHandler();
                string StrQuery = "";
                StrQuery = "exec USP_GET_SpecialCategory";
                var res = dbHandler.ReturnDataSet(StrQuery);
                return JsonConvert.SerializeObject(res);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_GET_SpecialCategory", 0, ex.Message);
                return ex.Message;
            }
        }

        [HttpGet, ActionName("GetEducationalQualification")]
        public string GetEducationalQualification()
        {
            try
            {
                var dbHandler = new dbHandler();
                string StrQuery = "";
                StrQuery = "exec USP_GET_EducationQualification";
                var res = dbHandler.ReturnDataSet(StrQuery);
                return JsonConvert.SerializeObject(res);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_GET_EducationQualification", 0, ex.Message);
                return ex.Message;
            }
        }

        [HttpGet, ActionName("GetReligion")]
        public string GetReligion()
        {
            try
            {
                var dbHandler = new dbHandler();
                string StrQuery = "";
                StrQuery = "exec USP_GET_Religion";
                var res = dbHandler.ReturnDataSet(StrQuery);
                return JsonConvert.SerializeObject(res);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_GET_Religion", 0, ex.Message);
                return ex.Message;
            }
        }

        [HttpGet, ActionName("GetRegion")]
        public string GetRegion()
        {
            try
            {
                var dbHandler = new dbHandler();
                string StrQuery = "";
                StrQuery = "exec USP_GET_Region";
                var res = dbHandler.ReturnDataSet(StrQuery);
                return JsonConvert.SerializeObject(res);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_GET_Region", 0, ex.Message);
                return ex.Message;
            }
        }

        [HttpGet, ActionName("GetMiniority")]
        public string GetMiniority()
        {
            try
            {
                var dbHandler = new dbHandler();
                string StrQuery = "";
                StrQuery = "exec USP_GET_Minority";
                var res = dbHandler.ReturnDataSet(StrQuery);
                return JsonConvert.SerializeObject(res);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_GET_Minority", 0, ex.Message);
                return ex.Message;
            }
        }



        [HttpPost, ActionName("ReadmissionOfStudent")]
        public string ReadmissionOfStudent([FromBody]Readmitting_Student ReqData)
        {
            try
            {
                var db = new dbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@collegecode", ReqData.collegecode);
                param[1] = new SqlParameter("@semid", ReqData.semid);
                param[2] = new SqlParameter("@pin", ReqData.pin);
                var res = db.ReturnDataWithStoredProcedure("ReadmittStudent", param);
                return JsonConvert.SerializeObject(res);
                //HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);
                //response.Content = new StringContent(JsonConvert.SerializeObject(res));
                //return response;
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("ReadmittStudent", 0, ex.Message);
                return ex.Message;
            }

        }

        [HttpGet, ActionName("GetStudentDetailsPrint")]
        public string GetStudentDetailsPrint(float StudentId)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@StudentId", StudentId);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("USP_Admission_Get_StudentDetailsForPrint", param);
                return JsonConvert.SerializeObject(dt);

            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_Admission_Get_StudentDetailsForPrint", 0, ex.Message);
                return ex.Message;
            }
        }

        [HttpGet, ActionName("GeneratePin")]
        public string GeneratePin(int StudentID)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@StudentID", StudentID);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("USP_RE_GENERATE_PIN506", param);
                return JsonConvert.SerializeObject(dt);

            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_RE_GENERATE_PIN506", 0, ex.Message);
                return ex.Message;
            }
        }
        

        [HttpGet, ActionName("GetMandalsForDistrict")]
        public string GetMandalsForDistrict(int DistrictID)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@DistrictID", DistrictID);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("USP_Get_MandalsByDistrict", param);
                return JsonConvert.SerializeObject(dt);

            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_Get_MandalsByDistrict", 0, ex.Message);
                return ex.Message;
            }
        }

        //private void ExportDataSetToExcel(DataSet ds)
        //{

        //    DocumentFormat.OpenXml.Office.Excel.Application excelApp = new DocumentFormat.OpenXml.Office.Excel.Application();

        //    Create  DocumentFormat.OpenXml.Office.Excel workbook instance and open it from the predefined location
        //    DocumentFormat.OpenXml.Office.Excel = (@"E:\Org.xlsx");

        //    foreach (DataTable table in ds.Tables)
        //    {
        //        Add a new worksheet to workbook with the Datatable name
        //        DocumentFormat.OpenXml.Office.Excel=
        //        excelWorkSheet.Name = table.TableName;

        //        for (int i = 1; i < table.Columns.Count + 1; i++)
        //        {
        //            excelWorkSheet.Cells[1, i] = table.Columns[i - 1].ColumnName;
        //        }

        //        for (int j = 0; j < table.Rows.Count; j++)
        //        {
        //            for (int k = 0; k < table.Columns.Count; k++)
        //            {
        //                excelWorkSheet.Cells[j + 2, k + 1] = table.Rows[j].ItemArray[k].ToString();
        //            }
        //        }
        //    }


        //}
        //        private  async void ExportDataSetToExcel()
        //        { 
        //        var output = await reportObj.GetExcelData(rParams);

        //         if (output != null){
        //        var result = new HttpResponseMessage(HttpStatusCode.OK)
        //        {
        //            Content = new ByteArrayContent(output.ConentBytes)
        //        };

        //        private static Task reportObj;
        //        private static object rParams;
        //        private object output;

        //        public object FileName { get; private set; }

        //        result.Content.Headers.ContentType = new MediaTypeHeaderValue("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        //        result.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment")
        //        {
        //            FileName = output.FileName
        //        };
        //            return result;
        // }
        //}
        //[HttpGet]
        //public string Export()
        //{
        //    List<Core.Entities.InvoiceInfo> invoices = _repository.GetInvoiceFromDateToDate();
        //    if (invoices != null)
        //    {
        //        DataTable dt = new DataTable("TransactionReport");
        //        dt.Columns.AddRange(new DataColumn[3]
        //        {
        //        new DataColumn("1"),
        //        new DataColumn("2"),
        //        new DataColumn("3"),

        //           });
        //        foreach (var item in invoices)
        //            dt.Rows.Add(item.RowNumber, item.InvoiceNumber);
        //        XLWorkbook wb = new XLWorkbook();
        //        {
        //            wb.Worksheets.Add(dt);
        //            MemoryStream ms = new MemoryStream();
        //            {
        //                wb.SaveAs(ms);
        //                ms.Position = 0;
        //              var  result = Request.CreateResponse(HttpStatusCode.OK);
        //                result.Content = new StreamContent(ms);
        //                result.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment");
        //                result.Content.Headers.ContentType = new MediaTypeHeaderValue("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        //                result.Content.Headers.ContentDisposition.FileName = "TransactionReport(1).xlsx";
        //                return result;
        //            }
        //        }
        //    }
        //    return Request.CreateResponse(HttpStatusCode.NoContent);
        //}
        [HttpGet, ActionName("StudentReadmissiondata")]
        public string StudentReadmissiondata(string pinNumber)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@pinNumber", pinNumber);

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("USP_ADM_SET_REadmission", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_ADM_SET_REadmission", 0, ex.Message);
                return ex.Message;
            }

        }
        [HttpGet, ActionName("getattandance")]
        public string getattandance(string p)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@p", p);

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("USP_Attendance_GET_PhoneNumberForSms", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_Attendance_GET_PhoneNumberForSms", 0, ex.Message);
                return ex.Message;
            }

        }

        [HttpGet, ActionName("GetReadmissionSetSate")]
        public string GetReadmissionSetSate()
        {
            try
            {
                var dbHandler = new dbHandler();
                string StrQuery = "";
                StrQuery = "exec Usp_Adimission_Get_ReadmissionsetDates";
                var res = dbHandler.ReturnDataSet(StrQuery);
                return JsonConvert.SerializeObject(res);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("Usp_Adimission_Get_ReadmissionsetDates", 0, ex.Message);
                return ex.Message;
            }
        }


        [HttpPost, ActionName("SaveReadmisssiondata")]
        public string SaveReadmisssiondata(int AcademicYearId,int SemesterId,string Formdate,string Todate,string FineAmount)
        {
            try
            {
                var db = new dbHandler();
                var param = new SqlParameter[5];
                param[0] = new SqlParameter("@AcademicYearId", AcademicYearId);
                param[1] = new SqlParameter("@SemesterId", SemesterId);
                param[2] = new SqlParameter("@Formdate", Formdate);
                param[3] = new SqlParameter("@Todate", Todate);
                param[4] = new SqlParameter("@FineAmount", FineAmount);

                var res = db.ReturnDataWithStoredProcedure("Usp_Adimission_SET_ReadmissionsetDates", param);
                return JsonConvert.SerializeObject(res);
            
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("Usp_Adimission_SET_ReadmissionsetDates", 0, ex.Message);
                return ex.Message;
            }

        }
        [HttpGet, ActionName("GetStudentData")]
        public string GetStudentData(string PIN)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@PIN", PIN);
                var ds = dbHandler.ReturnDataWithStoredProcedure("USP_GET_STUDENT_TCDETAILES", param);
                // HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);
                //  response.Content = new StringContent(JsonConvert.SerializeObject(ds), System.Text.Encoding.UTF8, "application/json");
                return JsonConvert.SerializeObject(ds);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_GET_STUDENT_TCDETAILES", 0, ex.Message);
                return ex.Message;
            }



        }
        
        [HttpGet, ActionName("GetCertificate")]
        public string GetCertificate()
        {
            try
            {
                var dbHandler = new dbHandler();
                string StrQuery = "";
                StrQuery = "exec USP_SBP_GET_Certificates";
                var res = dbHandler.ReturnDataSet(StrQuery);
                return JsonConvert.SerializeObject(res);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_SBP_GET_Certificates", 0, ex.Message);
                return ex.Message;
            }
        }


        #endregion

    }
}
