import * as React from 'react';
import {connect} from "react-redux";
import {Link} from 'react-router-dom';
import {MusicGridItem} from './MusicGridItem';
import {IMusic} from "../common/interfaces";
import {MusicListItem} from "./MusicListItem";
import {changeMusicStatus, playOne} from "../actions/playerQueueActions";
import {IReduxAction} from "../common/interfaces/CommonInterfaces";
import 'styleAlias/music-list.scss';


interface IProps {
    dispatch?: (action: IReduxAction) => void
    musicList: IMusic[]
    includeAdding?: boolean
    type?: string
    playedMusic?: {
        music: IMusic
        playing: boolean
    }
}

interface IState {
    showAddBtn: boolean
    musicList: IMusic[]
    type: string
    playedMusic: {
        music: IMusic
        playing: boolean
    }
}

@(connect((state: any) => ({
    playedMusic: state.playerQueueReducer.playedMusic || {}
})) as any)
export class MusicList extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            showAddBtn: props.includeAdding || false,
            musicList: props.musicList || [],
            type: props.type || 'grid',
            playedMusic: {
                music: {} as any,
                playing: false
            }
        };

        this.renderMusicList = this.renderMusicList.bind(this);
    }

    static getDerivedStateFromProps(nextProps: IProps, prevState: IState) {
        return {
            musicList: nextProps.musicList,
            playedMusic: nextProps.playedMusic,
        };
    }

    togglePlay(music: IMusic) {
        if (!music || !music.filename) return;

        if (this.state.playedMusic.music._id === music._id) {
            return this.props.dispatch(changeMusicStatus(music, !this.state.playedMusic.playing));
        }
        this.props.dispatch(changeMusicStatus(music, true));
        this.props.dispatch(playOne(music));
    }

    renderMusicList(list: IMusic[] = []): any {
        return this.state.musicList.map((music: IMusic) => {
            const uKey: string = Math.random().toString(36).substr(2, 9);

            if (this.state.type === 'grid') return (<MusicGridItem key={uKey} music={music}/>);
            if (this.state.type === 'list') return (<MusicListItem key={uKey} music={music}
                                                                   onPlay={(music) => this.togglePlay(music)}
                                                                   playedMusic={this.state.playedMusic}/>);

            return (<div>Loading...</div>);
        });
    }

    renderAddBtn() {
        return (
            <div className="music-grid-item">
                <Link to="/create_music">
                    <div className="mi-wrapper add-music">
                        <i className="fa fa-plus"/>
                        <p>New track</p>
                    </div>
                </Link>
            </div>
        );
    }

    render() {
        return (
            <div className="music-list">
                <div className="d-flex flex-wrap align-content-between">
                    {this.state.showAddBtn ? this.renderAddBtn() : ''}
                    {this.renderMusicList()}
                </div>
            </div>
        );
    }
}
