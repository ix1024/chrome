define([
	'tabs',
	'menus',
	'chromeExtension',
	'clear',
	'view',
	'cache',
	'capture',
	'img',
	'notice'
], function(
	tabs,
	menus,
	chromeExtension,
	Clear,
	View,
	Cache,
	Capture,
	Img,
	notice
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
			var view,
				clear,
				cache,
				capture,
				viewImageUrl;

			console.log(notice);
			var viewImageId = menus.create({
				title: '查看图片',
				contexts: ['all'],
				onclick: function(data) {
					console.log('查看背景图片data', data);
					if (viewImageUrl) {

						window.open(viewImageUrl, '_blank');
						return;
						chrome.tabs.create({
							url: 'html/image.html',
							selected: true
						}, function(tab) {

							setTimeout(function() {
								chrome.tabs.sendMessage(tab.id, {
									viewImageUrl: viewImageUrl,
									tabId: tab.id
								}, function(response) {});
							}, 200);

						});

						return;
						chromeExtension.sendMessage({
							viewImageUrl: viewImageUrl
						}, function(response) {
							//alert(2015);
						});
					}

				}
			});



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
			//capture = new Capture();
			view = new View();
			menus.create({
				type: 'separator'
			});
			menus.create({
				type: 'separator'
			});
			clear = new Clear();

			//cache = new Cache();

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

			//查看图片
			function getViewImageUrl(request) {
				var req = request || {},
					url = req.viewImageUrl || '';
				//if (url) {
				viewImageUrl = url;
				console.log('设置查看URL', url);
				//}
			}

			function sendMessage(tabId) {
				console.log('sendMessage', tabId);
				chrome.tabs.sendMessage(tabId, {
					tabId: tabId
				}, function(response) {});
				update();
			};

			//监听事件
			chromeExtension
				.onMessage.addListener(function(request) {
					console.log('main request', request);
					update(request);
					getViewImageUrl(request);
				});


			function callback(tabId, tabStatus, currentTab) {
				if (tabStatus.status === 'loading') {

				} else if (tabStatus.status === 'complete') {

					sendMessage(tabId);
				} else if (tabStatus.windowId && !currentTab && tabStatus.isWindowClosing === undefined) { //selected

					sendMessage(tabId);
				} else if (tabStatus.isWindowClosing === false) { //remove

				}

			}
			chrome.tabs.onSelectionChanged.addListener(callback);
			chrome.tabs.onUpdated.addListener(callback);
			chrome.tabs.onRemoved.addListener(callback);

		}
	};
});