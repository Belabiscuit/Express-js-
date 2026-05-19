import express, { json, request, type Application, type Request, type Response } from "express"

const app:Application = express()
const port = config.port


import { configDotenv } from "dotenv";
import { pool } from "./db";
import config from "./config";
import { userRoute } from "./Modules/user/user.route";
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({extended:true}))
  
app.use("/api/users",userRoute)

 

   
    

app.get('/', (req:Request, res:Response) => {
//   res.send('Hello World!')
res.status(200).json({
   message: "Express Server",
   "author" : "Sifa-t" 
});
})


///post method e inserted data gulo k get method diye show kortc eksathe.


///id diye get method e find system 

app.get("/api/users/:id",async(req:Request,res:Response)=>{
    const {id}=req.params;
    try {
        const result = await pool.query(`
            SELECT * FROM users WHERE id=$1`,[id])

            
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
})

//information update kora
app.put("/api/users/:id",async(req:Request,res:Response)=>{
    const {id}=req.params;
    const{name,password,age,is_active}=req.body;
    try {
        const result = await pool.query(`
            UPDATE users 
            SET 
            name=COALESCE($1,name),
            password=COALESCE($2,password),
            age=COALESCE($3,age),
            is_active = COALESCE($4,is_active)
            WHERE id=$5 RETURNING *

            `,[name,password,age,is_active,id])


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
})


/// delete information 
app.delete("/api/users/:id",async(req:Request,res:Response)=>{
    const {id} = req.params;
    try {
        const result = await pool.query(`
            DELETE FROM users WHERE id = $1`,[id])



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

})
 



export default app
