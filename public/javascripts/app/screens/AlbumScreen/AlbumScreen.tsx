import * as React from 'react';
import {IAlbum, IMusic} from "../../common/interfaces";
import {AlbumService} from "../../services";
import {Progress} from "../../components";
import 'styleAlias/album.scss';

const Sound = require('react-sound').default;


interface IState {
    album: IAlbum
    musicList: IMusic[]
    albumId: string
    currentMusic: any
    url?: string
    position?: number
    duration?: number
    volume?: number
    status?: string
    loaded?: number
}

export class AlbumScreen extends React.Component<any, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            album: {
                author: {}
            } as any,
            musicList: [],
            albumId: props.match.params.id,
            currentMusic: {},
            url: props.url,
            position: 0,
            duration: 0,
            volume: 50,
            loaded: 0,
            status: Sound.status.STOPPED
        };

        this.renderMusicList = this.renderMusicList.bind(this);
        this.fetchMusicForAlbum = this.fetchMusicForAlbum.bind(this);
        this.setPosition = this.setPosition.bind(this);
        this.handlePlaying = this.handlePlaying.bind(this);
        this.fetchMusicForAlbum();
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

    setPosition(value: number) {
        this.setState({
            position: this.state.duration / 100 * value
        });
    }

    handlePlaying(audio: any) {
        this.setState({
            position: audio.position,
            duration: audio.duration
        });
    }

    togglePlay(music: IMusic) {
        if (music._id === this.state.currentMusic._id) {
            this.setState({
                status: Sound.status.PAUSED
            });
        }
        this.setState({
            currentMusic: music,
            url: music.filename,
            position: 0,
            status: Sound.status.PLAYING
        });
    }

    renderMusicList() {
        return this.state.musicList.map((music) => {
            const uKey: string = Math.random().toString(36).substr(2, 9);
            return (
                <div key={uKey} className="album-music-item flex-row">

                    <img className="equalizer-icon" src="/images/equalizer.svg" alt="" onClick={() => this.togglePlay(music)}/>
                    <span>{music.title}</span>
                    <Progress status={this.state.status}
                              duration={this.state.duration}
                              position={this.state.position}
                              loaded={this.state.loaded}
                              setPosition={this.setPosition}/>
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
                    {this.renderMusicList()}
                </div>

                <Sound url={`/audio/${this.state.url}`}
                       volume={this.state.volume}
                       onPlaying={this.handlePlaying}
                       position={this.state.position}
                       playStatus={this.state.status}/>
            </div>
        );
    }
}
