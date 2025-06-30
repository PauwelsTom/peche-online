import { Component } from "react";
import "./TunaBar.css"
import { getRandom } from "../Functions";

export class TunaBar extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.match = 45;
        this.player = 50;
        this.playing = true;
    }

    componentDidMount() {
        this.matchInterval = setInterval(this.handleMatch, 1000);
        this.playerInterval = setInterval(this.handlePlayer, 25);
    }

    componentWillUnmount() {
        clearInterval(this.matchInterval);
        clearInterval(this.playerInterval);
    }

    handleMatch = () => {
        if (this.playing) {
            this.match += getRandom(-10, 10);
            this.match = Math.max(0, Math.min(90, this.match));
            document.getElementById("MatchZone").style.left = this.match + "%";
        }
    };

    handlePlayer = () => {
        if (this.playing) {
            this.player += this.props.space ? 1 : -1;
            this.player = Math.max(0, Math.min(100, this.player));
            document.getElementById("PlayerZone").style.left = this.player + "%";
        }
    };

    render() {
        return (
            <div id="TunaBarDiv">
                <div id="MatchZone"></div>
                <div id="PlayerZone"></div>
            </div>
        );
    }
}
