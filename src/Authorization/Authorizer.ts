import { ITokenGenerator, ILoginBody } from "../Server/Model"

export class Authorizer implements ITokenGenerator {

    constructor() {

    }

    public async generateToken(loginBody: ILoginBody) {
        if(loginBody.password === 'password1') {
            return {tokenId: '1'}
        } else {
            return undefined
        }
    }
}
