using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Net.Http;
using System.Web.Http;
using Newtonsoft.Json;
using System.Web.Script.Serialization;
using System.Diagnostics;
using SoftwareSuite.BLL;
using SoftwareSuite.Models.Database;
using RestSharp;

namespace SoftwareSuite.Controllers.Assessment
{
    public class AssessmentReportsController : BaseController
    {
        #region Get Methods
        //[HttpGet, ActionName("getReports")]
        //public HttpResponseMessage getReports()
        //{
        //    try
        //    {
        //        var dbHandler = new dbHandler();
        //        string StrQuery = "";
        //        StrQuery = "exec USP_GET_ACTIVE_SEMESTER";
        //        return Request.CreateResponse(HttpStatusCode.OK, dbHandler.ReturnDataSet(StrQuery));
        //    }
        //    catch (Exception ex)
        //    {
        //        
        //        dbHandler.SaveErorr("USP_GET_ACTIVE_SEMESTER", 0, ex.Message);
        //        throw ex;
        //    }
        //}
        [HttpGet, ActionName("getAdminReport")]
        public string getAdminReport(int examtypeid,int studentType, int AcademicYearId,string Semester,string ExamMonthYear)
        {
            try
            {
                var dbHandler = new dbHandler();

                //var param = new SqlParameter[0];
                //if (studentType == 2)
                //{
                //    param = new SqlParameter[3];
                 
                //    param[0] = new SqlParameter("@studentType", studentType);
                //    param[1] = new SqlParameter("@AcademicYearId", AcademicYearId);
                //    param[2] = new SqlParameter("@Semester", Semester);
                //}
                //else
                //{
                  var   param = new SqlParameter[5];
                 
                    param[0] = new SqlParameter("@examtypeid", examtypeid);
                    param[1] = new SqlParameter("@studentType", studentType);
                    param[2] = new SqlParameter("@AcademicYearId", AcademicYearId);
                    param[3] = new SqlParameter("@Semester", Semester);
                    param[4] = new SqlParameter("@ExamMonthYear", ExamMonthYear);
                //}
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("USP_GET_Assessment_AdminReports", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                
                dbHandler.SaveErorr("USP_GET_Assessment_AdminReports", 0, ex.Message);
                return ex.Message;
            }
        }


        [HttpGet, ActionName("getAdminReportsCollege")]
        public string getAdminReportsCollege(int examtypeid, string collegecode,int studentType,int AcademicYearId,string Semester,string ExamMonthYear)
        {
            try
            {
                var dbHandler = new dbHandler();
                //var param = new SqlParameter[0];
                //if (studentType == 2)
                //{
                //    param = new SqlParameter[4];

                //    param[0] = new SqlParameter("@studentType", studentType);
                //    param[1] = new SqlParameter("@collegecode", collegecode);
                //    param[2] = new SqlParameter("@AcademicYearId", AcademicYearId);
                //    param[3] = new SqlParameter("@Semester", Semester);
                //}
                //else
                //{
                    var param = new SqlParameter[6];
                    param[0] = new SqlParameter("@examtypeid", examtypeid);
                    param[1] = new SqlParameter("@studentType", studentType);
                    param[2] = new SqlParameter("@collegecode", collegecode);
                    param[3] = new SqlParameter("@AcademicYearId", AcademicYearId);
                    param[4] = new SqlParameter("@Semester", Semester);
                    param[5] = new SqlParameter("@ExamMonthYear", ExamMonthYear);
                //}



                var dt = dbHandler.ReturnDataWithStoredProcedureTable("USP_GET_Assessment_AdminReportsCollege", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                
                dbHandler.SaveErorr("USP_GET_Assessment_AdminReportsCollege", 0, ex.Message);
                return ex.Message;
            }

        }

        [HttpGet, ActionName("getAdminBranchReports")]
        public string getAdminBranchReports(int examtypeid, string collegecode, int branchid, int subid, int semid,int studentType,int AcademicYearId,string ExamMonthYear)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[0];
                if (studentType == 2)
                {
                    param = new SqlParameter[7];

                    param[0] = new SqlParameter("@collegecode", collegecode);
                    param[1] = new SqlParameter("@branchid", branchid);
                    param[2] = new SqlParameter("@subid", subid);
                    param[3] = new SqlParameter("@semid", semid);
                    param[4] = new SqlParameter("@studentType", studentType);
                    param[5] = new SqlParameter("@AcademicYearId", AcademicYearId);
                    param[6] = new SqlParameter("@ExamMonthYear", ExamMonthYear);

                }
                else
                {
                    param = new SqlParameter[8];

                    param[0] = new SqlParameter("@examtypeid", examtypeid);
                    param[1] = new SqlParameter("@collegecode", collegecode);
                    param[2] = new SqlParameter("@branchid", branchid);
                    param[3] = new SqlParameter("@subid", subid);
                    param[4] = new SqlParameter("@semid", semid);
                    param[5] = new SqlParameter("@studentType", studentType);
                    param[6] = new SqlParameter("@AcademicYearId", AcademicYearId);
                    param[7] = new SqlParameter("@ExamMonthYear", ExamMonthYear);
                }

              
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("USP_GET_Assessment_AdminReportPins", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                
                dbHandler.SaveErorr("USP_GET_Assessment_AdminReportPins", 0, ex.Message);
                return ex.Message;
            }

        }

        [HttpGet, ActionName("getBranchReports")]
        public string getBranchReports(string collegecode, int examtypeid, int studentType, int semid, int branchId, int subjectid)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[0];
                if (studentType == 2)
                {
                    param = new SqlParameter[5];
                    param[0] = new SqlParameter("@collegecode", collegecode);
                    param[1] = new SqlParameter("@studentType", studentType);
                    param[2] = new SqlParameter("@semid", semid);
                    param[3] = new SqlParameter("@branchId", branchId);
                    param[4] = new SqlParameter("@subjectid", subjectid);

             
                }
                else
                {
                    param = new SqlParameter[6];

                    param[0] = new SqlParameter("@collegecode", collegecode);
                    param[1] = new SqlParameter("@examtypeid", examtypeid);
                    param[2] = new SqlParameter("@studentType", studentType);
                    param[3] = new SqlParameter("@semid", semid);
                    param[4] = new SqlParameter("@branchId", branchId);
                    param[5] = new SqlParameter("@subjectid", subjectid);

                   
                }


                var dt = dbHandler.ReturnDataWithStoredProcedureTable("USP_GET_Assessment_CollegeReportsPinList", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_GET_Assessment_CollegeReportsPinList", 0, ex.Message);
                return ex.Message;
            }

        }



