import { IUserCredentials } from "../Shared/Model"
import DataStore from 'nedb'
import { ISessionToken } from "../Server/Model"

export class UserSessionTokenDBAccess  {

    private nedb: Nedb

    constructor() {
        this.nedb = new DataStore('database/UserSessionToken.db')
        this.nedb.loadDatabase()
    }
    
    // put user session token in database
    public async putSessionToken(userSessionToken: ISessionToken): Promise<any> {
        return new Promise((resolve,reject) => {
            try {
                this.nedb.insert(userSessionToken, (err: any, token: any) => {  
                    if(err) {
                        reject(err)
                    } else {
                        resolve(token)
                    }
                })
            } catch(error) {
                reject(error)
            }
        })
    }

    /* get user credentials from db - ie from login 
    public async getSessionToken(username: string, password: string): Promise<IUserCredentials | undefined> {
        return new Promise((resolve,reject) => {
            try {
                this.nedb.find({username,password}, (err:any, docs: IUserCredentials[]) => {
                    if(!docs.length) {
                        resolve(undefined)
                    }
                    if(err) {
                        reject(err)
                    } else {
                        resolve(docs[0])
                    }
                })
            } catch(error) {
                reject(error)
            }
        })
    }
    */

}