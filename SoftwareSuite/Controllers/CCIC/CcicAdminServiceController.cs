using System;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Data.SqlClient;
using SoftwareSuite.Models.Database;
using Newtonsoft.Json;
using RestSharp;
using static SoftwareSuite.Controllers.CCIC.CcicPageController;

namespace SoftwareSuite.Controllers.CCIC
{
    public class CcicAdminServiceController : ApiController
{

    [HttpGet, ActionName("GetCcicRecentNews")]
    public HttpResponseMessage GetCcicRecentNews()
    {
        try
        {
            var dbHandler = new ccicdbHandler();
            string StrQuery = "";
            StrQuery = "exec SP_Get_RecentNews";
            return Request.CreateResponse(HttpStatusCode.OK, dbHandler.ReturnDataSet(StrQuery));
        }
        catch (Exception ex)
        {
            dbHandler.SaveErorr("SP_Get_RecentNews", 0, ex.Message);
            return Request.CreateResponse(HttpStatusCode.Gone, ex);
        }

    }


        [HttpGet, ActionName("GetRecentNews")]
        public HttpResponseMessage GetRecentNews()
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                string StrQuery = "";
                StrQuery = "exec SP_Get_RecentNews";
                return Request.CreateResponse(HttpStatusCode.OK, dbHandler.ReturnDataWithStoredProcedureTable(StrQuery));
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("SP_Get_RecentNews", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.Gone, ex);
            }

        }


        [HttpGet, ActionName("GetAllRecentNews")]
        public HttpResponseMessage GetAllRecentNews()
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                string StrQuery = "";
                StrQuery = "exec SP_Get_AllRecentNews";
                return Request.CreateResponse(HttpStatusCode.OK, dbHandler.ReturnDataWithStoredProcedureTable(StrQuery));
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("SP_Get_AllRecentNews", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.Gone, ex);
            }

        }


        [HttpGet, ActionName("GetAllCcicModules")]
        public HttpResponseMessage GetAllCcicModules()
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                string StrQuery = "";
                StrQuery = "exec SP_Get_Modules";
                return Request.CreateResponse(HttpStatusCode.OK, dbHandler.ReturnDataWithStoredProcedureTable(StrQuery));
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("SP_Get_Modules", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.Gone, ex);
            }

        }


        [HttpGet, ActionName("GetCcicModuleColours")]
        public HttpResponseMessage GetCcicModuleColours()
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                string StrQuery = "";
                StrQuery = "exec SP_GetColours";
                return Request.CreateResponse(HttpStatusCode.OK, dbHandler.ReturnDataWithStoredProcedureTable(StrQuery));
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("SP_GetColours", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.Gone, ex);
            }

        }




        //[HttpGet, ActionName("getCcicUserTypes")]
        //public HttpResponseMessage getCcicUserTypes()
        //{
        //    try
        //    {
        //        var dbHandler = new ccicdbHandler();
        //        string StrQuery = "";
        //        StrQuery = "exec SP_Get_UserTypes";
        //        return Request.CreateResponse(HttpStatusCode.OK, dbHandler.ReturnDataWithStoredProcedureTable(StrQuery));
        //    }
        //    catch (Exception ex)
        //    {
        //        dbHandler.SaveErorr("SP_Get_UserTypes", 0, ex.Message);
        //        throw ex;
        //    }
        //}

        [HttpGet, ActionName("SetCcicModuleInactive")]
        public HttpResponseMessage SetCcicModuleInactive(int UserTypeID, int ModuleID, int Active)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@UserTypeID", UserTypeID);
                param[1] = new SqlParameter("@ModuleID", ModuleID);
                param[2] = new SqlParameter("@Active", Active);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Set_ModuleInctive ", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("SP_Set_ModuleInctive ", 0, ex.Message);
                throw ex;
            }

        }





        [HttpGet, ActionName("GetCcicUserModules")]
        public HttpResponseMessage GetCcicUserModules(int UserTypeID)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@UserTypeID", UserTypeID);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Get_UserModules", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("SP_Get_UserModules", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }

        [HttpGet, ActionName("GetCcicSubModulesbyRole")]
        public HttpResponseMessage GetCcicSubModulesbyRole(int UserTypeID, int ModuleID)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@UserTypeID", UserTypeID);
                param[1] = new SqlParameter("@ModuleID", ModuleID);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Get_SubModules ", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("SP_Get_SubModules ", 0, ex.Message);
                throw ex;
            }

        }

        [HttpGet, ActionName("GetAllModulesbyRole")]
        public HttpResponseMessage GetAllModulesbyRole(int UserTypeID)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@UserTypeID", UserTypeID);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Get_AllModules", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("SP_Get_AllModules ", 0, ex.Message);
                throw ex;
            }

        }








        public class RecentNews
    {
        public string RecentNewsID { get; set; }
        public string RecentNewsText { get; set; }
        public int UserTypeID { get; set; }
        public DateTime fromDate { get; set; }
        public DateTime ToDate { get; set; }

    }








    public class RecentNewsData

    {
        public string RecentNewsID { get; set; }

        public string RecentNewsText { get; set; }
        public int UserTypeID { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }

    }



        [HttpGet, ActionName("CcicRecentNewsInactive")]
        public HttpResponseMessage CcicRecentNewsInactive(int RecentNewsID)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@RecentNewsID ", RecentNewsID);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Set_RecentNewsInactive ", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("SP_Set_RecentNewsInactive ", 0, ex.Message);
                throw ex;
            }

        }


        [HttpGet, ActionName("AddCcicRecentNews")]
        public HttpResponseMessage AddCcicRecentNews(string RecentNewsText, string FromDate, string ToDate, string UserName)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[4];
                param[0] = new SqlParameter("@RecentNewsText ", RecentNewsText);
                param[1] = new SqlParameter("@FromDate ", FromDate);    
                param[2] = new SqlParameter("@ToDate ", ToDate);
                param[3] = new SqlParameter("@UserName ", UserName);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Add_RecentNews ", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("SP_Add_RecentNews ", 0, ex.Message);
                throw ex;
            }

        }

        [HttpGet, ActionName("CcicRecentNewsUpdate")]
        public HttpResponseMessage CcicRecentNewsUpdate(int RecentNewsID, string RecentNewsText, DateTime FromDate, DateTime ToDate,string UserName)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[5];
                param[0] = new SqlParameter("@RecentNewsID", RecentNewsID);
                param[1] = new SqlParameter("@RecentNewsText", RecentNewsText);
                param[2] = new SqlParameter("@FromDate", FromDate);
                param[3] = new SqlParameter("@ToDate", ToDate);
                param[4] = new SqlParameter("@UserName", UserName);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Update_RecentNews ", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {
                dbHandler.SaveErorr("SP_Update_RecentNews ", 0, ex.Message);
                throw ex;
            }

        }


        public class UsersInfo
        {
            public int DataType { get; set; }
            public int UserID { get; set; }
            public int UserTypeID { get; set; }
            public string NewUserName { get; set; }
            public string UserPassword { get; set; }
            public string NameofUser { get; set; }
            public string MobileNumber { get; set; }
            public string Email { get; set; }
            public string UserName { get; set; }
            public bool Active { get; set; }



        }


        [HttpPost, ActionName("GetUsers")]
        public HttpResponseMessage GetUsers([FromBody] UsersInfo data)
        {
            var dbHandler = new ccicdbHandler();

            try
            {

                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@UserTypeID", data.UserTypeID);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Get_Users", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {

                ccicdbHandler.SaveErorr("SP_Get_Users", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }


        [HttpPost, ActionName("GetEditorViewUsers")]
        public HttpResponseMessage GetEditorViewUsers([FromBody] UsersInfo data)
        {
            var dbHandler = new ccicdbHandler();

            try
            {

                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@UserID", data.UserID);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Get_Edit_Users", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {

                ccicdbHandler.SaveErorr("SP_Get_Edit_Users", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }


        [HttpPost, ActionName("EditorViewUserTypes")]
        public HttpResponseMessage EditorViewUserTypes([FromBody] UserTypesInfo data)
        {
            var dbHandler = new ccicdbHandler();

            try
            {

                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@UserTypeID", data.UserTypeID);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Get_Edit_UserTypes", param);
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, dt);
                return response;
            }
            catch (Exception ex)
            {

                ccicdbHandler.SaveErorr("SP_Get_Edit_UserTypes", 0, ex.Message);
                return Request.CreateResponse(HttpStatusCode.OK, ex.Message);
            }
        }




    } 
}
