using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Timers;
using System.Web;
using System.Web.Http;
using Newtonsoft.Json;
using PdfSharp.Pdf.IO;
using RestSharp;
using SelectPdf;
using SoftwareSuite.Models;
using SoftwareSuite.Models.Database;

namespace SoftwareSuite.Controllers.PreExamination
{
    public class TimeTableGeneratorController : ApiController
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
        public string setTimeTable([FromBody] JsonObject request )   //int StudentTypeId, int SemId, int SchemeId, int ExamTypeId, string StartDate, string Fntime, string Antime)
        {
            try
            {

                var dbHandler = new dbHandler();
                var param = new SqlParameter[9];
                param[0] = new SqlParameter("@AcademicYearId", request["AcademicYearId"]);
                param[1] = new SqlParameter("@SessionId", request["SessionId"]);
                param[2] = new SqlParameter("@ExamMonthYearId", request["ExamMonthYearId"]);
                param[3] = new SqlParameter("@StudentTypeId", request["StudentTypeId"]);              
                param[4] = new SqlParameter("@SchemeId", request["SchemeId"]);
                param[5] = new SqlParameter("@ExamTypeId", request["ExamTypeId"]);
                param[6] = new SqlParameter("@StartDate", request["StartDate"]);
                param[7] = new SqlParameter("@SemId", request["SemId"].ToString());
                param[8] = new SqlParameter("@isonlyC18", request["isonlyC18"]);
                DataSet ds = dbHandler.ReturnDataWithStoredProcedure("USP_SET_TimeTable", param);              
                return JsonConvert.SerializeObject(ds);              
            }
            catch (Exception ex)
            {             
                return  ex.Message;
            }
        }

