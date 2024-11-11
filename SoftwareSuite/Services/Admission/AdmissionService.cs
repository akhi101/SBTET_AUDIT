using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using Newtonsoft.Json;
using SoftwareSuite.Models.Database;

namespace SoftwareSuite.Services.Admission
{
    public class AdmissionService
    {

        //new AdmissionReport sp

        public DataSet GetDataForAdmissionDashboard(dbHandler dbhandler, string CollegeCode, int UserId, int AcademicYearId)
        {
            try
            {

                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@CollegeCode", CollegeCode);
                param[1] = new SqlParameter("@UserId", UserId);
                param[2] = new SqlParameter("@AcademicYearId", AcademicYearId);
                return dbhandler.ReturnDataWithStoredProcedure("USP_Admission_GET_DashBoradReports_old", param);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_Admission_GET_DashBoradReports_old", 0, ex.Message);
                throw ex;
            }
        }

        //public DataSet GetDataForAdmissionDashboard(dbHandler dbhandler, int UserId, string CollegeId, int AcademicYearId)
        //{
        //    try
        //    {
        //        var param = new SqlParameter[3];
        //        param[0] = new SqlParameter("@UserId", UserId);
        //        param[1] = new SqlParameter("@CollegeCode", CollegeId);
        //        param[2] = new SqlParameter("@AcademicYear_Id", AcademicYearId);
        //        return dbhandler.ReturnDataWithStoredProcedure("usp_GetDataForAdmissionDashboard", param);
        //    }
        //    catch (Exception ex)
        //    {
        //        dbHandler.SaveErorr("usp_GetDataForAdmissionDashboard", 0, ex.Message);
        //        throw ex;
        //    }
        //}
        public DataSet GetCollegesSchemeSemInfo()
        {
            try
            {
                var dbHandler = new dbHandler();
                string StrQuery = "";
                StrQuery = "exec usp_Get_Colleges_SCHEME_SEM_INFO";
                return dbHandler.ReturnDataSet(StrQuery);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("usp_Get_Colleges_SCHEME_SEM_INFO", 0, ex.Message);
                throw ex;
            }
        }
        public DataSet GetAcademicYearsActive()
        {
            try
            {
                var dbHandler = new dbHandler();
                string StrQuery = "";
                StrQuery = "exec USP_GetAcademicYearsActive";
                return dbHandler.ReturnDataSet(StrQuery);
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("USP_GetAcademicYearsActive", 0, ex.Message);
                throw ex;
            }
        }



    }
}
