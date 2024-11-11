define(['app'], function (app) {
    app.controller("ReadmissionListController", function ($scope, $state, $stateParams, $localStorage, AppSettings, AdmissionService, Excel, $timeout, PreExaminationService, AssessmentService, StudentWiseService, StudentResultService) {
        $scope.loading = false;
        $scope.hidedata = function () {

            $scope.result = false;
            $scope.loading = false;
        }




        var getSemesters = PreExaminationService.getAllSemester();
        getSemesters.then(function (res) {
            //var res = JSON.parse(res);
            $scope.GetSemesters = res.Table;
            $scope.isAllSelectedsem = true;
            var toggleStatus = $scope.isAllSelectedsem;
            angular.forEach($scope.GetSemesters, function (itm) { itm.selected = toggleStatus; });
            $scope.semarr = [];
            angular.forEach($scope.GetSemesters, function (value, key) {
                if (value.selected === true) {
                    $scope.semarr.push({ "semid": value.semid })
                }
            });
        }, function (err) {
            $scope.LoadImg = false;
            alert("Error while loading");
        });

        var getClgTypes = PreExaminationService.GetCollegeTypes();
        getClgTypes.then(function (res) {
            //var res = JSON.parse(res);
            $scope.GetCollegeTypes = res.Table;
            $scope.isAllSelectedCollegeTypes = true;
            var toggleStatus = $scope.isAllSelectedCollegeTypes
            angular.forEach($scope.GetCollegeTypes, function (itm) { itm.selected = toggleStatus; });
            $scope.CollegeTypesArray = [];
            angular.forEach($scope.GetCollegeTypes, function (value, key) {
                if (value.selected === true) {
                    $scope.CollegeTypesArray.push({ "collegetype": value.CollegeType })
                }
            });
        }, function (err) {
            $scope.LoadImg = false;
            alert("Error while loading College Types");
        });

        var getAdmissionTypes = PreExaminationService.GetAdmissionTypes();
        getAdmissionTypes.then(function (res) {
            //var res = JSON.parse(res);
            $scope.GetAdmissionTypes = res.Table;
            $scope.isAllSelectedAdmissionType = true;
            var toggleStatus = $scope.isAllSelectedAdmissionType
            angular.forEach($scope.GetAdmissionTypes, function (itm) { itm.selected = toggleStatus; });
            $scope.AdmissionTypeArray = [];
            angular.forEach($scope.GetAdmissionTypes, function (value, key) {
                if (value.selected === true) {
                    $scope.AdmissionTypeArray.push({ "admissiontype": value.ADMType })
                }
            });
        }, function (err) {
            $scope.LoadImg = false;
            alert("Error while loading College Types");
        });

        $scope.Array = [
            { "Id": "1", "Value": "Yes" },
            { "Id": "0", "Value": "No" }
        ]
        $scope.isAllSelectedHandicaped = true;
        var toggleStatus = $scope.isAllSelectedHandicaped
        angular.forEach($scope.Array, function (itm) { itm.selected = toggleStatus; });
        $scope.HandicapedArray = [];
        angular.forEach($scope.Array, function (value, key) {
            if (value.selected === true) {
                $scope.HandicapedArray.push({ "isphysicallyhandicaped": value.Id })
            }
        });

        var getCategories = PreExaminationService.GetCategory();
        getCategories.then(function (res) {
            //var res = JSON.parse(res);
            $scope.GetCategories = res.Table;
            $scope.isAllSelectedCategory = true;
            var toggleStatus = $scope.isAllSelectedCategory
            angular.forEach($scope.GetCategories, function (itm) { itm.selected = toggleStatus; });
            $scope.CategoryArray = [];
            angular.forEach($scope.GetCategories, function (value, key) {
                if (value.selected === true) {
                    $scope.CategoryArray.push({ "categoryid": value.CategoryId })
                }
            });


        }, function (err) {
            $scope.LoadImg = false;
            alert("Error while loading Categories");
        });


        var getExamMonth = PreExaminationService.GetExamMonthYear();
        getExamMonth.then(function (response) {
            var response = JSON.parse(response)
            if (response.Table.length > 0) {
                $scope.MonthAndYear = response.Table;
            } else {
                $scope.MonthAndYear = [];
                alert("No Student found on this Record");
            }
        },
            function (error) {
                alert("error while loading Exam Month Years");
                console.log(error);

            });

        var AcademicYears = PreExaminationService.GetAcademicYears();
        AcademicYears.then(function (response) {
            if (response.Table.length > 0) {
                $scope.GetAcademicYears = response.Table;
            } else {
                $scope.GetAcademicYears = [];
                alert("No Academic Years Found");
            }
        },
            function (error) {
                alert("error while loading Academic Years");
                console.log(error);
            });

        var GetBranchs = PreExaminationService.GetBranchs();
        GetBranchs.then(function (response) {
            if (response.Table.length > 0) {
                $scope.GetBranchs = response.Table;
                $scope.isAllSelectedBranch = true;
                var toggleStatus = $scope.isAllSelectedBranch
                angular.forEach($scope.GetBranchs, function (itm) { itm.selected = toggleStatus; });
                $scope.BranchArray = [];
                angular.forEach($scope.GetBranchs, function (value, key) {
                    if (value.selected === true) {
                        $scope.BranchArray.push({ "branchid": value.BranchID })
                    }
                });
            } else {
                $scope.GetBranchs = [];
                alert("No Branchs Found");
            }
        },
            function (error) {
                alert("error while loading Academic Years");
                console.log(error);
            });


        var LoadExamTypeBysem = StudentResultService.getStudentType();
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


        var SCHEMESEMINFO = StudentResultService.GetSchemeDataForResults();
        $scope.seminfo = [];
        $scope.examtypeinfo = [];
        $scope.pin = "";
        $scope.showData = 0;
        SCHEMESEMINFO.then(function (data) {
            if (data.length > 0) {

                $scope.schemeinfo = data;
                $scope.isAllSelectedScheme = true;
                var toggleStatus = $scope.isAllSelectedScheme
                angular.forEach($scope.schemeinfo, function (itm) { itm.selected = toggleStatus; });
                $scope.SchemeArray = [];
                angular.forEach($scope.schemeinfo, function (value, key) {
                    if (value.selected === true) {
                        $scope.SchemeArray.push({ "schemeid": value.schemeid })
                    }
                });
            }
        }, function (error) {
            alert("unable to load Schemes");
        });
        //----------------------Category Multi Select Start--------------------------------//
        var CategoryExpand = false;
        $scope.showCategoryCheckboxes = function () {
            var checkboxes = document.getElementById("checkboxesCategory");
            if (!CategoryExpand) {
                checkboxes.style.display = "block";
                checkboxes.style.position = "absolute";
                checkboxes.style.width = "92%";
                checkboxes.style.backgroundColor = "white";
                checkboxes.style['z-index'] = 99;
                CategoryExpand = true;
            } else {
                checkboxes.style.display = "none";
                CategoryExpand = false;
            }
        }

        $scope.closeCategoryCheckbox = function () {
            var checkboxes = document.getElementById("checkboxesCategory");
            if (!CategoryExpand) {
                checkboxes.style.display = "block";
                checkboxes.style.position = "absolute";
                checkboxes.style.width = "92%";
                checkboxes.style.backgroundColor = "white";
                CategoryExpand = true;
            } else {
                checkboxes.style.display = "none";
                CategoryExpand = false;
            }
        }

        $scope.toggleAllCategory = function () {
            var toggleStatus = $scope.isAllSelectedCategory
            angular.forEach($scope.GetCategories, function (itm) { itm.selected = toggleStatus; });
            $scope.CategoryArray = [];
            angular.forEach($scope.GetCategories, function (value, key) {
                if (value.selected === true) {
                    $scope.CategoryArray.push({ "categoryid": value.CategoryId })
                }
            });

        }

        $scope.optionToggledCategory = function () {
            $scope.isAllSelectedCategory = $scope.GetCategories.every(function (itm) { return itm.selected; })
            $scope.CategoryArray = [];
            angular.forEach($scope.GetCategories, function (value, key) {
                if (value.selected === true) {
                    $scope.CategoryArray.push({ "categoryid": value.CategoryId })
                }
            });

        }

        //----------------------Category Multi Select End--------------------------------//

        //----------------------Handicaped Multi Select Start--------------------------------//
        var HandicapedExpand = false;
        $scope.showHandicapedCheckboxes = function () {
            var checkboxes = document.getElementById("checkboxesHandicaped");
            if (!HandicapedExpand) {
                checkboxes.style.display = "block";
                checkboxes.style.position = "absolute";
                checkboxes.style.width = "92%";
                checkboxes.style.backgroundColor = "white";
                checkboxes.style['z-index'] = 99;
                HandicapedExpand = true;
            } else {
                checkboxes.style.display = "none";
                HandicapedExpand = false;
            }
        }

        $scope.closeHandicapedCheckbox = function () {
            var checkboxes = document.getElementById("checkboxesHandicaped");
            if (!HandicapedExpand) {
                checkboxes.style.display = "block";
                checkboxes.style.position = "absolute";
                checkboxes.style.width = "92%";
                checkboxes.style.backgroundColor = "white";
                HandicapedExpand = true;
            } else {
                checkboxes.style.display = "none";
                HandicapedExpand = false;
            }
        }

        $scope.toggleAllHandicaped = function () {
            var toggleStatus = $scope.isAllSelectedHandicaped
            angular.forEach($scope.Array, function (itm) { itm.selected = toggleStatus; });
            $scope.HandicapedArray = [];
            angular.forEach($scope.Array, function (value, key) {
                if (value.selected === true) {
                    $scope.HandicapedArray.push({ "isphysicallyhandicaped": value.Id })
                }
            });

        }

        $scope.optionToggledHandicaped = function () {
            $scope.isAllSelectedHandicaped = $scope.Array.every(function (itm) { return itm.selected; })
            $scope.HandicapedArray = [];
            angular.forEach($scope.Array, function (value, key) {
                if (value.selected === true) {
                    $scope.HandicapedArray.push({ "isphysicallyhandicaped": value.Id })
                }
            });

        }

        //----------------------Handicaped Multi Select End--------------------------------//

        //----------------------Branch Multi Select Start--------------------------------//
        var BranchExpand = false;
        $scope.showBranchCheckboxes = function () {
            var checkboxes = document.getElementById("checkboxesBranch");
            if (!BranchExpand) {
                checkboxes.style.display = "block";
                checkboxes.style.position = "absolute";
                checkboxes.style.width = "92%";
                checkboxes.style.backgroundColor = "white";
                checkboxes.style['z-index'] = 99;
                BranchExpand = true;
            } else {
                checkboxes.style.display = "none";
                BranchExpand = false;
            }
        }

        $scope.closeBranchCheckbox = function () {
            var checkboxes = document.getElementById("checkboxesBranch");
            if (!BranchExpand) {
                checkboxes.style.display = "block";
                checkboxes.style.position = "absolute";
                checkboxes.style.width = "92%";
                checkboxes.style.backgroundColor = "white";
                BranchExpand = true;
            } else {
                checkboxes.style.display = "none";
                BranchExpand = false;
            }
        }

        $scope.toggleAllBranch = function () {
            var toggleStatus = $scope.isAllSelectedBranch
            angular.forEach($scope.GetBranchs, function (itm) { itm.selected = toggleStatus; });
            $scope.BranchArray = [];
            angular.forEach($scope.GetBranchs, function (value, key) {
                if (value.selected === true) {
                    $scope.BranchArray.push({ "branchid": value.BranchID })
                }
            });

        }

        $scope.optionToggledBranch = function () {
            $scope.isAllSelectedBranch = $scope.GetBranchs.every(function (itm) { return itm.selected; })
            $scope.BranchArray = [];
            angular.forEach($scope.GetBranchs, function (value, key) {
                if (value.selected === true) {
                    $scope.BranchArray.push({ "branchid": value.BranchID })
                }
            });

        }

        //----------------------Branch Multi Select End--------------------------------//


        //----------------------AdmissionType Multi Select Start--------------------------------//
        var AdmissionTypeExpand = false;
        $scope.showAdmissionTypeCheckboxes = function () {
            var checkboxes = document.getElementById("checkboxesAdmissionType");
            if (!AdmissionTypeExpand) {
                checkboxes.style.display = "block";
                checkboxes.style.position = "absolute";
                checkboxes.style.width = "92%";
                checkboxes.style.backgroundColor = "white";
                checkboxes.style['z-index'] = 99;
                AdmissionTypeExpand = true;
            } else {
                checkboxes.style.display = "none";
                AdmissionTypeExpand = false;
            }
        }

        $scope.closeAdmissionTypeCheckbox = function () {
            var checkboxes = document.getElementById("checkboxesAdmissionType");
            if (!AdmissionTypeExpand) {
                checkboxes.style.display = "block";
                checkboxes.style.position = "absolute";
                checkboxes.style.width = "92%";
                checkboxes.style.backgroundColor = "white";
                AdmissionTypeExpand = true;
            } else {
                checkboxes.style.display = "none";
                AdmissionTypeExpand = false;
            }
        }

        $scope.toggleAllAdmissionType = function () {
            var toggleStatus = $scope.isAllSelectedAdmissionType
            angular.forEach($scope.GetAdmissionTypes, function (itm) { itm.selected = toggleStatus; });
            $scope.AdmissionTypeArray = [];
            angular.forEach($scope.GetAdmissionTypes, function (value, key) {
                if (value.selected === true) {
                    $scope.AdmissionTypeArray.push({ "admissiontype": value.ADMType })
                }
            });

        }

        $scope.optionToggledAdmissionType = function () {
            $scope.isAllSelectedAdmissionType = $scope.GetAdmissionTypes.every(function (itm) { return itm.selected; })
            $scope.AdmissionTypeArray = [];
            angular.forEach($scope.GetAdmissionTypes, function (value, key) {
                if (value.selected === true) {
                    $scope.AdmissionTypeArray.push({ "admissiontype": value.ADMType })
                }
            });

        }

        //----------------------AdmissionType Multi Select End--------------------------------//


        //----------------------CollegeTypes Multi Select Start--------------------------------//
        var CollegeTypesExpand = false;
        $scope.showCollegeTypesCheckboxes = function () {
            var checkboxes = document.getElementById("checkboxesCollegeTypes");
            if (!CollegeTypesExpand) {
                checkboxes.style.display = "block";
                checkboxes.style.position = "absolute";
                checkboxes.style.width = "92%";
                checkboxes.style.backgroundColor = "white";
                checkboxes.style['z-index'] = 99;
                CollegeTypesExpand = true;
            } else {
                checkboxes.style.display = "none";
                CollegeTypesExpand = false;
            }
        }

        $scope.closeCollegeTypesCheckbox = function () {
            var checkboxes = document.getElementById("checkboxesCollegeTypes");
            if (!CollegeTypesExpand) {
                checkboxes.style.display = "block";
                checkboxes.style.position = "absolute";
                checkboxes.style.width = "92%";
                checkboxes.style.backgroundColor = "white";
                CollegeTypesExpand = true;
            } else {
                checkboxes.style.display = "none";
                CollegeTypesExpand = false;
            }
        }

        $scope.toggleAllCollegeTypes = function () {
            var toggleStatus = $scope.isAllSelectedCollegeTypes
            angular.forEach($scope.GetCollegeTypes, function (itm) { itm.selected = toggleStatus; });
            $scope.CollegeTypesArray = [];
            angular.forEach($scope.GetCollegeTypes, function (value, key) {
                if (value.selected === true) {
                    $scope.CollegeTypesArray.push({ "collegetype": value.CollegeType })
                }
            });

        }

        $scope.optionToggledCollegeTypes = function () {
            $scope.isAllSelectedCollegeTypes = $scope.GetCollegeTypes.every(function (itm) { return itm.selected; })
            $scope.CollegeTypesArray = [];
            angular.forEach($scope.GetCollegeTypes, function (value, key) {
                if (value.selected === true) {
                    $scope.CollegeTypesArray.push({ "collegetype": value.CollegeType })
                }
            });

        }

        //----------------------CollegeTypes Multi Select End--------------------------------//

        //----------------------AcademicYear Multi Select Start--------------------------------//
        var AcademicYearExpand = false;
        $scope.showAcademicYearCheckboxes = function () {
            var checkboxes = document.getElementById("checkboxesAcademicYear");
            if (!AcademicYearExpand) {
                checkboxes.style.display = "block";
                checkboxes.style.position = "absolute";
                checkboxes.style.width = "92%";
                checkboxes.style.backgroundColor = "white";
                checkboxes.style['z-index'] = 99;
                AcademicYearExpand = true;
            } else {
                checkboxes.style.display = "none";
                AcademicYearExpand = false;
            }
        }

        $scope.closeAcademicYearCheckbox = function () {
            var checkboxes = document.getElementById("checkboxesAcademicYear");
            if (!AcademicYearExpand) {
                checkboxes.style.display = "block";
                checkboxes.style.position = "absolute";
                checkboxes.style.width = "92%";
                checkboxes.style.backgroundColor = "white";
                AcademicYearExpand = true;
            } else {
                checkboxes.style.display = "none";
                AcademicYearExpand = false;
            }
        }

        $scope.toggleAllAcademicYear = function () {
            var toggleStatus = $scope.isAllSelectedAcademicYear
            angular.forEach($scope.GetAcademicYears, function (itm) { itm.selected = toggleStatus; });
            $scope.AcademicYearArray = [];
            angular.forEach($scope.GetAcademicYears, function (value, key) {
                if (value.selected === true) {
                    $scope.AcademicYearArray.push({ "AcademicYearId": value.AcademicID })
                }
            });

        }

        $scope.optionToggledAcademicYear = function () {
            $scope.isAllSelectedAcademicYear = $scope.GetAcademicYears.every(function (itm) { return itm.selected; })
            $scope.AcademicYearArray = [];
            angular.forEach($scope.GetAcademicYears, function (value, key) {
                if (value.selected === true) {
                    $scope.AcademicYearArray.push({ "AcademicYearId": value.AcademicID })
                }
            });

        }

        //----------------------AcademicYear Multi Select End--------------------------------//


        //----------------------Scheme Multi Select Start--------------------------------//
        var SchemeExpand = false;
        $scope.showSchemeCheckboxes = function () {
            var checkboxes = document.getElementById("checkboxesScheme");
            if (!SchemeExpand) {
                checkboxes.style.display = "block";
                checkboxes.style.position = "absolute";
                checkboxes.style.width = "92%";
                checkboxes.style.backgroundColor = "white";
                checkboxes.style['z-index'] = 99;
                SchemeExpand = true;
            } else {
                checkboxes.style.display = "none";
                SchemeExpand = false;
            }
        }

        $scope.closeSchemeCheckbox = function () {
            var checkboxes = document.getElementById("checkboxesScheme");
            if (!SchemeExpand) {
                checkboxes.style.display = "block";
                checkboxes.style.position = "absolute";
                checkboxes.style.width = "92%";
                checkboxes.style.backgroundColor = "white";
                SchemeExpand = true;
            } else {
                checkboxes.style.display = "none";
                SchemeExpand = false;
            }
        }

        $scope.toggleAllScheme = function () {
            var toggleStatus = $scope.isAllSelectedScheme
            angular.forEach($scope.schemeinfo, function (itm) { itm.selected = toggleStatus; });
            $scope.SchemeArray = [];
            angular.forEach($scope.schemeinfo, function (value, key) {
                if (value.selected === true) {
                    $scope.SchemeArray.push({ "schemeid": value.schemeid })
                }
            });

        }

        $scope.optionToggledScheme = function () {
            $scope.isAllSelectedScheme = $scope.schemeinfo.every(function (itm) { return itm.selected; })
            $scope.SchemeArray = [];
            angular.forEach($scope.schemeinfo, function (value, key) {
                if (value.selected === true) {
                    $scope.SchemeArray.push({ "schemeid": value.schemeid })
                }
            });

        }

        //----------------------Scheme Multi Select End--------------------------------//

        //----------------------Sem Multi Select Start--------------------------------//
        var semexpand = false;
        $scope.showsemCheckboxes = function () {
            var checkboxes = document.getElementById("checkboxessem");
            if (!semexpand) {
                checkboxes.style.display = "block";
                checkboxes.style.position = "absolute";
                checkboxes.style.width = "92%";
                checkboxes.style.backgroundColor = "white";
                checkboxes.style['z-index'] = 99;
                semexpand = true;
            } else {
                checkboxes.style.display = "none";
                semexpand = false;
            }
        }

        $scope.closesemCheckbox = function () {
            var checkboxes = document.getElementById("checkboxessem");
            if (!semexpand) {
                checkboxes.style.display = "block";
                checkboxes.style.position = "absolute";
                checkboxes.style.width = "92%";
                checkboxes.style.backgroundColor = "white";
                semexpand = true;
            } else {
                checkboxes.style.display = "none";
                semexpand = false;
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

        //----------------------Sem Multi Select End--------------------------------//

        $scope.GetDetails = function (DataTypeId) {
            $scope.loading = true;
            $scope.DataTypeId = DataTypeId
            var getActiveList = AdmissionService.GetAdminAdmissionReports($scope.DataTypeId);
            getActiveList.then(function (response) {
                if (response.Table[0].ResponceCode == '200') {
                    //console.log(response)
                    $scope.CollegeTransferedList = response.Table1;
                    $scope.loading = false;
                    //$scope.$emit('hideLoading', data);
                    $scope.Noresult = false;
                    $scope.result = true;

                } else {
                    //$scope.$emit('hideLoading', data);
                    $scope.loading = false;
                    $scope.Noresult = true;
                    $scope.result = false;
                }


            },
                function (error) {
                    $scope.$emit('hideLoading', data);
                    $scope.loading = false;
                    $scope.Noresult = true;
                    $scope.result = false;
                })
        }



        //$scope.DownloadExcel = function () {
        //    var getExcelreport = AdmissionService.GetAdmissionReportsExcel($scope.AcademicYear);
        //    getExcelreport.then(function (data) {
        //        $scope.gentmetbl = false;
        //        if (data.length > 0) {
        //            if (data.length > 4) {

        //                var location = data;
        //                window.location.href = location;

        //            } else {
        //                alert("Data not Present");
        //            }
        //        } else {
        //            alert("Data not Present");
        //        }
        //        //$scope.ResultNotFound = false;
        //        //$scope.ResultFound = false;
        //        $scope.LoadImg = false;


        //    }, function (error) {
        //        $scope.gentmetbl = false;
        //        $scope.ResultNotFound = true;
        //        $scope.ResultFound = false;
        //        $scope.LoadImg = false;
        //    });
        //}
        $scope.OpenReport = function (CollegeCode, DataTypeId) {
            $localStorage.AdmReportData = {
                CollegeCode: CollegeCode,
                DataTypeId: $scope.DataTypeId,
                AcademicYear: $scope.AcademicYear,
                Branch: JSON.stringify($scope.BranchArray),
                Category: JSON.stringify($scope.CategoryArray),
                AdmissionType: JSON.stringify($scope.AdmissionTypeArray),
                Scheme: JSON.stringify($scope.SchemeArray),
                Handicaped: JSON.stringify($scope.HandicapedArray),
                Sems: JSON.stringify($scope.semarr),
                CollegeTypes: JSON.stringify($scope.CollegeTypesArray)
            }
            $state.go('Dashboard.AdmissionDashboard.AdmissionSubReports')
        }
        $scope.DownloadtoExcel = function (tableid) {

            var exportHref = Excel.tableToExcel(tableid, 'stdentDetails');
            $timeout(function () {
                var a = document.createElement('a');
                a.href = exportHref;
                a.remove();
                a.download = "Admission_Collegewise_Counts.xls";
                document.body.appendChild(a);
                a.click();
                a.remove();
            }, 100);
        }
        $scope.DownloadtoExcel1 = function (tableid) {

            var exportHref = Excel.tableToExcel(tableid, 'stdentDetails');
            $timeout(function () {
                var a = document.createElement('a');
                a.href = exportHref;
                a.remove();
                a.download = "Admission_Branch_Wise_Report.xls";
                document.body.appendChild(a);
                a.click();
                a.remove();
            }, 100);
        }

        $scope.DownloadExcel = function () {
            //$scope.loading = true;
            $scope.DataTypeId = 2;
            var getAdmissionReports = PreExaminationService.AdmissionReportsFilterExcel($scope.AcademicYear, JSON.stringify($scope.BranchArray), JSON.stringify($scope.CategoryArray), JSON.stringify($scope.AdmissionTypeArray),
                JSON.stringify($scope.SchemeArray), JSON.stringify($scope.HandicapedArray), JSON.stringify($scope.semarr),
                JSON.stringify($scope.CollegeTypesArray), $scope.DataTypeId);
            getAdmissionReports.then(function (res) {
                var response = JSON.parse(res);

                if (response[0].file) {

                    var location = response[0].file
                    window.location.href = location;
                }
                else {
                    $scope.loading = false;
                    $scope.DataFound = false;
                    $scope.Noresult = true;
                    $scope.AdmissionReports = [];
                    alert("No Data Found");
                    $scope.$emit('hideLoading', data);
                }

            }, function (err) {
                $scope.DataFound = false;
                $scope.loading = false;
                $scope.Noresult = true;
                $scope.isShowResults = false;
                $scope.AdmissionReports = [];
                console.log(err);
                $scope.$emit('hideLoading', data);
            })
        }

        $scope.DownloadBranchExcel = function () {
            //$scope.loading = true;
            $scope.DataTypeId = 3;
            var getAdmissionReports = PreExaminationService.AdmissionBranchReportsFilterExcel($scope.AcademicYear, JSON.stringify($scope.BranchArray), JSON.stringify($scope.CategoryArray), JSON.stringify($scope.AdmissionTypeArray),
                JSON.stringify($scope.SchemeArray), JSON.stringify($scope.HandicapedArray), JSON.stringify($scope.semarr),
                JSON.stringify($scope.CollegeTypesArray), $scope.DataTypeId);
            getAdmissionReports.then(function (res) {
                var response = JSON.parse(res);

                if (response[0].file) {

                    var location = response[0].file
                    window.location.href = location;
                }
                else {
                    $scope.loading = false;
                    $scope.DataFound = false;
                    $scope.Noresult = true;
                    $scope.AdmissionReports = [];
                    alert("No Data Found");
                    $scope.$emit('hideLoading', data);
                }

            }, function (err) {
                $scope.DataFound = false;
                $scope.loading = false;
                $scope.Noresult = true;
                $scope.isShowResults = false;
                $scope.AdmissionReports = [];
                console.log(err);
                $scope.$emit('hideLoading', data);
            })
        }

        $scope.FilterData = function () {
            if ($scope.AcademicYear == '' || $scope.AcademicYear == null || $scope.AcademicYear == undefined) {
                alert('Please Select Academic Year')
                return;
            }


            if ($scope.BranchArray.length <= 0) {
                alert('Please Select Branchs')
                return;
            }
            if ($scope.CategoryArray.length <= 0) {
                alert('Please Select Categories')
                return;
            }
            if ($scope.AdmissionTypeArray.length <= 0) {
                alert('Please Select Admission Type')
                return;
            }
            if ($scope.SchemeArray.length <= 0) {
                alert('Please Select Schemes')
                return;
            }
            if ($scope.HandicapedArray.length <= 0) {
                alert('Please Select Is Physically Handicaped')
                return;
            }
            if ($scope.semarr.length <= 0) {
                alert('Please Select Semesters')
                return;
            }
            if ($scope.CollegeTypesArray.length <= 0) {
                alert('Please Select College Types')
                return;
            }
            var checkboxes = document.getElementById("checkboxesCollegeTypes");
            if (CollegeTypesExpand) {
                checkboxes.style.display = "none";
                CollegeTypesExpand = false;
            } else {

            }

            var checkboxess = document.getElementById("checkboxesAdmissionType");
            if (!AdmissionTypeExpand) {

            } else {
                checkboxess.style.display = "none";
                AdmissionTypeExpand = false;
            }

            var checkboxes = document.getElementById("checkboxessem");
            if (semexpand) {
                checkboxes.style.display = "none";
                semexpand = false;
            }

            var checkboxes = document.getElementById("checkboxesAcademicYear");
            if (AcademicYearExpand) {
                checkboxes.style.display = "none";
                AcademicYearExpand = false;
            }
            var checkboxes = document.getElementById("checkboxesCategory");
            if (CategoryExpand) {
                checkboxes.style.display = "none";
                CategoryExpand = false;
            }
            var checkboxes = document.getElementById("checkboxesBranch");
            if (BranchExpand) {
                checkboxes.style.display = "none";
                BranchExpand = false;
            }
            var checkboxes = document.getElementById("checkboxesHandicaped");
            if (HandicapedExpand) {
                checkboxes.style.display = "none";
                HandicapedExpand = false;
            }

            var checkboxes = document.getElementById("checkboxesScheme");
            if (SchemeExpand) {
                checkboxes.style.display = "none";
                SchemeExpand = false;
            }
            $scope.loading = true;
            $scope.DataTypeId = 1;
            var getAdmissionReports = PreExaminationService.AdmissionFilterReport($scope.AcademicYear, JSON.stringify($scope.BranchArray), JSON.stringify($scope.CategoryArray), JSON.stringify($scope.AdmissionTypeArray),
                JSON.stringify($scope.SchemeArray), JSON.stringify($scope.HandicapedArray), JSON.stringify($scope.semarr),
                JSON.stringify($scope.CollegeTypesArray), $scope.DataTypeId);
            getAdmissionReports.then(function (res) {
                var response = JSON.parse(res)
                if (response.Table.length > 0) {
                    $scope.loading = false;
                    $scope.DataFound = true;
                    $scope.Noresult = false;
                    $scope.AdmissionReports = response.Table;
                }
                else {
                    $scope.loading = false;
                    $scope.DataFound = false;
                    $scope.Noresult = true;
                    $scope.AdmissionReports = [];
                    alert("No Data Found");
                    $scope.$emit('hideLoading', data);
                }

            }, function (err) {
                $scope.DataFound = false;
                $scope.loading = false;
                $scope.Noresult = true;
                $scope.isShowResults = false;
                $scope.AdmissionReports = [];
                console.log(err);
                $scope.$emit('hideLoading', data);
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