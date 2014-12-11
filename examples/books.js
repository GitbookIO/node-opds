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
			description: "This is a test book"
		}
	]
);

console.log(xml);