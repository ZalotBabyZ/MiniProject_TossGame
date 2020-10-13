import React, { Component } from 'react'
import dice1 from "../image/DICE1.png"
import dice2 from "../image/DICE2.png"
import dice3 from "../image/DICE3.png"
import dice4 from "../image/DICE4.png"
import dice5 from "../image/DICE5.png"
import dice6 from "../image/DICE6.png"

export default class Toss extends Component {

    state = {
        thisTurnPoint: 0,
        currentDice: { point: 0, image: "#" },
        endGame: false
    }
    diceSrc = [
        { score: 1, image: dice1 },
        { score: 2, image: dice2 },
        { score: 3, image: dice3 },
        { score: 4, image: dice4 },
        { score: 5, image: dice5 },
        { score: 6, image: dice6 }
    ]
    toss = () => {
        const newDiceScore = Math.ceil(Math.random() * 6);
        const newDiceImage = this.diceSrc[this.diceSrc.findIndex(obj => obj.score === newDiceScore)].image;
        const updatePoint = newDiceScore === 1 ? 0 : this.state.thisTurnPoint + newDiceScore;
        this.setState({ currentDice: { point: newDiceScore, image: newDiceImage }, thisTurnPoint: updatePoint });
        if (updatePoint === 0) this.endTurn(0, 1);
        if (this.props.player.score + updatePoint >= 100) {
            this.endTurn(updatePoint, 0);
            this.setState({ endGame: true });
        }

    }

    endTurn = (keepPoint, changePlayer) => {
        // console.log(keepPoint)
        this.props.thisTurnScore({
            NO: this.props.player.NO,
            name: this.props.player.name,
            score: this.props.player.score + keepPoint,
            rank: this.props.player.rank
        }, changePlayer);
        this.setState({ thisTurnPoint: 0 });
    }
    startNewGame = () => {
        this.props.newGame();
        this.setState({
            endGame: false,
            thisTurnPoint: 0,
            currentDice: { point: 0, image: "#" }
        });
    }
    render() {
        const { name, score, rank } = this.props.player;
        const { thisTurnPoint } = this.state;
        const { point, image } = this.state.currentDice
        const { endTurn, toss } = this

        const tossBoxStyle = { display: "flex", width: "100vw", height: "30vh", backgroundColor: "#FAA613", color: "#320A28", justifyContent: "center", alignItems: "center" }
        const HighlightStyle = { color: "#ffffff", backgroundColor: "#bc0016", width: "70%", padding: "5px" }
        const btnStyle = { color: "#ffffff", backgroundColor: "#bc0016", height: "30px", width: "80px" }
        const subBoxStyle = { display: "flex", flexDirection: "column", width: "32%", border: " #bc0016 2px  dashed ", height: "90%", justifyContent: "center", alignItems: "center" }

        return (
            <div>
                { this.state.endGame ?

                    <div className="tossBox" style={{ ...tossBoxStyle, flexDirection: "column" }}>
                        <h3>
                            <span role="img" aria-labelledby="celebrate">(っ＾▿＾)۶🍸🌟</span>
                            &nbsp;&nbsp;&nbsp; ผู้ชนะคือ: {name} &nbsp;&nbsp;&nbsp;
                            <span role="img" aria-labelledby="celebrate">🌟🍺٩(˘◡˘ )</span>
                        </h3>
                        <h4> คะแนนสะสม: {score + thisTurnPoint} คะแนน</h4>
                        <button onClick={this.startNewGame} style={{ ...btnStyle, width: "70%" }}>New Game</button>
                    </div>

                    :

                    <div className="tossBox" style={tossBoxStyle}>
                        <div className="currentPlayer" style={subBoxStyle}>
                            <h3>
                                {name}
                                <br />
                                คะแนนสะสม: {score}
                            </h3>

                            {rank ? <p style={HighlightStyle}>{rank}</p> : null}
                            
                        </div>
                        <div className="Dice" style={subBoxStyle}>

                            {thisTurnPoint ?

                                <h4>
                                    ทอยได้แต้ม: {point}
                                    <br />
                                    <img src={image} alt={point} style={{ width: "10vw" }} />
                                </h4>

                                :

                                <h2>
                                    {name}
                                    <br /><br />
                                    ~ ทอย ~
                                </h2>

                            }

                        </div>
                        <div className="thisTurn" style={subBoxStyle}>
                            <h3>
                                คะแนนสะสมรอบนี้
                                <br />
                                {thisTurnPoint}
                            </h3>
                            <div style={{ display: "flex" }}>
                                <button onClick={toss} style={btnStyle}>ทอยแต้ม</button>

                                {thisTurnPoint ?

                                    <div style={{ display: "flex" }}>
                                        <button onClick={() => endTurn(thisTurnPoint, 1)} style={btnStyle}>เก็บแต้ม</button>
                                    </div>

                                    :

                                    null

                                }

                            </div>
                        </div>
                    </div>

                }
            </div>
        )
    }
}
