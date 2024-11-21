define(['app'], function (app) {
    app.controller("DuplicateMemoController", function ($scope, $http, $localStorage, $state, $stateParams, AppSettings) {

        $scope.rectangles = [];

        $scope.name = "Kothapally Nagateja";
        $scope.college = "Govt Polytechnic Kothagudem";
        $scope.pin = '08007-AEI-022';
        $scope.BranchYear = "III SEM C-05 DIPLOMA IN APPLIED ELECTRONICS & INSTRUMENTATION ENGG";
        $scope.MonthYear = "HELD in OCT/NOV 2019"


        $scope.today = new Date();

        $scope.printForm = function () {
            document.title = 'Duplicate_Sem_Memo';
            window.print();
           // document.title = tempTitle;
        }


        $scope.array = [
             { "Sub_Code": "AEI-301", "Sub_Name": "Engineering Mathematics-II", "End_total": 80, "Sess_total": 20, "req_total": 100, "End": 40, "Sessional": 11, "Total": 51, "Remarks":"P" },
             {"Sub_Code":"AEI-302","Sub_Name":"Electronic Circuits-I","End_total":80,"Sess_total":20,"req_total":100,"End":58,"Sessional":15,"Total":73,"Remarks":"P"},
            {"Sub_Code":"AEI-303","Sub_Name":"Circuits Theory","End_total":80,"Sess_total":20,"req_total":100,"End":55,"Sessional":18,"Total":73,"Remarks":"P"},
            { "Sub_Code": "AEI-304", "Sub_Name": "Digital Electronics", "End_total": 80, "Sess_total": 20, "req_total": 100, "End": 49, "Sessional": 14, "Total": 63, "Remarks": "P" },
        {"Sub_Code":"AEI-305","Sub_Name":"Process Instrumentation-I","End_total":80,"Sess_total":20,"req_total":100,"End":71,"Sessional":19,"Total":90,"Remarks":"P"}
        ]

        $scope.labs = [
                       { "Sub_Code": "AEI-306", "Sub_Name": "Electronic Circuits Lab-I", "End_total": 60, "Sess_total": 20, "req_total": 100, "End": 58, "Sessional": 38, "Total": 96, "Remarks": "P" },
            { "Sub_Code": "AEI-306", "Sub_Name": "Digital Electronics Lab", "End_total": 60, "Sess_total": 20, "req_total": 100, "End": 50, "Sessional": 37, "Total": 87, "Remarks": "P" },
            // { "Sub_Code": "AEI-306", "Sub_Name": "Electronic Circuits Lab-I", "End_total": 80, "Sess_total": 20, "req_total": 100, "End": 40, "Sessional": 11, "Total": 51, "Remarks": "P" },
             // { "Sub_Code": "AEI-306", "Sub_Name": "Electronic Circuits Lab-I", "End_total": 80, "Sess_total": 20, "req_total": 100, "End": 40, "Sessional": 11, "Total": 51, "Remarks": "P" },
              // { "Sub_Code": "AEI-306", "Sub_Name": "Electronic Circuits Lab-I", "End_total": 80, "Sess_total": 20, "req_total": 100, "End": 40, "Sessional": 11, "Total": 51, "Remarks": "P" },
                  //{ "Sub_Code": "AEI-306", "Sub_Name": "Electronic Circuits Lab-I", "End_total": 80, "Sess_total": 20, "req_total": 100, "End": 40, "Sessional": 11, "Total": 51, "Remarks": "P" },
           {"Sub_Code": "AEI-308", "Sub_Name": "Process Instrumentation Lab-I",  "End_total": 60, "Sess_total": 40, "req_total": 100, "End": 54,"Sessional": 38, "Total": 92, "Remarks": "P" }
        ]


        $scope.Subjects = $scope.array.concat($scope.labs);
        if ($scope.Subjects.length == 1) {
            $scope.length1 = true;
        }else if ($scope.Subjects.length == 2) {
            $scope.length2 = true;
        }  
        else if ($scope.Subjects.length == 3) {
            $scope.length3 = true;
        } else if ($scope.Subjects.length == 4) {
            $scope.length4 = true;
        } else if ($scope.Subjects.length == 5) {
            $scope.length5 = true;
        } else if ($scope.Subjects.length == 6) {
            $scope.length6 = true;
        } else if ($scope.Subjects.length == 7) {
            $scope.length7 = true;
        } else if ($scope.Subjects.length == 8) {
            $scope.length8 = true;
        } else if ($scope.Subjects.length == 9) {
            $scope.length9 = true;
        } else if ($scope.Subjects.length == 10) {
            $scope.length10 = true;
        } else if ($scope.Subjects.length == 11) {
            $scope.length11 = true;
        } else if ($scope.Subjects.length == 12) {
            $scope.length12 = true;
        }
        console.log($scope.Subjects);
        var End_total = 0
        var Sess_total = 0;
        var req_total = 0;
        var End = 0;
        var Sessional = 0;
        var Total = 0;
      

        for (var i = 0; i < $scope.Subjects.length; i++) {
            if ($scope.Subjects[i].End_total != null)
                End_total = End_total + $scope.Subjects[i].End_total;
            if ($scope.Subjects[i].Sess_total != null)
                Sess_total = Sess_total + $scope.Subjects[i].Sess_total;

            if ($scope.Subjects[i].req_total != null)
                req_total = req_total + $scope.Subjects[i].req_total;

            if ($scope.Subjects[i].Total != null)
                Total = Total + $scope.Subjects[i].Total;

            if ($scope.Subjects[i].End != null)
                End = End + $scope.Subjects[i].End;
            if ($scope.Subjects[i].Sessional != null)
                Sessional = Sessional + $scope.Subjects[i].Sessional;


        }
        $scope.End_total = End_total;
        $scope.Sess_total = Sess_total;
        $scope.req_total = req_total;
        $scope.Total = Total;
        $scope.End = End;
        $scope.Sessional = Sessional;
        console.log($scope.Sessional)


    })
})