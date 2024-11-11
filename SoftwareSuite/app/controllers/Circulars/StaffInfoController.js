define(['app'], function (app) {
    app.controller("StaffInfoController", function ($scope, $state, $stateParams, AppSettings, AdminService) {

        const $ctrl = this;

        $ctrl.$onInit = () => {
            $scope.imgLabel = true;
            $scope.getStaffList();
            //$scope.usertypes()
            //   var usertypeid = 1
        
            var getcirculartype = AdminService.GetStaffTypes();
            getcirculartype.then(function (response) {
                if (response.Table.length > 0) {
                    $scope.StaffTypes = response.Table;

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

        $scope.ChangeFile = function () {
            $scope.imgLabel = false;
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

            if (data.Name == '' || data.Name == null || data.Name == undefined) {
                alert('please select Name')
                return;
            }

            if (data.Designation == '' || data.Designation == null || data.Designation == undefined) {
                alert('please enter Designation')
                return;
            }
            if (data.Subject == '' || data.Subject == null || data.Subject == undefined) {
                alert('please enter Subject')
                return;
            }
            if (data.SectionId == '' || data.SectionId == null || data.SectionId == undefined) {
                alert('please Select Section')
                return;
            }
            if (data.email == '' || data.email == null || data.email == undefined) {
                alert('please enter Email')
                return;
            }

            if (data.MobileNumber == '' || data.MobileNumber == null || data.MobileNumber == undefined) {
                alert('please Enter Mobile Number')
                return;
            }
           
            if ($scope.UpdatedImage == '' || $scope.UpdatedImage == null || $scope.UpdatedImage == undefined) {
                $scope.UpdatedImage = 'Empty'
                //alert('please upload file')
                //return;
            }
         
            var uploadexcl = AdminService.UpdateStaffInfo(data.Name, $scope.UpdatedImage, data.Designation,data.Subject,data.SectionId,data.email,data.MobileNumber, file.value.split("\\").pop(),data.Id);
            uploadexcl.then(function (res) {
                if (res[0].Code == '200') {
                    $scope.loading = false;
                    $scope.UpdatedImage = "";
                    //$scope.error = false;
                    //$scope.data = true;
                    alert(res[0].Message)
                    $scope.getStaffList();
                }
            }, function (err) {
                $scope.loading = false;
                $scope.error = false;
                $scope.data = true;
            })
        }

        //$scope.location = window.location.origin;
        $scope.getStaffList = function () {

            $scope.loading = true;
            $scope.error = false;
            $scope.data = false;
            var getcircular = AdminService.getStaffList();
            getcircular.then(function (response) {
                //var response = JSON.parse(res)
                if (response.Table.length > 0) {
                    $scope.StaffList = response.Table;
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

            if (confirm("Are you sure you want to delete Staff?") == true) {
                var getStaffList = AdminService.DeleteStaff(id);
                getStaffList.then(function (response) {
                    if (response[0].Code == '200') {
                        alert(response[0].Message)
                        $scope.getStaffList();
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
            var switchcirculars = AdminService.SwitchStaff(Id, Value);
            switchcirculars.then(function (response) {
                if (response[0].Code == '200') {
                    alert(response[0].Message)
                    $scope.getStaffList();
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



        $scope.uploadfiles = function (ele, val) {
            var value = val + 1
            var input = document.getElementById("studentFile" + value);
            var img = document.createElement("img");
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.readAsDataURL(input.files[0]);
                reader.onload = function (e) {
                    $('#studentFile' + value).attr('src', e.target.result);

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
                        var base64Image1 = canvas.toDataURL("image/png").replace(/^data:image\/[a-z]+;base64,/, "");
                        var base64Image = canvas.toDataURL("image/png");
                        $scope.UpdatedImage = base64Image1;
                        $scope.userPhoto = base64Image;

                    });

                   
                }
                reader.onerror = function (e) {
                    console.error("File could not be read! Code " + e.target.error.code);
                };

            }
            $scope.imgLabel = false;
        }

        $scope.uploadpdffiles = function () {
            var input = document.getElementById("Circular");

            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.readAsDataURL(input.files[0]);
                reader.onload = function (e) {
                    $('#Circular').attr('src', e.target.result);

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
                        var base64Image1 = canvas.toDataURL("image/png").replace(/^data:image\/[a-z]+;base64,/, "");
                        var base64Image = canvas.toDataURL("image/png");
                        $scope.addpdffile = base64Image1;
                        $scope.userPhoto = base64Image;

                    });

                    console.log($scope.addpdffile)
                }
                reader.onerror = function (e) {
                    console.error("File could not be read! Code " + e.target.error.code);
                };


                //var reader = new FileReader();
                //reader.readAsDataURL(input.files[0]);
                //$scope.FileName = input.files[0].name
                //var base64file;
                //var canvas = document.createElement("canvas");
                //reader.onload = function (ele) {
                //    $('#Circular').attr('src', ele.target.result);

                //    base64file = ele.target.result;
                //    $scope.addpdffile = base64file.replace(/^data:image\/png+;base64,/, "");;

                //    $scope.wesfile1 = canvas.toDataURL("image/png").replace(/^data:image\/png+;base64,/, "");
                //    ("image/png").replace(/^data:image\/[a-z]+;base64,/, "");

                //}
                //reader.onerror = function (e) {
                //    console.error("File could not be read! Code " + e.target.error.code);
                //};

            }



        }


        $scope.OpenUrl = function (data) {

            //var url = window.location.href + '/odcdata';
            window.open(data, 'Download');
            //window.open(data);
        }


        $scope.Submit = function () {
            var file = document.getElementById("Circular");

            if ($scope.Name == '' || $scope.Name == null || $scope.Name == undefined) {
                alert('please select Name')
                return;
            }

            if ($scope.Designation == '' || $scope.Designation == null || $scope.Designation == undefined) {
                alert('please enter Designation')
                return;
            }

            if ($scope.MobileNumber == '' || $scope.MobileNumber == null || $scope.MobileNumber == undefined) {
                alert('please select Mobile Number')
                return;
            }
            if ($scope.addpdffile == '' || $scope.addpdffile == null || $scope.addpdffile == undefined) {
                alert('please upload file')
                return;
            }
            
            if ($scope.Section == '' || $scope.Section == null || $scope.Section == undefined) {
                alert('please Select Section')
                return;
            }
            if ($scope.Subject == '' || $scope.Subject == null || $scope.Subject == undefined) {
                alert('please Enter Subject')
                return;
            }
            if ($scope.Email == '' || $scope.Email == null || $scope.Email == undefined) {
                alert('please Enter Email')
                return;
            }
            $scope.loading = true;
            $scope.error = false;
            $scope.data = false;
            //var notificationdate = moment($scope.enD).format("YYYY-MM-DD HH:mm:ss.SSS");
            
            var uploadexcl = AdminService.UploadStaffInfo($scope.Name, $scope.addpdffile, $scope.Designation, $scope.MobileNumber, $scope.Section, $scope.Subject, $scope.Email, file.value.split("\\").pop());
            uploadexcl.then(function (res) {
                if (res[0].Code == '200') {
                    $scope.loading = false;
                    $scope.error = false;
                    $scope.data = true;
                    alert(res[0].Message)
                    $scope.getStaffList();
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
            //var time = new Date(tomorrow.toLocaleTimeString())
            //console.log(time)
            month = '' + (dates.getMonth() + 1);
            day = '' + dates.getDate();
            year = dates.getFullYear();


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
    });
});
