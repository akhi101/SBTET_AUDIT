define(['app'], function (app) {
    app.controller("IndexController", function ($scope, $timeout, $state, $localStorage, $stateParams, AppSettings, PreExaminationService, AdminService) {
        $localStorage.StudentServices = "";
        $scope.OpenPage = function () {
            $state.reload();
            $state.go('index.ContactUs', null, { 'reload': true });
            $scope.LoginUrl = ""

            //$timeout(function () {
            //    $state.transitionTo('index.ContactUs');
            //})
        }
        var location = window.location.origin;


        $scope.LoginUrl = location + "/index.html#!/index/WebsiteLogin";

        $scope.ContactusUrl = location + "/index.html#!/index/ContactUs";



        $scope.Images = [ { "img": "Slides/3.jpeg", "active": "active" }
            , { "img": "Slides/4.jpeg", "active": "" }, { "img": "Slides/5.jpeg", "active": "" }, { "img": "Slides/6.jpeg", "active": "" }
            , { "img": "Slides/7.jpeg", "active": "" }, { "img": "Slides/8.jpeg", "active": "" }, { "img": "Slides/9.jpeg", "active": "" }
            , { "img": "Slides/10.jpeg", "active": "" }, { "img": "Slides/11.jpeg", "active": "" }, { "img": "Slides/12.jpeg", "active": "" }
            , { "img": "Slides/13.jpg", "active": "" }, { "img": "Slides/14.jpg", "active": "" }, { "img": "Slides/15.jpg", "active": "" }
            , { "img": "Slides/16.jpg", "active": "" }, { "img": "Slides/17.jpg", "active": "" }, { "img": "Slides/18.jpg", "active": "" }
            , { "img": "Slides/19.jpg", "active": "" }, { "img": "Slides/20.jpg", "active": "" }, { "img": "Slides/21.jpeg", "active": "" }]


        $scope.GoToCourses = function () {

            setTimeout(function () {

                $('html, body').animate({
                    scrollTop: $("#divName").offset().top
                }, 1500)

            }, 100);
            $state.go('index')

            //window.scrollBy({
            //    top: 1150, // could be negative value
            //    left: 0,
            //    behavior: 'smooth'
            //});
        }

        $("#courses").on('click touchstart', function () {

            $('.nav-menus-wrapper-close-button').click();

            setTimeout(function () {

                $('html, body').animate({
                    scrollTop: $("#divName").offset().top

                }, 1500)

            }, 100);
            $state.go('index')

        });

        $("#LoginUrl").on('click touchstart', function () {

            $('.nav-menus-wrapper-close-button').click();
            setTimeout(function () {

                $state.go('index.WebsiteLogin')

            }, 100);
            $state.go('index')


        });




        $(".MobileSidebar").on('click touchstart', function () {

            $('.nav-menus-wrapper-close-button').click();
            var myId = this.id


            if (myId == 'index.Courses1') {
                localStorage.setItem('CourseType', 1)
                $state.go('index.Courses');
            } else if (myId == 'index.Courses2') {
                localStorage.setItem('CourseType', 2)
                $state.go('index.Courses');
            } else {
                $state.go(myId);
            }

        });

        $scope.OpenLogin = function () {
            $timeout(function () {
                $state.transitionTo('index.WebsiteLogin');
            })
        }
        //
        $scope.OpenCourse = function () {

            $state.go('index.Courses');
        }

        $scope.OpenTwshCourse = function () {

            $state.go('index.TwshCourses');
        }


        var getcircular = AdminService.getCircularsList();
        getcircular.then(function (res) {
            var response = JSON.parse(res)
            if (response.Table.length > 0) {
                $scope.Circulars = response.Table;


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

        
        //var LoadExamTypeBysem = AdminService.DeleteBmaAttendee('1058-19578','TC');
        //    LoadExamTypeBysem.then(function (response) {
        //        var res = JSON.parse(response)
        //        if (res.StatusCode == '200') {
        //            $scope.LoadImg = false
                   
        //            var resp = JSON.parse(res.Content)
        //            $scope.respdata = JSON.parse(resp.data)
        //            console.log($scope.respdata)
        //            $scope.PostAttendance()
        //        } else {
        //            $scope.LoadImg = false
        //            alert("Data not Found from TSTS")
        //        }
        //},
        //        function (error) {
        //            $scope.LoadImg = false
        //        alert("error while loading Student Types");
        //        console.log(error);
        //    });

        $scope.OpenModule = function (Module, ServiceType) {
          
            //$localStorage.selectedModule = {
            //    Id: Module.SysModID,
            //    ModuleRouteName: Module.ModuleRouteName
            //}
            $localStorage.StudentServices = {
                "ServiceType": ServiceType
            }
            $state.go(Module);
        }

        $scope.SiteViews = 0;
        $scope.websiteCounts = function () {

            var GetWebSiteVisiterCount = AdminService.GetWebSiteVisiterCount();
            GetWebSiteVisiterCount.then(function (response) {


                $scope.SiteViews = response.Table[0].WebsiteVisitedCount;
            },
                function (error) {

                    var err = JSON.parse(error);
                });
        }


        var getNotifications = AdminService.GetNotificationByUser(1017);
        getNotifications.then(function (response) {


            $scope.Notifications = response;
            $scope.websiteCounts();
        },
            function (error) {

                alert("error while loading Notification");
                //alert("error while loading Notification");

                var err = JSON.parse(error);
            });


        var getSlides = PreExaminationService.GetHomePageSlidesActive();
        getSlides.then(function (response) {


            $scope.HomeSlides = response.Table;
          //  $scope.websiteCounts();
        },
            function (error) {

                alert("error while loading Slides");
                //alert("error while loading Notification");

                var err = JSON.parse(error);
            });


        var StudentCounts = PreExaminationService.GetStudentServicesCounts();
        StudentCounts.then(function (response) {

            if (response.Table.length > 0) {
                var res = response.Table[0]
                $scope.BonafiedCount = res.BonafiedCount;
                $scope.DDCCount = res.DDCCount;
                $scope.DMMCount = res.DMMCount;
                $scope.InterimCount = res.InterimCount;
                $scope.MigrationCount = res.MigrationCount;
                $scope.NameCorrectionCount = res.NameCorrectionCount;
                $scope.TranscriptsCount = res.TranscriptsCount;
                $scope.TransferCount = res.TransferCount;

            } else {
                $scope.BonafiedCount = 0;
                $scope.DDCCount = 0;
                $scope.DMMCount = 0;
                $scope.InterimCount = 0;
                $scope.MigrationCount = 0;
                $scope.NameCorrectionCount = 0;
                $scope.TranscriptsCount = 0;
                $scope.TransferCount = 0;
                $scope.loading = false;
                $scope.reports = false;
                $scope.Noreports = true;
            }

        },
            function (error) {
                $scope.BonafiedCount = 0;
                $scope.DDCCount = 0;
                $scope.DMMCount = 0;
                $scope.InterimCount = 0;
                $scope.MigrationCount = 0;
                $scope.NameCorrectionCount = 0;
                $scope.TranscriptsCount = 0;
                $scope.TransferCount = 0;
                $scope.loading = false;
                $scope.reports = false;
                $scope.Noreports = true;
            });

    });
});
