// console.log(chrome);
// chrome.windows.getAll(function(all) {
// 	console.log(all);
// });
// chrome.tabs.getAllInWindow(function(all) {
// 	console.log(all);
// });
// chrome.extension.getBackgroundPage(function(info) {
// 	console.log(info);
// });
// chrome.extension.getViews(function(info) {
// 	console.log(info);
// });

//In background.js:
// React when a browser action's icon is clicked.
chrome.browserAction.onClicked.addListener(function(tab) {
	var viewTabUrl = chrome.extension.getURL('image.html');
	var imageUrl = 'https://www.baidu.com/img/bd_logo1.png'/* an image's URL */ ;
	// Look through all the pages in this extension to find one we can use.
	var views = chrome.extension.getViews();
	for (var i = 0; i < views.length; i++) {
		var view = views[i];
		// If this view has the right URL and hasn't been used yet...
		if (view.location.href == viewTabUrl && !view.imageAlreadySet) {
			// ...call one of its functions and set a property.
			view.setImageUrl(imageUrl);
			view.imageAlreadySet = true;
			break; // we're done
		}
	}
});