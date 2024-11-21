define(['app'], function (app) {
    app.controller("BackLogStudentDetailsController", function ($scope, $http, $localStorage, $state, $stateParams, AppSettings, PreExaminationService) {

        var authdata = $localStorage.authorizationData;
        $scope.dataPresent = false;
        $scope.hide = false;
        if (authdata.SystemUserTypeId != 3) {
            $scope.hide = true;
        }
        $scope.PreDisable = true;
        var LoadExamTypeBysem = PreExaminationService.getStudentType();
        LoadExamTypeBysem.then(function (response) {
            if (response.Table.length > 0) {
                $scope.StudentType = response.Table;
            } else {
                $scope.StudentType = [];
                alert("No Student found on this Record");
            }
        },
            function (error) {
                alert("error while loading Student Types");
                console.log(error);
            });




        $scope.uploadPhoto = function () {
            var input = document.getElementById("stdPhotoFile");
            var fileSize = input.files[0].size;
            if (fileSize <= 200000) {
                if (input.files && input.files[0]) {
                    var reader = new FileReader();
                    reader.readAsDataURL(input.files[0]);
                    reader.onload = function (e) {
                        $('#stdPhotoImg').attr('src', e.target.result);

                        var canvas = document.createElement("canvas");
                        var imageElement = document.createElement("img");

                        imageElement.setAttribute = $('<img>', {
                            src: e.target.result
                        });
                        var context = canvas.getContext("2d");
                        imageElement.setAttribute.one("load", function () {
                            canvas.width = this.width;
                            canvas.height = this.height;
                            context.drawImage(this, 0, 0);

                            var base64Image = canvas.toDataURL("image/png");

                            $scope.StudentReg.profilephoto = base64Image;

                        });


                    }


                }
            }
            else {
                alert("file size should be less then 200kb ");
            }
        }


        $scope.uploadingImage = function () {
            console.log($scope.StudentReg.profilephoto);
            console.log($scope.pinNumber);
            var setData = PreExaminationService.setBackLogData($scope.pinNumber, parseInt(authdata.SystemUserTypeId), $scope.StudentReg.profilephoto);
            setData.then(function (rev) {
                rev = JSON.parse(rev);
                if (rev.Table.length > 0) {
                    if (rev.Table[0].ResponceCode == 200) {
                        $scope.dataPresent = false;
                        alert(rev.Table[0].ResponceDescription);
                    }
                    $scope.dataPresent = true;
                }

            }, function (err) { });
        }

        $scope.getStudentDetails = function (pin) {
            if (pin !== undefined) {
                $scope.pinNumber = pin;
                var getData = PreExaminationService.getBackLogData(pin.toString(), parseInt(authdata.SystemUserTypeId));
                getData.then(function (rev) {
                    rev = JSON.parse(rev);
                    if (rev.Table.length > 0) {
                        $scope.StudentReg = rev.Table[0];
                        $scope.dataPresent = true;
                    }
                    else {
                        alert("Enter Appropriate PIN OR No data Found");
                    }

                }, function (err) { alert("Enter Appropriate PIN"); });
            } else
                alert("Enter PIN");
        }

    });
});