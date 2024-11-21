define(['app'], function (app) {
    app.service("EligibilityCertificateService", function (DataAccessService) {
        this.AddEligibilityCertificate = function (object) {
            var promise = DataAccessService.postData('api/ReqEligCert/PostReqEligCert', object);
            return promise;
        }
        this.UpdateEligibilityCertificate = function (object) {
            var promise = DataAccessService.postData('api/ReqEligCert/ReApplyReqEligCert', object);
            return promise;
        }

        this.FillEligibilityCertificateDetailsList = function (CourseID, ExamID, BranchID,SSCHallTicket) {
            var paramObject = { "CourseID": CourseID, "ExamID": ExamID, "BranchID": BranchID ,"SSCHallTicket": SSCHallTicket };
            var promise = DataAccessService.getDataWithPara('api/ReqEligCert/GetEligibilityCertificateListBySSCHallTicket', paramObject);
            return promise;
        }
		this.GetReqEligCertBySSCHallTicketAndAcdYrID = function (FormNo, SeqNo) {
			var paramObject = { "FormNo": FormNo, "SeqNo": SeqNo };
            var promise = DataAccessService.getDataWithPara('api/ReqEligCert/GetReqEligCertBySSCHallTicketAndAcdYrID', paramObject);
            return promise;
        }
        this.GetApplicationStatusCertificate = function (FormNo) {
			var paramObject = { "FormNo": FormNo };
			var promise = DataAccessService.getDataWithPara('api/ReqEligCert/GetApplicationStatusDetails', paramObject);
			return promise;
		}
        this.GetBasicExamList = function (CourseID) {
            var paramObject = { "CourseID": CourseID };
            var promise = DataAccessService.getDataWithPara('api/BasicExam/GetBasicExamListByCourseID', paramObject);
            return promise;
        }
        this.GetBasicCourseList = function () {
            var data = DataAccessService.getDataAll('api/BasicCourse/GetBasicCourseList');
            return data;
        }
        this.GetBasicBranchList = function (CourseID) {
            var paramObject = { "CourseID": CourseID };
            var promise = DataAccessService.getDataWithPara('api/BasicBranch/GetBasicBranchListByCourseID', paramObject);
            return promise;
        }
        this.GetBoardList = function () {
            var data = DataAccessService.getDataAll('api/BasicBoard/GetBasicBoardList');
            return data;
        }
        this.GetAcademicYearFeesByCode = function (FeesCode) {
            var paramObject = { "FeesCode": FeesCode };
            var promise = DataAccessService.getDataWithPara('api/AcademicYearFees/GetAcademicYearFeesByCode', paramObject);
            return promise;
        }

        //this.GetAcademicYearFeesByBoardID = function (BoardID, PlaceofExam, FeeCode) {
        //    var paramObject = { "BoardID": BoardID, "PlaceofExam": PlaceofExam, "FeeCode": FeeCode };
        //    var promise = DataAccessService.getDataWithPara('api/AcademicYearFees/GetAcademicYearFeesByBoardID', paramObject);
        //    return promise;
        //}

        //Srikanth
        //this.GetAcademicYearFeesByBoardID = function (BoardID, PlaceofExam, FeeCode) {
        this.GetAcademicYearFeesByBoardID = function (BoardID, FeeCode) {
            var paramObject = { "BoardID": BoardID, "FeeCode": FeeCode };
            var promise = DataAccessService.getDataWithPara('api/ReqEligCert/GetAcademicYearFeesByBoardID', paramObject);
            return promise;
        }

        this.GetBoardLocationByBoardID = function (BoardID) {
            var paramObject = { "BoardID": BoardID };
            var promise = DataAccessService.getDataWithPara('api/BasicBoard/GetBasicBoardByID', paramObject);
            return promise;
        }

        this.GetReqEligCertByID = function (EligCertID) {
            var paramObject = { "EligCertID": EligCertID };
            var promise = DataAccessService.getDataWithPara('api/ReqEligCert/GetReqEligCertByID', paramObject);
            return promise;
        }
		this.CheckDuplicateElgigibilityCertificate = function (SSCHallTicket, BoardID) {
			var paramObject = { "SSCHallTicket": SSCHallTicket, "BoardID": BoardID };
			var promise = DataAccessService.getDataWithPara('api/ReqEligCert/GetCheckDuplicateElgigibilityCertificate', paramObject);
			return promise;
		}
        this.GetReqEligCertByFormNo = function (FormNo) {
            var paramObject = { "FormNo": FormNo };
            var promise = DataAccessService.getDataWithPara('api/ReqEligCert/GetReqEligCertByFormNo', paramObject);
            return promise;
        }

        this.GetReqEligCertBySelectCriteria = function (BoardID, ExamYear, ExamMonth, SSCHallTicket) {
        var paramObject = { "BoardID": BoardID, "ExamYear": ExamYear, "ExamMonth": ExamMonth, "SSCHallTicket": SSCHallTicket };
            var promise = DataAccessService.getDataWithPara('api/ReqEligCert/GetReqEligCertBySelectCriteria', paramObject);
            return promise;
        }

        
        this.GetCheckDependancy = function (EligibilityCertificateId) {
            var paramObject = { "EligibilityCertificateId": EligibilityCertificateId };
            var promise = DataAccessService.getDataWithPara('api/EligibilityCertificate/GetCheckDependancy', paramObject);
            return promise;
        }

        this.GetCourseList = function () {
            var data = DataAccessService.getDataAll('api/BasicCourse/GetCourseList');
            return data;
        }
        this.GetMotherTongueList = function () {
            var data = DataAccessService.getDataAll('api/BasicMotherTongue/GetBasicMotherTongueList');
            return data;
        }
        this.GetOccupationList = function () {
            var data = DataAccessService.getDataAll('api/BasicOccupation/GetBasicOccupationList');
            return data;
        }
        this.GetCommunityList = function () {
            var data = DataAccessService.getDataAll('api/BasicCommunity/GetBasicCommunityList');
            return data;
        }
        this.GetReligionList = function () {
            var data = DataAccessService.getDataAll('api/BasicReligion/GetBasicReligionList');
            return data;
        }
        this.GetSubCastList = function () {
            var data = DataAccessService.getDataAll('api/BasicSubCaste/GetBasicSubCasteList');
            return data;
        }
        this.GetMediumList = function () {
            var data = DataAccessService.getDataAll('api/BasicMedium/GetBasicMediumList');
            return data;
        }
        this.GetSecondLangList = function () {
            var data = DataAccessService.getDataAll('api/BasicSubject/GetBasicSubjectList');
            return data;
        }
        this.GetWithdrawlReasonList = function () {
            var data = DataAccessService.getDataAll('api/BasicWithdrawlReason/GetBasicWithdrawlReasonList');
            return data;
        }
        this.GetIncGrList = function () {
            var data = DataAccessService.getDataAll('api/BasicIncomeGroups/GetBasicIncomeGroupsList');
            return data;
        }
        this.GetMandalList = function () {
            var data = DataAccessService.getDataAll('api/BasicMandal/GetBasicMandalList');
            return data;
        }
        this.GetStateList = function () {
            var data = DataAccessService.getDataAll('api/BasicState/GetBasicStateList');
            return data;
        }
        this.GetDistrictsList = function () {
            var data = DataAccessService.getDataAll('api/BasicDistrict/GetBasicDistrictList');
            return data;
        }
        this.GetSubGroupList = function () {
            var data = DataAccessService.getDataAll('api/BasicSubject/GetBasicSubjectList');
            return data;
        }

        this.GetStudServiceList = function () {
            var data = DataAccessService.getDataAll('api/ReqEligCert/GetStudServiceList');
            return data;
        }
        this.PostEligibilityCertificatePhoto = function (object) {
            var promise = DataAccessService.postData('api/EligibilityCertificate/PostEligibilityCertificatePhoto', object);
            return promise;
        }
        this.GetDataByFormNo = function (FormNo) {
            var paramObject = { "FormNo": FormNo };
            var promise = DataAccessService.getDataWithPara('api/ReqEligCert/GetReApplyDataByFormNo', paramObject);
            return promise;
        }
    });
});