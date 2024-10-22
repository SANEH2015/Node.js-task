const http = require('http');

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    // Handle GET request
    if (req.method === 'GET' && req.url === '/') {
        res.statusCode = 200;
        res.end(JSON.stringify({ message: 'Welcome to the server!' }));

    // Handle PUT/PATCH request
    } else if (req.method === 'PUT' || req.method === 'PATCH') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const { option } = JSON.parse(body);
            if (option ==='update')  {
                res.statusCode = 200;
                res.end(JSON.stringify({ message: 'Successfully updated', data: { option } }));
            } else {
                res.statusCode = 400;
                res.end(JSON.stringify({ message: 'Error: option is required for update' }));
            }
        });

    // Handle POST request
    } else if (req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const { option } = JSON.parse(body);
            if (option === 'posting') {
                res.statusCode = 201;
                res.end(JSON.stringify({ message: 'Successfully created', data: { option } }));
            } else {
                res.statusCode = 400;
                res.end(JSON.stringify({ message: 'Error: option is required for posting' }));
            }
        });

    // Handle DELETE request
    } else if (req.method === 'DELETE') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const { option} = JSON.parse(body);
            if (option === 'removal') {
                res.statusCode = 200;
                res.end(JSON.stringify({ message: 'Successfully deleted', data: { option } }));
            } else {
                res.statusCode = 400;
                res.end(JSON.stringify({ message: 'Error: option is required for deletion' }));
            }
        });

    // Handle 404 for unknown routes
    } else {
        res.statusCode = 404;
        res.end(JSON.stringify({ message: 'Route not found' }));
    }
});

const PORT = 3000;

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
