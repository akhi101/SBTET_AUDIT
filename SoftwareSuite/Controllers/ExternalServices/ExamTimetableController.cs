using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Newtonsoft.Json;
using SoftwareSuite.Models.Database;

namespace SoftwareSuite.Controllers.ExternalServices
{
    public class ExamTimetableController : ApiController
    {
        public dbHandler db { get; set; }

        public ExamTimetableController()
        {
            db = new dbHandler();
        }

        public string GetData(string ApiKey, int? ExamType = null)
        {
            var param = new SqlParameter[2];
            param[0] = new SqlParameter("@ApiKey", ApiKey);
            param[1] = new SqlParameter("@ExamTypeId", ExamType);
            var data = db.ReturnDataWithStoredProcedure("usp_VND_GetExamTimeTable", param);
            return JsonConvert.SerializeObject(data);
        }
    }
}
