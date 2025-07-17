import { Component } from "react";
import "./MiniJeu.css";
import { gameDict } from "../Data";
import { TunaBar } from "./TunaBar";

// Quit, space
export class MiniJeu extends Component {
    getGame = (game) => {
        switch (game) {
            case gameDict.TunaBar:
                this.setState({game: <TunaBar space={this.props.space} Quit={this.Quit}/>});
                break;
            default:
                this.setState({game: <div></div>});
                break;
        }
    };

    componentDidMount() {
        this.getGame(this.props.game);
    }

    render() {
        let game = gameDict.None;
        switch (this.props.game) {
            case gameDict.TunaBar:
                game = <TunaBar space={this.props.space} Quit={this.props.Quit}/>;
                break;
            default:
                game = <div></div>;
                break;
        }
        return (
            <div id="MiniJeuDiv">
                {game}
            </div>
        );
    }
}
