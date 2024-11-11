define(['app'], function (app) {
    app.controller("TCApprovalHODController", function ($scope, $http, $localStorage, $state, AppSettings, SystemUserService, AcademicService) {

        $scope.Data = [{ "PIN": "190011-m-001", "Name": "AKINAPELLY SHARAD VAMSHI", "ApplicationNo": "18523582", "Detailes": true, "Dues": true },
        { "PIN": "18044-EC-010", "Name": "BOLUKONDA GAYATHRI", "ApplicationNo": "18523584", "Detailes": false, "Dues": false },
        { "PIN": "18204-EC-011", "Name": "BILLA VARSHA", "ApplicationNo": "1852358252", "Detailes": false, "Dues": false }];



    });
});