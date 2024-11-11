using SelectPdf;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace SoftwareSuite.Controllers.TWSH
{
    public class TwshCertificateController
    {

        private void CreateIfMissing(string path)
        {
            bool folderExists = Directory.Exists(path);
            if (!folderExists)
                Directory.CreateDirectory(path);
        }

        //[HttpPost, ActionName("GetGenuinenessCertificate")]
        [HttpGet, ActionName("GetTypeWritingCertificate")]
        public string GetTypeWritingCertificate()
        {
            //List<MigrationData> MigrationData = MigrationDat.Tables[1].DataTableToList<MigrationData>().ToList(); ;
            var dir = AppDomain.CurrentDomain.BaseDirectory + @"Reports\UnsignedCert\";
            CreateIfMissing(dir);
            string html = @"<html>"
                   + "<head>"
                   + $"<title></title>"
                   + $@"<link href = '{AppDomain.CurrentDomain.BaseDirectory}\contents\css\bootstrap.min.css' rel = 'stylesheet'  type = 'text/css' />"
                   + @"<style type='text/css'>
                         html{
                            min-width: 1024px;
                            max-width: 1024px;
                            width: 1024px;
                        }
                        body {
                            min-width: 1024px;
                            max-width: 1024px;
                            width: 1024px;
                            margin-left: 10px;
                        } 
                        table {  
                            font-family: Helvetica, Arial, sans-serif; /* Nicer font */
                            width: 100%; 
                            border-collapse: collapse;
                            border-spacing: 0; 
                        } 

                        td, th, tr { border: 1px solid #000; height: 40px; } /* Make cells a bit taller */

                        th {  
                            font-weight: bold; /* Make sure they're bold */
                        }

                        td {  
                            text-align: center; /* Center our text */
                        }

        .bg_image {
            background-image: url('../../../ contents / img / memo.PNG');
            background - repeat: no - repeat;
        height: 1000em;
        width: 100 %;
            background - position: center; /* Center the image */
            background - repeat: no - repeat; /* Do not repeat the image */
                                              /* Resize the background image to cover the entire container */
        position: relative;
        }

        .myImg {
            width: 100%;
            margin-left: auto;
            margin-right: auto;
            /*padding:120px;*/
            display: block;
            opacity: 1;
            z-index: 1000;
        }

        .container {
            position: relative;
            max-width: 800px;
            margin: 0 auto;
        }
        .twshHeader{
            display:none;
        }
            .container img
{
    vertical-align: middle;
}

            .container.content {
                position: absolute;
                bottom: 0;
                top: 0px;
                background: rgb(0, 0, 0);
background: rgba(255, 255, 255, 0.36);
color: #130404;
                width: 100%;
                /*padding: 20px;*/
            }

        .Name {
            left: 16em;
    position: absolute;
    top: 25.3em;
        }

        .father {
         left: 15em;
    position: absolute;
    top: 27.8em;
        }

        .year {
            left: 12.5em;
    position: absolute;
    top: 30.6em;
        }

        .College {
               left: 28em;
    position: absolute;
    top: 30.8em;
        }

        .branch {
                 left: 24em;
    position: absolute;
    top: 35.5em;
    font-size: 13px;
        }

        .pin {
          left: 8em;
    position: absolute;
    top: 72.3em;
        }

        .TrainingDuration {
               left: 13em;
    position: absolute;
    top: 52.5em;
        }
    .Institute {
    left: 13em;
    position: absolute;
    width: 450px;
    top: 58.2em;
}

        .year {
          left: 12.5em;
    position: absolute;
    top: 30.6em;
        }

        .MonthYear {
          left: 17em;
    position: absolute;
    top: 33em;
        }

        .class {
           left: 16em;
    position: absolute;
    top: 35.5em;
        }

        .table-responsive {
            min-height: .01%;
            overflow-x: auto;
            width: 66%;
            font-size: 13px;
            margin: 105px;
            top: 29em;
            position: absolute;
        }

        .disp_none {
            display: none;
        }

        table > tfoot > tr > th, .table > thead > tr > td, .table > thead > tr > th {
            padding: 6px 6px;
            line-height: 1.42857143;
            vertical-align: middle;
            /* border-top: 1px solid #ddd; */
            font-size: 13px;
            border: 0px;
            /* width: 80%; */
        }

        table.table {
            clear: both;
            margin-bottom: 6px !important;
            max-width: none !important;
            width: 100%;
        }

        .table > tbody > tr > td, .table > tbody > tr > th, .table > tfoot > tr > td, .table > tfoot > tr > th, .table > thead > tr > td, .table > thead > tr > th {
            padding: 4px 4px;
            line-height: 1.42857143;
            vertical-align: middle;
            border-top: 1px solid #ddd;
            font-size: 12px;
        }

        .table > tbody > tr > td, .table > tbody > tr > th, .table > tfoot > tr > td, .table > tfoot > tr > th, .table > thead > tr > td, .table > thead > tr > th {
            padding: 4.5px 6px;
            line-height: 1.42857143;
            vertical-align: middle;
            border-top: 0px solid #ddd;
            font-size: 12px;
        }

       

        .transp {
            color: transparent;
        }
        .paper1{
     left: 18.4em;
    position: absolute;
    top: 45.8em;
        }
         .paper2{
  left: 33.3em;
    position: absolute;
    top: 45.8em;
        }
            .main{
             display:none;
         }
              .Photo {
       left: 39.5em;
    position: absolute;
    top: 6.5em;
}
      .profilePic {
height: 168px;
    width: 138px;
}
                        </style> "
                   + "</head><body>";

            string sbString = html;


            #region PageHeader
            var page = $@"
 ";

            #endregion

            #region PageContent
            page += $@"<div class='container' >
            < img src = '../../../contents/img/TwshCert.jpg' alt = 'Notebook' class='myImg'>
            <div class='content'>
               
                <div class='Name'>{{StudentDetails.Name}}</div>
               <!-- ../../../contents/img/profilePic.jpg-->
                <div class='Photo'><img class='profilePic' ng-src='{{StudentDetails.photo}}'/></div>
                <div class='father'> {{StudentDetails.FatherName}}</div>
                <div class='year'>{{StudentDetails.RegNo}}</div>
                <div class='College'>{{StudentDetails.Course}}</div>
                <div class='branch'>At {{StudentDetails.ExaminationCenterName}}</div>
                <div class='Institute'>{{StudentDetails.Institute1}}</div>
                <div class='MonthYear'>{{StudentDetails.MonthYear}}</div>
                <div class='TrainingDuration'>{{StudentDetails.DOB}}</div>
                <div class='pin'>{{Today|date:'dd-MM-yyyy'}}</div>
                <div class='class'>{{StudentDetails.division}}</div>
                <div class='paper1'>{{paper1}}</div>
                <div class='paper2'>{{paper2}}</div>
            </div>
            <div class='sm-spacer'></div>
            <div class='col-md-12'>
                <button class='btn btn-success mybtn pull-right' ng-click='PrintData()'>Print</button>
            </div>
        </div>";
            #endregion

            sbString += page;
            sbString += "</body></html>";

            var converter = new HtmlToPdf();
            converter.Options.ExternalLinksEnabled = true;
            converter.Options.DisplayHeader = true;
            converter.Options.DrawBackground = false;
            converter.Options.JavaScriptEnabled = false;
            converter.Options.WebPageWidth = 1024;
            converter.Options.PdfPageSize = PdfPageSize.A4;
            converter.Options.PdfPageOrientation = PdfPageOrientation.Portrait;

            var doc = converter.ConvertHtmlString(sbString);
            var path = dir + "Twsh" + $"{Guid.NewGuid().ToString()}.pdf";
            doc.Save(path);
            doc.Close();
            string relativePath = path.Replace(HttpContext.Current.Request.PhysicalApplicationPath, GetWebAppRoot()).Replace(@"\", "/");
            return relativePath;
        }

        private string GetWebAppRoot()
        {
            var env = ConfigurationManager.AppSettings["SMS_ENV"].ToString();
            string host = (HttpContext.Current.Request.Url.IsDefaultPort) ?
               HttpContext.Current.Request.Url.Host :
               HttpContext.Current.Request.Url.Authority;
            if (env == "PROD")
            {
                host = String.Format("{0}://{1}", HttpContext.Current.Request.Url.Scheme, host);
                return host + "/";
            }
            else if (env == "DEV")
            {

                host = String.Format("{0}://{1}", HttpContext.Current.Request.Url.Scheme, host);
                return host + HttpContext.Current.Request.ApplicationPath;
            }
            return host + "/";
        }
    }
    }