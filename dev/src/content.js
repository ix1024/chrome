(function(window) {
	console.log('content');
	chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
		//alert('shoudao');
		alert(request);
		console.log('request', request);
		console.log('sender', sender);
		console.log('sendResponse', sendResponse);
		// sendResponse({
		// 	msg: 'shoudaole'
		// });
		var img = new Image();
		img.onload = function() {
			//$(this).append('body');
			alert(this);
			document.body.appendChild(this);
		};
		img.src = request.captureData;
		console.log(img);
	});

	function run() {
		 
		var getInfo = function() {
			//console.log('content page');
			var scripts = document.scripts || [];
			var scriptsSrc = [];
			var links = document.getElementsByTagName('link') || [];
			var linksHref = [];
			for (var s = 0, len = scripts.length; s < len; s++) {
				if (scripts[s].src) {
					scriptsSrc.push(scripts[s].src);
				}
			}
			for (var l = 0, lens = links.length; l < lens; l++) {
				if (links[l].rel === 'stylesheet') {
					linksHref.push(links[l].href);
				}
			}
			//console.log(scriptsSrc);
			//console.log(linksHref);
			chrome.extension.sendMessage({
				scripts: scriptsSrc,
				links: linksHref,
			}, function(response) {});
		};

		chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
			//alert('收到');
			//console.log(request, sender, sendResponse);
			getInfo();
		});
		getInfo();
	}
	$(function() {
		run();
	});
	setTimeout(run, 3000);
	window.addEventListener('load', run, false);
})(this);