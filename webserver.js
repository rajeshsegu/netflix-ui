var http = require('http');
var fs = require('fs');
var path = require('path');
 
http.createServer(function (request, response) {
 
    console.log('Request: '+request.url);
     
    var filePath = '.' + request.url;
    if (filePath == './')
        filePath = './index.html';
         
    var extname = path.extname(filePath);
    var contentType = 'text/html';
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.jpg':
            contentType = 'image/jpeg';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.gif':
            contentType = 'image/gif';
            break;
    }
     
    path.exists(filePath, function(exists) {
        //tmp for development.
        response.writeHead(302, {            
            "Cache-Control" : "no-cache, no-store, must-revalidate",
            "Pragma": "no-cache",
            "Expires": 0
        });
        if (exists) {
            fs.readFile(filePath, function(error, content) {
                if (error) {
                    response.writeHead(500);
                    response.end();
                }
                else {
                    response.writeHead(200, { 'Content-Type': contentType });
                    response.end(content, 'utf-8');
                }
            });
        }
        else {
            response.writeHead(404);
            response.end();
        }
    });
     
}).listen(8080);

console.log('Server running at http://localhost:8080/');