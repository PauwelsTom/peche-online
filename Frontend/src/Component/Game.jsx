import { Component } from "react";
import "./Game.css"
import { gameDict, getSprite, playerState } from "../Data";
import { getRandom } from "../Functions";
import { MiniJeu } from "../MiniJeu/MiniJeu";
import { Message } from "./Message";
import { Connexion } from "./Connexion";

// space
export class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            state: playerState.Idle,
            spacePressed: false,
            MiniJeu: gameDict.None,
            timeSave: 0,
            token: null,
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

    //* Verifie lors du chargement de la page si le JWT est valide
    CheckTokenConnexion = () => {
        const stored = localStorage.getItem("authToken");
        if (!stored) return;

        fetch("http://localhost:3001/checkToken", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${stored}`
            }
        })
        .then(res => res.json().then(data => ({ ok: res.ok, body: data })))
        .then(({ ok, body }) => {
            if (ok && body.success) {
                console.log("Token valide, utilisateur :", body.user);
                this.setState({ token: stored });
                // Tu peux aussi restaurer le username depuis body.user.username
            } else {
                console.warn("Token invalide ou expiré");
                localStorage.removeItem("authToken");
                this.setState({ token: null });
            }
        })
        .catch(err => {
            console.error("Erreur réseau :", err);
            localStorage.removeItem("authToken");
            this.setState({ token: null });
        });
    };



    //! SPACE

    //* Gere l'appui sur la barre d'espace
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

    //* Espace appuye
    SpaceDown = (event) => {
        if (event.code === "Space") {
            if (!this.state.spacePressed) {
                this.setState({ spacePressed: true });
                this.handleSpace();
            }
        }
    }

    //* Espace relache
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

        this.CheckTokenConnexion();
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

        let connexion = <div></div>;
        if (this.state.token == null) {
            connexion = <Connexion Save={(t) => this.setState({token: t})}/>;
        }


        return (
            <div id="PlayerDiv">
                <img src={sprite} alt="Player" id="MainSprite"/>
                
                {jeu}

                {message}

                {connexion}

            </div>
        );
    }
}