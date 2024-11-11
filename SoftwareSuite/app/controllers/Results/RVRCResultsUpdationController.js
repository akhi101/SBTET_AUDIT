define(['app'], function (app) {
    app.controller("RVRCResultsUpdationController", function ($scope, $http, $localStorage, $rootScope, $state, $stateParams, $document, StudentResultService, AppSettings, $timeout, PreExaminationService, AssessmentService, StudentWiseService) {

        //var serializedData = { "Name": ["Akhil"] }
        //request = $.ajax({
        //    url: "https://docs.google.com/spreadsheets/d/1FNnXNCX-KF0eaqk9-z0FKZoenocmakvJQLZI1uo1W3Y/edit#gid=0",
        //    type: "post",
        //    data: serializedData
        //});
        $scope.reload = false;
        var authData = $localStorage.authorizationData;
        $scope.ExamCategory = [];
        $scope.userName = authData.userName;
        $scope.College_Code = authData.College_Code;
        AppSettings.College_Name = authData.College_Name;
        $scope.College_Name = authData.College_Name;
        AppSettings.userName = authData.userName;
        $scope.BranchId = authData.BranchId;
        $scope.CollegeID = authData.CollegeID;
        $scope.userType = authData.SystemUserTypeId


        $scope.SubmitForm = function () {
            $scope.ShowData = true;
        }

        $scope.Submit = function () {
            $scope.ShowData = true;
        }
        $scope.GetTable = false;
        //$scope.MonthAndYear = [
        //   { "Id": 1, "ExamYearMonth": "Oct - Nov 2018" },
        //   { "Id": 2, "ExamYearMonth": "Mar - Apr 2019" },
        //   { "Id": 3, "ExamYearMonth": "June 2019" },
        //   { "Id": 4, "ExamYearMonth": "Nov - Dec 2019" }
        //]
        var getExamMonth = PreExaminationService.GetExamMonthYear();
        getExamMonth.then(function (response) {
            var response = JSON.parse(response)
            if (response.Table.length > 0) {
                $scope.MonthAndYear = response.Table;
            } else {
                $scope.StudentType = [];
                alert("No Student found on this Record");
            }
        },
            function (error) {
                //alert("error while loading Exam Month Years");
                console.log(error);

            });



        var expanded = false;
        $scope.showCheckboxes = function () {
            var checkboxes = document.getElementById("checkboxes");
            if (!expanded) {
                checkboxes.style.display = "block";
                expanded = true;
            } else {
                checkboxes.style.display = "none";
                expanded = false;
            }
        }

        $scope.closeCheckbox = function () {
            var checkboxes = document.getElementById("checkboxes");
            if (!expanded) {
                checkboxes.style.display = "block";
                expanded = true;
            } else {
                checkboxes.style.display = "none";
                expanded = false;
            }
        }

        //get schemes data for dropdown
        var SCHEMESEMINFO = StudentResultService.GetSchemeDataForResults();
        $scope.seminfo = [];
        $scope.examtypeinfo = [];
        $scope.pin = "";
        $scope.showData = 0;
        SCHEMESEMINFO.then(function (data) {
            if (data.length > 0) {

                $scope.schemeinfo = data;

            }
        }, function (error) {
            alert("unable to load Schemes");
        });
        $scope.optionToggled = function (mid1list) {
            $scope.isAllSelected = $scope.schemeinfo.every(function (itm) { return itm.selected; })
            $scope.arr = [];
            angular.forEach($scope.schemeinfo, function (value, key) {
                if (value.selected === true) {
                    console.log(value);
                    $scope.arr.push({ "schemeid": value.schemeid })
                }
            });
            console.log($scope.arr)
            console.log($scope.userTypes)

        }


        $scope.toggleAll = function () {
            var toggleStatus = $scope.isAllSelected;
            angular.forEach($scope.schemeinfo, function (itm) { itm.selected = toggleStatus; });
            $scope.arr = [];
            angular.forEach($scope.schemeinfo, function (value, key) {
                if (value.selected === true) {
                    console.log(value);
                    $scope.arr.push({ "schemeid": value.schemeid })
                }

            });
            //console.log($scope.arr)
            //console.log($scope.userTypes)
        }


        // student pass type 
        //$scope.SelStudentType = 2;
        var LoadExamTypeBysem = StudentResultService.getStudentType();
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
                console.log(error);
            });


        var AcademicYears = PreExaminationService.GetAcademicYears();
        AcademicYears.then(function (response) {
            if (response.Table.length > 0) {
                $scope.GetAcademicYears = response.Table;
            } else {
                $scope.GetAcademicYears = [];
                alert("No Academic Years Found");
            }
        },
            function (error) {
                alert("error while loading Academic Years");
                console.log(error);
            });


        // ************************ Drag and drop ***************** //
        let dropArea = document.getElementById("drop-area")

            // Prevent default drag behaviors
            ;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
                dropArea.addEventListener(eventName, preventDefaults, false)
                document.body.addEventListener(eventName, preventDefaults, false)
            })

            // Highlight drop area when item is dragged over it
            ;['dragenter', 'dragover'].forEach(eventName => {
                dropArea.addEventListener(eventName, highlight, false)
            })

            ;['dragleave', 'drop'].forEach(eventName => {
                dropArea.addEventListener(eventName, unhighlight, false)
            })

        // Handle dropped files
        dropArea.addEventListener('drop', handleDrop, false)

        function preventDefaults(e) {
            e.preventDefault()
            e.stopPropagation()
        }

        function highlight(e) {
            dropArea.classList.add('highlight')
        }

        function unhighlight(e) {
            dropArea.classList.remove('active')
        }

        function handleDrop(e) {
            var dt = e.dataTransfer
            var files = dt.files

            handleFiles(files)
        }

        let uploadProgress = []
        let progressBar = document.getElementById('progress-bar')

        function initializeProgress(numFiles) {
            progressBar.value = 0
            uploadProgress = []

            for (let i = numFiles; i > 0; i--) {
                uploadProgress.push(0)
            }
        }

        function updateProgress(fileNumber, percent) {
            uploadProgress[fileNumber] = percent
            let total = uploadProgress.reduce((tot, curr) => tot + curr, 0) / uploadProgress.length
            console.debug('update', fileNumber, percent, total)
            progressBar.value = total
        }

        function handleFiles(files) {
            files = [...files]
            initializeProgress(files.length)
            files.forEach(uploadFile)
            files.forEach(previewFile)
        }

        function previewFile(file) {
            let reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onloadend = function () {
                let img = document.createElement('img')
                img.src = reader.result
                document.getElementById('gallery').appendChild(img)
            }
        }
        $scope.ConsolidatedPreviewScheme = {
            schemeid: 5,
            scheme: 'C18'
        }

        $scope.SubmitConsolidatedPreview = function () {
            //if ($scope.SelStudentType == "" || $scope.SelStudentType == undefined || $scope.SelStudentType == null) {
            //    alert("select student type.");
            //    return;
            //}
            //if ($scope.ConsolidatedPreviewScheme == "" || $scope.ConsolidatedPreviewScheme == undefined || $scope.ConsolidatedPreviewScheme == null) {
            //    alert("select Scheme.");
            //    return;
            //}

            //if ($scope.Pin == "" || $scope.Pin == undefined || $scope.Pin == null) {
            //    alert("Enter Pin");
            //    return;
            //}


            $scope.showPreviewResultData = 0
            $scope.PreviewLoadImg = true;
            $scope.PreviewResultNotFound = false;
            $scope.PreviewResultFound = false;
            if ($scope.Schemeid == 5 || $scope.Schemeid == 9) {

                var resultdata = StudentResultService.GetConsolidatedRVRCPreviewResults($scope.Previewmonthyear, $scope.PreviewStudentType, $scope.PreScheme, $scope.PreviewPin, $scope.PreviewExamType);
                resultdata.then(function (data) {
                    $scope.co9Data = false;
                    var data = JSON.parse(data)

                    if (data.Table.length > 0) {
                        if (($scope.PreviewExamType == '1' || $scope.PreviewExamType == '2' || $scope.PreviewExamType == '28') && $scope.PreviewStudentType == 1) {
                            $scope.showPreviewResultData = 1;
                            $scope.PreviewLoadImg = false;
                            $scope.PreviewResultFound = true;
                            $scope.PreviewResultNotFound = false;
                            $scope.studentInfo = data.Table[0];
                            $scope.studentData = data.Table;
                            $scope.co9Data = false;
                            $scope.MidsData = true;
                            console.log($scope.studentData)
                        }

                        if (data.Table2.length > 0) {
                            $scope.showPreviewResultData = 1;
                            $scope.PreviewLoadImg = false;
                            $scope.PreviewResultFound = true;
                            $scope.PreviewResultNotFound = false;
                            $scope.studentInfo = data.Table[0];
                            var resultData = [];
                            resultData = data.Table2;
                            $scope.TotalData = data.Table1[0];

                            $scope.totalearnedCourseCredits = data.Table1[0].CgpaTotalGained;
                            $scope.CreditsGained = parseFloat(data.Table1[0].CreditsGained) + 2.5 * data.Table3.length;
                            $scope.CgpaTotalCredits = parseFloat(data.Table1[0].CgpaTotalCredits) + 2.5 * data.Table3.length;

                            $scope.newresultDisplayInfo = [];

                            var SemesterList = [];
                            var sems = []
                            for (var i = 0; i < data.Table3.length; i++) {


                                if (!SemesterList.includes(data.Table3[i].SemId)) {
                                    SemesterList.push(data.Table3[i].SemId);
                                    var temp = {};
                                    temp.Subjects = [];
                                    var temcount = [];
                                    temp.Sgpainfo = [];
                                    temp.courseinfo = [];
                                    temp.semtotalinfo = [];
                                    temp.Semester = data.Table3[i].Semester;

                                    temp.SemId = data.Table3[i].SemId;
                                    var temp1 = {
                                        TotalGradePoints: data.Table3[i].TotalGradePoints,
                                        SGPA: data.Table3[i].SGPA,
                                        Credits: data.Table3[i].Credits
                                    }

                                    temp.Sgpainfo.push(temp1);
                                    var courseTotalGradePoints = 0;
                                    if (temp.SemId == 6) {
                                        var courseCerditsGained = 0;
                                    } else {
                                        var courseCerditsGained = 2.5;
                                    }

                                    var courseMaxcerdits = "";
                                    for (var j = 0; j < resultData.length; j++) {
                                        if (resultData[j].SemId == temp.SemId) {
                                            temp.Subjects.push(resultData[j]);
                                            courseTotalGradePoints += parseFloat(resultData[j].TotalGradePoints);
                                            courseCerditsGained += resultData[j].CreditsGained;

                                        }

                                    }

                                    if (temp.SemId == 6) {
                                        var temp2 = {
                                            courseTotalGradePoints: courseTotalGradePoints,
                                            courseCerditsGained: courseCerditsGained,
                                            courseMaxCerdits: data.Table3[i].Credits,
                                        }

                                    } else {
                                        var temp2 = {
                                            courseTotalGradePoints: courseTotalGradePoints,
                                            courseCerditsGained: courseCerditsGained,
                                            courseMaxCerdits: data.Table3[i].Credits + 2.5,
                                        }

                                    }

                                    sems.push(temp2);
                                    temp.courseinfo.push(temp2);

                                    if (!temcount.includes(temp.SemId)) {
                                        if (temp.SemId != '6') {
                                            temcount.push(temp.SemId);
                                            var tempobj = {
                                                Subject_Code: "",
                                                SubjectName: "Rubrics",
                                                MaxCredits: "2.5",
                                                Mid1Marks: "-",
                                                Mid2Marks: "-",
                                                InternalMarks: "-",
                                                EndExamMarks: "-",
                                                SubjectTotal: "-",
                                                HybridGrade: "-",
                                                GradePoint: "-",
                                                CreditsGained: "2.5",
                                                TotalGradePoints: "-",
                                                WholeOrSupply: "W",
                                                ExamMonthYear: "",
                                                ExamStatus: "P"
                                            };


                                            temp.Subjects.push(tempobj);
                                        }
                                    }
                                    $scope.newresultDisplayInfo.push(temp);
                                }
                            }

                            var courseTotalGradePoints = 0
                            var courseCerditsGained = 0
                            var courseMaxCerdits = 0
                            for (var j = 0; j < sems.length; j++) {
                                courseTotalGradePoints += parseFloat(sems[j].courseTotalGradePoints);
                                courseCerditsGained += sems[j].courseCerditsGained;
                                courseMaxCerdits += sems[j].courseMaxCerdits;
                                $scope.courseTotalGradePoints = courseTotalGradePoints
                                $scope.courseCerditsGained = courseCerditsGained
                                $scope.courseMaxCerdits = courseMaxCerdits

                            }

                        }
                        else {
                            $scope.co9Data = false;
                            $scope.PreviewResultFound = false;
                            $scope.PreviewResultNotFound = true;
                            $scope.PreviewLoadImg = false;
                        }
                    }
                    else {
                        $scope.co9Data = false;
                        $scope.PreviewResultFound = false;
                        $scope.PreviewResultNotFound = true;
                        $scope.PreviewLoadImg = false;
                    }
                }, function (error) {
                    $scope.co9Data = false;
                    $scope.PreviewResultFound = false;
                    $scope.ResultNotFound = true;
                    $scope.LoadImg = false;

                });
            } else if ($scope.Schemeid == 8 || $scope.Schemeid == 1 || $scope.Schemeid == 3 || $scope.Schemeid == 4 || $scope.Schemeid == 2 || $scope.Schemeid == 6 || $scope.Schemeid == 7) {
                var resultdata = StudentResultService.GetConsolidatedRVRCPreviewResults($scope.Previewmonthyear, $scope.PreviewStudentType, $scope.PreScheme, $scope.PreviewPin);
                resultdata.then(function (data) {
                    $scope.co9Data = true;
                    var data = JSON.parse(data)
                    $scope.ConCaptcha = "";
                    console.log(data)
                    if (data.Table.length > 0) {
                        $scope.PreviewResultFound = true;
                        if (data.Table[0].ResponceCode == '400') {
                            $scope.co9Data = false;
                            $scope.ResultFound = false;
                            $scope.ResultNotFound = true;
                            $scope.PreviewLoadImg = false;
                        }
                        if (data.Table1.length > 0) {
                            data.Table1.forEach(function (item, i) {
                                if (item.SemId == "9") {
                                    data.Table1.splice(i, 1);
                                    data.Table1.unshift(item);
                                }
                            });

                        }

                        if (data.Table.length > 0) {
                            $scope.showData = 1;
                            $scope.PreviewLoadImg = false;
                            $scope.ResultFound = true;
                            $scope.ResultNotFound = false;
                            $scope.studentInfo = data.Table[0];
                            var resultData = [];
                            resultData = data.Table;
                            $scope.TotalData = data.Table[0];

                            $scope.totalearnedCourseCredits = data.Table[0].CgpaTotalGained;
                            $scope.CreditsGained = parseFloat(data.Table[0].CreditsGained) + 2.5 * data.Table1.length;
                            $scope.CgpaTotalCredits = parseFloat(data.Table[0].CgpaTotalCredits) + 2.5 * data.Table1.length;
                            $scope.newresultDisplayInfo1 = [];

                            var SemesterList = [];

                            for (var i = 0; i < data.Table1.length; i++) {
                                if (!SemesterList.includes(data.Table1[i].SemId)) {
                                    SemesterList.push(data.Table1[i].SemId);
                                    var temp = {};
                                    temp.Subjects = [];
                                    var temcount = [];
                                    temp.Sgpainfo = [];
                                    temp.courseinfo = [];
                                    temp.semtotalinfo = [];
                                    temp.Semester = data.Table1[i].Semester;
                                    temp.i = data.Table[i].i;
                                    temp.e = data.Table[i].e;
                                    temp.st1 = data.Table[i].st1;
                                    temp.remarks = data.Table[i].remarks;
                                    temp.TotalMarks = data.Table[i].TotalMarks;
                                    temp.Result = data.Table1[i].Result;

                                    temp.SemId = data.Table1[i].SemId;
                                    var temp1 = {
                                        TotalGradePoints: data.Table1[i].TotalGradePoints,
                                        SGPA: data.Table1[i].SGPA,
                                        Credits: data.Table1[i].Credits
                                    }

                                    temp.Sgpainfo.push(temp1);
                                    var courseTotalGradePoints = 0;
                                    var courseCerditsGained = 2.5;
                                    var courseMaxcerdits = "";
                                    for (var j = 0; j < resultData.length; j++) {
                                        if (resultData[j].SemId == temp.SemId) {
                                            temp.Subjects.push(resultData[j]);
                                            courseTotalGradePoints += parseFloat(resultData[j].TotalGradePoints);
                                            courseCerditsGained += resultData[j].CreditsGained;

                                        }
                                    }
                                    var temp2 = {
                                        courseTotalGradePoints: courseTotalGradePoints,
                                        courseCerditsGained: courseCerditsGained,
                                        courseMaxCerdits: data.Table[i].Credits + 2.5
                                    }
                                    temp.courseinfo.push(temp2);


                                }
                                $scope.newresultDisplayInfo1.push(temp);
                                console.log($scope.newresultDisplayInfo1);
                            }

                        }
                        else {
                            $scope.co9Data = false;
                            $scope.ResultFound = false;
                            $scope.ResultNotFound = true;
                            $scope.PreviewLoadImg = false;
                        }
                    }
                    else {
                        alert('No Data Found')
                        $scope.co9Data = false;
                        $scope.ResultFound = false;
                        $scope.ResultNotFound = true;
                        $scope.PreviewLoadImg = false;
                    }

                }, function (error) {
                    $scope.co9Data = false;
                    $scope.ResultFound = false;
                    $scope.ResultNotFound = true;
                    $scope.PreviewLoadImg = false;

                });

            }
        }



        $scope.SampleData = [{
            "sbtet_code": "",
            "sbtet_branch_code": "",
            "Candidatename": "",
            "FatherName": "",
            "MotherName": "",
            "sex": "",
            "dob_date": "",
            "e_mail": "",
            "StudentContact": "",
            "SCHEME": "",
            "ActiveFlag": "",
            "AcademicYearId": "",
            "CategoryId": "",
            "TenthRollNo": "",
            "StudentRecided": "",
            "PolycetHallTicketNo": "",
            "ReligionId": "",
            "Region": "",
            "MinorityType": "",
            "PermanentAddress": "",
            "TempararyAddress": "",
            "HouseNo": "",
            "VillageorTown": "",
            "District": "",
            "Mandal": "",
            "IsPhysicallyHandicaped": "",
            "FatherAadhaarNo": "",
            "MotherAadhaarNo": "",
            "IsFatherGorthEmp": "",
            "Income": "",
            "IncomeStatusValidity": "",
            "IncomeCategory": "",
            "Occupation": "",
            "CasteNo": "",
            "CasteCertificateValidity": "",
            "Bank": "",
            "BankAccountNo": "",
            "IfscCode": "",
            "BankBranch": "",
            "mandal": "",
            "district": "",
        }]

        function uploadFile(file, i) {
            var url = 'https://api.cloudinary.com/v1_1/joezimim007/image/upload'
            var xhr = new XMLHttpRequest()
            var formData = new FormData()
            xhr.open('POST', url, true)
            xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')

            // Update progress (can be used to show progress indicator)
            xhr.upload.addEventListener("progress", function (e) {
                updateProgress(i, (e.loaded * 100.0 / e.total) || 100)
            })

            xhr.addEventListener('readystatechange', function (e) {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    updateProgress(i, 100) // <- Add this
                }
                else if (xhr.readyState == 4 && xhr.status != 200) {
                    // Error. Inform the user
                }
            })

            formData.append('upload_preset', 'ujpu6gyk')
            formData.append('file', file)
            xhr.send(formData)
        }

        $scope.FileContains = false;
        $scope.FileContains1 = false;
        $scope.$watch('myFile', function (newFileObj) {
            if (newFileObj) {
                $scope.filename = newFileObj.name;
                $scope.FileContains = true;
                $scope.FileContains1 = true;
            }
        });

        $scope.$watch('myFile1', function (newFileObj) {
            if (newFileObj) {
                $scope.filename = newFileObj.name;
                $scope.FileContains = true;
                $scope.FileContains1 = true;
            }
        });

        function uploadFile(file1, i) {
            var url = 'https://api.cloudinary.com/v1_1/joezimim007/image/upload'
            var xhr = new XMLHttpRequest()
            var formData = new FormData()
            xhr.open('POST', url, true)
            xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')

            // Update progress (can be used to show progress indicator)
            xhr.upload.addEventListener("progress", function (e) {
                updateProgress(i, (e.loaded * 100.0 / e.total) || 100)
            })

            xhr.addEventListener('readystatechange', function (e) {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    updateProgress(i, 100) // <- Add this
                }
                else if (xhr.readyState == 4 && xhr.status != 200) {
                    // Error. Inform the user
                }
            })

            formData.append('upload_preset', 'ujpu6gyk')
            formData.append('file1', file1)
            xhr.send(formData)
        }


        $scope.tabledata = [];
        $scope.tabledata1 = [];
        // reading excel data
        $scope.Exceldata = [];
        $scope.Exceldata1 = [];





        $scope.openExcel = function () {
            $scope.reload = true;
            if ($scope.myFile != '') {
                $scope.reload = true;

                $scope.tabledata = []
                $scope.Exceldat = [];
                $scope.Exceldata = [];
                var reader = new FileReader();
                reader.readAsBinaryString($scope.myFile);
                reader.onload = function (e) {
                    var data = e.target.result;
                    var workbook = XLSX.read(data, {
                        type: 'binary',
                    });
                    workbook.SheetNames.forEach(function (sheetName) {
                        // Here is your object
                        var obj2 = []
                        $scope.XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                        var json_object = JSON.stringify($scope.XL_row_object);
                        $scope.JsonObj = JSON.parse(json_object)


                        $scope.reload = false
                    });

                    if ($scope.XL_row_object.length > 0) {

                        var data = {};
                        $scope.Exceldata.push($scope.XL_row_object);

                        $scope.Exceldat = $scope.Exceldata[0]

                        var tempArray = ["Pin", "SubjectCode", "Mid1Marks", "Mid1MaxMarks", "Mid2Marks", "Mid2MaxMarks", "Mid3Marks", "Mid3MaxMarks", "InternalMarks", "InternalMaxMarks"
                            , "EndMarks", "EndMaxMarks", "IndustryName", "MpRule", "BranchCode"];
                        var keysMached = false;
                        for (let q = 0; q < Object.keys($scope.Exceldat[0]).length; q++) {
                            if (tempArray.includes(Object.keys($scope.Exceldat[0])[q])) {
                                console.log("All Keys Matched");

                                keysMached = true;
                            } else {
                                console.log(Object.keys($scope.Exceldat[0])[q])
                                alert(Object.keys($scope.Exceldat[0])[q] + " Column Name Not Matched to the Required Excel");
                                $scope.tabledata = []
                                $scope.Exceldat = [];
                                $scope.Exceldata = [];
                                keysMached = false;
                                $scope.reload = false;
                                break;
                                return;
                            }
                        };
                        if (keysMached == true) {
                            $scope.tabledata.push({ rows: $scope.XL_row_object, cols: Object.keys($scope.XL_row_object[0]) });
                            if ($scope.tabledata.length > 0) {
                                $scope.ShowTableData = true;
                                //$scope.reload = false
                            } else {

                                $scope.tabledata = []
                                $scope.Exceldat = [];
                                $scope.Exceldata = [];
                                $scope.ShowTableData = false;
                                $scope.reload = false
                            }
                        } else {
                            $scope.reload = false
                            $scope.tabledata = []
                            $scope.Exceldat = [];
                            $scope.Exceldata = [];
                            $scope.ShowTableData = false;
                        }
                        document.getElementById("myCheck").click();

                    } else {
                        $scope.tabledata = []
                        $scope.Exceldat = [];
                        $scope.Exceldata = [];
                        $scope.reload = false
                        document.getElementById("myCheck").click();
                    }

                    $scope.reload = false

                };

                reader.onerror = function (ex) {
                    $scope.tabledata = []
                    $scope.Exceldat = [];
                    $scope.Exceldata = [];
                    $scope.reload = false
                    console.log(ex);
                    $scope.reload = false
                };

            } else {
                alert('Please Upload Excel file');
                $scope.tabledata = []
                $scope.Exceldat = [];
                $scope.Exceldata = [];
                $scope.reload = false
                $scope.reload = false
                return;
            }


        }



        $scope.openExcel1 = function () {
            $scope.reload1 = true;
            if ($scope.myFile != '') {
                $scope.reload1 = true;
                $scope.tabledata1 = []
                $scope.Exceldat1 = [];
                $scope.Exceldata1 = [];
                var reader = new FileReader();
                reader.readAsBinaryString($scope.myFile);
                reader.onload = function (e) {
                    var data = e.target.result;
                    var workbook = XLSX.read(data, {
                        type: 'binary',


                    });

                    workbook.SheetNames.forEach(function (sheetName) {
                        // Here is your object
                        var obj2 = []
                        $scope.XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                        var json_object = JSON.stringify($scope.XL_row_object);
                        $scope.JsonObj = JSON.parse(json_object)

                        if ($scope.XL_row_object.length > 0) {

                            var data = {};
                            $scope.Exceldata1.push($scope.XL_row_object);

                            $scope.Exceldat1 = $scope.Exceldata1[0]

                            var tempArray1 = ["Pin", "SubjectCode", "Marks", "MaxMarks"];
                            var keysMached1 = false;
                            for (let q = 0; q < Object.keys($scope.Exceldat1[0]).length; q++) {
                                if (tempArray1.includes(Object.keys($scope.Exceldat1[0])[q])) {
                                    console.log("All Keys Matched");

                                    keysMached1 = true;
                                } else {
                                    alert(Object.keys($scope.Exceldat1[0])[q] + " Column Names Not Matched");
                                    $scope.tabledata1 = []
                                    $scope.Exceldat1 = [];
                                    $scope.Exceldata1 = [];
                                    keysMached1 = false;
                                    $scope.reload1 = false;
                                    break;
                                    return;
                                }
                            };
                            if (keysMached1 == true) {
                                $scope.tabledata1.push({ rows: $scope.XL_row_object, cols: Object.keys($scope.XL_row_object[0]) });
                                if ($scope.tabledata1.length > 0) {
                                    $scope.ShowTableData1 = true;
                                    //$scope.reload1 = false
                                } else {
                                    $scope.Exceldat1 = [];
                                    $scope.tabledata1 = []
                                    $scope.Exceldata1 = [];
                                    $scope.ShowTableData1 = false;
                                    $scope.reload1 = false
                                }
                            } else {
                                $scope.Exceldat1 = [];
                                $scope.reload1 = false
                                $scope.tabledata1 = []
                                $scope.Exceldata1 = [];
                                $scope.ShowTableData1 = false;
                            }
                            $scope.reload1 = false
                            document.getElementById("myCheck1").click();

                        } else {
                            $scope.reload1 = false
                            document.getElementById("myCheck1").click();
                        }


                    });



                };
                //$scope.reload1 = false
                reader.onerror = function (ex) {
                    console.log(ex);
                };
                //$scope.reload1 = false
                // $scope.init();
            } else {
                alert('Please Upload Excel file');
                $scope.tabledata = []
                $scope.Exceldat = [];
                $scope.Exceldata = [];
                $scope.reload1 = false
                $scope.reload1 = false
                return;
            }

        }


        //$scope.monthyear, $scope.SelStudentType, $scope.Scheme, $scope.ExamTypeId, $scope.userName
        $scope.GenerateNr = function (Nrscheme) {

            $scope.reload = true;

            var loadData1 = PreExaminationService.GenerateNrData($scope.Nrmonthyear, $scope.NrSelStudentType, $scope.NrScheme1, $scope.NrExamTypeId, $scope.userName)
            loadData1.then(function (res) {
                var data = JSON.parse(res)
                if (data[0].ResponceCode == '200') {
                    $scope.Result = true;
                    var location = data[0].file;
                    window.location.href = location;
                    $scope.reload = false;
                } else
                    if (data[0].ResponceCode == '400') {
                        $scope.reload = false;
                        alert(data[0].ResponceDescription);
                    }
                    else {
                        $scope.reload = false;
                        alert('Something Went Wrong')
                    }

            }, function (error) {
                $scope.reload = false;
                $scope.gentmetbl = false;
                $scope.ResultNotFound = true;
                $scope.Result = false;
                $scope.LoadImg = false;
            });
        }

        $scope.ResultsDeployTables = function () {
            $scope.reload = true;
            var loadData1 = PreExaminationService.RVRCResultsDeployTables($scope.Deploymonthyear, $scope.DeploySelStudentType, $scope.Deployscheme1, $scope.userName, $scope.DeployExamType)
            loadData1.then(function (res) {
                console.log(res)
                var data = JSON.parse(res)
                if (data.Table[0].ResponceCode == '200') {
                    $scope.reload = false;
                    $scope.SuccessStatus = true;
                    $scope.FailStatus = false;
                    $scope.StatusMessage = data.Table[0].ResponceDescription;
                    setTimeout(function () {
                        $scope.StatusMessage = '';
                    }, 1000);

                    alert(data.Table[0].ResponceDescription)
                } else if (data.Table[0].ResponceCode == '400') {
                    $scope.reload = false;
                    $scope.SuccessStatus = false;
                    $scope.FailStatus = true;
                    $scope.StatusMessage = data.Table[0].ResponceDescription;
                    alert(data.Table[0].ResponceDescription)
                }
                else {
                    $scope.reload = false;
                    //$('#upldfile').val(null);
                    $scope.ResultNotFound = true;
                    $scope.SuccessStatus = false;
                    $scope.FailStatus = false;
                    alert('Something Went Wrong')
                }
            }, function (error) {
                $scope.reload = false;
                alert('Something Went Wrong')
                $scope.gentmetbl = false;
                $scope.Result = false;
                $scope.ResultNotFound = true;
                $scope.SuccessStatus = false;
                $scope.FailStatus = false;
                $scope.LoadImg = false;
            });
        }


        $scope.ResultsProcessing = function () {
            $scope.reload = true;
            //console.log($scope.Resultsmonthyear, $scope.ResultsSelStudentType, $scope.Resultsscheme1, $scope.ResultsExamTypeId, $scope.ResultsAcademicYear, $scope.userName)
            var loadData1 = PreExaminationService.RVRCResultsProcessing($scope.Resultsmonthyear, $scope.ResultsSelStudentType, $scope.Resultsscheme1, $scope.userName, $scope.ResultsExamType)
            loadData1.then(function (res) {
                var data = JSON.parse(res)
                if (data[0].ResponceCode == '200') {
                    $scope.Result = true;
                    var location = data[0].file;
                    window.location.href = location;
                    $scope.reload = false;
                } else
                    if (data[0].ResponceCode == '400') {
                        $scope.reload = false;
                        alert(data[0].ResponceDescription);
                    }
                    else {
                        $scope.reload = false;
                        alert('Something Went Wrong')
                    }
            }, function (error) {
                $scope.reload = false;
                $scope.gentmetbl = false;
                $scope.ResultNotFound = true;
                $scope.Result = false;
                $scope.LoadImg = false;
            });
        }


        $scope.ResultsLogicReports = function () {
            $scope.reload = true;
            var loadData1 = PreExaminationService.ResultsLogicReports($scope.Logicmonthyear, $scope.LogicSelStudentType, $scope.Logicscheme1, $scope.LogicExamTypeId, $scope.LogicAcademicYear, $scope.userName)
            loadData1.then(function (res) {
                var data = JSON.parse(res)
                if (data[0].ResponceCode == '200') {
                    $scope.Result = true;
                    var location = data[0].file;
                    window.location.href = location;
                    $scope.reload = false;
                } else
                    if (data[0].ResponceCode == '400') {
                        $scope.reload = false;
                        alert(data[0].ResponceDescription);
                    }
                    else {
                        $scope.reload = false;
                        alert('Something Went Wrong')
                    }
            }, function (error) {
                $scope.reload = false;
                $scope.gentmetbl = false;
                $scope.ResultNotFound = true;
                $scope.Result = false;
                $scope.LoadImg = false;
            });
        }

        $scope.loadSemExamTypes = function (dataType, data) {
            var res = JSON.parse(data)
            $scope.Schemeid = res.schemeid
            if (dataType == 1) {
                $scope.EScheme = res.scheme
                $scope.Scheme1 = res.scheme
            } else if (dataType == 2) {
                $scope.EScheme = res.scheme
                $scope.NrScheme1 = res.scheme
            } else if (dataType == 3) {
                $scope.EScheme = res.scheme
                $scope.Postscheme1 = res.scheme
            } else if (dataType == 4) {
                $scope.EScheme = res.scheme
                $scope.Wantingsscheme1 = res.scheme
            } else if (dataType == 5) {
                $scope.EScheme = res.scheme
                $scope.UploadScheme1 = res.scheme
            } else if (dataType == 6) {
                $scope.EScheme = res.scheme
                $scope.Resultsscheme1 = res.scheme
            } else if (dataType == 7) {
                $scope.EScheme = res.scheme
                $scope.PreScheme = res.scheme
                console.log($scope.PreScheme)
            } else if (dataType == 8) {
                $scope.EScheme = res.scheme
                $scope.Deployscheme1 = res.scheme
            }
            var getExamType = PreExaminationService.getActiveExamTypesByScheme($scope.EScheme);
            getExamType.then(function (response) {
                var response = JSON.parse(response);
                if (response.Table.length > 0) {
                    $scope.getExamTypes = response.Table;
                } else {
                    $scope.StudentType = [];
                    alert("No Student found on this Record");
                }
            },
                function (error) {
                    //alert("error while loading Exam Month Years");
                    console.log(error);
                });

        }

        $scope.GenerateWantings = function () {
            $scope.reload1 = true;
            var loadData1 = PreExaminationService.GenerateWantings($scope.Wantingsmonthyear, $scope.WantingsSelStudentType, $scope.Resultsscheme1, $scope.WantingsExamTypeId)
            loadData1.then(function (res) {
                var data = JSON.parse(res)
                if (data[0].ResponceCode == '200') {
                    $scope.Result = true;
                    var location = data[0].file;
                    window.location.href = location;
                    $scope.reload1 = false;
                } else
                    if (data[0].ResponceCode == '400') {
                        $scope.reload1 = false;
                        alert(data[0].ResponceDescription);
                    }
                    else {
                        $scope.reload1 = false;
                        alert('Something Went Wrong')
                    }
            }, function (error) {
                $scope.reload1 = false;
                $scope.gentmetbl = false;
                $scope.ResultNotFound = true;
                $scope.Result = false;
                $scope.LoadImg = false;
            });
        }

        $scope.PostMarks = function () {
            $scope.reload = true;
            $scope.ResultNotFound = false;
            $scope.SuccessStatus = false;
            $scope.FailStatus = false;
            var loadData1 = PreExaminationService.PostMarks($scope.Postmonthyear, $scope.PostSelStudentType, $scope.Postscheme1, $scope.PostExamTypeId, $scope.userName)
            loadData1.then(function (data) {
                var data = JSON.parse(data)
                if (data.Table[0].ResponceCode == '200') {
                    $scope.reload = false;
                    alert(data.Table[0].ResponceDescription)
                    $scope.ResultNotFound = false;
                    $scope.SuccessStatus = true;
                    $scope.FailStatus = false;
                    $scope.StatusMessage = data.Table[0].ResponceDescription;
                    setTimeout(function () {
                        $scope.StatusMessage = '';

                    }, 1000);

                } else if (data.Table[0].ResponceCode == '400') {
                    $scope.reload = false;
                    alert(data.Table[0].ResponceDescription)
                    $scope.SuccessStatus = false;
                    $scope.FailStatus = true;
                    $scope.ResultNotFound = false;
                    $scope.StatusMessage = data.Table[0].ResponceDescription;
                } else {
                    $scope.reload = false;
                    $scope.ResultNotFound = true;
                    $scope.SuccessStatus = false;
                    $scope.FailStatus = false;
                    alert("Something Went Wrong.");
                }
                $scope.LoadImg = false;
            }, function (error) {
                $scope.reload = false;
                $scope.ResultNotFound = true;
                $scope.SuccessStatus = false;
                $scope.FailStatus = false;
                alert("Something Went Wrong.");
                $scope.Result = false;
                $scope.LoadImg = false;
            });
        }

        //-----end-----
        $scope.UploadExcel = function () {

            $scope.reload = true;
            //for (let obj of $scope.SampleData) {
            ////console.log("object:", obj);
            //    for (let key in obj) {
            //        //console.log("      key:", key, "value:", obj[key]);
            //        for (let obj1 of $scope.tabledata) {
            //        //console.log("object:", obj1);
            //            for (let key1 in obj1) {
            //                //  console.log("      key:", key, "value:", obj[key]);
            //                console.log(key, key1)
            //                if (key == key1) {
            //                    console.log('Matched')
            //                    break;
            //                } else {
            //                    console.log('Not Matched')

            //                }
            //            }
            //        }
            //    }
            //}
            //        $scope.SampleData.forEach(obj => {
            //    Object.entries(obj).forEach((key1, value1) => {

            //        $scope.tabledata.forEach(obj1 => {
            //            Object.entries(obj1).forEach((key2, value2) => {
            //                if (key1 == key2[0]) {
            //                                console.log("All Keys Matched")
            //                                // here is where you grab the value2.color
            //                            } else {
            //                    console.log(key2+"Column Names Not Matched")
            //                    return;

            //                            }
            //            });
            //            console.log('-------------------');
            //        });
            //    });
            //    console.log('-------------------');
            //});

            //for (i = 0; i < $scope.SampleData.length; i++) {
            // var   SampleData = $scope.SampleData[i];
            // for (i = 0; i < $scope.tabledata.length; i++) {
            //     var JsonObj = $scope.tabledata[i];
            //    }
            //}

            //angular.forEach($scope.SampleData, function (value1, key1) {
            //    angular.forEach($scope.tabledata, function (value2, key2) {

            //        if (key1 == key2) {
            //            alert("All Keys Matched")
            //            // here is where you grab the value2.color
            //        } else {
            //            alert("Column Names Not Matched")
            //        }
            //    });
            //});

            //console.log($scope.Exceldat);


            //var empid=[1,4,5]
            //var records = [{ "empid": 1, "fname": "X", "lname": "Y" }, { "empid": 2, "fname": "A", "lname": "Y" }, { "empid": 3, "fname": "B", "lname": "Y" }, { "empid": 4, "fname": "C", "lname": "Y" }, { "empid": 5, "fname": "C", "lname": "Y" }] ;

            //var empIdObj={};

            //empid.forEach(function(element) {
            //    empIdObj[element]=true;
            //});

            //angular.forEach($scope.Exceldat, function (value, key) {
            //    console.log(value)
            //    console.log($scope.Exceldat[key])
            //    //if (value == "Pin") {
            //    //    if (value == "SubjectCode") {
            //    //        //alert('Subject Code is required in uploaded Excel')
            //    //        //return;
            //    //        if (value == "Marks") {
            //    //            //alert('Marks is required in uploaded Excel')
            //    //            //return;
            //    //            if (value == "MaxMarks") {
            //    //                //alert('Max Marks is required in uploaded Excel')
            //    //                //return;
            //    //            } else {
            //    //                alert('Max Marks is required in uploaded Excel')
            //    //                return;
            //    //            }
            //    //        } else {
            //    //            alert('Marks is required in uploaded Excel')
            //    //            return;
            //    //        }
            //    //    } else {
            //    //        alert('Subject Code is required in uploaded Excel')
            //    //        return;
            //    //    }
            //    //} else {
            //    //    alert('Pin is required in uploaded Excel')
            //    //    return;
            //    //}
            //    //console.log("username is thomas");
            //});


            //console.log(filteredArray)
            //console.log($scope.monthyear, $scope.SelStudentType, $scope.Scheme,$scope.SelStudentType, filteredArray, $scope.userName)
            $scope.Exceldat = $scope.Exceldata[0]
            $scope.filteredArray = [];
            $scope.Exceldat.forEach(function (element) {
                //console.log(element)

                var obj = {
                    "Pin": element.Pin, "SubjectCode": element.SubjectCode, "Mid1Marks": element.Mid1Marks, "Mid1MaxMarks": element.Mid1MaxMarks,
                    "Mid2Marks": element.Mid2Marks, "Mid2MaxMarks": element.Mid2MaxMarks, "Mid3Marks": element.Mid3Marks,
                    "Mid3MaxMarks": element.Mid3MaxMarks, "InternalMarks": element.InternalMarks, "InternalMaxMarks": element.InternalMaxMarks,
                    "EndMarks": element.EndMarks, "EndMaxMarks": element.EndMaxMarks, "IndustryName": element.IndustryName, "MpRule": element.MpRule, "BranchCode": element.BranchCode

                }
                $scope.filteredArray.push(obj)
            });
            var uploadJson = PreExaminationService.UploadRVRCFileJson($scope.monthyear, $scope.SelStudentType, $scope.Scheme, $scope.userName, $scope.filteredArray,);
            uploadJson.then(function (data) {

                var data = JSON.parse(data);
                if (data.Table[0].ResponceCode == '200') {
                    $scope.reload = false;
                    $('#upldfile').val(null);
                    $('#File').val(null);
                    $scope.filename = '';
                    $scope.myFile = '';
                    //document.getElementById('myFile').value = "";
                    //document.getElementById('file').value = "";
                    alert(data.Table[0].ResponceDescription)
                } else if (data.Table[0].ResponceCode == '400') {
                    $('#File').val(null);
                    $scope.reload = false;
                    alert(data.Table[0].ResponceDescription)
                }
                else {
                    $scope.reload = false;
                    //$('#upldfile').val(null);
                    alert('Something Went Wrong')
                }
                //$scope.tabledata;
            }, function (error) {
                $('#upldfile').val(null);
                $scope.reload = false;
                //$scope.gentmetbl = false;
                $scope.ResultNotFound = true;
                $scope.Result = false;
                $scope.LoadImg = false;
            });
            //  angular.forEach($scope.Exceldata, function (value, key) {
            //       for (i = 0; i < $scope.Exceldata.length; i++) {
            //           if ($scope.Exceldata[i].examcent == "" || $scope.Exceldata[i].examcent == null || $scope.Exceldata[i].examcent == undefined || $scope.Exceldata[i].examcent == 'NULL') {
            //               alert('examcent is required');
            //               return;
            //               break;

            //           }
            //           if ($scope.Exceldata[i].ExamcentName == "" || $scope.Exceldata[i].ExamcentName == null || $scope.Exceldata[i].ExamcentName == undefined || $scope.Exceldata[i].ExamcentName == 'NULL') {
            //               alert('ExamcentName is required');
            //               return;
            //               break;
            //           }
            //           if ($scope.Exceldata[i].scheme == "" || $scope.Exceldata[i].scheme == null || $scope.Exceldata[i].scheme == undefined || $scope.Exceldata[i].scheme == 'NULL') {
            //               alert('scheme is required');
            //               return;
            //               break;
            //           }
            //           if ($scope.Exceldata[i].Branchcode == "" || $scope.Exceldata[i].Branchcode == null || $scope.Exceldata[i].Branchcode == undefined || $scope.Exceldata[i].Branchcode == 'NULL') {
            //               alert('Branchcode is required');
            //               return;
            //               break;
            //           }
            //           if ($scope.Exceldata[i].Subcode == "" || $scope.Exceldata[i].Subcode == null || $scope.Exceldata[i].Subcode == undefined || $scope.Exceldata[i].Subcode == 'NULL') {
            //               alert('Subcode is required');
            //               return;
            //               break;
            //           }
            //           if ($scope.Exceldata[i].subname == "" || $scope.Exceldata[i].subname == null || $scope.Exceldata[i].subname == undefined || $scope.Exceldata[i].subname == 'NULL') {
            //               alert('subname is required');
            //               return;
            //               break;
            //           }
            //           if ($scope.Exceldata[i].pcode == "" || $scope.Exceldata[i].pcode == null || $scope.Exceldata[i].pcode == undefined || $scope.Exceldata[i].pcode == 'NULL') {
            //               alert('pcode is required');
            //               return;
            //               break;
            //           }
            //           if ($scope.Exceldata[i].pinno == "" || $scope.Exceldata[i].pinno == null || $scope.Exceldata[i].pinno == undefined || $scope.Exceldata[i].pinno == 'NULL') {
            //               alert('pinno is required');
            //               return;
            //               break;
            //           }
            //           if ($scope.Exceldata[i].SName == "" || $scope.Exceldata[i].SName == null || $scope.Exceldata[i].SName == undefined || $scope.Exceldata[i].SName == 'NULL') {
            //               alert('SName is required');
            //               return;
            //               break;
            //           }

            //       }
            ////   })
            //   $scope.ShowTableData = false;
            //   $scope.reload = false
            //   var type = 1;
            //   var uploadJson = PreExaminationService.UploadResultJson($scope.Exceldata);
            //   uploadJson.then(function (data) {
            //       console.log(data)
            //       //try {
            //       //    var data = JSON.parse(data);
            //       //    console.log(data)
            //       //    if (data.ResponceCode == '400') {
            //       //        alert('Data Already Inserted, Please check the downloaded Excel for more details')
            //       //        var location = data.ResponceDescription;
            //       //        window.location.href = location;

            //       //    }
            //       //} catch (err) { }
            //       var data = JSON.parse(data);
            //       if (data.Table[0].ResponceCode == '200') {
            //           $scope.reload = true;
            //           $('#upldfile').val(null);
            //           alert(data.Table[0].ResponceDescription)
            //       } else if (data.Table[0].ResponceCode == '400') {
            //           $scope.reload = true;
            //           alert(data.Table[0].ResponceDescription)
            //       }
            //       else {
            //           $scope.reload = true;
            //           $('#upldfile').val(null);
            //           alert('Something Went Wrong')
            //       }
            //       //$scope.tabledata;
            //   }, function (error) {
            //       $('#upldfile').val(null);
            //       $scope.reload = true;
            //       $scope.gentmetbl = false;
            //       $scope.ResultNotFound = true;
            //       $scope.Result = false;
            //       $scope.LoadImg = false;
            //   });
        }

        $scope.UploadWantingsExcel = function () {

            $scope.reload1 = true;

            $scope.Exceldat1 = $scope.Exceldata1[0]
            console.log($scope.Exceldat1);

            var filteredArray1 = [];

            $scope.Exceldat1.forEach(function (element) {
                var obj = { "Pin": element.Pin, "SubjectCode": element.SubjectCode, "Marks": element.Marks, "MaxMarks": element.MaxMarks }
                filteredArray1.push(obj)
            });

            var uploadJson = PreExaminationService.UploadWantingsJson($scope.Uploadmonthyear, $scope.UploadSelStudentType, $scope.UploadScheme1, $scope.UploadExamTypeId, 1, $scope.userName, filteredArray1);
            uploadJson.then(function (data) {

                var data = JSON.parse(data);
                if (data.Table[0].ResponceCode == '200') {
                    $scope.reload1 = false;
                    //$('#upldfile').val(null);
                    alert(data.Table[0].ResponceDescription)
                } else if (data.Table[0].ResponceCode == '400') {
                    $scope.reload1 = false;
                    alert(data.Table[0].ResponceDescription)
                }
                else {
                    $scope.reload1 = false;
                    //$('#upldfile').val(null);
                    alert('Something Went Wrong')
                }
                //$scope.tabledata;
            }, function (error) {
                $('#upldfile').val(null);
                $scope.reload1 = false;
                //$scope.gentmetbl = false;
                $scope.ResultNotFound = true;
                $scope.Result = false;
                $scope.LoadImg = false;
            });

        }

        $scope.upload = function () {

            console.log($scope.tabledata)
            var uploadExcl = PreExaminationService.uploadExcel($scope.myFile);


            uploadExcl.then(function (res) {
                if (res == '1') {

                }
            }, function (err) {
            })


        }
        $scope.init = function () {
            var i, j, column, cell;
            var records = [],
                record;
            var temp = $scope.XL_row_object;
            $scope.numRows = 10;
            $scope.numColumns = 20;


            for (i = 0; i < $scope.numRows; i++) {
                record = [];
                for (j = 0; j < $scope.numColumns; j++) {
                    cell = {
                        value: ''
                    }
                    record.push(cell);
                }
                records.push(record);
            }
            $scope.records = $scope.XL_row_object;

        }

        // $scope.init();

        var hideContextMenu = function () {
            $scope.isContextMenuVisible = false;
            if (!$rootScope.$$phase) {
                $rootScope.$apply();
            }
        };
        $scope.numRows = 0;
        $scope.numColumns = 0;

        $scope.isContextMenuVisible = false;
        $scope.contextmenuRowIndex = -1;
        $scope.contextmenuColumnIndex = -1
        $scope.openContextMenu = function ($event, rowIndex, columnIndex) {
            $event.preventDefault();

            if ($event.button === 0) {
                $scope.isContextMenuVisible = false;
                return;
            }

            $scope.contextmenuRowIndex = rowIndex;
            $scope.contextmenuColumnIndex = columnIndex;
            $scope.contextMenuStyle = {
                top: $event.clientY + 'px',
                left: $event.clientX + 'px'
            };
            $scope.isContextMenuVisible = true;
        };
        $scope.addRow = function () {
            var i,
                record,
                cell,
                index = $scope.contextmenuRowIndex;

            record = [];
            for (i = 0; i < $scope.numColumns; i++) {
                cell = {
                    value: 'New Cell'
                }
                record.push(cell);
            }

            $scope.records.splice(index, 0, record);
            $scope.isContextMenuVisible = false;
            $scope.numRows = $scope.records.length;
        };
        $scope.removeRow = function () {
            var index = $scope.contextmenuRowIndex;
            $scope.records.splice(index, 1);
            $scope.isContextMenuVisible = false;
            $scope.numRows = $scope.records.length;
        };
        $scope.addColumn = function () {
            var i, record;
            for (i = 0; i < $scope.records.length; i++) {
                record = $scope.records[i];
                record.splice($scope.contextmenuColumnIndex, 0, {
                    value: 'New Col'
                });
            }

            $scope.numColumns = record.length;
        };
        //var LoadActiveSchemes = AssessmentService.getSchemes(2);
        //LoadActiveSchemes.then(function (response) {
        //    $scope.ActiveSchemes = response;
        //},
        //    function (error) {
        //        alert("error while loading Schemes");
        //        var err = JSON.parse(error);
        //        console.log(err.Message);
        //    });

        //var LoadActiveSemesters = AssessmentService.getActiveSemester();
        //LoadActiveSemesters.then(function (response) {
        //    $scope.Semester = response.Table;
        //    //  console.log($scope.ActiveSemesters)
        //},
        //function (error) {
        //    alert("error while loading semesters");
        //    var err = JSON.parse(error);
        //    console.log(err.Message);
        //});






        //var LoadActiveSchemes = AssessmentService.getSchemes(2);
        //LoadActiveSchemes.then(function (response) {
        //    $scope.getActiveSchemes = response;
        //},
        //    function (error) {
        //        alert("error while loading Schemes");
        //        var err = JSON.parse(error);
        //        console.log(err.Message);
        //    });




        //var LoadActiveSemesters = AssessmentService.getActiveSemester();
        //LoadActiveSemesters.then(function (response) {
        //    $scope.sems = response.Table;
        //    //  console.log($scope.ActiveSemesters)
        //},
        //function (error) {
        //    alert("error while loading semesters");
        //    var err = JSON.parse(error);
        //    console.log(err.Message);
        //});


        $scope.Download = function () {

            var location = window.location.origin
            //console.log(location + '/Results/C18/C16C18SamapleFormate.xlsx');
            //window.location.replace('/Results/C18/C16C18SamapleFormate.xlsx');
            window.location.href = location + '/Results/RVRC_Sample_Format.xlsx';



        }
        $scope.removeColumn = function () {
            var i, record;
            for (i = 0; i < $scope.records.length; i++) {
                record = $scope.records[i];
                record.splice($scope.contextmenuColumnIndex, 1);
            }

            $scope.numColumns = record.length;
        };

        $document.bind('click', function ($evt) {
            var target = angular.element($evt.target).closest('table');
            if (target.length === 0)
                hideContextMenu();

        });




        //---- progress --------------

        var circles = $('.progress .circle');
        var currentCircle = circles.first();
        var previousCircle = $();

        (function () {
            currentCircle.addClass('active');
            previousCircle.removeClass('active').addClass('done');

            var bar = currentCircle.prev();
            bar.addClass('done');

            previousCircle = currentCircle;
            currentCircle = currentCircle.nextAll('.circle:first');

            if (previousCircle.length) {
                setTimeout(arguments.callee, 1000);
            }
        })();


    });
    app.directive('ngRightClick', function ($parse) {
        return function (scope, element, attrs) {
            var fn = $parse(attrs.ngRightClick);
            element.bind('contextmenu', function (event) {
                scope.$apply(function () {
                    event.preventDefault();
                    fn(scope, {
                        $event: event
                    });
                });
            });
        };

        //var SCHEMESEMINFO = StudentWiseService.GetSchemeDataForResults();
        //$scope.pin = "";
        //SCHEMESEMINFO.then(function (data) {
        //    if (data.length > 0) {

        //        $scope.Schemeinfo = data;

        //    }
        //}, function (error) {
        //    alert(error);00000000000000000000004
        //});
        $scope.validate = function () {
            $scope.getTable = true;
        }

    });


});

