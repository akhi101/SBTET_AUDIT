(function () {
    'use strict';
    angular.module('app')
        .controller('vocationalexamTimeTableReportController',
            function ($rootScope, $scope, examTimeTableService, basicCourseService, basicExamService, AppSettings) {


                $scope.vocationalexamTimeTableDetail = {};

                $("#LoadImg").attr("src", AppSettings.LoadingImage);
                $scope.LoadImg = false;

                $scope.init = function () {
                    $scope.basicCourses = [{ CourseName: 'Vocational', CourseID: 2 }];
                    //getAllBasicCourse();
                };

                var getAllBasicCourse = function () {
                    basicCourseService.getAllBasicCourse().then(function (results) {
                        $scope.basicCourses = results;
                    });
                };

                $scope.$watch('vocationalexamTimeTableDetail.CourseID', function () {
                    if ($scope.vocationalexamTimeTableDetail.CourseID !== undefined) {
                        //basicBranchService.getBasicBranchListByCourseId($scope.examTimeTableDetail.CourseID).then(function (results) {
                        //    $scope.basicBranches = results;
                        //});
                        basicExamService.getBasicExamListByCourseID($scope.vocationalexamTimeTableDetail.CourseID).then(function (results) {
                            $scope.basicExams = results;
                        });
                    }
                });

                $scope.getVocationalExamTimeTableReport = function () {

                    //if ($scope.vocationalexamTimeTableDetail.ExamID) {

                        $scope.vocationalexamTimeTableDetail.ExamInstID = AppSettings.ExamInstID; // Current ExamInstID
                      //$scope.vocationalexamTimeTableDetail.ExamInstID = 102; // Please Uncomment Hard Code This For Testing 
                    $scope.LoadImg = true;
                        examTimeTableService.GetVocationalExamTimeTableReport($scope.vocationalexamTimeTableDetail).then(function (results) {
                            if (results != "") {
                                $scope.vocationalexamTimeTableDetail = {};
                                var file = new Blob([results], { type: 'application/pdf' });
                                var fileURL = URL.createObjectURL(file);
                                var date = new Date();
                                var fileName = "VocationalExamTimeTable(" + date.getUTCDate() + '-' + date.getUTCMonth() + '-' + date.getUTCFullYear() + ").pdf";
                                var a = document.createElement("a");
                                document.body.appendChild(a);
                                a.href = fileURL;
                                a.download = fileName;
                                a.click();
                                $scope.LoadImg = false;
                            } //if (results.isSuccess == false) $scope.subjectwiseCenterSummary = {}; alert(results.message);
                        }, function (error) {
                            $scope.vocationalexamTimeTableDetail = {};
                            alert(error.statusText);
                            $scope.LoadImg = false;
                        });
                    //}
                };

            });
}());