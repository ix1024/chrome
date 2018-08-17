define([
	'menus'
], function(menus) {

	// var timeout = NaN;

	// function startTimeout(handler, delay) {
	// 	stopTimeout();
	// 	timeout = setTimeout(handler, delay);
	// }

	// function stopTimeout() {
	// 	if (!isNaN(timeout)) {
	// 		return;
	// 	}
	// 	clearTimeout(timeout);
	// }
	// /**
	//  * @param {string} timeperiod
	//  * @return {number|string}
	//  */
	// function parseTimeperiod(timeperiod) {

	// 	/*
	// 	 * Another patch: http://codereview.chromium.org/9301002/
	// 	 *
	// 	 * ...
	// 	 *
	// 	 * Chrome updated the clear API with the following patch:
	// 	 * http://codereview.chromium.org/8932015/
	// 	 * Make sure that both versions are suppored by checking if
	// 	 * the new features are supported since both versions use
	// 	 * different timeperiod formats
	// 	 */
	// 	if (!chrome['browsingData'] && !chrome.experimental['browsingData'] && !(
	// 			chrome.experimental['clear'] || chrome.experimental.clear[
	// 				'localStorage'])) {
	// 		return timeperiod;
	// 	}

	// 	switch (timeperiod) {
	// 		case "last_hour":
	// 			return (new Date()).getTime() - 1000 * 60 * 60;
	// 		case "last_day":
	// 			return (new Date()).getTime() - 1000 * 60 * 60 * 24;
	// 		case "last_week":
	// 			return (new Date()).getTime() - 1000 * 60 * 60 * 24 * 7;
	// 		case "last_month":
	// 			return (new Date()).getTime() - 1000 * 60 * 60 * 24 * 7 * 4;
	// 		case "everything":
	// 		default:
	// 			return 0;
	// 	}

	// }
	// var timeperiod = parseTimeperiod(localStorage['timeperiod']);
	// var dataToRemove = {
	// 	"cache": true,
	// 	"appcache": true,
	// 	"cookies": false,
	// 	"downloads": false,
	// 	"indexedDB": true,
	// 	"localStorage": true,
	// 	"pluginData": true,
	// 	"webSQL": true,
	// 	"fileSystems": true
	// };
	// // new API since Chrome Dev 19.0.1055.1
	// if (chrome['browsingData'] && chrome['browsingData']['removeAppcache']) {
	// 	chrome.browsingData.remove({
	// 		'since': timeperiod
	// 	}, dataToRemove, function() {
	// 		startTimeout(function() {
	// 			chrome.browserAction.setBadgeText({
	// 				text: ""
	// 			});
	// 			chrome.browserAction.setPopup({
	// 				popup: ""
	// 			});
	// 			//_iconAnimation.fadeOut();
	// 		}, 500);
	// 	});

	// 	// new API since Chrome Dev 19.0.1049.3
	// } else if (
	// 	chrome['experimental'] && chrome['experimental']['browsingData'] &&
	// 	chrome.experimental['browsingData']['removeAppcache']
	// ) {
	// 	chrome.experimental.browsingData.remove({
	// 		'since': timeperiod
	// 	}, dataToRemove, function() {
	// 		startTimeout(function() {
	// 			chrome.browserAction.setBadgeText({
	// 				text: ""
	// 			});
	// 			chrome.browserAction.setPopup({
	// 				popup: ""
	// 			});
	// 			// _iconAnimation.fadeOut();
	// 		}, 500);
	// 	});

	// } else if (
	// 	chrome['experimental'] &&
	// 	chrome['experimental']['browsingData']
	// ) {
	// 	// new API since Chrome Dev 19.0.1041.0
	// 	chrome.experimental.browsingData.remove(timeperiod, dataToRemove,
	// 		function() {
	// 			startTimeout(function() {
	// 				chrome.browserAction.setBadgeText({
	// 					text: ""
	// 				});
	// 				chrome.browserAction.setPopup({
	// 					popup: ""
	// 				});
	// 				//_iconAnimation.fadeOut();
	// 			}, 500);
	// 		});

	// } else if (chrome['experimental']) {
	// 	// old API
	// 	chrome['experimental'].clear.browsingData(timeperiod, dataToRemove,
	// 		function() {
	// 			startTimeout(function() {
	// 				chrome.browserAction.setBadgeText({
	// 					text: ""
	// 				});
	// 				chrome.browserAction.setPopup({
	// 					popup: ""
	// 				});
	// 				//_iconAnimation.fadeOut();
	// 			}, 500);
	// 		});
	// } else {
	// 	console.error("No matching API found! (Really old browser version?)");
	// }
	var Cache = function() {
		this.init();
	};
	Cache.prototype = {
		init: function() {
			var _this = this;
			_this.id = menus.create({
				title: 'Clear browser cache',
				enabled: true,
				onclick: function() {
					_this.onclick();
				}
			});

			function run() {
				menus.update(_this.id, {
					enabled: true
				});
			}

			function callback(tabId, tabStatus, currentTab) {
				if (tabStatus.status === 'loading') {

				} else if (tabStatus.status === 'complete') {
					run(tabId);
				} else if (tabStatus.windowId && !currentTab && tabStatus.isWindowClosing === undefined) { //selected
					run(tabId);
				} else if (tabStatus.isWindowClosing === false) { //remove
				}

			}
			chrome.tabs.onSelectionChanged.addListener(callback);
			chrome.tabs.onUpdated.addListener(callback);
			chrome.tabs.onRemoved.addListener(callback);
		},
		onclick: function() {
			if (window.confirm('确定要删除吗？')) {
				this.clear();
			}
		},
		clear: function() {
			var _this = this;
			menus.update(_this.id, {
				enabled: false
			});
		}
	};
	return Cache;
});