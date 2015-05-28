var through = require('through2');

var versionify = function (fn) {
  return function () {
    var vnode = fn.apply(this, arguments);
    if (vnode) {
      vnode.properties = vnode.properties || {};
      vnode.properties.attributes = vnode.properties.attributes || {};
      vnode.properties.attributes[attr_name] = package_name;
    }
    return vnode;
  }
};

module.exports = function (packageJSON, attr) {
  var code = 'var package_name = "' + packageJSON.name + '@' + packageJSON.version + '";';
  code += '\nvar attr_name = "' + (attr || 'data-ui') + '"';
  code += '\nmodule.exports = ' + versionify.toString();
  var stream = through.obj();

  setImmediate(function () {
    stream.write(code);
    stream.end();
  });

  return stream;
};