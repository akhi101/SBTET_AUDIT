
using System;
using System.Collections.Generic;
using System.Linq;
using System.Diagnostics;
using System.Web;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Data.SqlClient;
using Newtonsoft.Json;
using System.Configuration;
using System.Xml;
using System.Threading.Tasks;
using System.IO;
using SoftwareSuite.Models.Database;
using System.Web.Script.Serialization;
using Newtonsoft.Json.Linq;
using System.Data;
using SoftwareSuite.Models.Academic;
using SoftwareSuite.Controllers.Common;
using RestSharp;
using System.Web.Http.Results;
//using System.Web.Mvc;

namespace SoftwareSuite.Controllers.Academic
{
    public class ElectiveStudentList
    {
        public int studentid { get; set; }
        public int subid { get; set; }

    }
    public class facultySubjectdata
    {
        public int subjectId { get; set; }
        public int staffId { get; set; }
    }

    public class facultySubjectMappingData
    {
        public string collegeCode { get; set; }
        public int branchid { get; set; }
        public List<facultySubjectdata> facultysubjectmapping { get; set; }
    }

    public class AcademicController : BaseController
    {
        private string countryCode;
        #region Get Methods
        [HttpGet, ActionName("GetElectiveSubjects")]
        public string GetElectiveSubjects(int semId, int schemeId, int branchId, string collegeCode, int AcademicYearID, int SessionID)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[6];
                param[0] = new SqlParameter("@semid", semId);
                param[1] = new SqlParameter("@schemeid", schemeId);
                param[2] = new SqlParameter("@branchid", branchId);
                param[3] = new SqlParameter("@collegeCode", collegeCode);
                param[4] = new SqlParameter("@AcademicYearID", AcademicYearID);
                param[5] = new SqlParameter("@SessionID", SessionID);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_ACC_ELECTIVES", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)

            {
                return ex.Message;
            }
        }

