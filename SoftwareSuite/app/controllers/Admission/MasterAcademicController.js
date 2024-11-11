define(['app'], function (app) {
    app.controller("MasterAcademicController", function ($scope, $http, $localStorage, $state, AppSettings, MasterPageService) {
        $scope.GetMasterAcademicyear = {};
        $scope.AddData = true;

        var GetAcademicyears = MasterPageService.GetAcademicyears()
        GetAcademicyears.then(function (response) {
            $scope.GetMasterAcademicyear = response.Table;
        },
     function (error) {
         alert("data is not loaded");
         var err = JSON.parse(error);
         console.log(err.Message);

     });
        
        $scope.submit = function () {

            var Academic = $scope.Academicyear;


            var setAcademicyear = MasterPageService.setAcademicyear(Academic);
            setAcademicyear.then(function (response) {
                alert("data is insertred");


                var GetAcademicyears = MasterPageService.GetAcademicyears()
                GetAcademicyears.then(function (response) {

                    $scope.GetMasterAcademicyear = response.Table;
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

            var EditMandales = MasterPageService.EditMandales(Id);
            EditMandales.then(function (response) {
                alert("edit data");


                $scope.MandalName = response[0].MandalName;
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
                alert("delete data ");

                var GetMandales = MasterPageService.GetMandales()
                GetMandales.then(function (response) {

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

            var updatemndales = MasterPageService.updatemndales($scope.mandalid, Mandal);
            updatemndales.then(function (response) {
                alert("data is update");

                $scope.AddData = true;
                $scope.UpdateData = false;
                $scope.MandalName = '';

                var GetMandales = MasterPageService.GetMandales()
                GetMandales.then(function (response) {

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