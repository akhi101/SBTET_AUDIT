define(['app'], function (app) {
    app.controller("TCAdmissionReportController", function ($scope, $state, $localStorage, $stateParams, AppSettings, RequestDrillDownService) {
        $scope.TCAdmissionReportData = {};
        var authData = $localStorage.authorizationData;
        $scope.userName = authData.userName;
        AppSettings.LoggedUserId = authData.SysUserID;
        AppSettings.DistrictIDs = authData.DistrictIDs;
        $scope.DistrictIDs = AppSettings.DistrictIDs;
        $scope.AcdYrID = AppSettings.AcdYrID;
        if (AppSettings.CollegeID != "undefined" && AppSettings.CollegeID != "0") {
            var TcAdmissionData = RequestDrillDownService.GetTcAdmissionReportByCollege($scope.AcdYrID, AppSettings.CollegeID);
            TcAdmissionData.then(function (data) {
                if (data.length > 0) {
                    $scope.TCAdmissionData = data;
                }
                else {
                    alert("Data Not Found");
                    $scope.TCAdmissionData = [];
                    return;
                }
            }, function (error) {
                alert(error);
            });
        }
        else {
            var TcAdmissionData = RequestDrillDownService.GetTcAdmissionReportByDistrict($scope.DistrictIDs);
            TcAdmissionData.then(function (data) {
                if (data.length > 0) {
                    $scope.TCAdmissionData = data;
                }
                else {
                    alert("Data Not Found");
                    $scope.TCAdmissionData = [];
                    return;
                }
            }, function (error) {
                alert(error);
            });
        }
    });
});