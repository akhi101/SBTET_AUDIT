(function () {
    'use strict';
    angular.module('app')
        .controller('vocBridgeAndOtherSubjectexamTimeTableReportController',
            function ($rootScope, $scope, examTimeTableService, basicCourseService, basicExamService, AppSettings) {


                $scope.vocbridgeotherSubexamTimeTableDetail = {};

                $scope.init = function () {
                    //$scope.basicCourses = [{ CourseName: 'Vocational', CourseID: 2 }];
                    getAllBasicCourse();
                    $scope.basicSubjectTypes = [{ SubjectTypeName: 'BridgeCourse', SubjectTypeID: 1 },
                    { SubjectTypeName: 'OtherSubject', SubjectTypeID: 2 }];

                    $scope.basicEvalTypes = [{ EvalTypeName: 'Theory', EvalTypeID: 1 },
                    { EvalTypeName: 'Practical', EvalTypeID: 2 }];

                };

                var getAllBasicCourse = function () {
                    basicCourseService.getAllBasicCourse().then(function (results) {
                        $scope.basicCourses = results;
                    });
                };

                $scope.$watch('vocbridgeotherSubexamTimeTableDetail.CourseID', function () {
                    if ($scope.vocbridgeotherSubexamTimeTableDetail.CourseID !== undefined) {
                        //basicBranchService.getBasicBranchListByCourseId($scope.examTimeTableDetail.CourseID).then(function (results) {
                        //    $scope.basicBranches = results;
                        //});
                        basicExamService.getBasicExamListByCourseID($scope.vocbridgeotherSubexamTimeTableDetail.CourseID).then(function (results) {
                            $scope.basicExams = results;
                        });
                    }
                });

                $scope.getVocBridgeOtherSubjectExamTimeTableReport = function () {

                    //if ($scope.vocationalexamTimeTableDetail.ExamID) {

                   // $scope.vocationalexamTimeTableDetail.ExamInstID = AppSettings.ExamInstID; // Current ExamInstID
                    $scope.vocbridgeotherSubexamTimeTableDetail.ExamInstID = 102; // Please Uncomment Hard Code This For Testing 

                    examTimeTableService.GetBridgeOrOtherSubjectExamTimeTableReport($scope.vocbridgeotherSubexamTimeTableDetail).then(function (results) {
                        if (results != "") {
                            $scope.vocbridgeotherSubexamTimeTableDetail = {};
                            var file = new Blob([results], { type: 'application/pdf' });
                            var fileURL = URL.createObjectURL(file);
                            var date = new Date();
                            var fileName = "BridgeOrOtherSubjectExamTimeTable(" + date.getUTCDate() + '-' + date.getUTCMonth() + '-' + date.getUTCFullYear() + ").pdf";
                            var a = document.createElement("a");
                            document.body.appendChild(a);
                            a.href = fileURL;
                            a.download = fileName;
                            a.click();
                        } //if (results.isSuccess == false) $scope.subjectwiseCenterSummary = {}; alert(results.message);
                    }, function (error) {
                        $scope.vocbridgeotherSubexamTimeTableDetail = {};
                        alert(error.statusText);
                    });
                    //}
                };

            });
}());