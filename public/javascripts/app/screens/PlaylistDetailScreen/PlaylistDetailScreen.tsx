import * as React from 'react';
import {IMusic, IPlaylist} from "../../common/interfaces";
import {buildCoverUrl} from "../../common/utils/cover";
import toast from "../../common/utils/toast";
import {PlaylistService} from "../../services";
import history from '../../configs/history';
import 'styleAlias/playlist.scss';
import {playMany} from "../../actions/playerQueueActions";
import {connect} from "react-redux";


interface IProps {
    dispatch?: (action: any) => void
}

interface IState {
    playlistId: string
    playlistInfo: IPlaylist
    musicList: IMusic[]
}

@(connect() as any)
export class PlaylistDetailScreen extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props);

        this.state = {
            playlistId: props.match.params.id,
            playlistInfo: {} as any,
            musicList: []
        };

        this.renderMusicList = this.renderMusicList.bind(this);
        this.fetchPlaylist = this.fetchPlaylist.bind(this);
        this.play = this.play.bind(this);

        this.fetchPlaylist();
    }

    // static getDerivedStateFromProps(nextProps: any, prevState: any) {
    //     return {
    //         playlistInfo: playlist.data.playlist,
    //         musicList: playlist.data.musicList || []
    //     };
    // }

    async fetchPlaylist() {
        try {
            const playlist: any = await PlaylistService.getPlaylist(this.state.playlistId);

            this.setState({
                playlistInfo: playlist.data.playlist,
                musicList: playlist.data.musicList || []
            });
        } catch (err) {
            toast.error(err.response.data.message || err.response.data);
        }
    }

    play() {
        const musicList = this.state.musicList.map((item: any) => item.music);
        this.props.dispatch(playMany(musicList));
    }

    renderMusicList() {
        return this.state.musicList.map((item: any) => {
            const uKey: string = Math.random().toString(36).substr(2, 9);
            return (
                <div key={uKey} className="item-music" onClick={() => history.push(`/music/${item.music._id}`)}>
                    <div className="cover">
                        <img src={buildCoverUrl(item.music.album.cover, 'thumbnail')} alt=""/>
                    </div>
                    <div className="data">
                        <div className="title">{item.music.title}</div>
                        <div className="author">{item.music.title}</div>
                    </div>
                </div>
            );
        });
    }

    render() {
        return (
            <div className="playlists">
                <div className="playlist-header">
                    <div>
                        <h3>{this.state.playlistInfo.title}</h3>
                        <p>Music count: {this.state.musicList.length}</p>
                    </div>
                    <div className="btn-black" onClick={this.play}>
                        <i className="fa fa-play" /><span>Play</span>
                    </div>
                </div>
                <div className="list">
                    {this.renderMusicList()}
                </div>
            </div>
        );
    }
}
