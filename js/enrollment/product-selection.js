"use strict";

var xmplOnReady = function() {
    var xmpControllerDriverVar = new xmpControllerDriver($("[ng-controller='XMPPersonalizedPage']"));
    xmpControllerDriverVar.ready(function() {

        // check for rid error
        if (xmpControllerDriverVar.xmp.recipientFailed) {
            window.location = "error.html";
        }

        // load in global variables
        xmpControllerDriverVar.scope.$parent.getJson("json/global.json", function(response) {

            var globalVars = response.data;

            Object.keys(globalVars).forEach(function (key) {
                xmpControllerDriverVar.scope[key] = globalVars[key];
            });

            // set variables for determining page flow
            xmpControllerDriverVar.scope.$parent.getPageFlow(xmpControllerDriverVar.scope);

            xmpControllerDriverVar.scope.xmp.r["SAVE_CONT"] = "product-selection.html";

            xmpControllerDriverVar.scope.prodLegalUpdate = function() {

                xmpControllerDriverVar.scope.xmp.r["LP_RATE"] = "0.00";

                if (xmpControllerDriverVar.scope.xmp.r["PROD_LP"] !== "X") {
                    xmpControllerDriverVar.scope.xmp.r["MISC10"] = "";
                }

                if (xmpControllerDriverVar.scope.xmp.r["MISC10"] === "X") {
                    xmpControllerDriverVar.scope.xmp.r["LP_RATE"] = "18.42";
                }

                xmpControllerDriverVar.scope.prodTotalUpdate();
            };

            xmpControllerDriverVar.scope.prodTotalUpdate = function() {

                xmpControllerDriverVar.scope.xmp.r["TOTAL_RATE"] = "0.00";

                var lpRate = Number(xmpControllerDriverVar.scope.xmp.r["LP_RATE"]);

                if (!lpRate || lpRate === NaN) {
                    lpRate = 0;
                }

                xmpControllerDriverVar.scope.xmp.r["TOTAL_RATE"] = lpRate.toFixed(2);

            };
            xmpControllerDriverVar.scope.prodLegalUpdate();

            var resourceDriver = new xmpResourceDriver();
            resourceDriver.saveRecipientADORs(xmpControllerDriverVar.scope.xmp.recipientID, {"SAVE_CONT": "product-selection.html"});

        });

    });
};