define(['app'], function (app) {
    app.controller("CcicSubjectMasterController", function ($scope, $uibModal, $localStorage, CcicPreExaminationService) {

        var authData = $localStorage.authorizationData;
        $scope.UserName = authData.UserName

        $scope.finalList = [];
        const $ctrl = this;
        $ctrl.$onInit = () => {
            $scope.GetCurrentAcademicYearData();

        }

        var getaffcourses = CcicPreExaminationService.GetAffiliatedCourses();
        getaffcourses.then(function (res) {
            $scope.CoursesData = res;

        }, function (err) {
            $scope.LoadImg = false;
            alert("Error while loading");
        });


        var getsubjecttypes = CcicPreExaminationService.GetCcicSubjectTypes();
        getsubjecttypes.then(function (res) {
            $scope.SubjectTypesData = res;

        }, function (err) {
            $scope.LoadImg = false;
            alert("Error while loading");
        });

        $scope.getSubjectMaster = function (Course) { 
            var DataType = 1;
            var SubjectID = 0;
            $scope.CourseID = Course;
            var getsubjectmaster = CcicPreExaminationService.GetCcicSubjectMaster(DataType, Course, SubjectID);
            getsubjectmaster.then(function (res) {
                try {
                    var Res = JSON.parse(res)
                }
                catch (error) {

                }
                $scope.SubjectMasterData = Res.Table;

        }, function (err) {
            $scope.LoadImg = false;
            alert("Error while loading");
        });
    }
       

        $scope.editSubjectMaster = function (SubjectID) {
            var DataType = 2;
            var getsubjectmaster = CcicPreExaminationService.GetCcicSubjectMaster(DataType, 0, SubjectID);
            getsubjectmaster.then(function (res) {
                try {
                    var Res = JSON.parse(res)
                }
                catch (error) {

                }
                $scope.EditSubjectData = Res.Table;
                $scope.EditSubjectTypesData = Res.Table1;
                //$scope.EditTypeName = $scope.EditData[0].TypeName;

            }, function (err) {
                $scope.LoadImg = false;
                alert("Error while loading");
            });

            $scope.modalInstance = $uibModal.open({
                templateUrl: "/app/views/CCIC/Popups/EditExaminationCentresPopup.html",
                size: 'xlg',
                scope: $scope,
                backdrop: 'static',
                windowClass: 'modal-fit-att',
            });
            $scope.closeModal = function () {
                $scope.modalInstance.close();
            }
        }

      

       


        $scope.Submit = function () {


            if ($scope.Course == null || $scope.Course == undefined || $scope.Course == "") {
                alert("Select Course");
                return;
            }
            if ($scope.SubjectType == null || $scope.SubjectType == undefined || $scope.SubjectType == "") {
                alert("Select Subject Type");
                return;
            }
            if ($scope.SubjectCode == null || $scope.SubjectCode == undefined || $scope.SubjectCode == "") {
                alert("Please Enter Subject Code ");
                return;
            }

            if ($scope.SubjectName == null || $scope.SubjectName == undefined || $scope.SubjectName == "") {
                alert("Please Enter  Subject Name ");
                return;
            }

            if ($scope.ExternalMaxMarks == null || $scope.ExternalMaxMarks == undefined || $scope.ExternalMaxMarks == "") {
                alert("Please Enter External Max Marks");
                return;
            }

            if ($scope.InternalMaxMarks == null || $scope.InternalMaxMarks == undefined || $scope.InternalMaxMarks == "") {
                alert("Please Enter  Internal Max Marks ");
                return;
            }

            if ($scope.ExternalPassMarks == null || $scope.ExternalPassMarks == undefined || $scope.ExternalPassMarks == "") {
                alert("Please Enter External Pass Marks ");
                return;
            }

            if ($scope.TotalPassMarks == null || $scope.TotalPassMarks == undefined || $scope.TotalPassMarks == "") {
                alert("Please Enter Total Pass Marks");
                return;
            }

            if ($scope.Pcode == null || $scope.Pcode == undefined || $scope.Pcode == "") {
                alert("Please Enter PCODE");
                return;
            }

            var paramObj = {
                "DataType": 1,
                "SubjectID": "",
                "CourseID": $scope.Course,
                "SubjectTypeID": $scope.SubjectType,
                "SubjectCode": $scope.SubjectCode,
                "SubjectName": $scope.SubjectName,
                "ExternalMaxMarks": $scope.ExternalMaxMarks,
                "InternalMaxMarks": $scope.InternalMaxMarks,
                "ExternalPassMarks": $scope.ExternalPassMarks,
                "TotalPassMarks": $scope.TotalPassMarks,
                "Pcode": $scope.Pcode,
                "Active": 1,
                "UserName": $scope.UserName
            }
            var addsubjectmaster = CcicPreExaminationService.AddCcicSubjectMaster(paramObj);
            addsubjectmaster.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }
                if (res[0].ResponseCode == '400') {
                    alert(res[0].ResponseDescription)
                    //$scope.GetExamMonthYearData($scope.AcademicYearID);
                    //$scope.clearDefaults();
                } else {
                    alert('ExamMonthYear Added Succesfully')
                    //$scope.GetExamMonthYearData($scope.AcademicYearID);
                    //$scope.clearDefaults();

                }

            },

                function (error) {

                    var err = JSON.parse(error);
                })

        }


        $scope.UpdateDetails = function (data) {


            if (data[0].SubjectTypeID == null || data[0].SubjectTypeID == undefined || data[0].SubjectTypeID == "") {
                alert("Please Select Subject Type");
                return;
            }

            if (data[0].SubjectCode == null || data[0].SubjectCode == undefined || data[0].SubjectCode == "") {
                alert("Please Enter Subject Code ");
                return;
            }

            if (data[0].SubjectName == null || data[0].SubjectName == undefined || data[0].SubjectName == "") {
                alert("Please Enter  Subject Name ");
                return;
            }

            //if (data[0].ExternalMaxMarks == null || data[0].ExternalMaxMarks == undefined || data[0].ExternalMaxMarks == "") {
            //    alert("Please Enter External Max Marks");
            //    return;
            //}

            //if (data[0].InternalMaxMarks == null || data[0].InternalMaxMarks == undefined || data[0].InternalMaxMarks == "") {
            //    alert("Please Enter Internal Max Marks ");
            //    return;
            //}

            //if (data[0].ExternalPassMarks == null || data[0].ExternalPassMarks == undefined || data[0].ExternalPassMarks == "") {
            //    alert("Please Enter External Pass Marks ");
            //    return;
            //}

            //if (data[0].TotalPassMarks == null || data[0].TotalPassMarks == undefined || data[0].TotalPassMarks == "") {
            //    alert("Please Enter Total Pass Marks");
            //    return;
            //}

            if (data[0].Pcode == null || data[0].Pcode == undefined || data[0].Pcode == "") {
                alert("Please Enter PCODE");
                return;
            }



            var paramObj = {
                "DataType": 2,
                "SubjectID": data[0].SubjectID,
                "CourseID": data[0].CourseID,
                "SubjectTypeID": data[0].SubjectTypeID,
                "SubjectCode": data[0].SubjectCode,
                "SubjectName": data[0].SubjectName,
                "ExternalMaxMarks": data[0].ExternalMaxMarks,
                "InternalMaxMarks": data[0].InternalMaxMarks,
                "ExternalPassMarks": data[0].ExternalPassMarks,
                "TotalPassMarks": data[0].TotalPassMarks,
                "Pcode": data[0].Pcode,
                "Active": data[0].Active,
                "UserName": $scope.UserName
            }
            var addsubjectmaster = CcicPreExaminationService.UpdateorActiveCcicSubjectMaster(paramObj);
            addsubjectmaster.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }
                if (res[0].ResponseCode == '200') {
                    alert(res[0].ResponseDescription);
                    $scope.modalInstance.close();
                    $scope.getSubjectMaster($scope.CourseID)
                    //$scope.clearDefaults();
                } else if (res[0].ResponseCode == '400') {
                    alert('Not Updated')
                    $scope.modalInstance.close();
                    $scope.getSubjectMaster($scope.CourseID)
                    //$scope.clearDefaults();

                }

            },

                function (error) {

                    var err = JSON.parse(error);
                })

        }




        $scope.GetCurrentAcademicYearData = function () {
            var getacayrs = CcicPreExaminationService.GetCcicAcademicYears()
            getacayrs.then(function (response) {
                $scope.GetCcicAcademicYears = response.Table;

                for (let i = 0; i < $scope.GetCcicAcademicYears.length; i++) {
                    if ($scope.GetCcicAcademicYears[i].GetCcicAcademicYears == true) {
                        $scope.finalList.push($scope.GetCcicAcademicYears[i]);
                    }
                }

                //  var ele = document.getElementsByClassName("tableinpt");
                for (var j = 1; j < response.Table.length + 1; j++) {
                    $scope['edit' + j] = true;
                }
            },
                function (error) {
                    alert("data is not loaded");
                    var err = JSON.parse(error);
                    console.log(err.Message);
                });

        }



        $scope.EditExamMonthYear = function (data, ind) {
            if ($scope.AcademicYear == null || $scope.AcademicYear == undefined || $scope.AcademicYear == "") {
                alert("Please Select AcademicYear to use the Operation");
                return
            }
            var ele1 = document.getElementsByClassName("enabletable" + ind);
            for (var j = 0; j < ele1.length; j++) {
                ele1[j].style['pointer-events'] = "auto";
                ele1[j].style.border = "1px solid #ddd";
            }
            $scope['edit' + ind] = false;

        }


        $scope.UpdateExamMonthYear = function (data, ind) {


            $scope['edit' + ind] = true;

            var ele2 = document.getElementsByClassName("enabletable" + ind);
            for (var j = 0; j < ele2.length; j++) {
                ele2[j].style['pointer-events'] = "none";
                ele2[j].style.border = "0";
            }




            //if (data.ExamMonthYear == null || data.ExamMonthYear == undefined || data.ExamMonthYear == "") {
            //    alert("Enter exam month and year.");
            //    return;
            //}
            //if (data.ExamMonthYearSequence == null || data.ExamMonthYearSequence == undefined || data.ExamMonthYearSequence == "") {
            //    alert("Enter ExamMonthYearSequence.");
            //    return;
            //}
            var UpdateExmMthYr = CcicPreExaminationService.UpdateExamMonthYear($scope.UserName, parseInt(data.ExamMonthYearID), data.ExamMonthYearName, parseInt(data.ExamMonthYearSequence))
            UpdateExmMthYr.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }
                if (res[0].ResponseCode == '400') {
                    alert(res[0].ResponseDescription);
                    $scope.GetExamMonthYearData($scope.AcademicYearID);
                    $scope.clearDefaults();
                } else {
                    alert('Exam Month Year Updated Successfully');
                    $scope.GetExamMonthYearData($scope.AcademicYearID);
                    $scope.clearDefaults();

                }

            },

                function (error) {

                    var err = JSON.parse(error);
                })

        }


        $scope.clearDefaults = function () {

            $scope.AcademicYear = null;
            $scope.RegularExam = null;
            $scope.ExamMonthYear = null;

        }



    })
})