define(['app'], function (app) {
    app.controller("ExamFeeDistTransSummController", function ($scope, $http, $localStorage, $state, AppSettings, ExamFeeDistTransSummService) {
        $scope.DrillDownExamFeesPaid = {};
        $scope.AcdYrID = AppSettings.AcdYrID;
        $scope.DistrictID = "0";
        $scope.ExamID = "0";
        $scope.VocGen = "A";
        $scope.ShowBtn = false;

        var AcdYrList = ExamFeeDistTransSummService.GetCurrentAcademicYearForDrillDown();
        AcdYrList.then(function (AcdYrdata) {
            $scope.AcdYrList = AcdYrdata;
            return AcdYrList;
        }, function (error) {
            alert(error);
        });


        var DistrictList = ExamFeeDistTransSummService.GetDistrictListByStateID(1);
        DistrictList.then(function (Districtdata, status, headers, config, error) {
            $scope.DistrictList = Districtdata;
        }, function (error) {
            alert(error);
        });


        var BasicManagementTypedata = ExamFeeDistTransSummService.GetBasicManagementTypeListWithAll();
        BasicManagementTypedata.then(function (data) {
            $scope.BasicManagementTypeList = data;
            if (AppSettings.CollegeID != 0) {
                for (var i = 0; i < $scope.BasicManagementTypeList.length; i++) {
                    if ($scope.BasicManagementTypeList[i].MngtTypID == AppSettings.MngtTypID) {
                        $scope.BasicManagementTypeList[i].Selected = true;
                        $scope.ifcoluser = true;
                    }
                }
            }
            else {
                for (var i = 0; i < $scope.BasicManagementTypeList.length; i++) {
                    if ($scope.BasicManagementTypeList[i].MngtTypID == 1) {
                        $scope.BasicManagementTypeList[i].Selected = true;
                        $scope.ifcoluser = false;
                    }
                }
            }
            $("select#SelectYear")[0].selectedIndex = 1;
            $scope.DrillDownExamFeesPaid.AcdYrID = AppSettings.AcdYrID;
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
            $scope.adminuser = true;
        }
        else {
            $scope.adminuser = false;
        }

        $scope.changeVocGen = function (VocGen) {
            $scope.VocGen = VocGen;
            if ($scope.VocGen == "A") {
                $scope.ExamID = "0";
            }
            else if ($scope.VocGen == "G") {
                $scope.ExamID = "1,2";
            }
            else if ($scope.VocGen == "V") {
                $scope.ExamID = "3,4";
            }
        }

        $scope.MngtTypIDs = "";
        $scope.Submit = function () {
            $scope.LoadImg = true;
            $scope.MngtTypIDs = "";
            $scope.MngtName = "";
            for (var i = 0; i < $scope.BasicManagementTypeList.length; i++) {
                if ($scope.BasicManagementTypeList[i].Selected) {
                    if ($scope.MngtTypIDs == "") {
                        $scope.MngtTypIDs = $scope.BasicManagementTypeList[i].MngtTypID;
                        $scope.MngtTypName = $scope.BasicManagementTypeList[i].MngtTypName;
                        $scope.MngtName = $scope.BasicManagementTypeList[i].MngtTypName; // for printing
                    }
                    else {
                        $scope.MngtTypIDs = $scope.MngtTypIDs + ',' + $scope.BasicManagementTypeList[i].MngtTypID;
                        $scope.MngtName += ',' + $scope.BasicManagementTypeList[i].MngtTypName; // for printing
                    }
                }
            }
            $("#MangtLabel").text('Management Type: ' + $scope.MngtName);
            if (AppSettings.CollegeID == 0) {
                if ($scope.MngtTypIDs == "") {
                    alert("Select atleast single management type");
                    return;
                }
            }

            if (($scope.DrillDownExamFeesPaid.AcdYrID == "") || ($scope.DrillDownExamFeesPaid.AcdYrID == undefined)) {
                alert("Select Academic Year");
                return;
            }
            if (($scope.DrillDownExamFeesPaid.DistrictID == "") || ($scope.DrillDownExamFeesPaid.DistrictID == undefined)) {
                $scope.DrillDownExamFeesPaid.DistrictID = 0;
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
                if ($scope.AcdYrList[i].AcdYrID == $scope.DrillDownExamFeesPaid.AcdYrID) {
                    $scope.AcdYrName = $scope.AcdYrList[i].AcdYrName;
                }
            }
            for (var i = 0; i < $scope.DistrictList.length; i++) {
                if ($scope.DistrictList[i].DistrictID == $scope.DrillDownExamFeesPaid.DistrictID) {
                    $scope.CollegeDistName = $scope.DistrictList[i].DistName;
                }
            }
            if (AppSettings.CollegeID == 0) {
                var TotalRecorddata = ExamFeeDistTransSummService.GetExamFeeTransactionSummary(AppSettings.AcdYrID, $scope.DrillDownExamFeesPaid.DistrictID, AppSettings.LoggedUserId, $scope.MngtTypIDs, $scope.ExamID);
            }
            else {
                var gender = "";
                var TotalRecorddata = ExamFeeDistTransSummService.GetCollegeExamFeeTransactionSummary(AppSettings.AcdYrID, AppSettings.CollegeID);
            }
            TotalRecorddata.then(function (data) {
                if (data.length > 0) {
                    $scope.ShowBtn = true;
                    $scope.DrillDownList = data;
                    $scope.LoadImg = false;
                    $scope.ShowTransactionSummary = true;


                    var TotalFirstYearRegularPaid = 0;
                    var TotalFirstYearRegularAmount = 0;
                    var TotalSecondYearRegularPaid = 0;
                    var TotalSecondYearRegularAmount = 0;
                    var TotalSecondYearPrivatePaid = 0;
                    var TotalSecondYearPrivateAmount = 0;
                    var TotalCandidates = 0;
                    var GrandTotal = 0;


                    for (var i = 0; i < data.length; i++) {
                        TotalFirstYearRegularPaid += data[i]["FirstYearRegularPaid"];
                        TotalFirstYearRegularAmount += data[i]["FirstYearRegularAmount"];
                        TotalSecondYearRegularPaid += data[i]["SecondYearRegularPaid"];
                        TotalSecondYearRegularAmount += data[i]["SecondYearRegularAmount"];
                        TotalSecondYearPrivatePaid += data[i]["SecondYearPrivatePaid"];
                        TotalSecondYearPrivateAmount += data[i]["SecondYearPrivateAmount"];
                        TotalCandidates += data[i]["CollegeTotalCandidates"];
                        GrandTotal += data[i]["CollegeTotal"];
                    }
                    $scope.DrillDownList.TotalFirstYearRegularPaid = TotalFirstYearRegularPaid;
                    $scope.DrillDownList.TotalFirstYearRegularAmount = TotalFirstYearRegularAmount;
                    $scope.DrillDownList.TotalSecondYearRegularPaid = TotalSecondYearRegularPaid;
                    $scope.DrillDownList.TotalSecondYearRegularAmount = TotalSecondYearRegularAmount;
                    $scope.DrillDownList.TotalSecondYearPrivatePaid = TotalSecondYearPrivatePaid;
                    $scope.DrillDownList.TotalSecondYearPrivateAmount = TotalSecondYearPrivateAmount;
                    $scope.DrillDownList.TotalCandidates = TotalCandidates;
                    $scope.DrillDownList.GrandTotal = GrandTotal;

                } else {
                    $scope.ShowBtn = false;
                    $scope.DrillDownList = [];
                    $scope.colPageAdmissionListForfirst = [];
                    $scope.CandidatesList = [];
                    $scope.colPageAdmissionList = [];
                    alert("Data Not Found.");
                    $scope.LoadImg = false;
                }
            }, function (error) {
                alert(error);
                $scope.LoadImg = false;
            });
        }


        $scope.DrillDownList = [];
        $scope.colPageAdmissionListForfirst = [];

        $scope.GetDistrictLevelDetails = function (obj) {
            $scope.DistrictCollegeList = [];

            var TotalRecorddata = ExamFeeDistTransSummService.GetDistrictLevelDetails(AppSettings.AcdYrID, obj.DistrictID, AppSettings.LoggedUserId, $scope.MngtTypIDs, $scope.ExamID);
            TotalRecorddata.then(function (data) {
                $scope.DistrictCollegeList = data;

                if (data.length > 0) {
                    $scope.DistrictCollegeList.DistName = data[0].DistName;
                    var TotalFirstYearRegularPaid = 0;
                    var TotalFirstYearRegularAmount = 0;
                    var TotalSecondYearRegularPaid = 0;
                    var TotalSecondYearRegularAmount = 0;
                    var TotalSecondYearPrivatePaid = 0;
                    var TotalSecondYearPrivateAmount = 0;
                    var TotalCandidates = 0;
                    var GrandTotal = 0;

                    for (var i = 0; i < data.length; i++) {
                        TotalFirstYearRegularPaid += data[i]["FirstYearRegularPaid"];
                        TotalFirstYearRegularAmount += data[i]["FirstYearRegularAmount"];
                        TotalSecondYearRegularPaid += data[i]["SecondYearRegularPaid"];
                        TotalSecondYearRegularAmount += data[i]["SecondYearRegularAmount"];
                        TotalSecondYearPrivatePaid += data[i]["SecondYearPrivatePaid"];
                        TotalSecondYearPrivateAmount += data[i]["SecondYearPrivateAmount"];
                        TotalCandidates += data[i]["CollegeTotalCandidates"];
                        GrandTotal += data[i]["CollegeTotal"];
                    }
                    $scope.DistrictCollegeList.TotalFirstYearRegularPaid = TotalFirstYearRegularPaid;
                    $scope.DistrictCollegeList.TotalFirstYearRegularAmount = TotalFirstYearRegularAmount;
                    $scope.DistrictCollegeList.TotalSecondYearRegularPaid = TotalSecondYearRegularPaid;
                    $scope.DistrictCollegeList.TotalSecondYearRegularAmount = TotalSecondYearRegularAmount;
                    $scope.DistrictCollegeList.TotalSecondYearPrivatePaid = TotalSecondYearPrivatePaid;
                    $scope.DistrictCollegeList.TotalSecondYearPrivateAmount = TotalSecondYearPrivateAmount;
                    $scope.DistrictCollegeList.TotalCandidates = TotalCandidates;
                    $scope.DistrictCollegeList.GrandTotal = GrandTotal;
                } else {
                    alert("Data Not Found.");
                    $scope.colPageAdmissionList = [];
                    $scope.DrillDownList = [];
                    $scope.colPageAdmissionListForfirst = [];
                    $scope.CandidatesList = [];
                }
            }, function (error) {
                alert(error);
            });
        }

        $scope.GetCandidates = function (obj) {
            $scope.CandidatesList = [];
            var TotalRecorddata = ExamFeeDistTransSummService.GetCandidateDetailsTransSummByCollege(AppSettings.AcdYrID, obj.CollegeID, $scope.ExamID);
            TotalRecorddata.then(function (data) {
                $scope.CandidatesList = data;

                if (data.length > 0) {
                    $scope.CandidatesList.ColName = data[0].ColCode + ' - ' + data[0].ColName;
                    var GrandTotal = 0;
                    for (var i = 0; i < data.length; i++) {
                        GrandTotal += data[i]["TotalFees"];
                    }
                    $scope.CandidatesList.GrandTotal = GrandTotal;
                } else {
                    alert("Data Not Found.");
                    $scope.CandidatesList = [];
                    $scope.colPageAdmissionList = [];
                    $scope.DrillDownList = [];
                    $scope.colPageAdmissionListForfirst = [];
                    $scope.CandidatesList = [];
                }
            }, function (error) {
                alert(error);
            });
        }
    });
});