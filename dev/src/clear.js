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
		getTitle: function(size) {
			var str = size ? '(' + size + ')' : '';
			return 'Clear Cookies' + str;
		},
		init: function() {
			var _this = this;

			_this.id = menus.create({
				title: _this.getTitle(),

				onclick: function() {
					_this.onclick();
				}
			});
			_this.update();
		},
		onclick: function() {
			var _this = this;
			if (window.confirm('确定要删除吗？')) {
				_this.clearAll();
			}
			_this.update();
		},
		update: function() {
			var _this = this;
			_this.getAll(function(data) {
				var list = data || [];
				console.log(list.length);
				menus.update(_this.id, {
					title: _this.getTitle(list.length),
					enabled: !!list.length,
					onclick: function() {
						_this.onclick();
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
		clearAll: function() {
			var _this = this;
			this.getAll(function(data) {
				var list = data || [];

				if (_this.domain) {
					list.forEach(function(cookie) {
						var url = "http" + (cookie.secure ? "s" : "") + "://" + cookie.domain +
							cookie.path;
						console.log(cookie, url, '  ', cookie.name);
						if (url.indexOf(_this.domain) !== -1) {
							chrome.cookies.remove({
								url: url,
								name: cookie.name
							});
						}
					});
				} else {
					list.forEach(function(cookie) {
						var url = "http" + (cookie.secure ? "s" : "") + "://" + cookie.domain +
							cookie.path;
						console.log(cookie, url, '  ', cookie.name);
						chrome.cookies.remove({
							url: url,
							name: cookie.name
						});
					});
				}
				_this.update();
			});
		},
		clear: function() {

		},
	};
	return Clear;
});