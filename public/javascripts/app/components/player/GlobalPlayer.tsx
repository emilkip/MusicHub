import * as React from 'react';
import {Progress, VolumeBar, QueueModal} from '../';
import {connect} from "react-redux";
import {IMusic} from "../../common/interfaces";
import {changeMusicStatus} from "../../actions/playerActions";
import 'styleAlias/player.scss';

const Sound = require('react-sound').default;


interface IProps {
    dispatch?: (action: any) => void
}

interface IState {
    url: string
    position: number
    duration: number
    volume: number
    status: string
    loaded: number
    music: IMusic
    playedMusic: any
    queueOpened: boolean
}

@(connect((state: any) => ({
    music: state.playerReducer.music,
    playedMusic: state.playerReducer.playedMusic
})) as any)
export class GlobalPlayer extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            music: {
                author: {}
            } as any,
            url: '',
            position: 0,
            duration: 0,
            volume: 50,
            loaded: 0,
            status: Sound.status.STOPPED,
            playedMusic: {} as any,
            queueOpened: false
        };

        this.playOrPause = this.playOrPause.bind(this);
        this.getPlayIcon = this.getPlayIcon.bind(this);
        this.handlePlaying = this.handlePlaying.bind(this);
        this.handleLoading = this.handleLoading.bind(this);
        this.handleFinish = this.handleFinish.bind(this);
        this.setPosition = this.setPosition.bind(this);
        this.setVolume = this.setVolume.bind(this);
        this.toggleQueueModal = this.toggleQueueModal.bind(this);
    }

    static getDerivedStateFromProps(nextProps: any, prevState: any) {
        if (!nextProps.music.author || !nextProps.music.filename) {
            return prevState;
        }
        return {
            url: nextProps.music.filename,
            music: nextProps.music,
            status: nextProps.playedMusic.playing ? Sound.status.PLAYING : Sound.status.PAUSED,
            playedMusic: nextProps.playedMusic
        };
    }

    componentDidUpdate(prevProps: any, prevState: any) {
        if (this.state.music._id !== prevState.music._id) {
            return this.setState({
                position: 0,
                duration: 0,
                loaded: 0,
                status: Sound.status.PLAYING
            });
        }
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
        // this.props.dispatch(changeMusicStatus(this.state.music, !this.state.playedMusic.playing));
    }

    playOrPause() {
        this.props.dispatch(changeMusicStatus(this.state.music, !this.state.playedMusic.playing));
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

    toggleQueueModal() {
        this.setState({
            queueOpened: !this.state.queueOpened
        })
    }

    render() {
        return (
            <div className="global-player">
                <div className="global-player-controls">
                    <div className="global-player-button" onClick={this.playOrPause}><i className={`fa ${this.getPlayIcon()}`}></i></div>
                </div>
                <div className="global-player-info">
                    <div className="title">{this.state.music.author.title}</div>
                    <div title={this.state.music.title || 'Unknown'} className="author">{this.state.music.title}</div>
                </div>
                <div className="global-player-progress">
                    <Progress position={this.state.position}
                              status={this.state.status}
                              duration={this.state.duration}
                              loaded={this.state.loaded}
                              setPosition={this.setPosition}/>
                </div>
                <div className="global-player-volume-bar">
                    <VolumeBar volume={this.state.volume} setVolume={this.setVolume}/>
                </div>
                <div className="global-player-queue-btn">
                    <div className={`global-player-queue ${this.state.queueOpened ? 'active' : ''}`} onClick={this.toggleQueueModal}>
                        <span className="fa fa-chevron-up" />
                        <span>Playback queue</span>
                    </div>
                </div>

                <QueueModal opened={this.state.queueOpened}/>

                <Sound url={`/audio/${this.state.url}`}
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
