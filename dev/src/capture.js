define([
	'tabs',
	'menus',
	'chromeExtension'
], function(tabs, menus, chromeExtension) {
	var Capture = function() {
		this.init();
	};
	Capture.prototype = {
		init: function() {
			var _this = this;
			menus.create({
				title: 'Capture',
				onclick: function() {
					_this.onclick();
				}
			});


		},
		tabId: null,
		onclick: function() {
			var _this = this,
				data = '';

			tabs.query({
				active: true
			}, function(tab) {
				//_this.tabId = tab[0].id;
				var windowId = tab[0].windowId;
				console.log(windowId);
				//console.time('capture');

				chrome.tabs.captureVisibleTab(windowId, {
					format: "png",
					quality: 100
				}, function(data) {
					console.log(data);
					console.timeEnd('capture');
					// chrome.tabs.sendMessage(windowId, {
					// 	windowId: windowId
					// }, function(response) {});
				});
				//window.open('image.html', '_blank');
			});
		}
	};
	return Capture;
});