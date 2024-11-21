(function () {
    'use strict';
    angular.module('app')
        .controller('centerwiseSeatingArrangementController', 
        function ($rootScope, $scope, $state, basicCourseService, basicZoneService, basicCollegeService, basicBranchService, basicExamService, centerwiseSeatingArrangementService, AppSettings) {

                $scope.centerwiseSeatingArrangement = {};

            $("#LoadImg").attr("src", AppSettings.LoadingImage);
            $scope.LoadImg = false;

                $scope.init = function () {
                    getAllBasicCourse();
                    getAllBasicCollege();
                    getAllZone(AppSettings.ExamInstID);  // Current ExamInstID

                };

                var getAllBasicCourse = function () {
                    basicCourseService.getAllBasicCourse().then(function (results) {
                        $scope.basicCourses = results;
                    });
                };
                var getAllBasicCollege = function () {
                    basicCollegeService.getAllBasicCollege().then(function (results) {
                        $scope.basicColleges = results;
                    });
                };
            var getAllZone = function (ExamInstID) {
                basicZoneService.getZoneListByDistAndType(ExamInstID, 1, AppSettings.DistrictIDs).then(function (results) {
                        $scope.zones = results;
                    });
                };

                $scope.$watch('centerwiseSeatingArrangement.CourseID', function () {
                    if ($scope.centerwiseSeatingArrangement.CourseID !== undefined) {
                        //basicBranchService.getBasicBranchListByCourseId($scope.centerwiseSeatingArrangement.courseID).then(function (results) {
                        //    $scope.basicBranches = results;
                        //});
                        basicExamService.getBasicExamListByCourseID($scope.centerwiseSeatingArrangement.CourseID).then(function (results) {
                            $scope.basicExams = results;
                        });
                    }
                });


                $scope.getCenterwiseSeatingArrangement = function () {
                    if ($scope.centerwiseSeatingArrangementForm.$valid) {
                        $scope.LoadImg = true;
                        $scope.centerwiseSeatingArrangement.ExamInstID = AppSettings.ExamInstID; // Current ExamInstID
                        centerwiseSeatingArrangementService.getCenterwiseSeatingArrangement($scope.centerwiseSeatingArrangement).then(function (results) {
                            if (results.isSuccess == undefined && results != "") {
                                $scope.centerwiseSeatingArrangement = {};
                                var file = new Blob([results], { type: 'application/pdf' });
                                var fileURL = URL.createObjectURL(file);
                                var date = new Date();
                                var fileName = "CenterwiseSeatingArrangement(" + date.getUTCDate() + '-' + date.getUTCMonth() + '-' + date.getUTCFullYear() +").pdf";
                                var a = document.createElement("a");
                                document.body.appendChild(a);
                                a.href = fileURL;
                                a.download = fileName;
                                a.click();      
                                $scope.LoadImg = false;
                            } //if (results.isSuccess == false) $scope.centerwiseSeatingArrangement = {}; alert(results.message);
                        }, function (error) {
                            $scope.centerwiseSeatingArrangement = {};
                            alert(error.statusText);
                            $scope.LoadImg = false;
                        });
                    }
                };
            });
}());