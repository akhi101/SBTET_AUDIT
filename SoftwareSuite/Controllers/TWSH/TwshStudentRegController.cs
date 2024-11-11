using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using RestSharp;
using System.Web.Http;
using System.Xml;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Data;
using System.IO;
using SoftwareSuite.Models.Database;
using SoftwareSuite.BLL;
using SoftwareSuite.Services;
using SoftwareSuite.Models.TWSH;
using System.Text;
using Environment = Syntizen.Aadhaar.AUAKUA.Environment;
using System.Xml.Serialization;
using SoftwareSuite.Models.Security;
using SoftwareSuite.Controllers.Common;
using System.Net.Http.Headers;
using System.Timers;
using SoftwareSuite.Models;
using static SoftwareSuite.Controllers.TWSH.GenerateTwshOdc;
using static SoftwareSuite.Controllers.TWSH.GenerateTwshPrinterNr;
using static SoftwareSuite.Controllers.TWSH.GenerateTwshNR;
using DocumentFormat.OpenXml.Wordprocessing;
using static System.Windows.Forms.VisualStyles.VisualStyleElement.StartPanel;

namespace SoftwareSuite.Controllers.TWSH
{
    public class SmsData
    {
        public string mobile { get; set; }
        public string message { get; set; }
    }

    public class SmsDetails
    {
        public string ApplicationNumber { get; set; }
        public string StudentName { get; set; }
        public string StudentPhoneNumber { get; set; }
        public string IsHallticketDownloaded { get; set; }

    }
    public class TwshStudentRegController : ApiController
    {
        // GET: TwshStudentReg
        [HttpGet, ActionName("GetCourses")]
        public object GetCourses()
        {
            try
            {
                var db = new Twshdbandler();
                var res = db.ReturnData("USP_GET_Courses");
                return res;
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }

        [HttpGet, ActionName("GetCBTCourses")]
        public object GetCBTCourses()
        {
            try
            {
                var db = new Twshdbandler();
                var res = db.ReturnData("SP_GET_Courses");
                return res;
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }


        // GET: TwshStudentReg
        [HttpGet, ActionName("GetAllGrades")]
            public object GetAllGrades()
            {
                try
                {
                    var db = new Twshdbandler();
                    var res = db.ReturnData("SP_GET_All_Grades");
                    return res;
                }
                catch (Exception ex)
                {
                    return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
                }
            }

            

        [HttpGet, ActionName("GetAffiliatedTwshInstitutions")]
        public object GetAffiliatedTwshInstitutions()
        {
            try
            {
                var db = new Twshdbandler();
                var res = db.ReturnData("USP_GET_InstitutionDetails");
                return res;
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }

        [HttpGet, ActionName("GetOnlineExamDist")]
        public object GetloadOnlineExamDist()
        {
            try
            {
                var db = new Twshdbandler();
                var res = db.ReturnData("usp_GET_DistrictsOnlineTWSH");
                return res;
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }

