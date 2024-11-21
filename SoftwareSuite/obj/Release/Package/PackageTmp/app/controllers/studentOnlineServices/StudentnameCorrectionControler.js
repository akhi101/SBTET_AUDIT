define(['app'], function (app) {
    app.controller("StudentNameCorrectionControler", function ($scope, $http, $localStorage, $state, $stateParams, AppSettings, PreExaminationService) {

        $scope.getDetails = function (pin) {
            //alert(pin)
            var userData = PreExaminationService.getDetailsByPin(pin)
            userData.then(function (response) {
                var response = JSON.parse(response)
                console.log(response)
                if (response.Table[0].ResponseCode == '400') {
                    $scope.NoDataFound = true;
                    $scope.result = false;
                    alert(response.Table[0].ResponseDesription)
                }else{
                    $scope.result = true;
                    var data = response.Table[0]
                    $scope.Name = data.Name,
                    $scope.Pin = data.PIN
                    $scope.FatherName = data.FatherName
                    $scope.EmailId = data.EmailId
                    $scope.StudentContact = data.StudentContact
                }
            
            },
            function (error) {
                console.log(error)
                alert("No Data Found")
            })
        }

        $scope.uploadPhoto = function () {
            var input = document.getElementById("stdPhotoFile");
            var fileSize = input.files[0].size;
            console.log(fileSize);
            if (fileSize <= 100000) {
                if (input.files && input.files[0]) {
                    var reader = new FileReader();
                    reader.readAsDataURL(input.files[0]);
                    reader.onload = function (e) {
                        $('#stdPhotoImg').attr('src', e.target.result);

                        var canvas = document.createElement("canvas");
                        var imageElement = document.createElement("img");

                        imageElement.setAttribute = $('<img>', { src: e.target.result });
                        var context = canvas.getContext("2d");
                        imageElement.setAttribute.one("load", function () {
                            canvas.width = this.width;
                            canvas.height = this.height;
                            context.drawImage(this, 0, 0);
                            var base64Image = canvas.toDataURL("image/png");
                            $scope.studentMemo = base64Image;
                           // $scope.image = true;
                         //   console.log($scope.studentMemo)
                        });


                    }
                    reader.onerror = function (e) {
                        console.error("File could not be read! Code " + e.target.error.code);
                    };

                }
            }
            else {
                alert("file size should be less then 100kb ");
                return;
            }
        }

    })
})