define(['app'], function (app) {
	app.controller("MastersController", function ($scope, $http, $localStorage, $state, AppSettings, MenuService) {
        var authData = $localStorage.authorizationData;
        $scope.userName = authData.userName;
		AppSettings.LoggedUserId = authData.SysUserID;
        AppSettings.CollegeID = authData.CollegeID;
        AppSettings.AcdYrID = authData.AcdYrID;
        AppSettings.PrevAdmNo = authData.PrevAdmNo;
        //AppSettings.ExamInstID = $localStorage.ExamInstID;
        var ExamInstIDData = MenuService.GetCurretnExamInst(AppSettings.AcdYrID);
        ExamInstIDData.then(function (data) {
            AppSettings.ExamInstID = data;
            $localStorage.ExamInstID = AppSettings.ExamInstID;
            //var BasicExamInstanceList = DrillDownExamService.GetCurrentBasicExamInstanceForDrillDown(AppSettings.ExamInstID);
            //BasicExamInstanceList.then(function (ExamInstancedata, status, headers, config, error) {
            //    $scope.BasicExamInstanceList = ExamInstancedata;
            //}, function (error) {
            //    alert(error);
            //});
        }, function (error) {
            alert(error);
        });
        AppSettings.ExamInstID = $localStorage.ExamInstID;

        if (AppSettings.UserRights.length == 0) { AppSettings.UserRights = authData.UserRights; }
        var UsersRightsdata = [];
        UsersRightsdata = AppSettings.UserRights;
        var programsListGen = [];
        var programsListAce = [];
        var programsListSys = [];
        var programsListInst = [];
        var ReportsList = [];
        var submodseq = "";
        for (var i = 0; i < UsersRightsdata.length; i++) {
            if (UsersRightsdata[i].ModuleRouteName == "Masters") {
                if ((UsersRightsdata[i].isaddable != 'Y') && (UsersRightsdata[i].isupdatable != 'Y') && (UsersRightsdata[i].isdeletable != 'Y') && (UsersRightsdata[i].isprintable != 'Y')) {
                }
                else {
                    if ((UsersRightsdata[i].ProgramType == "T") || (UsersRightsdata[i].ProgramType == "M")) {
                        if (UsersRightsdata[i].SubModuleSeqNo == 1) {
                            var obj = {};
                            obj.SysProgName = UsersRightsdata[i].SysProgName;
                            obj.SysProgID = UsersRightsdata[i].SysProgID;
                            obj.GridFormToOpen = UsersRightsdata[i].GridFormToOpen;
                            obj.PrgImgClass = UsersRightsdata[i].PrgImgClass;
                            programsListGen.push(obj);
                        }
                        else if (UsersRightsdata[i].SubModuleSeqNo == 2) {
                            var obj = {};
                            obj.SysProgName = UsersRightsdata[i].SysProgName;
                            obj.SysProgID = UsersRightsdata[i].SysProgID;
                            obj.GridFormToOpen = UsersRightsdata[i].GridFormToOpen;
                            obj.PrgImgClass = UsersRightsdata[i].PrgImgClass;
                            programsListAce.push(obj);
                        }
                        else if (UsersRightsdata[i].SubModuleSeqNo == 3) {
                            var obj = {};
                            obj.SysProgName = UsersRightsdata[i].SysProgName;
                            obj.SysProgID = UsersRightsdata[i].SysProgID;
                            obj.GridFormToOpen = UsersRightsdata[i].GridFormToOpen;
                            obj.PrgImgClass = UsersRightsdata[i].PrgImgClass;
                            programsListSys.push(obj);
                        } else if (UsersRightsdata[i].SubModuleSeqNo == 4) {
                            var obj = {};
                            obj.SysProgName = UsersRightsdata[i].SysProgName;
                            obj.SysProgID = UsersRightsdata[i].SysProgID;
                            obj.GridFormToOpen = UsersRightsdata[i].GridFormToOpen;
                            obj.PrgImgClass = UsersRightsdata[i].PrgImgClass;
                            programsListInst.push(obj);
                        }
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
        $scope.programsListGen = programsListGen;
        $scope.programsListAce = programsListAce;
        $scope.programsListSys = programsListSys;
        $scope.programsListInst = programsListInst;
        $scope.ReportsList = ReportsList;
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
            $state.go('Masters');
        }
		$scope.MyProfile = function () {
			$state.go('Masters.UserProfile')
		}
        //$scope.MyProfile = function () {
        //    alert("ok");
        //}
        $scope.MyCollege = function () {
            alert("ok");
        }
        $scope.logOut = function () {
            delete $localStorage.authorizationData;
           
            $scope.authentication = {
                isAuth: false,
                UserId: 0,
                userName: ""
            };
            $state.go('login')
        }
    });
});







