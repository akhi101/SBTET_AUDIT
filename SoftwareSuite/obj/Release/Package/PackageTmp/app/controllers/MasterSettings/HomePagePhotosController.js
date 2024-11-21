define(['app'], function (app) {
    app.controller("HomePagePhotosController", function ($scope, $http, $localStorage, $state, AppSettings, AdminService, PreExaminationService , MasterSettingsService) {
        const $ctrl = this;
        $ctrl.$onInit = () => {
            $scope.GetAllSlides()
        }


        $scope.UploadSignature = function () {
            if ($scope.ApplicationLetter == null || $scope.ApplicationLetter == "" || $scope.ApplicationLetter == undefined) {
                alert('Please Upload Photo')
                return;
            }
            var Sign = MasterSettingsService.UploadHomePageSlides($scope.FileName,$scope.ApplicationLetter);
            Sign.then(function (res) {
                var response = JSON.parse(res)
               
                if (response.Table[0].ResponseCode == '200') {
                    alert(response.Table[0].ResponseDescription)
                } else if (response.Table[0].ResponseCode == '400') {
                    alert(response.Table[0].ResponseDescription)
                } else {
                    alert("Something Went Wrong")
                }
            },
                function (error) {
                    alert("error while Data");
                    console.log(error);
                });
        }

        $scope.UploadApplication = function () {
            var input = document.getElementById("ApplicationLetter");
            var fileSize = input.files[0].size;

            //if (fileSize <= 3000000 && fileSize >= 700000) {
            if (input.files && input.files[0]) {
                $scope.FileName = input.files[0].name
                var reader = new FileReader();
                reader.readAsDataURL(input.files[0]);
                reader.onload = function (e) {
                    $('#ViewApplicationLetter').attr('src', e.target.result);

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

                        var base64Image1 = canvas.toDataURL("image/png");
                        $scope.ApplicationLetter1 = base64Image1;
                        var base64Img = canvas.toDataURL("image/png").replace(/^data:image\/[a-z]+;base64,/, "");
                        $scope.ApplicationLetter = base64Img;


                    });


                }
                reader.onerror = function (e) {
                    console.error("File could not be read! Code " + e.target.error.code);
                };

            }
            //} else if (fileSize <= 700000) {
            //    alert("file size should not be less than 700KB");
            //    $('#Aadhar').val('');
            //    return;
            //} else if (fileSize >= 3000000) {
            //    alert("file size should not be greater than 3MB");
            //    $('#Aadhar').val('');
            //    return;
            //} else {
            //    alert("file size should be between 1MB and 3MB");
            //    $('#Aadhar').val('');
            //    return;
            //}
        }

        $scope.GetAllSlides = function () {
        var getSlides = PreExaminationService.GetHomePageSlides();
        getSlides.then(function (response) {


            $scope.HomeSlides = response.Table;
            //  $scope.websiteCounts();
        },
            function (error) {

                alert("error while loading Slides");
                //alert("error while loading Notification");

                var err = JSON.parse(error);
            });
        }

        $scope.ChangeStatus = function (Id,Status) {
            var getSlides = PreExaminationService.SetHomePageSlidesStatus(Id, Status);
            getSlides.then(function (res) {
                var response = JSON.parse(res)
                if (response[0].ResponseCode == '200') {
                    alert(response[0].ResponseDescription)
                    $scope.GetAllSlides()
                } else if (response[0].ResponseCode == '400') {
                    alert(response[0].ResponseDescription)
                    $scope.GetAllSlides()
                } else {
                    alert("Something Went Wrong")
                }
            },
                function (error) {

                    alert("error while loading Slides");
                    //alert("error while loading Notification");

                    var err = JSON.parse(error);
                });
        }
    })
})