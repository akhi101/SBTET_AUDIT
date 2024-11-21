define(['app'], function (app) {
    app.controller("ViewAuthorizationController", function ($scope, $http, $timeout, $localStorage, $state, $stateParams, AppSettings, TwshStudentRegService) {

        var authData = $localStorage.Twsh;

        $scope.UserId = authData.UserId;
        $scope.courseId = $localStorage.collegeAuthorization.CourseId;
        $scope.GradeId = $localStorage.collegeAuthorization.GradeId;
        $scope.LanguageId = $localStorage.collegeAuthorization.LanguageId;
        $scope.ExamBatch = $localStorage.collegeAuthorization.ExamBatch;
        $scope.DataType = $localStorage.collegeAuthorization.DataType;
        if ($scope.DataType == '0') {
            $scope.Title = "Registered"
        } else if ($scope.DataType == '1') {
            $scope.Title = "Approved"
        } else if ($scope.DataType == '2') {
            $scope.Title = "Pending"
        } else if ($scope.DataType == '3') {
            $scope.Title = "Rejected"
        }
        //$scope.UserId = "3";
        //$scope.courseId = "1";
        //$scope.GradeId = "1";
        //$scope.LanguageId = "1";
        //$scope.ExamBatch = "2";


        var GetApprovedList = TwshStudentRegService.getApprovedList($scope.UserId, $scope.courseId, $scope.GradeId, $scope.LanguageId, $scope.ExamBatch, $scope.DataType);
        GetApprovedList.then(function (response) {
            // alert()

            if (response) {
                if (response.Table.length > 0) {
                    $scope.studDetailsfound = true;
                    //  $scope.StatusMessage = true;
                    //  $scope.showStatus = true;
                    $scope.approvedList = response.Table;

                } else {
                    $scope.approvedList = [];
                    $scope.StatusMessage = "No data found!";
                    $scope.showStatus = true;
                    $scope.statusclass = "alert-danger";
                    $scope.studDetailsfound = false;
                }

            } else {
                $scope.approvedList = [];
                $scope.StatusMessage = "No data found!";
                $scope.showStatus = true;
                $scope.statusclass = "alert-danger";
                $scope.studDetailsfound = false;
            }

        },
            function (error) {
                $scope.approvedList = [];
                $scope.StatusMessage = "Something went wrong !";
                $scope.showStatus = true;
                $scope.statusclass = "alert-danger";
                $scope.studDetailsfound = false;

            });

        $scope.openStudentDetails = function (ApplicationNumber, Name, Gender, PhoneNumber, Id) {
            var ApplicationDetails = {
                ApplicationNumber: ApplicationNumber,
                Name: Name,
                Gender: Gender,
                PhoneNumber: PhoneNumber,
                Id: Id
            }
            $localStorage.ApplicationDetails = ApplicationDetails;

            $state.go('TWSH.AuthorizationDetails')
        }

    })
})