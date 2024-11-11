using System;
using System.Collections.Generic;
using System.Data;
using System.Diagnostics;
using System.Linq;
using System.Reflection;
using System.Web;
using System.Text;
using System.IO;
using SoftwareSuite.Models.Database;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Spreadsheet;
using System.Data.OleDb;
using SharpCompress.Common;
using System.Configuration;

namespace SoftwareSuite.Models
{
    public class ExcelHelper
    {
        const int rowLimit = 65000;

        public DataTable ExelToDataSet(string destination)
        {
            DataTable dt = new DataTable();
            try
            {

                using (Stream fileStream = new FileStream(@destination, FileMode.Open, FileAccess.Read, FileShare.ReadWrite))
                {
                    using (SpreadsheetDocument spreadSheetDocument = SpreadsheetDocument.Open(fileStream, false))
                    {

                        WorkbookPart workbookPart = spreadSheetDocument.WorkbookPart;
                        IEnumerable<Sheet> sheets = spreadSheetDocument.WorkbookPart.Workbook.GetFirstChild<Sheets>().Elements<Sheet>();
                        string relationshipId = sheets.First().Id.Value;
                        WorksheetPart worksheetPart = (WorksheetPart)spreadSheetDocument.WorkbookPart.GetPartById(relationshipId);
                        Worksheet workSheet = worksheetPart.Worksheet;
                        SheetData sheetData = workSheet.GetFirstChild<SheetData>();
                        IEnumerable<Row> rows = sheetData.Descendants<Row>();

                        foreach (Cell cell in rows.ElementAt(0))
                        {
                            dt.Columns.Add(GetCellValue(spreadSheetDocument, cell));
                        }

                        foreach (Row row in rows) //this will also include your header row...
                        {
                            DataRow tempRow = dt.NewRow();

                            for (int i = 0; i < row.Descendants<Cell>().Count(); i++)
                            {
                                tempRow[i] = GetCellValue(spreadSheetDocument, row.Descendants<Cell>().ElementAt(i));
                            }

                            dt.Rows.Add(tempRow);
                        }

                    }
                }
            }
            catch (Exception ex)
            {

            }
            dt.Rows.RemoveAt(0); //...so i'm taking it out here.
            return dt;
        }


        public void ExportDataSet(DataSet ds, string destination)
        {
            try
            {
                using (var workbook = SpreadsheetDocument.Create(destination, DocumentFormat.OpenXml.SpreadsheetDocumentType.Workbook))
                {
                    var workbookPart = workbook.AddWorkbookPart();

                    workbook.WorkbookPart.Workbook = new DocumentFormat.OpenXml.Spreadsheet.Workbook();

                    workbook.WorkbookPart.Workbook.Sheets = new DocumentFormat.OpenXml.Spreadsheet.Sheets();

                    foreach (System.Data.DataTable table in ds.Tables)
                    {

                        var sheetPart = workbook.WorkbookPart.AddNewPart<WorksheetPart>();
                        var sheetData = new DocumentFormat.OpenXml.Spreadsheet.SheetData();
                        sheetPart.Worksheet = new DocumentFormat.OpenXml.Spreadsheet.Worksheet(sheetData);

                        DocumentFormat.OpenXml.Spreadsheet.Sheets sheets = workbook.WorkbookPart.Workbook.GetFirstChild<DocumentFormat.OpenXml.Spreadsheet.Sheets>();
                        string relationshipId = workbook.WorkbookPart.GetIdOfPart(sheetPart);

                        uint sheetId = 1;
                        if (sheets.Elements<DocumentFormat.OpenXml.Spreadsheet.Sheet>().Count() > 0)
                        {
                            sheetId =
                                sheets.Elements<DocumentFormat.OpenXml.Spreadsheet.Sheet>().Select(s => s.SheetId.Value).Max() + 1;
                        }

                        DocumentFormat.OpenXml.Spreadsheet.Sheet sheet = new DocumentFormat.OpenXml.Spreadsheet.Sheet() { Id = relationshipId, SheetId = sheetId, Name = table.TableName };
                        sheets.Append(sheet);

                        DocumentFormat.OpenXml.Spreadsheet.Row headerRow = new DocumentFormat.OpenXml.Spreadsheet.Row();

                        List<String> columns = new List<string>();
                        foreach (System.Data.DataColumn column in table.Columns)
                        {
                            columns.Add(column.ColumnName);

                            DocumentFormat.OpenXml.Spreadsheet.Cell cell = new DocumentFormat.OpenXml.Spreadsheet.Cell();
                            cell.DataType = DocumentFormat.OpenXml.Spreadsheet.CellValues.String;
                            cell.CellValue = new DocumentFormat.OpenXml.Spreadsheet.CellValue(column.ColumnName);
                            headerRow.AppendChild(cell);
                        }


                        sheetData.AppendChild(headerRow);

                        foreach (System.Data.DataRow dsrow in table.Rows)
                        {
                            DocumentFormat.OpenXml.Spreadsheet.Row newRow = new DocumentFormat.OpenXml.Spreadsheet.Row();
                            foreach (String col in columns)
                            {
                                DocumentFormat.OpenXml.Spreadsheet.Cell cell = new DocumentFormat.OpenXml.Spreadsheet.Cell();
                                cell.DataType = DocumentFormat.OpenXml.Spreadsheet.CellValues.String;
                                cell.CellValue = new DocumentFormat.OpenXml.Spreadsheet.CellValue(dsrow[col].ToString()); //
                                newRow.AppendChild(cell);
                            }

                            sheetData.AppendChild(newRow);
                        }

                    }
                }
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_GET_Notification", 0, ex.Message);
            }
        }

