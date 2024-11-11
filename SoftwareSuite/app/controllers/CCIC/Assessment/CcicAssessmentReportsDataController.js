define(['app'], function (app) {

    app.controller("CcicAssessmentReportsDataController", function ($scope, $window, $http, $state, $localStorage, CcicAssessmentService) {

        var authData = $localStorage.authorizationData;
        $scope.UserName = authData.UserName;
        $scope.UserTypeID = authData.UserTypeID;
        var tmpdata2 = $localStorage.TempData2;

        $scope.AcademicYearID = tmpdata2.AcademicYearID;
        $scope.ExamMonthYearID = tmpdata2.ExamMonthYearID;
        $scope.InstitutionID = tmpdata2.InstitutionID;
        $scope.CourseID = tmpdata2.CourseID;
        $scope.ExamTypeID = tmpdata2.ExamTypeID;
        $scope.ExamTypeName = tmpdata2.ExamTypeName;
        $scope.SubjectID = $localStorage.SubjectDetails.SubjectID;


            var subjectPinList = CcicAssessmentService.getCcicSubjectPinList($scope.AcademicYearID, $scope.ExamMonthYearID, $scope.InstitutionID, $scope.CourseID, $scope.ExamTypeID, $scope.SubjectID);
            subjectPinList.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch { error }
                if (res.Table.length > 0) {
                    //   console.log(response);
                    $scope.subjectDetailsView = true;
                    //var marksIdList = response
                    $scope.studentsNotFound = false;
                    $scope.LoadImgForPinList = false;
                    $scope.pinWise = res.Table;
                    $scope.Submitted = res.Table[0].Submitted;
                    $scope.MaxMarks = res.Table1[0].MaxMarks;
                    $scope.CourseName = res.Table1[0].CourseName;
                    $scope.AcademicYear = res.Table1[0].AcademicYear;
                    $scope.ExamMonthYear = res.Table1[0].ExamMonthYear;
                    $scope.SubjectCode = res.Table1[0].SubjectCode;
                    $scope.SubjectName = res.Table1[0].SubjectName;
                    markslist = res.Table.map((obj) => { if (obj.Marks != null) { return { MarksEntryDataID: obj.MarksEntryDataID, Marks: obj.Marks } } });
                    markslist = markslist.filter(function (element) { return element !== undefined; });
                }

               
            }, function (error) {
                $scope.pinWise = [];
                $scope.subjectDetailsView = false;
                $scope.studentsNotFound = true;
                $scope.LoadImgForPinList = false;
                let err = JSON.parse(error)
                console.log(err);

            });

        


        $scope.back = function () {
            $state.go("CcicDashboard.Assessment.AssessmentReportsSubject");
        }


        $scope.GetReport = function () {
            if ($scope.DataSubmitted == 0) {
                alert("Please Submit All Subjects Marks to get Report")
                return;
            }
            $scope.loading = true;
            $scope.Noresult = false
            var loadData1 = CcicAssessmentService.GetAssesmentInstituteCourseSubjectCount(tmpdata1.AcademicYearID, tmpdata1.ExamMonthYearID, tmpdata1.ExamTypeID, tmpdata1.InstitutionID, tmpdata1.CourseID)
            loadData1.then(function (response) {
                try {
                    var res = JSON.parse(response)
                }
                catch {

                }
                var data = res;
                if (data.Table.length > 0) {
                    $scope.Noresult = false
                    $scope.loading = false;
                    $scope.SubjectsList = [];
                    $scope.InstitutionCode = data.Table[0].InstitutionCode;
                    $scope.InstitutionName = data.Table[0].InstitutionName;
                    //$scope.SubjectCode = data.Table1[0].SubjectCode
                    $scope.ExamType = data.Table[0].ExamType
                    data.Table.forEach(function (student) {
                        if (!$scope.SubjectsList.includes(student.SubjectCode))
                            $scope.SubjectsList.push(student.SubjectCode);
                    });
                    $scope.StudentDetails = data.Table1;
                    $scope.AllStudentDetails = data.Table2;

                } else if (data[0].ResponceCode == '404') {
                    $scope.Noresult = true
                    $scope.loading = false;
                    alert(data[0].ResponceDescription);
                }
                else if (data[0].ResponceCode == '400') {
                    $scope.Noresult = true
                    $scope.loading = false;
                    alert(data[0].ResponceDescription);
                } else {
                    $scope.Noresult = true
                    $scope.loading = false;
                    alert('Something Went Wrong')
                }

            }, function (error) {
                $scope.Noresult = true
                $scope.loading = false;
            });
        }
        $scope.PrintStudentResult = function (divName) {

            //var printContents = document.getElementById(divName).innerHTML;
            var originalContents = document.body.innerHTML;

            //document.body.innerHTML = printContents;

            window.print();

            document.body.innerHTML = originalContents;
            print.close();

        };

        $scope.getOldChildren = function (student) {
            var Report = [];
            var arr = $scope.StudentDetails;
            var rem = [];
            var temparr = [];
            var temparr2 = [];
            var tempsub = [];
            var subjectcodes = $scope.SubjectsList;
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].PIN == student.PIN) {
                    Report.push(arr[i]);
                    temparr.push(arr[i]);
                    //  tempsub.push(arr[i].code);
                }
            }
            console.log(Report)
            return Report;
        }
        //$scope.selectSubjectDetails = function (subject) {
        //    $localStorage.TempData1 = {
        //        AcademicYearID: tmpdata.AcademicYearID,
        //        ExamMonthYearID: tmpdata.ExamMonthYearID,
        //        InstitutionID: tmpdata.InstitutionID,
        //        CourseID: tmpdata.CourseID,
        //        ExamTypeID: tmpdata.ExamTypeID,
        //        ExamTypeName: tmpdata.ExamType
        //    };
        //    $localStorage.SubjectDetails = subject;
        //    $state.go('CcicDashboard.Assessment.MarksEntryPage')
        //}

        $scope.logOut = function () {
            //$scope.$emit("logout", authData.UserName);
            sessionStorage.loggedIn = "no";
            var GetCcicUserLogout = CcicSystemUserService.PostCcicUserLogout($scope.UserName, $scope.SessionID);

            delete $localStorage.authorizationData;
            delete $localStorage.authToken;
            delete $scope.SessionID;

            $scope.authentication = {
                isAuth: false,
                UserID: 0,
                UserName: ""
            };
            $state.go('CcicLogin');
        }
    });
});
