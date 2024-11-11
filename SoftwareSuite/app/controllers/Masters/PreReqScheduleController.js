define(['app'], function (app) {
    app.controller("PreReqScheduleController", function ($scope, $state, $stateParams, AppSettings, PreReqScheduleService) {
        $scope.PreReqSchedule = { ReqSchID: $stateParams.ReqSchID };
        var PageNm = $state.current.name.split(".")[1] + "List";
        var PreReqScheduleRightsdata = [];
        $scope.DisableServiceFlag = false;
        //$scope.DisableTypeFlag = false;

        PreReqScheduleRightsdata = AppSettings.UserRights;
        for (var i = 0; i < PreReqScheduleRightsdata.length; i++) {
            if (PreReqScheduleRightsdata[i].GridFormToOpen == PageNm) {
                if ($scope.PreReqSchedule.ReqSchID == 0) {
                    if (PreReqScheduleRightsdata[i].isaddable == 'Y') {
                        $scope.isupdatableDisable = false;
                    } else {
                        $scope.isupdatableDisable = true;
                    }
                    $scope.isdeletableDisable = true;
                } else {
                    if (PreReqScheduleRightsdata[i].isupdatable == 'Y') {
                        $scope.isupdatableDisable = false;
                    }
                    else {
                        $scope.isupdatableDisable = true;
                    }
                    if (PreReqScheduleRightsdata[i].isdeletable == 'Y') {
                        $scope.isdeletableDisable = false;
                    } else {
                        $scope.isdeletableDisable = true;
                    }
                }
            }
        }
        

        var InstanceList = PreReqScheduleService.GetAcademicYearForRequestScheduleList();
        InstanceList.then(function (Instancedata, status, headers, config, error) {
            $scope.PreReqSchedule.AcdYrName = Instancedata[0].AcdYrName;
            $scope.PreReqSchedule.AcdYrID = Instancedata[0].AcdYrID;
        }, function (Instancedata, status, headers, config) {
            alert(error);
        });

        var ReqStudSerMasterList = PreReqScheduleService.GetReqStudSerMasterList();
        ReqStudSerMasterList.then(function (StudSerMasterdata, status, headers, config, error) {
            $scope.ReqStudSerMasterList = StudSerMasterdata;
        }, function (StudSerMasterdata, status, headers, config) {
            alert(error);
        });
        
        $("#FromDate").ejDatePicker({ allowEdit: false, dateFormat: "dd/MMM/yyyy" });
        $("#ToDate").ejDatePicker({ allowEdit: false, dateFormat: "dd/MMM/yyyy" });

        var ReqStudSerMasterList = PreReqScheduleService.GetReqStudSerMasterList(0);
        ReqStudSerMasterList.then(function (StudSerMasterdata, status, headers, config, error) {
            $scope.ReqStudSerMasterList = StudSerMasterdata;
            if ($scope.PreReqSchedule.ReqSchID > 0) {
                var PreReqScheduledata = PreReqScheduleService.GetPreReqScheduleListByID($scope.PreReqSchedule.ReqSchID);
                PreReqScheduledata.then(function (data) {
                   
                    $scope.PreReqSchedule = data[0];
                    $scope.PreReqSchedule.ServiceID = data[0].ServiceID;

                    $("#FromDate").ejDatePicker({ value: data[0].FromDate, dateFormat: "dd/MMM/yyyy" });
                    $("#ToDate").ejDatePicker({ value: data[0].ToDate, dateFormat: "dd/MMM/yyyy" });
                    $scope.DisableServiceFlag = true;
                   
                }, function (error) {
                    alert(error);
                });
            }
        }, function (StudSerMasterdata, status, headers, config) {
            alert(error);
        });

        $scope.SavePreReqSchedule = function () {
            $scope.isupdatableDisable = true;
            $scope.PreReqSchedule.FromDate = $("#FromDate").val();
            $scope.PreReqSchedule.ToDate = $("#ToDate").val();
            if ($scope.PreReqSchedule.ReqSchID == undefined) { $scope.PreReqSchedule.ReqSchID = 0; }
            if (CheckValidation() == true) {
                if ($scope.PreReqSchedule.ReqSchID == 0) {

                    var getPromise = PreReqScheduleService.GetCheckDatesValidations($("#FromDate").val(),$("#ToDate").val());
                    getPromise.then(function (data) {

                        if (data == 1) {
                            alert("From date must be greater than today date");
                            $scope.isupdatableDisable = false;
                            return;
                        }
                        else if (data == 2) {
                            alert("To date must be greater than From date");
                            $scope.isupdatableDisable = false;
                            return;
                        }
                        else if (data == 3) {
                            alert("From  date must be less than To date");
                            $scope.isupdatableDisable = false;
                            return;
                        }
                        else {

                                           $scope.PreReqSchedule.CreLoginID = AppSettings.LoggedUserId;
                                    $scope.PreReqSchedule.UpdLoginID = AppSettings.LoggedUserId;


                                    var getPromise = PreReqScheduleService.AddPreReqSchedule($scope.PreReqSchedule);
                                    getPromise.then(function (msg) {
                                        alert("Added successfully!!");
                                        
                                        RedirectToListPage();
                                    }, function (error) {
                                        if (error == '[{"Id":"Success","Message":"Request Schedule For this Service is Already Created"}]') {
                                            alert("Request Schedule For this Service is Already Created.");
                                        }
                                        //$scope.isupdatableDisable = false;
                                        //if (error == '[{"ReqSchID":"AcdYrName","Message":"Duplicate Name"}]') {
                                        //    alert("Academic Year must be unique");
                                        //    return;
                                        //} else {
                                        //    alert(error);
                                        //}
                                    });


                        }

                    }, function (error) {
                        alert(error);
                    });
                }
           

                else {

                    var getPromise = PreReqScheduleService.GetCheckDatesValidations($("#FromDate").val(), $("#ToDate").val());
                    getPromise.then(function (data) {
                        if (data == 1) {
                            alert("From date must be greater than today date");
                            $scope.isupdatableDisable = false;
                            return;
                        }
                        else if (data == 2) {
                            alert("To date must be greater than From date");
                            $scope.isupdatableDisable = false;
                            return;
                        }
                        else if (data == 3) {
                            alert("From  date must be less than To date");
                            $scope.isupdatableDisable = false;
                            return;
                        }
                        else {

                            $scope.PreReqSchedule.UpdLoginID = AppSettings.LoggedUserId;
                            var getPromise = PreReqScheduleService.UpdatePreReqSchedule($scope.PreReqSchedule);
                            getPromise.then(function (msg) {
                                alert("Update successfully!!");
                                RedirectToListPage();
                            }, function (error) {
                                //$scope.isupdatableDisable = false;
                                //if (error == '[{"Id":"AcdYrName","Message":"Duplicate Name"}]') {
                                //    alert("Academic Year must be unique");
                                //    return;
                                //} else {
                                //    alert(error);
                                //}
                            });
                        }
                    }, function (error) {
                        alert(error);
                    });
                }
            } else {
                $scope.isupdatableDisable = false;
            }
        }
    
        $scope.DeletePreReqSchedule = function () {
            var getData = PreReqScheduleService.DeletePreReqSchedule($scope.PreReqSchedule.ReqSchID, AppSettings.LoggedUserId);
            getData.then(function (msg) {
                alert('Record Deleted');
                RedirectToListPage();
            }, function (error) {
                alert(error);
            });
        }
        function CheckValidation() {
            if (($scope.PreReqSchedule.ServiceID == undefined) || ($scope.PreReqSchedule.AcdYrName == "")) {
                alert("Please Select Service");
                return false;
            }
            if (($scope.PreReqSchedule.FromDate == undefined) || ($scope.PreReqSchedule.FromDate == "")) {
                alert("Please Choose From");
                return false;
            }
            if (($scope.PreReqSchedule.ToDate == undefined) || ($scope.PreReqSchedule.ToDate == "")) {
                alert("Please Choose  Up To Date");
                return false;
            }
            if (($scope.PreReqSchedule.FeeAmount == undefined) || ($scope.PreReqSchedule.FeeAmount == "")) {
                alert("Please Enter Amount");
                return false;
            }
            else {
                return true;
            }
        }
        $scope.Exit = function () {
            RedirectToListPage();
        }
        function RedirectToListPage() {
            $state.go('Masters.PreReqScheduleList');
        }



        //$scope.openCalendarFromDate = function () {
        //    $scope.PreReqSchedule.FromDateIsOpen = true;
        //}
    });
});
