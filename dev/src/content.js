(function(window) {

	function run() {
		var getInfo = function() {
			console.log('content page');
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
			getInfo();
		});
		getInfo();
	}
	$(function() {
		run();
	});
})(this);