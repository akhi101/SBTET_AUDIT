define(['app'], function (app) {
    app.controller("CommonAllowancesController", function ($scope, $http, $localStorage, $state, AppSettings, SystemUserService, PayRollService) {
        const $ctrl = this;
        $scope.Values = [{ "id": 1, "name": "Yes" }, { "id": 0, "name": "No" }]
        $ctrl.$onInit = () => {
            var authData = $localStorage.authorizationData;
            $scope.UserName = authData.userName;

            //$scope.getEditAllowance();

        }
        var DataTypeID = 1
        var getdesign = PayRollService.GetDepartmentData(DataTypeID, 0, 0);
        getdesign.then(function (response) {

            try {
                var res = JSON.parse(response);
            }
            catch (err) { }
            //$scope.edit = true;
            if (res.Table.length > 0) {
                $scope.DepartmentData = res.Table;
                $scope.Noreports = false;



            }
            else {
                $scope.DepartmentData = [];
                $scope.Noreports = true;
            }


        },

            function (error) {
                alert("error while loading Department");
                var err = JSON.parse(error);

            });

        $scope.ChangeDepartment = function (data) {
            if (data.DepartmentID == 1) {
                $scope.DepartmentID = data.DepartmentID;
                $scope.showDaGazetted = true;
                $scope.showHRA = true;
                $scope.showDABS = false;
                $scope.showIR = false;

                $scope.DA_BoardStaff = '';
                $scope.IR = '';
                $scope.HRA = '';
                $scope.getEditAllowance();
            }
            else if (data.DepartmentID == 2) {
                $scope.DepartmentID = data.DepartmentID;
                $scope.showDaGazetted = false;
                $scope.showDABS = true;
                $scope.showIR = true;
                $scope.showHRA = true;

                $scope.DA_Gazetted = '';
                $scope.HRA = '';
                $scope.getEditAllowance();
            }
        
            else if (data.DepartmentID == 3) {
            $scope.DepartmentID = data.DepartmentID;
            $scope.showDaGazetted = false;
            $scope.showDABS = true;
            $scope.showIR = true;
            $scope.showHRA = true;

            $scope.DA_Gazetted = '';
            $scope.HRA = '';
            $scope.getEditAllowance();
        }
        }


        $scope.getEditAllowance = function () {
            var DataTypeID = 1
            var getdesign = PayRollService.GetEditAllowance(DataTypeID, $scope.AllowanceID, $scope.DepartmentID, 0);
            getdesign.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }
                //$scope.edit = true;
                if (res.Table.length > 0) {
                    $scope.AllowanceData = res.Table;
                    $scope.DataNotFound = false;
                    for (var j = 1; j < $scope.AllowanceData.length + 1; j++) {
                        $scope['edit' + j] = true;
                    }
                }
                else {
                    $scope.AllowanceData = [];
                    $scope.DataNotFound = true;
                }
            },
                function (error) {
                    alert("error while loading Employee Details");
                    var err = JSON.parse(error);

                });



        }

        $scope.ClearData = function () {
            $scope.Department = null;
            $scope.IR = "";
            $scope.DA_Gazetted = "";
            $scope.DA_BoardStaff = "";
            $scope.HRA = "";
            $scope.AddDetails = '1';
            $scope.UpdateDetails = '0';

        }

        $scope.ADDAllowance = function () {
            var datatypeid = 1
            
            if ($scope.DepartmentID == null || $scope.DepartmentID == undefined || $scope.DepartmentID == "") {
                alert("Please Enter Department");
                return;
            }

            if ($scope.DepartmentID == 1) {
                if ($scope.DA_Gazetted == null || $scope.DA_Gazetted == undefined || $scope.DA_Gazetted == "") {
                    alert("Enter DA_Gazetted");
                    return;
                }
                if ($scope.HRA == null || $scope.HRA == undefined || $scope.HRA == "") {
                    alert("Enter HRA");
                    return;
                }
            }
            else if ($scope.DepartmentID == 2){

                if ($scope.DA_BoardStaff == null || $scope.DA_BoardStaff == undefined || $scope.DA_BoardStaff == "") {
                    alert("Enter DA_BoardStaff");
                    return;
                }

                if ($scope.HRA == null || $scope.HRA == undefined || $scope.HRA == "") {
                    alert("Enter HRA");
                    return;
                }
                if ($scope.IR == null || $scope.IR == undefined || $scope.IR == "") {
                    alert("Enter IR");
                    return;
                }
            }

         
            let IR = ($scope.IR == null || $scope.IR == undefined || $scope.IR == "") ? 0 : $scope.IR;
            let DA_Gazetted = ($scope.DA_Gazetted == null || $scope.DA_Gazetted == undefined || $scope.DA_Gazetted == "") ? 0 : $scope.DA_Gazetted;
            let DA_BoardStaff = ($scope.DA_BoardStaff == null || $scope.DA_BoardStaff == undefined || $scope.DA_BoardStaff == "") ? 0 : $scope.DA_BoardStaff;
            let HRA = ($scope.HRA == null || $scope.HRA == undefined || $scope.HRA == "") ? 0 : $scope.HRA;

            if (DA_Gazetted > 0) {
                var addAllowance = PayRollService.AddorUpdateAllowance(datatypeid, null, $scope.DepartmentID, DA_Gazetted, HRA, IR, $scope.UserName)
                addAllowance.then(function (response) {
                    try {
                        var res = JSON.parse(response);
                    } catch (err) { }
                    if (res[0].ResponseCode == '200') {
                        alert(res[0].ResponseDescription);
                        $scope.ClearData();
                        $scope.getEditAllowance();

                    }
                    else if (res[0].ResponseCode == '400') {
                        alert(res[0].ResponseDescription);
                        $scope.getEditAllowance();

                    } else {
                        alert('Something Went Wrong')

                    }
                },
                    function (error) {
                        alert("something Went Wrong")


                    });
            }
            else if (DA_BoardStaff > 0) {
                var addAllowance = PayRollService.AddorUpdateAllowance(datatypeid, null, $scope.DepartmentID, DA_BoardStaff, HRA, IR, $scope.UserName)
                addAllowance.then(function (response) {
                    try {
                        var res = JSON.parse(response);
                    } catch (err) { }
                    if (res[0].ResponseCode == '200') {
                        alert(res[0].ResponseDescription);
                        $scope.ClearData();
                        $scope.getEditAllowance();

                    }
                    else if (res[0].ResponseCode == '400') {
                        alert(res[0].ResponseDescription);
                        $scope.getEditAllowance();

                    } else {
                        alert('Something Went Wrong')

                    }
                },
                    function (error) {
                        alert("something Went Wrong")


                    });

            }
           
        }



        $scope.EditAllowance = function (data, ind) {

            var ele1 = document.getElementsByClassName("enabletable" + ind);
            for (var j = 0; j < ele1.length; j++) {
                ele1[j].style['pointer-events'] = "auto";
                ele1[j].style.border = "1px solid #ddd";
            }
            $scope['edit' + ind] = false;

            if (data.IR == 0) {
                $scope.disableir = true;
            }
            else {
                $scope.disableir = false;

            }

        }

        $scope.UpdateAllowance = function (data) {
            var datatypeid = 2


            var AddDepartment = PayRollService.AddorUpdateAllowance(datatypeid, data.AllowanceID, data.DepartmentID, data.DA, data.HRA, data.IR, $scope.UserName)
            AddDepartment.then(function (response) {
                try {
                    var res = JSON.parse(response);
                } catch (err) { }
                if (res[0].StatusCode == '200') {
                    alert(res[0].StatusDescription);
                    $scope.ClearData();
                    $scope.getEditAllowance()

                }
                else if (res[0].StatusCode == '400') {
                    alert(res[0].StatusDescription);
                    $scope.ClearData();
                    $scope.getEditAllowance()

                } else {
                    alert('Something Went Wrong')

                }
            },
                function (error) {
                    alert("something Went Wrong")


                });
        }

     

        $scope.ChangeAllowance = function (AllowanceID, DepartmentID, Status) {
            var DataType = 3;
            var getSlides = PayRollService.PayRollAllowance(DataType, AllowanceID,DepartmentID, Status);
            getSlides.then(function (res) {
                var response = JSON.parse(res)
                if (response.Table[0].ResponseCode == '200') {
                    alert(response.Table[0].ResponseDescription)
                    $scope.getEditAllowance();
                } else if (response.Table[0].ResponseCode == '400') {
                    alert(response.Table[0].ResponseDescription)
                    $scope.getEditAllowance();
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