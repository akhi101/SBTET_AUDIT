extern alias itextalias;
using DocumentFormat.OpenXml;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Spreadsheet;
using PdfSharp.Pdf.IO;
using SelectPdf;
using SharpCompress.Common;
using SharpCompress.Writers;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Timers;
using System.Web;
using SoftwareSuite.Models;
using SoftwareSuite.Models.Database;

namespace SoftwareSuite.Controllers.CCIC
{
    public class CcicGenerateTimeTable
    {
        public void GenerateTTReportPDFs()
        {
            string ConStr = ConfigurationManager.ConnectionStrings["ConnString"].ToString();
            string TTReportDir = @"Reports\TT\";

            DataSet ds = new DataSet();
            try
            {
                using (SqlConnection conn = new SqlConnection(ConStr))
                {
                    SqlCommand cmd = new SqlCommand("USP_SFP_GET_TT_BAC", conn);
                    cmd.CommandType = CommandType.StoredProcedure;
                    // cmd.Parameters.AddWithValue("@PMID", employeeID);
                    using (SqlDataAdapter da = new SqlDataAdapter(cmd))
                    {

                        da.Fill(ds);
                    }
                }

            }
            catch (Exception ex)
            {
                // MessageBox.Show(ex.Message + ex.InnerException);
                // LogExceptions(ex);
            }

            if (ds.Tables.Count == 0)
                return;

            //ProcessEachRequest(ds, TTReportDir);
        }

        public class TtData
        {
            public Int64 slno { get; set; }
            public string ExamDate { get; set; }
            public string CourseCode { get; set; }
            public string ExamTime { get; set; }
            public Int64 page_no { get; set; }
            public string SubjectName { get; set; }
            public string SubjectCode { get; set; }
            public string CourseDurationName { get; set; }
            public string CourseName { get; set; }
            public string BarcodeUID { get; set; }
            public string Scheme { get; set; }
            public string BranchName { get; set; }
            public string Semester { get; set; }
            public string ExamCenter { get; set; }
            public string ExamYear { get; set; }
            public string Pin { get; set; }
            public string Name { get; set; }

        }


        public Cell GetStringCell(string data)
        {
            Cell c = new Cell
            {
                CellValue = new CellValue(data),
                DataType = CellValues.String
            };
            return c;
        }


