var http = require(http);

var options = {
	"method": "GET",
	"hostname": "coronavirus-monitor.p.rapidapi.com",
	"port": null,
	"path": "/coronavirus/cases_by_country.php",
	"headers": {
		"x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
		"x-rapidapi-key": "65ba733593mshce38f6da90c0b83p137dcejsn7e793c04a492"
	}
};

var req = http.request(options, function (res) {
	var chunks = [];

	res.on("data", function (chunk) {
		chunks.push(chunk);
	});

	res.on("end", function () {
		var body = Buffer.concat(chunks);
		console.log(body.toString());
	});
});

req.end();