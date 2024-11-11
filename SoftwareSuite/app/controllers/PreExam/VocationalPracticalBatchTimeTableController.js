define(['app'], function (app) {
    app.controller("VocationalPracticalBatchTimeTableController", function ($scope, $rootScope, $state, $stateParams, AppSettings, BasicDistrictsService, BasicCourseService, PrePractCenterService, BasicMainGroupService) {
        $scope.VocationalPracticalBatchTimeTable = {};
        var PageNm = $state.current.name.split(".")[1] + "List";
        var VocationalPracticalBatchTimeTableRightsdata = [];
        VocationalPracticalBatchTimeTableRightsdata = AppSettings.UserRights;
        for (var i = 0; i < VocationalPracticalBatchTimeTableRightsdata.length; i++) {
            if (VocationalPracticalBatchTimeTableRightsdata[i].GridFormToOpen == PageNm) {
                if ($scope.VocationalPracticalBatchTimeTable.MarkEntrSchID == 0) {
                    if (VocationalPracticalBatchTimeTableRightsdata[i].isaddable == 'Y') {
                        $scope.isupdatableDisable = false;
                    } else {
                        $scope.isupdatableDisable = true;
                    }
                    $scope.isdeletableDisable = true;
                } else {
                    if (VocationalPracticalBatchTimeTableRightsdata[i].isupdatable == 'Y') {
                        $scope.isupdatableDisable = false;
                    }
                    else {
                        $scope.isupdatableDisable = true;
                    }
                    if (VocationalPracticalBatchTimeTableRightsdata[i].isdeletable == 'Y') {
                        $scope.isdeletableDisable = false;
                    } else {
                        $scope.isdeletableDisable = true;
                    }
                }
            }
        }

        var BasicDistrictList = BasicDistrictsService.GetBasicDistrictListByDistrictIds(AppSettings.DistrictIDs);
        BasicDistrictList.then(function (Districtdata, status, headers, config, error) {
            $scope.BasicDistrictList = Districtdata;
            $scope.VocationalPracticalBatchTimeTable.DistrictID = "" + $scope.BasicDistrictList[0].DistrictID + "";
            FillVocationalCenterListDistrictID($scope.VocationalPracticalBatchTimeTable.DistrictID);
        }, function (error) {
            alert(error);
        });

        var BasicCourseList = BasicCourseService.GetBasicCourseList();
        BasicCourseList.then(function (CourseData, status, headers, config, error) {
            $scope.BasicCourseList = CourseData;
            $scope.VocationalPracticalBatchTimeTable.CourseID = "2";
            //$scope.GetExamList($scope.PracticalCenterAllocationStudentList.CourseID);
        }, function (CourseData, status, headers, config) {
            alert(error);
        })


        function FillVocationalCenterListDistrictID (DistrictID) {
            if (DistrictID != "" || DistrictID != undefined) {
                var PraCenterList = PrePractCenterService.GetPracticalCenterListByDistrictIDANDZoneType(AppSettings.ExamInstID,3, DistrictID);
                PraCenterList.then(function (PraCenterData, status, headers, config, error) {
                    $scope.PraCenterList = PraCenterData;
                }, function (PraCenterData, status, headers, config) {
                    alert(error);
                })
            }
        }


        var BasicMainGroupList = BasicMainGroupService.GetBasicMainGroupListForVocationalPractical();
        BasicMainGroupList.then(function (MainGroupData, status, headers, config, error) {
            $scope.BasicMainGroupList = MainGroupData;
        }, function (CourseData, status, headers, config) {
            alert(error);
        })


        function CheckValidation() {
            if (($scope.VocationalPracticalBatchTimeTable.CourseID == undefined) || ($scope.VocationalPracticalBatchTimeTable.CourseID == "")) {
                alert("Please Select Course");
                return false;
            }
            if (($scope.VocationalPracticalBatchTimeTable.DistrictID == undefined) || ($scope.VocationalPracticalBatchTimeTable.DistrictID == "")) {
                alert("Please Select District");
                return false;
            }
            if (($scope.VocationalPracticalBatchTimeTable.PrePractCntrID == undefined) || ($scope.VocationalPracticalBatchTimeTable.PrePractCntrID == "")) {
                alert("Please Select Practical Center");
                return false;
            }
            if (($scope.VocationalPracticalBatchTimeTable.MainGrpID == undefined) || ($scope.VocationalPracticalBatchTimeTable.MainGrpID == "")) {
                alert("Please Select Course");
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
            $state.go('PreExam');
        }
        $scope.GetEximinerData = function () {
            if ($scope.VocationalPracticalBatchTimeTable.DistrictID == undefined) { $scope.VocationalPracticalBatchTimeTable.DistrictID = 0; }
            if ($scope.VocationalPracticalBatchTimeTable.MainGrpID == undefined) { $scope.VocationalPracticalBatchTimeTable.MainGrpID = 0; }
            var getExaminerData = PrePractCenterService.GetExamineForVocationalPractical($scope.VocationalPracticalBatchTimeTable.DistrictID, $scope.VocationalPracticalBatchTimeTable.MainGrpID);
            getExaminerData.then(function (ExaminerData, status, headers, config, error) {
                $scope.BasicExaminerListForChange = ExaminerData;
            }, function (CourseData, status, headers, config) {
                alert(error);
            })
        }
        $scope.GetPracticalBatchesByGroup = function () {
            $scope.VocationalPracticalBatchTimeTable.ExamID = 4;
            if ($scope.VocationalPracticalBatchTimeTable.DistrictID == undefined) { $scope.VocationalPracticalBatchTimeTable.DistrictID = 0; }
            if ($scope.VocationalPracticalBatchTimeTable.MainGrpID == undefined) { $scope.VocationalPracticalBatchTimeTable.MainGrpID = 0; }
            var PracticalBatchesData = PrePractCenterService.GetBatchListForVocationalPractical($scope.VocationalPracticalBatchTimeTable.DistrictID,
                $scope.VocationalPracticalBatchTimeTable.MainGrpID, $scope.VocationalPracticalBatchTimeTable.PrePractCntrID,
                $scope.VocationalPracticalBatchTimeTable.ExamID);
            PracticalBatchesData.then(function (MainGroupData, status, headers, config, error) {
                $scope.PracticalBatchesList = MainGroupData;
                for (var i = 0; i < $scope.PracticalBatchesList.length; i++) {
                    $scope.PracticalBatchesList[i].AppointMentDate = new date();
                    $scope.PracticalBatchesList[i].BasicExaminerListForChange = $scope.BasicExaminerListForChange;
                    $scope.PracticalBatchesList[i].ExaminerID = "";
                    //$scope.PracticalBatchesList[i].ExaminerID = "" + $scope.BasicExaminerListForChange[0].ExaminerID + "";
                }
            }, function (CourseData, status, headers, config) {
                alert(error);
            })
        }
        
        $scope.Examinerchange = function (BasicExaminer) {
            for (var i = 0; i < $scope.BasicExaminerListForChange.length; i++) {
                if ($scope.BasicExaminerListForChange[i].ExaminerID == BasicExaminer.ExaminerID) {
                    BasicExaminer.examinerNo = $scope.BasicExaminerListForChange[i].examinerNo;
                    BasicExaminer.mobile_no = $scope.BasicExaminerListForChange[i].mobile_no;
                }
            }
        }
        $scope.SaveData = function () {
            if (($scope.VocationalPracticalBatchTimeTable.CourseID == undefined) || ($scope.VocationalPracticalBatchTimeTable.CourseID == "")) {
                alert("Please Select Course");
                return false;
            }
            if (($scope.VocationalPracticalBatchTimeTable.DistrictID == undefined) || ($scope.VocationalPracticalBatchTimeTable.DistrictID == "")) {
                alert("Please Select District");
                return false;
            }
            if (($scope.VocationalPracticalBatchTimeTable.PrePractCntrID == undefined) || ($scope.VocationalPracticalBatchTimeTable.PrePractCntrID == "")) {
                alert("Please Select Practical Center");
                return false;
            }
            if (($scope.VocationalPracticalBatchTimeTable.MainGrpID == undefined) || ($scope.VocationalPracticalBatchTimeTable.MainGrpID == "")) {
                alert("Please Select Course");
                return false;
            }
            $scope.updatedStudentInfoList = [];
            for (var i = 0; i < $scope.PracticalBatchesList.length; i++) {
                $scope.PracticalBatchesList[i].CreateLoginID = AppSettings.LoggedUserId;
                $scope.PracticalBatchesList[i].CreLoginID = AppSettings.LoggedUserId;
                $scope.PracticalBatchesList[i].CenterCollegeID = AppSettings.CollegeID;

                $scope.isCorrect = true;
                if ($scope.PracticalBatchesList[i].RecordID > 0) {
                    if (($scope.PracticalBatchesList[i].OldMarks !== $scope.PracticalBatchesList[i].Marks) || ($scope.PracticalBatchesList[i].OldStatusFlag !== $scope.studentDetailList[i].StatusFlag)) {
                        var temp = {};
                        angular.copy($scope.PracticalBatchesList[i], temp);
                        $scope.updatedStudentInfoList.push(temp);
                    }
                } else {
                    var temp = {};
                    angular.copy($scope.PracticalBatchesList[i], temp);
                    $scope.updatedStudentInfoList.push(temp);
                }

            }
            if ($scope.isCorrect) {

                $scope.VocationalPracticalBatchTimeTable.preVocBatchesList = $scope.updatedStudentInfoList;
                $scope.VocationalPracticalBatchTimeTable.ExamInstID = AppSettings.ExamInstID; 
                $scope.VocationalPracticalBatchTimeTable.CreLoginID = AppSettings.LoggedUserId; 
                $scope.VocationalPracticalBatchTimeTable.UpdLoginID = AppSettings.LoggedUserId;
                $scope.VocationalPracticalBatchTimeTable.CreateLoginID = AppSettings.LoggedUserId;
                $scope.VocationalPracticalBatchTimeTable.CenterCollegeID = AppSettings.CollegeID;
                var isConfirmed = confirm("Are you sure,you want to Submit ?");
                if (isConfirmed) {
                    PrePractCenterService.postPreVocPracticalBatchsEntry($scope.VocationalPracticalBatchTimeTable).then(function (results) {
                        if (results.IsSuccess) {

                        }
                    }, function (error) {
                        $scope.updatedStudentInfoList = [];
                        $scope.studentDetailList = [];
                        $scope.loading = false;
                        $scope.savedisable = false;
                        alert(error.statusText);
                    });
                } else {

                }
            }

        }
    });
});
