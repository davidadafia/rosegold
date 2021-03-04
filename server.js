const http = require('http');
const fs = require('fs');
const _ = require('lodash')

const server = http.createServer((req, res) => {
   
    // lodash
    const num = _.random(2, 18);
    console.log(num);
   
    const greet = _.once(() => {
        console.log('Rosie Adafia');
    });

    greet();
    greet();

    //console.log('request made to Rosie');
   //console.log(req.url, req.method);

   //set header content type
   res.setHeader('Content-Type', 'text/html');

   let path = './views/';
   switch(req.url) {
       case '/':
          path += 'index.html';
          res.statusCode = 200;
          break;
        case '/about':
          path += 'about.html';
          res.statusCode = 200;
          break;
        case '/about-rosie':
          res.statusCode = 301;
          res.setHeader('Location', '/about');
          res.end();
          break;
        default:
          path += '404.html';
          res.statusCode = 404;
          break;
   }

   // send an html file
    fs.readFile(path, (err, data) => {
        if (err) {
            console.log(err);
            res.end();
        } else {
            //res.write(data);
            res.end(data);
        }
    })

//    res.write('<h1>Hey Rosie, Youre the best</h1>');
//    res.write('<h1>A house on a hill. God of the Heavens</h1>');
//    res.end();
});

server.listen(3000, 'localhost', () => {
    console.log('listening for request on port 3000');
});