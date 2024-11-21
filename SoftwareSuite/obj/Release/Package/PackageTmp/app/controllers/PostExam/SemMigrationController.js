define(['app'], function (app) {
    app.controller("SemMigrationController", function ($scope, $http, $localStorage, $state, $location, $window, $stateParams, AppSettings, PreExaminationService) {

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

        //var getSemesters = PreExaminationService.getAllSemester();
        //getSemesters.then(function (res) {
        //    //var res = JSON.parse(res);
        //    $scope.GetSemesters = res.Table;
        //    $scope.isAllSelectedsem = true;
        //    var toggleStatus = $scope.isAllSelectedsem;
        //    angular.forEach($scope.GetSemesters, function (itm) { itm.selected = toggleStatus; });
        //    $scope.semarr = [];
        //    angular.forEach($scope.GetSemesters, function (value, key) {
        //        if (value.selected === true) {
        //            $scope.semarr.push({ "semid": value.semid })
        //        }
        //    });
        //}, function (err) {
        //    $scope.LoadImg = false;
        //    alert("Error while loading");
        //});

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
                    $scope.semarr.push({ "semid": value.FromSemid })
                }
            });
        }

        $scope.optionToggledsem = function () {
            $scope.isAllSelectedsem = $scope.GetSemesters.every(function (itm) { return itm.selected; })
            $scope.semarr = [];
            angular.forEach($scope.GetSemesters, function (value, key) {
                if (value.selected === true) {
                    $scope.semarr.push({ "semid": value.FromSemid })
                }
            });
        }

        //----------------------Sem Multi Select End--------------------------------//


        $scope.SemTransfer = function () {
            var checkboxes = document.getElementById("checkboxessem");
            checkboxes.style.display = "none";
            semexpand = false;
            var loadData = PreExaminationService.SetSemTransfer($scope.AcademicYear, JSON.stringify($scope.semarr))
            loadData.then(function (res) {
                var response = JSON.parse(res)
               
                if (response.Table[0].ResponceCode == '200') {
                    alert(response.Table[0].ResponceDescription)
                    $scope.loading = false;
                    $scope.Data = true;
                    $scope.Noresult = false;
                } else if (response.Table[0].ResponseCode == '400') {
                    $scope.loading = false;
                    $scope.Data = false;
                    $scope.Noresult = false;
                    $scope.Error = true;
                    $scope.ErrMsg = response.Table[0].ResponseDescription;
                    alert($scope.ErrMsg)
                } else {
                    $scope.loading = false;
                    $scope.Data = false
                    alert("No Data Found");
                    $scope.Noresult = true;


                }
            },
                function (error) {
                    $scope.loading = false;
                    $scope.Data = false;
                    $scope.Noresult = true;

                    alert("error while loading Semesters");
                    var err = JSON.parse(error);
                    console.log(err.Message);
                });
        }

        $scope.Submit = function () {
            $scope.loading = true;
            $scope.Data = false;
            $scope.Noresult = false;
           
            var loadData2 = PreExaminationService.GetMigrationDetails($scope.AcademicYear)
            loadData2.then(function (res) {
                var response = JSON.parse(res)
                if (response.Table.length>0) {
                    $scope.loading = false;
                    $scope.Data = true;
                    $scope.MigrationData = response.Table;
                    $scope.GetSemesters = response.Table1;
                    for (var j = 1; j < response.Table.length + 1; j++) {
                        $scope['edit' + j] = true;
                    }
                    $scope.isAllSelectedsem = true;
                        var toggleStatus = $scope.isAllSelectedsem;
                        angular.forEach($scope.GetSemesters, function (itm) { itm.selected = toggleStatus; });
                        $scope.semarr = [];
                        angular.forEach($scope.GetSemesters, function (value, key) {
                            if (value.selected === true) {
                                $scope.semarr.push({ "semid": value.FromSemid })
                            }
                        });
                   e.Noresult = false;
                } else if (response.Table[0].ResponseCode == '400') {
                    $scope.loading = false;
                    $scope.Data = false;
                    $scope.Noresult = false;
                    $scope.Error = true;
                    $scope.ErrMsg = response.Table[0].ResponseDescription;
                    alert($scope.ErrMsg)
                } else {
                    $scope.loading = false;
                    $scope.Data = false
                    alert("No Data Found");
                    $scope.Noresult = true;
                  

                }
            },
                function (error) {
                    $scope.loading = false;
                    $scope.Data = false;
                    $scope.Noresult = true;
                  
                    alert("error while loading Semesters");
                    var err = JSON.parse(error);
                    console.log(err.Message);
                });
        }

        //$scope.ShowSems = function () {
        //    $scope.SemesterDetails = true;
        //}

        $scope.Editsemesterdat = function (data, ind) {

            var ele1 = document.getElementsByClassName("enabletable" + ind);
            for (var j = 0; j < ele1.length; j++) {
                ele1[j].style['pointer-events'] = "auto";
                ele1[j].style.border = "1px solid #ddd";
                ele1[j].style['-webkit-appearance'] = "auto";
                ele1[j].style['-moz-appearance'] = "auto";
            }
            $scope['edit' + ind] = false;

        }

        $scope.Updatesemesterdat = function (data, ind) {
            $scope['edit' + ind] = true;

            var ele2 = document.getElementsByClassName("enabletable" + ind);
            for (var j = 0; j < ele2.length; j++) {
                ele2[j].style['pointer-events'] = "none";
                ele2[j].style.border = "0";
                ele2[j].style['-webkit-appearance'] = "none";
                ele2[j].style['-moz-appearance'] = "none";
            }

            var OdcDetails = PreExaminationService.UpdateMigrationData(data.AcademicYearId, data.CummulativeCredits, data.Id)
            OdcDetails.then(function (response) {
                try { var response = JSON.parse(response) } catch (err) { }
                if (response.Table[0].ResponceCode == '200') {
                    alert(response.Table[0].ResponceDescription);

                } else {
                    alert('Something Went Wrong')

                }
            },
                function (error) {
                    alert("something Went Wrong")


                });
        }
    })
})