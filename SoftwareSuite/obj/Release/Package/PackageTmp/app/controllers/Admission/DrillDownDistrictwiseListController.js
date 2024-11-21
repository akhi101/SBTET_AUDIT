define(['app'], function (app) {
    app.controller("DrillDownDistrictwiseListController", function ($scope, $state, $stateParams,AppSettings, DrillDownService) {
        $scope.DrillDownDistrictwiseList = { CollegeDistrictID: $stateParams.CollegeDistrictID, Gender: $stateParams.Gender};
        $scope.CompanyName = AppSettings.CompanyName;
        $scope.LoginYear = AppSettings.SelectedYear;
        var PageNm = $state.current.name.split(".")[1];
        var RightForCurrentPage = [];
        var UsersRightsdata = [];
        UsersRightsdata = AppSettings.UserRights;
        for (var i = 0; i < UsersRightsdata.length; i++) {
            if (UsersRightsdata[i].ListFormName == PageNm) {
                var obj = {};
                obj.isaddable = UsersRightsdata[i].isaddable;
                RightForCurrentPage.push(obj);
            }
        }
        var TotalRecorddata = DrillDownService.GetDrillDownStudentDetailsListTESTByCollege(AppSettings.AcdYrID, $stateParams.CollegeDistrictID, $stateParams.Gender);
        TotalRecorddata.then(function (data) {
            if (data.length > 0) {
                $scope.DrillDownList = data;
            } else { alert("Data Not Found."); }
        }, function (error) {
            alert(error);
        });
        

        
        $scope.BackToDistrictList = function () {
            $state.go('Admission.DrillDown');
        }
        var _grid = "";
        var _index = "";
        var _CollegeDistrictID = 0;
        var _AcdYrID = 0;
        $scope.GetTotalRecord = function (obj) {
            $scope.TotalRecordList = [];
            var TotalRecorddata = DrillDownService.GetDrillDownStudentDetailsListByCollegeDistrictID($stateParams.CollegeDistrictID, obj.CollegeID, "",obj.AcdYrID);
            TotalRecorddata.then(function (data) {
                $scope.TotalRecordList = data;
                if (data.length > 0) {
               
                } else { alert("Data Not Found."); }
            }, function (error) {
                alert(error);
            });

        }
        $scope.GetMaleRecord = function (obj) {
            var _male = "M";
            $scope.TotalRecordList = [];
            var TotalRecorddata = DrillDownService.GetDrillDownStudentDetailsListByCollegeDistrictID($stateParams.CollegeDistrictID, obj.CollegeID,_male, obj.AcdYrID);
            TotalRecorddata.then(function (data) {
                $scope.TotalRecordList = data;
                if (data.length > 0) {
                 } else { alert("Data Not Found."); }
            }, function (error) {
                alert(error);
            });
        }
        $scope.GetFemaleRecord = function (obj) {
            var _female = "F";
            //_grid = $(".e-grid").ejGrid("instance");
            //_index = _grid.getIndexByRow($(e.target).closest("tr"));
            //_CollegeDistrictID = _grid.model.currentViewData[_index].CollegeDistrictID;
            //alert("District ID = " + obj.CollegeDistrictID);
            //_AcdYrID = _grid.model.currentViewData[_index].AcdYrID;
            //alert("Acdyr ID = " + obj.AcdYrID);
            $scope.TotalRecordList = [];
            var TotalRecorddata = DrillDownService.GetDrillDownStudentDetailsListByCollegeDistrictID($stateParams.CollegeDistrictID, obj.CollegeID, _female, obj.AcdYrID);
            TotalRecorddata.then(function (data) {
                $scope.TotalRecordList = data;
                if (data.length > 0) {
                } else { alert("Data Not Found."); }
            }, function (error) {
                alert(error);
            });

        }
        $scope.GetDrillDownStudentDetailsListByID = function (obj) {         
            $scope.SingleRecordList = [];
            var TotalRecorddata = DrillDownService.GetDrillDownStudentDetailsListByID(obj.PreStudRegID, obj.AcdYrID);
            TotalRecorddata.then(function (data) {
                $scope.StudentReg = data[0];
                //$scope.StudName = data[0].StudName;
                //$scope.FatherName = data[0].FatherName;
                //$scope.MotherName = data[0].MotherName;
                //$scope.MobileNo = data[0].MobileNo;
                //$scope.EmailId = data[0].EmailId;
                //$scope.AadharNo = data[0].AadharNo;
                //$scope.Cityname = data[0].Cityname;
                if (data.length > 0) {
                } else { alert("Data Not Found."); }
            }, function (error) {
                alert(error);
            });

        }
        // Add new Record
        //function AddNew() {
        //if (RightForCurrentPage[0].isaddable != 'Y') {
        //     alert("You Don't have Add Rights");
        //    return;
        // } else {
        //$state.go('Admission.DrillDown', { SysUserID: 0 });
        //}
        //}
        // Edit delete record
        //$scope.doubleclick = function doubleclick(sender, args) {
        //if (this.multiSelectCtrlRequest == false) {
        //$state.go('Admission.DrillDown', { SysUserID: sender.data.SysUserID });
        //}
        //}

        //function write_to_excel() {
        //    var ExcelApp = new ActiveXObject("Excel.Application");
        //    var ExcelSheet = new ActiveXObject("Excel.Sheet");
        //    ExcelSheet.Application.Visible = true;

        //    $('th, td').each(function (i) {
        //        ExcelSheet.ActiveSheet.Cells(i + 1, i + 1).Value = this.innerHTML;
        //    });
        //}

        $scope.exportTableToExcel = function (tableid){
            //$('button').click(function () {
                var url = 'data:application/vnd.ms-excel,' + encodeURIComponent($(tableid).html())
                location.href = url
                return false
            //})
        }
         

        //$scope.tableToExcel = (function () {
        //    var uri = 'data:application/vnd.ms-excel;base64,'
        //        , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
        //        , base64 = function (s) { return window.btoa(unescape(encodeURIComponent(s))) }
        //        , format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) }
        //    return function (table, name) {
        //        if (!table.nodeType) table = document.getElementById(table)
        //        var ctx = { worksheet: name || 'Worksheet', table: table.innerHTML }
        //        window.location.href = uri + base64(format(template, ctx))
        //    }
        //})()
    });
});