using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SoftwareSuite.Models.Admission
{
    public class AbasWorkingDays
    {
        public string respcode { get; set; }
        public string respdesc { get; set; }
        public string totaldays { get; set; }
        public string fromdate { get; set; }
        public string todate { get; set; }
        public string count { get; set; }
        public List<AbasWorkingDaysOrg> orglist { get; set; }
    }

    public class AbasWorkingDaysOrg
    {
        public string orgcode { get; set; }
        public string holidays { get; set; }
        public string weekends { get; set; }
        public string workingdays { get; set; }
    }
}