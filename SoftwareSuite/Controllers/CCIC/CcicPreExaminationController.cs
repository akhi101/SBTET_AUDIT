

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
using static SoftwareSuite.Controllers.Assessment.AssessmentController;
using System.Timers;
using DocumentFormat.OpenXml.Wordprocessing;
using static System.Windows.Forms.VisualStyles.VisualStyleElement.StartPanel;
using SoftwareSuite.Models.Security;
using SoftwareSuite.Models.CCIC;
using System.Data.OleDb;
using ADOX;

namespace SoftwareSuite.Controllers.CCIC
{
    public class CcicPreExaminationController : ApiController
    {

        public class PaymentDetails
        {
            public int AcademicYearId { get; set; }
            public int ExamMonthYearId { get; set; }
            public int CourseId { get; set; }
            public int StudentType { get; set; }
            public DateTime StartDate { get; set; }
            public DateTime EndDate { get; set; }
            public DateTime LateFeeDate { get; set; }
            public DateTime TatkalDate { get; set; }
            public DateTime PremiumTatkalDate { get; set; }
            public double Fee { get; set; }
            public double LateFee { get; set; }
            public double TatkalFee { get; set; }
            public double PremiumTatkalFee { get; set; }
            public double CertificateFee { get; set; }


        }

        [HttpGet, ActionName("GetCcicAcademicYears")]
        public HttpResponseMessage GetCcicAcademicYears()
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                string StrQuery = "";
                StrQuery = "exec SP_Get_AcademicYears";
                return Request.CreateResponse(HttpStatusCode.OK, dbHandler.ReturnDataWithStoredProcedureTable(StrQuery));
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("SP_Get_AcademicYears", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpGet, ActionName("GetCcicCurrentAcademicYear")]
        public HttpResponseMessage GetCcicCurrentAcademicYear()
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                string StrQuery = "";
                StrQuery = "exec SP_Get_CurrentAcademicYear";
                return Request.CreateResponse(HttpStatusCode.OK, dbHandler.ReturnDataSet(StrQuery));
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("SP_Get_CurrentAcademicYear", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpGet, ActionName("GetCcicResultsAcademicYear")]
        public HttpResponseMessage GetCcicResultsAcademicYear()
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                string StrQuery = "";
                StrQuery = "exec SP_Get_ResultAcademicYear";
                return Request.CreateResponse(HttpStatusCode.OK, dbHandler.ReturnDataSet(StrQuery));
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("SP_Get_ResultAcademicYear", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpGet, ActionName("GetCcicFeePaymentAcademicYear")]
        public HttpResponseMessage GetCcicFeePaymentAcademicYear()
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                string StrQuery = "";
                StrQuery = "exec SP_Get_FeePaymentAcademicYear";
                return Request.CreateResponse(HttpStatusCode.OK, dbHandler.ReturnDataSet(StrQuery));
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("SP_Get_FeePaymentAcademicYear", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpGet, ActionName("GetCourseDurations")]
        public HttpResponseMessage GetCourseDurations()
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                string StrQuery = "";
                StrQuery = "exec SP_Get_CourseDurations";
                return Request.CreateResponse(HttpStatusCode.OK, dbHandler.ReturnDataSet(StrQuery));
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("SP_Get_CourseDurations", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpGet, ActionName("GetRegularExamCourseDurations")]
        public HttpResponseMessage GetRegularExamCourseDurations()
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                string StrQuery = "";
                StrQuery = "exec SP_Get_RegularExamCourseDurations";
                return Request.CreateResponse(HttpStatusCode.OK, dbHandler.ReturnDataSet(StrQuery));
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("SP_Get_RegularExamCourseDurations", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpGet, ActionName("GetCcicCourseDurations")]
        public string GetCcicCourseDurations(int BatchID)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@BatchID", BatchID);

