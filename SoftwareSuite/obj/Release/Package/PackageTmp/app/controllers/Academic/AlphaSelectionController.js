define(['app'], function (app) {
    app.controller("AlphaSelectionController", function ($scope, $http, $localStorage, $state, $stateParams, AppSettings, $uibModal, AcademicService) {


        $scope.loading = false;
        $scope.Data = false;
        $scope.NoData = false;
        var authData = $localStorage.authorizationData;
       
        $scope.userName = authData.userName;
        $scope.CollegeCode = authData.College_Code;
        AppSettings.College_Name = authData.College_Name;
        $scope.College_Name = authData.College_Name;
        AppSettings.userName = authData.userName;
        $scope.BranchCode = 'C';
        var PaymentStudent = [];
        var PaymentStudentList = [];
    //    $scope.DataList = [{ "Id": "1", "Name": "Akhil1", "pin": "11222-EC-001", "IsAlpla": 1 },
    //    { "Id": "2", "Name": "Akhil2", "pin": "11222-EC-002", "IsAlpla": 0 },
    //    {"Id":"3","Name":"Akhil3","pin":"11222-EC-003","IsAlpla":0},
    //{ "Id": "3", "Name": "Akhil4", "pin": "11222-EC-004", "IsAlpla": 1 }]
    
        var getScheme = AcademicService.getScheme();
        getScheme.then(function (response) {
          
            $scope.GetSchemes = response.Table;

        },
            function (error) {
                alert("error while loading Report");

            });


       
        $scope.selectAll = function (val) {
            PaymentStudent = [];

            if (val == true) {
                for (var i = 0; i < $scope.DataList.length; i++) {

                    $scope.DataList[i].IsAlpla = true;
                    if ($scope.DataList[i].IsAlpla) {
                        dataPay = {};
                        dataPay.pin = $scope.DataList[i].pin;
                        dataPay.IsAlpla = $scope.DataList[i].IsAlpla;
                        PaymentStudent.push(dataPay);
                        PaymentStudentList.push($scope.DataList[i].pin);
                        PaymentStudentList.push($scope.DataList[i].IsAlpla);
                    }
                }

            } else {
                for (var i = 0; i < $scope.DataList.length; i++) {
                    $scope.DataList[i].IsAlpla = false;
                    PaymentStudent = [];
                    PaymentStudentList = [];
                }
            }
             
        };

        $scope.selectEntity = function (data, IsAlpla) {
            if (IsAlpla == true) {
                var IsAlpla = 1
            } else {
                IsAlpla == false
            }
            $scope.allItemsSelected = false;
            if (data != null) {
                if (!PaymentStudentList.includes(data.pin)) {
                    dataPay = {};
                    dataPay.pin = data.pin
                    dataPay.IsAlpla = IsAlpla
                    PaymentStudent.push(dataPay);
                    PaymentStudentList.push(data.pin);
                    PaymentStudentList.push(data.IsAlpla)

                }
                else if (PaymentStudentList.includes(data.pin)) {
                    PaymentStudentList.remByVal(data.pin);
                    PaymentStudentList.remByVal(data.IsAlpla);
                    PaymentStudent.remElementByVal(data.pin);
                    PaymentStudent.remElementByVal(data.IsAlpla);
                    if (PaymentStudentList.length == 0) {
                        $scope.allItemsSelected = false;
                    }
                }
              
            }
            console.log(PaymentStudent)
        }
        
        Array.prototype.remByVal = function (val) {
            for (var i = 0; i < this.length; i++) {
                if (this[i] === val) {
                    this.splice(i, 1);
                    break;
                }
            }
            return this;
        }

        Array.prototype.remElementByVal = function (val) {
            for (var i = 0; i < this.length; i++) {
                if (this[i].pin === val) {
                    this.splice(i, 1);
                    break;
                }
            }
            return this;
        }


        $scope.Submit = function () {
            $scope.loading = true;
            $scope.Data = false;
            $scope.NoData = false;
            var getSems = AcademicService.getAlphaStudentsList($scope.Scheme, $scope.Semester, $scope.CollegeCode, $scope.BranchCode);
            getSems.then(function (response) {
                if (response.length > 0) {
                    $scope.loading = false;
                    $scope.Data = true;
                    $scope.NoData = false;
                    $scope.GetAlphaStudentsList = response;
                    for (i = 0; i < $scope.GetAlphaStudentsList.length; i++) {
                        if ($scope.GetAlphaStudentsList[i].IsAlpla == 1) {
                            dataPay = {};
                            dataPay.pin = $scope.GetAlphaStudentsList[i].pin;
                            dataPay.IsAlpla = $scope.GetAlphaStudentsList[i].IsAlpla;
                            PaymentStudent.push(dataPay);
                            PaymentStudentList.push($scope.GetAlphaStudentsList[i].pin);
                            PaymentStudentList.push($scope.GetAlphaStudentsList[i].IsAlpla);
                        }
                    }

                } else {
                    $scope.loading = false;
                    $scope.Data = false;
                    $scope.NoData = true;
                    alert("Something Went Wrong");
                    $scope.GetAlphaStudentsList = [];
                }
            },
                function (error) {
                    $scope.loading = false;
                    $scope.Data = false;
                    $scope.NoData = true;
                    alert("Error While Loading Data");
                });
        }

        $scope.Save = function () {
            var getSems = AcademicService.SaveAlphaStudentList($scope.Scheme, $scope.Semester, $scope.CollegeCode, $scope.BranchCode,JSON.stringify(PaymentStudent));
            getSems.then(function (response) {
                if (response.Table[0].ResponceCode == '200') {
                    $scope.Submit();
                    alert(response.Table[0].ResponceDescription)
                } else {
                    alert('Data Saving Failed')
                }
                //$scope.GetSemesters = response;

            },
                function (error) {
                    alert("error Saving Data");

                });
        }
        2
        $scope.ChangeScheme = function () {
                        var getSems = AcademicService.getAcademicSemByScheme($scope.Scheme);
            getSems.then(function (response) {
                console.log(response)
                $scope.GetSemesters = response;

            },
                function (error) {
                    alert("error while loading Report");

                });
        }
    })
})