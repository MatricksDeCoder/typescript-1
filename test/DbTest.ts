import { UserAccessDBAccess } from "../src/Authorization/UserCredentialsDBAccess"
import { UserSessionTokenDBAccess } from "../src/Authorization/UserSessionTokenDBAccess"
//import { AccessRights } from "../src/Shared/Model"

class DbTest {

    public dbUserCredentials: UserAccessDBAccess

    constructor() {
        this.dbUserCredentials = new UserAccessDBAccess()
    }

}

const dbTester = new DbTest() 
dbTester.dbUserCredentials.putUserCredentials({username:"user", password: "password", accessRights: [1,2,3]})
// run to see if added in db => ts-node test/DbTest

dbTester.dbUserCredentials.getUserCredentials("user", "password"). then( (user) => {
    if(!user) {console.log('user not found')}
    else console.log(user)
})


