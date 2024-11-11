using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SoftwareSuite.Models.Admission
{
    public class Add_Detained_Student
    {
        public string collegecode { get; set; }
        public string AcademicYear { get; set; }
        public string scheme { get; set; }
        public int semid { get; set; }
        public string pin { get; set; }
    }

    public class Readmitting_Student
    {
        public string collegecode { get; set; }
        public int semid { get; set; }
        public string pin { get; set; }
    }
}