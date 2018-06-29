import * as React from 'react';
import {connect} from "react-redux";
import {Progress} from '../player/Progress';
import {VolumeBar} from '../player/VolumeBar';
import {QueueModal} from '../player/QueueModal';
import {PlayedMusicToast} from '../playedMuscToast';
import {IMusic} from "../../common/interfaces";
import {buildCoverUrl} from '../../common/utils/cover';
import toast from '../../common/utils/toast';
import {changeMusicStatus, playNext, playPrev, toggleShuffle} from "../../actions/playerQueueActions";
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
    shuffle: boolean
}

@(connect((state: any) => ({
    playedMusic: state.playerQueueReducer.playedMusic
})) as any)
export default class GlobalPlayer extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            music: {
                author: {},
                album: {}
            } as any,
            url: '',
            position: 0,
            duration: 0,
            volume: 50,
            loaded: 0,
            status: Sound.status.STOPPED,
            playedMusic: {} as any,
            queueOpened: false,
            shuffle: false
        };

        this.playOrPause = this.playOrPause.bind(this);
        this.getPlayIcon = this.getPlayIcon.bind(this);
        this.handlePlaying = this.handlePlaying.bind(this);
        this.handleLoading = this.handleLoading.bind(this);
        this.handleFinish = this.handleFinish.bind(this);
        this.setPosition = this.setPosition.bind(this);
        this.setVolume = this.setVolume.bind(this);
        this.toggleQueueModal = this.toggleQueueModal.bind(this);
        this.playPrev = this.playPrev.bind(this);
        this.playNext = this.playNext.bind(this);
        this.toggleShuffle = this.toggleShuffle.bind(this);
    }

    static getDerivedStateFromProps(nextProps: any, prevState: any) {
        if (!nextProps.playedMusic.music.author || !nextProps.playedMusic.music.filename) {
            return prevState;
        }
        return {
            url: nextProps.playedMusic.music.filename,
            music: nextProps.playedMusic.music,
            status: nextProps.playedMusic.playing ? Sound.status.PLAYING : Sound.status.PAUSED,
            playedMusic: nextProps.playedMusic,
            position: prevState.position,
            duration: prevState.duration,
            loaded: prevState.loaded
        };
    }

    componentDidUpdate(prevProps: any, prevState: any) {
        if (prevState.status === Sound.status.PLAYING) return;

        toast.customTemplate(
            <PlayedMusicToast
                coverUrl={this.state.music.album.cover}
                title={this.state.music.title}
                author={this.state.music.author.title}/>,
            {
                hideProgressBar: true
            }
        );
    }

    handleLoading(loadingStatus: any) {
        const percentOfDuration: number = loadingStatus.duration / 100;
        const range: any = loadingStatus.buffered.find((_range: any) => this.state.position > _range.start && this.state.position < _range.end);

        if (!range) return;

        this.setState({
            loaded: range.end / percentOfDuration
        });
    }

    handlePlaying(audio: any) {
        this.setState({
            position: audio.position,
            duration: audio.duration,
        });
    }

    handleFinish() {
        this.setState({
            position: 0,
            duration: 0,
            loaded: 0,
            status: Sound.status.STOPPED
        });
        this.props.dispatch(playNext());
    }

    playPrev() {
        this.props.dispatch(playPrev());
    }

    playNext() {
        this.props.dispatch(playNext());
    }

    toggleShuffle() {
        this.setState({
                shuffle: !this.state.shuffle
            },
            () => this.props.dispatch(toggleShuffle(this.state.shuffle))
        );
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
                    <div className="step-button" onClick={this.playPrev}><i className="fa fa-step-backward"/></div>
                    <div className="global-player-button" onClick={this.playOrPause}><i
                        className={`fa ${this.getPlayIcon()}`}/></div>
                    <div className="step-button" onClick={this.playNext}><i className="fa fa-step-forward"/></div>
                    <div className={`additional-button ${this.state.shuffle ? 'active' : ''}`}
                         onClick={this.toggleShuffle}><i className="fa fa-random"/></div>
                </div>
                <div className="global-player-info">
                    <div className="cover">
                        <img src={buildCoverUrl(this.state.music.album.cover, 'thumbnail')} alt=""/>
                    </div>
                    <div className="info">
                        <div className="title">{this.state.music.author.title}</div>
                        <div className="author" title={this.state.music.title || 'Unknown'}>{this.state.music.title}</div>
                    </div>
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
                    <div className={`btn-white ${this.state.queueOpened ? 'active' : ''}`}
                         onClick={this.toggleQueueModal}>
                        <span className="fa fa-chevron-up"/>
                        <span>Playback queue</span>
                    </div>
                </div>

                <QueueModal opened={this.state.queueOpened}/>

                <Sound url={`/api/audio/${this.state.url}`}
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
