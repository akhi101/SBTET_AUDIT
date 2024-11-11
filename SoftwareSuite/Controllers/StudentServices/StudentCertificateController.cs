using System;
using System.Collections.Generic;
using System.Data;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Http;
using Newtonsoft.Json.Linq;
using System.Data.SqlClient;
using SoftwareSuite.Models.Database;
using QRCoder;
using SelectPdf;
using SoftwareSuite.Controllers.Common;
using SoftwareSuite.Models.Certificate;
using System.Configuration;
using System.Net.Http;
using System.Net.Http.Headers;
using Newtonsoft.Json;
using RestSharp;
using System.Collections;
using System.Threading.Tasks;

namespace SoftwareSuite.Controllers.StudentServices
{
    public class StudentCertificateController : ApiController
    {
        [HttpPost, ActionName("StoreSignedCertificate")]
        public string StoreSignedCertificate()
        {
            try {
               var dir = AppDomain.CurrentDomain.BaseDirectory + @"Signed\";
             // var dir = "sbtet.telangana.gov.in/" + @"Reports\SignedCert\";
                var deldir = AppDomain.CurrentDomain.BaseDirectory + @"Reports\UnsignedCert\";
                CreateIfMissing(dir);
                var data = Request.Content.ReadAsStringAsync().Result;
                JObject obj = JObject.Parse(data);
                string file = "" + obj["file"];
                string filelocation = "" + obj["filelocation"];
                string Pin = "" + obj["Pin"];
                int certificatetype = Convert.ToInt16(obj["CertificateServiceId"]);
                string ApplicationNo = "" + obj["ApplicationNo"];
                Byte[] bytes = Convert.FromBase64String(file);
                var filename = Path.GetFileName(filelocation);
                var path = dir + filename;
                File.WriteAllBytes(path, bytes);
                string signedrelativePath = path.Replace(HttpContext.Current.Request.PhysicalApplicationPath, GetWebAppRoot()).Replace(@"\", "/");

                var dbHandler = new dbHandler();
                var param = new SqlParameter[4];
                param[0] = new SqlParameter("@pin", Pin);
                param[1] = new SqlParameter("@CertificateTypeId", certificatetype);
                param[2] = new SqlParameter("@Certificatepath", signedrelativePath);
                param[3] = new SqlParameter("@ApplicationNo", ApplicationNo);
                DataTable dt = dbHandler.ReturnDataWithStoredProcedureTable("USP_SOS_Store_Signed_Certificate", param);             
                var content = filelocation.Replace("http://", "").Replace("https://", "");
                string[] arrRes = content.Split('/');
                int index = content.LastIndexOf("/");
                string filepath = content.Substring(index + 1);
                var filedelpath = deldir + Pin + '_' + filepath;
                if (File.Exists(filedelpath)) { 
                    File.Delete(filedelpath);
                }
                return "File Saved Successfully";             
            }
            catch (Exception ex)
            {
                return "FAILED"+ ex.Message;
            }
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
        public class GetInterimRes
        {
            public string PdfUrl { get; set; }
            public string Id { get; set; }
            public string Pin { get; set; }
            public string ApplicationNumber { get; set; }
            public string RegistrationNo { get; internal set; }
        }

        [HttpPost, ActionName("GetInterimCertificate")]
        public async Task<object> GetInterimCertificate([FromBody] JsonObject request)
        {
           try
            {
                var js = JsonConvert.DeserializeObject<ArrayList>(Convert.ToString(request["PINjson"]));               
                var respdfList = new List<GetInterimRes>();
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                for (int i = 0; i < js.Count; i++)
                {
                    var jobject = JsonConvert.DeserializeObject<JsonObject>(JsonConvert.SerializeObject(js[i]));                   
                    param[0] = new SqlParameter("@pin", jobject["PIN"]);                    
                    DataSet ds = dbHandler.ReturnDataWithStoredProcedure("USP_SS_GET_FeePaidInteriamCertificateDetails", param);  //USP_SS_GET_FeePaidInteriamCertificateDetails
                    GenerateCertificate GenerateCertificate = new GenerateCertificate();
                    var ApplicationNumber = ds.Tables[1].Rows[0]["InterimCertificateNo"].ToString();
                    var pdfurl = GenerateCertificate.GetInterimCertificate(ds);
                    respdfList.Add(new GetInterimRes { PdfUrl = pdfurl, Pin = jobject["PIN"].ToString(), ApplicationNumber = ApplicationNumber });
                }      
               
                return respdfList;
            }
            catch (Exception ex)
            {
                return "FAILED" + ex.Message;
            }
        }

        [HttpPost, ActionName("GetPaySlip")]
        public async Task<object> GetPaySlip([FromBody] JsonObject request)
        {
            try
            {
                //var js = JsonConvert.DeserializeObject<ArrayList>(Convert.ToString(request["FinancialYearID"]));
                var respdfList = new List<GetInterimRes>();
                var dbHandler = new PayRolldbhandler();
                var param = new SqlParameter[2];
                //for (int i = 0; i < js.Count; i++)
                //{
                    //var jobject = JsonConvert.DeserializeObject<JsonObject>(JsonConvert.SerializeObject(js[i]));
                    param[0] = new SqlParameter("@FinancialYearID", request["FinancialYearID"]);
                    param[1] = new SqlParameter("@MonthID", request["MonthID"]);
                    DataSet ds = dbHandler.ReturnDataWithStoredProcedure("SP_GET_PaySlipDetails", param);  //USP_SS_GET_FeePaidInteriamCertificateDetails
                    GenerateCertificate GenerateCertificate = new GenerateCertificate();
                    var ApplicationNumber = ds.Tables[0].Rows[0]["EmployeeCode"].ToString();
                    var pdfurl = GenerateCertificate.GetPaySlip(ds);
                    respdfList.Add(new GetInterimRes { PdfUrl = pdfurl, Pin = request["FinancialYearID"].ToString(), ApplicationNumber = ApplicationNumber });
                //}

                return respdfList;
            }
            catch (Exception ex)
            {
                return "FAILED" + ex.Message;
            }
        }

        [HttpGet, ActionName("GetTypeWritingCertificate")]
        public async Task<object> GetTypeWritingCertificate(string RegNo)
        {
            try
            {
                var respdfList = new List<GetTwshRes>();
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1]; 
                    param[0] = new SqlParameter("@RegNo", RegNo);
                    DataSet ds = dbHandler.ReturnDataWithStoredProcedure("Sp_getTwshResult", param);  //USP_SS_GET_FeePaidInteriamCertificateDetails
                    GenerateCertificate GenerateCertificate = new GenerateCertificate();
                    var ApplicationNumber = ds.Tables[1].Rows[0]["RegNo"].ToString();
                    var pdfurl = GenerateCertificate.GetTypewritingCertificate(ds);
                    respdfList.Add(new GetTwshRes { PdfUrl = pdfurl, RegNo = RegNo, ApplicationNumber = ApplicationNumber });
              

                return respdfList;
            }
            catch (Exception ex)
            {
                return "FAILED" + ex.Message;
            }
        }


        [HttpPost, ActionName("GetGenuinenessCertificate")]
        public async Task<object> GetGenuinenessCertificate([FromBody] JsonObject request)
        {
            try
            {
                var js = JsonConvert.DeserializeObject<ArrayList>(Convert.ToString(request["PINjson"]));
                var respdfList = new List<GetInterimRes>();
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                for (int i = 0; i < js.Count; i++)
                {
                    var jobject = JsonConvert.DeserializeObject<JsonObject>(JsonConvert.SerializeObject(js[i]));
                    param[0] = new SqlParameter("@pin", jobject["PIN"]);
                    DataSet ds = dbHandler.ReturnDataWithStoredProcedure("USP_SS_GET_FeePaidGenuinenessCertificateDetails", param);  //USP_SS_GET_FeePaidInteriamCertificateDetails
                    GenerateCertificate GenerateCertificate = new GenerateCertificate();
                    var ApplicationNumber = ds.Tables[1].Rows[0]["InterimCertificateNo"].ToString();
                    var pdfurl = GenerateCertificate.GetGenuinenessCertificate(ds);
                    respdfList.Add(new GetInterimRes { PdfUrl = pdfurl, Pin = jobject["PIN"].ToString(), ApplicationNumber = ApplicationNumber });
                }

                return respdfList;
            }
            catch (Exception ex)
            {
                return "FAILED" + ex.Message;
            }
        }

        [HttpPost, ActionName("GetDuplicateDiplomaCertificate")]
        public async Task<object> GetDuplicateDiplomaCertificate([FromBody] JsonObject request)
        {
            try
            {
                var js = JsonConvert.DeserializeObject<ArrayList>(Convert.ToString(request["PINjson"]));
                var respdfList = new List<GetInterimRes>();
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                for (int i = 0; i < js.Count; i++)
                {
                    var jobject = JsonConvert.DeserializeObject<JsonObject>(JsonConvert.SerializeObject(js[i]));
                    param[0] = new SqlParameter("@pin", jobject["PIN"]);
                    DataSet ds = dbHandler.ReturnDataWithStoredProcedure("USP_SS_GET_FeePaidGenuinenessCertificateDetails", param);  //USP_SS_GET_FeePaidInteriamCertificateDetails
                    GenerateCertificate GenerateCertificate = new GenerateCertificate();
                    //var ApplicationNumber = ds.Tables[0].Rows[0]["ApplicationNumber"].ToString();
                    var pdfurl = GenerateCertificate.GetDuplicateDiplomaCertificate(ds);
                    respdfList.Add(new GetInterimRes { PdfUrl = pdfurl, Pin = jobject["PIN"].ToString(), });
                }

                return respdfList;
            }
            catch (Exception ex)
            {
                return "FAILED" + ex.Message;
            }
        }


        [HttpPost, ActionName("GetTwshCertificate")]
        public async Task<object> GetTwshCertificate([FromBody] JsonObject request)
        {
            try
            {
                var js = JsonConvert.DeserializeObject<ArrayList>(Convert.ToString(request["PINjson"]));
                var respdfList = new List<GetInterimRes>();
                var dbHandler = new Twshdbandler();
                var param = new SqlParameter[1];
                for (int i = 0; i < js.Count; i++)
                {
                    var jobject = JsonConvert.DeserializeObject<JsonObject>(JsonConvert.SerializeObject(js[i]));
                    param[0] = new SqlParameter("@RegNo", jobject["RegistrationNo"]);
                    DataSet ds = dbHandler.ReturnDataWithStoredProcedure("Sp_getTwshResult", param);  //USP_SS_GET_FeePaidInteriamCertificateDetails
                    GenerateCertificate GenerateCertificate = new GenerateCertificate();
                    var ApplicationNumber = ds.Tables[0].Rows[0]["ApplicationNumber"].ToString();
                    var pdfurl = GenerateCertificate.GetTwshCertificate(ds);
                    respdfList.Add(new GetInterimRes { PdfUrl = pdfurl, RegistrationNo = jobject["RegistrationNo"].ToString(), ApplicationNumber = ApplicationNumber });
                }

                return respdfList;
            }
            catch (Exception ex)
            {
                return "FAILED" + ex.Message;
            }
        }
        

        [HttpPost, ActionName("GetMigrationCertificate")]
        public async Task<object> GetMigrationCertificate([FromBody] JsonObject request)
        {
            try
            {
                var js = JsonConvert.DeserializeObject<ArrayList>(Convert.ToString(request["PINjson"]));
                var respdfList = new List<GetInterimRes>();
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                for (int i = 0; i < js.Count; i++)
                {
                    var jobject = JsonConvert.DeserializeObject<JsonObject>(JsonConvert.SerializeObject(js[i]));
                    param[0] = new SqlParameter("@pin", jobject["PIN"]);
                    DataSet ds = dbHandler.ReturnDataWithStoredProcedure("USP_SS_GET_FeePaidMigrationCertificateDetails", param);
                    GenerateCertificate GenerateCertificate = new GenerateCertificate();
                    var ApplicationNumber = ds.Tables[1].Rows[0]["MigrationCertificateNo"].ToString();
                    var pdfurl = GenerateCertificate.GetMigrationCertificate(ds);
                    respdfList.Add(new GetInterimRes { PdfUrl = pdfurl, Pin = jobject["PIN"].ToString(), ApplicationNumber = ApplicationNumber });
                }
                return respdfList;
            }
            catch (Exception ex)
            {
                return "FAILED" + ex.Message;
            }
           
        }


        [HttpPost, ActionName("GetTransferCertificate")]
        public async Task<object> GetTransferCertificate([FromBody] JsonObject request)
        {
            try
            {
                var js = JsonConvert.DeserializeObject<ArrayList>(Convert.ToString(request["PINjson"]));
                var respdfList = new List<GetInterimRes>();
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                for (int i = 0; i < js.Count; i++)
                {
                    var jobject = JsonConvert.DeserializeObject<JsonObject>(JsonConvert.SerializeObject(js[i]));
                    param[0] = new SqlParameter("@pin", jobject["PIN"]);
                    DataSet ds = dbHandler.ReturnDataWithStoredProcedure("USP_SS_GET_FeePaidTransferCertificateDetails", param);
                    GenerateCertificate GenerateCertificate = new GenerateCertificate();
                    var ApplicationNumber = ds.Tables[1].Rows[0]["TransferCertificateNo"].ToString();
                    var pdfurl = GenerateCertificate.GetTransferCertificate(ds);
                    respdfList.Add(new GetInterimRes { PdfUrl = pdfurl, Pin = jobject["PIN"].ToString(), ApplicationNumber = ApplicationNumber });
                }

                return respdfList;
            }
            catch (Exception ex)
            {
                return "FAILED" + ex.Message;
            }
        }


        [HttpPost, ActionName("GetBonafideCertificate")]
        public async Task<object> GetBonafideCertificate([FromBody] JsonObject request)
        {
            try
            {
                var js = JsonConvert.DeserializeObject<ArrayList>(Convert.ToString(request["PINjson"]));
                var respdfList = new List<GetInterimRes>();
                var dbHandler = new dbHandler();
                var param = new SqlParameter[2];
                for (int i = 0; i < js.Count; i++)
                {
                    var jobject = JsonConvert.DeserializeObject<JsonObject>(JsonConvert.SerializeObject(js[i]));
                    param[0] = new SqlParameter("@pin", jobject["PIN"]);
                    param[1] = new SqlParameter("@Id", jobject["Id"]);
                    DataSet ds = dbHandler.ReturnDataWithStoredProcedure("USP_SS_GET_BonafideCertificateDetailsForOfficials", param);
                    GenerateCertificate GenerateCertificate = new GenerateCertificate();
                    var ApplicationNumber = ds.Tables[1].Rows[0]["ApplicationNumber"].ToString();
                    var pdfurl = GenerateCertificate.GetBonafideCertificate(ds);
                    respdfList.Add(new GetInterimRes { PdfUrl = pdfurl,Id= jobject["Id"].ToString(), Pin = jobject["PIN"].ToString(), ApplicationNumber = ApplicationNumber });
                }

                return respdfList;
            }
            catch (Exception ex)
            {
                return "FAILED" + ex.Message;
            }
        }

        [HttpPost, ActionName("GetStudyCertificate")]
        public async Task<object> GetStudyCertificate([FromBody] JsonObject request)
        {
            try
            {
                var js = JsonConvert.DeserializeObject<ArrayList>(Convert.ToString(request["PINjson"]));
                var respdfList = new List<GetInterimRes>();
                var dbHandler = new dbHandler();
                var param = new SqlParameter[2];
                for (int i = 0; i < js.Count; i++)
                {
                    var jobject = JsonConvert.DeserializeObject<JsonObject>(JsonConvert.SerializeObject(js[i]));
                    param[0] = new SqlParameter("@pin", jobject["PIN"]);
                    param[1] = new SqlParameter("@Id", jobject["Id"]);
                    DataSet ds = dbHandler.ReturnDataWithStoredProcedure("USP_SS_GET_StudyCertificateDetailsForOfficials", param);
                    GenerateCertificate GenerateCertificate = new GenerateCertificate();
                    var ApplicationNumber = ds.Tables[1].Rows[0]["ApplicationNumber"].ToString();
                    var pdfurl = GenerateCertificate.GetStudyCertificate(ds);
                    respdfList.Add(new GetInterimRes { PdfUrl = pdfurl, Id = jobject["Id"].ToString(), Pin = jobject["PIN"].ToString(), ApplicationNumber = ApplicationNumber });
                }

                return respdfList;
            }
            catch (Exception ex)
            {
                return "FAILED" + ex.Message;
            }
        }

        //[HttpGet, ActionName("GetTransferCertificate")]
        //public string GetTransferCertificate(String pin)
        //{
        //    try
        //    {
        //        var dbHandler = new dbHandler();
        //        var param = new SqlParameter[1];
        //        param[0] = new SqlParameter("@pin", pin);
        //        DataSet ds = dbHandler.ReturnDataWithStoredProcedure("USP_SS_GET_FeePaidTransferCertificateDetails", param);
        //        GenerateCertificate GenerateCertificate = new GenerateCertificate();
        //        var pdf = GenerateCertificate.GetTransferCertificate(ds);
        //        return pdf;
        //    }
        //    catch (Exception ex)
        //    {
        //        return "FAILED" + ex.Message;
        //    }
        //}

        [HttpPost, ActionName("GetTrSheetsData")]
        public string GetTrSheetsData([FromBody] JsonObject request)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[5];
                param[0] = new SqlParameter("@Scheme", request["Scheme"]);
                param[1] = new SqlParameter("@ExamMonthYearId", request["ExamMonthYearId"]);
                param[2] = new SqlParameter("@Date", request["Date"]);
                param[3] = new SqlParameter("@CollegeCodesList", request["CollegeCodesList"]);
                param[4] = new SqlParameter("@Semid", request["Semid"]);
                DataSet ds = dbHandler.ReturnDataWithStoredProcedure("USP_GET_TRData", param);
                GenerateCertificate GenerateCertificate = new GenerateCertificate();
                var TrSheetData = DataTableHelper.ConvertDataTable<TrSheetCertificateData>(ds?.Tables[1]);
                var pdf = GenerateCertificate.GetTrsheetPdf(TrSheetData);
                return pdf;
            }
            catch (Exception ex)
            {
                return "FAILED" + ex.Message;
            }
        }

