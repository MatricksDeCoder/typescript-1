import { AccessRights } from "../Shared/Model"

export interface ILoginBody {
    username: string, 
    password: string
}

export interface IHandler {
    handleRequest(): void;
}

export interface ISessionToken {
    tokenId: string,
    username: string,
    valid: boolean, // eg on logout session token will be invalidated
    expirationTime: Date,
    accessRights: AccessRights[]
}

export interface ITokenGenerator {
    generateToken(loginBody: ILoginBody) : Promise<ISessionToken | undefined>
}