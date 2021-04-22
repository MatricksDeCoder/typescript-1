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