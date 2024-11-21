define(['app'], function (app) {
    app.controller("RolesController", function ($scope, $state, $stateParams, AppSettings, MasterPageService, BasicCourseService, BasicExamService, BasicDistrictsService, BasicCollegeService) {


        $scope.Update = false;
        $scope.Add = true;

        var GetRoleData = MasterPageService.GetRoleDatas();
        GetRoleData.then(function (response) {
            $scope.SetRoleType = response.Table;
        },
        function (error) {
            alert("Something Went Wrong")
       
        });
        $scope.Save = function () {
            var Setname = $scope.RoleType;
            var Puropse = $scope.Puropse;
            var SetRollType = MasterPageService.SetRollType($scope.RoleType, Puropse);
            SetRollType.then(function (response) {
                $scope.RoleType = "";
                $scope.Puropse = "";
                var GetRoleData = MasterPageService.GetRoleDatas();
                GetRoleData.then(function (response) {
                    $scope.SetRoleType = response.Table;
                },
                function (error) {
                    alert("Something Went Wrong")


            },
            function (error) {
                alert("data not saved ")

            });
            });
            
        }
        $scope.Edit = function (Id) {
            var Puropse = $scope.Puropse;
            $scope.Update = true;
            $scope.Add = false;
            var EditData = MasterPageService.EditData(Id)
            EditData.then(function (response) {
                $scope.RoleType = response[0].UserDescription;
                $scope.Puropse = response[0].Purpose;
                $scope.id = response[0].Id;
            },
                
                function (error) {
                    alert("edit is not wroking");
                    var err = JSON.parse(error);
                    console.log(err.Message);

                });

          
        }
        $scope.delete = function (Id) {
            var Deletedata = MasterPageService.Deletedata(Id)
            Deletedata.then(function (response) {
                alert("data deleted successfully")

                var GetRoleData = MasterPageService.GetRoleDatas();
                GetRoleData.then(function (response) {
                    $scope.SetRoleType = response.Table;
                },
                function (error) {
                    alert("Something Went Wrong")
                },
                 function (error) {
                     alert("Something Went Wrong")

                 });
            });

           
        }
        $scope.update = function () {
           // var Setname = $scope.RoleType;
            var UpdateRolltype = MasterPageService.UpdateRolltype($scope.id, $scope.RoleType, $scope.Puropse)
            UpdateRolltype.then(function (response)
            {
                alert("data update successfully");
                $scope.RoleType = "";
                $scope.Puropse = "";

                var GetRoleData = MasterPageService.GetRoleDatas();
                GetRoleData.then(function (response) {
                    $scope.SetRoleType = response.Table;
                },
                function (error) {
                    alert("Something Went Wrong")
                },
                 function (error) {
                     alert("Something Went Wrong")

                 });

            })

        }


    })
    })