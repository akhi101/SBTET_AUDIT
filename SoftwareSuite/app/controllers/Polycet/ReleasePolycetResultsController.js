define(['app'], function (app) {
    app.controller("ReleasePolycetResultsController", function ($scope, $state, $stateParams, AppSettings, AdminService) {

        setTimeout(() => {
           $state.go('index')
        }, 10000);
    })
})