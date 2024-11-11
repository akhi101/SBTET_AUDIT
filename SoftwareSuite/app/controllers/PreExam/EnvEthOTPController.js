(function () {
    'use strict';
    angular.module('app')
        .controller('EnvEthOTPController',
        function ($rootScope, $state, $scope, EnvEthOTPService, basicCourseService, AppSettings) {
            $scope.envEthOTPDetail = {};
            $scope.principalDetails = [];
            var NumRegex = /^[0-9]+$/;
            var FirstNumRegex = /^[6789]+$/;
            $scope.LoadImg = false;
            $scope.OTPSendFlag = true;
            //$scope.OTPPassword = false;
            $scope.init = function () {
                getAllBasicCourse();
            };
            var getAllBasicCourse = function () {
                basicCourseService.getAllBasicCourse().then(function (results) {
                    $scope.basicCourses = results;
                });
            };
            $scope.$watch('envEthOTPDetail.CourseID', function () {
                if ($scope.envEthOTPDetail.CourseID !== undefined) {
                    EnvEthOTPService.getExamSubjects($scope.envEthOTPDetail.CourseID).then(function (results) {
                        $scope.examSubjects = results;
                        for (var i = 0; i < $scope.examSubjects.length; i++) {
                            if ($scope.examSubjects[i].ExmSubName.toLowerCase().includes("eth")) {
                                $scope.examSubjects.splice(i, 1);
                                break;
                            }
                        }
                    });
                }
            });
  
            $scope.$watch('envEthOTPDetail.ExmSubID', function () {
                if ($scope.envEthOTPDetail.ExmSubID !== undefined) {
                    $scope.LoadImg = true;
                    EnvEthOTPService.getPrincipalDetails(AppSettings.DistrictIDs, $scope.envEthOTPDetail.ExmSubID).then(function (results) {
                        if (results.length > 0) {
                            $scope.principalDetails = results;
                            EnvEthOTPService.getScheduleDateTime($scope.envEthOTPDetail.ExmSubID).then(function (results) {
                            
                                $scope.OTPSendFlag = results;

                            //    if ($scope.OTPSendFlag == false) {
                            //        $scope.OTPSendFlag = true;
                            //    }
                            //    else {
                            //        $scope.OTPSendFlag = false;
                            //    }

                            });
                        }
                        else {
                            $scope.principalDetails = {};
                        }
                        $scope.LoadImg = false;
                    });
                }
            });
           

            $scope.MobileNoChange = function (index) {
                if (!FirstNumRegex.test($scope.principalDetails[index].principal_mobile_no.charAt(0))) {
                    $scope.principalDetails[index].principal_mobile_no = "";
                    alert("Please Enter Correct Mobile Number.");
                    return;
                }
                if (!NumRegex.test($scope.principalDetails[index].principal_mobile_no) || $scope.studentDetailList[index].principal_mobile_no.toString().length > 10) {
                    $scope.principalDetails[index].principal_mobile_no = $scope.principalDetails[index].principal_mobile_no.slice(0, -1);
                    return;
                }
            };
            $scope.UpdateMobileNo = function (index) {
                if ($scope.principalDetails[index].principal_mobile_no.toString().length < 10 || $scope.principalDetails[index].principal_mobile_no.toString().length > 10) {
                    alert("Please Enter Correct Mobile Number.");
                    return;
                }
                $scope.LoadImg = true;
                EnvEthOTPService.updateMobileNo($scope.principalDetails[index].CollegeID, $scope.principalDetails[index].principal_mobile_no).then(function (results) {
                    if (results == 0) {
                        alert("Mobile Number Updation Failed.");
                    }
                    else if (results == 1) {
                        alert("Mobile Number Updated Successfully.");
                    }
                    $scope.LoadImg = false;
                });
            }
            //$scope.SendOTPCode = function (index) {
            //    if ($scope.principalDetails[index].principal_mobile_no.toString().length < 10 || $scope.principalDetails[index].principal_mobile_no.toString().length > 10) {
            //        alert("Please Enter Correct Mobile Number.");
            //        return;
            //    }

            //    if (confirm("You're sending OTP/Code to College: " + $scope.principalDetails[index].ColName + " and Mobile No: " + $scope.principalDetails[index].principal_mobile_no + ". Please Confirm?")) {
            //        $scope.LoadImg = true;

            //        EnvEthOTPService.sendOTPCode($scope.principalDetails[index].CollegeID, $scope.principalDetails[index].ColCode, $scope.envEthOTPDetail.ExmSubID, $scope.principalDetails[index].principal_mobile_no).then(function (results) {
            //            if (results == 0) {
            //                alert("OTP Details Not Found.");
            //            }
            //            else if (results == 1) {
            //                alert("OTP Sent Successfully.");
            //            }
            //            else if (results == 2) {
            //                alert("Schedule Details Not Found.");
            //            }
            //            //else if (results == 3) {
            //            //    alert("Option will be available 30 min before the exam.");
            //            //}
            //            else if (results == 4) {
            //                alert("OTP sending time is over.");
            //            }
            //            $scope.LoadImg = false;
            //        });
            //    }
            //}
            $scope.SendOTPCode = function (index) {
                if ($scope.principalDetails[index].principal_mobile_no.toString().length < 10 || $scope.principalDetails[index].principal_mobile_no.toString().length > 10) {
                    alert("Please Enter Correct Mobile Number.");
                    return;
                }
                if (confirm("You're sending OTP/Code to College: " + $scope.principalDetails[index].ColName + " and Mobile No: " + $scope.principalDetails[index].principal_mobile_no + ". Please Confirm?")) {
                    $scope.LoadImg = true;
                    EnvEthOTPService.sendOTPCode($scope.principalDetails[index].CollegeID, $scope.principalDetails[index].ColCode, $scope.envEthOTPDetail.ExmSubID, $scope.principalDetails[index].principal_mobile_no).then(function (results) {
                        if (results == 0) {
                            //alert("OTP Sending Failed.");
                            alert("Question Paper Not Found.");
                        }
                        else if (results == 1) {
                            alert("OTP Sent Successfully.");
                        }
                        $scope.LoadImg = false;
                    });
                }
            }
        });
}());