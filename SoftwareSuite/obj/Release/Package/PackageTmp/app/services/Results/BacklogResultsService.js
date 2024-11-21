define(['app'], function (app) {
    app.service("BacklogResultsService", function (DataAccessService) {

        this.GetStudentByPin = function (pin) {
            var paramsobject = { "Pin": pin };
            var promise = DataAccessService.getDataWithPara('api/Results/GetStudentByPin', paramsobject);
            return promise;
        }
        this.getStudentbacklogHistory = function (pin, subcode) {
            var paramsobject = { "Pin": pin, "subcode": subcode };
            var promise = DataAccessService.getDataWithPara('api/Results/getStudentbacklogHistory', paramsobject);
            return promise;
        }
    });
});
