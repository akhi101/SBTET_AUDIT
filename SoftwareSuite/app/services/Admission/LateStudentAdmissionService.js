define(['app'], function (app) {
    app.service("LateStudentAdmissionService", function (DataAccessService) {
        this.AddLateStudentAdmission = function (object) {
            var promise = DataAccessService.postData('api/LateStudAdm/PostInsertLateStudAdm', object); //Put
            return promise;
        }
        this.UpdateLateStudentAdmission = function (object) {
            var promise = DataAccessService.postData('api/LateStudAdm/PostLateStudAdm', object);
            return promise;
        }
        this.DeleteLateStudentAdmissione = function (ID) {
            var paramObject = { "ID": ID };
            var promise = DataAccessService.deleteData('api/LateStudAdm/DeleteLateStudAdm', paramObject);
            return promise;
        }
        this.GetLateStudAdmList = function (CollegeID,CourseID, ExamID) {
            var paramObject = { "CollegeID": CollegeID,"CourseID": CourseID, "ExamID": ExamID};
            var promise = DataAccessService.getDataWithPara('api/LateStudAdm/GetLateStudAdmListByCourseExam', paramObject);
            return promise;
        }
        this.GetLateStudAdmByID = function (LateAdmID) {
            var paramObject = { "LateAdmID": LateAdmID };
            var promise = DataAccessService.getDataWithPara('api/LateStudAdm/GetLateStudAdmByID', paramObject);
            return promise;
        }
        this.GetLateStudByCollegID = function (CollegeID) {
            var paramObject = { "CollegeID": CollegeID };
            var promise = DataAccessService.getDataWithPara('api/LateStudAdm/GetLateStudByCollegeID', paramObject);
            return promise;
        }

    });
});