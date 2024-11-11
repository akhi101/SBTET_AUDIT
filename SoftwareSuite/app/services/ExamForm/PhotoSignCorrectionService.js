define(['app'], function (app) {
    app.service("PhotoSignCorrectionService", function (DataAccessService) {

        this.GetPhotoSignAtDIEO = function (PRNNo, LoggedUserId) {
            var paramObject = { "strPRNNo": PRNNo, "intLoggedUserId": LoggedUserId };
            var promise = DataAccessService.getDataWithPara('api/ExamForms/GetPhotoSignAtDIEO', paramObject);
            return promise;
        }


        this.AddPhotoSignAtDIEO = function (object) {
            var promise = DataAccessService.postData('api/ExamForms/AddPhotoSignAtDIEO', object); //PutExamForms
            return promise;
        }

        //this.AddExamFormsCorrectionApproval = function (object) {
        //    var promise = DataAccessService.postData('api/ExamForms/PostInsertExamFormsCorrectionApproval', object); //PutExamForms
        //    return promise;
        //}

        //this.UpdateExamFormsCorrection = function (object) {
        //    var promise = DataAccessService.postData('api/ExamForms/PostUpdateExamFormsCorrection', object);
        //    return promise;
        //}
        
        //this.PostCoorectionApprovalForms = function (object) {
        //    var promise = DataAccessService.postData('api/ExamForms/PostCoorectionApprovalForms', object);
        //    return promise;
        //}
        //this.DeleteExamForms = function (ExmFrmID, UpdLoginID) {
        //    var paramObject = { "ExmFrmID": ExmFrmID, "UpdLoginID": UpdLoginID };
        //    var promise = DataAccessService.deleteData('api/ExamForms/DeleteExamFormsCorrection', paramObject);
        //    return promise;
        //}
        //this.GetExamFormsList = function (ExamInstID, CollegeID, CourseID, ExamID, BranchID) {
        //    var paramObject = { "ExamInstID": ExamInstID, "CollegeID": CollegeID, "CourseID": CourseID, "ExamID": ExamID, "BranchID": BranchID };
        //    var promise = DataAccessService.getDataWithPara('api/ExamForms/GetExamFormsList', paramObject);
        //    return promise;
        //}
        //this.GetExamFormDataByPrnNoForCorrection = function (PRNNo, ExamInstID, CollegeID) {
        //    var paramObject = { "PRNNo": PRNNo, "ExamInstID": ExamInstID, "CollegeID": CollegeID };
        //    var promise = DataAccessService.getDataWithPara('api/ExamForms/GetExamFormDataByPrnNoForCorrection', paramObject);
        //    return promise;
        //}
        //this.GetExamFormDataByPrnNoForCorrectionInCorrectionForm = function(PRNNo, ExamInstID, CollegeID) {
        //    var paramObject = { "PRNNo": PRNNo, "ExamInstID": ExamInstID, "CollegeID": CollegeID };
        //    var promise = DataAccessService.getDataWithPara('api/ExamForms/GetExamFormDataByPrnNoForCorrectionInCorrectionForm', paramObject);
        //    return promise;
        //}
        //this.GetExamFormsCorrectionApprovalList = function (ExamInstID, CollegeID, CourseID, ExamID, User) {
        //    var paramObject = {
        //        "ExamInstID": ExamInstID, "CollegeID": CollegeID, "CourseID": CourseID, "ExamID": ExamID, "User": User };
        //    var promise = DataAccessService.getDataWithPara('api/ExamForms/GetExamFormsCorrectionApprovalList', paramObject);
        //    return promise;
        //}
        //this.GetBasicBranchListForRegStud = function (CourseID, CollegeID) {
        //    var paramObject = { "CourseID": CourseID, "CollegeID": CollegeID };
        //    var promise = DataAccessService.getDataWithPara('api/BasicMainGroup/GetBasicBranchListForRegStud', paramObject);
        //    return promise;
        //}
        //this.GetBasicBranchListByCourseID = function (CourseID) {
        //    var paramObject = { "CourseID": CourseID };
        //    var promise = DataAccessService.getDataWithPara('api/BasicBranch/GetBasicBranchListByCourseID', paramObject);
        //    return promise;
        //}
        //this.GetStudCatList = function (ExamID) {
        //    var paramObject = { "ExamID": ExamID };
        //    var data = DataAccessService.getDataWithPara('api/ExamForms/GetNRStudCatList', paramObject);
        //    return data;
        //}

        //this.GetStudCourseList = function (CollegeID) {
        //    //var data = DataAccessService.getDataAll('api/ExamForms/GetStudCourseList');
        //    var paramObject = { "CollegeID": CollegeID };
        //    var data = DataAccessService.getDataWithPara('api/ExamForms/GetStudCourseListByCollegeID', paramObject);
        //    return data;
        //}

        //this.GetBasicSubjectListForSecondLangauge = function () {
        //    var data = DataAccessService.getDataAll('api/BasicSubject/GetBasicSubjectListForSecondLangauge');
        //    return data;
        //}

        //this.GetBasicSubjectListForSecondLangaugeNR = function (CourseID) {
        //    var paramObject = { "CourseID": CourseID };
        //    var data = DataAccessService.getDataWithPara('api/BasicSubject/GetBasicSubjectListForSecondLangaugeNR', paramObject);
        //    return data;
        //}

        //this.GetBasicSubjectListForSecondLangaugeInRegStud = function (CollegeID, CourseID, AcdYrID) {
        //    var paramObject = { "CollegeID": CollegeID, "BranchID": 0, "CourseID": CourseID, "AcdYrID": AcdYrID };
        //    var promise = DataAccessService.getDataWithPara('api/BasicMainGroup/GetBasicSubjectListForSecondLangaugeInRegStud', paramObject);
        //    return promise;
        //}
        //this.GetPRNDataList = function (PRNNo) {
        //    var paramObject = { "PRNNo": PRNNo };
        //    var promise = DataAccessService.getDataWithPara('api/BasicBranch/GetPRNDataList', paramObject);
        //    return promise;
        //}
        //this.GetMainGroupListByCollegeId = function (CollegeID, CourseID, AcdYrID) {
        //    var paramObject = { "CollegeID": CollegeID, "CourseID": CourseID, "AcdYrID": AcdYrID };
        //    var promise = DataAccessService.getDataWithPara('api/ExamForms/GetMainGroupListByCollegeId', paramObject);
        //    return promise;
        //}
        //this.GetAcademicYearFeesByCode = function (FeesCode) {
        //    var paramObject = { "FeesCode": FeesCode };
        //    var promise = DataAccessService.getDataWithPara('api/AcademicYearFees/GetAcademicYearFeesByCode', paramObject);
        //    return promise;
        //}
        //this.GetAcademicYearFeesByDate = function (object) {
        //    var promise = DataAccessService.getDataWithPara('api/ExamForms/GetAcademicYearFeesByDate', object);
        //    return promise;
        //}
        //this.GetGroupSubjects = function (MainGrpID, ExamID) {
        //    var paramObject = { "MainGrpID": MainGrpID, "ExamID": ExamID };
        //    var promise = DataAccessService.getDataWithPara('api/ExamForms/GetGroupSubjects', paramObject);
        //    return promise;
        //}
        //this.GetCourseListForRegStud = function (CollegeID, AcdYrID) {
        //    var paramObject = { "CollegeID": CollegeID, "AcdYrID": AcdYrID };
        //    var promise = DataAccessService.getDataWithPara('api/ExamForms/GetCourseListForRegStud', paramObject);
        //    return promise;
        //}
        //this.GetBasicExamList = function (CourseID) {
        //    var paramObject = { "CourseID": CourseID };
        //    var promise = DataAccessService.getDataWithPara('api/BasicExam/GetBasicExamListByCourseID', paramObject);
        //    return promise;
        //}
        //this.GetCheckPRNNoPresent = function (PRNNo, ExamInstID) {
        //    var paramObject = { "PRNNo": PRNNo, "ExamInstID": ExamInstID };
        //    var promise = DataAccessService.getDataWithPara('api/ExamForms/GetCheckPRNNoPresent', paramObject);
        //    return promise;
        //}
        //this.GetPhysDisbList = function () {
        //    var data = DataAccessService.getDataAll('api/BasicPhysDisability/GetBasicPhysDisabilityList');
        //    return data;
        //}
        //this.GetSpclConsList = function () {
        //    var data = DataAccessService.getDataAll('api/BasicSpclConsiderations/GetBasicSpclConsiderationsList');
        //    return data;
        //}
        //this.GetCurrExmInstSchedule = function (ExamInstID, ExamID) {
        //    var paramObject = {
        //        "ExamInstID": ExamInstID, "ExamID": ExamID
        //    };
        //    var promise = DataAccessService.getDataWithPara('api/ExamForms/GetCurrExmInstSchedule', paramObject);
        //    return promise;
        //}
        //this.GetCurretnExamInst = function (AcdYrID) {
        //    var paramObject = { "AcdYrID": AcdYrID };
        //    var promise = DataAccessService.getDataWithPara('api/ExamForms/GetCurretnExamInst', paramObject);
        //    return promise;
        //}
        
        //this.GetCheckUnStudCase = function (PRNNo, ApplicationDate, ExamInstID) {
        //    var paramObject = { "PRNNo": PRNNo, "ApplicationDate": ApplicationDate, "ExamInstID": ExamInstID };
        //    var promise = DataAccessService.getDataWithPara('api/UnfStudCases/GetCheckUnStudCase', paramObject);
        //    return promise;
        //}
        ////this.GetStudCatList = function () {
        ////    var data = DataAccessService.getDataAll('api/ExamForms/GetStudCatList');
        ////    return data;
        ////}
        //this.GetInstScheduleDate = function (ExamInstID, ApplicationDate) {
        //    var paramObject = { "ExamInstID": ExamInstID, "ApplicationDate": ApplicationDate };
        //    var promise = DataAccessService.getDataWithPara('api/ExamForms/GetInstScheduleDate', paramObject);
        //    return promise;
        //}
        //this.GetSSCHallTicketNoAndInsertIntoPrestudent = function (PRNNo) {
        //    var paramObject = { "PRNNo": PRNNo };
        //    var promise = DataAccessService.getDataWithPara('api/ExamForms/GetSSCHallTicketNoAndInsertIntoPrestudent', paramObject);
        //    return promise;
        //}
        //this.GetPrnNoCountInPrestudentReg = function (PRNNo) {
        //    var paramObject = { "PRNNo": PRNNo };
        //    var promise = DataAccessService.getDataWithPara('api/ExamForms/GetPrnNoCountInPrestudentReg', paramObject);
        //    return promise;
        //}
        //this.GetcheckstudPassOrNot = function (PRNNo, ExamInstID, CollegeID, CourseID, ExamID, BranchID) {
        //    var paramObject = { "PRNNo": PRNNo, "ExamInstID": ExamInstID, "CollegeID": CollegeID, "CourseID": CourseID, "ExamID": ExamID, "BranchID": BranchID };
        //    var promise = DataAccessService.getDataWithPara('api/ExamForms/GetcheckstudPassOrNot', paramObject);
        //    return promise;
        //}
        //this.GetAcademicYearFeesByDateForBridge = function (ExamInstID, ExamID) {
        //    var paramObject = { "ExamInstID": ExamInstID, "ExamID": ExamID };
        //    var promise = DataAccessService.getDataWithPara('api/ExamForms/GetAcademicYearFeesByDateForBridge', paramObject);
        //    return promise;
        //}
        //this.GetGetSecLangLimitByCollegeID = function (SubCode, CollegeID) {
        //    var paramObject = { "SubCode": SubCode, "CollegeID": CollegeID };
        //    var promise = DataAccessService.getDataWithPara('api/ExamForms/GetGetSecLangLimitByCollegeID', paramObject);
        //    return promise;
        //}
        
        //this.GetExamFormDataByPreStudRegIDForApproval = function (PreStudRegID, ExamInstID, CollegeID) {
        //    var paramObject = { "PreStudRegID": PreStudRegID, "ExamInstID": ExamInstID, "CollegeID": CollegeID };
        //    var promise = DataAccessService.getDataWithPara('api/ExamForms/GetExamFormDataByPreStudRegIDForApproval', paramObject);
        //    return promise;
        //}

        //this.GetCommunityList = function () {
        //    var data = DataAccessService.getDataAll('api/BasicCommunity/GetBasicCommunityList');
        //    return data;
        //}

        //this.GetCasteList = function () {
        //    var data = DataAccessService.getDataAll('api/BasicCaste/GetBasicCasteList');
        //    return data;
        //}

        //this.GetSubCastListByCasteID = function (CasteId) {
        //    var paramObject = { "CasteId": CasteId };
        //    var promise = DataAccessService.getDataWithPara('api/BasicSubCaste/GetSubCastListByCasteID', paramObject);
        //    return promise;
        //}




        //this.GetBasicMediumList = function (CollegeID) {
        //    var paramObject = { "CollegeID": CollegeID };
        //    var data = DataAccessService.getDataWithPara('api/ReqMediumChange/GetBasicMediumListByCollegeIdGrpName', paramObject);
        //    return data;
        //}

        //this.GetBasicMediumListNew = function (CollegeID, MainGrpID) {
        //    var paramObject = { "CollegeID": CollegeID, "MainGrpName": MainGrpID };
        //    var data = DataAccessService.getDataWithPara('api/ReqMediumChange/GetBasicMediumListByCollegeIdGrpName', paramObject);
        //    return data;
        //}

        //this.GetExamFormsCorrectionBill = function (PreStudRegID) {
        //    var paramObject = { "PreStudRegID": PreStudRegID };
        //    var promise = DataAccessService.getDataWithPara('api/ExamForms/GetExamFormsCorrectionBill', paramObject);
        //    return promise;
        //}
    });
});