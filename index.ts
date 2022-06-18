import express from 'express';
import ip from 'ip';
import fs from 'fs';
import colors from 'colors';
import { Request } from 'express-serve-static-core';
import { ParsedQs } from 'qs';

const app = express();

export default (file: string, port: number) => {
    colors.enable();
    if (!fs.existsSync(file)) {
        console.log(`File '${file}' not found.`.red);
        return;
    }

    const log = (
        req: Request<{}, any, any, ParsedQs, Record<string, any>>,
        suffix?: string
    ) =>
        console.log(
            `${
                `[${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}]`
                    .green
            } ${req.ip} ${suffix ? `(${suffix.blue})` : ''}`
        );

    app.get(`/`, (req, res) => {
        res.attachment(file);
        fs.createReadStream(file).pipe(res);
        log(req);
    });

    app.get(`/raw`, (req, res) => {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        fs.createReadStream(file).pipe(res);
        log(req, 'raw');
    });

    app.listen(port);

    const url = `http://${ip.address()}:${`${port}`.gray}`.underline;
    const share = 'share'.bgBlack.white;
    const to = '➜'.red;
    console.log(
        `${share} File uploaded to ${to} ${url}\n${share} Raw data ${to} ${url}${
            '/raw'.underline.bold
        }`
    );
};
