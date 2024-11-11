using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using SoftwareSuite.Models.Admission;
using SoftwareSuite.Models.Database;

namespace SoftwareSuite.Controllers.Admission
{
    public class StudentRegService
    {
        #region "Insert/Update/Delete"

        public void PostAadharTemp(AadhaarList aadhaarList, StudentReg studentReg, dbHandler dbHandler)
        {
            try
            {
                string StrQuery = "";

                StrQuery = "Update StudentReg set AadharAuthFlag = 2 where StudRegID=" + studentReg.StudRegID + ";" +
                    "DECLARE @aadhar_no_count int = 0 " +
                    "SET @aadhar_no_count = (Select count(*) from TempAadhar where Aadharno = '+" + aadhaarList.aadhaarno.TrimEnd(' ') + " +') " +
                    "IF (@aadhar_no_count = 0) " +
                    "Insert into TempAadhar(" +
                    "AadharNo," +
                    "PhotoPath," +
                    "StduName," +
                    "BirthDate," +
                    "Gender," +
                    "FatherName," +
                    "Address," +
                    "Created_Date)VALUES" +
                "('" + aadhaarList.aadhaarno.TrimEnd(' ') + "'," +
                    "'" + aadhaarList.imgPath + "'," +
                    "'" + aadhaarList.name + "'," +
                    "'" + aadhaarList.dob + "'," +
                    "'" + aadhaarList.gender.Substring(0, 1) + "'," +
                    "'" + aadhaarList.co + "'," +
                    "'" + aadhaarList.address + "'," +
                    "GETDATE()) " +
                    "ELSE select @aadhar_no_count";
                Int64 _result = Convert.ToInt64(dbHandler.ExecuteNonQuery(StrQuery));
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("StudentReg", 0, ex.Message);
                throw ex;
            }
        }


        public static DataSet PostStudentReg(PolytechStudent polyStu, dbHandler dbHandler)
        {
            try
            {
                string StrQuery = "usp_ManageStudent";

                #region Sql Parameters
                // Add the input parameters and set the properties.
                SqlParameter[] param = new SqlParameter[55];

                param[0] = new SqlParameter("@StudentId", SqlDbType.Int);
                param[0].Value = polyStu.StudentId;

                param[1] = new SqlParameter("@YearorSemId", SqlDbType.Int);
                param[1].Value = polyStu.SemId;

                param[2] = new SqlParameter("@ShiftId", SqlDbType.Int);
                param[2].Value = polyStu.ShiftId;

                param[3] = new SqlParameter("@SectionId", SqlDbType.Int);
                param[3].Value = polyStu.SectionId;

                param[4] = new SqlParameter("@Name", SqlDbType.VarChar, 1000);
                param[4].Value = polyStu.Name ?? "";

                param[5] = new SqlParameter("@FatherName", SqlDbType.VarChar, 1000);
                param[5].Value = polyStu.FatherName ?? "";

                param[6] = new SqlParameter("@MotherName", SqlDbType.VarChar, 1000);
                param[6].Value = polyStu.MotherName ?? "";

                param[7] = new SqlParameter("@Gender", SqlDbType.Int);
                param[7].Value = polyStu.Gender;

                param[8] = new SqlParameter("@DateOfBirth", SqlDbType.VarChar, 40);
                param[8].Value = polyStu.DateOfBirth ?? "";

                param[9] = new SqlParameter("@CategoryId", SqlDbType.Int);
                param[9].Value = polyStu.CategoryId;

                param[10] = new SqlParameter("@SpecialCategoryId", SqlDbType.VarChar, 40);
                param[10].Value = polyStu.SpecialCategoryId ?? "";

                param[11] = new SqlParameter("@TenthRollNo", SqlDbType.VarChar, 50);
                param[11].Value = polyStu.TenthRollNo ?? "";

                param[12] = new SqlParameter("@TenthYear", SqlDbType.VarChar, 50);
                param[12].Value = polyStu.TenthYear ?? "";

                param[13] = new SqlParameter("@TenthBoard", SqlDbType.Int);
                param[13].Value = polyStu.TenthBoard;

                param[14] = new SqlParameter("@TenthHallTicketNo", SqlDbType.VarChar, 50);
                param[14].Value = polyStu.TenthHallticketNo ?? "";

                param[15] = new SqlParameter("@StudentRecided", SqlDbType.Int);
                param[15].Value = polyStu.StudentRecided;

                param[16] = new SqlParameter("@PolycetHallTicketNo", SqlDbType.VarChar, 50);
                param[16].Value = polyStu.PolycetHallTicketNo ?? "";

                param[17] = new SqlParameter("@QualificationId", SqlDbType.Int);
                param[17].Value = polyStu.QualificationId;

                param[18] = new SqlParameter("@ReligionId", SqlDbType.Int);
                param[18].Value = polyStu.ReligionId;

                param[19] = new SqlParameter("@Region", SqlDbType.Int);
                param[19].Value = polyStu.Region;

                param[20] = new SqlParameter("@MinorityType", SqlDbType.Int);
                param[20].Value = polyStu.MinorityType;

                param[21] = new SqlParameter("@CandidateSign", SqlDbType.VarChar, -1);
                param[21].Value = polyStu.CandidateSign ?? "";

                param[22] = new SqlParameter("@PermanentAddress", SqlDbType.VarChar, 1000);
                param[22].Value = "";

                param[23] = new SqlParameter("@CurrentAddress", SqlDbType.VarChar, 1000);
                param[23].Value = "";

                param[24] = new SqlParameter("@HouseNo", SqlDbType.VarChar, 50);
                param[24].Value = polyStu.HouseNo ?? "";

                param[25] = new SqlParameter("@VillageorTown", SqlDbType.VarChar, 1000);
                param[25].Value = polyStu.VillageorTown ?? "";

                param[26] = new SqlParameter("@MandalId", SqlDbType.Int);
                param[26].Value = polyStu.MandalId;

                param[27] = new SqlParameter("@DistrictId", SqlDbType.Int);
                param[27].Value = polyStu.DistrictId;

                param[28] = new SqlParameter("@Pincode", SqlDbType.VarChar, 50);
                param[28].Value = polyStu.Pincode ?? "";

                param[29] = new SqlParameter("@IsPhysicallyHandicaped", SqlDbType.Bit);
                param[29].Value = polyStu.IsPhysicallyHandicaped ? 1 : 0;

                param[30] = new SqlParameter("@AadharNo", SqlDbType.VarChar, 30);
                param[30].Value = polyStu.AadharNo ?? "";

                param[31] = new SqlParameter("@EmailId", SqlDbType.VarChar, 100);
                param[31].Value = polyStu.EmailId ?? "";

                param[32] = new SqlParameter("@ParentContact", SqlDbType.VarChar, 50);
                param[32].Value = polyStu.ParentContact ?? "";

                param[33] = new SqlParameter("@StudentContact", SqlDbType.VarChar, 50);
                param[33].Value = polyStu.StudentContact ?? "";

                param[34] = new SqlParameter("@profilephoto", SqlDbType.VarChar, -1);
                param[34].Value = polyStu.profilephoto ?? "";

                param[35] = new SqlParameter("@IsPhotoUploded", SqlDbType.Bit);
                param[35].Value = polyStu.IsPhotoUploaded ? 1 : 0;

                param[36] = new SqlParameter("@FatherAadhaarNo", SqlDbType.VarChar, 50);
                param[36].Value = polyStu.FatherAadhaarNo ?? "";

                param[37] = new SqlParameter("@MotherAadhaarNo", SqlDbType.VarChar, 50);
                param[37].Value = polyStu.MotherAadhaarNo ?? "";

                param[38] = new SqlParameter("@IsFatherGovtEmp", SqlDbType.VarChar, 50);
                param[38].Value = Convert.ToString(polyStu.IsFatherGovtEmp) ?? "";

                param[39] = new SqlParameter("@Income", SqlDbType.VarChar, 50);
                param[39].Value = polyStu.Income ?? "";

                param[40] = new SqlParameter("@IncomeStatusValidity", SqlDbType.VarChar, 50);
                param[40].Value = polyStu.IncomeStatusValidity ?? "";

                param[41] = new SqlParameter("@IncomeCategory", SqlDbType.Int);
                param[41].Value = polyStu.IncomeCategory;

                param[42] = new SqlParameter("@Occupation", SqlDbType.VarChar, 100);
                param[42].Value = polyStu.Occupation ?? "";

                param[43] = new SqlParameter("@CasteNo", SqlDbType.VarChar, 50);
                param[43].Value = polyStu.CasteNo ?? "";

                param[44] = new SqlParameter("@CasteCertificateValidity", SqlDbType.VarChar, 200);
                param[44].Value = polyStu.CasteCertificateValidity ?? "";

                param[45] = new SqlParameter("@BankId", SqlDbType.Int);
                param[45].Value = polyStu.BankId;

                param[46] = new SqlParameter("@BankAccountNo", SqlDbType.VarChar, 50);
                param[46].Value = polyStu.BankAccountNo ?? "";

                param[47] = new SqlParameter("@IfscCode", SqlDbType.VarChar, 50);
                param[47].Value = polyStu.IfscCode ?? "";

                param[48] = new SqlParameter("@BankBranch", SqlDbType.VarChar, 200);
                param[48].Value = polyStu.BankBranch ?? "";

                param[49] = new SqlParameter("@CollegeCode", SqlDbType.VarChar, 20);
                param[49].Value = polyStu.CollegeCode ?? "";

                param[50] = new SqlParameter("@SchemeId", SqlDbType.Int);
                param[50].Value = polyStu.SchemeId;

                param[51] = new SqlParameter("@ActiveFlag", SqlDbType.Bit);
                param[51].Value = polyStu.ActiveFlag ? 1 : 0;

                param[52] = new SqlParameter("@UpdLoginId", SqlDbType.Int);
                param[52].Value = polyStu.UpdLoginId;

                param[53] = new SqlParameter("@BranchID", SqlDbType.Int);
                param[53].Value = polyStu.BranchId;

                param[54] = new SqlParameter("@TsEpassRequired", SqlDbType.Bit);
                param[54].Value = polyStu.TsEpassRequired ? 1 : 0;
                #endregion

                return dbHandler.ReturnDataWithStoredProcedure(StrQuery, param);
            }
            catch (Exception ex)
            {
                
                dbHandler.SaveErorr("StudentReg", polyStu.StudentId, ex.Message);
                throw ex;
            }
        }

        public void UpdateStudentRegFirstTab(StudentReg StudentReg, dbHandler dbHandler)
        {
            try
            {
                string StrQuery = "";
                StrQuery = "UPDATE StudentReg SET " +
                    "AadharNo='" + StudentReg.AadharNo + "'," +
                    "MobileNo='" + StudentReg.MobileNo + "'," +
                    "ParentCellno='" + StudentReg.ParentCellno + "'," +
                    "EmailId= '" + StudentReg.EmailId + "'," +
                    "Guardianname='" + StudentReg.Guardianname + "'," +
                    "RelwithGuardian= '" + StudentReg.RelwithGuardian + "'," +
                    "CasteID= " + StudentReg.CasteID + ",";
                if (StudentReg.SubCastID > 0)
                {
                    StrQuery = StrQuery + " SubCastID = " + StudentReg.SubCastID + ", ";
                }
                StrQuery = StrQuery + " MothTID= '" + StudentReg.MothTID + "'," +
                    "OcupID= " + StudentReg.OcupID + "," +
                    "IncGrpID= " + StudentReg.IncGrpID + "," +
                    "IdentiMarks= '" + StudentReg.IdentiMarks + "'," +
                    "IdentiMarks2= '" + StudentReg.IdentiMarks2 + "'," +
                    "Handicaped= '" + StudentReg.Handicaped + "',";
                if (StudentReg.PhysDisbID != 0)
                {
                    StrQuery = StrQuery + " PhysDisbID= '" + StudentReg.PhysDisbID + "',";
                    StrQuery = StrQuery + " PhysDisbPer= " + StudentReg.PhysDisbPer + ",";
                }
                else
                {
                    StrQuery = StrQuery + " PhysDisbID = NULL,";
                }
                if (StudentReg.SpclConsID != 0)
                {
                    StrQuery = StrQuery + " SpclConsID= '" + StudentReg.SpclConsID + "',";
                }
                else
                {
                    StrQuery = StrQuery + " SpclConsID= NULL,";
                }
                StrQuery = StrQuery + " UpdLoginID= " + StudentReg.UpdLoginID + "," +
                    "UpdDate= GetDate(), " +
                    "GradePoints= " + StudentReg.GradePoints + " " +
                    "WHERE StudRegID= " + StudentReg.StudRegID;
                dbHandler.ExecuteNonQuery(StrQuery);
            }
            catch (Exception ex)
            {
                
                dbHandler.SaveErorr("StudentReg", StudentReg.UpdLoginID, ex.Message);
                throw ex;
            }
        }
        public void UpdateStudentRegSecondTab(StudentReg StudentReg, dbHandler dbHandler)
        {
            try
            {
                string StrQuery = "";
                StrQuery = "UPDATE StudentReg SET " +
                    "MediumID=" + StudentReg.MediumID + "," +
                    "SecondLangID=" + StudentReg.SecondLangID + "," +
                    "MainGrpID=" + StudentReg.MainGrpID + "," +
                    "ScholarshipFlag= '" + StudentReg.ScholarshipFlag + "'," +
                    "RecgFeesFlag='" + StudentReg.RecgFeesFlag + "'," +
                    "ExmFeesFlag= '" + StudentReg.ExmFeesFlag + "'," +
                    "UpdLoginID= " + StudentReg.UpdLoginID + "," +
                    "UpdDate= GetDate() " +
                    "WHERE StudRegID= " + StudentReg.StudRegID;
                dbHandler.ExecuteNonQuery(StrQuery);
            }
            catch (Exception ex)
            {
                
                dbHandler.SaveErorr("StudentReg", StudentReg.UpdLoginID, ex.Message);
                throw ex;
            }
        }
        public void UpdateStudentRegThirdTab(StudentReg StudentReg, dbHandler dbHandler)
        {
            try
            {
                string StrQuery = "";
                StrQuery = "UPDATE StudentReg SET " +
                    "Houseno= '" + StudentReg.Houseno.Replace("'", "''") + "'," +
                    "Streetname= '" + StudentReg.Streetname.Replace("'", "''") + "'," +
                    "Cityname= '" + StudentReg.Cityname.Replace("'", "''") + "'," +
                    "DistrictID =" + StudentReg.DistrictID + "," +
                    "StateID= " + StudentReg.StateID + ",";
                if (StudentReg.MandalID != 0)
                {
                    StrQuery = StrQuery + " MandalID = " + StudentReg.MandalID + ",";
                }
                StrQuery = StrQuery + "HousenoP= '" + StudentReg.HousenoP.Replace("'", "''") + "'," +
                    "StreetnameP= '" + StudentReg.StreetnameP.Replace("'", "''") + "'," +
                    "CitynameP= '" + StudentReg.CitynameP.Replace("'", "''") + "'," +
                    "DistrictIDP =" + StudentReg.DistrictIDP + "," +
                    "StateIDP= " + StudentReg.StateIDP + ",";
                if (StudentReg.MandalIDP != 0)
                {
                    StrQuery = StrQuery + " MandalIDP = " + StudentReg.MandalIDP + ",";
                }
                StrQuery = StrQuery + " Remark= '" + StudentReg.Remark + "'," +
                    "UpdLoginID= " + StudentReg.UpdLoginID + "," +
                    "UpdDate= GetDate() " +
                    "WHERE StudRegID= " + StudentReg.StudRegID;
                dbHandler.ExecuteNonQuery(StrQuery);
            }
            catch (Exception ex)
            {
                
                dbHandler.SaveErorr("StudentReg", StudentReg.UpdLoginID, ex.Message);
                throw ex;
            }
        }
        public void UpdateStudentRegAadharAuthenticate(StudentReg StudentReg, dbHandler dbHandler)
        {
            try
            {
                string StrQuery = "";
                StrQuery = "UPDATE StudentReg SET " +
                    "AadharNo= '" + StudentReg.AadharNo + "'," +
                    "AadharAuthDate= Getdate() " +
                    "WHERE StudRegID= " + StudentReg.StudRegID;
                dbHandler.ExecuteNonQuery(StrQuery);
            }
            catch (Exception ex)
            {
                
                dbHandler.SaveErorr("StudentReg", StudentReg.UpdLoginID, ex.Message);
                throw ex;
            }
        }
   
       





       
       









