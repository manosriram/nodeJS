const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');

const port = 5000;
const hostname = "127.0.0.1";

const mimeTypes = {
    'html': 'text/html',
    'css': 'text/css',
    'js': 'text/javascript',
    'png': 'text/png',
    'jpeg': 'text/jpeg',
    'jpg': 'text/jpg'
};


http.createServer((req, res) => {
    var myuri = url.parse(req.url).pathname;
    var filename = path.join(process.cwd(), unescape(myuri));
    console.log(`File You are looking for is ${filename}`);
    var loadFile;

    try {
        loadFile = fs.lstatSync(filename);
    } catch (error) {
        res.writeHead(404, { 'Content-Type': "plain - text" });
        res.write('404 Internal Error');
        res.end();
        return;
    }

    if (loadFile.isFile()) {
        var mimeType = mimeTypes[path.extname(filename).split('.').reverse()[0]];
        res.writeHead(200, { 'Content-Type': mimeType });
        var filestream = fs.createReadStream(filename);
        filestream.pipe(res);
    }
    else if (loadFile.isDirectory()) {
        res.writeHead(302, { 'Location': 'index.html' });
        res.end();
    } else {
        res.writeHead(500, { 'Content-Type': "plain - text" });
        res.write('Files or Directory Missing...(500 Internal Error.)');
        res.end();
    }

}).listen(port, hostname, () => {
    console.log(`Server is Running at ${port}`);
});






// let a = new URL('https://www.facebook.com/mano/sriram/profile');
// a.username = 'manosriram';
// a.password = 'manosriram1234';
// console.log(a);
// console.log(a.pathname);

