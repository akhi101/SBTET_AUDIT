define(['app'], function (app) {
    app.controller("CcicSettingsController", function ($scope, $http, $localStorage, $state, AppSettings, CcicSystemUserService) {
        var authData = $localStorage.authorizationData;
       
        $scope.AssessmentModules = [];
        var UserTypeID = parseInt(authData.UserTypeID);
        var ModuleID = parseInt($localStorage.selectedModule.ModuleID);
        
        var getAdmissionsubmod = CcicSystemUserService.GetCcicUserSubModules(UserTypeID,ModuleID);
        getAdmissionsubmod.then(function (Usersdata) {
            var modulesList = [];
            var moduleroutename = "";
            if (Usersdata.length > 0) {
                for (var i = 0; i < Usersdata.length; i++) {
                    // if (moduleroutename != Usersdata[i].SubModuleRouteName) {
                    var obj = {};
                    obj.SysModName = Usersdata[i].SubModuleName;
                    obj.SysModID = Usersdata[i].ModuleID;
                    obj.ModuleRouteName = Usersdata[i].SubModuleRouteName;
                    obj.ModuleImageClass = Usersdata[i].ModuleCardClassName;
                    modulesList.push(obj);
                    //   moduleroutename = UsersRightsdata[i].SubModuleRouteName;
                    //  }
                }
                $scope.AssessmentModules = modulesList;
            } else {
                $scope.AssessmentModules = [];
            }
        }, function (err) {
            console.log(err);
        });

        $scope.OpenSubModule = function (Module) {
            $state.go("CcicDashboard.CcicAssessmentDashbaord." + Module.ModuleRouteName);
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
    })
})



