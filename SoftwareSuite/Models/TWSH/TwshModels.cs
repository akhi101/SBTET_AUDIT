using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SoftwareSuite.Models.TWSH
{
    public class SystemUser
    {
        public string userName { get; set; }
        public string password { get; set; }
    }
    public class SscDetails
    {
        public string RollNo { get; set; }
        public string Year { get; set; }
        public string Stream { get; set; }
    }

    public class StudentDetails
    {

        public int UserId { get; set; }

        public string StudentName { get; set; }

        public string FatherName { get; set; }

        public string MotherName { get; set; }
        public string Aadhaar { get; set; }
        
        public string Gender { get; set; }

        public string StudentPhoneNumber { get; set; }

        public int CourseId { get; set; }

        public int LanguageId { get; set; }

        public int GradeId { get; set; }

        public int MonthYearId { get; set; }

        public int InstitutionId { get; set; }

        public string ExamDistrictId { get; set; }

        public string ExamCenterId { get; set; }

        public string ExamDate { get; set; }

        public int ExamBatch { get; set; }

        public int DistrictId { get; set; }

        public int IsBlind { get; set; }

        public string DateOfBirth { get; set; }

        public int CategoryId { get; set; }

        public string HnoStreet { get; set; }
        public string VillageTown { get; set; }
        public string EmailId { get; set; }
        public string SscHallTicket { get; set; }
        public string InterHallTicket { get; set; }
        public string LowerGradeHallTicket { get; set; }
        public string File1 { get; set; }
        public string File2 { get; set; }
        public string File3 { get; set; }

        public string Photo { get; set; }

        public int mode { get; set; }

    }
}
