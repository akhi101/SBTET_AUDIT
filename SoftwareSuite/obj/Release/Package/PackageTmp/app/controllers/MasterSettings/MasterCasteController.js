define(['app'], function (app) {
    app.controller("MasterCasteController", function ($scope, $http, $localStorage, $state, AppSettings, MasterPageService) {

        $scope.GetMasterCastes = {};
        $scope.AddData = true;

        var GetCastes = MasterPageService.GetCastes()
        GetCastes.then(function (response) {
            //response = JSON.parse(response);
            //console.log(response);
            $scope.GetMasterCastes = response.Table;
        },
     function (error) {
         alert("data is not loaded");
         var err = JSON.parse(error);
         console.log(err.Message);

     });
        $scope.submit = function () {

            var caste = $scope.CasteName;


            var setCaste = MasterPageService.setCaste(caste);
            setCaste.then(function (response) {
              
               $scope.CasteName = '';

                var GetCastes = MasterPageService.GetCastes()
                GetCastes.then(function (response) {
                    //response = JSON.parse(response);
                    //console.log(response);

                    $scope.GetMasterCastes = response.Table;
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

           
            var EditCaste = MasterPageService.EditCaste(Id);
            EditCaste.then(function (response) {
                //response = JSON.parse(response);
                //console.log(response);
                $scope.CasteName = response[0].Caste;
                $scope.CasteId = response[0].Id;

            },
                 function (error) {
                     alert("edit is not wroking");
                     var err = JSON.parse(error);
                     console.log(err.Message);

                 });

        }
        $scope.delete = function (Id) {

            var deleteCaste = MasterPageService.deleteCaste(Id);
            deleteCaste.then(function (response) {
               
                //  response = JSON.parse(response);
                alert("Data is Deleted");
               


                var GetCastes = MasterPageService.GetCastes()
                GetCastes.then(function (response) {
                    //response = JSON.parse(response);
                    //if (response.Table !== undefined) {
                    //    $scope.GetMasterBranches = response.Table;
                    //}
                    //else {
                    //    alert("Something went Wrong");
                    //}
                    $scope.GetMasterCastes = response.Table;

                   
                },

               function (error) {
                   alert("error data is not deleted");
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
            
            var Caste = $scope.CasteName;
            //var CasteId = $scope.CasteId;


            var updatecaste = MasterPageService.updatecaste($scope.CasteId, Caste);
            updatecaste.then(function (response) {
             

                $scope.AddData = true;
                $scope.UpdateData = false;
                $scope.CasteName = '';

                var GetCastes = MasterPageService.GetCastes()
                GetCastes.then(function (response) {

                    $scope.GetMasterCastes = response.Table;
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