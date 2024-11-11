using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SoftwareSuite.Models.Results
{

    public class CollegeInfo
    {
        public int CollegeId { get; set; }

        public string CollegeCode { get; set; }

        public string college_name { get; set; }
    }

    public class SchemeInfo
    {
        public int SchemeId { get; set; }
        public string SchemeCode { get; set; }
        public string SchemeYear { get; set; }
    }

    public class SemInfo
    {
        public int SemId { get; set; }
        public string yearsem { get; set; }
    }

    public class CollegeSchemeSemData
    {
        public List<CollegeInfo> collegeInfo { get; set; }

        public List<SchemeInfo> schemeInfo { get; set; }

        public List<SemInfo> semInfo { get; set; }
    }
    public class CollegeSemWiseReport
    {
        public string pin { get; set; }
        public string Branch_Code { get; set; }
        public string CODE { get; set; }
        public string SubjectName { get; set; }
        public string HybridGrade { get; set; }
        public string Scheme_Code { get; set; }
        public string Semister { get; set; }
        public string GradeInformation { get; set; }
        public int MID1_MARKS { get; set; }
        public int MID2_MARKS { get; set; }
        public int Internal_MARKS { get; set; }
        public int EndSemMarks { get; set; }
        public int SubjectTotal { get; set; }
    }
}