                var dt = dbHandler.ReturnDataSet("SP_Get_BatchCourseDurations", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpGet, ActionName("GetBatches")]
        public HttpResponseMessage GetBatches()
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                string StrQuery = "";
                StrQuery = "exec SP_Get_Batches";
                return Request.CreateResponse(HttpStatusCode.OK, dbHandler.ReturnDataSet(StrQuery));
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("SP_Get_Batches", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpGet, ActionName("GetAffiliatedCourses")]
        public HttpResponseMessage GetAffiliatedCourses()
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                string StrQuery = "";
                StrQuery = "exec SP_Get_AffiliatedCourses";
                return Request.CreateResponse(HttpStatusCode.OK, dbHandler.ReturnDataSet(StrQuery));
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("SP_Get_AffiliatedCourses", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpGet, ActionName("GetCcicSubjectTypes")]
        public HttpResponseMessage GetCcicSubjectTypes()
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                string StrQuery = "";
                StrQuery = "exec SP_Get_SubjectTypes";
                return Request.CreateResponse(HttpStatusCode.OK, dbHandler.ReturnDataSet(StrQuery));
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("SP_Get_SubjectTypes", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        


        [HttpGet, ActionName("GetExaminationCenters")]
        public HttpResponseMessage GetExaminationCenters()
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                string StrQuery = "";
                StrQuery = "exec SP_Get_ExaminationCenters";
                return Request.CreateResponse(HttpStatusCode.OK, dbHandler.ReturnDataSet(StrQuery));
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("SP_Get_ExaminationCenters", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }



        [HttpGet, ActionName("GetStudentType")]
        public HttpResponseMessage GetStudentType()
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                string StrQuery = "";
                StrQuery = "exec SP_Get_StudentType";
                return Request.CreateResponse(HttpStatusCode.OK, dbHandler.ReturnDataWithStoredProcedureTable(StrQuery));
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("SP_Get_StudentType", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        //[HttpGet, ActionName("GetFeePaymentType")]
        //public HttpResponseMessage GetFeePaymentType()
        //{
        //    try
        //    {
        //        var dbHandler = new ccicdbHandler();
        //        string StrQuery = "";
        //        StrQuery = "exec SP_Get_FeePaymentTypes";
        //        return Request.CreateResponse(HttpStatusCode.OK, dbHandler.ReturnDataWithStoredProcedureTable(StrQuery));
        //    }
        //    catch (Exception ex)
        //    {
        //        dbHandler.SaveErorr("SP_Get_FeePaymentTypes", 0, ex.Message);
        //        return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
        //    }
        //}

        public class FeePaymentDataInfo
        {
            public int DataType { get; set; }
            public int InstitutionID { get; set; }
            public int AcademicYearID { get; set; }
            public int ExamMonthYearID { get; set; }
            public int FeePaymentTypeID { get; set; }
            public string UserName { get; set; }
        }

        [HttpPost, ActionName("getPayExamFee")]
        public HttpResponseMessage getPayExamFee([FromBody] FeePaymentDataInfo data)
        {
            try
            {

                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[5];
                param[0] = new SqlParameter("@InstitutionID", data.InstitutionID);
                param[1] = new SqlParameter("@AcademicYearID", data.AcademicYearID);
                param[2] = new SqlParameter("@ExamMonthYearID", data.ExamMonthYearID);
                param[3] = new SqlParameter("@FeePaymentTypeID", data.FeePaymentTypeID);
                param[4] = new SqlParameter("@UserName", data.UserName);
                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_Get_PinListForFeePayment", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;

            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("SP_Get_PinListForFeePayment", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpPost, ActionName("GetFeePaymentReport")]
        public HttpResponseMessage GetFeePaymentReport([FromBody] FeePaymentDataInfo data)
        {
            try
            {

                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[6];
                param[0] = new SqlParameter("@DataType", data.DataType);
                param[1] = new SqlParameter("@InstitutionID", data.InstitutionID);
                param[2] = new SqlParameter("@AcademicYearID", data.AcademicYearID);
                param[3] = new SqlParameter("@ExamMonthYearID", data.ExamMonthYearID);
                param[4] = new SqlParameter("@FeePaymentTypeID", data.FeePaymentTypeID);
                param[5] = new SqlParameter("@UserName", data.UserName);
                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_Get_PinListForFeePaymentReport", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;

            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("SP_Get_PinListForFeePaymentReport", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        //[HttpGet, ActionName("GetAffiliatedInstitutions")]
        //public HttpResponseMessage GetAffiliatedInstitutions()
        //{
        //    try
        //    {
        //        var dbHandler = new ccicdbHandler();
        //        string StrQuery = "";
        //        StrQuery = "exec SP_Get_AffiliatedInsttitutions";
        //        return Request.CreateResponse(HttpStatusCode.OK, dbHandler.ReturnDataWithStoredProcedureTable(StrQuery));
        //    }
        //    catch (Exception ex)
        //    {
        //        dbHandler.SaveErorr("SP_Get_AffiliatedInsttitutions", 0, ex.Message);
        //        return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
        //    }
        //}

        [HttpGet, ActionName("GetAffiliatedInstitutions")]
        public string GetAffiliatedInstitutions(int AcademicYearID,int ExamMonthYearID,int CourseID)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@AcademicYearID", AcademicYearID);
                param[1] = new SqlParameter("@ExamMonthYearID", ExamMonthYearID);
                param[2] = new SqlParameter("@CourseID", CourseID);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Get_AffiliatedInsttitutions", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }


        [HttpGet, ActionName("GetFeePaymentType")]
        public string GetFeePaymentType(int InstitutionID)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@InstitutionID", InstitutionID);

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Get_FeePaymentTypes", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpGet, ActionName("GetorEditCcicSubjectMaster")]
        public string GetorEditCcicSubjectMaster(int DataType,int CourseID,int SubjectID)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@DataType", DataType);
                param[1] = new SqlParameter("@CourseID", CourseID);
                param[2] = new SqlParameter("@SubjectID", SubjectID);

                var dt = dbHandler.ReturnDataSet("SP_Get_Edit_SubjectMaster", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpGet, ActionName("GetorEditExaminationCentres")]
        public string GetorEditExaminationCentres(int DataType, int ExaminationCentreID)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@DataType", DataType);
                param[1] = new SqlParameter("@ExaminationCentreID", ExaminationCentreID);
                var dt = dbHandler.ReturnDataSet("SP_Get_Edit_ExaminationCentres", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }


        [HttpGet, ActionName("GetorEditCcicExaminationCentres")]
        public string GetorEditCcicExaminationCentres(int DataType, int ExaminationCentreID)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@DataType", DataType);
                param[1] = new SqlParameter("@ExaminationCentreID", ExaminationCentreID);
                var dt = dbHandler.ReturnDataSet("SP_Get_Edit_ExaminationCentres", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        public class ExamCentresInfo
        {
            public int DataType { get; set; }
            public string PrincipalName { get; set; }
            public string PrincipalMobile { get; set; }
            public string PrincipalEmail { get; set; }
            public int ExaminationCentreID { get; set; }
            public bool Active { get; set; }
            public string DistrictID { get; set; }
            public string UserName { get; set; }
            public string ExaminationCentreCode { get; set; }
            public string ExaminationCentreName { get; set; }
            public string Landmark { get; set; }
            public string HouseNumber { get; set; }
            public string StreetName { get; set; }
            public string Locality { get; set; }
            public string UserPassword { get; set; }

            public string Village { get; set; }
            public string Pincode { get; set; }

        }

        [HttpPost, ActionName("AddorUpdateorInActiveExaminationCentres")]
        public string AddorUpdateorInActiveExaminationCentres([FromBody] ExamCentresInfo data)
        {
            var dbHandler = new ccicdbHandler();
            try
            {
                var param = new SqlParameter[16];
                param[0] = new SqlParameter("@DataType", data.DataType);
                param[1] = new SqlParameter("@ExaminationCentreID", data.ExaminationCentreID);
                param[2] = new SqlParameter("@ExaminationCentreCode", data.ExaminationCentreCode);
                param[3] = new SqlParameter("@ExaminationCentreName", data.ExaminationCentreName);
                param[4] = new SqlParameter("@HouseNumber", data.HouseNumber);
                param[5] = new SqlParameter("@StreetName", data.StreetName);
                param[6] = new SqlParameter("@Locality", data.Locality);
                param[7] = new SqlParameter("@Landmark", data.Landmark);
                param[8] = new SqlParameter("@Village", data.Village);
                param[9] = new SqlParameter("@DistrictID", data.DistrictID);
                param[10] = new SqlParameter("@Pincode", data.Pincode);
                param[11] = new SqlParameter("@PrincipalName", data.PrincipalName);
                param[12] = new SqlParameter("@PrincipalMobile", data.PrincipalMobile);
                param[13] = new SqlParameter("@PrincipalEmail", data.PrincipalEmail);
                param[14] = new SqlParameter("@Active", data.Active);
                param[15] = new SqlParameter("@UserName", data.UserName);



                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Add_Update_InActive_ExaminationCentres", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                ccicdbHandler.SaveErorr("SP_Add_Update_InActive_ExaminationCentres", 0, ex.Message);
                return ex.Message;
            }
        }


        [HttpGet, ActionName("GetCurrentBatch")]
        public string GetCurrentBatch(int AcademicYearID)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@AcademicYearID", AcademicYearID);

                var dt = dbHandler.ReturnDataSet("SP_Get_CurrentBatch", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpGet, ActionName("GetCcicCourseDurationBatches")]
        public string GetCcicCourseDurationBatches(int CourseDurationID)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@CourseDurationID", CourseDurationID);

                var dt = dbHandler.ReturnDataSet("SP_Get_CourseDurationBatches", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }


        [HttpGet, ActionName("GetCcicAcademicYearCurrentBatch")]
        public string GetCcicAcademicYearCurrentBatch(int AcademicYearID)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@AcademicYearID", AcademicYearID);

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Get_AcademicYearCurrentBatch", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }



        [HttpGet, ActionName("GetInsEnrollmentReportCoursesCount")]
        public string GetInsEnrollmentReportCoursesCount(int InstitutionID)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@InstitutionID", InstitutionID);

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Get_Ins_EnrollmentReportCoursesCount", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpGet, ActionName("GetInsRegisterReportCoursesCount")]
        public string GetInsRegisterReportCoursesCount(int InstitutionID, int AcademicYearID, int Batch)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@InstitutionID", InstitutionID);
                param[1] = new SqlParameter("@AcademicYearID", AcademicYearID);
                param[2] = new SqlParameter("@Batch", Batch);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Get_Ins_RegisterReportCoursesCount", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpGet, ActionName("GetInsVerificationReportCoursesCount")]
        public string GetInsVerificationReportCoursesCount(int AcademicYearID,int Batch,int InstitutionID)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@AcademicYearID", AcademicYearID);
                param[1] = new SqlParameter("@Batch", Batch);
                param[2] = new SqlParameter("@InstitutionID", InstitutionID);

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Get_VerificationReportCoursesCount", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
        [HttpGet, ActionName("GetAdminEnrollmentReportInsCount")]
        public HttpResponseMessage GetAdminEnrollmentReportInsCount()
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                string StrQuery = "";
                StrQuery = "exec SP_Get_Admin_EnrollmentReportInsCount";
                return Request.CreateResponse(HttpStatusCode.OK, dbHandler.ReturnDataWithStoredProcedureTable(StrQuery));
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("SP_Get_Admin_EnrollmentReportInsCount", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpGet, ActionName("GetAdminRegisterReportCount")]
        public string GetAdminRegisterReportCount(int AcademicYearID, int Batch)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@AcademicYearID", AcademicYearID);
                param[1] = new SqlParameter("@Batch", Batch);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Get_Admin_RegisterReportInsCount", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpGet, ActionName("GetRegisterCoursesCount")]
        public string GetRegisterCoursesCount(int InstitutionID, int AcademicYearID, int Batch)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@AcademicYearID", AcademicYearID);
                param[1] = new SqlParameter("@Batch", Batch);
                param[2] = new SqlParameter("@InstitutionID", InstitutionID);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Get_Ins_RegisterReportCoursesCount", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpGet, ActionName("GetAdminRegisterCoursesCount")]
        public string GetAdminRegisterCoursesCount(int InstitutionID, int AcademicYearID, int Batch)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@InstitutionID", InstitutionID);
                param[1] = new SqlParameter("@AcademicYearID", AcademicYearID);
                param[2] = new SqlParameter("@Batch", Batch);

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Get_Ins_RegisterReportCoursesCount", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpGet, ActionName("GetAdminRegisterReportData")]
        public string GetAdminRegisterReportData(int InstitutionID, int CourseID, int ReportTypeID, int AcademicYearID, int Batch)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[5];
                param[0] = new SqlParameter("@InstitutionID", InstitutionID);
                param[1] = new SqlParameter("@CourseID", CourseID);
                param[2] = new SqlParameter("@ReportTypeID", ReportTypeID);
                param[3] = new SqlParameter("@AcademicYearID", AcademicYearID);
                param[4] = new SqlParameter("@Batch", Batch);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Get_Ins_RegisterReportData", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }


        [HttpGet, ActionName("GetAdminVerificationReportInsCount")]
        public string GetAdminVerificationReportInsCount(int AcademicYearID, int Batch)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@AcademicYearID", AcademicYearID);
                param[1] = new SqlParameter("@Batch", Batch);
                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_Get_VerificationReportInsCount", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }


        [HttpGet, ActionName("GetExamMonthYears")]
        public string GetExamMonthYears(int AcademicYearID)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@AcademicYearID", AcademicYearID);

                var dt = dbHandler.ReturnDataSet("SP_Get_ExamMonthYears", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpGet, ActionName("GetResultsExamMonthYears")]
        public string GetResultsExamMonthYears(int AcademicYearID)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@AcademicYearID", AcademicYearID);

                var dt = dbHandler.ReturnDataSet("SP_Get_ResultExamMonthYears", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpGet, ActionName("GetAYBatchExamMonthYear")]
        public string GetAYBatchExamMonthYear(int AcademicYearID, int Batch)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@AcademicYearID", AcademicYearID);
                param[1] = new SqlParameter("@Batch", Batch);


                var dt = dbHandler.ReturnDataSet("SP_Get_AYBatchExamMonthYear", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpGet, ActionName("GetHolidaysForTimeTable")]
        public HttpResponseMessage GetHolidaysForTimeTable(string StartDate, int NofDates)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@StartDate", StartDate);
                param[1] = new SqlParameter("@NofDates", NofDates);
                var dt = dbHandler.ReturnDataSet("SP_Get_HolidayDatesForTimeTable", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr(" SP_Get_HolidayDatesForTimeTable", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.NotFound, ex.Message);
            }
        }



        public class ExamMonthYearInfo
        {
            public int AcademicYearID { get; set; }
            public int RegularExamCourseDurationID { get; set; }
            public string ExamMonthYearName { get; set; }
            public string UserName { get; set; }
        }

        [HttpPost, ActionName("AddExamMonthYear")]
        public string AddExamMonthYear([FromBody] ExamMonthYearInfo data)
        {
            var dbHandler = new ccicdbHandler();
            try
            {
                var param = new SqlParameter[4];
                param[0] = new SqlParameter("@AcademicYearID", data.AcademicYearID);
                param[1] = new SqlParameter("@RegularExamCourseDurationID", data.RegularExamCourseDurationID);
                param[2] = new SqlParameter("@ExamMonthYearName", data.ExamMonthYearName);
                param[3] = new SqlParameter("@UserName", data.UserName);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Add_ExamMonthYear", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                ccicdbHandler.SaveErorr("SP_Add_ExamMonthYear", 0, ex.Message);
                return ex.Message;
            }
        }

        public class SubjectMasterData
        {
            public int DataType { get; set; }
            public int SubjectID { get; set; }
            public int CourseID { get; set; }
            public int SubjectTypeID { get; set; }
            public string SubjectCode { get; set; }
            public string SubjectName { get; set; }
            public int ExternalMaxMarks { get; set; }
            public int InternalMaxMarks { get; set; }
            public int ExternalPassMarks { get; set; }
            public int TotalPassMarks { get; set; }
            public string Pcode { get; set; }
            public bool Active { get; set; }
            public string UserName { get; set; }
        }

        [HttpPost, ActionName("AddorUpdateorDeleteCcicSubjectMaster")]
        public string AddorUpdateorDeleteCcicSubjectMaster([FromBody] SubjectMasterData data)
        {
            var dbHandler = new ccicdbHandler();
            try
            {
                var param = new SqlParameter[13];
                param[0] = new SqlParameter("@DataType", data.DataType);
                param[1] = new SqlParameter("@SubjectID", data.SubjectID);
                param[2] = new SqlParameter("@CourseID", data.CourseID);
                param[3] = new SqlParameter("@SubjectTypeID", data.SubjectTypeID);
                param[4] = new SqlParameter("@SubjectCode", data.SubjectCode);
                param[5] = new SqlParameter("@SubjectName", data.SubjectName);
                param[6] = new SqlParameter("@ExternalMaxMarks", data.ExternalMaxMarks);
                param[7] = new SqlParameter("@InternalMaxMarks", data.InternalMaxMarks);
                param[8] = new SqlParameter("@ExternalPassMarks", data.ExternalPassMarks);
                param[9] = new SqlParameter("@TotalPassMarks", data.TotalPassMarks);
                param[10] = new SqlParameter("@Pcode", data.Pcode);
                param[11] = new SqlParameter("@Active", data.Active);
                param[12] = new SqlParameter("@UserName", data.UserName);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Add_Update_Delete_SubjectMaster", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                ccicdbHandler.SaveErorr("SP_Add_Update_Delete_SubjectMaster", 0, ex.Message);
                return ex.Message;
            }
        }


        [HttpGet, ActionName("GetCcicAcademicYearBatches")]
        public string GetCcicAcademicYearBatches(int AcademicYearID)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@AcademicYearID", AcademicYearID);

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Get_AcademicYearBatches", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpGet, ActionName("GetEnrollementDates")]
        public string GetEnrollementDates(int AcademicYearID)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@AcademicYearID", AcademicYearID);

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Get_EnrollementDates", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpGet, ActionName("VerifyEnrollmentDate")]
        public string VerifyEnrollmentDate(int CourseID)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@CourseID", CourseID);

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Verify_EnrollmentDate", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }


        [HttpGet, ActionName("VerifyFeePaymentDate")]
        public string VerifyFeePaymentDate(int AcademicYearID,int ExamMonthYearID)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@AcademicYearID", AcademicYearID);
                param[1] = new SqlParameter("@ExamMonthYearID", ExamMonthYearID);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Verify_FeePaymentDates", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpGet, ActionName("GetCcicCoursesByInstitution")]
        public string GetCcicCoursesByInstitution(int InstitutionID)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@InstitutionID", InstitutionID);

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Get_AffiliatedCoursesByInstitution", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpGet, ActionName("GetCcicCourseQualifications")]
        public string GetCcicCourseQualifications(int CourseID)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@CourseID", CourseID);

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Get_CourseQualifications", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpGet, ActionName("GetCcicCourseExperience")]
        public string GetCcicCourseExperience(int CourseQualificationsID)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@CourseQualificationsID", CourseQualificationsID);

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Get_CourseExperience", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }


        [HttpGet, ActionName("AddAcademicYear")]
        public string AddAcademicYear(int AcademicStartYear, string AcademicYear, DateTime AcademicYearStartDate, DateTime AcademicYearEndDate, bool CurrentAcademicYear, string UserName)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[6];
                param[0] = new SqlParameter("@AcademicStartYear", AcademicStartYear);
                param[1] = new SqlParameter("@AcademicYear", AcademicYear);
                param[2] = new SqlParameter("@AcademicYearStartDate", AcademicYearStartDate);
                param[3] = new SqlParameter("@AcademicYearEndDate", AcademicYearEndDate);
                param[4] = new SqlParameter("@CurrentAcademicYear", CurrentAcademicYear);
                param[5] = new SqlParameter("@UserName", UserName);


                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Add_AcademicYear", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("SP_Add_AcademicYear", 0, ex.Message);
                return ex.Message;
            }

        }


        //[HttpPost, ActionName("AddStudentDetails")]
        //public string AddStudentDetails([FromBody] JsonObject data)
        //{
        //    try
        //    {
        //        var dbHandler = new ccicdbHandler();
        //        var param = new SqlParameter[32];
        //        param[0] = new SqlParameter("@ApplicationNumber", data["ApplicationNumber"]);
        //        param[1] = new SqlParameter("@InstitutionID", data["InstitutionID"]);
        //        param[2] = new SqlParameter("@CourseID", data["CourseID"]);
        //        param[3] = new SqlParameter("@CourseQualificationID", data["CourseQualificationID"]);
        //        param[4] = new SqlParameter("@CourseExperienceID", data["CourseExperienceID"]);
        //        param[5] = new SqlParameter("@SSC", data["SSC"]);
        //        param[6] = new SqlParameter("@SSCHallticketNumber", data["SSCHallticketNumber"]);
        //        param[7] = new SqlParameter("@SSCPassedYear", data["SSCPassedYear"]);
        //        param[8] = new SqlParameter("@SSCPassedType", data["SSCPassedType"]);
        //        param[9] = new SqlParameter("@StudentName", data["StudentName"]);
        //        param[10] = new SqlParameter("@FatherName", data["FatherName"]);
        //        param[11] = new SqlParameter("@MotherName", data["MotherName"]);
        //        param[12] = new SqlParameter("@DateofBirth", data["DateofBirth"]);
        //        param[13] = new SqlParameter("@SSCDateofBirth", data["SSCDateofBirth"]);
        //        param[14] = new SqlParameter("@Gender", data["Gender"]);
        //        param[15] = new SqlParameter("@AadharNumber", data["AadharNumber"]);
        //        param[16] = new SqlParameter("@HouseNumber", data["HouseNumber"]);
        //        param[17] = new SqlParameter("@Street", data["Street"]);
        //        param[18] = new SqlParameter("@Landmark", data["Landmark"]);
        //        param[19] = new SqlParameter("@Village", data["Village"]);
        //        param[20] = new SqlParameter("@Pincode", data["Pincode"]);
        //        param[21] = new SqlParameter("@District", data["District"]);
        //        param[22] = new SqlParameter("@AddressState", data["AddressState"]);
        //        param[23] = new SqlParameter("@StudentMobile", data["StudentMobile"]);
        //        param[24] = new SqlParameter("@StudentEmail", data["StudentEmail"]);
        //        param[25] = new SqlParameter("@SSCValidated", data["SSCValidated"]);
        //        param[26] = new SqlParameter("@UserName", data["UserName"]);
        //        param[27] = new SqlParameter("@StudentPhoto", data["StudentPhoto"]);
        //        param[28] = new SqlParameter("@StudentSign", data["StudentSign"]);
        //        param[29] = new SqlParameter("@SSCCertificate", data["SSCCertificate"]);
        //        param[30] = new SqlParameter("@QualificationCertificate", data["QualificationCertificate"]);
        //        param[31] = new SqlParameter("@ExperienceCertificate", data["ExperienceCertificate"]);


        //        var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Add_StudentDetails", param);
        //        return JsonConvert.SerializeObject(dt);
        //    }
        //    catch (Exception ex)
        //    {

        //        dbHandler.SaveErorr("SP_Add_StudentDetails", 0, ex.Message);
        //        return ex.Message;
        //    }

        //}
        public class filelist
        {
            public int fileindex { get; set; }
            public string file { get; set; }
        }


        public class CertificateReqAtt
        {
            public string ApplicationNumber { get; set; }

            public int InstitutionID { get; set; }
            public int CourseID { get; set; }
            public int CourseQualificationID { get; set; }
            public int CourseExperienceID { get; set; }
            public int SSC { get; set; }
            public string SSCHallticketNumber { get; set; }
            public int SSCPassedYear { get; set; }
            public string SSCPassedType { get; set; }
            public string StudentName { get; set; }
            public string FatherName { get; set; }
            public string MotherName { get; set; }
            public DateTime DateofBirth { get; set; }
            public string SSCDateofBirth { get; set; }
            public string Gender { get; set; }
            public string AadharNumber { get; set; }
            public string HouseNumber { get; set; }
            public string Street { get; set; }
            public string Landmark { get; set; }
            public string Village { get; set; }
            public int Pincode { get; set; }
            public string District { get; set; }
            public string AddressState { get; set; }
            public string StudentMobile { get; set; }
            public string StudentEmail { get; set; }
            public bool SSCValidated { get; set; }
            public bool IsBlind { get; set; }

            public string UserName { get; set; }
            public string StudentPhoto { get; set; }
            public string StudentSign { get; set; }
            public string SSCCertificate { get; set; }
            public string QualificationCertificate { get; set; }
            public string ExperienceCertificate { get; set; }
            public string BlindCertificate { get; set; }
            public List<filelist> filedata { get; set; }


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


        public class UpdateCertificateReqAtt
        {
            public string ApplicationNumber { get; set; }

            public int InstitutionID { get; set; }
            public int CourseID { get; set; }
            public int CourseQualificationID { get; set; }
            public int CourseExperienceID { get; set; }
            public int SSC { get; set; }
            public string SSCHallticketNumber { get; set; }
            public int SSCPassedYear { get; set; }
            public string SSCPassedType { get; set; }
            public string StudentName { get; set; }
            public string FatherName { get; set; }
            public string MotherName { get; set; }
            public DateTime DateofBirth { get; set; }
            public string SSCDateofBirth { get; set; }
            public string Gender { get; set; }
            public string AadharNumber { get; set; }
            public string HouseNumber { get; set; }
            public string Street { get; set; }
            public string Landmark { get; set; }
            public string Village { get; set; }
            public int Pincode { get; set; }
            public string District { get; set; }
            public string AddressState { get; set; }
            public string StudentMobile { get; set; }
            public string StudentEmail { get; set; }
            public bool SSCValidated { get; set; }
            public bool IsBlind { get; set; }

            public string UserName { get; set; }
            public string StudentPhoto { get; set; }
            public string StudentSign { get; set; }
            public string SSCCertificate { get; set; }
            public string QualificationCertificate { get; set; }
            public string ExperienceCertificate { get; set; }
            public string BlindCertificate { get; set; }
            public List<filelist> filedata { get; set; }


        }

        [HttpPost, ActionName("AddStudentDetails")]
        public string AddStudentDetails([FromBody] CertificateReqAtt CertificateReqAtt)
        {
            try
            {
                var dir = AppDomain.CurrentDomain.BaseDirectory + @"\CcicPhotos\";
                var photo_url = dir + "Photo" + CertificateReqAtt.ApplicationNumber + ".JPG";
                var StdPhoto = "Photo_" + CertificateReqAtt.ApplicationNumber + ".JPG";

                var sign_url = dir + "Sign" + CertificateReqAtt.ApplicationNumber + ".JPG";
                var StdSign = "Sign_" + CertificateReqAtt.ApplicationNumber + ".JPG";

                var ssccert_url = dir + "SSCCertificate" + CertificateReqAtt.ApplicationNumber + ".JPG";
                var StdSscCert = "SSCCertificate_" + CertificateReqAtt.ApplicationNumber + ".JPG";

                var qualcert_url = dir + "QualificationCertificate" + CertificateReqAtt.ApplicationNumber + ".JPG";
                var StdQualCert = "QualificationCertificate_" + CertificateReqAtt.ApplicationNumber + ".JPG";

                var expcert_url = dir + "ExperienceCertificate" + CertificateReqAtt.ApplicationNumber + ".JPG";
                var StdExpCert = "ExperienceCertificate_" + CertificateReqAtt.ApplicationNumber + ".JPG";

                var medcert_url = dir + "MedicalCertificate" + CertificateReqAtt.ApplicationNumber + ".JPG";
                var StdMedCert = "MedicalCertificate_" + CertificateReqAtt.ApplicationNumber + ".JPG";
                var path = string.Empty;
                string relativePath = string.Empty;
                var StudentPhotopath = string.Empty;
                var StudentSignpath = string.Empty;
                var StudentSscCertpath = string.Empty;
                var StudentQualCertpath = string.Empty;
                var StudentExpCertpath = string.Empty;
                var StudentMedCertpath = string.Empty;


                if (CertificateReqAtt.StudentPhoto != "")
                {
                    StdPhoto = "Photo_" + CertificateReqAtt.ApplicationNumber + ".JPG";
                    path = dir;
                    bool foldrExists = Directory.Exists(dir);
                    if (!foldrExists)
                        Directory.CreateDirectory(dir);
                    string imgPath = Path.Combine(path, StdPhoto);
                    byte[] Bytes = Convert.FromBase64String(CertificateReqAtt.StudentPhoto);
                    File.WriteAllBytes(imgPath, Bytes);
                    relativePath = imgPath.Replace(HttpContext.Current.Request.PhysicalApplicationPath, GetWebAppRoot()).Replace(@"\", "/");
                    photo_url = relativePath;
                }
                else
                {
                    photo_url = "";
                }

                if (CertificateReqAtt.StudentSign != "")
                {
                    StdSign = "Sign_" + CertificateReqAtt.ApplicationNumber + ".JPG";
                    path = dir;
                    bool foldrExists = Directory.Exists(dir);
                    if (!foldrExists)
                        Directory.CreateDirectory(dir);
                    string imgPath = Path.Combine(path, StdSign);
                    byte[] Bytes = Convert.FromBase64String(CertificateReqAtt.StudentSign);
                    File.WriteAllBytes(imgPath, Bytes);
                    relativePath = imgPath.Replace(HttpContext.Current.Request.PhysicalApplicationPath, GetWebAppRoot()).Replace(@"\", "/");
                    sign_url = relativePath;
                }
                else
                {
                    sign_url = "";
                }

                if (CertificateReqAtt.SSCCertificate != "")
                {
                    StdSscCert = "SSCCertificate_" + CertificateReqAtt.ApplicationNumber + ".JPG";
                    path = dir;
                    bool foldrExists = Directory.Exists(dir);
                    if (!foldrExists)
                        Directory.CreateDirectory(dir);
                    string imgPath = Path.Combine(path, StdSscCert);
                    byte[] Bytes = Convert.FromBase64String(CertificateReqAtt.SSCCertificate);
                    File.WriteAllBytes(imgPath, Bytes);
                    relativePath = imgPath.Replace(HttpContext.Current.Request.PhysicalApplicationPath, GetWebAppRoot()).Replace(@"\", "/");
                    ssccert_url = relativePath;
                }
                else
                {
                    ssccert_url = "";
                }


                if (CertificateReqAtt.QualificationCertificate != "")
                {
                    StdQualCert = "QualificationCertificate_" + CertificateReqAtt.ApplicationNumber + ".JPG";
                    path = dir;
                    bool foldrExists = Directory.Exists(dir);
                    if (!foldrExists)
                        Directory.CreateDirectory(dir);
                    string imgPath = Path.Combine(path, StdQualCert);
                    byte[] Bytes = Convert.FromBase64String(CertificateReqAtt.QualificationCertificate);
                    File.WriteAllBytes(imgPath, Bytes);
                    relativePath = imgPath.Replace(HttpContext.Current.Request.PhysicalApplicationPath, GetWebAppRoot()).Replace(@"\", "/");
                    qualcert_url = relativePath;
                }
                else
                {
                    qualcert_url = "";
                }


                if (CertificateReqAtt.ExperienceCertificate != "")
                {
                    StdExpCert = "ExperienceCertificate_" + CertificateReqAtt.ApplicationNumber + ".JPG";
                    path = dir;
                    bool foldrExists = Directory.Exists(dir);
                    if (!foldrExists)
                        Directory.CreateDirectory(dir);
                    string imgPath = Path.Combine(path, StdExpCert);
                    byte[] Bytes = Convert.FromBase64String(CertificateReqAtt.ExperienceCertificate);
                    File.WriteAllBytes(imgPath, Bytes);
                    relativePath = imgPath.Replace(HttpContext.Current.Request.PhysicalApplicationPath, GetWebAppRoot()).Replace(@"\", "/");
                    expcert_url = relativePath;
                }
                else
                {
                    expcert_url = "";
                }

                if (CertificateReqAtt.BlindCertificate != "")
                {
                    StdMedCert = "MedicalCertificate_" + CertificateReqAtt.ApplicationNumber + ".JPG";
                    path = dir;
                    bool foldrExists = Directory.Exists(dir);
                    if (!foldrExists)
                        Directory.CreateDirectory(dir);
                    string imgPath = Path.Combine(path, StdMedCert);
                    byte[] Bytes = Convert.FromBase64String(CertificateReqAtt.BlindCertificate);
                    File.WriteAllBytes(imgPath, Bytes);
                    relativePath = imgPath.Replace(HttpContext.Current.Request.PhysicalApplicationPath, GetWebAppRoot()).Replace(@"\", "/");
                    medcert_url = relativePath;
                }
                else
                {
                    medcert_url = "";
                }

                var dbHandler = new ccicdbHandler();
                //string encriptedaadhar = "";

                //var res = CertificateReqAtt.AadharNumber.Split(new string[] { "$$@@$$" }, StringSplitOptions.None);
                //var crypt = new HbCrypt(res[1]);
                //var aadharencrypt = new HbCrypt();
                //string aadhar = crypt.AesDecrypt(res[0]);
                //string decryptaadhar = aadharencrypt.AesDecrypt(aadhar);
                //encriptedaadhar = aadharencrypt.Encrypt(decryptaadhar);
                var param = new SqlParameter[34];
                param[0] = new SqlParameter("@ApplicationNumber", CertificateReqAtt.ApplicationNumber);
                param[1] = new SqlParameter("@InstitutionID", CertificateReqAtt.InstitutionID);
                param[2] = new SqlParameter("@CourseID", CertificateReqAtt.CourseID);
                param[3] = new SqlParameter("@CourseQualificationID", CertificateReqAtt.CourseQualificationID);
                param[4] = new SqlParameter("@CourseExperienceID", CertificateReqAtt.CourseExperienceID);
                param[5] = new SqlParameter("@SSC", CertificateReqAtt.SSC);
                param[6] = new SqlParameter("@SSCHallticketNumber", CertificateReqAtt.SSCHallticketNumber);
                param[7] = new SqlParameter("@SSCPassedYear", CertificateReqAtt.SSCPassedYear);
                param[8] = new SqlParameter("@SSCPassedType", CertificateReqAtt.SSCPassedType);
                param[9] = new SqlParameter("@StudentName", CertificateReqAtt.StudentName);
                param[10] = new SqlParameter("@FatherName", CertificateReqAtt.FatherName);
                param[11] = new SqlParameter("@MotherName", CertificateReqAtt.MotherName);
                param[12] = new SqlParameter("@DateofBirth", CertificateReqAtt.DateofBirth);
                param[13] = new SqlParameter("@SSCDateofBirth", CertificateReqAtt.SSCDateofBirth);
                param[14] = new SqlParameter("@Gender", CertificateReqAtt.Gender);
                param[15] = new SqlParameter("@AadharNumber", CertificateReqAtt.AadharNumber);
                param[16] = new SqlParameter("@HouseNumber", CertificateReqAtt.HouseNumber);
                param[17] = new SqlParameter("@Street", CertificateReqAtt.Street);
                param[18] = new SqlParameter("@Landmark", CertificateReqAtt.Landmark);
                param[19] = new SqlParameter("@Village", CertificateReqAtt.Village);
                param[20] = new SqlParameter("@Pincode", CertificateReqAtt.Pincode);
                param[21] = new SqlParameter("@District", CertificateReqAtt.District);
                param[22] = new SqlParameter("@AddressState", CertificateReqAtt.AddressState);
                param[23] = new SqlParameter("@StudentMobile", CertificateReqAtt.StudentMobile);
                param[24] = new SqlParameter("@StudentEmail", CertificateReqAtt.StudentEmail);
                param[25] = new SqlParameter("@SSCValidated", CertificateReqAtt.SSCValidated);
                param[26] = new SqlParameter("@UserName", CertificateReqAtt.UserName);
                param[27] = new SqlParameter("@StudentPhoto", photo_url);
                param[28] = new SqlParameter("@StudentSign", sign_url);
                param[29] = new SqlParameter("@SSCCertificate", ssccert_url);
                param[30] = new SqlParameter("@QualificationCertificate", qualcert_url);
                param[31] = new SqlParameter("@ExperienceCertificate", expcert_url);
                param[32] = new SqlParameter("@BlindCertificate", medcert_url);
                param[33] = new SqlParameter("@IsBlind", CertificateReqAtt.IsBlind);


                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Add_StudentDetails", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("SP_Add_StudentDetails", 0, ex.Message);
                return ex.Message;
            }

        }


        [HttpPost, ActionName("UpdateStudentDetails")]
        public string UpdateStudentDetails([FromBody] UpdateCertificateReqAtt UpdateCertificateReqAtt)
        {
            try
            {

                //var dir = ConfigurationManager.AppSettings["Student_Photos"];

                var dir = AppDomain.CurrentDomain.BaseDirectory + @"\CcicPhotos\";
                var photo_url = dir + "Photo" + UpdateCertificateReqAtt.ApplicationNumber + ".JPG";
                var StdPhoto = "Photo_" + UpdateCertificateReqAtt.ApplicationNumber + ".JPG";

                var sign_url = dir + "Sign" + UpdateCertificateReqAtt.ApplicationNumber + ".JPG";
                var StdSign = "Sign_" + UpdateCertificateReqAtt.ApplicationNumber + ".JPG";

                var ssccert_url = dir + "SSCCertificate" + UpdateCertificateReqAtt.ApplicationNumber + ".JPG";
                var StdSscCert = "SSCCertificate_" + UpdateCertificateReqAtt.ApplicationNumber + ".JPG";

                var qualcert_url = dir + "QualificationCertificate" + UpdateCertificateReqAtt.ApplicationNumber + ".JPG";
                var StdQualCert = "QualificationCertificate_" + UpdateCertificateReqAtt.ApplicationNumber + ".JPG";

                var expcert_url = dir + "ExperienceCertificate" + UpdateCertificateReqAtt.ApplicationNumber + ".JPG";
                var StdExpCert = "ExperienceCertificate_" + UpdateCertificateReqAtt.ApplicationNumber + ".JPG";

                var medcert_url = dir + "MedicalCertificate" + UpdateCertificateReqAtt.ApplicationNumber + ".JPG";
                var StdMedCert = "MedicalCertificate_" + UpdateCertificateReqAtt.ApplicationNumber + ".JPG";
                var path = string.Empty;
                string relativePath = string.Empty;
                var StudentPhotopath = string.Empty;
                var StudentSignpath = string.Empty;
                var StudentSscCertpath = string.Empty;
                var StudentQualCertpath = string.Empty;
                var StudentExpCertpath = string.Empty;
                var StudentMedCertpath = string.Empty;


                if (UpdateCertificateReqAtt.StudentPhoto != "" && UpdateCertificateReqAtt.StudentPhoto != null)
                {
                    StdPhoto = "Photo_" + UpdateCertificateReqAtt.ApplicationNumber + ".JPG";
                    path = dir;
                    bool foldrExists = Directory.Exists(dir);
                    if (!foldrExists)
                        Directory.CreateDirectory(dir);
                    string imgPath = Path.Combine(path, StdPhoto);
                    byte[] Bytes = Convert.FromBase64String(UpdateCertificateReqAtt.StudentPhoto);
                    File.WriteAllBytes(imgPath, Bytes);
                    relativePath = imgPath.Replace(HttpContext.Current.Request.PhysicalApplicationPath, GetWebAppRoot()).Replace(@"\", "/");
                    photo_url = relativePath;
                }
                else
                {
                    photo_url = null;
                }

                if (UpdateCertificateReqAtt.StudentSign != "" && UpdateCertificateReqAtt.StudentSign != null)
                {
                    StdSign = "Sign_" + UpdateCertificateReqAtt.ApplicationNumber + ".JPG";
                    path = dir;
                    bool foldrExists = Directory.Exists(dir);
                    if (!foldrExists)
                        Directory.CreateDirectory(dir);
                    string imgPath = Path.Combine(path, StdSign);
                    byte[] Bytes = Convert.FromBase64String(UpdateCertificateReqAtt.StudentSign);
                    File.WriteAllBytes(imgPath, Bytes);
                    relativePath = imgPath.Replace(HttpContext.Current.Request.PhysicalApplicationPath, GetWebAppRoot()).Replace(@"\", "/");
                    sign_url = relativePath;
                }
                else
                {
                    sign_url = null;
                }

                if (UpdateCertificateReqAtt.SSCCertificate != "" && UpdateCertificateReqAtt.SSCCertificate != null)
                {
                    StdSscCert = "SSCCertificate_" + UpdateCertificateReqAtt.ApplicationNumber + ".JPG";
                    path = dir;
                    bool foldrExists = Directory.Exists(dir);
                    if (!foldrExists)
                        Directory.CreateDirectory(dir);
                    string imgPath = Path.Combine(path, StdSscCert);
                    byte[] Bytes = Convert.FromBase64String(UpdateCertificateReqAtt.SSCCertificate);
                    File.WriteAllBytes(imgPath, Bytes);
                    relativePath = imgPath.Replace(HttpContext.Current.Request.PhysicalApplicationPath, GetWebAppRoot()).Replace(@"\", "/");
                    ssccert_url = relativePath;
                }
                else
                {
                    ssccert_url = null;
                }


                if (UpdateCertificateReqAtt.QualificationCertificate != "" && UpdateCertificateReqAtt.QualificationCertificate != null)
                {
                    StdQualCert = "QualificationCertificate_" + UpdateCertificateReqAtt.ApplicationNumber + ".JPG";
                    path = dir;
                    bool foldrExists = Directory.Exists(dir);
                    if (!foldrExists)
                        Directory.CreateDirectory(dir);
                    string imgPath = Path.Combine(path, StdQualCert);
                    byte[] Bytes = Convert.FromBase64String(UpdateCertificateReqAtt.QualificationCertificate);
                    File.WriteAllBytes(imgPath, Bytes);
                    relativePath = imgPath.Replace(HttpContext.Current.Request.PhysicalApplicationPath, GetWebAppRoot()).Replace(@"\", "/");
                    qualcert_url = relativePath;
                }
                else
                {
                    qualcert_url = null;
                }


                if (UpdateCertificateReqAtt.ExperienceCertificate != "" && UpdateCertificateReqAtt.ExperienceCertificate != null)
                {
                    StdExpCert = "ExperienceCertificate_" + UpdateCertificateReqAtt.ApplicationNumber + ".JPG";
                    path = dir;
                    bool foldrExists = Directory.Exists(dir);
                    if (!foldrExists)
                        Directory.CreateDirectory(dir);
                    string imgPath = Path.Combine(path, StdExpCert);
                    byte[] Bytes = Convert.FromBase64String(UpdateCertificateReqAtt.ExperienceCertificate);
                    File.WriteAllBytes(imgPath, Bytes);
                    relativePath = imgPath.Replace(HttpContext.Current.Request.PhysicalApplicationPath, GetWebAppRoot()).Replace(@"\", "/");
                    expcert_url = relativePath;
                }
                else
                {
                    expcert_url = null;
                }

                if (UpdateCertificateReqAtt.BlindCertificate != "" && UpdateCertificateReqAtt.BlindCertificate != null)
                {
                    StdMedCert = "MedicalCertificate_" + UpdateCertificateReqAtt.ApplicationNumber + ".JPG";
                    path = dir;
                    bool foldrExists = Directory.Exists(dir);
                    if (!foldrExists)
                        Directory.CreateDirectory(dir);
                    string imgPath = Path.Combine(path, StdMedCert);
                    byte[] Bytes = Convert.FromBase64String(UpdateCertificateReqAtt.BlindCertificate);
                    File.WriteAllBytes(imgPath, Bytes);
                    relativePath = imgPath.Replace(HttpContext.Current.Request.PhysicalApplicationPath, GetWebAppRoot()).Replace(@"\", "/");
                    medcert_url = relativePath;
                }
                else
                {
                    medcert_url = null;
                }

                var dbHandler = new ccicdbHandler();
                //string encriptedaadhar = "";

                //var res = UpdateCertificateReqAtt.AadharNumber.Split(new string[] { "$$@@$$" }, StringSplitOptions.None);
                //var crypt = new HbCrypt(res[1]);
                //var aadharencrypt = new HbCrypt();
                //string aadhar = crypt.AesDecrypt(res[0]);
                //string decryptaadhar = aadharencrypt.AesDecrypt(aadhar);
                //encriptedaadhar = aadharencrypt.Encrypt(decryptaadhar);
                var param = new SqlParameter[34];
                param[0] = new SqlParameter("@ApplicationNumber", UpdateCertificateReqAtt.ApplicationNumber);
                param[1] = new SqlParameter("@InstitutionID", UpdateCertificateReqAtt.InstitutionID);
                param[2] = new SqlParameter("@CourseID", UpdateCertificateReqAtt.CourseID);
                param[3] = new SqlParameter("@CourseQualificationID", UpdateCertificateReqAtt.CourseQualificationID);
                param[4] = new SqlParameter("@CourseExperienceID", UpdateCertificateReqAtt.CourseExperienceID);
                param[5] = new SqlParameter("@SSC", UpdateCertificateReqAtt.SSC);
                param[6] = new SqlParameter("@SSCHallticketNumber", UpdateCertificateReqAtt.SSCHallticketNumber);
                param[7] = new SqlParameter("@SSCPassedYear", UpdateCertificateReqAtt.SSCPassedYear);
                param[8] = new SqlParameter("@SSCPassedType", UpdateCertificateReqAtt.SSCPassedType);
                param[9] = new SqlParameter("@StudentName", UpdateCertificateReqAtt.StudentName);
                param[10] = new SqlParameter("@FatherName", UpdateCertificateReqAtt.FatherName);
                param[11] = new SqlParameter("@MotherName", UpdateCertificateReqAtt.MotherName);
                param[12] = new SqlParameter("@DateofBirth", UpdateCertificateReqAtt.DateofBirth);
                param[13] = new SqlParameter("@SSCDateofBirth", UpdateCertificateReqAtt.SSCDateofBirth);
                param[14] = new SqlParameter("@Gender", UpdateCertificateReqAtt.Gender);
                param[15] = new SqlParameter("@AadharNumber", UpdateCertificateReqAtt.AadharNumber);
                param[16] = new SqlParameter("@HouseNumber", UpdateCertificateReqAtt.HouseNumber);
                param[17] = new SqlParameter("@Street", UpdateCertificateReqAtt.Street);
                param[18] = new SqlParameter("@Landmark", UpdateCertificateReqAtt.Landmark);
                param[19] = new SqlParameter("@Village", UpdateCertificateReqAtt.Village);
                param[20] = new SqlParameter("@Pincode", UpdateCertificateReqAtt.Pincode);
                param[21] = new SqlParameter("@District", UpdateCertificateReqAtt.District);
                param[22] = new SqlParameter("@AddressState", UpdateCertificateReqAtt.AddressState);
                param[23] = new SqlParameter("@StudentMobile", UpdateCertificateReqAtt.StudentMobile);
                param[24] = new SqlParameter("@StudentEmail", UpdateCertificateReqAtt.StudentEmail);
                param[25] = new SqlParameter("@SSCValidated", UpdateCertificateReqAtt.SSCValidated);
                param[26] = new SqlParameter("@UserName", UpdateCertificateReqAtt.UserName);
                param[27] = new SqlParameter("@StudentPhoto", photo_url);
                param[28] = new SqlParameter("@StudentSign", sign_url);
                param[29] = new SqlParameter("@SSCCertificate", ssccert_url);
                param[30] = new SqlParameter("@QualificationCertificate", qualcert_url);
                param[31] = new SqlParameter("@ExperienceCertificate", expcert_url);
                param[32] = new SqlParameter("@BlindCertificate", medcert_url);
                param[33] = new SqlParameter("@IsBlind", UpdateCertificateReqAtt.IsBlind);


                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Add_StudentDetails", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("SP_Add_StudentDetails", 0, ex.Message);
                return ex.Message;
            }

        }
        //public class filelist
        //{
        //    public int fileindex { get; set; }
        //    public string file { get; set; }
        //}


        //public class CertificateReqAtt
        //{
        //  public string ApplicationNumber { get; set; }

        //    public int InstitutionID { get; set; }
        //    public int CourseID { get; set; }
        //    public int CourseQualificationID { get; set; }
        //    public int CourseExperienceID { get; set; }
        //    public int SSC { get; set; }
        //    public string SSCHallticketNumber { get; set; }
        //    public int SSCPassedYear { get; set; }
        //    public string SSCPassedType { get; set; }
        //    public string StudentName { get; set; }
        //    public string FatherName { get; set; }
        //    public string MotherName { get; set; }
        //    public DateFormat DateofBirth { get; set; }
        //    public string SSCDateofBirth { get; set; }
        //    public string Gender { get; set; }
        //    public int AadharNumber { get; set; }
        //    public string HouseNumber { get; set; }
        //    public string Street { get; set; }
        //    public string Landmark { get; set; }
        //    public string Village { get; set; }
        //    public int Pincode { get; set; }
        //    public string District { get; set; }
        //    public string AddressState { get; set; }
        //    public string StudentMobile { get; set; }
        //    public string StudentEmail { get; set; }
        //    public bool SSCValidated { get; set; }

        //    public string UserName { get; set; }
        //    public string StudentPhoto { get; set; }
        //    public string StudentSign { get; set; }
        //    public string SSCCertificate { get; set; }
        //    public string QualificationCertificate { get; set; }
        //    public string ExperienceCertificate { get; set; }
        //    public List<filelist> filedata { get; set; }


        //}
        //[HttpPost, ActionName("AddStudentDetails")]
        //public string AddStudentDetails([FromBody] CertificateReqAtt CertificateReqAtt)
        //{
        //    try
        //    {
        //        var fileDat = new List<filelist>();
        //        int size = CertificateReqAtt.filedata.Count;
        //        var file = string.Empty;
        //        for (int i = 0; i < size; i++)
        //        {
        //            var filename = CertificateReqAtt.ApplicationNumber + "_" + Guid.NewGuid() + ".jpg";
        //            var path = ConfigurationManager.AppSettings["certFolderPath"];
        //            bool folderExists = Directory.Exists(path);
        //            if (!folderExists)
        //                Directory.CreateDirectory(path);
        //            string imgPath = Path.Combine(path, filename);
        //            byte[] imageBytes = Convert.FromBase64String(CertificateReqAtt.filedata[i].file);
        //            File.WriteAllBytes(imgPath, imageBytes);
        //            file += filename + ',';
        //        }
        //        var dbHandler = new ccicdbHandler();
        //        var param = new SqlParameter[32];
        //        param[0] = new SqlParameter("@ApplicationNumber", CertificateReqAtt.ApplicationNumber);
        //        param[1] = new SqlParameter("@InstitutionID", CertificateReqAtt.InstitutionID);
        //        param[2] = new SqlParameter("@CourseID", CertificateReqAtt.CourseID);
        //        param[3] = new SqlParameter("@CourseQualificationID", CertificateReqAtt.CourseQualificationID);
        //        param[4] = new SqlParameter("@CourseExperienceID", CertificateReqAtt.CourseExperienceID);
        //        param[5] = new SqlParameter("@SSC", CertificateReqAtt.SSC);
        //        param[6] = new SqlParameter("@SSCHallticketNumber", CertificateReqAtt.SSCHallticketNumber);
        //        param[7] = new SqlParameter("@SSCPassedYear", CertificateReqAtt.SSCPassedYear);
        //        param[8] = new SqlParameter("@SSCPassedType", CertificateReqAtt.SSCPassedType);
        //        param[9] = new SqlParameter("@StudentName", CertificateReqAtt.StudentName);
        //        param[10] = new SqlParameter("@FatherName", CertificateReqAtt.FatherName);
        //        param[11] = new SqlParameter("@MotherName", CertificateReqAtt.MotherName);
        //        param[12] = new SqlParameter("@DateofBirth", CertificateReqAtt.DateofBirth);
        //        param[13] = new SqlParameter("@SSCDateofBirth", CertificateReqAtt.SSCDateofBirth);
        //        param[14] = new SqlParameter("@Gender", CertificateReqAtt.Gender);
        //        param[15] = new SqlParameter("@AadharNumber", CertificateReqAtt.AadharNumber);
        //        param[16] = new SqlParameter("@HouseNumber", CertificateReqAtt.HouseNumber);
        //        param[17] = new SqlParameter("@Street", CertificateReqAtt.Street);
        //        param[18] = new SqlParameter("@Landmark", CertificateReqAtt.Landmark);
        //        param[19] = new SqlParameter("@Village", CertificateReqAtt.Village);
        //        param[20] = new SqlParameter("@Pincode", CertificateReqAtt.Pincode);
        //        param[21] = new SqlParameter("@District", CertificateReqAtt.District);
        //        param[22] = new SqlParameter("@AddressState", CertificateReqAtt.AddressState);
        //        param[23] = new SqlParameter("@StudentMobile", CertificateReqAtt.StudentMobile);
        //        param[24] = new SqlParameter("@StudentEmail", CertificateReqAtt.StudentEmail);
        //        param[25] = new SqlParameter("@SSCValidated", CertificateReqAtt.SSCValidated);
        //        param[26] = new SqlParameter("@UserName", CertificateReqAtt.UserName);
        //        param[27] = new SqlParameter("@StudentPhoto", CertificateReqAtt.StudentPhoto);
        //        param[28] = new SqlParameter("@StudentSign", CertificateReqAtt.StudentSign);
        //        param[29] = new SqlParameter("@SSCCertificate", CertificateReqAtt.SSCCertificate);
        //        param[30] = new SqlParameter("@QualificationCertificate", CertificateReqAtt.QualificationCertificate);
        //        param[31] = new SqlParameter("@ExperienceCertificate", CertificateReqAtt.ExperienceCertificate);


        //        var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Add_StudentDetails", param);
        //        return JsonConvert.SerializeObject(dt);
        //    }
        //    catch (Exception ex)
        //    {

        //        dbHandler.SaveErorr("SP_Add_StudntDetails", 0, ex.Message);
        //        return ex.Message;
        //    }

        //}

        [HttpPost, ActionName("GetApplicationNumber")]
        public string GetApplicationNumber()
        {
            var dbHandler = new ccicdbHandler();
            try
            {
                string StrQuery = "";
                StrQuery = "exec SP_Get_ApplicationNumber";
                var res = dbHandler.ReturnDataSet(StrQuery);
                return JsonConvert.SerializeObject(res);
            }
            catch (Exception ex)
            {

                ccicdbHandler.SaveErorr("SP_Get_ApplicationNumber", 0, ex.Message);
                throw ex;
            }
        }

        [HttpPost, ActionName("GetDistricts")]
        public string GetDistricts()
        {
            var dbHandler = new ccicdbHandler();
            try
            {
                string StrQuery = "";
                StrQuery = "exec SP_Get_Districts";
                var res = dbHandler.ReturnDataSet(StrQuery);
                return JsonConvert.SerializeObject(res);
            }
            catch (Exception ex)
            {

                ccicdbHandler.SaveErorr("SP_Get_Districts", 0, ex.Message);
                throw ex;
            }
        }



        [HttpGet, ActionName("GetViewStudentDetails")]
        public string GetViewStudentDetails(string ApplicationNumber,int StudentID,string ApplicationStatus)
        {
            try
            {

                var dbHandler = new ccicdbHandler();
                //string decryptpassword = "";
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@ApplicationNumber", ApplicationNumber);
                param[1] = new SqlParameter("@StudentID",StudentID);
                param[2] = new SqlParameter("@ApplicationStatus", ApplicationStatus);

                //var passcrypt = new CcicCrypt();

                var dt = dbHandler.ReturnDataSet("SP_Get_ViewStudentDetails", param);


                //string Password = dt.Tables[0].Rows[0]["AadharNumber"].ToString();
                //decryptpassword = passcrypt.CcicDecrypt(Password);
                //List<person> p = new List<person>();
                //person p1 = new person();             
                //p1.Data = JsonConvert.SerializeObject(dt);
                //p1.Password = decryptpassword;

                //p.Add(p1);

                //return JsonConvert.SerializeObject(p);
                return JsonConvert.SerializeObject(dt);


            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("SP_Get_ViewStudentDetails", 0, ex.Message);
                return ex.Message;
            }

        }



        [HttpGet, ActionName("GetStudentDetails")]
        public string GetStudentDetails(string ApplicationNumber, int StudentID)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                //string decryptpassword = "";
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@ApplicationNumber", ApplicationNumber);
                param[1] = new SqlParameter("@StudentID", StudentID);

                //var passcrypt = new CcicCrypt();

                var dt = dbHandler.ReturnDataSet("SP_Get_StudentDetails", param);
                //string Password = dt.Tables[0].Rows[0]["AadharNumber"].ToString();
                //decryptpassword = passcrypt.CcicDecrypt(Password);
                //List<person> p = new List<person>();
                //person p1 = new person();
                //p1.Data = JsonConvert.SerializeObject(dt);
                //p1.Password = decryptpassword;

                //p.Add(p1);

                //return JsonConvert.SerializeObject(p);
                return JsonConvert.SerializeObject(dt);


            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("SP_Get_StudentDetails", 0, ex.Message);
                return ex.Message;
            }

        }


        [HttpPost, ActionName("SetApplicationApprovalStatus")]
        public string SetApplicationApprovalStatus([FromBody] JsonObject data)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[4];
                param[0] = new SqlParameter("@StudentID", data["StudentId"]);
                param[1] = new SqlParameter("@UpdatedBy", data["UpdatedBy"]);
                param[2] = new SqlParameter("@ApplicationStatus", data["ApplicationStatus"]);
                param[3] = new SqlParameter("@Remarks", data["Remarks"]);



                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Set_ApplicationApprovalStatus", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("SP_Set_ApplicationApprovalStatus", 0, ex.Message);
                return ex.Message;
            }

        }


        [HttpPost, ActionName("GetInstitutionEnrollmentReportData")]
        public string GetInstitutionEnrollmentReportData([FromBody] JsonObject data)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@InstitutionID", data["InstitutionID"]);
                param[1] = new SqlParameter("@CourseID", data["CourseID"]);
                param[2] = new SqlParameter("@ReportTypeID", data["ReportTypeID"]);


                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Get_Ins_EnrollmentReportData", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("SP_Get_Ins_EnrollmentReportData", 0, ex.Message);
                return ex.Message;
            }

        }


        [HttpPost, ActionName("GetInstitutionRegisterReportData")]
        public string GetInstitutionRegisterReportData([FromBody] JsonObject data)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[5];
                param[0] = new SqlParameter("@InstitutionID", data["InstitutionID"]);
                param[1] = new SqlParameter("@CourseID", data["CourseID"]);
                param[2] = new SqlParameter("@ReportTypeID", data["ReportTypeID"]);
                param[3] = new SqlParameter("@AcademicYearID", data["AcademicYearID"]);
                param[4] = new SqlParameter("@Batch", data["Batch"]);


                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Get_Ins_RegisterReportData", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("SP_Get_Ins_RegisterReportData", 0, ex.Message);
                return ex.Message;
            }

        }


        [HttpPost, ActionName("GetInstitutionVerificationReportData")]
        public string GetInstitutionVerificationReportData([FromBody] JsonObject data)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[5];
                param[0] = new SqlParameter("@AcademicYearID", data["AcademicYearID"]);
                param[1] = new SqlParameter("@Batch", data["Batch"]);
                param[2] = new SqlParameter("@InstitutionID", data["InstitutionID"]);
                param[3] = new SqlParameter("@CourseID", data["CourseID"]);
                param[4] = new SqlParameter("@ReportTypeID", data["ReportTypeID"]);


                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Get_VerificationReportData", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("SP_Get_VerificationReportData", 0, ex.Message);
                return ex.Message;
            }

        }

        [HttpPost, ActionName("SubmitStdDetails")]
        public string SubmitStdDetails([FromBody] JsonObject data)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@ApplicationNumber", data["ApplicationNumber"]);
                param[1] = new SqlParameter("@StudentID", data["StudentID"]);



                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Set_ApplicationSubmit", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("SP_Set_ApplicationSubmit", 0, ex.Message);
                return ex.Message;
            }

        }

        [HttpGet, ActionName("UpdateAcademicYear")]
        public string UpdateAcademicYear(int AcademicYearID,  DateTime AcademicYearStartDate, DateTime AcademicYearEndDate, bool CurrentAcademicYear, string UserName)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[5];
                param[0] = new SqlParameter("@AcademicYearID", AcademicYearID);      
                param[1] = new SqlParameter("@AcademicYearStartDate", AcademicYearStartDate);
                param[2] = new SqlParameter("@AcademicYearEndDate", AcademicYearEndDate);
                param[3] = new SqlParameter("@CurrentAcademicYear", CurrentAcademicYear);
                param[4] = new SqlParameter("@UserName", UserName);


                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Update_AcademicYear", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("SP_Update_AcademicYear", 0, ex.Message);
                return ex.Message;
            }

        }

        [HttpGet, ActionName("AddAcademicYearCurrentBatch")]
        public string AddAcademicYearCurrentBatch(int AcademicYearID,int Batch,bool CurrentBatch,string UserName)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[4];
                param[0] = new SqlParameter("@AcademicYearID", AcademicYearID);
                param[1] = new SqlParameter("@Batch", Batch);
                param[2] = new SqlParameter("@CurrentBatch", CurrentBatch);
                param[3] = new SqlParameter("@UserName", UserName);


                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Add_AcademicYearCurrentBatch", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("SP_Add_AcademicYearCurrentBatch", 0, ex.Message);
                return ex.Message;
            }

        }

        [HttpGet, ActionName("AddAYCourseDurationBatches")]
        public string AddAYCourseDurationBatches(int AcademicYearID, string CourseDuration, int Batch,DateTime AYBatchStartDate,DateTime AYBatchEndDate, string UserName)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[6];
                param[0] = new SqlParameter("@AcademicYearID", AcademicYearID);
                param[1] = new SqlParameter("@CourseDuration", CourseDuration);
                param[2] = new SqlParameter("@Batch", Batch);
                param[3] = new SqlParameter("@AYBatchStartDate", AYBatchStartDate);
                param[4] = new SqlParameter("@AYBatchEndDate", AYBatchEndDate);
                param[5] = new SqlParameter("@UserName", UserName);


                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Add_AcademicYearBatch", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("SP_Add_AcademicYearBatch", 0, ex.Message);
                return ex.Message;
            }

        }

