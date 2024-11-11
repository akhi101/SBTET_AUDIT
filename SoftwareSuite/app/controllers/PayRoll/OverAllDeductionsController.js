define(['app'], function (app) {
    app.controller("OverAllDeductionsController", function ($scope, $http, $localStorage, $state, AppSettings, SystemUserService, PayRollService) {
        const $ctrl = this;
        $scope.Values = [{ "id": 1, "name": "Yes" }, { "id": 0, "name": "No" }]
        $ctrl.$onInit = () => {
            $scope.NPSEmployeeData = false;
            $scope.EmployeeData = false;
            $scope.HBAEmployeeData = false;
            var authData = $localStorage.authorizationData;
            $scope.UserName = authData.userName;
            $scope.FinancialYears();
            $scope.GetMonths();
            $scope.getAdvanceType();


        }

        $scope.NoofMonths = [
            { "Id": 1, "value": "1" },
            { "Id": 2, "value": "2" },
            { "Id": 3, "value": "3" },
            { "Id": 4, "value": "4" },
            { "Id": 5, "value": "5" },
            { "Id": 6, "value": "6" },
            { "Id": 7, "value": "7" },
            { "Id": 8, "value": "8" },
            { "Id": 9, "value": "9" },
            { "Id": 10, "value": "10" },
            { "Id": 11, "value": "11" },
            { "Id": 12, "value": "12" },
            { "Id": 13, "value": "13" },
            { "Id": 14, "value": "14" },
            { "Id": 15, "value": "15" },
            { "Id": 16, "value": "16" },
            { "Id": 17, "value": "17" },
            { "Id": 18, "value": "18" },
            { "Id": 19, "value": "19" },
            { "Id": 20, "value": "20" },
            { "Id": 21, "value": "21" },
            { "Id": 22, "value": "22" },
            { "Id": 23, "value": "23" },
            { "Id": 24, "value": "24" }

        ]


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

        //$scope.GetReport = function () {
        //    $scope.EmployeeData = true;
            
        //}


        $scope.ChangeAdvEmpData = function (data) {
            var data = JSON.parse(data)
            $scope.EmployeeId = data.EmployeeID
            $scope.EmployeeCode = data.EmployeeCode
            $scope.EmployeeName = data.EmployeeName
            $scope.Designation = data.DesignationName

        }


        $scope.GetEditNPS = function () {
            var DataTypeID = 1
            var getdesign = PayRollService.GetEditNPS(DataTypeID, $scope.NPSEmployeeId, $scope.NPSFinancialYear, $scope.NPSMonth, 0, 0);
            getdesign.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }
                //$scope.edit = true;
                if (res.Table.length > 0) {
                    $scope.NPSData = res.Table;
                    $scope.DataNotFound = false;
                    for (var j = 1; j < $scope.NPSData.length + 1; j++) {
                        $scope['edit' + j] = true;
                    }
                }
                else {
                    $scope.NPSData = [];
                    $scope.DataNotFound = true;
                }
            },
                function (error) {
                    alert("error while loading Employee Details");
                    var err = JSON.parse(error);

                });



        }



        $scope.SaveNPS = function () {
            var datatypeid = 1
            console.log(datatypeid, null, $scope.NPSFinancialYear, $scope.NPSMonth, $scope.NPSEmployeeId, $scope.PensionAmount, 1, $scope.UserName)
            var AddDepartment = PayRollService.AddorUpdateNPS(datatypeid, 0, $scope.NPSFinancialYear, $scope.NPSMonth, $scope.NPSEmployeeId, $scope.PensionAmount, 1, $scope.UserName)
            AddDepartment.then(function (response) {
                try {
                    var res = JSON.parse(response);
                } catch (err) { }
                if (res[0].ResponseCode == '200') {
                    alert(res[0].ResponseDescription);
                    $scope.EmployeeData = false;
                    $scope.PensionAmount = "";
                    $scope.GetEditNPS();

                }
                else if (res[0].ResponseCode == '400') {
                    alert(res[0].ResponseDescription);
                    $scope.GetEditNPS();

                } else {
                    alert('Something Went Wrong')

                }
            },
                function (error) {
                    alert("something Went Wrong")


                });
        }



        $scope.getorEditAdvance = function () {
            var DataTypeID = 1
            var getdesign = PayRollService.GetorEditAdvance(DataTypeID, $scope.EmployeeId, $scope.FinancialYear1, $scope.Month, 0, 0);
            getdesign.then(function (response) {
                var response = JSON.parse(response)
                //$scope.edit = true;
                if (response.Table.length > 0) {
                    $scope.GetAllAdvance = response.Table;
                    $scope.DataNotFound1 = false;
                    for (var j = 1; j < $scope.GetAllAdvance.length + 1; j++) {
                        $scope['edit' + j] = true;
                    }
                }
                else {
                    $scope.GetAllAdvance = [];
                    $scope.DataNotFound1 = true;
                }
            },
                function (error) {
                    alert("error while loading Advance Data");
                    var err = JSON.parse(error);

                });
        }


        $scope.SubmitAdvance = function () {
            var datatypeid = 1


            var AddDepartment = PayRollService.AddorUpdateAdvance(datatypeid, 0, $scope.EmployeeId, $scope.FinancialYear1, $scope.Month, $scope.AdvanceType, $scope.AdvanceAmount, $scope.AdvanceNoOfMonths, $scope.AdvanceEmiStartMonth, $scope.UserName)
            AddDepartment.then(function (response) {
                try {
                    var res = JSON.parse(response);
                } catch (err) { }
                if (res.Table[0].ResponseCode == '200') {
                    alert(res.Table[0].ResponseDescription);
                    $scope.getorEditAdvance()

                }
                else if (res.Table[0].ResponseCode == '400') {
                    alert(res.Table[0].ResponseDescription);
                    $scope.getorEditAdvance()

                } else {
                    alert('Something Went Wrong')

                }
            },
                function (error) {
                    alert("something Went Wrong")


                });
        }


        $scope.GetorEditHBA = function () {
            var DataTypeID = 1
            var getdesign = PayRollService.GetorEditHBA(DataTypeID, $scope.HBAEmployeeId, $scope.HBAFinancialYear, $scope.HBAMonth,0,  0);
            getdesign.then(function (response) {
                var response = JSON.parse(response)
                //$scope.edit = true;
                if (response.Table.length > 0) {
                    $scope.GetAllHBA = response.Table;
                    $scope.DataNotFound2 = false;
                    for (var j = 1; j < $scope.GetAllHBA.length + 1; j++) {
                        $scope['edit' + j] = true;
                    }
                }
                else {
                    $scope.GetAllHBA = [];
                    $scope.DataNotFound2 = true;
                }
            },
                function (error) {
                    alert("error while loading Advance Data");
                    var err = JSON.parse(error);

                });
        }


        $scope.SaveHBA = function () {
            var DataTypeId = 1


            var AddDepartment = PayRollService.AddorUpdateHBA(DataTypeId, 0, $scope.HBAFinancialYear, $scope.HBAMonth,$scope.HBAEmployeeId,  $scope.Amount, $scope.NoOfMonths, $scope.EMIMonth, 1, $scope.UserName)
            AddDepartment.then(function (response) {
                try {
                    var res = JSON.parse(response);
                } catch (err) { }
                if (res[0].ResponseCode == '200') {
                    alert(res[0].ResponseDescription);
                    $scope.GetorEditHBA($scope.HBAEmployeeId)

                }
                else if (res[0].ResponseCode == '400') {
                    alert(res[0].ResponseDescription);
                    $scope.GetorEditHBA($scope.HBAEmployeeId)

                } else {
                    alert('Something Went Wrong')

                }
            },
                function (error) {
                    alert("something Went Wrong")


                });
        }



        $scope.ChangeHBAActive = function (EmployeeID, FinancialYearID, MonthID,HBAId, Status) {
            var DataType = 3;
            var getSlides = PayRollService.GetorEditHBA(DataType, EmployeeID, FinancialYearID, MonthID, HBAId, Status);
            getSlides.then(function (res) {
                var response = JSON.parse(res)
                if (response.Table[0].ResponseCode == '200') {
                    alert(response.Table[0].ResponseDescription)
                    $scope.GetorEditHBA();
                } else if (response.Table[0].ResponseCode == '400') {
                    alert(response.Table[0].ResponseDescription)
                    $scope.GetorEditHBA();
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

        $scope.getAdvanceType = function () {
            var getmonths = PayRollService.GetAdvanceType();
            getmonths.then(function (response) {

                //$scope.edit = true;
                if (response.Table.length > 0) {
                    $scope.AdvanceTypeData = response.Table;
                    $scope.Noreports = false;
                }
                else {
                    $scope.AdvanceTypeData = [];
                    $scope.Noreports = true;
                }
            },
                function (error) {
                    alert("error while loading Months");
                    var err = JSON.parse(error);

                });
        }

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

       



        $scope.GetReport1 = function () {
            $scope.NPSEmployeeData = true;
            $scope.GetEditNPS();
            
        }
        $scope.GetReport2 = function () {
            $scope.EmployeeData = true;
            $scope.getorEditAdvance();

        }

        $scope.GetHBAReport = function () {
            $scope.GetorEditHBA();
            $scope.HBAEmployeeData = true;
        }

        $scope.ChangeLICReport = function (data) {
            //$scope.GetorEditLIC();
            var data = JSON.parse(data)
            $scope.LICEmployeeId = data.EmployeeID
            $scope.LICEmployeeCode = data.EmployeeCode
            $scope.LICEmployeeName = data.EmployeeName
            $scope.LICDesignation = data.DesignationName
        }

        $scope.ChangeEmpData = function (data) {

            var data = JSON.parse(data)
            $scope.NPSEmployeeId = data.EmployeeID
            $scope.EmployeeCode = data.EmployeeCode
            $scope.EmployeeName = data.EmployeeName
            $scope.Designation = data.DesignationName
           

        }

        $scope.ChangeHBAEmpData = function (data) {
            var data = JSON.parse(data)
            $scope.HBAEmployeeId = data.EmployeeID
            $scope.HBAEmployeeCode = data.EmployeeCode
            $scope.HBAEmployeeName = data.EmployeeName
            $scope.HBADesignation = data.DesignationName

        }

        









        $scope.EditNPS = function (data, ind) {

            var ele1 = document.getElementsByClassName("enabletable" + ind);
            for (var j = 0; j < ele1.length; j++) {
                ele1[j].style['pointer-events'] = "auto";
                ele1[j].style.border = "1px solid #ddd";
            }
            $scope['edit' + ind] = false;



        }

        $scope.UpdateNPS = function (data) {
            var DataTypeId = 2


            var AddDepartment = PayRollService.AddorUpdateNPS(DataTypeId, data.NPSID, data.FinancialYearID, data.MonthID, data.EmployeeID, data.PensionAmount, data.Active, $scope.UserName)
            AddDepartment.then(function (response) {
                try {
                    var res = JSON.parse(response);
                } catch (err) { }
                if (res[0].StatusCode == '200') {
                    alert(res[0].StatusDescription);
                    $scope.GetEditNPS()

                }
                else if (res[0].StatusCode == '400') {
                    alert(res[0].StatusDescription);
                    $scope.GetEditNPS()

                } else {
                    alert('Something Went Wrong')

                }
            },
                function (error) {
                    alert("something Went Wrong")


                });
        }

        $scope.EditHBA = function (data, ind) {

            var ele1 = document.getElementsByClassName("enabletable" + ind);
            for (var j = 0; j < ele1.length; j++) {
                ele1[j].style['pointer-events'] = "auto";
                ele1[j].style.border = "1px solid #ddd";
            }
            $scope['edit' + ind] = false;



        }



        $scope.UpdateHBA = function (data) {
            var DataTypeId = 2


            var AddDepartment = PayRollService.AddorUpdateHBA(DataTypeId, data.HBAId,data.FinancialYearID, data.MonthID, data.EmployeeID, data.Amount, data.NoOfMonths, data.Emi_Start_Month, data.Active, $scope.UserName)
            AddDepartment.then(function (response) {
                try {
                    var res = JSON.parse(response);
                } catch (err) { }
                if (res[0].StatusCode == '200') {
                    alert(res[0].StatusDescription);
                    $scope.GetorEditHBA($scope.HBAEmployeeId)

                }
                else if (res[0].StatusCode == '400') {
                    alert(res[0].StatusDescription);
                    $scope.GetorEditHBA($scope.HBAEmployeeId)

                } else {
                    alert('Something Went Wrong')

                }
            },
                function (error) {
                    alert("something Went Wrong")


                });
        }

        $scope.ChangeNPS = function (EmployeeID, FinancialYearID, MonthID, NPSID, Status) {
            var DataType = 3;
            var getSlides = PayRollService.PayRollNPS(DataType, EmployeeID, FinancialYearID, MonthID, NPSID, Status);
            getSlides.then(function (res) {
                var response = JSON.parse(res)
                if (response.Table[0].ResponseCode == '200') {
                    alert(response.Table[0].ResponseDescription)
                    $scope.GetEditNPS();
                } else if (response.Table[0].ResponseCode == '400') {
                    alert(response.Table[0].ResponseDescription)
                    $scope.GetEditNPS();
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


        $scope.EditAdvances = function (data, ind) {

            var ele1 = document.getElementsByClassName("enabletable" + ind);
            for (var j = 0; j < ele1.length; j++) {
                ele1[j].style['pointer-events'] = "auto";
                ele1[j].style.border = "1px solid #ddd";
            }
            $scope['edit' + ind] = false;



        }

        $scope.UpdateAdvance = function (data) {
            var datatypeid = 2


            var AddDepartment = PayRollService.AddorUpdateAdvance(datatypeid, data.AdvancesID, data.EmployeeID, data.FinancialYearID, data.MonthID, data.AdvanceTypeId, data.AdvanceAmount, data.AdvanceNoOfMonths, data.AdvanceEmiStartMonth, $scope.UserName)
            AddDepartment.then(function (response) {
                try {
                    var res = JSON.parse(response);
                } catch (err) { }
                if (res.Table[0].StatusCode == '200') {
                    alert(res.Table[0].StatusDescription);
                    $scope.getorEditAdvance()

                }
                else if (res.Table[0].StatusCode == '400') {
                    alert(res.Table[0].StatusDescription);
                    $scope.getorEditAdvance()

                } else {
                    alert('Something Went Wrong')

                }
            },
                function (error) {
                    alert("something Went Wrong")


                });
        }


        $scope.ChangeActive = function (EmployeeID, FinancialYearID, MonthID,AdvancesID, Status) {
            var DataType = 3;
            var getSlides = PayRollService.PayRollAction(DataType, EmployeeID,FinancialYearID,MonthID,AdvancesID, Status);
            getSlides.then(function (res) {
                var response = JSON.parse(res)
                if (response.Table[0].ResponseCode == '200') {
                    alert(response.Table[0].ResponseDescription)
                    $scope.getorEditAdvance();
                } else if (response.Table[0].ResponseCode == '400') {
                    alert(response.Table[0].ResponseDescription)
                    $scope.getorEditAdvance();
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





        $scope.ChangeLICEmpData = function (data) {
            var data = JSON.parse(data)
            $scope.LICEmployeeId = data.EmployeeID
            $scope.LICEmployeeCode = data.EmployeeCode
            $scope.LICEmployeeName = data.EmployeeName
            $scope.LICDesignation = data.DesignationName

            $scope.LICEmployeeData = true;


        }


        $scope.getorEditLIC = function () {
            $scope.LICEmployeeData = true;
            var DataTypeID = 1
            var getdesign = PayRollService.GetorEditLIC(DataTypeID, $scope.LICEmployeeId, 0,0, 0);
            getdesign.then(function (response) {
                var response = JSON.parse(response)
                //$scope.edit = true;
                if (response.Table.length > 0) {
                    $scope.GetAllLIC = response.Table;
                    $scope.DataNotFound2 = false;
                    for (var j = 1; j < $scope.GetAllLIC.length + 1; j++) {
                        $scope['edit' + j] = true;
                    }
                }
                else {
                    $scope.GetAllLIC = [];
                    $scope.DataNotFound2 = true;
                }
            },
                function (error) {
                    alert("error while loading Advance Data");
                    var err = JSON.parse(error);

                });
        }


      

        $scope.submitLICDetails = function () {
            var DataTypeId = 1
            if ($scope.studentfilearr[0].PolicyID == '' || $scope.studentfilearr[0].PolicyID == null || $scope.studentfilearr[0].PolicyID == undefined) {
                alert('Please Enter Policy ID');
                return;
            }
            if ($scope.studentfilearr[0].PolicyNumber == '' || $scope.studentfilearr[0].PolicyNumber == null || $scope.studentfilearr[0].PolicyNumber == undefined) {
                alert('Please Enter  LIC Policy Number');
                return;
            }
            if ($scope.studentfilearr[0].PremiumAmount == '' || $scope.studentfilearr[0].PremiumAmount == null || $scope.studentfilearr[0].PremiumAmount == undefined) {
                alert('Please Enter  PremiumAmount');
                return;
            }
            var addlicdetails = PayRollService.AddorUpdateLIC(DataTypeId, 0, $scope.LICEmployeeId, 0, 0,0, JSON.stringify($scope.studentfilearr), 1, $scope.UserName)
            addlicdetails.then(function (response) {
                try {
                    var res = JSON.parse(response);
                } catch (err) { }
                if (res[0].ResponseCode == '200') {
                    alert(res[0].ResponseDescription);
                    $scope.getorEditLIC()

                }
                else if (res[0].ResponseCode == '400') {
                    alert(res[0].ResponseDescription);
                    $scope.getorEditLIC()

                } else {
                    alert('Something Went Wrong')

                }
            },
                function (error) {
                    alert("something Went Wrong")


                });
        }



        $scope.ChangeLICActive = function (EmployeeID, PolicyID, LICID, Status) {
            var DataType = 3;
            var getSlides = PayRollService.GetorEditLIC(DataType, EmployeeID, PolicyID, LICID, Status);
            getSlides.then(function (res) {
                var response = JSON.parse(res)
                if (response.Table[0].ResponseCode == '200') {
                    alert(response.Table[0].ResponseDescription)
                    $scope.getorEditLIC();
                } else if (response.Table[0].ResponseCode == '400') {
                    alert(response.Table[0].ResponseDescription)
                    $scope.getorEditLIC();
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


        $scope.EditLIC = function (data, ind) {

            var ele1 = document.getElementsByClassName("enabletable" + ind);
            for (var j = 0; j < ele1.length; j++) {
                ele1[j].style['pointer-events'] = "auto";
                ele1[j].style.border = "1px solid #ddd";
            }
            $scope['edit' + ind] = false;



        }

        $scope.UpdateLIC = function (data) {
            var DataTypeId = 2


            var AddDepartment = PayRollService.AddorUpdateLIC(DataTypeId, data.LICID, data.EmployeeID, data.PolicyID,data.PolicyNumber ,data.PremiumAmount, 0, data.Active, $scope.UserName)
            AddDepartment.then(function (response) {
                try {
                    var res = JSON.parse(response);
                } catch (err) { }
                if (res[0].StatusCode == '200') {
                    alert(res[0].StatusDescription);
                    $scope.getorEditLIC()

                }
                else if (res[0].StatusCode == '400') {
                    alert(res[0].StatusDescription);
                    $scope.getorEditLIC()

                } else {
                    alert('Policy ID already exist')

                }
            },
                function (error) {
                    alert("something Went Wrong")


                });
        }




        $scope.studentfilearr = [];

        $scope.studentfilearr = [{
            fileindex: 0,
            file: "",
        }
        //{
        //    fileindex: 1,
        //    file: ""
        //},
        //{
        //    fileindex: 2,
        //    file: ""
        //}
        ];

        //if ($scope.studentfilearr.length == 1) {
        //    $scope.DeleteDisable = true;
        //} else {
        //    $scope.DeleteDisable = false;
        //}
        $scope.addUser = function () {


            //if ($scope.studentfilearr.length == 0) {
            //    $scope.DeleteDisable = true;
            //} else {
            //    $scope.DeleteDisable = false;
            //}

            if ($scope.studentfilearr.length < 12) {
           
                    $scope.studentfilearr.push({
                        fileindex: $scope.studentfilearr.length,
                        file: ""
                    });


                $scope.studentfilearr = $scope.studentfilearr.map(function (arr, ind) {
                    arr.fileindex = ind;
                    return arr;
                });

            } else {
                alert('maximum files limit reached');
            }
        }

        $scope.removeUser = function (val) {
            if (window.confirm("Do you want to delete this slot")) {
                //$scope.studentfilearr.splice(index, 1);
                //$scope.NoofSlots = null;
            }
            //var item = document.getElementById('studentFile' + val);
            //item.parentNode.removeChild(item);
            $scope.studentfilearr.splice(val, 1);
        }




        $scope.submitlicpolicyid = function (ele, ind) {
            $scope.studentfilearr.map((obj) => {
                if (obj.fileindex == ind) {
                    obj.PolicyID = ele.value;
                }
            });
            console.log($scope.studentfilearr)

        }

        $scope.submitlicpolicy = function (ele, ind) {
            $scope.studentfilearr.map((obj) => {
                if (obj.fileindex == ind) {
                    obj.PolicyNumber = ele.value;
                }
            });
            console.log($scope.studentfilearr)

        }
        var arr =[]
        $scope.submitpremiumamount = function (ele, ind) {
            $scope.studentfilearr.map((obj) => {
                if (obj.fileindex == ind) {
                    obj.PremiumAmount = ele.value;
                }
            });
            console.log($scope.studentfilearr)
            //arr.push($scope.studentfilearr)
            //console.log(arr)
        }

        $scope.ClearData = function () {

            $scope.PolicyID = "";

        }

        $scope.userslotarr = [];

        for (var i = 0; i < $scope.studentfilearr.length; i++) {
            var obj = {

                "PolicyID": $scope.studentfilearr[i].PolicyID,"LICPolicyNumber": $scope.studentfilearr[i].PolicyNumber, "PremiumAmount": $scope.studentfilearr[i].PremiumAmount

            }
            $scope.userslotarr.push(obj);

        }
        console.log($scope.userslotarr)

    })
})