define(['app'], function (app) {
    app.controller("TwshCbtStudentsController", function ($scope, $filter, $http, $timeout, $localStorage, $state, $stateParams, AppSettings, TwshStudentRegService, $uibModal) {
        var authData = $localStorage.Twsh;
        $scope.studDetailsfound = false;
        $scope.failed = false;
        $scope.showStudentsTable = false;
        $scope.examDate = "";
        $scope.userId = authData.UserId;
        $scope.UserId = authData == undefined || authData == "" ? -1 : authData.UserId;
        $scope.StatusMessage = "No data found!";
        $scope.showStatus = false;
        $scope.statusclass = "alert-warning";
        $scope.studDetailsfound = false;
        $scope.CbtStudents = [];
        $scope.examDate = new Date();
        const $ctrl = this;

        $ctrl.$onInit = () => {
            //$scope.getStudents();
        }


        var date = new Date();
        date.setHours('11');
        date.setMinutes('00');
        $scope.rescheduleexamtime = moment(date).format("HH:mm");
        $scope.getStudents = function () {
            $scope.showStudentsTable = false;
            var getCbtStudents = TwshStudentRegService.getCbtStudents($scope.userId, $filter('date')($scope.FromDate, 'yyyy-MM-dd'), $filter('date')($scope.ToDate, 'yyyy-MM-dd'));
            getCbtStudents.then(function (response) {      
                if (response.Table.length > 0) {
                   
                    $scope.showStatus = false;
                    $scope.showStudentsTable = true;
                    $scope.CbtStudents = response.Table;
                    console.log($scope.CbtStudents)
                  
                } else {
                    $scope.showStatus = true;
                }
            });
        };

        $scope.CbtReschedule = function (data) {
            $scope.examtime = "";
            $scope.Rescheduledata = data;
            $scope.modalInstance = $uibModal.open({
                templateUrl: "/app/views/TWSH/TwshCbtReschedulePopup.html",
                size: 'xlg',
                scope: $scope,
                windowClass: 'modal-fit-att',
                //backdrop: 'static',
            });
        }

        $scope.closeModal = function () {
            $scope.modalInstance.close();         
        }

        $scope.AbsentExam = function (Id) {
            var RescheduleCbtExamDetails = TwshStudentRegService.AbsentExam(Id);
            RescheduleCbtExamDetails.then(function (response) {
                if (response.Table[0].ResponceCode == '200') {
                    alert(response.Table[0].ResponceDescription);
                    $scope.closeModal();
                    $scope.getStudents();
                } else if (response.Table[0].ResponceCode == '400') {
                    alert(response.Table[0].ResponceDescription);
                    $scope.closeModal();
                    $scope.getStudents();
                } else {
                    alert('Something Went Wrong');
                    $scope.getStudents();
                }
            }, function (error) {

            });
        }

        $scope.RescheduleStudentExam = function (Id, RescheduleDate, rescheduleexamtime) {
            if (RescheduleDate == null || RescheduleDate == undefined) {
                alert('Select Reschedule Exam Date.');
            }

            if ($scope.rescheduleexamtime == '11:00') {
                var examdate = $filter('date')(RescheduleDate, 'dd-MM-yyyy') + " " + $scope.rescheduleexamtime;
            } else {
                var examdate = $filter('date')(RescheduleDate, 'dd-MM-yyyy') + " " + moment(rescheduleexamtimee).format("HH:mm");
            }

          

            var RescheduleCbtExamDetails = TwshStudentRegService.RescheduleCbtExamDetails(Id, examdate);
            RescheduleCbtExamDetails.then(function (response) {
                if (response.Table[0].ResponceCode == '200') {
                    alert(response.Table[0].ResponceDescription);
                    $scope.closeModal();
                    $scope.getStudents();
                } else if (response.Table[0].ResponceCode == '400') {
                    alert(response.Table[0].ResponceDescription);
                    $scope.closeModal();
                    $scope.getStudents();
                } else {
                    alert('Something Went Wrong');
                    $scope.getStudents();
                }
            },function (error) {
                   
                });
        }
      

        $scope.getExamStartToken = function (ApplicationNumber) {
          //  alert("This Service will be Resumed soon")
            var getExamStartToken = TwshStudentRegService.getExamStartToken(ApplicationNumber);
            getExamStartToken.then(function (response) {
                if (response != "ERROR") {
                    var location = window.location.origin;
                    window.location.href = "https://sbtet.telangana.gov.in/TwshCbt/Sso/StartExam?token=" + response;
                    // if (location == "https://sbtet.telangana.gov.in" || location == "http://sbtet.telangana.gov.in") {
                    //     window.location.href = "https://sbtet.telangana.gov.in/TwshCbt/Sso/StartExam?token=" + response;
                    // } else {
                    //     window.location.href = "http://localhost:55563/TwshCbt/Sso/StartExam?token=" + response;
                    // }
                }
            });
        }
    });
});