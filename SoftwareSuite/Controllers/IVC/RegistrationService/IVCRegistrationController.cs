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
using System.Drawing.Imaging;
using System.Threading.Tasks;
using SoftwareSuite.Controllers.Common;
using System.Net.Http;
using SoftwareSuite.BLL;
using SoftwareSuite.Models.Security;
using System.Configuration;

namespace SoftwareSuite.Controllers.IVC
{
    public class IVCRegistrationController : ApiController
    {



        [HttpPost, ActionName("SendMobileOTP")]
        public async Task<HttpResponseMessage> SendMobileOTP([FromBody] SendSmsInfo data)
        {
            var dbHandler = new ivcdbHandler();
            try
            {
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@CandidateMobile", data.CandidateMobile);
                param[1] = new SqlParameter("@CandidateName", data.CandidateName);
                DataSet dt = dbHandler.ReturnDataWithStoredProcedure("SP_Get_RegistrationMobileOTP", param);
                if (dt.Tables[0].Rows[0]["StatusCode"].ToString() == "200")
                {
                    var com = new CommunicationController();
                    var msg = dt.Tables[1].Rows[0]["MobileOTP"].ToString() + " is your otp for validating your Mobile no on " + data.CandidateMobile.ToString().Substring(0, 2) + "xxxxx" + data.CandidateMobile.ToString().Substring(6, 4) + ", SBTET TS";
                    var test = await com.SendSms(data.CandidateMobile.ToString(), msg, "1007161770830309481");

                    HttpResponseMessage HttpResponse = Request.CreateResponse(HttpStatusCode.OK, dt.Tables[0].DataTableToList<HttpResponse>());
                    return HttpResponse;
                }
                else
                {

                    HttpResponseMessage HttpResponse = Request.CreateResponse(HttpStatusCode.OK, dt.Tables[0].DataTableToList<HttpResponse>());
                    return HttpResponse;
                }

            }
            catch (Exception ex)
            {
                ivcdbHandler.SaveErorr("SP_Get_RegistrationMobileOTP", 0, ex.Message);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, ex.Message);
                return response;
            }
        }

        [HttpPost, ActionName("VerifyMobileOtp")]
        public HttpResponseMessage VerifyMobileOtp([FromBody] VerifySmsInfo data)
        {
            var dbHandler = new ivcdbHandler();
            try
            {
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@CandidateMobile", data.CandidateMobile);
                param[1] = new SqlParameter("@CandidateName", data.CandidateName);
                param[2] = new SqlParameter("@MobileOTP", data.MobileOTP);
                DataTable dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Verify_RegistrationMobileOTP", param);
                List<HttpResponse> Resp = dt.DataTableToList<HttpResponse>();
                HttpResponseMessage HttpResponse = Request.CreateResponse(HttpStatusCode.OK, Resp);
                return HttpResponse;

            }
            catch (Exception ex)
            {
                ivcdbHandler.SaveErorr("SP_Verify_RegistrationMobileOTP", 0, ex.Message);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, ex.Message);
                return response;
            }
        }

        public class StdDetails
        {
            public string StudentName { get; set; }
            public string RegistrationMobile { get; set; }
            public string RegistrationEmail { get; set; }
            public string RegistrationPassword { get; set; }
            public bool encrypted { get; set; }
        }

        [HttpPost, ActionName("StdRegistration")]
        public async Task<HttpResponseMessage> StdRegistration([FromBody] StdDetails data)
        {
            var dbHandler = new ivcdbHandler();
            try
            {

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK);
                string encriptedpassword = "";

                var res = data.RegistrationPassword.Split(new string[] { "$$@@$$" }, StringSplitOptions.None);
                var crypt = new HbCrypt(res[1]);
                var passencrypt = new HbCrypt();
                string password = crypt.AesDecrypt(res[0]);
                string decryptpassword = passencrypt.AesDecrypt(password);
                encriptedpassword = passencrypt.Encrypt(decryptpassword);


                var param = new SqlParameter[4];
                param[0] = new SqlParameter("@StudentName", data.StudentName);
                param[1] = new SqlParameter("@RegistrationMobile", data.RegistrationMobile);
                param[2] = new SqlParameter("@RegistrationEmail", data.RegistrationEmail);
                param[3] = new SqlParameter("@RegistrationPassword", encriptedpassword);
                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_Set_Registration", param);
                string Password = "";
                if (dt.Tables[0].Rows[0]["StatusCode"].ToString() == "200")
                {
                    string RegistrationPassword = Convert.ToString(dt.Tables[1].Rows[0]["RegistrationPassword"]);
                    var passcrypt = new HbCrypt();
                    Password = passcrypt.Decrypt(RegistrationPassword);
                    string RegistrationNumber = dt.Tables[1].Rows[0]["RegistrationNumber"].ToString();

                    string RegistrationMobile = dt.Tables[1].Rows[0]["RegistrationMobile"].ToString();

                    string url = ConfigurationManager.AppSettings["SMS_API"].ToString();
                    var temptateid = "1007166857328053980";
                    var msg = RegistrationNumber + " is Your provisional registration No for POLYCET 2023 and " + Password + " password. Login and complete Application, SBTET TS";
                    CommunicationController com = new CommunicationController();
                    com.SendSms(RegistrationMobile, msg, temptateid);
                    dt.Tables[1].Rows[0]["RegistrationPassword"] = Password;
                    response = Request.CreateResponse(HttpStatusCode.OK, dt);

                }
                
                else
                {
                    response = Request.CreateResponse(HttpStatusCode.OK, dt);
                }


                return response;
            }
            catch (Exception ex)
            {
                ivcdbHandler.SaveErorr(" SP_Set_Registration", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpGet, ActionName("GetCategories")]
        public string GetCategories()
        {
            var dbHandler = new ivcdbHandler();
            try
            {
                string StrQuery = "";
                StrQuery = "exec SP_Get_CasteCategories";
                var res = dbHandler.ReturnDataSet(StrQuery);
                return JsonConvert.SerializeObject(res);
            }
            catch (Exception ex)
            {

                ivcdbHandler.SaveErorr("SP_Get_CasteCategories", 0, ex.Message);
                throw ex;
            }
        }


        [HttpGet, ActionName("GetRegions")]
        public string GetRegions()
        {
            var dbHandler = new ivcdbHandler();
            try
            {
                string StrQuery = "";
                StrQuery = "exec SP_Get_Regions";
                var res = dbHandler.ReturnDataSet(StrQuery);
                return JsonConvert.SerializeObject(res);
            }
            catch (Exception ex)
            {

                ivcdbHandler.SaveErorr("SP_Get_Regions", 0, ex.Message);
                throw ex;
            }
        }




        [HttpGet, ActionName("GetMinorities")]
        public string GetMinorities()
        {
            var dbHandler = new ivcdbHandler();
            try
            {
                string StrQuery = "";
                StrQuery = "exec SP_Get_Minorities";
                var res = dbHandler.ReturnDataSet(StrQuery);
                return JsonConvert.SerializeObject(res);
            }
            catch (Exception ex)
            {

                ivcdbHandler.SaveErorr("SP_Get_Minorities", 0, ex.Message);
                throw ex;
            }
        }



    }
}
