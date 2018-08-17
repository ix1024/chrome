/**
 * Created by hz15041151 on 2016/9/7.
 */
'use strict';
var NoteData = {
    '2016-01-01': []
};

var MyNote = function (options) {
    var ops = options || {};
    for (var key in ops) {
        this[key] = ops[key];
    }
};
MyNote.prototype = {
    data: {},
    init: function () {
        this.setData();
    },
    setData: function () {
        this.data = localStorage.get(this.name) || {};
    },
    create: function () {

    },
    addItem: function () {

    },
    remove: function () {

    },
    renameList: function () {

    },
    renameItem: function () {

    }
};

var myNote = new MyNote({name: 'd'});
console.log(myNote);