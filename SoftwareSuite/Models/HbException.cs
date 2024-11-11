using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MongoDB.Bson;

namespace SoftwareSuite.Models
{
    public class HbException
    {
        public ObjectId Id { get; set; }
        public int? UserId { get; set; }
        public string AreaName { get; set; }
        public int? AreaType { get; set; }
        public string ExceptionType { get; set; }
        public string ExceptionMessage { get; set; }
        public string ExceptionStack { get; set; }
        public DateTime ExceptionTime { get; set; }
    }
}
