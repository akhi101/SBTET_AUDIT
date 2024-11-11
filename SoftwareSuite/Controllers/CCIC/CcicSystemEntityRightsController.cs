using SoftwareSuite.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SoftwareSuite.BLL;
using Newtonsoft.Json;
using SoftwareSuite.Models.CCIC;

namespace SoftwareSuite.Controllers.CCIC
{
    public class CcicSystemEntityRightsController : BaseController
    {
        public string GetCcicUserModules(int UserTypeID)
        {
            CcicSystemUserBLL CcicSystemUserBLL = new CcicSystemUserBLL();
            IEnumerable<CcicSystemModules> SystemGroups = CcicSystemUserBLL.GetCcicUserModules(UserTypeID);

            return JsonConvert.SerializeObject(SystemGroups);
        }

        public string GetCcicUserSubModules(int UserTypeID,int ModuleID)
        {
            CcicSystemUserBLL CcicSystemUserBLL = new CcicSystemUserBLL();
            IEnumerable<CcicSystemSubModules> SystemGroups = CcicSystemUserBLL.GetCcicUserSubModules(UserTypeID,ModuleID);
            return JsonConvert.SerializeObject(SystemGroups);
        }

        public string GetCcicUserInnerSubModules(int UserTypeID, int SubModuleID)
        {
            CcicSystemUserBLL CcicSystemUserBLL = new CcicSystemUserBLL();
            IEnumerable<CcicSystemInnerSubModules> SystemGroups = CcicSystemUserBLL.GetCcicUserInnerSubModules(UserTypeID, SubModuleID);
            return JsonConvert.SerializeObject(SystemGroups);
        }
    }
}
