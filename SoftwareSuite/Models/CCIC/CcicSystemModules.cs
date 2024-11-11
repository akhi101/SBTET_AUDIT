using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SoftwareSuite.Models.CCIC
{
    public class CcicSystemModules
    {
        public string ModuleName { get; set; }
        public string ModuleRouteName { get; set; }
        public string ModuleCardClassName { get; set; }
        public int ModuleID { get; set; }

        public int UserTypeID { get; set; }
    }

    public class CcicSystemSubModules
    {
        public string SubModuleName { get; set; }
        public string SubModuleRouteName { get; set; }
        public string ModuleCardClassName { get; set; }
        public int ModuleID { get; set; }

        public int UserTypeID { get; set; }

    }

    public class CcicSystemInnerSubModules
    {
        public string InnerSubModuleName { get; set; }
        public string InnerSubModuleRouteName { get; set; }
        public string ModuleCardClassName { get; set; }
        public int SubModuleID { get; set; }

        public int UserTypeID { get; set; }

    }
}
