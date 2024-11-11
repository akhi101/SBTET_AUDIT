define(['app'], function (app) {
    app.controller("MasterDistrirctController", function ($scope, $http, $localStorage, $state, AppSettings, MasterPageService) {

        $scope.GetMasterDistrict = {};
        $scope.AddData = true;

        var GetDistrictes = MasterPageService.GetDistrictes()
        GetDistrictes.then(function (response) {
            $scope.GetMasterDistrict = response.Table;
        },
     function (error) {
         alert("data is not loaded");
         var err = JSON.parse(error);
         console.log(err.Message);

     });
        $scope.submit = function () {

            var Dist = $scope.DistName;


            var setDist = MasterPageService.setDist(Dist);
            setDist.then(function (response) {
                $scope.DistName = '';
                


                var GetDistrictes = MasterPageService.GetDistrictes()
                GetDistrictes.then(function (response) {

                    $scope.GetMasterDistrict = response.Table;
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

            var DistId= $scope.DistId;

            var EditDist = MasterPageService.EditDist(Id);
            EditDist.then(function (response) {
                


                $scope.DistName = response[0].District;
                $scope.Distid = response[0].Id

            },
                 function (error) {
                     alert("edit is not wroking");
                     var err = JSON.parse(error);
                     console.log(err.Message);

                 });

        }

        $scope.delete = function (Id) {

            var deleteDist = MasterPageService.deleteDist(Id);
            deleteDist.then(function (response) {
               


                var GetDistrictes = MasterPageService.GetDistrictes()
                GetDistrictes.then(function (response) {

                    $scope.GetMasterDistrict = response.Table;
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

            var Dist = $scope.DistName;

            var updateDist = MasterPageService.updateDist($scope.Distid, Dist);
            updateDist.then(function (response) {
             

                $scope.AddData = true;
                $scope.UpdateData = false;
                $scope.DistName = '';
                var GetDistrictes = MasterPageService.GetDistrictes()
                GetDistrictes.then(function (response) {

                    $scope.GetMasterDistrict = response.Table;
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