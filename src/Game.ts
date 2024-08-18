import {Chess} from "chess.js";
import WebSocket from "ws";
import { MOVE } from "./socketMessages";
import { GAME_OVER } from "./socketMessages";
import { INIT_GAME } from "./socketMessages";
class Game {
    public players2: WebSocket;
    public players1: WebSocket;
    public board: Chess;
    private moves: String[];
    private startTime: Date;
    private moveCount: number;
  constructor(player1:WebSocket, player2:WebSocket) {
    this.moveCount = 0;
    this.players1 = player1;
    this.players2 = player2;
    this.board = new Chess();
    this.moves = [];
    this.startTime = new Date();
    this.players1.send(JSON.stringify({type:INIT_GAME,payload:{color:"white"}}));
    this.players2.send(JSON.stringify({type:INIT_GAME,payload:{color:"black"}}));
}

makeMove(socket:WebSocket,moveObject:{from:string,to:string}){
  if(this.moveCount % 2 === 0 && socket ! == this.players2){
    return;
  }
  if(this.moveCount % 2 === 1 && socket ! == this.players1){
    return;
  }
  try{
    this.board.move(moveObject);
  }
  catch(e){
    console.log(e);
    return;
  }

  if (this.board.isGameOver()){
    console.log("game over")
    if(this.moveCount % 2 === 0){
      this.players2.send(JSON.stringify({type:MOVE,payload:moveObject,turn:this.moveCount}));
      // this.players1.send(JSON.stringify({type:MOVE,payload:moveObject,turn:this.moveCount}));
    }
    else{
      this.players1.send(JSON.stringify({type:MOVE,payload:moveObject,turn:this.moveCount}));
      // this.players2.send(JSON.stringify({type:MOVE,payload:moveObject,turn:this.moveCount}));
      
    }
    this.moveCount++;
    this.players1.send(JSON.stringify(
      {type:GAME_OVER,
        payload:{
          winner: this.board.turn() === "w" ? "b" : "w"
        }
        
      }
    ));
    this.players2.send(JSON.stringify(
      {type:GAME_OVER,
        payload:{
          winner: this.board.turn() === "w" ? "b" : "w"
        }
        
      }
    ));
    return;
  }
      else{
        if(this.moveCount % 2 === 0){
          this.players2.send(JSON.stringify({type:MOVE,payload:moveObject,turn:this.moveCount}));
          // this.players1.send(JSON.stringify({type:MOVE,payload:moveObject,turn:this.moveCount}));
        }
        else{
          this.players1.send(JSON.stringify({type:MOVE,payload:moveObject,turn:this.moveCount}));
          // this.players2.send(JSON.stringify({type:MOVE,payload:moveObject,turn:this.moveCount}));
          
        }
        this.moveCount++;
      }
      
    }
  }
  
  
  
  export default Game;