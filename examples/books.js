var opds = require("../lib");


var xml = opds.create({
    title: "My Catalog",
    authors: [
        {
            name: "Samy Pesse",
            uri: "https://www.gitbook.com"
        }
    ],
    books: [
        {
            title: "A book",
            summary: "This is a test book",
            updated: new Date(),
            authors: [
                {
                    name: "Aaron O'Mullan",
                    uri: "https://www.gitbook.com/@aaron"
                }
            ],
            links: [
                {
                    rel: "image",
                    href: "/book/test.jpg",
                    type: "image/jpeg"
                },
                {
                    rel: "acquisition/buy",
                    href: "/book/test.epub",
                    type: "application/epub+zip",
                    price: 10
                }
            ],
            categories: [
                "FIC020000"
            ],
            content: {
                type: 'xhtml',
                value: "<b>Hello World</b>"
            }
        }
    ]
});

console.log(opds.parse(xml));