        public void ExportDataSetToAccess(DataSet ds, string destination)
        {


            try
            {



                // Connection string for Access database
                string connectionString = "Provider=Microsoft.ACE.OLEDB.12.0;Data Source=" + destination;

                // Create a new Access database file
                using (OleDbConnection connection = new OleDbConnection(connectionString))
                {
                    connection.Open();

                    // Iterate through each DataTable in the DataSet
                    foreach (DataTable table in ds.Tables)
                    {
                        // Create a new table in the Access database
                        string createTableQuery = "CREATE TABLE [" + table.TableName + "] (";

                        // Add columns to the create table query
                        foreach (DataColumn column in table.Columns)
                        {
                            createTableQuery += "[" + column.ColumnName + "] TEXT, ";
                        }

                        createTableQuery = createTableQuery.TrimEnd(',', ' ') + ")";

                        using (OleDbCommand createTableCommand = new OleDbCommand(createTableQuery, connection))
                        {
                            createTableCommand.ExecuteNonQuery();
                        }

                        // Insert rows into the newly created table
                        foreach (DataRow row in table.Rows)
                        {
                            string insertQuery = "INSERT INTO [" + table.TableName + "] (";

                            // Add column names to the insert query
                            foreach (DataColumn column in table.Columns)
                            {
                                insertQuery += "[" + column.ColumnName + "], ";
                            }

                            insertQuery = insertQuery.TrimEnd(',', ' ') + ") VALUES (";

                            // Add parameter placeholders to the insert query
                            for (int i = 0; i < table.Columns.Count; i++)
                            {
                                insertQuery += "?, ";
                            }

                            insertQuery = insertQuery.TrimEnd(',', ' ') + ")";

                            using (OleDbCommand insertCommand = new OleDbCommand(insertQuery, connection))
                            {
                                // Add parameter values to the insert command
                                foreach (DataColumn column in table.Columns)
                                {
                                    insertCommand.Parameters.AddWithValue("@" + column.ColumnName, row[column]);
                                }

                                insertCommand.ExecuteNonQuery();
                            }
                        }
                    }
                }

                //Console.WriteLine("Data exported to Access file successfully.");
            }
            catch (Exception ex)
            {
                // Handle errors
                Console.WriteLine("Error: " + ex.Message);
            }
        }


