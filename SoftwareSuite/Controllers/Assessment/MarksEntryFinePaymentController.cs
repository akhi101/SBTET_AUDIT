using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;
using Newtonsoft.Json;
using System.Web.Http;
using SoftwareSuite.BLL;
using SoftwareSuite.Models.Database;



namespace SoftwareSuite.Controllers.Assessment
{
    public class MarksEntryFinePaymentController : BaseController
    {
        #region Get Methods
        [HttpGet, ActionName("getPaymentDetails")]
        public string getPaymentDetails(int Amount, string CollegeCode, string BranchCode, int SemId, int SchemeId, int Academicid, int examtypeid, int ExamMonthYearId)
        {
            try
            {
                var dbHandler = new dbHandler();
                var param = new SqlParameter[8];
                param[0] = new SqlParameter("@Amount", Amount);
                param[1] = new SqlParameter("@CollegeCode", CollegeCode);
                param[2] = new SqlParameter("@BranchCode", BranchCode);
                param[3] = new SqlParameter("@SemId", SemId);
                param[4] = new SqlParameter("@SchemeId", SchemeId);
                param[5] = new SqlParameter("@AcademicYearId", Academicid);
                param[6] = new SqlParameter("@examtypeid", examtypeid);
                param[7] = new SqlParameter("@ExamMonthYearId", ExamMonthYearId);
                var dt = dbHandler.ReturnDataWithStoredProcedure("UspCollegeFinePayment", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("UspCollegeFinePayment", 0, ex.Message);
                return ex.Message;
            }

        }


        #endregion
    }
}
