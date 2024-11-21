(function () {
    'use strict';
    angular.module('app')
        .controller('BulkExaminerAppointmnetGenPractController',
            function ($rootScope, $scope, preExaminerAppointmentsService, basicCourseService, AppSettings) {

                
                $scope.BulkExaminerAppointmnetGenPract = {};
                $scope.campshow = true;
                $scope.init = function () {
                     //getAllBasicCourse();
                    $scope.BulkExaminerAppointmnetGenPract.CourseID = 1;
                    $scope.BulkExaminerAppointmnetGenPract.EvalTypeID = 2
                    //getAllCampusList();
                    getBasicExaminerTypes();
                    $scope.basicEvalTypes = [{ EvalTypeName: 'Theory', EvalTypeID: 1 },
                    { EvalTypeName: 'Practical', EvalTypeID: 2 }];
                    getBasicDistrictListByUserId();
                };


                $scope.ZoneTypes = [
                    { ZoneTypeName: 'General Practical', ZoneType: '2' },
                    { ZoneTypeName: 'Vocational Practical', ZoneType: '3' }
                    //,{ ZoneTypeName: 'Bridge Vocational Practical', ZoneType: '4' }
                ];


                $scope.BulkExaminerAppointmnetGenPract.ZoneType = '2';
                $("#LoadImg").attr("src", AppSettings.LoadingImage);
                $scope.LoadImg = false;

                var getAllBasicCourse = function () {
                    basicCourseService.getAllBasicCourse().then(function (results) {
                        $scope.basicCourses = results;
                    });
                };

                var getBasicDistrictListByUserId = function () {
                    $scope.BulkExaminerAppointmnetGenPract.UpdLoginID = AppSettings.LoggedUserId;
                    preExaminerAppointmentsService.getBasicDistrictListByUserId($scope.BulkExaminerAppointmnetGenPract.UpdLoginID).then(function (results) {
                        $scope.basicDistrictList = results;
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
                $scope.$watch('BulkExaminerAppointmnetGenPract.EvalTypeID', function () {
                    if ($scope.BulkExaminerAppointmnetGenPract.EvalTypeID !== undefined) {
                        if ($scope.BulkExaminerAppointmnetGenPract.EvalTypeID == 1) {
                            $scope.campshow = true;
                            $scope.BulkExaminerAppointmnetGenPract.SubType = "T";
                        }
                        else {
                            $scope.campshow = false;
                            $scope.BulkExaminerAppointmnetGenPract.SubType = "P";
                        }
                        preExaminerAppointmentsService.getbasicCampusListByDistrictID(AppSettings.ExamInstID, $scope.BulkExaminerAppointmnetGenPract.SubType).then(function (results) {
                            $scope.basicCampusList = results;
                        });
                    }

                });
                $scope.ProcessBulkExaminerAppointmnetGenPract = function () {
                    if ($scope.BulkExaminerAppointmnetGenPract.DistrictID == "" || $scope.BulkExaminerAppointmnetGenPract.DistrictID == undefined)
                    {                        
                        $scope.BulkExaminerAppointmnetGenPract.DistrictID = 0;
                        //alert("Select District.");
                        //return;

                    }
                    if ($scope.BulkExaminerAppointmnetGenPract.ZoneType == "" || $scope.BulkExaminerAppointmnetGenPract.ZoneType == undefined)
                    {
                        alert("Select Zone Type.");
                        return;
                    }
                    $scope.LoadImg = true;

                    if ($scope.BulkExaminerAppointmnetGenPract.EvalTypeID == 1) {
                        $scope.BulkExaminerAppointmnetGenPract.CampusID = 0;// $scope.BulkExaminerAppointmnet.CampusID;
                        $scope.BulkExaminerAppointmnetGenPract.PrePractCntrID = 0;
                    }
                    else {
                        $scope.BulkExaminerAppointmnetGenPract.CampusID = 0;
                        $scope.BulkExaminerAppointmnetGenPract.PrePractCntrID = 0; //$scope.BulkExaminerAppointmnet.PrePractCntrID;
                    }
                    $scope.BulkExaminerAppointmnetGenPract.InstanceID = AppSettings.ExamInstID; //Current instance Id
                    $scope.BulkExaminerAppointmnetGenPract.UpdLoginID = AppSettings.LoggedUserId;
                    //$scope.BulkExaminerAppointmnetGenPract.FromDate = new Date($scope.BulkExaminerAppointmnetGenPract.FromDate.toString("YYYY-MM-DD"));
                    //$scope.BulkExaminerAppointmnetGenPract.ToDate = new Date($scope.BulkExaminerAppointmnetGenPract.ToDate.toString("YYYY-MM-DD"));
                    preExaminerAppointmentsService.ProcessBulkExaminerAppointmnetGenPract($scope.BulkExaminerAppointmnetGenPract).then(function (results) {
                        if (results != "") {
                            alert("Process done successfully");
                        }
                        $scope.LoadImg = false;
                    }, function (error) {
                        $scope.BulkExaminerAppointmnetGenPract = {};
                        alert(error.statusText);
                        $scope.LoadImg = false;
                    });
                };

            });
}());