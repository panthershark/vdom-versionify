# vdom-versionify
Gulp task which generates a versioned attr on DOM elements so you can track what module generated the piece of the DOM you are inspecting.

# Usage

The gulp task is used to generate a package specific versionify helper for decorating the DOM with information that assists in inspecting a real DOM and tracing back to the package which generated the vdom.

### Gulp

```
// var packageJSON = require('./package.json');  //==> you would use this, but this example has it commented out for clarity

var packageJSON = {
	"name": "dogs",
	"version": "1.2.3"
};
var vdom_versionify = require('vdom-versionify');

gulp.task('versionify', function () {
  return vdom_versionify(packageJSON, 'data-foo')
    .pipe(source("versionify.js"))
    .pipe(gulp.dest('./'));
});
```

### In code

Once you generate the versionify function in gulp, you can use it to wrap your render functions.

```
var versionify = require('./versionify.js');
var dog = function (d) {
  return h('li', d);
};

var render = versionify(function (dog_names) {
  return h('ul', dog_names.map(dog));
});

console.log(toHTML(render(['Lucky', 'Biggie Smalls', 'Tupac'])));

```

The above emits the following HTML

```
<ul data-foo="dogs@1.2.3">
	<li>Lucky</li>
	<li>Biggie Smalls</li>
	<li>Tupac</li>
</ul>

```

