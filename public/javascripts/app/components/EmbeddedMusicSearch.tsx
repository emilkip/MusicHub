import * as React from 'react';
import {IMusic} from "../common/interfaces";
import MusicService from "../services/MusicService";
import toast from "../common/utils/toast";
import 'styleAlias/embedded-music-search.scss';

interface IProps {
    onSelect: (music: IMusic) => void
}

interface IState {
    musicList: IMusic[]
    inputTimeout: any
}


export class EmbeddedMusicSearch extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            musicList: [],
            inputTimeout: null
        };

        this.handleInput = this.handleInput.bind(this);
        this.searchMusic = this.searchMusic.bind(this);
        this.renderResults = this.renderResults.bind(this);
        this.onMusicSelect = this.onMusicSelect.bind(this);
    }

    handleInput(event: any) {
        const query: string = event.target.value;

        if (!query) {
            return this.setState({
                musicList: []
            });
        }

        clearTimeout(this.state.inputTimeout);

        this.setState({
            inputTimeout: setTimeout(() => this.searchMusic(query), 500)
        });
    }

    searchMusic(query: string) {
        MusicService.searchMusic(query)
            .then((result) => {
                this.setState({
                    musicList: result.data || []
                });
            })
            .catch((err) => {
                toast.error(err.message || err);
            });
    }

    onMusicSelect(music: IMusic) {
        this.props.onSelect(music);
        this.setState({
            musicList: []
        });
    }

    renderResults() {
        return this.state.musicList.map((music) => {
            const uKey: string = Math.random().toString(36).substr(2, 9);
            return (
                <div key={uKey} className="item">
                    <div><b>{music.author.title}</b> - {music.title}</div>
                    <div>
                        <div className="add" onClick={() => this.onMusicSelect(music)}>
                            <i className="fa fa-plus" title="Add to playlist"/>
                        </div>
                    </div>
                </div>
            );
        });
    }

    render() {
        return (
            <div className="embedded-search-music">
                <div className="embedded-search-music-input">
                    <input type="text" className="form-control" id="title" placeholder="Search music..."
                           onChange={this.handleInput}/>
                </div>
                <div className="embedded-search-music-results">
                    {this.renderResults()}
                </div>
            </div>
        );
    }
}
