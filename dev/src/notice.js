// define([], function() {

// 	var Notification = window.Notification || window.mozNotification || window.webkitNotification;
// 	var timer;
// 	var num = 0;
// 	var arr = ['', '注意哦', '不太好啦', '严重啦', '很严重啦', '相当糟糕'];
// 	var name = localStorage.getItem('name') || '亲';
// 	var startTime = new Date();

// 	function getConfig() {
// 		var defaultConfig = {
// 			time: 15
// 		};
// 		var config = defaultConfig;
// 		try {
// 			config = JSON.parse(localStorage.getItem('config'));
// 		} catch (ev) {
// 			config = defaultConfig;
// 		}
// 		return config;
// 	}

// 	function getTime(startTime, endTime) {
// 		return Math.ceil((endTime.getTime() - startTime.getTime()) / (1000 * 60));
// 	}

// 	function getArr(index) {
// 		var _index = index >= arr.length ? arr.length - 1 : index;
// 		return arr[_index];
// 	}

// 	function run(time, msg) {

// 		var status = false;

// 		clearTimeout(timer);
// 		num++;
// 		timer = setTimeout(function() {
// 			if (num >= 10) {
// 				alert(num);
// 			}
// 			var endTime = new Date();
// 			var ontification = new Notification('健康提示' + (num > 1 ? '  已经第' + num + '次提示了，' + getArr(num) : ''), {
// 				icon: '/icons/heshui.jpg',
// 				body: name + '，该动一动啦，该喝水啦！\n\n您已经' + msg + '分钟没休息了；不能坐太久啦，赶紧走走走吧，你的身体已经透支啦，快快行动吧。'
// 			});
// 			ontification.onclick = function() {
// 				startTime = new Date();
// 				status = true;
// 				ontification.close();

// 				run(2 * 30 * 60 * 1000, getTime(startTime, endTime));
// 				//run(0, getTime(startTime, endTime));
// 				num = 0;
// 				//run(1000, getTime(startTime, endTime));
// 			};
// 			ontification.onshow = function() {

// 			};
// 			ontification.onclose = function() {
// 				ontification = null;
// 				if (!status) {
// 					run(10000, getTime(startTime, endTime));
// 				}
// 			};

// 		}, time);
// 	}
// 	run(0, 0);
// 	return {};
// });