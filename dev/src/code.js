	//function isBlankString(s){return /\s/.test(s)};
	function pad(s, z) {
		var f = String,
			r = f(s).trim(),
			l = 'length',
			n = z[l];
		if (n > 0) {
			z = f(z);
			l = Math.max(n - r[l], 0);
			if (l > 0) {
				r = z.substr(0, l) + s
			}
		};
		return r
	};

	function padHex(s) {
		return pad(s, '0000')
	}; //while(s.length<4){s+='0'};
	function toUnicode(t) {
		var r = '';
		if (t !== r) {
			var m = [];
			for (var s, p = 'push', q = 'toString', i = 0, l = t.length; i < l; i++) {
				s = t.charAt(i);
				if (s !== r) {
					m[p](padHex(Number(s.charCodeAt()[q](10).replace(/\D/g, r))[q](16)).toUpperCase())
				}
			};
			m.unshift(r);
			r = m.join('\\u')
		};
		return r
	};

	function strimHtml(str) {
		var reg = /<(?:.|\s)*?>/ig;
		return str.replace(reg, '');
	}

	var unicode = {
		unicode: function(str) {
			return escape(str).toLocaleLowerCase().replace(/%u/gi, '\\u');
		},
		deunicode: function(str) {
			return unescape(str.replace(/\\u/gi, '%u'));
		}
	};

	var $sourceText = $('#sourceText');
	var $resultText = $('#resultText');
	var $radio = $('[name="toCode"]');
	var $clear = $('#clear');
	var checked = localStorage.getItem('checked') || '';
	if (checked) {
		$radio.each(function() {
			if ($(this).val() === checked) {
				$(this).attr('checked', true);
			}
		});
	}
	$clear.click(function() {
		$sourceText.val('');
		$resultText.val('');
	});

	function change() {
		var val = $('[name="toCode"]:checked').val();
		var sourceText = $sourceText.val() || '';
		var sourceTextArr = sourceText.split('\n');
		var result = [];
		localStorage.setItem('checked', val);
		if (!sourceText.length) {
			$resultText.val('');
			return;
		}
		switch (val) {
			case 'unicode':
				result.push(unicode.unicode(sourceText));
				break;
			case 'deunicode':
				result.push(unicode.deunicode(sourceText));
				break;
			case 'toUTF-8':
				result.push(encodeURIComponent(sourceText));
				break;
			case 'unUTF-8':
				result.push(decodeURIComponent(sourceText));
				break;
			case 'encode64':
				result.push(base64.encode(sourceText));
				break;
			case 'decode64':
				try {
					result.push(base64.decode(sourceText));
				} catch (ev) {}
				break;
			case 'TRIMHTML':
				result.push(strimHtml(sourceText));
				break;
			case 'HTMLTOJS':
				var strArr = ['var htmlResult = [\n'];
				sourceTextArr = sourceTextArr.filter(function(item) {
					return item;
				});
				$.each(sourceTextArr, function(index, item) {
					var line = ',';
					var reg = new RegExp('\'', 'ig');
					item = item.replace(reg, "\\\'");
					if (sourceTextArr.length - 1 === index) {
						line = '';
					}
					strArr.push('    \'' + item + '\'' + line + '\n');
				});
				strArr.push('].join(\'\');');
				result.push(strArr.join(''));
				break;
		}
		$resultText.val(result.join(''));
	}

	$radio
		.change(change);
	$sourceText
		.change(change)
		.keyup(change)
		.blur(change);

	$resultText
		.mouseenter(function() {
			$(this).select();
		});