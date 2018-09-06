sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History"
], function(Controller) {
	"use strict";

	return Controller.extend("TysonCheck.controller.View1", {

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
		}

	});
});