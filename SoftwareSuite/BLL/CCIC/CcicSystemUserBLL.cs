using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SoftwareSuite.Models.Security;
using SoftwareSuite.Models.Database;
using SoftwareSuite.Services;
using System.Data;
using Newtonsoft.Json;
using SoftwareSuite.BLL.CCIC;
using SoftwareSuite.Models.CCIC;
using SoftwareSuite.Models;

namespace SoftwareSuite.BLL
{
    public class CcicSystemUserBLL
    {
        public CcicSystemUserAuth GetCcicUserLogin(string UserName, string UserPassword, string IPAddress, string SessionID)
        {
            try
            {
                CcicSystemUserService CcicSystemUserService = new CcicSystemUserService();
                ccicdbHandler dbHandler = new ccicdbHandler();
                DataSet tblUsersList = new DataSet();
                tblUsersList = CcicSystemUserService.GetCcicUserLogin(dbHandler, UserName, UserPassword, IPAddress, SessionID);
                var ds = JsonConvert.SerializeObject(tblUsersList);
                List<CcicSystemUser> User = tblUsersList.Tables[1].DataTableToList<CcicSystemUser>();
                List<CcicUserAuth> Userstat = tblUsersList.Tables[0].DataTableToList<CcicUserAuth>();
                CcicSystemUserAuth CcicSystemUserAuth = new CcicSystemUserAuth()
                {
                    CcicSystemUser = User,
                    CcicUserAuth = Userstat,
                };

                //  branchWiseReportDataList.Add(branchWiseReportData);
                return CcicSystemUserAuth;

                //  return User;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public class logoutResp 
        { 
            public string responseDesc {get;set;}
            public string responseCode { get; set; }
        }
        public logoutResp GetCcicUserLogout(string UserName, string IPAddress, string SessionID)
        {
            try
            {
                CcicSystemUserService CcicSystemUserService = new CcicSystemUserService();
                ccicdbHandler dbHandler = new ccicdbHandler();
                DataSet tblUsersList = new DataSet();
                tblUsersList = CcicSystemUserService.GetCcicUserLogout(dbHandler, UserName, IPAddress, SessionID);
                var ds = JsonConvert.SerializeObject(tblUsersList);
                logoutResp rs = new logoutResp();
                rs.responseCode = "200";
                rs.responseDesc = "logout successful.";
                return rs;

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


     



        public class CcicSystemRes
        {
            public String ResponceCode;
            public String ResponceDescription;
            public String UserPassword;
           
        }

        public CcicSystemRes GetCcicForgetPassword(string UserName, Int64 UserMobile)
        {
            try
            {
                CcicSystemUserService CcicSystemUserService = new CcicSystemUserService();
                ccicdbHandler dbHandler = new ccicdbHandler();
                DataTable tblUsersList = new DataTable();
                tblUsersList = CcicSystemUserService.GetCcicForgetPassword(dbHandler, UserName, UserMobile);
                // return JsonConvert.SerializeObject(tblUsersList);  
                string status = Convert.ToString(tblUsersList.Rows[0]["ResponceCode"]);
                if (status == "200")
                {
                    CcicSystemRes res = new CcicSystemRes();
                    res.UserPassword = Convert.ToString(tblUsersList.Rows[0]["UserPassword"]);
                    res.ResponceCode = Convert.ToString(tblUsersList.Rows[0]["ResponceCode"]);
                    res.ResponceDescription = Convert.ToString(tblUsersList.Rows[0]["ResponceDescription"]);
                    return res;
                }
                else
                {
                    CcicSystemRes res = new CcicSystemRes();
                    res.UserPassword = Convert.ToString(tblUsersList.Rows[0]["UserPassword"]);
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

        public CcicSystemRes GetCcicForgotPassword(string UserName)
        {
            try
            {
                CcicSystemUserService CcicSystemUserService = new CcicSystemUserService();
                ccicdbHandler dbHandler = new ccicdbHandler();
                DataTable tblUsersList = new DataTable();
                tblUsersList = CcicSystemUserService.GetCcicForgotPassword(dbHandler, UserName);
                // return JsonConvert.SerializeObject(tblUsersList);  
                string status = Convert.ToString(tblUsersList.Rows[0]["ResponceCode"]);
                if (status == "200")
                {
                    CcicSystemRes res = new CcicSystemRes();
                    res.UserPassword = Convert.ToString(tblUsersList.Rows[0]["UserPassword"]);
                    res.ResponceCode = Convert.ToString(tblUsersList.Rows[0]["ResponceCode"]);
                    res.ResponceDescription = Convert.ToString(tblUsersList.Rows[0]["ResponceDescription"]);
                    return res;
                }
                else
                {
                    CcicSystemRes res = new CcicSystemRes();
                    res.UserPassword = Convert.ToString(tblUsersList.Rows[0]["UserPassword"]);
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


        public CcicSystemRes GetCcicChangePassword(Int32 UserID, string OldPassword, string NewPassword)
        {
            try
            {
                CcicSystemUserService CcicSystemUserService = new CcicSystemUserService();
                ccicdbHandler dbHandler = new ccicdbHandler();
                DataTable tblUsersList = new DataTable();
                tblUsersList = CcicSystemUserService.GetCcicChangePassword(dbHandler, UserID, OldPassword, NewPassword);
                CcicSystemRes res = new CcicSystemRes();
                res.ResponceCode = Convert.ToString(tblUsersList.Rows[0]["ResponceCode"]);
                res.ResponceDescription = Convert.ToString(tblUsersList.Rows[0]["ResponceDescription"]);
                return res;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public object GetCcicCheckOldPassword(string OldPassword, int LoggedUserId)
        {
            try
            {
                CcicSystemUserService CcicSystemUserService = new CcicSystemUserService();
                ccicdbHandler dbHandler = new ccicdbHandler();
                DataTable tblUsersList = new DataTable();
                return CcicSystemUserService.GetCcicCheckOldPassword(dbHandler, OldPassword, LoggedUserId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public IEnumerable<CcicSystemModules> GetCcicUserModules(Int32 UserTypeID)
        {

            try
            {
                CcicSystemUserService CcicSystemUserService = new CcicSystemUserService();
                ccicdbHandler ccicdbHandler = new ccicdbHandler();
                DataTable tblUsersList = new DataTable();
                tblUsersList = CcicSystemUserService.GetCcicUserModules(ccicdbHandler, UserTypeID);
                List<CcicSystemModules> SystemGroups = tblUsersList.DataTableToList<CcicSystemModules>();
                return SystemGroups;
            }
            catch (Exception ex)
            {
                return null;
                // throw ex;
            }
        }


        public IEnumerable<CcicSystemSubModules> GetCcicUserSubModules(int UserTypeID,Int32 ModuleID)
        {
            try
            {
                CcicSystemUserService CcicSystemUserService = new CcicSystemUserService();
                ccicdbHandler dbHandler = new ccicdbHandler();
                DataTable tblUsersList = new DataTable();
                tblUsersList = CcicSystemUserService.GetCcicUserSubModules(dbHandler,UserTypeID, ModuleID);
                List<CcicSystemSubModules> SystemGroups = tblUsersList.DataTableToList<CcicSystemSubModules>();
                return SystemGroups;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public IEnumerable<CcicSystemInnerSubModules> GetCcicUserInnerSubModules(int UserTypeID, Int32 SubModuleID)
        {
            try
            {
                CcicSystemUserService CcicSystemUserService = new CcicSystemUserService();
                ccicdbHandler dbHandler = new ccicdbHandler();
                DataTable tblUsersList = new DataTable();
                tblUsersList = CcicSystemUserService.GetCcicUserInnerSubModules(dbHandler, UserTypeID, SubModuleID);
                List<CcicSystemInnerSubModules> SystemGroups = tblUsersList.DataTableToList<CcicSystemInnerSubModules>();
                return SystemGroups;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
    }
}