        /// <summary>
        /// PostAadharTemp To save details returned from Aadhaar site
        /// </summary>
        /// <param name="aadhaarList"></param>
        /// <param name="studentReg"></param>
        /// <param name="dbHandler"></param>     
        #endregion

        #region "Get Methods"

        public DataTable GetStudentRegList(dbHandler dbHandler)
        {
            try
            {
                string StrQuery = "";
                StrQuery = "SELECT StudentReg.StudRegID, StudentReg.SSCHallTicket,StudentReg.AdmNo,StudentReg.AdmDate,StudentReg.StudName,StudentReg.FatherName," +
                    "StudentReg.MotherName,StudentReg.Gender,StudentReg.Nationality,StudentReg.BirthDate,StudentReg.CommunityID,StudentReg.IdentiMarks," +
                    "StudentReg.MothTID,StudentReg.OcupID,StudentReg.CollegeID,StudentReg.CourseID,StudentReg.ExamID,StudentReg.BranchID,StudentReg.ParentCellno," +
                    "StudentReg.AcdYrID,StudentReg.AadharNo,StudentReg.MobileNo,StudentReg.Handicaped,StudentReg.PhysDisbID,StudentReg.SpclConsID," +
                    "StudentReg.Guardianname,StudentReg.RelwithGuardian,StudentReg.MediumID,StudentReg.MainGrpID,StudentReg.SecondLangID, " +
                    "StudentReg.AdmCategory,StudentReg.IncGrpID,StudentReg.ScholarshipFlag,StudentReg.RecgFeesFlag," +
                    "StudentReg.ExmFeesFlag,StudentReg.TCNO,StudentReg.Dateofwithdrawal,StudentReg.WdrwlID,StudentReg.Classwithdrawal," +
                    "StudentReg.PresentAddr,StudentReg.Houseno,StudentReg.Streetname,StudentReg.Cityname,StudentReg.MandalID,StudentReg.DistrictID,StudentReg.StateID," +
                    "StudentReg.PermanentAddr,StudentReg.HousenoP,StudentReg.StreetnameP,StudentReg.CitynameP,StudentReg.MandalIDP,StudentReg.DistrictIDP," +
                    "StudentReg.StateIDP,'" + ConfigurationManager.AppSettings["WebUrl"].ToString() + "' + StudentReg.PhotoPath AS PhotoPath,'" + ConfigurationManager.AppSettings["WebUrl"].ToString() + "' + StudentReg.SignPath AS SignPath,StudentReg.Eligible,StudentReg.Remark,StudentReg.ActiveFlag,StudentReg.CreLoginID," +
                    "StudentReg.CreDate,StudentReg.UpdLoginID,StudentReg.UpdDate, StudentReg.LstInstName, " +
                    "BasicCommunity.CommName,BasicMedium.MediumName,BasicSubject.SubName,BasicMainGroup.MainGrpName, " +
                    "replace(convert(varchar(11),StudentReg.BirthDate,106),' ','/') as BirthDateDesc, " +
                    "Case when StudentReg.Gender='F' then 'Female' Else 'Male' End As GenderDesc,  StudentReg.CasteID, StudentReg.SubCastID,StudentReg.AadharNo,StudentReg.MobileNo, " +
                    "Case when StudentReg.Eligible='Y' then 'Yes' Else 'No' End EligibleDesc,cast(DatePart(Day,StudentReg.BirthDate) as varchar) + ',' + Datename(month,StudentReg.BirthDate)+ ',' + Datename(year,StudentReg.BirthDate) as DateOfBirthInWords, StudentReg.LateAppFlag, StudentReg.FeeAmount,StudentReg.PassingYear,StudentReg.PassingMonth,StudentReg.IdentiMarks2,isnull(ltrim(StudentReg.PRNNo),'') as PRNNo, StudentReg.GradePoints " +
                    "FROM StudentReg " +
                    "LEFT OUTER JOIN BasicCommunity ON StudentReg.CommunityID = BasicCommunity.CommunityID " +
                    "LEFT OUTER JOIN BasicMedium ON StudentReg.MediumID = BasicMedium.MediumID " +
                    "LEFT OUTER JOIN BasicMainGroup ON StudentReg.MainGrpID = BasicMainGroup.MainGrpID " +
                    "LEFT OUTER JOIN BasicSubject ON StudentReg.SecondLangID = BasicSubject.SubjectID " +
                    "LEFT OUTER JOIN BasicCaste ON StudentReg.CasteID = BasicCaste.CasteID " +
                    "LEFT OUTER JOIN BasicSubCaste ON StudentReg.SubCastID = BasicSubCaste.SubCastID WHERE (StudentReg.ActiveFlag =1)  ";
                return dbHandler.ReturnData(StrQuery);
            }
            catch (Exception ex)
            {
                
                dbHandler.SaveErorr("StudentReg", 0, ex.Message);
                throw ex;
            }
        }


        public DataTable GetStudentRegById(dbHandler dbHandler, long StudRegID)
        {
            try
            {
                string StrQuery = "usp_GetStudentDetails'" + StudRegID.ToString() + "'";

                return dbHandler.ReturnData(StrQuery);
            }
            catch (Exception ex)
            {
                
                dbHandler.SaveErorr("StudentReg", 0, ex.Message);
                throw ex;
            }
        }

        public DataTable GetStudentRegListForCollege(dbHandler dbHandler, string CollegeCode, int UserId)
        {
            try
            {
                string StrQuery = "";
                StrQuery = $"USP_GET_COLLEGEWISE_AdmissionList {UserId}, '{CollegeCode.Trim()}'";

                return dbHandler.ReturnData(StrQuery);
            }
            catch (Exception ex)
            {
                
                dbHandler.SaveErorr("GetStudentRegListForCollege", 0, ex.Message);
                throw ex;
            }
        }

        public DataTable GetStudentRegListByCourseExamBranch(dbHandler dbHandler, int CollegeID, int SchemeID, int SemID, int BranchID, int SectionID, int ShiftID)
        {
            try
            {
                string StrQuery = "";
                StrQuery = "USP_GET_COLLEGEWISE_STUDENT_FILTER_LIST " + SchemeID + ", " + SemID + ", " + ShiftID + ", " + BranchID + ", " + SectionID;

                return dbHandler.ReturnData(StrQuery);
            }
            catch (Exception ex)
            {
                
                dbHandler.SaveErorr("StudentReg", 0, ex.Message);
                throw ex;
            }
        }
        public DataTable GetStudentRegListByCollegeCourseBranch(dbHandler dbHandler, string CollegeCode, int SchemeID, int SemID, int BranchID, int SectionID, int ShiftID, int AcademicYearId)
        {
            try
            {
                string StrQuery = "";
                StrQuery = "USP_Admission_GET_DashBoradReportPinList " + SchemeID + ", " + SemID + ", " + ShiftID + ", " + BranchID + ", " + SectionID + ",'" + CollegeCode + "'," + AcademicYearId;
                return dbHandler.ReturnData(StrQuery);
            }
            catch (Exception ex)
            {
                
                dbHandler.SaveErorr("StudentReg", 0, ex.Message);
                throw ex;
            }
        }

        public DataTable GetStudentRegListByCollegeCourseBranchDataNotUpdated(dbHandler dbHandler, string CollegeCode, int SchemeID, int SemID, int BranchID, int SectionID, int ShiftID, int AcademicYearId)
        {
            try
            {
                string StrQuery = "";
                StrQuery = "USP_GET_COLLEGECOURSEBRANCH_STUDENTLIST_DataNotUpdated " + SchemeID + ", " + SemID + ", " + ShiftID + ", " + BranchID + ", " + SectionID + ",'" + CollegeCode + "'," + AcademicYearId;
                return dbHandler.ReturnData(StrQuery);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("StudentReg", 0, ex.Message);
                throw ex;
            }
        }

        public DataTable GetStudentRegListByCollegeCourseBranchAadharNotVerified(dbHandler dbHandler, string CollegeCode, int SchemeID, int SemID, int BranchID, int SectionID, int ShiftID, int AcademicYearId)
        {
            try
            {
                string StrQuery = "";
                StrQuery = "USP_GET_COLLEGECOURSEBRANCH_STUDENTLIST_AadharNotVerfied " + SchemeID + ", " + SemID + ", " + ShiftID + ", " + BranchID + ", " + SectionID + ",'" + CollegeCode + "'," + AcademicYearId;
                return dbHandler.ReturnData(StrQuery);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("StudentReg", 0, ex.Message);
                throw ex;
            }
        }

        public DataTable GenPin(dbHandler dbHandler, Int64 StudentID)
        {
            try
            {
                string StrQuery = "";
                StrQuery = "USP_GENERATE_PIN " + StudentID.ToString();

                return dbHandler.ReturnData(StrQuery);
            }
            catch (Exception ex)
            {
                
                dbHandler.SaveErorr("StudentReg", 0, ex.Message);
                throw ex;
            }
        }

