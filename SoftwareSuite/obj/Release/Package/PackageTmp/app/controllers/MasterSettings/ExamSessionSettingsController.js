define(['app'], function (app) {
    app.controller("ExamSessionSettingsController", function ($scope, $http, $localStorage, $state, $stateParams, AppSettings, MasterPageService, PreExaminationService) {

        var authData = $localStorage.authorizationData;
        $scope.UserName = authData.userName
       
        $scope.ReportFound = false;
        $scope.Noreports = false;
        $scope.GetMasterSessions = [];
        $scope.Exams = [
            { id: 1, exam: "Mid 1" },
            { id: 2, exam: "Mid 2" },
            { id: 10, exam: "Semester" }
        ];
        $scope.dayslot = [{ val: 'AM', lbl: 'AM' },{ val: 'PM', lbl: 'PM' }];
        const $ctrl = this;
        $ctrl.$onInit = () => {
            $scope.GetAcademicData();
            $scope.gethours();
            $scope.getminutes();
            $scope.GetExamYearMonth();
        }

        $scope.GetExamYearMonth = function () {
            var ApprovalLists = PreExaminationService.getExamYearMonths();
            ApprovalLists.then(function (response) {
                $scope.MonthAndYear = response.Table;
               
            }, function (error) {
                alert("error while loading Academic Year");

            });
        }


        $scope.gethours = function () {
            $scope.hoursarr = [];
            for (var i = 0; i < 13; i++)
                if (i < 10) {
                    $scope.hoursarr.push({ "Harr": ("0" + i).toString() });
                } else {
                    $scope.hoursarr.push({ "Harr": i.toString() });
                }
        }

        $scope.getminutes = function () {
            $scope.mintuesarr = [];
            for (var i = 0; i < 60; i++)
                if (i < 10) {
                    $scope.mintuesarr.push({ "Marr": ("0" + i).toString() });
                } else {
                    $scope.mintuesarr.push({ "Marr": i.toString() });
                }
        }



      
        $scope.sessioninfo = [{ session: "SESSION 1", val: 1 }, { session: "SESSION 2", val: 2 }]



        $scope.GetAcademicData = function () {
            var GetMonthYear = PreExaminationService.GetMonthYear()
            GetMonthYear.then(function (response) {

                $scope.GetExamMonthYear = response.Table;

               
            },
                function (error) {
                    alert("data is not loaded");
                 
                });
        }
        var LoadExamTypeBysem = PreExaminationService.getStudentType();
        LoadExamTypeBysem.then(function (response) {
            if (response.Table.length > 0) {
                $scope.StudentType = response.Table;
            } else {
                $scope.StudentType = [];
                alert("No Student found on this Record");
            }
        },
            function (error) {
                alert("error while loading Student Types");

            });

        $scope.GetDetails = function () {
            if ($scope.selAcademicYear == null || $scope.selAcademicYear == undefined || $scope.selAcademicYear == "") {
                alert("Select Academic Year.");
                return;
            }        
            if ($scope.selSession == null || $scope.selSession == undefined || $scope.selSession == "") {
                alert("Select Session.");
                return;
            }
            $scope.GetMasterSessions = [];
            $scope.ReportFound = false;
            $scope.Noreports = false;

            var sessiodata = PreExaminationService.GetTimeTableMonthYearExamTypesSessions($scope.selSession, $scope.selAcademicYear);          
            sessiodata.then(function (data) {
                try { var data = JSON.parse(data) } catch (err) { }
                if (data.length > 0) {
                    $scope.ReportFound = true;
                    $scope.Noreports = false;
                    $scope.GetMasterSessions = data;
                    for (var j = 1; j < data.length + 1; j++) {
                        $scope['edit' + j] = true;
                    }
                } else {
                    $scope.ReportFound = false;
                    $scope.Noreports = true;
                }
            }, function (error) {
                    $scope.GetMasterSessions = [];
                    $scope.ReportFound = fale;
                    $scope.Noreports = true;
            });


        }


        $scope.Editsemesterdat = function (data, ind) {

            var ele1 = document.getElementsByClassName("enabletable" + ind);
            for (var j = 0; j < ele1.length; j++) {
                ele1[j].style['pointer-events'] = "auto";
                ele1[j].style.border = "1px solid #ddd";
                ele1[j].style['-webkit-appearance'] = "auto";
                ele1[j].style['-moz-appearance'] = "auto";
            }
            $scope['edit' + ind] = false;

        }

        $scope.Updatesemesterdat = function (data, ind) {
            $scope['edit' + ind] = true;

            var ele2 = document.getElementsByClassName("enabletable" + ind);
            for (var j = 0; j < ele2.length; j++) {
                ele2[j].style['pointer-events'] = "none";
                ele2[j].style.border = "0";
                ele2[j].style['-webkit-appearance'] = "none";
                ele2[j].style['-moz-appearance'] = "none";
            }          

            var datatypeid = 2;   
            if (data.ExamMonthYearId == null || data.ExamMonthYearId == undefined || data.ExamMonthYearId == "") {
                alert("Select Month and Year.");
                return;
            }
            if (data.AcademicYearId == null || data.AcademicYearId == undefined || data.AcademicYearId == "") {
                alert("Select Academic Year.");
                return;
            }
            if (data.ExamTypeId == null || data.ExamTypeId == undefined || data.ExamTypeId == "") {
                alert("Enter Exam.");
                return;
            }
            if (data.SessionLabel == undefined || data.SessionLabel == null || data.SessionLabel == "") {
                alert("Select Session");
                return;
            }

            if (data.FromHH == null || data.FromHH == undefined || data.FromHH == "") {
                alert("Select From Hours.");
                return;
            }
            if (data.FromMM == null || data.FromMM == undefined || data.FromMM == "") {
                alert("Select From Minutes");
                return;
            }
            if (data.FromAmOrPm == null || data.FromAmOrPm == undefined || data.FromAmOrPm == "") {
                alert("Select From session(AM/PM).");
                return;
            }
            if (data.ToHH == null || data.ToHH == undefined || data.ToHH == "") {
                alert("Select to Hours.");
                return;
            }
            if (data.ToMM == null || data.ToMM == undefined || data.ToMM == "") {
                alert("Select to Minutes");
                return;
            }
            if (data.ToAmOrPm == null || data.ToAmOrPm == undefined || data.ToAmOrPm == "") {
                alert("Select to session(AM/PM).");
                return;
            }
            if (data.SessionLabel == null || data.SessionLabel == undefined || data.SessionLabel == "") {
                alert("Enter Time Slot.");
                return;
            }
            if (data.StudentTypeId == null || data.StudentTypeId == undefined || data.StudentTypeId == "") {
                alert("Select Student Type");
                return;
            } 
            if (data.SequenceId == null || data.SequenceId == undefined || data.SequenceId == "") {
                alert("Enter SequenceId");
                return;
            } 


            var json = {
                "Id": data.Id, "ExamMonthYearId": parseInt(data.ExamMonthYearId), "AcademicYearId": parseInt(data.AcademicYearId), "ExamTypeId": parseInt(data.ExamTypeId),
                "SessionId": parseInt(data.SessionId), "FromHH": data.FromHH, "FromMM": data.FromMM, "FromAmOrPm": data.FromAmOrPm, "ToHH": data.ToHH, "ToMM": data.ToMM,
                "ToAmOrPm": data.ToAmOrPm, "SessionLabel": data.SessionLabel, "StudentTypeId": parseInt(data.StudentTypeId), "SequenceId": parseInt(data.SequenceId)
            }

            var SetTimeTableMonthYearExamTypesSessions = PreExaminationService.SetTimeTableMonthYearExamTypesSessions(datatypeid, json)
            SetTimeTableMonthYearExamTypesSessions.then(function (response) {    
                try { var response = JSON.parse(response) } catch (err) { }
                if (response[0].ResponceCode == '200') {
                    alert(response[0].ResponceDescription);
              
                } else {
                    alert('Something Went Wrong')
                    
                }
            },
                function (error) {
                    alert("something Went Wrong")


                });
        }

      

        $scope.Submit = function () {

            var datatypeid = 1

            if ($scope.monthyear == null || $scope.monthyear == undefined || $scope.monthyear == "") {
                alert("Select Month and Year.");
                return;
            }         
            if ($scope.selAcademicYear == null || $scope.selAcademicYear == undefined || $scope.selAcademicYear == "") {
                alert("Select Academic Year.");
                return;
            }
            if ($scope.examtype == null || $scope.examtype == undefined || $scope.examtype == "") {
                alert("Enter Exam.");
                return;
            }
            if ($scope.selSession == undefined || $scope.selSession == null || $scope.selSession == "") {
                alert("Select Session");
                return;
            }

            if ($scope.Sthh == null || $scope.Sthh == undefined || $scope.Sthh == "") {
                alert("Select Start Hours.");
                return;
            }
            if ($scope.Stmm == null || $scope.Stmm == undefined || $scope.Stmm == "") {
                alert("Select Start Minutes");
                return;
            }
            if ($scope.Stamorpm == null || $scope.Stamorpm == undefined || $scope.Stamorpm == "") {
                alert("Select Start session(AM/PM).");
                return;
            }
            if ($scope.Edhh == null || $scope.Edhh == undefined || $scope.Edhh == "") {
                alert("Select End Hours.");
                return;
            }
            if ($scope.Edmm == null || $scope.Edmm == undefined || $scope.Edmm == "") {
                alert("Select End Minutes");
                return;
            }
            if ($scope.Edamorpm == null || $scope.Edamorpm == undefined || $scope.Edamorpm == "") {
                alert("Select End session(AM/PM).");
                return;
            }
            if ($scope.Timeslot == null || $scope.Timeslot == undefined || $scope.Timeslot == "") {
                alert("Enter Time Slot.");
                return;
            }
            if ($scope.SelStudentType == null || $scope.SelStudentType == undefined || $scope.SelStudentType == "") {
                alert("Select Student Type");
                return;
            }  
            if ($scope.selSequenceId == null || $scope.selSequenceId == undefined || $scope.selSequenceId == "") {
                alert("Enter SequenceId");
                return;
            }

            var json = {
                "Id": 0, "ExamMonthYearId": parseInt($scope.monthyear), "AcademicYearId": parseInt($scope.selAcademicYear), "ExamTypeId": parseInt($scope.examtype),
                "SessionId": parseInt($scope.selSession), "FromHH": $scope.FromHH, "FromMM": $scope.Stmm, "FromAmOrPm": $scope.Stamorpm, "ToHH": $scope.Edhh, "ToMM": $scope.Edmm,
                "ToAmOrPm": $scope.Edamorpm, "SessionLabel": $scope.Timeslot, "StudentTypeId": parseInt($scope.SelStudentType), "SequenceId": parseInt($scope.selSequenceId)
            }

            var SetTimeTableMonthYearExamTypesSessions = PreExaminationService.SetTimeTableMonthYearExamTypesSessions(datatypeid, json)
            SetTimeTableMonthYearExamTypesSessions.then(function (response) {  
                try { var response = JSON.parse(response) } catch (err) { }
                if (response[0].ResponceCode == '200') {
                    alert(response[0].ResponceDescription);                   
                } else {
                    alert('Something Went Wrong');
                   
                }
            },
                function (error) {
                    alert("something Went Wrong");
                   

                });
        }


    })
})