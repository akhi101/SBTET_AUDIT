define(['app'], function (app) {
    app.controller("TicketsController", function ($scope, $http, $localStorage, $state, AppSettings, AdminService) {
        var authData = $localStorage.authorizationData;
        $scope.UserName = authData.userName;
        $scope.UserTypeID = authData.UserTypeID;



        const $ctrl = this;


        $ctrl.$onInit = () => {
            //$scope.getcirculars();
        
        }
        $scope.AddTicketsPage = function () {
            //$localStorage.authData = {
            //    InstitutionID: InstitutionID,
            //};

            $state.go('Dashboard.AddTickets');


        }

        $scope.TicketsReportPage = function () {
            //$localStorage.authData = {
            //    InstitutionID: InstitutionID,
            //};

            $state.go('Dashboard.TicketsReport');


        }

 

        $scope.PendingCount = function (UserName,ProjectID) {

            $localStorage.TempData = {
                DataType: 1,
                UserName: UserName,
                ProjectID: ProjectID

            };

            $state.go('Dashboard.TicketsCountData');


        }

        $scope.ApprovedCount = function (UserName, ProjectID) {

            $localStorage.TempData = {
                DataType: 2,
                UserName: UserName,
                ProjectID: ProjectID
            };

            $state.go('Dashboard.TicketsCountData');


        }

        $scope.UnderProcessCount = function (UserName, ProjectID) {

            $localStorage.TempData = {
                DataType: 3,
                UserName: UserName,
                ProjectID: ProjectID
            };

            $state.go('Dashboard.TicketsCountData');


        }
        $scope.CompletedCount = function (UserName, ProjectID) {

            $localStorage.TempData = {
                DataType: 4,
                UserName: UserName,
                ProjectID: ProjectID
            };

            $state.go('Dashboard.TicketsCountData');


        }


        $scope.loading = true;
            var ticketsCount = AdminService.GetTicketsCount($scope.UserName);

        ticketsCount.then(function (response) {
                try {
                    var Res = JSON.parse(response);
                }
                catch (err) { }
                $scope.TaskCount = [];
                var Pending = 0;
               
                var Approved = 0;
                
                var UnderProcess = 0;
                var Completed = 0;

            if (Res.Table.length > 0) {
                $scope.loading = false;
                    $scope.TaskCount = Res.Table;
                    for (var i = 0; i < Res.Table.length; i++) {
                        if (Res.Table[i].Pending != null)
                            Pending = Pending + Res.Table[i].Pending;
                        if (Res.Table[i].Approved != null)
                            Approved = Approved + Res.Table[i].Approved;
                        if (Res.Table[i].UnderProcess != null)
                            UnderProcess = UnderProcess + Res.Table[i].UnderProcess;
        
                        if (Res.Table[i].Completed != null)
                            Completed = Completed + Res.Table[i].Completed;
                    }
                    $scope.Pending = Pending;
                    $scope.Approved = Approved;
                   
                    $scope.UnderProcess = UnderProcess;
                    $scope.Completed = Completed;
                    $scope.loading = false;
                  
                }
            else {
                $scope.loading = false;

                    $scope.loading = false;
                    $scope.ticketsCount = [];
                    
                    $scope.NoData = true;
                }
            },
                function (error) {
                    //   alert("error while loading Notification");
                    var err = JSON.parse(error);
                });

        
        $scope.GetStatuswiseReport = function () {

          

            $state.go('Dashboard.TicketsStatusWiseReport');


        }


    

    })
})