var tmpl = require('blueimp-tmpl').tmpl;
var loaderUtils = require('loader-utils');
var htmlMinifier = require('html-minifier');

module.exports = function (source) {
  'use strict';
  if(this.cacheable) {
    this.cacheable();
  }
  var query = loaderUtils.parseQuery(this.query);
  var minimize = query.minimize;
  if (typeof minimize === "boolean" ? minimize : this.minimize) {
    source = htmlMinifier.minify(source, {
      removeComments: query.removeComments,
      collapseWhitespace: query.collapseWhitespace,
      collapseBooleanAttributes: query.collapseBooleanAttributes,
      removeAttributeQuotes: query.removeAttributeQuotes,
      removeRedundantAttributes: query.removeRedundantAttributes,
      useShortDoctype: query.useShortDoctype,
      removeEmptyAttributes: query.removeEmptyAttributes,
      removeOptionalTags: query.removeOptionalTags
    });
  }

  // From blueimp-tmpl/js/tmpl.js
  function compileTemplate(str) {
    return new Function(
      tmpl.arg,
      "var _e=tmpl.encode" + tmpl.helper + ",_s='" +
        str.replace(tmpl.regexp, tmpl.func)
           .replace(/(<\/?)(script>)/, "$1' + '$2" ) +
        "';return _s;"
    );
  }

  function templateLoader(str) {
    return 'var tmpl = require("blueimp-tmpl");tmpl=tmpl.tmpl||tmpl;module.exports = ' + compileTemplate(str);
  }

  return templateLoader(source);
};
