import { IncomingMessage, ServerResponse } from "http";

export class LoginHandler {

    private req: IncomingMessage
    private res: ServerResponse

    constructor(req:IncomingMessage, res:ServerResponse) {
        this.req = req
        this.res = res
    }

    public handleRequest(): void {
        console.log(`Logging the request object ${JSON.stringify(this.req)}`)
        console.log(`Getting the request body `)
        this.getRequestBody()
        console.log(`Request body obtained`)
    }

    private async getRequestBody(): Promise<any> {
        const myPromise = new Promise((resolve, reject) => {
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
        return myPromise
    }

}