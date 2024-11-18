extern alias itextalias;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Configuration;
using System.Data.SqlClient;
using Newtonsoft.Json;
using RestSharp;
using System.Diagnostics;
using System.Web.Script.Serialization;
using System.Collections;
using System.Net.Http.Headers;
using System.Data;
using SoftwareSuite.Models.Database;
using System.IO;
using SoftwareSuite.Models;
using System.Timers;
using System.Net.Mail;
using System.Web;
using System.Threading.Tasks;
using SoftwareSuite.BLL;
//using iTextSharp.text.pdf;
using itextalias.iTextSharp.text;
using System.Drawing.Imaging;
using PdfSharp.Pdf.IO;
using PdfSharp.Pdf;
using PdfSharp.Drawing;
using PdfSharp;
using SoftwareSuite.Models.PreExamination;
using SoftwareSuite.Models.Admission;
using SoftwareSuite.Models.DCBills;
using SoftwareSuite.Controllers.Common;
using Newtonsoft.Json.Linq;
using System.Xml;
using SoftwareSuite.Models.Security;
using DocumentFormat.OpenXml.Wordprocessing;
using static System.Windows.Forms.VisualStyles.VisualStyleElement.TreeView;
using DocumentFormat.OpenXml.Bibliography;
using OfficeOpenXml.FormulaParsing.LexicalAnalysis;
using System.Drawing;
using System.Text.RegularExpressions;

namespace SoftwareSuite.Controllers.PreExamination
{
    //[Authorize(Users = "Admin")]
    //[Authorize]
    public class PreExaminationController : ApiController
    {

        public static T? GetValueOrNull<T>(string valueAsString) where T : struct
        {
            if (string.IsNullOrEmpty(valueAsString))
                return null;
            return (T)Convert.ChangeType(valueAsString, typeof(T));
        }

        public class paymentDetails
        {
            public int StudentType { get; set; }
            public int Semid { get; set; }
            public DateTime FromDate { get; set; }
            public DateTime ToDate { get; set; }
            public double Fee { get; set; }
            public DateTime FineDate { get; set; }
            public double LateFee { get; set; }
            public DateTime TatkalDate { get; set; }
            public double TatkalFee { get; set; }
            public double PremiumTatkalFee { get; set; }
            public double CondonationFee { get; set; }
            public int PresemptiveAttendedDays { get; set; }
            public int MaxWorkingDays { get; set; }
            public double CertificateFee { get; set; }
            public int SchemeId { get; set; }
            public int ExamMonthYearId { get; set; }
            public double CondonationP { get; set; }
            public double DetentionP { get; set; }
            public int IsPresemtiveCalculationRequired { get; set; }
            public int IsTimetableRequired { get; set; }
        }
        public class UploadData
        {
            public string sign { get; set; }
        }




        [HttpGet, ActionName("testqr")]
        public void testqr()
        {
            var url = string.Format("http://chart.apis.google.com/chart?cht=qr&chs={1}x{2}&chl={0}", "dsa", "152", "152");
            WebResponse response = default(WebResponse);
            Stream remoteStream = default(Stream);
            StreamReader readStream = default(StreamReader);
            WebRequest request = WebRequest.Create(url);
            response = request.GetResponse();
            remoteStream = response.GetResponseStream();
            readStream = new StreamReader(remoteStream);
            System.Drawing.Image img = System.Drawing.Image.FromStream(remoteStream);

            System.Drawing.Bitmap bImage = (System.Drawing.Bitmap)img; // Your Bitmap Image
            System.IO.MemoryStream ms = new MemoryStream();
            bImage.Save(ms, System.Drawing.Imaging.ImageFormat.Jpeg);
            byte[] byteImage = ms.ToArray();
            var SigBase64 = Convert.ToBase64String(byteImage);
        }
        private string GetWebAppRoot()
        {
            var env = ConfigurationManager.AppSettings["SMS_ENV"].ToString();
            string host = (HttpContext.Current.Request.Url.IsDefaultPort) ?
               HttpContext.Current.Request.Url.Host :
               HttpContext.Current.Request.Url.Authority;
            if (env == "PROD")
            {
                host = String.Format("{0}://{1}", HttpContext.Current.Request.Url.Scheme, host);
                return host + "/";
            }
            else if (env == "DEV")
            {

                host = String.Format("{0}://{1}", HttpContext.Current.Request.Url.Scheme, host);
                return host + HttpContext.Current.Request.ApplicationPath;
            }
            return host + "/";
        }


        [HttpGet, ActionName("GetNrData")]
        public HttpResponseMessage GetNrData(HttpRequestMessage request)    //int ExamMonthYearId, int StudentTypeId, string CollegeCode, string ExamDate, int ExamTypeId)
        {

            try
            {
                var apikey = request.Headers.GetValues("apiKey").FirstOrDefault();
                var apikeyOrig = ConfigurationManager.AppSettings["osdesFacultyDataSharingApiKey"].ToString();
                if (apikey != apikeyOrig)
                {
                    var response = Request.CreateResponse(HttpStatusCode.Forbidden);
                    response.Content = new StringContent(JsonConvert.SerializeObject("{\"respcode\":\"403\",\"respdesc\" = \"Invalid Api Key\"\" }"), System.Text.Encoding.UTF8, "application/json");

                    return response;
                }
            }
            catch (Exception)
            {
                var response = Request.CreateResponse(HttpStatusCode.Forbidden);
                response.Content = new StringContent(JsonConvert.SerializeObject("{\"respcode\":\"403\",\"respdesc\" = \"Invalid Api Key\"\" }"), System.Text.Encoding.UTF8, "application/json");
                return response;
            }

            try
            {

                IDictionary<string, string> queryParams = request.GetQueryNameValuePairs().ToDictionary(x => x.Key, x => x.Value);
                var dbHandler = new dbHandler();
                var param = new SqlParameter[5];
                param[0] = new SqlParameter("@ExamMonthYearId", Convert.ToInt32(queryParams["ExamMonthYearId"]));
                param[1] = new SqlParameter("@StudentTypeId", Convert.ToInt32(queryParams["StudentTypeId"]));
                param[2] = new SqlParameter("@CollegeCode", queryParams["CollegeCode"]);
                param[3] = new SqlParameter("@ExamDate", queryParams["ExamDate"]);
                param[4] = new SqlParameter("@ExamType", Convert.ToInt32(queryParams["ExamTypeId"]));
                DataSet ds = dbHandler.ReturnDataWithStoredProcedure("USP_SFP_GET_NR_BAC_Test", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, ds);
                return response;
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_SFP_GET_NR_BAC_Test", 0, ex.Message);
                var retMsg = "{\"status\":\"400\",\"statusdesc\": \"" + ex.Message + "\"}";
                return Request.CreateResponse(HttpStatusCode.OK, retMsg);
            }
        }

        private void CreateIfMissing(string path)
        {
            bool folderExists = Directory.Exists(path);
            if (!folderExists)
                Directory.CreateDirectory(path);
        }

        [HttpGet, ActionName("GetExpenditure")]
        public HttpResponseMessage GetExpenditure(int ExamMonthYearId)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@ExamMonthYearId", ExamMonthYearId);
                DataSet DS = dbHandler.ReturnDataWithStoredProcedure("USP_GET_DCBillsExamcharges", param);

                List<ExamSessionalExpenditureCharges> ExamSessionalExpenditureCharges = DS.Tables[0].DataTableToList<ExamSessionalExpenditureCharges>();
                List<ExamEventExpenditureCharges> ExamEventExpenditureCharges = DS.Tables[0].DataTableToList<ExamEventExpenditureCharges>();
                ExamExpenditureCharges ExamExpenditureCharges = new ExamExpenditureCharges()
                {
                    ExamSessionalExpenditureCharges = ExamSessionalExpenditureCharges,
                    ExamEventExpenditureCharges = ExamEventExpenditureCharges
                };
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, ExamExpenditureCharges);
                return response;
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_GET_DCBillsExamcharges", 0, ex.Message);
                var retMsg = "{\"status\":\"400\",\"statusdesc\": \"" + ex.Message + "\"}";
                return Request.CreateResponse(HttpStatusCode.OK, retMsg);
            }

        }


        [HttpGet, ActionName("getActiveExamTypesByScheme")]
        public string getActiveExamTypesByScheme(string scheme)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@scheme", scheme);
                var dt = dbHandler.ReturnDataWithStoredProcedure("ADM_GET_0_1_GetExamTypeBySchemes", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("ADM_GET_0_1_GetExamTypeBySchemes", 0, ex.Message);
                return ex.Message;
            }
        }


        [HttpGet, ActionName("getBranchsByCollegeCode")]
        public string getBranchsByCollegeCode(string CollegeCode)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@CollegeCode", CollegeCode);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SFP_GET_BranchsByCollege", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_SFP_GET_BranchsByCollege", 0, ex.Message);
                return ex.Message;
            }
        }

        [HttpGet, ActionName("FindchalanaNo")]
        public HttpResponseMessage FindchalanaNo(string chalanaNo)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@subscriberid", chalanaNo);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SFP_GET_S2SReceipt", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;

            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_SFP_GET_S2SReceipt", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpGet, ActionName("GetStudentServicesCounts")]
        public HttpResponseMessage GetStudentServicesCounts()
        {
            try
            {
                var dbHandler = new dbHandler();
                string StrQuery = "";
                StrQuery = "exec SBP_SS_StudentServicesCounts";
                return Request.CreateResponse(HttpStatusCode.OK, dbHandler.ReturnDataSet(StrQuery));
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("SBP_SS_StudentServicesCounts", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpGet, ActionName("getWebsiteFeedbackReport")]
        public HttpResponseMessage getWebsiteFeedbackReport()
        {
            try
            {
                var dbHandler = new dbHandler();
                string StrQuery = "";
                StrQuery = "exec ADM_GET_WebsiteFeedback";
                return Request.CreateResponse(HttpStatusCode.OK, dbHandler.ReturnDataSet(StrQuery));
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("ADM_GET_WebsiteFeedback", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }



        [HttpGet, ActionName("ResetCertificateStatus")]
        public string ResetCertificateStatus(int CertificateTypeId, string Pin, string certifictepath)
        {
            try
            {
                if (certifictepath != "" && certifictepath != null)
                {
                    var deldir = AppDomain.CurrentDomain.BaseDirectory + @"Reports\SignedCert\";
                    var content = certifictepath.Replace("http://", "").Replace("https://", "");
                    string[] arrRes = content.Split('/');
                    int index = content.LastIndexOf("/");
                    string filepath = content.Substring(index + 1);
                    var filedelpath = deldir + filepath + ".pdf";
                    if (File.Exists(filedelpath))
                    {
                        File.Delete(filedelpath);
                    }
                }
                var dbHandler = new dbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@CertificateTypeId", CertificateTypeId);
                param[1] = new SqlParameter("@Pin", Pin);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("USP_SET_ResetCertificateStatus", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_SET_ResetCertificateStatus", 0, ex.Message);
                return ex.Message;
            }
        }


        [HttpGet, ActionName("ResetNameCorrectionToDs")]
        public string ResetNameCorrectionToDs(string Pin)
        {
            try
            {

                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@Pin", Pin);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("USP_SET_ResetNameCorrectionToDs", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_SET_ResetNameCorrectionToDs", 0, ex.Message);
                return ex.Message;
            }
        }

        [HttpGet, ActionName("ReleaseMarksEntry")]
        public string ReleaseMarksEntry(string CollegeCode, int SemId, int SchemeId, int ExamTypeId, int AcademicYearId, int subid, int ExamMonthYearId, string UserName, int UserTypeId)

        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[9];
                param[0] = new SqlParameter("@CollegeCode", CollegeCode);
                param[1] = new SqlParameter("@SemId", SemId);
                param[2] = new SqlParameter("@SchemeId", SchemeId);
                param[3] = new SqlParameter("@ExamTypeId", ExamTypeId);
                param[4] = new SqlParameter("@AcademicYearId", AcademicYearId);
                param[5] = new SqlParameter("@subid", subid);
                param[6] = new SqlParameter("@ExamMonthYearId", ExamMonthYearId);
                param[7] = new SqlParameter("@UserName", UserName);
                param[8] = new SqlParameter("@UserTypeId", UserTypeId);
                var dt = dbHandler.ReturnDataWithStoredProcedure("SBP_ADM_ReleaseMarksEntry", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("SBP_ADM_ReleaseMarksEntry", 0, ex.Message);
                return ex.Message;
            }
        }



        [HttpGet, ActionName("GetChallanNumbers")]
        public string GetChallanNumbers(int PaymentTypeID, int PaymentSubTypeID, string PIN, int ExamMonthYearID = 0)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[4];
                param[0] = new SqlParameter("@PaymentTypeID", PaymentTypeID);
                param[1] = new SqlParameter("@PaymentSubTypeID", PaymentSubTypeID);
                param[2] = new SqlParameter("@PIN", PIN);
                param[3] = new SqlParameter("@ExamMonthYearID", ExamMonthYearID);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SFP_GET_DownloadChalanNumber", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_SFP_GET_DownloadChalanNumber", 0, ex.Message);
                return ex.Message;
            }
        }


        [HttpGet, ActionName("GetAsssessmentConsolidatedReport")]
        public string GetAsssessmentConsolidatedReport(int AcademicyearId, int ExamMonthYearId, string collegecode, int branchId, int schemeid, int semid, int ExamType)
        {
            List<person> p = new List<person>();
            person p1 = new person();
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[7];
                param[0] = new SqlParameter("@AcademicyearId", AcademicyearId);
                param[1] = new SqlParameter("@ExamMonthYearId", ExamMonthYearId);
                param[2] = new SqlParameter("@collegecode", collegecode);
                param[3] = new SqlParameter("@branchId", branchId);
                param[4] = new SqlParameter("@schemeid", schemeid);
                param[5] = new SqlParameter("@semid", semid);
                param[6] = new SqlParameter("@ExamType", ExamType);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_GET_AssessmentConsolidatedReports", param);
                if (dt.Tables[0].Rows.Count > 0)
                {

                    //var Date = DateTime.Now.ToString("dd-MM-yyyy_hh:mm:ss");
                    var filename = "Assessment_Consolidated_Report" + ".xlsx";
                    var eh = new ExcelHelper();
                    var path = ConfigurationManager.AppSettings["DownloadsFolderPath"];
                    bool folderExists = Directory.Exists(path);
                    if (!folderExists)
                        Directory.CreateDirectory(path);
                    eh.ExportDataSet(dt, path + filename);
                    Timer timer = new Timer(200000);
                    timer.Elapsed += (sender, e) => elapse(sender, e, ConfigurationManager.AppSettings["DownloadsFolderPath"] + filename);
                    timer.Start();
                    var file = "/Downloads/" + filename;
                    p1.file = file;
                    p1.ResponceCode = "200";
                    p1.ResponceDescription = "";
                    p.Add(p1);

                    return JsonConvert.SerializeObject(p);
                    //return ;

                }
                else
                {

                    p1.file = "";
                    p1.ResponceCode = dt.Tables[0].Rows[0]["ResponceCode"].ToString();
                    p1.ResponceDescription = dt.Tables[0].Rows[0]["ResponceDescription"].ToString();
                    p.Add(p1);
                    return JsonConvert.SerializeObject(p);
                }

            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_GET_AssessmentConsolidatedReports", 0, ex.Message);
                p1.file = "";
                p1.ResponceCode = "404";
                p1.ResponceDescription = "Data not found.";
                p.Add(p1);

                return JsonConvert.SerializeObject(p);
            }
        }




        [HttpGet, ActionName("GenerateC18MemosData")]
        public string GenerateC18MemosData(int ExamMonthYearId, int MinCredits, string Day, string Month, string Year)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[5];
                param[0] = new SqlParameter("@ExamMonthYearId", ExamMonthYearId);
                param[1] = new SqlParameter("@MinCredits", MinCredits);
                param[2] = new SqlParameter("@Day", Day);
                param[3] = new SqlParameter("@Month", Month);
                param[4] = new SqlParameter("@Year", Year);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SET_GenerateC18ConsolidatedMemo", param);
                if (dt.Tables[0].Rows[0]["ResponceCode"].ToString() == "200")
                {

                    //var Date = DateTime.Now.ToString("dd-MM-yyyy_hh:mm:ss");
                    var filename = "C18_Consolidated_Memo" + ".xlsx";
                    var eh = new ExcelHelper();
                    var path = ConfigurationManager.AppSettings["DownloadsFolderPath"];
                    bool folderExists = Directory.Exists(path);
                    if (!folderExists)
                        Directory.CreateDirectory(path);
                    eh.ExportDataSet(dt, path + filename);
                    Timer timer = new Timer(200000);
                    timer.Elapsed += (sender, e) => elapse(sender, e, ConfigurationManager.AppSettings["DownloadsFolderPath"] + filename);
                    timer.Start();
                    var file = "/Downloads/" + filename;
                    List<person> p = new List<person>();
                    person p1 = new person();
                    p1.file = file;
                    p1.ResponceCode = dt.Tables[0].Rows[0]["ResponceCode"].ToString();
                    p1.ResponceDescription = dt.Tables[0].Rows[0]["ResponceDescription"].ToString();
                    p.Add(p1);

                    return JsonConvert.SerializeObject(p);
                    //return ;

                }
                else
                {
                    List<person> p = new List<person>();
                    person p1 = new person();
                    p1.file = "";
                    p1.ResponceCode = dt.Tables[0].Rows[0]["ResponceCode"].ToString();
                    p1.ResponceDescription = dt.Tables[0].Rows[0]["ResponceDescription"].ToString();
                    p.Add(p1);
                    return JsonConvert.SerializeObject(p);
                }
                //return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_SET_GenerateC18ConsolidatedMemo", 0, ex.Message);
                return ex.Message;
            }
        }

        [HttpGet, ActionName("GetTwoYearsOdcData")]
        public string GetTwoYearsOdcData(string FromDate, string todate)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@FromDate", FromDate);
                param[1] = new SqlParameter("@todate", todate);
                var dt = dbHandler.ReturnDataWithStoredProcedure("SPB_GET_2YearCertificateODCData", param);
                if (dt.Tables[0].Rows[0]["ResponceCode"].ToString() == "200")
                {

                    //var Date = DateTime.Now.ToString("dd-MM-yyyy_hh:mm:ss");
                    var filename = "Two_Years_ODC_Data" + ".xlsx";
                    var eh = new ExcelHelper();
                    var path = ConfigurationManager.AppSettings["DownloadsFolderPath"];
                    bool folderExists = Directory.Exists(path);
                    if (!folderExists)
                        Directory.CreateDirectory(path);
                    eh.ExportDataSet(dt, path + filename);
                    Timer timer = new Timer(200000);
                    timer.Elapsed += (sender, e) => elapse(sender, e, ConfigurationManager.AppSettings["DownloadsFolderPath"] + filename);
                    timer.Start();
                    var file = "/Downloads/" + filename;
                    List<person> p = new List<person>();
                    person p1 = new person();
                    p1.file = file;
                    p1.ResponceCode = dt.Tables[0].Rows[0]["ResponceCode"].ToString();
                    p1.ResponceDescription = dt.Tables[0].Rows[0]["ResponceDescription"].ToString();
                    p.Add(p1);

                    return JsonConvert.SerializeObject(p);
                    //return ;

                }
                else
                {
                    List<person> p = new List<person>();
                    person p1 = new person();
                    p1.file = "";
                    p1.ResponceCode = dt.Tables[0].Rows[0]["ResponceCode"].ToString();
                    p1.ResponceDescription = dt.Tables[0].Rows[0]["ResponceDescription"].ToString();
                    p.Add(p1);
                    return JsonConvert.SerializeObject(p);
                }
                //return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("SPB_GET_2YearCertificateODCData", 0, ex.Message);
                return ex.Message;
            }
        }


        [HttpGet, ActionName("SetSemTransfer")]
        public string SetSemTransfer(int AcademicYearId, string SemId)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@AcademicYearId", AcademicYearId);
                param[1] = new SqlParameter("@SemId", SemId);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SET_PromotionOfStudentsFromSemToSemAsSelected", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_SET_PromotionOfStudentsFromSemToSemAsSelected", 0, ex.Message);
                return ex.Message;
            }
        }

        [HttpGet, ActionName("GetTotalCollegeWiseCharges")]
        public string GetTotalCollegeWiseCharges(string ExamMonthYearId, int AcademicID, int StudentTypeId)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@ExamMonthYearId", ExamMonthYearId);
                param[1] = new SqlParameter("@AcademicID", AcademicID);
                param[2] = new SqlParameter("@StudentTypeId", StudentTypeId);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_GET_NrCollegeWiseCountReports_New", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_GET_NrCollegeWiseCountReports_New", 0, ex.Message);
                return ex.Message;
            }
        }

        [HttpGet, ActionName("GetTotalDayWiseCharges")]
        public string GetTotalDayWiseCharges(string ExamMonthYearId, int AcademicID, int StudentTypeId)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@ExamMonthYearId", ExamMonthYearId);
                param[1] = new SqlParameter("@AcademicID", AcademicID);
                param[2] = new SqlParameter("@StudentTypeId", StudentTypeId);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_GET_NrDayWiseCountReports_New", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_GET_NrDayWiseCountReports_New", 0, ex.Message);
                return ex.Message;
            }
        }

        [HttpGet, ActionName("GetTotalEventWiseCharges")]
        public string GetTotalEventWiseCharges(string ExamMonthYearId, int AcademicID, int StudentTypeId)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@ExamMonthYearId", ExamMonthYearId);
                param[1] = new SqlParameter("@AcademicID", AcademicID);
                param[2] = new SqlParameter("@StudentTypeId", StudentTypeId);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_GET_NrCollegeEventWiseReports", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_GET_NrCollegeEventWiseReports", 0, ex.Message);
                return ex.Message;
            }
        }

        [HttpGet, ActionName("GetDcBillsAbstract")]
        public string GetDcBillsAbstract(string ExamMonthYearId, int AcademicID, int StudentTypeId)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@ExamMonthYearId", ExamMonthYearId);
                param[1] = new SqlParameter("@AcademicID", AcademicID);
                param[2] = new SqlParameter("@StudentTypeId", StudentTypeId);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_GET_DcBillsAbstract", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_GET_NrCollegeEventWiseReports", 0, ex.Message);
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

        [HttpGet, ActionName("ReleaseBonafidePin")]
        public string ReleaseBonafidePin(string Pin)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@Pin", Pin);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("USP_SET_ReleaseBonafidePin", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_SET_ReleaseBonafidePin", 0, ex.Message);
                return ex.Message;
            }
        }


        [HttpGet, ActionName("ReleaseStudyPin")]
        public string ReleaseStudyPin(string Pin)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@Pin", Pin);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("USP_SET_ReleaseStudyPin", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_SET_ReleaseStudyPin", 0, ex.Message);
                return ex.Message;
            }
        }





        [HttpGet, ActionName("GenerateOdcDataByPin")]
        public string GenerateOdcDataByPin(string pin)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@pin", pin);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_GET_GenerateOdcByPin", param);
                if (dt.Tables[0].Rows[0]["ResponceCode"].ToString() == "200")
                {

                    var filename = pin + '_' + "ODC_Data" + ".xlsx";
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
                    p1.ResponceCode = dt.Tables[0].Rows[0]["ResponceCode"].ToString();
                    p1.ResponceDescription = dt.Tables[0].Rows[0]["ResponceDescription"].ToString();
                    p.Add(p1);

                    return JsonConvert.SerializeObject(p);
                    //return ;

                }
                else
                {
                    List<person> p = new List<person>();
                    person p1 = new person();
                    p1.file = "";
                    p1.ResponceCode = dt.Tables[0].Rows[0]["ResponceCode"].ToString();
                    p1.ResponceDescription = dt.Tables[0].Rows[0]["ResponceDescription"].ToString();
                    p.Add(p1);
                    return JsonConvert.SerializeObject(p);
                }
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_GET_GenerateOdcByPin", 0, ex.Message);
                return ex.Message;
            }
        }

        [HttpGet, ActionName("GetMigrationDetails")]
        public string GetMigrationDetails(int AcademicYearId)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@AcademicYearId", AcademicYearId);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_GET_PromotionalRulesForSemToSem", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_GET_PromotionalRulesForSemToSem", 0, ex.Message);
                return ex.Message;
            }
        }



        [HttpGet, ActionName("GetDaywisePcodeReport")]
        public string GetDaywisePcodeReport(int AcademicYearId, int ExamMonthYearId, int StudentTypeId, int Schemeid, int ExamTypeId)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[5];
                param[0] = new SqlParameter("@AcademicYearId", AcademicYearId);
                param[1] = new SqlParameter("@ExamMonthYearId", ExamMonthYearId);
                param[2] = new SqlParameter("@StudentTypeId", StudentTypeId);
                param[3] = new SqlParameter("@Schemeid", Schemeid);
                param[4] = new SqlParameter("@ExamTypeId", ExamTypeId);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("USP_GET_DaywisePcodeReport", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_GET_DaywisePcodeReport", 0, ex.Message);
                return ex.Message;
            }
        }

        public string GetDaywisePcodeExcel(int AcademicYearId, int ExamMonthYearId, int StudentTypeId, int Schemeid, int ExamTypeId)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[5];
                param[0] = new SqlParameter("@AcademicYearId", AcademicYearId);
                param[1] = new SqlParameter("@ExamMonthYearId", ExamMonthYearId);
                param[2] = new SqlParameter("@StudentTypeId", StudentTypeId);
                param[3] = new SqlParameter("@Schemeid", Schemeid);
                param[4] = new SqlParameter("@ExamTypeId", ExamTypeId);
                DataSet ds = dbHandler.ReturnDataWithStoredProcedure("USP_GET_DaywisePcodeReport", param);
                if (ds.Tables[0].Rows.Count > 0)
                {

                    var filename = "Daywise_Pcode_Report" + ".xlsx";
                    var eh = new ExcelHelper();
                    var path = ConfigurationManager.AppSettings["DownloadsFolderPath"];
                    bool folderExists = Directory.Exists(path);
                    if (!folderExists)
                        Directory.CreateDirectory(path);
                    eh.ExportDataSet(ds, path + filename);
                    Timer timer = new Timer(200000);
                    timer.Elapsed += (sender, e) => elapse(sender, e, ConfigurationManager.AppSettings["DownloadsFolderPath"] + filename);
                    timer.Start();
                    var file = "/Downloads/" + filename;

                    List<person> p = new List<person>();
                    person p1 = new person();
                    p1.file = file;
                    //p1.ResponceCode = ds.Tables[0].Rows[0]["ResponceCode"].ToString();
                    //p1.ResponceDescription = ds.Tables[0].Rows[0]["ResponceDescription"].ToString();
                    p.Add(p1);

                    return JsonConvert.SerializeObject(p);


                }
                else
                {
                    List<person> p = new List<person>();
                    person p1 = new person();
                    p1.file = "";
                    //p1.ResponceCode = ds.Tables[0].Rows[0]["ResponceCode"].ToString();
                    //p1.ResponceDescription = ds.Tables[0].Rows[0]["ResponceDescription"].ToString();
                    p.Add(p1);
                    return JsonConvert.SerializeObject(p);

                }
                //
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_GET_DaywisePcodeReport", 0, ex.Message);
                //return ex.Message;
                List<person> p = new List<person>();
                person p1 = new person();
                p1.file = "";

                p1.ResponceCode = "400";
                p1.ResponceDescription = ex.Message;
                p.Add(p1);
                return JsonConvert.SerializeObject(p);
            }

        }



        [HttpGet, ActionName("ReleaseTcPin")]
        public string ReleaseTcPin(string Pin)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@Pin", Pin);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("USP_SET_ReleaseTcPin", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_SET_ReleaseTcPin", 0, ex.Message);
                return ex.Message;
            }
        }




        [HttpGet, ActionName("ResetTwshCertificateStatus")]
        public string ResetTwshCertificateStatus(string RegistrationNo, string certifictepath)
        {
            try
            {
                if (certifictepath != "" && certifictepath != null)
                {
                    var deldir = AppDomain.CurrentDomain.BaseDirectory + @"Reports\SignedCert\";
                    var content = certifictepath.Replace("http://", "").Replace("https://", "");
                    string[] arrRes = content.Split('/');
                    int index = content.LastIndexOf("/");
                    string filepath = content.Substring(index + 1);
                    var filedelpath = deldir + filepath + ".pdf";
                    if (File.Exists(filedelpath))
                    {
                        File.Delete(filedelpath);
                    }
                }
                var dbHandler = new Twshdbandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@RegistrationNo", RegistrationNo);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("USP_SET_ResetTwshCertificateStatus", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_SET_ResetCertificateStatus", 0, ex.Message);
                return ex.Message;
            }
        }

        [HttpGet, ActionName("SetScheme")]
        public string SetScheme(int datatypeid, string scheme, int sequenceid, string username)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[4];
                param[0] = new SqlParameter("@datatypeid", datatypeid);
                param[1] = new SqlParameter("@scheme", scheme);
                param[2] = new SqlParameter("@sequenceid", sequenceid);
                param[3] = new SqlParameter("@username", username);

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("ADM_SET_CreateOrUpdateSchemes", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("ADM_SET_CreateOrUpdateSchemes", 0, ex.Message);
                return ex.Message;
            }

        }


        [HttpGet, ActionName("SetEventExpenditure")]
        public string SetEventExpenditure(int AoNotification, string Superintendent, int SeatingArrangement, int ExamMonthYearId)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[4];
                param[0] = new SqlParameter("@AoNotification ", AoNotification);
                param[1] = new SqlParameter("@Superintendent", Superintendent);
                param[2] = new SqlParameter("@SeatingArrangement", SeatingArrangement);
                param[3] = new SqlParameter("@ExamMonthYearId", ExamMonthYearId);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("USP_SFP_SET_EventExpenditure", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_SFP_SET_EventExpenditure", 0, ex.Message);
                return ex.Message;
            }

        }


        [HttpPost, ActionName("SetSessionalExpenditure")]
        public HttpResponseMessage SetSessionalExpenditure([FromBody] ExamExpenditureCharges Examcharge)

        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[29];
                param[0] = new SqlParameter("@Invigilatorcharges", Examcharge.ExamSessionalExpenditureCharges[0].Invigilatorcharges);
                param[1] = new SqlParameter("@NumberOfStudentsPerInvigilator", Examcharge.ExamSessionalExpenditureCharges[0].NumberOfStudentsPerInvigilator);
                param[2] = new SqlParameter("@ChiefSuperintendent", Examcharge.ExamSessionalExpenditureCharges[0].ChiefSuperintendent);
                param[3] = new SqlParameter("@JointChiefSuperintendent", Examcharge.ExamSessionalExpenditureCharges[0].JointChiefSuperintendent);
                param[4] = new SqlParameter("@PoliceBandobasth", Examcharge.ExamSessionalExpenditureCharges[0].PoliceBandobasth);
                param[5] = new SqlParameter("@NoOfPoliceForBandobasthPerSession", Examcharge.ExamSessionalExpenditureCharges[0].NoOfPoliceForBandobasthPerSession);
                param[6] = new SqlParameter("@SeatingChargesPerStudent ", Examcharge.ExamSessionalExpenditureCharges[0].SeatingChargesPerStudent);
                param[7] = new SqlParameter("@NumberOfStudentsPerAttenderCumWatermanCumSweeper", Examcharge.ExamSessionalExpenditureCharges[0].NumberOfStudentsPerAttenderCumWatermanCumSweeper);
                param[8] = new SqlParameter("@TheoryAttenderCumWatermanCumSweeperChargesPerSubject", Examcharge.ExamSessionalExpenditureCharges[0].TheoryAttenderCumWatermanCumSweeperChargesPerSubject);
                param[9] = new SqlParameter("@ExaminationClerk_TypingCharges", Examcharge.ExamSessionalExpenditureCharges[0].ExaminationClerk_TypingCharges);
                param[10] = new SqlParameter("@PrintingChargePerQuestionPaper", Examcharge.ExamSessionalExpenditureCharges[0].PrintingChargePerQuestionPaper);
                param[11] = new SqlParameter("@DeliveryChargesPerDay", Examcharge.ExamSessionalExpenditureCharges[0].DeliveryChargesPerDay);
                param[12] = new SqlParameter("@InternalFlyingSquadCharges", Examcharge.ExamSessionalExpenditureCharges[0].InternalFlyingSquadCharges);
                param[13] = new SqlParameter("@EDEPChargesPerSession", Examcharge.ExamSessionalExpenditureCharges[0].EDEPChargesPerSession);
                param[14] = new SqlParameter("@ControlRoomChargePerPerson", Examcharge.ExamSessionalExpenditureCharges[0].ControlRoomChargePerPerson);
                param[15] = new SqlParameter("@PracticalExternalPaperSettingCharges", Examcharge.ExamSessionalExpenditureCharges[0].PracticalExternalPaperSettingCharges);
                param[16] = new SqlParameter("@PracticalInternalPaperSettingCharges", Examcharge.ExamSessionalExpenditureCharges[0].PracticalInternalPaperSettingCharges);
                param[17] = new SqlParameter("@PracticalLocalConveyanceChargesPerDay", Examcharge.ExamSessionalExpenditureCharges[0].PracticalLocalConveyanceChargesPerDay);
                param[18] = new SqlParameter("@PracticalTechnicalAssistantCharges", Examcharge.ExamSessionalExpenditureCharges[0].PracticalTechnicalAssistantCharges);
                param[19] = new SqlParameter("@PracticalWatermanCumSweeperChargesPerSubject", Examcharge.ExamSessionalExpenditureCharges[0].PracticalWatermanCumSweeperChargesPerSubject);
                param[20] = new SqlParameter("@NoOfStudentsPerPracticalSession", Examcharge.ExamSessionalExpenditureCharges[0].NoOfStudentsPerPracticalSession);
                param[21] = new SqlParameter("@PracticalPaperValuationChargesPerPaper", Examcharge.ExamSessionalExpenditureCharges[0].PracticalPaperValuationChargesPerPaper);
                param[22] = new SqlParameter("@NoOfStudentsPerExaminer", Examcharge.ExamSessionalExpenditureCharges[0].NoOfStudentsPerExaminer);
                param[23] = new SqlParameter("@PracticalAttenderChargesPerSubject", Examcharge.ExamSessionalExpenditureCharges[0].PracticalAttenderChargesPerSubject);
                param[24] = new SqlParameter("@AoNotification", Examcharge.ExamEventExpenditureCharges[0].AoNotification);
                param[25] = new SqlParameter("@Superintendent", Examcharge.ExamEventExpenditureCharges[0].Superintendent);
                param[26] = new SqlParameter("@SeatclerkCharges", Examcharge.ExamEventExpenditureCharges[0].SeatclerkCharges);
                param[27] = new SqlParameter("@ExamMonthYearId", Examcharge.ExamSessionalExpenditureCharges[0].ExamMonthYearId);
                param[28] = new SqlParameter("@PracticalVivaChargesforSixthSem", Examcharge.ExamSessionalExpenditureCharges[0].PracticalVivaChargesforSixthSem);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("USP_SFP_SET_SessionalExpenditure", param);
                return Request.CreateResponse(HttpStatusCode.OK, dt);

            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_SFP_SET_SessionalExpenditure", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }

        }

        [HttpGet, ActionName("ResultsProcessing")]
        public string ResultsProcessing(int ExamMonthYearId, int StudentTypeId, string scheme, string SemIdJson, int ExamTypeId, int academicyearid, string username)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[7];
                param[0] = new SqlParameter("@ExamMonthYearId", ExamMonthYearId);
                param[1] = new SqlParameter("@StudentTypeId", StudentTypeId);
                param[2] = new SqlParameter("@scheme", scheme);
                param[3] = new SqlParameter("@SemIdJson", SemIdJson);
                param[4] = new SqlParameter("@ExamTypeId", ExamTypeId);
                param[5] = new SqlParameter("@academicyearid", academicyearid);
                param[6] = new SqlParameter("@username", username);
                var dt = dbHandler.ReturnDataWithStoredProcedure("ADM_SET_4_1_ResultsProcessing", param);
                if (dt.Tables[0].Rows[0]["ResponceCode"].ToString() == "200")
                {
                    var ExamMonthYear = dt.Tables[1].Rows[0]["ExamMonthYear"].ToString();
                    var filename = ExamMonthYear + '_' + scheme + '_' + "Results" + ".xlsx";
                    var eh = new ExcelHelper();
                    var path = ConfigurationManager.AppSettings["DownloadsFolderPath"];
                    bool folderExists = Directory.Exists(path);
                    if (!folderExists)
                        Directory.CreateDirectory(path);
                    eh.ExportDataSet(dt, path + filename);
                    Timer timer = new Timer(200000000);//600000
                    timer.Elapsed += (sender, e) => elapse(sender, e, ConfigurationManager.AppSettings["DownloadsFolderPath"] + filename);
                    timer.Start();
                    var file = "/Downloads/" + filename;
                    List<person> p = new List<person>();
                    person p1 = new person();
                    p1.file = file;
                    p1.ResponceCode = dt.Tables[0].Rows[0]["ResponceCode"].ToString();
                    p1.ResponceDescription = dt.Tables[0].Rows[0]["ResponceDescription"].ToString();
                    p.Add(p1);
                    return JsonConvert.SerializeObject(p);
                    //return ;

                }
                else
                {
                    List<person> p = new List<person>();
                    person p1 = new person();
                    p1.file = "";
                    p1.ResponceCode = dt.Tables[0].Rows[0]["ResponceCode"].ToString();
                    p1.ResponceDescription = dt.Tables[0].Rows[0]["ResponceDescription"].ToString();
                    p.Add(p1);
                    return JsonConvert.SerializeObject(p);
                }
                //
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("ADM_SET_4_1_ResultsProcessing ", 0, ex.Message);
                return ex.Message;
            }

        }

        [HttpGet, ActionName("RVRCResultsProcessing")]
        public string RVRCResultsProcessing(int ExamMonthYearId, int StudentTypeId, string scheme, string username, int ExamTypeId = 0)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[5];
                param[0] = new SqlParameter("@ExamMonthYearId", ExamMonthYearId);
                param[1] = new SqlParameter("@StudentTypeId", StudentTypeId);
                param[2] = new SqlParameter("@scheme", scheme);
                param[3] = new SqlParameter("@username", username);
                param[4] = new SqlParameter("@ExamTypeId", ExamTypeId);
                var dt = dbHandler.ReturnDataWithStoredProcedure("ADM_SET_7_2_RVRCResultsProcessinForTheMarksUploaded", param);
                var ExamMonthYear = string.Empty;
                if (dt.Tables[0].Rows[0]["ResponceCode"].ToString() == "200")
                {
                    if (dt.Tables[1].Rows.Count > 0)
                    {
                        ExamMonthYear = dt.Tables[1].Rows[0]["ExamMonthYear"].ToString().Replace("/", "_");
                    }
                    else
                    {
                        ExamMonthYear = "";
                    }

                    var filename = ExamMonthYear + '_' + scheme + '_' + "RVRC_Results" + ".xlsx";
                    var eh = new ExcelHelper();
                    var path = ConfigurationManager.AppSettings["DownloadsFolderPath"];
                    bool folderExists = Directory.Exists(path);
                    if (!folderExists)
                        Directory.CreateDirectory(path);
                    eh.ExportDataSet(dt, path + filename);
                    Timer timer = new Timer(200000);
                    timer.Elapsed += (sender, e) => elapse(sender, e, ConfigurationManager.AppSettings["DownloadsFolderPath"] + filename);
                    timer.Start();
                    var file = "/Downloads/" + filename;
                    List<person> p = new List<person>();
                    person p1 = new person();
                    p1.file = file;
                    p1.ResponceCode = dt.Tables[0].Rows[0]["ResponceCode"].ToString();
                    p1.ResponceDescription = dt.Tables[0].Rows[0]["ResponceDescription"].ToString();
                    p.Add(p1);

                    return JsonConvert.SerializeObject(p);
                    //return ;

                }
                else
                {
                    List<person> p = new List<person>();
                    person p1 = new person();
                    p1.file = "";
                    p1.ResponceCode = dt.Tables[0].Rows[0]["ResponceCode"].ToString();
                    p1.ResponceDescription = dt.Tables[0].Rows[0]["ResponceDescription"].ToString();
                    p.Add(p1);
                    return JsonConvert.SerializeObject(p);
                }
                //
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("ADM_SET_7_2_RVRCResultsProcessinForTheMarksUploaded ", 0, ex.Message);
                //return ex.Message;
                List<person> p = new List<person>();
                person p1 = new person();
                p1.file = "";
                p1.ResponceCode = "400";
                p1.ResponceDescription = ex.Message;
                p.Add(p1);
                return JsonConvert.SerializeObject(p);
            }

        }


        [HttpGet, ActionName("ResultsLogicReports")]
        public string ResultsLogicReports(int ExamMonthYearId, int StudentTypeId, string scheme, int ExamTypeId, int academicyearid, string username)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[6];
                param[0] = new SqlParameter("@ExamMonthYearId", ExamMonthYearId);
                param[1] = new SqlParameter("@StudentTypeId", StudentTypeId);
                param[2] = new SqlParameter("@scheme", scheme);
                param[3] = new SqlParameter("@ExamTypeId", ExamTypeId);
                param[4] = new SqlParameter("@academicyearid", academicyearid);
                param[5] = new SqlParameter("@username", username);
                var dt = dbHandler.ReturnDataWithStoredProcedure("ADM_GET_5_1_ResultsLogicReports ", param);
                if (dt.Tables[0].Rows[0]["ResponceCode"].ToString() == "200")
                {
                    var ExamMonthYear = dt.Tables[1].Rows[0]["ExamMonthYear"].ToString();
                    var filename = ExamMonthYear + '_' + scheme + '_' + "ResultsLogicReports" + ".xlsx";

                    var eh = new ExcelHelper();
                    var path = ConfigurationManager.AppSettings["DownloadsFolderPath"];
                    bool folderExists = Directory.Exists(path);
                    if (!folderExists)
                        Directory.CreateDirectory(path);
                    eh.ExportDataSet(dt, path + filename);
                    Timer timer = new Timer(200000);
                    timer.Elapsed += (sender, e) => elapse(sender, e, ConfigurationManager.AppSettings["DownloadsFolderPath"] + filename);
                    timer.Start();
                    var file = "/Downloads/" + filename;
                    List<person> p = new List<person>();
                    person p1 = new person();
                    p1.file = file;
                    p1.ResponceCode = dt.Tables[0].Rows[0]["ResponceCode"].ToString();
                    p1.ResponceDescription = dt.Tables[0].Rows[0]["ResponceDescription"].ToString();
                    p.Add(p1);

                    return JsonConvert.SerializeObject(p);
                    //return ;

                }
                else
                {
                    List<person> p = new List<person>();
                    person p1 = new person();
                    p1.file = "";
                    p1.ResponceCode = dt.Tables[0].Rows[0]["ResponceCode"].ToString();
                    p1.ResponceDescription = dt.Tables[0].Rows[0]["ResponceDescription"].ToString();
                    p.Add(p1);
                    return JsonConvert.SerializeObject(p);
                }
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("ADM_GET_5_1_ResultsLogicReports ", 0, ex.Message);
                return ex.Message;
            }

        }

        [HttpGet, ActionName("ResultsDeployTables")]
        public string ResultsDeployTables(int ExamMonthYearId, int StudentTypeId, string scheme, int ExamTypeId, string username)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[5];
                param[0] = new SqlParameter("@ExamMonthYearId", ExamMonthYearId);
                param[1] = new SqlParameter("@StudentTypeId", StudentTypeId);
                param[2] = new SqlParameter("@scheme", scheme);
                param[3] = new SqlParameter("@ExamTypeId", ExamTypeId);
                param[4] = new SqlParameter("@username", username);
                var dt = dbHandler.ReturnDataWithStoredProcedure("ADM_GET_6_1_ResultsDeployingtoMasterTables ", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("ADM_GET_6_1_ResultsDeployingtoMasterTables", 0, ex.Message);
                return ex.Message;
            }

        }


        [HttpGet, ActionName("RVRCResultsDeployTables")]
        public string RVRCResultsDeployTables(int ExamMonthYearId, int StudentTypeId, string Scheme, string UserName, int ExamTypeId = 0)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[5];
                param[0] = new SqlParameter("@ExamMonthYearId", ExamMonthYearId);
                param[1] = new SqlParameter("@StudentTypeId", StudentTypeId);
                param[2] = new SqlParameter("@Scheme", Scheme);
                param[3] = new SqlParameter("@UserName", UserName);
                param[4] = new SqlParameter("@ExamTypeId", ExamTypeId);
                var dt = dbHandler.ReturnDataWithStoredProcedure("ADM_SET_7_3_RVRCResultsDeploymentToMasterResultsTables ", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("ADM_SET_7_3_RVRCResultsDeploymentToMasterResultsTables", 0, ex.Message);
                return ex.Message;
            }

        }
        [HttpGet, ActionName("GenerateOdcData")]
        public string GenerateOdcData(int ExamMonthYearId, string day, string month, string year)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[4];
                param[0] = new SqlParameter("@ExamMonthYearId", ExamMonthYearId);
                param[1] = new SqlParameter("@day", day);
                param[2] = new SqlParameter("@month", month);
                param[3] = new SqlParameter("@year", year);
                DataSet ds = dbHandler.ReturnDataWithStoredProcedure("USP_SET_GenerateODCData", param);
                if (ds.Tables[0].Rows[0]["ResponceCode"].ToString() == "200")
                {

                    var filename = day + "-" + month + "-" + year + "-" + "MemosData" + ".xlsx";
                    var eh = new ExcelHelper();
                    var path = ConfigurationManager.AppSettings["DownloadsFolderPath"];
                    DataSet excelds = new DataSet();
                    excelds.Tables.Add(ds.Tables[1].Copy());
                    bool folderExists = Directory.Exists(path);
                    if (!folderExists)
                        Directory.CreateDirectory(path);
                    eh.ExportDataSet(excelds, path + filename);
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

                dbHandler.SaveErorr("USP_SET_GenerateODCData", 0, ex.Message);
                return ex.Message;
            }

        }

        [HttpGet, ActionName("getTransferReportExcel")]
        public string getTransferReportExcel(int AcademicYearId)
        {
            List<person> p = new List<person>();
            person p1 = new person();
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@AcademicYearId", AcademicYearId);
                DataSet ds = dbHandler.ReturnDataWithStoredProcedure("USP_GET_AllTransferStudentsListForExcel", param);
                if (ds.Tables[0].Rows.Count > 0)
                {

                    var filename = "Admin_Transfer_Report" + ".xlsx";
                    var eh = new ExcelHelper();
                    var path = ConfigurationManager.AppSettings["DownloadsFolderPath"];
                    bool folderExists = Directory.Exists(path);
                    if (!folderExists)
                        Directory.CreateDirectory(path);
                    eh.ExportDataSet(ds, path + filename);
                    Timer timer = new Timer(200000);
                    timer.Elapsed += (sender, e) => elapse(sender, e, ConfigurationManager.AppSettings["DownloadsFolderPath"] + filename);
                    timer.Start();
                    var file = "/Downloads/" + filename;


                    p1.file = file;

                    p.Add(p1);

                    return JsonConvert.SerializeObject(p);
                    //return ;

                }
                else
                {

                    p1.file = "";
                    p1.ResponceCode = ds.Tables[0].Rows[0]["ResponceCode"].ToString();
                    p1.ResponceDescription = ds.Tables[0].Rows[0]["ResponceDescription"].ToString();
                    p.Add(p1);
                    return JsonConvert.SerializeObject(p);
                }
                //
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_GET_AllTransferStudentsListForExcel", 0, ex.Message);
                p1.file = "";
                p1.ResponceCode = "400";
                p1.ResponceDescription = ex.Message;
                p.Add(p1);
                return JsonConvert.SerializeObject(p);

            }

        }

        [HttpPost, ActionName("GetFacultyMappingExcel")]
        public string GetFacultyMappingExcel([FromBody] JsonObject data)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@AcademicYearId", data["AcademicYearId"].ToString());
                param[1] = new SqlParameter("@SemId", data["SemId"].ToString());
                param[2] = new SqlParameter("@CollegeCode", data["CollegeCode"].ToString());
                DataSet ds = dbHandler.ReturnDataWithStoredProcedure("USP_GET_AcademicFacultyMappingStatus", param);
                if (ds.Tables[0].Rows.Count > 0)
                {

                    var filename = "Collegewise_Faculty_Mapping_Report" + ".xlsx";
                    var eh = new ExcelHelper();
                    var path = ConfigurationManager.AppSettings["DownloadsFolderPath"];
                    bool folderExists = Directory.Exists(path);
                    if (!folderExists)
                        Directory.CreateDirectory(path);
                    eh.ExportDataSet(ds, path + filename);
                    Timer timer = new Timer(200000);
                    timer.Elapsed += (sender, e) => elapse(sender, e, ConfigurationManager.AppSettings["DownloadsFolderPath"] + filename);
                    timer.Start();
                    var file = "/Downloads/" + filename;

                    List<person> p = new List<person>();
                    person p1 = new person();
                    p1.file = file;
                    //p1.ResponceCode = ds.Tables[0].Rows[0]["ResponceCode"].ToString();
                    //p1.ResponceDescription = ds.Tables[0].Rows[0]["ResponceDescription"].ToString();
                    p.Add(p1);

                    return JsonConvert.SerializeObject(p);


                }
                else
                {
                    List<person> p = new List<person>();
                    person p1 = new person();
                    p1.file = "";
                    //p1.ResponceCode = ds.Tables[0].Rows[0]["ResponceCode"].ToString();
                    //p1.ResponceDescription = ds.Tables[0].Rows[0]["ResponceDescription"].ToString();
                    p.Add(p1);
                    return JsonConvert.SerializeObject(p);

                }
                //
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_GET_AcademicFacultyMappingStatus", 0, ex.Message);
                //return ex.Message;
                List<person> p = new List<person>();
                person p1 = new person();
                p1.file = "";

                p1.ResponceCode = "400";
                p1.ResponceDescription = ex.Message;
                p.Add(p1);
                return JsonConvert.SerializeObject(p);
            }

        }



        [HttpGet, ActionName("GetFeedbackReportExcel")]
        public string GetFeedbackReportExcel(string p_FeedbackId)
        {

            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@p_FeedbackId", p_FeedbackId);
                DataSet ds = dbHandler.ReturnDataWithStoredProcedure("usp_Get_Academic_studentFeedbackReport", param);

                if (ds.Tables[0].Rows.Count > 0)
                {

                    var filename = "Overall_Feedback_Report" + ".xlsx";
                    var eh = new ExcelHelper();
                    var path = ConfigurationManager.AppSettings["DownloadsFolderPath"];
                    bool folderExists = Directory.Exists(path);
                    if (!folderExists)
                        Directory.CreateDirectory(path);
                    eh.ExportDataSet(ds, path + filename);
                    Timer timer = new Timer(200000);
                    timer.Elapsed += (sender, e) => elapse(sender, e, ConfigurationManager.AppSettings["DownloadsFolderPath"] + filename);
                    timer.Start();


                    var file = "/Downloads/" + filename;

                    List<person> p = new List<person>();
                    person p1 = new person();
                    p1.file = file;

                    p.Add(p1);

                    return JsonConvert.SerializeObject(p);
                    //return ;

                }
                else
                {
                    List<person> p = new List<person>();
                    person p1 = new person();
                    p1.file = "";
                    p1.ResponceCode = ds.Tables[0].Rows[0]["ResponceCode"].ToString();
                    p1.ResponceDescription = ds.Tables[0].Rows[0]["ResponceDescription"].ToString();
                    p.Add(p1);
                    return JsonConvert.SerializeObject(p);
                }
                //
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("usp_Get_Academic_studentFeedbackReport", 0, ex.Message);
                //return ex.Message;
                List<person> p = new List<person>();
                person p1 = new person();
                p1.file = "";

                p1.ResponceCode = "400";
                p1.ResponceDescription = ex.Message;
                p.Add(p1);
                return JsonConvert.SerializeObject(p);
            }

        }

        [HttpGet, ActionName("GenerateNrData")]
        public string GenerateNrData(int ExamMonthYearId, int StudentTypeId, string Scheme, int ExamTypeId, string UserName)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[5];
                param[0] = new SqlParameter("@ExamMonthYearId", ExamMonthYearId);
                param[1] = new SqlParameter("@StudentTypeId", StudentTypeId);
                param[2] = new SqlParameter("@Scheme", Scheme);
                param[3] = new SqlParameter("@ExamTypeId", ExamTypeId);
                param[4] = new SqlParameter("@UserName", UserName);
                DataSet ds = dbHandler.ReturnDataWithStoredProcedure("ADM_SET_2_1_GenerateNr", param);
                if (ds.Tables[0].Rows[0]["ResponceCode"].ToString() == "200")
                {
                    var ExamMonthYear = ds.Tables[1].Rows[0]["ExamMonthYear"].ToString();

                    var filename = ExamMonthYear + '_' + Scheme + '_' + "GenerateNrData" + ".xlsx";
                    var eh = new ExcelHelper();
                    var path = ConfigurationManager.AppSettings["DownloadsFolderPath"];
                    DataSet excelds = new DataSet();
                    excelds.Tables.Add(ds.Tables[1].Copy());
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
                    p1.ResponceCode = ds.Tables[0].Rows[0]["ResponceCode"].ToString();
                    p1.ResponceDescription = ds.Tables[0].Rows[0]["ResponceDescription"].ToString();
                    p.Add(p1);

                    return JsonConvert.SerializeObject(p);
                    //return ;

                }
                else
                {
                    List<person> p = new List<person>();
                    person p1 = new person();
                    p1.file = "";
                    p1.ResponceCode = ds.Tables[0].Rows[0]["ResponceCode"].ToString();
                    p1.ResponceDescription = ds.Tables[0].Rows[0]["ResponceDescription"].ToString();
                    p.Add(p1);
                    return JsonConvert.SerializeObject(p);
                }
                //
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("ADM_SET_2_1_GenerateNr", 0, ex.Message);
                return ex.Message;
            }

        }



        [HttpGet, ActionName("GetNBAReports1Excel")]
        public string GetNBAReports1Excel()
        {
            try
            {
                var dbHandler = new dbHandler();
                string StrQuery = "";
                StrQuery = "exec USP_GET_NBAReports@1";
                DataSet ds = dbHandler.ReturnDataSet(StrQuery);
                if (ds.Tables[0].Rows.Count > 0)
                {
                    var filename = "NBA-Reports-1" + Guid.NewGuid() + ".xlsx";
                    var eh = new ExcelHelper();
                    var path = ConfigurationManager.AppSettings["DownloadsFolderPath"];
                    bool folderExists = Directory.Exists(path);
                    if (!folderExists)
                        Directory.CreateDirectory(path);
                    eh.ExportDataSet(ds, path + filename);
                    Timer timer = new Timer(200000);
                    timer.Elapsed += (sender, e) => elapse(sender, e, ConfigurationManager.AppSettings["DownloadsFolderPath"] + filename);
                    timer.Start();

                    var file = "/Downloads/" + filename;
                    List<person> p = new List<person>();
                    person p1 = new person();
                    p1.file = file;
                    p1.ResponceCode = "200";
                    //p1.ResponceDescription = ds.Tables[0].Rows[0]["ResponceDescription"].ToString();
                    p.Add(p1);

                    return JsonConvert.SerializeObject(p);
                    //return ;

                }
                else
                {
                    List<person> p = new List<person>();
                    person p1 = new person();
                    p1.file = "";
                    p1.ResponceCode = "400";
                    p1.ResponceDescription = "Data Not Found";
                    p.Add(p1);
                    return JsonConvert.SerializeObject(p);
                }
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_GET_NBAReports@1", 0, ex.Message);
                return ex.Message;
            }

        }



        [HttpGet, ActionName("GetNICData")]
        public string GetNICData()
        {
            try
            {
                var dbHandler = new dbHandler();
                string StrQuery = "";
                StrQuery = "exec USP_SFP_GET_NIC_DATA";
                DataSet ds = dbHandler.ReturnDataSet(StrQuery);
                if (ds.Tables[0].Rows.Count > 0)
                {
                    var PolycetYear = ds.Tables[1].Rows[0]["PolycetYear"].ToString();
                    var filename = PolycetYear + "-" + "NIC_DATA" + ".xlsx";
                    var eh = new ExcelHelper();
                    var path = ConfigurationManager.AppSettings["DownloadsFolderPath"];
                    bool folderExists = Directory.Exists(path);
                    if (!folderExists)
                        Directory.CreateDirectory(path);
                    eh.ExportDataSet(ds, path + filename);
                    Timer timer = new Timer(200000);
                    timer.Elapsed += (sender, e) => elapse(sender, e, ConfigurationManager.AppSettings["DownloadsFolderPath"] + filename);
                    timer.Start();

                    var file = "/Downloads/" + filename;
                    List<person> p = new List<person>();
                    person p1 = new person();
                    p1.file = file;
                    p1.ResponceCode = ds.Tables[0].Rows[0]["ResponceCode"].ToString();
                    p1.ResponceDescription = ds.Tables[0].Rows[0]["ResponceDescription"].ToString();
                    p.Add(p1);

                    return JsonConvert.SerializeObject(p);
                    //return ;

                }
                else
                {
                    List<person> p = new List<person>();
                    person p1 = new person();
                    p1.file = "";
                    p1.ResponceCode = ds.Tables[0].Rows[0]["ResponceCode"].ToString();
                    p1.ResponceDescription = ds.Tables[0].Rows[0]["ResponceDescription"].ToString();
                    p.Add(p1);
                    return JsonConvert.SerializeObject(p);
                }
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_SFP_GET_NIC_DATA", 0, ex.Message);
                return ex.Message;
            }

        }

        [HttpGet, ActionName("GetNBAReports2Excel")]
        public string GetNBAReports2Excel()
        {
            try
            {
                var dbHandler = new dbHandler();
                string StrQuery = "";
                StrQuery = "exec USP_GET_NBAReports@2";
                DataSet ds = dbHandler.ReturnDataSet(StrQuery);
                if (ds.Tables[0].Rows.Count > 0)
                {
                    var filename = "NBA-Reports-2" + Guid.NewGuid() + ".xlsx";
                    var eh = new ExcelHelper();
                    var path = ConfigurationManager.AppSettings["DownloadsFolderPath"];
                    bool folderExists = Directory.Exists(path);
                    if (!folderExists)
                        Directory.CreateDirectory(path);
                    eh.ExportDataSet(ds, path + filename);
                    Timer timer = new Timer(200000);
                    timer.Elapsed += (sender, e) => elapse(sender, e, ConfigurationManager.AppSettings["DownloadsFolderPath"] + filename);
                    timer.Start();

                    var file = "/Downloads/" + filename;
                    List<person> p = new List<person>();
                    person p1 = new person();
                    p1.file = file;
                    p1.ResponceCode = "200";
                    //p1.ResponceDescription = ds.Tables[0].Rows[0]["ResponceDescription"].ToString();
                    p.Add(p1);

                    return JsonConvert.SerializeObject(p);
                    //return ;

                }
                else
                {
                    List<person> p = new List<person>();
                    person p1 = new person();
                    p1.file = "";
                    p1.ResponceCode = "400";
                    p1.ResponceDescription = "Data Not Found";
                    p.Add(p1);
                    return JsonConvert.SerializeObject(p);
                }
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_GET_NBAReports@2", 0, ex.Message);
                return ex.Message;
            }

        }

        [HttpGet, ActionName("GetNBAReports31Excel")]
        public string GetNBAReports31Excel()
        {
            try
            {
                var dbHandler = new dbHandler();
                string StrQuery = "";
                StrQuery = "exec USP_GET_NBAReports@3_1";
                DataSet ds = dbHandler.ReturnDataSet(StrQuery);
                if (ds.Tables[0].Rows.Count > 0)
                {
                    var filename = "NBA-Reports-3.1" + Guid.NewGuid() + ".xlsx";
                    var eh = new ExcelHelper();
                    var path = ConfigurationManager.AppSettings["DownloadsFolderPath"];
                    bool folderExists = Directory.Exists(path);
                    if (!folderExists)
                        Directory.CreateDirectory(path);
                    eh.ExportDataSet(ds, path + filename);
                    Timer timer = new Timer(200000);
                    timer.Elapsed += (sender, e) => elapse(sender, e, ConfigurationManager.AppSettings["DownloadsFolderPath"] + filename);
                    timer.Start();

                    var file = "/Downloads/" + filename;
                    List<person> p = new List<person>();
                    person p1 = new person();
                    p1.file = file;
                    p1.ResponceCode = "200";
                    //p1.ResponceDescription = ds.Tables[0].Rows[0]["ResponceDescription"].ToString();
                    p.Add(p1);

                    return JsonConvert.SerializeObject(p);
                    //return ;

                }
                else
                {
                    List<person> p = new List<person>();
                    person p1 = new person();
                    p1.file = "";
                    p1.ResponceCode = "400";
                    p1.ResponceDescription = "Data Not Found";
                    p.Add(p1);
                    return JsonConvert.SerializeObject(p);
                }
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_GET_NBAReports@3_1", 0, ex.Message);
                return ex.Message;
            }

        }

        [HttpGet, ActionName("GetNBAReports32Excel")]
        public string GetNBAReports32Excel()
        {
            try
            {
                var dbHandler = new dbHandler();
                string StrQuery = "";
                StrQuery = "exec USP_GET_NBAReports@3_2";
                DataSet ds = dbHandler.ReturnDataSet(StrQuery);
                if (ds.Tables[0].Rows.Count > 0)
                {
                    var filename = "NBA-Reports-3.2-" + Guid.NewGuid() + ".xlsx";
                    var eh = new ExcelHelper();
                    var path = ConfigurationManager.AppSettings["DownloadsFolderPath"];
                    bool folderExists = Directory.Exists(path);
                    if (!folderExists)
                        Directory.CreateDirectory(path);
                    eh.ExportDataSet(ds, path + filename);
                    Timer timer = new Timer(200000);
                    timer.Elapsed += (sender, e) => elapse(sender, e, ConfigurationManager.AppSettings["DownloadsFolderPath"] + filename);
                    timer.Start();

                    var file = "/Downloads/" + filename;
                    List<person> p = new List<person>();
                    person p1 = new person();
                    p1.file = file;
                    p1.ResponceCode = "200";
                    //p1.ResponceDescription = ds.Tables[0].Rows[0]["ResponceDescription"].ToString();
                    p.Add(p1);

                    return JsonConvert.SerializeObject(p);
                    //return ;

                }
                else
                {
                    List<person> p = new List<person>();
                    person p1 = new person();
                    p1.file = "";
                    p1.ResponceCode = "400";
                    p1.ResponceDescription = "Data Not Found";
                    p.Add(p1);
                    return JsonConvert.SerializeObject(p);
                }
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_GET_NBAReports@3_2", 0, ex.Message);
                return ex.Message;
            }

        }

        [HttpGet, ActionName("GetNBAReports4Excel")]
        public string GetNBAReports4Excel()
        {
            try
            {
                var dbHandler = new dbHandler();
                string StrQuery = "";
                StrQuery = "exec USP_GET_NBAReports@4";
                DataSet ds = dbHandler.ReturnDataSet(StrQuery);
                if (ds.Tables[0].Rows.Count > 0)
                {
                    var filename = "NBA-Reports-4" + Guid.NewGuid() + ".xlsx";
                    var eh = new ExcelHelper();
                    var path = ConfigurationManager.AppSettings["DownloadsFolderPath"];
                    bool folderExists = Directory.Exists(path);
                    if (!folderExists)
                        Directory.CreateDirectory(path);
                    eh.ExportDataSet(ds, path + filename);
                    Timer timer = new Timer(200000);
                    timer.Elapsed += (sender, e) => elapse(sender, e, ConfigurationManager.AppSettings["DownloadsFolderPath"] + filename);
                    timer.Start();

                    var file = "/Downloads/" + filename;
                    List<person> p = new List<person>();
                    person p1 = new person();
                    p1.file = file;
                    p1.ResponceCode = "200";
                    //p1.ResponceDescription = ds.Tables[0].Rows[0]["ResponceDescription"].ToString();
                    p.Add(p1);

                    return JsonConvert.SerializeObject(p);
                    //return ;

                }
                else
                {
                    List<person> p = new List<person>();
                    person p1 = new person();
                    p1.file = "";
                    p1.ResponceCode = "400";
                    p1.ResponceDescription = "Data Not Found";
                    p.Add(p1);
                    return JsonConvert.SerializeObject(p);
                }
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_GET_NBAReports@4", 0, ex.Message);
                return ex.Message;
            }

        }


        [HttpGet, ActionName("GetAmbedkarResultsReport")]
        public string GetAmbedkarResultsReport(string scheme)
        {
            List<person> p = new List<person>();
            person p1 = new person();
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@scheme", scheme);
                DataSet ds = dbHandler.ReturnDataWithStoredProcedure("USP_GET_AmbedkarResultsReports", param);
                if (ds.Tables[0].Rows[0]["ResponceCode"].ToString() == "200")
                {
                    var filename = scheme + "_Ambedkar_Results_Report" + ".xlsx";
                    var eh = new ExcelHelper();
                    var path = ConfigurationManager.AppSettings["DownloadsFolderPath"];
                    bool folderExists = Directory.Exists(path);
                    if (!folderExists)
                        Directory.CreateDirectory(path);
                    eh.ExportDataSet(ds, path + filename);
                    Timer timer = new Timer(200000);
                    timer.Elapsed += (sender, e) => elapse(sender, e, ConfigurationManager.AppSettings["DownloadsFolderPath"] + filename);
                    timer.Start();
                    var file = "/Downloads/" + filename;

                    p1.file = file;
                    p1.ResponceCode = ds.Tables[0].Rows[0]["ResponceCode"].ToString();
                    p1.ResponceDescription = ds.Tables[0].Rows[0]["ResponceDescription"].ToString();
                    p.Add(p1);

                    return JsonConvert.SerializeObject(p);
                    //return ;

                }
                else
                {

                    p1.file = "";
                    p1.ResponceCode = ds.Tables[0].Rows[0]["ResponceCode"].ToString();
                    p1.ResponceDescription = ds.Tables[0].Rows[0]["ResponceDescription"].ToString();
                    p.Add(p1);
                    return JsonConvert.SerializeObject(p);
                }
                //
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_GET_AmbedkarResultsReports", 0, ex.Message);

                p1.file = "";
                p1.ResponceCode = "400";
                p1.ResponceDescription = ex.Message;
                p.Add(p1);
                return JsonConvert.SerializeObject(p);
            }

        }


        [HttpGet, ActionName("GetAttendanceReportData")]
        public string GetAttendanceReportData(int AcademicYearID, int Semid)
        {
            List<person> p = new List<person>();
            person p1 = new person();
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@AcademicYearID", AcademicYearID);
                param[1] = new SqlParameter("@Semid", Semid);
                DataSet ds = dbHandler.ReturnDataWithStoredProcedure("USP_GET_AttendanceReportData", param);
                if (ds.Tables[0].Rows[0]["ResponceCode"].ToString() == "200")
                {
                    var filename = "Attendance_Report" + ".xlsx";
                    var eh = new ExcelHelper();
                    var path = ConfigurationManager.AppSettings["DownloadsFolderPath"];
                    bool folderExists = Directory.Exists(path);
                    if (!folderExists)
                        Directory.CreateDirectory(path);
                    eh.ExportDataSet(ds, path + filename);
                    Timer timer = new Timer(200000);
                    timer.Elapsed += (sender, e) => elapse(sender, e, ConfigurationManager.AppSettings["DownloadsFolderPath"] + filename);
                    timer.Start();
                    var file = "/Downloads/" + filename;

                    p1.file = file;
                    p1.ResponceCode = ds.Tables[0].Rows[0]["ResponceCode"].ToString();
                    p1.ResponceDescription = ds.Tables[0].Rows[0]["ResponceDescription"].ToString();
                    p.Add(p1);

                    return JsonConvert.SerializeObject(p);
                    //return ;

                }
                else
                {

                    p1.file = "";
                    p1.ResponceCode = ds.Tables[0].Rows[0]["ResponceCode"].ToString();
                    p1.ResponceDescription = ds.Tables[0].Rows[0]["ResponceDescription"].ToString();
                    p.Add(p1);
                    return JsonConvert.SerializeObject(p);
                }
                //
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_GET_AttendanceReportData", 0, ex.Message);

                p1.file = "";
                p1.ResponceCode = "400";
                p1.ResponceDescription = ex.Message;
                p.Add(p1);
                return JsonConvert.SerializeObject(p);
            }

        }


        [HttpGet, ActionName("GetTicketsReportExcel")]
        public string GetTicketsReportExcel(string FromDate, string ToDate, string UserName)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@FromDate", FromDate);
                param[1] = new SqlParameter("@ToDate", ToDate);
                param[2] = new SqlParameter("@UserName", UserName);
                DataSet ds = dbHandler.ReturnDataWithStoredProcedure("SP_Get_TicketsReport", param);
                var filename = "TicketsData_" + ".xlsx";
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
                dbHandler.SaveErorr("SP_Get_TicketsReport", 0, ex.Message);
                return ex.Message;
            }

        }



        [HttpGet, ActionName("GetPolycetExamCentersExcel")]
        public string GetPolycetExamCentersExcel(string AcademicYear)
        {
            List<person> p = new List<person>();
            person p1 = new person();
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@AcademicYear", AcademicYear);
                DataSet ds = dbHandler.ReturnDataWithStoredProcedure("USP_Affiliation_GET_Polycet_ExamCenters", param);
                if (ds.Tables[0].Rows.Count > 0)
                {
                    var filename = AcademicYear + "_Polycet_Exam_Centers" + ".xlsx";
                    var eh = new ExcelHelper();
                    var path = ConfigurationManager.AppSettings["DownloadsFolderPath"];
                    bool folderExists = Directory.Exists(path);
                    if (!folderExists)
                        Directory.CreateDirectory(path);
                    eh.ExportDataSet(ds, path + filename);
                    Timer timer = new Timer(200000);
                    timer.Elapsed += (sender, e) => elapse(sender, e, ConfigurationManager.AppSettings["DownloadsFolderPath"] + filename);
                    timer.Start();
                    var file = "/Downloads/" + filename;

                    p1.file = file;
                    p1.ResponceCode = "200";
                    p1.ResponceDescription = "";
                    p.Add(p1);

                    return JsonConvert.SerializeObject(p);
                    //return ;

                }
                else
                {

                    p1.file = "";
                    p1.ResponceCode = "400";
                    p1.ResponceDescription = "";
                    p.Add(p1);
                    return JsonConvert.SerializeObject(p);
                }
                //
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_Affiliation_GET_Polycet_ExamCenters", 0, ex.Message);

                p1.file = "";
                p1.ResponceCode = "400";
                p1.ResponceDescription = ex.Message;
                p.Add(p1);
                return JsonConvert.SerializeObject(p);
            }

        }

        [HttpPost, ActionName("GetResultsReports")]
        public string GetResultsReports([FromBody] JsonObject data)
        {
            List<person> p = new List<person>();
            person p1 = new person();
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[4];
                param[0] = new SqlParameter("@Scheme", data["Scheme"]);
                param[1] = new SqlParameter("@semid", data["semid"]);
                param[2] = new SqlParameter("@branchid", data["branchid"]);
                param[3] = new SqlParameter("@collegecode", data["collegecode"]);
                DataSet ds = dbHandler.ReturnDataWithStoredProcedure("USP_GET_ResultsReoprtsByScheme", param);
                if (ds.Tables[0].Rows.Count > 0)
                {
                    var filename = data["Scheme"] + "_Results_Reports" + ".xlsx";
                    var eh = new ExcelHelper();
                    var path = ConfigurationManager.AppSettings["DownloadsFolderPath"];
                    bool folderExists = Directory.Exists(path);
                    if (!folderExists)
                        Directory.CreateDirectory(path);
                    eh.ExportDataSet(ds, path + filename);
                    Timer timer = new Timer(200000);
                    timer.Elapsed += (sender, e) => elapse(sender, e, ConfigurationManager.AppSettings["DownloadsFolderPath"] + filename);
                    timer.Start();
                    var file = "/Downloads/" + filename;
                    p1.file = file;
                    p1.ResponceCode = ds.Tables[0].Rows[0]["ResponceCode"].ToString();
                    p1.ResponceDescription = ds.Tables[0].Rows[0]["ResponceDescription"].ToString();
                    p.Add(p1);

                    return JsonConvert.SerializeObject(p);
                    //return ;

                }
                else
                {

                    p1.file = "";
                    p1.ResponceCode = ds.Tables[0].Rows[0]["ResponceCode"].ToString();
                    p1.ResponceDescription = ds.Tables[0].Rows[0]["ResponceDescription"].ToString();
                    p.Add(p1);
                    return JsonConvert.SerializeObject(p);
                }
                //
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_GET_ResultsReoprtsByScheme", 0, ex.Message);

                p1.file = "";
                p1.ResponceCode = "400";
                p1.ResponceDescription = ex.Message;
                p.Add(p1);
                return JsonConvert.SerializeObject(p);
            }

        }

        [HttpGet, ActionName("GetBackolgSubjects")]
        public string GetBackolgSubjects(string scheme)
        {
            List<person> p = new List<person>();
            person p1 = new person();
            try
            {

                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@scheme", scheme);
                DataSet ds = dbHandler.ReturnDataWithStoredProcedure("USP_GET_BacklogSubjectsForAllPinsReports", param);
                if (ds.Tables[0].Rows[0]["ResponceCode"].ToString() == "200")
                {
                    var filename = scheme + "_Backlog_Subjects_Pins" + ".xlsx";
                    var eh = new ExcelHelper();
                    var path = ConfigurationManager.AppSettings["DownloadsFolderPath"];
                    bool folderExists = Directory.Exists(path);
                    if (!folderExists)
                        Directory.CreateDirectory(path);
                    eh.ExportDataSet(ds, path + filename);
                    Timer timer = new Timer(200000);
                    timer.Elapsed += (sender, e) => elapse(sender, e, ConfigurationManager.AppSettings["DownloadsFolderPath"] + filename);
                    timer.Start();
                    var file = "/Downloads/" + filename;
                    p1.file = file;
                    p1.ResponceCode = ds.Tables[0].Rows[0]["ResponceCode"].ToString();
                    p1.ResponceDescription = ds.Tables[0].Rows[0]["ResponceDescription"].ToString();
                    p.Add(p1);
                    return JsonConvert.SerializeObject(p);
                    //return ;

                }
                else
                {

                    p1.file = "";
                    p1.ResponceCode = ds.Tables[0].Rows[0]["ResponceCode"].ToString();
                    p1.ResponceDescription = ds.Tables[0].Rows[0]["ResponceDescription"].ToString();
                    p.Add(p1);
                    return JsonConvert.SerializeObject(p);
                }
                //
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_GET_BacklogSubjectsForAllPinsReports", 0, ex.Message);
                //return ex.Message;

                p1.file = "";
                p1.ResponceCode = "400";
                p1.ResponceDescription = ex.Message;
                p.Add(p1);
                return JsonConvert.SerializeObject(p);
            }

        }


        [HttpGet, ActionName("GatStatisticsReports")]
        public string GatStatisticsReports(int AcademicYearId,int Exammonthyearid, int DataType, int CollegeCode=0)
        {
            List<person> p = new List<person>();
            person p1 = new person();
            try
            {

                var dbHandler = new dbHandler();
                var param = new SqlParameter[4];
                param[0] = new SqlParameter("@AcademicYearId", AcademicYearId);
                param[1] = new SqlParameter("@Exammonthyearid", Exammonthyearid);
                param[2] = new SqlParameter("@CollegeCode", CollegeCode);
                param[3] = new SqlParameter("@DataType", DataType);
                DataSet ds = dbHandler.ReturnDataWithStoredProcedure("USP_GET_SubjectWiseResultStatistics", param);
                if (ds.Tables[0].Rows[0]["ResponceCode"].ToString() == "200")
                {
                    var filename = ds.Tables[1].Rows[0]["ExamMonthYear"].ToString()+"_Results_Statistics" + ".xlsx";
                    var eh = new ExcelHelper();
                    var path = ConfigurationManager.AppSettings["DownloadsFolderPath"];
                    bool folderExists = Directory.Exists(path);
                    if (!folderExists)
                        Directory.CreateDirectory(path);
                    eh.ExportDataSet(ds, path + filename);
                    Timer timer = new Timer(200000);
                    timer.Elapsed += (sender, e) => elapse(sender, e, ConfigurationManager.AppSettings["DownloadsFolderPath"] + filename);
                    timer.Start();
                    var file = "/Downloads/" + filename;
                    p1.file = file;
                    p1.ResponceCode = ds.Tables[0].Rows[0]["ResponceCode"].ToString();
                    p1.ResponceDescription = ds.Tables[0].Rows[0]["ResponceDescription"].ToString();
                    p.Add(p1);
                    return JsonConvert.SerializeObject(p);
                    //return ;

                }
                else
                {

                    p1.file = "";
                    p1.ResponceCode = ds.Tables[0].Rows[0]["ResponceCode"].ToString();
                    p1.ResponceDescription = ds.Tables[0].Rows[0]["ResponceDescription"].ToString();
                    p.Add(p1);
                    return JsonConvert.SerializeObject(p);
                }
                //
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_GET_BacklogSubjectsForAllPinsReports", 0, ex.Message);
                //return ex.Message;

                p1.file = "";
                p1.ResponceCode = "400";
                p1.ResponceDescription = ex.Message;
                p.Add(p1);
                return JsonConvert.SerializeObject(p);
            }

        }

        [HttpGet, ActionName("GetIndustrialFailedReport")]
        public string GetIndustrialFailedReport(string scheme)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@scheme", scheme);
                DataSet ds = dbHandler.ReturnDataWithStoredProcedure("USP_GET_IndustrialTainingFailedAndLessThan3BacklogList", param);
                if (ds.Tables[0].Rows[0]["ResponceCode"].ToString() == "200")
                {
                    var filename = scheme + "_3_Backlog_Industrial_Training_Report" + ".xlsx";
                    var eh = new ExcelHelper();
                    var path = ConfigurationManager.AppSettings["DownloadsFolderPath"];
                    DataSet excelds = new DataSet();
                    excelds.Tables.Add(ds.Tables[1].Copy());
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
                    p1.ResponceCode = ds.Tables[0].Rows[0]["ResponceCode"].ToString();
                    p1.ResponceDescription = ds.Tables[0].Rows[0]["ResponceDescription"].ToString();
                    p.Add(p1);

                    return JsonConvert.SerializeObject(p);
                    //return ;

                }
                else
                {
                    List<person> p = new List<person>();
                    person p1 = new person();
                    p1.file = "";
                    p1.ResponceCode = ds.Tables[0].Rows[0]["ResponceCode"].ToString();
                    p1.ResponceDescription = ds.Tables[0].Rows[0]["ResponceDescription"].ToString();
                    p.Add(p1);
                    return JsonConvert.SerializeObject(p);
                }
                //
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_GET_IndustrialTainingFailedAndLessThan3BacklogList", 0, ex.Message);
                return ex.Message;
            }

        }


        [HttpGet, ActionName("GetFeeEligibelList")]
        public string GetFeeEligibelList(int ExamMonthYearId, int StudentTypeId)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@ExamMonthYearId ", ExamMonthYearId);
                param[1] = new SqlParameter("@StudentTypeId ", StudentTypeId);
                DataSet ds = dbHandler.ReturnDataWithStoredProcedure("USP_GET_EligibleStudentsListForFeePeyment", param);
                if (ds.Tables[0].Rows[0]["ResponceCode"].ToString() == "200")
                {
                    var filename = "Eligibility_Fee_Payment_List" + ".xlsx";
                    var eh = new ExcelHelper();
                    var path = ConfigurationManager.AppSettings["DownloadsFolderPath"];
                    DataSet excelds = new DataSet();
                    excelds.Tables.Add(ds.Tables[1].Copy());
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
                    p1.ResponceCode = ds.Tables[0].Rows[0]["ResponceCode"].ToString();
                    p1.ResponceDescription = ds.Tables[0].Rows[0]["ResponceDescription"].ToString();
                    p.Add(p1);

                    return JsonConvert.SerializeObject(p);
                    //return ;

                }
                else
                {
                    List<person> p = new List<person>();
                    person p1 = new person();
                    p1.file = "";
                    p1.ResponceCode = ds.Tables[0].Rows[0]["ResponceCode"].ToString();
                    p1.ResponceDescription = ds.Tables[0].Rows[0]["ResponceDescription"].ToString();
                    p.Add(p1);
                    return JsonConvert.SerializeObject(p);
                }
                //
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_GET_EligibleStudentsListForFeePeyment ", 0, ex.Message);
                return ex.Message;
            }

        }


        public class person
        {
            public string Image { get; set; }
            public string file { get; set; }
            public string ResponceCode { get; set; }
            public string ResponceDescription { get; set; }
        }

        [HttpGet, ActionName("GenerateWantings")]
        public string GenerateWantings(int ExamMonthYearId, int StudentTypeId, string Scheme, int ExamTypeId)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[4];
                param[0] = new SqlParameter("@ExamMonthYearId", ExamMonthYearId);
                param[1] = new SqlParameter("@StudentTypeId", StudentTypeId);
                param[2] = new SqlParameter("@Scheme", Scheme);
                param[3] = new SqlParameter("@ExamTypeId", ExamTypeId);
                DataSet ds = dbHandler.ReturnDataWithStoredProcedure("ADM_GET_3_1_GeneateWantings", param);
                if (ds.Tables[0].Rows[0]["ResponceCode"].ToString() == "200")
                {
                    var ExamMonthYear = ds.Tables[1].Rows[0]["ExamMonthYear"].ToString();
                    var filename = ExamMonthYear + '_' + Scheme + '_' + "Wantings" + ".xlsx";
                    var eh = new ExcelHelper();
                    var path = ConfigurationManager.AppSettings["DownloadsFolderPath"];
                    DataSet excelds = new DataSet();
                    excelds.Tables.Add(ds.Tables[1].Copy());
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
                    p1.ResponceCode = ds.Tables[0].Rows[0]["ResponceCode"].ToString();
                    p1.ResponceDescription = ds.Tables[0].Rows[0]["ResponceDescription"].ToString();
                    p.Add(p1);

                    return JsonConvert.SerializeObject(p);
                    //return ;

                }
                else
                {
                    List<person> p = new List<person>();
                    person p1 = new person();
                    p1.file = "";
                    p1.ResponceCode = ds.Tables[0].Rows[0]["ResponceCode"].ToString();
                    p1.ResponceDescription = ds.Tables[0].Rows[0]["ResponceDescription"].ToString();
                    p.Add(p1);
                    return JsonConvert.SerializeObject(p);
                }
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("ADM_GET_3_1_GeneateWantings", 0, ex.Message);
                return ex.Message;
            }

        }

        [HttpGet, ActionName("PostMarks")]
        public string PostMarks(int ExamMonthYearId, int StudentTypeId, string Scheme, int ExamTypeId, string UserName)
        {
            try
            {

                var dbHandler = new dbHandler();
                var param = new SqlParameter[5];
                param[0] = new SqlParameter("@ExamMonthYearId", ExamMonthYearId);
                param[1] = new SqlParameter("@StudentTypeId", StudentTypeId);
                param[2] = new SqlParameter("@Scheme", Scheme);
                param[3] = new SqlParameter("@ExamTypeId", ExamTypeId);
                param[4] = new SqlParameter("@UserName", UserName);
                DataSet ds = dbHandler.ReturnDataWithStoredProcedure("ADM_SET_2_2_PostMarksWithNrForResultsProcessing", param);

                //if (ds.Tables[0].Rows[0]["ResponceCode"].ToString() == "200")
                //{

                //    var filename = Scheme + "ResultsAutomation" + ".xlsx";
                //    var eh = new ExcelHelper();
                //    var path = ConfigurationManager.AppSettings["DownloadsFolderPath"];
                //    DataSet excelds = new DataSet();
                //    excelds.Tables.Add(ds.Tables[1].Copy());
                //    bool folderExists = Directory.Exists(path);
                //    if (!folderExists)
                //        Directory.CreateDirectory(path);
                //    eh.ExportDataSet(excelds, path + filename);
                //    Timer timer = new Timer(200000);
                //    timer.Elapsed += (sender, e) => elapse(sender, e, ConfigurationManager.AppSettings["DownloadsFolderPath"] + filename);
                //    timer.Start();
                //    return "/Downloads/" + filename;
                //}
                //else
                //{
                //    var response = "err";
                //    return response;
                //}
                return JsonConvert.SerializeObject(ds);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("ADM_SET_2_2_PostMarksWithNrForResultsProcessing", 0, ex.Message);
                return ex.Message;
            }

        }

        [HttpGet, ActionName("GetOdcData")]
        public string GetOdcData(string Scheme, int ExamMonthYearId, string Date)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@Scheme", Scheme);
                param[1] = new SqlParameter("@ExamMonthYearId", ExamMonthYearId);
                param[2] = new SqlParameter("@Date", Date);

                DataSet ds = dbHandler.ReturnDataWithStoredProcedure("USP_GET_MemoDataBySchemeExamMonthYear", param);
                if (ds.Tables[1].Rows[0]["ResponceCode"].ToString() == "200")
                {

                    var filename = Scheme + "-" + "MemosData" + ".xlsx";
                    var eh = new ExcelHelper();
                    var path = ConfigurationManager.AppSettings["DownloadsFolderPath"];
                    DataSet excelds = new DataSet();
                    excelds.Tables.Add(ds.Tables[2].Copy());
                    bool folderExists = Directory.Exists(path);
                    if (!folderExists)
                        Directory.CreateDirectory(path);
                    eh.ExportDataSet(excelds, path + filename);
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

                dbHandler.SaveErorr("USP_GET_MemoDataBySchemeExamMonthYear", 0, ex.Message);
                return ex.Message;
            }

        }


        [HttpGet, ActionName("GetBonafideTypes")]
        public HttpResponseMessage GetBonafideTypes()
        {
            try
            {
                var dbHandler = new dbHandler();
                string StrQuery = "";
                StrQuery = "exec USP_SFP_GetStudyBonafideCertificate";
                return Request.CreateResponse(HttpStatusCode.OK, dbHandler.ReturnDataSet(StrQuery));
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_SFP_GetStudyBonafideCertificate", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }


        [HttpGet, ActionName("GetHomePageSlides")]
        public HttpResponseMessage GetHomePageSlides()
        {
            try
            {
                var dbHandler = new dbHandler();
                string StrQuery = "";
                StrQuery = "exec usp_get_HomePageSlides";
                return Request.CreateResponse(HttpStatusCode.OK, dbHandler.ReturnDataSet(StrQuery));
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("usp_get_HomePageSlides", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }


        [HttpGet, ActionName("GetHomePageSlidesActive")]
        public HttpResponseMessage GetHomePageSlidesActive()
        {
            try
            {
                var dbHandler = new dbHandler();
                string StrQuery = "";
                StrQuery = "exec usp_get_HomePageSlides_Active";
                return Request.CreateResponse(HttpStatusCode.OK, dbHandler.ReturnDataSet(StrQuery));
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("usp_get_HomePageSlides_Active", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpGet, ActionName("GetExamTypeByMonthYear")]
        public string GetExamTypeByMonthYear(int ExamMonthYearId)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@ExamMonthYearId", ExamMonthYearId);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("USP_GET_RegularBacklogByExamMonthYear", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_GET_RegularBacklogByExamMonthYear", 0, ex.Message);
                return ex.Message;
            }

        }



        [HttpGet, ActionName("SetHomePageSlidesStatus")]
        public string SetHomePageSlidesStatus(int Id, int status)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@Id", Id);
                param[1] = new SqlParameter("@status", status);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("usp_set_HomePageSlidesStatus", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("usp_set_HomePageSlidesStatus", 0, ex.Message);
                return ex.Message;
            }

        }


        [HttpGet, ActionName("GetSchemeByPin")]
        public string GetSchemeByPin(string pin)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@pin", pin);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SPB_GET_SchemesByPin", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("SPB_GET_SchemesByPin", 0, ex.Message);
                return ex.Message;
            }

        }

        [HttpGet, ActionName("SetSemester")]
        public string SetSemester(int DataTypeId, string Semester, string UserName, string scheme, int schemeid, bool IsSession1, bool IsSession2, int SequenceId, int semid, bool IsActive)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[10];
                param[0] = new SqlParameter("@DataTypeId", DataTypeId);
                param[1] = new SqlParameter("@Semester", Semester);
                param[2] = new SqlParameter("@UserName", UserName);
                param[3] = new SqlParameter("@scheme", scheme);
                param[4] = new SqlParameter("@schemeid", schemeid);
                param[5] = new SqlParameter("@IsSession1", IsSession1);
                param[6] = new SqlParameter("@IsSession2", IsSession2);
                param[7] = new SqlParameter("@SequenceId", SequenceId);
                param[8] = new SqlParameter("@semid", semid);
                param[9] = new SqlParameter("@IsActive", IsActive);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("ADM_SET_CreateOrUpdateSemesters", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("ADM_SET_CreateOrUpdateSemesters", 0, ex.Message);
                return ex.Message;
            }

        }

        [HttpGet, ActionName("SetAcademicYear")]
        public string SetAcademicYear(int DataTypeId, string AcademicYear, int AcademicStartYear, DateTime StartDate, DateTime EndDate, string UserName, bool IsCurrentAcademicYear, int AcademicID, int ActiveFlag)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[9];
                param[0] = new SqlParameter("@DataTypeId", DataTypeId);
                param[1] = new SqlParameter("@AcademicYear", AcademicYear);
                param[2] = new SqlParameter("@AcademicStartYear", AcademicStartYear);
                param[3] = new SqlParameter("@StartDate", StartDate);
                param[4] = new SqlParameter("@EndDate", EndDate);
                param[5] = new SqlParameter("@UserName", UserName);
                param[6] = new SqlParameter("@IsCurrentAcademicYear", IsCurrentAcademicYear);
                param[7] = new SqlParameter("@AcademicID", AcademicID);
                param[8] = new SqlParameter("@ActiveFlag", ActiveFlag);
                param[8] = new SqlParameter("@ActiveFlag", ActiveFlag);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("ADM_SET_CreateOrUpdateAcademicYears", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("ADM_SET_CreateOrUpdateAcademicYears", 0, ex.Message);
                return ex.Message;
            }

        }

        [HttpPost, ActionName("UploadSign")]
        public string UploadSign([FromBody] UploadData UploadData)
        {
            try
            {

                var CircularUrl = string.Empty;
                string relativePath = string.Empty;
                var path = ConfigurationManager.AppSettings["CoeSignPath"];
                var CircularName = "cesign.Png";
                bool folder = Directory.Exists(path);
                if (!folder)
                    Directory.CreateDirectory(path);
                string CoeSignPath = Path.Combine(path, CircularName);
                byte[] PrincipalimageBytes = Convert.FromBase64String(UploadData.sign);
                File.WriteAllBytes(CoeSignPath, PrincipalimageBytes);
                relativePath = CoeSignPath.Replace(HttpContext.Current.Request.PhysicalApplicationPath, GetWebAppRoot()).Replace(@"\", "/");
                CircularUrl = relativePath;
                List<person> p = new List<person>();
                person p1 = new person();
                p1.ResponceCode = "200";
                p1.ResponceDescription = "Photo Uploaded Successfully";
                p.Add(p1);

                return JsonConvert.SerializeObject(p);
            }
            catch (Exception ex)
            {

                return ex.Message;
            }
        }



        [HttpPost, ActionName("UploadHomePageSlides")]
        public string UploadHomePageSlides([FromBody] JsonObject data)
        {
            try
            {

                var CircularUrl = string.Empty;
                string relativePath = string.Empty;
                var path = ConfigurationManager.AppSettings["HomeSlidesPath"];
                var Name = data["FileName"];
                var CircularName = Name + ".Png";
                bool folder = Directory.Exists(path);
                if (!folder)
                    Directory.CreateDirectory(path);
                string CoeSignPath = Path.Combine(path, CircularName);
                string photoPath = data["photoPath"].ToString();
                byte[] PrincipalimageBytes = Convert.FromBase64String(photoPath);
                File.WriteAllBytes(CoeSignPath, PrincipalimageBytes);
                relativePath = CoeSignPath.Replace(HttpContext.Current.Request.PhysicalApplicationPath, GetWebAppRoot()).Replace(@"\", "/");
                CircularUrl = relativePath;
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@photoPath", CircularUrl);
                var dt = dbHandler.ReturnDataWithStoredProcedure("usp_set_HomePageSlides", param);


                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                return ex.Message;
            }
        }





        [HttpPost, ActionName("AdmissionFilterReport")]
        public string AdmissionFilterReport([FromBody] JsonObject data)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[9];

                param[0] = new SqlParameter("@AcademicYearId", data["AcademicYearId"]);
                param[1] = new SqlParameter("@branchid", data["branchid"]);
                param[2] = new SqlParameter("@categoryid", data["categoryid"]);
                param[3] = new SqlParameter("@admissiontype", data["admissiontype"]);
                param[4] = new SqlParameter("@schemeid", data["schemeid"]);
                param[5] = new SqlParameter("@isphysicallyhandicaped", data["isphysicallyhandicaped"]);
                param[6] = new SqlParameter("@semid", data["semid"]);
                param[7] = new SqlParameter("@collegetype", data["collegetype"]);
                param[8] = new SqlParameter("@DataTypeId", data["DataTypeId"]);

                var dt = dbHandler.ReturnDataWithStoredProcedure("ADM_GET_AdmissionReports", param);

                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("ADM_GET_AdmissionReports", 0, ex.Message);
                return ex.Message;
            }
        }


        [HttpPost, ActionName("SubmitFeedback")]
        public string SubmitFeedback([FromBody] JsonObject data)
        {
            try
            {
                string clientIpAddress = System.Web.HttpContext.Current.Request.UserHostAddress;
                var dbHandler = new dbHandler();
                var param = new SqlParameter[5];
                param[0] = new SqlParameter("@Name", data["Name"]);
                param[1] = new SqlParameter("@Email", data["Email"]);
                param[2] = new SqlParameter("@Mobile", data["Mobile"]);
                param[3] = new SqlParameter("@Message", data["Message"]);
                param[4] = new SqlParameter("@IpAddress", clientIpAddress);

                var dt = dbHandler.ReturnDataWithStoredProcedure("ADM_Set_Feedback", param);

                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("ADM_Set_Feedback", 0, ex.Message);
                return ex.Message;
            }
        }

        [HttpPost, ActionName("uploadJsonData")]
        public string uploadJsonData([FromBody] JsonObject data)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@json", data["Json"].ToString());
                param[1] = new SqlParameter("@type", data["type"]);
                var ds = dbHandler.ReturnDataWithStoredProcedure("SampleSP_set", param);
                return JsonConvert.SerializeObject(ds);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("SampleSP_set", 0, ex.StackTrace);
                return ex.StackTrace;
            }
        }

        [HttpPost, ActionName("AdmissionSubReportPinList")]
        public string AdmissionSubReportPinList([FromBody] JsonObject data)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[10];
                param[0] = new SqlParameter("@CollegeCode", data["CollegeCode"]);
                param[1] = new SqlParameter("@BranchId", data["BranchId"]);
                param[2] = new SqlParameter("@SemId", data["SemId"]);
                param[3] = new SqlParameter("@AcademicYearId", data["AcademicYearId"]);
                param[4] = new SqlParameter("@DataFormatTypeId", data["DataFormatTypeId"]);
                param[5] = new SqlParameter("@categoryid", data["categoryid"]);
                param[6] = new SqlParameter("@admissiontype", data["admissiontype"]);
                param[7] = new SqlParameter("@schemeid", data["schemeid"]);
                param[8] = new SqlParameter("@isphysicallyhandicaped", data["isphysicallyhandicaped"]);
                param[9] = new SqlParameter("@DataTypeId", data["DataTypeId"]);

                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_Admission_GET_DashBoradReportPinList", param);

                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_Admission_GET_DashBoradReportPinList", 0, ex.Message);
                return ex.Message;
            }
        }


        [HttpPost, ActionName("AdmissionFilterReportExcel")]
        public string AdmissionFilterReportExcel([FromBody] JsonObject data)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[9];

                param[0] = new SqlParameter("@AcademicYearId", data["AcademicYearId"]);
                param[1] = new SqlParameter("@branchid", data["branchid"]);
                param[2] = new SqlParameter("@categoryid", data["categoryid"]);
                param[3] = new SqlParameter("@admissiontype", data["admissiontype"]);
                param[4] = new SqlParameter("@schemeid", data["schemeid"]);
                param[5] = new SqlParameter("@isphysicallyhandicaped", data["isphysicallyhandicaped"]);
                param[6] = new SqlParameter("@semid", data["semid"]);
                param[7] = new SqlParameter("@collegetype", data["collegetype"]);
                param[8] = new SqlParameter("@DataTypeId", data["DataTypeId"]);

                var dt = dbHandler.ReturnDataWithStoredProcedure("ADM_GET_AdmissionReports", param);

                //return JsonConvert.SerializeObject(dt);
                if (dt.Tables[0].Rows.Count > 0)
                {

                    string filename = "AdmissionReports" + ".xlsx";

                    var eh = new ExcelHelper();
                    var path = ConfigurationManager.AppSettings["DownloadsFolderPath"];
                    bool folderExists = Directory.Exists(path);
                    if (!folderExists)
                        Directory.CreateDirectory(path);
                    eh.ExportDataSet(dt, path + filename);
                    Timer timer = new Timer(200000);
                    timer.Elapsed += (sender, e) => elapse(sender, e, ConfigurationManager.AppSettings["DownloadsFolderPath"] + filename);
                    timer.Start();


                    var file = "/Downloads/" + filename;
                    List<person> p = new List<person>();
                    person p1 = new person();
                    p1.file = file;

                    p.Add(p1);

                    return JsonConvert.SerializeObject(p);
                    //return ;

                }
                else
                {
                    List<person> p = new List<person>();
                    person p1 = new person();
                    p1.file = "";

                    p.Add(p1);
                    return JsonConvert.SerializeObject(p);
                }
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_Admission_GET_DashBoradReports", 0, ex.Message);
                return ex.Message;
            }
        }

        [HttpPost, ActionName("AdmissionBranchReportsFilterExcel")]
        public string AdmissionBranchReportsFilterExcel([FromBody] JsonObject data)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[9];

                param[0] = new SqlParameter("@AcademicYearId", data["AcademicYearId"]);
                param[1] = new SqlParameter("@branchid", data["branchid"]);
                param[2] = new SqlParameter("@categoryid", data["categoryid"]);
                param[3] = new SqlParameter("@admissiontype", data["admissiontype"]);
                param[4] = new SqlParameter("@schemeid", data["schemeid"]);
                param[5] = new SqlParameter("@isphysicallyhandicaped", data["isphysicallyhandicaped"]);
                param[6] = new SqlParameter("@semid", data["semid"]);
                param[7] = new SqlParameter("@collegetype", data["collegetype"]);
                param[8] = new SqlParameter("@DataTypeId", data["DataTypeId"]);

                var dt = dbHandler.ReturnDataWithStoredProcedure("ADM_GET_AdmissionReports", param);

                //return JsonConvert.SerializeObject(dt);
                if (dt.Tables[0].Rows.Count > 0)
                {

                    string filename = "Branchwise_AdmissionReports" + ".xlsx";

                    var eh = new ExcelHelper();
                    var path = ConfigurationManager.AppSettings["DownloadsFolderPath"];
                    bool folderExists = Directory.Exists(path);
                    if (!folderExists)
                        Directory.CreateDirectory(path);
                    eh.ExportDataSet(dt, path + filename);
                    Timer timer = new Timer(200000);
                    timer.Elapsed += (sender, e) => elapse(sender, e, ConfigurationManager.AppSettings["DownloadsFolderPath"] + filename);
                    timer.Start();


                    var file = "/Downloads/" + filename;
                    List<person> p = new List<person>();
                    person p1 = new person();
                    p1.file = file;

                    p.Add(p1);

                    return JsonConvert.SerializeObject(p);
                    //return ;

                }
                else
                {
                    List<person> p = new List<person>();
                    person p1 = new person();
                    p1.file = "";

                    p.Add(p1);
                    return JsonConvert.SerializeObject(p);
                }
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_Admission_GET_DashBoradReports", 0, ex.Message);
                return ex.Message;
            }
        }

        [HttpPost, ActionName("SendAttendance")]
        public HttpResponseMessage SendAttendance(HttpRequestMessage request)
        {
            //try
            //{

            //    //var apikey = request.Headers.GetValues("apikey").FirstOrDefault();
            //    //var apikey = request.Headers.GetValues("apikey").FirstOrDefault();
            //    var apikeyOrig = ConfigurationManager.AppSettings["AttendanceSharingApiKey"].ToString();
            //    if (apikeyOrig !="")
            //    {
            //        var response = Request.CreateResponse(HttpStatusCode.Forbidden);
            //        response.Content = new StringContent(JsonConvert.SerializeObject("{\"respcode\":\"403\",\"respdesc\" = \"Invalid Api Key\"\" }"), System.Text.Encoding.UTF8, "application/json");
            //        SendSms(1, 0, " Attendance is Unsuccessfully while Pushing into DataBase because respcode 403 , respdesc Invalid Api Key");
            //        return response;
            //    }
            //}
            //catch (Exception)
            //{
            //    SendSms(1, 0, " Attendance is Unsuccessfully while Pushing into DataBase because respcode 403 , respdesc Invalid Api Key");
            //    var response = Request.CreateResponse(HttpStatusCode.Forbidden);
            //    response.Content = new StringContent(JsonConvert.SerializeObject("{\"respcode\":\"403\",\"respdesc\" = \"Invalid Api Key\"\" }"), System.Text.Encoding.UTF8, "application/json");
            //    return response;
            //}
            try
            {

                string Attendancejson = "" + request.Content.ReadAsStringAsync().Result;
                #region RequestLog
                try
                {
                    //TODO: add Log to Mongo DB
                    //System.IO.File.WriteAllText($"AttendanceLog/{DateTime.Now.ToString("dddd, dd MMMM yyyy HH:mm:ss").Replace(":", ".")}.json", Attendancejson);
                }
                catch (Exception ex) { }
                #endregion
                if (Attendancejson != "")
                {
                    JObject obj = JObject.Parse(Attendancejson);
                    string optype = "" + obj["optype"];
                    string totalrecords = "" + obj["totalrecords"];
                    string hlevel = "" + obj["hlevel"];
                    string holidaydate = "" + obj["holidaydate"];
                    string holidaycategory = "" + obj["holidaycategory"];
                    JArray dataarray = obj["data"].Value<JArray>();
                    var attjson = JsonConvert.SerializeObject(dataarray);
                    //TODO: add Log to Mongo DB
                    //string datetofile = DateTime.Now.ToString("dddd, dd MMMM yyyy HH:mm:ss").Replace(":", ".") + ".json";
                    //var attendancefile = ConfigurationManager.AppSettings["AttendanceFile"].ToString();
                    //AttendanceService.WriteToJsonFile(attendancefile + datetofile, obj);
                    var dbHandler = new dbHandler();
                    var param = new SqlParameter[5];
                    param[0] = new SqlParameter("@OpType", optype);
                    param[1] = new SqlParameter("@TotalRecords", totalrecords);
                    param[2] = new SqlParameter("@HLevel", hlevel);
                    param[3] = new SqlParameter("@Holidaydate", holidaydate);
                    param[4] = new SqlParameter("@json", attjson);
                    DataTable dt = dbHandler.ReturnDataWithStoredProcedureTable("USP_SET_ATTENDENCE_API_INSERTION", param);
                    try
                    {
                        UpdateWorkingDays();
                    }
                    catch (Exception ex) { }
                    if (dt.Rows.Count > 0)
                    {
                        int rescode = (int)dt.Rows[0][0];
                        string respdesc = (string)dt.Rows[0][1];
                        var response = Request.CreateResponse(HttpStatusCode.OK);
                        response.Content = new StringContent(JsonConvert.SerializeObject("{\"respcode\":\"" + rescode + "\",\"respdesc\" : \"" + respdesc + "\"}"), System.Text.Encoding.UTF8, "application/json");

                        //succuss message
                        // SendSms(1, 1, " Attendance Successfully Pushed into DataBase");
                        return response;


                    }
                    else
                    {

                        var response = Request.CreateResponse(HttpStatusCode.InternalServerError);
                        response.Content = new StringContent(JsonConvert.SerializeObject("{\"respcode\":\"500\",\"respdesc\" : \"Server Error\"\" }"), System.Text.Encoding.UTF8, "application/json");
                        SendSms(1, 0, " Attendance is Unsuccessfully while Pushing into DataBase Because respcode : 500, respdesc: Server Error");
                        return response;

                    }
                }
            }
            catch (FormatException)
            {

                var response = Request.CreateResponse(HttpStatusCode.NotAcceptable);
                response.Content = new StringContent(JsonConvert.SerializeObject("{\"respcode\":\"406\",\"respdesc\" : \"Unprocessable Entity, Check the json data format \" }"), System.Text.Encoding.UTF8, "application/json");
                SendSms(1, 0, " Attendance is Unsuccessfully while Pushing into DataBase Because respcode : 406, respdesc : Unprocessable Entity, Check the json data format");
                return response;
            }
            catch (Exception ex)
            {
                var response = Request.CreateResponse(HttpStatusCode.InternalServerError);
                response.Content = new StringContent(JsonConvert.SerializeObject("{\"respcode\":\"500\",\"respdesc\" : \"" + ex.Message + "\" }"), System.Text.Encoding.UTF8, "application/json");
                SendSms(1, 0, " Attendance is Unsuccessfully while Pushing into DataBase Because respcode : 500");

                return response;

            }
            var res = Request.CreateResponse(HttpStatusCode.NotAcceptable);
            res.Content = new StringContent(JsonConvert.SerializeObject("{\"respcode\":\"406\",\"respdesc\" : \"Unprocessable Entity, Check the json data format \" }"), System.Text.Encoding.UTF8, "application/json");
            SendSms(1, 0, " Attendance is Unsuccessfully while Pushing into DataBase Because respcode : 406, respdesc : Unprocessable Entity, Check the json data format");
            return res;
        }

        public class PhoneMessageData
        {
            public string Mobile { get; set; }
            public string Message { get; set; }
        }
        public void SendSms(int p1, int p2, string Message)
        {

            var dbHandler1 = new dbHandler();
            var param1 = new SqlParameter[2];
            var dt1 = new DataTable();
            var map = new Dictionary<string, string>();
            string Josn = string.Empty;
            List<PhoneMessageData> listPhoneMessageData = new List<PhoneMessageData>();
            JsonObject jsonObject = new JsonObject();
            CommunicationController communicationController = new CommunicationController();

            param1[0] = new SqlParameter("@ExamType", p1);
            param1[1] = new SqlParameter("@Status", p2);
            dt1 = dbHandler1.ReturnDataWithStoredProcedureTable("USP_Attendace_GET_PhoneNumbers", param1);
            if (dt1.Rows.Count > 0)
            {
                foreach (DataRow dtRow in dt1.Rows)
                {
                    var Name = dtRow["Name"].ToString();
                    var PhoneNumber = dtRow["PhoneNumber"].ToString();
                    if (!map.ContainsKey(PhoneNumber))
                    {
                        map.Add(PhoneNumber, "Hi, " + Name + Message);
                    }
                }
            }

            foreach (string key in map.Keys)
            {
                PhoneMessageData phoneMessageData = new PhoneMessageData();
                phoneMessageData.Mobile = key;
                phoneMessageData.Message = map[key];
                listPhoneMessageData.Add(phoneMessageData);
            }


            jsonObject["data"] = listPhoneMessageData;
            communicationController.BulkListSendSms(jsonObject);


        }


        [HttpGet, ActionName("UpdateWorkingDays")]
        public void UpdateWorkingDays()
        {

            try
            {
                AbasWorkingDays d = new AbasWorkingDays();
                var clientUrl = ConfigurationManager.AppSettings["BMA_API_ROOT"];
                var client = new RestClient(clientUrl);

                //-----------getting all departments working days--------------
                var semstartdatealldep = ConfigurationManager.AppSettings["All_Dep_startDate"];
                var deptflag = 0;
                string apistring = string.Empty;
                string apiparams = "/getworkingdays?groupid=1004&startdate={0}&flag={1}";
                apistring = string.Format(apiparams, semstartdatealldep, deptflag);
                var req = new RestRequest(apistring, Method.POST);
                req.AddHeader("apikey", ConfigurationManager.AppSettings["BMA_API_Key"]);
                var data = client.Post<AbasWorkingDays>(req).Data;
                var db = new dbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@data", SqlDbType.VarChar, -1);
                param[0].Value = JsonConvert.SerializeObject(data.orglist);
                param[1] = new SqlParameter("@deptType", deptflag);
                param[2] = new SqlParameter("@startdate", semstartdatealldep);
                db.ReturnDataWithStoredProcedure("usp_SaveAbasWorkingDays", param);

                //-----------getting pharmacy 1st year college working days--------------            
                var client1 = new RestClient(clientUrl);
                var semstartdatepharm1styear = ConfigurationManager.AppSettings["Pharm_1styearStartDate"];
                deptflag = 1;
                apistring = string.Format(apiparams, semstartdatepharm1styear, deptflag);
                var req1 = new RestRequest(apistring, Method.POST);
                req1.AddHeader("apikey", ConfigurationManager.AppSettings["BMA_API_Key"]);
                var data1 = client.Post<AbasWorkingDays>(req1).Data;
                var db1 = new dbHandler();
                var param1 = new SqlParameter[3];
                param1[0] = new SqlParameter("@data", SqlDbType.VarChar, -1);
                param1[0].Value = JsonConvert.SerializeObject(data1.orglist);
                param1[1] = new SqlParameter("@deptType", deptflag);
                param1[2] = new SqlParameter("@startdate", semstartdatepharm1styear);
                db.ReturnDataWithStoredProcedure("usp_SaveAbasWorkingDays", param1);

                //-----------getting pharmacy 2nd year college working days--------------             
                var client2 = new RestClient(clientUrl);
                var semstartdatepharm2ndyear = ConfigurationManager.AppSettings["Pharm_2ndyearStartDate"];
                deptflag = 1;
                apistring = string.Format(apiparams, semstartdatepharm2ndyear, deptflag);
                var req2 = new RestRequest(apistring, Method.POST);
                req2.AddHeader("apikey", ConfigurationManager.AppSettings["BMA_API_Key"]);
                var data2 = client.Post<AbasWorkingDays>(req2).Data;
                var param2 = new SqlParameter[3];
                param2[0] = new SqlParameter("@data", SqlDbType.VarChar, -1);
                param2[0].Value = JsonConvert.SerializeObject(data2.orglist);
                param2[1] = new SqlParameter("@deptType", deptflag);
                param2[2] = new SqlParameter("@startdate", semstartdatepharm2ndyear);
                db.ReturnDataWithStoredProcedure("usp_SaveAbasWorkingDays", param2);

                //Dataset res= new StringContent(JsonConvert.SerializeObject("{\"respcode\":\"200\",\"respdesc\" : \"Attendance Data Pushed \" }"), System.Text.Encoding.UTF8, "application/json");
                //var response = Request.CreateResponse(HttpStatusCode.OK);
                // response.Content = new StringContent(JsonConvert.SerializeObject("{\"respcode\":\"" +" \"200\" "+ "\",\"respdesc\" : \"" +"\" Attendance Data Pushed\""+ "\" }"), System.Text.Encoding.UTF8, "application/json");
                // return response;

                //succuss message
                // SendSms(2, 1, " Updated Working Days Successfully Pushed into DataBase");

                //try
                //{
                // ProcessAttendanceDisplay();
                //}
                // catch (Exception ex) { }
            }
            catch (Exception ex)
            {
                SendSms(2, 0, " Updated Working Days Unsuccessfully Updated in DataBase");
                dbHandler.SaveErorr("usp_SaveAbasWorkingDays", 0, ex.Message);
            }
        }

        [HttpGet, ActionName("ProcessAttendanceDisplay")]
        public void ProcessAttendanceDisplay()
        {
            try
            {
                var dbHandler = new dbHandler();
                string StrQuery = "";
                StrQuery = "exec USP_SET_AttendenceDisplay";
                dbHandler.ReturnDataSet(StrQuery);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_SET_AttendenceDisplay", 0, ex.Message);
            }
        }



        [HttpPost, ActionName("AdmissionSubReportsFilter")]
        public string AdmissionSubReportsFilter([FromBody] JsonObject request)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[11];
                param[0] = new SqlParameter("@CollegeCode", request["CollegeCode"]);
                param[1] = new SqlParameter("@UserId", request["UserId"]);
                param[2] = new SqlParameter("@AcademicYearId", request["AcademicYearId"]);
                param[3] = new SqlParameter("@branchid", request["branchid"]);
                param[4] = new SqlParameter("@categoryid", request["categoryid"]);
                param[5] = new SqlParameter("@admissiontype", request["admissiontype"]);
                param[6] = new SqlParameter("@schemeid", request["schemeid"]);
                param[7] = new SqlParameter("@isphysicallyhandicaped", request["isphysicallyhandicaped"]);
                param[8] = new SqlParameter("@semid", request["semid"]);
                param[9] = new SqlParameter("@collegetype", request["collegetype"]);
                param[10] = new SqlParameter("@DataTypeId", request["DataTypeId"]);

                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_Admission_GET_DashBoradReports", param);

                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_Admission_GET_DashBoradReports", 0, ex.Message);
                return ex.Message;
            }
        }

        [HttpPost, ActionName("AdmissionSubReportsFilterExcel")]
        public string AdmissionSubReportsFilterExcel([FromBody] JsonObject request)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[11];
                param[0] = new SqlParameter("@CollegeCode", request["CollegeCode"]);
                param[1] = new SqlParameter("@UserId", request["UserId"]);
                param[2] = new SqlParameter("@AcademicYearId", request["AcademicYearId"]);
                param[3] = new SqlParameter("@branchid", request["branchid"]);
                param[4] = new SqlParameter("@categoryid", request["categoryid"]);
                param[5] = new SqlParameter("@admissiontype", request["admissiontype"]);
                param[6] = new SqlParameter("@schemeid", request["schemeid"]);
                param[7] = new SqlParameter("@isphysicallyhandicaped", request["isphysicallyhandicaped"]);
                param[8] = new SqlParameter("@semid", request["semid"]);
                param[9] = new SqlParameter("@collegetype", request["collegetype"]);
                param[10] = new SqlParameter("@DataTypeId", request["DataTypeId"]);

                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_Admission_GET_DashBoradReports", param);
                if (dt.Tables[0].Rows.Count > 0)
                {

                    string filename = "AdmissionSubReports" + ".xlsx";

                    var eh = new ExcelHelper();
                    var path = ConfigurationManager.AppSettings["DownloadsFolderPath"];
                    bool folderExists = Directory.Exists(path);
                    if (!folderExists)
                        Directory.CreateDirectory(path);
                    eh.ExportDataSet(dt, path + filename);
                    Timer timer = new Timer(200000);
                    timer.Elapsed += (sender, e) => elapse(sender, e, ConfigurationManager.AppSettings["DownloadsFolderPath"] + filename);
                    timer.Start();


                    var file = "/Downloads/" + filename;
                    List<person> p = new List<person>();
                    person p1 = new person();
                    p1.file = file;

                    p.Add(p1);

                    return JsonConvert.SerializeObject(p);
                    //return ;

                }
                else
                {
                    List<person> p = new List<person>();
                    person p1 = new person();
                    p1.file = "";

                    p.Add(p1);
                    return JsonConvert.SerializeObject(p);
                }
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_Admission_GET_DashBoradReports", 0, ex.Message);
                return ex.Message;
            }
        }

        [HttpGet, ActionName("getAdminTransferReportExcel")]
        public string getAdminTransferReportExcel(int AcademicYearId)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@AcademicYearId", AcademicYearId);
                DataSet ds = dbHandler.ReturnDataWithStoredProcedure("USP_SFP_GET_TransferReport", param);
                if (ds.Tables[0].Rows.Count > 0)
                {

                    string filename = "Transfer " + "-" + "Reports" + "_" + Guid.NewGuid() + ".xlsx";

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


        public class SscDetails
        {
            public string RollNo { get; set; }
            public string Year { get; set; }
            public string Stream { get; set; }
        }

        [HttpPost, ActionName("GetSSCDetails")]
        public async Task<HttpResponseMessage> GetSSCDetails([FromBody] SscDetails ReqData)
        {

            var url = ConfigurationManager.AppSettings["SSC_API"].ToString();
            var urlwithparam = url + "?RollNo=" + ReqData.RollNo + "&Year=" + ReqData.Year + "&Stream=" + ReqData.Stream + "&channel=SBTT&password=S2T20"; ;
            HttpResponseMessage response = new HttpResponseMessage();
            using (HttpClient client = new HttpClient())
            {
                try
                {
                    var resMsg = await client.GetAsync(urlwithparam);
                    var content = await resMsg.Content.ReadAsStringAsync();

                    var PIDResponseXML = new XmlDocument();
                    PIDResponseXML.LoadXml(content);
                    var jsonData = JsonConvert.SerializeXmlNode(PIDResponseXML, Newtonsoft.Json.Formatting.None, true);
                    return Request.CreateResponse(HttpStatusCode.OK, jsonData);

                }
                catch (Exception ex)
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound, ex.Message);
                }

            }
        }



        [HttpGet, ActionName("UpdateMobileNumber")]
        public string UpdateMobileNumber(string Pin, string PhoneNumber)
        {
            try
            {

                var dbHandler = new dbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@Pin", Pin);
                param[1] = new SqlParameter("@PhoneNumber", PhoneNumber);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SFP_SET_UpdateStudentPhoneNumber", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }


        [HttpGet, ActionName("EnableFeePayment")]
        public string EnableFeePayment(int ExamMonthYear, string Pin, int studenttypeid, float ExamFee, float LateFee, float TatkalFee, float PremiumTatkalFee, int Semid = 0)
        {
            try
            {

                var dbHandler = new dbHandler();
                var param = new SqlParameter[8];
                param[0] = new SqlParameter("@ExamMonthYear", ExamMonthYear);
                param[1] = new SqlParameter("@Pin", Pin);
                param[2] = new SqlParameter("@studenttypeid", studenttypeid);
                param[3] = new SqlParameter("@ExamFee", ExamFee);
                param[4] = new SqlParameter("@LateFee", LateFee);
                param[5] = new SqlParameter("@TatkalFee", TatkalFee);
                param[6] = new SqlParameter("@PremiumTatkalFee", PremiumTatkalFee);
                param[7] = new SqlParameter("@Semid", Semid);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SFP_SET_ManualUpdation", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }


        [HttpGet, ActionName("getDetailsByPins")]
        public string getDetailsByPins(string pin)
        {
            try
            {
                string Pin = GetDecryptedData(pin);
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@pin", Pin);

                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SS_GET_InteriamCertificateDetails ", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }

        [HttpGet, ActionName("GetScheme")]
        public HttpResponseMessage GetScheme()
        {
            try
            {
                var dbHandler = new dbHandler();
                string StrQuery = "";
                StrQuery = "exec ADM_GET_AllSchemeDetails";
                return Request.CreateResponse(HttpStatusCode.OK, dbHandler.ReturnDataSet(StrQuery));
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("ADM_GET_AllSchemeDetails", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpGet, ActionName("GetOdcReasons")]
        public HttpResponseMessage GetOdcReasons()
        {
            try
            {
                var dbHandler = new dbHandler();
                string StrQuery = "";
                StrQuery = "exec USP_SFP_GET_OdcReasons";
                return Request.CreateResponse(HttpStatusCode.OK, dbHandler.ReturnDataSet(StrQuery));
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_SFP_GET_OdcReasons", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpGet, ActionName("get6thSemStudiedReport")]
        public HttpResponseMessage get6thSemStudiedReport()
        {
            try
            {
                var dbHandler = new dbHandler();
                string StrQuery = "";
                StrQuery = "exec USP_GET_6thSemStudiedReports;";
                return Request.CreateResponse(HttpStatusCode.OK, dbHandler.ReturnDataSet(StrQuery));
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_GET_6thSemStudiedReports", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpGet, ActionName("getAdminSyllabusCoverageReport")]
        public string getAdminSyllabusCoverageReport(int DataTypeId, string CollegeCode = null, string BranchCode = null)
        {
            try
            {

                var dbHandler = new dbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@DataTypeId", DataTypeId);
                param[1] = new SqlParameter("@CollegeCode", CollegeCode);
                param[2] = new SqlParameter("@BranchCode", BranchCode);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_GET_SyllabusCoverageReportsforAdmin", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }






        [HttpGet, ActionName("getSubjectList")]
        public string getSubjectList()
        {
            try
            {
                var dbHandler = new dbHandler();
                string StrQuery = "";
                StrQuery = "exec USP_SS_GET_SubjectMaster";
                DataSet ds = dbHandler.ReturnDataSet(StrQuery);
                var filename = "Subject_Master" + ".xlsx";
                var eh = new ExcelHelper();
                var path = ConfigurationManager.AppSettings["DownloadsFolderPath"];
                bool folderExists = Directory.Exists(path);
                if (!folderExists)
                    Directory.CreateDirectory(path);
                eh.ExportDataSet(ds, path + filename);
                Timer timer = new Timer(200000);
                timer.Elapsed += (sender, e) => elapse(sender, e, ConfigurationManager.AppSettings["DownloadsFolderPath"] + filename);
                timer.Start();

                //return filename;
                return "/Downloads/" + filename;
                //return Request.CreateResponse(HttpStatusCode.OK, dbHandler.ReturnDataSet(StrQuery));

            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }


        [HttpGet, ActionName("get6thSemStudiedReportExcel")]
        public string get6thSemStudiedReportExcel()
        {
            try
            {
                var dbHandler = new dbHandler();
                string StrQuery = "";
                StrQuery = "exec USP_GET_6thSemStudiedReports";
                DataSet ds = dbHandler.ReturnDataSet(StrQuery);
                var filename = "6thSemStudied_Reports" + ".xlsx";
                var eh = new ExcelHelper();
                var path = ConfigurationManager.AppSettings["DownloadsFolderPath"];
                bool folderExists = Directory.Exists(path);
                if (!folderExists)
                    Directory.CreateDirectory(path);
                eh.ExportDataSet(ds, path + filename);
                Timer timer = new Timer(200000);
                timer.Elapsed += (sender, e) => elapse(sender, e, ConfigurationManager.AppSettings["DownloadsFolderPath"] + filename);
                timer.Start();

                //return filename;
                return "/Downloads/" + filename;
                //return Request.CreateResponse(HttpStatusCode.OK, dbHandler.ReturnDataSet(StrQuery));

            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }



        [HttpGet, ActionName("GetPromotionalList")]
        public string GetPromotionalList()
        {

            List<person> p = new List<person>();
            person p1 = new person();

            try
            {
                var dbHandler = new dbHandler();
                string StrQuery = "";
                StrQuery = "exec USP_GET_PromotionalEligibleStudentsList";
                DataSet ds = dbHandler.ReturnDataSet(StrQuery);
                var filename = "Promotional_List" + "_" + Guid.NewGuid() + ".xlsx";
                var eh = new ExcelHelper();
                var path = ConfigurationManager.AppSettings["DownloadsFolderPath"];
                bool folderExists = Directory.Exists(path);
                if (!folderExists)
                    Directory.CreateDirectory(path);
                eh.ExportDataSet(ds, path + filename);
                Timer timer = new Timer(200000);
                timer.Elapsed += (sender, e) => elapse(sender, e, ConfigurationManager.AppSettings["DownloadsFolderPath"] + filename);
                timer.Start();
                var file = "/Downloads/" + filename;
                p1.file = file;
                p1.ResponceCode = "200";
                p1.ResponceDescription = ds.Tables[0].Rows[0]["ResponceDescription"].ToString();
                p.Add(p1);

                return JsonConvert.SerializeObject(p);
                //return Request.CreateResponse(HttpStatusCode.OK, dbHandler.ReturnDataSet(StrQuery));

            }
            catch (Exception ex)
            {
                p1.file = "";
                p1.ResponceCode = "200";
                p1.ResponceDescription = ex.Message;
                p.Add(p1);

                return JsonConvert.SerializeObject(p);

            }
        }


        [HttpGet, ActionName("getSyllabusReportExcel")]
        public string getSyllabusReportExcel(int DataTypeId, string CollegeCode = null, string BranchCode = null)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@DataTypeId", DataTypeId);
                param[1] = new SqlParameter("@CollegeCode", CollegeCode);
                param[2] = new SqlParameter("@BranchCode", BranchCode);
                DataSet ds = dbHandler.ReturnDataWithStoredProcedure("USP_GET_SyllabusCoverageReportsforAdmin", param);
                var filename = "Syllabus_Report" + ".xlsx";
                var eh = new ExcelHelper();
                var path = ConfigurationManager.AppSettings["DownloadsFolderPath"];
                bool folderExists = Directory.Exists(path);
                if (!folderExists)
                    Directory.CreateDirectory(path);
                eh.ExportDataSet(ds, path + filename);
                Timer timer = new Timer(200000);
                timer.Elapsed += (sender, e) => elapse(sender, e, ConfigurationManager.AppSettings["DownloadsFolderPath"] + filename);
                timer.Start();

                //return filename;
                return "/Downloads/" + filename;
                //return Request.CreateResponse(HttpStatusCode.OK, dbHandler.ReturnDataSet(StrQuery));

            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpGet, ActionName("getTantalizationReport")]
        public string getTantalizationReport()
        {
            try
            {
                var dbHandler = new dbHandler();
                string StrQuery = "";
                StrQuery = "exec USP_GET_TantalizedReports";
                DataSet ds = dbHandler.ReturnDataSet(StrQuery);
                var filename = "Tantalization_Report" + ".xlsx";
                var eh = new ExcelHelper();
                var path = ConfigurationManager.AppSettings["DownloadsFolderPath"];
                bool folderExists = Directory.Exists(path);
                if (!folderExists)
                    Directory.CreateDirectory(path);
                eh.ExportDataSet(ds, path + filename);
                Timer timer = new Timer(200000);
                timer.Elapsed += (sender, e) => elapse(sender, e, ConfigurationManager.AppSettings["DownloadsFolderPath"] + filename);
                timer.Start();

                //return filename;
                return "/Downloads/" + filename;
                //return Request.CreateResponse(HttpStatusCode.OK, dbHandler.ReturnDataSet(StrQuery));

            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpGet, ActionName("getSubjectList1")]
        public HttpResponseMessage getSubjectList1()
        {
            try
            {
                var dbHandler = new dbHandler();
                string StrQuery = "";
                StrQuery = "exec USP_SS_GET_SubjectMaster_1";
                return Request.CreateResponse(HttpStatusCode.OK, dbHandler.ReturnDataSet(StrQuery));
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_SS_GET_SubjectMaster_1", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpGet, ActionName("getAttendanceSMSList")]
        public HttpResponseMessage getAttendanceSMSList()
        {
            try
            {
                var dbHandler = new dbHandler();
                string StrQuery = "";
                StrQuery = "exec USP_GET_AttendanceSMSList";
                return Request.CreateResponse(HttpStatusCode.OK, dbHandler.ReturnDataSet(StrQuery));
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_GET_AttendanceSMSList", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpGet, ActionName("GetSubjectMasterDetails")]
        public HttpResponseMessage GetSubjectMasterDetails(string scheme, string SubjectCode)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@scheme", scheme);
                param[1] = new SqlParameter("@SubjectCode", SubjectCode);
                DataSet ds = dbHandler.ReturnDataWithStoredProcedure("USP_GET_SubjectMasterDetailsUpdation", param);
                return Request.CreateResponse(HttpStatusCode.OK, ds);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_GET_SubjectMasterDetailsUpdation", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }


        [HttpGet, ActionName("UpdateSubjectMasterDetails")]
        public HttpResponseMessage UpdateSubjectMasterDetails(int SubId, string Subject_Code, string SubjectName, bool iselective, bool BoardQuestionPaper, bool AnswerBookLet, string Mid1Max_Marks = null, string Mid2Max_Marks = null, string Mid3Max_Marks = null, string InternalMax_Marks = null, string end_exam_max_marks = null, string Credits = null, string PCode = null)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[13];
                param[0] = new SqlParameter("@SubId", SubId);
                param[1] = new SqlParameter("@Subject_Code", Subject_Code);
                param[2] = new SqlParameter("@SubjectName", SubjectName);
                param[3] = new SqlParameter("@iselective", iselective);
                param[4] = new SqlParameter("@BoardQuestionPaper", BoardQuestionPaper);
                param[5] = new SqlParameter("AnswerBookLet", AnswerBookLet);
                param[6] = new SqlParameter("@Mid1Max_Marks", GetValueOrNull<float>(Mid1Max_Marks));
                param[7] = new SqlParameter("@Mid2Max_Marks", GetValueOrNull<float>(Mid2Max_Marks));
                param[8] = new SqlParameter("@Mid3Max_Marks", GetValueOrNull<float>(Mid3Max_Marks));
                param[9] = new SqlParameter("@InternalMax_Marks", GetValueOrNull<float>(InternalMax_Marks));
                param[10] = new SqlParameter("@end_exam_max_marks", GetValueOrNull<float>(end_exam_max_marks));
                param[11] = new SqlParameter("@Credits", GetValueOrNull<float>(Credits));
                param[12] = new SqlParameter("@PCode", PCode);
                DataSet ds = dbHandler.ReturnDataWithStoredProcedure("USP_SET_SubjectMasterDetailsUpdation", param);
                return Request.CreateResponse(HttpStatusCode.OK, ds);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_SET_SubjectMasterDetailsUpdation", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }


        [HttpGet, ActionName("getElectiveMappedReport")]
        public string getElectiveMappedReport(int UserTypeId, String CollegeCode = null, String BranchCode = null)
        {
            try
            {

                var dbHandler = new dbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@UserTypeId", UserTypeId);
                param[1] = new SqlParameter("@CollegeCode", CollegeCode);
                param[2] = new SqlParameter("@BranchCode", BranchCode);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_GET_ElectiveMappedReportsCounts", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }


        [HttpGet, ActionName("getElectiveMappedReportExcel")]
        public string getElectiveMappedReportExcel(int UserTypeId, String CollegeCode = null, String BranchCode = null)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@UserTypeId", UserTypeId);
                param[1] = new SqlParameter("@CollegeCode", CollegeCode);
                param[2] = new SqlParameter("@BranchCode", BranchCode);
                DataSet ds = dbHandler.ReturnDataWithStoredProcedure("USP_GET_ElectiveMappedReportsCounts", param);
                if (ds.Tables[0].Rows[0]["ResponceCode"].ToString() == "200")
                {

                    var filename = "ElectiveMappedReport" + "_" + Guid.NewGuid() + ".xlsx";
                    var eh = new ExcelHelper();
                    var path = ConfigurationManager.AppSettings["DownloadsFolderPath"];
                    DataSet excelds = new DataSet();
                    excelds.Tables.Add(ds.Tables[1].Copy());
                    bool folderExists = Directory.Exists(path);
                    if (!folderExists)
                        Directory.CreateDirectory(path);
                    eh.ExportDataSet(excelds, path + filename);
                    Timer timer = new Timer(200000);
                    timer.Elapsed += (sender, e) => elapse(sender, e, ConfigurationManager.AppSettings["DownloadsFolderPath"] + filename);
                    timer.Start();
                    return "/Downloads/" + filename;
                }
                else
                {
                    return JsonConvert.SerializeObject(ds);
                }
            }
            catch (Exception ex)
            {
                return ex.Message;

            }

        }

        [HttpGet, ActionName("getSubjectWiseElectiveMappedReportExcel")]
        public string getSubjectWiseElectiveMappedReportExcel(int UserTypeId, String CollegeCode = null, String BranchCode = null)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@UserTypeId", UserTypeId);
                param[1] = new SqlParameter("@CollegeCode", CollegeCode);
                param[2] = new SqlParameter("@BranchCode", BranchCode);
                DataSet ds = dbHandler.ReturnDataWithStoredProcedure("USP_GET_ElectiveMappingSubjectWiseReport", param);
                if (ds.Tables[0].Rows[0]["ResponceCode"].ToString() == "200")
                {

                    var filename = "ElectiveMappedReportSubjectWise" + "_" + Guid.NewGuid() + ".xlsx";
                    var eh = new ExcelHelper();
                    var path = ConfigurationManager.AppSettings["DownloadsFolderPath"];
                    DataSet excelds = new DataSet();
                    excelds.Tables.Add(ds.Tables[1].Copy());
                    bool folderExists = Directory.Exists(path);
                    if (!folderExists)
                        Directory.CreateDirectory(path);
                    eh.ExportDataSet(excelds, path + filename);
                    Timer timer = new Timer(200000);
                    timer.Elapsed += (sender, e) => elapse(sender, e, ConfigurationManager.AppSettings["DownloadsFolderPath"] + filename);
                    timer.Start();
                    return "/Downloads/" + filename;
                }
                else
                {
                    return JsonConvert.SerializeObject(ds);
                }
            }
            catch (Exception ex)
            {
                return ex.Message;

            }

        }


        [HttpGet, ActionName("getElectiveMappingSubjectReport")]
        public string getElectiveMappingSubjectReport(int UserTypeId, String CollegeCode = null, String BranchCode = null)
        {
            try
            {

                var dbHandler = new dbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@UserTypeId", UserTypeId);
                param[1] = new SqlParameter("@CollegeCode", CollegeCode);
                param[2] = new SqlParameter("@BranchCode", BranchCode);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_GET_ElectiveMappedReportsWithSelectedSubject ", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }


        [HttpGet, ActionName("getElectiveMappingSubjectReportExcel")]
        public string getElectiveMappingSubjectReportExcel(int UserTypeId, String CollegeCode = null, String BranchCode = null)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@UserTypeId", UserTypeId);
                param[1] = new SqlParameter("@CollegeCode", CollegeCode);
                param[2] = new SqlParameter("@BranchCode", BranchCode);
                DataSet ds = dbHandler.ReturnDataWithStoredProcedure("USP_GET_ElectiveMappedReportsWithSelectedSubject ", param);
                if (ds.Tables[0].Rows[0]["ResponceCode"].ToString() == "200")
                {

                    var filename = "ElectiveMappedReport" + "_" + Guid.NewGuid() + ".xlsx";
                    var eh = new ExcelHelper();
                    var path = ConfigurationManager.AppSettings["DownloadsFolderPath"];
                    DataSet excelds = new DataSet();
                    excelds.Tables.Add(ds.Tables[1].Copy());
                    bool folderExists = Directory.Exists(path);
                    if (!folderExists)
                        Directory.CreateDirectory(path);
                    eh.ExportDataSet(excelds, path + filename);
                    Timer timer = new Timer(200000);
                    timer.Elapsed += (sender, e) => elapse(sender, e, ConfigurationManager.AppSettings["DownloadsFolderPath"] + filename);
                    timer.Start();
                    return "/Downloads/" + filename;
                }
                else
                {
                    return JsonConvert.SerializeObject(ds);
                }
            }
            catch (Exception ex)
            {
                return ex.Message;

            }

        }

        [HttpGet, ActionName("GetAllBranches")]
        public HttpResponseMessage GetAllBranches()
        {
            try
            {
                var dbHandler = new dbHandler();
                string StrQuery = "";
                StrQuery = "exec USP_GET_All_BRANCHES";
                return Request.CreateResponse(HttpStatusCode.OK, dbHandler.ReturnDataSet(StrQuery));
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_GET_All_BRANCHES", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }




        [HttpGet, ActionName("GetSemesters")]
        public HttpResponseMessage GetSemesters()
        {
            try
            {
                var dbHandler = new dbHandler();
                string StrQuery = "";
                StrQuery = "exec ADM_GET_AllSemesterDetails";
                return Request.CreateResponse(HttpStatusCode.OK, dbHandler.ReturnDataSet(StrQuery));
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("ADM_GET_AllSemesterDetails", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpGet, ActionName("GetSchemes")]
        public HttpResponseMessage GetSchemes()
        {
            try
            {
                var dbHandler = new dbHandler();
                string StrQuery = "";
                StrQuery = "exec USP_GET_ACTIVE_SCHEMES_FOR_RESULTS";
                return Request.CreateResponse(HttpStatusCode.OK, dbHandler.ReturnDataSet(StrQuery));
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_GET_ACTIVE_SCHEMES_FOR_RESULTS", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }


        [HttpGet, ActionName("GetOrganizationTypes")]
        public HttpResponseMessage GetOrganizationTypes()
        {
            try
            {
                var dbHandler = new dbHandler();
                string StrQuery = "";
                StrQuery = "exec USP_GET_OrganizationTypes";
                return Request.CreateResponse(HttpStatusCode.OK, dbHandler.ReturnDataSet(StrQuery));
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_GET_OrganizationTypes", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpGet, ActionName("GetMonthYear")]
        public HttpResponseMessage GetMonthYear()
        {
            try
            {
                var dbHandler = new dbHandler();
                string StrQuery = "";
                StrQuery = "exec USP_GET_CurrentAcademicYear";
                return Request.CreateResponse(HttpStatusCode.OK, dbHandler.ReturnDataSet(StrQuery));
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_GET_CurrentAcademicYear", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpGet, ActionName("GetMonthYears")]
        public HttpResponseMessage GetMonthYears()
        {
            try
            {
                var dbHandler = new dbHandler();
                string StrQuery = "";
                StrQuery = "exec USP_GET_ExamMonthYear";
                return Request.CreateResponse(HttpStatusCode.OK, dbHandler.ReturnDataSet(StrQuery));
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_GET_ExamMonthYear", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpGet, ActionName("GetStudentTypes")]
        public HttpResponseMessage GetStudentTypes()
        {
            try
            {
                var dbHandler = new dbHandler();
                string StrQuery = "";
                StrQuery = "exec USP_SFP_GETSTUDENTTYPE";
                return Request.CreateResponse(HttpStatusCode.OK, dbHandler.ReturnDataSet(StrQuery));
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_SFP_GETSTUDENTTYPE", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }


        [HttpGet, ActionName("getTranscriptDetailsByPin")]
        public string getTranscriptDetailsByPin(string pin)
        {
            try
            {
                string Pin = GetDecryptedData(pin);
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@pin", Pin);

                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SS_GET_TranscriptsCertificateDetails", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }

        [HttpGet, ActionName("getMigrationDetailsByPin")]
        public string getMigrationDetailsByPin(string pin)
        {
            try
            {
                string Pin = GetDecryptedData(pin);
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@pin", Pin);

                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SS_GET_MigrationCertificateDetails", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }


        [HttpGet, ActionName("getTcDetailsByPin")]
        public string getTcDetailsByPin(string pin)
        {
            try
            {
                string Pin = GetDecryptedData(pin);
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@pin", Pin);

                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SS_GET_TcCertificateDetails", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }

        [HttpGet, ActionName("getBonafiedDetailsByPin")]
        public string getBonafiedDetailsByPin(string pin)
        {
            try
            {
                string Pin = GetDecryptedData(pin);
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@pin", Pin);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SS_GET_BonafiedCertificateDetails", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpGet, ActionName("getStudyDetailsByPin")]
        public string getStudyDetailsByPin(string pin)
        {
            try
            {
                string Pin = GetDecryptedData(pin);
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@pin", Pin);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SS_GET_StudyCertificateDetails", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpGet, ActionName("getBonafiedRequestedDetailsByPin")]
        public string getBonafiedRequestedDetailsByPin(string pin, int Id)
        {
            try
            {

                var dbHandler = new dbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@pin", pin);
                param[1] = new SqlParameter("@Id", Id);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SS_GET_FeePaidBonafiedCertificateDetails", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }

        [HttpGet, ActionName("getTcRequestedDetailsByPin")]
        public string getTcRequestedDetailsByPin(string pin)
        {
            try
            {

                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@pin", pin);

                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SS_GET_FeePaidTransferCertificateDetails", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }


        [HttpGet, ActionName("getStudyRequestedDetailsByPin")]
        public string getStudyRequestedDetailsByPin(string pin, int Id)
        {
            try
            {

                var dbHandler = new dbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@pin", pin);
                param[1] = new SqlParameter("@Id", Id);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SS_GET_FeePaidStudyCertificateDetails", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }



        [HttpGet, ActionName("getMarksMemoDetailsByPin")]
        public string getMarksMemoDetailsByPin(string pin)
        {
            try
            {
                string Pin = GetDecryptedData(pin);
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@pin", Pin);

                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SS_GET_DuplicateMarksMemoDetails", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }

        [HttpGet, ActionName("GetDayWiseNrReports")]
        public string GetDayWiseNrReports(int ExamMonthYearId, int AcademicID, int StudentTypeId)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@ExamMonthYearId", ExamMonthYearId);
                param[1] = new SqlParameter("@AcademicID", AcademicID);
                param[2] = new SqlParameter("@StudentTypeId", StudentTypeId);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_GET_NrDayWiseCountReports_New", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }

        [HttpGet, ActionName("GetBranchSemFeeReports")]
        public string GetBranchSemFeeReports(int dataType, int StudentTypeId, int emy)
        {
            try
            {

                var dbHandler = new dbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@dataType", dataType);
                param[1] = new SqlParameter("@StudentTypeId", StudentTypeId);
                param[2] = new SqlParameter("@emy", emy);
                var dt = dbHandler.ReturnDataWithStoredProcedure("ADM_Get_FeepaymentReportsBySemesterandBranch", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }

        [HttpGet, ActionName("GetBranchSemSubFeeReports")]
        public string GetBranchSemSubFeeReports(int dataType, int StudentTypeId, int emy, int Id)
        {
            try
            {

                var dbHandler = new dbHandler();
                var param = new SqlParameter[4];
                param[0] = new SqlParameter("@dataType", dataType);
                param[1] = new SqlParameter("@StudentTypeId", StudentTypeId);
                param[2] = new SqlParameter("@emy", emy);
                param[3] = new SqlParameter("@Id", Id);
                var dt = dbHandler.ReturnDataWithStoredProcedure("ADM_Get_FeepaymentCollegeReportsBySemesterandBranch ", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }


        [HttpGet, ActionName("getGenuinenessCheckDetailsByPin")]
        public string getGenuinenessCheckDetailsByPin(string pin)
        {
            try
            {
                string Pin = GetDecryptedData(pin);
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@pin", Pin);

                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SS_GET_GenuinenessCheckDetails", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }



        [HttpGet, ActionName("getTcData")]
        public string getTcData(string pin)
        {
            try
            {

                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@pin", pin);

                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SS_GET_TransferCertificateDetailsForOfficials", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }

        [HttpGet, ActionName("getBonafideData")]
        public string getBonafideData(string pin, int Id)
        {
            try
            {

                var dbHandler = new dbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@pin", pin);
                param[1] = new SqlParameter("@Id", Id);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SS_GET_BonafideCertificateDetailsForOfficials", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }

        [HttpGet, ActionName("getStudyData")]
        public string getStudyData(string pin, int Id)
        {
            try
            {

                var dbHandler = new dbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@pin", pin);
                param[1] = new SqlParameter("@Id", Id);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SS_GET_StudyCertificateDetailsForOfficials", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }

        [HttpGet, ActionName("GetAdminFeedbackReport")]
        public string GetAdminFeedbackReport(string CollegeCode, int semid, int FeedbackId)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@CollegeCode", CollegeCode);
                param[1] = new SqlParameter("@semid", semid);
                param[2] = new SqlParameter("@FeedbackId", FeedbackId);

                var dt = dbHandler.ReturnDataWithStoredProcedure("usp_ACD_GetAdminFeedbackReport_1", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("usp_ACD_GetAdminFeedbackReport_1 ", 0, ex.Message);
                throw ex;
            }
        }


        [HttpGet, ActionName("getNcDetailsByPin")]
        public string getNcDetailsByPin(string pin)
        {
            try
            {
                string Pin = GetDecryptedData(pin);
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@pin", Pin);

                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SS_GET_NcCertificateDetails", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }


        [HttpGet, ActionName("getODCDetailsByPin")]
        public string getODCDetailsByPin(string pin)
        {
            try
            {
                string Pin = GetDecryptedData(pin);
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@pin", Pin);

                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SS_GET_ODCCertificateDetails", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }



        [HttpGet, ActionName("getTranscriptODCDetailsByPin")]
        public string getTranscriptODCDetailsByPin(string pin)
        {
            try
            {

                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@pin", pin);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SS_GET_OdcDetails", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }

        [HttpGet, ActionName("getMarksMemoDataByPin")]
        public string getMarksMemoDataByPin(string pin, string Semester)
        {
            try
            {

                var dbHandler = new dbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@pin", pin);
                param[1] = new SqlParameter("@Semester", Semester);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SFP_GET_DuplicateMarksMemoData", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }

        [HttpGet, ActionName("getMarksMemoDataSemwiseByPin")]
        public string getMarksMemoDataSemwiseByPin(string pin, string Semester)
        {
            try
            {

                var dbHandler = new dbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@pin", pin);
                param[1] = new SqlParameter("@Semester", Semester);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SFP_GET_DuplicateMarksMemoData_1", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }

        [HttpGet, ActionName("SetSmsStatus")]
        public string SetSmsStatus(string pin, string semester)
        {
            try
            {

                var dbHandler = new dbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@pin", pin);
                param[1] = new SqlParameter("@semester", semester);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SFP_Update_DMMSmsSentStatus", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }


        [HttpGet, ActionName("sendcertSMS")]
        public string sendcertSMS(string pin, string mobile, string CertificatePath, string CertificateName)
        {
            try
            {
                //System.Uri address = new System.Uri("http://tinyurl.com/api-create.php?url=" + CertificatePath);
                //System.Net.WebClient client1 = new System.Net.WebClient();
                //string tinyUrl = client1.DownloadString(address);
                //Console.WriteLine(tinyUrl);

                string Msg = "PIN:{0},Your application request for {1} Certificate is Approved, click here {2} Secretary, SBTET TS.";
                //string Msg = "PIN: {0}, Your application request for {1} Certificate is Approved, click here {2} .Secretary, SBTET TS.";
                //string Msg = "PIN:{0}, Your application request for {1} Certificate is Approved, click here {2} .Secretary, SBTET TS.";
                string url = ConfigurationManager.AppSettings["SMS_API"].ToString();
                var Message = string.Format(Msg, pin, CertificateName.ToString(), CertificatePath.ToString());
                if (mobile.ToString() != null || mobile.ToString() != string.Empty)
                {
                    string urlParameters = "?mobile=" + mobile.ToString() + "&message=" + Message + "&templateid=1007166805964582364"; //old id1007161889718167644 1007166738055110295
                    HttpClient client = new HttpClient();
                    client.BaseAddress = new Uri(url);
                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                    HttpResponseMessage response = client.GetAsync(urlParameters).Result;
                    return "SUCCESS";
                }
                else
                {
                    return "Mobile no not valid";
                }


            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }


        [HttpGet, ActionName("sendTwshcertSMS")]
        public string sendTwshcertSMS(string RegNo, string mobile, string CertificatePath, string CertificateName)
        {
            try
            {
                string Msg = "HT NO: {0} download Your marks memo from {2}. Secretary, SBTET TS.";
                string url = ConfigurationManager.AppSettings["SMS_API"].ToString();
                var Message = string.Format(Msg, RegNo, CertificateName.ToString(), CertificatePath.ToString());
                if (mobile.ToString() != null || mobile.ToString() != string.Empty)
                {
                    string urlParameters = "?mobile=" + mobile.ToString() + "&message=" + Message + "&templateid=1007161926302084608";
                    HttpClient client = new HttpClient();
                    client.BaseAddress = new Uri(url);
                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                    HttpResponseMessage response = client.GetAsync(urlParameters).Result;
                    return "SUCCESS";
                }
                else
                {
                    return "Mobile no not valid";
                }
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }

        [HttpGet, ActionName("sendGenuinenessSMS")]
        public string sendGenuinenessSMS(string pin, string mobile, string CertificateName, string ReferenceNo)
        {
            try
            {
                string Msg = "PIN : {0}, Your Application for {1}  Verification submitted Successfully with Reference Number : {2}. Secretary, SBTET TS.";
                string url = ConfigurationManager.AppSettings["SMS_API"].ToString();
                var Message = string.Format(Msg, pin, CertificateName.ToString(), ReferenceNo.ToString());
                if (mobile.ToString() != null || mobile.ToString() != string.Empty)
                {
                    string urlParameters = "?mobile=" + mobile.ToString() + "&message=" + Message + "&templateid=1007161786832490552";
                    HttpClient client = new HttpClient();
                    client.BaseAddress = new Uri(url);
                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                    HttpResponseMessage response = client.GetAsync(urlParameters).Result;
                    return "SUCCESS";
                }
                else
                {
                    return "Mobileno not valid";
                }


            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }


        [HttpGet, ActionName("sendMemoSMS")]
        public string sendMemoSMS(string pin, string mobile, string CertificateName, string Semester, string Scheme)
        {
            try
            {
                if (Scheme == "C-00" || Scheme == "C-96" || Scheme == "C-90" || Scheme == "NA")
                {

                    string Msg = "PIN : {0}, Your application request for {2} {1} is Approved. Please Collect Duplicate Marks Memo from SBTET after 9 working days. Secretary, SBTET TS.";
                    string url = ConfigurationManager.AppSettings["SMS_API"].ToString();
                    var Message = string.Format(Msg, pin, CertificateName.ToString(), Semester);

                    if (mobile.ToString() != null || mobile.ToString() != string.Empty)
                    {
                        string urlParameters = "?mobile=" + mobile.ToString() + "&message=" + Message + "&templateid=1007161786840913519";
                        HttpClient client = new HttpClient();
                        client.BaseAddress = new Uri(url);
                        client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                        HttpResponseMessage response = client.GetAsync(urlParameters).Result;
                        return "SUCCESS";
                    }
                    else
                    {
                        return "Mobileno not valid";
                    }
                }
                else
                {
                    string Msg = "PIN : {0}, Your application request for {2} {1} is Approved. Please Collect Duplicate Marks Memo from SBTET after 5 working days. Secretary, SBTET TS.";

                    string url = ConfigurationManager.AppSettings["SMS_API"].ToString();
                    var Message = string.Format(Msg, pin, CertificateName.ToString(), Semester);

                    if (mobile.ToString() != null || mobile.ToString() != string.Empty)
                    {
                        string urlParameters = "?mobile=" + mobile.ToString() + "&message=" + Message + "&templateid=1007161786840913519";
                        HttpClient client = new HttpClient();
                        client.BaseAddress = new Uri(url);
                        client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                        HttpResponseMessage response = client.GetAsync(urlParameters).Result;
                        return "SUCCESS";
                    }
                    else
                    {
                        return "Mobileno not valid";
                    }
                }





            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }

        [HttpGet, ActionName("getDuplicateODCDetails")]
        public string getDuplicateODCDetails(string pin)
        {
            try
            {

                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@pin", pin);

                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SS_GET_FeePaidDuplicateODCDetails", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }

        public class OsdesNrData
        {
            public string CollegeCode { get; set; }
            public string ExamCenter { get; set; }
            public string Subject_Code { get; set; }
            public string SubjectName { get; set; }
            public string ExamDate { get; set; }
            public string SessionTime { get; set; }
            public string Pin { get; set; }
            public string Name { get; set; }
            public string Scheme { get; set; }
            public string BranchCode { get; set; }
            public string BranchName { get; set; }
            public string ExamType { get; set; }
            public string Semester { get; set; }
            public string BarcodeUID { get; set; }
            public string ExamMonthYear { get; set; }

        }

        [HttpPost, ActionName("PostOsdesNRdata")]
        public async Task<string> PostOsdesNRdata(int ExamMonthYearId, int StudentTypeId, string CollegeCode, string ExamDate)
        {
            try
            {
                string OsdesNrUrl = ConfigurationManager.AppSettings["OsdesNrUrl"].ToString();
                var dbHandler = new dbHandler();
                var param = new SqlParameter[4];
                param[0] = new SqlParameter("@ExamMonthYearId", ExamMonthYearId);
                param[1] = new SqlParameter("@StudentTypeId", StudentTypeId);
                param[2] = new SqlParameter("@CollegeCode", CollegeCode);
                param[3] = new SqlParameter("@ExamDate", ExamDate);
                DataSet ds = dbHandler.ReturnDataWithStoredProcedure("USP_SFP_GET_OSDES_NR_BAC_test", param);
                var NrData = DataTableHelper.ConvertDataTable<OsdesNrData>(ds.Tables[1]);
                if (ds.Tables[0].Rows[0]["ResponceCode"].ToString() == "200" && NrData.Count > 0)
                {
#pragma warning disable CS0162 // Unreachable code detected
                    for (var i = 0; i < NrData.Count; i++)
#pragma warning restore CS0162 // Unreachable code detected

                    {
                        using (HttpClient client = new HttpClient())
                        {
                            try
                            {
                                var res = await client.GetAsync(OsdesNrUrl + $"?Pin={NrData[i].Pin}&Name={NrData[i].Name}&Scheme={NrData[i].Scheme}&SubjectName={NrData[i].SubjectName}&CollegeCode={NrData[i].CollegeCode}&ExamType={NrData[i].ExamType}&ExamType={NrData[i].ExamType}&Semester={NrData[i].Semester}&BarcodeUID={NrData[i].BarcodeUID}&ExamMonthYear={NrData[i].ExamMonthYear}");
                                var resContent = await res.Content.ReadAsStringAsync();
                                return "true";
                            }
                            catch (Exception ex)
                            {
                                dbHandler.SaveErorr("USP_SFP_GET_OSDES_NR_BAC_test", 0, ex.Message);
                                return ex.Message;
                            }

                        }
                    }

                }
                else
                {
                    return "false";
                }
                return "false";

            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_SFP_GET_OSDES_NR_BAC_test", 0, ex.Message);
                return "false";
            }
        }

        [HttpPost, ActionName("OsdesNRdataExcel")]
        public async Task<string> OsdesNRdataExcel(int ExamMonthYearId, int StudentTypeId, string CollegeCode, string ExamDate)
        {
            try
            {
                string OsdesNrUrl = ConfigurationManager.AppSettings["OsdesNrUrl"].ToString();
                var dbHandler = new dbHandler();
                var param = new SqlParameter[4];
                param[0] = new SqlParameter("@ExamMonthYearId", ExamMonthYearId);
                param[1] = new SqlParameter("@StudentTypeId", StudentTypeId);
                param[2] = new SqlParameter("@CollegeCode", CollegeCode);
                param[3] = new SqlParameter("@ExamDate", ExamDate);
                DataSet ds = dbHandler.ReturnDataWithStoredProcedure("USP_SFP_GET_OSDES_NR_BAC_test", param);
                if (ds.Tables[0].Rows[0]["ResponceCode"].ToString() == "200")
                {
                    var NrData = DataTableHelper.ConvertDataTable<OsdesNrData>(ds.Tables[1]);
                    var filename = "NrData" + "_" + ds.Tables[0].Rows[0]["ExamMonthYear"].ToString() + "_" + Guid.NewGuid() + ".xlsx";
                    var eh = new ExcelHelper();
                    var path = ConfigurationManager.AppSettings["DownloadsFolderPath"];
                    DataSet excelds = new DataSet();
                    excelds.Tables.Add(ds.Tables[1].Copy());
                    bool folderExists = Directory.Exists(path);
                    if (!folderExists)
                        Directory.CreateDirectory(path);
                    eh.ExportDataSet(excelds, path + filename);
                    Timer timer = new Timer(200000);
                    timer.Elapsed += (sender, e) => elapse(sender, e, ConfigurationManager.AppSettings["DownloadsFolderPath"] + filename);
                    timer.Start();
                    return "/Downloads/" + filename;
                }
                else
                {
                    return "";
                }

            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_SFP_GET_OSDES_NR_BAC_test", 0, ex.Message);
                return "false";
            }
        }

        [HttpGet, ActionName("getInterimDetails")]
        public string getInterimDetails(string pin)
        {
            try
            {

                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@pin", pin);

                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SS_GET_FeePaidInteriamCertificateDetails", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }

        [HttpGet, ActionName("getInterimPendingDetails")]
        public string getInterimPendingDetails(string pin)
        {
            try
            {

                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@pin", pin);

                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SS_GET_FeePaidInteriamCertificateDetails", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }


        [HttpGet, ActionName("getMigrationPendingDetails")]
        public string getMigrationPendingDetails(string pin)
        {
            try
            {

                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@pin", pin);

                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SS_GET_FeePaidMigrationCertificateDetails", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }

        [HttpGet, ActionName("GetChallanData")]
        public string GetChallanData(string pin, int CertificateTypeId, string ApplicationNumber = null)
        {
            try
            {
                if (CertificateTypeId == 4 || CertificateTypeId == 3)
                {
                    var dbHandler = new dbHandler();
                    var param = new SqlParameter[3];
                    param[0] = new SqlParameter("@pin", pin);
                    param[1] = new SqlParameter("@CertificateTypeId", CertificateTypeId);
                    param[2] = new SqlParameter("@ApplicationNumber", ApplicationNumber);
                    var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SS_GET_StudentServicesChallanNumber", param);
                    return JsonConvert.SerializeObject(dt);
                }
                else
                {
                    var dbHandler = new dbHandler();
                    var param = new SqlParameter[2];
                    param[0] = new SqlParameter("@pin", pin);
                    param[1] = new SqlParameter("@CertificateTypeId", CertificateTypeId);
                    var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SS_GET_StudentServicesChallanNumber", param);
                    return JsonConvert.SerializeObject(dt);
                }

            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }

        [HttpGet, ActionName("GetChallanNumberData")]
        public string GetChallanNumberData(string pin, int CertificateTypeId, string ApplicationNumber)
        {
            try
            {

                var dbHandler = new dbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@pin", pin);
                param[1] = new SqlParameter("@CertificateTypeId", CertificateTypeId);
                param[2] = new SqlParameter("@ApplicationNumber", ApplicationNumber);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SS_GET_StudentServicesChallanNumber", param);
                return JsonConvert.SerializeObject(dt);

            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }

        //[HttpGet, ActionName("GetChallanData")]
        //public string GetChallanData(string pin, int CertificateTypeId)
        //{
        //    try
        //    {

        //        var dbHandler = new dbHandler();
        //        var param = new SqlParameter[2];
        //        param[0] = new SqlParameter("@pin", pin);
        //        param[1] = new SqlParameter("@CertificateTypeId", CertificateTypeId);
        //        var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SS_GET_StudentServicesChallanNumber", param);
        //        return JsonConvert.SerializeObject(dt);

        //    }
        //    catch (Exception ex)
        //    {
        //        return ex.Message;
        //    }

        //}

        [HttpGet, ActionName("UpdateUserdata")]
        public string UpdateUserdata(string Pin, string StudentPhoneNumber, string OTP)
        {
            try
            {
                //var base64EncodedBytes = System.Convert.FromBase64String(OTP);
                //var password=  System.Text.Encoding.UTF8.GetString(base64EncodedBytes);
                var dbHandler = new dbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@Pin", Pin);
                param[1] = new SqlParameter("@StudentPhoneNumber", StudentPhoneNumber);
                param[2] = new SqlParameter("@Otp", OTP);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SET_UpdateStudentPhone", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }

        [HttpGet, ActionName("getFileUploadDetails")]
        public string getFileUploadDetails(string Pin)
        {
            try
            {

                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@Pin", Pin);
                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_GET_UpdateOldStudentData", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }


        [HttpGet, ActionName("getFeePaymentStatus")]
        public string getFeePaymentStatus(string Pin)
        {
            try
            {
                string pin = GetDecryptedData(Pin);
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@Pin", pin);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SFP_GET_CertificateFeepaidStatus", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }



        [HttpGet, ActionName("getMersyFeeStatus")]
        public string getMersyFeeStatus(string Pin)
        {
            try
            {

                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@Pin", Pin);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SFP_GET_MercyFeepaidStatus", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }

        [HttpGet, ActionName("getTwoYearsFeePaymentStatus")]
        public string getTwoYearsFeePaymentStatus(string Pin)
        {
            try
            {

                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@Pin", Pin);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SFP_GET_60PercentCertificateFeepaidStatus", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }

        [HttpGet, ActionName("GetNoDataCertificateApprovalListByScheme")]
        public string GetNoDataCertificateApprovalListByScheme(string Scheme, int datatype)
        {
            try
            {

                var dbHandler = new dbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@Scheme", Scheme);
                param[1] = new SqlParameter("@datatype", datatype);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SFP_GET_NCCertificateApprovalListByScheme", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }


        [HttpGet, ActionName("GetCertificateApprovalListByScheme")]
        public string GetCertificateApprovalListByScheme(string Scheme, int datatype)
        {
            try
            {

                var dbHandler = new dbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@Scheme", Scheme);
                param[1] = new SqlParameter("@datatype", datatype);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SFP_GET_CertificateApprovalListByScheme", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }


        [HttpGet, ActionName("SetSignedDate")]
        public string SetSignedDate(string Pin)
        {
            try
            {

                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@Pin", Pin);

                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SFP_SET_SignedTime", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }



        [HttpGet, ActionName("SetMemoSignedDate")]
        public string SetMemoSignedDate(string Pin, string Semester, string ExamMonthYear)
        {
            try
            {

                var dbHandler = new dbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@Pin", Pin);
                param[1] = new SqlParameter("@Semester", Semester);
                param[2] = new SqlParameter("@ExamMonthYear", ExamMonthYear);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SFP_SET_DupliateMemoSignedTime", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }



        [HttpGet, ActionName("GetTcApprovalListByScheme")]
        public string GetTcApprovalListByScheme(string Scheme, int datatype, int userType, string CollegeCode, string BranchCode = null)
        {
            try
            {

                var dbHandler = new dbHandler();
                var param = new SqlParameter[5];
                param[0] = new SqlParameter("@Scheme", Scheme);
                param[1] = new SqlParameter("@datatype", datatype);
                param[2] = new SqlParameter("@userType", userType);
                param[3] = new SqlParameter("@CollegeCode", CollegeCode);
                param[4] = new SqlParameter("@BranchCode", BranchCode);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SFP_GET_TcApprovalListByScheme", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpGet, ActionName("GetBonafiedApprovalListByScheme")]
        public string GetBonafiedApprovalListByScheme(string Scheme, int datatype, int userType, string CollegeCode, string BranchCode = null)
        {
            try
            {

                var dbHandler = new dbHandler();
                var param = new SqlParameter[5];
                param[0] = new SqlParameter("@Scheme", Scheme);
                param[1] = new SqlParameter("@datatype", datatype);
                param[2] = new SqlParameter("@userType", userType);
                param[3] = new SqlParameter("@CollegeCode", CollegeCode);
                param[4] = new SqlParameter("@BranchCode", BranchCode);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SFP_GET_BonafiedApprovalListByScheme", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }

        [HttpGet, ActionName("GetStudyApprovalListByScheme")]
        public string GetStudyApprovalListByScheme(string Scheme, int datatype, int userType, string CollegeCode, string BranchCode = null)
        {
            try
            {

                var dbHandler = new dbHandler();
                var param = new SqlParameter[5];
                param[0] = new SqlParameter("@Scheme", Scheme);
                param[1] = new SqlParameter("@datatype", datatype);
                param[2] = new SqlParameter("@userType", userType);
                param[3] = new SqlParameter("@CollegeCode", CollegeCode);
                param[4] = new SqlParameter("@BranchCode", BranchCode);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SFP_GET_StudyApprovalListByScheme", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }

        [HttpGet, ActionName("GetNameCorrectionListByScheme")]
        public string GetNameCorrectionListByScheme(string Scheme, int datatype, int userType)
        {
            try
            {

                var dbHandler = new dbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@Scheme", Scheme);
                param[1] = new SqlParameter("@datatype", datatype);
                param[2] = new SqlParameter("@userType", userType);

                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SFP_GET_NameCorrectionListByScheme", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }

        [HttpGet, ActionName("GetTranscriptListByScheme")]
        public string GetTranscriptListByScheme(string Scheme, int datatype, int userType)
        {
            try
            {

                var dbHandler = new dbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@Scheme", Scheme);
                param[1] = new SqlParameter("@datatype", datatype);
                param[2] = new SqlParameter("@userType", userType);

                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SFP_GET_TranscriptListByScheme", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }

        [HttpGet, ActionName("GetMigrationApprovalListByScheme")]
        public string GetMigrationApprovalListByScheme(string Scheme, int datatype, int userType)
        {
            try
            {

                var dbHandler = new dbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@Scheme", Scheme);
                param[1] = new SqlParameter("@datatype", datatype);
                param[2] = new SqlParameter("@userType", userType);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SFP_GET_MigrationListByScheme", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }

        [HttpGet, ActionName("GetAttendanceApprovalDetails")]
        public string GetAttendanceApprovalDetails(int UserId, string CollegeCode, int DataType)
        {
            try
            {

                var dbHandler = new dbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@UserId", UserId);
                param[1] = new SqlParameter("@CollegeCode", CollegeCode);
                param[2] = new SqlParameter("@DataType", DataType);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_GET_AttendenceUpdationApprovalList", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }

        [HttpGet, ActionName("getAttendanceDetails")]
        public string getAttendanceDetails(int UserId, string AttendeeId, string Pin)
        {
            try
            {

                var dbHandler = new dbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@UserId", UserId);
                param[1] = new SqlParameter("@AttendeeId", AttendeeId);
                param[2] = new SqlParameter("@Pin", Pin);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_GET_AttendenceUpdationApprovalListData", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }

        [HttpGet, ActionName("GetOdcListByScheme")]
        public string GetOdcListByScheme(string Scheme, int datatype, int userType)
        {
            try
            {

                var dbHandler = new dbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@Scheme", Scheme);
                param[1] = new SqlParameter("@datatype", datatype);
                param[2] = new SqlParameter("@userType", userType);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SFP_GET_OdcListByScheme", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }

        [HttpGet, ActionName("GetGenuinenessListByScheme")]
        public string GetGenuinenessListByScheme(string Scheme, int datatype, int userType)
        {
            try
            {

                var dbHandler = new dbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@Scheme", Scheme);
                param[1] = new SqlParameter("@datatype", datatype);
                param[2] = new SqlParameter("@userType", userType);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SFP_GET_GenuinenessListByScheme", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }



        [HttpGet, ActionName("GetDuplicateMarksMemoListByScheme")]
        public string GetDuplicateMarksMemoListByScheme(string Scheme, int datatype, int userType)
        {
            try
            {

                var dbHandler = new dbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@Scheme", Scheme);
                param[1] = new SqlParameter("@datatype", datatype);
                param[2] = new SqlParameter("@userType", userType);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SFP_GET_DuplicateMarksMemoListByScheme", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }

        [HttpPost, ActionName("SetCertificateApproval")]
        public string SetCertificateApproval([FromBody] JsonObject request)
        {
            try
            {
                var js = JsonConvert.DeserializeObject<ArrayList>(Convert.ToString(request["PINjson"]));
                var finalJsonArray = new ArrayList();
                var jsonArray = new JsonArray();
                for (int i = 0; i < js.Count; i++)
                {
                    var jobject = JsonConvert.DeserializeObject<JsonObject>(JsonConvert.SerializeObject(js[i]));
                    jsonArray.Add(jobject);
                }
                var dbHandler = new dbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@PINjson", JsonConvert.SerializeObject(jsonArray));
                param[1] = new SqlParameter("@ApproveStatus", request["ApproveStatus"]);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SFP_SET_CertificateApproval", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }


        [HttpGet, ActionName("Odc_SetVerifyStatus")]
        public string Odc_SetVerifyStatus(string Pin, int userType)
        {
            try
            {

                var dbHandler = new dbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@Pin", Pin);
                param[1] = new SqlParameter("@userType", userType);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SFP_SET_OdcVerified", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }

        [HttpPost, ActionName("Odc_Set_UpdateAffidavit")]
        public string Odc_Set_UpdateAffidavit([FromBody] JsonObject request)
        {

            try
            {

                //var fileDat = new List<filetranlist>();
                //int size = request.filedata.Count;
                var Memos = string.Empty;
                var WESCertificate = string.Empty;
                string relativePath = string.Empty;
                var fileDat = new List<filelist>();

                var file = string.Empty;
                var Fir = string.Empty;
                var Prince = string.Empty;
                var AadharData = string.Empty;
                var PrinceData = string.Empty;
                var AffidavitData = string.Empty;
                var path = ConfigurationManager.AppSettings["certFolderPath"];
                var Pin = request["Pin"];

                var Affidavitpath = ConfigurationManager.AppSettings["certFolderPath"];
                var Affidavit = Pin + "_" + Guid.NewGuid() + ".jpg";
                bool folders = Directory.Exists(Affidavitpath);
                if (!folders)
                    Directory.CreateDirectory(Affidavitpath);
                string AffidavitPath = Path.Combine(Affidavitpath, Affidavit);
                byte[] AffidavitimageBytes = Convert.FromBase64String(Convert.ToString(request["MegistrateAffidavit"]));
                File.WriteAllBytes(AffidavitPath, AffidavitimageBytes);
                relativePath = AffidavitPath.Replace(HttpContext.Current.Request.PhysicalApplicationPath, GetWebAppRoot()).Replace(@"\", "/");
                AffidavitData = relativePath;
                //AffidavitData = Affidavit;



                var dbHandler = new dbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@Pin", request["Pin"]);
                param[1] = new SqlParameter("@userType", request["userType"]);
                param[2] = new SqlParameter("@MegistrateAffidavit", AffidavitData);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SFP_SET_OdcAffidavitUpdate", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }

        [HttpGet, ActionName("Odc_SetPrinted")]
        public string Odc_SetPrinted(string Pin, int userType)
        {
            try
            {

                var dbHandler = new dbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@Pin", Pin);
                param[1] = new SqlParameter("@userType", userType);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SFP_SET_OdcPrinted", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }



        [HttpGet, ActionName("DMM_SetVerifyStatus")]
        public string DMM_SetVerifyStatus(string Pin, int userType, string Semester, string ExamMonthYear)
        {
            try
            {

                var dbHandler = new dbHandler();
                var param = new SqlParameter[4];
                param[0] = new SqlParameter("@Pin", Pin);
                param[1] = new SqlParameter("@userType", userType);
                param[2] = new SqlParameter("@Semester", Semester);
                param[3] = new SqlParameter("@ExamMonthYear", ExamMonthYear);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SFP_SET_DMMVerified", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }


        [HttpGet, ActionName("Genuineness_SetVerifyStatus")]
        public string Genuineness_SetVerifyStatus(int Id, string Pin, int userType, int Status)
        {
            try
            {

                var dbHandler = new dbHandler();
                var param = new SqlParameter[4];
                param[0] = new SqlParameter("@Id", Id);
                param[1] = new SqlParameter("@Pin", Pin);
                param[2] = new SqlParameter("@userType", userType);
                param[3] = new SqlParameter("@Status", Status);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SFP_SET_GenuinenessVerified", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }

        [HttpGet, ActionName("Genuineness_SetVerifyStatusRemarks")]
        public string Genuineness_SetVerifyStatusRemarks(int Id, string Pin, int userType, int Status, string Remarks)
        {
            try
            {

                var dbHandler = new dbHandler();
                var param = new SqlParameter[5];
                param[0] = new SqlParameter("@Id", Id);
                param[1] = new SqlParameter("@Pin", Pin);
                param[2] = new SqlParameter("@userType", userType);
                param[3] = new SqlParameter("@Status", Status);
                param[4] = new SqlParameter("@Remarks", Remarks);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SFP_SET_GenuinenessVerified", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }


        [HttpGet, ActionName("SetApproveStatus")]
        public string SetApproveStatus(string PIN, int ApproveStatus)
        {
            try
            {

                var dbHandler = new dbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@PIN", PIN);
                param[1] = new SqlParameter("@ApproveStatus", ApproveStatus);
                var dt = dbHandler.ReturnDataWithStoredProcedure("SPB_SET_ApproveStatus", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }

        [HttpGet, ActionName("SetTranscriptVerificationStatus")]
        public string SetTranscriptVerificationStatus(string ApplicationNo, int userType)
        {

            try
            {

                var dbHandler = new dbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@ApplicationNo", ApplicationNo);
                param[1] = new SqlParameter("@userType", userType);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SFP_SET_VerifyTranscript", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }

        [HttpGet, ActionName("SetAttendanceVerificationStatus")]
        public string SetAttendanceVerificationStatus(int UserId, string AttendeeId, string Pin)
        {

            try
            {

                var dbHandler = new dbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@UserId", UserId);
                param[1] = new SqlParameter("@AttendeeId", AttendeeId);
                param[2] = new SqlParameter("@Pin", Pin);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SET_AttendenceUpdationVerification", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }


        [HttpGet, ActionName("SetTwoYearsCertificateVerifyStatus")]
        public string SetTwoYearsCertificateVerifyStatus(string PIN, int userType)
        {

            try
            {

                var dbHandler = new dbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@PIN", PIN);
                param[1] = new SqlParameter("@userType", userType);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SFP_SET_Verify2YearCertificate", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }

        [HttpGet, ActionName("SetTranscriptEmailStatus")]
        public string SetTranscriptEmailStatus(string ApplicationNo)
        {

            try
            {

                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@ApplicationNo", ApplicationNo);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SFP_SET_TranscriptEmailStatus", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }

        [HttpGet, ActionName("SetGenuinenessEmailStatus")]
        public string SetGenuinenessEmailStatus(string Id)
        {

            try
            {

                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@Id", Id);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SFP_SET_GenuinenessEmailStatus", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }

        [HttpPost, ActionName("GetAttendance")]
        public IDictionary<String, string> GetAttendance([FromBody] JsonObject request)
        {

            try
            {
                var js = JsonConvert.DeserializeObject<ArrayList>(Convert.ToString(request["JSON"]));
                var finalJsonArray = new ArrayList();
                var jsonArray = new JsonArray();
                var tmp = new Dictionary<String, string>();
                for (int i = 0; i < js.Count; i++)
                {


                    //var jobject = JsonConvert.DeserializeObject<JsonObject>(JsonConvert.SerializeObject(js[i]));
                    //jsonArray.Add(jobject);
                    var clientUrl = ConfigurationManager.AppSettings["BMA_API_ROOT"];
                    var client = new RestClient(clientUrl);
                    string apiparams = "/getstatus?attendeeid=" + js[i];
                    var req = new RestRequest(apiparams, Method.POST);
                    req.AddHeader("apikey", ConfigurationManager.AppSettings["BMA_API_Key"]);
                    var data = client.Post(req);
                    tmp.Add(js[i].ToString(), JsonConvert.SerializeObject(data.Content));

                }

                return tmp;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }




        [HttpPost, ActionName("TcSetApprove")]
        public string TcSetApprove([FromBody] JsonObject request)
        {
            try
            {
                var js = JsonConvert.DeserializeObject<ArrayList>(Convert.ToString(request["PINjson"]));
                var finalJsonArray = new ArrayList();
                var jsonArray = new JsonArray();
                for (int i = 0; i < js.Count; i++)
                {
                    var jobject = JsonConvert.DeserializeObject<JsonObject>(JsonConvert.SerializeObject(js[i]));
                    jsonArray.Add(jobject);
                }
                var dbHandler = new dbHandler();
                var param = new SqlParameter[6];

                param[0] = new SqlParameter("@PINjson", JsonConvert.SerializeObject(jsonArray));
                param[1] = new SqlParameter("@userType", request["userType"]);
                param[2] = new SqlParameter("@approvestatus", request["approvestatus"]);
                param[3] = new SqlParameter("@admittedDate", request["admittedDate"]);
                param[4] = new SqlParameter("@LeftDate", request["LeftDate"]);
                param[5] = new SqlParameter("@CollegeDuesPaid", request["CollegeDuesPaid"]);
                var dt = dbHandler.ReturnDataWithStoredProcedure("SPB_SET_Tc_Admin_ApproveStatus", param);
                string Msg = "PIN : {0}, Your application Request for name correction is Approved. Secretary, SBTET TS.";
                string url = ConfigurationManager.AppSettings["SMS_API"].ToString();
                if (dt.Tables[0].Rows[0]["ResponseCode"].ToString() == "200" && request["userType"].ToString() == "2")
                {
                    for (var i = 0; i < dt.Tables[1].Rows.Count; i++)
                    {
                        var Message = string.Format(Msg, dt.Tables[0].Rows[i]["Pin"].ToString());
                        if (dt.Tables[0].Rows[i]["StudentPhoneNumber"].ToString() != null || dt.Tables[0].Rows[i]["StudentPhoneNumber"].ToString() != string.Empty)
                        {
                            string urlParameters = "?mobile=" + dt.Tables[0].Rows[i]["StudentPhoneNumber"].ToString() + "&message=" + Message;
                            HttpClient client = new HttpClient();
                            client.BaseAddress = new Uri(url);
                            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                            HttpResponseMessage response = client.GetAsync(urlParameters).Result;
                        }
                    }
                }
                return JsonConvert.SerializeObject(dt);


            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }

        [HttpPost, ActionName("getAdminSyllabusReports")]
        public string getAdminSyllabusReports([FromBody] JsonObject request)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[4];
                param[0] = new SqlParameter("@Scheme", request["Scheme"]);
                param[1] = new SqlParameter("@AcademicYearId", request["AcademicYearId"]);
                param[2] = new SqlParameter("@Json", request["Json"].ToString());
                param[3] = new SqlParameter("@CollegeCode", request["CollegeCode"]);
                var dt = dbHandler.ReturnDataWithStoredProcedure("usp_ACD_GetFacultyMappingReport", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }


        [HttpPost, ActionName("TCMultipleSelectApprove")]
        public string TCMultipleSelectApprove([FromBody] JsonObject request)
        {
            try
            {
                var js = JsonConvert.DeserializeObject<ArrayList>(Convert.ToString(request["PINjson"]));
                var finalJsonArray = new ArrayList();
                var jsonArray = new JsonArray();
                for (int i = 0; i < js.Count; i++)
                {
                    var jobject = JsonConvert.DeserializeObject<JsonObject>(JsonConvert.SerializeObject(js[i]));
                    jsonArray.Add(jobject);
                }
                var dbHandler = new dbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@PINjson", JsonConvert.SerializeObject(jsonArray));
                param[1] = new SqlParameter("@userType", request["userType"]);
                param[2] = new SqlParameter("@approvestatus", request["approvestatus"]);
                var dt = dbHandler.ReturnDataWithStoredProcedure("SPB_SET_Tc_ApproveStatus", param);
                if (dt.Tables[0].Rows[0]["ResponseCode"].ToString() == "200" && request["userType"].ToString() == "2")
                {
                    for (var i = 0; i < dt.Tables[1].Rows.Count; i++)
                    {
                        if (dt.Tables[1].Rows[i]["StudentPhoneNumber"].ToString() != null || dt.Tables[1].Rows[i]["StudentPhoneNumber"].ToString() != string.Empty)
                        {
                            var status = sendcertSMS(dt.Tables[1].Rows[i]["Pin"].ToString(), dt.Tables[1].Rows[i]["StudentPhoneNumber"].ToString(), dt.Tables[1].Rows[i]["CertificatePath"].ToString(), "Transfer");
                            if (status.ToString() == "SUCCESS")
                            {
                                UpdateSmsStatus(6, dt.Tables[1].Rows[i]["Pin"].ToString());
                            }

                        }
                    }
                }
                return JsonConvert.SerializeObject(dt);


            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }

        [HttpPost, ActionName("BonafideMultipleSelectApprove")]
        public string BonafideMultipleSelectApprove([FromBody] JsonObject request)
        {
            try
            {
                var js = JsonConvert.DeserializeObject<ArrayList>(Convert.ToString(request["PINjson"]));
                var finalJsonArray = new ArrayList();
                var jsonArray = new JsonArray();
                for (int i = 0; i < js.Count; i++)
                {
                    var jobject = JsonConvert.DeserializeObject<JsonObject>(JsonConvert.SerializeObject(js[i]));
                    jsonArray.Add(jobject);
                }
                var dbHandler = new dbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@PINjson", JsonConvert.SerializeObject(jsonArray));
                param[1] = new SqlParameter("@userType", request["userType"]);
                param[2] = new SqlParameter("@approvestatus", request["approvestatus"]);
                var dt = dbHandler.ReturnDataWithStoredProcedure("SPB_SET_Bonafide_ApproveStatus", param);
                //if (dt.Tables[0].Rows[0]["ResponseCode"].ToString() == "200" && request["userType"].ToString() == "2")
                //{
                //    //for (var i = 0; i < dt.Tables[1].Rows.Count; i++)
                //    //{
                //    //    if (dt.Tables[1].Rows[i]["StudentPhoneNumber"].ToString() != null || dt.Tables[1].Rows[i]["StudentPhoneNumber"].ToString() != string.Empty)
                //    //    {
                //    //        //var status = sendcertSMS(dt.Tables[1].Rows[i]["Pin"].ToString(), dt.Tables[1].Rows[i]["StudentPhoneNumber"].ToString(), dt.Tables[1].Rows[i]["CertificatePath"].ToString(), "Study/Bonafide");
                //    //        //if (status.ToString() == "SUCCESS")
                //    //        //{
                //    //        //    UpdateSmsStatus(9, dt.Tables[1].Rows[i]["Pin"].ToString());
                //    //        //}

                //    //    }
                //    //}
                //}

                return JsonConvert.SerializeObject(dt);


            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }


        [HttpPost, ActionName("StudyMultipleSelectApprove")]
        public string StudyMultipleSelectApprove([FromBody] JsonObject request)
        {
            try
            {
                var js = JsonConvert.DeserializeObject<ArrayList>(Convert.ToString(request["PINjson"]));
                var finalJsonArray = new ArrayList();
                var jsonArray = new JsonArray();
                for (int i = 0; i < js.Count; i++)
                {
                    var jobject = JsonConvert.DeserializeObject<JsonObject>(JsonConvert.SerializeObject(js[i]));
                    jsonArray.Add(jobject);
                }
                var dbHandler = new dbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@PINjson", JsonConvert.SerializeObject(jsonArray));
                param[1] = new SqlParameter("@userType", request["userType"]);
                param[2] = new SqlParameter("@approvestatus", request["approvestatus"]);
                var dt = dbHandler.ReturnDataWithStoredProcedure("SPB_SET_Study_ApproveStatus", param);
                if (dt.Tables[0].Rows[0]["ResponseCode"].ToString() == "200" && request["userType"].ToString() == "2")
                {
                    for (var i = 0; i < dt.Tables[1].Rows.Count; i++)
                    {
                        if (dt.Tables[1].Rows[i]["StudentPhoneNumber"].ToString() != null || dt.Tables[1].Rows[i]["StudentPhoneNumber"].ToString() != string.Empty)
                        {
                            var status = sendcertSMS(dt.Tables[1].Rows[i]["Pin"].ToString(), dt.Tables[1].Rows[i]["StudentPhoneNumber"].ToString(), dt.Tables[1].Rows[i]["CertificatePath"].ToString(), "Study/Bonafide");
                            if (status.ToString() == "SUCCESS")
                            {
                                UpdateSmsStatus(9, dt.Tables[1].Rows[i]["Pin"].ToString());
                            }

                        }
                    }
                }

                return JsonConvert.SerializeObject(dt);


            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }

        [HttpPost, ActionName("BonafiedSetApproveStatusReject")]
        public string BonafiedSetApproveStatusReject([FromBody] JsonObject request)
        {
            try
            {
                var js = JsonConvert.DeserializeObject<ArrayList>(Convert.ToString(request["PINjson"]));
                var finalJsonArray = new ArrayList();
                var jsonArray = new JsonArray();
                for (int i = 0; i < js.Count; i++)
                {
                    var jobject = JsonConvert.DeserializeObject<JsonObject>(JsonConvert.SerializeObject(js[i]));
                    jsonArray.Add(jobject);
                }
                var dbHandler = new dbHandler();
                var param = new SqlParameter[4];
                param[0] = new SqlParameter("@PINjson", JsonConvert.SerializeObject(jsonArray));
                param[1] = new SqlParameter("@userType", request["userType"]);
                param[2] = new SqlParameter("@approvestatus", request["approvestatus"]);
                param[3] = new SqlParameter("@Remarks", request["Remarks"]);
                var dt = dbHandler.ReturnDataWithStoredProcedure("SPB_SET_Bonafide_ApproveStatus", param);
                string Msg = "PIN : {2}, Your application request for Study/Bonafied Certificate is {0} due to {1}.Secretary, SBTET TS.";
                string url = ConfigurationManager.AppSettings["SMS_API"].ToString();
                if (dt.Tables[0].Rows[0]["ResponseCode"].ToString() == "200")
                {
                    for (var i = 0; i < dt.Tables[1].Rows.Count; i++)
                    {
                        var Message = string.Format(Msg, "Rejected", request["Remarks"].ToString(), dt.Tables[1].Rows[i]["Pin"].ToString());
                        if (dt.Tables[1].Rows[i]["StudentPhoneNumber"].ToString() != null || dt.Tables[1].Rows[i]["StudentPhoneNumber"].ToString() != string.Empty)
                        {
                            string urlParameters = "?mobile=" + dt.Tables[1].Rows[i]["StudentPhoneNumber"].ToString() + "&message=" + Message + "&templateid=1007161786852990603";
                            HttpClient client = new HttpClient();
                            client.BaseAddress = new Uri(url);
                            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                            HttpResponseMessage response = client.GetAsync(urlParameters).Result;
                        }
                    }
                }
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }


        [HttpPost, ActionName("StudySetApproveStatusReject")]
        public string StudySetApproveStatusReject([FromBody] JsonObject request)
        {
            try
            {
                var js = JsonConvert.DeserializeObject<ArrayList>(Convert.ToString(request["PINjson"]));
                var finalJsonArray = new ArrayList();
                var jsonArray = new JsonArray();
                for (int i = 0; i < js.Count; i++)
                {
                    var jobject = JsonConvert.DeserializeObject<JsonObject>(JsonConvert.SerializeObject(js[i]));
                    jsonArray.Add(jobject);
                }
                var dbHandler = new dbHandler();
                var param = new SqlParameter[4];
                param[0] = new SqlParameter("@PINjson", JsonConvert.SerializeObject(jsonArray));
                param[1] = new SqlParameter("@userType", request["userType"]);
                param[2] = new SqlParameter("@approvestatus", request["approvestatus"]);
                param[3] = new SqlParameter("@Remarks", request["Remarks"]);
                var dt = dbHandler.ReturnDataWithStoredProcedure("SPB_SET_Study_ApproveStatus", param);
                string Msg = "PIN : {2}, Your application request for Study Certificate is {0} due to {1}.Secretary, SBTET TS.";
                string url = ConfigurationManager.AppSettings["SMS_API"].ToString();
                if (dt.Tables[0].Rows[0]["ResponseCode"].ToString() == "200")
                {
                    for (var i = 0; i < dt.Tables[1].Rows.Count; i++)
                    {
                        var Message = string.Format(Msg, "Rejected", request["Remarks"].ToString(), dt.Tables[1].Rows[i]["Pin"].ToString());
                        if (dt.Tables[1].Rows[i]["StudentPhoneNumber"].ToString() != null || dt.Tables[1].Rows[i]["StudentPhoneNumber"].ToString() != string.Empty)
                        {
                            string urlParameters = "?mobile=" + dt.Tables[1].Rows[i]["StudentPhoneNumber"].ToString() + "&message=" + Message + "&templateid=1007161786852990603";
                            HttpClient client = new HttpClient();
                            client.BaseAddress = new Uri(url);
                            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                            HttpResponseMessage response = client.GetAsync(urlParameters).Result;
                        }
                    }
                }
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }


        [HttpPost, ActionName("UpdateOdcDataByPin")]
        public string UpdateOdcDataByPin([FromBody] JsonObject request)
        {
            try
            {



                var dbHandler = new dbHandler();
                var param = new SqlParameter[34];
                param[0] = new SqlParameter("@SNO", request["SNO"]);
                param[1] = new SqlParameter("@UserName", request["UserName"]);
                param[2] = new SqlParameter("@NAME", request["NAME"]);
                param[3] = new SqlParameter("@SEX", request["SEX"]);
                param[4] = new SqlParameter("@FNAME", request["FNAME"]);
                param[5] = new SqlParameter("@CEN", request["CEN"]);
                param[6] = new SqlParameter("@CEN_NAME", request["CEN_NAME"]);
                param[7] = new SqlParameter("@CEN_ADDRESS", request["CEN_ADDRESS"]);
                param[8] = new SqlParameter("@PIN", request["PIN"]);
                param[9] = new SqlParameter("@COURSE", request["COURSE"]);
                param[10] = new SqlParameter("@BR", request["BR"]);
                param[11] = new SqlParameter("@MAX_MARKS_1YR", request["MAX_MARKS_1YR"]);
                param[12] = new SqlParameter("@TOTAL1", request["TOTAL1"]);
                param[13] = new SqlParameter("@TOTAL1_25", request["TOTAL1_25"]);
                param[14] = new SqlParameter("@MAX_MARKS_3SEM", request["MAX_MARKS_3SEM"]);
                param[15] = new SqlParameter("@TOTAL3S", request["TOTAL3S"]);
                param[16] = new SqlParameter("@MAX_MARKS_4SEM", request["MAX_MARKS_4SEM"]);
                param[17] = new SqlParameter("@TOTAL4S", request["TOTAL4S"]);
                param[18] = new SqlParameter("@MAX_MARKS_5SEM", request["MAX_MARKS_5SEM"]);
                param[19] = new SqlParameter("@TOTAL5S", request["TOTAL5S"]);
                param[20] = new SqlParameter("@MAX_MARKS_6SEM", request["MAX_MARKS_6SEM"]);
                param[21] = new SqlParameter("@TOTAL6S", request["TOTAL6S"]);
                param[22] = new SqlParameter("@MAX_MARKS_7SEM", request["MAX_MARKS_7SEM"]);
                param[23] = new SqlParameter("@TOTAL7S", request["TOTAL7S"]);
                param[24] = new SqlParameter("@GRAND_TOTAL", request["GRAND_TOTAL"]);
                param[25] = new SqlParameter("@PER", request["PER"]);
                param[26] = new SqlParameter("@scheme", request["scheme"]);
                param[27] = new SqlParameter("@MAX_MARKS_1SEM", request["MAX_MARKS_1SEM"]);
                param[28] = new SqlParameter("@TOTAL1S", request["TOTAL1S"]);
                param[29] = new SqlParameter("@TOTAL1S_25", request["TOTAL1S_25"]);
                param[30] = new SqlParameter("@MAX_MARKS_2SEM", request["MAX_MARKS_2SEM"]);
                param[31] = new SqlParameter("@TOTAL2S", request["TOTAL2S"]);
                param[32] = new SqlParameter("@TOTAL2S_25", request["TOTAL2S_25"]);
                param[33] = new SqlParameter("@MONTH_YEAR", request["MONTH_YEAR"]);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SET_UpdateStudentODCDetailsByPin", param);

                return JsonConvert.SerializeObject(dt);


            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }

        [HttpPost, ActionName("BonafideSetVerifyStatus")]
        public string BonafideSetVerifyStatus([FromBody] JsonObject request)
        {
            try
            {

                var dbHandler = new dbHandler();
                var param = new SqlParameter[8];
                param[0] = new SqlParameter("@Pin", request["Pin"]);
                param[1] = new SqlParameter("@Name", request["Name"]);
                param[2] = new SqlParameter("@FatherName", request["FatherName"]);
                param[3] = new SqlParameter("@Branchcode", request["Branchcode"]);
                param[4] = new SqlParameter("@AcademicYear", request["AcademicYear"]);
                param[5] = new SqlParameter("@Conduct", request["Conduct"]);
                param[6] = new SqlParameter("@userType", request["userType"]);
                param[7] = new SqlParameter("@Id", request["Id"]);
                var dt = dbHandler.ReturnDataWithStoredProcedure("SBP_set_Bonafide_admin_approvestatus", param);

                return JsonConvert.SerializeObject(dt);


            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }


        [HttpPost, ActionName("StudySetVerifyStatus")]
        public string StudySetVerifyStatus([FromBody] JsonObject request)
        {
            try
            {

                var dbHandler = new dbHandler();
                var param = new SqlParameter[8];
                param[0] = new SqlParameter("@Pin", request["Pin"]);
                param[1] = new SqlParameter("@Name", request["Name"]);
                param[2] = new SqlParameter("@FatherName", request["FatherName"]);
                param[3] = new SqlParameter("@Branchcode", request["Branchcode"]);
                param[4] = new SqlParameter("@AcademicYear", request["AcademicYear"]);
                param[5] = new SqlParameter("@Conduct", request["Conduct"]);
                param[6] = new SqlParameter("@userType", request["userType"]);
                param[7] = new SqlParameter("@Id", request["Id"]);
                var dt = dbHandler.ReturnDataWithStoredProcedure("SBP_set_Study_admin_approvestatus", param);

                return JsonConvert.SerializeObject(dt);


            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }





        [HttpPost, ActionName("AdminBonafideSetVerifyStatus")]
        public string AdminBonafideSetVerifyStatus([FromBody] JsonObject request)
        {
            try
            {

                var dbHandler = new dbHandler();
                var param = new SqlParameter[6];
                param[0] = new SqlParameter("@Pin", request["Pin"]);
                param[1] = new SqlParameter("@Name", request["Name"]);
                param[2] = new SqlParameter("@FatherName", request["FatherName"]);
                param[3] = new SqlParameter("@Branchcode", request["Branchcode"]);
                param[4] = new SqlParameter("@AcademicYear", request["AcademicYear"]);
                param[5] = new SqlParameter("@userType", request["userType"]);
                var dt = dbHandler.ReturnDataWithStoredProcedure("SBP_set_Bonafide_admin_approvestatus", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }


        [HttpPost, ActionName("TcSetApproveStatus")]
        public string TcSetApproveStatus([FromBody] JsonObject request)
        {
            try
            {
                //var js = JsonConvert.DeserializeObject<ArrayList>(Convert.ToString(request["PINjson"]));
                //var finalJsonArray = new ArrayList();
                //var jsonArray = new JsonArray();
                //for (int i = 0; i < js.Count; i++)
                //{
                //    var jobject = JsonConvert.DeserializeObject<JsonObject>(JsonConvert.SerializeObject(js[i]));
                //    jsonArray.Add(jobject);
                //}
                var dbHandler = new dbHandler();
                var param = new SqlParameter[18];
                param[0] = new SqlParameter("@Pin", request["Pin"]);
                param[1] = new SqlParameter("@userType", request["userType"]);
                param[2] = new SqlParameter("@admittedDate", request["admittedDate"]);
                param[3] = new SqlParameter("@LeftDate", request["LeftDate"]);
                param[4] = new SqlParameter("@CollegeDuesPaid", request["CollegeDuesPaid"]);
                param[5] = new SqlParameter("@Religion", request["Religion"]);
                param[6] = new SqlParameter("@Nationality", request["Nationality"]);
                param[7] = new SqlParameter("@Caste", request["Caste"]);
                param[8] = new SqlParameter("@DateOfBirth", request["DateOfBirth"]);
                param[9] = new SqlParameter("@MotherName", request["MotherName"]);
                param[10] = new SqlParameter("@Promoted", request["Promoted"]);
                param[11] = new SqlParameter("@Conduct", request["Conduct"]);
                param[12] = new SqlParameter("@StudentRemarks", request["StudentRemarks"]);
                param[13] = new SqlParameter("@LeftClass", request["LeftClass"]);
                param[14] = new SqlParameter("@Station", request["Station"]);
                param[15] = new SqlParameter("@AdmissionNo", request["AdmissionNo"]);
                param[16] = new SqlParameter("@IdMark1", request["IdMark1"]);
                param[17] = new SqlParameter("@IdMark2", request["IdMark2"]);
                var dt = dbHandler.ReturnDataWithStoredProcedure("SPB_SET_Tc_Admin_ApproveStatus", param);
                //string Msg = "PIN : {0}, Your application Request for name correction is Approved, Secretary, SBTETTS.";
                //string url = ConfigurationManager.AppSettings["SMS_API"].ToString();
                //if (dt.Tables[0].Rows[0]["ResponseCode"].ToString() == "200" && request["userType"].ToString() == "2")
                //{
                //    for (var i = 0; i < dt.Tables[1].Rows.Count; i++)
                //    {
                //        var Message = string.Format(Msg, dt.Tables[1].Rows[i]["Pin"].ToString());
                //        if (dt.Tables[1].Rows[i]["StudentPhoneNumber"].ToString() != null || dt.Tables[1].Rows[i]["StudentPhoneNumber"].ToString() != string.Empty)
                //        {
                //            string urlParameters = "?mobile=" + dt.Tables[1].Rows[i]["StudentPhoneNumber"].ToString() + "&message=" + Message;
                //            HttpClient client = new HttpClient();
                //            client.BaseAddress = new Uri(url);
                //            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                //            HttpResponseMessage response = client.GetAsync(urlParameters).Result;
                //        }
                //    }
                //  }
                return JsonConvert.SerializeObject(dt);


            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }

        [HttpPost, ActionName("TcSetApproveStatusReject")]
        public string TcSetApproveStatusReject([FromBody] JsonObject request)
        {
            try
            {
                var js = JsonConvert.DeserializeObject<ArrayList>(Convert.ToString(request["PINjson"]));
                var finalJsonArray = new ArrayList();
                var jsonArray = new JsonArray();
                for (int i = 0; i < js.Count; i++)
                {
                    var jobject = JsonConvert.DeserializeObject<JsonObject>(JsonConvert.SerializeObject(js[i]));
                    jsonArray.Add(jobject);
                }
                var dbHandler = new dbHandler();
                var param = new SqlParameter[4];
                param[0] = new SqlParameter("@PINjson", JsonConvert.SerializeObject(jsonArray));
                param[1] = new SqlParameter("@userType", request["userType"]);
                param[2] = new SqlParameter("@approvestatus", request["approvestatus"]);
                param[3] = new SqlParameter("@Remarks", request["Remarks"]);
                var dt = dbHandler.ReturnDataWithStoredProcedure("SPB_SET_Tc_ApproveStatus", param);
                string Msg = "PIN : {2}, Your application request for Transfer Certificate is {0} due to {1}.Secretary, SBTET TS.";
                string url = ConfigurationManager.AppSettings["SMS_API"].ToString();
                if (dt.Tables[0].Rows[0]["ResponseCode"].ToString() == "200")
                {
                    for (var i = 0; i < dt.Tables[1].Rows.Count; i++)
                    {
                        var Message = string.Format(Msg, "Rejected", request["Remarks"].ToString(), dt.Tables[1].Rows[i]["Pin"].ToString());
                        if (dt.Tables[1].Rows[i]["StudentPhoneNumber"].ToString() != null || dt.Tables[1].Rows[i]["StudentPhoneNumber"].ToString() != string.Empty)
                        {
                            string urlParameters = "?mobile=" + dt.Tables[1].Rows[i]["StudentPhoneNumber"].ToString() + "&message=" + Message + "&templateid=1007161786852990603";
                            HttpClient client = new HttpClient();
                            client.BaseAddress = new Uri(url);
                            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                            HttpResponseMessage response = client.GetAsync(urlParameters).Result;
                        }
                    }
                }
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }

        [HttpGet, ActionName("GenerateC18MemosDataByPin")]
        public string GenerateC18MemosDataByPin(int ExamMonthYearId, int MinCredits, string Day, string Month, string Year, string PIN)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[6];
                param[0] = new SqlParameter("@ExamMonthYearId", ExamMonthYearId);
                param[1] = new SqlParameter("@MinCredits", MinCredits);
                param[2] = new SqlParameter("@Day", Day);
                param[3] = new SqlParameter("@Month", Month);
                param[4] = new SqlParameter("@Year", Year);
                param[5] = new SqlParameter("@PIN", PIN);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SET_GenerateC18ConsolidatedMemo_ByPIN", param);
                if (dt.Tables[0].Rows[0]["ResponceCode"].ToString() == "200")
                {

                    //var Date = DateTime.Now.ToString("dd-MM-yyyy_hh:mm:ss");
                    var filename = "C18_Consolidated_Memo_ByPin_" + PIN + ".xlsx";
                    var eh = new ExcelHelper();
                    var path = ConfigurationManager.AppSettings["DownloadsFolderPath"];
                    bool folderExists = Directory.Exists(path);
                    if (!folderExists)
                        Directory.CreateDirectory(path);
                    eh.ExportDataSet(dt, path + filename);
                    Timer timer = new Timer(200000);
                    timer.Elapsed += (sender, e) => elapse(sender, e, ConfigurationManager.AppSettings["DownloadsFolderPath"] + filename);
                    timer.Start();
                    var file = "/Downloads/" + filename;
                    List<person> p = new List<person>();
                    person p1 = new person();
                    p1.file = file;
                    p1.ResponceCode = dt.Tables[0].Rows[0]["ResponceCode"].ToString();
                    p1.ResponceDescription = dt.Tables[0].Rows[0]["ResponceDescription"].ToString();
                    p.Add(p1);

                    return JsonConvert.SerializeObject(p);
                    //return ;

                }
                else
                {
                    List<person> p = new List<person>();
                    person p1 = new person();
                    p1.file = "";
                    p1.ResponceCode = dt.Tables[0].Rows[0]["ResponceCode"].ToString();
                    p1.ResponceDescription = dt.Tables[0].Rows[0]["ResponceDescription"].ToString();
                    p.Add(p1);
                    return JsonConvert.SerializeObject(p);
                }
                //return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_SET_GenerateC18ConsolidatedMemo", 0, ex.Message);
                return ex.Message;
            }
        }



        [HttpPost, ActionName("InterimSetApproveStatus")]
        public string InterimSetApproveStatus([FromBody] JsonObject request)
        {
            try
            {
                var js = JsonConvert.DeserializeObject<ArrayList>(Convert.ToString(request["PINjson"]));
                var finalJsonArray = new ArrayList();
                var jsonArray = new JsonArray();
                for (int i = 0; i < js.Count; i++)
                {
                    var jobject = JsonConvert.DeserializeObject<JsonObject>(JsonConvert.SerializeObject(js[i]));
                    jsonArray.Add(jobject);
                }
                var dbHandler = new dbHandler();
                var param = new SqlParameter[3];

                param[0] = new SqlParameter("@PINjson", JsonConvert.SerializeObject(jsonArray));
                param[1] = new SqlParameter("@userType", request["userType"]);
                param[2] = new SqlParameter("@approvestatus", request["approvestatus"]);
                var dt = dbHandler.ReturnDataWithStoredProcedure("SPB_SET_IC_Admin_ApproveStatus", param);
                if (dt.Tables[0].Rows[0]["ResponseCode"].ToString() == "200" && request["userType"].ToString() == "1009")
                {
                    for (var i = 0; i < dt.Tables[1].Rows.Count; i++)
                    {
                        if (dt.Tables[1].Rows[i]["StudentPhoneNumber"].ToString() != null || dt.Tables[1].Rows[i]["StudentPhoneNumber"].ToString() != string.Empty)
                        {
                            var status = sendcertSMS(dt.Tables[1].Rows[i]["Pin"].ToString(), dt.Tables[1].Rows[i]["StudentPhoneNumber"].ToString(), dt.Tables[1].Rows[i]["CertificatePath"].ToString(), "Interim");
                            if (status.ToString() == "SUCCESS")
                            {
                                UpdateSmsStatus(2, dt.Tables[1].Rows[i]["Pin"].ToString());
                            }

                        }
                    }
                }
                return JsonConvert.SerializeObject(dt);


            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }

        [HttpPost, ActionName("InterimSetApproveStatusReject")]
        public string InterimSetApproveStatusReject([FromBody] JsonObject request)
        {
            try
            {

                var js = JsonConvert.DeserializeObject<ArrayList>(Convert.ToString(request["PINjson"]));
                var finalJsonArray = new ArrayList();
                var jsonArray = new JsonArray();
                for (int i = 0; i < js.Count; i++)
                {
                    var jobject = JsonConvert.DeserializeObject<JsonObject>(JsonConvert.SerializeObject(js[i]));
                    jsonArray.Add(jobject);
                }
                var dbHandler = new dbHandler();
                var param = new SqlParameter[4];
                param[0] = new SqlParameter("@PINjson", JsonConvert.SerializeObject(jsonArray));
                param[1] = new SqlParameter("@userType", request["userType"]);
                param[2] = new SqlParameter("@approvestatus", request["approvestatus"]);
                param[3] = new SqlParameter("@Remarks", request["Remarks"]);
                var dt = dbHandler.ReturnDataWithStoredProcedure("SPB_SET_IC_Admin_ApproveStatus", param);
                string Msg = "PIN : {2}, Your application request for Interim certificate is {0} due to {1}.Secretary, SBTET TS.";
                string url = ConfigurationManager.AppSettings["SMS_API"].ToString();
                if (dt.Tables[0].Rows[0]["ResponseCode"].ToString() == "200")
                {
                    for (var i = 0; i < dt.Tables[1].Rows.Count; i++)
                    {
                        var Message = string.Format(Msg, "Rejected", request["Remarks"].ToString(), dt.Tables[1].Rows[i]["Pin"].ToString());
                        if (dt.Tables[1].Rows[i]["StudentPhoneNumber"].ToString() != null || dt.Tables[1].Rows[i]["StudentPhoneNumber"].ToString() != string.Empty)
                        {
                            string urlParameters = "?mobile=" + dt.Tables[1].Rows[i]["StudentPhoneNumber"].ToString() + "&message=" + Message + "&templateid=1007161786852990603";
                            HttpClient client = new HttpClient();
                            client.BaseAddress = new Uri(url);
                            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                            HttpResponseMessage response = client.GetAsync(urlParameters).Result;
                        }
                    }
                }
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }



        [HttpPost, ActionName("GenuinenessSetApproveStatus")]
        public string GenuinenessSetApproveStatus([FromBody] JsonObject request)
        {
            try
            {
                var js = JsonConvert.DeserializeObject<ArrayList>(Convert.ToString(request["PINjson"]));
                var finalJsonArray = new ArrayList();
                var jsonArray = new JsonArray();
                for (int i = 0; i < js.Count; i++)
                {
                    var jobject = JsonConvert.DeserializeObject<JsonObject>(JsonConvert.SerializeObject(js[i]));
                    jsonArray.Add(jobject);
                }
                var dbHandler = new dbHandler();
                var param = new SqlParameter[3];

                param[0] = new SqlParameter("@PINjson", JsonConvert.SerializeObject(jsonArray));
                param[1] = new SqlParameter("@userType", request["userType"]);
                param[2] = new SqlParameter("@approvestatus", request["approvestatus"]);

                var dt = dbHandler.ReturnDataWithStoredProcedure("SPB_SET_Genuineness_ApproveStatus", param);
                string Msg = "PIN : {0}, Your application request for Genuineness Check is Approved,click here {1}.Secretary, SBTET TS.";
                string url = ConfigurationManager.AppSettings["SMS_API"].ToString();
                if (dt.Tables[0].Rows[0]["ResponseCode"].ToString() == "200" && request["userType"].ToString() == "1002")
                {
                    for (var i = 0; i < dt.Tables[1].Rows.Count; i++)
                    {
                        var Message = string.Format(Msg, dt.Tables[1].Rows[i]["Pin"].ToString(), dt.Tables[1].Rows[i]["CertificatePath"].ToString());
                        if (dt.Tables[1].Rows[i]["StudentPhoneNumber"].ToString() != null || dt.Tables[1].Rows[i]["StudentPhoneNumber"].ToString() != string.Empty)
                        {
                            string urlParameters = "?mobile=" + dt.Tables[1].Rows[i]["StudentPhoneNumber"].ToString() + "&message=" + Message + "&templateid=1007161786832490552";
                            HttpClient client = new HttpClient();
                            client.BaseAddress = new Uri(url);
                            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                            HttpResponseMessage response = client.GetAsync(urlParameters).Result;
                        }
                    }
                }
                return JsonConvert.SerializeObject(dt);


            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }

        [HttpPost, ActionName("GenuinenessSetApproveStatusReject")]
        public string GenuinenessSetApproveStatusReject([FromBody] JsonObject request)
        {
            try
            {

                var js = JsonConvert.DeserializeObject<ArrayList>(Convert.ToString(request["PINjson"]));
                var finalJsonArray = new ArrayList();
                var jsonArray = new JsonArray();
                for (int i = 0; i < js.Count; i++)
                {
                    var jobject = JsonConvert.DeserializeObject<JsonObject>(JsonConvert.SerializeObject(js[i]));
                    jsonArray.Add(jobject);
                }
                var dbHandler = new dbHandler();
                var param = new SqlParameter[4];
                param[0] = new SqlParameter("@PINjson", JsonConvert.SerializeObject(jsonArray));
                param[1] = new SqlParameter("@userType", request["userType"]);
                param[2] = new SqlParameter("@approvestatus", request["approvestatus"]);
                param[3] = new SqlParameter("@Remarks", request["Remarks"]);
                var dt = dbHandler.ReturnDataWithStoredProcedure("SPB_SET_Genuineness_ApproveStatus", param);
                string Msg = "PIN : {2}, Your application request for Genuineness Check is {0} due to {1}. Secretary, SBTET TS.";
                string url = ConfigurationManager.AppSettings["SMS_API"].ToString();
                if (dt.Tables[0].Rows[0]["ResponseCode"].ToString() == "200")
                {
                    for (var i = 0; i < dt.Tables[1].Rows.Count; i++)
                    {
                        var Message = string.Format(Msg, "Rejected", request["Remarks"].ToString(), dt.Tables[1].Rows[i]["Pin"].ToString());
                        if (dt.Tables[1].Rows[i]["StudentPhoneNumber"].ToString() != null || dt.Tables[1].Rows[i]["StudentPhoneNumber"].ToString() != string.Empty)
                        {
                            string urlParameters = "?mobile=" + dt.Tables[1].Rows[i]["StudentPhoneNumber"].ToString() + "&message=" + Message + "&templateid=1007161786852990603";
                            HttpClient client = new HttpClient();
                            client.BaseAddress = new Uri(url);
                            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                            HttpResponseMessage response = client.GetAsync(urlParameters).Result;
                        }
                    }
                }
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }



        [HttpPost, ActionName("DMMSetApproveStatus")]
        public string DMMSetApproveStatus([FromBody] JsonObject request)
        {
            try
            {
                var js = JsonConvert.DeserializeObject<ArrayList>(Convert.ToString(request["PINjson"]));
                var finalJsonArray = new ArrayList();
                var jsonArray = new JsonArray();
                for (int i = 0; i < js.Count; i++)
                {
                    var jobject = JsonConvert.DeserializeObject<JsonObject>(JsonConvert.SerializeObject(js[i]));
                    jsonArray.Add(jobject);
                }
                var dbHandler = new dbHandler();
                var param = new SqlParameter[3];

                param[0] = new SqlParameter("@PINjson", JsonConvert.SerializeObject(jsonArray));
                param[1] = new SqlParameter("@userType", request["userType"]);
                param[2] = new SqlParameter("@approvestatus", request["approvestatus"]);

                var dt = dbHandler.ReturnDataWithStoredProcedure("SPB_SET_DMM_Admin_ApproveStatus", param);
                string Msg = "PIN : {0}, Your application request for Duplicate Marks Memo is Approved. Secretary, SBTET TS.";
                string url = ConfigurationManager.AppSettings["SMS_API"].ToString();
                if (dt.Tables[0].Rows[0]["ResponseCode"].ToString() == "200" && request["userType"].ToString() == "1009")
                {
                    for (var i = 0; i < dt.Tables[1].Rows.Count; i++)
                    {
                        var Message = string.Format(Msg, dt.Tables[1].Rows[i]["Pin"].ToString());
                        if (dt.Tables[1].Rows[i]["StudentPhoneNumber"].ToString() != null || dt.Tables[1].Rows[i]["StudentPhoneNumber"].ToString() != string.Empty)
                        {
                            string urlParameters = "?mobile=" + dt.Tables[1].Rows[i]["StudentPhoneNumber"].ToString() + "&message=" + Message + "&templateid=1007161786840913519";
                            HttpClient client = new HttpClient();
                            client.BaseAddress = new Uri(url);
                            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                            HttpResponseMessage response = client.GetAsync(urlParameters).Result;
                        }
                    }
                }
                return JsonConvert.SerializeObject(dt);


            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }

        [HttpPost, ActionName("TwoYearsCertificateSetApproveStatus")]
        public string TwoYearsCertificateSetApproveStatus([FromBody] JsonObject request)
        {
            try
            {
                var js = JsonConvert.DeserializeObject<ArrayList>(Convert.ToString(request["PINjson"]));
                var finalJsonArray = new ArrayList();
                var jsonArray = new JsonArray();
                for (int i = 0; i < js.Count; i++)
                {
                    var jobject = JsonConvert.DeserializeObject<JsonObject>(JsonConvert.SerializeObject(js[i]));
                    jsonArray.Add(jobject);
                }
                var dbHandler = new dbHandler();
                var param = new SqlParameter[4];

                param[0] = new SqlParameter("@PINjson", JsonConvert.SerializeObject(jsonArray));
                param[1] = new SqlParameter("@userType", request["userType"]);
                param[2] = new SqlParameter("@approvestatus", request["approvestatus"]);
                param[3] = new SqlParameter("@Scheme", request["Scheme"]);
                var dt = dbHandler.ReturnDataWithStoredProcedure("SPB_SET_2YearCertificate_ApproveStatus", param);
                //string Msg = "PIN : {0}, Your application request for Duplicate Marks Memo is Approved. Secretary, SBTET TS.";
                //string url = ConfigurationManager.AppSettings["SMS_API"].ToString();
                //if (dt.Tables[0].Rows[0]["ResponseCode"].ToString() == "200" && request["userType"].ToString() == "1009")
                //{
                //    for (var i = 0; i < dt.Tables[1].Rows.Count; i++)
                //    {
                //        var Message = string.Format(Msg, dt.Tables[1].Rows[i]["Pin"].ToString());
                //        if (dt.Tables[1].Rows[i]["StudentPhoneNumber"].ToString() != null || dt.Tables[1].Rows[i]["StudentPhoneNumber"].ToString() != string.Empty)
                //        {
                //            string urlParameters = "?mobile=" + dt.Tables[1].Rows[i]["StudentPhoneNumber"].ToString() + "&message=" + Message + "&templateid=1007161786840913519";
                //            HttpClient client = new HttpClient();
                //            client.BaseAddress = new Uri(url);
                //            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                //            HttpResponseMessage response = client.GetAsync(urlParameters).Result;
                //        }
                //    }
                //}
                return JsonConvert.SerializeObject(dt);


            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }

        [HttpPost, ActionName("DMMSetApproveStatusReject")]
        public string DMMSetApproveStatusReject([FromBody] JsonObject request)
        {
            try
            {

                var js = JsonConvert.DeserializeObject<ArrayList>(Convert.ToString(request["PINjson"]));
                var finalJsonArray = new ArrayList();
                var jsonArray = new JsonArray();
                for (int i = 0; i < js.Count; i++)
                {
                    var jobject = JsonConvert.DeserializeObject<JsonObject>(JsonConvert.SerializeObject(js[i]));
                    jsonArray.Add(jobject);
                }
                var dbHandler = new dbHandler();
                var param = new SqlParameter[4];
                param[0] = new SqlParameter("@PINjson", JsonConvert.SerializeObject(jsonArray));
                param[1] = new SqlParameter("@userType", request["userType"]);
                param[2] = new SqlParameter("@approvestatus", request["approvestatus"]);
                param[3] = new SqlParameter("@Remarks", request["Remarks"]);
                var dt = dbHandler.ReturnDataWithStoredProcedure("SPB_SET_DMM_Admin_ApproveStatus", param);
                string Msg = "PIN : {2}, Your application request for Duplicate Marks Memo is {0} due to {1}. Secretary, SBTET TS.";
                string url = ConfigurationManager.AppSettings["SMS_API"].ToString();
                if (dt.Tables[0].Rows[0]["ResponseCode"].ToString() == "200")
                {
                    for (var i = 0; i < dt.Tables[1].Rows.Count; i++)
                    {
                        var Message = string.Format(Msg, "Rejected", request["Remarks"].ToString(), dt.Tables[1].Rows[i]["Pin"].ToString());
                        if (dt.Tables[1].Rows[i]["StudentPhoneNumber"].ToString() != null || dt.Tables[1].Rows[i]["StudentPhoneNumber"].ToString() != string.Empty)
                        {
                            string urlParameters = "?mobile=" + dt.Tables[1].Rows[i]["StudentPhoneNumber"].ToString() + "&message=" + Message + "&templateid=1007161786852990603";
                            HttpClient client = new HttpClient();
                            client.BaseAddress = new Uri(url);
                            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                            HttpResponseMessage response = client.GetAsync(urlParameters).Result;
                        }
                    }
                }
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }

        [HttpPost, ActionName("TwoYearsCertificateSetApproveStatusReject")]
        public string TwoYearsCertificateSetApproveStatusReject([FromBody] JsonObject request)
        {
            try
            {

                var js = JsonConvert.DeserializeObject<ArrayList>(Convert.ToString(request["PINjson"]));
                var finalJsonArray = new ArrayList();
                var jsonArray = new JsonArray();
                for (int i = 0; i < js.Count; i++)
                {
                    var jobject = JsonConvert.DeserializeObject<JsonObject>(JsonConvert.SerializeObject(js[i]));
                    jsonArray.Add(jobject);
                }
                var dbHandler = new dbHandler();
                var param = new SqlParameter[5];
                param[0] = new SqlParameter("@PINjson", JsonConvert.SerializeObject(jsonArray));
                param[1] = new SqlParameter("@userType", request["userType"]);
                param[2] = new SqlParameter("@approvestatus", request["approvestatus"]);
                param[3] = new SqlParameter("@Scheme", request["Scheme"]);
                param[4] = new SqlParameter("@Remarks", request["Remarks"]);
                var dt = dbHandler.ReturnDataWithStoredProcedure("SPB_SET_2YearCertificate_ApproveStatus", param);
                //string Msg = "PIN : {2}, Your application request for Duplicate Marks Memo is {0} due to {1}. Secretary, SBTET TS.";
                //string url = ConfigurationManager.AppSettings["SMS_API"].ToString();
                //if (dt.Tables[0].Rows[0]["ResponseCode"].ToString() == "200")
                //{
                //    for (var i = 0; i < dt.Tables[1].Rows.Count; i++)
                //    {
                //        var Message = string.Format(Msg, "Rejected", request["Remarks"].ToString(), dt.Tables[1].Rows[i]["Pin"].ToString());
                //        if (dt.Tables[1].Rows[i]["StudentPhoneNumber"].ToString() != null || dt.Tables[1].Rows[i]["StudentPhoneNumber"].ToString() != string.Empty)
                //        {
                //            string urlParameters = "?mobile=" + dt.Tables[1].Rows[i]["StudentPhoneNumber"].ToString() + "&message=" + Message + "&templateid=1007161786852990603";
                //            HttpClient client = new HttpClient();
                //            client.BaseAddress = new Uri(url);
                //            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                //            HttpResponseMessage response = client.GetAsync(urlParameters).Result;
                //        }
                //    }
                //}
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }


        [HttpPost, ActionName("OdcSetApproveStatus")]
        public string OdcSetApproveStatus([FromBody] JsonObject request)
        {
            try
            {
                var js = JsonConvert.DeserializeObject<ArrayList>(Convert.ToString(request["PINjson"]));
                var finalJsonArray = new ArrayList();
                var jsonArray = new JsonArray();
                for (int i = 0; i < js.Count; i++)
                {
                    var jobject = JsonConvert.DeserializeObject<JsonObject>(JsonConvert.SerializeObject(js[i]));
                    jsonArray.Add(jobject);
                }
                var dbHandler = new dbHandler();
                var param = new SqlParameter[3];

                param[0] = new SqlParameter("@PINjson", JsonConvert.SerializeObject(jsonArray));
                param[1] = new SqlParameter("@userType", request["userType"]);
                param[2] = new SqlParameter("@approvestatus", request["approvestatus"]);

                var dt = dbHandler.ReturnDataWithStoredProcedure("SPB_SET_ODC_Admin_ApproveStatus", param);
                //string Msg = "PIN : {0}, Your application request for Duplicate ODC is Approved, Secretary, SBTETTS.";
                //string url = ConfigurationManager.AppSettings["SMS_API"].ToString();
                //if (dt.Tables[0].Rows[0]["ResponseCode"].ToString() == "200" && request["userType"].ToString() == "1009")
                //{
                //    for (var i = 0; i < dt.Tables[1].Rows.Count; i++)
                //    {
                //        var Message = string.Format(Msg, dt.Tables[1].Rows[i]["Pin"].ToString());
                //        if (dt.Tables[1].Rows[i]["StudentPhoneNumber"].ToString() != null || dt.Tables[1].Rows[i]["StudentPhoneNumber"].ToString() != string.Empty)
                //        {
                //            string urlParameters = "?mobile=" + dt.Tables[1].Rows[i]["StudentPhoneNumber"].ToString() + "&message=" + Message;
                //            HttpClient client = new HttpClient();
                //            client.BaseAddress = new Uri(url);
                //            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                //            HttpResponseMessage response = client.GetAsync(urlParameters).Result;
                //        }
                //    }
                //}
                return JsonConvert.SerializeObject(dt);


            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }

        [HttpPost, ActionName("OdcSetApproveStatusReject")]
        public string OdcSetApproveStatusReject([FromBody] JsonObject request)
        {
            try
            {

                var js = JsonConvert.DeserializeObject<ArrayList>(Convert.ToString(request["PINjson"]));
                var finalJsonArray = new ArrayList();
                var jsonArray = new JsonArray();
                for (int i = 0; i < js.Count; i++)
                {
                    var jobject = JsonConvert.DeserializeObject<JsonObject>(JsonConvert.SerializeObject(js[i]));
                    jsonArray.Add(jobject);
                }
                var dbHandler = new dbHandler();
                var param = new SqlParameter[4];
                param[0] = new SqlParameter("@PINjson", JsonConvert.SerializeObject(jsonArray));
                param[1] = new SqlParameter("@userType", request["userType"]);
                param[2] = new SqlParameter("@approvestatus", request["approvestatus"]);
                param[3] = new SqlParameter("@Remarks", request["Remarks"]);
                var dt = dbHandler.ReturnDataWithStoredProcedure("SPB_SET_ODC_Admin_ApproveStatus", param);
                //string Msg = "PIN : {2}, Your application request for Duplicate ODC is {0} due to {1} - Secretary, SBTETTS.";
                //string url = ConfigurationManager.AppSettings["SMS_API"].ToString();
                //if (dt.Tables[0].Rows[0]["ResponseCode"].ToString() == "200")
                //{
                //    for (var i = 0; i < dt.Tables[1].Rows.Count; i++)
                //    {
                //        var Message = string.Format(Msg, "Rejected", request["Remarks"].ToString(), dt.Tables[1].Rows[i]["Pin"].ToString());
                //        if (dt.Tables[1].Rows[i]["StudentPhoneNumber"].ToString() != null || dt.Tables[0].Rows[i]["StudentPhoneNumber"].ToString() != string.Empty)
                //        {
                //            string urlParameters = "?mobile=" + dt.Tables[1].Rows[i]["StudentPhoneNumber"].ToString() + "&message=" + Message;
                //            HttpClient client = new HttpClient();
                //            client.BaseAddress = new Uri(url);
                //            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                //            HttpResponseMessage response = client.GetAsync(urlParameters).Result;
                //        }
                //    }
                //}
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }

        [HttpPost, ActionName("TranscriptSetApproveStatus")]
        public string TranscriptSetApproveStatus([FromBody] JsonObject request)
        {

            try
            {
                var js = JsonConvert.DeserializeObject<ArrayList>(Convert.ToString(request["Applicationjson"]));
                var finalJsonArray = new ArrayList();
                var jsonArray = new JsonArray();
                for (int i = 0; i < js.Count; i++)
                {
                    var jobject = JsonConvert.DeserializeObject<JsonObject>(JsonConvert.SerializeObject(js[i]));
                    jsonArray.Add(jobject);
                }
                var dbHandler = new dbHandler();
                var param = new SqlParameter[3];

                param[0] = new SqlParameter("@AppNojson", JsonConvert.SerializeObject(jsonArray));
                param[1] = new SqlParameter("@userType", request["userType"]);
                param[2] = new SqlParameter("@approvestatus", request["approvestatus"]);
                var dt = dbHandler.ReturnDataWithStoredProcedure("SPB_SET_Transcript_Admin_ApproveStatus", param);
                string Msg = "PIN : {0}, Your application request for transcripts is Approved. Secretary, SBTET TS.";
                string url = ConfigurationManager.AppSettings["SMS_API"].ToString();
                if (dt.Tables[0].Rows[0]["ResponseCode"].ToString() == "200" && request["userType"].ToString() == "1009")
                {
                    for (var i = 0; i < dt.Tables[1].Rows.Count; i++)
                    {
                        var Message = string.Format(Msg, dt.Tables[1].Rows[i]["Pin"].ToString());
                        if (dt.Tables[1].Rows[i]["StudentPhoneNumber"].ToString() != null || dt.Tables[1].Rows[i]["StudentPhoneNumber"].ToString() != string.Empty)
                        {
                            string urlParameters = "?mobile=" + dt.Tables[1].Rows[i]["StudentPhoneNumber"].ToString() + "&message=" + Message + "&templateid=1007161916695496584";
                            HttpClient client = new HttpClient();
                            client.BaseAddress = new Uri(url);
                            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                            HttpResponseMessage response = client.GetAsync(urlParameters).Result;
                        }
                    }
                }
                return JsonConvert.SerializeObject(dt);


            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpPost, ActionName("TranscriptSetApproveStatusReject")]
        public string TranscriptSetApproveStatusReject([FromBody] JsonObject request)
        {
            try
            {
                var js = JsonConvert.DeserializeObject<ArrayList>(Convert.ToString(request["Applicationjson"]));
                var finalJsonArray = new ArrayList();
                var jsonArray = new JsonArray();
                for (int i = 0; i < js.Count; i++)
                {
                    var jobject = JsonConvert.DeserializeObject<JsonObject>(JsonConvert.SerializeObject(js[i]));
                    jsonArray.Add(jobject);
                }
                var dbHandler = new dbHandler();
                var param = new SqlParameter[4];
                param[0] = new SqlParameter("@AppNojson", JsonConvert.SerializeObject(jsonArray));
                param[1] = new SqlParameter("@userType", request["userType"]);
                param[2] = new SqlParameter("@approvestatus", request["approvestatus"]);
                param[3] = new SqlParameter("@Remarks", request["Remarks"]);
                var dt = dbHandler.ReturnDataWithStoredProcedure("SPB_SET_Transcript_Admin_ApproveStatus", param);
                string Msg = "PIN : {2}, Your application request for Transcripts is {0} due to {1}. Secretary, SBTET TS.";
                string url = ConfigurationManager.AppSettings["SMS_API"].ToString();
                if (dt.Tables[0].Rows[0]["ResponseCode"].ToString() == "200")
                {
                    for (var i = 0; i < dt.Tables[1].Rows.Count; i++)
                    {
                        var Message = string.Format(Msg, "Rejected", dt.Tables[1].Rows[i]["Remarks"].ToString(), dt.Tables[1].Rows[i]["Pin"].ToString());
                        if (dt.Tables[1].Rows[i]["StudentPhoneNumber"].ToString() != null || dt.Tables[1].Rows[i]["StudentPhoneNumber"].ToString() != string.Empty)
                        {
                            string urlParameters = "?mobile=" + dt.Tables[1].Rows[i]["StudentPhoneNumber"].ToString() + "&message=" + Message + "&templateid=1007161786852990603";
                            HttpClient client = new HttpClient();
                            client.BaseAddress = new Uri(url);
                            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                            HttpResponseMessage response = client.GetAsync(urlParameters).Result;
                        }
                    }
                }
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }


        [HttpPost, ActionName("NameCorrectionSetApproveStatus")]
        public string NameCorrectionSetApproveStatus([FromBody] JsonObject request)
        {
            try
            {

                var js = JsonConvert.DeserializeObject<ArrayList>(Convert.ToString(request["PINjson"]));
                var finalJsonArray = new ArrayList();
                var jsonArray = new JsonArray();
                for (int i = 0; i < js.Count; i++)
                {
                    var jobject = JsonConvert.DeserializeObject<JsonObject>(JsonConvert.SerializeObject(js[i]));
                    jsonArray.Add(jobject);
                }
                var dbHandler = new dbHandler();
                var param = new SqlParameter[3];

                param[0] = new SqlParameter("@PINjson", JsonConvert.SerializeObject(jsonArray));
                param[1] = new SqlParameter("@userType", request["userType"]);
                param[2] = new SqlParameter("@approvestatus", request["approvestatus"]);
                var dt = dbHandler.ReturnDataWithStoredProcedure("SPB_SET_NC_Admin_ApproveStatus", param);

                string Msg = "PIN : {0}, Your request for name correction is Approved & Corrected in SBTET records. Secretary, SBTET TS.";
                string url = ConfigurationManager.AppSettings["SMS_API"].ToString();
                if (dt.Tables[0].Rows[0]["ResponseCode"].ToString() == "200" && request["userType"].ToString() == "1009")
                {
                    for (var i = 0; i < dt.Tables[1].Rows.Count; i++)
                    {
                        var Message = string.Format(Msg, dt.Tables[1].Rows[i]["Pin"].ToString());
                        if (dt.Tables[1].Rows[i]["StudentPhoneNumber"].ToString() != null || dt.Tables[1].Rows[i]["StudentPhoneNumber"].ToString() != string.Empty)
                        {
                            string urlParameters = "?mobile=" + dt.Tables[1].Rows[i]["StudentPhoneNumber"].ToString() + "&message=" + Message + "&templateid=1007161786859218822";
                            HttpClient client = new HttpClient();
                            client.BaseAddress = new Uri(url);
                            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                            HttpResponseMessage response = client.GetAsync(urlParameters).Result;
                        }
                    }
                }
                return JsonConvert.SerializeObject(dt);


            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }

        [HttpPost, ActionName("NameCorrectionSetApproveStatusforDsJs")]
        public string NameCorrectionSetApproveStatusforDsJs([FromBody] JsonObject request)
        {
            try
            {

                var js = JsonConvert.DeserializeObject<ArrayList>(Convert.ToString(request["PINjson"]));
                var finalJsonArray = new ArrayList();
                var jsonArray = new JsonArray();
                for (int i = 0; i < js.Count; i++)
                {
                    var jobject = JsonConvert.DeserializeObject<JsonObject>(JsonConvert.SerializeObject(js[i]));
                    jsonArray.Add(jobject);
                }
                var dbHandler = new dbHandler();
                var param = new SqlParameter[3];

                param[0] = new SqlParameter("@PINjson", JsonConvert.SerializeObject(jsonArray));
                param[1] = new SqlParameter("@userType", request["userType"]);
                param[2] = new SqlParameter("@approvestatus", request["approvestatus"]);
                var dt = dbHandler.ReturnDataWithStoredProcedure("SPB_SET_NC_DS_JS_ApproveStatus", param);

                string Msg = "PIN : {0}, Your request for name correction is Approved & Corrected in SBTET records. Secretary, SBTET TS.";
                string url = ConfigurationManager.AppSettings["SMS_API"].ToString();
                if (dt.Tables[0].Rows[0]["ResponseCode"].ToString() == "200" && request["userType"].ToString() == "1002")
                {
                    for (var i = 0; i < dt.Tables[1].Rows.Count; i++)
                    {
                        var Message = string.Format(Msg, dt.Tables[1].Rows[i]["Pin"].ToString());
                        if (dt.Tables[1].Rows[i]["StudentPhoneNumber"].ToString() != null || dt.Tables[1].Rows[i]["StudentPhoneNumber"].ToString() != string.Empty)
                        {
                            string urlParameters = "?mobile=" + dt.Tables[1].Rows[i]["StudentPhoneNumber"].ToString() + "&message=" + Message + "&templateid=1007161786859218822";
                            HttpClient client = new HttpClient();
                            client.BaseAddress = new Uri(url);
                            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                            HttpResponseMessage response = client.GetAsync(urlParameters).Result;
                        }
                    }
                }
                return JsonConvert.SerializeObject(dt);


            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }




        [HttpPost, ActionName("NameCorrectionSetApproveStatusReject")]
        public string NameCorrectionSetApproveStatusReject([FromBody] JsonObject request)
        {
            try
            {
                var js = JsonConvert.DeserializeObject<ArrayList>(Convert.ToString(request["PINjson"]));
                var finalJsonArray = new ArrayList();
                var jsonArray = new JsonArray();
                for (int i = 0; i < js.Count; i++)
                {
                    var jobject = JsonConvert.DeserializeObject<JsonObject>(JsonConvert.SerializeObject(js[i]));
                    jsonArray.Add(jobject);
                }
                var dbHandler = new dbHandler();
                var param = new SqlParameter[4];
                param[0] = new SqlParameter("@PINjson", JsonConvert.SerializeObject(jsonArray));
                param[1] = new SqlParameter("@userType", request["userType"]);
                param[2] = new SqlParameter("@approvestatus", request["approvestatus"]);
                param[3] = new SqlParameter("@Remarks", request["Remarks"]);
                var dt = dbHandler.ReturnDataWithStoredProcedure("SPB_SET_NC_Admin_ApproveStatus", param);
                string Msg = "PIN : {2}, Your application request for name correction is {0} due to {1}. Secretary, SBTET TS.";
                string url = ConfigurationManager.AppSettings["SMS_API"].ToString();
                if (dt.Tables[0].Rows[0]["ResponseCode"].ToString() == "200")
                {
                    for (var i = 0; i < dt.Tables[1].Rows.Count; i++)
                    {
                        var Message = string.Format(Msg, "Rejected", request["Remarks"].ToString(), dt.Tables[1].Rows[i]["Pin"].ToString());
                        if (dt.Tables[1].Rows[i]["StudentPhoneNumber"].ToString() != null || dt.Tables[1].Rows[i]["StudentPhoneNumber"].ToString() != string.Empty)
                        {
                            string urlParameters = "?mobile=" + dt.Tables[1].Rows[i]["StudentPhoneNumber"].ToString() + "&message=" + Message + "&templateid=1007161786852990603";
                            HttpClient client = new HttpClient();
                            client.BaseAddress = new Uri(url);
                            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                            HttpResponseMessage response = client.GetAsync(urlParameters).Result;
                        }
                    }
                }
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }

        [HttpPost, ActionName("MigrationSetApproveStatus")]
        public string MigrationSetApproveStatus([FromBody] JsonObject request)
        {
            try
            {
                var js = JsonConvert.DeserializeObject<ArrayList>(Convert.ToString(request["PINjson"]));
                var finalJsonArray = new ArrayList();
                var jsonArray = new JsonArray();
                for (int i = 0; i < js.Count; i++)
                {
                    var jobject = JsonConvert.DeserializeObject<JsonObject>(JsonConvert.SerializeObject(js[i]));
                    jsonArray.Add(jobject);
                }
                var dbHandler = new dbHandler();
                var param = new SqlParameter[3];

                param[0] = new SqlParameter("@PINjson", JsonConvert.SerializeObject(jsonArray));
                param[1] = new SqlParameter("@userType", request["userType"]);
                param[2] = new SqlParameter("@approvestatus", request["approvestatus"]);
                var dt = dbHandler.ReturnDataWithStoredProcedure("SPB_SET_MC_Admin_ApproveStatus", param);
                if (dt.Tables[0].Rows[0]["ResponseCode"].ToString() == "200" && request["userType"].ToString() == "1009")
                {
                    for (var i = 0; i < dt.Tables[1].Rows.Count; i++)
                    {
                        if (dt.Tables[1].Rows[i]["StudentPhoneNumber"].ToString() != null || dt.Tables[1].Rows[i]["StudentPhoneNumber"].ToString() != string.Empty)
                        {
                            var status = sendcertSMS(dt.Tables[1].Rows[i]["Pin"].ToString(), dt.Tables[1].Rows[i]["StudentPhoneNumber"].ToString(), dt.Tables[1].Rows[i]["CertificatePath"].ToString(), "Migration");
                            if (status.ToString() == "SUCCESS")
                            {
                                UpdateSmsStatus(1, dt.Tables[1].Rows[i]["Pin"].ToString());
                            }

                        }
                    }
                }
                return JsonConvert.SerializeObject(dt);


            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }

        [HttpPost, ActionName("MigrationSetApproveStatusReject")]
        public string MigrationSetApproveStatusReject([FromBody] JsonObject request)
        {
            try
            {
                var js = JsonConvert.DeserializeObject<ArrayList>(Convert.ToString(request["PINjson"]));
                var finalJsonArray = new ArrayList();
                var jsonArray = new JsonArray();
                for (int i = 0; i < js.Count; i++)
                {
                    var jobject = JsonConvert.DeserializeObject<JsonObject>(JsonConvert.SerializeObject(js[i]));
                    jsonArray.Add(jobject);
                }
                var dbHandler = new dbHandler();
                var param = new SqlParameter[4];
                param[0] = new SqlParameter("@PINjson", JsonConvert.SerializeObject(jsonArray));
                param[1] = new SqlParameter("@userType", request["userType"]);
                param[2] = new SqlParameter("@approvestatus", request["approvestatus"]);
                param[3] = new SqlParameter("@Remarks", request["Remarks"]);
                var dt = dbHandler.ReturnDataWithStoredProcedure("SPB_SET_MC_Admin_ApproveStatus", param);
                string Msg = "PIN : {2}, Your application request for Migration certificate is {0} due to {1}.Secretary, SBTET TS.";
                string url = ConfigurationManager.AppSettings["SMS_API"].ToString();
                if (dt.Tables[0].Rows[0]["ResponseCode"].ToString() == "200")
                {
                    for (var i = 0; i < dt.Tables[1].Rows.Count; i++)
                    {
                        var Message = string.Format(Msg, "Rejected", request["Remarks"].ToString(), dt.Tables[1].Rows[i]["Pin"].ToString());
                        if (dt.Tables[1].Rows[i]["StudentPhoneNumber"].ToString() != null || dt.Tables[1].Rows[i]["StudentPhoneNumber"].ToString() != string.Empty)
                        {
                            string urlParameters = "?mobile=" + dt.Tables[1].Rows[i]["StudentPhoneNumber"].ToString() + "&message=" + Message + "&templateid=1007161786852990603";
                            HttpClient client = new HttpClient();
                            client.BaseAddress = new Uri(url);
                            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                            HttpResponseMessage response = client.GetAsync(urlParameters).Result;
                        }
                    }
                }
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }


        [HttpPost, ActionName("AttendanceApproveStatus")]
        public string AttendanceApproveStatus([FromBody] JsonObject request)
        {
            try
            {
                var js = JsonConvert.DeserializeObject<ArrayList>(Convert.ToString(request["PINjson"]));
                var finalJsonArray = new ArrayList();
                var jsonArray = new JsonArray();
                for (int i = 0; i < js.Count; i++)
                {
                    var jobject = JsonConvert.DeserializeObject<JsonObject>(JsonConvert.SerializeObject(js[i]));
                    jsonArray.Add(jobject);
                }
                var dbHandler = new dbHandler();
                var param = new SqlParameter[4];
                param[0] = new SqlParameter("@PINjson", JsonConvert.SerializeObject(jsonArray));
                param[1] = new SqlParameter("@UserId", request["UserId"]);
                param[2] = new SqlParameter("@approvestatus", request["approvestatus"]);
                param[3] = new SqlParameter("@Remarks", request["Remarks"]);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SET_AttendenceUpdationApprove", param);
                //string Msg = "PIN : {2}, Your application request for Migration certificate is {0} due to {1}.Secretary, SBTET TS.";
                //string url = ConfigurationManager.AppSettings["SMS_API"].ToString();
                //if (dt.Tables[0].Rows[0]["ResponseCode"].ToString() == "200")
                //{
                //    for (var i = 0; i < dt.Tables[1].Rows.Count; i++)
                //    {
                //        var Message = string.Format(Msg, "Rejected", request["Remarks"].ToString(), dt.Tables[1].Rows[i]["Pin"].ToString());
                //        if (dt.Tables[1].Rows[i]["StudentPhoneNumber"].ToString() != null || dt.Tables[1].Rows[i]["StudentPhoneNumber"].ToString() != string.Empty)
                //        {
                //            string urlParameters = "?mobile=" + dt.Tables[1].Rows[i]["StudentPhoneNumber"].ToString() + "&message=" + Message + "&templateid=1007161786852990603";
                //            HttpClient client = new HttpClient();
                //            client.BaseAddress = new Uri(url);
                //            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                //            HttpResponseMessage response = client.GetAsync(urlParameters).Result;
                //        }
                //    }
                //}
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }


        [HttpGet, ActionName("getApprovePinList")]
        public string getApprovePinList(string Scheme, int datatype, int userType)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@Scheme", Scheme);
                param[1] = new SqlParameter("@datatype", datatype);
                param[2] = new SqlParameter("@userType", userType);
                var dt = dbHandler.ReturnDataWithStoredProcedure("SPB_GET_ApprovePinList", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }


        [HttpGet, ActionName("getTcDetails")]
        public string getTcDetails(string Pin)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@Pin", Pin);

                var dt = dbHandler.ReturnDataWithStoredProcedure("SPB_GET_Tc_StudentDetails", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }


        [HttpGet, ActionName("getOdcdetails")]
        public string getOdcDetails(string Pin)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@Pin", Pin);

                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SS_GET_ODCCertificateDetailsForOfficials", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }


        [HttpGet, ActionName("getGenuinenessCheckdetails")]
        public string getGenuinenessCheckdetails(string Pin, int Id)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@Pin", Pin);
                param[1] = new SqlParameter("@Id", Id);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SS_GET_GenuinenessCheckDetailsForOfficials", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }
        [HttpGet, ActionName("getDMMdetails")]
        public string getDMMdetails(string Pin, string Semester, string ExamMonthYear, string Scheme)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[4];
                param[0] = new SqlParameter("@Pin", Pin);
                param[1] = new SqlParameter("@Semester", Semester);
                param[2] = new SqlParameter("@ExamMonthYear", ExamMonthYear);
                param[3] = new SqlParameter("@Scheme", Scheme);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SS_GET_DMMertificateDetailsForOfficials", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }

        [HttpGet, ActionName("getTranscriptsdetails")]
        public string getTranscriptsdetails(string Pin, string ApplicationNumber)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@Pin", Pin);
                param[1] = new SqlParameter("@ApplicationNumber", ApplicationNumber);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_GET_TranscriptsDataByPin", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }


        [HttpGet, ActionName("getTwoYearsCertificateDetails")]
        public string getTwoYearsCertificateDetails(string pin)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@pin", pin);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_GET_2YearsCertificateDataByPin", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }


        [HttpGet, ActionName("getNCdetails")]
        public string getNCdetails(string Pin)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@Pin", Pin);

                var dt = dbHandler.ReturnDataWithStoredProcedure("SPB_GET_NC_StudentDetails", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }
        [HttpGet, ActionName("GetCertificateTypes")]
        public HttpResponseMessage GetCertificateTypes()
        {
            try
            {
                var dbHandler = new dbHandler();
                string StrQuery = "";
                StrQuery = "exec USP_SFP_GetCertificateTypes";
                return Request.CreateResponse(HttpStatusCode.OK, dbHandler.ReturnDataSet(StrQuery));
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_SFP_GetCertificateTypes", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpGet, ActionName("GetCaste")]
        public HttpResponseMessage GetCaste()
        {
            try
            {
                var dbHandler = new dbHandler();
                string StrQuery = "";
                StrQuery = "exec USP_SFP_GetSubCaste";
                return Request.CreateResponse(HttpStatusCode.OK, dbHandler.ReturnDataSet(StrQuery));
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_SFP_GetSubCaste", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }


        [HttpGet, ActionName("GetCastes")]
        public HttpResponseMessage GetCastes()
        {
            try
            {
                var dbHandler = new dbHandler();
                string StrQuery = "";
                StrQuery = "exec USP_SFP_GetSubCaste";
                return Request.CreateResponse(HttpStatusCode.OK, dbHandler.ReturnDataSet(StrQuery));
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_SFP_GetSubCaste", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpGet, ActionName("GetReligion")]
        public HttpResponseMessage GetReligion()
        {
            try
            {
                var dbHandler = new dbHandler();
                string StrQuery = "";
                StrQuery = "exec USP_SFP_GetReligion";
                return Request.CreateResponse(HttpStatusCode.OK, dbHandler.ReturnDataSet(StrQuery));
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_SFP_GetReligion", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }



        [HttpGet, ActionName("GetNoDataCertificateApprovalList")]
        public HttpResponseMessage GetNoDataCertificateApprovalList()
        {
            try
            {
                var dbHandler = new dbHandler();
                string StrQuery = "";
                StrQuery = "exec USP_SFP_GET_NCCertificateApprovalList";
                return Request.CreateResponse(HttpStatusCode.OK, dbHandler.ReturnDataSet(StrQuery));
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_SFP_GET_NCCertificateApprovalList", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }




        [HttpGet, ActionName("GetInternApproveList")]
        public string GetInternApproveList(int userType)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];

                param[0] = new SqlParameter("@userType", userType);

                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SFP_GET_CertificateRequestList", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }

        [HttpGet, ActionName("GetMigrationApprovalList")]
        public string GetMigrationApprovalList(int userType)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];

                param[0] = new SqlParameter("@userType", userType);

                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SFP_GET_MigrationApprovalList", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }

        [HttpGet, ActionName("GetAttendanceApproveList")]
        public string GetAttendanceApproveList(int UserId)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@UserId", UserId);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_GET_AttendenceUpdationApprovalCount", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }

        [HttpGet, ActionName("GetOdcApprovalList")]
        public string GetOdcApprovalList(int userType)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];

                param[0] = new SqlParameter("@userType", userType);

                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SFP_GET_OdcApprovalList", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }

        [HttpGet, ActionName("GetGenuinenessApprovalList")]
        public string GetGenuinenessApprovalList(int userType)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];

                param[0] = new SqlParameter("@userType", userType);

                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SFP_GET_GenuinenessApprovalList", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }


        [HttpGet, ActionName("GetDuplicateMarksMemoApprovalList")]
        public string GetDuplicateMarksMemoApprovalList(int userType)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];

                param[0] = new SqlParameter("@userType", userType);

                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SFP_GET_DuplicateMarksMemoApprovalList", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }



        [HttpGet, ActionName("GetTranscriptApprovalList")]
        public string GetTranscriptApprovalList(int userType)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];

                param[0] = new SqlParameter("@userType", userType);

                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SFP_GET_TranscriptApprovalList", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }

        [HttpGet, ActionName("GetNameCorrectionApproveList")]
        public string GetNameCorrectionApproveList(int userType)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];

                param[0] = new SqlParameter("@userType", userType);

                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SFP_GET_NameCorrectionApproveList", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }


        [HttpGet, ActionName("UpdateNameCorrectionData")]
        public string UpdateNameCorrectionData(string Pin, string Name, string FatherName)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@Pin", Pin);
                param[1] = new SqlParameter("@Name", Name);
                param[2] = new SqlParameter("@FatherName", FatherName);
                var dt = dbHandler.ReturnDataWithStoredProcedure("SPB_UpdateNameCorrectionData", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }


        [HttpGet, ActionName("GetCertificateApprovalList")]
        public HttpResponseMessage GetCertificateApprovalList()
        {
            try
            {
                var dbHandler = new dbHandler();
                string StrQuery = "";
                StrQuery = "exec USP_SFP_GET_CertificateApprovalList";
                return Request.CreateResponse(HttpStatusCode.OK, dbHandler.ReturnDataSet(StrQuery));
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_SFP_GET_CertificateApprovalList", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }


        [HttpGet, ActionName("GetTcApprovalList")]
        public string GetTcApprovalList(string CollegeCode, int userType)
        {
            try
            {

                var dbHandler = new dbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@CollegeCode", CollegeCode);
                param[1] = new SqlParameter("@userType", userType);

                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SFP_GET_TcApprovalList", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }

        [HttpGet, ActionName("GetTcApprovalLists")]
        public string GetTcApprovalLists(string CollegeCode, int userType, string BranchCode)
        {
            try
            {

                var dbHandler = new dbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@CollegeCode", CollegeCode);
                param[1] = new SqlParameter("@userType", userType);
                param[2] = new SqlParameter("@BranchCode", BranchCode);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SFP_GET_TcApprovalList", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }



        [HttpGet, ActionName("GetBonafideApprovalList")]
        public string GetBonafideApprovalList(string CollegeCode, int userType, string BranchCode = null)
        {
            try
            {

                var dbHandler = new dbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@CollegeCode", CollegeCode);
                param[1] = new SqlParameter("@userType", userType);
                param[2] = new SqlParameter("@BranchCode", BranchCode);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SFP_GET_BonafideApprovalList", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }

        [HttpGet, ActionName("GetStudyCertApprovalList")]
        public string GetStudyCertApprovalList(string CollegeCode, int userType, string BranchCode = null)
        {
            try
            {

                var dbHandler = new dbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@CollegeCode", CollegeCode);
                param[1] = new SqlParameter("@userType", userType);
                param[2] = new SqlParameter("@BranchCode", BranchCode);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SFP_GET_studyApprovalList", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }


        //[HttpGet, ActionName("GetMigrationApprovalList")]
        //public HttpResponseMessage GetMigrationApprovalList()
        //{
        //    try
        //    {
        //        var dbHandler = new dbHandler();
        //        string StrQuery = "";
        //        StrQuery = "exec USP_SFP_GET_MigrationApprovalList";
        //        return Request.CreateResponse(HttpStatusCode.OK, dbHandler.ReturnDataSet(StrQuery));
        //    }
        //    catch (Exception ex)
        //    {
        //        dbHandler.SaveErorr("USP_SFP_GET_MigrationApprovalList", 0, ex.Message);
        //        return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
        //    }
        //}


        [HttpGet, ActionName("getAttendanceReport")]
        public string getAttendanceReport(string Pin)
        {
            try
            {

                Pin = GetDecryptedData(Pin);
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@Pin", Pin);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_Attendance_GET_PercentageByPin", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }


        [HttpGet, ActionName("getCertificateDetailsForApproval")]
        public string getCertificateDetailsForApproval(string Pin)
        {
            try
            {

                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@Pin", Pin);
                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_GET_CertificateApprovalDetails", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }

        [HttpGet, ActionName("ApproveCertificate")]
        public string ApproveCertificate(string PIN, int Approvestatus)
        {
            try
            {

                var dbHandler = new dbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@PIN", PIN);
                param[1] = new SqlParameter("@Approvestatus", Approvestatus);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SOS_AuthoriseCertificate", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }




        [HttpGet, ActionName("getStudentFeePaymentDates")]
        public HttpResponseMessage getStudentFeePaymentDates()
        {
            try
            {
                var dbHandler = new dbHandler();
                string StrQuery = "";
                StrQuery = "exec ADM_SFP_GET_StudentFeePaymentDates";
                return Request.CreateResponse(HttpStatusCode.OK, dbHandler.ReturnDataSet(StrQuery));
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("ADM_SFP_GET_StudentFeePaymentDates", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpGet, ActionName("GetStudentApprovalList")]
        public HttpResponseMessage GetStudentApprovalList()
        {
            try
            {
                var dbHandler = new dbHandler();
                string StrQuery = "";
                StrQuery = "exec SP_GET_CertificateApprovalList";
                return Request.CreateResponse(HttpStatusCode.OK, dbHandler.ReturnDataSet(StrQuery));
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("SP_GET_CertificateApprovalList", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpGet, ActionName("GetUserDetails")]
        public string GetUserDetails(string pin)
        {
            try
            {
                string Pin = GetDecryptedData(pin);
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@pin", Pin);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SFP_GET_GetStudentDetailsForCertificate", param);
                return JsonConvert.SerializeObject(dt);

            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_SFP_GET_GetStudentDetailsForCertificate", 0, ex.Message);
                return ex.Message;
            }

        }

        [HttpGet, ActionName("GetTwoYearsPinDetails")]
        public HttpResponseMessage GetTwoYearsPinDetails(string pin)
        {
            try
            {
                string Pin = GetDecryptedData(pin);
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@pin", Pin);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SFP_GET_GetStudentDetailsFor60PercentCertificate", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_SFP_GET_GetStudentDetailsFor60PercentCertificate", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }

        }

        [HttpGet, ActionName("CertificateFeePaymentChallanNumber")]
        public HttpResponseMessage CertificateFeePaymentChallanNumber(string pin, int CertificateType = 0)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@pin", pin);
                param[1] = new SqlParameter("@CertificateType", CertificateType);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SFP_GET_CertificateFeePaymentChallanNumber", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_SFP_GET_CertificateFeePaymentChallanNumber", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }

        [HttpGet, ActionName("MersidyFeePaymentChallanNumber")]
        public HttpResponseMessage MersidyFeePaymentChallanNumber(string pin, int CertificateType)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@pin", pin);
                param[1] = new SqlParameter("@CertificateType", CertificateType);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SFP_GET_CertificateFeePaymentChallanNumber", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_SFP_GET_CertificateFeePaymentChallanNumber", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }

        [HttpGet, ActionName("BackLogDetailsForNc")]
        public HttpResponseMessage BackLogDetailsForNc(string pin)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@Pin", pin);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SOS_GET_BacklogSubjectDataForNc", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_SOS_GET_BacklogSubjectDataForNc", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }

        [HttpGet, ActionName("GetCertificateFee")]
        public HttpResponseMessage GetCertificateFee()
        {
            try
            {
                var dbHandler = new dbHandler();
                string StrQuery = "";
                StrQuery = "exec USP_SOS_GetCertificateFee";
                return Request.CreateResponse(HttpStatusCode.OK, dbHandler.ReturnDataSet(StrQuery));
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_SOS_GetCertificateFee", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }


        [HttpGet, ActionName("GetBranchs")]
        public HttpResponseMessage GetBranchs()
        {
            try
            {
                var dbHandler = new dbHandler();
                string StrQuery = "";
                StrQuery = "exec USP_SOS_GET_Branches";
                return Request.CreateResponse(HttpStatusCode.OK, dbHandler.ReturnDataSet(StrQuery));
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_SOS_GET_Branches", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }

        [HttpGet, ActionName("GetExamMonthYearByAcademicYear")]
        public HttpResponseMessage GetExamMonthYearByAcademicYear(int Academicyearid, int SessionId)
        {
            try
            {

                var dbHandler = new dbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@Academicyearid", Academicyearid);
                param[1] = new SqlParameter("@SessionId", SessionId);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_GET_ExamMonthYearByAcademicYearSession", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_GET_ExamMonthYearByAcademicYearSession", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
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


        [HttpGet, ActionName("getMercyData")]
        public HttpResponseMessage getMercyData(int Id, int DataType)
        {
            try
            {

                var dbHandler = new dbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@Id", Id);
                param[1] = new SqlParameter("@DataType", DataType);
                var dt = dbHandler.ReturnDataWithStoredProcedure("SPB_GET_MercyFeePaidPinPhotoFiles", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("SPB_GET_MercyFeePaidPinPhotoFiles", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }

        [HttpGet, ActionName("GetExamMonthYearAcademicYear")]
        public HttpResponseMessage GetExamMonthYearAcademicYear(int Academicyearid)
        {
            try
            {

                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@Academicyearid", Academicyearid);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_GET_ExamMonthYearByAcademicYearSession", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_GET_ExamMonthYearByAcademicYearSession", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }

        [HttpGet, ActionName("GetEncryptedData")]
        public string GetEncryptedData(string DataType)
        {
            try
            {

                var res = DataType.ToString().Split(new string[] { "$$@@$$" }, StringSplitOptions.None);
                var crypt = new HbCrypt(res[1]);
                var encrypt = new HbCrypt();
                string encdatatype = crypt.AesDecrypt(res[0]);
                return encdatatype;

            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpGet, ActionName("GetDecryptedData")]
        public string GetDecryptedData(string DataType)
        {
            try
            {

                var res = DataType.ToString().Split(new string[] { "$$@@$$" }, StringSplitOptions.None);
                var crypt = new HbCrypt(res[1]);
                var encrypt = new HbCrypt();
                string datatype = crypt.AesDecrypt(res[0]);
                string decryptdatatype = encrypt.AesDecrypt(datatype);
                return decryptdatatype;

            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpGet, ActionName("GetorEditFeeSettingsData")]
        public HttpResponseMessage GetorEditFeeSettingsData(string DataTypeID, string ID)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@DataTypeID", DataTypeID);
                param[1] = new SqlParameter("@ID", ID);
                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_Get_Edit_CertificateTypes", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("SP_Get_Edit_CertificateTypes", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }


        [HttpGet, ActionName("GetExamMonthYears")]
        public HttpResponseMessage GetExamMonthYears()
        {
            try
            {
                var dbHandler = new dbHandler();
                string StrQuery = "";
                StrQuery = "exec USP_SFP_GET_ExamYearMonth";
                return Request.CreateResponse(HttpStatusCode.OK, dbHandler.ReturnDataSet(StrQuery));
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_SFP_GET_ExamYearMonth", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }

        [HttpGet, ActionName("GetColleges")]
        public HttpResponseMessage GetColleges()
        {
            try
            {
                var dbHandler = new dbHandler();
                string StrQuery = "";
                StrQuery = "exec USP_SOS_GetCollegeListForCertificate";
                return Request.CreateResponse(HttpStatusCode.OK, dbHandler.ReturnDataSet(StrQuery));
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_SOS_GetCollegeListForCertificate", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }

        [HttpPost, ActionName("AddorUpdateFeeSettings")]
        public string AddorUpdateFeeSettings([FromBody] JsonObject request)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[8];
                param[0] = new SqlParameter("@DataTypeId", request["DataTypeId"]);
                param[1] = new SqlParameter("@ID", request["ID"]);
                param[2] = new SqlParameter("@Name", request["Name"]);
                param[3] = new SqlParameter("@Is_Active", request["Is_Active"]);
                param[4] = new SqlParameter("@Price", request["Price"]);
                param[5] = new SqlParameter("@ServiceType", request["ServiceType"]);
                param[6] = new SqlParameter("@ChallanPrefix", request["ChallanPrefix"]);
                param[7] = new SqlParameter("@UserName", request["UserName"]);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Add_Update_CertificateTypes", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }


        [HttpPost, ActionName("AddOldStudentData")]
        public HttpResponseMessage AddOldStudentData([FromBody] CertificateReqAtt CertificateReqAtt)
        {
            try
            {
                var fileDat = new List<filelist>();
                int size = CertificateReqAtt.filedata.Count;
                var file = string.Empty;
                for (int i = 0; i < size; i++)
                {
                    var filename = CertificateReqAtt.PIN + "_" + Guid.NewGuid() + ".jpg";
                    var path = ConfigurationManager.AppSettings["certFolderPath"];
                    bool folderExists = Directory.Exists(path);
                    if (!folderExists)
                        Directory.CreateDirectory(path);
                    string imgPath = Path.Combine(path, filename);
                    byte[] imageBytes = Convert.FromBase64String(CertificateReqAtt.filedata[i].file);
                    File.WriteAllBytes(imgPath, imageBytes);
                    file += filename + ',';
                }
                var dbHandler = new dbHandler();
                var param = new SqlParameter[23];
                param[0] = new SqlParameter("@PIN", CertificateReqAtt.PIN);
                param[1] = new SqlParameter("@first_Name", CertificateReqAtt.first_Name);
                param[2] = new SqlParameter("@last_Name", CertificateReqAtt.last_Name);
                param[3] = new SqlParameter("@Father_Name", CertificateReqAtt.Father_Name);
                param[4] = new SqlParameter("@Gender", CertificateReqAtt.Gender);
                param[5] = new SqlParameter("@Mobile", CertificateReqAtt.Mobile);
                param[6] = new SqlParameter("@Email", CertificateReqAtt.Email);
                param[7] = new SqlParameter("@CollegeName", CertificateReqAtt.CollegeName);
                param[8] = new SqlParameter("@CourseName", CertificateReqAtt.CourseName);
                param[9] = new SqlParameter("@CollegeCode", CertificateReqAtt.CollegeCode);
                param[10] = new SqlParameter("@Scheme", CertificateReqAtt.Scheme);
                param[11] = new SqlParameter("@Purpose", CertificateReqAtt.Purpose);
                param[12] = new SqlParameter("@AddressProof", CertificateReqAtt.AddressProof);
                param[13] = new SqlParameter("@IdNumber", CertificateReqAtt.IdNumber);
                param[14] = new SqlParameter("@Village", CertificateReqAtt.Village);
                param[15] = new SqlParameter("@Town", CertificateReqAtt.Town);
                param[16] = new SqlParameter("@Mandal", CertificateReqAtt.Mandal);
                param[17] = new SqlParameter("@District", CertificateReqAtt.District);
                param[18] = new SqlParameter("@States", CertificateReqAtt.States);
                param[19] = new SqlParameter("@files", file);
                param[20] = new SqlParameter("@Photo", CertificateReqAtt.Photo);
                param[21] = new SqlParameter("@backlogCount", CertificateReqAtt.backlogCount);
                param[22] = new SqlParameter("@backlogsubjson", CertificateReqAtt.backlogsubjson);

                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_SET_OldStudentData", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("SP_SET_MercyStudentData", 0, ex.Message);//SP_SET_OldStudentData
                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }

        }


        [HttpGet, ActionName("CheckFileType")]
        public string CheckFileType(string fileName)
        {
            string ext = Path.GetExtension(fileName);
            switch (ext.ToLower())
            {
                case ".jpg":
                    return "YES";
                case ".jpeg":
                    return "YES";
                case ".png":
                    return "YES";
                default:
                    return "NO";
            }
        }

        [HttpGet, ActionName("NameCheck")]
        public string NameCheck(string DataType)
        {
            try
            {
                if (DataType != "")
                {
                    Regex regex = new Regex("^[a-zA-Z\\s]*$");
                    if (!regex.IsMatch(DataType))
                    {
                        return "NO";
                    }
                    else
                    {
                        return "YES";
                    }
                }
                else
                {
                    return "YES";
                }
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpGet, ActionName("GenderCheck")]
        public string GenderCheck(string DataType)
        {
            try
            {
                if (DataType != "")
                {
                    Regex regex = new Regex("^[MF]$");
                    if (!regex.IsMatch(DataType))
                    {
                        return "NO";
                    }
                    else
                    {
                        return "YES";
                    }
                }
                else
                {
                    return "YES";
                }
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpGet, ActionName("MobileNumberCheck")]
        public string MobileNumberCheck(string DataType)
        {
            try
            {
                if (DataType != "")
                {
                    Regex regex = new Regex("^\\d{10}$");
                    if (!regex.IsMatch(DataType))
                    {
                        return "NO";
                    }
                    else
                    {
                        return "YES";
                    }
                }
                else
                {
                    return "YES";
                }
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpGet, ActionName("EmailCheck")]
        public string EmailCheck(string DataType)
        {
            try
            {
                if (DataType != "")
                {
                    Regex regex = new Regex("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$");
                    if (!regex.IsMatch(DataType))
                    {
                        return "NO";
                    }
                    else
                    {
                        return "YES";
                    }
                }
                else
                {
                    return "YES";
                }
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }


        [HttpGet, ActionName("OnlyThreeDigitCheck")]
        public string OnlyThreeDigitCheck(string DataType)
        {
            try
            {
                if (DataType != "")
                {
                    Regex regex = new Regex("^\\d{3}$");
                    if (!regex.IsMatch(DataType))
                    {
                        return "NO";
                    }
                    else
                    {
                        return "YES";
                    }
                }
                else
                {
                    return "YES";
                }
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }


        [HttpGet, ActionName("DataCheck1")]
        public string DataCheck1(string DataType)
        {
            try
            {
                if (DataType != "")
                {
                    Regex regex = new Regex("^[A-Za-z0-9\\s\\-\\/.,#]+$");
                    if (!regex.IsMatch(DataType))
                    {
                        return "NO";
                    }
                    else
                    {
                        return "YES";
                    }
                }
                else
                {
                    return "YES";
                }

            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpGet, ActionName("OnlyTwelveDigitCheck")]
        public string OnlyTwelveDigitCheck(string DataType)
        {
            try
            {
                if (DataType != "")
                {
                    Regex regex = new Regex("^\\d{12}$");
                    if (!regex.IsMatch(DataType))
                    {
                        return "NO";
                    }
                    else
                    {
                        return "YES";
                    }
                }
                else
                {
                    return "YES";
                }
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpGet, ActionName("CollegeNameCheck")]
        public string CollegeNameCheck(string DataType)
        {
            try
            {
                if (DataType != "")
                {
                    Regex regex = new Regex("^[a-zA-Z\\s,]+$");
                    if (!regex.IsMatch(DataType))
                    {
                        return "NO";
                    }
                    else
                    {
                        return "YES";
                    }
                }
                else
                {
                    return "YES";
                }
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpPost, ActionName("AddMersyData")]
        public HttpResponseMessage AddMersyData([FromBody] CertificateReqAtt CertificateReqAtt)
        {
            try
            {
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);
                string first_Name = NameCheck(CertificateReqAtt.first_Name.ToString());
                string last_Name = NameCheck(CertificateReqAtt.last_Name.ToString());
                string Father_Name = NameCheck(CertificateReqAtt.Father_Name.ToString());

                string Gender = GenderCheck(CertificateReqAtt.Gender.ToString());
                string Mobile = MobileNumberCheck(CertificateReqAtt.Mobile.ToString());
                string Email = EmailCheck(CertificateReqAtt.Email.ToString());

                string CollegeName = CollegeNameCheck(CertificateReqAtt.CollegeName.ToString());
                string CourseName = NameCheck(CertificateReqAtt.CourseName.ToString());
                string CollegeCode = OnlyThreeDigitCheck(CertificateReqAtt.CollegeCode.ToString());


                string CourseType = NameCheck(CertificateReqAtt.CourseType.ToString());
                string Purpose = NameCheck(CertificateReqAtt.Purpose.ToString());

                string Village = DataCheck1(CertificateReqAtt.Village.ToString());
                string Town = DataCheck1(CertificateReqAtt.Town.ToString());
                string Mandal = NameCheck(CertificateReqAtt.Mandal.ToString());

                string District = NameCheck(CertificateReqAtt.District.ToString());
                string States = NameCheck(CertificateReqAtt.States.ToString());

                var fileDat = new List<filelist>();
                int size = CertificateReqAtt.filedata.Count;
                var file = string.Empty;
                for (int i = 0; i < size; i++)
                {
                    var filename = CertificateReqAtt.PIN + "_" + Guid.NewGuid() + ".jpg";
                    var path = ConfigurationManager.AppSettings["certFolderPath"];
                    bool folderExists = Directory.Exists(path);
                    if (!folderExists)
                        Directory.CreateDirectory(path);
                    string imgPath = Path.Combine(path, filename);
                    byte[] imageBytes = Convert.FromBase64String(CertificateReqAtt.filedata[i].file);
                    File.WriteAllBytes(imgPath, imageBytes);
                    file += filename + ',';
                }
                string encriptedaadhar = "";

                string EncryptedAadhar = GetEncryptedData(CertificateReqAtt.IdNumber);
                string DecryptedAadhar = GetDecryptedData(CertificateReqAtt.IdNumber);
                string Aadhar = OnlyTwelveDigitCheck(DecryptedAadhar.ToString());

                if (first_Name == "NO")
                {
                    response = Request.CreateResponse(HttpStatusCode.OK, "INVALID FIRST NAME");
                    return response;
                }
                else if (last_Name == "NO")
                {
                    response = Request.CreateResponse(HttpStatusCode.OK, "INVALID LAST NAME");
                    return response;
                }
                else if (Father_Name == "NO")
                {
                    response = Request.CreateResponse(HttpStatusCode.OK, "INVALID FATHER NAME");
                    return response;
                }
                else if (Gender == "NO")
                {
                    response = Request.CreateResponse(HttpStatusCode.OK, "INVALID GENDER");
                    return response;
                }
                else if (Mobile == "NO")
                {
                    response = Request.CreateResponse(HttpStatusCode.OK, "INVALID MOBILE NUMBER");
                    return response;
                }
                else if (Email == "NO")
                {
                    response = Request.CreateResponse(HttpStatusCode.OK, "INVALID EMAIL");
                    return response;
                }
                else if (CollegeName == "NO")
                {
                    response = Request.CreateResponse(HttpStatusCode.OK, "INVALID COLLEGE NAME");
                    return response;
                }
                else if (CourseName == "NO")
                {
                    response = Request.CreateResponse(HttpStatusCode.OK, "INVALID COURSE NAME");
                    return response;
                }
                else if (CollegeCode == "NO")
                {
                    response = Request.CreateResponse(HttpStatusCode.OK, "INVALID COLLEGE CODE");
                    return response;
                }
                else if (CourseType == "NO")
                {
                    response = Request.CreateResponse(HttpStatusCode.OK, "INVALID COURSE TYPE");
                    return response;
                }
                else if (Purpose == "NO")
                {
                    response = Request.CreateResponse(HttpStatusCode.OK, "INVALID PURPOSE");
                    return response;
                }
                else if (Village == "NO")
                {
                    response = Request.CreateResponse(HttpStatusCode.OK, "INVALID VILLAGE");
                    return response;
                }
                else if (Town == "NO")
                {
                    response = Request.CreateResponse(HttpStatusCode.OK, "INVALID TOWN");
                    return response;
                }
                else if (Mandal == "NO")
                {
                    response = Request.CreateResponse(HttpStatusCode.OK, "INVALID MANDAL NAME");
                    return response;
                }
                else if (District == "NO")
                {
                    response = Request.CreateResponse(HttpStatusCode.OK, "INVALID DISTRICT NAME");
                    return response;
                }
                else if (States == "NO")
                {
                    response = Request.CreateResponse(HttpStatusCode.OK, "INVALID STATE NAME");
                    return response;
                }
                var dbHandler = new dbHandler();
                var param = new SqlParameter[24];
                param[0] = new SqlParameter("@PIN", CertificateReqAtt.PIN);
                param[1] = new SqlParameter("@first_Name", CertificateReqAtt.first_Name);
                param[2] = new SqlParameter("@last_Name", CertificateReqAtt.last_Name);
                param[3] = new SqlParameter("@Father_Name", CertificateReqAtt.Father_Name);
                param[4] = new SqlParameter("@Gender", CertificateReqAtt.Gender);
                param[5] = new SqlParameter("@Mobile", CertificateReqAtt.Mobile);
                param[6] = new SqlParameter("@Email", CertificateReqAtt.Email);
                param[7] = new SqlParameter("@CollegeName", CertificateReqAtt.CollegeName);
                param[8] = new SqlParameter("@CourseName", CertificateReqAtt.CourseName);
                param[9] = new SqlParameter("@CollegeCode", CertificateReqAtt.CollegeCode);
                param[10] = new SqlParameter("@CourseType", CertificateReqAtt.CourseType);
                param[11] = new SqlParameter("@Scheme", CertificateReqAtt.Scheme);
                param[12] = new SqlParameter("@Purpose", CertificateReqAtt.Purpose);
                param[13] = new SqlParameter("@AddressProof", CertificateReqAtt.AddressProof);
                param[14] = new SqlParameter("@IdNumber", EncryptedAadhar);
                param[15] = new SqlParameter("@Village", CertificateReqAtt.Village);
                param[16] = new SqlParameter("@Town", CertificateReqAtt.Town);
                param[17] = new SqlParameter("@Mandal", CertificateReqAtt.Mandal);
                param[18] = new SqlParameter("@District", CertificateReqAtt.District);
                param[19] = new SqlParameter("@States", CertificateReqAtt.States);
                param[20] = new SqlParameter("@files", file);
                param[21] = new SqlParameter("@Photo", CertificateReqAtt.Photo);
                param[22] = new SqlParameter("@backlogCount", CertificateReqAtt.backlogCount);
                param[23] = new SqlParameter("@backlogsubjson", CertificateReqAtt.backlogsubjson);

                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_SET_MercyStudentData", param);
                response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("SP_SET_MercyStudentData", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }

        }

        [HttpPost, ActionName("UpdateOldStudentFileData")]
        public HttpResponseMessage UpdateOldStudentFileData([FromBody] CertificateReqAtt CertificateReqAtt)
        {
            try
            {
                var fileDat = new List<filelist>();
                int size = CertificateReqAtt.filedata.Count;
                var file = string.Empty;
                for (int i = 0; i < size; i++)
                {
                    var filename = CertificateReqAtt.PIN + "_" + Guid.NewGuid() + ".jpg";
                    var path = ConfigurationManager.AppSettings["certFolderPath"];
                    bool folderExists = Directory.Exists(path);
                    if (!folderExists)
                        Directory.CreateDirectory(path);
                    string imgPath = Path.Combine(path, filename);
                    byte[] imageBytes = Convert.FromBase64String(CertificateReqAtt.filedata[i].file);
                    File.WriteAllBytes(imgPath, imageBytes);
                    file += filename + ',';
                }
                var dbHandler = new dbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@PIN", CertificateReqAtt.PIN);
                param[1] = new SqlParameter("@files", file);
                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_SET_UpdateOldStudentFileData", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("SP_SET_UpdateOldStudentFileData", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }

        }

        [HttpGet, ActionName("GetDayWiseNrReportsExcel")]
        public string GetDayWiseNrReportsExcel(int ExamMonthYearId, int AcademicID, int StudentTypeId)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@ExamMonthYearId", ExamMonthYearId);
                param[1] = new SqlParameter("@AcademicID", AcademicID);
                param[2] = new SqlParameter("@StudentTypeId", StudentTypeId);
                var ds = dbHandler.ReturnDataWithStoredProcedure("USP_GET_NrDayWiseCountReports_New", param);
                var filename = "DaywiseNrCounts" + ".xlsx";
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
            catch (Exception ex)
            {
                return ex.Message;

            }

        }

        [HttpGet, ActionName("CertificateFeePaymentReports")]
        public string CertificateFeePaymentReports(string Scheme, int datatype)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@Scheme", Scheme);
                param[1] = new SqlParameter("@datatype", datatype);
                DataSet ds = dbHandler.ReturnDataWithStoredProcedure("USP_SFP_GET_CertificateFeePaymentReports", param);
                var filename = Scheme + "CertificateFeePaymentReport" + "_" + Guid.NewGuid() + ".xlsx";
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
            catch (Exception ex)
            {
                return ex.Message;

            }

        }

        [HttpGet, ActionName("TwoYearsFeePaymentReports")]
        public string TwoYearsFeePaymentReports(string Scheme, int datatype, int userType)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@Scheme", Scheme);
                param[1] = new SqlParameter("@datatype", datatype);
                param[2] = new SqlParameter("@userType", userType);
                DataSet ds = dbHandler.ReturnDataWithStoredProcedure("SPB_GET_2YearCertificateApprovePinListExcel", param);
                var filename = Scheme + "TwoYearsFeePaymentReport" + "_" + Guid.NewGuid() + ".xlsx";
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
            catch (Exception ex)
            {
                return ex.Message;

            }

        }

        [HttpGet, ActionName("getWantingReport")]
        public string getWantingReport(int gentype, int ExamMonthYearId, string scheme)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@gentype", gentype);
                param[1] = new SqlParameter("@ExamMonthYearId", ExamMonthYearId);
                param[2] = new SqlParameter("@scheme", scheme);
                DataSet ds = dbHandler.ReturnDataWithStoredProcedure("USP_GET_ReleasedResultsWantings", param);
                if (ds.Tables[0].Rows[0]["ResponceCode"].ToString() == "200")
                {
                    if (scheme == null || scheme == "" || scheme == "0")
                    {
                        scheme = "Overall";
                    }
                    var filename = scheme + "_" + "WantingsReport" + "_" + Guid.NewGuid() + ".xlsx";
                    var eh = new ExcelHelper();
                    var path = ConfigurationManager.AppSettings["DownloadsFolderPath"];
                    DataSet excelds = new DataSet();
                    excelds.Tables.Add(ds.Tables[1].Copy());
                    bool folderExists = Directory.Exists(path);
                    if (!folderExists)
                        Directory.CreateDirectory(path);
                    eh.ExportDataSet(excelds, path + filename);
                    Timer timer = new Timer(200000);
                    timer.Elapsed += (sender, e) => elapse(sender, e, ConfigurationManager.AppSettings["DownloadsFolderPath"] + filename);
                    timer.Start();
                    return "/Downloads/" + filename;
                }
                else
                {
                    return JsonConvert.SerializeObject(ds);
                }
            }
            catch (Exception ex)
            {
                return ex.Message;

            }

        }

        [HttpGet, ActionName("getWantingsReport")]
        public string getWantingsReport(string Exam_MonthYear, int studentType, string Scheme)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@Exam_MonthYear", Exam_MonthYear);
                param[1] = new SqlParameter("@studentType", studentType);
                param[2] = new SqlParameter("@Scheme", Scheme);
                DataSet ds = dbHandler.ReturnDataWithStoredProcedure("sbp_adm_Result_CheckNulls", param);
                if (ds.Tables[0].Rows[0]["ResponceCode"].ToString() == "200")
                {
                    var filename = Scheme + "WantingsReport" + "_" + Guid.NewGuid() + ".xlsx";
                    var eh = new ExcelHelper();
                    var path = ConfigurationManager.AppSettings["DownloadsFolderPath"];
                    DataSet excelds = new DataSet();
                    excelds.Tables.Add(ds.Tables[1].Copy());
                    bool folderExists = Directory.Exists(path);
                    if (!folderExists)
                        Directory.CreateDirectory(path);
                    eh.ExportDataSet(excelds, path + filename);
                    Timer timer = new Timer(200000);
                    timer.Elapsed += (sender, e) => elapse(sender, e, ConfigurationManager.AppSettings["DownloadsFolderPath"] + filename);
                    timer.Start();
                    return "/Downloads/" + filename;
                }
                else
                {
                    return JsonConvert.SerializeObject(ds);
                }
            }
            catch (Exception ex)
            {
                return ex.Message;

            }

        }

        [HttpGet, ActionName("ThreeBacklogOdcData")]
        public HttpResponseMessage ThreeBacklogOdcData(int ExamMonthYearId)
        {
            HttpResponseMessage response = new HttpResponseMessage();
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@ExamMonthYearId", ExamMonthYearId);
                DataSet ds = dbHandler.ReturnDataWithStoredProcedure("USP_GET_3BackLogODCData", param);


                if (ds.Tables[0].Rows[0]["ResponceCode"].ToString() == "200")
                {
                    DataSet excelds = new DataSet();
                    excelds.Tables.Add(ds.Tables[1].Copy());
                    var filename = "ThreeBacklogOdcData" + "_" + Guid.NewGuid() + ".xlsx";
                    var path = ConfigurationManager.AppSettings["DownloadsFolderPath"];
                    bool folderExists = Directory.Exists(path);
                    if (!folderExists)
                        Directory.CreateDirectory(path);
                    var eh = new ExcelHelper();
                    eh.ExportDataSet(excelds, path + filename);
                    Timer timer = new Timer(200000);
                    timer.Elapsed += (sender, e) => elapse(sender, e, ConfigurationManager.AppSettings["DownloadsFolderPath"] + filename);
                    timer.Start();
                    string res = "/Downloads/" + filename;
                    response = Request.CreateResponse(HttpStatusCode.OK);
                    response.Content = new StringContent(JsonConvert.SerializeObject("{\"Responcecode\":\"200\",\"data\" : \"" + res + "\" }"), System.Text.Encoding.UTF8, "application/json");
                    return response;

                }
                else
                {
                    response = Request.CreateResponse(HttpStatusCode.OK);
                    response.Content = new StringContent(JsonConvert.SerializeObject("{\"Responcecode\":\"400\",\"data\" : \"" + ds.Tables[0].Rows[0]["ResponceDescription"].ToString() + "\" }"), System.Text.Encoding.UTF8, "application/json");
                    return response;
                }

            }
            catch (Exception ex)
            {
                response = Request.CreateResponse(HttpStatusCode.NotFound);
                response.Content = new StringContent(JsonConvert.SerializeObject("{\"Responcecode\":\"400\",\"data\" = \"" + ex.Message + "\" }"), System.Text.Encoding.UTF8, "application/json");
                return response;

            }

        }

        [HttpGet, ActionName("Memos")]
        public string Memos(string Scheme, int ExamMonthYearId, string Date)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@Scheme", Scheme);
                param[1] = new SqlParameter("@ExamMonthYearId", ExamMonthYearId);
                param[2] = new SqlParameter("@Date", Date);
                DataSet ds = dbHandler.ReturnDataWithStoredProcedure("USP_GET_MemoData", param);
                var filename = Scheme + "MemosData" + "_" + Guid.NewGuid() + ".xlsx";
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
            catch (Exception ex)
            {
                return ex.Message;

            }

        }



        private static void elapse(object sender, ElapsedEventArgs e, string s)
        {
            System.IO.File.Delete(s);
            ((Timer)sender).Stop();
            ((Timer)sender).Dispose();
        }

        public class filelist
        {
            public int fileindex { get; set; }
            public string file { get; set; }
        }

        public class filetranlist
        {
            public int fileindex { get; set; }
            public string file { get; set; }
            public string filetype { get; set; }
        }

        public class transcriptreqData
        {

            public string Pin { get; set; }
            public string UniversitiesApplied { get; set; }
            public string UniversityEmails { get; set; }
            public string WESCertificate { get; set; }
            public string WESReferenceNo { get; set; }
            public string Email { get; set; }
            public string Name { get; set; }
            public string FatherName { get; set; }
            public string Branch { get; set; }
            public string CollegeCode { get; set; }
            public string Scheme { get; set; }
            public int Gender { get; set; }
            public string certificateType { get; set; }
            public List<filetranlist> filedata { get; set; }


        }



        public class OdCRequest
        {
            public string pin { get; set; }
            public string Name { get; set; }
            public string FatherName { get; set; }
            public string Branch { get; set; }
            public string CollegeCode { get; set; }
            public string Scheme { get; set; }
            public int Gender { get; set; }
            public string AadharNo { get; set; }
            public string OdcNo { get; set; }
            public string PoliceFir { get; set; }
            public string PrincipalCoveringLetter { get; set; }
            public string MegisrateAffidavit { get; set; }
            public string AadharCopy { get; set; }
            public string OdcReason { get; set; }
            public List<filelist> OdcMemos { get; set; }

        }

        public class CircularData
        {
            public int ID { get; set; }
            public string Title { get; set; }
            public string Description { get; set; }
            public string Url { get; set; }
            public string CircularFileName { get; set; }
            public int CircularTypeId { get; set; }
            public DateTime NotificationDate { get; set; }

        }

        public class DownloadData
        {
            public int Id { get; set; }
            public string Title { get; set; }
            public string Description { get; set; }
            public string Url { get; set; }
            public string CircularFileName { get; set; }
            public int CircularTypeId { get; set; }
            public DateTime NotificationDate { get; set; }

        }


        public class StaffData
        {
            public int Id { get; set; }
            public string Name { get; set; }
            public string Photo { get; set; }
            public string Designation { get; set; }
            public string MobileNumber { get; set; }
            public string FileName { get; set; }
            public string Subject { get; set; }
            public string SectionId { get; set; }
            public string email { get; set; }

        }

        public class TenderData
        {
            public int Id { get; set; }
            public string Title { get; set; }
            public string Description { get; set; }
            public string Url { get; set; }
            public string TenderFileName { get; set; }
            public DateTime TenderDate { get; set; }
            public DateTime EndDate { get; set; }
        }



        public class GenuineRequest
        {
            public string Pin { get; set; }
            public string Name { get; set; }
            public string FatherName { get; set; }
            public string OrganizationType { get; set; }
            public string OrganizationName { get; set; }
            public string OrganizationAddress { get; set; }
            public string OrganizationEmail { get; set; }
            public string OrganizationMobile { get; set; }
            public string ODCNo { get; set; }
            public string ODC { get; set; }
            public string ExamMonthYear { get; set; }
            public int Amount { get; set; }
            public string ApplyingOfficer { get; set; }
            public string CertificateApplication { get; set; }
            public string OfficerDesignation { get; set; }
        }


        public class CertificateReqAtt
        {

            public string CourseType { get; set; }
            public string PIN { get; set; }
            public string first_Name { get; set; }
            public string last_Name { get; set; }
            public string Father_Name { get; set; }
            public string Gender { get; set; }
            public string Mobile { get; set; }
            public string Email { get; set; }
            public string CollegeName { get; set; }
            public string CourseName { get; set; }
            public string CollegeCode { get; set; }
            public string Scheme { get; set; }
            public string Purpose { get; set; }
            public string AddressProof { get; set; }
            public string IdNumber { get; set; }
            public string Village { get; set; }
            public string Town { get; set; }
            public string Mandal { get; set; }
            public string District { get; set; }
            public string States { get; set; }
            public int backlogCount { get; set; }
            public string backlogsubjson { get; set; }
            public List<filelist> filedata { get; set; }
            public string Photo { get; set; }
        }



        [HttpGet, ActionName("getStudentType")]
        public HttpResponseMessage getStudentType()
        {
            try
            {
                var dbHandler = new dbHandler();
                string StrQuery = "";
                StrQuery = "exec USP_SFP_GET_ActiveStudentTypes";
                return Request.CreateResponse(HttpStatusCode.OK, dbHandler.ReturnDataSet(StrQuery));
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_SFP_GET_ActiveStudentTypes", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }



        [HttpGet, ActionName("get_StudentTypes")]
        public HttpResponseMessage get_StudentTypes()
        {
            try
            {
                var dbHandler = new dbHandler();
                string StrQuery = "";
                StrQuery = "exec USP_GET_Student_type";
                return Request.CreateResponse(HttpStatusCode.OK, dbHandler.ReturnDataSet(StrQuery));
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_GET_Student_type", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }


        [HttpGet, ActionName("getSchemes")]
        public string getSchemes()
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



        [HttpGet, ActionName("getExamYearMonth")]
        public HttpResponseMessage getExamYearMonth()
        {
            try
            {
                var dbHandler = new dbHandler();
                string StrQuery = "";
                StrQuery = "exec USP_SFP_GET_ExamYearMonth";
                return Request.CreateResponse(HttpStatusCode.OK, dbHandler.ReturnDataSet(StrQuery));
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_SFP_GET_ExamYearMonth", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }



        [HttpGet, ActionName("getExamYearMonths")]
        public HttpResponseMessage getExamYearMonths()
        {
            try
            {
                var dbHandler = new dbHandler();
                string StrQuery = "";
                StrQuery = "exec USP_GET_ExamMonthYear";
                return Request.CreateResponse(HttpStatusCode.OK, dbHandler.ReturnDataSet(StrQuery));
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_GET_ExamMonthYear", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }



        [HttpGet, ActionName("getAdminCollegePreExamReports")]
        public HttpResponseMessage getAdminCollegePreExamReports(int UserId, string CollegeCode, int ExamMonthYearId, string Semester, int StudentTypeId)
        {
            try
            {

                var dbHandler = new dbHandler();
                var param = new SqlParameter[5];
                param[0] = new SqlParameter("@UserId ", UserId);
                param[1] = new SqlParameter("@CollegeCode ", CollegeCode);
                param[2] = new SqlParameter("@ExamMonthYearId ", ExamMonthYearId);
                param[3] = new SqlParameter("@Semester", Semester);
                param[4] = new SqlParameter("@StudentTypeId", StudentTypeId);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("ADM_SFP_GET_Reports", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("ADM_SFP_GET_Reports", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }

        }



        [HttpGet, ActionName("getOmrBranchCount")]
        public HttpResponseMessage getOmrBranchCount(int Schemeid, int SemId)
        {
            try
            {

                var dbHandler = new dbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@Schemeid", Schemeid);
                param[1] = new SqlParameter("@SemId", SemId);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("ADM_SFP_GET_OmrCountSemesterBranchWise", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("ADM_SFP_GET_OmrCountSemesterBranchWise", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }

        }



        [HttpGet, ActionName("UpdateStudentContact")]
        public HttpResponseMessage UpdateStudentContact(string Pin, string StudentContact)
        {
            try
            {

                var dbHandler = new dbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@Pin", Pin);
                param[1] = new SqlParameter("@StudentContact", StudentContact);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("USP_SFP_SET_StudentPhone", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_SFP_SET_StudentPhone", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }

        }


        [HttpGet, ActionName("GETMemoDataByPin")]
        public HttpResponseMessage GETMemoDataByPin(string Scheme, int ExamMonthYearId, int semid, string pin)
        {
            try
            {

                var dbHandler = new dbHandler();
                var param = new SqlParameter[4];
                param[0] = new SqlParameter("@Scheme", Scheme);
                param[1] = new SqlParameter("@ExamMonthYearId", ExamMonthYearId);
                param[2] = new SqlParameter("@semid", semid);
                param[3] = new SqlParameter("@pin", pin);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_GET_MemoDataByPin", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_GET_MemoDataByPin", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }

        }

        [HttpGet, ActionName("GETMemoDataByPinForPrinting")]
        public HttpResponseMessage GETMemoDataByPinForPrinting(string Scheme, int ExamMonthYearId, int semid, string pin)
        {
            try
            {

                var dbHandler = new dbHandler();
                var param = new SqlParameter[4];
                param[0] = new SqlParameter("@Scheme", Scheme);
                param[1] = new SqlParameter("@ExamMonthYearId", ExamMonthYearId);
                param[2] = new SqlParameter("@semid", semid);
                param[3] = new SqlParameter("@pin", pin);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_GET_MemoDataByPinForPrintingCertificate", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_GET_MemoDataByPin", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }

        }

        [HttpPost, ActionName("UpdateTcData")]
        public HttpResponseMessage UpdateTcData([FromBody] JsonObject request)
        {
            try
            {

                var dbHandler = new dbHandler();
                var param = new SqlParameter[4];
                param[0] = new SqlParameter("@pin", request["pin"]);
                param[1] = new SqlParameter("@ReasonForTC", request["ReasonForTC"]);
                param[2] = new SqlParameter("@IdMark1", request["IdMark1"]);
                param[3] = new SqlParameter("@IdMark2", request["IdMark2"]);

                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SFP_Update_TcData", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_SFP_Update_TcData", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpPost, ActionName("SetBonafiedData")]
        public HttpResponseMessage SetBonafiedData([FromBody] JsonObject request)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[6];
                param[0] = new SqlParameter("@pin", request["pin"]);
                param[1] = new SqlParameter("@ReasonForBonafied", request["ReasonForBonafied"]);
                param[2] = new SqlParameter("@Name", request["Name"]);
                param[3] = new SqlParameter("@FatherName", request["FatherName"]);
                param[4] = new SqlParameter("@Branchcode", request["Branchcode"]);
                param[5] = new SqlParameter("@CollegeCode", request["CollegeCode"]);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SFP_SET_BonafiedData", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_SFP_SET_BonafiedData", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpPost, ActionName("SetStudyCertData")]
        public HttpResponseMessage SetStudyCertData([FromBody] JsonObject request)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[6];
                param[0] = new SqlParameter("@pin", request["pin"]);
                param[1] = new SqlParameter("@ReasonForBonafied", request["ReasonForBonafied"]);
                param[2] = new SqlParameter("@Name", request["Name"]);
                param[3] = new SqlParameter("@FatherName", request["FatherName"]);
                param[4] = new SqlParameter("@Branchcode", request["Branchcode"]);
                param[5] = new SqlParameter("@CollegeCode", request["CollegeCode"]);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SFP_SET_StudyData", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_SFP_SET_BonafiedData", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpGet, ActionName("SemOmrCount")]
        public HttpResponseMessage SemOmrCount(string SchemeId)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@SchemeId", SchemeId);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("ADM_SFP_GET_OmrCountSemesterWise", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("ADM_SFP_GET_OmrCountSemesterWise", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }

        }



        [HttpGet, ActionName("getUserDataByPinForPromotionalFee")]
        public HttpResponseMessage getUserDataByPinForPromotionalFee(string StudentTypeId, string Pin)
        {
            try
            {

                var dbHandler = new dbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@StudentTypeId", StudentTypeId);
                param[1] = new SqlParameter("@Pin", Pin);
                //    param[1] = new SqlParameter("@StudentContact", StudentContact);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SFP_GET_StudentDetailsByPinForPromotionalFee", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_SFP_GET_StudentDetailsByPinForPromotionalFee", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }

        }



        [HttpPost, ActionName("getPayExamFee")]
        public HttpResponseMessage getPayExamFee([FromBody] JsonObject request)
        {
            try
            {

                var dbHandler = new dbHandler();
                var param = new SqlParameter[4];
                param[0] = new SqlParameter("@UserId", request["UserId"]);
                param[1] = new SqlParameter("@StudentTypeId", request["StudentTypeId"]);
                param[2] = new SqlParameter("@Semid", request["Semid"]);
                param[3] = new SqlParameter("@ExamMonthYearId", request["ExamMonthYearId"]);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SFP_GET_PinListForFeePayment", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_SFP_GET_PinListForFeePayment", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpPost, ActionName("UpdateMigrationData")]
        public HttpResponseMessage UpdateMigrationData([FromBody] JsonObject request)
        {
            try
            {

                var dbHandler = new dbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@AcademicYearId", request["AcademicYearId"]);
                param[1] = new SqlParameter("@CummulativeCredits", request["CummulativeCredits"]);
                param[2] = new SqlParameter("@id", request["id"]);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SET_PromotionalRulesForSemToSem", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_SET_PromotionalRulesForSemToSem", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpPost, ActionName("SetInterimData")]
        public HttpResponseMessage SetInterimData([FromBody] JsonObject request)
        {
            try
            {

                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@pin", request["pin"]);


                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SFP_SET_InterimData", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_SFP_SET_InterimData", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpPost, ActionName("SetMigrationData")]
        public HttpResponseMessage SetMigrationData([FromBody] JsonObject request)
        {
            try
            {

                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@pin", request["pin"]);


                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SFP_SET_MigrationData", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_SFP_SET_MigrationData", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpPost, ActionName("SetOdcData")]
        public HttpResponseMessage SetOdcData([FromBody] OdCRequest OdCRequest)
        {
            try
            {

                var fileDat = new List<filelist>();
                int size = OdCRequest.OdcMemos.Count;
                var file = string.Empty;
                var Fir = string.Empty;
                var Prince = string.Empty;
                var AadharData = string.Empty;
                var PrinceData = string.Empty;
                var AffidavitData = string.Empty;
                for (int i = 0; i < size; i++)
                {
                    var filename = OdCRequest.pin + "_" + Guid.NewGuid() + ".pdf";
                    var path = ConfigurationManager.AppSettings["certFolderPath"];
                    bool folderExists = Directory.Exists(path);
                    if (!folderExists)
                        Directory.CreateDirectory(path);
                    string imgPath = Path.Combine(path, filename);
                    byte[] imageBytes = Convert.FromBase64String(OdCRequest.OdcMemos[i].file);
                    File.WriteAllBytes(imgPath, imageBytes);

                    file += filename + ',';
                }

                var Firpath = ConfigurationManager.AppSettings["certFolderPath"];
                var PoliceFir = OdCRequest.pin + "_" + Guid.NewGuid() + ".jpg";
                bool folderExist = Directory.Exists(Firpath);
                if (!folderExist)
                    Directory.CreateDirectory(Firpath);
                string PoliceFirPath = Path.Combine(Firpath, PoliceFir);
                byte[] PoliceFirimageBytes = Convert.FromBase64String(OdCRequest.PoliceFir);
                File.WriteAllBytes(PoliceFirPath, PoliceFirimageBytes);
                Fir = PoliceFir;

                var Principalpath = ConfigurationManager.AppSettings["certFolderPath"];
                var Principal = OdCRequest.pin + "_" + Guid.NewGuid() + ".pdf";
                bool folder = Directory.Exists(Principalpath);
                if (!folder)
                    Directory.CreateDirectory(Principalpath);
                string PrincipalPath = Path.Combine(Principalpath, Principal);
                byte[] PrincipalimageBytes = Convert.FromBase64String(OdCRequest.PrincipalCoveringLetter);
                File.WriteAllBytes(PrincipalPath, PrincipalimageBytes);
                PrinceData = Principal;

                var Affidavitpath = ConfigurationManager.AppSettings["certFolderPath"];
                var Affidavit = OdCRequest.pin + "_" + Guid.NewGuid() + ".jpg";
                bool folders = Directory.Exists(Affidavitpath);
                if (!folders)
                    Directory.CreateDirectory(Affidavitpath);
                string AffidavitPath = Path.Combine(Affidavitpath, Affidavit);
                byte[] AffidavitimageBytes = Convert.FromBase64String(OdCRequest.MegisrateAffidavit);
                File.WriteAllBytes(AffidavitPath, AffidavitimageBytes);
                AffidavitData = Affidavit;

                var Aadharpath = ConfigurationManager.AppSettings["certFolderPath"];
                var Aadhar = OdCRequest.pin + "_" + Guid.NewGuid() + ".jpg";
                bool Aadharfolders = Directory.Exists(Aadharpath);
                if (!Aadharfolders)
                    Directory.CreateDirectory(Aadharpath);
                string AadharPath = Path.Combine(Aadharpath, Aadhar);
                byte[] AadharimageBytes = Convert.FromBase64String(OdCRequest.AadharCopy);
                File.WriteAllBytes(AadharPath, AffidavitimageBytes);
                AadharData = Aadhar;

                var dbHandler = new dbHandler();
                string encriptedaadhar = "";

                var res = OdCRequest.AadharNo.Split(new string[] { "$$@@$$" }, StringSplitOptions.None);
                var crypt = new HbCrypt(res[1]);
                var aadharencrypt = new HbCrypt();
                string aadhar = crypt.AesDecrypt(res[0]);
                string decryptaadhar = aadharencrypt.AesDecrypt(aadhar);
                encriptedaadhar = aadharencrypt.Encrypt(decryptaadhar);
                var param = new SqlParameter[8];
                param[0] = new SqlParameter("@pin", OdCRequest.pin);
                param[1] = new SqlParameter("@AadharNo", encriptedaadhar);
                param[2] = new SqlParameter("@OdcNo", OdCRequest.OdcNo);
                param[3] = new SqlParameter("@PoliceFir", Fir);
                param[4] = new SqlParameter("@PrincipalCoveringLetter", PrinceData);
                param[5] = new SqlParameter("@MegisrateAffidavit", AffidavitData);
                param[6] = new SqlParameter("@AadharCopy", AadharData);
                param[7] = new SqlParameter("@OdcMemos", file);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SFP_SET_OdcCertificateData", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_SFP_SET_MigrationData", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpPost, ActionName("SetTender")]
        public HttpResponseMessage SetTender([FromBody] TenderData TenderData)
        {
            try
            {

                var TenderUrl = string.Empty;
                string relativePath = string.Empty;
                var path = ConfigurationManager.AppSettings["TenderPath"];
                var CircularName = TenderData.TenderFileName;
                bool folder = Directory.Exists(path);
                if (!folder)
                    Directory.CreateDirectory(path);
                string TenderPath = Path.Combine(path, CircularName);

                byte[] PrincipalimageBytes = Convert.FromBase64String(TenderData.Url);
                File.WriteAllBytes(TenderPath, PrincipalimageBytes);
                relativePath = TenderPath.Replace(HttpContext.Current.Request.PhysicalApplicationPath, GetWebAppRoot()).Replace(@"\", "/");
                TenderUrl = relativePath;
                var dbHandler = new dbHandler();
                var param = new SqlParameter[4];
                param[0] = new SqlParameter("@Title", TenderData.Title);
                param[1] = new SqlParameter("@Url", TenderUrl);
                param[2] = new SqlParameter("@TenderDate", TenderData.TenderDate);
                param[3] = new SqlParameter("@EndDate", TenderData.EndDate);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("ADM_SET_Tender", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;

            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("ADM_SET_Tender", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }


        [HttpPost, ActionName("uploadFile")]
        public HttpResponseMessage uploadFile([FromBody] CircularData CircularData)
        {
            try
            {

                var CircularUrl = string.Empty;
                string relativePath = string.Empty;
                var path = ConfigurationManager.AppSettings["circularPath"];
                var CircularName = CircularData.CircularFileName;
                bool folder = Directory.Exists(path);
                if (!folder)
                    Directory.CreateDirectory(path);
                string CircularPath = Path.Combine(path, CircularName);

                byte[] PrincipalimageBytes = Convert.FromBase64String(CircularData.Url);
                File.WriteAllBytes(CircularPath, PrincipalimageBytes);
                relativePath = CircularPath.Replace(HttpContext.Current.Request.PhysicalApplicationPath, GetWebAppRoot()).Replace(@"\", "/");
                CircularUrl = relativePath;

                var dbHandler = new dbHandler();
                var param = new SqlParameter[4];
                param[0] = new SqlParameter("@Title", CircularData.Title);
                param[1] = new SqlParameter("@Url", CircularUrl);
                param[2] = new SqlParameter("@CircularTypeId", CircularData.CircularTypeId);
                param[3] = new SqlParameter("@NotificationDate", CircularData.NotificationDate);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("ADM_SET_Circular", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;

            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("ADM_SET_Circular", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpPost, ActionName("UploadDownload")]
        public HttpResponseMessage UploadDownload([FromBody] CircularData CircularData)
        {
            try
            {

                var CircularUrl = string.Empty;
                string relativePath = string.Empty;
                var path = ConfigurationManager.AppSettings["circularPath"];
                var CircularName = CircularData.CircularFileName;
                bool folder = Directory.Exists(path);
                if (!folder)
                    Directory.CreateDirectory(path);
                string CircularPath = Path.Combine(path, CircularName);

                byte[] PrincipalimageBytes = Convert.FromBase64String(CircularData.Url);
                File.WriteAllBytes(CircularPath, PrincipalimageBytes);
                relativePath = CircularPath.Replace(HttpContext.Current.Request.PhysicalApplicationPath, GetWebAppRoot()).Replace(@"\", "/");
                CircularUrl = relativePath;
                var dbHandler = new dbHandler();
                var param = new SqlParameter[4];
                param[0] = new SqlParameter("@Url", CircularUrl);
                param[1] = new SqlParameter("@CircularTypeId", CircularData.CircularTypeId);
                param[2] = new SqlParameter("@NotificationDate", CircularData.NotificationDate);
                param[3] = new SqlParameter("@Title", CircularData.Title);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("USP_SET_DownloadsForAdmin", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;

            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_SET_DownloadsForAdmin", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpPost, ActionName("UploadStaffInfo")]
        public HttpResponseMessage UploadStaffInfo([FromBody] StaffData StaffData)
        {
            try
            {


                var PhotoUrl = string.Empty;
                string relativePath = string.Empty;
                var path = ConfigurationManager.AppSettings["StaffPath"];
                var StaffName = StaffData.FileName;
                bool folder = Directory.Exists(path);
                if (!folder)
                    Directory.CreateDirectory(path);
                string StaffPath = Path.Combine(path, StaffName);

                byte[] PrincipalimageBytes = Convert.FromBase64String(StaffData.Photo);
                File.WriteAllBytes(StaffPath, PrincipalimageBytes);
                relativePath = StaffPath.Replace(HttpContext.Current.Request.PhysicalApplicationPath, GetWebAppRoot()).Replace(@"\", "/");
                PhotoUrl = relativePath;

                var dbHandler = new dbHandler();
                var param = new SqlParameter[7];
                param[0] = new SqlParameter("@Name", StaffData.Name);
                param[1] = new SqlParameter("@Photo", PhotoUrl);
                param[2] = new SqlParameter("@Designation", StaffData.Designation);
                param[3] = new SqlParameter("@SectionId", StaffData.SectionId);
                param[4] = new SqlParameter("@Subject", StaffData.Subject);
                param[5] = new SqlParameter("@email", StaffData.email);
                param[6] = new SqlParameter("@MobileNumber", StaffData.MobileNumber);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("ADM_SET_StaffInfo", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;

            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("ADM_SET_StaffInfo", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }


        [HttpPost, ActionName("UpdateStaffInfo")]
        public HttpResponseMessage UpdateStaffInfo([FromBody] StaffData StaffData)
        {
            var PhotoUrl = string.Empty;
            try
            {
                if (StaffData.Photo != "Empty")
                {
                    string relativePath = string.Empty;
                    var path = ConfigurationManager.AppSettings["StaffPath"];
                    var StaffName = StaffData.FileName;
                    bool folder = Directory.Exists(path);
                    if (!folder)
                        Directory.CreateDirectory(path);
                    string StaffPath = Path.Combine(path, StaffName);

                    byte[] PrincipalimageBytes = Convert.FromBase64String(StaffData.Photo);
                    File.WriteAllBytes(StaffPath, PrincipalimageBytes);
                    relativePath = StaffPath.Replace(HttpContext.Current.Request.PhysicalApplicationPath, GetWebAppRoot()).Replace(@"\", "/");
                    PhotoUrl = relativePath;
                }
                else
                {
                    PhotoUrl = StaffData.Photo;
                }
                var dbHandler = new dbHandler();
                var param = new SqlParameter[8];
                param[0] = new SqlParameter("@Name", StaffData.Name);
                param[1] = new SqlParameter("@Photo", PhotoUrl);
                param[2] = new SqlParameter("@Designation", StaffData.Designation);
                param[3] = new SqlParameter("@SectionId", StaffData.SectionId);
                param[4] = new SqlParameter("@Subject", StaffData.Subject);
                param[5] = new SqlParameter("@email", StaffData.email);
                param[6] = new SqlParameter("@MobileNumber", StaffData.MobileNumber);
                param[7] = new SqlParameter("@Id", StaffData.Id);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("ADM_Update_StaffInfo", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;

            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("ADM_Update_StaffInfo", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }


        [HttpPost, ActionName("UpdateTender")]
        public HttpResponseMessage UpdateTender([FromBody] TenderData TenderData)

        {
            var TenderUrl = string.Empty;
            try
            {

                {
                    if (TenderData.Url != "Empty")
                    {
                        string relativePath = string.Empty;
                        var path = ConfigurationManager.AppSettings["TenderPath"];
                        var CircularName = TenderData.TenderFileName;
                        bool folder = Directory.Exists(path);
                        if (!folder)
                            Directory.CreateDirectory(path);
                        string TenderPath = Path.Combine(path, CircularName);

                        byte[] PrincipalimageBytes = Convert.FromBase64String(TenderData.Url);
                        File.WriteAllBytes(TenderPath, PrincipalimageBytes);
                        relativePath = TenderPath.Replace(HttpContext.Current.Request.PhysicalApplicationPath, GetWebAppRoot()).Replace(@"\", "/");
                        TenderUrl = relativePath;
                    }
                    else
                    {
                        TenderUrl = TenderData.Url;
                    }
                    var dbHandler = new dbHandler();
                    var param = new SqlParameter[5];
                    param[0] = new SqlParameter("@Title", TenderData.Title);
                    param[1] = new SqlParameter("@Url", TenderUrl);
                    param[2] = new SqlParameter("@TenderDate", TenderData.TenderDate);
                    param[3] = new SqlParameter("@EndDate", TenderData.EndDate);
                    param[4] = new SqlParameter("@Id", TenderData.Id);
                    var dt = dbHandler.ReturnDataWithStoredProcedureTable("ADM_Update_Tender", param);
                    HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                    return response;
                }
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("ADM_Update_Tender", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpPost, ActionName("UpdateCircular")]
        public HttpResponseMessage UpdateCircular([FromBody] CircularData CircularData)
        {
            var CircularUrl = string.Empty;
            try
            {
                if (CircularData.Url != "Empty")
                {

                    string relativePath = string.Empty;
                    var path = ConfigurationManager.AppSettings["circularPath"];
                    var CircularName = CircularData.CircularFileName;
                    bool folder = Directory.Exists(path);
                    if (!folder)
                        Directory.CreateDirectory(path);
                    string CircularPath = Path.Combine(path, CircularName);

                    byte[] PrincipalimageBytes = Convert.FromBase64String(CircularData.Url);
                    File.WriteAllBytes(CircularPath, PrincipalimageBytes);
                    relativePath = CircularPath.Replace(HttpContext.Current.Request.PhysicalApplicationPath, GetWebAppRoot()).Replace(@"\", "/");
                    CircularUrl = relativePath;
                }
                else
                {
                    CircularUrl = CircularData.Url;
                }
                //  return path;
                var dbHandler = new dbHandler();
                var param = new SqlParameter[5];
                param[0] = new SqlParameter("@Title", CircularData.Title);
                param[1] = new SqlParameter("@Url", CircularUrl);
                param[2] = new SqlParameter("@CircularTypeId", CircularData.CircularTypeId);
                param[3] = new SqlParameter("@NotificationDate", CircularData.NotificationDate);
                param[4] = new SqlParameter("@ID", CircularData.ID);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("ADM_Update_Circular", param);
                //return JsonConvert.SerializeObject(dt);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
                //}

            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("ADM_Update_Circular", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpPost, ActionName("UpdateDownloads")]
        public HttpResponseMessage UpdateDownloads([FromBody] DownloadData DownloadData)
        {
            var CircularUrl = string.Empty;
            try
            {
                if (DownloadData.Url != "Empty")
                {

                    string relativePath = string.Empty;
                    var path = ConfigurationManager.AppSettings["circularPath"];
                    var CircularName = DownloadData.CircularFileName;
                    bool folder = Directory.Exists(path);
                    if (!folder)
                        Directory.CreateDirectory(path);
                    string CircularPath = Path.Combine(path, CircularName);

                    byte[] PrincipalimageBytes = Convert.FromBase64String(DownloadData.Url);
                    File.WriteAllBytes(CircularPath, PrincipalimageBytes);
                    relativePath = CircularPath.Replace(HttpContext.Current.Request.PhysicalApplicationPath, GetWebAppRoot()).Replace(@"\", "/");
                    CircularUrl = relativePath;
                }
                else
                {
                    CircularUrl = DownloadData.Url;
                }
                //  return path;
                var dbHandler = new dbHandler();
                var param = new SqlParameter[5];
                param[0] = new SqlParameter("@Title", DownloadData.Title);
                param[1] = new SqlParameter("@Url", CircularUrl);
                param[2] = new SqlParameter("@CircularTypeId", DownloadData.CircularTypeId);
                param[3] = new SqlParameter("@NotificationDate", DownloadData.NotificationDate);
                param[4] = new SqlParameter("@Id", DownloadData.Id);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("USP_SET_UpdateDownloadsForAdmin", param);
                //return JsonConvert.SerializeObject(dt);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
                //}

            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_SET_UpdateDownloadsForAdmin", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpPost, ActionName("SetOdcDataPayment")]
        public HttpResponseMessage SetOdcDataPayment([FromBody] OdCRequest OdCRequest)
        {
            try
            {
                var dir = AppDomain.CurrentDomain.BaseDirectory + @"\Reports\UnsignedCert\";
                //var fileDat = new List<filetranlist>();
                //int size = request.filedata.Count;
                var Memos = string.Empty;
                var WESCertificate = string.Empty;
                string relativePath = string.Empty;
                var fileDat = new List<filelist>();
                int size = OdCRequest.OdcMemos.Count;
                var file = string.Empty;
                var Fir = string.Empty;
                var Prince = string.Empty;
                var AadharData = string.Empty;
                var PrinceData = string.Empty;
                var AffidavitData = string.Empty;
                var path = ConfigurationManager.AppSettings["certFolderPath"];
                for (int i = 0; i < size; i++)
                {
                    var filename = OdCRequest.pin + "_" + Guid.NewGuid() + ".pdf";

                    bool folderExists = Directory.Exists(path);
                    if (!folderExists)
                        Directory.CreateDirectory(path);
                    string imgPath = Path.Combine(path, filename);
                    byte[] imageBytes = Convert.FromBase64String(OdCRequest.OdcMemos[i].file);
                    File.WriteAllBytes(imgPath, imageBytes);
                    relativePath = imgPath.Replace(HttpContext.Current.Request.PhysicalApplicationPath, GetWebAppRoot()).Replace(@"\", "/");
                    //WESCertificate = relativePath;
                    file += relativePath + ',';
                }


                var Firpath = ConfigurationManager.AppSettings["certFolderPath"];
                var PoliceFir = OdCRequest.pin + "_" + Guid.NewGuid() + ".jpg";
                bool folderExist = Directory.Exists(Firpath);
                if (!folderExist)
                    Directory.CreateDirectory(Firpath);
                string PoliceFirPath = Path.Combine(Firpath, PoliceFir);
                byte[] PoliceFirimageBytes = Convert.FromBase64String(OdCRequest.PoliceFir);
                File.WriteAllBytes(PoliceFirPath, PoliceFirimageBytes);
                relativePath = PoliceFirPath.Replace(HttpContext.Current.Request.PhysicalApplicationPath, GetWebAppRoot()).Replace(@"\", "/");
                Fir = relativePath;
                //  Fir = PoliceFir;

                var Principalpath = ConfigurationManager.AppSettings["certFolderPath"];
                var Principal = OdCRequest.pin + "_" + Guid.NewGuid() + ".jpg";
                bool folder = Directory.Exists(Principalpath);
                if (!folder)
                    Directory.CreateDirectory(Principalpath);
                string PrincipalPath = Path.Combine(Principalpath, Principal);
                byte[] PrincipalimageBytes = Convert.FromBase64String(OdCRequest.PrincipalCoveringLetter);
                File.WriteAllBytes(PrincipalPath, PrincipalimageBytes);
                relativePath = PrincipalPath.Replace(HttpContext.Current.Request.PhysicalApplicationPath, GetWebAppRoot()).Replace(@"\", "/");
                PrinceData = relativePath;
                // PrinceData = Principal;

                var Affidavitpath = ConfigurationManager.AppSettings["certFolderPath"];
                var Affidavit = OdCRequest.pin + "_" + Guid.NewGuid() + ".jpg";
                bool folders = Directory.Exists(Affidavitpath);
                if (!folders)
                    Directory.CreateDirectory(Affidavitpath);
                string AffidavitPath = Path.Combine(Affidavitpath, Affidavit);
                byte[] AffidavitimageBytes = Convert.FromBase64String(OdCRequest.MegisrateAffidavit);
                File.WriteAllBytes(AffidavitPath, AffidavitimageBytes);
                relativePath = AffidavitPath.Replace(HttpContext.Current.Request.PhysicalApplicationPath, GetWebAppRoot()).Replace(@"\", "/");
                AffidavitData = relativePath;
                //AffidavitData = Affidavit;

                var Aadharpath = ConfigurationManager.AppSettings["certFolderPath"];
                var Aadhar = OdCRequest.pin + "_" + Guid.NewGuid() + ".jpg";
                bool Aadharfolders = Directory.Exists(Aadharpath);
                if (!Aadharfolders)
                    Directory.CreateDirectory(Aadharpath);
                string AadharPath = Path.Combine(Aadharpath, Aadhar);
                byte[] AadharimageBytes = Convert.FromBase64String(OdCRequest.AadharCopy);
                File.WriteAllBytes(AadharPath, AffidavitimageBytes);
                relativePath = AadharPath.Replace(HttpContext.Current.Request.PhysicalApplicationPath, GetWebAppRoot()).Replace(@"\", "/");
                AadharData = relativePath;
                // AadharData = Aadhar;

                var dbHandler = new dbHandler();
                string encriptedaadhar = "";

                var res = OdCRequest.AadharNo.Split(new string[] { "$$@@$$" }, StringSplitOptions.None);
                var crypt = new HbCrypt(res[1]);
                var aadharencrypt = new HbCrypt();
                string aadhar = crypt.AesDecrypt(res[0]);
                string decryptaadhar = aadharencrypt.AesDecrypt(aadhar);
                encriptedaadhar = aadharencrypt.Encrypt(decryptaadhar);
                var param = new SqlParameter[8];
                param[0] = new SqlParameter("@pin", OdCRequest.pin);
                param[1] = new SqlParameter("@AadharNo", encriptedaadhar);
                param[2] = new SqlParameter("@OdcNo", OdCRequest.OdcNo);
                param[3] = new SqlParameter("@PoliceFir", Fir);
                param[4] = new SqlParameter("@PrincipalCoveringLetter", PrinceData);
                param[5] = new SqlParameter("@MegisrateAffidavit", AffidavitData);
                param[6] = new SqlParameter("@AadharCopy", AadharData);
                param[7] = new SqlParameter("@OdcMemos", file);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SFP_SET_ODCData", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_SFP_SET_ODCData", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }


        [HttpPost, ActionName("SetOldStudentsOdcDataPayment")]
        public HttpResponseMessage SetOldStudentsOdcDataPayment([FromBody] OdCRequest OdCRequest)
        {
            try
            {
                var dir = AppDomain.CurrentDomain.BaseDirectory + @"\Reports\UnsignedCert\";
                //var fileDat = new List<filetranlist>();
                //int size = request.filedata.Count;
                var Memos = string.Empty;
                var WESCertificate = string.Empty;
                string relativePath = string.Empty;
                var fileDat = new List<filelist>();
                int size = OdCRequest.OdcMemos.Count;
                var file = string.Empty;
                var Fir = string.Empty;
                var Prince = string.Empty;
                var AadharData = string.Empty;
                var PrinceData = string.Empty;
                var AffidavitData = string.Empty;
                var path = ConfigurationManager.AppSettings["certFolderPath"];
                for (int i = 0; i < size; i++)
                {
                    var filename = OdCRequest.pin + "_" + Guid.NewGuid() + ".pdf";

                    bool folderExists = Directory.Exists(path);
                    if (!folderExists)
                        Directory.CreateDirectory(path);
                    string imgPath = Path.Combine(path, filename);
                    byte[] imageBytes = Convert.FromBase64String(OdCRequest.OdcMemos[i].file);
                    File.WriteAllBytes(imgPath, imageBytes);
                    relativePath = imgPath.Replace(HttpContext.Current.Request.PhysicalApplicationPath, GetWebAppRoot()).Replace(@"\", "/");
                    //WESCertificate = relativePath;
                    file += relativePath + ',';
                }


                var Firpath = ConfigurationManager.AppSettings["certFolderPath"];
                var PoliceFir = OdCRequest.pin + "_" + Guid.NewGuid() + ".jpg";
                bool folderExist = Directory.Exists(Firpath);
                if (!folderExist)
                    Directory.CreateDirectory(Firpath);
                string PoliceFirPath = Path.Combine(Firpath, PoliceFir);
                byte[] PoliceFirimageBytes = Convert.FromBase64String(OdCRequest.PoliceFir);
                File.WriteAllBytes(PoliceFirPath, PoliceFirimageBytes);
                relativePath = PoliceFirPath.Replace(HttpContext.Current.Request.PhysicalApplicationPath, GetWebAppRoot()).Replace(@"\", "/");
                Fir = relativePath;
                //  Fir = PoliceFir;

                var Principalpath = ConfigurationManager.AppSettings["certFolderPath"];
                var Principal = OdCRequest.pin + "_" + Guid.NewGuid() + ".jpg";
                bool folder = Directory.Exists(Principalpath);
                if (!folder)
                    Directory.CreateDirectory(Principalpath);
                string PrincipalPath = Path.Combine(Principalpath, Principal);
                byte[] PrincipalimageBytes = Convert.FromBase64String(OdCRequest.PrincipalCoveringLetter);
                File.WriteAllBytes(PrincipalPath, PrincipalimageBytes);
                relativePath = PrincipalPath.Replace(HttpContext.Current.Request.PhysicalApplicationPath, GetWebAppRoot()).Replace(@"\", "/");
                PrinceData = relativePath;
                // PrinceData = Principal;

                var Affidavitpath = ConfigurationManager.AppSettings["certFolderPath"];
                var Affidavit = OdCRequest.pin + "_" + Guid.NewGuid() + ".jpg";
                bool folders = Directory.Exists(Affidavitpath);
                if (!folders)
                    Directory.CreateDirectory(Affidavitpath);
                string AffidavitPath = Path.Combine(Affidavitpath, Affidavit);
                byte[] AffidavitimageBytes = Convert.FromBase64String(OdCRequest.MegisrateAffidavit);
                File.WriteAllBytes(AffidavitPath, AffidavitimageBytes);
                relativePath = AffidavitPath.Replace(HttpContext.Current.Request.PhysicalApplicationPath, GetWebAppRoot()).Replace(@"\", "/");
                AffidavitData = relativePath;
                //AffidavitData = Affidavit;

                var Aadharpath = ConfigurationManager.AppSettings["certFolderPath"];
                var Aadhar = OdCRequest.pin + "_" + Guid.NewGuid() + ".jpg";
                bool Aadharfolders = Directory.Exists(Aadharpath);
                if (!Aadharfolders)
                    Directory.CreateDirectory(Aadharpath);
                string AadharPath = Path.Combine(Aadharpath, Aadhar);
                byte[] AadharimageBytes = Convert.FromBase64String(OdCRequest.AadharCopy);
                File.WriteAllBytes(AadharPath, AadharimageBytes);
                relativePath = AadharPath.Replace(HttpContext.Current.Request.PhysicalApplicationPath, GetWebAppRoot()).Replace(@"\", "/");
                AadharData = relativePath;
                // AadharData = Aadhar;

                var dbHandler = new dbHandler();
                string encriptedaadhar = "";

                var res = OdCRequest.AadharNo.Split(new string[] { "$$@@$$" }, StringSplitOptions.None);
                var crypt = new HbCrypt(res[1]);
                var aadharencrypt = new HbCrypt();
                string aadhar = crypt.AesDecrypt(res[0]);
                string decryptaadhar = aadharencrypt.AesDecrypt(aadhar);
                encriptedaadhar = aadharencrypt.Encrypt(decryptaadhar);
                var param = new SqlParameter[15];
                param[0] = new SqlParameter("@pin", OdCRequest.pin);
                param[1] = new SqlParameter("@Name", OdCRequest.Name);
                param[2] = new SqlParameter("@FatherName", OdCRequest.FatherName);
                param[3] = new SqlParameter("@Branch", OdCRequest.Branch);
                param[4] = new SqlParameter("@CollegeCode", OdCRequest.CollegeCode);
                param[5] = new SqlParameter("@Scheme", OdCRequest.Scheme);
                param[6] = new SqlParameter("@Gender", OdCRequest.Gender);
                param[7] = new SqlParameter("@PrincipalCoveringLetter", PrinceData);
                param[8] = new SqlParameter("@AadharNo", encriptedaadhar);
                param[9] = new SqlParameter("@OdcNo", OdCRequest.OdcNo);
                param[10] = new SqlParameter("@AadharCopy", AadharData);
                param[11] = new SqlParameter("@OdcMemos", file);
                param[12] = new SqlParameter("@OdcReason", OdCRequest.OdcReason);
                param[13] = new SqlParameter("@PoliceFir", Fir);
                param[14] = new SqlParameter("@MegistrateAffidavit", AffidavitData);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SFP_SET_Insert_DamagedDDCData", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }

            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_SFP_SET_Insert_DamagedDDCData", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpPost, ActionName("SetOldStudentsDamagedDdcDataPayment")]
        public HttpResponseMessage SetOldStudentsDamagedDdcDataPayment([FromBody] OdCRequest OdCRequest)
        {
            try
            {
                var dir = AppDomain.CurrentDomain.BaseDirectory + @"\Reports\UnsignedCert\";
                //var fileDat = new List<filetranlist>();
                //int size = request.filedata.Count;
                var Memos = string.Empty;
                var WESCertificate = string.Empty;
                string relativePath = string.Empty;
                var fileDat = new List<filelist>();
                int size = OdCRequest.OdcMemos.Count;
                var file = string.Empty;
                var Fir = string.Empty;
                var Prince = string.Empty;
                var AadharData = string.Empty;
                var PrinceData = string.Empty;
                var AffidavitData = string.Empty;
                var path = ConfigurationManager.AppSettings["certFolderPath"];
                for (int i = 0; i < size; i++)
                {
                    var filename = OdCRequest.pin + "_" + Guid.NewGuid() + ".pdf";

                    bool folderExists = Directory.Exists(path);
                    if (!folderExists)
                        Directory.CreateDirectory(path);
                    string imgPath = Path.Combine(path, filename);
                    byte[] imageBytes = Convert.FromBase64String(OdCRequest.OdcMemos[i].file);
                    File.WriteAllBytes(imgPath, imageBytes);
                    relativePath = imgPath.Replace(HttpContext.Current.Request.PhysicalApplicationPath, GetWebAppRoot()).Replace(@"\", "/");
                    //WESCertificate = relativePath;
                    file += relativePath + ',';
                }

                var Principalpath = ConfigurationManager.AppSettings["certFolderPath"];
                var Principal = OdCRequest.pin + "_" + Guid.NewGuid() + ".jpg";
                bool folder = Directory.Exists(Principalpath);
                if (!folder)
                    Directory.CreateDirectory(Principalpath);
                string PrincipalPath = Path.Combine(Principalpath, Principal);
                byte[] PrincipalimageBytes = Convert.FromBase64String(OdCRequest.PrincipalCoveringLetter);
                File.WriteAllBytes(PrincipalPath, PrincipalimageBytes);
                relativePath = PrincipalPath.Replace(HttpContext.Current.Request.PhysicalApplicationPath, GetWebAppRoot()).Replace(@"\", "/");
                PrinceData = relativePath;
                // PrinceData = Principal;


                var Aadharpath = ConfigurationManager.AppSettings["certFolderPath"];
                var Aadhar = OdCRequest.pin + "_" + Guid.NewGuid() + ".jpg";
                bool Aadharfolders = Directory.Exists(Aadharpath);
                if (!Aadharfolders)
                    Directory.CreateDirectory(Aadharpath);
                string AadharPath = Path.Combine(Aadharpath, Aadhar);
                byte[] AadharimageBytes = Convert.FromBase64String(OdCRequest.AadharCopy);
                File.WriteAllBytes(AadharPath, AadharimageBytes);
                relativePath = AadharPath.Replace(HttpContext.Current.Request.PhysicalApplicationPath, GetWebAppRoot()).Replace(@"\", "/");
                AadharData = relativePath;
                // AadharData = Aadhar;

                var dbHandler = new dbHandler();
                var param = new SqlParameter[13];
                param[0] = new SqlParameter("@pin", OdCRequest.pin);
                param[1] = new SqlParameter("@Name", OdCRequest.Name);
                param[2] = new SqlParameter("@FatherName", OdCRequest.FatherName);
                param[3] = new SqlParameter("@Branch", OdCRequest.Branch);
                param[4] = new SqlParameter("@CollegeCode", OdCRequest.CollegeCode);
                param[5] = new SqlParameter("@Scheme", OdCRequest.Scheme);
                param[6] = new SqlParameter("@Gender", OdCRequest.Gender);
                param[7] = new SqlParameter("@AadharNo", OdCRequest.AadharNo);
                param[8] = new SqlParameter("@OdcNo", OdCRequest.OdcNo);

                param[9] = new SqlParameter("@PrincipalCoveringLetter", PrinceData);
                param[10] = new SqlParameter("@AadharCopy", AadharData);
                param[11] = new SqlParameter("@OdcMemos", file);
                param[12] = new SqlParameter("@OdcReason", OdCRequest.OdcReason);

                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SFP_SET_Insert_DamagedDDCData", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }

            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_SFP_SET_Insert_DamagedDDCData", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpPost, ActionName("SetOdcDamagedDataPayment")]
        public HttpResponseMessage SetOdcDamagedDataPayment([FromBody] OdCRequest OdCRequest)
        {
            try
            {
                var dir = AppDomain.CurrentDomain.BaseDirectory + @"\Reports\UnsignedCert\";
                //var fileDat = new List<filetranlist>();
                //int size = request.filedata.Count;
                var Memos = string.Empty;
                var WESCertificate = string.Empty;
                string relativePath = string.Empty;
                var fileDat = new List<filelist>();
                int size = OdCRequest.OdcMemos.Count;
                var file = string.Empty;
                var Fir = string.Empty;
                var Prince = string.Empty;
                var AadharData = string.Empty;
                var PrinceData = string.Empty;
                var AffidavitData = string.Empty;
                var path = ConfigurationManager.AppSettings["certFolderPath"];
                for (int i = 0; i < size; i++)
                {
                    var filename = OdCRequest.pin + "_" + Guid.NewGuid() + ".pdf";

                    bool folderExists = Directory.Exists(path);
                    if (!folderExists)
                        Directory.CreateDirectory(path);
                    string imgPath = Path.Combine(path, filename);
                    byte[] imageBytes = Convert.FromBase64String(OdCRequest.OdcMemos[i].file);
                    File.WriteAllBytes(imgPath, imageBytes);
                    relativePath = imgPath.Replace(HttpContext.Current.Request.PhysicalApplicationPath, GetWebAppRoot()).Replace(@"\", "/");
                    //WESCertificate = relativePath;
                    file += relativePath + ',';
                }



                //  Fir = PoliceFir;

                var Principalpath = ConfigurationManager.AppSettings["certFolderPath"];
                var Principal = OdCRequest.pin + "_" + Guid.NewGuid() + ".jpg";
                bool folder = Directory.Exists(Principalpath);
                if (!folder)
                    Directory.CreateDirectory(Principalpath);
                string PrincipalPath = Path.Combine(Principalpath, Principal);
                byte[] PrincipalimageBytes = Convert.FromBase64String(OdCRequest.PrincipalCoveringLetter);
                File.WriteAllBytes(PrincipalPath, PrincipalimageBytes);
                relativePath = PrincipalPath.Replace(HttpContext.Current.Request.PhysicalApplicationPath, GetWebAppRoot()).Replace(@"\", "/");
                PrinceData = relativePath;
                // PrinceData = Principal;


                //AffidavitData = Affidavit;

                var Aadharpath = ConfigurationManager.AppSettings["certFolderPath"];
                var Aadhar = OdCRequest.pin + "_" + Guid.NewGuid() + ".jpg";
                bool Aadharfolders = Directory.Exists(Aadharpath);
                if (!Aadharfolders)
                    Directory.CreateDirectory(Aadharpath);
                string AadharPath = Path.Combine(Aadharpath, Aadhar);
                byte[] AadharimageBytes = Convert.FromBase64String(OdCRequest.AadharCopy);
                File.WriteAllBytes(AadharPath, AadharimageBytes);
                relativePath = AadharPath.Replace(HttpContext.Current.Request.PhysicalApplicationPath, GetWebAppRoot()).Replace(@"\", "/");
                AadharData = relativePath;
                // AadharData = Aadhar;

                var dbHandler = new dbHandler();
                var param = new SqlParameter[6];
                param[0] = new SqlParameter("@pin", OdCRequest.pin);
                param[1] = new SqlParameter("@AadharNo", OdCRequest.AadharNo);
                param[2] = new SqlParameter("@OdcNo", OdCRequest.OdcNo);
                param[3] = new SqlParameter("@PrincipalCoveringLetter", PrinceData);
                param[4] = new SqlParameter("@AadharCopy", AadharData);
                param[5] = new SqlParameter("@OdcMemos", file);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SFP_SET_Damaged_ODCData", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_SFP_SET_Damaged_ODCData", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpPost, ActionName("SetTcData")]
        public HttpResponseMessage SetTcData([FromBody] JsonObject request)
        {
            try
            {

                var dbHandler = new dbHandler();
                var param = new SqlParameter[4];
                param[0] = new SqlParameter("@pin", request["pin"]);
                param[1] = new SqlParameter("@ReasonForTC", request["ReasonForTC"]);
                param[2] = new SqlParameter("@IdMark1", request["IdMark1"]);
                param[3] = new SqlParameter("@IdMark2", request["IdMark2"]);

                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SFP_SET_TcData", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_SFP_SET_TcData", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpPost, ActionName("SetGenuinenessCheck")]
        public HttpResponseMessage SetGenuinenessCheck([FromBody] GenuineRequest GenuineRequest)
        {
            try
            {


                var dir = AppDomain.CurrentDomain.BaseDirectory + @"\Reports\UnsignedCert\";
                var fileDat = new List<filetranlist>();
                //int size = request.filedata.Count;
                var Memos = string.Empty;
                var WESCertificate = string.Empty;
                string relativePath = string.Empty;
                string relatePath = string.Empty;
                string ApplicationCert = string.Empty;
                //var path = string.Empty;

                var ODC = string.Empty;
                var path = ConfigurationManager.AppSettings["certFolderPath"];
                var ODCFile = GenuineRequest.Pin + "_" + Guid.NewGuid() + ".jpg";
                bool folderExist = Directory.Exists(path);
                if (!folderExist)
                    Directory.CreateDirectory(path);
                string ODCpath = Path.Combine(path, ODCFile);
                byte[] PoliceFirimageBytes = Convert.FromBase64String(GenuineRequest.ODC);
                File.WriteAllBytes(ODCpath, PoliceFirimageBytes);
                relativePath = ODCpath.Replace(HttpContext.Current.Request.PhysicalApplicationPath, GetWebAppRoot()).Replace(@"\", "/");
                WESCertificate = relativePath;
                ODC = relativePath;


                var Authorization = string.Empty;
                var Authpath = ConfigurationManager.AppSettings["certFolderPath"];
                var AuthFile = GenuineRequest.Pin + "_" + Guid.NewGuid() + ".jpg";
                bool foldExist = Directory.Exists(Authpath);
                if (!foldExist)
                    Directory.CreateDirectory(Authpath);
                string Authorpath = Path.Combine(Authpath, AuthFile);
                byte[] AuthorizationimageBytes = Convert.FromBase64String(GenuineRequest.CertificateApplication);
                File.WriteAllBytes(Authorpath, AuthorizationimageBytes);
                relatePath = Authorpath.Replace(HttpContext.Current.Request.PhysicalApplicationPath, GetWebAppRoot()).Replace(@"\", "/");
                ApplicationCert = relatePath;
                Authorization = relatePath;
                var dbHandler = new dbHandler();
                var param = new SqlParameter[13];
                param[0] = new SqlParameter("@Pin", GenuineRequest.Pin);
                param[1] = new SqlParameter("@OrganizationType", GenuineRequest.OrganizationType);
                param[2] = new SqlParameter("@OrganizationName", GenuineRequest.OrganizationName);
                param[3] = new SqlParameter("@OrganizationAddress", GenuineRequest.OrganizationAddress);
                param[4] = new SqlParameter("@OrganizationEmail", GenuineRequest.OrganizationEmail);
                param[5] = new SqlParameter("@OrganizationMobile", GenuineRequest.OrganizationMobile);
                param[6] = new SqlParameter("@ODCNo", GenuineRequest.ODCNo);
                param[7] = new SqlParameter("@ODC", ODC);
                param[8] = new SqlParameter("@ExamMonthYear", GenuineRequest.ExamMonthYear);
                param[9] = new SqlParameter("@Amount", GenuineRequest.Amount);
                param[10] = new SqlParameter("@ApplyingOfficer", GenuineRequest.ApplyingOfficer);
                param[11] = new SqlParameter("@CertificateApplication", Authorization);
                param[12] = new SqlParameter("@OfficerDesignation", GenuineRequest.OfficerDesignation);

                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SS_SET_GenuinenessCheckDetails", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_SS_SET_GenuinenessCheckDetails", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpPost, ActionName("SetGenuinenessCheckPayment")]
        public HttpResponseMessage SetGenuinenessCheckPayment([FromBody] GenuineRequest GenuineRequest)
        {
            try
            {
                var dir = AppDomain.CurrentDomain.BaseDirectory + @"\Reports\UnsignedCert\";
                var fileDat = new List<filetranlist>();
                //int size = request.filedata.Count;
                var Memos = string.Empty;
                var WESCertificate = string.Empty;
                string relativePath = string.Empty;
                string relatePath = string.Empty;
                string ApplicationCert = string.Empty;
                //var path = string.Empty;

                var ODC = string.Empty;
                var path = ConfigurationManager.AppSettings["certFolderPath"];
                var ODCFile = GenuineRequest.Pin + "_" + Guid.NewGuid() + ".jpg";
                bool folderExist = Directory.Exists(path);
                if (!folderExist)
                    Directory.CreateDirectory(path);
                string ODCpath = Path.Combine(path, ODCFile);
                byte[] PoliceFirimageBytes = Convert.FromBase64String(GenuineRequest.ODC);
                File.WriteAllBytes(ODCpath, PoliceFirimageBytes);
                relativePath = ODCpath.Replace(HttpContext.Current.Request.PhysicalApplicationPath, GetWebAppRoot()).Replace(@"\", "/");
                WESCertificate = relativePath;
                ODC = relativePath;
                var Authorization = string.Empty;
                var Authpath = ConfigurationManager.AppSettings["certFolderPath"];
                var AuthFile = GenuineRequest.Pin + "_" + Guid.NewGuid() + ".jpg";
                bool foldExist = Directory.Exists(Authpath);
                if (!foldExist)
                    Directory.CreateDirectory(Authpath);
                string Authorpath = Path.Combine(Authpath, AuthFile);
                byte[] AuthorizationimageBytes = Convert.FromBase64String(GenuineRequest.CertificateApplication);
                File.WriteAllBytes(Authorpath, AuthorizationimageBytes);
                relatePath = Authorpath.Replace(HttpContext.Current.Request.PhysicalApplicationPath, GetWebAppRoot()).Replace(@"\", "/");
                ApplicationCert = relatePath;
                Authorization = relatePath;


                var dbHandler = new dbHandler();
                var param = new SqlParameter[13];
                param[0] = new SqlParameter("@Pin", GenuineRequest.Pin);
                param[1] = new SqlParameter("@OrganizationType", GenuineRequest.OrganizationType);
                param[2] = new SqlParameter("@OrganizationName", GenuineRequest.OrganizationName);
                param[3] = new SqlParameter("@OrganizationAddress", GenuineRequest.OrganizationAddress);
                param[4] = new SqlParameter("@OrganizationEmail", GenuineRequest.OrganizationEmail);
                param[5] = new SqlParameter("@OrganizationMobile", GenuineRequest.OrganizationMobile);
                param[6] = new SqlParameter("@ODCNo", GenuineRequest.ODCNo);
                param[7] = new SqlParameter("@ODC", ODC);
                param[8] = new SqlParameter("@ExamMonthYear", GenuineRequest.ExamMonthYear);
                param[9] = new SqlParameter("@Amount", GenuineRequest.Amount);
                param[10] = new SqlParameter("@ApplyingOfficer", GenuineRequest.ApplyingOfficer);
                param[11] = new SqlParameter("@CertificateApplication", Authorization);
                param[12] = new SqlParameter("@OfficerDesignation", GenuineRequest.OfficerDesignation);

                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SS_SET_GenuinenessCheckPaymentDetails", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_SS_SET_GenuinenessCheckPaymentDetails", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }


        [HttpPost, ActionName("SetNameCorrectionData")]
        public HttpResponseMessage SetNameCorrectionData([FromBody] JsonObject request)
        {
            try
            {

                var dbHandler = new dbHandler();
                var param = new SqlParameter[7];
                param[0] = new SqlParameter("@pin", request["pin"]);
                param[1] = new SqlParameter("@Name", request["Name"]);
                param[2] = new SqlParameter("@UpdatedName", request["UpdatedName"]);
                param[3] = new SqlParameter("@FatherName", request["FatherName"]);
                param[4] = new SqlParameter("@UpdatedFatherName", request["UpdatedFatherName"]);
                param[5] = new SqlParameter("@Gender", request["Gender"]);
                param[6] = new SqlParameter("@Sscmemo", request["Sscmemo"]);

                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SFP_SET_NameCorrectionData", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_SFP_SET_NameCorrectionData", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        public class StampPdf
        {
            public string PdfLocation { get; set; }
            public string ApplicationNo { get; set; }
            public float llx { get; set; }
            public float lly { get; set; }
            public float urx { get; set; }
            public float ury { get; set; }
        }


        [HttpPost, ActionName("StampTranscript")]
        public HttpResponseMessage StampTranscript([FromBody] StampPdf req)
        {
            try
            {
                var dir = AppDomain.CurrentDomain.BaseDirectory + @"Reports\UnsignedCert\";
                var content = req.PdfLocation.ToString().Replace("http://", "").Replace("https://", "");
                string[] arrRes = content.Split('/');
                int index = content.LastIndexOf("/");
                string filepath = content.Substring(index + 1);
                string[] filetype = filepath.Split('_');
                string physicalpath = dir + filepath;
                PdfDocument templatePdf = PdfReader.Open(physicalpath, PdfDocumentOpenMode.Import);
                var urx = req.urx;
                var ury = req.ury;
                var llx = req.llx;
                var lly = req.lly;
                PdfDocument finalPdf = new PdfDocument();
                var options = new XPdfFontOptions(PdfFontEmbedding.Always);
                // Get the desired page
                PdfPage page = templatePdf.Pages[0];
                page.Size = PdfSharp.PageSize.A4;
                page.Orientation = PdfSharp.PageOrientation.Portrait;
                page = finalPdf.AddPage(page);
                XGraphics gfx = XGraphics.FromPdfPage(page);
                XFont font = new XFont("Courier", 14.0);
                XFont font1 = new XFont("Courier", 8.0);

                if (req.ApplicationNo.ToString().Length > 0)
                {
                    var code128 = new itextalias.iTextSharp.text.pdf.Barcode128
                    {
                        CodeType = itextalias.iTextSharp.text.pdf.Barcode.CODE128,
                        ChecksumText = true,
                        GenerateChecksum = true,
                        StartStopText = true,
                        Code = req.ApplicationNo.ToString(),
                        AltText = req.ApplicationNo.ToString()
                    };
                    var img = code128.CreateDrawingImage(System.Drawing.Color.Black, System.Drawing.Color.White);
                    var strm = new MemoryStream();
                    img.Save(strm, ImageFormat.Png);
                    var xImage = XImage.FromStream(strm);
                    gfx.DrawString("TRANSCRIPT", font, XBrushes.Orange, urx, ury);
                    gfx.DrawImage(xImage, urx, ury + 2, llx, lly);
                    gfx.DrawString(req.ApplicationNo.ToString(), font1, XBrushes.Black, new XRect(urx, ury + 18, llx, lly), XStringFormat.TopLeft);
                }
                finalPdf.Save(physicalpath);
                string relativePath = physicalpath.Replace(HttpContext.Current.Request.PhysicalApplicationPath, GetWebAppRoot()).Replace(@"\", "/");
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, relativePath);
                return response;
            }
            catch (Exception ex)
            {
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.NotFound, ex.Message);
                return response;
            }


        }



        [HttpPost, ActionName("SetTranscriptData")]
        public HttpResponseMessage SetTranscriptData([FromBody] transcriptreqData request)
        {
            try
            {
                // var transpth = ConfigurationManager.AppSettings["Transcript_File_path"].ToString();
                var dir = AppDomain.CurrentDomain.BaseDirectory + @"\Reports\UnsignedCert\";
                var fileDat = new List<filetranlist>();
                int size = request.filedata.Count;
                var Memos = string.Empty;
                var WESCertificate = string.Empty;
                string relativePath = string.Empty;
                var path = string.Empty;
                for (int i = 0; i < size; i++)
                {
                    var filename = "TRNSC" + request.Pin + "_" + request.filedata[i].filetype + "_" + $"{Guid.NewGuid().ToString()}.pdf";
                    path = dir;
                    bool folderExists = Directory.Exists(dir);
                    if (!folderExists)
                        Directory.CreateDirectory(dir);
                    string imgPath = Path.Combine(path, filename);
                    byte[] imageBytes = Convert.FromBase64String(request.filedata[i].file);
                    Stream inputPdfStream = new MemoryStream(imageBytes);
                    File.WriteAllBytes(imgPath, imageBytes);
                    relativePath = imgPath.Replace(HttpContext.Current.Request.PhysicalApplicationPath, GetWebAppRoot()).Replace(@"\", "/");
                    Memos += relativePath + ',';
                }
                if (request.WESCertificate != "")
                {
                    var WESCert = "WESCert" + request.Pin + "_" + $"{Guid.NewGuid().ToString()}.pdf";
                    path = dir;
                    bool foldrExists = Directory.Exists(dir);
                    if (!foldrExists)
                        Directory.CreateDirectory(dir);
                    string pdfPath = Path.Combine(path, WESCert);
                    byte[] Bytes = Convert.FromBase64String(request.WESCertificate);
                    File.WriteAllBytes(pdfPath, Bytes);
                    relativePath = pdfPath.Replace(HttpContext.Current.Request.PhysicalApplicationPath, GetWebAppRoot()).Replace(@"\", "/");
                    WESCertificate = relativePath;
                }
                else
                {
                    WESCertificate = "";
                }



                var dbHandler = new dbHandler();
                var param = new SqlParameter[8];
                param[0] = new SqlParameter("@Pin", request.Pin);
                param[1] = new SqlParameter("@UniversitiesApplied", request.UniversitiesApplied);
                param[2] = new SqlParameter("@UniversityEmails", request.UniversityEmails);
                param[3] = new SqlParameter("@WESCertificate", WESCertificate);
                param[4] = new SqlParameter("@WESReferenceNo", request.WESReferenceNo);
                param[5] = new SqlParameter("@Email", request.Email);
                param[6] = new SqlParameter("@Memos", Memos);
                param[7] = new SqlParameter("@certificateType", request.certificateType);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SFP_SET_TranscriptsData", param);
                if (dt.Tables[0].Rows[0]["ResponceCode"].ToString() == "200")
                {
                    for (var i = 0; i < dt.Tables[1].Rows.Count; i++)
                    {

                        var content = dt.Tables[1].Rows[i]["value"].ToString().Replace("http://", "").Replace("https://", "");
                        string[] arrRes = content.Split('/');
                        int index = content.LastIndexOf("/");
                        string filepath = content.Substring(index + 1);

                        string[] filetype = filepath.Split('_');
                        string physicalpath = dir + filepath;

                        // PdfDocument outputDocument = new PdfDocument();
                        // outputDocument.PageLayout = PdfPageLayout.SinglePage;

                        // XGraphics gfxtmp;
                        // XRect boxtmp;
                        // Open the file to resize
                        //XPdfForm form = XPdfForm.FromFile(physicalpath);

                        // Add a new page to the output document
                        // PdfPage pdfpage = outputDocument.AddPage();
                        // if (form.PixelWidth > form.PixelHeight)
                        //     pdfpage.Orientation = PageOrientation.Portrait;
                        // else
                        //     pdfpage.Orientation = PageOrientation.Portrait;

                        // double width = pdfpage.Width;
                        // double height = pdfpage.Height;

                        // gfxtmp = XGraphics.FromPdfPage(pdfpage);
                        // boxtmp = new XRect(0, 0, width, height);
                        // gfxtmp.DrawImage(form, boxtmp);
                        // outputDocument.Save(physicalpath);

                        if (filetype[1] == "1")
                        {
                            PdfDocument outputDocument = new PdfDocument();
                            outputDocument.PageLayout = PdfPageLayout.SinglePage;

                            XGraphics gfxtmp;
                            XRect boxtmp;
                            // Open the file to resize
                            XPdfForm form = XPdfForm.FromFile(physicalpath);

                            // Add a new page to the output document
                            PdfPage pdfpage = outputDocument.AddPage();
                            pdfpage.Size = PdfSharp.PageSize.Letter;
                            if (form.PixelWidth > form.PixelHeight)
                                pdfpage.Orientation = PageOrientation.Landscape;
                            else
                                pdfpage.Orientation = PageOrientation.Portrait;

                            double width = pdfpage.Width;
                            double height = pdfpage.Height;

                            gfxtmp = XGraphics.FromPdfPage(pdfpage);
                            boxtmp = new XRect(0, 0, width, height);
                            gfxtmp.DrawImage(form, boxtmp);
                            outputDocument.Save(physicalpath);

                            PdfDocument templatePdf = PdfReader.Open(physicalpath, PdfDocumentOpenMode.Import);
                            PdfDocument finalPdf = new PdfDocument();
                            var options = new XPdfFontOptions(PdfFontEmbedding.Always);
                            // Get the desired page
                            PdfPage page = templatePdf.Pages[0];
                            page.Size = PdfSharp.PageSize.A4;
                            page.Orientation = PdfSharp.PageOrientation.Portrait;
                            page = finalPdf.AddPage(page);
                            XGraphics gfx = XGraphics.FromPdfPage(page);
                            XFont font = new XFont("Courier", 14.0);
                            XFont font1 = new XFont("Courier", 8.0);

                            if (dt.Tables[1].Rows[i]["ApplicationNumber"].ToString().Length > 0)
                            {
                                var code128 = new itextalias.iTextSharp.text.pdf.Barcode128
                                {
                                    CodeType = itextalias.iTextSharp.text.pdf.Barcode.CODE128,
                                    ChecksumText = true,
                                    GenerateChecksum = true,
                                    StartStopText = true,
                                    Code = dt.Tables[1].Rows[i]["ApplicationNumber"].ToString(),
                                    AltText = dt.Tables[1].Rows[i]["ApplicationNumber"].ToString()
                                };
                                var img = code128.CreateDrawingImage(System.Drawing.Color.Black, System.Drawing.Color.White);
                                var strm = new MemoryStream();
                                img.Save(strm, ImageFormat.Png);
                                var xImage = XImage.FromStream(strm);
                                gfx.DrawString("TRANSCRIPT", font, XBrushes.Orange, 30, 45);
                                gfx.DrawImage(xImage, 30, 47, 100, 15);
                                gfx.DrawString(dt.Tables[1].Rows[i]["ApplicationNumber"].ToString(), font1, XBrushes.Black, new XRect(30, 63, 100, 15), XStringFormat.TopLeft);
                            }
                            finalPdf.Save(physicalpath);
                        }
                        else if (filetype[1] == "2")
                        {
                            PdfDocument outputDocument = new PdfDocument();
                            outputDocument.PageLayout = PdfPageLayout.SinglePage;

                            XGraphics gfxtmp;
                            XRect boxtmp;
                            // Open the file to resize
                            XPdfForm form = XPdfForm.FromFile(physicalpath);

                            // Add a new page to the output document
                            PdfPage pdfpage = outputDocument.AddPage();
                            pdfpage.Size = PdfSharp.PageSize.Letter;
                            if (form.PixelWidth > form.PixelHeight)
                                pdfpage.Orientation = PageOrientation.Landscape;
                            else
                                pdfpage.Orientation = PageOrientation.Portrait;

                            double width = pdfpage.Width;
                            double height = pdfpage.Height;

                            gfxtmp = XGraphics.FromPdfPage(pdfpage);
                            boxtmp = new XRect(0, 0, width, height);
                            gfxtmp.DrawImage(form, boxtmp);
                            outputDocument.Save(physicalpath);

                            PdfDocument templatePdf = PdfReader.Open(physicalpath, PdfDocumentOpenMode.Import);
                            PdfDocument finalPdf = new PdfDocument();
                            var options = new XPdfFontOptions(PdfFontEmbedding.Always);
                            PdfPage page = templatePdf.Pages[0];
                            page = finalPdf.AddPage(page);
                            XGraphics gfx = XGraphics.FromPdfPage(page);
                            XFont font = new XFont("Courier", 14.0);
                            XFont font1 = new XFont("Courier", 8.0);

                            if (dt.Tables[1].Rows[i]["ApplicationNumber"].ToString().Length > 0)
                            {
                                var code128 = new itextalias.iTextSharp.text.pdf.Barcode128
                                {
                                    CodeType = itextalias.iTextSharp.text.pdf.Barcode.CODE128,
                                    ChecksumText = true,
                                    GenerateChecksum = true,
                                    StartStopText = true,
                                    Code = dt.Tables[1].Rows[i]["ApplicationNumber"].ToString(),
                                    AltText = dt.Tables[1].Rows[i]["ApplicationNumber"].ToString()
                                };
                                var img = code128.CreateDrawingImage(System.Drawing.Color.Black, System.Drawing.Color.White);
                                var strm = new MemoryStream();
                                img.Save(strm, ImageFormat.Png);
                                var xImage = XImage.FromStream(strm);
                                gfx.DrawString("TRANSCRIPT", font, XBrushes.Orange, 125, 70);
                                gfx.DrawImage(xImage, 125, 72, 100, 15);
                                gfx.DrawString(dt.Tables[1].Rows[i]["ApplicationNumber"].ToString(), font1, XBrushes.Black, new XRect(125, 88, 100, 15), XStringFormat.TopLeft);

                            }
                            finalPdf.Save(physicalpath);
                        }

                    }

                }
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_SFP_SET_TranscriptsData", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }



        [HttpPost, ActionName("SetNoDataTranscriptData")]
        public HttpResponseMessage SetNoDataTranscriptData([FromBody] transcriptreqData request)
        {
            try
            {
                // var transpth = ConfigurationManager.AppSettings["Transcript_File_path"].ToString();
                var dir = AppDomain.CurrentDomain.BaseDirectory + @"\Reports\UnsignedCert\";
                var fileDat = new List<filetranlist>();
                int size = request.filedata.Count;
                var Memos = string.Empty;
                var WESCertificate = string.Empty;
                string relativePath = string.Empty;
                var path = string.Empty;
                for (int i = 0; i < size; i++)
                {
                    var filename = "TRNSC" + request.Pin + "_" + request.filedata[i].filetype + "_" + $"{Guid.NewGuid().ToString()}.pdf";
                    path = dir;
                    bool folderExists = Directory.Exists(dir);
                    if (!folderExists)
                        Directory.CreateDirectory(dir);
                    string imgPath = Path.Combine(path, filename);
                    byte[] imageBytes = Convert.FromBase64String(request.filedata[i].file);
                    Stream inputPdfStream = new MemoryStream(imageBytes);
                    File.WriteAllBytes(imgPath, imageBytes);
                    relativePath = imgPath.Replace(HttpContext.Current.Request.PhysicalApplicationPath, GetWebAppRoot()).Replace(@"\", "/");
                    Memos += relativePath + ',';
                }
                if (request.WESCertificate != "")
                {
                    var WESCert = "WESCert" + request.Pin + "_" + $"{Guid.NewGuid().ToString()}.pdf";
                    path = dir;
                    bool foldrExists = Directory.Exists(dir);
                    if (!foldrExists)
                        Directory.CreateDirectory(dir);
                    string pdfPath = Path.Combine(path, WESCert);
                    byte[] Bytes = Convert.FromBase64String(request.WESCertificate);
                    File.WriteAllBytes(pdfPath, Bytes);
                    relativePath = pdfPath.Replace(HttpContext.Current.Request.PhysicalApplicationPath, GetWebAppRoot()).Replace(@"\", "/");
                    WESCertificate = relativePath;
                }
                else
                {
                    WESCertificate = "";
                }
                var dbHandler = new dbHandler();
                var param = new SqlParameter[14];
                param[0] = new SqlParameter("@Pin", request.Pin);
                param[1] = new SqlParameter("@Name", request.Name);
                param[2] = new SqlParameter("@FatherName", request.FatherName);
                param[3] = new SqlParameter("@Branch", request.Branch);
                param[4] = new SqlParameter("@CollegeCode", request.CollegeCode);
                param[5] = new SqlParameter("@Scheme", request.Scheme);
                param[6] = new SqlParameter("@Gender", request.Gender);
                param[7] = new SqlParameter("@UniversitiesApplied", request.UniversitiesApplied);
                param[8] = new SqlParameter("@UniversityEmails", request.UniversityEmails);
                param[9] = new SqlParameter("@WESCertificate", WESCertificate);
                param[10] = new SqlParameter("@WESReferenceNo", request.WESReferenceNo);
                param[11] = new SqlParameter("@Email", request.Email);
                param[12] = new SqlParameter("@Memos", Memos);
                param[13] = new SqlParameter("@certificateType", request.certificateType);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SFP_SET_NOTranscriptsData", param);
                if (dt.Tables[0].Rows[0]["ResponceCode"].ToString() == "200")
                {
                    for (var i = 0; i < dt.Tables[1].Rows.Count; i++)
                    {

                        var content = dt.Tables[1].Rows[i]["value"].ToString().Replace("http://", "").Replace("https://", "");
                        string[] arrRes = content.Split('/');
                        int index = content.LastIndexOf("/");
                        string filepath = content.Substring(index + 1);

                        string[] filetype = filepath.Split('_');
                        string physicalpath = dir + filepath;

                        // PdfDocument outputDocument = new PdfDocument();
                        // outputDocument.PageLayout = PdfPageLayout.SinglePage;

                        // XGraphics gfxtmp;
                        // XRect boxtmp;
                        // Open the file to resize
                        //XPdfForm form = XPdfForm.FromFile(physicalpath);

                        // Add a new page to the output document
                        // PdfPage pdfpage = outputDocument.AddPage();
                        // if (form.PixelWidth > form.PixelHeight)
                        //     pdfpage.Orientation = PageOrientation.Portrait;
                        // else
                        //     pdfpage.Orientation = PageOrientation.Portrait;

                        // double width = pdfpage.Width;
                        // double height = pdfpage.Height;

                        // gfxtmp = XGraphics.FromPdfPage(pdfpage);
                        // boxtmp = new XRect(0, 0, width, height);
                        // gfxtmp.DrawImage(form, boxtmp);
                        // outputDocument.Save(physicalpath);

                        if (filetype[1] == "1")
                        {
                            PdfDocument outputDocument = new PdfDocument();
                            outputDocument.PageLayout = PdfPageLayout.SinglePage;

                            XGraphics gfxtmp;
                            XRect boxtmp;
                            // Open the file to resize
                            XPdfForm form = XPdfForm.FromFile(physicalpath);

                            // Add a new page to the output document
                            PdfPage pdfpage = outputDocument.AddPage();
                            pdfpage.Size = PdfSharp.PageSize.Letter;
                            if (form.PixelWidth > form.PixelHeight)
                                pdfpage.Orientation = PageOrientation.Landscape;
                            else
                                pdfpage.Orientation = PageOrientation.Portrait;

                            double width = pdfpage.Width;
                            double height = pdfpage.Height;

                            gfxtmp = XGraphics.FromPdfPage(pdfpage);
                            boxtmp = new XRect(0, 0, width, height);
                            gfxtmp.DrawImage(form, boxtmp);
                            outputDocument.Save(physicalpath);

                            PdfDocument templatePdf = PdfReader.Open(physicalpath, PdfDocumentOpenMode.Import);
                            PdfDocument finalPdf = new PdfDocument();
                            var options = new XPdfFontOptions(PdfFontEmbedding.Always);
                            // Get the desired page
                            PdfPage page = templatePdf.Pages[0];
                            page.Size = PdfSharp.PageSize.A4;
                            page.Orientation = PdfSharp.PageOrientation.Portrait;
                            page = finalPdf.AddPage(page);
                            XGraphics gfx = XGraphics.FromPdfPage(page);
                            XFont font = new XFont("Courier", 14.0);
                            XFont font1 = new XFont("Courier", 8.0);

                            if (dt.Tables[1].Rows[i]["ApplicationNumber"].ToString().Length > 0)
                            {
                                var code128 = new itextalias.iTextSharp.text.pdf.Barcode128
                                {
                                    CodeType = itextalias.iTextSharp.text.pdf.Barcode.CODE128,
                                    ChecksumText = true,
                                    GenerateChecksum = true,
                                    StartStopText = true,
                                    Code = dt.Tables[1].Rows[i]["ApplicationNumber"].ToString(),
                                    AltText = dt.Tables[1].Rows[i]["ApplicationNumber"].ToString()
                                };
                                var img = code128.CreateDrawingImage(System.Drawing.Color.Black, System.Drawing.Color.White);
                                var strm = new MemoryStream();
                                img.Save(strm, ImageFormat.Png);
                                var xImage = XImage.FromStream(strm);
                                gfx.DrawString("TRANSCRIPT", font, XBrushes.Orange, 30, 45);
                                gfx.DrawImage(xImage, 30, 47, 100, 15);
                                gfx.DrawString(dt.Tables[1].Rows[i]["ApplicationNumber"].ToString(), font1, XBrushes.Black, new XRect(30, 63, 100, 15), XStringFormat.TopLeft);
                            }
                            finalPdf.Save(physicalpath);
                        }
                        else if (filetype[1] == "2")
                        {
                            PdfDocument outputDocument = new PdfDocument();
                            outputDocument.PageLayout = PdfPageLayout.SinglePage;

                            XGraphics gfxtmp;
                            XRect boxtmp;
                            // Open the file to resize
                            XPdfForm form = XPdfForm.FromFile(physicalpath);

                            // Add a new page to the output document
                            PdfPage pdfpage = outputDocument.AddPage();
                            pdfpage.Size = PdfSharp.PageSize.Letter;
                            if (form.PixelWidth > form.PixelHeight)
                                pdfpage.Orientation = PageOrientation.Landscape;
                            else
                                pdfpage.Orientation = PageOrientation.Portrait;

                            double width = pdfpage.Width;
                            double height = pdfpage.Height;

                            gfxtmp = XGraphics.FromPdfPage(pdfpage);
                            boxtmp = new XRect(0, 0, width, height);
                            gfxtmp.DrawImage(form, boxtmp);
                            outputDocument.Save(physicalpath);

                            PdfDocument templatePdf = PdfReader.Open(physicalpath, PdfDocumentOpenMode.Import);
                            PdfDocument finalPdf = new PdfDocument();
                            var options = new XPdfFontOptions(PdfFontEmbedding.Always);
                            PdfPage page = templatePdf.Pages[0];
                            page = finalPdf.AddPage(page);
                            XGraphics gfx = XGraphics.FromPdfPage(page);
                            XFont font = new XFont("Courier", 14.0);
                            XFont font1 = new XFont("Courier", 8.0);

                            if (dt.Tables[1].Rows[i]["ApplicationNumber"].ToString().Length > 0)
                            {
                                var code128 = new itextalias.iTextSharp.text.pdf.Barcode128
                                {
                                    CodeType = itextalias.iTextSharp.text.pdf.Barcode.CODE128,
                                    ChecksumText = true,
                                    GenerateChecksum = true,
                                    StartStopText = true,
                                    Code = dt.Tables[1].Rows[i]["ApplicationNumber"].ToString(),
                                    AltText = dt.Tables[1].Rows[i]["ApplicationNumber"].ToString()
                                };
                                var img = code128.CreateDrawingImage(System.Drawing.Color.Black, System.Drawing.Color.White);
                                var strm = new MemoryStream();
                                img.Save(strm, ImageFormat.Png);
                                var xImage = XImage.FromStream(strm);
                                gfx.DrawString("TRANSCRIPT", font, XBrushes.Orange, 125, 70);
                                gfx.DrawImage(xImage, 125, 72, 100, 15);
                                gfx.DrawString(dt.Tables[1].Rows[i]["ApplicationNumber"].ToString(), font1, XBrushes.Black, new XRect(125, 88, 100, 15), XStringFormat.TopLeft);

                            }
                            finalPdf.Save(physicalpath);
                        }

                    }

                }
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_SFP_SET_NOTranscriptsData", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }


        public class GetTranscriptRes
        {

            public string Pin { get; set; }
            public string Certificatepath { get; set; }
            public string ApplicationNo { get; set; }

        }

        [HttpPost, ActionName("GetTranscriptCertificate")]
        public async Task<object> GetTranscriptCertificate([FromBody] JsonObject request)
        {
            try
            {
                var js = JsonConvert.DeserializeObject<ArrayList>(Convert.ToString(request["Applicationjson"]));
                var finalJsonArray = new ArrayList();
                var jsonArray = new JsonArray();
                for (int i = 0; i < js.Count; i++)
                {
                    var jobject = JsonConvert.DeserializeObject<JsonObject>(JsonConvert.SerializeObject(js[i]));
                    jsonArray.Add(jobject);
                }
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@AppNojson", JsonConvert.SerializeObject(jsonArray));
                DataSet ds = dbHandler.ReturnDataWithStoredProcedure("USP_SS_GET_FeePaidTranscriptsDetails", param);
                List<GetTranscriptRes> GetTranscriptRes = ds.Tables[1].DataTableToList<GetTranscriptRes>();
                return GetTranscriptRes;
            }
            catch (Exception ex)
            {
                return "FAILED" + ex.Message;
            }
        }

        [HttpGet, ActionName("GetTranscriptDataforEmail")]
        public HttpResponseMessage GetTranscriptDataforEmail(String ApplicationNo)
        {
            try
            {

                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@ApplicationNo", ApplicationNo);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SOS_GET_Transcript_Data_FOR_Email", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_SOS_GET_Transcript_Data_FOR_Email", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpGet, ActionName("ReleaseStudentServicesPin")]
        public HttpResponseMessage ReleaseStudentServicesPin(String Pin, int CertificateTypeId, int Id = 0)
        {
            try
            {

                var dbHandler = new dbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@Pin", Pin);
                param[1] = new SqlParameter("@CertificateTypeId", CertificateTypeId);
                param[2] = new SqlParameter("@Id", Id);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SET_ReleaseStudentServicesPin", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_SET_ReleaseStudentServicesPin", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpPost, ActionName("RequestLog")]
        public HttpResponseMessage RequestLog([FromBody] JsonObject request)
        {
            try
            {

                var dbHandler = new dbHandler();
                var param = new SqlParameter[12];
                param[0] = new SqlParameter("@marchantid", request["marchantid"]);
                param[1] = new SqlParameter("@subMarchantid", request["subMarchantid"]);
                param[2] = new SqlParameter("@addInfo1", request["addInfo1"]);
                param[3] = new SqlParameter("@addInfo3", request["addInfo3"]);
                param[4] = new SqlParameter("@addInfo4", request["addInfo4"]);
                param[5] = new SqlParameter("@addInfo5", request["addInfo5"]);
                param[6] = new SqlParameter("@addInfo6", request["addInfo6"]);
                param[7] = new SqlParameter("@addInfo7", request["addInfo7"]);
                param[8] = new SqlParameter("@challan", request["challan"]);
                param[9] = new SqlParameter("@amount", request["amount"]);
                param[10] = new SqlParameter("@schemeId", request["schemeId"]);
                param[11] = new SqlParameter("@json", request["json"]);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("USP_SFP_SET_RequestLog", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_SFP_GET_PinListForFeePayment", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }



        [HttpPost, ActionName("SetCertificateData")]
        public HttpResponseMessage SetCertificateData([FromBody] JsonObject request)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[7];
                param[0] = new SqlParameter("@Pin", request["Pin"]);
                param[1] = new SqlParameter("@Name", request["Name"]);
                param[2] = new SqlParameter("@Scheme", request["Scheme"]);
                param[3] = new SqlParameter("@CollegeCode", request["CollegeCode"]);
                param[4] = new SqlParameter("@CertificateType", request["CertificateType"]);
                param[5] = new SqlParameter("@Amount", request["Amount"]);
                param[6] = new SqlParameter("@Mobile", request["Mobile"]);

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SBP_SET_CertificateData", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("SBP_SET_CertificateData", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        //[HttpPost, ActionName("SetNameCorrectionData")]
        //public HttpResponseMessage SetNameCorrectionData([FromBody]JsonObject request)
        //{
        //    try
        //    {

        //        var dbHandler = new dbHandler();
        //        var param = new SqlParameter[11];
        //        param[0] = new SqlParameter("@PIN", request["PIN"]);

        //        param[1] = new SqlParameter("@Scheme", request["Scheme"]);
        //        param[2] = new SqlParameter("@CollegeCode", request["CollegeCode"]);
        //        param[3] = new SqlParameter("@CertificateType", request["CertificateType"]);
        //        param[4] = new SqlParameter("@OldName", request["OldName"]);
        //        param[5] = new SqlParameter("@UpdatedName", request["UpdatedName"]);
        //        param[6] = new SqlParameter("@FatherName", request["FatherName"]);
        //        param[7] = new SqlParameter("@UpdatedFathername", request["UpdatedFathername"]);
        //        param[8] = new SqlParameter("@SscMemo", request["SscMemo"]);

        //        param[9] = new SqlParameter("@Amount", request["Amount"]);
        //        param[10] = new SqlParameter("@Mobile", request["Mobile"]);
        //        param[11] = new SqlParameter("@DOB", request["DOB"]);
        //        var dt = dbHandler.ReturnDataWithStoredProcedureTable("SBP_SET_NameCorrection", param);
        //        HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
        //        return response;
        //    }
        //    catch (Exception ex)
        //    {

        //        dbHandler.SaveErorr("SBP_SET_NameCorrection", 0, ex.Message);
        //        return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
        //    }
        //}

        [HttpPost, ActionName("Set_TC_CertificateData")]
        public HttpResponseMessage Set_TC_CertificateData([FromBody] JsonObject request)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[9];
                param[0] = new SqlParameter("@Pin", request["Pin"]);
                param[1] = new SqlParameter("@Name", request["Name"]);
                param[2] = new SqlParameter("@Scheme", request["Scheme"]);
                param[3] = new SqlParameter("@CollegeCode", request["CollegeCode"]);
                param[4] = new SqlParameter("@CertificateType", request["CertificateType"]);
                param[5] = new SqlParameter("@Amount", request["Amount"]);
                param[6] = new SqlParameter("@Mobile", request["Mobile"]);
                param[7] = new SqlParameter("@NoDue", request["NoDue"]);
                param[8] = new SqlParameter("@photo", request["photo"]);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SBP_SET_Tc_CertificateData", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("SBP_SET_CertificateData", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpGet, ActionName("getApproveExamFees")]
        public HttpResponseMessage getApproveExamFees(int UserId, int StudentTypeId, int ExamMonthYearId, string Semester)
        {
            try
            {

                var dbHandler = new dbHandler();
                var param = new SqlParameter[4];
                param[0] = new SqlParameter("@UserId", UserId);
                param[1] = new SqlParameter("@StudentTypeId", StudentTypeId);
                param[2] = new SqlParameter("@ExamMonthYearId", ExamMonthYearId);
                param[3] = new SqlParameter("@Semester", Semester);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SFP_GET_Reports", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_SFP_GET_Reports", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }


        [HttpGet, ActionName("SetExamMonthYear")]
        public HttpResponseMessage SetExamMonthYear(string ExamMonthYear)
        {
            try
            {

                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@ExamMonthYear", ExamMonthYear);

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("USP_SET_CreateNewExamMonthYear", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_SET_CreateNewExamMonthYear", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpGet, ActionName("GetAdminPreExamReports")]
        public HttpResponseMessage GetAdminPreExamReports(int ExamMonthYearId, string Semester, int StudentTypeId)
        {
            try
            {

                var dbHandler = new dbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@ExamMonthYearId", ExamMonthYearId);
                param[1] = new SqlParameter("@Semester", Semester);
                param[2] = new SqlParameter("@StudentTypeId", StudentTypeId);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("ADM_SFP_GET_PaymentReports", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("ADM_SFP_GET_PaymentReports", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpGet, ActionName("GetAdminFeedBackReports")]
        public HttpResponseMessage GetAdminFeedBackReports(int ExamMonthYearId, string Semester, int StudentTypeId)
        {
            try
            {

                var dbHandler = new dbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@ExamMonthYearId", ExamMonthYearId);
                param[1] = new SqlParameter("@Semester", Semester);
                param[2] = new SqlParameter("@StudentTypeId", StudentTypeId);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("ADM_SFP_GET_FeedBackReports", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("ADM_SFP_GET_PaymentReports", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpGet, ActionName("GetAdminHallTicketReports")]
        public HttpResponseMessage GetAdminHallTicketReports(int ExamMonthYearId, string Semester, int StudentTypeId)
        {
            try
            {

                var dbHandler = new dbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@ExamMonthYearId", ExamMonthYearId);
                param[1] = new SqlParameter("@Semester", Semester);
                param[2] = new SqlParameter("@StudentTypeId", StudentTypeId);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("ADM_SFP_GET_HallticketPaymentReports", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("ADM_SFP_GET_HallticketPaymentReports", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }


        [HttpPost, ActionName("getApproveExamFeeCondonation")]
        public HttpResponseMessage getApproveExamFeeCondonation([FromBody] JsonObject request)
        {
            try
            {

                var dbHandler = new dbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@UserId", request["UserId"]);
                param[1] = new SqlParameter("@StudentTypeId", request["StudentTypeId"]);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("USP_SFP_GET_CondonationList", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_SFP_GET_Reports", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }






        [HttpPost, ActionName("GetApprovalList")]
        public HttpResponseMessage GetApprovalList([FromBody] JsonObject request)
        {
            try
            {

                var dbHandler = new dbHandler();
                var param = new SqlParameter[6];
                param[0] = new SqlParameter("@DataFormatTypeId", request["type"]);
                param[1] = new SqlParameter("@UserTypeId", request["StudentTypeId"]);
                param[2] = new SqlParameter("@CollegeCode", request["collegeCode"]);
                param[3] = new SqlParameter("@BranchCode", request["branchcode"]);
                param[4] = new SqlParameter("@ExamMonthYearId", request["ExamMonthYearId"]);
                param[5] = new SqlParameter("@Semester", request["semester"]);

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("USP_SFP_GETnew_StudentReportLists", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_SFP_GETnew_StudentReportLists", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }


        [HttpPost, ActionName("getApprovalSingleList")]
        public HttpResponseMessage getApprovalSingleList([FromBody] JsonObject request)
        {
            try
            {

                var dbHandler = new dbHandler();
                var param = new SqlParameter[5];
                param[0] = new SqlParameter("@UserTypeId", request["UserTypeId"]);
                param[1] = new SqlParameter("@CollegeCode", request["collegeCode"]);
                param[2] = new SqlParameter("@BranchCode", request["branchcode"]);
                param[3] = new SqlParameter("@Semester", request["semester"]);
                param[4] = new SqlParameter("@StudentTypeId", request["StudentTypeId"]);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("USP_SFP_GET_CondonationPinList", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("SP_GET_ApprovalList", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }



        [HttpPost, ActionName("setApprovalSingleList")]
        public HttpResponseMessage setApprovalSingleList([FromBody] JsonObject request)
        {
            try
            {

                var dbHandler = new dbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@Json", request["Json"]);
                param[1] = new SqlParameter("@UserTypeId", request["UserTypeId"]);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("USP_SFP_SET_RecommendApproval", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("SP_GET_ApprovalList", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpPost, ActionName("SetFeedbackData")]
        public HttpResponseMessage SetFeedbackData([FromBody] JsonObject request)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[7];
                param[0] = new SqlParameter("@PIN", request["PIN"]);
                param[1] = new SqlParameter("@CollegeCode", request["CollegeCode"]);
                param[2] = new SqlParameter("@BranchId", request["BranchId"]);
                param[3] = new SqlParameter("@SchemeId", request["SchemeId"]);
                param[4] = new SqlParameter("@SemId", request["SemId"]);
                param[5] = new SqlParameter("@FeedBackId", request["FeedBackId"]);
                param[6] = new SqlParameter("@json", request["json"]);

                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_ACD_SET_STUDENTFEEDBACK", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_ACD_SET_STUDENTFEEDBACK", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }


        [HttpPost, ActionName("GetCondonationApprovalList")]
        public HttpResponseMessage GetCondonationApprovalList([FromBody] JsonObject request)
        {
            try
            {

                var dbHandler = new dbHandler();
                var param = new SqlParameter[4];
                param[0] = new SqlParameter("@StudentTypeId", request["StudentTypeId"]);
                param[1] = new SqlParameter("@collegeCode", request["collegeCode"]);
                param[2] = new SqlParameter("@branchcode", request["branchcode"]);
                param[3] = new SqlParameter("@semester", request["semester"]);

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_GET_CondonationApprovalList", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("SP_GET_ApprovalList", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }





        [HttpGet, ActionName("GetExamsMonthYear")]
        public string GetExamsMonthYear(int StudentTypeId, int SemId, int SchemeId)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@StudentTypeId", StudentTypeId);
                param[1] = new SqlParameter("@SemId", SemId);
                param[2] = new SqlParameter("@SchemeId", SchemeId);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SFP_GET_ExamYearMonthBySemScheme", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_SFP_GET_ExamYearMonthBySemScheme", 0, ex.Message);
                return ex.Message;
            }
        }




        



        [HttpGet, ActionName("GetRegularHallticket")]
        public string GetRegularHallticket(string Pin, string DateOfBirth, string StudentTypeId, string EMYR)
        {
            try
            {
                string pin = GetDecryptedData(Pin);
                string DOB = GetDecryptedData(DateOfBirth);
                string ID = GetDecryptedData(StudentTypeId);
                string emyr = GetDecryptedData(EMYR);
                var dbHandler = new dbHandler();
                var param = new SqlParameter[4];
                param[0] = new SqlParameter("@Pin", pin);
                param[1] = new SqlParameter("@DateOfBirth", DOB);
                param[2] = new SqlParameter("@StudentTypeId", ID);
                param[3] = new SqlParameter("@EMYR", emyr);
                var dt = new DataSet();
                dt = dbHandler.ReturnDataWithStoredProcedure("USP_SFP_GET_HallTicketDetailsByPin", param);//USP_SFP_GET_HallTicketDetailsByPin  USP_SFP_GET_HallTicketDetailsByPin_TEST
                return JsonConvert.SerializeObject(dt);

            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_SFP_GET_HallTicketDetailsByPin", 0, ex.Message);
                return ex.Message;
            }
        }

        [HttpGet, ActionName("GetRegularHallticket1")]
        public string GetRegularHallticket1(string Pin, string DateOfBirth, string StudentTypeId, int EMYR)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[4];
                param[0] = new SqlParameter("@Pin", Pin);
                param[1] = new SqlParameter("@DateOfBirth", DateOfBirth);
                param[2] = new SqlParameter("@StudentTypeId", StudentTypeId);
                param[3] = new SqlParameter("@EMYR", EMYR);
                var dt = new DataSet();
                dt = dbHandler.ReturnDataWithStoredProcedure("USP_SFP_GET_HallTicketDetailsByPin_TEST", param);//USP_SFP_GET_HallTicketDetailsByPin  USP_SFP_GET_HallTicketDetailsByPin_TEST
                return JsonConvert.SerializeObject(dt);

            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_SFP_GET_HallTicketDetailsByPin_TEST", 0, ex.Message);
                return ex.Message;
            }
        }

        [HttpGet, ActionName("GetBacklogHallticket")]
        public string GetBacklogHallticket(string Pin, string DateOfBirth, string StudentTypeId, string Exammonthyearid)
        {
            try
            {
                string pin = GetDecryptedData(Pin);
                string DOB = GetDecryptedData(DateOfBirth);
                string ID = GetDecryptedData(StudentTypeId);
                string emyr = GetDecryptedData(Exammonthyearid);

                var dbHandler = new dbHandler();
                var param = new SqlParameter[4];
                param[0] = new SqlParameter("@Pin", pin);
                param[1] = new SqlParameter("@DateOfBirth", DOB);
                param[2] = new SqlParameter("@StudentTypeId", ID);
                param[3] = new SqlParameter("@Exammonthyearid", emyr);
                var dt = new DataSet();
                dt = dbHandler.ReturnDataWithStoredProcedure("USP_SFP_GET_HallTicketDetailsByPin_bac", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_SFP_GET_HallTicketDetailsByPin_bac", 0, ex.Message);
                return ex.Message;
            }
        }

        [HttpGet, ActionName("GetBacklogHallticket1")]
        public string GetBacklogHallticket1(string Pin, string DateOfBirth, int StudentTypeId, string Exammonthyearid)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[4];
                param[0] = new SqlParameter("@Pin", Pin);
                param[1] = new SqlParameter("@DateOfBirth", DateOfBirth);
                param[2] = new SqlParameter("@StudentTypeId", StudentTypeId);
                param[3] = new SqlParameter("@Exammonthyearid", Exammonthyearid);
                var dt = new DataSet();
                dt = dbHandler.ReturnDataWithStoredProcedure("USP_SFP_GET_HallTicketDetailsByPin_bac_test", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_SFP_GET_HallTicketDetailsByPin_bac_test", 0, ex.Message);
                return ex.Message;
            }
        }

        [HttpPost, ActionName("getBackLogData")]
        public string getBackLogData([FromBody] JsonObject request)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@pin", request["Pin"]);
                param[1] = new SqlParameter("@UserTypeId", request["StudentType"]);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SFP_GET_BackLogStudentDetails", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_SFP_GET_BackLogStudentDetails", 0, ex.Message);
                return ex.Message;
            }
        }

        [HttpPost, ActionName("setBackLogData")]
        public string setBackLogData([FromBody] JsonObject request)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@pin", request["Pin"]);
                param[1] = new SqlParameter("@UserTypeId", request["StudentType"]);
                param[2] = new SqlParameter("@Photo", request["Profilephoto"]);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SFP_SET_BackLogStudentDetails", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_SFP_SET_BackLogStudentDetails", 0, ex.Message);
                return ex.Message;
            }
        }


        [HttpGet, ActionName("Verify_GenuinenessEmailLog")]
        public HttpResponseMessage Verify_GenuinenessEmailLog(string Pin, string Email, string OTP)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@Pin", Pin);
                param[1] = new SqlParameter("@Email", Email);
                param[2] = new SqlParameter("@OTP", OTP);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SFP_CheckGenuineEmailLog", param);

                return Request.CreateResponse(HttpStatusCode.OK, dt);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_SFP_CheckGenuineEmailLog", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.NotFound, ex.Message);
            }
        }

        [HttpGet, ActionName("getAdminExamCentersList")]
        public HttpResponseMessage getAdminExamCentersList(int ExamMonthYearId, int StudentTypeId, int ExamTypeID = 0)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@ExamMonthYearId", ExamMonthYearId);
                param[1] = new SqlParameter("@StudentTypeId", StudentTypeId);
                param[2] = new SqlParameter("@ExamTypeID", ExamTypeID);
                var dt = dbHandler.ReturnDataWithStoredProcedure("ADM_SFP_GET_CollegeExaminationCenterList", param);

                return Request.CreateResponse(HttpStatusCode.OK, dt);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("ADM_SFP_GET_CollegeExaminationCenterList", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.NotFound, ex.Message);
            }
        }

        [HttpGet, ActionName("getExaminationMonthYear")]
        public HttpResponseMessage getExaminationMonthYear()
        {
            try
            {


                var dbHandler = new dbHandler();
                string StrQuery = "";
                StrQuery = "exec USP_SFP_GET_ExamYearMonth";                                                   // USP_SFP_GET_OnlyExamYearMonth";
                return Request.CreateResponse(HttpStatusCode.OK, dbHandler.ReturnDataSet(StrQuery));
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_SFP_GET_OnlyExamYearMonth", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }


        [HttpGet, ActionName("getExamCentersList")]
        public HttpResponseMessage getExamCentersList(int Examyearid, int studentTypeId, int ExamTypeID = 0)
        {
            try
            {
                //var dbHandler = new dbHandler();
                //string StrQuery = "";
                //StrQuery = "exec ADM_SFP_GET_ExaminationCenterList";
                //return Request.CreateResponse(HttpStatusCode.OK, dbHandler.ReturnDataSet(StrQuery));
                var dbHandler = new dbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@Examyearid", Examyearid);
                param[1] = new SqlParameter("@studentTypeId", studentTypeId);
                param[2] = new SqlParameter("@ExamTypeID", ExamTypeID);
                var dt = dbHandler.ReturnDataWithStoredProcedure("ADM_SFP_GET_AffiliatedExaminationCenterListForMapping", param);

                return Request.CreateResponse(HttpStatusCode.OK, dt);

            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("ADM_SFP_GET_ExaminationCenterList", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }


        [HttpGet, ActionName("getExamTypesForExamCenters")]
        public string getExamTypesForExamCenters()
        {
            try
            {
                var dbHandler = new dbHandler();
                string StrQuery = "";
                StrQuery = "exec USP_GET_ExamTypes_ExamCentres";
                var dt = dbHandler.ReturnDataSet(StrQuery);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_GET_ExamTypes_ExamCentres", 0, ex.Message);
                return ex.Message;
            }
        }

        //[HttpGet, ActionName("getAdminExamCentersList")]
        //public string getAdminExamCentersList(int StudentTypeId, int SchemeId, int AcademicYearId, int ExamYearMonth)
        //{
        //    try
        //    {
        //        var dbHandler = new dbHandler();
        //        string StrQuery = "";
        //        StrQuery = "exec ADM_SFP_GET_CollegeExaminationCenterList";
        //        var param = new SqlParameter[4];
        //        param[0] = new SqlParameter("@StudentTypeId", StudentTypeId);
        //        param[1] = new SqlParameter("@SchemeId", SchemeId);
        //        param[2] = new SqlParameter("@AcademicYearId", AcademicYearId);
        //        param[3] = new SqlParameter("@ExamYearMonth", ExamYearMonth);
        //        var dt = dbHandler.ReturnDataWithStoredProcedure("ADM_SFP_GET_CollegeExaminationCenterList", param);
        //        return JsonConvert.SerializeObject(dt);
        //    }
        //    catch (Exception ex)
        //    {
        //        dbHandler.SaveErorr("ADM_SFP_GET_CollegeExaminationCenterList", 0, ex.Message);
        //        return ex.Message;
        //    }
        //}

        //[HttpGet, ActionName("getExamCentersList")]
        //public string getExamCentersList(int StudentTypeId, int SchemeId, int AcademicYearId, int ExamYearMonth)
        //{
        //    try
        //    {
        //        var dbHandler = new dbHandler();
        //        string StrQuery = "";
        //        StrQuery = "exec ADM_SFP_GET_ExaminationCenterList";
        //        var param = new SqlParameter[4];
        //        param[0] = new SqlParameter("@StudentTypeId", StudentTypeId);
        //        param[1] = new SqlParameter("@SchemeId", SchemeId);
        //        param[2] = new SqlParameter("@AcademicYearId", AcademicYearId);
        //        param[3] = new SqlParameter("@ExamYearMonth", ExamYearMonth);
        //        var dt = dbHandler.ReturnDataWithStoredProcedure("ADM_SFP_GET_ExaminationCenterList", param);
        //        return JsonConvert.SerializeObject(dt);
        //    }
        //    catch (Exception ex)
        //    {
        //        dbHandler.SaveErorr("ADM_SFP_GET_ExaminationCenterList", 0, ex.Message);
        //        return ex.Message;

        //    }
        //}

        public class monthYearDetails
        {
            public int SemId { get; set; }
            public int AcademicYearId { get; set; }
            public int SchemeId { get; set; }
            public int StudentTypeId { get; set; }
            public string ExamYearMonth { get; set; }
            public Boolean IsActive { get; set; }

        }

        [HttpPost, ActionName("SetMonthYear")]
        public string SetMonthYear([FromBody] monthYearDetails request)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[5];
                param[0] = new SqlParameter("@SemId", request.SemId);
                param[1] = new SqlParameter("@AcademicYearId", request.AcademicYearId);
                param[2] = new SqlParameter("@SchemeId", request.SchemeId);
                param[3] = new SqlParameter("@StudentTypeId", request.StudentTypeId);
                param[4] = new SqlParameter("@ExamYearMonth", request.ExamYearMonth);

                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SFP_SET_ExamYearMonth", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_SFP_SET_ExamYearMonth", 0, ex.Message);
                return ex.Message;
            }

        }

        //public class monthYearDetails
        //{
        //    public int SemId { get; set; }
        //    public int AcademicYearId { get; set; }
        //    public int SchemeId { get; set; }
        //    public int StudentTypeId { get; set; }
        //    public string ExamYearMonth { get; set; }
        //    public Boolean IsActive { get; set; }

        //}

        //[HttpPost, ActionName("SetMonthYear")]
        //public string SetMonthYear([FromBody]monthYearDetails request)
        //{
        //    try
        //    {
        //        var dbHandler = new dbHandler();
        //        var param = new SqlParameter[5];
        //        param[0] = new SqlParameter("@SemId", request.SemId);
        //        param[1] = new SqlParameter("@AcademicYearId", request.AcademicYearId);
        //        param[2] = new SqlParameter("@SchemeId", request.SchemeId);
        //        param[3] = new SqlParameter("@StudentTypeId", request.StudentTypeId);
        //        param[4] = new SqlParameter("@ExamYearMonth", request.ExamYearMonth);

        //        var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SFP_SET_ExamYearMonth", param);
        //        return JsonConvert.SerializeObject(dt);
        //    }
        //    catch (Exception ex)
        //    {
        //        dbHandler.SaveErorr("USP_SFP_SET_ExamYearMonth", 0, ex.Message);
        //        return ex.Message;
        //    }

        //}
        //[HttpGet, ActionName("GenerateOtpForMobileNoUpdate")]
        //public string GenerateOtpForMobileNoUpdate(string Pin, string Phone)
        //{
        //    string otpMsg = "PIN:{0}, Your application request for {0} Certificate is Approved, click here{0} .Secretary, SBTET TS.";
        //    //   string otpMsg = "OTP for updating mobile no {0}, valid for 10 min. Secretary, SBTET TS.";
        //    DataSet dt = new DataSet();
        //    string Message = string.Empty;
        //    string resp = string.Empty;
        //    try
        //    {
        //        var dbHandler = new dbHandler();
        //        var param = new SqlParameter[2];
        //        param[0] = new SqlParameter("@Pin", Pin);
        //        param[1] = new SqlParameter("@PhoneNumber", Phone);
        //        dt = dbHandler.ReturnDataWithStoredProcedure("usp_SOS_GET_OTP_MobileUpdate", param);

        //        if (dt.Tables[0].Rows[0]["StatusCode"].ToString() != "200")
        //        {
        //            return "{\"status\":\"400\",\"description\" : \"" + dt.Tables[0].Rows[0]["StatusDescription"].ToString() + "\"}";
        //        }
        //        Message = string.Format(otpMsg, dt.Tables[1].Rows[0]["Otp"]);
        //        string url = ConfigurationManager.AppSettings["SMS_API"].ToString();
        //        if (Phone != null || Phone != string.Empty)
        //        {
        //            string urlParameters = "?mobile=" + Phone + "&message=" + Message + "&templateid=1007166738055110295";
        //            HttpClient client = new HttpClient();
        //            client.BaseAddress = new Uri(url);
        //            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
        //            HttpResponseMessage response = client.GetAsync(urlParameters).Result;
        //            resp = "OTP sent to the mobile number :" + Phone.ToString().Substring(0, 2) + "xxxxx" + Phone.ToString().Substring(7);
        //            return "{\"status\":\"200\",\"description\" : \"" + resp + "\"}";

        //        }
        //        else
        //        {
        //            resp = "Mobile number not valid";
        //            return "{\"status\":\"400\",\"description\" : \"" + resp + "\"}";


        //        }

        //    }
        //    catch (Exception ex)
        //    {

        //        dbHandler.SaveErorr("usp_SOS_GET_OTP_MobileUpdate", 0, ex.Message);
        //        return ex.Message;
        //    }
        //}

        [HttpGet, ActionName("GenerateOtpForMobileNoUpdate")]
        public string GenerateOtpForMobileNoUpdate(string Pin, string Phone)
        {
            string otpMsg = "OTP for updating mobile no {0}, valid for 10 min. Secretary, SBTET TS.";
            DataSet dt = new DataSet();
            string Message = string.Empty;
            string resp = string.Empty;
            string MobileOTP = string.Empty;
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@Pin", Pin);
                param[1] = new SqlParameter("@PhoneNumber", Phone);
                dt = dbHandler.ReturnDataWithStoredProcedure("usp_SOS_GET_OTP_MobileUpdate", param);

                if (dt.Tables[0].Rows[0]["StatusCode"].ToString() != "200")
                {
                    return "{\"status\":\"400\",\"description\" : \"" + dt.Tables[0].Rows[0]["StatusDescription"].ToString() + "\"}";
                }
                Message = string.Format(otpMsg, dt.Tables[1].Rows[0]["Otp"]);
                MobileOTP = string.Format((string)dt.Tables[1].Rows[0]["Otp"]);
                string url = ConfigurationManager.AppSettings["SMS_API"].ToString();
                if (Phone != null || Phone != string.Empty)
                {
                    string urlParameters = "?mobile=" + Phone + "&message=" + Message + "&templateid=1007161786863825790";
                    HttpClient client = new HttpClient();
                    client.BaseAddress = new Uri(url);
                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                    HttpResponseMessage response = client.GetAsync(urlParameters).Result;
                    resp = "OTP sent to the mobile number :" + Phone.ToString().Substring(0, 2) + "xxxxx" + Phone.ToString().Substring(7);
                    string parameterToEncrypt = MobileOTP;
                    string encryptedParameter = EncryptionHelper.Encrypt(parameterToEncrypt);
                    return "{\"status\":\"200\",\"description\" : \"" + resp + "\",\"resp1\" : \"" + encryptedParameter + "\"}";

                }
                else
                {
                    resp = "Mobile number not valid";
                    return "{\"status\":\"400\",\"description\" : \"" + resp + "\"}";


                }

            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("usp_SOS_GET_OTP_MobileUpdate", 0, ex.Message);
                return ex.Message;
            }
        }


        [HttpGet, ActionName("GenerateOtpForFacultyMobileNoUpdate")]
        public string GenerateOtpForFacultyMobileNoUpdate(string Pin, string Phone, int StudentType, string ExamDetails)
        {
            string otpMsg = "{0} OTP sent to the mapped faculty mobile number for submitting Marks for the {1}," +
                " Secretary," + " SBTET" + " " + "TS";
            DataSet dt = new DataSet();
            string Message = string.Empty;
            string resp = string.Empty;
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@Pin", Pin);
                param[1] = new SqlParameter("@PhoneNumber", Phone);
                param[2] = new SqlParameter("@StudentType", StudentType);
                dt = dbHandler.ReturnDataWithStoredProcedure("usp_SOS_GET_OTP_FacultyMobileUpdate", param);

                if (dt.Tables[0].Rows[0]["StatusCode"].ToString() != "200")
                {
                    return "{\"status\":\"400\",\"description\" : \"" + dt.Tables[0].Rows[0]["StatusDescription"].ToString() + "\"}";
                }
                Message = string.Format(otpMsg, dt.Tables[1].Rows[0]["Otp"], ExamDetails);
                string url = ConfigurationManager.AppSettings["SMS_API"].ToString();
                if (Phone != null || Phone != string.Empty)
                {
                    string urlParameters = "?mobile=" + Phone + "&message=" + Message + "&templateid=1007170677994132793";
                    HttpClient client = new HttpClient();
                    client.BaseAddress = new Uri(url);
                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                    HttpResponseMessage response = client.GetAsync(urlParameters).Result;
                    resp = "OTP sent to the mobile number :" + Phone.ToString().Substring(0, 2) + "xxxxx" + Phone.ToString().Substring(7);
                    return "{\"status\":\"200\",\"description\" : \"" + resp + "\"}";

                }
                else
                {
                    resp = "Mobile number not valid";
                    return "{\"status\":\"400\",\"description\" : \"" + resp + "\"}";


                }

            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("usp_SOS_GET_OTP_MobileUpdate", 0, ex.Message);
                return ex.Message;
            }
        }



        [HttpGet, ActionName("GetCaptchaString")]
        public string GetCaptchaString(string SessionId)
        {
            var dbHandler = new dbHandler();
            try
            {
                string strCaptchaString = "";
                //int intZero = '0';
                //int intNine = '9';
                int intA = 'A';
                int intZ = 'Z';
                int intCount = 0;
                int intRandomNumber = 0;
                //string strCaptchaString = "";

                Random random = new Random(System.DateTime.Now.Millisecond);

                while (intCount < 5)
                {
                    intRandomNumber = random.Next(intA, intZ);
                    if ((intRandomNumber >= intA) && (intRandomNumber <= intZ))
                    {
                        strCaptchaString = strCaptchaString + (char)intRandomNumber;
                        intCount = intCount + 1;
                    }
                }
                SetSessionId(SessionId, strCaptchaString);
                var skyblue = System.Drawing.ColorTranslator.FromHtml("#1F497D");
                //var white = System.Drawing.ColorTranslator.FromHtml("linear-gradient(90deg, rgba(237,245,255,1) 0%, rgba(204,223,247,1) 100%)");
                string str = ConvertTextToImage(strCaptchaString, "sans-serif", 35, System.Drawing.Color.White, skyblue, 250, 65).ToString();

                List<person> p = new List<person>();
                person p1 = new person();

                p1.Image = str;
                //p1.Text = strCaptchaString;
                p.Add(p1);

                return JsonConvert.SerializeObject(p);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_SET_ReleaseTcPin", 0, ex.Message);
                return ex.Message;
            }
        }

          public string ConvertTextToImage(string txt, string fontname, int fontsize, System.Drawing.Color bgcolor, System.Drawing.Color fcolor, int width, int Height)
        {
            Bitmap bmp = new Bitmap(width, Height);
            using (Graphics graphics = Graphics.FromImage(bmp))
            {

                System.Drawing.Font font = new System.Drawing.Font(fontname, fontsize);
                graphics.FillRectangle(new SolidBrush(bgcolor), 0, 0, bmp.Width, bmp.Height);
                graphics.DrawString(txt, font, new SolidBrush(fcolor), 0, 0);
                graphics.Flush();
                font.Dispose();
                graphics.Dispose();


            }
            Bitmap bImage = bmp;  // Your Bitmap Image
            System.IO.MemoryStream ms = new MemoryStream();
            bImage.Save(ms, ImageFormat.Jpeg);
            byte[] byteImage = ms.ToArray();
            var SigBase64 = Convert.ToBase64String(byteImage);
            return SigBase64;

        }

        [HttpGet, ActionName("SetSessionId")]
        public string SetSessionId(string SessionId, string Captcha)
        {
            var dbHandler = new dbHandler();
            try
            {

                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@SessionId", SessionId);
                param[1] = new SqlParameter("@Captcha", Captcha);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SET_ExamsCaptchaSessionLog", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_SET_ExamsCaptchaSessionLog", 0, ex.Message);
                return ex.Message;
            }
        }
        //[HttpGet, ActionName("GenerateOtpForFacultyMobileNoUpdate")]

        //public string GenerateOtpForFacultyMobileNoUpdate([FromBody] JsonObject request)
        //{

        //    string otpMsg = "{0} OTP sent to the mapped faculty mobile number for submitting Marks for the {1}," +
        //        " Secretary,"+ " SBTET"+ " " + "TS";
        //    string otpMsg1 = "OTP for updating mobile no {0}, valid for 10 min. Secretary, SBTET TS.";

        //    DataSet dt = new DataSet();
        //    string Message = string.Empty;
        //    string resp = string.Empty;
        //    try
        //    {
        //        var dbHandler = new dbHandler();
        //        var param = new SqlParameter[3];
        //        param[0] = new SqlParameter("@Pin", request["Pin"]);
        //        param[1] = new SqlParameter("@PhoneNumber", request["Phone"]);
        //        param[2] = new SqlParameter("@StudentType", request["StudentType"]);
        //        dt = dbHandler.ReturnDataWithStoredProcedure("usp_SOS_GET_OTP_FacultyMobileUpdate", param);

        //        if (dt.Tables[0].Rows[0]["StatusCode"].ToString() != "200")
        //        {
        //            return "{\"status\":\"400\",\"description\" : \"" + dt.Tables[0].Rows[0]["StatusDescription"].ToString() + "\"}";
        //        }
        //        Message = string.Format(otpMsg1, dt.Tables[1].Rows[0]["Otp"], request["ExamDetails"]);
        //        string url = ConfigurationManager.AppSettings["SMS_API"].ToString();
        //        if (request["Phone"] != null || request["Phone"] != string.Empty)
        //        {
        //            string urlParameters = "?mobile=" + request["Phone"] + " & message=" + Message + " & templateid=1007161786863825790";  //1007170677994132793
        //            HttpClient client = new HttpClient();
        //            client.BaseAddress = new Uri(url);
        //            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
        //            HttpResponseMessage response = client.GetAsync(urlParameters).Result;
        //            resp = "OTP sent to the mobile number :" + request["Phone"].ToString().Substring(0, 2) + "xxxxx" + request["Phone"].ToString().Substring(7);
        //            return "{\"status\":\"200\",\"description\" : \"" + resp + "\"}";

        //        }
        //        else
        //        {
        //            resp = "Mobile number not valid";
        //            return "{\"status\":\"400\",\"description\" : \"" + resp + "\"}";


        //        }

        //    }
        //    catch (Exception ex)
        //    {

        //        dbHandler.SaveErorr("usp_SOS_GET_OTP_MobileUpdate", 0, ex.Message);
        //        return ex.Message;
        //    }
        //}
        [HttpGet, ActionName("GetStudentFeePaymentDetails")]
        public string GetStudentFeePaymentDetails(string Pin, string StudentTypeId, int EMYR = 0)
        {
            try
            {
                string pin = GetDecryptedData(Pin);
                string StudentTypeID = GetDecryptedData(StudentTypeId);

                var dbHandler = new dbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@Pin", pin);
                param[1] = new SqlParameter("@StudentTypeId", StudentTypeID);
                param[2] = new SqlParameter("@EMYR", EMYR);
                DataSet dt = new DataSet();
                if (StudentTypeID == "1")
                {
                    dt = dbHandler.ReturnDataWithStoredProcedure("USP_SFP_GET_StudentDetailsByPin", param);
                }
                else if (StudentTypeID == "2")
                {
                    dt = dbHandler.ReturnDataWithStoredProcedure("USP_SFP_GET_StudentDetailsByPin_bac", param);
                }
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_SFP_GET_StudentDetailsByPin", 0, ex.Message);
                return ex.Message;
            }
        }

        [HttpGet, ActionName("getFacultyData")]
        public string getFacultyData(string Pin, int FeedbackId, string Otp)
        {
            try
            {

                var dbHandler = new dbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@FeedbackId", FeedbackId);
                param[1] = new SqlParameter("@Pin", Pin);
                param[2] = new SqlParameter("@Otp", Otp);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_ACD_GET_STUDENTFEEDBACK", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }

        [HttpGet, ActionName("getFeeTypes")]
        public string getFeeTypes(int ExamMonthYearId, int StudentTypeId)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@ExamMonthYearId", ExamMonthYearId);
                param[1] = new SqlParameter("@StudentTypeId", StudentTypeId);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SFP_GET_FeeTypes", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }

        [HttpGet, ActionName("GenerateOtpForFeedback")]
        public string GenerateOtpForFeedback(string Pin, int FeedbackId)
        {
            string otpMsg = "OTP for submitting student feedback {0}. Secretary, SBTET TS.";
            DataSet dt = new DataSet();
            string Message = string.Empty;
            string resp = string.Empty;
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@FeedbackId ", FeedbackId);
                param[1] = new SqlParameter("@Pin", Pin);
                dt = dbHandler.ReturnDataWithStoredProcedure("usp_SBP_ACD_Feedback_GetOtp", param);

                if (dt.Tables[0].Rows[0]["StatusCode"].ToString() != "200")
                {
                    return "{\"status\":\"400\",\"description\" : \"" + dt.Tables[0].Rows[0]["StatusDescription"].ToString() + "\"}";
                }
                Message = string.Format(otpMsg, dt.Tables[1].Rows[0]["Otp"]);
                string url = ConfigurationManager.AppSettings["SMS_API"].ToString();
                if (dt.Tables[1].Rows[0]["Phone"] == DBNull.Value)
                {
                    resp = "Mobile number not found, Please Update the mobile in concerned deparment.";
                    return "{\"status\":\"400\",\"description\" : \"" + resp + "\"}";
                }
                if (dt.Tables[1].Rows[0]["Phone"] != null || dt.Tables[1].Rows[0]["Phone"] != string.Empty || dt.Tables[1].Rows[0]["Phone"] != DBNull.Value)
                {
                    string urlParameters = "?mobile=" + dt.Tables[1].Rows[0]["Phone"] + "&message=" + Message + "&templateid=1007164809127079375"; ;
                    HttpClient client = new HttpClient();
                    client.BaseAddress = new Uri(url);
                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                    HttpResponseMessage response = client.GetAsync(urlParameters).Result;
                    resp = "OTP sent to the mobile number :" + dt.Tables[1].Rows[0]["Phone"].ToString().Substring(0, 2) + "xxxxx" + dt.Tables[1].Rows[0]["Phone"].ToString().Substring(7);
                    return "{\"status\":\"200\",\"description\" : \"" + resp + "\"}";

                }
                else
                {
                    resp = "Mobile number not found, Please Update the mobile in concerned deparment";
                    return "{\"status\":\"400\",\"description\" : \"" + resp + "\"}";


                }

            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("usp_SBP_ACD_Feedback_GetOtp", 0, ex.Message);
                return ex.Message;
            }
        }


        [HttpGet, ActionName("GetStudentFeePaymentDetailsforAdmin")]
        public string GetStudentFeePaymentDetailsforAdmin(string Pin, string StudentTypeId, string UserTypeId)
        {
            try
            {
                string pin = GetDecryptedData(Pin);
                string StudentTypeID = GetDecryptedData(StudentTypeId);
                string UserTypeID = GetDecryptedData(UserTypeId);
                var dbHandler = new dbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@Pin", pin);
                param[1] = new SqlParameter("@StudentTypeId", StudentTypeID);
                param[2] = new SqlParameter("@UserTypeId", UserTypeID);
                DataSet dt = new DataSet();
                if (StudentTypeID == "1")
                {
                    dt = dbHandler.ReturnDataWithStoredProcedure("ADM_SFP_GET_StudentDetailsByPin", param);
                }
                else if (StudentTypeID == "2")
                {
                    dt = dbHandler.ReturnDataWithStoredProcedure("ADM_SFP_GET_StudentDetailsByPin", param);
                }
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("ADM_SFP_GET_StudentDetailsByPin", 0, ex.Message);
                return ex.Message;
            }
        }


        [HttpGet, ActionName("FeeRequestLog")]
        public string FeeRequestLog(string marchantid, string subMarchantid, string addInfo1, string addInfo3, string addInfo4, string addInfo5, string addInfo6, string addInfo7, string challan, string amount, int schemeId = 0, string json = null)
        {
            try
            {

                var dbHandler = new dbHandler();
                var param = new SqlParameter[12];
                param[0] = new SqlParameter("@marchantid", marchantid);
                param[1] = new SqlParameter("@subMarchantid", subMarchantid);
                param[2] = new SqlParameter("@addInfo1", addInfo1);
                param[3] = new SqlParameter("@addInfo3", addInfo3);
                param[4] = new SqlParameter("@addInfo4", addInfo4);
                param[5] = new SqlParameter("@addInfo5", addInfo5);
                param[6] = new SqlParameter("@addInfo6", addInfo6);
                param[7] = new SqlParameter("@addInfo7", addInfo7);
                param[8] = new SqlParameter("@challan", challan);
                param[9] = new SqlParameter("@amount", amount);
                param[10] = new SqlParameter("@schemeId", schemeId);
                param[11] = new SqlParameter("@json", json);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("USP_SFP_SET_RequestLog", param);
                //HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return JsonConvert.SerializeObject(dt); ;
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_SFP_SET_RequestLog", 0, ex.Message);
                return ex.Message;
            }
        }


        [HttpGet, ActionName("ReleaseSixthSem")]
        public string ReleaseSixthSem(int AcademicYearId, string CollegeCode, int BranchId)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@AcademicYearId", AcademicYearId);
                param[1] = new SqlParameter("@CollegeCode", CollegeCode);
                param[2] = new SqlParameter("@BranchId", BranchId);
                DataSet dt = new DataSet();
                dt = dbHandler.ReturnDataWithStoredProcedure("USP_SET_Release6thSemStudied", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_SET_Release6thSemStudied", 0, ex.Message);
                return ex.Message;
            }
        }




        [HttpPost, ActionName("getChanllanForExamFee")]
        public string getChanllanForExamFee(JsonObject JsonObj)
        {
            try
            {
                var dbHandler = new dbHandler();
                string studentTypeId = "";
                var js = JsonConvert.DeserializeObject<ArrayList>(Convert.ToString(JsonObj["json"]));
                var finalJsonArray = new ArrayList();
                var ExamMonthYearId = Convert.ToInt32(JsonObj["ExamMonthYearId"] ?? 0);
                var jsonArray = new JsonArray();
                for (int i = 0; i < js.Count; i++)
                {
                    var jobject = JsonConvert.DeserializeObject<JsonObject>(JsonConvert.SerializeObject(js[i]));
                    jobject["Ipaddress"] = System.Web.HttpContext.Current.Request.UserHostAddress;
                    jsonArray.Add(jobject);
                    studentTypeId = (string)jobject["StudentTypeId"];
                }

                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@Json", JsonConvert.SerializeObject(jsonArray));
                param[1] = new SqlParameter("@ExamMonthYearId", ExamMonthYearId);
                DataSet ds = null;
                if (studentTypeId == "1")
                    ds = dbHandler.ReturnDataWithStoredProcedure("USP_SFP_SET_GenerateChalanaNumber_RequestLog", param);
                else if (studentTypeId == "2")
                    ds = dbHandler.ReturnDataWithStoredProcedure("USP_SFP_SET_GenerateChalanaNumber_RequestLog_Bac", param);
                return JsonConvert.SerializeObject(ds);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_SFP_SET_GenerateChalanaNumber_RequestLog", 0, ex.Message);
                return ex.Message;
            }
        }

        public class CurrentMonthYear
        {
            public int StudentTypeId { get; set; }
            public int ExamYearMonth { get; set; }

        }


        [HttpPost, ActionName("SetCurrentMonthYear")]
        public HttpResponseMessage SetCurrentMonthYear([FromBody] CurrentMonthYear request)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@StudentTypeId ", request.StudentTypeId);
                param[1] = new SqlParameter("@ExamYearMonth ", request.ExamYearMonth);

                //param[5] = new SqlParameter("@IsActive", request.IsActive);


                var dt = dbHandler.ReturnDataWithStoredProcedureTable("USP_SFP_SET_CurrentExamYearMonth", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_SFP_SET_CurrentExamYearMonth", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }

        }



        [HttpPost, ActionName("setStudentFeepayments")]
        public HttpResponseMessage setStudentFeepayments([FromBody] paymentDetails request)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[18];
                param[0] = new SqlParameter("@StudentTypeId", request.StudentType);
                param[1] = new SqlParameter("@Semid", request.Semid);
                param[2] = new SqlParameter("@FromDate", request.FromDate);
                param[3] = new SqlParameter("@ToDate", request.ToDate);
                param[4] = new SqlParameter("@Fee", request.Fee);
                param[5] = new SqlParameter("@FineDate", request.FineDate);
                param[6] = new SqlParameter("@LateFee", request.LateFee);
                param[7] = new SqlParameter("@TatkalDate", request.TatkalDate);
                param[8] = new SqlParameter("@TatkalFee", request.TatkalFee);
                param[9] = new SqlParameter("@PremiumTatkalFee", request.PremiumTatkalFee);
                param[10] = new SqlParameter("@CondonationFee", request.CondonationFee);
                param[11] = new SqlParameter("@PresemptiveAttendedDays", request.PresemptiveAttendedDays);
                param[12] = new SqlParameter("@MaxWorkingDays", request.MaxWorkingDays);
                param[13] = new SqlParameter("@CertificateFee", request.CertificateFee);
                param[14] = new SqlParameter("@SchemeId ", request.SchemeId);
                param[15] = new SqlParameter("@ExamMonthYearId", request.ExamMonthYearId);
                //param[16] = new SqlParameter("@CondonationP", request.CondonationP);
                //param[17] = new SqlParameter("@DetentionP", request.DetentionP);
                param[16] = new SqlParameter("@IsPresemtiveCalculationRequired", request.IsPresemtiveCalculationRequired);
                param[17] = new SqlParameter("@IsTimetableRequired", request.IsTimetableRequired);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("ADM_SFP_SET_StudentFeePaymentDates", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("ADM_SFP_SET_StudentFeePaymentDates", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }

        }


        public class collegeData
        {
            public string Examyear { get; set; }
            public int CollegeId { get; set; }
            public int ExaminationCenterId { get; set; }
            public int ExamTypeID { get; set; }

        }

        public class PinsList
        {
            public string pin { get; set; }
            public int Is6thSemStudied { get; set; }

        }

        [HttpPost, ActionName("SetPinsData")]
        public HttpResponseMessage SetPinsData([FromBody] JsonObject request)
        {
            try
            {
                //var ToUpdateMarksListData = new List<PinsList>();
                //int size = PinDetails.Count;
                //for (int i = 0; i < size; i++)
                //{
                //    ToUpdateMarksListData.Add(PinDetails[i]);
                //}
                //var json = new JavaScriptSerializer().Serialize(ToUpdateMarksListData);
                var dbHandler = new dbHandler();
                var param = new SqlParameter[4];
                param[0] = new SqlParameter("@CollegeCode", request["CollegeCode"].ToString());
                param[1] = new SqlParameter("@BranchId", request["BranchId"].ToString());
                param[2] = new SqlParameter("@AcademicYearId", request["AcademicYearId"].ToString());
                param[3] = new SqlParameter("@Json", request["Json"].ToString());
                var res = dbHandler.ReturnDataWithStoredProcedureTable("USP_SET_StudentsFor6thSemAlreadyStudied", param);
                return Request.CreateResponse(HttpStatusCode.OK, res);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_SET_StudentsFor6thSemAlreadyStudied", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        public class SyllabusData
        {

            public int subjectId { get; set; }
            public int SchemeId { get; set; }
            public int SemId { get; set; }
            public string CollegeCode { get; set; }
            public int BranchId { get; set; }
            public int ChapterCoverd { get; set; }
            public bool IsActive { get; set; }
            public int ShiftId { get; set; }
        }


        [HttpPost, ActionName("SetExaminationCenters")]
        public HttpResponseMessage SetExaminationCenters([FromBody] List<collegeData> collegeDetails)
        {
            try
            {
                var ToUpdateMarksListData = new List<collegeData>();
                int size = collegeDetails.Count;
                for (int i = 0; i < size; i++)
                {
                    ToUpdateMarksListData.Add(collegeDetails[i]);
                }
                var json = new JavaScriptSerializer().Serialize(ToUpdateMarksListData);
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@json", json);
                var res = dbHandler.ReturnDataWithStoredProcedureTable("ADM_SFP_SET_CollegeExaminationCenter", param);
                return Request.CreateResponse(HttpStatusCode.OK, res);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("ADM_SFP_SET_CollegeExaminationCenter", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpPost, ActionName("setSyllabusCoverage")]
        public HttpResponseMessage setSyllabusCoverage([FromBody] List<SyllabusData> SyllabusDetails)
        {
            try
            {
                var ToUpdateMarksListData = new List<SyllabusData>();
                int size = SyllabusDetails.Count;
                for (int i = 0; i < size; i++)
                {
                    ToUpdateMarksListData.Add(SyllabusDetails[i]);
                }
                var json = new JavaScriptSerializer().Serialize(ToUpdateMarksListData);
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@json", json);
                var res = dbHandler.ReturnDataWithStoredProcedureTable("USP_SET_SyllabusCoverag", param);
                return Request.CreateResponse(HttpStatusCode.OK, res);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_SET_SyllabusCoverag", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }


        [HttpGet, ActionName("GetAcdamicyear")]
        public HttpResponseMessage GetAcdamicyear()
        {
            try
            {
                var dbHandler = new dbHandler();
                string StrQuery = "";
                StrQuery = "exec USP_GET_ACADEMICYEARS";
                return Request.CreateResponse(HttpStatusCode.OK, dbHandler.ReturnDataSet(StrQuery));
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_GET_ACADEMICYEARS", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpGet, ActionName("SendSms")]
        public string SendSms(string ChallanNumber)
        {

            try
            {
                string msgAbove75 = "{0} {1} Rs {2} received.Download your HT {3} from sbtet.telangana.gov.in Secretary SBTET, TS";
                string msgbelow75 = "{0} {1} Rs{2} received.Download your HT after Last working day, subject to eligibility as per attendance from sbtet.telangana.gov.in. Secretary, SBTET TS.";
                string msgbelowStanderd = "{0} {1} Rs{2} received. Download your Hallticket from sbtet.telangana.gov.in.Secretary, SBTET TS.";
                string Message = string.Empty;
                var param1 = new SqlParameter[1];
                param1[0] = new SqlParameter("@ChallanNumber", ChallanNumber);
                var db1 = new dbHandler();
                DataTable dt = db1.ReturnDataWithStoredProcedureTable("USP_SFP_GET_StudentPhoneNumbers", param1);
                int percentage = 0;
                int StudentTyepId = 0;
                string StudentContact = "";
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    int.TryParse(dt.Rows[i]["PresumptivePercentage"].ToString(), out percentage);
                    int.TryParse(dt.Rows[i]["StudentTyepId"].ToString(), out StudentTyepId);
                    StudentContact = dt.Rows[i]["StudentContact"].ToString();
                    string urlParameters = "";
                    if (StudentTyepId == 2)
                    {

                        Message = string.Format(msgbelowStanderd, dt.Rows[i]["StudentName"], dt.Rows[i]["Pin"], dt.Rows[i]["AmountPaid"]);
                        urlParameters = "?mobile=" + StudentContact + "&message=" + Message + "&templateid=1007165087135060103";
                    }
                    else if (StudentTyepId == 1)
                    {
                        if (percentage >= 75)
                        {
                            Message = string.Format(msgAbove75, dt.Rows[i]["StudentName"], dt.Rows[i]["Pin"], dt.Rows[i]["AmountPaid"], dt.Rows[i]["MMYY_Exam"]);
                            urlParameters = "?mobile=" + StudentContact + "&message=" + Message + "&templateid=1007165087071082321";
                        }
                        else
                        {
                            Message = string.Format(msgbelow75, dt.Rows[i]["StudentName"], dt.Rows[i]["Pin"], dt.Rows[i]["AmountPaid"], "02-11-2019");
                            urlParameters = "?mobile=" + StudentContact + "&message=" + Message + "&templateid=1007165087123571784";
                        }
                    }
                    //Message = string.Format(msgAbove75, dt.Rows[i]["StudentName"], dt.Rows[i]["Pin"], dt.Rows[i]["AmountPaid"],"02-11-2019");
                    string url = ConfigurationManager.AppSettings["SMS_API"].ToString();
                    //string urlParameters = "?mobile=" + dt.Rows[i]["StudentContact"] + "&message=" + Message;
                    //string urlParameters = "?mobile=9491408259&message=" + Message;
                    HttpClient client = new HttpClient();
                    client.BaseAddress = new Uri(url);
                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                    HttpResponseMessage response = client.GetAsync(urlParameters).Result;
                    // httpResponse.StatusCode.ToString();
                }
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr(" USP_SFP_GET_StudentPhoneNumbers", 0, ex.Message);
                return JsonConvert.SerializeObject(ex.Message);
            }
        }
        [HttpGet, ActionName("getActiveSemester")]
        public HttpResponseMessage getActiveSemester()
        {
            try
            {
                var dbHandler = new dbHandler();
                string StrQuery = "";
                StrQuery = "exec USP_GET_ACTIVE_SEMESTER";
                return Request.CreateResponse(HttpStatusCode.OK, dbHandler.ReturnDataSet(StrQuery));
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr(" USP_GET_ACTIVE_SEMESTER", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpGet, ActionName("getAllSemester")]
        public HttpResponseMessage getAllSemester()
        {
            try
            {
                var dbHandler = new dbHandler();
                string StrQuery = "";
                StrQuery = "exec USP_GET_All_SEMESTER";
                return Request.CreateResponse(HttpStatusCode.OK, dbHandler.ReturnDataSet(StrQuery));
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr(" USP_GET_All_SEMESTER", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpGet, ActionName("getSemestersByScheme")]
        public HttpResponseMessage getSemestersByScheme(int StudentTypeId, int SchemeId)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@StudentTypeId", StudentTypeId);
                param[1] = new SqlParameter("@SchemeId", SchemeId);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SFP_GET_SemestersByScheme ", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr(" USP_SFP_GET_SemestersByScheme", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpGet, ActionName("GetTwoYearsListByScheme")]
        public HttpResponseMessage GetTwoYearsListByScheme(string userType)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@userType", userType);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SFP_GET_2YearCertificateListByScheme", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_SFP_GET_2YearCertificateListByScheme", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }


        [HttpGet, ActionName("GetTwoYearsApproveList")]
        public HttpResponseMessage GetTwoYearsApproveList(string Scheme, int datatype, int userType)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@Scheme", Scheme);
                param[1] = new SqlParameter("@datatype", datatype);
                param[2] = new SqlParameter("@userType", userType);
                var dt = dbHandler.ReturnDataWithStoredProcedure("SPB_GET_2YearCertificateApprovePinList", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_SFP_GET_2YearCertificateListByScheme", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }



        [HttpGet, ActionName("GetSemsBySchemePin")]
        public HttpResponseMessage GetSemsBySchemePin(string pin, string Scheme)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@pin", pin);
                param[1] = new SqlParameter("@Scheme", Scheme);
                var dt = dbHandler.ReturnDataWithStoredProcedure("SPB_GET_SchemesAndSemestersByPin ", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr(" USP_SFP_GET_SemestersByScheme", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }


        [HttpGet, ActionName("GetMonthYearBySemSchemePin")]
        public HttpResponseMessage GetMonthYearBySemSchemePin(string pin, string Scheme, string Semester)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@pin", pin);
                param[1] = new SqlParameter("@Scheme", Scheme);
                param[2] = new SqlParameter("@Semester", Semester);
                var dt = dbHandler.ReturnDataWithStoredProcedure("SPB_GET_SchemesSemesterExamMonthYearByPin ", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr(" SPB_GET_SchemesSemesterExamMonthYearByPin", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpGet, ActionName("GetHolidaysForTimeTable")]
        public HttpResponseMessage GetHolidaysForTimeTable(string startdate, int days)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@StartDate", startdate);
                param[1] = new SqlParameter("@NofDates", days);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_GET_DatesForHolidayMakingForTimeTable", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr(" USP_GET_DatesForHolidayMakingForTimeTable", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.NotFound, ex.Message);
            }
        }

        [HttpGet, ActionName("TimeTableExistingHolidays")]
        public HttpResponseMessage TimeTableExistingHolidays(int AcademicYearId, int SessionId, int ExamMonthYearId, int StudentTypeId, int ExamTypeId)
        {
            try
            {

                var dbHandler = new dbHandler();
                var param = new SqlParameter[5];
                param[0] = new SqlParameter("@AcademicYearId", AcademicYearId);
                param[1] = new SqlParameter("@SessionId", SessionId);
                param[2] = new SqlParameter("@ExamMonthYearId", ExamMonthYearId);
                param[3] = new SqlParameter("@StudentTypeId", StudentTypeId);
                param[4] = new SqlParameter("@ExamTypeId", ExamTypeId);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("USP_GET_TimeTableExistingHolidays", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_GET_TimeTableExistingHolidays", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }


        [HttpPost, ActionName("SetHolidaysForTimeTable")]
        public HttpResponseMessage SetHolidaysForTimeTable([FromBody] JsonObject request)
        {
            try
            {

                var dbHandler = new dbHandler();
                var param = new SqlParameter[6];
                param[0] = new SqlParameter("@Json", request["json"].ToString());
                param[1] = new SqlParameter("@AcademicYearId", request["AcademicYearId"]);
                param[2] = new SqlParameter("@SessionId", request["SessionId"]);
                param[3] = new SqlParameter("@ExamMonthYearId", request["ExamMonthYearId"]);
                param[4] = new SqlParameter("@StudentTypeId", request["StudentTypeId"]);
                param[5] = new SqlParameter("@ExamTypeId", request["ExamTypeId"]);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("USP_SET_TimeTableNewHolidays", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_SET_TimeTableNewHolidays", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }

        [HttpGet, ActionName("getTimeTableData")]
        public HttpResponseMessage getTimeTableData(int StudentTypeId, int SemId, int SchemeId, int ExamTypeId, string StartDate, string Fntime, string Antime)
        {
            try
            {

                var dbHandler = new dbHandler();
                var param = new SqlParameter[7];
                param[0] = new SqlParameter("@StudentTypeId", StudentTypeId);
                param[1] = new SqlParameter("@SemId", SemId);
                param[2] = new SqlParameter("@SchemeId", SchemeId);
                param[3] = new SqlParameter("@ExamTypeId", ExamTypeId);
                param[4] = new SqlParameter("@StartDate", StartDate);
                param[5] = new SqlParameter("@Fntime", Fntime);
                param[6] = new SqlParameter("@Antime", Antime);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SET_TimeTable", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_SET_TimeTable", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }

        }

        [HttpGet, ActionName("GetBranches")]
        public HttpResponseMessage GetBranches()
        {
            try
            {
                var dbHandler = new dbHandler();
                string StrQuery = "";
                StrQuery = "exec USP_GET_ActiveBranches";
                return Request.CreateResponse(HttpStatusCode.OK, dbHandler.ReturnDataSet(StrQuery));
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr(" USP_GET_ActiveBranches", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [HttpGet, ActionName("getNoDataSchemes")]
        public HttpResponseMessage getNoDataSchemes()
        {
            try
            {
                var dbHandler = new dbHandler();
                string StrQuery = "";
                StrQuery = "exec USP_SS_GET_NodataSchemes";
                return Request.CreateResponse(HttpStatusCode.OK, dbHandler.ReturnDataSet(StrQuery));
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_SS_GET_NodataSchemes", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }

        [HttpGet, ActionName("GetModuleColours")]
        public HttpResponseMessage GetModuleColours()
        {
            try
            {
                var dbHandler = new dbHandler();
                string StrQuery = "";
                StrQuery = "exec Adm_GetColours";
                return Request.CreateResponse(HttpStatusCode.OK, dbHandler.ReturnDataSet(StrQuery));
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("Adm_GetColours", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpGet, ActionName("GetWebSiteVisiterCount")]
        public HttpResponseMessage GetWebSiteVisiterCount()
        {
            try
            {
                //string tinyUrl = "https://sbtet.telangana.gov.in/Reports/SignedCert/a8d4b9f7-ce57-4872-9524-45bc14af02d1.pdf";
                //string api = "https://sbtet.telangana.gov.in";

                //    var request = WebRequest.Create(api + tinyUrl);
                //    var res = request.GetResponse();
                //    using (var reader = new StreamReader(res.GetResponseStream()))
                //    {
                //        tinyUrl = reader.ReadToEnd();
                //    }


                //System.Uri address = new System.Uri("http://tinyurl.com/api-create.php?url=" + "https://sbtet.telangana.gov.in/Reports/SignedCert/a8d4b9f7-ce57-4872-9524-45bc14af02d1.pdf");
                //System.Net.WebClient client1 = new System.Net.WebClient();
                //string tinyUrl1 = client1.DownloadString(address);
                var dbHandler = new dbHandler();
                string StrQuery = "";
                StrQuery = "exec USP_GET_WebSiteVisiterCount";
                return Request.CreateResponse(HttpStatusCode.OK, dbHandler.ReturnDataSet(StrQuery));
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_GET_WebSiteVisiterCount", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }


        [HttpGet, ActionName("GetCurrentExamDatesForNr")]
        public string GetCurrentExamDatesForNr(int ExamMonthYearId, int StudentTypeId, int ExamTypeId)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@ExamMonthYearId", ExamMonthYearId);
                param[1] = new SqlParameter("@StudentTypeId", StudentTypeId);
                param[2] = new SqlParameter("@ExamTypeId", ExamTypeId);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SFP_GET_CurrentExamDates ", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_SFP_GET_CurrentExamDates", 0, ex.Message);
                return JsonConvert.SerializeObject(ex.Message);
            }
        }


        [HttpGet, ActionName("GetPrincipalTimetable")]
        public HttpResponseMessage GetPrincipalTimetable(int ExamMonthYearId)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@ExamMonthYearId", ExamMonthYearId);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_GET_TimeTableByExamMonthYr ", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr(" USP_GET_TimeTableByExamMonthYr", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }


        //[HttpGet, ActionName("GetPrincipalTimetable")]
        //public HttpResponseMessage GetPrincipalTimetable(int ExamMonthYearId)
        //{
        //    try
        //    {
        //        var dbHandler = new dbHandler();
        //        var param = new SqlParameter[1];
        //        param[0] = new SqlParameter("@ExamMonthYearId", ExamMonthYearId);
        //        var dt = dbHandler.ReturnDataWithStoredProcedure("USP_GET_TimeTableByExamMonthYr ", param);
        //        HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
        //        return response;
        //    }
        //    catch (Exception ex)
        //    {
        //        dbHandler.SaveErorr(" USP_GET_TimeTableByExamMonthYr", 0, ex.Message);
        //        return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
        //    }
        //}
        //[HttpPost, ActionName("TimeTablePdf")]
        //public string TimeTablePdf([FromBody] JsonObject request)
        //{
        //    try
        //    {


        //        var dbHandler = new dbHandler();
        //        var param = new SqlParameter[1];
        //        param[0] = new SqlParameter("@ExamMonthYearId", request["ExamMonthYearId"]);

        //        DataSet ds = dbHandler.ReturnDataWithStoredProcedure("USP_GET_TimeTableByExamMonthYr", param);
        //        if (ds.Tables[0].Rows.Count > 0)
        //        {
        //            var TimeTableData = DataTableHelper.ConvertDataTable<TimeTableData>(ds?.Tables[0]);
        //            var pdf = GetTimeTablesheetPdf(TimeTableData);
        //            return pdf;
        //        }
        //        else
        //        {
        //            var response = "err";
        //            return response;
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        return ex.Message;
        //    }
        //}

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

        //[HttpGet, ActionName("GetPrincipalTimetableExcel")]
        //public HttpResponseMessage GetPrincipalTimetableExcel(int ExamMonthYearId)
        //{
        //    try
        //    {
        //        var dbHandler = new dbHandler();
        //        var param = new SqlParameter[1];
        //        param[0] = new SqlParameter("@ExamMonthYearId", ExamMonthYearId);                     
        //        DataSet ds = dbHandler.ReturnDataWithStoredProcedure("USP_GET_TimeTableByExamMonthYr", param);
        //        if (ds.Tables[0].Rows.Count > 0)
        //        {
        //            //var Scheme = ds.Tables[0].Rows[0]["Scheme"].ToString();
        //            //var ExamMonthYear = ds.Tables[0].Rows[0]["ExamMonthYear"].ToString();
        //            //var StudentType = ds.Tables[0].Rows[0]["StudentType"].ToString();
        //            string filename1 = "Backlog"+ "-" + "TimeTable" + "_" + Guid.NewGuid() + ".xlsx";

        //            var eh = new ExcelHelper();
        //            var path = ConfigurationManager.AppSettings["DownloadsFolderPath"];
        //            bool folderExists = Directory.Exists(path);
        //            if (!folderExists)
        //                Directory.CreateDirectory(path);
        //            eh.ExportDataSet(ds, path + filename1);
        //            Timer timer = new Timer(200000);
        //            timer.Elapsed += (sender, e) => elapse(sender, e, ConfigurationManager.AppSettings["DownloadsFolderPath"] + filename1);
        //            timer.Start();


        //            return "/Downloads/" + filename1;
        //        }
        //        else
        //        {
        //            var response = "err";
        //            return response;
        //        }

        //    }
        //    catch (Exception ex)
        //    {
        //        dbHandler.SaveErorr(" USP_GET_TimeTableByExamMonthYr", 0, ex.Message);
        //        return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
        //    }
        //}




        [HttpGet, ActionName("GetBacklogStudentDetails")]
        public HttpResponseMessage GetBacklogStudentDetails(string pin, int userTypeId)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@pin", pin);
                param[1] = new SqlParameter("@UserTypeId", userTypeId);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SFP_GET_BackLogStudentDetails ", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr(" USP_SFP_GET_BackLogStudentDetails", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }



        [HttpGet, ActionName("GetSyllabusCoverage")]
        public HttpResponseMessage GetSyllabusCoverage(int SubjectId, string CollegeCode, int ShiftId)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@SubjectId", SubjectId);
                param[1] = new SqlParameter("@CollegeCode", CollegeCode);
                param[2] = new SqlParameter("@ShiftId", ShiftId);

                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_GET_GetSyllabusCoverage ", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr(" USP_GET_GetSyllabusCoverage", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }





        [HttpGet, ActionName("getChallanData")]
        public HttpResponseMessage getChallanData(int StudentTypeId, string pin)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[3];
                string clientIpAddress = System.Web.HttpContext.Current.Request.UserHostAddress;
                param[0] = new SqlParameter("@StudentTypeId", StudentTypeId);
                param[1] = new SqlParameter("@pin", pin);
                param[2] = new SqlParameter("@IpAddress", clientIpAddress);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SFP_GET_PromotionalFeeChallanGeneration", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr(" USP_SFP_GET_PromotionalFeeChallanGeneration", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }


        [HttpGet, ActionName("getExamData")]
        public HttpResponseMessage getExamData(int AcademicYearId, int SemId, int SchemeId, int BrnachId)
        {
            try
            {

                var dbHandler = new dbHandler();
                var param = new SqlParameter[4];
                param[0] = new SqlParameter("@AcademicYearId", AcademicYearId);
                param[1] = new SqlParameter("@SemId", SemId);
                param[2] = new SqlParameter("@SchemeId", SchemeId);
                param[3] = new SqlParameter("@BranchId", BrnachId);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SFP_GET_SubjectExamDates", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_SFP_GET_SubjectExamDates", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }


        [HttpPost, ActionName("setDate")]
        public HttpResponseMessage setDate([FromBody] JsonObject request)
        {
            try
            {

                var dbHandler = new dbHandler();
                var param = new SqlParameter[5];
                param[0] = new SqlParameter("@AcademicYearId", request["AcademicYearId"]);
                param[1] = new SqlParameter("@SemId", request["SemId"]);
                param[2] = new SqlParameter("@SchemeId", request["SchemeId"]);
                param[3] = new SqlParameter("@BranchId", request["BranchId"]);
                param[4] = new SqlParameter("@json", request["json"]);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("USP_SFP_SET_SubjectExamDates", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_SFP_SET_SubjectExamDates", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }


        [HttpPost, ActionName("UpdateMarksMemo")]
        public HttpResponseMessage UpdateMarksMemo([FromBody] JsonObject request)
        {
            try
            {

                var dbHandler = new dbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@pin", request["pin"]);
                param[1] = new SqlParameter("@json", request["json"].ToString());
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("USP_SFP_Update_DMMData", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_SFP_Update_DMMData", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }




        [HttpPost, ActionName("UpdatePaymentMarksMemo")]
        public HttpResponseMessage UpdatePaymentMarksMemo([FromBody] JsonObject request)
        {
            try
            {

                var dbHandler = new dbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@pin", request["pin"]);
                param[1] = new SqlParameter("@json", request["json"].ToString());
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("USP_SFP_Update_DMMDataPayment_1", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_SFP_Update_DMMDataPayment", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }

        [HttpPost, ActionName("UpdateNoDataMarksMemo")]
        public HttpResponseMessage UpdateNoDataMarksMemo([FromBody] JsonObject request)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[8];
                param[0] = new SqlParameter("@pin", request["pin"]);
                param[1] = new SqlParameter("@Name", request["Name"]);
                param[2] = new SqlParameter("@FatherName", request["FatherName"]);
                param[3] = new SqlParameter("@Branch", request["Branch"]);
                param[4] = new SqlParameter("@CollegeCode", request["CollegeCode"]);
                param[5] = new SqlParameter("@Scheme", request["Scheme"]);
                param[6] = new SqlParameter("@Gender", request["Gender"]);
                param[7] = new SqlParameter("@json", request["json"].ToString());
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("USP_SFP_Update_NoDataDMMDataPayment", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_SFP_Update_NoDataDMMDataPayment", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }

        [HttpPost, ActionName("PostFinaldata")]
        public string PostFinaldata([FromBody] JsonObject json)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@json", json["json"].ToString());

                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_ACC_SET_ELECTIVES_BAC", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_ACC_SET_ELECTIVES_BAC", 0, ex.Message);
                return ex.Message;
            }

        }


        [HttpPost, ActionName("uploadJson")]
        public string uploadJson([FromBody] JsonObject json)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@json", json["json"].ToString());

                var dt = dbHandler.ReturnDataWithStoredProcedure("sp_set_Allotment", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("sp_set_Allotment", 0, ex.Message);
                return ex.Message;
            }


        }

        public class NotificationData
        {
            public string json { get; set; }
            public string UserName { get; set; }

        }

        [HttpPost, ActionName("UploadResultFileJson")]
        public string UploadResultFileJson([FromBody] JsonObject json)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[6];
                param[0] = new SqlParameter("@ExamMonthYearId", json["ExamMonthYearId"]);
                param[1] = new SqlParameter("@StudentTypeId", json["StudentTypeId"]);
                param[2] = new SqlParameter("@Scheme", json["Scheme"]);
                param[3] = new SqlParameter("@ExamTypeId", json["ExamTypeId"]);
                param[4] = new SqlParameter("@Json", json["Json"].ToString());
                param[5] = new SqlParameter("@UserName", json["UserName"]);
                var dt = dbHandler.ReturnDataWithStoredProcedure("ADM_SET_1_1_OsdesMarksForResultsAutomation", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("ADM_SET_1_OsdesMarksForResultsAutomation", 0, ex.Message);
                return ex.Message;
            }

        }

        [HttpPost, ActionName("UploadRVRCFileJson")]
        public string UploadRVRCFileJson([FromBody] JsonObject json)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[5];
                param[0] = new SqlParameter("@ExamMonthYearId", json["ExamMonthYearId"]);
                param[1] = new SqlParameter("@StudentTypeId", json["StudentTypeId"]);
                param[2] = new SqlParameter("@Scheme", json["Scheme"]);
                param[3] = new SqlParameter("@UserName", json["UserName"]);
                param[4] = new SqlParameter("@Json", json["Json"].ToString());

                var dt = dbHandler.ReturnDataWithStoredProcedure("ADM_SET_7_1_RVRCResultsUpdationsFromExcel", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("ADM_SET_7_1_RVRCResultsUpdationsFromExcel", 0, ex.Message);
                return ex.Message;
            }

        }


        [HttpPost, ActionName("UploadWantingsJson")]
        public string UploadWantingsJson([FromBody] JsonObject json)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[7];
                param[0] = new SqlParameter("@ExamMonthYearId", json["ExamMonthYearId"]);
                param[1] = new SqlParameter("@StudentTypeId", json["StudentTypeId"]);
                param[2] = new SqlParameter("@Scheme", json["Scheme"]);
                param[3] = new SqlParameter("@ExamTypeId", json["ExamTypeId"]);
                param[4] = new SqlParameter("@DataTypeId", json["DataTypeId"]);
                param[5] = new SqlParameter("@UserName", json["UserName"]);
                param[6] = new SqlParameter("@Json", json["Json"].ToString());
                var dt = dbHandler.ReturnDataWithStoredProcedure("ADM_SET_3_2_ResultsAutomationWantingsUpdations", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("ADM_SET_3_2_ResultsAutomationWantingsUpdations", 0, ex.Message);
                return ex.Message;
            }

        }

        [HttpPost, ActionName("UploadResultJson")]
        public string UploadResultJson([FromBody] JsonObject json)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@json", json["json"].ToString());

                var dt = dbHandler.ReturnDataWithStoredProcedure("sbp_adm_InsertResult_1", param);

                //if (dt.Tables[0].Rows[0]["ResponceCode"].ToString() == "400")
                //{
                //    DataSet excelds = new DataSet();
                //    excelds.Tables.Add(dt.Tables[1].Copy());
                //    var filename = "Wantings" + "_" + Guid.NewGuid() + ".xlsx";
                //    var eh = new ExcelHelper();
                //    var path = ConfigurationManager.AppSettings["DownloadsFolderPath"];
                //    bool folderExists = Directory.Exists(path);
                //    if (!folderExists)
                //        Directory.CreateDirectory(path);
                //    eh.ExportDataSet(excelds, path + filename);
                //    Timer timer = new Timer(200000);
                //    timer.Elapsed += (sender, e) => elapse(sender, e, ConfigurationManager.AppSettings["DownloadsFolderPath"] + filename);
                //    timer.Start();

                //    return "{\"ResponceCode\":\"400\",\"ResponceDescription\" : \"" + "/Downloads/" + filename + "\"}";
                //}

                //else if (dt.Tables[0].Rows[0]["ResponceCode"].ToString() == "409")
                //{
                //    DataSet excelds1 = new DataSet();
                //    excelds1.Tables.Add(dt.Tables[1].Copy());

                //    var filename1 = "Duplicate_Data_Inserted" + "_" + Guid.NewGuid() + ".xlsx";
                //    var eh1 = new ExcelHelper();
                //    var path1 = ConfigurationManager.AppSettings["DownloadsFolderPath"];
                //    bool folderExists1 = Directory.Exists(path1);
                //    if (!folderExists1)

                //        Directory.CreateDirectory(path1);
                //    eh1.ExportDataSet(excelds1, path1 + filename1);
                //    Timer timer1 = new Timer(200000);
                //    timer1.Elapsed += (sender, e) => elapse(sender, e, ConfigurationManager.AppSettings["DownloadsFolderPath"] + filename1);
                //    timer1.Start();

                //    DataSet excelds = new DataSet();
                //    excelds.Tables.Add(dt.Tables[2].Copy());
                //    var filename = "Wantings" + "_" + Guid.NewGuid() + ".xlsx";
                //    var eh = new ExcelHelper();
                //    var path = ConfigurationManager.AppSettings["DownloadsFolderPath"];
                //    bool folderExists = Directory.Exists(path);
                //    if (!folderExists)
                //        Directory.CreateDirectory(path);
                //    eh.ExportDataSet(excelds, path + filename);
                //    Timer timer = new Timer(200000);
                //    timer.Elapsed += (sender, e) => elapse(sender, e, ConfigurationManager.AppSettings["DownloadsFolderPath"] + filename);
                //    timer.Start();



                //    return "{\"ResponceCode\":\"400\",\"ResponceDescription\" : \"" + "/Downloads/" + filename + "\"}";
                //}else
                //{
                return JsonConvert.SerializeObject(dt);
                //}


                //return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("sbp_adm_InsertResult_1", 0, ex.Message);
                return ex.Message;
            }

        }

        [HttpPost, ActionName("DeployNicData")]
        public string DeployNicData([FromBody] JsonObject json)
        {
            List<person> p = new List<person>();
            person p1 = new person();



            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@AcademicYearId", json["AcademicYearId"].ToString());
                param[1] = new SqlParameter("@AdmissionType", json["AdmissionType"].ToString());

                var dt = dbHandler.ReturnDataWithStoredProcedure("ADM_SET_WebServicePolycetStudentsDataInMasterTables", param);

                if (dt.Tables[0].Rows[0]["ResponceCode"].ToString() == "400")
                {
                    DataSet excelds = new DataSet();
                    excelds.Tables.Add(dt.Tables[1].Copy());
                    var filename = "DuplicatePolycetData" + "_" + Guid.NewGuid() + ".xlsx";
                    var eh = new ExcelHelper();
                    var path = ConfigurationManager.AppSettings["DownloadsFolderPath"];
                    bool folderExists = Directory.Exists(path);
                    if (!folderExists)
                        Directory.CreateDirectory(path);
                    eh.ExportDataSet(excelds, path + filename);
                    Timer timer = new Timer(200000);
                    timer.Elapsed += (sender, e) => elapse(sender, e, ConfigurationManager.AppSettings["DownloadsFolderPath"] + filename);
                    timer.Start();
                    var file = "/Downloads/" + filename;
                    //return "{\"ResponceCode\":\"400\",\"ResponceDescription\" : \"" + "/Downloads/" + filename + "\"}";
                    p1.file = file;
                    p1.ResponceCode = dt.Tables[0].Rows[0]["ResponceCode"].ToString();
                    p1.ResponceDescription = dt.Tables[0].Rows[0]["ResponceDescription"].ToString();
                    p.Add(p1);

                    return JsonConvert.SerializeObject(p);
                }
                else
                {
                    p1.file = "";
                    p1.ResponceCode = dt.Tables[0].Rows[0]["ResponceCode"].ToString();
                    p1.ResponceDescription = dt.Tables[0].Rows[0]["ResponceDescription"].ToString();
                    p.Add(p1);

                    return JsonConvert.SerializeObject(p);
                }


                //return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("ADM_SET_UploadPolycetStudentsDataInMasterTables", 0, ex.Message);
                p1.file = "";
                p1.ResponceCode = "400";
                p1.ResponceDescription = ex.Message;
                p.Add(p1);
                return JsonConvert.SerializeObject(p);
            }

        }

        [HttpPost, ActionName("uploadJsonExcel")]
        public string uploadJsonExcel([FromBody] JsonObject json)
        {
            List<person> p = new List<person>();
            person p1 = new person();



            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@AcademicYearId", json["AcademicYearId"].ToString());
                param[1] = new SqlParameter("@AdmissionType", json["AdmissionType"].ToString());
                param[2] = new SqlParameter("@json", json["json"].ToString());

                var dt = dbHandler.ReturnDataWithStoredProcedure("ADM_SET_UploadPolycetStudentsDataInMasterTables", param);

                if (dt.Tables[0].Rows[0]["ResponceCode"].ToString() == "400")
                {
                    DataSet excelds = new DataSet();
                    excelds.Tables.Add(dt.Tables[1].Copy());
                    var filename = "DuplicatePolycetData" + "_" + Guid.NewGuid() + ".xlsx";
                    var eh = new ExcelHelper();
                    var path = ConfigurationManager.AppSettings["DownloadsFolderPath"];
                    bool folderExists = Directory.Exists(path);
                    if (!folderExists)
                        Directory.CreateDirectory(path);
                    eh.ExportDataSet(excelds, path + filename);
                    Timer timer = new Timer(200000);
                    timer.Elapsed += (sender, e) => elapse(sender, e, ConfigurationManager.AppSettings["DownloadsFolderPath"] + filename);
                    timer.Start();
                    var file = "/Downloads/" + filename;
                    //return "{\"ResponceCode\":\"400\",\"ResponceDescription\" : \"" + "/Downloads/" + filename + "\"}";
                    p1.file = file;
                    p1.ResponceCode = dt.Tables[0].Rows[0]["ResponceCode"].ToString();
                    p1.ResponceDescription = dt.Tables[0].Rows[0]["ResponceDescription"].ToString();
                    p.Add(p1);

                    return JsonConvert.SerializeObject(p);
                }
                else
                {
                    p1.file = "";
                    p1.ResponceCode = dt.Tables[0].Rows[0]["ResponceCode"].ToString();
                    p1.ResponceDescription = dt.Tables[0].Rows[0]["ResponceDescription"].ToString();
                    p.Add(p1);

                    return JsonConvert.SerializeObject(p);
                }


                //return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("ADM_SET_UploadPolycetStudentsDataInMasterTables", 0, ex.Message);
                p1.file = "";
                p1.ResponceCode = "400";
                p1.ResponceDescription = ex.Message;
                p.Add(p1);
                return JsonConvert.SerializeObject(p);
            }

        }

        [HttpPost, ActionName("UploadPolycetData")]
        public string UploadPolycetData([FromBody] JsonObject Data)
        {
            List<person> p = new List<person>();
            person p1 = new person();



            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[2];
                //param[0] = new SqlParameter("@AcademicYearId", json["AcademicYearId"].ToString());
                param[0] = new SqlParameter("@PolycetYear", Data["PolycetYear"].ToString());
                param[1] = new SqlParameter("@Data", Data["Data"].ToString());

                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SET_ExamCenterStudentDataForExamLocator", param);

                if (dt.Tables[0].Rows[0]["ResponceCode"].ToString() == "400")
                {
                    DataSet excelds = new DataSet();
                    excelds.Tables.Add(dt.Tables[1].Copy());
                    var filename = "DuplicatePolycetData" + "_" + Guid.NewGuid() + ".xlsx";
                    var eh = new ExcelHelper();
                    var path = ConfigurationManager.AppSettings["DownloadsFolderPath"];
                    bool folderExists = Directory.Exists(path);
                    if (!folderExists)
                        Directory.CreateDirectory(path);
                    eh.ExportDataSet(excelds, path + filename);
                    Timer timer = new Timer(200000);
                    timer.Elapsed += (sender, e) => elapse(sender, e, ConfigurationManager.AppSettings["DownloadsFolderPath"] + filename);
                    timer.Start();
                    var file = "/Downloads/" + filename;
                    //return "{\"ResponceCode\":\"400\",\"ResponceDescription\" : \"" + "/Downloads/" + filename + "\"}";
                    p1.file = file;
                    p1.ResponceCode = dt.Tables[0].Rows[0]["ResponceCode"].ToString();
                    p1.ResponceDescription = dt.Tables[0].Rows[0]["ResponceDescription"].ToString();
                    p.Add(p1);

                    return JsonConvert.SerializeObject(p);
                }
                else
                {
                    p1.file = "";
                    p1.ResponceCode = dt.Tables[0].Rows[0]["ResponceCode"].ToString();
                    p1.ResponceDescription = dt.Tables[0].Rows[0]["ResponceDescription"].ToString();
                    p.Add(p1);

                    return JsonConvert.SerializeObject(p);
                }


                //return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_SET_ExamCenterStudentDataForExamLocator", 0, ex.Message);
                p1.file = "";
                p1.ResponceCode = "400";
                p1.ResponceDescription = ex.Message;
                p.Add(p1);
                return JsonConvert.SerializeObject(p);
            }

        }


        public string btnGenerate_Click(string BarcodeUID)
        {
            //Barcode39 barcodeImg = new Barcode39();
            //barcodeImg.Code = BarcodeUID;
            //barcodeImg.CreateDrawingImage(System.Drawing.Color.Black, System.Drawing.Color.White);
            System.Drawing.Bitmap bm = null;
            if (BarcodeUID.Length > 0)
            {
                var code128 = new itextalias.iTextSharp.text.pdf.Barcode128();
                code128.CodeType = itextalias.iTextSharp.text.pdf.Barcode.CODE128;
                code128.ChecksumText = true;
                code128.GenerateChecksum = true;
                code128.StartStopText = true;
                code128.Code = BarcodeUID;
                bm = new System.Drawing.Bitmap(code128.CreateDrawingImage(System.Drawing.Color.Black, System.Drawing.Color.White));
                //MemoryStream oMStream = new MemoryStream();
                //bm.Save(oMStream, System.Drawing.Imaging.ImageFormat.Png);
                //System.IO.StreamReader oSReader = new System.IO.StreamReader(oMStream, Encoding.ASCII);
                //Convert.ToBase64String(bm);
                //string base64String = Convert.ToBase64String(bm.GetBuffer());
                //bm.Save(context.Response.OutputStream, System.Drawing.Imaging.ImageFormat.Gif);
            }
            System.IO.MemoryStream ms = new MemoryStream();
            bm.Save(ms, System.Drawing.Imaging.ImageFormat.Jpeg);
            byte[] byteImage = ms.ToArray();
            string SigBase64 = Convert.ToBase64String(byteImage);

            return SigBase64;
        }



        [HttpGet, ActionName("getDetailsByPin")]
        public HttpResponseMessage getDetailsByPin(int Pin)
        {
            try
            {

                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@Pin", Pin);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_GET_STUDENT_BY_PIN_dup ", param);
                Debug.WriteLine(dt);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr(" USP_GET_STUDENT_BY_PIN_dup ", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }


        [HttpGet, ActionName("GetTransaction")]
        public HttpResponseMessage GetTransaction(int StudentType, string fromDate, string toDate)
        {
            try
            {

                var dbHandler = new dbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@StudentType", StudentType);
                param[1] = new SqlParameter("@fromDate", fromDate);
                param[2] = new SqlParameter("@toDate", toDate);


                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SBT_GET_SBT_PRE_TRANSCTION ", param);
                Debug.WriteLine(dt);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr(" USP_SBT_GET_SBT_PRE_TRANSCTION ", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [HttpGet, ActionName("SendOtpForCertificates")]
        public string SendOtpForCertificates(string Pin)
        {
            string otpMsg = "OTP for Cerificates is {0}. Secretary, SBTET TS.";
            DataSet dt = new DataSet();
            string Message = string.Empty;
            string resp = string.Empty;
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];

                param[0] = new SqlParameter("@PinNumber", Pin);
                dt = dbHandler.ReturnDataWithStoredProcedure("USP_SET_OTP_CERTIFICATE", param);

                if (dt.Tables[0].Rows[0]["StatusCode"].ToString() != "200")
                {
                    return "{\"status\":\"400\",\"description\" : \"" + dt.Tables[0].Rows[0]["StatusDescription"].ToString() + "\"}";
                }
                Message = string.Format(otpMsg, dt.Tables[1].Rows[0]["Otp"]);
                string url = ConfigurationManager.AppSettings["SMS_API"].ToString();
                if (dt.Tables[1].Rows[0]["Phone"] != null || dt.Tables[1].Rows[0]["Phone"] != string.Empty)
                {
                    string urlParameters = "?mobile=" + dt.Tables[1].Rows[0]["Phone"] + "&message=" + Message;
                    HttpClient client = new HttpClient();
                    client.BaseAddress = new Uri(url);
                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                    HttpResponseMessage response = client.GetAsync(urlParameters).Result;
                    resp = "Otp sent to the mobile number :" + dt.Tables[1].Rows[0]["Phone"].ToString().Substring(0, 2) + "xxxxx" + dt.Tables[1].Rows[0]["Phone"].ToString().Substring(7);
                    return "{\"status\":\"200\",\"description\" : \"" + resp + "\"}";

                }
                else
                {
                    resp = "Mobile number not found, Please Update the mobile in concerned deparment";
                    return "{\"status\":\"400\",\"description\" : \"" + resp + "\"}";


                }

            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_SET_OTP_CERTIFICATE", 0, ex.Message);
                return ex.Message;
            }
        }

        [HttpGet, ActionName("GetAvailableFeedbacks")]
        public string GetAvailableFeedbacks()
        {
            try
            {
                var dbHandler = new dbHandler();
                string StrQuery = "";
                StrQuery = "exec usp_ACD_GetAvailableFeedbacks";
                var dt = dbHandler.ReturnDataSet(StrQuery);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("usp_ACD_GetAvailableFeedbacks", 0, ex.Message);
                return ex.Message;
            }
        }


        [HttpGet, ActionName("GetCollegeWiseExpenditure")]
        public string GetCollegeWiseExpenditure()
        {
            try
            {
                var dbHandler = new dbHandler();
                string StrQuery = "";
                StrQuery = "exec USP_Get_CollegeWiseExpenditure";
                var dt = dbHandler.ReturnDataSet(StrQuery);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_Get_CollegeWiseExpenditure", 0, ex.Message);
                return ex.Message;
            }
        }

        [HttpGet, ActionName("GetDescriptionData")]
        public string GetDescriptionData(int FeedbackId)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@FeedbackId", FeedbackId);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("usp_ACD_GET_Description", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("usp_ACD_GET_Description", 0, ex.Message);
                return ex.Message;
            }
        }


        [HttpGet, ActionName("GetExpenditureById")]
        public string GetExpenditureById(int Id)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@Id", Id);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("USP_Get_CollegeWiseExpenditureById", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_Get_CollegeWiseExpenditureById", 0, ex.Message);
                return ex.Message;
            }
        }


        [HttpGet, ActionName("DleteExpenditure")]
        public string DleteExpenditure(int Id)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@Id", Id);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("USP_Delete_CollegeWiseExpenditureById", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_Delete_CollegeWiseExpenditureById", 0, ex.Message);
                return ex.Message;
            }
        }

        [HttpGet, ActionName("GetTimeTableMonthYearExamTypesSessions")]
        public string GetTimeTableMonthYearExamTypesSessions(int SessionId, int AcademicYearId)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@SessionId", SessionId);
                param[1] = new SqlParameter("@AcademicYearId", AcademicYearId);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("USP_GET_TimeTableMonthYearExamTypesSessions", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_SET_CreateOrUpdateExamMonthYear", 0, ex.Message);
                return ex.Message;
            }

        }
        [HttpPost, ActionName("SetTimeTableMonthYearExamTypesSessions")]
        public string SetTimeTableMonthYearExamTypesSessions([FromBody] JsonObject data)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@DataTypeId", data["DataTypeId"]);
                param[1] = new SqlParameter("@Json", data["Json"].ToString());
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("USP_SET_TimeTableMonthYearExamTypesSessions", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_SET_TimeTableMonthYearExamTypesSessions", 0, ex.Message);
                return ex.Message;
            }

        }

        [HttpGet, ActionName("GetExamMonthYearsByAcademicYearId")]
        public string GetExamMonthYearsByAcademicYearId(int AcademicYearId)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@AcademicYearId", AcademicYearId);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("USP_GET_ResultStatisticsMonthYear", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_GET_ResultStatisticsMonthYear", 0, ex.Message);
                return ex.Message;
            }

        }

        [HttpGet, ActionName("GetTimeTableMonthYearExamTypes")]
        public string GetTimeTableMonthYearExamTypes(int SessionId, int AcademicYearId)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@AcademicYearId", AcademicYearId);
                param[1] = new SqlParameter("@SessionId", SessionId);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("USP_GET_TimeTableMonthYearExamTypes", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_GET_TimeTableMonthYearExamTypes", 0, ex.Message);
                return ex.Message;
            }

        }
        [HttpPost, ActionName("SetTimeTableMonthYearExamTypes")]
        public string SetTimeTableMonthYearExamTypes([FromBody] JsonObject data)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@DataTypeId", data["DataTypeId"]);
                param[1] = new SqlParameter("@Json", data["Json"].ToString());
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("USP_SET_TimeTableMonthYearExamTypes", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_SET_TimeTableMonthYearExamTypes", 0, ex.Message);
                return ex.Message;
            }

        }

        [HttpGet, ActionName("GetTimeTableSessionSchemeSemesters")]
        public string GetTimeTableSessionSchemeSemesters(int SessionId, int AcademicYearId)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@AcademicYearId", AcademicYearId);
                param[1] = new SqlParameter("@SessionId", SessionId);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("USP_GET_AcademicSessionSchemeSemesters", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_GET_AcademicSessionSchemeSemesters", 0, ex.Message);
                return ex.Message;
            }

        }

        [HttpGet, ActionName("UpdateSmsStatus")]
        public string UpdateSmsStatus(int CertificateTypeId, string Pin, int Id = 0)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@CertificateTypeId", CertificateTypeId);
                param[1] = new SqlParameter("@Pin", Pin);
                param[2] = new SqlParameter("@Id", Id);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("USP_SET_UpdateSmsStatus", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_SET_UpdateSmsStatus", 0, ex.Message);
                return ex.Message;
            }
        }

        [HttpPost, ActionName("SetTimeTableSessionSchemeSemesters")]
        public string SetTimeTableSessionSchemeSemesters([FromBody] JsonObject data)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@DataTypeId", data["DataTypeId"]);
                param[1] = new SqlParameter("@Json", data["Json"].ToString());
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("USP_SET_AcademicSessionSchemeSemesters", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_SET_AcademicSessionSchemeSemesters", 0, ex.Message);
                return ex.Message;
            }

        }

        [HttpPost, ActionName("SetTimeTableUpdateData")]
        public string SetTimeTableUpdateData([FromBody] JsonObject data)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@DataTypeId", data["DataTypeId"]);
                param[1] = new SqlParameter("@JSON", data["Json"].ToString());
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("USP_SET_UpdateOrInsertTimeTable", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_SET_UpdateOrInsertTimeTable", 0, ex.Message);
                return ex.Message;
            }

        }


        [HttpPost, ActionName("UpdateExpenditureData")]
        public string UpdateExpenditureData([FromBody] JsonObject data)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[3];

                param[0] = new SqlParameter("@ExpenditureAmount", data["ExpenditureAmount"]);
                param[1] = new SqlParameter("@Description", data["Description"]);
                param[2] = new SqlParameter("@Id", data["Id"]);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_UPDATE_CollegeWiseExpenditure", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_UPDATE_CollegeWiseExpenditure", 0, ex.Message);
                return ex.Message;
            }

        }

        [HttpPost, ActionName("AddExpenditureData")]
        public string AddExpenditureData([FromBody] JsonObject data)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[7];
                param[0] = new SqlParameter("@CollegeCode", data["CollegeCode"]);
                param[1] = new SqlParameter("@StudentType", data["StudentType"]);
                param[2] = new SqlParameter("@ExamMonthYear", data["ExamMonthYear"]);
                param[3] = new SqlParameter("@ExamDate", data["ExamDate"]);
                param[4] = new SqlParameter("@ExpenditureAmount", data["ExpenditureAmount"]);
                param[5] = new SqlParameter("@Description", data["Description"]);
                param[6] = new SqlParameter("@DataTypeId", data["DataTypeId"]);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SET_CollegeWiseExpenditure", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_SET_CollegeWiseExpenditure", 0, ex.Message);
                return ex.Message;
            }

        }


        [HttpGet, ActionName("GetTimeTableUpdateData")]
        public string GetTimeTableUpdateData(int AcademicYearId, int ExamMonthYearId, int StudentTypeId, int ExamTypeId, int Schemeid, int branchid, int semid)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[7];
                param[0] = new SqlParameter("@AcademicYearId", AcademicYearId);
                param[1] = new SqlParameter("@ExamMonthYearId", ExamMonthYearId);
                param[2] = new SqlParameter("@StudentTypeId", StudentTypeId);
                param[3] = new SqlParameter("@ExamTypeId", ExamTypeId);
                param[4] = new SqlParameter("@Schemeid", Schemeid);
                param[5] = new SqlParameter("@branchid", branchid);
                param[6] = new SqlParameter("@semid", semid);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("USP_GET_TimeTableSchemeBranchSemester", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_GET_TimeTableSchemeBranchSemester", 0, ex.Message);
                return ex.Message;
            }

        }

        [HttpGet, ActionName("GetTimeTableUpdateDataByDate")]
        public string GetTimeTableUpdateDataByDate(int AcademicYearId, int ExamMonthYearId, int StudentTypeId, int ExamTypeId, DateTime ExamDate, string ExamSession, int schemeid)
        {
            try
            {

                var dbHandler = new dbHandler();
                var param = new SqlParameter[7];
                param[0] = new SqlParameter("@ExamMonthYearId", ExamMonthYearId);
                param[1] = new SqlParameter("@AcademicYearId", AcademicYearId);
                param[2] = new SqlParameter("@StudentTypeId", StudentTypeId);
                param[3] = new SqlParameter("@ExamTypeId", ExamTypeId);
                param[4] = new SqlParameter("@ExamDate", ExamDate);
                param[5] = new SqlParameter("@ExamSession", ExamSession);
                param[6] = new SqlParameter("@schemeid", schemeid);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("USP_GET_TimeTableByDateSession", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_GET_TimeTableSchemeBranchSemester", 0, ex.Message);
                return ex.Message;
            }

        }




        [HttpGet, ActionName("GetTimeTableUpdateDataByPcode")]
        public string GetTimeTableUpdateDataByPcode(int ExamMonthYearId, int AcademicYearId, int StudentTypeId, int ExamTypeId, int pcode)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[5];

                param[0] = new SqlParameter("@ExamMonthYearId", ExamMonthYearId);
                param[1] = new SqlParameter("@AcademicYearId", AcademicYearId);
                param[2] = new SqlParameter("@StudentTypeId", StudentTypeId);
                param[3] = new SqlParameter("@ExamTypeId", ExamTypeId);
                param[4] = new SqlParameter("@pcode", pcode);

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("USP_GET_TimeTableByPcode", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_GET_TimeTableByPcode", 0, ex.Message);
                return ex.Message;
            }

        }

        [HttpGet, ActionName("GetExamSessionByExamDate")]
        public HttpResponseMessage GetExamSessionByExamDate(string ExamDate, int StudentTypeId)
        {
            try
            {

                var dbHandler = new dbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@ExamDate", ExamDate);
                param[1] = new SqlParameter("@StudentTypeId", StudentTypeId);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_GET_ExamSessionByExamDate", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_GET_ExamSessionByExamDate", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }


        [HttpGet, ActionName("GetExamMonthYearBySem")]
        public HttpResponseMessage GetExamMonthYearBySem(string Semester, int StudentTypeId)
        {
            try
            {

                var dbHandler = new dbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@Semester", Semester);
                param[1] = new SqlParameter("@StudentTypeId", StudentTypeId);
                var dt = dbHandler.ReturnDataWithStoredProcedure("ADM_SFP_GET_FeeReportsExamMonthYearBySemester", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("ADM_SFP_GET_FeeReportsExamMonthYearBySemester", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }

        [HttpGet, ActionName("GetExamMonthYearBySemId")]
        public HttpResponseMessage GetExamMonthYearBySem(int Semid, int StudentTypeId)
        {
            try
            {

                var dbHandler = new dbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@Semid", Semid);
                param[1] = new SqlParameter("@StudentTypeId", StudentTypeId);
                var dt = dbHandler.ReturnDataWithStoredProcedure("ADM_SFP_GET_ExamMonthYearBySemester", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("ADM_SFP_GET_ExamMonthYearBySemester", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }



        [HttpGet, ActionName("GetTimetableDatesByExamMonthYear")]
        public HttpResponseMessage GetTimetableDatesByExamMonthYear(int StudentTypeId, int ExamMonthYearId)
        {
            try
            {

                var dbHandler = new dbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@StudentTypeId", StudentTypeId);
                param[1] = new SqlParameter("@ExamMonthYearId", ExamMonthYearId);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_GET_TimeTableDates", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_GET_TimeTableDates", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }

        [HttpGet, ActionName("GetExamMonthYearForHallticketandFeepayment")]
        public HttpResponseMessage GetExamMonthYearForHallticketandFeepayment(string DataTypeId, string StudentTypeId)
        {
            try
            {
               string DataTypeID = GetDecryptedData(DataTypeId);
               string ID = GetDecryptedData(StudentTypeId);
                var dbHandler = new dbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@DataTypeId", DataTypeID);
                param[1] = new SqlParameter("@StudentTypeId ", ID);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SFP_GET_ExamMonthYearForHallTicketAndFeePayment", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_SFP_GET_ExamMonthYearForHallTicketAndFeePayment", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }


        [HttpGet, ActionName("GetExamSessionDates")]
        public string GetExamSessionDates(int ExamMonthYearId, int AcademicYearId, int StudentTypeId, int ExamTypeId, int schemeid)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[5];

                param[0] = new SqlParameter("@ExamMonthYearId", ExamMonthYearId);
                param[1] = new SqlParameter("@AcademicYearId", AcademicYearId);
                param[2] = new SqlParameter("@StudentTypeId", StudentTypeId);
                param[3] = new SqlParameter("@ExamTypeId", ExamTypeId);
                param[4] = new SqlParameter("@schemeid", schemeid);

                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_GET_TimeTableExamDateSessionDropDown", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_GET_TimeTableByPcode", 0, ex.Message);
                return ex.Message;
            }

        }



        [HttpGet, ActionName("GetExaminationHallData")]
        public string GetExaminationHallData(string CollegeCode)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@CollegeCode", CollegeCode);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_GET_SeatingPlanCollegeExamRooms", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_GET_SeatingPlanCollegeExamRooms", 0, ex.Message);
                return ex.Message;
            }

        }

        [HttpPost, ActionName("SetExaminationHallData")]
        public string SetExaminationHallData([FromBody] JsonObject data)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@datatypeid", data["datatypeid"]);
                param[1] = new SqlParameter("@CollegeCode", data["CollegeCode"]);
                param[2] = new SqlParameter("@Json", data["Json"].ToString());
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SET_SeatingPlanCollegeExamRooms", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_SET_SeatingPlanCollegeExamRooms", 0, ex.Message);
                return ex.Message;
            }
        }

        [HttpPost, ActionName("SetSeatingExaminationHallData")]
        public string SetSeatingExaminationHallData([FromBody] JsonObject data)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[6];
                param[0] = new SqlParameter("@datatypeid", data["datatypeid"]);
                param[1] = new SqlParameter("@StudentTypeId", data["StudentTypeId"]);
                param[2] = new SqlParameter("@CollegeCode", data["CollegeCode"]);
                param[3] = new SqlParameter("@ExamMonthYearId", data["ExamMonthYearId"]);
                param[4] = new SqlParameter("@ExamTypeId", data["ExamTypeId"]);
                param[5] = new SqlParameter("@Json", data["Json"].ToString());
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SET_SeatingPlanExamRooms", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_SET_SeatingPlanExamRooms", 0, ex.Message);
                return ex.Message;
            }
        }

        [HttpPost, ActionName("GetSeatingPlan")]
        public string GetSeatingPlan([FromBody] JsonObject data)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[6];
                param[0] = new SqlParameter("@StudentTypeId", data["StudentTypeId"]);
                param[1] = new SqlParameter("@CollegeCode", data["CollegeCode"]);
                param[2] = new SqlParameter("@ExamDate", data["ExamDate"]);
                param[3] = new SqlParameter("@timeSlot", data["timeSlot"]);
                param[4] = new SqlParameter("@ExamMonthYearId", data["ExamMonthYearId"]);
                param[5] = new SqlParameter("@ExamTypeId", data["ExamTypeId"]);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_GET_SeatingPlanGeneration", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_GET_SeatingPlanGeneration", 0, ex.Message);
                return ex.Message;
            }
        }

        [HttpGet, ActionName("SeatingPlanPdf")]
        public string SeatingPlanPdf(int StudentTypeId, string CollegeCode, string ExamDate, string timeSlot, int ExamMonthYearId, int ExamTypeId)
        {
            var res = string.Empty;
            var ResponseDescription = string.Empty;
            try
            {

                var dbHandler = new dbHandler();
                var param = new SqlParameter[6];
                param[0] = new SqlParameter("@StudentTypeId", StudentTypeId);
                param[1] = new SqlParameter("@CollegeCode", CollegeCode);
                param[2] = new SqlParameter("@ExamDate", ExamDate);
                param[3] = new SqlParameter("@timeSlot", timeSlot);
                param[4] = new SqlParameter("@ExamMonthYearId", ExamMonthYearId);
                param[5] = new SqlParameter("@ExamTypeId", ExamTypeId);
                DataSet ds = dbHandler.ReturnDataWithStoredProcedure("USP_GET_SeatingPlanGeneration", param);
                ResponseDescription = ds.Tables[0].Rows[0]["ResponceDescription"].ToString();
                SeatingPlan SeatingPlan = new SeatingPlan();
                var SeatingData = DataTableHelper.ConvertDataTable<SeatingPlanData>(ds?.Tables[1]);
                var BranchData = DataTableHelper.ConvertDataTable<BranchData>(ds?.Tables[3]);
                var pdf = SeatingPlan.SeatingPlanPdf(SeatingData, BranchData);
                var excelpath = SeatingPlanAbtract(StudentTypeId, CollegeCode, ExamDate, timeSlot, ExamMonthYearId, ExamTypeId);


                res = JsonConvert.SerializeObject("{\"Status\" : \"200\",\"seatingpdf\" : \"" + pdf + "\",\"excelpath\" : \"" + excelpath + "\",\"ResponseDescription\" : \"" + ResponseDescription + "\" }");
                return res;
            }
            catch (Exception ex)
            {
                res = JsonConvert.SerializeObject("{\"Status\" : \"400\",\"seatingpdf\" : \" \",\"excelpath\" : \"\",\"ResponseDescription\" : \"" + ResponseDescription + "\" }");
                return res;
            }
        }
        [HttpGet]
        public async Task<string> TransferBmaAttendee(String collegecode, String attendeeid, String branch, String remarks)
        {
            var apikey = ConfigurationManager.AppSettings["BMA_API_Key"].ToString();
            var url = ConfigurationManager.AppSettings["BMA_API_Transfer"].ToString();
            BmaTransferReq BmaTransferReq = new BmaTransferReq();
            BmaTransferReq.orgcode = collegecode;
            BmaTransferReq.attendeeid = attendeeid;
            BmaTransferReq.branch = branch;
            BmaTransferReq.semester = "";
            BmaTransferReq.ref1 = "";
            BmaTransferReq.ref2 = "";
            BmaTransferReq.remarks = remarks;
            using (HttpClient client = new HttpClient())
            {
                try
                {
                    client.DefaultRequestHeaders.Add("apikey", apikey);
                    var resMsg = await client.PostAsJsonAsync(url, BmaTransferReq);
                    var content = await resMsg.Content.ReadAsStringAsync();

                    try
                    {
                        var bmaRes = JsonConvert.DeserializeObject<BmaRes>(content);
                        var db2 = new dbHandler();
                        var param2 = new SqlParameter[4];
                        param2[0] = new SqlParameter("@PIN", bmaRes.attendeecode);
                        param2[1] = new SqlParameter("@AttdId", bmaRes.attdid);
                        param2[2] = new SqlParameter("@Status", bmaRes.respcode);
                        param2[3] = new SqlParameter("@Remarks", bmaRes.respdesc);
                        db2.ExecuteNonQueryWithStoredProcedure("usp_TransferAttendeeId", param2);

                    }
                    catch (Exception ex)
                    {
                        dbHandler.SaveErorr("usp_TransferAttendeeId", 0, ex.Message);
                        return ex.Message;
                    }
                    return content;
                }
                catch (HttpRequestException ex)
                {
                    Console.WriteLine(ex.Message);
                    dbHandler.SaveErorr("usp_TransferAttendeeId", 0, ex.Message);
                    return ex.Message;

                }
            }

        }

        [HttpGet, ActionName("SeatingPlanAbtract")]
        public string SeatingPlanAbtract(int StudentTypeId, string CollegeCode, string ExamDate, string timeSlot, int ExamMonthYearId, int ExamTypeId)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[6];
                param[0] = new SqlParameter("@StudentTypeId", StudentTypeId);
                param[1] = new SqlParameter("@CollegeCode", CollegeCode);
                param[2] = new SqlParameter("@ExamDate", ExamDate);
                param[3] = new SqlParameter("@timeSlot", timeSlot);
                param[4] = new SqlParameter("@ExamMonthYearId", ExamMonthYearId);
                param[5] = new SqlParameter("@ExamTypeId", ExamTypeId);
                DataSet ds = dbHandler.ReturnDataWithStoredProcedure("USP_Get_SeatingplanReportCounts", param);
                if (ds.Tables[0].Rows.Count > 0)
                {
                    var filename = "SeatingPlanAbtract" + "_" + Guid.NewGuid() + ".xlsx";
                    var eh = new ExcelHelper();
                    var path = ConfigurationManager.AppSettings["DownloadsFolderPath"];
                    bool folderExists = Directory.Exists(path);
                    if (!folderExists)
                        Directory.CreateDirectory(path);
                    eh.ExportDataSet(ds, path + filename);
                    Timer timer = new Timer(2000000);
                    timer.Elapsed += (sender, e) => elapse(sender, e, ConfigurationManager.AppSettings["DownloadsFolderPath"] + filename);
                    timer.Start();
                    return "/Downloads/" + filename;
                }
                else
                {

                    return "400";
                }

            }
            catch (Exception ex)
            {
                return "FAILED" + ex.Message;
            }
        }

        public class DeactAttendeeId
        {
            public string attendeeid { get; set; }
            public string remarks { get; set; }
        }

        [HttpGet]
        public async Task<string> DeactivateAttendeeId()
        {
            var apikey = ConfigurationManager.AppSettings["BMA_API_Key"].ToString();
            var url = ConfigurationManager.AppSettings["BMA_API_Delete"].ToString();
            var file = ConfigurationManager.AppSettings["BillDeskResFile"].ToString();
            var filepath = @"D:\svn\filelog.txt";
            var dbHandler = new dbHandler();
            DataTable tblSystemUser = new DataTable();
            var StrQuery = "exec AttendeeToDeactivate";
            tblSystemUser = dbHandler.ReturnData(StrQuery);
            List<DeactAttendeeId> attendeelst = tblSystemUser.DataTableToList<DeactAttendeeId>().ToList();

            int size = tblSystemUser.Rows.Count;
            var length = attendeelst.Count;
            for (int i = 0; i < length; i++)
            {
                var Deactivatejsonreq = new DeactAttendeeId();
                Deactivatejsonreq.attendeeid = tblSystemUser.Rows[i]["attendeeid"].ToString();
                Deactivatejsonreq.remarks = tblSystemUser.Rows[i]["remarks"].ToString();
                if (File.Exists(filepath))
                {
                    //writes to file
                    System.IO.File.WriteAllText(filepath, "request Message" + tblSystemUser.Rows[i]["attendeeid"].ToString());
                }
                else
                {
                    // Create the file.
                    using (FileStream fs = File.Create(filepath))
                    {
                        System.IO.File.WriteAllText(filepath, "request Message" + tblSystemUser.Rows[i]["attendeeid"].ToString());
                    }

                }

                //using (StreamWriter writer = new StreamWriter(file, true))
                //{
                //    writer.WriteLine();

                //}
                using (HttpClient client = new HttpClient())
                {
                    try
                    {
                        client.DefaultRequestHeaders.Add("apikey", apikey);
                        var resMsg = await client.PostAsJsonAsync(url, Deactivatejsonreq);
                        var content = await resMsg.Content.ReadAsStringAsync();
                        try
                        {
                            var res = JsonConvert.DeserializeObject(content);
                            System.IO.File.WriteAllText(filepath, "Response Message" + res + "\n");
                        }
                        catch (Exception ex)
                        {
                            System.IO.File.WriteAllText(filepath, "Response Message" + ex.Message + "\n");
                        }
                    }
                    catch (Exception ex)//HttpRequestException e
                    {
                        System.IO.File.WriteAllText(filepath, "Response Message" + ex.Message + "\n");

                    }

                }
            }
            return file;
        }



        [HttpPost, ActionName("GetSeatingData")]
        public string GetSeatingData([FromBody] ReqSeating req)
        {
            try
            {
                if (req.ExamTypeId == 0)
                {
                    req.ExamTypeId = 5;
                }
                var dbHandler = new dbHandler();
                var param = new SqlParameter[7];
                param[0] = new SqlParameter("@StudentTypeId", req.StudentTypeId);
                param[1] = new SqlParameter("@CollegeCode", req.CollegeCode);
                param[2] = new SqlParameter("@ExamDate", req.ExamDate);
                param[3] = new SqlParameter("@SeatingPerBench", req.SeatingPerBench);
                param[4] = new SqlParameter("@TimeSlot", req.TimeSlot);
                param[5] = new SqlParameter("@ExamTypeId", req.ExamTypeId);
                param[6] = new SqlParameter("@ExamMonthYearId", req.ExamMonthYearId);
                var ds = dbHandler.ReturnDataWithStoredProcedure("USP_SFP_GET_Seating_Plan_Data", param);
                var studentCounts = DataTableHelper.ConvertDataTable<SeatingStudents>(ds.Tables[0]);
                var branchCounts = DataTableHelper.ConvertDataTable<SeatingBranchCount>(ds.Tables[1]);
                var pcodeCounts = DataTableHelper.ConvertDataTable<SeatingPCodeCount>(ds.Tables[2]);
                //var examHalls = DataTableHelper.ConvertDataTable<SeatingAvailableExamHall>(ds.Tables[3]);
                var colleges = DataTableHelper.ConvertDataTable<SeatingCollege>(ds.Tables[4]);
                var collegeName = colleges[0]?.college_name;
                var examHalls = JsonConvert.DeserializeObject<List<SeatingAvailableExamHall>>(req.ExamHallString);
                var currentCapacity = 0;
                var noOfStudents = studentCounts.Count;
                for (var i = 0; i < examHalls.Count; i++)
                {
                    examHalls[i].Id = i + 1;
                    currentCapacity += examHalls[i].Rows * examHalls[i].Columns * examHalls[i].SeatingPerBench;
                }
                if (currentCapacity < noOfStudents)
                {
                    return $"ERROR: Unable to accomodate students. Please add more Exam Halls. Total Students: {noOfStudents}, Current Seating Capacity: {currentCapacity}";
                }
                List<SeatStatus[,]> seatStatus = new List<SeatStatus[,]>();
                for (int i = 0; i < examHalls.Count; i++)
                {
                    var tmpMatrix = new SeatStatus[examHalls[i].Columns, examHalls[i].Rows];
                    for (int a = 0; a < examHalls[i].Columns; a++)
                    {
                        for (int b = 0; b < examHalls[i].Rows; b++)
                        {
                            tmpMatrix[a, b] = new SeatStatus
                            {
                                matrix = new ExamMatrix()
                            };
                            tmpMatrix[a, b].matrix.Column = a + 1;
                            tmpMatrix[a, b].matrix.Row = b + 1;
                            tmpMatrix[a, b].matrix.HallId = examHalls[i].Id;
                            tmpMatrix[a, b].matrix.Students = new ExamMatrixStudent[2];
                        }
                    }
                    seatStatus.Add(tmpMatrix);
                }
                for (int k = 0; k < pcodeCounts.Count; k++)
                {
                    var ps = studentCounts.Where(x => x.PCode == pcodeCounts[k].Pcode)
                        .OrderBy(x => x.PCode)
                        .ThenBy(x => x.BranchId)
                        .ThenBy(x => x.Pin).ToList();
                    if (ps.Count == 0)
                    {
                        continue;
                    }
                    for (int m = 0; m < examHalls.Count; m++)
                    {
                        if (ps.Count == 0)
                        {
                            break;
                        }
                        for (int i = 0; i < examHalls[m].Columns; i++)
                        {
                            if (ps.Count == 0)
                            {
                                break;
                            }
                            for (int j = 0; j < examHalls[m].Rows; j++)
                            {
                                if (ps.Count == 0)
                                {
                                    break;
                                }
                                if (seatStatus[m][i, j].IsS1Filled && seatStatus[m][i, j].IsS2Filled)
                                {
                                    continue;
                                }
                                if (!seatStatus[m][i, j].IsS1Filled)
                                {
                                    seatStatus[m][i, j].matrix.Students[0] = new ExamMatrixStudent();
                                    seatStatus[m][i, j].matrix.Students[0].Pcode = ps[0].PCode;
                                    seatStatus[m][i, j].matrix.Students[0].Pin = ps[0].Pin;
                                    seatStatus[m][i, j].matrix.Students[0].BranchId = ps[0].BranchId;
                                    seatStatus[m][i, j].IsS1Filled = true;
                                    seatStatus[m][i, j].S1PCode = ps[0].PCode;
                                    ps.RemoveAt(0);
                                }
                                else if (!seatStatus[m][i, j].IsS2Filled && seatStatus[m][i, j].S1PCode != ps[0].PCode && seatStatus[m][i, j].matrix.Students[0].BranchId != ps[0].BranchId)
                                {
                                    seatStatus[m][i, j].matrix.Students[1] = new ExamMatrixStudent();
                                    seatStatus[m][i, j].matrix.Students[1].Pcode = ps[0].PCode;
                                    seatStatus[m][i, j].matrix.Students[1].Pin = ps[0].Pin;
                                    seatStatus[m][i, j].matrix.Students[1].BranchId = ps[0].BranchId;
                                    seatStatus[m][i, j].IsS2Filled = true;
                                    seatStatus[m][i, j].S2PCode = ps[0].PCode;
                                    ps.RemoveAt(0);
                                }
                            }
                        }
                    }
                }
                var examMatrix = new List<ExamMatrix>();
                foreach (var status in seatStatus)
                {
                    for (var i = 0; i < status.GetLength(0); i++)
                    {
                        for (var j = 0; j < status.GetLength(1); j++)
                        {
                            if (status[i, j].IsS1Filled || status[i, j].IsS2Filled)
                                examMatrix.Add(status[i, j].matrix);
                        }
                    }
                }
                var spGenerator = new SeatingPlanGenerator();
                var saPath = spGenerator.GenerateExamHallPdfs(examMatrix, examHalls, req.CollegeCode, collegeName, req.ExamDate, req.TimeSlot);
                return saPath;
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_SFP_GET_Seating_Plan_Data", 0, ex.Message);
                return "ERROR: " + ex.Message;
            }

        }

        [HttpGet, ActionName("GetMercyList")]
        public HttpResponseMessage GetMercyList()
        {
            try
            {
                var dbHandler = new dbHandler();
                string StrQuery = "";
                StrQuery = "exec SPB_GET_MercyFeePaidPinList";
                return Request.CreateResponse(HttpStatusCode.OK, dbHandler.ReturnDataSet(StrQuery));
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("SPB_GET_MercyFeePaidPinList", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        internal string getUserDataByPin(string studentTypeID, string pin)
        {
            throw new NotImplementedException();
        }
    }

}
