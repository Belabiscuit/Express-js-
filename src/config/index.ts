import dotenv from "dotenv"
import path from "path"

//first e dotenv config ana lagbe then const config diye connection kora lagbe 
dotenv.config({
    path : path.join(process.cwd(),'.env')
})

const config = {
    connection_string :process.env.CONNECTIONSTRING as string,
    port :process.env.PORT,
}

//export korbo config ke
export default config;


