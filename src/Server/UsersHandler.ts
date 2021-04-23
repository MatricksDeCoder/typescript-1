import { IncomingMessage, ServerResponse } from "http"
//import { IHandler } from './Model'
import { HTTP_CODES, HTTP_METHODS } from "../Shared/Model"
import { UsersDBAccess } from '../User/UsersDBAccess'
import { Utils } from './Utils'
import { BaseRequestHandler } from "./BaseRequestHandler"

export class UsersHandler extends BaseRequestHandler  {

    private usersDBAccess : UsersDBAccess

    constructor(req:IncomingMessage, res:ServerResponse) {
        super(req, res)
        this.usersDBAccess = new UsersDBAccess()
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
                await this.handleNotFound()
                break
        }
       
    }

    private async handleGet() {
        if(this.req.url) {
            const parsedUrl = Utils.getURLParameters(this.req.url)
            if(parsedUrl) {
                const userId = parsedUrl.query.id
                if(userId) {
                    const user = await this.usersDBAccess.getUser(userId)
                    if(user) {
                        this.respondJSON(HTTP_CODES.OK, user)
                    } else {
                        await this.handleNotFound()
                    }
                } else {
                    this.respondBadRequest("userId not in request!")
                }
            } 
        }
    }

    private async handlePut() {
        await this.handleNotFound()
    }

    private async handlePost() {
        await this.handleNotFound()
    }

    private async handleDelete() {
        await this.handleNotFound()
    }

}