define(['app'], function (app) {
    app.filter('total', function () {
        return function (input, property) {
            var i = input instanceof Array ? input.length : 0;
            if (typeof property === 'undefined' || i === 0) {
                return i;
            } else if (isNaN(input[0][property])) {
                throw 'filter total can count only numeric values';
            } else {
                var total = 0;
                while (i--)
                    total += input[i][property];
                return total;
            }
        };
    })
    app.controller("DownloadStatusReportEnvEthController", function ($scope, $state, $localStorage, $stateParams, AppSettings, DownloadStatusReportService) {
        var authData = $localStorage.authorizationData;
        $scope.DownloadStatusRpt = {};
        $scope.LoadImg = false;
        $scope.DownloadStatusRpt.ExmSubID = "1";
        $scope.ShowDIEODetail = false;

        AppSettings.DistrictIDs = authData.DistrictIDs;
        $scope.LoggedCollegeID = AppSettings.CollegeID;
        AppSettings.AcdYrID = authData.AcdYrID;
        var SysUsrID = authData.SysUserID;


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
        $scope.GetEnvEthStatusReport = function () {
            $scope.LoadImg = true;
            var StatusReportData = DownloadStatusReportService.GetEnvEthStatusReport(SysUsrID, $scope.DownloadStatusRpt.ExmSubID);
            StatusReportData.then(function (data) {
                if (data.length > 0) {
                    $scope.ShowDIEODetail = true;
                    $scope.LoadImg = false;
                    $scope.StatusReportData = data;
                }
                else {
                    alert("No College(s) Data Found.");
                    $scope.ShowDIEODetail = false;
                    $scope.LoadImg = true;
                }
            }, function (error) {
                alert(error);
            });
        };


        $scope.GetDistrictWiseData = function (x,TypeID) {
            $scope.DistrictWiseStatData = [];
            var _distCode = x.DIST_CODE;
            var _typeID = TypeID;
            var DistrictWiseData = DownloadStatusReportService.GetDistrictWiseData(_distCode, _typeID, $scope.DownloadStatusRpt.ExmSubID);
            DistrictWiseData.then(function (data) {
                if (data.length > 0) {
                    $scope.DistrictWiseStatData = data;
                } else {
                    alert("Data Not Found.");
                    $scope.DistrictWiseStatData = [];
                }
            }, function (error) {
                alert(error);
                $scope.GetDistrictData = [];
            });
        }
      
    });
});