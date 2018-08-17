define([
	'cache'
], function(Cache) {
	var $$ = function(id) {
		return document.getElementById(id);
	};
	var dataToRemove = {
		"cache": true,
		"appcache": true,
		"cookies": false,
		"downloads": false,
		"indexedDB": true,
		"localStorage": true,
		"pluginData": true,
		"webSQL": true,
		"history": true,
		"fileSystems": true
	};
	var options = JSON.parse(localStorage.getItem('dataToRemove')) || dataToRemove;
	var html = [];
	
	//console.log(options);
	for (var key in options) {
		var id = $$(key);
		if (id) {
			id.checked = options[key];
		}
	}
	var checkboxs = document.querySelectorAll('input[type=checkbox]');
	for (i = 0, len = checkboxs.length; i < len; i++) {
		checkboxs[i].addEventListener('change', function() {
			options[this.id] = this.checked;
			localStorage.setItem('dataToRemove', JSON.stringify(options));
		}, false);
	}
	//全选
	var clear = $$('clear');
	var cache = new Cache();
	clear.addEventListener('click', function() {
		cache.onclick();
	}, false);
	return {};
});