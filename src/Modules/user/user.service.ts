import { pool } from "../../db"
import type { Iuser } from "./user.interface"

const userService = async(payload:Iuser)=>{
    const{name,email,password,age}=payload
    const InsertData = await pool.query(`
        INSERT INTO users(name,email,password,age) VALUES ($1,$2,$3,$4)
        RETURNING *
        `,[name,email,password,age])
        return InsertData
       
}

const UserServiceForGet = async()=>{
    const result = await pool.query(`
            SELECT * FROM users`)
            return result

}
export const Service={
    userService,
    UserServiceForGet
}