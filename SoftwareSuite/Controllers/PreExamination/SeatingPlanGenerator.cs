using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using PdfSharp.Pdf.IO;
using SelectPdf;
using SoftwareSuite.Models;

namespace SoftwareSuite.Controllers.PreExamination
{
    public class SeatingPlanGenerator
    {

        public string GenerateExamHallPdfs(List<ExamMatrix> examMatrix, List<SeatingAvailableExamHall> examHalls, string collegeCode, string collegeName, string examDate, string timeSlot)
        {
            var dir_id = Guid.NewGuid().ToString();
            var dir = AppDomain.CurrentDomain.BaseDirectory + @"Reports\Seating\" + dir_id;
            CreateIfMissing(dir);
            int pn = 1;
            var halls = examMatrix.Select(x => x.HallId).Distinct();
            var htmls = new List<string>();
            htmls.Add(@"<html>"
                    + "<head>"
                    + "<title>Seating Plan</title>"
                    + @"<link href='https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.6/css/bootstrap.min.css' rel='stylesheet' type='text/css' />"
                    + @"<style type='text/css'>html{min-width:1024px;max-width:1024px;width:1024px;float:none;}body{min-width:1024px;max-width:1024px;width:1024px;margin-left:10px;float:none;}table{font-family:Helvetica,Arial,sans-serif;width:100%;border-collapse:collapse;border-spacing:0}td,th{border:1px solid #CCC;height:40px}th{font-weight:bold}td{text-align:center}@media print{.head_print{page-break-before:always}}</style>"
                    + "</head><body>");
            foreach (var hallId in halls)
            {
                var hallName = examHalls.First(x => x.Id == hallId).HallName;
                var seats = examMatrix.Where(x => x.HallId == hallId).ToList();
                var seatingHtml = GenerateHallHtml(seats, hallName, collegeCode, collegeName, examDate, timeSlot);
                htmls.Add(seatingHtml);
            }
            htmls.Add("</body></html>");
            var converter = new HtmlToPdf();
            converter.Options.ExternalLinksEnabled = true;
            converter.Options.DrawBackground = false;
            converter.Options.JavaScriptEnabled = false;
            converter.Options.WebPageWidth = 1024;
            converter.Options.PdfPageSize = PdfPageSize.A4;
            converter.Options.PdfPageOrientation = PdfPageOrientation.Landscape;

            var doc = converter.ConvertHtmlString(string.Join("", htmls));
            string pdfName = $"SeatingPlan_{Guid.NewGuid()}.pdf";
            doc.Save($"{AppDomain.CurrentDomain.BaseDirectory}\\Reports\\{pdfName}");
            doc.Close();
            return $"/Reports/{pdfName}";
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

        private string GenerateHallHtml(List<ExamMatrix> examMatrix, string examHall, string collegeCode, string collegeName, string examDate, string timeSlot)
        {
            Dictionary<string, string> timeSlots = new Dictionary<string, string>();
            timeSlots.Add("FN", "09:30 AM to 11:30 AM");
            timeSlots.Add("AN", "02:00 PM to 04:00 PM");
            timeSlots.Add("F1", "11:30 PM to 12:30 PM");
            timeSlots.Add("F2", "11:30 PM to 12:30 PM");
            timeSlots.Add("A1", "04:00 PM to 05:00 PM");
            timeSlots.Add("A2", "04:00 PM to 05:00 PM");
            string html = "";
            string sbString = html;
            #region PageHeader
            var page = $@"<br /><br /><div class='row'><div class='col-md-2'></div><div class='col-md-1'><img height='50' class='float: right;' src='https://sbtet.telangana.gov.in/contents/img/big-logo.png' /></div><div class='col-md-9'>
                                <h4 class='text-center head_print'><b>STATE BOARD OF TECHNICAL EDUCATION AND TRAINING, TELANGANA</b></h5>
                                <h6 class='text-center'><b>SEATING PLAN</b></h6></div>
                            </div>
                            <div class='col-md-9'>
                                <div class='head_text'>Exam Center Code:  {collegeCode} - {collegeName}</div>
                                <div class='head_text'>Exam Hall:  {examHall}</div>
                                <div class='head_text'>Exam Date:  {examDate}</div>
                                <div class='head_text'>Time Slot:  {timeSlot} - {timeSlots[timeSlot]?.ToString()}</div>
                            </div>";
            #endregion
            #region PageContent
            var col1Stu = examMatrix.Where(x => x.Column == 1).OrderBy(x => x.Row).ToList();
            var col2Stu = examMatrix.Where(x => x.Column == 2).OrderBy(x => x.Row).ToList();
            var col3Stu = examMatrix.Where(x => x.Column == 3).OrderBy(x => x.Row).ToList();
            page += @"<br /><div class='row container-fluid'>";
            if (col1Stu.Count > 0)
            {
                page += @"<div class='col-md-4 col-sm-4'>";
                page += @"<table>
                        <thead>
                            <tr>
                                <th id='tbl_head1'><b>S.No</b></th>
                                <th id='tbl_head1'><b>Student 1</b></th> 
								<th id='tbl_head2'><b>Student 2</b></th>
							</tr></thead><tbody>";
                for (var i = 0; i < col1Stu.Count; i++)
                {
                    page += $@"<tr>
                                <td id='tbl_head1'><b>{col1Stu[i].Row}</b></td>
                                <td id='tbl_head1'><b>{col1Stu[i].Students[0]?.Pin}</b></td> 
								<td id='tbl_head2'><b>{col1Stu[i].Students[1]?.Pin}</b></td>
							</tr>";
                }
                page += "</tbody></table></div>";
            }
            if (col2Stu.Count > 0)
            {
                page += @"<div class='col-md-4 col-sm-4'>";
                page += @"<table>
                        <thead>
                            <tr>
                                <th id='tbl_head1'><b>S.No</b></th>
                                <th id='tbl_head1'><b>Student 1</b></th> 
								<th id='tbl_head2'><b>Student 2</b></th>
							</tr></thead><tbody>";
                for (var i = 0; i < col2Stu.Count; i++)
                {
                    page += $@"<tr>
                                <td id='tbl_head1'><b>{col2Stu[i].Row}</b></td>
                                <td id='tbl_head1'><b>{col2Stu[i].Students[0]?.Pin}</b></td> 
								<td id='tbl_head2'><b>{col2Stu[i].Students[1]?.Pin}</b></td>
							</tr>";
                }
                page += "</tbody></table></div>";
            }
            if (col3Stu.Count > 0)
            {
                page += @"<div class='col-md-4 col-sm-4'>";
                page += @"<table>
                        <thead>
                            <tr>
                                <th id='tbl_head1'><b>S.No</b></th>
                                <th id='tbl_head1'><b>Student 1</b></th> 
								<th id='tbl_head2'><b>Student 2</b></th>
							</tr></thead><tbody>";
                for (var i = 0; i < col3Stu.Count; i++)
                {
                    page += $@"<tr>
                                <td id='tbl_head1'><b>{col3Stu[i].Row}</b></td>
                                <td id='tbl_head1'><b>{col3Stu[i].Students[0]?.Pin}</b></td> 
								<td id='tbl_head2'><b>{col3Stu[i].Students[1]?.Pin}</b></td>
							</tr>";
                }
                page += "</tbody></table>";
                page += "<br /><p>No. of Students Present: </p><p>Total No. of Students: </p>";
                page += "</div>";
            }
            page += "</div><p style='page-break-before: always;'></p>";
            #endregion

            sbString += page;
            return sbString.Replace('\t', ' ').Replace('\r', ' ').Replace('\n', ' ');
        }

        private void CreateIfMissing(string path)
        {
            bool folderExists = Directory.Exists(path);
            if (!folderExists)
                Directory.CreateDirectory(path);
        }
    }
}
