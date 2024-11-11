define(['app'], function (app) {
    app.controller("MastersBankController", function ($scope, $http, $localStorage, $state, AppSettings, MasterPageService) {
        $scope.GetMasterBanksName = {};

        $scope.AddData = true;
        $scope.AddData = true;
        $scope.UpdateData = false;

        var GetBank = MasterPageService.GetBank()
        GetBank.then(function (response) {

            $scope.GetMasterBanksName = response.Table;
        },
     function (error) {
         alert("data is not loaded");
         var err = JSON.parse(error);
         console.log(err.Message);

     });


        $scope.submit = function () {

            var Bank = $scope.BankName;


            var setBanksNames = MasterPageService.setBanksNames(Bank);
            setBanksNames.then(function (response) {

                alert("data is insertred");
                $scope.BankName = '';



                var GetBank = MasterPageService.GetBank()
                GetBank.then(function (response) {

                    $scope.GetMasterBanksName = response.Table;
                },

               function (error) {
                   alert("error data is not getting");
                   var err = JSON.parse(error);
                   console.log(err.Message);

               });
            },

                       function (error) {
                           let err = JSON.parse(error);
                           console.log(err.Message);
                       });
        }




        $scope.Edit = function (Id) {
            $scope.AddData = false;
            $scope.UpdateData = true;

            var Bankid = $scope.BankId;

            var EditBank = MasterPageService.EditBank(Id);
            EditBank.then(function (response) {
                alert("edit data");

                $scope.BankName = response[0].Bank;
                $scope.BankId = response[0].Id

            },
                 function (error) {
                     alert("edit is not wroking");
                     var err = JSON.parse(error);
                     console.log(err.Message);

                 });

        }
        $scope.delete = function (Id) {

            var deleteBank = MasterPageService.deleteBank(Id);
            deleteBank.then(function (response) {
                alert("delete data ");

                var GetBank = MasterPageService.GetBank()
                GetBank.then(function (response) {
                    $scope.GetMasterBanksName = response.Table;
                },
             function (error) {
                 alert("data is not loaded");
                 var err = JSON.parse(error);
                 console.log(err.Message);

             });

            },

                 function (error) {
                     alert("delete is not wroking");
                     var err = JSON.parse(error);
                     console.log(err.Message);

                 });
        }

        $scope.update = function () {

            var Bank = $scope.BankName;

            var updateBank = MasterPageService.updateBank($scope.BankId, Bank);
            updateBank.then(function (response) {
                alert("data is update");
                $scope.AddData = true;
                $scope.UpdateData = false;
                $scope.BankName = '';

                var GetBank = MasterPageService.GetBank()
                GetBank.then(function (response) {

                    $scope.GetMasterBanksName = response.Table;
                },

               function (error) {
                   alert("error data is not getting");
                   var err = JSON.parse(error);
                   console.log(err.Message);

               });

            }, function (error) {
                alert("data is not updating");
                var err = JSON.parse(error);
                console.log(err.Message);

            });

        }



    });
});