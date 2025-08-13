import "./Connexion.css";
import { Component } from "react";

// Save
export class Connexion extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            register: false,
        };
    }


    connect = () => {
        const username = document.getElementById("IdInput").value;
        const password = document.getElementById("passwordInput").value;
        const confirm = document.getElementById("confirmInput").value;

        if (!username || !password) {
            this.setState({ error: "Identifiant et mot de passe requis." });
            return;
        }

        if (this.state.register && password !== confirm) {
            this.setState({ error: "Les mots de passe ne correspondent pas." });
            return;
        }

        const url = "http://localhost:3001" + (this.state.register ? "/register" : "/login");

        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        })
            .then(res => res.json().then(data => ({ status: res.status, ok: res.ok, body: data })))
            .then(({ status, ok, body }) => {
                if (!ok) {
                    alert("Probleme lors de la connexion...");
                    this.setState({ error: body.message || body.error || "Erreur inconnue" });
                    return;
                }

                if (this.state.register) {
                    alert("Inscription réussie, vous pouvez vous connecter.");
                    this.setState({ register: false, error: "Inscription réussie, vous pouvez vous connecter." });
                } else {
                    const token = body.token;
                    if (token) {
                        localStorage.setItem("authToken", token);
                        this.props.Save(token);
                    }
                }
            })
            .catch(err => {
                this.setState({ error: "Erreur réseau : " + err.message });
            });
    }


    toggleRegister = () => {
        this.setState({register: !this.state.register});
    }

    
    render() {
        return (
            <div id="ConnexionDiv">
                <span id="ConnexionTitle">{this.state.register? "Inscription" : "Connexion"}</span>

                <div className="champsConnexion" id="IdentifiantDiv">
                    <span>Identifiant</span>
                    <input id="IdInput" type='text' />
                </div>

                <div className="champsConnexion" id="MotDePasseDiv">
                    <span>Mot de passe</span>
                    <input id="passwordInput" type='password' />
                </div>

                <div id="ConfirmationDiv" className={this.state.register ? "visible" : "hidden"}>
                    <span>Confirmation mot de passe</span>
                    <input id="confirmInput" type='password' />
                </div>

                <u id="gotoRegister" onClick={this.toggleRegister}>Je n'ai pas encore de compte</u>
                <div onClick={this.connect}>{this.state.register? "Inscription" : "Connexion"}</div>
            </div>
        );
    }
}