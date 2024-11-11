define(['app'], function (app) {
    app.controller("VocAnsBkAccStDayWiseController", function ($scope, $filter, $state, $interval, $stateParams, AppSettings, preExaminerAppointmentsService, BasicDistrictsService, BasicCourseService, BasicExamService) {

        $scope.GetVocAnsBKReqAccStDayWise = function () {
            if (CheckValidation() == true) {
                var Urlstring = "";
                //if ($scope.DistrictID == undefined || $scope.DistrictID == "") {
                //    $scope.DistrictID = 0;
                //}

                Urlstring = "api/PreExaminerAppointments/GetGetVOCANSBKACCSTANDDAYWISENOOFCANAPP/?DistrictID=" + $scope.DistrictWiseCount.DistrictID + "&ExamID=" + $scope.DistrictWiseCount.ExamID + "&ExamInstID=" + AppSettings.ExamInstID +"";
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
                        var datasetName1 = "VocAnsBookAccountStamentCenterAndDayWise";
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


        function CheckValidation() {
            return true;
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
                reportPath: "RptVocAnsBookAccountStamentCenterAndDayWise.rdlc",
                dataSources: [{ value: [], name: "VocAnsBookAccountStamentCenterAndDayWise" }],
                toolbarSettings: { items: ej.ReportViewer.ToolbarItems.All & ~ej.ReportViewer.ToolbarItems.Parameters },
                reportError: function (args) {
                    if (args.dataSources != undefined) {
                        alert("Error...Some error occured in processing report");
                    }
                }
            });
    });
});