        [HttpGet, ActionName("getAlphaStudentsList")]
        public string getAlphaStudentsList(int SchemeId, int SemId, string CollegeCode, string BranchCode)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[4];
                param[0] = new SqlParameter("@SchemeId", SchemeId);
                param[1] = new SqlParameter("@SemId", SemId);
                param[2] = new SqlParameter("@CollegeCode", CollegeCode);
                param[3] = new SqlParameter("@BranchCode", BranchCode);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("USP_GET_StudentListForAlpla", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
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

        [HttpGet, ActionName("GetAttendance")]
        public string GetAttendance(string attandance, int isAdmin)
        {
            try
            {
                CommunicationController communicationController = new CommunicationController();
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@p", attandance);
                var dataSet = dbHandler.ReturnDataWithStoredProcedure("USP_Attendance_GET_PhoneNumberForSms", param);
                if (dataSet.Tables.Count > 1)
                {
                    return (dataSet.Tables[1].Rows[0]["Message"]).ToString();
                }
                var dt = dataSet.Tables[0];
                //var finalJosnPinNumberString = string.Empty;
                if (dt.Rows.Count > 0)
                {
                    //JsonArray finalPinContactsJson = new JsonArray();
                    //List<string> PincontactList = new List<string>();
                    //int c = 0;
                    foreach (DataRow dr in dt.Rows)
                    {
                        //PincontactList.Add(Convert.ToString(dr["Pin"])+" - "+ Convert.ToString(dr["Contact"]));
                        communicationController.SendSms(dr["Contact"].ToString(), dr["Message"].ToString(), "");

                        //c++;
                        //if (c >= 2)
                        //{
                        //    break;
                        //}
                    }
                    //finalPinContactsJson = JsonConvert.DeserializeObject<JsonArray>(JsonConvert.SerializeObject(PincontactList));
                    //finalJosnPinNumberString = JsonConvert.SerializeObject(finalPinContactsJson);
                }


                var dbHandler1 = new dbHandler();
                var param1 = new SqlParameter[4];
                param1[0] = new SqlParameter("@Type", "AttendanceCriteriaBased");
                //param1[1] = new SqlParameter("@PinContact", finalJosnPinNumberString);
                param1[1] = new SqlParameter("@Count", dt.Rows.Count);
                param1[2] = new SqlParameter("@Attendance", attandance);
                param1[3] = new SqlParameter("@IsAdmin", isAdmin);

                dbHandler1.ExecuteNonQueryWithStoredProcedure("USP_Attendance_SET_CriteriaBased_SMSLog", param1);

                return "200";

                //smsType = AttendanceCriteriaBased
                //finalJosnPinNumberString
                //dt.Rows.Count
                //attandance
                //isAdmin






                //return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_Attendance_GET_PhoneNumberForSms", 0, ex.Message);
                return ex.Message;
            }
        }

        [HttpGet, ActionName("getAttendanceReport")]
        public string getAttendanceReport(string Pin)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@Pin", Pin);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_Attendance_GET_PercentageByPin100", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpGet, ActionName("getAcademicSemByScheme")]
        public string getAcademicSemByScheme(int SchemeId)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@SchemeId", SchemeId);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("USP_Academic_GET_SemestersByScheme", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("USP_Academic_GET_SemestersByScheme", 0, ex.Message);
                return ex.Message;
            }

        }



        [HttpGet, ActionName("GetElectiveSubjectPinList")]
        public string GetElectiveSubjectPinList(int subId, int semId, string CollegeCode, string branchCode)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[4];
                param[0] = new SqlParameter("@subid", subId);
                param[1] = new SqlParameter("@semid", semId);
                param[2] = new SqlParameter("@collegecode", CollegeCode);
                param[3] = new SqlParameter("@branchcode", branchCode);

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("USP_GET_Elective_Pins", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }



        [HttpGet, ActionName("GetCollegeList")]
        public async Task<string> GetCollegeList()
        {
            var url = ConfigurationManager.AppSettings["AFF_CollegesList"].ToString();
            var affliationyr = ConfigurationManager.AppSettings["AFF_YR"].ToString();
            var urlwithparam = url + '/' + affliationyr;
            string data = string.Empty;
            using (HttpClient client = new HttpClient())
            {
                try
                {
                    var response = new HttpResponseMessage();
                    var resMsg = await client.GetAsync(urlwithparam);
                    var content = await resMsg.Content.ReadAsStringAsync();
                    var PIDResponseXML = new XmlDocument();
                    PIDResponseXML.LoadXml(content);
                    var jsonData = JsonConvert.SerializeXmlNode(PIDResponseXML, Newtonsoft.Json.Formatting.None, true);
                    var rmStr = "\"?xml\":{\"@version\":\"1.0\",\"@encoding\":\"UTF-8\",\"@standalone\":\"yes\"}\"GeneralDeailsBeanWs\":";
                    jsonData = jsonData.TrimStart(rmStr.ToCharArray());
                    jsonData = jsonData.TrimEnd(new char[] { '}' });
                    var dbHandler = new dbHandler();
                    var param = new SqlParameter[1];
                    param[0] = new SqlParameter("@Json ", jsonData);
                    var dt = dbHandler.ReturnDataWithStoredProcedureTable("USP_Affiliation_SET_Colleges", param);
                    return "Data Inserted in Table";

                }
                catch (Exception ex)
                {
                    // var response = Request.CreateResponse(HttpStatusCode.NotFound);
                    //  response.Content = new StringContent(JsonConvert.SerializeObject("{\"Status\" : \"404\",\"Response\" : \"" + ex + "\" }"), System.Text.Encoding.UTF8, "application/json");
                    return ex.Message;

                }

            }
        }

        [HttpGet, ActionName("GetCollegeInfo")]
        public async Task<string> GetCollegeInfo()
        {
            var url = ConfigurationManager.AppSettings["AFF_College_Branch_Info"].ToString();
            var affliationyr = ConfigurationManager.AppSettings["AFF_YR"].ToString();
            var urlwithparam = url + '/' + affliationyr;
            string data = string.Empty;
            using (HttpClient client = new HttpClient())
            {
                try
                {
                    var response = new HttpResponseMessage();
                    var resMsg = await client.GetAsync(urlwithparam);
                    var content = await resMsg.Content.ReadAsStringAsync();
                    JObject obj = JObject.Parse(content);
                    JArray dataarray = obj["collegeActiveSectionsVo"].Value<JArray>();
                    var affjson = JsonConvert.SerializeObject(dataarray);
                    var dbHandler = new dbHandler();
                    var param = new SqlParameter[1];
                    param[0] = new SqlParameter("@Json ", affjson);
                    var dt = dbHandler.ReturnDataWithStoredProcedureTable("USP_Affiliation_SET_CollegeBranch", param);
                    return "Data Inserted in Table";

                }
                catch (Exception ex)
                {
                    // var response = Request.CreateResponse(HttpStatusCode.NotFound);
                    //  response.Content = new StringContent(JsonConvert.SerializeObject("{\"Status\" : \"404\",\"Response\" : \"" + ex + "\" }"), System.Text.Encoding.UTF8, "application/json");
                    return ex.Message;

                }

            }
        }


        [HttpGet, ActionName("GetBranchList")]
        public string GetBranchList(string @CollegeCode)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@CollegeCode", CollegeCode);

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("ADM_GET_BRANCHLIST", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("ADM_GET_BRANCHLIST", 0, ex.Message);
                throw ex;
            }
        }

        [HttpGet, ActionName("AFFCollegeTecHStaffInfo")]
        public async Task<string> AFFCollegeTecHStaffInfo()
        {
            var url = ConfigurationManager.AppSettings["AFF_College_TecH_Staff_Info"].ToString();
            var urlwithparam = url;
            string data = string.Empty;
            using (HttpClient client = new HttpClient())
            {
                try
                {
                    var response = new HttpResponseMessage();
                    var resMsg = await client.GetAsync(urlwithparam);
                    var content = await resMsg.Content.ReadAsStringAsync();
                    JObject obj = JObject.Parse(content);
                    JArray dataarray = obj["teachingStaffWs"].Value<JArray>();
                    var affjson = JsonConvert.SerializeObject(dataarray);
                    var dbHandler = new dbHandler();
                    var param = new SqlParameter[1];
                    param[0] = new SqlParameter("@Json ", affjson);
                    var dt = dbHandler.ReturnDataWithStoredProcedureTable("USP_Affiliation_SET_CollegeBranchStaff", param);
                    return "Data Inserted in Table";

                }
                catch (Exception ex)
                {
                    // var response = Request.CreateResponse(HttpStatusCode.NotFound);
                    //  response.Content = new StringContent(JsonConvert.SerializeObject("{\"Status\" : \"404\",\"Response\" : \"" + ex + "\" }"), System.Text.Encoding.UTF8, "application/json");
                    return ex.Message;

                }

            }
        }


        [HttpGet, ActionName("AttendenceDisplay")]
        public string AttendenceDisplay()
        {
            Debug.WriteLine("Job hits to AttendenceDisplay");
            try
            {
                var dbHandler = new dbHandler();
                string StrQuery = "";
                StrQuery = "exec USP_SET_PresemptiveAttendence";
                var res = dbHandler.ReturnDataSet(StrQuery);
                return "";
            }
            catch (Exception ex)
            {
                return "";
            }
        }

        [HttpGet, ActionName("PresemptiveAttendence")]
        public string PresemptiveAttendence()
        {
            Debug.WriteLine("Job hits to PresemptiveAttendence");
            try
            {
                var dbHandler = new dbHandler();
                string StrQuery = "";
                StrQuery = "exec USP_SET_AttendenceDisplay";
                var res = dbHandler.ReturnDataSet(StrQuery);
                return "";
            }
            catch (Exception ex)
            {
                return "";
            }
        }

        public class Attendance
        {
            public string Attdid { get; set; }
            public string AttdCode { get; set; }
            public string Date { get; set; }
            public string NewAttdStatus { get; set; }
            public string Reason { get; set; }
        }

        [HttpPost, ActionName("AttendanceUpdate")]
        public String AttendanceUpdate([FromBody] List<Attendance> attendance)
        {
            try
            {

                var ToUpdateAttendaceDataList = new List<Attendance>();
                int size = attendance.Count;
                for (int i = 0; i < size; i++)
                {
                    ToUpdateAttendaceDataList.Add(attendance[i]);
                }
                var json = new JavaScriptSerializer().Serialize(ToUpdateAttendaceDataList);
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@json", json);
                var res = dbHandler.ReturnDataWithStoredProcedureTable("ADM_SFP_SET_AttendanceUpdate", param);
                return null;
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }





        [HttpGet, ActionName("GetHoursForAttendence")]
        public int GetHoursForAttendence()
        {
            try
            {
                var dbHandler = new dbHandler();
                string StrQuery = "";
                StrQuery = "exec USP_GET_GETHOURSFORATTENDENCE";
                var res = dbHandler.ReturnDataSet(StrQuery);
                DataTable dt = res.Tables[0];
                return Convert.ToInt32(dt.Rows[0]["Hourly"]);
            }
            catch (Exception ex)
            {
                return -1;
            }
        }


        [HttpGet, ActionName("GetMinuteForAttendence")]
        public int GetMinuteForAttendence()
        {
            try
            {
                var dbHandler = new dbHandler();
                string StrQuery = "";
                StrQuery = "exec USP_SET_MINUTEFORATTENDENCE";
                var res = dbHandler.ReturnDataSet(StrQuery);
                DataTable dt = res.Tables[0];
                return Convert.ToInt32(dt.Rows[0]["Minute"]);
            }
            catch (Exception ex)
            {
                return -1;
            }
        }



        #endregion
        #region POST Methods
        [HttpPost, ActionName("PostElectiveStudentList")]
        public string PostElectiveStudentList([FromBody] List<ElectiveStudentList> Studentlist)
        {
            try
            {

                var StudentListData = new List<ElectiveStudentList>();
                int size = Studentlist.Count;
                for (int i = 0; i < size; i++)
                {
                    StudentListData.Add(Studentlist[i]);
                }
                Debug.WriteLine("before Conv to json: " + StudentListData);
                var json = new JavaScriptSerializer().Serialize(StudentListData);
                Debug.WriteLine("json: " + json);
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@json", json);
                var res = dbHandler.ReturnDataWithStoredProcedureTable("USP_SET_Elective_Pins", param);
                return JsonConvert.SerializeObject(res);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }


        [HttpPost, ActionName("PostSubjectsAllotedFaculty")]
        public string PostSubjectsAllotedFaculty([FromBody] facultySubjectMappingData facultySubjectMappingData)
        {
            try
            {

                var facultyListData = new List<facultySubjectdata>();
                int size = facultySubjectMappingData.facultysubjectmapping.Count;
                for (int i = 0; i < size; i++)
                {
                    facultyListData.Add(facultySubjectMappingData.facultysubjectmapping[i]);
                }
                var json = new JavaScriptSerializer().Serialize(facultyListData);

                var dbHandler = new dbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@collegeCode", facultySubjectMappingData.collegeCode);
                param[1] = new SqlParameter("@CourseBranchId ", facultySubjectMappingData.branchid);
                param[2] = new SqlParameter("@data", json);
                var res = dbHandler.ReturnDataWithStoredProcedureTable("USP_SET_Elective_Pins", param);
                return JsonConvert.SerializeObject(res);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }



        #endregion


        [HttpGet, ActionName("GetHodTransferReports")]
        public string GetHodTransferReports(string CollegeCode, string BranchCode, string Scheme, string semester)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[4];
                param[0] = new SqlParameter("@CollegeCode", CollegeCode);
                param[1] = new SqlParameter("@BranchCode", BranchCode);
                param[2] = new SqlParameter("@Scheme", Scheme);
                param[3] = new SqlParameter("@semester", semester);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("USP_SFP_GET_HodTransferReport ", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_SFP_GET_HodTransferReport", 0, ex.Message);
                return ex.Message;
            }
        }



        [HttpGet, ActionName("getActiveSemester")]
        public string getActiveSemester()
        {
            try
            {
                var dbHandler = new dbHandler();
                string StrQuery = "";
                StrQuery = "exec USP_GET_ACTIVE_SEMESTER";
                var dt = dbHandler.ReturnDataSet(StrQuery);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_GET_ACTIVE_SEMESTER", 0, ex.Message);
                return ex.Message;
            }
        }



        [HttpGet, ActionName("GetStudentsList")]
        public string GetStudentsList(int schemeId, string collegeCode, int branchId, int semId)
        {

            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[4];
                param[0] = new SqlParameter("@schemeId", schemeId);
                param[1] = new SqlParameter("@collegeCode", collegeCode);
                param[2] = new SqlParameter("@branchId", branchId);
                param[3] = new SqlParameter("@semId", semId);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_ACD_Get_StudentsBySemester", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }


        [HttpGet, ActionName("GetSyllabusReport")]
        public string GetSyllabusReport(int UserTypeId, int ShiftId, string CollegeCode)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@UserTypeId", UserTypeId);
                param[1] = new SqlParameter("@ShiftId", ShiftId);
                param[2] = new SqlParameter("@CollegeCode", CollegeCode);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_ACD_SyllabusCoverageReport", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }





        [HttpGet, ActionName("GetSchemeSems")]
        public string GetSchemeSems(int Scheme)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@Scheme", Scheme);

                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SFP_GetSemByScheme", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }


        [HttpGet, ActionName("GetFeedbackReport")]
        public string GetFeedbackReport(int FeedbackId, string CollegeCode, int branchid, int SchemeId, int SemId)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[5];
                param[0] = new SqlParameter("@FeedbackId", FeedbackId);
                param[1] = new SqlParameter("@CollegeCode", CollegeCode);
                param[2] = new SqlParameter("@branchid", branchid);
                param[3] = new SqlParameter("@SchemeId", SchemeId);
                param[4] = new SqlParameter("@SemId", SemId);
                var dt = dbHandler.ReturnDataWithStoredProcedure("usp_ACD_GetCollegeFeedbackReport", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpGet, ActionName("GetAdminFeedbackReport")]
        public string GetAdminFeedbackReport(int FeedbackId, int branchid, int SchemeId, int SemId)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[4];
                param[0] = new SqlParameter("@FeedbackId", FeedbackId);
                param[1] = new SqlParameter("@branchid", branchid);
                param[2] = new SqlParameter("@SchemeId", SchemeId);
                param[3] = new SqlParameter("@SemId", SemId);
                var dt = dbHandler.ReturnDataWithStoredProcedure("usp_ACD_GetAdminFeedbackReport", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }


        [HttpGet, ActionName("GetFacultyMappingList")]
        public string GetFacultyMappingList(string CollegeCode, int CourseBranchId, int SchemeId, int SemId, int ShiftId)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[5];
                param[0] = new SqlParameter("@CollegeCode", CollegeCode);
                param[1] = new SqlParameter("@CourseBranchId", CourseBranchId);
                param[2] = new SqlParameter("@SchemeId", SchemeId);
                param[3] = new SqlParameter("@SemId", SemId);
                param[4] = new SqlParameter("@ShiftId", ShiftId);

                var dt = dbHandler.ReturnDataWithStoredProcedure("SBP_ACD_GetSubjects", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpGet, ActionName("SetFacultyMappingList")]
        public string SetFacultyMappingList(string CollegeCode, int CourseBranchId, int ShiftId, string data)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[4];
                param[0] = new SqlParameter("@CollegeCode", CollegeCode);
                param[1] = new SqlParameter("@CourseBranchId", CourseBranchId);
                param[2] = new SqlParameter("@ShiftId", ShiftId);
                param[3] = new SqlParameter("@data", data);

                var dt = dbHandler.ReturnDataWithStoredProcedure("SBP_ACD_SetSubjects", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }



        




        

        [HttpPost, ActionName("PostSetDates")]
        public string PostSetDates([FromBody]SetSemesterDatereqdata ReqData)
        {
            try
            {
                string clientIpAddress = System.Web.HttpContext.Current.Request.UserHostAddress;
                var dbHandler = new dbHandler();
                var param = new SqlParameter[5];
                param[0] = new SqlParameter("@Schemeid", ReqData.Schemeid);
                param[1] = new SqlParameter("@semid", ReqData.semid);
                param[2] = new SqlParameter("@StartDate", ReqData.StartDate);
                param[3] = new SqlParameter("@EndDate", ReqData.EndDate);
                param[4] = new SqlParameter("@AcademicYearId", ReqData.AcademicYearId);

                var dt = dbHandler.ReturnDataWithStoredProcedure("ADM_Admission_SET_SemesterDates ", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("ADM_Admission_SET_SemesterDates ", 0, ex.Message);
                return ex.Message;

            }

        }

        [HttpPost, ActionName("SaveAlphaStudentList")]
        public string SaveAlphaStudentList([FromBody]SetAlphaData ReqData)
        {
            try
            {
              
                var dbHandler = new dbHandler();
                var param = new SqlParameter[5];
                param[0] = new SqlParameter("@SchemeId", ReqData.SchemeId);
                param[1] = new SqlParameter("@SemId", ReqData.SemId);
                param[2] = new SqlParameter("@CollegeCode", ReqData.CollegeCode);
                param[3] = new SqlParameter("@BranchCode", ReqData.BranchCode);
                param[4] = new SqlParameter("@json", ReqData.json);

                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SET_AlplaSelectedStudents ", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_SET_AlplaSelectedStudents ", 0, ex.Message);
                return ex.Message;

            }

        }

        [HttpGet, ActionName("getHodSubjectList")]
        public string getHodSubjectList(string CollegeCode, int CourseBranchId, int SchemeId,int SemId,int ShiftId)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[5];
                param[0] = new SqlParameter("@CollegeCode", CollegeCode);
                param[1] = new SqlParameter("@CourseBranchId", CourseBranchId);
                param[2] = new SqlParameter("@SchemeId", SchemeId);
                param[3] = new SqlParameter("@SemId", SemId);
                param[4] = new SqlParameter("@ShiftId", ShiftId);

                var dt = dbHandler.ReturnDataWithStoredProcedure("SBP_ACD_GetSubjectsForHod", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }


        [HttpGet, ActionName("GetSetSemesterData")]
        public string GetSetSemesterData()
        {
            try
            {
                var dbHandler = new dbHandler();
                string StrQuery = "";
                StrQuery = "exec ADM_Admission_GET_ActiveSemesterDates";
                var dt = dbHandler.ReturnDataSet(StrQuery);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("ADM_Admission_GET_ActiveSemesterDates", 0, ex.Message);
                return ex.Message;
            }
        }

        [HttpGet, ActionName("GetAdminTransferedReport")]
        public string GetAdminTransferedReport(int AcademicYearId)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@AcademicYearId", AcademicYearId);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SFP_GET_AdminTransferList ", param);
                return JsonConvert.SerializeObject(dt);
                
            }
            catch (Exception ex)
            {
                //dbHandler.SaveErorr(" USP_SFP_GET_AdminTransferList", 0, ex.Message);
                return ex.Message;
            }
        }

        [HttpGet, ActionName("getAcademicYears")]
        public string getAcademicYears()
        {
            try
            {
                var dbHandler = new dbHandler();
                string StrQuery = "";
                StrQuery = "exec USP_GET_ACADEMICYEARS";
                var dt = dbHandler.ReturnDataSet(StrQuery);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_GET_ACADEMICYEARS", 0, ex.Message);
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


        [HttpGet, ActionName("GetPrincipalTransferReport")]
        public string GetPrincipalTransferReport(string CollegeCode)
        {
            try
            {
                var dbHandler = new dbHandler();              
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@CollegeCode", CollegeCode);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("USP_SFP_GET_PrincipalTransferReport", param);             
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_SFP_GET_PrincipalTransferReport", 0, ex.Message);
                return ex.Message;
            }
        }




        //[HttpGet]
        //public string GenerateOTP(int FeedBackid,string Pin, string mobile)
        //{
        //    string CountryCode = "xx";
        //    string appKey = "xxxxxxxxxxxxxxx";
        //    var client = new RestClient("sms otp api url ");
        //    var request = new RestRequest(Method.POST);
        //    request.AddHeader("cache-control", "no-cache");
        //    request.AddHeader("application-key", appKey);
        //    request.AddParameter("undefined", "{\n \"countryCode\": " + countryCode + ",\n \"mobileNumber\": " + mobile + ",\n \"getGeneratedOTP\": true\n}", ParameterType.RequestBody);
        //    IRestResponse response = client.Execute(request);
        //    var newResource = JsonConvert.DeserializeObject<OTPVerification>(response.Content);
        //    if (newResource.response.code == "OTP_SENT_SUCCESSFULLY")
        //    {
        //        return Json(newResource.response.code, JsonRequestBehavior.AllowGet);
        //    }
        //    else if (newResource.response.code == "OTP_EXPRID")
        //    {
        //        return Json(newResource.response.code, JsonRequestBehavior.AllowGet);
        //    }
        //    else
        //    {
        //        return Json(newResource.status, JsonRequestBehavior.AllowGet);
        //    }
        //}

        //private JsonResult Json(object code, JsonRequestBehavior allowGet)
        //{
        //    throw new NotImplementedException();
        //}
        [HttpGet, ActionName("getScheme")]
        public string getScheme()
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

        [HttpGet, ActionName("addorUpdateFeeSettings")]
        public string addorUpdateFeeSettings(int DataType, int ID, string Name, bool Is_Active, int Price, int ServiceType, string ChallanPrefix, string UserName)
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