        [HttpGet, ActionName("AddEnrollementDates")]
        public string AddEnrollementDates(int AcademicYearID, string CourseDuration, int Batch, DateTime EnrollementStartDate, DateTime EnrollementEndDate, string UserName)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[6];
                param[0] = new SqlParameter("@AcademicYearID", AcademicYearID);
                param[1] = new SqlParameter("@CourseDuration", CourseDuration);
                param[2] = new SqlParameter("@Batch", Batch);
                param[3] = new SqlParameter("@EnrollementStartDate", EnrollementStartDate);
                param[4] = new SqlParameter("@EnrollementEndDate", EnrollementEndDate);
                param[5] = new SqlParameter("@UserName", UserName);


                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Add_EnrollementDates", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("SP_Add_EnrollementDates", 0, ex.Message);
                return ex.Message;
            }

        }


        [HttpGet, ActionName("UpdateAcademicYearCurrentBatch")]
        public string UpdateAcademicYearCurrentBatch(int AcademicYearCurrentBatchID,bool CurrentBatch, string UserName)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@AcademicYearCurrentBatchID", AcademicYearCurrentBatchID);
                param[1] = new SqlParameter("@CurrentBatch", CurrentBatch);
                param[2] = new SqlParameter("@UserName", UserName);
            

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Update_AcademicYearCurrentBatch", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("SP_Update_AcademicYearCurrentBatch", 0, ex.Message);
                return ex.Message;
            }

        }


        [HttpGet, ActionName("SetAYCourseDurationBatchStatus")]
        public string SetAYCourseDurationBatchStatus(int UpdateType, string UserName, int AcademicYearBatchID, bool Active)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[4];
                param[0] = new SqlParameter("@UpdateType", UpdateType);
                param[1] = new SqlParameter("@UserName", UserName);
                param[2] = new SqlParameter("@AcademicYearBatchID", AcademicYearBatchID);
                param[3] = new SqlParameter("@Active", Active);
                
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Update_AcademicYearBatch", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("SP_Update_AcademicYearBatch", 0, ex.Message);
                return ex.Message;
            }

        }


        [HttpGet, ActionName("SetExamMonthYearStatus")]
        public string SetExamMonthYearStatus(int UpdateType, string UserName, int ExamMonthYearID, bool Active)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[4];
                param[0] = new SqlParameter("@UpdateType", UpdateType);
                param[1] = new SqlParameter("@UserName", UserName);
                param[2] = new SqlParameter("@ExamMonthYearID", ExamMonthYearID);
                param[3] = new SqlParameter("@Active", Active);

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Update_ExamMonthYear", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("SP_Update_ExamMonthYear", 0, ex.Message);
                return ex.Message;
            }

        }

        [HttpGet, ActionName("UpdateAYCourseDurationBatchDates")]
        public string UpdateAYCourseDurationBatchDates(int UpdateType, string UserName, int AcademicYearBatchID, bool Active, DateTime AYBatchStartDate, DateTime AYBatchEndDate)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[6];
                param[0] = new SqlParameter("@UpdateType", UpdateType);
                param[1] = new SqlParameter("@UserName", UserName);
                param[2] = new SqlParameter("@AcademicYearBatchID", AcademicYearBatchID);
                param[3] = new SqlParameter("@Active", Active);
                param[4] = new SqlParameter("@AYBatchStartDate", AYBatchStartDate);
                param[5] = new SqlParameter("@AYBatchEndDate", AYBatchEndDate);

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Update_AcademicYearBatch", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("SP_Update_AcademicYearBatch", 0, ex.Message);
                return ex.Message;
            }

        }


        [HttpGet, ActionName("UpdateExamMonthYear")]
        public string UpdateExamMonthYear(string UserName, int ExamMonthYearID, string ExamMonthYearName, int ExamMonthYearSequence)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[4];
                param[0] = new SqlParameter("@UserName", UserName);
                param[1] = new SqlParameter("@ExamMonthYearID", ExamMonthYearID);
                param[2] = new SqlParameter("@ExamMonthYearName", ExamMonthYearName);
                param[3] = new SqlParameter("@ExamMonthYearSequence", ExamMonthYearSequence);
               

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Update_ExamMonthYear", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("SP_Update_ExamMonthYear", 0, ex.Message);
                return ex.Message;
            }

        }

        [HttpGet, ActionName("UpdateEnrollementDates")]
        public string UpdateEnrollementDates(int UpdateType, string UserName, int EnrollementDatesID, bool Active, DateTime EnrollementStartDate, DateTime EnrollementEndDate)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[6];
                param[0] = new SqlParameter("@UpdateType", UpdateType);
                param[1] = new SqlParameter("@UserName", UserName);
                param[2] = new SqlParameter("@EnrollementDatesID", EnrollementDatesID);
                param[3] = new SqlParameter("@Active", Active);
                param[4] = new SqlParameter("@EnrollementStartDate", EnrollementStartDate);
                param[5] = new SqlParameter("@EnrollementEndDate", EnrollementEndDate);

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Update_EnrollementDates", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("SP_Update_EnrollementDates", 0, ex.Message);
                return ex.Message;
            }

        }



        [HttpGet, ActionName("SetEnrollementDatesStatus")]
        public string SetEnrollementDatesStatus(int UpdateType, string UserName, int EnrollementDatesID, bool Active)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[4];
                param[0] = new SqlParameter("@UpdateType", UpdateType);
                param[1] = new SqlParameter("@UserName", UserName);
                param[2] = new SqlParameter("@EnrollementDatesID", EnrollementDatesID);
                param[3] = new SqlParameter("@Active", Active);


                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Update_EnrollementDates", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("SP_Update_EnrollementDates", 0, ex.Message);
                return ex.Message;
            }

        }





        //[HttpGet, ActionName("GetSSCDetails")]
        //public string GetSSCDetails(string TENTH_HT_NO, string TENTH_YEAR, string STREAM)
        //{
        //    try
        //    {
        //        var dbHandler = new ccicdbHandler();
        //        var param = new SqlParameter[3];
        //        param[0] = new SqlParameter("@TENTH_HT_NO", TENTH_HT_NO);
        //        param[1] = new SqlParameter("@TENTH_YEAR", TENTH_YEAR);
        //        param[2] = new SqlParameter("@STREAM", STREAM);



        //        var dt = dbHandler.ReturnDataWithStoredProcedureTable("TempSP_Get_SSCData", param);
        //        return JsonConvert.SerializeObject(dt);
        //    }
        //    catch (Exception ex)
        //    {

        //        dbHandler.SaveErorr("TempSP_Get_SSCData", 0, ex.Message);
        //        return ex.Message;
        //    }

        //}
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
                            RESULT = PIDResponseXML["NewDataSet"]["Table"]["RESULT"].InnerText;
                        }
                        catch (Exception ex)
                        {
                            ROLLNO = PIDResponseXML["NewDataSet"]["Table"]["ROLLNO"].InnerText;
                            NAME = PIDResponseXML["NewDataSet"]["Table"]["NAME"].InnerText == null || PIDResponseXML["NewDataSet"]["Table"]["NAME"].InnerText == "-" ? null : PIDResponseXML["NewDataSet"]["Table"]["NAME"].InnerText;
                            FNAME = PIDResponseXML["NewDataSet"]["Table"]["FNAME"].InnerText == null || PIDResponseXML["NewDataSet"]["Table"]["FNAME"].InnerText == "-" ? null : PIDResponseXML["NewDataSet"]["Table"]["FNAME"].InnerText;
                            MNAME = PIDResponseXML["NewDataSet"]["Table"]["MNAME"].InnerText == null || PIDResponseXML["NewDataSet"]["Table"]["MNAME"].InnerText == "-" ? null : PIDResponseXML["NewDataSet"]["Table"]["MNAME"].InnerText;
                            DOB = PIDResponseXML["NewDataSet"]["Table"]["DOB"].InnerText == null || PIDResponseXML["NewDataSet"]["Table"]["DOB"].InnerText == "-" ? null : PIDResponseXML["NewDataSet"]["Table"]["DOB"].InnerText;
                            SEX = "-";
                            RESULT = PIDResponseXML["NewDataSet"]["Table"]["RESULT"].InnerText;
                        }

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


        [HttpPost, ActionName("GetAdminExamCentersList")]
        public HttpResponseMessage GetAdminExamCentersList([FromBody] JsonObject request)
        {
            try
            {

                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@AcademicYearID", request["AcademicYearID"].ToString());
                //param[1] = new SqlParameter("@CourseIds", request["CourseIds"].ToString());
                param[1] = new SqlParameter("@ExamMonthYearID", request["ExamMonthYearID"].ToString());
               
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Get_InstitutionVsExamCenter", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("SP_Get_InstitutionVsExamCenter", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }


        [HttpPost, ActionName("GetorEditExamCentresMappingData")]
        public HttpResponseMessage GetorEditExamCentresMappingData([FromBody] JsonObject request)
        {
            try
            {

                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[5];
                param[0] = new SqlParameter("@DataType", request["DataType"].ToString());
                param[1] = new SqlParameter("@AcademicYearID", request["AcademicYearID"].ToString());
                param[2] = new SqlParameter("@ExamMonthYearID", request["ExamMonthYearID"].ToString());
                param[3] = new SqlParameter("@CourseID", request["CourseID"].ToString());
                param[4] = new SqlParameter("@InstitutionExamCenterMappingId", request["InstitutionExamCenterMappingId"].ToString());
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Get_Edit_ExamCenterMappings", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("SP_Get_Edit_ExamCenterMappings", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }

        [HttpPost, ActionName("SetAdminExamCentersList")]
        public HttpResponseMessage SetAdminExamCentersList([FromBody] JsonObject request)
        {
            try
            {

                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@Json", request["Json"]);
                param[1] = new SqlParameter("@ExamMonthYearID", request["ExamMonthYearID"]);

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Set_InstitutionVsExamCenter", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("SP_Set_InstitutionVsExamCenter", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }


        [HttpPost, ActionName("AddMappingExamCentres")]
        public HttpResponseMessage AddMappingExamCentres([FromBody] JsonObject request)
        {
            try
            {

                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[6];
                param[0] = new SqlParameter("@AcademicYearID", request["AcademicYearID"]);
                param[1] = new SqlParameter("@ExamMonthYearID", request["ExamMonthYearID"]);
                param[2] = new SqlParameter("@CourseID", request["CourseID"]);
                param[3] = new SqlParameter("@ExaminationCentreID", request["ExaminationCentreID"]);
                param[4] = new SqlParameter("@InstitutionIDJson", request["InstitutionIDJson"]);
                param[5] = new SqlParameter("@UserName", request["UserName"]);

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Set_InstitutionExamCenterMapping", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("SP_Set_InstitutionExamCenterMapping", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }

        [HttpPost, ActionName("UpdateMappingExamCentres")]
        public HttpResponseMessage UpdateMappingExamCentres([FromBody] JsonObject request)
        {
            try
            {

                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[4];
                param[0] = new SqlParameter("@InstitutionExamCenterMappingId", request["InstitutionExamCenterMappingId"]);
                param[1] = new SqlParameter("@ExaminationCentreID", request["ExaminationCentreID"]);
                param[2] = new SqlParameter("@Active", request["Active"]);
                param[3] = new SqlParameter("@UserName", request["UserName"]);

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Update_ExamCenterMappings", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("SP_Update_ExamCenterMappings", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }

        public class NRData
        {
            public int StudentTypeID { get; set; }
            public int ExamMonthYearID { get; set; }
            public int CourseDurationID { get; set; }
            public int AcademicYearID { get; set; }
            public int BatchID { get; set; }
            public string UserName { get; set; }

        }

        [HttpPost, ActionName("AddNRDataforFeePayment")]
        public string AddNRDataforFeePayment([FromBody] NRData data)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[6];
                param[0] = new SqlParameter("@StudentTypeID", data.StudentTypeID);
                param[1] = new SqlParameter("@ExamMonthYearID", data.ExamMonthYearID);
                param[2] = new SqlParameter("@CourseDurationID", data.CourseDurationID);
                param[3] = new SqlParameter("@AcademicYearID", data.AcademicYearID);
                param[4] = new SqlParameter("@BatchID", data.BatchID);
                param[5] = new SqlParameter("@UserName", data.UserName);



                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Add_FeePaymentNRData", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("SP_Add_FeePaymentNRData", 0, ex.Message);
                return ex.Message;
            }

        }

        [HttpGet, ActionName("GetFeePaymentNRData")]
        public string GetFeePaymentNRData(int ExamMonthYearID)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@ExamMonthYearID", ExamMonthYearID);

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Get_FeePaymentNRData", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpPost, ActionName("GetFeePaymentDates")]
        public string GetFeePaymentDates([FromBody] FeePaymentDatesInfo data)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@DataType", data.DataType);
                param[1] = new SqlParameter("@AcademicYearID", data.AcademicYearID);
                param[2] = new SqlParameter("@FeePaymentDateID", data.FeePaymentDateID);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Get_FeePaymentDates", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("SP_Get_FeePaymentDates", 0, ex.Message);
                return ex.Message;
            }

        }

        public class FeePaymentDatesInfo
        {
            public int DataType { get; set; }
            public int FeePaymentDateID { get; set; }
            public int AcademicYearID { get; set; }
            public int ExamMonthYearID { get; set; }
            public DateTime StartDate { get; set; }
            public DateTime LastDatewithoutFine { get; set; }
            public DateTime LastDatewithFine { get; set; }
            public DateTime TatkalEndDate { get; set; }
            public DateTime PremiumTatkalEndDate { get; set; }
            public int ExaminationFee { get; set; }
            public int LateFee { get; set; }
            public int TatkalFee { get; set; }
            public int PremiumTatkalFee { get; set; }
            public int CertificateFee { get; set; }
            public bool Active { get; set; }
            public string UserName { get; set; }
        }



        [HttpPost, ActionName("AddorUpdateFeePaymentDates")]
        public string AddorUpdateFeePaymentDates([FromBody] FeePaymentDatesInfo data)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[16];
                param[0] = new SqlParameter("@DataType", data.DataType);
                param[1] = new SqlParameter("@FeePaymentDateID", data.FeePaymentDateID);
                param[2] = new SqlParameter("@AcademicYearID", data.AcademicYearID);
                param[3] = new SqlParameter("@ExamMonthYearID", data.ExamMonthYearID);
                param[4] = new SqlParameter("@StartDate", data.StartDate);
                param[5] = new SqlParameter("@LastDatewithoutFine", data.LastDatewithoutFine);
                param[6] = new SqlParameter("@LastDatewithFine", data.LastDatewithFine);
                param[7] = new SqlParameter("@TatkalEndDate", data.TatkalEndDate);
                param[8] = new SqlParameter("@PremiumTatkalEndDate", data.PremiumTatkalEndDate);
                param[9] = new SqlParameter("@ExaminationFee", data.ExaminationFee);
                param[10] = new SqlParameter("@LateFee", data.LateFee);
                param[11] = new SqlParameter("@TatkalFee", data.TatkalFee);
                param[12] = new SqlParameter("@PremiumTatkalFee", data.PremiumTatkalFee);
                param[13] = new SqlParameter("@CertificateFee", data.CertificateFee);
                param[14] = new SqlParameter("@Active", data.Active);
                param[15] = new SqlParameter("@UserName", data.UserName);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Add_Update_FeePaymentDates", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("SP_Add_Update_FeePaymentDates", 0, ex.Message);
                return ex.Message;
            }

        }


        public class HolidayDates
        {
            public string Json { get; set; }
            public int AcademicYearId { get; set; }
            public int ExamMonthYearId { get; set; }
        }



        [HttpPost, ActionName("SetHolidayDates")]
        public HttpResponseMessage SetHolidayDates([FromBody] HolidayDates data)
        {
            try
            {

                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@Json", data.Json);
                param[1] = new SqlParameter("@AcademicYearId", data.AcademicYearId);
                param[2] = new SqlParameter("@ExamMonthYearId", data.ExamMonthYearId);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("USP_SET_TimeTableNewHolidays_Test", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_SET_TimeTableNewHolidays_Test", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpPost, ActionName("GenerateTimeTable")]
        public HttpResponseMessage GenerateTimeTable([FromBody] JsonObject data)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[6];
                param[0] = new SqlParameter("@HolidaysJson", data["HolidaysJson"].ToString());
                param[1] = new SqlParameter("@AcademicYearId", data["AcademicYearId"].ToString());
                param[2] = new SqlParameter("@ExamMonthYearId", data["ExamMonthYearId"].ToString());
                param[3] = new SqlParameter("@TimeSlotJson", data["TimeSlotJson"].ToString());
                param[4] = new SqlParameter("@StartDate", data["StartDate"].ToString());
                param[5] = new SqlParameter("@UserName", data["UserName"].ToString());
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_SET_TimeTable", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("SP_SET_TimeTable", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }

        }

        [HttpPost, ActionName("VerifyTimeTableGeneration")]
        public HttpResponseMessage VerifyTimeTableGeneration([FromBody] JsonObject data)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@AcademicYearID", data["AcademicYearID"].ToString());
                param[1] = new SqlParameter("@ExamMonthYearID", data["ExamMonthYearID"].ToString());
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Verify_TimeTableGeneration", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("SP_Verify_TimeTableGeneration", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }

        }


        [HttpGet, ActionName("GetTimeTableDataPdf")]
        public string GetTimeTableDataPdf(int DataType,int AcademicYearID,int ExamMonthYearID)
        {
            string NRReportDir = @"Reports\NR\";
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@DataType", DataType);
                param[1] = new SqlParameter("@AcademicYearID", AcademicYearID);
                param[2] = new SqlParameter("@ExamMonthYearID", ExamMonthYearID);
                DataSet ds = dbHandler.ReturnDataSet("SP_Get_TimeTablePdforExcel", param);
                CcicGenerateTimeTable CcicGenerateTimeTable = new CcicGenerateTimeTable();
                var pdf = CcicGenerateTimeTable.GetTtPdf(ds, NRReportDir);
                //Directory.Delete(NRReportDir, true);

                return pdf;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public class person1
        {
            public string ResponseCode { get; set; }
            public string ResponceCode { get; set; }
            public string ResponceDescription { get; set; }
            public string file { get; set; }

        }

        [HttpGet, ActionName("GetCcicTimeTableExcel")]
        public string GetCcicTimeTableExcel(int DataType, int AcademicYearID,int ExamMonthYearID)
        {

            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@DataType", DataType);
                param[1] = new SqlParameter("@AcademicYearID", AcademicYearID);
                param[2] = new SqlParameter("@ExamMonthYearID", ExamMonthYearID);
                DataSet ds = dbHandler.ReturnDataSet("SP_Get_TimeTablePdforExcel", param);
                if (ds.Tables[0].Rows.Count > 0)

                {
                    var filename = "TimeTable_"  + ".xlsx";
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
                    List<person1> p = new List<person1>();
                    person1 p1 = new person1();
                    p1.file = file;
                    p1.ResponceCode = "200";
                    p1.ResponceDescription = "Data Found";
                    p.Add(p1);

                    return JsonConvert.SerializeObject(p);
                    //return ;

                }
                else
                {
                    List<person1> p = new List<person1>();
                    person1 p1 = new person1();
                    p1.file = "";
                    p1.ResponceCode = "400";
                    p1.ResponceDescription = "Data not Found";
                    p.Add(p1);
                    return JsonConvert.SerializeObject(p);
                }
                //
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("SP_Get_TimeTablePdforExcel", 0, ex.Message);
                return ex.Message;
            }

        }

        private static void elapse(object sender, ElapsedEventArgs e, string s)
        {
            System.IO.File.Delete(s);
            ((Timer)sender).Stop();
            ((Timer)sender).Dispose();
        }


        public static void CreateAccessDatabase(string databaseFilePath,string filename)
        {
            // Check if the file already exists
            //if (File.Exists(databaseFilePath + filename))
            //{
            //    Console.WriteLine("The database file already exists.");
            //    return;
            //}

            // Create a new Catalog object
            Catalog catalog = new Catalog();

            try
            {
                // Connection string for creating a new Access database
                string connectionString = $"Provider=Microsoft.ACE.OLEDB.12.0;Data Source={databaseFilePath + filename};";

                // Create the database
                catalog.Create(connectionString);


                
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occurred: {ex.Message}");
            }
           
        }


//[HttpGet, ActionName("AddorUpdateorInActiveAssesmentEntryDates")]
//public string AddorUpdateorInActiveAssesmentEntryDates(int DataType, int EntryDateID, int AcademicYearID, int ExamMonthYearID, DateTime StartDate, DateTime EndDate, bool Active, string UserName)
//{
//    try
//    {
//        var dbHandler = new ccicdbHandler();
//        var param = new SqlParameter[8];
//        param[0] = new SqlParameter("@DataType", DataType);
//        param[1] = new SqlParameter("@EntryDateID", EntryDateID);
//        param[2] = new SqlParameter("@AcademicYearID", AcademicYearID);
//        param[3] = new SqlParameter("@ExamMonthYearID", ExamMonthYearID);
//        param[4] = new SqlParameter("@StartDate", StartDate);
//        param[5] = new SqlParameter("@EndDate", EndDate);
//        param[6] = new SqlParameter("@Active", Active);
//        param[7] = new SqlParameter("@UserName", UserName);
//        var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Add_Update_AssesmentEntryDates", param);
//        return JsonConvert.SerializeObject(dt);
//    }
//    catch (Exception ex)
//    {

//        dbHandler.SaveErorr("SP_Add_Update_AssesmentEntryDates", 0, ex.Message);
//        return ex.Message;
//    }

//}





[HttpGet, ActionName("GetFeePaymentReportExcel")]
        public string GetFeePaymentReportExcel(int DataType, int InstitutionID, int AcademicYearID, int ExamMonthYearID,int FeePaymentTypeID,string UserName)
        {
             List<person> p = new List<person>();
            person p1 = new person();
            try
            {

                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[6];
                param[0] = new SqlParameter("@DataType", DataType);
                param[1] = new SqlParameter("@InstitutionID", InstitutionID);
                param[2] = new SqlParameter("@AcademicYearID", AcademicYearID);
                param[3] = new SqlParameter("@ExamMonthYearID", ExamMonthYearID);
                param[4] = new SqlParameter("@FeePaymentTypeID", FeePaymentTypeID);
                param[5] = new SqlParameter("@UserName", UserName);
                DataSet ds = dbHandler.ReturnDataWithStoredProcedure("SP_Get_PinListForFeePaymentReport", param);
                var filename = "FeePaymentReport" + ".xlsx";
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

        [HttpGet, ActionName("GetFeeEligibleReportExcel")]
        public string GetFeeEligibleReportExcel(int DataType)
        {
            List<person> p = new List<person>();
            person p1 = new person();
            try
            {

                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@DataType", DataType);
                DataSet ds = dbHandler.ReturnDataWithStoredProcedure("SP_GET_FeeEligibleData", param);
                var filename = "FeeEligibleReport" + ".xlsx";
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


        [HttpGet, ActionName("GetExamCentreMappingExcel")]
        public string GetExamCentreMappingExcel(int DataType, int AcademicYearID, int ExamMonthYearID, int CourseID, int InstitutionExamCenterMappingId)
        {
            List<person> p = new List<person>();
            person p1 = new person();
            try
            {

                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[5];
                param[0] = new SqlParameter("@DataType", DataType);
                param[1] = new SqlParameter("@AcademicYearID", AcademicYearID);
                param[2] = new SqlParameter("@ExamMonthYearID", ExamMonthYearID);
                param[3] = new SqlParameter("@CourseID", CourseID);
                param[4] = new SqlParameter("@InstitutionExamCenterMappingId", InstitutionExamCenterMappingId);
                DataSet ds = dbHandler.ReturnDataWithStoredProcedure("SP_Get_Edit_ExamCenterMappings", param);
                var filename = "ExamCentresMapping_Report" + ".xlsx";
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

        [HttpGet, ActionName("GetAdmFeePaymentInstituteCountExcel")]
        public string GetAdmFeePaymentInstituteCountExcel(int AcademicYearID, int ExamMonthYearID)
        {
            List<person> p = new List<person>();
            person p1 = new person();
            try
            {

                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@AcademicYearID", AcademicYearID);
                param[1] = new SqlParameter("@ExamMonthYearID", ExamMonthYearID);
                DataSet ds = dbHandler.ReturnDataWithStoredProcedure("SP_Get_Admin_FeePaymentInstituteCount", param);
                var filename = "FeePaymentInstitutewiseCount" + ".accdb";
                var eh = new ExcelHelper();
                var path = ConfigurationManager.AppSettings["DownloadsFolderPath"];
                bool folderExists = Directory.Exists(path);
                if (!folderExists)
                    Directory.CreateDirectory(path);
                //CreateAccessDatabase(path,filename);
                eh.ExportDataSet(ds, path+ filename);

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


        [HttpGet, ActionName("GetAdmFeePaymentCourseCountExcel")]
        public string GetAdmFeePaymentCourseCountExcel(int AcademicYearID, int ExamMonthYearID)
        {
            List<person> p = new List<person>();
            person p1 = new person();
            try
            {

                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@AcademicYearID", AcademicYearID);
                param[1] = new SqlParameter("@ExamMonthYearID", ExamMonthYearID);
                DataSet ds = dbHandler.ReturnDataWithStoredProcedure("SP_Get_Admin_FeePaymentCourseCount", param);
                var filename = "FeePaymentCoursewiseCount" + ".xlsx";
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



        [HttpGet, ActionName("GetCoursewiseFeePaymentCountExcel")]
        public string GetCoursewiseFeePaymentCountExcel(int AcademicYearID, int ExamMonthYearID,int InstitutionID)
        {
            List<person> p = new List<person>();
            person p1 = new person();
            try
            {

                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@AcademicYearID", AcademicYearID);
                param[1] = new SqlParameter("@ExamMonthYearID", ExamMonthYearID);
                param[2] = new SqlParameter("@InstitutionID", InstitutionID);
                DataSet ds = dbHandler.ReturnDataWithStoredProcedure("SP_Get_Admin_FeePaymentInstituteCourseCount", param);
                var filename = "FeePaymentCoursewiseCount" + ".xls";
                var eh = new ExcelHelper();
                var path = ConfigurationManager.AppSettings["DownloadsFolderPath"];
                bool folderExists = Directory.Exists(path);
                if (!folderExists)
                    Directory.CreateDirectory(path);
                eh.ExportDataSetToAccess(ds, path + filename);
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

        [HttpGet, ActionName("GetInstitutewiseFeePaymentCountExcel")]
        public string GetInstitutewiseFeePaymentCountExcel(int AcademicYearID, int ExamMonthYearID, int CourseID)
        {
            List<person> p = new List<person>();
            person p1 = new person();
            try
            {

                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@AcademicYearID", AcademicYearID);
                param[1] = new SqlParameter("@ExamMonthYearID", ExamMonthYearID);
                param[2] = new SqlParameter("@CourseID", CourseID);
                DataSet ds = dbHandler.ReturnDataWithStoredProcedure("SP_Get_Admin_FeePaymentCourseInstituteCount", param);
                var filename = "FeePaymentInstitutewiseCount" + ".xlsx";
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
        [HttpPost, ActionName("RequestLog")]
        public HttpResponseMessage RequestLog([FromBody] JsonObject request)
        {
            try
            {

                var dbHandler = new ccicdbHandler();
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

                dbHandler.SaveErorr("USP_SFP_SET_RequestLog", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }



        [HttpGet, ActionName("GetAdminFeePaymentInstituteCount")]
        public string GetAdminFeePaymentInstituteCount(int AcademicYearID,int ExamMonthYearID)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@AcademicYearID", AcademicYearID);
                param[1] = new SqlParameter("@ExamMonthYearID", ExamMonthYearID);

                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_Get_Admin_FeePaymentInstituteCount", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpGet, ActionName("GetAdminFeePaymentCourseCount")]
        public string GetAdminFeePaymentCourseCount(int AcademicYearID, int ExamMonthYearID)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@AcademicYearID", AcademicYearID);
                param[1] = new SqlParameter("@ExamMonthYearID", ExamMonthYearID);

                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_Get_Admin_FeePaymentCourseCount", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpGet, ActionName("GetCoursewiseFeePaymentCount")]
        public string GetCoursewiseFeePaymentCount(int AcademicYearID, int ExamMonthYearID,int InstitutionID)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@AcademicYearID", AcademicYearID);
                param[1] = new SqlParameter("@ExamMonthYearID", ExamMonthYearID);
                param[2] = new SqlParameter("@InstitutionID", InstitutionID);

                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_Get_Admin_FeePaymentInstituteCourseCount", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpGet, ActionName("GetInstitutewiseFeePaymentCount")]
        public string GetInstitutewiseFeePaymentCount(int AcademicYearID, int ExamMonthYearID,int CourseID)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@AcademicYearID", AcademicYearID);
                param[1] = new SqlParameter("@ExamMonthYearID", ExamMonthYearID);
                param[2] = new SqlParameter("@CourseID", CourseID);

                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_Get_Admin_FeePaymentCourseInstituteCount", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }


        public class HallTicketDatesInfo
        {
            public int DataType { get; set; }
            public int HallTicketDateID { get; set; }
            public int AcademicYearID { get; set; }
            public int ExamMonthYearID { get; set; }
            public DateTime StartDate { get; set; }
            public DateTime EndDate { get; set; }
            public bool Active { get; set; }
            public string UserName { get; set; }
        }

        [HttpPost, ActionName("AddorUpdateHallTicketDates")]
        public string AddorUpdateHallTicketDates([FromBody] HallTicketDatesInfo data)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[8];
                param[0] = new SqlParameter("@DataType", data.DataType);
                param[1] = new SqlParameter("@HallTicketDateID", data.HallTicketDateID);
                param[2] = new SqlParameter("@AcademicYearID", data.AcademicYearID);
                param[3] = new SqlParameter("@ExamMonthYearID", data.ExamMonthYearID);
                param[4] = new SqlParameter("@StartDate", data.StartDate);
                param[5] = new SqlParameter("@EndDate", data.EndDate);
                param[6] = new SqlParameter("@Active", data.Active);
                param[7] = new SqlParameter("@UserName", data.UserName);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Add_Update_HallTicketDates", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("SP_Add_Update_HallTicketDates", 0, ex.Message);
                return ex.Message;
            }

        }

        [HttpGet, ActionName("GetorEditHallTicketDates")]
        public string GetorEditHallTicketDates(int DataType, int HallTicketDateID)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@DataType", DataType);
                param[1] = new SqlParameter("@HallTicketDateID", HallTicketDateID);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Get_Edit_HallTicketDates", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("SP_Get_Edit_HallTicketDates", 0, ex.Message);
                return ex.Message;
            }

        }

        [HttpGet, ActionName("GetNRExcelData")]
        public string GetNRExcelData(int AcademicYearID, int ExamMonthYearID,string ExamCentreCode)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@AcademicYearID", AcademicYearID);
                param[1] = new SqlParameter("@ExamMonthYearID", ExamMonthYearID);
                param[2] = new SqlParameter("@ExamCentreCode", ExamCentreCode);
                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_Get_ExamCentreNRExcelData", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("SP_Get_ExamCentreNRExcelData", 0, ex.Message);
                return ex.Message;
            }

        }



        [HttpGet, ActionName("GetNRExcel")]
        public string GetNRExcel(int AcademicYearID, int ExamMonthYearID, string ExamCentreCode)
        {
            List<person> p = new List<person>();
            person p1 = new person();
            try
            {

                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@AcademicYearID", AcademicYearID);
                param[1] = new SqlParameter("@ExamMonthYearID", ExamMonthYearID);
                param[2] = new SqlParameter("@ExamCentreCode", ExamCentreCode);
                DataSet ds = dbHandler.ReturnDataWithStoredProcedure("SP_Get_ExamCentreNRExcelData", param);
                var filename = "NR_Excel_Report" + ".xlsx";
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


        [HttpGet, ActionName("GetStudentPinList")]
        public string GetStudentPinList(int InstitutionID, int AcademicYearID, int ExamMonthYearID, int FeePaymentTypeID,string UserName)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[5];
                param[0] = new SqlParameter("@InstitutionID", InstitutionID);
                param[1] = new SqlParameter("@AcademicYearID", AcademicYearID);
                param[2] = new SqlParameter("@ExamMonthYearID", ExamMonthYearID);
                param[3] = new SqlParameter("@FeePaymentTypeID", FeePaymentTypeID);
                param[4] = new SqlParameter("@UserName", UserName);
                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_Get_PinListForHallticket", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("SP_Get_PinListForHallticket", 0, ex.Message);
                return ex.Message;
            }

        }

        [HttpGet, ActionName("GetCandidateHallticket")]
        public string GetCandidateHallticket(int AcademicYearID, int ExamMonthYearID, int StudentTypeID, int StudentID)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[4];
                param[0] = new SqlParameter("@AcademicYearID", AcademicYearID);
                param[1] = new SqlParameter("@ExamMonthYearID", ExamMonthYearID);
                param[2] = new SqlParameter("@StudentTypeID", StudentTypeID);
                param[3] = new SqlParameter("@StudentID", StudentID);
                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_Get_HallticketData", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("SP_Get_HallticketData", 0, ex.Message);
                return ex.Message;
            }

        }


        [HttpGet, ActionName("GetExamDates")]
        public string GetExamDates(int AcademicYearID, int ExamMonthYearID)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@AcademicYearID", AcademicYearID);
                param[1] = new SqlParameter("@ExamMonthYearID", ExamMonthYearID);
                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_Get_ExamDates", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("SP_Get_ExamDates", 0, ex.Message);
                return ex.Message;
            }

        }


        [HttpPost, ActionName("UploadResultFileJson")]
        public string UploadResultFileJson([FromBody] JsonObject json)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[4];
                param[0] = new SqlParameter("@AcademicYearID", json["AcademicYearID"]);
                param[1] = new SqlParameter("@ExamMonthYearID", json["ExamMonthYearID"]);
                param[2] = new SqlParameter("@Json", json["Json"].ToString());
                param[3] = new SqlParameter("@UserName", json["UserName"]);
                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_Upload_EndMarks", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("SP_Upload_EndMarks", 0, ex.Message);
                return ex.Message;
            }

        }

        public class person
        {
            public string file { get; set; }
            public string ResponceCode { get; set; }
            public string ResponceDescription { get; set; }
        }

        [HttpGet, ActionName("GenerateNrData")]
        public string GenerateNrData(int AcademicYearID,int ExamMonthYearID,string UserName)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@AcademicYearID", AcademicYearID);
                param[1] = new SqlParameter("@ExamMonthYearID", ExamMonthYearID);
                param[2] = new SqlParameter("@UserName", UserName);
                DataSet ds = dbHandler.ReturnDataWithStoredProcedure("SP_Set_ResultNR", param);
                if (ds.Tables[0].Rows[0]["ResponceCode"].ToString() == "200")
                {
                    var ExamMonthYear = ds.Tables[1].Rows[0]["ExamMonthYear"].ToString();

                    var filename = ExamMonthYear + '_' + "CCIC" + '_' + "GenerateNrData" + ".xlsx";
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

                dbHandler.SaveErorr("SP_Set_ResultNR", 0, ex.Message);
                return ex.Message;
            }

        }


        [HttpGet, ActionName("PostMarks")]
        public string PostMarks(int AcademicYearID, int ExamMonthYearID, string UserName)
        {
            try
            {

                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@AcademicYearID", AcademicYearID);
                param[1] = new SqlParameter("@ExamMonthYearID", ExamMonthYearID);
                param[2] = new SqlParameter("@UserName", UserName);
                DataSet ds = dbHandler.ReturnDataWithStoredProcedure("SP_SET_MarksPostingForResultsProcessing", param);
                return JsonConvert.SerializeObject(ds);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("SP_SET_MarksPostingForResultsProcessing", 0, ex.Message);
                return ex.Message;
            }

        }


        [HttpGet, ActionName("GenerateWantings")]
        public string GenerateWantings(int AcademicYearID, int ExamMonthYearID, string UserName)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@AcademicYearID", AcademicYearID);
                param[1] = new SqlParameter("@ExamMonthYearID", ExamMonthYearID);
                param[2] = new SqlParameter("@UserName", UserName);
                DataSet dt = dbHandler.ReturnDataWithStoredProcedure("SP_GET_ResultWantings", param);
                if (dt.Tables[0].Rows[0]["ResponceCode"].ToString() == "200")
                {
                    var ExamMonthYear = dt.Tables[1].Rows[0]["ExamMonthYear"].ToString();
                    var filename = ExamMonthYear + '_' + "CCIC" + '_' + "Wantings" + ".xlsx";
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

                dbHandler.SaveErorr("SP_GET_ResultWantings ", 0, ex.Message);
                return ex.Message;
            }

        }


        [HttpPost, ActionName("UploadWantingsJson")]
        public string UploadWantingsJson([FromBody] JsonObject json)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[4];
                param[0] = new SqlParameter("@AcademicYearID", json["AcademicYearID"]);
                param[1] = new SqlParameter("@ExamMonthYearID", json["ExamMonthYearID"]);
                param[2] = new SqlParameter("@Json", json["Json"].ToString());
                param[3] = new SqlParameter("@UserName", json["UserName"]);
                var dt = dbHandler.ReturnDataWithStoredProcedure("ResultsAutomationWantingsUpdations", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("ResultsAutomationWantingsUpdations", 0, ex.Message);
                return ex.Message;
            }

        }



        [HttpGet, ActionName("ResultsProcessing")]
        public string ResultsProcessing(int AcademicYearID, int ExamMonthYearID, string UserName)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@AcademicYearID", AcademicYearID);
                param[1] = new SqlParameter("@ExamMonthYearID", ExamMonthYearID);
                param[2] = new SqlParameter("@UserName", UserName);
                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_SET_ResultGeneration", param);
                if (dt.Tables[0].Rows[0]["ResponceCode"].ToString() == "200")
                {
                    var ExamMonthYear = dt.Tables[1].Rows[0]["ExamMonthYear"].ToString();
                    var filename = ExamMonthYear + '_' + "CCIC" + '_' + "Results" + ".xlsx";
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

                dbHandler.SaveErorr("SP_SET_ResultGeneration ", 0, ex.Message);
                return ex.Message;
            }

        }


        [HttpGet, ActionName("ResultsLogicReports")]
        public string ResultsLogicReports(int AcademicYearID, int ExamMonthYearID, string UserName)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@AcademicYearID", AcademicYearID);
                param[1] = new SqlParameter("@ExamMonthYearID", ExamMonthYearID);
                param[2] = new SqlParameter("@UserName", UserName);
                var dt = dbHandler.ReturnDataWithStoredProcedure("ResultsLogicReports ", param);
                if (dt.Tables[0].Rows[0]["ResponceCode"].ToString() == "200")
                {
                    var ExamMonthYear = dt.Tables[1].Rows[0]["ExamMonthYear"].ToString();
                    var filename = ExamMonthYear + '_' + "CCIC" + '_' + "ResultsLogicReports" + ".xlsx";

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

                dbHandler.SaveErorr("ResultsLogicReports ", 0, ex.Message);
                return ex.Message;
            }

        }

        public HttpResponseMessage GetCcicEducationQualifications()
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                string StrQuery = "";
                StrQuery = "exec SP_Get_EducationQualifications";
                return Request.CreateResponse(HttpStatusCode.OK, dbHandler.ReturnDataWithStoredProcedureTable(StrQuery));
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("SP_Get_EducationQualifications", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }



        public class CourseInfo
        {
            public int DataTypeId { get; set; }
            public int CourseID { get; set; }
            public string Scheme { get; set; }
            public string CourseCode { get; set; }
            public string CourseName { get; set; }
            public string CourseDuration { get; set; }
            public string CourseQualification { get; set; }
            public bool Active { get; set; }
            public string UserName { get; set; }


        }



        [HttpPost, ActionName("AddorUpdateCourses")]
        public string AddorUpdateCourses([FromBody] CourseInfo data)
        {
            var dbHandler = new ccicdbHandler();
            try
            {
                var param = new SqlParameter[8];
                param[0] = new SqlParameter("@DataTypeId", data.DataTypeId);
                param[1] = new SqlParameter("@CourseID", data.CourseID);
                param[2] = new SqlParameter("@Scheme", data.Scheme);
                param[3] = new SqlParameter("@CourseCode", data.CourseCode);
                param[4] = new SqlParameter("@CourseName", data.CourseName);
                param[5] = new SqlParameter("@CourseDuration", data.CourseDuration);
                param[6] = new SqlParameter("@Active", data.Active);
                param[7] = new SqlParameter("@UserName", data.UserName);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Add_Update_Courses", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                ccicdbHandler.SaveErorr("SP_Add_Update_Courses", 0, ex.Message);
                return ex.Message;
            }
        }



        [HttpPost, ActionName("GetorActiveorUpdateCourses")]
        public string GetorActiveorUpdateCourses([FromBody] CourseInfo data)
        {
            var dbHandler = new ccicdbHandler();
            try
            {
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@DataTypeId", data.DataTypeId);
                param[1] = new SqlParameter("@CourseID", data.CourseID);
                param[2] = new SqlParameter("@Active", data.Active);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Get_Edit_Courses", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                ccicdbHandler.SaveErorr("SP_Get_Edit_Courses", 0, ex.Message);
                return ex.Message;
            }
        }

        [HttpGet, ActionName("GetNRStudentDetails")]
        public string GetNRStudentDetails(int AcademicYearID,int ExamMonthYearID)
        {

            List<person> p = new List<person>();
            person p1 = new person();
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@AcademicYearID", AcademicYearID);
                param[1] = new SqlParameter("@ExamMonthYearID", ExamMonthYearID);
                DataSet ds = dbHandler.ReturnDataWithStoredProcedure("SP_GET_PrinterNRData", param);
                var filename = "PrinterNR" + ".xlsx";
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









    }

}
