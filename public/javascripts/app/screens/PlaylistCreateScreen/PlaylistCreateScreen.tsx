import * as React from 'react';
import {IMusic} from "../../common/interfaces";
import {EmbeddedMusicSearch} from "../../components/EmbeddedMusicSearch";
import PlaylistService from "../../services/PlaylistService";
import history from '../../configs/history';
import toast from "../../common/utils/toast";
import {FormSelect} from "../../components";

interface IState {
    title: string
    type: string
    musicList: IMusic[]
}

export class PlaylistCreateScreen extends React.Component<any, IState> {

    constructor(props: any) {
        super(props);

        this.state = {
            title: '',
            type: 'public',
            musicList: []
        };

        this.onMusicSelect = this.onMusicSelect.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.renderList = this.renderList.bind(this);
        this.remove = this.remove.bind(this);
        this.reset = this.reset.bind(this);
        this.save = this.save.bind(this);
    }

    handleChange(event: any) {
        const changes: any = {};
        changes[event.target.id] = event.target.value;
        this.setState(changes);
    }

    onMusicSelect(music: IMusic) {
        this.setState({
            musicList: [...this.state.musicList, music]
        });
    }

    remove(musicId: string = '') {
        this.setState({
            musicList: this.state.musicList.filter((music) => music._id !== musicId)
        });
    }

    reset() {
        this.setState({
            title: '',
            musicList: []
        });
    }

    save() {
        return PlaylistService
            .cratePlaylist({
                title: this.state.title,
                type: this.state.type,
                musicIds: this.state.musicList.map((music) => music._id)
            })
            .then(() => {
                toast.success('Playlist successfully created');
                history.push('/playlists');
            })
            .catch((err) => {
                toast.error(err.response.data.message || err.response.data);
            });
    }

    renderList() {
        return this.state.musicList.map((music) => {
            const uKey: string = Math.random().toString(36).substr(2, 9);
            return (
                <div key={uKey} className="item">
                    <div><b>{music.author.title}</b> - {music.title}</div>
                    <div>
                        <div className="remove" onClick={() => this.remove(music._id)}>
                            <i className="fa fa-times" title="Remove from playlist"/>
                        </div>
                    </div>
                </div>
            );
        })
    }

    render() {
        return (
            <div className="playlist-create">
                <div className="playlist-create-header">
                    <h3>Create playlist</h3>
                    <div className="d-flex flex-row">
                        <div className="btn-white mr-3" onClick={this.reset}>
                            <i className="fa fa-trash"/><span>Reset</span>
                        </div>
                        <div className="btn-black" onClick={this.save}>
                            <i className="fa fa-check"/><span>Save</span>
                        </div>
                    </div>
                </div>

                <div className="d-flex flex-column flex-md-row">
                    <div className="playlist-form">
                        <div>
                            <div className="form-group">
                                <input type="text" className="form-control" id="title" placeholder="Title" value={this.state.title}
                                       onChange={this.handleChange}/>
                            </div>
                        </div>

                        <FormSelect type="type" options={['public', 'private']} onSelect={this.handleChange}/>

                        <EmbeddedMusicSearch onSelect={this.onMusicSelect}/>

                        <div className="list">
                            {this.renderList()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
