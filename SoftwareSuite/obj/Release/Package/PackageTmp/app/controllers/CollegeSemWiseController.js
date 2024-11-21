define(['app'], function (app) {
    app.controller("CollegeSemWiseController", function ($scope, $http, $localStorage, $state, AppSettings, MenuService, CollegeSemWiseService) {
       
        var authData = $localStorage.authorizationData;
        $scope.userName = authData.userName;
        AppSettings.LoggedUserId = authData.SysUserID;
        AppSettings.CollegeID = authData.CollegeID;
        $scope.CollegeID = authData.CollegeID;
        AppSettings.SysUsrGrpID = authData.SysUsrGrpID;
        AppSettings.userName = authData.userName;
        AppSettings.AcdYrID = authData.AcdYrID;
        AppSettings.TypeFlag = authData.TypeFlag;
        AppSettings.ExamInstID = $localStorage.ExamInstID;
        AppSettings.MngtTypID = authData.MngtTypID;
        AppSettings.DistrictIDs = authData.DistrictIDs;
        $scope.LoadImg = false;
        $scope.OpenProgram = function (GridFormToOpen) {
            var strroute = '' + GridFormToOpen;
            $state.go(strroute);
        }
        $scope.OpenDashboard = function () {
            $state.go('Dashboard')
        }
        $scope.GoToHome = function () {
            $state.go('Exam');
        }
        $scope.MyProfile = function () {
            alert("ok");
        }
        $scope.MyCollege = function () {
            if (AppSettings.TypeFlag == 'C') {
                $state.go('Exam.CollegeInfo');
            }
            else {
                alert("This is not College user");
                return;
            }
        }
        $scope.OpenCollegeSemWiseReport = function () {

            $state.go('CollegeSemWise');
        }
        $scope.OpenBranchWiseReport = function () {

            $state.go('BranchWise');
        }
        $scope.OpenStudentWiseReport = function () {

            $state.go('StudentWise');
        }
        $scope.logOut = function () {
            sessionStorage.loggedIn = "no";
            delete $localStorage.authorizationData;
            var InsertLoginList = MenuService.GetUpdateLogoutInfo(AppSettings.LoggedUserId, $scope.userName);
            InsertLoginList.then(function (Districtdata, status, headers, config, error) {
            }, function (error) {
                alert(error);
            });
            $scope.authentication = {
                isAuth: false,
                UserId: 0,
                userName: ""
            };
            $state.go('login');
        }
        //$scope.$on('onUnload', function(e) {
        //    delete $localStorage.authorizationData;
        //    sessionStorage.loggedIn = "no";
        //});
        //drilldowncoding

     
        
        $scope.Submit = function () {
            //if (($scope.SemWiseReport.Scheme == undefined) || ($scope.SemWiseReport.Scheme == "0")) {
            //    alert("Select Scheme");
            //    return false;
            //}
            //if (($scope.SemWiseReport.SemYear == undefined) || ($scope.SemWiseReport.SemYear == "0")) {
            //    alert("Select Sem Year");
            //    return false;
            //}
            // alert($scope.SemWiseReport.Scheme + ":" + $scope.SemWiseReport.SemYear)
            $scope.LoadImg = true;
            var ResultData = CollegeSemWiseService.GetCollegeSemWiseReport(1,1);
            ResultData.then(function (data) {
                if (data.length > 0) {
                    $scope.ResultFound = true;
                    $scope.ResultNotFound = false;
                    $scope.scheme = data[0].Scheme_Code;
                    $scope.semyear = data[0].Semister;
                    var newArray = [];
                    angular.forEach(data, function (value, key) {
                        var exists = false;
                        angular.forEach(newArray, function (val2, key) {
                            if (angular.equals(value.pin, val2.pin)) { exists = true };
                        });
                        if (exists == false && value.id != "") { newArray.push(value); }
                    });
                    $scope.studentscount = newArray.length;
                    $scope.ReportData = data;
                    $scope.LoadImg = false;
                }
                else {
                    $scope.ResultFound = false;
                    $scope.ResultNotFound = true;
                    alert("Data Not Found.");
                }
            }, function (error) {
                alert(error);
            });
            
            //$scope.MngtName = "";
            //var ExamInstSelect = document.getElementById("ExamInstID");
            //var ExamInstSelectText = ExamInstSelect.options[ExamInstSelect.selectedIndex].text;
            //var DistrictSelect = document.getElementById("DistrictID");
            //var DistrictSelectText = DistrictSelect.options[DistrictSelect.selectedIndex].text;
            //var CourseSelect = document.getElementById("CourseID"); 
            //var CourseSelectText = CourseSelect.options[CourseSelect.selectedIndex].text;
            //var ExamSelect = document.getElementById("ExamID"); 
            //var ExamSelectText = ExamSelect.options[ExamSelect.selectedIndex].text;
            //var MainGrpSelect = document.getElementById("MainGrpID");
            //var MainGrpSelectText = MainGrpSelect.options[MainGrpSelect.selectedIndex].text; 
            //var MediumSelect = document.getElementById("MediumID");
            //var MediumSelectText = MediumSelect.options[MediumSelect.selectedIndex].text; 
            //var CasteSelect = document.getElementById("CasteID");
            //var CasteSelectText = CasteSelect.options[CasteSelect.selectedIndex].text;
            //document.getElementById('HeadLabel').innerHTML = 'Exam Fee Transaction Report <br/>'
            //    + 'Exam Instance: ' + ExamInstSelectText + ' &emsp;&emsp; District: ' + DistrictSelectText + ' &emsp;&emsp; Stream: ' + CourseSelectText +
            //    '<br/>Year: ' + ExamSelectText + '&emsp;&emsp;Group: ' + MainGrpSelectText + '&emsp;&emsp;Medium: ' + MediumSelectText + '&emsp;&emsp;Caste/Community: ' + CasteSelectText;

            //$scope.MngtTypIDs = "";
            //$scope.LoadImg = true;
            //for (var i = 0; i < $scope.BasicManagementTypeList.length; i++) {
            //    if ($scope.BasicManagementTypeList[i].Selected) {
            //        if ($scope.MngtTypIDs == "") {
            //            $scope.MngtTypIDs = $scope.BasicManagementTypeList[i].MngtTypID;
            //            $scope.MngtName = $scope.BasicManagementTypeList[i].MngtTypName; // for printing
            //        }
            //        else {                   
            //            $scope.MngtTypIDs = $scope.MngtTypIDs + ',' + $scope.BasicManagementTypeList[i].MngtTypID;
            //            $scope.MngtName += ',' + $scope.BasicManagementTypeList[i].MngtTypName; // for printing
            //        }
            //    }
            //}
            //if (AppSettings.CollegeID != 0) {
            //    for (var i = 0; i < $scope.BasicManagementTypeList.length; i++) {
            //        if ($scope.BasicManagementTypeList[i].MngtTypID == AppSettings.MngtTypID) {
            //            $scope.BasicManagementTypeList[i].Selected = true;
            //            $scope.MngtTypIDs = $scope.BasicManagementTypeList[i].MngtTypID;
            //            $scope.MngtName = $scope.BasicManagementTypeList[i].MngtTypName; // for printing
            //        }
            //    }
            //}
            //$("#MangtLabel").text('Management Type: ' + $scope.MngtName);
            //if ($scope.MngtTypIDs == "") {
            //    alert("Select atleast single management type");
            //    return;
            //}
            //if (($scope.Exam.ExamInstID == "") || ($scope.Exam.ExamInstID == undefined)) {
            //    alert("Select Exam Instance");
            //    return;
            //}
            //if (($scope.Exam.CourseID == "") || ($scope.Exam.CourseID == undefined)) {
            //    alert("Select Stream");
            //    return;
            //}
            //if (($scope.Exam.ExamID == "") || ($scope.Exam.ExamID == undefined)) {
            //    alert("Select Exam");
            //    return;
            //}
            //if (($scope.Exam.DistrictID == "") || ($scope.Exam.DistrictID == undefined)) {
            //    $scope.Exam.DistrictID = 0;
            //}
            //if (($scope.Exam.CourseID == "") || ($scope.Exam.CourseID == undefined)) {
            //    $scope.Exam.CourseID = 0;
            //}
            //if (($scope.Exam.MainGrpID == "") || ($scope.Exam.MainGrpID == undefined)) {
            //    $scope.Exam.MainGrpID = 0;
            //}
            //if (($scope.Exam.MediumID == "") || ($scope.Exam.MediumID == undefined)) {
            //    $scope.Exam.MediumID = 0;
            //}
            //if (($scope.Exam.CasteID == "") || ($scope.Exam.CasteID == undefined)) {
            //    $scope.Exam.CasteID = 0;
            //}

            //$scope.MngtTypName = "ALL";
            //$scope.CourseName = "ALL";
            //$scope.MainGrpName = "ALL";
            //$scope.MediumName = "ALL";
            //$scope.CasteName = "ALL";
            //$scope.AcdYrName = "ALL";
            //$scope.CollegeDistName = "ALL";
            //for (var i = 0; i < $scope.BasicExamInstanceList.length; i++) {
            //    if ($scope.BasicExamInstanceList[i].ExamInstID == $scope.Exam.ExamInstID) {
            //        $scope.AcdYrName = $scope.BasicExamInstanceList[i].ExamInstanceRemark;
            //    }
            //}
            //for (var i = 0; i < $scope.DistrictList.length; i++) {
            //    if ($scope.DistrictList[i].DistrictID == $scope.Exam.DistrictID) {
            //        $scope.CollegeDistName = $scope.DistrictList[i].DistName;
            //    }
            //}
            //for (var i = 0; i < $scope.CourseList.length; i++) {
            //    if ($scope.CourseList[i].CourseID == $scope.Exam.CourseID) {
            //        $scope.CourseName = $scope.CourseList[i].CourseName;
            //    }
            //}
            //for (var i = 0; i < $scope.MainGroupList.length; i++) {
            //    if ($scope.MainGroupList[i].MainGrpID == $scope.Exam.MainGrpID) {
            //        $scope.MainGrpName = $scope.MainGroupList[i].MainGrpName;
            //    }
            //}
            //for (var i = 0; i < $scope.MediumList.length; i++) {
            //    if ($scope.MediumList[i].MediumID == $scope.Exam.MediumID) {
            //        $scope.MediumName = $scope.MediumList[i].MediumName;
            //    }
            //}


            //if (AppSettings.CollegeID == 0) {
            //    var TotalRecorddata = DrillDownExamService.GetCollegedataByMngtypeAndDistrict(AppSettings.ExamInstID, AppSettings.AcdYrID, $scope.Exam.DistrictID, AppSettings.LoggedUserId, $scope.MngtTypIDs, $scope.Exam.CourseID, $scope.Exam.ExamID, $scope.Exam.MainGrpID, $scope.Exam.MediumID, $scope.Exam.CasteID);
            //}
            //else {
            //    var gender = "";
            //    var TotalRecorddata = DrillDownExamService.GetCollegedataByMngtypeAndDistrictByCollege(AppSettings.ExamInstID, AppSettings.AcdYrID, $scope.Exam.DistrictID, AppSettings.CollegeID, gender, $scope.MngtTypIDs, $scope.Exam.CourseID, $scope.Exam.ExamID, $scope.Exam.MainGrpID, $scope.Exam.MediumID, $scope.Exam.CasteID);
            //}
            //TotalRecorddata.then(function (data) {
            //    $scope.LoadImg = false;
            //    if (data.length > 0) {
            //        if (AppSettings.CollegeID == 0) {
            //            $scope.DrillDownList = data;
            //        }
            //        else {
            //            $scope.colPageAdmissionListForfirst = data;
            //        }
            //        $scope.ShowBtn = true;
            //    } else {
            //        alert("Data Not Found.");
            //        $scope.DrillDownList = [];
            //        $scope.colPageAdmissionListForfirst = [];
            //        $scope.ShowBtn = false;
            //    }
            //}, function (error) {
            //    alert(error);
            //    $scope.LoadImg = false;
            //    $scope.ShowBtn = false;
            //});
        }
       

        $scope.PrintDashBoard = function ()
        {
            var divName = "";
            if ($scope.adminuser == true) {
                divName = "idtoDivPrintAdmin";
            }
            else {
                divName = "DivIdToPrint";
            }

            var divToPrint = document.getElementById(divName);

            var newWin = window.open('', 'Print-Window');

            newWin.document.open();

            newWin.document.write('<html><body onload="window.print()">' + divToPrint.innerHTML + '</body></html>');

            newWin.document.close();

            setTimeout(function () { newWin.close(); }, 10);
        } 
    });
});












