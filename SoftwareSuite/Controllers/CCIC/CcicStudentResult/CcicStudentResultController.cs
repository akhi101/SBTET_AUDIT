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
using System.Timers;
using SoftwareSuite.Models.Assessment;
using System.Diagnostics;
using System.Web.Script.Serialization;

namespace SoftwareSuite.Controllers.CCIC
{
    public class CcicStudentResultController : ApiController
    {


      

        [HttpGet, ActionName("GetStudentResult")]
        public string GetStudentResult(int AcademicYearID,int ExamMonthYearID,string PIN)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@AcademicYearID", AcademicYearID);
                param[1] = new SqlParameter("@ExamMonthYearID", ExamMonthYearID);
                param[2] = new SqlParameter("@PIN", PIN);

                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_Get_StudentResult", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

       



    }

}
