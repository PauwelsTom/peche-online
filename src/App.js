import { Component } from 'react';
import './App.css';
import { Game } from './Component/Game';

class  App extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div className="App">
                <Game />
            </div>
        );
    }
}

export default App;
