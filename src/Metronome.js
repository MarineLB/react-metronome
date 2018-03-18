// Import react, styles, audio
import React, { Component } from 'react';
import './Metronome.css';
import click1 from './click1.wav';
import click2 from './click2.wav';

//Create the Metronome component
class Metronome extends Component {
    //constructor function to instanciate state and audios
    constructor(props){
        super(props)

        // Component state on application start
        this.state = {
            playing: false,
            count: 0,
            bpm: 100,
            beatsPerMeasure: 4
        };

        // Create Audio objects with the files Webpack loaded,
        // and we'll play them later.
        this.click1 = new Audio(click1);
        this.click2 = new Audio(click2);
    }

    handleBpmChange = event => {
        const bpm = event.target.value;

        if(this.state.playing){
            //Stop the timer and start a new one
            clearInterval(this.timer);
            this.timer = setInterval(this.playClick, (60 / bpm ) * 1000);

            //set the new BPM and reset the beat counter
            this.setState({
                count: 0,
                // equals bpm: bpm
                bpm
            });
        } else {
            // just update the bpm
            this.setState({ bpm });
        }
    }

    playClick = () => {
        const { count, beatsPerMeasure } = this.state;

        // The frst beat will have a different sound
        count % beatsPerMeasure === 0 ? this.click2.play() : this.click1.play();

        //Keep track of which beat we're on
        this.setState(state => ({
            count: (state.count + 1) % state.beatsPerMeasure
        }))
    }

    startStop = () => {
        if(this.state.playing){
            //Stop the timer
            clearInterval(this.timer);
            this.setState({
                playing: false
            });
        } else {
            //Start a timer with the current bpm
            this.timer = setInterval(this.playClick, (60 / this.state.bpm) * 1000);
            this.setState({
                count: 0,
                playing: true,
                // play a click immediately after setState finishes
            }, this.playClick)
        }
    }

    render() {
        const { playing, bpm } = this.state;

        return (
            <div className="metronome">
                <div className="bpm-slider">
                    <div>{bpm} BPM</div>
                    <input type="range" min="60" max="240" value={bpm} onChange={this.handleBpmChange}/>
                </div>
                <button onClick={this.startStop} className={playing ? 'playing' : ''}>
                    {playing ? 'Stop' : 'Start'}
                </button>
            </div>

        );
    }
}

export default Metronome;


