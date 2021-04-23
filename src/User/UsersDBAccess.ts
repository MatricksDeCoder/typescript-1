import { IUser } from "../Shared/Model"
import DataStore from 'nedb'

export class UsersDBAccess  {

    private nedb: Nedb

    constructor() {
        this.nedb = new DataStore('database/Users.db')
        this.nedb.loadDatabase()
    }
    
    // put user (according to User model ) in the database
    public async putUser(user: IUser): Promise<any> {
        return new Promise((resolve,reject) => {
            try {
                this.nedb.insert(user, (err: any, user: any) => {  
                    if(err) {
                        reject(err)
                    } else {
                        resolve(user)
                    }
                })
            } catch(error) {
                reject(error)
            }
        })
    }

    // get user credentials from db - ie from login 
    public async getUser(id: string): Promise<IUser | undefined> {
        return new Promise((resolve,reject) => {
            try {
                this.nedb.find({id}, (err:any, docs: IUser[]) => {
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

}