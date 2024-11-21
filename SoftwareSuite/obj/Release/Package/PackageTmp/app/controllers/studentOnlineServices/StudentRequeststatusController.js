define(['app'], function (app) {
    app.controller("StudentRequeststatusController", function ($scope, $http, $localStorage, $state, $stateParams, AppSettings) {

        $scope.studentform = [];

        $scope.studentform = [
            { 'StudentName': 'Santhosh', 'FatherName': 'Kumar', 'PinNumber': '19001-m-001', 'Gender': 'Male', 'DOB': '12/12/1993' },
            { 'StudentName': 'Naresh', 'FatherName': 'Kumar', 'PinNumber': '19001-m-002', 'Gender': 'Male', 'DOB': '12/12/1998' },
            { 'StudentName': 'Ramya', 'FatherName': 'jeevan', 'PinNumber': '19001-m-003', 'Gender': 'feMale', 'DOB': '12/12/1994' }

        ];

        console.log($scope.studentform);
    



      
    })
})