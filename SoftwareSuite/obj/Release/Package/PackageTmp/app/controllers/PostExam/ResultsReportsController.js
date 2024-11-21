define(['app'], function (app) {
    app.controller("ResultsReportsController", function ($scope, $http, $localStorage, $state, $stateParams, AppSettings, $uibModal, $timeout, PreExaminationService, StudentResultService, StudentRegService) {

        var authData = $localStorage.authorizationData;
        $scope.Scheme ='C18'
        if (authData == undefined) {
            $state.go('login');
        } else {

            $scope.UserId = authData.SysUserID;
        }
        $scope.loading = false;


        $scope.UserTypeId = authData.SystemUserTypeId;
        if ($scope.UserTypeId == 1) {

            var localData = $localStorage.AdmReportData

            //$scope.CollegeCode = localData.CollegeCode

        } else {
            $scope.CollegeCode = authData.College_Code;
            $scope.CollegeName = authData.College_Name;
        }
        $scope.CollegeType = authData.CollegeType;
        $scope.BranchId = authData.BranchId

        var SCHEMESEMINFO = StudentResultService.GetSchemeDataForResults();
        SCHEMESEMINFO.then(function (data) {
            if (data.length > 0) {

                $scope.schemeinfo = data;

            }
        }, function (error) {
            alert("unable to load Schemes");
        });

        var GetCollegeList = StudentRegService.GetColleges();
        GetCollegeList.then(function (data) {
            if (data.Table.length > 0) {
                $scope.GetCollegeList = data.Table;

            } else {
                alert("Colleges not found.");
                $scope.GetCollegeList = [];
            }

        }, function (error) {
            console.log(error);
            $scope.GetCollegeList = [];
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


        var GetBranchList = StudentRegService.getActiveBranches();
        GetBranchList.then(function (data) {
            if (data.Table.length > 0) {
                $scope.GetBranchs = data.Table

            } else {
                alert("Branches details not found.");
                $scope.GetBranchs = [];
            }

        }, function (error) {
            console.log(error);
            $scope.GetBranchs = [];
        });

        var GetSemesters = PreExaminationService.GetSemesters();
        GetSemesters.then(function (data) {
            console.log(data)
            if (data.Table.length > 0) {
                $scope.GetSemesters = data.Table;
            } else {
                alert("Branches details not found.");
                $scope.GetSemesters = [];
            }

        }, function (error) {
            console.log(error);
            $scope.GetSemesters = [];
        });

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
                    $scope.BranchArray.push({ "branchid": value.CourseId })
                }
            });

        }

        $scope.optionToggledBranch = function () {
            $scope.isAllSelectedBranch = $scope.GetBranchs.every(function (itm) { return itm.selected; })
            $scope.BranchArray = [];
            angular.forEach($scope.GetBranchs, function (value, key) {
                if (value.selected === true) {
                    $scope.BranchArray.push({ "branchid": value.CourseId })
                }
            });

        }

        //----------------------Branch Multi Select End--------------------------------//

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
                    $scope.semarr.push({ "semid": value.SemId })
                }
            });
        }

        $scope.optionToggledsem = function () {
            $scope.isAllSelectedsem = $scope.GetSemesters.every(function (itm) { return itm.selected; })
            $scope.semarr = [];
            angular.forEach($scope.GetSemesters, function (value, key) {
                if (value.selected === true) {
                    $scope.semarr.push({ "semid": value.SemId })
                }
            });
            console.log($scope.semarr)
        }

        //----------------------Sem Multi Select End--------------------------------//

        //----------------------College Multi Select Start--------------------------------//
        var CollegeExpand = false;
        $scope.showCollegeCheckboxes = function () {
            var checkboxes = document.getElementById("checkboxesCollege");
            if (!CollegeExpand) {
                checkboxes.style.display = "block";
                checkboxes.style.position = "absolute";
                checkboxes.style.width = "92%";
                checkboxes.style.backgroundColor = "white";
                checkboxes.style['z-index'] = 99;
                CollegeExpand = true;
            } else {
                checkboxes.style.display = "none";
                CollegeExpand = false;
            }
        }

        $scope.closeCollegeCheckbox = function () {
            var checkboxes = document.getElementById("checkboxesCollege");
            if (!CollegeExpand) {
                checkboxes.style.display = "block";
                checkboxes.style.position = "absolute";
                checkboxes.style.width = "92%";
                checkboxes.style.backgroundColor = "white";
                CollegeExpand = true;
            } else {
                checkboxes.style.display = "none";
                CollegeExpand = false;
            }
        }

        $scope.toggleAllCollege = function () {
            var toggleStatus = $scope.isAllSelectedCollege
            angular.forEach($scope.GetCollegeList, function (itm) { itm.selected = toggleStatus; });
            $scope.CollegeArray = [];
            angular.forEach($scope.GetCollegeList, function (value, key) {
                if (value.selected === true) {
                    $scope.CollegeArray.push({ "collegecode": value.CollegeCode })
                }
            });

        }

        $scope.optionToggledCollege = function () {
            $scope.isAllSelectedCollege = $scope.GetCollegeList.every(function (itm) { return itm.selected; })
            $scope.CollegeArray = [];
            angular.forEach($scope.GetCollegeList, function (value, key) {
                if (value.selected === true) {
                    $scope.CollegeArray.push({ "collegecode": value.CollegeCode })
                }
            });

        }

        //----------------------College Multi Select End--------------------------------//

        var GetSemesters = PreExaminationService.GetSemesters();
        GetSemesters.then(function (data) {
            console.log(data)
            if (data.Table.length > 0) {
                $scope.GetSemesters = data.Table;
            } else {
                alert("Branches details not found.");
                $scope.GetSemesters = [];
            }

        }, function (error) {
            console.log(error);
            $scope.GetSemesters = [];
        });


        var getSchemes = PreExaminationService.getSchemes();
        getSchemes.then(function (data) {
            console.log(data)
            if (data.Table.length > 0) {
                $scope.getSchemes = data.Table;
            } else {
                alert("Schemes not found.");
                $scope.getSchemes = [];
            }

        }, function (error) {
            console.log(error);
            $scope.getSchemes = [];
        });


        //$scope.ChangeCollege = function () {
        //    var Branch = PreExaminationService.getBranchsByCollegeCode($scope.College);
        //    Branch.then(function (response) {
        //        var response = JSON.parse(response);
        //        if (response.Table.length > 0) {
        //            $scope.GetBranchs = response.Table;
        //        } else {
        //            $scope.GetBranchs = [];
        //            alert("No Student found on this Record");
        //        }
        //    },
        //        function (error) {
        //            alert("error while loading Branchs");
        //            console.log(error);
        //        });
        //}

        $scope.Submit = function (scheme) {
            if ($scope.UserTypeId == 2) {
                $scope.CollegeArray = [];
                var obj = { "collegecode": $scope.CollegeCode }
                $scope.CollegeArray.push(obj)
            } else if ($scope.UserTypeId == 3) {
                $scope.CollegeArray = [];
                $scope.BranchArray = [];
                var obj = { "collegecode": $scope.CollegeCode }
                $scope.CollegeArray.push(obj)
                var obj1 = { "branchid": $scope.BranchId }
                $scope.BranchArray.push(obj1)
            }
            $scope.loading = true;
            $scope.Noresult = false
            var loadData1 = PreExaminationService.GetResultsReports($scope.Scheme, JSON.stringify($scope.semarr), JSON.stringify($scope.BranchArray), JSON.stringify($scope.CollegeArray))
            loadData1.then(function (res) {
                var data = JSON.parse(res)
                if (data[0].ResponceCode == '200') {
                    $scope.Noresult = false
                    $scope.loading = false;
                    var location = data[0].file;
                    console.log(location)
                    console.log(window.location.href)
                    window.location.href = location;

                } else
                    if (data[0].ResponceCode == '400') {
                        $scope.Noresult = true
                        $scope.loading = false;
                        alert(data[0].ResponceDescription);
                    }
                    else {
                        $scope.Noresult = true
                        $scope.loading = false;
                        alert('Something Went Wrong')
                    }

            }, function (error) {
                $scope.Noresult = true
                $scope.loading = false;
            });
        }

    })
})