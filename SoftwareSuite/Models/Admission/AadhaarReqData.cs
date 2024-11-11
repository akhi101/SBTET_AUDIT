using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SoftwareSuite.Models.Admission
{
    public class AadhaarReqData
    {
        public string AadhaarNo { get; set; }
        public string ServiceType { get; set; }
        public string ReqXml { get; set; }
    }

    public class BmaAttendeeRegReq
    {
        public string apikey { get; set; }
        public BmaReq request { get; set; }
    }

    public class BmaReq
    {
        public string attdcodefalg { get; set; }
        public string orgcode { get; set; }
        public string orgname { get; set; }
        public string branch { get; set; }
        public string semester { get; set; }
        public string aadhaarno { get; set; }
        public string attdname { get; set; }
        public string attdcode { get; set; }
        public string category { get; set; }
        public string designation { get; set; }
        public string gender { get; set; }
        public string email { get; set; }
        public string mobile { get; set; }
    }

    public class BmaTransferReq
    {
        public string orgcode { get; set; }
        public string branch { get; set; }
        public string semester { get; set; }
        public string ref1 { get; set; }
        public string ref2 { get; set; }
        public string attendeeid { get; set; }
        public string remarks { get; set; }      

    }
    public class TransferReq
    {
        public string pin { get; set; }
        public string collegecode { get; set; }
        public string oldCollegecode { get; set; }
        public string attendeeid { get; set; }
        public string branch { get; set; }
        public string semester { get; set; }
        public string remarks { get; set; }

    }

    public class BmaRes
    {
        public string respcode { get; set; }
        public string respdesc { get; set; }
        public string attdid { get; set; }
        public string attendeecode { get; set; }
    }

    public class SetDates
    {
        public int Schemeid { get; set; }
        public int SemId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int AcademicYearId { get; set; }
    }
    public class BmaLogId
    {
        public int id { get; set; }
    }
}
