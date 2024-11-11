define(['app'], function (app) {
    app.controller("ExamFeesPaidListSummaryBridgeController", function ($scope, $state, AppSettings, ExamFeesPaidService, ExamFormsCancelService) {
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
                        $scope.ExamFeesPaidList.CollegeID = "";
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
                    $scope.ExamFeesPaidList.CourseID = "" + $scope.CourseList[0].CourseID + "";
                    $scope.FillCoursePart($scope.ExamFeesPaidList.CourseID);
                }, function (error) {
                    alert(error);
                });
            }
        }
        if (AppSettings.CollegeID != 0) {
            var CourseList = ExamFormsCancelService.GetCourseListForRegStud(AppSettings.CollegeID);
            CourseList.then(function (BasicCoursedata, status, headers, config, error) {
                $scope.CourseList = BasicCoursedata;
                $scope.ExamFeesPaidList.CourseID = "" + $scope.CourseList[0].CourseID + "";
                $scope.FillCoursePart($scope.ExamFeesPaidList.CourseID);
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
            { field: "ChallanNo", headerText: "Challan No", textAlign: ej.TextAlign.Center, width: 200, allowEditing: false },
            { field: "NoofStudents", headerText: "No. of Student", textAlign: ej.TextAlign.Left, width: 150, allowEditing: false },
            { field: "FormFees", headerText: "Amount", textAlign: ej.TextAlign.Left, width: 100 },
            { field: "TransactionID", headerText: "Transaction ID", textAlign: ej.TextAlign.Left, width: 100 },
            { field: "CollegeTransDate", headerText: "College Trans Date", textAlign: ej.TextAlign.Left, width: 100 },
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
        $scope.Show = function () {
            if (($scope.ExamFeesPaidList.CourseID == undefined) || ($scope.ExamFeesPaidList.CourseID == "")) {
                alert("Select stream");
                return;
            }
            if (($scope.ExamFeesPaidList.ExamID == undefined) || ($scope.ExamFeesPaidList.ExamID == "")) {
                alert("Select Exam");
                return;
            }
            $scope.AppDisable = true;
            var ExamFormData = ExamFeesPaidService.GetExamFeesPaidListSummaryBridge(AppSettings.ExamInstID, $scope.ExamFeesPaidList.CollegeID, $scope.ExamFeesPaidList.CourseID, $scope.ExamFeesPaidList.ExamID, "B");
            ExamFormData.then(function (data, status, headers, config, error) {
                if (data.length == 0) {
                    alert("Data not found");
                    $scope.ExamfeesData = [];
                    $scope.AppDisable = false;
                    return;
                } else {
                    $scope.AppDisable = false;
                    $scope.ExamFeesPaidList.TotalCondidate = 0;
                    $scope.ExamFeesPaidList.TotalFeeAmount = 0;
                    for (var k = 0; k < data.length; k++) {
                        if ((data[k].TransactionID != null) && (data[k].TransactionID != undefined) && (data[k].TransactionID != "")) {
                            data[k].paydisable = true;
                        } else {
                            data[k].paydisable = false;
                        }
                    }

                    //for (var k = 0; k < data.length; k++) {
                    //    data[k].CheckStudent = 1;
                    //    var tot = 0;
                    //    var totAmount = 0;
                    //    tot = $scope.ExamFeesPaidList.TotalCondidate + 1;
                    //    $('#TotalCondidate').val(tot);
                    //    $scope.ExamFeesPaidList.TotalCondidate = tot;
                    //    totAmount = $scope.ExamFeesPaidList.TotalFeeAmount + data[k].FormFees + data[k].CollegeLateFees;
                    //    $('#TotalFeeAmount').val(totAmount);
                    //    $scope.ExamFeesPaidList.TotalFeeAmount = totAmount;
                    //}
                    $scope.ExamfeesData = data;
                    //if (($scope.ExamfeesData.ExamID == "1") || ($scope.ExamfeesData.ExamID == "3")) {
                    //    $scope.SecSubShow = false;
                    //}
                    //else {
                    //    $scope.SecSubShow = true;
                    //}
                }
            }, function (data, status, headers, config) {
                alert(error);
                $scope.AppDisable = false;
            });
        }
        $scope.studdisable = false;
        $scope.GetCheckStudent = function (FeesData) {
            if ((FeesData.TransactionID != null) && (FeesData.TransactionID != undefined) && (FeesData.TransactionID != "")) {
                alert("Payment done already", FeesData.ChallanNo);
                FeesData.Checkstud = true;
                return;
            }
            if ($scope.studpageAdmissionList.length == $scope.TotalDelectFrm) {
                $scope.headercheck = false;
            }
            var tot = 0;
            var chk = 0;
            for (var i = 0; i < $scope.studpageAdmissionList.length; i++) {
                if ($scope.studpageAdmissionList[i].Checkstud == false) {
                    tot = tot + 1;
                } else {
                    chk = chk + 1;
                }
            }
            if (tot != $scope.studpageAdmissionList.length) {
                $scope.headercheck = false;
            }
            if (chk == $scope.studpageAdmissionList.length) {
                $scope.headercheck = true;
            }

            $('#TotalDelectFrm').val(tot);
            $scope.TotalDelectFrm = tot;
        }
        $scope.DeSelect = function () {
            //if ($scope.studpageAdmissionList.length == 1) {
            //    alert("Only single student is present.");
            //    return;
            //}
            $scope.PreStudRegIDs = "";
            $scope.DelCnt = 0;
            $scope.DelFees = 0;
            for (var i = 0; i < $scope.studpageAdmissionList.length; i++) {
                if ($scope.studpageAdmissionList[i].Checkstud==false) {
                    if ($scope.PreStudRegIDs == "") {
                        $scope.PreStudRegIDs = $scope.studpageAdmissionList[i].PreStudRegID;
                    }
                    else {
                        $scope.PreStudRegIDs = $scope.PreStudRegIDs + ',' + $scope.studpageAdmissionList[i].PreStudRegID;
                    }
                    $scope.DelCnt = $scope.DelCnt + 1;
                    $scope.DelFees = $scope.DelFees + $scope.studpageAdmissionList[i].FormFees;
                }
            }
            $('#TotalDelectFrm').val($scope.DelCnt);
            $scope.TotalDelectFrm = $scope.DelCnt;

            if ($scope.PreStudRegIDs == "") {
                alert("DeSelect atleast single student");
                return;
            }
            var Updatedeletedata = ExamFeesPaidService.GetUpdateDeselectStudentForBridge(AppSettings.ExamInstID, $scope.PreStudRegIDs, $scope.ExamFeesPaidList.CollegeID, $scope.studpageAdmissionList[0].ChallanNo, $scope.studpageAdmissionList[0].CollegeTransDate, $scope.DelFees, $scope.DelCnt);
            Updatedeletedata.then(function (data) {
                alert("DeSelect Successfully");
                var ExamFormData = ExamFeesPaidService.GetExamFeesPaidListSummaryBridge(AppSettings.ExamInstID, $scope.ExamFeesPaidList.CollegeID, $scope.ExamFeesPaidList.CourseID, $scope.ExamFeesPaidList.ExamID, "B");
                ExamFormData.then(function (data, status, headers, config, error) {
                    if (data.length == 0) {
                        alert("Data not found");
                        $scope.ExamfeesData = [];
                        return;
                    } else {
                        for (var k = 0; k < data.length; k++) {
                            if ((data[k].TransactionID != null) && (data[k].TransactionID != undefined) && (data[k].TransactionID != "")) {
                                data[k].paydisable = true;
                            } else {
                                data[k].paydisable = false;
                            }
                        }
                        $scope.ExamfeesData = data;
                    }
                }, function (data, status, headers, config) {
                    alert(error);
                });
            }, function (error) {
                alert(error);
            });
        }
       // $scope.paybtndisable = false;
        $scope.PayFees = function (FeesData) {
          //  return;
            if ((FeesData.TransactionID != null) && (FeesData.TransactionID != undefined) && (FeesData.TransactionID !="")) {
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
            var ExamFormData = ExamFeesPaidService.GetInsertExamFeesPaymentChallanBridge(AppSettings.ExamInstID, $scope.ExamFeesPaidList.CollegeID, FeesData.ChallanNo, FeesData.NoofStudents, FeesData.FormFees, FeesData.LateFees, $scope.ExamFeesPaidList.ExamID, $scope.ExamFeesPaidList.CourseID, FeesData.CollegeTransDate);
            ExamFormData.then(function (data, status, headers, config, error) {
                var TotalRecorddata = ExamFeesPaidService.GetInsertFeesUpdate(AppSettings.ExamInstID, AppSettings.CollegeID, FeesData.ChallanNo, FeesData.CollegeTransDate, $scope.ExamFeesPaidList.ExamID, $scope.ExamFeesPaidList.CourseID);
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
                        var payurl = AppSettings.PaymentUrl + '?FormNo=' + 62 + "&ServiceID=" + 62 + "&FeeAmount=" + $scope.FeetotAmount + "&ChallanID=" + FeesData.ChallanID + "&CollegeID=" + AppSettings.CollegeID;
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
            var TotalRecorddata = ExamFeesPaidService.GetStudentDetailsByTransactionIDForBridge(AppSettings.ExamInstID, AppSettings.CollegeID, obj.ChallanID, obj.CollegeTransDate, $scope.ExamFeesPaidList.ExamID, $scope.ExamFeesPaidList.CourseID, obj.TransactionID);
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
                alert("No Any Rows Selected");
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