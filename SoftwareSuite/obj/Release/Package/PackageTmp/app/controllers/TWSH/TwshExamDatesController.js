define(['app'], function (app) {
    app.controller("TwshExamDatesController", function ($scope, $http, $timeout, $localStorage, $state, $stateParams, AppSettings, TwshStudentRegService) {
       
      
        $scope.ExamBatches = [{ Id: 1, Batch: 1 }, { Id: 2, Batch: 2 }, { Id: 3, Batch: 3 }, { Id: 4, Batch: 4 }];

        const $ctrl = this;
        $ctrl.$onInit = () => {
            $scope.GetExamBatchesList();
          
        }
        
        var courses = TwshStudentRegService.getCourses();
        courses.then(function (response) {
          
            if (response.length > 0) {

                $scope.getCourses = response;

            } else {
             
                $scope.loading = false;
                $scope.Data = false;
            }
        },
    function (error) {
        $scope.Data = false;
        $scope.loading = false;
      

    });

        $scope.EditTwshDate = function (data, ind) {

            var ele1 = document.getElementsByClassName("enabletable" + ind);
            for (var j = 0; j < ele1.length; j++) {
                ele1[j].style['pointer-events'] = "auto";
                ele1[j].style.border = "1px solid #ddd";
            }
            $scope['edit' + ind] = false;

        }

     
        $scope.GetExamBatchesList = function () {
            $scope.loading = true;
            $scope.array = [];
            var ExamDates = TwshStudentRegService.GetTwshExamDatesBatches();
            ExamDates.then(function (response) {
             
                if (response.length > 0) {
                    $scope.loading = false;

                    for (var j = 1; j < response.length + 1; j++) {

                        $scope['edit' + j] = true;
                        $scope.edit = false
                    }

                    $scope.GetTwshExamDatesBatches = response;

                } else {
                 
                    $scope.loading = false;
                    $scope.Data = false;
                }
            },
        function (error) {
            $scope.Data = false;
            $scope.loading = false;        

        });
        }
        $scope.Cancel = function (ind) {
            $scope['edit' + ind] = true;

            var ele2 = document.getElementsByClassName("enabletable" + ind);
            for (var j = 0; j < ele2.length; j++) {
                ele2[j].style['pointer-events'] = "none";
                ele2[j].style.border = "0";
            }
        }

        $scope.UpdateTwshDate = function (data, ind) {
            $scope['edit' + ind] = true;

            var ele2 = document.getElementsByClassName("enabletable" + ind);
            for (var j = 0; j < ele2.length; j++) {
                ele2[j].style['pointer-events'] = "none";
                ele2[j].style.border = "0";
            }
           
            var SetSemester = TwshStudentRegService.UpdateTwshExamDates(data.ExamDate, data.ExamMonthYearId, data.CourseId, data.BatchNumber, data.BatchId, data.ExamDateId)
            SetSemester.then(function (response) {
                var response = JSON.parse(response)
                if (response[0].ResponseCode == '200') {
                    alert(response[0].ResponseDescription)
                    $scope.GetExamBatchesList();
                } else if (response[0].ResponseCode == '400') {
                    alert(response[0].ResponseDescription);
                    $scope.GetExamBatchesList();
                } else {
                    alert('Something Went Wrong')
                }
            },
                function (error) {
                    alert("something Went Wrong")


                });

        }

        var Batches = TwshStudentRegService.GetBatches();
        Batches.then(function (response) {
         
            if (response.length > 0) {

                $scope.GetBatches = response;

            } else {
                alert("No Data Found")
                $scope.loading = false;
                $scope.Data = false;
            }
        },
    function (error) {
        $scope.Data = false;
        $scope.loading = false;
        alert("error while loading Exam Month Year");

    });
        

        $scope.ChangeCourse = function (data) {
            var res = JSON.parse(data)
            $scope.CourseId = res.Id
            $scope.Course= res.CourseName
       
        }
        
        var ApprovalList = TwshStudentRegService.getTwshExamMonthYears();
        ApprovalList.then(function (response) {
            if (response.Table.length > 0) {
                $scope.getExamYearMonth = response.Table;
            } else {
                $scope.loading = false;
                $scope.Data = false;
            }
        }, function (error) {
            $scope.Data = false;
            $scope.loading = false;
        });
    


        $scope.array = []

        $scope.Add = function () {
            var Data = JSON.parse($scope.ExamMonthYear)
            $scope.ExamYearMonth = Data.ExamMonthYear;
            $scope.ExamMonthYearId = Data.Id;
            $scope.array = [];
            if ($scope.ExamMonthYearId == null || $scope.ExamMonthYearId == '' || $scope.ExamMonthYearId == undefined) {
                alert("Please Select Exam Month Year")
                return
            }
            if ($scope.Course == null || $scope.Course == '' || $scope.Course == undefined) {
                alert("Please Select Course")
                return
            }
           
            if ($scope.Batch == null || $scope.Batch == '' || $scope.Batch == undefined) {
                alert("Please Exam Batch")
                return
            }
            for (i = 0; i < $scope.array.length; i++) {
                if ($scope.array[i].ExamMonthYearId == $scope.ExamMonthYearId && $scope.array[i].CourseId == $scope.CourseId && $scope.array[i].BatchId == $scope.BatchId) {
                    alert(' Exam Month Year, course and Batch Already Added Choose Another')
                    return
                }
               
            }
          
            var Batch = parseInt($scope.Batch)
          
            for (let i = 1; i < Batch +1; i++) {
                var obj ={ 
                             "id" : i,
                             "ExamMonthYearId": $scope.ExamMonthYearId,
                             "ExamYearMonth": $scope.ExamYearMonth,
                             "Course": $scope.Course,
                             "ExamDate": "",
                             "BatchId": "",
                             "CourseId":$scope.CourseId
                         }
              
                $scope.array.push(obj)
                }
    
        }
        


        $scope.Delete = function (id) {
            var id = id + 1
            $scope.array = removeItem($scope.array, id);
            $scope.Batch = $scope.array.length.toString();

        }


        const removeItem = (items, i) =>
            items.slice(0, i - 1).concat(items.slice(i, items.length))



        $scope.finalarray = [];
        $scope.SaveDates = function () {
            $scope.finalarray = $scope.array;
            $scope.finalarray = $scope.finalarray.map(itm => {
                itm.ExamDate = moment(itm.ExamDate).format("DD-MM-YYYY")
                itm.BatchId = parseInt(itm.BatchId)
                delete itm.Course;
                delete itm.ExamYearMonth;
                return itm;
            });
          
            for (var q = 0; q < $scope.finalarray.length; q++) {
                if ($scope.finalarray[q].ExamDate== undefined ) {
                    alert('Select valid Exam date.');
                    return;
                }
                if ($scope.finalarray[q].ExamDate == "Invalid date") {
                    alert('Select Exam date.');
                    return;
                }
                if ($scope.finalarray[q].BatchId == "" || $scope.finalarray[q].BatchId == 0 || $scope.finalarray[q].BatchId == null || $scope.finalarray[q].BatchId == undefined) {
                    alert('Select Exam batch.');
                    return;
                }
            }

         
            var json = { "json": JSON.stringify($scope.finalarray) }
            var SaveData = TwshStudentRegService.SetTwshExamDates(json);
            SaveData.then(function (response) {
                try { var response = JSON.parse(response) } catch (err) { }
                $scope.array = [];
                if (response[0].ResponseCode == '200') {
                    alert(response[0].ResponseDescription);
                    $scope.GetExamBatchesList();
                    $scope.loading = false;
             
            } else if (response[0].ResponseCode == '400') {
                alert(response[0].ResponseDescription);
                    $scope.GetExamBatchesList();
                    $scope.loading = false;
            } else {
                    alert("No Data Found")
                    $scope.loading = false;
                    $scope.Data = false;
                }
                $scope.GetExamBatchesList();
            },function (error) {
            $scope.Data = false;
            $scope.loading = false;
            alert("error while loading Exam Month Year");

        });
        }


      

    })
})