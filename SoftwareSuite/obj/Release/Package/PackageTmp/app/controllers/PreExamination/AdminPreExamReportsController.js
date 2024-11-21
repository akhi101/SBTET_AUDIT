define(['app'], function (app) {
    app.controller("AdminPreExamReportsController", function ($scope, $http, $localStorage, $state, $stateParams, AppSettings, MarksEntryService, PreExaminationService, Excel, $timeout) {
        var $ctrl = this
        $ctrl.$onInit = () => {
            $scope.loading = false;
            

            var authData = $localStorage.authorizationData;
            $scope.userId = authData.SysUserID
            $scope.userTypeId = authData.SystemUserTypeId;

        }
        var data = {};
        //$scope.$emit('showLoading', data);
        var LoadExamTypeBysem = MarksEntryService.getStudentType();
        LoadExamTypeBysem.then(function (response) {
            if (response.Table.length > 0) {
                $scope.StudentType = response.Table;
            } else {
                $scope.StudentType = [];
                alert("No Student found on this Record");
            }
        },
            function (error) {
                alert("error while loading Student Types");
                console.log(error);
            });

        var getSemesters = PreExaminationService.getAllSemester();
        getSemesters.then(function (res) {
            //var res = JSON.parse(res);
            $scope.GetSemesters = res.Table;
            $scope.GetSemesters1 = res.Table;
            $scope.GetSemesters2 = res.Table;
            $scope.isAllSelectedsem = true;
            $scope.isAllSelectedsem1 = true;
            $scope.isAllSelectedsem2 = true;
            var toggleStatus = $scope.isAllSelectedsem;
            angular.forEach($scope.GetSemesters, function (itm) { itm.selected = toggleStatus; });
            $scope.semarr = [];
            angular.forEach($scope.GetSemesters, function (value, key) {
                if (value.selected === true) {
                    $scope.semarr.push({ "semid": value.semid })
                }
            });

            var toggleStatus1 = $scope.isAllSelectedsem1;
            angular.forEach($scope.GetSemesters1, function (itm1) { itm1.selected = toggleStatus1; });
            $scope.semarr1 = [];
            angular.forEach($scope.GetSemesters1, function (value1, key) {
                if (value1.selected === true) {
                    $scope.semarr1.push({ "semid": value1.semid })
                }
            });

            var toggleStatus2 = $scope.isAllSelectedsem2;
            angular.forEach($scope.GetSemesters2, function (itm2) { itm2.selected = toggleStatus2; });
            $scope.semarr2 = [];
            angular.forEach($scope.GetSemesters2, function (value2, key) {
                if (value2.selected === true) {
                    $scope.semarr2.push({ "semid": value2.semid })
                }
            });
        }, function (err) {
            $scope.LoadImg = false;
            alert("Error while loading");
        });

        $scope.GetExamMonthYearBySem = function () {
            var getExamMonthYears = PreExaminationService.GetExamMonthYearBySem(JSON.stringify($scope.semarr), $scope.StudentTypeId);
            getExamMonthYears.then(function (res) {
                // var res = JSON.parse(res);
                $scope.GetExamMonthYears = res.Table;
            }, function (err) {
                $scope.LoadImg = false;

            });
        }

        $scope.GetExamMonthYearBySem1 = function () {
            var getExamMonthYears = PreExaminationService.GetExamMonthYearBySem(JSON.stringify($scope.semarr1), $scope.StudentTypeID);
            getExamMonthYears.then(function (res) {
                // var res = JSON.parse(res);
                $scope.GetExamMonthYears1 = res.Table;
            }, function (err) {
                $scope.LoadImg = false;

            });
        }

        $scope.GetExamMonthYearBySem2 = function () {
            var getExamMonthYears = PreExaminationService.GetExamMonthYearBySem(JSON.stringify($scope.semarr2), $scope.studenttypeid);
            getExamMonthYears.then(function (res) {
                // var res = JSON.parse(res);
                $scope.GetExamMonthYears = res.Table;
            }, function (err) {
                $scope.LoadImg = false;

            });
        }
        var expanded = false;
        var expanded1 = false;
        var expanded2 = false;

        $scope.showsemCheckboxes = function () {
            var checkboxes = document.getElementById("checkboxessem");
            if (!expanded) {
                checkboxes.style.display = "block";
                checkboxes.style.position = "absolute";
                checkboxes.style.width = "92%";
                checkboxes.style.backgroundColor = "white";
                checkboxes.style['z-index'] = 99;
                expanded = true;
            } else {
                checkboxes.style.display = "none";
                expanded = false;
            }
        }

        $scope.closesemCheckbox = function () {
            var checkboxes = document.getElementById("checkboxessem");
            if (!expanded) {
                checkboxes.style.display = "block";
                checkboxes.style.position = "absolute";
                checkboxes.style.width = "92%";
                checkboxes.style.backgroundColor = "white";
                expanded = true;
            } else {
                checkboxes.style.display = "none";
                expanded = false;
            }
        }

        $scope.toggleAllsem = function () {
            var toggleStatus = $scope.isAllSelectedsem;
            angular.forEach($scope.GetSemesters, function (itm) { itm.selected = toggleStatus; });
            $scope.semarr = [];
            angular.forEach($scope.GetSemesters, function (value, key) {
                if (value.selected === true) {
                    $scope.semarr.push({ "semid": value.semid })
                }
            });
            $scope.GetExamMonthYearBySem()
        }

        $scope.optionToggledsem = function () {
            $scope.isAllSelectedsem = $scope.GetSemesters.every(function (itm) { return itm.selected; })
            $scope.semarr = [];
            angular.forEach($scope.GetSemesters, function (value, key) {
                if (value.selected === true) {
                    $scope.semarr.push({ "semid": value.semid })
                }
            });
            $scope.GetExamMonthYearBySem()
        }



        $scope.showsemCheckboxes1 = function () {
            var checkboxes1 = document.getElementById("checkboxessem1");
            if (!expanded1) {
                checkboxes1.style.display = "block";
                checkboxes1.style.position = "absolute";
                checkboxes1.style.width = "92%";
                checkboxes1.style.backgroundColor = "white";
                checkboxes1.style['z-index'] = 99;
                expanded1 = true;
            } else {
                checkboxes1.style.display = "none";
                expanded1 = false;
            }

        }

        $scope.closesemCheckbox1 = function () {
            var checkboxes1 = document.getElementById("checkboxessem1");
            if (!expanded1) {
                checkboxes1.style.display = "block";
                checkboxes1.style.position = "absolute";
                checkboxes1.style.width = "92%";
                checkboxes1.style.backgroundColor = "white";
                expanded1 = true;
            } else {
                checkboxes1.style.display = "none";
                expanded1 = false;
            }
        }

        $scope.toggleAllsem1 = function () {
            var toggleStatus = $scope.isAllSelectedsem1;
            angular.forEach($scope.GetSemesters1, function (itm1) { itm1.selected = toggleStatus; });
            $scope.semarr1 = [];
            angular.forEach($scope.GetSemesters1, function (value1, key) {
                if (value1.selected === true) {
                    $scope.semarr1.push({ "semid": value1.semid })
                }
            });
            $scope.GetExamMonthYearBySem1()
        }

        $scope.optionToggledsem1 = function () {
            $scope.isAllSelectedsem1 = $scope.GetSemesters1.every(function (itm1) { return itm1.selected; })
            $scope.semarr1 = [];
            angular.forEach($scope.GetSemesters1, function (value1, key) {
                if (value1.selected === true) {
                    $scope.semarr1.push({ "semid": value1.semid })
                }
            });
            $scope.GetExamMonthYearBySem1()
        }


        $scope.showsemCheckboxes2 = function () {
            var checkboxes2 = document.getElementById("checkboxessem2");
            if (!expanded2) {
                checkboxes2.style.display = "block";
                checkboxes2.style.position = "absolute";
                checkboxes2.style.width = "92%";
                checkboxes2.style.backgroundColor = "white";
                checkboxes2.style['z-index'] = 99;
                expanded2 = true;
            } else {
                checkboxes2.style.display = "none";
                expanded2 = false;
            }
        }

        $scope.closesemCheckbox2 = function () {
            var checkboxes2 = document.getElementById("checkboxessem2");
            if (!expanded2) {
                checkboxes2.style.display = "block";
                checkboxes2.style.position = "absolute";
                checkboxes2.style.width = "92%";
                checkboxes2.style.backgroundColor = "white";
                expanded2 = true;
            } else {
                checkboxes2.style.display = "none";
                expanded2 = false;
            }
        }

        $scope.toggleAllsem2 = function () {
            var toggleStatus2 = $scope.isAllSelectedsem2;
            angular.forEach($scope.GetSemesters2, function (itm2) { itm2.selected = toggleStatus2; });
            $scope.semarr2 = [];
            angular.forEach($scope.GetSemesters2, function (value2, key) {
                if (value2.selected === true) {
                    $scope.semarr2.push({ "semid": value2.semid })
                }
            });
            $scope.GetExamMonthYearBySem2()
        }

        $scope.optionToggledsem2 = function () {
            $scope.isAllSelectedsem2 = $scope.GetSemesters2.every(function (itm2) { return itm2.selected; })
            $scope.semarr2 = [];
            angular.forEach($scope.GetSemesters2, function (value2, key) {
                if (value2.selected === true) {
                    $scope.semarr2.push({ "semid": value2.semid })
                }
            });
            $scope.GetExamMonthYearBySem2()
        }

        $scope.GetFeepaymentReport = function () {
            $scope.loading = true;
            $scope.Noreports = false;
            $scope.reports = false;
            var AcademicYearsActive = PreExaminationService.GetAdminPreExamReports($scope.ExamMonthYearId, JSON.stringify($scope.semarr), $scope.StudentTypeId);
            AcademicYearsActive.then(function (response) {
                //var response = JSON.parse(response);
                //console.log(response);
                if (response.length > 0) {
                    $scope.loading = false;
                    $scope.reports = true;
                    $scope.Noreports = false;
                    $scope.getReports = response;
                    var OnRoll = 0
                    var Elgible = 0;
                    var St = 0;
                    var FeePaid = 0;
                    var Condonation = 0;
                    var FeeNotPaid = 0;
                    var Detained = 0;

                    for (var i = 0; i < response.length; i++) {
                        if (response[i].OnRoll != null)
                            OnRoll = OnRoll + response[i].OnRoll;
                        if (response[i].Elgible != null)
                            Elgible = Elgible + response[i].Elgible;

                        if (response[i].FeePaid != null)
                            FeePaid = FeePaid + response[i].FeePaid;

                        if (response[i].FeeNotPaid != null)
                            FeeNotPaid = FeeNotPaid + response[i].FeeNotPaid;

                        if (response[i].Condonation != null)
                            Condonation = Condonation + response[i].Condonation;
                        if (response[i].Detained != null)
                            Detained = Detained + response[i].Detained;


                    }
                    $scope.OnRoll = OnRoll;
                    $scope.Elgible = Elgible;
                    $scope.FeePaid = FeePaid;
                    $scope.FeeNotPaid = FeeNotPaid;
                    $scope.Condonation = Condonation;
                    $scope.Detained = Detained;                 
                  /*  $scope.$emit('hideLoading', data);*/

                } else {
                    $scope.loading = false;
                    $scope.reports = false;
                    $scope.Noreports = true;
                }

            },
                function (error) {
                    $scope.loading = false;
                    $scope.reports = false;
                    $scope.Noreports = true;
                    alert("error while loading data");
                });
        }


        $scope.getAdminFeedBackReports = function () {
            $scope.loading = true;
            $scope.Noreports = false;
            $scope.reports = false;
            var AcademicYearsActive = PreExaminationService.GetAdminFeedBackReports($scope.ExamMonthYearID, JSON.stringify($scope.semarr1), $scope.StudentTypeID);
            AcademicYearsActive.then(function (response) {
                //var response = JSON.parse(response);
                //console.log(response);
                if (response.length > 0) {
                    $scope.loading = false;
                    $scope.reports = true;
                    $scope.Noreports = false;
                    $scope.getReports = response;
                    var OnRoll = 0
                    var FeeEligible = 0;
                    //var St = 0;
                    var FeePaid = 0;
                    var Feedbacksubmitted = 0;
                    var Feedbacknotsubmitted = 0;
                    //var Condonation = 0;
                    //var FeeNotPaid = 0;
                    //var Detained = 0;

                    for (var i = 0; i < response.length; i++) {
                        if (response[i].OnRoll != null)
                            OnRoll = OnRoll + response[i].OnRoll;
                        if (response[i].FeeEligible != null)
                            FeeEligible = FeeEligible + response[i].FeeEligible;

                        if (response[i].FeePaid != null)
                            FeePaid = FeePaid + response[i].FeePaid;

                        if (response[i].Feedbacksubmitted != null)
                            Feedbacksubmitted = Feedbacksubmitted + response[i].Feedbacksubmitted;

                        if (response[i].Feedbacknotsubmitted != null)
                            Feedbacknotsubmitted = Feedbacknotsubmitted + response[i].Feedbacknotsubmitted;
                        //if (response[i].Detained != null)
                        //    Detained = Detained + response[i].Detained;


                    }
                    $scope.OnRoll = OnRoll;
                    $scope.FeeEligible = FeeEligible;
                    $scope.FeePaid = FeePaid;
                    $scope.Feedbacksubmitted = Feedbacksubmitted;
                    $scope.Feedbacknotsubmitted = Feedbacknotsubmitted;
                    //$scope.Detained = Detained;
                    /*  $scope.$emit('hideLoading', data);*/

                } else {
                    $scope.loading = false;
                    $scope.reports = false;
                    $scope.Noreports = true;
                }

            },
                function (error) {
                    $scope.loading = false;
                    $scope.reports = false;
                    $scope.Noreports = true;
                    alert("error while loading data");
                });
        }


        $scope.getAdminHallTicketReports = function () {
            $scope.loading = true;
            $scope.Noreports = false;
            $scope.reports = false;
            var AcademicYearsActive = PreExaminationService.GetAdminHallTicketReports($scope.exammonthyearid, JSON.stringify($scope.semarr2), $scope.studenttypeid);
            AcademicYearsActive.then(function (response) {
                //var response = JSON.parse(response);
                //console.log(response);
                if (response.length > 0) {
                    $scope.loading = false;
                    $scope.reports = true;
                    $scope.Noreports = false;
                    $scope.getReports = response;
                    var OnRoll = 0
                    var FeeEligible = 0;
                    //var St = 0;
                    var FeePaid = 0;
                    var Feedbacksubmitted = 0;
                    var Feedbacknotsubmitted = 0;
                    //var Condonation = 0;
                    //var FeeNotPaid = 0;
                    //var Detained = 0;

                    for (var i = 0; i < response.length; i++) {
                        if (response[i].OnRoll != null)
                            OnRoll = OnRoll + response[i].OnRoll;
                        if (response[i].FeeEligible != null)
                            FeeEligible = FeeEligible + response[i].FeeEligible;

                        if (response[i].FeePaid != null)
                            FeePaid = FeePaid + response[i].FeePaid;

                        if (response[i].Feedbacksubmitted != null)
                            Feedbacksubmitted = Feedbacksubmitted + response[i].Feedbacksubmitted;

                        if (response[i].Feedbacknotsubmitted != null)
                            Feedbacknotsubmitted = Feedbacknotsubmitted + response[i].Feedbacknotsubmitted;
                        //if (response[i].Detained != null)
                        //    Detained = Detained + response[i].Detained;


                    }
                    $scope.OnRoll = OnRoll;
                    $scope.FeeEligible = FeeEligible;

                    $scope.FeePaid = FeePaid;
                    $scope.Feedbacksubmitted = Feedbacksubmitted;
                    $scope.Feedbacknotsubmitted = Feedbacknotsubmitted;
                    //$scope.Detained = Detained;
                    /*  $scope.$emit('hideLoading', data);*/

                } else {
                    $scope.loading = false;
                    $scope.reports = false;
                    $scope.Noreports = true;
                }

            },
                function (error) {
                    $scope.loading = false;
                    $scope.reports = false;
                    $scope.Noreports = true;
                    alert("error while loading data");
                });
        }
    
       

        $scope.openDetails = function (data) {
           
            
          var CollegeCode = data.CollegeCode;
          localStorage.setItem('FeeExamMonthYear', $scope.ExamMonthYearId);
          //localStorage.setItem('FeeSemester', JSON.stringify($scope.semarr));
          localStorage.setItem('FeeSemester', data.semid);
          localStorage.setItem('CollegeCode', CollegeCode);
          localStorage.setItem('StudentTypeId', $scope.StudentTypeId)
            $state.go('Dashboard.PreExamination.PreExamReports')
        }

        $scope.FeeNotPaidExcelReport = function () {
            $scope.LoadImg = true;
            var FeeNotPaidExcelReport = PreExaminationService.FeeNotPaidExcelReport();
            FeeNotPaidExcelReport.then(function (res) {
                $scope.LoadImg = false;
                if (res.length > 0) {
                    if (res.length > 4) {
                        window.location.href = res;
                    } else {
                        alert("No FeeNotPaid Excel Report Present")
                    }
                } else {
                    alert("No FeeNotPaid Report Present")
                }
            }, function (err) {
                $scope.LoadImg = false;
                alert("Error while loading");
            });

        };
  

        $scope.DownloadExcel = function (tableid) {
            var exportHref = Excel.tableToExcel(tableid, 'AdminReports');
            $timeout(function () {
                var a = document.createElement('a');
                a.href = exportHref;
                a.remove();
                a.download = "AdminFeepaymentReport.xls";
                document.body.appendChild(a);
                a.click();
                a.remove();

            }, 100);
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
    })
})