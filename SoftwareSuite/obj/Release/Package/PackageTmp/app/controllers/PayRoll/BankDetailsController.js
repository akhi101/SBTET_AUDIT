define(['app'], function (app) {
    app.controller("BankDetailsController", function ($scope, $localStorage, PayRollService) {
        var authData = $localStorage.authorizationData;
        $scope.UserName = authData.userName;


        const $ctrl = this;
        $ctrl.$onInit = () => {
            $scope.getBankDetailsData();


        }
         $scope.Add = function () {

            var datatypeid = 1


            if ($scope.BankName == null || $scope.BankName == undefined || $scope.BankName == "") {
                alert("Please Enter Bank Name");
                return;
            } if ($scope.BankBranch == null || $scope.BankBranch == undefined || $scope.BankBranch == "") {
                alert("Please Select Bank Branch ");
                return;
        } if ($scope.IFSCCode == null || $scope.IFSCCode == undefined || $scope.IFSCCode == "") {
            alert("Please Enter IFSCCode ");
                return;
            }
        //if ($scope.Address1 == undefined || $scope.Address1 == null || $scope.Address1 == "") {
        //    alert("Please Enter Address1");
        //        return;
        //    }
        //if ($scope.Address2 == undefined || $scope.Address2 == null || $scope.Address2 == "") {
        //    alert("Please Enter Address2");
        //        return;
        //    }
        //if ($scope.Address3 == undefined || $scope.Address3 == null || $scope.Address3 == "") {
        //    alert("Please Enter No of Address3");
        //        return;
        //    }
        //if ($scope.PinCode == undefined || $scope.PinCode == null || $scope.PinCode == "") {
        //    alert("Please Enter No of PinCode");
        //    return;
        //}
        
            var datatypeid = 1
        var AddBankDetails = PayRollService.AddBankDetails(datatypeid, 0, $scope.BankName, $scope.BankBranch, $scope.IFSCCode,  1, $scope.UserName)
        AddBankDetails.then(function (response){
                try {
                    var res = JSON.parse(response);
                } catch (err) { }
                if (res[0].ResponseCode == '200') {
                    alert(res[0].ResponseDescription);
                    $scope.getBankDetailsData();

                }
                else if (res[0].ResponseCode == '400') {
                    alert(res[0].ResponseDescription);
                    $scope.getBankDetailsData();

                } else {
                    alert('Something Went Wrong')

                }
            },
                function (error) {
                    alert("something Went Wrong")


                });
        }





        $scope.getBankDetailsData = function () {
            var DataTypeID = 4
            var getdesign = PayRollService.GetBankDetailsData(DataTypeID, 0, 0);
            getdesign.then(function (response) {

                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }
                //$scope.edit = true;
                if (res.Table.length > 0) {
                    $scope.BankDetailsData = res.Table;
                    $scope.Noreports = false;
                    for (var j = 1; j < $scope.BankDetailsData.length + 1; j++) {
                        $scope['edit' + j] = true;
                    }


                }
                else {
                    $scope.BankDetailsData = [];
                    $scope.Noreports = true;
                }


            },

                function (error) {
                    alert("error while loading BankDetails");
                    var err = JSON.parse(error);

                });
        }






        $scope.UpdateBankDetails = function (data, ind) {
            $scope['edit' + ind] = true;

            var ele2 = document.getElementsByClassName("enabletable" + ind);
            for (var j = 0; j < ele2.length; j++) {
                ele2[j].style['pointer-events'] = "none";
                ele2[j].style.border = "0";
            }

            var datatypeid = 2;

           


            var desig = PayRollService.UpdateBankDetails(datatypeid, data.BankId, data.BankName, data.BankBranch, data.IFSCCode,  1, $scope.UserName)
            desig.then(function (response) {
                try { var response = JSON.parse(response) } catch (err) { }
                if (response[0].StatusCode == '200') {
                    alert(response[0].StatusDescription);
                    $scope.getBankDetailsData();

                } else if (response[0].StatusCode == '400') {
                    alert(response[0].StatusDescription);
                    $scope.getBankDetailsData();

                } else {
                    alert('Something Went Wrong')

                }
            },
                function (error) {
                    alert("something Went Wrong")


                });
        }











        $scope.EditBankDetails = function (data, ind) {

            var ele1 = document.getElementsByClassName("enabletable" + ind);
            for (var j = 0; j < ele1.length; j++) {
                ele1[j].style['pointer-events'] = "auto";
                ele1[j].style.border = "1px solid #ddd";
            }
            $scope['edit' + ind] = false;



        }
        $scope.ChangeStatus = function (BankId, Status) {
            var DataType = 3;
            var getSlides = PayRollService.BankDetailStatus(DataType, BankId, Status);
            getSlides.then(function (res) {
                var response = JSON.parse(res)
                if (response.Table[0].ResponseCode == '200') {
                    alert(response.Table[0].ResponseDescription)
                    $scope.getBankDetailsData();
                } else if (response.Table[0].ResponseCode == '400') {
                    alert(response.Table[0].ResponseDescription)
                    $scope.getBankDetailsData();
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