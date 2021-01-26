const http = require('http');
const fs = require('fs');

// create server
const server = http.createServer( (req ,res) => {

    // Set response header
    res.setHeader('Content-Type', 'text/html');

    // Reading html file and sending to the browser
    fs.readFile('./views/index.html', (err, data) => {
        if(err) {
            console.log(err);
            res.end();
        } else {
            // res.write(data);
            res.end(data);
        }
    });

});

server.listen(3000, () => {
    console.log(`Server start to listen`);
});
