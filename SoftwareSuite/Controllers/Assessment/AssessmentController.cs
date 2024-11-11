using System;
using System.Web.Mvc;
using System.Data.SqlClient;
using Newtonsoft.Json;
using FromBody = System.Web.Http.FromBodyAttribute;
using SoftwareSuite.BLL;
using SoftwareSuite.Models.Database;
using SoftwareSuite.Models.Assessment;
using DocumentFormat.OpenXml.Wordprocessing;
using SoftwareSuite.Models;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.IO;
using static System.Windows.Forms.VisualStyles.VisualStyleElement.TreeView;
//using System.Threading;
using System.Timers;





namespace SoftwareSuite.Controllers.Assessment
{
    public class AssessmentController : BaseController
    {
        #region Get Methods

        [HttpGet, ActionName("getActiveSemester")]
        public string getActiveSemester()
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

        [HttpGet, ActionName("getAllSemesters")]
        public string getAllSemesters()
        {
            try
            {
                var dbHandler = new dbHandler();
                string StrQuery = "";
                StrQuery = "exec  ADM_GET_AllSemesterDetails";
                var res = dbHandler.ReturnDataSet(StrQuery);
                return JsonConvert.SerializeObject(res);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("ADM_GET_AllSemesterDetails", 0, ex.Message);
                throw ex;
            }
        }

        [HttpGet, ActionName("getSubjectsFaculty")]
        public string getSubjectsFaculty()
        {
            try
            {
                var dbHandler = new dbHandler();
                string StrQuery = "";
                StrQuery = "exec USP_ADMISSION_GET_FacultyDetails";
                var dt = dbHandler.ReturnData(StrQuery);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_GET_ACTIVE_SEMESTER", 0, ex.Message);
                return ex.Message;
            }
        }


        [HttpGet, ActionName("getStudentType")]
        public string GetStudentType()
        {
            try
            {
                var dbHandler = new dbHandler();
                string StrQuery = "";
                StrQuery = "exec USP_GET_Student_type";
                var dt = dbHandler.ReturnDataSet(StrQuery);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                
                dbHandler.SaveErorr("USP_GET_Student_type", 0, ex.Message);
                return ex.Message;
            }
        }
        [HttpGet, ActionName("getExamtypeR")]
        public string getExamtypeR()
        {
            try
            {
                var dbHandler = new dbHandler();
                string StrQuery = "";
                StrQuery = "exec USP_GET_EXAM_type_P";
                var dt = dbHandler.ReturnDataSet(StrQuery);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_GET_EXAM_type_P", 0, ex.Message);
                return ex.Message;
            }
        }
        [HttpGet, ActionName("getPresentStudentType")]
        public string GetPresentStudentType()
        {
            try
            {
                var dbHandler = new dbHandler();
                string StrQuery = "";
                StrQuery = "exec USP_SFP_GETSTUDENTTYPE";
                var dt = dbHandler.ReturnDataSet(StrQuery);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                
                dbHandler.SaveErorr("USP_SFP_GETSTUDENTTYPE", 0, ex.Message);
                return ex.Message;
            }
        }

        [HttpGet, ActionName("getSemistersSetData")]
        public string getSemistersSetData()
        {
            try
            {
                var dbHandler = new dbHandler();
                string StrQuery = "";
                StrQuery = "exec USP_GET_Assessment_Semesters";
                var dt = dbHandler.ReturnDataSet(StrQuery);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                
                dbHandler.SaveErorr("USP_GET_Assessment_Semesters", 0, ex.Message);
                return ex.Message;
            }
        }

    
            


        [HttpGet, ActionName("getSemByScheme")]
        public string getSemByScheme(int StudentTypeId, int SchemeId)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@StudentTypeId", StudentTypeId);
                param[1] = new SqlParameter("@SchemeId", SchemeId);            
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("USP_Assessment_GET_SemestersByScheme", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                
                dbHandler.SaveErorr("USP_Assessment_GET_SemestersByScheme", 0, ex.Message);
                return ex.Message;
            }

        }

