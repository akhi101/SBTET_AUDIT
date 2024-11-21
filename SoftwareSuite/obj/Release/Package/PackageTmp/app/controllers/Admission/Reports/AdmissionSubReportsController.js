define(['app'], function (app) {
    app.controller("AdmissionSubReportsController", function ($scope, $state, $stateParams, $localStorage, AppSettings,$location, Excel, $timeout,AdmissionService, PreExaminationService, AssessmentService, StudentWiseService, StudentResultService) {
        var authData = $localStorage.authorizationData;
       
        if (authData == undefined) {
            $state.go('login');
        } else {
           
            $scope.UserId = authData.SysUserID;
        }
        $scope.loading = false;

      
        $scope.UserTypeId = authData.SystemUserTypeId;
        if ($scope.UserTypeId == 1) {

            var localData = $localStorage.AdmReportData
         
            $scope.CollegeCode = localData.CollegeCode
           
        } else {
            $scope.CollegeCode = authData.College_Code;
            $scope.CollegeName = authData.College_Name;
        }
        $scope.CollegeType = authData.CollegeType;
        $scope.BranchId = authData.BranchId
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

      
        var GetBranchs = PreExaminationService.getBranchsByCollegeCode($scope.CollegeCode);
        GetBranchs.then(function (res) {
            var response = JSON.parse(res);
            if (response.Table.length > 0) {
                $scope.GetBranchs = response.Table;
                $scope.isAllSelectedBranch = true;
                var toggleStatus = $scope.isAllSelectedBranch
                angular.forEach($scope.GetBranchs, function (itm) { itm.selected = toggleStatus; });
                $scope.BranchArray = [];
                angular.forEach($scope.GetBranchs, function (value, key) {
                    if (value.selected === true) {
                        $scope.BranchArray.push({ "branchid": value.BranchId })
                    }
                });
            } else {
                $scope.GetBranchs = [];
                alert("No Branchs Found");
            }
        },
            function (error) {
                alert("error while loading Branchs");
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
                    $scope.BranchArray.push({ "branchid": value.BranchId })
                }
            });

        }

        $scope.optionToggledBranch = function () {
            $scope.isAllSelectedBranch = $scope.GetBranchs.every(function (itm) { return itm.selected; })
            $scope.BranchArray = [];
            angular.forEach($scope.GetBranchs, function (value, key) {
                if (value.selected === true) {
                    $scope.BranchArray.push({ "branchid": value.BranchId })
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

        if ($scope.UserTypeId == 1) {

            var localData = $localStorage.AdmReportData

            $scope.CollegeCode = localData.CollegeCode
            $scope.DataTypeId = localData.DataTypeId
            $scope.AcademicYear = localData.AcademicYear
            $scope.Branch = localData.Branch
            $scope.Category = localData.Category
            $scope.AdmissionType = localData.AdmissionType
            $scope.Scheme = localData.Scheme
            $scope.Handicaped = localData.Handicaped
            $scope.Sems = localData.Sems
            $scope.CollegeTypes = localData.CollegeTypes
            //$scope.GetDetails = function (AcademicYear) {
            $scope.loading = true;

            var getActiveList = PreExaminationService.AdmissionSubReportsFilter($scope.CollegeCode, $scope.UserId, $scope.AcademicYear, $scope.Branch, $scope.Category, $scope.AdmissionType
                , $scope.Scheme, $scope.Handicaped, $scope.Sems, $scope.CollegeTypes, $scope.DataTypeId);
            getActiveList.then(function (res) {
                var response = JSON.parse(res);
                $scope.hodData = response;
                if (response.Table.length > 0) {
                    //console.log(response)
                    var hodData = response;
                    $scope.loading = false;
                    //$scope.$emit('hideLoading', data);
                    $scope.Noresult = false;
                    $scope.result = true;
                    if (hodData.Table[0].AcademicId == undefined) {
                        $scope.Academic = "";
                    } else {
                        $scope.Academic = hodData.Table[0].AcademicId;

                    }
                    var OnRoll = 0;
                    var Alloted = 0;
                    var AadharNotUpdated = 0;
                    var DataNotUpdated = 0;
                    var AttendeeIdNotGenerated = 0;
                    var AadharNotUpdated = 0;
                    var PinNotGenerated = 0;
                    var Intake = 0;
                    for (var i = 0; i < hodData.Table1.length; i++) {
                        if (hodData.Table1[i].OnRoll != null)
                            OnRoll = OnRoll + hodData.Table1[i].OnRoll;
                        if (hodData.Table1[i].Alloted != null)
                            Alloted = Alloted + hodData.Table1[i].Alloted;
                        if (hodData.Table1[i].AadharNotUpdated != null)
                            AadharNotUpdated = AadharNotUpdated + hodData.Table1[i].AadharNotUpdated;
                        if (hodData.Table1[i].DataNotUpdated != null)
                            DataNotUpdated = DataNotUpdated + hodData.Table1[i].DataNotUpdated;
                        if (hodData.Table1[i].AttendeeIdNotGenerated != null)
                            AttendeeIdNotGenerated = AttendeeIdNotGenerated + hodData.Table1[i].AttendeeIdNotGenerated;
                        if (hodData.Table1[i].PinNotGenerated != null)
                            PinNotGenerated = PinNotGenerated + hodData.Table1[i].PinNotGenerated;
                    }
                    $scope.OnRoll = OnRoll;
                    $scope.Alloted = Alloted;
                    $scope.AadharNotUpdated = AadharNotUpdated;
                    $scope.DataNotUpdated = DataNotUpdated;
                    $scope.AttendeeIdNotGenerated = AttendeeIdNotGenerated;
                    $scope.PinNotGenerated = PinNotGenerated;
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
        } else if ($scope.UserTypeId == 2 || $scope.UserTypeId == 3) {
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
                $scope.loading = true;
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
                if ($scope.UserTypeId == 2) {
                    $scope.CollegeTypesArray = [];
                    var obj = { "collegetype": $scope.CollegeType }
                    $scope.CollegeTypesArray.push(obj)
                } else if ($scope.UserTypeId == 3) {
                    $scope.CollegeTypesArray = [];
                    $scope.BranchArray = [];
                    var obj = { "collegetype": $scope.CollegeType }
                    $scope.CollegeTypesArray.push(obj)
                    var obj1 = { "branchid": $scope.BranchId }
                    $scope.BranchArray.push(obj1)
                }
                $scope.DataTypeId = 1
                $scope.CollegeCode = authData.College_Code;
                var getActiveList = PreExaminationService.AdmissionSubReportsFilter($scope.CollegeCode, $scope.UserId, $scope.AcademicYear, JSON.stringify($scope.BranchArray), JSON.stringify($scope.CategoryArray), JSON.stringify($scope.AdmissionTypeArray),
                JSON.stringify($scope.SchemeArray), JSON.stringify($scope.HandicapedArray), JSON.stringify($scope.semarr),
                JSON.stringify($scope.CollegeTypesArray), $scope.DataTypeId);
                getActiveList.then(function (res) {
                    var response = JSON.parse(res);
                    $scope.hodData = response;
                    if (response.Table.length > 0) {
                        //console.log(response)
                        var hodData = response;
                        $scope.loading = false;
                        //$scope.$emit('hideLoading', data);
                        $scope.Noresult = false;
                        $scope.result = true;
                        if (hodData.Table[0].AcademicId == undefined) {
                            $scope.Academic = "";
                        } else {
                            $scope.Academic = hodData.Table[0].AcademicId;

                        }
                        var OnRoll = 0;
                        var Alloted = 0;
                        var AadharNotUpdated = 0;
                        var DataNotUpdated = 0;
                        var AttendeeIdNotGenerated = 0;
                        var AadharNotUpdated = 0;
                        var PinNotGenerated = 0;
                        var Intake = 0;
                        for (var i = 0; i < hodData.Table1.length; i++) {
                            if (hodData.Table1[i].OnRoll != null)
                                OnRoll = OnRoll + hodData.Table1[i].OnRoll;
                            if (hodData.Table1[i].Alloted != null)
                                Alloted = Alloted + hodData.Table1[i].Alloted;
                            if (hodData.Table1[i].AadharNotUpdated != null)
                                AadharNotUpdated = AadharNotUpdated + hodData.Table1[i].AadharNotUpdated;
                            if (hodData.Table1[i].DataNotUpdated != null)
                                DataNotUpdated = DataNotUpdated + hodData.Table1[i].DataNotUpdated;
                            if (hodData.Table1[i].AttendeeIdNotGenerated != null)
                                AttendeeIdNotGenerated = AttendeeIdNotGenerated + hodData.Table1[i].AttendeeIdNotGenerated;
                            if (hodData.Table1[i].PinNotGenerated != null)
                                PinNotGenerated = PinNotGenerated + hodData.Table1[i].PinNotGenerated;
                        }
                        $scope.OnRoll = OnRoll;
                        $scope.Alloted = Alloted;
                        $scope.AadharNotUpdated = AadharNotUpdated;
                        $scope.DataNotUpdated = DataNotUpdated;
                        $scope.AttendeeIdNotGenerated = AttendeeIdNotGenerated;
                        $scope.PinNotGenerated = PinNotGenerated;

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
        }

        $scope.DownloadtoPdf = function (tableid) {

            var hodData = AdmissionService.GetDataForAdmissionDashboard(authData.SysUserID, $scope.College_Code.trim(), 6);
            hodData.then(function (result) {
                if (result != "") {
                    $scope.tempDetails = {};
                    var file = new Blob([result.Table1], { type: 'application/pdf' });
                    var fileURL = URL.createObjectURL(file);
                    var date = new Date();
                    var fileName = "AdmissionSummary(" + date.getUTCDate() + '-' + date.getUTCMonth() + '-' + date.getUTCFullYear() + ").pdf";
                    var a = document.createElement("a");
                    document.body.appendChild(a);
                    a.href = fileURL;
                    a.download = fileName;
                    a.click();
                }

            }, function () {



            });


            //var height = $(tableid).height();
            //$(tableid).height('auto');
            //var scaleBy = 5;
            //var w = 1000;
            //var h = 1000;

            //var div = document.querySelector(tableid);
            //var canvas = document.createElement('canvas');
            //canvas.width = w * scaleBy;
            //canvas.height = h * scaleBy;
            //canvas.style.width = w + 'px';
            //canvas.style.height = h + 'px';
            //var context = canvas.getContext('2d');
            //context.scale(scaleBy, scaleBy);
            //html2canvas(div, {
            //   // canvas: canvas,
            //    onrendered: function (canvas) {
            //        thecanvas = canvas;
            //        var data = thecanvas.toDataURL();

            //        var docDefinition = {
            //            content: [{
            //                image: data,
            //                width: 500
            //            }],
            //        };
            //        pdfMake.createPdf(docDefinition).download("Table.pdf");

            //    }
            //});
        }

        //}

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

        $scope.DownloadExcel = function () {
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
          

            if ($scope.UserTypeId == 2) {
                $scope.CollegeTypesArray = [];
                var obj = { "collegetype": $scope.CollegeType }
                $scope.CollegeTypesArray.push(obj)
            } else if ($scope.UserTypeId == 3) {
                $scope.CollegeTypesArray = [];
                $scope.BranchArray = [];
                var obj = { "collegetype": $scope.CollegeType }
                $scope.CollegeTypesArray.push(obj)
                var obj1 = { "branchid": $scope.BranchId }
                $scope.BranchArray.push(obj1)
            }
            $scope.DataTypeId = 2;
            var getAdmissionReports = PreExaminationService.AdmissionSubReportsFilterExcel($scope.CollegeCode, $scope.UserId, $scope.AcademicYear, JSON.stringify($scope.BranchArray), JSON.stringify($scope.CategoryArray), JSON.stringify($scope.AdmissionTypeArray),
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

        $scope.showDetails = function (DataFormatTypeId, semid, branchid, DataTypeId) {

                //$localStorage.AdmSublistData = {
                //    DataFormatTypeId: DataFormatTypeId,
                //    semid: semid,
                //    branchid: branchid
                //}
              
               
                $localStorage.AdmReportData = {
                    CollegeCode: $scope.CollegeCode,
                    AcademicYear: $scope.AcademicYear,    
                    Category: JSON.stringify($scope.CategoryArray),
                    AdmissionType: JSON.stringify($scope.AdmissionTypeArray),
                    Scheme: JSON.stringify($scope.SchemeArray),
                    Handicaped: JSON.stringify($scope.HandicapedArray),
                    CollegeTypes: JSON.stringify($scope.CollegeTypesArray),
                    DataTypeId: DataTypeId,
                    DataFormatTypeId: DataFormatTypeId,
                    Sems: semid,
                    Branch: branchid
                }
               
                $state.go('Dashboard.AdmissionDashboard.AdmissionReportPinList')
            }

            $scope.DownloadtoExcel = function (tableid) {

                var exportHref = Excel.tableToExcel(tableid, 'stdentDetails');
                $timeout(function () {
                    var a = document.createElement('a');
                    a.href = exportHref;
                    a.remove();
                    a.download = "Admission_Branchwise_Counts.xls";
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
                    a.download = "Admission_Branch_Wise_Sub_Report.xls";
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
    });
})