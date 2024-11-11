extern alias itextalias;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web.Http;
using System.Xml;
using System.Configuration;
using System.Web.Configuration;
using System.Threading.Tasks;
using System.Web;
using Newtonsoft.Json;
using Syntizen.Aadhaar.AUAKUA;
using Newtonsoft.Json.Linq;
using System.Text;
//using Org.BouncyCastle.Utilities.Encoders;
using System.Security.Cryptography;
using itextalias.iTextSharp.xmp.impl;
using System.Data.SqlClient;
using SoftwareSuite.Models.Admission;
using SoftwareSuite.BLL;
using SoftwareSuite.Models.Database;

namespace SoftwareSuite.Controllers.Admission
{
    public class StudentRegController : ApiController
    {

        #region insert/update/delete

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

        [HttpPost]
        public HttpResponseMessage PostStudentReg([FromBody]PolytechStudent StudentReg)
        {
            if (ModelState.IsValid)
            {
                StudentRegBLL StudentRegBLL = new StudentRegBLL();
                var ds = StudentRegBLL.PostStudentReg(StudentReg);
                
                var path = ConfigurationManager.AppSettings["StudentPhotosFolder"];
                string relativePath = string.Empty;
                var file = string.Empty;
                var filename = StudentReg.PIN + ".jpg";
                bool folderExists = Directory.Exists(path);
                if (!folderExists)
                    Directory.CreateDirectory(path);
                string imgPath = Path.Combine(path, filename);
                if (StudentReg.profilephoto1 != null)
                {
                    byte[] imageBytes = Convert.FromBase64String(StudentReg.profilephoto1);

                    File.WriteAllBytes(imgPath, imageBytes);
                    relativePath = imgPath.Replace(HttpContext.Current.Request.PhysicalApplicationPath, GetWebAppRoot()).Replace(@"\", "/");
                    //WESCertificate = relativePath;
                    file += relativePath + ',';
                }
                return Request.CreateResponse(HttpStatusCode.OK, ds);
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        public HttpResponseMessage UpdateStudentRegFirstTab([FromBody]StudentReg StudentReg)
        {
            if (ModelState.IsValid)
            {
                StudentRegBLL StudentRegBLL = new StudentRegBLL();
                var BLLValidationMessages = new List<BLLValidations>();
                BLLValidationMessages = StudentRegBLL.UpdateStudentRegFirstTab(StudentReg);
                if (BLLValidationMessages.Count == 0)
                {
                    return new HttpResponseMessage(HttpStatusCode.OK);
                }
                else
                {
                    return Request.CreateResponse(HttpStatusCode.BadRequest, BLLValidationMessages);
                }

                //return new HttpResponseMessage(HttpStatusCode.OK);

            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }
        public HttpResponseMessage UpdateStudentRegSecondTab([FromBody]StudentReg StudentReg)
        {
            if (ModelState.IsValid)
            {
                StudentRegBLL StudentRegBLL = new StudentRegBLL();
                var BLLValidationMessages = new List<BLLValidations>();
                BLLValidationMessages = StudentRegBLL.UpdateStudentRegSecondTab(StudentReg);
                if (BLLValidationMessages.Count == 0)
                {
                    return new HttpResponseMessage(HttpStatusCode.OK);
                }
                else
                {
                    return Request.CreateResponse(HttpStatusCode.BadRequest, BLLValidationMessages);
                }

                //return new HttpResponseMessage(HttpStatusCode.OK);

            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }
        public HttpResponseMessage UpdateStudentRegThirdTab([FromBody]StudentReg StudentReg)
        {
            if (ModelState.IsValid)
            {
                StudentRegBLL StudentRegBLL = new StudentRegBLL();
                var BLLValidationMessages = new List<BLLValidations>();
                BLLValidationMessages = StudentRegBLL.UpdateStudentRegThirdTab(StudentReg);
                if (BLLValidationMessages.Count == 0)
                {
                    return new HttpResponseMessage(HttpStatusCode.OK);
                }
                else
                {
                    return Request.CreateResponse(HttpStatusCode.BadRequest, BLLValidationMessages);
                }

                //return new HttpResponseMessage(HttpStatusCode.OK);

            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }
        
        #endregion

        #region GetMethod

        [HttpGet, ActionName("GetDistricts")]
        public HttpResponseMessage getDistricts()
        {
            try
            {
                var dbHandler = new dbHandler();
                string StrQuery = "";
                StrQuery = "exec USP_GET_Districts";
                return Request.CreateResponse(HttpStatusCode.OK, dbHandler.ReturnDataSet(StrQuery));
            }
            catch (Exception ex)
            {
                
                dbHandler.SaveErorr("USP_GET_Districts", 0, ex.Message);
                throw ex;
            }
        }

        [HttpGet, ActionName("GetMandalsForDistrict")]
        public HttpResponseMessage GetMandalsForDistrict(int DistrictID)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@DistrictID", DistrictID);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("USP_Get_MandalsByDistrict", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {
                
                dbHandler.SaveErorr("USP_Get_MandalsByDistrict", 0, ex.Message);
                throw ex;
            }

        }

        
           

        public HttpResponseMessage GetStudentRegList()
        {
            StudentRegBLL StudentRegBLL = new StudentRegBLL();
            IEnumerable<StudentReg> StudentRegList = StudentRegBLL.GetStudentRegList();
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, StudentRegList);
            return response;
        }

        public HttpResponseMessage GetStaticDataForAdmission()
        {
            StudentRegBLL StudentRegBLL = new StudentRegBLL();
            var dbHandler = new dbHandler();
            DataSet StaticDataForAdmission = StudentRegBLL.GetStaticDataForAdmission(dbHandler);
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, StaticDataForAdmission);
            return response;
        }

        //public HttpResponseMessage GetMandalsForDistrict(int DistrictId)
        //{
        //    StudentRegBLL StudentRegBLL = new StudentRegBLL();
        //    var dbHandler = new dbHandler();
        //    DataSet StaticDataForAdmission = StudentRegBLL.GetMandalsForDistrict(dbHandler, DistrictId);
        //    HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, StaticDataForAdmission);
        //    return response;
        //}

        public HttpResponseMessage GetStudentRegById(Int64 StudRegID)
        {
            StudentRegBLL StudentRegBLL = new StudentRegBLL();
            //IEnumerable<StudentReg> StudentRegList = StudentRegBLL.GetStudentRegById(StudRegID);
            IEnumerable<PolytechStudent> StudentRegList = StudentRegBLL.GetStudentRegById(StudRegID);
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, StudentRegList);
            return response;
        }
        [HttpGet]
        public HttpResponseMessage GenPin(Int64 StudentID)
        {
            StudentRegBLL StudentRegBLL = new StudentRegBLL();
            IEnumerable<PinGenReply> Pin = StudentRegBLL.GenPin(StudentID);
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, Pin);
            return response;
        }

