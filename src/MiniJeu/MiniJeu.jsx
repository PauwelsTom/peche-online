import { Component } from "react";
import "./MiniJeu.css";
import { gameDict } from "../Data";
import { TunaBar } from "./TunaBar";

export class MiniJeu extends Component {
    getGame = (game) => {
        switch (game) {
            case gameDict.TunaBar:
                return <TunaBar space={this.props.space} />;
            default:
                return null;
        }
    };

    render() {
        return (
            <div id="MiniJeuDiv">
                {this.getGame(this.props.game)}
            </div>
        );
    }
}
