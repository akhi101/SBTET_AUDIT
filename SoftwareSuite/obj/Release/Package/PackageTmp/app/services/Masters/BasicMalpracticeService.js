define(['app'], function (app) {
	app.service("BasicMalpracticeService", function (DataAccessService) {
		this.AddBasicMalpractice = function (object) {
			var promise = DataAccessService.putData('api/BasicMalpractice/PutBasicMalpractice', object);
			return promise;
		}
		this.UpdateBasicMalpractice = function (object) {
			var promise = DataAccessService.postData('api/BasicMalpractice/PostBasicMalpractice', object);
			return promise;
		}
		this.DeleteBasicMalpractice = function (MalPractID, UpdLoginID) {
			var paramObject = { "MalPractID": MalPractID, "UpdLoginID": UpdLoginID };
			var promise = DataAccessService.deleteData('api/BasicMalpractice/DeleteBasicMalpractice', paramObject);
			return promise;
		}
		this.GetBasicMalpracticeList = function () {
			var data = DataAccessService.getDataAll('api/BasicMalpractice/GetBasicMalpracticeList');
			return data;
        }
        this.GetBasicMalpracticeForList = function (ActiveFlag) {
            if (ActiveFlag == undefined) { ActiveFlag = 3; }
            var paramObject = { "ActiveFlag": ActiveFlag };
            var data = DataAccessService.getDataWithPara('api/BasicMalpractice/GetBasicMalpracticeForList', paramObject);
            return data;
        }
		this.GetBasicMalpracticeById = function (MalPractID) {
			var paramObject = { "MalPractID": MalPractID };
			var promise = DataAccessService.getDataWithPara('api/BasicMalpractice/GetBasicMalpracticeById', paramObject);
			return promise;
		}
		this.GetCheckDependancy = function (MalPractID) {
			var paramObject = { "MalPractID": MalPractID };
			var promise = DataAccessService.getDataWithPara('api/BasicMalpractice/GetCheckDependancy', paramObject);
			return promise;
		}
	});
});