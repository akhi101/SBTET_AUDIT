define(['app'], function (app) {
    app.controller("CcicResultsController", function ($scope, $http, $localStorage, $state, AppSettings, CcicStudentResultService, CcicPreExaminationService, Excel, $timeout) {

        const $ctrl = this;
        $ctrl.$onInit = () => {


        }

        var getCcicCurrentAcademicYear = CcicPreExaminationService.GetCcicResultsAcademicYear();
        getCcicCurrentAcademicYear.then(function (response) {

            $scope.GetCcicCurrentAcademicYear = response;

        },
            function (error) {
                alert("error while loading CurrentAcademicYear");
                var err = JSON.parse(error);

            });



        $scope.GetExamMonthYearData = function (academicyear) {
            if (academicyear == null || academicyear == undefined || academicyear == "") {
                return;

            }

            var getCcicAcademicYearBatch = CcicPreExaminationService.GetResultsExamMonthYears(academicyear)
            getCcicAcademicYearBatch.then(function (res) {
                try {
                    var res = JSON.parse(res);
                }
                catch (err) { }

                if (res.Table.length > 0) {
                    $scope.GetExamMonthYear = res.Table;
                }
                else {
                    $scope.GetExamMonthYear = [];
                }
                for (var j = 1; j < res.length + 1; j++) {
                    $scope['edit' + j] = true;
                }
            },
                function (error) {
                    alert("data is not loaded");
                    var err = JSON.parse(error);
                });

        }



        $scope.hidePreviousResult = function () {
            $scope.ResultFound = false;
            $scope.showData = 0;
            $scope.StudentWiseReportData = [];
            $scope.studentInfo = [];
            $scope.BranchSubjectGradeInfo = [];
            $scope.studentsubjecttotal = [];
        },


            $scope.Submit = function () {
                if ($scope.academicyear == undefined || $scope.academicyear == null || $scope.academicyear == "") {
                    alert("Select Academic Year ");
                    return false;
                }

                if ($scope.monthyear == undefined || $scope.monthyear == null || $scope.monthyear == "") {
                    alert("Select Exam Month Year");
                    return false;
                }

                if ($scope.Pin == undefined || $scope.Pin == null || $scope.Pin == "") {
                    alert("Select Pin");
                    return false;
                }



                $scope.LoadImg = true;
                $scope.ResultNotFound = false;
                $scope.ResultFound = false;
                $scope.showData = 0
                var getdata = CcicStudentResultService.GetStudentResult($scope.academicyear, $scope.monthyear, $scope.Pin);
                getdata.then(function (response) {
                    try {
                        var res = JSON.parse(response)
                    }
                    catch { }
                    if (res.Table !== undefined && res.Table.length > 0) {
                        $scope.showData = 1;
                        $scope.LoadImg = false;
                        $scope.ResultFound = true;
                        $scope.getSubjectsResponse = res.Table;
                        $scope.getStudentsResponse = res.Table1;

                        $scope.Result = $scope.getStudentsResponse[0].Result;
                        $scope.SubjectTotal = $scope.getStudentsResponse[0].TotalMarks;
                        $scope.ExamMonthYear = $scope.getStudentsResponse[0].ExamMonthYear;
                        $scope.Percentage = $scope.getStudentsResponse[0].Percentage;
                        $scope.Class = $scope.getStudentsResponse[0].Class;

                        //    $scope.PIN = $scope.getStudentsResponse[0].PIN;
                    }
                    else {
                        //alert("no subjects");
                        //$state.go("Dashboard.AssessmentDashboard.practicals");
                        $scope.LoadImg = false;
                        $scope.ResultFound = false;
                    }
                }, function (error) {
                    alert("some thing went wrong");
                });


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
            document.title = $scope.Pin;
            window.print();
            document.body.removeChild($printSection);
            $("#studentresult1").show();
        };


        $scope.PrintDashBoard = function () {
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
            canvas.width = window.innerWidth * scaleBy;
            canvas.height = window.innerHeight * scaleBy;

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












