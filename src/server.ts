import express, {Request, Response} from "express";
import connectToDatabase from "./db";

const application = express()

const PORT = 1337

connectToDatabase()

application.get("/ping", (request:Request, response:Response)=> {
    response.send("Pong")
})

application.listen(PORT, ()=>{
    console.log("Server up and running")
})