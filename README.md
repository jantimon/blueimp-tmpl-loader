# blueimp template loader for webpack
[![Build Status](https://secure.travis-ci.org/jantimon/blueimp-tmpl-loader.svg?branch=master)](http://travis-ci.org/jantimon/blueimp-tmpl-loader)  [![Dependency Status](https://david-dm.org/jantimon/blueimp-tmpl-loader.svg)](https://david-dm.org/jantimon/blueimp-tmpl-loader)

[blueimp](https://blueimp.github.io/JavaScript-Templates/) template loader for [webpack](http://webpack.github.io/).
Compile templates and allows minification

## Installation

`npm install blueimp-tmpl-loader --save-dev`

## Usage

[Documentation: Using loaders](http://webpack.github.io/docs/using-loaders.html)

``` javascript
var template = require("blueimp-tmpl!./file.html");
// => returns the template function compiled with the tmpl templating engine.

// And then use it somewhere in your code
template(data) // Pass object with data
```

Alternatively you can also define blueimp-tmpl in your webpack.config file:

``` javascript
  {
    module: {
      loaders: [
        { test: "\.tpl.html$", loader: "blueimp-tmpl" },
      ]}
  }
```

``` javascript
  var template = require('./file.tpl.html');
```

The blueimp-tmpl loader allows you to **minify** the html before compiling by setting a loader query string

``` javascript
  {
    module: {
      loaders: [
        { test: "\.tpl.html$", loader: "html-tpl?minimize=true" }
      ]
  }

```

## Tests

[![Build Status](https://secure.travis-ci.org/jantimon/blueimp-tmpl-loader.svg?branch=master)](http://travis-ci.org/jantimon/blueimp-tmpl-loader)

Run unit tests:

```
  npm install
  npm test
```

## Demo

http://jantimon.github.io/blueimp-tmpl-loader/

## License

MIT (http://www.opensource.org/licenses/mit-license.php)



