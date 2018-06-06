import * as React from 'react';
import {IAlbum, IMusic} from "../../common/interfaces";
import {buildCoverUrl} from '../../common/utils/cover';
import {AlbumService} from "../../services";
import {connect} from "react-redux";
import 'styleAlias/album.scss';
import {EmptyListMsg, MusicList} from "../../components";

interface IProps {
    match: any
}

interface IState {
    album: IAlbum
    musicList: IMusic[]
    albumId: string
}

export class AlbumScreen extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            album: {
                author: {}
            } as any,
            musicList: [],
            albumId: props.match.params.id,
        };

        this.fetchMusicForAlbum = this.fetchMusicForAlbum.bind(this);
        this.fetchMusicForAlbum();
    }

    async fetchMusicForAlbum() {
        const musicData: any = await AlbumService.getMusicForAlbum(this.state.albumId);

        this.setState({
            album: musicData.data.album,
            musicList: musicData.data.musicList
        });
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
                                : <EmptyListMsg message="No music"/>
                        }
                    </div>
                </div>
            </div>
        );
    }
}
