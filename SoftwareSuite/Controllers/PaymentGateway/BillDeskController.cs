using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Cryptography;
using System.Web;
using System.Web.Http;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Threading.Tasks;
using RestSharp;
using System.Data;
using SoftwareSuite.Models.Database;
using SoftwareSuite.Controllers.PreExamination;



namespace SoftwareSuite.Controllers.PaymentGateway
{
    public class BillDeskController : ApiController
    {


        [HttpGet, ActionName("getSomeValue")]
        public HttpResponseMessage getSomeValue(string url, string challanaNo)
        {

            try
            {
                string redirecturl = url;
                //string marchantid = "TSSBTET";
                //string subMarchantid = "TSDOFP";

                //var addInfo4 = "NA";
                //var addInfo5 = "NA";
                //var addInfo6 = "SINGLE";
                //var addInfo7 = "NA";

                ////string addInfo4 = request["addInfo4"].ToString();
                ////string addInfo5 = request["addInfo5"].ToString();
                ////string addInfo6 = request["addInfo6"].ToString();
                ////string addInfo7 = request["addInfo7"].ToString();
                //string chalanaNo = challanaNo;

                ////var base64EncodedBytes = System.Convert.FromBase64String(amount);
                ////var amt = System.Text.Encoding.UTF8.GetString(base64EncodedBytes);
                ////var base64EncodedBytes1 = System.Convert.FromBase64String(addInfo1);
                ////var add1 = System.Text.Encoding.UTF8.GetString(base64EncodedBytes1);
                ////var base64EncodedBytes2 = System.Convert.FromBase64String(chalanaNo);
                ////var chalanaNo1 = System.Text.Encoding.UTF8.GetString(base64EncodedBytes2);
                var dbHandler = new dbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@ChallanaNumber", challanaNo);
                DataSet dt = dbHandler.ReturnDataWithStoredProcedure("USP_SFP_GET_ChallanaDataForFeePayment", param);
                string marchantid = dt.Tables[1].Rows[0]["marchantid"].ToString();
                string subMarchantid = dt.Tables[1].Rows[0]["subMarchantid"].ToString();
                string addInfo1 = dt.Tables[1].Rows[0]["addInfo1"].ToString();
                string addInfo3 = dt.Tables[1].Rows[0]["addInfo3"].ToString();
                string addInfo4 = dt.Tables[1].Rows[0]["addInfo4"].ToString();
                string addInfo5 = dt.Tables[1].Rows[0]["addInfo5"].ToString();
                string addInfo6 = dt.Tables[1].Rows[0]["addInfo6"].ToString();
                string addInfo7 = dt.Tables[1].Rows[0]["addInfo7"].ToString();
                string chalanaNo = dt.Tables[1].Rows[0]["challan"].ToString();
                string amount = dt.Tables[1].Rows[0]["amount"].ToString();
               
                PreExaminationController PreExaminationController = new PreExaminationController();
                PreExaminationController.FeeRequestLog(marchantid, subMarchantid, addInfo1, addInfo3, addInfo4, addInfo5, addInfo6, addInfo7, chalanaNo, amount);

                SoftwareSuite.Models.Security.SHA1 CheckSum = new SoftwareSuite.Models.Security.SHA1();
                var hash = CheckSum.CheckSumRequest(url, marchantid, subMarchantid, addInfo1, addInfo3, addInfo4, addInfo5, addInfo6, addInfo7, chalanaNo, amount);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, hash);
                return response;
            }
            catch (Exception ex)
            {
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
                return response;
            }

        }


