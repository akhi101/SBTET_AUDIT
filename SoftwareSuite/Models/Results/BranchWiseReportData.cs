using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SoftwareSuite.Models.Results
{

    public class BranchWiseReport
    {
        public string pin { get; set; }
        public string Branch_Code { get; set; }
        public string CODE { get; set; }
        public string SubjectName { get; set; }
        public string HybridGrade { get; set; }
        public string Scheme_Code { get; set; }
        public string Semister { get; set; }
        public string MID1_MARKS { get; set; }
        public string MID2_MARKS { get; set; }
        public string Internal_MARKS { get; set; }
        public string EndSemMarks { get; set; }
        public string SubjectTotal { get; set; }
        public string ExamType { get; set; }
        public string CollegeCode { get; set; }
        public string CollegeName { get; set; }
    }

    public class StudentSubjectTotalSGPA
    {
        public string pin { get; set; }
        public float total { get; set; }
        public string TotalCredits { get; set; }
        public string Studentname { get; set; }
        public string SGPA { get; set; }
        public string CGPA { get; set; }
        public string SemExamStatus { get; set; }
        public string TotalGradePoints { get; set; }
    }

    public class BranchWiseReportData
    {
        public List<BranchSubjectGradeInfo> branchSubjectGradeInfo { get; set; }
        public List<BranchWiseReport> branchWiseReport { get; set; }
        public List<StudentSubjectTotalSGPA> studentSubjectTotalSGPA { get; set; }

    }

    public class BranchWiseOldReportData
    {
        public List<BranchSubjectGradeInfo> branchSubjectGradeInfo { get; set; }
        public List<BranchWiseReport> branchWiseReport { get; set; }
        public List<StudentSubjectTotalSGPA> studentSubjectTotalSGPA { get; set; }

    }
}
