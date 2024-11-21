define(['app'], function (app) {
    app.controller("HallTicketNoGenerationController", function ($scope, $state, $stateParams, AppSettings, PreZoneCenterService, BasicDistrictsService, BasicExamService, BasicCourseService) {
        $scope.HallTicketNoGeneration = {};
        $scope.HallTicketNoGeneration.ExamInstID = AppSettings.ExamInstID;
        var PageNm = $state.current.name.split(".")[1] + "List";
        var HallTicketNoGenerationRightsdata = [];
        HallTicketNoGenerationRightsdata = AppSettings.UserRights;
        for (var i = 0; i < HallTicketNoGenerationRightsdata.length; i++) {
            if (HallTicketNoGenerationRightsdata[i].GridFormToOpen == PageNm) {
                if ($scope.HallTicketNoGeneration.OtherCenterID == 0) {
                    if (HallTicketNoGenerationRightsdata[i].isaddable == 'Y') {
                        $scope.isupdatableDisable = false;
                    } else {
                        $scope.isupdatableDisable = true;
                    }
                    $scope.isdeletableDisable = true;
                } else {
                    if (HallTicketNoGenerationRightsdata[i].isupdatable == 'Y') {
                        $scope.isupdatableDisable = false;
                    }
                    else {
                        $scope.isupdatableDisable = true;
                    }
                    if (HallTicketNoGenerationRightsdata[i].isdeletable == 'Y') {
                        $scope.isdeletableDisable = false;
                    } else {
                        $scope.isdeletableDisable = true;
                    }
                }
            }
        }
        $scope.isupdatableDisable = false;
        var BasicDistrictList = BasicDistrictsService.GetBasicDistrictListByDistrictIds(AppSettings.DistrictIDs);
        BasicDistrictList.then(function (DistrictData, status, headers, config, error) {
            $scope.BasicDistrictList = DistrictData;
        }, function (Castdata, status, headers, config) {
            alert(error);
        });
        var BasicCourseList = BasicCourseService.GetBasicCourseList();
        BasicCourseList.then(function (CourseData, status, headers, config, error) {
            $scope.BasicCourseList = CourseData;
        }, function (ExamData, status, headers, config) {
            alert(error);
        })
        $scope.GetExamList = function (CourseID) {
            if (CourseID != "" || CourseID != undefined) {
                var BasicExamList = BasicExamService.GetExamListByCourseID(CourseID);
                BasicExamList.then(function (ExamData, status, headers, config, error) {
                    $scope.BasicExamList = ExamData;
                }, function (ExamData, status, headers, config) {
                    alert(error);
                })
            }
        }
        $scope.HallTicketNoGenerationProcess = function () {
            $scope.isupdatableDisable = true;
            if (CheckValidation() == true) {
                $scope.HallTicketNoGeneration.ExamID = $scope.HallTicketNoGeneration.ExamID;
                $scope.HallTicketNoGeneration.DistrictID = $scope.HallTicketNoGeneration.DistrictID;
                $scope.HallTicketNoGeneration.ExamInstID = AppSettings.ExamInstID;
                $scope.HallTicketNoGeneration.UpdLoginID = AppSettings.LoggedUserId;
                var getPromise = PreZoneCenterService.HallTicketNoGenerationProcess($scope.HallTicketNoGeneration);
                getPromise.then(function (msg) {
                    alert("Process Done successfully!!");
                    RedirectToListPage();
                }, function (error) {
                    $scope.isupdatableDisable = false;
                    alert(error);
                });
            } else {
                $scope.isupdatableDisable = false;
            }
        }
        function CheckValidation() {
            if (($scope.HallTicketNoGeneration.DistrictID == undefined) || ($scope.HallTicketNoGeneration.DistrictID == "")) {
                alert("Select District");
                return false;
            }
            if (($scope.HallTicketNoGeneration.CourseID == undefined) || ($scope.HallTicketNoGeneration.CourseID == "")) {
                alert("Select Stream");
                return false;
            }
            if (($scope.HallTicketNoGeneration.ExamID == undefined) || ($scope.HallTicketNoGeneration.ExamID == "")) {
                alert("Select Year");
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
            $state.go('CenterManagemnet');
        }
    });
});
