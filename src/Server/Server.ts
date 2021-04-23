import {createServer, IncomingMessage, ServerResponse } from 'http'
import { Utils } from './Utils'
import { LoginHandler } from './LoginHandler'
import { ITokenGenerator } from './Model'
import { Authorizer } from '../Authorization/Authorizer'
import { UsersHandler } from './UsersHandler'

export class Server {

    // instance variables
    private port : number

    // authorizer via token
    private authorizer: Authorizer

    constructor() {
        this.port = 8080
        this.authorizer = new Authorizer()
    }

    // methods -create server
    public createServer() {
        createServer(async (req: IncomingMessage, res: ServerResponse) => {
            let basePath
            if(req.url) {
                //console.log(`received request from ${req.url}`)
                basePath = Utils.getBaseURLPath(req.url)

                switch(basePath) {
                    case 'login':
                        const loginHandler = new LoginHandler(req,res, this.authorizer)
                        await loginHandler.handleRequest()
                        break
                    case 'users':
                        const usersHandler = new UsersHandler(req, res)
                        await usersHandler.handleRequest()
                        break
                    default:
                        console.log('nothing')
                        return
                }
            }
            res.end(basePath)
        }).listen(this.port)
        console.log(`Server listening on port ${this.port}`)
    }
}