import React from 'react';
import './Metronome.scss';

import beat1 from './sounds/beat1.wav';
import beat2 from './sounds/beat2.wav';

class Metronome extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            playing: false,
            count: 0,
            bpm: 100,
            beatsPerMeasure: 4
        };

        this.beat1 = new Audio(beat1);
        this.beat2 = new Audio(beat2);
    };

    handleBpmChange = event => {
        const bpm = event.target ? event.target.value : event;

        if (this.state.playing) {
            // Para o timer antigo e inicia um novo
            clearInterval(this.timer);
            this.timer = setInterval(this.playClick, (60 / bpm) *1000);

            // Seta o novo BPM e reseta o contador de batida
            this.setState({
                count: 0,
                bpm
            });
        } else {
            // Apena atualiza o BPM
            this.setState({ bpm });
        }


    };

    startStop = () => {
        if (this.state.playing) {
            // Para o timer
            clearInterval(this.timer);
            this.setState({
                playing: false
            });
        } else {
            // Inicia o timer com o BPM atual
            this.timer = setInterval(
                this.playClick, (60 / this.state.bpm) * 1000
            );
            this.setState(
                {
                    count: 0,
                    playing: true
                    // Reproduz o click imediatamente (Após o fim do setState)
                },
                this.playClick
            );
        }
    };

    playClick = () => {
        const { count, beatsPerMeasure } = this.state;

        // O primeiro bear terá um som diferente dos outros
        if (count % beatsPerMeasure === 0) {
            this.beat2.play();
        } else {
            this.beat1.play();
        }

        this.setState(state => ({
            count: (state.count + 1) % state.beatsPerMeasure
        }));
    };

    removeBpm = () => {
        let oldBpm = this.state.bpm;
        let newBpm = (parseInt(oldBpm) - 1);
        this.setState({
            bpm: newBpm
        });

        this.handleBpmChange(newBpm);
    };

    addBpm = () => {
        let oldBpm = this.state.bpm;
        let newBpm = (parseInt(oldBpm) + 1);
        this.setState({
            bpm: newBpm
        });

        this.handleBpmChange(newBpm);
    };

    render() {
        const { playing, bpm } = this.state;

        return (
            <div className="metronome-container">
                <div className="metronome">
                    <button className="ui-button" onClick={this.startStop}>
                        <i className="material-icons">{playing ? 'pause' : 'play_arrow'}</i>
                    </button>

                    <div className="bpm-slider">
                        <span>{bpm}
                            <span className="mini">BPM</span>
                        </span>

                        <div className="range-container">
                            <button className="mini-button" onClick={this.removeBpm}>
                                <i className="material-icons">remove</i>
                            </button>

                            <input type="range"
                                   min="60"
                                   max="240"
                                   value={bpm}
                                   onChange={this.handleBpmChange}/>

                            <button className="mini-button" onClick={this.addBpm}>
                                <i className="material-icons">add</i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
}

export default Metronome;