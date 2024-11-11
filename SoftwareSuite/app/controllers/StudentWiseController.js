define(['app'], function (app) {
    app.factory('Excel', function ($window) {
        //alert("hello");
        var uri = 'data:application/vnd.ms-excel;base64,',
            template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
            base64 = function (s) { return $window.btoa(unescape(encodeURIComponent(s))); },
            format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) };
        return {
            tableToExcel: function (tableId, worksheetName) {               
                var table = $(tableId),
                    ctx = { worksheet: worksheetName, table: table.html() },
                    href = uri + base64(format(template, ctx));
                return href;
            }
        };
    });
    app.controller("StudentWiseController", function ($scope, $http, $localStorage, $state, AppSettings, MenuService, StudentWiseService, Excel, $timeout) {
        
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
        $scope.College_Code = authData.College_Code;
        $scope.College_Name = authData.College_Name;       
        $scope.LoadImg = false;
        //alert("in StudentWise : " + AppSettings.ExportToExcelUrl);
        // Scheme Sem branch Information
        var SCHEMESEMINFO = StudentWiseService.GetSchemeSemBranchInfo(AppSettings.CollegeID);
    
        SCHEMESEMINFO.then(function (data) {
            if (data.length > 0) {
            
               $scope.schemeinfo = data[0].schemeInfo;
                $scope.seminfo = data[0].semInfo;
               // $scope.branchinfo = data[0].branchInfo;
            }
            
        }, function (error) {
            alert(error);
        });
        // end Scheme Sem branch Information
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
        $scope.loadExamTypes = function () {
            
            $scope.showData = 0;
            // Branch Information
            var ExamTypeInfo = StudentWiseService.GetExamTypeInfo($scope.scheme, $scope.sem);

            ExamTypeInfo.then(function (data) {
                if (data.length > 0) {
                    $scope.examtypeinfo = data[0].typeInfo;
                }

            }, function (error) {
                alert(error);
            });
            // Branch Information
        }
        $scope.PrintStudentResult = function () {

            var divName = "idtoDivPrintAdmin";
            var divToPrint = document.getElementById(divName);
            $("#studentresult1").hide();
            var domClone = divToPrint.cloneNode(true);
            var $printSection = document.getElementById("printSection");
            if (!$printSection) {
                var $printSection = document.createElement("div");
                $printSection.id = "printSection";
                document.body.appendChild($printSection);
            }
            $printSection.innerHTML = "";
            $printSection.appendChild(domClone);
            window.print();
            document.body.removeChild($printSection);
            $("#studentresult1").show();

        };

        $scope.hidePreviousResult = function () {
            $scope.showData = 0;
        }
    
        $scope.Submit = function () {
            if (($scope.scheme == undefined) || ($scope.scheme == "0") || ($scope.scheme == "")) {
                alert("Select Scheme");
                return false;
            }
            if (($scope.sem == undefined) || ($scope.sem == "0") || ($scope.sem == "")) {
                alert("Select Sem");
                return false;
            }
            if (($scope.examtype == undefined) || ($scope.examtype == "0") || ($scope.examtype == "")) {
                alert("Select Exam");
                return false;
            }

            if (($scope.Pin == undefined) || $scope.Pin == "") {
                alert("Enter Student Pin ");
                return false;
            }
            $scope.LoadImg = true;
            $scope.ResultNotFound = false;
            $scope.ResultFound = false;
            //alert($scope.sem);
            var ResultData = StudentWiseService.GetStudentWiseReport($scope.sem, $scope.Pin, $scope.scheme,$scope.examtype);
            ResultData.then(function (data) {
                if (data.length > 0) {
                 //   alert(data[0].length);
                    if (data[0].studentWiseReport.length > 0) {
                    $scope.showData = 1;
                    $scope.ResultFound = true;
                    $scope.ResultNotFound = false;
                   // alert(data[0].studentWiseReport[0].Semister);
                    $scope.semyear = data[0].studentWiseReport[0].Semister;
                    $scope.pin = $scope.Pin;                    
                    $scope.StudentWiseReportData = data[0].studentWiseReport;
                    if ($scope.examtype == 5) {
                        //var total = 0;
                        //for (var i = 0; i < data[0].studentWiseReport.length; i++) {
                        //    var subjecttotal = data[0].studentWiseReport[i].SubjectTotal;
                        //    total += subjecttotal;
                        //}

                        $scope.getTotalMarks = data[0].studentSubjectTotal[0].TotalSubjects;
                        //var total = 0;
                        //for (var i = 0; i < data[0].studentWiseReport.length; i++) {
                        //    var GradePoint = data[0].studentWiseReport[i].GradePoint;
                        //    total += GradePoint;
                        //}
                        $scope.getTotalGradePoints = data[0].studentSubjectTotal[0].TotalSubjects;
                        //var Result = "Pass";
                        //for (var i = 0; i < data[0].studentWiseReport.length; i++) {
                        //    if (data[0].studentWiseReport[i].Result == "F") {
                        //        Result = "Promoted";
                        //        break;
                        //    }
                        //}
                        //var total = 0;
                        //for (var i = 0; i < data[0].studentWiseReport.length; i++) {
                        //    var Maxcredits = data[0].studentWiseReport[i].MaxCredits;
                        //    total += Maxcredits;
                        //}
                        $scope.getMaxCredits = data[0].studentSubjectTotal[0].TotalCredits;
                        //var total = 0;
                        //for (var i = 0; i < data[0].studentWiseReport.length; i++) {
                        //    var credits = data[0].studentWiseReport[i].CreditsGained;
                        //    total += credits;
                        //}
                        $scope.getCreditsGained = data[0].studentSubjectTotal[0].TotalCreditsEarned;
                        //var total = 0;
                        //for (var i = 0; i < data[0].studentWiseReport.length; i++) {
                        //    var gradepoints = data[0].studentWiseReport[i].GradePoint * data[0].studentWiseReport[i].CreditsGained;
                        //    total += gradepoints;
                        //}
                        $scope.getGradePointsGained = data[0].studentSubjectTotal[0].TotalGrades;
                        $scope.LoadImg = false;
                        $scope.Result = data[0].studentSubjectTotal[0].Result;

                        $scope.SGPA = data[0].studentSGPACGPAInfo[0].SGPA;
                        $scope.CGPA = data[0].studentSGPACGPAInfo[0].CGPA;
                        $scope.studentInfo = data[0].studentInfo[0];                       
                        $scope.BranchSubjectGradeInfo = data[0].branchSubjectGradeInfo;
                        $scope.studentSubjectTotal = data[0].studentSubjectTotal;
                        $scope.AcadamicYear = data[0].studentSubjectTotal[0].AcadamicYear;
                    }
                    else
                    {
                        $scope.AcadamicYear = data[0].studentSubjectTotal[0].AcadamicYear;
                        $scope.studentInfo = data[0].studentInfo[0];
                        $scope.LoadImg = false;
                    }
                    
                  
                    }
                    else {
                        $scope.ResultFound = false;
                        $scope.ResultNotFound = true;
                        $scope.LoadImg = false;
                    }
                }
                else {
                    $scope.ResultFound = false;
                    $scope.ResultNotFound = true;
                    $scope.LoadImg = false;
                 //   alert("Data Not Found.");
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
        
        $scope.DownloadPdfResult = function (tableid) {
            // alert(tableid + ":" + AppSettings.ExportToPdfUrl);
            //alert("pdf : " + tableid);
            html2canvas($('#idtoDivPrintAdmin'), {
                onrendered: function (canvas) {
                    var data = canvas.toDataURL();
                    var docDefinition = {
                        content: [{
                            image: data,
                            width: 500
                        }]
                    };
                    pdfMake.createPdf(docDefinition).download("Table.pdf");
                }
            });
        }

        $scope.DownloadExcelResult = function (tableId) {
            // alert(AppSettings.ExportToExcelUrl);
            //alert("Excel : "+tableId);
            var exportHref = Excel.tableToExcel(tableId, 'StudentResult');
            $timeout(function () { location.href = exportHref; }, 100);
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












