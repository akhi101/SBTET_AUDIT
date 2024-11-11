define(['app'], function (app) {
	app.controller("BasicExamSubjectListController", function ($scope, $state, AppSettings, BasicExamSubjectService) {
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

            { field: "CourseName", headerText: " Stream ", textAlign: ej.TextAlign.Left, width: 20 },
			{ field: "ExmName", headerText: " Exam ", textAlign: ej.TextAlign.Left, width: 20 },
            { field: "ExmSubName", headerText: " Exam Subject ", textAlign: ej.TextAlign.Left, width:30 },
            { field: "ExmSubCode", headerText: "  Subject Code", textAlign: ej.TextAlign.Left, width: 30 },
			{ field: "MaxMarks", headerText: "MaxMarks", textAlign: ej.TextAlign.Left, width: 20 },
			{ field: "PassMarks", headerText: "PassMarks", textAlign: ej.TextAlign.Left, width: 20 },
			{ field: "EvalGrdName", headerText: "Grade", textAlign: ej.TextAlign.Left, width: 20 },
			{ field: "TotalCredits", headerText: "TotalCredits", textAlign: ej.TextAlign.Left, width: 20 },
			{ field: "SubjectPrintSequenceNo", headerText: "Print Sequence No", textAlign: ej.TextAlign.Left, width: 20 },
            { field: "Active", headerText: "Status", textAlign: ej.TextAlign.Left, width: 20 },
			{ field: "ExmSubID", headerText: "ExmSubID", textAlign: ej.TextAlign.Right, visible: false } 
        ];
		$scope.BasicExamSubjectList = [];
		$("#BasicExamSubject").ejGrid({
			dataSource: $scope.BasicExamSubjectList,
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
			$state.go('Masters.BasicExamSubject', { ExmSubID: 0 });
            //}
        }
        // Edit delete record
        $scope.doubleclick = function doubleclick(sender, args) {
            if (this.multiSelectCtrlRequest == false) {
				$state.go('Masters.BasicExamSubject', { ExmSubID: sender.data.ExmSubID });
            }
        }
		//var BasicExamSubjectdata = BasicExamSubjectService.GetBasicExamSubjectList();
		//BasicExamSubjectdata.then(function (data) {
		//	$scope.BasicExamSubjectList = data;
  //      }, function (error) {
  //          alert(error);
  //      });
        var BasicExamSubjectdata = BasicExamSubjectService.GetBasicExamSubjectForList(3);
		BasicExamSubjectdata.then(function (data) {
			$scope.BasicExamSubjectList = data;
        }, function (error) {
            alert(error);
            });

        $scope.FillExamSubjectList = function (ActiveFlag) {
            if (ActiveFlag == undefined) { ActiveFlag = 3; }
            if (ActiveFlag == "") { ActiveFlag = 3; }
            var BasicExamSubjectdata = BasicExamSubjectService.GetBasicExamSubjectForList(ActiveFlag);
            BasicExamSubjectdata.then(function (data) {
                $scope.BasicExamSubjectList = data;
            }, function (error) {
                alert(error);
            });
        }
    });
});