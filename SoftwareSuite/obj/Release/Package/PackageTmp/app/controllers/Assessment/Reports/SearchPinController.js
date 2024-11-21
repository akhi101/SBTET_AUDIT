define(['app'], function (app) {
    app.controller("SearchPinController", function ($scope, $http, $localStorage, $state, $stateParams, AppSettings, AssessmentService,ReportService, Excel, $timeout) {

        var markslist = [];
        $scope.responseData = false;
        $scope.getReport = function () {
            var SearchstudentInfos = ReportService.GetStudentBackLogByPin($scope.pinNumber);
            SearchstudentInfos.then(function (response) {
                console.log(response);
            //var getStudentReport = AssessmentService.getStudentReport($scope.pinNumber);
            //getStudentReport.then(function (response) {
          
                if (response.Table.length > 0) {
                    $scope.StudentSearchReportStats = response.Table;
                    $scope.responseData = true;
                    $scope.loading = false;
                    $scope.NoResult = false;
                } else {
                    $scope.collegeReports = [];
                    $scope.responseData = false;
                    $scope.loading = false;
                    $scope.NoResult = true;
                }
            },
            function (error) {

                var err = JSON.parse(error);
                // console.log(err.Message);
                $scope.collegeReports = [];
                $scope.loading = false;
                $scope.responseData = false;
                $scope.NoResult = true;

            });
        }

        $scope.OpenDashboard = function () {
            $scope.homeDashBoard = true;
            $state.go("Dashboard");
        }
        $scope.DownloadtoExcel = function (tableid) {
            var exportHref = Excel.tableToExcel(tableid, 'stdentDetails');
            $timeout(function () {
                var a = document.createElement('a');
                a.href = exportHref;
                a.remove();
                a.download = "StudentMarks.xls";
                document.body.appendChild(a);
                a.click();
                a.remove();
            }, 100);
        }
        $scope.openStatisticalReport = function () {
            $state.go("Dashboard.StatisticalReports");
        }

        $scope.AddMarksByIds = function (data) {
            if (data.mid1 > data.Mid1Max_Marks) {
                alert("Marks Entered should not be greater than maximum marks.");
                $('#' + data.id).val('');
                if (markslist.length > 0) {
                    for (var i = 0 ; i < markslist.length; i++) {
                        if (markslist[i].id == data.id) {
                            markslist[i].mid1 = '';
                            data.mid1 = '';

                        }
                    }
                }
                return;
            }



            if (data.mid2 > data.Mid2Max_Marks) {
                alert("Marks Entered should not be greater than maximum marks.");
                $('#' + data.id).val('');
                if (markslist.length > 0) {
                    for (var i = 0 ; i < markslist.length; i++) {
                        if (markslist[i].id == data.id) {
                            markslist[i].mid2 = '';
                            data.mid2 = '';
                        }
                    }
                }
                return;
            }
            if (data.internal > data.InternalMax_Marks) {
                alert("Marks Entered should not be greater than maximum marks.");
                $('#' + data.id).val('');
                if (markslist.length > 0) {
                    for (var i = 0 ; i < markslist.length; i++) {
                        if (markslist[i].id == data.id) {
                            markslist[i].internals = '';
                            data.internal = '';
                        }
                    }
                }
                return;
            }
            if (data.endexam > data.end_exam_max_marks) {
                alert("Marks Entered should not be greater than maximum marks.");
                $('#' + data.id).val('');
                if (markslist.length > 0) {
                    for (var i = 0 ;i < markslist.length; i++){
                        if (markslist[i].id == data.id) {
                            markslist[i].endexam = '';
                            data.endexam = '';
                        }
                    }
                }
                return;
            }


            if (data.mid1) {
                data.mid1 = data.mid1.trim();
                if (data.mid1 != null && data.mid1 != "") {
                    if (isNaN(data.mid1)) {
                        if (data.mid1.toUpperCase() == 'AB' || data.mid1.toUpperCase() == 'MP' || data.mid1.toUpperCase() == 'DC' || data.mid1.toUpperCase() == 'TC' || data.mid1.toUpperCase() == 'DT') {
                            isvalied = true;
                        } else {
                            isvalied = false;
                        }
                    } else {
                        isvalied = true;
                    }
                }
            }
            if (data.mid2) {
                data.mid2 = data.mid2.trim();
                if (data.mid2 != null && data.mid2 != "") {
                    if (isNaN(data.mid2)) {
                        if (data.mid2.toUpperCase() == 'AB' || data.mid2.toUpperCase() == 'MP' || data.mid2.toUpperCase() == 'DC' || data.mid2.toUpperCase() == 'TC' || data.mid2.toUpperCase() == 'DT') {
                            isvalied = true;
                        } else {
                            isvalied = false;
                        }
                    } else {
                        isvalied = true;
                    }
                }
            }
            if (data.internal) {
                data.internal = data.internal.trim();
                if (data.internal != null && data.internal != "") {
                    if (isNaN(data.internal)) {
                        if (data.internal.toUpperCase() == 'AB' || data.internal.toUpperCase() == 'MP' || data.internal.toUpperCase() == 'DC' || data.internal.toUpperCase() == 'TC' || data.internal.toUpperCase() == 'DT') {
                            isvalied = true;
                        } else {
                            isvalied = false;
                        }
                    } else {
                        isvalied = true;
                    }
                }
            }
            if (data.endexam) {
                data.endexam = data.endexam.trim();
                if (data.endexam != null && data.endexam != "") {
                    if (isNaN(data.endexam)) {
                        if (data.endexam.toUpperCase() == 'AB' || data.endexam.toUpperCase() == 'MP' || data.endexam.toUpperCase() == 'DC' || data.endexam.toUpperCase() == 'TC' || data.endexam.toUpperCase() == 'DT') {
                            isvalied = true;
                        } else {
                            isvalied = false;
                        }
                    } else {
                        isvalied = true;
                    }
                }
            }

            if (data.mid1 != null && data.mid1 != "" || data.mid2 != null && data.mid2 != "" || data.internal != null && data.internal != "" ||
                data.endexam != null && data.endexam != "") {
                if (markslist.length == '0') {

                    var marksdata = $scope.addData(data.id, data.mid1, data.mid2, data.internal, data.endexam);
                    markslist.push(marksdata);


                } else if (markslist.length > 0) {
                    for (var i = 0 ; i < markslist.length; i++) {

                        if (markslist[i].id == data.id) {
                            markslist[i].mid1 = data.mid1;
                            markslist[i].mid2 = data.mid2;
                            markslist[i].internals = data.internal;
                            markslist[i].endexam = data.endexam;
                            tempId.push(data.id);
                        }
                        if (markslist[i].id != data.id && !tempId.includes(data.id)) {

                            var marksdata = $scope.addData(data.id, data.mid1, data.mid2, data.internal, data.endexam);
                            tempId.push(data.id);
                            markslist.push(marksdata);

                        }
                    }
                }

            }

        }

        $scope.addData = function (id, mid1, mid2, internal, endexam) {
            return {
                id: id,
                mid1: mid1,
                mid2: mid2,
                internals: internal,
                endexam: endexam,
            };
        }


        $scope.updateData = function () {
            var updateData = ReportService.UpdateStudentBacklogMarks(markslist);
            updateData.then(function (data) {
                // console.log(data)
                alert("Student Marks Updated Successfully")
                $scope.search()
            }, function (error) {
                $scope.searchResult = false;
                $scope.LoadImg = false;
                $scope.StudentDetailsFound = false;
                alert("error");
            });
        }

      
    })
    app.factory('Excel', function ($window) {
        //alert("hello");
        var uri = 'data:application/vnd.ms-excel;base64,',
            template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
            base64 = function (s) { return $window.btoa(unescape(encodeURIComponent(s))); },
            format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) };
        return {
            tableToExcel: function (tableId, worksheetName) {
                var table = $(tableId);
                ctx = { worksheet: worksheetName, table: table.html() },
                    href = uri + base64(format(template, ctx));
                return href;
            }
        };
    });
})