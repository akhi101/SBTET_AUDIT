(function () {
    'use strict';
    angular.module('app')
        .controller('VocationalPracticalBatchTimeTable1Controller', ['$rootScope', '$scope', 'VocationalPracticalBatchTimeTableService', 'basicDistrictsService', 'basicCourseService', 'basicExamService',
            function ($rootScope, $scope, VocationalPracticalBatchTimeTableService, basicDistrictsService, basicCourseService, basicExamService) {

                $scope.VocationalPracticalBatchTimeTable = {};
                $scope.VocationalPracticalBatchTimeTableList = [];
                $scope.preVocBatchesList = [];
                $scope.init = function () {
                    getAllBasicCourse();
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
                    basicDistrictsService.getGetBasicDistrictsByDistrictID(AppSettings.DistrictIDs).then(function (results) {
                        $scope.basicDistrictList = results;
                        $scope.VocationalPracticalBatchTimeTable.DistrictID = "" + $scope.basicDistrictList[0].DistrictID + "";
                    });
                };

                $scope.$watch('VocationalPracticalBatchTimeTable.courseID', function () {
                    if ($scope.VocationalPracticalBatchTimeTable.courseID !== undefined) {
                        basicExamService.getBasicExamListByCourseID($scope.VocationalPracticalBatchTimeTable.courseID).then(function (results) {
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

                        var PraCenterList = PrePractCenterService.GetPracticalCenterListByDistrictIDANDZoneType(AppSettings.ExamInstID, 3, DistrictID);
                        PraCenterList.then(function (PraCenterData, status, headers, config, error) {
                            $scope.PraCenterList = PraCenterData;
                        }, function (PraCenterData, status, headers, config) {
                            alert(error);
                        })
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
                                $scope.tempDetails.fromDate = new Date($scope.examinerAppointmentDetail.fromDate.toString("YYYY-MM-DD"));
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