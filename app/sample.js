// Copyright (c) 2010 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
chrome.contextMenus.removeAll(function() {
  //alert('removeAll');
});
// A generic onclick callback function.
function genericOnClick(info, tab) {
  console.log("item " + info.menuItemId + " was clicked");
  console.log("info: " + JSON.stringify(info));
  console.log("tab: " + JSON.stringify(tab));
}

// Create one test item for each context type.
var contexts = ["page", "selection", "link", "editable", "image", "video",
  "audio"
];
for (var i = 0; i < contexts.length; i++) {
  var context = contexts[i];
  var title = "Test '" + context + "' menu item";
  var id = chrome.contextMenus.create({
    "title": title,
    "contexts": [context],
    "onclick": genericOnClick
  });
  console.log("'" + context + "' item:" + id);
}


// Create a parent item and two children.
var parent = chrome.contextMenus.create({
  "title": "Test parent item"
});
var child1 = chrome.contextMenus.create({
  "title": "Child 1",
  "parentId": parent,
  "onclick": genericOnClick
});
var child2 = chrome.contextMenus.create({
  "title": "Child 2",
  "parentId": parent,
  "onclick": genericOnClick
});
console.log("parent:" + parent + " child1:" + child1 + " child2:" + child2);


// Create some radio items.
function radioOnClick(info, tab) {
  console.log("radio item " + info.menuItemId +
    " was clicked (previous checked state was " +
    info.wasChecked + ")");
}
var radio1 = chrome.contextMenus.create({
  "title": "Radio 1",
  "type": "radio",
  "onclick": radioOnClick
});
var radio2 = chrome.contextMenus.create({
  "title": "Radio 2",
  "type": "radio",
  "onclick": radioOnClick
});
console.log("radio1:" + radio1 + " radio2:" + radio2);


// Create some checkbox items.
function checkboxOnClick(info, tab) {
  console.log(JSON.stringify(info));
  console.log("checkbox item " + info.menuItemId +
    " was clicked, state is now: " + info.checked +
    "(previous state was " + info.wasChecked + ")");
  alert(0);
  var content = chrome.extension.getURL('content.js');
  console.log(content);
}
var checkbox1 = chrome.contextMenus.create({
  "title": "Checkbox1",
  "type": "checkbox",
  "onclick": checkboxOnClick
});
var checkbox2 = chrome.contextMenus.create({
  "title": "Checkbox2",
  "type": "checkbox",
  "onclick": checkboxOnClick
});
console.log("checkbox1:" + checkbox1 + " checkbox2:" + checkbox2);


// Intentionally create an invalid item, to show off error checking in the
// create callback.
// console.log("About to try creating an invalid item - an error about " +
//   "item 999 should show up");
// chrome.contextMenus.create({
//   "title": "Oops",
//   "parentId": 999
// }, function() {
//   if (chrome.extension.lastError) {
//     console.log("Got expected error: " + chrome.extension.lastError.message);
//   }
// });
(function() {
  var contexts = ["all", "page", "frame", "selection", "link", "editable", "image", "video", "audio"];
  var callback = function(a, b, c, d) {
    console.log(a, b, c, d);
  };
  var onClick = function(a, b, c, d) {
    console.log(a, b, c, d);
  };
  var js = chrome.contextMenus.create({
    title: '显示所有Javascript'
  });
  var css = chrome.contextMenus.create({
    title: '显示所有CSS'
  });

  var show = chrome.contextMenus.create({
    title: '000',
    parentId: js,
    // callback: function() {
    //   alert(0)
    // }
  }, function(a, b, c, d) {
    //console.log(a, b, c, d);
  });
  // chrome.contextMenus.create({
  //   title: '隐藏图片',
  //   type: 'checkbox',
  //   checked: true,
  //   onclick: onClick,
  //   //callback: function(){}
  // });
  // chrome.contextMenus.create({
  //   title: '隐藏图片',
  //   type: 'radio',
  //   checked: true,
  //   onclick: onClick,
  //  // callback: callback
  // });
  // chrome.contextMenus.create({
  //   title: '隐藏图片',
  //   //type: 'radio',
  //  // checked: true,
  //   onclick: onClick,
  //  // callback: callback
  // });
})(this);

chrome.windows.getAll({
  populate: true
}, function(obj) {
  var arr = obj || [];
  arr.forEach(function(item) {
    var tabs = item.tabs || [];
    //console.log(tabs);
    tabs.forEach(function(tab) {
      // console.log(tab);
      chrome.windows.get(tab.windowId, function(w) {
        // console.log(tab.title, w);
      });
      chrome.tabs.getSelected(tab.windowId, function() {
        //alert(0)
      });
      // chrome.tabs.insertCSS(tab.id, 'body{display:none}', function() {

      // });
      console.log('tab.id', tab.id);
      chrome.tabs.executeScript(tab.id, {
        file: "content_script.js"
      }, function() {

      });
      chrome.tabs.get(tab.id, function(t) {
        // console.log(t);
      });

    });
  });
});
chrome.tabs.getCurrent(function(a) {
  console.log('a', a);
});
chrome.tabs.onCreated.addListener(function(tab) {
  console.log('onCreated', tab);

});

// chrome.tabs.onUpdated.addListenter(function(tab) {
//   console.log('onUpdated', tab);
// });


// chrome.windows.getCurrent(function(a) {
//   console.log(a);
//   chrome.window.get(a.id, function(a) {
//     console.log(a);
//   });
// });