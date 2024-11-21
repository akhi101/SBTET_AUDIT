define(['app'], function (app) {
    app.controller("ExamResultsDashBoardController", function ($scope, $http, $state) {
      
    
        var modulesList = [];
       
        var obj = {};
        obj.SysModName = 'Diploma Results';
        obj.SysModID = '3';
        obj.Module = 'StudentResult';
        obj.ModuleImageClass = 'small-box bg-yellow';
        modulesList.push(obj);

        var obj = {};
        obj.SysModName = 'Shorthand Results';
        obj.SysModID = '4';
        obj.Module = 'TypingAndShorthand';
        obj.ModuleImageClass = 'small-box bg-blue';
        modulesList.push(obj);
        var obj = {};
        obj.SysModName = 'TWSH Results';
        obj.SysModID = '4';
        obj.Module = 'TwshResults';
        obj.ModuleImageClass = 'small-box bg-blue';
        modulesList.push(obj);
        $scope.modulesList = modulesList;

      //$scope.OpenExamModule = function (Modulename) {
          
        //    var strroute = 'ResultsDashboard.' + Modulename.Module;
        //    $state.go(strroute);
        //     }
        $scope.stboclogin = function () {
            $state.go('login');
        }

       
    });
})