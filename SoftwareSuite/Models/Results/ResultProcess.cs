using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SoftwareSuite.Models.Results
{
    public class ResultProcess
    {
        public int CourseID { get; set; }

        public int ExamID { get; set; }

        public int ExamInstID { get; set; }

        public int BranchID { get; set; }

        public int CollegeID { get; set; }

        public long HallTicketNoFrom { get; set; }

        public string HallTicketNoTo { get; set; }

        public bool Ordinance { get; set; }

        public int LoginID { get; set; }

    }
}