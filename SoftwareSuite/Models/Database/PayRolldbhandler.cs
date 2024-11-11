using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SoftwareSuite.Models.Database
{
    public class PayRolldbhandler
    {

        bool ExecuteWithTransaction = false;
        SqlTransaction sqlTrn;
        SqlConnection sqlCnn;
        int intTimeOutPeriod = 1500;
        public PayRolldbhandler(bool WithTransaction = false, System.Data.IsolationLevel IsolationLevel = System.Data.IsolationLevel.ReadCommitted)
        {
            try
            {
                ExecuteWithTransaction = WithTransaction;
                sqlCnn = new SqlConnection();
                sqlCnn.ConnectionString = GetConnectionString();
                sqlCnn.Open();
                if (ExecuteWithTransaction == true)
                {
                    sqlTrn = sqlCnn.BeginTransaction(IsolationLevel);
                }
            }
            catch (Exception ex)
            {
                createlog(ex.Message.ToString(), "Connection Open Time Problem");
            }

        }
        public string GetConnectionString()
        {
            try
            {
                var appSettings = ConfigurationManager.AppSettings;
                string ConnString = "Data Source=" + appSettings["PayRollDBServerName"] + ";Initial Catalog=" + appSettings["PayRollDatabaseName"] + ";User ID=" + ConfigurationManager.AppSettings["PayRollDbUserName"].ToString() + "; Password=" + ConfigurationManager.AppSettings["PayRollDbUserPassword"].ToString() + ";Max Pool Size=20000";
                return ConnString;
            }
            catch (Exception ex)
            {
                createlog(ex.Message.ToString(), "Get Connection String Problem");
                throw ex;
            }
        }


        public DataSet ReturnDataWithStoredProcedure(string strProcedureName, SqlParameter[] param)
        {

            SqlDataAdapter daFill = new SqlDataAdapter();
            SqlCommand sqlCmd = new SqlCommand();
            DataSet ds = new DataSet();
            string paramTextCollection = string.Empty;
            string spQuery = $"exec {strProcedureName} ";
            DateTime callStartTime = DateTime.Now;
            var dbgStr = "";
            try
            {

                if (Convert.ToString(ConfigurationManager.AppSettings["EnableDbLog"]) == "1")
                {
                    dbgStr += "----------------------------------------------------------------------------------------------------------------------" + Environment.NewLine; ;

                    if (param != null)
                    {
                        for (int i = 0; i < param.Length; i++)
                        {
                            paramTextCollection += param[i].ParameterName + ":" + param[i].Value;
                            if (param[i].SqlDbType == SqlDbType.VarChar)
                                spQuery += $"'{param[i].Value}',";
                            else
                                spQuery += $"{param[i].Value},";
                        }

                    }
                }



                sqlCmd = new SqlCommand(strProcedureName, sqlCnn);
                if (ExecuteWithTransaction == true)
                {
                    sqlCmd.Transaction = sqlTrn;
                }
                sqlCmd.CommandType = CommandType.StoredProcedure;
                sqlCmd.CommandTimeout = intTimeOutPeriod * 100;
                if (param != null)
                    sqlCmd.Parameters.AddRange(param);
                daFill = new SqlDataAdapter(sqlCmd);
                daFill.Fill(ds);

                if (sqlCnn.State == ConnectionState.Open) { sqlCnn.Close(); }


                if (Convert.ToString(ConfigurationManager.AppSettings["EnableDbLog"]) == "1")
                {
                    DateTime callendTime = DateTime.Now;
                    dbgStr += (strProcedureName + " " + paramTextCollection + DateTime.Now + "Duration : " + (callendTime - callStartTime).ToString()) + Environment.NewLine;
                    dbgStr += (spQuery) + Environment.NewLine;
                    dbgStr += ("----------------------------------------------------------------------------------------------------------------------") + Environment.NewLine;
                    Debug.WriteLine(dbgStr);

                    var t = Task.Run(() => AppendLog(dbgStr));
                }

                return ds;
            }
            catch (Exception ex)
            {
                //ErorrFindBLL ErorrFindBLL = new ErorrFindBLL();
                //ErorrFindBLL.SaveErorr(this.GetType().BaseType.Name, ex.Message.ToString().Replace("'", ""));
                RollBack();
                createlog(ex.Message.ToString(), "Stored Procedure " + strProcedureName + " Problem");
                throw ex;
            }
        }


        private string GetConnString()
        {
            return "";
        }
        public int ExecuteNonQuery(string strQuery)
        {
            // sqlCmd = new SqlCommand();
            int intReturn;
            try
            {
                SqlCommand sqlCmd = new SqlCommand(strQuery, sqlCnn);
                if (ExecuteWithTransaction == true)
                {
                    sqlCmd.Transaction = sqlTrn;
                }
                sqlCmd.CommandTimeout = intTimeOutPeriod;
                intReturn = sqlCmd.ExecuteNonQuery();
                sqlCmd.Dispose();
                if (ExecuteWithTransaction == false)
                {
                    if (sqlCnn.State == ConnectionState.Open) { sqlCnn.Close(); }
                }
                return intReturn;
            }
            catch (Exception ex)
            {
                //ErorrFindBLL ErorrFindBLL = new ErorrFindBLL();
                //ErorrFindBLL.SaveErorr(this.GetType().BaseType.Name, ex.Message.ToString().Replace("'", ""));
                createlog(ex.Message.ToString(), strQuery);
                RollBack();
                throw ex;
            }
        }
        public object ExcutiveScalar(string strQuery)
        {
            object ReturnValue;
            try
            {
                SqlCommand sqlCmd = new SqlCommand(strQuery, sqlCnn);
                if (ExecuteWithTransaction == true)
                {
                    sqlCmd.Transaction = sqlTrn;
                }
                sqlCmd.CommandTimeout = intTimeOutPeriod;
                ReturnValue = sqlCmd.ExecuteScalar();
                if (ExecuteWithTransaction == false)
                {
                    if (sqlCnn.State == ConnectionState.Open) { sqlCnn.Close(); }
                }
                return ReturnValue;
            }
            catch (Exception ex)
            {
                //ErorrFindBLL ErorrFindBLL = new ErorrFindBLL();
                //ErorrFindBLL.SaveErorr(this.GetType().BaseType.Name, ex.Message.ToString().Replace("'", ""));
                RollBack();
                createlog(ex.Message.ToString(), strQuery);
                throw ex;
            }
        }
        public DataTable ReturnData(string strQuery)
        {
            if (Convert.ToString(ConfigurationManager.AppSettings["EnableDbLog"]) == "1")
            {
                var dbgStr = "";
                DateTime callendTime = DateTime.Now;
                dbgStr += (strQuery) + Environment.NewLine;
                dbgStr += ("----------------------------------------------------------------------------------------------------------------------") + Environment.NewLine;
                Debug.WriteLine(dbgStr);

                var t = Task.Run(() => AppendLog(dbgStr));
            }
            SqlDataAdapter daFill = new SqlDataAdapter();
            SqlCommand sqlCmd = new SqlCommand();
            DataTable tbl = new DataTable();
            try
            {
                sqlCmd = new SqlCommand(strQuery, sqlCnn);
                if (ExecuteWithTransaction == true)
                {
                    sqlCmd.Transaction = sqlTrn;
                }
                sqlCmd.CommandTimeout = intTimeOutPeriod;
                daFill = new SqlDataAdapter(sqlCmd);
                daFill.Fill(tbl);
                if (ExecuteWithTransaction == false)
                {
                    if (sqlCnn.State == ConnectionState.Open) { sqlCnn.Close(); }
                }

                return tbl;
            }
            catch (Exception ex)
            {
                //ErorrFindBLL ErorrFindBLL = new ErorrFindBLL();
                //ErorrFindBLL.SaveErorr("SystemProgram", 0, ex.Message);
                //string table = strQuery.ToLower().Substring(strQuery.IndexOf("from")).Split(' ')[1];
                createlog(ex.Message.ToString(), strQuery);
                RollBack();
                throw ex;
            }
        }
        public void Commit()
        {
            try
            {
                if (ExecuteWithTransaction == true)
                {
                    sqlTrn.Commit();
                }
                if (sqlCnn.State == ConnectionState.Open) { sqlCnn.Close(); }
            }
            catch (Exception ex)
            {
                createlog(ex.Message.ToString(), "Commit Method Problem");
                throw ex;
            }
        }
        public void RollBack()
        {
            if (ExecuteWithTransaction == true)
            {
                sqlTrn.Rollback();
            }
            if (sqlCnn.State == ConnectionState.Open) { sqlCnn.Close(); }
        }
        public int ExecuteNonQueryWithStoredProcedure(string strProcedureName, SqlParameter[] param)
        {
            SqlCommand sqlCmd = new SqlCommand();
            int intReturn;
            try
            {
                sqlCmd = new SqlCommand(strProcedureName, sqlCnn);
                if (ExecuteWithTransaction == true)
                {
                    sqlCmd.Transaction = sqlTrn;
                }
                sqlCmd.CommandType = CommandType.StoredProcedure;
                sqlCmd.Parameters.AddRange(param);
                sqlCmd.CommandTimeout = intTimeOutPeriod;
                intReturn = sqlCmd.ExecuteNonQuery();
                sqlCmd.Dispose();
                if (ExecuteWithTransaction == false)
                {
                    if (sqlCnn.State == ConnectionState.Open) { sqlCnn.Close(); }
                }
                return intReturn;
            }
            catch (Exception ex)
            {
                //ErorrFindBLL ErorrFindBLL = new ErorrFindBLL();
                //ErorrFindBLL.SaveErorr(this.GetType().BaseType.Name, ex.Message.ToString().Replace("'", ""));
                RollBack();
                createlog(ex.Message.ToString(), "Stored Procedure " + strProcedureName + " Problem");
                throw ex;

            }
        }
      
        static void AppendLog(string dbgStr)
        {
            // System.IO.File.AppendAllText(ConfigurationManager.AppSettings[""].ToString(), dbgStr + Environment.NewLine);
        }

        public DataTable ReturnDataWithStoredProcedureTable(string strProcedureName, SqlParameter[] param)
        {

            SqlDataAdapter daFill = new SqlDataAdapter();
            SqlCommand sqlCmd = new SqlCommand();
            DataTable ds = new DataTable();
            try
            {
                sqlCmd = new SqlCommand(strProcedureName, sqlCnn);
                if (ExecuteWithTransaction == true)
                {
                    sqlCmd.Transaction = sqlTrn;
                }
                sqlCmd.CommandType = CommandType.StoredProcedure;
                if (param != null)
                    sqlCmd.Parameters.AddRange(param);
                daFill = new SqlDataAdapter(sqlCmd);
                daFill.Fill(ds);
                sqlCmd.CommandTimeout = intTimeOutPeriod;
                if (ExecuteWithTransaction == false)
                {
                    if (sqlCnn.State == ConnectionState.Open) { sqlCnn.Close(); }
                }
                return ds;
            }
            catch (Exception ex)
            {
                //ErorrFindBLL ErorrFindBLL = new ErorrFindBLL();
                //ErorrFindBLL.SaveErorr(this.GetType().BaseType.Name, ex.Message.ToString().Replace("'", ""));
                RollBack();
                createlog(ex.Message.ToString(), "Stored Procedure " + strProcedureName + " Problem");
                throw ex;
            }
        }
        public long ExecuteScalarWithStoredProcedure(string strProcedureName, SqlParameter[] param)
        {
            SqlCommand sqlCmd = new SqlCommand();
            long _ackNo = 0;
            try
            {
                sqlCmd = new SqlCommand(strProcedureName, sqlCnn);
                if (ExecuteWithTransaction == true)
                {
                    sqlCmd.Transaction = sqlTrn;
                }
                sqlCmd.CommandType = CommandType.StoredProcedure;
                sqlCmd.Parameters.AddRange(param);
                sqlCmd.CommandTimeout = intTimeOutPeriod;
                _ackNo = Convert.ToInt64(sqlCmd.ExecuteScalar());
                sqlCmd.Dispose();
                if (ExecuteWithTransaction == false)
                {
                    if (sqlCnn.State == ConnectionState.Open) { sqlCnn.Close(); }
                }
                return _ackNo;
            }
            catch (Exception ex)
            {
                RollBack();
                throw ex;

            }
        }
        public object ExcutiveScalarWithStoreProcedure(string strProcedureName, SqlParameter[] param)
        {
            object ReturnValue;
            SqlDataAdapter daFill = new SqlDataAdapter();
            SqlCommand sqlCmd = new SqlCommand();
            try
            {
                sqlCmd = new SqlCommand(strProcedureName, sqlCnn);
                if (ExecuteWithTransaction == true)
                {
                    sqlCmd.Transaction = sqlTrn;
                }
                sqlCmd.CommandType = CommandType.StoredProcedure;
                sqlCmd.Parameters.AddRange(param);

                sqlCmd.CommandTimeout = intTimeOutPeriod;
                ReturnValue = sqlCmd.ExecuteScalar();
                if (ExecuteWithTransaction == false)
                {
                    if (sqlCnn.State == ConnectionState.Open) { sqlCnn.Close(); }
                }
                return ReturnValue;
            }
            catch (Exception ex)
            {
                //ErorrFindBLL ErorrFindBLL = new ErorrFindBLL();
                //ErorrFindBLL.SaveErorr(this.GetType().BaseType.Name, ex.Message.ToString().Replace("'", ""));
                RollBack();
                createlog(ex.Message.ToString(), "Stored Procedure " + strProcedureName + " Problem");
                throw ex;
            }
        }
        public DataSet ReturnDataWithStoredProcedureTable(string strQuery)
        {
            SqlDataAdapter daFill = new SqlDataAdapter();
            SqlCommand sqlCmd = new SqlCommand();
            DataSet ds = new DataSet();
            try
            {
                sqlCmd = new SqlCommand(strQuery, sqlCnn);
                if (ExecuteWithTransaction == true)
                {
                    sqlCmd.Transaction = sqlTrn;
                }
                sqlCmd.CommandTimeout = intTimeOutPeriod;
                daFill = new SqlDataAdapter(sqlCmd);
                daFill.Fill(ds);
                if (ExecuteWithTransaction == false)
                {
                    if (sqlCnn.State == ConnectionState.Open) { sqlCnn.Close(); }
                }
                return ds;
            }
            catch (Exception ex)
            {
                RollBack();
                throw ex;
            }
        }
        public void createlog(string Message, string Query)
        {
            try
            {
                String str = AppDomain.CurrentDomain.BaseDirectory + "Connectionlogfilepath " + System.DateTime.Now.ToString("ddMMMyyyy") + ".txt";
                using (System.IO.StreamWriter file = new System.IO.StreamWriter(str, true))
                {
                    try
                    {
                        file.WriteLine(System.DateTime.Now.ToString());
                        file.WriteLine(Message);
                        file.WriteLine("");
                    }
                    catch (Exception ex)
                    {

                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }
        public DataSet ReturnDataSet(string strQuery)
        {
            SqlDataAdapter daFill = new SqlDataAdapter();
            SqlCommand sqlCmd = new SqlCommand();
            DataSet ds = new DataSet();
            try
            {
                sqlCmd = new SqlCommand(strQuery, sqlCnn);
                if (ExecuteWithTransaction == true)
                {
                    sqlCmd.Transaction = sqlTrn;
                }
                sqlCmd.CommandTimeout = intTimeOutPeriod;
                daFill = new SqlDataAdapter(sqlCmd);
                daFill.Fill(ds);
                if (ExecuteWithTransaction == false)
                {
                    if (sqlCnn.State == ConnectionState.Open) { sqlCnn.Close(); }
                }
                return ds;
            }
            catch (Exception ex)
            {
                RollBack();
                throw ex;
            }
        }



        internal void SaveErorr(string v1, int v2, string message)
        {
            throw new NotImplementedException();
        }
    }
}
