define(['app'], function (app) {
    app.controller("PracticalOTPController", function ($scope, $state, $localStorage, $stateParams, AppSettings, PracticalOTPService) {
        var authData = $localStorage.authorizationData;
        $scope.PracticalOTPDetails = {};
        $scope.ExaminerDetails = [];
        $scope.ExamDisable = false;
        $scope.CourseDisable = false;
        $scope.ExamDisable = true;
        $scope.ShowVocCourse = false;
        $scope.SendDisable = true;
        $scope.ExamSubDisable = true;
        $scope.PracticalOTPDetails.CourseID = "0";
        $scope.PracticalOTPDetails.ExamID = "0";
        $scope.PracticalOTPDetails.PrBatchID = "0";
        $scope.PracticalOTPDetails.MainGrpID = "0";
        $scope.PracticalOTPDetails.ExmSubID = "0";
        $scope.ExmSubName = "";
        $scope.SessionName = "";
        var SysUsrID = authData.SysUserID;
        var currDate = new Date();
        $scope.CurrDate = currDate;
        if (currDate.getHours() > 12) {
            $scope.PracticalOTPDetails.PrBatchID = "2";
        }
        else {
            $scope.PracticalOTPDetails.PrBatchID = "1";
        }
        var CourseList = PracticalOTPService.GetBasicCourseList();
        CourseList.then(function (Coursedata, status, headers, config, error) {
            $scope.CourseList = Coursedata;
            $scope.VocClass = "col-md-offset-1";
        }, function (error) {
            alert(error);
        });
        $scope.CourseChange = function () {
            if ($scope.PracticalOTPDetails.CourseID != "0" && $scope.PracticalOTPDetails.CourseID != undefined) {
                var ExamList = PracticalOTPService.GetExamListbyCourseID($scope.PracticalOTPDetails.CourseID);
                ExamList.then(function (Examdata, status, headers, config, error) {
                    $scope.ExamList = Examdata;
                    $scope.ExaminerDetails = {};
                    if ($scope.PracticalOTPDetails.CourseID == "1") {
                        $scope.PracticalOTPDetails.ExamID = "2";
                        $scope.ShowVocCourse = false;
                        $scope.ExamDisable = true;
                        $scope.GetSubjects();
                        $scope.VocClass = "col-md-offset-1";
                        $scope.ExamSubDisable = false;
                        $scope.ExaminerDetailShow = false;
                    }
                    else {
                        $scope.VocClass = "";
                        $scope.ExamDisable = false;
                        $scope.ShowVocCourse = true;
                        $scope.VocCourseDisable = true;
                        $scope.ExamSubDisable = true;
                        $scope.PracticalOTPDetails.ExamID = "0";
                        $scope.ExaminerDetailShow = false;
                    }
                }, function (error) {
                    alert(error);
                });
            }
            else {
                $scope.ExaminerDetailShow = false;
                $scope.PracticalOTPDetails.ExamID = "0";
                $scope.PracticalOTPDetails.ExmSubID = "0";
                $scope.PracticalOTPDetails.MainGrpID = "0";
                $scope.ShowVocCourse = false;
                $scope.VocClass = "col-md-offset-1";
                $scope.ExamDisable = true;
                $scope.ExamSubDisable = true;
            }
        }
        $scope.GetScheduleDetails = function () {
            var ScheduleList = PracticalOTPService.GetScheduleDetails($scope.PracticalOTPDetails.CourseID, $scope.PracticalOTPDetails.PrBatchID);
            ScheduleList.then(function (ScheduleData, status, headers, config, error) {
                $scope.ScheduleList = ScheduleData;
                var countDownDate = new Date($scope.ScheduleList[0].SendStartTime).getTime();
                var x = setInterval(function () {
                    var now = new Date().getTime();
                    var distance = countDownDate - now;
                    if (distance < 0) {
                        clearInterval(x);
                        for (var i = 0; i < $scope.ExaminerDetails.length; i++) {
                            document.getElementById("SendOTP_" + i).disabled = false;
                        }
                        $scope.EndSendDetails();
                    }
                }, 1000);

                var countDownShow = new Date($scope.ScheduleList[0].DispStartTime).getTime();
                var y = setInterval(function () {
                    var ShowNow = new Date().getTime();
                    var ShowDistance = countDownShow - ShowNow;
                    if (ShowDistance < 0) {
                        clearInterval(y);
                        for (var i = 0; i < $scope.ExaminerDetails.length; i++) {
                            document.getElementById("Pass_" + i).style.display = "block";
                        }
                        $scope.EndPassDetails();
                    }
                }, 1000);
            }, function (error) {
                alert(error);
            });
        }
        $scope.EndSendDetails = function () {
            var countDownDate = new Date($scope.ScheduleList[0].SendEndTime).getTime();
            var a = setInterval(function () {
                var now = new Date().getTime();
                var distance = countDownDate - now;
                if (distance < 0) {
                    clearInterval(a);
                    for (var i = 0; i < $scope.ExaminerDetails.length; i++) {
                        document.getElementById("SendOTP_" + i).disabled = true;
                    }
                }
            }, 1000);
           
        }
        $scope.EndPassDetails = function () {
            var countDownShow = new Date($scope.ScheduleList[0].DispEndTime).getTime();
            var b = setInterval(function () {
                var ShowNow = new Date().getTime();
                var ShowDistance = countDownShow - ShowNow;
                if (ShowDistance < 0) {
                    clearInterval(b);
                    for (var i = 0; i < $scope.ExaminerDetails.length; i++) {
                        document.getElementById("Pass_" + i).style.display = "none";
                    }
                }
            }, 1000);
        }
        $scope.ExamChange = function () {
            $scope.ExaminerDetailShow = false;
            if ($scope.PracticalOTPDetails.ExamID == "0") {
                $scope.PracticalOTPDetails.MainGrpID = "0";
                $scope.PracticalOTPDetails.SubjectID = "0";
                $scope.VocCourseDisable = true; 
            }
            if ($scope.PracticalOTPDetails.CourseID == "2" && $scope.PracticalOTPDetails.ExamID != "0") {
                $scope.GetVocationalCourses();
            }
        }
        $scope.GetVocationalCourses = function () {
            $scope.ExaminerDetailShow = false;
            var MainGroupList = PracticalOTPService.GetVocationalCourses($scope.PracticalOTPDetails.ExamID, 0);
            MainGroupList.then(function (VocCourseData, status, headers, config, error) {
                $scope.MainGroupList = VocCourseData;
                $scope.PracticalOTPDetails.MainGrpID = "0";
                $scope.VocCourseDisable = false;
            }, function (error) {
                alert(error);
            });
        }
        $scope.GetVocationalSubjects = function () {
            $scope.ExaminerDetailShow = false;
            if ($scope.PracticalOTPDetails.MainGrpID != "0" && $scope.PracticalOTPDetails.MainGrpID != undefined) {
                var VocSubjectsList = PracticalOTPService.GetVocationalCourses($scope.PracticalOTPDetails.ExamID, $scope.PracticalOTPDetails.MainGrpID);
                VocSubjectsList.then(function (VocSubjData, status, headers, config, error) {
                    $scope.SubjectList = VocSubjData;
                    $scope.PracticalOTPDetails.ExmSubID = "0";
                    $scope.ExamSubDisable = false;
                }, function (error) {
                    alert(error);
                });
            }
            else {
                $scope.PracticalOTPDetails.ExmSubID = "0";
                $scope.ExamSubDisable = true;
            }
        }
        $scope.GetSubjects = function () {
            $scope.ExaminerDetailShow = false;
            if ($scope.PracticalOTPDetails.ExamID == "2") {
                $scope.PracticalOTPDetails.MainGrpID = "0";
                var SubjectList = PracticalOTPService.GetBasicPracticalSubjectList($scope.PracticalOTPDetails.CourseID, $scope.PracticalOTPDetails.ExamID, $scope.PracticalOTPDetails.PrBatchID);
                SubjectList.then(function (Practicaldata, status, headers, config, error) {
                    $scope.SubjectList = Practicaldata;
                }, function (error) {
                    alert(error);
                });
            }
            else {
                $scope.DownloadStatusRpt.MainGrpID = "0";
                var MainGroupList = PracticalOTPService.GetMainGroupListByCollegeCourseId(AppSettings.CollegeID, $scope.DownloadStatusRpt.CourseID, AppSettings.AcdYrID);
                MainGroupList.then(function (MainGroupListdata, status, headers, config, error) {
                    $scope.MainGroupList = MainGroupListdata;
                }, function (error) {
                    alert(error);
                });
            }
        }
        $scope.Submit = function () {
            if ($scope.PracticalOTPDetails.CourseID == "0" || $scope.PracticalOTPDetails.CourseID == undefined || $scope.PracticalOTPDetails.CourseID == "") {
                alert("Please Select Course.");
                return;
            }
            if ($scope.PracticalOTPDetails.ExamID == "0" || $scope.PracticalOTPDetails.ExamID == undefined || $scope.PracticalOTPDetails.ExamID == "") {
                alert("Please Select Exam.");
                return;
            }
            if ($scope.PracticalOTPDetails.CourseID == "2"){
                if ($scope.PracticalOTPDetails.MainGrpID == "0" || $scope.PracticalOTPDetails.MainGrpID == undefined || $scope.PracticalOTPDetails.MainGrpID == "") {
                    alert("Please Select Group Name.");
                    return;
                }
            }
            if ($scope.PracticalOTPDetails.ExmSubID == "0" || $scope.PracticalOTPDetails.ExmSubID == undefined || $scope.PracticalOTPDetails.ExmSubID == "") {
                alert("Please Select Subject.");
                return;
            }
            $scope.LoadImg = true;
            var ExaminerData = PracticalOTPService.GetExaminerDetails($scope.PracticalOTPDetails.ExamID, $scope.CurrDate, $scope.PracticalOTPDetails.PrBatchID, $scope.PracticalOTPDetails.ExmSubID, AppSettings.DistrictIDs, $scope.PracticalOTPDetails.CourseID);
            ExaminerData.then(function (data) {
                if (data.length > 0) {
                    $scope.GetScheduleDetails();
                    $scope.ExaminerDetailShow = true;
                    $scope.LoadImg = false;
                    $scope.ExaminerDetails = data;
                }
                else {
                    alert("No College(s) Data Found.");
                    $scope.ExaminerDetailShow = false;
                    $scope.LoadImg = false;
                }
            }, function (error) {
                alert(error);
                $scope.LoadImg = false;
            });
        };
        $scope.UpdateMobileNo = function (index) {
            var getPromise = PracticalOTPService.UpdateExaminerMobileNo($scope.ExaminerDetails[index].examinerMobile, $scope.ExaminerDetails[index].examinerCode);
            getPromise.then(function (data) {
                alert(" Mobile No Updated Successfully.");
            }, function (error) {
                $scope.RollEditDisable = false;
                $scope.UploadFiles = true;
                alert(error);
            });
        }
        $scope.SendOTPCode = function (index) {
            var ExmSubID = $scope.PracticalOTPDetails.ExmSubID;
            if ($scope.ExaminerDetails[index].examinerMobile.toString().length < 10 || $scope.ExaminerDetails[index].examinerMobile.toString().length > 10) {
                alert("Please Enter Correct Mobile Number.");
                return;
            }
            for (var i = 0; i < $scope.SubjectList.length; i++) {
                if ($scope.SubjectList[i].ExmSubID != "" || $scope.PracticalOTPDetails.ExmSubID != 0) {
                    $scope.ExmSubName = $scope.SubjectList[i].ExmSubName;
                }
            }
            if ($scope.PracticalOTPDetails.PrBatchID == "1") {
                $scope.SessionName = "FN";
            }
            else {
                $scope.SessionName = "AN";
            }
            if (confirm("You're sending OTP/Code to College: " + $scope.ExaminerDetails[index].centerCode + " and Mobile No: " + $scope.ExaminerDetails[index].examinerMobile + ". Please Confirm?")) {
                $scope.LoadImg = true;
                var getPromise = PracticalOTPService.sendOTPCode($scope.PracticalOTPDetails.CourseID, $scope.PracticalOTPDetails.ExamID, $scope.CurrDate, $scope.PracticalOTPDetails.PrBatchID, $scope.PracticalOTPDetails.ExmSubID, AppSettings.DistrictIDs);
                getPromise.then(function (result) {
                    if (result == "1") {
                        alert("OTP Sent Successfully.");
                        $scope.LoadImg = false;
                    }
                    else if (result == "0") {
                        alert("OTP Sending Failed.");
                        $scope.LoadImg = false;
                    }
                    else {
                        alert("Error: OTP Sending Failed.");
                        $scope.LoadImg = false;
                    }
                });
            }
        }
    });
});







