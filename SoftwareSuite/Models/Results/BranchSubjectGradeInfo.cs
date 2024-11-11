using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SoftwareSuite.Models.Results
{
    public class BranchSubjectGradeInfo
    {
        public string Subject_Code { get; set; }
        public string SubjectName { get; set; }
        public string APlusGrade { get; set; }
        public string AGrade { get; set; }
        public string BPlusGrade { get; set; }
        public string BGrade { get; set; }
        public string CPlusGrade { get; set; }
        public string CGrade { get; set; }
        public string DGrade { get; set; }
        public string TopperMarks { get; set; }        
        public double Credits { get; set; }

    }
}
