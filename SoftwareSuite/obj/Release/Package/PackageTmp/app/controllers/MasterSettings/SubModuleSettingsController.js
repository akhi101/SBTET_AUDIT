define(['app'], function (app) {
    app.controller("SubModuleSettingsController", function ($scope, $http, $localStorage, $state, AppSettings, AdminService, MasterSettingsService) {
        const $ctrl = this
        $ctrl.$onInit = () => {
            $scope.usertypeId = $localStorage.moduleData.userTypeId
            $scope.ModuleId = $localStorage.moduleData.moduleId
            $scope.getSubModules()
            $scope.getUserSubModules()
        }
        
        $scope.AddSubModule = function () {            
            var AddModules = MasterSettingsService.AddSubModules($scope.ModuleId, $scope.ColourId, $scope.SubModule, $scope.SubModuleRouteName);
            AddModules.then(function (response) {
                alert('Sub Module Changed Successfully')
                $scope.getSubModules()
                var getModues = MasterSettingsService.getAllSubModules();
                getModues.then(function (response) {
                    if (response.Table.length > 0) {
                        //     console.log(response);
                        $scope.getAllSubModules = response.Table;
                        // $scope.result = true;
                    }
                },
            function (error) {
                alert("error while loading Modules");
                var err = JSON.parse(error);

            });
                $scope.getUserSubModules()
              
                //$scope.getUserSubModules()
            },
        function (error) {
            alert("error while loading Modules");
            var err = JSON.parse(error);
            console.log(err.Message);
        })
        }
      

        $scope.getSubModules = function () {
            var getModues = AdminService.GetSubModulesbyRole($scope.usertypeId, $scope.ModuleId);;
            getModues.then(function (response) {
                console.log(response)
                $scope.SubModules = response;
            },
        function (error) {
            alert("error while loading Modules");
            var err = JSON.parse(error);
            console.log(err.Message);
        });
        }
        var getSubModues = MasterSettingsService.getSubModules();
        getSubModues.then(function (response) {
            if (response.Table.length > 0) {
                console.log(response);
                $scope.GetSubModules = response.Table;
                // $scope.result = true;
            }
        },
    function (error) {
        alert("error while loading Modules");
        var err = JSON.parse(error);

    });

        var getModuesColours = MasterSettingsService.getModuleColors();
        getModuesColours.then(function (response) {
            if (response.Table.length > 0) {
                console.log(response);
                $scope.moduleColours = response.Table;
                // $scope.result = true;
            }
        },
    function (error) {
        alert("error while loading Modules");
        var err = JSON.parse(error);

    });

        var getModues = MasterSettingsService.getModules();
        getModues.then(function (response) {
            if (response.Table.length > 0) {
                //     console.log(response);
                $scope.GetModules = response.Table;
                // $scope.result = true;
            }
        },
    function (error) {
        alert("error while loading Modules");
        var err = JSON.parse(error);

    });

        var getModues = MasterSettingsService.getAllSubModules();
        getModues.then(function (response) {
            if (response.Table.length > 0) {
                //     console.log(response);
                $scope.getAllSubModules = response.Table;
                // $scope.result = true;
            }
        },
    function (error) {
        alert("error while loading Modules");
        var err = JSON.parse(error);

    });
        $scope.getUserSubModules = function(){
        var getModues = MasterSettingsService.getAllUserSubModules();
        getModues.then(function (response) {
            if (response.Table.length > 0) {
                //     console.log(response);
                $scope.getAllUserSubModules = response.Table;
                // $scope.result = true;
            }
        },
    function (error) {
        alert("error while loading Modules");
        var err = JSON.parse(error);

    });
        }

        $scope.ChangeModules = function (ModuleId) {
            var SetModues = MasterSettingsService.GetSubmodulesByModule(ModuleId);
            SetModues.then(function (response) {
                if (response.length > 0) {
                    $scope.GetSubModulesByModule = response;
                } else {
                    alert('No Sub-Modules Found')
                }
              
            },
        function (error) {
            alert("error while loading SubModules");
            var err = JSON.parse(error);
            console.log(err.Message);
        })
        }

        $scope.SubModuleInactive = function (ModuleId, IsActive, UserTypeId) {
            //alert(IsActive)
            if (IsActive == true) {
                var Active = 0;
            } else {
                var Active = 1;
            }

            var SetModues = MasterSettingsService.UserSubModuleInactive(ModuleId, Active, UserTypeId);
            SetModues.then(function (response) {
                alert('Status Changed Successfully')
                $scope.getUserSubModules()
               
            },
        function (error) {
            alert("error while loading Modules");
            var err = JSON.parse(error);
            console.log(err.Message);
        })
        };

      

        var getUserTypes = AdminService.GetUserTypes();
        getUserTypes.then(function (response) {
            // $scope.ActiveSemesters = response.Table;

            $scope.userTypes = response.Table
        },
        function (error) {
            alert("error while loading User Types");
            var err = JSON.parse(error);
            console.log(err.Message);
        });

        
        $scope.AddUserSubModule = function (userTypeId, ModuleId, SubModuleId) {
           
           
            //alert($scope.userTypeId)
            var SetSubModues = MasterSettingsService.AddUserSubModule(userTypeId, ModuleId, SubModuleId);
            SetSubModues.then(function (response) {
                if (response[0].ResponseCode == '400') {
                    alert(response[0].ResponseDescription)
                } else {
                    // console.log(response);
                    alert('User Sub Module Added Succesfully')
                    $scope.getUserSubModules()
                }
             
               
            },
        function (error) {
            alert("error while loading Modules");
            var err = JSON.parse(error);
            console.log(err.Message);
        })
        }

        


        $scope.SwitchSubmodule = function (SubModuleId, IsActive) {
            //alert(SubModuleId);
            //alert(IsActive)
            if (IsActive == true) {
                var Active = 0;
            } else {
                var Active = 1;
            }
            //console.log(usertypeId, ModuleId, SubModuleId, Active)
            var SetModues = AdminService.SetSubModuleInactive($scope.usertypeId, $scope.ModuleId, SubModuleId, Active);
            SetModues.then(function (response) {
                console.log(response)
                // $scope.SubModules = response;
                alert(response[0].Message);
                $scope.getSubModules();
            },
        function (error) {
            alert("error while loading Modules");
            var err = JSON.parse(error);
            console.log(err.Message);
        })
        };

    })
})
