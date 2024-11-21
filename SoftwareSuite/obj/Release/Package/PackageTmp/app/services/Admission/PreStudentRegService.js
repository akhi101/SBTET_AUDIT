define(['app'], function (app) {
    app.service("PreStudentRegService", function (DataAccessService) {
        this.AddPreStudentReg = function (object) {
            var promise = DataAccessService.postData('api/PreStudentReg/PostPreStudentReg', object); //put
            return promise;
        }
        this.UpdatePreStudentReg = function (object) {
            var promise = DataAccessService.postData('api/PreStudentReg/PostStudentReg', object);
            return promise;
        }
        this.PostupdateEligible = function (object) {
            var promise = DataAccessService.postData('api/PreStudentReg/PostupdateEligible', object);
            return promise;
        }
        this.PostPreStudentRegBatchNo = function (object) {
            var promise = DataAccessService.postData('api/PreStudentReg/PostPreStudentRegBatchNo', object);
            return promise;
        }
        this.DeletePreStudentReg = function (PreStudentRegId) {
            var paramObject = { "PreStudentRegId": PreStudentRegId };
            var promise = DataAccessService.deleteData('api/PreStudentReg/DeletePreStudentReg', paramObject);
            return promise;
        }
        this.FillPreStudentRegDetailsList = function (CollegeID, CourseID, ExamID, BranchID, AcdYrID) {
            var paramObject = {
                "CollegeID": CollegeID, "CourseID": CourseID, "ExamID": ExamID, "BranchID": BranchID, "AcdYrID": AcdYrID};
            var promise = DataAccessService.getDataWithPara('api/PreStudentReg/GetStudentRegListByCourseExamBranch', paramObject);
            return promise;
        }
        this.FillPreStudentRegDetailsListForApproval = function (CollegeID, CourseID, ExamID, BranchID) {
            var paramObject = { "CollegeID": CollegeID, "CourseID": CourseID, "ExamID": ExamID, "BranchID": BranchID };
            var promise = DataAccessService.getDataWithPara('api/PreStudentReg/GetStudentRegListByCourseExamBranchForApproval', paramObject);
            return promise;
        }
        this.FillStudentListForRecognationFeePaid = function (CollegeID, CourseID, ExamID, BranchID) {
            var paramObject = { "CollegeID": CollegeID, "CourseID": CourseID, "ExamID": ExamID, "BranchID": BranchID };
            var promise = DataAccessService.getDataWithPara('api/PreStudentReg/GetStudentListForRecognationFeePaid', paramObject);
            return promise;
        }
        this.GetPreStudentRegById = function (PreStudRegID) {
            var paramObject = { "PreStudRegID": PreStudRegID };
            var promise = DataAccessService.getDataWithPara('api/PreStudentReg/GetPrestudentRegListByID', paramObject);
            return promise;
        }
        this.GetCheckDependancy = function (PreStudentRegId) {
            var paramObject = { "PreStudentRegId": PreStudentRegId };
            var promise = DataAccessService.getDataWithPara('api/PreStudentReg/GetCheckDependancy', paramObject);
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
        this.GetCasteList = function () {
            var data = DataAccessService.getDataAll('api/BasicCaste/GetBasicCasteList');
            return data;
        }
        this.GetSubCastList = function () {
            var data = DataAccessService.getDataAll('api/BasicSubCaste/GetBasicSubCasteList');
            return data;
        }
        this.GetMediumList = function (CollegeID, AcdYrID) {
            var paramObject = { "CollegeID": CollegeID, "AcdYrID": AcdYrID };
            var promise = DataAccessService.getDataWithPara('api/BasicMainGroup/GetBasicMediumInAdmissionStud', paramObject);
            return promise;
        }
        this.GetSecondLangList = function (CollegeID, StudRegID) {
            var paramObject = { "CollegeID": CollegeID, "StudRegID": StudRegID, "UserPrStudReg": true};
            var promise = DataAccessService.getDataWithPara('api/BasicMainGroup/GetBasicSubjectListForSecondLangauge', paramObject);
            return promise;
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
        this.GetMandalListByDistrict = function (DistrictID) {
            var paramObject = { "DistrictID": DistrictID };
            var promise = DataAccessService.getDataWithPara('api/BasicMandal/GetBasicMandalByDistrictID', paramObject);
            return promise;
        }
        this.GetStateList = function () {
            var data = DataAccessService.getDataAll('api/BasicState/GetBasicStateList');
            return data;
        }
        this.GetDistrictsList = function () {
            var data = DataAccessService.getDataAll('api/BasicDistricts/GetBasicDistrictListByCode');
            return data;
        }
        this.GetMainGroupListForStudAdmission = function (CollegeID, StudRegID) {
            var paramObject = { "CollegeID": CollegeID, "StudRegID": StudRegID, "UserPrStudReg": true };
            var promise = DataAccessService.getDataWithPara('api/BasicMainGroup/GetMainGroupListForStudAdmission', paramObject);
            return promise;
        }
        this.GetPhysDisbList = function () {
            var data = DataAccessService.getDataAll('api/BasicPhysDisability/GetBasicPhysDisabilityList');
            return data;
        }
        this.GetSpclConsList = function () {
            var data = DataAccessService.getDataAll('api/BasicSpclConsiderations/GetBasicSpclConsiderationsList');
            return data;
        }
        this.GetExamList = function () {
            var data = DataAccessService.getDataAll('api/BasicExam/GetBasicExamList');
            return data;
        }
        //this.GetStudCatList = function () {
        //    var data = DataAccessService.getDataAll('api/BasicStudentCategory/GetBasicStudentCategoryList');
        //    return data;
        //}
        //this.PostPreStudentRegPhoto = function (SignFile, ApplicantId, UserId) {
        //    var promise = DataAccessService.postData('api/PreStudentReg/PostPreStudentRegPhoto', object);
        //    return promise;
        //}
        this.AddPreStudentRegPhoto = function (Photofile, PreStudRegID, SSCHallTicket, UpdLoginID) {
            var promise = DataAccessService.PutUploadImage('api/PreStudentReg/PostFileUpload', Photofile, PreStudRegID, SSCHallTicket, UpdLoginID,"P");
            return promise;
        }
        this.AddPreStudentRegSign = function (Photofile, PreStudRegID, SSCHallTicket, UpdLoginID) {
            var promise = DataAccessService.PutUploadImage('api/PreStudentReg/PostFileUpload', Photofile, PreStudRegID, SSCHallTicket, UpdLoginID,"S");
            return promise;
        }
        this.FillStudRegListForRecogFeeRpt = function (CollegeID, CourseID, BranchID, ReportType) {
            var paramObject = { "CollegeID": CollegeID, "CourseID": CourseID, "BranchID": BranchID, "ReportType": ReportType };
            var promise = DataAccessService.getDataWithPara('api/PreStudentReg/GetStudRegListForRecogFeeRpt', paramObject);
            return promise;
        }

        this.FillStudentRegDetailsListForPhotoUpload = function (CollegeID, CourseID, ExamID, BranchID, WithPhoto) {
            var paramObject = { "CollegeID": CollegeID, "CourseID": CourseID, "ExamID": ExamID, "BranchID": BranchID, "WithPhoto": WithPhoto };
            var promise = DataAccessService.getDataWithPara('api/PreStudentReg/GetStudentRegDetailsListForPhotoUpload', paramObject);
            return promise;
        }
        this.FillStudentRegDetailsListForPhotoUploadOrForAadhar = function (CollegeID, CourseID, ExamID, BranchID, WithPhoto, ForAadhar) {
            var paramObject = {
                "CollegeID": CollegeID, "CourseID": CourseID, "ExamID": ExamID, "BranchID": BranchID, "WithPhoto": WithPhoto, "ForAadhar": ForAadhar
            };
            var promise = DataAccessService.getDataWithPara('api/PreStudentReg/GetStudentRegDetailsListForPhotoUpload', paramObject);
            return promise;
        }
    });
});