        public DataTable GetStudentRegDetailsListByAdmNoOrPhoto(dbHandler dbHandler, int CollegeID, string WithPhoto, Int64 AdmNo = 0)
        {
            try
            {
                string StrQuery = "";
                StrQuery = "SELECT StudentReg.StudRegID, StudentReg.SSCHallTicket,StudentReg.AdmNo,StudentReg.AdmDate,StudentReg.StudName,StudentReg.FatherName," +
                    "StudentReg.MotherName,StudentReg.Gender,StudentReg.Nationality,StudentReg.BirthDate,StudentReg.CommunityID,StudentReg.IdentiMarks," +
                    "StudentReg.MothTID,StudentReg.OcupID,StudentReg.CollegeID,StudentReg.CourseID,StudentReg.ExamID,StudentReg.BranchID,StudentReg.ParentCellno," +
                    "StudentReg.AcdYrID,StudentReg.AadharNo,StudentReg.MobileNo,StudentReg.Handicaped,StudentReg.PhysDisbID,StudentReg.SpclConsID," +
                    "StudentReg.Guardianname,StudentReg.RelwithGuardian,StudentReg.MediumID,StudentReg.MainGrpID,StudentReg.SecondLangID, " +
                    "StudentReg.AdmCategory,StudentReg.IncGrpID,StudentReg.ScholarshipFlag,StudentReg.RecgFeesFlag," +
                    "StudentReg.ExmFeesFlag,StudentReg.TCNO,StudentReg.Dateofwithdrawal,StudentReg.WdrwlID,StudentReg.Classwithdrawal," +
                    "StudentReg.PresentAddr,StudentReg.Houseno,StudentReg.Streetname,StudentReg.Cityname,StudentReg.MandalID,StudentReg.DistrictID,StudentReg.StateID," +
                    "StudentReg.PermanentAddr,StudentReg.HousenoP,StudentReg.StreetnameP,StudentReg.CitynameP,StudentReg.MandalIDP,StudentReg.DistrictIDP,StudentReg.AadharNo,StudentReg.MobileNo," +
                    "StudentReg.StateIDP,'" + ConfigurationManager.AppSettings["WebUrl"].ToString() + "' + StudentReg.PhotoPath AS PhotoPath,'" + ConfigurationManager.AppSettings["WebUrl"].ToString() + "' + StudentReg.SignPath AS SignPath,StudentReg.Eligible,StudentReg.Remark,StudentReg.ActiveFlag,StudentReg.CreLoginID," +
                    "StudentReg.CreDate,StudentReg.UpdLoginID,StudentReg.UpdDate, StudentReg.LstInstName, " +
                    "BasicCommunity.CommName,BasicMedium.MediumName,BasicSubject.SubName, BasicMainGroup.MainGrpName, " +
                    "replace(convert(varchar(11),StudentReg.BirthDate,106),' ','/') as BirthDateDesc, " +
                    "Case when StudentReg.Gender='F' then 'Female' Else 'Male' End As GenderDesc,  StudentReg.CasteID, StudentReg.SubCastID, " +
                    "BasicCourse.CourseName,BasicExam.ExmName,BasicBranch.BranchName,BasicCaste.CasteName,Case when StudentReg.Eligible='Y' then 'Yes' Else 'No' End EligibleDesc,cast(DatePart(Day,StudentReg.BirthDate) as varchar) + ',' + Datename(month,StudentReg.BirthDate)+ ',' + Datename(year,StudentReg.BirthDate) as DateOfBirthInWords, StudentReg.LateAppFlag, StudentReg.FeeAmount,StudentReg.EmailId,StudentReg.PassingYear,StudentReg.PassingMonth,StudentReg.IdentiMarks2, " +
                    //"case when StudentReg.AadharNo is null or StudentReg.AadharAuthDate is null or StudentReg.PhotoPath is null or StudentReg.SignPath is null or StudentReg.MainGrpID is null or StudentReg.Houseno is null then 'Pending' else 'Completed' end as AdmStatus, " +
                    "case when StudentReg.MainGrpID is null or StudentReg.MediumID is null or StudentReg.MothTID is null then 'Profile Pending' " +
                    "when StudentReg.PhotoPath is null or StudentReg.SignPath is null then 'Photo Or Sign Pending' " +
                    "when StudentReg.TCNO is null then 'Certificates Pending' when isnull(StudentReg.PRNNo,'')='' then 'PRN Gen. Pending' else 'Completed' End as AdmStatus,BasicMainGroup.MainGrpName, " + //when StudentReg.AadharAuthDate is null then 'Aadhaar Pending' else 'Completed' End as AdmStatus
                    "case when StudentReg.IsOpenCollege = 1 then 'Open' else 'Regular' end as RegularOrOpen,isnull(ltrim(StudentReg.PRNNo),'') as PRNNo, StudentReg.GradePoints,StudentReg.PhysDisbPer  " +
                    "FROM StudentReg " +
                    "LEFT OUTER JOIN BasicCommunity ON StudentReg.CommunityID = BasicCommunity.CommunityID " +
                    "LEFT OUTER JOIN BasicMedium ON StudentReg.MediumID = BasicMedium.MediumID " +
                    "LEFT OUTER JOIN BasicSubject ON StudentReg.SecondLangID = BasicSubject.SubjectID " +
                    "LEFT OUTER JOIN BasicCaste ON StudentReg.CasteID = BasicCaste.CasteID " +
                    "LEFT OUTER JOIN BasicSubCaste ON StudentReg.SubCastID = BasicSubCaste.SubCastID " +
                    "LEFT OUTER JOIN BasicCourse ON StudentReg.CourseID = BasicCourse.CourseID " +
                    "LEFT OUTER JOIN BasicExam ON StudentReg.ExamID = BasicExam.ExamID " +
                    "LEFT OUTER JOIN BasicBranch ON StudentReg.BranchID = BasicBranch.BranchID " +
                    "LEFT OUTER JOIN BasicMainGroup ON StudentReg.MainGrpID = BasicMainGroup.MainGrpID " +
                    "Where (StudentReg.ActiveFlag =1) AND ISNULL(Eligible,'N') ='N' and StudentReg.CollegeID = " + CollegeID;
                if (WithPhoto == "Y")
                {
                    StrQuery = StrQuery + " AND StudentReg.PhotoPath is not null and StudentReg.SignPath is not null ";
                }
                else
                {
                    StrQuery = StrQuery + " AND StudentReg.PhotoPath is null and StudentReg.SignPath is null";
                }
                if (AdmNo > 0)
                {
                    StrQuery = StrQuery + " AND StudentReg.AdmNo = " + AdmNo + " ";
                }
                return dbHandler.ReturnData(StrQuery);
            }
            catch (Exception ex)
            {
                
                dbHandler.SaveErorr("StudentReg", 0, ex.Message);
                throw ex;
            }
        }
        public DataTable GetStudentRegDetailsListByGroupAndMedium(dbHandler dbHandler, int CollegeID, int MainGrpID, int MediumID, int SubjectID = 0)
        {
            try
            {
                string StrQuery = "";
                StrQuery = "SELECT StudentReg.StudRegID, StudentReg.SSCHallTicket,StudentReg.AdmNo,StudentReg.AdmDate,StudentReg.StudName,StudentReg.FatherName," +
                    "StudentReg.MotherName,StudentReg.Gender,StudentReg.Nationality,StudentReg.BirthDate,StudentReg.CommunityID,StudentReg.IdentiMarks," +
                    "StudentReg.MothTID,StudentReg.OcupID,StudentReg.CollegeID,StudentReg.CourseID,StudentReg.ExamID,StudentReg.BranchID,StudentReg.ParentCellno," +
                    "StudentReg.AcdYrID,StudentReg.AadharNo,StudentReg.MobileNo,StudentReg.Handicaped,StudentReg.PhysDisbID,StudentReg.SpclConsID," +
                    "StudentReg.Guardianname,StudentReg.RelwithGuardian,StudentReg.MediumID,StudentReg.MainGrpID,StudentReg.SecondLangID," +
                    "StudentReg.AdmCategory,StudentReg.IncGrpID,StudentReg.ScholarshipFlag,StudentReg.RecgFeesFlag," +
                    "StudentReg.ExmFeesFlag,StudentReg.TCNO,StudentReg.Dateofwithdrawal,StudentReg.WdrwlID,StudentReg.Classwithdrawal," +
                    "StudentReg.PresentAddr,StudentReg.Houseno,StudentReg.Streetname,StudentReg.Cityname,StudentReg.MandalID,StudentReg.DistrictID,StudentReg.StateID," +
                    "StudentReg.PermanentAddr,StudentReg.HousenoP,StudentReg.StreetnameP,StudentReg.CitynameP,StudentReg.MandalIDP,StudentReg.DistrictIDP,StudentReg.AadharNo,StudentReg.MobileNo," +
                    "StudentReg.StateIDP,'" + ConfigurationManager.AppSettings["WebUrl"].ToString() + "' + StudentReg.PhotoPath AS PhotoPath,'" + ConfigurationManager.AppSettings["WebUrl"].ToString() + "' + StudentReg.SignPath AS SignPath,StudentReg.Eligible,StudentReg.Remark,StudentReg.ActiveFlag,StudentReg.CreLoginID," +
                    "StudentReg.CreDate,StudentReg.UpdLoginID,StudentReg.UpdDate, StudentReg.LstInstName, " +
                    "BasicCommunity.CommName,BasicMedium.MediumName,BasicSubject.SubName,BasicMainGroup.MainGrpName, " +
                    "replace(convert(varchar(11),StudentReg.BirthDate,106),' ','/') as BirthDateDesc, " +
                    "Case when StudentReg.Gender='F' then 'Female' Else 'Male' End As GenderDesc,  StudentReg.CasteID, StudentReg.SubCastID, " +
                    "BasicCourse.CourseName,BasicExam.ExmName,BasicBranch.BranchName,BasicCaste.CasteName,Case when StudentReg.Eligible='Y' then 'Yes' Else 'No' End EligibleDesc,cast(DatePart(Day,StudentReg.BirthDate) as varchar) + ',' + Datename(month,StudentReg.BirthDate)+ ',' + Datename(year,StudentReg.BirthDate) as DateOfBirthInWords, StudentReg.LateAppFlag, StudentReg.FeeAmount,StudentReg.EmailId,StudentReg.PassingYear,StudentReg.PassingMonth,StudentReg.IdentiMarks2, " +
                    //"case when StudentReg.AadharNo is null or StudentReg.AadharAuthDate is null or StudentReg.PhotoPath is null or StudentReg.SignPath is null or StudentReg.MainGrpID is null or StudentReg.Houseno is null then 'Pending' else 'Completed' end as AdmStatus, " +
                    "case when StudentReg.MainGrpID is null or StudentReg.MediumID is null or StudentReg.MothTID is null then 'Profile Pending' " +
                    "when StudentReg.PhotoPath is null or StudentReg.SignPath is null then 'Photo Or Sign Pending' " +
                    "when StudentReg.TCNO is null then 'Certificates Pending'  when isnull(StudentReg.PRNNo,'')='' then 'PRN Gen. Pending' else 'Completed' End as AdmStatus,BasicMainGroup.MainGrpName, " + //when StudentReg.AadharAuthDate is null then 'Aadhaar Pending' else 'Completed' End as AdmStatus
                    "case when StudentReg.IsOpenCollege = 1 then 'Open' else 'Regular' end as RegularOrOpen,isnull(ltrim(StudentReg.PRNNo),'') as PRNNo, StudentReg.GradePoints,StudentReg.PhysDisbPer   " +
                    "FROM StudentReg " +
                    "LEFT OUTER JOIN BasicCommunity ON StudentReg.CommunityID = BasicCommunity.CommunityID " +
                    "LEFT OUTER JOIN BasicMedium ON StudentReg.MediumID = BasicMedium.MediumID " +
                    "LEFT OUTER JOIN BasicSubject ON StudentReg.SecondLangID = BasicSubject.SubjectID " +
                    "LEFT OUTER JOIN BasicCaste ON StudentReg.CasteID = BasicCaste.CasteID " +
                    "LEFT OUTER JOIN BasicSubCaste ON StudentReg.SubCastID = BasicSubCaste.SubCastID " +
                    "LEFT OUTER JOIN BasicCourse ON StudentReg.CourseID = BasicCourse.CourseID " +
                    "LEFT OUTER JOIN BasicExam ON StudentReg.ExamID = BasicExam.ExamID " +
                    "LEFT OUTER JOIN BasicBranch ON StudentReg.BranchID = BasicBranch.BranchID " +
                    "LEFT OUTER JOIN BasicMainGroup ON StudentReg.MainGrpID = BasicMainGroup.MainGrpID " +
                    "Where (StudentReg.ActiveFlag =1) AND ISNULL(Eligible,'N') ='N' and StudentReg.CollegeID = " + CollegeID;
                if (MainGrpID > 0)
                {
                    StrQuery = StrQuery + " AND StudentReg.MainGrpID = " + MainGrpID + "";
                }
                if (MediumID > 0)
                {
                    StrQuery = StrQuery + " AND StudentReg.MediumID = " + MediumID + " ";
                }
                if (SubjectID > 0)
                {
                    StrQuery = StrQuery + " AND StudentReg.SecondLangID = " + SubjectID + " ";
                }
                return dbHandler.ReturnData(StrQuery);
            }
            catch (Exception ex)
            {
                
                dbHandler.SaveErorr("StudentReg", 0, ex.Message);
                throw ex;
            }
        }
        public DataTable GetStudentRegDetailsListAll(dbHandler dbHandler, string CollegeID)
        {
            try
            {
                string StrQuery = "";
                //StrQuery = "SELECT StudentReg.StudRegID, StudentReg.SSCHallTicket,StudentReg.AdmNo,StudentReg.AdmDate,StudentReg.StudName,StudentReg.FatherName," +
                //    "StudentReg.MotherName,StudentReg.Gender,StudentReg.Nationality,StudentReg.BirthDate,StudentReg.CommunityID,StudentReg.IdentiMarks," +
                //    "StudentReg.MothTID,StudentReg.OcupID,StudentReg.CollegeID,StudentReg.CourseID,StudentReg.ExamID,StudentReg.BranchID,StudentReg.ParentCellno," +
                //    "StudentReg.AcdYrID,StudentReg.AadharNo,StudentReg.MobileNo,StudentReg.Handicaped,StudentReg.PhysDisbID,StudentReg.SpclConsID," +
                //    "StudentReg.Guardianname,StudentReg.RelwithGuardian,StudentReg.MediumID,StudentReg.MainGrpID,StudentReg.SecondLangID," +
                //    "StudentReg.AdmCategory,StudentReg.IncGrpID,StudentReg.ScholarshipFlag,StudentReg.RecgFeesFlag," +
                //    "StudentReg.ExmFeesFlag,StudentReg.TCNO,StudentReg.Dateofwithdrawal,StudentReg.WdrwlID,StudentReg.Classwithdrawal," +
                //    "StudentReg.PresentAddr,StudentReg.Houseno,StudentReg.Streetname,StudentReg.Cityname,StudentReg.MandalID,StudentReg.DistrictID,StudentReg.StateID," +
                //    "StudentReg.PermanentAddr,StudentReg.HousenoP,StudentReg.StreetnameP,StudentReg.CitynameP,StudentReg.MandalIDP,StudentReg.DistrictIDP,StudentReg.AadharNo,StudentReg.MobileNo," +
                //    "StudentReg.StateIDP,'" + ConfigurationManager.AppSettings["WebUrl"].ToString() + "' + StudentReg.PhotoPath AS PhotoPath,'" + ConfigurationManager.AppSettings["WebUrl"].ToString() + "' + StudentReg.SignPath AS SignPath,StudentReg.Eligible,StudentReg.Remark,StudentReg.ActiveFlag,StudentReg.CreLoginID," +
                //    "StudentReg.CreDate,StudentReg.UpdLoginID,StudentReg.UpdDate, StudentReg.LstInstName, " +
                //    "BasicCommunity.CommName,BasicMedium.MediumName,BasicSubject.SubName,BasicMainGroup.MainGrpName, " +
                //    "replace(convert(varchar(11),StudentReg.BirthDate,106),' ','/') as BirthDateDesc, " +
                //    "Case when StudentReg.Gender='F' then 'Female' Else 'Male' End As GenderDesc,  StudentReg.CasteID, StudentReg.SubCastID, " +
                //    "BasicCourse.CourseName,BasicExam.ExmName,BasicBranch.BranchName,BasicCaste.CasteName,Case when StudentReg.Eligible='Y' then 'Yes' Else 'No' End EligibleDesc,cast(DatePart(Day,StudentReg.BirthDate) as varchar) + ',' + Datename(month,StudentReg.BirthDate)+ ',' + Datename(year,StudentReg.BirthDate) as DateOfBirthInWords, StudentReg.LateAppFlag, StudentReg.FeeAmount,StudentReg.EmailId,StudentReg.PassingYear,StudentReg.PassingMonth,StudentReg.IdentiMarks2, " +
                //    //"case when StudentReg.AadharNo is null or StudentReg.AadharAuthDate is null or StudentReg.PhotoPath is null or StudentReg.SignPath is null or StudentReg.MainGrpID is null or StudentReg.Houseno is null then 'Pending' else 'Completed' end as AdmStatus, " +
                //    "case when StudentReg.MainGrpID is null or StudentReg.MediumID is null or StudentReg.MothTID is null then 'Profile Pending' " +
                //    "when StudentReg.PhotoPath is null or StudentReg.SignPath is null then 'Photo Or Sign Pending' " +
                //    "when StudentReg.TCNO is null then 'Certificates Pending' when isnull(StudentReg.PRNNo,'') ='' then 'PRN Gen. Pending' else 'Completed' End as AdmStatus,BasicMainGroup.MainGrpName, " + //when StudentReg.AadharAuthDate is null then 'Aadhaar Pending' else 'Completed' End as AdmStatus
                //    "case when StudentReg.IsOpenCollege = 1 then 'Open' else 'Regular' end as RegularOrOpen,isnull(ltrim(StudentReg.PRNNo),'') as PRNNo, StudentReg.GradePoints,StudentReg.PhysDisbPer   " +
                //    "FROM StudentReg " +
                //    "LEFT OUTER JOIN BasicCommunity ON StudentReg.CommunityID = BasicCommunity.CommunityID " +
                //    "LEFT OUTER JOIN BasicMedium ON StudentReg.MediumID = BasicMedium.MediumID " +
                //    "LEFT OUTER JOIN BasicSubject ON StudentReg.SecondLangID = BasicSubject.SubjectID " +
                //    "LEFT OUTER JOIN BasicCaste ON StudentReg.CasteID = BasicCaste.CasteID " +
                //    "LEFT OUTER JOIN BasicSubCaste ON StudentReg.SubCastID = BasicSubCaste.SubCastID " +
                //    "LEFT OUTER JOIN BasicCourse ON StudentReg.CourseID = BasicCourse.CourseID " +
                //    "LEFT OUTER JOIN BasicExam ON StudentReg.ExamID = BasicExam.ExamID " +
                //    "LEFT OUTER JOIN BasicBranch ON StudentReg.BranchID = BasicBranch.BranchID " +
                //    "LEFT OUTER JOIN BasicMainGroup ON StudentReg.MainGrpID = BasicMainGroup.MainGrpID " +
                //    "Where (StudentReg.ActiveFlag =1) AND ISNULL(Eligible,'N') ='N' and StudentReg.CollegeID = " + CollegeID;
                StrQuery = "usp_GetAdmissionDetails  '" + CollegeID + "'";
                return dbHandler.ReturnData(StrQuery);
            }
            catch (Exception ex)
            {
                
                dbHandler.SaveErorr("StudentReg", 0, ex.Message);
                throw ex;
            }
        }
        public DataTable GetAdmissionFormPrint(dbHandler dbHandler, int CollegeID, int CourseID, int ExamID, int BranchID, string FromDate, string ToDate, Int64 FromAdmNo, Int64 ToAdmNo)
        {
            try
            {
                string StrQuery = "";
                StrQuery = "SELECT StudentReg.StudRegID,StudentReg.AdmNo,StudentReg.AdmDate,StudentReg.SSCHallTicket,case when isnull(StudentReg.AdmCategory,'N') ='N' then 'Regular' Else 'Re-Admission' End As AdmCategoryDesc, " +
                    "StudentReg.StudName,StudentReg.FatherName,StudentReg.MotherName,case when StudentReg.Gender='M' then 'Male' When StudentReg.Gender='F' then 'Female' else 'Other' End GenderDesc, " +
                    "case when StudentReg.Nationality='I' then 'INDIAN' Else 'Foreigner' End As NationalityDesc, " +
                    "BasicMotherTongue.MothTName,BasicOccupation.OcupName,BasicIncomeGroups.IncGrpame,BasicCaste.CasteName,BasicSubCaste.SubCastName, " +
                    "'' as CommName,StudentReg.BirthDate,replace(convert(varchar(11),StudentReg.BirthDate,106),' ','/') as BirthDateInWords,StudentReg.AadharNo, " +
                    "StudentReg.ParentCellNo, StudentReg.MobileNo,case when StudentReg.Handicaped='Y' then 'Yes' Else 'No' End as HandicapedDesc, " +
                    "StudentReg.IdentiMarks,StudentReg.IdentiMarks2, '-' as EligibilityDesc,StudentReg.LstInstName,   BasicMainGroup.MainGrpName +'('+ BasicMainGroup.GroupCode +')' AS MainGrpName ,BasicMedium.MediumName,  " +
                    "    BasicSubject.SubName +'(' + BasicSubject.SubCode + ')' as SubName,case when ISNULL(StudentReg.BATCHNO,0) = 0  then 'NO' else 'YES' End as RecgFeesFlagDesc, " +
                    "case when isnull(StudentReg.ExmFeesFlag,'N') = 'N' then 'No' else 'Yes' End as ExmFeesFlagDesc,BasicCollege.ColCode +' - '+ BasicCollege.ColName +  ' ('+ ColBasicDistricts.DistCode + ')' AS ColName, " +
                    "case when StudentReg.ScholarshipFlag='Y' then 'Yes' else 'No' end as ScholarshipFlagDesc,Houseno,HousenoP,Streetname,StreetnameP, " +
                    "Cityname,CitynameP,BasicMandal.MandalName,BasicMandal_1.MandalName as MandalNameP ,BasicDistricts.DistName,BasicDistricts_1.DistName as DistNameP, BasicState.StateName,BasicState_1.StateName as StateNameP, " +
                    "'" + ConfigurationManager.AppSettings["WebUrl"].ToString() + "' + StudentReg.PhotoPath AS PhotoPath, StudentReg.PhotoPath as PhotoPathDb,  '" + ConfigurationManager.AppSettings["WebUrl"].ToString() + "' + StudentReg.SignPath AS SignPath, StudentReg.SignPath AS SignPathDb,isnull(ltrim(StudentReg.PRNNo),'') as PRNNo, StudentReg.GradePoints,StudentReg.PhysDisbPer, BasicBoard.BoardName,BasicAcademicYear.AcdYrName ,BasicCourse.CourseName,BasicExam.ExmName  " +
                    "From StudentReg INNER JOIN BasicMotherTongue ON StudentReg.MothTID = BasicMotherTongue.MothTID " +
                    "LEFT OUTER JOIN BasicOccupation ON StudentReg.OcupID = BasicOccupation.OcupID " +
                    "LEFT OUTER JOIN BasicIncomeGroups ON StudentReg.IncGrpID = BasicIncomeGroups.IncGrpID " +
                    "LEFT OUTER JOIN BasicCaste ON StudentReg.CasteID = BasicCaste.CasteID " +
                    "LEFT OUTER JOIN BasicSubCaste ON StudentReg.SubCastID = BasicSubCaste.SubCastID " +
                    "LEFT OUTER JOIN BasicMainGroup ON StudentReg.MainGrpID = BasicMainGroup.MainGrpID " +
                    "LEFT OUTER JOIN BasicMedium ON StudentReg.MediumID = BasicMedium.MediumID " +
                    "LEFT OUTER JOIN BasicSubject ON StudentReg.SecondLangID = BasicSubject.SubjectID " +
                    "LEFT OUTER JOIN BasicCollege ON StudentReg.CollegeID = BasicCollege.CollegeID " +
                    "LEFT OUTER JOIN BasicDistricts ColBasicDistricts ON BasicCollege.DistrictID = ColBasicDistricts.DistrictID  " +
                    "LEFT OUTER JOIN BasicMandal ON StudentReg.MandalID = BasicMandal.MandalID " +
                    "LEFT OUTER JOIN BasicMandal BasicMandal_1 ON StudentReg.MandalIDP = BasicMandal_1.MandalID " +
                    "LEFT OUTER JOIN BasicDistricts ON StudentReg.DistrictID = BasicDistricts.DistrictID " +
                    "LEFT OUTER JOIN BasicDistricts BasicDistricts_1 ON StudentReg.DistrictIDP = BasicDistricts_1.DistrictID " +
                    "LEFT OUTER JOIN BasicState BasicState_1 ON StudentReg.StateIDP = BasicState_1.StateID " +
                    "LEFT OUTER JOIN BasicState BasicState ON StudentReg.StateID = BasicState.StateID " +
                    "LEFT OUTER JOIN BasicBoard ON  StudentReg.BoardID = BasicBoard.BoardID " +
                    "LEFT OUTER JOIN BasicAcademicYear ON  StudentReg.AcdYrID = BasicAcademicYear.AcdYrID " +
                    "LEFT OUTER JOIN BasicCourse ON  StudentReg.CourseID = BasicCourse.CourseID " +
                    "LEFT OUTER JOIN BasicExam ON  StudentReg.ExamID = BasicExam.ExamID " +
                    "Where (StudentReg.ActiveFlag =1) AND StudentReg.CollegeID = " + CollegeID + " and " +
                    "convert(date,StudentReg.AdmDate) >='" + FromDate + "' and convert(date,StudentReg.AdmDate) <'" + ToDate + "' ";
                if (CourseID > 0)
                {
                    StrQuery = StrQuery + " AND StudentReg.CourseID = " + CourseID + "";
                }
                if (ExamID > 0)
                {
                    StrQuery = StrQuery + " AND StudentReg.ExamID = " + ExamID + " ";
                }
                if (BranchID > 0)
                {
                    StrQuery = StrQuery + " AND StudentReg.BranchID = " + BranchID + " ";
                }
                if (FromAdmNo != 0)
                {
                    StrQuery = StrQuery + " AND StudentReg.AdmNo >= " + FromAdmNo + " ";
                }
                if (ToAdmNo != 0)
                {
                    StrQuery = StrQuery + " AND StudentReg.AdmNo <= " + ToAdmNo + " ";
                }
                return dbHandler.ReturnData(StrQuery);
            }
            catch (Exception ex)
            {
                
                dbHandler.SaveErorr("StudentReg", 0, ex.Message);
                throw ex;
            }
        }
        public DataTable GetStudentRegDetailsListForPhotoUpload(dbHandler dbHandler, int CollegeID, int CourseID, int ExamID, int BranchID, string WithPhoto = "", string ForAadhar = "")
        {
            try
            {
                string StrQuery = "";
                StrQuery = "SELECT StudentReg.StudRegID, StudentReg.SSCHallTicket,StudentReg.AdmNo,StudentReg.AdmDate,StudentReg.StudName,StudentReg.FatherName," +
                    "StudentReg.MotherName,StudentReg.Gender,StudentReg.Nationality,StudentReg.BirthDate,StudentReg.CommunityID,StudentReg.IdentiMarks," +
                    "StudentReg.MothTID,StudentReg.OcupID,StudentReg.CollegeID,StudentReg.CourseID,StudentReg.ExamID,StudentReg.BranchID,StudentReg.ParentCellno," +
                    "StudentReg.AcdYrID,StudentReg.AadharNo,StudentReg.MobileNo,StudentReg.Handicaped,StudentReg.PhysDisbID,StudentReg.SpclConsID," +
                    "StudentReg.Guardianname,StudentReg.RelwithGuardian,StudentReg.MediumID,StudentReg.MainGrpID,StudentReg.SecondLangID, " +
                    "StudentReg.AdmCategory,StudentReg.IncGrpID,StudentReg.ScholarshipFlag,StudentReg.RecgFeesFlag," +
                    "StudentReg.ExmFeesFlag,StudentReg.TCNO,StudentReg.Dateofwithdrawal,StudentReg.WdrwlID,StudentReg.Classwithdrawal," +
                    "StudentReg.PresentAddr,StudentReg.Houseno,StudentReg.Streetname,StudentReg.Cityname,StudentReg.MandalID,StudentReg.DistrictID,StudentReg.StateID,StudentReg.AadharAuthFlag,StudentReg.AadharRemark,BasicMandal.MandalName,BasicDistricts.DistName,BasicState.StateName," +
                    "StudentReg.PermanentAddr,StudentReg.HousenoP,StudentReg.StreetnameP,StudentReg.CitynameP,StudentReg.MandalIDP,StudentReg.DistrictIDP,StudentReg.AadharNo,StudentReg.MobileNo," +
                    "StudentReg.StateIDP,'" + ConfigurationManager.AppSettings["WebUrl"].ToString() + "' + StudentReg.PhotoPath AS PhotoPath,'" + ConfigurationManager.AppSettings["WebUrl"].ToString() + "' + StudentReg.SignPath AS SignPath,StudentReg.Eligible,StudentReg.Remark,StudentReg.ActiveFlag,StudentReg.CreLoginID," +
                    "StudentReg.CreDate,StudentReg.UpdLoginID,StudentReg.UpdDate, StudentReg.LstInstName, " +
                    "BasicCommunity.CommName,BasicMedium.MediumName,BasicSubject.SubName,BasicMainGroup.MainGrpName, " +
                    "replace(convert(varchar(11),StudentReg.BirthDate,106),' ','/') as BirthDateDesc, " +
                    "Case when StudentReg.Gender='F' then 'Female' Else 'Male' End As GenderDesc,  StudentReg.CasteID, StudentReg.SubCastID, " +
                    "BasicCourse.CourseName,BasicExam.ExmName,BasicBranch.BranchName,BasicCaste.CasteName,Case when StudentReg.Eligible='Y' then 'Yes' Else 'No' End EligibleDesc,cast(DatePart(Day,StudentReg.BirthDate) as varchar) + ',' + Datename(month,StudentReg.BirthDate)+ ',' + Datename(year,StudentReg.BirthDate) as DateOfBirthInWords, StudentReg.LateAppFlag, StudentReg.FeeAmount,StudentReg.EmailId,StudentReg.PassingYear,StudentReg.PassingMonth,StudentReg.IdentiMarks2,isnull(ltrim(StudentReg.PRNNo),'') as PRNNo, StudentReg.GradePoints,StudentReg.PhysDisbPer  " +
                    "FROM StudentReg " +
                    "LEFT OUTER JOIN BasicCommunity ON StudentReg.CommunityID = BasicCommunity.CommunityID " +
                    "LEFT OUTER JOIN BasicMedium ON StudentReg.MediumID = BasicMedium.MediumID " +
                    "LEFT OUTER JOIN BasicMainGroup ON StudentReg.MainGrpID = BasicMainGroup.MainGrpID " +
                    "LEFT OUTER JOIN BasicSubject ON StudentReg.SecondLangID = BasicSubject.SubjectID " +
                    "LEFT OUTER JOIN BasicCaste ON StudentReg.CasteID = BasicCaste.CasteID " +
                    "LEFT OUTER JOIN BasicSubCaste ON StudentReg.SubCastID = BasicSubCaste.SubCastID " +
                    "LEFT OUTER JOIN BasicCourse ON StudentReg.CourseID = BasicCourse.CourseID " +
                    "LEFT OUTER JOIN BasicExam ON StudentReg.ExamID = BasicExam.ExamID " +
                    "LEFT OUTER JOIN BasicBranch ON StudentReg.BranchID = BasicBranch.BranchID " +
                    "LEFT OUTER JOIN BasicMandal ON StudentReg.MandalID = BasicMandal.MandalID " +
                    "LEFT OUTER JOIN BasicDistricts ON StudentReg.DistrictID = BasicDistricts.DistrictID " +
                    "LEFT OUTER JOIN BasicState ON StudentReg.StateID = BasicState.StateID " +
                    "Where (StudentReg.ActiveFlag =1) AND ISNULL(Eligible,'N') ='N' AND ISNULL(StudentReg.PRNNo,'')='' and StudentReg.CollegeID = " + CollegeID;
                if (CourseID > 0)
                {
                    StrQuery = StrQuery + " AND StudentReg.CourseID = " + CourseID + " ";
                }
                if (ExamID > 0)
                {
                    StrQuery = StrQuery + " AND StudentReg.ExamID = " + ExamID + " ";
                }
                if (BranchID > 0)
                {
                    StrQuery = StrQuery + " AND StudentReg.BranchID = " + BranchID + " ";
                }
                if (WithPhoto == "Y")
                {
                    StrQuery = StrQuery + " AND (StudentReg.PhotoPath IS NOT NULL OR StudentReg.SignPath IS NOT NULL) and StudentReg.AadharNo is not null and StudentReg.CasteID is not null and StudentReg.MothTID is not null and StudentReg.OcupID is not null and StudentReg.IncGrpID is not null and StudentReg.ExamID is not null and StudentReg.MediumID is not null and StudentReg.MainGrpID is not null and StudentReg.Houseno is not null and StudentReg.Cityname is not null ";
                }
                else if (WithPhoto == "N")
                {
                    StrQuery = StrQuery + " AND (StudentReg.PhotoPath IS NULL OR StudentReg.SignPath IS NULL) and StudentReg.AadharNo is not null and StudentReg.CasteID is not null and StudentReg.MothTID is not null and StudentReg.OcupID is not null and StudentReg.IncGrpID is not null and StudentReg.ExamID is not null and StudentReg.MediumID is not null and StudentReg.MainGrpID is not null and StudentReg.Houseno is not null and StudentReg.Cityname is not null ";
                }
                if (ForAadhar == "Y")
                {
                    StrQuery = StrQuery + " AND isnull(SSCCertFlag,'N') ='Y' and isnull(StudyCertFlag,'N') ='Y' and isnull(TCCertFlag,'N') ='Y' and StudentReg.PhotoPath IS NOT NULL and StudentReg.SignPath IS NOT NULL and isnull(StudentReg.AadharNo,'') !='' and StudentReg.AadharAuthDate IS NULL ";
                }
                else
                {
                    StrQuery = StrQuery + " AND isnull(BlindCondAprovalFlag,'N') = case when StudentReg.PhysDisbID=2 then 'Y' else 'N' end";
                }
                return dbHandler.ReturnData(StrQuery);
            }
            catch (Exception ex)
            {
                
                dbHandler.SaveErorr("StudentReg", 0, ex.Message);
                throw ex;
            }
        }





