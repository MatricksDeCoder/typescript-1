import {createServer, IncomingMessage, ServerResponse } from 'http'
import { Utils } from './Utils'
import { LoginHandler } from './LoginHandler'

export class Server {

    // instance variables
    private port : number

    constructor() {
        this.port = 3001
    }

    // methods -create server
    public createServer() {
        createServer((req: IncomingMessage, res: ServerResponse) => {
            let basePath
            if(req.url) {
                console.log(`received request from ${req.url}`)
                basePath = Utils.getBaseURLPath(req.url)

                switch(basePath) {
                    case 'login':
                        const loginHandler = new LoginHandler(req,res)
                        loginHandler.handleRequest()
                    case 'hello':
                        console.log('We are data')
                    default:
                        console.log('nothing')
                }
            }
            res.end(basePath)
        }).listen(this.port)
        console.log(`Server listening on port ${this.port}`)
    }
}