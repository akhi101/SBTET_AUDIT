using System;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Data.SqlClient;
using Newtonsoft.Json;
using SoftwareSuite.Models.Database;

using RestSharp;
using System.Threading.Tasks;
using System.Configuration;
using System.Xml;
using System.IO;
using System.Web;
using System.Data;

using System.Collections.Generic;
using SoftwareSuite.Models;
using System.Timers;

namespace SoftwareSuite.Controllers.PayRoll
{
    public class PayRollController : ApiController
    {

        [HttpGet, ActionName("GetDesignationTypes")]
        public HttpResponseMessage GetDesignationTypes()
        {
            try
            {
                var dbHandler = new PayRolldbhandler();
                string StrQuery = "";
                StrQuery = "exec SP_Get_DesignationTypes";
                return Request.CreateResponse(HttpStatusCode.OK, dbHandler.ReturnDataWithStoredProcedureTable(StrQuery));
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("SP_Get_DesignationTypes", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }



        [HttpGet, ActionName("GetMonths")]
        public HttpResponseMessage GetMonths()
        {
            try
            {
                var dbHandler = new PayRolldbhandler();
                string StrQuery = "";
                StrQuery = "exec SP_Get_Months";
                return Request.CreateResponse(HttpStatusCode.OK, dbHandler.ReturnDataSet(StrQuery));
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("SP_Get_Months", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [HttpGet, ActionName("GetAdvanceType")]
        public HttpResponseMessage GetAdvanceType()
        {
            try
            {
                var dbHandler = new PayRolldbhandler();
                string StrQuery = "";
                StrQuery = "exec SP_Get_AdvanceTypes";
                return Request.CreateResponse(HttpStatusCode.OK, dbHandler.ReturnDataSet(StrQuery));
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("SP_Get_AdvanceTypes", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }


        [HttpGet, ActionName("GetFinancialYears")]
        public HttpResponseMessage GetFinancialYears()
        {
            try
            {
                var dbHandler = new PayRolldbhandler();
                string StrQuery = "";
                StrQuery = "exec SP_Get_FinancialYear";
                return Request.CreateResponse(HttpStatusCode.OK, dbHandler.ReturnDataSet(StrQuery));
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("SP_Get_FinancialYear", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }


        [HttpPost, ActionName("GetorEditIncrements")]
        public string GetorEditIncrements([FromBody] JsonObject request)
        {
            try
            {

                var dbHandler = new PayRolldbhandler();
                var param = new SqlParameter[5];
                param[0] = new SqlParameter("@DataTypeID", request["DataTypeID"]);
                param[1] = new SqlParameter("@FinancialYearID", request["FinancialYearID"]);
                param[2] = new SqlParameter("@MonthID", request["MonthID"]);
                param[3] = new SqlParameter("@IncrementId", request["IncrementId"]);
                param[4] = new SqlParameter("@Active", request["Active"]);
                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_Get_Edit_Increments", param);
                return JsonConvert.SerializeObject(dt);

            }
            catch (Exception ex)
            {

                return ex.Message;

            }
        }

        [HttpPost, ActionName("GetEmployeebyMonthYear")]
        public string GetEmployeebyMonthYear([FromBody] JsonObject request)
        {
            try
            {

                var dbHandler = new PayRolldbhandler();
                var param = new SqlParameter[2];
               
                param[0] = new SqlParameter("@FinancialYearID", request["FinancialYearID"]);
                param[1] = new SqlParameter("@MonthId", request["MonthId"]);
              
                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_Get_IncrementForEmployee", param);
                return JsonConvert.SerializeObject(dt);

            }
            catch (Exception ex)
            {

                return ex.Message;

            }
        }





        [HttpPost, ActionName("GetorEditDesignationData")]
        public string GetorEditDesignationData([FromBody] JsonObject request)
        {
            try
            {

                var dbHandler = new PayRolldbhandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@DataTypeID", request["DataTypeID"]);
                param[1] = new SqlParameter("@DesignationId", request["DesignationId"]);
                param[2] = new SqlParameter("@Active", request["Active"]);
                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_Get_Edit_Designations", param);
                return JsonConvert.SerializeObject(dt);

            }
            catch (Exception ex)
            {

                return ex.Message;

            }
        }


        [HttpPost, ActionName("AddorUpdateDesignations")]
        public string AddorUpdateDesignations([FromBody] JsonObject request)
        {
            try
            {
                var dbHandler = new PayRolldbhandler();
                var param = new SqlParameter[10];
                param[0] = new SqlParameter("@DataTypeId", request["DataTypeId"]);
                param[1] = new SqlParameter("@DesignationId", request["DesignationId"]);
                param[2] = new SqlParameter("@DesignationName", request["DesignationName"]);
                param[3] = new SqlParameter("@DesignationTypeId", request["DesignationTypeId"]);
                param[4] = new SqlParameter("@DesignationOrder", request["DesignationOrder"]);
                param[5] = new SqlParameter("@NoOfPost", request["NoOfPost"]);
                param[6] = new SqlParameter("@GONumber", request["GONumber"]);
                param[7] = new SqlParameter("@NoOfVacants", request["NoOfVacants"]);
                param[8] = new SqlParameter("@Active", request["Active"]);
                param[9] = new SqlParameter("@UserName", request["UserName"]);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Add_Update_Designations", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }

        [HttpPost, ActionName("AddorUpdateIncrements")]
        public string AddorUpdateIncrements([FromBody] JsonObject request)
        {
            try
            {
                var dbHandler = new PayRolldbhandler();
                var param = new SqlParameter[8];
                param[0] = new SqlParameter("@DataTypeId", request["DataTypeId"]);
                param[1] = new SqlParameter("@IncrementId", request["IncrementId"]);
                param[2] = new SqlParameter("@FinancialYearId", request["FinancialYearId"]);
                param[3] = new SqlParameter("@MonthID", request["MonthID"]);
                param[4] = new SqlParameter("@EmployeeID", request["EmployeeID"]);
                param[5] = new SqlParameter("@IncrementAmount", request["IncrementAmount"]);
                param[6] = new SqlParameter("@Active", request["Active"]);
                param[7] = new SqlParameter("@UserName", request["UserName"]);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Add_Update_Increments", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }

        [HttpPost, ActionName("AddorUpdateNPS")]
        public string AddorUpdateNPS([FromBody] JsonObject request)
        {
            try
            {
                var dbHandler = new PayRolldbhandler();
                var param = new SqlParameter[8];
                param[0] = new SqlParameter("@DataTypeId", request["DataTypeId"]);
                param[1] = new SqlParameter("@NPSId", request["NPSId"]);
                param[2] = new SqlParameter("@FinancialYearId", request["FinancialYearId"]);
                param[3] = new SqlParameter("@MonthID", request["MonthID"]);
                param[4] = new SqlParameter("@EmployeeID", request["EmployeeID"]);
                param[5] = new SqlParameter("@PensionAmount", request["PensionAmount"]);
                param[6] = new SqlParameter("@Active", request["Active"]);
                param[7] = new SqlParameter("@UserName", request["UserName"]);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Add_Update_NPS", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }


        [HttpPost, ActionName("GetorEditHBA")]
        public string GetorEditHBA([FromBody] JsonObject request)
        {
            try
            {

                var dbHandler = new PayRolldbhandler();
                var param = new SqlParameter[6];
                param[0] = new SqlParameter("@DataTypeID", request["DataTypeID"]);
                param[1] = new SqlParameter("@EmployeeID", request["EmployeeID"]);
                param[2] = new SqlParameter("@FinancialYearID", request["FinancialYearID"]);
                param[3] = new SqlParameter("@MonthID", request["MonthID"]);
                param[4] = new SqlParameter("@HBAId", request["HBAId"]);
                param[5] = new SqlParameter("@Active", request["Active"]);
                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_Get_Edit_HBA", param);
                return JsonConvert.SerializeObject(dt);

            }
            catch (Exception ex)
            {

                return ex.Message;

            }
        }



        [HttpPost, ActionName("AddorUpdateHBA")]
        public string AddorUpdateHBA([FromBody] JsonObject request)
        {
            try
            {
                var dbHandler = new PayRolldbhandler();
                var param = new SqlParameter[10];
                param[0] = new SqlParameter("@DataTypeId", request["DataTypeId"]);
                param[1] = new SqlParameter("@HBAId", request["HBAId"]);
                param[2] = new SqlParameter("@FinancialYearId", request["FinancialYearId"]);
                param[3] = new SqlParameter("@MonthID", request["MonthID"]);
                param[4] = new SqlParameter("@EmployeeID", request["EmployeeID"]);
                param[5] = new SqlParameter("@Amount", request["Amount"]);
                param[6] = new SqlParameter("@NoofMonths", request["NoofMonths"]);
                param[7] = new SqlParameter("@EmiStartMonth", request["EmiStartMonth"]);
                param[8] = new SqlParameter("@Active", request["Active"]);
                param[9] = new SqlParameter("@UserName", request["UserName"]);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Add_Update_HBA", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }


        [HttpPost, ActionName("GetorEditDeductions")]
        public string GetorEditDeductions([FromBody] JsonObject request)
        {
            try
            {

                var dbHandler = new PayRolldbhandler();
                var param = new SqlParameter[6];
                param[0] = new SqlParameter("@DataTypeID", request["DataTypeID"]);
                param[1] = new SqlParameter("@EmployeeID", request["EmployeeID"]);
                param[2] = new SqlParameter("@FinancialYearID", request["FinancialYearID"]);
                param[3] = new SqlParameter("@MonthID", request["MonthID"]);
                param[4] = new SqlParameter("@DeductionsId", request["DeductionsId"]);
                param[5] = new SqlParameter("@Active", request["Active"]);
                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_Get_Edit_Deductions", param);
                return JsonConvert.SerializeObject(dt);

            }
            catch (Exception ex)
            {

                return ex.Message;

            }
        }




        [HttpPost, ActionName("AddorUpdateDeductions")]
        public string AddorUpdateDeductions([FromBody] JsonObject request)
        {
            try
            {
                var dbHandler = new PayRolldbhandler();
                var param = new SqlParameter[11];
                param[0] = new SqlParameter("@DataTypeId", request["DataTypeId"]);
                param[1] = new SqlParameter("@DeductionsId", request["DeductionsId"]);
                param[2] = new SqlParameter("@FinancialYearId", request["FinancialYearId"]);
                param[3] = new SqlParameter("@MonthID", request["MonthID"]);
                param[4] = new SqlParameter("@EmployeeID", request["EmployeeID"]);
                param[5] = new SqlParameter("@IT", request["IT"]);
                param[6] = new SqlParameter("@FlagFund", request["FlagFund"]);
                param[7] = new SqlParameter("@Harithanidhi", request["Harithanidhi"]);
                param[8] = new SqlParameter("@DeductionAmount", request["DeductionAmount"]);
                param[9] = new SqlParameter("@Active", request["Active"]);
                param[10] = new SqlParameter("@UserName", request["UserName"]);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Add_Update_Deductions", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }

        public class LeavesDetails
        {
            public int DataTypeID { get; set; }
            public int MonthID { get; set; }
            public int FinancialYearID { get; set; }
            public int EmployeeID { get; set; }
            public int LeaveId { get; set; }
            public bool Active { get; set; }



        }


        [HttpPost, ActionName("GetorEditLeaves")]
        public string GetorEditLeaves([FromBody] LeavesDetails data)
        {
            try
            {

                var dbHandler = new PayRolldbhandler();
                var param = new SqlParameter[6];
                param[0] = new SqlParameter("@DataTypeID", data.DataTypeID);
                param[1] = new SqlParameter("@FinancialYearID", data.FinancialYearID);
                param[2] = new SqlParameter("@MonthID", data.MonthID);
                param[3] = new SqlParameter("@EmployeeID", data.EmployeeID);
                param[4] = new SqlParameter("@LeaveId", data.LeaveId);
                param[5] = new SqlParameter("@Active", data.Active);

                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_Get_Edit_Leaves", param);
                return JsonConvert.SerializeObject(dt);

            }
            catch (Exception ex)
            {

                return ex.Message;

            }
        }

        [HttpPost, ActionName("GetEmployeeLeaveBalance")]
        public string GetEmployeeLeaveBalance([FromBody] LeavesDetails data)
        {
            try
            {

                var dbHandler = new PayRolldbhandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@FinancialYearID", data.FinancialYearID);
                param[1] = new SqlParameter("@EmployeeID", data.EmployeeID);
                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_Get_EmployeeLeavesBalance", param);
                return JsonConvert.SerializeObject(dt);

            }
            catch (Exception ex)
            {

                return ex.Message;

            }
        }

        [HttpPost, ActionName("AddorUpdateLeaves")]
        public string AddorUpdateLeaves([FromBody] JsonObject request)
        {
            try
            {
                var dbHandler = new PayRolldbhandler();
                var param = new SqlParameter[13];
                param[0] = new SqlParameter("@DataTypeId", request["DataTypeId"]);
                param[1] = new SqlParameter("@LeaveId", request["LeaveId"]);
                param[2] = new SqlParameter("@FinancialYearId", request["FinancialYearId"]);
                param[3] = new SqlParameter("@MonthID", request["MonthID"]);
                param[4] = new SqlParameter("@EmployeeID", request["EmployeeID"]);
                param[5] = new SqlParameter("@MedicalLeaves", request["MedicalLeaves"]);
                param[6] = new SqlParameter("@MedicalLeavesUtilized", request["MedicalLeavesUtilized"]);
                param[7] = new SqlParameter("@CasualLeaves", request["CasualLeaves"]);
                param[8] = new SqlParameter("@CasualLeavesUtilized", request["CasualLeavesUtilized"]);
                param[9] = new SqlParameter("@EarnLeaves", request["EarnLeaves"]);
                param[10] = new SqlParameter("@EarnLeavesUtilized", request["EarnLeavesUtilized"]);
                param[11] = new SqlParameter("@Active", request["Active"]);
                param[12] = new SqlParameter("@UserName", request["UserName"]);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Add_Update_Leaves", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }



        [HttpPost, ActionName("GetorEditDepartmentsData")]
        public string GetorEditDepartmentsData([FromBody] JsonObject request)
        {
            try
            {

                var dbHandler = new PayRolldbhandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@DataTypeID", request["DataTypeID"]);
                param[1] = new SqlParameter("@DepartmentId", request["DepartmentId"]);
                param[2] = new SqlParameter("@Active", request["Active"]);
                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_Get_Edit_Department", param);
                return JsonConvert.SerializeObject(dt);

            }
            catch (Exception ex)
            {

                return ex.Message;

            }
        }


        [HttpPost, ActionName("AddorUpdateDepartments")]
        public string AddorUpdateDepartments([FromBody] JsonObject request)
        {
            try
            {
                var dbHandler = new PayRolldbhandler();
                var param = new SqlParameter[4];
                param[0] = new SqlParameter("@DataTypeId", request["DataTypeId"]);
                param[1] = new SqlParameter("@DepartmentId", request["DepartmentId"]);
                param[2] = new SqlParameter("@DepartmentName", request["DepartmentName"]);
                param[3] = new SqlParameter("@UserName", request["UserName"]);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Add_Update_Departments", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }




        [HttpPost, ActionName("GetorEditBankDetailsData")]
        public string GetorEditBankDetailsData([FromBody] JsonObject request)
        {
            try
            {

                var dbHandler = new PayRolldbhandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@DataTypeID", request["DataTypeID"]);
                param[1] = new SqlParameter("@BankId", request["BankId"]);
                param[2] = new SqlParameter("@Active", request["Active"]);
                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_Get_Edit_BankDetails", param);
                return JsonConvert.SerializeObject(dt);

            }
            catch (Exception ex)
            {

                return ex.Message;

            }
        }


        [HttpPost, ActionName("AddorUpdateBankDetails")]
        public string AddorUpdateBankDetails([FromBody] JsonObject request)
        {
            try
            {
                var dbHandler = new PayRolldbhandler();
                var param = new SqlParameter[7];
                param[0] = new SqlParameter("@DataTypeId", request["DataTypeId"]);
                param[1] = new SqlParameter("@BankId", request["BankId"]);
                param[2] = new SqlParameter("@BankName", request["BankName"]);
                param[3] = new SqlParameter("@BankBranch", request["BankBranch"]);
                param[4] = new SqlParameter("@IFSCCode", request["IFSCCode"]);
                param[5] = new SqlParameter("@Active", request["Active"]);
                param[6] = new SqlParameter("@UserName", request["UserName"]);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Add_Update_BankDetails", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }







        [HttpPost, ActionName("GetorEditEmployeeDetailsData")]
        public string GetorEditEmployeeDetailsData([FromBody] JsonObject request)
        {
            try
            {

                var dbHandler = new PayRolldbhandler();
                var param = new SqlParameter[4];
                param[0] = new SqlParameter("@DataTypeID", request["DataTypeID"]);
                param[1] = new SqlParameter("@EmployeeID", request["EmployeeID"]);
                param[2] = new SqlParameter("@DepartmentID", request["DepartmentID"]);
                param[3] = new SqlParameter("@Active", request["Active"]);
                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_Get_Edit_EmployeeDetails", param);
                return JsonConvert.SerializeObject(dt);

            }
            catch (Exception ex)
            {

                return ex.Message;

            }
        }
        
        public class NPSData {
        
        public int DataTypeID { get; set; }
        public int EmployeeID { get; set; }
        public int FinancialYearID { get; set; }
        public int MonthID { get; set; }
        public int NPSId { get; set; }
        public bool Active { get; set; }



        }

        [HttpPost, ActionName("GetEditNPS")]
        public string GetEditNPS([FromBody] NPSData data)
        {
            try
            {
                var dbHandler = new PayRolldbhandler();
                var param = new SqlParameter[6];
                param[0] = new SqlParameter("@DataTypeID", data.DataTypeID);
                param[1] = new SqlParameter("@EmployeeID", data.EmployeeID);
                param[2] = new SqlParameter("@FinancialYearID", data.FinancialYearID);
                param[3] = new SqlParameter("@MonthID", data.MonthID);
                param[4] = new SqlParameter("@NPSId", data.NPSId);
                param[5] = new SqlParameter("@Active", data.Active);
                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_Get_Edit_NPS", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        public class EmpDetails
        {
            public int DataTypeId { get; set; }
            public int EmployeeID { get; set; }
            public string EmployeeCode { get; set; }
            public string EmployeeName { get; set; }
            public int DesignationId { get; set; }
            public int DepartmentId { get; set; }
            public DateTime DOB { get; set; }
            public DateTime DOJ { get; set; }
            public DateTime DOR { get; set; }
            public DateTime DesignationName { get; set; }
            public DateTime DepartmentName { get; set; }
            public string Gender { get; set; }
            
            public string Empstatus { get; set; }
            public string IncrementMonth { get; set; }
            public string ScaleType { get; set; }
            public string PanNO { get; set; }
          
            public string CPS_NPS { get; set; }
            public string PranNo { get; set; }
            public string GPFNo { get; set; }
            public string TSGLINo { get; set; }
            
            public string AccountNumber { get; set; }
            public string IFSCCode { get; set; }
           
            
            public bool Active { get; set; }
            public string UserName { get; set; }

        }




        [HttpPost, ActionName("AddorUpdateEmployeeDetails")]
        public HttpResponseMessage AddorUpdateEmployeeDetails([FromBody] EmpDetails data)
        {
            try
            {

                var dbHandler = new PayRolldbhandler();
                var param = new SqlParameter[22];
                param[0] = new SqlParameter("@DataTypeId", data.DataTypeId);
                param[1] = new SqlParameter("@EmployeeID", data.EmployeeID);
                param[2] = new SqlParameter("@EmployeeCode", data.EmployeeCode);
                param[3] = new SqlParameter("@EmployeeName", data.EmployeeName);
                param[4] = new SqlParameter("@DOB", data.DOB);
                param[5] = new SqlParameter("@DOJ", data.DOJ);
                param[6] = new SqlParameter("@DOR", data.DOR);
                param[7] = new SqlParameter("@DesignationId", data.DesignationId);
                param[8] = new SqlParameter("@DepartmentId", data.DepartmentId);
                param[9] = new SqlParameter("@Gender", data.Gender);
                param[10] = new SqlParameter("@Empstatus", data.Empstatus);
                param[11] = new SqlParameter("@IncrementMonth", data.IncrementMonth);
                param[12] = new SqlParameter("@ScaleType", data.ScaleType);
                param[13] = new SqlParameter("@PanNO", data.PanNO);
                param[14] = new SqlParameter("@CPS_NPS", data.CPS_NPS);
                param[15] = new SqlParameter("@PranNo", data.PranNo);
                param[16] = new SqlParameter("@GPFNo", data.GPFNo);
                param[17] = new SqlParameter("@TSGLINo", data.TSGLINo);
                param[18] = new SqlParameter("@AccountNumber", data.AccountNumber);
                param[19] = new SqlParameter("@IFSCCode", data.IFSCCode);
                param[20] = new SqlParameter("@Active", data.Active);
                param[21] = new SqlParameter("@UserName", data.UserName);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Add_Update_EmployeeDetails", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;

            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("SP_Get_PinListForFeePayment", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }


        [HttpPost, ActionName("GetBankBranchbyName")]
        public string GetBankBranchbyName([FromBody] JsonObject request)
        {
            try
            {

                var dbHandler = new PayRolldbhandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@BankName", request["BankName"]);
                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_Get_BankName", param);
                return JsonConvert.SerializeObject(dt);

            }

            catch (Exception ex)
            {

                return ex.Message;

            }
        }

        [HttpPost, ActionName("GetBranchIFSC")]
        public string GetBranchIFSC([FromBody] JsonObject request)
        {
            try
            {

                var dbHandler = new PayRolldbhandler();
                var param = new SqlParameter[2];
                param[1] = new SqlParameter("@BankName", request["BankName"]);
                param[0] = new SqlParameter("@BankBranch", request["BankBranch"]);
                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_Get_BankBranchIFSCCode", param);
                return JsonConvert.SerializeObject(dt);

            }

            catch (Exception ex)
            {

                return ex.Message;

            }
        }







        [HttpPost, ActionName("GetorEditSalaryData")]
        public string GetorEditSalaryData([FromBody] SalaryDetails data)
        {
            try
            {

                var dbHandler = new PayRolldbhandler();
                var param = new SqlParameter[5];
                param[0] = new SqlParameter("@DataTypeID", data.DataTypeID);
                param[1] = new SqlParameter("@EmployeeSalaryDetailsId", data.EmployeeSalaryDetailsId);
                param[2] = new SqlParameter("@DepartmentId", data.DepartmentId);
                param[3] = new SqlParameter("@EmployeeId", data.EmployeeId);
                param[4] = new SqlParameter("@Active", data.Active);
                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_Get_Edit_EmployeeSalaryDetails", param);
                return JsonConvert.SerializeObject(dt);

            }
            catch (Exception ex)
            {

                return ex.Message;

            }
        }


        public class SalaryDetails
        {
            public int DataTypeId { get; set; }
            public int EmployeeSalaryDetailsId { get; set; }
            public int DataTypeID { get; set; }
            public int DepartmentId { get; set; }

            public bool Active { get; set; }
            public int EmployeeId { get; set; }
            public string CurrentBasicAmount { get; set; }
            public string InterimRelief { get; set; }
            public float CCA { get; set; }
            public float PP { get; set; }
            public float FPI { get; set; }
            public float TG_Increment { get; set; }
            public float ConveyanceAllowance { get; set; }
            public float Medical { get; set; }
            public string NCI { get; set; }
            public float NCIAmount { get; set; }
            public string UserName { get; set; }
        }


        [HttpPost, ActionName("AddorUpdateSalary")]
        public string AddorUpdateSalary([FromBody] SalaryDetails data)
        {
            try
            {
                var dbHandler = new PayRolldbhandler();
                var param = new SqlParameter[15];
                param[0] = new SqlParameter("@DataTypeId", data.DataTypeId);
                param[1] = new SqlParameter("@EmployeeSalaryDetailsId", data.EmployeeSalaryDetailsId);
                param[2] = new SqlParameter("@DepartmentId", data.DepartmentId);
                param[3] = new SqlParameter("@EmployeeId", data.EmployeeId);
                param[4] = new SqlParameter("@CurrentBasicAmount", data.CurrentBasicAmount);
                param[5] = new SqlParameter("@InterimRelief", data.InterimRelief);
                param[6] = new SqlParameter("@CCA", data.CCA);
                param[7] = new SqlParameter("@PP", data.PP);
                param[8] = new SqlParameter("@FPI", data.FPI);
                param[9] = new SqlParameter("@TG_Increment", data.TG_Increment);
                param[10] = new SqlParameter("@ConveyanceAllowance", data.ConveyanceAllowance);
                param[11] = new SqlParameter("@Medical", data.Medical);
                param[12] = new SqlParameter("@NCI", data.NCI);
                param[13] = new SqlParameter("@NCIAmount", data.NCIAmount);
                param[14] = new SqlParameter("@UserName", data.UserName);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Add_Update_EmployeeSalaryDetails", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }





        [HttpPost, ActionName("GetorEditFinancialYear")]
        public string GetorEditFinancialYear([FromBody] FinancialDetails data)
        {
            try
            {

                var dbHandler = new PayRolldbhandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@DataTypeID", data.DataTypeID);
                param[1] = new SqlParameter("@FinancialYearId", data.FinancialYearId);
                param[2] = new SqlParameter("@Active", data.Active);
                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_Get_Edit_FinancialYear", param);
                return JsonConvert.SerializeObject(dt);

            }
            catch (Exception ex)
            {

                return ex.Message;

            }
        }


        public class FinancialDetails
        {
            public int DataTypeId { get; set; }
            public int DataTypeID { get; set; }

            public bool Active { get; set; }
            public int FinancialYearId { get; set; }
            public string FinancialStartYear { get; set; }

            public string FinancialYear { get; set; }
            public string UserName { get; set; }
        }


        [HttpPost, ActionName("AddorUpdateFinancialYear")]
        public string AddorUpdateFinancialYear([FromBody] FinancialDetails data)
        {
            try
            {
                var dbHandler = new PayRolldbhandler();
                var param = new SqlParameter[5];
                param[0] = new SqlParameter("@DataTypeId", data.DataTypeId);
                param[1] = new SqlParameter("@FinancialYearId", data.FinancialYearId);
                param[2] = new SqlParameter("@FinancialStartYear", data.FinancialStartYear);
                param[3] = new SqlParameter("@FinancialYear", data.FinancialYear);
                param[4] = new SqlParameter("@UserName", data.UserName);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Add_Update_FinancialYear", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }



        [HttpPost, ActionName("GetorEditAdvance")]
        public string GetorEditAdvance([FromBody] AdvanceDetails data)
        {
            try
            {

                var dbHandler = new PayRolldbhandler();
                var param = new SqlParameter[6];
                param[0] = new SqlParameter("@DataTypeID", data.DataTypeID);
                param[1] = new SqlParameter("@EmployeeId", data.EmployeeId);
                param[2] = new SqlParameter("@FinancialYearID", data.FinancialYearID);
                param[3] = new SqlParameter("@MonthID", data.MonthID);
                param[4] = new SqlParameter("@AdvancesId", data.AdvancesId);
                param[5] = new SqlParameter("@Active", data.Active);
                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_Get_Edit_Advances", param);
                return JsonConvert.SerializeObject(dt);

            }
            catch (Exception ex)
            {

                return ex.Message;

            }
        }


        public class AdvanceDetails
        {
            public int DataTypeId { get; set; }
            public int DataTypeID { get; set; }
            public int EmployeeId { get; set; }

            public int AdvancesId { get; set; }
            public int EmployeeID { get; set; }
            public int FinancialYearID { get; set; }
            public int MonthId { get; set; }
            public int MonthID { get; set; }
            public int AdvanceTypeId { get; set; }
            public int AdvanceAmount { get; set; }
            public int AdvanceNoOfMonths { get; set; }
            public int AdvanceEmiStartMonth { get; set; }
            public bool Active { get; set; }

            public string UserName { get; set; }



        }


        [HttpPost, ActionName("AddorUpdateAdvance")]
        public string AddorUpdateAdvance([FromBody] AdvanceDetails data)
        {
            try
            {

                var dbHandler = new PayRolldbhandler();
                var param = new SqlParameter[10];
                param[0] = new SqlParameter("@DataTypeId", data.DataTypeId);
                param[1] = new SqlParameter("@AdvancesId", data.AdvancesId);
                param[2] = new SqlParameter("@EmployeeID", data.EmployeeID);
                param[3] = new SqlParameter("@FinancialYearID", data.FinancialYearID);
                param[4] = new SqlParameter("@MonthId", data.MonthId);
                param[5] = new SqlParameter("@AdvanceTypeId", data.AdvanceTypeId);
                param[6] = new SqlParameter("@AdvanceAmount", data.AdvanceAmount);
                param[7] = new SqlParameter("@AdvanceNoOfMonths", data.AdvanceNoOfMonths);
                param[8] = new SqlParameter("@AdvanceEmiStartMonth", data.AdvanceEmiStartMonth);
                param[9] = new SqlParameter("@UserName", data.UserName);


                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_Add_Update_Advances", param);
                return JsonConvert.SerializeObject(dt);

            }
            catch (Exception ex)
            {

                return ex.Message;

            }
        }

        public class AllowanceData
        {

            public int DataTypeID { get; set; }
            public int AllowanceID { get; set; }
            public int DepartmentID { get; set; }
            
            public bool Active { get; set; }



        }

        [HttpPost, ActionName("GetEditAllowance")]
        public string GetEditAllowance([FromBody] AllowanceData data)
        {
            try
            {
                var dbHandler = new PayRolldbhandler();
                var param = new SqlParameter[4];
                param[0] = new SqlParameter("@DataTypeID", data.DataTypeID);
                param[1] = new SqlParameter("@AllowanceID", data.AllowanceID);
                param[2] = new SqlParameter("@DepartmentID", data.DepartmentID);
                param[3] = new SqlParameter("@Active", data.Active);
                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_Get_Edit_CommonAllowances", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpPost, ActionName("AddorUpdateAllowance")]
        public string AddorUpdateAllowance([FromBody] JsonObject request)
        {
            try
            {
                var dbHandler = new PayRolldbhandler();
                var param = new SqlParameter[7];
                param[0] = new SqlParameter("@DataTypeID", request["DataTypeID"]);
                param[1] = new SqlParameter("@AllowanceID", request["AllowanceID"]);
                param[2] = new SqlParameter("@DepartmentID", request["DepartmentID"]);
                param[3] = new SqlParameter("@DA", request["DA"]);
                param[4] = new SqlParameter("@HRA", request["HRA"]);
                param[5] = new SqlParameter("@IR", request["IR"]);
                param[6] = new SqlParameter("@UserName", request["UserName"]);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Add_Update_CommonAllowances", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }


        [HttpPost, ActionName("GetorEditSplPay")]
        public string GetorEditSplPay([FromBody] JsonObject request)
        {
            try
            {

                var dbHandler = new PayRolldbhandler();
                var param = new SqlParameter[6];
                param[0] = new SqlParameter("@DataTypeID", request["DataTypeID"]);
                param[1] = new SqlParameter("@EmployeeID", request["EmployeeID"]);
                param[2] = new SqlParameter("@FinancialYearID", request["FinancialYearID"]);
                param[3] = new SqlParameter("@MonthID", request["MonthID"]);
                param[4] = new SqlParameter("@SplPayId", request["SplPayId"]);
                param[5] = new SqlParameter("@Active", request["Active"]);
                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_Get_Edit_SplPay", param);
                return JsonConvert.SerializeObject(dt);

            }
            catch (Exception ex)
            {

                return ex.Message;

            }
        }

        [HttpPost, ActionName("AddorUpdateSplPay")]
        public string AddorUpdateSplPay([FromBody] JsonObject request)
        {
            try
            {
                var dbHandler = new PayRolldbhandler();
                var param = new SqlParameter[8];
                param[0] = new SqlParameter("@DataTypeId", request["DataTypeId"]);
                param[1] = new SqlParameter("@SplPayId", request["SplPayId"]);
                param[2] = new SqlParameter("@FinancialYearId", request["FinancialYearId"]);
                param[3] = new SqlParameter("@MonthID", request["MonthID"]);
                param[4] = new SqlParameter("@EmployeeID", request["EmployeeID"]);
                param[5] = new SqlParameter("@SplPayAmount", request["SplPayAmount"]);
                param[6] = new SqlParameter("@Active", request["Active"]);
                param[7] = new SqlParameter("@UserName", request["UserName"]);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Add_Update_SplPay", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }



        [HttpPost, ActionName("GetorEditLIC")]
        public string GetorEditLIC([FromBody] JsonObject request)
        {
            try
            {

                var dbHandler = new PayRolldbhandler();
                var param = new SqlParameter[5];
                param[0] = new SqlParameter("@DataTypeID", request["DataTypeID"]);
                param[1] = new SqlParameter("@EmployeeID", request["EmployeeID"]);
                param[2] = new SqlParameter("@PolicyID", request["PolicyID"]); 
                param[3] = new SqlParameter("@LICID", request["LICID"]);
                param[4] = new SqlParameter("@Active", request["Active"]);
                var dt = dbHandler.ReturnDataWithStoredProcedure("SP_Get_Edit_LIC", param);
                return JsonConvert.SerializeObject(dt);

            }
            catch (Exception ex)
            {

                return ex.Message;

            }
        }



        [HttpPost, ActionName("AddorUpdateLIC")]
        public string AddorUpdateLIC([FromBody] JsonObject request)
        {
            try
            {
                var dbHandler = new PayRolldbhandler();
                var param = new SqlParameter[9];
                param[0] = new SqlParameter("@DataTypeID", request["DataTypeID"]);
                param[1] = new SqlParameter("@LICID", request["LICID"]);
                param[2] = new SqlParameter("@EmployeeID", request["EmployeeID"]);
                param[3] = new SqlParameter("@PolicyID", request["PolicyID"]);
                param[4] = new SqlParameter("@PolicyNumber", request["PolicyNumber"]);
                param[5] = new SqlParameter("@PremiumAmount", request["PremiumAmount"]);
                param[6] = new SqlParameter("@LICAmountJson", request["LICAmountJson"]);
                param[7] = new SqlParameter("@Active", request["Active"]);
                param[8] = new SqlParameter("@UserName", request["UserName"]);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Add_Update_LIC", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }









    };
};
