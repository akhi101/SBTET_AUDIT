define(['app'], function (app) {
    app.controller("FacultySubjectMapping", function ($scope, $http, $localStorage, $state, $stateParams, AppSettings, $uibModal, AcademicService, PreExaminationService, StudentWiseService) {
        $scope.HideBatch = true;
        var authData = $localStorage.authorizationData;
        $scope.College_Code = authData.College_Code;
        $scope.BranchId = authData.BranchId;

        $scope.EnableEdit = false;
        $scope.subjects = [];
        $scope.staff = [];
        $scope.tempStaff = {};
        $scope.Table = false;
        $scope.shifts = [{ shiftid: 1, shiftName: "Batch 1" }, { shiftid: 2, shiftName: "Batch 2" }]





        $scope.editDetails = function () {
            $scope.EnableEdit = true;
        };
        $scope.cancelEdit = function () {
            $scope.EnableEdit = false;
            for (var j = 0; j < $scope.subjects.length; j++) {
                $scope.tempStaff[$scope.subjects[j].Id] = "0";
                for (var i = 0; i < $scope.mappedsubjects.length; i++) {
                    if ($scope.mappedsubjects[i].SubjectId == $scope.subjects[j].Id) {
                        $scope.tempStaff[$scope.subjects[j].Id] = "" + $scope.mappedsubjects[i].StaffId + "";
                        break;
                    }
                }
            }
        };
        $scope.saveSelection = function () {
            var data = [];
            var sub = Object.keys($scope.tempStaff);
            for (var i = 0; i < sub.length; i++) {
                data[data.length] = {
                    subjectId: parseInt(sub[i]),
                    staffId: $scope.tempStaff[parseInt(sub[i])]
                };
            }
            let shiftid = $scope.Selectedshift;
            var SetMappingList = AcademicService.SetMappingList($scope.College_Code, $scope.Branch_Id, shiftid, JSON.stringify(data))
            SetMappingList.then(function (response) {

                $scope.EnableEdit = false;
                alert("Subjects are mapped successfully with Staff");
            }, function (error) {
                alert("error while loading semesters");
                var err = JSON.parse(error);
                console.log(err.Message);
            });
        };

        var SCHEMESEMINFO = StudentWiseService.GetSchemeDataForResults();
        $scope.pin = "";
        SCHEMESEMINFO.then(function (data) {
            if (data.length > 0) {
                $scope.schemeinf = []
                $scope.schemeinfo = data;
                //$scope.schemeinfo = [{ schemeid: 5, scheme: "C18" }, { schemeid: 2, scheme: "ER91" }, { schemeid: 9, scheme: "C21" }, { schemeid: 10, scheme: "ER2020" }]

                for (var i = 0; i < $scope.schemeinfo.length; i++) {
                    if ($scope.schemeinfo[i].ActiveFlag == true) {
                        $scope.schemeinf.push($scope.schemeinfo[i]);

                    }
                }
            }
        }, function (error) {
            alert(error);
        });

        $scope.ChangeSemester = function () {
            var LoadActiveSemesters = PreExaminationService.getActiveSemester();
            LoadActiveSemesters.then(function (response) {
                $scope.ActiveSems = [];
                $scope.ActiveSemesters = response.Table;
                console.log($scope.ActiveSemesters)
                //   $scope.ActiveSemesters = [{ semid: 2, sem: "2SEM" }, { semid: 4, sem: "4SEM" }]
                // $scope.ActiveSemesters = [{ semid: 1, sem: "1SEM" }, { semid: 2, sem: "2SEM" }, { semid: 3, sem: "3SEM" }, { semid: 4, sem: "4SEM" }, { semid: 5, sem: "5SEM" }]
                for (var i = 0; i < $scope.ActiveSemesters.length; i++) {
                    if ($scope.ActiveSemesters[i].current_schemeid == $scope.scheme) {
                        $scope.ActiveSems.push($scope.ActiveSemesters[i]);
                        $scope.Selectedshift = $scope.ActiveSemesters[i].AySession
                    }
                }
                // console.log( $scope.ActiveSems )
            }, function (error) {
                alert("error while loading semesters");
                var err = JSON.parse(error);
                console.log(err.Message);
            });
        }
        // $scope.ChangeSemester = function (SchemeId) {

        //     $scope.StudentId = 1;
        //     var LoadSemByScheme = AcademicService.getSemBySchemes($scope.StudentId, SchemeId)
        //     LoadSemByScheme.then(function (response) {
        //         if (response.length > 0) {
        //             $scope.ActiveSemesters = response;

        //         } else {
        //             // $scope.Examtypes = [];
        //             alert("No Sem found on this Record");
        //         }

        //     },
        //         function (error) {
        //             alert("error while loading Semesters");
        //             var err = JSON.parse(error);
        //             console.log(err.Message);
        //         });

        // }

        $scope.facultyChange = function (subjectId) {
            for (var i = 0; i < $scope.mappedsubjects.length; i++) {
                if ($scope.mappedsubjects[i].subjectId == subjectId) {
                    $scope.mappedsubjects[i].staffId = $scope.tempStaff[subjectId];
                    console.log($scope.mappedsubjects);
                    return;
                }
            }
            $scope.mappedsubjects[$scope.mappedsubjects.length] = {
                SubjectId: subjectId,
                StaffId: $scope.tempStaff[subjectId]
            }
        };

        $scope.GetMappingList = function () {
            $scope.Table = true;
            if (($scope.scheme == undefined) || ($scope.scheme == "0") || ($scope.scheme == "")) {
                alert("Select Scheme");
                return;
            }
            if (($scope.semester == undefined) || ($scope.semester == "0") || ($scope.semester == "")) {
                alert("Select Semester");
                return;
            }
            //if (($scope.Selectedshift == undefined) || ($scope.Selectedshift == "0") || ($scope.Selectedshift == "")) {
            //    alert("Select Shift");
            //    return;
            //}
            var Scheme = $scope.scheme;
            var Smester = $scope.semester;
            let shiftid = $scope.Selectedshift;
            var GetMappingList = AcademicService.GetMappingList($scope.College_Code, $scope.BranchId, Scheme, Smester, shiftid)
            GetMappingList.then(function (response) {

                $scope.mappedsubjects = response.Table2;
                $scope.staff = response.Table1;
                for (var j = 0; j < response.Table.length; j++) {
                    $scope.tempStaff[response.Table[j].Id] = "0";
                    for (var i = 0; i < $scope.mappedsubjects.length; i++) {
                        if ($scope.mappedsubjects[i].SubjectId == response.Table[j].Id) {
                            $scope.tempStaff[response.Table[j].Id] = "" + $scope.mappedsubjects[i].StaffId + "";
                            break;
                        }
                    }
                }
                $scope.getStudentsData()
                $scope.subjects = response.Table;
                $scope.Branch_Id = response.Table[0].BranchId;
            },
                function (error) {
                    alert("error while loading semesters");
                    var err = JSON.parse(error);
                    console.log(err.Message);
                }
            )
        };
        $scope.getStudentsData = function () {
            var getReport = AcademicService.getStudentsList($scope.scheme, $scope.College_Code, $scope.BranchId, $scope.semester);
            getReport.then(function (response) {
                if (response.Table.length > 0) {
                    console.log(response);
                    $scope.StudentsList = response.Table;
                    $scope.NoData = false;
                    $scope.result = true;
                    // $scope.FacultyMappingReport1 = response.Table1;

                } else {
                    $scope.NoData = true;
                    $scope.result = false;
                }
            },
                function (error) {

                    alert("error while loading Report");
                    var err = JSON.parse(error);
                    $scope.NoData = true;
                    $scope.result = false;
                    console.log(err.Message);
                });
        }


        $scope.closeModal = function () {
            $scope.modalInstance.close();
        };

        $scope.openModal = function () {
            $scope.modalInstance = $uibModal.open({
                templateUrl: "/app/views/Academic/ViewStudentsListPopup.html",
                size: 'xlg',
                scope: $scope,
                windowClass: 'modal-fit-att',
                //backdrop: 'static',

            });
        }

    })
});