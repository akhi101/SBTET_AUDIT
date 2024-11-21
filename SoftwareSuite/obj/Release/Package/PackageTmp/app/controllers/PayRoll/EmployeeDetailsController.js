define(['app'], function (app) {
    app.controller("EmployeeDetailsController", function ($scope, $localStorage, PayRollService, $uibModal) {
        var authData = $localStorage.authorizationData;
        $scope.UserName = authData.userName;

        const $ctrl = this;
            $ctrl.$onInit = () => {
                window.scroll({
                    top: 0,
                    left: 0,
                    behavior: 'smooth'
                });

                $scope.AddDetails = '1';
                $scope.UpdateDetails = '0';
                //$scope.getEmployeeDetailsData();
                $scope.showaddmonth = true;
                //$scope.IncrementMonth = null;
            }
        $scope.ChangeNPS = function (CPS_NPS) {
            if (CPS_NPS=="Y") {
                $scope.showprannumber = true;
                $scope.showtsglinumber = true;
                $scope.showgpfnumber = false;
               

            }
            else if (CPS_NPS == "N"){
                $scope.showprannumber = false;
                $scope.showgpfnumber = true;
                $scope.showtsglinumber = true;
            }
        }

        var getmon = PayRollService.GetMonths();
        getmon.then(function (res) {

            //$scope.edit = true;
            if (res.Table.length > 0) {
                $scope.MonthsData = res.Table;
                $scope.Noreports = false;



            }
            else {
                $scope.MonthsData = [];
                $scope.Noreports = true;
            }


        },

            function (error) {
                alert("error while loading Department");
                var err = JSON.parse(error);

            });

        var DataTypeID = 1
        var getdesign = PayRollService.GetDesignationData(DataTypeID, 0, 0);
        getdesign.then(function (response) {

            try {
                var res = JSON.parse(response);
            }
            catch (err) { }
            //$scope.edit = true;
            if (res.Table.length > 0) {
                $scope.DesignationData = res.Table;
                $scope.Noreports = false;



            }
            else {
                $scope.DesignationData = [];
                $scope.Noreports = true;
            }


        },

            function (error) {
                alert("error while loading Designation");
                var err = JSON.parse(error);

            });


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


            $scope.ClearData = function () {
                $scope.EmployeeCode = "";
                $scope.EmployeeName = "";
                $scope.DOB = "";
                $scope.DOJ = "";
                $scope.DOR = "";
                $scope.Designation = null;
                $scope.Department = null;
                $scope.Gender = "";
/*                $scope.PHC = "";*/
                $scope.Empstatus = "";
                $scope.IncrementMonth = null;
                $scope.ScaleType = "";
                $scope.PanNo = "";
                $scope.CPS_NPS = "";
                $scope.PranNo = "";
                $scope.GPFNo = "";
                $scope.TSGLINo = "";
               /* $scope.BankDetails = "";*/
                $scope.AccountNumber = "";
                $scope.IFSCCode = "";
                /*$scope.CategoryCode = "";*/
                
            }


        $scope.adddetails = function () {

            var datatypeid = 1
            if ($scope.EmployeeCode == null || $scope.EmployeeCode == undefined || $scope.EmployeeCode == "") {
                alert("Please Enter Employee Code");
                return;
            }

            if ($scope.EmployeeName == null || $scope.EmployeeName == undefined || $scope.EmployeeName == "") {
                alert("Please Enter Employee Name");
                return;
            }

            if ($scope.DOB == null || $scope.DOB == undefined || $scope.DOB == "") {
                alert("Please Select DOB ");
                return;
            }

            if ($scope.DOJ == null || $scope.DOJ == undefined || $scope.DOJ == "") {
                alert("Please Enter DOJ ");
                return;
            }

            if ($scope.DOR == undefined || $scope.DOR == null || $scope.DOR == "") {
                alert("Please Enter DOR");
                return;
            }

            if ($scope.Designation == undefined || $scope.Designation == null || $scope.Designation == "") {
                alert("Please Enter DesignationName");
                return;
            }


            if ($scope.Department == undefined || $scope.Department == null || $scope.Department == "") {
                alert("Please Enter DepartmentName");
                return;
            }


            if ($scope.Gender == undefined || $scope.Gender == null || $scope.Gender == "") {
                alert("Please Enter Gender");
                return;
            }

            //if ($scope.PHC == undefined || $scope.PHC == null || $scope.PHC == "") {
            //    alert("Please Enter PHC");
            //    return;
            //}

            if ($scope.Empstatus == undefined || $scope.Empstatus == null || $scope.Empstatus == "") {
                alert("Please Enter EmployeeStatus");
                return;
            }

            if ($scope.IncrementMonth == null || $scope.IncrementMonth == undefined || $scope.IncrementMonth == "") {
                alert("Please Enter IncrementMonth");
                return;
            }
            if ($scope.ScaleType == null || $scope.ScaleType == undefined || $scope.ScaleType == "") {
                alert("Please Select ScaleType ");
                return;
            }
            if ($scope.PanNo == null || $scope.PanNo == undefined || $scope.PanNo == "") {
                alert("Please Enter PanNumber ");
                return;
            }

            if ($scope.CPS_NPS == "Y") {
                if ($scope.PranNo == undefined || $scope.PranNo == null || $scope.PranNo == "") {
                    alert("Please Enter PranNumber");
                    return;
                }
            }
            else {

                if ($scope.GPFNo == undefined || $scope.GPFNo == null || $scope.GPFNo == "") {
                    alert("Please Enter GPFNumber");
                    return;
                }
                if ($scope.TSGLINo == undefined || $scope.TSGLINo == null || $scope.TSGLINo == "") {
                    alert("Please Enter TSGLINumber");
                    return;
                }
            }

            if ($scope.CPS_NPS == undefined || $scope.CPS_NPS == null || $scope.CPS_NPS == "") {
                alert("Please Enter CPS/NPS");
                return;
            }

 

            if ($scope.AccountNumber == undefined || $scope.AccountNumber == null || $scope.AccountNumber == "") {
                alert("Please Enter AccountNumber");
                return;
            }
            if ($scope.IFSCCode == undefined || $scope.IFSCCode == null || $scope.IFSCCode == "") {
                alert("Please Enter IFSCCode");
                return;
            }


            var datatypeid = 1

            var addEmployeeDetails = PayRollService.AddEmployeeDetails(datatypeid, 0, $scope.EmployeeCode, $scope.EmployeeName, moment($scope.DOB).format("YYYY-MM-DD HH:mm:ss.SSS"), moment($scope.DOJ).format("YYYY-MM-DD HH:mm:ss.SSS"), moment($scope.DOR).format("YYYY-MM-DD HH:mm:ss.SSS"), $scope.Designation, $scope.Department, $scope.Gender, $scope.Empstatus, $scope.IncrementMonth, $scope.ScaleType, $scope.PanNo, $scope.CPS_NPS, $scope.PranNo, $scope.GPFNo, $scope.TSGLINo, $scope.AccountNumber, $scope.IFSCCode,  1, $scope.UserName)
            addEmployeeDetails.then(function (res) {
                //try {
                //    var res = JSON.parse(response);
                //} catch (err) { }
                if (res[0].ResponseCode == '200') {
                    alert(res[0].ResponseDescription);
                    $scope.ClearData();
                    $scope.getEmployeeDetailsData();

                }
                else if (res[0].ResponseCode == '400') {
                    alert(res[0].ResponseDescription);
                    $scope.getEmployeeDetailsData();

                } else {
                    alert('Something Went Wrong');

                    $scope.ClearData();

                }
            },
                function (error) {
                    alert("something Went Wrong");
                    $scope.ClearData();


                });
        }


        $scope.checkDate = function (DOB) {
            var currentDate = new Date();
            var birthdate = new Date(DOB);
            if (birthdate > currentDate) {
                alert('Selected Date Should not be Future!')
                $scope.DOB = '';
                return;
            } else {
                $scope.DOB = DOB;
            }

            if (DOB) {
                var dobDate = new Date(DOB);
                var dorDate = new Date(dobDate.setFullYear(dobDate.getFullYear() + 61));
                $scope.DOR = dorDate.toISOString().split('T')[0]; // Format as yyyy-mm-dd
            } else {
                $scope.DOR = '';
            }
        }

        $scope.checkDate1 = function (DOJ) {
            var currentDate = new Date();
            var birthdate = new Date(DOJ);
            if (birthdate > currentDate) {
                alert('Selected Date Should not be Future!')
                $scope.DOJ = '';
                return;
            } else {
                $scope.DOJ = DOJ;
            }
        }

        //$scope.checkDate2 = function (DOR) {
        //    var currentDate = new Date();
        //    var birthdate = new Date(DOR);
        //    if (birthdate > currentDate) {
        //        alert('Selected Date Should not be Future!')
        //        $scope.DOR = '';
        //        return;
        //    } else {
        //        $scope.DOR = DOR;
        //    }
        //}

        $scope.ChangeDepartment = function (data) {

            $scope.DepartmentID = data;
            $scope.getEmployeeDetailsData(data)





        }

        $scope.getEmployeeDetailsData = function (data) {
            var DataTypeID = 1
            var getdesign = PayRollService.GetEmployeeDetailsData(DataTypeID, 0,data, 0);
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






        $scope.updateEmpdetails = function (data, ind) {
            //$scope['edit' + ind] = true;

            //var ele2 = document.getElementsByClassName("enabletable" + ind);
            //for (var j = 0; j < ele2.length; j++) {
            //    ele2[j].style['pointer-events'] = "none";
            //    ele2[j].style.border = "0";
            //}

            var datatypeid = 2;




            var desig = PayRollService.UpdateEmployeeDetails(datatypeid, $scope.EmployeeID, $scope.EmployeeCode, $scope.EmployeeName, moment($scope.DOB).format("YYYY-MM-DD HH:mm:ss.SSS"), moment($scope.DOJ).format("YYYY-MM-DD HH:mm:ss.SSS"), moment($scope.DOR).format("YYYY-MM-DD HH:mm:ss.SSS"), $scope.Designation, $scope.Department, $scope.Gender, $scope.Empstatus, $scope.IncrementMonth, $scope.ScaleType, $scope.PanNo, $scope.CPS_NPS, $scope.PranNo, $scope.GPFNo, $scope.TSGLINo, $scope.AccountNumber, $scope.IFSCCode,   $scope.Active, $scope.UserName)
            desig.then(function (response) {
                try { var response = JSON.parse(response) } catch (err) { }
                if (response[0].StatusCode == '200') {
                    alert(response[0].StatusDescription);
                    $scope.getEmployeeDetailsData();
                    $scope.ClearData();
                    $scope.EditEmployeeDetailsData[0].MonthID = null;
                    $scope.AddDetails = '1';
                    $scope.UpdateDetails = '0';

                } else if (response[0].StatusCode == '400') {
                    alert(response[0].StatusDescription);
                    $scope.getEmployeeDetailsData();
                    $scope.ClearData();
                    $scope.EditEmployeeDetailsData[0].MonthID = null;
                    $scope.AddDetails = '1';
                    $scope.UpdateDetails = '0';


                } else {
                    alert('Something Went Wrong');
                    $scope.ClearData();

                }
            },
                function (error) {
                    alert("something Went Wrong");
                    $scope.ClearData();



                });
        }











        $scope.EditEmployeeDetails = function (EmployeeID,DepartmentId,Active) {

            $scope.showaddmonth = false;
            $scope.showupdatemonth = true;
            window.scroll({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
            $scope.AddDetails = '0';
            $scope.UpdateDetails = '1';
            var DataTypeID = 2
            $scope.EmployeeID = EmployeeID;
            $scope.DepartmentID = DepartmentId;
            $scope.Active = Active;
            var getdesign = PayRollService.GetEmployeeDetailsData(DataTypeID, EmployeeID, DepartmentId, Active);
            getdesign.then(function (response) {

                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }

                //$scope.edit = true;
                if (res.Table.length > 0) {
                    $scope.EditEmployeeDetailsData = res.Table;
                    $scope.Noreports = false;

                    $scope.EmployeeCode = res.Table[0].EmployeeCode;
                    $scope.EmployeeName = res.Table[0].EmployeeName;
                    $scope.DOB = res.Table[0].DOB;
                    $scope.DOJ = res.Table[0].DOJ;
                    $scope.DOR = res.Table[0].DOR;
                    $scope.Designation = res.Table[0].DesignationId;
                    $scope.Department = res.Table[0].DepartmentId;
                    $scope.Gender = res.Table[0].Gender;
                    $scope.Empstatus = res.Table[0].Empstatus;
                    $scope.IncrementMonth = $scope.EditEmployeeDetailsData[0].MonthID;
                    //$scope.IncrementMonthUpdated = res.Table[0].MonthID;
                    $scope.ScaleType = res.Table[0].ScaleType;
                    $scope.PanNo = res.Table[0].PanNo;
                    $scope.CPS_NPS = res.Table[0].CPS_NPS;
                    $scope.PranNo = res.Table[0].PranNo;
                    $scope.GPFNo = res.Table[0].GPFNo;
                    $scope.TSGLINo = res.Table[0].TSGLINo;
                    $scope.AccountNumber = res.Table[0].AccountNumber;
                    $scope.IFSCCode = res.Table[0].IFSCCode;


                    //$scope.EditMonthData = res.Table1;
                   

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
        $scope.changemonth = function (data) {
            $scope.IncrementMonthUpdated = data;
        }

        $scope.ChangeStatus = function (EmployeeID, DepartmentId, Status) {
            var DataType = 3;
            var getSlides = PayRollService.EmployeeDetailStatus(DataType, EmployeeID, DepartmentId, Status);
            getSlides.then(function (res) {
                var response = JSON.parse(res)
                if (response.Table[0].ResponseCode == '200') {
                    alert(response.Table[0].ResponseDescription);
                    var DataTypeID = 1;
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
                    //$scope.getEmployeeDetailsData();
                } else if (response.Table[0].ResponseCode == '400') {
                    alert(response.Table[0].ResponseDescription);
                    var DataTypeID = 1;
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
                    //$scope.getEmployeeDetailsData();
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





        //$scope.SelectBankDetails = function () {

        //    let DataTypeID = 1
        //    var getbank = PayRollService.GetBankDetailsData(DataTypeID, 0, 0);
        //    getbank.then(function (response) {

        //        try {
        //            var res = JSON.parse(response);
        //        }
        //        catch (err) { }
        //        //$scope.edit = true;
        //        if (res.Table.length > 0) {
        //            $scope.BanksData = res.Table;
        //            $scope.Noreports = false;


        //        }
        //        else {
        //            $scope.BanksData = [];
        //            $scope.Noreports = true;
        //        }


        //    },

        //        function (error) {
        //            alert("error while loading Employee Details");
        //            var err = JSON.parse(error);

        //        });


        //    //$scope.modalInstance = $uibModal.open({
        //    //    templateUrl: "/app/views/PayRoll/Popups/BankDetailsPopup.html",
        //    //    size: 'lg',
        //    //    scope: $scope,
        //    //    windowClass: 'modal-fit',
        //    //    backdrop: 'static',
        //    //    keyboard: false
        //    //});


        //}

        //$scope.closeModal = function () {
        //    $scope.modalInstance.close();
        //};

        //$scope.getBranchesbyName = function (BankData) {
        //    var BankData = JSON.parse(BankData)
        //    console.log(BankData)
        //    $scope.BankId = BankData.BankId;
        //    $scope.BankName = BankData.BankName;

        //    var getbranch = PayRollService.GetBankBranchbyName($scope.BankName);
        //    getbranch.then(function (response) {

        //        try {
        //            var res = JSON.parse(response);
        //        }
        //        catch (err) { }
        //        //$scope.edit = true;
        //        if (res.Table.length > 0) {
        //            $scope.BranchsData = res.Table;
        //            $scope.Noreports = false;


        //        }
        //        else {
        //            $scope.BranchsData = [];
        //            $scope.Noreports = true;
        //        }


        //    },

        //        function (error) {
        //            alert("error while loading Employee Details");
        //            var err = JSON.parse(error);

        //        });
        //}

        //$scope.ChangeBranchs = function (BankBranch) {
        //    $scope.BankBranch = BankBranch;
        //    var getbranchifsc = PayRollService.GetBranchIFSC($scope.BankName,$scope.BankBranch);
        //    getbranchifsc.then(function (response) {

        //        try {
        //            var res = JSON.parse(response);
        //        }
        //        catch (err) { }
        //        //$scope.edit = true;
        //        if (res.Table.length > 0) {
        //            $scope.BranchIFSCData = res.Table;
        //            $scope.IFSCCode = $scope.BranchIFSCData[0].IFSCCode;
        //            $scope.Noreports = false;


        //        }
        //        else {
        //            $scope.BranchsData = [];
        //            $scope.Noreports = true;
        //        }


        //    },

        //        function (error) {
        //            alert("error while loading Employee Details");
        //            var err = JSON.parse(error);

        //        });

        //}

        //$scope.SubmitBankDetails = function (BankData, BankBranch) {


        //    $scope.BankDetails = $scope.BankName + ',' + $scope.BankBranch + ',' + $scope.IFSCCode;
        //    //$scope.BankId = BankData.BankId;
        //    $scope.modalInstance.close();
        //}





    })
})


