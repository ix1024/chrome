define([
	'tabs',
	'menus',
	'cookies'
], function(tabs, menus, cookies) {
	var View = function() {
		this.init();
	};
	View.prototype = {
		getTitle: function(title, size) {
			return title + (size ? '(' + size + ')' : '');
		},
		init: function() {
			var _this = this;
			_this.js = menus.create({
				title: _this.getTitle('View Javascripts'),
				//contexts: ['page'],
				enabled: false
			});
			_this.css = menus.create({
				title: _this.getTitle('View CSS'),
				//contexts: ['page'],
				enabled: false
			});
			_this.updateJs();
			_this.updateCss();
		},
		jsList: [],
		cssList: [],
		open: function(item) {
			var url = 'view-source:' + item;
			chrome.tabs.create({
				url: url
			});
		},
		remove: function(data) {
			var list = data || [];
			data.forEach(function(item) {
				menus.remove(item, function(a) {});
			});
		},
		updateJs: function(data) {
			var _this = this,
				list = data || [];
			_this.remove(_this.jsList);
			_this.jsList = [];
			menus.update(_this.js, {
				title: _this.getTitle('View Javascripts', list.length),
				enabled: !!list.length
			});
			list.forEach(function(item) {
				var url = item || '';
				url = url.split('/').pop();
				_this.jsList.push(
					menus.create({
						title: url,
						parentId: _this.js,
						onclick: function() {
							_this.open(item);
						}
					})
				);
			});
		},
		updateCss: function(data) {
			var _this = this,
				list = data || [];
			_this.remove(_this.cssList);
			_this.cssList = [];
			menus.update(_this.css, {
				title: _this.getTitle('View CSS', list.length),
				enabled: !!list.length
			});
			list.forEach(function(item) {
				var url = item || '';
				url = url.split('/').pop();
				_this.cssList.push(
					menus.create({
						title: url,
						parentId: _this.css,
						onclick: function() {
							_this.open(item);
						}
					})
				);
			});
		}
	};
	return View;
});