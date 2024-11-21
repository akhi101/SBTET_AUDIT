define(['app'], function (app) {
    app.controller("MasterBranchController", function ($scope, $http, $localStorage, $state, AppSettings, MasterPageService) {

        $scope.GetMasterBranches = {};

        $scope.AddData = true;


        var GetBranches = MasterPageService.GetBranches()
        GetBranches.then(function (response) {

            $scope.GetMasterBranches = response.Table;

        },
     function (error) {
         alert('Something Went Wrong')
         var err = JSON.parse(error);
         console.log(err.Message);

     });


        $scope.GetBranches = function () {
            var GetBranches = MasterPageService.GetBranches()
            GetBranches.then(function (response) {
                $scope.GetMasterBranches = response.Table;

            },
           function (error) {
               alert('Something Went Wrong')
               var err = JSON.parse(error);
               console.log(err.Message);

           });
        }

        $scope.submit = function () {
            var Branch = $scope.Branchname;
            var code = $scope.BranchCode;
            var setBranch = MasterPageService.setBranch(Branch, code)
            setBranch.then(function (response) {
                if (response[0].ResponseCode == '200') {
                    alert(response[0].ResponseDescription)
                    $scope.Branchname = '';
                    $scope.BranchCode = '';
                    $scope.GetBranches()
                } else if (response[0].ResponseCode == '400') {
                    alert(response[0].ResponseDescription)
                } else {
                    alert('Something went wrong')
                }
            },
                   function (error) {
                       let err = JSON.parse(error);
                       console.log(err.Message);
                   });
        }


        $scope.Edit = function (Id) {
            window.scrollTo(0, 0);
            $scope.AddData = false;
            $scope.UpdateData = true;
            var EditBranches = MasterPageService.EditBranches(Id);
            EditBranches.then(function (response) {
                $scope.Branchname = response[0].BranchName;
                $scope.BranchCode = response[0].BranchCode;
                $scope.BranchId = response[0].BranchID
            },
                 function (error) {
                     alert('Something Went Wrong')
                     var err = JSON.parse(error);
                     console.log(err.Message);

                 });

        }
        $scope.Delete = function (Id) {
            if (confirm("Are you sure you want to Delete Branch?") == true) {
                $scope.DeleteBranch(Id)
            } else {
                userPreference = "Save Canceled!";
            }
        }
        $scope.DeleteBranch = function (Id) {
            var deleteBranch = MasterPageService.deleteBranch(Id);
            deleteBranch.then(function (response) {
                if (response[0].ResponseCode == '200') {
                    alert(response[0].ResponseDescription)
                    $scope.GetBranches()
                } else {
                    alert('Something Went Wrong')
                }

            },

                 function (error) {
                     alert('Something Went Wrong')
                     var err = JSON.parse(error);
                     console.log(err.Message);

                 });
        }

        $scope.Status = function (Id, Status) {
            if (Status == 1) {
                if (confirm("Are you sure you want to Activate Branch?") == true) {
                    $scope.ActiveStatus(Id, Status)
                } else {
                    userPreference = "Save Canceled!";
                }
            } else {
                if (confirm("Are you sure you want to Deactivate Branch?") == true) {
                    $scope.ActiveStatus(Id, Status)
                } else {
                    userPreference = "Save Canceled!";
                }
            }

        }

        $scope.ActiveStatus = function (Id, Status) {
            var deleteBranch = MasterPageService.ActiveBranchStatus(Id,Status);
            deleteBranch.then(function (response) {
                if (response[0].ResponseCode == '200') {
                    alert(response[0].ResponseDescription)
                    $scope.GetBranches()
                } else {
                    alert('Something Went Wrong')
                }
            },
              function (error) {
                  alert('Something Went Wrong')
                  var err = JSON.parse(error);
                  console.log(err.Message);

              });
        }

        $scope.update = function () {
            var updateBranch = MasterPageService.updateBranches($scope.BranchId, $scope.Branchname, $scope.BranchCode);
            updateBranch.then(function (response) {
                if (response[0].ResponseCode == '200') {
                    alert(response[0].ResponseDescription)
                    $scope.AddData = true;
                    $scope.UpdateData = false;
                    $scope.Branchname = '';
                    $scope.BranchCode = '';
                    $scope.GetBranches()
                } else if (response[0].ResponseCode == '400') {
                    alert(response[0].ResponseDescription)
                    $scope.AddData = true;
                    $scope.UpdateData = false;
                    $scope.Branchname = '';
                    $scope.BranchCode = '';
                    $scope.GetBranches()
                } 
               
            }, function (error) {
                alert('Something Went Wrong')
                var err = JSON.parse(error);
                console.log(err.Message);

            });

        }



    });
})