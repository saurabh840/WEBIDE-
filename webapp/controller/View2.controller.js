sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"./utilities",
	'sap/m/MessageBox',
	'sap/m/MessageToast'
], function(Controller, History, MessageBox, MessageToast) {
	"use strict";

	return Controller.extend("com.sap.build.standard.untitledProject.controller.View2", {

		getRouter: function() {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},

		onInit: function() {

			this._data = {
				Products: [{
					ID: '',
					SOURCE: '',
					XREF: '',
					INPUT: '',
					OUTPUT: ''
				}]
			};

			this.jModel = new sap.ui.model.json.JSONModel();
			this.jModel.setData(this._data);

		},
		onBeforeRendering: function() {
			this.byId('Tab1').setModel(this.jModel);
		},
		addEntry: function(oArg) {

			this._data.Products.push({
				ID: '',
				SOURCE: '',
				XREF: '',
				INPUT: '',
				OUTPUT: ''
			});
			this.jModel.refresh(); //which will add the new record
		},

		x: function() {
			var oHistory, sPreviousHash;
			oHistory = History.getInstance();
			sPreviousHash = oHistory.getPreviousHash();
			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {

				this.getRouter().navTo("AppHome", {} /*no history*/ );
			}
		},

		DeleteEntry: function(oArg) {
			var selectedrecord = this.byId('Tab1').getSelectedContexts();
			var indexRecord = this.byId('Tab1').getSelectedItem();
			var check = this.byId('Tab1').indexOfItem(indexRecord);
			var atab= this.byId('Tab1');
			//var deleteRecord = oArg.getSource().getBindingContext().getObject();
			var model = this._data.Products;
			var jrefresh  = this.jModel;
			if(check !== -1){
			sap.m.MessageBox.warning("The Data will be lost.Do you Want to proceed?", {
				actions: [sap.m.MessageBox.Action.OK, sap.m.MessageBox.Action.CANCEL],
				onClose: function(sAction) {
					if (sAction === "OK") {
						for (var i=selectedrecord.length -1; i>=0; i--) {
							var oThisObj = selectedrecord[i].getObject();
							//if (model[i] == oThisObj) {
								//	pop this._data.Products[i] 
								//model.splice(i, 1); //removing 1 record from i th index.
							//	jrefresh.refresh();
							//	atab.removeSelections(true);
							//	break; //quit the loop
							//}
							var index = $.map(model, function(obj, index) {
                            if(obj === oThisObj) {
                             return index;
                    }
                    });
						model.splice(index,1);
						}
						
						jrefresh.refresh();
						atab.removeSelections(true);

					} else {
						MessageToast.show("Delete record cancelled");

					}
				}

			});
			
			}else {
				
				MessageToast.show("Please select a Record for Deleting");
			}

		},

		// override the parent's onNavBack (inherited from BaseController)
		onNavBack: function(oEvent) {

			var x = this.getRouter();
			var oHistory, sPreviousHash;
			oHistory = History.getInstance();
			sPreviousHash = oHistory.getPreviousHash();

			sap.m.MessageBox.warning("The Data will be lost.Do you Want to proceed?", {
				actions: [sap.m.MessageBox.Action.OK, sap.m.MessageBox.Action.CANCEL],
				onClose: function(sAction) {
					if (sAction === "OK") {

						x.navTo("Page1");

					} else {
						x.navTo("View2");

					}
				}

			});
			

		}

		// call the parent's onNavBack
		//BaseController.prototype.onNavBack.apply(this, arguments);

	});

});