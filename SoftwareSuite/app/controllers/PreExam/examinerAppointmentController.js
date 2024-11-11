(function () {
    'use strict';
    angular.module('app')
        .controller('examinerAppointmentController', ['$rootScope', '$scope', 'preExaminerAppointmentsService', 'basicCourseService', 'basicExamService', 'examTimeTableService', 'absentDetailService', 'basicZoneService', 'basicBranchService',
            function ($rootScope, $scope, preExaminerAppointmentsService, basicCourseService, basicExamService, examTimeTableService, absentDetailService, basicZoneService, basicBranchService) {

                $scope.examinerAppointmentDetail = {};
                $scope.preExaminerAppointmentsList = [];
                $scope.examinerAppointmentDetail.MainGrpID = 0;
                $scope.init = function () {
                    getAllBasicCourse();
                    getBasicExaminerTypes();
                    getBasicDistrictList();
                };

                var getAllBasicCourse = function () {
                    basicCourseService.getAllBasicCourse().then(function (results) {
                        $scope.basicCourses = results;
                    });
                };

                var getBasicExaminerTypes = function () {
                    preExaminerAppointmentsService.getBasicExaminerTypes().then(function (results) {
                        $scope.basicExaminerTypes = results;
                    });
                };

                var getBasicDistrictList = function () {
                    preExaminerAppointmentsService.getBasicDistrictList().then(function (results) {
                        $scope.basicDistrictList = results;
                    });
                };

                $scope.$watch('examinerAppointmentDetail.courseID', function () {
                    if ($scope.examinerAppointmentDetail.courseID !== undefined) {
                        basicExamService.getBasicExamListByCourseID($scope.examinerAppointmentDetail.courseID).then(function (results) {
                            $scope.basicExams = results;
                        });
                    }
                });

                $scope.$watch('examinerAppointmentDetail.districtID', function () {
                    if ($scope.examinerAppointmentDetail.districtID !== undefined) {
                        preExaminerAppointmentsService.getBasicCollegeListByDistrictID($scope.examinerAppointmentDetail.districtID).then(function (results) {
                            $scope.basicCollegeList = results;
                        });
                        preExaminerAppointmentsService.getBasicCenterCollegeListByDistrictID($scope.examinerAppointmentDetail.districtID).then(function (results) {
                            $scope.basicCenterCollegeList = results;
                        });
                    }
                });

                $scope.$watch('examinerAppointmentDetail.collegeID', function () {
                    if ($scope.examinerAppointmentDetail.collegeID !== undefined) {
                        $scope.examinerAppointmentDetail.evalTypID = 1; // Theory
                        preExaminerAppointmentsService.getSubjectListByCollegeID($scope.examinerAppointmentDetail.collegeID, $scope.examinerAppointmentDetail.evalTypID, $scope.examinerAppointmentDetail.examID).then(function (results) {
                            $scope.subjectList = results;
                        });
                    }
                });

                $scope.$watch('examinerAppointmentDetail.exmSubID', function () {
                    if ($scope.examinerAppointmentDetail.exmSubID !== undefined && $scope.examinerAppointmentDetail.collegeID !== undefined) {
                        preExaminerAppointmentsService.getExaminerListByCollegeID($scope.examinerAppointmentDetail.collegeID, $scope.examinerAppointmentDetail.exmSubID, $scope.examinerAppointmentDetail.ExaminerTypID, $scope.examinerAppointmentDetail.MainGrpID).then(function (results) {
                            $scope.examinerList = results;
                        });
                    }
                });

                $scope.saveExaminerAppointment = function () {
                    if ($scope.examinerList.length > 0) {

                        var selectCount = 0;
                        for (var i = 0; i < $scope.examinerList.length; i++) {
                            selectCount = parseInt(selectCount) + 1;
                            if (selectCount > 1) {
                                alert("Only one examiner need to be select");
                                return;
                            }
                        }

                        for (var i = 0; i < $scope.examinerList.length; i++) {
                            if ($scope.examinerList[i].isExaminerChecked) {
                                var temp = {};
                                $scope.tempDetails = {};
                                $scope.tempDetails.appointmentID = $scope.examinerList[i].appointmentID;
                                $scope.tempDetails.examinerTypeID = $scope.examinerAppointmentDetail.examinerTypeID;
                                $scope.tempDetails.instanceID = $scope.examinerList[i].instanceID;
                                $scope.tempDetails.examinerID = $scope.examinerList[i].examinerID;
                                $scope.tempDetails.exmSubID = $scope.examinerAppointmentDetail.exmSubID;
                                $scope.tempDetails.evalTypeID = $scope.examinerAppointmentDetail.evalTypeID;
                                $scope.tempDetails.collegeID = $scope.examinerAppointmentDetail.collegeID;
                                $scope.tempDetails.CampusID = $scope.examinerAppointmentDetail.CampusID;
                                $scope.tempDetails.districtID = $scope.examinerAppointmentDetail.districtID;
                                $scope.tempDetails.fromDate =new Date($scope.examinerAppointmentDetail.fromDate.toString("YYYY-MM-DD"));
                                $scope.tempDetails.toDate = new Date($scope.examinerAppointmentDetail.toDate.toString("YYYY-MM-DD"));
                                $scope.tempDetails.evalTypeID = $scope.examinerAppointmentDetail.evalTypID;
                                angular.copy($scope.tempDetails, temp);
                                $scope.preExaminerAppointmentsList.push(temp);
                                $scope.tempDetails = {};
                            }
                        }
                        if ($scope.preExaminerAppointmentsList.length > 0) {
                            preExaminerAppointmentsService.postPreExaminerAppointmentList($scope.preExaminerAppointmentsList).then(function (results) {
                                
                            });
                        }
                    }
                };
            }]);
}());