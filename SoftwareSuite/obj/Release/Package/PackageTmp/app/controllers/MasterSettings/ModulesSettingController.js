define(['app'], function (app) {
    app.controller("ModulesSettingController", function ($scope, $http, $localStorage, $state, AppSettings, AdminService, SystemUserService, MasterSettingsService) {
        const $ctrl = this
        var authData = $localStorage.authorizationData;
        $scope.userTypeId = authData.SystemUserTypeId
        //alert($scope.userTypeId)
        $ctrl.$onInit = () => {
            $scope.result = false;
         
            $scope.getUserModules();
            //$scope.getModules()
        }
        if ($scope.userTypeId) {
            //$scope.userTypeId = localStorage.getItem("userTypeId");
            var getModues = AdminService.GetAllModulesbyRole($scope.userTypeId);
            getModues.then(function (response) {
                if (response.length > 0) {
                    $scope.modules = response;
                    $scope.result = true;
                }
            },
        function (error) {
            var err = JSON.parse(error);
            $scope.result = false;
        });
        }

        var getModuesColours = MasterSettingsService.getModuleColors();
        getModuesColours.then(function (response) {
            if (response.Table.length > 0) {               
                $scope.moduleColours = response.Table;
                // $scope.result = true;
            }
        },
    function (error) {
       
        var err = JSON.parse(error);
      
    });

       
        var get_AllModules = MasterSettingsService.getAllModules();
        get_AllModules.then(function (response) {
            if (response.Table.length > 0) {
                $scope.getAllModules = response.Table;
                // $scope.result = true;
            }
        },
    function (error) {
        alert("error while loading Modules");
        var err = JSON.parse(error);

    });
        $scope.getUserModules= function(){
        var get_AllUserModules = MasterSettingsService.getAllUserModules();
        get_AllUserModules.then(function (response) {
            if (response.Table.length > 0) {
                $scope.getAllUserModules = response.Table;
                // $scope.result = true;
            }
        },
    function (error) {
        alert("error while loading Modules");
        var err = JSON.parse(error);

    });

        }
        var getModues = MasterSettingsService.getModules();
        getModues.then(function (response) {
            if (response.Table.length > 0) {
                $scope.GetModules = response.Table;
                // $scope.result = true;
            }
        },
    function (error) {
        alert("error while loading Modules");
        var err = JSON.parse(error);

    });
        


        
        $scope.GetAllModulesbyRoles = function() {
            var getModues = AdminService.GetAllModulesbyRole($scope.userTypeId);
            getModues.then(function (response) {
                if (response.length > 0) {
                    $scope.modules = response;
                    $scope.result = true;
                }
            },
        function (error) {
          
            var err = JSON.parse(error);
            $scope.result = false;
        });
        };

        $scope.Switchmodule = function (ModuleId, IsActive) {
          
            $scope.userTypeId = authData.SystemUserTypeId
            $scope.usertypeId = authData.SystemUserTypeId
          
            if (IsActive == true) {
                var Active = 0;
            } else {
                var Active = 1;
            }
          
            var SetModues = AdminService.SetModuleInactive($scope.usertypeId, ModuleId, Active);
            SetModues.then(function (response) {
                alert(response[0].Message);
                $scope.GetAllModulesbyRoles();
            },
        function (error) {
           
            var err = JSON.parse(error);
        })
        };

        $scope.AddModule = function () {
            var SetModues = MasterSettingsService.AddModule($scope.CardName, $scope.CardColor, $scope.RouteName);
            SetModues.then(function (response) {
                alert(response[0].Message);
                $scope.GetAllModulesbyRoles();
                alert('Module Added Succesfully')
            },
        function (error) {

            var err = JSON.parse(error);
        })
        }

        $scope.InactiveUserModule = function (ModuleId, IsActive, UserTypeId) {        
            //alert(IsActive)
            if (IsActive == true) {
                var Active = 0;
            } else {
                var Active = 1;
            }
          
            var SetModues = MasterSettingsService.UserModuleInactive(ModuleId, Active, UserTypeId);
            SetModues.then(function (response) {
                alert('Status Changed Successfully')
                $scope.getUserModules();
            },
        function (error) {
            var err = JSON.parse(error);
        })
        };

        $scope.AddUserModule = function(){
            var SetModues = MasterSettingsService.AddUserModule($scope.userTypesId, $scope.ModuleId);
            SetModues.then(function (response) {
                if (response[0].ResponseCode == '400') {
                    alert(response[0].ResponseDescription)
                } else {
                    alert('User Module Added Successfully')
                    $scope.getUserModules();
                }
                
            },
        function (error) {
          
            var err = JSON.parse(error);
        })
        }

      


        var getUserTypes = AdminService.GetUserTypes();
        getUserTypes.then(function (response) {
            // $scope.ActiveSemesters = response.Table;
           
            $scope.userTypes = response.Table
        },
        function (error) {
            var err = JSON.parse(error);
        });

        $scope.getModules = function () {
            //localStorage.setItem("userType_Id", $scope.userTypeId)
            var getModues = AdminService.GetAllModulesbyRole($scope.userTypeId);
            getModues.then(function (response) {
                if (response.length > 0) {
                    $scope.modules = response;
                    $scope.result = true;
                }
              
            },
        function (error) {
          
            var err = JSON.parse(error);
            $scope.result = false;
        });
        }

        $scope.OpenSubmodules = function (moduleId) {
       $localStorage.moduleData = {
                userTypeId: $scope.userTypeId,
                moduleId: moduleId
            }
       $state.go("Dashboard.MasterSettings.SubModuleSettings");
        }

    })
})