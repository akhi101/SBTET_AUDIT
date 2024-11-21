define(['app'], function (app) {
    app.controller("StudentResultController", function ($scope, $http, $localStorage, $state, AppSettings, StudentResultService, Excel, $timeout)
    {
        //get schemes data for dropdown
        var SCHEMESEMINFO = StudentResultService.GetSchemeDataForResults();
        $scope.seminfo = [];
        $scope.examtypeinfo = [];
        $scope.pin = "";
		 $scope.showData = 0;
        SCHEMESEMINFO.then(function (data) {
            if (data.length > 0) {
              
                $scope.schemeinfo = data;
            
            }
        }, function (error) {
            alert(error);
        });
        // dropdown for sem exams
        $scope.loadSemExamTypes = function (SchemeId) {
            $scope.seminfo = [];
            $scope.examtypeinfo = [];
            $scope.pin = "";
			if ((SchemeId == undefined) || (SchemeId == "0") || (SchemeId == "")) {
                
                return false;
            }
			 $scope.showData = 0;
            var SemExamInfo = StudentResultService.GetExamTypeForResults(SchemeId);
            SemExamInfo.then(function (data) {
               
                if (data.Table.length > 0) {
                   
                    // $scope.schemeinfo = data[0].schemeInfo;
                    //$scope.seminfo = data[0].semInfo;
                    $scope.seminfo = data.Table;
                   // $scope.examtypeinfo = data.Table1;
                    // $scope.branchinfo = data[0].branchInfo;
                }

            }, function (error) {                
                alert(error);
            });
        }
       
        $scope.loadExamTypes = function (sem) {
            $scope.examtypeinfo = [];
            $scope.pin = "";
           if (($scope.scheme == undefined) || ($scope.scheme == "0") || ($scope.scheme == "")) {
                
                return false;
            }
            if (($scope.sem == undefined) || ($scope.sem == "0") || ($scope.sem == "")) {
               
                return false;
            }
                $scope.showData = 0;
                // Branch Information
                var SemExamInfo = StudentResultService.GetExamTypeForResults($scope.scheme);
                SemExamInfo.then(function (data) {
                    if (data.Table.length > 0) {
                        $scope.examtypeinfo = data.Table1;

                    }

                }, function (error) {
                    alert(error);
                });
            } 
                   

        $scope.hidePreviousResult = function () {
            $scope.showData = 0;
        },
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
            $scope.showData = 0
            $scope.LoadImg = true;
            $scope.ResultNotFound = false;
            $scope.ResultFound = false;        
            if ($scope.scheme == '5') {
                $scope.ResultFound = false;
                $scope.ResultNotFound = true;
                $scope.LoadImg = false;
                var resultdata = StudentResultService.GetStudentWiseReport($scope.sem, $scope.pin, $scope.scheme, $scope.examtype);
                resultdata.then(function (data) {                      
                    if (data.length > 0) {                       
                        if (data[0].studentwisereport.length > 0) {
                            $scope.showdata = 1;
                            $scope.resultfound = true;
                            $scope.resultnotfound = false;                           
                            $scope.semyear = data[0].studentwisereport[0].semister;
                            $scope.pin = $scope.pin;
                            $scope.studentwisereportdata = data[0].studentwisereport;
                            if ($scope.examtype == '10') {
                               
                                $scope.gettotalmarks = data[0].studentsubjecttotal[0].totalsubjects;
                               
                                $scope.gettotalgradepoints = data[0].studentsubjecttotal[0].totalsubjects;
                              
                                $scope.getmaxcredits = data[0].studentsubjecttotal[0].totalcredits;
                               
                                $scope.getcreditsgained = data[0].studentsubjecttotal[0].totalcreditsearned;
                               
                                $scope.getgradepointsgained = data[0].studentsubjecttotal[0].totalgrades;
                                $scope.loadimg = false;
                                $scope.result = data[0].studentsubjecttotal[0].result;

                                $scope.sgpa = data[0].studentsgpacgpainfo[0].sgpa;
                                $scope.cgpa = data[0].studentsgpacgpainfo[0].cgpa;
                                $scope.studentinfo = data[0].studentinfo[0];
                                $scope.branchsubjectgradeinfo = data[0].branchsubjectgradeinfo;
                                $scope.studentsubjecttotal = data[0].studentsubjecttotal;
                                $scope.acadamicyear = data[0].studentsubjecttotal[0].acadamicyear;
                                $scope.cgpatotalpoints = data[0].studentsgpacgpainfo[0].cgpatotalpoints;
                                $scope.cgpatotalcredits = data[0].studentsgpacgpainfo[0].cgpatotalcredits;
                            }
                            else {
                                $scope.acadamicyear = data[0].studentsubjecttotal[0].acadamicyear;
                                $scope.studentinfo = data[0].studentinfo[0];
                                $scope.loadimg = false;
                            }


                        }
                        else {
                            $scope.resultfound = false;
                            $scope.resultnotfound = true;
                            $scope.loadimg = false;
                        }
                    }
                    else {
                        $scope.resultfound = false;
                        $scope.resultnotfound = true;
                        $scope.loadimg = false;                       
                    }
                }, function (error) {
                    $scope.resultfound = false;
                    $scope.resultnotfound = true;

                    $scope.loadimg = false;
                        alert(error);
                    });             

            }
            else  {

                var ResultData = StudentResultService.GetOldStudentWiseReport($scope.sem, $scope.Pin, $scope.scheme, $scope.examtype);
                ResultData.then(function (data) {
                    if (data.Table.length > 0) {
                        $scope.showData = 1;
                        $scope.ResultFound = true;
                        $scope.ResultNotFound = false;

                        $scope.LoadImg = false;
                        if (data.Table.length > 0) {
                            $scope.semyear = data.Table[0].Semister;
                        } else {
                            $scope.semyear = data.Table1[0].Sem;
                        }
                        $scope.pin = $scope.Pin;
                        $scope.scheme = $scope.scheme;
                        $scope.AcadamicYear = data.Table1[0].AcadamicYear == null || data.Table1[0].AcadamicYear == 'undefined' ? false : data.Table1[0].AcadamicYear;
                        $scope.studentInfo = data.Table1[0];
                        $scope.StudentWiseReportData = data.Table;
                        if (data.Table.length > 0) {
                            $scope.Result = data.Table[0].Result;
                            $scope.Total = data.Table[0].Total;
                        }
                        else {
                            $scope.Result = "";
                            $scope.Total = "";
                        }

                    }

                    else {
                        $scope.ResultFound = false;
                        $scope.ResultNotFound = true;
                        $scope.LoadImg = false;
                    }

                }, function (error) {
                    $scope.resultfound = false;
                    $scope.resultnotfound = true;
                    $scope.loadimg = false;
                    alert(error);
                });

            }


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
            var exportHref = Excel.tableToExcel(tableId, 'StudentResult');
            $timeout(function () { location.href = exportHref; }, 100);
        }

        $scope.PrintStudentResult = function () {

            var divName = "idtoDivPrintAdmin";
            var divToPrint = document.getElementById(divName);
            var temp = document.body.innerHTML;
            $("#studentresult1").hide();
            var domClone = divToPrint.cloneNode(true);
            var $printSection = document.getElementById("printSection");
            //document.body.innerHTML = "";
            if (!$printSection) {
                var $printSection = document.createElement("div");
                $printSection.id = "printSection";
                document.body.appendChild($printSection);
            }
            $printSection.innerHTML = "";
            $printSection.appendChild(domClone);
           // alert($printSection.innerHTML);
            window.print();
            document.body.removeChild($printSection);
            $("#studentresult1").show();
        };


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

        $scope.DownloadPdfResultStudent = function (tableid) {

            // alert(tableid + ":" + AppSettings.ExportToPdfUrl);
            //alert("pdf : " + tableid);
            var height = $('#idtoDivPrintAdmin').height();
            var width = $('#idtoDivPrintAdmin').width();
            $('#idtoDivPrintAdmin').height('auto');
            var scaleBy = 5;
            var w = 1000;
            var h = 1000;
            var div = document.querySelector('#idtoDivPrintAdmin');
            var canvas = document.createElement('canvas');
            canvas.width = window.innerWidth*scaleBy;
            canvas.height = window.innerHeight*scaleBy;
           
            var context = canvas.getContext('2d');
            context.scale(scaleBy, scaleBy);
            html2canvas(div, {
                canvas: canvas,
                onrendered: function (canvas) {
                    thecanvas = canvas;
                    var data = thecanvas.toDataURL();
                    var docDefinition = {
                        // pageSize: { width: thecanvas.width, height: thecanvas.height },
                        content: [{
                            image: data,
                            width: 500
                        }],
                    };
                    pdfMake.createPdf(docDefinition).download("Table.pdf");
                    $('#idtoDivPrintAdmin').height(height);
                }
            });
        }

        $scope.stboclogin = function () {
            $state.go('login');
        }
        });
        
   
    app.factory('Excel', function ($window) {
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
});












