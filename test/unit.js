var versionify = require('../index.js');
var MemoryStream = require('memory-stream');
var h = require('virtual-dom/h');
var toHTML = require('vdom-to-html');
var assert = require('assert');

var packageJSON = {
  name: 'dogs',
  version: '1.2.3'
};
var render = function () {
  return h('div.hello');
};

suite('Versionify', function () {

  test('Gulp', function (done) {
    var ms = new MemoryStream();
    var attr = 'data-whatever';

    ms.on('finish', function () {
      var fn = eval(ms.toString());
      var vnode = fn(render)();
      console.log(toHTML(vnode));

      assert.equal(vnode.properties.attributes['data-whatever'], 'dogs@1.2.3', 'Property is set on vnode');
      assert.ok(/data-whatever="dogs@1.2.3"/.test(toHTML(vnode)), 'Attr exists on DOM element');
      done();
    });

    versionify(packageJSON, attr).pipe(ms);
  });
});