        [HttpPost, ActionName("getTimeTabledata")]
        public string getTimeTabledata([FromBody] JsonObject request)   //int StudentTypeId, int SemId, int SchemeId, int ExamTypeId, string StartDate, string Fntime, string Antime)
        {
            try
            {

                var dbHandler = new dbHandler();
                var param = new SqlParameter[5];
                param[0] = new SqlParameter("@AcademicYearId", request["AcademicYearId"]);
                param[1] = new SqlParameter("@ExamMonthYearId", request["ExamMonthYearId"]);
                param[2] = new SqlParameter("@StudentTypeId", request["StudentTypeId"]);
                param[3] = new SqlParameter("@ExamTypeId", request["ExamTypeId"]);
                param[4] = new SqlParameter("@SchemeId", request["SchemeId"]);       
                DataSet ds = dbHandler.ReturnDataWithStoredProcedure("USP_GET_TimeTableForDownloadingPDF", param);
                return JsonConvert.SerializeObject(ds);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpPost, ActionName("GetPrincipalTimeTablePdf")]
        public string GetPrincipalTimeTablePdf([FromBody] JsonObject request) 
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@ExamMonthYearId", request["ExamMonthYearId"]);
                DataSet ds = dbHandler.ReturnDataWithStoredProcedure("USP_GET_TimeTableByExamMonthYr", param);
                if(ds.Tables[0].Rows.Count > 0) { 
                var TimeTableData = DataTableHelper.ConvertDataTable<TimeTableData>(ds?.Tables[0]);
                var pdf = GetTimeTablesheetPdf(TimeTableData);
                return pdf;
                }else
                {
                    var response= "err";
                    return response;
                }
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpPost, ActionName("GetPrincipalTimetableExcel")]
        public string GetPrincipalTimetableExcel([FromBody] JsonObject request)
        {
            try
            {

                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@ExamMonthYearId", request["ExamMonthYearId"]);

                DataSet ds = dbHandler.ReturnDataWithStoredProcedure("USP_GET_TimeTableByExamMonthYr", param);
                if (ds.Tables[0].Rows.Count > 0)
                {

                    string filename = "Backlog" + "-" + "TimeTable" + "_" + Guid.NewGuid() + ".xlsx";

                    var eh = new ExcelHelper();
                    var path = ConfigurationManager.AppSettings["DownloadsFolderPath"];
                    bool folderExists = Directory.Exists(path);
                    if (!folderExists)
                        Directory.CreateDirectory(path);
                    eh.ExportDataSet(ds, path + filename);
                    Timer timer = new Timer(200000);
                    timer.Elapsed += (sender, e) => elapse(sender, e, ConfigurationManager.AppSettings["DownloadsFolderPath"] + filename);
                    timer.Start();


                    return "/Downloads/" + filename;
                }
                else
                {
                    var response = "err";
                    return response;
                }
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpPost, ActionName("TimeTablePdf")]
        public string TimeTablePdf([FromBody] JsonObject request)
        {
            try
            {

                var dbHandler = new dbHandler();
                var param = new SqlParameter[6];
                param[0] = new SqlParameter("@AcademicYearId", request["AcademicYearId"]);
                param[1] = new SqlParameter("@ExamMonthYearId", request["ExamMonthYearId"]);
                param[2] = new SqlParameter("@StudentTypeId", request["StudentTypeId"]);
                param[3] = new SqlParameter("@ExamTypeId", request["ExamTypeId"]);
                param[4] = new SqlParameter("@SchemeId", request["SchemeId"]);
                param[5] = new SqlParameter("@DataTypeId", request["DataTypeId"]);
                DataSet ds = dbHandler.ReturnDataWithStoredProcedure("USP_GET_TimeTableForDownloadingPDF_ForPrincipal", param);
                if (ds.Tables[0].Rows.Count > 0)
                {
                    var TimeTableData = DataTableHelper.ConvertDataTable<TimeTableData>(ds?.Tables[0]);
                    var pdf = GetTimeTablesheetPdf(TimeTableData);
                    return pdf;
                }
                else
                {
                    var response = "err";
                    return response;
                }
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpPost, ActionName("PublishTimetable")]
        public HttpResponseMessage PublishTimetable([FromBody] JsonObject request)
        {
            try
            {

                var dbHandler = new dbHandler();
                var param = new SqlParameter[2];             
                param[0] = new SqlParameter("@ExamMonthYearId", request["ExamMonthYearId"]);
                param[1] = new SqlParameter("@StudentTypeId", request["StudentTypeId"]);            
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("USP_SET_TimeTablePublishIntoMasterTables", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_SET_TimeTablePublishIntoMasterTables", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }

        public class DateSheetdata {
            public string Scheme_Code { get; set; }
            public string Branch_Code { get; set; }
            public string Subject_Code { get; set; }
            public string SubjectName { get; set; }
            public string ExamDate { get; set; }
            public string ExamSession { get; set; }
            public string SessionTime { get; set; } 
            public string PCode { get; set; }
            public bool BoardQuestionPaper { get; set; }
            public bool AnswerBookLet { get; set; }
            public string ExamYearMonth { get; set; }
        }

        [HttpPost, ActionName("PostTimetable")]
        public string PostTimetable(int ExamMonthYearId,int StudentTypeId)
        {
            try
            {

                var dbHandler = new dbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@ExamMonthYearId", ExamMonthYearId);
                param[1] = new SqlParameter("@StudentTypeId", StudentTypeId);
                DataSet ds = dbHandler.ReturnDataWithStoredProcedure("USP_SET_PublishedTimeTableForOSDES", param);
                var DateSheetdata = DataTableHelper.ConvertDataTable<DateSheetdata>(ds.Tables[1]);
                if (ds.Tables[0].Rows[0]["ResponseCode"].ToString() == "200") {
                    return "true";
                } else {
                    return "false";
                }
               
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_SET_PublishedTimeTableForOSDES", 0, ex.Message);
                return "false";
            }
        }


        private static void elapse(object sender, ElapsedEventArgs e, string s)
        {
            System.IO.File.Delete(s);
            ((Timer)sender).Stop();
            ((Timer)sender).Dispose();
        }

        [HttpPost, ActionName("TimeTableXlsx")]
        public string TimeTableXlsx([FromBody] JsonObject request)
        {
            try
            {

                var dbHandler = new dbHandler();
                var param = new SqlParameter[6];
                param[0] = new SqlParameter("@AcademicYearId", request["AcademicYearId"]);
                param[1] = new SqlParameter("@ExamMonthYearId", request["ExamMonthYearId"]);
                param[2] = new SqlParameter("@StudentTypeId", request["StudentTypeId"]);
                param[3] = new SqlParameter("@ExamTypeId", request["ExamTypeId"]);
                param[4] = new SqlParameter("@SchemeId", request["SchemeId"]);
                param[5] = new SqlParameter("@DataTypeId", request["DataTypeId"]);
                
                DataSet ds = dbHandler.ReturnDataWithStoredProcedure("USP_GET_TimeTableForDownloadingPDF_ForPrincipal", param);
                if (ds.Tables[0].Rows.Count > 0)
                {
                    var Scheme = ds.Tables[0].Rows[0]["Scheme"].ToString();
                    var ExamMonthYear = ds.Tables[0].Rows[0]["ExamMonthYear"].ToString();
                    var StudentType = ds.Tables[0].Rows[0]["StudentType"].ToString();
                    string filename = Scheme +"-"+ExamMonthYear +"-"+ StudentType +"-"+ "TimeTable" + "_" + Guid.NewGuid() + ".xlsx";

                    var eh = new ExcelHelper();
                    var path = ConfigurationManager.AppSettings["DownloadsFolderPath"];
                    bool folderExists = Directory.Exists(path);
                    if (!folderExists)
                        Directory.CreateDirectory(path);
                    eh.ExportDataSet(ds, path + filename);
                    Timer timer = new Timer(200000);
                    timer.Elapsed += (sender, e) => elapse(sender, e, ConfigurationManager.AppSettings["DownloadsFolderPath"] + filename);
                    timer.Start();
                   
              
                return "/Downloads/" + filename;
                }
                else
                {
                    var response = "err";
                    return response;
                }
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpPost, ActionName("TimeTablePdfAdmin")]
        public string TimeTablePdfAdmin([FromBody] JsonObject request)
        {
            try
            {

                var dbHandler = new dbHandler();
                var param = new SqlParameter[6];
                param[0] = new SqlParameter("@AcademicYearId", request["AcademicYearId"]);
                param[1] = new SqlParameter("@ExamMonthYearId", request["ExamMonthYearId"]);
                param[2] = new SqlParameter("@StudentTypeId", request["StudentTypeId"]);
                param[3] = new SqlParameter("@ExamTypeId", request["ExamTypeId"]);
                param[4] = new SqlParameter("@SchemeId", request["SchemeId"]);
                param[5] = new SqlParameter("@DataTypeId", request["DataTypeId"]);
                DataSet ds = dbHandler.ReturnDataWithStoredProcedure("USP_GET_TimeTableForDownloadingPDF", param);
                if (ds.Tables[0].Rows.Count > 0)
                {
                    var TimeTableData = DataTableHelper.ConvertDataTable<TimeTableData>(ds?.Tables[0]);
                    var pdf = GetTimeTablesheetPdf(TimeTableData);
                    return pdf;
                }
                else
                {
                    var response = "err";
                    return response;
                }
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpPost, ActionName("TimeTableXlsxAdmin")]
        public string TimeTableXlsxAdmin([FromBody] JsonObject request)
        {
            try
            {

                var dbHandler = new dbHandler();
                var param = new SqlParameter[6];
                param[0] = new SqlParameter("@AcademicYearId", request["AcademicYearId"]);
                param[1] = new SqlParameter("@ExamMonthYearId", request["ExamMonthYearId"]);
                param[2] = new SqlParameter("@StudentTypeId", request["StudentTypeId"]);
                param[3] = new SqlParameter("@ExamTypeId", request["ExamTypeId"]);
                param[4] = new SqlParameter("@SchemeId", request["SchemeId"]);
                param[5] = new SqlParameter("@DataTypeId", request["DataTypeId"]);

                DataSet ds = dbHandler.ReturnDataWithStoredProcedure("USP_GET_TimeTableForDownloadingPDF", param);
                if (ds.Tables[0].Rows.Count > 0)
                {
                    var Scheme = ds.Tables[0].Rows[0]["Scheme"].ToString();
                    var ExamMonthYear = ds.Tables[0].Rows[0]["ExamMonthYear"].ToString();
                    var StudentType = ds.Tables[0].Rows[0]["StudentType"].ToString();
                    string filename = Scheme + "-" + ExamMonthYear + "-" + StudentType + "-" + "TimeTable" + "_" + Guid.NewGuid() + ".xlsx";

                    var eh = new ExcelHelper();
                    var path = ConfigurationManager.AppSettings["DownloadsFolderPath"];
                    bool folderExists = Directory.Exists(path);
                    if (!folderExists)
                        Directory.CreateDirectory(path);
                    eh.ExportDataSet(ds, path + filename);
                    Timer timer = new Timer(200000);
                    timer.Elapsed += (sender, e) => elapse(sender, e, ConfigurationManager.AppSettings["DownloadsFolderPath"] + filename);
                    timer.Start();


                    return "/Downloads/" + filename;
                }
                else
                {
                    var response = "err";
                    return response;
                }
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }


        [HttpPost, ActionName("TimeTableEdepXlsx")]
        public string TimeTableEdepXlsx([FromBody] JsonObject request)
        {
            try
            {

                var dbHandler = new dbHandler();
                var param = new SqlParameter[6];
                param[0] = new SqlParameter("@AcademicYearId", request["AcademicYearId"]);
                param[1] = new SqlParameter("@ExamMonthYearId", request["ExamMonthYearId"]);
                param[2] = new SqlParameter("@StudentTypeId", request["StudentTypeId"]);
                param[3] = new SqlParameter("@ExamTypeId", request["ExamTypeId"]);
                param[4] = new SqlParameter("@SchemeId", request["SchemeId"]);
                param[5] = new SqlParameter("@DataTypeId", request["DataTypeId"]);

                DataSet ds = dbHandler.ReturnDataWithStoredProcedure("USP_GET_TimeTableForDownloadingPDF", param);
                if (ds.Tables[0].Rows.Count > 0)
                {
                    var Scheme = ds.Tables[0].Rows[0]["Scheme"].ToString();
                    var ExamMonthYear = ds.Tables[0].Rows[0]["ExamMonthYear"].ToString();
                    var StudentType = ds.Tables[0].Rows[0]["StudentType"].ToString();
                    string filename = Scheme + "-" + ExamMonthYear + "-" + StudentType + "-" + "TimeTable" + "_"+"EDEP" + Guid.NewGuid() + ".xlsx";

                    var eh = new ExcelHelper();
                    var path = ConfigurationManager.AppSettings["DownloadsFolderPath"];
                    bool folderExists = Directory.Exists(path);
                    if (!folderExists)
                        Directory.CreateDirectory(path);
                    eh.ExportDataSet(ds, path + filename);
                    Timer timer = new Timer(200000);
                    timer.Elapsed += (sender, e) => elapse(sender, e, ConfigurationManager.AppSettings["DownloadsFolderPath"] + filename);
                    timer.Start();


                    return "/Downloads/" + filename;
                }
                else
                {
                    var response = "err";
                    return response;
                }
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }


        [HttpGet, ActionName("getBranchTimeTable")]
        public string getBranchTimeTable([FromBody] JsonObject request)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[7];
                param[0] = new SqlParameter("@AcademicYearId", request["AcademicYearId"]);
                param[1] = new SqlParameter("@ExamMonthYearId", request["ExamMonthYearId"]);
                param[2] = new SqlParameter("@StudentTypeId", request["StudentTypeId"]);
                param[3] = new SqlParameter("@ExamTypeId", request["ExamTypeId"]);
                param[4] = new SqlParameter("@ExamMonthYearId", request["ExamMonthYearId"]);
                param[5] = new SqlParameter("@StudentTypeId", request["StudentTypeId"]);
                param[6] = new SqlParameter("@ExamTypeId", request["ExamTypeId"]);
                DataSet ds = dbHandler.ReturnDataWithStoredProcedure("USP_GET_TimeTableSchemeBranchSemester", param);
                return JsonConvert.SerializeObject(ds);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpGet, ActionName("UpdateBranchTimeTable")]
        public string UpdateBranchTimeTable([FromBody] JsonObject request)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@DataTypeId", request["DataTypeId"]);
                param[1] = new SqlParameter("@JSON", request["JSON"]);              
                DataSet ds = dbHandler.ReturnDataWithStoredProcedure("USP_SET_UpdateOrInsertTimeTable", param);
                return JsonConvert.SerializeObject(ds);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }


        private void CreateIfMissing(string path)
        {
            bool folderExists = Directory.Exists(path);
            if (!folderExists)
                Directory.CreateDirectory(path);
        }
        public static void MergePDFs(string targetPath, params string[] pdfs)
        {
            using (PdfSharp.Pdf.PdfDocument targetDoc = new PdfSharp.Pdf.PdfDocument())
            {
                foreach (string pdf in pdfs)
                {
                    using (var pdfDoc = PdfReader.Open(pdf, PdfDocumentOpenMode.Import))
                    {
                        for (int i = 0; i < pdfDoc.PageCount; i++)
                        {
                            targetDoc.AddPage(pdfDoc.Pages[i]);
                        }
                    }
                }
                targetDoc.Save(targetPath);
            }
        }  

        public string GetTimeTablesheetPdf(List<TimeTableData> TimeTableData)
        {
            string dirPath = AppDomain.CurrentDomain.BaseDirectory + @"Reports\Timetable";
            CreateIfMissing(dirPath);
            var Scheme = TimeTableData[0].Scheme;
            var StudentType = TimeTableData[0].StudentType;
            var monthyear = TimeTableData[0].ExamMonthYear;
            var dir_id = GetTimeTableDataPdf(TimeTableData);
            var dir = AppDomain.CurrentDomain.BaseDirectory + @"Reports\Timetable\"+ dir_id ;
            var files = Directory.GetFiles(dir);
            var pdf = Guid.NewGuid().ToString();
          
            MergePDFs(AppDomain.CurrentDomain.BaseDirectory + @"Reports\"  + Scheme+"-"+ monthyear +"-"+ StudentType+"-"+"Timetable"+ ".pdf", files);
            Directory.Delete(dir, true);
            return Scheme + "-" + monthyear + "-" + StudentType + "-" + "Timetable" ;
        }



        public string GetTimeTableDataPdf(List<TimeTableData> TimeTableData)
        {
            try
            {
                var dir_id = Guid.NewGuid().ToString();

                //   +Scheme + '-' + monthyear + '-'

                var dir = AppDomain.CurrentDomain.BaseDirectory + @"Reports\Timetable\" + dir_id;
                var path = string.Empty;
                CreateIfMissing(dir);
                string html = @"<html>"
                       + "<head>"
                       + $"<title></title>"
                       + $@"<link href = '{AppDomain.CurrentDomain.BaseDirectory}\contents\css\bootstrap.min.css' rel = 'stylesheet'  type = 'text/css' />"
                       + $@"<script src= '{AppDomain.CurrentDomain.BaseDirectory}\scripts\jquery-3.3.1.min.js'></script>"
                        + @"<style type='text/css'>
                            .myHr {
                                color: #000;
                                border-bottom: 2pX solid #000;
                            } 
                            table {  
                            font-family: Helvetica, Arial, sans-serif; /* Nicer font */
                            width: 100%; 
                            border-collapse: collapse;
                            border-spacing: 0; 
                        }

                        td, th, tr { border: 1px solid #000; height: 40px;padding: 4px 8px;} /* Make cells a bit taller */

                        th {  
                            font-weight: bold; /* Make sure they're bold */
                        }

                        td {  
                            text-align: center; /* Center our text */
                        }
                        .table > thead > tr > th {
							vertical-align: middle !important;
							border-bottom: 1px solid #000000 !important;
                            border: 1px solid #000000 !important;
						}
                            .btm_line{
                            border-bottom :2px solid #000 !important;
                            }
                            .sm-spacer {
                                margin: 12px;
                            }
                           
                          
table, tr, td, th, tbody, thead,tfoot {
    page-break-inside: avoid !important;
}
                          
                        </style>"
                             + "</head><body>";

                string sbString = html;
                var page = string.Empty;
                var pgno = 1;

                var distinctScheme = TimeTableData.GroupBy(x => x.Scheme)
                                             .Select(grp => grp.First())
                                             .OrderBy(x => x.Scheme)
                                             .Distinct()
                                             .ToList();
                foreach (var disSche in distinctScheme)
                {
                    var distinctbranches = TimeTableData.GroupBy(x => x.branchid)
                                                .Select(grp => grp.First())
                                                .Where(y => y.Scheme == disSche.Scheme)
                                                .OrderBy(x => x.Branch)
                                                .Distinct()
                                                .ToList();
                    foreach (var cen in distinctbranches)
                    {
                        var brancharr = TimeTableData.Where(x => x.branchid == cen.branchid)
                                                    .GroupBy(x => x.SemesterSequence, (key, group) => group.First())
                                                     .OrderBy(x => x.SemesterSequence)
                                                    .ToArray();

                        #region PageHeader
                        page = $@" <div class='container'>
                                        <div class='row'>
                                            <div class='col-md-2 logo'  style='margin-top: 20px;margin-right: -109px; margin-left: 10px;'>
                                                <div class='logo-image' style='padding:6px!important; max-width: 95px;max-height: 95px;'>
                                                    <img src = '{AppDomain.CurrentDomain.BaseDirectory}/contents/img/sbtet-logo.png' class='img-responsive logoImg pull-right' />
                                                </div>
                                            </div>
                                            <div class='col-md-10 title' style='margin-top: 25px;'>
                                                <h5 class='text-center hall_head' style='font-size: 25px!important;'><b>STATE BOARD OF TECHNICAL EDUCATION AND TRAINING</b></h5>
                                              <h4 class='text-center hall_head' style='font-size: 25px!important;'><b>TELANGANA, HYDERABAD</b></h4>                                              
                                            </div>                                         
                                        </div>
                                </div>                             

                                <div class='row'>
                                    <div class='col-md-2'></div>
                                    <div class='col-md-8' style='font-size: 19px !important;text-align: center;color: black;font-weight: bold;text-transform: uppercase;margin-top: 10px;'>
                                   {cen.YearCourse} DIPLOMA COURSES DATE SHEET FOR WRITTEN EXAMINATION {cen.Scheme}
                                    SCHEME {cen.ExamType} EXAMINATION
                                    </div>
                                    <div class='col-md-2'></div>
                                </div>
                                <div class='row'>
                                    <div class='col-md-3'></div>
                                    <div class='col-md-6' style='font-size: 19px !important;text-align: center;color: black;font-weight: bold;text-transform: uppercase;margin-top: 10px;'>
                                   {cen.ExamMonthYear}/ {cen.StudentType} Exam
                                    </div>
                                    <div class='col-md-3'></div>
                                </div>";
                        #endregion
                        #region PageContent
                        page += $@"<div class='container'><div class='row'>
                                    <div class='col-md-3'></div>
                                    <div class='col-md-6' style='font-size: 19px !important;text-align: center;color: black;font-weight: bold;text-transform: uppercase;margin: 25px;'>{brancharr[0].BranchName}   </div>
                                    <div class='col-md-3'></div>
                                </div> </div>";
                        foreach (var bar in brancharr)
                        {
                            var tempstudentdata = new List<TimeTableData>();
                            var timetbldata = TimeTableData.Where(x => x.branchid == cen.branchid && x.semid == bar.semid)
                                                           .OrderBy(x => x.semid)
                                                           .ToArray();


                            page += $@"<div class='container'><table class='table print-friendly'>
                        <thead class='myHead'>
                            <tr >
                                <th class='text-center'style='width: 6%;'>SEMESTER</th>
                                <th class='text-center'style='width: 10%;'>DATE</th>
                                <th class='text-center'style='width: 16%;'>TIME</th>
                                <th class='text-center' style='width: 5%;'>PCODE </th>
                                <th class='text-center' style='width: 6%;'>SUBJECT CODE </th>
                                <th class='text-center' style='width: 20%;'>SUBJECT NAME</th> 
                                <th class='text-center' style='width: 5%;'>REMARKS</th>
                            </tr>
                         </thead>";
                            page += @"<tbody>";
                            //page += $@"<tr>                           
                            //              <td colspan = '4' style = 'text-align: center;font-weight: bold;font-size: 16px;'> {sem.Semester}</td>           
                            //           </tr>";

                            for (var i = 0; i < timetbldata.Length; i++)
                            {

                                page += $@"<tr>
                            <td class='text-center'>{timetbldata[i].Semester}</td>
                            <td class='text-left'>{timetbldata[i].ExamDate.ToString("dd-MM-yyyy")}</td>
                            <td class='text-left'>{timetbldata[i].ExamTime.ToString()}</td>
                            <td class='text-center'>{timetbldata[i].Pcode}</td>
                            <td class='text-center'>{timetbldata[i].SubjectCode}</td>
                            <td class='text-left'>{timetbldata[i].SubjectName}</td>
                            <td class='text-left'>{timetbldata[i].Remarks}</td>
                        </tr>";
                            }

                            page += " </tbody> </table> </div>"; ;
                        }
                        #endregion
                        var scheme = cen.Scheme;


                        sbString += page;
                        sbString += " </body></html>";

                        //converter.Options.EnableRepeatTableHeader = true;
                        var converter = new HtmlToPdf();
                        converter.Options.ExternalLinksEnabled = true;
                        converter.Options.DrawBackground = false;
                        converter.Options.JavaScriptEnabled = false;
                        //converter.Header.DisplayOnEvenPages = true;
                        //converter.Header.DisplayOnOddPages = true;
                        //converter.Header.Add = true;
                        //converter.Options.AutoFitHeight = HtmlToPdfPageFitMode;
                        converter.Options.DisplayFooter = true;

                        converter.Options.DisplayHeader = true;
                        converter.Options.WebPageWidth = 1024;
                        converter.Options.PdfPageSize = PdfPageSize.A4;
                        converter.Options.PdfPageOrientation = PdfPageOrientation.Portrait;
                        var doc = converter.ConvertHtmlString(sbString);


                        path = dir + $"\\{pgno.ToString().PadLeft(6, '0')}.pdf";
                        doc.Save(path);
                        doc.Close();
                        sbString = html;
                        pgno++;


                    }
                }
                return dir_id;
            }
            catch (Exception ex) {
                return ex.Message;
            }
        }
    }
}
