using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SoftwareSuite.Models
{
    public class SystemModules
    {
        public string ModuleName { get; set; }
        public string ModuleRouteName { get; set; }
        public string Class { get; set; }
        public int Id { get; set; }

    }

    public class SystemSubModules
    {
        public string SubModuleName { get; set; }
        public string SubModuleRouteName { get; set; }
        public string Class { get; set; }
        public int id { get; set; }

    }
}