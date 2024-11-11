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
using SoftwareSuite.Models.CBT;
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
using SoftwareSuite.Models.Database.CBT;
using SoftwareSuite.Models.CCIC;
using static SoftwareSuite.Controllers.TWSH.TwshStudentRegController;

namespace SoftwareSuite.Controllers.CBT
{

    public class CbtStudentRegController : ApiController
    {

        [HttpPost, ActionName("GetTenthYears")]
        public string GetTenthYears()
        {
            var dbHandler = new CbtdbHandler();
            try
            {
                string StrQuery = "";
                StrQuery = "exec SP_Get_TenthYears";
                var res = dbHandler.ReturnDataSet(StrQuery);
                return JsonConvert.SerializeObject(res);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("SP_Get_TenthYears", 0, ex.Message);
                throw ex;
            }
        }

        [HttpGet, ActionName("GetCBTCourses")]
        public object GetCBTCourses()
        {
            try
            {
                var db = new CbtdbHandler();
                var res = db.ReturnData("SP_GET_Courses");
                return res;
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }

        [HttpGet, ActionName("getLanguages")]
        public HttpResponseMessage getLanguages(int CourseId)
        {
            try
            {
                HttpResponseMessage response = new HttpResponseMessage();
                var dbHandler = new CbtdbHandler();

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


        [HttpGet, ActionName("GetGradeList")]
        public HttpResponseMessage GetGradeList(int CourseId, int language)
        {
            try
            {
                HttpResponseMessage response = new HttpResponseMessage();
                var dbHandler = new CbtdbHandler();
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


        [HttpGet, ActionName("GetCBTExamcentersAndDates")]
        public HttpResponseMessage GetCBTExamcentersAndDates(int CoursesType, int DistrictId)
        {
            try
            {
                HttpResponseMessage response = new HttpResponseMessage();
                var dbHandler = new CbtdbHandler();
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


        [HttpGet, ActionName("GetExaminationDistricts")]
        public HttpResponseMessage GetExaminationDistricts(int CourseId, int UserId, int GradeId)
        {
            try
            {
                HttpResponseMessage response = new HttpResponseMessage();
                var dbHandler = new CbtdbHandler();
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
                                var dbHandler = new CbtdbHandler();
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




        [HttpGet, ActionName("GetPreviousExamData")]
        public HttpResponseMessage GetPreviousExamData(String HallticketNo, int GradeId)
        {
            try
            {
                HttpResponseMessage response = new HttpResponseMessage();
                var dbHandler = new CbtdbHandler();
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
            var dbHandler = new CbtdbHandler();

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

        [HttpGet, ActionName("GetQualificationList")]
        public HttpResponseMessage GetQualificationList(int GradeId)
        {
            try
            {
                HttpResponseMessage response = new HttpResponseMessage();
                var dbHandler = new CbtdbHandler();
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


        [HttpGet, ActionName("GetApplicationNumber")]
        public string GetApplicationNumber()
        {
            var dbHandler = new CbtdbHandler();
            try
            {
                string StrQuery = "";
                StrQuery = "exec SP_Get_ApplicationNumber";
                var res = dbHandler.ReturnDataSet(StrQuery);
                return JsonConvert.SerializeObject(res);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("SP_Get_ApplicationNumber", 0, ex.Message);
                throw ex;
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



        [HttpPost, ActionName("AddCandidateDetails")]
        public string AddCandidateDetails([FromBody] CandidateDetails ReqData)
        {
            try
            {
                string encriptedaadhar = "";

                var res = ReqData.AadhaarNumber.Split(new string[] { "$$@@$$" }, StringSplitOptions.None);
                var crypt = new HbCrypt(res[1]);
                var aadharencrypt = new HbCrypt();
                string aadhar = crypt.AesDecrypt(res[0]);
                string decryptaadhar = aadharencrypt.AesDecrypt(aadhar);
                encriptedaadhar = aadharencrypt.Encrypt(decryptaadhar);


                var dir = AppDomain.CurrentDomain.BaseDirectory + @"\CBTPhotos\";
                var photosign_url = dir + "Photo" + ReqData.ApplicationNumber + ".JPG";
                var PhotoSign = "Photo_" + ReqData.ApplicationNumber + ".JPG";


                var qual1_url = dir + "Qualification1" + ReqData.ApplicationNumber + ".JPG";
                var Qual1 = "Qualification1_" + ReqData.ApplicationNumber + ".JPG";

                var qual2_url = dir + "Qualification2" + ReqData.ApplicationNumber + ".JPG";
                var Qual2 = "Qualification2_" + ReqData.ApplicationNumber + ".JPG";

                var path = string.Empty;
                string relativePath = string.Empty;
                var PhotoSignpath = string.Empty;
                var Qualification1path = string.Empty;               
                var Qualification2path = string.Empty;


                if (ReqData.PhotoPath != null)
                {
                    PhotoSign = "Photo_" + ReqData.ApplicationNumber + ".JPG";
                    path = dir;
                    bool foldrExists = Directory.Exists(dir);
                    if (!foldrExists)
                        Directory.CreateDirectory(dir);
                    string imgPath = Path.Combine(path, PhotoSign);
                    byte[] Bytes = Convert.FromBase64String(ReqData.PhotoPath);
                    File.WriteAllBytes(imgPath, Bytes);
                    relativePath = imgPath.Replace(HttpContext.Current.Request.PhysicalApplicationPath, GetWebAppRoot()).Replace(@"\", "/");
                    photosign_url = relativePath;
                }
                else
                {
                    photosign_url = null;
                }

               

                if (ReqData.Qualification1 != null)
                {
                    Qual1 = "Qualification1_" + ReqData.ApplicationNumber + ".JPG";
                    path = dir;
                    bool foldrExists = Directory.Exists(dir);
                    if (!foldrExists)
                        Directory.CreateDirectory(dir);
                    string imgPath = Path.Combine(path, Qual1);
                    byte[] Bytes = Convert.FromBase64String(ReqData.Qualification1);
                    File.WriteAllBytes(imgPath, Bytes);
                    relativePath = imgPath.Replace(HttpContext.Current.Request.PhysicalApplicationPath, GetWebAppRoot()).Replace(@"\", "/");
                    qual1_url = relativePath;
                }
                else
                {
                    qual1_url = null;
                }


                if (ReqData.Qualification2 != null)
                {
                    Qual2 = "Qualification2_" + ReqData.ApplicationNumber + ".JPG";
                    path = dir;
                    bool foldrExists = Directory.Exists(dir);
                    if (!foldrExists)
                        Directory.CreateDirectory(dir);
                    string imgPath = Path.Combine(path, Qual2);
                    byte[] Bytes = Convert.FromBase64String(ReqData.Qualification2);
                    File.WriteAllBytes(imgPath, Bytes);
                    relativePath = imgPath.Replace(HttpContext.Current.Request.PhysicalApplicationPath, GetWebAppRoot()).Replace(@"\", "/");
                    qual2_url = relativePath;
                }
                else
                {
                    qual2_url = null;
                }


                var dbHandler = new CbtdbHandler();
                var param = new SqlParameter[40];
                param[0] = new SqlParameter("@ApplicationNumber", ReqData.ApplicationNumber);
                param[1] = new SqlParameter("@CourseID", ReqData.CourseID);
                param[2] = new SqlParameter("@LanguageID", ReqData.LanguageID);
                param[3] = new SqlParameter("@GradeID", ReqData.GradeID);
                param[4] = new SqlParameter("@QualificationID", ReqData.QualificationID);
                param[5] = new SqlParameter("@AppearLastSession", ReqData.AppearLastSession);
                param[6] = new SqlParameter("@LastSessionHallticket", ReqData.LastSessionHallticket);
                param[7] = new SqlParameter("@AadhaarNumber", encriptedaadhar);
                param[8] = new SqlParameter("@SSCAppeared", ReqData.SSCAppeared);
                param[9] = new SqlParameter("@SSCHallticketNo", ReqData.SSCHallticketNo);
                param[10] = new SqlParameter("@SSCPassedYear", ReqData.SSCPassedYear);
                param[11] = new SqlParameter("@SSCPassedType", ReqData.SSCPassedType);
                param[12] = new SqlParameter("@SSCVerified", ReqData.SSCVerified);
                param[13] = new SqlParameter("@CandidateName", ReqData.CandidateName);
                param[14] = new SqlParameter("@FatherName", ReqData.FatherName);
                param[15] = new SqlParameter("@MotherName", ReqData.MotherName);
                param[16] = new SqlParameter("@DateofBirth", ReqData.DateofBirth);
                param[17] = new SqlParameter("@Gender", ReqData.Gender);
                param[18] = new SqlParameter("@ExamDistrictID", ReqData.ExamDistrictID);
                param[19] = new SqlParameter("@ExamCenterID", ReqData.ExamCenterID);
                param[20] = new SqlParameter("@ExamDateOption1", ReqData.ExamDateOption1);
                param[21] = new SqlParameter("@ExamDateOption2", ReqData.ExamDateOption2);
                param[22] = new SqlParameter("@ExamDateOption3", ReqData.ExamDateOption3);
                param[23] = new SqlParameter("@ExamDateOption4", ReqData.ExamDateOption4);
                param[24] = new SqlParameter("@ExamDateOption5", ReqData.ExamDateOption5);
                param[25] = new SqlParameter("@SelectedExamDate", ReqData.SelectedExamDate);
                param[26] = new SqlParameter("@HouseNumber", ReqData.HouseNumber);
                param[27] = new SqlParameter("@Street", ReqData.Street);
                param[28] = new SqlParameter("@VillageTown", ReqData.VillageTown);
                param[29] = new SqlParameter("@Mandal", ReqData.Mandal);
                param[30] = new SqlParameter("@District", ReqData.District);
                param[31] = new SqlParameter("@Pincode", ReqData.Pincode);
                param[32] = new SqlParameter("@CandidateMobile", ReqData.CandidateMobile);
                param[33] = new SqlParameter("@CandidateEmail", ReqData.CandidateEmail);
                param[34] = new SqlParameter("@PhotoPath", photosign_url);
                param[35] = new SqlParameter("@Qualification1", qual1_url);
                param[36] = new SqlParameter("@Qualification2", qual2_url);
                param[37] = new SqlParameter("@ApplicationStatus", ReqData.ApplicationStatus);
                param[38] = new SqlParameter("@HallTicketNumber", ReqData.HallTicketNumber);
                param[39] = new SqlParameter("@Submitted", ReqData.Submitted);

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Add_Update_CandidateDetails", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("SP_Add_Update_CandidateDetails", 0, ex.Message);
                return ex.Message;
            }
        }




        [HttpPost, ActionName("UpdateCandidateDetails")]
        public string UpdateCandidateDetails([FromBody] CandidateDetails ReqData)
        {
            try
            {
                string encriptedaadhar = "";

                var res = ReqData.AadhaarNumber.Split(new string[] { "$$@@$$" }, StringSplitOptions.None);
                var crypt = new HbCrypt(res[1]);
                var aadharencrypt = new HbCrypt();
                string aadhar = crypt.AesDecrypt(res[0]);
                string decryptaadhar = aadharencrypt.AesDecrypt(aadhar);
                encriptedaadhar = aadharencrypt.Encrypt(decryptaadhar);


                var dir = AppDomain.CurrentDomain.BaseDirectory + @"\CBTPhotos\";
                var photosign_url = dir + "Photo" + ReqData.ApplicationNumber + ".JPG";
                var PhotoSign = "Photo_" + ReqData.ApplicationNumber + ".JPG";


                var qual1_url = dir + "Qualification1" + ReqData.ApplicationNumber + ".JPG";
                var Qual1 = "Qualification1_" + ReqData.ApplicationNumber + ".JPG";

                var qual2_url = dir + "Qualification2" + ReqData.ApplicationNumber + ".JPG";
                var Qual2 = "Qualification2_" + ReqData.ApplicationNumber + ".JPG";

                var path = string.Empty;
                string relativePath = string.Empty;
                var PhotoSignpath = string.Empty;
                var Qualification1path = string.Empty;
                var Qualification2path = string.Empty;


                if (ReqData.EditPhotoPath != null)
                {
                    PhotoSign = "Photo_" + ReqData.ApplicationNumber + ".JPG";
                    path = dir;
                    bool foldrExists = Directory.Exists(dir);
                    if (!foldrExists)
                        Directory.CreateDirectory(dir);
                    string imgPath = Path.Combine(path, PhotoSign);
                    byte[] Bytes = Convert.FromBase64String(ReqData.EditPhotoPath);
                    File.WriteAllBytes(imgPath, Bytes);
                    relativePath = imgPath.Replace(HttpContext.Current.Request.PhysicalApplicationPath, GetWebAppRoot()).Replace(@"\", "/");
                    photosign_url = relativePath;
                }
                else
                {
                    photosign_url = null;
                }



                if (ReqData.EditQualification1 != null)
                {
                    Qual1 = "Qualification1_" + ReqData.ApplicationNumber + ".JPG";
                    path = dir;
                    bool foldrExists = Directory.Exists(dir);
                    if (!foldrExists)
                        Directory.CreateDirectory(dir);
                    string imgPath = Path.Combine(path, Qual1);
                    byte[] Bytes = Convert.FromBase64String(ReqData.EditQualification1);
                    File.WriteAllBytes(imgPath, Bytes);
                    relativePath = imgPath.Replace(HttpContext.Current.Request.PhysicalApplicationPath, GetWebAppRoot()).Replace(@"\", "/");
                    qual1_url = relativePath;
                }
                else
                {
                    qual1_url = null;
                }


                if (ReqData.EditQualification2 != null)
                {
                    Qual2 = "Qualification2_" + ReqData.ApplicationNumber + ".JPG";
                    path = dir;
                    bool foldrExists = Directory.Exists(dir);
                    if (!foldrExists)
                        Directory.CreateDirectory(dir);
                    string imgPath = Path.Combine(path, Qual2);
                    byte[] Bytes = Convert.FromBase64String(ReqData.EditQualification2);
                    File.WriteAllBytes(imgPath, Bytes);
                    relativePath = imgPath.Replace(HttpContext.Current.Request.PhysicalApplicationPath, GetWebAppRoot()).Replace(@"\", "/");
                    qual2_url = relativePath;
                }
                else
                {
                    qual2_url = null;
                }


                var dbHandler = new CbtdbHandler();
                var param = new SqlParameter[40];
                param[0] = new SqlParameter("@ApplicationNumber", ReqData.ApplicationNumber);
                param[1] = new SqlParameter("@CourseID", ReqData.CourseID);
                param[2] = new SqlParameter("@LanguageID", ReqData.LanguageID);
                param[3] = new SqlParameter("@GradeID", ReqData.GradeID);
                param[4] = new SqlParameter("@QualificationID", ReqData.QualificationID);
                param[5] = new SqlParameter("@AppearLastSession", ReqData.AppearLastSession);
                param[6] = new SqlParameter("@LastSessionHallticket", ReqData.LastSessionHallticket);
                param[7] = new SqlParameter("@AadhaarNumber", encriptedaadhar);
                param[8] = new SqlParameter("@SSCAppeared", ReqData.SSCAppeared);
                param[9] = new SqlParameter("@SSCHallticketNo", ReqData.SSCHallticketNo);
                param[10] = new SqlParameter("@SSCPassedYear", ReqData.SSCPassedYear);
                param[11] = new SqlParameter("@SSCPassedType", ReqData.SSCPassedType);
                param[12] = new SqlParameter("@SSCVerified", ReqData.SSCVerified);
                param[13] = new SqlParameter("@CandidateName", ReqData.CandidateName);
                param[14] = new SqlParameter("@FatherName", ReqData.FatherName);
                param[15] = new SqlParameter("@MotherName", ReqData.MotherName);
                param[16] = new SqlParameter("@DateofBirth", ReqData.DateofBirth);
                param[17] = new SqlParameter("@Gender", ReqData.Gender);
                param[18] = new SqlParameter("@ExamDistrictID", ReqData.ExamDistrictID);
                param[19] = new SqlParameter("@ExamCenterID", ReqData.ExamCenterID);
                param[20] = new SqlParameter("@ExamDateOption1", ReqData.ExamDateOption1);
                param[21] = new SqlParameter("@ExamDateOption2", ReqData.ExamDateOption2);
                param[22] = new SqlParameter("@ExamDateOption3", ReqData.ExamDateOption3);
                param[23] = new SqlParameter("@ExamDateOption4", ReqData.ExamDateOption4);
                param[24] = new SqlParameter("@ExamDateOption5", ReqData.ExamDateOption5);
                param[25] = new SqlParameter("@SelectedExamDate", ReqData.SelectedExamDate);
                param[26] = new SqlParameter("@HouseNumber", ReqData.HouseNumber);
                param[27] = new SqlParameter("@Street", ReqData.Street);
                param[28] = new SqlParameter("@VillageTown", ReqData.VillageTown);
                param[29] = new SqlParameter("@Mandal", ReqData.Mandal);
                param[30] = new SqlParameter("@District", ReqData.District);
                param[31] = new SqlParameter("@Pincode", ReqData.Pincode);
                param[32] = new SqlParameter("@CandidateMobile", ReqData.CandidateMobile);
                param[33] = new SqlParameter("@CandidateEmail", ReqData.CandidateEmail);
                param[34] = new SqlParameter("@PhotoPath", photosign_url);
                param[35] = new SqlParameter("@Qualification1", qual1_url);
                param[36] = new SqlParameter("@Qualification2", qual2_url);
                param[37] = new SqlParameter("@ApplicationStatus", ReqData.ApplicationStatus);
                param[38] = new SqlParameter("@HallTicketNumber", ReqData.HallTicketNumber);
                param[39] = new SqlParameter("@Submitted", ReqData.Submitted);

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Add_Update_CandidateDetails", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("SP_Add_Update_CandidateDetails", 0, ex.Message);
                return ex.Message;
            }
        }

        public class person
        {
            public string Aadhar { get; set; }
            public string Data { get; set; }


        }

        [HttpGet, ActionName("GetViewCandidateDetails")]
        public string GetViewCandidateDetails(string ApplicationNumber, int CandidateID, int ApplicationStatus)
        {
            try
            {

                var dbHandler = new CbtdbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@ApplicationNumber", ApplicationNumber);
                param[1] = new SqlParameter("@CandidateID", CandidateID);
                param[2] = new SqlParameter("@ApplicationStatus", ApplicationStatus);
                var aadharcrypt = new CbtCrypt();
                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_Get_ViewCandidateDetails", param);


                string decryptaadhar = "";
                string Aadhar = dt.Tables[0].Rows[0]["Aadhaar"].ToString();
                decryptaadhar = aadharcrypt.CbtDecrypt(Aadhar);
                List<person> p = new List<person>();
                person p1 = new person();
                p1.Data = JsonConvert.SerializeObject(dt);
                p1.Aadhar = JsonConvert.SerializeObject(decryptaadhar);

                p.Add(p1);

                return JsonConvert.SerializeObject(p);


            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("SP_Get_ViewCandidateDetails", 0, ex.Message);
                return ex.Message;
            }

        }


        [HttpGet, ActionName("GetCandidateDetails")]
        public string GetCandidateDetails(string ApplicationNumber, int CandidateID)
        {
            try
            {

                var dbHandler = new CbtdbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@ApplicationNumber", ApplicationNumber);
                param[1] = new SqlParameter("@CandidateID", CandidateID);
                var aadharcrypt = new CbtCrypt();
                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_Get_CandidateDetails", param);


                string decryptaadhar = "";
                string Aadhar = dt.Tables[0].Rows[0]["Aadhaar"].ToString();
                decryptaadhar = aadharcrypt.CbtDecrypt(Aadhar);
                List<person> p = new List<person>();
                person p1 = new person();
                p1.Data = JsonConvert.SerializeObject(dt);
                p1.Aadhar = JsonConvert.SerializeObject(decryptaadhar);

                p.Add(p1);

                return JsonConvert.SerializeObject(p);


            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("SP_Get_ViewCandidateDetails", 0, ex.Message);
                return ex.Message;
            }

        }



        //[HttpPost, ActionName("SubmitStdDetails")]
        //public string SubmitStdDetails([FromBody] JsonObject data)
        //{
        //    try
        //    {
        //        var dbHandler = new ccicdbHandler();
        //        var param = new SqlParameter[2];
        //        param[0] = new SqlParameter("@ApplicationNumber", data["ApplicationNumber"]);
        //        param[1] = new SqlParameter("@StudentID", data["StudentID"]);



        //        var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Set_ApplicationSubmit", param);
        //        return JsonConvert.SerializeObject(dt);
        //    }
        //    catch (Exception ex)
        //    {

        //        dbHandler.SaveErorr("SP_Set_ApplicationSubmit", 0, ex.Message);
        //        return ex.Message;
        //    }

        //}

        public class submitdetails
        {
            public string ApplicationNumber { get; set; }
            public string CandidateID { get; set; }
        }


        [HttpPost, ActionName("SubmitCandidateDetails")]
        public async Task<HttpResponseMessage> SubmitCandidateDetails([FromBody] submitdetails data)
        {
            try
            {
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);
                var dbHandler = new CbtdbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@ApplicationNumber", data.ApplicationNumber);
                param[1] = new SqlParameter("@CandidateID", data.CandidateID);
                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_Set_ApplicationSubmit", param);
                if (dt.Tables[0].Rows[0]["ResponceCode"].ToString() == "200")
                {
                    string ApplicationNumber = Convert.ToString(dt.Tables[1].Rows[0]["ApplicationNumber"]);
                    string MobileNumber = Convert.ToString(dt.Tables[1].Rows[0]["MobileNumber"]);
                    string url = ConfigurationManager.AppSettings["SMS_API"].ToString();
                    var temptateid = "1007170028100323520";
                    var msg = " Please note Your Application No " + ApplicationNumber + " for TWSH " + 2024 + " exam secretary SBTET, TS.";
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




    }


}
