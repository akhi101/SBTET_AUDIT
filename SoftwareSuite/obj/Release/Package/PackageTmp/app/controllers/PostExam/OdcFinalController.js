define(['app'], function (app) {
    app.controller("OdcFinalController", function ($scope, $http, $localStorage, $state, $stateParams, AppSettings, $uibModal, $timeout, PreExaminationService) {
        var authData = $localStorage.authorizationData;
        $scope.UserTypeId = authData.SystemUserTypeId;
        var dupData = $localStorage.DupOdc
        $scope.Pin = dupData.pin
        $scope.Scheme = dupData.Scheme
        $scope.Branch = dupData.Branch
        $scope.Date = new Date()
       
        //$scope.Branch = 'M'
        //$scope.Pin = '16001-M-001';
        //$scope.Scheme = 'C05';
       // $scope.Branch = 'M';
        //$scope.Name = "Koppula Parameshwari";
        //$scope.father = "Koppula Bala Chandra Maha Raju";
        //$scope.year = "3 Years full-time";
        //$scope.College = "Jagruthi Institute of Engg & Technology-Ibrahimpatnam,Ranga Reddy";
        //$scope.branch = "Electrical and Electronics Engineering";
        //$scope.MonthYear = "MAR/APR 2018";
        //$scope.pin = "15497-EE-037";
        //$scope.class = "First Class(Distin)";
        //$scope.mydate = "thirtyfirst";
        //$scope.myMonth = "May";
       // $scope.TrainingDuration = 'Six Months'

        //var PINjson=[{"PIN":'16001-m-001'}]

        //var GetDuplicateODCTobeSignedlocation = PreExaminationService.GetDuplicateODCTobeSignedlocation(PINjson)
        //GetDuplicateODCTobeSignedlocation.then(function (response) {
        //    var location = window.location.origin;
        //      if (location == "https://sbtet.telangana.gov.in" || location == "https://www.sbtet.telangana.gov.in") {
        //        location += "/API/"
        //    } else {
        //        location += "/"
        //    }
        //    console.log(response)
        //    var responseurl = location + "api/StudentCertificate/StoreSignedCertificate";
        //    console.log(responseurl)
           
        //}, function (err) {
        //    $scope.btndisable = false;
        //    $scope.buttonlabel = "Approve";
        //});

        //$scope.Marks = [
        //   { "Exam": "I Year", "max_marks": "1000", "marks_secured": "914", "figures": "228 (25%)", "words": "TWO TWO Eight" },
        //   { "Exam": "III Semester", "max_marks": "1000", "marks_secured": "914", "figures": "914 (100%)", "words": "Nine One Four" },
        //   { "Exam": "IV Semester", "max_marks": "1000", "marks_secured": "882", "figures": "882 (100%)", "words": "Eight Eight TWO " },
        //   { "Exam": "V Semester", "max_marks": "1000", "marks_secured": "914", "figures": "940 (100%)", "words": "Nine Four Zero" },
        //       { "Exam": "V Semester", "max_marks": "1000", "marks_secured": "914", "figures": "940 (100%)", "words": "Nine Four Zero" },
        //   { "Exam": "VI Semester", "max_marks": "1000", "marks_secured": "915", "figures": "915 (100%)", "words": "Nine One Five" },


        //]
        var data = {};
        $scope.$emit('showLoading', data);
        //$scope.Branch = 'MT';

        if ($scope.Branch == 'MT' || $scope.Branch == 'LT' || $scope.Branch == 'FT') {
            $scope.Subjects = true;
            $scope.Subjects1 = false;
        } else {
            $scope.Subjects = false;
            $scope.Subjects1 = false;
            $scope.Subjects2 = false;
            $scope.Subjects4 = true;
        }

        //try {
        //    $scope.Certificate = $localStorage.certData.Certificate
        //    $scope.PIN = $localStorage.certData.pin

        //} catch (err) {
        //}
        //$scope.Pin ='16001-m-001'
        //$scope.Pin = localStorage.getItem('GenuinePin')

        $scope.PrintData = function () {
            
            var Print = PreExaminationService.SetSignedDate($scope.Pin);
            Print.then(function (response) {
            $scope.Printed()
                window.print();
                console.log(response)
            },
        function (error) {
           
        })
        }

        var ApproveList = PreExaminationService.getDuplicateODCDetails($scope.Pin);
        ApproveList.then(function (response) {
            var response = JSON.parse(response)
            console.log(response);
            if (response.Table[0].ResponceCode == '200') {
                $scope.StudentData = response.Table1[0];

                $scope.markstable = response.Table2;
                $scope.$emit('hideLoading', data);
                $scope.Data = true
            } else if (response.Table[0].ResponceCode == '400') {
                $scope.$emit('hideLoading', data);
                $scope.Data = false
                alert(response.Table[0].ResponceDescription)
               // $state.go('Dashboard.PostExam.StudentCertificateApproveList');
            } else {
                $scope.$emit('hideLoading', data);
                $scope.Data = false
             //   $state.go('Dashboard.PostExam.StudentCertificateApproveList');
            }
        },
        function (error) {
            //$scope.$emit('hideLoading', data);
            $scope.$emit('hideLoading', data);
            $scope.Data = false;
            $scope.Nodata = true;
            alert("error while loading data");
           // $state.go('Dashboard.PostExam.StudentCertificateApproveList');
        });
        
        $scope.Printed = function (Pin) {
            if (($scope.Pin == null || $scope.Pin == '' || $scope.Pin == undefined) || ($scope.UserTypeId == null || $scope.UserTypeId == '' || $scope.UserTypeId == undefined)) {

                alert("Please Select All Fields")
                return;
            }
            var ApproveStatus = 1
            var verify = PreExaminationService.Odc_SetPrinted($scope.Pin, $scope.UserTypeId);

            verify.then(function (response) {

                //console.log(response)
                var response = JSON.parse(response)
                try { var response = JSON.parse(response); } catch (err) { }
                if (response.Table[0].ResponseCode == '200') {
                    // alert(response.Table[0].ResponseDescription)
                    //$scope.closeModal()
                    //$state.go('Dashboard.PostExam.TcApprovalList');
                    //$scope.ApproveListDetails()

                } else if (response.Table[0].ResponseCode == '400') {
                    alert(response.Table[0].ResponseDescription)
                    // $state.go('Dashboard.PostExam.TcApprovalList');

                }
                else {
                    //$scope.$emit('hideLoading', data);
                    $scope.Data = false;
                    $scope.Nodata = true;
                }
                //alert("Success")

            },
       function (error) {
           //$scope.$emit('hideLoading', data);

           $scope.Data = false;
           $scope.Nodata = true;
           alert("error while loading data");
       });
        }

    })
})

