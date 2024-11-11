define(['app'], function (app) {
    app.controller("StudentAuthenticationListController", function ($scope, $state, AppSettings, $uibModal, $log, $document, $window, StudentRegService, RegisterAdmittedStudentService) {
        var $ctrl = this;
        $scope.StudentAuthenticationList = { };
        $scope.CompanyName = AppSettings.CompanyName;
        $scope.LoginYear = AppSettings.SelectedYear;
        var PageNm = $state.current.name.split(".")[1] + "List";;
        var RightForCurrentPage = [];
        var UsersRightsdata = [];
        UsersRightsdata = AppSettings.UserRights;
        for (var i = 0; i < UsersRightsdata.length; i++) {
            if (UsersRightsdata[i].GridFormToOpen == PageNm) {
                var obj = {};
                obj.isaddable = UsersRightsdata[i].isaddable;
                RightForCurrentPage.push(obj);
            }
        }
        var gridColumns = [
            { field: "StuRegSrNo", headerText: "S. No.", textAlign: ej.TextAlign.Right, width: 50 },
            { field: "Action", headerText: "Authenticate", template: "<button type='button' class='btn btn-detail btn-sm' ng-click='$parent.editStduentRecord($event)'>Take Thumb</button>", textAlign: ej.TextAlign.Center, width: 130 },
            { field: "Action", headerText: "Approve", template: "<button id='approvebtn' class='btn btn-reset btn-sm'  data-toggle='modal' ng-click='$parent.openApprove($event)'> Approve </button>  ", textAlign: ej.TextAlign.Center, width: 80 },
            { field: "SSCHallTicket", headerText: "Hall Ticket No.", textAlign: ej.TextAlign.Right, width: 120 },
            { field: "AdmNo", headerText: "Admission No.", textAlign: ej.TextAlign.Right, width: 100 },
            { field: "StudName", headerText: "Student Name", textAlign: ej.TextAlign.Left, width: 250 },
            { field: "FatherName", headerText: "Father Name", textAlign: ej.TextAlign.Left, width: 250 },
            { field: "BirthDateDesc", headerText: "Birth Date", format: "{0:dd/MM/yyyy}", textAlign: ej.TextAlign.Left, width: 100 },
            { field: "GenderDesc", headerText: "Sex", textAlign: ej.TextAlign.Left, width: 80 },
            { field: "SubName", headerText: "Second Language", textAlign: ej.TextAlign.Left, width: 100 },
            { field: "AadharRemark", headerText: "Aadhaar Remark", textAlign: ej.TextAlign.Left, width: 250 },
            { field: "StudRegID", headerText: "StudRegID", visible: true, textAlign: ej.TextAlign.Left, width: 0 }
        ];

        $scope.openApprove = function (e, size, parentSelector) {
            $scope.status = 'n';
            var grid = $(".e-grid").ejGrid("instance");
            var index = grid.getIndexByRow($(e.target).closest("tr"));
            var StudRegID = grid.model.currentViewData[index].StudRegID;
            $scope.studentData = { StudRegID: StudRegID };
            $scope.studentData.AadharNo = grid.model.currentViewData[index].AadharNo;
            $scope.studentData.StudName = grid.model.currentViewData[index].StudName;
            $scope.studentData.BirthDateDesc = grid.model.currentViewData[index].BirthDateDesc;
            $scope.studentData.GenderDesc = grid.model.currentViewData[index].GenderDesc;
            $scope.studentData.FatherName = grid.model.currentViewData[index].FatherName;
            $scope.studentData.PhotoPath = grid.model.currentViewData[index].PhotoPath;
            $scope.studentData.Address = grid.model.currentViewData[index].Houseno + ", " + grid.model.currentViewData[index].Streetname + ", " + grid.model.currentViewData[index].Cityname + ", " + grid.model.currentViewData[index].MandalName + ", " + grid.model.currentViewData[index].DistName + ", " + grid.model.currentViewData[index].StateName + ".";
            $scope.studentData.AadharRemark = grid.model.currentViewData[index].AadharRemark;
            var parentElem = null;
            var modalInstance = null;

            var getPromise = StudentRegService.GetStudentTempAadhar($scope.studentData.AadharNo.trim());
            getPromise.then(function (data) {
                if (data.status == 'y') {
                    $scope.status = 'y'
                    $scope.studentAadharData = data;
                    parentElem = parentSelector ?
                        angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
                    modalInstance = $uibModal.open({
                        animation: $ctrl.animationsEnabled,
                        ariaLabelledBy: 'modal-title',
                        ariaDescribedBy: 'modal-body',
                        templateUrl: 'myModalContent.html',
                        controller: 'ModalInstanceCtrl',
                        controllerAs: '$ctrl',
                        size: size,
                        appendTo: parentElem,
                        resolve: {
                            items: function () {
                                return {
                                    studentData: $scope.studentData, studentAadharData: $scope.studentAadharData
                                }
                            }
                        }
                    });
                    modalInstance.result.then(function (selectedItem) {
                        if (selectedItem.status === 'approve') {
                            approveStudent({ 'StudRegID': StudRegID, 'AadharAuthFlag': '1', 'AadharRemark': '' })

                        } else {
                            rejectStudent({ 'StudRegID': StudRegID, 'AadharAuthFlag': '2', 'AadharRemark': selectedItem.AadharRemark });
                        }
                    }, function () {
                        $log.info('Modal dismissed at: ' + new Date());
                    });
                } else if (data == 'n') {
                    alert("Please Authenticate Aadhaar.");
                    return;
                }
                else {
                    alert(data);
                    return;
                }
            }, function (error) {
                alert(error);
            });
        }

        function approveStudent(studentReg) {
            $scope.EiditedStudentAuthentication = { StudRegID: studentReg.StudRegID };
            var StudentRegdata = StudentRegService.GetStudentRegById(studentReg.StudRegID);
            StudentRegdata.then(function (data) {
                $scope.EiditedStudentAuthentication = data[0];
                $scope.EiditedStudentAuthentication.AadharNo = $scope.EiditedStudentAuthentication.AadharNo.trim(' ');
                if (AppSettings.MngtTypID != 21) {
                    if ($scope.EiditedStudentAuthentication.SecAadharVerify != 1) {
                        alert("Aadhaar verification is pending for selected group.");
                        return;
                    }
                    if ($scope.EiditedStudentAuthentication.CourseID == 1) {
                        if (!$scope.EiditedStudentAuthentication.SubAadharVerify > 0) {
                            alert("Aadhaar verification is pending for selected second language.");
                            return;
                        }
                    }
                }
                if ($scope.EiditedStudentAuthentication.StudRegID == undefined) { $scope.EiditedStudentAuthentication.StudRegID = 0; }
                if ($scope.EiditedStudentAuthentication.StudRegID != 0) {
                    var getPromise = StudentRegService.UpdateStudentRegAadharAuthenticate($scope.EiditedStudentAuthentication);
                    getPromise.then(function (msg) {
                        updateStudentReg(studentReg);
                    }, function (error) {
                        alert("Approval Failed Error: " + error);
                        return;
                    });
                }
            }, function (error) {
                alert("Approval Error : " + error);
                return;
            });
        }

        function updateStudentReg(studentReg) {
            var getPromise = StudentRegService.PostStudentAadharStatus(studentReg);
            getPromise.then(function (data) {
                if (data == 'y') {
                    alert("Approved Successfully.");
                    $scope.ShowAll();
                    return;
                } else if (data == 'n') {
                    alert("Approval Failed.");
                    return;
                }
                else {
                    alert("Error1 : " + data);
                    return;
                }
            }, function (error) {
                alert("Error2 : " + error);
            });
        }

        function rejectStudent(studentReg) {
            var getPromise = StudentRegService.PostStudentAadharStatus(studentReg);
            getPromise.then(function (data) {
                if (data == 'y') {
                    alert("Rejection Completed.");
                    $scope.ShowAll();
                    return;
                } else if (data == 'n') {
                    alert("Rejection Failed.");
                    return;
                }
                else {
                    alert("Error1 : " + data);
                    return;
                }
            }, function (error) {
                alert("Error2 : " + error);
            });
        }

        var _grid = "";
        var _index = "";
        var _StudRegID = "";
        var _AadharAuthFlag = "";
        var _AadharRemark = "";
        $scope.editStduentRecord = function (e) {
            _grid = $(".e-grid").ejGrid("instance");
            _index = _grid.getIndexByRow($(e.target).closest("tr"));
            _StudRegID = _grid.model.currentViewData[_index].StudRegID;
            //scanfinger();
            _AadharAuthFlag = _grid.model.currentViewData[_index].AadharAuthFlag;
            _AadharRemark = _grid.model.currentViewData[_index].AadharRemark;
            if (_AadharAuthFlag == 0 || (_AadharAuthFlag == 2 && _AadharRemark != null)) {
                scanfinger();
            }
            else {
                alert("Already Authentication Completed. Please Click Approve.");
                return;
            }
        }

        function PostStudentAadhar() {
            $scope.StudentAuthentication = { StudRegID: _StudRegID };
            if (_grid.model.currentViewData[_index].AadharNo == undefined) { _grid.model.currentViewData[_index].AadharNo == ''; }
            if (_grid.model.currentViewData[_index].AadharNo != '') {
                $scope.StudentAuthentication.xmlPiddata = $("#txtPidData").val();
                $scope.StudentAuthentication.AadharNo = _grid.model.currentViewData[_index].AadharNo;
                $scope.StudentAuthentication.StudRegID = _StudRegID;
                var getPromise = StudentRegService.PostStudentAadhar($scope.StudentAuthentication);
                getPromise.then(function (data) {
                    if (data.status == 'y') {
                        _grid.model.currentViewData[_index].AadharAuthFlag = 2;
                        _grid.model.currentViewData[_index].AadharRemark = null;
                        alert("Aadhaar Authentication Successful.");
                        return;
                    } else if (data == 'n') {
                        alert("Aadhaar Authentication Failed.");
                        return;
                    }
                    else if (data == 'Object reference not set to an instance of an object.') {
                        alert("Finger Print Not Detected. Please Try Again.");
                        return;
                    }
                    else {
                        alert(data);
                        return;
                    }
                }, function (error) {
                    alert("Error : " + error);

                });
            }
        }

        $scope.StudentAuthenticationdata = [];
        $("#StudentAuthentications").ejGrid({
            dataSource: $scope.StudentAuthenticationdata,
            allowPaging: true,
            pageSettings: { pageSize: 10 },
            allowSearching: true,
            allowScrolling: true,
            //allowResizeToFit: true,
            allowFiltering: true,
            toolbarSettings: { showToolbar: true, toolbarItems: [ej.Grid.ToolBarItems.WordExport, ej.Grid.ToolBarItems.ExcelExport, ej.Grid.ToolBarItems.PdfExport, ej.Grid.ToolBarItems.Search] },
            toolbarClick: function (args) {
                if (args.itemName == "Add") {
                    args.cancel = true;
                    AddNew();
                }
                if (args.itemName == "Excel Export") {
                    args.cancel = true;
                    this.export(AppSettings.ExportToExcelUrl);
                }
                if (args.itemName == "Word Export") {
                    args.cancel = true;
                    this.export(AppSettings.ExportToWordUrl);
                }
                if (args.itemName == "PDF Export") {
                    args.cancel = true;
                    this.export(AppSettings.ExportToPdfUrl);
                }
            },
            columns: gridColumns
        });
        //$scope.doubleclick = function doubleclick(sender, args) {
        //    if (this.multiSelectCtrlRequest == false) {
        //        $state.go('Admission.StudentAuthentication', { StudRegID: sender.data.StudRegID });
        //    }
        //}
        var CourseList = RegisterAdmittedStudentService.GetCourseListForRegStud(AppSettings.CollegeID);
        CourseList.then(function (Coursedata, status, headers, config, error) {
            $scope.CourseList = Coursedata;
        }, function (error) {
            alert(error);
        });
        $scope.FillCoursePart = function (CourseID) {
            $scope.ExamList = [];
            $scope.BranchList = [];
            if (CourseID != "") {
                var ExamList = RegisterAdmittedStudentService.GetBasicExamList(CourseID);
                ExamList.then(function (BasicExamdata, status, headers, config, error) {
                    $scope.ExamList = BasicExamdata;
                    var BranchList = RegisterAdmittedStudentService.GetBasicBranchListForRegStud(CourseID, AppSettings.CollegeID);
                    BranchList.then(function (BasicBranchdata, status, headers, config, error) {
                        $scope.BranchList = BasicBranchdata;
                    }, function (error) {
                        alert(error);
                    });
                }, function (error) {
                    alert(error);
                });
            }
        }
        $scope.Show = function () {
            if (($scope.CourseID == undefined) || ($scope.CourseID == "")) {
                alert("Select Stream");
                return;
            }
            if (($scope.ExamID == undefined) || ($scope.ExamID == "")) {
                alert("Select Exam");
                return;
            }
            var StudentAuthenticationdata = StudentRegService.FillStudentRegDetailsListForPhotoUploadOrForAadhar(AppSettings.CollegeID, $scope.CourseID, $scope.ExamID, $scope.BranchID, "","Y");
            StudentAuthenticationdata.then(function (data) {
                if (data.length > 0) {
                    var SrNo = 1
                    for (var i = 0; i < data.length; i++) {
                        data[i].StuRegSrNo = SrNo;
                        SrNo = SrNo + 1;
                    }
                    $scope.StudentAuthenticationdata = data;
                }
                else {
                    alert("Data Not Found");
                    $scope.StudentAuthenticationdata = [];
                    return;
                }
            }, function (error) {
                alert(error);
            });
        }

        //All data shows
        var StudentAuthenticationdata = StudentRegService.FillStudentRegDetailsListForPhotoUploadOrForAadhar(AppSettings.CollegeID, 0, 0, 0, "", "Y");
        StudentAuthenticationdata.then(function (data) {
            if (data.length > 0) {
                var SrNo = 1
                for (var i = 0; i < data.length; i++) {
                    data[i].StuRegSrNo = SrNo;
                    SrNo = SrNo + 1;
                }
                $scope.StudentAuthenticationdata = data;
            }
            else {
                alert("Data Not Found");
                $scope.StudentAuthenticationdata = [];
                return;
            }
        }, function (error) {
            alert(error);
            });

        $scope.ShowAll = function () {
            var StudentAuthenticationdata = StudentRegService.FillStudentRegDetailsListForPhotoUploadOrForAadhar(AppSettings.CollegeID, 0, 0, 0, "", "Y");
            StudentAuthenticationdata.then(function (data) {
                if (data.length > 0) {
                    var SrNo = 1
                    for (var i = 0; i < data.length; i++) {
                        data[i].StuRegSrNo = SrNo;
                        SrNo = SrNo + 1;
                    }
                    $scope.StudentAuthenticationdata = data;
                }
                else {
                    alert("Data Not Found");
                    $scope.StudentAuthenticationdata = [];
                    return;
                }
            }, function (error) {
                alert(error);
            });
        }
        $scope.ClearData = function () {
            $scope.CourseID = "";
            $scope.ExamID = "";
            $scope.BranchID = "";
        }
        var MethodInfo = "";
        var posh = "";
        function scanfinger() {
            //if (document.getElementById("AadharNo").value != '') {
            posh = GetFingerPOSH(5);
            DiscoverStartekAVDM(11100);
            //} else {
            //    alert('Enter Aadhaar Number');
            //} 
        }
        function GetFingerPOSH(index) {
            if (index == "0") {
                return "LEFT_LITTLE";
            }
            else if (index == "1") {
                return "LEFT_RING";
            }
            else if (index == "2") {
                return "LEFT_MIDDLE";
            }
            else if (index == "3") {
                return "LEFT_INDEX";
            }
            else if (index == "4") {
                return "LEFT_THUMB";
            }
            else if (index == "5") {
                return "RIGHT_THUMB";
            }
            else if (index == "6") {
                return "RIGHT_INDEX";
            }
            else if (index == "7") {
                return "RIGHT_MIDDLE";
            }
            else if (index == "8") {
                return "RIGHT_RING";
            }
            else if (index == "9") {
                return "RIGHT_LITTLE";
            }
            else {
                return "LEFT_INDEX";
            }
        }
        function DiscoverStartekAVDM(count) {
            if (window.location.protocol == "http:") {
                var primaryUrl = "http://127.0.0.1:";
                var finalUrl = "";
                //alert("Please wait while discovering port from 11100 to 11120.\nThis will take some time.");
                for (var i = count; i <= 11120; i++) {
                    var verb = "RDSERVICE";
                    var err = "";
                    var url = primaryUrl + i.toString();
                    var res;
                    $.support.cors = true;
                    var httpStaus = false;
                    var jsonstr = "";
                    var data = new Object();
                    var obj = new Object();
                    $.ajax({
                        type: "RDSERVICE",
                        async: false,
                        crossDomain: true,
                        url: url,
                        contentType: "text/xml; charset=utf-8",
                        processData: false,
                        cache: false,
                        // useDefaultXhrHeader: false,
                        success: function (data) {

                            httpStaus = true;
                            res = { httpStaus: httpStaus, data: data };
                            //alert(data);
                            finalUrl = primaryUrl + i.toString();
                            rdservice(finalUrl);

                        },
                        error: function (jqXHR, ajaxOptions, thrownError) {
                            i = 11120;
                            //alert("Service UnAvailable.");
                            // $("#lblPort").text("0");
                            res = { httpStaus: httpStaus, err: getHttpError(jqXHR) };
                            //alert(res.d);
                        },
                    });
                }
            }
            else {
                var primaryUrl = "https://127.0.0.1:";
                var finalUrl = "";
                //alert("Please wait while discovering port from 11100 to 11120.\nThis will take some time.");
                //for (var i = 11100; i <= 11120; i++) {
                var i = 11200;
                var verb = "RDSERVICE";
                var err = "";
                var url = primaryUrl + i.toString();
                var res;
                $.support.cors = true;
                var httpStaus = false;
                var jsonstr = "";
                var data = new Object();
                var obj = new Object();
                $.ajax({
                    type: "RDSERVICE",
                    async: false,
                    crossDomain: true,
                    url: url,
                    contentType: "text/xml; charset=utf-8",
                    processData: false,
                    cache: false,
                    // useDefaultXhrHeader: false,
                    success: function (data) {
                        //debugger;
                        httpStaus = true;
                        res = { httpStaus: httpStaus, data: data };
                        //alert(data);
                        finalUrl = primaryUrl + i.toString();
                        rdservice(finalUrl);
                        //i = 11120;
                    },
                    error: function (jqXHR, ajaxOptions, thrownError) {
                        //i = 11120;
                        //alert("Service UnAvailable.");
                        // $("#lblPort").text("0");
                        res = { httpStaus: httpStaus, err: getHttpError(jqXHR) };
                    },
                });
            }
            //}
        }
        function scanMultiPorts() {
            //debugger;
            //SCAN FOR https 11200 port
            scanForRDSrvcHTTPS(11200);
            //SCAN FOR https 11100 to 11120 ports
            var i = 11100;
            for (i = 11100; i < 11121; i++) {
                scanForRDSrvc(i);
            }
        }
        function rdservice(finalUrl1) {
            getJSON_rd(finalUrl1 + '/rd/',//MethodInfo,
                function (err, data) {
                    if (err != null) {
                        alert('Something went wrong: ' + err);
                    } else {
                        document.getElementById("txtPidData").value = String(data);
                        if (document.getElementById("txtPidData").value != "") {
                            var $doc = document.getElementById("txtPidData").value;
                            parser = new DOMParser();
                            xmlDoc = parser.parseFromString($doc, "text/xml");
                            var CmbData1 = $(xmlDoc).find('RDService').attr('status');
                            if (CmbData1 == "READY") {
                                captureFP(finalUrl1);
                            }
                            else {
                                // debugger;
                                var fovalue = finalUrl1.split(":");
                                var count = fovalue[2];
                                //alert(count);
                                DiscoverStartekAVDM(parseInt(count) + 1);
                            }
                        }
                    }
                }
            );
        }
        function info() {
            // DiscoverStartekAVDM();
            var finalUrl = $("#lblPort").val();
            getJSON_info(finalUrl + '/rd/info',
                function (err, data) {
                    if (err != null) {
                        alert('Something went wrong: ' + err);
                    } else {
                        document.getElementById("txtPidData").value = String(data);
                        // String(data).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
                        //                         htmlEncode(data);
                        //alert("done");
                    }
                }
            );
        }
        function captureFP(finalUrl1) {
            getJSONCapture(finalUrl1 + '/rd/capture',
                //'http://localhost:11101/rd/capture',
                function (err, data) {
                    if (err != null) {
                        alert('Something went wrong: ' + err);
                    } else {
                        document.getElementById("txtPidData").value = String(data);

                        //String(data).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
                        //                         htmlEncode(data);
                        //  alert("capture done");
                        // alert(data);
                    }
                }
            );
        }
        function convertData() {
            document.getElementById("txtPidData").value = String(document.getElementById("txtPidData").value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
        }
        var getJSON_rd = function (url, callback) {
            var xhr = new XMLHttpRequest();
            xhr.open('RDSERVICE', url, true);
            xhr.responseType = 'application/xml';
            xhr.onload = function () {
                var status = xhr.status;
                if (status == 200) {
                    callback(null, xhr.response);
                } else {
                    callback(status);
                }
            };
            xhr.send();
        };
        var getJSON_info = function (url, callback) {
            var xhr = new XMLHttpRequest();
            xhr.open('DEVICEINFO', url, true);
            xhr.responseType = 'application/xml';
            xhr.onload = function () {
                var status = xhr.status;
                if (status == 200) {
                    callback(null, xhr.response);
                } else {
                    callback(status);
                }
            };
            xhr.send();
        };
        var getJSONCapture = function (url, callback) {
            var xhr = new XMLHttpRequest();
            xhr.open('CAPTURE', url, true);
            xhr.responseType = 'application/xml';    //json

            // var InputXml = "<PidOptions> <Opts fCount=\"1\" fType=\"0\" iCount=\"0\" pCount=\"0\" format=\"0\" pidVer=\"2.0\" timeout=\"20000\" otp=\"\" posh=\"LEFT_INDEX\" env=\"PP\" wadh=\"+0njvZli4IkkbxG9yNKSWNMG7RNY6OhyWBUf/n5Dag4=\" /> <Demo></Demo>  </PidOptions>";
            var Env = document.getElementById("Env").value;
            var wadh = document.getElementById("txtWadh").value;
            //var InputXml = '<?xml version="1.0"?> <PidOptions ver="1.0"> <Opts fCount="1" fType="0" iCount="0" pCount="0" format="0" pidVer="2.0" timeout="' + $("#Timeout").val() + '" posh="' + posh + '" env="' + Env + '" wadh="' + wadh + '"/> </PidOptions>';
            var InputXml = '<?xml version="1.0"?> <PidOptions ver="1.0"> <Opts fCount="1" fType="0" iCount="0" pCount="0" format="0" pidVer="2.0" timeout="20000" posh="' + posh + '" env="' + Env + '" wadh="' + wadh + '"/> </PidOptions>';

            //var InputXml = "<PidOptions> <Opts fCount=\"1\" fType=\"0\" iCount=\"0\" pCount=\"0\" format=\"0\" pidVer=\"2.0\" timeout=\"20000\" otp=\"\" posh=\"LEFT_INDEX\" env=\"S\" wadh=\"\" /> <Demo></Demo>  </PidOptions>";

            xhr.onload = function () {
                var status = xhr.status;
                if (status == 200) {
                    callback(null, xhr.response);
                    PostStudentAadhar();
                } else {
                    callback(status);
                }
            };
            xhr.send(InputXml);
        };
        function htmlEncode(value) {
            //create a in-memory div, set it's inner text(which jQuery automatically encodes)
            //then grab the encoded contents back out.  The div never exists on the page.
            return $('<div/>').text(value).html();
        }
        function getHttpError(jqXHR) {
            var err = "Unhandled Exception";
            if (jqXHR.status === 0) {
                err = 'Service Unavailable';
            } else if (jqXHR.status == 404) {
                err = 'Requested page not found';
            } else if (jqXHR.status == 500) {
                err = 'Internal Server Error';
            } else if (thrownError === 'parsererror') {
                err = 'Requested JSON parse failed';
            } else if (thrownError === 'timeout') {
                err = 'Time out error';
            } else if (thrownError === 'abort') {
                err = 'Ajax request aborted';
            } else {
                err = 'Unhandled Error';
            }
            return err;
        }
    });
    app.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, items) {
        $scope.studentData = { StudRegID: items.studentData.StudRegID };
        $scope.studentData.AadharNo = items.studentData.AadharNo;
        $scope.studentData.StudName = items.studentData.StudName;
        $scope.studentData.BirthDateDesc = items.studentData.BirthDateDesc;
        $scope.studentData.GenderDesc = items.studentData.GenderDesc;
        $scope.studentData.FatherName = items.studentData.FatherName;
        $scope.studentData.PhotoPath = items.studentData.PhotoPath;
        $scope.studentData.Address = items.studentData.Address;
        $scope.studentData.AadharRemark = items.studentData.AadharRemark;
        $scope.rejectRemark = $scope.studentData.AadharRemark;

        $scope.studentAadharData = { StudRegID: items.studentData.StudRegID };
        $scope.studentAadharData.AadharNo = items.studentAadharData.aadhaarno;
        $scope.studentAadharData.StudName = items.studentAadharData.name;
        $scope.studentAadharData.BirthDateDesc = items.studentAadharData.dob;
        $scope.studentAadharData.GenderDesc = items.studentAadharData.gender;
        $scope.studentAadharData.FatherName = items.studentAadharData.co;
        $scope.studentAadharData.PhotoPath = items.studentAadharData.imgPath;
        $scope.studentAadharData.Address = items.studentAadharData.address + ".";

        $scope.approve = function () {
            $uibModalInstance.close({ 'status': "approve" });
        };
        $scope.reject = function () {
            if ($scope.rejectRemark == undefined || $scope.rejectRemark == '' || $scope.rejectRemark == null) {
                alert("Please Enter Reason For Rejection.");
            }
            else {
                $uibModalInstance.close({ 'status': "reject", 'AadharRemark': $scope.rejectRemark });
            }
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    });
});