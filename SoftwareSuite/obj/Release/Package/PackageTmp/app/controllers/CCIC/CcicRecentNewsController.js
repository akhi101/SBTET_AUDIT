define(['app'], function (app) {
    app.controller("CcicRecentNewsController", function ($scope, $uibModal, $http, $localStorage, $state, $stateParams, $interval, AppSettings, CcicAdminService,CcicPreExaminationService) {
        const $ctrl = this
        $ctrl.$onInit = () => {
            $scope.GetAllRecentNewsData();
            $scope.getuserRecentNews();
        }
        //var data = [];
        //$scope.$emit('showLoading', data);

        //$scope.Editsemesterdat = function (data, ind) {

        //    var ele1 = document.getElementsByClassName("enabletable" + ind);
        //    for (var j = 0; j < ele1.length; j++) {
        //        ele1[j].style['pointer-events'] = "auto";
        //        ele1[j].style.border = "1px solid #ddd";
        //        ele1[j].style['-webkit-appearance'] = "auto";
        //        ele1[j].style['-moz-appearance'] = "auto";
        //    }
        //    $scope['edit' + ind] = false;

        //}
        $scope.loading = false;
        //var GetRecentNews = CcicAdminService.GetRecentNews();
        //GetRecentNews.then(function (response) {
        //    if (response.Table.length>0) {
        //        $scope.loading = false;
        //        $scope.GetRecentNews = response.Table;
        //        $scope.$emit('hideLoading', data);
        //        $scope.result = true;
        //        $scope.NoResult = false;
        //    } else {
        //        $scope.loading = false;
        //        $scope.result = false;
        //        $scope.NoResult = true;
        //        alert("No Data Found");
        //        $scope.$emit('hideLoading', data);
        //    }
        //},
        //    function (error) {
        //        $scope.result = false;
        //        $scope.NoResult = true;
        //        alert("error while loading Data");
        //        console.log(error);
        //    });



        //var GetCcicUserTypes = CcicAdminService.GetCcicUserTypes();
        //GetCcicUserTypes.then(function (response) {
        //    if (response.Table.length > 0) {
        //        $scope.UserTypes = response.Table;

        //    } else {
        //        $scope.StudentType = [];
        //        alert("No Data Found");
        //    }
        //},
        //    function (error) {
        //        alert("error while loading Data");
        //        console.log(error);
        //    });



        $scope.getuserRecentNews = function () {

            $scope.loading = true;


            var GetRecentNews = CcicAdminService.GetRecentNews();
            GetRecentNews.then(function (response) {
                if (response.Table.length>0) {
                    $scope.loading = false;
                    $scope.RecentNewsTable = response.Table;
                    //$scope.result = true;
                    $scope.NoData = false;
                    //$scope.$emit('hideLoading', data);

                } else {
                    $scope.loading = false;
                    $scope.StudentType = [];
                    //$scope.result = false;
                    $scope.NoData = true;
                    alert("No Data Found");
                    //$scope.$emit('hideLoading', data);

                }
            },
                function (error) {
                    $scope.result = false;
                    $scope.NoData = true;
                    alert("error while loading Data");
                    console.log(error);
                });
        }

        //var expanded = false;

        //$scope.showCheckboxes = function () {
        //    var checkboxes = document.getElementById("checkboxes");
        //    if (!expanded) {
        //        checkboxes.style.display = "block";
        //        expanded = true;
        //    } else {
        //        checkboxes.style.display = "none";
        //        expanded = false;
        //    }
        //}

        //$scope.closeCheckbox = function () {
        //    var checkboxes = document.getElementById("checkboxes");
        //    if (!expanded) {
        //        checkboxes.style.display = "block";
        //        expanded = true;
        //    } else {
        //        checkboxes.style.display = "none";
        //        expanded = false;
        //    }
        //}

        //$scope.toggleAll = function () {
        //    var toggleStatus = $scope.isAllSelected;
        //    angular.forEach($scope.UserTypes, function (itm) { itm.selected = toggleStatus; });
        //    $scope.arr = [];
        //    angular.forEach($scope.UserTypes, function (value, key) {
        //        if (value.selected === true) {
        //            /*console.log(value);*/
        //            $scope.arr.push({ "UserTypeID": value.UserTypeID })
        //        }

        //    });
        //    //console.log($scope.arr)
        //    //console.log($scope.userTypes)
        //}

        //$scope.optionToggled = function (mid1list) {
        //    $scope.isAllSelected = $scope.UserTypes.every(function (itm) { return itm.selected; })
        //    $scope.arr = [];
        //    angular.forEach($scope.UserTypes, function (value, key) {
        //        if (value.selected === true) {
        //            //console.log(value);
        //            $scope.arr.push({ "UserTypeID": value.UserTypeID })
        //        }
        //    });
        //    //console.log($scope.arr)
        //    //console.log($scope.UserTypes)

        //}

        //var tempId = [];
        //$scope.addData = function (UserTypeID) {
        //    return {
        //        UserTypeID: UserTypeID,

        //    };
        //}





        $scope.AddRecentNews = function () {
            if ($scope.StartDate == null || $scope.StartDate == undefined || $scope.StartDate == "") {
                alert('Please select StartDate');
                return;
            }
            if ($scope.EndDate == null || $scope.EndDate == undefined || $scope.EndDate == "") {
                alert('Please select EndDate');
                return;
            }
            if ($scope.RecentNews == null || $scope.RecentNews == undefined || $scope.RecentNews == "") {
                alert('Please enter RecentNews');
                return;
            }
            $scope.loading = true;
            var startDate = moment($scope.StartDate).format("YYYY-MM-DD HH:mm:ss.SSS");
            var date = new Date($scope.EndDate.toString());
            month = '' + (date.getMonth() + 1);
            day = '' + date.getDate();
            year = date.getFullYear();

            hrs = '23';
            min = '59';
            sec = '59';

            if (month.length < 2) month = '0' + month;
            if (day.length < 2) day = '0' + day;
            var dates = [year, month, day].join('-');
            var time = [hrs, min, sec].join(':');
            $scope.EndDate = dates + ' ' + time;
            var EndDate = moment($scope.EndDate).format("YYYY-MM-DD HH:mm:ss.SSS");
            $scope.array = []
            //if ($scope.arr.length > 0) {
            //    for (var i = 0; i < $scope.arr.length; i++) {
            //        $scope.array.push({ 'RecentNewsText': $scope.RecentNews, 'FromDate': startDate, 'ToDate': EndDate, 'UserName': $scope.UserName });
            //    }
            //}

            $scope.array = []

            $scope.array.push({ 'RecentNewsText': $scope.RecentNews, 'FromDate': startDate, 'ToDate': EndDate, 'UserName': $scope.UserName });




            var SendRecentNews = CcicAdminService.AddCcicRecentNews($scope.array[0].RecentNewsText, $scope.array[0].FromDate, $scope.array[0].ToDate, $scope.array[0].UserName);

            SendRecentNews.then(function (response) {
                $scope.loading = false;
                alert("RecentNews Saved Successfully");
                $scope.getuserRecentNews();
                $scope.clearDefaults();
            },
                function (error) {
                    $scope.loading = false;
                    alert("error while loading Data");
                    console.log(error);
                });


        }


        $scope.clearDefaults = function () {
            $scope.StartDate = '';
            $scope.EndDate = '';
            $scope.RecentNews = '';
        }


        $scope.getAllRecentNews = function () {

            $scope.modalInstance = $uibModal.open({
                templateUrl: "/app/views/CCIC/CcicAllRecentNewsPopup.html",
                size: 'lg',
                scope: $scope,
                windowClass: 'modal-fit',
                backdrop: 'static',
                keyboard: false
            });

            //var GetAllRecentNews = CcicAdminService.GetAllRecentNews();
            //GetAllRecentNews.then(function (response) {
            //    if (response.Table.length) {
            //        $scope.GetAllRecentNews = response.Table;
               
            //    } else {
            //        $scope.loading = false;
            //        $scope.NoData = true;
            //        alert("No Data Found");

            //    }
            //},
            //    function (error) {

            //        alert("error while loading Data");
            //        console.log(error);
            //    });
            $scope.closeModal = function () {
                $scope.modalInstance.close();
            };


        }


        //    $scope.RecentNewsInactive = function (RecentNewsID) {
        //        var GetRecentNews = CcicAdminService.CcicRecentNewsInactive(RecentNewsID);
        //        GetRecentNews.then(function (response) {

        //            alert("Notification inactivated Successfully")
        //            $scope.getuserNotifications();
        //        },
        //            function (error) {
        //                alert("error while loading Data");
        //                console.log(error);
        //            });
        //}

        //$scope.SetRecentNewsStatus = function (RecentNewsID,Active) {



        //    if (Active == true) {
        //        var Active = 0;
        //    } else {
        //        var Active = 1;
        //    }

        //    var SetRecentNewsStatus = CcicAdminService.SetCcicRecentNewsInactive(RecentNewsID, Active);
        //    SetRecentNewsStatus.then(function (response) {
        //        alert("RecentNews Status Changed Successfully");
        //        $scope.getuserNotifications();
        //    },
        //        function (error) {
        //            alert("error while loading Data");
        //            console.log(error);
        //        });
        //};




        //$scope.modify = function (ind) {



        //    $scope.viewField = true;
        //    $scope.modifyField = true;

        //    var ele1 = document.getElementsByClassName("enabletable" + ind);
        //    for (var j = 0; j < ele1.length; j++) {
        //        ele1[j].style['pointer-events'] = "auto";
        //        ele1[j].style.border = "1px solid #ddd";
        //        ele1[j].style['-webkit-appearance'] = "auto";
        //        ele1[j].style['-moz-appearance'] = "auto";
        //    }
        //    $scope['edit' + ind] = false;

        //};


        //$scope.update = function (ind, RecentNewsID, RecentNewsText, FromDate, ToDate) {


        //    $scope.loading = true;
        //    $scope.viewField = false;
        //    $scope.modifyField = false;
        //    $scope['edit' + ind] = true;

        //    var ele2 = document.getElementsByClassName("enabletable" + ind);
        //    for (var j = 0; j < ele2.length; j++) {
        //        ele2[j].style['pointer-events'] = "none";
        //        ele2[j].style.border = "0";
        //        ele2[j].style['-webkit-appearance'] = "none";
        //        ele2[j].style['-moz-appearance'] = "none";
        //    }


        //    var update = CcicAdminService.CcicRecentNewsUpdate(RecentNewsID, RecentNewsText.toString(), FromDate.toString(), ToDate.toString(), $scope.UserName);
        //    update.then(function (response) {
        //        $scope.loading = false;
        //        alert("RecentNews Updated Successfully")
        //        $scope.getuserRecentNews();
        //        $scope.$emit('hideLoading', data);

        //    },
        //        function (error) {
        //            $scope.loading = false;
        //            alert("error while loading Data");
        //            console.log(error);
        //            $scope.$emit('hideLoading', data);

        //        });
        //}

        $scope.GetAllRecentNewsData = function () {
            var getacayrs = CcicAdminService.GetAllRecentNews()
            getacayrs.then(function (response) {
                $scope.GetAllRecentNewsTable = response.Table;

                for (let i = 0; i < $scope.GetAllRecentNewsTable.length; i++) {
                    if ($scope.GetAllRecentNewsTable[i].GetAllRecentNewsTable == true) {
                        $scope.finalList.push($scope.GetAllRecentNewsTable[i]);
                    }
                }

                var ele = document.getElementsByClassName("tableinpt");
                for (var j = 1; j < response.Table.length + 10000; j++) {
                    $scope['edit' + j] = true;
                }
            },
                function (error) {
                    alert("data is not loaded");
                    var err = JSON.parse(error);
                    console.log(err.Message);
                });

        }


        $scope.ChangeStatus = function (data, ind) {
           
            var ele1 = document.getElementsByClassName("enabletable" + ind);
            for (var j = 0; j < ele1.length; j++) {
                ele1[j].style['pointer-events'] = "auto";
                ele1[j].style.border = "1px solid #ddd";
            }
          

            $scope['edit' + ind] = false;

        }


        $scope.UpdationStatus = function (dat, ind) {


            $scope['edit' + ind] = true;

            var ele2 = document.getElementsByClassName("enabletable" + ind);
            for (var j = 0; j < ele2.length; j++) {
                ele2[j].style['pointer-events'] = "none";
                ele2[j].style.border = "0";
            }
            var recentnewstext = dat.RecentNewsText == undefined || dat.RecentNewsText == null || dat.RecentNewsText == "" ? " " : dat.RecentNewsText
            var recentnewsid = dat.RecentNewsID == undefined || dat.RecentNewsID == null || dat.RecentNewsID == "" ? " " : dat.RecentNewsID;
            var srtdate = dat.FromDate == undefined || dat.FromDate == null || dat.FromDate == "" ? " " : moment(dat.FromDate).format("YYYY-MM-DD");
            var enddate = dat.ToDate == undefined || dat.ToDate == null || dat.ToDate == "" ? " " : moment(dat.ToDate).format("YYYY-MM-DD");
            $scope.loading = true;
            var updaterecentnews = CcicAdminService.CcicRecentNewsUpdate(recentnewsid, recentnewstext, srtdate, enddate, $scope.UserName);
            updaterecentnews.then(function (response) {

                try {
                    var response = JSON.parse(response);
                }
                catch (err) { }
                $scope.loading = false;
                alert("RecentNews Updated Successfully")
                $scope.getuserRecentNews();
                $scope.GetAllRecentNewsData();
                $scope.clearDefaults();
                //$scope.$emit('hideLoading', data);

            },
                function (error) {
                    $scope.loading = false;
                    alert("error while loading Data");
                    console.log(error);
                    //$scope.$emit('hideLoading', data);

              });

        }




    })
})