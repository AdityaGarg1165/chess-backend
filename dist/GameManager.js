"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Game_1 = __importDefault(require("./Game"));
const socketMessages_1 = require("./socketMessages");
class GameManager {
    constructor() {
        this.games = [];
        this.pendingUser = null;
        this.users = [];
    }
    addUser(user) {
        this.users.push(user);
        this.addHandler(user);
    }
    removeUser(socket) {
        if (this.pendingUser === socket) {
            this.pendingUser = null;
        }
        this.users = this.users.filter((user) => user !== socket);
    }
    addHandler(socket) {
        socket.on("message", (message) => {
            const data = JSON.parse(message.toString());
            if (data.type === socketMessages_1.INIT_GAME) {
                if (this.pendingUser) {
                    const game = new Game_1.default(this.pendingUser, socket);
                    this.games.push(game);
                    this.pendingUser = null;
                }
                else {
                    this.pendingUser = socket;
                }
            }
            if (data.type === "join_game") { }
            if (data.type === socketMessages_1.MOVE) {
                const game = this.games.find((game) => game.players1 === socket || game.players2 === socket);
                if (game) {
                    game.makeMove(socket, data.move);
                }
                else {
                    console.log("Game not found");
                }
            }
        });
    }
}
exports.default = GameManager;
