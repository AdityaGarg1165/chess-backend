"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const GameManager_1 = __importDefault(require("./GameManager"));
const express = require("express");
const app = express();
const httpServer = app.listen(6969);
httpServer.get("/", (req, res) => {
    res.send("/");
});
const wss = new ws_1.WebSocketServer({ noServer: true });
const gameManager = new GameManager_1.default();
console.log("Server Started");
wss.on("connection", (ws) => {
    console.log("connected");
    gameManager.addUser(ws);
});
wss.on("close", (ws) => {
    console.log("Disconnected");
    gameManager.removeUser(ws);
});
