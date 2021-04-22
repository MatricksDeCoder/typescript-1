import { ITokenGenerator, ILoginBody } from "../Server/Model"
import { UserAccessDBAccess } from "./UserCredentialsDBAccess"

export class Authorizer implements ITokenGenerator {

    public dbAccess: UserAccessDBAccess

    constructor() {
        this.dbAccess = new UserAccessDBAccess()
    }

    public async generateToken(loginBody: ILoginBody) {
        const user = await this.dbAccess.getUserCredentials(loginBody.username, loginBody.password)

        if(user) {
            return {tokenId: '1'}
        } else {
            return undefined
        }
    }
}