        public DataTable GetFillStudentRegDetailsListForUpdateCertificates(dbHandler dbHandler, int CollegeID, int CourseID, int ExamID, int BranchID, string WithCertificates = "Y")
        {
            try
            {
                string StrQuery = "";
                StrQuery = "SELECT StudentReg.StudRegID, StudentReg.SSCHallTicket,StudentReg.AdmNo,StudentReg.AdmDate,StudentReg.StudName,StudentReg.FatherName," +
                    "StudentReg.MotherName,StudentReg.Gender,StudentReg.Nationality,StudentReg.BirthDate,StudentReg.CommunityID,StudentReg.IdentiMarks," +
                    "StudentReg.MothTID,StudentReg.OcupID,StudentReg.CollegeID,StudentReg.CourseID,StudentReg.ExamID,StudentReg.BranchID,StudentReg.ParentCellno," +
                    "StudentReg.AcdYrID,StudentReg.AadharNo,StudentReg.MobileNo,StudentReg.Handicaped,StudentReg.PhysDisbID,StudentReg.SpclConsID," +
                    "StudentReg.Guardianname,StudentReg.RelwithGuardian,StudentReg.MediumID,StudentReg.MainGrpID,StudentReg.SecondLangID, " +
                    "StudentReg.AdmCategory,StudentReg.IncGrpID,StudentReg.ScholarshipFlag,StudentReg.RecgFeesFlag," +
                    "StudentReg.ExmFeesFlag,StudentReg.TCNO,StudentReg.Dateofwithdrawal,StudentReg.WdrwlID,StudentReg.Classwithdrawal," +
                    "StudentReg.PresentAddr,StudentReg.Houseno,StudentReg.Streetname,StudentReg.Cityname,StudentReg.MandalID,StudentReg.DistrictID,StudentReg.StateID," +
                    "StudentReg.PermanentAddr,StudentReg.HousenoP,StudentReg.StreetnameP,StudentReg.CitynameP,StudentReg.MandalIDP,StudentReg.DistrictIDP,StudentReg.AadharNo,StudentReg.MobileNo," +
                    "StudentReg.StateIDP,'" + ConfigurationManager.AppSettings["WebUrl"].ToString() + "' + StudentReg.PhotoPath AS PhotoPath,'" + ConfigurationManager.AppSettings["WebUrl"].ToString() + "' + StudentReg.SignPath AS SignPath,StudentReg.Eligible,StudentReg.Remark,StudentReg.ActiveFlag,StudentReg.CreLoginID," +
                    "StudentReg.CreDate,StudentReg.UpdLoginID,StudentReg.UpdDate, StudentReg.LstInstName, " +
                    "BasicCommunity.CommName,BasicMedium.MediumName,BasicSubject.SubName,BasicMainGroup.MainGrpName,  " +
                    "replace(convert(varchar(11),StudentReg.BirthDate,106),' ','/') as BirthDateDesc, " +
                    "Case when StudentReg.Gender='F' then 'Female' Else 'Male' End As GenderDesc,  StudentReg.CasteID, StudentReg.SubCastID, " +
                    "BasicCourse.CourseName,BasicExam.ExmName,BasicBranch.BranchName,BasicCaste.CasteName,Case when StudentReg.Eligible='Y' then 'Yes' Else 'No' End EligibleDesc,cast(DatePart(Day,StudentReg.BirthDate) as varchar) + ',' + Datename(month,StudentReg.BirthDate)+ ',' + Datename(year,StudentReg.BirthDate) as DateOfBirthInWords, StudentReg.LateAppFlag, StudentReg.FeeAmount,StudentReg.EmailId,StudentReg.PassingYear,StudentReg.PassingMonth,StudentReg.IdentiMarks2,isnull(ltrim(StudentReg.PRNNo),'') as PRNNo, StudentReg.GradePoints,StudentReg.PhysDisbPer  " +
                    "FROM StudentReg " +
                    "LEFT OUTER JOIN BasicCommunity ON StudentReg.CommunityID = BasicCommunity.CommunityID " +
                    "LEFT OUTER JOIN BasicMedium ON StudentReg.MediumID = BasicMedium.MediumID " +
                    "LEFT OUTER JOIN BasicMainGroup ON StudentReg.MainGrpID = BasicMainGroup.MainGrpID " +
                    "LEFT OUTER JOIN BasicSubject ON StudentReg.SecondLangID = BasicSubject.SubjectID " +
                    "LEFT OUTER JOIN BasicCaste ON StudentReg.CasteID = BasicCaste.CasteID " +
                    "LEFT OUTER JOIN BasicSubCaste ON StudentReg.SubCastID = BasicSubCaste.SubCastID " +
                    "LEFT OUTER JOIN BasicCourse ON StudentReg.CourseID = BasicCourse.CourseID " +
                    "LEFT OUTER JOIN BasicExam ON StudentReg.ExamID = BasicExam.ExamID " +
                    "LEFT OUTER JOIN BasicBranch ON StudentReg.BranchID = BasicBranch.BranchID " +
                    "Where (StudentReg.ActiveFlag =1) AND ISNULL(Eligible,'N') ='N' AND ISNULL(StudentReg.PRNNo,'')='' " +
                    "AND (StudentReg.PhotoPath IS NOT NULL And StudentReg.SignPath IS NOT NULL) and StudentReg.AadharNo is not null and StudentReg.CasteID is not null and StudentReg.MothTID is not null and StudentReg.OcupID is not null and StudentReg.IncGrpID is not null and StudentReg.ExamID is not null and StudentReg.MediumID is not null and StudentReg.MainGrpID is not null and StudentReg.Houseno is not null and StudentReg.Cityname is not null " +
                    "and DistrictIDP is not null and DistrictID is not null " +
                    "and StudentReg.CollegeID = " + CollegeID;
                if (CourseID > 0)
                {
                    StrQuery = StrQuery + " AND StudentReg.CourseID = " + CourseID + " ";
                }
                if (ExamID > 0)
                {
                    StrQuery = StrQuery + " AND StudentReg.ExamID = " + ExamID + " ";
                }
                if (BranchID > 0)
                {
                    StrQuery = StrQuery + " AND StudentReg.BranchID = " + BranchID + " ";
                }
                if (WithCertificates == "N")
                {
                    StrQuery = StrQuery + " and (StudentReg.SSCCertFlag is null) "; //OR (StudentReg.StudyCertFlag is null) OR (StudentReg.TCCertFlag is null )
                }
                else
                {
                    StrQuery = StrQuery + " and (StudentReg.SSCCertFlag is not null)"; // OR (StudentReg.StudyCertFlag is not null) OR (StudentReg.TCCertFlag is not null )
                }
                return dbHandler.ReturnData(StrQuery);
            }
            catch (Exception ex)
            {
                
                dbHandler.SaveErorr("StudentReg", 0, ex.Message);
                throw ex;
            }
        }


