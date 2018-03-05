"use strict"

var http = require("http");
var url = require("url");
var querystring = require("querystring");

http.createServer(function (req, res) {

   // Send the HTTP header
   // HTTP Status: 200 : OK
   // Content Type: text/plain
   res.writeHead(200, {'Content-Type': 'text/html'});
   let page = url.parse(req.url).pathname;
   let params = querystring.parse(url.parse(req.url).query);

   console.log(page);
   res.write("Welcome ");
   if ('firstname' in params && 'lastname' in params) {
     res.write(params['firstname'] + ' ' + params['lastname']);
   }
   res.write(" in my ");
   if (page == '/') {
     res.write("main room!");
   }
   else if (page == '/bathroom'){
     res.write("bathroom!");
   }

   res.end();
}).listen(8081);

// Console will print the message
console.log('Server running at http://127.0.0.1:8081/');
