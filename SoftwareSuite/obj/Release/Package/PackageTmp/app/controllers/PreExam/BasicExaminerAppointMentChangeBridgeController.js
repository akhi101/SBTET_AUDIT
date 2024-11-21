define(['app'], function (app) {
    app.controller("BasicExaminerAppointMentChangeBridgeController", function ($scope, $state, $stateParams, AppSettings, BasicDistrictsService, BasicCollegeService, BasicExaminerService, BasicCourseService, BasicExamService, BasicBranchService, BasicExamSubjectService, PrePractCenterService, BasicMainGroupService) {
        $scope.BasicExaminer = {};
        var PageNm = $state.current.name.split(".")[1] + "List";
        var BasicExaminerRightsdata = [];

        $scope.MediumList = [
            { MediumTypeName: 'Other Than Urdu', MediumType: 1 },
            { MediumTypeName: 'Urdu', MediumType: 2 }
        ];
       

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
        $scope.isExamDisabled = false;
        $scope.isBranchDisabled = true;
        $scope.isGroupDisabled = false;

        $scope.BasicExaminer.MediumType = "1";
        $scope.BasicExaminer.CourseID = "2";
        $scope.BasicExaminer.ExamID = "4";
        $scope.BasicExaminer.BranchID = "3";
        $scope.BasicExaminer.ZoneType = "4";

        

        var BasicDistrictList = BasicDistrictsService.GetBasicDistrictListByUserId(AppSettings.LoggedUserId);
        BasicDistrictList.then(function (DistrictData, status, headers, config, error) {
            $scope.BasicDistrictList = DistrictData;
            $scope.BasicExaminer.DistrictID = ""+ $scope.BasicDistrictList[0].DistrictID +"" ;
            $scope.PracticalCenterList = [];
            var dataPracticalCenterList = [];
               
            dataPracticalCenterList = BasicExaminerService.GetPracticalCenterListByDistrictIDANDZoneType(AppSettings.ExamInstID, 4, $scope.BasicExaminer.DistrictID);
              dataPracticalCenterList.then(function (PracticalCenterData, status, headers, config, error) {
                  $scope.PracticalCenterList = PracticalCenterData;
                  GetMainGroupList(2, 3);
            }, function (DistrictData, status, headers, config) {
                alert(error);
                }); 
            
            
        }, function (DistrictData, status, headers, config) {
            alert(error);
            });

 
        function FillDistrict(CourseID)
        {
           
                var BasicDistrictList = BasicDistrictsService.GetBasicDistrictListByUserId(AppSettings.LoggedUserId);
                BasicDistrictList.then(function (DistrictData, status, headers, config, error) {
                    $scope.BasicDistrictList = DistrictData;
                    $scope.BasicExaminer.DistrictID = "" + $scope.BasicDistrictList[0].DistrictID + "";
                    $scope.PracticalCenterList = [];
                    var dataPracticalCenterList = [];                     
                    dataPracticalCenterList = BasicExaminerService.GetPracticalCenterListByDistrictIDANDZoneType(AppSettings.ExamInstID, 4, $scope.BasicExaminer.DistrictID);
                   
                    dataPracticalCenterList.then(function (PracticalCenterData, status, headers, config, error) {
                        $scope.PracticalCenterList = PracticalCenterData;
                    }, function (DistrictData, status, headers, config) {
                        alert(error);
                        }); 


                }, function (DistrictData, status, headers, config) {
                    alert(error);
                });
             
        }

      

        

        function GetMainGroupList(CourseID, BranchID) {
            $scope.MainGroupList = [];   
            $scope.BasicExamSubjectList = [];
            var basicMainGroupList = BasicMainGroupService.GetMainGroupListByCourseIDBranchID(2, 3);
                basicMainGroupList.then(function (MainGroupData, status, headers, config, error) {
                    $scope.MainGroupList = MainGroupData;                    
                        $scope.BasicExaminer.BranchID = "3";
                        $scope.isBranchDisabled = true;
                        $scope.isGroupDisabled = false;
                        $scope.isExamDisabled = false;
               

                }, function (MainGroupData, status, headers, config) {
                    alert(error);
                })
              
        }

        $scope.GetMainGroupListByCourse = function (CourseID, BranchID)
        {
            $scope.MainGroupList = [];
            $scope.BasicExamSubjectList = [];
            GetMainGroupList(2, 3);
        }

        $scope.GetBasicCollegeList = function (DistrictID) {          
            FillPracticalCenterList(DistrictID, 4);
            FillPracticalCenterListForAppointment(DistrictID);
        }

        function FillCollegeList(DistrictID) { 
        //$scope.GetBasicCollegeList = function (DistrictID) {
            if (DistrictID != "" || DistrictID != undefined) {
                var PraCenterList = PrePractCenterService.GetPrePractCenterByDistrictId(DistrictID, AppSettings.ExamInstID);
                PraCenterList.then(function (PracticalCenterData, status, headers, config, error) {
                    $scope.PraCenterList = PracticalCenterData;
                }, function (PracticalCenterData, status, headers, config) {
                    alert(error);
                })
                //var BasicCollegeList = BasicCollegeService.GetCollegeListByDistrict(DistrictID);
                //BasicCollegeList.then(function (CollegeData, status, headers, config, error) {
                //    $scope.BasicCollegeList = CollegeData;
                //}, function (CollegeData, status, headers, config) {
                //    alert(error);
                //})
            }
        }

        $scope.GetBasicExamSubjectList = function (BranchID) {
         
                var BasicExamSubjectList = [];                 
                    $scope.BasicExaminer.BranchID = "3";
                    $scope.isBranchDisabled = true;
                    $scope.isGroupDisabled = false;
                    $scope.isExamDisabled = false;
                    //BasicExamSubjectList = BasicExamSubjectService.GetExamTimeTableSubjectListByExamIDBranchIDAndMainGrpID($scope.BasicExaminer.ExamID, BranchID, AppSettings.ExamInstID, $scope.BasicExaminer.MainGrpID);
                    //BasicExamSubjectList = BasicExaminerService.GetPracticalExamSubjectForPracticalAppointmentList($scope.BasicExaminer.MainGrpID, $scope.BasicExaminer.ExamID);

            BasicExamSubjectList = BasicExaminerService.GetPracticalExamSubjectForPracticalBridgeAppointmentList(4, 2);
                    BasicExamSubjectList.then(function (SubjectData, status, headers, config, error) {
                    $scope.BasicExamSubjectList = SubjectData;
                    if ($scope.BasicExamSubjectList.length == 0) {
                        alert("No subjects found");
                    }
                }, function (SubjectData, status, headers, config) {
                    alert(error);
                })
             
        }


       


        //function FillPracticalCenterList(DistrictID) { 
        ////$scope.GetPracticalCenterList = function (DistrictID) {
        //    if (DistrictID != "" || DistrictID != undefined) {
        //        var PracticalCenterList = PrePractCenterService.GetPrePractCenterByDistrictId(DistrictID, AppSettings.ExamInstID);
        //        PracticalCenterList.then(function (PracticalCenterData, status, headers, config, error) {
        //            $scope.PracticalCenterList = PracticalCenterData;
        //        }, function (PracticalCenterData, status, headers, config) {
        //            alert(error);
        //        })
        //    }
        //}

        function FillPracticalCenterList(DistrictID, ZoneType) {
            //$scope.GetPracticalCenterList = function (DistrictID) {
            if (DistrictID != "" || DistrictID != undefined) {
                //var PracticalCenterList = PrePractCenterService.GetPrePractCenterByDistrictId(DistrictID, AppSettings.ExamInstID);

                var PracticalCenterList = BasicExaminerService.GetPracticalCenterListByDistrictIDANDZoneType(AppSettings.ExamInstID, 4, DistrictID);
                PracticalCenterList.then(function (PracticalCenterData, status, headers, config, error) {
                    $scope.PracticalCenterList = PracticalCenterData;
                }, function (PracticalCenterData, status, headers, config) {
                    alert(error);
                })
            }
        }


        function FillPracticalCenterListForAppointment(DistrictID) {
            //$scope.GetPracticalCenterList = function (DistrictID) {
            if (DistrictID != "" || DistrictID != undefined) {
                var PracticalCenterListForAppointment = PrePractCenterService.GetPrePractCenterByDistrictIdForAppointment(DistrictID, AppSettings.ExamInstID);
                PracticalCenterListForAppointment.then(function (PracticalCenterData, status, headers, config, error) {
                    $scope.PracticalCenterListForAppointment = PracticalCenterData;
                }, function (PracticalCenterData, status, headers, config) {
                    alert(error);
                })
            }
        }
         

        $scope.GetBasicExaminerList = function () {
            if ($scope.BasicExaminer.ExmSubID == "" || $scope.BasicExaminer.ExmSubID == undefined)
            {
                alert("Select Subject");
                return;
            }
            if ($scope.BasicExaminer.PrePractCntrID == "" || $scope.BasicExaminer.PrePractCntrID == undefined) {
                alert("Select Center");
                
            } else
            {
                
                    $scope.BasicExaminer.ZoneType = 4;                    
                
                $scope.BasicExaminer.InstanceID = AppSettings.ExamInstID;
                ///////var BasicExaminerList = BasicExaminerService.getExaminerBridgeListByCollegeID($scope.BasicExaminer.CollegeID, $scope.BasicExaminer.ExmSubID, 1, $scope.BasicExaminer.ExamID, $scope.BasicExaminer.MainGrpID);
                var BasicExaminerList = BasicExaminerService.GetBasicExaminerListByCollegeIDANDSubjectIDByObj($scope.BasicExaminer);                
                BasicExaminerList.then(function (BasicExaminerData, status, headers, config, error) {
                    $scope.BasicExaminerList = BasicExaminerData;
                    if ($scope.BasicExaminerList.length == 0) {
                        alert("No examiner appointment found");
                    } else {
                        //$scope.GetBasicExaminerListForChange();
                    }
                }, function (BasicExaminerData, status, headers, config) {
                    alert(error);
                })
            }
        }

        $scope.GetNewExaminerMobileNo = function (BasicExaminer) {
            if (BasicExaminer.ExaminerIDNew != "" || BasicExaminer.ExaminerIDNew != undefined) {
                var NewExaminerMobileNoList = BasicExaminerService.GetNewExaminerMobileNo(BasicExaminer.ExaminerIDNew);
                NewExaminerMobileNoList.then(function (BasicExaminerMobileData, status, headers, config, error) {
                    $scope.NewExaminerMobileNoList = BasicExaminerMobileData;
                    if ($scope.NewExaminerMobileNoList.length == 0) {
                        alert("No mobile number found");
                    } else {
                        BasicExaminer.mobile_noNew = $scope.NewExaminerMobileNoList[0].mobile_noNew;
                    }
                }, function (BasicExaminerMobileData, status, headers, config) {
                    alert(error);
                    })

            }
        }        
       

        $scope.SaveExaminerAppointment = function () {

            if (CheckValidation() == true) {


                var BasicExaminerList = [];
                for (var k = 0; k < $scope.BasicExaminerList.length; k++) {
                    var obj = {};

                    if ($scope.BasicExaminerList[k].cheExaminer == true) {
                        obj.ExaminerID = $scope.BasicExaminerList[k].ExaminerID;
                        obj.full_name = $scope.BasicExaminerList[k].full_name;
                        obj.designation = $scope.BasicExaminerList[k].designation;
                        obj.examinerNo = $scope.BasicExaminerList[k].examinerNo;
                        obj.PrePractCntrID = $scope.BasicExaminerList[k].PrePractCntrID;
                        obj.PrePractCntrIDNew = $scope.BasicExaminerList[k].PrePractCntrIDNew;
                        obj.mobile_no = $scope.BasicExaminerList[k].mobile_no;
                        obj.AppointmentID = $scope.BasicExaminerList[k].AppointmentID;

                        obj.ExaminerIDNew = $scope.BasicExaminerList[k].ExaminerIDNew;
                        obj.mobile_noNew = $scope.BasicExaminerList[k].mobile_noNew;
                        obj.InstanceID = $scope.BasicExaminerList[k].InstanceID;
                        obj.FromDate = $scope.BasicExaminerList[k].FromDate;
                        obj.ToDate = $scope.BasicExaminerList[k].ToDate;
                        obj.CollegeID = $scope.BasicExaminerList[k].CollegeID;
                        obj.MediumType = $scope.BasicExaminer.MediumType;
                        $scope.BasicExaminer.CollegeID = obj.CollegeID;
                        

                        if (obj.ExaminerIDNew == undefined || obj.ExaminerIDNew =="")
                        {
                            obj.ExaminerIDNew = 0;
                        } 

                        if ($scope.BasicExaminerList[k].ExaminerID == $scope.BasicExaminerList[k].ExaminerIDNew)
                        {
                            alert("Select diffrent examiner");
                            return;
                        } 
                        
                        BasicExaminerList.push(obj);
                    }
                }
                if (BasicExaminerList.length > 0) {
                    var isConfirmed = confirm("Are you sure to save this record ?");
                    if (isConfirmed == false) {
                        return;
                    }
                    $scope.BasicExaminer.BasicExaminerList = BasicExaminerList;
                    var getPromise = BasicExaminerService.PostExaminerAppointmentChange($scope.BasicExaminer);
                    getPromise.then(function (msg) {
                        alert("Updated successfully!!");
                        RedirectToListPage();
                    }, function (error) {
                        $scope.isupdatableDisable = false;
                        alert(error);
                    });
                }
                else {
                    alert("Please Select At List One Examiner To Change Appointment");
                    return;
                }
            }

        }


        function CheckValidation() {
            if (($scope.BasicExaminer.CourseID == undefined) || ($scope.BasicExaminer.CourseID == "")) {
                alert("Select Stream");
                return false;
            }
            if (($scope.BasicExaminer.ExamID == undefined) || ($scope.BasicExaminer.ExamID == "")) {
                alert("Select Exam");
                return false;
            }
            if (($scope.BasicExaminer.BranchID == undefined) || ($scope.BasicExaminer.BranchID == "")) {
                alert("Select Branch");
                return false;
            }
            if (($scope.BasicExaminer.ExmSubID == undefined) || ($scope.BasicExaminer.ExmSubID == "")) {
                alert("Select Subject");
                return false;
            }
            if (($scope.BasicExaminer.DistrictID == undefined) || ($scope.BasicExaminer.DistrictID == "")) {
                alert("Select District");
                return false;
            }
            if (($scope.BasicExaminer.PrePractCntrID == undefined) || ($scope.BasicExaminer.PrePractCntrID == "")) {
                alert("Select College");
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
            $scope.isupdatableDisable = false;
            //$state.go('PreExam.ExaminerAppintmentChange');
            $state.go('PreExam');
        }

    });
});
