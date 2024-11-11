using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System;
using System.Net.Mail;
using System.Net;
using System.Text;
using System.Web.Http;
using System.Threading.Tasks;
using System.Configuration;
using MimeKit;
using System.Net;
using System.Net.Http;
//using System.Net.Mail;

using System.Data.SqlClient;
using SoftwareSuite.Models.Database;
using SoftwareSuite.Controllers.Common;

namespace SoftwareSuite.Controllers
{
    public class EmailController :ApiController
    {
         public class MailRequests
        {

            public string From { get; set; }
            public string To { get; set; }
           
            public string Subject { get; set; }
            public string Message { get; set; }
            public string attachmentdata { get; set; }


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
        public class attachmentlist
        {

            public string attachName { get; set; }
            public string attachpath { get; set; }
        }


        [HttpPost, ActionName("SendRelayMail")]
        public async Task<object> SendRelayMail([FromBody] List<MailReq> data)
        {

            var resList = new List<string>();
            foreach (var item in data)
            {
                var res = await SendEmails(item);
                resList.Add(res);
            }
            return resList;
        }

        [HttpPost, ActionName("SendEmails")]
        public async Task<string> SendEmails([FromBody] MailReq request)
        {
            try
            {
                var mailusername = ConfigurationManager.AppSettings["mail_Service_Username"].ToString().Trim();
                var mailpassword = ConfigurationManager.AppSettings["mail_Service_Password"].ToString().Trim();
                MailMessage message = new MailMessage();
                ServicePointManager.ServerCertificateValidationCallback += (s, ce, ca, p) => true;
                ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;// | SecurityProtocolType.Tls11 | SecurityProtocolType.Tls;
                //SmtpClient smtp = new SmtpClient("relay.nic.in", 465);
                SmtpClient smtp = new SmtpClient("smtpsgwhyd.nic.in", 465);
                
                message.To.Add(new MailAddress(request.To));
                message.From = new MailAddress(mailusername);
                message.To.Add(new MailAddress(request.To));
                if (message.CC.Count > 0) {
                message.CC.Add(new MailAddress(request.cc));
                }
                //var builder = new BodyBuilder { HtmlBody = request.Message };
                //int size = request.attachmentdata.Count;
                //for (int i = 0; i < size; i++)
                //{

                //    message.Attachments.Add(new Attachment(request.attachmentdata[i].attachpath, request.attachmentdata[i].attachName));  // attachment
                //}
                message.Subject = request.Subject;
                message.Body = request.Message;
                message.IsBodyHtml = true;
                smtp.UseDefaultCredentials = false;
                smtp.EnableSsl = true;
                smtp.Credentials = new NetworkCredential(mailusername, mailpassword);
                smtp.DeliveryMethod = SmtpDeliveryMethod.Network;
                smtp.Send(message);
                smtp.Dispose();
                //using (MailMessage mail = new MailMessage(request.From, request.Subject))
                //
                //{
                //    mail.Subject = request.Subject;
                //    mail.Body = request.Message;
                //    var builder1 = new BodyBuilder { HtmlBody = request.Message };
                //    int size1 = request.attachmentdata.Count;
                //    for (int i = 0; i < size1; i++)
                //    {

                //        builder.Attachments.Add(request.attachmentdata[i].attachpath);  // attachment
                //    }

                //    //if (fileUploader.HasFile)
                //    //{
                //    //    string fileName = Path.GetFileName(fileUploader.PostedFile.FileName);
                //    //    mail.Attachments.Add(new Attachment(fileUploader.PostedFile.InputStream, fileName));
                //    //}
                //    //mail.IsBodyHtml = false;
                //    ////SmtpClient smtp = new SmtpClient();
                //    //smtp.Host = "smtp.gmail.com";
                //    //smtp.EnableSsl = true;
                //    //NetworkCredential networkCredential = new NetworkCredential(from, "your gmail password");
                //    //smtp.UseDefaultCredentials = true;
                //    //smtp.Credentials = networkCredential;
                //    //smtp.Port = 587;
                //    smtp.Send(mail);

                var res = "success";

                    return res;
                //}
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpPost, ActionName("SendMails")]
        public async Task<string> SendMails([FromBody] MailReq request)
        {
            try { 
                var mailusername = ConfigurationManager.AppSettings["mail_Service_Username"].ToString().Trim();
                var mailpassword = ConfigurationManager.AppSettings["mail_Service_Password"].ToString().Trim();
                MailMessage message = new MailMessage();
                ServicePointManager.ServerCertificateValidationCallback += (s, ce, ca, p) => true;
                ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;// | SecurityProtocolType.Tls11 | SecurityProtocolType.Tls;
                //     SmtpClient smtp = new SmtpClient("relay.nic.in", 465);
                SmtpClient smtp = new SmtpClient("smtpsgwhyd.nic.in", 465);
                //message.To.Add(new MailAddress(request.To));
                message.From = new MailAddress(mailusername);
                message.To.Add(new MailAddress(request.To));
                message.CC.Add(new MailAddress(request.cc));
                message.IsBodyHtml = true;               
                var builder = new BodyBuilder { HtmlBody = request.Message };
                int size = request.attachmentdata.Count;
                for (int i = 0; i < size; i++)
                {
                 
                    builder.Attachments.Add(request.attachmentdata[i].attachpath);  // attachment
                }
                message.Body = builder.HtmlBody;
                //message.Attachments = builder.Attachments;
                smtp.UseDefaultCredentials = false;
                smtp.EnableSsl = true;
                smtp.Credentials = new NetworkCredential(mailusername, mailpassword);
                smtp.DeliveryMethod = SmtpDeliveryMethod.Network;
                smtp.Send(message);
            
                var res = "success";
              
                    return res;
        }
            catch (Exception ex)
            {
                return ex.Message;
            }
}

        public class OtpReq
        {

            public string From { get; set; }
            public string To { get; set; }
            public string cc { get; set; }
            public string Subject { get; set; }
            //public string Message { get; set; }
            public string Pin { get; set; }
            //public List<attachmentlist> attachmentdata { get; set; }


        }
        [HttpPost, ActionName("SendGenuinenessOTP")]
        public async Task<string> SendGenuinenessOTP([FromBody] OtpReq request)
        {
            try
            {
                CommunicationController CommunicationController = new CommunicationController();
                var strNewPassword = CommunicationController.GeneratePassword().ToString();
                var resp = CommunicationController.Set_GenuinenessEmailLog(request.Pin, request.To, strNewPassword);
                var mailusername = ConfigurationManager.AppSettings["mail_Service_Username"].ToString().Trim();
                var mailpassword = ConfigurationManager.AppSettings["mail_Service_Password"].ToString().Trim();
                MailMessage message = new MailMessage();
                ServicePointManager.ServerCertificateValidationCallback += (s, ce, ca, p) => true;
                ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;// | SecurityProtocolType.Tls11 | SecurityProtocolType.Tls;
                                                                                  // SmtpClient smtp = new SmtpClient("relay.nic.in", 465);
                SmtpClient smtp = new SmtpClient("smtpsgwhyd.nic.in", 465);
             
                message.From = new MailAddress(mailusername);
               
                message.Subject = request.Subject;
                message.To.Add(new MailAddress(request.To));
                message.CC.Add(new MailAddress(request.cc));
                message.IsBodyHtml = true;
                var builder = new BodyBuilder { HtmlBody = "Your Verification Code for Genuineness Check is " + strNewPassword };
               
                message.Body = builder.HtmlBody;
                // message.Body = request.Message;
                smtp.UseDefaultCredentials = false;
                smtp.EnableSsl = true;
                //  message.Attachments=
                smtp.Credentials = new NetworkCredential(mailusername, mailpassword);
                smtp.DeliveryMethod = SmtpDeliveryMethod.Network;
             
                smtp.Send(message);
                var res = "Success";
            

                return res;
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
    }

    //[HttpGet, ActionName("Set_GenuinenessEmailLog")]
    //public HttpResponseMessage Set_GenuinenessEmailLog(string Pin, string Email, string OTP)
    //{
    //    try
    //    {
    //        var dbHandler = new dbHandler();
    //        var param = new SqlParameter[3];
    //        param[0] = new SqlParameter("@Pin", Pin);
    //        param[1] = new SqlParameter("@Email", Email);
    //        param[2] = new SqlParameter("@OTP", OTP);
    //        var dt = dbHandler.ReturnDataWithStoredProcedure("USP_SFP_GenuineEmailLog", param);

    //        return Request.CreateResponse(HttpStatusCode.OK, dt);
    //    }
    //    catch (Exception ex)
    //    {
    //        dbHandler.SaveErorr("USP_SFP_GenuineEmailLog", 0, ex.Message);
    //        return Request.CreateResponse(HttpStatusCode.NotFound, ex.Message);
    //    }
    //}
    //internal class BodyBuilder
    //{
    //    public string HtmlBody { get; set; }
    //}
}
