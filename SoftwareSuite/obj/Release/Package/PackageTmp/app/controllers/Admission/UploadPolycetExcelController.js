define(['app'], function (app) {
    app.controller("UploadPolycetExcelController", function ($scope, $http, $localStorage, $rootScope, $state, $stateParams, $document, AppSettings, $timeout, PreExaminationService, AssessmentService, StudentWiseService) {

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

        $scope.DeployData = function () {
            alert()
            var uploadJson = PreExaminationService.DeployNicData($scope.AcademicYear1, $scope.AdmissionType1);
            uploadJson.then(function (res) {
                var data = JSON.parse(res);
                if (data[0].ResponceCode == '400') {
                    alert(data[0].ResponceDescription)
                    //alert('Data Already Inserted, Please check the downloaded Excel for more details')
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

                $scope.ResultNotFound = true;
                $scope.Result = false;
                $scope.LoadImg = false;
            });
        }

        $scope.DownloadExcel = function () {
            var getpdfTimeTableData = PreExaminationService.GetNICData();
            getpdfTimeTableData.then(function (data) {
                $scope.gentmetbl = false;
                var res = JSON.parse(data)
                if (res[0].ResponceCode =='200') {
                    
                        $scope.Result = true;
                    var location = res[0].file;
                   // console.log(location)
                        window.location.href = location;

                   
                } else {
                    alert("Data not Available");
                }
                $scope.ResultNotFound = false;
                $scope.ResultFound = false;
                $scope.LoadImg = false;


            }, function (error) {
                $scope.gentmetbl = false;
                $scope.ResultNotFound = true;
                $scope.Result = false;
                $scope.LoadImg = false;
            });
        }
       
       
        $scope.SampleData =[{"sbtet_code":"",
            "sbtet_branch_code":"",
            "Candidatename":"",
            "FatherName":"",
            "MotherName":"",
            "sex":"",
            "dob_date":"",
            "e_mail":"",
            "StudentContact":"",
            "SCHEME":"",
            "ActiveFlag":"",
            "AcademicYearId":"",
            "CategoryId":"",
            "TenthRollNo":"",
            "StudentRecided":"",
            "PolycetHallTicketNo":"",
            "ReligionId":"",
            "Region":"",
            "MinorityType":"",
            "PermanentAddress":"",
            "TempararyAddress":"",
            "HouseNo":"",
            "VillageorTown":"",
            "District":"",
            "Mandal":"",
            "IsPhysicallyHandicaped":"",
            "FatherAadhaarNo":"",
            "MotherAadhaarNo":"",
            "IsFatherGorthEmp":"",
            "Income":"",
            "IncomeStatusValidity":"",
            "IncomeCategory":"",
            "Occupation":"",
            "CasteNo":"",
            "CasteCertificateValidity":"",
            "Bank":"",
            "BankAccountNo":"",
            "IfscCode":"",
            "BankBranch":"",
            "mandal":"",
            "district":"",
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
                        var tempArray = ["CollegeCode", "BranchCode", "ShiftId", "StudentName", "FatherName", "MotherName", "Gender", "DateOfBirth",
                      "Email", "ParentContact", "StudentContact", "CastCategory",
                      "TenthRollNo", "TenthYear", "TenthBoard", "TenthHallTicketNo",
                      "PolycetHallTicketNo", "PermanentAddress", "TempararyAddress", "HouseNo",
                      "VillageorTown", "District", "Mandal", "Pincode",
                      "IsPhysicallyHandicaped", "Income", "Occupation", "CasteNo", "FeeExempted", "PolycetRank", "PolycetYear"];
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
                    console.log(ex);
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


        //-----end-----
        $scope.UploadExcel = function () {
            //for (let obj of $scope.SampleData) {
            ////console.log("object:", obj);
            //    for (let key in obj) {
            //        //console.log("      key:", key, "value:", obj[key]);
            //        for (let obj1 of $scope.JsonObj) {
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

            //        $scope.JsonObj.forEach(obj1 => {
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
            // for (i = 0; i < $scope.JsonObj.length; i++) {
            //     var JsonObj = $scope.JsonObj[i];
            //    }
            //}

            //angular.forEach($scope.SampleData, function (value1, key1) {
            //    angular.forEach($scope.JsonObj, function (value2, key2) {

            //        if (key1 == key2) {
            //            alert("All Keys Matched")
            //            // here is where you grab the value2.color
            //        } else {
            //            alert("Column Names Not Matched")
            //        }
            //    });
            //});
           
            //console.log($scope.JsonObj);
            //angular.forEach($scope.JsonObj, function (value, key) {

            $scope.JsonObj = $scope.Exceldata[0]
            //for (i = 0; i < $scope.JsonObj.length; i++) {
            //    if ($scope.JsonObj[i].collegecode == "" || $scope.JsonObj[i].collegecode == null || $scope.JsonObj[i].collegecode == undefined || $scope.JsonObj[i].collegecode == 'NULL') {
            //        alert('collegecode is required');
            //        return;
            //        break;
            //    }
            //    if ($scope.JsonObj[i].DateOfBIrth == "" || $scope.JsonObj[i].DateOfBIrth == null || $scope.JsonObj[i].DateOfBIrth == undefined || $scope.JsonObj[i].DateOfBIrth == 'NULL') {
            //        alert('DateOfBIrth is required');
            //        return;
            //        break;
            //    }
            //    if ($scope.JsonObj[i].FatherName == "" || $scope.JsonObj[i].FatherName == null || $scope.JsonObj[i].FatherName == undefined || $scope.JsonObj[i].FatherName == 'NULL') {
            //        alert('FatherName is required');
            //        return;
            //        break;
            //    }
            //    if ($scope.JsonObj[i].Gender == "" || $scope.JsonObj[i].Gender == null || $scope.JsonObj[i].Gender == undefined || $scope.JsonObj[i].Gender == 'NULL') {
            //        alert('Gender is required');
            //        return;
            //        break;
            //    }
            //    if ($scope.JsonObj[i].name == "" || $scope.JsonObj[i].name == null || $scope.JsonObj[i].name == undefined || $scope.JsonObj[i].name == 'NULL') {
            //        alert('name is required');
            //        return;
            //        break;
            //    }
            //    if ($scope.JsonObj[i].branch == "" || $scope.JsonObj[i].branch == null || $scope.JsonObj[i].branch == undefined || $scope.JsonObj[i].branch == 'NULL') {
            //        alert('branch is required');
            //        return;
            //        break;
            //    }
            //    if ($scope.JsonObj[i].EmailId == "" || $scope.JsonObj[i].EmailId == null || $scope.JsonObj[i].EmailId == undefined || $scope.JsonObj[i].EmailId == 'NULL') {
            //        alert('EmailId is required');
            //        return;
            //        break;
            //    }	
            //    if ($scope.JsonObj[i].MotherName == "" || $scope.JsonObj[i].MotherName == null || $scope.JsonObj[i].MotherName == undefined || $scope.JsonObj[i].MotherName == 'NULL') {
            //        alert('MotherName is required');
            //        return;
            //        break;
            //    }
            //    if ($scope.JsonObj[i].ParentContact == "" || $scope.JsonObj[i].ParentContact == null || $scope.JsonObj[i].ParentContact == undefined || $scope.JsonObj[i].ParentContact == 'NULL') {
            //        alert('ParentContact is required');
            //        return;
            //        break;
            //    }
            //    if ($scope.JsonObj[i].Scheme == "" || $scope.JsonObj[i].Scheme == null || $scope.JsonObj[i].Scheme == undefined || $scope.JsonObj[i].Scheme == 'NULL') {
            //        alert('Scheme is required');
            //        return;
            //        break;
            //    }
            //    if ($scope.JsonObj[i].shiftid == "" || $scope.JsonObj[i].shiftid == null || $scope.JsonObj[i].shiftid == undefined || $scope.JsonObj[i].shiftid == 'NULL') {
            //        alert('TenthYear is required');
            //        return;
            //        break;
            //    }
            //    if ($scope.JsonObj[i].StudentContact == "" || $scope.JsonObj[i].StudentContact == null || $scope.JsonObj[i].StudentContact == undefined || $scope.JsonObj[i].StudentContact == 'NULL') {
            //        alert('StudentContact is required');
            //        return;
            //        break;
            //    }
            //    if ($scope.JsonObj[i].TsEpass_Required == "" || $scope.JsonObj[i].TsEpass_Required == null || $scope.JsonObj[i].TsEpass_Required == undefined || $scope.JsonObj[i].TsEpass_Required == 'NULL') {
            //        alert('TsEpass_Required is required');
            //        return;
            //        break;
            //    }
            //    if ($scope.JsonObj[i].Category == "" || $scope.JsonObj[i].Category == null || $scope.JsonObj[i].Category == undefined || $scope.JsonObj[i].Category == 'NULL') {
            //        alert('Category is required');
            //        return;
            //        break;
            //    }
            //    if ($scope.JsonObj[i].Region == "" || $scope.JsonObj[i].Region == null || $scope.JsonObj[i].Region == undefined || $scope.JsonObj[i].Region == 'NULL') {
            //        alert('Region is required');
            //        return;
            //        break;
            //    }
            //    if ($scope.JsonObj[i].bank == "" || $scope.JsonObj[i].bank == null || $scope.JsonObj[i].bank == undefined || $scope.JsonObj[i].bank == 'NULL') {
            //        alert('bank is required');
            //        return;
            //        break;
            //    }
            //    if ($scope.JsonObj[i].bankaccountno == "" || $scope.JsonObj[i].bankaccountno == null || $scope.JsonObj[i].bankaccountno == undefined || $scope.JsonObj[i].bankaccountno == 'NULL') {
            //        alert('bankaccountno is required');
            //        return;
            //        break;
            //    }

            //    if ($scope.JsonObj[i].BankBranch == "" || $scope.JsonObj[i].BankBranch == null || $scope.JsonObj[i].BankBranch == undefined || $scope.JsonObj[i].BankBranch == 'NULL') {
            //        alert('BankBranch is required');
            //        return;
            //        break;
            //    }
            //    if ($scope.JsonObj[i].castecertificatevalidity == "" || $scope.JsonObj[i].castecertificatevalidity == null || $scope.JsonObj[i].castecertificatevalidity == undefined || $scope.JsonObj[i].castecertificatevalidity == 'NULL') {
            //        alert('castecertificatevalidity is required');
            //        return;
            //        break;
            //    }
            //    if ($scope.JsonObj[i].casteno == "" || $scope.JsonObj[i].casteno == null || $scope.JsonObj[i].casteno == undefined || $scope.JsonObj[i].casteno == 'NULL') {
            //        alert('casteno is required');
            //        return;
            //        break;
            //    }
            //    if ($scope.JsonObj[i].District == "" || $scope.JsonObj[i].District == null || $scope.JsonObj[i].District == undefined || $scope.JsonObj[i].District == 'NULL') {
            //        alert('District is required');
            //        return;
            //        break;
            //    }
            //    if ($scope.JsonObj[i].FatherAadhaarNo == "" || $scope.JsonObj[i].FatherAadhaarNo == null || $scope.JsonObj[i].FatherAadhaarNo == undefined || $scope.JsonObj[i].FatherAadhaarNo == 'NULL') {
            //        alert('FatherAadhaarNo is required');
            //        return;
            //        break;
            //    }
            //    if ($scope.JsonObj[i].HouseNo == "" || $scope.JsonObj[i].HouseNo == null || $scope.JsonObj[i].HouseNo == undefined || $scope.JsonObj[i].HouseNo == 'NULL') {
            //        alert('HouseNo is required');
            //        return;
            //        break;
            //    }
            //    if ($scope.JsonObj[i].ifscCode == "" || $scope.JsonObj[i].ifscCode == null || $scope.JsonObj[i].ifscCode == undefined || $scope.JsonObj[i].ifscCode == 'NULL') {
            //        alert('ifscCode is required');
            //        return;
            //        break;
            //    }
            //    if ($scope.JsonObj[i].Income == "" || $scope.JsonObj[i].Income == null || $scope.JsonObj[i].Income == undefined || $scope.JsonObj[i].Income == 'NULL') {
            //        alert('Income is required');
            //        return;
            //        break;
            //    }
            //    if ($scope.JsonObj[i].IncomeCategory == "" || $scope.JsonObj[i].IncomeCategory == null || $scope.JsonObj[i].IncomeCategory == undefined || $scope.JsonObj[i].IncomeCategory == 'NULL') {
            //        alert('IncomeCategory is required');
            //        return;
            //        break;
            //    }
            //    if ($scope.JsonObj[i].IncomeStatusValidity == "" || $scope.JsonObj[i].IncomeStatusValidity == null || $scope.JsonObj[i].IncomeStatusValidity == undefined || $scope.JsonObj[i].IncomeStatusValidity == 'NULL') {
            //        alert('IncomeStatusValidity is required');
            //        return;
            //        break;
            //    }
            //    if ($scope.JsonObj[i].IsFatherGorthEmp == "" || $scope.JsonObj[i].IsFatherGorthEmp == null || $scope.JsonObj[i].IsFatherGorthEmp == undefined || $scope.JsonObj[i].IsFatherGorthEmp == 'NULL') {
            //        alert('IsFatherGorthEmp is required');
            //        return;
            //        break;
            //    }
            //    if ($scope.JsonObj[i].IsPhysicallyHandicaped == "" || $scope.JsonObj[i].IsPhysicallyHandicaped == null || $scope.JsonObj[i].IsPhysicallyHandicaped == undefined || $scope.JsonObj[i].IsPhysicallyHandicaped == 'NULL') {
            //        alert('IsPhysicallyHandicaped is required');
            //        return;
            //        break;
            //    }
            //    if ($scope.JsonObj[i].Mandal == "" || $scope.JsonObj[i].Mandal == null || $scope.JsonObj[i].Mandal == undefined || $scope.JsonObj[i].Mandal == 'NULL') {
            //        alert('Mandal is required');
            //        return;
            //        break;
            //    }
            //    if ($scope.JsonObj[i].MinorityType == "" || $scope.JsonObj[i].MinorityType == null || $scope.JsonObj[i].MinorityType == undefined || $scope.JsonObj[i].MinorityType == 'NULL') {
            //        alert('MinorityType is required');
            //        return;
            //        break;
            //    }
            //    if ($scope.JsonObj[i].MotherAadhaarNo == "" || $scope.JsonObj[i].MotherAadhaarNo == null || $scope.JsonObj[i].MotherAadhaarNo == undefined || $scope.JsonObj[i].MotherAadhaarNo == 'NULL') {
            //        alert('MotherAadhaarNo is required');
            //        return;
            //        break;
            //    }
            //    if ($scope.JsonObj[i].Occupation == "" || $scope.JsonObj[i].Occupation == null || $scope.JsonObj[i].Occupation == undefined || $scope.JsonObj[i].Occupation == 'NULL') {
            //        alert('Occupation is required');
            //        return;
            //        break;
            //    }
            //    if ($scope.JsonObj[i].PermanentAddress == "" || $scope.JsonObj[i].PermanentAddress == null || $scope.JsonObj[i].PermanentAddress == undefined || $scope.JsonObj[i].PermanentAddress == 'NULL') {
            //        alert('PermanentAddress is required');
            //        return;
            //        break;
            //    }
            //    if ($scope.JsonObj[i].Pincode == "" || $scope.JsonObj[i].Pincode == null || $scope.JsonObj[i].Pincode == undefined || $scope.JsonObj[i].Pincode == 'NULL') {
            //        alert('Pincode is required');
            //        return;
            //        break;
            //    }
            //    if ($scope.JsonObj[i].PolycetHallTicketNo == "" || $scope.JsonObj[i].PolycetHallTicketNo == null || $scope.JsonObj[i].PolycetHallTicketNo == undefined || $scope.JsonObj[i].PolycetHallTicketNo == 'NULL') {
            //        alert('PolycetHallTicketNo is required');
            //        return;
            //        break;
            //    }
            //    if ($scope.JsonObj[i].Religion == "" || $scope.JsonObj[i].Religion == null || $scope.JsonObj[i].Religion == undefined || $scope.JsonObj[i].Religion == 'NULL') {
            //        alert('Religion is required');
            //        return;
            //        break;
            //    }
            //    if ($scope.JsonObj[i].SpecialCategory == "" || $scope.JsonObj[i].SpecialCategory == null || $scope.JsonObj[i].SpecialCategory == undefined || $scope.JsonObj[i].SpecialCategory == 'NULL') {
            //        alert('SpecialCategory is required');
            //        return;
            //        break;
            //    }
            //    if ($scope.JsonObj[i].StudentRecided == "" || $scope.JsonObj[i].StudentRecided == null || $scope.JsonObj[i].StudentRecided == undefined || $scope.JsonObj[i].StudentRecided == 'NULL') {
            //        alert('StudentRecided is required');
            //        return;
            //        break;
            //    }
            //    if ($scope.JsonObj[i].TempararyAddress == "" || $scope.JsonObj[i].TempararyAddress == null || $scope.JsonObj[i].TempararyAddress == undefined || $scope.JsonObj[i].TempararyAddress == 'NULL') {
            //        alert('TempararyAddress is required');
            //        return;
            //        break;
            //    }
            //    if ($scope.JsonObj[i].TenthBoard == "" || $scope.JsonObj[i].TenthBoard == null || $scope.JsonObj[i].TenthBoard == undefined || $scope.JsonObj[i].TenthBoard == 'NULL') {
            //        alert('TenthBoard is required');
            //        return;
            //        break;
            //    }
            //    if ($scope.JsonObj[i].TenthHallTicketNo == "" || $scope.JsonObj[i].TenthHallTicketNo == null || $scope.JsonObj[i].TenthHallTicketNo == undefined || $scope.JsonObj[i].TenthHallTicketNo == 'NULL') {
            //        alert('TenthHallTicketNo is required');
            //        return;
            //        break;
            //    }
            //    if ($scope.JsonObj[i].TenthRollNo == "" || $scope.JsonObj[i].TenthRollNo == null || $scope.JsonObj[i].TenthRollNo == undefined || $scope.JsonObj[i].TenthRollNo == 'NULL') {
            //        alert('TenthRollNo is required');
            //        return;
            //        break;
            //    }
            //    if ($scope.JsonObj[i].TenthYear == "" || $scope.JsonObj[i].TenthYear == null || $scope.JsonObj[i].TenthYear == undefined || $scope.JsonObj[i].TenthYear == 'NULL') {
            //        alert('TenthYear is required');
            //        return;
            //        break;
            //    }
            //    if ($scope.JsonObj[i].VillageorTown == "" || $scope.JsonObj[i].VillageorTown == null || $scope.JsonObj[i].VillageorTown == undefined || $scope.JsonObj[i].VillageorTown == 'NULL') {
            //        alert('VillageorTown is required');
            //        return;
            //        break;
            //    }
               
            //}
            if ($scope.AcademicYear == null || $scope.AcademicYear == "" || $scope.AcademicYear == undefined) {
                alert("Please Select Academic Year.")
                return
            }
            if ($scope.AdmissionType == null || $scope.AdmissionType == "" || $scope.AdmissionType == undefined) {
                alert("Please Select Admission Type.")
                return
            }
            //if ($scope.JsonObj.length > 0) {
            //    alert("Please Upload Excel.")
            //    return
            //}
            $scope.reload = true;
            var type = 1;
            var uploadJson = PreExaminationService.uploadJsonExcel($scope.AcademicYear, $scope.AdmissionType,$scope.JsonObj);
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
                        console.log(data)
                        var location = data[0].file;
                        window.location.href = location;

                    }else if (data[0].ResponceCode == '200') {
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
            window.location.href = location + '/Results/polycet_Sample_Format.xlsx';



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


});

