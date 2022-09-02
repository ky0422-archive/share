import express from 'express'
import colors from 'colors'
import log from './src/logger'
import fs from 'fs'

const app = express()

export default (file: string | null, port: number) => {
    colors.enable()

    if (!file) console.log(colors.red('No file specified'))
    else if (!fs.existsSync(file)) console.log(`File '${file}' not found.`.red)
    else if (fs.lstatSync(file).isDirectory()) console.log(`'${file}' is a directory.`.red)
    else {
        app.get(`/`, (req, res) => {
            res.attachment(file)

            fs.createReadStream(file).pipe(res)

            log(req)
        })

        app.get(`/raw`, (req, res) => {
            res.writeHead(200, { 'Content-Type': 'text/plain' })

            fs.createReadStream(file).pipe(res)

            log(req, 'raw')
        })

        app.listen(port)

        const url = `http://${import('ip').then((m) => m.address())}:${`${port}`.gray}`.underline

        console.log(
            `${'share'.bgBlack.white} File uploaded to ${'➜'.red} ${url}\n${'share'.bgBlack.white} Raw data ${'➜'.red} ${url}${
                '/raw'.underline.bold
            }\n`
        )
    }
}
