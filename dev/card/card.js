var $$ = function(id) {
	return document.getElementById(id);
};
$$('y').onchange = function() {
	YYYYDD(this.value, document.form1.SMonth, document.form1.SDay);
};
$$('m').onchange = function() {
	MMDD(this.value, document.form1.SYear, document.form1.SDay);
};
new PCAS("p", "c", "r", "110000-北京市", "110100-市辖区", "110101-东城区");
$$('go').onclick = ock;
window.onload = function() {
	//document.form1.SYear.options.add(new Option(2018,2018));
	YYYYMMDDstart(document.form1, document.form1.SYear, document.form1.SMonth, document.form1.SDay);
	YYYYMMDDstart(document.form1, document.form1.EYear, document.form1.EMonth, document.form1.EDay);
};