        public DataTable GetFillStudentRegDetailsListForGroupChange(dbHandler dbHandler, int CollegeID, int CourseID, int ExamID, int BranchID)
        {
            try
            {
                string StrQuery = "";
                StrQuery = "SELECT StudentReg.StudRegID, StudentReg.SSCHallTicket,StudentReg.AdmNo,StudentReg.AdmDate,StudentReg.StudName,StudentReg.FatherName," +
                    "StudentReg.MotherName,StudentReg.Gender,StudentReg.Nationality,StudentReg.BirthDate,StudentReg.CommunityID,StudentReg.IdentiMarks," +
                    "StudentReg.MothTID,StudentReg.OcupID,StudentReg.CollegeID,StudentReg.CourseID,StudentReg.ExamID,StudentReg.BranchID,StudentReg.ParentCellno," +
                    "StudentReg.AcdYrID,StudentReg.AadharNo,StudentReg.MobileNo,StudentReg.Handicaped,StudentReg.PhysDisbID,StudentReg.SpclConsID," +
                    "StudentReg.Guardianname,StudentReg.RelwithGuardian,StudentReg.MediumID,StudentReg.MainGrpID,StudentReg.SecondLangID, " +
                    "StudentReg.AdmCategory,StudentReg.IncGrpID,StudentReg.ScholarshipFlag,StudentReg.RecgFeesFlag," +
                    "StudentReg.ExmFeesFlag,StudentReg.TCNO,StudentReg.Dateofwithdrawal,StudentReg.WdrwlID,StudentReg.Classwithdrawal," +
                    "StudentReg.PresentAddr,StudentReg.Houseno,StudentReg.Streetname,StudentReg.Cityname,StudentReg.MandalID,StudentReg.DistrictID,StudentReg.StateID," +
                    "StudentReg.PermanentAddr,StudentReg.HousenoP,StudentReg.StreetnameP,StudentReg.CitynameP,StudentReg.MandalIDP,StudentReg.DistrictIDP,StudentReg.AadharNo,StudentReg.MobileNo," +
                    "StudentReg.StateIDP,'" + ConfigurationManager.AppSettings["WebUrl"].ToString() + "' + StudentReg.PhotoPath AS PhotoPath,'" + ConfigurationManager.AppSettings["WebUrl"].ToString() + "' + StudentReg.SignPath AS SignPath,StudentReg.Eligible,StudentReg.Remark,StudentReg.ActiveFlag,StudentReg.CreLoginID," +
                    "StudentReg.CreDate,StudentReg.UpdLoginID,StudentReg.UpdDate, StudentReg.LstInstName, " +
                    "BasicCommunity.CommName,BasicMedium.MediumName,BasicSubject.SubName, BasicMainGroup.MainGrpName, " +
                    "replace(convert(varchar(11),StudentReg.BirthDate,106),' ','/') as BirthDateDesc, " +
                    "Case when StudentReg.Gender='F' then 'Female' Else 'Male' End As GenderDesc,  StudentReg.CasteID, StudentReg.SubCastID, " +
                    "BasicCourse.CourseName,BasicExam.ExmName,BasicBranch.BranchName,BasicCaste.CasteName,Case when StudentReg.Eligible='Y' then 'Yes' Else 'No' End EligibleDesc,cast(DatePart(Day,StudentReg.BirthDate) as varchar) + ',' + Datename(month,StudentReg.BirthDate)+ ',' + Datename(year,StudentReg.BirthDate) as DateOfBirthInWords, StudentReg.LateAppFlag, StudentReg.FeeAmount,StudentReg.EmailId,StudentReg.PassingYear,StudentReg.PassingMonth,StudentReg.IdentiMarks2,isnull(ltrim(StudentReg.PRNNo),'') as PRNNo, StudentReg.GradePoints,StudentReg.PhysDisbPer  " +
                    "FROM StudentReg " +
                    "LEFT OUTER JOIN BasicCommunity ON StudentReg.CommunityID = BasicCommunity.CommunityID " +
                    "LEFT OUTER JOIN BasicMedium ON StudentReg.MediumID = BasicMedium.MediumID " +
                    "LEFT OUTER JOIN BasicSubject ON StudentReg.SecondLangID = BasicSubject.SubjectID " +
                    "LEFT OUTER JOIN BasicMainGroup ON StudentReg.MainGrpID = BasicMainGroup.MainGrpID " +
                    "LEFT OUTER JOIN BasicCaste ON StudentReg.CasteID = BasicCaste.CasteID " +
                    "LEFT OUTER JOIN BasicSubCaste ON StudentReg.SubCastID = BasicSubCaste.SubCastID " +
                    "LEFT OUTER JOIN BasicCourse ON StudentReg.CourseID = BasicCourse.CourseID " +
                    "LEFT OUTER JOIN BasicExam ON StudentReg.ExamID = BasicExam.ExamID " +
                    "LEFT OUTER JOIN BasicBranch ON StudentReg.BranchID = BasicBranch.BranchID " +
                    "Where (StudentReg.ActiveFlag =1) AND ISNULL(PRNNo,'') = '' and isnull(BatchNo,0)=0 " +
                    "AND (StudentReg.PhotoPath IS NOT NULL And StudentReg.SignPath IS NOT NULL) and StudentReg.CasteID is not null and StudentReg.MothTID is not null and StudentReg.OcupID is not null and StudentReg.IncGrpID is not null and StudentReg.ExamID is not null and StudentReg.MediumID is not null and StudentReg.MainGrpID is not null and StudentReg.Houseno is not null and StudentReg.Cityname is not null " +
                    //"StudentReg.AadharNo is not null and isnull(SSCCertFlag,'N') ='Y' and isnull(StudyCertFlag,'N') ='Y' and isnull(TCCertFlag,'N') ='Y' " +
                    "and StudentReg.CollegeID = " + CollegeID;
                if (CourseID > 0)
                {
                    StrQuery = StrQuery + " AND StudentReg.CourseID = " + CourseID + " ";
                }
                if (ExamID > 0)
                {
                    StrQuery = StrQuery + " AND StudentReg.ExamID = " + ExamID + " ";
                }
                if (BranchID > 0)
                {
                    StrQuery = StrQuery + " AND StudentReg.BranchID = " + BranchID + " ";
                }
                return dbHandler.ReturnData(StrQuery);
            }
            catch (Exception ex)
            {
                
                dbHandler.SaveErorr("StudentReg", 0, ex.Message);
                throw ex;
            }
        }
        public DataTable GetBlindCondAprovalList(dbHandler dbHandler, int CollegeID, int CourseID, int ExamID, int BranchID)
        {
            try
            {
                string StrQuery = "";
                StrQuery = "SELECT StudentReg.StudRegID, StudentReg.SSCHallTicket,StudentReg.AdmNo,StudentReg.AdmDate,StudentReg.StudName,StudentReg.FatherName," +
                    "StudentReg.MotherName,StudentReg.Gender,StudentReg.Nationality,StudentReg.BirthDate,StudentReg.CommunityID,StudentReg.IdentiMarks," +
                    "StudentReg.MothTID,StudentReg.OcupID,StudentReg.CollegeID,StudentReg.CourseID,StudentReg.ExamID,StudentReg.BranchID,StudentReg.ParentCellno," +
                    "StudentReg.AcdYrID,StudentReg.AadharNo,StudentReg.MobileNo,StudentReg.Handicaped,StudentReg.PhysDisbID,StudentReg.SpclConsID," +
                    "StudentReg.Guardianname,StudentReg.RelwithGuardian,StudentReg.MediumID,StudentReg.MainGrpID,StudentReg.SecondLangID, " +
                    "StudentReg.AdmCategory,StudentReg.IncGrpID,StudentReg.ScholarshipFlag,StudentReg.RecgFeesFlag," +
                    "StudentReg.ExmFeesFlag,StudentReg.TCNO,StudentReg.Dateofwithdrawal,StudentReg.WdrwlID,StudentReg.Classwithdrawal," +
                    "StudentReg.PresentAddr,StudentReg.Houseno,StudentReg.Streetname,StudentReg.Cityname,StudentReg.MandalID,StudentReg.DistrictID,StudentReg.StateID," +
                    "StudentReg.PermanentAddr,StudentReg.HousenoP,StudentReg.StreetnameP,StudentReg.CitynameP,StudentReg.MandalIDP,StudentReg.DistrictIDP,StudentReg.AadharNo,StudentReg.MobileNo," +
                    "StudentReg.StateIDP,'" + ConfigurationManager.AppSettings["WebUrl"].ToString() + "' + StudentReg.PhotoPath AS PhotoPath,'" + ConfigurationManager.AppSettings["WebUrl"].ToString() + "' + StudentReg.SignPath AS SignPath,StudentReg.Eligible,StudentReg.Remark,StudentReg.ActiveFlag,StudentReg.CreLoginID," +
                    "StudentReg.CreDate,StudentReg.UpdLoginID,StudentReg.UpdDate, StudentReg.LstInstName, " +
                    "BasicCommunity.CommName,BasicMainGroup.MainGrpName,BasicMedium.MediumName,BasicSubject.SubName, " +
                    "replace(convert(varchar(11),StudentReg.BirthDate,106),' ','/') as BirthDateDesc, " +
                    "Case when StudentReg.Gender='F' then 'Female' Else 'Male' End As GenderDesc,  StudentReg.CasteID, StudentReg.SubCastID, " +
                    "BasicCourse.CourseName,BasicExam.ExmName,BasicBranch.BranchName,BasicCaste.CasteName,Case when StudentReg.Eligible='Y' then 'Yes' Else 'No' End EligibleDesc,cast(DatePart(Day,StudentReg.BirthDate) as varchar) + ',' + Datename(month,StudentReg.BirthDate)+ ',' + Datename(year,StudentReg.BirthDate) as DateOfBirthInWords, StudentReg.LateAppFlag, StudentReg.FeeAmount,StudentReg.EmailId,StudentReg.PassingYear,StudentReg.PassingMonth,StudentReg.IdentiMarks2,isnull(ltrim(StudentReg.PRNNo),'') as PRNNo, StudentReg.GradePoints,StudentReg.PhysDisbPer  " +
                    "FROM StudentReg " +
                    "LEFT OUTER JOIN BasicCommunity ON StudentReg.CommunityID = BasicCommunity.CommunityID " +
                    "LEFT OUTER JOIN BasicMedium ON StudentReg.MediumID = BasicMedium.MediumID " +
                    "LEFT OUTER JOIN BasicMainGroup ON StudentReg.MainGrpID = BasicMainGroup.MainGrpID " +
                    "LEFT OUTER JOIN BasicSubject ON StudentReg.SecondLangID = BasicSubject.SubjectID " +
                    "LEFT OUTER JOIN BasicCaste ON StudentReg.CasteID = BasicCaste.CasteID " +
                    "LEFT OUTER JOIN BasicSubCaste ON StudentReg.SubCastID = BasicSubCaste.SubCastID " +
                    "LEFT OUTER JOIN BasicCourse ON StudentReg.CourseID = BasicCourse.CourseID " +
                    "LEFT OUTER JOIN BasicExam ON StudentReg.ExamID = BasicExam.ExamID " +
                    "LEFT OUTER JOIN BasicBranch ON StudentReg.BranchID = BasicBranch.BranchID " +
                    "Where (StudentReg.ActiveFlag =1) AND PhysDisbID = 2 and isnull(BlindCondAprovalFlag,'N') = 'N' and StudentReg.MainGrpID is not null and StudentReg.MediumID is not null and StudentReg.MothTID is not null " +
                    "and isnull(Houseno,'') !='' and ISNULL(PRNNo,'') = '' and isnull(BatchNo,0)=0 " +
                    "AND (StudentReg.PhotoPath IS NULL And StudentReg.SignPath IS NULL) " +
                    "and StudentReg.CollegeID = " + CollegeID;
                if (CourseID > 0)
                {
                    StrQuery = StrQuery + " AND StudentReg.CourseID = " + CourseID + " ";
                }
                if (ExamID > 0)
                {
                    StrQuery = StrQuery + " AND StudentReg.ExamID = " + ExamID + " ";
                }
                if (BranchID > 0)
                {
                    StrQuery = StrQuery + " AND StudentReg.BranchID = " + BranchID + " ";
                }
                return dbHandler.ReturnData(StrQuery);
            }
            catch (Exception ex)
            {
                
                dbHandler.SaveErorr("StudentReg", 0, ex.Message);
                throw ex;
            }
        }


