import { IUserCredentials } from "../Shared/Model"
import DataStore from 'nedb'

export class UserAccessDBAccess  {

    private nedb: Nedb

    constructor() {
        this.nedb = new DataStore('database/UserCredentials.db')
        this.nedb.loadDatabase()
    }
    
    // put user credentials in database
    public async putUserCredentials(userCredentials: IUserCredentials): Promise<any> {
        return new Promise((resolve,reject) => {
            try {
                this.nedb.insert(userCredentials, (err: any, docs: any) => {  
                    if(err) {
                        reject(err)
                    } else {
                        resolve(docs)
                    }
                })
            } catch(error) {
                reject(error)
            }
        })
    }

    // get user credentials from db - ie from login 
    public async getUserCredentials(username: string, password: string): Promise<IUserCredentials | undefined> {
        throw ""
    }

}