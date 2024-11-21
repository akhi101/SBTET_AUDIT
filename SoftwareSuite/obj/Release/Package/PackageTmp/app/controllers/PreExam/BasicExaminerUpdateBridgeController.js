define(['app'], function (app) {
    app.controller("BasicExaminerUpdateBridgeController", function ($scope, $state, $stateParams, AppSettings, BasicDistrictsService, BasicCollegeService, BasicExaminerService, BasicCourseService, BasicExamService, BasicBranchService, BasicExamSubjectService, PrePractCenterService, PreVocationalCenterService, BasicMainGroupService) {
        $scope.BasicExaminer = {};
        var PageNm = $state.current.name.split(".")[1] + "List";
        var BasicExaminerRightsdata = [];

        $scope.isDistrictDisable = false;
        $scope.isDisableExam = false;
        $scope.isDisableBranch = false;
        $scope.isGroupDisable = false;
        $scope.isSubjectDisable = false;
        
        BasicExaminerRightsdata = AppSettings.UserRights;
        for (var i = 0; i < BasicExaminerRightsdata.length; i++) {
            if (BasicExaminerRightsdata[i].GridFormToOpen == PageNm) {
                if ($scope.BasicExaminer.OtherCenterID == 0) {
                    if (BasicExaminerRightsdata[i].isaddable == 'Y') {
                        $scope.isupdatableDisable = false;
                    } else {
                        $scope.isupdatableDisable = true;
                    }
                    $scope.isdeletableDisable = true;
                } else {
                    if (BasicExaminerRightsdata[i].isupdatable == 'Y') {
                        $scope.isupdatableDisable = false;
                    }
                    else {
                        $scope.isupdatableDisable = true;
                    }
                    if (BasicExaminerRightsdata[i].isdeletable == 'Y') {
                        $scope.isdeletableDisable = false;
                    } else {
                        $scope.isdeletableDisable = true;
                    }
                }
            }
        }


        $scope.BasicExaminer.CourseID = "2";
        $scope.BasicExaminer.BranchID = "3";
        $scope.BasicExaminer.ExamID = "4";
        $scope.BasicExaminer.MainGrpID = "0";
       

      


        var BasicDistrictList = BasicDistrictsService.GetBasicDistrictListByUserId(AppSettings.LoggedUserId);
        BasicDistrictList.then(function (DistrictData, status, headers, config, error) {
            $scope.BasicDistrictList = DistrictData;
            if (AppSettings.SysUsrGrpID == 7) {
                $scope.BasicExaminer.DistrictID = "" + DistrictData[0].DistrictID + "";
                $scope.isDistrictDisable = true;
                FillCenterList($scope.BasicExaminer.DistrictID);
                FillExamSubjectListByExamIDAndMainGrpID();
            } else {
                $scope.isDistrictDisable = false;
            }
        }, function (DistrictData, status, headers, config) {
            alert(error);
        });
                 

        $scope.GetBasicCollegeList = function () {
            FillCenterList($scope.BasicExaminer.DistrictID);
        }

        function FillCenterList(DistrictID) {
            $scope.PraCenterList = [];
            if (DistrictID != "" || DistrictID != undefined) {
               
                if ($scope.BasicExaminer.ExamID == 3 || $scope.BasicExaminer.ExamID == 4) {
                    //var PraCenterList = PreVocationalCenterService.GetPreVocationalCenterByDistrictId(DistrictID, AppSettings.ExamInstID);

                    var PraCenterList =  BasicExaminerService.GetPracticalCenterListByDistrictIDANDZoneType(AppSettings.ExamInstID, 4, $scope.BasicExaminer.DistrictID);
                    PraCenterList.then(function (PracticalCenterData, status, headers, config, error) {
                        $scope.PraCenterList = PracticalCenterData;
                    }, function (PracticalCenterData, status, headers, config) {
                        alert(error);
                    })
                }
            }
        }
        

        $scope.GetBasicExamSubjectList = function (BranchID) {
            FillExamSubjectList(BranchID);
        }




        function FillExamSubjectList(BranchID) {
            if (BranchID != "" || BranchID != undefined) {
                var BasicExamSubjectList = BasicExamSubjectService.GetGeneralExamSubjectListForMobileNumberUpdate($scope.BasicExaminer.ExamID);
                BasicExamSubjectList.then(function (SubjectData, status, headers, config, error) {
                    $scope.BasicExamSubjectList = SubjectData;
                }, function (SubjectData, status, headers, config) {
                    alert(error);
                })
            }
        }


        $scope.GetBasicExamSubjectListByMainGrpID = function () {
            FillExamSubjectListByExamIDAndMainGrpID();
        }


        function FillExamSubjectListByExamIDAndMainGrpID() {
          
                //var BasicExamSubjectList = BasicExamSubjectService.GetPracticalExamSubjectForMobileNumberUpdate($scope.BasicExaminer.MainGrpID, $scope.BasicExaminer.ExamID);
                var BasicExamSubjectList =  BasicExaminerService.GetPracticalExamSubjectForPracticalBridgeAppointmentList(4, 2);
                BasicExamSubjectList.then(function (SubjectData, status, headers, config, error) {
                    $scope.BasicExamSubjectList = SubjectData;
                }, function (SubjectData, status, headers, config) {
                    alert(error);
                })
          
        }
 


        $scope.GetBasicExaminerList = function () {
           
                if ($scope.BasicExaminer.PrePractCntrID != "" || $scope.BasicExaminer.PrePractCntrID != undefined) {
                    //var BasicExaminerList = BasicExaminerService.GetVocationalExaminerListofCenterForMobileNumberUpdate($scope.BasicExaminer.DistrictID, $scope.BasicExaminer.PrePractCntrID, $scope.BasicExaminer.MainGrpID);
                    var BasicExaminerList = BasicExaminerService.GetVocationalExaminerListofCenterForMobileNumberUpdateBridge($scope.BasicExaminer.DistrictID, $scope.BasicExaminer.PrePractCntrID, AppSettings.ExamInstID);
                    BasicExaminerList.then(function (BasicExaminerData, status, headers, config, error) {
                        $scope.BasicExaminerList = BasicExaminerData;
                        if (BasicExaminerData.length == 0) {
                            alert("Data Not Found");
                        }
                    }, function (BasicExaminerData, status, headers, config) {
                        alert(error);
                    });
                
            }
        }


        $scope.SaveBasicExaminer = function () {

            if (CheckValidation() == true) {
                var BasicExaminerList = [];
                for (var k = 0; k < $scope.BasicExaminerList.length; k++) {
                    var obj = {};

                    if ($scope.BasicExaminerList[k].cheExaminer == true) {
                        obj.ExaminerID = $scope.BasicExaminerList[k].ExaminerID;
                        obj.full_name = $scope.BasicExaminerList[k].full_name;
                        obj.designation = $scope.BasicExaminerList[k].designation;
                        obj.examinerNo = $scope.BasicExaminerList[k].examinerNo;
                        obj.mobile_no = $scope.BasicExaminerList[k].mobile_no;
                        obj.OTP = $scope.BasicExaminerList[k].OTP;
                        BasicExaminerList.push(obj);
                    }
                }
                if (BasicExaminerList.length > 0) {
                    var isConfirmed = confirm("Are you sure to save this record ?");
                    if (isConfirmed == false) {
                        return;
                    }
                    $scope.BasicExaminer.BasicExaminerList = BasicExaminerList;
                    var getPromise = BasicExaminerService.PostBasicExaminer($scope.BasicExaminer);
                    getPromise.then(function (msg) {
                        alert("Updated successfully!!");
                        RedirectToListPage();
                        $scope.BasicExaminer = {};
                    }, function (error) {
                        $scope.isupdatableDisable = false;
                        alert(error);
                    });
                }
                else {
                    alert("Please Select At List One Examiner To Update Mobile No");
                    return;
                }
            }

        }

        function CheckValidation() {
            if (($scope.BasicExaminer.DistrictID == undefined) || ($scope.BasicExaminer.DistrictID == "")) {
                alert("Select District");
                return false;
            }
            if (($scope.BasicExaminer.PrePractCntrID == undefined) || ($scope.BasicExaminer.PrePractCntrID == "")) {
                alert("Select Center");
                return false;
            }
            else {
                return true;
            }
        }

        $scope.SendOTPToExaminer = function (index) {
 
            var BasicExaminerListOTP = [];
            for (var k = 0; k < $scope.BasicExaminerList.length; k++) {
                var obj = {};

                if ($scope.BasicExaminerList[k].cheExaminer == true) {
                    obj.ExaminerID = $scope.BasicExaminerList[k].ExaminerID;
                    obj.full_name = $scope.BasicExaminerList[k].full_name;
                    obj.designation = $scope.BasicExaminerList[k].designation;
                    obj.examinerNo = $scope.BasicExaminerList[k].examinerNo;
                    obj.mobile_no = $scope.BasicExaminerList[k].mobile_no;
                    obj.OTP = $scope.BasicExaminerList[k].OTP;
                    BasicExaminerListOTP.push(obj);
                }

                if ($scope.BasicExaminer.MainGrpID == undefined || $scope.BasicExaminer.MainGrpID == "") {
                    $scope.BasicExaminer.MainGrpID = 0;
                }

                $scope.BasicExaminer.BasicExaminerList = BasicExaminerListOTP;
                if ($scope.BasicExaminer.BasicExaminerList.length > 0) {
                    for (var k = 0; k < $scope.BasicExaminer.BasicExaminerList.length; k++) {
                        if ($scope.BasicExaminer.BasicExaminerList[k].OTP != "") {
                            var getPromise = BasicExaminerService.PostSendOTPForExaminer($scope.BasicExaminer);
                            getPromise.then(function (msg) {
                                //  alert("SMS Send Successfully !!");
                                RedirectToListPage();
                            }, function (error) {
                                $scope.isupdatableDisable = false;
                                alert(error);
                            });
                        }
                        else {
                            alert("Please Contact to Examiner For Get OTP");
                        }
                    }
                }
                else {
                    alert("Please Check Examiner To Update Mobile Number or Send OTP");
                    return;
                }
            }
            /// $window.alert("ExaminerID: " + ExaminerID + "\nFull Name: " + full_name);
        };

        $scope.Exit = function () {
            RedirectToListPage();
        }
        function RedirectToListPage() {
            $scope.isupdatableDisable = false;
            $state.go('PreExam');
        }

    });
});
