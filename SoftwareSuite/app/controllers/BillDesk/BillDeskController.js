define(['app'], function (app) {
    app.controller("BillDeskController", function ($scope, $http, $localStorage, $location, $state, $stateParams, AppSettings,) {

        var msg = string.Empty;
        try {
                     
            var strMsg = "";
            var marchantid = "TSSBTET";
            var bideskseqno = merchantId.Value;
            var data = string.Empty;


            var reqhash = objCheckSum.CheckSumRequest(url,marchantid, bideskseqno, amount.Value, "LATEFEE");
           
            if (!reqhash.Equals("")) {
                //window.location.replace("http://stackoverflow.com");
                //window.location.href = "http://stackoverflow.com";
               // var req = "https://pgi.billdesk.com/pgidsk/PGIMerchantPayment?msg=" + reqhash
               // window.location.href = req;
                //Response.Redirect("https://pgi.billdesk.com/pgidsk/PGIMerchantPayment?msg=" + reqhash);

            }
        }
        catch (Exception ex)
    {
        //RedirectToErrorPage(ex);
    }


});

});