define(['app'], function (app) {
    app.controller("ResultsController", function ($scope, $http, $localStorage, $state, AppSettings, MenuService, SystemUserService, DrillDownService) {
       // $state.go('Results.BranchWise');
      
        var authData = $localStorage.authorizationData;
        $scope.userName = authData.userName;
        AppSettings.userName = authData.userName;
        AppSettings.LoggedUserId = authData.SysUserID;
        AppSettings.CollegeID = authData.CollegeID;
        $scope.CollegeID = authData.CollegeID;
        AppSettings.AcdYrID = authData.AcdYrID;
        AppSettings.PrevAdmNo = authData.PrevAdmNo;
        AppSettings.TypeFlag = authData.TypeFlag;
        AppSettings.MngtTypID = authData.MngtTypID;
        AppSettings.SysUsrGrpID = authData.SysUsrGrpID,
        AppSettings.SeqNo = authData.SeqNo,
        AppSettings.DistrictIDs = authData.DistrictIDs
        $scope.College_Code = authData.College_Code;
        $scope.College_Name = authData.College_Name;
        $scope.userType = authData.SystemUserTypeId;
        $scope.OpenDashboard = function () {
            $state.go('Dashboard')
        }   
 
    
        var ModuleId = parseInt($localStorage.selectedModule.Id);
        var usertypeId = parseInt($scope.userType);
        var getAdmissionsubmod = SystemUserService.GetSubModulesbyRole(usertypeId, ModuleId);
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
                $scope.ResultModules = modulesList;
            } else {
                $scope.ResultModules = [];
            }
        }, function (err) {
            console.log(err);
        });
      

        $scope.OpenBranchWiseReport = function () {
            $state.go('Dashboard.Results.BranchWise');
        }
        $scope.OpenStudentWiseReport = function () {
            $state.go('Dashboard.Results.StudentWise');
        }
        $scope.logOut = function () {
            sessionStorage.loggedIn = "no";
            delete $localStorage.authorizationData;
           
            $scope.authentication = {
                isAuth: false,
                UserId: 0,
                userName: ""
            };
            $state.go('login');
        }
        $scope.OpenSubModule = function (Module) {
            localStorage.removeItem('StudentPin');
           // delete $localStorage.authorizationData;
            $state.go("Dashboard.Results." + Module.ModuleRouteName);
        }

    });
});












