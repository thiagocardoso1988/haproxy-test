const http = require("http");
const net = require('net');
const url = require('url');

const util = require('util');
const exec = util.promisify(require('child_process').exec);

// available in node 14.17+
const crypto = require("crypto");

// const host = 'localhost';
const host = '0.0.0.0';
const port = 9090;

const initializeRoom = (room) => {
    // const https = require('https');

    const options = {
        hostname: 'haproxy',
        port: 9000,
        path: `/?room=${room}`,
        method: 'GET',
    };

    // const req = https.request(options, res => {
    const req = http.request(options, res => {
        console.log(`statusCode: ${res.statusCode}`);

        res.on('data', d => {
            process.stdout.write(d);
        });
    });

    req.on('error', error => {
        console.error(error);
    });

    req.end();

}

const rootHandler = (req, res) => {
    const queryObject = url.parse(req.url, true).query;
    console.log(queryObject);

    if (!queryObject.room) {
        const uuid = crypto.randomUUID({disableEntropyCache : true});

        // console.log('*'.repeat(50));
        // initializeRoom(uuid);

        res.writeHead(302, {
            'Location': `/?room=${uuid}`,
            //add other headers here...
        });
        res.end();

        return;
    }

    res.setHeader("Content-Type", "text/html");
    res.writeHead(200);
    // res.end("My first server!");
    res.end(`
    <html>
        <body>
            <h1>This is HTML</h1>
            <pre>${JSON.stringify(queryObject, null, 4)}</pre>
            <a href="endRoom?room=${queryObject.room}">End room</a>
        </body>
    </html>
    `);
}

const endRoomHandler = (req, res) => {
    console.log('running endRoomHandler', '*'.repeat(50));
    const queryObject = url.parse(req.url, true).query;
    console.log({ queryObject });

    // const cmd = 'show table be1';
    const cmd = 'clear table be1 key b7911e7a-4c00-4136-96c4-4a617c9fb4bd';

    const client = net.connect(9999, 'haproxy', function() {
        console.log('Connected', '*'.repeat(50));
        // client.write('help\n');
        client.write(`${cmd}\n`);
        console.log('**** done ****');
    });

    client.on('data', function(data) {
        console.log('Received: ' + data, '*'.repeat(50));
        client.destroy(); // kill client after server's response
    });

    client.on('close', function() {
        console.log('Connection closed', '*'.repeat(50));
    });

    client.on('error', function() {
        console.log('Error happened', '*'.repeat(50));
    });

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(`{"message": "This is a JSON response"}`);
    // res.end({
    //     queryObject,
    // });
}

const requestListener = function (req, res) {
    // console.log('requestListener', { req });

    // const queryObject = url.parse(req.url, true).query;
    // console.log(queryObject);

    // res.setHeader("Content-Type", "text/html");
    // res.writeHead(200);
    // // res.end("My first server!");
    // res.end(`<html><body><h1>This is HTML!</h1></body></html>`);

    const pathname = url.parse(req.url, true).pathname;
    let handler = undefined;

    switch (true) {
        // case /\//.test(pathname):
        //     rootHandler(request, response);
        //     break;
        case /\/endRoom/.test(pathname):
            console.log('Using handler "endRoomHandler"');
            // endRoomHandler(request, response);
            handler = endRoomHandler;
            break;
        default:
            console.log('Using handler "rootHandler"');
            handler = rootHandler;
            break;
    }

    try {
        handler(req, res);
    } catch (error) {
        console.error('error', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(`{"error": "${error.stack}"}`);
    }
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});