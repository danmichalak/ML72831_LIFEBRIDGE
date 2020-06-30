"use strict";

var xmplOnReady = function() {
    var xmpControllerDriverVar = new xmpControllerDriver($("[ng-controller='XMPPersonalizedPage']"));
    xmpControllerDriverVar.ready(function() {

        // check for rid error
        if (xmpControllerDriverVar.xmp.recipientFailed) {
            window.location = "error.html";
        }

        var resourceDriver = new xmpResourceDriver();

        resourceDriver.getRecipientADORs(xmpControllerDriverVar.xmp.recipientID, {adors: [
                "MISC03",
                "GROUP", "GRP_NUM", "GRP_ABBR", "SITUS", "GPC",
                "PROD_LP", "LP_RATE",
                "TOTAL_RATE"
            ]}, function (data) {

            xmpControllerDriverVar.scope.xmp.r["GROUP"] = data["GROUP"];
            xmpControllerDriverVar.scope.xmp.r["GRP_NUM"] = data["GRP_NUM"];
            xmpControllerDriverVar.scope.xmp.r["GRP_ABBR"] = data["GRP_ABBR"];
            xmpControllerDriverVar.scope.xmp.r["SITUS"] = data["SITUS"];
            xmpControllerDriverVar.scope.xmp.r["GPC"] = data["GPC"];

            xmpControllerDriverVar.scope.xmp.r["PROD_LP"] = data["PROD_LP"];
            xmpControllerDriverVar.scope.xmp.r["LP_RATE"] = data["LP_RATE"];

            xmpControllerDriverVar.scope.xmp.r["TOTAL_RATE"] = data["TOTAL_RATE"];

            xmpControllerDriverVar.scope.hasSp = false;

            // load in global variables
            xmpControllerDriverVar.scope.$parent.getJson("json/global.json", function(response) {

                var globalVars = response.data;

                Object.keys(globalVars).forEach(function(key) {
                    xmpControllerDriverVar.scope[key] = globalVars[key];
                });

                // set variables for determining page flow
                xmpControllerDriverVar.scope.$parent.getPageFlow(xmpControllerDriverVar.scope);

                xmpControllerDriverVar.scope.xmp.r["SAVE_CONT"] = "thankyou.html";

                resourceDriver.saveRecipientADORs(xmpControllerDriverVar.scope.xmp.recipientID, {"SAVE_CONT": "thankyou.html"});

                /*if (data["MISC03"] !== "X") {

                    xmpControllerDriverVar.scope.$parent.sendEnrollmentEmail(xmpControllerDriverVar.xmp.recipientID);

                }*/

            });
        });//getRecipientADORs

    });
};