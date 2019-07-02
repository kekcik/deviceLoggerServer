var http = require('http');
let address = '127.0.0.1'
let port = 1337
const methods = require('./methods');
const data = require('./dataManager');

http.createServer(function(req, res) {
	res.writeHead(200, {'Contnt-Type': 'application/json'});
	var url = require('url');
	var url_parts = url.parse(req.url, true);
	var query = url_parts.query;
	res.end(router(req.url.split('?')[0], query));
}).listen(port, address);

var router = function(url, params) {
	console.log(url, params);
	switch(url) {
		case '/getDevices': return methods.getDevices()
		case '/getUsers': return methods.getUsers()
		case '/addUser': return methods.addUser(params)
		case '/addDevice': return methods.addDevice(params)
		case '/takeDevice': return methods.takeDevice(params)
		case '/putDevice': return methods.putDevice(params)
	}
}

console.log('server started on ' + address + ':' + port);
