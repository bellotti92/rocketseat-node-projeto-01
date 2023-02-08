export function buildRoutePath(path) {
    //inicia em ":" e depois venha uma string de a-z ( min ) ou A-Z ( maiusculo ) e pode ter 1 ou mais vezes dentro da string.
    const routeParametersRegex = /:([a-zA-z]+)/g

    //substitui a URL pela regex para capturar toda a URL
    const pathWithParams = path.replaceAll(routeParametersRegex, '(?<$1>[a-z0-9\-_]+)')

    /* 
    ?<$1> -> adiciona ao grupo da regex cada parametro enviado na URL. Ex: (users/:id/group/:groupId)

    resultado: 
    groups: {
        id: 'e13d8060-43f5-46de-9f36-17bdf7bd4984',
        groupId: '1'
    }
     */

    //cria a regex e retorna para ser utilizada no "server.js" ao comparar as rotas, e não mais apenas a URL crua.
    const PathRegex = new RegExp(`^${pathWithParams}(?<query>\\?(.*))?$`)

    return PathRegex

}