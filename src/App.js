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

  thisTurnScore = (player, changePlayer) => {
    let playerUpdate = this.state.players.map(
      playerN => playerN.NO === player.NO ?
        player
        : playerN
    );
    const first = Math.max(...playerUpdate.map(playerN => playerN.score));

    let playerNO = changePlayer ?

      this.state.playerNO === this.state.playerCount ?

        1
        : this.state.playerNO + 1

      : this.state.playerNO

    playerUpdate = playerUpdate.map(

      playerN => playerN.score === first && playerN.score !== 0 ?

        { ...playerN, rank: "(ง︡'-'︠)ง" }
        : { ...playerN, rank: "" }

    );

    this.setState({
      players: playerUpdate,
      playerNO: playerNO
    });

  }

  newGame = () => {
    const playerCount = +prompt("กรอกจำนวนผู้เล่น(2-6):", 4);
    const playerList = [];

    for (let i = 1; i <= playerCount; i++) {
      const playerName = prompt("กรอกชื่อผู้เล่น", `player ${i}`);
      playerList.push({
        NO: i,
        name: playerName,
        score: 0,
        rank: ""
      });
    }

    this.setState({
      players: playerList,
      playerCount: playerCount,
      playerNO: 1
    });

  }

  render() {
    const containerStyle = { display: "flex", margin: "0", justifyContent: "center", alignItems: "center", fontSize: "1.2rem", color: "#bc0016" };

    return (
      <div className="App" style={{ backgroundColor: "#FAA613", height: "100vh" }}>

        <div style={{ ...containerStyle, height: "10vh", backgroundColor: "#320A28", fontSize: "1.8rem" }}>
          <div style={{ width: "80%" }}> ~ เกมทอยลูกเต๋า( 2-6 คน) ~ </div>
          <button onClick={this.newGame} style={{ backgroundColor: "#bc0016", width: "20%", height: "100%" }}>setting</button>
        </div>

        <Toss
          player={this.state.players[this.state.playerNO - 1]}
          thisTurnScore={this.thisTurnScore}
          newGame={this.newGame}
        />

        <div style={{ ...containerStyle, flexFlow: "row wrap" }}>

          {this.state.players.map(
            player => <Player
              key={player.NO}
              player={player}
              width={this.state.playerCount === 2 || this.state.playerCount === 4 ? 48 : 32}
              height={this.state.playerCount > 3 ? 28 : 55}
              color={this.state.playerCount === 4 && player.NO >= 3 ?
                player.NO === 3 ? "#688e26"
                  : "#4d7c8a"
                : player.NO % 2 === 0 ? "#688e26"
                  : "#4d7c8a"}
            />)
          }

          {this.state.playerCount === 5 ?
            <div style={{ ...containerStyle, backgroundColor: "#688e26", width: "32vw", height: "28vh", color: "#320A28", border: " #bc0016 2px  dashed " }}>
              <span role="img" aria-labelledby="celebrate"> ᕙ(`▿´)ᕗ </span>
            </div>
            :
            null
          }

        </div>
      </div>
    );
  }
}

export default App;
