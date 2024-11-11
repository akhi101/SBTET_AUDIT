using System;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Data.SqlClient;
using SoftwareSuite.Models.Database;
using Newtonsoft.Json;
using RestSharp;
using DocumentFormat.OpenXml.Spreadsheet;
using SoftwareSuite.Models.Security;
using static SoftwareSuite.Controllers.CCIC.CcicAdminServiceController;

namespace SoftwareSuite.Controllers.CCIC
{
    public class CcicPageController : BaseController
    {

        [HttpGet, ActionName("AddCcicModule")]
        public string AddCcicModule(string ModuleName, string ModuleRouteName, int ModuleCardColourID,string UserName)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[4];
                param[0] = new SqlParameter("@ModuleName", ModuleName);
                param[1] = new SqlParameter("@ModuleRouteName", ModuleRouteName);
                param[2] = new SqlParameter("@ModuleCardColourID", ModuleCardColourID);
                param[3] = new SqlParameter("@UserName", UserName);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Add_Module", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }


        [HttpGet, ActionName("UpdateCcicModule")]
        public string UpdateCcicModule(int UpdateType, string UserName, int ModuleID,string ModuleName, bool Active,string ModuleRouteName, int ModuleCardColourID,int ModuleOrder)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[8];
                param[0] = new SqlParameter("@UpdateType", UpdateType);
                param[1] = new SqlParameter("@UserName", UserName);
                param[2]= new SqlParameter("@ModuleID", ModuleID);
                param[3] = new SqlParameter("@ModuleName", ModuleName);
                param[4] = new SqlParameter("@Active", Active);
                param[5] = new SqlParameter("@ModuleRouteName", ModuleRouteName);
                param[6] = new SqlParameter("@ModuleCardColourID", ModuleCardColourID);
                param[7] = new SqlParameter("@ModuleOrder", ModuleOrder);              
                
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Update_Modules", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }

        [HttpGet, ActionName("UpdateCcicSubModule")]
        public string UpdateCcicSubModule(int UpdateType, string UserName, int SubModuleID, string SubModuleName, bool Active, string SubModuleRouteName, int ModuleCardColourID, int SubModuleOrder,int ModuleID)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[9];
                param[0] = new SqlParameter("@UpdateType", UpdateType);
                param[1] = new SqlParameter("@UserName", UserName);
                param[2] = new SqlParameter("@SubModuleID", SubModuleID);
                param[3] = new SqlParameter("@SubModuleName", SubModuleName);
                param[4] = new SqlParameter("@Active", Active);
                param[5] = new SqlParameter("@SubModuleRouteName", SubModuleRouteName);
                param[6] = new SqlParameter("@ModuleCardColourID", ModuleCardColourID);
                param[7] = new SqlParameter("@SubModuleOrder", SubModuleOrder);
                param[8] = new SqlParameter("@ModuleID", ModuleID);



                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Update_SubModules", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }


        [HttpGet, ActionName("AddCcicUserModule")]
        public string AddCcicUserModule(int UserTypeID, int ModuleID, string UserName)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[3];
               
                param[0] = new SqlParameter("@UserTypeID", UserTypeID);
                param[1] = new SqlParameter("@ModuleID", ModuleID);
                param[2] = new SqlParameter("@UserName", UserName);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Add_UserModules", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }


        [HttpGet, ActionName("AddCcicSubModules")]
        public string AddCcicSubModules(int ModuleID,string SubModuleName, string SubModuleRouteName, int ModuleCardColourID, string UserName)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[5];
                param[0] = new SqlParameter("@ModuleID", ModuleID);
                param[1] = new SqlParameter("@SubModuleName", SubModuleName);            
                param[2] = new SqlParameter("@SubModuleRouteName", SubModuleRouteName);
                param[3] = new SqlParameter("@ModuleCardColourID", ModuleCardColourID);
                param[4] = new SqlParameter("@UserName", UserName);

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Add_SubModule", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpGet, ActionName("AddCcicUserSubModules")]
        public string AddCcicUserSubModules(int UserTypeID, int ModuleID, int SubModuleID,string UserName)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[4];
                param[0] = new SqlParameter("@UserTypeID", UserTypeID);
                param[1] = new SqlParameter("@ModuleID", ModuleID);
                param[2] = new SqlParameter("@SubModuleID", SubModuleID);
                param[3] = new SqlParameter("@UserName", UserName);
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Add_UserSubModules", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpGet, ActionName("SetCcicModuleInactive")]
        public string SetCcicModuleInactive(int UpdateType, string UserName, int ModuleID,string ModuleName,bool Active)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[5];
                param[0] = new SqlParameter("@UpdateType", UpdateType);
                param[1] = new SqlParameter("@UserName", UserName);
                param[2] = new SqlParameter("@ModuleID", ModuleID);
                param[3] = new SqlParameter("@ModuleName", ModuleName);
                param[4] = new SqlParameter("@Active", Active);
                

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Update_Modules", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }


