using SoftwareSuite.Models.Database;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace SoftwareSuite.Services
{
    public class TwshServices
    {
        public DataSet GetStudentHallTicket(Twshdbandler dbhandler, string ApplicationNo, string DateofBirth)
        {
            try
            {
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@ApplicationNumber", ApplicationNo);
                param[1] = new SqlParameter("@DOB", DateofBirth);
                return dbhandler.ReturnDataWithStoredProcedure("SP_SET_HallTicketDetails", param);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}