define(['app'], function (app) {
    app.controller("ExamFormNRListController", function ($scope, $state, $stateParams, AppSettings, ExamFormNRListService, ExamFormsCancelService) {
        $scope.ExamFormsNRListByParam = { CourseID: $stateParams.CourseID, ExamID: $stateParams.ExamID, MainGrpID: $stateParams.MainGrpID, MediumID: $stateParams.MediumID };
        $scope.ExamFormNRList = {};
        $scope.CompanyName = AppSettings.CompanyName;
        $scope.LoginYear = AppSettings.SelectedYear;
        $scope.ExamFormNRList.CollegeID = AppSettings.CollegeID;
        $scope.ExamFormNRList.rtnExamID = $scope.ExamFormsNRListByParam.ExamID;
        var PageNm = $state.current.name.split(".")[1];
        var RightForCurrentPage = [];
        var UsersRightsdata = [];

        $scope.PaidCandidate = true;


        
        //UsersRightsdata = AppSettings.UserRights;
        //for (var i = 0; i < UsersRightsdata.length; i++) {
        //    if (UsersRightsdata[i].GridFormToOpen == PageNm) {
        //        if (UsersRightsdata[i].isupdatable == 'Y') {
        //            $scope.RollEditDisable = false;
        //        } else {
        //            $scope.RollEditDisable = true;
        //        }
        //    }
        //}
        
      
        $scope.FillCollData = function (CollegeID) {
            if (CollegeID != null) {
                $scope.CourseList = [];
                $scope.ExamList = [];
                $scope.MainGroupList = [];

                var CourseList = ExamFormsCancelService.GetCourseListForRegStud($scope.ExamFormNRList.CollegeID);
                CourseList.then(function (BasicCoursedata, status, headers, config, error) {
                    $scope.CourseList = BasicCoursedata;
                    $scope.FillCoursePart($scope.ExamFormNRList.CourseID);
                }, function (error) {
                    alert(error);
                });
            }
        }
        if (AppSettings.CollegeID != 0) {
            var CourseList = ExamFormsCancelService.GetCourseListForRegStud(AppSettings.CollegeID);
            CourseList.then(function (BasicCoursedata, status, headers, config, error) {
                $scope.CourseList = BasicCoursedata;
                if ($scope.ExamFormsNRListByParam.CourseID != "") {
                    $scope.ExamFormNRList.CourseID = "" + $scope.ExamFormsNRListByParam.CourseID + "";
                    $scope.ExamFormsNRListByParam.CourseID = "";
                    $scope.FillCoursePart($scope.ExamFormNRList.CourseID);
                }
                else {
                    $scope.ExamFormNRList.CourseID = "" + $scope.CourseList[0].CourseID + "";
                    $scope.FillCoursePart($scope.ExamFormNRList.CourseID);
                }            }, function (error) {
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
                    if ($scope.ExamFormsNRListByParam.ExamID != "") {
                        $scope.ExamFormNRList.ExamID = "" + $scope.ExamFormsNRListByParam.ExamID + "";
                        $scope.ExamFormsNRListByParam.ExamID = "";
                    }
                }, function (error) {
                    alert(error);
                    });
                var MainGroupList = ExamFormsCancelService.GetMainGroupListByCollegeCourseId($scope.ExamFormNRList.CollegeID, CourseID, AppSettings.AcdYrID);
                MainGroupList.then(function (MainGroupListdata, status, headers, config, error) {
                    $scope.MainGroupList = MainGroupListdata;
                    if ($scope.ExamFormsNRListByParam.MainGrpID != "") {
                        $scope.ExamFormNRList.MainGrpID = "" + $scope.ExamFormsNRListByParam.MainGrpID + "";
                        $scope.ExamFormsNRListByParam.MainGrpID = "";
                        $scope.changeGroup($scope.ExamFormNRList.MainGrpID);
                    }
                }, function (error) {
                    alert(error);
                    });
            }
        }

        var MedList = ExamFormsCancelService.GetBasicMediumList(AppSettings.CollegeID);
        MedList.then(function (Mediumdata, status, headers, config, error) {
            $scope.MediumList = Mediumdata;
        }, function (error) {
            alert(error);
            });

        $scope.changeGroup = function (MainGrpID) {
            $scope.MainGrpID = MainGrpID;
            var MedList = ExamFormsCancelService.GetBasicMediumList(AppSettings.CollegeID, $scope.MainGrpID);
            MedList.then(function (Mediumdata, status, headers, config, error) {
                $scope.MediumList = Mediumdata;
                if ($scope.ExamFormsNRListByParam.MediumID != "") {
                    $scope.ExamFormNRList.MediumID = "" + $scope.ExamFormsNRListByParam.MediumID + "";
                    $scope.ExamFormsNRListByParam.MediumID = "";
                    $scope.Show();
                }
                else {
                    $scope.ExamFormNRList.MediumID = $scope.MediumList[0].MediumID;
                }
            }, function (error) {
                alert(error);
                });
        }
        //var delayInMilliseconds = 250;
        //setTimeout(function () {
        //    if ($scope.ExamFormsNRListByParam.ExamID != 0) {
        //        if (($scope.ExamFormsNRListByParam.ExamID == 1) || ($scope.ExamFormsNRListByParam.ExamID == 2)) {
        //            $scope.ExamFormNRList.CourseID = 1;
        //        } else if (($scope.ExamFormsNRListByParam.ExamID == 3) || ($scope.ExamFormsNRListByParam.ExamID == 4)) {
        //            $scope.ExamFormNRList.CourseID = 2;
        //        }
        //        $("select#CourseID")[0].selectedIndex = $scope.ExamFormNRList.CourseID - 1;

        //        if (($scope.ExamFormNRList.CourseID != "") && ($scope.ExamFormNRList.CourseID != null)) {
        //            var ExamList = ExamFormsCancelService.GetBasicExamList($scope.ExamFormNRList.CourseID, AppSettings.AcdYrID);
        //            ExamList.then(function (BasicExamdata, status, headers, config, error) {
        //                $scope.ExamList = BasicExamdata;
        //            }, function (error) {
        //                alert(error);
        //            });

        //            var MainGroupList = ExamFormsCancelService.GetMainGroupListByCollegeCourseId($scope.ExamFormNRList.CollegeID, $scope.ExamFormNRList.CourseID, AppSettings.AcdYrID);
        //            MainGroupList.then(function (MainGroupListdata, status, headers, config, error) {
        //                $scope.MainGroupList = MainGroupListdata;
        //            }, function (error) {
        //                alert(error);
        //            });
        //        }

        //        if (($scope.ExamFormsNRListByParam.ExamID == 1) || ($scope.ExamFormsNRListByParam.ExamID == 3)) {
        //            $scope.ExamFormNRList.ExamID = 1;
        //        }
        //        else if (($scope.ExamFormsNRListByParam.ExamID == 2) || ($scope.ExamFormsNRListByParam.ExamID == 4)) {
        //            $scope.ExamFormNRList.ExamID = 2;
        //        }
        //        $("select#ExamID")[0].selectedIndex = $scope.ExamFormNRList.ExamID;
        //        $scope.ExamFormNRList.ExamID = $scope.ExamFormsNRListByParam.ExamID;

        //        $("select#MainGrpID")[0].selectedIndex = $scope.ExamFormsNRListByParam.MainGrpID;


        //        var MedList = ExamFormsCancelService.GetBasicMediumList(AppSettings.CollegeID, $scope.MainGrpID);
        //        MedList.then(function (Mediumdata, status, headers, config, error) {
        //            $scope.MediumList = Mediumdata;
        //        }, function (error) {
        //            alert(error);
        //        });

                
        //    }
        //}, delayInMilliseconds);

        var gridColumns = [
            { field: "ChallanNo", headerText: "Challan No", textAlign: ej.TextAlign.Center, width: 200, allowEditing: false },
            { field: "PREGNO", headerText: "Previous Reg Number", textAlign: ej.TextAlign.Left, width: 120, allowEditing: false },
            { field: "CNAME", headerText: "Student Name", textAlign: ej.TextAlign.Left, width: 120 },
            { field: "FNAME", headerText: "Father Name", textAlign: ej.TextAlign.Left, width: 120 },
            { field: "MainGrpName", headerText: "Group Name", textAlign: ej.TextAlign.Left, width: 60 },
            { field: "MEDIUM", headerText: "Medium", textAlign: ej.TextAlign.Left, width: 10, allowEditing: false },
            { field: "CAT", headerText: "Category", textAlign: ej.TextAlign.Left, width: 10 },
            { field: "FirstYearSubjects", headerText: "First Year Subjects", textAlign: ej.TextAlign.Left, width: 150 },
            { field: "SecondYearSubjects", headerText: "Second Year Subjects", textAlign: ej.TextAlign.Left, width: 170 },
            { field: "RegularFees", headerText: "Exam Fee", textAlign: ej.TextAlign.Left, width: 20 },
            { field: "LateFees", headerText: "Late Fee", textAlign: ej.TextAlign.Left, width: 10, allowEditing: false },
            { field: "TRANSACTIONID", headerText: "Transaction ID", textAlign: ej.TextAlign.Left, width: 100 },
            { field: "PaymentDate", headerText: "Payment Date", textAlign: ej.TextAlign.Left, width: 100 },
            { headerTemplateID: "#headerTemplate", template: true, templateID: "#checkboxTemplate", textAlign: ej.TextAlign.Center, width: 50 },
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
        $scope.AppDisable = false;
        $scope.FeedbackSubmit = function () {
            if (($scope.ExamFormNRList.Feedbacktext == undefined) || ($scope.ExamFormNRList.Feedbacktext == "")) {
                alert("Please Enter NR Corrections you could not do from edit button");
            }
            else {
                var getPromise = ExamFormNRListService.AddNRCorrectioncmt($scope.ExamFormNRList.CollegeID, $scope.ExamFormNRList.Feedbacktext);
                getPromise.then(function (msg) {
                    alert("Saved successfully!!");
                    $scope.ExamFormNRList.Feedbacktext = "";
                    angular.element('#exampleModalVerify').modal('hide');
                }, function (error) {
                    $scope.isupdatableDisable = false;
                    alert(error);
                });
                //alert("You have entered " + $scope.ExamFormNRList.Feedbacktext + " for College ID " +$scope.ExamFormNRList.CollegeID);
            }
        }
        $scope.Show = function () {
            if (($scope.ExamFormNRList.CourseID == undefined) || ($scope.ExamFormNRList.CourseID == "")) {
                alert("Select Course");
                return;
            }
            if (($scope.ExamFormNRList.ExamID == undefined) || ($scope.ExamFormNRList.ExamID == "")) {
                alert("Select Year");
                return;
            }
            if (($scope.ExamFormNRList.MainGrpID == undefined) || ($scope.ExamFormNRList.MainGrpID == "")) {
                alert("Select Group");
                return;
            }
            if (($scope.ExamFormNRList.MediumID == undefined) || ($scope.ExamFormNRList.MediumID == "")) {
                alert("Select Medium");
                return;
            }
            $scope.AppDisable = true;
            var ExamFormData = ExamFormNRListService.GetPreExamNRCorrectionList($scope.ExamFormNRList.ExamID, AppSettings.ExamInstID, $scope.ExamFormNRList.CollegeID, $scope.ExamFormNRList.MainGrpID, $scope.ExamFormNRList.MediumID, $scope.ExamFormNRList.CourseID);
            ExamFormData.then(function (data, status, headers, config, error) {
                if (data.length == 0) {
                    alert("Data not found");
                    $scope.ExamfeesData = [];
                    $scope.AppDisable = false;
                    return;
                } else {
                    $scope.AppDisable = false;
                    $scope.TotalCandidate = 0;
                    $scope.ExamfeesData = data;

                    for (var k = 0; k < data.length; k++) {
                        $scope.TotalCandidate +=1;
                    }

                    $scope.ExamFormNRList.TotalCandidate = $scope.TotalCandidate;

                    for (var k = 0; k < data.length; k++) {
                        if (data[k].ExamFormsCorrecDone == 0) {
                            $scope.ExamfeesData[k].PaidCandidate = false;
                        }
                        else {
                            $scope.ExamfeesData[k].PaidCandidate = true;
                        }
                    }
                }
            }, function (data, status, headers, config) {
                alert(error);
                $scope.AppDisable = false;
            });
        }
        $scope.SendData = function (obj) {
            $state.go('Exam.ExamFormsCorrection', { PRNNo: obj.PRNNo, ExamID: $scope.ExamFormNRList.ExamID });
        }

        $scope.CorrectData = function (FeesData) {
            if ((FeesData.TransactionID != null) && (FeesData.TransactionID != undefined) && (FeesData.TransactionID != "")) {
                alert("Payment done already", FeesData.ChallanNo);
                return;
            }
            FeesData.paydisable = true;
            $scope.paybtndisable = true;
            $scope.ExamfeesData[0].ExamInstID = AppSettings.ExamInstID;
            $scope.ExamfeesData[0].ExamID = $scope.ExamFeesPaidList.ExamID;
            $scope.ExamfeesData[0].CourseID = $scope.ExamFeesPaidList.CourseID;
            $scope.ExamfeesData[0].CollegeID = $scope.ExamFeesPaidList.CollegeID;
            $scope.FeetotAmount = FeesData.FormFees;
            var ExamFormData = ExamFeesPaidService.GetInsertExamFeesPaymentChallan(AppSettings.ExamInstID, $scope.ExamFeesPaidList.CollegeID, FeesData.ChallanNo, FeesData.NoofStudents, FeesData.FormFees, FeesData.LateFees, $scope.ExamFeesPaidList.ExamID, $scope.ExamFeesPaidList.CourseID, FeesData.CollegeTransDate);
            ExamFormData.then(function (data, status, headers, config, error) {
                var TotalRecorddata = ExamFeesPaidService.GetInsertFeesUpdate(AppSettings.ExamInstID, AppSettings.CollegeID, FeesData.ChallanID, FeesData.CollegeTransDate, $scope.ExamFeesPaidList.ExamID, $scope.ExamFeesPaidList.CourseID);
                TotalRecorddata.then(function (data) {
                    $scope.paybtndisable = false;
                    var examReg = [];
                    //var OrderID = makeid();
                    //  OrderID = "CAZSNRYO";
                    var obj = {};
                    obj.ChallanNo = FeesData.ChallanNo;
                    obj.CollegeTransDate = FeesData.CollegeTransDate;
                    obj.ExamInstID = AppSettings.ExamInstID;
                    obj.MerchTxnRef = FeesData.ChallanID;
                    obj.CollegeID = AppSettings.CollegeID;
                    examReg.push(obj);
                    if (examReg.length == 0) {
                        alert("No Rows Selected");
                        return;
                    }
                    var StudCheckData = ExamFeesPaidService.StudCheckDataUsingChallan(examReg);
                    StudCheckData.then(function (data) {
                        $scope.paybtndisable = false;
                        // var payurl = "http://acad.tsbie.telangana.gov.in/tsbie/getPaymentDetailsFromNetApplications.htm?amount=2&txnid=" + OrderID + "&responseURL=http://202.62.85.194:82/content/PaymentGatewayResponseBD.aspx";
                        var payurl = AppSettings.PaymentUrl + '?FormNo=' + 61 + "&ServiceID=" + 61 + "&FeeAmount=" + $scope.FeetotAmount + "&ChallanID=" + FeesData.ChallanID + "&CollegeID=" + AppSettings.CollegeID;
                        //payurl = "http://localhost:25490/Content/PaymentGatewayResponseBD.aspx";
                        // alert(payurl);
                        window.open(payurl, '_Self');
                    }
                        , function (error) {
                            alert(error);
                        });
                }, function (error) {
                    alert(error);
                });
            }, function (data, status, headers, config) {
                alert(error);
            });
        }
        $scope.GetStudentDetails = function (obj) {
            $scope.TotalDelectFrm = 0;
            $scope.TotalDelectCnt = 0;
            $scope.studpageAdmissionList = [];
            $scope.studdisable = false;
            if ((obj.TransactionID != null) && (obj.TransactionID != undefined) && (obj.TransactionID != "")) {
                $scope.studdisable = true;
            }
            var TotalRecorddata = ExamFormNRListService.GetStudentDetailsByTransactionID(AppSettings.ExamInstID, AppSettings.CollegeID, obj.ChallanID, obj.CollegeTransDate, $scope.ExamFormNRList.ExamID, $scope.ExamFormNRList.CourseID, obj.TransactionID);
            TotalRecorddata.then(function (data) {
                var to = 0;
                for (var k = 0; k < data.length; k++) {
                    data[k].Checkstud = true;
                    to = to + data[k].FormFees;
                }

                $scope.headercheck = true;
                $scope.studpageAdmissionList = data;
                if (data.length > 0) {
                } else {
                    alert("Data Not Found.");
                    $scope.studpageAdmissionList = [];
                }
                $('#TotalDelectCnt').val(data.length);
                $scope.TotalDelectCnt = data.length;
            }, function (error) {
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
            //  OrderID = "CAZSNRYO";
            for (var i = 0; i < $scope.ExamfeesData.length; i++) {
                if ($scope.ExamfeesData[i].CheckStudent == 1) {
                    var obj = {};
                    obj.ExmFrmID = $scope.ExamfeesData[i].ExmFrmID;
                    obj.FormFees = $scope.ExamfeesData[i].FormFees;
                    obj.CollegeLateFees = $scope.ExamfeesData[i].CollegeLateFees;
                    $scope.FeetotAmount = $scope.FeetotAmount + $scope.ExamfeesData[i].FormFees + $scope.ExamfeesData[i].CollegeLateFees;
                    obj.CollegeID = $scope.ExamFeesPaidList.CollegeID;
                    obj.PRNNo = $scope.ExamfeesData[i].PRNNo;
                    obj.ExamInstID = AppSettings.ExamInstID;
                    obj.MerchTxnRef = OrderID;
                    obj.AcdYrID = AppSettings.AcdYrID;
                    examReg.push(obj);
                }
            }
            if (examReg.length == 0) {
                alert("No Row Selected");
                return;
            }
            var StudCheckData = ExamFeesPaidSummaryService.StudCheckData(examReg);
            StudCheckData.then(function (data) {
                var payurl = AppSettings.PaymentUrl + '?FormNo=' + 61 + "&ServiceID=" + 61 + "&FeeAmount=" + $scope.FeetotAmount + "&OrderID=" + OrderID;
                //payurl = "http://localhost:25490/Content/PaymentGatewayResponseBD.aspx";
                window.open(payurl, '_blank');
            }
                , function (error) {
                    alert(error);
                });

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
        $scope.GetCheckStudentHeader = function (headercheck) {
            var tot = 0;
            $scope.TotalDelectFrm = tot;
            if (headercheck == true) {
                for (var i = 0; i < $scope.studpageAdmissionList.length; i++) {
                    $scope.studpageAdmissionList[i].Checkstud = true;
                }
            } else {
                for (var i = 0; i < $scope.studpageAdmissionList.length; i++) {
                    $scope.studpageAdmissionList[i].Checkstud = false;
                }
            }
            for (var i = 0; i < $scope.studpageAdmissionList.length; i++) {
                if ($scope.studpageAdmissionList[i].Checkstud == false) {
                    tot = tot + 1;
                }
            }
            $('#TotalDelectFrm').val(tot);
            $scope.TotalDelectFrm = tot;
        }
    });
});