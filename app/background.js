(function() {

	// var notification = new Notification("我的消息", {
	// 	body: '内容',
	// 	iconUrl: 'icons/plugin_32.png',
	// 	image: 'icons/plugin_32.png',
	// 	// buttons: [{
	// 	// 	title: '33',
	// 	// 	iconUrl: 'icons/plugin_16.png'
	// 	// }],
	// 	tag: {}, // 可以加一个tag 
	// });

	// console.log(chrome.history);
	// chrome.management.getAll(function(item) {
	// 	console.log(item);
	// 	var $app = $('#app');
	// 	var result = [];
	// 	item.forEach(function(item) {
	// 		result.push('<img src="' + item.appLaunchUrl + '" alt="" />');
	// 	});
	// 	$app.html(result.join(''));
	// });
	//notification.show();
	var KW = {
		$: function(id) {
			return document.getElementById(id);
		},
		init: function() {
			this.weather();
			this.showDateTime();
			this.setting();
			this.bookmarks();
			setTimeout(this.rainy, 2003);
			// $.ajax({
			// 	url: 'http://php.weather.sina.com.cn/iframe/index/w_cl.php?code=js&day=0&city=%E6%B7%B1%E5%9C%B3&dfc=1&charset=utf-8',
			// 	success: function(data) {
			// 		console.log(data);
			// 	}
			// });
		},
		setting: function() {
			var $settingBody = $('#settingBody');
			var status = true;
			var width = '';
			$('#setting').click(function() {
				if (status) {
					width = '20rem';
					status = false;
				} else {
					width = '';
					status = true;
				}
				$settingBody.css({
					width: width
				}); //.toggleClass('fadeInDown animated');
			});
		},
		weather: function(option) { //天气
			var _this = this,
				ops = option || {},
				url = 'http://php.weather.sina.com.cn/xml.php?city=%C9%EE%DB%DA&password=DJOYnieT8234jlsK&day=1';
			$.ajax({
				url: url,
				dataType: 'xml',
				success: function(data) {
					//console.log(data);
					var result = [];
					$(data).find('Weather').each(function(i, element) {
						var city = $(element).find('city').text();
						var temperature1 = $(element).find('temperature1').text();
						var temperature2 = $(element).find('temperature2').text();
						var status1 = $(element).find('status1').text();
						var status2 = $(element).find('status2').text();
						var udatetime = $(element).find('udatetime').text();
						//console.log(element);
						//console.log(city, temperature1, temperature2, udatetime);
						result.push('<span>' + city + '</span>');
						result.push('<span>' + status1 + '</span>');
						result.push('<span>温度：' + temperature1 + '/' + temperature2 + '</span>');
						result.push('<span></span>');
						result.push('<span></span>');
						//result.push('<span>更新时间：' + udatetime + '</span>');
						$('.wearther').html(result.join(''));
					});
				}
			});
		},
		rainy: function() { //雨滴

			// var engine = new RainyDay({
			// 	image: document.getElementById('img'), // Image element
			// 	// This value is required
			// 	parentElement: someDiv, // Element to be used as a parent for the canvas
			// 	// If not provided assuming the 'body' element
			// 	crop: [0, 0, 50, 60], // Coordinates if only a part of the image should be used
			// 	// If not provided entire image will be used
			// 	blur: 10, // Defines blur due to rain effect
			// 	// Assuming 10 if not provided
			// 	// Use 0 value to disable the blur
			// 	opacity: 1 // Opacity of rain drops
			// 		// Assuming 1 if not provided
			// });
			// engine.rain(
			// 	[
			// 		[1, 0, 20], // add 20 drops of size 1...
			// 		[3, 3, 1] // ... and 1 drop of size from 3 - 6 ...
			// 	],
			// 	100); // ... every 100ms
			var image = document.getElementById('img');
			var bgImage = document.getElementById('bgImage');
			image.onload = function() {
				var engine = new RainyDay({
					image: this,
					parentElement: bgImage
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
			image.src = 'stylesheets/images/bg1.jpg';
		},
		showDateTime: function() {
			var dateTime = this.$('dateTime');

			function zeor(num) {
				return num < 10 ? '0' + num : num;
			}
			var week = {
				1: '星期一',
				2: '星期二',
				3: '星期三',
				4: '星期四',
				5: '星期五',
				6: '星期六',
				0: '星期日'
			};
			var date = new Date();
			//console.log(date.getDay());

			function _run() {
				var d = new Date();
				var year = d.getFullYear();
				var month = d.getMonth() + 1;
				var date = d.getDate();
				var hours = d.getHours();
				var minute = d.getMinutes();
				var second = d.getSeconds();
				dateTime.innerHTML = '' +
					'<div class="time"><p>' + hours + ':' + zeor(minute) + '<sup>' + ((hours >= 0 && hours < 12) ? 'AM' : 'PM') + '</sup><sub>' + zeor(second) + '</sub></p></div><div class="date"></div>' +
					'<div class="date">' + week[d.getDay()] + ' ' + year + '/' + zeor(month) + '/' + date + '</div>';
				setTimeout(_run, 1000);
			}

			_run();
		},
		bookmarks: function() {
			var _this = this,
				result = _this.$('result');
			// chrome.cookies.getAllCookieStores(function(item) {
			// 	console.log(item);
			// 	item[0].tabIds.forEach(function(item) {
			// 		chrome.cookies.get(item, function(item) {
			// 			console.log(item);
			// 		});
			// 	});

			// });


			// function getList(obj) {
			// 	var result = [];
			// 	var _obj = obj || {};
			// 	if (_obj.url) {
			// 		result.push(obj);
			// 	} else if (_obj.children && _obj.children.length) {
			// 		_obj.children.forEach(function(item) {
			// 			if (item.children) {
			// 				result.push(getList(item));
			// 			} else {
			// 				result.push(item);
			// 			}
			// 		});
			// 	}
			// 	return result;
			// }

			// chrome.bookmarks.getTree(function(list) {
			// 	var all = list || [];
			// 	var books = [];
			// 	var finaliyArr = [];
			// 	//return;
			// 	books.push('<ul class="books">')
			// 	all.forEach(function(item) {
			// 		var toolbar = item.children[0];
			// 		var toolbarChildren = toolbar.children || [];
			// 		var result = [];
			// 		var finaliy = [];
			// 		//获取所有数据
			// 		toolbarChildren.forEach(function(item) {
			// 			result.push(getList(item));
			// 		});
			// 		result.forEach(function(item) {
			// 			item.forEach(function(item) {
			// 				finaliyArr.push(item);

			// 			});

			// 		});

			// 	});
			// 	//console.log(finaliyArr);
			// 	finaliyArr.length = 10;
			// 	finaliyArr.forEach(function(item, i) {
			// 		var url = item.url || '';
			// 		var arr = url.split('/');

			// 		if (!item.url || arr[0] === 'chrome:' || arr[0] === 'file:') {
			// 			return;
			// 		}
			// 		books.push('<li class="fadeInUpBig animated"><a href="' + item.url + '" title="' + item.title + '"><img src="' + arr[0] + '//' + arr[2] + '/favicon.ico" alt="" /></a><span>' + item.title + '</span></li>');
			// 	});
			// 	books.push('</ul>');
			// 	result.innerHTML = books.join('');
			// });

			var searchBooksList = _this.$('searchBooksList');
			_this.$('searchBooks')
				.addEventListener('keyup', function() {
					var val = this.value || '';
					if (!val) {
						searchBooksList.innerHTML = '';
						return;
					}
					chrome.bookmarks.search(val, function(list) {
						var result = [];
						result.push('<ul class="search-books-list">');
						if (!list.length) {
							result.push('没有找到');
						}
						list.forEach(function(item) {
							if (!item.url) {
								return;
							}
							result.push('<li class=""><a href="' + item.url + '">' + item.url + '</a><span>' + item.title + '</span></li>');
						});
						result.push('</ul>');
						searchBooksList.innerHTML = result.join('');
					});

				});
		}
	};

	window.KW = KW;

})(this);


document.addEventListener('DOMContentLoaded', function() {
	KW.init();
});