define(['app'], function (app) {
    app.controller("UpdateExaminerController", function ($scope, $state, $stateParams, AppSettings, preExaminerAppointmentsService, preExaminerAppointmentReportService) {
        $scope.UpdateExaminer = {};
        $scope.UpdateExaminer.ExamInstID = AppSettings.ExamInstID;
        var PageNm = $state.current.name.split(".")[1] + "List";
        var UpdateExaminerRightsdata = [];
        UpdateExaminerRightsdata = AppSettings.UserRights;
        for (var i = 0; i < UpdateExaminerRightsdata.length; i++) {
            if (UpdateExaminerRightsdata[i].GridFormToOpen == PageNm) {
                if ($scope.UpdateExaminer.CampusID == 0) {
                    if (UpdateExaminerRightsdata[i].isaddable == 'Y') {
                        $scope.isupdatableDisable = false;
                    } else {
                        $scope.isupdatableDisable = true;
                    }
                    $scope.isdeletableDisable = true;
                } else {
                    if (UpdateExaminerRightsdata[i].isupdatable == 'Y') {
                        $scope.isupdatableDisable = false;
                    }
                    else {
                        $scope.isupdatableDisable = true;
                    }
                    if (UpdateExaminerRightsdata[i].isdeletable == 'Y') {
                        $scope.isdeletableDisable = false;
                    } else {
                        $scope.isdeletableDisable = true;
                    }
                }
            }
        }
        $scope.isupdatableDisable = false;
        $scope.GetExaminerAppoinmentDetails = function (event) {
            if (event.which == 13) {
                if ($scope.UpdateExaminer.ExaminerID == undefined || $scope.UpdateExaminer.ExaminerID == "") {
                    $scope.UpdateExaminer.ExaminerID = 0;
                }
                preExaminerAppointmentsService.getBasicExaminerTypes().then(function (data) {
                    $scope.BasicExaminerTypesList = data;
                    if ($scope.UpdateExaminer.ExaminerID > 0) {
                        preExaminerAppointmentsService.getExaminerAppoinmentDetails($scope.UpdateExaminer.ExaminerID, AppSettings.ExamInstID).then(function (results) {
                            $scope.UpdateExaminer = results[0];
                            $("#RegFromDate").val($scope.UpdateExaminer.FromDate);
                            $("#RegToDate").val($scope.UpdateExaminer.ToDate);
                        });
                    }
                });
            }
        }
        $scope.UpdateExaminerAppoinments = function () {
            preExaminerAppointmentsService.UpdateExaminerAppoinments($scope.UpdateExaminer).then(function (results) {
                if (results.IsSuccess) {
                    alert("Update successfully!!");
                    PrintAppoinmentOrder()
                    RedirectToListPage();
                }
            }, function (error) {
                $scope.UpdateExaminer = {};
                alert(error.statusText);
            });
        }
        function PrintAppoinmentOrder() {
            var AppointmentID = $scope.UpdateExaminer.AppointmentID;
            var InstanceID = AppSettings.ExamInstID; // Current ExamInstID
            preExaminerAppointmentReportService.getPreExaminerAppointmentsOrderByExaminerID(InstanceID, 0, 0, 0, AppointmentID,0).then(function (results) {
                if (results != "") {
                    $scope.UpdateExaminer = {};
                    var file = new Blob([results], { type: 'application/pdf' });
                    var fileURL = URL.createObjectURL(file);
                    var date = new Date();
                    var fileName = "ExaminerAappointmentOrderReport(" + date.getUTCDate() + '-' + date.getUTCMonth() + '-' + date.getUTCFullYear() + ").pdf";
                    var a = document.createElement("a");
                    document.body.appendChild(a);
                    a.href = fileURL;
                    a.download = fileName;
                    a.click();
                }
            }, function (error) {
                $scope.UpdateExaminer = {};
                alert(error.statusText);
            });
        };
        $scope.Exit = function () {
            RedirectToListPage();
            $scope.DistEnable = false;
        }
        function RedirectToListPage() {
            $scope.UpdateExaminer = {};
            $scope.isupdatableDisable = false;
            $state.go('PreExam');
        }
    });
});
