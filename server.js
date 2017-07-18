/* jshint esversion: 6*/
const http = require('http');
const fs = require('fs');
const querystring = require('querystring');

const server = http.createServer((req, res) => {
  let paths = ["/", "/index.html", "/hydrogen.html", "/helium.html", "/404.html", '/css/styles.css', 'elements.html'];

//check to see if req.url includes paths
if(paths.includes(req.url)) {

    //makes the / path return index.html
    if(req.url === "/") {
      req.url = "/index.html";
    }

    //reads the public folder and adds the req.url
    fs.readFile('./public' + req.url, 'utf8', (err, data) => {

      //chesks if method is GET
      if(req.method === "GET") {
        fs.readFile('./public' + req.url, (err, data) => {
          console.log(data.toString());
          res.end(data.toString());
        });

      //checks if POST
    } else if (req.method === "POST") {

      //parse body
      let queryUrl = querystring.parse('application/x-www-form-urlencoded');

      //writes files, creates new file if nonexistent
      fs.open('./public' + req.url, 'w', (err, fd) => {

        res.end();
      });

    }
  });

    //if req.url !== paths show this
  } else {
    fs.readFile('./public/404.html', (err, data) => {
      console.log(data.toString());
      res.end(data.toString());
    });
  }

});
server.listen(8080, "0.0.0.0" );