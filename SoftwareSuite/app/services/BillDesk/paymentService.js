define(['app'], function (app) {
    app.service("PaymentService", function (DataAccessService) {
        this.getHashValue = function (url, marchantid, subMarchantid, addInfo1, addInfo3, addInfo4, addInfo5, addInfo6, addInfo7, chalanaNo, amount) {
            var paramObject = { "redirecturl": url, "marchantid": marchantid, "subMarchantid": subMarchantid, "addInfo1": addInfo1, "addInfo3": addInfo3, "addInfo4": addInfo4, "addInfo5": addInfo5, "addInfo6": addInfo6, "addInfo7": addInfo7, "chalanaNo": chalanaNo, "amount": amount };
            return DataAccessService.getDataWithPara('api/BillDesk/getHashValue', paramObject);
        },
            this.billDeskResponse = function (msg) {
                var paramObject = { "msg": msg };
                return DataAccessService.postData('api/BillDesk/getPaymentResponse', paramObject);
            }
        //this.billDeskS2SResponse = function (chalanaNo) {
        //    var paramObject = { "chalanaNo": chalanaNo };
        //    return DataAccessService.getDataWithParaCustomUrl('https://sbtet.telangana.gov.in/API/Payment/FindchalanaNo', paramObject);
        //}

        this.getSomeValue = function (url, challanaNo) {
            var paramObject = { "url": url, "challanaNo": challanaNo };
            console.log(paramObject)
            return DataAccessService.getDataWithPara('api/BillDesk/getSomeValue', paramObject);
        },

        this.billDeskS2SResponse = function (chalanaNo) {
            var paramObject = { "chalanaNo": chalanaNo };
            return DataAccessService.getDataWithParaCustomUrl('Payment/FindchalanaNo', paramObject);
        }

        //
        this.GetFeeReciept = function (chalanaNo) {
            var paramObject = { "chalanaNo": chalanaNo };
            return DataAccessService.getDataWithPara('api/PreExamination/FindchalanaNo', paramObject);
        }
        this.callSms = function (chalanaNo) {
            var paramObject = { "ChallanNumber": chalanaNo };
            return DataAccessService.getDataWithPara('api/PreExamination/SendSms', paramObject);
        }
     
        this.getCipherRequest = function (Callbackurl,addInfo1, addInfo2, addInfo3, addInfo4, chalanaNo, amount) {
            var paramObject = { "Callbackurl": Callbackurl, "addInfo1": addInfo1, "addInfo2": addInfo2, "addInfo3": addInfo3, "addInfo4": addInfo4, "chalanaNo": chalanaNo, "amount": amount };
            return DataAccessService.getDataWithPara('api/Twallet/getCipherRequest', paramObject);
        }

        this.sendTwalletPaymentRequest = function (url,param) {
            //var paramObject = { "ChallanNumber": chalanaNo };
            return DataAccessService.sendTwalletPaymentRequest(url, param);
        }

    });
});