        public DataTable GetStudentRegListByCourseExamBranchForApproval(dbHandler dbHandler, int CollegeID, int CourseID, int ExamID, int BranchID)
        {
            try
            {
                string StrQuery = "";
                StrQuery = "SELECT StudentReg.StudRegID, StudentReg.SSCHallTicket,StudentReg.AdmNo,StudentReg.AdmDate,StudentReg.StudName,StudentReg.FatherName," +
                    "StudentReg.MotherName,StudentReg.Gender,StudentReg.Nationality,StudentReg.BirthDate,StudentReg.CommunityID,StudentReg.IdentiMarks," +
                    "StudentReg.MothTID,StudentReg.OcupID,StudentReg.CollegeID,StudentReg.CourseID,StudentReg.ExamID,StudentReg.BranchID,StudentReg.ParentCellno," +
                    "StudentReg.AcdYrID,StudentReg.AadharNo,StudentReg.MobileNo,StudentReg.Handicaped,StudentReg.PhysDisbID,StudentReg.SpclConsID," +
                    "StudentReg.Guardianname,StudentReg.RelwithGuardian,StudentReg.MediumID,StudentReg.MainGrpID,StudentReg.SecondLangID, " +
                    "StudentReg.AdmCategory,StudentReg.IncGrpID,StudentReg.ScholarshipFlag,StudentReg.RecgFeesFlag," +
                    "StudentReg.ExmFeesFlag,StudentReg.TCNO,StudentReg.Dateofwithdrawal,StudentReg.WdrwlID,StudentReg.Classwithdrawal," +
                    "StudentReg.PresentAddr,StudentReg.Houseno,StudentReg.Streetname,StudentReg.Cityname,StudentReg.MandalID,StudentReg.DistrictID,StudentReg.StateID," +
                    "StudentReg.PermanentAddr,StudentReg.HousenoP,StudentReg.StreetnameP,StudentReg.CitynameP,StudentReg.MandalIDP,StudentReg.DistrictIDP,StudentReg.AadharNo,StudentReg.MobileNo, " +
                    "StudentReg.StateIDP,'" + ConfigurationManager.AppSettings["WebUrl"].ToString() + "' + StudentReg.PhotoPath AS PhotoPath,'" + ConfigurationManager.AppSettings["WebUrl"].ToString() + "' + StudentReg.SignPath AS SignPath,StudentReg.Eligible,StudentReg.Remark,StudentReg.ActiveFlag,StudentReg.CreLoginID," +
                    "StudentReg.CreDate,StudentReg.UpdLoginID,StudentReg.UpdDate, StudentReg.LstInstName, " +
                    "BasicCommunity.CommName,BasicMedium.MediumName,BasicSubject.SubName,BasicMainGroup.MainGrpName, " +
                    "replace(convert(varchar(11),StudentReg.BirthDate,106),' ','/') as BirthDateDesc, " +
                    "Case when StudentReg.Gender='F' then 'Female' Else 'Male' End As GenderDesc,  StudentReg.CasteID, StudentReg.SubCastID , StudentReg.LateAppFlag, StudentReg.FeeAmount ,StudentReg.EmailId ,StudentReg.PassingYear,StudentReg.PassingMonth,StudentReg.IdentiMarks2,isnull(ltrim(StudentReg.PRNNo),'') as PRNNo, StudentReg.GradePoints  " +
                    "FROM StudentReg " +
                    "LEFT OUTER JOIN BasicCommunity ON StudentReg.CommunityID = BasicCommunity.CommunityID " +
                    "LEFT OUTER JOIN BasicMedium ON StudentReg.MediumID = BasicMedium.MediumID " +
                    "LEFT OUTER JOIN BasicSubject ON StudentReg.SecondLangID = BasicSubject.SubjectID " +
                    "LEFT OUTER JOIN BasicMainGroup ON StudentReg.MainGrpID = BasicMainGroup.MainGrpID " +
                    "LEFT OUTER JOIN BasicCaste ON StudentReg.CasteID = BasicCaste.CasteID " +
                    "LEFT OUTER JOIN BasicSubCaste ON StudentReg.SubCastID = BasicSubCaste.SubCastID " +
                    "Where (StudentReg.ActiveFlag =1) AND StudentReg.PhotoPath IS NOT NULL AND ISNULL(Eligible,'N') ='N' And StudentReg.CollegeID = " + CollegeID;
                if (CourseID > 0)
                {
                    StrQuery = StrQuery + " AND StudentReg.CourseID = " + CourseID + " ";
                }
                if (ExamID > 0)
                {
                    StrQuery = StrQuery + " AND StudentReg.ExamID = " + ExamID + " ";
                }
                if (BranchID > 0)
                {
                    StrQuery = StrQuery + " AND StudentReg.BranchID = " + BranchID + " ";
                }


                return dbHandler.ReturnData(StrQuery);
            }
            catch (Exception ex)
            {
                
                dbHandler.SaveErorr("StudentReg", 0, ex.Message);
                throw ex;
            }
        }
        public DataTable GetStudentListForRecognationFeePaid(dbHandler dbHandler, int CollegeID, int CourseID, int ExamID, int BranchID)
        {
            try
            {
                string StrQuery = "";
                StrQuery = "SELECT StudentReg.StudRegID, StudentReg.SSCHallTicket,StudentReg.AdmNo,StudentReg.AdmDate,StudentReg.StudName,StudentReg.FatherName," +
                    "StudentReg.MotherName,StudentReg.Gender,StudentReg.Nationality,StudentReg.BirthDate,StudentReg.CommunityID,StudentReg.IdentiMarks," +
                    "StudentReg.MothTID,StudentReg.OcupID,StudentReg.CollegeID,StudentReg.CourseID,StudentReg.ExamID,StudentReg.BranchID,StudentReg.ParentCellno," +
                    "StudentReg.AcdYrID,StudentReg.AadharNo,StudentReg.MobileNo,StudentReg.Handicaped,StudentReg.PhysDisbID,StudentReg.SpclConsID," +
                    "StudentReg.Guardianname,StudentReg.RelwithGuardian,StudentReg.MediumID,StudentReg.MainGrpID,StudentReg.SecondLangID, " +
                    "StudentReg.AdmCategory,StudentReg.IncGrpID,StudentReg.ScholarshipFlag,StudentReg.RecgFeesFlag," +
                    "StudentReg.ExmFeesFlag,StudentReg.TCNO,StudentReg.Dateofwithdrawal,StudentReg.WdrwlID,StudentReg.Classwithdrawal," +
                    "StudentReg.PresentAddr,StudentReg.Houseno,StudentReg.Streetname,StudentReg.Cityname,StudentReg.MandalID,StudentReg.DistrictID,StudentReg.StateID," +
                    "StudentReg.PermanentAddr,StudentReg.HousenoP,StudentReg.StreetnameP,StudentReg.CitynameP,StudentReg.MandalIDP,StudentReg.DistrictIDP,StudentReg.AadharNo,StudentReg.MobileNo," +
                    "StudentReg.StateIDP,'" + ConfigurationManager.AppSettings["WebUrl"].ToString() + "' + StudentReg.PhotoPath AS PhotoPath,'" + ConfigurationManager.AppSettings["WebUrl"].ToString() + "' + StudentReg.SignPath AS SignPath,StudentReg.Eligible,StudentReg.Remark,StudentReg.ActiveFlag,StudentReg.CreLoginID," +
                    "StudentReg.CreDate,StudentReg.UpdLoginID,StudentReg.UpdDate, StudentReg.LstInstName, " +
                    "BasicCommunity.CommName,BasicMedium.MediumName,BasicSubject.SubName,BasicMainGroup.MainGrpName, " +
                    "replace(convert(varchar(11),StudentReg.BirthDate,106),' ','/') as BirthDateDesc, " +
                    "Case when StudentReg.Gender='F' then 'Female' Else 'Male' End As GenderDesc,  StudentReg.CasteID, StudentReg.SubCastID , StudentReg.LateAppFlag, '" + ConfigurationManager.AppSettings["FeeAmount"].ToString() + "' as FeeAmount ,StudentReg.EmailId,StudentReg.PassingYear,StudentReg.PassingMonth,StudentReg.IdentiMarks2,isnull(ltrim(StudentReg.PRNNo),'') as PRNNo, StudentReg.GradePoints  " +
                    "FROM StudentReg " +
                    "LEFT OUTER JOIN BasicCommunity ON StudentReg.CommunityID = BasicCommunity.CommunityID " +
                    "LEFT OUTER JOIN BasicMedium ON StudentReg.MediumID = BasicMedium.MediumID " +
                    "LEFT OUTER JOIN BasicSubject ON StudentReg.SecondLangID = BasicSubject.SubjectID " +
                    "LEFT OUTER JOIN BasicMainGroup ON StudentReg.MainGrpID = BasicMainGroup.MainGrpID " +
                    "LEFT OUTER JOIN BasicCaste ON StudentReg.CasteID = BasicCaste.CasteID " +
                    "LEFT OUTER JOIN BasicSubCaste ON StudentReg.SubCastID = BasicSubCaste.SubCastID " +
                    "Where (StudentReg.ActiveFlag =1) AND isnull(BatchNo,0) = 0 and StudentReg.PhotoPath IS NOT NULL and StudentReg.SignPath IS NOT NULL and " +
                    "ISNULL(StudentReg.RecgFeesFlag,'N') ='Y' AND isnull(SSCCertFlag,'N') ='Y' and isnull(StudyCertFlag,'N') ='Y' and isnull(TCCertFlag,'N') ='Y' AND (ISNULL(StudentReg.MainGrpID,0) <> 0)   " +
                    " AND (ISNULL(StudentReg.MothTID,0) <> 0) AND (ISNULL(StudentReg.OcupID,0) <> 0) and (ISNULL(StudentReg.TransactionID,'0') = '0')  And StudentReg.CollegeID = " + CollegeID;
                if (CourseID > 0)
                {
                    StrQuery = StrQuery + " AND StudentReg.CourseID = " + CourseID + " ";
                }
                if (ExamID > 0)
                {
                    StrQuery = StrQuery + " AND StudentReg.ExamID = " + ExamID + " ";
                }
                if (BranchID > 0)
                {
                    StrQuery = StrQuery + " AND StudentReg.BranchID = " + BranchID + " ";
                }


                return dbHandler.ReturnData(StrQuery);
            }
            catch (Exception ex)
            {
                
                dbHandler.SaveErorr("StudentReg", 0, ex.Message);
                throw ex;
            }
        }

        public DataTable GetStudentListForManageStudents(dbHandler dbHandler, int CollegeID)
        {
            try
            {
                string StrQuery = "";
                StrQuery = "SELECT ISNULL(StudentReg.TCCertFlag,'N'),StudentReg.StudRegID, StudentReg.SSCHallTicket,StudentReg.AdmNo,StudentReg.AdmDate,StudentReg.StudName,StudentReg.FatherName," +
                    "StudentReg.MotherName,StudentReg.Gender,StudentReg.Nationality,StudentReg.BirthDate,StudentReg.CommunityID,StudentReg.IdentiMarks," +
                    "StudentReg.MothTID,StudentReg.OcupID,StudentReg.CollegeID,StudentReg.CourseID,StudentReg.ExamID,StudentReg.BranchID,StudentReg.ParentCellno," +
                    "StudentReg.AcdYrID,StudentReg.AadharNo,StudentReg.MobileNo,StudentReg.Handicaped,StudentReg.PhysDisbID,StudentReg.SpclConsID," +
                    "StudentReg.Guardianname,StudentReg.RelwithGuardian,StudentReg.MediumID,StudentReg.MainGrpID,StudentReg.SecondLangID, " +
                    "StudentReg.AdmCategory,StudentReg.IncGrpID,StudentReg.ScholarshipFlag,StudentReg.RecgFeesFlag," +
                    "StudentReg.ExmFeesFlag,StudentReg.TCNO,StudentReg.Dateofwithdrawal,StudentReg.WdrwlID,StudentReg.Classwithdrawal," +
                    "StudentReg.PresentAddr,StudentReg.Houseno,StudentReg.Streetname,StudentReg.Cityname,StudentReg.MandalID,StudentReg.DistrictID,StudentReg.StateID," +
                    "StudentReg.PermanentAddr,StudentReg.HousenoP,StudentReg.StreetnameP,StudentReg.CitynameP,StudentReg.MandalIDP,StudentReg.DistrictIDP,StudentReg.AadharNo,StudentReg.MobileNo," +
                    "StudentReg.StateIDP,'" + ConfigurationManager.AppSettings["WebUrl"].ToString() + "' + StudentReg.PhotoPath AS PhotoPath,'" + ConfigurationManager.AppSettings["WebUrl"].ToString() + "' + StudentReg.SignPath AS SignPath,StudentReg.Eligible,StudentReg.Remark,StudentReg.ActiveFlag,StudentReg.CreLoginID," +
                    "StudentReg.CreDate,StudentReg.UpdLoginID,StudentReg.UpdDate, StudentReg.LstInstName, " +
                    "BasicCommunity.CommName,BasicMedium.MediumName,BasicSubject.SubName,BasicMainGroup.MainGrpName, " +
                    "replace(convert(varchar(11),StudentReg.BirthDate,106),' ','/') as BirthDateDesc, " +
                    "Case when StudentReg.Gender='F' then 'Female' Else 'Male' End As GenderDesc,  StudentReg.CasteID, StudentReg.SubCastID , StudentReg.LateAppFlag, '" + ConfigurationManager.AppSettings["FeeAmount"].ToString() + "' as FeeAmount ,StudentReg.EmailId,StudentReg.PassingYear,StudentReg.PassingMonth,StudentReg.IdentiMarks2,isnull(ltrim(StudentReg.PRNNo),'') as PRNNo, StudentReg.GradePoints  " +
                    "FROM StudentReg " +
                    "LEFT OUTER JOIN BasicCommunity ON StudentReg.CommunityID = BasicCommunity.CommunityID " +
                    "LEFT OUTER JOIN BasicMedium ON StudentReg.MediumID = BasicMedium.MediumID " +
                    "LEFT OUTER JOIN BasicSubject ON StudentReg.SecondLangID = BasicSubject.SubjectID " +
                    "LEFT OUTER JOIN BasicMainGroup ON StudentReg.MainGrpID = BasicMainGroup.MainGrpID " +
                    "LEFT OUTER JOIN BasicCaste ON StudentReg.CasteID = BasicCaste.CasteID " +
                    "LEFT OUTER JOIN BasicSubCaste ON StudentReg.SubCastID = BasicSubCaste.SubCastID " +
                    "Where ISNULL(StudentReg.TCCertFlag,'N') !='Y' and StudentReg.CollegeID = " + CollegeID;
                //"Where (StudentReg.ActiveFlag =1) AND isnull(BatchNo,0) = 0 and StudentReg.PhotoPath IS NOT NULL and StudentReg.SignPath IS NOT NULL and " +
                //"ISNULL(StudentReg.RecgFeesFlag,'N') ='Y' AND isnull(SSCCertFlag,'N') ='Y' and isnull(StudyCertFlag,'N') ='Y' and isnull(TCCertFlag,'N') ='Y' AND (ISNULL(StudentReg.MainGrpID,0) <> 0)   " +
                //" AND (ISNULL(StudentReg.MothTID,0) <> 0) AND (ISNULL(StudentReg.OcupID,0) <> 0)  And StudentReg.CollegeID = " + CollegeID;

                return dbHandler.ReturnData(StrQuery);
            }
            catch (Exception ex)
            {
                
                dbHandler.SaveErorr("StudentReg", 0, ex.Message);
                throw ex;
            }
        }

