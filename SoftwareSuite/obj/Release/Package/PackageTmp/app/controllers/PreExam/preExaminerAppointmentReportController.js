(function () {
    'use strict';
    angular.module('app')
        .controller('preExaminerAppointmentReportController',
        function ($rootScope, $scope, preExaminerAppointmentReportService,preExaminerAppointmentsService, basicCourseService, basicExamService, basicDistrictsService, basicCollegeService, basicZoneService, AppSettings) {


            $scope.preExaminerAppointments = {};

            $("#LoadImg").attr("src", AppSettings.LoadingImage);
            $scope.LoadImg = false;            
            
            $scope.reportTypes = [
                { ReportTypeName: 'Theory', SubType: 'T' },
                { ReportTypeName: 'Practical', SubType: 'P' }
            ];

            $scope.ZoneTypes = [
                { ZoneTypeName: 'General Theory', ZoneType: '1' },
                { ZoneTypeName: 'General Practical', ZoneType: '2' },
                { ZoneTypeName: 'Vocational Practical', ZoneType: '3' },
                { ZoneTypeName: 'Bridge Vocational Practical', ZoneType: '4' }
                //,{ ZoneTypeName: 'Bridge Vocational Theory', ZoneType: '5' }
            ];
            $scope.preExaminerAppointments.EvalTypeID = 1;
            $scope.campshow = true;
            $scope.init = function () {
                getAllBasicCourse();
                getAllBasicDistrict();
            };

            var getAllBasicCourse = function () {
                basicCourseService.getAllBasicCourse().then(function (results) {
                    $scope.basicCourses = results;
                    getAllBasicDistrict();
                });
            };
            var getAllBasicDistrict = function () {
                //basicDistrictsService.getBasicDistrictsList().then(function (results) {
                preExaminerAppointmentsService.getBasicDistrictListByUserId(AppSettings.LoggedUserId).then(function (results) {
                    $scope.basicDistricts = results;
                    if ($scope.basicDistricts.length > 0)
                    {
                        $scope.preExaminerAppointments.DistrictID = $scope.basicDistricts[0].DistrictID;

                        //if ($scope.preExaminerAppointments.SubType == "T") { $scope.campshow = true; $scope.preExaminerAppointments.EvalTypeID = 1; }
                        //else { $scope.campshow = false; $scope.preExaminerAppointments.EvalTypeID = 2; }


                        if ($scope.preExaminerAppointments.ZoneType == 1 || $scope.preExaminerAppointments.ZoneType == 5) {
                            $scope.preExaminerAppointments.SubType = 'T';
                            $scope.campshow = true;
                            $scope.preExaminerAppointments.EvalTypeID = 1;
                        } else {
                            $scope.preExaminerAppointments.SubType = 'P';
                            $scope.campshow = false;
                            $scope.preExaminerAppointments.EvalTypeID = 2;
                        }

                        $scope.basicCampusList = [];
                        if ($scope.preExaminerAppointments.ZoneType != undefined)
                        {                           
                            //preExaminerAppointmentsService.getbasicCampusListByDistrictID(AppSettings.ExamInstID, $scope.preExaminerAppointments.SubType).then(function (results) {
                            if (AppSettings.CollegeID == 0) {

                                preExaminerAppointmentsService.GetPracticalCenterListByDistrictIDANDZoneType(AppSettings.ExamInstID, $scope.preExaminerAppointments.ZoneType, $scope.preExaminerAppointments.DistrictID).then(function (resultsCenter) {
                                    $scope.basicCampusList = resultsCenter;
                                });
                            }
                            else {
                                preExaminerAppointmentsService.GetPracticalCenterListByDistrictIDANDZoneTypeByCollegeID(AppSettings.ExamInstID, $scope.preExaminerAppointments.ZoneType, $scope.preExaminerAppointments.DistrictID, AppSettings.CollegeID).then(function (resultsCenter) {
                                    $scope.basicCampusList = resultsCenter;
                                });
                            }
                        }
                       
                       
                        if (AppSettings.CollegeID == 0) {
                            basicCollegeService.getCollegeListByDistrict($scope.preExaminerAppointments.DistrictID).then(function (resultsCol) {
                                $scope.basicColleges = resultsCol;
                            });
                        } else {
                            basicCollegeService.GetCollegeListByDistrictUpdLoginID($scope.preExaminerAppointments.DistrictID, AppSettings.LoggedUserId).then(function (resultsCol) {
                                $scope.basicColleges = resultsCol;
                                if ($scope.basicColleges.length > 0)
                                {
                                    $scope.preExaminerAppointments.CollegeID = $scope.basicColleges[0].CollegeID;
                                }
                            });
                        }
                        


                    }

                });
            };

            $scope.$watch('preExaminerAppointments.CourseID', function () {
                if ($scope.preExaminerAppointments.CourseID !== undefined) {
                    basicExamService.getBasicExamListByCourseID($scope.preExaminerAppointments.CourseID).then(function (results) {
                        $scope.basicExams = results;
                        if ($scope.preExaminerAppointments.CourseID == 1) {
                            $scope.preExaminerAppointments.ExamID = 2;
                        }
                        if ($scope.preExaminerAppointments.CourseID == 2) {
                            $scope.preExaminerAppointments.ExamID = 3;
                        } 
                        getAllBasicDistrict();
                    });
                }
            });

            $scope.$watch('preExaminerAppointments.DistrictID', function () {
                if ($scope.preExaminerAppointments.DistrictID !== undefined) {
                    ////basicCollegeService.getTheroyExamCenterCollegeList($scope.preExaminerAppointments.DistrictID, AppSettings.ExamInstID).then(function (results) {
                    ////    $scope.basicCenters = results;
                    ////});
                    //if ($scope.preExaminerAppointments.SubType == "T")
                    //{ $scope.campshow = true; $scope.preExaminerAppointments.EvalTypeID = 1; }
                    //else { $scope.campshow = false; $scope.preExaminerAppointments.EvalTypeID = 2; }

                    if ($scope.preExaminerAppointments.ZoneType == 1 || $scope.preExaminerAppointments.ZoneType == 5) {
                        $scope.preExaminerAppointments.SubType = 'T';
                        $scope.campshow = true;
                        $scope.preExaminerAppointments.EvalTypeID = 1;
                    } else {
                        $scope.preExaminerAppointments.SubType = 'P';
                        $scope.campshow = false;
                        $scope.preExaminerAppointments.EvalTypeID = 2;
                    }
                    $scope.basicCampusList = [];
                    if ($scope.preExaminerAppointments.ZoneType != undefined) {                        
                        //preExaminerAppointmentsService.getbasicCampusListByDistrictID(AppSettings.ExamInstID, $scope.preExaminerAppointments.SubType).then(function (results) {
                        if (AppSettings.CollegeID == 0) {
                            preExaminerAppointmentsService.GetPracticalCenterListByDistrictIDANDZoneType(AppSettings.ExamInstID, $scope.preExaminerAppointments.ZoneType, $scope.preExaminerAppointments.DistrictID).then(function (resultsCenter) {
                                $scope.basicCampusList = resultsCenter;
                            });
                        }
                        else {
                            preExaminerAppointmentsService.GetPracticalCenterListByDistrictIDANDZoneTypeByCollegeID(AppSettings.ExamInstID, $scope.preExaminerAppointments.ZoneType, $scope.preExaminerAppointments.DistrictID, AppSettings.CollegeID).then(function (resultsCenter) {
                                $scope.basicCampusList = resultsCenter;
                            });
                        }
                    }
                    //basicCollegeService.getCollegeListByDistrict($scope.preExaminerAppointments.DistrictID).then(function (resultscol) {
                    //    $scope.basicColleges = resultscol;                         
                    //});

                    if (AppSettings.CollegeID == 0) {
                        basicCollegeService.getCollegeListByDistrict($scope.preExaminerAppointments.DistrictID).then(function (resultsCol) {
                            $scope.basicColleges = resultsCol;
                        });
                    } else {
                        basicCollegeService.GetCollegeListByDistrictUpdLoginID($scope.preExaminerAppointments.DistrictID, AppSettings.LoggedUserId).then(function (resultsCol) {
                            $scope.basicColleges = resultsCol;
                            if ($scope.basicColleges.length > 0) {
                                $scope.preExaminerAppointments.CollegeID = $scope.basicColleges[0].CollegeID;
                            }
                        });
                    }




                }

            });

            //$scope.$watch('preExaminerAppointments.SubType', function () {
            //    if ($scope.preExaminerAppointments.SubType !== undefined) {
            //        //////basicCollegeService.getTheroyExamCenterCollegeList($scope.preExaminerAppointments.DistrictID, AppSettings.ExamInstID).then(function (results) {
            //        //////    $scope.basicCenters = results;
            //        //////});
            //        if ($scope.preExaminerAppointments.SubType == "T")
            //        { $scope.campshow = true; $scope.preExaminerAppointments.EvalTypeID = 1; }
            //        else { $scope.campshow = false; $scope.preExaminerAppointments.EvalTypeID = 2; }

            //        preExaminerAppointmentsService.getbasicCampusListByDistrictID(AppSettings.ExamInstID, $scope.preExaminerAppointments.SubType).then(function (results) {
            //            $scope.basicCampusList = results;
            //        });

            //        basicCollegeService.getCollegeListByDistrict($scope.preExaminerAppointments.DistrictID).then(function (results) {
            //            $scope.basicColleges = results;
            //        });


            //    }

            //});

            $scope.$watch('preExaminerAppointments.ZoneType', function () {
                if ($scope.preExaminerAppointments.ZoneType == undefined || $scope.preExaminerAppointments.ZoneType == "")
                { return; }

                getAllBasicCourse();

                if ($scope.preExaminerAppointments.ZoneType == 1 || $scope.preExaminerAppointments.ZoneType == 5) {
                    $scope.preExaminerAppointments.SubType = 'T';
                    if ($scope.preExaminerAppointments.ZoneType == 5) {
                        $scope.preExaminerAppointments.CourseID = 2;
                    } else {
                        $scope.preExaminerAppointments.CourseID = 1;
                    }                 
                } else {
                    $scope.preExaminerAppointments.SubType = 'P';
                    if ($scope.preExaminerAppointments.ZoneType == 2) {
                        $scope.preExaminerAppointments.CourseID = 1;
                        $scope.preExaminerAppointments.ExamID = 2;
                    } else {
                        $scope.preExaminerAppointments.CourseID = 2;
                        $scope.preExaminerAppointments.ExamID = 3;
                    } 
                }    
            });

            $scope.PrintTextReport = function () {
                $scope.preExaminerAppointments.InstanceID = AppSettings.ExamInstID; //Current instance Id
                preExaminerAppointmentReportService.getExaminerAppointmentTextReport($scope.preExaminerAppointments).then(function (results) {

                }, function (error) {
                    $scope.preExaminerAppointments = {};
                    alert(error.statusText);
                });
            }
            $scope.getExaminerAappointmentReport = function () {
                if ($scope.preExaminerAppointmentsForm.$valid && $scope.preExaminerAppointments.ExamID) {
                    $scope.LoadImg = true;
                    $scope.preExaminerAppointments.InstanceID = AppSettings.ExamInstID; //Current instance Id

                    if ($scope.preExaminerAppointments.ZoneType == 1 || $scope.preExaminerAppointments.ZoneType == 5) {
                        $scope.preExaminerAppointments.SubType = 'T';
                        $scope.campshow = true;
                        $scope.preExaminerAppointments.EvalTypeID = 1;
                    } else {
                        $scope.preExaminerAppointments.SubType = 'P';
                        $scope.campshow = false;
                        $scope.preExaminerAppointments.EvalTypeID = 2;
                    }

                    if (AppSettings.CollegeID == 0) {
                        $scope.preExaminerAppointments.CollegeID = 0;
                    } else {
                        if ($scope.preExaminerAppointments.CollegeID == undefined || $scope.preExaminerAppointments.CollegeID == "") {
                            alert("Select College");
                            $scope.LoadImg = false;
                            return;
                        }
                    }
                    

                    preExaminerAppointmentReportService.getExaminerAppointmentReport($scope.preExaminerAppointments).then(function (results) {
                        if (results != "") {
                            $scope.preExaminerAppointments = {};
                            var file = new Blob([results], { type: 'application/pdf' });
                            var fileURL = URL.createObjectURL(file);
                            var date = new Date();
                            var month = parseInt(date.getUTCMonth()) + 1;
                            var fileName = "ExaminerAappointmentReport(" + date.getUTCDate() + '-' + month + '-' + date.getUTCFullYear() + ").pdf";
                            var a = document.createElement("a");
                            document.body.appendChild(a);
                            a.href = fileURL;
                            a.download = fileName;
                            a.click();
                            $scope.LoadImg = false;
                        } //if (results.isSuccess == false) $scope.subjectwiseCenterSummary = {}; alert(results.message);
                    }, function (error) {
                        $scope.preExaminerAppointments = {};
                        alert(error.statusText);
                        $scope.LoadImg = false;
                    });
                }
            };

        });
}());