define(['app'], function (app) {
    app.controller("ServicesRevenueReportController", function ($scope, $state, $localStorage, AppSettings, ServicesRevenueReportService) {
        var authData = $localStorage.authorizationData;
        $scope.userName = authData.userName;
        AppSettings.LoggedUserId = authData.SysUserID;
        AppSettings.DistrictIDs = authData.DistrictIDs;
        AppSettings.AcdYrID = authData.AcdYrID;

        $scope.DrillDownList = {}
        $scope.CompanyName = AppSettings.CompanyName;
        $scope.LoginYear = AppSettings.SelectedYear;
        $scope.DistrictIDs = AppSettings.DistrictIDs;
        $scope.SelectedAcdYrID = AppSettings.AcdYrID;
        $scope.LoginTime = true;

        var PageNm = $state.current.name.split(".")[1];
        var RightForCurrentPage = [];
        var UsersRightsdata = [];
        UsersRightsdata = AppSettings.UserRights;
        for (var i = 0; i < UsersRightsdata.length; i++) {
            if (UsersRightsdata[i].ListFormName == PageNm) {
                var obj = {};
                obj.isaddable = UsersRightsdata[i].isaddable;
                RightForCurrentPage.push(obj);
            }
        }        

        var AcademicYearList = ServicesRevenueReportService.GetAcademicYear();
        AcademicYearList.then(function (data) {
            $scope.AcademicYearList = data;
            return AcademicYearList;
        }, function (error) {
            alert(error);
            });

        $scope.FillRequests = function (AcdYrID) {
            $scope.SelectedAcdYrID   = AcdYrID;
            var ServiceRequestDrillDownReportData = ServicesRevenueReportService.GetServiceRequestDrillDownReport(AcdYrID, AppSettings.DistrictIDs, AppSettings.SysUsrGrpID);
            ServiceRequestDrillDownReportData.then(function (data) {
                $scope.DrillDownList = data;
                if ($scope.LoginTime == true) {
                    $("select#SelectYear")[0].selectedIndex = 1;
                    $scope.LoginTime = false;
                }
                
            }, function (error) {
                alert(error);
            });
        }

        angular.element(document).ready(function () {
            if ($scope.SelectedAcdYrID != undefined) {
                $scope.FillRequests($scope.SelectedAcdYrID);
            }
            else {
                alert('Select Academic Year');
                return;
            }
        });
    });
});