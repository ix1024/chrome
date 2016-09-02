 var Note = function() {
 	this.init();
 };
 Note.prototype = {
 	$$: function(id) {
 		return document.getElementById(id);
 	},
 	init: function() {
 		this.getData();
 		this.getClassification();
 		console.log(this.data);
 	},
 	getData: function() {
 		var KW = JSON.parse(localStorage.getItem('KW')) || {
 			note: {
 				default: {
 					title: '默认',
 					body: '',
 					date: ''
 				}
 			}
 		};
 		this.data = KW;
 	},
 	getClassification: function() {
 		var _this = this;
 		var note = this.data.note;
 		var menu = _this.$$('menu');
 		var menuArr = [];
 		for (var key in note) {
 			var title = note[key].title;
 			var body = note[key].body;
 			console.log(key);
 			menuArr.push('<li>' + key + '</li>');
 		}
 		menu.innerHTML = menuArr.join('');

 	},
 	addClassification: function(name, body) {
 		if (name && body) {
 			if (!this.data.note[name]) {
 				this.data.note[name] = body;
 				localStorage.setItem('KW', JSON.stringify(this.data));
 			} else {
 				alert('重复');
 			}

 		}


 	},
 };

 var note = new Note();
 console.log(note);