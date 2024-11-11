using System;
using System.Configuration;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;

namespace SoftwareSuite.Services
{
    public class SmsService
    {
        public async Task<string> SendSms(string mobile, string message)
        {
            try
            {
                var url = ConfigurationManager.AppSettings["SMS_URL"].ToString();
                var smsusername = ConfigurationManager.AppSettings["SMS_Service_Username"].ToString().Trim();
                var smspassword = ConfigurationManager.AppSettings["SMS_Service_Password"].ToString().Trim();
                var client = new HttpClient();
                var res = await client.GetAsync(url + $"?username={smsusername}&pin={smspassword}&mnumber=91{mobile}&message={HttpUtility.UrlEncode(message)}&signature=TSGOVT");
                var resContent = await res.Content.ReadAsStringAsync();
                return resContent;
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }
    }
}
