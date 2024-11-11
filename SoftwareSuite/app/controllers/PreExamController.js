define(['app'], function (app) {
    app.controller("PreExamController", function ($scope, $http, $localStorage, $state, AppSettings, MenuService) {
        $scope.PreExam = {};
        var authData = $localStorage.authorizationData;
        $scope.userName = authData.userName;
        AppSettings.LoggedUserId = authData.SysUserID;
        AppSettings.CollegeID = authData.CollegeID;
        AppSettings.SysUsrGrpID = authData.SysUsrGrpID;
        AppSettings.userName = authData.userName;
        AppSettings.AcdYrID = authData.AcdYrID;
        AppSettings.TypeFlag = authData.TypeFlag;
        AppSettings.ExamInstID = $localStorage.ExamInstID;
        AppSettings.DistrictIDs = authData.DistrictIDs;
        
        if (AppSettings.UserRights.length == 0) { AppSettings.UserRights = authData.UserRights; }
        var UsersRightsdata = [];
        UsersRightsdata = AppSettings.UserRights;
        var programsList = [];
        var ReportsList = [];
        var AppointList = [];
        for (var i = 0; i < UsersRightsdata.length; i++) {
            if (UsersRightsdata[i].ModuleRouteName == "PreExam") {
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
                     else if ((UsersRightsdata[i].GridFormToOpen == "examinerAppointmentTheory") || (UsersRightsdata[i].GridFormToOpen == "examinerAppointmentPractical")
                        || (UsersRightsdata[i].GridFormToOpen == "UpdateExaminer") || (UsersRightsdata[i].GridFormToOpen == "BulkExaminerAppointmnet")
                        || (UsersRightsdata[i].GridFormToOpen == "PreExmSpelThryList") || (UsersRightsdata[i].GridFormToOpen == "PreExmSpelPractList")
                        || (UsersRightsdata[i].GridFormToOpen == "PracticalSpellVocList") || (UsersRightsdata[i].GridFormToOpen == "ExaminerMobileNumberUpdate")
                        || (UsersRightsdata[i].GridFormToOpen == "ExaminerAppintmentChange") || (UsersRightsdata[i].GridFormToOpen == "ExaminerAppintmentBridgeChange")|| (UsersRightsdata[i].GridFormToOpen == "BulkExaminerAppointmnetGenPract")
                        || (UsersRightsdata[i].GridFormToOpen == "examinerAppointmentPracticalBridge")
                        || (UsersRightsdata[i].GridFormToOpen == "PrePractCenterSpellChange") || (UsersRightsdata[i].GridFormToOpen == "ExaminerMobileNumberUpdateBridge")
                    )
                    {                     
                        var obj = {};
                        obj.SysProgName = UsersRightsdata[i].SysProgName;
                        obj.SysProgID = UsersRightsdata[i].SysProgID;
                        obj.GridFormToOpen = UsersRightsdata[i].GridFormToOpen;
                        AppointList.push(obj);
                    } else {
                        var obj = {};
                        obj.SysProgName = UsersRightsdata[i].SysProgName;
                        obj.SysProgID = UsersRightsdata[i].SysProgID;
                        obj.GridFormToOpen = UsersRightsdata[i].GridFormToOpen;
                        ReportsList.push(obj);
                    }
                }
            }
        }

        var ExamInstIDData = MenuService.GetCurretnExamInst(AppSettings.AcdYrID);
        ExamInstIDData.then(function (data) {
            AppSettings.ExamInstID = data;
            $localStorage.ExamInstID = AppSettings.ExamInstID;
        }, function (error) {
            alert(error);
        });
        $scope.programsList = programsList;
        $scope.ReportsList = ReportsList;
        $scope.AppointList = AppointList;
        $scope.OpenProgram = function (GridFormToOpen) {
            var strroute = 'PreExam.' + GridFormToOpen;
            $state.go(strroute);
        }
        $scope.OpenDashboard = function () {
            $state.go('Dashboard')
        }
        $scope.GoToHome = function () {
            $state.go('PreExam');
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
            $state.go('login');
        }
    });
});












