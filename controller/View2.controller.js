sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "com/demo/empapp/model/formatter"
],
function (Controller,Formatter) {
    "use strict";

    return Controller.extend("com.demo.empapp.controller.View2", {
        f:Formatter,
        onInit: function () {
            this.getOwnerComponent().getRouter().getRoute("RouteView2").attachPatternMatched(this.onPatternMatched,this);
                   
        },
        onPatternMatched:function(oEvent){
           var empId = oEvent.getParameter("arguments").key;
           this.getView().bindElement("/EmployeeSet('" +empId+ "')");

        },
        onBack:function(){
            this.getOwnerComponent().navBack();
        },
        onPressImageToDownload:function(){
            var empid =  this.getView().byId("idObjEmpid").getText();
            var url = "/sap/opu/odata/sap/ZB71_EMP_SRV/PhotoSet('" +empid+ "')/$value";
            sap.m.URLHelper.redirect(url,false);
        }

    });  
});
