define(['app'], function (app) {
	app.service("MigrCertAppService", function (DataAccessService) {
		this.UpdateMigrCertApp = function (object) {
			var promise = DataAccessService.postData('api/ReqMigrCert/PostApprovedReqMigrCert', object);
			return promise;
		}
		this.GetReqMigrCertByID = function (MigrCertID) {
			var paramObject = { "MigrCertID": MigrCertID };
			var promise = DataAccessService.getDataWithPara('api/ReqMigrCert/GetReqMigrCertByID', paramObject);
			return promise;
		}
        this.FillMigrCertAppDetailsList = function (UserGrp, EditData) {
            var paramObject = { "UserGrp": UserGrp, "EditData": EditData };
			var promise = DataAccessService.getDataWithPara('api/ReqMigrCert/GetMigrCertAppDetailsList', paramObject);
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
        this.GetCertPdf = function (FormNo) {
            var paramObject = { "FormNo": FormNo };
            var promise = DataAccessService.getDataWithPara('api/ReqMigrCert/GetCertPdf', paramObject);
            return promise;
        }
	});
});