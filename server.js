import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = http.createServer((req, res) => {
    // Log the request for debugging
    console.log(`Request: ${req.url}`);

    // Get the file path
    let filePath = '.' + req.url;
    if (filePath === './') {
        filePath = './demo/index.html';
    }

    // Normalize path to prevent directory traversal attacks
    filePath = path.normalize(filePath);

    // Get the full path
    const fullPath = path.join(__dirname, filePath);
    console.log(`Serving file: ${fullPath}`);

    // Get the file extension
    const extname = path.extname(filePath);

    // Set the content type based on file extension
    let contentType = 'text/html';
    switch (extname) {
        case '.js':
            contentType = 'application/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
            contentType = 'image/jpg';
            break;
    }

    // Read the file
    fs.readFile(fullPath, (error, content) => {
        if (error) {
            console.error(`File error: ${error.code} for ${fullPath}`);
            if (error.code === 'ENOENT') {
                // Page not found
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end(`<h1>404 Not Found</h1><p>File not found: ${req.url}</p>`, 'utf-8');
            } else {
                // Server error
                res.writeHead(500);
                res.end(`Server Error: ${error.code}`);
            }
        } else {
            // Success - return the file
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

const PORT = 8080;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
    console.log(`Demo available at http://localhost:${PORT}/demo/index.html`);
});