define(['app'], function (app) {
	app.controller("PreExamOtherCenterController", function ($scope, $state, $stateParams, AppSettings, PreExamOtherCenterService, BasicDistrictsService) {
		$scope.PreExamOtherCenter = { };
		$scope.PreExamOtherCenter.ExamInstID = AppSettings.ExamInstID;
		var PageNm = $state.current.name.split(".")[1] + "List";
		var PreExamOtherCenterRightsdata = [];
		PreExamOtherCenterRightsdata = AppSettings.UserRights;
		for (var i = 0; i < PreExamOtherCenterRightsdata.length; i++) {
			if (PreExamOtherCenterRightsdata[i].GridFormToOpen == PageNm) {
				if ($scope.PreExamOtherCenter.OtherCenterID == 0) {
					if (PreExamOtherCenterRightsdata[i].isaddable == 'Y') {
						$scope.isupdatableDisable = false;
					} else {
						$scope.isupdatableDisable = true;
					}
					$scope.isdeletableDisable = true;
				} else {
					if (PreExamOtherCenterRightsdata[i].isupdatable == 'Y') {
						$scope.isupdatableDisable = false;
					}
					else {
						$scope.isupdatableDisable = true;
					}
					if (PreExamOtherCenterRightsdata[i].isdeletable == 'Y') {
						$scope.isdeletableDisable = false;
					} else {
						$scope.isdeletableDisable = true;
					}
				}
			}
        }
        $scope.isupdatableDisable = false;
        $scope.isdeletableDisable = true;
        $scope.districtDisable = false;
        $scope.PreExamOtherCenter.SysUsrGrpID = 0;
        if (AppSettings.SysUsrGrpID == 7) {
            $scope.PreExamOtherCenter.SysUsrGrpID = 9;
        } else if (AppSettings.SysUsrGrpID == 9) {
            $scope.PreExamOtherCenter.SysUsrGrpID = 2;
        } else if (AppSettings.SysUsrGrpID == 2) {
            $scope.PreExamOtherCenter.SysUsrGrpID = 11;
        } else if (AppSettings.SysUsrGrpID == 11) {
            $scope.PreExamOtherCenter.SysUsrGrpID = 23;
        }


        FillData();
        function FillData() {
            //var BasicDistrictList = BasicDistrictsService.GetBasicDistrictListByDistrictIds(AppSettings.DistrictIDs);

            var BasicDistrictList = [];

            if (AppSettings.SysUsrGrpID != 23) {
                BasicDistrictList = BasicDistrictsService.GetBasicDistrictListByDistrictIds(AppSettings.DistrictIDs);
            } else {
                BasicDistrictList = BasicDistrictsService.GetDistrictListForCOE(AppSettings.ExamInstID,1);
            }

            BasicDistrictList.then(function (DistrictData, status, headers, config, error) {
                $scope.BasicDistrictList = DistrictData;
                if (($scope.PreExamOtherCenter.OtherCenterID == 0) || ($scope.PreExamOtherCenter.OtherCenterID == undefined)) {
                    $scope.PreExamOtherCenter.DistrictID = "" + $scope.BasicDistrictList[0].DistrictID + "";
                }
                if (AppSettings.SysUsrGrpID == 23) { $scope.FillListDataNew($scope.PreExamOtherCenter.DistrictID); }
                $scope.GetOtherCenterNewCode($scope.PreExamOtherCenter.DistrictID);
                if ($scope.PreExamOtherCenter.OtherCenterID > 0) {
                    var PreExamOtherCenterdata = PreExamOtherCenterService.GetPreExamOtherCenterById($scope.PreExamOtherCenter.OtherCenterID);
                    PreExamOtherCenterdata.then(function (data) {
                        $scope.PreExamOtherCenter = data[0];
                        if ($scope.PreExamOtherCenter.SensiCompli == "Y") {
                            $scope.PreExamOtherCenter.SensiCompli = true;
                        } else {
                            $scope.PreExamOtherCenter.SensiCompli = false;
                        }
                        if ($scope.PreExamOtherCenter.Vocational == "Y") {
                            $scope.PreExamOtherCenter.Vocational = true;
                        } else {
                            $scope.PreExamOtherCenter.Vocational = false;
                        }
                        if ($scope.PreExamOtherCenter.MinorSubject == "Y") {
                            $scope.PreExamOtherCenter.MinorSubject = true;
                        } else {
                            $scope.PreExamOtherCenter.MinorSubject = false;
                        }
                        $scope.districtDisable = true;
                        $scope.PreExamOtherCenter.DistrictID = "" + data[0].DistrictID + "";
                    }, function (error) {
                        alert(error);
                    });
                }
            }, function (Castdata, status, headers, config) {
                alert(error);
            });
        }
        $scope.GetOtherCenterNewCode = function (DistrictID) {
            if (DistrictID != "" || DistrictID != undefined) {
                var NewCodeList = PreExamOtherCenterService.GetOtherCenterNewCode(DistrictID);
                NewCodeList.then(function (NewCodeData, status, headers, config, error) {
                    $scope.PreExamOtherCenter.NewCode = NewCodeData[0].NewCode;
                    $scope.PreExamOtherCenter.OtherCenterNo = NewCodeData[0].OtherCenterNo;
                    if (AppSettings.SysUsrGrpID == 23) { $scope.FillListDataNew($scope.PreExamOtherCenter.DistrictID); }
                }, function (NewCodeData, status, headers, config) {
                    alert(error);
                })
            }
        }
        $scope.SavePreExamOtherCenter = function () {
            
			$scope.isupdatableDisable = true;
			if ($scope.PreExamOtherCenter.OtherCenterID == undefined) { $scope.PreExamOtherCenter.OtherCenterID = 0; }
			if ($scope.PreExamOtherCenter.OtherCenterID == "") { $scope.PreExamOtherCenter.OtherCenterID = 0; }
            if (CheckValidation() == true) {

                var isConfirmed = confirm("Are you sure to save this record ?");
                if (isConfirmed == false) {
                    return;
                }
                

				if ($scope.PreExamOtherCenter.OtherCenterID == 0) {
					$scope.PreExamOtherCenter.CreLoginID = AppSettings.LoggedUserId;
					$scope.PreExamOtherCenter.UpdLoginID = AppSettings.LoggedUserId;
					if ($scope.PreExamOtherCenter.SensiCompli == true) {
						$scope.PreExamOtherCenter.SensiCompli = "Y";
					} else {
						$scope.PreExamOtherCenter.SensiCompli = "N";
					}
					if ($scope.PreExamOtherCenter.Vocational == true) {
						$scope.PreExamOtherCenter.Vocational = "Y";
					} else {
						$scope.PreExamOtherCenter.Vocational = "N";
					}
					if ($scope.PreExamOtherCenter.MinorSubject == true) {
						$scope.PreExamOtherCenter.MinorSubject = "Y";
					} else {
						$scope.PreExamOtherCenter.MinorSubject = "N";
                    }

                    $scope.PreExamOtherCenter.SysUsrGrpID = 0;
                    if (AppSettings.SysUsrGrpID == 7) {
                        $scope.PreExamOtherCenter.SysUsrGrpID = 9;
                    } else if (AppSettings.SysUsrGrpID == 9) {
                        $scope.PreExamOtherCenter.SysUsrGrpID = 2;
                    } else if (AppSettings.SysUsrGrpID == 2) {
                        $scope.PreExamOtherCenter.SysUsrGrpID = 11;
                    } else if (AppSettings.SysUsrGrpID == 11) {
                        $scope.PreExamOtherCenter.SysUsrGrpID = 23;
                    }

					var getPromise = PreExamOtherCenterService.AddPreExamOtherCenter($scope.PreExamOtherCenter);
					getPromise.then(function (msg) {
						alert("Added successfully!!");
						RedirectToListPage();
					}, function (error) {
						$scope.isupdatableDisable = false;
                        //alert(error);
                        if (error == '[{"Id":"","Message":"Already approved or forwared by higher authority, you cant edit"}]') {
                            alert("Already forwarded you can't edit");
                        } else { alert(error); }
					});
				}
				else {
					$scope.PreExamOtherCenter.UpdLoginID = AppSettings.LoggedUserId;
					$scope.PreExamOtherCenter.CreLoginID = AppSettings.LoggedUserId;
					$scope.PreExamOtherCenter.UpdLoginID = AppSettings.LoggedUserId;
					if ($scope.PreExamOtherCenter.SensiCompli == true) {
						$scope.PreExamOtherCenter.SensiCompli = "Y";
					} else {
						$scope.PreExamOtherCenter.SensiCompli = "N";
					}
					if ($scope.PreExamOtherCenter.Vocational == true) {
						$scope.PreExamOtherCenter.Vocational = "Y";
					} else {
						$scope.PreExamOtherCenter.Vocational = "N";
					}
					if ($scope.PreExamOtherCenter.MinorSubject == true) {
						$scope.PreExamOtherCenter.MinorSubject = "Y";
					} else {
						$scope.PreExamOtherCenter.MinorSubject = "N";
                    }

                    $scope.PreExamOtherCenter.SysUsrGrpID = 0;
                    if (AppSettings.SysUsrGrpID == 7) {
                        $scope.PreExamOtherCenter.SysUsrGrpID = 9;
                    } else if (AppSettings.SysUsrGrpID == 9) {
                        $scope.PreExamOtherCenter.SysUsrGrpID = 2;
                    } else if (AppSettings.SysUsrGrpID == 2) {
                        $scope.PreExamOtherCenter.SysUsrGrpID = 11;
                    } else if (AppSettings.SysUsrGrpID == 11) {
                        $scope.PreExamOtherCenter.SysUsrGrpID = 23;
                    }

					var getPromise = PreExamOtherCenterService.UpdatePreExamOtherCenter($scope.PreExamOtherCenter);
					getPromise.then(function (msg) {
						alert("Update successfully!!");
						RedirectToListPage();
					}, function (error) {
						$scope.isupdatableDisable = false;
                        //alert(error);
                        if (error == '[{"Id":"","Message":"Already approved or forwared by higher authority, you cant edit"}]') {
                            alert("Already forwarded you can't edit");
                        } else { alert(error); }
					});
				}
			} else {
				$scope.isupdatableDisable = false;
			}
		}
        $scope.DeletePreExamOtherCenter = function () {
            var isConfirmed = confirm("Are you sure to delete this record ?");
            if (isConfirmed) {
                //var getData = PreExamOtherCenterService.DeletePreExamOtherCenter($scope.PreExamOtherCenter.OtherCenterID, AppSettings.LoggedUserId);
                $scope.PreExamOtherCenter.SysUsrGrpID = 0;
                if (AppSettings.SysUsrGrpID == 7) {
                    $scope.PreExamOtherCenter.SysUsrGrpID = 9;
                } else if (AppSettings.SysUsrGrpID == 9) {
                    $scope.PreExamOtherCenter.SysUsrGrpID = 2;
                } else if (AppSettings.SysUsrGrpID == 2) {
                    $scope.PreExamOtherCenter.SysUsrGrpID = 11;
                } else if (AppSettings.SysUsrGrpID == 11) {
                    $scope.PreExamOtherCenter.SysUsrGrpID = 23;
                }
                var getData = PreExamOtherCenterService.DeletePreExamOtherCenter($scope.PreExamOtherCenter);
                getData.then(function (msg) {
                    alert('Record Deleted');
                    $scope.isdeletableDisable = true;
                    RedirectToListPage();
                }, function (error) {
                    //alert(error);
                    if (error == '[{"Id":"","Message":"Already approved or forwared by higher authority, you cant edit"}]') {
                        alert("Already forwarded you can't edit");
                    } else { alert(error); }
                });
            }
		}
		function CheckValidation() {
			if (($scope.PreExamOtherCenter.DistrictID == undefined) || ($scope.PreExamOtherCenter.DistrictID == "")) {
				alert("Select District");
				return false;
            }
            if (($scope.PreExamOtherCenter.NewCode == undefined) || ($scope.PreExamOtherCenter.NewCode == "")) {
                alert("Enter Code Of Other Center");
                return false;
            }
            if (($scope.PreExamOtherCenter.NameOfOtherCenter == undefined) || ($scope.PreExamOtherCenter.NameOfOtherCenter == "")) {
                alert("Enter Name Of Other Center");
                return false;
            }
            if (($scope.PreExamOtherCenter.ManagementName == undefined) || ($scope.PreExamOtherCenter.ManagementName == "")) {
                alert("Enter Name Of Management");
                return false;
            }
            if (($scope.PreExamOtherCenter.ColType == undefined) || ($scope.PreExamOtherCenter.ColType == "")) {
                alert("Enter Center Type");
                return false;
            }
            if (($scope.PreExamOtherCenter.PostOffice == undefined) || ($scope.PreExamOtherCenter.PostOffice == "")) {
                //alert("Enter Post Office");
                //return false;
                $scope.PreExamOtherCenter.PostOffice = "";
            }
            if (($scope.PreExamOtherCenter.PoliceStation == undefined) || ($scope.PreExamOtherCenter.PoliceStation == "")) {
                //alert("Enter Police Station");
                //return false;
                $scope.PreExamOtherCenter.PoliceStation = "";
            }
            if (($scope.PreExamOtherCenter.Address == undefined) || ($scope.PreExamOtherCenter.Address == "")) {
                alert("Enter Address");
                return false;
            }            
			else {
				return true;
			}
		}
		$scope.Exit = function () {
            //RedirectToListPage();
            $state.go('CenterManagemnet'); 
		}
		function RedirectToListPage() {
            $scope.PreExamOtherCenter = {};
            $scope.isupdatableDisable = false;
            FillListData();
            $scope.districtDisable = false;
            $state.go('CenterManagemnet.PreExamOtherCenter');
		}
        var gridColumns = [
            { field: "NameOfOtherCenter", headerText: "Other Center Name", textAlign: ej.TextAlign.Left, width: 40 },
            { field: "Address", headerText: " Address ", textAlign: ej.TextAlign.Left, width: 20 },
            { field: "ManagementName", headerText: "ManagementName", textAlign: ej.TextAlign.Left, width: 20 },
            { field: "OtherCenterID", headerText: "OtherCenterID", textAlign: ej.TextAlign.Right, visible: false }
        ];
        FillListData();
        //function FillListData() {
        //    $scope.PreExamOtherCenterList = [];
        //    var PreExamOtherCenterdata = PreExamOtherCenterService.GetPreExamOtherCenterList();
        //    PreExamOtherCenterdata.then(function (data) {
        //        $scope.PreExamOtherCenterList = data;
        //    }, function (error) {
        //        alert(error);
        //    });
        //}

        function FillListData() {
            $scope.PreExamOtherCenterList = [];
          
            var PreExamOtherCenterdata = PreExamOtherCenterService.GetPreExamOtherCenterListByDistrictID(AppSettings.DistrictIDs);
            PreExamOtherCenterdata.then(function (data) {
                $scope.PreExamOtherCenterList = data;
            }, function (error) {
                alert(error);
            });
        }
        $scope.FillListDataNew = function (DistrictID) {
            var PreExamOtherCenterdata = PreExamOtherCenterService.GetPreExamOtherCenterListByDistrictID(DistrictID);
            PreExamOtherCenterdata.then(function (data) {
                $scope.PreExamOtherCenterList = data;
            }, function (error) {
                alert(error);
            });
        }
        $("#PreExamOtherCenter").ejGrid({
            dataSource: $scope.PreExamOtherCenterList,
            allowPaging: true,
            pageSettings: { pageSize: 10 },
            allowSearching: true,
            allowScrolling: true,
            allowResizeToFit: true,
            allowFiltering: true,
            toolbarSettings: { showToolbar: true, toolbarItems: [ej.Grid.ToolBarItems.WordExport, ej.Grid.ToolBarItems.ExcelExport, ej.Grid.ToolBarItems.PdfExport, ej.Grid.ToolBarItems.Search] },
            editSettings: { allowAdding: true },
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
            if (this.multiSelectCtrlRequest == false) {
                $scope.PreExamOtherCenter.OtherCenterID = sender.data.OtherCenterID;
                FillData();
                if ($scope.PreExamOtherCenter.OtherCenterID > 0) {
                    $scope.isdeletableDisable = false;
                } else
                {
                    $scope.isdeletableDisable = true;
                }
               
            }
        }
	});
});
