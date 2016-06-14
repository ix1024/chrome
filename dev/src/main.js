define([
	'tabs',
	'menus',
	'chromeExtension',
	'clear',
	'view',
	'cache',
	'capture'
], function(
	tabs,
	menus,
	chromeExtension,
	Clear,
	View,
	Cache,
	Capture
) {

	return {
		createHeader: function(title) {
			menus.create({
				title: title,
				id: title,
				enabled: false
			});
		},
		init: function() {
			var view, clear, cache, capture;

			// chrome.tabs.query({
			// 	active: true
			// }, function(tab) {
			// 	console.log('tab', tab);
			// });
			//this.createHeader('JS CSS 查看');
			// chrome.tabs.captureVisibleTab(null, {

			// 	format: "png",

			// 	quality: 100

			// }, function(data) {
			// 	console.log(data);


			// });
			capture = new Capture();
			view = new View();
			menus.create({
				type: 'separator'
			});

			clear = new Clear();
			// menus.create({
			// 	type: 'separator'
			// });
			cache = new Cache();

			//new Clear();
			function update(request) {
				var scripts, links;
				if (request) {
					scripts = request.scripts || [];
					links = request.links || [];
				} else {
					scripts = [];
					links = [];
				}


				view.updateJs(scripts);
				view.updateCss(links);
			};

			function sendMessage(tabId) {
				console.log(tabId);
				chrome.tabs.sendMessage(tabId, {
					tabId: tabId
				}, function(response) {});
				update();
			};
			//#chromeExtension.onMessage.addListener(update);

			//#chrome.tabs.onSelectionChanged.addListener(sendMessage);
			// chrome.tabs.onCreated.addListener(sendMessage);
			//#chrome.tabs.onUpdated.addListener(sendMessage);
			// chrome.tabs.onActiveChanged.addListener(sendMessage);
			// chrome.tabs.onReplaced.addListener(sendMessage);
		}
	};
});