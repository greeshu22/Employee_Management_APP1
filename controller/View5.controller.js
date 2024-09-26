sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "com/demo/empapp/model/formatter",
    "sap/m/MessageBox",
    "sap/ui/unified/FileUploaderParameter"
],
function (Controller,Formatter,MessageBox,FileUploaderParameter) {
    "use strict";

    return Controller.extend("com.demo.empapp.controller.View5", {
        f:Formatter,
        onInit: function () {
          var batchModel =  this.getOwnerComponent().getModel("batchModel");
          batchModel.setData({
            aEmployees:[]
          });
        },
       
        onBack:function(){
            this.getOwnerComponent().navBack();
        },
        onPressSubmitBatch:function(){
            var oModel = this.getOwnerComponent().getModel();
            var aEmployees = this.getOwnerComponent().getModel("batchModel").getData().aEmployees;
            var aDefferedGroups = oModel.getDeferredGroups();
            aDefferedGroups = aDefferedGroups.concat(["CreateGrp"]);
            oModel.setDeferredGroups(aDefferedGroups);
            var dateFormat = sap.ui.core.format.DateFormat.getDateInstance({
				pattern: "yyyy-MM-ddTHH:mm:ss"
			});

            for(var i=0; i<aEmployees.length;i++){
                aEmployees[i].Doj = dateFormat.format(aEmployees[i].Doj);
                oModel.create("/EmployeeSet",aEmployees[i],{
                    groupId: "CreateGrp"
                });
                oModel.submitChanges({
                    groupId: "CreateGrp",
                    success: function(batchRes) {
                        MessageBox.success("All Employees Got create successfully");
                    },
                    error: function(error) {
                        MessageBox.error("Some error occured , Please contact support team");
                    }
                });
            }
            
        },
        onSelectFile: function(oEvent) {
			this._import(oEvent.getParameter("files") && oEvent.getParameter("files")[0]);
		},
		_import: function(file) {
			var that = this;
			var aResults = [];
			if (file && window.FileReader) {
				var reader = new FileReader();
				reader.onload = function(e) {
					var data = e.target.result;
					var workbook = XLSX.read(data, {
						type: 'binary'
					});
					workbook.SheetNames.forEach(function(sheetName) {
						// Here is your object for every sheet in workbook
						aResults = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);

					});
					// edit below two lines
					//convert date string to date object // add this code only when u have date field
					for (var i = 0; i < aResults.length; i++) {
						aResults[i].Doj = new Date(aResults[i].Doj);
					}
					that.getOwnerComponent().getModel("batchModel").getData().aEmployees = aResults;
					that.getOwnerComponent().getModel("batchModel").refresh(true);
				};
				reader.onerror = function(ex) {
					console.log(ex);
				};
				reader.readAsBinaryString(file);
			}
		},

    });  
});
