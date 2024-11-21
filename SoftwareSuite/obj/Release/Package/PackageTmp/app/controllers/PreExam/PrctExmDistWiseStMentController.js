define(['app'], function (app) {
    app.controller("PrctExmDistWiseStMentController", function ($scope, $filter, $state, $interval, $stateParams, AppSettings, BasicDistrictsService) {
        $scope.PreExmSpelPract = {};
        $scope.isDistrictDisable = false;

        $scope.GetDistWisePracticalExamStatement = function () {
            if (CheckValidation() == true) {
                if ($scope.PreExmSpelPract.DistrictID == undefined || $scope.PreExmSpelPract.DistrictID == "") {
                    $scope.PreExmSpelPract.DistrictID = 0;
                }
                var Urlstring = "api/PreExmSpelPract/GetPracticalSpellDistrictWiseData/?DistrictID=" + $scope.PreExmSpelPract.DistrictID + "&ExamInstID=" + AppSettings.ExamInstID + "";
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
                        var datasetName1 = "dsPracticalStateMentDistWise";
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

        //var BasicDistrictList = BasicDistrictsService.GetBasicDistrictList();
        //BasicDistrictList.then(function (Districtdata, status, headers, config, error) {
        //    $scope.BasicDistrictList = Districtdata;
        //}, function (error) {
        //    alert(error);
        //});

        var BasicDistrictList = BasicDistrictsService.GetBasicDistrictListByUserId(AppSettings.LoggedUserId);
        BasicDistrictList.then(function (Districtdata, status, headers, config, error) {
            $scope.BasicDistrictList = Districtdata;
            if (AppSettings.SysUsrGrpID == 7) {
                $scope.PreExmSpelPract.DistrictID = "" + Districtdata[0].DistrictID + "";
                $scope.isDistrictDisable = true;
            }
            else {
                $scope.isDistrictDisable = false;
            }
        }, function (error) {
            alert(error);
            });



        function CheckValidation() {

            //if ($scope.TypeFlag == undefined || $scope.TypeFlag == "") {
            //    alert("Please Select User Type");
            //    return false;
            //}
          
            if ($scope.PreExmSpelPract.DistrictID == undefined || $scope.PreExmSpelPract.DistrictID == "") {
                $scope.PreExmSpelPract.DistrictID = 0;
                return true;
            }
            //else {
            return true;
            //}
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
                reportPath: "RptPracticalDistWiseStateMent.rdlc",
                dataSources: [{ value: [], name: "dsPracticalStateMentDistWise" }],
                toolbarSettings: { items: ej.ReportViewer.ToolbarItems.All & ~ej.ReportViewer.ToolbarItems.Parameters },
                reportError: function (args) {
                    if (args.dataSources != undefined) {
                        alert("Error...Some error occured in processing report");
                    }
                }
            });
    });
});