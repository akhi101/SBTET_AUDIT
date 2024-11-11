using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace SoftwareSuite.Models.Admission
{

    public class StudentReg
    {
        public long StudRegID { get; set; }
        //(ErrorMessage = "SSCHallTicket is required")
        public string SSCHallTicket { get; set; }
        public long AdmNo { get; set; }
        public DateTime AdmDate { get; set; }

        [MaxLength(100)]
        public string StudName { get; set; }
        [MaxLength(40)]
        public string FatherName { get; set; }
        [MaxLength(40)]
        public string MotherName { get; set; }
        public string Gender { get; set; }

        [MaxLength(1)]
        public string Nationality { get; set; }

        public DateTime BirthDate { get; set; }

        public int CommunityID { get; set; }
        [MaxLength(60)]
        public string IdentiMarks { get; set; }
        [MaxLength(60)]
        public string IdentiMarks2 { get; set; }
        public int MothTID { get; set; }
        public int OcupID { get; set; }
        public int CollegeID { get; set; }
        public int ExamID { get; set; }
        public int BranchID { get; set; }

        [MaxLength(10)]
        [RegularExpression("^[0-9]*$")]
        public string ParentCellno { get; set; }

        public int AcdYrID { get; set; }

        [MaxLength(16)]
        public string AadharNo { get; set; }
        [MaxLength(10)]
        [RegularExpression("^[0-9]*$")]
        public string MobileNo { get; set; }
        [MaxLength(1)]
        public string Handicaped { get; set; }

        public int PhysDisbID { get; set; }
        public int SpclConsID { get; set; }

        [MaxLength(100)]
        public string Guardianname { get; set; }
        [MaxLength(20)]
        public string RelwithGuardian { get; set; }

        public int MediumID { get; set; }
        public int MainGrpID { get; set; }
        public int SecondLangID { get; set; }

        public string PRNNo { get; set; }
        //public int StudCatID { get; set; }
        [MaxLength(1)]
        public string AdmCategory { get; set; }
        public int IncGrpID { get; set; }
        [MaxLength(1)]
        public string ScholarshipFlag { get; set; }
        [MaxLength(1)]
        public string RecgFeesFlag { get; set; }
        [MaxLength(1)]
        public string ExmFeesFlag { get; set; }

        public int TCNO { get; set; }

        public DateTime Dateofwithdrawal { get; set; }
        public int WdrwlID { get; set; }

        [MaxLength(1)]
        public string Classwithdrawal { get; set; }
        [MaxLength(1)]
        public string PresentAddr { get; set; }
        [MaxLength(60)]
        public string Houseno { get; set; }
        [MaxLength(60)]
        public string Streetname { get; set; }
        [MaxLength(40)]
        public string Cityname { get; set; }

        public int MandalID { get; set; }
        public int DistrictID { get; set; }
        public int StateID { get; set; }

        [MaxLength(1)]
        public string PermanentAddr { get; set; }
        [MaxLength(60)]
        public string HousenoP { get; set; }
        [MaxLength(60)]
        public string StreetnameP { get; set; }
        [MaxLength(40)]
        public string CitynameP { get; set; }

        public int MandalIDP { get; set; }
        public int DistrictIDP { get; set; }
        public int StateIDP { get; set; }

        [MaxLength(200)]
        public string PhotoPath { get; set; }
        [MaxLength(200)]
        public string SignPath { get; set; }

        [MaxLength(1)]
        public string Eligible { get; set; }
        public string EligibleDesc { get; set; }
        [MaxLength(100)]
        public string Remark { get; set; }

        public int ActiveFlag { get; set; }
        public int CreLoginID { get; set; }
        public DateTime CreDate { get; set; }
        public int UpdLoginID { get; set; }
        public DateTime UpdDate { get; set; }

        [MaxLength(150)]
        public string LstInstName { get; set; }
        public char CheckType { get; set; }
        public int CourseID { get; set; }
        public string GenderDesc { get; set; }
        public string BirthDateDesc { get; set; }
        public string MediumName { get; set; }
        public string CommName { get; set; }
        public string SubName { get; set; }
        public string ApproveFlag { get; set; }
        //public int ReligionID { get; set; }
        public int CasteID { get; set; }
        public int SubCastID { get; set; }
        public long BatchNo { get; set; }
        [RegularExpression("^[0-9]*$")]
        public int FeeAmount { get; set; }
        public string DateOfBirthInWords { get; set; }
        public bool checkShedule { get; set; }
        [MaxLength(1)]
        public string LateAppFlag { get; set; }
        public string ColName { get; set; }
        public string EmailId { get; set; }
        public string YrName { get; set; }
        public string PassingMonth { get; set; }
        public string CourseName { get; set; }
        public string BranchName { get; set; }
        public string CasteName { get; set; }
        public string ExmName { get; set; }
        public Int64 StudCount { get; set; }

        public string AdmCategoryDesc { get; set; }
        public string NationalityDesc { get; set; }
        public string MothTName { get; set; }
        public string OcupName { get; set; }
        public string IncGrpame { get; set; }
        public string BirthDateInWords { get; set; }
        public string SubCastName { get; set; }
        public string EligibilityDesc { get; set; }

        public string MainGrpName { get; set; }
        public string RecgFeesFlagDesc { get; set; }
        public string ExamFeePaid { get; set; }
        public string ScholarshipFlagDesc { get; set; }
        public string MandalNameP { get; set; }
        public string DistNameP { get; set; }
        public string StateNameP { get; set; }
        public string HandicapedDesc { get; set; }
        public string ExmFeesFlagDesc { get; set; }

        public string MandalName { get; set; }
        public string DistName { get; set; }
        public string StateName { get; set; }
        public int BoardID { get; set; }
        public string xmlPiddata { get; set; }

        public string AdmStatus { get; set; }
        public string ColAddress { get; set; }
        public string principal_name { get; set; }
        public string principal_mobile_no { get; set; }
        public string Stream { get; set; }

        public DateTime AadharAuthDate { get; set; }
        public string AadharRemark { get; set; }
        public Int32 AadharAuthFlag { get; set; }
        public int IsOpenCollege { get; set; }
        public Int64 StudEnrolID { get; set; }
        public string RegularOrOpen { get; set; }

        public byte[] PhotoByte { get; set; }
        public byte[] SignByte { get; set; }

        public string CollegeCatName { get; set; }

        public int SecAadharVerify { get; set; }
        public int SubAadharVerify { get; set; }

        public string SSCCertFlag { get; set; }
        public string StudyCertFlag { get; set; }
        public string TCCertFlag { get; set; }
        public DateTime TCCertSubDate { get; set; }
        public string TCPath { get; set; }
        public string GapCertFlag { get; set; }
        public string GapCertPath { get; set; }
        public string PassingYear { get; set; }
        public string BoardName { get; set; }
        public int TotalCount { get; set; }

        public float GradePoints { get; set; }

        public string DistCode { get; set; }
        public int AdmGenCount { get; set; }
        public int AdmVocCount { get; set; }
        public int AdmTotCount { get; set; }
        public int DtlsSubGenCount { get; set; }
        public int DtlsSubVocCount { get; set; }
        public int DtlsSubTotCount { get; set; }
        public int PhSgnSubGenCount { get; set; }
        public int PhSgnSubVocCount { get; set; }
        public int PhSgnSubTotCount { get; set; }
        public int AdhrSubGenCount { get; set; }
        public int AdhrSubVocCount { get; set; }
        public int AdhrSubTotCount { get; set; }


        public int FeesPaidGenCount { get; set; }
        public int FeesPaidVocCount { get; set; }
        public int FeesPaidTotCount { get; set; }
        public int FeesNotPaidGenCount { get; set; }
        public int FeesNotPaidVocCount { get; set; }
        public int FeesNotPaidTotCount { get; set; }
        public string MerchTxnRef { get; set; }
        public int PhysDisbPer { get; set; }

        public string COLCODE { get; set; }
        public string AcdYrName { get; set; }
    }

    public class AadhaarList
    {
        public string status { get; set; }
        public string aadhaarno { get; set; }
        public string Rcode { get; set; }
        public string Rtxn { get; set; }
        public string Rts { get; set; }
        public string Uuid { get; set; }
        public string dob { get; set; }
        public string gender { get; set; }
        public string name { get; set; }
        public string co { get; set; }
        public string street { get; set; }
        public string country { get; set; }
        public string subdist { get; set; }
        public string dist { get; set; }
        public string lm { get; set; }
        public string loc { get; set; }
        public string pc { get; set; }
        public string house { get; set; }
        public string state { get; set; }
        public string vtc { get; set; }
        public string pht { get; set; }
        public string address { get; set; }
        public string imgPath { get; set; }

        public string AcdYrName { get; set; }


    }
    public class RegStudentTest
    {
        public int SNO { get; set; }
        public int StudentID { get; set; }
        public string PINNo { get; set; }
        public string Name { get; set; }
    }

    public class PinGenReply
    {
        public string PIN { get; set; }
        public string PinStatus { get; set; }
        public string Result { get; set; }
    }

    public class PolytechStudent
    {

        public int StudentId { get; set; }

        public int SectionId { get; set; }

        public int ShiftId { get; set; }

        public int SemId { get; set; }

        public int SchemeId { get; set; }

        public string ADMType { get; set; }

        public string AdmissionCategory { get; set; }


        [MaxLength(1000), Required]
        public string Name { get; set; }

        [MaxLength(1000)]
        public string FatherName { get; set; }

        [MaxLength(1000)]
        public string MotherName { get; set; }


        public int Gender { get; set; }


        public string DateOfBirth { get; set; }

        public int PhotoUpload { get; set; }
        public int CategoryId { get; set; }

        public string SpecialCategoryId { get; set; }


        public int ReligionId { get; set; }


        public int Region { get; set; }


        public int QualificationId { get; set; }


        public int MinorityType { get; set; }


        public string CandidateSign { get; set; }


        public int StudentRecided { get; set; }


        public string TenthRollNo { get; set; }


        public string TenthYear { get; set; }


        public int TenthBoard { get; set; }


        public string TenthHallticketNo { get; set; }


        public string PolycetHallTicketNo { get; set; }


        public string PermanentAddress { get; set; }


        public string CurrentAddress { get; set; }


        public string HouseNo { get; set; }


        public string VillageorTown { get; set; }


        public int MandalId { get; set; }


        public int DistrictId { get; set; }


        public string Pincode { get; set; }


        public bool IsPhysicallyHandicaped { get; set; }


        public string AadharNo { get; set; }

        [MaxLength(50)]
        public string EmailId { get; set; }

        [MaxLength(50)]
        public string ParentContact { get; set; }

        [MaxLength(50)]
        public string StudentContact { get; set; }

        public string profilephoto { get; set; }

        public string profilephoto1 { get; set; }

        public bool IsPhotoUploaded { get; set; }

        [MaxLength(20)]
        public string PIN { get; set; }
        public string AttendeeId { get; set; }

        public string PinNoGeneratedDate { get; set; }
        public int BranchId { get; set; }
        public string IdentitiMarks { get; set; }
        public bool ActiveFlag { get; set; }
        public int CreLoginId { get; set; }
        public string CreDate { get; set; }
        public int UpdLoginId { get; set; }
        public string UpdDate { get; set; }

        [MaxLength(50)]
        public string FatherAadhaarNo { get; set; }

        [MaxLength(50)]
        public string MotherAadhaarNo { get; set; }
        public bool IsFatherGovtEmp { get; set; }

        [MaxLength(50)]
        public string IncomeStatusValidity { get; set; }

        [MaxLength(50)]
        public string Income { get; set; }
        public int IncomeCategory { get; set; }
        public string Occupation { get; set; }
        public string CasteNo { get; set; }

        [MaxLength(200)]
        public string CasteCertificateValidity { get; set; }
        [MaxLength(50)]
        public string BankAccountNo { get; set; }

        [MaxLength(50)]
        public string IfscCode { get; set; }

        public int BankId { get; set; }

        [MaxLength(200)]
        public string BankBranch { get; set; }

        [MaxLength(20)]
        public string CollegeCode { get; set; }
        public bool TsEpassRequired { get; set; }
        public bool AadharVerfied { get; set; }
        public int AcademicYearId { get; set; }
        public string District { get; set; }

    }
}
