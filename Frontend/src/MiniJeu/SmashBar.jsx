import { Component } from "react";
import "./SmashBar.css";

// props: space (booléen), Quit (fonction)
export class SmashBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            score: 50,
            lastSpace: false,
        };
        this.interval = null;
    }

    componentDidMount() {
        this.interval = setInterval(this.gameTick, 50);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    componentDidUpdate(prevProps) {
        // Détection du front montant (space: false -> true)
        if (!prevProps.space && this.props.space) {
            const newScore = Math.min(this.state.score + 5, 100);
            if (newScore >= 100) {
                clearInterval(this.interval);
                this.props.Quit(true);
            }
            this.setState({ score: newScore });
        }
    }

    gameTick = () => {
        const newScore = this.state.score - 1;
        if (newScore <= 0) {
            clearInterval(this.interval);
            this.props.Quit(false);
            this.setState({ score: 0 });
        } else {
            this.setState({ score: newScore });
        }
    };

    render() {
        const { score } = this.state;
        const percentage = `${score}%`;
        const color = `rgb(${255 - score * 2.55}, ${score * 2.55}, 0)`; // rouge à vert

        return (
            <div id="SmashBarDiv">
                <div className="progress-container">
                    <div
                        className="progress-fill"
                        style={{ width: percentage, backgroundColor: color }}
                    />
                </div>
                <p className="score-text">{score}</p>
            </div>
        );
    }
}
