import * as React from 'react';
import {IAlbum, IMusic} from "../../common/interfaces";
import {AlbumService} from "../../services";
import {connect} from "react-redux";
import 'styleAlias/album.scss';
import {changeMusicStatus, playOne} from "../../actions/playerQueueActions";

interface IProps {
    dispatch?: (action: any) => void
    match: any
    playedMusic: {
        music: IMusic
        playing: boolean
    }
}

interface IState {
    album: IAlbum
    musicList: IMusic[]
    albumId: string
    playedMusic: {
        music: IMusic
        playing: boolean
    }
}

@(connect((state: any) => ({
    musicList: state.playerQueueReducer.musicList || [],
    playedMusic: state.playerQueueReducer.playedMusic || {}
})) as any)
export class AlbumScreen extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            album: {
                author: {}
            } as any,
            musicList: [],
            albumId: props.match.params.id,
            playedMusic: {
                music: {} as any,
                playing: false
            }
        };

        this.renderMusicList = this.renderMusicList.bind(this);
        this.fetchMusicForAlbum = this.fetchMusicForAlbum.bind(this);
        this.fetchMusicForAlbum();
    }

    static getDerivedStateFromProps(nextProps: IProps, prevState: IState) {
        return {
            playedMusic: nextProps.playedMusic || {},
        }
    }

    async fetchMusicForAlbum() {
        const musicData: any = await AlbumService.getMusicForAlbum(this.state.albumId);

        this.setState({
            album: musicData.data.album,
            musicList: musicData.data.musicList
        });
    }

    getCover(cover: string) {
        return `/images/cover/${(!cover ? 'music-placeholder.png' : cover + '/full')}`;
    }

    togglePlay(music: IMusic) {
        if (!music || !music.filename) return;

        if (this.state.playedMusic.music._id === music._id) {
            return this.props.dispatch(changeMusicStatus(music, !this.state.playedMusic.playing));
        }
        this.props.dispatch(changeMusicStatus(music, true));
        this.props.dispatch(playOne(music));
    }

    renderMusicList() {
        return this.state.musicList.map((music) => {
            const uKey: string = Math.random().toString(36).substr(2, 9);
            return (
                <div key={uKey} className="album-music-item" onClick={() => this.togglePlay(music)}>
                    {
                        (music._id === this.state.playedMusic.music._id && this.state.playedMusic.playing) ?
                            <div className="play"><img src="/images/equalizer.svg" /></div> :
                            <div className="play"><span className="fa fa-play" /></div>
                    }
                    <div className="title">{music.title}</div>
                </div>
            );
        });
    }

    render() {
        return (
            <div className="d-flex flex-row album-screen">
                <div className="album-screen-data">
                    <div className="album-cover">
                        <img src={this.getCover(this.state.album.cover)} alt=""/>
                    </div>
                    <div className="album-info flex-column">
                        <h3>{this.state.album.title}</h3>
                        <span>{this.state.album.author.title}</span>
                    </div>
                </div>
                <div className="album-screen-music-list">
                    <h3>Track list</h3>
                    <div>
                        {this.renderMusicList()}
                    </div>
                </div>
            </div>
        );
    }
}
