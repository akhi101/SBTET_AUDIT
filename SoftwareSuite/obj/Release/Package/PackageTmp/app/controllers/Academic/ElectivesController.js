define(['app'], function (app) {
    app.controller("ElectivesController", function ($scope, $http, $localStorage, $state, $stateParams, AppSettings, MarksEntryService, ElectivesService, MenuService, AssessmentService) {
        $scope.HideSession = true;
        var authData = $localStorage.authorizationData;
        $scope.userName = authData.userName;
        $scope.College_Code = authData.College_Code;
        AppSettings.College_Name = authData.College_Name;
        $scope.College_Name = authData.College_Name;
        AppSettings.userName = authData.userName;      
        $scope.BranchId = authData.BranchId;
        $scope.CollegeID = authData.CollegeID;
        $scope.userType = authData.SystemUserTypeId;
        $scope.Electivesfound = false;
        $scope.LoadImgForSubject = false;      
        var regex = /^\d+$/;
        var temp = regex.test($scope.userName);
        $scope.valid = false;
             
        if ($scope.BranchId != null && $scope.userType == 3) {
            var branchCode = authData.userName.split('_')[0];
            // Getting Branch Name From Branch Code

            var branchNameDetails = AssessmentService.getbranchNameById(branchCode);
            branchNameDetails.then(function (response) {

                if (response.length > 0) {
                    $scope.branch = response[0].BranchName;
                    $localStorage.Academic.branchName = response[0].BranchName;
                    //$scope.branchName = response.;
                }
                else {
                    $scope.branch = '';
                }

            }, function (error) {
                alert("NOt Branch login");
            });

            // for getting Current Academic year

            var AcademicYearsActive = AssessmentService.GetAcademicYearsActive();
            AcademicYearsActive.then(function (response) {
                $scope.years = response.Table[0];
                $scope.AcademicYearsActiveResponse = $scope.years;
                $localStorage.Academic.AcademicYearsActiveResponse = $scope.years;
                $scope.AcademicId = $localStorage.Academic.AcademicYearsActiveResponse.AcademicID
            },
            function (error) {
                alert("error");
            });


            // For getting Student Type into drop down          

            var LoadExamTypeBysem = MarksEntryService.getStudentType();
            LoadExamTypeBysem.then(function (response) {
                if (response.Table.length > 0) {
                    $scope.StudentType = response.Table;
                    $scope.SelectedStudent = response.Table[0];
                } else {
                    $scope.StudentType = [];
                    alert("No Student found on this Record");
                }
            },
            function (error) {
                alert("error while loading Student Types");
                console.log(error);
            });


            //loading Scheme related to sem

            $scope.LoadSchemeForSemester = function (selectedsem) {
                var schemeStatus = AssessmentService.getSchemeStatus();
                schemeStatus.then(function (response) {
                    var SchemesList = response.Table;
                    SchemesList.forEach(function (scheme) {
                        $scope.selSession = selectedsem.AySession
                        if (selectedsem.current_schemeid === scheme.SchemeID) {
                            $scope.loadedScheme = scheme;
                            $localStorage.Academic.scheme = $scope.loadedScheme;
                        }
                    });

                }, function (error) {
                    alert("error");
                });
            }


            $scope.sems = [];
            // load Semister Types to drop down
            var loadActiveSemister = AssessmentService.getActiveSemester();
            loadActiveSemister.then(function (response) {
                if (response.Table.length > 0) {
                    $scope.sems = response.Table;
                    //$scope.sems = [{ "sem": "1SEM", "semester": "1SEM(C18)", "semid": 1, "current_schemeid": 5 },
                    //    { "sem": "2SEM", "semester": "2SEM(C18)", "semid": 2, "current_schemeid": 5 },
                    //{ "sem": "3SEM", "semester": "3SEM(C18)", "semid": 3, "current_schemeid": 5 },
                    //    { "sem": "4SEM", "semester": "4SEM(C18)", "semid": 4, "current_schemeid": 5 },
                    //{ "sem": "5SEM", "semester": "5SEM(C18)", "semid": 5, "current_schemeid": 5 },
                    //{ "sem": "7SEM", "semester": "7SEM(C16S)", "semid": 7, "current_schemeid": 4 },
                    //{ "sem": "2YR", "semester": "2YR(ER91)", "semid": 8, "current_schemeid": 2 },
                    //{ "sem": "1YR", "semester": "1YR(ER91)", "semid": 9, "current_schemeid": 2 }];
                  //  $scope.selectedsem = response.Table[0];
                    $localStorage.Academic.selectedsem = $scope.selectedsem;
                 //   $scope.loadsubjects($scope.selectedsem);
                    $scope.LoadSchemeForSemester($scope.selectedsem);
                }
                else {
                    alert("no data");
                }
            }, function (error) {
                alert("error no data");
            });

            $scope.sessioninfo = [{ session: "SESSION 1", val: 1 }, { session: "SESSION 2", val: 2 }]


            //loading ElectiveSubject list
            $scope.loadsubjects = function (selectedsem, selSession) {
                $scope.selSession = selSession
                $scope.Electivesfound = false;
                $scope.LoadImgForSubject = true;
                console.log(selectedsem.semid, selectedsem.current_schemeid, $scope.BranchId, $scope.College_Code, $scope.AcademicId, selSession)
                var SubjectList = ElectivesService.GetElectiveSubjects(selectedsem.semid, selectedsem.current_schemeid, $scope.BranchId, $scope.College_Code, $scope.AcademicId,selSession);
                SubjectList.then(function (response) {
                    $scope.valid = true;
                    if (response.Table[0].ResponseCode == '200') {
                        $scope.Electivesfound = true;
                        $scope.LoadImgForSubject = false;
                        $scope.getSemSubjectsResponse = response.Table1;
                        for (let i = 0; i < $scope.getSemSubjectsResponse.length; i++) {
                            if ($scope.getSemSubjectsResponse[i].active == null) {
                                $scope.getSemSubjectsResponse[i].active = false;
                            }
                            if ($scope.getSemSubjectsResponse[i].active == 0 || $scope.getSemSubjectsResponse[i].active == '0') {
                                $scope.getSemSubjectsResponse[i].active = false;
                            }
                            if ($scope.getSemSubjectsResponse[i].active == 1 || $scope.getSemSubjectsResponse[i].active == '1') {
                                $scope.getSemSubjectsResponse[i].active = true;
                            }
                            if ($scope.getSemSubjectsResponse[i].active == true) {
                                $scope.finalList.push($scope.getSemSubjectsResponse[i]);
                            }
                            //$scope.finalList

                        }
                    } else if (response.Table[0].ResponseCode == '400') {
                        $scope.getSemSubjectsResponse = [];
                        $scope.Electivesfound = false;
                        $scope.LoadImgForSubject = false;
                        alert(response.Table[0].ResponseDescription);
                    }else {
                        $scope.getSemSubjectsResponse = [];
                        $scope.Electivesfound = false;
                        $scope.LoadImgForSubject = false;
                        alert("no Electives Found on Selected Semester");
                    }

                }, function (error) {
                    alert("error");
                });
            }

            $scope.finalList = [];

            Array.prototype.remByVal = function (val) {
                for (var i = 0; i < this.length; i++) {
                    if (this[i].ElectiveSet === val) {
                        this.splice(i, 1);
                        break;
                    }
                }
                return this;
            }
            $scope.change = function (data, active, index) {
                for (let i = 0 ; i < $scope.finalList.length ; i++) {
                    if ($scope.finalList[i].ElectiveSet == data.ElectiveSet) {
                        //$scope.finalList.remByVal(data.ElectiveSet);
                        break;
                    }
                }
                $scope.finalList.push(data);

                for (let i = 0 ; i < $scope.getSemSubjectsResponse.length; i++) {
                    if ($scope.getSemSubjectsResponse[i].ElectiveSet == data.ElectiveSet   ) {
                        if (i != index) {
                            $scope.getSemSubjectsResponse[i].active = false;
                        }
                    }
                }

                for (var i = 0; i < $scope.finalList.length; i++) {
                    if ($scope.finalList[i].active === false) {
                        $scope.finalList.splice(i, 1);
                        break;
                    }
                }

            }

            $scope.selectSubjectDetails = function (subject) {
                // $localStorage.Academic.selectedsem = $scope.selectedsem;
                $localStorage.Academic.subjectdata = subject;
                $state.go('Dashboard.Academic.Pinlist');

            }
            //$scope.isChecked = function (entity) {
            //    return $scope.checkedEntity === entity;
            //};

            //$scope.toggleSelection = function (entity) {
            //    entity.checked = !entity.checked;
            //    if (entity.checked) {
            //        $scope.checkedEntity = entity;
            //    } else {
            //        $scope.checkedEntity = null;
            //        $scope.shown = false;
            //    }
            //};

            $scope.updateSelection = function (position, entities) {
                angular.forEach(entities, function (subscription, index) {
                    if (position != index)
                        subscription.checked = false;
                });
            }
            $scope.savedata = function () {
               
                for (let i = 0 ; i < $scope.finalList.length ; i++) {
                    $scope.finalList[i].id = i + 1;
                    $scope.finalList[i].collegeCode = $scope.College_Code;
                    $scope.finalList[i].AcademicYearID = $scope.AcademicId;
                    $scope.finalList[i].SessionID = $scope.selSession;

                }
                console.log($scope.finalList)
                var PostFinaldata = ElectivesService.PostFinaldata($scope.finalList);
                PostFinaldata.then(function (response) {
                    var response = JSON.parse(response)
                    if (response.Table[0].Code == '200') {
                        alert(response.Table[0].Message)
                    } else if (response.Table[0].Code == '400') {
                        alert(response.Table[0].Message)
                    }
                  //  alert("Updated Successfully");

                },
                 function (error) {
                     alert("error");
                 });
            }
        }
            
        });
    });