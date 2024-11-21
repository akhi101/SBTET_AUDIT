define(['app'], function (app) {
    app.controller("SystemUserLogController", function ($scope, $state, $stateParams, AppSettings, SystemUserService) {
//        $scope.SystemUserLog = {};
        $scope.SystemUserLog = { ReqState: $stateParams.ReqState, xFrmString: $stateParams.xFrmString, xFrmProgramID: $stateParams.xFrmProgramID, xFrmOpenedByUserID: $stateParams.xFrmOpenedByUserID };
         var SystemUserLog = SystemUserService.GetUpdateSystemUserLog($stateParams.xFrmString, $stateParams.xFrmProgramID, $stateParams.xFrmOpenedByUserID);
        SystemUserLog.then(function (SystemUserInfoList, status, headers, config, error) {
            $state.go($scope.SystemUserLog.ReqState);
        }, function (error) {
            $state.go($scope.SystemUserLog.ReqState);
        });
    });
});