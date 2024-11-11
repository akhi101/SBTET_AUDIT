using SoftwareSuite.Models.Database;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Web;

namespace SoftwareSuite.Models
{
    public class CommanMethods
    {
        public int GetCount(dbHandler dbHandler, string TableName, string ColumnNameToCheck, string ColumnValueToCheck, string ColumnIDName, string ColumnIDValue)
        {
            try
            {
                string StrQuery = "";
                StrQuery = "SELECT COUNT(*) FROM " + TableName + " WHERE 1=1 ";
                if (ColumnNameToCheck != "")
                {
                    StrQuery = StrQuery + " And " + ColumnNameToCheck + " = '" + ColumnValueToCheck + "'";
                }
                if ((ColumnIDValue != "") || (ColumnIDValue != "0"))
                {
                    StrQuery = StrQuery + "AND " + ColumnIDName + " <> " + ColumnIDValue;
                }
                return Convert.ToInt32(dbHandler.ExcutiveScalar(StrQuery));
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int GetForaignKeyCount(dbHandler dbHandler, string TableName, string ColumnNameToCheck, string ColumnValueToCheck)
        {
            try
            {
                string StrQuery = "";
                StrQuery = "SELECT ISNULL(COUNT(*),0) FROM " + TableName + " WHERE " + ColumnNameToCheck + "=" + ColumnValueToCheck;
                return Convert.ToInt32(dbHandler.ExcutiveScalar(StrQuery));
            }
            catch (Exception ex)
            {
                throw ex;
            }


        }
        //private string Encryptdata(string password)
        //{
        //    string strmsg = string.Empty;
        //    byte[] encode = new byte[password.Length];
        //    encode = Encoding.UTF8.GetBytes(password);
        //    strmsg = Convert.ToBase64String(encode);
        //    return strmsg;
        //}
        //private string Decryptdata(string encryptpwd)
        //{
        //    string decryptpwd = string.Empty;
        //    UTF8Encoding encodepwd = new UTF8Encoding();
        //    Decoder Decode = encodepwd.GetDecoder();
        //    byte[] todecode_byte = Convert.FromBase64String(encryptpwd);
        //    int charCount = Decode.GetCharCount(todecode_byte, 0, todecode_byte.Length);
        //    char[] decoded_char = new char[charCount];
        //    Decode.GetChars(todecode_byte, 0, todecode_byte.Length, decoded_char, 0);
        //    decryptpwd = new String(decoded_char);
        //    return decryptpwd;
        //}


        public string Encrypt(string clearText)
        {
            string EncryptionKey = "MAKV2SPBNI99212";
            byte[] clearBytes = Encoding.Unicode.GetBytes(clearText);
            using (Aes encryptor = Aes.Create())
            {
                Rfc2898DeriveBytes pdb = new Rfc2898DeriveBytes(EncryptionKey, new byte[] { 0x49, 0x76, 0x61, 0x6e, 0x20, 0x4d, 0x65, 0x64, 0x76, 0x65, 0x64, 0x65, 0x76 });
                encryptor.Key = pdb.GetBytes(32);
                encryptor.IV = pdb.GetBytes(16);
                using (MemoryStream ms = new MemoryStream())
                {
                    using (CryptoStream cs = new CryptoStream(ms, encryptor.CreateEncryptor(), CryptoStreamMode.Write))
                    {
                        cs.Write(clearBytes, 0, clearBytes.Length);
                        cs.Close();
                    }
                    clearText = Convert.ToBase64String(ms.ToArray());
                }
            }
            return clearText;
        }

        public string Decrypt(string cipherText)
        {
            string EncryptionKey = "MAKV2SPBNI99212";
            byte[] cipherBytes = Convert.FromBase64String(cipherText);
            using (Aes encryptor = Aes.Create())
            {
                Rfc2898DeriveBytes pdb = new Rfc2898DeriveBytes(EncryptionKey, new byte[] { 0x49, 0x76, 0x61, 0x6e, 0x20, 0x4d, 0x65, 0x64, 0x76, 0x65, 0x64, 0x65, 0x76 });
                encryptor.Key = pdb.GetBytes(32);
                encryptor.IV = pdb.GetBytes(16);
                using (MemoryStream ms = new MemoryStream())
                {
                    using (CryptoStream cs = new CryptoStream(ms, encryptor.CreateDecryptor(), CryptoStreamMode.Write))
                    {
                        cs.Write(cipherBytes, 0, cipherBytes.Length);
                        cs.Close();
                    }
                    cipherText = Encoding.Unicode.GetString(ms.ToArray());
                }
            }
            return cipherText;
        }

        public string SendSMS(string Mobile, string Message)
        {
            if (ConfigurationManager.AppSettings["SendSMS"].ToString() == "Y")
            {
                if (Mobile == "")
                {
                    return "Mobile No. is not valid";
                }
                if (Mobile != "")
                {
                    try
                    {
                        Int64 mobno = Convert.ToInt64(Mobile);
                        int lngth = mobno.ToString().Length;
                        if (lngth < 10 || lngth > 10)
                        {
                            return "Mobile No. is not valid";
                        }
                    }
                    catch (Exception ex)
                    {
                        return "Mobile No. is not valid";
                    }
                }


                using (var web = new System.Net.WebClient())
                {
                    try
                    {


                        //string url = "http://api.mVaayoo.com/mvaayooapi/MessageCompose?user=manageredp-ie@telangana.gov.in:tsbie@2017&senderID=TSBOIE&receipientno=" + Mobile + "&msgtxt=" + System.Web.HttpUtility.UrlEncode(Message, "UTF-8") + "&state=4";
                        string url = "http://api.mVaayoo.com/mvaayooapi/MessageCompose?user=manageredp-ie@telangana.gov.in:tsbie@2017&senderID=TSBOIE&receipientno=" + Mobile + "&msgtxt=" + System.Web.HttpUtility.UrlEncode(Message) + "&state=4";
                        //string url = "http://api.mVaayoo.com/mvaayooapi/MessageCompose?user=manageredp-ie@telangana.gov.in:tsbie@2017&senderID=TSBOIE&receipientno=" + Mobile + "&msgtxt=" + Message + "&state=4";

                        string result = web.DownloadString(url);
                        return result;
                    }
                    catch (Exception ex)
                    {
                        //Catch and show the exception if needed. Donot supress. :)  
                        return "Error - " + ex.Message.ToString();
                    }
                }
            }
            else return "SMS functionality not active";

            //return "SMS functionality not active";

        }
        public void createlog(string Message)
        {
            try
            {
                String str = AppDomain.CurrentDomain.BaseDirectory + "Connectionlogfilepath " + System.DateTime.Now.ToString("ddMMMyyyy") + ".txt";
                using (System.IO.StreamWriter file = new System.IO.StreamWriter(str, true))
                {
                    try
                    {
                        file.WriteLine(System.DateTime.Now.ToString());
                        file.WriteLine(Message);
                        file.WriteLine("");
                    }
                    catch (Exception ex)
                    {

                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }
        public class RamdomString
        {
            private static Random random = new Random();

            public static string GetString()
            {
                var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
                var result = new string(
                    Enumerable.Repeat(chars, 8)
                              .Select(s => s[random.Next(s.Length)])
                              .ToArray());

                return result;
            }
        }
    }
}