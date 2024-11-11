define(['app'], function (app) {
    app.controller("StudentFeePaymentController", function ($scope, $http, $localStorage, $state, AppSettings) {
        var authdata = $localStorage.authorizationData;
        $scope.userType = authdata.SystemUserTypeId;
        var submodules = [];
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
        //obj.ModuleRouteName = '';
        //obj.ModuleImageClass = 'small-box bg-blue ';
        //submodules.push(obj);
        
        //var obj = {};
        //obj.SysModName = 'NR Download';
        //obj.SysModID = '5';
        //obj.ModuleRouteName = '';
        //obj.ModuleImageClass = 'small-box bg-orange ';
        //submodules.push(obj);

        //var obj = {};
        //obj.SysModName = 'Reports';
        //obj.SysModID = '5';
        //obj.ModuleRouteName = 'Reports';
        //obj.ModuleImageClass = 'small-box bg-maroon ';
        //submodules.push(obj);

        
        $scope.submodules = submodules;
       
        $scope.OpenModule = function (ModuleRouteName) {
           
            $state.go(ModuleRouteName);
        }

        $scope.OpenDashboard = function () {
            $state.go('Dashboard')
        }
    })
})