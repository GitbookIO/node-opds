var opds = require("../lib");


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
			]
		}
	]
);

console.log(xml);