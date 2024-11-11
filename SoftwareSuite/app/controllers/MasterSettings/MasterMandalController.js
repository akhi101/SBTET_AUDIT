define(['app'], function (app) {
    app.controller("MasterMandalController", function ($scope, $http, $localStorage, $state, AppSettings, MasterPageService) {
        $scope.GetMasterMandal = {};
        $scope.AddData = true;

        var GetMandal = MasterPageService.GetMandal()
        GetMandal.then(function (response) {
            //response = JSON.parse(response);
            //console.log(response);
            $scope.GetMasterMandal = response.Table;
        },
     function (error) {
         alert("data is not loaded");
         var err = JSON.parse(error);
         console.log(err.Message);

     });
        $scope.submit = function () {

            var Mandal = $scope.MandalName;
            var setMandal = MasterPageService.setMandal(Mandal);
            setMandal.then(function (response) {
                
                //response = JSON.parse(response);
                //console.log(response);

                var GetMandal = MasterPageService.GetMandal()
                GetMandal.then(function (response) {
                    $scope.GetMasterMandal = response.Table;
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

            var mndalId = $scope.mandalid;
            var EditMandal = MasterPageService.EditMandal(Id);
            EditMandal.then(function (response) {
         
                $scope.MandalName = response[0].Mandal;
                $scope.mandalId = response[0].Id

            },
                 function (error) {
                     alert("edit is not wroking");
                     var err = JSON.parse(error);
                     console.log(err.Message);

                 });
        }

        $scope.delete = function (Id) {

            var deleteMandal = MasterPageService.deleteMandal(Id);
            deleteMandal.then(function (response) {
         

                var GetMandal = MasterPageService.GetMandal()
                GetMandal.then(function (response) {

                    $scope.GetMasterMandal = response.Table;
                },
               
               function (error) {
                   alert("error data is not getting");
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

            var Mandal = $scope.MandalName;

            var updatemndales = MasterPageService.updateMandal($scope.mandalId, Mandal);
            updatemndales.then(function (response) {
       ;

                $scope.AddData = true;
                $scope.UpdateData = false;
                $scope.MandalName = '';

                var GetMandal = MasterPageService.GetMandal()
                GetMandal.then(function (response) {

                    $scope.GetMasterMandal = response.Table;
                },
               
               function (error) {
                   alert("error data is not getting");
                   var err = JSON.parse(error);
                   console.log(err.Message);

               });
            },
           
            function (error) {
                alert("data is not updating");
                var err = JSON.parse(error);
                console.log(err.Message);

            });

        }

        

    });
});