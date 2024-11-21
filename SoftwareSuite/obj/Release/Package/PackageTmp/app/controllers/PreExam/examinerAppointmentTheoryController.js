(function () {
    'use strict';
    angular.module('app')
        .controller('examinerAppointmentTheoryController', 
        function ($rootScope, $scope, preExaminerAppointmentsService, basicCourseService, basicExamService, absentDetailService, basicZoneService, basicBranchService, PreExmSpelThryService, AppSettings) {

                $scope.examinerAppointmentDetail = {};
                $scope.preExaminerAppointmentsList = [];
                $scope.examinerList = [];
                $scope.deleteExaminerAppointmentsList = [];
                $scope.examinerAppointmentDetail.MainGrpID = 0;

                $scope.init = function () {
                    getAllBasicCourse();
                    getBasicExaminerTypes();
                    getBasicDistrictList();
                    //getTheoryExamSpellList();
                    getCampusList();

                    $scope.appointmentTypes = [
                        { appointmentTypeName: 'General Appointment', appointmentTypeId: 1 },
                        { appointmentTypeName: 'Subject Appointment', appointmentTypeId: 2 }
                    ];
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

                //var getTheoryExamSpellList = function () {
                //    PreExmSpelThryService.GetPreExmSpelThryListByInstance(AppSettings.ExamInstID).then(function (results) {
                //        $scope.TheorySpellList = results;
                //    });
                //};

                var getCampusList = function () {
                    preExaminerAppointmentsService.getbasicCampusListByDistrictID(AppSettings.ExamInstID, 'T').then(function (results) {
                        $scope.basicCampusList = results;
                    });
                };

                $scope.$watch('examinerAppointmentDetail.CourseID', function () {
                    if ($scope.examinerAppointmentDetail.CourseID !== undefined) {
                        if ($scope.examinerAppointmentDetail.CourseID == 1) {
                            $scope.examinerAppointmentDetail.ZoneType = 1;
                        } else if ($scope.examinerAppointmentDetail.CourseID == 2) {
                            $scope.examinerAppointmentDetail.ZoneType = 5;
                        }
                        basicExamService.getBasicExamListByCourseID($scope.examinerAppointmentDetail.CourseID).then(function (results) {
                            $scope.basicExams = results;
                        });
                    }
                });

                $scope.$watch('examinerAppointmentDetail.DistrictID', function () {
                    if ($scope.examinerAppointmentDetail.DistrictID !== undefined) {
                        preExaminerAppointmentsService.getBasicCollegeListByDistrictID($scope.examinerAppointmentDetail.DistrictID).then(function (results) {
                            $scope.basicCollegeList = results;
                        });
                        //preExaminerAppointmentsService.getbasicCampusListByDistrictID(AppSettings.ExamInstID, 'T').then(function (results) {
                        //    $scope.basicCampusList = results;
                        //});
                    }
                });




                $scope.$watch('examinerAppointmentDetail.CollegeID', function () {
                    if ($scope.examinerAppointmentDetail.CollegeID !== undefined) {
                        $scope.examinerAppointmentDetail.EvalTypID = 1; // Theory
                        preExaminerAppointmentsService.getSubjectListByCollegeID($scope.examinerAppointmentDetail.CollegeID, $scope.examinerAppointmentDetail.EvalTypID, $scope.examinerAppointmentDetail.ExamID).then(function (results) {
                            $scope.subjectList = results;
                        });
                    }
                });


                //$scope.$watch('examinerAppointmentDetail.PreExmSplTrID', function () {
                //    if ($scope.examinerAppointmentDetail.PreExmSplTrID !== undefined) {
                //        PreExmSpelThryService.GetPreExmSpelThryByID($scope.examinerAppointmentDetail.PreExmSplTrID).then(function (results) {
                //            $scope.TheorySpellList = results;
                //        });
                //   }

                //});


                //$scope.$watch('examinerAppointmentDetail.exmSubID', function () {
                //    if ($scope.examinerAppointmentDetail.exmSubID !== undefined && $scope.examinerAppointmentDetail.collegeID !== undefined) {
                //        preExaminerAppointmentsService.getExaminerListByCollegeID($scope.examinerAppointmentDetail.collegeID, $scope.examinerAppointmentDetail.exmSubID).then(function (results) {
                //            $scope.examinerList = results;
                //        });
                //    }
                //});

            $scope.showExaminerAppointmentDetails = function () {
                if ($scope.examinerAppointmentDetail.ExmSubID == undefined) $scope.examinerAppointmentDetail.ExmSubID = 0;
                    if ($scope.examinerAppointmentForm.$valid &&  $scope.examinerAppointmentDetail.CollegeID !== undefined) {
                        preExaminerAppointmentsService.getExaminerListByCollegeID($scope.examinerAppointmentDetail.CollegeID, $scope.examinerAppointmentDetail.ExmSubID, $scope.examinerAppointmentDetail.ExaminerTypeID, $scope.examinerAppointmentDetail.ExamID, $scope.examinerAppointmentDetail.MainGrpID).then(function (results) {
                            $scope.examinerList = results;
                            if (results.length == 0) {
                                alert("Data Not Foud");
                                return false;
                            }
                        });
                    }
                };

                
                $scope.deleteExaminerAppointment = function () {
                    if ($scope.examinerAppointmentForm.$valid && $scope.appointmentDetailsForm.$valid && $scope.examinerList.length > 0) {
                        $scope.preExaminerAppointmentsList = [];
                        for (var i = 0; i < $scope.examinerList.length; i++) {
                            if ($scope.examinerList[i].IsExaminerChecked && $scope.examinerList[i].AppointmentID > 0) {
                                var temp = {};
                                $scope.tempDetails = {};
                                $scope.tempDetails.AppointmentID = $scope.examinerList[i].AppointmentID;
                                $scope.tempDetails.SxaminerTypeID = $scope.examinerAppointmentDetail.ExaminerTypeID;
                                $scope.tempDetails.InstanceID = AppSettings.ExamInstID; // Current ExamInstID
                                $scope.tempDetails.ExamID = $scope.examinerAppointmentDetail.ExamID;
                                $scope.tempDetails.ExaminerID = $scope.examinerList[i].ExaminerID;
                                $scope.tempDetails.ExmSubID = $scope.examinerAppointmentDetail.ExmSubID;
                                $scope.tempDetails.EvalTypeID = $scope.examinerAppointmentDetail.EvalTypeID;
                                $scope.tempDetails.CollegeID = $scope.examinerAppointmentDetail.CollegeID;
                                $scope.tempDetails.CampusID = $scope.examinerAppointmentDetail.CampusID;
                                $scope.tempDetails.DistrictID = $scope.examinerAppointmentDetail.DistrictID;
                                $scope.tempDetails.FromDate = new Date($scope.examinerAppointmentDetail.FromDate.toString("YYYY-MM-DD"));
                                $scope.tempDetails.ToDate = new Date($scope.examinerAppointmentDetail.ToDate.toString("YYYY-MM-DD"));
                                $scope.tempDetails.EvalTypeID = $scope.examinerAppointmentDetail.EvalTypID;
                                $scope.tempDetails.CreLoginID = AppSettings.LoggedUserId; // Current CreLoginID
                                $scope.tempDetails.UpdLoginID = AppSettings.LoggedUserId; // Current UpdLoginID

                                if ($scope.examinerAppointmentDetail.CourseID == 1) {
                                    $scope.examinerAppointmentDetail.ZoneType = 1;
                                    $scope.tempDetails.ZoneType = 1;
                                } else if ($scope.examinerAppointmentDetail.CourseID == 2) {
                                    $scope.examinerAppointmentDetail.ZoneType = 5;
                                    $scope.tempDetails.ZoneType = 5;
                                }

                                angular.copy($scope.tempDetails, temp);
                                $scope.preExaminerAppointmentsList.push(temp);
                                $scope.tempDetails = {};
                            }
                            if ($scope.examinerList[i].IsExaminerChecked && $scope.examinerList[i].AppointmentID === 0)
                            {
                                $scope.deleteExaminerAppointmentsList.push($scope.examinerList[i].full_name);                                
                            }
                        }
                        if ($scope.deleteExaminerAppointmentsList.length > 0) {
                            alert($scope.deleteExaminerAppointmentsList.join(',') + " This examinar's should not be deleted");
                        }
                        if ($scope.preExaminerAppointmentsList.length > 0) {                           
                            preExaminerAppointmentsService.deletePreExaminerAppointmentList($scope.preExaminerAppointmentsList).then(function (results) {
                               // alert(results[0].message);
                                $scope.preExaminerAppointmentsList = [];
                                $scope.examinerAppointmentDetail = {};
                                $scope.examinerList = [];
                            });
                        }
                    }
                };
                $scope.saveExaminerAppointment = function () {
                    if ($scope.examinerAppointmentForm.$valid && $scope.appointmentDetailsForm.$valid && $scope.examinerList.length > 0) {
                        $scope.preExaminerAppointmentsList = [];
                        for (var i = 0; i < $scope.examinerList.length; i++) {
                            if ($scope.examinerList[i].IsExaminerChecked) {
                                var temp = {};
                                $scope.tempDetails = {};
                                $scope.tempDetails.AppointmentID = $scope.examinerList[i].AppointmentID;
                                $scope.tempDetails.ExaminerTypeID = $scope.examinerAppointmentDetail.ExaminerTypeID;
                                $scope.tempDetails.InstanceID = AppSettings.ExamInstID; // Current ExamInstID
                                $scope.tempDetails.ExamID = $scope.examinerAppointmentDetail.ExamID;
                                $scope.tempDetails.ExaminerID = $scope.examinerList[i].ExaminerID;
                                $scope.tempDetails.ExmSubID = $scope.examinerAppointmentDetail.ExmSubID;
                                $scope.tempDetails.EvalTypeID = $scope.examinerAppointmentDetail.EvalTypeID;
                                $scope.tempDetails.CollegeID = $scope.examinerAppointmentDetail.CollegeID;
                                $scope.tempDetails.CampusID = $scope.examinerAppointmentDetail.CampusID;
                                $scope.tempDetails.DistrictID = $scope.examinerAppointmentDetail.DistrictID;
                                $scope.tempDetails.FromDate =new Date($scope.examinerAppointmentDetail.FromDate.toString("YYYY-MM-DD"));
                                $scope.tempDetails.ToDate = new Date($scope.examinerAppointmentDetail.ToDate.toString("YYYY-MM-DD"));
                                $scope.tempDetails.EvalTypeID = $scope.examinerAppointmentDetail.EvalTypID;
                                $scope.tempDetails.CreLoginID = AppSettings.LoggedUserId; // Current CreLoginID
                                $scope.tempDetails.UpdLoginID = AppSettings.LoggedUserId; // Current UpdLoginID

                                if ($scope.examinerAppointmentDetail.CourseID == 1) {
                                    $scope.examinerAppointmentDetail.ZoneType = 1;
                                    $scope.tempDetails.ZoneType = 1;
                                } else if ($scope.examinerAppointmentDetail.CourseID == 2) {
                                    $scope.examinerAppointmentDetail.ZoneType = 5;
                                    $scope.tempDetails.ZoneType = 5;
                                }
                                angular.copy($scope.tempDetails, temp);
                                $scope.preExaminerAppointmentsList.push(temp);
                                $scope.tempDetails = {};
                            }
                        }
                        if ($scope.preExaminerAppointmentsList.length > 0) {
                            preExaminerAppointmentsService.postPreExaminerAppointmentList($scope.preExaminerAppointmentsList).then(function (results) {
                               // alert(results[0].message);
                                //results.IsSuccess == undefined &&
                                if ( results != "") {
                                    alert(results.Message);
                                }
                                $scope.preExaminerAppointmentsList = [];
                                $scope.examinerAppointmentDetail = {};
                                $scope.examinerList = [];
                            });
                        }
                    }
                };
            });
}());