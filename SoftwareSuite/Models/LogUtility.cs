using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using MongoDB.Driver;

namespace SoftwareSuite.Models
{
    class s2sLog
    {
        public string msg { get; set; }
        public DateTime date { get; set; }
    }
    public static class LogUtility
    {
        public static void SaveS2SLog(string m, DateTime dt)
        {
            
            Task.Run(() =>
            {
                var client = new MongoClient(new MongoClientSettings { Server = new MongoServerAddress("10.10.151.30", 7125) });
                var db = client.GetDatabase("sbtet_logs");
                var s2sLogs = db.GetCollection<s2sLog>("s2sLogs");
                var s2s = new s2sLog
                {
                    msg = m,
                    date = dt
                };
                s2sLogs.InsertOneAsync(s2s);
            });
        }

        public static void SaveException(int userId, string areaName, int aType, Exception ex)
        {
            Task.Run(() =>
            {
                var client = new MongoClient(new MongoClientSettings { Server = new MongoServerAddress("10.10.151.30", 7125) });
                var db = client.GetDatabase("sbtet_logs");
                var serverExceptions = db.GetCollection<HbException>("serverExceptions");
                var exception = new HbException
                {
                    UserId = userId,
                    AreaName = areaName,
                    AreaType = aType,
                    ExceptionMessage = ex.Message,
                    ExceptionStack = ex.StackTrace,
                    ExceptionTime = DateTime.Now,
                    ExceptionType = ex.GetType().ToString()
                };
                serverExceptions.InsertOneAsync(exception);
            });
        }

        public static void SaveException(string areaName, int aType, Exception ex)
        {
            Task.Run(() =>
            {
                var client = new MongoClient(new MongoClientSettings { Server = new MongoServerAddress("10.10.151.30", 7125) });
                var db = client.GetDatabase("sbtet_logs");
                var serverExceptions = db.GetCollection<HbException>("serverExceptions");
                var exception = new HbException
                {
                    AreaName = areaName,
                    AreaType = aType,
                    ExceptionMessage = ex.Message,
                    ExceptionStack = ex.StackTrace,
                    ExceptionTime = DateTime.Now,
                    ExceptionType = ex.GetType().ToString()
                };
                serverExceptions.InsertOneAsync(exception);
            });
        }

        public static void SaveException(Exception ex)
        {
            Task.Run(() =>
            {
                var client = new MongoClient(new MongoClientSettings { Server = new MongoServerAddress("10.10.151.30", 7125) });
                var db = client.GetDatabase("sbtet_logs");
                var serverExceptions = db.GetCollection<HbException>("serverExceptions");
                var exception = new HbException
                {
                    ExceptionMessage = ex.Message,
                    ExceptionStack = ex.StackTrace,
                    ExceptionTime = DateTime.Now,
                    ExceptionType = ex.GetType().ToString()
                };
                serverExceptions.InsertOneAsync(exception);
            });
        }
    }
}
