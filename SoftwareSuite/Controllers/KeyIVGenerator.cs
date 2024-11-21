using System;
using System.Security.Cryptography;

public static class KeyIVGenerator
{
    public static string GenerateKey(int sizeInBytes)
    {
        using (var rng = RandomNumberGenerator.Create())
        {
            byte[] key = new byte[sizeInBytes];
            rng.GetBytes(key);
            return Convert.ToBase64String(key);
        }
    }

    public static string GenerateIV()
    {
        using (var rng = RandomNumberGenerator.Create())
        {
            byte[] iv = new byte[16]; // 16 bytes for AES IV
            rng.GetBytes(iv);
            return Convert.ToBase64String(iv);
        }
    }
}
