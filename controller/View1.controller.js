sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "com/demo/empapp/model/formatter",
    "sap/m/MessageBox",
    "sap/ui/export/Spreadsheet"
],
function (Controller,Formatter,MessageBox,Spreadsheet) {
    "use strict";

    return Controller.extend("com.demo.empapp.controller.View1", {
        f:Formatter,
        onInit: function () {

        },
        onPressParticularRow:function(oEvent){
            var empid = oEvent.getSource().getBindingContext().getProperty('Empid');
            this.getOwnerComponent().getRouter().navTo("RouteView2",{
                key:empid
            });
        },
        onPressEdit:function(oEvent){
            var empId = this.getView().byId("idTable").getSelectedItem().getBindingContext().getProperty("Empid");
            this.getOwnerComponent().getRouter().navTo("RouteView3",{
                key:empId
            });
        },
        onPressCreate:function(){
            this.getOwnerComponent().getRouter().navTo("RouteView4");
        },
        onPressDelete:function(){
            var toDeleteEmpid = this.getView().byId("idTable").getSelectedItem().getBindingContext().getProperty("Empid");  
            var oModel = this.getOwnerComponent().getModel();
          
            oModel.remove("/EmployeeSet('" +toDeleteEmpid+ "')",{
                success:function(){
                    MessageBox.success("Deleted successfully!!");
                },
                error:function(){
                        MessageBox.error("Something went wrong!!");
                }
            })
        },
        onExportToXL:function(){
            var oRowBinding = this.getView().byId("idTable").getBinding('items');
            var aCols = [{
				label: 'Employee ID',
				property: 'Empid'
			}, {
				label: 'Name',
				property: 'Name'
			}, {
				label: 'Designation',
				property: 'Desig'
			}, {
				label: 'Skill',
				property: 'Skill'
			}, {
				label: 'Email',
				property: 'Email'
			}, {
				label: 'Phone.No',
				property: 'Phone'
			}, {
				label: 'Date Of Joining',
				property: 'Doj',
				type: 'Date',
				format: 'dd-MM-yyyy'
			}, {
				label: 'Salary',
				property: 'Salary'
			}];
            var oSettings = {
                workbook:{
                    columns: aCols
                },
                dataSource: oRowBinding,
				fileName: 'Employees.xlsx',
				worker: true
            }
            var oSheet = new Spreadsheet(oSettings);
            oSheet.build().finally(function () {
				oSheet.destroy();
			});
        },
        onPressUploadExcel:function(){
            this.getOwnerComponent().getRouter().navTo("RouteView5");   
        }
    });
});
