import { WebSocketServer } from "ws";
import { WebSocket } from "ws";
import GameManager from "./GameManager";

const wss = new WebSocketServer({ port: 6969 });
const gameManager = new GameManager();

wss.on("connection", (ws: WebSocket) => {
   gameManager.addUser(ws);
  
});
wss.on("close", (ws: WebSocket) => {
    gameManager.removeUser(ws);
});