var _ = require("lodash");
var builder = require('xmlbuilder');

// Add a "author" element
var addAuthorEntry = function(feed, author) {
	var el = feed.ele("author");
		el.ele("name").txt(author.name);
		el.ele("uri").txt(author.uri);
};

// Add a "link" element
var addLinkEntry = function(feed, link) {
	link.rel = "http://opds-spec.org/"+link.rel;
	var el = feed.ele("link", link);
};

// Add a "updated" element
var addUpdatedEntry = function(feed, updated) {
	var el = feed.ele("updated", {}, (new Date(updated)).toISOString());
};

// Add an entry for a book
var addBookEntry = function(feed, book) {
	var entry = feed.ele("entry");

	if (book.id) entry.ele("id").txt(book.id);
	if (book.title) entry.ele("title").txt(book.title);
	if (book.summary) entry.ele("summary").txt(book.summary);
	if (book.updated) addUpdatedEntry(feed, book.updated);

	var authors = _.compact([book.author].concat(book.authors || []));
	_.each(authors, _.partial(addAuthorEntry, entry));
	
	if (book.rights) entry.ele("rights").txt(book.rights);
	if (book.content) entry.ele("content", { type: "text" }).txt(book.content);

	_.each(book.links || [], _.partial(addLinkEntry, entry));
};


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
	addAuthorEntry(feed, definition.author);

	if (definition.updated) addUpdatedEntry(feed, definition.updated);

	_.each(books, _.partial(addBookEntry, feed));

	return feed.end({
		pretty: true
	});
}


module.exports = {
	create: create
};
