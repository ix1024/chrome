requirejs.config({
	baseUrl: "/src",
	urlArgs: "0.0.1",
	paths: {
		'jquery': 'jquery',
		'create-image': 'create-image',
		'storage': 'local-storage'

	},
	waitSeconds: 0,
	shim: {
		storage: {
			exports: "storage"
		},
		// message: {
		// 	exports: "Message",
		// 	deps: ["css!message-css"]
		// }

	}

});