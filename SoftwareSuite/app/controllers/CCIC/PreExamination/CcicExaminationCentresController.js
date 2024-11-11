define(['app'], function (app) {
    app.controller("CcicExaminationCentresController", function ($scope, $http, $localStorage, $uibModal, $state, $stateParams, AppSettings, CcicPreExaminationService) {

        var authData = $localStorage.authorizationData;
        $scope.UserName = authData.UserName

        const $ctrl = this;
        $ctrl.$onInit = () => {
            $scope.getExamCentres();
        }


        var getdists = CcicPreExaminationService.GetDistricts();
        getdists.then(function (res) {
            try {
                var Res = JSON.parse(res)
            }
            catch (error) {

            }
            $scope.DistrictsData = Res;

        }, function (err) {
            $scope.LoadImg = false;
            alert("Error while loading");
        });

        $scope.getExamCentres = function () {
            var DataType = 1;
            var ExaminationCentreID = 0;
            var getcentres = CcicPreExaminationService.GetExaminationCentres(DataType, ExaminationCentreID);
            getcentres.then(function (res) {
                try {
                    var Res = JSON.parse(res)
                }
                catch (error) {

                }
                $scope.GetExaminationCentresTable = Res.Table;

            }, function (err) {
                $scope.LoadImg = false;
                alert("Error while loading");
            });
        }


        $scope.editExaminationCentres = function (ExaminationCentreID) {
            var DataType = 2;
            var getcentre = CcicPreExaminationService.EditExaminationCentres(DataType, ExaminationCentreID);
            getcentre.then(function (res) {
                try {
                    var Res = JSON.parse(res)
                }
                catch (error) {
                     
                }
                $scope.EditData = Res.Table;
                $scope.EditData1 = Res.Table1;
            }, function (err) {
                $scope.LoadImg = false;
                alert("Error while loading");
            });

            $scope.modalInstance = $uibModal.open({
                templateUrl: "/app/views/CCIC/Popups/EditExaminationCentresPopup.html",
                size: 'xlg',
                scope: $scope,
                backdrop: 'static',
                windowClass: 'modal-fit-att',
            });
            $scope.closeModal = function () {
                $scope.modalInstance.close();
            }
        }


        $scope.Submit = function () {

            if ($scope.ExaminationCentreCode == null || $scope.ExaminationCentreCode == undefined || $scope.ExaminationCentreCode == "") {
                alert("Please Enter Examination Centre Code");
                return;
            }
            
            if ($scope.ExaminationCentreName == null || $scope.ExaminationCentreName == undefined || $scope.ExaminationCentreName == "") {
                alert("Please Enter Examination Centre Name");
                return;
            }
            //if ($scope.HouseNumber == null || $scope.HouseNumber == undefined || $scope.HouseNumber == "") {
            //    alert("Please Enter House Number");
            //    return;
            //}
            //if ($scope.StreetName == null || $scope.StreetName == undefined || $scope.StreetName == "") {
            //    alert("Please Enter Street Number / Name");
            //    return;
            //}
            //if ($scope.Locality == null || $scope.Locality == undefined || $scope.Locality == "") {
            //    alert("Please Enter Locality");
            //    return;
            //}

            //if ($scope.Landmark == null || $scope.Landmark == undefined || $scope.Landmark == "") {
            //    alert("Please Enter Landmark");
            //    return;
            //}

            if ($scope.Village == null || $scope.Village == undefined || $scope.Village == "") {
                alert("Please Enter Village / Town / City");
                return;
            }


            if ($scope.District == null || $scope.District == undefined || $scope.District == "") {
                alert("Please Select District");
                return;
            }
    
            if ($scope.PinCode == null || $scope.PinCode == undefined || $scope.PinCode == "") {
                alert("Please Enter PinCode");
                return;
            }

            
            //if ($scope.PrincipalName == null || $scope.PrincipalName == undefined || $scope.PrincipalName == "") {
            //    alert("Please Enter Principal Name");
            //    return;
            //}
            if ($scope.PrincipalMobile == null || $scope.PrincipalMobile == undefined || $scope.PrincipalMobile == "") {
                alert("Please Enter Principal Mobile");
                return;
            }
            //if ($scope.PrincipalEmail == null || $scope.PrincipalEmail == undefined || $scope.PrincipalEmail == "") {
            //    alert("Please Enter Principal Email");
            //    return;
            //}
            let HouseNo = ($scope.HouseNumber == null || $scope.HouseNumber == undefined || $scope.HouseNumber == '') ? '' : $scope.HouseNumber;
            let StreetNo = ($scope.StreetName == null || $scope.StreetName == undefined || $scope.StreetName == '') ? '' : $scope.StreetName;
            let Locality = ($scope.Locality == null || $scope.Locality == undefined || $scope.Locality == '') ? '' : $scope.Locality;
            let Landmark = ($scope.Landmark == null || $scope.Landmark == undefined || $scope.Landmark == '') ? '' : $scope.Landmark;
            let Village = ($scope.Village == null || $scope.Village == undefined || $scope.Village == '') ? '' : $scope.Village;
            let PrincipalName = ($scope.PrincipalName == null || $scope.PrincipalName == undefined || $scope.PrincipalName == '') ? '' : $scope.PrincipalName;
            let PrincipalMobile = ($scope.PrincipalMobile == null || $scope.PrincipalMobile == undefined || $scope.PrincipalMobile == '') ? '' : $scope.PrincipalMobile;
            let PrincipalEmail = ($scope.PrincipalEmail == null || $scope.PrincipalEmail == undefined || $scope.PrincipalEmail == '') ? '' : $scope.PrincipalEmail;
            var paramObj = {
                "DataType": 1,
                "ExaminationCentreID": '',
                "ExaminationCentreCode": $scope.ExaminationCentreCode,
                "ExaminationCentreName": $scope.ExaminationCentreName,
                "HouseNumber": HouseNo,
                "StreetName": StreetNo,
                "Locality": Locality,
                "Landmark": Landmark,
                "Village": Village,
                "DistrictID": $scope.District,
                "Pincode": $scope.PinCode,
                "PrincipalName": PrincipalName,
                "PrincipalMobile": PrincipalMobile,
                "PrincipalEmail": PrincipalEmail,
                "UserName": authData.UserName
            }
            $scope.loading = true;

            var addexamcentres = CcicPreExaminationService.AddExaminationCentres(paramObj);
            addexamcentres.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }

                if (res[0].ResponseCode == '200') {
                    $scope.loading = false;
                    alert(res[0].ResponseDescription);
                    $scope.getExamCentres();

                } else if (res[0].ResponseCode == '400') {
                    $scope.loading = false;
                    alert(res[0].ResponseDescription);
                    $scope.getExamCentres();
                }
            },

                function (error) {

                    var err = JSON.parse(error);
                })
        }


        $scope.UpdateDetails = function (data) {

            //if (data[0].ExaminationCentreCode == null || data[0].ExaminationCentreCode == undefined || data[0].ExaminationCentreCode == "") {
            //    alert("Please Enter Examination Centre Code");
            //    return;
            //}

            if (data[0].ExaminationCentreName == null || data[0].ExaminationCentreName == undefined || data[0].ExaminationCentreName == "") {
                alert("Please Enter Coordinating Centre Name");
                return;
            }
            //if (data[0].HouseNumber == null || data[0].HouseNumber == undefined || data[0].HouseNumber == "") {
            //    alert("Please Enter House Number");
            //    return;
            //}
            //if (data[0].StreetName == null || data[0].StreetName == undefined || data[0].StreetName == "") {
            //    alert("Please Enter Street Number / Name");
            //    return;
            //}
            //if (data[0].Locality == null || data[0].Locality == undefined || data[0].Locality == "") {
            //    alert("Please Enter Locality");
            //    return;
            //}

            //if (data[0].Landmark == null || data[0].Landmark == undefined || data[0].Landmark == "") {
            //    alert("Please Enter Landmark");
            //    return;
            //}

            if (data[0].Village == null || data[0].Village == undefined || data[0].Village == "") {
                alert("Please Enter Village / Town / City");
                return;
            }


            if (data[0].DistrictID == null || data[0].DistrictID == undefined || data[0].DistrictID == "") {
                alert("Please Select District");
                return;
            }

            if (data[0].Pincode == null || data[0].Pincode == undefined || data[0].Pincode == "") {
                alert("Please Enter PinCode");
                return;
            }


            //if (data[0].PrincipalName == null || data[0].PrincipalName == undefined || data[0].PrincipalName == "") {
            //    alert("Please Enter Principal Name");
            //    return;
            //}
            if (data[0].PrincipalMobile == null || data[0].PrincipalMobile == undefined || data[0].PrincipalMobile == "") {
                alert("Please Enter Principal Mobile");
                return;
            }
            //if (data[0].PrincipalEmail == null || data[0].PrincipalEmail == undefined || data[0].PrincipalEmail == "") {
            //    alert("Please Enter Principal Email");
            //    return;
            //}

            let HouseNumber = (data[0].HouseNumber == null || data[0].HouseNumber == undefined || data[0].HouseNumber == '') ? '' : data[0].HouseNumber;
            let StreetName = (data[0].StreetName == null || data[0].StreetName == undefined || data[0].StreetName == '') ? '' : data[0].StreetName;
            let Locality = (data[0].Locality == null || data[0].Locality == undefined || data[0].Locality == '') ? '' : data[0].Locality;
            let Landmark = (data[0].Landmark == null || data[0].Landmark == undefined || data[0].Landmark == '') ? '' : data[0].Landmark;
            let Village = (data[0].Village == null || data[0].Village == undefined || data[0].Village == '') ? '' : data[0].Village;
            let PrincipalEmail = (data[0].PrincipalEmail == null || data[0].PrincipalEmail == undefined || data[0].PrincipalEmail == '') ? '' : data[0].PrincipalEmail;
            var paramObj = {
                "DataType": 2,
                "ExaminationCentreID": data[0].ExaminationCentreID,
                "ExaminationCentreCode": data[0].ExaminationCentreCode,
                "ExaminationCentreName": data[0].ExaminationCentreName,
                "HouseNumber": HouseNumber,
                "StreetName": StreetName,
                "Locality": Locality,
                "Landmark": Landmark,
                "Village": Village,
                "DistrictID": data[0].DistrictID,
                "Pincode": data[0].Pincode,
                "PrincipalName": data[0].PrincipalName,
                "PrincipalMobile": data[0].PrincipalMobile,
                "PrincipalEmail": PrincipalEmail,
                "Active": data[0].Active,
                "UserName": authData.UserName
            }
            $scope.loading = true;

            var updateexamcentres = CcicPreExaminationService.UpdateExaminationCentres(paramObj);
            updateexamcentres.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }

                if (res[0].ResponseCode == '200') {
                    $scope.loading = false;
                    alert(res[0].ResponseDescription);
                    $scope.loading = false;
                    $scope.getExamCentres();
                    $scope.modalInstance.close();
                   


                } else if (res[0].ResponseCode == '400') {
                    $scope.loading = false;
                    alert(res[0].ResponseDescription);
                    $scope.loading = false;
                    $scope.getExamCentres();
                   

                }


            },

                function (error) {

                    var err = JSON.parse(error);
                })
        }

    })
})