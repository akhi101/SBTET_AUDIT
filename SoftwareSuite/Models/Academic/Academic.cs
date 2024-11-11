using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SoftwareSuite.Models.Academic
{
    
        public class SetSemesterDatereqdata
    {
            public int semid { get; set; }
            public int AcademicYearId { get; set; }
            public int Schemeid { get; set; }
            public string StartDate { get; set; }
            public string EndDate { get; set; }
        }

    public class SetAlphaData
    {
        public int SchemeId { get; set; }
        public int SemId { get; set; }
        public string CollegeCode { get; set; }
        public string BranchCode { get; set; }
        public string json { get; set; }
    }

}