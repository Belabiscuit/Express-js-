import express, { json, request, type Application, type Request, type Response } from "express"

const app:Application = express()
const port = config.port

import {Pool} from "pg"
import config from "./config";
import { configDotenv } from "dotenv";
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({extended:true}))
  

const pool = new Pool({
    connectionString : config.connection_string
})
const DataBase = async()=>{
    try {
        await pool.query( `
            
            CREATE TABLE IF NOT EXISTS users(
            id SERIAL PRIMARY KEY,
            name VARCHAR(50),
            email VARCHAR(50) UNIQUE NOT NULL,
            password VARCHAR(50) NOT NULL,
            is_active BOOLEAN DEFAULT true,
            age INT,
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()

           

            )
` );

            console.log("Database connected successfully!!");
    } catch (error) {
        console.log(error);
        
    }
 }
 DataBase();

   
    

app.get('/', (req:Request, res:Response) => {
//   res.send('Hello World!')
res.status(200).json({
   message: "Express Server",
   "author" : "Sifa-t" 
});
})
app.post("/api/users",async(req:Request,res:Response)=>{
    // console.log(req.body);
     const{name,email,password,age}= req.body;
     
    //inserting values in database
  try {
    const InsertData = await pool.query(`
        INSERT INTO users(name,email,password,age) VALUES ($1,$2,$3,$4)
        RETURNING *
        `,[name,email,password,age])
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


})

///post method e inserted data gulo k get method diye show kortc eksathe.
app.get("/api/users",async(req:Request,res:Response)=>{
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
})

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
 



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
