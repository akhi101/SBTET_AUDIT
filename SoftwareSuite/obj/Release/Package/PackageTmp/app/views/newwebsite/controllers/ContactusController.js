define(['app'], function (app) {
    app.controller("ContactusController", function ($scope, $state, $stateParams, AppSettings, AdminService) {
     
        /// $state.go('index');

        var getcirculartype = AdminService.getCircularTypes();
        getcirculartype.then(function (response) {
            if (response.Table.length > 0) {
                $scope.CircularTypes = response.Table;

            } else {

            }
        },
                function (error) {


                });
        
        $scope.PreExamStaff = []
        $scope.AcademicStaff = []
        $scope.AdministrationStaff = []
        $scope.PostExamStaff = []
        $scope.ITStaff = []
        $scope.OthersStaff = []
        $scope.ChairmanList = []
        $scope.SecretaryList = []
        var getcircular = AdminService.getStaffActive();
        getcircular.then(function (response) {
            //var response = JSON.parse(res)

            if (response.Table.length > 0) {
                $scope.loading = false;
                $scope.data = true;
                $scope.error = false;
                $scope.StaffList = response.Table;
                for (i = 0;i  <= $scope.StaffList.length; i++) {
                    console.log($scope.StaffList[i].SectionId)
                    if ($scope.StaffList[i].SectionId == 1) {                      
                        $scope.AcademicStaff.push($scope.StaffList[i])
                    }else
                    if ($scope.StaffList[i].SectionId == 2) {
                        $scope.PreExamStaff.push($scope.StaffList[i])
                    } else
                        if ($scope.StaffList[i].SectionId == 3) {
                            $scope.PostExamStaff.push($scope.StaffList[i])
                    } else
                            if ($scope.StaffList[i].SectionId == 4) {
                                $scope.ITStaff.push($scope.StaffList[i])
                    } else
                     if ($scope.StaffList[i].SectionId == 5) {
                         $scope.AdministrationStaff.push($scope.StaffList[i])
                    } else
                     if ($scope.StaffList[i].SectionId == 6) {
                         $scope.OthersStaff.push($scope.StaffList[i])
                     } else
                         if ($scope.StaffList[i].SectionId == 7) {
                             $scope.ChairmanList.push($scope.StaffList[i])
                         }
                         else
                             if ($scope.StaffList[i].SectionId == 8) {
                                 $scope.SecretaryList.push($scope.StaffList[i])
                             }
                }
                console.log($scope.PreExamStaff)


            } else {
                $scope.loading = false;
                $scope.data = false;
                $scope.error = true;
            }
        },
                function (error) {

                    console.log(error);
                    $scope.loading = false;
                    $scope.data = false;
                    $scope.error = true;
                });

       
    });
});