        [HttpGet, ActionName("GetODCTrsheets")]
        public string GetODCTrsheets(int ExamMonthYearId,string CollegeCodesList)
        {
            try
            {
              
                var dbHandler = new dbHandler();
                var param = new SqlParameter[2];              
                param[0] = new SqlParameter("@ExamMonthYearId", ExamMonthYearId);
                param[1] = new SqlParameter("@CollegeCodesList", CollegeCodesList);
                DataSet ds = dbHandler.ReturnDataWithStoredProcedure("USP_GET_ODCTsheetData", param);
                GenerateCertificate GenerateCertificate = new GenerateCertificate();
                var ODCTrSheetData = DataTableHelper.ConvertDataTable<ODCTrSheetData>(ds?.Tables[0]);
                var pdf = GenerateCertificate.GetODCTrsheetPdf(ODCTrSheetData);
                return pdf;
            }
            catch (Exception ex)
            {
                return "FAILED" + ex.Message;
            }
        }

        [HttpGet, ActionName("GetC18ODCTrsheets")]
        public async Task<string> GetC18ODCTrsheetsAsync(int ExamMonthYearId,string CollegeCodesList)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@ExamMonthYearId", ExamMonthYearId);
                param[1] = new SqlParameter("@CollegeCodesList", CollegeCodesList);
                DataSet ds = dbHandler.ReturnDataWithStoredProcedure("USP_GET_GenerateC18ConsolidatedMemoForTsheets", param);
                GenerateCertificate GenerateCertificate = new GenerateCertificate();
                var C18OdcTrSheet = DataTableHelper.ConvertDataTable<C18OdcTrSheet>(ds?.Tables[0]);
                var pdf = await GenerateCertificate.GetC18ODCTrsheetPdfAsync(C18OdcTrSheet);
                return pdf;
            }
            catch (Exception ex)
            {
                return "FAILED" + ex.Message;
            }
        }


        [HttpGet, ActionName("GetMigrationCertificate")]
        public string GetMigrationCertificate()
        {

            var dir = AppDomain.CurrentDomain.BaseDirectory + @"Reports\MigrationCert\";
            CreateIfMissing(dir);
            string html = @"<html>"
                   + "<head>"
                   + $"<title></title>"
                   + $@"<link href = '{AppDomain.CurrentDomain.BaseDirectory}\contents\css\bootstrap.min.css' rel = 'stylesheet'  type = 'text/css' />"
                   + @"<style type='text/css'>
                         html{
                            min-width: 1024px;
                            max-width: 1024px;
                            width: 1024px;
                        }
                        body {
                            min-width: 1024px;
                            max-width: 1024px;
                            width: 1024px;
                            margin-left: 10px;
                        } 
                        table {  
                            font-family: Helvetica, Arial, sans-serif; /* Nicer font */
                            width: 100%; 
                            border-collapse: collapse;
                            border-spacing: 0; 
                        } 

                        td, th, tr { border: 1px solid #000; height: 40px; } /* Make cells a bit taller */

                        th {  
                            font-weight: bold; /* Make sure they're bold */
                        }

                        td {  
                            text-align: center; /* Center our text */
                        }

                 .logoImg {
        height: 60px !important;
        width: 60px !important;
    }
 .myHr{
     border-top: 1px solid #000;
 }
 .header-top-section{
     display:none;
 }
 .border_btm{
     border-bottom:1px solid #ddd;
      text-transform:uppercase;
 }
 .qr_css{
     height:100px;
 }
 .text-uppercase{
     text-transform:uppercase;
 }
 p {
  text-indent: 50px;
}
   .marginData{
          margin:0px 20px;
      }
   .footer_section {
       display:none;
   }
    .footer_section {
       display:none;
   }
    .print_btn{
        display:none;
    }
     .spacer{
       display:none;
      }
     .logo img {
    float: left;
    cursor: pointer;
    margin-right: 0px!important;
}
      .text-intend {
  text-indent: 50px;
    line-height: 2.5;
    padding-left:15px;
}
    }

/*---------------------*---------*-Print Css End-*------*-------------------------------*/

 
                        </style> "
                   + "</head><body>";

            string sbString = html;


            #region PageHeader
            var page = $@"
 <div class='container'>

        <div class='row'>
            <div class='col-md-2 logo '>
                <div class='logo-image' style='padding:6px!important;'>
                    <img src = '{AppDomain.CurrentDomain.BaseDirectory}/contents/img/telangana-logo-png.png' class='img-responsive logoImg pull-left' />
                </div>
            </div>
            <div class='col-md-8 title'>
                <h3 class='text-center hall_head' style='font-size: 16px!important;'><b>STATE BOARD OF TECHNICAL EDUCATION AND TRAINING</b></h3>
                <h6 class='text-center'>
                    Sanketika Vidya Bhavan, Mabsab Tank, Hyderabad-500 028.
                </h6>
                <h6 class='text-center'>Telangana state, India.</h6>
            </div>
            <div class='col-md-2 logo '>
                <div class='logo-image' style='padding:6px!important;'>
                    <img src = '{AppDomain.CurrentDomain.BaseDirectory}/contents/img/{AppDomain.CurrentDomain.BaseDirectory}/contents/img/sbtet-logo.png' class='img-responsive logoImg pull-right' />
                </div>
            </div>
        </div>
        <hr class='myHr' />
        <div>";

            #endregion

            #region PageContent
            page += $@"<div class='container'>
                <div class='marginData'>
                    <div class='row'>
                        <div class='col-md-10'>
                            <div><b class='border_btm'>No.SBTET/EE-I-11/MIGRATION/222/2019</b></div>
                        </div>
                        <div class='col-md-2'>
                            <img class='qr_css' src='{("qwerty")}mail ' />
                        </div>
                    </div>
                    <h3 class='text-center'><b class='border_btm text-uppercase'>Migration Certificate</b></h3>
                    <div class='row'>
                        <p class='text-intend'>
                            This is to certify that<b class='border_btm' ng-if='!name'>_________________</b>
                            <b class='border_btm' ng-if='name'></b> S/o/D/o<b class='border_btm' ng-if='!father'>_________________</b><b class='border_btm' ng-if='father'></b> of
bearing Permanent Identification Number(PIN) <b class='border_btm' ng-if='!pin'>_________________</b><b class='border_btm' ng-if='pin'></b> has passed the<b class='border_btm' ng-if='!year'>_________________</b><b class='border_btm' ng-if='year'></b> year Diploma Course
                            in <b class='border_btm' ng-if='!BranchYear'>_________________</b><b class='border_btm' ng-if='BranchYear'></b> and he/she was placed in <b class='border_btm' ng-if='!Class'>_________________</b><b class='border_btm' ng-if='Class'></b>.
                            The medium of instruction was<b>'English'</b>.
                        <p class='text-intend'>
                            The State Board of Technical Education and Training, Telangana. Hyderabad has no Objection to prosecute his/her Higher Studies in any other
                           <b class='text-uppercase'>State / University.</b>
                        </p>
                        <p class='text-intend'>The Certificate has been issued at the request of candidate.</p>

                    </div>
                    <div class='sm-spacer'></div>



                    <div><b>Date : </b></div>
                </div>
                <div class='col-md-3'></div>
                <div class='col-md-5'>
                    <h5 class='text-center'><b class='text-uppercase '>CONTROLLER OF EXAMINATIONS</b></h5>
                </div>
            </div>
       
            <div class='col-md-12'>
                <div class='btn btn-success print_btn pull-right' ng-click='printForm()'>Generate</div>
            </div>
            <div class='spacer'></div>
           
        </div>
    </div>";
            #endregion

            sbString += page;
            sbString += "</body></html>";

            var converter = new HtmlToPdf();
            converter.Options.ExternalLinksEnabled = true;
            converter.Options.DrawBackground = false;
            converter.Options.JavaScriptEnabled = false;
            converter.Options.WebPageWidth = 1024;
            converter.Options.PdfPageSize = PdfPageSize.A4;
            converter.Options.PdfPageOrientation = PdfPageOrientation.Portrait;

            var doc = converter.ConvertHtmlString(sbString);
            var path = dir + $"{Guid.NewGuid().ToString()}.pdf";
            doc.Save(path);
            doc.Close();

            return path;
        }


        [HttpGet, ActionName("GetTrCertificate")]
        public string GetTrCertificate()
        {

            var dir = AppDomain.CurrentDomain.BaseDirectory + @"Reports\TrCertificate\";
            CreateIfMissing(dir);
            string html = @"<html>"
                   + "<head>"
                   + $"<title></title>"
                   + $@"<link href = '{AppDomain.CurrentDomain.BaseDirectory}\contents\css\bootstrap.min.css' rel = 'stylesheet'  type = 'text/css' />"
                   + @"<style type='text/css'>
                         html{
                            min-width: 1024px;
                            max-width: 1024px;
                            width: 1024px;
                        }
                        body {
                            min-width: 1024px;
                            max-width: 1024px;
                            width: 1024px;
                            margin-left: 10px;
                        }
                        table {  
                            font-family: Helvetica, Arial, sans-serif; /* Nicer font */
                            width: 100%; 
                            border-collapse: collapse;
                            border-spacing: 0; 
                        }

                        td, th, tr { border: 1px solid #000; height: 40px; } /* Make cells a bit taller */

                        th {  
                            font-weight: bold; /* Make sure they're bold */
                        }

                        td {  
                            text-align: center; /* Center our text */
                        }

                   .container-fluid{
            font-size:9px;
        }
      .table > thead > tr > th.myClm{
            width:25%!important;
             border-top: 0px!important;
        }
   .table > thead > tr > th{
           padding: 5px;
        }
   
      .table > tbody > tr > td {
    border-top:0px!important;
    border-bottom: 1px dashed #000!important;
        padding: 5px;
}
         .table > thead > tr > th.cln{
            /*border-bottom: 0px!important;*/
            border-bottom: 0px!important;
        }
      .table > thead > tr > th.clm{
            /*border-bottom: 0px!important;*/
            border-top: 0px!important;
        }
       .table > tbody > tr > td.cln{
            /*border-bottom: 0px!important;*/
            border-bottom: 0px!important;
        }
      .footer_section{
          display:none;
      }
      .top-header{
          display:none;
      }
                        </style> "
                   + "</head><body>";

            string sbString = html;


            #region PageHeader
            var page = $@"
    <div class='container - fluid'>
       < div class='text-center'>STATE BOARD OF TECHNICAL EDUCATION & TRAINING - T.S.HYDERABAD</div>
      <!--  <div class='col-md-3 pull-right'>Page : 1</div>-->
        <div class='text-center'>PROVISIONAL SUMMARY OF CUMULATIVE RECORDS OF THE CANDIDATE</div>
        <div class='text-center'>----------------------(CURRICULUM -16)------------------------</div>
        <div class='col-md-6'>3 YEARS DIPLOMA COURSE IN AUTOMOBILE ENGINEERING</div>
        <div class='col-md-6 pull-right'>EXAMINATION HELD : MAR/APR 2019</div>
        <div class='col-md-12'>INSTITUTE CODE & NAME : 001 GOVT.POLYTECHNIC HYDERABAD</div>
       <hr class='myHr'/>
</div>";

            #endregion

            #region PageContent
            page += $@"
<div class='container-fluid'>
 <table class='table'>
            < thead >
                < tr >
                    < th class='text-center' rowspan='2' >P.C.NO</th>
                    <th class='text-center' style='width:20%;border-bottom:0px!important;' >Name</th>
                    <th class='text-center clmWth' rowspan='2' >PIN</th>
                    <th class='text-center cln' >
                        1 Yr
                    </th>
                    <th class='text-center cln'> 25% </th>
                    <th class='text-center cln'> 3SEM</th>
                    <th class='text-center  cln'> 4SEM</th>
                    <th class='text-center cln'> 5SEM</th>
                    <th class='text-center cln'> 6SEM</th>
                    <th class='text-center cln'> Total</th>
                    <th class='text-center cln'> Percent</th>
                </tr>
                <tr>

                    <th class='text-center myClm' >Father Name</th>
                    <th class='text-center clm' >1100</th>
                    <th class='text-center clm'>275</th>
                    <th class='text-center clm'>1000</th>
                    <th class='text-center clm'>1000</th>
                    <th class='text-center clm'>1100</th>
                    <th class='text-center clm'>300</th>
                    <th class='text-center clm'>3675</th>
                    <th class='text-center clm'>Class</th>
                </tr>

            </thead>
            <tbody>

                <tr >
                    <td class='text-center' rowspan='2'> 190416200001</td>
                    <td class='text-center cln'>AISHWARYA CHAVAN</td>
                    <td class='text-center' rowspan='2'>16001-A-001</td>
                    <td class='text-center' rowspan='2'>960</td>
                    <td class='text-center' rowspan='2'>242</td>
                    <td class='text-center'rowspan='2'>805</td>
                    <td class='text-center' rowspan='2'>884</td>
                    <td class='text-center' rowspan='2'>993</td>
                    <td class='text-center' rowspan='2'>296</td>
                    <td class='text-center cln' >3220</td>
                    <td class='text-center cln' >87.2</td>
                 
                </tr>              
                <tr>
                    <td class='text-center'>TRILOK RAJ CHAVAN</td>
                    <td class='text-center' colspan='2'>FIRST CLASS(DISTN)</td>
                </tr>
                <tr>
                    <td class='text-center' rowspan='2'> 190416200001</td>
                    <td class='text-center cln'>AISHWARYA CHAVAN</td>
                    <td class='text-center' rowspan='2'>16001-A-001</td>
                    <td class='text-center' rowspan='2'>960</td>
                    <td class='text-center' rowspan='2'>242</td>
                    <td class='text-center' rowspan='2'>805</td>
                    <td class='text-center' rowspan='2'>884</td>
                    <td class='text-center' rowspan='2'>993</td>
                    <td class='text-center' rowspan='2'>296</td>
                    <td class='text-center cln'>3200</td>
                    <td class='text-center cln'>87.2</td>

                </tr>
                <tr>
                    <td class='text-center'>TRILOK RAJ CHAVAN</td>
                    <td class='text-center' colspan='2'>FIRST CLASS(DISTN)</td>
                </tr>
                <tr>
                    <td class='text-center' rowspan='2'> 190416200001</td>
                    <td class='text-center cln'>AISHWARYA CHAVAN</td>
                    <td class='text-center' rowspan='2'>16001-A-001</td>
                    <td class='text-center' rowspan='2'>960</td>
                    <td class='text-center' rowspan='2'>242</td>
                    <td class='text-center' rowspan='2'>805</td>
                    <td class='text-center' rowspan='2'>884</td>
                    <td class='text-center' rowspan='2'>993</td>
                    <td class='text-center' rowspan='2'>296</td>
                    <td class='text-center cln'>3200</td>
                    <td class='text-center cln'>87.2</td>

                </tr>
                <tr>
                    <td class='text-center'>TRILOK RAJ CHAVAN</td>
                    <td class='text-center' colspan='2'>FIRST CLASS(DISTN)</td>
                </tr>
                <tr>
                    <td class='text-center' rowspan='2'> 190416200001</td>
                    <td class='text-center cln'>AISHWARYA CHAVAN</td>
                    <td class='text-center' rowspan='2'>16001-A-001</td>
                    <td class='text-center' rowspan='2'>960</td>
                    <td class='text-center' rowspan='2'>242</td>
                    <td class='text-center' rowspan='2'>805</td>
                    <td class='text-center' rowspan='2'>884</td>
                    <td class='text-center' rowspan='2'>993</td>
                    <td class='text-center' rowspan='2'>296</td>
                    <td class='text-center cln'>3200</td>
                    <td class='text-center cln'>87.2</td>

                </tr>
                <tr>
                    <td class='text-center'>TRILOK RAJ CHAVAN</td>
                    <td class='text-center' colspan='2'>FIRST CLASS(DISTN)</td>
                </tr>
                <tr>
                    <td class='text-center' rowspan='2'> 190416200001</td>
                    <td class='text-center cln'>AISHWARYA CHAVAN</td>
                    <td class='text-center' rowspan='2'>16001-A-001</td>
                    <td class='text-center' rowspan='2'>960</td>
                    <td class='text-center' rowspan='2'>242</td>
                    <td class='text-center' rowspan='2'>805</td>
                    <td class='text-center' rowspan='2'>884</td>
                    <td class='text-center' rowspan='2'>993</td>
                    <td class='text-center' rowspan='2'>296</td>
                    <td class='text-center cln'>3200</td>
                    <td class='text-center cln'>87.2</td>
                </tr>
                <tr>
                    <td class='text-center'>TRILOK RAJ CHAVAN</td>
                    <td class='text-center' colspan='2'>FIRST CLASS(DISTN)</td>
                </tr>
                <tr>
                    <td class='text-center' rowspan='2'> 190416200001</td>
                    <td class='text-center cln'>AISHWARYA CHAVAN</td>
                    <td class='text-center' rowspan='2'>16001-A-001</td>
                    <td class='text-center' rowspan='2'>960</td>
                    <td class='text-center' rowspan='2'>242</td>
                    <td class='text-center' rowspan='2'>805</td>
                    <td class='text-center' rowspan='2'>884</td>
                    <td class='text-center' rowspan='2'>993</td>
                    <td class='text-center' rowspan='2'>296</td>
                    <td class='text-center cln'>3200</td>
                    <td class='text-center cln'>87.2</td>
                </tr>
                <tr>
                    <td class='text-center'>TRILOK RAJ CHAVAN</td>
                    <td class='text-center' colspan='2'>FIRST CLASS(DISTN)</td>
                </tr>
                <tr>
                    <td class='text-center' rowspan='2'> 190416200001</td>
                    <td class='text-center cln'>AISHWARYA CHAVAN</td>
                    <td class='text-center' rowspan='2'>16001-A-001</td>
                    <td class='text-center' rowspan='2'>960</td>
                    <td class='text-center' rowspan='2'>242</td>
                    <td class='text-center' rowspan='2'>805</td>
                    <td class='text-center' rowspan='2'>884</td>
                    <td class='text-center' rowspan='2'>993</td>
                    <td class='text-center' rowspan='2'>296</td>
                    <td class='text-center cln'>3200</td>
                    <td class='text-center cln'>87.2</td>
                </tr>
                <tr>
                    <td class='text-center'>TRILOK RAJ CHAVAN</td>
                    <td class='text-center' colspan='2'>FIRST CLASS(DISTN)</td>
                </tr>
                <tr>
                    <td class='text-center' rowspan='2'> 190416200001</td>
                    <td class='text-center cln'>AISHWARYA CHAVAN</td>
                    <td class='text-center' rowspan='2'>16001-A-001</td>
                    <td class='text-center' rowspan='2'>960</td>
                    <td class='text-center' rowspan='2'>242</td>
                    <td class='text-center' rowspan='2'>805</td>
                    <td class='text-center' rowspan='2'>884</td>
                    <td class='text-center' rowspan='2'>993</td>
                    <td class='text-center' rowspan='2'>296</td>
                    <td class='text-center cln'>3200</td>
                    <td class='text-center cln'>87.2</td>
                </tr>
                <tr>
                    <td class='text-center'>TRILOK RAJ CHAVAN</td>
                    <td class='text-center' colspan='2'>FIRST CLASS(DISTN)</td>
                </tr>
                <tr>
                    <td class='text-center' rowspan='2'> 190416200001</td>
                    <td class='text-center cln'>AISHWARYA CHAVAN</td>
                    <td class='text-center' rowspan='2'>16001-A-001</td>
                    <td class='text-center' rowspan='2'>960</td>
                    <td class='text-center' rowspan='2'>242</td>
                    <td class='text-center' rowspan='2'>805</td>
                    <td class='text-center' rowspan='2'>884</td>
                    <td class='text-center' rowspan='2'>993</td>
                    <td class='text-center' rowspan='2'>296</td>
                    <td class='text-center cln'>3200</td>
                    <td class='text-center cln'>87.2</td>
                </tr>
                <tr>
                    <td class='text-center'>TRILOK RAJ CHAVAN</td>
                    <td class='text-center' colspan='2'>FIRST CLASS(DISTN)</td>
                </tr>
            </tbody>
        </table>
</div>";
            #endregion
            #region PageFooter
            page += $@"
<div class='container-fluid'>
         <div>Note : 1) CLASSIFICATION FOR AWARD OF CLASS BASED ON TOTAL OF 25% OF I YEAR, 100% OF REMAINING SEMESTERS.</div>
        <div>2) CLASSIFICATION FOR AWARD OF CLASS BASED ON TOTAL OF 100% OF III SEM TO REMAINING SEMESTERS FOR IVC CANDIDATES.</div>
        <div>* - RULE 12</div>
        
        <div class='col - md - 3'>TOT NO OF CORR : NIL </div>
            < div class='col-md-2'>ASST.</div>
        <div class='col-md-2'>SUPDT.</div>
        <div class='col-md-2'>SECRETARY/DY.</div>
        <div class='col-md-3'>SECRETARY CONTROLLER OF EXAMINATION</div>
     </div>
";
            #endregion
            sbString += page;
            sbString += "</body></html>";

            var converter = new HtmlToPdf();
            converter.Options.ExternalLinksEnabled = true;
            converter.Options.DrawBackground = false;
            converter.Options.JavaScriptEnabled = false;
            converter.Options.WebPageWidth = 1024;
            converter.Options.PdfPageSize = PdfPageSize.A4;
            converter.Options.PdfPageOrientation = PdfPageOrientation.Portrait;

            var doc = converter.ConvertHtmlString(sbString);
            var path = dir + $"{Guid.NewGuid().ToString()}.pdf";
            doc.Save(path);
            doc.Close();

            return path;
        }


        private void CreateIfMissing(string path)
        {
            bool folderExists = Directory.Exists(path);
            if (!folderExists)
                Directory.CreateDirectory(path);
        }

        private class GetTwshRes
        {
            public string ApplicationNumber { get; set; }
            public string PdfUrl { get; set; }
            public string RegNo { get; set; }
        }
    }
}
