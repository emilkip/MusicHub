import * as React from 'react';
import {IMusic} from "../../common/interfaces";
import {connect} from "react-redux";
import {changeMusicStatus, playMusic} from "../../actions/playerActions";
import {EmptyListMsg} from "../../components/EmptyListMsg";
import 'styleAlias/player.scss';

interface IProps {
    opened: boolean
    dispatch?: (action: any) => void
}

interface IState {
    opened: boolean
    musicList: IMusic[]
    playedMusic: {
        music: IMusic
        playing: boolean
    }
}

@(connect((state: any) => ({
    musicList: state.playbackQueueReducer.musicList || [],
    playedMusic: state.playerReducer.playedMusic
})) as any)
export class QueueModal extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            opened: false,
            musicList: [],
            playedMusic: {} as any
        };

        this.renderModal = this.renderModal.bind(this);
        this.renderList = this.renderList.bind(this);
    }

    static getDerivedStateFromProps(nextProps: any, prevState: any) {
        return {
            ...nextProps,
            musicList: nextProps.musicList || [],
            playedMusic: nextProps.playedMusic
        };
    }

    togglePlay(music: IMusic, status: boolean) {
        if (this.state.playedMusic.music._id === music._id) {
            return this.props.dispatch(changeMusicStatus(music, status));
        }
        this.props.dispatch(playMusic(music));
    }

    renderList() {
        return this.state.musicList.map((_music) => {
            const uKey: string = Math.random().toString(36).substr(2, 9);
            const { music, playing } = this.state.playedMusic;

            return (
                <div key={uKey} className="queue-item">
                    {
                        (music._id === _music._id && playing) ?
                            <div className="play" onClick={() => this.togglePlay(_music, false)}><img src="/images/equalizer.svg" /></div> :
                            <div className="play" onClick={() => this.togglePlay(_music, true)}><span className="fa fa-play" /></div>
                    }
                    <div className="music-info">
                        <span className="title">{_music.title || '-'}</span>
                        <span className="author">{_music.author.title || '-'}</span>
                    </div>
                </div>
            );
        });
    }

    renderModal() {
        return (
            <div className="queue-modal">
                <h3>Queue</h3>
                <hr/>
                <div className="queue-modal-list">
                    {this.renderList()}
                    <EmptyListMsg message="Queue is empty" render={this.state.musicList.length === 0}/>
                </div>
            </div>
        );
    }

    render() {
        return (
            <div>
                {this.state.opened ? this.renderModal() : ''}
            </div>
        );
    }
}
