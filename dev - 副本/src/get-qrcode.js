(function(window, undefined) {
	var $$ = function(id) {
		return document.getElementById(id);
	};
	var dataUrl = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGYAAABACAYAAADoKgJJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAA4ISURBVHhe7ZtLbxvXGYb9Mwq06GWVuEhboDujq/4YAwVa7wq0my6KJlFqJ0q76KIr/QbXQKHUlu00il3HkShRFC8SRepCUqR4J4fDIYfU2+89M4ccDkcaynFquuLixcycc+YM9T3zXc4Z+8ZgMMBC86cFmDnVAsycagFmTrUAM6dagHkdenAbN24tIxnU51VyGbdu3MJyMqDPpwWY16EFmDnVrGCuoAWY16E3AeaH956G6Ilo7UL94O4j/Eh085M13Pz4Ed65+xDv3nuIn37yCD+59y+8d/cz/OyTh/j58hp+LOO++5c1fGf5Mb738VN8/97nMkfQMy9X0N8xqQe4zZCyLAa9cUPp1nLS1++0O7qNB1P3e/tFE2Am+0dzq1A2niu5fMszx+QzQsHc/PQp3lV6gpvLT9TxXR7dc7bd/PSxnIvh1dGRbqN+8fd1/Oofu/jN/Th+fV+Ocv7bfybw+8+S+MPjPfxuNYE/fpHFL/+2jvf++hjvqGc8dY5a+nn8LdLnPNt/7owplUowTTPw73HkGu72A+d6IvY7fROg6BEjwzn9tx+4faIHt2WuERj2e/NIEsu33PFeMD5IfoWC+fNaAncfJ/DRWlzO4/jo0a6jtV3nmu1uvxav2cf7lJ4k8aEcP5C5qPcfxeW4iw8exRytiR7u4KPHcfzpSQIfriXlGXtYkiPnmRTnduYfHye1vr6u4AT9PY6CjOdeB4Ylj3GD+r1tCqL2grEU6AkY7stxQTEQCsbsW6i3GugPB0q9gQ3L7svRvXZVbbRQrtVh9nrSPkTXHqBUqcpYW1337CE63b7023LvOezBELa023KvOso157HOhxjY7Ad6cq6fO5Pc33T//n0cHx8H/j2OXgXMJf1+MFP3uwr0Ege6H1AoGMOsIVc4QLFUREUM3bXE8GI12+3n0ZbrYrGEfL6Aer2BdruNft/G4eExDKOj+u2+GL3bQ8/qi+FpfOdeGpJw9PMIif0E1R/acm1jIPf22wasZh1WqynHFrrtFtrywpgtaW915LoDq2FgaNnfDIz7Jk+FspGxnf5xKHMNe2E/Q11A+JLzZd8c43AnuUfffJFa7VNkDqM4OyuJwVti8F7guEqlgtPTU5TLZVSrVdWWz+fRaDQEjBjXN34oYIY8dwFR57YlbZxf4J9bAkWuea94oVnNoZRL4uQoi3q5It5ZxddbEezt76MloMxuF6Z47UDAfzMwun8chqaSP0GN+uQ+FhFeL1HGHd8/guTzGJWb9DhfvpsBTBF76U0UTvNiPHnbpW0ob7WWHkcgNEaxSM+qqLZcLiceVFdgvPcQiFUpo5M9RHc/i25GdHSMSiwOM5dHJ59D5+wU3UoRfZm3TcCHcRSy2zjM7qMq85fqFTx9vo6NrU20Wi0VYuk1tnhqOJg3JB+YyxQKpikek85sSUiSt9EFEyR6ycnJiUq6BEMYBBPkMUMxoiHeZUl4bGQzqB7so1MswBQvsDsG7K7IktBktSX0ybHTglHJ4DQXw/FRRuAc4qiQx6P1z/Hy65doNZoSXiX3SUize7PkmDcjVR5flH98CgXT7VaQlVCWl7fYNCWWS8hgu9cDeH12dqbAMJwREmEcHh6OzifukfzRLdbRqzRhmxb6LBj6Al3edjVOwtug15f7mNCZc3roNvIon+7L7zhWRi+US/jixXNEYzH5TTKHPKMreag/Uyj7H2sU+mbzFjU+sMOjbruEzEEEB+l9nJXP0JTk6/cAimAKhcIoz7CNxtGhzDuWhjfyZTSzp2gVKxhKpebtn5JAsgwDPVmbEGBP8lytUcGz//wbke0IUum0eJbAY6EhkOY2lF1B4aGsWUAy+RXSAqZrdZVhKBqbb782Oj2DyZ5gGMI4xptjOMbrMYOOzNGWBG/2BJRc6z6/ZOxQPKnXFigy1u5LtSbz1eo1PJMcE4lExKMPsZdMSVFQVZCvBZiGUcSBhLJaXSotWb+wzWs4XtPwBEBPqdVqo/DFQoCJ2TufHq/WP1yncN3imW9KCowUC4aA6ZhSDkulZplo10qIbj5HbHMT2b00DnYS6FQaGBrXxGMqRhGJzCZOcicqF+i3X4vX9A6C0YmfYY3tDG0E472nJ3MwT9lyz4Dtfum5mWfcc3oMc1FPqq6ehKue0RZQsp4RmVIsGJL7TLabXYE2hznmFRQKptQs4kXkBRIpKVOrNQltTWVc9vGNptEpegeN4Q1lR0dHqp3QeB/HGZIrWO4akrw7uQI6BanOqnUpjakmBm2B1rHQabadtY7yGvktBMVrepAqCHguz5Y+teKXc4Y4/q7rAaZRwpdfvcBmJIpoNIZEIqHCldcLeE5vyWazqjKjUQjv4OAAmUwG+7IIJCwNpiIhz5CS14gm5HgkK/kGulwk1tuwDcljAsYSD1DVmee3zKr5BJPH6tIdrESC+jyKrGBpNT9DKGuVEdmJKo9JJFLKyAxX9Ai+zXqcTv4MY/QSnfwJitLhjbu+DfEgLiTbyX0pmSuwbBMmV/vSzzE2PUGOyjt0rrmCZgYjRriztIq8unYMd+fOWNNG9I9ZQWSiP0wRrNxZwmo+qM9RZMXpDwVT69SQlIrsRMLO8XFOGZ9hiYbXY2hE5hIC44JSexSLAQKhNzGccawlybstY828hLG9A/QklHWqAkfyg5pTvIT7Z71zmdezh3YVvToYj9Hyq1jyGlFd+2GJoUf3ezUN+VLpOfgM9zwUTNWoIpbaRUZK0oyEqv39tFo40itUEnffcsJgm17PsE2va+g5fo8xBHQ7sQczmVbhzMiXYNUlx8gYVms9efO5kRnkEWF6LWBEkZU7KqxoQ4eGoQDlV5eC73NDlreNY++sRNT5TDnm+caX2NrZwnZ0Gxsbm9ja2lK5hl7Ct5wGp+EJjGGLuYWewfzCvJOWBaCG1el0JMdU0DrMoRmTHLMbR2c/i0Yyi1b2BB2Bw30ve3AukEQBvylMrx2M502euH8W8V7X2F7pkDVuY5gT71FjZ8gxpUYRz79ex+bWBtIHaTG8E84Ytmh8GptwGK40GMJgu84x9CZ+CuB8Ovk3Dk9Q3YqisrGBdjaD9mkRZlEqtYZUbzJO1pySY84DPSJMrz2UTYzTfToUheWZaeBBoOktSyviRQQj/aFgzlS5/Bw7uzsSqk5VtaW9RI/hOZM/vYKAGL44RhcDGiDHMpTVCUryVSu6i9ZGBIbkMNsU75MioDfoO99o6DFK078pTK8n+XuM6QczEt/yGQqACRDBBUBkVfo5btZQVjUqSGXiOMgwHOWVgf1vKNuY3PU+Gc/ZRq/SSV+LnsMCweLmJT+cSdIfyHHYG+J82MO5jFHrFPGYwfDb9RhvTA98s0e6qJqaEQxFuH7gfmkwMjYUTE3AJA52kdpPSYjKiFHHm5g0gh5HjyEYegjFNp30dRijWDDQY6yOqTYcuYXCBeV5RzxRcktP5lbVWNhWzSWaDYzjIeMEfBkYF+KUUV8FzCVFxFU8ptKuIJqIILmXRDweR7HkVFdT48Q7NAgvGFZqXjBOKKvCKJygvRtD4/NnqD97gXY8hfOeeKO70+z/5HwVhYFhUldGGnkLdTkYJRrONa6Wv7LyK+hZum3q3quA4ZbM5s5L7KX3EBNDesHw7eSR17pcZo7hkW065xCMvodVGT3GOJV1jKz+O1Iut7bjUqEl0cwVcW4JHFnL2OIxlN8bZtHMOeZb0zhfXVZiO14o43T+uQqYcusM0WQE0VhUlb/N5vRuMaU9huHMm/wphi+9v6Y8RvKORS+SCm3QNeXYcXaN+7bKMRznFADTz5lFbx7MN1d4KGtVsJPYllCWQiqZwvGRrDXkrdcewCPFHKNDGb2EbbymaCTd5oSyOprHebRiabT3j9FMZdCVtY3JElzA901+u5fKT3JOkEeE6VqAqbWqiO5sI7YTQ0pW6ol4UnkBQXBNQs+g6DFsJwDCYJsGo3eZx2BqqB9kUY/EUJMw1kikBFBarWmaMn9T1kFWtSJVmxlo+DBdCzBV8Zit7Qh2ojtI7qaQFgMyVHlzB8UyWYPhopKhi0D0gpP5hrBUjqnWUBUYtZcRSfpJ1GX13xLwzZ2owNpCLZ5Au5hHz1qAuVCtThNHJ0fI5/Io5kson1UCQxnXJswdhKU3MelVPKc36X8tw3xjtA1J/iWYJwVY5TN0zvhtJg/r7FSOOXRLZVj8wCYg/b9nFl0LMNagq7718x879Lt95+gajG+nHkcP8cLiUYc5ytunrmUe/uM8Gp/rF/6jvmHPkjZ+1+dHL84b7BFhuhZgBjRaYPv86lqACXoj510LMHOqmcF4tkmmdondvqkF4sTq//KdAq7wJ+7X97qLyNGugJZno3SGUPb2aSYwNHzgjrG7al9awcrUxzHujXnaLpzD0SQY371uv3dbRoGadeUf9EbOu8LBzLAv5gKaADMF4vJ5xmAcKP69MT+YK33BfBsVCoYhRQy8yjfUDSPTm5GzgvGN8cgB44yZnt8PZnKumcBw0cj/Psc/+G1Q6H/18+cPFfv9b36A0d0cMWrzz+OTCk0Ef0G4G/VrecbNBIbbKPxD+Ra+DeJv5W8O+luUAnKDP6xc6A0uDG3I1alv92M5HuMCCIAz9Uw1t1OE/F+GslC5oeyVwEzo8g9lGoyea/L7T9AzOZ8D+nqCcQ01MsqsocynacNO94/vdwoA/wezhcdMyTWUq7EB3bfb0zfun+y7DAo1CYZyn+l6K/u9z/Cupa4xmPnWAsycagFmTrUAM6dagJlTLcDMqRZg5lQLMHOqBZg51QLMnGoBZk61ADOnWoCZSw3wX3gIltL4BnRhAAAAAElFTkSuQmCC';


	var qrcode;

	function makeCode() {
		var elText = $$("text");

		if (!elText.value) {
			return;
		}

		var colorDark = $('#qrColor').val() || '#000000';
		var colorLight = '#ffffff';
		var width = $('#qrSize').val() || 200;
		var height = width;
		try {
			qrcode.clear();
			$('#qrcode').html('');
		} catch (ev) {}
		qrcode = new QRCode(
			$$("qrcode"), {
				width: width,
				height: height,
				colorDark: colorDark,
				colorLight: "#ffffff",
				correctLevel: QRCode.CorrectLevel.H,
				src: 'http://files.hzins.com/files/5/59/595/595e/595ec2893f2245d5ad631783e55c3d95.jpg'
			});

		qrcode.makeCode(elText.value);

		//qrcode.makeImage('http://files.hzins.com/files/5/59/595/595e/595ec2893f2245d5ad631783e55c3d95.jpg');
	}

	//makeCode();
	$('button').click(function() {
		makeCode();
	});
	// $("#text")
	// 	.on("blur", function() {
	// 		makeCode();
	// 	})
	// 	.on("keydown", function(e) {
	// 		if (e.keyCode == 13) {
	// 			makeCode();
	// 		}
	// 	});
	$('input:file').change(function() {

	});
	window.qrcode = qrcode;
})(this);