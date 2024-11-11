define(['app'], function (app) {
    app.controller("ReleaseSixthSemController", function ($scope, $http, $localStorage, $state, $uibModal, $stateParams, AppSettings, AssessmentService, StudentRegService,AcademicService, $uibModal, $timeout, PreExaminationService) {

         var AcademicYearsActive = AssessmentService.getFeeAcademicYearsActive();
        AcademicYearsActive.then(function (response) {
            $scope.years = response.Table[0];

        },
        function (error) {
            alert("error while loading Academic Year");
        });

        var GetCollegeList = StudentRegService.GetColleges();
        GetCollegeList.then(function (data) {
            if (data.Table.length > 0) {
                $scope.GetCollegeList = data.Table;

            } else {
                alert("Colleges not found.");
                $scope.GetCollegeList = [];
            }

        }, function (error) {
            console.log(error);
            $scope.GetCollegeList = [];
        });


        $scope.ChangeCollege = function () {
            var Branch = PreExaminationService.getBranchsByCollegeCode($scope.College);
            Branch.then(function (response) {
                var response = JSON.parse(response);
                if (response.Table.length > 0) {
                    $scope.branchdata = response.Table;
                } else {
                    $scope.branchdata = [];
                    alert("No Student found on this Record");
                }
            },
                function (error) {
                    alert("error while loading Branchs");
                    console.log(error);
                });
        }



        $scope.Release = function () {
            $scope.loading = true;
            var getActiveList = PreExaminationService.ReleaseSixthSem($scope.years.AcademicId,$scope.College, $scope.SelBranch);
            getActiveList.then(function (res) {
                var response = JSON.parse(res)
                if (response.Table[0].ResponseCode == '200') {
                    $scope.loading = false;
                    alert(response.Table[0].ResponseDescription)

                } else if (response.Table[0].ResponseCode == '400') {
                    $scope.loading = false;
                    alert(response.Table[0].ResponseDescription)

                }else {
                    alert('Something Went Wrong')
                    $scope.loading = false;
                    $scope.Noresult = true;
                    $scope.result = false;
                }
            },
                function (error) {
                    alert("error while Entering Marks");
                    $scope.loading = false;
                    $scope.Noresult = true;
                    $scope.result = false;
                    $scope.failResponse = response[0].ResponceDescription;
                    $scope.StatisticalReports = [];
                    var err = JSON.parse(error);
                    console.log(err.Message);
                });
        }

    })
})