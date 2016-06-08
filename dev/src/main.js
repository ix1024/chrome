define([
	'tabs',
	'menus',
	'chromeExtension',
	'clear',
	'view'
], function(tabs, menus, chromeExtension, Clear, View) {
	// chrome.tabs.query({
	// 	active: true
	// }, function(tab) {
	// 	console.log('tab', tab);
	// });
	var sendMessage = function(tabId) {
		console.log(tabId);
		chrome.tabs.sendMessage(tabId, {
			tabId: tabId
		}, function(response) {});
	};
	chrome.tabs.onSelectionChanged.addListener(sendMessage);
	chrome.tabs.onCreated.addListener(sendMessage);
	chrome.tabs.onUpdated.addListener(sendMessage);
	//chrome.tabs.onMoved.addListener(sendMessage);



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



	return {
		createHeader: function(title) {
			menus.create({
				title: title,
				id: title,
				enabled: false
			});
		},
		init: function() {
			this.createHeader('JS CSS 查看');
			var view = new View();
			menus.create({
				type: 'separator'
			});
			menus.create({
				title: 'Cookies操作',
				id: 'Cookies操作',
				enabled: false
			});
			var clear = new Clear();
			//new Clear();
			var update = function(request, sender, sendResponse) {
				var scripts = request.scripts || [];
				var links = request.links || [];
				//console.log(scripts, links);
				view.updateJs(scripts);
				view.updateCss(links);
			};
			chromeExtension.onMessage.addListener(update);
		}
	};
});