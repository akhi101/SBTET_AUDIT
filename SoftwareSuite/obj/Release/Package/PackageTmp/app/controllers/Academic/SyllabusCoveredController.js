define(['app'], function (app) {
    app.controller("SyllabusCoveredController", function ($scope, $http, $localStorage, $state, $stateParams, AppSettings, AcademicService, PreExaminationService) {


        const $ctrl = this;

        $ctrl.$onInit = () => {
            //var collegeCode = '001'
            var authData = $localStorage.authorizationData;
            console.log(authData);
            $scope.CollegeCode = authData.College_Code;
            // alert($scope.CollegeCode)
            var academicData = $localStorage.AcademicData
           // console.log(academicData)
            $scope.SemId = academicData.SemId;
            $scope.SchemeId = academicData.SchemeId;
            $scope.SubjectId = academicData.SubjectId;
            $scope.Sem = academicData.Sem;
            $scope.Scheme = academicData.Scheme;
            $scope.SubjectCode = academicData.SubjectCode;
            $scope.SubjectName = academicData.SubjectName;
            $scope.Shift = academicData.ShiftId;
            $scope.BranchId = academicData.BranchId;
            $scope.BrancName = academicData.Branch
            $scope.Theory = localStorage.getItem('Istheory');
            if ($scope.Theory == 1) {
                $scope.ChapterList = [
                    { Id: 1, Chapter: "Chapter - 1", "IsActive": false },
                    { Id: 2, Chapter: "Chapter - 2", "IsActive": false },
                    { Id: 3, Chapter: "Chapter - 3", "IsActive": false },
                    { Id: 4, Chapter: "Chapter - 4", "IsActive": false },
                    { Id: 5, Chapter: "Chapter - 5", "IsActive": false },
                    { Id: 6, Chapter: "Chapter - 6", "IsActive": false }
                ]
            } else {
                $scope.ChapterList = [
                    { Id: 1, Chapter: "Part - 1", "IsActive": false },
                    { Id: 2, Chapter: "Part - 2", "IsActive": false },
                    { Id: 3, Chapter: "Part - 3", "IsActive": false },

                ]
            }
            $scope.getSyllabusCoverageData();
            $scope.getFacultuy();
        }
        $scope.getFacultuy = function () {
            var getFacultyData = AcademicService.getFacultyDetails($scope.CollegeCode);
            getFacultyData.then(function (response) {

            },

                function (error) {
                    alert("error while Data");
                    console.log(error);
                });
        }








        $scope.getSyllabusCoverageData = function () {
            var getSyllabusCoverage = AcademicService.GetSyllabusCoverage($scope.SubjectId, $scope.CollegeCode, $scope.Shift);
            getSyllabusCoverage.then(function (response) {
                $scope.SyllabusData = response.Table;

                if ($scope.SyllabusData.length >= 1) {
                    var arr1 = $scope.ChapterList;
                    var arr2 = $scope.SyllabusData;

                    //}
                    var array = []

                    var temp = [];
                    $scope.ChapterList.map((obj) => {
                        for (var j = 0; j < $scope.SyllabusData.length; j++) {
                            if (obj.Id == $scope.SyllabusData[j].ChapterCoverd) {
                                obj.IsActive = $scope.SyllabusData[j].IsActive;
                                obj.SubmittedDate = $scope.SyllabusData[j].SubmittedDate;
                                obj.Is_Submitted = $scope.SyllabusData[j].Is_Submitted
                                temp.push(obj.Id);
                            } else if (obj.Id != $scope.SyllabusData[j].ChapterCoverd && !temp.includes(obj.Id)) {

                                temp.push(obj.Id);
                            }
                        }

                    });

                }

            },

                function (error) {
                    alert("error while Data");
                    console.log(error);
                });
        }



        $scope.submitData = function () {

            $scope.loading = true;
            $scope.result = false;
            //  console.log(JSON.stringify(examCenters))
            var getAdminExamCenters = PreExaminationService.setSyllabusCoverage(JSON.stringify(examCenters));
            getAdminExamCenters.then(function (response) {

                alert("Data Saved Successfuly")
                $scope.getSyllabusCoverageData();
            },
                function (error) {
                    alert("error while loading Data");
                    var err = JSON.parse(error);
                    //    console.log(err.Message);
                    //   $scope.edit = false;
                    $scope.loading = false;
                    $scope.Noresult = true;
                    $scope.result = false;
                });
        }




        var tempId = [];

        var examCenters = [];
        $scope.selectEntity = function (x) {

            //var PracticalEnter = $scope.push(x.Id, x.Chapter, x.date, x.isChecked)
            //Syllabus.push(PracticalEnter);
            //console.log(PracticalEnter);
            if (x.IsActive == true) {
                var IsActive = 1
            } else if (x.IsActive == false) {
                var IsActive = 0
            }

            if (examCenters.length == 0) {
                //  console.log(data.internal)

                var marksdata = $scope.pushData($scope.SubjectId, $scope.SchemeId, $scope.SemId, $scope.CollegeCode, $scope.BranchId, x.Id, IsActive, $scope.Shift);
                examCenters.push(marksdata);


            } else if (examCenters.length > 0) {
                examCenters.map((obj) => {
                    if (obj.ChapterCoverd == x.Id) {
                        //subjectId, SchemeId, SemId, CollegeCode, BranchId, ChapterCoverd, IsActive
                        obj.IsActive = IsActive;
                        obj.subjectId = $scope.SubjectId;
                        obj.SemId = $scope.SemId;
                        obj.SchemeId = $scope.SchemeId;
                        obj.CollegeCode = $scope.CollegeCode;
                        obj.BranchId = $scope.BranchId;
                        $scope.ShiftId = $scope.Shift;
                        //obj.ChapterCoverd = x.Id;

                        tempId.push(x.Id);
                    }
                    else if (obj.Id != x.Id && !tempId.includes(x.Id)) {
                        //  console.log(data.internal)
                        var marksdata = $scope.pushData($scope.SubjectId, $scope.SchemeId, $scope.SemId, $scope.CollegeCode, $scope.BranchId, x.Id, IsActive, $scope.Shift);

                        tempId.push(x.Id);
                        examCenters.push(marksdata);

                    }
                });

            }


        }

        $scope.pushData = function (subjectId, SchemeId, SemId, CollegeCode, BranchId, ChapterCoverd, IsActive, ShiftId) {
            return {
                subjectId: subjectId,
                SchemeId: SchemeId,
                SemId: SemId,
                CollegeCode: CollegeCode,
                BranchId: BranchId,
                ChapterCoverd: ChapterCoverd,
                IsActive: IsActive,
                ShiftId: ShiftId
            };
        }



    })
})