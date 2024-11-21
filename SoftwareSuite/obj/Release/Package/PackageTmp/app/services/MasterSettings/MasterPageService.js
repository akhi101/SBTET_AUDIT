define(['app'], function (app) {
    app.service("MasterPageService", function (DataAccessService) {

        this.setBranch = function (BranchName, BranchCode) {
            var paramObject = { "BranchName": BranchName, "BranchCode": BranchCode };
            return DataAccessService.getDataWithPara('MasterPage/setBranch', paramObject);
        }
       
        this.SetMobileApp = function (IsUpdateReleased, UpdateDescription, UpdateVersion, IsInMaintainance, ManitainanceDescription, DataType) {
            var paramObject = {
                "IsUpdateReleased": IsUpdateReleased, "UpdateDescription": UpdateDescription, "UpdateVersion": UpdateVersion,
                "IsInMaintainance": IsInMaintainance, "ManitainanceDescription": ManitainanceDescription, "DataType": DataType
            };
            return DataAccessService.getDataWithPara('MasterPage/SetMobileApp', paramObject);
        }

        this.UpdateMobileApp = function (IsUpdateReleased, UpdateDescription, UpdateVersion, IsInMaintainance, ManitainanceDescription, DataType,Id) {
            var paramObject = {
                "IsUpdateReleased": IsUpdateReleased, "UpdateDescription": UpdateDescription, "UpdateVersion": UpdateVersion,
                "IsInMaintainance": IsInMaintainance, "ManitainanceDescription": ManitainanceDescription, "DataType": DataType,"Id":Id
            };
            return DataAccessService.getDataWithPara('MasterPage/UpdateMobileApp', paramObject);
        }


        this.GetBranches = function () {
            return DataAccessService.getDataWithPara('MasterPage/GetBranches');
        };

        this.GetMobileAppUpdates = function () {
            return DataAccessService.getDataWithPara('MasterPage/GetMobileAppUpdates');
        };
        
        this.EditBranches = function (Id) {
            var paramObject = { "Id": Id };

            return DataAccessService.getDataWithPara('MasterPage/EditBranches', paramObject);
        };

        this.deleteBranch = function (Id) {
            var paramObject = { "Id": Id };

            return DataAccessService.getDataWithPara('MasterPage/deleteBranch', paramObject);
        };

        
        this.ActiveBranchStatus = function (Id, ActiveFlag) {
            var paramObject = { "Id": Id,"ActiveFlag": ActiveFlag };

            return DataAccessService.getDataWithPara('MasterPage/ActiveBranchStatus', paramObject);
        };

        this.updateBranches = function (id, BranchName, BranchCode) {
            var paramObject = { "id": id, "BranchName": BranchName, "BranchCode": BranchCode };
            return DataAccessService.getDataWithPara('MasterPage/UpdateBranches', paramObject);
        };



        this.setSemester = function (Semester) {
            var paramObject = { "Semester": Semester };
            return DataAccessService.getDataWithPara('MasterPage/SetSemester', paramObject);
        };

        this.GetSemester = function () {
            return DataAccessService.getDataWithPara('MasterPage/GetSemester');
        };


        this.EditSemester = function (Id) {
            var paramObject = { "Id": Id };

            return DataAccessService.getDataWithPara('MasterPage/EditSemester', paramObject);
        };

        this.deleteSemester = function (Id) {
            var paramObject = { "Id": Id };
            return DataAccessService.getDataWithPara('MasterPage/deleteSemester', paramObject);
        };

       

        this.updateSemester = function (Id, SemesterName) {
            var paramObject = { "Id": Id, "SemesterName": SemesterName };
            return DataAccessService.getDataWithPara('MasterPage/updateSemester', paramObject);
        };

        //Banks
        this.setBanksNames = function (Bank) {
            var paramObject = { "Bank": Bank };
            return DataAccessService.getDataWithPara('MasterPage/setBanksNames', paramObject);
        };

        this.GetBank = function () {
            return DataAccessService.getDataWithPara('MasterPage/GetBank');
        };

        this.EditBank = function (id) {
            var paramObject = { "id": id };
            return DataAccessService.getDataWithPara('MasterPage/EditBank', paramObject);
        };

        this.deleteBank = function (Id) {
            var paramObject = { "Id": Id };
            return DataAccessService.getDataWithPara('MasterPage/deleteBank', paramObject);
        };
        this.updateBank = function (Id, Bank) {
            var paramObject = { "Id": Id, "Bank": Bank };
            return DataAccessService.getDataWithPara('MasterPage/updateBank', paramObject);
        };
        //Castes
        this.setCaste = function (Caste) {
            var paramObject = { "Caste": Caste };
            return DataAccessService.getDataWithPara('MasterPage/setCaste', paramObject);
        };

        this.GetCastes = function () {
            return DataAccessService.getDataWithPara('MasterPage/GetCastes');
        };
        this.EditCaste = function (id) {
            var paramObject = { "id": id };
            return DataAccessService.getDataWithPara('MasterPage/EditCaste', paramObject);
        };
        this.deleteCaste = function (Id) {
            var paramObject = { "Id": Id };
            return DataAccessService.getDataWithPara('MasterPage/deleteCaste', paramObject);
        };
        this.updatecaste = function (id, CasteName) {
            var paramObject = { "Id": id, "CasteName": CasteName };
            return DataAccessService.getDataWithPara('MasterPage/updatecaste', paramObject);
        };
        //dist
        this.setDist = function (Disteict) {
            var paramObject = { "Disteict": Disteict };
            return DataAccessService.getDataWithPara('MasterPage/setDist', paramObject);
        };

        this.GetDistrictes = function () {
            return DataAccessService.getDataWithPara('MasterPage/GetDistrictes');
        };
       
        this.deleteDist = function (Id) {
            var paramObject = { "Id": Id };
            return DataAccessService.getDataWithPara('MasterPage/deleteDist', paramObject);
        };
        this.updateDist = function (Id, District) {
            var paramObject = { "Id": Id, "District": District };
            return DataAccessService.getDataWithPara('MasterPage/updateDist', paramObject);
        };

        //set mandales
        this.setMandal = function (Mandal) {
            var paramObject = { "Mandal": Mandal };
            return DataAccessService.postData('MasterPage/setMandal', paramObject);
        };

        this.GetMandal = function () {
            return DataAccessService.getDataWithPara('MasterPage/GetMandal');
        };
        this.EditMandal = function (Id) {
            var paramObject = { "Id": Id };
            return DataAccessService.getDataWithPara('MasterPage/EditMandal', paramObject);
        };
        this.deleteMandal = function (Id) {
            var paramObject = { "Id": Id };
            return DataAccessService.getDataWithPara('MasterPage/deleteMandal', paramObject);
        };
        this.updateMandal = function (Id, Mandal) {
            var paramObject = { "Id": Id, "Mandal": Mandal };
            return DataAccessService.getDataWithPara('MasterPage/updateMandal', paramObject);
        };
        //Rolestype

        this.GetRoleDatas = function () {
            return DataAccessService.getDataWithPara('MasterPage/GetRoleDatas');
        };
        this.SetRollType = function (RoleName, Puropse) {
            var paramObject = { "RoleName": RoleName, "Puropse": Puropse };
            return DataAccessService.postData('MasterPage/SetRollType', paramObject);
        };
        this.EditData = function (Id) {
              var paramObject = { "Id": Id };
              return DataAccessService.getDataWithPara('MasterPage/EditData', paramObject);
        };

     
        this.Deletedata = function (Id) {
            var paramObject = { "Id": Id };
            return DataAccessService.getDataWithPara('MasterPage/Deletedata', paramObject);
        };
        this.UpdateRolltype = function (Id, RoleName, Puropse) {
            var paramObject = { "Id": Id, "RoleName": RoleName, "Puropse": Puropse };
            return DataAccessService.getDataWithPara('MasterPage/UpdateRolltype', paramObject);
        };
        //Set User Type
        this.GetRolltype = function () {
            return DataAccessService.getDataWithPara('MasterPage/GetRolltype');
        };
        this.SetUserType = function (RoleId, UserName) {
            var paramObject = { "RoleId": RoleId, "UserName": UserName };
            return DataAccessService.postData('MasterPage/SetUserType', paramObject);
        };
        this.GetUserNames = function () {
            return DataAccessService.getDataWithPara('MasterPage/GetUserNames');
        };

    });
});