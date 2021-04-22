import { ILoginBody } from '../Server/Model'

// different user access right actions/properties as enum
export enum AccessRights {
    CREATE,
    READ,
    UPDATE,
    DELETE
}

export interface IUserCredentials extends ILoginBody {
    accessRights: AccessRights[]
}

export enum HTTP_CODES {
    OK = 200,
    CREATED = 201,
    BAD_REQUEST = 401,
    UNAUTHORIZED = 401,
    NOT_FOUND=404
}

export enum HTTP_METHODS {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE'
}