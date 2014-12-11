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

	}, 
	[
		{
			title: "A book",
			description: "This is a test book"
		}
	]
);
```
