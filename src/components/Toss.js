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
        if (updatePoint === 0) this.endTurn(0);
        if(this.props.player.score+updatePoint>=100)this.endTurn(updatePoint)
        
    }
    endTurn = (keepPoint) => {
        // console.log(keepPoint)
        this.props.thisTurnScore({
            NO: this.props.player.NO,
            name: this.props.player.name,
            score: this.props.player.score + keepPoint,
            rank: this.props.player.rank
        });
        this.setState({ thisTurnPoint: 0 });
    }
    render() {
        return (
            <div>
                { (this.props.player.score + this.state.thisTurnPoint >= 100) ?
                    <div style={{ display: "flex", flexDirection: "column", width: "100vw", height: "30vh", backgroundColor: "#FAA613", justifyContent: "center", alignItems: "center" }}>
                        <h2>  (っ＾▿＾)۶🍸🌟ผู้ชนะคือ: {this.props.player.name}🌟🍺٩(˘◡˘ )</h2>
                        <h4> คะแนนสะสม: {this.props.player.score + this.state.thisTurnPoint} คะแนน</h4>
                    </div>
                    :
                    <div className="tossBox" style={{ display: "flex", width: "100vw", height: "30vh", backgroundColor: "#FAA613" }}>
                        <div className="currentPlayer" style={{ margin: "auto", color: "#320A28", width: "30%" }}>
                            <h2>ผู้เล่น: {this.props.player.name}</h2>
                            <h4>คะแนนสะสม: {this.props.player.score}</h4>
                            <h3 style={{ color: "#000000", backgroundColor: "#bc0016", width: "70%" }}>{this.props.player.rank}</h3>
                        </div>

                        <div className="Dice" style={{ color: "#320A28", width: "30%" }}>

                            {this.state.currentDice.point === 0 ? <h1 style={{ color: "#000000", backgroundColor: "#bc0016" }}>เริ่ม</h1>
                                : <h4> ทอยได้แต้ม: {this.state.currentDice.point}<br />
                                    <img src={this.state.currentDice.image} alt={this.state.currentDice.point} style={{ width: "10vw" }} /></h4>
                            }
                        </div>
                        <div className="thisTurn" style={{ color: "#320A28", width: "30%" }}>
                            <h3>คะแนนสะสมรอบนี้</h3>
                            <h2>{this.state.thisTurnPoint}</h2>
                            <div style={{ display: "flex" }}>
                                <button onClick={this.toss} style={{ backgroundColor: "#bc0016", width: "50%" }}>ทอยแต้ม</button>
                                <button onClick={()=>this.endTurn(this.state.thisTurnPoint)} style={{ backgroundColor: "#bc0016", width: "50%" }}>เก็บแต้ม</button>
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }
}
