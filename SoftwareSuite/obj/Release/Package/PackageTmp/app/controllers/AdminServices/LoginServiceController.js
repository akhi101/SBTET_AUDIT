define(['app'], function (app) {
    app.controller("LoginServiceController", function ($scope, $http, $localStorage, $state, AppSettings, AdminService) {

        
        var getUserTypes = AdminService.GetUserTypes();
        getUserTypes.then(function (response) {
            // $scope.ActiveSemesters = response.Table;
            console.log(response);
            $scope.userTypes = response.Table
        },
        function (error) {
            alert("error while loading User Types");
            var err = JSON.parse(error);
            console.log(err.Message);
        });

        
        var getCollegesList = AdminService.getcollegesList();
        getCollegesList.then(function (response) {
            // $scope.ActiveSemesters = response.Table;
            console.log(response);
            $scope.collegesList = response.Table
        },
        function (error) {
            alert("error while loading semesters");
            var err = JSON.parse(error);
            console.log(err.Message);
        });

        
        var getSchemes = AdminService.getActiveSchemes();
        getSchemes.then(function (response) {
            // $scope.ActiveSemesters = response.Table;
            console.log(response);
            var response = JSON.parse(response)
            console.log(response)
            $scope.Schemes = response.Table
        },
        function (error) {
            alert("error while loading semesters");
            var err = JSON.parse(error);
            console.log(err.Message);
        });



        var getBranches = AdminService.GetActiveBranches();
        getBranches.then(function (response) {
            console.log(response);
            $scope.getBranches = response.Table;
        },
        function (error) {
            alert("error while loading semesters");
            var err = JSON.parse(error);
            console.log(err.Message);
        });


        $scope.changeCollege = function (college_code) {
           
            var changeScheme = AdminService.getBranchesList(college_code);
            changeScheme.then(function (response) {
                console.log(response);
                $scope.getBranches = response;
            },
            function (error) {
                alert("error while loading semesters");
                var err = JSON.parse(error);
                console.log(err.Message);
            });
        }


        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        today = yyyy + '-' + mm + '-' + dd;
        $scope.today = today;

        $scope.SetEndDate = function (StartDate) {

            if (StartDate !== null && StartDate !== undefined) {
                var d = StartDate.toISOString().slice(0, 10).split('-');
                d[2] = parseInt(d[2]);
                // d[2] = d[2] + 2; // offset time zone recovery
                var day = d[2];
                if (d[0].length === 4) {
                    var Start_date = d[0] + "-" + d[1] + "-" + d[2];
                }
            }
            //var date = new Date(Start_date);
            var indiaTime = new Date(StartDate).toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
            indiaTime = new Date(indiaTime);

            $scope.tomorrow = indiaTime.toLocaleString();
            //var time = indiaTime.toLocaleTimeString();
            //console.log(time);


            var tomorrow = new Date($scope.tomorrow);
            tomorrow.setDate(tomorrow.getDate() + 1);

            var dates = new Date(tomorrow.toLocaleString());
            //var time = new Date(tomorrow.toLocaleTimeString())
            //console.log(time)
            month = '' + (dates.getMonth() + 1);
            day = '' + dates.getDate();
            year = dates.getFullYear();
            hrs = '23';
            min = '59';
            sec = '59';

            if (month.length < 2) month = '0' + month;
            if (day.length < 2) day = '0' + day;
            var date = [year, month, day].join('-');
            var time = [hrs, min, sec].join(':');
            $scope.EndDate = date + ' ' + time;
          
            //$scope.fine = [year, month, day].join('-');

            document.getElementById("datetimepicker2").setAttribute("min", $scope.enD);

        };

        $scope.SearchUser = function (userName) {
            var GetUserIdStatus = AdminService.getUserIdStatus(userName);
            GetUserIdStatus.then(function (response) {
                console.log(response);
                if (response.length > 0) {
                    $scope.userDetails = response;
                    $scope.result = true;
                    $scope.Noresult = false
                } else {
                    $scope.result = false ;
                    $scope.Noresult = true;
                }
                

            },
            function (error) {
                $scope.result = false;
                $scope.Noresult = true;
                alert("error while loading semesters");
                var err = JSON.parse(error);
                console.log(err.Message);
            });
        }
    
        $scope.SwitchUser = function (userId) {
            var switchUser = AdminService.switchUserState(userId);
            switchUser.then(function (response) {
                console.log(response);
                if (response.length > 0) {             
                    //$scope.result = true;
                    //$scope.Noresult = false
                    alert(response[0].ResponceDescription);
                    $scope.SearchUser($scope.userDetails[0].UserName)
                } else {
                    //$scope.result = false ;
                    //$scope.Noresult = true;
                }
                

            },
            function (error) {
                //$scope.result = false;
                //$scope.Noresult = true;
                alert("error while loading semesters");
                var err = JSON.parse(error);
                console.log(err.Message);
            });
        }
        
      
        

        $scope.changeUser = function (user) {
            $scope.user = user;
        }

        $scope.submit = function (userType, Name, password, expiryDate, firstName, firstName,
                                    lastLame, Address, Email, mobileNo, collegeId,branchId) {
            var date = new Date($scope.EndDate.toLocaleString());
            month = '' + (date.getMonth() + 1);
            day = '' + date.getDate();
            year = date.getFullYear();

            hrs = '23';
            min = '59';
            sec = '59';

            if (month.length < 2) month = '0' + month;
            if (day.length < 2) day = '0' + day;
            var date = [year, month, day].join('-');
            var time = [hrs, min, sec].join(':');
            $scope.EndDate = date + ' ' + time;
            var EndDate = moment($scope.EndDate).format("YYYY-MM-DD HH:mm:ss.SSS");
            let UserTypeId = userType;
            let UserName = Name;
            let UserPassword = password;
           // let ExpiryDate = moment($scope.EndDate).format("YYYY-MM-DD HH:mm:ss.SSS");
            let FirstName = firstName;
            let LastName = lastLame;
            let Address1 = Address;
            let EmailId = Email;
            let CellNo = mobileNo;
            let CollegeId = collegeId;
            let BranchId = branchId;
            var setFeePaymentDates = AdminService.CreateUser(UserTypeId, UserName, UserPassword, EndDate, FirstName, LastName, Address1, EmailId, CellNo, CollegeId, BranchId);
            setFeePaymentDates.then(function (response) {            
                alert("User Created Sucessfully");              
                // $scope.GetMarksEntryDatesList();
            }, function (error) {
                alert("Error while loading Data")
                let err = JSON.parse(error);
                console.log(err.Message);
            });
        };
    })
})