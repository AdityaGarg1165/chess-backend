"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chess_js_1 = require("chess.js");
const socketMessages_1 = require("./socketMessages");
const socketMessages_2 = require("./socketMessages");
const socketMessages_3 = require("./socketMessages");
class Game {
    constructor(player1, player2) {
        this.moveCount = 0;
        this.players1 = player1;
        this.players2 = player2;
        this.board = new chess_js_1.Chess();
        this.moves = [];
        this.startTime = new Date();
        this.players1.send(JSON.stringify({ type: socketMessages_3.INIT_GAME, payload: { color: "white" } }));
        this.players2.send(JSON.stringify({ type: socketMessages_3.INIT_GAME, payload: { color: "black" } }));
    }
    makeMove(socket, moveObject) {
        if (this.moveCount % 2 === 0 && socket == this.players2) {
            return;
        }
        if (this.moveCount % 2 === 1 && socket == this.players1) {
            return;
        }
        try {
            this.board.move(moveObject);
        }
        catch (e) {
            console.log(e);
            return;
        }
        if (this.board.isGameOver()) {
            console.log("game over");
            this.players1.send(JSON.stringify({ type: socketMessages_2.GAME_OVER,
                payload: {
                    winner: this.board.turn() === "w" ? "b" : "w"
                }
            }));
            this.players2.send(JSON.stringify({ type: socketMessages_2.GAME_OVER,
                payload: {
                    winner: this.board.turn() === "w" ? "b" : "w"
                }
            }));
            return;
        }
        else {
            if (this.moveCount % 2 === 0) {
                this.players2.send(JSON.stringify({ type: socketMessages_1.MOVE, payload: moveObject, turn: this.moveCount }));
                // this.players1.send(JSON.stringify({type:MOVE,payload:moveObject,turn:this.moveCount}));
            }
            else {
                this.players1.send(JSON.stringify({ type: socketMessages_1.MOVE, payload: moveObject, turn: this.moveCount }));
                // this.players2.send(JSON.stringify({type:MOVE,payload:moveObject,turn:this.moveCount}));
            }
            this.moveCount++;
        }
    }
}
exports.default = Game;
