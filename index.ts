import express from 'express';
import ip from 'ip';
import fs from 'fs';

const app = express();

export default (file: string, port: number) => {
    if (!fs.existsSync(file)) {
        console.log(`File '${file}' not found`);
        return;
    }

    app.get(`/`, (_, res) => {
        res.attachment(file);
        fs.createReadStream(file).pipe(res);
    });

    app.get(`/raw`, (_, res) => {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        fs.createReadStream(file).pipe(res);
    });

    app.listen(port);

    console.log(`http://${ip.address()}:${port}`);
};
