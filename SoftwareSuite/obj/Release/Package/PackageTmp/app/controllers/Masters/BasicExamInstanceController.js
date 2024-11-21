define(['app'], function (app) {
    app.controller("BasicExamInstanceController", function ($scope, $state, $stateParams, AppSettings, BasicExamInstanceService, BasicAcademicYearService) {
        $scope.BasicExamInstance = { ExamInstID: $stateParams.ExamInstID };
        var PageNm = $state.current.name.split(".")[1] + "List";
        var BasicExamInstanceRightsdata = [];
        BasicExamInstanceRightsdata = AppSettings.UserRights;
        for (var i = 0; i < BasicExamInstanceRightsdata.length; i++) {
            if (BasicExamInstanceRightsdata[i].GridFormToOpen == PageNm) {
                if ($scope.BasicExamInstance.ExamInstID == 0) {
                    if (BasicExamInstanceRightsdata[i].isaddable == 'Y') {
                        $scope.isupdatableDisable = false;
                    } else {
                        $scope.isupdatableDisable = true;
                    }
                    $scope.isdeletableDisable = true;
                } else {
                    if (BasicExamInstanceRightsdata[i].isupdatable == 'Y') {
                        $scope.isupdatableDisable = false;
                    }
                    else {
                        $scope.isupdatableDisable = true;
                    }
                    if (BasicExamInstanceRightsdata[i].isdeletable == 'Y') {
                        $scope.isdeletableDisable = false;
                    } else {
                        $scope.isdeletableDisable = true;
                    }
                }
            }
        }
        var BasicAcademicYearList = BasicAcademicYearService.GetBasicAcademicYearList();
        BasicAcademicYearList.then(function ( BasicAcademicYearData, status, headers, config, error) {
            $scope.BasicAcademicYearList = BasicAcademicYearData;
            if ($scope.BasicExamInstance.ExamInstID > 0) {
                var BasicExamInstancedata = BasicExamInstanceService.GetBasicExamInstanceById($scope.BasicExamInstance.ExamInstID);
                BasicExamInstancedata.then(function (data) {
                    $scope.BasicExamInstance = data[0];
                    var ExamInstanceYear = data[0].ExamInstanceYear.toString();
                    var ExamInstanceMonth = data[0].ExamInstanceMonth.toString();
                    $scope.BasicExamInstance.ExamInstanceYear = ExamInstanceYear;
                    $scope.BasicExamInstance.ExamInstanceMonth =ExamInstanceMonth;
                    if ($scope.BasicExamInstance.CurrentInstanceFlag == 'Y') { $scope.BasicExamInstance.CurrentInstanceFlag = true } else { $scope.BasicExamInstance.CurrentInstanceFlag = false }
                    if ($scope.BasicExamInstance.ReExamFlag == 'Y') { $scope.BasicExamInstance.ReExamFlag = true } else { $scope.BasicExamInstance.ReExamFlag = false }
                }, function (error) {
                    alert(error);
                });
            }
        }, function (BasicAcademicYearData, status, headers, config) {
            alert(error);
        });
        $scope.SaveBasicExamInstance = function () {
            $scope.isupdatableDisable = true;
            if ($scope.BasicExamInstance.CurrentInstanceFlag == true) { $scope.BasicExamInstance.CurrentInstanceFlag = 'Y' } else { $scope.BasicExamInstance.CurrentInstanceFlag = 'N' }
            if ($scope.BasicExamInstance.ReExamFlag == true) { $scope.BasicExamInstance.ReExamFlag = 'Y' } else { $scope.BasicExamInstance.ReExamFlag = 'N' }
            
            if ($scope.BasicExamInstance.ExamInstID == undefined) { $scope.BasicExamInstance.ExamInstID = 0; }
            if (CheckValidation() == true) {
                if ($scope.BasicExamInstance.ExamInstID == 0) {
                    $scope.BasicExamInstance.CreLoginID = AppSettings.LoggedUserId;
                    $scope.BasicExamInstance.UpdLoginID = AppSettings.LoggedUserId;
                    var getPromise = BasicExamInstanceService.AddBasicExamInstance($scope.BasicExamInstance);
                    getPromise.then(function (msg) {
                       // $scope.SaveAuthoritySign();
                        alert("Added successfully!!");
                        RedirectToListPage();
                    }, function (error) {
                        $scope.isupdatableDisable = false;
                        alert(error);
                    });
                }
                else {
                    $scope.BasicExamInstance.UpdLoginID = AppSettings.LoggedUserId;
                    var getPromise = BasicExamInstanceService.UpdateBasicExamInstance($scope.BasicExamInstance);
                    getPromise.then(function (msg) {
                        //$scope.SaveAuthoritySign();
                        alert("Update successfully!!");
                        RedirectToListPage();
                    }, function (error) {
                        $scope.isupdatableDisable = false;
                        alert(error);
                    });
                }
            } else {
                $scope.isupdatableDisable = false;
            }
        }
        $scope.DeleteBasicExamInstance = function () {
            var getData = BasicExamInstanceService.DeleteBasicExamInstance($scope.BasicExamInstance.ExamInstID, AppSettings.LoggedUserId);
            getData.then(function (msg) {
                alert('Record Deleted');
                RedirectToListPage();
            }, function (error) {
                alert(error);
            });
        }
        function CheckValidation() {
            if (($scope.BasicExamInstance.AcdYrID == undefined) || ($scope.BasicExamInstance.AcdYrID == 0)) {
                alert("Select Academic Year");
                return false;
            }
            if (($scope.BasicExamInstance.ExamInstanceYear == undefined) || ($scope.BasicExamInstance.ExamInstanceYear == 0)) {
                alert("Select Exam Instance Year");
                return false;
            }
            if (($scope.BasicExamInstance.ExamInstanceMonth == undefined) || ($scope.BasicExamInstance.ExamInstanceMonth == 0)) {
                alert("Select Exam Instance Month");
                return false;
            }
            if (($scope.BasicExamInstance.ExamInstanceStatus == undefined) || ($scope.BasicExamInstance.ExamInstanceStatus == 0)) {
                alert("Select Exam Instance Status");
                return false;
            }
            if (($scope.BasicExamInstance.ExamInstanceRemark == undefined) || ($scope.BasicExamInstance.ExamInstanceRemark == "")) {
                alert("Enter Exam Instance Remarks");
                return false;
            }
            if (($scope.BasicExamInstance.ExamAuthorityName == undefined) || ($scope.BasicExamInstance.ExamAuthorityName == "")) {
                alert("Enter Exam Authority Name");
                return false;
            }
            //if (($scope.BasicExamInstance.TempCode == undefined) || ($scope.BasicExamInstance.TempCode == "")) {
            //    alert("Enter Temp Code");
            //    return false;
            //}
            else {
                return true;
            }
        }
        $scope.Exit = function () {
            RedirectToListPage();
        }
        function RedirectToListPage() {
            $state.go('Masters.BasicExamInstanceList');
        }

        //// Sign
        //$scope.ExamAuthoritySign = [];
        //$scope.Signfile = [];
        //$scope.SelectSignUploadFile = function () {
        //    $('#SignUpload').trigger('click');
        //    DeleteSign = false;
        //}
        //$scope.RemoveSign = function () {
        //    DeleteSign = true;
        //    $scope.ExamAuthoritySign = [];
        //    $scope.Signfile = [];
        //}
        //$scope.SignUpload = function (element) {
        //    var reader = new FileReader();
        //    if (element.value != '') {
        //        reader.onload = $scope.SignIsLoaded;
        //        var extn = element.files[0].type.split("/").pop();
        //        if ((extn == "jpeg") || (extn == "png") || (extn == "gif") || (extn == "jpg") || (extn == "bmp")) {
        //            reader.readAsDataURL(element.files[0]);
        //            $scope.Signfile = [];
        //            var filesize = element.files[0].size;  // in bytes
        //            if (filesize <= 20000) {
        //                $scope.Signfile.push(element.files[0]);
        //            }
        //            else {
        //                alert("Please Upload a photo upto 20kb");
        //                $("#AuthoritySign").val("");
        //                $scope.AuthoritySign = [];
        //                $scope.AuthoritySign = null;
        //                return;
        //            }
        //        }
        //    }
        //}
        //$scope.SignIsLoaded = function (e) {
        //    $scope.$apply(function () {
        //        $scope.ExamAuthoritySign = [];
        //        $scope.ExamAuthoritySign.push(e.target.result);
        //        $scope.ExamAuthoritySign = e.target.result;
        //    });
        //}
        //// Save
        //$scope.uploadSign = function (files) {
        //    var fd = new FormData();
        //    fd.append("file", files[0]);
        //    var url = AppSettings.WebApiUrl + "api/StudentReg/PostStudentRegSign/?StudRegID=" + $scope.StudentReg.StudRegID + "&SSCHallTicket=" + $scope.StudentReg.SSCHallTicket + "&UpdLoginID=" + AppSettings.LoggedUserId;
        //    $http.post(url, fd, {
        //        headers: { 'Content-Type': undefined },
        //        transformRequest: angular.identity
        //    }).then(function (data) {
        //        alert("Upload Photo Successfully");
        //    })
        //        .catch(function (data, status, headers, config) {
        //            alert(data);
        //            $scope.file = "";
        //        });
        //};

        //$scope.SaveAuthoritySign = function (files) {
        //    var fd = new FormData();
        //    fd.append("file", $scope.Signfile[0]);
        //    var url = AppSettings.WebApiUrl + "api/StudentReg/PostStudentRegSign/?StudRegID=" + $scope.StudentReg.StudRegID + "&SSCHallTicket=" + $scope.StudentReg.SSCHallTicket + "&UpdLoginID=" + AppSettings.LoggedUserId;
        //    $http.post(url, fd, {
        //        headers: { 'Content-Type': undefined },
        //        transformRequest: angular.identity
        //    }).then(function (data) {
        //        alert("Update Successfully");
        //        RedirectToListPage();
        //    })
        //        .catch(function (data, status, headers, config) {
        //            alert(data.data.error);
        //            $scope.RollEditDisable = false;
        //        });
        //}

    });
});
