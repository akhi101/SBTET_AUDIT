using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SoftwareSuite.Models.Security
{
    public class AuthToken
    {
        //internal object collegeType;

        public int UserId { get; set; }
        public int UserTypeId { get; set; }
        public string CollegeCode { get; set; }
        public string collegeType { get; set; }
        public DateTime ExpiryDate { get; set; }
    }
}