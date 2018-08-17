function CanvasClock(options) {
	var ops = options || {};
	var _this = this;
	for (var key in ops) {
		this[key] = ops[key];
	}

	var w = this.w = this.el.width = this.width;
	var h = this.h = this.el.height = this.height;
	var ct = this.ct = this.el.getContext('2d');
	var padding = 30;
	var clockBorder = 5;
	var oRadius = this.w / 2 - padding;
	var iRadius = this.w / 2 - clockBorder - padding;

	var r2 = this.w / 5;
	var r3 = this.w / 5;

	function clock() {
		var d = new Date();
		var dH = d.getHours();
		var dM = d.getMinutes();
		var dS = d.getSeconds();

		var draw = function(callback) {
			_this.ct.save();
			_this.ct.beginPath();
			callback.call(_this);
			_this.ct.closePath();
			_this.ct.restore();
		};
		_this.clear();
		// draw(function() {
		// 	ct.fillStyle = 'rgba(0,0,0,0.9)';
		// 	ct.strokeStyle = 'rgba(0,0,0,0.75)';
		// 	ct.lineWidth = 8;
		// 	ct.arc(this.w / 2, this.h / 2, oRadius, 0, Math.PI * 180);
		// 	ct.stroke();
		// 	//ct.fill();
		// });

		draw(function() {
			//ct.fillStyle = '#fff';
			ct.lineWidth = 5;
			ct.strokeStyle = 'rgba(0,0,0,.0)';
			ct.fillStyle = 'rgba(255,255,255,.0)';
			ct.arc(this.w / 2, this.h / 2, iRadius, 0, Math.PI * 180);
			ct.fill();
			ct.stroke();
		});
		var secondsColor = '#c00';
		var fz = _this.w / 10;
		ct.save();
		ct.beginPath();
		ct.translate(w / 2, h / 2);
		ct.rotate((dM + dS / 60) * 6 * Math.PI / 180);
		ct.lineWidth = _this.w / 70;

		ct.strokeStyle = '#fff';
		ct.moveTo(0, fz);
		ct.lineTo(0, -r3);
		ct.closePath();
		ct.stroke();
		ct.restore();

		var sz = _this.w / 13;

		ct.save();
		ct.beginPath();
		ct.translate(w / 2, h / 2);
		ct.rotate((dH + dM / 60) * 30 * Math.PI / 180);
		//ct.lineWidth = 10;
		ct.lineWidth = _this.w / 50;
		ct.strokeStyle = '#fff';
		ct.moveTo(0, sz);
		ct.lineTo(0, -r2);
		ct.closePath();
		ct.stroke();
		ct.restore();

		draw(function() {


			ct.translate(this.w / 2, this.h / 2);
			//ct.rotate(0 * Math.PI / 180);
			ct.rotate(dS * 6 * Math.PI / 180);
			//ct.strokeStyle = secondsColor;
			ct.fillStyle = secondsColor;
			ct.strokeStyle = '#fff';
			ct.fillStyle = '#fff';
			ct.lineJoin = 'bevel';
			var _w = this.w / 80;
			var _l = this.w / 3 - 20;
			var _b = this.w / 6;
			var _h = this.w / 10;
			ct.moveTo(-_w, _b);
			ct.lineTo(_w, _b);
			ct.lineTo(_w, -_h + _b);
			ct.lineTo(_w - 3, -_h - 5 + _b);
			ct.lineTo(2, -_l);
			ct.lineTo(-2, -_l);
			ct.lineTo(-_w + 3, -_h - 5 + _b);
			ct.lineTo(-_w, -_h + _b);
			ct.lineTo(-_w, _b);
			ct.shadowOffsetX = 0;
			ct.shadowOffsetY = 0;
			//ct.shadowColor = 'rgba(0,0,0,.5)';
			ct.shadowBlur = 1;


			//ct.stroke();
			ct.fill();

		});

		draw(function() {
			ct.fillStyle = secondsColor;
			ct.fillStyle = '#fff';
			ct.translate(this.w / 2, this.h / 2);
			ct.arc(0, 0, 10, 0, Math.PI * 180);
			ct.fill();
		});

		draw(function() {
			var r = this.w / 2 - padding - 10;
			var lineHeight = -(this.w * 0.04);
			var lineWidthBold = this.w * 0.01;
			var lineWidth = this.w * 0.004;
			var c = 0;
			for (var i = 0; i < 60; i++) {
				ct.save();
				ct.lineCap = 'square';
				ct.beginPath();
				if (i % 5 === 0) {
					ct.lineWidth = lineWidthBold;
					ct.strokeStyle = '#333';
					ct.strokeStyle = '#fff';
					c = 10;
				} else {
					ct.lineWidth = lineWidth;
					c = 0;
					ct.strokeStyle = '#666';
					ct.strokeStyle = '#fff';
				}
				ct.translate(this.w / 2, this.h / 2);
				ct.rotate(i * 6 * Math.PI / 180);
				ct.moveTo(0, -lineHeight - r + c);
				if (i % 5 === 0) {
					ct.lineTo(0, -r);
				} else {
					ct.lineTo(0, -r);
				}
				ct.closePath();
				ct.stroke();
				ct.restore();
			}
		});

		draw(function() {
			var r = this.w / 2 - padding - 10;

			var fontSize = this.w * 0.01;
			var r1 = this.w / (this.w / r) - this.w / 6 + this.w / 100 * fontSize;
			ct.translate(w / 2, h / 2);
			ct.fillColor = '#fff';
			ct.textAlign = 'center';
			ct.textBaseline = 'middle';
			ct.font = 0 + 'rem Impact';
			ct.fillText(12, 0, -r1);
			ct.fillText(3, r1, -0);
			ct.fillText(6, 0, r1);
			ct.fillText(9, -r1, -0);
			ct.fillStyle = '#ffffff';
			ct.font = fontSize / 2 + 'rem Arial';
			//ct.fillText('KINGWELL', 0, this.w * 0.15);
		});

		setTimeout(clock, 1000);
	}
	clock();

}

CanvasClock.prototype = {
	constructor: CanvasClock,
	clear: function() {
		this.ct.clearRect(0, 0, this.w, this.h);
	}
};