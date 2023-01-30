import http from 'http'

const users = []

const server = http.createServer((req, res) => {

    const { method, url } = req

    if (method === "GET" && url === "/users") {
        return res
            .setHeader('Content-type', 'application/json')
            .end(JSON.stringify(users))
    }

    if (method === "POST" && url === "/users") {

        users.push({
            id: 1,
            name: "Guilherme",
            email: "lala@email.com"
        })

        return res.end('Criação de usuário')
    }

    return res.end('hello world')
})

server.listen(8080)