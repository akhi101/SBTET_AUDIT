using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SoftwareSuite.Models.IVC
{
    public class IVCAuthToken 
    {
        public int UserTypeID { get; set; }

        public int UserID { get; set; }

        public string RegistrationID { get; set; }

        public string UserTypeName { get; set; }
        public DateTime ExpiryDate { get; set; }
    }
}
