using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Security.Cryptography;
using System.Text;

namespace SoftwareSuite.Models.Security
{
    public class TwalletCrypt
    {
      
        protected string encrypted_data;
        protected string skey_encryption;

     
        public string Getrandomskey()
        {
            StringBuilder builder = new StringBuilder();
            Random random = new Random();
            char ch;
            for (int i = 0; i < 10; i++)
            {
                ch = Convert.ToChar(Convert.ToInt32(Math.Floor(26 * random.NextDouble() + 65)));
                builder.Append(ch);
            }
            return builder.ToString().ToLower();
        }

        public class TwalletRequest
        {
            public string ResponseCode { get; set; }
            public string ResponseDescription { get; set; }
            public string skey_encryption { get; set; }
            public string encrypted_data { get; set; }
          
        }
        public TwalletRequest RequestCipher(string Callbackurl, string agencycode, string agencyName, string addinfo1, string addinfo2, string addinfo3, string addinfo4, string OrderId, string amount)
        {
            try
            {

                RijndaelManaged sessionKey = new RijndaelManaged();
                string msg = string.Empty;               
                string url = Callbackurl;
                string addInfo1 = addinfo1 == null || addinfo1 == "" ? "" : addinfo1;
                string addInfo2 = addinfo2 == null || addinfo2 == "" ? "" : addinfo2;             
                string addInfo3 = addinfo3 == null || addinfo3 == "" ? "" : addinfo3;
                string addInfo4 = addinfo4 == null || addinfo4 == "" ? "" : addinfo4;
                string Description = addInfo1 + "$^$" + addInfo2 + "$^$" + addInfo3 + "$^$" + addInfo4;
                string strstring = agencycode + "&" + OrderId + "&" + Description + "&" + amount + "&" + url;


                skey_encryption = Encryption.GetEncryptedText(Convert.ToBase64String(sessionKey.Key), Decryption.Decrypt_usingpassword(System.Configuration.ConfigurationManager.AppSettings["TAPublic_Key"].ToString()));

                encrypted_data = Encryption.AESEncryption(strstring, Convert.ToBase64String(sessionKey.Key), false);

                TwalletRequest res = new TwalletRequest { ResponseCode ="200", ResponseDescription="SUCCESS", skey_encryption = skey_encryption, encrypted_data = encrypted_data };

                return res;
            }
            catch (Exception ex)
            {
                TwalletRequest res = new TwalletRequest { ResponseCode = "400", ResponseDescription = ex.Message, skey_encryption = "", encrypted_data = "" };

                return res;
            }
        }


    }
}
