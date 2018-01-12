sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/ui/Device"
], function(Controller, History, Device) {
	"use strict";

	return Controller.extend("com.masterdetail.controller.master", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf com.masterdetail.view.master
		 */
		onInit: function() {

		},

		updateFinished: function() {
			var firstItem = this.getView().byId("orders").getItems()[0];
			this.getView().byId("orders").setSelectedItem(firstItem, true);

			// var sOrderId = this.getOwnerComponent().getModel().getData().orders[0].orderId;/. 1 way
			// var bindingContext = firstItem.getBindingContextPath(); //2nd way
			// var path = bindingContext.getPath();
			// var sOrderId = this.getOwnerComponent().getModel().getProperty(bindingContext).orderId;

			var sOrderId = firstItem.getBindingContext().getProperty("orderId"); // 3rd way
			this.getOwnerComponent().getRouter()
				.navTo("orderDetails", {
					orderId: sOrderId
				}, !Device.system.phone);
		},

		onSelectionChange: function(oEvent) {
			var sOrderId = oEvent.getSource().getSelectedItem().getBindingContext().getProperty("orderId");
			this.getOwnerComponent().getRouter()
				.navTo("orderDetails", {
					orderId: sOrderId
				}, !Device.system.phone);
		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf com.masterdetail.view.master
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf com.masterdetail.view.master
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf com.masterdetail.view.master
		 */
		//	onExit: function() {
		//
		//	}

	});

});