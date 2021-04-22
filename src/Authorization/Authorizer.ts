import { ITokenGenerator, ILoginBody, ISessionToken } from "../Server/Model"
import { UserAccessDBAccess } from "./UserCredentialsDBAccess"
import { UserSessionTokenDBAccess } from "./UserSessionTokenDBAccess"

export class Authorizer implements ITokenGenerator {

    public dbUserCredentials: UserAccessDBAccess
    public dbUserSessionToken: UserSessionTokenDBAccess

    constructor() {
        this.dbUserCredentials = new UserAccessDBAccess()
        this.dbUserSessionToken = new UserSessionTokenDBAccess()
    }

    public async generateToken(loginBody: ILoginBody) {
        const user = await this.dbUserCredentials.getUserCredentials(loginBody.username, loginBody.password)
        if(user) {
            const token: ISessionToken = {
                accessRights: user.accessRights, 
                valid: true,
                expirationTime: this.generateExpirationTime(),
                username: user.username,
                tokenId: this.generateUniqueTokenId() // or you can use _id from database 
            }
            await this.dbUserSessionToken.putSessionToken(token)
            return token
    
        } else {
            return undefined
        }
    }

    private generateExpirationTime() {
        // 1 hr valid token
        return new Date(Date.now() + (60*60*1000))
    }

    private generateUniqueTokenId() {
        // or can make use of a uuid library 
        return Math.random().toString(36).slice(2)
    }
}
