import { IncomingMessage, ServerResponse } from "http"
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
        try {
            //console.log(`Getting the request body `)
            const body = await this.getRequestBody()
            //console.log(`Request body USERNAME: ${body.username}`)
            //console.log(`Request body PASSWORD: ${body.password}`)
            const sessionToken = await this.authorizer.generateToken(body)
            if(sessionToken) {
                this.res.write('Valid credentials')
            } else {
                this.res.write('Wrong credentials')
            }
        } catch(error) {
            this.res.write('error: ' + error.message)
        }
       
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