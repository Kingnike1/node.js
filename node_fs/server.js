const http = require('http');
const fs = require('fs');


http.createServer(function (req, res) {
  fs.readFile('demo.html', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
    console.log(err);
    
  });
}).listen(8080);
