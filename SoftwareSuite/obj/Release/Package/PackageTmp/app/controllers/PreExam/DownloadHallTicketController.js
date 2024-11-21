define(['app'], function (app) {
    app.controller("DownloadHallTicketController", function ($scope, $state, $stateParams, AppSettings, DownloadHallTicketService) {
        $scope.HallTicketData = {};
        $scope.CompanyName = AppSettings.CompanyName;
        $scope.LoginYear = AppSettings.SelectedYear;
        $scope.HallTicketData.CollegeID = AppSettings.CollegeID;
        var PageNm = $state.current.name.split(".")[1];
        var RightForCurrentPage = [];
        var UsersRightsdata = [];

        if (AppSettings.CollegeID != 0) {
            var CourseList = DownloadHallTicketService.GetCourseListForRegStud(AppSettings.CollegeID);
            CourseList.then(function (BasicCoursedata, status, headers, config, error) {
                $scope.CourseList = BasicCoursedata;
                $scope.HallTicketData.CourseID = "" + $scope.CourseList[0].CourseID + "";
                $scope.FillCoursePart($scope.HallTicketData.CourseID);
            }, function (error) {
                alert(error);
            });
        }

        $scope.FillCoursePart = function (CourseID) {
            $scope.ExamList = [];
            $scope.MainGroupList = [];
            if ((CourseID != "") && (CourseID != null)) {
                var ExamList = DownloadHallTicketService.GetBasicExamList(CourseID, AppSettings.AcdYrID);
                ExamList.then(function (BasicExamdata, status, headers, config, error) {
                    $scope.ExamList = BasicExamdata;
                }, function (error) {
                    alert(error);
                });
                var MainGroupList = DownloadHallTicketService.GetMainGroupListByCollegeCourseId($scope.HallTicketData.CollegeID, CourseID, AppSettings.AcdYrID);
                MainGroupList.then(function (MainGroupListdata, status, headers, config, error) {
                    $scope.MainGroupList = MainGroupListdata;
                }, function (error) {
                    alert(error);
                });
            }
        }

        var MedList = DownloadHallTicketService.GetBasicMediumList(AppSettings.CollegeID);
        MedList.then(function (Mediumdata, status, headers, config, error) {
            $scope.MediumList = Mediumdata;
        }, function (error) {
            alert(error);
        });

        $scope.changeGroup = function (MainGrpID) {
            $scope.MainGrpID = MainGrpID;
            var MedList = DownloadHallTicketService.GetBasicMediumList(AppSettings.CollegeID, $scope.MainGrpID);
            MedList.then(function (Mediumdata, status, headers, config, error) {
                $scope.MediumList = Mediumdata;
            }, function (error) {
                alert(error);
            });
        }

        $scope.Show = function () {
            if (CheckValidation() == true) {
                if (($scope.HallTicketData.MainGrpID == undefined) || ($scope.HallTicketData.MainGrpID == "")) {
                    $scope.HallTicketData.MainGrpID = 0;
                }
                if (($scope.HallTicketData.MediumID == undefined) || ($scope.HallTicketData.MediumID == "")) {
                    $scope.HallTicketData.MediumID = 0;
                }
                $scope.AppDisable = true;
                var ExamFormData = DownloadHallTicketService.GetPreExamNRHTData($scope.HallTicketData.ExamID, AppSettings.ExamInstID, $scope.HallTicketData.CollegeID, $scope.HallTicketData.MainGrpID, $scope.HallTicketData.MediumID, $scope.HallTicketData.CourseID);
                ExamFormData.then(function (data, status, headers, config, error) {
                    if (data.length == 0) {
                        alert("Data not found");
                        $scope.HallTicketData.MainGrpID = "";
                        $scope.HallTicketData.MediumID = "";
                        $scope.ExamfeesData = [];
                        $scope.AppDisable = false;
                        return;
                    } else {
                        $scope.AppDisable = false;
                        $scope.ExamfeesData = data;
                    }
                }, function (data, status, headers, config) {
                    alert(error);
                    $scope.AppDisable = false;
                });
            }
        }

        $scope.Download = function (obj) {
            if (obj.length != 0) {
                var HallTicketReport = DownloadHallTicketService.PrintHallticket(AppSettings.CollegeID, $scope.HallTicketData.ExamID, AppSettings.ExamInstID, obj.PreStudRegID);
                HallTicketReport.then(function (results, status, headers, config, error) {
                    if (results.length != 0) {
                        saveAs(results, "myPDF_.pdf");
                        //const data = window.URL.createObjectURL(newBlob);
                        //var link = document.createElement('a');
                        //link.href = data;
                        //link.download = "file.pdf";
                        //link.click();
                   // if (results != "") {
                        //var file = new Blob([results], { type: 'application/pdf' });
                        //var fileURL = URL.createObjectURL(file);
                        //var date = new Date();
                        //var fileName = "Practical_HallTicket_" + date.getFullYear() + (date.getMonth() + 1) + date.getDate() + ".pdf";
                        //var a = document.createElement("a");
                        //document.body.appendChild(a);
                        //a.href = fileURL;
                        //a.download = fileName;
                        //a.click();

                        $scope.LoadImg = false;
                        //$scope.HallTicketReport = {};
                        //var file = new Blob([results], { type: 'application/pdf' });
                        //var fileURL = URL.createObjectURL(file);
                        //var date = new Date();
                        //var fileName = "Ht(" + date.getUTCDate() + '-' + date.getUTCMonth() + '-' + date.getUTCFullYear() + ").pdf";
                        //var a = document.createElement("a");
                        //document.body.appendChild(a);
                        //a.href = fileURL;
                        //a.download = fileName;
                        //a.click();
                        //$scope.LoadImg = false;
                    }
                    else {
                        alert("Not Found");
                        $scope.HallTicketReport = {};
                    }
                }, function (error) {
                    $scope.HallTicketReport = {};
                    alert(error.statusText);
                    $scope.LoadImg = false;
                });
            }
        };

        

        $scope.ViewHallTicket = function (obj) {
            if (obj.length != 0) {
                var HallTicketReport = DownloadHallTicketService.PrintHallticket(AppSettings.CollegeID, $scope.HallTicketData.ExamID, AppSettings.ExamInstID, obj.PreStudRegID);
                HallTicketReport.then(function (results, status, headers, config, error) {
                    if (results.length != 0) {
                        $("#pdfviewer").attr("src", URL.createObjectURL(new Blob([results], {
                            type: "application/pdf"
                        })))
                        $scope.ShowPrint = true;
                        $scope.LoadImg = false;
                    }
                }, function (error) {
                    $scope.HallTicketReport = {};
                    if (error.statusText == 'Not Found') {
                        alert("No Data Found");
                        $scope.ShowPrint = false;
                        $("#pdfviewer").attr("src", "");
                    }
                    else {
                        alert(error.statusText);
                        $scope.ShowPrint = false;
                        $("#pdfviewer").attr("src", "");
                    }
                    $scope.LoadImg = false;
                });
            }
        };

        function CheckValidation() {
            if (($scope.HallTicketData.CourseID == undefined) || ($scope.HallTicketData.CourseID == "")) {
                alert("Select Course");
                return false;
            }
            if (($scope.HallTicketData.ExamID == undefined) || ($scope.HallTicketData.ExamID == "")) {
                alert("Select Year");
                return false;
            }
            
            else {
                return true;
            }
        };
    });
});