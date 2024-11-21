define(['app'], function (app) {
    app.controller("CircularsController", function ($scope, $http, $localStorage, $state, AppSettings, AdminService) {




        const $ctrl = this;


        $ctrl.$onInit = () => {
            $scope.imgLabel = true;
            $scope.getcirculars();
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

            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth() + 1; //January is 0!
            var yyyy = today.getFullYear();
            if (dd < 10) {
                dd = '0' + dd;
            }
            if (mm < 10) {
                mm = '0' + mm;
            }


            today = yyyy + '-' + mm + '-' + dd;

            $scope.today = today;
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
            var uploadexcl = AdminService.UpdateCircular($scope.updatepdffile, file.value.split("\\").pop(), data.Title, data.CircularTypeId, NotificationDate, data.ID);
            uploadexcl.then(function (res) {
                if (res[0].Code == '200') {
                    $scope.updatepdffile = '';
                    $scope.loading = false;
                    //$scope.error = false;
                    //$scope.data = true;
                    alert(res[0].Message)
                    $scope.getcirculars();
                }
            }, function (err) {
                $scope.loading = false;
                $scope.error = false;
                $scope.data = true;
            })
        }

        //$scope.location = window.location.origin;
        $scope.getcirculars = function () {

            $scope.loading = true;
            $scope.error = false;
            $scope.data = false;
            var getcircular = AdminService.getCircularsList();
            getcircular.then(function (res) {
                var response = JSON.parse(res)
                if (response.Table.length > 0) {
                    $scope.Circulars = response.Table;


                    for (var j = 0; j < $scope.Circulars.length; j++) {
                        var url = $scope.Circulars[j].Url
                        var filename = url.substring(url.lastIndexOf('/') + 1);
                        $scope.Circulars[j].NotificationDate = $scope.Circulars[j].NotificationDate.replace("T", " ");
                        $scope.Circulars[j].FileNmae = filename;
                    }

                    $scope.loading = false;
                    $scope.data = true;
                    $scope.error = false;
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


        $scope.deleteItem = function (id, usertype) {

            if (confirm("Are you sure you want to delete Circular?") == true) {
                var getcirculars = AdminService.DeleteCircular(id);
                getcirculars.then(function (response) {
                    if (response[0].Code == '200') {
                        alert(response[0].Message)
                        $scope.getcirculars();
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
            var switchcirculars = AdminService.SwitchCircular(Id, Value);
            switchcirculars.then(function (response) {
                if (response[0].Code == '200') {
                    alert(response[0].Message)
                    $scope.getcirculars();
                } else {

                }
            },
                function (error) {
                })
        }



        //$scope.usertypes = function () {
        //    var getusertypes = AdminService.getusertypes();
        //    getusertypes.then(function (response) {
        //        if (response.table.length > 0) {
        //            $scope.usertypes = response.table;
        //            //                    console.log(response.table)
        //            //var data = { id: 999, usertype: "exams portal" }
        //            //$scope.usertypes.push(data);

        //        } else {
        //            $scope.studenttype = [];
        //            alert("no data found");
        //        }
        //    },
        //        function (error) {
        //            alert("error while loading data");
        //            console.log(error);
        //        });
        //}
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

                    $scope.wesfile1 = canvas.toDataURL("application\/pdf\/zip").replace(/^data:application\/pdf\/zip+;base64,/, "");
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
            var uploadexcl = AdminService.uploadFile($scope.addpdffile, file.value.split("\\").pop(), $scope.Description, $scope.CircularType, notificationdate);
            uploadexcl.then(function (res) {
                if (res[0].Code == '200') {
                    $scope.loading = false;
                    //$scope.error = false;
                    //$scope.data = true;
                    alert(res[0].Message)
                    $scope.getcirculars();
                }
            }, function (err) {
                $scope.loading = false;
                $scope.error = false;
                $scope.data = true;
            })
        }



        var expanded = false;

        $scope.showcheckboxes = function () {
            var checkboxes = document.getelementbyid("checkboxes");
            if (!expanded) {
                checkboxes.style.display = "block";
                expanded = true;
            } else {
                checkboxes.style.display = "none";
                expanded = false;
            }
        }

        $scope.SetEndDate = function (StartDate) {

            if (StartDate !== null && StartDate !== undefined) {
                var d = StartDate.toISOString().slice(0, 10).split('-');
                d[2] = parseInt(d[2]);
                // d[2] = d[2] + 2; // offset time zone recovery
                var day = d[2];
                if (d[0].length === 4) {
                    var Start_date = d[0] + "-" + d[1] + "-" + d[2];
                }
            }
            //var date = new Date(Start_date);
            var indiaTime = new Date(StartDate).toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
            indiaTime = new Date(indiaTime);

            $scope.tomorrow = indiaTime.toLocaleString();
            //var time = indiaTime.toLocaleTimeString();
            //console.log(time);


            //var tomorrow = new Date($scope.tomorrow);
            //tomorrow.setDate(tomorrow.getDate() );
            
            var dates = new Date(indiaTime.toLocaleString());
            console.log(dates instanceof Date);
            if (dates == "Invalid Date" || dates == "" || dates == undefined) {
                var dates = new Date(d[0], d[1], d[2]);
                month = '' + (dates.getMonth() );
                day = '' + (dates.getDate()+1);
                year = dates.getFullYear();
            } else {
                month = '' + (dates.getMonth() + 1);
                day = '' + dates.getDate();
                year = dates.getFullYear();
            }

            //var time = new Date(tomorrow.toLocaleTimeString())
            //console.log(time)
           
           


            if (month.length < 2) month = '0' + month;
            if (day.length < 2) day = '0' + day;
            $scope.endDisable = false;
            $scope.enD = [year, month, day].join('-');

            document.getElementById("datetimepicker2").setAttribute("min", $scope.enD);

        };

        $scope.closecheckbox = function () {
            var checkboxes = document.getelementbyid("checkboxes");
            if (!expanded) {
                checkboxes.style.display = "block";
                expanded = true;
            } else {
                checkboxes.style.display = "none";
                expanded = false;
            }
        }

        $scope.toggleall = function () {
            var togglestatus = $scope.isallselected;
            angular.foreach($scope.usertypes, function (itm) { itm.selected = togglestatus; });
            $scope.arr = [];
            angular.foreach($scope.usertypes, function (value, key) {
                if (value.selected === true) {

                    $scope.arr.push({ "id": value.id })
                }

            });

        }

        $scope.optiontoggled = function (mid1list) {
            $scope.isallselected = $scope.usertypes.every(function (itm) { return itm.selected; })
            $scope.arr = [];
            angular.foreach($scope.usertypes, function (value, key) {
                if (value.selected === true) {

                    $scope.arr.push({ "id": value.id })
                }
            });


        }

    })
})