define(['app'], function (app) {
    app.controller("ApplyCertificateController", function ($scope, $http, $timeout, $localStorage, $state, $stateParams, AppSettings, PaymentService, $uibModal, TwshStudentRegService, PreExaminationService) {

        $scope.data = [];
        $scope.dataFound = false;
        $scope.loading = false;
        $scope.Noresult = false;
        $scope.noteChallan = false;
        $scope.secondClick = false;
        $scope.ShowPaymentdata = false;
        const $ctrl = this;
        $ctrl.$onInit = () => {
            $scope.NoOtp = true;
            $scope.Otp = false;
            $scope.limitexceeded = false;
            $scope.phonenoupdated = false;
            $scope.result = false;
        }

        $scope.Submit = function () {
            if ($scope.RegistrationNo == null || $scope.RegistrationNo == undefined || $scope.RegistrationNo == "") {
                alert("Enter ApplicationNumber.");
                return;
            }
            $scope.dataFound = false;
            $scope.loading = true;
            $scope.Noresult = false;
            var getTwshStudentDetails = TwshStudentRegService.getTwshStudentDetailsForCertificate($scope.RegistrationNo);
            getTwshStudentDetails.then(function (response) {
                try { var response = JSON.parse(response); }
                catch (err) {
                    $scope.data = [];
                    $scope.dataFound = false;
                    $scope.loading = false;
                    $scope.Noresult = true;
                }

                if (response.Table[0].ResponseCode == '200' && response.Table1.length > 0) {
                    $scope.data = [];
                    $scope.data = response.Table1[0];
                    $scope.StudentPhoneNumber = response.Table1[0].StudentPhoneNumber
                    $scope.dataFound = true;
                    $scope.loading = false;
                    $scope.Noresult = false;
                } else if (response.Table[0].ResponseCode == '400' || response.Table1.length <= 0) {
                    alert('Data not found');
                    $scope.data = [];
                    $scope.dataFound = false;
                    $scope.loading = false;
                    $scope.Noresult = true;
                } else {
                    alert('Something Went Wrong');
                    $scope.data = [];
                    $scope.dataFound = false;
                    $scope.loading = false;
                    $scope.Noresult = true;
                }
            },
                function (error) {
                    $scope.data = [];
                    $scope.dataFound = false;
                    $scope.loading = false;
                    $scope.Noresult = true;
                });

        }

        $scope.Send = function () {
          //  var UpdateTwshPhotoData

            if (!$scope.phonenoupdated) {
                alert('Please Verify the Mobile number, before you proceed.');
                return;
            }
            $scope.noteChallan = false;
            $scope.secondClick = false;
            $scope.billdeskamount = $scope.data.Amount;
            $scope.Amount = $scope.data.Amount;
            $scope.challan = $scope.data.RequestNo;
            $scope.HallticketNo = $scope.data.HallTicketNumber;
            $scope.ShowPaymentdata = true;
            $scope.modalInstance = $uibModal.open({
                templateUrl: "/app/views/TWSH/TwshCertificateFeePaymentPopup.html",
                size: 'xlg',
                scope: $scope,
                windowClass: 'modal-fit-att',
                //backdrop: 'static',
            });
        }

        $scope.closeModal = function () {
            $scope.modalInstance.close();
        }




        $scope.notedChallan = function () {
            if ($scope.noteChallan == true) {
                $scope.noteChallan = false;
            } else {
                $scope.noteChallan = true;
            }
        }


        $scope.billdeskredirect = function (regno, challan) {
            if (angular.isUndefined(regno) || angular.isUndefined(challan)) {
                alert('please try after sometime');
                return;
            }           
            $scope.noteChallan = false;
            $scope.secondClick = false;
            var marchantid = "TSSBTET"; // test
            var addInfo1 = $scope.data.ApplicationNumber == null || angular.isUndefined($scope.data.ApplicationNumber) ? "NA" : $scope.data.ApplicationNumber;
            var addInfo3 = regno == null || angular.isUndefined(regno) ? "NA" : regno;
            var addInfo4 = "NA";
            var addInfo5 = "Certificate request TWSH"; 
            var addInfo6 = "NA" //PaymentType;
            var addInfo7 = "NA"
            var amount = $scope.billdeskamount;

            var subMarchantid = "TSTWSH";
            $localStorage.TwshCertificateFeePaymentGatewayResponse = {};
            redirecturl = {
                redirecturl: "index.ApplyCertificate"
            }
            $localStorage.TwshCertificateFeePaymentGatewayResponse = redirecturl;

            var location = window.location.origin;


            var proceedfinePayment = PaymentService.getHashValue(location + "/Payment/BulkBillResponse", marchantid, subMarchantid, addInfo1, addInfo3, addInfo4, addInfo5, addInfo6, addInfo7, challan, amount);
            proceedfinePayment.then(function (resp) {
                if (resp != "" && resp != undefined) {
                    var req = "https://pgi.billdesk.com/pgidsk/PGIMerchantPayment?msg=" + resp // live url

                    window.location.replace(req);
                }
            }, function (err) {
                $scope.noteChallan = false;
                $scope.secondClick = true;
                console.log(err);
            });


        }

        $scope.UploadApplication = function () {
            var input = document.getElementById("ApplicationLetter");
            var fileSize = input.files[0].size;

            //if (fileSize <= 3000000 && fileSize >= 700000) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.readAsDataURL(input.files[0]);
                reader.onload = function (e) {
                    $('#ViewApplicationLetter').attr('src', e.target.result);

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

                        var base64Image1 = canvas.toDataURL("image/png");
                        $scope.ProfilePic = base64Image1;
                        var base64Img = canvas.toDataURL("image/png").replace(/^data:image\/[a-z]+;base64,/, "");
                        $scope.ProfilePic1 = base64Img;


                    });


                }
                reader.onerror = function (e) {
                    console.error("File could not be read! Code " + e.target.error.code);
                };

            }

         
        }





        $scope.UploadPhoto = function () {
            if ($scope.ProfilePic1 == null || $scope.ProfilePic1 == "" || $scope.ProfilePic1 == undefined) {
                alert('Please Upload Photo')
                return;
            }

            var obj = {
                "StudentId": $scope.data.Studentid,
                "Photo": $scope.ProfilePic1
            }

            var UpdateTwshPhot = TwshStudentRegService.UpdateTwshPhotoData(obj);
            UpdateTwshPhot.then(function (res) {
                var response = JSON.parse(res)
                if (response[0].ResponceCode == '200') {
                    alert(response[0].ResponceDescription)
                } else {
                    alert("Something Went Wrong");
                }
            },
                function (error) {
                    alert("error while Data");
                    console.log(error);
                });
            //var Sign = TwshStudentRegService.TwshUploadSign($scope.ProfilePic1, $scope.data.ApplicationNumber, $scope.data.HallTicketNumber);
            //Sign.then(function (res) {
            //    var response = JSON.parse(res)
            //    if (response[0].ResponceCode == '200') {
            //        alert(response[0].ResponceDescription)
            //    } else {
            //        alert("Something Went Wrong");
            //    }
            //},
            //function (error) {
            //    alert("error while Data");
            //    console.log(error);
            //});
        }



        $scope.SendOtp = function () {
            if ($scope.StudentPhoneNumber != null && $scope.StudentPhoneNumber != undefined && $scope.StudentPhoneNumber.length == '10') {
              
                $scope.Otp = true;
                $scope.NoOtp = false;
                var GenerateOtpForMobile = PreExaminationService.GenerateOtpForMobileNoUpdate($scope.data.HallTicketNumber, $scope.StudentPhoneNumber)
                GenerateOtpForMobile.then(function (response) {
                    try {
                        var detail = JSON.parse(response);
                    } catch (err) { }
                    if (detail.status == '200') {
                        alert(detail.description);
                        $scope.Otp = true;
                        $scope.NoOtp = false;
                    } else {
                        alert(detail.description);
                        $scope.Otp = false;
                        $scope.NoOtp = true;
                    }
                }, function (error) {
                    alert('error occured while sending OTP');
                    $scope.Otp = false;
                    $scope.NoOtp = true;
                })

            } else if ($scope.StudentPhoneNumber == null || $scope.StudentPhoneNumber == undefined) {
                alert("Please Enter Mobile Number");
            } else if ($scope.StudentPhoneNumber.length != '10') {
                alert('Enter valid Mobile number');
            } else {
                alert("Please Enter Mobile Number");
            }


        }
        $scope.counter = 0;
        $scope.ReSendOtp = function () {
            $scope.counter++;
            if ($scope.counter > 2) {
                $scope.limitexceeded = true;
                return;
            } else {
               
                var GenerateOtpForMobileNoUpdate = PreExaminationService.GenerateOtpForMobileNoUpdate($scope.data.HallTicketNumber, $scope.StudentPhoneNumber)
                GenerateOtpForMobileNoUpdate.then(function (response) {
                    try {
                        var detail = JSON.parse(response);
                    } catch (err) { }
                    if (detail.status == '200') {
                        alert(detail.description);
                        $scope.Otp = true;
                        $scope.NoOtp = false;
                    } else {
                        alert(detail.description);
                        $scope.Otp = false;
                        $scope.NoOtp = true;
                    }
                }, function (error) {
                    alert('error occured while Resending OTP');
                    $scope.Otp = false;
                    $scope.NoOtp = true;
                });


            }
        }

        $scope.updatephonenumber = function () {
            if ($scope.OTPdata == null || $scope.OTPdata == "" || $scope.OTPdata == undefined) {
                alert('Please Enter OTP.');
                return;
            }
            if ($scope.OTPdata.length != '6') {
                alert('Please Enter valid OTP.');
                return;
            }
           
            var UpdateUserdata = PreExaminationService.UpdateUserdata($scope.data.HallTicketNumber, $scope.StudentPhoneNumber, $scope.OTPdata)
            UpdateUserdata.then(function (response) {

                try {
                    var res = JSON.parse(response);
                } catch (err) { }
                if (res.Table[0].StatusCode == '200') {
                    alert(res.Table[0].StatusDescription);
                    $scope.phonenoupdated = true;
                    $scope.Verified = true;
                } else {
                    alert(res.Table[0].StatusDescription);
                    $scope.phonenoupdated = false;
                    $scope.Verified = false;
                }
            }, function (error) {
                alert('error occured while updating Mobile number.');
                $scope.phonenoupdated = false;
                $scope.Verified = false;
            });


        }
    })
})