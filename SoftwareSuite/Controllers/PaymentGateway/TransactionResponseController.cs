using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using SoftwareSuite.Models.Security;

namespace SoftwareSuite.Controllers.PaymentGateway
{
    public class TransactionResponseController : ApiController
    {
        protected string encrypted_data;
        protected string skey_encryption;
        RijndaelManaged sessionKey = new RijndaelManaged();
        public async Task<HttpResponseMessage> TwalletTxnResponse()
        {
            HttpResponseMessage response = new HttpResponseMessage();
            try
            {
              
                StreamReader sr = new StreamReader(HttpContext.Current.Request.InputStream, System.Text.Encoding.Default);
                string backstr = HttpUtility.HtmlDecode(sr.ReadToEnd());
                NameValueCollection nvc;
                nvc = HttpContext.Current.Request.Form;
                string Data = nvc["Data"];
                string Skey = nvc["Skey"];
                string private_certificate_Key = Decryption.Decrypt_usingpassword(ConfigurationManager.AppSettings["SBTET_Twallet_privatekey"].ToString());   // private key
                string Decrypted_skey = Decryption.GetDecryptedText(Skey, private_certificate_Key);
                string Decrypted_data = Decryption.AES_Decryption(Data, Decrypted_skey, false);
                string strDecrypted_data = Encoding.Default.GetString(Convert.FromBase64String(Decrypted_data));
                response = Request.CreateResponse(HttpStatusCode.OK, strDecrypted_data);
                return response;
            }
            catch (Exception ex) {
                response = Request.CreateResponse(HttpStatusCode.OK, ex.Message);
                return response;
            }
           
        }
    }
}
