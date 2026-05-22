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
        const result = await Service.UserServiceForGet()

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


const createUserControlForGetSingle=async(req:Request,res:Response)=>{
    const {id}=req.params;
    try {
        const result = await Service.UserServiceForGetSingle(id)

            
        if(result.rows.length === 0){
            res.status(404).json({
                success:false,
                message:"Not Found!",

            })
        } 
        
        res.status(200).json({
            success:true,
            message:"User Retrive Successfully!",
            data:result.rows[0],
        })    

    } catch (error:any) {
             res.status(404).json({
            success:false,
            message:error.message,
            error:error,

        })
        
    }
}


const UserControllerForPut = async(req:Request,res:Response)=>{
    const {id}=req.params;
  
    try {
         const result = await Service.UserServiceForPut(req.body,id as string)

             if(result.rowCount === 0){
            res.status(404).json({
                success:false,
                message:"Not Found!",

            })
        } 
        
        res.status(200).json({
            success:true,
            message:"User Information Updated Successfully!",
            data:result.rows[0],
        })    

    } catch (error:any) {
        res.status(500).json({
        success: false,
        message:error.message,
        }
        )
    }
}
  
const UserControllerForDelete =async(req:Request,res:Response)=>{
    const {id} = req.params;
    try {
        const result = await Service.UserServiceForDelete(id as string)


             if(result.rowCount === 0){
            res.status(404).json({
                success:false,
                message:"Not Found!",

            })
        } 
        
        res.status(200).json({
            success:true,
            message:"User Information Delated Successfully!",
            data:result.rows[0],
        })    

    } catch (error:any) {
        res.status(500).json({
            success:false,
            message:error.message,

        })
        
    }

}



export const userController={
    createUserController,
    createUserControllerForget,
    createUserControlForGetSingle,
    UserControllerForPut,
    UserControllerForDelete
}