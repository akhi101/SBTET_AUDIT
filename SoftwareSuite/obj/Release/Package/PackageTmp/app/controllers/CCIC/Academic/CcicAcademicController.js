define(['app'], function (app) {
    app.controller("CcicAcademicController", function ($scope, $localStorage, $state, CcicPreExaminationService, AppSettings, CcicSystemUserService) {
        var authData = $localStorage.authorizationData;
        $scope.userType = authData.SystemUserTypeID;
        $scope.UserName = authData.UserName;
    
     
        AppSettings.UserName = authData.UserName;
        var UserTypeID = authData.UserTypeID;
        
        var ModuleID = parseInt($localStorage.selectedModule.ModuleID);
       
        var getAdmissionsubmod = CcicSystemUserService.GetCcicUserSubModules(UserTypeID,ModuleID);
        getAdmissionsubmod.then(function (Usersdata) {
            var modulesList = [];
            if (Usersdata.length > 0) {
                for (var i = 0; i < Usersdata.length; i++) {
                    var obj = {};
                    obj.SysModName = Usersdata[i].SubModuleName;
                    obj.SysModID = Usersdata[i].ModuleID;
                    obj.ModuleRouteName = Usersdata[i].SubModuleRouteName;
                    obj.ModuleImageClass = Usersdata[i].ModuleCardClassName;
                    modulesList.push(obj);
                }
                $scope.AcademicModules = modulesList;
            } else {
                $scope.AcademicModules = [];
            }
        }, function (err) {
            console.log(err);
        });
        var SubmodulesList = [];

        $scope.SubmodulesList = SubmodulesList;

        $scope.OpenCcicDashboard = function () {
            $scope.homeDashBoard = true;
            $state.go("CcicDashboard");
        }

       
        
        $scope.OpenSubModule = function (Module) {
  
                $state.go("CcicDashboard.Academic." + Module.ModuleRouteName);
            
            
        }
        $scope.logOut = function () {
            sessionStorage.loggedIn = "no";
            var GetCcicUserLogout = CcicSystemUserService.PostCcicUserLogout($scope.UserName, $scope.SessionID);

            delete $localStorage.authorizationData;
            delete $localStorage.authToken;
            delete $scope.SessionID;

            $scope.authentication = {
                isAuth: false,
                UserID: 0,
                UserName: ""
            };
            $state.go('CcicLogin');
        }

      

    });
});