        [HttpGet, ActionName("getTwshExamMonthYears")]
        public HttpResponseMessage getTwshExamMonthYears()
        {
            try
            {
                var dbHandler = new Twshdbandler();
                string StrQuery = "";
                StrQuery = "exec USP_GET_Twsh_ExamMonthYear";
                return Request.CreateResponse(HttpStatusCode.OK, dbHandler.ReturnDataSet(StrQuery));
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_GET_Twsh_ExamMonthYear", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpGet, ActionName("getTwshCertificateApplicationReport")]
        public HttpResponseMessage getTwshCertificateApplicationReport(int ExamMode, int ExamMonthYearId = 0, string CbtfromData = null, string CbttoData = null)
        {
            try
            {
                var dbHandler = new Twshdbandler();            
                HttpResponseMessage response = new HttpResponseMessage();
                var param = new SqlParameter[4];
                param[0] = new SqlParameter("@ExamMode", ExamMode);
                param[1] = new SqlParameter("@ExamMonthYearId", ExamMonthYearId);
                param[2] = new SqlParameter("@CbtfromData", CbtfromData);
                param[3] = new SqlParameter("@CbttoData", CbttoData);
                var ds = dbHandler.ReturnDataWithStoredProcedure("USP_GET_CertificateApplicationReports", param);
                return Request.CreateResponse(HttpStatusCode.OK, ds);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_GET_CertificateApplicationReports", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpGet, ActionName("GetTwshExamCenters")]
        public HttpResponseMessage GetTwshExamCenters()
        {
            try
            {
                var dbHandler = new Twshdbandler();
                string StrQuery = "";
                StrQuery = "exec TWSH_SFP_GET_ExaminationCenters";
                return Request.CreateResponse(HttpStatusCode.OK, dbHandler.ReturnDataSet(StrQuery));
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("TWSH_SFP_GET_ExaminationCenters", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }


        [HttpGet, ActionName("getTwshFeeDates")]
        public HttpResponseMessage getTwshFeeDates()
        {
            try
            {
                var dbHandler = new Twshdbandler();
                string StrQuery = "";
                StrQuery = "exec TWSH_GET_FeeDates";
                return Request.CreateResponse(HttpStatusCode.OK, dbHandler.ReturnDataSet(StrQuery));
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("TWSH_GET_FeeDates", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpGet, ActionName("VerifyApplicationDates")]
        public string VerifyApplicationDates(int Mode)
        {
            try
            {
                var dbHandler = new Twshdbandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@Mode", Mode);

                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_Verify_ApplicationDates", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpGet, ActionName("GetTwshExamMonthYearbyID")]
        public string GetTwshExamMonthYearbyID(int AcademicYearID)
        {
            try
            {
                var dbHandler = new Twshdbandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@AcademicYearID", AcademicYearID);

                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_GET_Twsh_ExamMonthYearbyID", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpGet, ActionName("GetTwshNRDates")]
        public HttpResponseMessage GetTwshNRDates()
        {
            try
            {
                var dbHandler = new Twshdbandler();
                string StrQuery = "";
                StrQuery = "exec SP_GET_TWSH_NRDates";
                return Request.CreateResponse(HttpStatusCode.OK, dbHandler.ReturnDataSet(StrQuery));
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("SP_GET_TWSH_NRDates", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpGet, ActionName("TwshGradewiseExamCenters")]
        public HttpResponseMessage TwshGradewiseExamCenters()
        {
            try
            {
                var dbHandler = new Twshdbandler();
                string StrQuery = "";
                StrQuery = "exec TWSH_GET_GradewiseExamCenters";
                return Request.CreateResponse(HttpStatusCode.OK, dbHandler.ReturnDataSet(StrQuery));
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("TWSH_GET_GradewiseExamCenters", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpGet, ActionName("SetTwshExamMonthYear")]
        public string SetTwshExamMonthYear(int DataTypeId,int AcademicID, string ExamMonthYear, int ExamMonthYearId, int SequenceId)
        {
            try
            {
                var db = new Twshdbandler();
                var param = new SqlParameter[5];
                param[0] = new SqlParameter("@Datatypeid", DataTypeId);
                param[1] = new SqlParameter("@AcademicID", AcademicID);
                param[2] = new SqlParameter("@ExamMonthYear", ExamMonthYear);
                param[3] = new SqlParameter("@ExamMonthYearId", ExamMonthYearId);
                param[4] = new SqlParameter("@SequenceId", SequenceId);
                var dt = db.ReturnDataWithStoredProcedureTable("USP_SET_CreateOrUpdateExamMonthYear", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_SET_CreateOrUpdateExamMonthYear", 0, ex.Message);
                return ex.Message;
            }

        }

        [HttpGet, ActionName("TwshSetFeeDateStatus")]
        public string TwshSetFeeDateStatus(int FeePaymentDateID)
        {
            try
            {
                var db = new Twshdbandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@FeePaymentDateID", FeePaymentDateID);
                var dt = db.ReturnDataWithStoredProcedure("TWSH_ActiveorInActive_StudentFeePaymentDates", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("TWSH_ActiveorInActive_StudentFeePaymentDates", 0, ex.Message);
                return ex.Message;
            }

        }

        [HttpGet, ActionName("GetTwshAcademicYears")]
        public HttpResponseMessage GetTwshAcademicYears()
        {
            try
            {
                var dbHandler = new Twshdbandler();
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


        [HttpGet, ActionName("SetTwshTimeSlot")]
        public string SetTwshTimeSlot(int DataTypeId, string Paper1TimeSlot,string Paper2TimeSlot,int Id,string PCODE,int Active)
        {
            try
            {
                var db = new Twshdbandler();
                var param = new SqlParameter[6];
                param[0] = new SqlParameter("@Datatypeid", DataTypeId);
                param[1] = new SqlParameter("@Paper1TimeSlot", Paper1TimeSlot);
                param[2] = new SqlParameter("@Paper2TimeSlot", Paper2TimeSlot);
                param[3] = new SqlParameter("@Id", Id);
                param[4] = new SqlParameter("@PCODE", PCODE);
                param[5] = new SqlParameter("@Active", Active);
                var dt = db.ReturnDataWithStoredProcedureTable("USP_SET_CreateOrUpdateBatchTimings", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_SET_CreateOrUpdateBatchTimings", 0, ex.Message);
                return ex.Message;
            }

        }

        [HttpGet, ActionName("CreateTwshTimeSlot")]
        public string CreateTwshTimeSlot(int DataTypeId, int CourseId, int GradeId, int BatchId, string Paper1TimeSlot, string Paper2TimeSlot,string PCODE)
        {
            try
            {
                var db = new Twshdbandler();
                var param = new SqlParameter[7];
                param[0] = new SqlParameter("@Datatypeid", DataTypeId);
                param[1] = new SqlParameter("@CourseId", CourseId);
                param[2] = new SqlParameter("@GradeId", GradeId);
                param[3] = new SqlParameter("@BatchId", BatchId);
                param[4] = new SqlParameter("@Paper1TimeSlot", Paper1TimeSlot);
                param[5] = new SqlParameter("@Paper2TimeSlot", Paper2TimeSlot);
                param[6] = new SqlParameter("@PCODE", PCODE);
                var dt = db.ReturnDataWithStoredProcedureTable("USP_SET_CreateOrUpdateBatchTimings", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_SET_CreateOrUpdateBatchTimings", 0, ex.Message);
                return ex.Message;
            }

        }

        [HttpGet, ActionName("getTwshStudentDetails")]
        public string getTwshStudentDetails(string ApplicationNumber)
        {
            try
            {
                var db = new Twshdbandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@ApplicationNumber", ApplicationNumber);
                var dt = db.ReturnDataWithStoredProcedure("SP_GET_Twsh_StudentData", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("SP_GET_Twsh_StudentData", 0, ex.Message);
                return ex.Message;
            }

        }

        [HttpGet, ActionName("SetExamMonthYearStatus")]
        public string SetExamMonthYearStatus(int Id, int Active)
        {
            try
            {
                var db = new Twshdbandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@Id", Id);
                param[1] = new SqlParameter("@Active", Active);
                var dt = db.ReturnDataWithStoredProcedure("USP_Set_ExamMonthYearStatus", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_Set_ExamMonthYearStatus", 0, ex.Message);
                return ex.Message;
            }

        }

        [HttpGet, ActionName("SetAcademicYearStatus")]
        public string SetAcademicYearStatus(int AcademicID, int Active)
        {
            try
            {
                var db = new Twshdbandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@AcademicID", AcademicID);
                param[1] = new SqlParameter("@Active", Active);
                var dt = db.ReturnDataWithStoredProcedure("USP_Set_AcademicYearStatus", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_Set_AcademicYearStatus", 0, ex.Message);
                return ex.Message;
            }

        }

        public class TwshUploadData
        {
            public string sign { get; set; }
            public string ApplicationNumber { get; set; }
            public string RegistrationNumber { get; set; }
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
        public class person
        {
            public string file { get; set; }
            public string ResponceCode { get; set; }
            public string ResponceDescription { get; set; }
        }

        [HttpPost, ActionName("TwshUploadSign")]
        public string TwshUploadSign([FromBody] TwshUploadData UploadData)
        {
            try
            {

                var CircularUrl = string.Empty;
                string relativePath = string.Empty;
                string relativePath1 = string.Empty;
                var path = ConfigurationManager.AppSettings["TwshOdcStudentPhotos"];
                var CircularName = UploadData.RegistrationNumber+".Png";
                bool folder = Directory.Exists(path);
                if (!folder)
                    Directory.CreateDirectory(path);
                string CoeSignPath = Path.Combine(path, CircularName);
                byte[] PrincipalimageBytes = Convert.FromBase64String(UploadData.sign);
                File.WriteAllBytes(CoeSignPath, PrincipalimageBytes);
                relativePath = CoeSignPath.Replace(HttpContext.Current.Request.PhysicalApplicationPath, GetWebAppRoot()).Replace(@"\", "/");
                var path1 = ConfigurationManager.AppSettings["TwshStudentPhotos"];
                var CircularName1 = UploadData.ApplicationNumber + ".Png";
                bool folder1 = Directory.Exists(path1);
                if (!folder1)
                    Directory.CreateDirectory(path1);
                string CoeSignPath1 = Path.Combine(path1, CircularName1);
                byte[] PrincipalimageBytes1 = Convert.FromBase64String(UploadData.sign);
                File.WriteAllBytes(CoeSignPath1, PrincipalimageBytes1);
                relativePath1 = CoeSignPath1.Replace(HttpContext.Current.Request.PhysicalApplicationPath, GetWebAppRoot()).Replace(@"\", "/");
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

        [HttpGet, ActionName("getTwshStudentDetailsForCertificate")]
        public string getTwshStudentDetailsForCertificate(string RegistrationNo)
        {
            try
            {
                var db = new Twshdbandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@RegistrationNo", RegistrationNo);
                var dt = db.ReturnDataWithStoredProcedure("SP_GET_Twsh_StudentResultData", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("SP_GET_Twsh_StudentData", 0, ex.Message);
                return ex.Message;
            }

        }

        [HttpGet, ActionName("SetTwshExamCenters")]
        public string SetTwshExamCenters(int Id, string ExaminationCenterCode, string ExaminationCenterName,int DistrictId, int IsTw, int IsSh, int IsTwOnline, int IsShOnline,int GenderId, Boolean IsActive)
        {
            try
            {
                var db = new Twshdbandler();
                var param = new SqlParameter[10];
                param[0] = new SqlParameter("@Id", Id);
                param[1] = new SqlParameter("@ExaminationCenterCode", ExaminationCenterCode);
                param[2] = new SqlParameter("@ExaminationCenterName", ExaminationCenterName);
                param[3] = new SqlParameter("@DistrictId", DistrictId);
                param[4] = new SqlParameter("@IsTw", IsTw);
                param[5] = new SqlParameter("@IsSh", IsSh);
                param[6] = new SqlParameter("@IsTwOnline", IsTwOnline);
                param[7] = new SqlParameter("@IsShOnline", IsShOnline);
                param[8] = new SqlParameter("@GenderId", GenderId);
                param[9] = new SqlParameter("@IsActive", IsActive);
                var dt = db.ReturnDataWithStoredProcedureTable("USP_SET_UpdateExamCenter", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_SET_UpdateExamCenter", 0, ex.Message);
                return ex.Message;
            }

        }



       

        public class paymentDetails
        {
            public int AcademicYearId { get; set; }

            public DateTime FromDate { get; set; }
            public DateTime ToDate { get; set; }
            public double Fee { get; set; }
            public DateTime FineDate { get; set; }
            public double LateFee { get; set; }
            public DateTime TatkalDate { get; set; }

            public DateTime PremiumTatkalDate { get; set; }
            public double TatkalFee { get; set; }
            public double PremiumTatkalFee { get; set; }

            public double CertificateFee { get; set; }
  public int ExamMonthYearId { get; set; }
            public int Id { get; set; }
            public int FeePaymentId { get; set; }



        }

      
        public class ExamDates
        {
            public int ExamMonthYearId { get; set; }
            public int CourseId { get; set; }
            public string ExamDate  { get; set; }
            public int Batch { get; set; }
        }

        [HttpPost, ActionName("TwshsetStudentFeepayments")]
        public HttpResponseMessage TwshsetStudentFeepayments([FromBody] paymentDetails request)
        {
            try
            {
                var dbHandler = new Twshdbandler();
                var param = new SqlParameter[12];

                param[0] = new SqlParameter("@AcademicYearId", request.AcademicYearId);
                param[1] = new SqlParameter("@ExamMonthYearId", request.ExamMonthYearId);
                param[2] = new SqlParameter("@FromDate", request.FromDate);
                param[3] = new SqlParameter("@ToDate", request.ToDate);
                param[4] = new SqlParameter("@FineDate", request.FineDate);
                param[5] = new SqlParameter("@TatkalDate", request.TatkalDate);
                param[6] = new SqlParameter("@PremiumTatkalDate", request.PremiumTatkalDate);
                param[7] = new SqlParameter("@Fee", request.Fee);
                param[8] = new SqlParameter("@LateFee", request.LateFee);
                param[9] = new SqlParameter("@TatkalFee", request.TatkalFee);
                param[10] = new SqlParameter("@PremiumTatkalFee", request.PremiumTatkalFee);
                param[11] = new SqlParameter("@CertificateFee", request.CertificateFee);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("TWSH_SET_StudentFeePaymentDates", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("TWSH_SET_StudentFeePaymentDates", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }

        }

        [HttpPost, ActionName("TwshUpdateStudentFeepayments")]
        public HttpResponseMessage TwshUpdateStudentFeepayments([FromBody] paymentDetails request)
        {
            try
            {
                var dbHandler = new Twshdbandler();
                var param = new SqlParameter[13];
                param[0] = new SqlParameter("@FeePaymentId", request.FeePaymentId);
                param[1] = new SqlParameter("@AcademicYearId", request.AcademicYearId);
                param[2] = new SqlParameter("@ExamMonthYearId", request.ExamMonthYearId);
                param[3] = new SqlParameter("@FromDate", request.FromDate);
                param[4] = new SqlParameter("@ToDate", request.ToDate);
                param[5] = new SqlParameter("@FineDate", request.FineDate);
                param[6] = new SqlParameter("@TatkalDate", request.TatkalDate);
                param[7] = new SqlParameter("@PremiumTatkalDate", request.PremiumTatkalDate);
                param[8] = new SqlParameter("@Fee", request.Fee);
                param[9] = new SqlParameter("@LateFee", request.LateFee);
                param[10] = new SqlParameter("@TatkalFee", request.TatkalFee);
                param[11] = new SqlParameter("@PremiumTatkalFee", request.PremiumTatkalFee);
                param[12] = new SqlParameter("@CertificateFee", request.CertificateFee);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("TWSH_UPDATE_StudentFeePaymentDates", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("TWSH_SET_StudentFeePaymentDates", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }

        }

        [HttpGet, ActionName("GetExamCentersList")]
        public object GetExamCentersList()
        {
            try
            {
                var db = new Twshdbandler();
                var res = db.ReturnData("SP_GET_ExamCentersList");
                return res;
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }

        [HttpGet, ActionName("generateTwshNr")]
        public object generateTwshNr()
        {
            try
            {
                var db = new Twshdbandler();
                var res = db.ReturnData("ADM_Genereate_TWSH_NR");
                return res;
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }
    

        [HttpGet, ActionName("getExamCentersByModeExcel")]
        public string getExamCentersByModeExcel(int Mode)
        {
            List<person> p = new List<person>();
            person p1 = new person();
            try
            {
                var dbHandler = new Twshdbandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@Mode", Mode);
                DataSet ds = dbHandler.ReturnDataWithStoredProcedure("USP_Get_ExamCentersByModeExcel", param);
                var filename = "TWSH_ExamCenters" + ".xlsx";
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
                 var file = "/Downloads/" + filename;
                p1.file = file;
                p1.ResponceCode = "200";             
                p.Add(p1);
                return JsonConvert.SerializeObject(p);

            }
            catch (Exception ex)
            {
                p1.file = "";
                p1.ResponceCode = "400";
                p1.ResponceDescription = ex.Message;
                p.Add(p1);
                return JsonConvert.SerializeObject(p);
            }
        }

        [HttpGet, ActionName("getExamCentersExcel")]
        public string getExamCentersExcel(int AcademicYearID, int ExamMonthYearID)
        {
            List<person> p = new List<person>();
            person p1 = new person();
            try
            {
                var dbHandler = new Twshdbandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@AcademicYearID", AcademicYearID);
                param[1] = new SqlParameter("@ExamMonthYearID", ExamMonthYearID);
                DataSet ds = dbHandler.ReturnDataWithStoredProcedure("USP_Get_ExamCentersByModeExcel", param);
                var filename = "TWSH_ExamCenters" + ".xlsx";
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
                var file = "/Downloads/" + filename;
                p1.file = file;
                p1.ResponceCode = "200";
                p.Add(p1);
                return JsonConvert.SerializeObject(p);

            }
            catch (Exception ex)
            {
                p1.file = "";
                p1.ResponceCode = "400";
                p1.ResponceDescription = ex.Message;
                p.Add(p1);
                return JsonConvert.SerializeObject(p);
            }
        }

        [HttpGet, ActionName("getExamTimeSlotsExcel")]
        public string getExamTimeSlotsExcel(int AcademicYearID, int ExamMonthYearID)
        {
            List<person> p = new List<person>();
            person p1 = new person();
            try
            {
                HttpResponseMessage response = new HttpResponseMessage();
                var dbHandler = new Twshdbandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@AcademicYearID", AcademicYearID);
                param[1] = new SqlParameter("@ExamMonthYearID", ExamMonthYearID);
                DataSet ds = dbHandler.ReturnDataWithStoredProcedure("TWSH_GET_Grade_Batch_Time", param);
          
                var filename = "TWSH_Exam_Time_Slots" + ".xlsx";
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
                var file = "/Downloads/" + filename;
                p1.file = file;
                p1.ResponceCode = "200";
                p1.ResponceDescription = "";
                p.Add(p1);
                return JsonConvert.SerializeObject(p);

            }
            catch (Exception ex)
            {
                p1.file = "";
                p1.ResponceCode = "400";
                p1.ResponceDescription = ex.Message;
                p.Add(p1);
                return JsonConvert.SerializeObject(p);
            }
        }


        [HttpGet, ActionName("generateTwshNrExcel")]
        public string generateTwshNrExcel(int ExamMonthYearId)
        {
            try
            {
                var dbHandler = new Twshdbandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@ExamMonthYearId", ExamMonthYearId);
                DataSet ds = dbHandler.ReturnDataWithStoredProcedure("ADM_Genereate_TWSH_NR", param);
                var filename = "TWSH_PrinterNR" + ".xlsx";
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


        [HttpGet, ActionName("getQualifiedList")]
        public HttpResponseMessage getQualifiedList(int Result, int Gradeid)
        {
            try
            {
                HttpResponseMessage response = new HttpResponseMessage();
                var dbHandler = new Twshdbandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@Result", Result);
                param[1] = new SqlParameter("@Gradeid", Gradeid);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("twsh_resultDetails_1", param);

                return Request.CreateResponse(HttpStatusCode.OK, dt);
            }
            catch (Exception ex)
            {

                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }


        [HttpGet, ActionName("getTwshResult")]
        public HttpResponseMessage getTwshResult(string RegNo)
        {
            try
            {
                HttpResponseMessage response = new HttpResponseMessage();
                var dbHandler = new Twshdbandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@RegNo", RegNo);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("Sp_getTwshResult", param);

                return Request.CreateResponse(HttpStatusCode.OK, dt);
            }
            catch (Exception ex)
            {

                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }


        [HttpGet, ActionName("UpdateTwshSmsStatus")]
        public string UpdateTwshSmsStatus(string RegNo)
        {
            try
            {
                var dbHandler = new Twshdbandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@RegNo", RegNo);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("USP_SET_UpdateSmsStatus", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_SET_UpdateSmsStatus", 0, ex.Message);
                return ex.Message;
            }
        }

        [HttpGet, ActionName("getTwshExamCenterCollegeList")]
        public HttpResponseMessage getTwshExamCenterCollegeList()
        {
            try
            {
                var dbHandler = new Twshdbandler();
                string StrQuery = "";
                StrQuery = "exec USP_GET_Twsh_CollegeList";
                return Request.CreateResponse(HttpStatusCode.OK, dbHandler.ReturnDataSet(StrQuery));
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_GET_Twsh_CollegeList", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpGet, ActionName("getTwshDistictMasterList")]
        public HttpResponseMessage getTwshDistictMasterList()
        {
            try
            {
                var dbHandler = new Twshdbandler();
                string StrQuery = "";
                StrQuery = "exec usp_Get_twshDistrictMaster";
                return Request.CreateResponse(HttpStatusCode.OK, dbHandler.ReturnDataSet(StrQuery));
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("usp_Get_twshDistrictMaster", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }



        [HttpGet, ActionName("TwshNrReports")]
        public string NrReports(int ExamMonthYearId, int UserId, int CourseId, string ExamDate, int ExamBatch)
        {
            string NRReportDir = @"Reports\TwshNR\";
            try
            {
                var dbHandler = new Twshdbandler();
                var param = new SqlParameter[5];
                param[0] = new SqlParameter("@ExamMonthYearId", ExamMonthYearId);
                param[1] = new SqlParameter("@UserId", UserId);
                param[2] = new SqlParameter("@CourseId", CourseId);
                param[3] = new SqlParameter("@ExamDate", ExamDate);
                param[4] = new SqlParameter("@ExamBatch", ExamBatch);
                DataSet ds = dbHandler.ReturnDataWithStoredProcedure("USP_GET_TwshBarCodeNR", param);
              //  GetTwshPrinterNrDownload(ExamMonthYearId);
                GenerateTwshNR GenerateTwshNR = new GenerateTwshNR();
                var pdf = GenerateTwshNR.GetTwshNrPdf(ds, NRReportDir);
                return pdf;
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        [HttpGet, ActionName("TwshNrExcelReports")]
        public string TwshNrExcelReports(int ExamMonthYearId, int UserId, int CourseId, string ExamDate, int ExamBatch)
        {           
            try
            {
                var dbHandler = new Twshdbandler();
                var param = new SqlParameter[5];
                param[0] = new SqlParameter("@ExamMonthYearId", ExamMonthYearId);
                param[1] = new SqlParameter("@UserId", UserId);
                param[2] = new SqlParameter("@CourseId", CourseId);
                param[3] = new SqlParameter("@ExamDate", ExamDate);
                param[4] = new SqlParameter("@ExamBatch", ExamBatch);
                DataSet ds = dbHandler.ReturnDataWithStoredProcedure("USP_GET_TwshBarCodeNR", param);
                GenerateTwshNR GenerateTwshNR = new GenerateTwshNR();
                if (ds.Tables[0].Rows[0]["ResponceCode"].ToString() == "200")
                {
                    var NrData = DataTableHelper.ConvertDataTable<TwshNrData>(ds.Tables[1]);
                    var filename = "TwshNrData" + "_" + ds.Tables[0].Rows[0]["ExamMonthYear"].ToString() + "_" + Guid.NewGuid() + ".xlsx";
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
                return null;
            }
        }




        [HttpGet, ActionName("TwshExamDatesbyCourse")]
        public HttpResponseMessage TwshExamDatesbyCourse(int ExamMonthYearId, int CourseId)
        {
          
            try
            {
                HttpResponseMessage response = new HttpResponseMessage();
                var dbHandler = new Twshdbandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@ExamMonthYearId", ExamMonthYearId);
                param[1] = new SqlParameter("@CourseId", CourseId);               
                DataTable dt = dbHandler.ReturnDataWithStoredProcedureTable("USP_GET_TwshExamDatesbyCourse", param);
                return Request.CreateResponse(HttpStatusCode.OK, dt);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }

        [HttpGet, ActionName("TwshExamBatchbyDate")]
        public HttpResponseMessage TwshExamBatchbyDate(int ExamDateId)
        {

            try
            {
                HttpResponseMessage response = new HttpResponseMessage();
                var dbHandler = new Twshdbandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@ExamDateId", ExamDateId);
                DataTable dt = dbHandler.ReturnDataWithStoredProcedureTable("USP_GET_TwshExamBatchbyDate", param);
                return Request.CreateResponse(HttpStatusCode.OK, dt);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }


        [HttpPost, ActionName("TwshSetApproveStatus")]
        public string TwshSetApproveStatus([FromBody] JsonObject request)
        {
            try
            {
                var js = JsonConvert.DeserializeObject<System.Collections.ArrayList>(Convert.ToString(request["RegistrationNo"]));
                var finalJsonArray = new ArrayList();
                var jsonArray = new JsonArray();
                for (int i = 0; i < js.Count; i++)
                {
                    var jobject = JsonConvert.DeserializeObject<JsonObject>(JsonConvert.SerializeObject(js[i]));
                    jsonArray.Add(jobject);
                }
                var dbHandler = new Twshdbandler();
                var param = new SqlParameter[3];

                param[0] = new SqlParameter("@RegistrationNo", JsonConvert.SerializeObject(jsonArray));
                param[1] = new SqlParameter("@userType", request["userType"]);
                param[2] = new SqlParameter("@approvestatus", request["approvestatus"]);
                var dt = dbHandler.ReturnDataWithStoredProcedure("TWSH_SET_ApproveStatus", param);
                if (dt.Tables[0].Rows[0]["ResponseCode"].ToString() == "200" && request["userType"].ToString() == "1009")
                {
                    for (var i = 0; i < dt.Tables[1].Rows.Count; i++)
                    {
                        if (dt.Tables[1].Rows[i]["StudentPhoneNumber"].ToString() != null || dt.Tables[1].Rows[i]["StudentPhoneNumber"].ToString() != string.Empty)
                        {
                            var status = sendTwshcertSMS(dt.Tables[1].Rows[i]["HallTicketNumber"].ToString(), dt.Tables[1].Rows[i]["StudentPhoneNumber"].ToString(), dt.Tables[1].Rows[i]["CertificatePath"].ToString(), "TypeWriting");
                            if (status.ToString() == "SUCCESS")
                            {
                                UpdateTwshSmsStatus(dt.Tables[1].Rows[i]["HallTicketNumber"].ToString());
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
                    string urlParameters = "?mobile=" + mobile.ToString() + "&message=" + HttpUtility.UrlEncode(Message) + "&templateid=1007161926302084608";
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

        [HttpPost, ActionName("TwshSetApproveStatusReject")]
        public string TwshSetApproveStatusReject([FromBody] JsonObject request)
        {
            try
            {

                var js = JsonConvert.DeserializeObject<System.Collections.ArrayList>(Convert.ToString(request["RegnoJSON"]));
                var finalJsonArray = new ArrayList();
                var jsonArray = new JsonArray();
                for (int i = 0; i < js.Count; i++)
                {
                    var jobject = JsonConvert.DeserializeObject<JsonObject>(JsonConvert.SerializeObject(js[i]));
                    jsonArray.Add(jobject);
                }
                var dbHandler = new Twshdbandler();
                var param = new SqlParameter[4];
                param[0] = new SqlParameter("@RegistrationNo", JsonConvert.SerializeObject(jsonArray));
                param[1] = new SqlParameter("@userType", request["userType"]);
                param[2] = new SqlParameter("@approvestatus", request["approvestatus"]);
                param[3] = new SqlParameter("@Remarks", request["Remarks"]);
                var dt = dbHandler.ReturnDataWithStoredProcedure("TWSH_SET_ApproveStatus", param);
                string Msg = "Hall Ticket Number : {2}, Your request for Typewriting marks  memo is {0} due to {1} - Secretary, SBTETTS.";
                string url = ConfigurationManager.AppSettings["SMS_API"].ToString();
                if (dt.Tables[0].Rows[0]["ResponseCode"].ToString() == "200")
                {
                    for (var i = 0; i < dt.Tables[1].Rows.Count; i++)
                    {
                        var Message = string.Format(Msg, "Rejected", request["Remarks"].ToString(), dt.Tables[1].Rows[i]["HallTicketNumber"].ToString());
                        if (dt.Tables[1].Rows[i]["StudentPhoneNumber"].ToString() != null || dt.Tables[0].Rows[i]["StudentPhoneNumber"].ToString() != string.Empty)
                        {
                            string urlParameters = "?mobile=" + dt.Tables[1].Rows[i]["StudentPhoneNumber"].ToString() + "&message=" + HttpUtility.UrlEncode(Message);
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

        [HttpGet, ActionName("getTwshApproveListDetails")]
        public HttpResponseMessage getTwshApproveListDetails(int GradeId, int datatype, int userType)
        {
            try
            {
                HttpResponseMessage response = new HttpResponseMessage();
                var dbHandler = new Twshdbandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@GradeId", GradeId);
                param[1] = new SqlParameter("@datatype", datatype);
                param[2] = new SqlParameter("@userType", userType);
                var dt = dbHandler.ReturnDataWithStoredProcedure("TWSH_SFP_GET_ListByGrade", param);

                return Request.CreateResponse(HttpStatusCode.OK, dt);
            }
            catch (Exception ex)
            {

                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }

        [HttpGet, ActionName("getTwshAuthorizationListDetails")]
        public HttpResponseMessage getTwshAuthorizationListDetails(int ExamMode,string collegecode,int dataTypeId, int ExamMonthYearId = 0,string CbtfromData=null,string CbttoData=null)
        {
            try
            {
                HttpResponseMessage response = new HttpResponseMessage();
                var dbHandler = new Twshdbandler();
                var param = new SqlParameter[6];
                param[0] = new SqlParameter("@ExamMode", ExamMode); 
                param[1] = new SqlParameter("@collegecode", collegecode);
                param[2] = new SqlParameter("@dataTypeId", dataTypeId);
                param[3] = new SqlParameter("@ExamMonthYearId", ExamMonthYearId);
                param[4] = new SqlParameter("@CbtfromData", CbtfromData);
                param[5] = new SqlParameter("@CbttoData", CbttoData);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_GET_TwshApprovalStatusCollegewiseList", param);

                return Request.CreateResponse(HttpStatusCode.OK, dt);
            }
            catch (Exception ex)
            {

                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }


        [HttpGet, ActionName("GetModules")]
        public HttpResponseMessage GetModules(int UserTypeId)
        {
            try
            {
                HttpResponseMessage response = new HttpResponseMessage();
                var dbHandler = new Twshdbandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@UserTypeId", UserTypeId);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_GET_Modules", param);
                return Request.CreateResponse(HttpStatusCode.OK, dt);
            }
            catch (Exception ex)
            {

                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }


        [HttpGet, ActionName("GetCertificateData")]
        public HttpResponseMessage GetCertificateData(int Result, int GradeId, int UserTypeId, string RegNo)
        {
            try
            {
                HttpResponseMessage response = new HttpResponseMessage();
                var dbHandler = new Twshdbandler();
                var param = new SqlParameter[4];
                param[0] = new SqlParameter("@Result", Result);
                param[1] = new SqlParameter("@GradeId", GradeId);
                param[2] = new SqlParameter("@UserTypeId", UserTypeId);
                param[3] = new SqlParameter("@RegNo", RegNo);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("Sp_getTwshResult", param);

                return Request.CreateResponse(HttpStatusCode.OK, dt);
            }
            catch (Exception ex)
            {

                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }

        [HttpGet, ActionName("GetTwshExamApprovalStatus")]
        public HttpResponseMessage GetTwshExamApprovalStatus(int ExamMode, int ExamMonthYearId)
        {
            try
            {
                HttpResponseMessage response = new HttpResponseMessage();
                var dbHandler = new Twshdbandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@ExamMode", ExamMode);
                param[1] = new SqlParameter("@ExamMonthYearId", ExamMonthYearId);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("USP_GET_TwshApprovalStatusList", param);

                return Request.CreateResponse(HttpStatusCode.OK, dt);
            }
            catch (Exception ex)
            {

                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }

        [HttpGet, ActionName("GetTwshExamApprovalCollegeWiseStatus")]
        public HttpResponseMessage GetTwshExamApprovalCollegeWiseStatus(int ExamMode, int ExamMonthYearId,string CollegeCode)
        {
            try
            {
                HttpResponseMessage response = new HttpResponseMessage();
                var dbHandler = new Twshdbandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@ExamMode", ExamMode); 
                 param[1] = new SqlParameter("@ExamMonthYearId", ExamMonthYearId);
                param[2] = new SqlParameter("@collegecode", CollegeCode);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("USP_GET_TwshApprovalStatusCollegewiseList", param);

                return Request.CreateResponse(HttpStatusCode.OK, dt);
            }
            catch (Exception ex)
            {

                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }

        [HttpGet, ActionName("GetTwshCertificateData")]
        public HttpResponseMessage GetTwshCertificateData(int Result, int GradeId, int UserTypeId, string RegNo)
        {
            try
            {
                HttpResponseMessage response = new HttpResponseMessage();
                var dbHandler = new Twshdbandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@RegNo", RegNo);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("Sp_getTwshResult", param);

                return Request.CreateResponse(HttpStatusCode.OK, dt);
            }
            catch (Exception ex)
            {

                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }

        [HttpGet, ActionName("UpdateCertificateData")]
        public HttpResponseMessage UpdateCertificateData(string RegNo)
        {
            try
            {
                HttpResponseMessage response = new HttpResponseMessage();
                var dbHandler = new Twshdbandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@RegNo", RegNo);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("Sp_UpdateTwshResult", param);

                return Request.CreateResponse(HttpStatusCode.OK, dt);
            }
            catch (Exception ex)
            {

                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }

        [HttpGet, ActionName("getTwshApprovelList")]
        public HttpResponseMessage getTwshApprovelList(string userType)
        {
            try
            {
                HttpResponseMessage response = new HttpResponseMessage();
                var dbHandler = new Twshdbandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@userType", userType);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("TWSH_SFP_GET_ApprovalList", param);

                return Request.CreateResponse(HttpStatusCode.OK, dt);
            }
            catch (Exception ex)
            {

                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }

        [HttpGet, ActionName("getTwshAuthorizationlList")]
        public HttpResponseMessage getTwshAuthorizationlList(int ExamMode,int ExamMonthYearId =0,string CbtfromData =null,string CbttoData=null)
        {
            try
            {
                HttpResponseMessage response = new HttpResponseMessage();
                var dbHandler = new Twshdbandler();
                var param = new SqlParameter[4];
                param[0] = new SqlParameter("@ExamMode", ExamMode);
                param[1] = new SqlParameter("@ExamMonthYearId", ExamMonthYearId);
                param[2] = new SqlParameter("@CbtfromData", CbtfromData);
                param[3] = new SqlParameter("@CbttoData", CbttoData);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("USP_GET_TwshApprovalStatusList", param);

                return Request.CreateResponse(HttpStatusCode.OK, dt);
            }
            catch (Exception ex)
            {

                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }

        [HttpGet, ActionName("getTwshAuthorizationlListExcel")]
        public string getTwshAuthorizationlListExcel(int ExamMode, int ExamMonthYearId = 0, string CbtfromData = null, string CbttoData = null)
        {
            List<person> p = new List<person>();
            person p1 = new person();
            try
            {
                HttpResponseMessage response = new HttpResponseMessage();
                var dbHandler = new Twshdbandler();
                var param = new SqlParameter[4];
                param[0] = new SqlParameter("@ExamMode", ExamMode);
                param[1] = new SqlParameter("@ExamMonthYearId", ExamMonthYearId);
                param[2] = new SqlParameter("@CbtfromData", CbtfromData);
                param[3] = new SqlParameter("@CbttoData", CbttoData);              
                DataSet ds = dbHandler.ReturnDataWithStoredProcedure("USP_GET_TwshApprovalStatusData", param);
                var filename = "TWSH_Authorization_Report" + ".xlsx";
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
                var file = "/Downloads/" + filename;
                p1.file = file;
                p1.ResponceCode = "200";
                p1.ResponceDescription = "";
                p.Add(p1);
                return JsonConvert.SerializeObject(p);

            }
            catch (Exception ex)
            {
                p1.file = "";
                p1.ResponceCode = "400";
                p1.ResponceDescription = ex.Message;
                p.Add(p1);
                return JsonConvert.SerializeObject(p);
            }
            }

        [HttpGet, ActionName("getExamCentersByMode")]
        public HttpResponseMessage getExamCentersByMode(int Mode)
        {
            try
            {
                HttpResponseMessage response = new HttpResponseMessage();
                var dbHandler = new Twshdbandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@Mode", Mode);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("USP_Get_ExamCentersByMode", param);

                return Request.CreateResponse(HttpStatusCode.OK, dt);
            }
            catch (Exception ex)
            {

                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }


        [HttpGet, ActionName("GetExamCenters")]
        public string GetExamCenters(int DataType,int AcademicYearID,int ExamMonthYearID)
        {
            try
            {
                HttpResponseMessage response = new HttpResponseMessage();
                var dbHandler = new Twshdbandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@DataType", DataType);
                param[1] = new SqlParameter("@AcademicYearID", AcademicYearID);
                param[2] = new SqlParameter("@ExamMonthYearID", ExamMonthYearID);
                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_Get_ExamCenters", param);

                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpGet, ActionName("GetExamCentresCoursewise")]
        public string GetExamCentresCoursewise(int DataType,int ExamCentreID, int AcademicYearID, int ExamMonthYearID,int MBT,int SHORTHAND)
        {
            try
            {
                HttpResponseMessage response = new HttpResponseMessage();
                var dbHandler = new Twshdbandler();
                var param = new SqlParameter[6];
                param[0] = new SqlParameter("@DataType", DataType);
                param[1] = new SqlParameter("@ExamCentreID", ExamCentreID);
                param[2] = new SqlParameter("@AcademicYearID", AcademicYearID);
                param[3] = new SqlParameter("@ExamMonthYearID", ExamMonthYearID);
                param[4] = new SqlParameter("@MBT", MBT);
                param[5] = new SqlParameter("@SHORTHAND", SHORTHAND);
                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_Get_ExamCentersCourseWise", param);

                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpGet, ActionName("EditExamCentresCoursewise")]
        public string EditExamCentresCoursewise(int ExamCentreCourseID)
        {
            try
            {
                HttpResponseMessage response = new HttpResponseMessage();
                var dbHandler = new Twshdbandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@ExamCentreCourseID", ExamCentreCourseID);
                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_Edit_ExamCentersCourseWise", param);

                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }


        [HttpGet, ActionName("getQualifiedCount")]
        public HttpResponseMessage getQualifiedCount(string userType)
        {
            try
            {
                HttpResponseMessage response = new HttpResponseMessage();
                var dbHandler = new Twshdbandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@userType", userType);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("USP_SFP_GET_TwshResultByGrade", param);

                return Request.CreateResponse(HttpStatusCode.OK, dt);
            }
            catch (Exception ex)
            {

                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }

        [HttpGet, ActionName("GetSmsDetails")]
        public string GetSmsDetails()
        {
            try
            {
                HttpResponseMessage response = new HttpResponseMessage();
                var dbHandler = new Twshdbandler();
                DataTable dt = new DataTable();
                dt = dbHandler.ReturnData("SP_GET_SMSData");
                List<SmsData> SmsDataList = Helper.DataTableToList<SmsData>(dt);
                return JsonConvert.SerializeObject(SmsDataList);
                // return Request.CreateResponse(HttpStatusCode.OK, dt);
            }
            catch (Exception ex)
            {

                return ex.Message;
            }
        }

        //[HttpPost, ActionName("GetMigrationCertificate")]
        //public async Task<object> GetMigrationCertificate([FromBody] JsonObject request)
        //{
        //    try
        //    {
        //        var js = JsonConvert.DeserializeObject<ArrayList>(Convert.ToString(request["PINjson"]));
        //        var respdfList = new List<GetInterimRes>();
        //        var dbHandler = new dbHandler();
        //        var param = new SqlParameter[1];
        //        for (int i = 0; i < js.Count; i++)
        //        {
        //            var jobject = JsonConvert.DeserializeObject<JsonObject>(JsonConvert.SerializeObject(js[i]));
        //            param[0] = new SqlParameter("@pin", jobject["PIN"]);
        //            DataSet ds = dbHandler.ReturnDataWithStoredProcedure("USP_SS_GET_FeePaidMigrationCertificateDetails", param);
        //            GenerateCertificate GenerateCertificate = new GenerateCertificate();
        //            var ApplicationNumber = ds.Tables[1].Rows[0]["MigrationCertificateNo"].ToString();
        //            var pdfurl = GenerateCertificate.GetMigrationCertificate(ds);
        //            respdfList.Add(new GetInterimRes { PdfUrl = pdfurl, Pin = jobject["PIN"].ToString(), ApplicationNumber = ApplicationNumber });
        //        }
        //        return respdfList;
        //    }
        //    catch (Exception ex)
        //    {
        //        return "FAILED" + ex.Message;
        //    }

        //}


        //[HttpPost, ActionName("GetTransferCertificate")]
        //public async Task<object> GetTransferCertificate([FromBody] JsonObject request)
        //{
        //    try
        //    {

        //        {
        //            var param = new SqlParameter[1];
        //            param[0] = new SqlParameter("@pin", request["PIN"]);
        //            DataSet ds = dbHandler.ReturnDataWithStoredProcedure("USP_SS_GET_FeePaidTransferCertificateDetails", param);
        //            GenerateCertificate GenerateCertificate = new GenerateCertificate();
        //            var ApplicationNumber = ds.Tables[1].Rows[0]["TransferCertificateNo"].ToString();
        //            var pdfurl = GenerateCertificate.GetTransferCertificate(ds);
        //            respdfList.Add(new GetInterimRes { PdfUrl = pdfurl, Pin = jobject["PIN"].ToString(), ApplicationNumber = ApplicationNumber });
        //        }

        //        return respdfList;
        //    }
        //    catch (Exception ex)
        //    {
        //        return "FAILED" + ex.Message;
        //    }
        //}





        [HttpGet, ActionName("getLanguages")]
        public HttpResponseMessage getLanguages(int CourseId)
        {
            try
            {
                HttpResponseMessage response = new HttpResponseMessage();
                var dbHandler = new Twshdbandler();

                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@CourseId", CourseId);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_GET_Languages", param);

                return Request.CreateResponse(HttpStatusCode.OK, dt);
            }
            catch (Exception ex)
            {

                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }


        [HttpGet, ActionName("getonlineExamcentersAndDates")]
        public HttpResponseMessage getonlineExamcentersAndDates(int CoursesType, int DistrictId)
        {
            try
            {
                HttpResponseMessage response = new HttpResponseMessage();
                var dbHandler = new Twshdbandler();
                var param = new SqlParameter[2]; 
                param[0] = new SqlParameter("@CoursesType", CoursesType);
                param[1] = new SqlParameter("@DistrictId", DistrictId);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_GET_TWSH_ExaminationCenter_MonthDates", param);
                return Request.CreateResponse(HttpStatusCode.OK, dt);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }

        [HttpGet, ActionName("GetCBTExamcentersAndDates")]
        public HttpResponseMessage GetCBTExamcentersAndDates(int CoursesType, int DistrictId)
        {
            try
            {
                HttpResponseMessage response = new HttpResponseMessage();
                var dbHandler = new Twshdbandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@CoursesType", CoursesType);
                param[1] = new SqlParameter("@DistrictId", DistrictId);
                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_GET_TWSH_ExaminationCenters_Dates", param);
                return Request.CreateResponse(HttpStatusCode.OK, dt);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }


        public class SscDetails
        {
            public string RollNo { get; set; }
            public string Year { get; set; }
            public string Stream { get; set; }
            public string TENTH_HT_NO { get; set; }
            public string TENTH_YEAR { get; set; }
            public string STREAMS { get; set; }
        }

        [HttpPost, ActionName("TempGetSSCDetails")]
        public HttpResponseMessage TempGetSSCDetails([FromBody] SscDetails data)
        {
            var dbHandler = new Twshdbandler();

            try
            {

                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@TENTH_HT_NO", data.TENTH_HT_NO);
                param[1] = new SqlParameter("@TENTH_YEAR", data.TENTH_YEAR);
                param[2] = new SqlParameter("@STREAMS", data.STREAMS);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Get_Temp_SSCData", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("SP_Get_Temp_SSCData", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }

        [HttpGet, ActionName("AddInstitute")]
        public HttpResponseMessage AddInstitute(int ExaminationCenterId, string InstitutionCode, string InstitutionName, string InstitutionAddress,
            string MailId, int DistrictId, string Pincode, string ContactPerson, string ContactNumber)
        {
            try
            {
                HttpResponseMessage response = new HttpResponseMessage();
                var dbHandler = new Twshdbandler();
                var param = new SqlParameter[9];

                param[0] = new SqlParameter("@ExaminationCenterId", ExaminationCenterId);
                param[1] = new SqlParameter("@InstitutionCode", InstitutionCode);
                param[2] = new SqlParameter("@InstitutionName", InstitutionName);
                param[3] = new SqlParameter("@InstitutionAddress", InstitutionAddress);
                param[4] = new SqlParameter("@MailId", MailId);
                param[5] = new SqlParameter("@DistrictId", DistrictId);
                param[6] = new SqlParameter("@Pincode", Pincode);
                param[7] = new SqlParameter("@ContactPerson", ContactPerson);
                param[8] = new SqlParameter("@ContactNumber", ContactNumber);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_SET_AddInstitute", param);

                return Request.CreateResponse(HttpStatusCode.OK, dt);
            }
            catch (Exception ex)
            {

                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }


        [HttpGet, ActionName("UpdateInstitutionData")]
        public HttpResponseMessage UpdateInstitutionData(int Id, int ExaminationCenterId, string InstitutionCode, string InstitutionName, string InstitutionAddress,
                string MailId, int DistrictId, string Pincode, string ContactPerson, string ContactNumber)
        {
            try
            {
                HttpResponseMessage response = new HttpResponseMessage();
                var dbHandler = new Twshdbandler();
                var param = new SqlParameter[10];
                param[0] = new SqlParameter("@Id", Id);
                param[1] = new SqlParameter("@ExaminationCenterId", ExaminationCenterId);
                param[2] = new SqlParameter("@InstitutionCode", InstitutionCode);
                param[3] = new SqlParameter("@InstitutionName", InstitutionName);
                param[4] = new SqlParameter("@InstitutionAddress", InstitutionAddress);
                param[5] = new SqlParameter("@MailId", MailId);
                param[6] = new SqlParameter("@DistrictId", DistrictId);
                param[7] = new SqlParameter("@Pincode", Pincode);
                param[8] = new SqlParameter("@ContactPerson", ContactPerson);
                param[9] = new SqlParameter("@ContactNumber", ContactNumber);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_UPDATE_InstitutionData", param);

                return Request.CreateResponse(HttpStatusCode.OK, dt);
            }
            catch (Exception ex)
            {

                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }


        [HttpGet, ActionName("GetGradeList")]
        public HttpResponseMessage GetGradeList(int CourseId, int language)
        {
            try
            {
                HttpResponseMessage response = new HttpResponseMessage();
                var dbHandler = new Twshdbandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@CourseId", CourseId);
                param[1] = new SqlParameter("@LanguageId", language);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_GET_Grades", param);

                return Request.CreateResponse(HttpStatusCode.OK, dt);
            }
            catch (Exception ex)
            {

                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }


        [HttpGet, ActionName("GetQualificationList")]
        public HttpResponseMessage GetQualificationList(int GradeId)
        {
            try
            {
                HttpResponseMessage response = new HttpResponseMessage();
                var dbHandler = new Twshdbandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@GradeId", GradeId);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_GET_Qualifications", param);

                return Request.CreateResponse(HttpStatusCode.OK, dt);
            }
            catch (Exception ex)
            {

                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }


        [HttpGet, ActionName("EditInstituteData")]
        public HttpResponseMessage EditInstituteData(int Id)
        {
            try
            {
                HttpResponseMessage response = new HttpResponseMessage();
                var dbHandler = new Twshdbandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@Id", Id);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Edit_Twsh_Institutions", param);

                return Request.CreateResponse(HttpStatusCode.OK, dt);
            }
            catch (Exception ex)
            {

                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }


        [HttpPost, ActionName("Delete_InstituteData")]
        public HttpResponseMessage Delete_InstituteData([FromBody] JsonObject request)
        {
            try
            {
                HttpResponseMessage response = new HttpResponseMessage();
                var dbHandler = new Twshdbandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@Id", request["Id"]);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Delete_Institute", param);

                return Request.CreateResponse(HttpStatusCode.OK, dt);
            }
            catch (Exception ex)
            {

                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }


        [HttpGet, ActionName("Delete_TimeSlot")]
        public HttpResponseMessage Delete_TimeSlot(int Id)
        {
            try
            {
                HttpResponseMessage response = new HttpResponseMessage();
                var dbHandler = new Twshdbandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@Id", Id);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("TWSH_Delete_BatchTimings", param);

                return Request.CreateResponse(HttpStatusCode.OK, dt);
            }
            catch (Exception ex)
            {

                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }

        [HttpGet, ActionName("GetCategoryList")]
        public object GetCategoryList()
        {
            try
            {
                var db = new Twshdbandler();
                var res = db.ReturnData("SP_GET_Category");
                return res;
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }


        [HttpGet, ActionName("GetInstitutesList")]
        public object GetInstitutesList()
        {
            try
            {
                var db = new Twshdbandler();
                var res = db.ReturnData("SP_Get_Twsh_Institutions");
                return res;
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }

        [HttpGet, ActionName("GetInstitutesListExcel")]
        public string GetInstitutesListExcel()
        {
            try
            {
                var dbHandler = new Twshdbandler();
                DataSet ds = dbHandler.ReturnDataSet("SP_Get_Twsh_InstitutionsExcel");              
                    var filename = "TWSH_Institutions" + "_" + Guid.NewGuid() + ".xlsx";
                    var eh = new ExcelHelper();
                    var path = ConfigurationManager.AppSettings["DownloadsFolderPath"];
                    DataSet excelds = new DataSet();
                    excelds.Tables.Add(ds.Tables[0].Copy());
                    bool folderExists = Directory.Exists(path);
                    if (!folderExists)
                        Directory.CreateDirectory(path);
                    eh.ExportDataSet(excelds, path + filename);
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

        [HttpGet, ActionName("GetExamMonthYear")]
        public object GetExamMonthYear()
        {
            try
            {
                var db = new Twshdbandler();
                var res = db.ReturnData("SP_GET_ExamMonthYear");
                return res;
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }

        [HttpGet, ActionName("GetDistrictList")]
        public object GetDistricts()
        {
            try
            {
                var db = new Twshdbandler();
                var res = db.ReturnData("SP_GET_Districts");
                return res;
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }


        [HttpGet, ActionName("GetBatches")]
        public object GetBatches()
        {
            try
            {
                var db = new Twshdbandler();
                var res = db.ReturnData("USP_GET_Batches");
                return res;
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }

        [HttpGet, ActionName("GetExaminationDatesByCourse")]
        public HttpResponseMessage GetExaminationDatesByCourse(int CourseId)
        {
            try
            {
                HttpResponseMessage response = new HttpResponseMessage();
                var dbHandler = new Twshdbandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@CourseId", CourseId);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_GET_ExamDatesByCourseId", param);

                return Request.CreateResponse(HttpStatusCode.OK, dt);
            }
            catch (Exception ex)
            {

                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }

        [HttpGet, ActionName("GetExamsDates")]
        public object GetExamsDates()
        {
            try
            {
                var db = new Twshdbandler();
                var res = db.ReturnData("SP_GET_ExamsDates");
                return res;
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }
        


        [HttpGet, ActionName("GetExaminationDates")]
        public HttpResponseMessage GetExaminationDates(int CourseId, int GradeId)
        {
            try
            {
                HttpResponseMessage response = new HttpResponseMessage();
                var dbHandler = new Twshdbandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@CourseId", CourseId);
                param[1] = new SqlParameter("@GradeId", GradeId);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_GET_ExamDates", param);

                return Request.CreateResponse(HttpStatusCode.OK, dt);
            }
            catch (Exception ex)
            {

                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }

        [HttpGet, ActionName("GetExaminationbatches")]
        public HttpResponseMessage GetExaminationbatches(int ExamDateId,int CourseId,int GradeID)
        {
            try
            {
                HttpResponseMessage response = new HttpResponseMessage();
                var dbHandler = new Twshdbandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@ExamDateId", ExamDateId);
                param[1] = new SqlParameter("@CourseId", CourseId);
                param[2] = new SqlParameter("@GradeID", GradeID);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_GET_ExamBatches", param);

                return Request.CreateResponse(HttpStatusCode.OK, dt);
            }
            catch (Exception ex)
            {

                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }

        [HttpGet, ActionName("GetExaminationCenters")]
        public HttpResponseMessage GetExaminationCenters(int UserId, int DistrictId, int CourseId, int GradeId)
        {
            try
            {
                HttpResponseMessage response = new HttpResponseMessage();
                var dbHandler = new Twshdbandler();
                var param = new SqlParameter[4];
                param[0] = new SqlParameter("@UserId", UserId);
                param[1] = new SqlParameter("@DistrictId", DistrictId);
                param[2] = new SqlParameter("@CourseId", CourseId);
                param[3] = new SqlParameter("@GradeId", GradeId);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_GET_ExaminationCenters", param);

                return Request.CreateResponse(HttpStatusCode.OK, dt);
            }
            catch (Exception ex)
            {

                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }

        [HttpGet, ActionName("GetDistrictInstitutes")]
        public HttpResponseMessage GetDistrictInstitutes(int DistrictId, int UserTypeId)
        {
            try
            {
                HttpResponseMessage response = new HttpResponseMessage();
                var dbHandler = new Twshdbandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@DistrictId", DistrictId);
                param[1] = new SqlParameter("@UserTypeId", UserTypeId);

                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_GET_DistrictInstitutions", param);

                return Request.CreateResponse(HttpStatusCode.OK, dt);
            }
            catch (Exception ex)
            {

                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }
        [HttpGet, ActionName("GetOldPassword")]
        public HttpResponseMessage GetOldPassword(int UserId)
        {
            try
            {
                HttpResponseMessage response = new HttpResponseMessage();
                var dbHandler = new Twshdbandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@UserId", UserId);

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_GET_OldPassword", param);

                return Request.CreateResponse(HttpStatusCode.OK, dt);
            }
            catch (Exception ex)
            {

                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }

        [HttpGet, ActionName("GetExaminationDistricts")]
        public HttpResponseMessage GetExaminationDistricts(int CourseId, int UserId, int GradeId)
        {
            try
            {
                HttpResponseMessage response = new HttpResponseMessage();
                var dbHandler = new Twshdbandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@CourseId", CourseId);
                param[1] = new SqlParameter("@UserId", UserId);
                param[2] = new SqlParameter("@GradeId", GradeId);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_GET_ExaminationDistricts", param);
                return Request.CreateResponse(HttpStatusCode.OK, dt);
            }
            catch (Exception ex)
            {

                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }

        [HttpGet, ActionName("GetInstituteReports")]
        public HttpResponseMessage GetInstituteReports(int UserId)
        {
            try
            {
                HttpResponseMessage response = new HttpResponseMessage();
                var dbHandler = new Twshdbandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@UserId", UserId);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_GET_NRReport", param);
                return Request.CreateResponse(HttpStatusCode.OK, dt);
            }
            catch (Exception ex)
            {

                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }

        [HttpGet, ActionName("GetStudentDetails")]
        public HttpResponseMessage GetStudentDetails(String ApplicationNumber)
        {
            try
            {
                HttpResponseMessage response = new HttpResponseMessage();
                var dbHandler = new Twshdbandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@ApplicationNumber ", ApplicationNumber);
                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_GET_ApplicationStudentDetailsForUpdating", param);
                return Request.CreateResponse(HttpStatusCode.OK, dt);
            }
            catch (Exception ex)
            {

                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }

        [HttpPost, ActionName("UpdateStudentData")]
        public HttpResponseMessage UpdateStudentData()
        {
            try
            {
                HttpResponseMessage response = new HttpResponseMessage();
                var data = Request.Content.ReadAsStringAsync().Result;
                JObject obj = JObject.Parse(data);
                string ApplicationNumber = "" + obj["ApplicationNumber"];
                string Photo = "" + obj["Photo"];
                string File1 = "" + obj["File1"];
                string File2 = "" + obj["File2"];
                string ExamDistrictId = "" + obj["DistrictId"];
                string HnoStreet = "" + obj["HnoStreet"];
                string VillageTown = "" + obj["VillageTown"];
                string EmailId = "" + obj["EmailId"];
                string ExamDate = "" + obj["ExamDate"];
                string Name = "" + obj["Name"];
                string FatherName = "" + obj["FatherName"];
                string MotherName = "" + obj["MotherName"];
                string Gender = "" + obj["Gender"];
                string Dob = "" + obj["Dob"];
                string IsBlind = "" + obj["IsBlind"];
                string Grade = "" + obj["Grade"];
                string MobileNo = "" + obj["MobileNo"];
                string ExaminationBatch = "" + obj["ExaminationBatch"];
                string ExaminationCenter = "" + obj["ExaminationCenter"];
              
                var dbHandler = new Twshdbandler();
                var param = new SqlParameter[19];
                param[0] = new SqlParameter("@ApplicationNumber", ApplicationNumber);
                param[1] = new SqlParameter("@Photo", Photo);
                param[2] = new SqlParameter("@File1", File1);
                param[3] = new SqlParameter("@File2", File2);
                param[4] = new SqlParameter("@ExamDistrictId", ExamDistrictId);
                param[5] = new SqlParameter("@HnoStreet", HnoStreet);
                param[6] = new SqlParameter("@VillageTown", VillageTown);
                param[7] = new SqlParameter("@EmailId", EmailId);
                param[8] = new SqlParameter("@ExamDate", ExamDate);             
                param[9] = new SqlParameter("@Name", Name);
                param[10] = new SqlParameter("@FatherName", FatherName);
                param[11] = new SqlParameter("@MotherName", MotherName);
                param[12] = new SqlParameter("@Gender", Gender);
                param[13] = new SqlParameter("@Dob", Dob);
                param[14] = new SqlParameter("@IsBlind", IsBlind);
                param[15] = new SqlParameter("@GradeId", Grade);
                param[16] = new SqlParameter("@ExaminationBatch", ExaminationBatch);
                param[17] = new SqlParameter("@ExamCenterId", ExaminationCenter);
                param[18] = new SqlParameter("@MobileNo", MobileNo);

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_SET_UpdateApplicationStudentDetails", param);
                return Request.CreateResponse(HttpStatusCode.OK, dt);
            }
            catch (Exception ex)
            {

                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }

        [HttpPost, ActionName("PostMultipleApplicationPaymentdata")]
        public HttpResponseMessage PostMultipleApplicationPaymentdata(HttpRequestMessage request)
        {

            try
            {
                string Appdata = "" + request.Content.ReadAsStringAsync().Result;
                JObject obj = JObject.Parse(Appdata);
                int Amount = Convert.ToInt32("" + obj["TotalAmount"]);
                int GradeId = Convert.ToInt32("" + obj["GradeId"]);
                int ApplicationCount = Convert.ToInt32("" + obj["ApplicationCount"]);
                JArray dataarray = obj["AppData"].Value<JArray>();
                var json = JsonConvert.SerializeObject(dataarray);





                var dbHandler = new Twshdbandler();
                var param = new SqlParameter[4];
                param[0] = new SqlParameter("@json", json);

                param[1] = new SqlParameter("@Amount", Amount);
                param[2] = new SqlParameter("@ApplicationCount", ApplicationCount);
                param[3] = new SqlParameter("@GradeId", GradeId);
                var dt = dbHandler.ExcutiveScalarWithStoreProcedure("SP_GET_MultiplePaymentChallanNo", param);

                string ChalanaNo = (string)dt;

                var response = Request.CreateResponse(HttpStatusCode.OK);
                response.Content = new StringContent(JsonConvert.SerializeObject("{\"respcode\":\"200\",\"challanaNo\":\"" + ChalanaNo + "\" }"), System.Text.Encoding.UTF8, "application/json");
                return response;



            }
            catch (Exception ex)
            {
                var response = Request.CreateResponse(HttpStatusCode.InternalServerError);
                response.Content = new StringContent(JsonConvert.SerializeObject("{\"respcode\":\"500\",\"respdesc\" : \"Server Error\" }"), System.Text.Encoding.UTF8, "application/json");
                return response;

            }
        }


        [HttpGet, ActionName("GetPreviousExamData")]
        public HttpResponseMessage GetPreviousExamData(String HallticketNo, int GradeId)
        {
            try
            {
                HttpResponseMessage response = new HttpResponseMessage();
                var dbHandler = new Twshdbandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@HallticketNo", HallticketNo);
                param[1] = new SqlParameter("@GradeId", GradeId);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_GET_PreviousData", param);

                return Request.CreateResponse(HttpStatusCode.OK, dt);
            }
            catch (Exception ex)
            {

                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }

        [HttpGet, ActionName("GetGradeWiseCandidateDetails")]
        public HttpResponseMessage GetGradeWiseCandidateDetails(String UserId, int GradeId)
        {
            try
            {
                HttpResponseMessage response = new HttpResponseMessage();
                var dbHandler = new Twshdbandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@UserId", UserId);
                param[1] = new SqlParameter("@GradeId", GradeId);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_GET_GradeWiseCandidateDetails", param);

                return Request.CreateResponse(HttpStatusCode.OK, dt);
            }
            catch (Exception ex)
            {

                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }

        [HttpPost, ActionName("GetCbtStudents")]
        public async Task<HttpResponseMessage> GetCbtStudents([FromBody] JsonObject request)
        {
            try
            {
                HttpResponseMessage response = new HttpResponseMessage();
                var dbHandler = new Twshdbandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@UserId", request["UserId"]);
                param[1] = new SqlParameter("@FromDate", request["FromDate"]);
                param[2] = new SqlParameter("@ToDate", request["ToDate"]);
                var ds = dbHandler.ReturnDataWithStoredProcedure("SP_GET_GetCbtStudents", param);

                return Request.CreateResponse(HttpStatusCode.OK, ds);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }

    
        [HttpGet, ActionName("GetExamStartToken")]
        public string GetExamStartToken(string ApplicationNumber)
        {
            try
            {
                var token = JsonConvert.SerializeObject(new
                {
                    Username = ApplicationNumber,
                    ExpiryTime = DateTime.Now.AddMinutes(10)
                });
                var crypt = new HbCrypt();
                var cipher = crypt.Encrypt(token);
                var bytes = System.Text.Encoding.UTF8.GetBytes(cipher);
                return System.Convert.ToBase64String(bytes);
            }
            catch (Exception ex)
            {
                return "ERROR";
            }
        }

        [HttpGet, ActionName("ChangePassword")]
        public HttpResponseMessage ChangePassword(int UserId, string UserPassword)
        {
            try
            {
                HttpResponseMessage response = new HttpResponseMessage();
                var dbHandler = new Twshdbandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@UserId", UserId);
                param[1] = new SqlParameter("@UserPassword", UserPassword);

                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_SET_ChangePassword", param);

                return Request.CreateResponse(HttpStatusCode.OK, dt);
            }
            catch (Exception ex)
            {

                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }


        [HttpGet, ActionName("ResetPassword")]
        public HttpResponseMessage ResetPassword(string UserName, string UserPassword)
        {
            try
            {
                HttpResponseMessage response = new HttpResponseMessage();
                var dbHandler = new Twshdbandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@UserName", UserName);
                param[1] = new SqlParameter("@UserPassword", UserPassword);

                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_SET_ResetPassword", param);

                return Request.CreateResponse(HttpStatusCode.OK, dt);
            }
            catch (Exception ex)
            {

                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }

        [HttpGet, ActionName("GetQualifiedExamData")]
        public HttpResponseMessage GetQualifiedExamData(String HallticketNo, int QualificationGradeId)
        {
            try
            {
                HttpResponseMessage response = new HttpResponseMessage();
                var dbHandler = new Twshdbandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@HallticketNo", HallticketNo);
                param[1] = new SqlParameter("@QualificationGradeId", QualificationGradeId);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_GET_QualificationData", param);
                return Request.CreateResponse(HttpStatusCode.OK, dt);
            }
            catch (Exception ex)
            {

                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }
        [HttpGet, ActionName("GetFeeDetails")]
        public HttpResponseMessage GetFeeDetails(String ApplicationNo)
        {
            try
            {
                HttpResponseMessage response = new HttpResponseMessage();
                var dbHandler = new Twshdbandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@ApplicationNumber", ApplicationNo);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_GET_FeePaymentDetailsLog", param);

                return Request.CreateResponse(HttpStatusCode.OK, dt);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }

        [HttpGet, ActionName("GetApplicationDetails")]
        public HttpResponseMessage GetApplicationDetails(String ApplicationNumber, String DOB)
        {
            try
            {
                HttpResponseMessage response = new HttpResponseMessage();
                var dbHandler = new Twshdbandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@ApplicationNumber", ApplicationNumber);
                param[1] = new SqlParameter("@DOB", DOB);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_GET_ApplicationNumberDetails", param);

                return Request.CreateResponse(HttpStatusCode.OK, dt);
            }
            catch (Exception ex)
            {

                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }


        [HttpGet, ActionName("GetStudentApplicationDetails")]
        public HttpResponseMessage GetStudentApplicationDetails(String ApplicationNumber)
        {
            try
            {
                HttpResponseMessage response = new HttpResponseMessage();
                var dbHandler = new Twshdbandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@ApplicationNumber", ApplicationNumber);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_GET_ApplicationNoDetails", param);

                return Request.CreateResponse(HttpStatusCode.OK, dt);
            }
            catch (Exception ex)
            {

                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }

        [HttpGet, ActionName("GetOtpAadhaarKyc")]
        public HttpResponseMessage GetOtpAadhaarKyc(String AadhaarNo)
        {
            try
            {
                HttpResponseMessage response = new HttpResponseMessage();
                byte[] bytes = Convert.FromBase64String(AadhaarNo);
                AadhaarNo = System.Text.Encoding.ASCII.GetString(bytes);
                var LicKey = ConfigurationManager.AppSettings["SLK"];
                var envKey = ConfigurationManager.AppSettings["AUA_ENV"].ToString();
                Environment env = 0;
                if (envKey == "PREPROD")
                {
                    env = Environment.PreProduction;
                }
                else if (envKey == "PRODUCTION")
                {
                    env = Environment.Production;
                }
                var res = AuaKuaHelper.GenerateOTP(AadhaarNo, "10", LicKey, env);
                return Request.CreateResponse(HttpStatusCode.OK, res);
            }
            catch (Exception ex)
            {

                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }

        [HttpGet]
        public async Task<HttpResponseMessage> GetKycResponse(string AadhaarNumber, string Otp, string TxnId)
        {
            try
            {
                HttpResponseMessage response = new HttpResponseMessage();
                byte[] aadharbytes = Convert.FromBase64String(AadhaarNumber);
                var AadhaarNo = System.Text.Encoding.ASCII.GetString(aadharbytes);
                var LicKey = ConfigurationManager.AppSettings["SLK"];
                var envKey = ConfigurationManager.AppSettings["AUA_ENV"].ToString();
                Environment env = 0;
                if (envKey == "PREPROD")
                {
                    env = Syntizen.Aadhaar.AUAKUA.Environment.PreProduction;
                }
                else if (envKey == "PRODUCTION")
                {
                    env = Syntizen.Aadhaar.AUAKUA.Environment.Production;
                }

                if (!string.IsNullOrWhiteSpace(Otp) && !string.IsNullOrWhiteSpace(AadhaarNo) && !string.IsNullOrWhiteSpace(TxnId))
                {
                    var data = AuaKuaHelper.KYCWithOTP(AadhaarNo, Otp, TxnId, LicKey, env);
                    var dataObj = JsonConvert.DeserializeObject<KycReq>(data);
                    if (dataObj.Ret == "y" && dataObj.Err == "000")
                    {
                        var bytes = Convert.FromBase64String(dataObj.ResponseXml);
                        var resXml = System.Text.Encoding.UTF8.GetString(bytes);
                        using (var stream = StringUtilities.GenerateStreamFromString(resXml))
                        {
                            XmlSerializer serializer = new XmlSerializer(typeof(KycRes));
                            var kycRes = (KycRes)serializer.Deserialize(stream);
                            if (kycRes.Ret == "Y")
                            {
                                return Request.CreateResponse(HttpStatusCode.OK, kycRes);
                            }
                            return Request.CreateResponse(HttpStatusCode.OK, false);
                        }

                    }
                }
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);

            }
            return Request.CreateResponse(HttpStatusCode.OK, false);
        }

        [HttpGet]
        public async Task<HttpResponseMessage> DoKyc(string AadhaarNumber, string Otp, string TxnId)
        {
            try
            {
                HttpResponseMessage response = new HttpResponseMessage();
                byte[] aadharbytes = Convert.FromBase64String(AadhaarNumber);
                var AadhaarNo = System.Text.Encoding.ASCII.GetString(aadharbytes);
                var LicKey = ConfigurationManager.AppSettings["SLK"];
                var envKey = ConfigurationManager.AppSettings["AUA_ENV"].ToString();
                Environment env = 0;
                if (envKey == "PREPROD")
                {
                    env = Syntizen.Aadhaar.AUAKUA.Environment.PreProduction;
                }
                else if (envKey == "PRODUCTION")
                {
                    env = Syntizen.Aadhaar.AUAKUA.Environment.Production;
                }

                if (!string.IsNullOrWhiteSpace(Otp) && !string.IsNullOrWhiteSpace(AadhaarNo) && !string.IsNullOrWhiteSpace(TxnId))
                {
                    var data = AuaKuaHelper.KYCWithOTP(AadhaarNo, Otp, TxnId, LicKey, env);
                    var dataObj = JsonConvert.DeserializeObject<KycReq>(data);
                    if (dataObj.Ret == "y" && dataObj.Err == "000")
                    {
                        var bytes = Convert.FromBase64String(dataObj.ResponseXml);
                        var resXml = System.Text.Encoding.UTF8.GetString(bytes);
                        using (var stream = StringUtilities.GenerateStreamFromString(resXml))
                        {
                            XmlSerializer serializer = new XmlSerializer(typeof(KycRes));
                            var kycRes = (KycRes)serializer.Deserialize(stream);
                            if (kycRes.Ret == "Y")
                            {
                                var dbHandler = new Twshdbandler();
                                var param = new SqlParameter[16];
                                param[0] = new SqlParameter("@Name", kycRes.UidData.Poi.Name);
                                param[1] = new SqlParameter("@Gender", kycRes.UidData.Poi.Gender);
                                param[2] = new SqlParameter("@DateOfBirth", kycRes.UidData.Poi.Dob);
                                param[3] = new SqlParameter("@Co", kycRes.UidData.Poa.Co);
                                param[4] = new SqlParameter("@Country", kycRes.UidData.Poa.Dist);
                                param[5] = new SqlParameter("@District", kycRes.UidData.Poa.Dist);
                                param[6] = new SqlParameter("@House", kycRes.UidData.Poa.House);
                                param[7] = new SqlParameter("@LandMark", kycRes.UidData.Poa.Lm);
                                param[8] = new SqlParameter("@Loc", kycRes.UidData.Poa.Loc);
                                param[9] = new SqlParameter("@PinCode", kycRes.UidData.Poa.Pc);
                                param[10] = new SqlParameter("@PostOffice", kycRes.UidData.Poa.Po);
                                param[11] = new SqlParameter("@State", kycRes.UidData.Poa.State);
                                param[12] = new SqlParameter("@Street", kycRes.UidData.Poa.Street);
                                param[13] = new SqlParameter("@SubDist", kycRes.UidData.Poa.Subdist);
                                param[14] = new SqlParameter("@Vtc", kycRes.UidData.Poa.Vtc);
                                param[15] = new SqlParameter("@Aadhaar", AadhaarNo);
                                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_SET_StudentAadhaarDetails", param);

                                return Request.CreateResponse(HttpStatusCode.OK, true);
                            }
                            return Request.CreateResponse(HttpStatusCode.OK, false);
                        }

                    }
                }
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);

            }
            return Request.CreateResponse(HttpStatusCode.OK, false);
        }



        [HttpGet, ActionName("GetDetailsByMobile")]
        public HttpResponseMessage GetDetailsByMobile(String PhoneNumber, String DOB)
        {
            try
            {
                HttpResponseMessage response = new HttpResponseMessage();
                var dbHandler = new Twshdbandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@PhoneNumber", PhoneNumber);
                param[1] = new SqlParameter("@DOB", DOB);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_GET_StudentPhoneNumberDetails", param);

                return Request.CreateResponse(HttpStatusCode.OK, dt);
            }
            catch (Exception ex)
            {

                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }


        [HttpGet, ActionName("GetStudentDetailsByMobile")]
        public HttpResponseMessage GetStudentDetailsByMobile(String PhoneNumber)
        {
            try
            {
                HttpResponseMessage response = new HttpResponseMessage();
                var dbHandler = new Twshdbandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@PhoneNumber", PhoneNumber);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_GET_StudentMobileNumberDetails", param);

                return Request.CreateResponse(HttpStatusCode.OK, dt);
            }
            catch (Exception ex)
            {

                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }



        [HttpGet, ActionName("GetFeeNotpaidList")]
        public HttpResponseMessage GetFeeNotpaidList(int UserId, int GradeId,int datatype)
        {
            try
            {
                HttpResponseMessage response = new HttpResponseMessage();
                var dbHandler = new Twshdbandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@UserId", UserId);
                param[1] = new SqlParameter("@GradeId", GradeId);
                param[2] = new SqlParameter("@datatype", datatype);

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_GET_FeeNotPaidDetails", param);

                return Request.CreateResponse(HttpStatusCode.OK, dt);
            }
            catch (Exception ex)
            {

                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }

        [HttpGet, ActionName("GetExamCenterAppliedStudents")]
        public HttpResponseMessage GetExamCenterAppliedStudents(int UserId)
        {
            try
            {
                HttpResponseMessage response = new HttpResponseMessage();
                var dbHandler = new Twshdbandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@UserId", UserId);

                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_GET_ExaminationCenterAppliedStudentsReports", param);

                return Request.CreateResponse(HttpStatusCode.OK, dt);
            }
            catch (Exception ex)
            {

                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }
        [HttpGet, ActionName("GetApprovedList")]
        public HttpResponseMessage GetApprovedList(int UserId, int CourseId, int LanguageId, int GradeId, int ExamBatch,int DataType)
        {
            try
            {
                HttpResponseMessage response = new HttpResponseMessage();
                var dbHandler = new Twshdbandler();
                var param = new SqlParameter[6];
                param[0] = new SqlParameter("@UserId", UserId);
                param[1] = new SqlParameter("@CourseId", CourseId);
                param[2] = new SqlParameter("@LanguageId", LanguageId);
                param[3] = new SqlParameter("@GradeId", GradeId);
                param[4] = new SqlParameter("@ExamBatch", ExamBatch);
                param[5] = new SqlParameter("@DataType", DataType);
                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_GET_NeedToAprooveList", param);
                return Request.CreateResponse(HttpStatusCode.OK, dt);
            }
            catch (Exception ex)
            {

                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }
        [HttpGet, ActionName("GetApprovedStudent ")]
        public HttpResponseMessage GetApprovedStudent(int UserId)
        {
            try
            {
                HttpResponseMessage response = new HttpResponseMessage();
                var dbHandler = new Twshdbandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@UserId", UserId);

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_SET_ApproveStudentEligibility", param);
                return Request.CreateResponse(HttpStatusCode.OK, dt);
            }
            catch (Exception ex)
            {

                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }

        [HttpGet, ActionName("GetNeedToApproveDetails")]
        public HttpResponseMessage GetNeedToApproveDetails(int Id)
        {
            try
            {
                HttpResponseMessage response = new HttpResponseMessage();
                var dbHandler = new Twshdbandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@Id", Id);

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_GET_NeedToAprooveStudentDetails", param);

                return Request.CreateResponse(HttpStatusCode.OK, dt);
            }
            catch (Exception ex)
            {

                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }


        [HttpGet, ActionName("DeleteTwshExamCenter")]
        public HttpResponseMessage DeleteTwshExamCenter(int Id)
        {
            try
            {
                HttpResponseMessage response = new HttpResponseMessage();
                var dbHandler = new Twshdbandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@Id", Id);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("USP_Delete_TwshExamCenter", param);
                return Request.CreateResponse(HttpStatusCode.OK, dt);
            }
            catch (Exception ex)
            {

                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }

        [HttpGet, ActionName("DeleteGradewiseExamCenters")]
        public HttpResponseMessage DeleteGradewiseExamCenters(int Id)
        {
            try
            {
                HttpResponseMessage response = new HttpResponseMessage();
                var dbHandler = new Twshdbandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@Id", Id);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("USP_Delete_GradeWiseExamCenters", param);
                return Request.CreateResponse(HttpStatusCode.OK, dt);
            }
            catch (Exception ex)
            {

                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }

        [HttpGet, ActionName("SetTwshExamCenter")]
        public HttpResponseMessage SetTwshExamCenter(string CenterCode,string CenterName,string CenterAddress,int DistrictId,int IsTw,int IsSh,int IsTwOnline,int IsShOnline,int GenderId)
        {
            try
            {
                HttpResponseMessage response = new HttpResponseMessage();
                var dbHandler = new Twshdbandler();
                var param = new SqlParameter[9];
                param[0] = new SqlParameter("@CenterCode", CenterCode);
                param[1] = new SqlParameter("@CenterName", CenterName);
                param[2] = new SqlParameter("@CenterAddress", CenterAddress);
                param[3] = new SqlParameter("@DistrictId", DistrictId);
                param[4] = new SqlParameter("@IsTw", IsTw);
                param[5] = new SqlParameter("@IsSh", IsSh);
                param[6] = new SqlParameter("@IsTwOnline", IsTwOnline);
                param[7] = new SqlParameter("@IsShOnline", IsShOnline);
                param[8] = new SqlParameter("@GenderId", GenderId);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("USP_Set_TwshExamCenter", param);
                return Request.CreateResponse(HttpStatusCode.OK, dt);
            }
            catch (Exception ex)
            {

                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }

        [HttpGet, ActionName("GetStudentHallTicket")]
        public HttpResponseMessage GetStudentHallTicket(string ApplicationNo, string DateofBirth)
        {
            try
            {
                HttpResponseMessage response = new HttpResponseMessage();
                var dbHandler = new Twshdbandler();
                TwshServices TwshServices = new TwshServices();
                var dt = TwshServices.GetStudentHallTicket(dbHandler, ApplicationNo, DateofBirth);

                return Request.CreateResponse(HttpStatusCode.OK, dt);
            }
            catch (Exception ex)
            {

                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }

        [HttpGet, ActionName("ApproveDetails")]
        public async Task<HttpResponseMessage> ApproveDetails(int ApprovedStatus, int Id, string examDate, string RejectedRemarks,string ReleasedRemarks)

        {
            try
            {
                HttpResponseMessage response = new HttpResponseMessage();
                var dbHandler = new Twshdbandler();
                var param = new SqlParameter[5];
                param[0] = new SqlParameter("@ApprovedStatus", ApprovedStatus);
                param[1] = new SqlParameter("@Id", Id);
                param[2] = new SqlParameter("@examDate", examDate);
                param[3] = new SqlParameter("@RejectedRemarks", RejectedRemarks);
                param[4] = new SqlParameter("@ReleasedRemarks", ReleasedRemarks);
                var ds = dbHandler.ReturnDataWithStoredProcedure("SP_SET_ApproveStudentEligibility", param);
                if (!string.IsNullOrWhiteSpace(examDate))
                {
                    if (ds.Tables.Count > 0 && ds.Tables[1].Rows.Count > 0)
                    {
                        try
                        {
                            var sid = ds.Tables[1].Rows[0]["StudentId"].ToString();
                            var username = ds.Tables[1].Rows[0]["ApplicationNumber"].ToString();
                            var name = ds.Tables[1].Rows[0]["StudentName"].ToString();
                            var phone = ds.Tables[1].Rows[0]["StudentPhoneNumber"].ToString();
                            var email = ds.Tables[1].Rows[0]["EmailId"].ToString();
                            var aadhaar = ds.Tables[1].Rows[0]["AadhaarNumber"].ToString();
                            var examDate2 = ds.Tables[1].Rows[0]["SelectedOnlineExamDate"].ToString();
                            var gradeCode = ds.Tables[1].Rows[0]["GradeCode"].ToString();
                            var url = ConfigurationManager.AppSettings["TwshExamApi"].ToString().Trim('/') + "/Sso/AddUser";
                            var user = new TwshUserModel
                            {
                                StudentId = int.Parse(sid),
                                Username = username,
                                Name = name,
                                PhoneNumber = phone,
                                Email = email,
                                AadhaarNumber = aadhaar,
                                Password = Guid.NewGuid().ToString().Substring(0, 5).ToUpper(),
                                ExamDate = examDate2,
                                GradeCode = gradeCode
                            };
                            var msgusrname = user.Name.Substring(0, user.Name.IndexOf(" "));
                            using (var client = new HttpClient())
                            {
                                await client.PostAsJsonAsync(url, user);
                                var cc = new CommunicationController();
                                string Msg = "{0}, Your application for {1} Exam is scheduled on {2} hrs. Please login to https://sbtet.telangana.gov.in/TwshCbt using username: {3}, password: {4} to practice and attend the Exam with Aadhaar Card Secretary, SBTET TS.";
                                var Message = string.Format(Msg, user.Name, user.GradeCode, user.ExamDate, user.Username,"twshcbt");
                                cc.SendSms(user.PhoneNumber,Message,"1007162694676451620");
                                cc.SendSms(user.PhoneNumber, $"{HttpUtility.UrlEncode(msgusrname)}, Your application for {user.GradeCode} Examination is scheduled on {HttpUtility.UrlEncode(user.ExamDate)} hrs. Please login to https://sbtet.telangana.gov.in/TwshCbt using username: {user.Username}, password: twshcbt to practice for the exam. Attend the Examination with Aadhaar Card Secretary, SBTET TS.", "1007161889732982505");
                            }
                        }
                        catch (Exception ex)
                        {

                        }
                    }
                }
                return Request.CreateResponse(HttpStatusCode.OK, ds.Tables[0]);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }
        [HttpGet, ActionName("RescheduleCbtExamDetails")]
        public async Task<HttpResponseMessage> RescheduleCbtExamDetails(int Id, string examDate)
        {
            try
            {
                HttpResponseMessage response = new HttpResponseMessage();
                var dbHandler = new Twshdbandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@Id", Id);
                param[1] = new SqlParameter("@examDate", examDate);
                var ds = dbHandler.ReturnDataWithStoredProcedure("USP_SET_TwshCBTReschedule", param);
               
                return Request.CreateResponse(HttpStatusCode.OK, ds);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }

        [HttpGet, ActionName("AbsentExam")]
        public async Task<HttpResponseMessage> AbsentExam(int Id)
        {
            try
            {
                HttpResponseMessage response = new HttpResponseMessage();
                var dbHandler = new Twshdbandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@Id", Id);
                var ds = dbHandler.ReturnDataWithStoredProcedure("USP_SET_TwshCBTAbsent", param);

                return Request.CreateResponse(HttpStatusCode.OK, ds);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }


        [HttpPost, ActionName("UpdateTwshPhotoData")]
        public async Task<HttpResponseMessage> UpdateTwshPhotoData([FromBody] JsonObject request)
        {
            try
            {
                HttpResponseMessage response = new HttpResponseMessage();
                var dbHandler = new Twshdbandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@StudentId", request["StudentId"]);
                param[1] = new SqlParameter("@Photo", request["Photo"]);
                var ds = dbHandler.ReturnDataWithStoredProcedure("USP_SET_TwshPhotoData", param);

                return Request.CreateResponse(HttpStatusCode.OK, ds);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }

        [HttpGet, ActionName("TwshExamCenterStrengthReport")]
        public HttpResponseMessage TwshExamCenterStrengthReport(int ExamMode)
        {
            try
            {
                HttpResponseMessage response = new HttpResponseMessage();
                var dbHandler = new Twshdbandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@Exammode", ExamMode);
                DataTable dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_GET_ExamCenterwiseStrength", param);
                return Request.CreateResponse(HttpStatusCode.OK, dt);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }


        [HttpGet, ActionName("SetExamSession")]
        public HttpResponseMessage SetExamSession(int ExamMonthYearId,DateTime TwDate1, DateTime TwDate2, DateTime ShDate1, DateTime ShDate2)
        {
            try
            {
                HttpResponseMessage response = new HttpResponseMessage();
                var dbHandler = new Twshdbandler();
                var param = new SqlParameter[5];
                param[0] = new SqlParameter("@ExamMonthYearId", ExamMonthYearId);
                param[1] = new SqlParameter("@TwDate1", TwDate1);
                param[2] = new SqlParameter("@TwDate2", TwDate2);
                param[3] = new SqlParameter("@ShDate1", ShDate1);
                param[4] = new SqlParameter("@ShDate2", ShDate2);
                DataTable dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_SET_ExamsDates", param);
                return Request.CreateResponse(HttpStatusCode.OK, dt);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }
        
          
        [HttpGet, ActionName("GetExamMonthYearForTwshOdc")]
        public HttpResponseMessage GetExamMonthYearForTwshOdc()
        {
            try
            {
                HttpResponseMessage response = new HttpResponseMessage();
                var dbHandler = new Twshdbandler();              
                DataTable dt = dbHandler.ReturnData("USP_GETExamMonthYearForTWSHODC");
                return Request.CreateResponse(HttpStatusCode.OK, dt);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }

        [HttpGet, ActionName("GetTwshExamDatesBatches")]
        public HttpResponseMessage GetTwshExamDatesBatches()
        {
            try
            {
                HttpResponseMessage response = new HttpResponseMessage();
                var dbHandler = new Twshdbandler();
                DataTable dt = dbHandler.ReturnData("USP_GET_TWSH_DatesBatches");
                return Request.CreateResponse(HttpStatusCode.OK, dt);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }

        [HttpGet, ActionName("getExamTimeSlots")]
        public HttpResponseMessage getExamTimeSlots(int AcademicYearID,int ExamMonthYearID)
        {
            try
            {
                HttpResponseMessage response = new HttpResponseMessage();
                var dbHandler = new Twshdbandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@AcademicYearID", AcademicYearID);
                param[1] = new SqlParameter("@ExamMonthYearID", ExamMonthYearID);
                DataSet dt = dbHandler.ReturnDataWithStoredProcedure("TWSH_GET_Grade_Batch_Time", param);
                return Request.CreateResponse(HttpStatusCode.OK, dt);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }
        

        private void CreateIfMissing(string path)
        {
            bool folderExists = Directory.Exists(path);
            if (!folderExists)
                Directory.CreateDirectory(path);
        }

        [HttpGet, ActionName("GetTwshPrinterOdcDownload")]
        public string GetTwshPrinterOdcDownload(string ExamMonthYear)
        {
            try
            {
                var dbHandler = new Twshdbandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@emyr", ExamMonthYear);
                DataSet ds = dbHandler.ReturnDataWithStoredProcedure("USP_GET_TWSHODCDataByExamMonthYear", param);
                var path = ConfigurationManager.AppSettings["TwshOdcStudentPhotos"].ToString();
                CreateIfMissing(path);

                var TwshOdcData = DataTableHelper.ConvertDataTable<OdcData>(ds.Tables[0]);
                var Photos = TwshOdcData.Select(x => new { x.ROLL_NO,x.PHOTO_NAME }).Distinct().ToList();
                foreach (var stu in Photos)
                {
                    if (!File.Exists(path + "\\" + stu.PHOTO_NAME + ".jpg"))
                    {
                        var param1 = new SqlParameter[1];
                        param1[0] = new SqlParameter("@RollNo", stu.ROLL_NO);
                        DataSet ds1 = dbHandler.ReturnDataWithStoredProcedure("USP_GET_PhotoForTWSHODC", param1);                      
                        if (ds1.Tables[0].Rows[0]["ResponceCode"].ToString() == "200")
                        {
                            var base64photo = ds1.Tables[1].Rows[0]["Photo"].ToString().Replace("data:image/png;base64,", "").Replace("data:image/jpeg;base64,", "");
                            byte[] imageBytes = Convert.FromBase64String(base64photo);
                            File.WriteAllBytes(path + "\\" + stu.PHOTO_NAME + ".jpg", imageBytes);

                        }
                    }
                }
                GenerateTwshOdc GenerateTwshOdcData = new GenerateTwshOdc();
                return GenerateTwshOdcData.GetOdcData(ds);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpGet, ActionName("GetTwshPrinterNrDownload")]
        public string GetTwshPrinterNrDownload(int ExamMonthYearId)
        {
            try
            {
                var dbHandler = new Twshdbandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@ExamMonthYearId", ExamMonthYearId);
                DataSet ds = dbHandler.ReturnDataWithStoredProcedure("ADM_Genereate_TWSH_NR", param);
                var path = ConfigurationManager.AppSettings["TwshStudentPhotos"].ToString();
                CreateIfMissing(path);
                if (ds.Tables[0] != null &&  ds.Tables[0].Rows.Count > 0) { 
                    var TwshNRData = DataTableHelper.ConvertDataTable<PrinterNrData>(ds.Tables[0]);
                var Photos = TwshNRData.Select(x => new { x.ApplicationNumber }).Distinct().ToList();
                foreach (var stu in Photos)
                {
                    if (!File.Exists(path + "\\" + stu.ApplicationNumber + ".jpg"))
                    {
                        var param1 = new SqlParameter[1];
                        param1[0] = new SqlParameter("@ApplicationNo", stu.ApplicationNumber);
                        DataSet ds1 = dbHandler.ReturnDataWithStoredProcedure("USP_GET_PhotoForTWSHPrinterNr", param1);
                            if (ds1.Tables[0] != null &&  ds1.Tables[0].Rows.Count > 0)
                            {
                                if (ds1.Tables[0].Rows[0]["ResponceCode"].ToString() == "200")
                        {
                           
                                if (ds1.Tables[1] != null &&  ds1.Tables[1].Rows.Count > 0) {
                                var base64photo = ds1.Tables[1].Rows[0]["Photo"].ToString().Replace("data:image/png;base64,", "").Replace("data:image/jpeg;base64,", "");
                                byte[] imageBytes = Convert.FromBase64String(base64photo);
                                File.WriteAllBytes(path + "\\" + stu.ApplicationNumber + ".jpg", imageBytes);
                                    }
                                }
                        }
                    }
                }
                }
                GenerateTwshPrinterNr GenerateTwshPrinterNrData = new GenerateTwshPrinterNr();
                return GenerateTwshPrinterNrData.GeneratePrinterNr(ds);
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



        [HttpGet, ActionName("TwshGradewiseExamCentersExcel")]
        public string TwshGradewiseExamCentersExcel()
        {
            try
            {
                var dbHandler = new Twshdbandler();
                DataSet ds = dbHandler.ReturnDataSet("TWSH_GET_GradewiseExamCenters");
                var filename = "TwshGradewiseExamCenters" +  ".xlsx";
                var eh = new ExcelHelper();
                var path = ConfigurationManager.AppSettings["DownloadsFolderPath"];
                DataSet excelds = new DataSet();
                excelds.Tables.Add(ds.Tables[0].Copy());
                bool folderExists = Directory.Exists(path);
                if (!folderExists)
                    Directory.CreateDirectory(path);
                eh.ExportDataSet(excelds, path + filename);
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

  

        [HttpGet, ActionName("TwshExamCenterStrengthXlsxReport")]
        public string TwshExamCenterStrengthXlsxReport(int ExamMode)
        {
            try
            {
                var dbHandler = new Twshdbandler();
                string StrQuery = "SP_GET_ExamCenterwiseStrength ";
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@Exammode ", ExamMode);
                DataSet ds = dbHandler.ReturnDataWithStoredProcedure(StrQuery, param);
                var filename = "TwshExamCenterStrengtReport" + Guid.NewGuid().ToString() + ".xlsx";
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
                return ex.Message + "\n-----------\n" + ex.StackTrace;
            }
        }

       


        [HttpGet, ActionName("GetUserTypes")]
        public object GetUserTypes()
        {
            try
            {
                var db = new Twshdbandler();
                var res = db.ReturnData("SP_GET_UserTypes");
                return res;
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }


    
        

        [HttpPost, ActionName("GetSSCDetails")]
        public async Task<HttpResponseMessage> GetSSCDetails([FromBody] SscDetails ReqData)
        {

            var url = ConfigurationManager.AppSettings["SSC_API"].ToString();
            var urlwithparam = url + "?RollNo=" + ReqData.RollNo + "&Year=" + ReqData.Year + "&Stream=" + ReqData.Stream + "&channel=SBTT&password=S2T20";
            using (HttpClient client = new HttpClient())
            {
                try
                {
                    HttpResponseMessage response = new HttpResponseMessage();
                    var resMsg = await client.GetAsync(urlwithparam);
                    var content = await resMsg.Content.ReadAsStringAsync();
                    XmlDocument PIDResponseXML = new XmlDocument();
                    PIDResponseXML.LoadXml(content);
                    if (PIDResponseXML.InnerXml.Length != 22)
                    {
                        var ROLLNO = string.Empty;
                        var NAME = string.Empty;
                        var FNAME = string.Empty;
                        var MNAME = string.Empty;
                        var DOB = string.Empty;
                        var SEX = string.Empty;
                        var RESULT = string.Empty;
                        try
                        {
                            ROLLNO = PIDResponseXML["NewDataSet"]["Table"]["ROLLNO"].InnerText;
                            NAME = PIDResponseXML["NewDataSet"]["Table"]["NAME"].InnerText == null || PIDResponseXML["NewDataSet"]["Table"]["NAME"].InnerText == "-" ? null : PIDResponseXML["NewDataSet"]["Table"]["NAME"].InnerText;
                            FNAME = PIDResponseXML["NewDataSet"]["Table"]["FNAME"].InnerText == null || PIDResponseXML["NewDataSet"]["Table"]["FNAME"].InnerText == "-" ? null : PIDResponseXML["NewDataSet"]["Table"]["FNAME"].InnerText;
                            MNAME = PIDResponseXML["NewDataSet"]["Table"]["MNAME"].InnerText == null || PIDResponseXML["NewDataSet"]["Table"]["MNAME"].InnerText == "-" ? null : PIDResponseXML["NewDataSet"]["Table"]["MNAME"].InnerText;
                            DOB = PIDResponseXML["NewDataSet"]["Table"]["DOB"].InnerText == null || PIDResponseXML["NewDataSet"]["Table"]["DOB"].InnerText == "-" ? null : PIDResponseXML["NewDataSet"]["Table"]["DOB"].InnerText;
                            SEX = PIDResponseXML["NewDataSet"]["Table"]["SEX"].InnerText == null || PIDResponseXML["NewDataSet"]["Table"]["SEX"].InnerText == "-" ? null : PIDResponseXML["NewDataSet"]["Table"]["SEX"].InnerText;
                            if (ReqData.Year !="2024")
                            {
                                RESULT = PIDResponseXML["NewDataSet"]["Table"]["RESULT"].InnerText;
                            }
                             
                        }
                        catch (Exception ex)
                        {
                            ROLLNO = PIDResponseXML["NewDataSet"]["Table"]["ROLLNO"].InnerText;
                            NAME = PIDResponseXML["NewDataSet"]["Table"]["NAME"].InnerText == null || PIDResponseXML["NewDataSet"]["Table"]["NAME"].InnerText == "-" ? null : PIDResponseXML["NewDataSet"]["Table"]["NAME"].InnerText;
                            FNAME = PIDResponseXML["NewDataSet"]["Table"]["FNAME"].InnerText == null || PIDResponseXML["NewDataSet"]["Table"]["FNAME"].InnerText == "-" ? null : PIDResponseXML["NewDataSet"]["Table"]["FNAME"].InnerText;
                            MNAME = PIDResponseXML["NewDataSet"]["Table"]["MNAME"].InnerText == null || PIDResponseXML["NewDataSet"]["Table"]["MNAME"].InnerText == "-" ? null : PIDResponseXML["NewDataSet"]["Table"]["MNAME"].InnerText;
                            DOB = PIDResponseXML["NewDataSet"]["Table"]["DOB"].InnerText == null || PIDResponseXML["NewDataSet"]["Table"]["DOB"].InnerText == "-" ? null : PIDResponseXML["NewDataSet"]["Table"]["DOB"].InnerText;
                            SEX = "-";
                            if (ReqData.Year != "2024")
                            {
                                RESULT = PIDResponseXML["NewDataSet"]["Table"]["RESULT"].InnerText;
                            }
                        }
                        if (ReqData.Year == "2024")
                        {
                            response = Request.CreateResponse(HttpStatusCode.OK);
                            response.Content = new StringContent(JsonConvert.SerializeObject("{\"Status\" : \"200\",\"RollNo\":\"" + ROLLNO + "\",\"Name\" : \"" + NAME + "\",\"FatherName\" : \"" + FNAME + "\",\"MotherName\" : \"" + MNAME + "\",\"DateOfBirth\" : \"" + DOB + "\",\"Sex\" : \"" + SEX + "\"}"), System.Text.Encoding.UTF8, "application/json");
                            return response;
                        }
                        else
                        {
                            if (RESULT == "PASS")
                            {
                                response = Request.CreateResponse(HttpStatusCode.OK);
                                response.Content = new StringContent(JsonConvert.SerializeObject("{\"Status\" : \"200\",\"RollNo\":\"" + ROLLNO + "\",\"Name\" : \"" + NAME + "\",\"FatherName\" : \"" + FNAME + "\",\"MotherName\" : \"" + MNAME + "\",\"DateOfBirth\" : \"" + DOB + "\",\"Sex\" : \"" + SEX + "\"}"), System.Text.Encoding.UTF8, "application/json");
                                return response;
                            }
                            else
                            {
                                response = Request.CreateResponse(HttpStatusCode.OK);
                                response.Content = new StringContent(JsonConvert.SerializeObject("{\"Status\" : \"404\",\"RollNo\":\"" + ROLLNO + "\",\"Name\" : \"" + NAME + "\",\"FatherName\" : \"" + FNAME + "\",\"MotherName\" : \"" + MNAME + "\",\"DateOfBirth\" : \"" + DOB + "\",\"Sex\" : \"" + SEX + "\"}"), System.Text.Encoding.UTF8, "application/json");
                                return response;
                            }
                        }
                           
                    }
                    else
                    {
                        response = Request.CreateResponse(HttpStatusCode.OK);
                        response.Content = new StringContent(JsonConvert.SerializeObject("{\"Status\" : \"404\",\"Response\" : \"No Data Found\" }"), System.Text.Encoding.UTF8, "application/json");
                        return response;
                    }

                }
                catch (Exception ex)
                {
                    var response = Request.CreateResponse(HttpStatusCode.NotFound);
                    response.Content = new StringContent(JsonConvert.SerializeObject("{\"Status\" : \"404\",\"Response\" : \"" + ex + "\" }"), System.Text.Encoding.UTF8, "application/json");
                    return response;                  
                }

            }
        }


        [HttpPost, ActionName("SendBulkSms")]
        public string TwshSendBulkSms()
        {
            try
            {
                var url = ConfigurationManager.AppSettings["SMS_URL"].ToString();
                var smsusername = ConfigurationManager.AppSettings["SMS_Service_Username"].ToString();
                var smspassword = ConfigurationManager.AppSettings["SMS_Service_Password"].ToString();
                var message = ConfigurationManager.AppSettings["SMS_Common_Message"].ToString();
                var dbHandler = new Twshdbandler();
                DataTable dt = new DataTable();
                dt = dbHandler.ReturnData("SP_GET_SMSData");
                var SmslogFile = ConfigurationManager.AppSettings["SmslogFile"].ToString();
                string restime = DateTime.Now.ToString("dddd, dd MMMM yyyy HH:mm:ss").Replace(":", ".");
                //List<SmsData> SmsDataList = dt.DataTableToList<SmsData>().ToList();
                int size = dt.Rows.Count;
                for (int i = 0; i < size; i++)
                {
                    Console.WriteLine(dt.Rows[i]["StudentPhoneNumber"]);
                    var mobile = dt.Rows[i]["StudentPhoneNumber"];
                    //TODO: add Log to Mongo DB
                    //using (StreamWriter writer = new StreamWriter(SmslogFile, true))
                    //{
                    //    writer.WriteLine("---Bulk Sms request log ----------time " + restime);
                    //    writer.WriteLine(mobile + "------message--" + message);
                    //}

                    var client = new RestClient();
                    var req = new RestRequest(url);
                    req.Method = Method.GET;

                    req.AddQueryParameter("username", smsusername);
                    req.AddQueryParameter("pin", smspassword);
                    req.AddQueryParameter("mnumber", $"91{mobile}");
                    req.AddQueryParameter("message", message);
                    req.AddQueryParameter("signature", "TSGOVT");
                    var res = client.Get(req);

                    //TODO: add Log to Mongo DB
                    //using (StreamWriter writer = new StreamWriter(SmslogFile, true))
                    //{
                    //    writer.WriteLine("---Bulk Sms response log ----------time " + restime);
                    //    writer.WriteLine(res.Content);
                    //}
                    //  return res.Content;
                }



                // var url = "http://smsgw.sms.gov.in/failsafe/HttpLink";

                //foreach (int items in a_array)
                //{
                //    var client = new RestClient();
                //    var req = new RestRequest(url);
                //    req.Method = Method.GET;
                //    req.AddQueryParameter("username", smsusername);
                //    req.AddQueryParameter("pin", smspassword);
                //    req.AddQueryParameter("mnumber", "91{mobile}");
                //    req.AddQueryParameter("message", message);
                //    req.AddQueryParameter("signature", "TSGOVT");
                //    var res = client.Get(req);
                //    return res.Content;
                //}

                return "All sms sent successfully";


                // return Request.CreateResponse(HttpStatusCode.OK, dt);
            }
            catch (Exception ex)
            {

                return ex.Message;
            }
        }

        [HttpPost, ActionName("SetTwshExamDates")]
        public string SetTwshExamDates([FromBody] JsonObject request)
        {

            try
            {
                var db = new Twshdbandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@json", request["json"]);              
                var dt = db.ReturnDataWithStoredProcedureTable("USP_SET_TWSH_DatesBatches", param);
                //HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpPost, ActionName("UpdateTwshExamDates")]
        public string UpdateTwshExamDates([FromBody] JsonObject request)
        {

            try
            {
             
                var db = new Twshdbandler();
                var param = new SqlParameter[6];
                param[0] = new SqlParameter("@ExamDate", request["ExamDate"]);
                param[1] = new SqlParameter("@ExamMonthYearId", request["ExamMonthYearId"]);
                param[2] = new SqlParameter("@CourseId", request["CourseId"]); 
                param[3] = new SqlParameter("@BatchNumber", request["BatchNumber"]);
                param[4] = new SqlParameter("@BatchId", request["BatchId"]);
                param[5] = new SqlParameter("@Id", request["Id"]);
                var dt = db.ReturnDataWithStoredProcedureTable("USP_Update_TWSH_DatesBatches", param);
                //HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpPost, ActionName("UpdateGradewiseExamCenters")]
        public string UpdateGradewiseExamCenters([FromBody] JsonObject request)
        {

            try
            {              
                var db = new Twshdbandler();
                var param = new SqlParameter[27];                
                param[0] = new SqlParameter("@ExamCenterId", request["ExamCenterId"]);
                param[1] = new SqlParameter("@TEL", request["TEL"]);
                param[2] = new SqlParameter("@TEH", request["TEH"]);
                param[3] = new SqlParameter("@TEHS", request["TEHS"]);
                param[4] = new SqlParameter("@TTL", request["TTL"]);
                param[5] = new SqlParameter("@TTH", request["TTH"]);
                param[6] = new SqlParameter("@TTHS", request["TTHS"]);
                param[7] = new SqlParameter("@THL", request["THL"]);
                param[8] = new SqlParameter("@THH", request["THH"]);
                param[9] = new SqlParameter("@TUL", request["TUL"]);
                param[10] = new SqlParameter("@TUH", request["TUH"]);
                param[11] = new SqlParameter("@SEL", request["SEL"]);
                param[12] = new SqlParameter("@SEI", request["SEI"]);
                param[13] = new SqlParameter("@SEH", request["SEH"]);
                param[14] = new SqlParameter("@SEHS150", request["SEHS150"]);
                param[15] = new SqlParameter("@SEHS180", request["SEHS180"]);
                param[16] = new SqlParameter("@SEHS200", request["SEHS200"]);
                param[17] = new SqlParameter("@STL", request["STL"]);
                param[18] = new SqlParameter("@STH", request["STH"]);
                param[19] = new SqlParameter("@STHS80", request["STHS80"]);
                param[20] = new SqlParameter("@STHS100", request["STHS100"]);
                param[21] = new SqlParameter("@SUL", request["SUL"]);
                param[22] = new SqlParameter("@SUH", request["SUH"]);
                param[23] = new SqlParameter("@TEJ", request["TEJ"]);
                param[24] = new SqlParameter("@DataTypeId", request["DataTypeId"]);
                param[25] = new SqlParameter("@IsActive", request["IsActive"]);
                param[26] = new SqlParameter("@Id", request["Id"]);
                var dt = db.ReturnDataWithStoredProcedureTable("TWSH_Update_GradewiseExamCenters", param);
                //HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpPost, ActionName("AddGradewiseExamCenters")]
        public string AddGradewiseExamCenters([FromBody] JsonObject request)
        {

            try
            {
                var db = new Twshdbandler();
                var param = new SqlParameter[25];
                param[0] = new SqlParameter("@ExamCenterId", request["ExamCenterId"]);
                param[1] = new SqlParameter("@TEL", request["TEL"]);
                param[2] = new SqlParameter("@TEH", request["TEH"]);
                param[3] = new SqlParameter("@TEHS", request["TEHS"]);
                param[4] = new SqlParameter("@TTL", request["TTL"]);
                param[5] = new SqlParameter("@TTH", request["TTH"]);
                param[6] = new SqlParameter("@TTHS", request["TTHS"]);
                param[7] = new SqlParameter("@THL", request["THL"]);
                param[8] = new SqlParameter("@THH", request["THH"]);
                param[9] = new SqlParameter("@TUL", request["TUL"]);
                param[10] = new SqlParameter("@TUH", request["TUH"]);
                param[11] = new SqlParameter("@SEL", request["SEL"]);
                param[12] = new SqlParameter("@SEI", request["SEI"]);
                param[13] = new SqlParameter("@SEH", request["SEH"]);
                param[14] = new SqlParameter("@SEHS150", request["SEHS150"]);
                param[15] = new SqlParameter("@SEHS180", request["SEHS180"]);
                param[16] = new SqlParameter("@SEHS200", request["SEHS200"]);
                param[17] = new SqlParameter("@STL", request["STL"]);
                param[18] = new SqlParameter("@STH", request["STH"]);
                param[19] = new SqlParameter("@STHS80", request["STHS80"]);
                param[20] = new SqlParameter("@STHS100", request["STHS100"]);
                param[21] = new SqlParameter("@SUL", request["SUL"]);
                param[22] = new SqlParameter("@SUH", request["SUH"]);
                param[23] = new SqlParameter("@TEJ", request["TEJ"]);
                param[24] = new SqlParameter("@DataTypeId", request["DataTypeId"]);
                var dt = db.ReturnDataWithStoredProcedureTable("TWSH_Update_GradewiseExamCenters", param);
                //HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }



        [HttpPost, ActionName("SubmitTwshApplication")]
        public async Task<object> SubmitTwshApplication([FromBody] StudentDetails ReqData)
        {
            HttpResponseMessage response = new HttpResponseMessage();
            try
            {
                var db = new Twshdbandler();
                string encriptedaadhar = "";

                var res = ReqData.Aadhaar.Split(new string[] { "$$@@$$" }, StringSplitOptions.None);
                var crypt = new HbCrypt(res[1]);
                var aadharencrypt = new HbCrypt();
                string aadhar = crypt.AesDecrypt(res[0]);
                string decryptaadhar = aadharencrypt.AesDecrypt(aadhar);
                encriptedaadhar = aadharencrypt.Encrypt(decryptaadhar);
                var param = new SqlParameter[30];
                param[0] = new SqlParameter("@UserId", ReqData.UserId);
                param[1] = new SqlParameter("@StudentName", ReqData.StudentName);
                param[2] = new SqlParameter("@FatherName", ReqData.FatherName);
                param[3] = new SqlParameter("@MotherName", ReqData.MotherName);
                param[4] = new SqlParameter("@Gender", ReqData.Gender);
                param[5] = new SqlParameter("@StudentPhoneNumber", ReqData.StudentPhoneNumber);
                param[6] = new SqlParameter("@CourseId", ReqData.CourseId);
                param[7] = new SqlParameter("@LanguageId", ReqData.LanguageId);
                param[8] = new SqlParameter("@GradeId", ReqData.GradeId);
                param[9] = new SqlParameter("@MonthYearId", ReqData.MonthYearId);
                param[10] = new SqlParameter("@ExamDistrictId", ReqData.ExamDistrictId);
                param[11] = new SqlParameter("@ExamCenterId", ReqData.ExamCenterId);
                param[12] = new SqlParameter("@ExamDate", ReqData.ExamDate);
                param[13] = new SqlParameter("@ExamBatch", ReqData.ExamBatch);
                param[14] = new SqlParameter("@DistrictId", ReqData.DistrictId);
                param[15] = new SqlParameter("@IsBlind", ReqData.IsBlind);
                param[16] = new SqlParameter("@DateOfBirth", ReqData.DateOfBirth);
                param[17] = new SqlParameter("@CategoryId", ReqData.CategoryId);
                param[18] = new SqlParameter("@HnoStreet", ReqData.HnoStreet);
                param[19] = new SqlParameter("@VillageTown", ReqData.VillageTown);
                param[20] = new SqlParameter("@EmailId", ReqData.EmailId);
                param[21] = new SqlParameter("@InterHallTicket", ReqData.InterHallTicket);
                param[22] = new SqlParameter("@SscHallTicket", ReqData.SscHallTicket);
                param[23] = new SqlParameter("@LowerGradeHallTicket", ReqData.LowerGradeHallTicket);
                param[24] = new SqlParameter("@File1", ReqData.File1);
                param[25] = new SqlParameter("@File2", ReqData.File2);
                param[26] = new SqlParameter("@File3", ReqData.File3);
                param[27] = new SqlParameter("@Photo", ReqData.Photo);
                param[28] = new SqlParameter("@ExamMode", ReqData.mode);
                param[29] = new SqlParameter("@Aadhaar", encriptedaadhar);
                var dt = db.ReturnDataWithStoredProcedureTable("SP_SET_StudentApplicationDetails", param);
                var appno = dt.Rows[0]["ApplicationNumber"];
                var Status = dt.Rows[0]["ResponceCode"];
                var Respdesc = dt.Rows[0]["ResponceDescription"];
                //try
                //{
                //    if ((string)Status == "200")
                //    {
                //        if (ReqData.mode == 1)
                //        {
                //            var cc = new CommunicationController();
                //            cc.SendSms(ReqData.StudentPhoneNumber, $"{ReqData.StudentName}, Your Application number for TWSH Exam is {(string)appno}. Please pay fee to confirm slot.\nSecretary, SBTET.", "");
                //        }
                //        else
                //        {
                //            //cc.SendSms(ReqData.StudentPhoneNumber, $"{ReqData.StudentName}, Please note Your Application No{(string)appno}for TWSH{{#var#}}exam secretary SBTET, TS.", "1007170028100323520");
                //            var cc = new CommunicationController();
                //            //var msg = "Please note Your Application No (string)appno for TWSH 2023 exam secretary SBTET, TS.";
                //            //var test = await com.SendSms(ReqData.StudentPhoneNumber.ToString(), msg, "1007170028100323520");
                //            cc.SendSms(ReqData.StudentPhoneNumber, $"{ReqData.StudentName}, Your Application number for TWSH Exam is {(string)appno}.\nSecretary, SBTET.", "1007162694676451620");

                //        }

                //    }
                //}
                //catch (Exception ex) { }
                response = Request.CreateResponse(HttpStatusCode.OK);
                response.Content = new StringContent(JsonConvert.SerializeObject("{\"Status\" : \"" + Status + "\",\"ApplicationNo\" : \"" + appno + "\",\"respdesc\" : \"" + Respdesc + "\"}"), System.Text.Encoding.UTF8, "application/json");
                return response;
            }
            catch (Exception ex)
            {
                response = Request.CreateResponse(HttpStatusCode.NotFound);
                response.Content = new StringContent(JsonConvert.SerializeObject("{\"Status\" : \"404\",\"Response\" : \"" + ex.Message + "\" }"), System.Text.Encoding.UTF8, "application/json");
                return response;              
            }
        }


        [HttpPost, ActionName("TwshResultsAutomation_1_1_UploadExcel")]
        public string TwshResultsAutomation_1_1_UploadExcel([FromBody] JsonObject json)
        {
            try
            {
                var dbHandler = new Twshdbandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@ExamMonthYearId", json["ExamMonthYearId"]);                
                param[1] = new SqlParameter("@Json", json["Json"].ToString());
                param[2] = new SqlParameter("@UserName", json["UserName"]);
                DataSet ds = dbHandler.ReturnDataWithStoredProcedure("ADM_SET_1_1_UploadOsdesMarksAndNrGenForResultsProcessing", param);
                //return JsonConvert.SerializeObject(dt);

                if (ds.Tables[0].Rows[0]["ResponceCode"].ToString() == "200")
                {
                    var ExamMonthYear = ds.Tables[0].Rows[0]["ExamMonthYear"].ToString();

                    var filename = ExamMonthYear + '_' + "GeneratedNr_PostedMarks_Wantings" + ".xlsx";
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
                dbHandler.SaveErorr("ADM_SET_1_1_UploadOsdesMarksAndNrGenForResultsProcessing", 0, ex.Message);
                return ex.Message;
            }

        }

        [HttpPost, ActionName("TwshResultsAutomation_1_2_UploadWantings")]
        public string TwshResultsAutomation_1_2_UploadWantings([FromBody] JsonObject json)
        {
            try
            {
                var dbHandler = new Twshdbandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@ExamMonthYearId", json["ExamMonthYearId"]);                
                param[1] = new SqlParameter("@Json", json["Json"].ToString());
                param[2] = new SqlParameter("@UserName", json["UserName"]);
                DataSet ds = dbHandler.ReturnDataWithStoredProcedure("ADM_SET_1_2_UploadWantings", param);

                if (ds.Tables[0].Rows[0]["ResponceCode"].ToString() == "200")
                {
                    var ExamMonthYear = ds.Tables[0].Rows[0]["ExamMonthYear"].ToString();

                    var filename = ExamMonthYear + '_' + "Wantings" + ".xlsx";
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
                dbHandler.SaveErorr("ADM_SET_1_2_UploadWantings", 0, ex.Message);
                return ex.Message;
            }

        }

        [HttpPost, ActionName("TwshResultsAutomation_2_1_TwshResultsProcessing")]
        public string TwshResultsAutomation_2_1_TwshResultsProcessing([FromBody] JsonObject json)
        {
            try
            {
                var dbHandler = new Twshdbandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@ExamMonthYearId", json["ExamMonthYearId"]);
                DataSet ds = dbHandler.ReturnDataWithStoredProcedure("[ADM_SET_2_1_TwshResultsProcessing]", param);

                if (ds.Tables[0].Rows[0]["ResponceCode"].ToString() == "200")
                {
                    var ExamMonthYear = ds.Tables[0].Rows[0]["ExamMonthYear"].ToString();

                    var filename = ExamMonthYear + '_' + "ResultsProcessingFile" + ".xlsx";
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
                dbHandler.SaveErorr("[ADM_SET_2_1_TwshResultsProcessing]", 0, ex.Message);
                return ex.Message;
            }

        }

        [HttpPost, ActionName("TwshResultsAutomation_2_2_DeployResultsIntoMasters")]
        public string TwshResultsAutomation_2_2_DeployResultsIntoMasters([FromBody] JsonObject json)
        {
            try
            {
                var dbHandler = new Twshdbandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@ExamMonthYearId", json["ExamMonthYearId"]);
                var dt = dbHandler.ReturnDataWithStoredProcedure("ADM_SET_2_2_DeployResultsIntoMasters ", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("ADM_SET_2_2_DeployResultsIntoMasters", 0, ex.Message);
                return ex.Message;
            }

        }

        [HttpPost, ActionName("TwshRvRcMarksUploadandResultsProcessing")]
        public string TwshRvRcMarksUploadandResultsProcessing([FromBody] JsonObject json)
        {
            try
            {
                var dbHandler = new Twshdbandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@ExamMonthYearId", json["ExamMonthYearId"]);
                param[1] = new SqlParameter("@json", json["Json"].ToString());
                param[2] = new SqlParameter("@UserName", json["UserName"]);
                DataSet ds = dbHandler.ReturnDataWithStoredProcedure("ADM_SET_1_RvRcMarksUploadandResultsProcessing", param);
                //var ds = dbHandler.ReturnDataWithStoredProcedure("ADM_SET_1_RvRcMarksUploadandResultsProcessing", param);

                if (ds.Tables[0].Rows[0]["ResponceCode"].ToString() == "200")
                {
                    var ExamMonthYear = ds.Tables[0].Rows[0]["ExamMonthYear"].ToString();

                    var filename = ExamMonthYear + '_' + "RvRcResults" + ".xlsx";
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
                //return JsonConvert.SerializeObject(ds);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("ADM_SET_1_RvRcMarksUploadandResultsProcessing", 0, ex.Message);
                return ex.Message;
            }
            
            }

        [HttpPost, ActionName("TwshRvRcResultsDeployment")]
        public string TwshRvRcResultsDeployment([FromBody] JsonObject json)
        {
            try
            {
                var dbHandler = new Twshdbandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@ExamMonthYearId", json["ExamMonthYearId"]);
                param[1] = new SqlParameter("@UserName", json["UserName"]);
                var dt = dbHandler.ReturnDataWithStoredProcedure("ADM_SET_2_RvRcResultsDeployment", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("ADM_SET_2_RvRcResultsDeployment", 0, ex.Message);
                return ex.Message;
            }

        }

        [HttpPost, ActionName("AddorUpdateNRDates")]
        public string AddorUpdateNRDates([FromBody] JsonObject json)
        {
            try
            {
                var dbHandler = new Twshdbandler();
                var param = new SqlParameter[7];
                param[0] = new SqlParameter("@DataType", json["DataType"]);
                param[1] = new SqlParameter("@ExamMonthYearId", json["ExamMonthYearId"]);
                param[2] = new SqlParameter("@NRDatesID", json["NRDatesID"]);
                param[3] = new SqlParameter("@NRStartDate", json["NRStartDate"]);
                param[4] = new SqlParameter("@NREndDate", json["NREndDate"]);
                param[5] = new SqlParameter("@Active", json["Active"]);
                param[6] = new SqlParameter("@UserName", json["UserName"]);
                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_ADD_UPDATE_TWSH_NRDates", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("SP_ADD_UPDATE_TWSH_NRDates", 0, ex.Message);
                return ex.Message;
            }

        }

        [HttpGet, ActionName("GetTwshStudentDetails")]
        public string GetTwshStudentDetails(string HallticketNumber)
        {
            try
            {
                var dbHandler = new Twshdbandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@HallticketNumber", HallticketNumber);

                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_GET_ApplicationStudentDetailsForUpdation", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }


        public class ExamCentresInfo
        {
            public int DataType { get;set;}
            public int ExamCenterID { get; set; }
            public string HallTicketNumber { get; set; }

            public int Batch { get; set; }
        }

        [HttpPost, ActionName("GetExaminationCentres")]
        public HttpResponseMessage GetExaminationCentres([FromBody] ExamCentresInfo data)
        {
            var dbHandler = new Twshdbandler();

            try
            {

                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@DataType", data.DataType);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Get_ExaminationCentres", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("SP_Get_ExaminationCentres", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }

        [HttpPost, ActionName("UpdateNewCentre")]
        public HttpResponseMessage UpdateNewCentre([FromBody] ExamCentresInfo data)
        {
            var dbHandler = new Twshdbandler();

            try
            {

                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@HallTicketNumber", data.HallTicketNumber);
                param[1] = new SqlParameter("@ExamCenterID", data.ExamCenterID);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Update_ExaminationCentre", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("SP_Update_ExaminationCentre", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }


        [HttpPost, ActionName("UpdateNewBatch")]
        public HttpResponseMessage UpdateNewBatch([FromBody] ExamCentresInfo data)
        {
            var dbHandler = new Twshdbandler();

            try
            {

                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@HallTicketNumber", data.HallTicketNumber);
                param[1] = new SqlParameter("@Batch", data.Batch);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Update_ExamBatch", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("SP_Update_ExamBatch", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }


       

        //[HttpGet, ActionName("GetTwshAcademicYears")]
        //public HttpResponseMessage GetTwshAcademicYears()
        //{
        //    try
        //    {
        //        var dbHandler = new Twshdbandler();
        //        string StrQuery = "";
        //        StrQuery = "exec USP_GET_CurrentAcademicYear";
        //        return Request.CreateResponse(HttpStatusCode.OK, dbHandler.ReturnDataSet(StrQuery));
        //    }
        //    catch (Exception ex)
        //    {

        //        dbHandler.SaveErorr("USP_GET_CurrentAcademicYear", 0, ex.Message);
        //        return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
        //    }
        //}

        [HttpGet, ActionName("EditTwshExamCentres")]
        public string EditTwshExamCentres(int ExaminationCentreID)
        {
            try
            {
                var dbHandler = new Twshdbandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@ExaminationCentreID", ExaminationCentreID);

                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_Edit_ExamCenters", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }


        [HttpGet, ActionName("getTwshExamMonthYearsbyID")]
        public string getTwshExamMonthYearsbyID(int AcademicYearID)
        {
            try
            {
                var dbHandler = new Twshdbandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@AcademicYearID", AcademicYearID);

                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_GET_Twsh_ExamMonthYearbyID", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        //[HttpGet, ActionName("SetorUpdateTwshExamCentres")]
        //public string SetorUpdateTwshExamCentres(int DataType, int ExaminationCentreID, int AcademicYearID, int ExamMonthYearID, string ExaminationCentreCode, string ExaminationcentreName, int DistrictID, int Gender, int CBT, int MBT, int ShortHand, string CentreAddress, bool Active, string UserName)
        //{
        //    try
        //    {
        //        var db = new Twshdbandler();
        //        var param = new SqlParameter[14];
        //        param[0] = new SqlParameter("@DataType", DataType);
        //        param[1] = new SqlParameter("@ExaminationCentreID", ExaminationCentreID);
        //        param[2] = new SqlParameter("@AcademicYearID", AcademicYearID);
        //        param[3] = new SqlParameter("@ExamMonthYearID", ExamMonthYearID);
        //        param[4] = new SqlParameter("@ExaminationCentreCode", ExaminationCentreCode);
        //        param[5] = new SqlParameter("@ExaminationcentreName", ExaminationcentreName);
        //        param[6] = new SqlParameter("@DistrictID", DistrictID);
        //        param[7] = new SqlParameter("@Gender", Gender);
        //        param[8] = new SqlParameter("@CBT", CBT);
        //        param[9] = new SqlParameter("@MBT", MBT);
        //        param[10] = new SqlParameter("@ShortHand", ShortHand);
        //        param[11] = new SqlParameter("@CentreAddress", CentreAddress);
        //        param[12] = new SqlParameter("@Active", Active);
        //        param[13] = new SqlParameter("@UserName", UserName);
        //        var dt = db.ReturnDataWithStoredProcedureTable("SP_Add_Update_ExaminationCentres", param);
        //        return JsonConvert.SerializeObject(dt);
        //    }
        //    catch (Exception ex)
        //    {

        //        dbHandler.SaveErorr("SP_Add_Update_ExaminationCentres", 0, ex.Message);
        //        return ex.Message;
        //    }

        //}


        public class ExamCentres
        {
            public int DataType { get; set; }
            public int ExaminationCentreID { get; set; }
            public int AcademicYearID { get; set; }
            public int ExamMonthYearID { get; set; }
            public int DistrictID { get; set; }
            public int Gender { get; set; }
            public int CBT { get; set; }
            public int MBT { get; set; }
            public int ShortHand { get; set; }
            public string ExaminationCentreCode { get; set; }
            public string ExaminationcentreName { get; set; }
            public string CentreAddress { get; set; }
            public string UserName { get; set; }
            public bool Active { get; set; }
        }

        [HttpPost, ActionName("SetorUpdateTwshExamCentres")]
        public HttpResponseMessage SetorUpdateTwshExamCentres([FromBody] ExamCentres data)
        {
            try
            {
                var dbHandler = new Twshdbandler();
                HttpResponseMessage response = new HttpResponseMessage();
                var param = new SqlParameter[14];
                param[0] = new SqlParameter("@DataType", data.DataType);
                param[1] = new SqlParameter("@ExaminationCentreID", data.ExaminationCentreID);
                param[2] = new SqlParameter("@AcademicYearID", data.AcademicYearID);
                param[3] = new SqlParameter("@ExamMonthYearID", data.ExamMonthYearID);
                param[4] = new SqlParameter("@ExaminationCentreCode", data.ExaminationCentreCode);
                param[5] = new SqlParameter("@ExaminationcentreName", data.ExaminationcentreName);
                param[6] = new SqlParameter("@DistrictID", data.DistrictID);
                param[7] = new SqlParameter("@Gender", data.Gender);
                param[8] = new SqlParameter("@CBT", data.CBT);
                param[9] = new SqlParameter("@MBT", data.MBT);
                param[10] = new SqlParameter("@ShortHand", data.ShortHand);
                param[11] = new SqlParameter("@CentreAddress", data.CentreAddress);
                param[12] = new SqlParameter("@Active", data.Active);
                param[13] = new SqlParameter("@UserName", data.UserName);
                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_Add_Update_ExaminationCentres", param);
                return Request.CreateResponse(HttpStatusCode.OK, dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("SP_Add_Update_ExaminationCentres", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }

        }


        public class ExamCentresCourseWise
        {
            public int ExamStrength { get; set; }
            public int ExamCentreCourseID { get; set; }
            public bool Active { get; set; }
            public bool CourseAvailable { get; set; }
            public string UserName { get; set; }
        }



        [HttpPost, ActionName("UpdateTwshExamCentresCourseWise")]
        public HttpResponseMessage UpdateTwshExamCentresCourseWise([FromBody] ExamCentresCourseWise data)
        {
            try
            {
                var dbHandler = new Twshdbandler();
                HttpResponseMessage response = new HttpResponseMessage();
                var param = new SqlParameter[5];
                param[0] = new SqlParameter("@ExamCentreCourseID", data.ExamCentreCourseID);
                param[1] = new SqlParameter("@ExamStrength", data.ExamStrength);
                param[2] = new SqlParameter("@CourseAvailable", data.CourseAvailable);
                param[3] = new SqlParameter("@Active", data.Active);
                param[4] = new SqlParameter("@UserName", data.UserName);
                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_Update_ExaminationCentresCourseWise", param);
                return Request.CreateResponse(HttpStatusCode.OK, dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("SP_Update_ExaminationCentresCourseWise", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }

        }

        [HttpGet, ActionName("GetGradeWiseBatchTimings")]
        public string GetGradeWiseBatchTimings(int GradeID,int BatchID)
        {
            try
            {
                var dbHandler = new Twshdbandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@GradeID", GradeID);
                param[1] = new SqlParameter("@BatchID", BatchID);

                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_Get_ExaminationBatchTimings", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }


        [HttpGet, ActionName("GetStudentsRejectedExcel")]
        public string GetStudentsRejectedExcel(int DataType, int ExamCenterID)
        {
            try
            {
                var dbHandler = new Twshdbandler();
                string StrQuery = "SP_Get_RejectedStudentDetails";
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@DataType", DataType);
                param[1] = new SqlParameter("@ExamCenterID", ExamCenterID);
                var ds = dbHandler.ReturnDataWithStoredProcedure(StrQuery, param);
                var filename = "RejectedStudentsList_" + ".xlsx";
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
                return "Error Occured. Please Try Again";
            }
        }

        [HttpGet, ActionName("GetStudentBlindListExcel")]
        public string GetStudentBlindListExcel(int DataType)
        {
            try
            {
                var dbHandler = new Twshdbandler();
                string StrQuery = "SP_Get_IsBlindStudentData";
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@DataType", DataType);
                var ds = dbHandler.ReturnDataWithStoredProcedure(StrQuery, param);
                var filename = "BlindStudentsList_" + ".xlsx";
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
                return "Error Occured. Please Try Again";
            }
        }




        //[HttpGet, ActionName("RejectorApproveorReleaseSubmitDetails")]
        //public string RejectorApproveorReleaseSubmitDetails(int ApprovedStatus, int Id,string examDate = null, string RejectedRemarks= null,string ReleasedRemarks=null)
        //{
        //    try
        //    {
        //        var dbHandler = new Twshdbandler();
        //        var param = new SqlParameter[5];
        //        param[0] = new SqlParameter("@ApprovedStatus", ApprovedStatus);
        //        param[1] = new SqlParameter("@Id", Id);
        //        param[2] = new SqlParameter("@examDate", examDate);
        //        param[3] = new SqlParameter("@RejectedRemarks", RejectedRemarks);
        //        param[4] = new SqlParameter("@ReleasedRemarks", ReleasedRemarks);

        //        var dt = dbHandler.ReturnDataWithStoredProcedure("SP_SET_ApproveStudentEligibility", param);
        //        return JsonConvert.SerializeObject(dt);
        //    }
        //    catch (Exception ex)
        //    {
        //        return ex.Message;
        //    }
        //}

        public class submitdetails
        {
            public int Id { get; set; }
            public int ApprovedStatus { get; set; }
            public string examDate { get; set; }
            public string RejectedRemarks { get; set; }
            public string ReleasedRemarks { get; set; }
        }

        [HttpPost, ActionName("RejectorApproveorReleaseSubmitDetails")]
        public async Task<HttpResponseMessage> RejectorApproveorReleaseSubmitDetails([FromBody] submitdetails data)
        {
            try
            {
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);
                var dbHandler = new Twshdbandler();
                var param = new SqlParameter[5];
                param[0] = new SqlParameter("@ApprovedStatus", data.ApprovedStatus);
                param[1] = new SqlParameter("@Id", data.Id);
                param[2] = new SqlParameter("@examDate", data.examDate);
                param[3] = new SqlParameter("@RejectedRemarks", data.RejectedRemarks);
                param[4] = new SqlParameter("@ReleasedRemarks", data.ReleasedRemarks);
                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_SET_ApproveStudentEligibility", param);
                if (dt.Tables[0].Rows[0]["ResponceCode"].ToString() == "201")
                {
                    string ApplicationNumber = Convert.ToString(dt.Tables[1].Rows[0]["ApplicationNumber"]);
                    string MobileNumber = Convert.ToString(dt.Tables[1].Rows[0]["StudentPhoneNumber"]);
                    string ExamMonthYear = Convert.ToString(dt.Tables[1].Rows[0]["ExamMonthYear"]);
                    string url = ConfigurationManager.AppSettings["SMS_API"].ToString();
                    var temptateid = "1007170253154796137";
                    var msg = " your application No " + ApplicationNumber + " for TWSH "  + ExamMonthYear + " exam is rejected. Secretary SBTET TS.";
                    CommunicationController com = new CommunicationController();
                    com.SendSms(MobileNumber, msg, temptateid);
                };

                response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("SP_SET_ApproveStudentEligibility", 0, ex.Message);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, ex.Message);
                return response;
            }
        }




        private class ArrayList
        {
            public ArrayList()
            {
            }
        }
    }

    public class TwshUserModel
    {
        public string Username { get; set; }
        public string Name { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string AadhaarNumber { get; set; }
        public int StudentId { get; set; }
        public string ExamDate { get; set; }
        public string GradeCode { get; set; }
    }





}
