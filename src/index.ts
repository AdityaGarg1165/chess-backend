import { WebSocketServer } from "ws";
import { WebSocket } from "ws";
import GameManager from "./GameManager";
const express = require("express")


const app = express()
// const httpServer = app.listen(6969)
const wss = new WebSocketServer({port:6969});
const gameManager = new GameManager();
console.log("Server Started")
wss.on("connection", (ws: WebSocket) => {
   gameManager.addUser(ws);
   ws.on("close",()=>{
    gameManager.removeUser(ws);
   })
  
});

