require([
	'jquery',
	'create-image'
], function(
	$,
	CreateImage
) {

	var imgBox = document.getElementById('imgBox');

	chrome.extension.onMessage.addListener(function(
		request,
		sender,
		sendResponse
	) {
		//alert('收到');
		console.log('image request', request);
		if (request.imageData) {
			var img = new Image();
			img.onload = function() {
				imgBox.appendChild(this);
			};
			img.src = request.imageData;
			imgBox.innerHTML = '';
			imgBox.appendChild(img);
		}

		//查看图片
		chrome.tabs.getCurrent(function(tab) {
			if (tab.id === request.tabId) {
				if (request.viewImageUrl) {
					var img = new CreateImage({
						src: request.viewImageUrl,
						onload: function() {

							imgBox.innerHTML = '';
							imgBox.appendChild(this);

						},
						onerror: function() {

						}
					});
				}
			}
		});


	});
});