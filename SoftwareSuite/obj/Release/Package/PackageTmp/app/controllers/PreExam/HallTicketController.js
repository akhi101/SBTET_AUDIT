define(['app'], function (app) {
    app.controller("HallTicketController", function ($scope, $state, $stateParams, AppSettings, BasicDistrictsService, BasicExamService, BasicCourseService, BasicCollegeService) {
        $scope.HallTicket = {};
        $("#LoadImg").attr("src", AppSettings.LoadingImage);
        $scope.LoadImg = false;
        //$scope.HallTicket.ExamInstID = AppSettings.ExamInstID;
        var PageNm = $state.current.name.split(".")[1] + "List";
        var HallTicketRightsdata = [];
        HallTicketRightsdata = AppSettings.UserRights;
        for (var i = 0; i < HallTicketRightsdata.length; i++) {
            if (HallTicketRightsdata[i].GridFormToOpen == PageNm) {
                if ($scope.HallTicket.OtherCenterID == 0) {
                    if (HallTicketRightsdata[i].isaddable == 'Y') {
                        $scope.isupdatableDisable = false;
                    } else {
                        $scope.isupdatableDisable = true;
                    }
                    $scope.isdeletableDisable = true;
                } else {
                    if (HallTicketRightsdata[i].isupdatable == 'Y') {
                        $scope.isupdatableDisable = false;
                    }
                    else {
                        $scope.isupdatableDisable = true;
                    }
                    if (HallTicketRightsdata[i].isdeletable == 'Y') {
                        $scope.isdeletableDisable = false;
                    } else {
                        $scope.isdeletableDisable = true;
                    }
                }
            }
        }

       // $scope.isupdatableDisable = false;

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

        $scope.GetBasicCollegeList = function (DistrictID) {
            if (DistrictID != "" || DistrictID != undefined) {
                var BasicCollegeList = BasicCollegeService.GetCollegeListByDistrict(DistrictID);
                BasicCollegeList.then(function (CollegeData, status, headers, config, error) {
                    $scope.BasicCollegeList = CollegeData;
                }, function (CollegeData, status, headers, config) {
                    alert(error);
                })
            }
        }

        


        function CheckValidation() {
            if (($scope.HallTicket.DistrictID == undefined) || ($scope.HallTicket.DistrictID == "")) {
                alert("Select District");
                return false;
            }
            if (($scope.HallTicket.CourseID == undefined) || ($scope.HallTicket.CourseID == "")) {
                alert("Select Stream");
                return false;
            }
            if (($scope.HallTicket.ExamID == undefined) || ($scope.HallTicket.ExamID == "")) {
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

        //$("#reportviewer").ejReportViewer(
        //    {
        //        isResponsive: true,
        //        reportServiceUrl: AppSettings.WebApiUrl + "api/Report",
        //        processingMode: ej.ReportViewer.ProcessingMode.Local,
        //        reportPath: "RptCenterWisePracticalBatchReport.rdlc",
        //        dataSources: [{ value: [], name: "dsCenterWisePracticalBatchReport" }],
        //        toolbarSettings: { items: ej.ReportViewer.ToolbarItems.All & ~ej.ReportViewer.ToolbarItems.Parameters },
        //        reportError: function (args) {
        //            if (args.dataSources != undefined) {
        //                alert("Error...Some error occured in processing report");
        //            }
        //        }
        //    });
    });

    //});
});
