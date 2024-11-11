define(['app'], function (app) {
    app.controller("BoardReportListController", function ($scope, $http, $localStorage, $state, AppSettings, MenuService) {
        var authData = $localStorage.authorizationData;
         
         
        AppSettings.LoggedUserId = authData.SysUserID;   
        $scope.userName = authData.userName;
        $scope.CollegeID = authData.CollegeID;
        AppSettings.AcdYrID = authData.AcdYrID;
        AppSettings.TypeFlag = authData.TypeFlag;
        AppSettings.SysUsrGrpID = authData.SysUsrGrpID;
        AppSettings.SeqNo = authData.SeqNo;
        AppSettings.DistrictIDs = authData.DistrictIDs;
        AppSettings.UserRights = authData.UserRights;

        var UsersRightsdata = [];
        UsersRightsdata = AppSettings.UserRights;
        for (var i = 0; i < UsersRightsdata.length; i++) {
            if ((UsersRightsdata[i].isaddable != 'Y') && (UsersRightsdata[i].isupdatable != 'Y') && (UsersRightsdata[i].isdeletable != 'Y') && (UsersRightsdata[i].isprintable != 'Y')) {
                $scope[UsersRightsdata[i].GridFormToOpen] = false;
            }
            else {
                $scope[UsersRightsdata[i].GridFormToOpen] = true;
            }
            $scope[UsersRightsdata[i].GridFormToOpen + 'Name'] = UsersRightsdata[i].SysProgName;
        }

        $scope.masterShow = false;
        $scope.logOut = function () {
            sessionStorage.loggedIn = "no";
            delete $localStorage.authorizationData;
            var InsertLoginList = MenuService.GetUpdateLogoutInfo(AppSettings.LoggedUserId, $scope.userName);
            InsertLoginList.then(function (Districtdata, status, headers, config, error) {
            }, function (error) {
                alert(error);
            });
            $scope.authentication = {
                isAuth: false,
                UserId: 0,
                userName: ""
            };
            $state.go('login')
        }
        $scope.GovtEnrollStatusReport = function () {
            var UsersRightsdata = [];
            UsersRightsdata = AppSettings.UserRights;
            for (var i = 0; i < UsersRightsdata.length; i++) {
                if (UsersRightsdata[i].GridFormToOpen == "GovtEnrollStatusReport") {
                    if ((UsersRightsdata[i].isaddable != 'Y') && (UsersRightsdata[i].isupdatable != 'Y') && (UsersRightsdata[i].isdeletable != 'Y') && (UsersRightsdata[i].isprintable != 'Y')) {
                        alert("No rights for this user");
                    } else { $state.go('GovtEnrollStatusReport'); }
                }
            }
        }
        $scope.GovtEnrollCollegeReport = function () {
            var UsersRightsdata = [];
            UsersRightsdata = AppSettings.UserRights;
            for (var i = 0; i < UsersRightsdata.length; i++) {
                if (UsersRightsdata[i].GridFormToOpen == "GovtEnrollCollegeReport") {
                    if ((UsersRightsdata[i].isaddable != 'Y') && (UsersRightsdata[i].isupdatable != 'Y') && (UsersRightsdata[i].isdeletable != 'Y') && (UsersRightsdata[i].isprintable != 'Y')) {
                        alert("No rights for this user");
                    } else { $state.go('GovtEnrollCollegeReport'); }
                }
            }
        }
        $scope.GovtEnrollStudentReport = function () {
            var UsersRightsdata = [];
            UsersRightsdata = AppSettings.UserRights;
            for (var i = 0; i < UsersRightsdata.length; i++) {
                if (UsersRightsdata[i].GridFormToOpen == "GovtEnrollStudentReport") {
                    if ((UsersRightsdata[i].isaddable != 'Y') && (UsersRightsdata[i].isupdatable != 'Y') && (UsersRightsdata[i].isdeletable != 'Y') && (UsersRightsdata[i].isprintable != 'Y')) {
                    } else { $state.go('GovtEnrollStudentReport'); }
                }
            }
        }
        $scope.GroupwiseReport = function () {
            var UsersRightsdata = [];
            UsersRightsdata = AppSettings.UserRights;
            for (var i = 0; i < UsersRightsdata.length; i++) {
                if (UsersRightsdata[i].GridFormToOpen == "GroupwiseReport") {
                    if ((UsersRightsdata[i].isaddable != 'Y') && (UsersRightsdata[i].isupdatable != 'Y') && (UsersRightsdata[i].isdeletable != 'Y') && (UsersRightsdata[i].isprintable != 'Y')) {
                        alert("No rights for this user");
                    } else { $state.go('GroupwiseReport'); }
                }
            }
        }
        $scope.DistrictwiseReport = function () {
            var UsersRightsdata = [];
            UsersRightsdata = AppSettings.UserRights;
            for (var i = 0; i < UsersRightsdata.length; i++) {
                if (UsersRightsdata[i].GridFormToOpen  == "DistrictwiseReport") {
                    if ((UsersRightsdata[i].isaddable != 'Y') && (UsersRightsdata[i].isupdatable != 'Y') && (UsersRightsdata[i].isdeletable != 'Y') && (UsersRightsdata[i].isprintable != 'Y')) {
                        alert("No rights for this user");
                    } else { $state.go('DistrictwiseReport'); }
                }
            }
        }
        $scope.SSCHallTicketSearchReport = function () {
            var UsersRightsdata = [];
            UsersRightsdata = AppSettings.UserRights;
            for (var i = 0; i < UsersRightsdata.length; i++) {
                if (UsersRightsdata[i].GridFormToOpen  == "SSCHallTicketSearchReport") {
                    if ((UsersRightsdata[i].isaddable != 'Y') && (UsersRightsdata[i].isupdatable != 'Y') && (UsersRightsdata[i].isdeletable != 'Y') && (UsersRightsdata[i].isprintable != 'Y')) {
                        alert("No rights for this user");
                    } else { $state.go('SSCHallTicketSearchReport'); }
                }
            }
        }
        $scope.DistrictwiseRecgFeeReport = function () {
            var UsersRightsdata = [];
            UsersRightsdata = AppSettings.UserRights;
            for (var i = 0; i < UsersRightsdata.length; i++) {
                if (UsersRightsdata[i].GridFormToOpen == "DistrictwiseRecgFeeReport") {
                    if ((UsersRightsdata[i].isaddable != 'Y') && (UsersRightsdata[i].isupdatable != 'Y') && (UsersRightsdata[i].isdeletable != 'Y') && (UsersRightsdata[i].isprintable != 'Y')) {
                        alert("No rights for this user");
                    } else { $state.go('DistrictwiseRecgFeeReport'); }
                }
            }
        }
        $scope.CollegewiseRecgFeeReport = function () {
            var UsersRightsdata = [];
            UsersRightsdata = AppSettings.UserRights;
            for (var i = 0; i < UsersRightsdata.length; i++) {
                if (UsersRightsdata[i].GridFormToOpen == "CollegewiseRecgFeeReport") {
                    if ((UsersRightsdata[i].isaddable != 'Y') && (UsersRightsdata[i].isupdatable != 'Y') && (UsersRightsdata[i].isdeletable != 'Y') && (UsersRightsdata[i].isprintable != 'Y')) {
                        alert("No rights for this user");
                    } else { $state.go('CollegewiseRecgFeeReport'); }
                }
            }
        }
        $scope.SystemUserAuditTrailReport = function () {
            var UsersRightsdata = [];
            UsersRightsdata = AppSettings.UserRights;
            for (var i = 0; i < UsersRightsdata.length; i++) {
                if (UsersRightsdata[i].GridFormToOpen == "SystemUserAuditTrailReport") {
                    if ((UsersRightsdata[i].isaddable != 'Y') && (UsersRightsdata[i].isupdatable != 'Y') && (UsersRightsdata[i].isdeletable != 'Y') && (UsersRightsdata[i].isprintable != 'Y')) {
                        alert("No rights for this user");
                    } else { $state.go('SystemUserAuditTrailReport'); }
                }
            }
        }
        $scope.SystemUserLoginDetailsReport = function () {
            var UsersRightsdata = [];
            UsersRightsdata = AppSettings.UserRights;
            for (var i = 0; i < UsersRightsdata.length; i++) {
                if (UsersRightsdata[i].GridFormToOpen == "SystemUserLoginDetailsReport") {
                    if ((UsersRightsdata[i].isaddable != 'Y') && (UsersRightsdata[i].isupdatable != 'Y') && (UsersRightsdata[i].isdeletable != 'Y') && (UsersRightsdata[i].isprintable != 'Y')) {
                        alert("No rights for this user");
                    } else { $state.go('SystemUserLoginDetailsReport'); }
                }
            }
        }

        $scope.goToHome = function () {
            $state.go('BoardReportList');
        }
        $scope.OpenDashboard = function () {
            $state.go('Dashboard')
        }
    });
})