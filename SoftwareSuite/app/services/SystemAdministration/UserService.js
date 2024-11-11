define(['app'], function (app) {
    app.service("UserService", function (DataAccessService) {
        this.AddUsers = function (object) {
            var promise = DataAccessService.putData('api/User/PutUser', object);
            return promise;
        }
        this.UpdateUsers = function (object) {
            var promise = DataAccessService.postData('api/User/PostUser', object);
            return promise;
        }
        this.DeleteUsers = function (UserId) {
            var paramObject = { "UserId": UserId };
            var promise = DataAccessService.deleteData('api/User/DeleteUser', paramObject);
            return promise;
        }
        this.GetUsers = function () {
            var data = DataAccessService.getDataAll('api/User/GetUser');
            return data;
        }
        this.GetUsersList = function () {
            var data = DataAccessService.getDataAll('api/User/GetUserList');
            return data;
        }
        this.GetUsersById = function (UserId) {
            var paramObject = { "UserId": UserId };
            var promise = DataAccessService.getDataWithPara('api/User/GetUser', paramObject);
            return promise;
        }
        this.GetUsersStatus = function () {
            var promise = DataAccessService.getDataAll('api/UsersStatus/GetUser');
            return promise;
        }
        this.GetUserRightsById = function (UserId) {
            var paramObject = { "UserId": UserId };
            var promise = DataAccessService.getDataWithPara('api/User/GetUserRightsById', paramObject);
            return promise;
        }
    });
});