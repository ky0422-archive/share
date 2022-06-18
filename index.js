const express = require('express');
const fs = require('fs');

const app = express();

module.exports = (file, port) => {
    if (!fs.existsSync(file)) {
        console.log(`File '${file}' not found`);
        return;
    };

    app.get(`/`, (_, res) => {
        res.attachment(file);
        fs.createReadStream(file, { bufferSize: 64 * 1024 }).pipe(res);
    });

    app.listen(port);

    console.log(`http://${require('ip').address()}:${port}`);
}
