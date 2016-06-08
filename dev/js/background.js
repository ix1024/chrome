chrome.contextMenus.removeAll(function() {
	//alert('removeAll');
});
var hideImage = chrome.contextMenus.create({
	title: 'All Images',
	type: 'checkbox',
	checked: true,
	onclick: function(info, tab) {
		// console.log(info, tab);
		if (info.checked) {
			alert(1);
		} else {
			alert(0);
		}
	}
}, function(a, b) {
	//console.log(a, b, hideImage);
});
var js = chrome.contextMenus.create({
	title: 'View Javascript'
});
var css = chrome.contextMenus.create({
	title: 'View CSS'
});

// var showJs = chrome.contextMenus.create({
// 	title: '000',
// 	parentId: js,
// 	// callback: function() {
// 	//   alert(0)
// 	// }
// }, function(a, b, c, d) {
// 	//console.log(a, b, c, d);
// });

function onClick(info, tab, a) {
	console.log(info, tab, a);
}

// chrome.contextMenus.onClickData.addListener(function(){
// 	alert(0);
// });

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	var scripts = request.scripts || [];
	console.log(sender.tab ? "from a content script:" + sender.tab.url : "from the extension");
	console.log(request);
	console.log(sender);
	console.log(sendResponse);
	scripts.forEach(function(item) {
		chrome.contextMenus.create({
			title: item,
			parentId: js,
			onclick: onClick
		});
	});
	// chrome.contextMenus.update(showJs, {}, function() {

	// });
	if (request.greeting == "hello")
		sendResponse({
			farewell: "kingwell"
		});
	chrome.tabs.onSelectionChanged.addListener(function(a, b) {
		console.log(a, b);
		sendResponse({
			name: 'kingwell Leng'
		});
	});
});
chrome.runtime.onConnect.addListener(function(port) {
	console.assert(port.name == "knockknock");
	port.onMessage.addListener(function(msg) {
		if (msg.joke == "Knock knock")
			port.postMessage({
				question: "Who's there?"
			});
		else if (msg.answer == "Madame")
			port.postMessage({
				question: "Madame who?"
			});
		else if (msg.answer == "Madame... Bovary")
			port.postMessage({
				question: "I don't get it."
			});
	});
});

function win(a, b, c, d) {
	console.log(a, b, c, d);
}
//chrome.windows.onFocusChanged.addListener(win);
//chrome.windows.getLastFocused(win);
//chrome.windows.getCurrent(win);

//chrome.tabs.onAttached.addListener(win);


var app = {
	init: function() {
		this.cookie.init();
	},
	cookie: {
		init: function() {
			app.cookie.all = chrome.contextMenus.create({
				title: 'Clear All Cookies',
				onclick: function() {
					if (window.confirm('您确定要删除浏览器所有Cookies？')) {
						app.cookie.clearAll();
					}
				}
			});
			app.cookie.update();
		},
		update: function() {
			app.cookie.get(function(list) {
				console.log('update');
				chrome.contextMenus.update(app.cookie.all, {
					title: 'Clear All Cookies(' + list.length + ')'
				}, function() {});
			});
		},
		get: function(callback) {
			chrome.cookies.getAll({}, function(cookies) {
				var list = cookies || [];
				if (callback) {
					callback(list);
				}
			});
		},
		clearAll: function() {
			app.cookie.get(function(cookies) {
				var list = cookies || [];
				list.forEach(function(cookie) {
					var url = "http" + (cookie.secure ? "s" : "") + "://" + cookie.domain +
						cookie.path;
					console.log(cookie, url, '  ', cookie.name);
					chrome.cookies.remove({
						url: url,
						name: cookie.name
					});
				});
				app.cookie.update();
			});
		},
		createAll: function() {

		}
	}
};
app.init();


chrome.tabs.onSelectionChanged.addListener(function(a, b) {
	app.cookie.update();
	console.log('Tab切换', a, b);
	chrome.runtime.sendMessage({
		name: '窗口变了',
		greeting: "hello"
	}, function(response) {
		console.log('发送', response);
	});
});