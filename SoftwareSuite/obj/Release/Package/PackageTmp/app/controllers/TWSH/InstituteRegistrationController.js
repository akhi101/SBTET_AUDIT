define(['app'], function (app) {
    app.controller("InstituteRegistrationController", function ($scope, $http, $localStorage, $state, $stateParams, AppSettings,$uibModal, TwshStudentRegService) {
        const $ctrl = this;
        $ctrl.$onInit = () => {
            $scope.getInstutions()
        }

        $scope.Array = [{ "Id": true, "Value": "Yes" },
        { "Id": false, "Value": "No" }]

        $scope.Districts = [];
        var GetExamDistricts = TwshStudentRegService.getDistricts();
        GetExamDistricts.then(function (res) {
            $scope.Districts = res;
        }, function (err) {
            $scope.Districts = [];
        });
      
        var ExamCentersList = TwshStudentRegService.GetExamCentersList();
        ExamCentersList.then(function (res) {
           // console.log(res);
            $scope.ExamCentersList = res;
        }, function (err) {
            $scope.GetExamCentersList = [];
        });

        $scope.DownloadtoExcel = function () {
            var loadData1 = TwshStudentRegService.GetInstitutesListExcel()
            loadData1.then(function (data) {              
                if (data.length > 4) {
                   
                    var location = data;
                    window.location.href = location;

                } else {
                    alert("Institutions data not Found");
                }

            }, function (error) {
              
            });
        }
    
   
        $scope.getInstutions = function () {
            $scope.LoadImg = true;
            $scope.ResultNotFound = false;
            $scope.ResultFound = false;
        var GetInstitutesList = TwshStudentRegService.GetInstitutesList();
        GetInstitutesList.then(function (res) {
            $scope.LoadImg = false;
            $scope.ResultNotFound = false;
            $scope.ResultFound = true;
            $scope.GetInstituteList = res;
         
            for (var j = 1; j < res.length + 1; j++) {
                $scope['edit' + j] = true;
               
            }

          
        }, function (err) {
                $scope.GetInstitutesList = [];
                $scope.LoadImg = false;
                $scope.ResultNotFound = true;
                $scope.ResultFound = false;
        });
      }

        //$scope.EditData = function (Id) {

         
        //    var EditInstituteDataById = TwshStudentRegService.EditInstituteData(Id);
        //    EditInstituteDataById.then(function (res) {
        //        window.scrollTo({ top: 200, behavior: 'smooth' });
        //        //console.log(res);
        //        var EditInstituteData = res[0];
        //        $scope.Id = EditInstituteData.Id
        //        $scope.ExamCenter = EditInstituteData.ExaminationCenterId
        //        $scope.InstituteCode = parseInt(EditInstituteData.InstitutionCode)
        //        $scope.InstituteName = EditInstituteData.InstitutionName
        //        $scope.InstituteAddress = EditInstituteData.InstitutionAddress
        //        $scope.Email = EditInstituteData.MailId
        //        $scope.DistrictId = parseInt(EditInstituteData.DistrictId)
        //        $scope.Pincode = parseInt(EditInstituteData.Pincode)
        //        $scope.ContactPerson = EditInstituteData.ContactPerson
        //        $scope.MobileNumber = parseInt(EditInstituteData.ContactNumber)
        //        $scope.IsActive = EditInstituteData.IsActive
               
        //    }, function (err) {
               
        //        $scope.EditInstituteData = [];
        //    });
        //}

        $scope.DeleteInstitute = function (Id) {

            if (confirm("Are you sure you want to Delete Institute?") == true) {
                $scope.DeleteData(Id)
            } else {
                userPreference = "Save Canceled!";

            }


        }

        $scope.DeleteData = function (Id) {
            var DeleteInstitute = TwshStudentRegService.Delete_Institute(Id);
            DeleteInstitute.then(function (res) {
                alert(res[0].ResponseDescription)
                $scope.getInstutions();
            }, function (err) {
                console.log(err)              
            });
        }

        $scope.OpenModal = function(){
        $scope.modalInstance = $uibModal.open({
            templateUrl: "/app/views/TWSH/DeleteInstituteModal.html",
            size: 'xlg',
            scope: $scope,
            windowClass: 'modal-fit-att',
        });
        }
       
        $scope.Submit = function () {

            if ($scope.ExamCenter == "" || $scope.ExamCenter == null || $scope.ExamCenter == undefined) {
                alert(" Please Select Exam Center")
                return;
            }
            if ($scope.InstituteCode == "" || $scope.InstituteCode == null || $scope.InstituteCode == undefined) {
                alert(" Please Enter Institution Code")
                return;
            }
            if ($scope.InstituteName == "" || $scope.InstituteName == null || $scope.InstituteName == undefined) {
                alert(" Please Enter Institution Name")
                return;
            }
            if ($scope.InstituteAddress == "" || $scope.InstituteAddress == null || $scope.InstituteAddress == undefined) {
                alert(" Please Enter Institution Address")
                return;
            }
            if ($scope.Email == "" || $scope.Email == null || $scope.Email == undefined) {
                alert(" Please Enter mail Id")
                return;
            }
            if ($scope.DistrictId == "" || $scope.DistrictId == null || $scope.DistrictId == undefined) {
                alert(" Please select District")
                return;
            }
            if ($scope.Pincode == "" || $scope.Pincode == null || $scope.Pincode == undefined) {
                alert(" Please Enter Pincode")
                return;
            }
            if (isNaN($scope.Pincode)) {
                alert(" Please Enter valid Pincode")
                return;
            }
            if ($scope.ContactPerson == "" || $scope.ContactPerson == null || $scope.ContactPerson == undefined) {
                alert(" Please Enter Contact Person of Institute")
                return;
            }
            
            if ($scope.MobileNumber == "" || $scope.MobileNumber == null || $scope.MobileNumber == undefined) {
                alert(" Please Enter Contact Number of Institute")
                return;
            }
            if (isNaN($scope.MobileNumber)) {
                alert(" Please Enter valid Contact Number of Institute")
                return;
            }
            var Obj = {
                "ExaminationCenterId": parseInt($scope.ExamCenter),
                "InstitutionCode": $scope.InstituteCode.toString(),
                "InstitutionName": $scope.InstituteName,
                "InstitutionAddress": $scope.InstituteAddress,
                "MailId": $scope.Email,
                "DistrictId": parseInt($scope.DistrictId),
                "Pincode": $scope.Pincode.toString(),
                "ContactPerson": $scope.ContactPerson,
                "ContactNumber": $scope.MobileNumber.toString()
            };
            
            var setInstitute = TwshStudentRegService.AddInstitute(Obj);
            setInstitute.then(function (res) {
                //console.log(res);
                alert(res[0].ResponseDescription)
                $scope.getInstutions();
            }, function (err) {
                console.log(err);
            });
        }

        $scope.EditData = function (data, ind) {

            var ele1 = document.getElementsByClassName("enabletable" + ind);
            for (var j = 0; j < ele1.length; j++) {
                ele1[j].style['pointer-events'] = "auto";
                ele1[j].style.border = "1px solid #ddd";
                ele1[j].style['-webkit-appearance'] = "auto";
                ele1[j].style['-moz-appearance'] = "auto";
            }
            $scope['edit' + ind] = false;

        }

        $scope.Cancel = function (data, ind) {
            $scope['edit' + ind] = true;

            var ele2 = document.getElementsByClassName("enabletable" + ind);
            for (var j = 0; j < ele2.length; j++) {
                ele2[j].style['pointer-events'] = "none";
                ele2[j].style.border = "0";
                ele2[j].style['-webkit-appearance'] = "none";
                ele2[j].style['-moz-appearance'] = "none";
            }
        }

        $scope.Update = function (data, ind) {
            if (data.ExaminationCenterId == "" || data.ExaminationCenterId == null || data.ExaminationCenterId == undefined) {
                alert(" Please Select Exam Center")
                return;
            }
            if (data.InstitutionCode == "" || data.InstitutionCode == null || data.InstitutionCode == undefined) {
                alert(" Please Enter Institution Code")
                return;
            }
            if (data.InstitutionName == "" || data.InstitutionName == null || data.InstitutionName == undefined) {
                alert(" Please Enter Institution Name")
                return;
            }
            if (data.InstitutionAddress == "" || data.InstitutionAddress == null || data.InstitutionAddress == undefined) {
                alert(" Please Enter Institution Address")
                return;
            }
            if (data.MailId == "" || data.MailId == null || data.MailId == undefined) {
                alert(" Please Enter mail Id")
                return;
            }
            if (data.DistrictId == "" || data.DistrictId == null || data.DistrictId == undefined) {
                alert(" Please select District")
                return;
            }
            if (data.Pincode == "" || data.Pincode == null || data.Pincode == undefined) {
                alert(" Please Enter Pincode")
                return;
            }
            if (data.ContactPerson == "" || data.ContactPerson == null || data.ContactPerson == undefined) {
                alert(" Please Enter Contact Person of Institute")
                return;
            }

            if (data.ContactNumber == "" || data.ContactNumber == null || data.ContactNumber == undefined) {
                alert(" Please Enter Contact Number of Institute")
                return;
            }
            $scope['edit' + ind] = true;

            var ele2 = document.getElementsByClassName("enabletable" + ind);
            for (var j = 0; j < ele2.length; j++) {
                ele2[j].style['pointer-events'] = "none";
                ele2[j].style.border = "0";
                ele2[j].style['-webkit-appearance'] = "none";
                ele2[j].style['-moz-appearance'] = "none";
            }
            //ContactNumber: "9848712624"
            //ContactPerson: "P. Narsing Rao"
            //DistrictId: 9
            //ExaminationCenterId: 1
            //Id: 1
            //InstitutionAddress: "Mayuri Mall Complex, Kishan Pura, Hanmakonda"
            //InstitutionCode: "4301"
            //InstitutionName: "Lakshmi Narayana Typewriting Institute."
            //IsActive: true
            //MailId: "akhilkumar@hebeon.com"
            //Pincode: "508206"
          
            var Obj = {
                "Id":data.Id,
                "ExaminationCenterId": data.ExaminationCenterId,
                "InstitutionCode": data.InstitutionCode,
                "InstitutionName": data.InstitutionName,
                "InstitutionAddress": data.InstitutionAddress,
                "MailId": data.MailId,
                "DistrictId": data.DistrictId,
                "Pincode": data.Pincode,
                "ContactPerson": data.ContactPerson,
                "ContactNumber": data.ContactNumber
            };
           
            var setInstitute = TwshStudentRegService.UpdateInstitutionData(Obj);
            setInstitute.then(function (res) {
                $scope.edit = false;
                //console.log(res);
                alert(res[0].ResponseDescription)
                $scope.getInstutions();
                //$scope.Id='';
                //$scope.ExamCenter ='';
                //$scope.InstituteCode ='';
                //$scope.InstituteName ='';
                //$scope.InstituteAddress ='';
                //$scope.Email ='';
                //$scope.DistrictId ='';
                //$scope.Pincode ='';
                //$scope.ContactPerson ='';
                //$scope.MobileNumber = '';
             
            }, function (err) {
                $scope.edit = true;
                console.log(err);
            });
        }

        $scope.ValidateEmail = function () {
            if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test($scope.OrganizationEmail)) {
                return (true)
            }
            alert("You have entered an invalid email address!")
            return (false)
        }
       
    })

})


