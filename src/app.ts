import express, { json, request, type Application, type Request, type Response } from "express"

const app:Application = express()
const port = config.port


import { configDotenv } from "dotenv";
import { pool } from "./db";
import config from "./config";
import { userRoute } from "./Modules/user/user.route";
import { profileRouter } from "./Modules/Profile/profile.route";
import { authRouter } from "./Modules/Auth/auth.route";
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({extended:true}))
  
app.use("/api/users",userRoute)
app.use ("/api/profiles",profileRouter)
app.use("/api/auth",authRouter)

app.get('/', (req:Request, res:Response) => {
//   res.send('Hello World!')
res.status(200).json({
   message: "Express Server",
   "author" : "Sifa-t" 
});
})


///post method e inserted data gulo k get method diye show kortc eksathe.


///id diye get method e find system 


//information update kora


/// delete information 

 



export default app
