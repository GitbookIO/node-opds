# OPDS builder

This is a library to generate OPDS feed.

```
$ npm install opds-builder
```

## How to use it?

```js
var opds = require("opds-builder");

var xml = opds.create(
	{
		title: "My Catalog",
		author: {
			name: "Samy Pesse",
			uri: "https://www.gitbook.com"
		}
	}, 
	[
		{
			title: "A book",
			description: "This is a test book"
		}
	]
);
```