        [HttpGet, ActionName("getStudentReport")]
        public string getStudentReport(string pin)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@pin", pin);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("USP_GET_MarksPin", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                
                dbHandler.SaveErorr("USP_GET_MarksPin", 0, ex.Message);
                return ex.Message;
            }
        }

        #endregion

        public class TotalmarksList
        {
            public int id { get; set; }
            public string mid1 { get; set; }
            public string mid2 { get; set; }
            public string internals { get; set; }
            public string endexam { get; set; }

        }

        [HttpPost, ActionName("UpdateStudentMarks")]
        public string UpdateStudentMarks([FromBody]List<TotalmarksList> MarksList)
        {
            try
            {
                var ToUpdateMarksListData = new List<TotalmarksList>();
                int size = MarksList.Count;
                for (int i = 0; i < size; i++)
                {
                    ToUpdateMarksListData.Add(MarksList[i]);
                }
                Debug.WriteLine("before Conv to json: " + ToUpdateMarksListData);
                var json = new JavaScriptSerializer().Serialize(ToUpdateMarksListData);
                Debug.WriteLine("json: " + json);
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@json", json);
                var res = dbHandler.ReturnDataWithStoredProcedureTable("ADM_SET_Assessment_Marks_Entry", param);
                return JsonConvert.SerializeObject(res);
            }
            catch (Exception ex)
            {
                
                dbHandler.SaveErorr("ADM_SET_Assessment_Marks_Entry", 0, ex.Message);
                throw ex;
            }
        }



        [HttpPost, ActionName("SETRubricsMarks")]
        public string SETRubricsMarks(int SubjectTypeId, string stringRubricsData)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@SubjectTypeId", SubjectTypeId);
                param[1] = new SqlParameter("@JSON", stringRubricsData);
                var res = dbHandler.ReturnDataWithStoredProcedureTable("USP_Assessment_SET_RubricsMarks", param);
                return JsonConvert.SerializeObject(res);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_Assessment_SET_RubricsMarks", 0, ex.Message);
                throw ex;
            }
        }

        [HttpPost, ActionName("UpdateStudentBacklogMarks")]
        public string UpdateStudentBacklogMarks([FromBody]List<TotalmarksList> MarksList)
        {
            try
            {
                var ToUpdateMarksListData = new List<TotalmarksList>();
                int size = MarksList.Count;
                for (int i = 0; i < size; i++)
                {
                    ToUpdateMarksListData.Add(MarksList[i]);
                }
                Debug.WriteLine("before Conv to json: " + ToUpdateMarksListData);
                var json = new JavaScriptSerializer().Serialize(ToUpdateMarksListData);
                Debug.WriteLine("json: " + json);
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@json", json);
                var res = dbHandler.ReturnDataWithStoredProcedureTable("ADM_SET_Assessment_BacklogMarks_Entry", param);
                return JsonConvert.SerializeObject(res);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("ADM_SET_Assessment_BacklogMarks_Entry", 0, ex.Message);
                throw ex;
            }
        }
    }
}