        public string GetTtPdf(DataSet ds, string TTReportDir)
        {
            string dirPath = AppDomain.CurrentDomain.BaseDirectory + @"Reports\TT";
            var ttData = DataTableHelper.ConvertDataTable<TtData>(ds?.Tables[0]);
            var ttData1 = DataTableHelper.ConvertDataTable<TtData>(ds?.Tables[1]);
            CreateIfMissing(dirPath);
            var dir_id = GenerateTTPdfs(ttData, ttData1);
            var dir = AppDomain.CurrentDomain.BaseDirectory + @"Reports\TT\" + dir_id;
            var files = Directory.GetFiles(dir);
            var pdf = Guid.NewGuid().ToString();
            MergePDFs(AppDomain.CurrentDomain.BaseDirectory + @"Reports\" + pdf + ".pdf", files);
            var eh = new ExcelHelper();
            // File.Copy(dir + $"\\{(pn++).ToString().PadLeft(3, '0')}.pdf", (ppbDir + $"{bc.BarcodeUID}.pdf"), true);
            Timer timer1 = new Timer(600000);
            timer1.Elapsed += (sender, e) => elapse(sender, e, AppDomain.CurrentDomain.BaseDirectory + @"Reports\" + pdf + ".pdf");
            timer1.Start();
            Directory.Delete(dir, true);
            return pdf;
        }

        //public class ReportsModels
        //{
        //    public string Pin { get; set; }
        //    public string Name { get; set; }
        //    public string ProfilePhoto { get; set; }
        //}

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
        private string GenerateBarcodePdfs(List<TtData> ttData)
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

            var distinctBarcodes = ttData.GroupBy(x => x.BarcodeUID)
                                      .Select(grp => grp.First())
                                      .OrderBy(x => x.Scheme)
                                      .ThenBy(x => x.BranchName)
                                      .ThenBy(x => x.Semester)
                                      .ThenBy(x => x.SubjectName)
                                      .ToList();
            var dir_id = Guid.NewGuid().ToString();
            var dir = AppDomain.CurrentDomain.BaseDirectory + @"Reports\NR\" + dir_id;
            var ppbDir = AppDomain.CurrentDomain.BaseDirectory + @"Reports\NR\PreProcessedBarcodePdf\";
            //var studentPhotoDir = ConfigurationManager.AppSettings["StudentPhotosFolder"].ToString();
            var studentPhotoDir = ConfigurationManager.AppSettings["Student_Photos"].ToString();
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
                                <div class='head_text'>Branch Code & Name :  {bc.BranchName}</div>
                                <div class='head_text'>Subject Code & Name :  {bc.SubjectName}</div>
                                <div class='head_text'>Exam Date & Time :  {bc.ExamDate}</div>
                            </div>
                            <div class='col-md-3'>
                                <div class='head_text'>Scheme : {bc.Scheme}</div>
                                <div class='head_text'>Year :  </div>
                                <div class='head_text'>Semester :{bc.Semester}</div>
                            </div>";
                    #endregion
                    #region PageContent
                    page += @"<br /><table class='table'><tr class='row'><td class='col-sm-6' style='border: 0px'>";
                    page += @"<table>
                            <tr>
                                <td rowspan= '2'  id='tbl_head1'><b>S.No</b></td>
                                <td rowspan= '2' id='tbl_head2' class='myead2' width='60'><b>Photo</b></td>
                                <td  id='tbl_head1'><b>Student Name</b></td> 
								<td rowspan= '2' id='tbl_head2' class='myead2'><b> Pin</b></td>
							</tr>
							<tr>								
                                <td id='tbl_head1'><b> Signature </b></td> 
                            </tr>";
                    var students = ttData.Where(x => x.BarcodeUID == bc.BarcodeUID).ToArray();
                    for (var i = 0; i < 12 && i < students.Length; i++)
                    {
                        page += $@"<tr><td rowspan= '2' > {i + 1} </td>
                                <td rowspan= '2'>
                                    <img src='{studentPhotoDir + students[i].Pin + ".jpg"}' style='border: 2px solid #ddd;' height='65' width='60' />
                                </td>
                                <td>{students[i].Name}</td>
								<td rowspan= '2'>{students[i].Pin}</td></tr>
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
								<td rowspan= '2' id='tbl_head2' class='myead2'><b> Pin</b></td>
							</tr>
							<tr>								
                                <td id='tbl_head1'><b> Signature </b></td> 
                            </tr>";
                        for (var i = 12; i < 24 && i < students.Length; i++)
                        {
                            page += $@"<tr><td rowspan= '2' > {i + 1} </td>
                                <td rowspan= '2'>
                                    <img src='{studentPhotoDir + students[i].Pin + ".jpg"}' style='border: 2px solid #ddd;' height='65' width='60' />
                                </td>
                                <td>{students[i].Name}</td>
								<td rowspan= '2'>{students[i].Pin}</td></tr>
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


                }
            }
            return dir_id;
        }



        private static void elapse(object sender, ElapsedEventArgs e, string s)
        {
            System.IO.File.Delete(s);
            ((Timer)sender).Stop();
            ((Timer)sender).Dispose();
        }

        private string GenerateTTPdfs(List<TtData> ttData, List<TtData> ttData1)
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
.brd_btm{
border-bottom:0px;
}
.sm-spacer{
height:70px;
}
.rnd_brd{

border:1px solid #000;
padding :15px 25px 15px 25px;;

}
.head_text{
font-size:12px;
}
hr{
}
.table_css{
margin-top:10px;
border-top:1px solid #000;
margin-bottom:50px;
}
.text-center{
text-align:center;
}
.crs_css{
font-weight:bold;
}
                        </style> "
                    + "</head><body>";

            string sbString = html;

            //var distinctBarcodes = ttData.GroupBy(x => x.CourseCode)
            //                          .Select(x => x.First())
            //                          //.OrderBy(x => x.CourseCode)
            //                          //.ThenBy(x => x.CourseCode)
            //                          //.ThenBy(x => x.CourseCode)
            //                          //.ThenBy(x => x.CourseCode)
            //                          .ToList();
            var dir_id = Guid.NewGuid().ToString();
            var dir = AppDomain.CurrentDomain.BaseDirectory + @"Reports\TT\" + dir_id;
            var ppbDir = AppDomain.CurrentDomain.BaseDirectory + @"Reports\TT\PreProcessedBarcodePdf\";
            var studentPhotoDir = ConfigurationManager.AppSettings["Student_Photos"].ToString();
            //var studentPhotoDir = ConfigurationManager.AppSettings["StudentPhotosFolder"].ToString();
            //var studentSignDir = ConfigurationManager.AppSettings["StudentSignaturesFolder"].ToString();
            CreateIfMissing(dir);
            CreateIfMissing(ppbDir);
            int pn = 1;
            #region PageHeader
            var page = $@"<div class='col-sm-12 col-md-12 col-lg-12'>
                                <h3 class='text-center head_print'><b>State Board of Technical Education & Training, Telangana</b></h3>
                                
                                <h5 class='text-center'><b>TIME TABLE FOR THEORY EXAMATIONS OF CCIC AND 
 SHORT- TERM COURSES TO BE HELD DURING MARCH-2023</b></h5>
                            </div>";
            #endregion
            //foreach (var bc in distinctBarcodes)
            //{
                //if (File.Exists(ppbDir + $"{bc.SubjectCode}_{bc.CourseCode}.pdf"))
                //{
                //    File.Copy((ppbDir + $"{bc.SubjectCode}_{bc.CourseCode}.pdf"), (dir + $"\\{(pn++).ToString().PadLeft(3, '0')}.pdf"));
                //}
                //else
                //{
                  
                    #region PageContent
                    page += @"<br />
<hr>";
            var distinctBarcodes = ttData1.GroupBy(x => x.CourseCode)
                                  .Select(x => x.First())
                                  //.OrderBy(x => x.CourseCode)
                                  //.ThenBy(x => x.CourseCode)
                                  //.ThenBy(x => x.CourseCode)
                                  //.ThenBy(x => x.CourseCode)
                                  .ToList();
            var students1 = ttData1.ToArray();

            page += @"<div class='col-md-12'>";
            foreach (var bc in students1)
            {
               
                page += $@"
 <div class='text-center crs_css'>{bc.CourseDurationName} </div>
<table class='table_css'>
                            <tr>
                                <td id='tbl_head1'><b>Exam Date</b></td> 
                                <td id='tbl_head1'><b>Subject Code</b></td> 
                                <td id='tbl_head1'><b>Subject Name</b></td>
                                <td id='tbl_head1'><b>Exam Time</b></td>
                                                               
							</tr>";

                var students = ttData.Where(x => x.CourseCode == bc.CourseCode).ToArray();

                for (var i = 0; i < students.Length; i++)
                {
                    page += $@"<tr>
                                <td >{students[i].ExamDate} </td>
                                <td >{students[i].SubjectCode}</td>
                                <td >{students[i].SubjectName}</td>
                                <td >{students[i].ExamTime}</td>
                              
								</tr>";
                }
                page += "</table>";
            }
                    //if (students.Length > 8)
                    //{
                    //                       page += @"<table>
                    //                           <tr>
                    //                               <td id='tbl_head1'><b>Sl.No</b></td>
                    //                               <td id='tbl_head1'><b>Hall Ticket<br> Number</b></td> 
                    //<td  id='tbl_head1'><b>Name of the Candidate</b></td> 
                    //                               <td  id='tbl_head1'><b>Father`s Name BOOKLET CODE </b></td>
                    //                               <td  id='tbl_head1'><b>Sex</b></td>
                    //                               <td  id='tbl_head2' class='myead2' width='60'><b>Photo</b></td>

                    //							<td  id='tbl_head2' class='myead2'><b> Signature</b></td>
                    //						</tr>
                    //						<tr>								
                    //                               <td id='tbl_head1'><b> Signature </b></td> 
                    //                           </tr>";
                    //                  for (var i = 8; i < 16 && i < students.Length; i++)
                    //                  {
                    //                      page += $@"<tr><td rowspan= '2' > { i + 1 } </td>
                    //                          <td row<tr><td > { i + 1 } </td>
                    //                          <td >{students[i].HallticketNumber}</td>
                    //<td >{students[i].Name}</td>
                    //                          <td >{students[i].fname}</td>
                    //                          <td >{students[i].sex}</td>
                    //                          <td >
                    //                              <img src='{studentPhotoDir + students[i].HallticketNumber + ".jpg"}' style='border: 2px solid #ddd;' height='65' width='60' />
                    //                          </td>
                    //                          <td>{studentSignDir + students[i].HallticketNumber + ".jpg"}</td>
                    //		</tr>";
                    //                  }
                    // page += "</table>";
                    //  }
                    page += //"</td></tr></table>" +
                    "<div class='sm-spacer'></div></div>" +
                    "";
                    #endregion
 //                   #region PageFooter
 //                   page += $@"
 //<br />
 //<div class='col-md-12'>
 //                               <div class='col-md-10'>
 //                                   <div class='head_text' style='margin-top:5px;'><b>{DateTime.Now.ToString("dd-MM-yyyy hh:mm:ss tt")}</b> </div>
                                                      
 //                               </div>
 //                               <div class='col-md-2'>
 //                                   <div class='head_text' style='margin-top:5px;'><b>Page No :{bc.page_no} </b> </div>
                                                         
 //                               </div>
  
 //                           </div>
                            
                         
 //                           </div><div style='page-break-after:always'>&nbsp;<br /></div>";
 //                   #endregion

                    sbString += page;
                    sbString += "</body></html>";

                    var converter = new HtmlToPdf();
                    converter.Options.ExternalLinksEnabled = true;
                    converter.Options.DrawBackground = false;
                    converter.Options.JavaScriptEnabled = false;
                    converter.Options.WebPageWidth = 1024;
                    converter.Header.Height = 25;
            converter.Options.DisplayHeader = true;
            converter.Header.DisplayOnFirstPage = true;
            converter.Header.DisplayOnOddPages = true;
            converter.Header.DisplayOnEvenPages = true;
            converter.Footer.Height = 25;
            converter.Options.DisplayFooter = true;
            converter.Footer.DisplayOnFirstPage = true;
            converter.Footer.DisplayOnOddPages = true;
            converter.Footer.DisplayOnEvenPages = true;
            converter.Options.PdfPageSize = PdfPageSize.A4;
                    converter.Options.PdfPageOrientation = PdfPageOrientation.Portrait;
           
                    var doc = converter.ConvertHtmlString(sbString);
                    doc.Save(dir + $"\\{pn.ToString().PadLeft(3, '0')}.pdf");
                    doc.Close();

                    sbString = html;
                    File.Copy(dir + $"\\{(pn++).ToString().PadLeft(3, '0')}.pdf", (ppbDir + $"{122}_{1234}.pdf"), true);

                //}
                var eh = new ExcelHelper();
                // File.Copy(dir + $"\\{(pn++).ToString().PadLeft(3, '0')}.pdf", (ppbDir + $"{bc.BarcodeUID}.pdf"), true);
                DataSet excelds = new DataSet();
                // excelds.Tables.Add(ds.Tables[1].Copy());
                bool folderExists = Directory.Exists(ppbDir);
                if (!folderExists)
                    Directory.CreateDirectory(ppbDir);

                Timer timer = new Timer(600000);
                timer.Elapsed += (sender, e) => elapse(sender, e, ppbDir + $"{123}_{1234}.pdf");

                bool folderExists1 = Directory.Exists(dir);
                if (!folderExists1)
                    Directory.CreateDirectory(dir);
                //  eh.ExportDataSet(excelds, dir + $"\\{(pn++).ToString().PadLeft(3, '0')}.pdf");
                Timer timer1 = new Timer(600000);
                timer1.Elapsed += (sender, e) => elapse(sender, e, dir + $"\\{(pn++).ToString().PadLeft(3, '0')}.pdf");
                timer.Start();
                timer1.Start();
            
            return dir_id;
        }

        public string GenerateBarcode(string BarcodeUID)
        {
            string dirPath = AppDomain.CurrentDomain.BaseDirectory + @"Reports\BarcodeImages\";
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
