define(['app'], function (app) {
    app.controller("StudentFeedbackController", function ($scope, $http, $localStorage, $state, $stateParams, AppSettings, AcademicService) {
      
        $scope.hideinput = false;
       
        $scope.dataTable = false;
        var temppositionarr = [];

        $scope.generateOtp = function () {
            if (($scope.userPin == undefined) || ($scope.userPin == "0") || ($scope.userPin == "")) {
                alert("Enter PIN");
                return false;
            }
            if (($scope.FeedbacktypeId == undefined) || ($scope.FeedbacktypeId == null) || ($scope.FeedbacktypeId == "")) {
                alert("Enter Feedback type");
                return false;
            }
           // $scope.loading = true;

            var generateOtp = AcademicService.GenerateOtpForFeedback($scope.userPin, $scope.FeedbacktypeId)
            generateOtp.then(function (response) {
                try {
                    var detail = JSON.parse(response);
                } catch (err) {
                    alert();
                }
              
              
                if (detail.status == '200') {
                    alert(detail.description);
                    $scope.otpsent = true;
                    $scope.loading = false;
                } else {
                    alert(detail.description);
                    $scope.otpsent = false;
                    $scope.loading = false;
                }
               
            },
                function (error) {
                    $scope.loading = false;
                    console.log(error)
                })

        } 

        $scope.getDetails = function () {
            $scope.loading = true;
            if (($scope.FeedbacktypeId == undefined) || ($scope.FeedbacktypeId == null) || ($scope.FeedbacktypeId == "")) {
                alert("Enter Feedback type");
                return false;
            }
            if (($scope.userPin == undefined) || ($scope.userPin == "0") || ($scope.userPin == "")) {
                alert("Enter PIN");
                return false;
            }
            if (($scope.userOtp == undefined) || ($scope.userOtp == "0") || ($scope.userOtp == "")) {
                alert("Enter OTP received");
                return false;
            }
            var getFacultyData = AcademicService.GetFacultyData($scope.userPin, $scope.FeedbacktypeId, angular.uppercase($scope.userOtp));
            getFacultyData.then(function (response) {
                try {
                    var response = JSON.parse(response);
                } catch (err) { }
               
               
                if (response.Table[0].StatusCode == 200 ) {
                    if (response.Table2.length > 0) {
                        if ($scope.userOtp === response.Table[0].OTP) {
                            $scope.StudentData = [];
                            $scope.SubjectList = [];
                            $scope.FeedBackDescriptions = [];
                            $scope.hideinput = true;
                            $scope.dataTable = true;
                            $scope.loading = false;
                            $scope.StudentData = response.Table1[0];
                            $scope.SubjectList = response.Table2;
                            $scope.FeedBackDescriptions = response.Table3;
                        } else {
                            alert("OTP Mismatch")
                        }
                    } else {
                        alert("Faculty Data Not Found");
                        $scope.StudentData = [];
                        $scope.SubjectList = [];
                        $scope.FeedBackDescriptions = [];
                        $scope.hideinput = false;
                        $scope.dataTable = false;
                        $scope.loading = false;
                    }
                } else {
                    alert(response.Table[0].StatusDescription);
                    $scope.StudentData = [];
                    $scope.SubjectList = [];
                    $scope.FeedBackDescriptions = [];
                    $scope.hideinput = false;
                    $scope.dataTable = false;
                    $scope.loading = false;
                }
                for (let i = 0; i < $scope.FeedBackDescriptions.length;i++) {
                    for (let j = 0; j < $scope.SubjectList.length; j++){
                        temppositionarr.push((i + 1).toString() + (j+1).toString());
                    }
                }
              
                $scope.requiredLength = $scope.FeedBackDescriptions.length * $scope.SubjectList.length
           
               
            },
                function (error) {
                $scope.hideinput = false;
                $scope.loading = false;
                console.log(error)
            })
        }
        //-----------------------get available feedbacks for dropdown ------------------
        var GetAvailableFeedbacks = AcademicService.GetAvailableFeedbacks();
        GetAvailableFeedbacks.then(function (res) {
            try {
                var res = JSON.parse(res);
            } catch (err) { }
          
            $scope.AvailableFeedbacks = res.Table;           
            },
            function (error) {               
                var err = JSON.parse(error);
                console.log(err.Message);

            });

        //$scope.LoadDescriptions = function (FeedbacktypeId) {
        //    var GetDescription = AcademicService.GetDescription(FeedbacktypeId);
        //    GetDescription.then(function (response) {

        //        $scope.FeedBackDescriptions = response.Table;
            
        //        //if ($scope.FaculityDetailes.length > 0) {
        //        //    $scope.FaculityDetailes = $scope.FaculityDetailes.map((obj) => {
        //        //        // if (obj.id == Id) {
        //        //        // obj.Description = description;

        //        //        obj.Radio = [];
        //        //        obj.Radio = $scope.avaexamdates;

        //        //        // }
        //        //        return obj;
        //        //    });
        //        //}

               

        //    },
        //        function (error) {

        //            var err = JSON.parse(error);
        //            console.log(err.Message);

        //        });
        //}
               
       
        var tempId = [];
        var StudentFeddBack = [];     

      

        $scope.RadioChange = function (SubId, Score, DescriptionId, position) {
            if ($("#" + position).hasClass("highlight") ) {
                $("#" + position).removeClass('highlight');
            }
           
          
            if (StudentFeddBack.length == '0') {               
                var marksdata = $scope.pushData(DescriptionId, Score, SubId, position);
                StudentFeddBack.push(marksdata);
                tempId.push(position);              

            } else if (StudentFeddBack.length > 0) {
                //tempId = [];
                StudentFeddBack.map((obj) => {
                    if (obj.position == position) {                      
                        obj.Score = Score;                       
                        obj.DescriptionId = DescriptionId;
                        obj.SubId = SubId
                    }
                    else if (obj.position != position && !tempId.includes(position)) {
                        var StudentFedd = $scope.pushData(DescriptionId, Score, SubId, position);
                        tempId.push(position);
                        StudentFeddBack.push(StudentFedd);

                     }

                });

            }

         
            temppositionarr = temppositionarr.filter(function (item) {
                return !tempId.includes(item);
            });

                   
                    
            StudentFeddBack.forEach(function (item) { delete item.position });

        }
        
        $scope.Savedata = function () {
            if ($scope.requiredLength == StudentFeddBack.length) {
               
                var SaveStdentFeddback = AcademicService.SetFeedbackData($scope.StudentData.PIN, $scope.StudentData.CollegeCode, $scope.StudentData.BranchID, $scope.StudentData.SchemeId, $scope.StudentData.SemID, $scope.FeedbacktypeId, JSON.stringify(StudentFeddBack))
                SaveStdentFeddback.then(function (response) {
                    if (response.Table.length >0) {
                        if (response.Table[0].StatusCode == '200') {
                            alert("Feedback Submitted Successfully");
                        } else {
                            alert("Somthing went wrong");
                        }

                        $scope.hideinput = false;
                        window.location.reload();
                    }
                   

                },
                         function (error) {
                             alert("Somthing went wrong");
                             var err = JSON.parse(error);
                            
                         });

            } else {
                alert("Please Submit feedback for all Subjects");

               
                $('html, body').animate({
                    'scrollTop': $("#" + temppositionarr[0]).first().offset().top
                });
                temppositionarr.forEach(ele => $("#" + ele).addClass('highlight'));
               
            }

        }
       
       
        $scope.pushData = function (DescriptionId, Score, SubId, position) {
            return {
                "DescriptionId": DescriptionId,
                "Score": parseInt(Score),
                "SubId": SubId,               
                "position": position

            };
        }
       

    });

});