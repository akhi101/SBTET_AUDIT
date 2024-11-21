define(['app'], function (app) {
    app.controller("MasterSemesterController", function ($scope, $http, $localStorage, $state, AppSettings, MasterPageService) {

        $scope.GetMasterSemesters = {};
        $scope.AddData = true;


        var GetSemester = MasterPageService.GetSemester()
        GetSemester.then(function (response) {
            //response = JSON.parse(response);
            //console.log(response);
            //if (response.Table !== undefined) {
            //    $scope.GetMasterSemesters = response.Table;
            //}
            //else {
            //    alert("Something went Wrong");
            //}
            $scope.GetMasterSemesters = response.Table;
        },
     function (error) {
         alert("data is not loaded");
         var err = JSON.parse(error);
         console.log(err.Message);
     });

        $scope.submit = function () {

            var Semester = $scope.Semestername;


            var SetSemester = MasterPageService.setSemester(Semester);
            SetSemester.then(function (response) {
                console.log(response);
               

               $scope.Semestername = '';

                var GetSemester = MasterPageService.GetSemester()
                GetSemester.then(function (response) {
                    $scope.GetMasterSemesters = response.Table;
                    //response = JSON.parse(response);
                    //if (response.Table !== undefined) {
                    //    $scope.GetMasterSemesters = response.Table;
                    //}
                    //else {
                    //    alert("Something went Wrong");
                    //}
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

        $scope.Edit = function (ID) {
            $scope.AddData = false;
            $scope.UpdateData = true;

            var Semid = $scope.SemId;
            

            var EditSemester = MasterPageService.EditSemester(ID);
            EditSemester.then(function (response) {
                $scope.Semestername = response[0].semester;
               $scope.Semid = response[0].Id;

            },
                 function (error) {
                     alert("edit is not wroking");
                     var err = JSON.parse(error);
                     console.log(err.Message);

                 });

        }
        $scope.delete = function (Id) {

            var deleteSemester = MasterPageService.deleteSemester(Id);
            deleteSemester.then(function (response) {
                alert("delete data ");

                var GetSemester = MasterPageService.GetSemester()
                GetSemester.then(function (response) {
                    //response = JSON.parse(response);
                    //console.log(response);


                    $scope.GetMasterSemesters = response.Table;
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

            var Semster = $scope.Semestername;;

            var updateSemester = MasterPageService.updateSemester($scope.Semid, Semster);
            updateSemester.then(function (response) {
                alert("data is update");
                $scope.AddData = true;
                $scope.UpdateData = false;
                $scope.Semestername = '';

                var GetSemester = MasterPageService.GetSemester()
                GetSemester.then(function (response) {

                    $scope.GetMasterSemesters = response.Table;
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


    })