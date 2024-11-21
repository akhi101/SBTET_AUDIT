define(['app'], function (app) {
	app.controller("EligCertAppListController", function ($scope, $state, AppSettings, EligCertAppService) {
		$scope.EligCertAppList = {};
		$scope.CompanyName = AppSettings.CompanyName;
		$scope.LoginYear = AppSettings.SelectedYear;
		var gridColumns = [
			{ field: "SrNo", headerText: "S No", textAlign: ej.TextAlign.Left, width: 50 },
            { field: "FormNo", headerText: "FormNo", textAlign: ej.TextAlign.Right, width: 100 },
            { field: "SSCHallTicket", headerText: "SSCHallTicket", textAlign: ej.TextAlign.Right, width: 100 },
			{ field: "StudName", headerText: "Student Name", textAlign: ej.TextAlign.Left, width: 150 },
			{ field: "FatherName", headerText: "Father Name", textAlign: ej.TextAlign.Left, width: 150 },
			{ field: "Gender", headerText: "Gender", textAlign: ej.TextAlign.Left, width: 80 },
            { field: "MobileNo", headerText: "MobileNo", textAlign: ej.TextAlign.Right, width: 100 },
			{ field: "EligCertID", headerText: "EligCertID", visible: true, textAlign: ej.TextAlign.Right, width: 0 },
			{ field: "EleventhBoardID", headerText: "EleventhBoardID", visible: true, textAlign: ej.TextAlign.Right, width: 0 },
		];
		$scope.EditData = "N";
		$scope.EligCertAppdata = [];
		$("#EligCertApps").ejGrid({
			dataSource: $scope.EligCertAppdata,
			allowPaging: true,
			pageSettings: { pageSize: 10 },
			allowSearching: true,
			allowScrolling: true,
			allowResizeToFit: true,
			allowFiltering: true,
            toolbarSettings: { showToolbar: true, toolbarItems: [ej.Grid.ToolBarItems.Search] },//ej.Grid.ToolBarItems.WordExport, ej.Grid.ToolBarItems.ExcelExport, ej.Grid.ToolBarItems.PdfExport, 
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
				if (sender.data.EleventhBoardID != 0) {
					$state.go('StudentRequestBoard.EligCertAppSecond', { EligCertID: sender.data.EligCertID });
				}
				else {
					$state.go('StudentRequestBoard.EligCertAppFirst', { EligCertID: sender.data.EligCertID });
				}
			}
		}

        var UserGrp = "";
        if (AppSettings.SysUsrGrpID == 2) {
            UserGrp = "A";
        } else {
            UserGrp = "O";
        }
        var EditData = false;
        if ($scope.EditData == 'Y') {
            EditData = true;
        } else {
            EdiData = false;
        }
        var EligCertAppdata = EligCertAppService.FillEligCertAppDetailsList(UserGrp, EditData);
        EligCertAppdata.then(function (data) {
            if (data.length > 0) {
                var SrNo = 1
                for (var i = 0; i < data.length; i++) {
                    data[i].SrNo = SrNo;
                    SrNo = SrNo + 1;
                }
                $scope.EligCertAppdata = data;
            } else {
                alert("Data Not Found");
                return;
            }
        }, function (error) {
            alert(error);
            });
        $scope.ChangeChange = function () {
            var UserGrp = "";
            if (AppSettings.SysUsrGrpID == 2) {
                UserGrp = "A";
            } else {
                UserGrp = "O";
            }
            var EditData = false;
            if ($scope.EditData == 'Y') {
                EditData = true;
            } else {
                EdiData = false;
            }
            var EligCertAppdata = EligCertAppService.FillEligCertAppDetailsList(UserGrp, EditData);
            EligCertAppdata.then(function (data) {
                if (data.length > 0) {
                    var SrNo = 1
                    for (var i = 0; i < data.length; i++) {
                        data[i].SrNo = SrNo;
                        SrNo = SrNo + 1;
                    }
                    $scope.EligCertAppdata = data;
                } else {
                    alert("Data Not Found");
                    return;
                }
            }, function (error) {
                alert(error);
            });
        }
	});
});