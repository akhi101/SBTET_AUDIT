(function () {
    'use strict';
    angular.module('app')
        .controller('studentCountController', 
        function ($rootScope, $scope, basicCourseService, basicExamService, studentCountService, basicManagementTypeService, AppSettings) {
            
            $scope.studentCount = {};
            $("#LoadImg").attr("src", AppSettings.LoadingImage);
                $scope.LoadImg = false;
                $scope.init = function () {
                    getAllBasicCourse();
                    getAllBasicManagementType();
                };

                var getAllBasicCourse = function () {
                    basicCourseService.getAllBasicCourse().then(function (results) {
                        $scope.basicCourses = results;
                    });
            };

            var getAllBasicManagementType = function () {
                basicManagementTypeService.getBasicManagementTypeList().then(function (results) {
                    $scope.basicMngtType = results;
                });
            };

                $scope.$watch('studentCount.CourseID', function () {
                    if ($scope.studentCount.CourseID !== undefined) {
                        basicExamService.getBasicExamListByCourseID($scope.studentCount.CourseID).then(function (results) {
                            $scope.basicExams = results;
                        });
                    }
                });

               

                $scope.getStudentCountReport = function () {
                    if ($scope.studentCountForm.$valid) {
                        $scope.LoadImg = true;
                        $scope.studentCount.ExamInstID = AppSettings.ExamInstID; // Current ExamInstID
                        studentCountService.getStudentCountReport($scope.studentCount).then(function (results) {
                            if (results != "") {
                                $scope.studentCount = {};
                                var file = new Blob([results], { type: 'application/pdf' });
                                var fileURL = URL.createObjectURL(file);
                                var date = new Date();
                                var fileName = "StudentCount(" + date.getUTCDate() + '-' + date.getUTCMonth() + '-' + date.getUTCFullYear() + ").pdf";
                                var a = document.createElement("a");
                                document.body.appendChild(a);
                                a.href = fileURL;
                                a.download = fileName;
                                a.click();  
                                $scope.LoadImg = false;
                            } //if (results.isSuccess == false) $scope.studentCount = {}; alert(results.message);
                        }, function (error) {
                            $scope.studentCount = {};
                            alert(error.statusText);
                            $scope.LoadImg = false;
                        });
                    }
                };

            });
}());