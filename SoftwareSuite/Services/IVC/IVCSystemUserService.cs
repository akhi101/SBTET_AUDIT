

using System;
using System.Data;
using System.Data.SqlClient;
using SoftwareSuite.Models.Database;

namespace SoftwareSuite.Services.IVC
{
    public class IVCSystemUserService
    {
        public DataSet GetIVCUserLogin(ivcdbHandler ivcdbHandler, string UserName, string UserPassword, string IPAddress, string SessionID, string Type)
        {

            DataSet ds = new DataSet();
            try
            {
                using (var conn = new SqlConnection(ivcdbHandler.GetConnectionString()))
                {
                    if (Type == "student")
                    {
                        using (var cmd = new SqlCommand("SP_Get_StudentLoginPermission", conn))
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
                    else
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
                }
                return ds;


            }
            catch (Exception ex)
            {

                ivcdbHandler.SaveErorr("SystemProgram", 0, ex.Message);
                throw ex;
            }

        }

        public DataSet GetIVCUserLogout(ivcdbHandler ivcdbHandler, string DataType, string UserName, string IPAddress, string SessionID)
        {

            DataSet ds = new DataSet();
            try
            {
                using (var conn = new SqlConnection(ivcdbHandler.GetConnectionString()))
                {
                    using (var cmd = new SqlCommand("SP_Set_User_Student_Logout", conn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add(new SqlParameter("@DataType", DataType));
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

                ivcdbHandler.SaveErorr("SystemProgram", 0, ex.Message);
                throw ex;
            }

        }
    }
}
