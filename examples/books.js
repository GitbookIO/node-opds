var opds = require("../lib");


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

console.log(xml);