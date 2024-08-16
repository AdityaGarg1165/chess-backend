import { WebSocketServer } from "ws";
import { WebSocket } from "ws";
import GameManager from "./GameManager";
const express = require("express")


const app = express()
const httpServer = app.listen(6969)
const wss = new WebSocketServer({ noServer:true});
const gameManager = new GameManager();
console.log("Server Started")
wss.on("connection", (ws: WebSocket) => {
   gameManager.addUser(ws);
  
});
wss.on("close", (ws: WebSocket) => {
    gameManager.removeUser(ws);
});