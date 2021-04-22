import { IncomingMessage, ServerResponse } from "http"
import { HTTP_CODES, HTTP_METHODS } from "../Shared/Model"
import { ILoginBody, IHandler, ITokenGenerator } from './Model'

export class LoginHandler implements IHandler {

    private req: IncomingMessage
    private res: ServerResponse
    private authorizer: ITokenGenerator

    constructor(req:IncomingMessage, res:ServerResponse, authorizer: ITokenGenerator) {
        this.req = req
        this.res = res
        this.authorizer = authorizer
    }

    public async handleRequest(): Promise<void> {

        switch(this.req.method) {
            case HTTP_METHODS.GET:
                await this.handleGet()
                break
            case HTTP_METHODS.POST:
                await this.handlePost()
                break
            case HTTP_METHODS.PUT:
                await this.handlePut()
                break
            case HTTP_METHODS.DELETE:
                await this.handleDelete()
                break
            default:
                break
        }
       
    }

    private async handleNotFound() {
        this.res.statusCode = HTTP_CODES.NOT_FOUND
        this.res.writeHead(HTTP_CODES.NOT_FOUND, {'Content-Type': 'applicaiton/json'})
        this.res.write('wrong username or password')
    }

    private async handlePost(): Promise<void> {

        try {
            //console.log(`Getting the request body `)
            const body = await this.getRequestBody()
            //console.log(`Request body USERNAME: ${body.username}`)
            //console.log(`Request body PASSWORD: ${body.password}`)
            // generate Token save token in tokenDatabase 
            const sessionToken = await this.authorizer.generateToken(body)
            if(sessionToken) {
                this.res.statusCode = HTTP_CODES.CREATED
                this.res.writeHead(HTTP_CODES.CREATED, {'Content-Type': 'applicaiton/json'})
                this.res.write(JSON.stringify(sessionToken))
            } else {
                await this.handleNotFound()
            }
        } catch(error) {
            this.res.write('error: ' + error.message)
        }

    }

    private async handlePut() {
        await this.handleNotFound()
    }

    private async handleGet() {
        await this.handleNotFound()
    }

    private async handleDelete() {
        await this.handleNotFound()
    }

    private async getRequestBody(): Promise<ILoginBody> {
        return new Promise((resolve, reject) => {
            let body = ''
            this.req.on('data', (data: string) => {
                // append data to body
                body += data
            })
            // resolve promise on end
            this.req.on('end', () => {
                try {
                    resolve(JSON.parse(body))
                } catch(error) {
                    reject(error)
                }
            })
            // error 
            this.req.on('error', (error: any) => {
                reject(error)
            })
        })
    }

}