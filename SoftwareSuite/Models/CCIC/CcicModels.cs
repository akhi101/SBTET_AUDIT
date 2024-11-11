using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SoftwareSuite.Models.CCIC
{
    public class CcicModels
    {
        public int CourseID { get; set; }
        public string CourseCode { get; set; }
        public string CourseName { get; set; }
        public string CourseDuration { get; set; }
        public string CourseQualification { get; set; }
    }

    public class CcicInstitutions
    {
        public int InstitutionID { get; set; }
        public int InstitutionCode { get; set; }

        public string InstitutionName { get; set; }

        public string InstitutionAddress { get; set; }
        public string DistrictName { get; set; }

        public string InstitutionWebSite { get; set; }




    }


    public class CcicInstitutionsByCourse
    {

        public int InstitutionID { get; set; }
        
        public int InstitutionCode { get; set; }

        public string InstitutionName { get; set; }
        public string InstitutionAddress { get; set; }
        public string DistrictName { get; set; }

        public string InstitutionWebSite { get; set; }

    }

    public class CcicCoursesByInstitution
    {
        public int CourseID { get; set; }

        public string CourseCode { get; set; }

        public string CourseName { get; set; }
    
        public string CourseDuration { get; set; }

        public string CourseQualification { get; set; }
    }




}
