using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Syntizen.Aadhaar.AUAKUA;
using Environment = Syntizen.Aadhaar.AUAKUA.Environment;

namespace SoftwareSuite.Models.TWSH
{
    public static class AuaKuaHelper
    {
        public static string GenerateOTP(string aadhaarno, string svctype, string key, Environment env)
        {
            Authentication objauth = new Authentication();
            AUAKUAParameters parms = new AUAKUAParameters();
            AUAKUAResponse resp = new AUAKUAResponse();
            objauth.SystemEnvironment = env;
            parms.LAT = "17.494568";
            parms.LONG = "78.392056";
            parms.DEVMACID = "11:22:33:44:55";
            parms.CONSENT = "Y";
            parms.SHRC = "Y";
            parms.VER = "2.5";
            parms.SERTYPE = svctype;
            if(env == Syntizen.Aadhaar.AUAKUA.Environment.Production)
            {
                parms.ENV = "1";
            }
            else
            {
                parms.ENV = "2";
            }
            parms.CH = "1";
            parms.AADHAARID = aadhaarno;
            parms.SLK = key;
            parms.RRN = DateTime.Now.ToString("yyyyMMddHHmmssfff");
            parms.REF = "FROMSAMPLE";
            parms.UDC = "MFS1002040444";

            resp = objauth.GenerateOTP(parms);

            Console.WriteLine("################################# Start Response ################################");
            Console.WriteLine(resp.ToString());
            Console.WriteLine("################################# End Response ##################################");

            return resp.Response;
        }
        public static string KYCWithOTP(string aadhaarno, string OTPValue, string TxnID, string key, Environment env)
        {
            Authentication objauth = new Authentication();
            AUAKUAParameters parms = new AUAKUAParameters();
            objauth.SystemEnvironment = env;
            parms.LAT = "17.494568";
            parms.LONG = "78.392056";
            parms.DEVMACID = "11:22:33:44:55";
            parms.DEVID = "F0178BF2AA61380FBFF0";
            parms.CONSENT = "Y";
            parms.SHRC = "Y";
            parms.VER = "2.5";
            parms.SERTYPE = "05";
            parms.LANG = "N";
            parms.PFR = "N";
            if (env == Syntizen.Aadhaar.AUAKUA.Environment.Production)
            {
                parms.ENV = "1";
            }
            else
            {
                parms.ENV = "2";
            }
            parms.OTP = OTPValue;
            parms.AADHAARID = aadhaarno;
            parms.SLK = key;
            parms.RRN = DateTime.Now.ToString("yyyyMMddHHmmssfff");
            parms.REF = "FROMSAMPLE";
            parms.TXN = TxnID;
            parms.UDC = "MFS1002040444";
            AUAKUAResponse resp = objauth.DoKYC(parms);
            return resp.Response;
        }
        public static string AUTHWithOTP(string aadhaarno, string OTPValue, string TxnID, string key, Environment env)
        {
            Authentication objauth = new Authentication();
            AUAKUAParameters parms = new AUAKUAParameters();
            objauth.SystemEnvironment = env;
            parms.LAT = "17.494568";
            parms.LONG = "78.392056";
            parms.DEVMACID = "11:22:33:44:55";
            parms.DEVID = "F0178BF2AA61380FBFF0";
            parms.CONSENT = "Y";
            parms.SHRC = "Y";
            parms.VER = "2.5";
            parms.SERTYPE = "02";
            parms.ENV = "2";
            parms.OTP = OTPValue;
            parms.AADHAARID = aadhaarno;
            parms.SLK = key;
            parms.RRN = DateTime.Now.ToString("yyyyMMddHHmmssfff");
            parms.REF = "FROMSAMPLE";
            parms.TXN = TxnID;
            parms.UDC = "MFS1002040444";
            AUAKUAResponse resp = objauth.DoAUTH(parms);

            Console.WriteLine("################################# Start Response ################################");
            Console.WriteLine(resp.ToString());
            Console.WriteLine("################################# End Response ##################################");

            return resp.Response;
        }

    }
}