        [HttpGet, ActionName("SetCcicSubModuleInactive")]
        public string SetCcicSubModuleInactive(int UpdateType, string UserName, int SubModuleID, string SubModuleName, bool Active)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[5];
                param[0] = new SqlParameter("@UpdateType", UpdateType);
                param[1] = new SqlParameter("@UserName", UserName);
                param[2] = new SqlParameter("@SubModuleID", SubModuleID);
                param[3] = new SqlParameter("@SubModuleName", SubModuleName);
                param[4] = new SqlParameter("@Active", Active);
                


                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Update_SubModules", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpGet, ActionName("SetCcicUserModuleInactive")]
        public string SetCcicUserModuleInactive(int UserModuleID, bool Active, string UserName)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@UserModuleID", UserModuleID);
                param[1] = new SqlParameter("@Active", Active);
                param[2] = new SqlParameter("@UserName", UserName);


                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Inactive_UserModules", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpGet, ActionName("SetCcicUserSubModuleInactive")]
        public string SetCcicUserSubModuleInactive(int UserSubModuleID, bool Active, string UserName)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[3];
                param[0] = new SqlParameter("@UserSubModuleID", UserSubModuleID);
                param[1] = new SqlParameter("@Active", Active);
                param[2] = new SqlParameter("@UserName", UserName);
                
                
             
                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Inactive_UserSubModules", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }




