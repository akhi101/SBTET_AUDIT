using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SoftwareSuite.Models.Results
{
    public class ExamTypeInfo
    {
        public int ID { get; set; }
        public string ExamType { get; set; }
    }
    public class ExamTypeData
    {
        public List<ExamTypeInfo> typeInfo { get; set; }
    }
    public class BranchInfo
    {
        public string BranchCode { get; set; }
        public string Branch { get; set; }
        public int BranchId { get; set; }
    }

    public class SchemeSemBranchData
    {
        public List<SchemeInfo> schemeInfo { get; set; }
        public List<SemInfo> semInfo { get; set; }
        public List<BranchInfo> branchInfo { get; set; }

    }
    public class StudentWiseReportData
    {
        public List<StudentWiseReport> studentWiseReport { get; set; }
        public List<StudentInfo> studentInfo { get; set; }
        public List<BranchSubjectGradeInfo> branchSubjectGradeInfo { get; set; }
        public List<StudentSGPACGPAInfo> studentSGPACGPAInfo { get; set; }
        public List<StudentActivities> studentActvities { get; set; }
        public List<StudnetSubjectTotals> studentSubjectTotal { get; set; }
        public List<CumulativeGradeInfo> CumulativeGradeInfo { get; set; }
        public List<C18suppleGradeInfo> C18suppleGradeInfo { get; set; }
        public List<C18SemInfo> C18SemInfo { get; set; }
    }

    public class C18MidStudentWiseReportData
    {
        public List<StudentWiseReport> studentWiseReport { get; set; }
        public List<StudentInfo> studentInfo { get; set; }     
    }

    public class StudentSGPACGPAInfo
    {
        public double SGPA { get; set; }

        public double CGPA { get; set; }
        public double SgpaTotalPoints { get; set; }
        public double SgpaTotalCredits { get; set; }

        public double CgpaTotalPoints { get; set; }

        public double CgpaTotalCredits { get; set; }
    }

    public class StudnetSubjectTotals
    {
        public double TotalCredits { get; set; }
        public double TotalCreditsEarned { get; set; }
        public double TotalSubjects { get; set; }
       

        // public double TotalGrades { get; set; }
        public string Result { get; set; }
        public string AcadamicYear { get; set; }
    }

    public class CumulativeGradeInfo
    {

        public double CumulativeMaxCredits { get; set; }
        public double CumulativeCreditsGained { get; set; }
        public double CumulativeGradePointsGained { get; set; }
    }

    public class StudentActivities
    {
        public string SubjectName { get; set; }
        public double CreditsGained { get; set; }
        public string HybridGrade { get; set; }
        public double MaxCredits { get; set; }

    }
    public class StudentInfo
    {

        public string Pin { get; set; }
        public string StudentName { get; set; }
        public string BranchName { get; set; }
        public string BranchCode { get; set; }
        public string Sem { get; set; }
        public string CollegeCode { get; set; }
        public string CollegeName { get; set; }
        public string ExamType { get; set; }
        public string ExamMonthYear { get; set; }
    }
    public class C18MidStudentWiseReport
    {

        public string SubjectCode { get; set; }
        public string SubjectName { get; set; }
        public string Marks { get; set; }
    }

    public class C18suppleGradeInfo
    {

        public string TotalCredits { get; set; }
        public string CreditsGained { get; set; }
        public string Result { get; set; }
        public string AcadamicYear { get; set; }
        public double CumulativeCreditsGained { get; set; }
    }
    public class C18SemInfo
    {

        public int SemId { get; set; }
        public string Semester { get; set; }
    } 

    public class StudentWiseReport
    {

        public string Subject_Code { get; set; }
        public string SubjectName { get; set; }
        public string MID1_MARKS { get; set; }
        public string MID2_MARKS { get; set; }
        public string Internal_MARKS { get; set; }
        public string EndSemMarks { get; set; }
        public string HybridGrade { get; set; }
        public string SubjectTotal { get; set; }
        public string GradePoint { get; set; }
        public string Semester { get; set; }
        public string Result { get; set; }
        public double MaxCredits { get; set; }
        public string CreditsGained { get; set; }
        public string SemId { get; set; }
        public string TotalGradePoints { get; set; }
    }


    public class OldStudentWiseReport
    {

        public string Branch_Code { get; set; }
        public string Subject_Code { get; set; }
        public string SubjectName { get; set; }
        public string Internal_MARKS { get; set; }
        public string EndSemMarks { get; set; }
        public float SubjectTotal { get; set; }
        public float Remarks { get; set; }
        public string Semister { get; set; }
        public string Result { get; set; }
        public double Total { get; set; }
    }

    public class OldStudentInfo
    {

        public string Pin { get; set; }
        public string CollegeCode { get; set; }
        public string StudentName { get; set; }
        public string CollegeName { get; set; }
        public string BranchCode { get; set; }
        public string WholeorSuplly { get; set; }
        public string BranchName { get; set; }
        public string Sem { get; set; }
        public string ExamType { get; set; }
    }

    public class OldStudentWiseReportData
    {
        public List<OldStudentWiseReport> oldstudentwisereport { get; set; }
        public List<OldStudentInfo> oldstudentinfo { get; set; }
        //  public list<oldstudentactivities> oldstudentactivities { get; set; }
        //  public list<oldstudnetsubjecttotals> oldstudnetsubjecttotals { get; set; }
    }
}
