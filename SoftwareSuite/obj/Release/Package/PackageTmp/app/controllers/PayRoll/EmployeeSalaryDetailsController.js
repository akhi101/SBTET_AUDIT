define(['app'], function (app) {
    app.controller("EmployeeSalaryDetailsController", function ($scope, $localStorage, PayRollService) {
        var authData = $localStorage.authorizationData;
        $scope.UserName = authData.userName;


        const $ctrl = this;
        $ctrl.$onInit = () => {
            window.scroll({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
            //$scope.getsalarydata();

            $scope.AddDetails = '1';
            $scope.UpdateDetails = '0';
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

        $scope.getEmployeeDetailsData = function () {
        var DataTypeID = 1
        var getdesign = PayRollService.GetEmployeeDetailsData(DataTypeID, 0, $scope.DepartmentID, 0);
        getdesign.then(function (response) {

            try {
                var res = JSON.parse(response);
            }
            catch (err) { }

            //$scope.edit = true;
            if (res.Table.length > 0) {
                $scope.EmployeeDetailsData = res.Table;
                $scope.Noreports = false;



            }
            else {
                $scope.EmployeeDetailsData = [];
                $scope.Noreports = true;
            }


        },

            function (error) {
                alert("error while loading Employee Details");
                var err = JSON.parse(error);

            });
    
        }
        $scope.ClearData = function () {
            $scope.EmployeeID = null;
            $scope.EmployeeID = null;
            $scope.CurrentBasicAmount = "";
            $scope.InterimRelief = null;
            $scope.CCA = "";
            $scope.PP = "";
            $scope.FPI = "";
            $scope.TG_Increment = "";
            $scope.ConveyanceAllowance = "";
            $scope.Medical = "";
            $scope.NCI = null;
            $scope.NCIAmount = "";
            $scope.AddDetails = '1';
            $scope.UpdateDetails = '0';

        }

        $scope.Add = function () {

            var datatypeid = 1


            if ($scope.EmployeeID == null || $scope.EmployeeID == undefined || $scope.EmployeeID == "") {
                alert("Please Enter EmployeeName");
                return;
            }
            
            
            


            if ($scope.DepartmentID == 1) {
                if ($scope.CurrentBasicAmount == null || $scope.CurrentBasicAmount == undefined || $scope.CurrentBasicAmount == "") {
                    alert("Enter Current Basic Amount");
                    return;
                }
                if ($scope.PP == null || $scope.PP == undefined || $scope.PP == "") {
                    alert("Select PP");
                    return;
                }
                if ($scope.FPI == null || $scope.FPI == undefined || $scope.FPI == "") {
                    alert("Select FPI");
                    return;
                }
                if ($scope.TG_Increment == null || $scope.TG_Increment == undefined || $scope.TG_Increment == "") {
                    alert("Select TGIncrement");
                    return;
                }
                if ($scope.Medical == null || $scope.Medical == undefined || $scope.Medical == "") {
                    alert("Select Medical");
                    return;
                }
                if ($scope.NCI == null || $scope.NCI == undefined || $scope.NCI == "") {
                    alert("Select NCI");
                    return;
                }
            }
            else if ($scope.DepartmentID == 2) {

                if ($scope.CurrentBasicAmount == null || $scope.CurrentBasicAmount == undefined || $scope.CurrentBasicAmount == "") {
                    alert("Enter Current Basic Amount");
                    return;
                }
                if ($scope.PP == null || $scope.PP == undefined || $scope.PP == "") {
                    alert("Select PP");
                    return;
                }
                if ($scope.FPI == null || $scope.FPI == undefined || $scope.FPI == "") {
                    alert("Select FPI");
                    return;
                }
                if ($scope.TG_Increment == null || $scope.TG_Increment == undefined || $scope.TG_Increment == "") {
                    alert("Select TGIncrement");
                    return;
                }
                if ($scope.Medical == null || $scope.Medical == undefined || $scope.Medical == "") {
                    alert("Select Medical");
                    return;
                }
                if ($scope.InterimRelief == null || $scope.InterimRelief == undefined || $scope.InterimRelief == "") {
                    alert("Select InterimRelief");
                    return;
                }
                if ($scope.CCA == null || $scope.CCA == undefined || $scope.CCA == "") {
                    alert("Select CCA");
                    return;
                }


                if ($scope.ConveyanceAllowance == null || $scope.ConveyanceAllowance == undefined || $scope.ConveyanceAllowance == "") {
                    alert("Select Conveyance Allowance");
                    return;
                }

            }

            else if ($scope.DepartmentID == 3) {

                if ($scope.CurrentBasicAmount == null || $scope.CurrentBasicAmount == undefined || $scope.CurrentBasicAmount == "") {
                    alert("Enter Current Basic Amount");
                    return;
                }
                if ($scope.PP == null || $scope.PP == undefined || $scope.PP == "") {
                    alert("Select PP");
                    return;
                }
                if ($scope.FPI == null || $scope.FPI == undefined || $scope.FPI == "") {
                    alert("Select FPI");
                    return;
                }
                if ($scope.TG_Increment == null || $scope.TG_Increment == undefined || $scope.TG_Increment == "") {
                    alert("Select TGIncrement");
                    return;
                }
                if ($scope.Medical == null || $scope.Medical == undefined || $scope.Medical == "") {
                    alert("Select Medical");
                    return;
                }
                
                if ($scope.InterimRelief == null || $scope.InterimRelief == undefined || $scope.InterimRelief == "") {
                    alert("Select InterimRelief");
                    return;
                }
                if ($scope.CCA == null || $scope.CCA == undefined || $scope.CCA == "") {
                    alert("Select CCA");
                    return;
                }


                if ($scope.ConveyanceAllowance == null || $scope.ConveyanceAllowance == undefined || $scope.ConveyanceAllowance == "") {
                    alert("Select Conveyance Allowance");
                    return;
                }

            }

            let InterimRelief = ($scope.InterimRelief == null || $scope.InterimRelief == undefined || $scope.InterimRelief == "") ? 0 : $scope.InterimRelief;
            let NCI = ($scope.NCI == null || $scope.NCI == undefined || $scope.NCI == "") ? 0 : $scope.NCI;
            let CCA = ($scope.CCA == null || $scope.CCA == undefined || $scope.CCA == "") ? 0 : $scope.CCA;
            let ConveyanceAllowance = ($scope.ConveyanceAllowance == null || $scope.ConveyanceAllowance == undefined || $scope.ConveyanceAllowance == "") ? 0 : $scope.ConveyanceAllowance;

            var AddSalary = PayRollService.AddSalary(datatypeid, 0, $scope.DepartmentID, $scope.EmployeeID, $scope.CurrentBasicAmount, InterimRelief, CCA, $scope.PP, $scope.FPI, $scope.TG_Increment, ConveyanceAllowance, $scope.Medical, NCI, $scope.NCIAmount,$scope.UserName)
            AddSalary.then(function (response) {
                try {
                    var res = JSON.parse(response);
                } catch (err) { }
                if (res[0].ResponseCode == '200') {
                    alert(res[0].ResponseDescription);
                    $scope.ClearData();
                    $scope.getsalarydata($scope.DepartmentID);

                }
                else if (res[0].ResponseCode == '400') {
                    alert(res[0].ResponseDescription);
                    $scope.getsalarydata($scope.DepartmentID);

                } else {
                    alert('Something Went Wrong')

                }
            },
                function (error) {
                    alert("something Went Wrong")


                });
        }





        $scope.getsalarydata = function () {
            var DataTypeID = 1
            var getdesign = PayRollService.GetSalaryData(DataTypeID,0,$scope.DepartmentID,0, 0);
            getdesign.then(function (response) {

                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }
                //$scope.edit = true;
                if (res.Table.length > 0) {
                    $scope.SalaryData = res.Table;

                    $scope.Noreports = false;



                }
                else {
                    $scope.SalaryData = [];
                    $scope.Noreports = true;
                }


            },

                function (error) {
                    alert("error while loading Department");
                    var err = JSON.parse(error);

                });
        }



       


        $scope.UPDATE = function () {
            
            var datatypeid = 2;

            var sal = PayRollService.UpdateSalary(datatypeid, $scope.EmployeeSalaryDetailsID, $scope.DepartmentID, $scope.EmployeeID, $scope.CurrentBasicAmount, $scope.InterimRelief, $scope.CCA, $scope.PP, $scope.FPI, $scope.TG_Increment, $scope.ConveyanceAllowance, $scope.Medical, $scope.NCI, $scope.NCIAmount,$scope.UserName)
            sal.then(function (response) {
                try { var response = JSON.parse(response) } catch (err) { }
                if (response[0].StatusCode == '200') {
                    alert(response[0].StatusDescription);
                    $scope.ClearData();
                    $scope.getsalarydata($scope.DepartmentID);

                } else if (response[0].StatusCode == '400') {
                    alert(response[0].StatusDescription);
                    $scope.ClearData();
                    $scope.getsalarydata($scope.DepartmentID);

                } else {
                    alert('Something Went Wrong')

                }
            },
                function (error) {
                    alert("something Went Wrong")


                });
        }











        $scope.EditSalary = function (data) {
            window.scroll({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
            $scope.AddDetails = '0';
            $scope.UpdateDetails = '1';
            var DataTypeID = 2
            var getdesign = PayRollService.GetSalaryData(DataTypeID, data.EmployeeSalaryDetailsId, data.DepartmentId, data.EmployeeId, 0);
            getdesign.then(function (response) {

                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }
                //$scope.edit = true;
                if (res.Table.length > 0) {
                    $scope.EditSalaryData = res.Table;
                    $scope.EmployeeID = res.Table[0].EmployeeId;
                    $scope.EmployeeSalaryDetailsID = res.Table[0].EmployeeSalaryDetailsId;
                    $scope.DepartmentID = res.Table[0].DepartmentId;
                    $scope.CurrentBasicAmount = res.Table[0].CurrentBasicAmount;
                    $scope.InterimRelief = res.Table[0].InterimRelief;
                    $scope.CCA = res.Table[0].CCA;
                    $scope.PP = res.Table[0].PP;
                    $scope.FPI = res.Table[0].FPI;
                    $scope.TG_Increment = res.Table[0].TG_Increment;
                    $scope.ConveyanceAllowance = res.Table[0].ConveyanceAllowance;
                    $scope.Medical = res.Table[0].Medical;
                    $scope.NCI = res.Table[0].NCI;
                    $scope.NCIAmount = res.Table[0].NCIAmount;
                    $scope.Noreports = false;

                    if ($scope.NCI == 'Y') {
                        $scope.showNCIAmount = true;
                    }
                    else if ($scope.NCI == 'N') {
                        $scope.showNCIAmount = false;
                    }

                }
                else {
                    $scope.SalaryData = [];
                    $scope.Noreports = true;
                }


            },

                function (error) {
                    alert("error while loading Department");
                    var err = JSON.parse(error);

                });


        }
        $scope.ChangeStatus = function (EmployeeSalaryDetailsId,DepartmentId,EmployeeId, Status) {
            var DataType = 3;
            var getSlides = PayRollService.ChangeSalaryStatus(DataType, EmployeeSalaryDetailsId,DepartmentId,EmployeeId, Status);
            getSlides.then(function (res) {
                var response = JSON.parse(res)
                if (response.Table[0].ResponseCode == '200') {
                    alert(response.Table[0].ResponseDescription)
                    $scope.getsalarydata();
                } else if (response.Table[0].ResponseCode == '400') {
                    alert(response.Table[0].ResponseDescription)
                    $scope.getsalarydata();
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

        $scope.ChangeNCI = function (data) {
            if (data == 'Y') {
                $scope.showNCIAmount = true;
            }
            else if (data == 'N') {
                $scope.showNCIAmount = false;
                $scope.NCIAmount = '';
            }
        }


        $scope.ChangeDepartment = function (data) {
            if (data.DepartmentID == 1) {
                $scope.DepartmentID = data.DepartmentID;
                $scope.showCBA = true;
                $scope.showPP = true;
                $scope.showFPI = true;
                $scope.showTGI = true;
                $scope.showMedical = true;
                $scope.showNCI = true;
                $scope.showIR = false;
                $scope.showCCA = false; 
                $scope.showCE = false;
               
                

                $scope.CurrentBasicAmount = '';
                $scope.PP = '';
                $scope.FPI = '';
                $scope.TG_Increment = '';
                $scope.Medical = '';
                $scope.getsalarydata();
                $scope.getEmployeeDetailsData();
              

            }
            else if (data.DepartmentID == 2) {
                $scope.DepartmentID = data.DepartmentID;
                $scope.showCBA = true;
                $scope.showIR = true;
                $scope.showCCA = true;
                $scope.showPP = true;
                $scope.showFPI = true;
                $scope.showTGI = true;
                $scope.showCE = true;
                $scope.showMedical = true;

                $scope.showNCI = false;


                $scope.CCA = '';
                $scope.PP = '';
                $scope.FPI = '';
                $scope.TG_Increment = '';
                $scope.Medical = '';
                $scope.ConveyanceElevence = '';
                $scope.CurrentBasicAmount = '';
                $scope.InterimRelief = '';
                $scope.getsalarydata();
                $scope.getEmployeeDetailsData();
                
            }
            else if (data.DepartmentID == 3) {
                $scope.DepartmentID = data.DepartmentID;
                $scope.showCBA = true;
                $scope.showIR = true;
                $scope.showCCA = true;
                $scope.showPP = true;
                $scope.showFPI = true;
                $scope.showTGI = true;
                $scope.showCE = true;
                $scope.showMedical = true;
                $scope.showNCI = false;



                $scope.CCA = '';
                $scope.PP = '';
                $scope.FPI = '';
                $scope.TG_Increment = '';
                $scope.Medical = '';
                $scope.ConveyanceElevence = '';
                $scope.CurrentBasicAmount = '';
                $scope.InterimRelief = '';
                $scope.getsalarydata();
                $scope.getEmployeeDetailsData();

            }
        }

        $scope.ChangeEmployee = function (EmployeeID) {

            $scope.EmployeeID = EmployeeID;

        }



    })
})