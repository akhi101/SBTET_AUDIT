define(['app'], function (app) {
    app.service("MasterPageService", function (DataAccessService) {

        this.setBranch = function (BranchName) {
            var paramObject = { "BranchName": BranchName };
            return DataAccessService.getDataWithPara('api/MasterPage/setBranch', paramObject);
        }

        this.GetBranches = function () {
            return DataAccessService.getDataWithPara('api/MasterPage/GetBranches');
        };


        this.EditBranches = function (Id) {
            var paramObject = { "Id": Id };

            return DataAccessService.getDataWithPara('api/MasterPage/EditBranches', paramObject);
        };

        this.deleteBranch = function (Id) {
            var paramObject = { "Id": Id };

            return DataAccessService.getDataWithPara('api/MasterPage/deleteBranch', paramObject);
        };
       

        
      

        this.updateBranches = function (Id, BranchName) {
            var paramObject = { "Id": Id, "BranchName": BranchName };
            return DataAccessService.postData('api/MasterPage/updateBranches', paramObject);
        };



        this.SetSemester = function (Semester) {
            var paramObject = { "Semester": Semester };
            return DataAccessService.postData('api/MasterPage/SetSemester', paramObject);
        };

        this.GetSemester = function () {
            return DataAccessService.getDataWithPara('api/MasterPage/GetSemester');
        };


        this.EditSemester = function (Id) {
            var paramObject = { "Id": Id };

            return DataAccessService.getDataWithPara('api/MasterPage/EditSemester', paramObject);
        };

        this.deleteSemester = function (Id) {
            var paramObject = { "Id": Id };
            return DataAccessService.getDataWithPara('api/MasterPage/deleteSemester', paramObject);
        };

        this.updateSemester = function (Id, SemesterName) {
            var paramObject = { "Id": Id, "SemesterName": SemesterName };
            return DataAccessService.postData('api/MasterPage/updateSemester', paramObject);
        };

        //Banks
        this.setBanksNames = function (Bank) {
            var paramObject = { "Bank": Bank };
            return DataAccessService.postData('api/MasterPage/setBanksNames', paramObject);
        };

        this.GetBank = function () {
            return DataAccessService.getDataWithPara('api/MasterPage/GetBank');
        };

        this.EditBank = function (id) {
            var paramObject = { "id": id };
            return DataAccessService.getDataWithPara('api/MasterPage/EditBank', paramObject);
        };

        this.deleteBank = function (Id) {
            var paramObject = { "Id": Id };
            return DataAccessService.getDataWithPara('api/MasterPage/deleteBank', paramObject);
        };
        this.updateBank = function (Id, Bank) {
            var paramObject = { "Id": Id, "Bank": Bank };
            return DataAccessService.postData('api/MasterPage/updateBank', paramObject);
        };
        //Castes
        this.setCaste = function (Caste) {
            var paramObject = { "Caste": Caste };
            return DataAccessService.postData('api/MasterPage/setCaste', paramObject);
        };

        this.GetCastes = function () {
            return DataAccessService.getDataWithPara('api/MasterPage/GetCastes');
        };
        this.EditCaste = function (id) {
            var paramObject = { "id": id };
            return DataAccessService.getDataWithPara('api/MasterPage/EditCaste', paramObject);
        };
        this.deleteCaste = function (Id) {
            var paramObject = { "Id": Id };
            return DataAccessService.getDataWithPara('api/MasterPage/deleteCaste', paramObject);
        };
        this.updatecaste = function (Id, CasteName) {
            var paramObject = { "Id": Id, "CasteName": CasteName };
            return DataAccessService.postData('api/MasterPage/updatecaste', paramObject);
        };
        //dist
        this.setDist = function (Disteict) {
            var paramObject = { "Disteict": Disteict };
            return DataAccessService.postData('api/MasterPage/setDist', paramObject);
        };

        this.GetDistrictes = function () {
            return DataAccessService.getDataWithPara('api/MasterPage/GetDistrictes');
        };
        this.EditDist = function (Id) {
            var paramObject = { "Id": Id };
            return DataAccessService.getDataWithPara('api/MasterPage/EditDist', paramObject);
        };
        this.deleteDist = function (Id) {
            var paramObject = { "Id": Id };
            return DataAccessService.getDataWithPara('api/MasterPage/deleteDist', paramObject);
        };
        this.updateDist = function (Id, District) {
            var paramObject = { "Id": Id, "District": District };
            return DataAccessService.postData('api/MasterPage/updateDist', paramObject);
        };

        //set mandales
        this.setMandaesl = function (Mandal) {
            var paramObject = { "Mandal": Mandal };
            return DataAccessService.postData('api/MasterPage/setMandaesl', paramObject);
        };

        this.GetMandales = function () {
            return DataAccessService.getDataWithPara('api/MasterPage/GetMandales');
        };
        this.EditMandales = function (Id) {
            var paramObject = { "Id": Id };
            return DataAccessService.getDataWithPara('api/MasterPage/EditMandales', paramObject);
        };
        this.deleteMandal = function (Id) {
            var paramObject = { "Id": Id };
            return DataAccessService.getDataWithPara('api/MasterPage/deleteMandal', paramObject);
        };
        this.updatemndales = function (Id, Mandal) {
            var paramObject = { "Id": Id, "Mandal": Mandal };
            return DataAccessService.postData('api/MasterPage/updatemndales', paramObject);
        };
     

    });
});