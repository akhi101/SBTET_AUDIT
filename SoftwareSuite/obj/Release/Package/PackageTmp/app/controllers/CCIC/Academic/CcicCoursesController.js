define(['app'], function (app) {
    app.controller("CcicCoursesController", function ($scope, $http, $localStorage, $uibModal, $state, $stateParams, AppSettings, CcicPreExaminationService) {

        var authData = $localStorage.authorizationData;
        $scope.UserName = authData.UserName

        const $ctrl = this;
        $ctrl.$onInit = () => {
            window.scroll({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });

            $scope.AddDetails = '1';
            $scope.UpdateDetails = '0';
            $scope.getCourses();
            $scope.Scheme = 'CC-20';
        }


        var getdists = CcicPreExaminationService.GetCourseDurations();
        getdists.then(function (res) {
            //try {
            //    var Res = JSON.parse(res)
            //}
            //catch (error) {

            //}
            $scope.CourseDurationsData = res;

        }, function (err) {
            $scope.LoadImg = false;
            alert("Error while loading");
        });

        //var getedqual = CcicPreExaminationService.GetCcicEducationQualifications();
        //getedqual.then(function (res) {
        //    //try {
        //    //    var Res = JSON.parse(res)
        //    //}
        //    //catch (error) {

        //    //}
        //    $scope.QualificationsData = res.Table;

        //}, function (err) {
        //    $scope.LoadImg = false;
        //    alert("Error while loading");
        //});


        $scope.ClearData = function () {
            $scope.CourseCode = "";
            $scope.CourseName = "";
            $scope.CourseDuration = null;
            $scope.AddDetails = '1';
            $scope.UpdateDetails = '0';        }

        $scope.getCourses = function () {
            var paramObj = {
                "DataTypeId": 1,
                "CourseID": 0,
                "Active": 0,
            }
            var getcourses = CcicPreExaminationService.GetCourses(paramObj);
            getcourses.then(function (res) {
                try {
                    var Res = JSON.parse(res)
                }
                catch (error) {

                }
                $scope.CoursesTable = Res
            }, function (err) {
                $scope.LoadImg = false;
                alert("Error while loading");
            });
        }



        $scope.changeduration = function (data) {

            $scope.CourseDuration = data;
        }

        $scope.changequalification = function (data) {

            $scope.CourseQualification = data;
        }
        $scope.adddetails = function () {

            if ($scope.CourseCode == null || $scope.CourseCode == undefined || $scope.CourseCode == "") {
                alert("Please Enter Course Code");
                return;
            }

            if ($scope.CourseName == null || $scope.CourseName == undefined || $scope.CourseName == "") {
                alert("Please Enter Course Name");
                return;
            }
           

            if ($scope.CourseDuration == null || $scope.CourseDuration == undefined || $scope.CourseDuration == "") {
                alert("Please Select Course Duration");
                return;
            }


            //if ($scope.CourseQualification == null || $scope.CourseQualification == undefined || $scope.CourseQualification == "") {
            //    alert("Please Select Course Qualification");
            //    return;
            //}

            var paramObj = {
                "DataTypeId": 1,
                "CourseID": 0,
                "Scheme": $scope.Scheme,
                "CourseCode": $scope.CourseCode,
                "CourseName": $scope.CourseName,
                "CourseDuration": $scope.CourseDuration,
                //"CourseQualification": $scope.CourseQualification,
                "Active": 1,
                "UserName": $scope.UserName,       
            }
            $scope.loading = true;

            var addcourses = CcicPreExaminationService.AddCourses(paramObj);
            addcourses.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }

                if (res[0].ResponseCode == '200') {
                    $scope.loading = false;
                    alert(res[0].ResponseDescription);
                    $scope.getCourses();
                    $scope.ClearData();

                } else if (res[0].ResponseCode == '400') {
                    $scope.loading = false;
                    alert(res[0].ResponseDescription);
                    $scope.getCourses();
                    $scope.ClearData();
                }
            },

                function (error) {

                    var err = JSON.parse(error);
                })
        }



        $scope.editCourses = function (data) {


            window.scroll({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
            $scope.AddDetails = '0';
            $scope.UpdateDetails = '1';
            var paramObj = {
                "DataTypeId": 2,
                "CourseID": data.CourseID,
                "Active": data.Active,
            }
            var editcoursedata = CcicPreExaminationService.GetCourses(paramObj);
            editcoursedata.then(function (response) {

                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }

                //$scope.edit = true;
                if (res.length > 0) {
                    $scope.EditCourseData = res;
                    $scope.Noreports = false;

                    $scope.CourseID = res[0].CourseID;
                    $scope.Scheme = res[0].Scheme;
                    $scope.CourseCode = res[0].CourseCode;
                    $scope.CourseName = res[0].CourseName;
                    $scope.CourseDuration = res[0].CourseDuration;
                    $scope.Active = res[0].Active;
                    //$scope.CourseQualification = res[0].CourseQualification;
                    
                }
                else {
                    $scope.EditCourseData = [];
                    $scope.Noreports = true;
                }


            },

                function (error) {
                    alert("error while loading Employee Details");
                    var err = JSON.parse(error);

                });


        }

        $scope.updatedetails = function (data) {

            

            var paramObj = {
                "DataTypeId": 2,
                "CourseID": $scope.CourseID,
                "Scheme": $scope.Scheme,
                "CourseCode": $scope.CourseCode,
                "CourseName": $scope.CourseName,
                "CourseDuration": $scope.CourseDuration,
                "Active": $scope.Active,
                "UserName": $scope.UserName,
            }
            $scope.loading = true;

            var updatecourses = CcicPreExaminationService.UpdateCourses(paramObj);
            updatecourses.then(function (response) {
                try {
                    var res = JSON.parse(response);
                }
                catch (err) { }

                if (res[0].StatusCode == '200') {
                    $scope.loading = false;
                    alert(res[0].StatusDescription);
                    $scope.getCourses();
                    $scope.ClearData();

                } else if (res[0].StatusCode == '400') {
                    $scope.loading = false;
                    alert(res[0].StatusDescription);
                    $scope.getCourses();
                    $scope.ClearData();
                }
            },

                function (error) {

                    var err = JSON.parse(error);
                })
        }


        $scope.SetCourseStatus = function (CourseID, Status) {

            var paramObj = {
                "DataTypeId": 3,
                "CourseID": CourseID,
                "Active": Status,
            }
            var getSlides = CcicPreExaminationService.UpdateCourseStatus(paramObj);
            getSlides.then(function (res) {
                var response = JSON.parse(res)
                if (response[0].ResponseCode == '200') {
                    alert(response[0].ResponseDescription)
                    $scope.getCourses();
                } else if (response[0].ResponseCode == '400') {
                    alert(response[0].ResponseDescription)
                    $scope.getCourses();
                } else {
                    alert("Something Went Wrong")
                }
            },
                function (error) {

                    alert("error while loading Slides");
                    //alert("error while loading Notification");

                    var err = JSON.parse(error);
                });
        }


    })
})