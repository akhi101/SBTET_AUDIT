define(['app'], function (app) {
    app.controller("TransferStudentController", function ($scope, $http, $localStorage, $state, $uibModal, $stateParams, AppSettings, StudentRegService, $uibModal, $timeout, PreExaminationService) {
        var authData = $localStorage.authorizationData;
        $scope.userType = authData.SystemUserTypeId;

        $scope.ResultFound = false;
        $scope.LoadImg = false;
        $scope.ResultNotFound = false;
        $scope.Remarks = "Student Transfer"
        var GetCollegeList = StudentRegService.GetColleges();
        GetCollegeList.then(function (data) {
            if (data.Table.length > 0) {
                $scope.GetCollegeList = data.Table;

            } else {
                alert("Transfer college details not found.");
                $scope.GetCollegeList = null;
            }

        }, function (error) {
            console.log(error);
            $scope.GetCollegeList = null;
        });

        $scope.GetTransferCollegeDetails = function () {
            if ($scope.studentdata.AcademicYearId == "" || angular.isUndefined($scope.studentdata.AcademicYearId) || $scope.studentdata.AcademicYearId == null) {

                return;
            }
            if ($scope.newcollegecode == "" || angular.isUndefined($scope.newcollegecode) || $scope.newcollegecode == null) {

                return;
            }
            if ($scope.studentdata.BranchCode == "" || angular.isUndefined($scope.studentdata.BranchCode) || $scope.studentdata.BranchCode == null) {

                return;
            }
            if ($scope.studentdata.SemId == "" || angular.isUndefined($scope.studentdata.SemId) || $scope.studentdata.SemId == null) {

                return;
            }

            var GetTransferCollegeDetails = StudentRegService.GetTransferCollegeDetails($scope.studentdata.AcademicYearId, $scope.newcollegecode, $scope.studentdata.BranchCode, $scope.studentdata.SemId);
            GetTransferCollegeDetails.then(function (data) {

                if (data.Table.length > 0) {
                    $scope.Branchs = data.Table[0];

                } else {
                    alert("Transfer college branch details not found.");
                    $scope.Branchs = [];
                }

            }, function (error) {
                console.log(error);
                $scope.Branchs = [];
            });
        }

        $scope.getDetails = function () {
            if ($scope.Pin == "" || angular.isUndefined($scope.Pin) || $scope.Pin == null) {
                alert("Enter PIN");
                return;
            }

            var GetTransferStudentdetails = StudentRegService.GetTransferStudentdetails($scope.Pin);
            GetTransferStudentdetails.then(function (data) {

                if (data.Table.length > 0) {
                    if (data.Table[0].ResponceCode == "200") {
                        if (data.Table1.length > 0) {
                            $scope.studentdata = data.Table1[0];
                            $scope.Eligiblecolleges = data.Table2;
                            $scope.ResultFound = true;
                            $scope.LoadImg = false;
                            $scope.ResultNotFound = false;
                        }


                    } else {
                        $scope.ResultFound = false;
                        $scope.LoadImg = false;
                        $scope.ResultNotFound = true;
                        alert(data.Table[0].ResponceDescription);
                    }
                }

            }, function (error) {
                console.log(error);
            });
        }


        $scope.OpenPopup = function () {

            $scope.modalInstance = $uibModal.open({
                templateUrl: "/app/views/PostExam/TransferPopup.html",
                size: 'xlg',
                scope: $scope,
                windowClass: 'modal-fit-att',

            });
        }


        var GetBranchList = StudentRegService.getActiveBranches();
        GetBranchList.then(function (data) {
            if (data.Table.length > 0) {
                $scope.branchdata = data.Table

            } else {
                alert("Branches details not found.");
                $scope.branchdata = null;
            }

        }, function (error) {
            console.log(error);
            $scope.branchdata = null;
        });


        $scope.Changecollege = function (newcollege) {
            var clgCode = newcollege.CollegeCode
            if (clgCode.length === 2) {
                $scope.newcollegecode = '0' + clgCode
            } else if (clgCode.length === 1) {
                $scope.newcollegecode = '00' + clgCode
            } else {
                $scope.newcollegecode = clgCode
            }
          
            $scope.newcollegename = newcollege.CollegeName;
            $scope.GetTransferCollegeDetails();
        }

        $scope.TransferAttendeeId = function (AttendeeId, AttendeeCollege, AttendeeBranch, Remarks) {
            if (AttendeeId == {} || AttendeeId == null || angular.isUndefined(AttendeeId)) {
                alert('Enter Attendee Id to transfer');
                return
            }

            if (AttendeeCollege == {} || AttendeeCollege == null || angular.isUndefined(AttendeeCollege)) {
                alert('select the college to transfer');
                return
            }

            if (AttendeeBranch == {} || AttendeeBranch == null || angular.isUndefined(AttendeeBranch)) {
                alert('select the Branch to transfer');
                return
            }
            if (Remarks == {} || Remarks == null || angular.isUndefined(Remarks)) {
                alert('Enter Remarks to transfer');
                return
            }
            var TransferStudent = PreExaminationService.TransferBmaAttendee(AttendeeCollege, AttendeeId, AttendeeBranch, Remarks);
            TransferStudent.then(function (data) {
                var res = JSON.parse(data)
                if (res.respcode == '200') {
                    var msg = res.respdesc + ' for ' + 'PIN :' + res.attdid + '. Please Note New Attendee Id :' + res.attdid
                    alert(msg);
                    $scope.btndisable = false;
                    $scope.closeModal();
                } else
                    if (res.respcode == '413') {
                        var msg = res.respdesc + ' for ' + 'PIN :' + res.attdid
                        alert(msg);
                        $scope.btndisable = false;
                        // $scope.closeModal();
                    }

            }, function (error) {
                console.log(error);
                    $scope.btndisable = false;
                    alert('Something Went Wrong')
            });
        }

        $scope.Transfer = function () {
            if ($scope.newcollege == {} || $scope.newcollege == null || angular.isUndefined($scope.newcollege)) {
                alert('select the college to transfer');
                return
            }

            if ($scope.newcollegecode == $scope.studentdata.CollegeCode) {
                alert('From and to colleges should not be same, try different college.');
                return
            }

            if ($scope.branchdata == {} || $scope.branchdata == null || angular.isUndefined($scope.branchdata)) {
                alert('Branch not available in the selected college to transfer,try different college.');
                // return
            }



            $scope.modalInstance = $uibModal.open({
                templateUrl: "/app/views/Admission/TransferConfirmationPopup.html",
                size: 'lg',
                windowClass: 'modal-fit',
                //controller: 'ModalInstanceCtrl',
                scope: $scope,
            });
        }
        $scope.cancel = function () {

            $scope.studentdata = {};
            $scope.Eligiblecolleges = [];
            $scope.ResultFound = false;
            $scope.LoadImg = false;
            $scope.ResultNotFound = false;


        }
        $scope.closeModal = function () {
            $scope.modalInstance.close();
        };

        $scope.TransferStudent = function (oldcollegecode, newcollegecode, PIN) {
            if (oldcollegecode == "" || angular.isUndefined(oldcollegecode) || oldcollegecode == null) {
                alert("old College is not defined");
                return;
            }
            if (newcollegecode == "" || angular.isUndefined(newcollegecode) || newcollegecode == null) {
                alert("New College is not defined");
                return;
            }
            if (PIN == "" || angular.isUndefined(PIN) || PIN == null) {
                alert("PIN not defined");
                return;
            }

            if ($scope.studentdata.AttendeeId == "" || angular.isUndefined($scope.studentdata.AttendeeId) || $scope.studentdata.AttendeeId == null) {
                alert("AttendeeId details not found.");
                return;
            }
            if ($scope.studentdata.BranchCode == "" || angular.isUndefined($scope.studentdata.BranchCode) || $scope.studentdata.BranchCode == null) {
                alert("Branch details not found.");
                return;
            }
            if ($scope.studentdata.Semester == "" || angular.isUndefined($scope.studentdata.Semester) || $scope.studentdata.Semester == null) {
                alert("Semester details not found.");
                return;
            }

            var regData = {
                pin: PIN,
                collegecode: newcollegecode,
                oldCollegecode: oldcollegecode,
                attendeeid: $scope.studentdata.AttendeeId,
                branch: $scope.studentdata.BranchCode,
                semester: $scope.studentdata.Semester,
                remarks: 'Student Transfer'
            }
            $scope.btndisable = true
            var TransferStudent = StudentRegService.TransferStudent(regData);
            TransferStudent.then(function (data) {
                if (data.Table.length > 0) {
                    alert(data.Table[0].responce);
                    $scope.btndisable = false;
                    $scope.closeModal();
                }

            }, function (error) {
                console.log(error);
                $scope.btndisable = false;
            });

        }





    });
});