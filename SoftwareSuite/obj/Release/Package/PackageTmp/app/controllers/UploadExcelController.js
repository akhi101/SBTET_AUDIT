define(['app'], function (app) {
    app.controller("UploadExcelController", function ($scope, $http, $localStorage, $rootScope, $state, $stateParams, $document, AppSettings, $timeout, PreExaminationService, AssessmentService, StudentWiseService) {

        var reload = true;
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
      
        $scope.FileContains = false;
        $scope.$watch('myFile', function (newFileObj) {
            if (newFileObj) {
                $scope.filename = newFileObj.name;
                $scope.FileContains = true;
            }
        });
        $scope.tabledata = [];
        // reading excel data
        $scope.openExcel = function () {
           
          
            $scope.tabledata = [];
            var reader = new FileReader();
            reader.readAsBinaryString($scope.myFile);
            reader.onload = function(e) {
                var data = e.target.result;
                var workbook = XLSX.read(data, {
                    type: 'binary',
              
      
                });

                workbook.SheetNames.forEach(function (sheetName) {

                   
                    // Here is your object
                    $scope.tabledata = [];
                    $scope.XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                    var json_object = JSON.stringify($scope.XL_row_object);
                
                    if ($scope.XL_row_object.length > 0) {
                        var data = {};

                     
                        $scope.tabledata.push({ rows: $scope.XL_row_object, cols: Object.keys($scope.XL_row_object[0]) });
                        console.log($scope.tabledata)
                        $scope.reload = false;
                        //$scope.$emit('showLoading', data);
                        document.getElementById("myCheck").click();
                      
                      
                    
                    } else {

                     
                    }

                });

                
                
            };

            reader.onerror = function(ex) {
                console.log(ex);
            };
           
            $scope.init();
         
            };     

        //-----end-----
        $scope.UploadExcel = function () {
          
            console.log($scope.myFile);
            var type = 1;
            var uploadJson = PreExaminationService.uploadJsonData($scope.XL_row_object,type);
            //$scope.tabledata;
            
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
            var records =[],
                record;
            var temp = $scope.XL_row_object;
            $scope.numRows = 10;
            $scope.numColumns = 20;


                for (i = 0; i < $scope.numRows; i++) {
                    record =[];
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
                    top : $event.clientY + 'px',
                    left : $event.clientX + 'px'
            };
            $scope.isContextMenuVisible = true;
        };
        $scope.addRow = function () {
            var i,
                record,
                cell,
                index = $scope.contextmenuRowIndex;

            record =[];
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
        var LoadActiveSchemes = AssessmentService.getSchemes(2);
        LoadActiveSchemes.then(function (response) {
            $scope.ActiveSchemes = response;
        },
            function (error) {
                alert("error while loading Schemes");
                var err = JSON.parse(error);
                console.log(err.Message);
            });

        var LoadActiveSemesters = AssessmentService.getActiveSemester();
        LoadActiveSemesters.then(function (response) {
            $scope.Semester = response.Table;
            //  console.log($scope.ActiveSemesters)
        },
        function (error) {
            alert("error while loading semesters");
            var err = JSON.parse(error);
            console.log(err.Message);
        });






      var LoadActiveSchemes = AssessmentService.getSchemes(2);
        LoadActiveSchemes.then(function (response) {
            $scope.getActiveSchemes = response;
        },
            function (error) {
                alert("error while loading Schemes");
                var err = JSON.parse(error);
                console.log(err.Message);
        });




        var LoadActiveSemesters = AssessmentService.getActiveSemester();
        LoadActiveSemesters.then(function (response) {
            $scope.sems = response.Table;
            //  console.log($scope.ActiveSemesters)
        },
        function (error) {
            alert("error while loading semesters");
            var err = JSON.parse(error);
            console.log(err.Message);
        });

   
        $scope.Download = function () {

                var location = window.location.origin
            //console.log(location + '/Results/C18/C16C18SamapleFormate.xlsx');
            //window.location.replace('/Results/C18/C16C18SamapleFormate.xlsx');
                window.location.href = location + '/Results/C18/C18 Sample Formate.xlsx';



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
        }) ();


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
        //    alert(error);
        //});
        $scope.validate = function () {
            $scope.getTable = true;
}
        
    });

  
});

