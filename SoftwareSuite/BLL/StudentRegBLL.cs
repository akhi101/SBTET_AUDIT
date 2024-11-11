using SoftwareSuite.Models.Admission;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SoftwareSuite.Models;
using SoftwareSuite.Models.Database;
using System.Data;
using SoftwareSuite.Controllers.Admission;
using System.Data.SqlClient;
using System.Net.Http;
using System.Net;

namespace SoftwareSuite.BLL
{
    public class StudentRegBLL
    {
        public DataSet PostStudentReg(PolytechStudent StudentReg)
        {
            dbHandler dbHandler = new dbHandler();
            try
            {
                return StudentRegService.PostStudentReg(StudentReg, dbHandler);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<BLLValidations> UpdateStudentRegFirstTab(StudentReg StudentReg)
        {
            dbHandler dbHandler = new dbHandler(true);
            try
            {
                var BLLValidationMessages = new List<BLLValidations>();
                BLLValidationMessages = CheckValidation(StudentReg, dbHandler);
                if (BLLValidationMessages.Count == 0)
                {
                    StudentRegService StudentRegService = new StudentRegService();
                    StudentRegService.UpdateStudentRegFirstTab(StudentReg, dbHandler);
                    dbHandler.Commit();
                    return BLLValidationMessages;
                }
                else
                {
                    dbHandler.RollBack();
                    return BLLValidationMessages;
                }

            }
            catch (Exception ex)
            {
                dbHandler.RollBack();
                throw ex;
            }
        }
        public List<BLLValidations> UpdateStudentRegSecondTab(StudentReg StudentReg)
        {
            dbHandler dbHandler = new dbHandler(true);
            try
            {
                var BLLValidationMessages = new List<BLLValidations>();
                BLLValidationMessages = CheckValidation(StudentReg, dbHandler);
                if (BLLValidationMessages.Count == 0)
                {
                    StudentRegService StudentRegService = new StudentRegService();
                    StudentRegService.UpdateStudentRegSecondTab(StudentReg, dbHandler);
                    dbHandler.Commit();
                    return BLLValidationMessages;
                }
                else
                {
                    dbHandler.RollBack();
                    return BLLValidationMessages;
                }

            }
            catch (Exception ex)
            {
                dbHandler.RollBack();
                throw ex;
            }
        }
        public List<BLLValidations> UpdateStudentRegThirdTab(StudentReg StudentReg)
        {
            dbHandler dbHandler = new dbHandler(true);
            try
            {
                var BLLValidationMessages = new List<BLLValidations>();
                BLLValidationMessages = CheckValidation(StudentReg, dbHandler);
                if (BLLValidationMessages.Count == 0)
                {
                    StudentRegService StudentRegService = new StudentRegService();
                    StudentRegService.UpdateStudentRegThirdTab(StudentReg, dbHandler);
                    dbHandler.Commit();
                    return BLLValidationMessages;
                }
                else
                {
                    dbHandler.RollBack();
                    return BLLValidationMessages;
                }

            }
            catch (Exception ex)
            {
                dbHandler.RollBack();
                throw ex;
            }
        }

        public IEnumerable<StudentReg> GetStudentRegList()
        {
            try
            {

                StudentRegService StudentRegService = new StudentRegService();
                DataTable tblStudentReg = new DataTable();
                dbHandler dbHandler = new dbHandler();
                tblStudentReg = StudentRegService.GetStudentRegList(dbHandler);
                List<StudentReg> StudentRegList = Helper.DataTableToList<StudentReg>(tblStudentReg);
                return StudentRegList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        //public IEnumerable<StudentReg> GetStudentRegListAndGeneratePRNNO()
        //{
        //    try
        //    {

        //        StudentRegService StudentRegService = new StudentRegService();
        //        DataTable tblStudentReg = new DataTable();
        //        dbHandler dbHandler = new dbHandler();
        //        tblStudentReg = StudentRegService.GetStudentRegListAndGeneratePRNNO(dbHandler);
        //        List<StudentReg> StudentRegList = tblStudentReg.DataTableToList<StudentReg>();
        //        return StudentRegList;
        //    }
        //    catch (Exception ex)
        //    {
        //        throw ex;
        //    }
        //}
        //public IEnumerable<StudentReg> GetStudentRegById(Int64 StudRegID)
        public IEnumerable<PolytechStudent> GetStudentRegById(Int64 StudRegID)
        {
            try
            {
                StudentRegService StudentRegService = new StudentRegService();
                DataTable tblStudentReg = new DataTable();
                dbHandler dbHandler = new dbHandler();
                tblStudentReg = StudentRegService.GetStudentRegById(dbHandler, StudRegID);
                List<PolytechStudent> StudentRegList = tblStudentReg.DataTableToList<PolytechStudent>();

                //*****NOTE: ReEnable It after corresponding SP is updated
                //if (StudentRegList.Count > 0)
                //{
                //    BasicMainGroupService BasicMainGroupService = new BasicMainGroupService();
                //    DataTable tblMainGrpAdhar = BasicMainGroupService.GetMainGroupAddharVerifcationForStudents(dbHandler, StudentRegList[0].CollegeID, StudentRegList[0].CourseID, StudentRegList[0].AcdYrID, StudentRegList[0].MainGrpID);
                //    if (tblMainGrpAdhar.Rows.Count > 0)
                //    {
                //        StudentRegList[0].SecAadharVerify = Convert.ToInt16(tblMainGrpAdhar.Rows[0]["SecAadharVerify"]);
                //    }
                //    else { StudentRegList[0].SecAadharVerify = 0; }
                //    DataTable tblSubGrpAdhar = BasicMainGroupService.GetBasicSubjectListAddharVerifcationForStudents(StudentRegList[0].CollegeID, StudentRegList[0].BranchID, StudentRegList[0].CourseID, StudentRegList[0].AcdYrID, StudentRegList[0].SecondLangID, dbHandler);
                //    if (tblSubGrpAdhar.Rows.Count > 0)
                //    {
                //        StudentRegList[0].SubAadharVerify = Convert.ToInt16(tblSubGrpAdhar.Rows[0]["SubAadharVerify"]);
                //    }
                //    else { StudentRegList[0].SubAadharVerify = 0; }
                //}
                return StudentRegList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public DataSet GetStaticDataForAdmission(dbHandler dbhandler)
        {
            try
            {
                return dbhandler.ReturnDataSet("usp_GetStaticDataForAdmission");
            }
            catch (Exception ex)
            {                
                dbHandler.SaveErorr("GetStaticDataForAdmission", 0, ex.Message);
                throw ex;
            }
        }

        public DataSet GetMandalsForDistrict(dbHandler dbhandler, int DistrictId)
        {
            try
            {
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@DistrictId", DistrictId);
                return dbhandler.ReturnDataWithStoredProcedure("usp_GetMandalsForDistrict", param);
            }
            catch (Exception ex)
            {
                
                dbHandler.SaveErorr("GetMandalsForDistrict", 0, ex.Message);
                throw ex;
            }
        }

        public IEnumerable<PolytechStudent> GetStudentRegListForCollege(string CollegeCode, int UserId)
        {
            try
            {
                StudentRegService StudentRegService = new StudentRegService();
                DataTable tblStudentReg = new DataTable();
                dbHandler dbHandler = new dbHandler();
                tblStudentReg = StudentRegService.GetStudentRegListForCollege(dbHandler, CollegeCode, UserId);
                List<PolytechStudent> StudentRegList = tblStudentReg.DataTableToList<PolytechStudent>();
                return StudentRegList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<PolytechStudent> GetStudentRegListByCourseExamBranch(int CollegeID, int SchemeID, int SemID, int BranchID, int SectionID, int ShiftID)
        {
            try
            {
                StudentRegService StudentRegService = new StudentRegService();
                DataTable tblStudentReg = new DataTable();
                dbHandler dbHandler = new dbHandler();
                tblStudentReg = StudentRegService.GetStudentRegListByCourseExamBranch(dbHandler, CollegeID, SchemeID, SemID, BranchID, SectionID, ShiftID);
                List<PolytechStudent> StudentRegList = tblStudentReg.DataTableToList<PolytechStudent>();
                return StudentRegList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public IEnumerable<PolytechStudent> GetStudentRegListByCollegeCourseBranch(string CollegeCode, int SchemeID, int SemID, int BranchID, int SectionID, int ShiftID, int AcademicYearId)
        {
            try
            {
                StudentRegService StudentRegService = new StudentRegService();
                DataTable tblStudentReg = new DataTable();
                dbHandler dbHandler = new dbHandler();
                tblStudentReg = StudentRegService.GetStudentRegListByCollegeCourseBranch(dbHandler, CollegeCode, SchemeID, SemID, BranchID, SectionID, ShiftID, AcademicYearId);
                List<PolytechStudent> StudentRegList = tblStudentReg.DataTableToList<PolytechStudent>();
                return StudentRegList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public IEnumerable<PolytechStudent> GetStudentRegListByCollegeCourseBranchDataNotUpdated(string CollegeCode, int SchemeID, int SemID, int BranchID, int SectionID, int ShiftID, int AcademicYearId)
        {
            try
            {
                StudentRegService StudentRegService = new StudentRegService();
                DataTable tblStudentReg = new DataTable();
                dbHandler dbHandler = new dbHandler();
                tblStudentReg = StudentRegService.GetStudentRegListByCollegeCourseBranchDataNotUpdated(dbHandler, CollegeCode, SchemeID, SemID, BranchID, SectionID, ShiftID, AcademicYearId);
                List<PolytechStudent> StudentRegList = tblStudentReg.DataTableToList<PolytechStudent>();
                return StudentRegList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public IEnumerable<PolytechStudent> GetStudentRegListByCollegeCourseBranchAadharNotVerified(string CollegeCode, int SchemeID, int SemID, int BranchID, int SectionID, int ShiftID, int AcademicYearId)
        {
            try
            {
                StudentRegService StudentRegService = new StudentRegService();
                DataTable tblStudentReg = new DataTable();
                dbHandler dbHandler = new dbHandler();
                tblStudentReg = StudentRegService.GetStudentRegListByCollegeCourseBranchAadharNotVerified(dbHandler, CollegeCode, SchemeID, SemID, BranchID, SectionID, ShiftID, AcademicYearId);
                List<PolytechStudent> StudentRegList = tblStudentReg.DataTableToList<PolytechStudent>();
                return StudentRegList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public IEnumerable<PinGenReply> GenPin(Int64 StudentID)
        {
            try
            {
                StudentRegService StudentRegService = new StudentRegService();
                dbHandler dbHandler = new dbHandler();
                IEnumerable<PinGenReply> Pin = StudentRegService.GenPin(dbHandler, StudentID).DataTableToList<PinGenReply>();
                return Pin;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public IEnumerable<StudentReg> GetStudentRegDetailsListByAdmNoOrPhoto(int CollegeID, string WithPhoto, Int64 AdmNo = 0)
        {
            try
            {
                StudentRegService StudentRegService = new StudentRegService();
                DataTable tblStudentReg = new DataTable();
                dbHandler dbHandler = new dbHandler();
                tblStudentReg = StudentRegService.GetStudentRegDetailsListByAdmNoOrPhoto(dbHandler, CollegeID, WithPhoto, AdmNo);
                List<StudentReg> StudentRegList = tblStudentReg.DataTableToList<StudentReg>();
                return StudentRegList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public IEnumerable<StudentReg> GetStudentRegDetailsListByGroupAndMedium(int CollegeID, int MainGrpID, int MediumID, int SubjectID = 0)
        {
            try
            {
                StudentRegService StudentRegService = new StudentRegService();
                DataTable tblStudentReg = new DataTable();
                dbHandler dbHandler = new dbHandler();
                tblStudentReg = StudentRegService.GetStudentRegDetailsListByGroupAndMedium(dbHandler, CollegeID, MainGrpID, MediumID, SubjectID);
                List<StudentReg> StudentRegList = tblStudentReg.DataTableToList<StudentReg>();
                return StudentRegList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        //public IEnumerable<StudentReg> GetStudentRegDetailsListAll(string CollegeID)
        public IEnumerable<RegStudentTest> GetStudentRegDetailsListAll(string CollegeID)
        {
            try
            {
                StudentRegService StudentRegService = new StudentRegService();
                DataTable tblStudentReg = new DataTable();
                dbHandler dbHandler = new dbHandler();
                tblStudentReg = StudentRegService.GetStudentRegDetailsListAll(dbHandler, CollegeID);
                //List<StudentReg> StudentRegList = tblStudentReg.DataTableToList<StudentReg>();
                List<RegStudentTest> StudentRegList = tblStudentReg.DataTableToList<RegStudentTest>();
                return StudentRegList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public IEnumerable<StudentReg> GetAdmissionFormPrint(int CollegeID, int CourseID, int ExamID, int BranchID, string FromDate, string ToDate, Int64 FromAdmNo, Int64 ToAdmNo)
        {
            try
            {
                StudentRegService StudentRegService = new StudentRegService();
                DataTable tblStudentReg = new DataTable();
                dbHandler dbHandler = new dbHandler();

                DateTime ToDate1 = Convert.ToDateTime(ToDate);
                ToDate1 = ToDate1.AddDays(1);
                ToDate = ToDate1.ToString("dd/MMM/yyyy");
                tblStudentReg = StudentRegService.GetAdmissionFormPrint(dbHandler, CollegeID, CourseID, ExamID, BranchID, FromDate, ToDate, FromAdmNo, ToAdmNo);
                //ImageConverter imgCon = new ImageConverter();
                //tblStudentReg.Columns.Add("PhotoByte", typeof(byte[]));
                //tblStudentReg.Columns.Add("SignByte", typeof(byte[]));
                //for (int i = 0; i < tblStudentReg.Rows.Count; i++)
                //{
                //    tblStudentReg.Rows[i]["PhotoByte"] = imgCon.ConvertTo(Image.FromFile(HttpContext.Current.Server.MapPath(tblStudentReg.Rows[i]["PhotoPath"].ToString())), typeof(byte[]));
                //    tblStudentReg.Rows[i]["SignByte"] = imgCon.ConvertTo(Image.FromFile(HttpContext.Current.Server.MapPath(tblStudentReg.Rows[i]["SignPath"].ToString())), typeof(byte[]));
                //}
                List<StudentReg> StudentRegList = tblStudentReg.DataTableToList<StudentReg>();
                return StudentRegList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public IEnumerable<StudentReg> GetStudentRegDetailsListForPhotoUpload(int CollegeID, int CourseID, int ExamID, int BranchID, string WithPhoto = "", string ForAadhar = "")
        {
            try
            {
                StudentRegService StudentRegService = new StudentRegService();
                DataTable tblStudentReg = new DataTable();
                dbHandler dbHandler = new dbHandler();
                tblStudentReg = StudentRegService.GetStudentRegDetailsListForPhotoUpload(dbHandler, CollegeID, CourseID, ExamID, BranchID, WithPhoto, ForAadhar);
                List<StudentReg> StudentRegList = tblStudentReg.DataTableToList<StudentReg>();
                return StudentRegList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public IEnumerable<StudentReg> GetFillStudentRegDetailsListForUpdateCertificates(int CollegeID, int CourseID, int ExamID, int BranchID, string WithCertificates)
        {
            try
            {
                StudentRegService StudentRegService = new StudentRegService();
                DataTable tblStudentReg = new DataTable();
                dbHandler dbHandler = new dbHandler();
                tblStudentReg = StudentRegService.GetFillStudentRegDetailsListForUpdateCertificates(dbHandler, CollegeID, CourseID, ExamID, BranchID, WithCertificates);
                List<StudentReg> StudentRegList = tblStudentReg.DataTableToList<StudentReg>();
                return StudentRegList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public IEnumerable<StudentReg> GetFillStudentRegDetailsListForGroupChange(int CollegeID, int CourseID, int ExamID, int BranchID)
        {
            try
            {
                StudentRegService StudentRegService = new StudentRegService();
                DataTable tblStudentReg = new DataTable();
                dbHandler dbHandler = new dbHandler();
                tblStudentReg = StudentRegService.GetFillStudentRegDetailsListForGroupChange(dbHandler, CollegeID, CourseID, ExamID, BranchID);
                List<StudentReg> StudentRegList = tblStudentReg.DataTableToList<StudentReg>();
                return StudentRegList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public IEnumerable<StudentReg> GetBlindCondAprovalList(int CollegeID, int CourseID, int ExamID, int BranchID)
        {
            try
            {
                StudentRegService StudentRegService = new StudentRegService();
                DataTable tblStudentReg = new DataTable();
                dbHandler dbHandler = new dbHandler();
                tblStudentReg = StudentRegService.GetBlindCondAprovalList(dbHandler, CollegeID, CourseID, ExamID, BranchID);
                List<StudentReg> StudentRegList = tblStudentReg.DataTableToList<StudentReg>();
                return StudentRegList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }















        public IEnumerable<StudentReg> GetStudentRegListByCourseExamBranchForApproval(int CollegeID, int CourseID, int ExamID, int BranchID)
        {
            try
            {
                StudentRegService StudentRegService = new StudentRegService();
                DataTable tblStudentReg = new DataTable();
                dbHandler dbHandler = new dbHandler();
                tblStudentReg = StudentRegService.GetStudentRegListByCourseExamBranchForApproval(dbHandler, CollegeID, CourseID, ExamID, BranchID);
                List<StudentReg> StudentRegList = tblStudentReg.DataTableToList<StudentReg>();
                return StudentRegList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

               
        public IEnumerable<StudentReg> GetStudentRegListBySSCHallTicket(string SSCHallTicket)
        {
            try
            {
                StudentRegService StudentRegService = new StudentRegService();
                DataTable tblStudentReg = new DataTable();
                dbHandler dbHandler = new dbHandler();
                tblStudentReg = StudentRegService.GetStudentRegListBySSCHallTicket(dbHandler, SSCHallTicket);
                List<StudentReg> StudentRegList = tblStudentReg.DataTableToList<StudentReg>();
                return StudentRegList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public Int64 GetAdmissionMaxNo()
        {
            try
            {
                StudentRegService StudentRegService = new StudentRegService();
                dbHandler dbHandler = new dbHandler();
                return StudentRegService.GetAdmissionMaxNo(dbHandler);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public Int64 GetCurrentAdminNo(int CollegeID)
        {
            try
            {
                StudentRegService StudentRegService = new StudentRegService();
                dbHandler dbHandler = new dbHandler();
                return StudentRegService.GetCurrentAdminNo(dbHandler, CollegeID);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public Int16 CheckHallTicketNoPresent(string YrName, string SSCHallTicket, int BoardID, int CollegeID)
        {
            try
            {
                StudentRegService StudentRegService = new StudentRegService();
                dbHandler dbHandler = new dbHandler();
                return StudentRegService.CheckHallTicketNoPresent(dbHandler, YrName, SSCHallTicket, BoardID, CollegeID);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public Int16 CheckHallTicketNoPresentInCollege(string YrName, string SSCHallTicket, int BoardID)
        {
            try
            {
                StudentRegService StudentRegService = new StudentRegService();
                dbHandler dbHandler = new dbHandler();
                return StudentRegService.CheckHallTicketNoPresentInCollege(dbHandler, YrName, SSCHallTicket, BoardID);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public Int16 CheckHallTicketNoPresentOpenAdmission(string YrName, string SSCHallTicket, int BoardID, int CollegeID)
        {
            try
            {
                StudentRegService StudentRegService = new StudentRegService();
                dbHandler dbHandler = new dbHandler();
                return StudentRegService.CheckHallTicketNoPresentOpenAdmission(dbHandler, YrName, SSCHallTicket, BoardID, CollegeID);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public void GetDeleteHallTicketNoPresentOpenAdmission(int AcdYrID, string YrName, string SSCHallTicket, int BoardID)
        {
            dbHandler dbHandler = new dbHandler(true);
            try
            {
                StudentRegService StudentRegService = new StudentRegService();
                StudentRegService.GetDeleteHallTicketNoPresentOpenAdmission(dbHandler, AcdYrID, YrName, SSCHallTicket, BoardID);
                dbHandler.Commit();
            }
            catch (Exception ex)
            {
                dbHandler.RollBack();
                throw ex;

            }
        }



        public Int16 GetCheckMobileNoCount(string MobileNo, int CollegeID, int AcdYrID)
        {
            try
            {
                StudentRegService StudentRegService = new StudentRegService();
                dbHandler dbHandler = new dbHandler();
                return StudentRegService.GetCheckMobileNoCount(dbHandler, MobileNo, CollegeID, AcdYrID);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<StudentReg> GetStudentRegByIdForApproved(Int64 StudRegID)
        {
            try
            {
                StudentRegService StudentRegService = new StudentRegService();
                DataTable tblStudentReg = new DataTable();
                dbHandler dbHandler = new dbHandler();
                tblStudentReg = StudentRegService.GetStudentRegByIdForApproved(dbHandler, StudRegID);
                List<StudentReg> StudentRegList = tblStudentReg.DataTableToList<StudentReg>();
                return StudentRegList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public DataTable GetOpenSchoolDataBySSCHallTicketAndAcdYrID(string SSCHallTicket)
        {
            try
            {
                StudentRegService StudentRegService = new StudentRegService();
                DataTable tblStudentReg = new DataTable();
                dbHandler dbHandler = new dbHandler();
                tblStudentReg = StudentRegService.GetOpenSchoolDataBySSCHallTicketAndAcdYrID(dbHandler, SSCHallTicket);
                return tblStudentReg;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        //Aadhar Methods
        public Int16 CheckAadharNoPresent(string AadharNo)
        {
            dbHandler dbHandler = new dbHandler(true);
            try
            {
                StudentRegService StudentRegService = new StudentRegService();
                return StudentRegService.CheckAadharNoPresent(dbHandler, AadharNo);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public DataTable GetAadharDataByAadharId(string AadharNo)
        {
            try
            {
                StudentRegService StudentRegService = new StudentRegService();
                dbHandler dbHandler = new dbHandler();
                return StudentRegService.GetAadharDataByAadharId(dbHandler, AadharNo);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public Int32 UpdateStudentAadharStatus(StudentReg studentReg)
        {
            dbHandler dbHandler = new dbHandler(true);
            try
            {
                StudentRegService StudentRegService = new StudentRegService();
                Int32 _result = StudentRegService.UpdateStudentAadharStatus(studentReg, dbHandler);
                dbHandler.Commit();
                return _result;
            }
            catch (Exception ex)
            {
                dbHandler.RollBack();
                throw ex;
            }
        }

        public int GetCheckFromTodate(string FromDate, string Todate)
        {
            dbHandler dbHandler = new dbHandler();
            try
            {
                StudentRegService StudentRegService = new StudentRegService();
                DateTime frmdt = Convert.ToDateTime(FromDate);
                DateTime todt = Convert.ToDateTime(Todate);
                if (frmdt > todt)
                {
                    return 1;
                }
                else { return 0; }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public IEnumerable<StudentReg> GetStudentRegGroupWiseCountByCourseExamBranch(int CollegeID = 0, int CourseID = 0, int ExamID = 0, int BranchID = 0, int MainGrpID = 0)
        {
            try
            {
                StudentRegService StudentRegService = new StudentRegService();
                DataTable tblStudentReg = new DataTable();
                dbHandler dbHandler = new dbHandler();
                tblStudentReg = StudentRegService.GetStudentRegGroupWiseCountByCourseExamBranch(dbHandler, CollegeID, CourseID, ExamID, BranchID, MainGrpID);
                List<StudentReg> StudentRegList = tblStudentReg.DataTableToList<StudentReg>();
                return StudentRegList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        
        public IEnumerable<StudentReg> GetPreStudentCollegeCodeByStudentID(Int64 StudRegID)
        {
            try
            {
                StudentRegService StudentRegService = new StudentRegService();
                DataTable tblStudentReg = new DataTable();
                dbHandler dbHandler = new dbHandler();
                tblStudentReg = StudentRegService.GetPreStudentCollegeCodeByStudentID(dbHandler, StudRegID);
                List<StudentReg> StudentRegList = tblStudentReg.DataTableToList<StudentReg>();
                return StudentRegList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public HttpResponseMessage PostAadharTemp(AadhaarList aadhaarList, StudentReg studentReg)
        {
            dbHandler dbHandler = new dbHandler(true);
            try
            {
                StudentRegService StudentRegService = new StudentRegService();
                StudentRegService.PostAadharTemp(aadhaarList, studentReg, dbHandler);
                dbHandler.Commit();
                return new HttpResponseMessage(HttpStatusCode.OK);
            }
            catch (Exception ex)
            {
                dbHandler.RollBack();
                throw ex;
            }
        }

        public List<BLLValidations> CheckValidation(StudentReg StudentReg, dbHandler dbHandler)
        {
            try
            {
                var BLLValidationsMessages = new List<BLLValidations>();
                StudentRegService StudentRegService = new StudentRegService();
                CommanMethods CommanMethods = new CommanMethods();
                if (StudentRegService.CheckHallTicketNoPresent(dbHandler, StudentReg.YrName, StudentReg.SSCHallTicket.ToString(), StudentReg.BoardID, StudentReg.CollegeID) > 0)
                {
                    BLLValidationsMessages.Add(new BLLValidations() { Id = "SSCHallTicket", Message = "Duplicate Hall ticket" });
                }
                //if (CommanMethods.GetCount(dbHandler, "StudentReg", "SSCHallTicket", StudentReg.SSCHallTicket.ToString(), "StudentRegID", StudentReg.StudRegID.ToString()) > 0)
                //{
                //    BLLValidationsMessages.Add(new BLLValidations() { Id = "SSCHallTicket", Message = "Duplicate Hall ticket" });
                //}
                if ((StudentReg.AadharNo != null) && (StudentReg.AadharNo != ""))
                {
                    if (StudentReg.AadharNo.Replace(" ", "") != "")
                    {
                        if (CommanMethods.GetCount(dbHandler, "StudentReg", "AadharNo", StudentReg.AadharNo, "StudRegID", StudentReg.StudRegID.ToString()) > 0)
                        {
                            BLLValidationsMessages.Add(new BLLValidations() { Id = "Aadhaar No", Message = "Aadhaar No is Duplicate" });
                        }
                    }
                }
                if (StudentReg.CasteID > 0)
                {
                    if (CommanMethods.GetForaignKeyCount(dbHandler, "BasicCaste", "CasteID", StudentReg.CasteID.ToString()) == 0)
                    {
                        BLLValidationsMessages.Add(new BLLValidations() { Id = "CasteID", Message = "Caste Not Found" });
                    }
                }

                if (StudentReg.CollegeID > 0)
                {
                    if (CommanMethods.GetForaignKeyCount(dbHandler, "BasicCollege", "CollegeID", StudentReg.CollegeID.ToString()) == 0)
                    {
                        BLLValidationsMessages.Add(new BLLValidations() { Id = "CollegeID", Message = "College Not Found" });
                    }
                }

                if (StudentReg.ExamID > 0)
                {
                    if (CommanMethods.GetForaignKeyCount(dbHandler, "BasicExam", "ExamID", StudentReg.ExamID.ToString()) == 0)
                    {
                        BLLValidationsMessages.Add(new BLLValidations() { Id = "ExamID", Message = "Exam Part Not Found" });
                    }
                }

                if (StudentReg.BranchID > 0)
                {
                    if (CommanMethods.GetForaignKeyCount(dbHandler, "BasicBranch", "BranchID", StudentReg.BranchID.ToString()) == 0)
                    {
                        BLLValidationsMessages.Add(new BLLValidations() { Id = "BranchID", Message = "Branch Not Found" });
                    }
                }

                if (StudentReg.AcdYrID > 0)
                {
                    if (CommanMethods.GetForaignKeyCount(dbHandler, "BasicAcademicYear", "AcdYrID", StudentReg.AcdYrID.ToString()) == 0)
                    {
                        BLLValidationsMessages.Add(new BLLValidations() { Id = "AcdYrID", Message = "Academic Year  Not Found" });
                    }
                }

                if (StudentReg.PhysDisbID > 0)
                {
                    if (CommanMethods.GetForaignKeyCount(dbHandler, "BasicPhysDisability", "PhysDisbID", StudentReg.PhysDisbID.ToString()) == 0)
                    {
                        BLLValidationsMessages.Add(new BLLValidations() { Id = "PhysDisbID", Message = "Physical Disbability Not Found" });
                    }
                }

                if (StudentReg.SpclConsID > 0)
                {
                    if (CommanMethods.GetForaignKeyCount(dbHandler, "BasicSpclConsiderations", "SpclConsID", StudentReg.SpclConsID.ToString()) == 0)
                    {
                        BLLValidationsMessages.Add(new BLLValidations() { Id = "SpclConsID", Message = "Special Consideration Not Found" });
                    }
                }

                if (StudentReg.MediumID > 0)
                {
                    if (CommanMethods.GetForaignKeyCount(dbHandler, "BasicMedium", "MediumID", StudentReg.MediumID.ToString()) == 0)
                    {
                        BLLValidationsMessages.Add(new BLLValidations() { Id = "MediumID", Message = "Medium Not Found" });
                    }
                }

                if (StudentReg.MainGrpID > 0)
                {
                    if (CommanMethods.GetForaignKeyCount(dbHandler, "BasicMainGroup", "MainGrpID", StudentReg.MainGrpID.ToString()) == 0)
                    {
                        BLLValidationsMessages.Add(new BLLValidations() { Id = "MainGrpID", Message = "Main Group Not Found" });
                    }
                }

                if (StudentReg.SecondLangID > 0)
                {
                    if (CommanMethods.GetForaignKeyCount(dbHandler, "BasicSubject", "SubjectID", StudentReg.SecondLangID.ToString()) == 0)
                    {
                        BLLValidationsMessages.Add(new BLLValidations() { Id = "SubjectID", Message = "Second Language Not Found" });
                    }
                }

                //if (StudentReg.StudCatID > 0)
                //{
                //    if (CommanMethods.GetForaignKeyCount(dbHandler, "BasicStudentCategory", "StudCatID", StudentReg.StudCatID.ToString()) == 0)
                //    {
                //        BLLValidationsMessages.Add(new BLLValidations() { Id = "StudCatID", Message = "Student Categoey Not Found" });
                //    }
                //}

                if (StudentReg.IncGrpID > 0)
                {
                    if (CommanMethods.GetForaignKeyCount(dbHandler, "BasicIncomeGroups", "IncGrpID", StudentReg.IncGrpID.ToString()) == 0)
                    {
                        BLLValidationsMessages.Add(new BLLValidations() { Id = "IncGrpID", Message = "Income Group Not Found" });
                    }
                }
                if (StudentReg.WdrwlID > 0)
                {
                    if (CommanMethods.GetForaignKeyCount(dbHandler, "BasicWithdrawlReason", "WdrwlID", StudentReg.WdrwlID.ToString()) == 0)
                    {
                        BLLValidationsMessages.Add(new BLLValidations() { Id = "WdrwlID", Message = "Withdrawal Not Found" });
                    }
                }
                if (StudentReg.CourseID > 0)
                {
                    if (CommanMethods.GetForaignKeyCount(dbHandler, "BasicCourse", "CourseID", StudentReg.CourseID.ToString()) == 0)
                    {
                        BLLValidationsMessages.Add(new BLLValidations() { Id = "CourseID", Message = "Course Not Found" });
                    }
                }
                if (StudentReg.SubCastID > 0)
                {
                    if (CommanMethods.GetForaignKeyCount(dbHandler, "BasicSubCaste", "SubCastID", StudentReg.SubCastID.ToString()) == 0)
                    {
                        BLLValidationsMessages.Add(new BLLValidations() { Id = "SubCastID", Message = "Sub Caste Not Found" });
                    }
                }
                if (StudentReg.CommunityID > 0)
                {
                    if (CommanMethods.GetForaignKeyCount(dbHandler, "BasicCommunity", "CommunityID", StudentReg.CommunityID.ToString()) == 0)
                    {
                        BLLValidationsMessages.Add(new BLLValidations() { Id = "CommunityID", Message = "Community Not Found" });
                    }
                }

                if (StudentReg.MothTID > 0)
                {
                    if (CommanMethods.GetForaignKeyCount(dbHandler, "BasicMotherTongue", "MothTID", StudentReg.MothTID.ToString()) == 0)
                    {
                        BLLValidationsMessages.Add(new BLLValidations() { Id = "MothTID", Message = "Mother Tongue Not Found" });
                    }
                }

                if (StudentReg.OcupID > 0)
                {
                    if (CommanMethods.GetForaignKeyCount(dbHandler, "BasicOccupation", "OcupID", StudentReg.OcupID.ToString()) == 0)
                    {
                        BLLValidationsMessages.Add(new BLLValidations() { Id = "OcupID", Message = "Mother Tongue Not Found" });
                    }
                }

                if (StudentReg.MandalID > 0)
                {
                    if (CommanMethods.GetForaignKeyCount(dbHandler, "BasicMandal", "MandalID", StudentReg.MandalID.ToString()) == 0)
                    {
                        BLLValidationsMessages.Add(new BLLValidations() { Id = "MandalID", Message = "Mandal Not Found" });
                    }
                }

                if (StudentReg.DistrictID > 0)
                {
                    if (CommanMethods.GetForaignKeyCount(dbHandler, "BasicDistricts", "DistrictID", StudentReg.DistrictID.ToString()) == 0)
                    {
                        BLLValidationsMessages.Add(new BLLValidations() { Id = "DistrictID", Message = "District Not Found" });
                    }
                }
                if (StudentReg.StateID > 0)
                {
                    if (CommanMethods.GetForaignKeyCount(dbHandler, "BasicState", "StateID", StudentReg.StateID.ToString()) == 0)
                    {
                        BLLValidationsMessages.Add(new BLLValidations() { Id = "StateID", Message = "State Not Found" });
                    }
                }
                if (StudentReg.MandalIDP > 0)
                {
                    if (CommanMethods.GetForaignKeyCount(dbHandler, "BasicMandal", "MandalID", StudentReg.MandalIDP.ToString()) == 0)
                    {
                        BLLValidationsMessages.Add(new BLLValidations() { Id = "MandalIDP", Message = "Mandal Not Found" });
                    }
                }

                if (StudentReg.DistrictIDP > 0)
                {
                    if (CommanMethods.GetForaignKeyCount(dbHandler, "BasicDistricts", "DistrictID", StudentReg.DistrictIDP.ToString()) == 0)
                    {
                        BLLValidationsMessages.Add(new BLLValidations() { Id = "DistrictIDP", Message = "District Not Found" });
                    }
                }
                if (StudentReg.StateIDP > 0)
                {
                    if (CommanMethods.GetForaignKeyCount(dbHandler, "BasicState", "StateID", StudentReg.StateIDP.ToString()) == 0)
                    {
                        BLLValidationsMessages.Add(new BLLValidations() { Id = "StateIDP", Message = "State Not Found" });
                    }
                }



                return BLLValidationsMessages;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


    }
}