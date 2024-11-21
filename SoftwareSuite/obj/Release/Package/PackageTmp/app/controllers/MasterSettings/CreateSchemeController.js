define(['app'], function (app) {
    app.controller("CreateSchemeController", function ($scope, $http, $localStorage, $state, AppSettings, MasterSettingsService, PreExaminationService) {
        var authData = $localStorage.authorizationData;
        $scope.UserName = authData.userName
        $scope.AddData = true
        $scope.UpdateData = false
        //console.log(authData)
        var GetSemester = PreExaminationService.GetScheme()
        GetSemester.then(function (response) {
           
            $scope.GetMasterSchemes = response.Table;
        },
     function (error) {
         alert("data is not loaded");
         var err = JSON.parse(error);
         console.log(err.Message);
     });



        $scope.GetData = function () { 
            var GetSemester = PreExaminationService.GetScheme()
            GetSemester.then(function (response) {

                $scope.GetMasterSchemes = response.Table;
            },  
         function (error) {
             alert("data is not loaded");
             var err = JSON.parse(error);
             console.log(err.Message);
         });

        }

        $scope.Submit = function () {
            
            var datatypeid =1
            var SequenceId = $scope.GetMasterSchemes.length+1
            //if ($scope.MyForm.$valid) {

                //var RoleId = $scope.data.Id;
                //var UserName = $scope.Name;
                console.log(datatypeid, $scope.Scheme, SequenceId, $scope.UserName)
                var SetUserType = PreExaminationService.SetScheme(datatypeid, $scope.Scheme, SequenceId, $scope.UserName)
                SetUserType.then(function (response) {
                    var response = JSON.parse(response)
                    if (response[0].ResponceCode == '200') {
                        alert(response[0].ResponceDescription)
                        $scope.GetData();
                        $scope.Scheme =''
                    } else {
                        alert('Something Went Wrong')
                    }
                },
                function (error) {
                    alert("something Went Wrong")


                });
            }
         
        $scope.Status = function (Id, Status) {
            if (Status == 1) {
                if (confirm("Are you sure you want to Activate Scheme?") == true) {
                    $scope.SetStatus(Id, Status)
                } else {
                    userPreference = "Save Canceled!";
                }
            } else {
                if (confirm("Are you sure you want to Deactivate Scheme?") == true) {
                    $scope.SetStatus(Id, Status)
                } else {
                    userPreference = "Save Canceled!";
                }
            }
          
        }
        $scope.SetStatus = function (Id, Status) {
            var setScheme = MasterSettingsService.SetSchemeStatus(Id, Status)
            setScheme.then(function (response) {
                if (response.Table[0].ResponseCode == '200') {
                    alert(response.Table[0].ResponseDescription)
                    $scope.GetData()
                } else {
                    alert('Something Went Wrong')
                }
               
            },
         function (error) {
             alert("data is not loaded");
             var err = JSON.parse(error);
             console.log(err.Message);
         });

        }

        $scope.UpdateScheme = function () {
            var GetSemester = MasterSettingsService.UpdateScheme($scope.SchemeId, $scope.Scheme)
            GetSemester.then(function (response) {
                if (response[0].ResponseCode == '200') {
                    alert(response[0].ResponseDescription)
                    $scope.Scheme = ''
                    $scope.AddData = true
                    $scope.UpdateData = false
                    $scope.GetData();
                  
                } else {
                    alert('Smething Went Wrong')
                }

            },
         function (error) {
             alert("data is not loaded");
             var err = JSON.parse(error);
             console.log(err.Message);
         });

        }
        $scope.Delete = function (Id) {
        if (confirm("Are you sure you want to Delete Scheme?") == true) {
            $scope.DeleteScheme(Id)
        } else {
            userPreference = "Save Canceled!";
        }
        }
        $scope.DeleteScheme = function (Id) {
            var GetSemester = MasterSettingsService.DeleteScheme(Id)
            GetSemester.then(function (response) {
                if (response[0].ResponseCode == '200') {
                    alert(response[0].ResponseDescription)
                       $scope.GetData();

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

        $scope.EditScheme = function (Id) {
            $scope.AddData = false
            $scope.UpdateData = true
            window.scrollTo(0, 0);
            var edit = MasterSettingsService.EditScheme(Id)
            edit.then(function (response) {
                
                    //console.log(response);
                    $scope.Scheme = response[0].Scheme;
                    $scope.SchemeId = response[0].SchemeID;
                    //alert(response[0].ResponseDescription)
              

            },
         function (error) {
             alert("data is not loaded");
             var err = JSON.parse(error);
             console.log(err.Message);
         });

        }
    })
})