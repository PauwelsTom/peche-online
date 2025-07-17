import { Component } from "react";
import "./Message.css";

// props: time (0 à 1000)
export class Message extends Component {
    render() {
        const radius = 25;
        const stroke = 5;
        const normalizedRadius = radius - stroke * 2;
        const circumference = normalizedRadius * 2 * Math.PI;

        const progress = Math.min(this.props.time / 1000, 1); // 0 → 1
        const strokeDashoffset = circumference - progress * circumference;

        return (
            <div id="MessageDiv">
                <svg height={radius * 2} width={radius * 2} className="progress-ring">
                    <circle
                        stroke="#d3d3d3"
                        fill="transparent"
                        strokeWidth={stroke}
                        r={normalizedRadius}
                        cx={radius}
                        cy={radius}
                    />
                    <circle
                        stroke="#4caf50"
                        fill="transparent"
                        strokeWidth={stroke}
                        strokeLinecap="round"
                        strokeDasharray={`${circumference} ${circumference}`}
                        strokeDashoffset={strokeDashoffset}
                        r={normalizedRadius}
                        cx={radius}
                        cy={radius}
                        className="progress-ring__circle"
                    />
                </svg>
                <img id="ImagePoisson" src="https://img.freepik.com/photos-premium/visage-poisson-drole_1189466-5736.jpg?w=360" alt="Poisson"/>
                <span>Coucou, tu as choppé un poisson mon gars, Bravo !</span>
            </div>
        );
    }
}
