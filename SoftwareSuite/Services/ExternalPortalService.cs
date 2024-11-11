using System.Data;
using System.Data.SqlClient;
using SoftwareSuite.Models.Database;

namespace SoftwareSuite.Services
{
    public class ExternalPortalService
    {
        private readonly dbHandler db;

        public ExternalPortalService()
        {
            db = new dbHandler();
        }

        public string GetEncryptionKeyByOrgId(string orgId)
        {
            return null;
        }

        public DataTable ResetPassword(string username, string passwd)
        {
            var param = new SqlParameter[2];
            param[0] = new SqlParameter("@Username", username);
            param[1] = new SqlParameter("@Passwd", passwd);
            return db.ReturnDataWithStoredProcedureTable("usp_VND_ResetUserPassword", param);
        }
    }
}
