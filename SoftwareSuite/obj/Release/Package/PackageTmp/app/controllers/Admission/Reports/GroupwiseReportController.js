define(['app'], function (app) {
    app.controller("GroupwiseReportController", function ($scope, $filter, $http,$state, $interval, $stateParams, AppSettings, RegisterAdmittedStudentService, GovtColEnrollService) {
        $scope.reportdata = [];
        $scope.Print = function () {
            if (($scope.CourseID == undefined) || ($scope.CourseID == "")) {
                alert("Select Stream");
                return;
            }
            if (($scope.ExamID == undefined) || ($scope.ExamID == "")) {
                alert("Select Exam");
                return;
            }
            if (($scope.DistrictID == undefined) || ($scope.DistrictID == "")) {
                $scope.DistrictID = 0;
            }
            if (($scope.BranchID == undefined) || ($scope.BranchID == "")) {
                $scope.BranchID = 0;
            }
            if (($scope.CollegeID == undefined) || ($scope.CollegeID == "")) {
                $scope.CollegeID = 0;
            }
            if (($scope.MainGrpID == undefined) || ($scope.MainGrpID == "")) {
                $scope.MainGrpID = 0;
            }
            if (($scope.SecondLangID == undefined) || ($scope.SecondLangID == "")) {
                $scope.SecondLangID = 0;
            }
            //var tabledataist = RegisterAdmittedStudentService.GetGroupwiseReport(AppSettings.AcdYrID, $scope.CourseID, $scope.ExamID, $scope.BranchID, $scope.DistrictID, $scope.CollegeID, $scope.MainGrpID, $scope.SecondLangID);
            //tabledataist.then(function (tabledata, status, headers, config, error) {
            //    $scope.tabledata = tabledata;
            //}, function (error) {
            //    alert(error);
            //    });

            var Urlstring = "api/StudentReg/GetGroupwiseReport/?AcdYrID=" + AppSettings.AcdYrID + "&CourseID=" + $scope.CourseID + "&ExamID=" + $scope.ExamID + "&BranchID=" + $scope.BranchID + "&DistrictID=" + $scope.DistrictID + "&CollegeID=" + $scope.CollegeID + "&MainGrpID=" + $scope.MainGrpID + "&SecondLangID=" + $scope.SecondLangID + "";
            $http.get(AppSettings.WebApiUrl + Urlstring, { responseType: 'arraybuffer' })
                .then(function (data) {
                   // var file = new Blob([data.data], { type: 'application/pdf' });
                    //var fileURL = URL.createObjectURL(file);
                    //window.open(fileURL);
                    //var fileURL = window.URL.createObjectURL(file);
                    //var fileName = "test.pdf";
                    //var a = document.createElement("a");
                    //document.body.appendChild(a);
                    //a.style = "display: none";
                    //a.href = fileURL;
                    //a.download = fileName;
                    //a.click();
                    //saveAs(file, filename);
                    var blob = new Blob([data.data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
                    var fileURL = window.URL.createObjectURL(blob);
                    var fileName = "GroupwiseReport.xlsx";
                    var a = document.createElement("a");
                    document.body.appendChild(a);
                    a.style = "display: none";
                    a.href = fileURL;
                    a.download = fileName;
                    a.click();
                    saveAs(file, filename);
                });
        }

        var DistrictList = GovtColEnrollService.GetDistrictListByStateID(1);
        DistrictList.then(function (Districtdata, status, headers, config, error) {
            $scope.DistrictList = Districtdata;
        }, function (error) {
            alert(error);
        });

        $scope.AllMondal = "";
        $scope.AllLang = "";
        $scope.AllCollege = "";
        $scope.AllGroup = "";
        $scope.MandalDisable = true;
        $scope.FillMandal = function (DistrictID) {
            if ((DistrictID > 0) || (DistrictID != undefined)) {
                $scope.AllMondal = "All";
                $scope.MandalDisable = false;
                $scope.CollegeDisable = false;
                $scope.CourseID = "";
                $scope.ExamID = "";
                $scope.BranchID = "";
                $scope.MainGrpID = "";
                $scope.SecondLangID = "";
                $scope.CollegeList = [];
                var MandalList = GovtColEnrollService.GetMandalListByDistrict(DistrictID);
                MandalList.then(function (MandalListdata, status, headers, config, error) {
                    $scope.MandalList = MandalListdata;
                }, function (error) {
                    alert(error);
                });
            }
        }

        var CourseList = RegisterAdmittedStudentService.GetCourseListForRegStud(AppSettings.CollegeID);
        CourseList.then(function (BasicCoursedata, status, headers, config, error) {
            $scope.CourseList = BasicCoursedata;
        }, function (error) {
            alert(error);
        });
        $scope.FillCoursePart = function (CourseID) {
            if (($scope.DistrictID == undefined) || ($scope.DistrictID == "")) {
                alert("Select District");
                return;
            }
            $scope.ExamID = "";
            $scope.BranchID = "";
            $scope.MainGrpID = "";
            $scope.SecondLangID = "";
            $scope.BranchName = "";
            $scope.CollegeID = "";

            $scope.CollegeList = [];
            $scope.MainGroupList = [];

            $scope.AllLang = "All";
            $scope.AllCollege = "All";
            $scope.AllGroup = "All";

            $scope.MainGrpDisable = false;
            $scope.CollegeDisable = true;
            var ExamList = RegisterAdmittedStudentService.GetBasicExamList(CourseID);
            ExamList.then(function (BasicExamdata, status, headers, config, error) {
                $scope.ExamList = BasicExamdata;
                for (var i = 0; i < BasicExamdata.length; i++) {
                    if (BasicExamdata[i].SequenceNo == 1) {
                        $scope.ExamID = BasicExamdata[0].ExamID;
                    }
                }
                var MainGroupList = GovtColEnrollService.GetMainGroupListByCourseID(CourseID);
                MainGroupList.then(function (MainGroupListdata, status, headers, config, error) {
                    $scope.MainGroupList = MainGroupListdata;
                }, function (error) {
                    alert(error);
                });
            }, function (error) {
                alert(error);
            });
        }
        $scope.FillBranchByGroup = function (MainGrpID) {
            if ((MainGrpID != null) || (MainGrpID != "")) {
                $scope.SecondLangList = [];
                $scope.CollegeDisable = false;
                $scope.BranchDisable = false;
                $scope.MainGrpID = MainGrpID;
                var BranchList = GovtColEnrollService.GetBasicBranchListByGroup(MainGrpID);
                BranchList.then(function (BasicBranchdata, status, headers, config, error) {
                    $scope.BranchList = BasicBranchdata;
                    $scope.BranchID = BasicBranchdata[0].BranchID;
                    $scope.BranchName = BasicBranchdata[0].BranchName;
                    if (($scope.MandalID == undefined) || ($scope.MandalID == "")) {
                        $scope.AllMondal = "All";
                        $scope.MandalID = "";
                    }
                    $scope.CollegeList = [];
                    var CollegeList = GovtColEnrollService.GetCollegesForGovtEnroll($scope.DistrictID, $scope.MandalID, BasicBranchdata[0].BranchID, $scope.MainGrpID);
                    CollegeList.then(function (CollegeListdata, status, headers, config, error) {
                        if (CollegeListdata.length == 0) {
                            $scope.CollegeList = [];
                            alert("There is no authorised college for this group");
                            return;
                        } else {
                            $scope.CollegeList = CollegeListdata;
                            $scope.CollegeID = "";
                        }
                    }, function (error) {
                        alert(error);
                    });
                }, function (error) {
                    alert(error);
                });
            }
        }
        $scope.FillCollData = function (CollegeID) {
            $scope.SecondLangList = [];
            if ((CollegeID != null) || (CollegeID != "")) {
                var CollegeDataApi = GovtColEnrollService.GetCollegeDataForOpenAdmission(CollegeID);
                CollegeDataApi.then(function (Colldata, status, headers, config, error) {
                    $scope.CollegeDataFromAPI = Colldata;
                    if (Colldata.length == 0) {
                        alert("select another college,this is not in list");
                        $scope.CollegeID = "";
                        if ($scope.CollegeList.length == 1) {
                            $scope.CollegeList = [];
                        }
                        return;
                    } else {
                        $scope.SecondLangDisable = false;
                        var SecondLangList = GovtColEnrollService.GetBasicSubjectListForSecondLangaugeInRegStud(CollegeID, $scope.BranchID, $scope.CourseID);
                        SecondLangList.then(function (SecondLangdata, status, headers, config, error) {
                            $scope.SecondLangList = SecondLangdata;
                        }, function (error) {
                            alert(error);
                        });
                    }
                }, function (error) {
                    alert(error);
                });
            }
        }

        $scope.Exit = function () {
            RedirectToListPage();
        }
        function RedirectToListPage() {
            $state.go('BoardReportList');
        }
        $("#reportviewer").ejReportViewer(
            {
                isResponsive: true,
                reportServiceUrl: AppSettings.WebApiUrl + "api/Report",
                processingMode: ej.ReportViewer.ProcessingMode.Local,
                reportPath: "RptGroupwiseReport.rdlc",
                dataSources: [{ value: [], name: "dsGroupwiseReport" }],
                toolbarSettings: { items: ej.ReportViewer.ToolbarItems.All & ~ej.ReportViewer.ToolbarItems.Parameters },
                reportError: function (args) {
                    if (args.dataSources != undefined) {
                        alert("Error...Some error occured in processing report");
                    }
                }
            });
    });
});