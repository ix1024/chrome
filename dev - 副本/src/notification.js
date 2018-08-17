(function(window, undefined) {
	var Notification = window.Notification || window.mozNotification || window.webkitNotification;


	Notification.requestPermission(function(data) {
		//console.log(data);
	});
	var Noti = function(options) {
		var _this = this,
			ops = options || {};
		this.title = '';
		this.body = '';
		this.icon = '../icons/plugin_48.png';
		for (var key in ops) {
			this[key] = ops[key];
		}
		this.open();
	};
	Noti.prototype = {
		open: function() {
			var _this = this;
			this.id = new Notification(_this.title, {
				body: _this.body,
				icon: _this.icon
			});
			this.id.onclick = _this.onclick;
			this.id.onclose = _this.onclose;
			this.id.onerror = _this.onerror;
		},
		close: function() {
			this.id.close();
		},
		onclick: function() {},
		onclose: function() {},
	};
	// new Noti({
	// 	title: 'test',
	// 	body: 'adsf'
	// });
	window.Noti = Noti;
})(this);