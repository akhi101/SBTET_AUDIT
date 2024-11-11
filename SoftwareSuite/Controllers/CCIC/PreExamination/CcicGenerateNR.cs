extern alias itextalias;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Http;
using SelectPdf;
using SoftwareSuite.Models.Database;
using PdfSharp;
using PdfSharp.Pdf;
using PdfSharp.Pdf.IO;
using SharpCompress.Writers;
using SharpCompress.Common;
using DocumentFormat.OpenXml;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Spreadsheet;
using X15 = DocumentFormat.OpenXml.Office2013.Excel;

namespace SoftwareSuite.Controllers.CCIC.PreExamination
{
    public class CcicGenerateNR
    {
        public void GenerateNRReportPDFs()
        {
            string ConStr = ConfigurationManager.ConnectionStrings["ConnString"].ToString();
            string NRReportDir = @"Reports\NR\";

            DataSet ds = new DataSet();
            try
            {
                using (SqlConnection conn = new SqlConnection(ConStr))
                {
                    SqlCommand cmd = new SqlCommand("USP_SFP_GET_NR_BAC", conn);
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

            //ProcessEachRequest(ds, NRReportDir);
        }

        public class NrData
        {
            public string ExaminationCentreName { get; set; }
            public string SubjectName { get; set; }
            public string CourseName { get; set; }
            public string ExamDate { get; set; }
            public string PIN { get; set; }
            public string StudentName { get; set; }
            public string Scheme { get; set; }
            public string Semester { get; set; }
            public string StudentPhoto { get; set; }
            public string BarcodeUID { get; set; }
            public string BarcodeImage { get; set; }
            public string ExamMonthYear { get; set; }

        }

        public class PrinterNrData
        {
            public string Pin { get; set; }
            public string Name { get; set; }
            public string AcademicYear { get; set; }
            public string ExamCenterCode { get; set; }
            public string ExamCenterName { get; set; }
            public string ExamType { get; set; }
            public string ExamMonthYear { get; set; }
            public string Semester { get; set; }
            public string BranchCode { get; set; }
            public string Scheme { get; set; }
            public string SubjectCode { get; set; }
            public string SubjectName { get; set; }
            public string SubjectType { get; set; }
            public string Pcode { get; set; }
            public string StudentPhoneNumber { get; set; }
            public string PhotoPath { get; set; }
            public string UrlPhotoPath { get; set; }
        }
        public string GetNrForPrinter(DataSet ds, string examMonthyr)
        {
            string dirPath = AppDomain.CurrentDomain.BaseDirectory + @"Reports\NR";
            if (ds.Tables.Count <= 1)
            {
                return null;
            }
            var guid = Guid.NewGuid().ToString();
            var zip_file = examMonthyr + "_" + guid + ".zip";
            var excel_file = examMonthyr + "_" + guid + ".xlsx";
            var err_file = examMonthyr + "_" + guid + ".log";
            var nrData = DataTableHelper.ConvertDataTable<PrinterNrData>(ds.Tables[1]);

            using (SpreadsheetDocument document = SpreadsheetDocument.Create(dirPath + "\\" + excel_file, SpreadsheetDocumentType.Workbook))
            {
                WorkbookPart workbookPart = document.AddWorkbookPart();
                workbookPart.Workbook = new Workbook();

                WorksheetPart worksheetPart = workbookPart.AddNewPart<WorksheetPart>();
                worksheetPart.Worksheet = new Worksheet();

                Sheets sheets = workbookPart.Workbook.AppendChild(new Sheets());

                Sheet sheet = new Sheet() { Id = workbookPart.GetIdOfPart(worksheetPart), SheetId = 1, Name = "NR" };

                sheets.Append(sheet);

                workbookPart.Workbook.Save();

                SheetData sheetData = worksheetPart.Worksheet.AppendChild(new SheetData());
                var st = new PrinterNrData
                {
                    AcademicYear = "AcademicYear",
                    BranchCode = "BranchCode",
                    ExamCenterCode = "ExamCenterCode",
                    ExamCenterName = "ExamCenterName",
                    ExamMonthYear = "ExamMonthYear",
                    ExamType = "ExamType",
                    Name = "Name",
                    PhotoPath = "PhotoPath",
                    UrlPhotoPath = "UrlPhotoPath",
                    Pin = "Pin",
                    Scheme = "Scheme",
                    Semester = "Semester",
                    SubjectCode = "SubjectCode",
                    SubjectName = "SubjectName",
                    SubjectType = "SubjectType",
                    StudentPhoneNumber = "StudentPhoneNumber",
                    Pcode = "Pcode"
                };
                sheetData.AppendChild(GetRowForStudent(st));
                foreach (var s in nrData)
                {
                    Row r = GetRowForStudent(s);
                    sheetData.Append(r);
                }
                worksheetPart.Worksheet.Save();
                document.Close();
            }

            var PinPhotos = nrData.Select(x => new { x.Pin, x.PhotoPath }).Distinct().ToList();
            try
            {
                using (Stream stream = File.OpenWrite(dirPath + "\\" + zip_file))
                {
                    using (var writer = WriterFactory.Open(stream, ArchiveType.Zip, CompressionType.LZMA))
                    {
                        writer.Write(Path.GetFileName("NR.xlsx"), dirPath + "\\" + excel_file);
                        foreach (var pin in PinPhotos)
                        {
                            if (File.Exists(pin.PhotoPath))
                                writer.Write(Path.GetFileName(pin.Pin + ".jpg"), pin.PhotoPath);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                File.WriteAllText(err_file, "Error Message ::: " + ex.Message);
                File.AppendAllText(err_file, "\n\nStack Trace ::: " + ex.StackTrace);
            }
            File.Delete(dirPath + "\\" + excel_file);
            return zip_file;
        }

        private Row GetRowForStudent(PrinterNrData s)
        {
            Row r = new Row();
            r.Append(GetStringCell(s.Pin));
            r.Append(GetStringCell(s.Name));
            r.Append(GetStringCell(s.AcademicYear));
            r.Append(GetStringCell(s.ExamCenterCode));
            r.Append(GetStringCell(s.ExamCenterName));
            r.Append(GetStringCell(s.ExamType));
            r.Append(GetStringCell(s.ExamMonthYear));
            r.Append(GetStringCell(s.Semester));
            r.Append(GetStringCell(s.BranchCode));
            r.Append(GetStringCell(s.Scheme));
            r.Append(GetStringCell(s.SubjectCode));
            r.Append(GetStringCell(s.SubjectName));
            r.Append(GetStringCell(s.SubjectType));
            r.Append(GetStringCell(s.StudentPhoneNumber));
            r.Append(GetStringCell(s.Pcode));
            return r;
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


        public string GetNrPdf(DataSet ds, string NRReportDir)
        {
            string dirPath = AppDomain.CurrentDomain.BaseDirectory + @"Reports\NR";
            var nrData = DataTableHelper.ConvertDataTable<NrData>(ds?.Tables[0]);
            CreateIfMissing(dirPath);
            var dir_id = GenerateBarcodePdfs(nrData);
            var dir = AppDomain.CurrentDomain.BaseDirectory + @"Reports\NR\" + dir_id;
            var files = Directory.GetFiles(dir);
            var pdf = Guid.NewGuid().ToString();
            MergePDFs(AppDomain.CurrentDomain.BaseDirectory + @"Reports\" + pdf + ".pdf", files);
            Directory.Delete(dir, true);
            return pdf;
        }

        public class ReportsModels
        {
            public string Pin { get; set; }
            public string Name { get; set; }
            public string ProfilePhoto { get; set; }
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

        private string GenerateBarcodePdfs(List<NrData> nrData)
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
                                      .OrderBy(x => x.CourseName)
                                      .ThenBy(x => x.SubjectName)
                                      .ToList();
            var dir_id = Guid.NewGuid().ToString();
            var dir = AppDomain.CurrentDomain.BaseDirectory + @"Reports\NR\" + dir_id;
            var ppbDir = AppDomain.CurrentDomain.BaseDirectory + @"Reports\NR\PreProcessedBarcodePdf\";
            var studentPhotoDir = ConfigurationManager.AppSettings["Student_Photos"].ToString();
            CreateIfMissing(dir);
            CreateIfMissing(ppbDir);
            int pn = 1;
            foreach (var bc in distinctBarcodes)
            {
                if (File.Exists(ppbDir + $"{bc.BarcodeUID}.pdf"))
                {
                    File.Delete((ppbDir + $"{bc.BarcodeUID}.pdf"));
                    //    File.Copy((ppbDir + $"{bc.BarcodeUID}.pdf"), (dir + $"\\{(pn++).ToString().PadLeft(3, '0')}.pdf"));
                    //}
                    //else
                    //{
                }
                #region PageHeader
                var page = $@"<br /><br /><div class='col-sm-9 col-md-9 col-lg-9'>
                                <h4 class='text-center head_print'><b>STATE BOARD OF TECHNICAL EDUCATION AND TRAINING, TELANGANA</b></h5>
                                <h6 class='text-center'><b>CERTIFICATE COURSES EXAMINATION {bc.ExamMonthYear} </b></h6>
                                <h6 class='text-center'><b>PHOTO ATTENDENCE SHEET</b></h6>
                            </div>
                            <div class='col-sm-3 col-md-3 col-lg-3'>
                                <img style='padding-right: 50px;' src='{GenerateBarcode(bc.BarcodeUID)}' height='68' width='316' /> <br /> {bc.BarcodeUID}
                            </div>
                            <div class='col-md-9'>
                                <div class='head_text'>Exam Center Code & Name :  {bc.ExaminationCentreName}</div>
                                <div class='head_text'>Course Code & Name :  {bc.CourseName}</div>
                                <div class='head_text'>Subject Code & Name :  {bc.SubjectName}</div>
                                <div class='head_text'>Exam Date & Time :  {bc.ExamDate}</div>
                            </div>
                            <div class='col-md-3'>
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
                var students = nrData.Where(x => x.BarcodeUID == bc.BarcodeUID).ToArray();
                for (var i = 0; i < 12 && i < students.Length; i++)
                {
                    page += $@"<tr><td rowspan= '2' > {i + 1} </td>
                                <td rowspan= '2'>
                                    <img src='{studentPhotoDir + students[i].StudentPhoto}' style='border: 2px solid #ddd;' height='65' width='60' />
                                </td>
                                <td>{students[i].StudentName}</td>
								<td rowspan= '2'>{students[i].PIN}</td></tr>
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
                                    <img src='{studentPhotoDir + students[i].StudentPhoto}' style='border: 2px solid #ddd;' height='65' width='60' />
                                </td>
                                <td>{students[i].StudentName}</td>
								<td rowspan= '2'>{students[i].PIN}</td></tr>
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
             //   HtmlToPdf.ConvertHtml(data, outputFileName);
                var doc = converter.ConvertHtmlString(sbString);
                doc.Save(dir + $"\\{pn.ToString().PadLeft(3, '0')}.pdf");
                doc.Close();

                sbString = html;
                File.Copy(dir + $"\\{(pn++).ToString().PadLeft(3, '0')}.pdf", (ppbDir + $"{bc.BarcodeUID}.pdf"), true);

            }
            return dir_id;
        }

        private string GenerateTrSheet(List<NrData> nrData)
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
                                      .OrderBy(x => x.CourseName)
                                      .ThenBy(x => x.SubjectName)
                                      .ToList();
            var dir_id = Guid.NewGuid().ToString();
            var dir = AppDomain.CurrentDomain.BaseDirectory + @"Reports\NR\" + dir_id;
            var ppbDir = AppDomain.CurrentDomain.BaseDirectory + @"Reports\NR\PreProcessedBarcodePdf\";
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
                    var page = $@"  <div class='text - center'>STATE BOARD OF TECHNICAL EDUCATION & TRAINING - T.S. HYDERABAD </div>
          < !--  < div class='col-md-3 pull-right'>Page : 1</div>-->
        <div class='col-md-9'>FIRST YEAR(C-14)EXAMINATION FOR 3 YEARS DIPLOMA COURSE IN AUTOMOBILE ENGINEERING</div>
       <div class='col-md-3 pull-right'>RUN DATE : 09-05-2020</div>
         <div class='col-md-4'>TABULATED MARKS SHEET</div>
        <div class='col-md-8'>CENTER : 001-GOVT.POLYTECHNIC HYDERABAD</div>
        <div class='col-md-12 '>MONTH & YEAR OF EXAM :  : MAR/APR 2019</div>
        <!--<div class='col-md-12'>INSTITUTE CODE & NAME : 001 GOVT.POLYTECHNIC HYDERABAD</div>-->
        <hr class='myHr' />";
                    #endregion
                    #region PageContent
                    //page += @"<br /><table class='table'><tr class='row'><td class='col-sm-6' style='border: 0px'>";
                    page += @"  <table class='table'>
            < thead >
                < tr >
                    < th class='text-center'></th>
                    <th class='text-center' >E</th>
                    <th class='text-center '>S</th>
                    <th class='text-center '>TOT</th>
                    <th class='text-center'>E</th>
                    <th class='text-center '>S</th>
                    <th class='text-center '>TOT</th>
                    <th class='text-center'>E</th>
                    <th class='text-center '>S</th>
                    <th class='text-center '>TOT</th>
                    <th class='text-center'>E</th>
                    <th class='text-center '>S</th>
                    <th class='text-center '>TOT</th>
                    <th class='text-center'>E</th>
                    <th class='text-center '>S</th>
                    <th class='text-center '>TOT</th>
                    <th class='text-center'>E</th>
                    <th class='text-center '>S</th>
                    <th class='text-center '>TOT</th>
                    <th class='text-center'>E</th>
                    <th class='text-center '>S</th>
                    <th class='text-center '>TOT</th>
                    <th class='text-center'>E</th>
                    <th class='text-center '>S</th>
                    <th class='text-center '>TOT</th>
                    <th class='text-center'>E</th>
                    <th class='text-center '>S</th>
                    <th class='text-center '>TOT</th>
                    <th class='text-center'>E</th>
                    <th class='text-center '>S</th>
                    <th class='text-center '>TOT</th>
                    <th class='text-center'>E</th>
                    <th class='text-center '>S</th>
                    <th class='text-center '>TOT</th>
                    <th class='text-center '>TOTAL</th>
                                   </tr>   
                <tr>
                    <th class='text-center'>max</th>
                    <th class='text-center'>80</th>
                    <th class='text-center'>20</th>
                    <th class='text-center'>100</th>
                    <th class='text-center'>80</th>
                    <th class='text-center'>20</th>
                    <th class='text-center'>100</th>
                    <th class='text-center'>80</th>
                    <th class='text-center'>20</th>
                    <th class='text-center'>100</th>
                    <th class='text-center'>80</th>
                    <th class='text-center'>20</th>
                    <th class='text-center'>100</th>
                    <th class='text-center'>80</th>
                    <th class='text-center'>20</th>
                    <th class='text-center'>100</th>
                    <th class='text-center'>80</th>
                    <th class='text-center'>20</th>
                    <th class='text-center'>100</th>
                    <th class='text-center'>80</th>
                    <th class='text-center'>20</th>
                    <th class='text-center'>100</th>
                    <th class='text-center'>80</th>
                    <th class='text-center'>20</th>
                    <th class='text-center'>100</th>
                    <th class='text-center'>80</th>
                    <th class='text-center'>20</th>
                    <th class='text-center'>100</th>
                    <th class='text-center'>80</th>
                    <th class='text-center'>20</th>
                    <th class='text-center'>100</th>
                    <th class='text-center'>80</th>
                    <th class='text-center'>20</th>
                    <th class='text-center'>100</th>
                    <th>1000</th>
                </tr>
                <tr>
                    <th class='text-center'>min</th>
                    <th class='text-center'>28</th>
                    <th class='text-center'></th>
                    <th class='text-center'>35</th>
                    <th class='text-center'>28</th>
                    <th class='text-center'></th>
                    <th class='text-center'>35</th>
                    <th class='text-center'>28</th>
                    <th class='text-center'></th>
                    <th class='text-center'>35</th>
                    <th class='text-center'>28</th>
                    <th class='text-center'></th>
                    <th class='text-center'>35</th>
                    <th class='text-center'>28</th>
                    <th class='text-center'></th>
                    <th class='text-center'>35</th>
                    <th class='text-center'>28</th>
                    <th class='text-center'></th>
                    <th class='text-center'>35</th>
                    <th class='text-center'>28</th>
                    <th class='text-center'></th>
                    <th class='text-center'>35</th>
                    <th class='text-center'>28</th>
                    <th class='text-center'></th>
                    <th class='text-center'>35</th>
                    <th class='text-center'>28</th>
                    <th class='text-center'></th>
                    <th class='text-center'>35</th>
                    <th class='text-center'>28</th>
                    <th class='text-center'></th>
                    <th class='text-center'>35</th>
                    <th class='text-center'>28</th>
                    <th class='text-center'></th>
                    <th class='text-center'>35</th>
                    <th class='text-center'></th>

                </tr>
                <tr>
                    <th class='text-center'>SUB</th>
                    <th class='text-center' colspan='3'>101</th>
                    <th class='text-center' colspan='3'>102</th>
                    <th class='text-center' colspan='3'>103</th>
                    <th class='text-center' colspan='3'>104</th>
                    <th class='text-center' colspan='3'>105</th>
                    <th class='text-center' colspan='3'>106</th>
                    <th class='text-center' colspan='3'>107</th>
                    <th class='text-center' colspan='3'>108</th>
                    <th class='text-center' colspan='3'>109</th>
                    <th class='text-center' colspan='3'>110</th>
                    <th class='text-center' colspan='3'>111</th>
                    <th class='text-center' colspan='3'>RESULT</th>
                </tr>     
                <tr>
                    <th class=''>SLNO</th>
                    <th class='' colspan='6'>PIN</th>
                    <th class='' colspan='12'>NAME</th>
                    <th class='' colspan='12'>FATHER NAME</th>
                    <th class='' colspan='6'>SEX</th>
                    <th class=''></th>
                </tr>     
            </thead>
            <tbody>
                <tr>
                    <td class='cln'>1</td>
                    <td class='cln' colspan='6'>14001-A-001</td>
                    <td class='cln' colspan='12'> A MANIKUMAR</td>
                    <td class='cln' colspan='12'>A MALLAIAH</td>
                    <td class='cln' colspan='3'>M</td>
                    <td class='cln' colspan='3'>Completed</td>
                </tr>     
                <tr>
                    <td class='text-center'>min</td>
                    <td class='text-center'>28</td>
                    <td class='text-center'></td>
                    <td class='text-center'>35</td>
                    <td class='text-center'>28</td>
                    <td class='text-center'></td>
                    <td class='text-center'>35</td>
                    <td class='text-center'>28</td>
                    <td class='text-center'></td>
                    <td class='text-center'>35</td>
                    <td class='text-center'>28</td>
                    <td class='text-center'></td>
                    <td class='text-center'>35</td>
                    <td class='text-center'>28</td>
                    <td class='text-center'></td>
                    <td class='text-center'>35</td>
                    <td class='text-center'>28</td>
                    <td class='text-center'></td>
                    <td class='text-center'>35</td>
                    <td class='text-center'>28</td>
                    <td class='text-center'></td>
                    <td class='text-center'>35</td>
                    <td class='text-center'>28</td>
                    <td class='text-center'></td>
                    <td class='text-center'>35</td>
                    <td class='text-center'>28</td>
                    <td class='text-center'></td>
                    <td class='text-center'>35</td>
                    <td class='text-center'>28</td>
                    <td class='text-center'></td>
                    <td class='text-center'>35</td>
                    <td class='text-center'>28</td>
                    <td class='text-center'></td>
                    <td class='text-center'>35</td>
                    <td class='text-center'>663</td>
 
                </tr>     
                <tr>
                    <td class='cln'>1</td>
                    <td class='cln' colspan='6'>14001-A-001</td>
                    <td class='cln' colspan='12'> A MANIKUMAR</td>
                    <td class='cln' colspan='12'>A MALLAIAH</td>
                    <td class='cln' colspan='3'>M</td>
                    <td class='cln' colspan='3'>Completed</td>
                </tr>
                <tr>
                    <td class='text-center'>min</td>
                    <td class='text-center'>28</td>
                    <td class='text-center'></td>
                    <td class='text-center'>35</td>
                    <td class='text-center'>28</td>
                    <td class='text-center'></td>
                    <td class='text-center'>35</td>
                    <td class='text-center'>28</td>
                    <td class='text-center'></td>
                    <td class='text-center'>35</td>
                    <td class='text-center'>28</td>
                    <td class='text-center'></td>
                    <td class='text-center'>35</td>
                    <td class='text-center'>28</td>
                    <td class='text-center'></td>
                    <td class='text-center'>35</td>
                    <td class='text-center'>28</td>
                    <td class='text-center'></td>
                    <td class='text-center'>35</td>
                    <td class='text-center'>28</td>
                    <td class='text-center'></td>
                    <td class='text-center'>35</td>
                    <td class='text-center'>28</td>
                    <td class='text-center'></td>
                    <td class='text-center'>35</td>
                    <td class='text-center'>28</td>
                    <td class='text-center'></td>
                    <td class='text-center'>35</td>
                    <td class='text-center'>28</td>
                    <td class='text-center'></td>
                    <td class='text-center'>35</td>
                    <td class='text-center'>28</td>
                    <td class='text-center'></td>
                    <td class='text-center'>35</td>
                    <td class='text-center'>663</td>

                </tr>   
                <tr>
                    <td class='cln'>1</td>
                    <td class='cln' colspan='6'>14001-A-001</td>
                    <td class='cln' colspan='12'> A MANIKUMAR</td>
                    <td class='cln' colspan='12'>A MALLAIAH</td>
                    <td class='cln' colspan='3'>M</td>
                    <td class='cln' colspan='3'>Completed</td>
                </tr>
                <tr>
                    <td class='text-center'>min</td>
                    <td class='text-center'>28</td>
                    <td class='text-center'></td>
                    <td class='text-center'>35</td>
                    <td class='text-center'>28</td>
                    <td class='text-center'></td>
                    <td class='text-center'>35</td>
                    <td class='text-center'>28</td>
                    <td class='text-center'></td>
                    <td class='text-center'>35</td>
                    <td class='text-center'>28</td>
                    <td class='text-center'></td>
                    <td class='text-center'>35</td>
                    <td class='text-center'>28</td>
                    <td class='text-center'></td>
                    <td class='text-center'>35</td>
                    <td class='text-center'>28</td>
                    <td class='text-center'></td>
                    <td class='text-center'>35</td>
                    <td class='text-center'>28</td>
                    <td class='text-center'></td>
                    <td class='text-center'>35</td>
                    <td class='text-center'>28</td>
                    <td class='text-center'></td>
                    <td class='text-center'>35</td>
                    <td class='text-center'>28</td>
                    <td class='text-center'></td>
                    <td class='text-center'>35</td>
                    <td class='text-center'>28</td>
                    <td class='text-center'></td>
                    <td class='text-center'>35</td>
                    <td class='text-center'>28</td>
                    <td class='text-center'></td>
                    <td class='text-center'>35</td>
                    <td class='text-center'>663</td>

                </tr>   
                <tr>
                    <td class='cln'>1</td>
                    <td class='cln' colspan='6'>14001-A-001</td>
                    <td class='cln' colspan='12'> A MANIKUMAR</td>
                    <td class='cln' colspan='12'>A MALLAIAH</td>
                    <td class='cln' colspan='3'>M</td>
                    <td class='cln' colspan='3'>Completed</td>
                </tr>
                <tr>
                    <td class='text-center'>min</td>
                    <td class='text-center'>28</td>
                    <td class='text-center'></td>
                    <td class='text-center'>35</td>
                    <td class='text-center'>28</td>
                    <td class='text-center'></td>
                    <td class='text-center'>35</td>
                    <td class='text-center'>28</td>
                    <td class='text-center'></td>
                    <td class='text-center'>35</td>
                    <td class='text-center'>28</td>
                    <td class='text-center'></td>
                    <td class='text-center'>35</td>
                    <td class='text-center'>28</td>
                    <td class='text-center'></td>
                    <td class='text-center'>35</td>
                    <td class='text-center'>28</td>
                    <td class='text-center'></td>
                    <td class='text-center'>35</td>
                    <td class='text-center'>28</td>
                    <td class='text-center'></td>
                    <td class='text-center'>35</td>
                    <td class='text-center'>28</td>
                    <td class='text-center'></td>
                    <td class='text-center'>35</td>
                    <td class='text-center'>28</td>
                    <td class='text-center'></td>
                    <td class='text-center'>35</td>
                    <td class='text-center'>28</td>
                    <td class='text-center'></td>
                    <td class='text-center'>35</td>
                    <td class='text-center'>28</td>
                    <td class='text-center'></td>
                    <td class='text-center'>35</td>
                    <td class='text-center'>663</td>

                </tr>   
                <tr>
                    <td class='cln'>1</td>
                    <td class='cln' colspan='6'>14001-A-001</td>
                    <td class='cln' colspan='12'> A MANIKUMAR</td>
                    <td class='cln' colspan='12'>A MALLAIAH</td>
                    <td class='cln' colspan='3'>M</td>
                    <td class='cln' colspan='3'>Completed</td>
                </tr>
                <tr>
                    <td class='text-center'>min</td>
                    <td class='text-center'>28</td>
                    <td class='text-center'></td>
                    <td class='text-center'>35</td>
                    <td class='text-center'>28</td>
                    <td class='text-center'></td>
                    <td class='text-center'>35</td>
                    <td class='text-center'>28</td>
                    <td class='text-center'></td>
                    <td class='text-center'>35</td>
                    <td class='text-center'>28</td>
                    <td class='text-center'></td>
                    <td class='text-center'>35</td>
                    <td class='text-center'>28</td>
                    <td class='text-center'></td>
                    <td class='text-center'>35</td>
                    <td class='text-center'>28</td>
                    <td class='text-center'></td>
                    <td class='text-center'>35</td>
                    <td class='text-center'>28</td>
                    <td class='text-center'></td>
                    <td class='text-center'>35</td>
                    <td class='text-center'>28</td>
                    <td class='text-center'></td>
                    <td class='text-center'>35</td>
                    <td class='text-center'>28</td>
                    <td class='text-center'></td>
                    <td class='text-center'>35</td>
                    <td class='text-center'>28</td>
                    <td class='text-center'></td>
                    <td class='text-center'>35</td>
                    <td class='text-center'>28</td>
                    <td class='text-center'></td>
                    <td class='text-center'>35</td>
                    <td class='text-center'>663</td>

                </tr>   
                <tr>
                    <td class='cln'>1</td>
                    <td class='cln' colspan='6'>14001-A-001</td>
                    <td class='cln' colspan='12'> A MANIKUMAR</td>
                    <td class='cln' colspan='12'>A MALLAIAH</td>
                    <td class='cln' colspan='3'>M</td>
                    <td class='cln' colspan='3'>Completed</td>
                </tr>
                <tr>
                    <td class='text-center'>min</td>
                    <td class='text-center'>28</td>
                    <td class='text-center'></td>
                    <td class='text-center'>35</td>
                    <td class='text-center'>28</td>
                    <td class='text-center'></td>
                    <td class='text-center'>35</td>
                    <td class='text-center'>28</td>
                    <td class='text-center'></td>
                    <td class='text-center'>35</td>
                    <td class='text-center'>28</td>
                    <td class='text-center'></td>
                    <td class='text-center'>35</td>
                    <td class='text-center'>28</td>
                    <td class='text-center'></td>
                    <td class='text-center'>35</td>
                    <td class='text-center'>28</td>
                    <td class='text-center'></td>
                    <td class='text-center'>35</td>
                    <td class='text-center'>28</td>
                    <td class='text-center'></td>
                    <td class='text-center'>35</td>
                    <td class='text-center'>28</td>
                    <td class='text-center'></td>
                    <td class='text-center'>35</td>
                    <td class='text-center'>28</td>
                    <td class='text-center'></td>
                    <td class='text-center'>35</td>
                    <td class='text-center'>28</td>
                    <td class='text-center'></td>
                    <td class='text-center'>35</td>
                    <td class='text-center'>28</td>
                    <td class='text-center'></td>
                    <td class='text-center'>35</td>
                    <td class='text-center'>663</td>

                </tr>   
                <tr>
                    <td class='cln'>1</td>
                    <td class='cln' colspan='6'>14001-A-001</td>
                    <td class='cln' colspan='12'> A MANIKUMAR</td>
                    <td class='cln' colspan='12'>A MALLAIAH</td>
                    <td class='cln' colspan='3'>M</td>
                    <td class='cln' colspan='3'>Completed</td>
                </tr>
                <tr>
                    <td class='text-center'>min</td>
                    <td class='text-center'>28</td>
                    <td class='text-center'></td>
                    <td class='text-center'>35</td>
                    <td class='text-center'>28</td>
                    <td class='text-center'></td>
                    <td class='text-center'>35</td>
                    <td class='text-center'>28</td>
                    <td class='text-center'></td>
                    <td class='text-center'>35</td>
                    <td class='text-center'>28</td>
                    <td class='text-center'></td>
                    <td class='text-center'>35</td>
                    <td class='text-center'>28</td>
                    <td class='text-center'></td>
                    <td class='text-center'>35</td>
                    <td class='text-center'>28</td>
                    <td class='text-center'></td>
                    <td class='text-center'>35</td>
                    <td class='text-center'>28</td>
                    <td class='text-center'></td>
                    <td class='text-center'>35</td>
                    <td class='text-center'>28</td>
                    <td class='text-center'></td>
                    <td class='text-center'>35</td>
                    <td class='text-center'>28</td>
                    <td class='text-center'></td>
                    <td class='text-center'>35</td>
                    <td class='text-center'>28</td>
                    <td class='text-center'></td>
                    <td class='text-center'>35</td>
                    <td class='text-center'>28</td>
                    <td class='text-center'></td>
                    <td class='text-center'>35</td>
                    <td class='text-center'>663</td>

                </tr> 
            </tbody>
        </table>";

                    #endregion
                    #region PageFooter
                    page += $@"  <div class='sm - spacer'></div>

          < div class='row btm_line'>
            <div class='col-md-4 '>E- ENDEXAM S-SESS*-EARLIER PASS   TOT NO OF CORR:NIL</div>
            <div class='col-md-2 '>ASST.</div>
            <div class='col-md-2 '>SUPDT.</div>
            <div class='col-md-2 '>SECRETARY/DY.</div>
            <div class='col-md-2 '>SECRETARY CONTROLLER OF EXAMINATION</div>
        </div>";
                    #endregion

                    sbString += page;
                    sbString += "</body></html>";

                    var converter = new HtmlToPdf();
                    converter.Options.ExternalLinksEnabled = true;
                    converter.Options.DrawBackground = false;
                    converter.Options.JavaScriptEnabled = false;
                    converter.Options.WebPageWidth = 1024;
                    converter.Options.MaxPageLoadTime = 240;
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
