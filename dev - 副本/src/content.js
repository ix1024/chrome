(function(window) {

	/**
	 **
	 ** 查看脚本，样式
	 **
	 **/

	var content = {
		getJS: function() {

			var scripts = document.scripts || [],
				scriptsSrc = [];
			for (var s = 0, len = scripts.length; s < len; s++) {
				if (scripts[s].src) {
					scriptsSrc.push(scripts[s].src);
				}
			}
			return scriptsSrc;
		},
		getCSS: function() {

			var links = document.getElementsByTagName('link') || [],
				linksHref = [];

			for (var l = 0, lens = links.length; l < lens; l++) {
				if (links[l].rel === 'stylesheet') {
					linksHref.push(links[l].href);
				}
			}
			return linksHref;
		},
		sendMessage: function(options) {
			var _this = this;
			var ops = options || {};
			var sendData = {
				scripts: _this.getJS(),
				links: _this.getCSS(),
			};
			for (var key in ops) {
				sendData[key] = ops[key];
			}
			chrome.extension.sendMessage(sendData, function(response, a, b) {
				//console.log('sendMessage', response, a, b);
			});
		},
		onMessage: function() {
			var _this = this;
			chrome
				.extension
				.onMessage
				.addListener(function(request, sender, sendResponse) {
					//console.log(request, sender, sendResponse);
					_this.sendMessage();
				});
		}
	};
	content.onMessage();

	/**
	 **
	 ** 查看图片
	 **
	 **/
	$(document)
		.on('contextmenu', function(ev) {

			var $target = $(ev.target),
				img = $target.is('img') ? $target.attr('src') : getCssUrl($target),
				$parent = $target.parent(),
				status = true,
				url = '';

			//获取URL
			function getCssUrl(element) {
				var img = $(element).css('backgroundImage');
				if (element.length && img && 'none' !== img) {
					return img.slice(5, -2);
				} else {
					return '';
				}
			}

			if (!img) {
				while ($parent.length && status) {
					$parent = $parent.parent();
					if ($parent.length && $parent[0].nodeType === 1) {
						if (!$parent.length) {
							status = false;
						} else {
							img = getCssUrl($parent);
							if (img) {
								status = false;
							}
						}
					}
				}
			}

			url = img.indexOf('//') === 0 ? 'http:' + img : img;
			if (url && url.indexOf('//') === -1) {
				url = location.origin + url;
			}

			if (url) {
				content.sendMessage({
					viewImageUrl: url
				});
			}



		});
})(this);