using SoftwareSuite.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SoftwareSuite.BLL;
using Newtonsoft.Json;

namespace SoftwareSuite.Controllers.SystemAdministration
{
    public class SystemEntityRightsController : BaseController
    {
        public string GetModulesbyRole(Int32 UserTypeId)
        {
            SystemUserBLL SystemUserBLL = new SystemUserBLL();
            IEnumerable<SystemModules> SystemGroups = SystemUserBLL.GetModulesbyRole(UserTypeId);

            return JsonConvert.SerializeObject(SystemGroups);
        }

        public string GetSubModulesbyRole(Int32 UserTypeId, Int32 moduleId)
        {
            SystemUserBLL SystemUserBLL = new SystemUserBLL();
            IEnumerable<SystemSubModules> SystemGroups = SystemUserBLL.GetSubModulesbyRole(UserTypeId, moduleId);
            return JsonConvert.SerializeObject(SystemGroups);
        }
    }
}