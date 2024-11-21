define(['app'], function (app) {
    app.controller("AttendanceSmsController", function ($scope, $state, $stateParams, AppSettings, MasterSettingsService) {
        $scope.yesBtn = 1;
        $scope.Button = 0;
        $scope.Years = [{ "Id": 1, "Name": "Daily" },
            { "Id": 2, "Name": "Weekly" },
        {"Id":3,"Name":"Monthly"}
        ]

        $scope.Hours = [{ "Id": 1 }, { "Id": 2 }, { "Id": 3 },
        { "Id": 4 }, { "Id": 5 }, { "Id": 6 }, { "Id": 7 }, { "Id": 8 }, { "Id": 9 }, { "Id": 10 },
        { "Id": 11 }, { "Id": 12 }, { "Id": 13 }, { "Id": 14 }, { "Id": 15 }, { "Id": 16 }, { "Id": 17 }, { "Id": 18 }, { "Id": 19 }, { "Id": 20 },
        { "Id": 21 }, { "Id": 22 }, { "Id": 23 }, { "Id": 24 }]


        var smsList = MasterSettingsService.getAttendanceSMSList();
        smsList.then(function (response) {
            $scope.GetSmsList = response.Table;
        },
        function (error) {
            alert("error while data is loading ")


        });

        $scope.clickRadio = function (Button) {
            $scope.Button = Button
        }
    })
})