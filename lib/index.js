var _ = require("lodash");
var xmlSchema = require("xml-schema");
var subjects = require("subjects-utils");

var schemas = require('./schemas');

// Create an opds feed
function create(definition, books) {
    return xmlSchema.create(schemas.FEED, definition, {
        version: '1.0',
        encoding: 'UTF-8',
        standalone: true,
        pretty: true
    });
}

module.exports = {
    create: create
};
