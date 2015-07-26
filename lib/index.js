var _ = require("lodash");
var XMLSchema = require("xml-schema");
var subjects = require("subjects-utils");

var schemas = require('./schemas');

var opdsSchema = new XMLSchema(schemas.FEED);

// Create an opds feed
function create(feed) {
    return opdsSchema.generate(feed, {
        version: '1.0',
        encoding: 'UTF-8',
        standalone: true,
        pretty: true
    });
}

function parse(xml) {
    return opdsSchema.parse(xml);
}

module.exports = {
    create: create,
    parse: parse
};
