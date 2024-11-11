define(['app'], function (app) {
    app.controller("ExamFeesPaidListController", function ($scope, $state, AppSettings, ExamFeesPaidService, ExamFormsCancelService) {
       // $scope.Success = { AcqResponseCode: $stateParams.AcqResponseCode, MerchTxnRef: $stateParams.MerchTxnRef };
        $scope.ExamFeesPaidList = {};
        $scope.CompanyName = AppSettings.CompanyName;
        $scope.LoginYear = AppSettings.SelectedYear;
        var PageNm = $state.current.name.split(".")[1];
        var RightForCurrentPage = [];
        var UsersRightsdata = [];
        UsersRightsdata = AppSettings.UserRights;
        for (var i = 0; i < UsersRightsdata.length; i++) {
            if (UsersRightsdata[i].GridFormToOpen == PageNm) {
                if (UsersRightsdata[i].isupdatable == 'Y') {
                    $scope.RollEditDisable = false;
                } else {
                    $scope.RollEditDisable = true;
                }
            }
        }
        $scope.ForBoardDisable = true;
        if (AppSettings.CollegeID == 0) {
            $scope.ForBoardDisable = false;
            var DistrictList = ExamFormsCancelService.GetDistrictListByStateID(1);
            DistrictList.then(function (Districtdata, status, headers, config, error) {
                $scope.DistrictList = Districtdata;
            }, function (error) {
                alert(error);
            });
        } else { $scope.ExamFeesPaidList.CollegeID = AppSettings.CollegeID; }
        $scope.FillMandal = function (DistrictID) {
            if ((DistrictID > 0) || (DistrictID != undefined)) {
                $scope.CourseList = [];
                $scope.ExamList = [];
                $scope.MainGroupList = [];
                $scope.CollegeList = [];
                $scope.MandalList = [];
                $scope.MandalDisable = false;
                $scope.CollegeDisable = false;
                var MandalList = ExamFormsCancelService.GetMandalListByDistrict(DistrictID);
                MandalList.then(function (MandalListdata, status, headers, config, error) {
                    $scope.MandalList = MandalListdata;
                }, function (error) {
                    alert(error);
                });
            }
        }
        $scope.FillCollege = function (MandalID) {
            if ((MandalID > 0) || (MandalID != undefined)) {
                $scope.CourseList = [];
                $scope.ExamList = [];
                $scope.MainGroupList = [];
                $scope.CollegeList = [];
                var CollegeList = ExamFormsCancelService.GetCollegeListByDistrictAndMandal($scope.ExamFeesPaidList.DistrictID, MandalID);
                CollegeList.then(function (CollegeListdata, status, headers, config, error) {
                    if (CollegeListdata.length == 0) {
                        $scope.CollegeList = [];
                        alert("There is no college in this mandal");
                        return;
                    } else {
                        $scope.CollegeList = CollegeListdata;
                        $scope.GovtColEnroll.CollegeID = "";
                    }
                }, function (error) {
                    alert(error);
                });
            }
        }
        $scope.FillCollData = function (CollegeID) {
            if (CollegeID != null) {
                $scope.CourseList = [];
                $scope.ExamList = [];
                $scope.MainGroupList = [];

                var CourseList = ExamFormsCancelService.GetCourseListForRegStud($scope.ExamFeesPaidList.CollegeID);
                CourseList.then(function (BasicCoursedata, status, headers, config, error) {
                    $scope.CourseList = BasicCoursedata;
                }, function (error) {
                    alert(error);
                });
            }
        }
        if (AppSettings.CollegeID != 0) {
            var CourseList = ExamFormsCancelService.GetCourseListForRegStud(AppSettings.CollegeID);
            CourseList.then(function (BasicCoursedata, status, headers, config, error) {
                $scope.CourseList = BasicCoursedata;
            }, function (error) {
                alert(error);
            });
        }
        $scope.FillCoursePart = function (CourseID) {
            $scope.ExamList = [];
            $scope.MainGroupList = [];
            if ((CourseID != "") && (CourseID != null)) {
                var ExamList = ExamFormsCancelService.GetBasicExamList(CourseID, AppSettings.AcdYrID);
                ExamList.then(function (BasicExamdata, status, headers, config, error) {
                    $scope.ExamList = BasicExamdata;
                    var MainGroupList = ExamFormsCancelService.GetMainGroupListByCollegeId($scope.ExamFeesPaidList.CollegeID, CourseID, AppSettings.AcdYrID);
                    MainGroupList.then(function (MainGroupListdata, status, headers, config, error) {
                        $scope.MainGroupList = MainGroupListdata;
                    }, function (error) {
                        alert(error);
                    });
                }, function (error) {
                    alert(error);
                });
            }
        }
        var CollegeTransferList = ExamFeesPaidService.GetCollegeTransferDates(AppSettings.ExamInstID);
        CollegeTransferList.then(function (CollegeTransferDatedata, status, headers, config, error) {
            $scope.CollegeTransferList = CollegeTransferDatedata;
        }, function (error) {
            alert(error);
        });
        var gridColumns = [
            { headerTemplateID: "#headerTemplate", template: true, templateID: "#checkboxTemplate", textAlign: ej.TextAlign.Center, width: 50 },
            { field: "CheckStudent", headerText: "CheckStudent", visible: false, textAlign: ej.TextAlign.Left, width: 40 },
            { field: "PRNNo", headerText: "PRN No", textAlign: ej.TextAlign.Right, width: 90, allowEditing: false },
            { field: "StudName", headerText: "Student Name", textAlign: ej.TextAlign.Left, width: 150, allowEditing: false },
            { field: "Fathername", headerText: "Father Name", textAlign: ej.TextAlign.Left, width: 150, allowEditing: false },
            { field: "StudCatID", headerText: "Category", textAlign: ej.TextAlign.Right, width: 60, allowEditing: false },
            { field: "RegularFees", headerText: "Regular Fee", textAlign: ej.TextAlign.Right, width: 60, allowEditing: false },
            { field: "LateFees", headerText: "Late Fee", textAlign: ej.TextAlign.Right, width: 60, allowEditing: false },
            { field: "FormFees", headerText: "Total Fee", textAlign: ej.TextAlign.Right, width: 60, allowEditing: false },
            { field: "MainGrpName", headerText: "Group", textAlign: ej.TextAlign.Left, width: 60 },
            { field: "MediumName", headerText: "Medium", textAlign: ej.TextAlign.Left, width: 60 },
            { field: "SubName", headerText: "Second Lang.", textAlign: ej.TextAlign.Left, width: 80 },
            //{ field: "Formno", headerText: "Form No.", textAlign: ej.TextAlign.Right, width: 100, allowEditing: false },
            //{ field: "CollegeLateFees", headerText: "College Late Fee", textAlign: ej.TextAlign.Right, width: 60, allowEditing: false },
            { field: "PhysDisbCode", headerText: "Ph.", textAlign: ej.TextAlign.Right, width: 30, allowEditing: false },
            { field: "CasteName", headerText: "Caste", textAlign: ej.TextAlign.Right, width: 50, allowEditing: false },
            { field: "FirstYearSubjects", headerText: "1st Yr Subjects", textAlign: ej.TextAlign.Right, width: 200, allowEditing: false },
            { field: "SecondYearSubjects", headerText: "2nd Yr Subjects", textAlign: ej.TextAlign.Right, width: 200, allowEditing: false },
            { field: "ExmFrmID", headerText: "ExmFrmID", visible: true, textAlign: ej.TextAlign.Right, width: 0 },
            { field: "ExamInstID", headerText: "ExamInstID", visible: true, textAlign: ej.TextAlign.Right, width: 0 },
        ];
        $scope.ExamfeesData = [];
        $("#Examfees").ejGrid({
            dataSource: $scope.ExamfeesData,
            allowEditing: true,
            allowSearching: true,
            allowScrolling: true,
            allowResizeToFit: true,
            allowFiltering: true,
            toolbarSettings: { showToolbar: true, toolbarItems: [ej.Grid.ToolBarItems.WordExport, ej.Grid.ToolBarItems.ExcelExport, ej.Grid.ToolBarItems.PdfExport, ej.Grid.ToolBarItems.Search] },
            toolbarClick: function (args) {
                if (args.itemName == "Add") {
                    args.cancel = true;
                    AddNew();
                }
                if (args.itemName == "Excel Export") {
                    args.cancel = true;
                    this.export(AppSettings.ExportToExcelUrl);
                }
                if (args.itemName == "Word Export") {
                    args.cancel = true;
                    this.export(AppSettings.ExportToWordUrl);
                }
                if (args.itemName == "PDF Export") {
                    args.cancel = true;
                    this.export(AppSettings.ExportToPdfUrl);
                }
            },
            columns: gridColumns
        });
        $scope.Show = function () {
            if (($scope.ExamFeesPaidList.CourseID == undefined) || ($scope.ExamFeesPaidList.CourseID == "")) {
                alert("Select stream");
                return;
            }
            if (($scope.ExamFeesPaidList.ExamID == undefined) || ($scope.ExamFeesPaidList.ExamID == "")) {
                alert("Select Exam");
                return;
            }
            if (($scope.ExamFeesPaidList.CollegeTransferDates == undefined) || ($scope.ExamFeesPaidList.CollegeTransferDates == "")) {
                alert("Select College Transfer Date");
                return;
            }
            var ExamFormData = ExamFeesPaidService.GetExamFeesPaidList(AppSettings.ExamInstID, $scope.ExamFeesPaidList.CollegeID, $scope.ExamFeesPaidList.CourseID, $scope.ExamFeesPaidList.ExamID, $scope.ExamFeesPaidList.CollegeTransferDates);
            ExamFormData.then(function (data, status, headers, config, error) {
                if (data.length == 0) {
                    alert("Data not found");
                    $scope.ExamfeesData = [];
                    $scope.ExamFeesPaidList.TotalCondidate = 0;
                    $scope.ExamFeesPaidList.TotalFeeAmount = 0;
                    return;
                } else {
                    $scope.ExamFeesPaidList.TotalCondidate = 0;
                    $scope.ExamFeesPaidList.TotalFeeAmount = 0;
                    for (var k = 0; k < data.length; k++) {
                        data[k].CheckStudent = 1;
                        var tot = 0;
                        var totAmount = 0;
                        tot = $scope.ExamFeesPaidList.TotalCondidate + 1;
                        $('#TotalCondidate').val(tot);
                        $scope.ExamFeesPaidList.TotalCondidate = tot;
                        totAmount = $scope.ExamFeesPaidList.TotalFeeAmount + data[k].FormFees; //+ data[k].CollegeLateFees;
                        $('#TotalFeeAmount').val(totAmount);
                        $scope.ExamFeesPaidList.TotalFeeAmount = totAmount;
                    }
                    $scope.ExamfeesData = data;
                }
            }, function (data, status, headers, config) {
                alert(error);
            });
        }
        $scope.SaveExamFeesPaid = function () {
            if ($scope.ExamfeesData.length == 0) {
                alert("No data found should be there");
                return;
            }
            var examReg = [];
            var OrderID = makeid();
           // OrderID = "CAZSNRYO";
            $scope.FeetotAmount = 0;
            for (var i = 0; i < $scope.ExamfeesData.length; i++) {
                if ($scope.ExamfeesData[i].CheckStudent == 1) {
                    var obj = {};
                    obj.ExmFrmID = $scope.ExamfeesData[i].ExmFrmID;
                    obj.FormFees = $scope.ExamfeesData[i].FormFees;
                    obj.CollegeLateFees = $scope.ExamfeesData[i].CollegeLateFees;
                    $scope.FeetotAmount = $scope.FeetotAmount + $scope.ExamfeesData[i].FormFees;// + $scope.ExamfeesData[i].CollegeLateFees;
                    obj.CollegeID = AppSettings.CollegeID;
                    obj.PRNNo = $scope.ExamfeesData[i].PRNNo;
                    obj.ExamInstID = AppSettings.ExamInstID;
                    obj.MerchTxnRef = OrderID;
                    obj.AcdYrID = AppSettings.AcdYrID;
                    obj.ExamID = $scope.ExamFeesPaidList.ExamID;
                    examReg.push(obj);
                }
            }
            if (examReg.length == 0) {
                alert("No Any Rows Selected");
                return;
            }
            var StudCheckData = ExamFeesPaidService.StudCheckData(examReg);
            StudCheckData.then(function (data) {
                var payurl = AppSettings.PaymentUrl + '?FormNo=' + 61 + "&ServiceID=" + 61 + "&FeeAmount=" + $scope.FeetotAmount + "&OrderID=" + OrderID + "&CollegeID=" + AppSettings.CollegeID;
               // payurl = "http://localhost:25490/Content/PaymentGatewayResponseBD.aspx";
                window.open(payurl, '_self');
            }
                , function (error) {
                    alert(error);
                });
            //var payurl = AppSettings.PaymentUrl + '?FormNo=' + 61 + "&ServiceID=" + 61 + "&FeeAmount=" + $scope.FeetotAmount;
            //window.open(payurl, '_self');

            //if ($scope.Success.AcqResponseCode == '0300') { 
            //var examRegdata = ExamFeesPaidService.PostExamRegBatchNo(examReg);
            //examRegdata.then(function (data) {
            //    alert("Fee Paid Successfully");
            //    $scope.ExamfeesData = [];
            //    $scope.ExamFeesPaidList.TotalCondidate = 0;
            //    $scope.ExamFeesPaidList.TotalFeeAmount = 0;
            //}, function (error) {
            //    alert(error);
            //});
           // }
        }
        $scope.ExamFeesPaidList.TotalCondidate = 0;
        $scope.ExamFeesPaidList.TotalFeeAmount = 0;

        function makeid() {
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

            for (var i = 0; i < 8; i++)
                text += possible.charAt(Math.floor(Math.random() * possible.length));

            return text;
        }

        function checkChange(e) {
            gridObj = $("#Examfees").data("ejGrid");
            var rowCheck = $(".rowCheckbox:checked"), cp = gridObj.model.pageSettings.currentPage;
            e.cancel = true;
            $(".rowCheckbox").ejCheckBox({ "checked": true });
            return;
            for (var k = 0; k < $scope.ExamfeesData.length; k++) {
                var totAmount = 0;
                var tot = 0;
                if (gridObj.model.selectedRecords[0] != undefined) {
                    if (gridObj.model.selectedRecords[0].ExmFrmID == $scope.ExamfeesData[k].ExmFrmID) {
                        var tot = 0;
                        var totAmount = 0;
                        if (e.isChecked == true) {
                            $scope.ExamfeesData[k].CheckStudent = 1;
                            tot = $scope.ExamFeesPaidList.TotalCondidate + 1;
                            $('#TotalCondidate').val(tot);
                            $scope.ExamFeesPaidList.TotalCondidate = tot;
                            if ($scope.ExamFeesPaidList.TotalFeeAmount == undefined) { $scope.ExamFeesPaidList.TotalFeeAmount = 0; }
                            totAmount = $scope.ExamFeesPaidList.TotalFeeAmount + $scope.ExamfeesData[k].FormFees;
                            $('#TotalFeeAmount').val(totAmount);
                            $scope.ExamFeesPaidList.TotalFeeAmount = totAmount;
                        }
                        else {
                            $scope.ExamfeesData[k].CheckStudent = 0;
                            tot = $scope.ExamFeesPaidList.TotalCondidate - 1;
                            $('#TotalCondidate').val(tot);
                            $scope.ExamFeesPaidList.TotalCondidate = tot;
                            totAmount = $scope.ExamFeesPaidList.TotalFeeAmount - $scope.ExamfeesData[k].FormFees;
                            $('#TotalFeeAmount').val(totAmount);
                            $scope.ExamFeesPaidList.TotalFeeAmount = totAmount;
                        }
                    }
                }
            }

            //if ($("#headchk").is(':checked')) {
            //    for (var k = 0; k < $scope.ExamfeesData.length; k++) {
            //        $scope.ExamfeesData[k].CheckStudent = 1;
            //        if ($scope.ExamFeesPaidList.TotalCondidate == undefined) { $scope.ExamFeesPaidList.TotalCondidate = 0; }
            //        var tot = 0;
            //        tot = $scope.ExamFeesPaidList.TotalCondidate + 1;
            //        $('#TotalCondidate').val(tot);
            //        $scope.ExamFeesPaidList.TotalCondidate = tot;

            //        if ($scope.ExamFeesPaidList.TotalFeeAmount == undefined) { $scope.ExamFeesPaidList.TotalFeeAmount = 0; }
            //        var totAmount = 0;
            //        totAmount = $scope.ExamFeesPaidList.TotalFeeAmount + $scope.ExamfeesData[k].FormFees;
            //        $('#TotalFeeAmount').val(totAmount);
            //        $scope.ExamFeesPaidList.TotalFeeAmount = totAmount;
            //        return;
            //    }
            //} else {
            //    if (gridObj.model.selectedRecords[0] == undefined) {
            //        for (var k = 0; k < $scope.ExamfeesData.length; k++) {
            //            $scope.ExamfeesData[k].CheckStudent = 0;
            //            if ($scope.ExamFeesPaidList.TotalCondidate == undefined) { $scope.ExamFeesPaidList.TotalCondidate = 0; }
            //            var tot = 0;
            //            tot = $scope.ExamFeesPaidList.TotalCondidate - 1;
            //            $('#TotalCondidate').val(tot);
            //            $scope.ExamFeesPaidList.TotalCondidate = tot;

            //            if ($scope.ExamFeesPaidList.TotalFeeAmount == undefined) { $scope.ExamFeesPaidList.TotalFeeAmount = 0; }
            //            var totAmount = 0;
            //            totAmount = $scope.ExamFeesPaidList.TotalFeeAmount - $scope.ExamfeesData[k].FormFees;
            //            $('#TotalFeeAmount').val(totAmount);
            //            $scope.ExamFeesPaidList.TotalFeeAmount = totAmount;
            //            return;
            //        }
            //    } else {

            //        if (e.isChecked == true) {
            //            for (var k = 0; k < $scope.ExamfeesData.length; k++) {
            //                if (gridObj.model.selectedRecords[0].ExmFrmID == $scope.ExamfeesData[k].ExmFrmID) {
            //                    if ((gridObj.model.selectedRecords[0].CheckStudent == 0) || (gridObj.model.selectedRecords[0].CheckStudent == undefined)) {
            //                        $scope.ExamfeesData[k].CheckStudent = 1;
            //                        if ($scope.ExamFeesPaidList.TotalCondidate == undefined) { $scope.ExamFeesPaidList.TotalCondidate = 0; }
            //                        var tot = 0;
            //                        tot = $scope.ExamFeesPaidList.TotalCondidate + 1;
            //                        $('#TotalCondidate').val(tot);
            //                        $scope.ExamFeesPaidList.TotalCondidate = tot;

            //                        if ($scope.ExamFeesPaidList.TotalFeeAmount == undefined) { $scope.ExamFeesPaidList.TotalFeeAmount = 0; }
            //                        var totAmount = 0;
            //                        totAmount = $scope.ExamFeesPaidList.TotalFeeAmount + $scope.ExamfeesData[k].FormFees;
            //                        $('#TotalFeeAmount').val(totAmount);
            //                        $scope.ExamFeesPaidList.TotalFeeAmount = totAmount;
            //                        return;
            //                    }
            //                }
            //            }
            //        } else {
            //            for (var k = 0; k < $scope.ExamfeesData.length; k++) {
            //                if (gridObj.model.selectedRecords[0].ExmFrmID == $scope.ExamfeesData[k].ExmFrmID) {
            //                    if (gridObj.model.selectedRecords[0].CheckStudent == 1) {
            //                        $scope.ExamfeesData[k].CheckStudent = 0;
            //                        if ($scope.ExamFeesPaidList.TotalCondidate == undefined) { $scope.ExamFeesPaidList.TotalCondidate = 0; }
            //                        var tot = 0;
            //                        tot = $scope.ExamFeesPaidList.TotalCondidate - 1;
            //                        $('#TotalCondidate').val(tot);
            //                        $scope.ExamFeesPaidList.TotalCondidate = tot;

            //                        if ($scope.ExamFeesPaidList.TotalFeeAmount == undefined) { $scope.ExamFeesPaidList.TotalFeeAmount = 0; }
            //                        var totAmount = 0;
            //                        totAmount = $scope.ExamFeesPaidList.TotalFeeAmount - $scope.ExamfeesData[k].FormFees;
            //                        $('#TotalFeeAmount').val(totAmount);
            //                        $scope.ExamFeesPaidList.TotalFeeAmount = totAmount;
            //                        return;
            //                    }
            //                }
            //            }
            //        }
            //    }
            //}
        }
        function headCheckChange(e) {
            $("#Examfees .rowCheckbox").ejCheckBox({ "change": checkChange });
            gridObj = $("#Examfees").data("ejGrid");
            if ($("#headchk").is(':checked')) {
                $(".rowCheckbox").ejCheckBox({ "checked": true });
                for (var k = 0; k < $scope.ExamfeesData.length; k++) {
                    $scope.ExamfeesData[k].CheckStudent = 1;
                    if ($scope.ExamFeesPaidList.TotalCondidate == undefined) { $scope.ExamFeesPaidList.TotalCondidate = 0; }
                    var tot = 0;
                    tot = $scope.ExamFeesPaidList.TotalCondidate + 1;
                    $('#TotalCondidate').val(tot);
                    $scope.ExamFeesPaidList.TotalCondidate = tot;

                    if ($scope.ExamFeesPaidList.TotalFeeAmount == undefined) { $scope.ExamFeesPaidList.TotalFeeAmount = 0; }
                    var totAmount = 0;
                    totAmount = $scope.ExamFeesPaidList.TotalFeeAmount + $scope.ExamfeesData[k].FormFees;
                    $('#TotalFeeAmount').val(totAmount);
                    $scope.ExamFeesPaidList.TotalFeeAmount = totAmount;
                }
            }
            else {
                $(".rowCheckbox").ejCheckBox({ "checked": false });
                for (var k = 0; k < $scope.ExamfeesData.length; k++) {
                    $scope.ExamfeesData[k].CheckStudent = 0;
                    if ($scope.ExamFeesPaidList.TotalCondidate == undefined) { $scope.ExamFeesPaidList.TotalCondidate = 0; }
                    var tot = 0;
                    tot = $scope.ExamFeesPaidList.TotalCondidate - 1;
                    $('#TotalCondidate').val(tot);
                    $scope.ExamFeesPaidList.TotalCondidate = tot;

                    if ($scope.ExamFeesPaidList.TotalFeeAmount == undefined) { $scope.ExamFeesPaidList.TotalFeeAmount = 0; }
                    var totAmount = 0;
                    totAmount = $scope.ExamFeesPaidList.TotalFeeAmount - $scope.ExamfeesData[k].FormFees;
                    $('#TotalFeeAmount').val(totAmount);
                    $scope.ExamFeesPaidList.TotalFeeAmount = totAmount;
                }
            }
        }
        $scope.refreshTemplate = function (args) {
            $("#Examfees .rowCheckbox").ejCheckBox({ "change": checkChange });
            $("#headchk").ejCheckBox({ visible: false, "change": headCheckChange });
            $(".rowCheckbox").ejCheckBox({ "checked": true });
        }
        $scope.actionbegin = function (args) {
            if (args.requestType == "beginedit") {
                args.cancel = true;
            }
        }
        $scope.actioncomplete = function (args) {
            if (args.requestType == "beginedit" || args.requestType == "add") {
                $("#Examfees").ejNumericTextbox({ showSpinButton: false, focusOut: onkeydown });
            }
            $("#headchk").ejCheckBox({ width: 100, visible: false, enabled: false });
        }
        var CalTotal = function (args) {
            var gridObj = $("#Examfees").data("ejGrid");
            var gridRows = gridObj.getCurrentViewData();
            var tot = 0;
            for (var i = 0; i <= gridRows.length - 1; i++) {
                if (gridRows[i].FormFees > 0) {
                    tot = tot + gridRows[i].FormFees;
                }
            }
            $('#TotalFeeAmount').val(tot);
            $scope.ExamFeesPaidList.TotalFeeAmount = tot;
        }
    });
});