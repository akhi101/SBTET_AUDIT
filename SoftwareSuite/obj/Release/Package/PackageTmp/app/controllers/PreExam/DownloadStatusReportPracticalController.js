define(['app'], function (app) {
    app.filter('total', function () {
        return function (input, property) {
            var i = input instanceof Array ? input.length : 0;
            if (typeof property === 'undefined' || i === 0) {
                return i;
            } else if (isNaN(input[0][property])) {
                throw 'filter total can count only numeric values';
            } else {
                var total = 0;
                while (i--)
                    total += input[i][property];
                return total;
            }
        };
    })
    app.controller("DownloadStatusReportPracticalController", function ($scope, $state, $localStorage, $stateParams, AppSettings, DownloadStatusReportService) {

        $scope.DownloadStatusRpt = {};
        $scope.DownloadStatusRpt.ExmSubID = "0";
        $scope.MainGrpDropDown = false;
        $scope.LoadImg = false;
        $scope.ShowDIEODetail = false;

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

        var CourseList = DownloadStatusReportService.GetBasicCourseList();
        CourseList.then(function (Coursedata, status, headers, config, error) {
            $scope.CourseList = Coursedata;
            $scope.DownloadStatusRpt.CourseID = "" + $scope.CourseList[0].CourseID + "";
            $scope.ChangeExamID($scope.DownloadStatusRpt.CourseID)
        }, function (error) {
            alert(error);
        });

        $scope.ChangeExamID = function (CourseID) {
            $scope.ExamList = [];
            if ((CourseID != "") && (CourseID != null) && (CourseID != 0)) {
                $scope.DownloadStatusRpt.ExmSubID == "0";
                $scope.DownloadStatusRpt.MainGrpID = "0";
                    var ExamList = DownloadStatusReportService.GetBasicExamList(CourseID, AppSettings.AcdYrID);
                    ExamList.then(function (BasicExamdata, status, headers, config, error) {
                        if (BasicExamdata[0].CourseID == "1") {
                            BasicExamdata.splice(0, 1);
                            $scope.MainGrpDropDown = false;
                        }
                        $scope.ExamList = BasicExamdata;
                    }, function (error) {
                        alert(error);
                    });
            }
        }

        $scope.GetDataByExamID = function (ExamID) {
            if (ExamID == "2") {
                $scope.MainGrpDropDown = false;
                // if ((ExamId != null) && (ExamId != undefined)) {
                var SubjectList = DownloadStatusReportService.GetBasicPracticalSubjectList($scope.DownloadStatusRpt.CourseID, ExamID);
                SubjectList.then(function (Practicaldata, status, headers, config, error) {
                    $scope.SubjectList = Practicaldata;
                }, function (error) {
                    alert(error);
                });
                //   }
            }
            else {
                $scope.MainGrpDropDown = true;
                $scope.DownloadStatusRpt.MainGrpID = "0";
                var MainGroupList = DownloadStatusReportService.GetMainGroupListByCollegeCourseId(AppSettings.CollegeID, $scope.DownloadStatusRpt.CourseID, AppSettings.AcdYrID);
                MainGroupList.then(function (MainGroupListdata, status, headers, config, error) {
                    $scope.MainGroupList = MainGroupListdata;

                    //if ($scope.ExamFormsNRListByParam.MainGrpID != "") {
                    //    $scope.ExamFormNRList.MainGrpID = "" + $scope.ExamFormsNRListByParam.MainGrpID + "";
                    //    $scope.ExamFormsNRListByParam.MainGrpID = "";
                    //    $scope.changeGroup($scope.ExamFormNRList.MainGrpID);
                    //}
                }, function (error) {
                    alert(error);
                });
            }
        }

        $scope.GetVocPracSub = function (MainGrpID) {
            $scope.SubjectList = [];
            $scope.DownloadStatusRpt.ExmSubID = "0";
            if ((MainGrpID != "") && (MainGrpID != null) && (MainGrpID != 0)) {
                var VocSubList = DownloadStatusReportService.GetVocationalPracSubList($scope.DownloadStatusRpt.ExamID, $scope.DownloadStatusRpt.MainGrpID);
                VocSubList.then(function (BasicSubjectdata, status, headers, config, error) {
                    $scope.SubjectList = BasicSubjectdata;
                }, function (error) {
                    alert(error);
                });
            }
        }


        $scope.GetPracticalStatusReport = function () {
            if ($scope.DownloadStatusRpt.ExamID == undefined || $scope.DownloadStatusRpt.ExamID == 0) {
                alert("Please Select Exam");
                return false;
            }
            else if ($scope.DownloadStatusRpt.ExmSubID == undefined || $scope.DownloadStatusRpt.ExmSubID == 0) {
                alert("Please Select Subject");
                return false;
            }
            else
                {
                $scope.LoadImg = true;
                var StatusReportData = DownloadStatusReportService.GetPracticalStatusReport(AppSettings.DistrictIDs, $scope.DownloadStatusRpt.ExamID, $scope.DownloadStatusRpt.ExmSubID);
                StatusReportData.then(function (data) {
                    if (data.length > 0) {
                        $scope.ShowDIEODetail = true;
                        $scope.LoadImg = false;
                        $scope.StatusReportData = data;
                    }
                    else {
                        alert("No College(s) Data Found.");
                        $scope.ShowDIEODetail = false;
                        $scope.LoadImg = false;
                    }
                }, function (error) {
                    alert(error);
                    $scope.LoadImg = false;
                });
            }
        };


        //$scope.GetDistrictWiseData = function (x,TypeID) {    
        //    $scope.DistrictWiseStatData = [];
        //    var _distCode = x.DIST_CODE;
        //    var _typeID = TypeID;
        //    var DistrictWiseData = DownloadStatusReportService.GetDistrictWiseData(_distCode, _typeID, $scope.DownloadStatusRpt.ExmSubID);
        //    DistrictWiseData.then(function (data) {
        //        if (data.length > 0) {
        //            $scope.DistrictWiseStatData = data;
        //        } else {
        //            alert("Data Not Found.");
        //            $scope.DistrictWiseStatData = [];
        //        }
        //    }, function (error) {
        //        alert(error);
        //        $scope.GetDistrictData = [];
        //    });
        //}
      
    });
});