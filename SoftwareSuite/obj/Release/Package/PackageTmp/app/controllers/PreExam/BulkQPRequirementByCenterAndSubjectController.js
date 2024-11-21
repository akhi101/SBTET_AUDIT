define(['app'], function (app) {
    app.controller("BulkQPRequirementByCenterAndSubjectController", function ($scope, $filter, $state, $interval, $stateParams, AppSettings, preExaminerAppointmentsService, BasicDistrictsService, BasicCourseService, BasicExamService, BasicCollegeService) {
        //$("#LoadImg").attr("src", AppSettings.LoadingImage);
        //$scope.LoadImg = false;
        $scope.GetQpBulkRequirementByCenterBySubjectWise = function () {
            if (CheckValidation() == true) {
               // var Urlstring = "";
               // $scope.LoadImg = true;
                var Urlstring = "api/PreExaminerAppointments/GetDataForQpBulkRequirement/?CourseID=" + $scope.BulkQPRequirement.CourseID + "&ExamID=" + $scope.BulkQPRequirement.ExamID + "&ExmInstID=" + AppSettings.ExamInstID + "&SubType=" + $scope.BulkQPRequirement.SubType + "&CenterWise=" + $scope.BulkQPRequirement.CenterWise;
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
                        var datasetName1 = "QpBulkReqByCenterAndSubject";
                        if (data[0].length == 0) {
                            reportModel.model.dataSources = [{ value: [], name: datasetName1 }];
                            reportModel._refreshReport();
                            alert("Data Not Found");
                            return;
                            //$scope.LoadImg = false;
                        }
                        reportModel.model.dataSources = [{ value: data[0], name: datasetName1 }];
                        //$scope.LoadImg = false;
                        reportModel._refreshReport();

                    }
                });

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


        $scope.GetTheoryExamCenterList = function (DistrictID) {
            if (CourseID != "" || CourseID != undefined) {
                var TheoryCenterList = BasicCollegeService.GetTheroyExamCenterCollegeList(DistrictID, AppSettings.ExamInstID);
                TheoryCenterList.then(function (CenterData, status, headers, config, error) {
                    $scope.TheoryCenterList = CenterData;
                }, function (CenterData, status, headers, config) {
                    alert(error);
                })
            }
        }


        function CheckValidation() {
            if ($scope.BulkQPRequirement.CourseID == undefined || $scope.BulkQPRequirement.CourseID == "") {
                alert("Please Select Stream ");
                return false;
            }
            else if ($scope.BulkQPRequirement.ExamID == undefined || $scope.BulkQPRequirement.ExamID == "") {
                alert("Please Select Stream ");
                return false;
            }
            else if ($scope.BulkQPRequirement.SubType == undefined || $scope.BulkQPRequirement.SubType == "") {
                alert("Please Select Subject Type ");
                return false;
            }
            else if ($scope.BulkQPRequirement.CenterWise == undefined || $scope.BulkQPRequirement.CenterWise == "") {
                alert("Please Select Center Wise OR Not ");
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
            $state.go('PreExam');
        }

        $("#container").ejReportViewer(
            {
                isResponsive: true,
                reportServiceUrl: AppSettings.WebApiUrl + "api/Report",
                processingMode: ej.ReportViewer.ProcessingMode.Local,
                reportPath: "RptQpBulkRequirementCenterorDistWise.rdlc",
                dataSources: [{ value: [], name: "QpBulkReqByCenterAndSubject" }],
                toolbarSettings: { items: ej.ReportViewer.ToolbarItems.All & ~ej.ReportViewer.ToolbarItems.Parameters },
                reportError: function (args) {
                    if (args.dataSources != undefined) {
                        alert("Error...Some error occured in processing report");
                    }
                }
            });
    });
});