import * as React from 'react';
import {connect} from "react-redux";
import {IAlbum, IMusic} from "../../common/interfaces";
import {buildCoverUrl} from '../../common/utils/cover';
import {EmptyListMsg} from '../../components/EmptyListMsg';
import {MusicList} from '../../components/MusicList';
import {clearCurrentAlbum} from "../../actions/albumActions";
import {fetchAlbum} from "../../thunkActions/albumActions";
import 'styleAlias/album.scss';

interface IProps {
    match: any
    fetchAlbum?: (id: string) => void
    clearCurrentAlbum?: () => void
}

interface IState {
    album: IAlbum
    musicList: IMusic[]
    albumId: string
}


@(connect((state: any) => ({
    album: state.albumReducer.currentAlbum.album,
    musicList: state.albumReducer.currentAlbum.musicList
}), (dispatch: any) => ({
    fetchAlbum: (id: string) => dispatch(fetchAlbum(id)),
    clearCurrentAlbum: () => dispatch(clearCurrentAlbum())
})) as any)
export default class AlbumScreen extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            album: {
                author: {}
            } as any,
            musicList: [],
            albumId: props.match.params.id,
        };
    }

    componentDidMount() {
        this.props.fetchAlbum(this.state.albumId);
    }

    componentWillUnmount() {
        this.props.clearCurrentAlbum();
    }

    static getDerivedStateFromProps(nextProps: any, prevState: any) {
        return {
            album: nextProps.album.author ? nextProps.album : prevState.album,
            musicList: nextProps.musicList || []
        };
    }

    render() {
        return (
            <div className="d-flex flex-row album-screen">
                <div className="album-screen-data">
                    <div className="album-cover">
                        <img src={buildCoverUrl(this.state.album.cover, 'full')} alt=""/>
                    </div>
                    <div className="album-info flex-column">
                        <h3>{this.state.album.title}</h3>
                        <span>{this.state.album.author.title}</span>
                    </div>
                </div>
                <div className="album-screen-music-list">
                    <h3>Track list</h3>
                    <div>
                        {
                            this.state.musicList.length
                                ? <MusicList type="list" musicList={this.state.musicList}/>
                                : <EmptyListMsg render={true} message="No music"/>
                        }
                    </div>
                </div>
            </div>
        );
    }
}
