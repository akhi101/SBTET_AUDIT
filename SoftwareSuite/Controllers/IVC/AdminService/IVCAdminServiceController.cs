using Newtonsoft.Json;
using SoftwareSuite.Models;
using SoftwareSuite.Models.Database;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Net;
using System.Web.Http;
using RestSharp;
using System.Drawing;
using System.IO;
using System.Threading.Tasks;
using SoftwareSuite.Controllers.Common;
using System.Net.Http;
using SoftwareSuite.BLL;
using System.Web;
using System.Configuration;
using System.Net.Http.Headers;
using System.Security.RightsManagement;

namespace SoftwareSuite.Controllers.IVC
{
    public class IVCAdminServiceController : ApiController

    {
        public string RequestURI { get; private set; }

        public class person
        {
            public string file { get; set; }
            public string ResponceCode { get; set; }
            public string ResponceDescription { get; set; }
            public string Image { get; internal set; }
        }

      
        internal class Output
        {
            public string ResponceCode { get; internal set; }
            public string ResponceDescription { get; internal set; }
            public string Captcha { get; internal set; }
        }

        [HttpPost, ActionName("GetTenthYears")]
        public string GetTenthYears()
        {
            var dbHandler = new ivcdbHandler();
            try
            {
                string StrQuery = "";
                StrQuery = "exec SP_Get_TenthYears";
                var res = dbHandler.ReturnDataSet(StrQuery);
                return JsonConvert.SerializeObject(res);
            }
            catch (Exception ex)
            {

                ivcdbHandler.SaveErorr("SP_Get_TenthYears", 0, ex.Message);
                throw ex;
            }
        }

        [HttpPost, ActionName("GetQualifiedExams")]
        public string GetQualifiedExams()
        {
            var dbHandler = new ivcdbHandler();
            try
            {
                string StrQuery = "";
                StrQuery = "exec SP_Get_SSCBoards";
                var res = dbHandler.ReturnDataSet(StrQuery);
                return JsonConvert.SerializeObject(res);
            }
            catch (Exception ex)
            {

                ivcdbHandler.SaveErorr("SP_Get_SSCBoards", 0, ex.Message);
                throw ex;
            }
        }

