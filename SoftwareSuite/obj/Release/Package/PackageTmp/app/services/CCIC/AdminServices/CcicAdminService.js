define(['app'], function (app) {
    app.service("CcicAdminService", function (DataAccessService) {


        this.GetCcicRecentNews = function () {

            var promise = DataAccessService.getDataWithPara('api/CcicAdminService/GetCcicRecentNews');
            return promise;
        }

        this.GetRecentNews = function () {

            var promise = DataAccessService.getDataWithPara('api/CcicAdminService/GetRecentNews');
            return promise;
        }

        this.GetAllRecentNews = function () {

            var promise = DataAccessService.getDataWithPara('api/CcicAdminService/GetAllRecentNews');
            return promise;
        }

        this.GetAllCcicModules = function () {

            var promise = DataAccessService.getDataWithPara('api/CcicAdminService/GetAllCcicModules');
            return promise;
        }

      


        this.GetCcicUserTypes = function () {
            var promise = DataAccessService.getDataWithPara('api/CcicAdminService/GetCcicUserTypes');
            return promise;


        }


        this.GetCcicModules = function () {

            var promise = DataAccessService.getDataWithPara('api/CcicAdminService/GetCcicModules');
            return promise;
        }

        this.GetCcicSubModules = function () {
            var promise = DataAccessService.getDataWithPara('api/CcicAdminService/GetCcicSubModules');
            return promise;
        }

     
        this.GetCcicModuleColours = function () {
            var promise = DataAccessService.getDataWithPara('api/CcicadminService/GetCcicModuleColours');
            return promise;
        }


        this.getAllCcicRecentNews = function () {

                var promise = DataAccessService.getDataWithPara('api/CcicAdminService/getAllCcicRecentNews');
                return promise;
            }

        //this.SetCcicRecentNewsInactive = function (RecentNewsID,Active) {
        //    var paramObj = { "RecentNewsID": RecentNewsID, "Active": Active };
        //    var promise = DataAccessService.getDataWithPara('api/CcicAdminService/SetCcicRecentNewsInactive', paramObj);
        //        return promise;
        //}


        this.AddCcicRecentNews = function (RecentNewsText, FromDate, ToDate, UserName) {
            var paramObj = { "RecentNewsText": RecentNewsText, "FromDate": FromDate, "ToDate": ToDate, "UserName": UserName };
            var promise = DataAccessService.getDataWithPara('api/CcicAdminService/AddCcicRecentNews', paramObj);
                return promise;
        }

        this.CcicRecentNewsUpdate = function (RecentNewsID,RecentNewsText, FromDate, ToDate, UserName) {
            var paramObj = { "RecentNewsID": RecentNewsID, "RecentNewsText": RecentNewsText, "FromDate": FromDate, "ToDate": ToDate, "UserName": UserName };
            var promise = DataAccessService.getDataWithPara('api/CcicAdminService/CcicRecentNewsUpdate', paramObj);
            return promise;
        }


           


        this.GetCcicUserModules = function (UserTypeID) {
                var paramObj = { "UserTypeID": UserTypeID };
            var promise = DataAccessService.getDataWithPara('api/CcicAdminService/GetCcicUserModules', paramObj);
                return promise;
            }

        this.GetCcicUserSubModules = function (UserTypeID,ModuleID) {
            var paramObj = { "UserTypeID": UserTypeID,"ModuleID": ModuleID };
            var promise = DataAccessService.getDataWithPara('api/CcicAdminService/GetCcicUserSubModules', paramObj);
                return promise;
            }

      
        
    });
});