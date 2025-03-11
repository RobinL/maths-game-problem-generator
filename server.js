/**
 * Simple HTTP server for the Math Game Problem Generator demo
 */
import { createServer } from 'http';
import { readFile } from 'fs/promises';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';

// Get the directory name of the current module
const __dirname = fileURLToPath(new URL('.', import.meta.url));

// MIME types for different file extensions
const MIME_TYPES = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
};

// Default MIME type
const DEFAULT_MIME_TYPE = 'text/plain';

// Create the server
const server = createServer(async (req, res) => {
    console.log(`${req.method} ${req.url}`);

    // Parse the URL
    let path = req.url;

    // Default to index.html if the path is '/'
    if (path === '/') {
        path = '/demo/index.html';
    }

    try {
        // Resolve the file path
        const filePath = join(__dirname, path);

        // Read the file
        const content = await readFile(filePath);

        // Determine the MIME type
        const ext = extname(filePath);
        const mimeType = MIME_TYPES[ext] || DEFAULT_MIME_TYPE;

        // Send the response
        res.writeHead(200, { 'Content-Type': mimeType });
        res.end(content);
    } catch (err) {
        // Handle file not found
        if (err.code === 'ENOENT') {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('<h1>404 Not Found</h1><p>The requested resource could not be found.</p>');
            return;
        }

        // Handle other errors
        console.error(err);
        res.writeHead(500, { 'Content-Type': 'text/html' });
        res.end('<h1>500 Internal Server Error</h1><p>Something went wrong on the server.</p>');
    }
});

// Start the server
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
    console.log(`Demo available at http://localhost:${PORT}/demo/index.html`);
});