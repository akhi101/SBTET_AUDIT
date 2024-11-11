using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using SoftwareSuite.Models.Database;

namespace SoftwareSuite.Services
{
    public class CcicSystemUserService
    {
        public DataSet GetCcicUserLogin(ccicdbHandler dbHandler, string UserName, string UserPassword, string IPAddress, string SessionID)
        {

            DataSet ds = new DataSet();
            try
            {
                using (var conn = new SqlConnection(dbHandler.GetConnectionString()))
                {
                    using (var cmd = new SqlCommand("SP_Get_UserLoginPermission", conn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add(new SqlParameter("@UserName", UserName));
                        cmd.Parameters.Add(new SqlParameter("@UserPassword", UserPassword));
                        cmd.Parameters.Add(new SqlParameter("@IPAddress", IPAddress));
                        cmd.Parameters.Add(new SqlParameter("@SessionID", SessionID));
                        conn.Open();
                        var da = new SqlDataAdapter(cmd);
                        da.Fill(ds);
                        conn.Close();
                    }
                }
                return ds;


            }
            catch (Exception ex)
            {

                ccicdbHandler.SaveErorr("SystemProgram", 0, ex.Message);
                throw ex;
            }

        }

        public DataSet GetCcicUserLogout(ccicdbHandler dbHandler, string UserName, string IPAddress, string SessionID)
        {

            DataSet ds = new DataSet();
            try
            {
                using (var conn = new SqlConnection(dbHandler.GetConnectionString()))
                {
                    using (var cmd = new SqlCommand("SP_Set_UserLogout", conn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add(new SqlParameter("@UserName", UserName));
                        cmd.Parameters.Add(new SqlParameter("@IPAddress", IPAddress));
                        cmd.Parameters.Add(new SqlParameter("@SessionID", SessionID));
                        conn.Open();
                        var da = new SqlDataAdapter(cmd);
                        da.Fill(ds);
                        conn.Close();
                    }
                }
                return ds;


            }
            catch (Exception ex)
            {

                ccicdbHandler.SaveErorr("SystemProgram", 0, ex.Message);
                throw ex;
            }

        }





        public DataTable GetCcicForgetPassword(ccicdbHandler dbHandler, string UserName, Int64 UserMobile)
        {
            try
            {
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@UserName", UserName);
                param[1] = new SqlParameter("@UserMobile", UserMobile);
                var res = dbHandler.ReturnDataWithStoredProcedureTable("SP_GET_ForgotPassword", param);
                return res;

            }
            catch (Exception ex)
            {

                ccicdbHandler.SaveErorr("SystemProgram", 0, ex.Message);
                throw ex;
            }
        }

        public DataTable GetCcicForgotPassword(ccicdbHandler dbHandler, string UserName)
        {
            try
            {
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@UserName", UserName);
                var res = dbHandler.ReturnDataWithStoredProcedureTable("SP_Get_Password", param);
                return res;

            }
            catch (Exception ex)
            {

                ccicdbHandler.SaveErorr("SystemProgram", 0, ex.Message);
                throw ex;
            }
        }

        public DataTable GetCcicChangePassword(ccicdbHandler dbHandler, int UserID, string OldPassword, string NewPassword)
        {
            DataTable dt = new DataTable();
            try
            {
                using (SqlConnection conn = new SqlConnection(dbHandler.GetConnectionString()))
                {
                    using (var cmd = new SqlCommand("SP_Set_ChangePassword", conn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add(new SqlParameter("@UserID", UserID));
                        cmd.Parameters.Add(new SqlParameter("@OldPassword", OldPassword));
                        cmd.Parameters.Add(new SqlParameter("@NewPassword", NewPassword));
                        conn.Open();
                        var da = new SqlDataAdapter(cmd);
                        da.Fill(dt);
                        conn.Close();
                    }
                }
                return dt;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public int GetCcicCheckOldPassword(ccicdbHandler dbHandler, string OldPassword, int LoggedUserId)
        {
            try
            {
                string StrQuery = "";
                StrQuery = "SELECT isnull(count(*),0) as cnt from SystemUser where LoginPassword ='" + OldPassword + "' and CcicSysUserID = " + LoggedUserId + " ";
                return Convert.ToInt32(dbHandler.ExcutiveScalar(StrQuery));
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public DataTable GetCcicUserModules(ccicdbHandler ccicdbHandler, int UserTypeID)
        {
            try
            {
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@UserTypeID", UserTypeID);
                return ccicdbHandler.ReturnDataWithStoredProcedureTable("SP_Get_UserModules", param);

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public DataTable GetCcicUserSubModules(ccicdbHandler dbHandler,int UserTypeID, int ModuleID)
        {
            try
            {
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@UserTypeID", UserTypeID);
                param[1] = new SqlParameter("@ModuleID", ModuleID);
             
                return dbHandler.ReturnDataWithStoredProcedureTable("SP_Get_UserSubModules", param);

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public DataTable GetCcicUserInnerSubModules(ccicdbHandler dbHandler, int UserTypeID, int SubModuleID)
        {
            try
            {
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@UserTypeID", UserTypeID);
                param[1] = new SqlParameter("@SubModuleID", SubModuleID);

                return dbHandler.ReturnDataWithStoredProcedureTable("SP_Get_UserInnerSubModules", param);

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
