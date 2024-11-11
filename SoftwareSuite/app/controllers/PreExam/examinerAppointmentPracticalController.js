(function () {
    'use strict';
    angular.module('app')
        .controller('examinerAppointmentPracticalController', 
        function ($rootScope, $scope, preExaminerAppointmentsService, basicCourseService, basicExamService, absentDetailService, basicZoneService, basicBranchService, BasicMainGroupService, AppSettings) {

                $scope.examinerAppointmentDetail = {};
                $scope.preExaminerAppointmentsList = [];
                $scope.examinerList = [];
                $scope.deleteExaminerAppointmentsList = [];
                $scope.examinerAppointmentDetail.MainGrpID = 0; 

                $scope.init = function () {
                    getAllBasicCourse();
                    getBasicExaminerTypes();
                    getBasicDistrictList();
                    getBasicDistrictListForCenter();                   
                };
                $scope.ZoneTypeList = [
                    { ZoneTypeName: 'General Practical', ZoneType: 2 }
                //{ ZoneTypeName: 'General Practical', ZoneType: 2 },
                //{ ZoneTypeName: 'Vocational Practical', ZoneType: 3 }
            ];

            $scope.MediumList = [
                { MediumTypeName: 'Other Than Urdu', MediumType: 1 },
                { MediumTypeName: 'Urdu', MediumType: 2 }
            ];
            $scope.examinerAppointmentDetail.MediumType = 1;

                var getAllBasicCourse = function () {
                    basicCourseService.getAllBasicCourseByCourseID(1).then(function (results) {
                        $scope.basicCourses = results;
                    });
                };

                var getBasicExaminerTypes = function () {
                    preExaminerAppointmentsService.getBasicExaminerTypes().then(function (results) {
                        $scope.basicExaminerTypes = results;
                        $scope.examinerAppointmentDetail.ExaminerTypeID = $scope.basicExaminerTypes[0].ExaminerTypeID ;
                    });
                };

            var getBasicDistrictList = function () {                 
                if ($scope.examinerAppointmentDetail.MediumType == 1) {
                    preExaminerAppointmentsService.getBasicDistrictListByUserId(AppSettings.LoggedUserId).then(function (results) {
                        $scope.basicDistrictList = results;
                        if ($scope.basicDistrictList.length > 0) {
                            $scope.examinerAppointmentDetail.DistrictID = $scope.basicDistrictList[0].DistrictID;                          
                        }
                    });
                } else if ($scope.examinerAppointmentDetail.MediumType == 2)
                {
                    preExaminerAppointmentsService.getBasicDistrictList().then(function (results) {
                        $scope.basicDistrictList = results;
                        if ($scope.basicDistrictList.length > 0) {
                            $scope.examinerAppointmentDetail.DistrictID = $scope.basicDistrictList[0].DistrictID;                         
                        }
                    });
                }
                    
                };

                //var getBasicDistrictListForCenter = function () {
                //    //preExaminerAppointmentsService.getBasicDistrictListByUserId(AppSettings.LoggedUserId).then(function (results) {
                //    preExaminerAppointmentsService.GetBasicDistrictListForCenterFill().then(function (results) {
                //        $scope.basicDistrictListForCenters = results;
                //    });
                //};




                $scope.$watch('examinerAppointmentDetail.CourseID', function () {
                    if ($scope.examinerAppointmentDetail.CourseID !== undefined) { 
                        if ($scope.examinerAppointmentDetail.CourseID == 1) {
                            $scope.examinerAppointmentDetail.ZoneType = 2;                            
                        } else if ($scope.examinerAppointmentDetail.CourseID == 2) {
                            $scope.examinerAppointmentDetail.ZoneType = 3;                          
                        }
                                basicExamService.getBasicExamListByCourseID($scope.examinerAppointmentDetail.CourseID).then(function (results) {
                                    $scope.basicExams = results;
                                    if ($scope.examinerAppointmentDetail.CourseID == 1) {
                                        $scope.examinerAppointmentDetail.ExamID = $scope.basicExams[1].ExamID;
                                    } else
                                    {
                                        $scope.examinerAppointmentDetail.ExamID = $scope.basicExams[0].ExamID;
                                    }
                                    

                                BasicMainGroupService.GetMainGroupListByCourseID($scope.examinerAppointmentDetail.CourseID).then(function (resultsgrp) {
                                    $scope.basicMainGroupList = resultsgrp;
                                    if ($scope.basicMainGroupList.length > 0) {
                                        if ($scope.examinerAppointmentDetail.CourseID == 1) {
                                            $scope.examinerAppointmentDetail.MainGrpID = $scope.basicMainGroupList[2].MainGrpID;
                                            preExaminerAppointmentsService.GetPracticalExamSubjectForPracticalAppointmentList($scope.examinerAppointmentDetail.MainGrpID, $scope.examinerAppointmentDetail.ExamID).then(function (results) {
                                                $scope.subjectList = results;
                                            });
                                        } else {}
                                    }
                                });
                              preExaminerAppointmentsService.GetBasicDistrictListForCenterFill(AppSettings.LoggedUserId, $scope.examinerAppointmentDetail.CourseID).then(function (resultsCenter) {
                                  $scope.basicDistrictListForCenters = resultsCenter;
                                  //$scope.examinerAppointmentDetail.DistrictIDNew = "" + $scope.basicDistrictListForCenters[0].DistrictIDNew + "";
                                  $scope.examinerAppointmentDetail.DistrictIDNew = $scope.basicDistrictListForCenters[0].DistrictIDNew;
                                  $scope.basicCampusList = [];
                                  preExaminerAppointmentsService.GetPracticalCenterListByDistrictIDANDZoneType(AppSettings.ExamInstID, $scope.examinerAppointmentDetail.ZoneType, $scope.examinerAppointmentDetail.DistrictIDNew).then(function (resultsdistnew) {
                                      $scope.basicCampusList = resultsdistnew;
                                  });


                                    });        
                                    getBasicDistrictList();
                             

                        });
                    }
                });

                $scope.$watch('examinerAppointmentDetail.ExamID', function () {
                    if ($scope.examinerAppointmentDetail.ExamID !== undefined) {
                        BasicMainGroupService.GetMainGroupListByCourseID($scope.examinerAppointmentDetail.CourseID).then(function (results) {
                            $scope.basicMainGroupList = results;
                        });
                    }
                });     

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
                    if ($scope.examinerAppointmentDetail.ZoneType !== undefined && $scope.examinerAppointmentDetail.DistrictIDNew !== undefined) {
                         $scope.basicCampusList = [];
                        //preExaminerAppointmentsService.GetPracticalCenterListByDistrictIDANDZoneType(AppSettings.ExamInstID, $scope.examinerAppointmentDetail.ZoneType, $scope.examinerAppointmentDetail.DistrictIDNew).then(function (results) {
                        //    $scope.basicCampusList = results;
                        //});

                        $scope.basicCampusList = [];
                        if ($scope.examinerAppointmentDetail.MediumType == 2) {
                            preExaminerAppointmentsService.GetPracticalCenterListByDistrictIDANDZoneTypeUrdu(AppSettings.ExamInstID, $scope.examinerAppointmentDetail.ZoneType, $scope.examinerAppointmentDetail.DistrictIDNew).then(function (results) {
                                $scope.basicCampusList = results;
                            });
                        } else {
                            $scope.basicCampusList = [];
                            preExaminerAppointmentsService.GetPracticalCenterListByDistrictIDANDZoneType(AppSettings.ExamInstID, $scope.examinerAppointmentDetail.ZoneType, $scope.examinerAppointmentDetail.DistrictIDNew).then(function (results) {
                                $scope.basicCampusList = results;
                            });
                        }

                    }
                });

                $scope.$watch('examinerAppointmentDetail.ZoneType', function () {
                    if ($scope.examinerAppointmentDetail.ZoneType !== undefined && $scope.examinerAppointmentDetail.DistrictIDNew !== undefined ) {
                        //preExaminerAppointmentsService.GetPracticalCenterListByDistrictIDANDZoneType(AppSettings.ExamInstID, $scope.examinerAppointmentDetail.ZoneType, $scope.examinerAppointmentDetail.DistrictIDNew).then(function (results) {
                        //$scope.basicCampusList = results;
                            if ($scope.examinerAppointmentDetail.ZoneType == '2') {
                                $scope.examinerAppointmentDetail.CourseID = 1;
                                $scope.examinerAppointmentDetail.ExamID = 2;
                                $scope.basicCampusList = [];
                                if ($scope.examinerAppointmentDetail.MediumType == 2) {
                                    preExaminerAppointmentsService.GetPracticalCenterListByDistrictIDANDZoneTypeUrdu(AppSettings.ExamInstID, $scope.examinerAppointmentDetail.ZoneType, $scope.examinerAppointmentDetail.DistrictIDNew).then(function (results) {
                                        $scope.basicCampusList = results;
                                    });
                                } else
                                {
                                    $scope.basicCampusList = [];
                                    preExaminerAppointmentsService.GetPracticalCenterListByDistrictIDANDZoneType(AppSettings.ExamInstID, $scope.examinerAppointmentDetail.ZoneType, $scope.examinerAppointmentDetail.DistrictIDNew).then(function (results) {
                                        $scope.basicCampusList = results;
                                    });
                                }
                            } else
                            {
                                $scope.examinerAppointmentDetail.CourseID = 2;
                                $scope.examinerAppointmentDetail.ExamID = 3;
                                $scope.examinerAppointmentDetail.MediumType = 1;
                            }
                        //});
                    }
            });


            $scope.$watch('examinerAppointmentDetail.MediumType', function () {
                 

                if ($scope.examinerAppointmentDetail.ZoneType !== undefined && $scope.examinerAppointmentDetail.DistrictIDNew !== undefined) {
                   if ($scope.examinerAppointmentDetail.ZoneType == '2') {
                        $scope.examinerAppointmentDetail.CourseID = 1;
                       $scope.examinerAppointmentDetail.ExamID = 2;

                       $scope.basicCampusList = [];
                       if ($scope.examinerAppointmentDetail.MediumType == 2) {
                           preExaminerAppointmentsService.GetPracticalCenterListByDistrictIDANDZoneTypeUrdu(AppSettings.ExamInstID, $scope.examinerAppointmentDetail.ZoneType, $scope.examinerAppointmentDetail.DistrictIDNew).then(function (results) {
                               $scope.basicCampusList = results;
                           });
                       } else {
                           $scope.basicCampusList = [];
                           preExaminerAppointmentsService.GetPracticalCenterListByDistrictIDANDZoneType(AppSettings.ExamInstID, $scope.examinerAppointmentDetail.ZoneType, $scope.examinerAppointmentDetail.DistrictIDNew).then(function (results) {
                               $scope.basicCampusList = results;
                           });
                       }

                      
                   } else {
                       $scope.basicCampusList = [];
                       preExaminerAppointmentsService.GetPracticalCenterListByDistrictIDANDZoneType(AppSettings.ExamInstID, $scope.examinerAppointmentDetail.ZoneType, $scope.examinerAppointmentDetail.DistrictIDNew).then(function (results) {
                           $scope.basicCampusList = results;
                       });
                        $scope.examinerAppointmentDetail.CourseID = 2;
                        $scope.examinerAppointmentDetail.ExamID = 3;
                        $scope.examinerAppointmentDetail.MediumType = 1;
                    }                  
                
                }

                getBasicDistrictList();

            });



                 $scope.$watch('examinerAppointmentDetail.MainGrpID', function () {
                     if ($scope.examinerAppointmentDetail.MainGrpID !== undefined) {
                        //$scope.examinerAppointmentDetail.EvalTypID = 2; // Practical
                         preExaminerAppointmentsService.GetPracticalExamSubjectForPracticalAppointmentList($scope.examinerAppointmentDetail.MainGrpID, $scope.examinerAppointmentDetail.ExamID).then(function (results) {
                             $scope.subjectList = results;
                         });
                    }
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

            $scope.$watch('examinerAppointmentDetail.PrePractCntrID', function () {
                if ($scope.examinerAppointmentDetail.PrePractCntrID !== undefined) {                      
                    preExaminerAppointmentsService.GetCenterCollegeID($scope.examinerAppointmentDetail.ZoneType, $scope.examinerAppointmentDetail.PrePractCntrID, AppSettings.ExamInstID).then(function (results) {
                        $scope.CenterCollegeIDList = results;
                        if ($scope.CenterCollegeIDList.length > 0) {
                            $scope.examinerAppointmentDetail.CenterCollegeID = $scope.CenterCollegeIDList[0].CenterCollegeID;
                        } else {
                            $scope.examinerAppointmentDetail.CenterCollegeID = 0;
                        }
                    });
                }
            });


                $scope.showExaminerAppointmentDetails = function () {
                    if ($scope.examinerAppointmentForm.$valid &&  $scope.examinerAppointmentDetail.ExmSubID !== undefined && $scope.examinerAppointmentDetail.CollegeID !== undefined) {
                        $scope.examinerList = [];
                        if ($scope.examinerAppointmentDetail.MediumType == 2) {
                            preExaminerAppointmentsService.getExaminerListByCollegeIDUrdu($scope.examinerAppointmentDetail.CollegeID, $scope.examinerAppointmentDetail.ExmSubID, $scope.examinerAppointmentDetail.ExaminerTypeID, $scope.examinerAppointmentDetail.ExamID, $scope.examinerAppointmentDetail.MainGrpID).then(function (results) {
                                $scope.examinerList = results;
                                if ($scope.examinerList.length == 0) {
                                    alert("Examiner not found for this subject");
                                }
                            });
                        } else
                        {
                            preExaminerAppointmentsService.getExaminerListByCollegeID($scope.examinerAppointmentDetail.CollegeID, $scope.examinerAppointmentDetail.ExmSubID, $scope.examinerAppointmentDetail.ExaminerTypeID, $scope.examinerAppointmentDetail.ExamID, $scope.examinerAppointmentDetail.MainGrpID).then(function (results) {
                                $scope.examinerList = results;
                                if ($scope.examinerList.length == 0) {
                                    alert("Examiner not found for this subject");
                                }
                            });
                        }
                        
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
                                if ($scope.examinerAppointmentDetail.CourseID == 1)
                                {
                                    $scope.examinerAppointmentDetail.ZoneType = 2;
                                    $scope.tempDetails.ZoneType = 2;
                                } else if($scope.examinerAppointmentDetail.CourseID == 2)
                                {
                                    $scope.examinerAppointmentDetail.ZoneType = 3;
                                    $scope.tempDetails.ZoneType = 3;
                                }

                                if ($scope.examinerAppointmentDetail.CenterCollegeID == $scope.examinerAppointmentDetail.CollegeID)
                                {
                                    alert("Examiner college must be different")
                                    return;
                                }

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
                            if ($scope.examinerList[i].IsExaminerChecked)
                            {
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
                                $scope.tempDetails.EvalTypeID = 2;//$scope.examinerAppointmentDetail.EvalTypID;
                                $scope.tempDetails.CreLoginID = AppSettings.LoggedUserId; // Current CreLoginID
                                $scope.tempDetails.UpdLoginID = AppSettings.LoggedUserId; // Current UpdLoginID

                                $scope.tempDetails.CourseID = $scope.examinerAppointmentDetail.CourseID;
                                $scope.tempDetails.PrePractCntrID = $scope.examinerAppointmentDetail.PrePractCntrID;

                                $scope.tempDetails.MainGrpID = $scope.examinerAppointmentDetail.MainGrpID;

                                if ($scope.examinerAppointmentDetail.CenterCollegeID == $scope.examinerAppointmentDetail.CollegeID) {
                                    alert("Examiner college must be diffrent")
                                    return;
                                }

                                if ($scope.examinerAppointmentDetail.CourseID == 1) {
                                    $scope.examinerAppointmentDetail.ZoneType = 2;
                                    $scope.tempDetails.ZoneType = 2;
                                } else if ($scope.examinerAppointmentDetail.CourseID == 2) {
                                    $scope.examinerAppointmentDetail.ZoneType = 3;
                                    $scope.tempDetails.ZoneType = 3;
                                }


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