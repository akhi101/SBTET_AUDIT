using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Web;

namespace SoftwareSuite.Models.Security
{
    public class SHA1
    {
        public string GetSHA256(string text)
        {
            UTF8Encoding encoder = new UTF8Encoding();

            byte[] hashValue;
            byte[] message = encoder.GetBytes(text);

            SHA256Managed hashString = new SHA256Managed();
            string hex = "";

            hashValue = hashString.ComputeHash(message);
            foreach (byte x in hashValue)
            {
                hex += String.Format("{0:x2}", x);
            }
            return hex;
        }
        public string CheckSumRequest(string redirecturl, string marchantID, string subMarchantid, string addinfo1, string addinfo3, string addinfo4, string addinfo5, string addinfo6, string addinfo7, string CustomerRefNO, string amount)
        {
            try
            {
                //var bildeskresp = ConfigurationManager.AppSettings["BillDeskResFile"].ToString();
                //string restime = DateTime.Now.ToString("dddd, dd MMMM yyyy HH:mm:ss").Replace(":", ".");
                string msg = string.Empty;
                // type = "F";//
                string securityid = "tssbtet"; //live
                                               //  string securityid = "hmacuat";
                String timeStamp = GetTimestamp(DateTime.Now);
                string url = redirecturl;                          

                string addInfo1 = addinfo1 == null || addinfo1 == "" ? "NA" : addinfo1;
                // string addInfo2 = "hmacuat"; //LATEFEE
                string addInfo2 = subMarchantid;
                string addInfo3 = addinfo3 == null || addinfo3 == "" ? "NA" : addinfo3;
                string addInfo4 = addinfo4 == null || addinfo4 == "" ? "NA" : addinfo4;
                string addInfo5 = addinfo5 == null || addinfo5 == "" ? "NA" : addinfo5;
                string addInfo6 = addinfo6 == null || addinfo6 == "" ? "NA" : addinfo6;
                string addInfo7 = addinfo7 == null || addinfo7 == "" ? "NA" : addinfo7;
                string datafinal = marchantID + "|" + CustomerRefNO + "|NA|" + amount + "|NA|NA|NA|INR|NA|R|" + securityid + "|NA|NA|F|" + addInfo1 + "|" + addInfo2 + "|" + addInfo3 + "|" + addInfo4 + "|" + addInfo5 + "|" + addInfo6 + "|"+ addInfo7 + "|" + url + "";

                string checksumstring = GetHMACSHA256(datafinal, "ScG3yshuSFOr");
                string msg1 = datafinal + "|" + checksumstring.ToUpper();
                //TODO: add Log to Mongo DB
                //using (StreamWriter writer = new StreamWriter(bildeskresp, true))
                //{
                //    writer.WriteLine("---BillDesk Request entered---time" + restime);
                //    writer.WriteLine(msg1);
                //}

                return msg1;
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }


        //public string QueryChecksum(string marchantID, string subMarchantid, string addinfo1, string addinfo3, string addinfo4, string addinfo5, string addinfo6, string addinfo7, string CustomerRefNO, string amount)
        //{
        //    var bildeskresp = ConfigurationManager.AppSettings["BillDeskQueryApiFile"].ToString();
        //    string restime = DateTime.Now.ToString("dddd, dd MMMM yyyy HH:mm:ss").Replace(":", ".");
        //    string msg = string.Empty;

        //    String timeStamp = GetTimestamp(DateTime.Now);


        //    string addInfo6 = addinfo6 == null || addinfo6 == "" ? "NA" : addinfo6;
        //    string datafinal = marchantID + "|" + CustomerRefNO + "|NA|" + amount + "|NA|NA|NA|INR|NA|R|" + securityid + "|NA|NA|F|" + addInfo1 + "|" + addInfo2 + "|" + addInfo3 + "|" + addInfo4 + "|" + addInfo5 + "|" + addInfo6 + "|NA|" + url + "";

        //    string checksumstring = GetHMACSHA256(datafinal, "ScG3yshuSFOr");
        //    string msg1 = datafinal + "|" + checksumstring.ToUpper();
        //    using (StreamWriter writer = new StreamWriter(bildeskresp, true))
        //    {
        //        writer.WriteLine("---BillDesk Request entered---time" + restime);
        //        writer.WriteLine(msg1);
        //    }
        //    //   Response.Redirect("https://www.billdesk.com/pgidsk/PGIMerchantPayment?msg=" + msg1);
        //    //String data = marchantID + "|" + CustomerRefNO + "|NA|" + amount + "|NA|NA|NA|INR|NA|R|tssbtet|NA|NA|F|NA|TSCCIC|NA|NA|NA|NA|NA|" + url + "";
        //    //String hash = String.Empty;
        //    //hash = GetSHA256(data);
        //    //data1 = datafinal;
        //    return msg1;
        //}




        public static String GetTimestamp(DateTime value)
        {
            return value.ToString("yyyyMMddHHmmssffff");
        }
        public string CheckSumResponse(string msg)
        {
            //string marchantID = string.Empty; string CustomerRefNO = string.Empty; string amount = string.Empty; string type = string.Empty;
            // string url = "http://203.153.32.185/twshportal/ui/PaymentGateResponse.aspx";
            string data = msg;
            string hash = String.Empty;
            //hash = GetSHA256(data);
            //data1 = data;
            hash = GetHMACSHA256(data, "ScG3yshuSFOr");
            return hash.ToUpper();
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
    }
}
