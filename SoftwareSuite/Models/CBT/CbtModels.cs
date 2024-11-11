using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SoftwareSuite.Models.CBT
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


    public class filelist
    {
        public int fileindex { get; set; }
        public string file { get; set; }
    }
    public class CandidateDetails
    {

        public string HallTicketNumber { get; set; }
        public bool Submitted { get; set; }
        public string ApplicationNumber { get; set; }
        public int CourseID { get; set; }
        public int LanguageID { get; set; }
        public int GradeID { get; set; }
        public int QualificationID { get; set; }
        public bool AppearLastSession { get; set; }
        public string LastSessionHallticket { get; set; }
        public string AadhaarNumber { get; set; }
        public bool SSCAppeared { get; set; }
        public string SSCHallticketNo { get; set; }     
        public string SSCPassedYear { get; set; }
        public string SSCPassedType { get; set; }
        public bool SSCVerified { get; set; }
        public string CandidateName { get; set; }
        public string FatherName { get; set; }
        public string MotherName { get; set; }
        public string DateofBirth { get; set; }
        public string Gender { get; set; }
        public string InterHallTicketNo { get; set; }
        public string LowerGradeHallTicketNo { get; set; }
        public string ExamDistrictID { get; set; }
        public string ExamCenterID { get; set; }
        public string ExamDateOption1 { get; set; }
        public string ExamDateOption2 { get; set; }
        public string ExamDateOption3 { get; set; }
        public string ExamDateOption4 { get; set; }
        public string ExamDateOption5 { get; set; }
        public string SelectedExamDate { get; set; }
        public string HouseNumber { get; set; }
        public string Street { get; set; }
        public string VillageTown { get; set; }
        public string Mandal { get; set; }
        public string District { get; set; }
        public string Pincode { get; set; }
        public string CandidateMobile { get; set; }
        public string CandidateEmail { get; set; }
        public string PhotoPath { get; set; }

        public string Qualification1 { get; set; }
        public string Qualification2 { get; set; }
        public string EditPhotoPath { get; set; }

        public string EditQualification1 { get; set; }
        public string EditQualification2 { get; set; }
        public int ApplicationStatus { get; set; }


        public List<filelist> filedata { get; set; }


    }
}
