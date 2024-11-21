define(['app'], function (app) {
    app.controller("CreateSeatingPlanController", function ($scope, $http, $localStorage, $state, AppSettings, PreExaminationService) {

        var today = new Date()
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }


        today = mm + '/' + dd + '/' + yyyy;
        $scope.today = today;
      
        $scope.Branchs = [
            { "Id": 1, "Name": "Electronics and Communication Engineering","selected":false,"capacity":130 },
        { "Id": 2, "Name": "Electronics and Electrical Engineering", "selected": false, "capacity": 100 }
        ]

        $scope.getCapacity = [{ "Id": 1, "Name": 'Exam Hall 1', "capacity": 120 },
        { "Id": 1, "Name": 'Exam Hall 2', "capacity": 100 },
        {"Id":1,"Name":'Exam Hall 3',"capacity":80}]

        $scope.ChangeData = function (data) {
            var data = JSON.parse(data)
            $scope.RequiredCapacity = data.capacity;

        }

        $scope.toggleAll = function () {
            var toggleStatus = $scope.isAllSelected;
            angular.forEach($scope.Branchs, function (itm) { itm.selected = toggleStatus; });
            $scope.arr = [];
            angular.forEach($scope.Branchs, function (value, key) {
                if (value.selected === true) {
                    console.log(value);
             
              
                    $scope.arr.push({ "id": value.Id, "capacity": value.capacity, "selected": value.selected })
             
                }

            });
           
            var capacity =0
            for (i = 0; i < $scope.arr.length; i++) {
                if ($scope.arr[i].selected == true) {
                    capacity += $scope.arr[i].capacity
                   
                }
            }
            $scope.capacity = capacity

            if ($scope.capacity > $scope.RequiredCapacity) {
                $scope.btnDisable = true
            } else {
                $scope.btnDisable = false
            }
            //console.log($scope.arr)value.capacity
            //console.log($scope.Branchs)
        }



        $scope.optionToggled = function (mid1list) {
            //console.log(mid1list)
            $scope.isAllSelected = $scope.Branchs.every(function (itm) { return itm.selected; })
            $scope.arr = [];
            angular.forEach($scope.Branchs, function (value, key) {
                if (value.selected === true) {
                    console.log(value);
                    $scope.arr.push({ "id": value.Id,"capacity":value.capacity,"selected":value.selected })
                }
            });
            console.log($scope.arr)
            console.log($scope.Branchs)
            var capacity = 0
            for (i = 0; i < $scope.arr.length; i++) {
                if ($scope.arr[i].selected == true) {
                    capacity += $scope.arr[i].capacity
                   
                }
            }
            $scope.capacity = capacity
            if ($scope.capacity > $scope.RequiredCapacity) {
                $scope.btnDisable = true
            } else {
                $scope.btnDisable = false
            }
        }


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

        var expanded = false;

        $scope.showCheckboxes1 = function () {
            var checkboxes1 = document.getElementById("checkboxes1");
            if (!expanded) {
                checkboxes1.style.display = "block";
                expanded = true;
            } else {
                checkboxes1.style.display = "none";
                expanded = false;
            }
        }

        $scope.closeCheckbox1 = function () {
            var checkboxes1 = document.getElementById("checkboxes1");
            if (!expanded) {
                checkboxes1.style.display = "block";
                expanded = true;
            } else {
                checkboxes1.style.display = "none";
                expanded = false;
            }
        }

        $scope.toggleAll1 = function () {
            var toggleStatus1 = $scope.isAllSelect;
            angular.forEach($scope.getCapacity, function (itm) { itm.selected = toggleStatus1; });
            $scope.array = [];
            angular.forEach($scope.getCapacity, function (value, key) {
                if (value.selected === true) {
                    console.log(value);


                    $scope.array.push({ "id": value.Id, "capacity": value.capacity, "selected": value.selected })

                }

            });


            var RequiredCapacity = 0
            for (i = 0; i < $scope.array.length; i++) {
                if ($scope.array[i].selected == true) {
                    RequiredCapacity += $scope.array[i].capacity

                }
            }
            $scope.RequiredCapacity = RequiredCapacity
            //var capacity = 0
            //for (i = 0; i < $scope.arr.length; i++) {
            //    if ($scope.arr[i].selected == true) {
            //        capacity += $scope.arr[i].capacity

            //    }
            //}
            //$scope.capacity = capacity

            //if ($scope.capacity >= $scope.RequiredCapacity) {
            //    $scope.btnDisable = true
            //} else {
            //    $scope.btnDisable = false
            //}
            ////console.log($scope.arr)value.capacity
            //console.log($scope.Branchs)
        }



        $scope.optionToggled1 = function (mid1list) {
            //console.log(mid1list)
            $scope.isAllSelected = $scope.getCapacity.every(function (itm) { return itm.selected; })
            $scope.array = [];
            angular.forEach($scope.getCapacity, function (value, key) {
                if (value.selected === true) {
                    console.log(value);
                    $scope.array.push({ "id": value.Id, "capacity": value.capacity, "selected": value.selected })
                }
            });
            console.log($scope.arr)
            console.log($scope.getCapacity)
            var RequiredCapacity = 0
            for (i = 0; i < $scope.array.length; i++) {
                if ($scope.array[i].selected == true) {
                    RequiredCapacity += $scope.array[i].capacity

                }
            }
            $scope.RequiredCapacity = RequiredCapacity
            //if ($scope.capacity >= $scope.RequiredCapacity) {
            //    $scope.btnDisable = true
            //} else {
            //    $scope.btnDisable = false
            //}
        }


    })
})