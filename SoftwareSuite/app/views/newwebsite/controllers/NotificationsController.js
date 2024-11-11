define(['app'], function (app) {
    app.controller("NotificationsController", function ($scope, $state, $stateParams, AppSettings, AdminService) {
        const $ctrl = this;
        //$ctrl.$onInit = () => {
        //    setTimeout(function () {
        //        $('#maxRows').val(20)
        //            .change();
              

        //    }, 1000);
           
        //    $scope.getPagination('#paginated-table');
        //}

        $scope.search = "";

        var getcircular = AdminService.getCircularsActive();
        getcircular.then(function (res) {
            var response = JSON.parse(res)
            if (response.Table.length > 0) {
                $scope.Circulars = response.Table;
                $scope.loading = false;
                $scope.data = true;
                $scope.error = false;
                
              
            setTimeout(function () {
           //     $scope.ontimefn();
            }, 1000);
               
            } else {
                $scope.loading = false;
                $scope.data = false;
                $scope.error = true;
            }
        },
                function (error) {

                    console.log(error);
                    $scope.loading = false;
                    $scope.data = false;
                    $scope.error = true;
                });

        $scope.sort = function (keyname) {
            $scope.sortKey = keyname;   //set the sortKey to the param passed
            $scope.reverse = !$scope.reverse; //if true make it false and vice versa
        }


        //$scope.ontimefn = function () {

        //   var maxRows =20
        //    var trIndex = 0;
        //    var pageNum =5
        //    $('#paginated-table tr:gt(0)').each(function () {
        //        trIndex++;
        //        if (
        //            trIndex > maxRows * pageNum ||
        //            trIndex <= maxRows * pageNum - maxRows
        //        ) {
        //            $(this).hide();
        //        } else {
        //            $(this).show();
        //        }
        //    }); 
        //}



     
      
    });
});
