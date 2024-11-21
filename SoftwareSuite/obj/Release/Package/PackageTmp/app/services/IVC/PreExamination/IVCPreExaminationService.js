define(['app'], function (app) {
    app.service("IVCPreExaminationService", function (DataAccessService) {

        this.getSSCDetails = function (object) {
            var promise = DataAccessService.postData('api/IVCPreExamination/GetSSCDetails', object);
            return promise;
        };

        this.getSSCImageDetails = function (object) {
            var promise = DataAccessService.postData('api/IVCPreExamination/GetSSCImageDetails', object);
            return promise;
        };



        this.getSSCNewDetails = function (object) {
            var promise = DataAccessService.postData('api/IVCPreExamination/GetSSCNewDetails', object);
            return promise;
        };

        this.getSSCNewImageDetails = function (object) {
            var promise = DataAccessService.postData('api/IVCPreExamination/GetSSCNewImageDetails', object);
            return promise;
        };




    });
});