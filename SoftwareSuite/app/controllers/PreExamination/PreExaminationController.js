define(['app'], function (app) {
    app.controller("PreExaminationController", function ($scope, $http, $localStorage, $state, AppSettings, SystemUserService) {
       
        var authdata = $localStorage.authorizationData;
        $scope.userType = authdata.SystemUserTypeId;
        $scope.hide = false;
        if ($scope.userType != 3) {
            $scope.hide = true;
        }
      
        var submodules = [];
        var ModuleId = parseInt($localStorage.selectedModule.Id);
        var usertypeId = parseInt($scope.userType);
        var getAdmissionsubmod = SystemUserService.GetSubModulesbyRole(usertypeId, ModuleId);
        getAdmissionsubmod.then(function (Usersdata) {
            var modulesList = [];
            var moduleroutename = "";
            if (Usersdata.length > 0) {
                for (var i = 0; i < Usersdata.length; i++) {
                   
                    var obj = {};
                    obj.SysModName = Usersdata[i].SubModuleName;
                    obj.SysModID = Usersdata[i].id;
                    obj.ModuleRouteName = Usersdata[i].SubModuleRouteName;
                    obj.ModuleImageClass = Usersdata[i].Class;
                    modulesList.push(obj);
                   
                }
                $scope.PreExamModules = modulesList;
               // $('.overlayCss').css('display', 'none');
            } else {
                $scope.PreExamModules = [];
            }
        }, function (err) {
            console.log(err);
        });

        $scope.$on('showLoading', function (evt,data) {
            $('.overlayCss').css('display', 'block');
        });

        $scope.$on('hideLoading', function (evt,data) {
            $('.overlayCss').css('display', 'none');
        });


        //if($scope.userType==1){

        //    var obj = {};
        //    obj.SysModName = 'Set Exam Dates';
        //    obj.SysModID = '4';
        //    obj.ModuleRouteName = 'SetDates';
        //    obj.ModuleImageClass = 'small-box bg-blue';
        //    submodules.push(obj);

        //   var obj = {};
        //    obj.SysModName = 'Set Exam Centers';
        //    obj.SysModID = '6';
        //    obj.ModuleRouteName = 'SetExamCenters';
        //    obj.ModuleImageClass = 'small-box bg-orange ';
        //    submodules.push(obj);
           
        //    var obj = {};
        //    obj.SysModName = 'Search Pin';
        //    obj.SysModID = '3';
        //    obj.ModuleRouteName = 'Search';
        //    obj.ModuleImageClass = 'small-box bg-navy';
        //    submodules.push(obj);      
    
        //    var obj = {};
        //    obj.SysModName = 'Sms Service';
        //    obj.SysModID = '2';
        //    obj.ModuleRouteName = 'SmsService';
        //    obj.ModuleImageClass = 'small-box bg-blue';
        //    submodules.push(obj);

        //}   
        //var obj = {};
        //obj.SysModName = 'Fee Payment';
        //obj.SysModID = '7';
        //obj.ModuleRouteName = 'PreExamFeePayment';
        //obj.ModuleImageClass = 'small-box bg-blue ';
        //submodules.push(obj);
        
        //var obj = {};
        //obj.SysModName = 'NR Download';
        //obj.SysModID = '5';
        //obj.ModuleRouteName = 'NrDownload';
        //obj.ModuleImageClass = 'small-box bg-orange ';
        //submodules.push(obj);

        //var obj = {};
        //obj.SysModName = 'Reports';
        //obj.SysModID = '5';
        //obj.ModuleRouteName = 'PreExamReports';
        //obj.ModuleImageClass = 'small-box bg-maroon ';
        //submodules.push(obj);

        
        $scope.submodules = submodules;
       
        $scope.OpenSubModule = function (Module) {
            $state.go("Dashboard.PreExamination." + Module.ModuleRouteName);
        }

        $scope.OpenDashboard = function () {
            $state.go('Dashboard')
        }
    })
})