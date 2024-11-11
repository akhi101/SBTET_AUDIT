using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace SoftwareSuite.Services.Admission
{
    public static class AttendanceService
    {

        public static void WriteToJsonFile<T>(string filePath, T objectToWrite) where T : new()
        {
            FileStream f = new FileStream(filePath, FileMode.Create);
            TextWriter writer = null;
            try
            {
                var contentsToWriteToFile = JsonConvert.SerializeObject(objectToWrite);
                writer = new StreamWriter(f);
                writer.Write(contentsToWriteToFile);
            }
            finally
            {
                if (writer != null)
                    writer.Close();
                f.Close();
                Console.WriteLine("File created successfully...");
            }
        }
    }
}