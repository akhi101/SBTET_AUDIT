using System;

using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Data.SqlClient;
using Newtonsoft.Json;

using SoftwareSuite.Models.Database;

using RestSharp;
using System.Threading.Tasks;
using System.Configuration;
using System.Xml;
using System.Collections.Generic;
using System.IO;
using SoftwareSuite.Controllers.ExternalServices;
using System.Web;
using System.Data;
using SoftwareSuite.Models;
using static SoftwareSuite.Controllers.Assessment.AssessmentController;
using System.Timers;
using SoftwareSuite.Models.Assessment;
using System.Diagnostics;
using System.Web.Script.Serialization;

namespace SoftwareSuite.Controllers.CCIC
{
    public class CcicAssessmentController : ApiController
    {


        public class EntryDatesInfo
        {
            public int DataType { get; set; }
            public int EntryDateID { get; set; }
            public int AcademicYearID { get; set; }
            public int ExamMonthYearID { get; set; }
            public DateTime StartDate { get; set; }
            public DateTime EndDate { get; set; }
            public bool Active { get; set; }
            public string UserName { get; set; }
        }

        [HttpPost, ActionName("AddorUpdateorInActiveAssesmentEntryDates")]
        public string AddorUpdateorInActiveAssesmentEntryDates([FromBody] EntryDatesInfo data)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[8];
                param[0] = new SqlParameter("@DataType", data.DataType);
                param[1] = new SqlParameter("@EntryDateID", data.EntryDateID);
                param[2] = new SqlParameter("@AcademicYearID", data.AcademicYearID);
                param[3] = new SqlParameter("@ExamMonthYearID", data.ExamMonthYearID);
                param[4] = new SqlParameter("@StartDate", data.StartDate);
                param[5] = new SqlParameter("@EndDate", data.EndDate);
                param[6] = new SqlParameter("@Active", data.Active);
                param[7] = new SqlParameter("@UserName", data.UserName);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Add_Update_AssesmentEntryDates", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("SP_Add_Update_AssesmentEntryDates", 0, ex.Message);
                return ex.Message;
            }

        }

        [HttpGet, ActionName("GetAssesmentEntryDates")]
        public string GetAssesmentEntryDates(int AcademicYearID)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@AcademicYearID", AcademicYearID);

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Get_AssesmentEntryDates", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpGet, ActionName("GetCcicAcademicYears")]
        public HttpResponseMessage GetCcicAcademicYears()
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                string StrQuery = "";
                StrQuery = "exec SP_Get_AcademicYears";
                return Request.CreateResponse(HttpStatusCode.OK, dbHandler.ReturnDataWithStoredProcedureTable(StrQuery));
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("SP_Get_AcademicYears", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpGet, ActionName("GetCcicCurrentAcademicYear")]
        public HttpResponseMessage GetCcicCurrentAcademicYear()
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                string StrQuery = "";
                StrQuery = "exec SP_Get_CurrentAcademicYear";
                return Request.CreateResponse(HttpStatusCode.OK, dbHandler.ReturnDataSet(StrQuery));
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("SP_Get_CurrentAcademicYear", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }


        [HttpGet, ActionName("GetExamMonthYears")]
        public string GetExamMonthYears(int AcademicYearID)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@AcademicYearID", AcademicYearID);

                var dt = dbHandler.ReturnDataSet("SP_Get_ExamMonthYears", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpGet, ActionName("VerifyAssesmentEntryDate")]
        public string VerifyAssesmentEntryDate(int AcademicYearID,int ExamMonthYearID)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@AcademicYearID", AcademicYearID);
                param[1] = new SqlParameter("@ExamMonthYearID", ExamMonthYearID);

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Verify_AssessmentEntryDates", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpGet, ActionName("GetExamTypes")]
        public HttpResponseMessage GetExamTypes()
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                string StrQuery = "";
                StrQuery = "exec SP_Get_ExamTypes";
                return Request.CreateResponse(HttpStatusCode.OK, dbHandler.ReturnDataSet(StrQuery));
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("SP_Get_ExamTypes", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }


        [HttpGet, ActionName("GetInternalorExternalSubjects")]
        public string GetInternalorExternalSubjects(int AcademicYearID, int ExamMonthYearID,int InstitutionID, int CourseID,int ExamTypeID)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[5];
                param[0] = new SqlParameter("@AcademicYearID", AcademicYearID);
                param[1] = new SqlParameter("@ExamMonthYearID", ExamMonthYearID);
                param[2] = new SqlParameter("@InstitutionID", InstitutionID);
                param[3] = new SqlParameter("@CourseID", CourseID);
                param[4] = new SqlParameter("@ExamTypeID", ExamTypeID);

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Get_MarksEntrySubjects", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }



        [HttpGet, ActionName("GetCcicSubjectPinList")]
        public string GetCcicSubjectPinList(int AcademicYearID,int ExamMonthYearID, int InstitutionID, int CourseID,int ExamTypeID,int SubjectID)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[6];
                param[0] = new SqlParameter("@AcademicYearID", AcademicYearID);
                param[1] = new SqlParameter("@ExamMonthYearID", ExamMonthYearID);
                param[2] = new SqlParameter("@InstitutionID", InstitutionID);
                param[3] = new SqlParameter("@CourseID", CourseID);
                param[4] = new SqlParameter("@ExamTypeID", ExamTypeID);
                param[5] = new SqlParameter("@SubjectID", SubjectID);

                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_Get_MarksEntryPINList", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        public class PostExamMarks
        {
            public string UserName { get; set; }

            public List<marklist> marksdata { get; set; }
        }

        public class marklist
        {
            public int MarksEntryDataID { get; set; }
            public string Marks { get; set; }
        }


        [HttpPost, ActionName("PostCcicStudentMarks")]
        public string PostCcicStudentMarks([FromBody] PostExamMarks ExamMarks)
        {
            try
            {

                var marksDat = new List<marklist>();
                int size = ExamMarks.marksdata.Count;
                for (int i = 0; i < size; i++)
                {
                    marksDat.Add(ExamMarks.marksdata[i]);
                }


                Debug.WriteLine("marks entry before Conv to json: " + marksDat);
                var json = new JavaScriptSerializer().Serialize(marksDat);
                Debug.WriteLine("marks entry json: " + json);
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@json", json);
                param[1] = new SqlParameter("@UserName", ExamMarks.UserName);
                var res = dbHandler.ReturnDataWithStoredProcedureTable("SP_Set_MarksEntryData", param);
                return JsonConvert.SerializeObject(res);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("SP_Set_MarksEntryData", 0, ex.Message);
                return ex.Message;
            }
        }

        public class submitMarks
        {
            public int SubjectID { get; set; }
            public int AcademicYearID { get; set; }
            public int CourseID { get; set; }
            public int ExamTypeID { get; set; }
            public int InstitutionID { get; set; }
            public int ExamMonthYearID { get; set; }

        }

        [HttpPost, ActionName("SubmitMarksEntered")]
        public string SubmitMarksEntered([FromBody] submitMarks request)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[6];
                param[0] = new SqlParameter("@AcademicYearID", request.AcademicYearID);
                param[1] = new SqlParameter("@ExamMonthYearID", request.ExamMonthYearID);
                param[2] = new SqlParameter("@InstitutionID", request.InstitutionID);
                param[3] = new SqlParameter("@CourseID", request.CourseID);
                param[4] = new SqlParameter("@ExamTypeID", request.ExamTypeID);
                param[5] = new SqlParameter("@SubjectID", request.SubjectID);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Set_SubmitMarksEntryData", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("SP_Set_SubmitMarksEntryData", 0, ex.Message);
                return ex.Message;
            }

        }


        [HttpGet, ActionName("GetSubjectsReport")]
        public string GetSubjectsReport(int AcademicYearID, int ExamMonthYearID, int InstitutionID, int CourseID, int ExamTypeID)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[5];
                param[0] = new SqlParameter("@AcademicYearID", AcademicYearID);
                param[1] = new SqlParameter("@ExamMonthYearID", ExamMonthYearID);
                param[2] = new SqlParameter("@InstitutionID", InstitutionID);
                param[3] = new SqlParameter("@CourseID", CourseID);
                param[4] = new SqlParameter("@ExamTypeID", ExamTypeID);
                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_Get_MarksEntryConsolidatedReport", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("SP_Get_MarksEntryConsolidatedReport", 0, ex.Message);
                return ex.Message;
            }

        }

        [HttpGet, ActionName("GetAssessmentInstitutionCourses")]
        public string GetAssessmentInstitutionCourses(int InstitutionID)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@InstitutionID", InstitutionID);

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Get_AssessmentInstitutionCourses", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }


        [HttpGet, ActionName("GetAssessmentInstituteCount")]
        public string GetAssessmentInstituteCount(int AcademicYearID,int ExamMonthYearID,int ExamTypeId)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@AcademicYearID", AcademicYearID);
                param[1] = new SqlParameter("@ExamMonthYearID", ExamMonthYearID);
                param[2] = new SqlParameter("@ExamTypeId", ExamTypeId);
                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_Get_Admin_AssesmentInstituteCount", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }



        private static void elapse(object sender, ElapsedEventArgs e, string s)
        {
            System.IO.File.Delete(s);
            ((Timer)sender).Stop();
            ((Timer)sender).Dispose();
        }

        [HttpGet, ActionName("GetAssessmentInstituteCountExcel")]
        public string GetAssessmentInstituteCountExcel(int AcademicYearID, int ExamMonthYearID,int ExamTypeId)
        {
            List<person> p = new List<person>();
            person p1 = new person();
            try
            {

                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@AcademicYearID", AcademicYearID);
                param[1] = new SqlParameter("@ExamMonthYearID", ExamMonthYearID);
                param[2] = new SqlParameter("@ExamTypeId", ExamTypeId);
                DataSet ds = dbHandler.ReturnDataWithStoredProcedure("SP_Get_Admin_AssesmentInstituteCount", param);
                var filename = "AssessmentInstitutewiseCount" + ".xlsx";
                var eh = new ExcelHelper();
                var path = ConfigurationManager.AppSettings["DownloadsFolderPath"];
                bool folderExists = Directory.Exists(path);
                if (!folderExists)
                    Directory.CreateDirectory(path);
                eh.ExportDataSet(ds, path + filename);
                Timer timer = new Timer(200000);
                timer.Elapsed += (sender, e) => elapse(sender, e, ConfigurationManager.AppSettings["DownloadsFolderPath"] + filename);
                timer.Start();

                //return filename;
                return "/Downloads/" + filename;
                //return Request.CreateResponse(HttpStatusCode.OK, dbHandler.ReturnDataSet(StrQuery));

            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }



        [HttpGet, ActionName("GetAssessmentInstituteCourseCount")]
        public string GetAssessmentInstituteCourseCount(int AcademicYearID, int ExamMonthYearID, int ExamTypeId,int InstitutionID)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[4];
                param[0] = new SqlParameter("@AcademicYearID", AcademicYearID);
                param[1] = new SqlParameter("@ExamMonthYearID", ExamMonthYearID);
                param[2] = new SqlParameter("@ExamTypeId", ExamTypeId);
                param[3] = new SqlParameter("@InstitutionID", InstitutionID);
                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_Get_Admin_AssesmentInstituteCourseCount", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }


        [HttpGet, ActionName("GetAssesmentInstituteCourseSubjectCount")]
        public string GetAssesmentInstituteCourseSubjectCount(int AcademicYearID, int ExamMonthYearID, int ExamTypeId, int InstitutionID,int CourseID)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[5];
                param[0] = new SqlParameter("@AcademicYearID", AcademicYearID);
                param[1] = new SqlParameter("@ExamMonthYearID", ExamMonthYearID);
                param[2] = new SqlParameter("@ExamTypeId", ExamTypeId);
                param[3] = new SqlParameter("@InstitutionID", InstitutionID);
                param[4] = new SqlParameter("@CourseID", CourseID);
                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_Get_Admin_AssesmentInstituteCourseSubjectCount", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }



    }

}
