sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/ui/Device"
], function(Controller, History, Device) {
	"use strict";

	return Controller.extend("com.masterdetail.controller.Detail2", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf com.masterdetail.view.Detail2
		 */
		onInit: function() {
			this.getOwnerComponent().getRouter().getRoute("productDetails").attachPatternMatched(this._onRouteMatched, this);
		},
		_onRouteMatched: function(oEvent) {
			this._orderId = oEvent.getParameter("arguments").orderId;
			this._productId = oEvent.getParameter("arguments").productId;
			this.getView().bindElement("/orders/" + this._orderId + "/products/" + this._productId);

		},

		onNavBack: function() {

			var sPreviousHash = History.getInstance().getPreviousHash();
			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {

				this.getOwnerComponent().getRouter()
					.navTo("orderDetails", {
						orderId: 0
					}, !Device.system.phone);
			}
		},

		handlePopoverPress: function(oEvent) {

			// create popover
			if (!this._oPopover) {
				this._oPopover = sap.ui.xmlfragment("com.masterdetail.Fragment.image", this);
				this.getView().addDependent(this._oPopover);
			}
			this._oPopover.bindElement("/orders/" + this._orderId + "/products/" + this._productId);

			var oButton = oEvent.getSource();
			jQuery.sap.delayedCall(0, this, function() {
				this._oPopover.openBy(oButton);
			});
		},
		handleClosePress: function() {
			this._oPopover.close();
		},

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf com.masterdetail.view.Detail2
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf com.masterdetail.view.Detail2
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf com.masterdetail.view.Detail2
		 */
		onExit: function() {
			if (this._oPopover) {
				this._oPopover.destroy(true);
			}
		}

	});

});