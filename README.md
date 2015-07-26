# node-opds

This is a library to parse or generate OPDS feed. It makes it easy to generate a feed from a list of book., it also handles correctly BISAC subjects.

## How to install it?

```
$ npm install opds
```

## How to use it?

:warning: This example is incomplete to pass OPDS Validation (http://opds-validator.appspot.com).

```js
var opds = require("opds");

var xml = opds.create({
    title: "My Catalog",
    author: {
        name: "Samy Pesse",
        uri: "https://www.gitbook.com"
    },
    books: [
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
});
```


You can also parse an OPDS feed:

```js

var feed = opds.parse('...');
```


