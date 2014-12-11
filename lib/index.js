var builder = require('xmlbuilder');

// Create an opds feed
var create = function(definition, books) {
	var feed = builder.create('feed', {
		version: '1.0',
		encoding: 'UTF-8'
	});
	feed.att("xmlns", "http://www.w3.org/2005/Atom");
    feed.att("xmlns:dc", "http://purl.org/dc/terms/");
    feed.att("xmlns:opds", "http://opds-spec.org/2010/catalog");

	

	return feed.end({
		pretty: true
	});
}


module.exports = {
	create: create
};
