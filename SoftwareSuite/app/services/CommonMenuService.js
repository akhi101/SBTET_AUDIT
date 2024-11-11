define(['app'], function (app) {
    app.service("CommonMenuService", function (DataAccessService) {
        this.GetAcademicYearsActive = function () {
            var promise = DataAccessService.getDataAll('Assessment/getAcademicYearsActive');
            return promise;
        };
       
    });
});