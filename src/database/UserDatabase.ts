import { UserDB } from "../models/User";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {

    public static TABLE_NAME = "users"

    public async signup (newUser: UserDB) : Promise<void>{
       
        const result : UserDB= await BaseDatabase.connection(UserDatabase.TABLE_NAME).insert(newUser); 
    }

    public async searchEmail (email : string) : Promise<UserDB | undefined>{
        const [result] : UserDB[] | undefined[] = await BaseDatabase.connection(UserDatabase.TABLE_NAME).where({email})
        return result
    }

}

