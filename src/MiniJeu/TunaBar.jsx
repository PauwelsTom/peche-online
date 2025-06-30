import { Component } from "react";
import "./TunaBar.css"
import { getRandom } from "../Functions";

export class TunaBar extends Component {
    constructor(props) {
        super(props);
        this.state = {}
        this.match = 45;
        this.player = 50;
        this.playing = true;
    }

    handleMatch = () => {
        if (this.playing) {
            setTimeout(() => {
                this.match += getRandom(-10, 10);
                if (this.match >= 90) { this.match = 90; }
                if (this.match <= 0) { this.match = 0; }
                document.getElementById("MatchZone").style.left = "" + this.match + "%";
                this.handleMatch();
            }, 1000);
        }
    }

    handleMatch = () => {
        if (this.playing) {
            setTimeout(() => {
                this.player += this.props.space? 1: -1;
                if (this.player <= 0) { this.player = 0; }
                if (this.player >= 100) { this.player = 100; }
                document.getElementById("PlayerZone").style.left = "" + this.player + "%";
                this.handleMatch();
            }, 100);
        }
    }

    componentDidMount() {
        this.handleMatch();
    }

    render () {
        return (
            <div id="TunaBarDiv">
                <div id="MatchZone"></div>
                <div id="PlayerZone"></div>
            </div>
        );
    }
}