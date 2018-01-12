sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"com/masterdetail/model/models",
	"sap/ui/model/json/JSONModel"
], function(UIComponent, Device, models, JSONModel) {
	"use strict";

	return UIComponent.extend("com.masterdetail.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function() {
			// call the base component's init function

			var oModel = new JSONModel();
			var path = jQuery.sap.getModulePath("com.masterdetail.model", "/order.json");
			$.ajax({
				url: path,
				async: false,
				dataType: "json",
				success: function(response) {
					oModel.setData(response);
				},
				error: function(error) {
					sap.jquery.info("No Data found");
				}
			});
			this.setModel(oModel);

			UIComponent.prototype.init.apply(this, arguments);
			// set the device model
			this.setModel(models.createDeviceModel(), "device");
			this.getRouter().initialize();
		}
	});
});