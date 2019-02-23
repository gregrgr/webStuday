'use struct'

var http = require('http');
// http.createServer
var server = http.createServer(function(request,response){
    global.console.log(request.method+':'+request.url);

    response.writeHead(200,{'Content-Type':'text/html'});

    response.end('<h1>Hello World!</h1>');
})


server.listen(8080);
