(function () {
    'use strict';
    angular.module('app')
        .controller('generalStreamExamTimeTableController',
            function ($rootScope, $scope, examTimeTableService, basicCourseService, basicBranchService, basicExamService, basicSubjectService, basicExamSubjectService, AppSettings) {


                $scope.generalexamTimeTableDetail = {};
                $scope.generalexamTimeTableDetail.examTimeTableSubjects = {};
                $scope.generalexamTimeTableDetails = [];
                $scope.isValid = false;
                $scope.generalexamTimeTableDetail.ExamInstID = 0;
                $scope.generalexamTimeTableDetail.CreLoginID = 0;
                $scope.generalexamTimeTableDetail.UpdLoginID = 0;
                $scope.generalexamTimeTableDetail.StartTime = "";
                $scope.generalexamTimeTableDetail.EndTime = "";
                $scope.generalexamTimeTableDetail.StartDate = "";
                $scope.generalexamTimeTableDetail.EndDate = "";
                $scope.generalexamTimeTableDetail.CheckDate = "";

                $scope.init = function () {

                    // getAllBasicCourse();
                    $scope.basicCourses = [{ CourseName: 'General', CourseID: 1 }];
                    $scope.examSessions = [
                        { examSessionName: 'ForeNoon', examSession: "M" },
                        { examSessionName: 'AfterNoon', examSession: "A" }
                    ];
                    $scope.basicExamDays = [
                        { TTFlagName: 'Day1', TTFlag: '1' },
                        { TTFlagName: 'Day2', TTFlag: '2' },
                        { TTFlagName: 'Day3', TTFlag: '3' },
                        { TTFlagName: 'Day4', TTFlag: '4' },
                        { TTFlagName: 'Day5', TTFlag: '5' },
                        { TTFlagName: 'Day6', TTFlag: '6' },
                        { TTFlagName: 'Day7', TTFlag: '7' },
                        { TTFlagName: 'Day8', TTFlag: '8' }
                    ];
                };

                var getAllBasicCourse = function () {
                    basicCourseService.getAllBasicCourse().then(function (results) {
                        $scope.basicCourses = results;
                    });
                };

                $scope.$watch('generalexamTimeTableDetail.CourseID', function () {
                    if ($scope.generalexamTimeTableDetail.CourseID !== undefined) {

                        //basicBranchService.getBasicBranchListByCourseId($scope.examTimeTableDetail.CourseID).then(function (results) {
                        //    $scope.basicBranches = results;
                        //});
                        basicExamService.getBasicExamListByCourseID($scope.generalexamTimeTableDetail.CourseID).then(function (results) {
                            $scope.basicExams = results;
                        });

                    }
                });


                $scope.showGeneralExamTimeTableDetails = function () {
                    if ($scope.generalStreamExamTimeTableForm.$valid && $scope.generalexamTimeTableDetail.ExamID !== undefined) {
                        //$scope.vocationalexamTimeTableApprovalDetail.ExamInstID = AppSettings.ExamInstID; // Current ExamInstID
                        $scope.generalexamTimeTableDetail.ExamInstID = 102;

                        examTimeTableService.GETGeneralStreamExamTimeTable($scope.generalexamTimeTableDetail.ExamID, $scope.generalexamTimeTableDetail.TTFlag).then(function (results) {
                            if (results.length > 0) {

                                $scope.generalexamTimeTableDetails = results;
                                
                                //$scope.generalexamTimeTableDetail.StartDate = results[0].StartDate;
                                //$scope.generalexamTimeTableDetail.ExamSession = "" + results[0].ExamSessionval + "";

                                $scope.generalexamTimeTableDetail.StartDate = new Date($scope.generalexamTimeTableDetails[0].StartDate);

                                $scope.generalexamTimeTableDetail.ExamSession = "" + $scope.generalexamTimeTableDetails[0].ExamSession +"";

                                //$scope.generalexamTimeTableDetail.StartTime = $scope.generalexamTimeTableDetail[0].StartTime.format('hh:mm a');

                            } else {
                                $scope.generalexamTimeTableDetails = [];
                                alert("Result not found");
                            }
                        });
                    }
                };



                $scope.SaveGeneralExamTimetable = function () {
                    //$scope.generalexamTimeTableDetails = [];
                    //if ($scope.generalexamTimeTableDetail.StartDate != "" && $scope.generalexamTimeTableDetail.StartDate != undefined) {

                        if ($scope.generalexamTimeTableDetail.ExamSession != 0 && $scope.generalexamTimeTableDetail.ExamSession != undefined) {
                            if ($scope.generalexamTimeTableDetail.StartTime != null && $scope.generalexamTimeTableDetail.EndTime != null) {
                                if (Date.parse($scope.generalexamTimeTableDetail.StartTime) < Date.parse($scope.generalexamTimeTableDetail.EndTime)) {

                                    $scope.generalexamTimeTableDetail.CreLoginID = AppSettings.LoggedUserId;
                                    $scope.generalexamTimeTableDetail.UpdLoginID = AppSettings.LoggedUserId;
                                    $scope.generalexamTimeTableDetail.ExamInstID = AppSettings.ExamInstID;
                                    $scope.generalexamTimeTableDetail.ExamInstID = AppSettings.ExamInstID;
                                    $scope.generalexamTimeTableDetail.CheckDate = window.moment(new Date($scope.generalexamTimeTableDetail.StartDate)).format("YYYY-MM-DD");;
                                    $scope.generalexamTimeTableDetail.StartDate = window.moment(new Date($scope.generalexamTimeTableDetail.StartDate)).format("YYYY-MM-DD");
                                    $scope.generalexamTimeTableDetail.EndDate = window.moment(new Date($scope.generalexamTimeTableDetail.StartDate)).format("YYYY-MM-DD");
                                    $scope.generalexamTimeTableDetail.StartTime = window.moment($scope.generalexamTimeTableDetail.StartTime).format('hh:mm a');
                                    $scope.generalexamTimeTableDetail.EndTime = window.moment($scope.generalexamTimeTableDetail.EndTime).format('hh:mm a');

                                    examTimeTableService.putGeneralExamTimeTable($scope.generalexamTimeTableDetail).then(function (results) {
                                        if (results.IsSuccess) {
                                            $scope.generalexamTimeTableDetail = {};
                                            $scope.generalexamTimeTableDetails = [];
                                            // $scope.examTimeTableSubjects = [];
                                            alert(results.Message);
                                        } else {
                                            //$scope.generalexamTimeTableDetail = {};
                                            //$scope.examTimeTableSubjects = [];
                                            alert(results.Message);
                                        }
                                    }, function (error) {
                                        $scope.generalexamTimeTableDetail = {};
                                        //$scope.examTimeTableSubjects = [];
                                        alert(error.statusText);
                                    });
                                }
                                else {
                                    alert("End time should be grater than start time");
                                    $scope.isValid = false;

                                }
                            } else {
                                alert("Please Enter Time ");
                                $scope.isValid = false;
                                //break;
                            }
                        }
                        else {
                            alert("Please Select Exam Session");
                            $scope.isValid = false;
                            //break;
                        }

                    //} else {
                    //    alert("Please Choose Date");
                    //    $scope.isValid = false;
                    //    //break;
                    //}

                }

                //$scope.SaveGeneralExamTimetable = function () {
                //    $scope.generalexamTimeTableDetails = [];
                //    if ($scope.generalexamTimeTableDetail.StartTime.StartTime != null && $scope.generalexamTimeTableDetail.EndTime != null) {
                //        if (Date.parse($scope.generalexamTimeTableDetail.StartTime) < Date.parse($scope.generalexamTimeTableDetail.EndTime)) {
                //            var temp = {};
                //            $scope.tempDetails = {};
                //            $scope.tempDetails.StartDate = window.moment(new Date($scope.generalexamTimeTableDetail.StartDate)).format("YYYY-MM-DD");
                //            $scope.tempDetails.EndDate = window.moment(new Date($scope.generalexamTimeTableDetail.EndDate)).format("YYYY-MM-DD");
                //            $scope.tempDetails.StartTime = window.moment($scope.generalexamTimeTableDetail.StartTime).format('hh:mm a');
                //            $scope.tempDetails.EndTime = window.moment($scope.generalexamTimeTableDetail.EndTime).format('hh:mm a');
                //            $scope.tempDetails.ExamSession = $scope.generalexamTimeTableDetail.ExamSession;
                //            $scope.tempDetails.ExamInstID = 102;
                //            $scope.tempDetails.ExmSubCode = $scope.generalexamTimeTableDetail.ExmSubCode;
                //            $scope.tempDetails.ExamID = $scope.generalexamTimeTableDetail.ExamID;
                //            $scope.tempDetails.CreLoginID = AppSettings.LoggedUserId;
                //            $scope.tempDetails.UpdLoginID = AppSettings.LoggedUserId;
                //            angular.copy($scope.tempDetails, temp);
                //            $scope.generalexamTimeTableDetails.push(temp);
                //            $scope.tempDetails = {};
                //            $scope.isValid = true;

                //            $scope.generalexamTimeTableDetail.examTimeTableSubjects = $scope.generalexamTimeTableDetails;
                //            examTimeTableService.putGeneralExamTimeTable($scope.generalexamTimeTableDetail).then(function (results) {
                //                if (results.IsSuccess) {
                //                    $scope.generalexamTimeTableDetail = {};
                //                    $scope.examTimeTableSubjects = [];
                //                    alert(results.Message);
                //                } else {
                //                    $scope.generalexamTimeTableDetail = {};
                //                    $scope.examTimeTableSubjects = [];
                //                    alert(results.Message);
                //                }
                //            }, function (error) {
                //                $scope.examTimeTableDetail = {};
                //                $scope.examTimeTableSubjects = [];
                //                alert(error.statusText);
                //            });

                //        }
                //        else {
                //            alert("End time should be grater than start time");
                //            $scope.isValid = false;
                //            break;
                //        }
                //    }
                //    else {
                //        alert(" Please Enter Time ");
                //        $scope.isValid = false;
                //        break;
                //    }
                //}









                //$scope.showVocationalexamTimeTableSubjects = function () {
                //    if ($scope.vocationalexamTimeTableDetail.ExamID !== undefined) {
                //        //$scope.examTimeTableDetail.ExamInstID = AppSettings.ExamInstID; // Current ExamInstID
                //        //$scope.ExamInstID = AppSettings.ExamInstID;
                //        $scope.ExamInstID = 102;
                //        examTimeTableService.getVocationalExamTimeTableSubjectByExamIDMainGrpID($scope.vocationalexamTimeTableDetail.ExamID, $scope.vocationalexamTimeTableDetail.MainGrpID, $scope.ExamInstID).then(function (results) {
                //            $scope.examTimeTableSubjects = results;
                //            for (var i = 0; i < $scope.examTimeTableSubjects.length; i++) {
                //                if ($scope.examTimeTableSubjects[i].StringStartDate != null) {
                //                    $scope.examTimeTableSubjects[i].StartDate = new Date($scope.examTimeTableSubjects[i].StartDate);
                //                }
                //            }
                //        });
                //    }
                //};

                //$scope.saveVocationalExamTimeTable = function () {
                //    if ($scope.examTimeTableForm.$valid && $scope.examTimeTableSubjectsForm.$valid) {
                //        $scope.examTimeTableSubjectDetails = [];
                //        for (var i = 0; i < $scope.examTimeTableSubjects.length; i++) {
                //            if ($scope.examTimeTableSubjectDetails.length > 0) {
                //                for (var j = 0; j < $scope.examTimeTableSubjectDetails.length; j++) {
                //                    if (window.moment(new Date($scope.examTimeTableSubjects[i].StartDate)).format("YYYY-MM-DD") != $scope.examTimeTableSubjectDetails[j].StartDate) {
                //                        $scope.isValid = true;
                //                    } else {
                //                        $scope.isValid = false;
                //                        alert("Date should not be same as previous one");
                //                        break;
                //                    }
                //                }
                //                if ($scope.isValid === false) {
                //                    break;
                //                }
                //            } else $scope.isValid = true;
                //            if ($scope.isValid) {
                //                if ($scope.examTimeTableSubjects[i].StartTime != null && $scope.examTimeTableSubjects[i].EndTime != null) {
                //                    if (Date.parse($scope.examTimeTableSubjects[i].StartTime) < Date.parse($scope.examTimeTableSubjects[i].EndTime)) {
                //                        var temp = {};
                //                        $scope.tempDetails = {};
                //                        $scope.tempDetails.StartDate = window.moment(new Date($scope.examTimeTableSubjects[i].StartDate)).format("YYYY-MM-DD");
                //                        $scope.tempDetails.EndDate = window.moment(new Date($scope.examTimeTableSubjects[i].StartDate)).format("YYYY-MM-DD");
                //                        $scope.tempDetails.StartTime = window.moment($scope.examTimeTableSubjects[i].StartTime).format('hh:mm a');
                //                        $scope.tempDetails.EndTime = window.moment($scope.examTimeTableSubjects[i].EndTime).format('hh:mm a');
                //                        ////$scope.tempDetails.evalTypID = $scope.examTimeTableSubjects[i].evalTypID;
                //                        $scope.tempDetails.evalTypID = 1;
                //                        $scope.tempDetails.ExamSession = $scope.examTimeTableSubjects[i].ExamSession;
                //                        $scope.tempDetails.ExmSubID = $scope.examTimeTableSubjects[i].ExmSubID;
                //                        $scope.tempDetails.ExmTmTbID = $scope.examTimeTableSubjects[i].ExmTmTbID;
                //                        //$scope.tempDetails.ExamInstID = AppSettings.ExamInstID; /please un comment Hard coded
                //                        $scope.tempDetails.ExamInstID = 102;
                //                        $scope.tempDetails.ExmSubCode = $scope.examTimeTableSubjects[i].ExmSubCode;
                //                        $scope.tempDetails.ExamID = $scope.examTimeTableSubjects[i].ExamID;
                //                        $scope.tempDetails.CreLoginID = AppSettings.LoggedUserId;
                //                        $scope.tempDetails.UpdLoginID = AppSettings.LoggedUserId;
                //                        angular.copy($scope.tempDetails, temp);
                //                        $scope.examTimeTableSubjectDetails.push(temp);
                //                        $scope.tempDetails = {};
                //                        $scope.isValid = true;
                //                    }
                //                    else {
                //                        alert("End time should be grater than start time");
                //                        $scope.isValid = false;
                //                        break;
                //                    }
                //                } else {
                //                    alert("Please enter time");
                //                    $scope.isValid = false;
                //                    break;
                //                }
                //            }
                //        }
                //        if ($scope.examTimeTableSubjectDetails.length > 0 && $scope.isValid) {
                //            $scope.vocationalexamTimeTableDetail.examTimeTableSubjects = $scope.examTimeTableSubjectDetails;
                //            examTimeTableService.putVocationalExamTimeTable($scope.vocationalexamTimeTableDetail).then(function (results) {
                //                if (results.IsSuccess) {
                //                    $scope.examTimeTableDetail = {};
                //                    $scope.examTimeTableSubjects = [];
                //                    alert(results.Message);
                //                } else {
                //                    $scope.examTimeTableDetail = {};
                //                    $scope.examTimeTableSubjects = [];
                //                    alert(results.Message);
                //                }
                //            }, function (error) {
                //                $scope.examTimeTableDetail = {};
                //                $scope.examTimeTableSubjects = [];
                //                alert(error.statusText);
                //            });
                //        }
                //    }
                //};
            });
}());