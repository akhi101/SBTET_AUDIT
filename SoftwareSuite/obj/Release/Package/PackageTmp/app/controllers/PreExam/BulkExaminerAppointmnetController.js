(function () {
    'use strict';
    angular.module('app')
        .controller('BulkExaminerAppointmnetController',
            function ($rootScope, $scope, preExaminerAppointmentsService, basicCourseService, AppSettings) {


                $scope.BulkExaminerAppointmnet = {};
                $scope.campshow = true;
                $scope.init = function () {
                    getAllBasicCourse();
                    //getAllCampusList();
                    getBasicExaminerTypes();
                    $scope.basicEvalTypes = [{ EvalTypeName: 'Theory', EvalTypeID: 1 },
                    { EvalTypeName: 'Practical', EvalTypeID: 2 }];

                };

                var getAllBasicCourse = function () {
                    basicCourseService.getAllBasicCourse().then(function (results) {
                        $scope.basicCourses = results;
                    });
                };

                var getAllCampusList = function () {
                    preExaminerAppointmentsService.getbasicCampusListByDistrictID(AppSettings.ExamInstID, 'P').then(function (results) {
                        $scope.basicCampusList = results;
                    });
                };
                var getBasicExaminerTypes = function () {
                    preExaminerAppointmentsService.getBasicExaminerTypes().then(function (results) {
                        $scope.basicExaminerTypes = results;
                    });
                };
                $scope.$watch('BulkExaminerAppointmnet.EvalTypeID', function () {
                    if ($scope.BulkExaminerAppointmnet.EvalTypeID !== undefined) {
                        if ($scope.BulkExaminerAppointmnet.EvalTypeID == 1) {
                            $scope.campshow = true;
                            $scope.BulkExaminerAppointmnet.SubType = "T";
                        }
                        else {
                            $scope.campshow = false;
                            $scope.BulkExaminerAppointmnet.SubType = "P";
                        }
                        preExaminerAppointmentsService.getbasicCampusListByDistrictID(AppSettings.ExamInstID, $scope.BulkExaminerAppointmnet.SubType).then(function (results) {
                            $scope.basicCampusList = results;
                        });
                    }

                });
                $scope.ProcessBulkExaminerAppointmnet = function () {
                    if ($scope.BulkExaminerAppointmnet.EvalTypeID == 1) {
                        $scope.BulkExaminerAppointmnet.CampusID = $scope.BulkExaminerAppointmnet.CampusID;
                        $scope.BulkExaminerAppointmnet.PrePractCntrID = 0;
                    }
                    else {
                        $scope.BulkExaminerAppointmnet.CampusID = 0;
                        $scope.BulkExaminerAppointmnet.PrePractCntrID = $scope.BulkExaminerAppointmnet.PrePractCntrID;
                    }
                    $scope.BulkExaminerAppointmnet.InstanceID = AppSettings.ExamInstID; //Current instance Id
                    $scope.BulkExaminerAppointmnet.UpdLoginID = AppSettings.LoggedUserId;
                    $scope.BulkExaminerAppointmnet.FromDate = new Date($scope.BulkExaminerAppointmnet.FromDate.toString("YYYY-MM-DD"));
                    $scope.BulkExaminerAppointmnet.ToDate = new Date($scope.BulkExaminerAppointmnet.ToDate.toString("YYYY-MM-DD"));
                    preExaminerAppointmentsService.ProcessBulkExaminerAppointmnet($scope.BulkExaminerAppointmnet).then(function (results) {
                        if (results != "") {
                            alert("Process done successfully");
                        }
                    }, function (error) {
                        $scope.BulkExaminerAppointmnet = {};
                        alert(error.statusText);
                    });
                };

            });
}());