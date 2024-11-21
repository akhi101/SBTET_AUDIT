define(['app'], function (app) {
    app.controller("CcicSetExamCentersController", function ($scope, $uibModal, $localStorage, CcicPreExaminationService) {

        var authData = $localStorage.authorizationData;
        $scope.UserName = authData.UserName

        $scope.finalList = [];
        $scope.edit = true;
        $scope.update = false;
        var examCenters = [];
        const $ctrl = this;
        $ctrl.$onInit = () => {
            //$scope.GetExamMonthYearData();
            $scope.getExamCentres();
        }

        

        var getCcicCurrentAcademicYear = CcicPreExaminationService.GetCcicCurrentAcademicYear();
        getCcicCurrentAcademicYear.then(function (response) {

            $scope.GetCcicCurrentAcademicYear = response;

        },
            function (error) {
                alert("error while loading CurrentAcademicYear");
                var err = JSON.parse(error);

            });

        var getaffcourses = CcicPreExaminationService.GetAffiliatedCourses();
        getaffcourses.then(function (res) {
            //var res = JSON.parse(res);
            $scope.CoursesData = res;
            //$scope.isAllSelectedcourses = false;
            //var toggleStatus = $scope.isAllSelectedcourses;
            //angular.forEach($scope.CoursesData, function (itm) { itm.selected = toggleStatus; });
            //$scope.coursearr = [];
            //angular.forEach($scope.CoursesData, function (value, key) {
            //    if (value.selected === true) {
            //        $scope.coursearr.push({ "CourseID": value.CourseID })
            //    }
            //});
        }, function (err) {
            $scope.LoadImg = false;
            alert("Error while loading");
        });


        


        $scope.getCcicAffiliatedInstitutions = function () {
            var getCcicAffiliatedIns = CcicPreExaminationService.GetAffiliatedInstitutions($scope.AcademicYear, $scope.monthyear, $scope.Course);
            getCcicAffiliatedIns.then(function (response) {

                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }

                if (res.length > 0) {
                    $scope.InstitutionsData = res;
                }
                else {
                    $scope.InstitutionsData = [];
                }



            },
                function (error) {
                    alert("error while loading Institutions");
                    var err = JSON.parse(error);

                });
        }

        //----------------------Course Multi Select Start--------------------------------//
        var institutionexpand = false;
        $scope.showinstitutionCheckboxes = function () {
            var checkboxes = document.getElementById("checkboxesinstitution");
            if (!institutionexpand) {
                checkboxes.style.display = "block";
                checkboxes.style.position = "absolute";
                checkboxes.style.width = "92%";
                checkboxes.style.backgroundColor = "white";
                checkboxes.style['z-index'] = 99;
                institutionexpand = true;
            } else {
                checkboxes.style.display = "none";
                institutionexpand = false;
            }
        }

        $scope.closeinstitutionCheckbox = function () {
            var checkboxes = document.getElementById("checkboxesinstitution");
            if (!institutionexpand) {
                checkboxes.style.display = "block";
                checkboxes.style.position = "absolute";
                checkboxes.style.width = "92%";
                checkboxes.style.backgroundColor = "white";
                institutionexpand = true;
            } else {
                checkboxes.style.display = "none";
                institutionexpand = false;
            }
        }

        $scope.toggleAllinstitution = function () {
            var toggleStatus = $scope.isAllSelectedinstitutions;
            angular.forEach($scope.InstitutionsData, function (itm) { itm.selected = toggleStatus; });
            $scope.institutionarr = [];
            $scope.institutionnamearr = [];
            angular.forEach($scope.InstitutionsData, function (value, key) {
                if (value.selected === true) {
                    $scope.institutionarr.push({ "InstitutionID": value.InstitutionID })
                    $scope.institutionnamearr.push({ "InstitutionName": value.InstitutionName })
                }
            });
        }

        $scope.optionToggledinstitution = function () {
            $scope.isAllSelectedinstitutions = $scope.InstitutionsData.every(function (itm) { return itm.selected; })
            $scope.institutionarr = [];
            $scope.institutionnamearr = [];
            angular.forEach($scope.InstitutionsData, function (value, key) {
                if (value.selected === true) {
                    $scope.institutionarr.push({ "InstitutionID": value.InstitutionID })
                    $scope.institutionnamearr.push({ "InstitutionName": value.InstitutionName })
                }
            });
        }

        //----------------------Course Multi Select End--------------------------------//




        $scope.changeExamCentre = function () {
            $scope.result = false;
            $scope.GetInstitutionCenters = [];
            $scope.edit = true;
            $scope.update = false;
            examCenters = [];
        }

        $scope.pushData = function (InstitutionID, ExaminationCenterID,CourseID) {
            return {
              
                InstitutionID: InstitutionID,
                ExaminationCenterID: ExaminationCenterID,
                CourseID: CourseID
            };
        }

        $scope.changeCenter = function (data) {
            // console.log(data) 
            if (examCenters.length == '0') {
                //  console.log(data.internal)
                var marksdata = $scope.pushData(data.InstitutionID, data.ExaminationCenterID, data.CourseID);
                examCenters.push(marksdata);


            } else if (examCenters.length > 0) {
                tempId = [];
                examCenters.map((obj) => {
                    if (obj.InstitutionID == data.InstitutionID) {
                       
                        obj.InstitutionID = data.InstitutionID;
                        obj.ExaminationCenterID = data.ExaminationCenterID;
                        obj.CourseID = data.CourseID;
                        tempId.push(data.InstitutionID);
                    }
                    else if (obj.InstitutionID != data.InstitutionID && !tempId.includes(data.InstitutionID)) {
                        //  console.log(data.internal)
                        var marksdata = $scope.pushData(data.InstitutionID, data.ExaminationCenterID, data.CourseID);

                        tempId.push(data.InstitutionID);
                        examCenters.push(marksdata);

                    }
                });

            }
            console.log(examCenters);

        }



        $scope.GetData = function (ExamCentre) {
            if ($scope.AcademicYear == '' || $scope.AcademicYear == null || $scope.AcademicYear == undefined) {
                alert('Please select Academic Year');
                return;
            }
            if ($scope.monthyear == '' || $scope.monthyear == null || $scope.monthyear == undefined) {
                alert('Please select Exam Month Year');
                return;
            }
            if ($scope.Course == '' || $scope.Course == null || $scope.Course == undefined) {
                alert('Please select Course');
                return;
            }
            if ($scope.ExamCentre == '' || $scope.ExamCentre == null || $scope.ExamCentre == undefined) {
                alert('Please select Exam Centre');
                return;
            }
            if ($scope.institutionarr == '' && $scope.isAllSelectedinstitutions == null || $scope.institutionarr == null && $scope.isAllSelectedinstitutions == null || $scope.institutionarr == undefined && $scope.isAllSelectedinstitutions == null) {
                alert('Please select Institution');
                return;
            }

            if ($scope.institutionarr == '' && $scope.isAllSelectedinstitutions == true || $scope.institutionarr == null && $scope.isAllSelectedinstitutions == true || $scope.institutionarr == undefined && $scope.isAllSelectedinstitutions == true) {
                alert('Please select Different Course');
                return;
            }

            if ($scope.institutionarr == '' || $scope.institutionarr == null || $scope.institutionarr == undefined) {
                alert('Please select Institution');
                return;
            }

            $scope.GetButton = false;
            $scope.AcademicYearDisable = true;
            $scope.monthyearDisable = true;
            $scope.CourseDisable = true;
            $scope.ExamCentreDisable = true;
            $scope.InstitutionDisable = true;
            try {
                var ExamCen = JSON.parse(ExamCentre)
            }
            catch { }

            $scope.SelectedExamCentre = ExamCen.ExaminationCentreName;
            $scope.SelectedExamCentreID = ExamCen.ExaminationCentreID,
            $scope.Selectedinstitutionnamearr = $scope.institutionnamearr;
            $scope.TableShow = true;

        }


        $scope.getData = function () {


            if (($scope.academicyear == undefined) || ($scope.academicyear == null) || ($scope.academicyear == "")) {
                alert("Select Academic Year");
                return false;
            }
            if (($scope.MonthYear == undefined) || ($scope.MonthYear == null) || ($scope.MonthYear == "")) {
                alert("Select Exam Month/Year");
                return false;
            }
            //if (($scope.course == undefined) || ($scope.course == null) || ($scope.course == "")) {
            //    alert("Select Course");
            //    return false;
            //}

            var DataType = 3;
            $scope.loading = true;
            $scope.result = false;
            var getadmexmcenters = CcicPreExaminationService.GetExamCentresMappingData(DataType, parseInt($scope.academicyear), parseInt($scope.MonthYear), '', '')
            getadmexmcenters.then(function (response) {
                if (response.length > 0 && response[0].StatusCode != '400') {
                    $scope.GetMappingData1 = response;
                    $scope.Noresult = false;
                    $scope.result = true;
                    $scope.loading = false;

                }
                else if (response[0].StatusCode == '400') {
                    alert(response[0].StatusDescription);
                    $scope.loading = false;
                    $scope.Noresult = true;
                    $scope.result = false;
                }
                else {
                    alert("No Data Found");
                    $scope.loading = false;
                    $scope.Noresult = true;
                    $scope.result = false;
                }
            },
                function (error) {
                    var err = JSON.parse(error);
                    $scope.loading = false;
                    $scope.Noresult = true;
                    $scope.result = false;
                });


        }


        $scope.Cancel = function () {
            $scope.GetButton = true;;
            $scope.AcademicYearDisable = false;
            $scope.monthyearDisable = false;
            $scope.CourseDisable = false;
            $scope.ExamCentreDisable = false;
            $scope.InstitutionDisable = false;
            $scope.TableShow = false;
        }


        $scope.addMappingExamCentres = function () {
            var setexmcenters = CcicPreExaminationService.AddMappingExamCentres($scope.AcademicYear, $scope.monthyear, $scope.Course, $scope.SelectedExamCentreID, JSON.stringify($scope.institutionarr), $scope.UserName);
            setexmcenters.then(function (response) {
                if (response[0].ResponseCode == '200') {
                    alert(response[0].ResponseDescription);
                    $scope.Cancel();
                    $scope.AcademicYear = null;
                    $scope.monthyear = null;
                    $scope.Course = null;
                    $scope.institutionarr = null;
                    $scope.ExamCentre = null;
                    $scope.InstitutionsData = [];
                    $scope.isAllSelectedinstitutions = null;
                    $scope.GetButton = false;
                    $scope.ExamCentre_Institution = false;

                } else {

                }

            },
                function (error) {

                    var err = JSON.parse(error);
                })

        }




        
        $scope.editDetails = function () {
            $scope.edit = false;
            $scope.update = true;
            ExamCenters = [];
        }

        //$scope.changeExamCentre = function () {
        //    $scope.result = false;
        //    $scope.GetInstitutionCenters = [];
        //    $scope.edit = true;
        //    $scope.update = false;
        //    examCenters = [];
        //}

        $scope.GetExamMonthYearData = function (AcademicYearID) {
            if (AcademicYearID == null || AcademicYearID == undefined || AcademicYearID == "") {
                return;

            }

            $scope.AcademicYearID = AcademicYearID;
            var getCcicAcademicYearBatch = CcicPreExaminationService.GetExamMonthYears(AcademicYearID)
            getCcicAcademicYearBatch.then(function (res) {
                try {
                    var res = JSON.parse(res);
                }
                catch (err) { }

                if (res.Table.length > 0) {
                    $scope.GetExamMonthYear = res.Table;
                }
                else {
                    $scope.GetExamMonthYear = [];
                }
                for (var j = 1; j < res.length + 1; j++) {
                    $scope['edit' + j] = true;
                }
            },
                function (error) {
                    alert("data is not loaded");
                    var err = JSON.parse(error);
                });

        }

        $scope.getexamMonthYearData = function (AcademicYearID) {
            if (AcademicYearID == null || AcademicYearID == undefined || AcademicYearID == "") {
                return;

            }

            $scope.AcademicYearID = AcademicYearID;
            var getCcicAcademicYearBatch = CcicPreExaminationService.GetExamMonthYears(AcademicYearID)
            getCcicAcademicYearBatch.then(function (res) {
                try {
                    var res = JSON.parse(res);
                }
                catch (err) { }

                if (res.Table.length > 0) {
                    $scope.GetExamMonthYear = res.Table;
                }
                else {
                    $scope.GetExamMonthYear = [];
                }
                for (var j = 1; j < res.length + 1; j++) {
                    $scope['edit' + j] = true;
                }
            },
                function (error) {
                    alert("data is not loaded");
                    var err = JSON.parse(error);
                });

        }

        $scope.getexammonthyeardata = function (AcademicYearID) {
            if (AcademicYearID == null || AcademicYearID == undefined || AcademicYearID == "") {
                return;

            }

            $scope.AcademicYearID = AcademicYearID;
            var getCcicAcademicYearBatch = CcicPreExaminationService.GetExamMonthYears(AcademicYearID)
            getCcicAcademicYearBatch.then(function (res) {
                try {
                    var res = JSON.parse(res);
                }
                catch (err) { }

                if (res.Table.length > 0) {
                    $scope.GetExamMonthYear = res.Table;
                }
                else {
                    $scope.GetExamMonthYear = [];
                }
                for (var j = 1; j < res.length + 1; j++) {
                    $scope['edit' + j] = true;
                }
            },
                function (error) {
                    alert("data is not loaded");
                    var err = JSON.parse(error);
                });

        }

        $scope.Submit = function () {

            $scope.institutionarr = [];
            $scope.isAllSelectedinstitutions = null;
            $scope.GetButton = true;

            if (($scope.AcademicYear == undefined) || ($scope.AcademicYear == null) || ($scope.AcademicYear == "")) {
                alert("Select Academic Year");
                return false;
            }
            if (($scope.monthyear == undefined) || ($scope.monthyear == null) || ($scope.monthyear == "")) {
                alert("Select Exam Month/Year");
                return false;
            }

            $scope.getCcicAffiliatedInstitutions();

            //$scope.loading = true;
            $scope.result = false;
            var getadmexmcenters = CcicPreExaminationService.GetAdminExamCentersList(parseInt($scope.AcademicYear),  parseInt($scope.monthyear))
            getadmexmcenters.then(function (response) {
                if (response.length > 0) {
                    $scope.GetInstitutionCenters = response;
                    $scope.ExamCentre_Institution = true;
                    var coursearr = [];
                    coursearr = response;
                    // if($scope.StudentType == 2){
                    //     $scope.ExaminationType = 10;  
                    //   }
                    // var getExamCenters = PreExaminationService.getExaminationCentersList($scope.Student.id, $scope.current_schemeid, $scope.currentAcademicYear, $scope.currentYearMonth);
                    

                    //$scope.loading = false;
                    $scope.Noresult = false;
                    $scope.result = true;

                } else {
                    alert("No Data Found");
                    //$scope.loading = false;
                    $scope.Noresult = true;
                    $scope.result = false;
                }
            },
                function (error) {
                    var err = JSON.parse(error);             
                    $scope.loading = false;
                    $scope.Noresult = true;
                    $scope.result = false;
                });
            

        }



        $scope.getExamCentresMappingData = function () {

       
            if (($scope.Academicyear == undefined) || ($scope.Academicyear == null) || ($scope.Academicyear == "")) {
                alert("Select Academic Year");
                return false;
            }
            if (($scope.Monthyear == undefined) || ($scope.Monthyear == null) || ($scope.Monthyear == "")) {
                alert("Select Exam Month/Year");
                return false;
            }
            if (($scope.course == undefined) || ($scope.course == null) || ($scope.course == "")) {
                alert("Select Course");
                return false;
            }

            var DataType = 1;
            $scope.loading = true;
            $scope.result = false;
            var getadmexmcenters = CcicPreExaminationService.GetExamCentresMappingData(DataType,parseInt($scope.Academicyear), parseInt($scope.Monthyear), parseInt($scope.course),'')
            getadmexmcenters.then(function (response) {
                if (response.length > 0 && response[0].StatusCode != '400') {
                    $scope.GetMappingData2 = response;
                    $scope.NoResult = false;
                    $scope.result = true;
                    $scope.loading = false;

                }
                else if (response[0].StatusCode=='400') {
                    alert(response[0].StatusDescription);
                    $scope.loading = false;
                    $scope.NoResult = true;
                    $scope.result = false;
                }
                else {
                    alert("No Data Found");
                    $scope.loading = false;
                    $scope.NoResult = true;
                    $scope.result = false;
                }
            },
                function (error) {
                    var err = JSON.parse(error);
                    $scope.loading = false;
                    $scope.NoResult = true;
                    $scope.result = false;
                });


        }




        $scope.editExamCentresMappingData = function (InstitutionExamCenterMappingId) {
            var DataType = 2;
            var getcentre = CcicPreExaminationService.EditExamCentresMappingData(DataType, parseInt($scope.Academicyear), parseInt($scope.Monthyear), parseInt($scope.course), InstitutionExamCenterMappingId);
            getcentre.then(function (res) {
                //try {
                //    var Res = JSON.parse(res)
                //}
                //catch (error) {

                //}
                $scope.EditData = res;
            }, function (err) {
                $scope.LoadImg = false;
                alert("Error while loading");
            });

            $scope.modalInstance = $uibModal.open({
                templateUrl: "/app/views/CCIC/Popups/EditCcicExamCentresPopup.html",
                size: 'xlg',
                scope: $scope,
                backdrop: 'static',
                windowClass: 'modal-fit-att',
            });
            $scope.closeModal = function () {
                $scope.modalInstance.close();
            }
        }

        

        $scope.update = function () {
            var setexmcenters = CcicPreExaminationService.SetAdminExamCentersList(JSON.stringify(examCenters), parseInt($scope.monthyear));
            setexmcenters.then(function (response) {
                if (response[0].ResponseCode == '500') {
                    alert(response[0].ResponseDescription)
                    $scope.Submit();
                   
                } else {
                    $scope.edit = true;
                    $scope.update = false;
                    alert('Data updated Successfully')
                    $scope.Submit();
                    

                }

            },
                function (error) {

                    var err = JSON.parse(error);
                })

        }


        $scope.getExamCentres = function () {
            var DataType = 3;
            var ExaminationCentreID = 0;
            var getcentres = CcicPreExaminationService.GetExaminationCentres(DataType, ExaminationCentreID);
            getcentres.then(function (res) {
                try {
                    var Res = JSON.parse(res)
                }
                catch (error) {

                }
                $scope.GetExaminationCentresTable = Res.Table;

            }, function (err) {
                $scope.LoadImg = false;
                alert("Error while loading");
            });
        }

        $scope.examCentreMappingExcel = function () {
            $scope.loading = true;
            var DataType = 3;
            if (($scope.academicyear == undefined) || ($scope.academicyear == null) || ($scope.academicyear == "")) {
                alert("Select Academic Year");
                return false;
            }
            if (($scope.MonthYear == undefined) || ($scope.MonthYear == null) || ($scope.MonthYear == "")) {
                alert("Select Exam Month/Year");
                return false;
            }
            var mappingReportExcel = CcicPreExaminationService.GetExamCentreMappingExcel(DataType, parseInt($scope.academicyear), parseInt($scope.MonthYear),0, 0);
            mappingReportExcel.then(function (res) {
                $scope.loading = false;
                if (res.length > 0) {
                    if (res.length > 4) {
                        window.location.href = res;
                    } else {
                        alert("No ExamCentre Mapping Excel Report Present")
                    }
                } else {
                    alert("No ExamCentre Mapping Report Present")
                }
            }, function (err) {
                $scope.LoadImg = false;
                alert("Error while loading");
            });

        };



        $scope.UpdateDetails = function (data) {
            var updateexmcenters = CcicPreExaminationService.UpdateMappingExamCentres(data.InstitutionExamCenterMappingId, data.ExaminationCentreID, data.IsActive, $scope.UserName);
            updateexmcenters.then(function (response) {
                if (response[0].StatusCode == '200') {
                    alert(response[0].StatusDescription);
                    $scope.modalInstance.close();
                    $scope.getExamCentresMappingData();
                } else {

                }

            },
                function (error) {

                    var err = JSON.parse(error);
                })

        }

   
       

    })
})