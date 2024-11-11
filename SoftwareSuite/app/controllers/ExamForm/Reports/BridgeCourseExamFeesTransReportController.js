define(['app'], function (app) {
    app.controller("BridgeCourseExamFeesTransReportController", function ($scope, $http, $localStorage, $state, $window, AppSettings, BridgeCourseExamFeesTransService) {
        $scope.DrillDownAdmission = {};
        $scope.adminuser = false;
        $scope.ifcoluser = false;
        $scope.ShowBtn = false;

        var AcdYrList = BridgeCourseExamFeesTransService.GetCurrentAcademicYearForDrillDown();
        AcdYrList.then(function (AcdYrdata, status, headers, config, error) {
            $scope.AcdYrList = AcdYrdata;
        }, function (error) {
            alert(error);
        });
        var DistrictList = BridgeCourseExamFeesTransService.GetDistrictListByStateID(1);
        DistrictList.then(function (Districtdata, status, headers, config, error) {
            $scope.DistrictList = Districtdata;
        }, function (error) {
            alert(error);
        });
        var BasicManagementTypedata = BridgeCourseExamFeesTransService.GetBasicManagementTypeListWithAll();
        BasicManagementTypedata.then(function (data) {

            $scope.BasicManagementTypeList = data;
            if (AppSettings.CollegeID != 0) {
                for (var i = 0; i < $scope.BasicManagementTypeList.length; i++) {
                    if ($scope.BasicManagementTypeList[i].MngtTypID == AppSettings.MngtTypID) {
                        $scope.BasicManagementTypeList[i].Selected = true;
                        $scope.ifcoluser = true;
                    }
                }
                $("select#AcdYrID")[0].selectedIndex = 1;
                $scope.DrillDownAdmission.AcdYrID = AppSettings.AcdYrID;
            }
            else {
                for (var i = 0; i < $scope.BasicManagementTypeList.length; i++) {
                    if ($scope.BasicManagementTypeList[i].MngtTypID == 1) {
                        $scope.BasicManagementTypeList[i].Selected = true;
                        $scope.ifcoluser = false;
                    }
                }
                $("select#AcdYrID")[0].selectedIndex = 1;
                $scope.DrillDownAdmission.AcdYrID = AppSettings.AcdYrID;
            }
        }, function (error) {
            alert(error);
        });

        if ((AppSettings.SysUsrGrpID == 1) || (AppSettings.SysUsrGrpID == 7)) {
            $scope.adminUserMgmtType = true;
        }
        else {
            $scope.adminUserMgmtType = false;
        }

        if (AppSettings.SysUsrGrpID == 1) {
            $scope.adminUserDistricts = true;
        }
        else {
            $scope.adminUserDistricts = false;
        }
        $scope.MngtTypIDs = "";
        var AcdYrSelectText = "";
        var DistrictSelectText = "";
        var StreamYearSelectText = "";
        $scope.MngtName = "";
        $scope.Submit = function () {
            $scope.MngtName = "";
            $scope.MngtTypIDs = "";
            var AcdYrSelect = document.getElementById("AcdYrID");
            AcdYrSelectText = AcdYrSelect.options[AcdYrSelect.selectedIndex].text;
            var DistrictSelect = document.getElementById("DistrictID");
            DistrictSelectText = DistrictSelect.options[DistrictSelect.selectedIndex].text;
            var StreamYearSelect = document.getElementById("StreamYear");
            StreamYearSelectText = StreamYearSelect.options[StreamYearSelect.selectedIndex].text;
            if (StreamYearSelectText.toUpperCase() == 'ALL') {
                StreamYearSelectText = 'General + Vocational - I & II Year';
            }
            document.getElementById('HeadLabel').innerHTML = 'Exam Fee Transaction Report <br/> Academic Year: ' + AcdYrSelectText + '&emsp;&emsp;District(s): ' + DistrictSelectText + '&emsp;&emsp; Stream: ' + StreamYearSelectText;
            for (var i = 0; i < $scope.BasicManagementTypeList.length; i++) {
                if ($scope.BasicManagementTypeList[i].Selected) {
                    if ($scope.MngtTypIDs == "") {
                        $scope.MngtTypIDs = $scope.BasicManagementTypeList[i].MngtTypID;
                        $scope.MngtTypName = $scope.BasicManagementTypeList[i].MngtTypName;
                        $scope.MngtName = $scope.BasicManagementTypeList[i].MngtTypName; // for printing
                    }
                    else {
                        $scope.MngtTypIDs = $scope.MngtTypIDs + ',' + $scope.BasicManagementTypeList[i].MngtTypID;
                        $scope.MngtName += $scope.BasicManagementTypeList[i].MngtTypName + ','; // for printing
                    }
                }
            }
            $("#MangtLabel").text('Management Type: ' + $scope.MngtName.replace(/,\s*$/, ""));
            if ($scope.MngtTypIDs == "") {
                alert("Select atleast single management type");
                return;
            }
            //if (($scope.DrillDownAdmission.AcdYrID == "") || ($scope.DrillDownAdmission.AcdYrID == undefined)) {
            //    alert("Select Academic Year");
            //    return;
            //}
            if (($scope.DrillDownAdmission.DistrictID == "") || ($scope.DrillDownAdmission.DistrictID == undefined)) {
                $scope.DrillDownAdmission.DistrictID = 0;
            }

            if (($scope.DrillDownAdmission.ExamID == "") || ($scope.DrillDownAdmission.ExamID == undefined)) {
                alert('Please Select Stream/Year');
                return;
            }

            var Feestatus = 0;
            $scope.MngtTypName = "ALL";
            $scope.CourseName = "ALL";
            $scope.MainGrpName = "ALL";
            $scope.MediumName = "ALL";
            $scope.CasteName = "ALL";
            $scope.AcdYrName = "ALL";
            $scope.CollegeDistName = "ALL";
            for (var i = 0; i < $scope.AcdYrList.length; i++) {
                if ($scope.AcdYrList[i].AcdYrID == $scope.DrillDownAdmission.AcdYrID) {
                    $scope.AcdYrName = $scope.AcdYrList[i].AcdYrName;
                }
            }
            for (var i = 0; i < $scope.DistrictList.length; i++) {
                if ($scope.DistrictList[i].DistrictID == $scope.DrillDownAdmission.DistrictID) {
                    $scope.CollegeDistName = $scope.DistrictList[i].DistName;
                }
            }
            
            if (AppSettings.CollegeID == 0) {
                var TotalRecorddata = BridgeCourseExamFeesTransService.GetDrillDownFeeTransReport(AppSettings.AcdYrID, $scope.DrillDownAdmission.DistrictID, AppSettings.LoggedUserId, $scope.MngtTypIDs, $scope.DrillDownAdmission.ExamID);
            }
            else {
                var gender = "";
                var TotalRecorddata = BridgeCourseExamFeesTransService.GetBridgeCourseFeeTransReportByCollege(AppSettings.AcdYrID, $scope.DrillDownAdmission.DistrictID, AppSettings.CollegeID, $scope.MngtTypIDs, $scope.DrillDownAdmission.ExamID);
            }
            TotalRecorddata.then(function (data) {
                if (data.length > 0) {
                    $scope.DrillDownList = data;

                    var TotalNoofCandidate = 0;
                    var TotalFormFees = 0;
                    for (var i = 0; i < data.length; i++) {
                        TotalNoofCandidate += data[i]["NoofCandidate"];
                        TotalFormFees += data[i]["TotalFees"];
                    }
                    $scope.DrillDownList.TotalNoofCandidate = TotalNoofCandidate;
                    $scope.DrillDownList.TotalFormFees = TotalFormFees;
                    $scope.ShowBtn = true;
                } else {
                    $scope.ShowBtn = false;
                    alert("Data Not Found.");
                    $scope.DrillDownList = [];
                    $scope.colPageAdmissionListForfirst = [];
                }
            }, function (error) {
                $scope.ShowBtn = false;
                alert(error);
            });
        }
        $scope.DrillDownList = [];
        $scope.colPageAdmissionListForfirst = [];
        $scope.GetExcel = function () {
            if (AppSettings.CollegeID == 0) {
                var TotalRecorddata = BridgeCourseExamFeesTransService.GetExamFeeTransExcelReportByCollege(AppSettings.AcdYrID, $scope.DrillDownAdmission.DistrictID, AppSettings.LoggedUserId, $scope.MngtTypIDs, $scope.DrillDownAdmission.ExamID, AcdYrSelectText, DistrictSelectText, StreamYearSelectText, $scope.MngtName);
            }
            else {
                var gender = "";
                var TotalRecorddata = BridgeCourseExamFeesTransService.GetExamFeeTransExcelReportByCollege(AppSettings.AcdYrID, $scope.DrillDownAdmission.DistrictID, AppSettings.CollegeID, $scope.MngtTypIDs, $scope.DrillDownAdmission.ExamID, AcdYrSelectText, DistrictSelectText, StreamYearSelectText, $scope.MngtName);
            }
            TotalRecorddata.then(function (data) {
                if (data.length > 0) {
                    $window.open(data[0].ExcelFilePath, "_blank");
                } else {
                    alert("Data Not Found.");
                }
            }, function (error) {
                alert(error);
            });
        };
        $scope.GetCandidates = function (obj) {
            $scope.colPageAdmissionList = [];
            var TotalRecorddata = BridgeCourseExamFeesTransService.GetBridgeCandidateByCollege(obj.TransactionID, obj.ColCode, obj.ExamID);
            TotalRecorddata.then(function (data) {
                $scope.colPageAdmissionList = data;
                if (data.length > 0) {
                    $scope.colPageAdmissionList.ColName = data[0].ColCode + ' - ' + data[0].ColName;
                    var GrandTotal = 0;
                    for (var i = 0; i < data.length; i++) {
                        GrandTotal += data[i]["TotalFees"];
                    }
                    $scope.DrillDownList.GrandTotal = GrandTotal;

                } else {
                    alert("Data Not Found.");
                    $scope.colPageAdmissionList = [];
                }
            }, function (error) {
                alert(error);
            });
        }
    });
});