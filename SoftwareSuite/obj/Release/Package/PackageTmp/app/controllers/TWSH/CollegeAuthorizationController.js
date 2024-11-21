define(['app'], function (app) {
    app.controller("CollegeAuthorizationController", function ($scope, $http, $timeout, $localStorage, $state, $stateParams, AppSettings, TwshStudentRegService) {
        var authData = $localStorage.Twsh;
        $scope.studDetailsfound = false;
        $scope.failed = false;

        $scope.userId = authData.UserId;
        $scope.ExamCenterID = authData.ExamCenterID;
        $scope.UserId = authData == undefined || authData == "" ? -1 : authData.UserId;

        var GetExamCenterApplied = TwshStudentRegService.getExamCenterApplied($scope.UserId);
        GetExamCenterApplied.then(function (response) {
            if (response) {
                if (response.Table) {
                    $scope.studDetailsfound = true;
                    $scope.class = "alert-success";
                    //  $scope.StatusMessage = true;
                    //  $scope.showStatus = true;
                    var OnRoll = 0;///Registered

                    var Approved = 0;

                    var isrejected = 0; //Rejected
                    var NeedToApprove = 0; //Pending
                    $scope.GetAppliedStudents = response.Table1;
                    for (var i = 0; i < response.Table1.length; i++) {
                        if (response.Table1[i].OnRoll != null)
                            OnRoll = OnRoll + response.Table1[i].OnRoll;
                        if (response.Table1[i].Approved != null)
                            Approved = Approved + response.Table1[i].Approved;
                        if (response.Table1[i].isrejected != null)
                            isrejected = isrejected + response.Table1[i].isrejected;

                        if (response.Table1[i].NeedToApprove != null)
                            NeedToApprove = NeedToApprove + response.Table1[i].NeedToApprove;
                    }
                    $scope.OnRoll = OnRoll;
                    $scope.Approved = Approved;

                    $scope.isrejected = isrejected;
                    $scope.NeedToApprove = NeedToApprove;
                    $scope.GetAppliedStudents.forEach(function (modules) {
                        if (modules.NeedToApprove == null && modules.NeedToApprove == '0') {
                            $scope.ApproveList = true;
                        } else {
                            $scope.ApproveList = false;
                        }
                    });

                } else {
                    $scope.StatusMessage = "No data found!";
                    $scope.showStatus = true;
                    $scope.statusclass = "alert-danger";
                    $scope.studDetailsfound = false;
                }

                //$timeout(function () {
                //    $scope.showStatus = false;                  
                //}, 5000);
            } else {
                $scope.StatusMessage = "No Record found!";
                $scope.showStatus = true;
                $scope.statusclass = "alert-danger";
                //$timeout(function () {
                //    $scope.showStatus = false;
                //}, 5000);
                $scope.studDetailsfound = false;
            }

        },
            function (error) {
                $scope.showStatus = true;
                $scope.statusclass = "alert-danger";
                $scope.StatusMessage = "No Record found!";
                $scope.showStatus = true;
                $timeout(function () {
                    $scope.showStatus = false;
                }, 5000);
                $scope.studDetailsfound = false;
            });
        $scope.noData = function () {
            window.scroll({
                top: 50, // could be negative value
                left: 0,
                behavior: 'smooth'
            });
            $scope.showStatus = true;
            $scope.statusclass = "alert-danger";
            $scope.StatusMessage = "No Approvals found!";
            $scope.showStatus = true;
            $timeout(function () {
                $scope.showStatus = false;
            }, 5000);

        }


        $scope.DownloadtoExcel = function () {
            var DataType = 2;
            $scope.LoadImg = true;

            TwshStudentRegService.GetStudentsRejectedExcel(DataType, $scope.ExamCenterID)
                .then(function (response) {
                    if (response != null && response.length > 1) {
                        var location = window.location.origin;
                        $scope.LoadImg = false;
                        window.location.href = response;
                        $scope.NoResult = false;
                    } else {
                        $scope.LoadImg = false;
                        alert("Error Generating The Report");
                        $scope.NoResult = true;
                    }
                },
                    function (error) {
                        $scope.LoadImg = false;
                        alert("error data is not getting");
                        var err = JSON.parse(error);
                        console.log(err.Message);
                    });

        }

        $scope.openStudentList = function (courseId, gradeId, languageId, examBatch, DataType) {

            $localStorage.collegeAuthorization = "";

            collegeauthorization = {
                UserId: $scope.UserId,
                CourseId: courseId,
                GradeId: gradeId,
                LanguageId: languageId,
                ExamBatch: examBatch,
                DataType: DataType
            }

            $localStorage.collegeAuthorization = collegeauthorization;
            $state.go('TWSH.ViewAuthorization');
        }

    })
})