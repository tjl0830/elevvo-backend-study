const http = require('http')

//Create the server
const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    if (req.url === '/' && req.method === 'GET') {
        res.statusCode = 200;
        res.end(JSON.stringify({ message: "Welcome to the Elevvo API" }));
    }
    else if (req.url === '/api/users' && req.method === 'GET') {
        const users = [
            { id: 1, name: "Ali", role: "Developer" },
            { id: 2, name: "Sara", role: "Designer" }
        ];
        res.statusCode = 200;
        res.end(JSON.stringify(users));
    }
    else if (req.url === '/api/health' && req.method === 'GET') {
        timestamp = Date.now();
        res.statusCode = 200;
        res.end(JSON.stringify({ timestamp: timestamp}))
    }
    else {
        // Handle 404 Not Found
        res.statusCode = 400;
        res.end(JSON.stringify({ error: "Route not found" }))
    }
});

    // Tell the server to listen on port 3000
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})