define(['app'], function (app) {
    app.controller("TwshDashBoardController", function ($scope, $state,$localStorage, TwshStudentRegService) {
       
        var authData = $localStorage.Twsh;
       $scope.authData = authData;
       $scope.UserName ="";
        var isLogin = $localStorage.Twsh == undefined || $localStorage.Twsh == "" ? false : $localStorage.Twsh.isLogin;
      if(isLogin){       
        $scope.isLogin = true;
        $scope.UserName = $localStorage.Twsh.Username;
        $scope.userTypeid = $localStorage.Twsh == undefined || $localStorage.Twsh == "" ? -1 : $localStorage.Twsh.UserTypeId;
        var GetModules = TwshStudentRegService.getModules($scope.userTypeid);
        GetModules.then(function (response) {          
            $scope.modules = response;
            $scope.isLogin = false;
            if ($scope.userTypeid == '-1') {
                $scope.isLogin = false;
            } else {
                $scope.isLogin = true;
            }
            
        },
        function (error) {
            var err = JSON.parse(error);
            alert("Login failed, Server Error");
            // console.log(err.Message);

        });    
      }else{
       // 
       $scope.UserName ="";
       $localStorage.Twsh ="";
        $scope.userTypeid = $localStorage.Twsh == undefined || $localStorage.Twsh == "" ? -1 : $localStorage.Twsh.UserTypeId;
        $scope.isLogin = false;
        var GetModules = TwshStudentRegService.getModules($scope.userTypeid);
        GetModules.then(function (response) {        
            $scope.modules = response;
            $scope.isLogin = false;
            if ($scope.userTypeid == '-1') {
                $scope.isLogin = false;
            } else {
                $scope.isLogin = true;
            }
            
        },
        function (error) {
           // var err = JSON.parse(error);
            alert("Login failed, Server Error");
            // console.log(err.Message);

        });
    } 
     
    $scope.$on('loadmodulelist', function (evnt, data) {
            $scope.modules = data.moduleslist;
            $localStorage.Twsh.islogin = data.isLogin;
            $scope.isLogin = data.isLogin;
            $scope.UserName =data.user;
          //  $scope.isLogin = data.isLogin;
        });

        $scope.Logout = function () {
          
            delete $localStorage.Twsh;
            //$scope.modules = [];
            $scope.isLogin = false;

            $scope.userTypeid = $localStorage.Twsh == undefined || $localStorage.Twsh == "" ? -1 : $localStorage.Twsh.UserTypeId;
            if ($scope.userTypeid) {
                // $scope.userTypeid = $scope.authData.UserTypeId;
                var GetModules = TwshStudentRegService.getModules($scope.userTypeid);
                GetModules.then(function (response) {
                    console.log(response)
                    $scope.modules = response;
                    $scope.isLogin = false;
                    if ($scope.userTypeid == '-1') {
                        $scope.isLogin = false;
                        $state.go('TwshHome');
                    } else {
                        $scope.isLogin = true;
                        $state.go('TwshHome');
                    }

                },
                function (error) {                   
                    alert("Login failed, Server Error");
                    // console.log(err.Message);

                });
            }          
           // $state.go('TWSH.Home');
        }
    })
})