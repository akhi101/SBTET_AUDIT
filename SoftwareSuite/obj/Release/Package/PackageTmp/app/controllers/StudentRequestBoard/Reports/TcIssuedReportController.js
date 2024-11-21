define(['app'], function (app) {
    app.controller("TcIssuedReportController", function ($scope, $state, $localStorage, $stateParams, AppSettings, RequestDrillDownService) {
        $scope.TCReportData = {};
        $scope.TcIssueData = {};
        $scope.TcStudData = {};
        var authData = $localStorage.authorizationData;
        $scope.userName = authData.userName;
        AppSettings.LoggedUserId = authData.SysUserID;
        AppSettings.DistrictIDs = authData.DistrictIDs;
        $scope.LoggedCollegeID = AppSettings.CollegeID;
        AppSettings.AcdYrID = authData.AcdYrID;
        var PageNm = $state.current.name.split(".")[1];
        var RightForCurrentPage = [];
        var UsersRightsdata = [];
        UsersRightsdata = AppSettings.UserRights;
        for (var i = 0; i < UsersRightsdata.length; i++) {
            if (UsersRightsdata[i].ListFormName == PageNm) {
                var obj = {};
                obj.isaddable = UsersRightsdata[i].isaddable;
                RightForCurrentPage.push(obj);
            }
        }
        $scope.MainPageNo = 1;
        $scope.ShowDIEODetail = false; 
        $scope.ShowCollegeDetail = false; 
        $scope.ShowStudentDetail = false;
        $scope.ShowAcdDropDown = true;
        $scope.ShowBack = false;
        $scope.AcdYrID = AppSettings.AcdYrID;
        var AcademicYearList = RequestDrillDownService.GetAcademicYear();
        AcademicYearList.then(function (data) {
            $scope.AcademicYearList = data;
        }, function (error) {
            alert(error);
        });
        $scope.GetTcIssueReportByDIEO = function () {
            var TCReportData = RequestDrillDownService.GetTcIssueReportByDIEO($scope.AcdYrID, AppSettings.DistrictIDs);
            TCReportData.then(function (data) {
                if (data.length > 0) {
                    $scope.ShowDIEODetail = true;
                    $scope.TCReportData = data;
                }
                else {
                    alert("No College(s) Data Found.");
                    $scope.TCReportData = [];
                    $scope.ShowDIEODetail = false;
                }
            }, function (error) {
                alert(error);
            });
        };
        $scope.GetTcIssueReportByCollege = function (CollegeID) {
            $scope.CollegeID = CollegeID;
            var TcIssueData = RequestDrillDownService.GetTcIssueReportByCollege(CollegeID, $scope.AcdYrID);
            TcIssueData.then(function (data) {
                if (data.length > 0) {
                    $scope.MainPageNo = 2;
                    $scope.TcIssueData = data;
                    $scope.ShowDIEODetail = false;
                    $scope.ShowCollegeDetail = true;
                    if ($scope.LoggedCollegeID.trim() == "undefined" || $scope.LoggedCollegeID.trim() == "0") {
                        $scope.ShowBack = true;
                    }
                }
                else {
                    alert("No Student(s) Data Found.");
                    $scope.TcIssueData = [];
                    $scope.ShowCollegeDetail = false;
                    return;
                }
            }, function (error) {
                alert(error);
            });
        };
        $scope.GetStudentDetails = function (CollegeID, StudID) {
            $scope.TotalRecordList = [];
            if (StudID != null) {
                var TcStudData = RequestDrillDownService.GetTcIssueStudReportByStudID($scope.AcdYrID, CollegeID, StudID);
                TcStudData.then(function (data) {
                    if (data.length > 0) {
                        $scope.MainPageNo = 3;
                        $scope.TcStudData = data;
                        $scope.ShowAcdDropDown = false;
                        $scope.ShowCollegeDetail = false;
                        $scope.ShowStudentDetail = true;
                        $scope.ShowBack = true;
                    }
                    else {
                        alert("Student Data Not Found.");
                        $scope.TcStudData = [];
                        $scope.ShowStudentDetail = false;
                        return;
                    }
                }, function (error) {
                    alert(error);
                });
            } else {
                alert("Data Not Found.");
            }
        };
        if ($scope.LoggedCollegeID.trim() == "undefined" || $scope.LoggedCollegeID.trim() == "0") {
            $scope.GetTcIssueReportByDIEO();
        }
        else {
            $scope.GetTcIssueReportByCollege($scope.LoggedCollegeID);
        }
        $scope.ChangeAcdYear = function () {
            if ($scope.MainPageNo == 1) {
                $scope.GetTcIssueReportByDIEO();
            }
            else if ($scope.MainPageNo == 2) {
                $scope.GetTcIssueReportByCollege($scope.CollegeID);
            }
        };
        $scope.PageBack = function () {
            if ($scope.MainPageNo == 3) {
                $scope.ShowAcdDropDown = true;
                $scope.ShowCollegeDetail = true;
                $scope.ShowStudentDetail = false;
                $scope.MainPageNo -= 1;
                if ($scope.LoggedCollegeID.trim() != "undefined" && $scope.LoggedCollegeID.trim() != "0") {
                    $scope.ShowBack = false;
                }
            }
            else if ($scope.MainPageNo == 2) {
                if ($scope.LoggedCollegeID.trim() == "undefined" || $scope.LoggedCollegeID.trim() == "0") {
                    $scope.ShowDIEODetail = true;
                    $scope.ShowCollegeDetail = false;
                    $scope.MainPageNo -= 1;
                }
                $scope.GetTcIssueReportByDIEO();
                $scope.ShowBack = false;
            }
        };
    });
});