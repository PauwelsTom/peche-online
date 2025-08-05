import { Component } from "react";
import "./TunaBar.css"
import { getRandom } from "../Functions";

// space, Quit
export class TunaBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            score: 50,
        };
        this.matchSpeed = 0;
        this.matchSize = 10;
        this.maxSpeed = 3;
        this.match = 50 - this.matchSize / 2;
        this.player = 50;
        this.playing = true;
        this.score = 50;
    }

    get_color = () => {
        const green = this.match / 100;
        const red = 1 - green;
        return "(" + red +  ", " + green + ", 0)";
    }

    is_inside = () => {
        return this.player >= this.match && this.player <= this.match + this.matchSize;
    }

    componentDidMount() {
        this.matchInterval = setInterval(this.handleMatch, 100);
        this.playerInterval = setInterval(this.handlePlayer, 25);

        document.getElementById("ScoreBar").style.color = this.get_color();
    }

    componentWillUnmount() {
        clearInterval(this.matchInterval);
        clearInterval(this.playerInterval);
    }

    handleMatch = () => {
        if (this.playing) {
            this.matchSpeed = Math.max(-this.maxSpeed, Math.min(this.maxSpeed, this.matchSpeed + getRandom(-1, 1)));

            this.match += this.matchSpeed;
            if (this.match >= 100 - this.matchSize) {
                this.match = 100 - this.matchSize;
                this.matchSpeed = 0;
            } else if (this.match <= 0) {
                this.match = 0;
                this.matchSpeed = 0;
            }
            document.getElementById("MatchZone").style.left = this.match + "%";
        }
    };

    handlePlayer = () => {
        if (this.playing) {
            this.player += this.props.space ? 1 : -1;
            this.player = Math.max(0, Math.min(100, this.player));
            document.getElementById("PlayerZone").style.left = this.player + "%";
            this.setState({score: this.is_inside() ? this.state.score + 0.5 : this.state.score - 0.5});
            if (this.state.score >= 100) {
                this.props.Quit(true);
            } else if (this.state.score <= 0) {
                this.props.Quit(false);
            }
        }
    };

    render() {
        return (
            <div id="TunaBar">
                <div id="ScoreBar">{this.state.score.toFixed(0) + "%"}</div>
                <div id="TunaBarDiv">
                    <div id="MatchZone"></div>
                    <div id="PlayerZone"></div>
                </div>
            </div>
        );
    }
}
