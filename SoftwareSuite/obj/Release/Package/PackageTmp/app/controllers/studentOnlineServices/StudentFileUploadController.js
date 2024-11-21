define(['app'], function (app) {
    app.controller("StudentFileUploadController", function ($scope, $http, $localStorage, $state, $stateParams, AppSettings, $uibModal, $timeout, PaymentService, PreExaminationService) {


        $scope.SubmitPin = function () {
            if ($scope.PinNumber.length > 9 && $scope.PinNumber.length < 15) {
                var GetPinStatus = PreExaminationService.getFileUploadDetails($scope.PinNumber);
                GetPinStatus.then(function (res) {
                    try {
                        var response = JSON.parse(res);
                        console.log(response)
                    } catch (err) { }

                    if (response.Table2[0].ResponceCode == '200') {
                        $scope.StudentData = response.Table[0];
                        //alert(response.Table[0].ResponceDescription);
                        $scope.FilesCard = true;
                        $scope.NoData = false;
                        $scope.NoDataFound = false;

                    } else if (response.Table2[0].ResponceCode == '400') {
                        alert(response.Table2[0].ResponceDescription);
                        $scope.Response = response.Table2[0].ResponceDescription;
                        $scope.NoDataFound = true;
                        $scope.FilesCard = false;
                        $scope.NoData = false;
                       
                    } else {
                       
                    }
                }, function (err) {
                    $scope.FilesCard = false;
                    $scope.Data = false;
                    $scope.NoDataFound = false;
                    $scope.NoData = true;
                });
            } else {
                $scope.FilesCard = false;
                alert('Please Enter Valid PIN')
            }
        }



        var tempId = [];

        $scope.uploadfiles = function (ele, val) {
            var input = document.getElementById("studentFile" + val);
            var fileSize = input.files[0].size;
            if (fileSize <= 1000000) {
                if (input.files && input.files[0]) {
                    var reader = new FileReader();
                    reader.readAsDataURL(input.files[0]);
                    reader.onload = function (ele) {
                        $('#studentFile' + val).attr('src', ele.target.result);
                        var canvas = document.createElement("canvas");
                        var imageElement = document.createElement("img");
                        imageElement.setAttribute = $('<img>', { src: ele.target.result });
                        var context = canvas.getContext("2d");
                        imageElement.setAttribute.one("load", function () {
                            canvas.width = this.width;
                            canvas.height = this.height;
                            context.drawImage(this, 0, 0);
                            var base64Image = canvas.toDataURL("image/png").replace(/^data:image\/[a-z]+;base64,/, "");

                            if ($scope.studentfilearr.length > 0) {
                                $scope.studentfilearr.map((obj) => {
                                    if (obj.fileindex == val) {
                                        obj.file = base64Image;
                                    }
                                });
                            }

                        });


                    }
                    reader.onerror = function (ele) {
                        console.error("File could not be read! Code " + ele.target.error.code);
                    };

                }
            }
            else {
                alert("file size should be less then 1000kb ");
                return;
            }
        }


        $scope.addfilData = function (fileindex, file) {
            return {
                fileindex: fileindex,
                file: file,
            };
        }


        $scope.studentfilearr = [];
        $scope.studentfilearr = [
            {
                fileindex: 0,
                file: "",
            },
            {
                fileindex: 1,
                file: ""
            },
            {
                fileindex: 2,
                file: ""
            }
        ];
        if ($scope.studentfilearr.length == 1) {
            $scope.DeleteDisable = true;
        } else {
            $scope.DeleteDisable = false;
        }

        $scope.addUser = function () {


            if ($scope.studentfilearr.length == 0) {
                $scope.DeleteDisable = true;
            } else {
                $scope.DeleteDisable = false;
            }

            if ($scope.studentfilearr.length < 12) {
                $scope.studentfilearr.push(
                    {
                        fileindex: $scope.studentfilearr.length,
                        file: "",
                    }
                    );
                $scope.studentfilearr = $scope.studentfilearr.map(function (arr, ind) {
                    arr.fileindex = ind;
                    return arr;
                });
              
            } else {
                alert('maximum files limit reached');
            }
            if ($scope.studentfilearr.length < 2 || $scope.studentfilearr.length > 13) {
                $scope.buttonEnable = false
            } else {
                $scope.buttonEnable = true
            }
            console.log($scope.studentfilearr);
        }

        $scope.removeUser = function (val) {
            var item = document.getElementById('userfile' + val);
            item.parentNode.removeChild(item);
            $scope.studentfilearr.splice(val, 1);
            console.log($scope.studentfilearr);
            if ($scope.studentfilearr.length < 2 || $scope.studentfilearr.length > 13) {
                $scope.buttonEnable = false
            } else {
                $scope.buttonEnable = true
            }
        }


        $scope.AddData = function () {
          
            $scope.studentfilearr = $scope.studentfilearr.filter(function (item) {
                if (item.file != "") {
                    return item;
                }
            });
            if ($scope.studentfilearr.length < 2 || $scope.studentfilearr.length > 13) {
                alert("Please upload the minimum number of certificates.");
                return;
            }
            if ($scope.studentfilearr == null || angular.isUndefined($scope.studentfilearr)) {
                alert("Files format not supported, Please upload in jpg format.");
                return;
            }

            var req = {
                "PIN": $scope.PinNumber == null || angular.isUndefined($scope.PinNumber) ? "" : angular.uppercase($scope.PinNumber),
                "filedata": $scope.studentfilearr == null || angular.isUndefined($scope.studentfilearr) ? "" : $scope.studentfilearr,
               
            }

            var AddUserData = PreExaminationService.UpdateOldStudentData(req);
            AddUserData.then(function (response) {

                if (response.Table[0].ResponceCode == '200') {
                    alert(response.Table[0].ResponceDescription);
                    $state.go('Dashboard.PostExam');
                  
                } else {
                    $scope.loading = false;
                    alert("Request sent Failed")
                    $scope.reports = false;
                    $scope.Noreports = true;
                }

            },
                function (error) {
                    $scope.loading = false;
                    $scope.reports = false;
                    $scope.Noreports = true;
                    alert("error while loading data");
                });


        }


    })
})
