(function () {
    'use strict';
    angular.module('app')
        .controller('centerwiseSubjectSummaryController',
            function ($rootScope, $scope, $state, basicBranchService, basicCourseService, basicExamService, centerwiseSubjectSummaryService, basicDistrictsService, basicCollegeService, basicExamSubjectService, AppSettings) {

                $scope.centerwiseSubjectSummary = {};

                $scope.studentCount = {};
                $("#LoadImg").attr("src", AppSettings.LoadingImage);
                $scope.LoadImg = false;

                $scope.init = function () {
                    getAllBasicCourse();
                    getAllBasicDistrict();
                };

                var getAllBasicCourse = function () {
                    basicCourseService.getAllBasicCourse().then(function (results) {
                        $scope.courses = results;
                    });
                };
                var getAllBasicDistrict = function () {
                    basicDistrictsService.getBasicDistrictsList().then(function (results) {
                        $scope.basicDistricts = results;
                    });
                };

                $scope.$watch('centerwiseSubjectSummary.CourseID', function () {
                    if ($scope.centerwiseSubjectSummary.CourseID !== undefined) {
                        //basicBranchService.getBasicBranchListByCourseId($scope.centerwiseSubjectSummary.courseID).then(function (results) {
                        //    $scope.basicBranches = results;
                        //});
                        basicExamService.getBasicExamListByCourseID($scope.centerwiseSubjectSummary.CourseID).then(function (results) {
                            $scope.bacicExams = results;
                            $scope.basicDistricts = "";
                            $scope.basicCenters = "";
                            $scope.basicExamSubjects = "";
                            getAllBasicDistrict();
                        });
                    }
                });

                $scope.$watch('centerwiseSubjectSummary.DistrictID', function () {
                    if ($scope.centerwiseSubjectSummary.DistrictID !== undefined) {
                        basicCollegeService.getTheroyExamCenterCollegeList($scope.centerwiseSubjectSummary.DistrictID, AppSettings.ExamInstID).then(function (results) {
                            $scope.basicCenters = results;
                            
                        });
                    }
                });

                $scope.$watch('centerwiseSubjectSummary.PreZoneCntrID', function () {
                    if ($scope.centerwiseSubjectSummary.PreZoneCntrID !== undefined) {
                        basicExamSubjectService.getExamSubjectForCenterWiseSummeryReport($scope.centerwiseSubjectSummary.ExamID, AppSettings.ExamInstID, $scope.centerwiseSubjectSummary.DistrictID, $scope.centerwiseSubjectSummary.PreZoneCntrID).then(function (results) {
                            $scope.basicExamSubjects = results;
                        });
                    }
                });


                $scope.getCenterwiseSubjectSummary = function () {
                    if ($scope.centerwiseSubjectSummaryForm.$valid) {
                        $scope.LoadImg = true;
                        if ($scope.centerwiseSubjectSummary.PreZoneCntrID == undefined || $scope.centerwiseSubjectSummary.PreZoneCntrID == "") {
                            $scope.centerwiseSubjectSummary.PreZoneCntrID = 0;
                        }
                        if ($scope.centerwiseSubjectSummary.ExmSubID == undefined || $scope.centerwiseSubjectSummary.ExmSubID == "") {
                            $scope.centerwiseSubjectSummary.ExmSubID = 0;
                        }
                        $scope.centerwiseSubjectSummary.ExamInstID = AppSettings.ExamInstID; // Current ExamInstID
                        centerwiseSubjectSummaryService.getCenterwiseSubjectSummary($scope.centerwiseSubjectSummary).then(function (results) {
                            if (results != "") {
                                
                                $scope.centerwiseSubjectSummary = {};
                                var file = new Blob([results], { type: 'application/pdf' });
                                var fileURL = URL.createObjectURL(file);
                                var date = new Date();
                                var fileName = "CenterwiseSubjectSummary(" + date.getUTCDate() + '-' + date.getUTCMonth() + '-' + date.getUTCFullYear() + ").pdf";
                                var a = document.createElement("a");
                                document.body.appendChild(a);
                                a.href = fileURL;
                                a.download = fileName;
                                a.click();
                                $scope.LoadImg = false;
                                //var file = new Blob([results], { type: 'application/pdf' });
                                //var fileURL = URL.createObjectURL(file);
                                //window.open(fileURL);
                            } //if (results.isSuccess == false) $scope.centerwiseSubjectSummary = {}; alert(results.message);
                        }, function (error) {
                            $scope.centerwiseSubjectSummary = {};
                            alert(error.statusText);
                            $scope.LoadImg = false;
                        });
                    }
                };

            });
}());