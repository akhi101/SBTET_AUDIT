using System;
using System.Collections.Generic;
using System.Linq;
using System.Diagnostics;
using System.Web;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Data.SqlClient;
using Newtonsoft.Json;
using System.Configuration;
using System.Xml;
using System.Threading.Tasks;
using System.IO;
using SoftwareSuite.Models.Database;
using System.Web.Script.Serialization;
using Newtonsoft.Json.Linq;
using SoftwareSuite.Models;
using System.Timers;
using System.Data;
using RestSharp;
using DocumentFormat.OpenXml.Packaging;
using System.Web.UI.WebControls;
using static SoftwareSuite.Controllers.PreExamination.GenerateNR;

namespace SoftwareSuite.Controllers.CCIC.PreExamination
{
    public class CcicPreExaminationReportController : BaseController
    {

        private void CreateIfMissing(string path)
        {
            bool folderExists = Directory.Exists(path);
            if (!folderExists)
                Directory.CreateDirectory(path);
        }



        [HttpGet, ActionName("NrReports")]
        public string NrReports(int AcademicYearID, int ExamMonthYearID, string ExamDate,string UserName)
        {
            string NRReportDir = @"Reports\NR\";
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[4];
                param[0] = new SqlParameter("@AcademicYearID", AcademicYearID);
                param[1] = new SqlParameter("@ExamMonthYearID", ExamMonthYearID);
                param[2] = new SqlParameter("@ExamDate", ExamDate);
                param[3] = new SqlParameter("@UserName", UserName);
                DataSet ds = dbHandler.ReturnDataWithStoredProcedure("SP_Get_PhotoAttendanceData", param);
                CcicGenerateNR CcicGenerateNR = new CcicGenerateNR();
                var pdf = CcicGenerateNR.GetNrPdf(ds, NRReportDir);

                return pdf;
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
    }
}
