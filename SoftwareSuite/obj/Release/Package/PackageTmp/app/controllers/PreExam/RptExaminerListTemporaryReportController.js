define(['app'], function (app) {
    app.controller("RptExaminerListTemporaryReportController", function ($scope, $state, $stateParams, AppSettings, PreZoneCenterService, BasicDistrictsService, BasicExamService, BasicCourseService, PrePractCenterService) {
        $scope.RptExaminerListTemporary = {};
        $scope.RptExaminerListTemporary.ExamInstID = AppSettings.ExamInstID;
        var PageNm = $state.current.name.split(".")[1] + "List";
        var RptExaminerListTemporaryRightsdata = [];
        RptExaminerListTemporaryRightsdata = AppSettings.UserRights;
        for (var i = 0; i < RptExaminerListTemporaryRightsdata.length; i++) {
            if (RptExaminerListTemporaryRightsdata[i].GridFormToOpen == PageNm) {
                if ($scope.RptExaminerListTemporary.OtherCenterID == 0) {
                    if (RptExaminerListTemporaryRightsdata[i].isaddable == 'Y') {
                        $scope.isupdatableDisable = false;
                    } else {
                        $scope.isupdatableDisable = true;
                    }
                    $scope.isdeletableDisable = true;
                } else {
                    if (RptExaminerListTemporaryRightsdata[i].isupdatable == 'Y') {
                        $scope.isupdatableDisable = false;
                    }
                    else {
                        $scope.isupdatableDisable = true;
                    }
                    if (RptExaminerListTemporaryRightsdata[i].isdeletable == 'Y') {
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
            $scope.RptExaminerListTemporary.DistrictID = "" + $scope.BasicDistrictList[0].DistrictID + "";
            if ($scope.RptExaminerListTemporary.CourseID == 1) {
                $scope.RptExaminerListTemporary.ZoneType = 2;
            }
            else if ($scope.RptExaminerListTemporary.CourseID == 2) {
                $scope.RptExaminerListTemporary.ZoneType = 3;
            }
            GetPracticalCenterList($scope.RptExaminerListTemporary.DistrictID);
        }, function (DistrictData, status, headers, config) {
            alert(error);
        });


        //var BasicCourseList = BasicCourseService.GetBasicCourseList();
        //BasicCourseList.then(function (CourseData, status, headers, config, error) {
        //    $scope.BasicCourseList = CourseData;
        //    //$scope.PrePracticalBatchAllocationReport.CourseID = "1";
        //    //GetExamList($scope.PrePracticalBatchAllocationReport.CourseID);
        //}, function (ExamData, status, headers, config) {
        //    alert(error);
        //})
        //$scope.GetExamListByCourseID = function(CourseID) {
        //    GetExamList(CourseID);
        //}

        //function GetExamList(CourseID) {
        //    if (CourseID != "" || CourseID != undefined) {
        //        var BasicExamList = BasicExamService.GetExamListByCourseID(CourseID);
        //        BasicExamList.then(function (ExamData, status, headers, config, error) {
        //            $scope.BasicExamList = ExamData;
        //            //$scope.PrePracticalBatchAllocationReport.ExamID = "2";
        //        }, function (ExamData, status, headers, config) {
        //            alert(error);
        //        })
        //    }
        //}

        $scope.GetPracticalCenterListByDistrictID = function (DistrictID) {
            GetPracticalCenterList(DistrictID);
        }

        function GetPracticalCenterList(DistrictID) {

            if (DistrictID != "" || DistrictID != undefined) {
                //if ($scope.RptExaminerListTemporary.CourseID == 1) { 
                //    var PracticalCenterList = PrePractCenterService.GetPracticalCenterListByDistrictIDANDZoneType($scope.RptExaminerListTemporary.ExamInstID, 2, $scope.RptExaminerListTemporary.DistrictID);
                //PracticalCenterList.then(function (PracticalCenterData, status, headers, config, error) {
                //    $scope.PracticalCenterList = PracticalCenterData;
                //}, function (PracticalCenterData, status, headers, config) {
                //    alert(error);
                //    })
                //}
                //if ($scope.RptExaminerListTemporary.CourseID == 2) {
                    var PracticalCenterList = PrePractCenterService.GetPracticalCenterListByDistrictIDANDZoneType($scope.RptExaminerListTemporary.ExamInstID, 3, $scope.RptExaminerListTemporary.DistrictID);
                    PracticalCenterList.then(function (PracticalCenterData, status, headers, config, error) {
                        $scope.PracticalCenterList = PracticalCenterData;
                    }, function (PracticalCenterData, status, headers, config) {
                        alert(error);
                    })
                //}
            }
        }



        $scope.GetExaminerListTemporarybyCenter = function () {

            if ($scope.RptExaminerListTemporary.PrePractCntrID == undefined || $scope.RptExaminerListTemporary.PrePractCntrID == "") {
                $scope.RptExaminerListTemporary.PrePractCntrID = 0;
            }

            //$scope.RptExaminerListTemporary.CourseID = $scope.RptExaminerListTemporary.CourseID;

            $scope.RptExaminerListTemporary.ExamID = 0;
            $scope.RptExaminerListTemporary.PrePractCntrID = $scope.RptExaminerListTemporary.PrePractCntrID;
            $scope.RptExaminerListTemporary.DistrictID = $scope.RptExaminerListTemporary.DistrictID;
            $scope.RptExaminerListTemporary.ExamInstID = AppSettings.ExamInstID;
            $scope.RptExaminerListTemporary.UpdLoginID = AppSettings.LoggedUserId;

            if ($scope.RptExaminerListTemporary.DistrictID == undefined || $scope.RptExaminerListTemporary.DistrictID == "") {
                $scope.RptExaminerListTemporary.DistrictID = 0;
            }

            if ($scope.RptExaminerListTemporary.PrePractCntrID == undefined || $scope.RptExaminerListTemporary.PrePractCntrID == "") {
                $scope.RptExaminerListTemporary.PrePractCntrID = 0;
            }

            if (CheckValidation() == true) {
                //if ($scope.PrePracticalBatchAllocationReport.CourseID == 1) {
                var Urlstring = "api/PreExaminerAppointments/GetExaminerListTemporaryForReport/?DistrictID=" + $scope.RptExaminerListTemporary.DistrictID + "&PrePractCntrID=" + $scope.RptExaminerListTemporary.PrePractCntrID + "&ExamID=" + $scope.RptExaminerListTemporary.ExamID;
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
                        var datasetName1 = "dsExaminerListTemporary";
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
            //if (($scope.RptExaminerListTemporary.DistrictID == undefined) || ($scope.RptExaminerListTemporary.DistrictID == "")) {
            //    alert("Select District");
            //    return false;
            //}
            //if (($scope.RptExaminerListTemporary.CourseID == undefined) || ($scope.RptExaminerListTemporary.CourseID == "")) {
            //    alert("Select Stream");
            //    return false;
            //}
            //if (($scope.RptExaminerListTemporary.ExamID == undefined) || ($scope.RptExaminerListTemporary.ExamID == "")) {
            //    alert("Select Year");
            //    return false;
            //}
            //if (($scope.RptExaminerListTemporary.PrePractCntrID == undefined) || ($scope.RptExaminerListTemporary.PrePractCntrID == "")) {
            //    $scope.RptExaminerListTemporary.PrePractCntrID = 0;
            //    return true;
            //}
            //else {
                return true;
           // }
        }
        $scope.Exit = function () {
            RedirectToListPage();
        }
        function RedirectToListPage() {
            $scope.isupdatableDisable = false;
            $state.go('CenterManagemnet');
        }

        $("#reportviewer").ejReportViewer(
            {
                isResponsive: true,
                reportServiceUrl: AppSettings.WebApiUrl + "api/Report",
                processingMode: ej.ReportViewer.ProcessingMode.Local,
                reportPath: "RptExaminerListTemporaryReport.rdlc",
                dataSources: [{ value: [], name: "dsExaminerListTemporary" }],
                toolbarSettings: { items: ej.ReportViewer.ToolbarItems.All & ~ej.ReportViewer.ToolbarItems.Parameters },
                reportError: function (args) {
                    if (args.dataSources != undefined) {
                        alert("Error...Some error occured in processing report");
                    }
                }
            });
    });

    //});RptCenterWisePracticalBatchReport
});
