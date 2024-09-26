sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "com/demo/empapp/model/formatter",
    "sap/m/MessageBox"
],
function (Controller,Formatter,MessageBox) {
    "use strict";

    return Controller.extend("com.demo.empapp.controller.View3", {
        f:Formatter,
        onInit: function () {
           this.getOwnerComponent().getRouter().getRoute("RouteView3").attachPatternMatched(this.onPatternMatched,this);
        },
        onPatternMatched:function(oEvent){
            var empId = oEvent.getParameter("arguments").key;
            this.getView().bindElement("/EmployeeSet('" +empId+ "')");
        },
        onBack:function(){
            this.getOwnerComponent().navBack();
        },
        onPressUpdate:function(){
            var empId = this.getView().byId("idEmpId").getValue();
			var name = this.getView().byId("idName").getValue();
			var desig = this.getView().byId("idDesig").getValue();
			var skill = this.getView().byId("idSkill").getValue();
			var email = this.getView().byId("idEmail").getValue();
			var phone = this.getView().byId("idPhone").getValue();
			var salary = this.getView().byId("idSalary").getValue();
            var status = this.getView().byId("idStatus").getValue();
			var doj = this.getView().byId("idDoj").getDateValue();
			doj = Formatter.formatDateForCreateNUpdate(doj);
            var data = {
				Empid: empId,
				Name: name,
				Desig: desig,
				Skill: skill,
				Emailid: email,
				Phone: phone,
				Salary: salary,
                Status: status,
				Doj: doj
			};
            var oModel = this.getOwnerComponent().getModel();
            oModel.update("/EmployeeSet('" +empId + "')",data,{
                success:function(){
                    MessageBox.success("Updated successfully!!");
                },
                error:function(){
                    MessageBox.error("Something went wrong!!!");
                }
            })
        },
        onPressCancel:function(){
            this.getOwnerComponent().navBack();
        }
     

    });  
});
