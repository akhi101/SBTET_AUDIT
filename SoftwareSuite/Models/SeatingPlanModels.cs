using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SoftwareSuite.Models
{
    public class SeatingStudents
    {
        public string PCode { get; set; }
        public string SubjectName { get; set; }
        public string BranchName { get; set; }
        public int BranchId { get; set; }
        public int SubId { get; set; }
        public string ExamDate { get; set; }
        public string Pin { get; set; }
        public string Name { get; set; }
        public string Scheme { get; set; }
        public string Semester { get; set; }
        public int SemId { get; set; }
        public string ExamSeat { get; set; }
        public string ExamHallName { get; set; }
    }

    public class SeatingBranchCount
    {
        public string scheme { get; set; }
        public int branchid { get; set; }
        public string semester { get; set; }
        public int semid { get; set; }
        public int subId { get; set; }
        public string PCode { get; set; }
        public int onrollcountbysem { get; set; }
    }

    public class SeatingPCodeCount
    {
        public string Pcode { get; set; }
        public int TotalNoOfStudents { get; set; }
    }

    public class SeatingAvailableExamHall
    {
        public int Id { get; set; }
        public string HallName { get; set; }
        public int Rows { get; set; }
        public int Columns { get; set; }

        public int SeatingPerBench { get; set; }
    }

    public class SeatStatus
    {
        public bool IsS1Filled { get; set; }
        public bool IsS2Filled { get; set; }
        public string S1PCode { get; set; }
        public string S2PCode { get; set; }
        public ExamMatrix matrix { get; set; }
    }

    public class SeatingCollege
    {
        public string college_code { get; set; }
        public string college_name { get; set; }
    }

    public class ExamMatrix
    {
        public int HallId { get; set; }
        public ExamMatrixStudent[] Students { get; set; }
        //public string ExamDate { get; set; }
        //public string ExamSession { get; set; }
        public int Column { get; set; }
        public int Row { get; set; }
    }

    public class ExamMatrixStudent
    {
        public string Pin { get; set; }
        public string Pcode { get; set; }
        public int BranchId { get; set; }
    }

    public class ReqSeating
    {
        public int ExamMonthYearId { get; set; }
        public int StudentTypeId { get; set; }
        public string CollegeCode { get; set; }
        public string ExamDate { get; set; }
        public string TimeSlot { get; set; }
        public string ExamHallString { get; set; }
        public int SeatingPerBench { get; set; }
        public int ExamTypeId { get; set; }
    }
}
