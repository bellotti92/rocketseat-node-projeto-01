import http from 'http'
import { Transform } from 'node:stream'

class InverseNumberStream extends Transform {
    _transform(chunk, encoding, callback) {
        const transformed = Number(chunk.toString()) * -1
        console.log(transformed)
        callback(null, Buffer.from(String(transformed)))
    }
}

//req -> readableStream
//res -> writableStream

const server = http.createServer(async (req, res) => {

    const buffers = []

    for await (const chunk of req) { //await neste caso será sobre a stream, ou seja, irá esperar toda a stream ser processada pedaço por pedaço.
        buffers.push(chunk) //chunk é o pedaço de cada stream
    }

    //só será executado o codigo abaixo, após o consumo COMPLETO da stream.

    const fullStreamContent = Buffer.concat(buffers).toString()

    return res.end(fullStreamContent)

    //return req
    //    .pipe(new InverseNumberStream()) //irá transformar os dados de pouco em pouco.
    //    .pipe(res) //devolve a resposta no próximo pipe ao frontend ( fake-upload ... )
})

server.listen('8081')