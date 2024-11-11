using SoftwareSuite.Models.Database;
using SoftwareSuite.Models.Results;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace SoftwareSuite.Services.Results
{
    public class ResultService
    {

        #region "Insert/Update/Delete"
        public DataSet PostResultProcess(ResultProcess ResultProcess, dbHandler dbHandler)
        {
            try
            {
                SqlParameter[] param = {
                    new SqlParameter("@CourseID", ResultProcess.CourseID ),
                    new SqlParameter("@ExamID", ResultProcess.ExamID),
                    new SqlParameter("@InstanceID",ResultProcess.ExamInstID ),
                   // new SqlParameter("@CollegeID", ResultProcess.CollegeID),
                   // new SqlParameter("@BranchID", ResultProcess.BranchID ),
                    new SqlParameter("@HallTicketNo", ResultProcess.HallTicketNoFrom  ),
                    new SqlParameter("@Ordinance", ResultProcess.Ordinance ==true ? "Y":"N"  ),                    
                   // new SqlParameter("@HallTicketNoTO", ResultProcess.HallTicketNoTo  ),
                    new SqlParameter("@LoginID", ResultProcess.LoginID )
                };
                return dbHandler.ReturnDataWithStoredProcedure("Process_ResultProcess", param);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        #endregion
        #region "Get Methods"
        public DataTable GetCollegeSemWiseReport(dbHandler dbHandler, int Schemeid, int Semid)
        {
            try
            {
                string StrQuery = "";
                StrQuery = "exec USP_GET_COLLEGE_SEM_RESULT '023','C18','1SEM'";
                return dbHandler.ReturnData(StrQuery);
                //"SystemUser.DeleteFlag,SystemUser.CreLoginID,SystemUser.CreDate,SystemUser.UpdLoginID,SystemUser.UpdDate " +
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public DataTable GetSchemesForResults(dbHandler dbHandler)
        {
            try
            {
                string StrQuery = "";
                StrQuery = "exec USP_GET_ACTIVE_SCHEMES_FOR_RESULTS";
                return dbHandler.ReturnData(StrQuery);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public DataSet GetExamTypeForResults(dbHandler dbHandler, int Schemeid)
        {
            try
            {
                string StrQuery = "";
                StrQuery = "exec USP_GET_ACTIVE_SEM_EXAMS_FOR_RESULTS " + Schemeid;
                return dbHandler.ReturnDataSet(StrQuery);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

     
        public DataTable GetTypeWritingShorthandReport(dbHandler dbHandler, string HallTicketno)
        {
            try
            {
                string StrQuery = "";
                StrQuery = "exec USP_GET_TWSH_RESULTS " + HallTicketno;
                return dbHandler.ReturnData(StrQuery);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public DataSet GetBranchWiseReport(dbHandler dbHandler, int CollegeId, int Schemeid, int Semid, int ExamTypeId, int BranchId,int ExamMonthYearId)
        {
            try
            {
                string StrQuery = "";// USP_Results_GET_C18BranchWiseResults 1,5,1,1,8,4
                StrQuery = "exec USP_Results_GET_C18BranchWiseResults " + CollegeId + "," + Schemeid + "," + Semid + "," + ExamTypeId + "," + BranchId + ","+ ExamMonthYearId+"";
                return dbHandler.ReturnDataSet(StrQuery);
                //"SystemUser.DeleteFlag,SystemUser.CreLoginID,SystemUser.CreDate,SystemUser.UpdLoginID,SystemUser.UpdDate " +
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public DataSet GetC18MidBranchWiseReport(dbHandler dbHandler, int CollegeId, int Schemeid, int Semid, int ExamTypeId, int BranchId,int AcademicId)
        {
            try
            {
                string StrQuery = "";
                StrQuery = "exec USP_Results_GET_C18MidMarksBranchWise "+ CollegeId + "," + Schemeid + "," + Semid + "," + ExamTypeId + "," + BranchId + ","+ AcademicId + "";
                return dbHandler.ReturnDataSet(StrQuery);
                //"SystemUser.DeleteFlag,SystemUser.CreLoginID,SystemUser.CreDate,SystemUser.UpdLoginID,SystemUser.UpdDate " +
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public DataSet GetBranchWiseOldReport(dbHandler dbHandler, int CollegeId, int Schemeid, int Semid, int ExamTypeId, string BranchId)
        {
            try
            {
                string StrQuery = "";
                StrQuery = "exec USP_GET_COLLEGE_SEM_BRANCH_RESULT_C16 " + CollegeId + "," + Schemeid + "," + Semid + "," + ExamTypeId + ",'" + BranchId + "'";
                return dbHandler.ReturnDataSet(StrQuery);
                //"SystemUser.DeleteFlag,SystemUser.CreLoginID,SystemUser.CreDate,SystemUser.UpdLoginID,SystemUser.UpdDate " +
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public DataSet Getc09StudentWiseReport(dbHandler dbHandler, int CollegeId, int Schemeid, int Semid, int ExamTypeId, string BranchId)
        {
            try
            {
                string StrQuery = "";
                StrQuery = "exec USP_Results_GET_C09StudentMarksData" + CollegeId + "," + Schemeid + "," + Semid + "," + ExamTypeId + ",'" + BranchId + "'";
                return dbHandler.ReturnDataSet(StrQuery);
                //"SystemUser.DeleteFlag,SystemUser.CreLoginID,SystemUser.CreDate,SystemUser.UpdLoginID,SystemUser.UpdDate " +
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public DataSet GetStudentWiseReport(dbHandler dbHandler, int Semid,int StudentTypeId, string Pin, int SchemeId, int ExamTypeId,int ExamMonthYearId)
        {
            try
            {
                string StrQuery = "";
                // StrQuery = "exec USP_GET_SEMandPINwise " + Semid + ",'" + Pin + "'," + SchemeId + "," + ExamTypeId + "";
                StrQuery = "exec USP_Results_StudentSubjectGradesPoints " + ExamMonthYearId + "," + SchemeId + "," + StudentTypeId + ",'" + Pin + "'," + Semid + "," + ExamTypeId +"";
                
                return dbHandler.ReturnDataSet(StrQuery);
                //"SystemUser.DeleteFlag,SystemUser.CreLoginID,SystemUser.CreDate,SystemUser.UpdLoginID,SystemUser.UpdDate " +
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

       
        public DataSet GetC18MidStudentWiseReport(dbHandler dbHandler, int Semid, string Pin, int SchemeId, int ExamTypeId)
        {

            try
            {
                string StrQuery = "";
                StrQuery = "exec USP_Results_GET_C18MidMarks '" + Pin + "',"+ Semid + "," + SchemeId + "," + ExamTypeId + "";
                return dbHandler.ReturnDataSet(StrQuery);
                //"SystemUser.DeleteFlag,SystemUser.CreLoginID,SystemUser.CreDate,SystemUser.UpdLoginID,SystemUser.UpdDate " +
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public DataSet GetOldStudentWiseReport(dbHandler dbHandler, int Semid, int StudentTypeId, string Pin, int SchemeId, int ExamTypeId, int ExamMonthYearId)
        {
            try
            {
                string StrQuery = "";
                if (SchemeId ==3|| SchemeId == 4 || SchemeId == 8 || SchemeId == 1) {
                    StrQuery = "exec USP_Results_GET_C16studentData " + ExamMonthYearId + "," + SchemeId + "," + StudentTypeId + ",'" + Pin + "'," + Semid + "," + ExamTypeId + "";
                }
                else if(SchemeId == 2|| SchemeId == 10)
                {
                    StrQuery = "exec USP_Results_GET_ER91studentData "+ ExamMonthYearId + "," + SchemeId + "," + StudentTypeId + ",'" + Pin + "'," + Semid + "," + ExamTypeId + "";
                }
                else {
                    StrQuery = "exec USP_GET_SEMandPINwise_C16 " + Semid + ",'" + Pin + "'," + SchemeId + "," + ExamTypeId + "";
                }
              
                return dbHandler.ReturnDataSet(StrQuery);
                //"SystemUser.DeleteFlag,SystemUser.CreLoginID,SystemUser.CreDate,SystemUser.UpdLoginID,SystemUser.UpdDate " +
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public DataSet GetSchemeSemBranchInfo(dbHandler dbHandler, int CollegeId)
        {
            try
            {
                string StrQuery = "";
                StrQuery = "exec USP_GET_SCHEME_SEM_BRANCH_INFO " + CollegeId;
                return dbHandler.ReturnDataSet(StrQuery);
                //"SystemUser.DeleteFlag,SystemUser.CreLoginID,SystemUser.CreDate,SystemUser.UpdLoginID,SystemUser.UpdDate " +
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public DataSet GetCollegesSchemeSemInfo(dbHandler dbHandler)
        {
            try
            {
                string StrQuery = "";
                StrQuery = "exec usp_Get_Colleges_SCHEME_SEM_INFO";
                return dbHandler.ReturnDataSet(StrQuery);
                //"SystemUser.DeleteFlag,SystemUser.CreLoginID,SystemUser.CreDate,SystemUser.UpdLoginID,SystemUser.UpdDate " +
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public DataTable GetExamTypeInfo(dbHandler dbHandler, int Schemeid, int Semid)
        {
            try
            {
                string StrQuery = "";
                StrQuery = $"exec USP_GetResultReleaseTypes {Schemeid},{Semid}";
                return dbHandler.ReturnData(StrQuery);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        #endregion
    }
}