        [HttpGet, ActionName("getSchemeWiseExams")]
        public string getSchemeWiseExams(int StudentTypeId, int SchemeId, int SemId,int SubjectTypeId,int ExamMonthYearId)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[5];
                param[0] = new SqlParameter("@StudentTypeId", StudentTypeId);
                param[1] = new SqlParameter("@SchemeId", SchemeId);
                param[2] = new SqlParameter("@SemId", SemId);
                param[3] = new SqlParameter("@SubjectTypeId", SubjectTypeId);
                param[4] = new SqlParameter("@ExamMonthYearId", ExamMonthYearId);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_GET_Schemewise_Exams", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_GET_Schemewise_Exams", 0, ex.Message);
                return ex.Message;
            }

        }

        [HttpGet, ActionName("GetStatisticalReports")]
        public string GetStatisticalReports(int semid)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@semid", semid);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("ADM_GET_AssessmentNeedToInactiveList", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                
                dbHandler.SaveErorr("ADM_GET_AssessmentNeedToInactiveList", 0, ex.Message);
                return ex.Message;
            }

        }




        [HttpGet, ActionName("getBranchName")]
        public string getBranchName(string branchcode)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@branchcode", branchcode);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("USP_GET_Branch_Name", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                
                dbHandler.SaveErorr("USP_GET_Branch_Name", 0, ex.Message);
                return ex.Message;
            }

        }

        [HttpGet, ActionName("getExamTypes")]
        public string getExamTypes(int schemeid)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@schemeid", schemeid);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("USP_GET_EXAM_TYPE", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                
                dbHandler.SaveErorr("USP_GET_EXAM_TYPE", 0, ex.Message);
                return ex.Message;
            }

        }



        [HttpGet, ActionName("getSchemes")]
        public string getSchemes(int StudentTypeId)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@StudentTypeId", StudentTypeId);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("USP_Assessment_GET_Schemes", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_Assessment_GET_Schemes", 0, ex.Message);
                return ex.Message;
            }

        }

        

        [HttpGet, ActionName("getExamTypesBySem")]
        public string getExamTypesBySem(int StudentTypeId,int Schemeid)
        {
         
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@StudentTypeId", StudentTypeId);
                param[1] = new SqlParameter("@Schemeid", Schemeid);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("ADM_Assessment_GET_ExamTypes", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("ADM_Assessment_GET_ExamTypes", 0, ex.Message);
                return ex.Message;
            }

        }
        


        [HttpGet, ActionName("getMarksEntryDates")]
        public string getMarksEntryDates(int AcademicId)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@AcademicYearId", AcademicId);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("USP_GET_EXAM_DATES", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                
                dbHandler.SaveErorr("USP_GET_EXAM_DATES", 0, ex.Message);
                return ex.Message;
            }

        }

        [HttpGet, ActionName("GetFeeAcademicYearsActive")]
        public string GetFeeAcademicYearsActive(string CollegeId)
        {
            try
            {
                var dbHandler = new dbHandler();
                string StrQuery = "";
                StrQuery = "exec USP_GetAcademicYearsActive";
                var dt = dbHandler.ReturnDataSet(StrQuery);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_GetAcademicYearsActive", 0, ex.Message);
                return ex.Message;
            }
        }

        [HttpGet, ActionName("getAcademicYearsActive")]
        public string getAcademicYearsActive()
        {
            try
            {
                var dbHandler = new dbHandler();
                string StrQuery = "";
                StrQuery = "exec USP_GET_ACADEMIC_YEARS";
                var dt = dbHandler.ReturnDataSet(StrQuery);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                
                dbHandler.SaveErorr("USP_GET_ACADEMIC_YEARS", 0, ex.Message);
                return ex.Message;
            }

        }

        [HttpGet, ActionName("getSchemeStatus")]
        public string getSchemeStatus()
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


        [HttpGet, ActionName("getExamType")]
        public string getExamType(int schemeid)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@schemeid", schemeid);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("USP_GET_EXAM_TYPE", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                
                dbHandler.SaveErorr("USP_GET_EXAM_TYPE", 0, ex.Message);
                return ex.Message;
            }

        }

        [HttpGet, ActionName("getActiveExamTypes")]
        public string getActiveExamTypes()
        {
            try
            {
                var dbHandler = new dbHandler();
                string StrQuery = "";
                StrQuery = "exec USP_GET_ActiveExamTypes";
                var dt = dbHandler.ReturnDataSet(StrQuery);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_GET_ActiveExamTypes", 0, ex.Message);
                return ex.Message;
            }
        }

        
        //public string getCollegeAssessmentReports(int semid)
        //{
        //    try
        //    {
        //        var dbHandler = new dbHandler();
        //        var param = new SqlParameter[1];
        //        param[0] = new SqlParameter("@semid", semid);

        //        var dt = dbHandler.ReturnDataWithStoredProcedureTable("USP_GET_Assessment_CollegeReports", param);
        //        return JsonConvert.SerializeObject(dt);
        //    }
        //    catch (Exception ex)
        //    {

        //        dbHandler.SaveErorr("USP_GET_Assessment_CollegeReports", 0, ex.Message);
        //        return ex.Message;
        //    }

        //}

        public string getCollegeAssessmentReports(string collegecode, int examtypeid,int studentType,int AcademicYearId, string Semester,int ExamMonthYear)
        {
            try
            {
                var dbHandler = new dbHandler();

                var param = new SqlParameter[0];
                if (studentType == 2)
                {
                    param = new SqlParameter[2];
                    param[0] = new SqlParameter("@collegecode", collegecode);
                    param[1] = new SqlParameter("@studentType", studentType);

                }
                else
                {
                    param = new SqlParameter[6];
                    param[0] = new SqlParameter("@collegecode", collegecode);
                    param[1] = new SqlParameter("@examtypeid", examtypeid);
                    param[2] = new SqlParameter("@studentType", studentType);
                    param[3] = new SqlParameter("@AcademicYearId", AcademicYearId);
                    param[4] = new SqlParameter("@Semester", Semester);
                    param[5] = new SqlParameter("@ExamMonthYear", ExamMonthYear);
                }
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("USP_GET_Assessment_CollegeReports", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                
                dbHandler.SaveErorr("USP_GET_Assessment_CollegeReports", 0, ex.Message);
                return ex.Message;
            }

        }

        [HttpGet, ActionName("getSemSubjects")]
        public string getSemSubjects(int semid, string branchCode, int loadedScheme, int subType, int examTypeid, string collegecode,int studenttypeid,int AcademicYearId,int ExamMonthYearId)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[9];
                param[0] = new SqlParameter("@semid", semid);
                param[1] = new SqlParameter("@branchcode", branchCode);
                param[2] = new SqlParameter("@schemeid", loadedScheme);
                param[3] = new SqlParameter("@subtype", subType);
                param[4] = new SqlParameter("@examtypeid", examTypeid);
                param[5] = new SqlParameter("@collegecode", collegecode);
                param[6] = new SqlParameter("@studenttypeid", studenttypeid);
                param[7] = new SqlParameter("@academicyearid", AcademicYearId);
                param[8] = new SqlParameter("@ExamMonthYearId", ExamMonthYearId);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_GET_SEM_SUBJECTS", param); 
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                
                dbHandler.SaveErorr("USP_GET_SEM_SUBJECTS", 0, ex.Message);
                return ex.Message;
            }

        }


        [HttpGet, ActionName("getSubjectsReport")]
        public string getSubjectsReport(int CollegeId, int SchemeId, string SemId, int ExamTypeId, int BranchId, int ExamMonthYearId)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[6];
                param[0] = new SqlParameter("@CollegeId", CollegeId);
                param[1] = new SqlParameter("@SchemeId", SchemeId);
                param[2] = new SqlParameter("@SemId", SemId);
                param[3] = new SqlParameter("@ExamTypeId", ExamTypeId);
                param[4] = new SqlParameter("@BranchId", BranchId);
                param[5] = new SqlParameter("@ExamMonthYearId", ExamMonthYearId);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_GET_MarksEntry_ConsolidatedReport", param);
                return JsonConvert.SerializeObject(dt);     
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_GET_AssessmentConsolidatedReports", 0, ex.Message);
                return ex.Message;
            }

        }


        //[HttpGet, ActionName("getSemSubjects1")]
        //public string getSemSubjects1(int AcademicyearId,int ExamMonthYearId,string collegecode,int branchId,int schemeid,int semid,int ExamType)
        //{

        //    try
        //    {
        //        var dbHandler = new dbHandler();
        //        var param = new SqlParameter[7];
        //        param[0] = new SqlParameter("@AcademicyearId", AcademicyearId);
        //        param[1] = new SqlParameter("@ExamMonthYearId", ExamMonthYearId);
        //        param[2] = new SqlParameter("@collegecode", collegecode);
        //        param[3] = new SqlParameter("@branchId", branchId);
        //        param[4] = new SqlParameter("@schemeid", schemeid);
        //        param[5] = new SqlParameter("@semid", semid);
        //        param[6] = new SqlParameter("@ExamType", ExamType);
        //        var dt = dbHandler.ReturnDataWithStoredProcedure("USP_GET_AssessmentConsolidatedReports", param);
        //        return JsonConvert.SerializeObject(dt);
        //    }
        //    catch (Exception ex)
        //    {
        //        dbHandler.SaveErorr("USP_GET_AssessmentConsolidatedReports", 0, ex.Message);
        //        return ex.Message;
        //    }
        //}


        [HttpGet, ActionName("getSchemeWiseExamTypes")]
        public string getSchemeWiseExamTypes(int AcademicYearId,int StudentTypeId, int SchemeId, int SemId,int ExamMonthYearId)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[5];
                param[0] = new SqlParameter("@AcademicYearId", AcademicYearId);
                param[1] = new SqlParameter("@StudentTypeId", StudentTypeId);
                param[2] = new SqlParameter("@SchemeId", SchemeId);
                param[3] = new SqlParameter("@SemId", SemId);
                param[4] = new SqlParameter("@ExamMonthYearId", ExamMonthYearId);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("USP_GET_Schemewise_Exams_Types", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_GET_Schemewise_Exams_Types", 0, ex.Message);
                return ex.Message;
            }

        }

        #endregion
        #region POST Methods

        

        public string UpdateMarksEntryDatesforAdmin([FromBody] updatemarksentry ReqData)
        {
            var dbHandler = new dbHandler();
            try
            {     
                var param = new SqlParameter[5];
                param[0] = new SqlParameter("@id", ReqData.id);
                param[1] = new SqlParameter("@fromdate", ReqData.fromdate);
                param[2] = new SqlParameter("@todate", ReqData.todate);
                param[3] = new SqlParameter("@finedate", ReqData.finedate);
                param[4] = new SqlParameter("@fine_ammount", ReqData.fine_ammount);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_UPDATE_EXAM_DATES", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_UPDATE_EXAM_DATES", 0, ex.Message);
                return ex.Message;

            }

        }

        [HttpGet, ActionName("SetDatesMarksEntryreqdata")]
        public string SetDatesMarksEntryreqdata(int AcademicYearID, DateTime AcademicYearStartDate, DateTime AcademicYearEndDate, bool CurrentAcademicYear, string UserName)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[5];
                param[0] = new SqlParameter("@AcademicYearID", AcademicYearID);
                param[1] = new SqlParameter("@AcademicYearStartDate", AcademicYearStartDate);
                param[2] = new SqlParameter("@AcademicYearEndDate", AcademicYearEndDate);
                param[3] = new SqlParameter("@CurrentAcademicYear", CurrentAcademicYear);
                param[4] = new SqlParameter("@UserName", UserName);


                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Update_AcademicYear", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("SP_Update_AcademicYear", 0, ex.Message);
                return ex.Message;
            }

        }

        [HttpPost, ActionName("updateStudentDetails")]
        public string updateStudentDetails([FromBody]studentDetails request)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[46];
                param[0] = new SqlParameter("@StudentId", request.StudentId);
                param[1] = new SqlParameter("@profilephoto", request.profilephoto);
                param[2] = new SqlParameter("@CandidateSign", request.CandidateSign);
                param[3] = new SqlParameter("@CategoryId", request.CategoryId);
                param[4] = new SqlParameter("@SpecialCategoryId", request.SpecialCategoryId);
                param[5] = new SqlParameter("@TenthRollNo", request.TenthRollNo);
                param[6] = new SqlParameter("@TenthYear", request.TenthYear);
                param[7] = new SqlParameter("@TenthBoard", request.TenthBoard);
                param[8] = new SqlParameter("@TenthHallTicketNo", request.TenthHallTicketNo);
                param[9] = new SqlParameter("@StudentRecided", request.StudentRecided);
                //param[10] = new SqlParameter("@PolycetHallTicketNo", request.PolycetHallTicketNo);
                param[10] = new SqlParameter("@QualificationId", request.QualificationId);
                param[11] = new SqlParameter("@ReligionId", request.ReligionId);
                param[12] = new SqlParameter("@Region", request.Region);
                param[13] = new SqlParameter("@MinorityType", request.MinorityType);
                param[14] = new SqlParameter("@PermanentAddress", request.PermanentAddress);
                param[15] = new SqlParameter("@TempararyAddress", request.TempararyAddress);
                param[16] = new SqlParameter("@HouseNo", request.HouseNo);
                param[17] = new SqlParameter("@VillageorTown", request.VillageorTown);
                param[18] = new SqlParameter("@DistrictId", request.DistrictId);
                param[19] = new SqlParameter("@MandalId", request.MandalId);
                param[20] = new SqlParameter("@Pincode", request.Pincode);
                param[21] = new SqlParameter("@IsPhysicallyHandicaped", request.IsPhysicallyHandicaped);
                param[22] = new SqlParameter("@FatherAadhaarNo", request.FatherAadhaarNo);
                param[23] = new SqlParameter("@MotherAadhaarNo", request.MotherAadhaarNo);
                param[24] = new SqlParameter("@IsFatherGorthEmp", request.IsFatherGorthEmp);
                param[25] = new SqlParameter("@Income", request.Income);
                param[26] = new SqlParameter("@IncomeCategory", request.IncomeCategory);
                param[27] = new SqlParameter("@Occupation", request.Occupation);
                param[28] = new SqlParameter("@CasteNo", request.CasteNo);
                param[29] = new SqlParameter("@BankId", request.BankId);
                param[30] = new SqlParameter("@BankAccountNo", request.BankAccountNo);
                param[31] = new SqlParameter("@IfscCode", request.IfscCode);
                param[32] = new SqlParameter("@BankBranch", request.BankBranch);
                //param34] = new SqlParameter("@ShiftId", request.ShiftId);
                //param[35] = new SqlParameter("@PIN", request.PIN);
                param[33] = new SqlParameter("@Name", request.Name);
                param[34] = new SqlParameter("@FatherName", request.FatherName);
                param[35] = new SqlParameter("@MotherName", request.MotherName);
                param[36] = new SqlParameter("@Gender", request.Gender);
                param[37] = new SqlParameter("@DateOfBIrth", request.DateOfBIrth);
                //param[41] = new SqlParameter("@CourseID", request.CourseID);
                param[38] = new SqlParameter("@AadharNo", request.AadharNo);
                param[39] = new SqlParameter("@EmailId", request.EmailId);
                param[40] = new SqlParameter("@ParentContact", request.ParentContact);
                param[41] = new SqlParameter("@StudentContact", request.StudentContact);
                param[42] = new SqlParameter("@CollegeCode", request.CollegeCode);
                //param[47] = new SqlParameter("@SchemeId", request.SchemeId);
                //param[48] = new SqlParameter("@AcademicYearId", request.AcademicYearId);
                //param[49] = new SqlParameter("@BranchID", request.BranchID);
                param[43] = new SqlParameter("@AttendeeId", request.AttendeeId);
                param[44] = new SqlParameter("@Activeflag", request.Activeflag);
                param[45] = new SqlParameter("@semid", request.semid);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("ADM_SET_UpdateStudentDetails", param);
                return JsonConvert.SerializeObject(dt);

            }
            catch (Exception ex)
            {
                
                dbHandler.SaveErorr("ADM_SET_UpdateStudentDetails", 0, ex.Message);
                return ex.Message;
            }

        }

        public class person
        {
            public string ResponseCode { get; set; }
            public string ResponseDescription { get; set; }
            public string file { get; set; }
            public string Password { get; set; }
            public string Data { get; set; }


        }

        [HttpGet, ActionName("GetAbsenteesDates")]
        public string GetAbsenteesDates(int AcademicYearid,int semid)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@AcademicYearid", AcademicYearid);
                param[1] = new SqlParameter("@semid", semid);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Get_AbsenteesDatesBySemID", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("SP_Get_AbsenteesDatesBySemID", 0, ex.Message);
                return ex.Message;
            }
        }

        private static void elapse(object sender, ElapsedEventArgs e, string s)
        {
            System.IO.File.Delete(s);
            ((Timer)sender).Stop();
            ((Timer)sender).Dispose();
        }

        [HttpPost, ActionName("GetAbsenteesListExcel")]
        public string GetAbsenteesListExcel([FromBody] AbsenteesData request)
        {

            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[7];
                param[0] = new SqlParameter("@AcademicYearID", request.AcademicYearID);
                param[1] = new SqlParameter("@SemId", request.SemId);
                param[2] = new SqlParameter("@FromDate", request.FromDate);
                param[3] = new SqlParameter("@ToDate", request.ToDate);
                param[4] = new SqlParameter("@CollegeCode", request.CollegeCode);
                param[5] = new SqlParameter("@BranchId", request.BranchId);
                param[6] = new SqlParameter("@DataType", request.DataType);
                DataSet dt = dbHandler.ReturnDataWithStoredProcedure("USP_GET_AbsenteesList", param);
                if (dt.Tables[0].Rows[0]["ResponseCode"].ToString() == "200")

                {
                    var filename = "Absentees_Report" + ".xlsx";
                    var eh = new ExcelHelper();
                    var path = ConfigurationManager.AppSettings["DownloadsFolderPath"];
                    DataSet excelds = new DataSet();
                    excelds.Tables.Add(dt.Tables[1].Copy());
                    bool folderExists = Directory.Exists(path);
                    if (!folderExists)
                        Directory.CreateDirectory(path);
                    eh.ExportDataSet(excelds, path + filename);
                    Timer timer = new Timer(200000);
                    timer.Elapsed += (sender, e) => elapse(sender, e, ConfigurationManager.AppSettings["DownloadsFolderPath"] + filename);
                    timer.Start();
                    var file = "/Downloads/" + filename;
                    List<person> p = new List<person>();
                    person p1 = new person();
                    p1.file = file;
                    p1.ResponseCode = dt.Tables[0].Rows[0]["ResponseCode"].ToString();
                    p1.ResponseDescription = dt.Tables[0].Rows[0]["ResponseDescription"].ToString();
                    p.Add(p1);

                    return JsonConvert.SerializeObject(p);
                    //return ;

                }

                
                else
                {
                    List<person> p = new List<person>();
                    person p1 = new person();
                    p1.file = "";
                    p1.ResponseCode = dt.Tables[0].Rows[0]["ResponseCode"].ToString();
                    p1.ResponseDescription = dt.Tables[0].Rows[0]["ResponseDescription"].ToString();
                    p.Add(p1);
                    return JsonConvert.SerializeObject(p);
                }
                //
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_GET_AbsenteesList", 0, ex.Message);
                return ex.Message;
            }

        }


        #endregion
    }
}
