import React from 'react';
import './App.css';
import Toss from "./components/Toss.js";
import Player from "./components/Player.js";


class App extends React.Component {
  state = {
    playerNO: 1,
    playerCount: 2,
    players: [
      { NO: 1, name: "player1", score: 0, rank: "" },
      { NO: 2, name: "player2", score: 0, rank: "" },
    ]
  }
  thisTurnScore = player => {
    let playerUpdate = this.state.players.map(playerN => playerN.NO === player.NO ? player : playerN);
    const first = Math.max(...playerUpdate.map(playerN => playerN.score));
    playerUpdate = playerUpdate.map(playerN => playerN.score === first ? { ...playerN, rank: "(ง︡'-'︠)ง" } : { ...playerN, rank: "" });
    this.setState({ players: playerUpdate, playerNO: this.state.playerNO === this.state.playerCount ? 1 : this.state.playerNO + 1 });

  }
  newGame = () => {
    const playerCount = +prompt("กรอกจำนวนผู้เล่น(2-6):", 4);
    const playerList = [];
    for (let i = 1; i <= playerCount; i++) {
      const playerName = prompt("กรอกชื่อผู้เล่น", `player ${i}`);
      playerList.push({ NO: i, name: playerName, score: 0, rank: "" })
    }
    this.setState({ players: playerList, playerCount: playerCount });
  }
  render() {
    return (
      <div className="App">
        <div style={{ display: "flex", height: "10vh", margin: "0", justifyContent: "center", alignItems: "center", fontSize: "1.8rem", backgroundColor: "#000000", color: "#bc0016" }}>
          <div style={{ width: "80%" }}>~ เกมทอยลูกเต๋า( 2-6 คน) ~</div>
          <button onClick={this.newGame} style={{ backgroundColor: "#bc0016", width: "20%", height: "100%" }}>setting</button>
        </div>
        <Toss player={this.state.players[this.state.playerNO - 1]} thisTurnScore={this.thisTurnScore} />
        <div style={{ display: "flex", flexFlow: "row wrap", justifyContent: "center", backgroundColor: "#faa613" }}>
          {this.state.players.map(player => <Player
            key={player.NO}
            player={player}
            width={this.state.playerCount === 2 || this.state.playerCount === 4 ? 48 : 30}
            height={this.state.playerCount > 3 ? 30 : 60}
            color={this.state.playerCount === 4 && player.NO >= 3 ? player.NO === 3 ? "#688e26" : "#4d7c8a"
              : player.NO % 2 === 0 ? "#688e26" : "#4d7c8a"}
          />)}
          {this.state.playerCount === 5 ?
            <div style={{ backgroundColor: "#688e26", width: "30vw", height: "30vh" }}><h1 style={{ padding: "20px" }}>ᕙ(`▿´)ᕗ</h1></div>
            : null}
        </div>
      </div>
    );
  }
}

export default App;
