define(['app'], function (app) {
    app.controller("AdministrationServicesController", function ($scope, $http, $localStorage, $state,$uibModal,AppSettings) {

        $scope.Approvals = [{ "pin": "19001-M-001", "Name": "M Vamshi", "Application": "15043M010", "FeePaid": true, "Approved": "Yes" },
            { "pin": "19001-M-002", "Name": "M Ramesh", "Application": "15043M011", "FeePaid": false, "Approved": "No" },
             { "pin": "19001-M-003", "Name": "M Suresh", "Application": "15043M012", "FeePaid": false, "Approved": "No" },
        ]
        $scope.pin = '19001-M-001'
        $scope.StudentName = 'M Vamshi'
        $scope.FatherName = 'M Ramesgh Kumar' 
        $scope.Gender = 'Male'
        $scope.DateOfBIrth = '01-01-1998'
        $scope.BranchName = 'Mechanical Engineering'
        $scope.CollegeName = 'Govt Polytechnic College'
        $scope.Scheme = 'C18'
        $scope.ViewDetails = function () {
            $scope.modalInstance = $uibModal.open({
                templateUrl: "/app/views/StudentServices/StudentDetailsPopup.html",
                size: 'xlg',
                scope: $scope,
                windowClass: 'modal-fit-att',
                //backdrop: 'static',

            });
        }
    })
})