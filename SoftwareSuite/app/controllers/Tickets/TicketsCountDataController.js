define(['app'], function (app) {
    app.controller("TicketsCountDataController", function ($scope, $uibModal, $http, $localStorage, $state, AppSettings, AdminService) {


        var authData = $localStorage.authorizationData;
        var tmpData = $localStorage.TempData;
        $scope.UserName = authData.userName;
        $scope.UserTypeID = authData.SystemUserTypeId;
        $scope.DataType = tmpData.DataType;
        //$scope.UserName = tmpData.UserName;


        if (tmpData.DataType == '1' && ($scope.UserName == 'ADMIN' || $scope.UserName == 'ASIT' || $scope.UserName == 'IT_TEAM')) {
            $scope.SAPending = true;
            $scope.RemarksText = true;
            $scope.RejectButton = true;
            $scope.ReviseButton = true;
            $scope.ApproveButton = true;
            $scope.CloseButton = true;
            $scope.DeleteButton = true;
        }
        else if (tmpData.DataType == '2' && ($scope.UserName == 'ADMIN' || $scope.UserName == 'ASIT' || $scope.UserName != 'IT_TEAM')) {
            $scope.SAApproved = true;
            $scope.IssueFile = true;
            $scope.saremarkslabel = true;
            $scope.sadatelabel = true;
            //$scope.ResolvedFile = true;




        }

        else if (tmpData.DataType == '3' && ($scope.UserName == 'ADMIN' || $scope.UserName == 'ASIT' || $scope.UserName != 'IT_TEAM')) {
            $scope.SAUnderProcess = true;
            $scope.worklabel = true;
            $scope.filenamelabel = true;
            $scope.IssueFile = true;
            $scope.saremarkslabel = true;
            $scope.sadatelabel = true;
            //$scope.ResolvedFile = true;

        }
        else if (tmpData.DataType == '4' && ($scope.UserName == 'ADMIN' || $scope.UserName == 'ASIT' || $scope.UserName == 'IT_TEAM')) {
            $scope.SACompleted = true;
            $scope.worklabel = true;
            $scope.filenamelabel = true;
            $scope.completelabel = true;
            $scope.statusupddatelabel = true;
            $scope.IssueFile = true;
            $scope.ResolvedFile = true;
            $scope.saremarkslabel = true;
            $scope.sadatelabel = true;

        }



        else if (tmpData.DataType == '1' && $scope.UserName == 'IT_TEAM') {
            $scope.AdmPending = true;
            $scope.DeleteButton = true;

        }

        else if (tmpData.DataType == '2' && $scope.UserName == 'IT_TEAM') {
            $scope.AdmApproved = true;
            $scope.AssignedToTextBox = true;
            $scope.UpdateButton = true;
            $scope.IssueFile = true;
            $scope.saremarkslabel = true;
            $scope.sadatelabel = true;
            //$scope.ResolvedFile = true;
        }
        else if (tmpData.DataType == '3' && $scope.UserName == 'IT_TEAM') {
            $scope.AdmUnderProcess = true;
            $scope.updateButton = true;
            $scope.TaskFile = true;
            $scope.CompletionStatus = true;
            $scope.worklabel = true;
            $scope.filenamelabel = true;
            $scope.IssueFile = true;
            $scope.RemarksStatus = true;
            $scope.saremarkslabel = true;
            $scope.sadatelabel = true;
            //$scope.ResolvedFile = true;
        }
        else if (tmpData.DataType == '4' && $scope.UserName == 'IT_TEAM') {
            $scope.AdmCompleted = true;
            $scope.worklabel = true;
            $scope.filenamelabel = true;
            $scope.completelabel = true;
            $scope.statusupddatelabel = true;
            $scope.IssueFile = true;
            $scope.ResolvedFile = true;
            $scope.saremarkslabel = true;
            $scope.sadatelabel = true;

        }

        else if ((tmpData.DataType == '1' && ($scope.UserName != 'ADMIN' && $scope.UserName != 'IT_TEAM' && $scope.UserName != 'ASIT'))) {
            $scope.GenUsersPending = true;
            $scope.DeleteButton = true;

        }

        else if ((tmpData.DataType == '2' && ($scope.UserName != 'ADMIN' && $scope.UserName != 'IT_TEAM' && $scope.UserName != 'ASIT'))) {
            $scope.GenUsersApproved = true;
            $scope.IssueFile = true;
            $scope.saremarkslabel = true;
            $scope.sadatelabel = true;
            //$scope.ResolvedFile = true;

        }
        else if ((tmpData.DataType == '3' && ($scope.UserName != 'ADMIN' && $scope.UserName != 'IT_TEAM' && $scope.UserName != 'ASIT' ))) {
            $scope.GenUsersUnderProcess = true;
            $scope.worklabel = true;
            $scope.filenamelabel = true;
            $scope.IssueFile = true;
            $scope.saremarkslabel = true;
            $scope.sadatelabel = true;
            //$scope.ResolvedFile = true;

        }
        else if ((tmpData.DataType == '4' && ($scope.UserName != 'ADMIN' && $scope.UserName != 'IT_TEAM' && $scope.UserName != 'ASIT'))) {
            $scope.GenUsersCompleted = true;
            $scope.worklabel = true;
            $scope.filenamelabel = true;
            $scope.completelabel = true;
            $scope.statusupddatelabel = true;
            $scope.IssueFile = true;
            $scope.ResolvedFile = true;
            $scope.saremarkslabel = true;
            $scope.sadatelabel = true;
        }


        //if (tmpData.UserName == 'ADMIN') {
        //    $scope.UserName == tmpData.UserName;
        //}
        //else if (tmpData.UserName == 'EliteSoft') {
        //    $scope.UserName == tmpData.UserName;
        //}
        //else {
        //    $scope.UserName == tmpData.UserName;
        //}

        const $ctrl = this;


        $ctrl.$onInit = () => {
            $scope.imgLabel = true;
            $scope.getTicketsCountData();


            //if (tmpData.DataType = 1) {
            //    $scope.Status = 'Pending'
            //}
            //else if (tmpData.DataType = 2) {
            //    $scope.Status = 'Approved'
            //}
            //else if (tmpData.DataType = 3) {
            //    $scope.Status = 'UnderProcess'
            //}
            //else if (tmpData.DataType = 4) {
            //    $scope.Status = 'Completed'
            //}
            // $scope.CurrentDate = new Date();

            if (tmpData.UserName == 'ADMIN' || tmpData.UserName == 'Elitesoft') {
                $scope.ActiveData = false;
                $scope.DownloadButton = false;
                //$scope.DeleteButton = false;
                $scope.User = true;

            }
            else {
                $scope.ActiveData = true;
                $scope.DownloadButton = true;
                //$scope.DeleteButton = true;
                $scope.User = false;
            }


            var getcirculartype = AdminService.getCircularTypes();
            getcirculartype.then(function (response) {
                if (response.Table.length > 0) {
                    $scope.CircularTypes = response.Table;

                } else {

                }
            },
                function (error) {


                });

            var gettasktype = AdminService.getTaskTypes();
            gettasktype.then(function (response) {
                if (response.Table.length > 0) {
                    $scope.TaskTypes = response.Table;

                } else {

                }
            },
                function (error) {


                });


            var getproject = AdminService.getProjects();
            getproject.then(function (response) {
                if (response.Table.length > 0) {
                    $scope.Projects = response.Table;

                } else {
                    $scope.Projects = [];

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








        //$scope.location = window.location.origin;
        $scope.loading = true;
        $scope.getTicketsCountData = function () {
            var getticketdata = AdminService.GetTicketsCountData(tmpData.DataType, $scope.UserName, tmpData.UserName, tmpData.ProjectID);
            getticketdata.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch {

                }
                if (res.Table.length > 0) {
                    $scope.loading = false;
                    $scope.TasksData = res.Table;
                    //$scope.File = res.Table[0].Url;
                    //if ($scope.File != "") {
                    //    $scope.DownloadButton = true;
                    //}
                    //else {
                    //    $scope.DownloadButton = false;
                    //}
                } else {
                    $scope.loading = false;

                    $scope.TasksData = [];
                    $state.go('Dashboard.Tickets');

                }
            },
                function (error) {
                    $scope.loading = false;


                });
        }

        $scope.editAdmTicketData = function (TaskID) {
            var getticket = AdminService.EditTicketData(2, tmpData.UserName, TaskID);
            getticket.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch {

                }
                if (res.Table.length > 0) {
                    $scope.EditData = res.Table[0];
                    var url = $scope.EditData.TicketFilePath;
                    $scope.URL = $scope.EditData.TicketFilePath;
                    $scope.UpdatedFile = $scope.EditData.UpdatedFile;
                    var filename = url.substring(url.lastIndexOf('/') + 1);
                    $scope.EditData.FileNmae = filename;

                } else {
                    $scope.EditData = [];
                }
            },
                function (error) {


                });

            $scope.modalInstance = $uibModal.open({
                templateUrl: "/app/views/Popups/EditTicketsDataPopup.html",
                size: 'xlg',
                scope: $scope,
                backdrop: 'static',
                //windowClass: 'modal-fit-att',
            });

            $scope.closeModal = function () {
                $scope.modalInstance.close();
            }
        }

        $scope.editTicketData = function (TaskID) {
            var getticket = AdminService.EditTicketData(2, tmpData.UserName, TaskID);
            getticket.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch {

                }
                if (res.Table.length > 0) {
                    $scope.EditData = res.Table[0];
                    var url = $scope.EditData.TicketFilePath;
                    $scope.URL = $scope.EditData.TicketFilePath;
                    $scope.UpdatedFile = $scope.EditData.UpdatedFile;
                    var filename = url.substring(url.lastIndexOf('/') + 1);
                    $scope.EditData.FileNmae = filename;

                } else {
                    $scope.EditData = [];
                }
            },
                function (error) {


                });

            $scope.modalInstance = $uibModal.open({
                templateUrl: "/app/views/Popups/EditTicketsPopup.html",
                size: 'xlg',
                scope: $scope,
                backdrop: 'static',
                //windowClass: 'modal-fit-att',
            });

            $scope.closeModal = function () {
                $scope.modalInstance.close();
            }
        }


        $scope.DownloadFile = function () {
            //var location = $scope.URL;
            //window.location.href = location;
            window.open($scope.URL, 'Download');

        }

        $scope.DownloadFile1 = function () {
            //var location = $scope.URL;
            //window.location.href = location;
            window.open($scope.UpdatedFile, 'Download');

        }


        $scope.deleteItem = function (TaskID) {

            if (confirm("Are you sure you want to delete Ticket or Task?") == true) {
                var DataType = 3;
                var deletetask = AdminService.DeleteTicketsData(DataType, 0, TaskID);
                deletetask.then(function (response) {
                    try {
                        var Res = JSON.parse(response)
                    }
                    catch { }
                    if (Res.Table[0].StatusCode == '200') {
                        alert(Res.Table[0].StatusDescription);
                        $state.go('Dashboard.Tickets');
                        $scope.getTicketsCountData();
                    } else {

                    }
                },
                    function (error) {
                    })
            } else {
                userpreference = "save canceled!";

            }

        }





        $scope.ChangeFile = function () {
            $scope.imgLabel = false;
        }


        $scope.uploadfiles = function () {
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
                    $scope.updatepdffile = base64file.replace(/^data:application\/pdf+;base64,/, "").replace(/^data:application\/x-compressed;base64,/, "").replace(/^data:application\/zip+;base64,/, "").replace(/^data:image\/[a-z]+;base64,/, "").replace(/^data:application\/octet\-stream+;base64,/, "").replace(/^data:application\/x\-zip\-compressed+;base64,/, "").replace(/^data:application\/msword+;base64,/, "").replace(/^data:application\/doc+;base64,/, "").replace(/^data:application\/docx+;base64,/, "").replace(/^data:application\/vnd\.openxmlformats-officedocument\.spreadsheetml\.sheet;base64,/, "");
                    $scope.wesfile1 = canvas.toDataURL("application\/pdf").replace(/^data:application\/pdf+;base64,/, "");
                    ("image/png").replace(/^data:image\/[a-z]+;base64,/, "");

                }
                reader.onerror = function (e) {
                    console.error("File could not be read! Code " + e.target.error.code);
                };

            }



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

            if ($scope.Project == '' || $scope.Project == null || $scope.Project == undefined) {
                alert('please select Project')
                return;
            }

            if ($scope.TaskType == '' || $scope.TaskType == null || $scope.TaskType == undefined) {
                alert('please select Task Type')
                return;
            }

            if ($scope.Description == '' || $scope.Description == null || $scope.Description == undefined) {
                alert('please enter description')
                return;
            }

            //if ($scope.StartDate == '' || $scope.StartDate == null || $scope.StartDate == undefined) {
            //    alert('please select notification date')
            //    return;
            //}
            //if ($scope.addpdffile == '' || $scope.addpdffile == null || $scope.addpdffile == undefined) {
            //    alert('please upload file')
            //    return;
            //}
            $scope.loading = true;
            $scope.error = false;
            $scope.data = false;
            var currentdate = moment($scope.CurrentDate).format("YYYY-MM-DD HH:mm:ss.SSS");
            var addtickets = AdminService.AddTickets(1, 0, $scope.TaskType, $scope.Project, $scope.Description, $scope.addpdffile, file.value.split("\\").pop(), currentdate, null, 1, $scope.UserName);
            addtickets.then(function (res) {
                if (res[0].StatusCode == '200') {
                    $scope.loading = false;
                    //$scope.error = false;
                    //$scope.data = true;
                    alert(res[0].StatusDescription)
                    $scope.getTicketsCountData();
                }
                if (res[0].StatusCode == '400') {
                    $scope.loading = false;
                    //$scope.error = false;
                    //$scope.data = true;
                    alert(res[0].StatusDescription)
                    $scope.getTicketsCountData();
                }
            }, function (err) {
                $scope.loading = false;
                $scope.error = false;
                $scope.data = true;
            })
        }

        $scope.UpdateDetails = function (data) {
            var file = document.getElementById("Circular");

            if (data.ProjectID == '' || data.ProjectID == null || data.ProjectID == undefined) {
                alert('please select Project')
                return;
            }

            if (data.TaskTypeID == '' || data.TaskTypeID == null || data.TaskTypeID == undefined) {
                alert('please select Task Type')
                return;
            }

            if (data.TaskDescription == '' || data.TaskDescription == null || data.TaskDescription == undefined) {
                alert('please enter description')
                return;
            }
            if ($scope.updatepdffile == '' || $scope.updatepdffile == null || $scope.updatepdffile == undefined) {
                var DataType = 3;
            }
            else if ($scope.updatepdffile != '' || $scope.updatepdffile != null || $scope.updatepdffile != undefined) {
                var DataType = 2;
            }




            var currentdate = moment(data.CurrentDate).format("YYYY-MM-DD HH:mm:ss.SSS");
            var updatetickets = AdminService.UpdateTickets(DataType, data.TaskID, data.TaskTypeID, data.ProjectID, data.TaskDescription, $scope.updatepdffile, file.value.split("\\").pop(), currentdate, null, data.Active, data.UserName);
            updatetickets.then(function (res) {
                if (res[0].StatusCode == '200') {
                    //$scope.updatepdffile = '';
                    $scope.modalInstance.close();
                    $scope.loading = false;
                    //$scope.error = false;
                    //$scope.data = true;
                    alert(res[0].StatusDescription)
                    $scope.getTicketsCountData();
                }
                if (res[0].StatusCode == '400') {
                    $scope.loading = false;
                    $scope.modalInstance.close();
                    //$scope.error = false;
                    //$scope.data = true;
                    alert(res[0].StatusDescription);
                    $scope.getTicketsCountData();
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

        $scope.Approve = function (data, Remarks) {
            var Status = 1
            var updatecountsdata = AdminService.UpdateCountsData(data.TaskID, Status, Remarks);
            updatecountsdata.then(function (res) {
                if (res[0].StatusCode == '200') {
                    $scope.modalInstance.close();
                    $scope.loading = false;
                    alert(res[0].StatusDescription);
                    $state.go('Dashboard.Tickets');
                    $scope.getTicketsCountData();
                }
                if (res[0].StatusCode == '400') {
                    $scope.loading = false;
                    $scope.modalInstance.close();
                    alert(res[0].StatusDescription);
                    $scope.getTicketsCountData();
                }
            }, function (err) {
                $scope.loading = false;
                $scope.error = false;
                $scope.data = true;
            })
        }

        $scope.Revise = function (data, Remarks) {

            if (Remarks == '' || Remarks == null || Remarks == undefined) {
                alert('please Enter Remarks')
                return;
            }

            var Status = 2
            var updatecountsdata = AdminService.UpdateCountsData(data.TaskID, Status, Remarks);
            updatecountsdata.then(function (res) {
                if (res[0].StatusCode == '200') {
                    $scope.modalInstance.close();
                    $scope.loading = false;
                    alert(res[0].StatusDescription);
                    $state.go('Dashboard.Tickets');
                    $scope.getTicketsCountData();
                }
                if (res[0].StatusCode == '400') {
                    $scope.loading = false;
                    $scope.modalInstance.close();
                    alert(res[0].StatusDescription);
                    $scope.getTicketsCountData();
                }
            }, function (err) {
                $scope.loading = false;
                $scope.error = false;
                $scope.data = true;
            })
        }

        $scope.Reject = function (data, Remarks) {

            if (Remarks == '' || Remarks == null || Remarks == undefined) {
                alert('please Enter Remarks')
                return;
            }

            var Status = 3
            var updatecountsdata = AdminService.UpdateCountsData(data.TaskID, Status, Remarks);
            updatecountsdata.then(function (res) {
                if (res[0].StatusCode == '200') {
                    $scope.modalInstance.close();
                    $scope.loading = false;
                    alert(res[0].StatusDescription);
                    $state.go('Dashboard.Tickets');
                    $scope.getTicketsCountData();
                }
                if (res[0].StatusCode == '400') {
                    $scope.loading = false;
                    $scope.modalInstance.close();
                    alert(res[0].StatusDescription);
                    $scope.getTicketsCountData();
                }
            }, function (err) {
                $scope.loading = false;
                $scope.error = false;
                $scope.data = true;
            })
        }

        $scope.Close = function () {
            $scope.modalInstance.close();
        }


        $scope.updateWorkAssignedTo = function (data, TaskAssigned) {

            if (TaskAssigned == '' || TaskAssigned == null || TaskAssigned == undefined) {
                alert('please Enter Assigned To')
                return;
            }
            var DataType = 1;
            var updatedata = AdminService.UpdateWorkAssigned(DataType, data.TaskID, TaskAssigned, '', '', '');
            updatedata.then(function (res) {
                if (res[0].StatusCode == '200') {
                    $scope.modalInstance.close();
                    $scope.loading = false;
                    alert(res[0].StatusDescription)
                    $scope.getTicketsCountData();
                }
                if (res[0].StatusCode == '400') {
                    $scope.loading = false;
                    $scope.modalInstance.close();
                    alert(res[0].StatusDescription);
                    $scope.getTicketsCountData();
                }
            }, function (err) {
                $scope.loading = false;
                $scope.error = false;
                $scope.data = true;
            })
        }

        $scope.updateFileStatus = function (data, TaskCompletionStatus, StatusRemarks) {


            var file = document.getElementById("Circular");

            //if ((TaskCompletionStatus != '' || TaskCompletionStatus != null || TaskCompletionStatus != undefined) && ($scope.updatepdffile == '' || $scope.updatepdffile == null || $scope.updatepdffile == undefined)) {
            //    alert('please Upload File')
            //    return;
            //}

            if (TaskCompletionStatus == '' || TaskCompletionStatus == null || TaskCompletionStatus == undefined) {
                alert('please enter Completion Status')
                return;
            }
            if ($scope.updatepdffile == '' || $scope.updatepdffile == null || $scope.updatepdffile == undefined) {
                var DataType = 3;
            }
            else if ($scope.updatepdffile != '' || $scope.updatepdffile != null || $scope.updatepdffile != undefined) {
                var DataType = 2;
            }
            var updatedata = AdminService.UpdateFileStatus(DataType, data.TaskID, null, TaskCompletionStatus, $scope.updatepdffile, file.value.split("\\").pop(), StatusRemarks);
            updatedata.then(function (res) {
                if (res[0].StatusCode == '200') {
                    $scope.modalInstance.close();
                    $scope.loading = false;
                    alert(res[0].StatusDescription)
                    $scope.getTicketsCountData();
                }
                if (res[0].StatusCode == '400') {
                    $scope.loading = false;
                    $scope.modalInstance.close();
                    alert(res[0].StatusDescription);
                    $scope.getTicketsCountData();
                }
            }, function (err) {
                $scope.loading = false;
                $scope.error = false;
                $scope.data = true;
            })
        }

    })
})