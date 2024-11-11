using Newtonsoft.Json;
using SoftwareSuite.Models.Database;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SoftwareSuite.Controllers.MasterSetting
{
    public class MasterPageController : BaseController
    {
        [HttpGet, ActionName("setBranch")]
        public string setBranch(string BranchName, string BranchCode)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@BarnchName", BranchName);
                param[1] = new SqlParameter("@BranchCode", BranchCode);

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SBT_MST_SET_BRANCH", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }

        [HttpGet, ActionName("GetBranches")]
        public string GetBranches()
        {
            try
            {
                var dbHandler = new dbHandler();
                string StrQuery = "";
                StrQuery = "exec SBP_ADM_MasterPages";
                var res = dbHandler.ReturnDataSet(StrQuery);
                return JsonConvert.SerializeObject(res);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("SBP_ADM_MasterPages", 0, ex.Message);
                throw ex;
            }
        }

        [HttpGet, ActionName("SetSchemeStatus")]
        public string SetSchemeStatus(int Id, int IsActive)
        {

            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@Id", Id);
                param[1] = new SqlParameter("@IsActive", IsActive);
                var dt = dbHandler.ReturnDataWithStoredProcedure("ADM_SET_SchemeStatus", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpGet, ActionName("UpdateScheme")]
        public string UpdateScheme(int Id, string Scheme)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@Id", Id);
                param[1] = new SqlParameter("@Scheme", Scheme);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("ADM_SET_Update_Scheme", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpGet, ActionName("EditScheme")]
        public string EditScheme(int Id)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@Id", Id);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("ADM_SET_Edit_Scheme", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpGet, ActionName("DeleteScheme")]
        public string DeleteScheme(int Id)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@Id", Id);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("ADM_SET_Delete_Scheme", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpGet, ActionName("GetMobileAppUpdates")]
        public string GetMobileAppUpdates()
        {
            try
            {
                var dbHandler = new dbHandler();
                string StrQuery = "";
                StrQuery = "exec USP_GET_MobileAppSettingData";
                var res = dbHandler.ReturnDataSet(StrQuery);
                return JsonConvert.SerializeObject(res);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_GET_MobileAppSettingData", 0, ex.Message);
                throw ex;
            }
        }


        [HttpGet, ActionName("GetSubjectTypes")]
        public string GetSubjectTypes()
        {
            try
            {
                var dbHandler = new dbHandler();
                string StrQuery = "";
                StrQuery = "exec USP_SS_GET_SubjectTypes";
                var res = dbHandler.ReturnDataSet(StrQuery);
                return JsonConvert.SerializeObject(res);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_SS_GET_SubjectTypes", 0, ex.Message);
                throw ex;
            }
        }
        [HttpGet, ActionName("GetMasterSubjects")]
        public string GetMasterSubjects(int SchemeId,int BranchId,int SemId)
        {
             
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@SchemeId", SchemeId);
                param[1] = new SqlParameter("@BranchId", BranchId);
                param[2] = new SqlParameter("@SemId", SemId);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("USP_SS_GET_Scheme_Sem_Subjects ", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_SS_GET_Scheme_Sem_Subjects", 0, ex.Message);
                return ex.Message;
            }
        }

        [HttpGet, ActionName("SetMobileApp")]
        public string SetMobileApp(int IsUpdateReleased,string UpdateDescription,string UpdateVersion,int IsInMaintainance,string ManitainanceDescription,int DataType)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[6];
                param[0] = new SqlParameter("@IsUpdateReleased", IsUpdateReleased);
                param[1] = new SqlParameter("@UpdateDescription", UpdateDescription);
                param[2] = new SqlParameter("@UpdateVersion", UpdateVersion);
                param[3] = new SqlParameter("@IsInMaintainance", IsInMaintainance);
                param[4] = new SqlParameter("@ManitainanceDescription", ManitainanceDescription);
                param[5] = new SqlParameter("@DataType", DataType);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("USP_SET_MobileAppSettingData ", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_SET_MobileAppSettingData", 0, ex.Message);
                return ex.Message;
            }
        }

        [HttpGet, ActionName("UpdateMobileApp")]
        public string UpdateMobileApp(int IsUpdateReleased, string UpdateDescription, string UpdateVersion, int IsInMaintainance, string ManitainanceDescription, int DataType,int Id)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[7];
                param[0] = new SqlParameter("@IsUpdateReleased", IsUpdateReleased);
                param[1] = new SqlParameter("@UpdateDescription", UpdateDescription);
                param[2] = new SqlParameter("@UpdateVersion", UpdateVersion);
                param[3] = new SqlParameter("@IsInMaintainance", IsInMaintainance);
                param[4] = new SqlParameter("@ManitainanceDescription", ManitainanceDescription);
                param[5] = new SqlParameter("@DataType", DataType);
                param[6] = new SqlParameter("@Id", Id);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("USP_SET_MobileAppSettingData ", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_SET_MobileAppSettingData", 0, ex.Message);
                return ex.Message;
            }
        }


        [HttpGet, ActionName("ChangeSchemeBranchStatus")]
        public string ChangeSchemeBranchStatus(int Id, int IsActive)
        {

            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@Id", Id);
                param[1] = new SqlParameter("@IsActive", IsActive);
               
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("ADM_SFP_SET_SchemeChangeStatus", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("ADM_SFP_SET_SchemeChangeStatus", 0, ex.Message);
                return ex.Message;
            }
        }


        [HttpGet, ActionName("GetSchemeBranchs")]
        public string GetSchemeBranchs()
        {
            try
            {
                var dbHandler = new dbHandler();
                string StrQuery = "";
                StrQuery = "exec ADM_SFP_GET_SchemeBranches  ";
                var res = dbHandler.ReturnDataSet(StrQuery);
                return JsonConvert.SerializeObject(res);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("ADM_SFP_GET_SchemeBranches  ", 0, ex.Message);
                throw ex;
            }
        }


        [HttpGet, ActionName("EditBranches")]
        public string EditBranches(int id)
        {

            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@Id", id);

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SBT_ADM_EDIT_MASTERP", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }


              [HttpGet, ActionName("UpdatePresumptiveAttendance")]
        public string UpdatePresumptiveAttendance(string PIN,int NumberOfDays,string username,int ExamMonthYearId)
        {
            try
            {
                string IpAddress = System.Web.HttpContext.Current.Request.UserHostAddress;
                var dbHandler = new dbHandler();
                var param = new SqlParameter[5];
                param[0] = new SqlParameter("@PIN", PIN);
                param[1] = new SqlParameter("@NumberOfDays", NumberOfDays);
                param[2] = new SqlParameter("@username", username);
                param[3] = new SqlParameter("@ExamMonthYearId", ExamMonthYearId);
                param[4] = new SqlParameter("@IpAddress", IpAddress);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("USP_SFP_GET_PresemptiveAttendenceData_Log", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }


        [HttpGet, ActionName("getAttendanceByPin")]
        public string getAttendanceByPin(string Pin,int ExamMonthYearId)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@Pin", Pin);
                param[1] = new SqlParameter("@ExamMonthYearId", ExamMonthYearId);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("USP_SFP_GET_PresemptiveAttendenceData", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpGet, ActionName("EditSubject")]
        public string EditSubject(string Subject_Code,int subid)
        {      
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@Subject_Code", Subject_Code);
                param[1] = new SqlParameter("@subid", subid);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("ADM_SFP_GET_SubjectsBySubjectCode", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        
             [HttpGet, ActionName("ActiveBranchStatus")]
        public string ActiveBranchStatus(int id,int ActiveFlag)
        {

            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@Id", id);
                param[1] = new SqlParameter("@ActiveFlag", ActiveFlag);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SBT_ADM_Status_Active", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpGet, ActionName("deleteBranch")]
        public string deleteBranch(int id)
        {

            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@Id", id);

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SBT_ADM_DEL_MASTERP ", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpGet, ActionName("UpdateBranches")]
        public string UpdateBranches(int id, string BranchName, string BranchCode)
        {

            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@id", id);
                param[1] = new SqlParameter("@BranchName", BranchName);
                param[2] = new SqlParameter("@BranchCode", BranchCode);

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SBT_ADM_UPDATE", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpGet, ActionName("AddSchemeBranches")]
        public string AddSchemeBranches(int DataTypeId, int schemeid, string SchemeCode,int BranchId,string BranchCode)
        {

            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[5];
                param[0] = new SqlParameter("@DataTypeId", DataTypeId);
                param[1] = new SqlParameter("@schemeid", schemeid);
                param[2] = new SqlParameter("@SchemeCode", SchemeCode);
                param[3] = new SqlParameter("@BranchId", BranchId);
                param[4] = new SqlParameter("@BranchCode", BranchCode);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("ADM_SFP_SET_CreateOrUpdateByid", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }


        [HttpGet, ActionName("SetSemester")]
        public string SetSemester(string Semester)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@Semester", Semester);

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SBT_ADM_SET_SEMESTER", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }


        [HttpGet, ActionName("GetSemester")]
        public string GetSemester()
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
        // SBT_ADM_GET_SEMESTER

        [HttpGet, ActionName("GetScheme")]
        public string GetScheme()
        {
            try
            {
                var dbHandler = new dbHandler();
                string StrQuery = "";
                StrQuery = "exec  ADM_GET_AllSchemeDetails";
                var res = dbHandler.ReturnDataSet(StrQuery);
                return JsonConvert.SerializeObject(res);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("ADM_GET_AllSchemeDetails", 0, ex.Message);
                throw ex;
            }
        }

        [HttpGet, ActionName("EditSemester")]
        public string EditSemester(int id)
        {

            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@Id", id);

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SBT_ADM_EDIT_SEMESTERS ", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        

       
        [HttpGet, ActionName("deleteSemester")]
        public string deleteSemester(int Id)
        {

            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@Id", Id);

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SBT_ADM_DEL_SEMESTER", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
        [HttpGet, ActionName("UpdateC09MarksData")]
        public string UpdateC09MarksData(int DataTypeId, string Scheme,int SemId,int ExamMonthYearId,string pin,string SubjectCode,int Internal,int EndExam,int SubjectTotal,string Remarks)
        {

            try
            {
           
                var dbHandler = new dbHandler();
                var param = new SqlParameter[10];
                param[0] = new SqlParameter("@DataTypeId", DataTypeId);
                param[1] = new SqlParameter("@Scheme", Scheme);
                param[2] = new SqlParameter("@SemId", SemId);
                param[3] = new SqlParameter("@ExamMonthYearId", ExamMonthYearId);
                param[4] = new SqlParameter("@pin", pin);
                param[5] = new SqlParameter("@SubjectCode", SubjectCode);
                param[6] = new SqlParameter("@Internal", Internal);
                param[7] = new SqlParameter("@EndExam", EndExam);
                param[8] = new SqlParameter("@SubjectTotal", SubjectTotal);
                param[9] = new SqlParameter("@Remarks", Remarks);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("ADM_SFP_SET_C09ResultsUpdateByPin", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }


        
        //bank.Cs

        [HttpGet, ActionName("setBanksNames")]
        public string setBanksNames(string Bank)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@Bank", Bank);

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SBT_ADM_SET_BANKS", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }






        [HttpGet, ActionName("GetBank")]
        public string GetBank()
        {
            try
            {
                var dbHandler = new dbHandler();
                string StrQuery = "";
                StrQuery = "exec SBT_ADM_GET_BANKS";
                var res = dbHandler.ReturnDataSet(StrQuery);
                return JsonConvert.SerializeObject(res);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("SBT_ADM_GET_BANKS", 0, ex.Message);
                throw ex;
            }
        }
        [HttpGet, ActionName("EditBank")]
        public string EditBank(int id)
        {

            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@id", id);

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SBT_ADM_EDIT_BANKS", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
        [HttpGet, ActionName("deleteBank")]
        public string deleteBank(int Id)
        {

            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@Id", Id);

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SBT_ADM_DEL_BANKS", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }



        [HttpGet, ActionName("updateBank")]
        public string updateBank(int id, string Bank)
        {

            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@Id", id);
                param[1] = new SqlParameter("@Bank", Bank);

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SBT_ADM_Update_BANK", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
        //caste Masters
        [HttpPost, ActionName("setCaste")]
        public string setCaste(string Caste)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@Caste", Caste);

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SBT_ADM_SET_CASTES", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }

        [HttpPost, ActionName("DeleteSubject")]
        public string DeleteSubject(string subid)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@subid", subid);

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("ADM_SFP_Detete_Subject", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }

        

        [HttpPost, ActionName("AddModule")]
        public string AddModule(string ModuleName, string Class, string ModuleRouteName)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@ModuleName", ModuleName);
                param[1] = new SqlParameter("@Class", Class);
                param[2] = new SqlParameter("@ModuleRouteName", ModuleRouteName);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("ADM_SPB_AddModule", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }



        [HttpPost, ActionName("AddUserModule")]
        public string AddUserModule(int UserTypeId, int ModuleId)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@UserTypeId", UserTypeId);
                param[1] = new SqlParameter("@ModuleId", ModuleId);

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("ADM_AddUserModules", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }


        [HttpPost, ActionName("AddSubModules")]
        public string AddSubModules(int ModuleId, int ClassId, string SubModuleName, string SubModuleRouteName)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[4];
                param[0] = new SqlParameter("@ModuleId", ModuleId);
                param[1] = new SqlParameter("@ClassId", ClassId);
                param[2] = new SqlParameter("@SubModuleName", SubModuleName);
                param[3] = new SqlParameter("@SubModuleRouteName", SubModuleRouteName);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SPB_AddSubModules", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpPost, ActionName("UpdateSubjects")]
        public string UpdateSubjects(int DataTypeId, string Subject_Code, string SubjectName, float Mid1Max_Marks, float Mid2Max_Marks, float InternalMax_Marks,
       float Credits, int subtype, int semid, int end_exam_max_marks, int iselective, int schemeid, int branchid, string PCode, int BoardQuestionPaper, int ElectiveSet, float Mid3Max_Marks,
       int subid)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[18];
                param[0] = new SqlParameter("@DataTypeId", DataTypeId);
                param[1] = new SqlParameter("@Subject_Code", Subject_Code);
                param[2] = new SqlParameter("@SubjectName", SubjectName);
                param[3] = new SqlParameter("@Mid1Max_Marks", Mid1Max_Marks);
                param[4] = new SqlParameter("@Mid2Max_Marks", Mid2Max_Marks);
                param[5] = new SqlParameter("@InternalMax_Marks", InternalMax_Marks);
                param[6] = new SqlParameter("@Credits", Credits);
                param[7] = new SqlParameter("@subtype", subtype);
                param[8] = new SqlParameter("@semid", semid);
                param[9] = new SqlParameter("@end_exam_max_marks", end_exam_max_marks);
                param[10] = new SqlParameter("@iselective", iselective);
                param[11] = new SqlParameter("@schemeid", schemeid);
                param[12] = new SqlParameter("@branchid", branchid);
                param[13] = new SqlParameter("@PCode", PCode);
                param[14] = new SqlParameter("@BoardQuestionPaper", BoardQuestionPaper);
                param[15] = new SqlParameter("@ElectiveSet", ElectiveSet);
                param[16] = new SqlParameter("@Mid3Max_Marks", Mid3Max_Marks);
                param[17] = new SqlParameter("@subid", subid);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("ADM_SFP_SET_CreateOrUpdateBySubid", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }



        [HttpPost, ActionName("AddSubjects")]
        public string AddSubjects(int DataTypeId, string Subject_Code, string SubjectName,float Mid1Max_Marks, float Mid2Max_Marks, float InternalMax_Marks,
         float Credits, int subtype, int semid,int end_exam_max_marks,int iselective,int schemeid, int branchid, string PCode,int BoardQuestionPaper, int ElectiveSet, float Mid3Max_Marks)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[17];
                param[0] = new SqlParameter("@DataTypeId", DataTypeId);
                param[1] = new SqlParameter("@Subject_Code", Subject_Code);
                param[2] = new SqlParameter("@SubjectName", SubjectName);
                param[3] = new SqlParameter("@Mid1Max_Marks", Mid1Max_Marks);
                param[4] = new SqlParameter("@Mid2Max_Marks", Mid2Max_Marks);
                param[5] = new SqlParameter("@InternalMax_Marks", InternalMax_Marks);
                param[6] = new SqlParameter("@Credits", Credits);
                param[7] = new SqlParameter("@subtype", subtype);
                param[8] = new SqlParameter("@semid", semid);
                param[9] = new SqlParameter("@end_exam_max_marks", end_exam_max_marks);
                param[10] = new SqlParameter("@iselective", iselective);
                param[11] = new SqlParameter("@schemeid", schemeid);              
                param[12] = new SqlParameter("@branchid", branchid);
                param[13] = new SqlParameter("@PCode", PCode);
                param[14] = new SqlParameter("@BoardQuestionPaper", BoardQuestionPaper);
                param[15] = new SqlParameter("@ElectiveSet", ElectiveSet);
                param[16] = new SqlParameter("@Mid3Max_Marks", Mid3Max_Marks);
               
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("ADM_SFP_SET_CreateOrUpdateBySubid", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpPost, ActionName("AddUserSubModule")]
        public string AddUserSubModule(int UserTypeId, int ModuleId, int SubModuleId)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@UserTypeId", UserTypeId);
                param[1] = new SqlParameter("@ModuleId", ModuleId);
                param[2] = new SqlParameter("@SubModuleId", SubModuleId);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("ADM_AddUserSubModules", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpPost, ActionName("UserModuleInactive")]
        public string UserModuleInactive(int Id, int IsActive, int UserTypeId)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@Id", Id);
                param[1] = new SqlParameter("@IsActive", IsActive);
                param[2] = new SqlParameter("@UserTypeId", UserTypeId);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("ADM_UserModuleInactive", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpPost, ActionName("UserSubModuleInactive")]
        public string UserSubModuleInactive(int Id, int IsActive, int UserTypeId)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@Id", Id);
                param[1] = new SqlParameter("@IsActive", IsActive);
                param[2] = new SqlParameter("@UserTypeId", UserTypeId);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("ADM_UserSubModuleInactive", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpPost, ActionName("GetSubmodulesByModule")]
        public string GetSubmodulesByModule(int ModuleId)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@ModuleId", ModuleId);
  
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("ADM_GetSubModuleByModules", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }



        [HttpGet, ActionName("GetCastes")]
        public string GetCastes()
        {
            try
            {
                var dbHandler = new dbHandler();
                string StrQuery = "";
                StrQuery = "exec SBT_ADM_GET_CASTES";
                var res = dbHandler.ReturnDataSet(StrQuery);
                return JsonConvert.SerializeObject(res);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("SBT_ADM_GET_CASTES", 0, ex.Message);
                throw ex;
            }
        }


        [HttpGet, ActionName("GetModules")]
        public string GetModules()
        {
            try
            {
                var dbHandler = new dbHandler();
                string StrQuery = "";
                StrQuery = "exec ADM_GET_Modules";
                var res = dbHandler.ReturnDataSet(StrQuery);
                return JsonConvert.SerializeObject(res);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("ADM_GET_Modules", 0, ex.Message);
                throw ex;
            }
        }

        [HttpGet, ActionName("getSubModules")]
        public string getSubModules()
        {
            try
            {
                var dbHandler = new dbHandler();
                string StrQuery = "";
                StrQuery = "exec ADM_GetSubModules";
                var res = dbHandler.ReturnDataSet(StrQuery);
                return JsonConvert.SerializeObject(res);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("ADM_GetSubModules", 0, ex.Message);
                throw ex;
            }
        }

        [HttpGet, ActionName("getAllModules")]
        public string getAllModules()
        {
            try
            {
                var dbHandler = new dbHandler();
                string StrQuery = "";
                StrQuery = "exec ADM_GET_AllModules";
                var res = dbHandler.ReturnDataSet(StrQuery);
                return JsonConvert.SerializeObject(res);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("ADM_GET_AllModules", 0, ex.Message);
                throw ex;
            }
        }

        [HttpGet, ActionName("getAllUserModules")]
        public string getAllUserModules()
        {
            try
            {
                var dbHandler = new dbHandler();
                string StrQuery = "";
                StrQuery = "exec ADM_GET_AllUserModules";
                var res = dbHandler.ReturnDataSet(StrQuery);
                return JsonConvert.SerializeObject(res);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("ADM_GET_AllUserModules", 0, ex.Message);
                throw ex;
            }
        }

        [HttpGet, ActionName("getAllSubModules")]
        public string getAllSubModules()
        {
            try
            {
                var dbHandler = new dbHandler();
                string StrQuery = "";
                StrQuery = "exec ADM_GetAllSubModules";
                var res = dbHandler.ReturnDataSet(StrQuery);
                return JsonConvert.SerializeObject(res);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("ADM_GetAllSubModules", 0, ex.Message);
                throw ex;
            }
        }

        [HttpGet, ActionName("getAllUserSubModules")]
        public string getAllUserSubModules()
        {
            try
            {
                var dbHandler = new dbHandler();
                string StrQuery = "";
                StrQuery = "exec ADM_GetAllUserSubModules";
                var res = dbHandler.ReturnDataSet(StrQuery);
                return JsonConvert.SerializeObject(res);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("ADM_GetAllUserSubModules", 0, ex.Message);
                throw ex;
            }
        }

        [HttpGet, ActionName("EditCaste")]
        public string EditCaste(int id)
        {

            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@id", id);

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SBT_ADM_EDIT_CASTE", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }

        [HttpGet, ActionName("deleteCaste")]
        public string deleteCaste(int Id)
        {

            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@Id", Id);

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SBT_ADM_DELETE_CASTE ", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpGet, ActionName("updatecaste")]
        public string updatecaste(int id, string CasteName)
        {

            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@Id", id);
                param[1] = new SqlParameter("@CasteName", CasteName);

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SBT_ADM_UPDATE_CASTE", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
        //dist
        [HttpPost, ActionName("setDist")]
        public string setDist(string Disteict)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@Disteict", Disteict);

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SBT_ADM_SET_DISTRICT", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_Admission_GET_DashBoradReportPinList", 0, ex.Message);
                return ex.Message;
            }

        }

        [HttpGet, ActionName("GetDistrictes")]
        public string GetDistrictes()
        {
            try
            {
                var dbHandler = new dbHandler();
                string StrQuery = "";
                StrQuery = "exec SBT_ADM_GET_DISTRICT";
                var res = dbHandler.ReturnDataSet(StrQuery);
                return JsonConvert.SerializeObject(res);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("SBT_ADM_GET_DISTRICT", 0, ex.Message);
                return ex.Message;
            }
        }
        [HttpGet, ActionName("EditDist")]
        public string EditDist(int id)
        {

            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@Id", id);

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SBT_ADM_EDIT_DISTRICT", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_GET_StudentCategoryPinList", 0, ex.Message);
                return ex.Message;
            }

        }

        [HttpGet, ActionName("GetAttendeeidbyPin")]
        public string GetAttendeeidbyPin(string Pin)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@pin", Pin);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("USP_GET_Attendeeid_by_pin", param);

                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_GET_Attendeeid_by_pin", 0, ex.Message);
                return ex.Message;
            }
        }



        [HttpGet, ActionName("deleteDist")]
        public string deleteDist(int Id)
        {

            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@Id", Id);

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SBT_ADM_DEL_DISTRICT ", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("SBT_ADM_DEL_DISTRICT", 0, ex.Message);
                return ex.Message;
            }
        }

        [HttpGet, ActionName("updateDist")]
        public string updateDist(int Id, string District)
        {

            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@Id", Id);
                param[1] = new SqlParameter("@District", District);

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SBT_ADM_UPDATE_DISTRICT", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("SBT_ADM_UPDATE_DISTRICT", 0, ex.Message);
                return ex.Message;
            }
        }

        //set Mandal
        [HttpPost, ActionName("setMandal")]
        public string setMandal(string Mandal)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@Mandal", Mandal);

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SBT_ADM_SET_MANDAL", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("SBT_ADM_SET_MANDAL", 0, ex.Message);
                return ex.Message;
            }

        }

        [HttpGet, ActionName("GetMandal")]
        public string GetMandal()
        {
            try
            {
                var dbHandler = new dbHandler();
                string StrQuery = "";
                StrQuery = "exec SBT_ADM_GET_MANDAL";
                var res = dbHandler.ReturnDataSet(StrQuery);
                return JsonConvert.SerializeObject(res);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("SBT_ADM_GET_MANDAL", 0, ex.Message);
                return ex.Message;
            }
        }
        [HttpGet, ActionName("EditMandal")]
        public string EditMandal(int id)
        {

            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@Id", id);

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SBT_ADM_EDIT_MANDAL", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_GET_STUDENT_BY_PIN", 0, ex.Message);
                return ex.Message;
            }

        }
        [HttpGet, ActionName("deleteMandal")]
        public string deleteMandal(int Id)
        {

            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@Id", Id);

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SBT_ADM_DELETE_MANDAL", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("SBT_ADM_DELETE_MANDAL ", 0, ex.Message);
                return ex.Message;
            }
        }
        [HttpPost, ActionName("updateMandal")]
        public string updateMandal(int Id, string Mandal)
        {

            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@Id", Id);
                param[1] = new SqlParameter("@Mandal", Mandal);

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SBT_ADM_UPDATE_MANDAL", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("SBT_ADM_UPDATE_MANDAL", 0, ex.Message);
                return ex.Message;
            }
        }
        //RolesType

        [HttpGet, ActionName("GetRoleDatas")]
        public string GetRoleDatas()
        {
            try
            {
                var dbHandler = new dbHandler();
                string StrQuery = "";
                StrQuery = "exec USP_MST_GET_ROLE ";
                var res = dbHandler.ReturnDataSet(StrQuery);
                return JsonConvert.SerializeObject(res);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_MST_GET_ROLE", 0, ex.Message);
                throw ex;
            }
        }
        [HttpPost, ActionName("SetRollType")]
        public string SetRollType(string RoleName, string Puropse)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@UserDescription", RoleName);
                param[1] = new SqlParameter("@Purpose", Puropse);

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("USP_MST_SET_ROLESTYPES ", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_MST_SET_ROLESTYPES ", 0, ex.Message);
                return ex.Message;
            }

        }

       
        [HttpGet, ActionName("GetColleges")]
        public string GetColleges()
        {
            try
            {
                var dbHandler = new dbHandler();
                string StrQuery = "";
                StrQuery = "exec ADM_GET_COLLEGESLIST";
                var res = dbHandler.ReturnDataSet(StrQuery);
                return JsonConvert.SerializeObject(res);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("ADM_GET_COLLEGESLIST", 0, ex.Message);
                throw ex;
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
                var res = dbHandler.ReturnDataSet(StrQuery);
                return JsonConvert.SerializeObject(res);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_GET_ActiveBranches", 0, ex.Message);
                throw ex;
            }
        }

        [HttpGet, ActionName("EditData")]
        public string EditData(int Id)
        {

            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@Id", Id);

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SBT_MST_EDIT_ROLLTYPE", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("SBT_MST_EDIT_ROLLTYPE", 0, ex.Message);
                return ex.Message;
            }

        }
        [HttpGet, ActionName("Deletedata")]
        public string Deletedata(int Id)
        {

            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@Id", Id);

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SBT_MST_DELETE_ROLLTYPE", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("SBT_MST_DELETE_ROLLTYPE", 0, ex.Message);
                return ex.Message;
            }
        }
        [HttpPost, ActionName("UpdateRolltype")]
        public string UpdateRolltype(int Id, string RoleName, string Puropse)
        {

            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@Id", Id);
                param[1] = new SqlParameter("@RoleName", RoleName);
                param[2] = new SqlParameter("@Purpose", Puropse);

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SBT_MST_UPDATE_ROLETYPE", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("SBT_MST_UPDATE_ROLETYPE", 0, ex.Message);
                return ex.Message;
            }
        }

        [HttpPost, ActionName("AddUser")]
        public string AddUser(int datatypeId, string UserName,int UserTypeId, string UserPassword,string FirstName,string LastName,
            string Address,string EmailId, string CellNo,int CollegeId,int BranchId)
        {

            try
            {
                var dbHandler = new dbHandler();
                if(UserTypeId == 3) {
                var param = new SqlParameter[11];
                param[0] = new SqlParameter("@datatypeId", datatypeId);
                param[1] = new SqlParameter("@UserName", UserName);
                param[2] = new SqlParameter("@UserTypeId", UserTypeId);
                param[3] = new SqlParameter("@UserPassword", UserPassword);
                param[4] = new SqlParameter("@FirstName", FirstName);
                param[5] = new SqlParameter("@LastName", LastName);
                param[6] = new SqlParameter("@Address", Address);
                param[7] = new SqlParameter("@EmailId", EmailId);
                param[8] = new SqlParameter("@CellNo", CellNo);
                param[9] = new SqlParameter("@CollegeId", CollegeId);
                param[10] = new SqlParameter("@BranchId", BranchId);
                    var dt = dbHandler.ReturnDataWithStoredProcedureTable("SBP_M_UserIds_CreateOrUpdate", param);
                    return JsonConvert.SerializeObject(dt);
                }
                else if(UserTypeId == 2)
                {
                    var param = new SqlParameter[10];
                    param[0] = new SqlParameter("@datatypeId", datatypeId);
                    param[1] = new SqlParameter("@UserName", UserName);
                    param[2] = new SqlParameter("@UserTypeId", UserTypeId);
                    param[3] = new SqlParameter("@UserPassword", UserPassword);
                    param[4] = new SqlParameter("@FirstName", FirstName);
                    param[5] = new SqlParameter("@LastName", LastName);
                    param[6] = new SqlParameter("@Address", Address);
                    param[7] = new SqlParameter("@EmailId", EmailId);
                    param[8] = new SqlParameter("@CellNo", CellNo);
                    param[9] = new SqlParameter("@CollegeId", CollegeId);
                    var dt = dbHandler.ReturnDataWithStoredProcedureTable("SBP_M_UserIds_CreateOrUpdate", param);
                    return JsonConvert.SerializeObject(dt);
                }
                else
                {
                    var param = new SqlParameter[9];
                    param[0] = new SqlParameter("@datatypeId", datatypeId);
                    param[1] = new SqlParameter("@UserName", UserName);
                    param[2] = new SqlParameter("@UserTypeId", UserTypeId);
                    param[3] = new SqlParameter("@UserPassword", UserPassword);
                    param[4] = new SqlParameter("@FirstName", FirstName);
                    param[5] = new SqlParameter("@LastName", LastName);
                    param[6] = new SqlParameter("@Address", Address);
                    param[7] = new SqlParameter("@EmailId", EmailId);
                    param[8] = new SqlParameter("@CellNo", CellNo);
                    var dt = dbHandler.ReturnDataWithStoredProcedureTable("SBP_M_UserIds_CreateOrUpdate", param);
                    return JsonConvert.SerializeObject(dt);
                }
               
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("SBP_M_UserIds_CreateOrUpdate", 0, ex.Message);
                return ex.Message;
            }
        }

       

        [HttpGet, ActionName("GetRolltype")]
        public string GetRolltype()
        {
            try
            {
                var dbHandler = new dbHandler();
                string StrQuery = "";
                StrQuery = "exec USP_MST_GET_ROLE";
                var res = dbHandler.ReturnDataSet(StrQuery);
                return JsonConvert.SerializeObject(res);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_MST_GET_ROLE", 0, ex.Message);
                throw ex;
            }
        }
        [HttpPost, ActionName("SetUserType")]
        public string SetUserType(int RoleId, string UserName)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@RoleType", RoleId);
                param[1] = new SqlParameter("@UserName", UserName);

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("USP_SET_USERS", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_SET_USERS", 0, ex.Message);
                return ex.Message;
            }

        }

        [HttpPost, ActionName("getUserById")]
        public string getUserById(int id)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@id", id);
               
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SBP_M_UserIdsByid", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("SBP_M_UserIdsByid", 0, ex.Message);
                return ex.Message;
            }

        }

        [HttpGet, ActionName("GetUserNames")]
        public string GetUserNames()
        {
            try
            {
                var dbHandler = new dbHandler();
                string StrQuery = "";
                // StrQuery = "exec USP_GET_USERS";
                StrQuery = "exec SBP_M_UserIdsOverall";
                var res = dbHandler.ReturnDataSet(StrQuery);
                return JsonConvert.SerializeObject(res);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_GET_USERS", 0, ex.Message);
                throw ex;
            }
        }

        [HttpGet, ActionName("getExamYearMonths")]
        public string getExamYearMonths()
        {
            try
            {
                var dbHandler = new dbHandler();
                string StrQuery = "";
                StrQuery = "exec USP_GET_ExamMonthYear";
                var res = dbHandler.ReturnDataSet(StrQuery);
                return JsonConvert.SerializeObject(res);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_GET_ExamMonthYear", 0, ex.Message);
                return ex.Message;
            }
        }

        [HttpGet, ActionName("SetExamMonthYear")]
        public string SetExamMonthYear(int DataTypeId, string ExamMonthYear, int ExamMonthYearId, int SequenceId)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[4];
                param[0] = new SqlParameter("@Datatypeid", DataTypeId);
                param[1] = new SqlParameter("@ExamMonthYear", ExamMonthYear);
                param[2] = new SqlParameter("@ExamMonthYearId", ExamMonthYearId);
                param[3] = new SqlParameter("@SequenceId", SequenceId);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("USP_SET_CreateOrUpdateExamMonthYear", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_SET_CreateOrUpdateExamMonthYear", 0, ex.Message);
                return ex.Message;
            }

        }

        public class UserTypesInfo
        {
            public string UserTypeName { get; set; }
            public string UserName { get; set; }
            public int UserTypeID { get; set; }
            public int DataType { get; set; }
            public bool Active { get; set; }
            public string Purpose { get; set; }
        }

        [HttpPost, ActionName("GetorEditorActiveUserTypes")]
        public string GetorEditorActiveUserTypes([FromBody] UserTypesInfo data)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@DataType", data.DataType);
                param[1] = new SqlParameter("@UserTypeID", data.UserTypeID);
                param[2] = new SqlParameter("@Active", data.Active);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Get_Edit_Active_UserTypes", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("SP_Get_Edit_Active_UserTypes", 0, ex.Message);
                return ex.Message;
            }

        }



        [HttpPost, ActionName("AddorUpdateUserTypes")]
        public string AddorUpdateUserTypes([FromBody] UserTypesInfo data)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[6];
                param[0] = new SqlParameter("@DataType", data.DataType);
                param[1] = new SqlParameter("@UserTypeID", data.UserTypeID);
                param[2] = new SqlParameter("@UserTypeName", data.UserTypeName);
                param[3] = new SqlParameter("@Purpose", data.Purpose);
                param[4] = new SqlParameter("@Active", data.Active);
                param[5] = new SqlParameter("@UserName", data.UserName);

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Add_Update_UserTypes", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("SP_Add_Update_UserTypes", 0, ex.Message);
                return ex.Message;
            }

        }




        public class UsersInfo
        {
            public int DataType { get; set; }
            public int UserID { get; set; }
            public int UserTypeID { get; set; }
            public string NewUserName { get; set; }
            public string UserPassword { get; set; }
            public string NameofUser { get; set; }
            public string MobileNumber { get; set; }
            public string Email { get; set; }
            public string UserName { get; set; }
            public bool Active { get; set; }
            public DateTime ExpiryDate { get; set; }
            public string LastName { get; set; }
            public string Address { get; set; }
            public int CollegeID { get; set; }
            public int BranchID { get; set; }




        }

        [HttpPost, ActionName("GetorEditorActiveUsers")]
        public string GetorEditorActiveUsers([FromBody] UsersInfo data)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[4];
                param[0] = new SqlParameter("@DataType", data.DataType);
                param[1] = new SqlParameter("@UserTypeID", data.UserTypeID);
                param[2] = new SqlParameter("@UserID", data.UserID);
                param[3] = new SqlParameter("@Active", data.Active);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Get_Edit_Active_Users", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("SP_Get_Edit_Active_Users", 0, ex.Message);
                return ex.Message;
            }

        }


        [HttpPost, ActionName("AddorUpdateUsers")]
        public string AddorUpdateUsers([FromBody] UsersInfo data)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[15];
                param[0] = new SqlParameter("@DataType", data.DataType);
                param[1] = new SqlParameter("@UserID", data.UserID);
                param[2] = new SqlParameter("@UserTypeID", data.UserTypeID);
                param[3] = new SqlParameter("@NewUserName", data.NewUserName);
                param[4] = new SqlParameter("@UserPassword", data.UserPassword);
                param[5] = new SqlParameter("@ExpiryDate", data.ExpiryDate);
                param[6] = new SqlParameter("@Active", data.Active);
                param[7] = new SqlParameter("@NameofUser", data.NameofUser);
                param[8] = new SqlParameter("@LastName", data.LastName);
                param[9] = new SqlParameter("@Address", data.Address);
                param[10] = new SqlParameter("@Email", data.Email);
                param[11] = new SqlParameter("@MobileNumber", data.MobileNumber);
                param[12] = new SqlParameter("@CollegeID", data.CollegeID);
                param[13] = new SqlParameter("@BranchID", data.BranchID);
                param[14] = new SqlParameter("@UserName", data.UserName);

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Add_Update_User", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("SP_Add_Update_User", 0, ex.Message);
                return ex.Message;
            }

        }


    }
}