        [HttpGet, ActionName("GetAllCcicModules")]
        public string GetAllCcicModules()
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                string StrQuery = "";
                StrQuery = "exec SP_Get_Modules";
                var res = dbHandler.ReturnDataSet(StrQuery);
                return JsonConvert.SerializeObject(res);
            }
            catch (Exception ex)
            {

                ccicdbHandler.SaveErorr("SP_Get_Modules", 0, ex.Message);
                throw ex;
            }
        }


        [HttpGet, ActionName("GetAllCcicSubModules")]
        public string GetAllCcicSubModules()
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                string StrQuery = "";
                StrQuery = "exec SP_Temp_Get_AllSubModules";
                var res = dbHandler.ReturnDataSet(StrQuery);
                return JsonConvert.SerializeObject(res);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("SP_Temp_Get_AllSubModules", 0, ex.Message);
                throw ex;
            }
        }

        [HttpGet, ActionName("GetCcicUserModules")]
        public string GetCcicUserModules(int UserTypeID)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@UserTypeID", UserTypeID);

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Get_AllUserModules", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }



   



        [HttpGet, ActionName("GetCcicSubModules")]
        public string GetCcicSubModules(int ModuleID)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@ModuleID", ModuleID);

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Get_SubModules", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }


        [HttpGet, ActionName("GetCcicUserSubModules")]
        public string GetCcicUserSubModules(int UserTypeID,int ModuleID)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[2];
                param[0] = new SqlParameter("@UserTypeID", UserTypeID);
                param[1] = new SqlParameter("@ModuleID", ModuleID);

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Get_AllUserSubModules", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }


        public class UserTypesInfo
        {
            public string UserTypeName { get; set; }
            public string UserName { get; set; }
            public int UserTypeID { get; set; }
            public int DataType { get; set; }
            public bool Active { get; set; }
        }

        [HttpPost, ActionName("GetorActiveUserTypes")]
        public string GetorActiveUserTypes([FromBody] UserTypesInfo data)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[1];
                param[0] = new SqlParameter("@DataType", data.DataType);


                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Get_UserTypes", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("SP_Get_UserTypes", 0, ex.Message);
                return ex.Message;
            }

        }



        //[HttpGet, ActionName("GetUserTypes")]
        //public string GetUserTypes()
        //{
        //    try
        //    {
        //        var dbHandler = new ccicdbHandler();
        //        string StrQuery = "";
        //        StrQuery = "exec SP_Get_UserTypes";
        //        var res = dbHandler.ReturnDataSet(StrQuery);
        //        return JsonConvert.SerializeObject(res);
        //    }
        //    catch (Exception ex)
        //    {

        //        dbHandler.SaveErorr("SP_Get_UserTypes", 0, ex.Message);
        //        throw ex;
        //    }
        //}


        [HttpPost, ActionName("AddorUpdateUserTypes")]
        public string AddorUpdateUserTypes([FromBody] UserTypesInfo data)
        {
            try
            {
                var dbHandler = new ccicdbHandler();
                var param = new SqlParameter[5];
                param[0] = new SqlParameter("@DataType", data.DataType);
                param[1] = new SqlParameter("@UserTypeID", data.UserTypeID);
                param[2] = new SqlParameter("@UserTypeName", data.UserTypeName);
                param[3] = new SqlParameter("@Active", data.Active);
                param[4] = new SqlParameter("@UserName", data.UserName);

                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Add_Update_UserTypes", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                dbHandler.SaveErorr("SP_Add_Update_UserTypes", 0, ex.Message);
                return ex.Message;
            }

        }


        [HttpPost, ActionName("AddUser")]
        public string AddUser([FromBody] UsersInfo data)
        {
            var dbHandler = new ccicdbHandler();
            try
            {
                string UserEncryptedPassword = "";

                var res = data.UserPassword.Split(new string[] { "$$@@$$" }, StringSplitOptions.None);
                var crypt = new HbCrypt(res[1]);
                var passencrypt = new HbCrypt();
                string password = crypt.AesDecrypt(res[0]);
                string decryptpassword = passencrypt.AesDecrypt(password);
                UserEncryptedPassword = passencrypt.Encrypt(decryptpassword);
                var param = new SqlParameter[7];
                param[0] = new SqlParameter("@UserTypeID", data.UserTypeID);
                param[1] = new SqlParameter("@NewUserName", data.NewUserName);
                param[2] = new SqlParameter("@UserPassword", UserEncryptedPassword);
                param[3] = new SqlParameter("@NameofUser", data.NameofUser);
                param[4] = new SqlParameter("@MobileNumber", data.MobileNumber);
                param[5] = new SqlParameter("@Email", data.Email);
                param[6] = new SqlParameter("@UserName", data.UserName);



                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Add_User", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                ccicdbHandler.SaveErorr("SP_Add_User", 0, ex.Message);
                return ex.Message;
            }
        }



        [HttpPost, ActionName("UpdateUserDetails")]
        public string UpdateUserDetails([FromBody] UsersInfo newdata)
        {
            var dbHandler = new ccicdbHandler();
            try
            {

                var param = new SqlParameter[8];
                param[0] = new SqlParameter("@UserID", newdata.UserID);
                param[1] = new SqlParameter("@NewUserName", newdata.NewUserName);
                param[2] = new SqlParameter("@UserTypeID", newdata.UserTypeID);
                param[3] = new SqlParameter("@NameofUser", newdata.NameofUser);
                param[4] = new SqlParameter("@Email", newdata.Email);
                param[5] = new SqlParameter("@MobileNumber", newdata.MobileNumber);
                param[6] = new SqlParameter("@Active", newdata.Active);
                param[7] = new SqlParameter("@UserName", newdata.UserName);



                var dt = dbHandler.ReturnDataWithStoredProcedureTable("SP_Update_User", param);
                return JsonConvert.SerializeObject(dt);
            }
            catch (Exception ex)
            {

                ccicdbHandler.SaveErorr("SP_Update_User", 0, ex.Message);
                return ex.Message;
            }
        }




    }
}
