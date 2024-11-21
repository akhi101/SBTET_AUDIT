define(['app'], function (app) {
    app.service("TCAdmissionRequestService", function (DataAccessService) {
        this.GetTCAdmissionRequestByHTNo = function (SSCHallTicket, CourseID, ExamID, ColCode) {
            var paramObject = { "HallTicket": SSCHallTicket, "CourseID": CourseID, "ExamID": ExamID, "ColCode": ColCode };
            var promise = DataAccessService.getDataWithPara('api/ReqTCAdmission/GetStudentInfoByHTNo', paramObject);
            return promise;
        }

        this.CheckSecondLanguageExist = function (SecLangID, CollegeID) {
            var paramObject = { "SecLangID": SecLangID, "CollegeID": CollegeID };
            var promise = DataAccessService.getDataWithPara('api/ReqStudySecondLanguage/CheckSecondLanguageExist', paramObject);
            return promise;
        }

        this.GetVocGen = function (CollegeID) {
            var paramObject = { "CollegeID": CollegeID };
            var promise = DataAccessService.getDataWithPara('api/ReqReAdmission/GetVocGen', paramObject);
            return promise;
        }

        this.AddTCAdmissionRequest = function (object) {
            var promise = DataAccessService.postData('api/ReqTCAdmission/PostReqTCAdmissionRequest', object);
            return promise;
        }
        this.GetMediumList = function (CollegeID, MainGrpName, OldMediumID) {
            var paramObject = { "CollegeID": CollegeID, "MainGrpName": MainGrpName, "MediumID": OldMediumID };
            var data = DataAccessService.getDataWithPara('api/ReqMediumChange/GetBasicMediumListByCollegeIdGrpName', paramObject);
            return data;
        }
        this.GetMediumListByMediumID = function (CollegeID, MainGrpName) {
            var paramObject = { "CollegeID": CollegeID, "MainGrpName": MainGrpName };
            var data = DataAccessService.getDataWithPara('api/ReqMediumChange/GetBasicMediumListByCollegeIdGrpName', paramObject);
            return data;
        }
        this.GetSecondLanguageList = function (SubjectID) {
            var paramObject = { "OldSecondLanguageID":SubjectID };
            var data = DataAccessService.getDataWithPara('api/BasicSubject/GetBasicSubjectListForSecondLangauge', paramObject);
            return data;
        }
        this.GetAcademicYearFeesByCode = function (FeesCode) {
            var paramObject = { "FeesCode": FeesCode };
            var promise = DataAccessService.getDataWithPara('api/AcademicYearFees/GetAcademicYearFeesByCode', paramObject);
            return promise;
        }

        this.GetCollegeDistrictByCollegeID = function (CollegeID) {
            var paramObject = { "CollegeID": CollegeID };
            var promise = DataAccessService.getDataWithPara('api/BasicCollege/GetCollegeDistrictByCollegeID', paramObject);
            return promise;
        }

        this.GetMainGroupListByYear = function (BranchID, MainGrpID, EditYear) {
            var paramObject = { "BranchID": BranchID, "MainGrpID": MainGrpID, "EditYear": EditYear};
            var promise = DataAccessService.getDataWithPara('api/ReqTCAdmission/GetMainGroupListByYear', paramObject);
            return promise;
        }
        this.GetMainGrpList = function (CollegeID, CourseID, BranchID, MainGrpID, ExamID) {
            var paramObject = { "CollegeID": CollegeID, "CourseID": CourseID, "BranchID": BranchID, "MainGrpID": MainGrpID, "EditYear": ExamID };
            var data = DataAccessService.getDataWithPara('api/ReqGroupChange/GetMainGroupListByYear', paramObject);
            return data;
        }
        this.GetDataByFormNo = function (FormNo) {
            var paramObject = { "FormNo": FormNo };
            var promise = DataAccessService.getDataWithPara('api/ReqTCAdmission/GetReApplyDataByFormNo', paramObject);
            return promise;
        }
    });
});