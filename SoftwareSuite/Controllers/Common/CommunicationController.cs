using MimeKit;
using MailKit.Net.Smtp;
using MailKit.Security;
using Newtonsoft.Json;
using RestSharp;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
//using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using MimeKit.Text;
using System.Net.Security;
using System.Data.SqlClient;
using SoftwareSuite.Models.Database;

namespace SoftwareSuite.Controllers.Common
{
    public class CommunicationController : ApiController
    {
        [HttpGet, ActionName("SendSms")]
        public async Task<string> SendSms(string mobile, string message,string templateid)
        {
            var env = ConfigurationManager.AppSettings["SMS_ENV"].ToString();
            try
            {              
                ServicePointManager.ServerCertificateValidationCallback += (sender, cert, chain, sslPolicyErrors) => { return true; };
                if (env == "PROD") {
                    var url = ConfigurationManager.AppSettings["SMS_URL"].ToString();
                    var smsusername = ConfigurationManager.AppSettings["SMS_Service_Username"].ToString().Trim();
                    var smspassword = ConfigurationManager.AppSettings["SMS_Service_Password"].ToString().Trim();
                    // var url = "http://smsgw.sms.gov.in/failsafe/HttpLink";
                    var client = new HttpClient();
                    var res = await client.GetAsync(url + $"?username={smsusername}&pin={smspassword}&mnumber={mobile}&message={HttpUtility.UrlEncode(message)}&signature=TSBTET&dlt_template_id={templateid}&dlt_entity_id=1001451340000019208");
                    var resContent = await res.Content.ReadAsStringAsync();
                    return resContent;

                } else if (env == "DEV") {
                    var url1 = ConfigurationManager.AppSettings["SMS_API"].ToString();
                    var client = new HttpClient();
                    var res = await client.GetAsync(url1 + $"?mobile={mobile}&message={HttpUtility.UrlEncode(message)}&templateid={templateid}");
                    var resContent = await res.Content.ReadAsStringAsync();
                    return resContent;                  
                }
                return "Not Supported Environment";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }

        [HttpGet, ActionName("SendSmsTg")]
        public async Task<string> SendSmsTg(string mobile, string message, string templateid)
        {
            var env = ConfigurationManager.AppSettings["SMS_ENV"].ToString();
            try
            {
                ServicePointManager.ServerCertificateValidationCallback += (sender, cert, chain, sslPolicyErrors) => { return true; };
                if (env == "PROD")
                {
                    var url = ConfigurationManager.AppSettings["SMS_URL"].ToString();
                    var smsusername = ConfigurationManager.AppSettings["SMS_Service_Username"].ToString().Trim();
                    var smspassword = ConfigurationManager.AppSettings["SMS_Service_Password"].ToString().Trim();
                    // var url = "http://smsgw.sms.gov.in/failsafe/HttpLink";
                    var client = new HttpClient();
                    var res = await client.GetAsync(url + $"?username={smsusername}&pin={smspassword}&mnumber={mobile}&message={HttpUtility.UrlEncode(message)}&signature=SBTETG&dlt_template_id={templateid}&dlt_entity_id=1001451340000019208");
                    var resContent = await res.Content.ReadAsStringAsync();
                    return resContent;

                }
                else if (env == "DEV")
                {
                    var url1 = ConfigurationManager.AppSettings["SMS_API"].ToString();
                    var client = new HttpClient();
                    var res = await client.GetAsync(url1 + $"?mobile={mobile}&message={HttpUtility.UrlEncode(message)}&templateid={templateid}");
                    var resContent = await res.Content.ReadAsStringAsync();
                    return resContent;
                }
                return "Not Supported Environment";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }

        [HttpGet, ActionName("BulkSendSms")]
        public async Task<string> BulkSendSms(string mobile, string message)
        {
            var url = ConfigurationManager.AppSettings["SMS_URL"].ToString();
            var smsusername = ConfigurationManager.AppSettings["SMS_Service_Username"].ToString().Trim();
            var smspassword = ConfigurationManager.AppSettings["SMS_Service_Password"].ToString().Trim();
            var client = new HttpClient();
            var res = await client.GetAsync(url + $"?username={smsusername}&pin={smspassword}&mnumber=91{mobile}&message={HttpUtility.UrlEncode(message)}&signature=TSGOVT");
            var resContent = await res.Content.ReadAsStringAsync();
            return resContent;
        }
        public class SmsMobileMessage
        {
            public string Mobile { get; set; }
            public string Message { get; set; }
        }


        [HttpPost, ActionName("BulkListSendSms")]
        public async Task<string> BulkListSendSms([FromBody]JsonObject data)
        {
            JsonArray dataInArray = JsonConvert.DeserializeObject<JsonArray>(JsonConvert.SerializeObject(data["data"]));
            var ToUpdateSmsMobileMessageListData = new List<SmsMobileMessage>();
            int size = Convert.ToInt32(dataInArray.Count);
            for (int i = 0; i < size; i++)
            {
                ToUpdateSmsMobileMessageListData.Add(JsonConvert.DeserializeObject<SmsMobileMessage>(JsonConvert.SerializeObject(dataInArray[i])));
            }
            var url = ConfigurationManager.AppSettings["SMS_URL"].ToString();
            var smsusername = ConfigurationManager.AppSettings["SMS_Service_Username"].ToString().Trim();
            var smspassword = ConfigurationManager.AppSettings["SMS_Service_Password"].ToString().Trim();
            // var url = "http://smsgw.sms.gov.in/failsafe/HttpLink";
            //var client = new RestClient();
            var client = new HttpClient();
            var req = new RestRequest(url);
            int count = 0;
            for (int i = 0; i < ToUpdateSmsMobileMessageListData.Count; i++)
            {

                var res = await client.GetAsync(url + $"?username={smsusername}&pin={smspassword}&mnumber=91{ToUpdateSmsMobileMessageListData[i].Mobile}&message={HttpUtility.UrlEncode(ToUpdateSmsMobileMessageListData[i].Message)}&signature=TSBTET&dlt_template_id=TSBTET&dlt_entity_id=1001451340000019208");
                var resContent = await res.Content.ReadAsStringAsync();


                //req.Method = Method.GET;
                //req.AddQueryParameter("username", smsusername);
                //req.AddQueryParameter("pin", smspassword);
                //req.AddQueryParameter("mnumber", $"91{ToUpdateSmsMobileMessageListData[i].Mobile}");
                //req.AddQueryParameter("message", ToUpdateSmsMobileMessageListData[i].Message);
                //req.AddQueryParameter("signature", "TSGOVT");
                //var res = client.Get(req);
                count++;
            }

            return count.ToString();
        }

        public class MailReq
        {

            public string From { get; set; }
            public string To { get; set; }
            public string cc { get; set; }
            public string Subject { get; set; }
            public string Message { get; set; }        
            public List<attachmentlist> attachmentdata { get; set; }


        }

        public class OtpReq
        {

            public string From { get; set; }
            public string To { get; set; }
            public string cc { get; set; }
            public string Subject { get; set; }
            public string Message { get; set; }
            public string Pin { get; set; }
            //public List<attachmentlist> attachmentdata { get; set; }


        }

        public class MailRequest
        {

            public string From { get; set; }
            public string To { get; set; }
           
            public string Subject { get; set; }
            public string Message { get; set; }
            public string attachmentdata { get; set; }


        }
        public class attachmentlist
        {

            public string attachName { get; set; }
            public string attachpath { get; set; }
        }


        [HttpPost, ActionName("SendEmails")]
        public async Task<object> SendEmails([FromBody]List<MailReq> data)
        {

            var resList = new List<string>();
            foreach (var item in data)
            {
                var res = await SendEmail(item);
                resList.Add(res);
            }
            return resList;
        }

        [HttpPost, ActionName("SendEmail")]
        public async Task<string> SendEmail([FromBody] MailReq request)
        {
        try
            {
                var message = new MimeMessage();
                //message.From.Add(new MailboxAddress("Your Name", "username@gmail.com"));
                //message.To.Add(new MailboxAddress("Recipient's Name", "recipient@yahoo.com"));
                //message.Subject = "This is a test message";

              
               
                //builder.Attachments.Add(@"C:\path\to\attachment");

                //message.Body = builder.ToMessageBody();
                //MailMessage message = new MailMessage();
            SmtpClient smtp = new SmtpClient();
                smtp.ServerCertificateValidationCallback = (mysender, certificate, chain, sslPolicyErrors) => { return true; };
                smtp.CheckCertificateRevocation = false;
                smtp.Connect("smtp.mail.gov.in", 465,SecureSocketOptions.Auto);              
                smtp.Timeout = 200000;             
          
            //for (int i = 0; i < size; i++){                
            //    System.Net.Mime.ContentType contentType = new System.Net.Mime.ContentType();
            //    contentType.MediaType = System.Net.Mime.MediaTypeNames.Application.Octet;
            //    contentType.Name = request.attachmentdata[i].attachName;
            //    message.Attachments.Add(new Attachment(contentType.Name = request.attachmentdata[i].attachpath, contentType));  // attachment
            //}
                message.From.Add(new MailboxAddress(request.From));
                message.To.Add(new MailboxAddress(request.To));
                message.Cc.Add(new MailboxAddress(request.cc));
                //    message.From = new MailAddress(request.From);
                //message.To.Add(new MailAddress(request.To));
                //message.CC.Add(new MailAddress(request.cc));
                //message.Body = new TextPart(TextFormat.Html)
                //{
                //    Text = request.Message
                //};
                message.Subject = request.Subject;
                var builder = new BodyBuilder { HtmlBody = request.Message };
                int size = request.attachmentdata.Count;
                // builder.TextBody = request.Message;
                for (int i = 0; i < size; i++)
                {
                    //System.Net.Mime.ContentType contentType = new System.Net.Mime.ContentType();
                    //contentType.MediaType = System.Net.Mime.MediaTypeNames.Application.Octet;
                    //contentType.Name = request.attachmentdata[i].attachName;
                    //  MemoryStream attachstream = new MemoryStream(File.ReadAllBytes(request.attachmentdata[i].attachpath));
                    builder.Attachments.Add(request.attachmentdata[i].attachpath);  // attachment
                }
                message.Body = builder.ToMessageBody();
                var mailusername = ConfigurationManager.AppSettings["mail_Service_Username"].ToString().Trim();
                var mailpassword = ConfigurationManager.AppSettings["mail_Service_Password"].ToString().Trim();

                smtp.Authenticate(mailusername, mailpassword);             
                //  smtp.Credentials = new NetworkCredential(mailusername, mailpassword);               
                //smtp.DeliveryMethod = SmtpDeliveryMethod.Network;
                //message.BodyEncoding = UTF8Encoding.UTF8;
                //message.DeliveryNotificationOptions = DeliveryNotificationOptions.OnFailure;
                //message.Sender = new MailAddress("noreply@sbtet.com", "No Reply");
                smtp.Send(message);

                smtp.Disconnect(true);
               // smtp.Send(message);
            return "success";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpPost, ActionName("SendMails")]
        public async Task<object> SendMails([FromBody]List<MailRequest> data)
        {

            var resList = new List<string>();
            foreach (var item in data)
            {
                var res = await SendMail(item);
                resList.Add(res);
            }
            return resList;
        }

        [HttpPost, ActionName("SendOTP")]
        public async Task<string> SendOTP([FromBody] OtpReq request)
        {
            try
            {
                var message = new MimeMessage();
                SmtpClient smtp = new SmtpClient();
                smtp.ServerCertificateValidationCallback = (mysender, certificate, chain, sslPolicyErrors) => { return true; };
                smtp.CheckCertificateRevocation = false;
                // smtp.Connect("smtp.mail.gov.in", 465, SecureSocketOptions.Auto);
                smtp.Connect("smtpsgwhyd.nic.in", 465, SecureSocketOptions.Auto);
                
                smtp.Timeout = 200000;

                message.From.Add(new MailboxAddress(request.From));
                message.To.Add(new MailboxAddress(request.To));
               
                message.Subject = request.Subject;
                var strNewPassword = GeneratePassword().ToString();
                var builder = new BodyBuilder { HtmlBody = "Your Verification Code for Genuineness Check is " + strNewPassword };
                //int size = request.attachmentdata.Count;
                //// builder.TextBody = request.Message;
                //for (int i = 0; i < size; i++)
                //{

                //    builder.Attachments.Add(request.attachmentdata[i].attachpath);  // attachment
                //}
              
                message.Body = builder.ToMessageBody();                    //= "Your Verification Code is "+strNewPassword
                //builder.ToMessageBody();
                var mailusername = ConfigurationManager.AppSettings["mail_Service_Username"].ToString().Trim();
                var mailpassword = ConfigurationManager.AppSettings["mail_Service_Password"].ToString().Trim();

                smtp.Authenticate(mailusername, mailpassword);
               
                smtp.Send(message);

                smtp.Disconnect(true);
                // smtp.Send(message);
                Set_GenuinenessEmailLog(request.Pin, request.To, strNewPassword);

                return  "Success";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpGet, ActionName("Set_GenuinenessEmailLog")]
        public string Set_GenuinenessEmailLog(string Pin, string Email, string OTP)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@Pin", Pin);
                param[1] = new SqlParameter("@Email", Email);
                param[2] = new SqlParameter("@OTP", OTP);
                var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SFP_GenuineEmailLog", param);
                return JsonConvert.SerializeObject(dt);

            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_SFP_GenuineEmailLog", 0, ex.Message);
                return ex.Message;
            }
        }

        public string GeneratePassword()
        {
            string PasswordLength = "5";
            string NewPassword = "";

            string allowedChars = "";
            allowedChars = "1,2,3,4,5,6,7,8,9,0";
            //allowedChars += "A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,";
            //allowedChars += "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,";


            char[] sep = {
            ','
        };
            string[] arr = allowedChars.Split(sep);


            string IDString = "";
            string temp = "";

            Random rand = new Random();

            for (int i = 0; i < Convert.ToInt32(PasswordLength); i++)
            {
                temp = arr[rand.Next(0, arr.Length)];
                IDString += temp;
                NewPassword = IDString;

            }
            return NewPassword;
        }




        [HttpPost, ActionName("SendMail")]
        public async Task<string> SendMail([FromBody] MailRequest request)
        {
            try
            {
                var message = new MimeMessage();

                //message.From.Add(new MailboxAddress("Your Name", "username@gmail.com"));
                //message.To.Add(new MailboxAddress("Recipient's Name", "recipient@yahoo.com"));
                //message.Subject = "This is a test message";

                //var attachment = new MimePart("image", "gif")
                //{
                //    Content = new MimeContent(File.OpenRead(path), ContentEncoding.Default),
                //    ContentDisposition = new ContentDisposition(ContentDisposition.Attachment),
                //    ContentTransferEncoding = ContentEncoding.Base64,
                //    FileName = Path.GetFileName(path)
                //};




                //builder.Attachments.Add(@"C:\path\to\attachment");

                //message.Body = builder.ToMessageBody();
                //MailMessage message = new MailMessage();smtp.mail.gov.in
                SmtpClient smtp = new SmtpClient();
                // smtp.Connect("relay.emailgov.in", 465, SecureSocketOptions.Auto);
                smtp.Connect("smtpsgwhyd.nic.in", 465, SecureSocketOptions.Auto);
                
                smtp.Timeout = 200000;

                //for (int i = 0; i < size; i++){                
                //    System.Net.Mime.ContentType contentType = new System.Net.Mime.ContentType();
                //    contentType.MediaType = System.Net.Mime.MediaTypeNames.Application.Octet;
                //    contentType.Name = request.attachmentdata[i].attachName;
                //    message.Attachments.Add(new Attachment(contentType.Name = request.attachmentdata[i].attachpath, contentType));  // attachment
                //}
                message.From.Add(new MailboxAddress(request.From));
                message.To.Add(new MailboxAddress(request.To));
                //    message.From = new MailAddress(request.From);
                //message.To.Add(new MailAddress(request.To));
                //message.CC.Add(new MailAddress(request.cc));
                //message.Body = new TextPart(TextFormat.Html)
                //{
                //    Text = request.Message
                //};
                message.Subject = request.Subject;
                var builder = new BodyBuilder { HtmlBody = request.Message };
                if(request.attachmentdata != "Attachment") {
                builder.Attachments.Add(request.attachmentdata);
                }
                message.Body = builder.ToMessageBody();

                var mailusername = ConfigurationManager.AppSettings["mail_Service_Username"].ToString().Trim();
                var mailpassword = ConfigurationManager.AppSettings["mail_Service_Password"].ToString().Trim();

                smtp.Authenticate(mailusername, mailpassword);
                //  smtp.Credentials = new NetworkCredential(mailusername, mailpassword);               
                //smtp.DeliveryMethod = SmtpDeliveryMethod.Network;
                //message.BodyEncoding = UTF8Encoding.UTF8;
                //message.DeliveryNotificationOptions = DeliveryNotificationOptions.OnFailure;
                //message.Sender = new MailAddress("noreply@sbtet.com", "No Reply");
                smtp.Send(message);

                smtp.Disconnect(true);
                // smtp.Send(message);
                return "success";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }


    }
}
