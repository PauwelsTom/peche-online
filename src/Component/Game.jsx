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
            poisson: false,
            MiniJeu: gameDict.None,
            timeSave: 0,
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

            case playerState.Message:
                document.getElementById("PlayerDiv").style.backgroundColor = "green";
                break;
            
            default:
                break;
        }
    }

    QuitGame = (win) => {
        this.setState({MiniJeu: gameDict.None});

        if (win) {
            this.QuitMessage(0, 10);
            this.setState({state: playerState.Message});
        } else {
            this.setState({state: playerState.Idle});
        }
    }

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


    //! SPACE

    handleSpace = () => {
        switch (this.state.state) {
            case playerState.Idle:
                this.setState({ 
                    state: playerState.Fishing,
                    poisson: false,
                });
                break;

            case playerState.Fishing:
                this.setState({ 
                    state: playerState.Idle
                });
                break;
                
            case playerState.Biting:
                this.setState({ 
                    MiniJeu: gameDict.TunaBar,
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
        this.updateColor(); // pour appliquer la couleur initiale
    }

    componentWillUnmount() {
        window.removeEventListener("keydown", this.SpaceDown);
        window.removeEventListener("keyup", this.SpaceUp);
    }

    componentDidUpdate(prevProps, prevState) {
        // Si l'état du player change, mettre à jour la couleur
        if (prevState.state !== this.state.state) {
            this.updateColor();
            if (this.state.state === playerState.Fishing) {
                setTimeout(() => {
                    this.setState({ poisson: true, state: playerState.Biting }, () => {this.updateColor()});
                    setTimeout(() => {
                        if (this.state.state === playerState.Fishing) {
                            this.setState({ poisson: false, state: playerState.Idle }, () => {this.updateColor()});
                        }
                    }, 500);
                }, getRandom(1000, 5000));
            }
        }
    }


    render() {
        const sprite = getSprite(this.state.state);

        return (
            <div id="PlayerDiv">
                <img src={sprite} alt="Player" id="MainSprite"/>
                {/* [{this.state.state}] Player (Espace : {this.state.spacePressed ? "Oui" : "Non"}) */}
                
                {this.state.state === playerState.Catching? 
                    <MiniJeu game={this.state.MiniJeu} space={this.state.spacePressed} Quit={this.QuitGame}/>
                    : <div></div>}

                {this.state.state === playerState.Message?
                    <Message time={this.state.timeSave}/>
                    : <div></div>
                }
            </div>
        );
    }
}