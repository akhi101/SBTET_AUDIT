 define(['app'], function (app) {
     app.controller("CollegeInfoController", function ($scope,$localStorage, $state, AppSettings, RegisterAdmittedStudentService) {
         var authData = $localStorage.authorizationData;
         AppSettings.College_Code = authData.College_Code;
         AppSettings.College_Name = authData.College_Name;

         $scope.College_Code = authData.College_Code;
         $scope.College_Name = authData.College_Name;
       
        $scope.CollegeInfo = { };
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
        var CollegeList = RegisterAdmittedStudentService.GetCollegeInfo(AppSettings.CollegeID);
        CollegeList.then(function (CollegeInfoList, status, headers, config, error) {
            $scope.CollegeInfo = CollegeInfoList[0];
            $scope.CollegeInfoData = CollegeInfoList[0].originalSectiondtls;
        }, function (error) {
            alert(error);
        });
        var gridColumns = [
            { field: "original_sections", headerText: "Groups", textAlign: ej.TextAlign.Left, width: 100 },
            { field: "medium", headerText: "Medium", textAlign: ej.TextAlign.Left, width: 150 },
            { field: "no_of_sections_sanctioned", headerText: "No of Sections", textAlign: ej.TextAlign.Left, width: 150 },
            { field: "intake", headerText: "Intake", textAlign: ej.TextAlign.Left, width: 50 },
            //{ field: "RequestCnt", headerText: "Online Request", textAlign: ej.TextAlign.Left, width: 50 },
            //{ field: "SeatEnrolled", headerText: "College Enrolled", textAlign: ej.TextAlign.Left, width: 50 },
            //{ field: "SeatAllotted", headerText: "Seat Allotted", textAlign: ej.TextAlign.Left, width: 50 },
        ];
        $scope.CollegeInfoData = [];


        $scope.OpenStudentList = function () {
            $state.go('Admission.StudentRegList');
        };


        $("#CollegeRegs").ejGrid({
            dataSource: $scope.CollegeInfoData,
            //allowPaging: true,
            //pageSettings: { pageSize: 10 },
            allowSearching: true,
            allowScrolling: true,
            allowGrouping: true,
            showSummary: true, 
            summaryRows: [{
                title: "Total", summaryColumns: [{ summaryType: ej.Grid.SummaryType.Sum, displayColumn: "intake", dataMember: "intake", format: "{0:N0}" },
                    { summaryType: ej.Grid.SummaryType.Sum, displayColumn: "no_of_sections_sanctioned", dataMember: "no_of_sections_sanctioned", format: "{0:N0}" },
                    //{ summaryType: ej.Grid.SummaryType.Sum, displayColumn: "RequestCnt", dataMember: "RequestCnt", format: "{0:N0}" },
                    //{ summaryType: ej.Grid.SummaryType.Sum, displayColumn: "SeatEnrolled", dataMember: "SeatEnrolled", format: "{0:N0}" },
                    //{ summaryType: ej.Grid.SummaryType.Sum, displayColumn: "SeatAllotted", dataMember: "SeatAllotted", format: "{0:N0}" }
                ]
            }], 
            //allowFiltering: true,
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
       
    });
});