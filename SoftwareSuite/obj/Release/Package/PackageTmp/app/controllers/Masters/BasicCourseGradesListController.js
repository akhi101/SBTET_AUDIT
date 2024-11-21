define(['app'], function (app) {
	app.controller("BasicCourseGradesListController", function ($scope, $state, AppSettings, BasicCourseGradesService) {
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
            { field: "CourseName", headerText: " Stream ", textAlign: ej.TextAlign.Left, width: 60 },
			{ field: "GrdName", headerText: "Stream Grade ", textAlign: ej.TextAlign.Left, width: 40 },
			{ field: "MaxMarks", headerText: " Maximum Mark's ", textAlign: ej.TextAlign.Left, width: 40 },
			{ field: "MinMarks", headerText: " Minimum Mark's ", textAlign: ej.TextAlign.Left, width: 40 },
			{ field: "FinalGrdName", headerText: "Grade", textAlign: ej.TextAlign.Left, width: 40 },
            { field: "Active", headerText: "Status", textAlign: ej.TextAlign.Left, width: 20 },
            { field: "CoGradeID", headerText: "CoGradeID", textAlign: ej.TextAlign.Right, visible: false } 
        ];
		$scope.BasicCourseGradesList = [];
		$("#BasicCourseGrades").ejGrid({
			dataSource: $scope.BasicCourseGradesList,
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
			$state.go('Masters.BasicCourseGrades', { CoGradeID: 0 });
            //}
        }
        // Edit delete record
        $scope.doubleclick = function doubleclick(sender, args) {
            if (this.multiSelectCtrlRequest == false) {
				$state.go('Masters.BasicCourseGrades', { CoGradeID: sender.data.CoGradeID });
            }
        }
		//var BasicCourseGradesdata = BasicCourseGradesService.GetBasicCourseGradesList();
		//BasicCourseGradesdata.then(function (data) {
		//	$scope.BasicCourseGradesList = data;
  //      }, function (error) {
  //          alert(error);
  //          });


        var BasicCourseGradesdata = BasicCourseGradesService.GetBasicCourseGradesForList(3);
        BasicCourseGradesdata.then(function (data) {
            $scope.BasicCourseGradesList = data;
        }, function (error) {
            alert(error);
            });

        $scope.FillCourseGradesList = function (ActiveFlag) {
            if (ActiveFlag == undefined) { ActiveFlag = 3; }
            if (ActiveFlag == "") { ActiveFlag = 3; }
            var BasicCourseGradesdata = BasicCourseGradesService.GetBasicCourseGradesForList(ActiveFlag);
            BasicCourseGradesdata.then(function (data) {
                $scope.BasicCourseGradesList = data;
            }, function (error) {
                alert(error);
            });
        }

    });
});