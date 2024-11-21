define(['app'], function (app) {
    app.controller("NRCorrectionAppliedStudRptController", function ($scope, $state, $localStorage, $stateParams, AppSettings, NRCorrectionApprovalListService, ExamFormsApprovalService) {
        $scope.NRStudReport = {};
        var authData = $localStorage.authorizationData;
        $scope.userName = authData.userName;
        AppSettings.LoggedUserId = authData.SysUserID;
        AppSettings.DistrictIDs = authData.DistrictIDs;
        $scope.LoggedCollegeID = AppSettings.CollegeID;
        AppSettings.AcdYrID = authData.AcdYrID;
        AppSettings.SysUsrGrpID = authData.SysUsrGrpID;
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

        //$scope.FillCollData = function (CollegeID) {
        //    if (CollegeID != null) {
        //        $scope.CourseList = [];
        //        $scope.ExamList = [];
        //        $scope.MainGroupList = [];

        //        var CourseList = ExamFormsApprovalService.GetCourseListForRegStud($scope.NRStudReport.CollegeID);
        //        CourseList.then(function (BasicCoursedata, status, headers, config, error) {
        //            $scope.CourseList = BasicCoursedata;
        //            $scope.NRStudReport.CourseID = "" + $scope.CourseList[0].CourseID + "";
        //            $scope.FillCoursePart($scope.NRStudReport.CourseID);
        //        }, function (error) {
        //            alert(error);
        //        });
        //    }
        //}
        if (AppSettings.CollegeID != 0) {
            var CourseList = ExamFormsApprovalService.GetCourseListForRegStud(AppSettings.CollegeID);
            CourseList.then(function (BasicCoursedata, status, headers, config, error) {
                $scope.CourseList = BasicCoursedata;
                $scope.NRStudReport.CourseID = "" + $scope.CourseList[0].CourseID + "";
                $scope.FillCoursePart($scope.NRStudReport.CourseID);
            }, function (error) {
                alert(error);
            });
        }
        $scope.FillCoursePart = function (CourseID) {
            $scope.ExamList = [];
            if ((CourseID != "") && (CourseID != null)) {
                var ExamList = ExamFormsApprovalService.GetBasicExamList(CourseID, AppSettings.AcdYrID);
                ExamList.then(function (BasicExamdata, status, headers, config, error) {
                    $scope.ExamDisable = false;
                    $scope.ExamList = BasicExamdata;
                }, function (error) {
                    alert(error);
                });
            }
        }

        $scope.Show = function () {
            if (($scope.NRStudReport.CourseID == undefined) || ($scope.NRStudReport.CourseID == "")) {
                alert("Select Stream");
                return;
            }
            if (($scope.NRStudReport.ExamID == undefined) || ($scope.NRStudReport.ExamID == "")) {
                alert("Select Year");
                return;
            }
            $scope.AppDisable = true;
            $scope.LoadImg = true;
            var NRStudData = NRCorrectionApprovalListService.GetDataPreExamNRCorrectionList(AppSettings.CollegeID, $scope.NRStudReport.CourseID, $scope.NRStudReport.ExamID);//, $scope.ExamFormBridgerCourseGenreate.MainGrpID
            NRStudData.then(function (data, status, headers, config, error) {
                if (data.length == 0) {
                    alert("Data not found");
                    $scope.NRStudentsList = [];
                    $scope.AppDisable = false;
                    $scope.LoadImg = false;
                    return;
                } else {
                    $scope.NRStudentsList = data;
                    $scope.AppDisable = false;
                }
            }, function (data, status, headers, config) {
                alert(error);
                $scope.AppDisable = false;
            });
        }

        $scope.GetCandidateDetailByPRNNo = function (obj, type) {
            $scope.StudDetaildata = [];
            var Studentdata = NRCorrectionApprovalListService.GetCandidateDetailByPRNNo(AppSettings.CollegeID, obj.PreStudRegID, type);
            Studentdata.then(function (data) {
                if (data.length > 0) {
                    $scope.StudDetaildata = data;
                } else {
                    alert("Data Not Found.");
                    $scope.StudDetaildata = [];
                }
            }, function (error) {
                alert(error);
            });
        }
    });
});