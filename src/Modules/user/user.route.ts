import { Router, type Request, type Response } from "express";
import { pool } from "../../db";
import { userController } from "./user.controller";

///first route file khulbo ,route k const dhore route roter k express theke call kore then export kore dibo 
///app e api then route k oikhane add kore,crud operation ekhane shift korbo 

const router = Router()

router.post("/", userController.createUserController )
router.get("/",userController.createUserControllerForget)


export const userRoute = router