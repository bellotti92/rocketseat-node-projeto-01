//buffer são espaços alocados na memória de forma binária, pra ser trocados de formas muito mais rápida do que de formato primitivo ( string, number, etc )
//buffer.toJSON representa na forma DECIMAL.


const buffer = Buffer.from("node js course")

console.log(buffer) //hexadecimal.
console.log(buffer.toJSON()) //decimal.