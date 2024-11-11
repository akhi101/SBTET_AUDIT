using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SoftwareSuite.Models.Security;
using SoftwareSuite.Models.Database;
using SoftwareSuite.Services;
using System.Data;
using Newtonsoft.Json;
using SoftwareSuite.Models;

namespace SoftwareSuite.BLL
{
    public class SystemRes
    {
        public String ResponceCode;
        public String ResponceDescription;
        public String Password;
        public String userType;
        public String UserPassword;
    }
    public class SystemUserBLL
    {

        #region GetMethod      
        //public IEnumerable<SystemUser> GetUserLogin(string UserName, string Password,string Ipaddress)
        //{
        //	try
        //	{
        //		SystemUserService SystemUserService = new SystemUserService();
        //		dbHandler dbHandler = new dbHandler();
        //		DataTable tblUsersList = new DataTable();
        //		tblUsersList = SystemUserService.GetUserLogin(dbHandler, UserName, Password,Ipaddress);               
        //		List<SystemUser> User = tblUsersList.DataTableToList<SystemUser>();
        //		return User;
        //	}
        //	catch (Exception ex)
        //	{
        //		throw ex;
        //	}
        //}


        //public IEnumerable<SystemUser> GetUserLogin(string UserName, string Password)
        //{
        //    try
        //    {
        //        SystemUserService SystemUserService = new SystemUserService();
        //        dbHandler dbHandler = new dbHandler();
        //        DataTable tblUsersList = new DataTable();
        //        tblUsersList = SystemUserService.GetUserLogin(dbHandler, UserName, Password);
        //        var ds = JsonConvert.SerializeObject(tblUsersList);
        //        List<SystemUser> User = tblUsersList.DataTableToList<SystemUser>();
        //       // List<SystemUser> User = tblUsersList.Tables[1].DataTableToList<SystemUser>();
        //        return User;
        //    }
        //    catch (Exception ex)
        //    {
        //        throw ex;
        //    }
        //}

