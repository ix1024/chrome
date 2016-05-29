function run() {
	var image = document.getElementById('background');
	image.onload = function() {
		var engine = new RainyDay({
			image: this
		});
		engine.rain([
			[1, 2, 8000]
		]);
		engine.rain([
			[3, 3, 0.88],
			[5, 5, 0.9],
			[6, 2, 1]
		], 100);
	};
	image.crossOrigin = 'anonymous';
	//image.src = 'http://i.imgur.com/N7ETzFO.jpg';
	image.src = 'images/opacity_0.gif';
}
 run();
 alert(3);