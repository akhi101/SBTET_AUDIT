using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;


namespace SoftwareSuite.Models.IVC
{
    public class IVCSystemUser
    {
 
            public int InstitutionID { get; set; }
            public string InstitutionCode { get; set; }
            public string InstitutionName { get; set; }

            public int UserTypeID { get; set; }
            
            public int UserID { get; set; }


            public int CourseID { get; set; }

            public int AcademicYearID { get; set; }

            public int Batch { get; set; }

            public string UserTypeName { get; set; }








    }

    public class IVCUserAuth
    {
        public string ResponceCode { get; set; }
        public string RespoceDescription { get; set; }
    }

    public class IVCReCaptcha
    {
        public bool Success { get; set; }
        public float score { get; set; }

    }

   


}

