using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Newtonsoft.Json;
using System.Data;
using System.Data.SqlClient;
using Newtonsoft.Json.Linq;
using System.Configuration;
using SoftwareSuite.Models.Database;
using System.Threading.Tasks;
using System.Xml;

namespace SoftwareSuite.Controllers.ExternalServices
{
    public class AffliationInfoController : ApiController
    {
        [HttpGet, ActionName("AFFCollegeTecHStaffInfo")]
        public async Task<string> AFFCollegeTecHStaffInfo()
        {
            var url = ConfigurationManager.AppSettings["AFF_College_TecH_Staff_Info"].ToString();
            var urlwithparam = url;
            string data = string.Empty;
            var res = string.Empty;
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
                    res = JsonConvert.SerializeObject("{\"Status\" : \"200\",\"Response\" : \" Data Inserted in Table \" }");
                    return res;

                }
                catch (Exception ex)
                {                  
                    res = JsonConvert.SerializeObject("{\"Status\" : \"404\",\"Response\" : \"" + ex.Message + "\" }");
                    return res;

                }

            }
        }

        [HttpGet, ActionName("GetCollegeList")]
        public async Task<string> GetCollegeList()
        {
            var url = ConfigurationManager.AppSettings["AFF_CollegesList"].ToString();
            var affliationyr = ConfigurationManager.AppSettings["AFF_YR"].ToString();
            var urlwithparam = url + '/' + affliationyr;
            string data = string.Empty;
            var res = string.Empty;
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
                    res = JsonConvert.SerializeObject("{\"Status\" : \"200\",\"Response\" : \" Data Inserted in Table \" }");
                    return res;

                }
                catch (Exception ex)
                {
                    res = JsonConvert.SerializeObject("{\"Status\" : \"404\",\"Response\" : \"" + ex.Message + "\" }");
                    return res;

                }

            }
        }

        [HttpGet, ActionName("GetCollegeBranchInfo")]
        public async Task<string> GetCollegeBranchInfo()
        {
            var url = ConfigurationManager.AppSettings["AFF_College_Branch_Info"].ToString();
            var affliationyr = ConfigurationManager.AppSettings["AFF_YR"].ToString();
            var urlwithparam = url + '/' + affliationyr;
            string data = string.Empty;
            var res = string.Empty;
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
                    res = JsonConvert.SerializeObject("{\"Status\" : \"200\",\"Response\" : \" Data Inserted in Table \" }");
                    return res;

                }
                catch (Exception ex)
                {
                    res = JsonConvert.SerializeObject("{\"Status\" : \"404\",\"Response\" : \"" + ex.Message + "\" }");
                    return res;
                }

            }
        }


        [HttpGet, ActionName("GetPolycetExamCenterInfo")]
        public async Task<string> GetPolycetExamCenterInfo()
        {
            var url = ConfigurationManager.AppSettings["AFF_Polycet_Exam_Centers"].ToString();         
           // var urlwithparam = url + '/' + affliationyr;
            string data = string.Empty;
            var res = string.Empty;
            using (HttpClient client = new HttpClient())
            {
                try
                {
                    var response = new HttpResponseMessage();
                    var resMsg = await client.GetAsync(url);
                    var content = await resMsg.Content.ReadAsStringAsync();
                    JObject obj = JObject.Parse(content);
                    JArray dataarray = obj["examCentersVo"].Value<JArray>();
                    var affjson = JsonConvert.SerializeObject(dataarray);
                    var dbHandler = new dbHandler();
                    var param = new SqlParameter[1];
                    param[0] = new SqlParameter("@Json ", affjson);
                    var dt = dbHandler.ReturnDataWithStoredProcedureTable("USP_Affiliation_SET_Polycet_ExamCenters", param);
                    res = JsonConvert.SerializeObject("{\"Status\" : \"200\",\"Response\" : \" Data Inserted in Table \" }");
                    return res;

                }
                catch (Exception ex)
                {
                    res = JsonConvert.SerializeObject("{\"Status\" : \"404\",\"Response\" : \"" + ex.Message + "\" }");
                    return res;
                }

            }
        }


    }
}
