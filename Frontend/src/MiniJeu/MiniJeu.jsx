import { Component } from "react";
import "./MiniJeu.css";
import { gameDict } from "../Data";
import { TunaBar } from "./TunaBar";
import { SmashBar } from "./SmashBar";

/* 

Idees : 

-> SmashBar: Il faut defoncer la barre espace le plus vite possible
Rythm-Tuna: Il faut appuyer en rythme sur espace
MaxRisks: Il faut rester appuye sur la barres espace jusqu'au dernier moment, plus tu relache tard, plus tu gagnes de points 

*/

// Quit, space
export class MiniJeu extends Component {
    getGame = (game) => {
        switch (game) {
            case gameDict.TunaBar:
                return <TunaBar space={this.props.space} Quit={this.props.Quit}/>;
            case gameDict.SmashBar:
                return <SmashBar space={this.props.space} Quit={this.props.Quit}/>;
            default:
                return <div></div>;
        }
    };

    componentDidMount() {
        this.getGame(this.props.game);
    }

    render() {
        const game = this.getGame(this.props.game);

        return (
            <div id="MiniJeuDiv">
                {game}
            </div>
        );
    }
}
