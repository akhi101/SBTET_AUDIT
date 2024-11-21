define(['app'], function (app) {
    app.controller("CcicModulesSettingController", function ($scope, $localStorage, $state, CcicAdminService, CcicSettingsService) {
        const $ctrl = this

        $ctrl.$onInit = () => {
            $scope.result = false;    
            $scope.modulecolours();
            $scope.getModules();
            $scope.getsubmodules();
            $scope.getUserTypes();
        }


        var authData = $localStorage.authorizationData;
        $scope.UserTypeID = authData.UserTypeID

        $scope.loading = false;

       
        $scope.tab1 = function () {
            $scope.CardName = null;
            $scope.CardColour = null;
            $scope.CardRoute = null;
        }
        $scope.tab2 = function () {
            $scope.UserType = null;
            $scope.ModuleName = null;
            $scope.ModuleID = null;
        }
        $scope.tab3 = function () {

            $scope.moduleid = null;
            $scope.SubModuleName = null;
            $scope.SubModuleRouteName = null;
            $scope.modulecolour = null;



         
        }
        $scope.tab4 = function () {
            $scope.userTypeId = null;
            $scope.ModuleId = null;
            $scope.submodule = null;
        }

        $scope.Editsemesterdat = function (data, ind) {

            var ele1 = document.getElementsByClassName("enabletable" + ind);
            for (var j = 0; j < ele1.length; j++) {
                ele1[j].style['pointer-events'] = "auto";
                ele1[j].style.border = "1px solid #ddd";
                ele1[j].style['-webkit-appearance'] = "auto";
                ele1[j].style['-moz-appearance'] = "auto";
            }
            $scope['edit' + ind] = false;

        }

        $scope.getModules = function () {
            $scope.loading = true;
            $scope.NoData = false;
            var GetAllCcicModules = CcicSettingsService.GetAllCcicModules();
            GetAllCcicModules.then(function (response) {
                if (response.length > 0) {
                    $scope.loading = false;
                    $scope.ModulesTableData = response;
                    $scope.NoData = false;
                } else {
                    $scope.loading = false;
                    $scope.NoData = true;
                }
            },
                function (error) {
                    $scope.result = false;
                    $scope.NoData = true;
                    alert("error while loading Data");
                    console.log(error);
                });
        }

        $scope.modulecolours = function () {
            var getCcicModuleColours = CcicAdminService.GetCcicModuleColours();
            getCcicModuleColours.then(function (response) {

                $scope.ModuleCardColours = response.Table;

            },
                function (error) {
                    var err = JSON.parse(error);
                });
        }

        $scope.getUserModules = function () {
            $scope.loading = true;
            if ($scope.UserType == null || $scope.UserType == undefined || $scope.UserType == "") {
                return;
               
            }
            var GetCcicUserModules = CcicSettingsService.GetCcicUserModules($scope.UserType);
            GetCcicUserModules.then(function (response) {
                if (response.length > 0) {
                    $scope.loading = false;
                    $scope.GetCcicUserModules = response;
                    $scope.NoData = false;
                } else {
                    $scope.loading = false;
                    $scope.NoData = true;
                }
            },
                function (error) {
                    $scope.result = false;
                    $scope.NoData = true;
                    alert("error while loading Data");
                    console.log(error);
                });
               

        }


        $scope.getAllUserModules = function () {
            var GetAllCcicUserModules = CcicSettingsService.GetAllCcicUserModules();
            GetAllCcicUserModules.then(function (response) {

                $scope.GetAllCcicUserModules = response;

            },
                function (error) {
                    alert("error while loading Modules");
                    var err = JSON.parse(error);

                });

        }


        $scope.getsubmodules = function () {
            var getallsubmod = CcicSettingsService.GetAllCcicSubModules();
            getallsubmod.then(function (response) {

                $scope.SubModulesData = response;

            },
                function (error) {
                    alert("error while loading Modules");
                    var err = JSON.parse(error);

                });
        }



        $scope.AddCcicModule = function () {
            $scope.loading = true;
            var SetModues = CcicSettingsService.AddCcicModule($scope.CardName, $scope.CardRoute, $scope.CardColour, $scope.UserName);
            SetModues.then(function (response) {
                $scope.loading = false;
                if (response[0].ResponseCode == '400') {                  
                    alert(response[0].ResponseDescription);                   
                    $scope.getModules();                    
                    $scope.clearDefaults();
                } else {
                    $scope.loading = false;
                    alert('Module Added Succesfully')
                    $scope.getModules();
                    //$scope.loading = false;
                    $scope.clearDefaults();

                }
                
            },
                function (error) {

                    var err = JSON.parse(error);
                })
        }

        $scope.SetModuleStatus = function (ModuleID, ModuleName,Active) {

          

            if (Active == true) {
                var Active = 0;
            } else {
                var Active = 1;
            }

            var SetModues = CcicSettingsService.SetCcicModuleInactive(1, $scope.UserName, ModuleID, ModuleName, Active);
            SetModues.then(function (responce) {
                if (responce[0].ResponceCode == '400') {
                    alert(responce[0].ResponceDescription)
                    $scope.clearDefaults();
                } else {
                    alert('Module Status Changed Successfully')
                    $scope.getModules();
                    $scope.clearDefaults();
                }

            },
                function (error) {

                    var err = JSON.parse(error);
                })
        };

        $scope.modify = function (ind) {
            $scope.viewField = true;
            $scope.modifyField = true;
           
            var ele1 = document.getElementsByClassName("enabletable" + ind);
            for (var j = 0; j < ele1.length; j++) {
                ele1[j].style['pointer-events'] = "auto";
                ele1[j].style.border = "1px solid #ddd";
                ele1[j].style['-webkit-appearance'] = "auto";
                ele1[j].style['-moz-appearance'] = "auto";
            }
            $scope['edit' + ind] = false;

        };

        $scope.update = function (ind,ModuleID, ModuleName, ModuleRouteName, ModuleCardColourName, ModuleOrder) {

            $scope.viewField = false;
            $scope.modifyField = false;
            $scope['edit' + ind] = true;

            var ele2 = document.getElementsByClassName("enabletable" + ind);
            for (var j = 0; j < ele2.length; j++) {
                ele2[j].style['pointer-events'] = "none";
                ele2[j].style.border = "0";
                ele2[j].style['-webkit-appearance'] = "none";
                ele2[j].style['-moz-appearance'] = "none";
            }

            var update = CcicSettingsService.UpdateCcicModule(2, $scope.UserName, ModuleID, ModuleName, true, ModuleRouteName, ModuleCardColourName, ModuleOrder);
            update.then(function (response) {
                alert("Module Updated Successfully")
                $scope.getModules();
                $scope.clearDefaults();
            },
                function (error) {
                    alert("error while loading Data");
                    console.log(error);
                });
        }


        $scope.AddCcicUserModule = function () {
            $scope.loading = true;
            var SetModues = CcicSettingsService.AddCcicUserModule($scope.UserType, $scope.ModuleID, $scope.UserName);
            SetModues.then(function (response) {
                $scope.loading = true;
                if (response[0].ResponseCode == '400') {
                    $scope.loading = false;
                    alert(response[0].ResponseDescription);
                    $scope.clearDefaults();
                    
                } else {
                    $scope.loading = false;
                    alert('User Module Added Successfully');
                    $scope.loading = false;
                    $scope.getUserModules();
                    $scope.clearDefaults();
                   
                    
                }

            },
                function (error) {

                    var err = JSON.parse(error);
                })
        }


        $scope.SwitchUserModule = function (UserModuleID, Active) {

            if ($scope.UserType == null || $scope.UserType == undefined || $scope.UserType == "") {
                alert("Please Select UserType to use the Operation");
                return
            }

            if (Active == true) {
                var Active = 0;
            } else {
                var Active = 1;
            }

            var SetModues = CcicSettingsService.SetCcicUserModuleInactive(UserModuleID, Active, $scope.UserName);
            SetModues.then(function (response) {
                alert("UserModule Status Updated Successfully");
                $scope.getUserModules();
                $scope.clearDefaults();
                

            },
                function (error) {

                    var err = JSON.parse(error);
                })
        };


        //var GetCcicUserTypes = CcicAdminService.GetCcicUserTypes();
        //GetCcicUserTypes.then(function (response) {

        //    $scope.UserTypes = response.Table
        //},
        //    function (error) {
        //        var err = JSON.parse(error);
        //    });

        $scope.getUserTypes = function () {
            var DataType = 1;
            var getusertype = CcicSettingsService.GetUserTypes(DataType);
            getusertype.then(function (resp) {
                //try {
                //    var res = JSON.parse(resp);
                //}
                //catch (err) { }

                if (resp.length > 0) {
                    $scope.UserTypes = resp;

                }
                else {
                    $scope.UserTypes = [];
                }

            },
                function (error) {
                    //alert("data is not loaded");
                    //    var err = JSON.parse(error);
                });

        }

        //$scope.GetAllCcicModules = function () {
        //    var GetAllCcicModules = CcicSettingsService.GetAllCcicModules;
        //    GetAllCcicModules.then(function (response) {
        //        if (response.length > 0) {
        //            $scope.GetAllCcicModules = response.Table;
        //            $scope.result = true;
        //        }

        //    },
        //        function (error) {

        //            var err = JSON.parse(error);
        //            $scope.result = false;
        //        });
        //}

        $scope.OpenCcicSubmodules = function (ModuleID) {
            $localStorage.moduleData = {
                UserTypeID: $scope.UserTypeID,
                ModuleID: ModuleID
            }
            $state.go("CcicDashboard.Settings.CcicSubModuleSettings");
        }


       

        $scope.getSubModules = function () {
            $scope.loading = true;
            if ($scope.moduleid == null || $scope.moduleid == undefined || $scope.moduleid == "") {
                return;
            }
            var getsubmods = CcicSettingsService.GetCcicSubModules($scope.moduleid);
            getsubmods.then(function (response) {
                if (response.length > 0) {
                    $scope.loading = false;
                    $scope.SubModulesTable = response;
                    $scope.NoData = false;
                } else {
                    $scope.loading = false;
                    $scope.NoData = true;

                }
            },
                function (error) {
                    $scope.result = false;
                    $scope.NoData1 = true;
                    alert("error while loading Data");
                    console.log(error);
                });

        }

        $scope.clearDefaults = function () {

            $scope.CardName = '';
            $scope.CardColour = '';
            $scope.CardRoute = '';




            $scope.UserType = '';
            $scope.ModuleName = '';
            $scope.ModuleID = '';
          
            

            $scope.moduleid = '';
            $scope.SubModuleName = '';
            $scope.SubModuleRouteName = '';
            $scope.modulecolour = '';



            $scope.userTypeId = '';
            $scope.ModuleId = '';
            $scope.submodule = '';
        }
        $scope.AddCcicSubModules = function () {
            $scope.loading = true;
            var SetModues = CcicSettingsService.AddCcicSubModules($scope.moduleid, $scope.SubModuleName, $scope.SubModuleRouteName, $scope.modulecolour, $scope.UserName);
            SetModues.then(function (response) {
                $scope.loading = true;
                if (response[0].ResponseCode == '400') {
                    $scope.loading = false;
                    alert(response[0].ResponseDescription);
                    $scope.loading = false;
                    $scope.getSubModules();
                    $scope.getsubmodules();
                    $scope.clearDefaults();
                } else {
                    $scope.loading = false;
                    alert('Sub Module Added Successfully')
                    $scope.getSubModules();
                    $scope.getsubmodules();
                    $scope.clearDefaults();

                }

            },
                function (error) {

                    var err = JSON.parse(error);
                })
        }
        
        $scope.SetSubModuleStatus = function (SubModuleID, SubModuleName, Active) {

            if ($scope.moduleid == null || $scope.moduleid == undefined || $scope.moduleid == "") {
                alert("Please Select Module to use the Operation");
                return
            }
    
            if (Active == true) {
                var Active = 0;
            } else {
                var Active = 1;
            }

            var SetModues = CcicSettingsService.SetCcicSubModuleInactive(1, $scope.UserName, SubModuleID, SubModuleName, Active);
            SetModues.then(function (responce) {
                if (responce[0].ResponceCode == '400') {
                    alert(responce[0].ResponceDescription)
                    $scope.getSubModules();
                    $scope.getsubmodules();
                    $scope.clearDefaults();
                } else {
                    alert('SubModule Status Updated Successfully')
                    $scope.getSubModules();
                    $scope.getsubmodules();
                    $scope.clearDefaults();
                }

            },
                function (error) {

                    var err = JSON.parse(error);
                })
        };

        $scope.ModifyStatus = function (ind) {

            if ($scope.moduleid == null || $scope.moduleid == undefined || $scope.moduleid == "") {
                alert("Please Select Module to use the Operation");
                return
            }
            $scope.viewField = true;
            $scope.modifyField = true;

            var ele1 = document.getElementsByClassName("enabletable" + ind);
            for (var j = 0; j < ele1.length; j++) {
                ele1[j].style['pointer-events'] = "auto";
                ele1[j].style.border = "1px solid #ddd";
                ele1[j].style['-webkit-appearance'] = "auto";
                ele1[j].style['-moz-appearance'] = "auto";
            }
            $scope['edit' + ind] = false;

        };

        $scope.UpdateStatus = function (ind, SubModuleID, SubModuleName, SubModuleRouteName, ModuleCardColourName, SubModuleOrder, moduleid) {


            if ($scope.moduleid == null || $scope.moduleid == undefined || $scope.moduleid == "") {
                alert("Please Select Module to use the Operation");
                return
            }
            
            //var moduleid = ($scope.moduleid == null || $scope.moduleid == undefined || $scope.moduleid == "" ? "" : moduleid)

            $scope.viewField = false;
            $scope.modifyField = false;
            $scope['edit' + ind] = true;

            var ele2 = document.getElementsByClassName("enabletable" + ind);
            for (var j = 0; j < ele2.length; j++) {
                ele2[j].style['pointer-events'] = "none";
                ele2[j].style.border = "0";
                ele2[j].style['-webkit-appearance'] = "none";
                ele2[j].style['-moz-appearance'] = "none";
            }

            var Update = CcicSettingsService.UpdateCcicSubModule(2, $scope.UserName, SubModuleID, SubModuleName, true, SubModuleRouteName, ModuleCardColourName, SubModuleOrder, moduleid);
            Update.then(function (response) {
                alert("SubModule Updated Successfully")
                $scope.getSubModules();
                $scope.getsubmodules();
                $scope.clearDefaults();
            },
                function (error) {
                    alert("error while loading Data");
                    console.log(error);
                });
        }


        $scope.changeUser = function (userTypeId) {
            $scope.userTypeId = userTypeId;
            $scope.loading = false;
            $scope.getusersubModules();

        }
        $scope.ChangeModules = function (ModuleId) {
            $scope.ModuleId = ModuleId;
            $scope.getusersubModules();
        }

        $scope.getusersubModules = function () {
           
            if ($scope.userTypeId == 0 || $scope.userTypeId == null || $scope.userTypeId == undefined) {
                return;
            }
            if ($scope.ModuleId == 0 || $scope.ModuleId == null || $scope.ModuleId == undefined) {
                return;
            }
      
            //$scope.NoData = false;
            $scope.loading = true;
            var GetCcicUserSubModules = CcicSettingsService.GetCcicUserSubModules($scope.userTypeId, $scope.ModuleId);
            GetCcicUserSubModules.then(function (response) {
                if (response.length > 0) {
                    $scope.loading = false;
                    $scope.GetCcicUserSubModules = response;
                    $scope.NoData = false;
                } else {
                    $scope.loading = false;
                    $scope.NoData = true;
                }
            },
                function (error) {
                    $scope.result = false;
                    $scope.NoData = true;
                    alert("error while loading Data");
                    console.log(error);
                });

        }

        $scope.AddCcicUserSubModules = function () {
            $scope.loading = true;
            var SetModues = CcicSettingsService.AddCcicUserSubModules($scope.userTypeId, $scope.ModuleId, $scope.SubMod, $scope.UserName);
            SetModues.then(function (response) {
                $scope.loading = true;
                if (response[0].ResponseCode == '400') {
                    $scope.loading = false;
                    alert(response[0].ResponseDescription);
                    $scope.loading = false;
                    $scope.getusersubModules();
                    $scope.clearDefaults();
                } else {
                    $scope.loading = false;
                    alert('User SubModule Added Successfully')
                    $scope.loading = false;
                    $scope.getusersubModules();
                    $scope.clearDefaults();
                    
                }

            },
                function (error) {

                    var err = JSON.parse(error);
                });
        }

        $scope.SwitchUserSubModule = function (UserSubModuleID, Active) {
            if ($scope.userTypeId == null || $scope.userTypeId == undefined || $scope.userTypeId == "") {
                alert("Please Select UserName to use the Operation");
                return
            }

            if ($scope.ModuleId == null || $scope.ModuleId == undefined || $scope.ModuleId == "") {
                alert("Please Select Module to use the Operation");
                return
            }



            if (Active == true) {
                var Active = 0;
            } else {
                var Active = 1;
            }

            var SetModues = CcicSettingsService.SetCcicUserSubModuleInactive(UserSubModuleID, Active, $scope.UserName);
            SetModues.then(function () {
                alert("UserSubModule Status Updated Successfully");
                $scope.getusersubModules();
                $scope.clearDefaults();
            },
                function (error) {

                    var err = JSON.parse(error);
                })
        };

       

        
    })
})