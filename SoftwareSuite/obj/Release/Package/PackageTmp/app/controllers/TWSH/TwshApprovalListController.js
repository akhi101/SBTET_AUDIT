define(['app'], function (app) {
    app.controller("TwshApprovalListController", function ($scope, $state, TwshStudentRegService, $localStorage) {
        var authData = $localStorage.authorizationData;

        $scope.userId = authData.SysUserID;
        $scope.userType = authData.SystemUserTypeId;
        //$scope.LoadImg = true;
        var MyData = {};
        $scope.$emit('showLoading', MyData);
        var GetInstituteReports = TwshStudentRegService.getTwshApprovelList($scope.userType);
        GetInstituteReports.then(function (response) {
            if (response.length > 0) {
                //$scope.LoadImg = false;
                $scope.$emit('hideLoading', MyData);
                $scope.data = true;

                $scope.QualifiedList = response;
                var ApprovalPending = 0;
                var Approved = 0;
                var Rejected = 0;
                for (count = 0; count < $scope.QualifiedList.length; count++) {
                    ApprovalPending += parseInt($scope.QualifiedList[count].ApprovalPending)
                    Approved += parseInt($scope.QualifiedList[count].Approved);
                    Rejected += parseInt($scope.QualifiedList[count].Rejected);
                }

                $scope.ApprovalPending = ApprovalPending;
                $scope.Approved = Approved;
                $scope.Rejected = Rejected;

            } else {
                //$scope.LoadImg = false;
                $scope.$emit('hideLoading', MyData);
                $scope.StatusMessage = "No Data Found";
                $scope.showStatus = true;
                $scope.statusclass = 'alert-danger';
                $scope.data = false;
            }
        },
            function (error) {
                $scope.$emit('hideLoading', MyData);
                //$scope.LoadImg = false;
                $scope.StatusMessage = "No Data Found";
                $scope.showStatus = true;
                $scope.statusclass = 'alert-danger';
                $scope.data = false;

            });

        


        $scope.OpenCountData = function (DataType, GradeId) {
            $localStorage.TwshStudentData = {
                DataType: DataType,
                GradeId: GradeId

            }
            //localStorage.setItem('RegistrationNo', RegistrationNo)
            $state.go('Dashboard.TypeWriting.TwshApprovalListDetails')
        }

    })
})