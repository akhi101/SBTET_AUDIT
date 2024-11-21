define(['app'], function (app) {
    app.controller("CenterWiseDayWiseStudentRollNosListController", function ($scope, $filter, $state, $interval, $stateParams, AppSettings, BasicCourseService, BasicExamService, BasicDistrictsService, BasicCollegeService, centerwiseSeatingArrangementService) {

        $("#LoadImg").attr("src", AppSettings.LoadingImage);
        $scope.LoadImg = false;

        var BasicDistrictList = BasicDistrictsService.GetBasicDistrictList();
        BasicDistrictList.then(function (Districtdata, status, headers, config, error) {
            $scope.BasicDistrictList = Districtdata;
        }, function (error) {
            alert(error);
        });

        var BasicCourseList = BasicCourseService.GetBasicCourseList();
        BasicCourseList.then(function (Coursedata, status, headers, config, error) {
            $scope.BasicCourseList = Coursedata;
        }, function (error) {
            alert(error);
        });

        $scope.GetExamList = function (CourseID) {
            if (CourseID != "" || CourseID != undefined) {
                var BasicExamList = BasicExamService.GetExamListByCourseID(CourseID);
                BasicExamList.then(function (Examdata, status, headers, config, error) {
                    $scope.BasicExamList = Examdata;
                }, function (error) {
                    alert(error);
                });
            }
        }

        $scope.FillTheoryExamCenter = function (DistrictID) {
            if (DistrictID != "" || DistrictID != undefined) {
                var CentersList = BasicCollegeService.GetTheroyExamCenterCollegeList(DistrictID, AppSettings.ExamInstID);
                CentersList.then(function (Examdata, status, headers, config, error) {
                    $scope.CentersList = Examdata;
                }, function (error) {
                    alert(error);
                });
            }
        }

        $scope.GetCenterWiseDayWiseStudentRollNos = function () {
            $scope.LoadImg = true;
            // if ($scope.CenterwiseSeatingArrangement.ExamID) {
            $scope.CenterwiseSeatingArrangement.ExamInstID = AppSettings.ExamInstID; // Current ExamInstID
            centerwiseSeatingArrangementService.GetCenterwiseDayWiseStudentRollNos($scope.CenterwiseSeatingArrangement).then(function (results) {
                if (results != "") {
                    $scope.CenterwiseSeatingArrangement = {};
                    var file = new Blob([results], { type: 'application/pdf' });
                    var fileURL = URL.createObjectURL(file);
                    var date = new Date();
                    var fileName = "CenterWiseDayRollNoListReport(" + date.getUTCDate() + '-' + date.getUTCMonth() + '-' + date.getUTCFullYear() + ").pdf";
                    var a = document.createElement("a");
                    document.body.appendChild(a);
                    a.href = fileURL;
                    a.download = fileName;
                    a.click();
                    $scope.LoadImg = false;
                } //if (results.isSuccess == false) $scope.subjectwiseCenterSummary = {}; alert(results.message);
            }, function (error) {
                $scope.CenterwiseSeatingArrangement = {};
                alert(error.statusText);
                $scope.LoadImg = false;
            });
            // }
        };


        function CheckValidation() {
            return true;
        }

        $scope.Exit = function () {
            RedirectToListPage();
        }
        function RedirectToListPage() {
            $state.go('PreExam');
        }

    });
});