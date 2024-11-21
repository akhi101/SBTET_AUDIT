define(['app'], function (app) {
    app.controller("ExamFeeDistTransactionSummaryController", function ($scope, $http, $localStorage, $state, AppSettings, ExamFeeDistTransactionSummaryService) {
        $scope.DrillDownExamFeesPaid = {};
        $scope.AcdYrID = AppSettings.AcdYrID;
        $scope.DistrictID = "0";
        var AcdYrList = ExamFeeDistTransactionSummaryService.GetCurrentAcademicYearForDrillDown();
        AcdYrList.then(function (AcdYrdata) {
            $scope.AcdYrList = AcdYrdata;
            return AcdYrList;
        }, function (error) {
            alert(error);
        });

        var DistrictList = ExamFeeDistTransactionSummaryService.GetDistrictListByStateID(1);
        DistrictList.then(function (Districtdata, status, headers, config, error) {
            $scope.DistrictList = Districtdata;
        }, function (error) {
            alert(error);
        });
        //var BasicManagementTypedata = ExamFeeTransactionSummaryService.GetBasicManagementTypeListWithAll();
        //BasicManagementTypedata.then(function (data) {
        //    $scope.BasicManagementTypeList = data;
        //    if (AppSettings.CollegeID != 0) {
        //        for (var i = 0; i < $scope.BasicManagementTypeList.length; i++) {
        //            if ($scope.BasicManagementTypeList[i].MngtTypID == AppSettings.MngtTypID) {
        //                $scope.BasicManagementTypeList[i].Selected = true;
        //                $scope.ifcoluser = true;
        //            }
        //        }
        //    }
        //    else {
        //        for (var i = 0; i < $scope.BasicManagementTypeList.length; i++) {
        //            if ($scope.BasicManagementTypeList[i].MngtTypID == 1) {
        //                $scope.BasicManagementTypeList[i].Selected = true;
        //                $scope.ifcoluser = false;
        //            }
        //        }
        //    }
        //    $("select#SelectYear")[0].selectedIndex = 1;
        //    $scope.DrillDownExamFeesPaid.AcdYrID = AppSettings.AcdYrID;
        //}, function (error) {
        //    alert(error);
        //});

        

        //if ((AppSettings.SysUsrGrpID == 1) || (AppSettings.SysUsrGrpID == 7)) {
        //    $scope.adminUserMgmtType = true;
        //}
        //else {
        //    $scope.adminUserMgmtType = false;
        //}

        //if (AppSettings.SysUsrGrpID == 1) {
        //    $scope.adminuser = true;
        //}
        //else {
        //    $scope.adminuser = false;
        //}
        //$scope.changeVocGen = function (VocGen) {
        //    $scope.VocGen = VocGen;
        //    if ($scope.VocGen == "G") {
        //        $scope.Branch = "1,2";
        //    }
        //    else if ($scope.VocGen == "V") {
        //        $scope.Branch = "3";
        //    }
        //}

        //$scope.getcheckvalue = function (MngtTypID) {
        //    $scope.MngtTypIDSelected = "";
        //    for (var i = 0; i < $scope.BasicManagementTypeList.length; i++) {
        //        if ($scope.BasicManagementTypeList[i].Selected) {
        //            if ($scope.MngtTypIDSelected == "") {
        //                $scope.MngtTypIDSelected = $scope.BasicManagementTypeList[i].MngtTypID;

        //                if ($scope.MngtTypIDSelected == 1) {

        //                }
        //                $scope.MngtTypName = $scope.BasicManagementTypeList[i].MngtTypName;
        //            }
        //            else {
        //                $scope.MngtTypIDSelected = $scope.MngtTypIDs + ',' + $scope.BasicManagementTypeList[i].MngtTypID;
        //            }
        //        }
        //    }
        //}

        

        //$scope.MngtTypIDs = "";
        //$scope.Submit = function () {
        //    $scope.LoadImg = true;
        //    $scope.MngtTypIDs = "";
        //    for (var i = 0; i < $scope.BasicManagementTypeList.length; i++) {
        //        if ($scope.BasicManagementTypeList[i].Selected) {
        //            if ($scope.MngtTypIDs == "") {
        //                $scope.MngtTypIDs = $scope.BasicManagementTypeList[i].MngtTypID;
        //                $scope.MngtTypName = $scope.BasicManagementTypeList[i].MngtTypName;
        //            }
        //            else {
        //                 $scope.MngtTypIDs = $scope.MngtTypIDs + ',' + $scope.BasicManagementTypeList[i].MngtTypID;
        //            }
        //        }
        //    }
        //    if (AppSettings.CollegeID == 0) {
        //        if ($scope.MngtTypIDs == "") {
        //            alert("Select atleast single management type");
        //            return;
        //        }
        //    }            

        //    if (($scope.DrillDownExamFeesPaid.AcdYrID == "") || ($scope.DrillDownExamFeesPaid.AcdYrID == undefined)) {
        //        alert("Select Academic Year");
        //        return;
        //    }
        //    if (($scope.DrillDownExamFeesPaid.DistrictID == "") || ($scope.DrillDownExamFeesPaid.DistrictID == undefined)) {
        //        $scope.DrillDownExamFeesPaid.DistrictID = 0;
        //    }
        //    var Feestatus = 0;
        //    $scope.MngtTypName = "ALL";
        //    $scope.CourseName = "ALL";
        //    $scope.MainGrpName = "ALL";
        //    $scope.MediumName = "ALL";
        //    $scope.CasteName = "ALL";
        //    $scope.AcdYrName = "ALL";
        //    $scope.CollegeDistName = "ALL";
        //    for (var i = 0; i < $scope.AcdYrList.length; i++) {
        //        if ($scope.AcdYrList[i].AcdYrID == $scope.DrillDownExamFeesPaid.AcdYrID) {
        //            $scope.AcdYrName = $scope.AcdYrList[i].AcdYrName;
        //        }
        //    }
        //    for (var i = 0; i < $scope.DistrictList.length; i++) {
        //        if ($scope.DistrictList[i].DistrictID == $scope.DrillDownExamFeesPaid.DistrictID) {
        //            $scope.CollegeDistName = $scope.DistrictList[i].DistName;
        //        }
        //    }
        //    if (AppSettings.CollegeID == 0) {
        //        var TotalRecorddata = ExamFeeTransactionSummaryService.GetExamFeeTransactionSummary(AppSettings.AcdYrID, $scope.DrillDownExamFeesPaid.DistrictID, AppSettings.LoggedUserId, $scope.MngtTypIDs, $scope.Branch);
        //    }
        //    else {
        //        var gender = "";
        //        var TotalRecorddata = ExamFeeTransactionSummaryService.GetCollegeExamFeeTransactionSummary(AppSettings.AcdYrID, AppSettings.CollegeID);
        //    }
        //    TotalRecorddata.then(function (data) {
        //        if (data.length > 0) {
        //            $scope.DrillDownList = data;
        //            $scope.LoadImg = false;
        //            $scope.ShowTransactionSummary = true;


        //            var TotalFirstYearRegularPaid = 0;
        //            var TotalFirstYearRegularAmount = 0;
        //            var TotalSecondYearRegularPaid = 0;
        //            var TotalSecondYearRegularAmount = 0;
        //            var TotalSecondYearPrivatePaid = 0;
        //            var TotalSecondYearPrivateAmount = 0;
        //            var GrandTotal = 0;

        //            for (var i = 0; i < data.length; i++) {
        //                TotalFirstYearRegularPaid += data[i]["FirstYearRegularPaid"];
        //                TotalFirstYearRegularAmount += data[i]["FirstYearRegularAmount"];
        //                TotalSecondYearRegularPaid += data[i]["SecondYearRegularPaid"];
        //                TotalSecondYearRegularAmount += data[i]["SecondYearRegularAmount"];
        //                TotalSecondYearPrivatePaid += data[i]["SecondYearPrivatePaid"];
        //                TotalSecondYearPrivateAmount += data[i]["SecondYearPrivateAmount"];
        //                GrandTotal += data[i]["CollegeTotal"];
        //            }
        //            $scope.DrillDownList.TotalFirstYearRegularPaid = TotalFirstYearRegularPaid;
        //            $scope.DrillDownList.TotalFirstYearRegularAmount = TotalFirstYearRegularAmount;
        //            $scope.DrillDownList.TotalSecondYearRegularPaid = TotalSecondYearRegularPaid;
        //            $scope.DrillDownList.TotalSecondYearRegularAmount = TotalSecondYearRegularAmount;
        //            $scope.DrillDownList.TotalSecondYearPrivatePaid = TotalSecondYearPrivatePaid;
        //            $scope.DrillDownList.TotalSecondYearPrivateAmount = TotalSecondYearPrivateAmount;
        //            $scope.DrillDownList.GrandTotal = GrandTotal;

        //        } else {
        //            alert("Data Not Found.");
        //            $scope.DrillDownList = [];
        //            $scope.colPageAdmissionListForfirst = [];
        //            $scope.LoadImg = false;
        //        }
        //    }, function (error) {
        //        alert(error);
        //        $scope.LoadImg = false;
        //    });
        //}
        //$scope.DrillDownList = [];
        //$scope.colPageAdmissionListForfirst = [];

        //$scope.GetCandidates = function (obj) {
        //    $scope.colPageAdmissionList = [];
        //    var TotalRecorddata = ExamFeeTransactionSummaryService.GetCandidateDetailsTransSummByCollege(AppSettings.AcdYrID, obj.CollegeID);
        //    TotalRecorddata.then(function (data) {
        //        $scope.colPageAdmissionList = data;

        //        if (data.length > 0) {
        //            $scope.colPageAdmissionList.ColName = data[0].ColName;
        //            var GrandTotal = 0;
        //            for (var i = 0; i < data.length; i++) {
        //                GrandTotal += data[i]["FormFees"];
        //            }
        //            $scope.DrillDownList.GrandTotal = GrandTotal;
        //        } else {
        //            alert("Data Not Found.");
        //            $scope.colPageAdmissionList = [];
        //        }
        //    }, function (error) {
        //        alert(error);
        //    });
        //}

        //$scope.SetDefault = function () {
        //    $scope.MngtTypName = $scope.MngtTypName;
        //    $scope.CourseName = $scope.CourseName;
        //    $scope.MainGrpName = $scope.MainGrpName;
        //    $scope.MediumName = $scope.MediumName;
        //    $scope.CasteName = $scope.CasteName;
        //    $scope.AcdYrName = $scope.AcdYrName;
        //    $scope.CollegeDistName = $scope.CollegeDistName;
        //}       

        //$scope.GeneratePDF = function () {
        //    $scope.LoadImg = true;
        //    $scope.MngtTypIDs = "";
        //    for (var i = 0; i < $scope.BasicManagementTypeList.length; i++) {
        //        if ($scope.BasicManagementTypeList[i].Selected) {
        //            if ($scope.MngtTypIDs == "") {
        //                $scope.MngtTypIDs = $scope.BasicManagementTypeList[i].MngtTypID;
        //                $scope.MngtTypName = $scope.BasicManagementTypeList[i].MngtTypName;
        //            }
        //            else {
        //                $scope.MngtTypIDs = $scope.MngtTypIDs + ',' + $scope.BasicManagementTypeList[i].MngtTypID;
        //            }
        //        }
        //    }
        //    if (AppSettings.CollegeID == 0) {
        //        if ($scope.MngtTypIDs == "") {
        //            alert("Select atleast single management type");
        //            return;
        //        }
        //    }

        //    if (($scope.DrillDownExamFeesPaid.AcdYrID == "") || ($scope.DrillDownExamFeesPaid.AcdYrID == undefined)) {
        //        alert("Select Academic Year");
        //        return;
        //    }
        //    if (($scope.DrillDownExamFeesPaid.DistrictID == "") || ($scope.DrillDownExamFeesPaid.DistrictID == undefined)) {
        //        $scope.DrillDownExamFeesPaid.DistrictID = 0;
        //    }
        //    var Feestatus = 0;
        //    $scope.MngtTypName = "ALL";
        //    $scope.CourseName = "ALL";
        //    $scope.MainGrpName = "ALL";
        //    $scope.MediumName = "ALL";
        //    $scope.CasteName = "ALL";
        //    $scope.AcdYrName = "ALL";
        //    $scope.CollegeDistName = "ALL";
        //    for (var i = 0; i < $scope.AcdYrList.length; i++) {
        //        if ($scope.AcdYrList[i].AcdYrID == $scope.DrillDownExamFeesPaid.AcdYrID) {
        //            $scope.AcdYrName = $scope.AcdYrList[i].AcdYrName;
        //        }
        //    }
        //    for (var i = 0; i < $scope.DistrictList.length; i++) {
        //        if ($scope.DistrictList[i].DistrictID == $scope.DrillDownExamFeesPaid.DistrictID) {
        //            $scope.CollegeDistName = $scope.DistrictList[i].DistName;
        //        }
        //    }
        //    if (AppSettings.CollegeID == 0) {
        //        var TotalRecorddata = ExamFeeTransactionSummaryService.GeneratePDF(AppSettings.AcdYrID, $scope.DrillDownExamFeesPaid.DistrictID, AppSettings.LoggedUserId, $scope.MngtTypIDs, $scope.Branch);
        //    }
        //    else {
        //        var gender = "";
        //        var TotalRecorddata = ExamFeeTransactionSummaryService.GetCollegeExamFeeTransactionSummary(AppSettings.AcdYrID, AppSettings.CollegeID);
        //    }
        //    TotalRecorddata.then(function (data) {
        //        if (data.length > 0) {
        //            $scope.DrillDownList = data;
        //            $scope.DrillDownList.ReturnFilePath = data[0].ReturnFilePath;
        //            $scope.LoadImg = false;
        //            $("#viewpdf").attr("src", $scope.DrillDownList.ReturnFilePath);
        //            $("#viewpdf").load("");
        //        } else {
        //            alert("Data Not Found.");
        //            $scope.DrillDownList = [];
        //            $scope.colPageAdmissionListForfirst = [];
        //            $scope.LoadImg = false;
        //        }
        //    }, function (error) {
        //        alert(error);
        //        $scope.LoadImg = false;
        //        });
        //}
        //$(document).ready(function () {
        //    $(window).focus(function () {
        //        $("#viewpdf").load("");
        //    });
        //});
    });
});