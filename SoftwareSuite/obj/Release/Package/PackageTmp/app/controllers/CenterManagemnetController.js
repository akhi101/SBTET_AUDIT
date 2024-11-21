define(['app'], function (app) {
    app.controller("CenterManagemnetController", function ($scope, $http, $localStorage, $state, AppSettings, MenuService, BasicExamInstanceService, PreExamManagementNewService) {
        $scope.AllocateCenterFlag = 'A';
        $scope.NotAllocateCenterFlag = 'N';
        $scope.CollegeFlag = 'C';
        var authData = $localStorage.authorizationData;
        $scope.userName = authData.userName;
        AppSettings.LoggedUserId = authData.SysUserID;
        AppSettings.CollegeID = authData.CollegeID;
        AppSettings.AcdYrID = authData.AcdYrID;
        AppSettings.PrevAdmNo = authData.PrevAdmNo;
        AppSettings.ExamInstID = $localStorage.ExamInstID;
        AppSettings.DistrictIDs = authData.DistrictIDs;
        AppSettings.SysUsrGrpID = authData.SysUsrGrpID;
        var ExamInstIDData = PreExamManagementNewService.GetCurretnExamInst(AppSettings.AcdYrID);
        ExamInstIDData.then(function (data) {
            AppSettings.ExamInstID = data;
            $localStorage.ExamInstID = AppSettings.ExamInstID;
        }, function (error) {
            alert(error);
        });
        var BasicExamInstanceList = BasicExamInstanceService.GetBasicExamInstanceForCenterMgmt();
        BasicExamInstanceList.then(function (BasicExamInstanceData, status, headers, config, error) {
            AppSettings.ExamInstID = BasicExamInstanceData[0].ExamInstID;
        }, function (BasicExamInstanceData, status, headers, config) {
            alert(error);
        });
        if (AppSettings.UserRights.length == 0) { AppSettings.UserRights = authData.UserRights; }
        var UsersRightsdata = [];
        UsersRightsdata = AppSettings.UserRights;
        var programsList = [];
        var ReportsList = [];
        var programsListGenPract = [];
        var programsListVocPract = [];
        for (var i = 0; i < UsersRightsdata.length; i++) {
            if (UsersRightsdata[i].ModuleRouteName == "CenterManagemnet") {
                if ((UsersRightsdata[i].isaddable != 'Y') && (UsersRightsdata[i].isupdatable != 'Y') && (UsersRightsdata[i].isdeletable != 'Y') && (UsersRightsdata[i].isprintable != 'Y')) {
                }
                else {
                    if ((UsersRightsdata[i].ProgramType == "T") || (UsersRightsdata[i].ProgramType == "M")) {
                        if (UsersRightsdata[i].PrgParameter == "GP") {
                            var obj = {};
                            obj.SysProgName = UsersRightsdata[i].SysProgName;
                            obj.SysProgID = UsersRightsdata[i].SysProgID;
                            obj.GridFormToOpen = UsersRightsdata[i].GridFormToOpen;
                            obj.PrgImgClass = UsersRightsdata[i].PrgImgClass;
                            programsListGenPract.push(obj);
                        } else if (UsersRightsdata[i].PrgParameter == "VP") {
                            var obj = {};
                            obj.SysProgName = UsersRightsdata[i].SysProgName;
                            obj.SysProgID = UsersRightsdata[i].SysProgID;
                            obj.GridFormToOpen = UsersRightsdata[i].GridFormToOpen;
                            obj.PrgImgClass = UsersRightsdata[i].PrgImgClass;
                            programsListVocPract.push(obj);
                        } else {
                            var obj = {};
                            obj.SysProgName = UsersRightsdata[i].SysProgName;
                            obj.SysProgID = UsersRightsdata[i].SysProgID;
                            obj.GridFormToOpen = UsersRightsdata[i].GridFormToOpen;
                            obj.PrgImgClass = UsersRightsdata[i].PrgImgClass;
                            programsList.push(obj);
                        }
                    } else {
                        if (UsersRightsdata[i].GridFormToOpen != 'ReportofCollegesCenterAllocateNotAllocated') {
                            var obj = {};
                            obj.SysProgName = UsersRightsdata[i].SysProgName;
                            obj.SysProgID = UsersRightsdata[i].SysProgID;
                            obj.GridFormToOpen = UsersRightsdata[i].GridFormToOpen;
                            ReportsList.push(obj);
                        } else {
                            $scope[UsersRightsdata[i].GridFormToOpen] = true;
                            $scope[UsersRightsdata[i].GridFormToOpen + 'Name'] = UsersRightsdata[i].SysProgName;
                        }
                    }
                }
            }
        }
        $scope.programsList = programsList;
        $scope.ReportsList = ReportsList;
        $scope.programsListGenPract = programsListGenPract;
        $scope.programsListVocPract = programsListVocPract;
        //    for (var i = 0; i < UsersRightsdata.length; i++) {
        //        if ((UsersRightsdata[i].isaddable != 'Y') && (UsersRightsdata[i].isupdatable != 'Y') && (UsersRightsdata[i].isdeletable != 'Y') && (UsersRightsdata[i].RollPrint != 'Y')) {
        //$scope[UsersRightsdata[i].GridFormToOpen] = false; 
        //        }
        //        else {
        //$scope[UsersRightsdata[i].GridFormToOpen] = true;
        //        }
        //        $scope[UsersRightsdata[i].GridFormToOpen + 'Name'] = UsersRightsdata[i].SysProgName;
        //    }

        $scope.OpenDashboard = function () {
            $state.go('Dashboard')
        }
        $scope.GoToHome = function () {
            $state.go('CenterManagemnet');
        }
        $scope.MyProfile = function () {
            alert("ok");
        }
        $scope.MyCollege = function () {
            alert("ok");
        }
        $scope.logOut = function () {
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
    });
});







