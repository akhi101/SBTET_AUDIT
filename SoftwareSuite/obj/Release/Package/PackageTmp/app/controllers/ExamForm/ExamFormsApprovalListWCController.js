define(['app'], function (app) {
    app.controller("ExamFormsApprovalListWCController", function ($scope, $localStorage, $state, AppSettings, ExamFormsApprovalService) {
        $scope.ExamFormsApprovalList = {};
        $scope.ExamFormsApprovalList.CourseID = "0";
        $scope.CompanyName = AppSettings.CompanyName;
        $scope.LoginYear = AppSettings.SelectedYear;
        var PageNm = $state.current.name.split(".")[1];
        var RightForCurrentPage = [];
        var UsersRightsdata = [];
        UsersRightsdata = AppSettings.UserRights;
        for (var i = 0; i < UsersRightsdata.length; i++) {
            if (UsersRightsdata[i].GridFormToOpen == PageNm) {
                var obj = {};
                obj.isaddable = UsersRightsdata[i].isaddable;
                RightForCurrentPage.push(obj);
            }
        }
        $scope.ForBoardDisable = true;
        $scope.ExamDisable = true;
        if (AppSettings.CollegeID == 0) {
            $scope.ForBoardDisable = false;
            var DistrictList = ExamFormsApprovalService.GetDistrictListByStateID(1);
            DistrictList.then(function (Districtdata, status, headers, config, error) {
                $scope.DistrictList = Districtdata;
            }, function (error) {
                alert(error);
            });
        } else { $scope.ExamFormsApprovalList.CollegeID = AppSettings.CollegeID; }
        $scope.FillMandal = function (DistrictID) {
            if ((DistrictID > 0) || (DistrictID != undefined)) {
                $scope.CourseList = [];
                $scope.ExamList = [];
                $scope.MainGroupList = [];
                $scope.CollegeList = [];
                $scope.MandalList = [];
                $scope.MandalDisable = false;
                $scope.CollegeDisable = false;
                var MandalList = ExamFormsApprovalService.GetMandalListByDistrict(DistrictID);
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
                var CollegeList = ExamFormsApprovalService.GetCollegeListByDistrictAndMandal($scope.ExamFormsApprovalList.DistrictID, MandalID);
                CollegeList.then(function (CollegeListdata, status, headers, config, error) {
                    if (CollegeListdata.length == 0) {
                        $scope.CollegeList = [];
                        alert("There is no college in this mandal");
                        return;
                    } else {
                        $scope.CollegeList = CollegeListdata;
                        $scope.ExamFormsApprovalList.CollegeID = "";
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

                var CourseList = ExamFormsApprovalService.GetCourseListForRegStud($scope.ExamFormsApprovalList.CollegeID);
                CourseList.then(function (BasicCoursedata, status, headers, config, error) {
                    $scope.CourseList = BasicCoursedata;
                    $scope.ExamFormsApprovalList.CourseID = "" + $scope.CourseList[0].CourseID + "";
                    $scope.NFillCoursePart($scope.ExamFormsApprovalList.CourseID);
                }, function (error) {
                    alert(error);
                });
            }
        }
        if (AppSettings.CollegeID != 0) {
            var CourseList = ExamFormsApprovalService.GetCourseListForRegStud(AppSettings.CollegeID);
            CourseList.then(function (BasicCoursedata, status, headers, config, error) {
                $scope.CourseList = BasicCoursedata;
                $scope.ExamFormsApprovalList.CourseID = "" + $scope.CourseList[0].CourseID + "";
                $scope.NFillCoursePart($scope.ExamFormsApprovalList.CourseID);
            }, function (error) {
                alert(error);
            });
        }
        //if (AppSettings.CollegeID != 0) {
        //    $scope.CatList = [];
        //    var CatList = ExamFormsApprovalService.GetCatListForRegStud(AppSettings.CollegeID, AppSettings.AcdYrID);
        //    CatList.then(function (BasicCatdata, status, headers, config, error) {
        //        $scope.CatList = BasicCatdata;
        //    }, function (error) {
        //        alert(error);
        //    });
        //}

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

        $scope.NFillCoursePart = function (CourseID) {
            $scope.ExamList = [];
            if ((CourseID != "") && (CourseID != null)) {
                if (CourseID != 0) {
                    var ExamList = ExamFormsApprovalService.GetBasicExamList(CourseID, AppSettings.AcdYrID);
                    ExamList.then(function (BasicExamdata, status, headers, config, error) {
                        $scope.ExamDisable = false;
                        $scope.ExamList = BasicExamdata;


                        var GroupList = ExamFormsApprovalService.GetBasicGroupList(CourseID, AppSettings.AcdYrID);
                        GroupList.then(function (BasicGrpdata, status, headers, config, error) {
                            $scope.GrpDisable = false;
                            $scope.MainGroupList = BasicGrpdata;
                        }, function (error) {
                            alert(error);
                        });
                    }, function (error) {
                        alert(error);
                    });
                }
            }
        }

        //Anil
        $scope.FillCoursePart = function (CourseID) {
            $scope.GrpList = [];
            if ((CourseID != "") && (CourseID != null)) {
                var GroupList = ExamFormsApprovalService.GetBasicGroupList(CourseID, AppSettings.CollegeID);
                    GroupList.then(function (BasicGrpdata, status, headers, config, error) {
                        $scope.GrpDisable = false;
                        $scope.MainGroupList = BasicGrpdata;
                }, function (error) {
                    alert(error);
                });
            }
        }

        $scope.AppDisable = false;
        $scope.LoadImg = false;
        
        $scope.Show = function () {
            $scope.ExamFormsApprovalList.TotalCondidate = "";
            $scope.ExamFormsApprovalList.TotalFeeAmountSelected = "";
            $scope.ExamFormsApprovalList.TotalCondidateCount = "";
            $scope.ExamFormsApprovalList.TotalFeeAmount = "";
            $scope.headercheck = false;
            $scope.ExamFormsApprovalData = [];
            if (($scope.ExamFormsApprovalList.CourseID == undefined) || ($scope.ExamFormsApprovalList.CourseID == "")) {
                alert("Select stream");
                return;
            }
            if (($scope.ExamFormsApprovalList.ExamID == undefined) || ($scope.ExamFormsApprovalList.ExamID == "")) {
                alert("Select Year");
                return;
            }
            if (($scope.ExamFormsApprovalList.MainGrpID == undefined) || ($scope.ExamFormsApprovalList.MainGrpID == "")) {
                $scope.ExamFormsApprovalList.MainGrpID = 0;
            }
            if (($scope.ExamFormsApprovalList.CatID == undefined) || ($scope.ExamFormsApprovalList.CatID == "")) {
                $scope.ExamFormsApprovalList.CatID = 0;
            }
            $scope.AppDisable = true;
            $scope.LoadImg = true;
            for (var i = 0; i < $scope.ExamList.length; i++) {
                if ($scope.ExamList[i].ExamID == $scope.ExamFormsApprovalList.ExamID) {
                    $scope.SequenceNo = $scope.ExamList[i].SequenceNo;
                }
            }
            var ExamFormData = ExamFormsApprovalService.GetExamFormsApprovalList(AppSettings.ExamInstID, $scope.ExamFormsApprovalList.CollegeID, $scope.ExamFormsApprovalList.CourseID, $scope.ExamFormsApprovalList.ExamID, $scope.ExamFormsApprovalList.MainGrpID, $scope.ExamFormsApprovalList.CatID);//, $scope.ExamFormsApprovalList.MainGrpID
            ExamFormData.then(function (data, status, headers, config, error) {
                if (data.length == 0) {
                    alert("Data not found");
                    $scope.ExamFormsApprovalData = [];
                    $scope.AppDisable = false;
                    $scope.LoadImg = false;
                    return;
                } else {
                    $scope.ExamFormsApprovalData = data;
                    var ChallanNoData = ExamFormsApprovalService.GetChallanNo(AppSettings.ExamInstID, $scope.ExamFormsApprovalList.ExamID, $scope.ExamFormsApprovalList.CollegeID);
                    ChallanNoData.then(function (data, status, headers, config, error) {
                        if (data.length == 0) {
                            alert("Data not found");
                            $scope.AppDisable = false;
                            $scope.LoadImg = false;
                            return;
                        } else {
                            $scope.AppDisable = false;
                            $scope.LoadImg = false;
                            $scope.ChallanData = data;
                            $scope.ChallanNo = data[0].ChallanNo;
                            $scope.TotalFeeAmount = 0;
                            var totcnt = 0;
                            for (var i = 0; i < $scope.ExamFormsApprovalData.length; i++) {
                                $scope.TotalFeeAmount = $scope.TotalFeeAmount + $scope.ExamFormsApprovalData[i].FormFees;
                                totcnt = totcnt + 1;
                                $scope.ExamFormsApprovalData[i].srno = totcnt;
                                $scope.ExamFormsApprovalData[i].PendingPhoto = true;
                                var studyear = $scope.ExamFormsApprovalData[i].PRNNo.substring(0, 2); 
                                if (($scope.SequenceNo == "1") && ($scope.ExamFormsApprovalData[i].StudCatID != 3) && (studyear == 20)) {
                                    if (($scope.ExamFormsApprovalData[i].PhotoPath == "") || ($scope.ExamFormsApprovalData[i].PhotoPath == undefined) || ($scope.ExamFormsApprovalData[i].PhotoPath == "N")) {
                                        $scope.ExamFormsApprovalData[i].PendingPhoto = false;
                                    }
                                    if (($scope.ExamFormsApprovalData[i].SignPath == "") || ($scope.ExamFormsApprovalData[i].SignPath == undefined) || ($scope.ExamFormsApprovalData[i].SignPath == "N")) {
                                        $scope.ExamFormsApprovalData[i].PendingPhoto = false;
                                    }
                                }
                                //var studyear = $scope.ExamFormsApprovalData[i].PRNNo.substring(0,2); 
                                //alert(studyear);
                                 
                            }
                            $scope.ExamFormsApprovalList.TotalCondidateCount = totcnt;
                            $('#TotalCondidateCount').val(totcnt);
                            $scope.ExamFormsApprovalList.TotalFeeAmount = $scope.TotalFeeAmount;
                            $('#TotalFeeAmount').val($scope.TotalFeeAmount);
                        }
                    });
                }
            }, function (data, status, headers, config) {
                alert(error);
                $scope.AppDisable = false;
            });
        }
        $scope.FormsApproval = function () {
            if ($scope.ExamFormsApprovalData.length == 0) {
                alert("No data found");
                return;
            }
            var ExamForms = [];
            $scope.StudentCount = 0;
            $scope.TotalFeeAmount = 0;
            $scope.LateFeeAmount = 0;
           // var OrderID = makeid();
            for (var i = 0; i < $scope.ExamFormsApprovalData.length; i++) {
                if ($scope.ExamFormsApprovalData[i].CheckExmFrm == true) {
                    var obj = {};
                    $scope.StudentCount = $scope.StudentCount + 1;
                    obj.ExmFrmID = $scope.ExamFormsApprovalData[i].ExmFrmID;
                    obj.FormFees = $scope.ExamFormsApprovalData[i].FormFees;
                    obj.CollegeID = AppSettings.CollegeID;
                    obj.PRNNo = $scope.ExamFormsApprovalData[i].PRNNo;
                    obj.ExamInstID = AppSettings.ExamInstID;
                    obj.AcdYrID = AppSettings.AcdYrID;
                    obj.PreStudRegID = $scope.ExamFormsApprovalData[i].PreStudRegID;
                    obj.ChallanNo = $scope.ChallanNo;
                    //obj.MerchTxnRef = OrderID;
                    $scope.TotalFeeAmount = $scope.TotalFeeAmount + $scope.ExamFormsApprovalData[i].FormFees;
                    $scope.LateFeeAmount = $scope.LateFeeAmount + $scope.ExamFormsApprovalData[i].LateFees;
                    obj.ExamID = $scope.ExamFormsApprovalList.ExamID;
                    ExamForms.push(obj);
                }
            }
            if (ExamForms.length == 0) {
                alert("No Rows Selected");
                return;
            }
            var ExamFormsdata = ExamFormsApprovalService.PostApprovalForms(ExamForms);
            ExamFormsdata.then(function (data) {
                //var ExamFormData = ExamFormsApprovalService.GetInsertExamFeesPaymentChallan(AppSettings.ExamInstID, $scope.ExamFormsApprovalList.CollegeID, $scope.ChallanNo, $scope.StudentCount, $scope.TotalFeeAmount, $scope.LateFeeAmount, $scope.ExamFormsApprovalList.ExamID, $scope.ExamFormsApprovalList.CourseID);
                //ExamFormData.then(function (data, status, headers, config, error) {
                //    $scope.ExamFormsApprovalData = data;
                alert("Updated Successfully");
                $scope.ExamFormsApprovalData = [];
                var tot = 0;
                $('#TotalCondidate').val(0);
                $('#TotalCondidateCount').val(0);
                $('#TotalAmount').val(0);
                
                //var ExamFormData = ExamFormsApprovalService.GetExamFormsApprovalList(AppSettings.ExamInstID, $scope.ExamFormsApprovalList.CollegeID, $scope.ExamFormsApprovalList.CourseID, $scope.ExamFormsApprovalList.ExamID);
                //ExamFormData.then(function (data, status, headers, config, error) {
                //    $scope.ExamFormsApprovalData = data;
                //}, function (data, status, headers, config) {
                //    alert(error);
                //});
                //}, function (data, status, headers, config) {
                //    alert(error);
                //});
            }, function (error) {
                alert(error);
            });
        }

        var gridColumns = [
            { headerTemplateID: "#headerTemplate", template: true, templateID: "#checkboxTemplate", textAlign: ej.TextAlign.Center, width: 50 },
            { field: "CheckExmFrm", headerText: "CheckExmFrm", visible: false, textAlign: ej.TextAlign.Left },
            { field: "ExmFrmID", headerText: "ExmFrmID", textAlign: ej.TextAlign.Right, visible: false },
            { field: "PreStudRegID", headerText: "PreStudRegID", textAlign: ej.TextAlign.Right, visible: false },
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
            { field: "PhysDisbCode", headerText: "Ph.", textAlign: ej.TextAlign.Right, width: 30, allowEditing: false },
            { field: "CasteName", headerText: "Caste", textAlign: ej.TextAlign.Right, width: 50, allowEditing: false },
            { field: "FirstYearSubjects", headerText: "1st Yr Subjects", textAlign: ej.TextAlign.Right, width: 200, allowEditing: false },
            { field: "SecondYearSubjects", headerText: "2nd Yr Subjects", textAlign: ej.TextAlign.Right, width: 200, allowEditing: false },
            { field: "ExmFrmID", headerText: "ExmFrmID", visible: true, textAlign: ej.TextAlign.Right, width: 0 },
            { field: "ExamInstID", headerText: "ExamInstID", visible: true, textAlign: ej.TextAlign.Right, width: 0 },
        ];
        $scope.ExamFormsApprovalData = [];
        $("#ExamFormsApprovalGrid").ejGrid({
            dataSource: $scope.ExamFormsApprovalData,
            allowPaging: true,
            pageSettings: { pageSize: 10 },
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
        // Edit delete record
        $scope.doubleclick = function doubleclick(sender, args) {
            //if (this.multiSelectCtrlRequest == false) {
            //    $state.go('ExamForm.ExamFormsApproval', { ExmFrmID: sender.data.ExmFrmID });
            //}
        }
        function checkChange(e) {
            gridObj = $("#ExamFormsApprovalGrid").data("ejGrid");
            var rowCheck = $(".rowCheckbox:checked"), cp = gridObj.model.pageSettings.currentPage;
            for (var k = 0; k < $scope.ExamFormsApprovalData.length; k++) {
                var totAmount = 0;
                var tot = 0;
                //if (gridObj.model.selectedRecords[0] != undefined) {
                if (gridObj.model.selectedRecords[0].ExmFrmID == $scope.ExamFormsApprovalData[k].ExmFrmID) {
                    if (e.isChecked == true) {
                        $scope.ExamFormsApprovalData[k].CheckExmFrm = 1;

                    }
                    else {
                        $scope.ExamFormsApprovalData[k].CheckExmFrm = 0;
                    }
                }
                //}
            }
        }
        function makeid() {
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

            for (var i = 0; i < 8; i++)
                text += possible.charAt(Math.floor(Math.random() * possible.length));

            return text;
        }
        function headCheckChange(e) {
            $("#ExamFormsApprovalGrid .rowCheckbox").ejCheckBox({ "change": checkChange });
            gridObj = $("#ExamFormsApprovalGrid").data("ejGrid");
            if ($("#headchk").is(':checked')) {
                $(".rowCheckbox").ejCheckBox({ "checked": true });
            }
            else {
                $(".rowCheckbox").ejCheckBox({ "checked": false });
            }
        }
        $scope.refreshTemplate = function (args) {
            $("#ExamFormsApprovalGrid .rowCheckbox").ejCheckBox({ "change": checkChange });
            $("#headchk").ejCheckBox({ visible: false, "change": headCheckChange });
        }
        $scope.actioncomplete = function (args) {
            if (args.requestType == "beginedit" || args.requestType == "add") {
                $("#ExamFormsApprovalGrid").ejNumericTextbox({ showSpinButton: false, focusOut: onkeydown });
            }
            $("#headchk").ejCheckBox({ width: 100, visible: false });
        }
        $scope.GetCheckStudent = function (obj) {
            var tot = 0;
            var totAmount = 0;
            for (var i = 0; i < $scope.ExamList.length; i++) {
                if ($scope.ExamList[i].ExamID == $scope.ExamFormsApprovalList.ExamID) {
                    $scope.SequenceNo = $scope.ExamList[i].SequenceNo;
                }
            }
            if (($scope.SequenceNo == "1") && (obj.StudCatID != 3)) {
                if ((obj.PhotoPath == "") || (obj.PhotoPath == undefined) || (obj.PhotoPath == "N")) {
                    alert("Photo is not uploaded..Please Upload the Photo.");
                    obj.CheckExmFrm = false;
                    return;
                }
                if ((obj.SignPath == "") || (obj.SignPath == undefined) || (obj.SignPath == "N")) {
                    alert("Signature is not uploaded..Please Upload the Signature.");
                    obj.CheckExmFrm = false;
                    return;
                }
                if ((obj.PreRegTransactionID == "") || (obj.PreRegTransactionID == undefined) || (obj.PreRegTransactionID == null)) {
                    alert("Recognition Fee Payment not done..Please Payment.");
                    obj.CheckExmFrm = false;
                    return;
                } 
            }
            if (obj.CheckExmFrm == false) {
                if ($scope.headercheck == true) { $scope.headercheck = false; }
            } 
            
            for (var i = 0; i < $scope.ExamFormsApprovalData.length; i++) {
                if ($scope.ExamFormsApprovalData[i].CheckExmFrm == true) {
                    tot = tot + 1;
                    totAmount = totAmount + $scope.ExamFormsApprovalData[i].FormFees;
                }
            }
            $('#TotalCondidate').val(tot);
            $('#TotalFeeAmountSelected').val(totAmount);
            $scope.ExamFormsApprovalList.TotalCondidate = tot;
            $scope.ExamFormsApprovalList.TotalFeeAmountSelected = totAmount;
            if ($scope.ExamFormsApprovalList.TotalCondidate == $scope.ExamFormsApprovalList.TotalCondidateCount) {
                $scope.headercheck = true;
            }
        }
        $scope.GetCheckStudentHeader = function (headercheck) {
            var tot = 0;
            var totAmount = 0;
            var PhotoNull = "";
            var TransNull = "";
            var StudCatID = 0;
            for (var i = 0; i < $scope.ExamList.length; i++) {
                if ($scope.ExamList[i].ExamID == $scope.ExamFormsApprovalList.ExamID) {
                    $scope.SequenceNo = $scope.ExamList[i].SequenceNo;
                }
            }
            if (headercheck == true) {
                for (var i = 0; i < $scope.ExamFormsApprovalData.length; i++) {
                    
                    if (($scope.ExamFormsApprovalData[i].PhotoPath == "") || ($scope.ExamFormsApprovalData[i].PhotoPath == undefined) || ($scope.ExamFormsApprovalData[i].PhotoPath == "N")) {
                        PhotoNull = "1";
                    }
                    if (($scope.ExamFormsApprovalData[i].SignPath == "") || ($scope.ExamFormsApprovalData[i].SignPath == undefined) || ($scope.ExamFormsApprovalData[i].SignPath == "N")) {
                        PhotoNull = "1";
                    }
                    if (($scope.ExamFormsApprovalData[i].PreRegTransactionID == "") || ($scope.ExamFormsApprovalData[i].PreRegTransactionID == undefined)) {
                        TransNull = "1";
                    }
                    if ($scope.ExamFormsApprovalData[i].StudCatID == 3) {
                        StudCatID = $scope.ExamFormsApprovalData[i].StudCatID;
                    }
                }
                if (($scope.SequenceNo == "1") && (StudCatID != 3)) {
                    if (PhotoNull != "") {
                        alert("Photo and Signature is not uploaded For Some Students..Please Upload the Photo and Signature.");
                        $scope.headercheck = false;
                        return;
                    }
                    if (TransNull != "") {
                        alert("Recognition Fee Payment not done For Some Students..Please Payment.");
                        headercheck = false;
                        return;
                    } 
                }
            }
           
            $('#TotalCondidate').val(tot);
            $scope.ExamFormsApprovalList.ExamFormsApprovalData = tot;
            for (var i = 0; i < $scope.ExamFormsApprovalData.length; i++) {
                if (headercheck == true) {
                    $scope.ExamFormsApprovalData[i].CheckExmFrm = true;
                    tot = tot + 1;
                    totAmount = totAmount + $scope.ExamFormsApprovalData[i].FormFees;
                }
                else {
                    $scope.ExamFormsApprovalData[i].CheckExmFrm = false;
                    totAmount = 0;
                }
            }
            $('#TotalCondidate').val(tot);
            $scope.ExamFormsApprovalList.TotalCondidate = tot;
            $('#TotalFeeAmountSelected').val(totAmount);
            $scope.ExamFormsApprovalList.TotalFeeAmountSelected = totAmount; 
        }
        $scope.GetPendingPhotos = function () {
            var CollegeList = ExamFormsApprovalService.GetAdmissionLoginDetail($scope.ExamFormsApprovalList.CollegeID, AppSettings.LoggedUserId, AppSettings.AcdYrID);
            CollegeList.then(function (Collegedata, status, headers, config, error) {
                if (Collegedata.length > 0) {
                    var Clg_TypeDesc = "";
                    if (Collegedata[0].clg_type == "girls") {
                        Clg_TypeDesc = "F";
                    } else if (Collegedata[0].clg_type == "boys") {
                        Clg_TypeDesc = "M";
                    } else {
                        Clg_TypeDesc = "Co";
                    }

                    $localStorage.CollegeData = {
                        CollegeCatName: Collegedata[0].category_name,
                        Clg_Type: Clg_TypeDesc,
                        college_name1: Collegedata[0].college_name1
                    }
                    AppSettings.CollegeCatName = Collegedata[0].category_name;
                    AppSettings.Clg_Type = Clg_TypeDesc;
                    AppSettings.college_name1 = Collegedata[0].college_name1;
                    $state.go('Admission.PhotoCheckListReport');
                } else {
                    //if ((AppSettings.TypeFlag != 'B') && (AppSettings.TypeFlag != 'D')) {
                    //    alert("No Rights For this user");
                    //}
                    $localStorage.CollegeData = {
                        CollegeCatName: '',
                        Clg_Type: '',
                        college_name1: ''
                    }
                    AppSettings.CollegeCatName = '';
                    AppSettings.Clg_Type = '';
                    AppSettings.college_name1 = '';
                    $state.go('Admission.PhotoCheckListReport');
                }
            }, function (error) {
                alert(error);
            });
        };
    });
});