define(['app'], function (app) {
    app.controller("MobileAppUpdateController", function ($scope, $http, $localStorage, $state, AppSettings, MasterPageService) {

        $scope.Types = [{ "Id": 1, "Value": true },
        { "Id": 0, "Value": false }]

        
        var getData = MasterPageService.GetMobileAppUpdates();
        getData.then(function (response) {
            if (response.Table1.length > 0) {
                for (var j = 1; j < response.Table1.length + 1; j++) {
                    $scope['edit' + j] = true;
                    $scope.edit = false
                }
               $scope.GetMobileUpdates = response.Table1
            } else {
                alert('Something Went Wrong')
            }

        },
           function (error) {
               alert("error data is not getting");
               var err = JSON.parse(error);
               console.log(err.Message);

           });


        $scope.getmobileUpdates = function () {
            var getData = MasterPageService.GetMobileAppUpdates();
            getData.then(function (response) {
                if (response.Table1.length > 0) {
                    for (var j = 1; j < response.Table1.length + 1; j++) {
                        $scope['edit' + j] = true;
                        $scope.edit = false
                    }
                    $scope.GetMobileUpdates = response.Table1
                } else {
                    alert('Something Went Wrong')
                }

            },
               function (error) {
                   alert("error data is not getting");
                   var err = JSON.parse(error);
                   console.log(err.Message);

               });
        }


        $scope.Save = function () {
            if ($scope.UpdateReleased == '' || $scope.UpdateReleased == null || $scope.UpdateReleased == undefined) {
                alert('please Enter Update Released')
                return;
            }
            if ($scope.UpdateDescription == '' || $scope.UpdateDescription == null || $scope.UpdateDescription == undefined) {
                alert('please Enter Update Description')
                return;
            }
            if ($scope.AppVersion == '' || $scope.AppVersion == null || $scope.AppVersion == undefined) {
                alert('please Enter App Version')
                return;
            }
            if ($scope.IsMaintainance == '' || $scope.IsMaintainance == null || $scope.IsMaintainance == undefined) {
                alert('please select Is Maintainance')
                return;
            }
            if ($scope.ManitainanceDescription == '' || $scope.ManitainanceDescription == null || $scope.ManitainanceDescription == undefined) {
                alert('please Enter Manitainance Description')
                return;
            }
            var DataType=1
            var Add = MasterPageService.SetMobileApp($scope.UpdateReleased, $scope.UpdateDescription, $scope.AppVersion, $scope.IsMaintainance, $scope.ManitainanceDescription, DataType);
            Add.then(function (response) {
                if (response[0].ResponceCode == '200') {
                    alert(response[0].ResponceDescription);
                    $scope.getmobileUpdates();
                    $scope.AddData = true;
                    $scope.UpdateData = false;
                    $scope.Semestername = '';
                } else {
                    alert('Something Went Wrong')
                }
               
                },
               function (error) {
                   alert("error data is not getting");
                   var err = JSON.parse(error);
                   console.log(err.Message);

               });
        }


        $scope.Edit = function (data, ind) {

            var ele1 = document.getElementsByClassName("enabletable" + ind);
            for (var j = 0; j < ele1.length; j++) {
                ele1[j].style['pointer-events'] = "auto";
                ele1[j].style.border = "1px solid #ddd";
                ele1[j].style['-webkit-appearance'] = "auto";
                ele1[j].style['-moz-appearance'] = "auto";
            }
            $scope['edit' + ind] = false;

        }


        $scope.Cancel = function (data, ind) {
            $scope['edit' + ind] = true;
            var ele2 = document.getElementsByClassName("enabletable" + ind);
            for (var j = 0; j < ele2.length; j++) {
                ele2[j].style['pointer-events'] = "none";
                ele2[j].style.border = "0";
                ele2[j].style['-webkit-appearance'] = "none";
                ele2[j].style['-moz-appearance'] = "none";
            }
        }


        $scope.Update = function (data) {
            console.log(data.IsUpdateReleased, data.UpdateDescription, data.UpdateVersion, data.IsInMaintainance, data.ManitainanceDescription, DataType, data.Id)
            //if (data.IsUpdateReleased == '' || data.IsUpdateReleased == null ) {
            //    alert('please Select Is Update Released')
            //    return;
            //}
            if (data.UpdateDescription == '' || data.UpdateDescription == null || data.UpdateDescription == undefined) {
                alert('please Enter Update Description')
                return;
            }
            if (data.UpdateVersion == '' || data.UpdateVersion == null || data.UpdateVersion == undefined) {
                alert('please Enter App Version')
                return;
            }
            //if (data.IsInMaintainance == '' || data.IsInMaintainance == null ) {
            //    alert('please select Is Maintainance')
            //    return;
            //}
            if (data.ManitainanceDescription == '' || data.ManitainanceDescription == null || data.ManitainanceDescription == undefined) {
                alert('please Enter Manitainance Description')
                return;
            }
            if (data.IsUpdateReleased == true) {
                data.IsUpdateReleased=1
            } else {
                data.IsUpdateReleased = 0
            }
            if (data.IsInMaintainance == true) {
                data.IsInMaintainance = 1
            } else {
                data.IsInMaintainance = 0
            }
            var DataType = 2
            //console.log(data.IsUpdateReleased, data.UpdateDescription, data.UpdateVersion, data.IsInMaintainance, data.ManitainanceDescription, DataType, data.Id)
            var Add = MasterPageService.UpdateMobileApp(data.IsUpdateReleased, data.UpdateDescription, data.UpdateVersion, data.IsInMaintainance, data.ManitainanceDescription, DataType, data.Id);
            Add.then(function (response) {
                if (response[0].ResponceCode == '200') {
                   alert(response[0].ResponceDescription);
                    $scope.getmobileUpdates();
                    $scope.AddData = true;
                    $scope.UpdateData = false;
                    $scope.Semestername = '';
                } else {
                    alert('Something Went Wrong')
                }

            },
               function (error) {
                   alert("error data is not getting");
                   var err = JSON.parse(error);
                   console.log(err.Message);

               });
        }
    })
})