using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SoftwareSuite.Models.Assessment
{

    public class SetDatesMarksEntryreqdata
    {

        public int id { get; set; }
        public string fromdate { get; set; }
        public string todate { get; set; }
        public string finedate { get; set; }
        public int fine_ammount { get; set; }
        public int semid { get; set; }
        public int examId { get; set; }
        public int AcademicYearId { get; set; }
        public string userName { get; set; }
        public string fromDate { get; set; }
        public string toDate { get; set; }
        public string fineDate { get; set; }
        public int fine { get; set; }
        public int Studenttypeid { get; set; }
        public int schemeid { get; set; }
        public int ExamMonthYearId { get; set; }
        
    }
    public class PostExamMarks
    {
        public int examtype { get; set; }
        public int studenttypeid { get; set; }
        public int schemeid { get; set; }
        public int ExamMonthYearId { get; set; }

        public List<marklist> marksdata { get; set; }
    }

    public class PostBacklogExamMarks
    {
     
        public List<backmarklist> marksdata { get; set; }
    }
    public class marklist
    {
        public int id { get; set; }
        public string marks { get; set; }
        public string IndustryName { get; set; } = string.Empty;
    }

    public class updatemarksentry
    {
        public int id { get; set; }
        public string fromdate { get; set; }
        public string todate { get; set; }
        public string finedate { get; set; }
        public int fine_ammount { get; set; }


    }
    

    public class backmarklist
    {
        public int id { get; set; }
        public string marks { get; set; }     
    }

    public class submitMarks
    {
        public string collegeCode { get; set; }
        public string branchCode { get; set; }
        public int AcademicId { get; set; }
        public int semId { get; set; }
        public int examtypeId { get; set; }
        public int subId { get; set; }
        public int ExamMonthYearId { get; set; }
        public string SubmittedMobileNo { get; set; }

    }

    public class studentDetails
    {
        public int StudentId { get; set; }
        public string profilephoto { get; set; }
        public string CandidateSign { get; set; }
        public int CategoryId { get; set; }
        public int SpecialCategoryId { get; set; }
        public string TenthRollNo { get; set; }
        public string TenthYear { get; set; }
        public int TenthBoard { get; set; }
        public string TenthHallTicketNo { get; set; }
        public string StudentRecided { get; set; }
        //public string PolycetHallTicketNo { get; set; }
        public int QualificationId { get; set; }
        public int ReligionId { get; set; }
        public int Region { get; set; }
        public int MinorityType { get; set; }
        public string PermanentAddress { get; set; }
        public string TempararyAddress { get; set; }
        public string HouseNo { get; set; }
        public string VillageorTown { get; set; }
        public int DistrictId { get; set; }
        public int MandalId { get; set; }
        public string Pincode { get; set; }
        public Boolean IsPhysicallyHandicaped { get; set; }
        public string FatherAadhaarNo { get; set; }
        public string MotherAadhaarNo { get; set; }
        public Boolean IsFatherGorthEmp { get; set; }
        public string Income { get; set; }
        public string IncomeCategory { get; set; }
        public string Occupation { get; set; }
        public string CasteNo { get; set; }
        public int BankId { get; set; }
        public string BankAccountNo { get; set; }
        public string IfscCode { get; set; }
        public string BankBranch { get; set; }
        //public int ShiftId { get; set; }
        //public int PIN { get; set; }
        public string Name { get; set; }
        public string FatherName { get; set; }
        public string MotherName { get; set; }
        public int Gender { get; set; }
        public string DateOfBIrth { get; set; }
        //public int CourseID { get; set; }
        public string AadharNo { get; set; }
        public string EmailId { get; set; }
        public string ParentContact { get; set; }
        public string StudentContact { get; set; }
        public string CollegeCode { get; set; }
        //public int SchemeId { get; set; }
        //public int AcademicYearId { get; set; }
        //public int BranchID { get; set; }
        public string AttendeeId { get; set; }
        public Boolean Activeflag { get; set; }
        public int semid { get; set; }
    }

    public class AbsenteesData{
        public int AcademicYearID { get; set; }
        public int SemId { get; set; }
        public int BranchId { get; set; }
        public int DataType { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public string CollegeCode { get; set; }
    }


}
