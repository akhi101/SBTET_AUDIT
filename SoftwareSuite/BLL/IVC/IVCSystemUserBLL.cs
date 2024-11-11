using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SoftwareSuite.Models.Security;
using SoftwareSuite.Models.Database;
using SoftwareSuite.Services;
using System.Data;
using Newtonsoft.Json;
using SoftwareSuite.BLL;
using SoftwareSuite.Models;
using SoftwareSuite.Services.IVC;
using SoftwareSuite.Models.IVC;

namespace SoftwareSuite.BLL
{
    public class IVCSystemUserBLL
    {
        public IVCSystemUserAuth GetIVCUserLogin(string UserName, string UserPassword, string IPAddress, string SessionID, string Type)
        {
            try
            {
                IVCSystemUserService IVCSystemUserService = new IVCSystemUserService();
                ivcdbHandler dbHandler = new ivcdbHandler();
                DataSet tblUsersList = new DataSet();
                tblUsersList = IVCSystemUserService.GetIVCUserLogin(dbHandler, UserName, UserPassword, IPAddress, SessionID, Type);
                var ds = JsonConvert.SerializeObject(tblUsersList);
                List<IVCSystemUser> User = tblUsersList.Tables[1].DataTableToList<IVCSystemUser>();
                List<IVCUserAuth> Userstat = tblUsersList.Tables[0].DataTableToList<IVCUserAuth>();
                IVCSystemUserAuth IVCSystemUserAuthData = new IVCSystemUserAuth()
                {
                    IVCSystemUser = User,
                    IVCUserAuth = Userstat,
                };

                //  branchWiseReportDataList.Add(branchWiseReportData);
                return IVCSystemUserAuthData;

                //  return User;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public class logoutResp
        {
            public string responseDesc { get; set; }
            public string responseCode { get; set; }
        }
        public logoutResp GetIVCUserLogout(string DataType, string UserName, string IPAddress, string SessionID)
        {
            try
            {
                IVCSystemUserService IVCSystemUserService = new IVCSystemUserService();
                ivcdbHandler dbHandler = new ivcdbHandler();
                DataSet tblUsersList = new DataSet();
                tblUsersList = IVCSystemUserService.GetIVCUserLogout(dbHandler, DataType, UserName, IPAddress, SessionID);
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


    

    }
}
