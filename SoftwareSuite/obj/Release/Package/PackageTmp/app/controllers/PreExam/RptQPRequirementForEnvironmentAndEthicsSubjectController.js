define(['app'], function (app) {
    app.controller("RptQPRequirementForEnvironmentAndEthicsSubjectController", function ($scope, $state, $filter, $stateParams, AppSettings, PrePractCenterService, BasicDistrictsService, BasicExamService, BasicCourseService) {
        $scope.RptQPRequirementForEnvironmentAndEthicsSubject = {};
        var PageNm = $state.current.name.split(".")[1] + "List";
        varRptQPRequirementForEnvironmentAndEthicsSubjectRightsdata = [];
        RptQPRequirementForEnvironmentAndEthicsSubjectRightsdata = AppSettings.UserRights;
        for (var i = 0; i < RptQPRequirementForEnvironmentAndEthicsSubjectRightsdata.length; i++) {
            if (RptQPRequirementForEnvironmentAndEthicsSubjectRightsdata[i].GridFormToOpen == PageNm) {
                if ($scope.RptQPRequirementForEnvironmentAndEthicsSubject.PreZoneCntrID == 0) {
                    if (RptQPRequirementForEnvironmentAndEthicsSubjectRightsdata[i].isaddable == 'Y') {
                        $scope.isupdatableDisable = false;
                    } else {
                        $scope.isupdatableDisable = true;
                    }
                    $scope.isdeletableDisable = true;
                } else {
                    if (RptQPRequirementForEnvironmentAndEthicsSubjectRightsdata[i].isupdatable == 'Y') {
                        $scope.isupdatableDisable = false;
                    }
                    else {
                        $scope.isupdatableDisable = true;
                    }
                    if (RptQPRequirementForEnvironmentAndEthicsSubjectRightsdata[i].isdeletable == 'Y') {
                        $scope.isdeletableDisable = false;
                    } else {
                        $scope.isdeletableDisable = true;
                    }
                }
            }
        }
        var BasicDistrictList = BasicDistrictsService.GetBasicDistrictListByCode();
        BasicDistrictList.then(function (DistrictData, status, headers, config, error) {
            $scope.BasicDistrictList = DistrictData;
        }, function (DistrictData, status, headers, config) {
            alert(error);
        });
        $scope.GetPreZoneCenterName = function (DistrictID) {
            if (DistrictID != "" || DistrictID != undefined) {
                var PrePractCenterList = PrePractCenterService.GetPrePractCenterByDistrictId(DistrictID, AppSettings.ExamInstID);
                PrePractCenterList.then(function (PrePractCenterData, status, headers, config, error) {
                    $scope.PrePractCenterList = PrePractCenterData;
                }, function (PrePractCenterData, status, headers, config) {
                    alert(error);
                })
            }
        }
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
        $scope.GetBasicExamSubjectList = function (ExamID) {
            if (ExamID != "" || ExamID != undefined) {
                var BasicExamSubjectList = BasicExamSubjectService.GetBasicExamSubjectListByExamID(ExamID, 1);
                BasicExamSubjectList.then(function (BasicExamSubjectData, status, headers, config, error) {
                    $scope.BasicExamSubjectList = BasicExamSubjectData;
                }, function (BasicExamSubjectData, status, headers, config) {
                    alert(error);
                })
            }
        }
        $scope.PrintData = function () {
            if (CheckValidation() == true) {
                var Urlstring = "api/PreExaminerAppointments/GetQPRequirementForEnvironmentAndEthicsSubject/?ExamInstID=" + AppSettings.ExamInstID + "&ExamID=" + $scope.RptQPRequirementForEnvironmentAndEthicsSubject.ExamID + "&DistrictID=" + $scope.RptQPRequirementForEnvironmentAndEthicsSubject.DistrictID + "&PrePractCntrID=" + $scope.RptQPRequirementForEnvironmentAndEthicsSubject.PrePractCntrID;
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
                        var reportModel = $("#reportviewer").data('ejReportViewer');
                        var datasetName1 = "DsQPRequirements";
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
            }
        }
        function CheckValidation() {
            if (($scope.RptQPRequirementForEnvironmentAndEthicsSubject.DistrictID == undefined) || ($scope.RptQPRequirementForEnvironmentAndEthicsSubject.DistrictID == "")) {
                alert("Select District");
                return false;
            }
            if (($scope.RptQPRequirementForEnvironmentAndEthicsSubject.PrePractCntrID == undefined) || ($scope.RptQPRequirementForEnvironmentAndEthicsSubject.PrePractCntrID == "")) {
                alert("Select Center");
                return false;
            }
            if (($scope.RptQPRequirementForEnvironmentAndEthicsSubject.CourseID == undefined) || ($scope.RptQPRequirementForEnvironmentAndEthicsSubject.CourseID == "")) {
                alert("Select Stream");
                return false;
            }
            if (($scope.RptQPRequirementForEnvironmentAndEthicsSubject.ExamID == undefined) || ($scope.RptQPRequirementForEnvironmentAndEthicsSubject.ExamID == "")) {
                alert("Select Year");
                return false;
            }
            else {
                return true;
            }
        }
        //varRptQPRequirementForEnvironmentAndEthicsSubject = [];
        $scope.Exit = function () {
            RedirectToListPage();
        }
        function RedirectToListPage() {
            $state.go('CenterManagemnet');
        }
        $("#reportviewer").ejReportViewer(
            {
                isResponsive: true,
                reportServiceUrl: AppSettings.WebApiUrl + "api/Report",
                processingMode: ej.ReportViewer.ProcessingMode.Local,
                reportPath: 'RptQPRequirementForEnvironmentAndEthicsSubjectCollegeWise.rdlc',
                dataSources: [{ value: [], name: "DsQPRequirements" }],
                toolbarSettings: { items: ej.ReportViewer.ToolbarItems.All & ~ej.ReportViewer.ToolbarItems.Parameters },
                reportError: function (args) {
                    if (args.dataSources != undefined) {
                        alert("Error...Some error occured in processing report");
                    }
                }
            });
    });
});
