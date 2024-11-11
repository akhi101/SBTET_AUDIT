define(['app'], function (app) {
    app.controller("SemesterDataController", function ($scope, $http, $localStorage, $state, $stateParams, AppSettings, $uibModal, $timeout, PreExaminationService) {
        var authData = $localStorage.authorizationData;
        $scope.UserTypeId = authData.SystemUserTypeId;
        $scope.Pin = localStorage.getItem('MemoPin')
        $scope.SchemeId = localStorage.getItem('MemoScheme')
        $scope.Sem = localStorage.getItem('MemoSem')
        $scope.ExamMonthYear = localStorage.getItem('ExamMonthYear')
        $scope.SemId = localStorage.getItem('MemoSemId')
        $scope.ExamMonthYearId = localStorage.getItem('ExamMonthYearId')
        $scope.ApproveType = $localStorage.CertificateData.ApproveType;
        $scope.NoDetailsScheme = false;
        var data = {};
        $scope.$emit('showLoading', data);

      
        if (($scope.Pin == undefined) || ($scope.Pin == null) || ($scope.Pin == "")) {
            alert("Enter PIN");
            return;
        } else {
            //$scope.Pin = '05001-m-001'
            //$scope.SchemeId=6
            //var semId =9
            //$scope.LoadImg = true;
            $scope.ResultFound = false;
            $scope.ResultNotFound = false;
            var ApproveList = PreExaminationService.getDMMdetails($scope.Pin, $scope.Sem, $scope.ExamMonthYear, $scope.SchemeId);
            ApproveList.then(function (response) {
                try { var response = JSON.parse(response) } catch (err) { }
                $scope.StudentDetails = response.Table1[0];
               
                $scope.Nodata = false;
                $scope.Result = true;
            },
            function (error) {
               
                $scope.Result = false;
                $scope.Data = false;
                $scope.Nodata = true;
                alert("error while loading data");
                //$scope.$emit('hideLoading', data);
            });

            var getmemodetails = PreExaminationService.GETMemoDataByPin($scope.SchemeId, $scope.SemId, $scope.ExamMonthYearId, $scope.Pin);
            getmemodetails.then(function (response) {
                try { var response = JSON.parse(response) } catch (err) { }
                console.log(response)
                if ($scope.SchemeId == 'C16' || $scope.SchemeId == 'C14' || $scope.SchemeId == 'C16S' || $scope.SchemeId == 'C05' || $scope.SchemeId == 'C08' || $scope.SchemeId == 'ER91' || $scope.SchemeId == 'C18' || $scope.SchemeId == 'C09') {
                    $scope.NoDetailsScheme = false;
                   
                    if (response.Table.length > 0) {
                        $scope.$emit('hideLoading', data);
                        $scope.ResultFound = true;
                        $scope.LoadImg = false;
                        $scope.ResultNotFound = false;
                        $scope.memostudData = response.Table[0];
                    } else {
                        $scope.$emit('hideLoading', data);
                        $scope.ResultFound = true;
                        $scope.LoadImg = false;
                        $scope.ResultNotFound = false;
                        $scope.memostudData = [];
                    }
                    //if (response.Table[0].ResponceCode == '200') {
                    //    $scope.ODCstudData = response.Table1[0];
                    //    $scope.newresultDisplayInfo1 = response.Table2;
                    //    $scope.ResultFound = true;
                    //   // $scope.LoadImg = false;
                    //    $scope.ResultNotFound = false;
                    //    $scope.$emit('hideLoading', data);
                    //}
                    //else {
                        
                       
                    //}
                } else {
                    $scope.$emit('hideLoading', data);
                    $scope.NoDetailsScheme = true;
                    $scope.Result = false;
                    var res = $scope.Pin.substring(0, 2);
                    var tempval = angular.uppercase($scope.Pin)
                    var exis = (tempval.includes("CCA") || tempval.includes("CCC") || tempval.includes("CCCM") || tempval.includes("CCEC")
                        || tempval.includes("CCEE") || tempval.includes("CCM") || tempval.includes("CCMET") || tempval.includes("CCPT"));

                    if (res >= 75) {
                        alert("No Details Found for Particular Schemes(C-00,C-96,C-90,NC)");
                        $scope.PinNo = $scope.Pin
                        $scope.result = fa;
                        $scope.OldSudent = true;
                        $scope.NoDataFound = false;
                        $scope.NoData = false;
                      
                    } else if (res <= 04) {
                        alert("No Details Found for Particular Schemes(C-00,C-96,C-90,NC)");
                        $scope.result = true;
                        $scope.OldSudent = true;
                        $scope.PinNo = $scope.Pin
                        $scope.NoDataFound = false;
                        $scope.NoData = false;
                       
                    } else if (res == 05 && exis) {
                        alert("No Details Found for Particular Schemes(C-00,C-96,C-90,NC)");
                        $scope.Data = false;
                        $scope.OldSudent = false;
                        $scope.PinNo = $scope.Pin
                        $scope.NoDataFound = false;
                        $scope.NoData = false;
                       
                    } else {
                        $scope.ODCstudData = [];
                        $scope.Odcmarkstable = [];
                        $scope.ResultFound = false;
                        //   $scope.LoadImg = false;
                        $scope.ResultNotFound = true;
                        $scope.$emit('hideLoading', data);

                    }

                }
                //else {
                //if (response.Table[0].ResponceCode == '200') {
                //    $scope.ODCstudData = response.Table1[0];
                //    $scope.newresultDisplayInfo1 = response.Table2;
                //    $scope.ResultFound = true;
                //    // $scope.LoadImg = false;

                //    $scope.$emit('hideLoading', data);
                //    $scope.ResultNotFound = false;
                //}
                //else {

                //    $scope.ODCstudData = [];
                //    $scope.Odcmarkstable = [];
                //    $scope.ResultFound = false;
                //    // $scope.LoadImg = false;
                //    $scope.$emit('hideLoading', data);
                //    $scope.ResultNotFound = true;

                //}

                //}
            }, function (err) {
                if ($scope.SchemeId == 'C16' || $scope.SchemeId == 'C14' || $scope.SchemeId == 'C16S' || $scope.SchemeId == 'C05' || $scope.SchemeId == 'C08' || $scope.SchemeId == 'ER91' || $scope.SchemeId == 'C18' || $scope.SchemeId == 'C09') {
                    $scope.$emit('hideLoading', data);
                    $scope.ResultFound = false;
                    $scope.NoDetailsScheme = false;
                    $scope.ResultNotFound = false;
                } else {
                    $scope.$emit('hideLoading', data);
                    $scope.ResultFound = false;
                    $scope.NoDetailsScheme = true;;
                    $scope.ResultNotFound = false;
                }
                

            })

        }


        $scope.Verify = function (Semester, ExamMonthYear) {
            if ($scope.SchemeId == 'C-00' || $scope.SchemeId == 'C-96' || $scope.SchemeId == 'C-90' || $scope.SchemeId == 'NC') {
                var Pin=$scope.Pin
            }else{
            
            var Pin = $scope.StudentDetails.Pin
            }
            if ((Pin == null || Pin == '') || ($scope.UserTypeId == null || $scope.UserTypeId == '')) {

                alert("Please Select All Fields")
                return;
            }
            var ApproveStatus = 1
            var verify = PreExaminationService.DMM_SetVerifyStatus(Pin, $scope.UserTypeId, $scope.Sem, $scope.ExamMonthYear);

            verify.then(function (response) {

                console.log(response)
                var response = JSON.parse(response)
                try { var response = JSON.parse(response); } catch (err) { }
                if (response.Table[0].ResponseCode == '200') {
                    alert(response.Table[0].ResponseDescription)
                    $state.go('Dashboard.PostExam.MarksMemoApprovalDetails')
                    //$state.go('Dashboard.PostExam.TcApprovalList');
                    //$scope.ApproveListDetails()

                } else if (response.Table[0].ResponseCode == '400') {
                    alert(response.Table[0].ResponseDescription)
                    $state.go('Dashboard.PostExam.MarksMemoApprovalDetails')
                    // $state.go('Dashboard.PostExam.TcApprovalList');
                    //$scope.closeModal()
                    //$scope.ApproveListDetails()
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