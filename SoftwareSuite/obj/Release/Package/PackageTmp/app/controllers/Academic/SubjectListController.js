define(['app'], function (app) {
    app.controller("SubjectListController", function ($scope, $http, $localStorage, $state, $stateParams, AppSettings, AssessmentService, AcademicService, PreExaminationService) {
        $scope.BatchHide = true;
        //$scope.subjectList = [
        //    { Id: "1", Subject: "English" },
        //    { Id: "2", Subject: "Engineering mathematics-I" },
        //    { Id: "3", Subject: "Engineering Physics" },
        //    { Id: "4", Subject: "Engineering Chemistry & Environmental studies" },
        //    { Id: "5", Subject: "Basic Electronic components & materials " },
        //    { Id: "6", Subject: "Basic Electrical Engineering " }
        //]
        $scope.shifts = [{ shiftid: 1, shiftName: "Batch 1" }, { shiftid: 2, shiftName: "Batch 2" }]
        $scope.getActiveSchemes = [{ SchemeID: 5, Scheme: "C18" },{ SchemeID: 2, Scheme: "ER91" }]

        const $ctrl = this;
        $ctrl.$onInit = () => {
            //$scope.SelectedschemeId = { SchemeID: 5 };
           
            $scope.getSchemes();

            var authData = $localStorage.authorizationData;

            $scope.loadTempSessionData();
            $scope.loadBranchName();
            $scope.College_Code = authData.College_Code;
            $scope.BranchId = authData.BranchId;
            $scope.ChangeSemester();

        }

        $scope.loadBranchName = function () {

            var authData = $localStorage.authorizationData;
            var branchCode = authData.userName.split('_')[0];
            // Getting Branch Name From Branch Code

            var branchNameDetails = AssessmentService.getbranchNameById(branchCode);
            branchNameDetails.then(function (response) {

                if (response.length > 0) {
                    $scope.branchname = response[0].BranchName;
                    $localStorage.Academic.branchName = response[0].BranchName;
                    //$scope.branchName = response.;
                }
                else {
                    $scope.branchname = '';
                }

            }, function (error) {

            });

        }
        $scope.loadTempSessionData = function () {


            if ($localStorage.authorizationData.tempsessiondata != undefined && $localStorage.authorizationData.tempsessiondata != null && $localStorage.authorizationData.tempsessiondata != {}) {
                //$scope.SelectedschemeId = {
                //    SchemeID: $localStorage.authorizationData.tempsessiondata.SchemeID,
                //}                 
                //$scope.SelectedsemId = {
                //    semid: $localStorage.authorizationData.tempsessiondata.semId,
                //}
                $scope.Selectedshift = {
                    shiftid:$localStorage.authorizationData.tempsessiondata.shiftId,
                }
                $scope.schemeLabel($scope.SelectedschemeId.SchemeID);
                $scope.semLabel($scope.SelectedschemeId.SchemeID, $scope.SelectedsemId.semid);
                $scope.ChangeSemester();
                //$scope.SubmitData();
            } else {
                $localStorage.authorizationData.tempsessiondata = {};
                var SessionData = {
                    SchemeID: "",
                    semId: "",
                    shiftId: ""

                }
                $localStorage.authorizationData.tempsessiondata = SessionData;

            }



        }
        $scope.schemeLabel = function (schemeid) {
            // For Getting Scheme for label
            var schemeStatus = AssessmentService.getSchemeStatus();
            schemeStatus.then(function (response) {
                var SchemesList = response.Table;
                SchemesList.forEach(function (scheme) {
                    if (schemeid === scheme.SchemeID) {
                        $scope.loadedScheme = scheme;
                        console.log($scope.loadedScheme)
                    }
                });

            }, function (error) {
                alert("error");
            });
        }

        $scope.semLabel = function (schemeId, semid) {
            // For Getting Sem for 

            $scope.StudentId = 1;
            //var LoadSemByScheme = AcademicService.getSemBySchemes($scope.StudentId, schemeId, "")
            //LoadSemByScheme.then(function (response) {
            //    if (response.length > 0) {
            //        if ($scope.SelectedschemeId.SchemeID == 5) {
            //            $scope.ActiveSemesters = [{ semid: 1, sem: "1SEM" }, { semid: 2, sem: "2SEM" }, { semid: 3, sem: "3SEM" }, { semid: 4, sem: "4SEM" }, { semid: 5, sem: "5SEM" }]
            //        } else if ($scope.SelectedschemeId.SchemeID == 2) {
            //            $scope.ActiveSemesters = [{ semid: 9, sem: "1YR" }, { semid: 8, sem: "2YR" }]
            //        }
                  
            //        var SemList = $scope.ActiveSemesters;
            //        SemList.forEach(function (sem) {
            //            if (semid === sem.semid) {
            //                $scope.loadedSem = sem;
            //            }
            //        });
            //    } else {
            //        // $scope.Examtypes = [];

            //    }

            //},
            //    function (error) {
            //        alert("error while loading Semesters");
            //        var err = JSON.parse(error);
            //        console.log(err.Message);
            //    });

        }



        $scope.getSchemes = function () {
            var LoadActiveSchemes = AcademicService.getSchemes();
            LoadActiveSchemes.then(function (response) {
                $scope.schemeinfo = response.Table;
                $scope.schemeinf = []
                //$scope.schemeinfo = data;
                //$scope.schemeinfo = [{ schemeid: 5, scheme: "C18" }, { schemeid: 2, scheme: "ER91" }, { schemeid: 9, scheme: "C21" }, { schemeid: 10, scheme: "ER2020" }]

                for (var i = 0; i < $scope.schemeinfo.length; i++) {
                    if ($scope.schemeinfo[i].ActiveFlag == true) {
                        $scope.schemeinf.push($scope.schemeinfo[i]);

                    }
                }
            },
                function (error) {

                    var err = JSON.parse(error);
                    console.log(err.Message);
                });
        }



        $scope.ChangeSemester = function () {
            var LoadActiveSemesters = PreExaminationService.getActiveSemester();
            LoadActiveSemesters.then(function (response) {
              
                $scope.ActiveSemesters = response.Table;
                $scope.ActiveSems = [];
                console.log($scope.ActiveSemesters)
                //   $scope.ActiveSemesters = [{ semid: 2, sem: "2SEM" }, { semid: 4, sem: "4SEM" }]
                // $scope.ActiveSemesters = [{ semid: 1, sem: "1SEM" }, { semid: 2, sem: "2SEM" }, { semid: 3, sem: "3SEM" }, { semid: 4, sem: "4SEM" }, { semid: 5, sem: "5SEM" }]
                for (var i = 0; i < $scope.ActiveSemesters.length; i++) {
                    if ($scope.ActiveSemesters[i].current_schemeid == $scope.SelectedschemeId.SchemeID) {
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

        $scope.SubmitData = function () {
            //var SemData = JSON.parse($scope.semId)
            // $scope.semID = SemData.semid
            if (($scope.SelectedschemeId.SchemeID == undefined) || ($scope.SelectedschemeId.SchemeID == "0") || ($scope.SelectedschemeId.SchemeID == "")) {
                alert("Select Scheme");
                return false;
            }
            if (($scope.SelectedsemId.semid == undefined) || ($scope.SelectedsemId.semid == "0") || ($scope.SelectedsemId.semid == "")) {
                alert("Select Semester");
                return false;
            }
            //if (($scope.Selectedshift.shiftid == undefined) || ($scope.Selectedshift.shiftid == "0") || ($scope.Selectedshift.shiftid == "")) {
            //    alert("Select Shift");
            //    return false;
            //}
            $localStorage.authorizationData.tempsessiondata.semId = $scope.SelectedsemId.semid;
            $scope.semLabel($scope.SelectedschemeId.SchemeID, $scope.SelectedsemId.semid);
            $localStorage.authorizationData.tempsessiondata.shiftId = $scope.Selectedshift;         

            //   $scope.sem = SemData.sem
            $scope.loading = true;
            var loadData = AcademicService.getHodSubjectList($scope.College_Code, $scope.BranchId, $scope.SelectedschemeId.SchemeID, $scope.SelectedsemId.semid, $scope.Selectedshift)
            loadData.then(function (response) {
                if (response.Table.length > 0) {
                    $scope.subjectList = response.Table;
                    $scope.loading = false;
                    $scope.Data = true;
                } else {
                    // $scope.Examtypes = [];
                    $scope.loading = false;
                    $scope.Data = false;
                    alert("No Sem found on this Record");
                }

            },
                function (error) {
                    $scope.loading = false;
                    $scope.Data = false;
                    alert("error while loading Semesters");
                    var err = JSON.parse(error);
                    console.log(err.Message);
                });
        }

        $scope.OpenChapters = function (Istheory, SubjectId, SubjectName, SubjectCode) {

            
            $localStorage.AcademicData = {
                SemId: $scope.SelectedsemId.semid,
                Sem: $scope.SelectedsemId.sem,
                SchemeId: $scope.SelectedschemeId.SchemeID,
                SubjectName: SubjectName,
                SubjectCode: SubjectCode,
                Scheme: $scope.SelectedschemeId.Scheme,
                Subject: $scope.Scheme,
                ShiftId: $scope.Selectedshift,
                SubjectId: SubjectId,
                BranchId: $scope.BranchId,
                Branch: $scope.branchname

            }



            if (Istheory === true) {
                var theory = 1
            } else {
                var theory = 0
            }
            localStorage.setItem('Istheory', theory)
            $state.go('Dashboard.Academic.SyllabusCovered')
        }

    })
})