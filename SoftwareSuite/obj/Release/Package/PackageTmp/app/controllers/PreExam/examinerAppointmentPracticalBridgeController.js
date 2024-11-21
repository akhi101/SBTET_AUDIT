(function () {
    'use strict';
    angular.module('app')
        .controller('examinerAppointmentPracticallBridgeController', 
        function ($rootScope, $scope, preExaminerAppointmentsService, basicCourseService, basicExamService, absentDetailService, basicZoneService, basicBranchService, BasicMainGroupService, AppSettings) {

                $scope.examinerAppointmentDetail = {};
                $scope.preExaminerAppointmentsList = [];
                $scope.examinerList = [];
            $scope.deleteExaminerAppointmentsList = [];



                $scope.init = function () {
                    getAllBasicCourse();
                    getBasicExaminerTypes();
                    $scope.examinerAppointmentDetail.ExaminerTypeID = 1;
                    getBasicDistrictList();
                    getBasicDistrictListForCenter();
                    $scope.examinerAppointmentDetail.MainGrpID = 0;

                    $scope.ZoneTypeList = [
                        { ZoneTypeName: 'General Practical', ZoneType: 2 },
                        { ZoneTypeName: 'Vocational Practical', ZoneType: 3 },
                        { ZoneTypeName: 'Bridge Vocational Practical', ZoneType: 4 }
                    ];

                    $scope.examinerAppointmentDetail.CourseID = 2;
                    $scope.examinerAppointmentDetail.ExamID = 4;
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
                    preExaminerAppointmentsService.getBasicDistrictListByUserId(AppSettings.LoggedUserId).then(function (results) {
                        $scope.basicDistrictList = results;
                    });
                };

                var getBasicDistrictListForCenter = function () {
                    //preExaminerAppointmentsService.getBasicDistrictListByUserId(AppSettings.LoggedUserId).then(function (results) {
                    preExaminerAppointmentsService.GetBasicDistrictListForCenterFill(AppSettings.LoggedUserId, 2).then(function (results) {
                        $scope.basicDistrictListForCenters = results;
                    });
                };




                //$scope.$watch('examinerAppointmentDetail.CourseID', function () {
                //    if ($scope.examinerAppointmentDetail.CourseID !== undefined) { 
                //        if ($scope.examinerAppointmentDetail.CourseID == 1) {
                //            $scope.examinerAppointmentDetail.ZoneType = 2;                            
                //        } else if ($scope.examinerAppointmentDetail.CourseID == 2) {
                //            $scope.examinerAppointmentDetail.ZoneType = 3;                          
                //        }

                //        basicExamService.getBasicExamListByCourseID($scope.examinerAppointmentDetail.CourseID).then(function (results) {
                //            $scope.basicExams = results;
                //        });
                //    }
                //});

                //$scope.$watch('examinerAppointmentDetail.ExamID', function () {
                //    if ($scope.examinerAppointmentDetail.ExamID !== undefined) {
                //        BasicMainGroupService.GetMainGroupListByCourseID($scope.examinerAppointmentDetail.CourseID).then(function (results) {
                //            $scope.basicMainGroupList = results;
                //        });
                //    }
                //});     

                $scope.$watch('examinerAppointmentDetail.DistrictID', function () {
                    if ($scope.examinerAppointmentDetail.DistrictID !== undefined) {
                        preExaminerAppointmentsService.getBasicCollegeListByDistrictID($scope.examinerAppointmentDetail.DistrictID).then(function (results) {
                            $scope.basicCollegeList = results;
                        });
                        //preExaminerAppointmentsService.getbasicCampusListByDistrictID(AppSettings.ExamInstID, 'P', $scope.examinerAppointmentDetail.DistrictID).then(function (results) {
                        //    $scope.basicCampusList = results;
                        //});
                        //preExaminerAppointmentsService.GetPracticalCenterListByDistrictIDANDZoneType(AppSettings.ExamInstID, 'P', $scope.examinerAppointmentDetail.DistrictID).then(function (results) {
                        //    $scope.basicCampusList = results;
                        //});
                    }
                });

                $scope.$watch('examinerAppointmentDetail.DistrictIDNew', function () {
                    if ($scope.examinerAppointmentDetail.DistrictIDNew !== undefined) {
                        preExaminerAppointmentsService.GetPracticalCenterListByDistrictIDANDZoneType(AppSettings.ExamInstID, 4, $scope.examinerAppointmentDetail.DistrictIDNew).then(function (results) {
                            $scope.basicCampusList = results;
                        });
                    }
                });

            $scope.$watch('examinerAppointmentDetail.PrePractCntrID', function () {
                if ($scope.examinerAppointmentDetail.PrePractCntrID !== undefined) {
                    preExaminerAppointmentsService.GetCenterCollegeID(4, $scope.examinerAppointmentDetail.PrePractCntrID, AppSettings.ExamInstID).then(function (results) {
                        $scope.CenterCollegeIDList = results;
                        if ($scope.CenterCollegeIDList.length > 0) {
                            $scope.examinerAppointmentDetail.CenterCollegeID = $scope.CenterCollegeIDList[0].CenterCollegeID;
                        } else
                        {
                            $scope.examinerAppointmentDetail.CenterCollegeID = 0;
                        }
                        

                    });
                    }
                });

                //$scope.$watch('examinerAppointmentDetail.ZoneType', function () {
                //    if ($scope.examinerAppointmentDetail.ZoneType !== undefined) {
                //        preExaminerAppointmentsService.GetPracticalCenterListByDistrictIDANDZoneType(AppSettings.ExamInstID, 4, $scope.examinerAppointmentDetail.DistrictIDNew).then(function (results) {
                //            $scope.basicCampusList = results;
                //        });
                //    }
                //});


                // $scope.$watch('examinerAppointmentDetail.MainGrpID', function () {
                //     if ($scope.examinerAppointmentDetail.MainGrpID !== undefined) {
                //        //$scope.examinerAppointmentDetail.EvalTypID = 2; // Practical
                //         preExaminerAppointmentsService.GetPracticalExamSubjectForPracticalAppointmentList($scope.examinerAppointmentDetail.MainGrpID, $scope.examinerAppointmentDetail.ExamID).then(function (results) {
                //            $scope.subjectList = results;
                //        });
                //    }
                //});

            $scope.$watch('examinerAppointmentDetail.CollegeID', function () {
                      
                $scope.examinerAppointmentDetail.EvalTypeID = 2; // Practical
                        // preExaminerAppointmentsService.GetPracticalExamSubjectForPracticalAppointmentList($scope.examinerAppointmentDetail.MainGrpID, $scope.examinerAppointmentDetail.ExamID).then(function (results) {
                        //    $scope.subjectList = results;
                        //});
                preExaminerAppointmentsService.GetPracticalExamSubjectForPracticalBridgeAppointmentList($scope.examinerAppointmentDetail.ExamID, $scope.examinerAppointmentDetail.EvalTypeID).then(function (results) {
                            $scope.subjectList = results;
                        });
                     
                });



                // Commented For Subject Bind From CollegeID EvalTypeID ExamID
                ////$scope.$watch('examinerAppointmentDetail.CollegeID', function () {
                ////    if ($scope.examinerAppointmentDetail.CollegeID !== undefined) {
                ////        $scope.examinerAppointmentDetail.EvalTypID = 2; // Practical
                ////        preExaminerAppointmentsService.getSubjectListByCollegeID($scope.examinerAppointmentDetail.CollegeID, $scope.examinerAppointmentDetail.EvalTypID, $scope.examinerAppointmentDetail.ExamID).then(function (results) {
                ////            $scope.subjectList = results;
                ////        });
                ////    }
                ////});

                //$scope.$watch('examinerAppointmentDetail.exmSubID', function () {
                //    if ($scope.examinerAppointmentDetail.exmSubID !== undefined && $scope.examinerAppointmentDetail.collegeID !== undefined) {
                //        preExaminerAppointmentsService.getExaminerListByCollegeID($scope.examinerAppointmentDetail.collegeID, $scope.examinerAppointmentDetail.exmSubID).then(function (results) {
                //            $scope.examinerList = results;
                //        });
                //    }
                //});

                $scope.showExaminerAppointmentDetails = function () {
                    if ($scope.examinerAppointmentForm.$valid &&  $scope.examinerAppointmentDetail.ExmSubID !== undefined && $scope.examinerAppointmentDetail.CollegeID !== undefined) {
                        preExaminerAppointmentsService.getExaminerBridgeListByCollegeID($scope.examinerAppointmentDetail.CollegeID, $scope.examinerAppointmentDetail.ExmSubID, $scope.examinerAppointmentDetail.ExaminerTypeID, $scope.examinerAppointmentDetail.ExamID, $scope.examinerAppointmentDetail.MainGrpID).then(function (results) {
                            $scope.examinerList = results;
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
                                $scope.tempDetails.ExaminerTypeID = $scope.examinerAppointmentDetail.ExaminerTypeID;
                                $scope.tempDetails.InstanceID = AppSettings.ExamInstID; // Current ExamInstID
                                $scope.tempDetails.ExamID = $scope.examinerAppointmentDetail.ExamID;
                                $scope.tempDetails.ExaminerID = $scope.examinerList[i].ExaminerID;
                                $scope.tempDetails.ExmSubID = $scope.examinerAppointmentDetail.ExmSubID;
                                //$scope.tempDetails.EvalTypeID = $scope.examinerAppointmentDetail.EvalTypeID;
                                $scope.tempDetails.CollegeID = $scope.examinerAppointmentDetail.CollegeID;
                                $scope.tempDetails.CampusID = 0;//$scope.examinerAppointmentDetail.CampusID;
                                $scope.tempDetails.DistrictID = $scope.examinerAppointmentDetail.DistrictID;
                                $scope.tempDetails.FromDate = new Date($scope.examinerAppointmentDetail.FromDate.toString("YYYY-MM-DD"));
                                $scope.tempDetails.ToDate = new Date($scope.examinerAppointmentDetail.ToDate.toString("YYYY-MM-DD"));
                                $scope.tempDetails.EvalTypeID = 2;// $scope.examinerAppointmentDetail.EvalTypID;
                                $scope.tempDetails.CreLoginID = AppSettings.LoggedUserId; // Current CreLoginID
                                $scope.tempDetails.UpdLoginID = AppSettings.LoggedUserId; // Current UpdLoginID

                                $scope.tempDetails.CourseID = $scope.examinerAppointmentDetail.CourseID;
                                $scope.tempDetails.PrePractCntrID = $scope.examinerAppointmentDetail.PrePractCntrID;
                                $scope.tempDetails.MainGrpID = $scope.examinerAppointmentDetail.MainGrpID;

                                if ($scope.examinerAppointmentDetail.CenterCollegeID == $scope.examinerAppointmentDetail.CollegeID )
                                {
                                    alert("Examiner college must be diffrent")
                                    return;
                                }

                                if ($scope.examinerAppointmentDetail.CourseID == 1)
                                {
                                    $scope.examinerAppointmentDetail.ZoneType = 2;
                                    $scope.tempDetails.ZoneType = 2;
                                } else if($scope.examinerAppointmentDetail.CourseID == 2)
                                {
                                    $scope.examinerAppointmentDetail.ZoneType = 3;
                                    $scope.tempDetails.ZoneType = 3;
                                }

                                $scope.tempDetails.CourseID = 2;
                                $scope.tempDetails.ExamID = 4;
                                $scope.tempDetails.ZoneType = 4;

                                angular.copy($scope.tempDetails, temp);
                                $scope.preExaminerAppointmentsList.push(temp);
                                $scope.tempDetails = {};
                            }
                            if ($scope.examinerList[i].IsExaminerChecked && $scope.examinerList[i].AppointmentID === 0) {
                                $scope.deleteExaminerAppointmentsList.push($scope.examinerList[i].full_name);
                            }
                        }
                        if ($scope.deleteExaminerAppointmentsList.length > 0) {
                            alert($scope.deleteExaminerAppointmentsList.join(',') + " This examinar's should not be deleted");
                        }
                        if ($scope.preExaminerAppointmentsList.length > 0) {
                            preExaminerAppointmentsService.deletePreExaminerAppointmentList($scope.preExaminerAppointmentsList).then(function (results) {
                                //alert(results[0].message);
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
                        var selectCount = 0;
                        for (var i = 0; i < $scope.examinerList.length; i++) {
                            if ($scope.examinerList[i].IsExaminerChecked) {
                                selectCount = parseInt(selectCount) + 1;
                                if (selectCount > 1) {
                                    alert("Only one examiner need to be select");
                                    return;
                                }
                            }
                        }

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
                                //$scope.tempDetails.EvalTypeID = $scope.examinerAppointmentDetail.EvalTypeID;
                                $scope.tempDetails.CollegeID = $scope.examinerAppointmentDetail.CollegeID;
                                $scope.tempDetails.CampusID = 0;// $scope.examinerAppointmentDetail.CampusID;
                                $scope.tempDetails.DistrictID = $scope.examinerAppointmentDetail.DistrictID;
                                $scope.tempDetails.FromDate =new Date($scope.examinerAppointmentDetail.FromDate.toString("YYYY-MM-DD"));
                                $scope.tempDetails.ToDate = new Date($scope.examinerAppointmentDetail.ToDate.toString("YYYY-MM-DD"));
                                $scope.tempDetails.EvalTypeID = 2;// $scope.examinerAppointmentDetail.EvalTypID;
                                $scope.tempDetails.CreLoginID = AppSettings.LoggedUserId; // Current CreLoginID
                                $scope.tempDetails.UpdLoginID = AppSettings.LoggedUserId; // Current UpdLoginID

                                $scope.tempDetails.MainGrpID = $scope.examinerAppointmentDetail.MainGrpID;

                                $scope.tempDetails.CourseID = $scope.examinerAppointmentDetail.CourseID;
                                $scope.tempDetails.PrePractCntrID = $scope.examinerAppointmentDetail.PrePractCntrID;

                                if ($scope.examinerAppointmentDetail.CenterCollegeID == $scope.examinerAppointmentDetail.CollegeID) {
                                    alert("Examiner college must be diffrent")
                                    return;
                                }

                                //if ($scope.examinerAppointmentDetail.CourseID == 1) {
                                //    $scope.examinerAppointmentDetail.ZoneType = 2;
                                //    $scope.tempDetails.ZoneType = 2;
                                //} else if ($scope.examinerAppointmentDetail.CourseID == 2) {
                                //    $scope.examinerAppointmentDetail.ZoneType = 3;
                                //    $scope.tempDetails.ZoneType = 3;
                                //}
                                $scope.tempDetails.CourseID = 2;
                                $scope.tempDetails.ExamID = 4;
                                $scope.tempDetails.ZoneType = 4;

                                angular.copy($scope.tempDetails, temp);
                                $scope.preExaminerAppointmentsList.push(temp);
                                $scope.tempDetails = {};
                            }
                        }
                        if ($scope.preExaminerAppointmentsList.length > 0) {
                            preExaminerAppointmentsService.postPreExaminerAppointmentList($scope.preExaminerAppointmentsList).then(function (results) {
                                //alert(results[0].message);
                                //results.isSuccess == undefined &&
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