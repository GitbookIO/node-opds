# OPDS builder

This is a library to generate OPDS feed. It makes it easy to generate a feed from a list of book., it also handles correctly BISAC subjects.

## How to install it?

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
			summary: "This is a test book",
			updated: new Date(),
			author: {
				name: "Aaron O'Mullan",
				uri: "https://www.gitbook.com/@aaron"
			},
			links: [
				{
					rel: "image",
					href: "/book/test.jpg",
					type: "image/jpeg"
				},
				{
					rel: "acquisition/buy",
					href: "/book/test.epub",
					type: "application/epub+zip"
				}
			],
			categories: [
				"FIC020000"
			]
		}
	]
```