        public DataTable GetStudRegStatusForReport(dbHandler dbHandler, int CollegeID, int CourseID, int BranchID, string ReportType)
        {
            try
            {
                string StrQuery = "";
                StrQuery = "SELECT StudentReg.StudRegID, StudentReg.SSCHallTicket,StudentReg.AdmNo,StudentReg.AdmDate,StudentReg.StudName,StudentReg.FatherName," +
                    "StudentReg.MotherName,StudentReg.Gender,StudentReg.Nationality,StudentReg.BirthDate,StudentReg.CommunityID,StudentReg.IdentiMarks," +
                    "StudentReg.MothTID,StudentReg.OcupID,StudentReg.CollegeID,StudentReg.CourseID,StudentReg.ExamID,StudentReg.BranchID,StudentReg.ParentCellno," +
                    "StudentReg.AcdYrID,StudentReg.AadharNo,StudentReg.MobileNo,StudentReg.Handicaped,StudentReg.PhysDisbID,StudentReg.SpclConsID," +
                    "StudentReg.Guardianname,StudentReg.RelwithGuardian,StudentReg.MediumID,StudentReg.MainGrpID,StudentReg.SecondLangID, " +
                    "StudentReg.AdmCategory,StudentReg.IncGrpID,StudentReg.ScholarshipFlag,StudentReg.RecgFeesFlag," +
                    "StudentReg.ExmFeesFlag,StudentReg.TCNO,StudentReg.Dateofwithdrawal,StudentReg.WdrwlID,StudentReg.Classwithdrawal," +
                    "StudentReg.PresentAddr,StudentReg.Houseno,StudentReg.Streetname,StudentReg.Cityname,StudentReg.MandalID,StudentReg.DistrictID,StudentReg.StateID," +
                    "StudentReg.PermanentAddr,StudentReg.HousenoP,StudentReg.StreetnameP,StudentReg.CitynameP,StudentReg.MandalIDP,StudentReg.DistrictIDP,StudentReg.AadharNo,StudentReg.MobileNo," +
                    "StudentReg.StateIDP,'" + ConfigurationManager.AppSettings["WebUrl"].ToString() + "' + StudentReg.PhotoPath AS PhotoPath,'" + ConfigurationManager.AppSettings["WebUrl"].ToString() + "' + StudentReg.SignPath AS SignPath,StudentReg.Eligible,StudentReg.Remark,StudentReg.ActiveFlag,StudentReg.CreLoginID," +
                    "StudentReg.CreDate,StudentReg.UpdLoginID,StudentReg.UpdDate, StudentReg.LstInstName, " +
                    "BasicCommunity.CommName,BasicMedium.MediumName,BasicSubject.SubName, BasicMainGroup.MainGrpName,  " +
                    "replace(convert(varchar(11),StudentReg.BirthDate,106),' ','/') as BirthDateDesc, " +
                    "BasicCourse.CourseName, BasicBranch.BranchName,isnull(ltrim(StudentReg.PRNNo),'') as PRNNo, StudentReg.GradePoints,StudentReg.PhysDisbPer  " +
                    "FROM StudentReg " +
                    "LEFT OUTER JOIN BasicCommunity ON StudentReg.CommunityID = BasicCommunity.CommunityID " +
                    "LEFT OUTER JOIN BasicMedium ON StudentReg.MediumID = BasicMedium.MediumID " +
                    "LEFT OUTER JOIN BasicSubject ON StudentReg.SecondLangID = BasicSubject.SubjectID " +
                    "LEFT OUTER JOIN BasicMainGroup ON StudentReg.MainGrpID = BasicMainGroup.MainGrpID " +
                    "LEFT OUTER JOIN BasicCaste ON StudentReg.CasteID = BasicCaste.CasteID " +
                    "LEFT OUTER JOIN BasicSubCaste ON StudentReg.SubCastID = BasicSubCaste.SubCastID " +
                    "LEFT OUTER JOIN BasicCourse ON StudentReg.CourseID = BasicCourse.CourseID " +
                    "LEFT OUTER JOIN BasicBranch ON StudentReg.BranchID = BasicBranch.BranchID " +
                    "Where (StudentReg.ActiveFlag =1) AND StudentReg.CollegeID = " + CollegeID + " AND ISNULL(Eligible,'N') = '" + ReportType + "'";
                if (CourseID > 0)
                {
                    StrQuery = StrQuery + " AND StudentReg.CourseID = " + CourseID + " ";
                }
                if (BranchID > 0)
                {
                    StrQuery = StrQuery + " AND StudentReg.BranchID = " + BranchID + " ";
                }
                return dbHandler.ReturnData(StrQuery);
            }
            catch (Exception ex)
            {
                
                dbHandler.SaveErorr("StudentReg", 0, ex.Message);
                throw ex;
            }
        }
        public DataSet GetGroupwiseReport(dbHandler dbHandler, int AcdYrID, int CourseID, int ExamID, int BranchID, int DistrictID, int CollegeID, int MainGrpID, int SecondLangID)
        {
            try
            {
                SqlParameter[] Param =
                {
                    new SqlParameter("@AcdYrID",AcdYrID),
                    new SqlParameter("@DistrictID",DistrictID),
                    new SqlParameter("@CollegeID",CollegeID),
                    new SqlParameter("@CourseID",CourseID),
                    new SqlParameter("@ExamID",ExamID),
                    new SqlParameter("@BranchID",BranchID),
                    new SqlParameter("@MainGrpID",MainGrpID),
                    new SqlParameter("@SecondLangID",SecondLangID),
                };
                DataSet ds = new DataSet();
                ds = dbHandler.ReturnDataWithStoredProcedure("GroupwiseAdmission", Param);
                return ds;
            }
            catch (Exception ex)
            {
                
                dbHandler.SaveErorr("StudentReg", 0, ex.Message);
                throw ex;
            }
        }
        public DataTable GetDistrictwiseReport(dbHandler dbHandler, int AcdYrID)
        {
            try
            {
                SqlParameter[] Param =
                {
                    new SqlParameter("@AcdYrID",AcdYrID),
                };
                DataTable tbl = new DataTable();
                tbl = dbHandler.ReturnDataWithStoredProcedureTable("Report_DistrictwiseAdmission", Param);
                return tbl;
            }
            catch (Exception ex)
            {
                
                dbHandler.SaveErorr("StudentReg", 0, ex.Message);
                throw ex;
            }
        }
        public DataTable GetDistrictwiseRecgFeeReport(dbHandler dbHandler, int AcdYrID)
        {
            try
            {
                SqlParameter[] Param =
                {
                    new SqlParameter("@AcdYrID",AcdYrID),
                };
                DataTable tbl = new DataTable();
                tbl = dbHandler.ReturnDataWithStoredProcedureTable("Report_DistrictwiseRecognitionFees", Param);
                return tbl;
            }
            catch (Exception ex)
            {
                
                dbHandler.SaveErorr("StudentReg", 0, ex.Message);
                throw ex;
            }
        }
        public DataTable GetSSCHallTicketSearchReport(dbHandler dbHandler, int AcdYrID)
        {
            try
            {
                SqlParameter[] Param =
                {
                    new SqlParameter("@AcdYrID",AcdYrID),
                };
                DataTable tbl = new DataTable();
                tbl = dbHandler.ReturnDataWithStoredProcedureTable("Report_DistrictwiseAdmission", Param);
                return tbl;
            }
            catch (Exception ex)
            {
                
                dbHandler.SaveErorr("StudentReg", 0, ex.Message);
                throw ex;
            }
        }
        public DataTable GetSSCHallTicketData(dbHandler dbHandler, string SSCHallTicket)
        {
            try
            {
                string StrQuery = "";
                StrQuery = " SELECT PreStudentReg.PreStudRegID,PreStudentReg.StudName, PreStudentReg.Fathername, BasicCollege.ColName, BasicCollege.principal_name, BasicCollege.principal_mobile_no, BasicBoard.BoardName, PreStudentReg.AdmNo, " +
                           "PreStudentReg.SSCHallTicket, PreStudentReg.PRNNo, PreStudentReg.MotherName, PreStudentReg.Nationality, PreStudentReg.BirthDate, BasicCaste.CasteName, BasicSubCaste.SubCastName,  " +
                           "PreStudentReg.Gender, BasicMotherTongue.MothTName, PreStudentReg.IdentiMarks, PreStudentReg.IdentiMarks2, BasicIncomeGroups.IncGrpame, BasicOccupation.OcupName, BasicExam.ExmName,  " +
                           "BasicMedium.MediumName, BasicSubject.SubName, BasicMainGroup.MainGrpName, BasicMandal.MandalName, BasicDistricts.DistName, BasicState.StateName,PreStudentReg.AdmDate, " +
                           "PreStudentAddr.LstInstName,PreStudentReg.Guardianname,PreStudentReg.GradePoints,PreStudentReg.MobileNo,PreStudentReg.ParentCellNo,PreStudentReg.EmailId, " +
                           "PreStudentReg.AadharNo,PreStudentAddr.Houseno,PreStudentAddr.streetName,PreStudentAddr.cityname, " +
                           "'" + ConfigurationManager.AppSettings["WebUrl"].ToString() + "' + PreStudentOther.PhotoPath AS PhotoPath,'" + ConfigurationManager.AppSettings["WebUrl"].ToString() + "' + PreStudentOther.SignPath AS SignPath " +
                           "FROM  PreStudentReg INNER JOIN BasicCollege ON BasicCollege.CollegeID = PreStudentReg.CollegeID " +
                           "LEFT OUTER JOIN PreStudentOther ON PreStudentReg.PreStudRegID = PreStudentOther.PreStudRegID " +
                           "LEFT OUTER JOIN PreStudentAddr ON PreStudentReg.PreStudRegID = PreStudentAddr.PreStudRegID " +
                           "LEFT OUTER JOIN BasicMandal ON BasicMandal.MandalID = BasicCollege.MandalID " +
                           "LEFT OUTER JOIN BasicDistricts ON BasicMandal.DistrictID = BasicDistricts.DistrictID " +
                           "LEFT OUTER JOIN BasicState ON BasicDistricts.StateID = BasicState.StateID " +
                           "LEFT OUTER JOIN BasicMotherTongue ON PreStudentReg.MothTID = BasicMotherTongue.MothTID " +
                           "LEFT OUTER JOIN BasicIncomeGroups ON PreStudentReg.IncGrpID = BasicIncomeGroups.IncGrpID " +
                           "LEFT OUTER JOIN BasicOccupation ON PreStudentReg.OcupID = BasicOccupation.OcupID " +
                           "LEFT OUTER JOIN BasicExam ON PreStudentReg.ExamID = BasicExam.ExamID " +
                           "LEFT OUTER JOIN BasicSubject ON PreStudentReg.SecondLangID = BasicSubject.SubjectID " +
                           "LEFT OUTER JOIN BasicMainGroup ON PreStudentReg.MainGrpID = BasicMainGroup.MainGrpID " +
                           "LEFT OUTER JOIN BasicMedium ON PreStudentReg.MediumID = BasicMedium.MediumID " +
                           "LEFT OUTER JOIN BasicCaste ON PreStudentReg.CasteID = BasicCaste.CasteID " +
                           "LEFT OUTER JOIN BasicSubCaste ON PreStudentReg.SubCastID = BasicSubCaste.SubCastID " +
                           "LEFT OUTER JOIN BasicBoard ON PreStudentReg.BoardID = BasicBoard.BoardID " +
                           "WHERE (PreStudentReg.ActiveFlag =1) AND PrestudentReg.SSCHallTicket = '" + SSCHallTicket + "'";
                return dbHandler.ReturnData(StrQuery);
            }
            catch (Exception ex)
            {
                
                dbHandler.SaveErorr("StudentReg", 0, ex.Message);
                throw ex;
            }
        }








        public DataTable GetStudentRegListBySSCHallTicket(dbHandler dbHandler, string SSCHallTicket)  //long
        {
            try
            {
                string StrQuery = "";
                StrQuery = "SELECT StudentReg.StudRegID, StudentReg.SSCHallTicket,StudentReg.AdmNo,StudentReg.AdmDate,StudentReg.StudName,StudentReg.FatherName," +
                    "StudentReg.MotherName,StudentReg.Gender,StudentReg.Nationality,StudentReg.BirthDate,StudentReg.CommunityID,StudentReg.IdentiMarks," +
                    "StudentReg.MothTID,StudentReg.OcupID,StudentReg.CollegeID,StudentReg.CourseID,StudentReg.ExamID,StudentReg.BranchID,StudentReg.ParentCellno," +
                    "StudentReg.AcdYrID,StudentReg.AadharNo,StudentReg.MobileNo,StudentReg.Handicaped,StudentReg.PhysDisbID,StudentReg.SpclConsID," +
                    "StudentReg.Guardianname,StudentReg.RelwithGuardian,StudentReg.MediumID,StudentReg.MainGrpID,StudentReg.SecondLangID,isnull(ltrim(StudentReg.PRNNo),'') as PRNNo," +
                    "StudentReg.AdmCategory,StudentReg.IncGrpID,StudentReg.ScholarshipFlag,StudentReg.RecgFeesFlag," +
                    "StudentReg.ExmFeesFlag,StudentReg.TCNO,StudentReg.Dateofwithdrawal,StudentReg.WdrwlID,StudentReg.Classwithdrawal," +
                    "StudentReg.PresentAddr,StudentReg.Houseno,StudentReg.Streetname,StudentReg.Cityname,StudentReg.MandalID,StudentReg.DistrictID,StudentReg.StateID," +
                    "StudentReg.PermanentAddr,StudentReg.HousenoP,StudentReg.StreetnameP,StudentReg.CitynameP,StudentReg.MandalIDP,StudentReg.DistrictIDP,StudentReg.AadharNo,StudentReg.MobileNo," +
                    "StudentReg.StateIDP,'" + ConfigurationManager.AppSettings["WebUrl"].ToString() + "' + StudentReg.PhotoPath AS PhotoPath,'" + ConfigurationManager.AppSettings["WebUrl"].ToString() + "' + StudentReg.SignPath AS SignPath,StudentReg.Eligible,StudentReg.Remark,StudentReg.ActiveFlag,StudentReg.CreLoginID," +
                    "StudentReg.CreDate,StudentReg.UpdLoginID,StudentReg.UpdDate, StudentReg.LstInstName, " +
                    "BasicCommunity.CommName,BasicMedium.MediumName,BasicSubject.SubName,BasicMainGroup.MainGrpName, " +
                    "replace(convert(varchar(11),StudentReg.BirthDate,106),' ','/') as BirthDateDesc, " +
                    "Case when StudentReg.Gender='F' then 'Female' Else 'Male' End As GenderDesc, StudentReg.CasteID, StudentReg.SubCastID , StudentReg.LateAppFlag, StudentReg.FeeAmount,StudentReg.EmailId,StudentReg.PassingYear,StudentReg.PassingMonth,StudentReg.IdentiMarks2, StudentReg.GradePoints  " +
                    "FROM StudentReg " +
                    "LEFT OUTER JOIN BasicCommunity ON StudentReg.CommunityID = BasicCommunity.CommunityID " +
                    "LEFT OUTER JOIN BasicMedium ON StudentReg.MediumID = BasicMedium.MediumID " +
                    "LEFT OUTER JOIN BasicSubject ON StudentReg.SecondLangID = BasicSubject.SubjectID " +
                    "LEFT OUTER JOIN BasicMainGroup ON StudentReg.MainGrpID = BasicMainGroup.MainGrpID " +
                    "LEFT OUTER JOIN BasicCaste ON StudentReg.CasteID = BasicCaste.CasteID " +
                    "LEFT OUTER JOIN BasicSubCaste ON StudentReg.SubCastID = BasicSubCaste.SubCastID " +
                    " Where (StudentReg.ActiveFlag =1) AND StudentReg.SSCHallTicket = '" + SSCHallTicket + "'";

                return dbHandler.ReturnData(StrQuery);
            }
            catch (Exception ex)
            {
                
                dbHandler.SaveErorr("StudentReg", 0, ex.Message);
                throw ex;
            }
        }

        public Int64 GetAdmissionMaxNo(dbHandler dbHandler)
        {
            try
            {
                string StrQuery = "";
                StrQuery = "SELECT Isnull(Max(AdmNo),0) as AdmNo FROM StudentReg ";
                return Convert.ToInt64(dbHandler.ExcutiveScalar(StrQuery));
            }
            catch (Exception ex)
            {
                
                dbHandler.SaveErorr("StudentReg", 0, ex.Message);
                throw ex;
            }
        }
        public Int64 GetCurrentAdminNo(dbHandler dbHandler, int CollegeID)
        {
            try
            {
                string StrQuery = "";
                StrQuery = "SELECT Isnull(PrevAdmNo,0) as PrevAdmNo FROM BasicCollege where CollegeID = " + CollegeID + "";
                return Convert.ToInt64(dbHandler.ExcutiveScalar(StrQuery));
            }
            catch (Exception ex)
            {
                
                dbHandler.SaveErorr("StudentReg", 0, ex.Message);
                throw ex;
            }
        }
        public DataTable GetbatchNoCount(dbHandler dbHandler, int CollegeID, int AcdYrID)
        {
            try
            {
                string StrQuery = "";
                StrQuery = "Select  MAX(Convert(bigint,ISNULL(BatchNo,0))) as BatchNo ,Count(Convert(bigint,ISNULL(BatchNo,0))) as BatchNoCount , MAX(Convert(bigint,ISNULL(BatchNo,0))) + 1  as NewBatchNo , CollegeID from StudentReg Where CollegeID=" + CollegeID + " And AcdYrID =" + AcdYrID + "  Group By CollegeID";
                return dbHandler.ReturnData(StrQuery);
            }
            catch (Exception ex)
            {
                
                dbHandler.SaveErorr("StudentReg", 0, ex.Message);
                throw ex;
            }
        }
        public Int16 CheckHallTicketNoPresent(dbHandler dbHandler, string YrName, string SSCHallTicket, int BoardID, int CollegeID)
        {
            try
            {
                string StrQuery = "";
                StrQuery = "SELECT Isnull(Count(*),0) as HallTicketNoPresent FROM StudentReg where PassingYear = '" + YrName + "' and SSCHallTicket = '" + SSCHallTicket + "' and BoardID = " + BoardID + " and CollegeID = " + CollegeID + "";
                return Convert.ToInt16(dbHandler.ExcutiveScalar(StrQuery));
            }
            catch (Exception ex)
            {
                
                dbHandler.SaveErorr("StudentReg", 0, ex.Message);
                throw ex;
            }
        }
        public Int16 CheckHallTicketNoPresentInCollege(dbHandler dbHandler, string YrName, string SSCHallTicket, int BoardID)
        {
            try
            {
                string StrQuery = "";
                StrQuery = "SELECT Isnull(Count(*),0) as HallTicketNoPresent FROM StudentReg where PassingYear = '" + YrName + "' and SSCHallTicket = '" + SSCHallTicket + "' and BoardID = " + BoardID + " ";
                return Convert.ToInt16(dbHandler.ExcutiveScalar(StrQuery));
            }
            catch (Exception ex)
            {
                
                dbHandler.SaveErorr("StudentReg", 0, ex.Message);
                throw ex;
            }
        }
        public Int16 CheckHallTicketNoPresentOpenAdmission(dbHandler dbHandler, string YrName, string SSCHallTicket, int BoardID, int CollegeID)
        {
            try
            {
                string StrQuery = "";
                StrQuery = "SELECT Isnull(Count(*),0) as HallTicketNoPresent FROM StudEnrolReq INNER JOIN StudEnrolCol ON StudEnrolReq.StudEnrolID = StudEnrolCol.StudEnrolID where StudEnrolReq.PassingYear = '" + YrName + "' and StudEnrolReq.SSCHallTicket = '" + SSCHallTicket + "' and StudEnrolReq.BoardID = " + BoardID + " ";
                //and StudEnrolCol.CollegeID = " + CollegeID + "";

                return Convert.ToInt16(dbHandler.ExcutiveScalar(StrQuery));
            }
            catch (Exception ex)
            {
                
                dbHandler.SaveErorr("StudentReg", 0, ex.Message);
                throw ex;
            }
        }
        public void GetDeleteHallTicketNoPresentOpenAdmission(dbHandler dbHandler, int AcdYrID, string YrName, string SSCHallTicket, int BoardID)
        {
            try
            {
                string StrQuery = "";
                StrQuery = "Update StudEnrolReq Set DirectEnrollFlag = 'Y' where StudEnrolReq.PassingYear = '" + YrName + "' and StudEnrolReq.SSCHallTicket = '" + SSCHallTicket + "' and StudEnrolReq.BoardID = " + BoardID + " ";
                dbHandler.ExecuteNonQuery(StrQuery);
            }
            catch (Exception ex)
            {
                
                dbHandler.SaveErorr("StudentReg", 0, ex.Message);
                throw ex;
            }
        }






