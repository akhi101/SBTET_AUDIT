define(['app'], function (app) {
    app.controller("PracticalExamTimeTableGenerationProceesController", function ($scope, $state, $stateParams, AppSettings, BasicCourseService, BasicEvalTypesService, examTimeTableService) {
        $scope.ExamTimeTable = {};

        $scope.ExamTimeTable.ExamInstID = AppSettings.ExamInstID;
        $scope.ExamTimeTable.UpdLoginID = AppSettings.LoggedUserId;

        var PageNm = $state.current.name.split(".")[1] + "List";
        var ExamTimeTableRightsdata = [];
        ExamTimeTableRightsdata = AppSettings.UserRights;
        for (var i = 0; i < ExamTimeTableRightsdata.length; i++) {
            if (ExamTimeTableRightsdata[i].GridFormToOpen == PageNm) {
                if ($scope.ExamTimeTable.OtherCenterID == 0) {
                    if (ExamTimeTableRightsdata[i].isaddable == 'Y') {
                        $scope.isupdatableDisable = false;
                    } else {
                        $scope.isupdatableDisable = true;
                    }
                    $scope.isdeletableDisable = true;
                } else {
                    if (ExamTimeTableRightsdata[i].isupdatable == 'Y') {
                        $scope.isupdatableDisable = false;
                    }
                    else {
                        $scope.isupdatableDisable = true;
                    }
                    if (ExamTimeTableRightsdata[i].isdeletable == 'Y') {
                        $scope.isdeletableDisable = false;
                    } else {
                        $scope.isdeletableDisable = true;
                    }
                }
            }
        }

        $("#StartDate").ejDatePicker({ allowEdit: true, dateFormat: "dd/MM/yyyy" });

        $("#StartDate").ejDatePicker({ value: new Date() });

        $scope.isupdatableDisable = false;

        var BasicCourseList = BasicCourseService.GetBasicCourseList();
        BasicCourseList.then(function (CourseData, status, headers, config, error) {
            $scope.BasicCourseList = CourseData;
        }, function (CourseData, status, headers, config) {
            alert(error);
        })

        var BasicSessionList = BasicEvalTypesService.GetBasicSessionTypes();
        BasicSessionList.then(function (BasicSessionData, status, headers, config, error) {
            $scope.BasicSessionList = BasicSessionData;
        }, function (BasicSessionData, status, headers, config) {
            alert(error);
        });


        $scope.GeneratePracticalExamTimeTable = function () {
            if ($("#StartDate").val() != "") { $scope.ExamTimeTable.StartDate = $("#StartDate").val(); }
            //if ($scope.ExamTimeTable.length > 0) {
            examTimeTableService.postProcessGeneratePracticalExamTimeTable($scope.ExamTimeTable).then(function (results) {
                if (results.IsSuccess) {
                    alert(results.Message);
                } else {
                    alert(results.Message);
                }
            }, function (error) {
                alert(error.statusText);
            });
            //}

        };


        function CheckValidation() {
            if (($scope.ExamTimeTable.CourseID == undefined) || ($scope.ExamTimeTable.CourseID == "")) {
                alert("Select Stream");
                return false;
            }
            if (($scope.ExamTimeTable.SessionTypID == undefined) || ($scope.ExamTimeTable.SessionTypID == "")) {
                alert("Select Exam Session");
                return false;
            }
            if (($scope.ExamTimeTable.EvalTypID == undefined) || ($scope.ExamTimeTable.EvalTypID == "")) {
                alert("Select Evaluation Type");
                return false;
            }
            else {
                return true;
            }
        }
        $scope.Exit = function () {
            RedirectToListPage();
        }
        function RedirectToListPage() {
            $scope.isupdatableDisable = false;
            $state.go('PreExam');
        }
    });
});