        #region GetMethod
        [HttpGet, ActionName("getHashValue")]
        public HttpResponseMessage getHashValue(string redirecturl, string marchantid, string subMarchantid, string addInfo1, string addInfo3, string addInfo4, string addInfo5, string addInfo6, string addinfo7, string chalanaNo, string amount)
        {

            try
            {
                SoftwareSuite.Models.Security.SHA1 CheckSum = new SoftwareSuite.Models.Security.SHA1();
                var hash = CheckSum.CheckSumRequest(redirecturl, marchantid, subMarchantid, addInfo1, addInfo3, addInfo4, addInfo5, addInfo6, addinfo7, chalanaNo, amount);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, hash);
                return response;
            }
            catch (Exception ex)
            {
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
                return response;
            }

        }
        #endregion
        #region PostMethod

        [HttpPost, ActionName("getPaymentResponse")]
        public async Task<HttpResponseMessage> getPaymentResponse()
        {
            HttpResponseMessage response = new HttpResponseMessage();
            try
            {
                string strCheckSumValue = "";
                SoftwareSuite.Models.Security.SHA1 objChecksum = new SoftwareSuite.Models.Security.SHA1();

                //  var  req = Request.Params;

                //string strResponseMsg = req["msg"] == null ? "" : req["msg"].Trim();
                string strResponseMsg = await Request.Content.ReadAsStringAsync();
                //var bildeskresp = ConfigurationManager.AppSettings["BillDeskResFile"].ToString();
                //string restime = DateTime.Now.ToString("dddd, dd MMMM yyyy HH:mm:ss").Replace(":", ".");
                //TODO: add Log to Mongo DB
                //using (StreamWriter writer = new StreamWriter(bildeskresp, true))
                //{
                //    writer.WriteLine("---BillDesk Response entered---time" + restime);
                //    writer.WriteLine(strResponseMsg);
                //}

                String[] token = strResponseMsg.Split('|');
                if (token.Length == 26)
                {
                    var merchantId = token[0].ToString();
                    string subscriberid = token[1].ToString();
                    string txnrefno = token[2].ToString();
                    string bankrefno = token[3].ToString();
                    string txnamt = token[4].ToString();
                    string bankid = token[5].ToString();
                    string bankmerid = token[6].ToString();//Not Imp
                    string tcntype = token[7].ToString();//Not Imp
                    string currencyname = token[8].ToString();
                    string temcode = token[9].ToString();//Not Imp
                    string securitytype = token[10].ToString();//Not Imp
                    string securityid = token[11].ToString();//Not Imp
                    string securitypass = token[12].ToString();//Not Imp
                    string txndate = token[13].ToString();
                    string authstatus = token[14].ToString();
                    string settlementtype = token[15].ToString();//Not Imp
                    string addtninfo1 = token[16].ToString();
                    string addtninfo2 = token[17].ToString();
                    string addtninfo3 = token[18].ToString();//Not Imp
                    string addtninfo4 = token[19].ToString();//Not Imp
                    string addtninfo5 = token[20].ToString();//Not Imp
                    string addtninfo6 = token[21].ToString();//Not Imp
                    string addtninfo7 = token[22].ToString();//Not Imp
                    string errorstatus = token[23].ToString();
                    string errordesc = token[24].ToString();
                    string checksum = token[25].ToString();


                    string message = merchantId + "|" + subscriberid + "|" + txnrefno + "|" + bankrefno + "|" + txnamt + "|" + bankid + "|" + bankmerid + "|" + tcntype + "|" + currencyname + "|" + temcode + "|" + securitytype + "|" + securityid + "|" + securitypass + "|" + txndate + "|" + authstatus + "|" +
                      settlementtype + "|" + addtninfo1 + "|" + addtninfo2 + "|" + addtninfo3 + "|" + addtninfo4 + "|" + addtninfo5 + "|" + addtninfo6 + "|" + addtninfo7 + "|" + errorstatus + "|" + errordesc; //+"|ScG3yshuSFOr";


                    strCheckSumValue = objChecksum.CheckSumResponse(message);
                    //TODO: add Log to Mongo DB
                    //using (StreamWriter writer = new StreamWriter(bildeskresp, true))
                    //{
                    //    writer.WriteLine("Response Message" + strResponseMsg);

                    //}
                    //using (StreamWriter writer = new StreamWriter(bildeskresp, true))
                    //{
                    //    writer.WriteLine("Check Sum SBTET:" + strCheckSumValue + "\n" + "Checksum from billdesk:" + checksum);
                    //}

                    if (checksum.Equals(strCheckSumValue))
                    {
                        var dbHandler = new dbHandler();
                        var param = new SqlParameter[26];
                        param[0] = new SqlParameter("@merchantId", merchantId);
                        param[1] = new SqlParameter("@subscriberid", subscriberid);
                        param[2] = new SqlParameter("@txnrefno", txnrefno);
                        param[3] = new SqlParameter("@bankrefno", bankrefno);
                        param[4] = new SqlParameter("@txnamt", txnamt);
                        param[5] = new SqlParameter("@bankid", bankid);
                        param[6] = new SqlParameter("@bankmerid", bankmerid);
                        param[7] = new SqlParameter("@tcntype", tcntype);
                        param[8] = new SqlParameter("@currencyname", currencyname);
                        param[9] = new SqlParameter("@temcode", temcode);
                        param[10] = new SqlParameter("@securitytype", securitytype);
                        param[11] = new SqlParameter("@securityid", securityid);
                        param[12] = new SqlParameter("@securitypass", securitypass);
                        param[13] = new SqlParameter("@txndate", txndate);
                        param[14] = new SqlParameter("@authstatus", authstatus);
                        param[15] = new SqlParameter("@settlementtype", settlementtype);
                        param[16] = new SqlParameter("@addtninfo1", addtninfo1);
                        param[17] = new SqlParameter("@addtninfo2", addtninfo2);
                        param[18] = new SqlParameter("@addtninfo3", addtninfo3);
                        param[19] = new SqlParameter("@addtninfo4", addtninfo4);
                        param[20] = new SqlParameter("@addtninfo5", addtninfo5);
                        param[21] = new SqlParameter("@addtninfo6", addtninfo6);
                        param[22] = new SqlParameter("@addtninfo7", addtninfo7);
                        param[23] = new SqlParameter("@errorstatus", errorstatus);
                        param[24] = new SqlParameter("@errordesc", errordesc);
                        param[25] = new SqlParameter("@checksum", checksum);

                        var dt = dbHandler.ReturnDataWithStoredProcedureTable("UspCollegeFinePaymentReceivingLog", param);
                        //HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);

                        if (authstatus == "0300")
                        {
                            response = Request.CreateResponse(HttpStatusCode.OK);
                            response.Content = new StringContent(JsonConvert.SerializeObject("{\"txnrefno\":\"" + txnrefno + "\",\"Refno\" = \"\"" + subscriberid + "\",\"statusdesc\" = \"\"Success Transaction\",\"addinfo1\" = \"\"" + addtninfo1 + "\",\"addinfo2\" = \"\"" + addtninfo2 + "\",\"addinfo3\" = \"\"" + addtninfo3 + "\",\"addinfo4\" = \"\"" + addtninfo4 + "\",\"addinfo5\" = \"\"" + addtninfo5 + "\"   }"), System.Text.Encoding.UTF8, "application/json");
                            return response;
                        }
                        else
                        {
                            response = Request.CreateResponse(HttpStatusCode.PaymentRequired);
                            response.Content = new StringContent(JsonConvert.SerializeObject("{\"txnrefno\":\"" + txnrefno + "\",\"Refno\" = \"\"" + subscriberid + "\",\"statusdesc\" = \"\"Cancel Transaction\",\"addinfo1\" = \"\"" + addtninfo1 + "\",\"addinfo2\" = \"\"" + addtninfo2 + "\",\"addinfo3\" = \"\"" + addtninfo3 + "\",\"addinfo4\" = \"\"" + addtninfo4 + "\",\"addinfo5\" = \"\"" + addtninfo5 + "\"    }"), System.Text.Encoding.UTF8, "application/json");
                            return response;

                        }
                    }
                    else
                    {
                        response = Request.CreateResponse(HttpStatusCode.Forbidden);
                        response.Content = new StringContent(JsonConvert.SerializeObject("{\"txnrefno\":\"" + txnrefno + "\",\"Refno\" = \"\"" + subscriberid + "\",\"statusdesc\" = \"Cancel Transaction\"\",\"addinfo1\" = \"\"" + addtninfo1 + "\",\"addinfo2\" = \"\"" + addtninfo2 + "\",\"addinfo3\" = \"\"" + addtninfo3 + "\",\"addinfo4\" = \"\"" + addtninfo4 + "\",\"addinfo5\" = \"\"" + addtninfo5 + "\"     }"), System.Text.Encoding.UTF8, "application/json");
                        return response;
                    }
                }


            }
            catch (Exception ex)
            {
                response = Request.CreateResponse(HttpStatusCode.InternalServerError);
                response.Content = new StringContent(JsonConvert.SerializeObject("{\"txnrefno\":\"\",\"statusdesc\" = \"Internal Server Error\"\" }"), System.Text.Encoding.UTF8, "application/json");
                return response;

            }
            response = Request.CreateResponse(HttpStatusCode.InternalServerError);
            response.Content = new StringContent(JsonConvert.SerializeObject("{\"txnrefno\":\"\",\"statusdesc\" = \"Internal Server Error\"\" }"), System.Text.Encoding.UTF8, "application/json");
            return response;

        }

        [HttpPost, ActionName("getPaymentQueryStatus")]
        public async Task<string> getPaymentQueryStatus([FromBody]JsonObject request)
        {
            HttpResponseMessage response = new HttpResponseMessage();
            try
            {
                var url = ConfigurationManager.AppSettings["Query_Api"].ToString();
                SoftwareSuite.Models.Security.SHA1 Sha = new SoftwareSuite.Models.Security.SHA1();
                //var bildeskresp = ConfigurationManager.AppSettings["BillDeskQueryApiFile"].ToString();
                //string restime = DateTime.Now.ToString("dddd, dd MMMM yyyy HH:mm:ss").Replace(":", ".");
                string msg = string.Empty;
                String currenttimeStamp = DateTime.Now.ToString("yyyyMMddHHmmssffff");
                string datafinal = "0122|" + request["MarchantID"] + "|" + request["CustomerRefNO"] + "|" + currenttimeStamp + "";

                string checksumstring = Sha.GetHMACSHA256(datafinal, "ScG3yshuSFOr");
                string msg1 = datafinal + "|" + checksumstring.ToUpper();
                //TODO: add Log to Mongo DB
                //using (StreamWriter writer = new StreamWriter(bildeskresp, true))
                //{
                //    writer.WriteLine("---BillDesk Query Request entered---time" + restime);
                //    writer.WriteLine(msg1);
                //}
                string retMsg = null;
                string pins = String.Empty;
                string redirect = String.Empty;
                string errordesc = String.Empty;
                string addtninfo1 = String.Empty;
                string addtninfo2 = String.Empty;
                string addtninfo3 = String.Empty;
                string addtninfo4 = String.Empty;
                string addtninfo5 = String.Empty;
                string addtninfo6 = String.Empty;
                string date = String.Empty;
                using (HttpClient client = new HttpClient())
                {
                    try
                    {

                        var parameters = new Dictionary<string, string> { { "msg", msg1 } };
                        var encodedContent = new FormUrlEncodedContent(parameters);
                        var resMsg = await client.PostAsync(url, encodedContent);
                        var content = await resMsg.Content.ReadAsStringAsync();
                        //TODO: add Log to Mongo DB
                        //using (StreamWriter writer = new StreamWriter(bildeskresp, true))
                        //{
                        //    writer.WriteLine("---BillDesk Query Response entered---time" + restime);
                        //    writer.WriteLine(content);
                        //}
                        string[] arrResponse = content.Split('|');
                        var db = new dbHandler();
                        var param = new SqlParameter[34];
                        param[0] = new SqlParameter("@MerchantID", arrResponse[1].ToString());
                        param[1] = new SqlParameter("@CustomerID", arrResponse[2].ToString());
                        param[2] = new SqlParameter("@TxnReferenceNo", arrResponse[3].ToString());
                        param[3] = new SqlParameter("@BankReferenceNo", arrResponse[4].ToString());
                        param[4] = new SqlParameter("@TxnAmount", arrResponse[5].ToString());
                        param[5] = new SqlParameter("@BankID", arrResponse[6].ToString());
                        param[6] = new SqlParameter("@BankMerchantID", arrResponse[7].ToString());
                        param[7] = new SqlParameter("@TxnType", arrResponse[8].ToString());
                        param[8] = new SqlParameter("@CurrencyName", arrResponse[9].ToString());
                        param[9] = new SqlParameter("@ItemCode", arrResponse[10].ToString());
                        param[10] = new SqlParameter("@SecurityType", arrResponse[11].ToString());
                        param[11] = new SqlParameter("@SecurityID", arrResponse[12].ToString());
                        param[12] = new SqlParameter("@SecurityPassword", arrResponse[13].ToString());
                        param[13] = new SqlParameter("@TxnDate", arrResponse[14].ToString());
                        param[14] = new SqlParameter("@AuthStatus", arrResponse[15].ToString());
                        param[15] = new SqlParameter("@SettlementType", arrResponse[16].ToString());
                        param[16] = new SqlParameter("@AdditionalInfo1", arrResponse[17].ToString());
                        param[17] = new SqlParameter("@AdditionalInfo2", arrResponse[18].ToString());
                        param[18] = new SqlParameter("@AdditionalInfo3", arrResponse[19].ToString());
                        param[19] = new SqlParameter("@AdditionalInfo4", arrResponse[20].ToString());
                        param[20] = new SqlParameter("@AdditionalInfo5", arrResponse[21].ToString());
                        param[21] = new SqlParameter("@AdditionalInfo6", arrResponse[22].ToString());
                        param[22] = new SqlParameter("@AdditionalInfo7", arrResponse[23].ToString());
                        param[23] = new SqlParameter("@ErrorStatus", arrResponse[24].ToString());
                        param[24] = new SqlParameter("@ErrorDescription", arrResponse[25].ToString());
                        param[25] = new SqlParameter("@Filler1", arrResponse[26].ToString());
                        param[26] = new SqlParameter("@RefundStatus", arrResponse[27].ToString());
                        param[27] = new SqlParameter("@TotalRefundAmount", arrResponse[28].ToString());
                        param[28] = new SqlParameter("@LastRefundDate", arrResponse[29].ToString());
                        param[29] = new SqlParameter("@LastRefundRefNo", arrResponse[30].ToString());
                        param[30] = new SqlParameter("@QueryStatus", arrResponse[31].ToString());
                        param[31] = new SqlParameter("@Checksum", arrResponse[32].ToString());
                        param[32] = new SqlParameter("@FullResponse", content);
                        param[33] = new SqlParameter("@RequestType", arrResponse[0].ToString());
                        db.ReturnDataWithStoredProcedureTable("USP_SFP_SET_QueryApiLog", param);
                        try
                        {
                            var param1 = new SqlParameter[1];
                            param1[0] = new SqlParameter("@ChallanNumber", arrResponse[1].ToString());
                            DataTable dt = db.ReturnDataWithStoredProcedureTable("USP_SFP_GET_StudentPhoneNumbers", param1);
                            for (int i = 0; i < dt.Rows.Count; i++)
                            {
                                pins = pins + "," + dt.Rows[i]["Pin"].ToString();
                            }
                        }
                        catch (Exception ex)
                        {
                            dbHandler.SaveErorr("USP_SFP_GET_StudentPhoneNumbers", 0, ex.Message);
                        }

                        date = arrResponse[14].ToString();
                        errordesc = arrResponse[25].ToString();
                        addtninfo1 = arrResponse[16].ToString();
                        addtninfo2 = arrResponse[17].ToString();
                        addtninfo3 = arrResponse[18].ToString();
                        addtninfo4 = arrResponse[20].ToString();
                        addtninfo5 = arrResponse[21].ToString();
                        addtninfo6 = arrResponse[22].ToString();


                        if (arrResponse[15].ToString() == "0300")
                        {
                            retMsg = "{\"txnrefno\":\"" + arrResponse[3].ToString() + "\",\"Refno\" : \"" + arrResponse[2].ToString() + "\",\"statusdesc\" : \"Success Transaction\",\"amount\" : \"" + arrResponse[5].ToString() + "\",\"addinfo1\" : \"" + addtninfo1 + "\",\"addinfo2\" : \"" + addtninfo6 + "\",\"addinfo3\" : \"" + addtninfo3 + "\",\"addinfo4\" : \"" + addtninfo4 + "\",\"addinfo5\" : \"" + addtninfo5 + "\",\"pins\" : \"" + arrResponse[20].ToString() + "\",\"date\" : \"" + date + "\",\"bankrefno\" : \"" + arrResponse[4].ToString() + "\"}";
                        }
                        else
                        {
                            retMsg = "{\"txnrefno\":\"" + arrResponse[3].ToString() + "\",\"Refno\" : \"" + arrResponse[2].ToString() + "\",\"statusdesc\": \"" + errordesc + "\",\"amount\" : \"" + arrResponse[5].ToString() + "\",\"addinfo1\" : \"" + addtninfo1 + "\",\"addinfo2\" : \"" + addtninfo6 + "\",\"addinfo3\" : \"" + addtninfo3 + "\",\"addinfo4\" : \"" + addtninfo4 + "\",\"addinfo5\" : \"" + addtninfo5 + "\",\"pins\" : \"" + arrResponse[20].ToString() + "\",\"date\" : \"" + date + "\",\"bankrefno\" : \"" + arrResponse[4].ToString() + "\"}";
                        }

                        //redirect = ConfigurationManager.AppSettings["PaymentGateRouteRedirect"].ToString();
                        //response = Request.CreateResponse(HttpStatusCode.OK);
                        //response.Content = new StringContent(JsonConvert.SerializeObject(retMsg), System.Text.Encoding.UTF8, "application/json");
                        return retMsg;
                    }
                    catch (Exception ex)
                    {
                        dbHandler.SaveErorr("USP_SFP_SET_BrowserResponce", 0, ex.Message);
                        return JsonConvert.SerializeObject(ex.Message);
                    }
                }
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_SFP_SET_BrowserResponce", 0, ex.Message);
                return JsonConvert.SerializeObject("{\"txnrefno\":\"\",\"Refno\" : \"\",\"statusdesc\":\"\",\"amount\" : \"\",\"addinfo1\" : \"\",\"addinfo2\" : \"\",\"addinfo3\" :\"\",\"addinfo4\" : \"\",\"addinfo5\" : \"\",\"pins\" : \"\" }");
            }
        }


        [HttpPost, ActionName("getPaymentS2SQueryStatus")]
        public async Task<string> getPaymentS2SQueryStatus([FromBody]JsonObject request)
        {
            HttpResponseMessage response = new HttpResponseMessage();
            try
            {
                //request["CustomerRefNO"];
                using (HttpClient client = new HttpClient())
                {
                    try
                    {

                        var db = new dbHandler();
                        var param = new SqlParameter[3];

                        param[0] = new SqlParameter("@ChallanNumber", request["CustomerRefNO"]);
                        param[1] = new SqlParameter("@UserTypeId", request["UserTypeId"]);
                        param[2] = new SqlParameter("@StudentTypeId", request["StudentTypeId"]);
                        DataSet ds = db.ReturnDataWithStoredProcedure("USP_SFP_GET_FeeReceipt", param);
                        //dt.Rows[0]["pin"];
                        //dt.Rows[0]["semester"];
                        //dt.Rows[0]["ChalanaNumber"];
                        //dt.Rows[0]["bankrefno"];
                        //dt.Rows[0]["Status"];
                        //dt.Rows[0]["txnamt"];
                        //dt.Rows[0]["txnrefno"];
                        //dt.Rows[0]["LogDate"];
                        string retMsg = string.Empty;

                        if(Convert.ToInt32(ds.Tables[0].Rows[0][0]) == 200)
                        {
                            DataTable dt = ds.Tables[1];
                            if (dt.Rows.Count > 0)
                            {
                                retMsg = "{\"txnrefno\":\"" + dt.Rows[0][6].ToString() + "\",\"Refno\" : \"" + dt.Rows[0][2].ToString() + "\",\"statusdesc\" : \"" + dt.Rows[0][4].ToString() + "\",\"amount\" : \"" + dt.Rows[0][5].ToString() + "\",\"pins\" : \"" + dt.Rows[0][0].ToString() + "\",\"date\" : \"" + dt.Rows[0][7].ToString() + "\",\"bankrefno\" : \"" + dt.Rows[0][3].ToString() + "\"}";
                            }
                        }
                        else if(Convert.ToInt32(ds.Tables[0].Rows[0][0]) != 200)
                        {
                            DataTable dt = ds.Tables[0];
                             retMsg = JsonConvert.SerializeObject(dt);
                        }
                        
                        return retMsg;
                    }
                    catch (Exception ex)
                    {
                        dbHandler.SaveErorr("USP_SFP_GET_FeeReceipt", 0, ex.Message);
                        return JsonConvert.SerializeObject(ex.Message);
                    }
                }
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_SFP_SET_BrowserResponce", 0, ex.Message);
                return JsonConvert.SerializeObject("{\"txnrefno\":\"\",\"Refno\" : \"\",\"statusdesc\":\"\",\"amount\" : \"\",\"addinfo1\" : \"\",\"addinfo2\" : \"\",\"addinfo3\" :\"\",\"addinfo4\" : \"\",\"addinfo5\" : \"\",\"pins\" : \"\" }");
            }
        }





        public static string Base64Encode(string plainText)
        {
            var plainTextBytes = System.Text.Encoding.UTF8.GetBytes(plainText);
            return System.Convert.ToBase64String(plainTextBytes);
        }

        #endregion
    }
}
