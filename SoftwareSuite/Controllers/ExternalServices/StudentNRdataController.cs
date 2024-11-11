using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace SoftwareSuite.Controllers.ExternalServices
{
    public class StudentNRdataController : ApiController
    {
        public class NRdata
        {
            public string Pin { get; set; }
            public string Name { get; set; }
            public string CollegeCode { get; set; }
            public string BranchCode { get; set; }
            public string BranchName { get; set; }
            public string Scheme { get; set; }
            public string Semester { get; set; }
            public string AcademicYear { get; set; }
            public string ExamYear { get; set; }
            public string ExamCenter { get; set; }
            public string ExamCenterCode { get; set; }
            public string SubjectCode { get; set; }
            public string SubjectName { get; set; }
            public string ExamDate { get; set; }
            public string SessionTime { get; set; }
            public string BarcodeUID { get; set; }
            public string StudentType { get; set; }
            public DateTime TimeStamp { get; set; }

        }




    }
}
