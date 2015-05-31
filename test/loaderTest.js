var should = require("should");
var loader = require("../");

function loadAndEval() {
	var module = {};
	var loaderResult = (loader.call.apply(loader, arguments));
	eval(loaderResult);
	return module.exports;
}

describe("loader", function() {

	it("should convert to requires", function() {
		loadAndEval({}, '<h1>Hello World</h1>')().should.be.eql(
			'<h1>Hello World</h1>'
		);
	});

	it("should allow to pass values", function() {
		loadAndEval({}, '<h1>Hello {%= o.name %}</h1>')({name : 'Moon'}).should.be.eql(
			'<h1>Hello Moon</h1>'
		);
	});

	it("should allow to minify html", function() {
		loadAndEval({
		   query: "?minimize=true"
		}, '<h1  >Hello {%= o.name %}</h1>')({name : 'Moon'})
		.should.be.eql(
			'<h1>Hello Moon</h1>'
		);
	});

	it("should allow to minify html with data attributes", function() {
		loadAndEval({
		   query: "?minimize=true"
		}, '<h1 data-attr="{%= o.name %}">Hello</h1>')({name : 'Moon'})
		.should.be.eql(
			'<h1 data-attr="Moon">Hello</h1>'
		);
	});

	it("should allow to minify html and collapse whitespaces", function() {
		loadAndEval({
		   query: "?minimize=true&collapseWhitespace=true"
		}, '<div>\n<h1>Hello <span>{%= o.name %}</span></h1>\n</div>')({name : 'Moon'})
		.should.be.eql(
			'<div><h1>Hello <span>Moon</span></h1></div>'
		);
	});

});
