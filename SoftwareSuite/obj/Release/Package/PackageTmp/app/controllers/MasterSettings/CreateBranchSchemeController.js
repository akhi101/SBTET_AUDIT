define(['app'], function(app) {
    app.controller("CreateBranchSchemeController", function ($scope, $http, $localStorage, $state, $window, $stateParams, AppSettings, MasterSettingsService) {
        var data = {};
        $scope.$emit('showLoading', data);

        var GetSubjectsData = MasterSettingsService.GetSchemeBranchs();
        GetSubjectsData.then(function (response) {

            $scope.SubjectsLists = response.Table;
            $scope.$emit('hideLoading', data);
           
        },
        function (error) {
            $scope.$emit('hideLoading', data);
            alert("Something Went Wrong")

        });

        $scope.GetData = function () {
            var GetSubjectsData = MasterSettingsService.GetSchemeBranchs();
            GetSubjectsData.then(function (response) {

                $scope.SubjectsLists = response.Table;
                $scope.$emit('hideLoading', data);

            },
            function (error) {
                $scope.$emit('hideLoading', data);
                alert("Something Went Wrong")

            });

        }

        var GetBranchsData = MasterSettingsService.GetBranchs();
        GetBranchsData.then(function (response) {
            //$scope.$emit('hideLoading', data);
            $scope.GetBranchs = response.Table;
            //console.log($scope.SubjectsList)
        },
        function (error) {
            //$scope.$emit('hideLoading', data);
            alert("Something Went Wrong")

        });

        var GetSchemesData = MasterSettingsService.getSchemes();
        GetSchemesData.then(function (response) {
            //$scope.$emit('hideLoading', data);
            $scope.GetSchemes = response.Table;
            //console.log($scope.SubjectsList)
        },
        function (error) {
            //$scope.$emit('hideLoading', data);
            alert("Something Went Wrong")

        });


        $scope.Save = function () {
            var schemes = JSON.parse($scope.Scheme)
            var Branches = JSON.parse($scope.Branch)
            var SchemeId = schemes.SchemeID
            var Scheme = schemes.Scheme            
            var BranchId = Branches.BranchID
            var BranchCode = Branches.BranchCode
            var datatypeid = 1        
            var SetUserType = MasterSettingsService.AddSchemeBranches(datatypeid, SchemeId, Scheme, BranchId, BranchCode)
            SetUserType.then(function (response) {
              
                if (response[0].ResponceCode == '200') {
                    alert(response[0].ResponceDescription)
                    $scope.GetData();
                } else if (response[0].ResponceCode == '400') {
                    alert(response[0].ResponceDescription)
                }
            },
            function (error) {
                alert("something Went Wrong")


            });
        }

        $scope.Status = function (Id, Status) {
            if (Status == 1) {
                if (confirm("Are you sure you want to Activate Branch Scheme?") == true) {
                    $scope.ChangeStatus(Id, Status)
                } else {
                    userPreference = "Save Canceled!";
                }
            } else {
                if (confirm("Are you sure you want to Deactivate Branch Scheme?") == true) {
                    $scope.ChangeStatus(Id, Status)
                } else {
                    userPreference = "Save Canceled!";
                }
            }

        }

        $scope.ChangeStatus = function (Id,status) {
            if (status == 1) {
                IsActive=0
            } else if (status == 0) {
                IsActive = 1
            }
            var SetUserType = MasterSettingsService.ChangeSchemeBranchStatus(Id, IsActive)
            SetUserType.then(function (response) {

                if (response[0].ResponceCode == '200') {
                    alert(response[0].ResponceDescription)
                    $scope.GetData();
                } else if (response[0].ResponceCode == '400') {
                    alert(response[0].ResponceDescription)
                }
            },
            function (error) {
                alert("something Went Wrong")


            });

        }
    })
})