define(['app'], function (app) {
    app.controller("AdmissionDashboardController", function ($scope, $http, $localStorage, $state, $stateParams, AppSettings, SystemUserService) {
        var authData = $localStorage.authorizationData;
        $scope.loading = true;
        $scope.userType = authData.SystemUserTypeId
        $scope.userName = authData.userName;

        AppSettings.userName = authData.userName;
        AppSettings.LoggedUserId = authData.SysUserID;
        //alert("College Id" + authData.CollegeID);
        AppSettings.CollegeID = authData.CollegeID;
        $scope.CollegeID = authData.CollegeID;
        AppSettings.AcdYrID = authData.AcdYrID;
        AppSettings.PrevAdmNo = authData.PrevAdmNo;
        AppSettings.TypeFlag = authData.TypeFlag;
        AppSettings.MngtTypID = authData.MngtTypID;
        AppSettings.SysUsrGrpID = authData.SysUsrGrpID,
            AppSettings.SeqNo = authData.SeqNo,
            AppSettings.UserRights = authData.UserRights,
            AppSettings.DistrictIDs = authData.DistrictIDs;
        AppSettings.College_Code = authData.College_Code;
        AppSettings.College_Name = authData.College_Name;
        $scope.College_Name = authData.College_Name
        $scope.College_Code = authData.College_Code;
        $scope.userType = authData.SystemUserTypeId;
        // $scope.ChangePassword = {};      
        var ModuleId = $localStorage.selectedModule.Id;
        $scope.moduleId = parseInt(ModuleId);
        var usertypeId = parseInt($scope.userType);
        var getAdmissionsubmod = SystemUserService.GetSubModulesbyRole(usertypeId, $scope.moduleId);
        getAdmissionsubmod.then(function (Usersdata) {
            var modulesList = [];
            var moduleroutename = "";
            if (Usersdata.length > 0) {
                for (var i = 0; i < Usersdata.length; i++) {
                    // if (moduleroutename != Usersdata[i].SubModuleRouteName) {
                    var obj = {};
                    obj.SysModName = Usersdata[i].SubModuleName;
                    obj.SysModID = Usersdata[i].id;
                    obj.ModuleRouteName = Usersdata[i].SubModuleRouteName;
                    obj.ModuleImageClass = Usersdata[i].Class;
                    modulesList.push(obj);
                    //   moduleroutename = UsersRightsdata[i].SubModuleRouteName;
                    //  }
                }
                $scope.AdmissionModules = modulesList;               
            } else {
                $scope.AdmissionModules = [];
            }
        }, function (err) {
            console.log(err);
        });
        $scope.shownewpassword = false;      
        //if ($scope.userType == 1) {         
        //    var obj = {};
        //    obj.SysModName = 'Admission';
        //    obj.SysModID = '1';
        //    obj.ModuleRouteName = 'Admission';
        //    obj.ModuleImageClass = 'small-box bg-blue';
        //    AdmissionModules.push(obj);

        //    var obj = {};
        //    obj.SysModName = 'Attendance';
        //    obj.SysModID = '2';
        //    obj.ModuleRouteName = 'Attendance';
        //    obj.ModuleImageClass = 'small-box bg-orange';
        //    AdmissionModules.push(obj);
        //    var obj = {};
        //    obj.SysModName = 'Pin Report';
        //    obj.SysModID = '3';
        //    obj.ModuleRouteName = 'SetDates';
        //    obj.ModuleImageClass = 'small-box bg-blue';
        //    AdmissionModules.push(obj);

        //    var obj = {};
        //    obj.SysModName = 'Search Student';
        //    obj.SysModID = '4';
        //    obj.ModuleRouteName = 'MarksSummary';
        //    obj.ModuleImageClass = 'small-box bg-orange ';
        //    AdmissionModules.push(obj);

        //    var obj = {};
        //    obj.SysModName = 'Transfer Student';
        //    obj.SysModID = '5';
        //    obj.ModuleRouteName = 'StatisticalReports';
        //    obj.ModuleImageClass = 'small-box bg-navy';
        //    AdmissionModules.push(obj);

        //    $scope.AdmissionModules = AdmissionModules
        //} else if ($scope.userType == 3) {

        //    var obj = {};
        //    obj.SysModName = 'Admission';
        //    obj.SysModID = '10';
        //    obj.ModuleRouteName = 'Admission';
        //    obj.ModuleImageClass = 'small-box bg-orange ';
        //    AdmissionModules.push(obj);
        //    var obj = {};
        //    obj.SysModName = 'ReAdmission';
        //    obj.SysModID = '6';
        //    obj.ModuleRouteName = 'ReAdmission';
        //    obj.ModuleImageClass = 'small-box bg-orange ';
        //    AdmissionModules.push(obj);
        //    var obj = {};
        //    obj.SysModName = 'Attendance';
        //    obj.SysModID = '7';
        //    obj.ModuleRouteName = 'Attendance';
        //    obj.ModuleImageClass = 'small-box bg-orange ';
        //    AdmissionModules.push(obj);
        //    $scope.AdmissionModules = AdmissionModules
        //} else if ($scope.userType == 2) {
        //    var obj = {};
        //    obj.SysModName = 'Admisssion';
        //    obj.SysModID = '8';
        //    obj.ModuleRouteName = 'Assessment';
        //    obj.ModuleImageClass = 'small-box bg-blue';
        //    AdmissionModules.push(obj);

        //    var obj = {};
        //    obj.SysModName = 'Attendance';
        //    obj.SysModID = '9';
        //    obj.ModuleRouteName = 'MarksSummary';
        //    obj.ModuleImageClass = 'small-box bg-orange ';
        //    AdmissionModules.push(obj);
        //    $scope.AdmissionModules = AdmissionModules;
        //}
                      

        $scope.OpenSubModule = function (Module) {
            $state.go("Dashboard.AdmissionDashboard." + Module.ModuleRouteName);
        }

    });
});



















