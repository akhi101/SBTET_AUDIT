define(['app'], function (app) {

    app.controller("CreateUserController", function ($scope, $http, $localStorage, $state, $stateParams, AppSettings, MasterPageService, MasterSettingsService) {

        var GetRolltype = MasterPageService.GetRolltype();
        GetRolltype.then(function (response) {
            $scope.Rolltype = response.Table;
        },
        function(error)
        {
            alert("error while data is loading ")
        

        });

        var Colleges = MasterSettingsService.GetColleges();
        Colleges.then(function (response) {
            console.log(response)
            $scope.getColleges = response.Table;
        },
        function (error) {
            alert("error while data is loading ")


        });
        
        var Branchs = MasterSettingsService.getActiveBranches();
        Branchs.then(function (response) {
            console.log(response)
            $scope.getBranches = response.Table;
        },
        function (error) {
            alert("error while data is loading ")


        });
        $scope.Save = function () {
          
            if ($scope.UserTypeId == 2 || $scope.UserTypeId == 3 || $scope.UserTypeId == 1006) {
                    if ($scope.CollegeId == null || $scope.CollegeId == '' || $scope.CollegeId == undefined) {
                    alert('Please Select College')
                    return
                }

                }
                if ($scope.UserTypeId == 3) {
                    if ($scope.BranchId == null || $scope.BranchId == '' || $scope.BranchId == undefined) {
                        alert('Please Select Branch')
                        return
                    }

                }
                if ($scope.CollegeId = null || $scope.CollegeId == '' || $scope.CollegeId == undefined) {
                    $scope.CollegeId = 0
                }
                if ($scope.BranchId = null || $scope.BranchId == '' || $scope.BranchId == undefined) {
                    $scope.BranchId = 0
                }

            var datatypeId =1
            var CreateUser = MasterSettingsService.AddUser(datatypeId, $scope.UserName, $scope.UserTypeId, $scope.Password, $scope.FirstName, $scope.LastName, $scope.Address,
                  $scope.EmailId, $scope.CellNumber, $scope.CollegeId, $scope.BranchId)
            CreateUser.then(function (response) {
                if (response[0].ResponceCode == '200') {
                    alert(response[0].ResponceDescription)
                } else if (response[0].ResponceCode == '400') {
                    alert(response[0].ResponceDescription)
                }
            },
                     function (error) {
                         alert("something Went Wrong")


                     });

        }

        $scope.Savee = function () {
            if ($scope.MyForm.$valid) {

                var RoleId = $scope.data.Id;
                var UserName = $scope.Name;

                var SetUserType = MasterPageService.SetUserType(RoleId, UserName)
                SetUserType.then(function (response) {
                    $scope.RoleId = "";
                    var UserName = "";

                    var GetUserNames = MasterPageService.GetUserNames();
                    GetUserNames.then(function (response) {
                        $scope.UserType = response.Table;

                    },
                   function (error) {
                       alert("Something Went Wrong")
                   })



                },
                function (error) {
                    alert("something Went Wrong")


                });
            }
            else {
              
            }

        }
       
        var GetUserNames = MasterPageService.GetUserNames();
        GetUserNames.then(function (response) {
            $scope.UserType=response.Table;

        },
       function (error) {
           alert("Something Went Wrong")
       })


        $scope.Edit = function (Id) {
            
            var editdata = MasterSettingsService.getUserById(Id);
            editdata.then(function (response) {
                console.log(response)
                $scope.UserName = response[0].UserName
                $scope.FirstName = response[0].FirstName
                $scope.LastName = response[0].LastName
                $scope.Address1 = response[0].Address
                $scope.CellNumber = response[0].CellNo
                $scope.EmailId = response[0].EmailId
                $scope.CollegeId = response[0].CollegeId
                $scope.BranchId = response[0].BranchId
                

            },
           function (error) {
               alert("Something Went Wrong")
           })
        }
    });
});