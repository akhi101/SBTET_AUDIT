define(['app'], function (app) {
    app.service("RegisterAdmittedStudentService", function (DataAccessService) {
        //this.PutSSCStudentDetails = function (object) {
        //    var promise = DataAccessService.putData('api/StudentReg/PutSSCStudentDetails', object);
        //    return promise;
        //}
        this.PutSSCStudentDetails = function (object) {
            var promise = DataAccessService.postData('api/StudentReg/PostSSCStudentDetails', object);
            return promise;
        }
        this.CheckHallTicketNoPresent = function (YrName, SSCHallTicket, BoardID, CollegeID) {
            var paramObject = {
                "YrName": YrName, "SSCHallTicket": SSCHallTicket, "BoardID": BoardID, "CollegeID": CollegeID
            };
            var promise = DataAccessService.getDataWithPara('api/StudentReg/GetCheckHallTicketNoPresent', paramObject);
            return promise;
        }
        this.CheckHallTicketNoPresentInCollege = function (YrName, SSCHallTicket, BoardID) {
            var paramObject = {
                "YrName": YrName, "SSCHallTicket": SSCHallTicket, "BoardID": BoardID
            };
            var promise = DataAccessService.getDataWithPara('api/StudentReg/GetCheckHallTicketNoPresentInCollege', paramObject);
            return promise;
        }

        this.CheckHallTicketNoPresentOpenAdmission = function (YrName, SSCHallTicket, BoardID, CollegeID) {
            var paramObject = {
                "YrName": YrName, "SSCHallTicket": SSCHallTicket, "BoardID": BoardID, "CollegeID": CollegeID
            };
            var promise = DataAccessService.getDataWithPara('api/StudentReg/GetCheckHallTicketNoPresentOpenAdmission', paramObject);
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
        this.GetBasicBranchListForRegStud = function (CourseID, CollegeID) {
            var paramObject = { "CourseID": CourseID, "CollegeID": CollegeID };
            var promise = DataAccessService.getDataWithPara('api/BasicMainGroup/GetBasicBranchListForRegStud', paramObject);
            return promise;
        }
        //this.GetBasicCollegeList = function () {
        //    var data = DataAccessService.getDataAll('api/BasicCollege/GetBasicCollegeList');
        //    return data;
        //}
        this.GetMaxAdmNo = function () {
            var data = DataAccessService.getDataAll('api/StudentReg/GetAdmissionMaxNo');
            return data;
        }
        this.CheckAddBranchCount = function (CollegeID, AcdYrID, BranchID) {
            var paramObject = { "CollegeID": CollegeID, "AcdYrID": AcdYrID, "BranchID": BranchID };
            var promise = DataAccessService.getDataWithPara('api/StudentReg/GetCheckAddBranchCount', paramObject);
            return promise;
        }


        this.GetMainGroupAndCollegewiseIntake = function (CollegeID, BranchID, AcdYrID, MainGrpID, MediumID, CourseID) {
            var paramObject = { "CollegeID": CollegeID, "BranchID": BranchID, "AcdYrID": AcdYrID, "MainGrpID": MainGrpID, "MediumID": MediumID, "CourseID": CourseID };
            var promise = DataAccessService.getDataWithPara('api/BasicMainGroup/GetMainGroupAndCollegewiseIntake', paramObject);
            return promise;
        }


        this.GetRegisterStudentData = function (YrName, SSCHallTicket, BoardName, BoardID, Stream) {
            var paramObject = { "YrName": YrName, "SSCHallTicket": SSCHallTicket, "type": BoardName, "BoardID": BoardID, "Stream": Stream };
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
        this.GetMainGroupListByCollegeId = function (CollegeID, CourseID, AcdYrID) {
            var paramObject = { "CollegeID": CollegeID, "CourseID": CourseID, "AcdYrID": AcdYrID };
            var promise = DataAccessService.getDataWithPara('api/BasicMainGroup/GetMainGroupListByCollegeId', paramObject);
            return promise;
        }
        this.GetBasicBranchListByGroup = function (MainGrpID) {
            var paramObject = { "MainGrpID": MainGrpID };
            var promise = DataAccessService.getDataWithPara('api/BasicBranch/GetBasicBranchListByGroup', paramObject);
            return promise;
        }




        this.GetBasicSubjectListForSecondLangaugeInRegStud = function (CollegeID, CourseID, AcdYrID) {
            var paramObject = { "CollegeID": CollegeID, "CourseID": CourseID, "AcdYrID": AcdYrID };
            var promise = DataAccessService.getDataWithPara('api/BasicMainGroup/GetBasicSubjectListForSecondLangaugeInRegStud', paramObject);
            return promise;
        }


        this.GetBasicSubjectListForSecondLangaugeInRegStud1 = function (CollegeID, CourseID, AcdYrID, BranchID) {
            var paramObject = { "CollegeID": CollegeID, "CourseID": CourseID, "AcdYrID": AcdYrID, "BranchID": BranchID };
            var promise = DataAccessService.getDataWithPara('api/BasicMainGroup/GetBasicSubjectListForSecondLangaugeInRegStud', paramObject);
            return promise;
        }

        this.GetBasicMediumInRegStud = function (CollegeID, BranchID, AcdYrID) {
            var paramObject = { "CollegeID": CollegeID, "BranchID": BranchID, "AcdYrID": AcdYrID };
            var promise = DataAccessService.getDataWithPara('api/BasicMainGroup/GetBasicMediumInRegStud', paramObject);
            return promise;
        }
        this.GetCollegeInfo = function (CollegeID) {
            var paramObject = { "CollegeID": CollegeID };
            var promise = DataAccessService.getDataWithPara('api/BasicCollege/GetCollegeInfo_SBP', paramObject);
            return promise;
        }
        this.GetMainGroupListForRegStud = function (CollegeID, BranchID) {
            var paramObject = { "CollegeID": CollegeID, "BranchID": BranchID };
            var promise = DataAccessService.getDataWithPara('api/BasicMainGroup/GetMainGroupListForRegStud', paramObject);
            return promise;
        }
        this.CheckMobileNoCount = function (MobileNo, CollegeID, AcdYrID) {
            var paramObject = { "MobileNo": MobileNo, "CollegeID": CollegeID, "AcdYrID": AcdYrID };
            var promise = DataAccessService.getDataWithPara('api/StudentReg/GetCheckMobileNoCount', paramObject);
            return promise;
        }

        this.ChecAdmissionNo = function (CollegeID) {
            var paramObject = { "CollegeID": CollegeID };
            var promise = DataAccessService.getDataWithPara('api/BasicCollege/GetBasicCollegeByCollegeID', paramObject);
            return promise;
        }


        this.GetCheckFromTodate = function (FromDate, ToDate) {
            var paramObject = { "FromDate": FromDate, "ToDate": ToDate };
            var promise = DataAccessService.getDataWithPara('api/StudentReg/GetCheckFromTodate', paramObject);
            return promise;
        }
        this.GetGroupwiseReport = function (AcdYrID, CourseID, ExamID, BranchID, DistrictID, CollegeID, MainGrpID, SecondLangID) {
            var paramObject = {
                "AcdYrID": AcdYrID, "CourseID": CourseID, "ExamID": ExamID, "BranchID": BranchID, "DistrictID": DistrictID, "CollegeID": CollegeID, "MainGrpID": MainGrpID, "SecondLangID": SecondLangID
            };
            var promise = DataAccessService.getDataWithPara('api/StudentReg/GetGroupwiseReport', paramObject);
            return promise;
        }

        this.GetDeleteHallTicketNoPresentOpenAdmission = function (AcdYrID, YrName, SSCHallTicket, BoardID) {
            var paramObject = {
                "AcdYrID": AcdYrID, "YrName": YrName, "SSCHallTicket": SSCHallTicket, "BoardID": BoardID
            };
            var promise = DataAccessService.getDataWithPara('api/StudentReg/GetDeleteHallTicketNoPresentOpenAdmission', paramObject);
            return promise;
        }
        this.GetCheckUnStudCaseForAdmission = function (AcdYrID, YrName, SSCHallTicket, BoardID) {
            var paramObject = { "AcdYrID": AcdYrID, "YrName": YrName, "SSCHallTicket": SSCHallTicket, "BoardID": BoardID };
            var promise = DataAccessService.getDataWithPara('api/UnfStudCases/GetCheckUnStudCaseForAdmission', paramObject);
            return promise;
        }
        this.GetAdmissionScheduleOpenOrNot = function (AcdYrID, CollegeID) {
            var paramObject = { "AcdYrID": AcdYrID, "CollegeID": CollegeID };
            var promise = DataAccessService.getDataWithPara('api/AcademicSchedule/GetAdmissionScheduleOpenOrNot', paramObject);
            return promise;
        }

        this.GetSearchByDropItems = function (CollegeID) {
            var paramObject = { "CollegeID": CollegeID };
            var promise = DataAccessService.getDataWithPara('api/BasicBranch/GetSearchByDropList', paramObject);
            return promise;

        }

        this.getDistricts = function () {
            var promise = DataAccessService.getDataWithPara('api/Admission/GetDistricts');
            return promise;
        }


    });
});