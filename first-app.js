const http = require('http');

const server = http.createServer((req, res)=> {
    if (req.url === '/') {
        res.write(`<html>
                <title>User registration</title>
                <body>
                <h1>
                    Hello, Welcome, Add user below
                </h1>
                <form action="/create-user" method="POST">
                    <input type="text" name="username" >
                    <button>
                        Send
                    </button>
                </form>
            </body> 
        </html>
        `);
        return res.end();
    }
    if (req.url === '/users') {
        res.write(`<html>
                <title>User List</title>
                <body>
                <div class="user-list">
                    <ul>
                        <li>User 1</li>
                        <li>User  2</li>
                    </ul>
                </div>
            </body> 
        </html>
        `);
        return res.end();
    }
    if (req.url === '/create-user') {
        const body = [];
        req.on('data', (chunk)=> {
            body.push(chunk);
        })
        req.on('end', () => {
            const parsedData = Buffer.concat(body).toString();
            console.log(parsedData.split('=')[1]);
        });
        res.setHeader('Content-Type', 'text/html');
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
    }
});


server.listen(3000);