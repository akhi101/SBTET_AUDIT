define(['app'], function (app) {
    app.controller("DrillDownExamController", function ($scope, $state, AppSettings, DrillDownExamService) {
        $scope.DrillDownExam = {}
        $scope.CompanyName = AppSettings.CompanyName;
        $scope.LoginYear = AppSettings.SelectedYear;
        var PageNm = $state.current.name.split(".")[1];
        var RightForCurrentPage = [];
        var UsersRightsdata = [];
        var _grid = "";
        var _index = "";
        var _CollegeDistrictID = 0;
        var _AcdYrID = 0;
        var BasicManagementTypedata = DrillDownExamService.GetBasicManagementTypeList();
        BasicManagementTypedata.then(function (data) {
            $scope.BasicManagementTypeList = data;
        }, function (error) {
            alert(error);
        });
        var DistrictList = DrillDownExamService.GetDistrictListByStateID(1);
        DistrictList.then(function (Districtdata, status, headers, config, error) {
            $scope.DistrictList = Districtdata;
        }, function (error) {
            alert(error);
        });
        $scope.ShowMngtTypData = function () {
            if (($scope.DrillDownExam.MngtTypID == undefined) || ($scope.DrillDownExam.MngtTypID == "")) {
                alert("Select Management Type");
                return false;
            }
            if (($scope.DrillDownExam.DistrictID == undefined) || ($scope.DrillDownExam.DistrictID == "")) {
                alert("Select District");
                return false;
            }
            var DrillDownExamdata = DrillDownExamService.GetCollegedataByMngtypeAndDistrict(AppSettings.ExamInstID, $scope.DrillDownExam.MngtTypID, $scope.DrillDownExam.DistrictID);
            DrillDownExamdata.then(function (data) {
                $scope.DrillDownExamList = data;
                if (data.length > 0) {
                } else { alert("Data Not Found."); }
            }, function (error) {
                alert(error);
            });
        }
        $scope.FillDistrictsByMgtyp = function (obj) {
            var DrillDownExamdata = DrillDownExamService.GetDistrictsCollegeByMngtype(obj.MngtTypID);
            DrillDownExamdata.then(function (data) {
                $scope.DrillDownExamList = data;
                if (data.length > 0) {
                } else { alert("Data Not Found."); }
            }, function (error) {
                alert(error);
            });
        }
        $scope.GetTotalRecord = function (obj) {
            $scope.SubDetailsList = [];
            var TotalRecorddata = DrillDownExamService.GetDetailsByCollegeDistrictID(AppSettings.ExamInstID, obj.CollegeID, "");
            TotalRecorddata.then(function (data) {
                $scope.SubDetailsList = data;
                if (data.length > 0) {
                } else { alert("Data Not Found."); }
            }, function (error) {
                alert(error);
             });
        }
        $scope.GetMaleRecord = function (obj) {
            var _male = "M";
            $scope.SubDetailsList = [];
            var MaleRecorddata = DrillDownExamService.GetDetailsByCollegeDistrictID(AppSettings.ExamInstID, obj.CollegeID, "M");
            MaleRecorddata.then(function (data) {
                $scope.SubDetailsList = data;
                if (data.length > 0) {
                } else { alert("Data Not Found."); }
            }, function (error) {
                alert(error);
            });
        }
        $scope.GetFemaleRecord = function (obj) {
            $scope.SubDetailsList = [];
            var MaleRecorddata = DrillDownExamService.GetDetailsByCollegeDistrictID(AppSettings.ExamInstID, obj.CollegeID, "F");
            MaleRecorddata.then(function (data) {
                $scope.SubDetailsList = data;
                if (data.length > 0) {
                } else { alert("Data Not Found."); }
            }, function (error) {
                alert(error);
            });
        }
        $scope.GetMaleOrFemaleRecord = function (obj) {
            $scope.TotalRecordList = [];
            var TotalRecorddata = DrillDownExamService.GetDrillDownStudentDetailsListByCollegeDistrictID(obj.CollegeDistrictID, 0, obj.Gender, obj.AcdYrID);
            TotalRecorddata.then(function (data) {
                $scope.TotalRecordList = data;
                if (data.length > 0) {
                } else { alert("Data Not Found."); }
            }, function (error) {
                alert(error);
            });

        }
        $scope.GetDrillDownStudentDetailsListByID = function (obj) {
            $scope.ExamForms = [];
            var TotalRecorddata = DrillDownExamService.GetDrillDownStudentDetailsListByID(obj.ExmFrmID);
            TotalRecorddata.then(function (data) {
                $scope.ExamForms = data[0];
                if (data.length > 0) {
                } else { alert("Data Not Found."); }
            }, function (error) {
                alert(error);
            });

        }
        //var DrillDowndata = DrillDownService.GetDrillDownStudentDetailsListTEST(AppSettings.AcdYrID, 0, AppSettings.LoggedUserId);
        //DrillDowndata.then(function (data) {
        //    $scope.DrillDownList = data;
        //    if (data.length > 0) {
        //    } else { alert("Data Not Found."); }
        //}, function (error) {
        //    alert(error);
        //});
        //$scope.exportTableToExcel = function (tableid) {
        //    var url = 'data:application/vnd.ms-excel,' + encodeURIComponent($(tableid).html())
        //    location.href = url
        //    return false
        //}
    });
});