using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using SoftwareSuite.Models.Database;

public class OTPServiceController
{
    // A dictionary to store OTP attempts, mobile number, and timestamp information
    private static Dictionary<string, OTPData> otpStore = new Dictionary<string, OTPData>();

    // Define the max number of attempts allowed
    private const int MaxAttempts = 3;
    // Define the expiration time for OTP (e.g., 5 minutes)
    private static TimeSpan OTPExpiryTime = TimeSpan.FromMinutes(1);

    // OTP Data class to store attempts, the OTP, and the timestamp of when OTP was generated
    public class OTPData
    {
        public string OTP { get; set; }
        public int AttemptCount { get; set; }
        public DateTime GeneratedTime { get; set; }
    }

    // Method to send OTP (for demonstration purposes)
    public string SendOTP(string mobileNumber, string otp)
    {
        otpStore[mobileNumber] = new OTPData
        {
            OTP = otp,
            AttemptCount = 0,
            GeneratedTime = DateTime.Now
        };

        return "OTP Sent";
    }

    // Method to verify OTP
    public string VerifyOTP(string StudentPhoneNumber, string Otp, string Pin)
    {
        // Check if the user exists in the store
        //if (!otpStore.ContainsKey(StudentPhoneNumber))
        //{
        //    return "OTP not generated. Please request an OTP first.";
        //}

        var otpData = otpStore[StudentPhoneNumber];

        // Check if the OTP has expired
        if (DateTime.Now - otpData.GeneratedTime > OTPExpiryTime)
        {
            otpStore.Remove(StudentPhoneNumber);  // Remove expired OTP data
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
            otpStore.Remove(StudentPhoneNumber);  // Remove the OTP after successful validation
            //return "OTP Evaluation Completed successfully.";

            try {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@Pin", Pin);
                param[1] = new SqlParameter("@StudentPhoneNumber", StudentPhoneNumber);
                param[2] = new SqlParameter("@Otp", Otp);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SET_UpdateStudentPhone", param);
                var plaintext = dt.Tables[0].Rows[0]["StatusCode"].ToString();

                var plaintext1 = dt.Tables[0].Rows[0]["StatusDescription"].ToString();

                string key = "iT9/CmEpJz5Z1mkXZ9CeKXpHpdbG0a6XY0Fj1WblmZA="; // AES-256 key
                string iv = "u4I0j3AQrwJnYHkgQFwVNw==";     // AES IV

                string status = Encryption.Encrypt(plaintext, key, iv);

                string description = Encryption.Encrypt(plaintext1, key, iv);

                if (dt.Tables[0].Rows[0]["StatusCode"].ToString() == "200")
                {

                    return "{\"status\" : \"" + status + "\",   \"description\" : \"" + description + "\"}";
                }
                else
                {
                    return "{\"status\" : \"" + status + "\",   \"description\" : \"" + description + "\"}";
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
