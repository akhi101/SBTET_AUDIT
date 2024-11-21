define(['app'], function (app) {
    app.controller("RecognationFeePaidListController", function ($scope, $state, $stateParams, AppSettings, StudentRegService, RegisterAdmittedStudentService) {
        $scope.Success = { AcqResponseCode: $stateParams.AcqResponseCode, MerchTxnRef: $stateParams.MerchTxnRef };
        $scope.RecognationFeePaidList = {};
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
        var gridColumns = [
            { headerTemplateID: "#headerTemplate", template: true, templateID: "#checkboxTemplate", textAlign: ej.TextAlign.Center, width: 50 },
            { field: "CheckStudent", headerText: "CheckStudent", visible: false, textAlign: ej.TextAlign.Left },
            { field: "StuRegSrNo", headerText: "S. No.", textAlign: ej.TextAlign.Right, width: 50, allowEditing: false },
            { field: "AdmNo", headerText: "Admission No.", textAlign: ej.TextAlign.Right, width: 100, allowEditing: false },
            { field: "StudName", headerText: "Student Name", textAlign: ej.TextAlign.Left, width: 150, allowEditing: false },
            { field: "FatherName", headerText: "Father Name", textAlign: ej.TextAlign.Left, width: 150, allowEditing: false },
            { field: "BirthDateDesc", headerText: "Birth Date", format: "{0:dd/MM/yyyy}", textAlign: ej.TextAlign.Left, width: 100, allowEditing: false },
            { field: "GenderDesc", headerText: "Sex", textAlign: ej.TextAlign.Left, width: 80, allowEditing: false },
            { field: "SSCHallTicket", headerText: "Hall Ticket No.", textAlign: ej.TextAlign.Right, width: 200, allowEditing: false },
            { field: "MediumName", headerText: "Medium", textAlign: ej.TextAlign.Right, width: 100, allowEditing: false },
            { field: "StudRegID", headerText: "StudRegID", visible: true, textAlign: ej.TextAlign.Right, width: 0 },
            { field: "FeeAmount", headerText: "Fee Amount", textAlign: ej.TextAlign.Right, width: 100, allowEditing: false },
            { field: "SecAadharVerify", headerText: "SecAadharVerify", textAlign: ej.TextAlign.Right, visible: false, width: 0 },
            { field: "SubAadharVerify", headerText: "SubAadharVerify", textAlign: ej.TextAlign.Right, visible: false, width: 0 },
        ];
        $scope.RecognationFeePaidData = [];
        $("#StudentRegs").ejGrid({
            dataSource: $scope.RecognationFeePaidData,
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
        var CourseList = RegisterAdmittedStudentService.GetCourseListForRegStud(AppSettings.CollegeID);
        CourseList.then(function (Coursedata, status, headers, config, error) {
            $scope.CourseList = Coursedata;
        }, function (error) {
            alert(error);
        });
        $scope.FillCoursePart = function (CourseID) {
            var ExamList = RegisterAdmittedStudentService.GetBasicExamList(CourseID);
            ExamList.then(function (BasicExamdata, status, headers, config, error) {
                var Examli = [];
                for (var i = 0; i < BasicExamdata.length; i++) {
                    if (BasicExamdata[i].SequenceNo == "1") {
                        var obj = {};
                        obj.ExamID = BasicExamdata[i].ExamID;
                        obj.ExmName = BasicExamdata[i].ExmName;
                        obj.ExmCode = BasicExamdata[i].ExmCode;
                        obj.SequenceNo = BasicExamdata[i].SequenceNo;
                        Examli.push(obj);
                    }
                }
                $scope.ExamList = Examli;
                var BranchList = RegisterAdmittedStudentService.GetBasicBranchListForRegStud(CourseID, AppSettings.CollegeID);
                BranchList.then(function (BasicBranchdata, status, headers, config, error) {
                    $scope.BranchList = BasicBranchdata;
                }, function (error) {
                    alert(error);
                });
            }, function (error) {
                alert(error);
            });
        }
        $scope.Show = function () {
            if (($scope.CourseID == undefined) || ($scope.CourseID == "")) {
                alert("Select Stream");
                return;
            }
            if (($scope.ExamID == undefined) || ($scope.ExamID == "")) {
                alert("Select Exam");
                return;
            }
            var StudentRegdata = StudentRegService.FillStudentListForRecognationFeePaid(AppSettings.CollegeID, $scope.CourseID, $scope.ExamID, $scope.BranchID);
            StudentRegdata.then(function (data) {
                if (data.length == 0) {
                    alert("Data Not Found");
                    $scope.RecognationFeePaidData = [];
                    return;
                } else {
                    var SrNo = 1
                    for (var i = 0; i < data.length; i++) {
                        data[i].StuRegSrNo = SrNo;
                        SrNo = SrNo + 1;
                    }
                    $scope.RecognationFeePaidData = data;
                    $scope.RecognationFeePaidList.TotalCondidate = 0;
                    $scope.RecognationFeePaidList.TotalFeeAmount = 0;
                }
            }, function (error) {
                alert(error);
            });
        }
        $scope.GetCheckStudent = function (obj) {
            var tot = 0;
            var totAmount = 0;
            for (var i = 0; i < $scope.RecognationFeePaidData.length; i++) {
                if ($scope.RecognationFeePaidData[i].CheckStudent == true) {
                    tot = tot + 1;
                    totAmount = totAmount + $scope.RecognationFeePaidData[i].FeeAmount;
                }
            }
            $('#TotalCondidate').val(tot);
            $('#TotalFeeAmount').val(totAmount);
            $scope.RecognationFeePaidList.TotalCondidate = tot;
            $scope.RecognationFeePaidList.TotalFeeAmount = totAmount;
        }
        $scope.GetCheckStudentHeader = function (headercheck) {
            var tot = 0;
            var totAmount = 0;
            for (var i = 0; i < $scope.RecognationFeePaidData.length; i++) {
                if (headercheck == true) {
                    $scope.RecognationFeePaidData[i].CheckStudent = true;
                    tot = tot + 1;
                    totAmount = totAmount + $scope.RecognationFeePaidData[i].FeeAmount;
                }
                else {
                    $scope.RecognationFeePaidData[i].CheckStudent = false;
                }
            }
            $('#TotalCondidate').val(tot);
            $('#TotalFeeAmount').val(totAmount);
            $scope.RecognationFeePaidList.TotalCondidate = tot;
            $scope.RecognationFeePaidList.TotalFeeAmount = totAmount;
        }

        $scope.SaveRecognationFeePaid = function () {
            if ($scope.RecognationFeePaidData.length == 0) {
                alert("No data found should be there");
                return;
            }

            var StudentReg = [];
            $scope.FeetotAmount = 0;
            var OrderID = makeid();
           // OrderID = "CAZSNRYO";
            for (var i = 0; i < $scope.RecognationFeePaidData.length; i++) {
                if ($scope.RecognationFeePaidData[i].CheckStudent == true) {
                //if ($scope.RecognationFeePaidData[i].CheckStudent == 1) {
                    var obj = {};
                    obj.StudRegID = $scope.RecognationFeePaidData[i].StudRegID;
                    obj.FeeAmount = $scope.RecognationFeePaidData[i].FeeAmount;
                    $scope.FeetotAmount = $scope.FeetotAmount + $scope.RecognationFeePaidData[i].FeeAmount;
                    obj.UpdLoginID = AppSettings.LoggedUserId;
                    obj.CollegeID = AppSettings.CollegeID;
                    obj.AcdYrID = AppSettings.AcdYrID;
                    obj.SSCHallTicket = $scope.RecognationFeePaidData[i].SSCHallTicket;
                    obj.MerchTxnRef = OrderID;
                    StudentReg.push(obj);
                }
            }
            if (StudentReg.length == 0) {
                alert("No Any Rows Selected");
                return;
            }


            var StudCheckData = StudentRegService.StudCheckData(StudentReg);
            StudCheckData.then(function (data) {
               var payurl = AppSettings.PaymentUrl + '?FormNo=' + 31 + "&ServiceID=" + 31 + "&FeeAmount=" + $scope.FeetotAmount + "&OrderID=" + OrderID + "&CollegeID=" + AppSettings.CollegeID;
              // payurl = "http://localhost:25490/Content/PaymentGatewayResponseBD.aspx";
                window.open(payurl,'_self');

            }
            , function (error) {
                alert(error);
            });

            //var payurl = AppSettings.PaymentUrl + '?FormNo=' + 31 + "&ServiceID=" + 31 + "&FeeAmount=" + $scope.FeetotAmount + "&OrderID=" + OrderID;
            //payurl = "http://localhost:25490/Content/PaymentGatewayResponseBD.aspx";

            ////window.open(payurl, '_self');
            //window.open(payurl, '_blank');


            // if ($scope.Success.AcqResponseCode == '0300') {
            //for (var i = 0; i < StudentReg.length; i++) {
            //    StudentReg.MerchTxnRef = $scope.Success.MerchTxnRef;
            //}
            //var StudentRegdata = StudentRegService.PostStudentRegBatchNo(StudentReg);
            //StudentRegdata.then(function (data) {
            //    alert("Fee Paid Successfully");
            //    $scope.RecognationFeePaidData = [];
            //    $scope.RecognationFeePaidList.TotalCondidate = 0;
            //    $scope.RecognationFeePaidList.TotalFeeAmount = 0;
            //}, function (error) {
            //    alert(error);
            //});
            //}
        }
        $scope.RecognationFeePaidList.TotalFeeAmount = 0;
        $scope.RecognationFeePaidList.TotalCondidate = 0;
        //var FormNo = "31";
        //var StudentIDs = "";
        //var UpdLoginID = AppSettings.LoggedUserId;
        //var AcdYrID = AppSettings.AcdYrID;
        //var FeeAmountStudent = "";
        //var CollegeID = AppSettings.CollegeID;
        //for (var i = 0; i < $scope.RecognationFeePaidData.length; i++) {
        //    if ($scope.RecognationFeePaidData[i].CheckStudent == 1) {
        //        var obj = {};
        //        if (StudentIDs != "") {
        //            StudentIDs = StudentIDs + "," + $scope.RecognationFeePaidData[i].StudRegID;
        //        } else {
        //            StudentIDs = $scope.RecognationFeePaidData[i].StudRegID;
        //        }
        //        FeeAmountStudent = $scope.RecognationFeePaidData[i].FeeAmount;
        //    }
        //}
        //var payurl = AppSettings.WebApiUrl + "/PaymentService.aspx?FormNo=31&FeeAmount=" + $scope.FeetotAmount + "&StudentIDs=" + StudentIDs + "&UpdLoginID=" + UpdLoginID + "&AcdYrID=" + AcdYrID + "&FeeAmountStudent=" + FeeAmountStudent + "&CollegeID=" + CollegeID;
        //window.open(payurl, '_blank');


        //For Testing
        //$scope.Success.AcqResponseCode = "0300";
        //$scope.Success.MerchTxnRef = "H6NMKT88";
        //var Payementdata = StudentRegService.GetPaymentForRecognition($scope.FeetotAmount);
        //Payementdata.then(function (data) {
        //    if ($scope.Success.AcqResponseCode == '0300') {
        //        for (var i = 0; i < StudentReg.length; i++) {
        //            StudentReg.MerchTxnRef = $scope.Success.MerchTxnRef;
        //        }
        //        var StudentRegdata = StudentRegService.PostStudentRegBatchNo(StudentReg);
        //        StudentRegdata.then(function (data) {
        //            alert("Fee Paid Successfully");
        //            $scope.RecognationFeePaidData = [];
        //            $scope.RecognationFeePaidList.TotalCondidate = 0;
        //            $scope.RecognationFeePaidList.TotalFeeAmount = 0;
        //        }, function (error) {
        //            alert(error);
        //        });
        //    }

        //}, function (error) {
        //    alert(error);
        //});


        function makeid() {
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

            for (var i = 0; i < 8; i++)
                text += possible.charAt(Math.floor(Math.random() * possible.length));

            return text;
        }

        function checkChange(e) {
            gridObj = $("#StudentRegs").data("ejGrid");
            var rowCheck = $(".rowCheckbox:checked"), cp = gridObj.model.pageSettings.currentPage;
            for (var k = 0; k < $scope.RecognationFeePaidData.length; k++) {
                var totAmount = 0;
                var tot = 0;
                if (gridObj.model.selectedRecords[0].StudRegID == $scope.RecognationFeePaidData[k].StudRegID) {
                    var tot = 0;
                    var totAmount = 0;
                    if (e.isChecked == true) {
                        $scope.RecognationFeePaidData[k].CheckStudent = 1;
                        tot = $scope.RecognationFeePaidList.TotalCondidate + 1;
                        $('#TotalCondidate').val(tot);
                        $scope.RecognationFeePaidList.TotalCondidate = tot;
                        totAmount = $scope.RecognationFeePaidList.TotalFeeAmount + $scope.RecognationFeePaidData[k].FeeAmount;
                        $('#TotalFeeAmount').val(totAmount);
                        $scope.RecognationFeePaidList.TotalFeeAmount = totAmount;
                    } else {
                        $scope.RecognationFeePaidData[k].CheckStudent = 0;
                        tot = $scope.RecognationFeePaidList.TotalCondidate - 1;
                        $('#TotalCondidate').val(tot);
                        $scope.RecognationFeePaidList.TotalCondidate = tot;
                        totAmount = $scope.RecognationFeePaidList.TotalFeeAmount - $scope.RecognationFeePaidData[k].FeeAmount;
                        $('#TotalFeeAmount').val(totAmount);
                        $scope.RecognationFeePaidList.TotalFeeAmount = totAmount;
                    }
                }
            }
            //if ($("#headchk").is(':checked')) {
            //    for (var k = 0; k < $scope.RecognationFeePaidData.length; k++) {
            //        $scope.RecognationFeePaidData[k].CheckStudent = 1;
            //        if ($scope.RecognationFeePaidList.TotalCondidate == undefined) { $scope.RecognationFeePaidList.TotalCondidate = 0; }
            //        var tot = 0;
            //        tot = $scope.RecognationFeePaidList.TotalCondidate + 1;
            //        $('#TotalCondidate').val(tot);
            //        $scope.RecognationFeePaidList.TotalCondidate = tot;

            //        if ($scope.RecognationFeePaidList.TotalFeeAmount == undefined) { $scope.RecognationFeePaidList.TotalFeeAmount = 0; }
            //        var totAmount = 0;
            //        totAmount = $scope.RecognationFeePaidList.TotalFeeAmount + $scope.RecognationFeePaidData[k].FeeAmount;
            //        $('#TotalFeeAmount').val(totAmount);
            //        $scope.RecognationFeePaidList.TotalFeeAmount = totAmount;
            //        return;
            //    }
            //} else {
            //    if (gridObj.model.selectedRecords[0] == undefined) {
            //        for (var k = 0; k < $scope.RecognationFeePaidData.length; k++) {
            //            $scope.RecognationFeePaidData[k].CheckStudent = 0;
            //            if ($scope.RecognationFeePaidList.TotalCondidate == undefined) { $scope.RecognationFeePaidList.TotalCondidate = 0; }
            //            var tot = 0;
            //            tot = $scope.RecognationFeePaidList.TotalCondidate - 1;
            //            $('#TotalCondidate').val(tot);
            //            $scope.RecognationFeePaidList.TotalCondidate = tot;

            //            if ($scope.RecognationFeePaidList.TotalFeeAmount == undefined) { $scope.RecognationFeePaidList.TotalFeeAmount = 0; }
            //            var totAmount = 0;
            //            totAmount = $scope.RecognationFeePaidList.TotalFeeAmount - $scope.RecognationFeePaidData[k].FeeAmount;
            //            $('#TotalFeeAmount').val(totAmount);
            //            $scope.RecognationFeePaidList.TotalFeeAmount = totAmount;
            //            return;
            //        }
            //    } else {
            //        if (e.isChecked == true) {
            //            for (var k = 0; k < $scope.RecognationFeePaidData.length; k++) {
            //                if (gridObj.model.selectedRecords[0].StudRegID == $scope.RecognationFeePaidData[k].StudRegID) {
            //                    if ((gridObj.model.selectedRecords[0].CheckStudent == 0) || (gridObj.model.selectedRecords[0].CheckStudent == undefined)) {
            //                        $scope.RecognationFeePaidData[k].CheckStudent = 1;
            //                        if ($scope.RecognationFeePaidList.TotalCondidate == undefined) { $scope.RecognationFeePaidList.TotalCondidate = 0; }
            //                        var tot = 0;
            //                        tot = $scope.RecognationFeePaidList.TotalCondidate + 1;
            //                        $('#TotalCondidate').val(tot);
            //                        $scope.RecognationFeePaidList.TotalCondidate = tot;

            //                        if ($scope.RecognationFeePaidList.TotalFeeAmount == undefined) { $scope.RecognationFeePaidList.TotalFeeAmount = 0; }
            //                        var totAmount = 0;
            //                        totAmount = $scope.RecognationFeePaidList.TotalFeeAmount + $scope.RecognationFeePaidData[k].FeeAmount;
            //                        $('#TotalFeeAmount').val(totAmount);
            //                        $scope.RecognationFeePaidList.TotalFeeAmount = totAmount;
            //                        return;
            //                    }
            //                }
            //            }
            //        } else {
            //            for (var k = 0; k < $scope.RecognationFeePaidData.length; k++) {
            //                if (gridObj.model.selectedRecords[0].StudRegID == $scope.RecognationFeePaidData[k].StudRegID) {
            //                    if (gridObj.model.selectedRecords[0].CheckStudent == 1) {
            //                        $scope.RecognationFeePaidData[k].CheckStudent = 0;
            //                        if ($scope.RecognationFeePaidList.TotalCondidate == undefined) { $scope.RecognationFeePaidList.TotalCondidate = 0; }
            //                        var tot = 0;
            //                        tot = $scope.RecognationFeePaidList.TotalCondidate - 1;
            //                        $('#TotalCondidate').val(tot);
            //                        $scope.RecognationFeePaidList.TotalCondidate = tot;

            //                        if ($scope.RecognationFeePaidList.TotalFeeAmount == undefined) { $scope.RecognationFeePaidList.TotalFeeAmount = 0; }
            //                        var totAmount = 0;
            //                        totAmount = $scope.RecognationFeePaidList.TotalFeeAmount - $scope.RecognationFeePaidData[k].FeeAmount;
            //                        $('#TotalFeeAmount').val(totAmount);
            //                        $scope.RecognationFeePaidList.TotalFeeAmount = totAmount;
            //                        return;
            //                    }
            //                }
            //            }
            //        }
            //    }
            //}
        }
        function headCheckChange(e) {
            $("#StudentRegs .rowCheckbox").ejCheckBox({ "change": checkChange });
            gridObj = $("#StudentRegs").data("ejGrid");
            if ($("#headchk").is(':checked')) {
                $(".rowCheckbox").ejCheckBox({ "checked": true });
                for (var k = 0; k < $scope.RecognationFeePaidData.length; k++) {
                    $scope.RecognationFeePaidData[k].CheckStudent = 1;
                    if ($scope.RecognationFeePaidList.TotalCondidate == undefined) { $scope.RecognationFeePaidList.TotalCondidate = 0; }
                    var tot = 0;
                    tot = $scope.RecognationFeePaidList.TotalCondidate + 1;
                    $('#TotalCondidate').val(tot);
                    $scope.RecognationFeePaidList.TotalCondidate = tot;

                    if ($scope.RecognationFeePaidList.TotalFeeAmount == undefined) { $scope.RecognationFeePaidList.TotalFeeAmount = 0; }
                    var totAmount = 0;
                    totAmount = $scope.RecognationFeePaidList.TotalFeeAmount + $scope.RecognationFeePaidData[k].FeeAmount;
                    $('#TotalFeeAmount').val(totAmount);
                    $scope.RecognationFeePaidList.TotalFeeAmount = totAmount;
                }
            }
            else {
                $(".rowCheckbox").ejCheckBox({ "checked": false });
                for (var k = 0; k < $scope.RecognationFeePaidData.length; k++) {
                    $scope.RecognationFeePaidData[k].CheckStudent = 0;
                    if ($scope.RecognationFeePaidList.TotalCondidate == undefined) { $scope.RecognationFeePaidList.TotalCondidate = 0; }
                    var tot = 0;
                    tot = $scope.RecognationFeePaidList.TotalCondidate - 1;
                    $('#TotalCondidate').val(tot);
                    $scope.RecognationFeePaidList.TotalCondidate = tot;

                    if ($scope.RecognationFeePaidList.TotalFeeAmount == undefined) { $scope.RecognationFeePaidList.TotalFeeAmount = 0; }
                    var totAmount = 0;
                    totAmount = $scope.RecognationFeePaidList.TotalFeeAmount - $scope.RecognationFeePaidData[k].FeeAmount;
                    $('#TotalFeeAmount').val(totAmount);
                    $scope.RecognationFeePaidList.TotalFeeAmount = totAmount;
                }
            }
        }
        //$scope.recordClick = function (args) {
        //    if (this.multiSelectCtrlRequest == false) {
        //        if (args.columnName != "Fee Amount") {
        //            for (var i = 0; i < $("#StudentRegs .rowCheckbox").length; i++)
        //                $("#StudentRegs .rowCheckbox").eq(i).ejCheckBox({ "checked": false })

        //            this.clearSelection();
        //            this.model.indexes = {};
        //        }
        //    }
        //}
        //$scope.dataBound = function (args) {
        //    $("#StudentRegs .rowCheckbox").ejCheckBox({ "change": checkChange });
        //    $("#headchk").ejCheckBox({ visible: false, "change": headCheckChange });
        //}
        $scope.refreshTemplate = function (args) {
            $("#StudentRegs .rowCheckbox").ejCheckBox({ "change": checkChange });
            $("#headchk").ejCheckBox({ visible: false, "change": headCheckChange });
        }
        //$scope.actionbegin = function (args) {
        //    if (args.requestType == "paging") {
        //        if (this.selectedRowsIndexes.length > 0) {
        //            if (this.model.indexes == undefined) {
        //                return;
        //            }
        //            this.model.indexes[args.previousPage] = this.selectedRowsIndexes.slice(0, 4);
        //        } else {
        //            if (this.model.indexes == undefined) {
        //                return;
        //            }
        //        }
        //    }
        //}
        $scope.actionbegin = function (args) {
            if (args.requestType == "beginedit") {
                args.cancel = true;
            }
        }
        $scope.actioncomplete = function (args) {
            if (args.requestType == "beginedit" || args.requestType == "add") {
                $("#StudentRegs").ejNumericTextbox({ showSpinButton: false, focusOut: onkeydown });
            }
            $("#headchk").ejCheckBox({ width: 100, visible: false });
        }
        var CalTotal = function (args) {
            var gridObj = $("#StudentRegs").data("ejGrid");
            var gridRows = gridObj.getCurrentViewData();
            var tot = 0;
            for (var i = 0; i <= gridRows.length - 1; i++) {
                if (gridRows[i].FeeAmount > 0) {
                    tot = tot + gridRows[i].FeeAmount;
                }
            }
            $('#TotalFeeAmount').val(tot);
            $scope.RecognationFeePaidList.TotalFeeAmount = tot;
        }

        //All data shows
        var StudentRegdata = StudentRegService.FillStudentListForRecognationFeePaid(AppSettings.CollegeID, 0, 0, 0);
        StudentRegdata.then(function (data) {
            if (data.length == 0) {
                alert("Data Not Found");
                $scope.RecognationFeePaidData = [];
                return;
            } else {
                var SrNo = 1
                for (var i = 0; i < data.length; i++) {
                    data[i].StuRegSrNo = SrNo;
                    SrNo = SrNo + 1;
                }
                $scope.RecognationFeePaidData = data;
                $scope.RecognationFeePaidList.TotalCondidate = 0;
                $scope.RecognationFeePaidList.TotalFeeAmount = 0;
            }
        }, function (error) {
            alert(error);
        });
        $scope.ShowAll = function () {

            var StudentRegdata = StudentRegService.FillStudentListForRecognationFeePaid(AppSettings.CollegeID, 0, 0, 0);
            StudentRegdata.then(function (data) {
                if (data.length == 0) {
                    alert("Data Not Found");
                    $scope.RecognationFeePaidData = [];
                    return;
                } else {
                    var SrNo = 1
                    for (var i = 0; i < data.length; i++) {
                        data[i].StuRegSrNo = SrNo;
                        SrNo = SrNo + 1;
                    }
                    $scope.RecognationFeePaidData = data;
                    $scope.RecognationFeePaidList.TotalCondidate = 0;
                    $scope.RecognationFeePaidList.TotalFeeAmount = 0;
                }
            }, function (error) {
                alert(error);
            });
        }
    });
});