        public static DataTable ReadAsDataTable(string fileName)
        {
            DataTable dataTable = new DataTable();
            int lastRowProcessed = 0;

            try
            {
                using (Stream fileStream = new FileStream(@fileName, FileMode.Open, FileAccess.Read, FileShare.ReadWrite))
                {
                    using (SpreadsheetDocument spreadSheetDocument = SpreadsheetDocument.Open(fileStream, false))
                    {
                        WorkbookPart workbookPart = spreadSheetDocument.WorkbookPart;
                        IEnumerable<Sheet> sheets = spreadSheetDocument.WorkbookPart.Workbook.GetFirstChild<Sheets>().Elements<Sheet>();
                        string relationshipId = sheets.First().Id.Value;
                        WorksheetPart worksheetPart = (WorksheetPart)spreadSheetDocument.WorkbookPart.GetPartById(relationshipId);
                        Worksheet workSheet = worksheetPart.Worksheet;
                        SheetData sheetData = workSheet.GetFirstChild<SheetData>();
                        IEnumerable<Row> rows = sheetData.Descendants<Row>();

                        foreach (Cell cell in rows.ElementAt(0))
                        {
                            if (cell != null && cell.InnerText.Trim() != string.Empty)
                            {
                                dataTable.Columns.Add(GetCellValue(spreadSheetDocument, cell));
                            }
                        }

                        int dynCount = 0;
                        int colCount = 50;
                        colCount = colCount > 0 ? colCount : 10;


                        foreach (Row row in rows)
                        {
                            dynCount = row.Descendants<Cell>().Count();

                            DataRow dataRow = dataTable.NewRow();

                            for (int i = 0; i < colCount; i++)
                            {
                                if (row.Descendants<Cell>().ElementAt(i) != null && row.Descendants<Cell>().ElementAt(i).InnerText.Trim() != string.Empty)
                                {
                                    dataRow[i] = GetCellValue(spreadSheetDocument, row.Descendants<Cell>().ElementAt(i));
                                }
                            }

                            if (dataRow.ItemArray != null && (dataRow.ItemArray[0] != null && dataRow.ItemArray[0].ToString().Trim() != string.Empty))
                            {
                                dataTable.Rows.Add(dataRow);
                            }

                            lastRowProcessed++;
                        }

                    }
                }
                dataTable.Rows.RemoveAt(0);
            }
            catch (Exception ex)
            {
                //var methodname = new StackTrace(ex).GetFrames().Select(f => f.GetMethod()).First(m => m.Module.Assembly == Assembly.GetExecutingAssembly()).Name;
                //SaveErrors.SaveErrorData(ex, methodname + " Failed row at " + lastRowProcessed);
                dataTable = null;
            }


            return dataTable;
        }

        public static string GetExcelXml(DataTable dtInput, string filename)
        {
            var excelTemplate = getWorkbookTemplate();
            var ds = new DataSet();
            ds.Tables.Add(dtInput.Copy());
            var worksheets = getWorksheets(ds);
            var excelXml = string.Format(excelTemplate, worksheets);
            return excelXml;
        }

