define(function() {
	var CreateImage = function(options) {
		var ops = options || {};
		var _this = this;
		_this.src = ops.src;
		_this.onload = ops.onload || function() {};
		_this.onerror = ops.onerror || function() {};
		_this.img = new Image();
		_this.img.onload = function() {
			_this.onload.call(_this.img);
		};
		_this.img.onerror = function() {
			_this.onerror.call(_this.img);
		};
		_this.img.src = this.src;
	};

	return CreateImage;
});