        [HttpGet, ActionName("GetStudentFeeData")]
        public string GetStudentFeeData(int RegistrationID)
        {
            try
            {
                var dbHandler = new ivcdbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@RegistrationID", RegistrationID);

                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_Get_StudentFeePaymentData", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpGet, ActionName("GetDashboardStatus")]
        public string GetDashboardStatus(int RegistrationID)
        {
            try
            {
                var dbHandler = new ivcdbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@RegistrationID", RegistrationID);

                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_Get_StudentDashBoardStatus", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpGet, ActionName("GetStudentApplicationData")]
        public string GetStudentApplicationData(int RegistrationID)
        {
            try
            {
                var dbHandler = new ivcdbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@RegistrationID", RegistrationID);

                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_Get_StudentApplicationData", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpPost, ActionName("GetStudentDetails")]
        public HttpResponseMessage GetStudentDetails([FromBody] StudentDetailsInfo data)
        {
            var dbHandler = new ivcdbHandler();

            try
            {

                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@RegistrationID", data.RegistrationID);
                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_Get_StudentDetails", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {

                ivcdbHandler.SaveErorr("SP_Get_StudentDetails", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }

        [HttpGet, ActionName("GetStates")]
        public string GetStates()
        {
            var dbHandler = new ivcdbHandler();
            try
            {
                string StrQuery = "";
                StrQuery = "exec SP_Get_States";
                var res = dbHandler.ReturnDataSet(StrQuery);
                return JsonConvert.SerializeObject(res);
            }
            catch (Exception ex)
            {

                ivcdbHandler.SaveErorr("SP_Get_States", 0, ex.Message);
                throw ex;
            }
        }

        [HttpGet, ActionName("GetDistrictsbyState")]
        public string GetDistrictsbyState(int DataType, int StateID)
        {
            try
            {
                var dbHandler = new ivcdbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@DataType", DataType);
                param[1] = new SqlParameter("@StateID", StateID);

                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_Get_Districts", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpGet, ActionName("GetMandalsbyDistrict")]
        public string GetMandalsbyDistrict(int DistrictID)
        {
            try
            {
                var dbHandler = new ivcdbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@DistrictID", DistrictID);

                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_Get_Mandals", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }


        [HttpPost, ActionName("GetIVCEWSVerification")]
        public async Task<HttpResponseMessage> GetIVCEWSVerification([FromBody] EWSDetails ReqData)
        {

            var url = ConfigurationManager.AppSettings["EWS_API"].ToString();
            //var urlwithparam = url + "?applicationNo=" + ReqData.applicationNo + "&userid=" + ReqData.userid;
            //using (HttpClient client = new HttpClient())

            HttpClient client = new HttpClient();
            client.BaseAddress = new Uri(url);
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            HttpResponseMessage response = client.PostAsJsonAsync(RequestURI, ReqData).Result;
            return response;

        }



        public class EWSDetails
        {
            public string applicationNo { get; set; }
            public string userid { get; set; }
        }

        [HttpPost, ActionName("GetCasteDetails")]
        public async Task<HttpResponseMessage> GetCasteDetails([FromBody] CasteDetails ReqData)
        {

            var url = ConfigurationManager.AppSettings["MEESEVA_API"].ToString();
            //var urlwithparam = url + "?applicationNo=" + ReqData.applicationNo + "&userid=" + ReqData.userid;
            //using (HttpClient client = new HttpClient())

            HttpClient client = new HttpClient();
            client.BaseAddress = new Uri(url);
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            HttpResponseMessage response = client.PostAsJsonAsync(RequestURI, ReqData).Result;
            return response;

        }

        [HttpGet, ActionName("GetIVCCourses")]
        public string GetIVCCourses(int IVCYear)
        {
            try
            {
                var dbHandler = new ivcdbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@IVCYear", IVCYear);

                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_Get_IVCCourses", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpGet, ActionName("GetLEPCourses")]
        public string GetLEPCourses(int IVCCourseID)
        {
            try
            {
                var dbHandler = new ivcdbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@IVCCourseID", IVCCourseID);

                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_Get_LEPCourses", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }




        public class CasteDetails
        {
            public string applicationNo { get; set; }
            public string userid { get; set; }
        }

        public class StudentDetailsInfo
        {

            public string HallicketNo { get; set; }
            public string HallticketNo { get; set; }
            public string UserName { get; set; }
            public int DataType { get; set; }
            public bool SscPhotoType { get; set; }

            public bool PhotoUpdate { get; set; }

            public bool SscSignType { get; set; }
            public bool SSCPhoto { get; set; }
            public bool SSCSign { get; set; }
            public bool SSCVerified { get; set; }
            public string DateOfBirthText { get; set; }
            public int RegistrationID { get; set; }
            public string RegistrationNumber { get; set; }
            public int QualifiedExamID { get; set; }
            public string TenthHallticketNumber { get; set; }
            public string TenthYear { get; set; }
            public string ExaminationType { get; set; }
            public string StudentName { get; set; }
            public string FatherName { get; set; }
            public string MotherName { get; set; }
            public string DateofBirth { get; set; }
            public string Gender { get; set; }
            public string MobileNumber { get; set; }
            public string AlternateMobileNumber { get; set; }
            public string Email { get; set; }
            public string HouseNumber { get; set; }
            public string StreetName { get; set; }
            public string Locality { get; set; }
            public string Landmark { get; set; }
            public string Village { get; set; }
            public int StateID { get; set; }
            public int DistrictID { get; set; }
            public string DistrictName { get; set; }
            public int MandalID { get; set; }
            public string MandalName { get; set; }
            public int Pincode { get; set; }
            public int CasteCategoryID { get; set; }
            public string AadharNumber { get; set; }
            public string CasteCertificateNumber { get; set; }

            public bool CasteVerified { get; set; }
            public bool EWS { get; set; }
            public string EWSNumber { get; set; }
            public bool EWSVerified { get; set; }
            public int RegionID { get; set; }
            public int MinorityID { get; set; }
            public bool AssistanceinUrdu { get; set; }
            public bool PH { get; set; }
            public bool NCC { get; set; }
            public bool SportsAndGames { get; set; }
            public bool CAP { get; set; }
            public bool PMCares { get; set; }
            public bool AppearedForBiology { get; set; }
            public int PreferenceDistrictID1 { get; set; }
            public int PreferenceMandalID1 { get; set; }
            public int PreferenceDistrictID2 { get; set; }
            public int PreferenceMandalID2 { get; set; }
            public int PreferenceDistrictID3 { get; set; }
            public int PreferenceMandalID3 { get; set; }
            public string StudentPhoto { get; set; }
            public string StudentSignature { get; set; }
            public string SSCMemo { get; set; }
            public int SSCBoardID { get; set; }
            public string DateofBirthText { get; set; }
            public string IVCYear { get; set; }
            public int IVCCourseID { get; set; }
            public bool PassedInSingleAttempt { get; set; } 
            public int LEPCourseID1 { get; set; }
            public int LEPCourseID2 { get; set; }
            public int FirstYearMarks { get; set; }
            public int SecondYearMarks { get; set; }
            public int FirstYearEnglishMarks { get; set; }
            public int SecondYearEnglishMarks { get; set; }
            public int BridgeCourseMarks { get; set; }
            public bool BridgeCoursePassed { get; set; }
            public string IVCMemo { get; set; }
            public string BridgeCourseMemo { get; set; }

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


        [HttpPost, ActionName("AddStudentPersonalDetails")]
        public string AddStudentPersonalDetails([FromBody] StudentDetailsInfo data)
        {
            var dbHandler = new ivcdbHandler();
            try
            {
                var dir = AppDomain.CurrentDomain.BaseDirectory + @"\Photos\";
                var photo_url = dir + "Photo_" + data.RegistrationNumber + ".JPG";
                var StdPhoto = "Photo_" + data.RegistrationNumber + ".JPG";
                var photo_signature = dir + "Signature_" + data.RegistrationNumber + ".JPG";
                var StdSign = "Signature_" + data.RegistrationNumber + ".JPG";
                var memo_url = dir + "SSCMemo_" + data.RegistrationNumber + ".JPG";
                var SSCMemo = "SSCMemo_" + data.RegistrationNumber + ".JPG";
                var path = string.Empty;
                string relativePath = string.Empty;
                var StudentPhotopath = string.Empty;
                var StudentSignaturepath = string.Empty;
                var SSCMemopath = string.Empty;
                if (data.SSCMemo != "")
                {
                    SSCMemo = "SSCMemo_" + data.RegistrationNumber + ".JPG";
                    path = dir;
                    bool foldrExists = Directory.Exists(dir);
                    if (!foldrExists)
                        Directory.CreateDirectory(dir);
                    string imgPath = Path.Combine(path, SSCMemo);
                    byte[] Bytes = Convert.FromBase64String(data.SSCMemo);
                    File.WriteAllBytes(imgPath, Bytes);
                    relativePath = imgPath.Replace(HttpContext.Current.Request.PhysicalApplicationPath, GetWebAppRoot()).Replace(@"\", "/");
                    memo_url = relativePath;
                }
                else
                {
                    memo_url = "";
                }
                if (data.PhotoUpdate == true && data.SscPhotoType == false)
                {
                    photo_url = data.StudentPhoto;
                }
                else
                {
                    if (data.SSCPhoto == false && data.SscPhotoType == false)
                    {
                        if (data.StudentPhoto != "")
                        {
                            StdPhoto = "Photo_" + data.RegistrationNumber + ".JPG";
                            path = dir;
                            bool foldrExists = Directory.Exists(dir);
                            if (!foldrExists)
                                Directory.CreateDirectory(dir);
                            string imgPath = Path.Combine(path, StdPhoto);
                            byte[] Bytes = Convert.FromBase64String(data.StudentPhoto);
                            File.WriteAllBytes(imgPath, Bytes);
                            relativePath = imgPath.Replace(HttpContext.Current.Request.PhysicalApplicationPath, GetWebAppRoot()).Replace(@"\", "/");
                            photo_url = relativePath;
                        }
                        else
                        {
                            photo_url = "";
                        }
                    }
                    else
                   if (data.SSCPhoto == true || data.SscPhotoType == false)
                    {
                        using (WebClient client = new WebClient())
                        {
                            client.DownloadFile(new Uri(data.StudentPhoto), photo_url);
                            path = dir;
                            bool foldrExists = Directory.Exists(dir);
                            if (!foldrExists)
                                Directory.CreateDirectory(dir);
                            //string imgPath = Path.Combine(path, photo_url);
                            //byte[] Bytes = Convert.FromBase64String(data.StudentPhoto);
                            //File.WriteAllBytes(imgPath, Bytes);
                            relativePath = dir.Replace(HttpContext.Current.Request.PhysicalApplicationPath, GetWebAppRoot()).Replace(@"\", "/");
                            photo_url = relativePath + StdPhoto;
                            // OR   
                        }
                    }
                    else
                    {
                        if (data.StudentPhoto != "")
                        {
                            StdPhoto = "Photo_" + data.RegistrationNumber + ".JPG";
                            path = dir;
                            bool foldrExists = Directory.Exists(dir);
                            if (!foldrExists)
                                Directory.CreateDirectory(dir);
                            string imgPath = Path.Combine(path, StdPhoto);
                            byte[] Bytes = Convert.FromBase64String(data.StudentPhoto);
                            File.WriteAllBytes(imgPath, Bytes);
                            relativePath = imgPath.Replace(HttpContext.Current.Request.PhysicalApplicationPath, GetWebAppRoot()).Replace(@"\", "/");
                            photo_url = relativePath;
                        }
                        else
                        {
                            photo_url = "";
                        }
                    }

                }
                if (data.PhotoUpdate == true && data.SscSignType == false)
                {
                    photo_signature = data.StudentSignature;
                }
                else
                {
                    if (data.SSCSign == false && data.SscSignType == false)
                    {
                        if (data.StudentSignature != "")
                        {
                            StdSign = "Signature_" + data.RegistrationNumber + ".JPG";
                            path = dir;
                            bool foldrExists = Directory.Exists(dir);
                            if (!foldrExists)
                                Directory.CreateDirectory(dir);
                            string imgPath = Path.Combine(path, StdSign);
                            byte[] Bytes = Convert.FromBase64String(data.StudentSignature);
                            File.WriteAllBytes(imgPath, Bytes);
                            relativePath = imgPath.Replace(HttpContext.Current.Request.PhysicalApplicationPath, GetWebAppRoot()).Replace(@"\", "/");
                            photo_signature = relativePath;
                        }
                        else
                        {
                            photo_signature = "";
                        }

                    }
                    else if (data.SSCSign == true || data.SscSignType == false)
                    {
                        using (WebClient client = new WebClient())
                        {
                            client.DownloadFileAsync(new Uri(data.StudentSignature), photo_signature);
                            path = dir;
                            bool foldrExists = Directory.Exists(dir);
                            if (!foldrExists)
                                Directory.CreateDirectory(dir);
                            //string imgPath = Path.Combine(path, photo_signature);
                            //byte[] Bytes = Convert.FromBase64String(data.StudentPhoto);
                            //File.WriteAllBytes(imgPath, Bytes);
                            relativePath = dir.Replace(HttpContext.Current.Request.PhysicalApplicationPath, GetWebAppRoot()).Replace(@"\", "/");
                            photo_signature = relativePath + StdSign;
                        }
                    }
                    else
                    {
                        if (data.StudentSignature != "")
                        {
                            StdSign = "Signature_" + data.RegistrationNumber + ".JPG";
                            path = dir;
                            bool foldrExists = Directory.Exists(dir);
                            if (!foldrExists)
                                Directory.CreateDirectory(dir);
                            string imgPath = Path.Combine(path, StdSign);
                            byte[] Bytes = Convert.FromBase64String(data.StudentSignature);
                            File.WriteAllBytes(imgPath, Bytes);
                            relativePath = imgPath.Replace(HttpContext.Current.Request.PhysicalApplicationPath, GetWebAppRoot()).Replace(@"\", "/");
                            photo_signature = relativePath;
                        }
                        else
                        {
                            photo_signature = "";
                        }
                    }
                }
                var param = new SqlParameter[18];
                param[0] = new SqlParameter("@RegistrationID", data.RegistrationID);
                param[1] = new SqlParameter("@RegistrationNumber", data.RegistrationNumber);
                param[2] = new SqlParameter("@SSCBoardID", data.SSCBoardID);
                param[3] = new SqlParameter("@TenthHallticketNumber", data.TenthHallticketNumber);
                param[4] = new SqlParameter("@TenthYear", data.TenthYear);
                param[5] = new SqlParameter("@ExaminationType", data.ExaminationType);
                param[6] = new SqlParameter("@StudentName", data.StudentName);
                param[7] = new SqlParameter("@FatherName", data.FatherName);
                param[8] = new SqlParameter("@MotherName", data.MotherName);
                param[9] = new SqlParameter("@DateofBirth", data.DateofBirth);
                param[10] = new SqlParameter("@Gender", data.Gender);
                param[11] = new SqlParameter("@SSCVerified", data.SSCVerified);
                param[12] = new SqlParameter("@DateofBirthText", data.DateofBirthText);
                param[13] = new SqlParameter("@StudentPhoto", photo_url);
                param[14] = new SqlParameter("@StudentSignature", photo_signature);
                param[15] = new SqlParameter("@SSCMemo", memo_url);
                param[16] = new SqlParameter("@SSCPhoto", data.SSCPhoto);
                param[17] = new SqlParameter("@SSCSign", data.SSCSign);
                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_Add_StudentPersonalDetails", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                ivcdbHandler.SaveErorr("SP_Add_StudentPersonalDetails", 0, ex.Message);
                return ex.Message;
            }
        }

        [HttpPost, ActionName("AddStudentCommunicationDetails")]
        public string AddStudentCommunicationDetails([FromBody] StudentDetailsInfo data)
        {
            var dbHandler = new ivcdbHandler();
            try
            {
                var param = new SqlParameter[16];
                param[0] = new SqlParameter("@RegistrationID", data.RegistrationID);
                param[1] = new SqlParameter("@RegistrationNumber", data.RegistrationNumber);
                param[2] = new SqlParameter("@MobileNumber", data.MobileNumber);
                param[3] = new SqlParameter("@AlternateMobileNumber", data.AlternateMobileNumber);
                param[4] = new SqlParameter("@Email", data.Email);
                param[5] = new SqlParameter("@HouseNumber", data.HouseNumber);
                param[6] = new SqlParameter("@StreetName", data.StreetName);
                param[7] = new SqlParameter("@Locality", data.Locality);
                param[8] = new SqlParameter("@Landmark", data.Landmark);
                param[9] = new SqlParameter("@Village", data.Village);
                param[10] = new SqlParameter("@StateID", data.StateID);
                param[11] = new SqlParameter("@DistrictID", data.DistrictID);
                param[12] = new SqlParameter("@DistrictName", data.DistrictName);
                param[13] = new SqlParameter("@MandalID", data.MandalID);
                param[14] = new SqlParameter("@MandalName", data.MandalName);
                param[15] = new SqlParameter("@Pincode", data.Pincode);

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Add_StudentCommunicationDetails", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                ivcdbHandler.SaveErorr("SP_Add_StudentCommunicationDetails", 0, ex.Message);
                return ex.Message;
            }
        }

        [HttpPost, ActionName("AddStudentCategoryDetails")]
        public string AddStudentCategoryDetails([FromBody] StudentDetailsInfo data)
        {
            var dbHandler = new ivcdbHandler();
            try
            {
                var param = new SqlParameter[9];
                param[0] = new SqlParameter("@RegistrationID", data.RegistrationID);
                param[1] = new SqlParameter("@RegistrationNumber", data.RegistrationNumber);
                param[2] = new SqlParameter("@CasteCategoryID", data.CasteCategoryID);
                param[3] = new SqlParameter("@AadharNumber", data.AadharNumber);
                param[4] = new SqlParameter("@CasteCertificateNumber", data.CasteCertificateNumber);
                param[5] = new SqlParameter("@CasteVerified", data.CasteVerified);
                param[6] = new SqlParameter("@EWS", data.EWS);
                param[7] = new SqlParameter("@EWSNumber", data.EWSNumber);
                param[8] = new SqlParameter("@EWSVerified", data.EWSVerified);

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Add_StudentCategoryDetails", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                ivcdbHandler.SaveErorr("SP_Add_StudentCategoryDetails", 0, ex.Message);
                return ex.Message;
            }
        }

        [HttpPost, ActionName("AddStudentSpecialCategoryDetails")]
        public string AddStudentSpecialCategoryDetails([FromBody] StudentDetailsInfo data)
        {
            var dbHandler = new ivcdbHandler();
            try
            {
                var param = new SqlParameter[8];
                param[0] = new SqlParameter("@RegistrationID", data.RegistrationID);
                param[1] = new SqlParameter("@RegistrationNumber", data.RegistrationNumber);
                param[2] = new SqlParameter("@RegionID", data.RegionID);
                param[3] = new SqlParameter("@MinorityID", data.MinorityID);
                param[4] = new SqlParameter("@PH", data.PH);
                param[5] = new SqlParameter("@NCC", data.NCC);
                param[6] = new SqlParameter("@SportsAndGames", data.SportsAndGames);
                param[7] = new SqlParameter("@CAP", data.CAP);

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Add_StudentSpecialCategoryDetails", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                ivcdbHandler.SaveErorr("SP_Add_StudentSpecialCategoryDetails", 0, ex.Message);
                return ex.Message;
            }
        }



        [HttpPost, ActionName("AddStudentStudyDetails")]
        public string AddStudentStudyDetails([FromBody] StudentDetailsInfo data)
        {
            var dbHandler = new ivcdbHandler();
            try
            {
                var dir = AppDomain.CurrentDomain.BaseDirectory + @"\IVCPhotos\";
                var ivcmemo_url = dir + "IVCMemo_" + data.RegistrationNumber + ".JPG";
                var IVCMemo = "IVCMemo_" + data.RegistrationNumber + ".JPG";
                var bcmemo_url = dir + "BCMemo_" + data.RegistrationNumber + ".JPG";
                var BCMemo = "BCMemo_" + data.RegistrationNumber + ".JPG";             
                var path = string.Empty;
                string relativePath = string.Empty;
                var IVCMemopath = string.Empty;
                var BCMemopath = string.Empty;
                if (data.IVCMemo != "")
                {
                    IVCMemo = "IVCMemo_" + data.RegistrationNumber + ".JPG";
                    path = dir;
                    bool foldrExists = Directory.Exists(dir);
                    if (!foldrExists)
                        Directory.CreateDirectory(dir);
                    string imgPath = Path.Combine(path, IVCMemo);
                    byte[] Bytes = Convert.FromBase64String(data.IVCMemo);
                    File.WriteAllBytes(imgPath, Bytes);
                    relativePath = imgPath.Replace(HttpContext.Current.Request.PhysicalApplicationPath, GetWebAppRoot()).Replace(@"\", "/");
                    ivcmemo_url = relativePath;
                }
                else
                {
                    ivcmemo_url = "";
                }

                if (data.BridgeCourseMemo != "")
                {
                    BCMemo = "BCMemo_" + data.RegistrationNumber + ".JPG";
                    path = dir;
                    bool foldrExists = Directory.Exists(dir);
                    if (!foldrExists)
                        Directory.CreateDirectory(dir);
                    string imgPath = Path.Combine(path, BCMemo);
                    byte[] Bytes = Convert.FromBase64String(data.BridgeCourseMemo);
                    File.WriteAllBytes(imgPath, Bytes);
                    relativePath = imgPath.Replace(HttpContext.Current.Request.PhysicalApplicationPath, GetWebAppRoot()).Replace(@"\", "/");
                    bcmemo_url = relativePath;
                }
                else
                {
                    bcmemo_url = "";
                }

                var param = new SqlParameter[15];
                param[0] = new SqlParameter("@RegistrationID", data.RegistrationID);
                param[1] = new SqlParameter("@RegistrationNumber", data.RegistrationNumber);
                param[2] = new SqlParameter("@IVCYear", data.IVCYear);
                param[3] = new SqlParameter("@IVCCourseID", data.IVCCourseID);
                param[4] = new SqlParameter("@PassedInSingleAttempt", data.PassedInSingleAttempt);
                param[5] = new SqlParameter("@LEPCourseID1", data.LEPCourseID1);
                param[6] = new SqlParameter("@LEPCourseID2", data.LEPCourseID2);
                param[7] = new SqlParameter("@FirstYearMarks", data.FirstYearMarks);
                param[8] = new SqlParameter("@SecondYearMarks", data.SecondYearMarks);
                param[9] = new SqlParameter("@FirstYearEnglishMarks", data.FirstYearEnglishMarks);
                param[10] = new SqlParameter("@SecondYearEnglishMarks", data.SecondYearEnglishMarks);
                param[11] = new SqlParameter("@BridgeCourseMarks", data.BridgeCourseMarks);
                param[12] = new SqlParameter("@BridgeCoursePassed", data.BridgeCoursePassed);
                param[13] = new SqlParameter("@IVCMemo", ivcmemo_url);
                param[14] = new SqlParameter("@BridgeCourseMemo", bcmemo_url);
                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_Add_StudentStudyDetails", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                ivcdbHandler.SaveErorr("SP_Add_StudentStudyDetails", 0, ex.Message);
                return ex.Message;
            }
        }


        [HttpGet, ActionName("SetApplicationSubmit")]
        public string SetApplicationSubmit(int RegistrationID)
        {
            try
            {
                var dbHandler = new ivcdbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@RegistrationID", RegistrationID);

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Set_StudentApplicationSubmit", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }


    }
}
