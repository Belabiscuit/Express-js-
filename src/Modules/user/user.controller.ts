import type { Request, Response } from "express";
import { pool } from "../../db";
import { Service } from "./user.service";
import app from "../../app";

const createUserController = async(req:Request,res:Response)=>{
    // console.log(req.body);
    //  const{name,email,password,age}= req.body;
     
    //inserting values in database
  try {
    const InsertData=await Service.userService(req.body)
     res.status(500).json({
            message:"Information Updated Successfully!!",
            data:InsertData.rows[0],
        })
  } catch (error:any) {
    res.status(500).json({
        message:error.message,
        error:error
    })
  }


}

const createUserControllerForget =async(req:Request,res:Response)=>{
      try {
        const result = await pool.query(`
            SELECT * FROM users`)

        res.status(200).json({
            success:true,
            message:"Users Retrived Successfully!",
            data:result.rows,
        })    
      } catch (error:any) {
        res.status(500).json({
            success:false,
            message:error.message,
            error:error,

        })
      }
}
export const userController={
    createUserController,
    createUserControllerForget
}