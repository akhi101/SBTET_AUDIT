using Newtonsoft.Json;
using System;
using System.Configuration;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using System.Web.Http;
using SoftwareSuite.Models.Database;

namespace SoftwareSuite.Controllers.TWSH
{
    public class TwshPaymentController : Controller
    {
        public async Task<ActionResult> BillResponse([FromBody]string msg)
        {
            string redirect = "";
            string strCheckSumValue = "";
            string retMsg = null;
            string _paymentResp = msg;
            string[] arrResponse = _paymentResp.Split('|');
            int index = _paymentResp.LastIndexOf("|");
            string key = "ScG3yshuSFOr";
            string checksumkeyr = _paymentResp.Substring(0, index);
            string Checksumvalue = GetHMACSHA256(checksumkeyr, key);
            Checksumvalue = Checksumvalue.ToUpper();
            string _ChecksumvalueReceived = arrResponse[25];
            //var bildeskresp = ConfigurationManager.AppSettings["BillDeskResFile"].ToString();
            //string restime = DateTime.Now.ToString("dddd, dd MMMM yyyy HH:mm:ss").Replace(":", ".");
            //TODO: add Log to Mongo DB
            //using (StreamWriter writer = new StreamWriter(bildeskresp, true))
            //{
            //    writer.WriteLine("---TWSH  BillDesk Response entered---time" + restime);
            //    writer.WriteLine(_ChecksumvalueReceived);
            //}
            string amt = arrResponse[4];
            string merchantId = arrResponse[0].ToString();
            //hdnMerchantId.Value = merchantId;
            string subscriberid = arrResponse[1].ToString();
            //txtsubscriberid.Text = subscriberid;
            string txnrefno = arrResponse[2].ToString();
            //txtbankrefno.Text = txnrefno;
            string bankrefno = arrResponse[3].ToString();
            string txnamt = arrResponse[4].ToString();
            //txtamount.Text = txnamt;
            string bankid = arrResponse[5].ToString();
            string bankmerid = arrResponse[6].ToString();//Not Imp
            string tcntype = arrResponse[7].ToString();//Not Imp
            string currencyname = arrResponse[8].ToString();
            string temcode = arrResponse[9].ToString();//Not Imp
            string securitytype = arrResponse[10].ToString();//Not Imp
            string securityid = arrResponse[11].ToString();//Not Imp
            string securitypass = arrResponse[12].ToString();//Not Imp
            string txndate = arrResponse[13].ToString();
            string authstatus = arrResponse[14].ToString();
            string settlementtype = arrResponse[15].ToString();//Not Imp
            string addtninfo1 = arrResponse[16].ToString();
            //collegecode.Text = addtninfo1;
            string addtninfo2 = arrResponse[17].ToString();
            string addtninfo3 = arrResponse[18].ToString();//Not Imp
                                                           //branchcode.Text = addtninfo3;
            string addtninfo4 = arrResponse[19].ToString();//Not Imp
                                                           // scheme.Text = addtninfo4;
            string addtninfo5 = arrResponse[20].ToString();//Not Imp
                                                           // semester.Text = addtninfo5;
            string addtninfo6 = arrResponse[21].ToString();//Not Imp
                                                           // examtype.Text = addtninfo6;
            string addtninfo7 = arrResponse[22].ToString();//Not Imp
            string errorstatus = arrResponse[23].ToString();
            string errordesc = arrResponse[24].ToString();
            string checksum = arrResponse[25].ToString();


            string message = merchantId + "|" + subscriberid + "|" + txnrefno + "|" + bankrefno + "|" + txnamt + "|" + bankid + "|" + bankmerid + "|" + tcntype + "|" + currencyname + "|" + temcode + "|" + securitytype + "|" + securityid + "|" + securitypass + "|" + txndate + "|" + authstatus + "|" +
              settlementtype + "|" + addtninfo1 + "|" + addtninfo2 + "|" + addtninfo3 + "|" + addtninfo4 + "|" + addtninfo5 + "|" + addtninfo6 + "|" + addtninfo7 + "|" + errorstatus + "|" + errordesc; //+"|ScG3yshuSFOr";


            strCheckSumValue = CheckSumResponse(message);
            //TODO: add Log to Mongo DB
            //using (StreamWriter writer = new StreamWriter(bildeskresp, true))
            //{
            //    writer.WriteLine("TWSH Check Sum SBTET:" + strCheckSumValue + "\n" + "Checksum from billdesk:" + checksum);
            //}
            if (checksum.Equals(strCheckSumValue))
            {
                var db = new Twshdbandler();
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
                var dt = db.ReturnDataWithStoredProcedureTable("SP_SET_ApplicationFeeResponceLog", param);
                if (authstatus == "0300")
                {
                    retMsg = "{\"txnrefno\":\"" + txnrefno + "\",\"Refno\" : \"" + subscriberid + "\",\"statusdesc\" : \"Success Transaction\",\"amount\" : \"" + txnamt + "\",\"addinfo1\" : \"" + addtninfo1 + "\",\"addinfo2\" : \"" + addtninfo6 + "\",\"addinfo3\" : \"" + addtninfo3 + "\",\"addinfo4\" : \"" + addtninfo4 + "\",\"addinfo5\" : \"" + addtninfo5 + "\"   }";
                }
                else
                {
                    retMsg = "{\"txnrefno\":\"" + txnrefno + "\",\"Refno\" : \"" + subscriberid + "\",\"statusdesc\": \"Cancel Transaction\",\"amount\" : \"" + txnamt + "\",\"addinfo1\" : \"" + addtninfo1 + "\",\"addinfo2\" : \"" + addtninfo6 + "\",\"addinfo3\" : \"" + addtninfo3 + "\",\"addinfo4\" : \"" + addtninfo4 + "\",\"addinfo5\" : \"" + addtninfo5 + "\"    }";
                }
            }
            redirect = ConfigurationManager.AppSettings["PaymentRouteRedirectTwsh"].ToString();

            return Redirect(redirect + "/" + Base64Encode(retMsg));
        }

        public static string Base64Encode(string plainText)
        {
            var plainTextBytes = System.Text.Encoding.UTF8.GetBytes(plainText);
            return System.Convert.ToBase64String(plainTextBytes);
        }

        public static string Base64Decode(string base64EncodedData)
        {
            var base64EncodedBytes = System.Convert.FromBase64String(base64EncodedData);
            return System.Text.Encoding.UTF8.GetString(base64EncodedBytes);
        }

        private string CheckSumResponse(string msg)
        {

            string data = msg;
            string hash = String.Empty;
            hash = GetHMACSHA256(data, "ScG3yshuSFOr");
            return hash.ToUpper();
        }

        private string GetHMACSHA256(string text, string key)
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

    }
}
