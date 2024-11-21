define(['app'], function (app) {
    app.service("AttendanceExemptionService", function (DataAccessService) {
        this.GetPreStudentInfoByHTNo = function (HTNO, PassingMonth, PassingYear, SelectYear, BoardID) {
            var paramObject = {"HTNO": HTNO, "PassingMonth": PassingMonth, "PassingYear": PassingYear, "SelectYear": SelectYear, "BoardID": BoardID };
            var promise = DataAccessService.getDataWithPara('api/ReqAttendanceExemption/GetPreStudentInfoByHTNO', paramObject);
            return promise;
        }
        this.GetStudentOptionInfo = function (HTNO, PassingMonth, PassingYear, selectedOption) {
            var paramObject = {
                "HTNO": HTNO, "PassingMonth": PassingMonth, "PassingYear": PassingYear, "selectedOption": selectedOption};
            var promise = DataAccessService.getDataWithPara('api/ReqAttendanceExemption/GetStudentOptionInfo', paramObject);
            return promise;
        }

        this.GetBoardLocationByBoardID = function (BoardID) {
            var paramObject = { "BoardID": BoardID };
            var promise = DataAccessService.getDataWithPara('api/BasicBoard/GetBasicBoardByID', paramObject);
            return promise;
        }
        //Get Board List
        this.GetBoardList = function () {
            var data = DataAccessService.getDataAll('api/BasicBoard/GetBasicBoardList');
            return data;
        }
        //Get Fee
        this.GetAcademicYearFeesByBoardID = function (BoardID, FeeCode) {
            var paramObject = { "BoardID": BoardID, "FeeCode": FeeCode };
            var promise = DataAccessService.getDataWithPara('api/ReqAttendanceExemption/GetAcademicYearFeesByBoardID', paramObject);
            return promise;
        }
        this.GetAcademicYearFeesByCode = function (FeesCode) {
            var paramObject = { "FeesCode": FeesCode };
            var promise = DataAccessService.getDataWithPara('api/AcademicYearFees/GetAcademicYearFeesByCode', paramObject);
            return promise;
        }
        this.GetDistrictList = function () {
            var data = DataAccessService.getDataAll('api/ReqAttendanceExemption/GetBasicDistrictList');
            return data;
        }
        this.GetMediumList = function () {
            var data = DataAccessService.getDataAll('api/ReqAttendanceExemption/GetBasicMediumList');
            return data;
        }
        this.GetSecondLangList = function () {
            var data = DataAccessService.getDataAll('api/ReqAttendanceExemption/GetBasicSecondLangList');
            return data;
        }
        //Insert
        this.AddAttendanceExemption = function (object) {
            var promise = DataAccessService.postData('api/ReqAttendanceExemption/PostAttendanceExemption', object);
            return promise;
        }  
        this.GetMainGroupByArts = function () {
            var data = DataAccessService.getDataAll('api/ReqAttendanceExemption/GetBasicMainGroupByArts');
            return data;
        }
        this.GetEnglishPaperIIGen = function () {
            var data = DataAccessService.getDataAll('api/ReqAttendanceExemption/GetEnglishPaperIIGeneral');
            return data;
        }
        this.GetEnglishPaperIIVoc = function () {
            var data = DataAccessService.getDataAll('api/ReqAttendanceExemption/GetEnglishPaperIIVocational');
            return data;
        }
        this.GetGroupIDByGroupName = function (HTNO, ExamID, MainGrpIDNew1, BranchID, YesORNo) {
            var paramObject = { "rollno": HTNO, "examId": ExamID, "groupid": MainGrpIDNew1, "currentbranchid": BranchID, "previousperformance": YesORNo };
            var promise = DataAccessService.getDataWithPara('api/ReqAttendanceExemption/GetGroupIDByGroupName', paramObject);
            return promise;
        }
      
        
        //this.GetCounterSignatureByHTNo = function (HTNO) {
        //    var paramObject = { "HallTicket": HTNO };
        //    var promise = DataAccessService.getDataWithPara('api/ReqCounterSignature/GetReqCountSignByHTNo', paramObject);
        //    return promise;
        //}
        //this.AddCounterSignature = function (object) {
        //    var promise = DataAccessService.postData('api/ReqCounterSignature/PostReqCounterSignature', object);
        //    return promise;
        //}
        //this.GetAcademicYearFeesByCode = function (FeesCode) {
        //    var paramObject = { "FeesCode": FeesCode };
        //    var promise = DataAccessService.getDataWithPara('api/AcademicYearFees/GetAcademicYearFeesByCode', paramObject);
        //    return promise;
        //}
        //this.GetStateList = function () {
        //    var data = DataAccessService.getDataAll('api/BasicState/GetBasicStateList');
        //    return data;
        //}
        //this.GetPreStudentInfo = function (HTNO) {
        //    var paramObject = { "HTNO": HTNO };
        //    var promise = DataAccessService.getDataWithPara('api/ReqCounterSignature/PutReqCounterSignature', paramObject);
        //    return promise;
        //}
    });
});