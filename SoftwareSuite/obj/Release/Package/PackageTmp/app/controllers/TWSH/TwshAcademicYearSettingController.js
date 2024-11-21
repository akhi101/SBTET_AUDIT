define(['app'], function (app) {
    app.controller("TwshAcademicYearSettingController", function ($scope, $localStorage, TwshAdminService, TwshStudentRegService) {

        var authData = $localStorage.authorizationData;
        $scope.UserName = authData.userName

        $scope.finalList = [];
        //console.log(authData)
        const $ctrl = this;
        $ctrl.$onInit = () => {
            $scope.GetData();
            //  $scope.disabletable();
        }

        $scope.disabletable = function () {
            var ele = document.getElementsByClassName("tableinpt");
            //ele.style.width = "100%";
            //ele.style['box-shadow'] = "none";
            //ele.style['pointer-events'] = "none";
            //ele.style.cursor = "pointer";


        }


        $scope.UpdateAcaYear = function (StartYear) {
            var tempyr = (parseInt(StartYear) + 1).toString();
            var yr = StartYear + '-' + tempyr.substring(2, 4);
            $scope.AcademicYear = yr;
        }

        $scope.GetData = function () {
            var GetMonthYear = TwshAdminService.GetTwshMonthYear()
            GetMonthYear.then(function (response) {

                if (response.length > 0) {
                    $scope.NoData = false;
                    $scope.GetExamMonthYear = response;

                    for (let i = 0; i < $scope.GetExamMonthYear.length; i++) {
                        if ($scope.GetExamMonthYear[i].IsCurrentAcademicYear == true) {
                            $scope.finalList.push($scope.GetExamMonthYear[i]);
                        }
                    }

                    //  var ele = document.getElementsByClassName("tableinpt");
                    for (var j = 1; j < response.length + 1; j++) {
                        $scope['edit' + j] = true;
                    }
                }
                else {
                    $scope.GetExamMonthYear = [];
                    $scope.NoData = true;
                }
            },
                function (error) {
                    alert("data is not loaded");
                    var err = JSON.parse(error);
                    console.log(err.Message);
                });


        }

        $scope.EditAcademicYear = function (data, ind) {
            var ele1 = document.getElementsByClassName("enabletable" + ind);
            for (var j = 0; j < ele1.length; j++) {
                ele1[j].style['pointer-events'] = "auto";
                ele1[j].style.border = "1px solid #ddd";
            }
            $scope['edit' + ind] = false;

        }


        $scope.SetAcademicYearStatus = function (Id, Status) {
            if (Status == true) {
                Status = 1
            } else {
                Status = 0
            }
            var SetStatus = TwshStudentRegService.SetAcademicYearStatus(Id, Status);
            SetStatus.then(function (res) {
                var res = JSON.parse(res)
                if (res.Table[0].ResponceCode == '400') {
                    alert(res.Table[0].ResponceDescription)

                    $scope.GetData();
                } else {
                    alert(res.Table[0].ResponceDescription)
                    $scope.GetData();

                    //$scope.clearDefaults();
                }

            },
                function (error) {

                    var err = JSON.parse(error);
                })


        }

        $scope.UpdateAcademicYear = function (dat, ind) {
            $scope['edit' + ind] = true;

            var ele2 = document.getElementsByClassName("enabletable" + ind);
            for (var j = 0; j < ele2.length; j++) {
                ele2[j].style['pointer-events'] = "none";
                ele2[j].style.border = "0";
            }

            if (dat.StartDate == null || dat.StartDate == undefined || dat.StartDate == "") {
                alert("Select Start Date");
                return;
            }
            if (dat.EndDate == null || dat.EndDate == undefined || dat.EndDate == "") {
                alert("Select End Date");
                return;
            }

            if (dat.IsCurrentAcademicYear == null || dat.IsCurrentAcademicYear == undefined || dat.IsCurrentAcademicYear == "") {
                alert("Select IsCurrentAcademicYear.");
                return;
            }
            var datatypeid = 2;
            var srtdate = dat.StartDate == undefined || dat.StartDate == null || dat.StartDate == "" ? " " : moment(dat.StartDate).format("YYYY-MM-DD");
            var enddate = dat.EndDate == undefined || dat.EndDate == null || dat.EndDate == "" ? " " : moment(dat.EndDate).format("YYYY-MM-DD");
            var updateaca = TwshAdminService.SetTwshAcademicYear(datatypeid, dat.AcademicYear, dat.AcademicStartYear, srtdate, enddate, $scope.UserName, dat.IsCurrentAcademicYear, parseInt(dat.AcademicID), 1)
            updateaca.then(function (response) {
                var response = JSON.parse(response)
                if (response[0].ResponceCode == '200') {
                    alert(response[0].ResponceDescription)
                    $scope.GetData();
                } else {
                    alert('Something Went Wrong')
                }
            },
                function (error) {
                    alert("something Went Wrong")


                });

        }
        Array.prototype.remByVal = function (val) {
            for (var i = 0; i < this.length; i++) {
                if (this[i].ElectiveSet === val) {
                    this.splice(i, 1);
                    break;
                }
            }
            return this;
        }

        $scope.changeActive = function (data, active, index) {
            for (let i = 0; i < $scope.finalList.length; i++) {
                if ($scope.finalList[i].IsCurrentAcademicYear == data.IsCurrentAcademicYear) {
                    $scope.finalList.remByVal(data.IsCurrentAcademicYear);
                    break;
                }
            }
            $scope.finalList.push(data);

            for (let i = 0; i < $scope.GetExamMonthYear.length; i++) {
                if ($scope.GetExamMonthYear[i].IsCurrentAcademicYear == data.IsCurrentAcademicYear) {
                    if (i != index) {
                        $scope.GetExamMonthYear[i].IsCurrentAcademicYear = false;
                    }
                }
            }
            console.log($scope.finalList);
        }

        $scope.Submit = function () {

            var datatypeid = 1
            if ($scope.StartYear == null || $scope.StartYear == undefined || $scope.StartYear == "") {
                alert("Select Start of Academic Year");
                return;
            }
            if ($scope.StartDate == null || $scope.StartDate == undefined || $scope.StartDate == "") {
                alert("Select Start Date");
                return;
            }
            if ($scope.EndDate == null || $scope.EndDate == undefined || $scope.EndDate == "") {
                alert("Select End Date");
                return;
            }
            var SetUserType = TwshAdminService.SetTwshAcademicYear(datatypeid, $scope.AcademicYear, $scope.StartYear, moment($scope.StartDate).format("YYYY-MM-DD"), moment($scope.EndDate).format("YYYY-MM-DD"), $scope.UserName, true, 0, 0)
            SetUserType.then(function (response) {
                var response = JSON.parse(response)
                if (response[0].ResponceCode == '200') {
                    alert(response[0].ResponceDescription)
                    $scope.GetData();
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