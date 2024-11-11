using Org.BouncyCastle.Crypto.Engines;
using Org.BouncyCastle.Crypto.Paddings;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace SoftwareSuite.Models.Security
{
    public class Decryption
    {

        // *** *** *** Decrypt the data with password *** *** *** //
        public static string Decrypt_usingpassword(string encrypted_string)
        {
            byte[] cipherBytes = Convert.FromBase64String(encrypted_string);
            PasswordDeriveBytes pdb = new PasswordDeriveBytes("Tr@ns@ction An@lysts", new byte[] { 0x49, 0x76, 0x61, 0x6e, 0x20, 0x4d, 0x65, 0x64, 0x76, 0x65, 0x64, 0x65, 0x76 });
            byte[] decryptedData = Decrypt(cipherBytes, pdb.GetBytes(32), pdb.GetBytes(16));

            string abc =System.Text.Encoding.Unicode.GetString(decryptedData);
            return System.Text.Encoding.Unicode.GetString(decryptedData);
            
        }

        internal static byte[] Decrypt(byte[] encrypted_chipher_Data, byte[] Key, byte[] IV)
        {
            MemoryStream ms = new MemoryStream();
            Rijndael alg = Rijndael.Create();
            alg.Key = Key;
            alg.IV = IV;
            CryptoStream cs = new CryptoStream(ms, alg.CreateDecryptor(), CryptoStreamMode.Write);
            cs.Write(encrypted_chipher_Data, 0, encrypted_chipher_Data.Length);
            cs.Close();
            byte[] decryptedData = ms.ToArray();
            return decryptedData;
        }


        // *** *** *** Decrypt the data using certificate *** *** *** //

        public static RSACryptoServiceProvider rsa_private = null;

        public static string GetDecryptedText(string EncryptedStringToDecrypt, string Certificate_Key)
        {
            //X509Certificate2 x509_2 = new X509Certificate2("TA_Private.pfx", "prakash@!@");
            try
            {
                byte[] cipherbytes = Convert.FromBase64String(EncryptedStringToDecrypt);

                //RSACryptoServiceProvider rsa = (RSACryptoServiceProvider)x509_2.PrivateKey;
                //byte[] plainbytes = rsa.Decrypt(cipherbytes, false);
                rsa_private = new System.Security.Cryptography.RSACryptoServiceProvider();
                rsa_private.FromXmlString(Certificate_Key);//"<RSAKeyValue><Modulus>397t27BIgRjBdz+CNC+laz+5GG9+HP4ggSO5cDvGzut/F2sApMx37G3c9dHyr2AZ7MAysDubZ3n6JgebT93vdftAypH/N9Tn7MuILfyGCuMBJyzCXEyaHDJuwCVQA26WEB39egB1apEGG3057H7Pa6krphB/5u+C7Fg7OPHkwmWfgC767/nwlmxbaB32LrfxemWlKQ1RaIcnhz8fygGzWnZslesRgOR4dPNpTV2mWUaPxRVdVJo6RarszeWYwubv6w3FV6MvhrQeVM/RvickeDH/HMB7fcBe1WWzXOZlTZ0ekYnVxu8o0NmK/W9pv8xMHFKZgm+nqX0jAXWoouzN+Q==</Modulus><Exponent>AQAB</Exponent><P>755his80+evruq3UFiQrn13UpyFNc+MZGuG0L8sfy5G18XO4ufvccJW4vymV+qAVPY7fLy89GyiZPO0w1KmwcwcLP3z3Iihk00/NMlITz5Q2srUm3Ja/VSesxPNbP71Y21OWwVAuLbzkFsCqFzIW4OkarXC6K6LYAs6qSirhCkM=</P><Q>7yzw/hwxWn3PY7zvAZZJrVu1onJQqtzA32+eyb6n9fIfhKMiweWehpRcexxSrzmG6DauHAUbPXOBUXPTrrIw54jZhUAUvaBYRnoIhKJoxD77ZjzrjzZ7hs9uHV/dbjpUL5Nqj/JNfJ4ccvsPHzWVvF+vXyqL9m6iC8tu/A6dmRM=</Q><DP>rYofStDWpUpf50uNlpuLnFfwczqDRbLrs7RTM2oBFQXqp3wQBWKLPF6y9n+/x0u5FmQq75lewBSfJqkB/IMI78XiN5DhyzNGEmRxUEhxYJ0PIE5iXtAushWR4vH83CTd/bqELG1NhIKRDolqpnH4b9tjHsnNi1zc5OuYGS8E3NE=</DP><DQ>IuOTY/4I1QJ1Nj9hPgIGTVuLa17xlXsOR4moyBUfuyjOoDKL52zvawJJW0wOY7EolMclLsEv8A7hVlhnEJy9tYio8l8ep2q0ddNnWrG2RqpJUeihFAsGievITFCnpGSt0yLV8JmP5BXMYJlu40aVyRzMID28nP4WdVH/ppUbODE=</DQ><InverseQ>J9pxt0CnsMWM6xxPslZYIKqj3Zcg2KFVyg2v1yKdz6FL9JUNOyd200avMUvTBeTQwQdk0cn6CHCDYTvRbm4dScLVU7YGce/N1Vu/t4wvWlEyEq1gMx3bo+2IiN5UnEkDKQ0riI5E486jjvv/2Z84/ynFYfvr0TfYfq3dQul+XMc=</InverseQ><D>TFbsrVlzn/IdJtjVQY5tziCwsZBzZNeTpfXUqlz38l+DuyyVz5yZ2FmuW3T4WK1gqcbwggARgjup/YXihF2d5pGDCpC2gwdq/uh4y5Ws79Fw9zbgIDFO7AaWlZcjrcfsDBrt8MhvQaOqfX06X1buzDun0r0VoF5UOtvrdgOmilMRx5rUlpLvUp4tugdejC6dl9Y1aMO+dp53KEga0xPvT80bwUBDOVT07d7OErDl2XL3KlfwNmfA192PFXm7nqHcyHU264BlhNXTCsE2mUY8hMduaWdpmjws4DiLB83hEsEHM8PRzIjFutIBB7Nl1ssXBrMtuTYDhE6oioaKWIFksQ==</D></RSAKeyValue>"
                byte[] plainbytes = rsa_private.Decrypt(cipherbytes, false);

                return Convert.ToBase64String(plainbytes);
            }
            catch (Exception e)
            {
                //Hadle exception
                throw e;
            }
        }

        public static string AES_Decryption(string encrypted_text, string Key, bool flps)
        {
            BCEngine bcEngine = new BCEngine(new AesEngine(), Encoding.UTF8);
            bcEngine.SetPadding(new Pkcs7Padding());
            return bcEngine.Decrypt(encrypted_text, Key);
        }

    }
}
