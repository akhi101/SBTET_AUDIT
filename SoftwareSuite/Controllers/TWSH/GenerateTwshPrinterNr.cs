using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.IO;
using System.Linq;
using System.Web;
using DocumentFormat.OpenXml;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Spreadsheet;
using SharpCompress.Common;
using SharpCompress.Writers;
using SoftwareSuite.Models.Database;

namespace SoftwareSuite.Controllers.TWSH
{
    public class GenerateTwshPrinterNr
    {

        public class PrinterNrData
        {

            public string Hallticket { get; set; }
            public string StudentName { get; set; }
            public string ExamBatch { get; set; }
            public string GradeCode { get; set; }
            public string GradeName { get; set; }
            public string ExaminationCentreCode { get; set; }
            public string ExaminationCenterName { get; set; }
            public string LanguageName { get; set; }
            public string Paper { get; set; }
            public string ApplicationNumber { get; set; }
            public string PhotoPath { get; set; }
            public string PhotoURL { get; set; }
        }

        private void CreateIfMissing(string path)
        {
            bool folderExists = Directory.Exists(path);
            if (!folderExists)
                Directory.CreateDirectory(path);
        }
        public string GeneratePrinterNr(DataSet ds)
        {
            string dirPath = AppDomain.CurrentDomain.BaseDirectory + @"Reports\TwshPrinterNR";
            if (ds.Tables.Count < 1)
            {
                return null;
            }

            CreateIfMissing(dirPath);
            var guid = Guid.NewGuid().ToString();
            var zip_file = guid + ".zip";
            var excel_file = guid + ".xlsx";
            var err_file = guid + ".log";
            var TwshNRData = DataTableHelper.ConvertDataTable<PrinterNrData>(ds.Tables[0]);

            using (SpreadsheetDocument document = SpreadsheetDocument.Create(dirPath + "\\" + excel_file, SpreadsheetDocumentType.Workbook))
            {
                WorkbookPart workbookPart = document.AddWorkbookPart();
                workbookPart.Workbook = new Workbook();

                WorksheetPart worksheetPart = workbookPart.AddNewPart<WorksheetPart>();
                worksheetPart.Worksheet = new Worksheet();

                Sheets sheets = workbookPart.Workbook.AppendChild(new Sheets());

                Sheet sheet = new Sheet() { Id = workbookPart.GetIdOfPart(worksheetPart), SheetId = 1, Name = "Twsh_PrinterNr" };

                sheets.Append(sheet);

                workbookPart.Workbook.Save();

                SheetData sheetData = worksheetPart.Worksheet.AppendChild(new SheetData());
                var st = new PrinterNrData
                {

                    Hallticket= "Hallticket",
                    StudentName = "StudentName",
                    ExamBatch = "ExamBatch",
                    GradeCode = "GradeCode",
                    GradeName = "GradeName",
                    ExaminationCentreCode = "ExaminationCentreCode",
                    ExaminationCenterName = "ExaminationCenterName",
                    LanguageName = "LanguageName",
                    Paper = "Paper",
                    ApplicationNumber = "ApplicationNumber",
                    PhotoPath = "PhotoPath",
                    PhotoURL = "PhotoURL"
                };
                sheetData.AppendChild(GetRowForStudent(st));
                foreach (var s in TwshNRData)
                {
                    Row r = GetRowForStudent(s);
                    sheetData.Append(r);
                }
                worksheetPart.Worksheet.Save();
                document.Close();
            }

            var Photos = TwshNRData.Select(x => new { x.ApplicationNumber, x.PhotoPath }).Distinct().ToList();
            var path = ConfigurationManager.AppSettings["TwshStudentPhotos"].ToString();
            try
            {
                using (Stream stream = File.OpenWrite(dirPath + "\\" + zip_file))
                {
                    using (var writer = WriterFactory.Open(stream, ArchiveType.Zip, CompressionType.LZMA))
                    {
                        writer.Write(Path.GetFileName("TWSH_PrinterNr.xlsx"), dirPath + "\\" + excel_file);
                        foreach (var tmp in Photos)
                        {
                            if (File.Exists(tmp.PhotoPath))
                                writer.Write(Path.GetFileName(tmp.ApplicationNumber + ".jpg"), tmp.PhotoPath);
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
            r.Append(GetStringCell(s.Hallticket));
            r.Append(GetStringCell(s.StudentName));
            r.Append(GetStringCell(s.ExamBatch));
            r.Append(GetStringCell(s.GradeCode));
            r.Append(GetStringCell(s.GradeName));
            r.Append(GetStringCell(s.ExaminationCentreCode));
            r.Append(GetStringCell(s.ExaminationCenterName));
            r.Append(GetStringCell(s.LanguageName));
            r.Append(GetStringCell(s.Paper));
            r.Append(GetStringCell(s.ApplicationNumber));
            r.Append(GetStringCell(s.PhotoPath));
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

    }

}
