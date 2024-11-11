(function () {
    'use strict';
    angular.module('app')
        .controller('studentDetailViewController',
        function ($rootScope, $scope, studentDetailsViewService, AppSettings) {

            $scope.studentdetails = {};
            $scope.studentdetailsShow = false;
            $scope.tempStudentDetailView = {};
            $scope.tempStudentDetailView.HTNo === undefined;
            $scope.init = function () {

            };
            $scope.getStudentDetailView = function () {
                if ($scope.tempStudentDetailView.HTNo !== undefined && $scope.tempStudentDetailView.HTNo.toString().length >= 0) {
                    $scope.tempStudentDetailView.ExamInstID = AppSettings.ExamInstID; // Current ExamInstID
                    studentDetailsViewService.getStudentDetailViewByHTNO($scope.tempStudentDetailView).then(function (results) {
                        if (results.IsSuccess) {
                            $scope.studentdetailsShow = true;
                            $scope.studentdetails = results.Data[0];
                        } else {
                            alert(results.Message);
                            $scope.tempStudentDetailView.HTNo === undefined;
                            $scope.studentdetails = {};
                        }
                    }, function (error) {
                        alert(error.statusText);
                        $scope.studentdetails = {};
                        $scope.tempStudentDetailView.HTNo === undefined;
                    });
                }
            };

            });
}());

