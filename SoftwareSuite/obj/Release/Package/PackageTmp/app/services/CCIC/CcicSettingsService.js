define(['app'], function (app) {
    app.service("CcicSettingsService", function (DataAccessService) {

        this.GetCcicModules = function () {
            var promise = DataAccessService.getDataWithPara('CcicPage/GetCcicModules');
            return promise;
        }



       

        this.GetAllCcicModules = function () {
            var promise = DataAccessService.getDataWithPara('CcicPage/GetAllCcicModules');
            return promise;
        }

        this.GetAllCcicSubModules = function () {
            var promise = DataAccessService.getDataWithPara('CcicPage/GetAllCcicSubModules');
            return promise;
        }

        this.GetCcicUserModules = function (UserTypeID) {
            var paramObject = {
                "UserTypeID": UserTypeID
            };
            return DataAccessService.getDataWithPara('CcicPage/GetCcicUserModules', paramObject);
        }

        this.GetAllCcicUserModules = function () {         
            var promise = DataAccessService.getDataWithPara('CcicPage/GetAllCcicUserModules');
            return promise;
        }


        this.GetCcicSubModules = function (ModuleID) {
            var paramObject = {
                "ModuleID": ModuleID
            };
            return DataAccessService.getDataWithPara('CcicPage/GetCcicSubModules', paramObject);
        }

        this.GetAllCcicUserSubModules = function () {
            var promise = DataAccessService.getDataWithPara('CcicPage/GetAllCcicUserSubModules');
            return promise;
        }

        this.GetCcicUserSubModules = function (UserTypeID,ModuleID) {
            var paramObject = {
                "UserTypeID": UserTypeID,"ModuleID": ModuleID
            };
            return DataAccessService.getDataWithPara('CcicPage/GetCcicUserSubModules', paramObject);
        }

       

        this.SetCcicModuleInactive = function (UpdateType, UserName, ModuleID, ModuleName, Active) {
            var paramObject = {
                "UpdateType": UpdateType, "UserName": UserName, "ModuleID": ModuleID, "ModuleName": ModuleName, "Active": Active
            };
            var promise = DataAccessService.postData('CcicPage/SetCcicModuleInactive', paramObject);
            return promise;
        }

        this.SetCcicSubModuleInactive = function (UpdateType, UserName, SubModuleID, SubModuleName, Active) {
            var paramObject = {
                "UpdateType": UpdateType, "UserName": UserName, "SubModuleID": SubModuleID, "SubModuleName": SubModuleName, "Active": Active
            };
            var promise = DataAccessService.postData('CcicPage/SetCcicSubModuleInactive', paramObject);
            return promise;
        }
   


        this.SetCcicUserModuleInactive = function (UserModuleID, Active, UserName ) {
            var paramObject = {
                "UserModuleID": UserModuleID, "Active": Active, "UserName": UserName
            };
            var promise = DataAccessService.postData('CcicPage/SetCcicUserModuleInactive', paramObject);
            return promise;
        }


        this.SetCcicUserSubModuleInactive = function (UserSubModuleID, Active, UserName) {
            var paramObject = {
                "UserSubModuleID": UserSubModuleID, "Active": Active, "UserName": UserName
            };
            var promise = DataAccessService.postData('CcicPage/SetCcicUserSubModuleInactive', paramObject);
            return promise;
        }

  

        this.AddCcicModule = function (ModuleName, ModuleRouteName, ModuleCardColourID, UserName) {
            var paramObj = {
                "ModuleName": ModuleName, "ModuleRouteName": ModuleRouteName, "ModuleCardColourID": ModuleCardColourID, "UserName": UserName
            };
            var promise = DataAccessService.postData('CcicPage/AddCcicModule', paramObj);
            return promise;
        }

        this.UpdateCcicModule = function (UpdateType, UserName, ModuleID, ModuleName, Active, ModuleRouteName, ModuleCardColourID,ModuleOrder) {
            var paramObj = {
                "UpdateType": UpdateType, "UserName": UserName, "ModuleID": ModuleID, "ModuleName": ModuleName, "Active": Active, "ModuleRouteName": ModuleRouteName, "ModuleCardColourID": ModuleCardColourID, "ModuleOrder": ModuleOrder
            };
            var promise = DataAccessService.getDataWithPara('CcicPage/UpdateCcicModule', paramObj);
            return promise;
        }

        this.UpdateCcicSubModule = function (UpdateType, UserName, SubModuleID, SubModuleName, Active, SubModuleRouteName, ModuleCardColourID, SubModuleOrder, ModuleID) {
            var paramObj = {
                "UpdateType": UpdateType, "UserName": UserName, "SubModuleID": SubModuleID, "SubModuleName": SubModuleName, "Active": Active, "SubModuleRouteName": SubModuleRouteName, "ModuleCardColourID": ModuleCardColourID, "SubModuleOrder": SubModuleOrder, "ModuleID": ModuleID
            };
            var promise = DataAccessService.getDataWithPara('CcicPage/UpdateCcicSubModule', paramObj);
            return promise;
        }

        this.AddCcicUserModule = function (UserTypeID, ModuleID, UserName) {
            var paramObj = {
                "UserTypeID": UserTypeID, "ModuleID": ModuleID, "UserName": UserName
            };
            var promise = DataAccessService.postData('CcicPage/AddCcicUserModule', paramObj);
            return promise;
        }

        this.AddCcicSubModules = function (ModuleID,SubModuleName, SubModuleRouteName, ModuleCardColourID, UserName) {
            var paramObject = {
                "ModuleID":ModuleID, "SubModuleName": SubModuleName, "SubModuleRouteName": SubModuleRouteName, "ModuleCardColourID": ModuleCardColourID, "UserName": UserName
            };
            return DataAccessService.postData('CcicPage/AddCcicSubModules', paramObject);
        }


        this.AddCcicUserSubModules = function (UserTypeID, ModuleID, SubModuleID, UserName) {
            var paramObject = {
                "UserTypeID": UserTypeID, "ModuleID": ModuleID, "SubModuleID": SubModuleID, "UserName": UserName
            };
            return DataAccessService.postData('CcicPage/AddCcicUserSubModules', paramObject);
        }


        this.GetUserTypes = function (DataType) {
            var paramObj = {
                "DataType": DataType
            };
            var promise = DataAccessService.postData('CcicPage/GetorActiveUserTypes', paramObj);
            return promise;
        };


        this.GetActiveUserTypes = function (DataType) {
            var paramObj = {
                "DataType": DataType
            };
            var promise = DataAccessService.postData('CcicPage/GetorActiveUserTypes', paramObj);
            return promise;
        };

        this.EditUserTypes = function (UserTypeID) {
            var paramObj = {
                "UserTypeID": UserTypeID
            };
            var promise = DataAccessService.postData('api/CcicAdminService/EditorViewUserTypes', paramObj);
            return promise;
        };

        this.AddUserTypes = function (paramObject) {

            return DataAccessService.postData('CcicPage/AddorUpdateUserTypes', paramObject);
        };

        this.UpdateUserTypes = function (paramObject) {

            return DataAccessService.postData('CcicPage/AddorUpdateUserTypes', paramObject);
        };


        this.GetUsers = function (UserTypeID) {
            var paramObject = { "UserTypeID": UserTypeID };
            return DataAccessService.postData('api/CcicAdminService/GetUsers', paramObject);
        };

        this.EditUsers = function (UserID) {
            var paramObject = { "UserID": UserID };
            return DataAccessService.postData('api/CcicAdminService/GetEditorViewUsers', paramObject);
        };

        this.AddUser = function (paramObject) {

            return DataAccessService.postData('CcicPage/AddUser', paramObject);
        };

        this.UpdateUser = function (paramObject) {

            return DataAccessService.postData('CcicPage/UpdateUserDetails', paramObject);
        };
     
   

    })
})