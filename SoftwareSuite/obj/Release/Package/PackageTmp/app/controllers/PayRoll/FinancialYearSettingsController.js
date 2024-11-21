define(['app'], function (app) {
    app.controller("FinancialYearSettingsController", function ($scope,  $localStorage, PayRollService) {

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


        $scope.UpdateFinYear = function (StartYear) {
            var tempyr = (parseInt(StartYear) + 1).toString();
            var yr = StartYear + '-' + tempyr.substring(2, 4);
            $scope.FinancialYear = yr;
        }

        $scope.GetData = function () {
            let datatype=1
            var finyr = PayRollService.GetFinancialYearData(datatype,0,0)
            finyr.then(function (response) {
                var res = JSON.parse(response)
                $scope.FinancialYearData = res.Table;

                for (var j = 1; j < $scope.FinancialYearData.length + 1; j++) {
                    $scope['edit' + j] = true;
                }
            },
                function (error) {
                    alert("data is not loaded");
                    var err = JSON.parse(error);
                    console.log(err.Message);
                });

        }

        $scope.EditFinancialYear = function (data, ind) {
            var ele1 = document.getElementsByClassName("enabletable" + ind);
            for (var j = 0; j < ele1.length; j++) {
                ele1[j].style['pointer-events'] = "auto";
                ele1[j].style.border = "1px solid #ddd";
            }
            $scope['edit' + ind] = false;

        }

        $scope.ClearData = function () {
            $scope.StartYear = "";
            $scope.FinancialYear = "";



        }
        $scope.UpdateFinancialYear = function (dat, ind) {
            $scope['edit' + ind] = true;

            var ele2 = document.getElementsByClassName("enabletable" + ind);
            for (var j = 0; j < ele2.length; j++) {
                ele2[j].style['pointer-events'] = "none";
                ele2[j].style.border = "0";
            }

            var datatypeid = 2;
            var updatefin = PayRollService.UpdateFinancialYear(datatypeid,dat.FinancialYearId, dat.FinancialStartYear, dat.FinancialYear, $scope.UserName, 1)
            updatefin.then(function (response) {
                var response = JSON.parse(response)
                if (response[0].StatusCode == '200') {
                    alert(response[0].StatusDescription)
                    $scope.GetData();
                    $scope.ClearData();

                } else {
                    alert('Something Went Wrong')
                    $scope.ClearData();

                }
            },
                function (error) {
                    alert("something Went Wrong")
                    $scope.ClearData();


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

        

        $scope.Submit = function () {

            var datatypeid = 1
            if ($scope.FinancialYear == null || $scope.FinancialYear == undefined || $scope.FinancialYear == "") {
                alert("Select Financial Year");
                return;
            }
            
            var SetFinYr = PayRollService.AddFinancialYear(datatypeid,0,$scope.StartYear,$scope.FinancialYear, 1,$scope.UserName)
            SetFinYr.then(function (response) {
                var response = JSON.parse(response)
                if (response[0].ResponseCode == '200') {
                    alert(response[0].ResponseDescription)
                    $scope.GetData();
                    $scope.ClearData();

                } else {
                    alert('Something Went Wrong')
                    $scope.ClearData();

                }
            },
                function (error) {
                    alert("something Went Wrong")
                    $scope.ClearData();


                });
        }

        $scope.ChangeStatus = function (FinancialYearId, Status) {
            var DataType = 3;
            var getSlides = PayRollService.ChangeFinancialStatus(DataType, FinancialYearId, Status);
            getSlides.then(function (response) {
                var response = JSON.parse(response)
                
                if (response.Table[0].ResponseCode == '200') {
                    alert(response.Table[0].ResponseDescription)
                    $scope.GetData();
                } else if (response.Table[0].ResponseCode == '400') {
                    alert(response.Table[0].ResponseDescription)
                    $scope.GetData();
                } else {
                    alert("Something Went Wrong")
                }
            },
                function (error) {

                    alert("error while loading Slides");
                    //alert("error while loading Notification");

                    var err = JSON.parse(error);
                });
        }

    })
})