import { UserAccessDBAccess } from "../src/Authorization/UserCredentialsDBAccess"
import { AccessRights } from "../src/Shared/Model"

class DbTest {

    public dbAccess: UserAccessDBAccess

    constructor() {
        this.dbAccess = new UserAccessDBAccess()
    }

}

const dbTester = new DbTest() 
dbTester.dbAccess.putUserCredentials({username:"user", password: "password", accessRights: [1,2,3]})
// run to see if added in db => ts-node test/DbTest