        [HttpGet]
        public HttpResponseMessage GetStudentRegListForCollege(string CollegeCode, int UserId)
        {
            StudentRegBLL StudentRegBLL = new StudentRegBLL();
            IEnumerable<PolytechStudent> StudentRegList = StudentRegBLL.GetStudentRegListForCollege(CollegeCode, UserId);
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, StudentRegList);
            return response;
        }

        public HttpResponseMessage GetStudentRegListByCourseExamBranch(int CollegeID, int SchemeID = 0, int SemID = 0, int BranchID = 0, int SectionID = 0, int ShiftID = 0)
        {
            StudentRegBLL StudentRegBLL = new StudentRegBLL();
            IEnumerable<PolytechStudent> StudentRegList = StudentRegBLL.GetStudentRegListByCourseExamBranch(CollegeID, SchemeID, SemID, BranchID, SectionID, ShiftID);
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, StudentRegList);
            return response;
        }
        public HttpResponseMessage GetStudentRegListByCollegeCourseBranch(string CollegeCode, int SchemeID = 0, int SemID = 0, int BranchID = 0, int SectionID = 0, int ShiftID = 0, int AcademicYearId = 0)
        {
            StudentRegBLL StudentRegBLL = new StudentRegBLL();
            IEnumerable<PolytechStudent> StudentRegList = StudentRegBLL.GetStudentRegListByCollegeCourseBranch(CollegeCode, SchemeID, SemID, BranchID, SectionID, ShiftID, AcademicYearId);
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, StudentRegList);
            return response;
        }

        public HttpResponseMessage GetStudentRegListByCollegeCourseBranchDataNotUpdated(string CollegeCode, int SchemeID = 0, int SemID = 0, int BranchID = 0, int SectionID = 0, int ShiftID = 0, int AcademicYearId = 0)
        {
            StudentRegBLL StudentRegBLL = new StudentRegBLL();
            IEnumerable<PolytechStudent> StudentRegList = StudentRegBLL.GetStudentRegListByCollegeCourseBranchDataNotUpdated(CollegeCode, SchemeID, SemID, BranchID, SectionID, ShiftID, AcademicYearId);
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, StudentRegList);
            return response;
        }

        public HttpResponseMessage GetStudentRegListByCollegeCourseBranchAadharNotVerified(string CollegeCode, int SchemeID = 0, int SemID = 0, int BranchID = 0, int SectionID = 0, int ShiftID = 0, int AcademicYearId = 0)
        {
            StudentRegBLL StudentRegBLL = new StudentRegBLL();
            IEnumerable<PolytechStudent> StudentRegList = StudentRegBLL.GetStudentRegListByCollegeCourseBranchAadharNotVerified(CollegeCode, SchemeID, SemID, BranchID, SectionID, ShiftID, AcademicYearId);
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, StudentRegList);
            return response;
        }


        public HttpResponseMessage GetStudentRegDetailsListByAdmNoOrPhoto(int CollegeID, string WithPhoto, Int64 AdmNo = 0)
        {
            StudentRegBLL StudentRegBLL = new StudentRegBLL();
            IEnumerable<StudentReg> StudentRegList = StudentRegBLL.GetStudentRegDetailsListByAdmNoOrPhoto(CollegeID, WithPhoto, AdmNo);
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, StudentRegList);
            return response;
        }
        public HttpResponseMessage GetStudentRegDetailsListByGroupAndMedium(int CollegeID, int MainGrpID, int MediumID, int SubjectID = 0)
        {
            StudentRegBLL StudentRegBLL = new StudentRegBLL();
            IEnumerable<StudentReg> StudentRegList = StudentRegBLL.GetStudentRegDetailsListByGroupAndMedium(CollegeID, MainGrpID, MediumID, SubjectID);
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, StudentRegList);
            return response;
        }
        public HttpResponseMessage GetStudentRegDetailsListAll(string CollegeID)
        {
            StudentRegBLL StudentRegBLL = new StudentRegBLL();
            IEnumerable<RegStudentTest> StudentRegList = StudentRegBLL.GetStudentRegDetailsListAll(CollegeID);
            //IEnumerable<StudentReg> StudentRegList = StudentRegBLL.GetStudentRegDetailsListAll(CollegeID);
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, StudentRegList);
            return response;
        }
        public HttpResponseMessage GetAdmissionFormPrint(int CollegeID, int CourseID, int ExamID, int BranchID, string FromDate, string ToDate, Int64 FromAdmNo, Int64 ToAdmNo)
        {
            StudentRegBLL StudentRegBLL = new StudentRegBLL();
            IEnumerable<StudentReg> StudentRegList = StudentRegBLL.GetAdmissionFormPrint(CollegeID, CourseID, ExamID, BranchID, FromDate, ToDate, FromAdmNo, ToAdmNo);
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, StudentRegList);
            return response;
        }
        public HttpResponseMessage GetStudentRegDetailsListForPhotoUpload(int CollegeID, int CourseID = 0, int ExamID = 0, int BranchID = 0, string WithPhoto = "", string ForAadhar = "")
        {
            StudentRegBLL StudentRegBLL = new StudentRegBLL();
            IEnumerable<StudentReg> StudentRegList = StudentRegBLL.GetStudentRegDetailsListForPhotoUpload(CollegeID, CourseID, ExamID, BranchID, WithPhoto, ForAadhar);
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, StudentRegList);
            return response;
        }


        public HttpResponseMessage GetFillStudentRegDetailsListForUpdateCertificates(int CollegeID, int CourseID, int ExamID, int BranchID, string WithCertificates)
        {
            StudentRegBLL StudentRegBLL = new StudentRegBLL();
            IEnumerable<StudentReg> StudentRegList = StudentRegBLL.GetFillStudentRegDetailsListForUpdateCertificates(CollegeID, CourseID, ExamID, BranchID, WithCertificates);
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, StudentRegList);
            return response;
        }

        public HttpResponseMessage GetFillStudentRegDetailsListForGroupChange(int CollegeID, int CourseID, int ExamID, int BranchID)
        {
            StudentRegBLL StudentRegBLL = new StudentRegBLL();
            IEnumerable<StudentReg> StudentRegList = StudentRegBLL.GetFillStudentRegDetailsListForGroupChange(CollegeID, CourseID, ExamID, BranchID);
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, StudentRegList);
            return response;
        }
        public HttpResponseMessage GetBlindCondAprovalList(int CollegeID, int CourseID, int ExamID, int BranchID)
        {
            StudentRegBLL StudentRegBLL = new StudentRegBLL();
            IEnumerable<StudentReg> StudentRegList = StudentRegBLL.GetBlindCondAprovalList(CollegeID, CourseID, ExamID, BranchID);
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, StudentRegList);
            return response;
        }







        public HttpResponseMessage GetStudentRegListByCourseExamBranchForApproval(int CollegeID, int CourseID = 0, int ExamID = 0, int BranchID = 0)
        {
            StudentRegBLL StudentRegBLL = new StudentRegBLL();
            IEnumerable<StudentReg> StudentRegList = StudentRegBLL.GetStudentRegListByCourseExamBranchForApproval(CollegeID, CourseID, ExamID, BranchID);
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, StudentRegList);
            return response;
        }
        public Int64 GetAdmissionMaxNo()
        {
            StudentRegBLL StudentRegBLL = new StudentRegBLL();
            return StudentRegBLL.GetAdmissionMaxNo();
        }
        public Int64 GetCurrentAdminNo(int CollegeID)
        {
            try
            {
                StudentRegService StudentRegService = new StudentRegService();
                dbHandler dbHandler = new dbHandler();
                return StudentRegService.GetCurrentAdminNo(dbHandler, CollegeID);
            }
            catch (Exception ex)
            {
                 throw ex;
            }
        }
        public Int16 GetCheckHallTicketNoPresent(string YrName, string SSCHallTicket, int BoardID, int CollegeID)
        {
            try
            {
                StudentRegBLL StudentRegBLL = new StudentRegBLL();
                return StudentRegBLL.CheckHallTicketNoPresent(YrName, SSCHallTicket, BoardID, CollegeID);
            }
            catch (Exception ex)
            {
                 throw ex;
            }
        }
        public Int16 GetCheckHallTicketNoPresentInCollege(string YrName, string SSCHallTicket, int BoardID)
        {
            try
            {
                StudentRegBLL StudentRegBLL = new StudentRegBLL();
                return StudentRegBLL.CheckHallTicketNoPresentInCollege(YrName, SSCHallTicket, BoardID);
            }
            catch (Exception ex)
            {
                 throw ex;
            }
        }
        public Int16 GetCheckHallTicketNoPresentOpenAdmission(string YrName, string SSCHallTicket, int BoardID, int CollegeID)
        {
            try
            {
                StudentRegBLL StudentRegBLL = new StudentRegBLL();
                return StudentRegBLL.CheckHallTicketNoPresentOpenAdmission(YrName, SSCHallTicket, BoardID, CollegeID);
            }
            catch (Exception ex)
            {
                 throw ex;
            }
        }
        public HttpResponseMessage GetDeleteHallTicketNoPresentOpenAdmission(int AcdYrID, string YrName, string SSCHallTicket, int BoardID)
        {
            try
            {
                StudentRegBLL StudentRegBLL = new StudentRegBLL();
                StudentRegBLL.GetDeleteHallTicketNoPresentOpenAdmission(AcdYrID, YrName, SSCHallTicket, BoardID);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);
                return response;
            }
            catch (Exception ex)
            {
                 throw ex;
            }
        }







        public Int16 GetCheckMobileNoCount(string MobileNo, int CollegeID, int AcdYrID)
        {
            try
            {
                StudentRegBLL StudentRegBLL = new StudentRegBLL();
                return StudentRegBLL.GetCheckMobileNoCount(MobileNo, CollegeID, AcdYrID);
            }
            catch (Exception ex)
            {
                 throw ex;
            }
        }

        public HttpResponseMessage GetStudentRegGroupWiseCountByCourseExamBranch(int CollegeID = 0, int CourseID = 0, int ExamID = 0, int BranchID = 0, int MainGrpID = 0)
        {
            try
            {
                StudentRegBLL StudentRegBLL = new StudentRegBLL();
                IEnumerable<StudentReg> StudentRegList = StudentRegBLL.GetStudentRegGroupWiseCountByCourseExamBranch(CollegeID, CourseID, ExamID, BranchID, MainGrpID);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, StudentRegList);
                return response;
            }
            catch (Exception ex)
            {
                 throw ex;
            }
        }


        #endregion

        public HttpResponseMessage GetStudentRegByIdForApproved(Int64 StudRegID)
        {
            StudentRegBLL StudentRegBLL = new StudentRegBLL();
            IEnumerable<StudentReg> StudentRegList = StudentRegBLL.GetStudentRegByIdForApproved(StudRegID);
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, StudentRegList);
            return response;
        }
        //Aadhar KYC implementation
        #region
        public HttpResponseMessage PostStudentAadhar(StudentReg StudentReg)
        {
            try
            {
                string error = string.Empty;
                StudentRegBLL StudentRegBLL = new StudentRegBLL();
                if (StudentRegBLL.CheckAadharNoPresent(StudentReg.AadharNo) > 0)
                {
                    createlog("Data From DB");
                    return Request.CreateResponse(HttpStatusCode.OK, "Already Authentication Completed. Please Click Approve Button To Approve.");
                }
                else
                {
                    Authentication objauth = new Authentication();
                    AUAKUAResponse resp = new AUAKUAResponse();
                    AUAKUAParameters parms = new AUAKUAParameters();
                    //for production use SLKTyupe as "P"
                    if (ConfigurationManager.AppSettings["SLKType"].ToString().ToUpper() == "P")
                    {
                        objauth.SystemEnvironment = Syntizen.Aadhaar.AUAKUA.Environment.Production;
                    }
                    else
                    {
                    }
                    createlog("Adhar No. is = " + StudentReg.AadharNo);
                    createlog("PIDDATA = " + StudentReg.xmlPiddata);

                    DataSet ds = new DataSet();
                    String dataString = StudentReg.xmlPiddata.ToString();
                    XmlDocument bodyDoc = new XmlDocument();
                    bodyDoc.LoadXml(dataString);
                    using (StringReader stringReader = new StringReader(bodyDoc.InnerXml))
                    {
                        ds = new DataSet();
                        ds.ReadXml(stringReader);
                    }
                    parms.LAT = "17.494568";
                    parms.LONG = "78.392056";
                    parms.DEVMACID = "11:22:33:44:55";
                    parms.DEVID = "F0178BF2AA61380FBFF0";
                    parms.SRNO = ds.Tables["Param"].Rows[0]["value"].ToString();
                    parms.CONSENT = "Y";
                    parms.SHRC = "Y";
                    parms.LANG = "N";
                    parms.PFR = "N";
                    parms.VER = "2.1";
                    parms.SERTYPE = "04";
                    parms.ENV = "2";
                    parms.AADHAARID = StudentReg.AadharNo;
                    parms.SLK = ConfigurationManager.AppSettings["SLK"].ToString();
                    parms.RRN = DateTime.Now.ToString("yyyyMMddHHmmssfff");
                    parms.DC = ds.Tables["Deviceinfo"].Rows[0]["dc"].ToString();
                    parms.MC = ds.Tables["Deviceinfo"].Rows[0]["mc"].ToString();
                    parms.MI = ds.Tables["Deviceinfo"].Rows[0]["mi"].ToString();
                    parms.DPID = ds.Tables["Deviceinfo"].Rows[0]["dpid"].ToString();
                    parms.RDSID = ds.Tables["Deviceinfo"].Rows[0]["rdsid"].ToString();
                    parms.RDSVER = ds.Tables["Deviceinfo"].Rows[0]["rdsver"].ToString();
                    parms.CI = ds.Tables["Skey"].Rows[0]["ci"].ToString();
                    parms.DATA = ds.Tables["Data"].Rows[0]["Data_Text"].ToString();
                    parms.SKEY = ds.Tables["Skey"].Rows[0]["Skey_Text"].ToString();
                    parms.HMAC = ds.Tables["PidData"].Rows[0]["Hmac"].ToString();
                    parms.UDC = parms.MI + "" + parms.SRNO;
                    resp = objauth.DoKYC(parms);
                    dynamic jsonResp = JObject.Parse(resp.Response);
                    createlog(jsonResp.ToString());
                    string respStatus = jsonResp.ret;
                    error = jsonResp.errdesc.ToString();
                    if (respStatus.ToLower() == "y")
                    {
                        AadhaarList aadhaarList = new AadhaarList();
                        XmlDocument doc = new XmlDocument();
                        //doc.LoadXml(Encoding.UTF8.GetString(Base64.Decode(jsonResp.responseXML.ToString())));
                        doc.LoadXml(Encoding.UTF8.GetString(Base64.Decode(jsonResp.responseXML.ToString())));


                        //AadhaarList class is inside StudentReg Model class
                        aadhaarList.aadhaarno = StudentReg.AadharNo;
                        aadhaarList.status = jsonResp.ret;
                        XmlNodeList kycResList = doc.GetElementsByTagName("KycRes");
                        for (int i = 0; i < kycResList.Count; i++)
                        {
                            aadhaarList.Rcode = kycResList[i].Attributes["code"] != null ? kycResList[i].Attributes["code"].Value : "";
                            aadhaarList.Rtxn = kycResList[i].Attributes["txn"] != null ? kycResList[i].Attributes["txn"].Value : "";
                            aadhaarList.Rts = kycResList[i].Attributes["ts"] != null ? kycResList[i].Attributes["ts"].Value : "";
                        }
                        XmlNodeList UuidList = doc.GetElementsByTagName("UidData");
                        for (int i = 0; i < UuidList.Count; i++)
                        {
                            aadhaarList.Uuid = UuidList[i].Attributes["uuid"] != null ? UuidList[i].Attributes["uuid"].Value : "";
                        }
                        XmlNodeList PoiList = doc.GetElementsByTagName("Poi");
                        for (int i = 0; i < PoiList.Count; i++)
                        {
                            aadhaarList.dob = PoiList[i].Attributes["dob"] != null ? Convert.ToDateTime(PoiList[i].Attributes["dob"].Value).ToString("dd/MMM/yyyy").Replace('-', '/') : "";
                            aadhaarList.gender = PoiList[i].Attributes["gender"] != null ? PoiList[i].Attributes["gender"].Value : "";
                            if (aadhaarList.gender.ToUpper() == "M")
                            {
                                aadhaarList.gender = "Male";
                            }
                            else if (aadhaarList.gender.ToUpper() == "F")
                            {
                                aadhaarList.gender = "Female";
                            }
                            aadhaarList.name = PoiList[i].Attributes["name"] != null ? PoiList[i].Attributes["name"].Value : "";
                        }
                        XmlNodeList PoaList = doc.GetElementsByTagName("Poa");
                        for (int i = 0; i < PoaList.Count; i++)
                        {
                            aadhaarList.co = PoaList[i].Attributes["co"] != null ? PoaList[i].Attributes["co"].Value : "";
                            aadhaarList.street = PoaList[i].Attributes["street"] != null ? PoaList[i].Attributes["street"].Value : "";
                            aadhaarList.country = PoaList[i].Attributes["country"] != null ? PoaList[i].Attributes["country"].Value : "";
                            aadhaarList.subdist = PoaList[i].Attributes["subdist"] != null ? PoaList[i].Attributes["subdist"].Value : "";
                            aadhaarList.dist = PoaList[i].Attributes["dist"] != null ? PoaList[i].Attributes["dist"].Value : "";
                            aadhaarList.lm = PoaList[i].Attributes["lm"] != null ? PoaList[i].Attributes["lm"].Value : "";
                            aadhaarList.loc = PoaList[i].Attributes["loc"] != null ? PoaList[i].Attributes["loc"].Value : "";
                            aadhaarList.pc = PoaList[i].Attributes["pc"] != null ? PoaList[i].Attributes["pc"].Value : "";
                            aadhaarList.house = PoaList[i].Attributes["house"] != null ? PoaList[i].Attributes["house"].Value : "";
                            aadhaarList.state = PoaList[i].Attributes["state"] != null ? PoaList[i].Attributes["state"].Value : "";
                            aadhaarList.vtc = PoaList[i].Attributes["vtc"] != null ? PoaList[i].Attributes["vtc"].Value : "";
                            aadhaarList.address = aadhaarList.house + ", " + aadhaarList.street + ", " + aadhaarList.loc + ", " + aadhaarList.subdist + ", " + aadhaarList.dist + ", " + aadhaarList.state;
                        }
                        if (doc.GetElementsByTagName("Pht") != null)
                        {
                            aadhaarList.pht = doc.GetElementsByTagName("Pht") != null ? doc.GetElementsByTagName("Pht").Item(0).InnerText : "";
                        }
                        if (aadhaarList.pht != "")
                        {
                            //aadhaarList.imgPath = ConfigurationManager.AppSettings["AadhaarPhotoPath"].ToString() + aadhaarList.aadhaarno.TrimEnd(' ') + ".jpg";
                            //File.WriteAllBytes(HttpContext.Current.Server.MapPath(aadhaarList.imgPath), Convert.FromBase64String(aadhaarList.pht));
                            aadhaarList.imgPath = ConfigurationManager.AppSettings["AadhaarPhotoPath"].ToString() + aadhaarList.aadhaarno.TrimEnd(' ') + ".jpg";
                            File.WriteAllBytes(aadhaarList.imgPath, Convert.FromBase64String(aadhaarList.pht));
                            aadhaarList.imgPath = ConfigurationManager.AppSettings["AadhaarPhotoDB"].ToString() + aadhaarList.aadhaarno.TrimEnd(' ') + ".jpg";
                        }
                        StudentReg studentReg = new StudentReg();
                        studentReg.AadharAuthFlag = 2;
                        studentReg.AadharRemark = null;
                        studentReg.StudRegID = StudentReg.StudRegID;
                        StudentRegBLL.PostAadharTemp(aadhaarList, studentReg);
                        createlog(JObject.Parse(resp.Response).ToString());
                        return Request.CreateResponse(HttpStatusCode.OK, aadhaarList);
                    }
                    else if (respStatus.ToLower() == "n")
                    {
                        return Request.CreateResponse(HttpStatusCode.OK, respStatus.ToLower());
                    }
                }
                return Request.CreateResponse(HttpStatusCode.OK, error);
            }
            catch (Exception ex)
            {
                createlog(ex.Message.ToString());
                return Request.CreateResponse(HttpStatusCode.OK, ex.Message.ToString());
            }
        }
        [HttpGet]
        public HttpResponseMessage GetStudentTempAadhar(string AadharNo)
        {
            try
            {
                StudentRegBLL StudentRegBLL = new StudentRegBLL();
                if (StudentRegBLL.CheckAadharNoPresent(AadharNo) > 0)
                {
                    DataTable AadharDt = StudentRegBLL.GetAadharDataByAadharId(AadharNo);
                    AadhaarList aadhaarList = new AadhaarList();
                    aadhaarList.aadhaarno = AadharNo;
                    aadhaarList.status = "y";
                    aadhaarList.dob = Convert.ToDateTime(AadharDt.Rows[0]["BirthDate"].ToString()).ToString("dd/MMM/yyyy").Replace('-', '/');
                    aadhaarList.gender = AadharDt.Rows[0]["Gender"].ToString();
                    if (aadhaarList.gender.ToUpper() == "M")
                    {
                        aadhaarList.gender = "Male";
                    }
                    else if (aadhaarList.gender.ToUpper() == "F")
                    {
                        aadhaarList.gender = "Female";
                    }
                    aadhaarList.name = AadharDt.Rows[0]["StduName"].ToString();
                    aadhaarList.co = AadharDt.Rows[0]["FatherName"].ToString().Replace("S/O ", "").Replace("s/o ", "");
                    aadhaarList.address = AadharDt.Rows[0]["Address"].ToString();
                    aadhaarList.imgPath = ConfigurationManager.AppSettings["WebUrl"].ToString() + AadharDt.Rows[0]["PhotoPath"].ToString();
                    createlog("Data From DB : " + AadharNo);
                    return Request.CreateResponse(HttpStatusCode.OK, aadhaarList);
                }
                else
                {
                    return Request.CreateResponse(HttpStatusCode.OK, "n");
                }
            }
            catch (Exception ex)
            {
                createlog(ex.Message.ToString());
                return Request.CreateResponse(HttpStatusCode.OK, ex.Message.ToString());
            }
        }


        //Aadhar Authentication and KYC
        public HttpResponseMessage PostStudentAadharStatus(StudentReg StudentReg)
        {
            try
            {
                StudentRegBLL StudentRegBLL = new StudentRegBLL();
                if (StudentRegBLL.UpdateStudentAadharStatus(StudentReg) > 0)
                {
                    return Request.CreateResponse(HttpStatusCode.OK, "y");
                }
                return Request.CreateResponse(HttpStatusCode.OK, "n");
            }
            catch (Exception ex)
            {
                createlog(ex.Message.ToString());
                return Request.CreateResponse(HttpStatusCode.OK, ex.Message.ToString());
            }
        }
        #endregion
        public void createlog(string Message)
        {
            using (System.IO.StreamWriter file = new System.IO.StreamWriter(ConfigurationManager.AppSettings["logfilepath"].ToString() + System.DateTime.Now.ToString("ddMMMyyyy") + ".txt", true))
            {
                try
                {
                    file.WriteLine(System.DateTime.Now.ToString() + Message);
                }
                catch (Exception ex)
                {

                }
            }
        }

        public int GetCheckFromTodate(string FromDate, string ToDate)
        {
            StudentRegBLL StudentRegBLL = new StudentRegBLL();
            return StudentRegBLL.GetCheckFromTodate(FromDate, ToDate);
        }
        protected void LoadPayment(string OrderID, string FeeAmount)
        {
            try
            {

                // string HashString = BillDesk.HashString(OrderID, FeeAmount);
                //System.Web.UI.Page page = new System.Web.UI.Page();

                //Controllers.Admission.HttpHelper.RedirectAndPOSTString(page, "https://pgi.billdesk.com/pgidsk/PGIMerchantPayment", HashString);
            }
            catch (Exception _ex)
            {
                throw _ex;
            }
        }
        private string Display()
        {
            string amt = string.Empty;
            string urladm = "";
            try
            {
                string _paymentResp;
                _paymentResp = "msg";
                string[] arrResponse = _paymentResp.Split('|'); //PG
                //from here checksum comparison
                int index = _paymentResp.LastIndexOf("|");
                string key = "VHHZOiDSih6e";
                string checksumkeyr = _paymentResp.Substring(0, index);
                string Checksumvalue = GetHMACSHA256(checksumkeyr, key);
                Checksumvalue = Checksumvalue.ToUpper();
                string _ChecksumvalueReceived = arrResponse[25];
                string hdnMerchantId;
                string merchantId = arrResponse[0];
                hdnMerchantId = merchantId;
                string _customerId = arrResponse[1];
                string txnReferenceNo = arrResponse[2];
                string bankReferenceNo = arrResponse[3];
                amt = arrResponse[4];

                decimal d = default(decimal);
                decimal.TryParse(arrResponse[4], out d);

                string additionalInfo1 = arrResponse[16];
                string txnDate = arrResponse[13]; //dd-mm-yyyy
                string authStatus = arrResponse[14];
                string errorStatus = arrResponse[23];
                string _errorDescription = arrResponse[24];
                string _Checksumvalue = arrResponse[25];
                string anil = " 307C2A23A23E8886CF7A67E21E08C1713A26CBDCCD075EC5666627AA641BA937";
                if (Checksumvalue == _ChecksumvalueReceived)
                {
                    //   lblcheck.Text = "O.K";
                }
                else
                {
                    ////lblcheck.Text = "Checksum not compared";
                    ////btnPayBill.Enabled = false;
                    ////btnPayBill.Visible = false;
                    ////Response.End();
                }
                //txtbankrefno.Text = txnReferenceNo;
                //txtsubscriberid.Text = _customerId;
                // tran.Amount = Convert.ToInt16(d);
                //txtauthstatus.Text = authStatus;
                //txterrorstatus.Text = errorStatus;

                //txterrordesc.Text = _errorDescription;
                //authStatus = "0300";
                if (authStatus == "0300")
                {
                    //Label_TxnResponseCodeDesc.Text = "Payment Successful";
                    string Mobile;
                    //btnPayBill.Enabled = true;
                    //btnPayBill.Visible = true;
                    //lblBatchno.Text = arrResponse[6];
                    //lblCardType.Text = "";
                    //lblReceiptNo.Text = txtbankrefno.Text;
                    //lblAuthorizeId.Text = arrResponse[5];
                    //lblMerchTxnReg.Text = txtsubscriberid.Text;
                    //lblTransactionNo.Text = "";
                    //lblAcqResponseCode.Text = txtauthstatus.Text; 
                    dbHandler dbHandler = new dbHandler();
                    Int64 iRetValue = 0;
                    //int iRetValue = dal.SavePaymentTransaction(arrResponse[6], "CardType", txtbankrefno.Text, arrResponse[5], txtsubscriberid.Text, txtauthstatus.Text, null, "B", out Mobile);
                    string InsertSql = "UPDATE PaymentDetails SET " +
                                        "BatchNo = '" + arrResponse[6] + "', " +
                                        "ReceiptNo = '" + txnReferenceNo + "', " +
                                        "AuthorizeID = '" + arrResponse[5] + "', " +
                                        "AcqResponseCode = '" + authStatus + "', " +
                                        "TransactionNo = '" + bankReferenceNo + "', " +
                                        "TransactionSuccess = '" + arrResponse[24] + "' " +
                                        "WHERE MerchTxnRef = '" + arrResponse[1] + "'";
                    iRetValue = Convert.ToInt64(dbHandler.ExcutiveScalar(InsertSql));
                    if (iRetValue > 0)
                    {
                        string SelectSQL = "SELECT * FROM PaymentDetails WHERE MerchTxnRef = '" + arrResponse[1] + "'";
                        DataTable dt = new DataTable();
                        dt = dbHandler.ReturnData(SelectSQL);
                        if (dt.Rows.Count > 0)
                        {
                            if (dt.Rows[0]["PaymentTransID"].ToString() == "31")
                            {

                                urladm = ConfigurationManager.AppSettings["RedirectUrlAdm"].ToString() + dt.Rows[0]["AcqResponseCode"].ToString() + "/" + dt.Rows[0]["MerchTxnRef"].ToString();
                                //urladm = urladm.Replace(" ", "");
                                //Response.Redirect(urladm.Replace(" ", ""));
                            }
                            //else if (dt.Rows[0]["PaymentTransID"].ToString() == "61")
                            //{
                            //    string urlExam = ConfigurationManager.AppSettings["RedirectUrlExam"].ToString() + dt.Rows[0]["AcqResponseCode"].ToString() + "/" + dt.Rows[0]["MerchTxnRef"].ToString();
                            //    // urlExam = urlExam.Replace(" ", "");
                            //    Response.Redirect(urlExam);
                            //}
                            //else
                            //{
                            //    Response.Redirect(ConfigurationManager.AppSettings["RedirectUrl"].ToString() + dt.Rows[0]["PaymentTransID"].ToString() + "/" + dt.Rows[0]["ServiceFormNo"].ToString());
                            //}
                        }
                    }
                    //commented the following line
                    //if (Mobile != null)
                    //{
                    //    //SmsHelper.SendSMS(txtsubscriberid.Text, txtbankrefno.Text, Mobile);
                    //}
                }
                else
                {
                    //Label_TxnResponseCodeDesc.Text = "Payment Not Successful";
                    //btnPayBill.Enabled = false;
                    //btnPayBill.Visible = false;
                    dbHandler dbHandler = new dbHandler();
                    Int64 iRetValue = 0;
                    //int iRetValue = dal.SavePaymentTransaction(arrResponse[6], "CardType", txtbankrefno.Text, arrResponse[5], txtsubscriberid.Text, txtauthstatus.Text, null, "B", out Mobile);
                    string InsertSql = "UPDATE PaymentDetails SET " +
                                        "BatchNo = '" + arrResponse[6] + "', " +
                                        "ReceiptNo = '" + txnReferenceNo + "', " +
                                        "AuthorizeID = '" + arrResponse[5] + "', " +
                                        "AcqResponseCode = '" + authStatus + "', " +
                                        "TransactionNo = '" + bankReferenceNo + "', " +
                                        "TransactionSuccess = '" + arrResponse[24] + "' " +
                                        "WHERE MerchTxnRef = '" + arrResponse[1] + "'";
                    iRetValue = Convert.ToInt64(dbHandler.ExcutiveScalar(InsertSql));
                    if (iRetValue > 0)
                    {
                        string SelectSQL = "SELECT * FROM PaymentDetails WHERE MerchTxnRef = '" + arrResponse[1] + "'";
                        DataTable dt = new DataTable();
                        dt = dbHandler.ReturnData(SelectSQL);
                        if (dt.Rows.Count > 0)
                        {
                            if (dt.Rows[0]["PaymentTransID"].ToString() == "31")
                            {

                                urladm = ConfigurationManager.AppSettings["RedirectUrlAdm"].ToString() + dt.Rows[0]["AcqResponseCode"].ToString() + "/" + dt.Rows[0]["MerchTxnRef"].ToString();

                                //urladm = urladm.Replace(" ", "");
                                //Response.Redirect(urladm);
                            }
                            //else if (dt.Rows[0]["PaymentTransID"].ToString() == "61")
                            //{
                            //    string urlExam = ConfigurationManager.AppSettings["RedirectUrlExam"].ToString() + dt.Rows[0]["AcqResponseCode"].ToString() + "/" + dt.Rows[0]["MerchTxnRef"].ToString();
                            //    // urlExam = urlExam.Replace(" ", "");
                            //    Response.Redirect(urlExam);
                            //}
                            //else
                            //{
                            //    Response.Redirect(ConfigurationManager.AppSettings["RedirectUrl"].ToString() + dt.Rows[0]["PaymentTransID"].ToString() + "/" + dt.Rows[0]["ServiceFormNo"].ToString());
                            //}
                        }
                    }
                }
                return urladm;
            }
            catch (Exception ex)
            {
                Exception rawData = new Exception("Payement Error");
                return urladm;
            }
        }
        public string GetHMACSHA256(string text, string key)
        {
            UTF8Encoding encoder = new UTF8Encoding();
            byte[] hashValue;
            byte[] keybyt = encoder.GetBytes(key);
            byte[] message = encoder.GetBytes(text);
            HMACSHA256 hashString = new HMACSHA256(keybyt);
            string hex = "";
            hashValue = hashString.ComputeHash(message);
            foreach (byte x in hashValue)
            {
                hex += String.Format("{0:x2}", x);
            }
            return hex;
        }
        // api/StudentReg/GetPaymentResponce?msg=billdeskmsgsting
        public IHttpActionResult GetPaymentForRecognition(string FeeAmount)
        {
            string url = ConfigurationManager.AppSettings["WebApiUrl"].ToString() + "/PaymentService.aspx?FormNo=31&FeeAmount=" + FeeAmount; // "https://localhost:44305/Templates/ReportPage.html";
            System.Uri uri = new System.Uri(url);
            return Redirect(uri);
        }




        [HttpPost, ActionName("AddorUpdateFeeSettings")]
        public string AddorUpdateFeeSettings(int DataType, int ID, string Name, bool Is_Active, int Price, int ServiceType, string ChallanPrefix, string UserName)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[8];
                param[0] = new SqlParameter("@DataType", DataType);
                param[1] = new SqlParameter("@ID", ID);
                param[2] = new SqlParameter("@Name", Name);
                param[3] = new SqlParameter("@Is_Active", Is_Active);
                param[4] = new SqlParameter("@Price", Price);
                param[5] = new SqlParameter("@ServiceType", ServiceType);
                param[6] = new SqlParameter("@ChallanPrefix", ChallanPrefix);
                param[7] = new SqlParameter("@UserName", UserName);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Add_Update_CertificateTypes", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("SP_Add_Update_CertificateTypes", 0, ex.Message);
                return ex.Message;
            }
        }



    }
}
