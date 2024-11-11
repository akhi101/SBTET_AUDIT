define(['app'], function (app) {
    app.service("StudentRegService", function (DataAccessService) {
        this.AddStudentReg = function (object) {
            var promise = DataAccessService.putData('api/StudentReg/PutStudentReg', object);
            return promise;
        }
        this.UpdateStudentReg = function (object) {
            var promise = DataAccessService.postData('api/StudentReg/PostStudentReg', object);
            return promise;
        }


        this.DeleteStudentReg = function (StudentRegId) {
            var paramObject = { "StudentRegId": StudentRegId };
            var promise = DataAccessService.deleteData('api/StudentReg/DeleteStudentReg', paramObject);
            return promise;
        }
        this.FillStudentRegDetailsList = function (CollegeID, CourseID, ExamID, BranchID) {
            var paramObject = { "CollegeID": CollegeID, "CourseID": CourseID, "ExamID": ExamID, "BranchID": BranchID };
            var promise = DataAccessService.getDataWithPara('api/StudentReg/GetStudentRegListByCourseExamBranch', paramObject);
            return promise;
        }
        this.GetStudentRegById = function (StudRegID) {
            var paramObject = { "StudRegID": StudRegID };
            var promise = DataAccessService.getDataWithPara('api/StudentReg/GetStudentRegById', paramObject);
            return promise;
        }
        this.GetBranchList = function (CollegeCode) {
            var paramObject = { "CollegeCode": CollegeCode };
            var promise = DataAccessService.getDataWithPara('Academic/GetBranchList', paramObject);
            return promise;
        }
        this.GetCheckDependancy = function (StudentRegId) {
            var paramObject = { "StudentRegId": StudentRegId };
            var promise = DataAccessService.getDataWithPara('api/StudentReg/GetCheckDependancy', paramObject);
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
        this.GetExamList = function () {
            var data = DataAccessService.getDataAll('api/BasicExam/GetBasicExamList');
            return data;
        }
        this.PostStudentRegPhoto = function (object) {
            var promise = DataAccessService.postData('api/StudentReg/PostStudentRegPhoto', object);
            return promise;
        }
    });
});