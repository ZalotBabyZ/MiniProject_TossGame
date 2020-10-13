import React, { Component } from 'react'

export default class Player extends Component {

    render() {
        const { name, score, rank } = this.props.player;
        const { width, height, color } = this.props;
        return (
            <div className="playerBox" style={{ display: "flex", flexDirection: "column", width: `${width}vw`, height: `${height}vh`, border: " #bc0016 2px  dashed ", backgroundColor: color, color: "#320a28", justifyContent: "center", alignItems: "center" }}>
                <p> {name} <br />
                    {score} <br /> <br />
                    {{ rank } ?
                        <div style={{ display: "flex", color: "#ffffff", backgroundColor: "#bc0016", width: "20vw", justifyContent: "center", alignItems: "center" }}>
                            <span role="img" aria-labelledby="celebrate">  {rank}     </span>
                        </div>
                        :
                        null
                    }
                </p>
            </div>
        )
    }
}
