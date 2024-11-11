define(['app'], function (app) {
    app.service("GovtColEnrollService", function (DataAccessService) {
        this.GetInsertEmptyRecGovtColEnrollSubject = function (object) {
            var data = DataAccessService.getDataAll('api/GovtColEnroll/GetInsertEmptyRecGovtColEnrollSubject');
            return data;
        }
        this.PutGovtColEnrollSubject = function (object) {
            var promise = DataAccessService.postData('api/GovtColEnroll/PostGovtColEnrollSubject', object); //put
            return promise;
        }
        this.PutEnrollCollegesForEmptyRecord = function (object) {
            var promise = DataAccessService.postData('api/GovtColEnroll/PostEnrollCollegesForEmptyRecord', object); //put //change 
            return promise;
        }
        this.PutGovtColEnrollSubjectForEmptyRecord = function (object) {
            var promise = DataAccessService.postData('api/GovtColEnroll/PostGovtColEnrollSubjectForEmptyRecord', object); //put
            return promise;
        }
        this.UpdateGovtColEnrollSubject = function (object) {
            var promise = DataAccessService.postData('api/GovtColEnroll/PostGovtColEnrollSubject', object);
            return promise;
        }
        this.CheckHallPresentOrNot = function (SSCHallTicket, BoardID) {
            var paramObject = {"SSCHallTicket": SSCHallTicket, "BoardID": BoardID };
            var promise = DataAccessService.getDataWithPara('api/GovtColEnroll/GetHallPresentOrNot', paramObject);
            return promise;
        }
        this.GetStudentEnrollData = function (SSCHallTicket, BoardID) {
            var paramObject = { "SSCHallTicket": SSCHallTicket, "BoardID": BoardID };
            var promise = DataAccessService.getDataWithPara('api/GovtColEnroll/GetStudentEnrollData', paramObject);
            return promise;
        }
        this.GetBasicCourseList = function () {
            var data = DataAccessService.getDataAll('api/BasicCourse/GetBasicCourseList');
            return data;
        }
        this.GetBasicMediumList = function () {
            var data = DataAccessService.getDataAll('api/BasicMedium/GetBasicMediumList');
            return data;
        }
        this.GetBasicMainGrpList = function () {
            var data = DataAccessService.getDataAll('api/BasicMainGroup/GetBasicMainGroupList');
            return data;
        }
        this.GetBasicSecondLangList = function () {
            var data = DataAccessService.getDataAll('api/BasicSubject/GetBasicSubjectList');
            return data;
        }
        this.GetRandanOTP = function (MobileNo) {
            var paramObject = { "MobileNo": MobileNo };
            var promise = DataAccessService.getDataWithPara('api/GovtColEnroll/GetRandanOTP', paramObject);
            return promise;
        }
        this.DeleteBoysOrGirlsInEmptyRecord = function (CollegeID, StudEnrolID) {
            var paramObject = { "CollegeID": CollegeID, "StudEnrolID": StudEnrolID};
            var promise = DataAccessService.getDataWithPara('api/GovtColEnroll/GetDeleteBoysOrGirlsInEmptyRecord', paramObject);   //deleteData
            return promise;
        }




        this.CheckMobileNoCount = function (MobileNo) {
            var paramObject = { "MobileNo": MobileNo };
            var promise = DataAccessService.getDataWithPara('api/GovtColEnroll/GetCheckMobileNoCount', paramObject);
            return promise;
        }
        this.CheckHallTicketNoPresent = function (PassingYear,SSCHallTicket, BoardID) {
            var paramObject = { "PassingYear": PassingYear,"SSCHallTicket": SSCHallTicket, "BoardID": BoardID };
            var promise = DataAccessService.getDataWithPara('api/GovtColEnroll/GetCheckHallTicketNoPresent', paramObject);
            return promise;
        }
        this.GetCheckHallTicketNoPresentStudReg = function (PassingYear, SSCHallTicket, BoardID) {
            var paramObject = { "PassingYear": PassingYear, "SSCHallTicket": SSCHallTicket, "BoardID": BoardID };
            var promise = DataAccessService.getDataWithPara('api/GovtColEnroll/GetCheckHallTicketNoPresentStudReg', paramObject);
            return promise;
        }

        this.GetBasicExamList = function (CourseID) {
            var paramObject = { "CourseID": CourseID };
            var promise = DataAccessService.getDataWithPara('api/BasicExam/GetBasicExamListByCourseID', paramObject);
            return promise;
        }
        this.GetBasicExamListAll = function () {
            var data = DataAccessService.getDataAll('api/BasicExam/GetBasicExamList');
            return data;
        }
        this.GetBasicCourseList = function () {
            var data = DataAccessService.getDataAll('api/BasicCourse/GetBasicCourseList');
            return data;
        }
        this.GetCourseListForRegStud = function (CollegeID) {
            var paramObject = { "CollegeID": CollegeID };
            var promise = DataAccessService.getDataWithPara('api/BasicMainGroup/GetCourseListForRegStud', paramObject);
            return promise;
        }
        this.GetBasicBranchList = function (CourseID) {
            var paramObject = { "CourseID": CourseID };
            var promise = DataAccessService.getDataWithPara('api/BasicBranch/GetBasicBranchListByCourseID', paramObject);
            return promise;
        }
        this.GetBasicBranchListForRegStud = function (CourseID, CollegeID) {
            var paramObject = { "CourseID": CourseID, "CollegeID": CollegeID };
            var promise = DataAccessService.getDataWithPara('api/BasicMainGroup/GetBasicBranchListForRegStud', paramObject);
            return promise;
        }
        this.GetBasicCollegeList = function () {
            var data = DataAccessService.getDataAll('api/BasicCollege/GetBasicCollegeList');
            return data;
        }
        this.GetMaxAdmNo = function () {
            var data = DataAccessService.getDataAll('api/StudentReg/GetAdmissionMaxNo');
            return data;
        }
        this.CheckAddBranchCount = function (CollegeID, AcdYrID, BranchID) {
            var paramObject = { "CollegeID": CollegeID, "AcdYrID": AcdYrID, "BranchID": BranchID };
            var promise = DataAccessService.getDataWithPara('api/StudentReg/GetCheckAddBranchCount', paramObject);
            return promise;
        }
        this.GetRegisterStudentData = function (YrName, SSCHallTicket, BoardName, BoardID,Stream) {
            var paramObject = { "YrName": YrName, "SSCHallTicket": SSCHallTicket, "type": BoardName, "BoardID": BoardID, "Stream": Stream};
            var promise = DataAccessService.getDataWithPara('api/StudentReg/GetRegisterStudentData', paramObject);
            return promise;
        }
        this.GetBasicBoardList = function (BoardID) {
            var paramObject = { "BoardID": BoardID };
            var promise = DataAccessService.getDataWithPara('api/BasicBoard/GetBasicBoardByID', paramObject);
            return promise;
        }
        this.GetBasicBoardListOtherthanTelengana = function (BoardID) {
            var paramObject = { "BoardID": BoardID };
            var promise = DataAccessService.getDataWithPara('api/BasicBoard/GetBasicBoardListOtherthanTelengana', paramObject);
            return promise;
        }
        this.GetMainGroupListByCollegeId = function (CollegeID, CourseID) {
            var paramObject = { "CollegeID": CollegeID, "CourseID": CourseID};
            var promise = DataAccessService.getDataWithPara('api/BasicMainGroup/GetMainGroupListByCollegeId', paramObject);
            return promise;
        }
        this.GetBasicBranchListByGroup = function (MainGrpID) {
            var paramObject = { "MainGrpID": MainGrpID };
            var promise = DataAccessService.getDataWithPara('api/BasicBranch/GetBasicBranchListByGroup', paramObject);
            return promise;
        }
        this.GetDistrictListByStateID = function (StateID) {
            var paramObject = { "StateID": StateID };
            var promise = DataAccessService.getDataWithPara('api/BasicDistricts/GetDistrictListByStateID', paramObject);
            return promise;
        }
        this.GetMandalListByDistrict = function (DistrictID) {
            var paramObject = { "DistrictID": DistrictID };
            var promise = DataAccessService.getDataWithPara('api/BasicMandal/GetBasicMandalByDistrictID', paramObject);
            return promise;
        }
        this.GetCollegeListByDistrictAndMandal = function (DistrictID, MandalID) {
            var paramObject = { "DistrictID": DistrictID, "MandalID": MandalID };
            var promise = DataAccessService.getDataWithPara('api/BasicCollege/GetCollegeListByDistrictAndMandal', paramObject);
            return promise;
        }
        
        this.GetCollegeListByDistrictAndMandalAndBranach = function (DistrictID, MandalID, BranchID) {
            if (MandalID == "") { MandalID = 0; }
            var paramObject = { "DistrictID": DistrictID, "MandalID": MandalID, "BranchID": BranchID };
            var promise = DataAccessService.getDataWithPara('api/BasicCollege/GetCollegeListByDistrictAndMandalAndBranach', paramObject);
            return promise;
        }

        this.GetCourseList = function () {
            var data = DataAccessService.getDataAll('api/BasicCourse/GetBasicCourseList');
            return data;
        }
        this.GetBasicMediumList = function () {
            var data = DataAccessService.getDataAll('api/BasicMedium/GetBasicMediumList');
            return data;
        }
        this.GetMainGroupList = function () {
            var data = DataAccessService.getDataAll('api/BasicMainGroup/GetBasicMainGroupList');
            return data;
        }
        this.GetSecondLangList = function () {
            var data = DataAccessService.getDataAll('api/BasicSubject/GetBasicSubjectList');
            return data;
        }
        this.GetCollegeDataForOpenAdmission = function (CollegeID) {
            var paramObject = { "CollegeID": CollegeID };
            var promise = DataAccessService.getDataWithPara('api/BasicCollege/GetCollegeDataForOpenAdmission', paramObject);
            return promise;
        }

         

        

        this.GetMainGroupListByCourseID = function (CourseID) {
            var paramObject = { "CourseID": CourseID };
            var promise = DataAccessService.getDataWithPara('api/BasicMainGroup/GetMainGroupListByCourseID', paramObject);
            return promise;
        }

        this.GetBasicSubjectListForSecondLangaugeInRegStud = function (CollegeID,BranchID, CourseID) {
            var paramObject = { "CollegeID": CollegeID, "BranchID": BranchID, "CourseID": CourseID };
            var promise = DataAccessService.getDataWithPara('api/BasicMainGroup/GetBasicSubjectListForSecondLangaugeInRegStud', paramObject);
            return promise;
        }
        this.GetBasicMediumInRegStud = function (CollegeID, BranchID) {
            var paramObject = { "CollegeID": CollegeID, "BranchID": BranchID};
            var promise = DataAccessService.getDataWithPara('api/BasicMainGroup/GetBasicMediumInRegStud', paramObject); //
            return promise;
        }
        this.GetMainGroupListForRegStudWithMainGrpID = function (CollegeID, BranchID, MainGrpID) {
            var paramObject = { "CollegeID": CollegeID, "BranchID": BranchID, "AcdYrID": 0, "MainGrpID": MainGrpID };
            var promise = DataAccessService.getDataWithPara('api/BasicMainGroup/GetMainGroupListForRegStudWithMainGrpID', paramObject); 
            return promise;
        }
        this.GetCollegeInfo = function (CollegeID) {
            var paramObject = { "CollegeID": CollegeID };
            var promise = DataAccessService.getDataWithPara('api/BasicCollege/GetCollegeInfo', paramObject);
            return promise;
        }
        this.GetMainGroupListForRegStud = function (CollegeID, BranchID) {
            var paramObject = { "CollegeID": CollegeID, "BranchID": BranchID };
            var promise = DataAccessService.getDataWithPara('api/BasicMainGroup/GetMainGroupListForRegStud', paramObject);
            return promise;
        }
        this.CheckMobileNoCount = function (MobileNo) {
            var paramObject = { "MobileNo": MobileNo };
            var promise = DataAccessService.getDataWithPara('api/GovtColEnroll/GetCheckMobileNoCount', paramObject);
            return promise;
        }


        
        this.GetCollegesForGovtEnroll = function (DistrictID, MandalID, BranchID, MainGrpID) {
            if (MandalID == "") { MandalID = 0; }
            var paramObject = { "DistrictID": DistrictID, "MandalID": MandalID, "BranchID": BranchID, "MainGrpID": MainGrpID };
            var promise = DataAccessService.getDataWithPara('api/BasicCollege/GetCollegesForGovtEnroll', paramObject);
            return promise;
        }
    });
});