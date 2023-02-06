//streams

// readable stream -> leitura ex. receber um arquivo csv
// writable stream -> envio de algum arquivo/dado. Ex: Filme, Música. E nunca irá transformar um dado, apenas processá-lo.
// transformable stream -> é o pipe entre a escrita ( writable ) e a leitura ( readable ) para transformar o dado.
// duplex stream -> é o pipe de escrita/leitura, pode ser usado para as duas operações.

// stdin -> dado de entrada de um terminal.
// stdout -> dado de saida de um terminal

// process.stdin.pipe(process.stdout) -> irá devolver a mesma entrada de um terminal.

//callback(null, dado) -> onde null é o erro ( 1o param) e o segundo ( dado ) é o que é devolvido em caso de suceso.

import { Readable, Writable, Transform } from 'node:stream';

class OneToHundredStream extends Readable {

    index = 1

    _read() {
        const i = this.index++

        setTimeout(() => {

            if (i > 100) {
                this.push(null)
            } else {

                const buffer = Buffer.from(String(i)) //convertendo o i de number pra string pois streams não aceitam dados primitivos ( string, number )

                this.push(buffer) //devolve pra stream o valor
            }

        }, 1000); //a cada 1s irá enviar o processamento da stream.


    }
}

class MultiplyByTenStream extends Writable {

    //chunk -> pedaço de cada leitura do pipe, cada parcela do que está sendo lido.
    //encondig -> codificação.
    //callback -> ao fim do processo de escrita, o callback é chamado.
    _write(chunk, encoding, callback) {
        console.log(Number(chunk.toString()) * 10);
        callback()
    }
}

class InverseNumberStream extends Transform {
    _transform(chunk, encoding, callback) {
        const transformed = Number(chunk.toString()) * -1
        callback(null, Buffer.from(String(transformed)))
    }
}

new OneToHundredStream() //stream de leitura, que irá fazer de 10 em 10 até 100
    .pipe(new InverseNumberStream()) //stream de transformação em cima do dado de leitura.
    .pipe(new MultiplyByTenStream()) //stream de escrita, após a transformação irá multiplicá-los por 10.