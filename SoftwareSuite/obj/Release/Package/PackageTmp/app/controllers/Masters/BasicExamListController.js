define(['app'], function (app) {
	app.controller("BasicExamListController", function ($scope, $state, AppSettings, BasicExamService) {
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

		var gridColumns = [
			
			{ field: "CourseName", headerText: " Stream  ", textAlign: ej.TextAlign.Left, width: 40 },
			{ field: "ExmName", headerText: " Exam ", textAlign: ej.TextAlign.Left, width: 60 },
			{ field: "ExmShrtName", headerText: "Short Name", textAlign: ej.TextAlign.Left, width: 30 },
			{ field: "ExmCode", headerText: "ExmCode", textAlign: ej.TextAlign.Left, width: 30 },
            { field: "Active", headerText: "Status", textAlign: ej.TextAlign.Left, width: 20 },
			{ field: "ExamID", headerText: "ExamID", textAlign: ej.TextAlign.Right, visible: false } 
        ];
		$scope.BasicExamList = [];
		$("#BasicExam").ejGrid({
			dataSource: $scope.BasicExamList,
            allowPaging: true,
            pageSettings: { pageSize: 10 },
            allowSearching: true,
            allowScrolling: true,
            allowResizeToFit: true,
            allowFiltering: true,
			toolbarSettings: { showToolbar: true, toolbarItems: [ej.Grid.ToolBarItems.Add, ej.Grid.ToolBarItems.WordExport, ej.Grid.ToolBarItems.ExcelExport, ej.Grid.ToolBarItems.PdfExport, ej.Grid.ToolBarItems.Search] },
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
        // Add new Record
        function AddNew() {
            //if (RightForCurrentPage[0].isaddable != 'Y') {
            //     alert("You Don't have Add Rights");
            //    return;
            // } else {
			$state.go('Masters.BasicExam', { ExamID: 0 });
            //}
        }
        // Edit delete record
        $scope.doubleclick = function doubleclick(sender, args) {
            if (this.multiSelectCtrlRequest == false) {
				$state.go('Masters.BasicExam', { ExamID: sender.data.ExamID });
            }
        }
		//var BasicExamdata = BasicExamService.GetBasicExamList();
		//BasicExamdata.then(function (data) {
		//	$scope.BasicExamList = data;
  //      }, function (error) {
  //          alert(error);
  //          });


        var BasicExamdata = BasicExamService.GetBasicExamForList(3);
        BasicExamdata.then(function (data) {
            $scope.BasicExamList = data;
        }, function (error) {
            alert(error);
        });

        $scope.FillExamList = function (ActiveFlag) {
            if (ActiveFlag == undefined) { ActiveFlag = 3; }
            if (ActiveFlag == "") { ActiveFlag = 3; }
            var BasicExamdata = BasicExamService.GetBasicExamForList(ActiveFlag);
            BasicExamdata.then(function (data) {
                $scope.BasicExamList = data;
            }, function (error) {
                alert(error);
            });
        }

    });
});