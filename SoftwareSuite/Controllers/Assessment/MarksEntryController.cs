using System;
using System.Diagnostics;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Web.Script.Serialization;
using RestSharp;
using Newtonsoft.Json;
using System.Web.Mvc;
using SoftwareSuite.BLL;
using SoftwareSuite.Models.Database;
using SoftwareSuite.Models.Assessment;
using FromBody = System.Web.Http.FromBodyAttribute;
using SoftwareSuite.Models;
using System.Configuration;
using System.IO;
using System.Timers;

namespace SoftwareSuite.Controllers.Assessment
{
    public class MarksEntryController : BaseController
    {
        #region Get Methods
        
        [HttpGet, ActionName("GetDetailedReportExcel")]
        public string GetDetailedReportExcel(int examtypeid, int studentType, int AcademicYearId, string Semester, int ExamMonthYear)
        {
            try
            {
                var dbHandler = new dbHandler();
                string StrQuery = "USP_GET_Assessment_AdminDetailedReportPinsExcel ";
                var param = new SqlParameter[5];
                param[0] = new SqlParameter("@examtypeid", examtypeid);
                param[1] = new SqlParameter("@studentType", studentType);
                param[2] = new SqlParameter("@AcademicYearId", AcademicYearId);
                param[3] = new SqlParameter("@Semester", Semester);
                param[4] = new SqlParameter("@ExamMonthYear", ExamMonthYear);
                var ds = dbHandler.ReturnDataWithStoredProcedure(StrQuery, param);
                var filename = "DetailedReport_" + ".xlsx";
                var eh = new ExcelHelper();
                var path = ConfigurationManager.AppSettings["DownloadsFolderPath"];
                bool folderExists = Directory.Exists(path);
                if (!folderExists)
                    Directory.CreateDirectory(path);
                eh.ExportDataSet(ds, path + filename);
                Timer timer = new Timer(30000);
                timer.Elapsed += (sender, e) => elapse(sender, e, ConfigurationManager.AppSettings["DownloadsFolderPath"] + filename);
                timer.Start();
                return "/Downloads/" + filename;
            }
            catch (Exception ex) 
            {
                dbHandler.SaveErorr("USP_GET_Assessment_AdminDetailedReportPinsExcel", token.UserId, ex.Message + "\n-----------\n" + ex.StackTrace);
                return "Error Occured. Please Try Again";
            }
        }
        [HttpGet, ActionName("getSubjectPinList")]
        public string getSubjectPinList(int AcadamicYearid, int SchemeId, string collegecode, int semid, int branchId, int subId, int examtype,int studenttypeId,int ExamMonthYearId)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[9];
                param[0] = new SqlParameter("@AcadamicYearid", AcadamicYearid);
                param[1] = new SqlParameter("@collegecode", collegecode);
                param[2] = new SqlParameter("@semid", semid);
                param[3] = new SqlParameter("@branchid", branchId);
                param[4] = new SqlParameter("@subid", subId);
                param[5] = new SqlParameter("@schemeid", SchemeId);
                param[6] = new SqlParameter("@examtype", examtype);
                param[7] = new SqlParameter("@studenttypeId", studenttypeId); 
                param[8] = new SqlParameter("@ExamMonthYearId", ExamMonthYearId);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_GET_SUBJECT_PIN_LIST", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                
                dbHandler.SaveErorr("USP_GET_SUBJECT_PIN_LIST", 0, ex.Message);
                return ex.Message;
            }

        }



        [HttpGet, ActionName("getBacklogSubjectPinList")]
        public string getBacklogSubjectPinList(int AcadamicYearid, int SchemeId)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@AcadamicYearid", AcadamicYearid);              
                param[1] = new SqlParameter("@schemeid", SchemeId);               
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_GET_BACKLOG_SUBJECT_PIN_LIST", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_GET_BACKLOG_SUBJECT_PIN_LIST", 0, ex.Message);
                return ex.Message;
            }

        }
        [HttpGet, ActionName("RubricsgetSubjectPinList")]
        public string RubricsgetSubjectPinList(int SubjectTypeId, string collegecode,  int SemId, int BranchId, int SchemeId, int AcademicYearId)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[6];
                param[0] = new SqlParameter("@SubjectTypeId", SubjectTypeId);
                param[1] = new SqlParameter("@CollegeCode", collegecode);
                param[2] = new SqlParameter("@SemId", SemId);
                param[3] = new SqlParameter("@BranchId", BranchId);
                param[4] = new SqlParameter("@SchemeId", SchemeId);
                param[5] = new SqlParameter("@AcademicYearId", AcademicYearId);
 

                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_Assessment_GET_RubricsPinList", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_Assessment_GET_RubricsPinList", 0, ex.Message);
                return ex.Message;
            }

        }

        [HttpGet, ActionName("getReportSubjectPinList")]
        public string getReportSubjectPinList(int Academicid, int SchemeId, string collegecode, int semid, int branchId, int subId, int examtype,int studenttypeId,int ExamMonthYearId)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[9];
                param[0] = new SqlParameter("@AcadamicYearid", Academicid);
                param[1] = new SqlParameter("@schemeid", SchemeId);
                param[2] = new SqlParameter("@collegecode", collegecode);
                param[3] = new SqlParameter("@semid", semid);
                param[4] = new SqlParameter("@branchid", branchId);
                param[5] = new SqlParameter("@subid", subId);
                param[6] = new SqlParameter("@examtype", examtype);
                param[7] = new SqlParameter("@studenttypeId", studenttypeId);
                param[8] = new SqlParameter("@ExamMonthYearId", ExamMonthYearId);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_GET_REPORTSUBJECT_PIN_LIST", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                
                dbHandler.SaveErorr("USP_GET_REPORTSUBJECT_PIN_LIST", 0, ex.Message);
                return ex.Message;
            }

        }

        [HttpGet, ActionName("getSubmitStatus")]
        public string getSubmitStatus(string collegeCode, string branchCode, int AcademicId, int semId, int examtypeId,int ExamMonthYearId)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[6];
                param[0] = new SqlParameter("@collegecode", collegeCode);
                param[1] = new SqlParameter("@branchcode", branchCode);
                param[2] = new SqlParameter("@academicyearid", AcademicId);
                param[3] = new SqlParameter("@semid", semId);
                param[4] = new SqlParameter("@examtypeid", examtypeId);
                param[5] = new SqlParameter("@ExamMonthYearId", ExamMonthYearId);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_GET_SubmitStatus", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                
                dbHandler.SaveErorr("USP_GET_SubmitStatus", 0, ex.Message);
                return ex.Message;
            }

        }



        [HttpGet, ActionName("getDatesFineAmount")]
        public string getDatesFineAmount(int examid, int semid, int Academicid, int ExamMonthYearId)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[4];
                param[0] = new SqlParameter("@examid", examid);
                param[1] = new SqlParameter("@semid", semid);
                param[2] = new SqlParameter("@academicyearid", Academicid);
                param[3] = new SqlParameter("@ExamMonthYearId", ExamMonthYearId);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("USP_GET_FINE_AMOUNT", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                
                dbHandler.SaveErorr("USP_GET_FINE_AMOUNT", 0, ex.Message);
                return ex.Message;
            }

        }

        [HttpGet, ActionName("editMarksEntry")]
        public string editMarksEntry(string collegecode, string branchcode, int semid, int examtypeid, int subid, string pin,int ExamMonthYearId)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[7];
                param[0] = new SqlParameter("@collegecode", collegecode);
                param[1] = new SqlParameter("@branchcode", branchcode);
                param[2] = new SqlParameter("@semid", semid);
                param[3] = new SqlParameter("@examtypeid", examtypeid);
                param[4] = new SqlParameter("@subid", subid);
                param[5] = new SqlParameter("@pin", pin);
                param[6] = new SqlParameter("@ExamMonthYearId", ExamMonthYearId);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("USP_SET_Assessment_InactiveSubitPin", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                
                dbHandler.SaveErorr("USP_SET_Assessment_InactiveSubitPin", 0, ex.Message);
                return ex.Message;
            }
        }

        #endregion
        #region Post Methods


        private static void elapse(object sender, ElapsedEventArgs e, string s)
        {
            System.IO.File.Delete(s);
            ((Timer)sender).Stop();
            ((Timer)sender).Dispose();
        }



        [HttpGet, ActionName("GetDetailedAssessmentReportExcel")]
        public string GetDetailedAssessmentReportExcel(int examtypeid, int studentType,int AcademicYearId,string Semester,int ExamMonthYear)
        {
            try
            {
                var dbHandler = new dbHandler();
                string StrQuery = "USP_GET_Assessment_AdminDetailedReportPinsExcel ";
                var param = new SqlParameter[5];
                param[0] = new SqlParameter("@examtypeid", examtypeid);
                param[1] = new SqlParameter("@studentType", studentType);
                param[2] = new SqlParameter("@AcademicYearId", AcademicYearId);
                param[3] = new SqlParameter("@Semester", Semester);
                param[4] = new SqlParameter("@ExamMonthYear", ExamMonthYear);
                var ds = dbHandler.ReturnDataWithStoredProcedure(StrQuery, param);
                var filename = "DetailedReport_" + ".xlsx";
                var eh = new ExcelHelper();
                var path = ConfigurationManager.AppSettings["DownloadsFolderPath"];
                bool folderExists = Directory.Exists(path);
                if (!folderExists)
                    Directory.CreateDirectory(path);
                eh.ExportDataSet(ds, path + filename);
                Timer timer = new Timer(30000);
                timer.Elapsed += (sender, e) => elapse(sender, e, ConfigurationManager.AppSettings["DownloadsFolderPath"] + filename);
                timer.Start();
                return "/Downloads/" + filename;
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_GET_Assessment_AdminDetailedReportPinsExcel", token.UserId, ex.Message + "\n-----------\n" + ex.StackTrace);
                return "Error Occured. Please Try Again";
            }
        }

        //[HttpPost, ActionName("GetDetailedReportExcel")]
        //public string GetDetailedReportExcel(int examtypeid, int studentType,int AcademicYearId,string Semester,int ExamMonthYear)
        //{
        //    try
        //    {
        //        var dbHandler = new dbHandler();
        //        string StrQuery = "USP_GET_Assessment_AdminDetailedReportPinsExcel ";
        //        var param = new SqlParameter[5];
        //        param[0] = new SqlParameter("@examtypeid", examtypeid);
        //        param[1] = new SqlParameter("@studentType", studentType);
        //        param[2] = new SqlParameter("@AcademicYearId", AcademicYearId);
        //        param[3] = new SqlParameter("@Semester", Semester);
        //        param[4] = new SqlParameter("@ExamMonthYear", ExamMonthYear);
        //        var ds = dbHandler.ReturnDataWithStoredProcedure(StrQuery, param);
        //        var filename = "DetailedReport_" + ".xlsx";
        //        var eh = new ExcelHelper();
        //        var path = ConfigurationManager.AppSettings["DownloadsFolderPath"];
        //        bool folderExists = Directory.Exists(path);
        //        if (!folderExists)
        //            Directory.CreateDirectory(path);
        //        eh.ExportDataSet(ds, path + filename);
        //        Timer timer = new Timer(30000);
        //        timer.Elapsed += (sender, e) => elapse(sender, e, ConfigurationManager.AppSettings["DownloadsFolderPath"] + filename);
        //        timer.Start();
        //        return "/Downloads/" + filename;
        //    }
        //    catch (Exception ex)
        //    {
        //        dbHandler.SaveErorr("USP_GET_Assessment_AdminDetailedReportPinsExcel", token.UserId, ex.Message + "\n-----------\n" + ex.StackTrace);
        //        return "Error Occured. Please Try Again";
        //    }
        //}

        [HttpPost, ActionName("PostSemExamMarks")]
        public string PostSemExamMarks([FromBody]PostExamMarks ExamMarks)
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
                var dbHandler = new dbHandler();
                var param = new SqlParameter[4];    
                param[0] = new SqlParameter("@json", json);
                param[1] = new SqlParameter("@schemeid", ExamMarks.schemeid);
                param[2] = new SqlParameter("@examtype", ExamMarks.examtype);
                param[3] = new SqlParameter("@studenttypeid", ExamMarks.studenttypeid);
                var res = dbHandler.ReturnDataWithStoredProcedureTable("USP_SET_SubjectWise_Marks_Entry", param);
                return JsonConvert.SerializeObject(res);
            }
            catch (Exception ex)
            {
                
                dbHandler.SaveErorr("USP_SET_SubjectWise_Marks_Entry", 0, ex.Message);
                return ex.Message;
            }
        }

        [HttpPost, ActionName("PostBacklogSemExamMarks")]
        public string PostBacklogSemExamMarks([FromBody]PostBacklogExamMarks BacklogExamMarks)
        {
            try
            {
                var marksDat = new List<backmarklist>();
                int size = BacklogExamMarks.marksdata.Count;
                for (int i = 0; i < size; i++)
                {
                    marksDat.Add(BacklogExamMarks.marksdata[i]);
                }


                Debug.WriteLine("marks entry before Conv to json: " + marksDat);
                var json = new JavaScriptSerializer().Serialize(marksDat);
                Debug.WriteLine("marks entry json: " + json);
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@json", json);
                var res = dbHandler.ReturnDataWithStoredProcedureTable("USP_SET_Backlog_SubjectWise_Marks_Entry", param);
                return JsonConvert.SerializeObject(res);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_SET_Backlog_SubjectWise_Marks_Entry", 0, ex.Message);
                return ex.Message;
            }
        }


        [HttpPost, ActionName("SubmitAllMarksEntered")]
        public string SubmitAllMarksEntered([FromBody]submitMarks request)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[4];
                param[0] = new SqlParameter("@academicyearid", request.AcademicId);
                param[1] = new SqlParameter("@semid", request.semId);
                param[2] = new SqlParameter("@examtypeid", request.examtypeId);
                param[3] = new SqlParameter("@semId", request.semId);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("USP_SET_SubmitAll", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                
                dbHandler.SaveErorr("USP_SET_SubmitAll", 0, ex.Message);
                return ex.Message;
            }

        }

        [HttpPost, ActionName("SubmitMarksEntered")]
        public string SubmitMarksEntered([FromBody]submitMarks request)
        {
            try
            {
                string clientIpAddress = System.Web.HttpContext.Current.Request.UserHostAddress;
                var dbHandler = new dbHandler();
                var param = new SqlParameter[9];
                param[0] = new SqlParameter("@collegecode", request.collegeCode);
                param[1] = new SqlParameter("@branchcode", request.branchCode);
                param[2] = new SqlParameter("@academicyearid", request.AcademicId);
                param[3] = new SqlParameter("@semid", request.semId);
                param[4] = new SqlParameter("@examtypeid", request.examtypeId);
                param[5] = new SqlParameter("@subid", request.subId);
                param[6] = new SqlParameter("@ExamMonthYearId", request.ExamMonthYearId);
                param[7] = new SqlParameter("@SubmittedMobileNo", request.SubmittedMobileNo);
                param[8] = new SqlParameter("@IpAddress", clientIpAddress);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("USP_SET_SubmitMarksEntry", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                
                dbHandler.SaveErorr("USP_SET_SubmitMarksEntry", 0, ex.Message);
                return ex.Message;
            }

        }
        [HttpPost, ActionName("StudentReadmissiondata")]
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

        #endregion
    }
}