        public Int16 GetCheckMobileNoCount(dbHandler dbHandler, string MobileNo, int CollegeID, int AcdYrID)
        {
            try
            {
                string StrQuery = "";
                StrQuery = "SELECT Isnull(Count(*),0) as MobileNoCnt FROM StudentReg where MobileNo = '" + MobileNo + "' and CollegeID = " + CollegeID + " and AcdYrID = " + AcdYrID + "";
                return Convert.ToInt16(dbHandler.ExcutiveScalar(StrQuery));
            }
            catch (Exception ex)
            {
                
                dbHandler.SaveErorr("StudentReg", 0, ex.Message);
                throw ex;
            }
        }
        public Int32 GetStudCountByBranchAndCollege(int AcdYrID, int CollegeID, int BranchID, dbHandler dbHandler)
        {
            try
            {
                string StrQuery = "";
                StrQuery = "SELECT Isnull(Count(*),0) as studCount FROM StudentReg where CollegeID = " + CollegeID + " and AcdYrID = " + AcdYrID + " and BranchID = '" + BranchID + "'";
                return Convert.ToInt32(dbHandler.ExcutiveScalar(StrQuery));
            }
            catch (Exception ex)
            {
                
                dbHandler.SaveErorr("StudentReg", 0, ex.Message);
                throw ex;
            }
        }
        public DataTable GetStudCastwiseCount(int AcdYrID, int CollegeID, int CourseID, int ExamID, dbHandler dbHandler)
        {
            try
            {
                string StrQuery = "";
                StrQuery = "SELECT BasicCourse.CourseName, BasicExam.ExmName, BasicBranch.BranchName, " +
                           "ISNULL(COUNT(*), 0) AS studCount, BasicCaste.CasteName,BasicAcademicYear.AcdYrName, BasicCollege.ColCode +' - '+ BasicCollege.ColName AS ColName " +
                           "FROM StudentReg INNER JOIN BasicCourse ON StudentReg.CourseID = BasicCourse.CourseID INNER JOIN " +
                           "BasicExam ON StudentReg.ExamID = BasicExam.ExamID AND BasicCourse.CourseID = BasicExam.CourseID INNER JOIN " +
                           "BasicAcademicYear ON StudentReg.AcdYrID = BasicAcademicYear.AcdYrID INNER JOIN " +
                           "BasicCaste ON StudentReg.CasteID = BasicCaste.CasteID INNER JOIN BasicBranch ON StudentReg.BranchID = BasicBranch.BranchID INNER JOIN BasicCollege ON  StudentReg.CollegeID =BasicCollege.CollegeID " +
                           "WHERE StudentReg.AcdYrID = " + AcdYrID + " and (StudentReg.CollegeID = " + CollegeID + ") AND(StudentReg.CourseID = " + CourseID + ") AND(StudentReg.ExamID = " + ExamID + ") " +
                           "GROUP BY BasicCourse.CourseName, BasicExam.ExmName, BasicBranch.BranchName, BasicCaste.CasteName,BasicAcademicYear.AcdYrName, BasicCollege.ColCode,BasicCollege.ColName ";
                return dbHandler.ReturnData(StrQuery);
            }
            catch (Exception ex)
            {
                
                dbHandler.SaveErorr("StudentReg", 0, ex.Message);
                throw ex;
            }
        }
        public DataTable GetStudentRegByIdForApproved(dbHandler dbHandler, long StudRegID)
        {
            try
            {
                string StrQuery = "";
                StrQuery = "SELECT StudentReg.StudRegID, StudentReg.SSCHallTicket,StudentReg.AdmNo,StudentReg.AdmDate,StudentReg.StudName,StudentReg.FatherName," +
                     "StudentReg.MotherName,StudentReg.Gender,StudentReg.Nationality,StudentReg.BirthDate,StudentReg.CommunityID,StudentReg.IdentiMarks," +
                     "StudentReg.MothTID,StudentReg.OcupID,StudentReg.CollegeID,StudentReg.CourseID,StudentReg.ExamID,StudentReg.BranchID,StudentReg.ParentCellno," +
                     "StudentReg.AcdYrID,StudentReg.AadharNo,StudentReg.MobileNo,StudentReg.Handicaped,StudentReg.PhysDisbID,StudentReg.SpclConsID," +
                     "StudentReg.Guardianname,StudentReg.RelwithGuardian,StudentReg.MediumID,StudentReg.MainGrpID,StudentReg.SecondLangID,isnull(ltrim(StudentReg.PRNNo),'') as PRNNo," +
                     "StudentReg.AdmCategory,StudentReg.IncGrpID,StudentReg.ScholarshipFlag,StudentReg.RecgFeesFlag," +
                     "StudentReg.ExmFeesFlag,StudentReg.TCNO,StudentReg.Dateofwithdrawal,StudentReg.WdrwlID,StudentReg.Classwithdrawal," +
                     "StudentReg.PresentAddr,StudentReg.Houseno,StudentReg.Streetname,StudentReg.Cityname,StudentReg.MandalID,StudentReg.DistrictID,StudentReg.StateID," +
                     "StudentReg.PermanentAddr,StudentReg.HousenoP,StudentReg.StreetnameP,StudentReg.CitynameP,StudentReg.MandalIDP,StudentReg.DistrictIDP,StudentReg.AadharNo,StudentReg.MobileNo, " +
                     "StudentReg.StateIDP,'" + ConfigurationManager.AppSettings["WebUrl"].ToString() + "' + StudentReg.PhotoPath AS PhotoPath,'" + ConfigurationManager.AppSettings["WebUrl"].ToString() + "' + StudentReg.SignPath AS SignPath,StudentReg.Eligible,StudentReg.Remark,StudentReg.ActiveFlag,StudentReg.CreLoginID," +
                     "StudentReg.CreDate,StudentReg.UpdLoginID,StudentReg.UpdDate, StudentReg.LstInstName, " +
                     "BasicCommunity.CommName,BasicMedium.MediumName,BasicSubject.SubName, " +
                     "replace(convert(varchar(11),StudentReg.BirthDate,106),' ','/') as BirthDateDesc, " +
                     "Case when StudentReg.Gender='F' then 'Female' Else 'Male' End As GenderDesc, StudentReg.CasteID, StudentReg.SubCastID,StudentReg.BatchNo, " +
                     "Case when StudentReg.Eligible = 'Y' then 'Yes' Else 'No' End EligibleDesc,cast(DatePart(Day,StudentReg.BirthDate) as varchar) + ',' + Datename(month,StudentReg.BirthDate)+ ',' + Datename(year,StudentReg.BirthDate) as DateOfBirthInWords, StudentReg.LateAppFlag, " +
                     "StudentReg.PhotoPath as PhotoPathDesc, StudentReg.SignPath as SignPathDesc, StudentReg.FeeAmount,BasicCollege.ColName,StudentReg.EmailId,StudentReg.PassingYear,StudentReg.PassingMonth,StudentReg.IdentiMarks2, StudentReg.GradePoints  " +
                     "FROM StudentReg " +
                     "LEFT OUTER JOIN BasicCommunity ON StudentReg.CommunityID = BasicCommunity.CommunityID " +
                     "LEFT OUTER JOIN BasicMedium ON StudentReg.MediumID = BasicMedium.MediumID LEFT OUTER JOIN BasicSubject ON StudentReg.SecondLangID = BasicSubject.SubjectID " +
                     "LEFT OUTER JOIN BasicCaste ON StudentReg.CasteID = BasicCaste.CasteID " +
                     "LEFT OUTER JOIN BasicSubCaste ON StudentReg.SubCastID = BasicSubCaste.SubCastID " +
                     "LEFT OUTER JOIN BasicCollege ON StudentReg.CollegeID = BasicCollege.CollegeID " +
                     "Where (StudentReg.ActiveFlag =1) AND StudentReg.StudRegID = " + StudRegID;

                return dbHandler.ReturnData(StrQuery);
            }
            catch (Exception ex)
            {
                
                dbHandler.SaveErorr("StudentReg", 0, ex.Message);
                throw ex;
            }
        }
        public DataTable GetGollegeData(dbHandler dbHandler, int CollegeID)
        {
            try
            {
                string StrQuery = "";
                StrQuery = "SELECT isnull(IsGovt,1) as IsGovt,MngtTypID FROM BasicCollege where CollegeID = '" + CollegeID + "'";
                return dbHandler.ReturnData(StrQuery);
            }
            catch (Exception ex)
            {
                
                dbHandler.SaveErorr("StudentReg", 0, ex.Message);
                throw ex;
            }
        }

        public DataTable GetOpenSchoolDataBySSCHallTicketAndAcdYrID(dbHandler dbHandler, string SSCHallTicket)
        {
            try
            {
                string StrQuery = "";
                StrQuery = "SELECT AICODE, CNAME, FNAME, ROLLNO,AINAME FROM OpenSchoolEnrollment where RESULT is null and ROLLNO = '" + SSCHallTicket + "'";
                return dbHandler.ReturnData(StrQuery);
            }
            catch (Exception ex)
            {
                
                dbHandler.SaveErorr("StudentReg", 0, ex.Message);
                throw ex;
            }
        }
        // Aadhaar Methods
        public Int16 CheckAadharNoPresent(dbHandler dbHandler, string AadharNo)
        {
            try
            {
                string StrQuery = "";
                StrQuery = "SELECT Isnull(Count(*),0) as AadharNoPresent FROM TempAadhar where Aadharno = '" + AadharNo + "'";
                return Convert.ToInt16(dbHandler.ExcutiveScalar(StrQuery));
            }
            catch (Exception ex)
            {
                
                dbHandler.SaveErorr("StudentReg", 0, ex.Message);
                throw ex;
            }
        }
        public DataTable GetAadharDataByAadharId(dbHandler dbHandler, string AadharNo)
        {
            try
            {
                string StrQuery = "";
                StrQuery = "SELECT AadharTempId, AadharNo,PhotoPath, StduName,BirthDate,Gender,FatherName,Address from TempAadhar where AadharNo = '" + AadharNo + "'";
                return dbHandler.ReturnData(StrQuery);
            }
            catch (Exception ex)
            {
                
                dbHandler.SaveErorr("StudentReg", 0, ex.Message);
                throw ex;
            }
        }
        /// <summary>
        /// UpdateStudentaadharStatus
        /// </summary>
        /// <param name="studentReg"></param>
        /// <param name="dbHandler"></param>
        public Int32 UpdateStudentAadharStatus(StudentReg studentReg, dbHandler dbHandler)
        {
            try
            {
                string StrQuery = "";
                if (studentReg.AadharRemark == "")
                {
                    StrQuery = "Update StudentReg set AadharAuthFlag =" + studentReg.AadharAuthFlag + ", AadharAuthDate=GetDate() where StudRegID =" + studentReg.StudRegID + ";";
                }
                else
                {
                    StrQuery = "Update StudentReg set AadharAuthFlag =" + studentReg.AadharAuthFlag + ", AadharRemark ='" + studentReg.AadharRemark + "' where StudRegID =" + studentReg.StudRegID + ";";
                }
                return dbHandler.ExecuteNonQuery(StrQuery);
            }
            catch (Exception ex)
            {
                
                //dbHandler.SaveErorr("StudentReg", "", ex.Message);
                throw ex;
            }
        }

        public DataTable GetStudentRegGroupWiseCountByCourseExamBranch(dbHandler dbHandler, int CollegeID = 0, int CourseID = 0, int ExamID = 0, int BranchID = 0, int MainGrpID = 0)
        {
            try
            {
                string StrQuery = "SELECT Count(*) AS TotalCount, BasicCourse.CourseName, BasicBranch.BranchName, BasicMedium.MediumName,BasicMainGroup.MainGrpName,  " +
                        " BasicCollege.ColName FROM StudentReg INNER JOIN BasicCollege ON StudentReg.CollegeID = BasicCollege.CollegeID INNER JOIN " +
                        " BasicCourse ON StudentReg.CourseID = BasicCourse.CourseID INNER JOIN  " +
                        " BasicBranch ON StudentReg.BranchID = BasicBranch.BranchID INNER JOIN  " +
                        " BasicMedium ON StudentReg.MediumID = BasicMedium.MediumID INNER JOIN  " +
                        " BasicMainGroup ON StudentReg.MainGrpID = BasicMainGroup.MainGrpID Where ISNULL(StudentReg.SSCHallTicket,0)<> 0   ";
                if (CollegeID > 0)
                {
                    StrQuery = StrQuery + " AND StudentReg.CollegeID = " + CollegeID + " ";
                }
                if (CourseID > 0)
                {
                    StrQuery = StrQuery + " AND StudentReg.CourseID = " + CourseID + " ";
                }
                if (ExamID > 0)
                {
                    StrQuery = StrQuery + " AND StudentReg.ExamID = " + ExamID + " ";
                }
                if (BranchID > 0)
                {
                    StrQuery = StrQuery + " AND StudentReg.BranchID = " + BranchID + " ";
                }
                if (MainGrpID > 0)
                {
                    StrQuery = StrQuery + " AND StudentReg.MainGrpID = " + MainGrpID + " ";
                }
                StrQuery = StrQuery + "  Group By BasicCourse.CourseName, BasicBranch.BranchName, BasicMedium.MediumName,  " +
                        " BasicMainGroup.MainGrpName, BasicCollege.ColName";

                return dbHandler.ReturnData(StrQuery);
            }
            catch (Exception ex)
            {
                
                //dbHandler.SaveErorr("StudentReg", "", ex.Message);
                throw ex;
            }

        }
        #endregion

        #region "Get ColCode Methods"
        public DataTable GetPreStudentCollegeCodeByStudentID(dbHandler dbHandler, Int64 StudRegID)
        {
            try
            {
                string StrQuery = "";
                StrQuery = "SELECT  BASICCOLLEGE.COLCODE FROM BASICCOLLEGE INNER JOIN STUDENTREG ON BASICCOLLEGE.COLLEGEID = STUDENTREG.COLLEGEID " +
                    "WHERE STUDENTREG.StudRegID=" + StudRegID;
                return dbHandler.ReturnData(StrQuery);
            }
            catch (Exception ex)
            {
                
                dbHandler.SaveErorr("PrestudentOther", 0, ex.Message);
                throw ex;
            }
        }

        #endregion


    }
}
