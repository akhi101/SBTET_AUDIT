define(['app'], function (app) {
    app.controller("ReAdmissionStudentListController", function ($http, $scope, $state,$localStorage, $stateParams,$uibModal, AppSettings, ReAdmissionService) {
        var authData = $localStorage.authorizationData;       
        $scope.College_Code = authData.College_Code;
        $scope.userType = authData.SystemUserTypeId
        //console.log(AppSettings);
        var branchcode = AppSettings.BranchCode;
        var semid = AppSettings.Semid;
        var AcademicYear = AppSettings.AcademicYear;
        var Scheme = AppSettings.Scheme;
        $scope.LoadImg = true;
        $scope.Access = false;
        $scope.showReAdmissionstudentList = false;
        $scope.responsedata = [];
        var Collegecode = $scope.College_Code;        
       

        $scope.sort = function (keyname) {
            $scope.sortKey = keyname;
            $scope.reverse = !$scope.reverse;
        }
        if ($scope.userType == 2) {
            var data = {};
            $scope.$emit('showLoading', data);
            var ReAdmissionlistByBranch = ReAdmissionService.GetReAdmissionListByBranchCode(Collegecode, branchcode, semid, AcademicYear, Scheme);
            ReAdmissionlistByBranch.then(function (response) {
                if (response.length > 0) {
                    var SrNo = 1;
                    $scope.$emit('hideLoading', data);
                    for (var i = 0; i < response.length; i++) {
                        $scope.$emit('hideLoading', data);
                        response[i].ReAdmissionListSrNo = SrNo;
                        SrNo = SrNo + 1;
                        $scope.ResponseData = response;
                       
                    }
                    console.log(response)
                   
                    $scope.LoadImg = false;
                    $scope.showReAdmissionstudentList = true;
                }
                else {
                    $scope.$emit('hideLoading', data);
                    $scope.LoadImg = false;
                    $scope.showReAdmissionstudentList = true;
                    alert("Data Not Found");
                    $scope.responsedata = [];
                    return;
                }

            }, function (error) {
                $scope.$emit('hideLoading', data);
                alert("error");

            });
        }
       

        $scope.approveStudent = function (Collegecode, Semid, pin) {
            if ((Collegecode == undefined) || (Collegecode == "0") || (Collegecode == "")) {
                alert('collegecode is not defined');
                return;
            }
            if ((Semid == undefined) || (Semid == "0") || (Semid == "")) {
                alert('sem is not defined');
                return;
            }
            if ((pin == undefined) || (pin == "0") || (pin == "")) {
                alert('Pin is not defined');
                return;
            }

            var ApproveStudent = ReAdmissionService.StudentReAdmission(Collegecode, Semid, pin);
            ApproveStudent.then(function (response) {
                var res = JSON.stringify(response)
                if (res == "{}" || res == null || res == "") {
                    alert("student ReAdmitted Successfully");
                } else {
                    alert(res);
                }
                $scope.closeModal();
                $state.go('Admission.ReAdmission');
            }, function (error) {
                alert("error");
                console.log(error);

            });
        }
        
       
        $scope.closeModal = function () {
            $scope.modalInstance.close();
        };


        $scope.ReadmitStudent = function (Name, Pin, Semid) {
            $scope.Pin = Pin;
            $scope.Name = Name;
            $scope.Semid = Semid;

            $scope.modalInstance = $uibModal.open({
                templateUrl: "/app/views/Admission/ReAdmissionStudentPopup.html",
                size: 'sm',
                windowClass: 'modal-fit',
                //controller: 'ModalInstanceCtrl',
                scope: $scope,               
            });
        }
        
    });

    //app.controller("ModalInstanceCtrl", function ($scope, $modalInstance) {
    //    $scope.closeModal = function () {
    //        $scope.modalInstance.dismiss('close');
    //    };

    //    $scope.approveStudent = function () {


    //        $scope.modalInstance.close('close');
    //    };
    //});

});