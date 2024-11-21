define(['app'], function (app) {
    app.controller("AdmissionOtherController", function ($scope, $http, $localStorage, $state, AppSettings, MenuService) {
        var authData = $localStorage.authorizationData;
        $scope.userName = authData.userName;
        AppSettings.userName = authData.userName;
        AppSettings.LoggedUserId = authData.SysUserID;
        AppSettings.CollegeID = authData.CollegeID;
        AppSettings.AcdYrID = authData.AcdYrID;
        AppSettings.PrevAdmNo = authData.PrevAdmNo;
        AppSettings.TypeFlag = authData.TypeFlag;
        AppSettings.MngtTypID = authData.MngtTypID;
        AppSettings.SysUsrGrpID = authData.SysUsrGrpID,
            AppSettings.SeqNo = authData.SeqNo,
            AppSettings.DistrictIDs = authData.DistrictIDs
        if (AppSettings.UserRights.length == 0) { AppSettings.UserRights = authData.UserRights; }
        var UsersRightsdata = [];
        UsersRightsdata = AppSettings.UserRights;

        var programsList = [];
        for (var i = 0; i < UsersRightsdata.length; i++) {
            if (UsersRightsdata[i].ModuleRouteName == "AdmissionOther") {
                if ((UsersRightsdata[i].isaddable != 'Y') && (UsersRightsdata[i].isupdatable != 'Y') && (UsersRightsdata[i].isdeletable != 'Y') && (UsersRightsdata[i].isprintable != 'Y')) {
                }
                else {
                    if ((UsersRightsdata[i].ProgramType == "T") || (UsersRightsdata[i].ProgramType == "M")) {
                        var obj = {};
                        obj.SysProgName = UsersRightsdata[i].SysProgName;
                        obj.SysProgID = UsersRightsdata[i].SysProgID;
                        obj.GridFormToOpen = UsersRightsdata[i].GridFormToOpen;
                        obj.PrgImgClass = UsersRightsdata[i].PrgImgClass;
                        programsList.push(obj);
                    } 
                }
            }
        }
        $scope.programsList = programsList;
        //for (var i = 0; i < UsersRightsdata.length; i++) {
        //    if (AppSettings.TypeFlag == 'B') {
        //        if (UsersRightsdata[i].GridFormToOpen == 'LateStudentAdmissionList') {
        //            $scope[UsersRightsdata[i].GridFormToOpen] = true;
        //        } else {
        //            if ((UsersRightsdata[i].isaddable != 'Y') && (UsersRightsdata[i].isupdatable != 'Y') && (UsersRightsdata[i].isdeletable != 'Y') && (UsersRightsdata[i].isprintable != 'Y')) {
        //                $scope[UsersRightsdata[i].GridFormToOpen] = false;
        //            }
        //            else {
        //                $scope[UsersRightsdata[i].GridFormToOpen] = true;
        //            }
        //        }
        //    } else {
        //        if ((UsersRightsdata[i].isaddable != 'Y') && (UsersRightsdata[i].isupdatable != 'Y') && (UsersRightsdata[i].isdeletable != 'Y') && (UsersRightsdata[i].isprintable != 'Y')) {
        //            $scope[UsersRightsdata[i].GridFormToOpen] = false;
        //        }
        //        else {
        //            $scope[UsersRightsdata[i].GridFormToOpen] = true;
        //        }
        //        if (UsersRightsdata[i].GridFormToOpen == 'PreYearAdmissionEntry') {
        //            if (AppSettings.PrevAdmNo != 0) {
        //                $scope[UsersRightsdata[i].GridFormToOpen] = false;
        //            }
        //        }
        //        if (UsersRightsdata[i].GridFormToOpen == 'RecognationFeePaidList') {
        //            if (AppSettings.CollegeCatName == 'GOVERNMENT') {
        //                $scope[UsersRightsdata[i].GridFormToOpen] = false;
        //            }
        //        }
        //        if (UsersRightsdata[i].GridFormToOpen == 'EnrollStudentRequestList') {
        //            if (AppSettings.CollegeCatName != 'GOVERNMENT') {
        //                $scope[UsersRightsdata[i].GridFormToOpen] = false;
        //            }
        //        }
        //    }
        //    $scope[UsersRightsdata[i].GridFormToOpen + 'Name'] = UsersRightsdata[i].SysProgName;
        //}
        $scope.OpenDashboard = function () {
            $state.go('Dashboard')
        }
        $scope.MyProfile = function () {
            //$state.go('AdmissionOther.UserProfile');
        }
        $scope.GoToHome = function () {
            $state.go('AdmissionOther');
        }
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
        $scope.OpenProgram = function (GridFormToOpen) {
            var strroute = 'AdmissionOther.' + GridFormToOpen;
            $state.go(strroute);
        }
        $scope.$on('onBeforeUnload', function (e, confirmation) {
            confirmation.message = "If you refresh or close browser, your session will expire and all data will be lost";
            e.preventDefault();
        });
        $scope.$on('onUnload', function (e) {
            delete $localStorage.authorizationData;
            sessionStorage.loggedIn = "no";
        });
    });
});







