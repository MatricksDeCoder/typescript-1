export interface ILoginBody {
    username: string, 
    password: string
}

export interface IHandler {
    handleRequest(): void;
}

export interface ISessionToken {
    tokenId: string,
}

export interface ITokenGenerator {
    generateToken(loginBody: ILoginBody) : Promise<ISessionToken | undefined>
}