define([
	'tabs',
	'menus',
	'cookies'
], function(tabs, menus, cookies) {
	menus.removeAll();

	var Clear = function() {
		this.init();
	};
	Clear.prototype = {
		domain: '',
		CURRENT_TEXT: 'Clear current domain cookie',
		CLEAR_ALL_TEXT: 'Clear browser cookies',
		getTitle: function(size, text) {
			//var str = size ? '(' + size + ')' : '';
			var str = '(' + (size || 0) + ')';
			var title = text || this.CLEAR_ALL_TEXT;
			return title + str;
		},
		init: function() {
			var _this = this;

			_this.currentId = menus.create({
				title: _this.CURRENT_TEXT,
				onclick: function() {
					_this.clearCurrentDomainCookie();
				}
			});
			_this.id = menus.create({
				title: _this.getTitle(),
				onclick: function() {
					_this.onclick();
				}
			});


			function run() {
				_this.update();
				_this.updateCurrentDomainCookie();
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
			var _this = this;
			if (window.confirm('确定要删除吗？')) {
				_this.clearAll();
			}


		},
		updateCurrentDomainCookie: function() {
			var _this = this;
			_this.getCurrentCookies(function(cookies, length, domain) {
				//console.log('current cookie', length);
				menus.update(_this.currentId, {
					title: _this.getTitle(length, _this.CURRENT_TEXT),
					onclick: function() {
						_this.clearCurrentDomainCookie();
						_this.update();
					}
				});
			});
		},
		update: function() {
			var _this = this;
			_this.getAll(function(data) {
				var list = data || [];
				//console.log('cookie all size', list.length);
				menus.update(_this.id, {
					title: _this.getTitle(list.length),
					enabled: !!list.length,
					onclick: function() {
						_this.onclick();
						_this.clearCurrentDomainCookie();
					}
				});
			});
		},
		getAll: function(callback) {
			cookies.getAll({}, function(cookies) {
				var list = cookies || [];
				if (callback) {
					callback(list);
				}
			});
		},
		getCurrentCookies: function(callback) {
			var _this = this;
			_this.getCurrentWindow(function(currentWindow) {
				_this.getAll(function(cookies) {
					var resultList = [];
					var domain = '';
					cookies.forEach(function(cookie) {
						if (currentWindow.url.indexOf(cookie.domain) !== -1) {

							domain = cookie.domain;
							resultList.push(cookie);
						}
					});
					callback(resultList, resultList.length, domain);
				});
			});
		},
		getCurrentWindow: function(callback) {
			chrome.tabs.getAllInWindow(function(windows) {
				windows.forEach(function(item) {
					if (item.selected) {
						callback(item, window);
						//console.log(item, windows);
					}
				});
			});
		},
		removeCookie: function(cookie) {
			var url = "http" + (cookie.secure ? "s" : "") + "://" + cookie.domain + cookie.path;
			chrome.cookies.remove({
				url: url,
				name: cookie.name
			});
		},
		clearCurrentDomainCookie: function() {
			var _this = this;
			_this.getCurrentCookies(function(cookies, length) {
				cookies.forEach(function(cookie) {
					_this.removeCookie(cookie);
				});
				_this.updateCurrentDomainCookie();
				_this.update();
			});
		},
		clearAll: function() {
			var _this = this;
			this.getAll(function(data) {
				var list = data || [];
				list.forEach(function(cookie) {
					var url = "http" + (cookie.secure ? "s" : "") + "://" + cookie.domain +
						cookie.path;
					//console.log(cookie, url, '  ', cookie.name);
					_this.removeCookie(cookie);
				});
				_this.update();
				_this.updateCurrentDomainCookie();
			});
		},
		clear: function() {

		},
	};
	return Clear;
});