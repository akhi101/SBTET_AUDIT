define(['app'], function (app) {
    app.controller("CreateDownloadsController", function ($scope, $http, $localStorage, $state, AppSettings, AdminService) {


        
        var $ctrl = this;
        $ctrl.$onInit = () => {
            $scope.imgLabel = true;
            $scope.getDownloads();
            //$scope.usertypes()
            //   var usertypeid = 1
            var getcirculartype = AdminService.getCircularTypes();
            getcirculartype.then(function (response) {
                if (response.Table.length > 0) {
                    $scope.CircularTypes = response.Table;

                } else {

                }
            },
                    function (error) {


                    });
        }

        $scope.getDownloads = function () {

            $scope.loading = true;
            $scope.error = false;
            $scope.data = false;
            var getcircular = AdminService.getDownloadsList();
            getcircular.then(function (response) {
                if (response.Table.length > 0) {
                    $scope.Circulars = response.Table;

                    $scope.loading = false;
                    $scope.data = true;
                    $scope.error = false;
                    for (var j = 0; j < $scope.Circulars.length; j++) {
                        var url = $scope.Circulars[j].Url
                        var filename = url.substring(url.lastIndexOf('/') + 1);
                        $scope.Circulars[j].NotificationDate = $scope.Circulars[j].NotificationDate.replace("T", " ");
                        $scope.Circulars[j].FileNmae = filename;
                    }

             
                    for (var j = 1; j < response.Table.length + 1; j++) {
                        $scope['edit' + j] = true;
                        $scope.edit = false
                    }
                } else {
                    $scope.loading = false;
                    $scope.data = false;
                    $scope.error = true;
                }
            },
                    function (error) {

                        console.log(error);
                        $scope.loading = false;
                        $scope.data = false;
                        $scope.error = true;
                    });
        }



        $scope.ChangeFile = function () {
            $scope.imgLabel = false;
        }


        $scope.uploadfiles = function (ele, val) {

            var value = val + 1
            var input = document.getElementById("studentFile" + value);
            var img = document.createElement("img");
            if (input.files && input.files[0]) {

                var reader = new FileReader();
                reader.readAsDataURL(input.files[0]);
                $scope.FileName = input.files[0].name
                var base64file = '';
                var canvas = document.createElement("canvas");
                reader.onload = function (ele) {
                    $('#studentFile' + value).attr('src', ele.target.result);

                    base64file = ele.target.result;
                    $scope.updatepdffile = base64file.replace(/^data:application\/pdf+;base64,/, "").replace(/^data:application\/zip+;base64,/, "").replace(/^data:image\/[a-z]+;base64,/, "").replace(/^data:application\/octet\-stream+;base64,/, "").replace(/^data:application\/x\-zip\-compressed+;base64,/, "").replace(/^data:application\/msword+;base64,/, "");

                    $scope.wesfile1 = canvas.toDataURL("application\/pdf").replace(/^data:application\/pdf+;base64,/, "");
                    ("image/png").replace(/^data:image\/[a-z]+;base64,/, "");

                }
                reader.onerror = function (e) {
                    console.error("File could not be read! Code " + e.target.error.code);
                };

            }

            //console.log($scope.updatepdffile)
        }

        $scope.uploadpdffiles = function () {
            var input = document.getElementById("Circular");

            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.readAsDataURL(input.files[0]);
                $scope.FileName = input.files[0].name
                var base64file;
                var canvas = document.createElement("canvas");
                reader.onload = function (ele) {
                    $('#Circular').attr('src', ele.target.result);

                    base64file = ele.target.result;
                    $scope.addpdffile = base64file.replace(/^data:application\/pdf+;base64,/, "").replace(/^data:application\/zip+;base64,/, "").replace(/^data:image\/[a-z]+;base64,/, "").replace(/^data:application\/octet\-stream+;base64,/, "").replace(/^data:application\/x\-zip\-compressed+;base64,/, "").replace(/^data:application\/msword+;base64,/, "");
             
                    $scope.wesfile1 = canvas.toDataURL("application\/pdf").replace(/^data:application\/pdf+;base64,/, "");
                    ("image/png").replace(/^data:image\/[a-z]+;base64,/, "");

                }
                reader.onerror = function (e) {
                    console.error("File could not be read! Code " + e.target.error.code);
                };

            }



        }


        $scope.OpenUrl = function (data) {

            //var url = window.location.href + '/odcdata';
            window.open(data, 'Download');
            //window.open(data);
        }


        $scope.SaveData = function () {
            var file = document.getElementById("Circular");

            if ($scope.CircularType == '' || $scope.CircularType == null || $scope.CircularType == undefined) {
                alert('please select circular type')
                return;
            }

            if ($scope.Description == '' || $scope.Description == null || $scope.Description == undefined) {
                alert('please enter description')
                return;
            }

            if ($scope.StartDate == '' || $scope.StartDate == null || $scope.StartDate == undefined) {
                alert('please select notification date')
                return;
            }
            if ($scope.addpdffile == '' || $scope.addpdffile == null || $scope.addpdffile == undefined) {
                alert('please upload file')
                return;
            }
            $scope.loading = true;
            $scope.error = false;
            $scope.data = false;
            var notificationdate = moment($scope.enD).format("YYYY-MM-DD HH:mm:ss.SSS");
            var uploadexcl = AdminService.UploadDownload($scope.addpdffile, file.value.split("\\").pop(), $scope.Description, $scope.CircularType, notificationdate);
            uploadexcl.then(function (res) {
                $scope.loading = false;
                if (res[0].ResponceCode == '200') {
                    $scope.loading = false;
                    //$scope.error = false;
                    //$scope.data = true;
                    alert(res[0].ReponceDescription)
                    $scope.getDownloads();
                }
            }, function (err) {
                $scope.loading = false;
                $scope.error = false;
                $scope.data = true;
            })
        }

        $scope.Editsemesterdat = function (data, ind) {

            var ele1 = document.getElementsByClassName("enabletable" + ind);
            for (var j = 0; j < ele1.length; j++) {
                ele1[j].style['pointer-events'] = "auto";
                ele1[j].style.border = "1px solid #ddd";
                ele1[j].style['-webkit-appearance'] = "auto";
                ele1[j].style['-moz-appearance'] = "auto";
            }
            $scope['edit' + ind] = false;

        }


        $scope.Cancelsemesterdat = function (data, ind) {
            $scope['edit' + ind] = true;
            var ele2 = document.getElementsByClassName("enabletable" + ind);
            for (var j = 0; j < ele2.length; j++) {
                ele2[j].style['pointer-events'] = "none";
                ele2[j].style.border = "0";
                ele2[j].style['-webkit-appearance'] = "none";
                ele2[j].style['-moz-appearance'] = "none";
            }
        }

        $scope.Updatesemesterdat = function (data, ind, Title) {

            var file = document.getElementById("studentFile" + ind);

            if ($scope.updatepdffile == '' || $scope.updatepdffile == null || $scope.updatepdffile == undefined) {
                $scope.updatepdffile = 'Empty'
                //alert('please upload file')
                //return;
            }
            if (data.Title == '' || data.Title == null || data.Title == undefined) {
                alert('please enter description')
                return;
            }
            if (data.CircularTypeId == '' || data.CircularTypeId == null || data.CircularTypeId == undefined) {
                alert('please select circular type')
                return;
            }
            if (data.NotificationDate == '' || data.NotificationDate == null || data.NotificationDate == undefined) {
                alert('please select notification date')
                return;
            }
            var NotificationDate = moment(data.NotificationDate).format("YYYY-MM-DD HH:mm:ss.SSS");
            var uploadexcl = AdminService.UpdateDownloads($scope.updatepdffile, file.value.split("\\").pop(), data.Title, data.CircularTypeId, NotificationDate, data.ID);
            uploadexcl.then(function (res) {
                if (res[0].ResponceCode == '200') {
                    $scope.updatepdffile = '';
                    $scope.loading = false;
                    //$scope.error = false;
                    //$scope.data = true;
                    alert(res[0].ReponceDescription)
                    $scope.getDownloads();
                }
            }, function (err) {
                $scope.loading = false;
                $scope.error = false;
                $scope.data = true;
            })
        }


        $scope.deleteItem = function (id, usertype) {

            if (confirm("Are you sure you want to delete Downloads?") == true) {
                var getDownloads = AdminService.DeleteDownloads(id);
                getDownloads.then(function (response) {
                    if (response[0].Code == '200') {
                        alert(response[0].Message)
                        $scope.getDownloads();
                    } else {

                    }
                },
                    function (error) {
                    })
            } else {
                userpreference = "save canceled!";

            }

        }

        $scope.Status = function (Id, Value) {
            var switchcirculars = AdminService.SwitchDownloads(Id, Value);
            switchcirculars.then(function (response) {
                if (response[0].Code == '200') {
                    alert(response[0].Message)
                    $scope.getDownloads();
                } else {

                }
            },
                function (error) {
                })
        }


    })
})