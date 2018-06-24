import * as React from 'react';
import {IMusic, IPlaylist} from "../../common/interfaces";
import {buildCoverUrl} from "../../common/utils/cover";
import toast from "../../common/utils/toast";
import {PlaylistService} from "../../services";
import history from '../../configs/history';
import 'styleAlias/playlist.scss';
import {playMany} from "../../actions/playerQueueActions";
import {connect} from "react-redux";
import {fetchPlaylistDetails} from "../../thunkActions/playlistActions";
import {clearCurrentPlaylist} from "../../actions/playlistActions";


interface IProps {
    dispatch?: (action: any) => void
    fetchPlaylist?: (id: string) => void
    clearCurrentPlaylist?: () => void
}

interface IState {
    playlistId: string
    playlistInfo: IPlaylist
    musicList: IMusic[]
}

@(connect((state: any) => ({
    playlistInfo: state.playlistReducer.currentPlaylist.playlistInfo,
    musicList: state.playlistReducer.currentPlaylist.musicList
}), (dispatch: any) => ({
    fetchPlaylist: (id: string) => dispatch(fetchPlaylistDetails(id)),
    clearCurrentPlaylist: () => dispatch(clearCurrentPlaylist())
})) as any)
export default class PlaylistDetailScreen extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props);

        this.state = {
            playlistId: props.match.params.id,
            playlistInfo: {} as any,
            musicList: []
        };

        this.renderMusicList = this.renderMusicList.bind(this);
        this.play = this.play.bind(this);
    }

    componentDidMount() {
        this.props.fetchPlaylist(this.state.playlistId);
    }

    componentWillUnmount() {
        this.props.clearCurrentPlaylist();
    }

    static getDerivedStateFromProps(nextProps: any, prevState: any) {
        return {
            playlistInfo: nextProps.playlistInfo,
            musicList: nextProps.musicList || []
        };
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
