define(['app'], function (app) {
    app.service("AcademicYearFeesService", function (DataAccessService) {
        this.AddAcademicYearFees = function (object) {
            var promise = DataAccessService.putData('api/AcademicYearFees/PutAcademicYearFees', object);
            return promise;
        }
        this.UpdateAcademicYearFees = function (object) {
            var promise = DataAccessService.postData('api/AcademicYearFees/PostAcademicYearFees', object);
            return promise;
        }
        this.DeleteAcademicYearFees = function (AcdyrFeesID, UpdLoginID) {
            var paramObject = { "AcdyrFeesID": AcdyrFeesID, "UpdLoginID": UpdLoginID};
            var promise = DataAccessService.deleteData('api/AcademicYearFees/DeleteAcademicYearFees', paramObject);
            return promise;
        }
        this.GetAcademicYearFeesList = function () {
            var data = DataAccessService.getDataAll('api/AcademicYearFees/GetAcademicYearFeesList');
            return data;
        }
        this.GetAcademicYearListByAcdInstance = function () {
            var data = DataAccessService.getDataAll('api/AcademicYearFees/GetAcademicYearListByAcdInstance');
            return data;
        }
        this.GetAcademicYearFeesListByID = function (AcdyrFeesID) {
            var paramObject = { "AcdyrFeesID": AcdyrFeesID };
            var promise = DataAccessService.getDataWithPara('api/AcademicYearFees/GetAcademicYearFeesListByID', paramObject);
            return promise;
        }
        this.GetCheckDependancy = function (AcdyrFeesID) {
            var paramObject = { "AcdyrFeesID": AcdyrFeesID };
            var promise = DataAccessService.getDataWithPara('api/AcademicYearFees/GetCheckDependancy', paramObject);
            return promise;
        }
    });
});