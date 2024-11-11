define(['app'], function (app) {
app.controller("ExamAdvanceController", function ($scope, $http, $localStorage, $state, $stateParams, AppSettings, $uibModal, $timeout, PreExaminationService) {
    var authData = $localStorage.authorizationData;
    $scope.ExamCategory = [];
    $scope.userName = authData.userName;
    $scope.College_Code = authData.College_Code;
    AppSettings.College_Name = authData.College_Name;
    $scope.College_Name = authData.College_Name;
    AppSettings.userName = authData.userName;
    $scope.BranchId = authData.BranchId;
    $scope.CollegeID = authData.CollegeID;
    $scope.userType = authData.SystemUserTypeId
    
    $scope.StudentAmount = 10;
    var getExamMonth = PreExaminationService.GetExamMonthYears();
    getExamMonth.then(function (response) {
        if (response.Table.length > 0) {
            $scope.MonthAndYear = response.Table;
        } else {
            $scope.StudentType = [];
            alert("No Student found on this Record");
        }
    },
        function (error) {
            alert("error while loading Exam Month Years");
            console.log(error);

        });

    $scope.OpenPopup = function () {

        $scope.modalInstance = $uibModal.open({
            templateUrl: "/app/views/DcBills/AdvancePopup.html",
            size: 'xlg',
            scope: $scope,
            windowClass: 'modal-fit-att',

        });
    }

    $scope.ExamAdvanceData = [
        { "CollegeCode": "001", "Clgname": "College One", "Date": "10-01-2021", "Counts": "200" },
         { "CollegeCode": "002", "Clgname": "College Two", "Date": "10-01-2021", "Counts": "300" },
          { "CollegeCode": "003", "Clgname": "College Three", "Date": "10-01-2021", "Counts": "400" },
           { "CollegeCode": "004", "Clgname": "College Four", "Date": "10-01-2021", "Counts": "500" },
            { "CollegeCode": "005", "Clgname": "College Five", "Date": "10-01-2021", "Counts": "600" },
             { "CollegeCode": "006", "Clgname": "College Six", "Date": "10-01-2021", "Counts": "700" },
    ]

    $scope.Amount = $scope.StudentAmount * '3500';
    $scope.ChangeValue = function (StudentAmount) {
       
        $scope.Amount = StudentAmount * "3500";
        console.log($scope.Amount)
        $scope.ExamAdvanceData1 = [
       { "CollegeCode": "001", "Clgname": "College One", "Date": "10-01-2021", "Counts": "200", "Price": $scope.Amount },
        { "CollegeCode": "002", "Clgname": "College Two", "Date": "10-01-2021", "Counts": "400", "Price": $scope.Amount },
         { "CollegeCode": "003", "Clgname": "College Three", "Date": "10-01-2021", "Counts": "500", "Price": $scope.Amount },
          { "CollegeCode": "004", "Clgname": "College Four", "Date": "10-01-2021", "Counts": "600", "Price": $scope.Amount },
           { "CollegeCode": "005", "Clgname": "College Five", "Date": "10-01-2021", "Counts": "700", "Price": $scope.Amount },
            { "CollegeCode": "006", "Clgname": "College Six", "Date": "10-01-2021", "Counts": "800", "Price": $scope.Amount },
        ]
    }
   
    $scope.ExamAdvanceData1 = [
        { "CollegeCode": "001", "Clgname": "College One", "Date": "10-01-2021", "Counts": "200", "Price": $scope.Amount },
         { "CollegeCode": "002", "Clgname": "College Two", "Date": "10-01-2021", "Counts": "400", "Price": $scope.Amount },
          { "CollegeCode": "003", "Clgname": "College Three", "Date": "10-01-2021", "Counts": "500", "Price": $scope.Amount },
           { "CollegeCode": "004", "Clgname": "College Four", "Date": "10-01-2021", "Counts": "600", "Price": $scope.Amount },
            { "CollegeCode": "005", "Clgname": "College Five", "Date": "10-01-2021", "Counts": "700", "Price": $scope.Amount },
             { "CollegeCode": "006", "Clgname": "College Six", "Date": "10-01-2021", "Counts": "800", "Price": $scope.Amount },
    ]
    
})
})