import Game from "./Game";
import { WebSocket } from "ws";
import { INIT_GAME, MOVE } from "./socketMessages";
class GameManager {
    private games: Game[];
    private pendingUser: WebSocket | null
    private users: WebSocket[];
    constructor() {
        this.games = [];
        this.pendingUser = null;
        this.users = [];
        
  }

  addUser(user: WebSocket) {
    this.users.push(user);
    this.addHandler(user);
  }
  removeUser(socket: WebSocket) {
    if(this.pendingUser === socket){
      this.pendingUser = null;
    }
    this.users = this.users.filter((user) => user!== socket);
}  
private addHandler(socket: WebSocket) {
  socket.on("message", (message) => {
    const data = JSON.parse(message.toString());
    if (data.type === INIT_GAME) {

      if(this.pendingUser) {
        const game = new Game(this.pendingUser, socket);
        this.games.push(game);
        this.pendingUser = null;
      }
      else {
        this.pendingUser = socket;
      }

    }
    if (data.type === "join_game") {}
    if (data.type === MOVE) {
      const game = this.games.find((game) => game.players1 === socket || game.players2 === socket);
      if(game) {
        game.makeMove(socket,data.move);
      }
      else {
        console.log("Game not found");
      }
    
    }
  });
}
}

export default GameManager;