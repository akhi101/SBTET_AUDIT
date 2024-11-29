using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using SoftwareSuite.Models.Database;
using static System.Windows.Forms.VisualStyles.VisualStyleElement;

public class MailOTPServiceController
{
    // A dictionary to store OTP attempts, email, and timestamp information
    private static Dictionary<string, OTPData> otpStore = new Dictionary<string, OTPData>();

    // Define the max number of attempts allowed
    private const int MaxAttempts = 3;
    // Define the expiration time for OTP (e.g., 5 minutes)
    private static TimeSpan OTPExpiryTime = TimeSpan.FromMinutes(5);

    // OTP Data class to store attempts, the OTP, and the timestamp of when OTP was generated
    public class OTPData
    {
        public string OTP { get; set; }
        public int AttemptCount { get; set; }
        public DateTime GeneratedTime { get; set; }
    }

    // Method to send OTP (for demonstration purposes)
    public string SendMailOTP(string email, string otp)
    {
        otpStore[email] = new OTPData
        {
            OTP = otp,
            AttemptCount = 0,
            GeneratedTime = DateTime.Now
        };

        return "Message Sending Failed";
    }

    // Method to verify OTP
    public string VerifyMailOTP(string Pin,string Email, string Otp)
    {

        var otpData = otpStore[Email];

        // Check if the OTP has expired
        if (DateTime.Now - otpData.GeneratedTime > OTPExpiryTime)
        {
            //otpStore.Remove(Email);  // Remove expired OTP data
            return "OTP has expired. Please request a new OTP.";
        }

        // If user has exceeded max attempts, invalidate OTP
        if (otpData.AttemptCount >= MaxAttempts)
        {
            return "OTP is invalid due to multiple failed attempts.";
        }

        // Check if the entered OTP is correct
        if (Otp == otpData.OTP)
        {

            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@Pin", Pin);
                param[1] = new SqlParameter("@Email", Email);
                param[2] = new SqlParameter("@OTP", Otp);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SFP_CheckGenuineEmailLog", param);

                var plaintext = dt.Tables[0].Rows[0]["ResponseCode"].ToString();

                var plaintext1 = dt.Tables[0].Rows[0]["ResponseDescription"].ToString();

                var plaintext2 = "status";

                var plaintext3 = "description";

                string key = "iT9/CmEpJz5Z1mkXZ9CeKXpHpdbG0a6XY0Fj1WblmZA="; // AES-256 key
                string iv = "u4I0j3AQrwJnYHkgQFwVNw==";     // AES IV

                string resstatus = Encryption.Encrypt(plaintext, key, iv);

                string resdescription = Encryption.Encrypt(plaintext1, key, iv);
                string Status = Encryption.Encrypt(plaintext2, key, iv);
                string Description = Encryption.Encrypt(plaintext3, key, iv);

                if (dt.Tables[0].Rows[0]["ResponseCode"].ToString() == "200")
                {
                    //otpStore.Remove(Email);  // Remove the OTP after successful validation
                    return "{\"" + Status + "\" : \"" + resstatus + "\", \"" + Description + "\" : \"" + resdescription + "\"}";
                    //return "OTP Evaluation Completed successfully.";
                }
                else
                {
                    return "{\"" + Status + "\" : \"" + resstatus + "\", \"" + Description + "\" : \"" + resdescription + "\"}";
                }
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }
        else
        {
            // Increment the attempt count
            otpData.AttemptCount++;
            return "Incorrect OTP.";
            //return $"Incorrect OTP. You have {MaxAttempts - otpData.AttemptCount} attempts left.";
        }
    }
}
