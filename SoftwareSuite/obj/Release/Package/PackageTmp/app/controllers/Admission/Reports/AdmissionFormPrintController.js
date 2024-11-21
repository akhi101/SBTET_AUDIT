define(['app'], function (app) {
    app.controller("AdmissionFormPrintController", function ($scope, $filter, $state, $interval, $stateParams, AppSettings, RegisterAdmittedStudentService) {
        $scope.Print = function () {
            if (($scope.ToAdmNo != undefined) && ($scope.ToAdmNo != "")) {
            } else {
                if (($scope.CourseID == undefined) || ($scope.CourseID == "")) {
                    alert("Select Stream");
                    return;
                }
                if (($scope.ExamID == undefined) || ($scope.ExamID == "")) {
                    alert("Select Exam");
                    return;
                }
                if (($scope.BranchID == undefined) || ($scope.BranchID == "")) {
                    alert("Select Branch");
                    return;
                }
            }
            if ($("#FromDate").val() != "") { $scope.FromDate = $("#FromDate").val(); }
            if ($("#ToDate").val() != "") { $scope.ToDate = $("#ToDate").val(); }
            if (($scope.FromAdmNo == undefined) || ($scope.FromAdmNo == "")) {
                $scope.FromAdmNo = "";
            }
            if (($scope.ToAdmNo == undefined) || ($scope.ToAdmNo == "")) {
                $scope.ToAdmNo = "";
            }
            if ($scope.FromAdmNo > $scope.ToAdmNo) {
                alert("Enter To Enroll No must be greater than From Number");
                return;
            }
            //if (Date.parse($scope.FromDate) > Date.parse($scope.ToDate)) {
            //    alert("To Date must be greater than From Date");
            //    return;
            //}
            var getCheckDate = RegisterAdmittedStudentService.GetCheckFromTodate($scope.FromDate, $scope.ToDate);  //Fromdate,Todate
            getCheckDate.then(function (data) {
                if (data == 1) {
                    alert("To Date must be greater than From Date");
                    return;
                } else {
                    if (($scope.ToAdmNo != undefined) && ($scope.ToAdmNo != "")) {
                        var Urlstring = "api/StudentReg/GetAdmissionFormPrint/?CollegeID=" + AppSettings.CollegeID + "&CourseID=" + 0 + "&ExamID=" + 0 + "&BranchID=" + 0 + "&FromDate=" + $scope.FromDate + "&ToDate=" + $scope.ToDate + "&FromAdmNo=" + $scope.FromAdmNo + "&ToAdmNo=" + $scope.ToAdmNo + "";
                    } else {
                        var Urlstring = "api/StudentReg/GetAdmissionFormPrint/?CollegeID=" + AppSettings.CollegeID + "&CourseID=" + $scope.CourseID + "&ExamID=" + $scope.ExamID + "&BranchID=" + $scope.BranchID + "&FromDate=" + $scope.FromDate + "&ToDate=" + $scope.ToDate + "&FromAdmNo=" + 0 + "&ToAdmNo=" + 0 + "";
                    }
                    $.ajax({
                        url: AppSettings.WebApiUrl + Urlstring,
                        dataType: "json",
                        type: "GET",
                        processData: false,
                        crossDomain: true,
                        async: false,
                        timeout: 5000,
                        success: function (result) {
                            var data = [];
                            data.push(result);
                            var reportModel = $("#container").data('ejReportViewer');
                            var datasetName1 = "dsAdmissionFormPrint";
                            if (data[0].length == 0) {
                                reportModel.model.dataSources = [{ value: [], name: datasetName1 }];
                                reportModel._refreshReport();
                                alert("Data Not Found");
                                return;
                            }
                            reportModel.model.dataSources = [{ value: data[0], name: datasetName1 }];
                            reportModel._refreshReport();
                        }
                    });
                    //var Urlstring = "api/StudentReg/GetAdmissionFormPrint/?CollegeID=" + AppSettings.CollegeID + "&CourseID=" + $scope.CourseID + "&ExamID=" + $scope.ExamID + "&BranchID=" + $scope.BranchID + "&FromDate=" + $scope.FromDate + "&ToDate=" + $scope.ToDate + "&FromAdmNo=" + $scope.FromAdmNo + "&ToAdmNo=" + $scope.ToAdmNo + "";
                    //var dataset1 = "dsAdmissionFormPrint";
                    //$state.go('Admission.ReportViewerController', { ReportName: 'RptAdmissionFormReport.rdlc', url: Urlstring, ds1: dataset1 });
                }
            }, function (error) {
                alert(error);
            });
        }
        $("#FromDate").ejDatePicker({ allowEdit: true, dateFormat: "dd/MMM/yyyy" });
        $("#ToDate").ejDatePicker({ allowEdit: true, dateFormat: "dd/MMM/yyyy" });
        $("#FromDate").ejDatePicker({ value: new Date() });
        $("#ToDate").ejDatePicker({ value: new Date() });
        var CourseList = RegisterAdmittedStudentService.GetCourseListForRegStud(AppSettings.CollegeID);
        CourseList.then(function (Coursedata, status, headers, config, error) {
            $scope.CourseList = Coursedata;
        }, function (error) {
            alert(error);
        });
        $scope.FillCoursePart = function (CourseID) {
            $scope.ExamList = [];
            $scope.BranchList = [];
            if (CourseID != "") {
                var ExamList = RegisterAdmittedStudentService.GetBasicExamList(CourseID);
                ExamList.then(function (BasicExamdata, status, headers, config, error) {
                    $scope.ExamList = BasicExamdata;
                    var BranchList = RegisterAdmittedStudentService.GetBasicBranchListForRegStud(CourseID, AppSettings.CollegeID);
                    BranchList.then(function (BasicBranchdata, status, headers, config, error) {
                        $scope.BranchList = BasicBranchdata;
                    }, function (error) {
                        alert(error);
                    });
                }, function (error) {
                    alert(error);
                });
            }
        }
        $scope.Exit = function () {
            RedirectToListPage();
        }
        function RedirectToListPage() {
            $state.go('Admission');
        }
        $("#container").ejReportViewer(
            {
                isResponsive: true,
                reportServiceUrl: AppSettings.WebApiUrl + "api/Report",
                processingMode: ej.ReportViewer.ProcessingMode.Local,
                reportPath: "RptAdmissionFormReport.rdlc", 
                dataSources: [{ value: [], name: "dsAdmissionFormPrint" }],
                toolbarSettings: { items: ej.ReportViewer.ToolbarItems.All & ~ej.ReportViewer.ToolbarItems.Parameters },
                reportError: function (args) {
                    if (args.dataSources != undefined) {
                        alert("Error...Some error occured in processing report");
                    }
                }
            });
    });
});