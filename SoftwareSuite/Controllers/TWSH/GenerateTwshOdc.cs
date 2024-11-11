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
    public class GenerateTwshOdc 
    {

        public class OdcData
        {
            public string CENTRECODE { get; set; }
            public string INSTCODE { get; set; }
            public string SLNO { get; set; }
            public string STUDENTNAME { get; set; }
            public string FATHERNAME { get; set; }
            public string GENDER { get; set; }
            public string ROLL_NO { get; set; }
            public string SUBNAME { get; set; }
            public string HELD_IN { get; set; }
            public string DIVISION { get; set; }
            public string PAPERONE { get; set; }
            public string PAPERTWO { get; set; }
            public string DATEOFBIRTH { get; set; }
            public string RES_DATE { get; set; }
            public string PHOTO_NAME { get; set; }
            public string INST_NAME { get; set; }
            public string PhotoPath { get; set; }
        }

        private void CreateIfMissing(string path)
        {
            bool folderExists = Directory.Exists(path);
            if (!folderExists)
                Directory.CreateDirectory(path);
        }
        public string GetOdcData(DataSet ds)
        {
            string dirPath = AppDomain.CurrentDomain.BaseDirectory + @"Reports\TwshOdc";
            if (ds.Tables.Count < 1)
            {
                return null;
            }

            CreateIfMissing(dirPath);
            var guid = Guid.NewGuid().ToString();
            var zip_file = guid + ".zip";
            var excel_file = guid + ".xlsx";
            var err_file = guid + ".log";
            var TwshOdcData = DataTableHelper.ConvertDataTable<OdcData>(ds.Tables[0]);

            using (SpreadsheetDocument document = SpreadsheetDocument.Create(dirPath + "\\" + excel_file, SpreadsheetDocumentType.Workbook))
            {
                WorkbookPart workbookPart = document.AddWorkbookPart();
                workbookPart.Workbook = new Workbook();

                WorksheetPart worksheetPart = workbookPart.AddNewPart<WorksheetPart>();
                worksheetPart.Worksheet = new Worksheet();

                Sheets sheets = workbookPart.Workbook.AppendChild(new Sheets());

                Sheet sheet = new Sheet() { Id = workbookPart.GetIdOfPart(worksheetPart), SheetId = 1, Name = "Twsh_ODC" };

                sheets.Append(sheet);

                workbookPart.Workbook.Save();

                SheetData sheetData = worksheetPart.Worksheet.AppendChild(new SheetData());
                var st = new OdcData
                {
                    CENTRECODE = "CENTRECODE",
                    INSTCODE = "INSTCODE",
                    SLNO = "SLNO",
                    STUDENTNAME = "STUDENTNAME",
                    FATHERNAME = "FATHERNAME",
                    GENDER = "GENDER",
                    ROLL_NO = "ROLL_NO",
                    SUBNAME = "SUBNAME",
                    HELD_IN = "HELD_IN",
                    DIVISION = "DIVISION",
                    PAPERONE = "PAPERONE",
                    PAPERTWO = "PAPERTWO",
                    DATEOFBIRTH = "DATEOFBIRTH",
                    RES_DATE = "RES_DATE",
                    PHOTO_NAME = "PHOTO_NAME",
                    INST_NAME = "INST_NAME"
                };
                sheetData.AppendChild(GetRowForStudent(st));
                foreach (var s in TwshOdcData)
                {
                    Row r = GetRowForStudent(s);
                    sheetData.Append(r);
                }
                worksheetPart.Worksheet.Save();
                document.Close();
            }

            var Photos = TwshOdcData.Select(x => new { x.PHOTO_NAME,x.PhotoPath}).Distinct().ToList();
            var Event = TwshOdcData.Select(x => new { x.HELD_IN }).Distinct().ToList();
            var path = ConfigurationManager.AppSettings["TwshOdcStudentPhotos"].ToString();
            try
            {
                using (Stream stream = File.OpenWrite(dirPath + "\\" + zip_file))
                {
                    using (var writer = WriterFactory.Open(stream, ArchiveType.Zip, CompressionType.LZMA))
                    {
                        writer.Write(Path.GetFileName("TWSH_ODC.xlsx"), dirPath + "\\" + excel_file);
                        foreach (var tmp in Photos)
                        {
                            if (File.Exists(path + '/' + tmp.PHOTO_NAME + ".jpg"))
                                writer.Write(Path.GetFileName(tmp.PHOTO_NAME + ".jpg"), path + '/' + tmp.PHOTO_NAME + ".jpg");
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

        private Row GetRowForStudent(OdcData s)
        {
            Row r = new Row();
            r.Append(GetStringCell(s.CENTRECODE));
            r.Append(GetStringCell(s.INSTCODE));
            r.Append(GetStringCell(s.SLNO));
            r.Append(GetStringCell(s.STUDENTNAME));
            r.Append(GetStringCell(s.FATHERNAME));
            r.Append(GetStringCell(s.GENDER));
            r.Append(GetStringCell(s.ROLL_NO));
            r.Append(GetStringCell(s.SUBNAME));
            r.Append(GetStringCell(s.HELD_IN));
            r.Append(GetStringCell(s.DIVISION));
            r.Append(GetStringCell(s.PAPERONE));
            r.Append(GetStringCell(s.PAPERTWO));
            r.Append(GetStringCell(s.DATEOFBIRTH));
            r.Append(GetStringCell(s.RES_DATE));
            r.Append(GetStringCell(s.PHOTO_NAME));
            r.Append(GetStringCell(s.INST_NAME));
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
