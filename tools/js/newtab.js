(function(window, undefined) {
	var dateResult = document.getElementById('dateResult');
	var year = document.getElementById('year');
	var fixDate = function(num) {
		var str = num.toString() || '';
		return num < 10 ? '<i>0</i><i>' + num + '</i>' : '<i>' + str.slice(0, 1) + '</i><i>' + str.slice(1, 2) + '</i>';
	};
	var weekText = ['星期一', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];

	function getTime() {


		function run() {
			var date = new Date();
			var y = date.getFullYear();
			var m = date.getMonth();
			var d = date.getDate();
			var h = date.getHours();
			var mi = date.getMinutes();
			var s = date.getSeconds();
			var w = date.getDay();

			var result = ['<span>' + fixDate(h) + '</span>',
				'<span>' + fixDate(mi) + '</span>',
				//'<span>' + fixDate(s) + '</span>'
			];
			dateResult.innerHTML = result.join('<i>:</i>');
			year.innerHTML = y + '年 ' + m + '月' + d + '日 ' + weekText[w];
			setTimeout(run, 1000);
		}
		run();

	}
	getTime();
	var size = 400;
	new CanvasClock({
		el: document.getElementById('clock1'),
		width: size - 100,
		height: size - 100
	});
	// new CanvasClock({
	// 	el: document.getElementById('clock2'),
	// 	width: size,
	// 	height: size
	// });
	// new CanvasClock({
	// 	el: document.getElementById('clock3'),
	// 	width: size+200,
	// 	height: size+200
	// });
	// new CanvasClock({
	// 	el: document.getElementById('clock4'),
	// 	width: size+300,
	// 	height: size+300
	// });
})(this);