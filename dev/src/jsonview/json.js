var jsonSource = document.getElementById('jsonSource');
var jsonContent = document.getElementById('jsonContent');

function setIframeValue() {
	var str, html;
	console.clear();
	str = jsonSource.value || '{"title": "前端开发工具-JSONVIEW","body":"请输入合法的JSON值"}';

	try {
		str = JSON.parse(str);
		str = JSON.stringify(str);
		html = jsonToHTML(JSON.parse(str));
		setResultHtml(html);
		jsonContent.className = 'json-content';
	} catch (ev) {
		console.error('无效JSON');
		jsonContent.className = ' json-content json-error ';
		setResultHtml();
	}


}


function setResultHtml(str) {

	frames[0].document.body.innerHTML = (str || '');
	frames[0].displayUI(null, frames[0].document.body.innerHTML);
}
jsonSource.onblur = setIframeValue;
var timer;
jsonSource.onkeyup = function() {
	clearTimeout(timer);
	timer = setTimeout(setIframeValue, 500);
};;
frames[0].onload = function() {
	setIframeValue();
};