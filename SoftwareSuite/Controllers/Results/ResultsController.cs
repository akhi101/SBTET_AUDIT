using Newtonsoft.Json;
using SoftwareSuite.BLL;
using SoftwareSuite.Models.Database;
using SoftwareSuite.Models.Results;
using SoftwareSuite.Models.Security;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text.RegularExpressions;
using System.Web.Http;

namespace SoftwareSuite.Controllers.Results
{
    public class ResultsController : ApiController
    {
        public HttpResponseMessage GetCollegeSemWiseReport(int SchemeId, int SemYearId)
        {
            IEnumerable<CollegeSemWiseReport> ResultList;
            ResultBLL ReportResultBLL = new ResultBLL();
            ResultList = ReportResultBLL.GetCollegeSemWiseReport(SchemeId, SemYearId);
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, ResultList);
            return response;
        }

        public HttpResponseMessage GetSchemeDataForResults()
        {
            ResultBLL ReportResultBLL = new ResultBLL();
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, ReportResultBLL.GetSchemeDataForResults());
            return response;
        }

        public HttpResponseMessage GetExamTypeForResults(int SchemeId)
        {
            ResultBLL ReportResultBLL = new ResultBLL();
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, ReportResultBLL.GetExamTypeForResults(SchemeId));
            return response;
        }

        public HttpResponseMessage GetBranchWiseReport(int CollegeId, int SchemeId, int SemYearId, int ExamTypeId, int BranchId, int ExamMonthYearId)
        {
            IEnumerable<BranchWiseReportData> ResultList;
            ResultBLL ReportResultBLL = new ResultBLL();
            ResultList = ReportResultBLL.GetBranchWiseReport(CollegeId, SchemeId, SemYearId, ExamTypeId, BranchId, ExamMonthYearId);
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, ResultList); 
            return response;
        }
        public HttpResponseMessage GetC18MidBranchWiseReport(int CollegeId, int SchemeId, int SemYearId, int ExamTypeId, int BranchId,int AcademicId)
        {
            IEnumerable<BranchWiseReportData> ResultList;
            ResultBLL ReportResultBLL = new ResultBLL();
            ResultList = ReportResultBLL.GetC18MidBranchWiseReport(CollegeId, SchemeId, SemYearId, ExamTypeId, BranchId, AcademicId);
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, ResultList);
            return response;
        }
        public HttpResponseMessage GetBranchWiseOldReport(int CollegeId, int SchemeId, int SemYearId, int ExamTypeId, string BranchId)
        {
            ResultBLL ReportResultBLL = new ResultBLL();
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, ReportResultBLL.GetBranchWiseOldReport(CollegeId, SchemeId, SemYearId, ExamTypeId, BranchId));
            return response;
        }
        public HttpResponseMessage GetStudentWiseReport( int StudentTypeId, string Pin, int SchemeId, int ExamMonthYearId, int ExamTypeId = 1, int SemYearId = 1)
        {
            List<Output> p = new List<Output>();
            Output p1 = new Output();
            Regex objAlphaPattern = new Regex("[^a-zA-Z0-9.-]");

            if (!objAlphaPattern.IsMatch(Pin))
            {

                IEnumerable<StudentWiseReportData> ResultList;
            ResultBLL ReportResultBLL = new ResultBLL();
            ResultList = ReportResultBLL.GetStudentWiseReport(SemYearId, StudentTypeId, Pin, SchemeId, ExamTypeId, ExamMonthYearId);
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, ResultList);
            return response;
            }
            else
            {

                p1.ResponceCode = "400";
                p1.ResponceDescription = "Please Enter a Valid PIN";
                p.Add(p1);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, p);
                return response;

            }
        }

        public class Output
        {
            public string Data { get; set; }
            public string Captcha { get; set; }
            public string status { get; set; }
            public string ResponceCode { get; set; }
            public string ResponceDescription { get; set; }
        }

        public HttpResponseMessage GetC18MidStudentWiseReport(int SemYearId, string Pin, int SchemeId, int ExamTypeId)
        {
            List<Output> p = new List<Output>();
            Output p1 = new Output();
            Regex objAlphaPattern = new Regex("[^a-zA-Z0-9.-]");

            if (!objAlphaPattern.IsMatch(Pin))
            {
                IEnumerable<C18MidStudentWiseReportData> ResultList;
            ResultBLL ReportResultBLL = new ResultBLL();
            ResultList = ReportResultBLL.GetC18MidStudentWiseReport(SemYearId, Pin, SchemeId, ExamTypeId);
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, ResultList);
            return response;
            }
            else
            {

                p1.ResponceCode = "400";
                p1.ResponceDescription = "Please Enter a Valid PIN";
                p.Add(p1);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, p);
                return response;

            }
        }
        public HttpResponseMessage GetOldStudentWiseReport(int StudentTypeId, string Pin, int SchemeId, int ExamMonthYearId, int ExamTypeId = 1, int SemYearId = 1)
        {
            List<Output> p = new List<Output>();
            Output p1 = new Output();
            Regex objAlphaPattern = new Regex("[^a-zA-Z0-9.-]");

            if (!objAlphaPattern.IsMatch(Pin))
            {
                ResultBLL ReportResultBLL = new ResultBLL();
            var ResultList = ReportResultBLL.GetOldStudentWiseReport(SemYearId, StudentTypeId, Pin, SchemeId, ExamTypeId, ExamMonthYearId);
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, ResultList);
            return response;
        }
            else
            {

                p1.ResponceCode = "400";
                p1.ResponceDescription = "Please Enter a Valid PIN";
                p.Add(p1);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, p);
                return response;

            }
}
        public HttpResponseMessage GetSchemeSemBranchInfo(int CollegeId)
        {
            IEnumerable<SchemeSemBranchData> ResultList;
            ResultBLL ReportResultBLL = new ResultBLL();
            ResultList = ReportResultBLL.GetSchemeSemBranchInfo(CollegeId);
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, ResultList);
            return response;
        }


        public HttpResponseMessage GetCollegesSchemeSemInfo()
        {
            IEnumerable<CollegeSchemeSemData> ResultList;
            ResultBLL ReportResultBLL = new ResultBLL();
            ResultList = ReportResultBLL.GetCollegesSchemeSemInfo();
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, ResultList);
            return response;
        }

        public HttpResponseMessage GetExamTypeInfo(int SchemeId, int SemYearId)
        {
            IEnumerable<ExamTypeData> ResultList;
            ResultBLL ReportResultBLL = new ResultBLL();
            ResultList = ReportResultBLL.GetExamTypeInfo(SchemeId, SemYearId);
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, ResultList);
            return response;
        }
        public HttpResponseMessage GetTypeWritingShorthandReport(string HallTicketno)
        {
            ResultBLL ReportResultBLL = new ResultBLL();
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, ReportResultBLL.GetTypeWritingShorthandReport(HallTicketno));
            return response;
        }
        [HttpGet, ActionName("GetStudentByPin")]
        public string GetStudentByPin(string Pin)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@pin", Pin);
                var ds = dbHandler.ReturnDataWithStoredProcedure("Usp_ResultsData_GetResultsByPIN", param);
                return JsonConvert.SerializeObject(ds);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("Usp_ResultsData_GetResultsByPIN", 0, ex.Message);
                return ex.Message;
            }
        }
        [HttpGet, ActionName("GetDecryptedData")]
        public string GetDecryptedData(string DataType)
        {
            try
            {

                var res = DataType.ToString().Split(new string[] { "$$@@$$" }, StringSplitOptions.None);
                var crypt = new HbCrypt(res[1]);
                var encrypt = new HbCrypt();
                string datatype = crypt.AesDecrypt(res[0]);
                string decryptdatatype = encrypt.AesDecrypt(datatype);
                return decryptdatatype;

            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpGet, ActionName("GetConsolidatedResults")]
        public string GetConsolidatedResults(string Pin)
        {
            try
            {
                string pin = GetDecryptedData(Pin);
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@Pin", pin);
                var ds = dbHandler.ReturnDataWithStoredProcedure("USP_Results_StudentCumulativeScoresForStudents", param); //USP_RESULTS_GET_ConsolidatedMarksData_1
                return JsonConvert.SerializeObject(ds);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_Results_StudentCumulativeScoresForStudents", 0, ex.Message);
                return ex.Message;
            }
        }

        [HttpGet, ActionName("GetConsolidatedPreviewResults")]
        public string GetConsolidatedPreviewResults(int StudentTypeId,string scheme, string Pin)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@StudentTypeId", StudentTypeId);
                param[1] = new SqlParameter("@scheme", scheme);
                param[2] = new SqlParameter("@Pin", Pin);
                var ds = dbHandler.ReturnDataWithStoredProcedure("ADM_GET_6_0_ResultsPreviewForTesting", param); 
                return JsonConvert.SerializeObject(ds);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("ADM_GET_6_0_ResultsPreviewForTesting", 0, ex.Message);
                return ex.Message;
            }
        }


        [HttpGet, ActionName("GetConsolidatedRVRCPreviewResults")]
        public string GetConsolidatedRVRCPreviewResults(int ExamMonthYearId,int StudentTypeId,string Scheme, string Pin,int ExamTypeId =0)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[5];
                param[0] = new SqlParameter("@ExamMonthYearId", ExamMonthYearId);
                param[1] = new SqlParameter("@StudentTypeId", StudentTypeId);
                param[2] = new SqlParameter("@Scheme", Scheme);
                param[3] = new SqlParameter("@Pin", Pin);
                param[4] = new SqlParameter("@ExamTypeId", ExamTypeId);
                var ds = dbHandler.ReturnDataWithStoredProcedure("ADM_GET_7_0_ResultsPreviewForTesting", param);
                return JsonConvert.SerializeObject(ds);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("ADM_GET_7_0_ResultsPreviewForTesting", 0, ex.Message);
                return ex.Message;
            }
        }


        [HttpGet, ActionName("GetC14ConsolidatedResult")]
        public string GetC14ConsolidatedResult(string Pin)
        {
            try
            {
                string pin = GetDecryptedData(Pin);
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@Pin", pin);
                var ds = dbHandler.ReturnDataWithStoredProcedure("USP_Results_Get_C14ConsolidatedMarksData", param);
                return JsonConvert.SerializeObject(ds);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_Results_Get_C14ConsolidatedMarksData", 0, ex.Message);
                return ex.Message;
            }
        }

        [HttpGet, ActionName("GetC09ConsolidatedResult")]
        public string GetC09ConsolidatedResult(string Pin)
        {
            try
            {
                string pin = GetDecryptedData(Pin);

                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@Pin", pin);
                var ds = dbHandler.ReturnDataWithStoredProcedure("USP_Results_Get_C09ConsolidatedMarksData", param);
                return JsonConvert.SerializeObject(ds);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_Results_Get_C09ConsolidatedMarksData", 0, ex.Message);
                return ex.Message;
            }
        }

        [HttpGet, ActionName("GetC05ConsolidatedResult")]
        public string GetC05ConsolidatedResult(string Pin)
        {
            try
            {
                string pin =GetDecryptedData(Pin);
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@Pin", pin);
                var ds = dbHandler.ReturnDataWithStoredProcedure("USP_Results_Get_C05ConsolidatedMarksData", param);
                return JsonConvert.SerializeObject(ds);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_Results_Get_C05ConsolidatedMarksData", 0, ex.Message);
                return ex.Message;
            }
        }

        [HttpGet, ActionName("GetC08ConsolidatedResult")]
        public string GetC08ConsolidatedResult(string Pin)
        {
            try
            {
                string pin = GetDecryptedData(Pin);
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@Pin", pin);
                var ds = dbHandler.ReturnDataWithStoredProcedure("USP_Results_Get_C08ConsolidatedMarksData", param);
                return JsonConvert.SerializeObject(ds);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_Results_Get_C08ConsolidatedMarksData", 0, ex.Message);
                return ex.Message;
            }
        }

        [HttpGet, ActionName("GetC16ConsolidatedResult")]
        public string GetC16ConsolidatedResult(string Pin)
        {
            try
            {
                string pin = GetDecryptedData(Pin);
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@Pin", pin);
                var ds = dbHandler.ReturnDataWithStoredProcedure("USP_Results_Get_C16ConsolidatedMarksData", param);
                return JsonConvert.SerializeObject(ds);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_Results_Get_C16ConsolidatedMarksData", 0, ex.Message);
                return ex.Message;
            }
        }

        [HttpGet, ActionName("GetC16SConsolidatedResult")]
        public string GetC16SConsolidatedResult(string Pin)
        {
            try
            {
                string pin = GetDecryptedData(Pin);
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@Pin", pin);
                var ds = dbHandler.ReturnDataWithStoredProcedure("USP_Results_Get_C16SConsolidatedMarksData", param);
                return JsonConvert.SerializeObject(ds);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_Results_Get_C16SConsolidatedMarksData", 0, ex.Message);
                return ex.Message;
            }
        }

        [HttpGet, ActionName("GetER91ConsolidatedResult")]
        public string GetER91ConsolidatedResult(string Pin)
        {
            try
            {
                string pin = GetDecryptedData(Pin);
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@Pin", pin);
                var ds = dbHandler.ReturnDataWithStoredProcedure("USP_Results_Get_ER91ConsolidatedMarksData", param);
                return JsonConvert.SerializeObject(ds);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_Results_Get_ER91ConsolidatedMarksData", 0, ex.Message);
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

        [HttpGet, ActionName("getExamAndMonthYear")]
        public string getExamAndMonthYear()
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



        [HttpGet, ActionName("GetResultsHistory")]
        public string GetResultsHistory(string Pin)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@Pin", Pin);
                var ds = dbHandler.ReturnDataWithStoredProcedure("USP_Results_StudentCumulativeScores", param);
                return JsonConvert.SerializeObject(ds);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_Results_StudentCumulativeScores", 0, ex.Message);
                return ex.Message;
            }
        }

        [HttpGet, ActionName("getStudentbacklogHistory")]
        public string getStudentbacklogHistory(string Pin,string subcode)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@pin", Pin);
                param[1] = new SqlParameter("@subcode", subcode);
                var ds = dbHandler.ReturnDataWithStoredProcedure("Usp_ResultsData_GetResultsByPINSubjectwise", param);
                return JsonConvert.SerializeObject(ds);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("Usp_ResultsData_GetResultsByPINSubjectwise", 0, ex.Message);
                return ex.Message;
            }
        }

        [HttpGet, ActionName("Getc09StudentWiseReport")]
        public string Getc09StudentWiseReport(string Pin, int StudentTypeId,int ExamMonthYearId,int SchemeId,int semid,int ExamTypeId)
        {
            try
            {
             
                var dbHandler = new dbHandler();
                var param = new SqlParameter[6];
                param[0] = new SqlParameter("@pin", Pin);
                param[1] = new SqlParameter("@StudentTypeId", StudentTypeId);
                param[2] = new SqlParameter("@ExamMonthYearId", ExamMonthYearId);
                param[3] = new SqlParameter("@SchemeId", SchemeId);
                param[4] = new SqlParameter("@semid", semid);
                param[5] = new SqlParameter("@ExamTypeId", ExamTypeId);
                var ds = dbHandler.ReturnDataWithStoredProcedure("USP_Results_GET_C09StudentMarksData", param);
                return JsonConvert.SerializeObject(ds);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_Results_GET_C09StudentMarksData", 0, ex.Message);
                return ex.Message;
            }
        }




    }
}
