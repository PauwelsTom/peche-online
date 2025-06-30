import { Component } from "react";
import "./MiniJeu.css"
import { gameDict } from "../Data";
import { TunaBar } from "./TunaBar";

// game, space
export class MiniJeu extends Component {
    constructor(props) {
        super();
        this.state = {}
        this.game = this.getGame(props.game);
    }

    getGame = (game) => {
        switch(game) {
            case gameDict.TunaBar:
                return <TunaBar space={this.props.space}/>;
        }
    }

    render() {
        return (
            <div id="MiniJeuDiv">
                {this.game}
            </div>
        );
    }
}