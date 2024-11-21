(function () {
	'use strict';
	angular.module('app')
        .controller('hallTicketGenerationController', 
        function ($rootScope, $scope, $state, basicCourseService, basicCollegeService, basicBranchService, basicExamService, missMatchService, AppSettings) {

                $scope.markEntryDetail = {};

				$scope.init = function () {
					getAllBasicCourse();
				};

				var getAllBasicCourse = function () {
					basicCourseService.getAllBasicCourse().then(function (results) {
						$scope.basicCourses = results;
					});
				};
				
                $scope.$watch('markEntryDetail.CourseID', function () {
                    if ($scope.markEntryDetail.CourseID !== undefined) {	
                        basicBranchService.getBasicBranchListByCourseId($scope.markEntryDetail.CourseID).then(function (results) {
                            $scope.basicBranches = results;
                        });
                        basicExamService.getBasicExamListByCourseID($scope.markEntryDetail.CourseID).then(function (results) {
							$scope.basicExams = results;
						});
					}
                });

                $scope.getMissMatchOfMarkEntry = function () {
                    if ($scope.markEntryForm.$valid) {
                        $scope.markEntryDetail.ExamInstID = AppSettings.ExamInstID; // Current ExamInstID
                        missMatchService.getMissMatchOfMarkEntry($scope.markEntryDetail).then(function (results) { 
                            if (results != "") {
                                $scope.markEntryDetail = {};
                                var file = new Blob([results], { type: 'application/pdf' });
                                var fileURL = URL.createObjectURL(file);
                                var date = new Date();
                                var fileName = "MissMatchOfMarkEntry(" + date.getUTCDate() + '-' + date.getUTCMonth() + '-' + date.getUTCFullYear() + ").pdf";
                                var a = document.createElement("a");
                                document.body.appendChild(a);
                                a.href = fileURL;
                                a.download = fileName;
                                a.click();
                            }
                           // if (results.isSuccess == false) alert(results.message);
                            }, function (error) {
                                $scope.markEntryDetail
                            alert(error.statusText);
                        });
                    }
                };

			});
}());