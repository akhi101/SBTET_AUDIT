(function () {
    'use strict';
    angular.module('app')
        .controller('examTimeTableReportController',
        function ($rootScope, $scope, examTimeTableService, basicCourseService, basicBranchService, basicExamService, basicSubjectService, basicExamSubjectService, AppSettings) {


            $scope.examTimeTableDetail = {};

            $("#LoadImg").attr("src", AppSettings.LoadingImage);
            $scope.LoadImg = false;

            $scope.init = function () {
                //getAllBasicCourse();
                $scope.basicCourses = [{ CourseName: 'General', CourseID: 1 }];
            };

            //var getAllBasicCourse = function () {
            //    basicCourseService.getAllBasicCourse().then(function (results) {
            //        $scope.basicCourses = results;
            //    });
            //};

            $scope.$watch('examTimeTableDetail.CourseID', function () {
                if ($scope.examTimeTableDetail.CourseID !== undefined) {
                    //basicBranchService.getBasicBranchListByCourseId($scope.examTimeTableDetail.CourseID).then(function (results) {
                    //    $scope.basicBranches = results;
                    //});
                    basicExamService.getBasicExamListByCourseID($scope.examTimeTableDetail.CourseID).then(function (results) {
                        $scope.basicExams = results;
                    });
                }
            });


            $scope.getExamTimeTable = function () {
                $scope.LoadImg = true;
                if ($scope.examTimeTableForm.$valid && $scope.examTimeTableDetail.ExamID) {
                    $scope.examTimeTableDetail.ExamInstID = AppSettings.ExamInstID; // Current ExamInstID
                    //$scope.ExamTimeTableDetail = $scope.examTimeTableDetail;
                    examTimeTableService.getGeneratedGeneralExamTimereport($scope.examTimeTableDetail).then(function (results) {
                        if (results != "") {
                            $scope.examTimeTableDetail = {};
                            var file = new Blob([results], { type: 'application/pdf' });
                            var fileURL = URL.createObjectURL(file);
                            var date = new Date();
                            var fileName = "ExamTimeTable(" + date.getUTCDate() + '-' + date.getUTCMonth() + '-' + date.getUTCFullYear() + ").pdf";
                            var a = document.createElement("a");
                            document.body.appendChild(a);
                            a.href = fileURL;
                            a.download = fileName;
                            a.click();
                            $scope.LoadImg = false;
                        } //if (results.isSuccess == false) $scope.subjectwiseCenterSummary = {}; alert(results.message);
                    }, function (error) {
                        $scope.examTimeTableDetail = {};
                        alert(error.statusText);
                        $scope.LoadImg = false;
                    });
                }
              };


            //$scope.getGeneratedExamTimeTableReport = function () {
            //    $scope.LoadImg = true;
            //    if ($scope.examTimeTableForm.$valid && $scope.examTimeTableDetail.ExamID) {
            //        $scope.examTimeTableDetail.ExamInstID = AppSettings.ExamInstID; // Current ExamInstID
            //        //$scope.ExamTimeTableDetail = $scope.examTimeTableDetail;
            //        examTimeTableService.GetGeneralExamTimeTablereportByCourseIDANDExamID($scope.examTimeTableDetail.CourseID, $scope.examTimeTableDetail.ExamID).then(function (results) {
            //            if (results != "") {
            //                $scope.examTimeTableDetail = {};
            //                var file = new Blob([results], { type: 'application/pdf' });
            //                var fileURL = URL.createObjectURL(file);
            //                var date = new Date();
            //                var fileName = "ExamTimeTable(" + date.getUTCDate() + '-' + date.getUTCMonth() + '-' + date.getUTCFullYear() + ").pdf";
            //                var a = document.createElement("a");
            //                document.body.appendChild(a);
            //                a.href = fileURL;
            //                a.download = fileName;
            //                a.click();
            //                $scope.LoadImg = false;
            //            } //if (results.isSuccess == false) $scope.subjectwiseCenterSummary = {}; alert(results.message);
            //        }, function (error) {
            //            $scope.examTimeTableDetail = {};
            //            alert(error.statusText);
            //            $scope.LoadImg = false;
            //        });
            //    }
            //};



            $scope.getGeneratedExamTimeTable = function () {
                examTimeTableService.GetGeneratedGeneralExamTimereport().then(function (results) {
                    alert("Ok");
                }, function (error) {
                    $scope.examTimeTableDetail = {};
                    alert(error.statusText);
                });
            }
            // Old Method From Swapnil
            //$scope.getExamTimeTable = function () {
            //    if ($scope.examTimeTableForm.$valid && $scope.examTimeTableDetail.ExamID && $scope.examTimeTableDetail.BranchID) {
            //        $scope.examTimeTableDetail.ExamInstID = AppSettings.ExamInstID; // Current ExamInstID
            //        examTimeTableService.GetExamTimeTableReport($scope.examTimeTableDetail).then(function (results) {
            //            if (results != "") {
            //                $scope.examTimeTableDetail = {};
            //                var file = new Blob([results], { type: 'application/pdf' });
            //                var fileURL = URL.createObjectURL(file);
            //                var date = new Date();
            //                var fileName = "ExamTimeTable(" + date.getUTCDate() + '-' + date.getUTCMonth() + '-' + date.getUTCFullYear() + ").pdf";
            //                var a = document.createElement("a");
            //                document.body.appendChild(a);
            //                a.href = fileURL;
            //                a.download = fileName;
            //                a.click();
            //            } //if (results.isSuccess == false) $scope.subjectwiseCenterSummary = {}; alert(results.message);
            //        }, function (error) {
            //            $scope.examTimeTableDetail = {};
            //            alert(error.statusText);
            //        });
            //    }
            //};

        });
}());