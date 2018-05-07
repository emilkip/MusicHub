import * as React from 'react';
import {Progress, VolumeBar} from '../';
import 'styleAlias/player.scss';

const Sound = require('react-sound').default;


interface IState {
    url: string
    position: number
    duration: number
    volume: number
    status: string
    loaded: number
}


export class Player extends React.Component<any, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            url: props.url,
            position: 0,
            duration: 0,
            volume: 50,
            loaded: 0,
            status: Sound.status.STOPPED
        };

        this.playOrPause = this.playOrPause.bind(this);
        this.stopTack = this.stopTack.bind(this);
        this.forward = this.forward.bind(this);
        this.backward = this.backward.bind(this);
        this.getPlayIcon = this.getPlayIcon.bind(this);
        this.handlePlaying = this.handlePlaying.bind(this);
        this.handleLoading = this.handleLoading.bind(this);
        this.handleFinish = this.handleFinish.bind(this);
        this.setPosition = this.setPosition.bind(this);
        this.setVolume = this.setVolume.bind(this);
    }

    handleLoading(loadingStatus: any) {
        this.setState({
            loaded: Math.floor(loadingStatus.bytesLoaded * 100)
        });
    }

    handlePlaying(audio: any) {
        this.setState({
            position: audio.position,
            duration: audio.duration,
        });
    }

    handleFinish() {
        this.stopTack();
    }

    playOrPause() {
        this.setState({
            status: this.state.status !== Sound.status.PLAYING ? Sound.status.PLAYING : Sound.status.PAUSED
        });
    }

    stopTack() {
        this.setState({
            status: Sound.status.STOPPED,
            position: 0
        });
    }

    forward() {
        this.setState({
            position: this.state.position + 10000
        });
    }

    backward() {
        this.setState({
            position: this.state.position - 10000
        });
    }

    getPlayIcon() {
        return this.state.status === Sound.status.PLAYING ? 'fa-pause' : 'fa-play';
    }

    setPosition(value: number) {
        this.setState({
            position: this.state.duration / 100 * value
        });
    }

    setVolume(value: number) {
        this.setState({
            volume: value
        });
    }

    render() {
        return (
            <div className="d-flex">
                <div className="main-player-type flex-column">
                    <div className="player-control d-flex justify-content-between">
                        <div>
                            <div className="player-control-btn-big" onClick={this.playOrPause}><span className={`fa ${this.getPlayIcon()}`}></span></div>
                            <div className="player-control-btn-big" onClick={this.stopTack}><span className="fa fa-stop"></span></div>
                            <div className="player-control-btn-big" onClick={this.backward}><span className="fa fa-backward"></span></div>
                            <div className="player-control-btn-big" onClick={this.forward}><span className="fa fa-forward"></span></div>
                        </div>
                        <div>
                            <VolumeBar volume={this.state.volume} setVolume={this.setVolume}/>
                        </div>
                    </div>
                    <Progress position={this.state.position}
                              status={this.state.status}
                              duration={this.state.duration}
                              loaded={this.state.loaded}
                              setPosition={this.setPosition}/>
                </div>
                <Sound url={this.state.url}
                       volume={this.state.volume}
                       onPlaying={this.handlePlaying}
                       onFinishedPlaying={this.handleFinish}
                       onLoading={this.handleLoading}
                       position={this.state.position}
                       playStatus={this.state.status}/>
            </div>
        );
    }
}
