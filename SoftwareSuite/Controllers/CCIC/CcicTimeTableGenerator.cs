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

namespace SoftwareSuite.Controllers.CCIC
{
    public class CcicTimeTableGeneratorController : ApiController
    {
        public class TimeTableData
        {
            public string Scheme { get; set; }
            public string Branch { get; set; }
            public string Pcode { get; set; }
            public string SubjectCode { get; set; }
            public string SubjectName { get; set; }
            public bool IsElective { get; set; }
            public DateTime ExamDate { get; set; }
            public string ExamTime { get; set; }
            public string ExamSession { get; set; }
            public string ExamMonthYear { get; set; }
            public string YearCourse { get; set; }
            public string ExamType { get; set; }
            public string Remarks { get; set; }
            public int branchid { get; set; }
            public string BranchName { get; set; }
            public string Semester { get; set; }
            public string StudentType { get; set; }
            public int semid { get; set; }
            public int SemesterSequence { get; set; }
        }

        [HttpPost, ActionName("setTimeTable")]
        public string setTimeTable([FromBody] JsonObject request)   
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@AcademicYearId", request["AcademicYearId"]);
                param[1] = new SqlParameter("@ExamMonthYearId", request["ExamMonthYearId"]);
                param[2] = new SqlParameter("@StartDate", request["StartDate"]);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("USP_SET_RegularTimeTable_Test", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

    }
}
