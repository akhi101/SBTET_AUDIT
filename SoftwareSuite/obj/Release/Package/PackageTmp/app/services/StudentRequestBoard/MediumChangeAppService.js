define(['app'], function (app) {
    app.service("MediumChangeAppService", function (DataAccessService) {
        this.GetReqMediumChangeByID = function (MedChngID) {
            var paramObject = { "MedChngID": MedChngID };
            var promise = DataAccessService.getDataWithPara('api/ReqMediumChange/GetReqMediumChangeByID', paramObject);
            return promise;
        }
        this.UpdateMediumChangeApp = function (object) {
            var promise = DataAccessService.postData('api/ReqMediumChange/PostApprovedReqMediumChange', object);
            return promise;
        }
        this.GetCertPdf = function (FormNo) {
            var paramObject = { "FormNo": FormNo };
            var promise = DataAccessService.getDataWithPara('api/ReqMediumChange/GetCertPdf', paramObject);
            return promise;
        }
        //this.GetBasicExamList = function (CourseID) {
        //    var paramObject = { "CourseID": CourseID };
        //    var promise = DataAccessService.getDataWithPara('api/BasicExam/GetBasicExamListByCourseID', paramObject);
        //    return promise;
        //}
        //this.GetBasicCourseList = function () {
        //    var data = DataAccessService.getDataAll('api/BasicCourse/GetBasicCourseList');
        //    return data;
        //}
        //this.GetBasicBranchList = function (CourseID) {
        //    var paramObject = { "CourseID": CourseID };
        //    var promise = DataAccessService.getDataWithPara('api/BasicBranch/GetBasicBranchListByCourseID', paramObject);
        //    return promise;
        //}
       
        //this.FillGroupChangeAppDetailsList = function (UserGrp, EditData) {
        //    var paramObject = { "UserGrp": UserGrp, "EditData": EditData };
        //    var promise = DataAccessService.getDataWithPara('api/ReqGroupChange/GetGroupChangeAppDetailsList', paramObject);
        //    return promise;
        //}

        //this.GetMotherTongueList = function () {
        //    var data = DataAccessService.getDataAll('api/BasicMotherTongue/GetBasicMotherTongueList');
        //    return data;
        //}
        //this.GetOccupationList = function () {
        //    var data = DataAccessService.getDataAll('api/BasicOccupation/GetBasicOccupationList');
        //    return data;
        //}
        //this.GetCommunityList = function () {
        //    var data = DataAccessService.getDataAll('api/BasicCommunity/GetBasicCommunityList');
        //    return data;
        //}
        //this.GetReligionList = function () {
        //    var data = DataAccessService.getDataAll('api/BasicReligion/GetBasicReligionList');
        //    return data;
        //}
        //this.GetSubCastList = function () {
        //    var data = DataAccessService.getDataAll('api/BasicSubCaste/GetBasicSubCasteList');
        //    return data;
        //}
        //this.GetMediumList = function () {
        //    var data = DataAccessService.getDataAll('api/BasicMedium/GetBasicMediumList');
        //    return data;
        //}
        //this.GetSecondLangList = function () {
        //    var data = DataAccessService.getDataAll('api/BasicSubject/GetBasicSubjectList');
        //    return data;
        //}
        //this.GetWithdrawlReasonList = function () {
        //    var data = DataAccessService.getDataAll('api/BasicWithdrawlReason/GetBasicWithdrawlReasonList');
        //    return data;
        //}
        //this.GetIncGrList = function () {
        //    var data = DataAccessService.getDataAll('api/BasicIncomeGroups/GetBasicIncomeGroupsList');
        //    return data;
        //}
        //this.GetMandalList = function () {
        //    var data = DataAccessService.getDataAll('api/BasicMandal/GetBasicMandalList');
        //    return data;
        //}
        //this.GetStateList = function () {
        //    var data = DataAccessService.getDataAll('api/BasicState/GetBasicStateList');
        //    return data;
        //}
        //this.GetDistrictsList = function () {
        //    var data = DataAccessService.getDataAll('api/BasicDistrict/GetBasicDistrictList');
        //    return data;
        //}
        //this.GetSubGroupList = function () {
        //    var data = DataAccessService.getDataAll('api/BasicSubject/GetBasicSubjectList');
        //    return data;
        //}
        //this.PostGroupChangeAppPhoto = function (object) {
        //    var promise = DataAccessService.postData('api/GroupChangeApp/PostGroupChangeAppPhoto', object);
        //    return promise;
        //}
    });
});