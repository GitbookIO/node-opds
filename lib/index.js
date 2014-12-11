var _ = require("lodash");
var builder = require('xmlbuilder');

// Create an opds feed
var create = function(definition, books) {
	definition =_.defaults(definition || {}, {
		author: {}
	});
	books = books || [];

	var feed = builder.create('feed', {
		version: '1.0',
		encoding: 'UTF-8'
	});
	feed.att("xmlns", "http://www.w3.org/2005/Atom");
    feed.att("xmlns:dc", "http://purl.org/dc/terms/");
    feed.att("xmlns:opds", "http://opds-spec.org/2010/catalog");

    // Add title
	feed.ele("title", {}, definition.title);

	// Add author
	var author = feed.ele("author");
		author.ele("name", {}, definition.author.name);
		author.ele("uri", {}, definition.author.uri);

	return feed.end({
		pretty: true
	});
}


module.exports = {
	create: create
};
