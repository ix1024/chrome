//alert('contentjs');
(function() {
	function run() {
		var scripts = document.scripts || [];
		var scriptArr = [];
		for (var s = 0, len = scripts.length; s < len; s++) {
			var script = scripts[s];
			if (script.src) {
				scriptArr.push(script.src);
			}
			//console.log(script.src);
		}
		// window.postMessage(scriptArr, '*');
		// chrome.runtime.connect().postMessage(scriptArr);
		// alert(scriptArr.join('\n'));
		chrome.runtime.sendMessage({
			scripts: scriptArr,
			name: 'kingwell',
			greeting: "hello"
		}, function(response) {
			console.log('send', response.farewell);
		});
	}
	setTimeout(run, 2000);
})();
// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
// 	alert(0);
// });

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	var scripts = request.scripts || [];
	console.log(sender.tab ? "from a content script:" + sender.tab.url : "from the extension");
	console.log(request);
	console.log(sender);
	console.log(sendResponse);
	scripts.forEach(function(item) {
		chrome.contextMenus.create({
			title: item,
			parentId: js,
			onclick: onClick
		});
	});
	// chrome.contextMenus.update(showJs, {}, function() {

	// });
	if (request.greeting == "hello")
		sendResponse({
			farewell: "kingwell"
		});
});

// chrome.runtime.onConnect.addListener(
// 	function(port) {
// 		port.onMessage.addListener(function(msg) {
// 			port.postMessage({
// 				counter: msg.counter + 1
// 			});
// 		});
// 	});

// chrome.extension.onRequest.addListener(
// 	function(request, sender, sendResponse) {
// 		sendResponse({
// 			counter: request.counter + 1
// 		});
// 	});

// var port = chrome.runtime.connect({
// 	name: "knockknock"
// });
// port.postMessage({
// 	name: "Kingwell"
// });
// port.onMessage.addListener(function(msg) {
// 	if (msg.question == "Who's there?")
// 		port.postMessage({
// 			answer: "Madame"
// 		});
// 	else if (msg.question == "Madame who?")
// 		port.postMessage({
// 			answer: "Madame... Bovary"
// 		});
// });



// var newsArray = [];
// for (var i = 0; i < len; i++) {
// 	newsArray.push($(alist[i]).attr('title'));
// }
// chrome.extension.sendMessage({
// 	cmd: "setNewsArr",
// 	'arr': newsArray
// }, function(response) {});