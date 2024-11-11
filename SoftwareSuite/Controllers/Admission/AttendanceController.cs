using System.Data;
using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Configuration;
using System.Xml;
using System.Data.SqlClient;
using System.Threading.Tasks;
using Newtonsoft.Json;
using System.Linq;
using System.Web;
using System.Diagnostics;
using Newtonsoft.Json.Linq;
using System.Web.Script.Serialization;
using RestSharp;
using SoftwareSuite.Models.Database;
using SoftwareSuite.Models.Admission;
using SoftwareSuite.Services.Admission;
using SoftwareSuite.Controllers.Common;

namespace SoftwareSuite.Controllers.Admission
{
    public class PostAttData
    {

        public string AttendeeId { get; set; }
        public string Date { get; set; }
        public string Status { get; set; }


    }
    public class PostAttUpdateData
    {
        public string Remarks { get; set; }
        public int UserId { get; set; }
        public List<PostAttData> attData { get; set; }
    }
    public class PhoneMessageData
    {
        public string Mobile { get; set; }
        public string Message { get; set; }
    }
    public class AttendanceController : ApiController
    {

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

        #region Post Methods
        [HttpPost, ActionName("SendAttendance")]
        public HttpResponseMessage SendAttendance(HttpRequestMessage request)
        {
            try
            {

                var apikey = request.Headers.GetValues("apikey").FirstOrDefault();
                var apikeyOrig = ConfigurationManager.AppSettings["AttendanceSharingApiKey"].ToString();
                if (apikey != apikeyOrig)
                {
                    var response = Request.CreateResponse(HttpStatusCode.Forbidden);
                    response.Content = new StringContent(JsonConvert.SerializeObject("{\"respcode\":\"403\",\"respdesc\" = \"Invalid Api Key\"\" }"), System.Text.Encoding.UTF8, "application/json");
                    SendSms(1, 0, " Attendance is Unsuccessfully while Pushing into DataBase because respcode 403 , respdesc Invalid Api Key");
                    return response;
                }
            }
            catch (Exception)
            {
                SendSms(1, 0, " Attendance is Unsuccessfully while Pushing into DataBase because respcode 403 , respdesc Invalid Api Key");
                var response = Request.CreateResponse(HttpStatusCode.Forbidden);
                response.Content = new StringContent(JsonConvert.SerializeObject("{\"respcode\":\"403\",\"respdesc\" = \"Invalid Api Key\"\" }"), System.Text.Encoding.UTF8, "application/json");
                return response;
            }
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
                        UpdateWorkingDays(optype);
                    }
                    catch (Exception ex) { }
                    if (dt.Rows.Count > 0)
                    {
                        int rescode = (int)dt.Rows[0][0];
                        string respdesc = (string)dt.Rows[0][1];
                        var response = Request.CreateResponse(HttpStatusCode.OK);
                        response.Content = new StringContent(JsonConvert.SerializeObject("{\"respcode\":\"" + rescode + "\",\"respdesc\" : \"" + respdesc + "\"\" }"), System.Text.Encoding.UTF8, "application/json");

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




        [HttpPost, ActionName("PostAttendance")]
        public HttpResponseMessage PostAttendance(HttpRequestMessage request)
        {
            try
            {

                var apikey = request.Headers.GetValues("apikey").FirstOrDefault();
                var apikeyOrig = ConfigurationManager.AppSettings["AttendanceSharingApiKey"].ToString();
                if (apikey != apikeyOrig)
                {
                    var response = Request.CreateResponse(HttpStatusCode.Forbidden);
                    response.Content = new StringContent(JsonConvert.SerializeObject("{\"respcode\":\"403\",\"respdesc\" = \"Invalid Api Key\"\" }"), System.Text.Encoding.UTF8, "application/json");
                    SendSms(1, 0, " Attendance is Unsuccessfully while Pushing into DataBase because respcode 403 , respdesc Invalid Api Key");
                    return response;
                }
            }
            catch (Exception)
            {
                SendSms(1, 0, " Attendance is Unsuccessfully while Pushing into DataBase because respcode 403 , respdesc Invalid Api Key");
                var response = Request.CreateResponse(HttpStatusCode.Forbidden);
                response.Content = new StringContent(JsonConvert.SerializeObject("{\"respcode\":\"403\",\"respdesc\" = \"Invalid Api Key\"\" }"), System.Text.Encoding.UTF8, "application/json");
                return response;
            }
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
                    DataSet dt = dbHandler.ReturnDataWithStoredProcedure("USP_SET_ATTENDENCE_API_INSERTION", param);
                    if (dt.Tables[0].Rows.Count > 0)
                    {
                        UpdateWorkingDays(optype);
                    }
                    else
                    {
                        var response = Request.CreateResponse(HttpStatusCode.InternalServerError);
                        response.Content = new StringContent(JsonConvert.SerializeObject("{\"respcode\":\"500\",\"respdesc\" : \"Server Error\"\" }"), System.Text.Encoding.UTF8, "application/json");
                        SendSms(1, 0, " Attendance is Unsuccessfully while Pushing into DataBase Because respcode : 500, respdesc: Server Error");
                        return response;
                    }
                        try
                    {
                        UpdateWorkingDays(optype);
                    }
                    catch (Exception ex) { }
                    if (dt.Tables[0].Rows.Count > 0)
                    {
                        int rescode = (int)dt.Tables[0].Rows[0][0];
                        string respdesc = (string)dt.Tables[0].Rows[0][1];
                        var response = Request.CreateResponse(HttpStatusCode.OK);
                        response.Content = new StringContent(JsonConvert.SerializeObject("{\"respcode\":\"" + rescode + "\",\"respdesc\" : \"" + respdesc + "\"\" }"), System.Text.Encoding.UTF8, "application/json");

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


        private string SendSms(string mobile, string message)
        {
            try
            {
                var url = ConfigurationManager.AppSettings["SMS_URL"].ToString();
                var smsusername = ConfigurationManager.AppSettings["SMS_Service_Username"].ToString();
                var smspassword = ConfigurationManager.AppSettings["SMS_Service_Password"].ToString();
                // var url = "http://smsgw.sms.gov.in/failsafe/HttpLink";
                var client = new RestClient();
                var req = new RestRequest(url);
                req.Method = Method.GET;
                req.AddQueryParameter("username", smsusername);
                req.AddQueryParameter("Pin", smspassword);
                req.AddQueryParameter("mnumber", $"91{mobile}");
                req.AddQueryParameter("message", message);
                req.AddQueryParameter("signature", "TSGOVT");
                var res = client.Get(req);
                return res.Content;
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }

        [HttpPost, ActionName("UpdateStudentAttendance")]
        public string UpdateStudentAttendance([FromBody] PostAttUpdateData UpDAttData)
        {
            try
            {
                string clientIpAddress = System.Web.HttpContext.Current.Request.UserHostAddress;
                var PostAttData = new List<PostAttData>();
                int size = UpDAttData.attData.Count;
                for (int i = 0; i < size; i++)
                {
                    PostAttData.Add(UpDAttData.attData[i]);
                }

                Debug.WriteLine("Attendance Updation before Conv to json: " + PostAttData);
                var json = new JavaScriptSerializer().Serialize(PostAttData);
                Debug.WriteLine("Attendance Updation json: " + json);
                var dbHandler = new dbHandler();
                var param = new SqlParameter[4];
                param[0] = new SqlParameter("@UserId", UpDAttData.UserId);
                param[1] = new SqlParameter("@IpAddress", clientIpAddress);
                param[2] = new SqlParameter("@Json", json);
                param[3] = new SqlParameter("@Remarks", UpDAttData.Remarks);
                var res = dbHandler.ReturnDataWithStoredProcedureTable("USP_SET_StudentAttendenceUpdation", param);// USP_SET_StudentAttendenceModification_1
                return JsonConvert.SerializeObject(res);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_SET_StudentAttendenceModification", 0, ex.Message);
                return ex.Message;
            }
        }


        #endregion



       

        #region Get Methods

        [HttpGet, ActionName("GetAttendenceDataByCollege")]
        public HttpResponseMessage GetAttendenceDataByCollege(string CollegeId, int AcademicId)
        {
            HttpResponseMessage response = new HttpResponseMessage();
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@collegecode", CollegeId);
                param[1] = new SqlParameter("@AcademicYearId", AcademicId);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("get_attendence_stats", param);
                response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("get_attendence_stats", 0, ex.Message);
                response = Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
                return response;
            }

        }

        [HttpGet, ActionName("GetAttendenceDataByBranch")]
        public HttpResponseMessage GetAttendenceDataByBranch(string CollegeId, int AcademicId, string branch)
        {

            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@collegecode", CollegeId);
                param[1] = new SqlParameter("@AcademicYearId", AcademicId);
                param[2] = new SqlParameter("@branchcode ", branch);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("get_attendence_stats_bwise", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("get_attendence_stats_bwise", 0, ex.Message);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
                return response;
            }

        }

        [HttpGet, ActionName("GetAttendenceDataByBranchWise")]
        public HttpResponseMessage GetAttendenceDataByBranchWise(string CollegeId, string Scheme, int semester, string Branch, int percentage, int AcademicId)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[6];
                param[0] = new SqlParameter("@collegecode", CollegeId);
                param[1] = new SqlParameter("@scheme", Scheme);
                param[2] = new SqlParameter("@semid", semester);
                param[3] = new SqlParameter("@Branch", Branch);
                param[4] = new SqlParameter("@AcademicYearId", AcademicId);
                param[5] = new SqlParameter("@p", percentage);
                var dt = dbHandler.ReturnDataWithStoredProcedure("get_attendence_stats_pinlist", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("get_attendence_stats_pinlist", 0, ex.Message);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
                return response;
            }
        }
        [HttpGet, ActionName("GetAttendenceDataPinWise")]
        public HttpResponseMessage GetAttendenceDataPinWise(string Pin)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@pin", Pin);
                var dt = dbHandler.ReturnDataWithStoredProcedure("get_attendence_stats_pin", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("get_attendence_stats_pin", 0, ex.Message);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
                return response;
            }
        }
        [HttpGet, ActionName("getAdminAttendanceReports")]
        public HttpResponseMessage getAdminAttendanceReports()

        {
            try
            {
                var dbHandler = new dbHandler();
                string StrQuery = "";
                StrQuery = "exec USP_GET_Attendence_AdminReports";
                return Request.CreateResponse(HttpStatusCode.OK, dbHandler.ReturnDataSet(StrQuery));
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_GET_Attendence_AdminReports", 0, ex.Message);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
                return response;
            }
        }

        #endregion


        [HttpGet, ActionName("UpdateWorkingDays")]
        public void UpdateWorkingDays(string optype)
        {

            try
            {
                var db = new dbHandler();
                string apistring = string.Empty;
                AbasWorkingDays d = new AbasWorkingDays();
                var clientUrl = ConfigurationManager.AppSettings["BMA_API_ROOT"];
                var client = new RestClient(clientUrl);
                //-----------getting Sem 1 working days--------------
                var sem1startdate = ConfigurationManager.AppSettings["Sem_1_startDate"];
                var semstartdatealldep = ConfigurationManager.AppSettings["All_Dep_startDate"];
                if(sem1startdate== semstartdatealldep) {
                var deptflag = 0;
             
                string apiparams = "/getworkingdays?groupid=1004&startdate={0}&flag={1}";
                apistring = string.Format(apiparams, sem1startdate, deptflag);
                var req3 = new RestRequest(apistring, Method.POST);
                req3.AddHeader("apikey", ConfigurationManager.AppSettings["BMA_API_Key"]);
                var data3 = client.Post<AbasWorkingDays>(req3).Data;
                var db3 = new dbHandler();
                    var sbtetdeptflag = 0;
                 var param3 = new SqlParameter[3];
                param3[0] = new SqlParameter("@data", SqlDbType.VarChar, -1);
                param3[0].Value = JsonConvert.SerializeObject(data3.orglist);
                param3[1] = new SqlParameter("@deptType", sbtetdeptflag);
                param3[2] = new SqlParameter("@startdate", sem1startdate);
                db3.ReturnDataWithStoredProcedure("usp_SaveAbasWorkingDays", param3);
                }
                else {

                    var deptflag = 0;
                    //string apistring = string.Empty;
                    string apiparams = "/getworkingdays?groupid=1004&startdate={0}&flag={1}";
                    apistring = string.Format(apiparams, sem1startdate, deptflag);
                    var req3 = new RestRequest(apistring, Method.POST);
                    req3.AddHeader("apikey", ConfigurationManager.AppSettings["BMA_API_Key"]);
                    var data3 = client.Post<AbasWorkingDays>(req3).Data;
                    var db3 = new dbHandler();
                    var  sbtetdeptflag = 2;
                    var param3 = new SqlParameter[3];
                    param3[0] = new SqlParameter("@data", SqlDbType.VarChar, -1);
                    param3[0].Value = JsonConvert.SerializeObject(data3.orglist);
                    param3[1] = new SqlParameter("@deptType", sbtetdeptflag);
                    param3[2] = new SqlParameter("@startdate", sem1startdate);
                    db3.ReturnDataWithStoredProcedure("usp_SaveAbasWorkingDays", param3);
                    //-----------getting all departments working days--------------

                    deptflag = 0;
                apistring = string.Empty;
                apiparams = "/getworkingdays?groupid=1004&startdate={0}&flag={1}";
                apistring = string.Format(apiparams, semstartdatealldep, deptflag);
                var req = new RestRequest(apistring, Method.POST);
                req.AddHeader("apikey", ConfigurationManager.AppSettings["BMA_API_Key"]);
                var data = client.Post<AbasWorkingDays>(req).Data;
                     sbtetdeptflag = 3;
                    var param = new SqlParameter[3];
                param[0] = new SqlParameter("@data", SqlDbType.VarChar, -1);
                param[0].Value = JsonConvert.SerializeObject(data.orglist);
                param[1] = new SqlParameter("@deptType", sbtetdeptflag);
                param[2] = new SqlParameter("@startdate", semstartdatealldep);
                db.ReturnDataWithStoredProcedure("usp_SaveAbasWorkingDays", param);
                }
                var semstartdatepharm1styear = ConfigurationManager.AppSettings["Pharm_1styearStartDate"];
                var semstartdatepharm2ndyear = ConfigurationManager.AppSettings["Pharm_2ndyearStartDate"];
                if (semstartdatepharm1styear == semstartdatepharm2ndyear)
                {
                    //-----------getting pharmacy 1st year college working days--------------            
                    var client1 = new RestClient(clientUrl);
                    string apiparams = "/getworkingdays?groupid=1004&startdate={0}&flag={1}";
                    var deptflag = 1;
                     apistring = string.Format(apiparams, semstartdatepharm1styear, deptflag);
                    var req1 = new RestRequest(apistring, Method.POST);
                    req1.AddHeader("apikey", ConfigurationManager.AppSettings["BMA_API_Key"]);
                    var data1 = client.Post<AbasWorkingDays>(req1).Data;
                    var db1 = new dbHandler();
                    var sbtetdeptflag = 1;
                    var param1 = new SqlParameter[3];
                    param1[0] = new SqlParameter("@data", SqlDbType.VarChar, -1);
                    param1[0].Value = JsonConvert.SerializeObject(data1.orglist);
                    param1[1] = new SqlParameter("@deptType", sbtetdeptflag);
                    param1[2] = new SqlParameter("@startdate", semstartdatepharm1styear);
                    db.ReturnDataWithStoredProcedure("usp_SaveAbasWorkingDays", param1);

                }
                else {
                    //-----------getting pharmacy 1st year college working days--------------            
                    var client1 = new RestClient(clientUrl);
                    string apiparams = "/getworkingdays?groupid=1004&startdate={0}&flag={1}";
                    var deptflag = 1;
                    apistring = string.Format(apiparams, semstartdatepharm1styear, deptflag);
                    var req1 = new RestRequest(apistring, Method.POST);
                    req1.AddHeader("apikey", ConfigurationManager.AppSettings["BMA_API_Key"]);
                    var data1 = client.Post<AbasWorkingDays>(req1).Data;
                    var db1 = new dbHandler();
                    var sbtetdeptflag = 5;
                    var param1 = new SqlParameter[3];
                    param1[0] = new SqlParameter("@data", SqlDbType.VarChar, -1);
                    param1[0].Value = JsonConvert.SerializeObject(data1.orglist);
                    param1[1] = new SqlParameter("@deptType", sbtetdeptflag);
                    param1[2] = new SqlParameter("@startdate", semstartdatepharm1styear);
                    db.ReturnDataWithStoredProcedure("usp_SaveAbasWorkingDays", param1);
                    //-----------getting pharmacy 2nd year college working days--------------             
                    var client2 = new RestClient(clientUrl);
                    // var semstartdatepharm2ndyear = ConfigurationManager.AppSettings["Pharm_2ndyearStartDate"];
                     apiparams = "/getworkingdays?groupid=1004&startdate={0}&flag={1}";
                    deptflag = 1;
                apistring = string.Format(apiparams, semstartdatepharm2ndyear, deptflag);
                var req2 = new RestRequest(apistring, Method.POST);
                req2.AddHeader("apikey", ConfigurationManager.AppSettings["BMA_API_Key"]);
                var data2 = client.Post<AbasWorkingDays>(req2).Data;
                    sbtetdeptflag = 6;
                var param2 = new SqlParameter[3];
                param2[0] = new SqlParameter("@data", SqlDbType.VarChar, -1);
                param2[0].Value = JsonConvert.SerializeObject(data2.orglist);
                param2[1] = new SqlParameter("@deptType", sbtetdeptflag);
                param2[2] = new SqlParameter("@startdate", semstartdatepharm2ndyear);
                db.ReturnDataWithStoredProcedure("usp_SaveAbasWorkingDays", param2);
                }

                //succuss message
                // SendSms(2, 1, " Updated Working Days Successfully Pushed into DataBase");

                //******** For Attendance Calculation Part**********///////////

                //try
                //{
                //    var response = Request.CreateResponse(HttpStatusCode.NotAcceptable);
                //    if (optype == "1") { 
                //        ProcessAttendanceDisplay();
                //    }
                //}
                //catch (Exception ex) { }
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


        [HttpGet, ActionName("GetAttendeeStatus")]
        public string GetAttendeeStatus(string attendeeId)
        {
            try
            {
                ServicePointManager.Expect100Continue = true;
                ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;
                var clientUrl = ConfigurationManager.AppSettings["BMA_API_ROOT"];
                var client = new RestClient(clientUrl);
                string apiparams = "/getstatus?attendeeid=" + attendeeId;
                var req = new RestRequest(apiparams, Method.POST);
                req.AddHeader("apikey", ConfigurationManager.AppSettings["BMA_API_Key"]);
                var data = client.Post(req);
                return JsonConvert.SerializeObject(data);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpGet, ActionName("GetAttendanceDataByDate")]
        public string GetAttendanceDataByDateAsync(string date)
        {
            try
            {
                ServicePointManager.Expect100Continue = true;
                ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;
                var clientUrl = ConfigurationManager.AppSettings["BMA_API_ROOT"];
                var client = new RestClient(clientUrl);
                string apiparams = "/getAttendance?date=" + date;
                var req = new RestRequest(apiparams, Method.GET);
                req.AddHeader("apikey", ConfigurationManager.AppSettings["BMA_API_Key"]);
                var data = client.Get(req);
                return JsonConvert.SerializeObject(data);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }


        [HttpGet, ActionName("ActivateAttendeeStatus")]
        public string ActivateAttendeeStatus(string attendeeId)
        {
            try
            {
                var clientUrl = ConfigurationManager.AppSettings["BMA_API_ROOT"];
                var client = new RestClient(clientUrl);
                string apiparams = "/activate?attendeeid=" + attendeeId;
                var req = new RestRequest(apiparams, Method.POST);
                req.AddHeader("apikey", ConfigurationManager.AppSettings["BMA_API_Key"]);
                var data = client.Post(req);
                return JsonConvert.SerializeObject(data);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
    }
}
