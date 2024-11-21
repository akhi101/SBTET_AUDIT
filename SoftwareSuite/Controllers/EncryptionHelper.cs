using System;
using System.IO;
using System.Security.Cryptography;
using System.Text;

public class Encryption
{
    public static string Encrypt(string plainText, string base64Key, string base64IV)
    {
        // Decode Base64-encoded key and IV
        byte[] key = Convert.FromBase64String(base64Key);
        byte[] iv = Convert.FromBase64String(base64IV);

        // Validate key and IV lengths
        if (key.Length != 32) // 32 bytes = 256 bits
        {
            throw new ArgumentException("Invalid key length. Key must be 32 bytes for AES-256.");
        }
        if (iv.Length != 16) // 16 bytes = 128 bits
        {
            throw new ArgumentException("Invalid IV length. IV must be 16 bytes.");
        }

        using (Aes aes = Aes.Create())
        {
            aes.Key = key;
            aes.IV = iv;

            using (var encryptor = aes.CreateEncryptor(aes.Key, aes.IV))
            {
                using (var ms = new MemoryStream())
                {
                    using (var cs = new CryptoStream(ms, encryptor, CryptoStreamMode.Write))
                    {
                        using (var sw = new StreamWriter(cs))
                        {
                            sw.Write(plainText);
                        }
                    }
                    return Convert.ToBase64String(ms.ToArray());
                }
            }
        }
    }
}
