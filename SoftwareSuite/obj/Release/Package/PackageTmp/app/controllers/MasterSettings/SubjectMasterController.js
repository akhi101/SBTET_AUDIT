define(['app'], function (app) {
    app.controller("SubjectMasterController", function ($scope, $http, $localStorage, $state, $location, $window, $stateParams, $uibModal, AppSettings, PreExaminationService, MasterSettingsService, Excel, $timeout) {
        $scope.ResultNotFound = false;
        $scope.LoadImg = false;
        $scope.ResultFound = false;
      
        $scope.Values = [{
            "Id": 1,
            "Name": "True"
        },
        {
            "Id": 0,
            "Name": "False"
        }
        ];
        $scope.Booldata = [{
            "val": true,
            "Name": "YES"
        },
        {
            "val": false,
            "Name": "NO"
        }
        ];
        var data = {};
        $scope.$emit('showLoading', data);


        var GetScheme = PreExaminationService.GetScheme()
        GetScheme.then(function (response) {
            //   try { var response = JSON.parse(response) } catch (err) { }

            $scope.schemeInfo = response.Table;

        },
            function (error) {
                console.log("something Went Wrong");
            });
        $scope.EditSubjectMasterData = function () {
         
            $scope.ResultNotFound = false;
            $scope.LoadImg = false;
            $scope.ResultFound = false;
            $scope.StuSSCdata = {};
            $scope.modalInstance = $uibModal.open({
                templateUrl: "/app/views/MasterSettings/SubjectMasterEditPopup.html",
                size: 'xlg',
                scope: $scope,
                windowClass: 'modal-fit-att',
                //backdrop: 'static',
            });

         

         

        }

        $scope.closeModal = function () {
            $scope.modalInstance.close();
        };

        $scope.GetSubjectMasterDetails = function (scheme, SubjectCode) {
            if (scheme == null || scheme == '' || scheme == undefined) {
                alert('Select Scheme.');
                return
            }
            if (SubjectCode == '' || SubjectCode == null) {
                alert('Enter Subject Code.');
                return;
            }
            $scope.ResultNotFound1 = false;
            $scope.LoadImg1 = true;
            $scope.ResultFound1 = false;
            var GetSubjectMasterDetails = PreExaminationService.GetSubjectMasterDetails(scheme, SubjectCode)
            GetSubjectMasterDetails.then(function (response) {
                if (response.Table.length > 0) {
                    $scope.subjectListPopup = response.Table;
                    for (var j = 1; j < response.Table.length + 1; j++) {
                        $scope['edit' + j] = true;
                    }
                    $scope.ResultNotFound1 = false;
                    $scope.LoadImg1 = false;
                    $scope.ResultFound1 = true;
                } else {
                    $scope.subjectListPopup = [];
                    // $scope.Examtypes = [];
                    $scope.ResultNotFound1 = true;
                    $scope.LoadImg1 = false;
                    $scope.ResultFound1 = false;
                }

            },
                function (error) {
                    $scope.subjectListPopup = [];
                    $scope.ResultNotFound1 = true;
                    $scope.LoadImg1 = false;
                    $scope.ResultFound1 = false;
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


            var UpdateSubjectMasterDetails = PreExaminationService.UpdateSubjectMasterDetails(data.SubId, data.Subject_Code, data.SubjectName, data.iselective, data.BoardQuestionPaper, data.AnswerBookLet, data.Mid1Max_Marks,
                data.Mid2Max_Marks, data.Mid3Max_Marks, data.InternalMax_Marks, data.end_exam_max_marks, data.Credits, data.PCode)
            UpdateSubjectMasterDetails.then(function (response) {
                try { var response = JSON.parse(response) } catch (err) { }
                if (response.Table[0].ResponceCode == '200') {
                    alert(response.Table[0].ResponceDescription);

                } else {
                    alert('Something Went Wrong')

                }
            },
                function (error) {
                    alert("something Went Wrong")


                });
        }

        var loadData2 = MasterSettingsService.getSubjectList1()
        loadData2.then(function (response) {
            if (response.Table.length > 0) {
                $scope.$emit('hideLoading', data);
                $scope.subjectList = response.Table;
               
                $scope.loading = false;
                $scope.Data1 = true;
            } else {
                // $scope.Examtypes = [];
                $scope.$emit('hideLoading', data);
                $scope.loading = false;
                $scope.Data1 = false

                alert("No Data Found");
            }

        },
            function (error) {
                $scope.$emit('hideLoading', data);
                $scope.loading = false;
                $scope.Data = false;
                alert("error while loading Semesters");
                var err = JSON.parse(error);
                console.log(err.Message);
            });
        $scope.DownloadtoExcel = function (tableid) {
            var loadData1 = MasterSettingsService.getSubjectList()
            loadData1.then(function (data) {
                //var data = JSON.parse(response)
                if (data.length > 4) {
                    $scope.Result = true;
                    var location = data;
                    window.location.href = location;

                } else {
                    alert("Subject Master not Found");
                }

                //$scope.ResultNotFound = false;
                //$scope.ResultFound = false;
                $scope.LoadImg = false;


            }, function (error) {
                $scope.gentmetbl = false;
                $scope.ResultNotFound = true;
                $scope.Result = false;
                $scope.LoadImg = false;
            });
        }

        $scope.DownloadFirstExcel = function (tableid) {

            var exportHref = Excel.tableToExcel(tableid, 'stdentDetails');
            $timeout(function () {
                var a = document.createElement('a');
                a.href = exportHref;
                a.remove();
                a.download = "SubjectMaster.xls";
                document.body.appendChild(a);
                a.click();
                a.remove();
            }, 100);
        }

        //$scope.DownloadtoExcel = function (tableid) {

        //    var exportHref = Excel.tableToExcel(tableid, 'stdentDetails');
        //    $timeout(function () {
        //        var a = document.createElement('a');
        //        a.href = exportHref;
        //        a.remove();
        //        a.download = "SubjectMaster.xls";
        //        document.body.appendChild(a);
        //        a.click();
        //        a.remove();
        //    }, 100);
        //}

        $scope.GetTanatlizationReport = function () {
            var getActiveList = MasterSettingsService.getTantalizationReport();
            getActiveList.then(function (data) {
                if (data.length > 0) {
                    if (data.length > 4) {
                        $scope.LoadImg = false;
                        $scope.Result = true;
                        var location = data;
                        window.location.href = location;

                    } else {
                        $scope.LoadImg = false;
                        alert("No Data Found");
                    }
                } else {
                    $scope.LoadImg = false;
                    alert("No Data Found");
                }
                //$scope.ResultNotFound = false;
                //$scope.ResultFound = false;



            }, function (error) {
                alert("Something Went Wrong");
                $scope.gentmetbl = false;
                $scope.ResultNotFound = true;
                $scope.Result = false;
                $scope.LoadImg = false;
            });
        }

        $scope.Add = true;
        $scope.Update = false;
        $scope.GetData = function () {
            if ($scope.SchemeId == '' || $scope.SchemeId == null || $scope.SchemeId == undefined) {
                alert('Select Scheme')
                return
            }
            if ($scope.BranchId == '' || $scope.BranchId == null || $scope.BranchId == undefined) {
                alert('Select Branch')
                return
            }
            if ($scope.SemId == '' || $scope.SemId == null || $scope.SemId == undefined) {
                alert('Select Semester')
                return
            }
            var GetSubjectsData = MasterSettingsService.GetMasterSubjects($scope.SchemeId, $scope.BranchId, $scope.SemId);
            GetSubjectsData.then(function (response) {
                $scope.SubjectsLists = response;
                if ($scope.SubjectsLists.length > 0) {
                    $scope.SubjectsLists = response;
                    $scope.Data = true;
                    $scope.NoDataFound = false;
                } else {
                    $scope.Data = false;
                    $scope.NoDataFound = true;
                }
            },
            function (error) {
                //$scope.$emit('hideLoading', data);
                $scope.Data = false;
                $scope.NoDataFound = true;
                alert("Something Went Wrong")

            });
        }
        $scope.Save = function (datatype) {
            var DataTypeId = datatype;

            var SetSubjectsData = MasterSettingsService.AddSubjects(DataTypeId, $scope.SubData.Subject_Code, $scope.SubData.SubjectName, $scope.SubData.Mid1Max_Marks,
                        $scope.SubData.Mid2Max_Marks, $scope.SubData.InternalMax_Marks,
                         $scope.SubData.Credits, $scope.SubData.subtype, $scope.SubData.semid, $scope.SubData.end_exam_max_marks,
             $scope.SubData.iselective, $scope.SubData.schemeid, $scope.SubData.branchid, $scope.SubData.PCode, $scope.SubData.BoardQuestionPaper,
                            $scope.SubData.ElectiveSet, $scope.SubData.Mid3Max_Marks, $scope.SubData.subid);
            SetSubjectsData.then(function (response) {
                if (response[0].ResponceCode == '200') {
                    alert(response[0].ResponceDescription)
                    DataTypeId = ' ';
                    $scope.SubData.Subject_Code = ' ';
                    $scope.SubData.SubjectName = ' ';
                    $scope.SubData.Mid1Max_Marks = ' ';
                    $scope.SubData.Mid2Max_Marks = ' ';
                    $scope.SubData.InternalMax_Marks = ' ';
                    $scope.SubData.Credits = ' ';
                    $scope.SubData.subtype = ' ';
                    $scope.SubData.semid = ' ';
                    $scope.SubData.end_exam_max_marks = ' ';
                    $scope.SubData.iselective = ' ';
                    $scope.SubData.schemeid = ' ';
                    $scope.SubData.branchid = ' ';
                    $scope.SubData.PCode = ' ';
                    $scope.SubData.BoardQuestionPaper = ' ';
                    $scope.SubData.ElectiveSet = ' ';
                    $scope.SubData.Mid3Max_Marks = ' ';
                    $scope.SubData.subid = '';
                    if (DataTypeId == 1) {
                        $scope.Add = true;
                        $scope.Update = false;
                    } else {
                        $scope.Add = true;
                        $scope.Update = false;
                    }
                } else {
                    alert('Something went wrong')
                }
            },
        function (error) {
            //$scope.$emit('hideLoading', data);
            alert("Something Went Wrong")

        });

        }

        $scope.ChangeBranch = function (BranchCode) {
            alert(BranchCode)
            $scope.SubData.Branch_Code = BranchCode
        }

        //var GetSemData = MasterSettingsService.GetSemester();
        //GetSemData.then(function (response) {
        //    //$scope.$emit('hideLoading', data);
        //    $scope.GetSemesters = response.Table;
        //    //console.log($scope.SubjectsList)
        //},
        //function (error) {
        //    //$scope.$emit('hideLoading', data);
        //    alert("Something Went Wrong")

        //});

        //var GetSubTypes = MasterSettingsService.GetSubjectTypes();
        //GetSubTypes.then(function (response) {
        //    //$scope.$emit('hideLoading', data);
        //    $scope.GetSubjectTypes = response.Table;
        //    //console.log($scope.SubjectsList)
        //},
        //function (error) {
        //    //$scope.$emit('hideLoading', data);
        //    alert("Something Went Wrong")

        //});

        //var GetBranchsData = MasterSettingsService.GetBranchs();
        //GetBranchsData.then(function (response) {
        //    //$scope.$emit('hideLoading', data);
        //    $scope.GetBranchs = response.Table;
        //    //console.log($scope.SubjectsList)
        //},
        //function (error) {
        //    //$scope.$emit('hideLoading', data);
        //    alert("Something Went Wrong")

        //});

        //var GetSchemesData = MasterSettingsService.getSchemes();
        //GetSchemesData.then(function (response) {
        //    //$scope.$emit('hideLoading', data);
        //    $scope.GetSchemes = response.Table;
        //    //console.log($scope.SubjectsList)
        //},
        //function (error) {
        //    //$scope.$emit('hideLoading', data);
        //    alert("Something Went Wrong")

        //});

        $scope.DeleteSub = function (subid) {
            var delSub = MasterSettingsService.DeleteSubject(subid);
            delSub.then(function (response) {
                if (response[0].ResponceCode == '200') {
                    alert(response[0].ResponceDescription)
                    //$scope.GetData()
                } else {
                    alert('Something went wrong')
                }
            }, function (error) {
                alert("Something Went Wrong")

            });

        }
        $scope.Edit = function (SubCode, SubId) {
            window.scrollTo(0, 0);
            //window.scrollBy({
            //    top: 10, // could be negative value
            //    left: 0,
            //    behavior: 'smooth'
            //});
            //var Puropse = $scope.Puropse;
            //$scope.Update = true;
            //$scope.Add = false;
            var EditData = MasterSettingsService.EditSubject(SubCode, SubId)
            EditData.then(function (response) {
                $scope.SubData = response[0];
                $scope.Add = false;
                $scope.Update = true;
            },
                function (error) {
                    alert("edit is not wroking");
                    var err = JSON.parse(error);
                    console.log(err.Message);

                });
        }
    })
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

})