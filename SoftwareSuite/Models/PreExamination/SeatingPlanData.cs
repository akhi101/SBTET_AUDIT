using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SoftwareSuite.Models.PreExamination
{
    public class SeatingPlanData
    {
        public int Id { get; set; }
        public string HallName { get; set; }
        public int RowId { get; set; }
        public int HallSno { get; set; }
        public int ColumnId { get; set; }
        public int StudentPosition { get; set; }
        public string Pin { get; set; }
        public string PCode { get; set; }
        public string SubjectName { get; set; }
        public string BranchName { get; set; }
        public int BranchId { get; set; }
        public int subId { get; set; }
        public string ExamDate { get; set; }
        public string Name { get; set; }
        public string Scheme { get; set; }
        public string Semester { get; set; }
        public int semid { get; set; }
        public string CollegeCode { get; set; }
        public string CollegeName { get; set; }

    }

    public class BranchData
    {
        public string BranchCode { get; set; }

        public int Alloted { get; set; }
        public string HallName { get; set; }


    }
}
