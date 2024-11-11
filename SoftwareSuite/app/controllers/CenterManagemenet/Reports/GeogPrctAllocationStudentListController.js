define(['app'], function (app) {
    app.controller("GeogPrctAllocationStudentListController", function ($scope, $state, $stateParams, AppSettings, BasicDistrictsService, BasicExamService, BasicCourseService, BasicCollegeService, PrePractCenterService, PreVocationalCenterService, BasicMainGroupService, BasicExamSubjectService, practicalEntryService) {
        $scope.PracticalCenterAllocationStudentList = { MarkEntrSchID: $stateParams.MarkEntrSchID };
        var PageNm = $state.current.name.split(".")[1] + "List";
        var PracticalCenterAllocationStudentListRightsdata = [];

        PracticalCenterAllocationStudentListRightsdata = AppSettings.UserRights;
        for (var i = 0; i < PracticalCenterAllocationStudentListRightsdata.length; i++) {
            if (PracticalCenterAllocationStudentListRightsdata[i].GridFormToOpen == PageNm) {
                if ($scope.PracticalCenterAllocationStudentList.MarkEntrSchID == 0) {
                    if (PracticalCenterAllocationStudentListRightsdata[i].isaddable == 'Y') {
                        $scope.isupdatableDisable = false;
                    } else {
                        $scope.isupdatableDisable = true;
                    }
                    $scope.isdeletableDisable = true;
                } else {
                    if (PracticalCenterAllocationStudentListRightsdata[i].isupdatable == 'Y') {
                        $scope.isupdatableDisable = false;
                    }
                    else {
                        $scope.isupdatableDisable = true;
                    }
                    if (PracticalCenterAllocationStudentListRightsdata[i].isdeletable == 'Y') {
                        $scope.isdeletableDisable = false;
                    } else {
                        $scope.isdeletableDisable = true;
                    }
                }
            }
        }

        var BasicDistrictList = BasicDistrictsService.GetBasicDistrictList();
        BasicDistrictList.then(function (Districtdata, status, headers, config, error) {
            $scope.BasicDistrictList = Districtdata;
        }, function (error) {
            alert(error);
        });

        var BasicCourseList = BasicCourseService.GetBasicCourseList();
        BasicCourseList.then(function (CourseData, status, headers, config, error) {
            $scope.BasicCourseList = CourseData;
            $scope.PracticalCenterAllocationStudentList.CourseID = "1";
            $scope.GetExamList($scope.PracticalCenterAllocationStudentList.CourseID);
        }, function (CourseData, status, headers, config) {
            alert(error);
        })

        $scope.GetExamList = function (CourseID) {
            FillExamList(CourseID);
        }

        function FillExamList(CourseID) {
            if (CourseID != "" || CourseID != undefined) {
                var BasicExamList = BasicExamService.GetExamListByCourseID(CourseID);
                BasicExamList.then(function (ExamData, status, headers, config, error) {
                    $scope.BasicExamList = ExamData;
                    $scope.PracticalCenterAllocationStudentList.ExamID = "2";
                }, function (ExamData, status, headers, config) {
                    alert(error);
                })
            }
        }

        $scope.FillCenterListByZoneType = function (DistrictID) {
            if (DistrictID != "" || DistrictID != undefined) {
                var PraCenterList = PrePractCenterService.GetPracticalCenterListByDistrictIDANDZoneType(AppSettings.ExamInstID, 2, DistrictID);
                PraCenterList.then(function (PraCenterData, status, headers, config, error) {
                    $scope.PraCenterList = PraCenterData;
                }, function (PraCenterData, status, headers, config) {
                    alert(error);
                })
            }
        }


        $scope.GetPracticalExamStudentListReportbyCenter = function () {
            $scope.PracticalCenterAllocationStudentList.CourseID = $scope.PracticalCenterAllocationStudentList.CourseID;
            $scope.PracticalCenterAllocationStudentList.ExamID = $scope.PracticalCenterAllocationStudentList.ExamID;
            $scope.PracticalCenterAllocationStudentList.DistrictID = $scope.PracticalCenterAllocationStudentList.DistrictID;
            $scope.PracticalCenterAllocationStudentList.PrePractCntrID = $scope.PracticalCenterAllocationStudentList.PrePractCntrID;

            if ($scope.PracticalCenterAllocationStudentList.PrePractCntrID == undefined || $scope.PracticalCenterAllocationStudentList.PrePractCntrID == "") {
                $scope.PracticalCenterAllocationStudentList.PrePractCntrID = 0;
            }
            if (CheckValidation() == true) {
                var Urlstring = "api/PrePractCenter/GetGeographyGeneralPracticalBatchStudentList/?ExamInstID=" + AppSettings.ExamInstID + "&PrePractCntrID=" + $scope.PracticalCenterAllocationStudentList.PrePractCntrID + "&ExamID=" + $scope.PracticalCenterAllocationStudentList.ExamID + "&DistrictID=" + $scope.PracticalCenterAllocationStudentList.DistrictID;
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
                        var datasetName1 = "dsPracticalBatchStudentListCenterWise";
                        if (data[0].length == 0) {
                            reportModel.model.dataSources = [{ value: [], name: datasetName1 }];
                            reportModel._refreshReport();
                            alert("Data Not Found");
                            return;
                        }
                        //data[0][0].CollegeName = CollegeName;
                        reportModel.model.dataSources = [{ value: data[0], name: datasetName1 }];
                        reportModel._refreshReport();
                    }
                });
            }
        }





        function CheckValidation() {
            if (($scope.PracticalCenterAllocationStudentList.CourseID == undefined) || ($scope.PracticalCenterAllocationStudentList.CourseID == "")) {
                alert("Please Select Course");
                return false;
            }
            if (($scope.PracticalCenterAllocationStudentList.ExamID == undefined) || ($scope.PracticalCenterAllocationStudentList.ExamID == "")) {
                alert("Please Select Exam");
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
            $state.go('CenterManagemnet');
        }

        $("#reportviewer").ejReportViewer(
            {
                isResponsive: true,
                reportServiceUrl: AppSettings.WebApiUrl + "api/Report",
                processingMode: ej.ReportViewer.ProcessingMode.Local,
                reportPath: "RptGenGeogPracticalAllocStudList.rdlc",
                dataSources: [{ value: [], name: "dsPracticalBatchStudentListCenterWise" }],
                toolbarSettings: { items: ej.ReportViewer.ToolbarItems.All & ~ej.ReportViewer.ToolbarItems.Parameters },
                reportError: function (args) {
                    if (args.dataSources != undefined) {
                        alert("Error...Some error occured in processing report");
                    }
                }
            });
    });
});
