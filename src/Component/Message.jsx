import { Component } from "react";
import "./Message.css"

export class Message extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div id="MessageDiv">
                <img id="ImagePoisson" src="https://img.freepik.com/photos-premium/visage-poisson-drole_1189466-5736.jpg?w=360" alt="Poisson"/>
                <span>Coucou, tu as choppé un poisson mon gars, Bravo !</span>
            </div>
        );
    }
}