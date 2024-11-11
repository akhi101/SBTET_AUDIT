using SoftwareSuite.Models;
using SoftwareSuite.Models.Database;
using SoftwareSuite.Models.Results;
using SoftwareSuite.Services.Results;
using System;
using System.Collections.Generic;
using System.Data;

namespace SoftwareSuite.BLL
{
    public class ResultBLL
    {
        #region insert/update/delete
        public SystemResponse PostResultProcess(ResultProcess ResultProcess)
        {
            dbHandler dbHandler = new dbHandler(true);
            SystemResponse response = new SystemResponse();
            try
            {
                ResultService ResultService = new ResultService();
                ResultService.PostResultProcess(ResultProcess, dbHandler);
                dbHandler.Commit();
                response.IsSuccess = true;
                response.Message = "Result process successfully";
                return response;
            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = ex.ToString();
                dbHandler.RollBack();
                throw ex;
            }
        }
        #endregion
        #region GetMethod
        public IEnumerable<CollegeSemWiseReport> GetCollegeSemWiseReport(int Schemeid, int Semid)
        {
            try
            {

                ResultService resultsService = new ResultService();
                DataTable tblSystemUser = new DataTable();
                dbHandler dbHandler = new dbHandler();
                tblSystemUser = resultsService.GetCollegeSemWiseReport(dbHandler, Schemeid, Semid);
                List<CollegeSemWiseReport> ResultList = tblSystemUser.DataTableToList<CollegeSemWiseReport>();

                return ResultList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public DataTable GetSchemeDataForResults()
        {
            try
            {
                ResultService resultsService = new ResultService();
                dbHandler dbHandler = new dbHandler();
                return resultsService.GetSchemesForResults(dbHandler);

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public DataSet GetExamTypeForResults(int Schemeid)
        {
            try
            {
                ResultService resultsService = new ResultService();
                dbHandler dbHandler = new dbHandler();
                return resultsService.GetExamTypeForResults(dbHandler, Schemeid);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }



        public IEnumerable<BranchWiseReportData> GetBranchWiseReport(int CollegeId, int Schemeid, int Semid, int ExamTypeId, int BranchId, int ExamMonthYearId)
        {
            try
            {
                List<BranchWiseReportData> branchWiseReportDataList = new List<BranchWiseReportData>();
                BranchWiseReportData branchWiseReportData;
                ResultService resultsService = new ResultService();
                DataSet dsBranchWiseReport = new DataSet();
                dbHandler dbHandler = new dbHandler();
                dsBranchWiseReport = resultsService.GetBranchWiseReport(dbHandler, CollegeId, Schemeid, Semid, ExamTypeId, BranchId, ExamMonthYearId);
                List<BranchSubjectGradeInfo> branchSubjectGradeInfo = dsBranchWiseReport.Tables[0].DataTableToList<BranchSubjectGradeInfo>();
                List<BranchWiseReport> branchWiseReport = dsBranchWiseReport.Tables[1].DataTableToList<BranchWiseReport>();
                List<StudentSubjectTotalSGPA> studentSubjectTotalSGPA = dsBranchWiseReport.Tables[2].DataTableToList<StudentSubjectTotalSGPA>();

                branchWiseReportData = new BranchWiseReportData()
                {
                    branchSubjectGradeInfo = branchSubjectGradeInfo,
                    branchWiseReport = branchWiseReport,
                    studentSubjectTotalSGPA = studentSubjectTotalSGPA
                };

                branchWiseReportDataList.Add(branchWiseReportData);
                return branchWiseReportDataList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<BranchWiseReportData> GetC18MidBranchWiseReport(int CollegeId, int Schemeid, int Semid, int ExamTypeId, int BranchId,int AcademicId)
        {
            try
            {
                List<BranchWiseReportData> branchWiseReportDataList = new List<BranchWiseReportData>();
                BranchWiseReportData branchWiseReportData;
                ResultService resultsService = new ResultService();
                DataSet dsBranchWiseReport = new DataSet();
                dbHandler dbHandler = new dbHandler();
                dsBranchWiseReport = resultsService.GetC18MidBranchWiseReport(dbHandler, CollegeId, Schemeid, Semid, ExamTypeId, BranchId, AcademicId);
                List<BranchSubjectGradeInfo> branchSubjectGradeInfo = dsBranchWiseReport.Tables[0].DataTableToList<BranchSubjectGradeInfo>();
                List<BranchWiseReport> branchWiseReport = dsBranchWiseReport.Tables[1].DataTableToList<BranchWiseReport>();
                List<StudentSubjectTotalSGPA> studentSubjectTotalSGPA = dsBranchWiseReport.Tables[2].DataTableToList<StudentSubjectTotalSGPA>();

                branchWiseReportData = new BranchWiseReportData()
                {
                    branchSubjectGradeInfo = branchSubjectGradeInfo,
                    branchWiseReport = branchWiseReport,
                    studentSubjectTotalSGPA = studentSubjectTotalSGPA
                };

                branchWiseReportDataList.Add(branchWiseReportData);
                return branchWiseReportDataList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public DataSet GetBranchWiseOldReport(int CollegeId, int Schemeid, int Semid, int ExamTypeId, string BranchId)
        {
            try
            {
                // List<BranchWiseReportData> branchWiseReportDataList = new List<BranchWiseReportData>();
                // BranchWiseReportData branchWiseReportData;
                ResultService resultsService = new ResultService();
                DataSet dsBranchWiseReport = new DataSet();
                dbHandler dbHandler = new dbHandler();
                return resultsService.GetBranchWiseOldReport(dbHandler, CollegeId, Schemeid, Semid, ExamTypeId, BranchId);
                //List<BranchSubjectGradeInfo> branchSubjectGradeInfo = dsBranchWiseReport.Tables[0].DataTableToList<BranchSubjectGradeInfo>();
                //List<BranchWiseReport> branchWiseReport = dsBranchWiseReport.Tables[1].DataTableToList<BranchWiseReport>();
                //List<StudentSubjectTotalSGPA> studentSubjectTotalSGPA = dsBranchWiseReport.Tables[2].DataTableToList<StudentSubjectTotalSGPA>();

                //branchWiseReportData = new BranchWiseReportData()
                //{
                //    branchSubjectGradeInfo = branchSubjectGradeInfo,
                //    branchWiseReport = branchWiseReport,
                //    studentSubjectTotalSGPA = studentSubjectTotalSGPA
                //};

                //branchWiseReportDataList.Add(branchWiseReportData);
                //return branchWiseReportDataList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }



        public IEnumerable<CollegeSchemeSemData> GetCollegesSchemeSemInfo()
        {
            try
            {
                List<CollegeSchemeSemData> CollegesSchemeSemDataList = new List<CollegeSchemeSemData>();
                CollegeSchemeSemData CollegesSchemeSemData;
                ResultService resultsService = new ResultService();
                DataSet CollegesInfo = new DataSet();
                dbHandler dbHandler = new dbHandler();
                CollegesInfo = resultsService.GetCollegesSchemeSemInfo(dbHandler);
                List<CollegeInfo> collegesInfo = CollegesInfo.Tables[0].DataTableToList<CollegeInfo>();
                List<SchemeInfo> schemesInfo = CollegesInfo.Tables[1].DataTableToList<SchemeInfo>();
                List<SemInfo> semsInfo = CollegesInfo.Tables[2].DataTableToList<SemInfo>();

                CollegesSchemeSemData = new CollegeSchemeSemData()
                {
                    collegeInfo = collegesInfo,
                    schemeInfo = schemesInfo,
                    semInfo = semsInfo
                };
                CollegesSchemeSemDataList.Add(CollegesSchemeSemData);
                return CollegesSchemeSemDataList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<C18MidStudentWiseReportData> GetC18MidStudentWiseReport(int Semid, string Pin, int SchemeId, int ExamTypeId)
        {
            try
            {
                List<C18MidStudentWiseReportData> studentWiseReportDataList = new List<C18MidStudentWiseReportData>();
                C18MidStudentWiseReportData studentWiseReportData;
                List<StudentWiseReport> StudentWiseReportList = new List<StudentWiseReport>();
                List<StudentInfo> StudentInfoList = new List<StudentInfo>();
                ResultService resultsService = new ResultService();
                DataSet dsStudentWiseReport = new DataSet();
                dbHandler dbHandler = new dbHandler();
                dsStudentWiseReport = resultsService.GetC18MidStudentWiseReport(dbHandler, Semid, Pin, SchemeId, ExamTypeId);
                StudentWiseReportList = dsStudentWiseReport.Tables[1].DataTableToList<StudentWiseReport>();
                StudentInfoList = dsStudentWiseReport.Tables[2].DataTableToList<StudentInfo>();             
                    
                studentWiseReportData = new C18MidStudentWiseReportData()
                {
                    studentWiseReport = StudentWiseReportList,
                    studentInfo = StudentInfoList                       
                };
               
                studentWiseReportDataList.Add(studentWiseReportData);
                return studentWiseReportDataList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }



        public IEnumerable<StudentWiseReportData> GetStudentWiseReport(int Semid,int StudentTypeId, string Pin, int SchemeId, int ExamTypeId,int ExamMonthYearId)
        {
            try
            {
                List<StudentWiseReportData> studentWiseReportDataList = new List<StudentWiseReportData>();
                StudentWiseReportData studentWiseReportData;
                List<StudentWiseReport> StudentWiseReportList = new List<StudentWiseReport>();
                List<StudentInfo> StudentInfoList = new List<StudentInfo>();
                ResultService resultsService = new ResultService();
                DataSet dsStudentWiseReport = new DataSet();
                dbHandler dbHandler = new dbHandler();
                dsStudentWiseReport = resultsService.GetStudentWiseReport(dbHandler, Semid, StudentTypeId, Pin, SchemeId, ExamTypeId, ExamMonthYearId);               
                StudentWiseReportList = dsStudentWiseReport.Tables[0].DataTableToList<StudentWiseReport>();
                StudentInfoList = dsStudentWiseReport.Tables[1].DataTableToList<StudentInfo>();
                List<BranchSubjectGradeInfo> branchSubjectGradeInfo = dsStudentWiseReport.Tables[2].DataTableToList<BranchSubjectGradeInfo>();              
                if (ExamTypeId == 5)
                {
                    if (StudentTypeId == 1)
                    {
                        List<StudentSGPACGPAInfo> studentSGPACGPAInfo = dsStudentWiseReport.Tables[3].DataTableToList<StudentSGPACGPAInfo>();
                        List<StudentActivities> studentActivities = dsStudentWiseReport.Tables[4].DataTableToList<StudentActivities>();
                        List<StudnetSubjectTotals> studnetSubjectTotals = dsStudentWiseReport.Tables[5].DataTableToList<StudnetSubjectTotals>();
                        List<CumulativeGradeInfo> CumulativeGradeInfo = dsStudentWiseReport.Tables[6].DataTableToList<CumulativeGradeInfo>();
                        studentWiseReportData = new StudentWiseReportData()
                        {
                            studentWiseReport = StudentWiseReportList,
                            studentInfo = StudentInfoList,
                            branchSubjectGradeInfo = branchSubjectGradeInfo,
                            studentSGPACGPAInfo = studentSGPACGPAInfo,
                            studentActvities = studentActivities,
                            studentSubjectTotal = studnetSubjectTotals,
                            CumulativeGradeInfo = CumulativeGradeInfo
                        };
                    } else {
                        List<C18suppleGradeInfo> C18suppleGradeInfo = dsStudentWiseReport.Tables[3].DataTableToList<C18suppleGradeInfo>();
                        List<C18SemInfo> C18SemInfo = dsStudentWiseReport.Tables[4].DataTableToList<C18SemInfo>();
                        studentWiseReportData = new StudentWiseReportData()
                        {
                            studentWiseReport = StudentWiseReportList,
                            studentInfo = StudentInfoList,
                            branchSubjectGradeInfo = branchSubjectGradeInfo,
                            C18suppleGradeInfo = C18suppleGradeInfo,
                            C18SemInfo = C18SemInfo
                        };
                    }                   
                }
                else  //if(ExamTypeId == 1|| ExamTypeId == 2)
                {
                    List<StudentSGPACGPAInfo> studentSGPACGPAInfo = dsStudentWiseReport.Tables[3].DataTableToList<StudentSGPACGPAInfo>();
                    List<StudentActivities> studentActivities = dsStudentWiseReport.Tables[4].DataTableToList<StudentActivities>();
                    List<StudnetSubjectTotals> studnetSubjectTotals = dsStudentWiseReport.Tables[5].DataTableToList<StudnetSubjectTotals>();
                    studentWiseReportData = new StudentWiseReportData()
                    {
                        studentWiseReport = StudentWiseReportList,
                        studentInfo = StudentInfoList,
                        branchSubjectGradeInfo = branchSubjectGradeInfo,
                        studentSGPACGPAInfo = studentSGPACGPAInfo,
                        studentActvities = studentActivities,
                        studentSubjectTotal = studnetSubjectTotals
                    };
                }
                studentWiseReportDataList.Add(studentWiseReportData);
                return studentWiseReportDataList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public DataSet GetOldStudentWiseReport(int Semid, int StudentTypeId, string Pin, int SchemeId, int ExamTypeId, int ExamMonthYearId)
        {
            try
            {
                List<OldStudentWiseReportData> OldstudentWiseReportDataList = new List<OldStudentWiseReportData>();
                OldStudentWiseReportData OldStudentWiseReportData;
                List<OldStudentWiseReport> OldStudentWiseReporttList = new List<OldStudentWiseReport>();
                List<OldStudentInfo> OldStudentInfoList = new List<OldStudentInfo>();
                ResultService resultsService = new ResultService();
                DataSet dsOldStudentWiseReport = new DataSet();
                dbHandler dbHandler = new dbHandler();
                return resultsService.GetOldStudentWiseReport(dbHandler, Semid, StudentTypeId, Pin, SchemeId, ExamTypeId, ExamMonthYearId);
                //OldStudentWiseReporttList = dsOldStudentWiseReport.Tables[0].DataTableToList<OldStudentWiseReport>();
                //OldStudentInfoList = dsOldStudentWiseReport.Tables[1].DataTableToList<OldStudentInfo>();

                //if (ExamTypeId == 5)
                //{

                //    OldStudentWiseReportData = new OldStudentWiseReportData()
                //    {
                //        OldStudentWiseReport = OldStudentWiseReporttList,
                //        OldstudentInfo = OldStudentInfoList,

                //    };
                //}
                //else
                //{

                //    OldStudentWiseReportData = new OldStudentWiseReportData()
                //    {
                //        OldStudentWiseReport = OldStudentWiseReporttList,
                //        OldstudentInfo = OldStudentInfoList,

                //    };
                //}
                //OldstudentWiseReportDataList.Add(OldStudentWiseReportData);
                //return OldstudentWiseReportDataList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public IEnumerable<SchemeSemBranchData> GetSchemeSemBranchInfo(int CollegeId)
        {
            try
            {
                List<SchemeSemBranchData> SchemeSemBranchDataList = new List<SchemeSemBranchData>();
                SchemeSemBranchData schemeSemBranchData;
                ResultService resultsService = new ResultService();
                DataSet SchemeSemBranc = new DataSet();
                dbHandler dbHandler = new dbHandler();
                SchemeSemBranc = resultsService.GetSchemeSemBranchInfo(dbHandler, CollegeId);
                List<SchemeInfo> schemeInfo = SchemeSemBranc.Tables[0].DataTableToList<SchemeInfo>();
                List<SemInfo> semInfo = SchemeSemBranc.Tables[1].DataTableToList<SemInfo>();
                List<BranchInfo> branchInfo = SchemeSemBranc.Tables[2].DataTableToList<BranchInfo>();
                schemeSemBranchData = new SchemeSemBranchData()
                {
                    schemeInfo = schemeInfo,
                    semInfo = semInfo,
                    branchInfo = branchInfo
                };

                SchemeSemBranchDataList.Add(schemeSemBranchData);
                return SchemeSemBranchDataList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<ExamTypeData> GetExamTypeInfo(int SchemeId, int SemYearId)
        {
            try
            {
                List<ExamTypeData> ExamTypeDataList = new List<ExamTypeData>();
                ExamTypeData examTypeData;
                ResultService resultsService = new ResultService();
                DataTable TypeInfo = new DataTable();
                dbHandler dbHandler = new dbHandler();
                TypeInfo = resultsService.GetExamTypeInfo(dbHandler, SchemeId, SemYearId);
                List<ExamTypeInfo> examTypeInfo = TypeInfo.DataTableToList<ExamTypeInfo>();

                examTypeData = new ExamTypeData()
                {
                    typeInfo = examTypeInfo
                };
                ExamTypeDataList.Add(examTypeData);
                return ExamTypeDataList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public DataTable GetTypeWritingShorthandReport(string HallTicketno)
        {
            try
            {
                ResultService resultsService = new ResultService();
                dbHandler dbHandler = new dbHandler();
                return resultsService.GetTypeWritingShorthandReport(dbHandler, HallTicketno);

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        #endregion
    }
}
