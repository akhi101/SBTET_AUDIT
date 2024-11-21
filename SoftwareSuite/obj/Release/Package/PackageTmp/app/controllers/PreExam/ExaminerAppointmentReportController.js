define(['app'], function (app) {
    app.controller("ExaminerAppointmentReportController", function ($scope, $state, $stateParams, AppSettings, BasicDistrictsService, BasicExamService, BasicCourseService, PreCampusService, preExaminerAppointmentsService) {
        $scope.ExaminerAppointment = {};
        $("#LoadImg").attr("src", AppSettings.LoadingImage);
        $scope.LoadImg = false;
        $scope.ExaminerAppointment.ExamInstID = AppSettings.ExamInstID;
        var PageNm = $state.current.name.split(".")[1] + "List";
        var ExaminerAppointmentRightsdata = [];
        ExaminerAppointmentRightsdata = AppSettings.UserRights;
        for (var i = 0; i < ExaminerAppointmentRightsdata.length; i++) {
            if (ExaminerAppointmentRightsdata[i].GridFormToOpen == PageNm) {
                if ($scope.ExaminerAppointment.OtherCenterID == 0) {
                    if (ExaminerAppointmentRightsdata[i].isaddable == 'Y') {
                        $scope.isupdatableDisable = false;
                    } else {
                        $scope.isupdatableDisable = true;
                    }
                    $scope.isdeletableDisable = true;
                } else {
                    if (ExaminerAppointmentRightsdata[i].isupdatable == 'Y') {
                        $scope.isupdatableDisable = false;
                    }
                    else {
                        $scope.isupdatableDisable = true;
                    }
                    if (ExaminerAppointmentRightsdata[i].isdeletable == 'Y') {
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

        $scope.GetCampusListByDistrictID = function (DistrictID) {
            if (DistrictID != "" || DistrictID != undefined) {
                var PreCampusList = PreCampusService.GetCampusListByDistrictID(DistrictID);
                PreCampusList.then(function (PreCampusData, status, headers, config, error) {
                    $scope.PreCampusList = PreCampusData;
                }, function (PreCampusData, status, headers, config) {
                    alert(error);
                })
            }
        }

        $scope.GetExaminerAppointmentReport = function () {
            if (CheckValidation() == true) {
            $scope.LoadImg = true;
            var DistrictID = $scope.ExaminerAppointment.DistrictID;
            var CourseID = $scope.ExaminerAppointment.CourseID;
            var ReportType = $scope.ExaminerAppointment.ReportType;
            var ExamInstID = AppSettings.ExamInstID; // Current ExamInstID;

            preExaminerAppointmentsService.GetApoitmentUnApointment(ExamInstID, DistrictID, CourseID, ReportType).then(function (results) {
                        if (results != "") {
                            $scope.DFormReportDetail = {};
                            var file = new Blob([results], { type: 'application/txt' });
                            var fileURL = URL.createObjectURL(file);
                            var date = new Date();
                            var fileName = "ExaminerAppointment(" + date.getUTCDate() + '-' + date.getUTCMonth() + '-' + date.getUTCFullYear() + ").txt";
                            var a = document.createElement("a");
                            document.body.appendChild(a);
                            a.href = fileURL;
                            a.download = fileName;
                            a.click();
                            $scope.LoadImg = false;
                        } //if (results.isSuccess == false) $scope.subjectwiseCenterSummary = {}; alert(results.message);
                    }, function (error) {
                        $scope.DFormReportDetail = {};
                        alert(error.statusText);
                        $scope.LoadImg = false;
                    });
            }
           
        }
        function CheckValidation() {
            if (($scope.ExaminerAppointment.DistrictID == undefined) || ($scope.ExaminerAppointment.DistrictID == "")) {
                alert("Select District");
                return false;
            }
            if (($scope.ExaminerAppointment.CourseID == undefined) || ($scope.ExaminerAppointment.CourseID == "")) {
                alert("Select Stream");
                return false;
            }
            if (($scope.ExaminerAppointment.ExamID == undefined) || ($scope.ExaminerAppointment.ExamID == "")) {
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
            $state.go('PreExam');
        }
    });
});
