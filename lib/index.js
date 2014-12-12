var _ = require("lodash");
var builder = require('xmlbuilder');
var subjects = require("subjects-utils");

// Add a "author" element
var addAuthorEntry = function(feed, author) {
	var el = feed.ele("author");
		el.ele("name").txt(author.name);
		el.ele("uri").txt(author.uri);
};

// Add a "opds:price" element
var addPriceEntry = function(feed, price) {
	if (_.isNumber(price)) price = {currency: "USD", value: price};

	feed.ele("opds:price", {
		currencycode: price.currency
	}, price.value);
};

// Add a "link" element
var addLinkEntry = function(feed, link) {
	link.rel = "http://opds-spec.org/"+link.rel;
	var el = feed.ele("link", _.pick(link, "rel", "href", "type"));

	var prices = _.compact([link.price].concat(link.prices || []));
	_.each(prices, _.partial(addPriceEntry, el));
};

// Add a "category" element
var addCategoryEntry = function(feed, subject) {
	if (_.isString(subject)) subject = subjects.byCode(subject);

	feed.ele("category", {
		term: (subject.term || subject.code),
		label: subject.label,
		scheme: subject.scheme || "http://www.bisg.org/standards/bisac_subject/index.html"
	});
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
	if (book.updated) addUpdatedEntry(entry, book.updated);

	var authors = _.compact([book.author].concat(book.authors || []));
	_.each(authors, _.partial(addAuthorEntry, entry));
	_.each(book.categories || [], _.partial(addCategoryEntry, entry));
	
	if (book.rights) entry.ele("rights").txt(book.rights);
	if (book.content) entry.ele("content", { type: "text" }).txt(book.content);
	if (book.language) entry.ele("dc:language").txt(book.language);
	if (book.isbn) entry.ele("dc:identifier").txt("urn:isbn:"+book.isbn);

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

    if (definition.id) feed.ele("id").txt(definition.id);
    if (definition.title) feed.ele("title").txt(definition.title);
    if (definition.icon) feed.ele("icon").txt(definition.icon);
    if (definition.author) addAuthorEntry(feed, definition.author);
    if (definition.updated) addUpdatedEntry(feed, definition.updated);

	// Add links
	_.each(definition.links || [], _.partial(addLinkEntry, feed));

	// Add books
	_.each(books, _.partial(addBookEntry, feed));

	return feed.end({
		pretty: true
	});
}


module.exports = {
	create: create
};
