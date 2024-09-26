sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "com/demo/empapp/model/formatter",
    "sap/m/MessageBox",
    "sap/ui/unified/FileUploaderParameter"
],
function (Controller,Formatter,MessageBox,FileUploaderParameter) {
    "use strict";

    return Controller.extend("com.demo.empapp.controller.View4", {
        f:Formatter,
        onInit: function () {
          var prjModel = this.getOwnerComponent().getModel("prjModel");
          prjModel.setData({
            aProjects:[]
          });
        },
       
        onBack:function(){
            this.getOwnerComponent().navBack();
        },
        onPressCreate:function(){
            var oModel = this.getOwnerComponent().getModel();
            var empid = this.getView().byId("idEmpid1").getValue();
            var name = this.getView().byId("idName1").getValue();
            var desig = this.getView().byId("idDesig1").getValue();
            var skill = this.getView().byId("idSkill1").getValue();
            var email = this.getView().byId("idEmail1").getValue();
            var phone = this.getView().byId("idPhone1").getValue();
            var salary = this.getView().byId("idSalary1").getValue();
            var ccode = this.getView().byId("idccode1").getValue();
            var status = this.getView().byId("idStatus1").getValue();
       
            var doj = this.getView().byId("idDoj1").getDateValue();
            doj = Formatter.formatDateForCreateNUpdate(doj);
            var data = {
                Empid : empid,
                Name:name,
                Desig:desig,
                Skill:skill,
                Emailid:email,
                Phone:phone,
                Salary:salary,
                Currcode: ccode,
                Status:status,
                Doj:doj,
                toProjects: this.getOwnerComponent().getModel("prjModel").getData().aProjects
            }
            oModel.create("/EmployeeSet",data,{
                success:function(req,res){
                    MessageBox.success("Employee got created successfully");
                    this.reset();
                }.bind(this),
                error:function(error){
                    MessageBox.error("Something went wrong!!!");
                }
            })
        },
        onPressCancel:function(){
            this.reset();
            this.getOwnerComponent().navBack();
        },
        reset:function(){
            this.getView().byId("idEmpid1").setValue("");
            this.getView().byId("idName1").setValue("");
            this.getView().byId("idDesig1").setValue("");
            this.getView().byId("idSkill1").setValue("");
            this.getView().byId("idEmail1").setValue("");
            this.getView().byId("idPhone1").setValue("");
            this.getView().byId("idSalary1").setValue("");
            this.getView().byId("idccode1").setValue("");
            this.getView().byId("idStatus1").setValue("");
            this.getView().byId("idDoj1").setDateValue(null);
            this.getOwnerComponent().getModel("prjModel").getData().aProjects=[];
            this.getOwnerComponent().getModel("prjModel").refresh(true);
        },
        onAddProjects:function(){
            this.getOwnerComponent().getModel("prjModel").getData().aProjects.push({
                 Empid:"",
                Prjcode:"",
                Clientname:"",
                Prjname:"",
                Prjdesc:""
            });
            this.getOwnerComponent().getModel("prjModel").refresh(true);
        },
        onPressDeleteProjectRow:function(oEvent){
            var rowIndex =  oEvent.getSource().getParent().getBindingContextPath().split("/")[2];
            this.getOwnerComponent().getModel("prjModel").getData().aProjects.splice(rowIndex,1);
            this.getOwnerComponent().getModel("prjModel").refresh(true);
        },
        onFileSelect:function(oEvent){
            this.fileName = oEvent.getParameter("files")[0].name;
            this.fileType = oEvent.getParameter("files")[0].type;
        },
        onPressUploadImage:function(){
            var oFileUploader = this.getView().byId("idFileuploader");
            var empid = this.getView().byId("idEmpid1").getValue();
            //slug
            var slug = empid + "," + this.fileName;
            oFileUploader.addHeaderParameter(new FileUploaderParameter({
                name: "slug",
                value: slug
            }));
            //content-type
            oFileUploader.addHeaderParameter(new FileUploaderParameter({
                name: "Content-Type",
                value:this.fileType
            }));

            //x-csrf-token
            this.getOwnerComponent().getModel().refreshSecurityToken();
            oFileUploader.addHeaderParameter(new FileUploaderParameter({
                name:'x-csrf-token',
                value: this.getOwnerComponent().getModel().getHeaders()['x-csrf-token']
            }));
            //content
            oFileUploader.upload();
        },
        onUploadComplete:function(oEvent){
            var status = oEvent.getParameter("status");
			if (status === 201 || status === 202 || status === 204) {
				MessageBox.success("Fileupload Successful");
			} else {
				MessageBox.error("Fileupload Unsuccessful, Please try again later or contact support team");
			}
        },
        onBeforeUploadStarts:function(){
            
        }
       

    });  
});
