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
				console.log('captureVisibleTab',windowId);
				//console.time('capture');
				window.open('image.html', '_blank');
				tabs.captureVisibleTab(windowId, {
					format: "png",
					quality: 100
				}, function(data) {
					//console.log(data);
					console.log('有DATA了');
					console.timeEnd('capture');

					chromeExtension.sendMessage({
						imageData: data
					}, function(response) {});
				});

			});
		}
	};
	return Capture;
});