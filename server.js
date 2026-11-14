
const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {

    let fileName = req.url === "/"
        ? "index.html"
        : req.url.substring(1);

    const filePath = path.join(__dirname, fileName);

    const contentType = fileName.endsWith(".css")
        ? "text/css"
        : "text/html";

    fs.readFile(filePath, (err, content) => {

        if (err) {
            res.writeHead(404);
            res.end("File not found");
            return;
        }

        res.writeHead(200, {
            "Content-Type": contentType
        });

        res.end(content);
    });
});

server.listen(process.env.PORT || 8080);