        public SystemUserAuth GetUserLogin(string UserName, string Password, string Ipaddress)
        {
            try
            {
                SystemUserService SystemUserService = new SystemUserService();
                dbHandler dbHandler = new dbHandler();
                DataSet tblUsersList = new DataSet();
                tblUsersList = SystemUserService.GetUserLogin(dbHandler, UserName, Password, Ipaddress);
                var ds = JsonConvert.SerializeObject(tblUsersList);
                // List<SystemUser> User = tblUsersList.DataTableToList<SystemUser>();
                List<SystemUser> User = tblUsersList.Tables[1].DataTableToList<SystemUser>();
                List<UserAuth> Userstat = tblUsersList.Tables[0].DataTableToList<UserAuth>();
                SystemUserAuth SystemUserAuthData = new SystemUserAuth()
                {
                    SystemUser = User,
                    UserAuth = Userstat,
                };

                //  branchWiseReportDataList.Add(branchWiseReportData);
                return SystemUserAuthData;

                //  return User;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<SystemModules> GetModulesbyRole(Int32 UserTypeId)
        {

            try
            {
                SystemUserService SystemUserService = new SystemUserService();
                dbHandler dbHandler = new dbHandler();
                DataTable tblUsersList = new DataTable();
                tblUsersList = SystemUserService.GetModulesbyRole(dbHandler, UserTypeId);
                List<SystemModules> SystemGroups = tblUsersList.DataTableToList<SystemModules>();
                return SystemGroups;
            }
            catch (Exception ex)
            {
                return null;
                // throw ex;
            }
        }
        public IEnumerable<SystemSubModules> GetSubModulesbyRole(Int32 UserTypeId, Int32 moduleId)
        {
            try
            {
                SystemUserService SystemUserService = new SystemUserService();
                dbHandler dbHandler = new dbHandler();
                DataTable tblUsersList = new DataTable();
                tblUsersList = SystemUserService.GetSubModulesbyRole(dbHandler, UserTypeId, moduleId);
                List<SystemSubModules> SystemGroups = tblUsersList.DataTableToList<SystemSubModules>();
                return SystemGroups;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        //      public IEnumerable<SystemUser> GetCheckPreDetails(string TypeFlag, string LoginName, string EmailId, Int64 CellNo)
        //{
        //	try
        //	{
        //		SystemUserService SystemUserService = new SystemUserService();
        //		dbHandler dbHandler = new dbHandler();
        //		DataTable tblUsersList = new DataTable();
        //              tblUsersList = SystemUserService.GetCheckPreDetails(dbHandler, TypeFlag, LoginName, EmailId, CellNo);
        //              //if (tblUsersList.Rows.Count > 0)
        //              //{
        //              //    CommanMethods CommanMethods = new CommanMethods();
        //              //    CommanMethods.SendSMS(CellNo.ToString().Replace(" ",""), " Your Login Password: " + tblUsersList.Rows[0]["LoginPassword"].ToString());
        //              //    tblUsersList.Rows[0]["LoginPassword"] = "";
        //              //}
        //              List<SystemUser> SystemUserList = tblUsersList.DataTableToList<SystemUser>();
        //              return SystemUserList;
        //          }
        //	catch (Exception ex)
        //	{
        //		throw ex;
        //	}
        //}
        public object GetCheckOldPassword(string OldPassword, int LoggedUserId)
        {
            try
            {
                SystemUserService SystemUserService = new SystemUserService();
                dbHandler dbHandler = new dbHandler();
                DataTable tblUsersList = new DataTable();
                return SystemUserService.GetCheckOldPassword(dbHandler, OldPassword, LoggedUserId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public SystemRes GetForgetPassword(string LoginName, Int64 CellNo)
        {
            try
            {
                SystemUserService SystemUserService = new SystemUserService();
                dbHandler dbHandler = new dbHandler();
                DataTable tblUsersList = new DataTable();
                tblUsersList = SystemUserService.GetForgetPassword(dbHandler, LoginName, CellNo);
                // return JsonConvert.SerializeObject(tblUsersList);  
                string status = Convert.ToString(tblUsersList.Rows[0]["ResponceCode"]);
                if (status == "200")
                {
                    SystemRes res = new SystemRes();
                    res.Password = Convert.ToString(tblUsersList.Rows[0]["Password"]);
                    res.ResponceCode = Convert.ToString(tblUsersList.Rows[0]["ResponceCode"]);
                    res.ResponceDescription = Convert.ToString(tblUsersList.Rows[0]["ResponceDescription"]);
                    res.userType = Convert.ToString(tblUsersList.Rows[0]["userType"]);
                    return res;
                }
                else
                {
                    SystemRes res = new SystemRes();
                    res.Password = Convert.ToString(tblUsersList.Rows[0]["Password"]);
                    res.ResponceCode = Convert.ToString(tblUsersList.Rows[0]["ResponceCode"]);
                    res.ResponceDescription = Convert.ToString(tblUsersList.Rows[0]["ResponceDescription"]);
                    res.userType = Convert.ToString(tblUsersList.Rows[0]["userType"]);
                    return res;
                }

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }




        public SystemRes GetForgotPassword(string UserName)
        {
            try
            {
                SystemUserService SystemUserService = new SystemUserService();
                dbHandler dbHandler = new dbHandler();
                DataTable tblUsersList = new DataTable();
                tblUsersList = SystemUserService.GetForgotPassword(dbHandler,  UserName);
                // return JsonConvert.SerializeObject(tblUsersList);  
                string status = Convert.ToString(tblUsersList.Rows[0]["ResponceCode"]);
                if (status == "200")
                {
                    SystemRes res = new SystemRes();
                    res.Password = Convert.ToString(tblUsersList.Rows[0]["Password"]);
                    res.ResponceCode = Convert.ToString(tblUsersList.Rows[0]["ResponceCode"]);
                    res.ResponceDescription = Convert.ToString(tblUsersList.Rows[0]["ResponceDescription"]);
                    return res;
                }
                else
                {
                    SystemRes res = new SystemRes();
                    res.Password = Convert.ToString(tblUsersList.Rows[0]["Password"]);
                    res.ResponceCode = Convert.ToString(tblUsersList.Rows[0]["ResponceCode"]);
                    res.ResponceDescription = Convert.ToString(tblUsersList.Rows[0]["ResponceDescription"]);
                    return res;
                }

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public class systemRes
        {
            public String ResponceCode;
            public String ResponceDescription;
            public String UserPassword;

        }
        public SystemRes GetChangePassword(Int32 UserId, string OldPassword, string NewPassword)
        {
            try
            {
                SystemUserService SystemUserService = new SystemUserService();
                dbHandler dbHandler = new dbHandler();
                DataTable tblUsersList = new DataTable();
                tblUsersList = SystemUserService.GetChangePassword(dbHandler, UserId, OldPassword, NewPassword);
                SystemRes res = new SystemRes();
                res.ResponceCode = Convert.ToString(tblUsersList.Rows[0]["ResponceCode"]);
                res.ResponceDescription = Convert.ToString(tblUsersList.Rows[0]["ResponceDescription"]);
                return res;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        #endregion
        #region "CheckValidation"

        #endregion



    }
}
