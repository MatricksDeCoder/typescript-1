//import { IHandler } from './Model'
import { IncomingMessage, ServerResponse } from "http"
import { HTTP_CODES, HTTP_METHODS } from "../Shared/Model"

// our class that cna be extended by other handler classes
// abstract class must have abstract method
export abstract class BaseRequestHandler {
    
    // move common fields in all handlers into this class
    protected req: IncomingMessage
    protected res: ServerResponse

    constructor(req:IncomingMessage, res:ServerResponse) {
        this.req = req
        this.res = res
    }

    abstract handleRequest(): Promise<any>

    //move commong functionality in handlers to base class
    protected async handleNotFound() {
        this.res.statusCode = HTTP_CODES.NOT_FOUND
        this.res.writeHead(HTTP_CODES.NOT_FOUND, {'Content-Type': 'applicaiton/json'})
        this.res.write('wrong username or password')
    }
}