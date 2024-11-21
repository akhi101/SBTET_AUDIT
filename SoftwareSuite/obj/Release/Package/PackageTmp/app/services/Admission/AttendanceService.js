define(['app'], function (app) {
    app.service("AttendanceService", function (DataAccessService) {

        this.GetAttendenceDataByCollege = function (CollegeId, AcademicYearId) {
            var paramObject = { "CollegeId": CollegeId, "AcademicId": AcademicYearId };
            var promise = DataAccessService.getDataWithPara('api/Attendance/GetAttendenceDataByCollege', paramObject);
            return promise;
        },
        this.GetAttendenceDataByBranch = function (CollegeId, AcademicYearId, branch) {
            var paramObject = { "CollegeId": CollegeId, "AcademicId": AcademicYearId,"Branch":branch };
            var promise = DataAccessService.getDataWithPara('api/Attendance/GetAttendenceDataByBranch', paramObject);
            return promise;
            },           
        this.UpdateAttendenceDataByBranch = function (UserId, AttDataList,Remarks) {
            var paramObject = { "UserId": UserId, "attData": AttDataList, "Remarks": Remarks };
            console.log(paramObject)
            var promise = DataAccessService.postData('api/Attendance/UpdateStudentAttendance', paramObject);
            return promise;
            },

            
          
            
        this.GetAttendenceDataByBranchWise = function (CollegeId, Scheme, AcademicYearId,Semester,Branch,percentage) {
            var paramObject = { "CollegeId": CollegeId, "Scheme": Scheme, "semester": Semester, "Branch": Branch, "percentage": percentage, "AcademicId": AcademicYearId };
            var promise = DataAccessService.getDataWithPara('api/Attendance/GetAttendenceDataByBranchWise', paramObject);
            return promise;
        },
         this.GetAttendenceDataByPinWise = function (pin) {
             var paramObject = { "Pin": pin };
             var promise = DataAccessService.getDataWithPara('api/Attendance/GetAttendenceDataPinWise', paramObject);
             return promise;
            }

       

        this.getAdminAttendanceReports = function () {     
            var promise = DataAccessService.getDataAll('api/Attendance/getAdminAttendanceReports');
            return promise;
        }
    }); 
});