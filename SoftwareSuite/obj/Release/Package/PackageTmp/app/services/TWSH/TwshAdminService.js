define(['app'], function (app) {
    app.service("TwshAdminService", function (DataAccessService) {

        this.GetTwshMonthYear = function () {
            return DataAccessService.getDataAll('api/TwshAdmin/GetTwshMonthYear');
        };

        this.SetTwshAcademicYear = function (DataTypeId, AcademicYear, AcademicStartYear, StartDate, EndDate, UserName, IsCurrentAcademicYear, AcademicID, ActiveFlag) {
            var paramObject = {
                "DataTypeId": DataTypeId,
                "AcademicYear": AcademicYear,
                "AcademicStartYear": AcademicStartYear,
                "StartDate": StartDate,
                "EndDate": EndDate,
                "UserName": UserName,
                "IsCurrentAcademicYear": IsCurrentAcademicYear,
                "AcademicID": AcademicID,
                "ActiveFlag": ActiveFlag

            };
            return DataAccessService.getDataWithPara('api/TwshAdmin/SetTwshAcademicYear', paramObject);
        };

    });
});