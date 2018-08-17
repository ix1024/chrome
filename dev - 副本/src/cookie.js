define(['jquery', 'storage'], function($, storage) {

		chrome.cookies.getAll({},

			function(cookies) {
				var list = cookies || [];
				var html = [];
				var tableHtml = [];
				var page = 0;
				var size = 5;
				var length = 0;
				var domain = null;
				var getItem = function(cookie) {
					var result = [];
					var item = cookie || {};
					var url = "http" + (item.secure ? "s" : "") + "://" + item.domain +
						item.path;
					result.push('<tr>');
					result.push('<td><input class="select" type="checkbox" name="" id="" /></td>');
					result.push('<td>' + item.domain + '</td>');
					result.push('<td>' + item.name + '</td>');
					result.push('<td>' + item.value + '</td>');
					result.push('<td>' + item.hostOnly + '</td>');
					result.push('<td>' + item.httpOnly + '</td>');
					result.push('<td>' + item.path + '</td>');
					result.push('<td>' + item.sameSite + '</td>');
					result.push('<td>' + item.secure + '</td>');
					result.push('<td>' + item.session + '</td>');
					result.push('<td>' + item.storeId + '</td>');
					result.push('<td><span class="btn">编辑</span> <span class="btn" data-type="del"data-url="' + url + '"data-id="' + item.storeId + '"data-name="' + item.name + '">删除</span></td>');
					result.push('</tr>');

					return result.join('');
				};
				var updateInfo = function() {
					$('#cookieLength').text(length);
				};
				tableHtml.push('<table class="table">');
				tableHtml.push('<tr>');
				tableHtml.push('<th></th>');
				tableHtml.push('<th>domain</th>');
				tableHtml.push('<th>name</th>');
				tableHtml.push('<th>value</th>');
				tableHtml.push('<th>httpOnly</th>');
				tableHtml.push('<th>hostOnly</th>');
				tableHtml.push('<th>path</th>');
				tableHtml.push('<th>sameSite</th>');
				tableHtml.push('<th>secure</th>');
				tableHtml.push('<th>session</th>');
				tableHtml.push('<th>storeId</th>');
				tableHtml.push('<th>Edit</th>');
				tableHtml.push('</tr>');
				tableHtml.push('<tbody id="tableBody"></tbody>');
				tableHtml.push('</table>');
				tableHtml.push('<div class="cookie-tools">共有<strong id="cookieLength"></strong>条Cookie <input type="checkbox" name="" id="selectAll" /><label for="selectAll">全选</label><input type="checkbox" name="" id="unSelect" /><label for="unSelect">反选</label> <span class="show-more btn">显示更多</span></div>');

				$('body')
					.on('change', 'input:checkbox', function() {
						var id = $(this).attr('id');
						var $checkbox = $('#tableBody').find('input.select');
						if ('selectAll' === id) {
							$('#unSelect').attr('checked', false);
							if ($(this).is(':checked')) {
								$checkbox.attr('checked', true);
							} else {
								$checkbox.attr('checked', false);
							}
						} else if ('unSelect' === id) {
							$('#selectAll').attr('checked', false);
							$checkbox.each(function() {
								if ($(this).is(':checked')) {
									$(this).attr('checked', false);
								} else {
									$(this).attr('checked', true);
								}
							});
						}

					})
					.on('click', 'span.show-more', function() {
						page += size;
						addItem(page);
					})
					.append(tableHtml.join(''));

				list.forEach(function(item) {
						html.push(getItem(item));
					}

				);

				function addItem(page) {
					$('#tableBody')
						.append(html.slice(page, page + size).join(''));
				}

				length = cookies.length;
				addItem(0);
				updateInfo();
				console.log(cookies);

				$('body')
					.on('click', 'span', function() {
						var type = $(this).data('type'),
							$tr = $(this).parents('tr'),
							name = $(this).data('name'),
							storeId = $(this).data('id'),
							url = $(this).data('url');

						if ('del' === type) {
							if (confirm('确定要删除' + name + '吗？')) {
								chrome.cookies.remove({
										name: name,
										storeId: String(storeId),
										url: url
									},
									function() {
										length--;
										$tr.remove();
										updateInfo();
									});
							}
						}

					});
			}

		);


	}

);