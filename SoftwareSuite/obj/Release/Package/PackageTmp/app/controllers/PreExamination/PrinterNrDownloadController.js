define(['app'], function (app) {
    app.controller("PrinterNrDownloadController", function ($scope, $http, $localStorage, $state, $stateParams, AppSettings, PreExaminationService) {

        $scope.ArrayBarimg = [];
        $scope.ArrayBarcode = [];
        $scope.BarcodeElements = [];
        $scope.ExamMonthYears = [];
        $scope.AcademicYears = [];
        $scope.ExamMonthYearId = "";
        $scope.StudentTypeId = "";
        $scope.AcademicYearId = "";
        $scope.examTypeId = "0";

        $scope.LoadImg = false;
        $scope.NrGenerating = false;

        $scope.Exams = [
            { id: 1, exam: "Mid 1" },
            { id: 2, exam: "Mid 2" },
            { id: 5, exam: "Semester" }
        ];

        var getAcademicYears = PreExaminationService.GetAcademicYears();
        getAcademicYears.then(function (res) {
            $scope.AcademicYears = res.Table;
        }, function (err) {
            $scope.LoadImg = false;
            alert("Error while loading");
        });

        var getExamTypes = PreExaminationService.getActiveExamTypes();
        getExamTypes.then(function (res) {
            var res = JSON.parse(res);
            $scope.GetExamTypes = res.Table;
        }, function (err) {
            $scope.LoadImg = false;
            alert("Error while loading");
        });

        var getSemesters = PreExaminationService.getActiveSemester();
        getSemesters.then(function (res) {
            //var res = JSON.parse(res);
            $scope.GetSemesters = res.Table;
        }, function (err) {
            $scope.LoadImg = false;
            alert("Error while loading");
        });

        var expanded = false;
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
        }

        $scope.optionToggledsem = function () {
            $scope.isAllSelectedsem = $scope.GetSemesters.every(function (itm) { return itm.selected; })
            $scope.semarr = [];
            angular.forEach($scope.GetSemesters, function (value, key) {
                if (value.selected === true) {
                    $scope.semarr.push({ "semid": value.semid })
                }
            });
        }


        $scope.academicYearChange = function () {
            console.log("Selected AYID: " + $scope.AcademicYearId);
            $scope.getExamMonthYears();
        }
        $scope.getExamMonthYears = function () {
            PreExaminationService.GetExamMonthYears().then(function (res) {
                $scope.ExamMonthYears = res.Table;
            },
                function (error) {
                    alert("error while loading Exam Month Years");
                    console.log(error);
                });
        }

        $scope.loadSemExamTypes = function (data) {
            console.log(data)
            var dat = JSON.parse(data)
            $scope.SchemeId = (dat.schemeid)
            $scope.Scheme = dat.scheme
            console.log($scope.SchemeId)
            var getExamType = PreExaminationService.getActiveExamTypesByScheme($scope.SchemeId);
            getExamType.then(function (response) {
                var response = JSON.parse(response);
                if (response.Table.length > 0) {
                    $scope.getExamTypes = response.Table;
                } else {
                    $scope.StudentType = [];
                    alert("No Student found on this Record");
                }
            },
                function (error) {
                    alert("error while loading Exam Month Years");
                    console.log(error);

                });

        }


        var authData = $localStorage.authorizationData;
        $scope.DetailsFound = false;
        var LoadExamTypeBysem = PreExaminationService.getStudentType();
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

        $scope.changedExamDates = function () {
            $scope.DetailsFound = false;
        };

        $scope.PrinterNrDownloadExcelReport = function () {
            $scope.NrGenerating = true;
            if ($scope.ExamMonthYearId == "" || $scope.StudentTypeId == "" || $scope.AcademicYearId == "") {
                $scope.NrGenerating = false;
                alert("Please Select All Details");
            }
            var gerNrexcelData = PreExaminationService.PrinterNrDownloadExcelReport($scope.AcademicYearId, $scope.ExamMonthYearId, $scope.StudentTypeId, $scope.examTypeId, JSON.stringify($scope.semarr));
            gerNrexcelData.then(function (res) {
                $scope.NrGenerating = false;
                if (res.length > 10) {
                    window.location.href = res;
                } else {
                    alert("Failed to  download Excel report");
                }
            }, function (err) {
                $scope.NrGenerating = false;
            });
        };

        $scope.PrinterNrAttendanceExcelReport = function () {
            $scope.NrGenerating = true;
            if ($scope.ExamMonthYearId == "" || $scope.StudentTypeId == "" || $scope.AcademicYearId == "") {
                $scope.NrGenerating = false;
                alert("Please Select All Details");
            }
            var gerNrexcelData = PreExaminationService.PrinterNrAttendanceExcelReport($scope.AcademicYearId, $scope.ExamMonthYearId, $scope.StudentTypeId, $scope.examTypeId, JSON.stringify($scope.semarr));
            gerNrexcelData.then(function (res) {
                $scope.NrGenerating = false;
                if (res.length > 10) {
                    window.location.href = res;
                } else {
                    alert("Failed to  download Excel report");
                }
            }, function (err) {
                $scope.NrGenerating = false;
            });
        };
        

        $scope.downloadPrinterNr = function () {
            $scope.NrGenerating = true;
            if ($scope.ExamMonthYearId == "" || $scope.StudentTypeId == "" || $scope.AcademicYearId == "") {
                $scope.NrGenerating = false;
                alert("Please Select All Details");
            }
            //console.log($scope.AcademicYearId, $scope.ExamMonthYearId, $scope.StudentTypeId, $scope.examTypeId, JSON.stringify($scope.semarr))
            var gerNrData = PreExaminationService.PrinterNrDownload($scope.AcademicYearId, $scope.ExamMonthYearId, $scope.StudentTypeId, $scope.examTypeId, JSON.stringify($scope.semarr));
            gerNrData.then(function (res) {
                $scope.NrGenerating = false;
                if (res.length > 10) {
                    window.location.href = "/Reports/NR/" + res;
                } else {
                    alert("Failed to generate NR");
                }
            }, function (err) {
                $scope.NrGenerating = false;
            });
        };

        $scope.PrinterNrCollegeVsBranchReport = function () {
            $scope.NrGenerating = true;
            if ($scope.ExamMonthYearId == "" || $scope.StudentTypeId == "" || $scope.AcademicYearId == "" || $scope.examTypeId == "") {
                $scope.NrGenerating = false;
                alert("Please Select All Details");
            }
            var gerNrData = PreExaminationService.PrinterNrCollegeVsBranchReport($scope.AcademicYearId, $scope.ExamMonthYearId, $scope.StudentTypeId, $scope.examTypeId);
            gerNrData.then(function (res) {
                $scope.NrGenerating = false;
                if (res.length > 10) {
                    window.location.href = res;
                } else {
                    alert("Failed to  download report");
                }
            }, function (err) {
                $scope.NrGenerating = false;
            });
        };

        $scope.getNRStudentDetails = function (ExamMonthYearId, StudentType, ExamDate, ExamType) {
            $scope.LoadImg = true;
            var getNrReports = PreExaminationService.NrReports(ExamMonthYearId, StudentType, authData.College_Code.toString(), ExamDate, ExamType);
            getNrReports.then(function (res) {
                $scope.LoadImg = false;
                if (res.length > 0) {
                    if (res.length > 4) {
                        window.location.href = '/Reports/' + res + '.pdf';
                    } else {
                        alert("No NR Report Present");
                    }
                } else {
                    alert("No NR Report Present");
                }
            }, function (err) {
                $scope.LoadImg = false;
                alert("Error while loading");
            });

        };



        $scope.printMarksEntered = function () {

            $scope.printHead = true;
            var divName = "idtoDivPrint";
            var $markstable = document.createElement("div");
            $markstable.innerHTML = '';
            $markstable.className = "table";
            var divToPrint = document.getElementById(divName);
            var temp = document.body.innerHTML;
            //    $("#markslist").hide();
            var domClone = divToPrint.cloneNode(true);
            var $printSection = document.getElementById("printSection");
            if ($printSection) {
                var $printSection = document.createElement("div");
                $printSection.id = "printSection";


                document.body.appendChild($printSection);

                var $ele1 = document.createElement("div");
                $ele1.className = "row";

                var $ele2 = document.createElement("div");
                $ele2.className = "col-lg-2 col-md-12";

                var $ele3 = document.createElement("div");
                $ele3.className = "col-lg-10 col-md-12";


                $ele1.appendChild($ele3);

                $printSection.appendChild($ele1);

                $printSection.appendChild($ele1);
                $printSection.appendChild($markstable);

            }
            var tempTitle = document.title;
            var dateobj = new Date();
            //var B = dateobj.getDate();
            // var date = dateobj.getDate() + dateobj.getHours+":"+dateobj.getMinutes;
            //document.write(B);
            document.title = $scope.pinNumber;
            window.print();
            document.title = tempTitle;

        }
    })
})