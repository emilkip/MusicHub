import * as React from 'react';
import {IMusic} from "../common/interfaces";
import {connect} from "react-redux";
import {IReduxAction} from "../common/interfaces/CommonInterfaces";
import toast from '../common/utils/toast';
import {playOne, pushMusicToQueue, changeMusicStatus} from '../actions/playerQueueActions'
import 'styleAlias/player.scss';

interface IProps {
    music: IMusic
    dispatch?: (action: IReduxAction) => void
}

interface IState extends IProps {
    playing: boolean
    playedMusic: {
        music: IMusic
        playing: boolean
    }
}


@(connect((state: any) => ({
    playedMusic: state.playerQueueReducer.playedMusic || {}
})) as any)
export class SingleMusicPlayer extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            music: props.music,
            playing: false,
            playedMusic: {} as any
        };

        this.togglePlay = this.togglePlay.bind(this);
        this.addToQueue = this.addToQueue.bind(this);
    }

    static getDerivedStateFromProps(nextProps: any, prevState: any) {
        return {
            music: nextProps.music,
            playedMusic: nextProps.playedMusic,
            playing: (nextProps.music._id === nextProps.playedMusic.music._id) ? nextProps.playedMusic.playing : false
        }
    }

    componentDidMount() {
        // this.props.dispatch(fetchPlayerStatus());
    }

    getCover(cover: string) {
        return `/images/cover/${(!cover ? 'music-placeholder.png' : cover + '/full')}`;
    }

    togglePlay() {
        if (!this.state.music || !this.state.music.filename) return;

        if (this.state.playedMusic.music._id === this.state.music._id) {
            return this.props.dispatch(changeMusicStatus(this.state.music, !this.state.playing));
        }

        this.props.dispatch(changeMusicStatus(this.state.music, true));
        this.props.dispatch(playOne(this.state.music));

        this.setState({
            playing: !this.state.playing
        });
    }

    addToQueue() {
        if (!this.state.music || !this.state.music.filename) return;
        this.props.dispatch(pushMusicToQueue(this.state.music));
        toast.success('Added to queue');
    }

    render() {
        const isObjectEmpty = !Object.keys(this.state.music).length;

        if (isObjectEmpty) {
            return (
                <div>
                    <span>Loading...</span>
                </div>
            );
        }

        return (
            <div className="d-flex justify-content-center">
                <div className="music-cont">
                    <div className="music-img">
                        <img src={this.getCover(this.state.music.album.cover)} alt="" />
                    </div>
                    <div className="music-meta-creator">
                        <span>{this.state.music.creator.username || 'Unknown'}</span>
                    </div>
                    <div className="music-meta-genre">
                        <span title={this.state.music.title || 'Unknown'}>{this.state.music.genre ? this.state.music.genre.title : 'Unknown'}</span>
                    </div>
                    <div className="music-inf">
                        <div className="music-info-table">
                            <div className="mit-title">{this.state.music.title || 'Unknown'}</div>
                            <div className="mit-other">{this.state.music.author.title || 'Unknown'}</div>
                            <div className="mit-other">{this.state.music.album.title || 'Unknown'}</div>
                        </div>
                        <div className="single-player-wrapper">
                            {
                                this.state.playing ?
                                    <div className="play-button" onClick={this.togglePlay}><img src="/images/equalizer.svg" /></div> :
                                    <div className="play-button" onClick={this.togglePlay}><span className="fa fa-play" /></div>
                            }
                            <div className="play-button" onClick={this.addToQueue}><span className="fa fa-plus" /></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
