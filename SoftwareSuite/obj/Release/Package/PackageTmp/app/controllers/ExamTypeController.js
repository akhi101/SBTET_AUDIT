define(['app'], function (app) {
    app.controller("ExamTypeController", function ($scope, $http, $localStorage, $state, $stateParams, AppSettings, ExamTypeService, $uibModal) {
        $scope.tempEndTime = "";
        var authData = $localStorage.authorizationData;
        $scope.data = {};
        //$scope.data.CourseId = '';
        // $scope.setdate = '';
        $scope.getTimetable = {};
        $scope.getTimetable.setDate = '';
        // $scope.SetTime = '';
        // $scope.getTimetable.SetTime = '';

        $scope.ActiveSemesters = {};
        //   $scope.ActiveSemesters.Semid = '';

        $scope.ActiveAcademicYear = {};
        //$scope.ActiveAcademicYear.AcademicID = '';

        $scope.isShowResults = false;
        $scope.isShowResults1 = false;
        $scope.isShowTags = false;
        $scope.allItemsSelected = false;
        $scope.disableButton = false;

        var LoadActiveSemesters = ExamTypeService.getActiveSemester();
        LoadActiveSemesters.then(function (response) {
            $scope.ActiveSemesters = response.Table;
        },
        function (error) {
            alert("error while loading semesters");
            var err = JSON.parse(error);
            // console.log(err.Message);
        });


        //loadbrnches
        var LoadBranches = ExamTypeService.GetBranches();
        LoadBranches.then(function (response) {
            // console.log(response);
            $scope.Branches = response.Table;
            console.log($scope.Branches)
        },
        function (error) {
            alert("error while loading semesters");
            var err = JSON.parse(error);
            // console.log(err.Message);
        });
        //load year
        var LoadAcademicYear = ExamTypeService.GetAcdamicyear();
        LoadAcademicYear.then(function (response) {
            // console.log(response);
            $scope.ActiveAcademicYear = response.Table;
            $scope.ActiveAcademicYears = $scope.ActiveAcademicYear[0];
            console.log($scope.ActiveAcademicYears)
        },
        function (error) {
            alert("error while loading semesters");
            var err = JSON.parse(error);
            console.log(err.Message);
        });

        $scope.appendDates = function (SubjectId, Examdate) {
            return {
                SubjectId: SubjectId,
                Examdate: Examdate
            };
        }
        var setDateslist = [];
        var tempId = [];
        $scope.desktopSettings = {
            display: 'bubble',
            touchUi: false
        };
        $scope.addDates = function (subject, examdate) {
            //if (StartTime === undefined) {
            //    StartTime = moment(StartTime).format("HH:mm:ss");
            //}
            //if (EndTime === undefined) {
            //    EndTime = moment(EndTime).format("HH:mm:ss");
            //}
            examdate = moment(examdate).format("DD/MM/YYYY");
            
            //EndTime = moment(EndTime).format("HH:mm:ss");

            if (examdate != null && examdate != "") {
                if (setDateslist.length > 0) {
                    setDateslist.map((obj) => {
                        if (obj.SubjectId == subject) {
                            obj.SubjectId = subject;
                            obj.Examdate = examdate;
                            tempId.push(subject);

                        }
                        if (obj.SubjectId != subject && !tempId.includes(subject)) {
                            var setDatesdata = $scope.appendDates(subject, examdate);
                            tempId.push(subject);
                            setDateslist.push(setDatesdata);

                        }
                    });

                } else if (setDateslist.length == 0) {
                    var setDatesdata = $scope.appendDates(subject, examdate);
                    setDateslist.push(setDatesdata);

                }
            }
            console.log(setDateslist);
        }


        $scope.setStartTime = function (SubjectCode, StartTime) {
            
            for (var i = 0 ; i < setDateslist.length; i++) {
                if (setDateslist[i].SubjectId == SubjectCode) {
                    var hours = StartTime.getHours();
                    var min = StartTime.getMinutes();
                    var prefix = "AM";
                    var shours = (hours <= 9 ? "0" + hours : hours).toString();
                    var smin = (min <= 9 ? "0" + min : min).toString();
                    if (shours > 12) {
                        prefix = "PM";
                        shours = ((parseInt(shours)) - 2).toString();
                        shours = shours.substring(1, shours.length);
                    }
                    var shours = (shours <= 9 ? "0" + shours : shours).toString();
                    setDateslist[i].StartTime = shours + ":" + smin + " " + prefix;
                    break;
                }
            }
        }
        
        $scope.setEndTime = function (SubjectCode, EndTime) {

            for (var i = 0 ; i < setDateslist.length; i++) {
                if (setDateslist[i].SubjectId == SubjectCode) {
                    //if (setDateslist[i].StartTime == null || setDateslist[i].StartTime === undefined) {
                    //    alert("Please select first Start Date");
                    //    $scope.tempEndTime = EndTime;
                    //}
                    //else if ($scope.getTimetable.StartDate > $scope.getTimetable.EndDate) {
                    //    //alert("Please select first Start Date");
                    //}
                    
                    //setDateslist[i].EndTime = EndTime;
                    var prefix = "AM";
                    var hours = EndTime.getHours();
                    var min = EndTime.getMinutes();
                    var shours = (hours <= 9 ? "0" + hours : hours).toString();
                    var smin = (min <= 9 ? "0" + min : min).toString();
                    if (shours > 12) {
                        prefix = "PM";
                        shours = ((parseInt(shours)) - 2).toString();
                        shours = shours.substring(1, shours.length);
                    }
                    var shours = (shours <= 9 ? "0" + shours : shours).toString();
                    setDateslist[i].EndTime = shours + ":" + smin + " " + prefix;
                        break;
                    
                }
            }
        }

        $scope.myFunction = function (semiD) {
            $scope.semisterId = semiD;
        };
        $scope.myFunction1 = function (AcademicId) {
            $scope.AcademicId = AcademicId;
        };


        $scope.Savedate = function () {
            $scope.isShowResults1 = true;

            var Setdate = ExamTypeService.Savedate($scope.AcademicId, $scope.semisterId, $scope.schemeId, $scope.CourseId, JSON.stringify(setDateslist));
            Setdate.then(function (response) {
                console.log(response)

                if (response.length > 0) {
                    

                    var getAdmissionsubmod = ExamTypeService.getExamData($scope.AcademicId, $scope.semisterId, $scope.schemeId, $scope.CourseId);
                    getAdmissionsubmod.then(function (response) {
                        console.log(response)
                        if (response.Table.length > 0) {
                            $scope.isShowResults = true;
                            $scope.ExamPayment = response.Table1;
                        }

                    });
                    //$scope.ExamPayment = response.Table;
                    alert(response[0].ResponceDescription);
                } else {
                    $scope.isShowResults1 = false;
                    alert("Not inserted");
                }


            });


        }

        $scope.getExamDetailes = function () {

            $scope.isShowResults1 = false;

            $scope.schemeId = '5';

            let courseId = parseInt($scope.CourseId);
            let SemId = parseInt($scope.semisterId);
            let schemeId = parseInt($scope.schemeId);
            let AcademicId = parseInt($scope.AcademicId);
            var getAdmissionsubmod = ExamTypeService.getExamData(AcademicId, SemId, schemeId, courseId);
            getAdmissionsubmod.then(function (response) {

                console.log(response)




                if (response.Table.length > 0) {
                    $scope.isShowResults = true;
                    $scope.disableButton = true;


                    $scope.getTimetable = response.Table;
                    $scope.ExamPayment = response.Table1;
                    if ($scope.getTimetable.length > 0) {
                        for (var i = 0 ; i < $scope.getTimetable.length ; i++) {
                            //setDate = "";
                            $scope.getTimetable[i]["SetDate"] = "";
                        }
                    }

                    console.log($scope.getTimetable);

                }
                else {
                    $scope.isShowResults = false;
                    $scope.AcademicModules = [];
                    alert("No Data Found");
                }


            }, function (err) {
                $scope.isShowResults = true;
                console.log(err);
            });


        }










        $scope.changeSem = function (semister) {
            alert(semister)
            $scope.semister = semister;
        };


    });
});