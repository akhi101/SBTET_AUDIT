using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SoftwareSuite.Models.CCIC;

namespace SoftwareSuite.BLL.CCIC
{
    public class CcicSystemUserAuth
    {    
        public List<CcicSystemUser> CcicSystemUser { get; internal set; }

        public List<CcicUserAuth> CcicUserAuth { get; internal set; }
   
    }
}
