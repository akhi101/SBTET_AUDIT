extern alias itextalias;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Web;
using PdfSharp.Pdf.IO;
using SelectPdf;
using SoftwareSuite.Models.Database;

namespace SoftwareSuite.Controllers.TWSH
{
    public class GenerateTwshNR
    {

        public class TwshNrData
        {

            public string ExamCenter { get; set; }
            public string Grade { get; set; }
            public string CourseName { get; set; }
            public string CourseShortName { get; set; }
            public string ExamDate { get; set; }         
            public string ApplicationNumber { get; set; }
            public string HallTicketNumber { get; set; }
            public string StudentName { get; set; }
            public string barcodeImage { get; set; }
            public string ProfilePhoto { get; set; }
            public string BarcodeUID { get; set; }
            public string ExamYear { get; set; }
            public string PhotoURL { get; set; }
            public string BatchName { get; set; }
        }

        public string GetTwshNrPdf(DataSet ds, string NRReportDir)
        {
            string dirPath = AppDomain.CurrentDomain.BaseDirectory + @"Reports\TwshNR";
            var TwshNrData = DataTableHelper.ConvertDataTable<TwshNrData>(ds?.Tables[1]);
            CreateIfMissing(dirPath);
            var dir_id = GenerateBarcodePdfs(TwshNrData);
            var dir = AppDomain.CurrentDomain.BaseDirectory + @"Reports\TwshNR\" + dir_id;
            var files = Directory.GetFiles(dir);
            var pdf = Guid.NewGuid().ToString();
            MergePDFs(AppDomain.CurrentDomain.BaseDirectory + @"Reports\" + pdf + ".pdf", files);
            Directory.Delete(dir, true);
            return pdf;
        }

        private void CreateIfMissing(string path)
        {
            bool folderExists = Directory.Exists(path);
            if (!folderExists)
                Directory.CreateDirectory(path);
        }

        public static void MergePDFs(string targetPath, params string[] pdfs)
        {
            using (PdfSharp.Pdf.PdfDocument targetDoc = new PdfSharp.Pdf.PdfDocument())
            {
                foreach (string pdf in pdfs)
                {
                    using (var pdfDoc = PdfReader.Open(pdf, PdfDocumentOpenMode.Import))
                    {
                        for (int i = 0; i < pdfDoc.PageCount; i++)
                        {
                            targetDoc.AddPage(pdfDoc.Pages[i]);
                        }
                    }
                }
                targetDoc.Save(targetPath);
            }
        }

        private string GenerateBarcodePdfs(List<TwshNrData> nrData)
        {
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

                        td, th { border: 1px solid #CCC; height: 40px; } /* Make cells a bit taller */

                        th {  
                            font-weight: bold; /* Make sure they're bold */
                        }

                        td {  
                            text-align: center; /* Center our text */
                        }
                        </style> "
                    + "</head><body>";

            string sbString = html;

            var distinctBarcodes = nrData.GroupBy(x => x.BarcodeUID)
                                      .Select(grp => grp.First())
                                      .OrderBy(x => x.CourseShortName)
                                      .ToList();
            var dir_id = Guid.NewGuid().ToString();
            var dir = AppDomain.CurrentDomain.BaseDirectory + @"Reports\TwshNR\" + dir_id;
            var ppbDir = AppDomain.CurrentDomain.BaseDirectory + @"Reports\TwshNR\PreProcessedBarcodePdf\";
            var studentPhotoDir = ConfigurationManager.AppSettings["TwshStudentPhotos"].ToString();
            CreateIfMissing(dir);
            CreateIfMissing(ppbDir);
            int pn = 1;
            foreach (var bc in distinctBarcodes)
            {
                if (File.Exists(ppbDir + $"{bc.BarcodeUID}.pdf"))
                {
                    File.Copy((ppbDir + $"{bc.BarcodeUID}.pdf"), (dir + $"\\{(pn++).ToString().PadLeft(3, '0')}.pdf"));
                }
                else
                {
                    #region PageHeader
                    var page = $@"<br /><br /><div class='col-sm-9 col-md-9 col-lg-9'>
                                <h4 class='text-center head_print'><b>STATE BOARD OF TECHNICAL EDUCATION AND TRAINING, TELANGANA</b></h5>
                                <h6 class='text-center'><b>EXAMINATION {bc.ExamYear} </b></h6>
                                <h6 class='text-center'><b>PHOTO ATTENDENCE SHEET</b></h6>
                            </div>
                            <div class='col-sm-3 col-md-3 col-lg-3'>
                                <img style='padding-right: 50px;' src='{GenerateBarcode(bc.BarcodeUID)}' height='68' width='316' /> <br /> {bc.BarcodeUID}
                            </div>
                            <div class='col-md-9'>
                                <div class='head_text'>Exam Center Code & Name :  {bc.ExamCenter}</div>
                                <div class='head_text'>Grade  :  {bc.Grade}</div>
                                <div class='head_text'>Course Name :  {bc.CourseName}</div>
                                <div class='head_text'>Exam Date :  {bc.ExamDate}</div>
                            </div>
                            <div class='col-md-3'>
                                <div class='head_text'>Year :  {bc.ExamYear}  </div>
                                <div class='head_text'>CourseCode :  {bc.CourseShortName}  </div>
                                <div class='head_text'>Batch : {bc.BatchName}</div>
                            </div>";
                    #endregion
                    #region PageContent
                    page += @"<br /><table class='table'><tr class='row'><td class='col-sm-6' style='border: 0px'>";
                    page += @"<table>
                            <tr>
                                <td rowspan= '2'  id='tbl_head1'><b>S.No</b></td>
                                <td rowspan= '2' id='tbl_head2' class='myead2' width='60'><b>Photo</b></td>
                                <td  id='tbl_head1'><b>Student Name</b></td> 
								<td rowspan= '2' id='tbl_head2' class='myead2'><b>  Hall Ticket no</b></td>
							</tr>
							<tr>								
                                <td id='tbl_head1'><b> Signature </b></td> 
                            </tr>";
                    var students = nrData.Where(x => x.BarcodeUID == bc.BarcodeUID).ToArray();
                    for (var i = 0; i < 12 && i < students.Length; i++)
                    {
                        page += $@"<tr><td rowspan= '2' > { i + 1 } </td>
                                <td rowspan= '2'>
                                    <img src='{studentPhotoDir+ '/'+ students[i].ApplicationNumber + ".jpg"}' style='border: 2px solid #ddd;' height='65' width='60' />
                                </td>
                                <td>{students[i].StudentName}</td>
								<td rowspan= '2'>{students[i].HallTicketNumber}</td></tr>
                            <tr><td ></td></tr>";
                    }
                    page += "</table></td><td class='col-sm-6' style='border: 0px'>";
                    if (students.Length > 12)
                    {
                        page += @"<table>
                            <tr>
                                <td rowspan= '2'  id='tbl_head1'><b>S.No</b></td>
                                <td rowspan= '2' id='tbl_head2' class='myead2' width='60'><b>Photo</b></td>
                                <td  id='tbl_head1'><b>Student Name</b></td> 
								<td rowspan= '2' id='tbl_head2' class='myead2'><b> Hall Ticket no</b></td>
							</tr>
							<tr>								
                                <td id='tbl_head1'><b> Signature </b></td> 
                            </tr>";
                        for (var i = 12; i < 24 && i < students.Length; i++)
                        {
                            page += $@"<tr><td rowspan= '2' > { i + 1 } </td>
                                <td rowspan= '2'>
                                    <img src='{studentPhotoDir+ '/'+ students[i].ApplicationNumber + ".jpg"}' style='border: 2px solid #ddd;' height='65' width='60' />
                                </td>
                                <td>{students[i].StudentName}</td>
								<td rowspan= '2'>{students[i].HallTicketNumber}</td></tr>
                            <tr><td ></td></tr>";
                        }
                        page += "</table>";
                    }
                    page += "</td></tr></table>";
                    #endregion
                    #region PageFooter
                    page += $@"
                            <div class='row'>
                                <div class='col-md-6'>
                                    <div class='head_text'>Total no. of students in this sheet :  {students.Length}</div>
                                    <div class='head_text'>Total no. of Absent students in the sheet :  </div>                      
                                </div>
                                <div class='col-md-6'>
                                    <div class='head_text'>Total no. of Present students in the sheet :</div>
                                    <div class='head_text'>Total no. of Malpractice cases in the sheet :</div>                      
                                </div>
                            </div>
                            <br /><br />
                            <div class='row'>
                                <div class='col-md-6'>
                                    <div class='head_text'>Signature of Invigilator : </div>                                         
                                </div>
                                <div class='col-md-6'>
                                    <div class='head_text'>Signature of Cheif Superitendent with seal :</div>
                                 </div>
                            </div>
                            </div><div style='page-break-after:always'>&nbsp;<br /></div>";
                    #endregion

                    sbString += page;
                    sbString += "</body></html>";

                    var converter = new HtmlToPdf();
                    converter.Options.ExternalLinksEnabled = true;
                    converter.Options.DrawBackground = false;
                    converter.Options.JavaScriptEnabled = false;
                    converter.Options.WebPageWidth = 1024;
                    converter.Options.PdfPageSize = PdfPageSize.A4;
                    converter.Options.PdfPageOrientation = PdfPageOrientation.Portrait;

                    var doc = converter.ConvertHtmlString(sbString);
                    doc.Save(dir + $"\\{pn.ToString().PadLeft(3, '0')}.pdf");
                    doc.Close();

                    sbString = html;
                    File.Copy(dir + $"\\{(pn++).ToString().PadLeft(3, '0')}.pdf", (ppbDir + $"{bc.BarcodeUID}.pdf"), true);
                }
            }
            return dir_id;
        }


        public string GenerateBarcode(string BarcodeUID)
        {
            string dirPath = AppDomain.CurrentDomain.BaseDirectory + @"Reports\TwshBarcodeImages\";
            if (!File.Exists(dirPath + BarcodeUID + ".jpg"))
            {
                System.Drawing.Bitmap bm = null;
                if (BarcodeUID.Length > 0)
                {
                    var code128 = new itextalias.iTextSharp.text.pdf.Barcode128();
                    code128.CodeType = itextalias.iTextSharp.text.pdf.Barcode.CODE128;
                    code128.ChecksumText = true;
                    code128.GenerateChecksum = true;
                    code128.StartStopText = true;
                    code128.Code = BarcodeUID;
                    bm = new System.Drawing.Bitmap(code128.CreateDrawingImage(System.Drawing.Color.Black, System.Drawing.Color.White));
                }
                CreateIfMissing(dirPath);
                bm?.Save(dirPath + BarcodeUID + ".jpg", ImageFormat.Jpeg);
                bm?.Dispose();
            }
            return dirPath + BarcodeUID + ".jpg";
        }
    }
}