        private static string getWorkbookTemplate()
        {
            var sb = new StringBuilder();
            sb.Append("<xml version>\r\n<Workbook xmlns =\"urn:schemas-microsoft-com:office:spreadsheet\"\r\n");
            sb.Append(" xmlns:o=\"urn:schemas-microsoft-com:office:office\"\r\n xmlns: x =\"urn:schemas- microsoft-com:office:excel\"\r\n xmlns: ss =\"urn:schemas-microsoft-com:office:spreadsheet\">\r\n");
            sb.Append(" <Styles>\r\n < Style ss: ID =\"Default\" ss:Name=\"Normal\">\r\n < Alignment ss: Vertical =\"Bottom\"/>\r\n <Borders/>");
            sb.Append("\r\n <Font/>\r\n <Interior/>\r\n <NumberFormat/>\r\n < Protection />\r\n </ Style >\r\n < Style ss: ID =\"BoldColumn\">\r\n <Font ");
            sb.Append("x:Family=\"Swiss\" ss:Bold=\"1\"/>\r\n </Style>\r\n < Style ss: ID =\"s62\">\r\n <NumberFormat");
            sb.Append(" ss:Format=\"@\"/>\r\n </Style>\r\n < Style ss: ID =\"Decimal\">\r\n < NumberFormat ss: Format =\"0.0000\"/>\r\n </Style>\r\n ");
            sb.Append("<Style ss:ID=\"Integer\">\r\n < NumberFormat ss: Format =\"0\"/>\r\n </Style>\r\n < Style ss: ID =\"DateLiteral\">\r\n <NumberFormat ");
            sb.Append("ss:Format=\"mm/dd/yyyy;@\"/>\r\n </Style>\r\n < Style ss: ID =\"s28\">\r\n");
            sb.Append("<Alignment ss:Horizontal=\"Left\" ss:Vertical=\"Top\" ss: ReadingOrder =\"LeftToRight\" ss:WrapText=\"1\"/>\r\n");
            sb.Append("<Font x:CharSet=\"1\" ss:Size=\"9\" ss: Color =\"#808080\" ss:Underline=\"Single\"/>\r\n");
            sb.Append("<Interior ss:Color=\"#FFFFFF\" ss:Pattern=\"Solid\"/> </ Style >\r\n </ Styles >\r\n { 0}</ Workbook > ");
            return sb.ToString();
        }
        private static string replaceXmlChar(string input)
        {
            input = input.Replace("&", "&");
            input = input.Replace("<", "<");
            input = input.Replace(">", ">");
            input = input.Replace("\"", "&quot;");
            input = input.Replace("'", "&apos;");
            return input;
        }
        private static string getWorksheets(DataSet source)
        {
            var sw = new StringWriter();
            if (source == null || source.Tables.Count == 0)
            {
                sw.Write("<Worksheet ss:Name=\"Sheet1\"><Table><Row> < Cell  ss: StyleID =\"s62\"><Data ss:Type=\"String\"></Data> </ Cell ></ Row ></ Table ></ Worksheet > ");
                return sw.ToString();
            }
            foreach (DataTable dt in source.Tables)
            {
                if (dt.Rows.Count == 0)
                    sw.Write("<Worksheet ss:Name=\"" + replaceXmlChar(dt.TableName) + "\"><Table><Row><Cell  ss:StyleID=\"s62\"> < Data ss: Type =\"String\"></Data></Cell></Row> </ Table ></ Worksheet > ");
                else
                {
                    //write each row data
                    var sheetCount = 0;
                    for (int i = 0; i < dt.Rows.Count; i++)
                    {
                        if ((i % rowLimit) == 0)
                        {
                            //add close tags for previous sheet of the same data table
                            if ((i / rowLimit) > sheetCount)
                            {
                                sw.Write("</Table></Worksheet>");
                                sheetCount = (i / rowLimit);
                            }
                            sw.Write("<Worksheet ss:Name=\"" + replaceXmlChar(dt.TableName) +
                                     (((i / rowLimit) == 0) ? "" :
                Convert.ToString(i / rowLimit)) + "\"><Table>");
                            //write column name row
                            sw.Write("<Row>");
                            foreach (DataColumn dc in dt.Columns)
                                sw.Write(
                                    string.Format("<Cell ss:StyleID=\"BoldColumn\"> < Data ss: Type =\"String\">{0}</Data></Cell>", replaceXmlChar(dc.ColumnName)));
                            sw.Write("</Row>\r\n");
                        }
                        sw.Write("<Row>\r\n");
                        foreach (DataColumn dc in dt.Columns)
                            sw.Write(
                                string.Format("<Cell ss:StyleID=\"s62\"><Data ss:Type=\"String\"> { 0}</ Data ></ Cell > ", replaceXmlChar(dt.Rows[i][dc.ColumnName].ToString())));
                        sw.Write("</Row>\r\n");
                    }
                    sw.Write("</Table></Worksheet>");
                }
            }

            return sw.ToString();
        }

        public static string GetExcelXml(DataSet dsInput, string filename)
        {
            var excelTemplate = getWorkbookTemplate();
            var worksheets = getWorksheets(dsInput);
            var excelXml = string.Format(excelTemplate, worksheets);
            return excelXml;
        }

        public static void ToExcel
(DataSet dsInput, string filename, HttpResponse response)
        {
            var excelXml = GetExcelXml(dsInput, filename);
            response.Clear();
            response.AppendHeader("Content-Type", "application/vnd.ms-excel");
            response.AppendHeader
        ("Content-disposition", "attachment; filename=" + filename);
            response.Write(excelXml);
            response.Flush();
            response.End();
        }

        public static void ToExcel
        (DataTable dtInput, string filename, HttpResponse response)
        {
            var ds = new DataSet();
            ds.Tables.Add(dtInput.Copy());
            ToExcel(ds, filename, response);
        }


        private static string GetCellValue(SpreadsheetDocument document, Cell cell)
        {
            SharedStringTablePart stringTablePart = document.WorkbookPart.SharedStringTablePart;
            string value = cell.CellValue.InnerXml;

            if (cell.DataType != null && cell.DataType.Value == CellValues.SharedString)
            {
                return stringTablePart.SharedStringTable.ChildElements[Int32.Parse(value)].InnerText;
            }
            else
            {
                return value;
            }
        }

        internal void ExportDataSet(DataTableCollection tables, string v)
        {
            throw new NotImplementedException();
        }

        internal void ExportDataSet(DataTable dataTable, string v)
        {
            throw new NotImplementedException();
        }
    }
}
