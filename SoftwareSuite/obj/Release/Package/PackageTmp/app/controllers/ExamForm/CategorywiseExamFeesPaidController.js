define(['app'], function (app) {
    app.controller("CategorywiseExamFeesPaidController", function ($scope, $http, $localStorage, $state, AppSettings, CategorywiseExamFeesPaidService) {
        $scope.DrillDownExamFeesPaid = {};
        $scope.adminuser = false;
        $scope.ifcoluser = false;
        $scope.VocGen = "G";
        $scope.Branch = "1,2";
        $scope.ExamID = "1";
        $scope.ShowPrint = false;
        $scope.AcdYrID = AppSettings.AcdYrID;
        $scope.ShowBtn = false;

        var AcdYrList = CategorywiseExamFeesPaidService.GetCurrentAcademicYearForDrillDown();
        AcdYrList.then(function (AcdYrdata) {
            $scope.AcdYrList = AcdYrdata;
            return AcdYrList;
        }, function (error) {
            alert(error);
            });

        var DistrictList = CategorywiseExamFeesPaidService.GetDistrictListByStateID(1);
        DistrictList.then(function (Districtdata, status, headers, config, error) {
            $scope.DistrictList = Districtdata;
        }, function (error) {
            alert(error);
            });


        var CategoryList = CategorywiseExamFeesPaidService.GetCategoryList();
        CategoryList.then(function (CategoryData, status, headers, config, error) {
            $scope.CategoryList = CategoryData;
        }, function (error) {
            alert(error);
            });


        var BasicManagementTypedata = CategorywiseExamFeesPaidService.GetBasicManagementTypeListWithAll();
        BasicManagementTypedata.then(function (data) {
            $("select#SelectYear")[0].selectedIndex = 1;
            $scope.DrillDownExamFeesPaid.AcdYrID = AppSettings.AcdYrID;
            $scope.BasicManagementTypeList = data;
            if (AppSettings.CollegeID != 0) {
                for (var i = 0; i < $scope.BasicManagementTypeList.length; i++) {
                    if ($scope.BasicManagementTypeList[i].MngtTypID == AppSettings.MngtTypID) {
                        $scope.BasicManagementTypeList[i].Selected = true;
                        $scope.ifcoluser = true;
                    }
                }
            }
            else
                for (var i = 0; i < $scope.BasicManagementTypeList.length; i++) {
                    if ($scope.BasicManagementTypeList[i].MngtTypID == 1) {
                        $scope.BasicManagementTypeList[i].Selected = true;
                        $scope.ifcoluser = false;
                    }
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
            $scope.adminuser = true;
        }
        else {
            $scope.adminuser = false;
        }
        $scope.changeVocGen = function (VocGen) {
            $scope.VocGen = VocGen;
            if ($scope.VocGen == "G") {
                $scope.Branch = "1,2";
            }
            else if ($scope.VocGen == "V") {
                $scope.Branch = "3";
            }
        }

        $scope.changeYear = function (ExamID) {
            $scope.ExamID = ExamID;
        }

        $scope.getcheckvalue = function (MngtTypID) {
            $scope.MngtTypIDSelected = "";
            for (var i = 0; i < $scope.BasicManagementTypeList.length; i++) {
                if ($scope.BasicManagementTypeList[i].Selected) {
                    if ($scope.MngtTypIDSelected == "") {
                        $scope.MngtTypIDSelected = $scope.BasicManagementTypeList[i].MngtTypID;

                        if ($scope.MngtTypIDSelected == 1) {

                        }
                        $scope.MngtTypName = $scope.BasicManagementTypeList[i].MngtTypName;
                    }
                    else {
                        $scope.MngtTypIDSelected = $scope.MngtTypIDs + ',' + $scope.BasicManagementTypeList[i].MngtTypID;
                    }
                }
            }
        }

        $scope.MngtTypIDs = "";
        $scope.Submit = function () {
            $scope.LoadImg = true;
            $scope.MngtTypIDs = "";

            var AcdYrSelect = document.getElementById("SelectYear");
            var AcdYrSelectText = AcdYrSelect.options[AcdYrSelect.selectedIndex].text;
            var DistrictSelect = document.getElementById("DistrictID");
            var DistrictSelectText = DistrictSelect.options[DistrictSelect.selectedIndex].text;

            var GroupSelect = document.getElementById("Group");
            var GroupSelectText = GroupSelect.options[GroupSelect.selectedIndex].text;

            var optionStream = "";
            var optionStreamName = "";
            var optionYear = "";
            var optionYearName = "";

            if ($scope.VocGen == "G") {
                optionStream = document.getElementById("General");
                optionStreamName = optionStream.name;
            }
            else if ($scope.VocGen == "V") {
                optionStream = document.getElementById("Vocational");
                optionStreamName = optionStream.name;
            }

            if ($scope.ExamID == 1) {
                optionYear = document.getElementById("IYear");
                optionYearName = optionYear.name;
            }
            else if ($scope.ExamID == 2) {
                optionYear = document.getElementById("IIYear");
                optionYearName = optionYear.name;
            }
            document.getElementById('HeadLabel').innerHTML = 'Exam Fee Transaction Report - Category wise <br/> Selection Criteria: &emsp;&emsp;&emsp; District: ' + DistrictSelectText + '&emsp;&emsp; Stream: ' + optionStreamName + '&emsp;&emsp; Year:' + optionYearName + '&emsp;&emsp; Category:' + GroupSelectText;
            document.getElementById('HeadLabelPopup').innerHTML = 'Exam Fee Transaction Report - Category wise <br/> Selection Criteria: &emsp;&emsp;&emsp; District: ' + DistrictSelectText + '&emsp;&emsp; Stream: ' + optionStreamName + '&emsp;&emsp; Year:' + optionYearName + '&emsp;&emsp; Category:' + GroupSelectText;

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
            $("#MangtLabelPopup").text('Management Type: ' + $scope.MngtName);
            if (AppSettings.CollegeID == 0) {
                if ($scope.MngtTypIDs == "") {
                    alert("Select atleast single management type");
                    return;
                }
            }

            if ($scope.VocGen == "G" && $scope.ExamID == 1)
                $scope.ExamIDPara = 1;
            else if ($scope.VocGen == "G" && $scope.ExamID == 2)
                $scope.ExamIDPara = 2;
            else if ($scope.VocGen == "V" && $scope.ExamID == 1)
                $scope.ExamIDPara = 3;
            else if ($scope.VocGen == "V" && $scope.ExamID == 2)
                $scope.ExamIDPara = 4;

            if (($scope.DrillDownExamFeesPaid.AcdYrID == "") || ($scope.DrillDownExamFeesPaid.AcdYrID == undefined)) {
                alert("Select Academic Year");
                return;
            }
            if (($scope.DrillDownExamFeesPaid.DistrictID == "") || ($scope.DrillDownExamFeesPaid.DistrictID == undefined)) {
                $scope.DrillDownExamFeesPaid.DistrictID = 0;
            }

            if (($scope.CategoryList.StudCatID == "") || ($scope.CategoryList.StudCatID == undefined)) {
                alert("Select Category");
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
                var TotalRecorddata = CategorywiseExamFeesPaidService.GetCategorywiseExamFeesPaidReport(AppSettings.AcdYrID, $scope.DrillDownExamFeesPaid.DistrictID, AppSettings.LoggedUserId, $scope.MngtTypIDs, $scope.Branch, $scope.ExamIDPara, $scope.CategoryList.StudCatID);
            }
            else {
                var gender = "";
                var TotalRecorddata = CategorywiseExamFeesPaidService.GetDrillExamFeesPaidReport(AppSettings.AcdYrID, $scope.DrillDownExamFeesPaid.DistrictID, AppSettings.LoggedUserId, $scope.MngtTypIDs, $scope.Branch, $scope.ExamIDPara, $scope.CategoryList.StudCatID);
            }
            TotalRecorddata.then(function (data) {
                if (data.length > 0) {
                    $scope.DrillDownList = data;
                    $scope.LoadImg = false;
                    if (AppSettings.SysUsrGrpID == 1) {
                        $scope.ShowPrint = true;
                    }
                    $scope.ShowBtn = true;
                    var TotalfirstYearTotalCandidates = 0;
                    var TotalfirstYearChallanNotGen = 0;
                    var TotalfirstYearChallanGen = 0;
                    var TotalfirstYearPaid = 0;
                    var TotalfirstYearChallanGenAmt = 0;
                    var TotalFirstYearAmount = 0;
                    var TotalFirstYearAmountDue = 0;
                    var TotalsecondYearTotalCandidates = 0;
                    var TotalsecondYearChallanNotGen = 0;
                    var TotalsecondYearChallanGen = 0;
                    var TotalsecondYearPaid = 0;
                    var TotalsecondYearChallanGenAmt = 0;
                    var TotalsecondYearAmount = 0;
                    var TotalsecondYearAmountDue = 0;

                    if ($scope.ExamID == 1) {
                        $scope.FirstYear = true;
                        $scope.SecondYear = false;
                        for (var i = 0; i < data.length; i++) {
                            TotalfirstYearTotalCandidates += data[i]["firstYearTotalCandidates"];
                            TotalfirstYearChallanNotGen += data[i]["firstYearChallanNotGen"];
                            TotalfirstYearChallanGen += data[i]["firstYearChallanGen"];
                            TotalfirstYearPaid += data[i]["firstYearPaid"];
                            TotalfirstYearChallanGenAmt += data[i]["firstYearChallanGenAmt"];
                            TotalFirstYearAmount += data[i]["FirstYearAmount"];
                            TotalFirstYearAmountDue += data[i]["FirstYearAmountDue"];
                        }
                    }
                    else {
                        $scope.FirstYear = false;
                        $scope.SecondYear = true;
                        for (var i = 0; i < data.length; i++) {
                            TotalfirstYearTotalCandidates += data[i]["firstYearTotalCandidates"];//1
                            TotalfirstYearChallanNotGen += data[i]["firstYearChallanNotGen"];//2
                            TotalfirstYearChallanGen += data[i]["firstYearChallanGen"];//3
                            TotalfirstYearPaid += data[i]["firstYearPaid"];//4
                            TotalfirstYearChallanGenAmt += data[i]["firstYearChallanGenAmt"];//5
                            TotalFirstYearAmount += data[i]["FirstYearAmount"];//6
                            TotalFirstYearAmountDue += data[i]["FirstYearAmountDue"];//7
                            TotalsecondYearTotalCandidates += data[i]["secondYearTotalCandidates"];//8
                            TotalsecondYearChallanNotGen += data[i]["secondYearChallanNotGen"];//9
                            TotalsecondYearChallanGen += data[i]["secondYearChallanGen"];//10
                            TotalsecondYearPaid += data[i]["secondYearPaid"];//11
                            TotalsecondYearChallanGenAmt += data[i]["secondYearChallanGenAmt"];//12
                            TotalsecondYearAmount += data[i]["secondYearAmount"];//13
                            TotalsecondYearAmountDue += data[i]["secondYearAmountDue"];//14
                        }
                    }

                    $scope.DrillDownList.TotalfirstYearTotalCandidates = TotalfirstYearTotalCandidates;
                    $scope.DrillDownList.TotalfirstYearChallanNotGen = TotalfirstYearChallanNotGen;
                    $scope.DrillDownList.TotalfirstYearChallanGen = TotalfirstYearChallanGen;
                    $scope.DrillDownList.TotalfirstYearPaid = TotalfirstYearPaid;
                    $scope.DrillDownList.TotalfirstYearChallanGenAmt = TotalfirstYearChallanGenAmt;
                    $scope.DrillDownList.TotalFirstYearAmount = TotalFirstYearAmount;
                    $scope.DrillDownList.TotalFirstYearAmountDue = TotalFirstYearAmountDue;
                    $scope.DrillDownList.TotalsecondYearTotalCandidates = TotalsecondYearTotalCandidates;
                    $scope.DrillDownList.TotalsecondYearChallanNotGen = TotalsecondYearChallanNotGen;
                    $scope.DrillDownList.TotalsecondYearChallanGen = TotalsecondYearChallanGen;
                    $scope.DrillDownList.TotalsecondYearPaid = TotalsecondYearPaid;
                    $scope.DrillDownList.TotalsecondYearChallanGenAmt = TotalsecondYearChallanGenAmt;
                    $scope.DrillDownList.TotalsecondYearAmount = TotalsecondYearAmount;
                    $scope.DrillDownList.TotalsecondYearAmountDue = TotalsecondYearAmountDue;
                    $scope.SetDefault();
                } else {
                    alert("Data Not Found.");
                    $scope.DrillDownList = [];
                    $scope.colPageAdmissionListForfirst = [];
                    $scope.LoadImg = false;
                    $scope.ShowPrint = false;
                }
            }, function (error) {
                alert(error);
                $scope.LoadImg = false;
                $scope.ShowPrint = false;
            });
        }
        $scope.PrintFeeReport = function () {
            $scope.LoadImg = true;
            var _url = AppSettings.WebApiUrl + 'api/DrillDownExamFeesPaid/GetDrillExamFeesPaidReportPDF?AcdYrID=' + AppSettings.AcdYrID + '&CollegeDistrictID=' + $scope.DrillDownExamFeesPaid.DistrictID + '&LoggedUserId=' + AppSettings.LoggedUserId + '&MngtTypIDs=' + $scope.MngtTypIDs + '&Branch=' + $scope.Branch + '&ExamIDPara=' + $scope.ExamIDPara;
            $http.get(_url).then(function (response) {
                if (response.headers('Content-type') == 'application/pdf') {
                    var link = document.createElement('a');
                    link.href = _url;
                    link.setAttribute("target", "_blank");
                    link.click();
                    $scope.LoadImg = false;
                }
            });
        }
        $scope.DrillDownList = [];
        $scope.colPageAdmissionListForfirst = [];
        $scope.GetCandidates = function (obj) {
            $scope.colPageAdmissionList = [];
            var TotalRecorddata = CategorywiseExamFeesPaidService.GetCandidateDetailsByCollegeCategory(AppSettings.AcdYrID, obj.CollegeID, $scope.ExamID, $scope.CategoryList.StudCatID);
            TotalRecorddata.then(function (data) {
                $scope.colPageAdmissionList = data;
                //$scope.SetDefault();
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

        $scope.SetDefault = function () {
            $scope.MngtTypName = $scope.MngtTypName;
            $scope.CourseName = $scope.CourseName;
            $scope.MainGrpName = $scope.MainGrpName;
            $scope.MediumName = $scope.MediumName;
            $scope.CasteName = $scope.CasteName;
            $scope.AcdYrName = $scope.AcdYrName;
            $scope.CollegeDistName = $scope.CollegeDistName;
        }
    });
});