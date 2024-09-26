sap.ui.define([
   "sap/ui/core/format/DateFormat",
   "sap/ui/core/format/NumberFormat"
],
function (DateFormat,NumberFormat) {
    "use strict";

    return {

        formatDate:function(Doj){
            var oDateFormatter = DateFormat.getDateTimeInstance({
                pattern:"dd-MM-yyyy"
            }, sap.ui.getCore().getConfiguration().getLocale());

           return oDateFormatter.format(Doj);

        },
        formatCurrency:function(Salary){
            var oCurrencyFormatter = NumberFormat.getCurrencyInstance({
               showMeasure: false,
				pattern: "#,##,##0.00"
            }, sap.ui.getCore().getConfiguration().getLocale());

            return oCurrencyFormatter.format(Salary);
        },
        colorStatus:function(Status){
            if (Status === "PERMANENT" ||  Status === "PERMINANT") {
                return "Success";
            }
            else{
                    return "Error";
            }
        },
        formatDateForCreateNUpdate:function(Doj){
			var oDateFormatter = DateFormat.getDateTimeInstance({
				pattern: "yyyy-MM-ddTHH:mm:ss"
			}, sap.ui.getCore().getConfiguration().getLocale());

			return oDateFormatter.format(Doj);
		}
    }
});
