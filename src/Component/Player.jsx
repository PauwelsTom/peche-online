import { Component } from "react";
import "./Player.css"
import { gameDict, playerState } from "../Data";
import { getRandom } from "../Functions";
import { MiniJeu } from "../MiniJeu/MiniJeu";


export class Player extends Component {
    constructor(props) {
        super();
        this.state = {
            state: playerState.Catching,
            spacePressed: false,
            poisson: false,
            MiniJeu: gameDict.TunaBar,
        };
    }

    updateColor = () => {
        switch (this.state.state) {
            case playerState.Idle:
                document.getElementById("PlayerDiv").style.backgroundColor = "gray";
                break;

            case playerState.Fishing:
                document.getElementById("PlayerDiv").style.backgroundColor = (this.state.poisson? "yellow": "blue");
                break;

            case playerState.Catching:
                document.getElementById("PlayerDiv").style.backgroundColor = "red";
                break;
        }
    }

    handleSpace = () => {
        switch (this.state.state) {
            case playerState.Idle:
                this.setState({ 
                    state: playerState.Fishing,
                    poisson: false,
                });
                break;

            case playerState.Fishing:
                this.setState({ state: this.state.poisson? playerState.Catching: playerState.Idle });
                break;

            case playerState.Catching:
                break;
        }
    }

    // === Événements clavier ===
    SpaceDown = (event) => {
        if (event.code === "Space") {
            if (!this.state.spacePressed) {
                this.setState({ spacePressed: true });
                this.handleSpace();
            }
        }
    }

    SpaceUp = (event) => {
        if (event.code === "Space") {
            if (this.state.spacePressed) {
                this.setState({ spacePressed: false });
            }
        }
    }

    QuitGame = (bool) => {
        this.setState({ MiniJeu: gameDict.None, state: playerState.Idle});
    }

    componentDidMount() {
        window.addEventListener("keydown", this.SpaceDown);
        window.addEventListener("keyup", this.SpaceUp);
        this.updateColor(); // pour appliquer la couleur initiale
    }

    componentDidUpdate(prevProps, prevState) {
        // Si l'état du player change, mettre à jour la couleur
        if (prevState.state !== this.state.state) {
            this.updateColor();
            if (this.state.state === playerState.Fishing) {
                setTimeout(() => {
                    this.setState({ poisson: true }, () => {this.updateColor()});
                    setTimeout(() => {
                        if (this.state.state === playerState.Fishing) {
                            this.setState({ poisson: false, state: playerState.Idle }, () => {this.updateColor()});
                        }
                    }, 500);
                }, getRandom(1000, 5000));
            }
        }
    }

    componentWillUnmount() {
        window.removeEventListener("keydown", this.SpaceDown);
        window.removeEventListener("keyup", this.SpaceUp);
    }

    render() {
        return (
            <div id="PlayerDiv">
                [{this.state.state}] Player (Espace : {this.state.spacePressed ? "Oui" : "Non"})
                {this.state.state === playerState.Catching? 
                    <MiniJeu game={gameDict.TunaBar} space={this.state.spacePressed} Quit={this.QuitGame}/>
                    : <div></div>}
            </div>
        );
    }
}