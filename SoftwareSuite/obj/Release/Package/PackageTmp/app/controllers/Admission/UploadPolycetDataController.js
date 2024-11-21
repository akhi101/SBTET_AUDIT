define(['app'], function (app) {
    app.controller("UploadPolycetDataController", function ($scope, $http, $localStorage, $rootScope, $state, $stateParams, $document, AppSettings, $timeout, Excel, PreExaminationService, AssessmentService, StudentWiseService) {
        $scope.loading = false;
        var reload = false;
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



        $scope.GetTable = false;

        var getAdmissionTypes = PreExaminationService.GetAdmissionTypes();
        getAdmissionTypes.then(function (res) {
            //var res = JSON.parse(res);
            $scope.GetAdmissionTypes = res.Table;
        }, function (err) {
            $scope.LoadImg = false;
            alert("Error while loading Admission Types");
        });

        $scope.Submit = function () {
            $scope.loading = true;
            $scope.Data = false;
            $scope.NoData=false
            var PolycetExamCenters = PreExaminationService.GetPolycetExamCenters($scope.PolycetAcademicYear);
            PolycetExamCenters.then(function (response) {
                if (response.length > 0) {
                    $scope.loading = false;
                    $scope.Data = true;
                    $scope.NoData = false
                    $scope.getPolycetExamCenters = response;
                } else {
                    $scope.getPolycetExamCenters = [];
                    $scope.loading = false;
                    $scope.Data = false;
                    $scope.NoData = true;
                    alert("No Data found on selected Polycet Year.");
                }
            },
                function (error) {
                    $scope.loading = false;
                    $scope.Data = false;
                    $scope.NoData = true;
                    $scope.getPolycetExamCenters = [];
                    alert("No Data found on selected Polycet Year.");                  
                });
        }

        var PolycetAcademicYears = PreExaminationService.GetPolycetAcademicYear();
        PolycetAcademicYears.then(function (response) {
            if (response.Table.length > 0) {
                $scope.GetPolycetAcademicYears = response.Table;
            } else {
                $scope.GetPolycetAcademicYears = [];
                alert("No Academic Years Found");
            }
        },
            function (error) {
                $scope.GetPolycetAcademicYears = [];
                alert("error while loading Academic Years");
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
        $scope.$watch('myFile', function (newFileObj) {
            if (newFileObj) {
                $scope.filename = newFileObj.name;
                $scope.FileContains = true;
            }
        });
        $scope.tabledata = [];
        // reading excel data
        $scope.tabledata = [];
        $scope.Exceldata = [];


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
                        var tempArray = ["rollNo", "candidatename", "ecentrecode", "ecentrename"];
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
                                document.getElementById("myCheck").click();
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


        $scope.DownloadtoExcel = function (tableid) {

            var loadData1 = PreExaminationService.GetPolycetExamCentersExcel($scope.PolycetAcademicYear)
            loadData1.then(function (res) {
                var data = JSON.parse(res)
                if (data[0].ResponceCode == '200') {
                    $scope.Noresult = false
                    $scope.loading = false;
                    var location = data[0].file;
                    window.location.href = location;

                } else
                    if (data[0].ResponceCode == '400') {
                        $scope.Noresult = true
                        $scope.loading = false;
                        alert("Error while loading data");
                    }
                    else {
                        $scope.Noresult = true
                        $scope.loading = false;
                        alert('Something Went Wrong')
                    }

            }, function (error) {
                $scope.Noresult = true
                $scope.loading = false;
            });
        }

        //-----end-----
        $scope.UploadExcel = function () {
           
            if ($scope.PolycetUploadAcademicYear == null || $scope.PolycetUploadAcademicYear == "" || $scope.PolycetUploadAcademicYear == undefined) {
                alert("Please Select Polycet Year.")
                return
            }
            //if ($scope.AdmissionType == null || $scope.AdmissionType == "" || $scope.AdmissionType == undefined) {
            //    alert("Please Select Admission Type.")
            //    return
            //}
            //if ($scope.JsonObj.length > 0) {zz .,
            //    alert("Please Upload Excel.")
            //    return
            //}
            $scope.reload = true;
            var type = 1;
            var uploadJson = PreExaminationService.UploadPolycetData($scope.PolycetUploadAcademicYear,$scope.JsonObj);
            uploadJson.then(function (res) {
                var data = JSON.parse(res);
                if (data[0].ResponceCode == '400') {
                    alert(data[0].ResponceDescription)
                    //alert('Data Already Inserted, Please check the downloaded Excel for more details')
                    $scope.reload = false;
                    $('#upldfile').val(null);
                    $('#File').val(null);
                    $scope.filename = '';
                    $scope.myFile = '';
                   
                    var location = data[0].file;
                    window.location.href = location;

                } else if (data[0].ResponceCode == '200') {
                    alert(data[0].ResponceDescription)
                    $scope.reload = false;
                    $('#upldfile').val(null);
                    $('#File').val(null);
                    $scope.filename = '';
                    $scope.myFile = '';
                }
                else {
                    $scope.reload = false;
                    $('#upldfile').val(null);
                    $('#File').val(null);
                    $scope.filename = '';
                    $scope.myFile = '';
                    alert('Something Went Wrong')
                }
                //$scope.tabledata;
            }, function (error) {
                $scope.reload = false;
                $('#upldfile').val(null);
                $('#File').val(null);
                $scope.filename = '';
                $scope.myFile = '';
                $scope.gentmetbl = false;
                $scope.ResultNotFound = true;
                $scope.Result = false;
                $scope.LoadImg = false;
            });
        }
        $scope.upload = function () {

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
            window.location.href = location + '/Results/Exam_Centers_Sample.xlsx';



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

        //        $scope.schemeinfo = data;

        //    }
        //}, function (error) {
        //    alert(error);00000000000000000000004
        //});
        $scope.validate = function () {
            $scope.getTable = true;
        }

    });


    app.factory('Excel', function ($window) {
        //alert("hello");
        var uri = 'data:application/vnd.ms-excel;base64,',
            template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
            base64 = function (s) { return $window.btoa(unescape(encodeURIComponent(s))); },
            format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) };
        return {
            tableToExcel: function (tableId, worksheetName) {
                var table = $(tableId);
                ctx = { worksheet: worksheetName, table: table.html() },
                    href = uri + base64(format(template, ctx));
                return href;
            }
        };
    });

});

