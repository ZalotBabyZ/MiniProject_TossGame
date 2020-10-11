import React, { Component } from 'react'

export default class Player extends Component {

    render() {
        return (
            <div className="playerBox" style={{ display: "flex", flexDirection: "column", width: `${this.props.width}vw`, height: `${this.props.height}vh`, backgroundColor: this.props.color, color: "#320a28" ,justifyContent: "center"}}>
                <h3>{this.props.player.name}</h3>
                <h3>{this.props.player.score}</h3>
                <h3>{this.props.player.rank}</h3>
            </div>
        )
    }
}
