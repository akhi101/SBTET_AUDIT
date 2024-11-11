using Org.BouncyCastle.Crypto.Engines;
using Org.BouncyCastle.Crypto.Paddings;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace SoftwareSuite.Models.Security
{
    public class Encryption
    {
        internal static RSACryptoServiceProvider rsa_public = null;

        public static string GetEncryptedText(string PlainStringToEncrypt, string Certificate_key)
        {
            //X509Certificate2 x509_2 = new X509Certificate2(Certificate_path);//"TA_Certificate.cer"
           
            try
            {
                string PlainString = PlainStringToEncrypt.Trim();
                byte[] cipherbytes = Convert.FromBase64String(PlainString);

                //RSACryptoServiceProvider rsa = (RSACryptoServiceProvider)x509_2.PublicKey.Key;
                //byte[] cipher = rsa.Encrypt(cipherbytes, false);      
                rsa_public = new System.Security.Cryptography.RSACryptoServiceProvider(); ;
                rsa_public.FromXmlString(Certificate_key);//"<RSAKeyValue><Modulus>397t27BIgRjBdz+CNC+laz+5GG9+HP4ggSO5cDvGzut/F2sApMx37G3c9dHyr2AZ7MAysDubZ3n6JgebT93vdftAypH/N9Tn7MuILfyGCuMBJyzCXEyaHDJuwCVQA26WEB39egB1apEGG3057H7Pa6krphB/5u+C7Fg7OPHkwmWfgC767/nwlmxbaB32LrfxemWlKQ1RaIcnhz8fygGzWnZslesRgOR4dPNpTV2mWUaPxRVdVJo6RarszeWYwubv6w3FV6MvhrQeVM/RvickeDH/HMB7fcBe1WWzXOZlTZ0ekYnVxu8o0NmK/W9pv8xMHFKZgm+nqX0jAXWoouzN+Q==</Modulus><Exponent>AQAB</Exponent></RSAKeyValue>"
                byte[] cipher = rsa_public.Encrypt(cipherbytes, false);

                return Convert.ToBase64String(cipher);
            }
            catch (Exception e)
            {
                //Hadle exception
                throw e;
            }
        }

        public static string AESEncryption(string plain, string key, bool fips)
        {
            BCEngine bcEngine = new BCEngine(new AesEngine(), Encoding.UTF8);
            bcEngine.SetPadding(new Pkcs7Padding());
            return bcEngine.Encrypt(plain, key);
        }

    }
}
