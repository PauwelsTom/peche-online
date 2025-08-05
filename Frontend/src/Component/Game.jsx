import { Component } from "react";
import "./Game.css"
import { gameDict, getSprite, playerState } from "../Data";
import { getRandom } from "../Functions";
import { MiniJeu } from "../MiniJeu/MiniJeu";
import { Message } from "./Message";

// space
export class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            state: playerState.Idle,
            spacePressed: false,
            MiniJeu: gameDict.None,
            timeSave: 0,
        };
    }


    //* Fonction qui ferme la fenetre de minijeu
    QuitGame = (win) => {
        this.setState({MiniJeu: gameDict.None});

        if (win) {
            this.QuitMessage(0, 10);
            this.setState({state: playerState.Message});
        } else {
            this.setState({state: playerState.Idle});
        }
    }


    //* Fonction qui ferme la fenetre de message
    QuitMessage = (time, timeStep) => {
        this.setState({timeSave: time});
        setTimeout(() => {
            if (time >= 1000) {
                this.setState({
                    state: playerState.Idle,
                });
            } else if (this.state.spacePressed) {
                this.QuitMessage(time + timeStep, timeStep);
            } else {
                this.QuitMessage(0, timeStep);
            }
        }, timeStep);
    }


    //* Fonction qui gere l'apparition du poisson
    // TODO: Rendre les temps de catch, et les temps d'attentes modulables en fonction du poisson
    HandleFishingTimer = (time=null) => {
        if (time == null) {
            time = getRandom(1000, 5000);
        } else if (time <= 0) {
            //? On passe en mode biting pour 0.5 secondes
            this.setState({ state: playerState.Biting });
            setTimeout(() => {
                if (this.state.state === playerState.Fishing) {
                    this.setState({ state: playerState.Idle });
                }
            }, 500);
        }
        setTimeout(() => {
            if (this.state.state === playerState.Fishing) {
                this.HandleFishingTimer(time - 50);
            }
        }, 50);
    }


    //! SPACE

    handleSpace = () => {
        switch (this.state.state) {
            case playerState.Idle:
                this.setState({ 
                    state: playerState.Fishing,
                });
                break;

            case playerState.Fishing:
                this.setState({ 
                    state: playerState.Idle
                });
                break;
                
            case playerState.Biting:
                this.setState({ 
                    MiniJeu: gameDict.SmashBar,
                    state: playerState.Catching,
                });
                break;
                    
            case playerState.Catching:
                break;
            
            default:
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


    //! COMPONENT MANAGEMENT

    componentDidMount() {
        window.addEventListener("keydown", this.SpaceDown);
        window.addEventListener("keyup", this.SpaceUp);
    }

    componentWillUnmount() {
        window.removeEventListener("keydown", this.SpaceDown);
        window.removeEventListener("keyup", this.SpaceUp);
    }

    componentDidUpdate(prevProps, prevState) {
        // Si l'état du player change
        if (prevState.state !== this.state.state) {
            if (this.state.state === playerState.Fishing) {
                this.HandleFishingTimer();
            }
        }
    }


    render() {
        const sprite = getSprite(this.state.state);

        //? On recupere le MiniJeu s'il y en a un
        let jeu = <div></div>;
        if (this.state.state === playerState.Catching) {
            jeu =<MiniJeu game={this.state.MiniJeu} space={this.state.spacePressed} Quit={this.QuitGame}/>;
        }

        //? On recupere le Message s'il y en a un
        let message = <div></div>;
        if (this.state.state === playerState.Message) {
            message = <Message time={this.state.timeSave}/>;
        }


        return (
            <div id="PlayerDiv">
                <img src={sprite} alt="Player" id="MainSprite"/>
                
                {jeu}

                {message}
            </div>
        );
    }
}