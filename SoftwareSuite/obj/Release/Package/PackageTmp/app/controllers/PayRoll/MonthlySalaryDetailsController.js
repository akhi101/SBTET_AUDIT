define(['app'], function (app) {
    app.controller("MonthlySalaryDetailsController", function ($scope, $http, $localStorage, $state, AppSettings, SystemUserService, PayRollService) {
        const $ctrl = this;
        $ctrl.$onInit = () => {

            $scope.EarnLeavesBalance = 30;
            $scope.CasualLeavesBalance = 15;
            $scope.MedicalLeavesBalance = 20;
            $scope.IncEmployeeData = false;
            $scope.DedEmployeeData = false;

            $scope.ShowLeaveData = false;
            var authData = $localStorage.authorizationData;
            $scope.UserName = authData.userName;
            $scope.MedicalLeaves = 1;
            $scope.CasualLeaves = 2;
            $scope.EarnLeaves = 3
            $scope.TotalLeaves = 10
            $scope.FinancialYears();
            $scope.GetEmployeeDetails();
            $scope.GetMonths();
            /* $scope.GetorEditIncrements();*/
            /*$scope.GetorEditDeductions();*/
            /*$scope.GetorEditLeaves();*/
        }

        $scope.GetData = function () {
            let datatype = 1
            var finyr = PayRollService.GetorEditIncrements(datatype, 0, 0)
            finyr.then(function (response) {
                var res = JSON.parse(response)
                $scope.GetAllIncrements = res.Table;

                for (var j = 1; j < $scope.GetAllIncrements.length + 1; j++) {
                    $scope['edit' + j] = true;
                }
            },
                function (error) {
                    alert("data is not loaded");
                    var err = JSON.parse(error);
                    console.log(err.Message);
                });

        }

        $scope.getEmployeebyMonthYear = function () {
            var getmnthyr = PayRollService.GetEmployeebyMonthYear($scope.IncrementsFinancialYear, $scope.IncrementsMonth)
            getmnthyr.then(function (response) {
                var res = JSON.parse(response)
                $scope.EmployeeDatabyYearMonth = res.Table;
            },
                function (error) {
                    alert("data is not loaded");
                    var err = JSON.parse(error);
                    console.log(err.Message);
                });

        }


        $scope.GetorEditIncrements = function () {
            var DataTypeID = 1
            var getdesign = PayRollService.GetorEditIncrements(DataTypeID, $scope.IncrementsFinancialYear, $scope.IncrementsMonth, 0, 0);
            getdesign.then(function (response) {
                var response = JSON.parse(response)
                //$scope.edit = true;
                if (response.Table.length > 0) {
                    $scope.GetAllIncrements = response.Table;

                    $scope.DataNotFound1 = false;
                    for (var j = 1; j < $scope.GetAllIncrements.length + 1; j++) {
                        $scope['edit' + j] = true;
                    }
                }
                else {
                    $scope.GetAllIncrements = [];
                    $scope.DataNotFound1 = true;
                }
            },
                function (error) {
                    alert("error while loading Increments Data");
                    var err = JSON.parse(error);

                });
        }



        




        $scope.GetorEditDeductions = function () {
            var DataTypeID = 1
            var getdesign = PayRollService.GetorEditDeductions(DataTypeID, $scope.DeductionsEmployeeId, $scope.DeductionsFinancialYear, $scope.DeductionsMonth, 0, 0);
            getdesign.then(function (response) {
                var response = JSON.parse(response)
                //$scope.edit = true;
                if (response.Table.length > 0) {
                    $scope.GetAllDeductions = response.Table;
                    $scope.DataNotFound2 = false;
                    for (var j = 1; j < $scope.GetAllDeductions.length + 1; j++) {
                        $scope['edit' + j] = true;
                    }
                }
                else {
                    $scope.GetAllDeductions = [];
                    $scope.DataNotFound2 = true;
                }
            },
                function (error) {
                    alert("error while loading Deductions Data");
                    var err = JSON.parse(error);

                });
        }





        $scope.FinancialYears = function () {
            var getdesign = PayRollService.GetFinancialYears();
            getdesign.then(function (response) {

                //$scope.edit = true;
                if (response.Table.length > 0) {
                    $scope.FinancialYears = response.Table;
                    $scope.Noreports = false;
                }
                else {
                    $scope.FinancialYears = [];
                    $scope.Noreports = true;
                }
            },
                function (error) {
                    alert("error while loading Financial Years");
                    var err = JSON.parse(error);

                });
        }

        $scope.GetEmployeeDetails = function () {
            var DataTypeID = 1
            var getdesign = PayRollService.GetEmployeeDetailsData(DataTypeID, 0, 0);
            getdesign.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }
                //$scope.edit = true;
                if (res.Table.length > 0) {
                    $scope.EmployeeDetailsData = res.Table;
                    $scope.Noreports = false;
                    $scope.savebutton = true;
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

        $scope.GetMonths = function () {
            var getmonths = PayRollService.GetMonths();
            getmonths.then(function (response) {

                //$scope.edit = true;
                if (response.Table.length > 0) {
                    $scope.MonthsData = response.Table;
                    $scope.Noreports = false;
                }
                else {
                    $scope.MonthsData = [];
                    $scope.Noreports = true;
                }
            },
                function (error) {
                    alert("error while loading Months");
                    var err = JSON.parse(error);

                });
        }
        //$scope.ChangeEmpData = function (data) {
        //    var data = JSON.parse(data)
        //    $scope.IncrementsFinancialYearId = data.FinancialYearID
        //    $scope.IncrementsMonthId = data.MonthID
        //    $scope.IncrementsEmployeeId = data.EmployeeID
        //    $scope.EmployeeCode = data.EmployeeCode
        //    $scope.EmployeeName = data.EmployeeName
        //    $scope.Designation = data.DesignationName

        //}



        $scope.ChangeEmpDedData = function (data) {
            var data = JSON.parse(data)
            $scope.DeductionsEmployeeId = data.EmployeeID
            $scope.EmployeeCode = data.EmployeeCode
            $scope.EmployeeName = data.EmployeeName
            $scope.Designation = data.DesignationName

        }

        $scope.ChangeEmpLevData = function (data) {
            var data = JSON.parse(data)
            $scope.LeavesEmployeeId = data.EmployeeID
            $scope.LeavesEmployeeCode = data.EmployeeCode
            $scope.LeavesEmployeeName = data.EmployeeName
            $scope.Designation = data.DesignationName;


        }

        $scope.GetReport1 = function () {
            $scope.IncEmployeeData = true;
            $scope.GetorEditIncrements();
        }

        $scope.GetReport2 = function () {
            $scope.DedEmployeeData = true;
            $scope.GetorEditDeductions();

        }
       
        $scope.SaveIncrement = function () {
            var datatypeid = 1

            var AddDepartment = PayRollService.AddorUpdateIncrements(datatypeid, 0, $scope.IncrementsFinancialYear, $scope.IncrementsMonth, $scope.IncrementsEmployeeId, $scope.IncrementAmount, 1, $scope.UserName)
            AddDepartment.then(function (response) {
                try {
                    var res = JSON.parse(response);
                } catch (err) { }
                if (res[0].ResponseCode == '200') {
                    alert(res[0].ResponseDescription);
                    $scope.GetorEditIncrements()

                }
                else if (res[0].ResponseCode == '400') {
                    alert(res[0].ResponseDescription);
                    $scope.GetorEditIncrements()

                } else {
                    alert('Something Went Wrong')

                }
            },
                function (error) {
                    alert("something Went Wrong")


                });
        }






        $scope.SaveDeduction = function () {
            var datatypeid = 1


            var AddDepartment = PayRollService.AddorUpdateDeductions(datatypeid, 0, $scope.DeductionsFinancialYear, $scope.DeductionsMonth, $scope.DeductionsEmployeeId, $scope.IT, $scope.FlagFund, $scope.Harithanidhi, $scope.DeductionAmount, 1, $scope.UserName)
            AddDepartment.then(function (response) {
                try {
                    var res = JSON.parse(response);
                } catch (err) { }
                if (res[0].ResponseCode == '200') {
                    alert(res[0].ResponseDescription);
                    $scope.GetorEditDeductions()

                }
                else if (res[0].ResponseCode == '400') {
                    alert(res[0].ResponseDescription);
                    $scope.GetorEditDeductions()

                } else {
                    alert('Something Went Wrong')

                }
            },
                function (error) {
                    alert("something Went Wrong")


                });
        }



       

        //$scope.ChangeLeaves = function () {
        //    //alert()
        //    if ($scope.MedicalLeaves == null || $scope.MedicalLeaves == undefined || $scope.MedicalLeaves == "") {
        //        $scope.MedicalLeaves = 0;
        //    }
        //    if ($scope.CasualLeaves == null || $scope.CasualLeaves == undefined || $scope.CasualLeaves == "") {
        //        $scope.CasualLeaves = 0;
        //    }
        //    if ($scope.EarnLeaves == null || $scope.EarnLeaves == undefined || $scope.EarnLeaves == "") {
        //        $scope.EarnLeaves = 0;
        //    }

        //    $scope.LeavesRequired = parseInt($scope.MedicalLeaves) + parseInt($scope.CasualLeaves) + parseInt($scope.EarnLeaves);
        //    if (parseInt($scope.LeavesRequired) <= parseInt($scope.LeavesBalance)) {
        //        $scope.RemainingLeaves = parseInt($scope.LeavesBalance) - parseInt($scope.LeavesRequired)
        //    } else {
        //        alert("Leaves Required must be less than Total Leaves")
        //        $scope.MedicalLeaves = 0;
        //        $scope.CasualLeaves = 0;
        //        $scope.EarnLeaves = 0;
        //    }

        //}

        $scope.ChangeLeaves = function () {
            if ($scope.MedicalLeavesUtilized == null || $scope.MedicalLeavesUtilized == undefined || $scope.MedicalLeavesUtilized == "") {
                $scope.MedicalLeavesUtilized = 0;
            }
            if ($scope.CasualLeavesUtilized == null || $scope.CasualLeavesUtilized == undefined || $scope.CasualLeavesUtilized == "") {
                $scope.CasualLeavesUtilized = 0;
            }
            if ($scope.EarnLeavesUtilized == null || $scope.EarnLeavesUtilized == undefined || $scope.EarnLeavesUtilized == "") {
                $scope.EarnLeavesUtilized = 0;
            }

            //$scope.LeavesRequired = parseInt($scope.MedicalLeaves) + parseInt($scope.CasualLeaves) + parseInt($scope.EarnLeaves);
            //if (parseInt($scope.LeavesRequired) <= parseInt($scope.LeavesBalance)) {
            //    $scope.RemainingLeaves = parseInt($scope.LeavesBalance) - parseInt($scope.LeavesRequired)
            //} else {
            //    alert("Leaves Required must be less than Total Leaves")
            //    $scope.MedicalLeaves = 0;
            //    $scope.CasualLeaves = 0;
            //    $scope.EarnLeaves = 0;
            //}
            if (parseInt($scope.MedicalLeavesUtilized) >= parseInt($scope.MedicalLeavesBalance)) {
                alert('MedicalLeavesUtilized must be less than MedicalLeavesBalance');
                return;
            }
            else if (parseInt($scope.CasualLeavesUtilized) >= parseInt($scope.CasualLeavesBalance)) {
                alert('CasualLeavesUtilized must be less than CasualLeavesBalance');
                return;
            }
            else if (parseInt($scope.EarnLeavesUtilized) >= parseInt($scope.EarnLeavesBalance)) {
                alert('EarnLeavesUtilized must be less than EarnLeavesBalance');
                return;
            }
            else if (parseInt($scope.MedicalLeavesUtilized) <= 0 || parseInt($scope.CasualLeavesUtilized) <= 0 || parseInt($scope.EarnLeavesUtilized) <= 0) {
                alert('LeavesUtilized must be grater than 0');
                return;
            }
        }


        $scope.getorEditLeaves = function () {
            let DataType = 1;
            if (parseInt($scope.MedicalLeavesUtilized) >= parseInt($scope.MedicalLeavesBalance) || parseInt($scope.MedicalLeavesUtilized) <0) {
                alert('MedicalLeavesUtilized must be less than MedicalLeavesBalance');
                return;
            }
            else if (parseInt($scope.CasualLeavesUtilized) >= parseInt($scope.CasualLeavesBalance) || parseInt($scope.CasualLeavesUtilized) < 0) {
                alert('CasualLeavesUtilized must be less than CasualLeavesBalance');
                return;
            }
            else if (parseInt($scope.EarnLeavesUtilized) >= parseInt($scope.EarnLeavesBalance) || parseInt($scope.EarnLeavesUtilized) < 0) {
                alert('EarnLeavesUtilized must be less than EarnLeavesBalance');
                return;
            }
            var getdesign = PayRollService.GetorEditLeaves(DataType, $scope.LeavesFinancialYear, $scope.LeavesMonth, $scope.LeavesEmployeeId, 0, 0);
            getdesign.then(function (resp) {
                console.log(resp)
                var response = JSON.parse(resp)
                //$scope.edit = true;
                if (response.Table.length > 0) {
                    $scope.ShowLeaveData = true;
                    $scope.EmployeeLeaveData = response.Table;
                    
                    for (var j = 1; j < $scope.EmployeeLeaveData.length + 1; j++) {
                        $scope['edit' + j] = true;
                    }
                    $scope.Noreports = false;
                    $scope.ShowLeaveData = true;
                }
                else {
                    $scope.EmployeeLeaveData = [];
                    $scope.Noreports = true;
                    $scope.ShowLeaveData = true;
                }
            },
                function (error) {
                    alert("error while loading Leaves Data");
                    $scope.ShowLeaveData = false;
                    var err = JSON.parse(error);

                });
        }


        $scope.SaveLeaves = function () {

            var datatypeid = 1
            var AddDepartment = PayRollService.AddLeaves(datatypeid, 0, $scope.LeavesFinancialYear, $scope.LeavesMonth, $scope.LeavesEmployeeId, $scope.MedicalLeavesBalance, $scope.MedicalLeavesUtilized, $scope.CasualLeavesBalance, $scope.CasualLeavesUtilized, $scope.EarnLeavesBalance, $scope.EarnLeavesUtilized, 1, $scope.UserName)
            AddDepartment.then(function (response) {
                try {
                    var res = JSON.parse(response);
                } catch (err) { }
                if (res[0].ResponseCode == '200') {
                    alert(res[0].ResponseDescription);
                    $scope.ShowLeaveData = false;
                    $scope.getorEditLeaves()

                }
                else if (res[0].ResponseCode == '400') {
                    alert(res[0].ResponseDescription);
                    $scope.ShowLeaveData = false;
                    $scope.getorEditLeaves()

                } else {
                    alert('Something Went Wrong')
                    $scope.ShowLeaveData = false;

                }
            },
                function (error) {
                    alert("something Went Wrong")
                    $scope.ShowLeaveData = false;

                });
        }

        $scope.EditIncrement = function (data, ind) {

            var ele1 = document.getElementsByClassName("enabletable" + ind);
            for (var j = 0; j < ele1.length; j++) {
                ele1[j].style['pointer-events'] = "auto";
                ele1[j].style.border = "1px solid #ddd";
            }
            $scope['edit' + ind] = false;



        }






        $scope.UpdateIncrement = function (data) {
            var DataTypeId = 2


            var AddDepartment = PayRollService.AddorUpdateIncrements(DataTypeId, data.IncrementID, data.FinancialYearID, data.MonthID, data.EmployeeID, data.IncrementAmount, data.Active, $scope.UserName)
            AddDepartment.then(function (response) {
                try {
                    var res = JSON.parse(response);
                } catch (err) { }
                if (res[0].StatusCode == '200') {
                    alert(res[0].StatusDescription);
                    $scope.GetorEditIncrements()

                }
                else if (res[0].StatusCode == '400') {
                    alert(res[0].StatusDescription);
                    $scope.GetorEditIncrements()

                } else {
                    alert('Something Went Wrong')

                }
            },
                function (error) {
                    alert("something Went Wrong")


                });
        }

        $scope.ChangeActive = function ( FinancialYearID, MonthID, IncrementID, Status) {
            var DataType = 3;
            var getSlides = PayRollService.PayRollIncrement(DataType, FinancialYearID, MonthID, IncrementID, Status);
            getSlides.then(function (res) {
                var response = JSON.parse(res)
                if (response.Table[0].ResponseCode == '200') {
                    alert(response.Table[0].ResponseDescription)
                    $scope.GetorEditIncrements();
                } else if (response.Table[0].ResponseCode == '400') {
                    alert(response.Table[0].ResponseDescription)
                    $scope.GetorEditIncrements();
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





        $scope.EditDeduction = function (data, ind) {

            var ele1 = document.getElementsByClassName("enabletable" + ind);
            for (var j = 0; j < ele1.length; j++) {
                ele1[j].style['pointer-events'] = "auto";
                ele1[j].style.border = "1px solid #ddd";
            }
            $scope['edit' + ind] = false;



        }


        $scope.UpdateDeduction = function (data) {
            var DataTypeId = 2


            var AddDepartment = PayRollService.AddorUpdateDeductions(DataTypeId, data.DeductionsID, data.FinancialYearID, data.MonthID, data.EmployeeID, data.IT, data.FlagFund, data.Harithanidhi, data.DeductionAmount, data.Active, $scope.UserName)
            AddDepartment.then(function (response) {
                try {
                    var res = JSON.parse(response);
                } catch (err) { }
                if (res[0].StatusCode == '200') {
                    alert(res[0].StatusDescription);
                    $scope.GetorEditDeductions()

                }
                else if (res[0].StatusCode == '400') {
                    alert(res[0].StatusDescription);
                    $scope.GetorEditDeductions()

                } else {
                    alert('Something Went Wrong')

                }
            },
                function (error) {
                    alert("something Went Wrong")


                });
        }

        $scope.ChangeDeduction = function (EmployeeID, FinancialYearID, MonthID,DeductionsID, Status) {
            var DataType = 3;
            var getSlides = PayRollService.PayRollDeduction(DataType, EmployeeID, FinancialYearID, MonthID,DeductionsID, Status);
            getSlides.then(function (res) {
                var response = JSON.parse(res)
                if (response.Table[0].ResponseCode == '200') {
                    alert(response.Table[0].ResponseDescription)
                    $scope.GetorEditDeductions();
                } else if (response.Table[0].ResponseCode == '400') {
                    alert(response.Table[0].ResponseDescription)
                    $scope.GetorEditDeductions();
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


        $scope.EditLeave = function (data, ind) {

            var ele1 = document.getElementsByClassName("enabletable" + ind);
            for (var j = 0; j < ele1.length; j++) {
                ele1[j].style['pointer-events'] = "auto";
                ele1[j].style.border = "1px solid #ddd";
            }
            $scope['edit' + ind] = false;



        }


        $scope.UpdateLeave = function (data) {
            var DataTypeId = 2


            var AddDepartment = PayRollService.UpdateLeaves(DataTypeId, data.LeaveId, data.FinancialYearID, data.MonthID, data.EmployeeID, data.MedicalLeaves, data.MedicalLeavesUtilized, data.CasualLeaves, data.CasualLeavesUtilized, data.EarnLeaves, data.EarnLeavesUtilized, data.Active, $scope.UserName)
            AddDepartment.then(function (response) {
                try {
                    var res = JSON.parse(response);
                } catch (err) { }
                if (res[0].StatusCode == '200') {
                    alert(res[0].StatusDescription);
                    $scope.getorEditLeaves()

                }
                else if (res[0].StatusCode == '400') {
                    alert(res[0].StatusDescription);
                    $scope.getorEditLeaves()

                } else {
                    alert('Something Went Wrong')

                }
            },
                function (error) {
                    alert("something Went Wrong")


                });
        }



        $scope.Approve = function () {
            var PaymentStudent = [{"Employeecode":"1025"}]
            if (PaymentStudent != [] && PaymentStudent != '') {
                $scope.btndisable = true;
                var ApproveStatus = 1;
               
                  
                    $scope.buttonlabel = "Signing in process ...";
                var GetInterimCertificateTobeSignedlocation = PayRollService.GetPaySlip($scope.SplPayFinancialYear, $scope.SplPayMonth)
                GetInterimCertificateTobeSignedlocation.then(function (response) {
                    var pdf = response[0].PdfUrl
                        var location = window.location.origin;
                        if (location == "https://sbtet.telangana.gov.in" || location == "https://www.sbtet.telangana.gov.in") {
                            location += "/API/"
                        } else {
                            location += "/"
                    }
                    window.open(pdf,'_blank')
                    }, function (err) {
                        $scope.btndisable = false;
                        $scope.buttonlabel = "Approve";
                    });



              

                
            } else {
                alert('select the pins');
                return;
            }
        }



        $scope.ChangeLeave = function (EmployeeID, FinancialYearID, MonthID,LeaveId, Status) {
            var DataType = 3;
            var getSlides = PayRollService.PayRollLeaves(DataType, EmployeeID, FinancialYearID, MonthID, LeaveId, Status);
            getSlides.then(function (res) {
                var response = JSON.parse(res)
                if (response.Table[0].ResponseCode == '200') {
                    alert(response.Table[0].ResponseDescription)
                    $scope.getorEditLeaves();
                } else if (response.Table[0].ResponseCode == '400') {
                    alert(response.Table[0].ResponseDescription)
                    $scope.getorEditLeaves();
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

        $scope.GetReport4 = function () {
            $scope.SplEmployeeData = true;
            $scope.GetorEditSplPay();
        }


        $scope.ChangeSplEmpData = function (data) {
            var data = JSON.parse(data)
            $scope.SplPayFinancialYearId = data.FinancialYearID
            $scope.SplPayMonthId = data.MonthID
            $scope.SplPayEmployeeId = data.EmployeeID
            $scope.EmployeeCode = data.EmployeeCode
            $scope.EmployeeName = data.EmployeeName
            $scope.Designation = data.DesignationName

        }


        $scope.GetData = function () {
            let datatype = 1
            var finyr = PayRollService.GetorEditSplPay(datatype, 0, 0)
            finyr.then(function (response) {
                var res = JSON.parse(response)
                $scope.GetAllSplPay = res.Table;

                for (var j = 1; j < $scope.GetAllSplPay.length + 1; j++) {
                    $scope['edit' + j] = true;
                }
            },
                function (error) {
                    alert("data is not loaded");
                    var err = JSON.parse(error);
                    console.log(err.Message);
                });

        }



        $scope.GetorEditSplPay = function () {
            var DataTypeID = 1
            var getdesign = PayRollService.GetorEditSplPay(DataTypeID, $scope.SplPayEmployeeId, $scope.SplPayFinancialYear, $scope.SplPayMonth, 0, 0);
            getdesign.then(function (response) {
                var response = JSON.parse(response)
                //$scope.edit = true;
                if (response.Table.length > 0) {
                    $scope.GetAllSplPay = response.Table;

                    $scope.DataNotFound1 = false;
                    for (var j = 1; j < $scope.GetAllSplPay.length + 1; j++) {
                        $scope['edit' + j] = true;
                    }
                }
                else {
                    $scope.GetAllSplPay = [];
                    $scope.DataNotFound1 = true;
                }
            },
                function (error) {
                    alert("error while loading SplPay Data");
                    var err = JSON.parse(error);

                });
        }



        $scope.SaveSplPay = function () {
            var datatypeid = 1

            var AddDepartment = PayRollService.AddorUpdateSplPay(datatypeid, 0, $scope.SplPayFinancialYear, $scope.SplPayMonth, $scope.SplPayEmployeeId, $scope.SplPayAmount, 1, $scope.UserName)
            AddDepartment.then(function (response) {
                try {
                    var res = JSON.parse(response);
                } catch (err) { }
                if (res[0].ResponseCode == '200') {
                    alert(res[0].ResponseDescription);
                    $scope.GetorEditSplPay()

                }
                else if (res[0].ResponseCode == '400') {
                    alert(res[0].ResponseDescription);
                    $scope.GetorEditSplPay()

                } else {
                    alert('Something Went Wrong')

                }
            },
                function (error) {
                    alert("something Went Wrong")


                });
        }



        $scope.UpdateSplPay = function (data) {
            var DataTypeId = 2


            var AddDepartment = PayRollService.AddorUpdateSplPay(DataTypeId, data.SplPayID, data.FinancialYearID, data.MonthID, data.EmployeeID, data.SplPayAmount, data.Active, $scope.UserName)
            AddDepartment.then(function (response) {
                try {
                    var res = JSON.parse(response);
                } catch (err) { }
                if (res[0].StatusCode == '200') {
                    alert(res[0].StatusDescription);
                    $scope.GetorEditSplPay()

                }
                else if (res[0].StatusCode == '400') {
                    alert(res[0].StatusDescription);
                    $scope.GetorEditSplPay()

                } else {
                    alert('Something Went Wrong')

                }
            },
                function (error) {
                    alert("something Went Wrong")


                });
        }

        $scope.ChangeStatus = function (EmployeeID, FinancialYearID, MonthID, SplPayID, Status) {
            var DataType = 3;
            var getSlides = PayRollService.PayRollSplPay(DataType, EmployeeID, FinancialYearID, MonthID, SplPayID, Status);
            getSlides.then(function (res) {
                var response = JSON.parse(res)
                if (response.Table[0].ResponseCode == '200') {
                    alert(response.Table[0].ResponseDescription)
                    $scope.GetorEditSplPay();
                } else if (response.Table[0].ResponseCode == '400') {
                    alert(response.Table[0].ResponseDescription)
                    $scope.GetorEditSplPay();
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



        $scope.EditSplPay = function (data, ind) {

            var ele1 = document.getElementsByClassName("enabletable" + ind);
            for (var j = 0; j < ele1.length; j++) {
                ele1[j].style['pointer-events'] = "auto";
                ele1[j].style.border = "1px solid #ddd";
            }
            $scope['edit' + ind] = false;



        }





        $scope.Years = ['2021', '2022', '2023', '2024', '2025'];
        //$scope.SubBillers = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY'];
    })
})
