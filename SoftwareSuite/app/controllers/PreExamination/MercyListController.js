define(['app'], function (app) {
    app.controller("MercyListController", function ($scope, $http, $localStorage, $uibModal, $state, AppSettings, PreExaminationService) {

        var authData = $localStorage.authorizationData;
        $scope.UserTypeId = authData.SystemUserTypeId;
        var data = {};
        $scope.$emit('showLoading', data);
        $scope.Data = false;
        $scope.Nodata = false;

        var MercyList = PreExaminationService.GetMercyList();
        MercyList.then(function (response) {
            //var response = JSON.parse(response)
            //console.log(response);
            if (response.Table.length > 0) {
                $scope.$emit('hideLoading', data);

                $scope.Data = true;
                $scope.Nodata = false;
                $scope.MercyData = response.Table;
                
            } else {
                $scope.$emit('hideLoading', data);

                $scope.Data = false;
                $scope.Nodata = true;
            }



        },
            function (error) {
                $scope.$emit('hideLoading', data);

                $scope.Data = false;
                $scope.Nodata = true;
                alert("error while loading data");
            });


        $scope.getPhotoData = function (Id,DataType) {

            var getMercyData = PreExaminationService.getMercyData(Id, DataType)
            getMercyData.then(function (resp) {
                if (DataType == 1) {
                    $scope.Photo = resp.Table[0].Photo
                    $scope.PIN = resp.Table[0].PIN
                    var a = document.createElement("a"); //Create <a>
                    a.href = $scope.Photo; //Image Base64 Goes here
                    a.download = $scope.PIN + ".jpg"; //File name Here
                    a.click(); //Downloaded file
                } else if (DataType == 2) {
                    $scope.Files = resp.Table[0].Files
                    var str = $scope.Files;
                    var myarray = str.split(',');
                    var arr = []
                    var obj = {}

                    for (var i = 0; i < myarray.length-1; i++) {
                        console.log(myarray[i]);
                       // obj.file = myarray[i]
                        const obj = {
                            file: "https://sbtet.telangana.gov.in/Downloads/cert/"+myarray[i],
                            name:  myarray[i]
                        }
                        console.log(obj.file);
                        arr.push(obj)
                        $scope.File = arr;
                        console.log($scope.File)
                    }
                    for (var i = 0; i < $scope.File.length - 1; i++) {
                    console.log($scope.File)
                        window.open($scope.File[i].file, '_blank');
                    }
                }
            }, function (err) {
                $scope.ExamDates = []
            });
        }

      

      

       

    })
})