using System.Collections.Generic;
using SoftwareSuite.Models.IVC;

namespace SoftwareSuite.BLL.IVC
{
    public class IVCSystemUserAuth
    {
        public List<IVCSystemUser> IVCSystemUser { get; internal set; }
        public List<IVCUserAuth> IVCUserAuth { get; internal set; }
    }
}
