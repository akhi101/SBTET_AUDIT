define(['app'], function (app) {
    app.controller("SetSemisterDatesController", function ($scope, $http, $localStorage, $state, $stateParams, AppSettings, AssessmentService ) {


        $scope.endDisable = true;
        var AcademicYearsActive = AssessmentService.GetAcademicYearsActive();
        AcademicYearsActive.then(function (response) {
            $scope.years = response.Table[0];

        },
            function (error) {
                alert("error while loading Academic Year");
            });


        var LoadActiveSemesters = AssessmentService.getActiveSemester();
        LoadActiveSemesters.then(function (response) {
            $scope.ActiveSemesters = response.Table;
        },
            function (error) {
                alert("error while loading semesters");
                var err = JSON.parse(error);
                console.log(err.Message);
            });

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


        $scope.SetStartDate = function () {

            document.getElementById("datetimepicker1").setAttribute("min", today);

        };
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


            if (month.length < 2) month = '0' + month;
            if (day.length < 2) day = '0' + day;
            $scope.endDisable = false;
            $scope.enD = [year, month, day].join('-');

            document.getElementById("datetimepicker2").setAttribute("min", $scope.enD);

        };
    })
})