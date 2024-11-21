define(['app'], function (app) {
    app.controller("CreateSeatingListController", function ($scope, $http, $localStorage, $state, AppSettings, PreExaminationService) {

        $scope.studentfilearr = [];
        $scope.studentfilearr = [
            {
                fileindex: 0,
                file: "",
            },
            {
                fileindex: 1,
                file: ""
            },
            {
                fileindex: 2,
                file: ""
            }
        ];
        if ($scope.studentfilearr.length == 1) {
            $scope.DeleteDisable = true;
        } else {
            $scope.DeleteDisable = false;
        }

        $scope.addUser = function () {


            if ($scope.studentfilearr.length == 0) {
                $scope.DeleteDisable = true;
            } else {
                $scope.DeleteDisable = false;
            }

            if ($scope.studentfilearr.length < 50) {
                $scope.studentfilearr.push(
                    {
                        fileindex: $scope.studentfilearr.length,
                        file: "",
                    }
                    );
                $scope.studentfilearr = $scope.studentfilearr.map(function (arr, ind) {
                    arr.fileindex = ind;
                    return arr;
                });

            } else {
                alert('maximum files limit reached');
            }          
        }
        
        $scope.removeUser = function (val) {
            var item = document.getElementById('userfile' + val);
            item.parentNode.removeChild(item);
            $scope.studentfilearr.splice(val, 1);
            $scope.studentfilearr.splice(val, 1);
            console.log($scope.studentfilearr);
        }
        var tempId = [];
        var finalData = []
        var temppositionarr = [];
        $scope.submit = function (val1, val2, val3, count) {
            console.log(val1, val2, val3, count)
            var val1 = val1
            var val2 = val2
            var val3 = val3
            var count = count
           // alert(count)
            //  alert(val)
            console.log(finalData)
            if (val1 != undefined && val2 != undefined && val3 != undefined && count != undefined) {
                console.log("Hi")
                if (finalData.length == '0') {
                    var marksdata = $scope.pushData(val1, val2, val3, count);
                    finalData.push(marksdata);
                    tempId.push(count);

                } else if (finalData.length > 0) {
                    //tempId = [];
                    finalData.map((obj) => {
                        if (obj.count == count) {
                            obj.val1 = val1;
                            obj.val2 = val2;
                            obj.val3 = val3
                          
                        }
                        else if (obj.count != count && !tempId.includes(count)) {
                            var StudentFedd = $scope.pushData(val1, val2, val3, count);
                            tempId.push(count);
                            finalData.push(StudentFedd);

                        }

                    });

                }


                temppositionarr = temppositionarr.filter(function (item) {
                    return !tempId.includes(item);
                });



                finalData.forEach(function (item) { delete item.count });
                //console.log($scope.studentfilearr)

                //if ($scope.studentfilearr.length > 0) {
                //    $scope.studentfilearr.map((obj) => {
                //        if (obj.fileindex == val) {
                //            obj.file = $scope.studentFile;
                //        }
                //    });
                //}
            }
           
            console.log(temppositionarr)
            console.log(finalData)
        }

        $scope.pushData = function (val1, val2, val3, count) {
            console.log(val1, val2, val3, count)
            return {
                "count": count,
                "val1": val1,
                "val2": val2,
                "val3": val3

            };
        }
    })
})