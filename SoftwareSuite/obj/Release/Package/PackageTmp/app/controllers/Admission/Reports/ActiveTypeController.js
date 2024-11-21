define(['app'], function (app) {
    app.controller("ActiveTypeController", function ($scope, $http, $localStorage, $state, $stateParams, AppSettings) {

        var PaginationDemoCtrl = function ($scope) {
            $scope.data = [{ "name": "Bell", "id": "K0H 2V5" }, { "name": "Octavius", "id": "X1E 6J0" }, { "name": "Alexis", "id": "N6E 1L6" }]
            $scope.viewby = 10;
            $scope.totalItems = $scope.data.length;
            $scope.currentPage = 4;
            $scope.itemsPerPage = $scope.viewby;
            $scope.maxSize = 5; //Number of pager buttons to show

            $scope.setPage = function (pageNo) {
                $scope.currentPage = pageNo;
            };

            $scope.pageChanged = function () {
                console.log('Page changed to: ' + $scope.currentPage);
            };

            $scope.setItemsPerPage = function (num) {
                $scope.itemsPerPage = num;
                $scope.currentPage = 1; //reset to first page
            }
        };
    



        
    })
})