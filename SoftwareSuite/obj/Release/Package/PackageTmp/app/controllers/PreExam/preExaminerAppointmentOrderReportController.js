(function () {
    'use strict';
    angular.module('app')
        .controller('preExaminerAppointmentOrderReportController',
        function ($rootScope, $scope, preExaminerAppointmentReportService, basicCourseService, basicExamService, basicDistrictsService, basicCollegeService, AppSettings) {


            if (AppSettings.CollegeID != "0") {
                $scope.ForCollege = true;
            }
            else {
                $scope.ForCollege = false;
            }

                $scope.preExaminerAppointments = {};

                $("#LoadImg").attr("src", AppSettings.LoadingImage);
                $scope.LoadImg = false;

                $scope.init = function () {
                    getAllBasicCourse();
                    getAllBasicDistrict();
                };

                var getAllBasicCourse = function () {
                    basicCourseService.getAllBasicCourse().then(function (results) {
                        $scope.basicCourses = results;
                        if ($scope.preExaminerAppointments.ZoneType != undefined) { 
                        if ($scope.preExaminerAppointments.ZoneType == 1 || $scope.preExaminerAppointments.ZoneType == 2) {
                            $scope.preExaminerAppointments.CourseID = $scope.basicCourses[0].CourseID;
                        } else {
                            $scope.preExaminerAppointments.CourseID =  $scope.basicCourses[1].CourseID;
                            }
                            basicExamService.getBasicExamListByCourseID($scope.preExaminerAppointments.CourseID).then(function (resultsexm) {
                                $scope.basicExams = resultsexm;
                            });
                    }                       
                    });
                };
                var getAllBasicDistrict = function () {
                    //basicDistrictsService.getBasicDistrictsList().then(function (results) {
                    preExaminerAppointmentReportService.getBasicDistrictListByUserId(AppSettings.LoggedUserId).then(function (results) {
                        $scope.basicDistricts = results;
                        $scope.basicColleges = [];
                        if ($scope.basicDistricts.length > 0)
                        {
                            $scope.preExaminerAppointments.DistrictID = $scope.basicDistricts[0].DistrictID;
                            preExaminerAppointmentReportService.GetPracticalCenterListByDistrictIDANDZoneType(AppSettings.ExamInstID, $scope.preExaminerAppointments.ZoneType, $scope.preExaminerAppointments.DistrictID).then(function (resultsCollege) {
                                $scope.basicColleges = resultsCollege;
                            });

                        }

                    });
            };
            $scope.ZoneTypes = [
                { ZoneTypeName: 'General Theory', ZoneType: '1' },
                { ZoneTypeName: 'General Practical', ZoneType: '2' },
                { ZoneTypeName: 'Vocational Practical', ZoneType: '3' },
                { ZoneTypeName: 'Bridge Vocational Practical', ZoneType: '4' }
                //,{ ZoneTypeName: 'Bridge Vocational Theory', ZoneType: '5' }
            ];

                $scope.$watch('preExaminerAppointments.CourseID', function () {
                    if ($scope.preExaminerAppointments.CourseID !== undefined) {

                        basicExamService.getBasicExamListByCourseID($scope.preExaminerAppointments.CourseID).then(function (results) {
                            $scope.basicExams = results;
                        });
                    }
                });
            $scope.$watch('preExaminerAppointments.ZoneType', function ()
            {
                getAllBasicCourse();
                
                getAllBasicDistrict();
            });

            $scope.$watch('preExaminerAppointments.DistrictID', function () {
                    if ($scope.preExaminerAppointments.DistrictID !== undefined) {

                        //basicCollegeService.getCollegeListByDistrict($scope.preExaminerAppointments.DistrictID).then(function (results) {
                        //    $scope.basicColleges = results;
                        //});

                        preExaminerAppointmentReportService.GetPracticalCenterListByDistrictIDANDZoneType(AppSettings.ExamInstID, $scope.preExaminerAppointments.ZoneType, $scope.preExaminerAppointments.DistrictID).then(function (results) {
                            $scope.basicColleges = results;
                        });

                        //basicCollegeService.getTheroyExamCenterCollegeList($scope.preExaminerAppointments.DistrictID).then(function (results) {
                        //    $scope.basicCenters = results;
                        //});
                    }
            });


            //function FillPracticalCenterList(DistrictID, ZoneType) {
            //    //$scope.GetPracticalCenterList = function (DistrictID) {
            //    if (DistrictID != "" || DistrictID != undefined) {
            //        //var PracticalCenterList = PrePractCenterService.GetPrePractCenterByDistrictId(DistrictID, AppSettings.ExamInstID);

            //        var PracticalCenterList = preExaminerAppointmentReportService.GetPracticalCenterListByDistrictIDANDZoneType(AppSettings.ExamInstID, ZoneType, DistrictID);
            //        PracticalCenterList.then(function (PracticalCenterData, status, headers, config, error) {
            //            $scope.PracticalCenterList = PracticalCenterData;
            //        }, function (PracticalCenterData, status, headers, config) {
            //            alert(error);
            //        })
            //    }
            //}


                $scope.$watch('preExaminerAppointments.CollegeID', function () {
                    if ($scope.preExaminerAppointments.CollegeID !== undefined) {
                        $scope.examinerList = [];
                        //preExaminerAppointmentReportService.getExaminerListByCollegeID($scope.preExaminerAppointments.CollegeID).then(function (results) {
                        preExaminerAppointmentReportService.GetExaminerListByCollegeIDForOrderReport($scope.preExaminerAppointments.CollegeID, $scope.preExaminerAppointments.ExamID).then(function (results) {
                            $scope.examinerList = results;
                        });
                    }
                });

                $scope.getExaminerAappointmentOrderReport = function () {
                    if ($scope.preExaminerAppointmentsForm.$valid && $scope.preExaminerAppointments.ExamID) {
                        if ($scope.preExaminerAppointments.ExaminerID == undefined || $scope.preExaminerAppointments.ExaminerID == "") {
                            $scope.preExaminerAppointments.ExaminerID = 0;
                        }
                        $scope.LoadImg = true;
                        var ExaminerID = $scope.preExaminerAppointments.ExaminerID;
                        var InstanceID = AppSettings.ExamInstID; // Current ExamInstID
                        var EvalTypeID = 0;
                        var ExamID = $scope.preExaminerAppointments.ExamID;
                        var CollegeID = AppSettings.CollegeID;
                        preExaminerAppointmentReportService.getPreExaminerAppointmentsOrderByExaminerID(InstanceID, ExaminerID, EvalTypeID, ExamID, 0, $scope.preExaminerAppointments.DistrictID, $scope.preExaminerAppointments.ZoneType, CollegeID).then(function (results) {
                            if (results != "") {
                                $scope.preExaminerAppointments = {};
                                var file = new Blob([results], { type: 'application/pdf' });
                                var fileURL = URL.createObjectURL(file);
                                var date = new Date();
                                var month = parseInt(date.getUTCMonth()) + 1;
                                var fileName = "ExaminerAappointmentOrderReport(" + date.getUTCDate() + '-' + month + '-' + date.getUTCFullYear() + ").pdf";
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