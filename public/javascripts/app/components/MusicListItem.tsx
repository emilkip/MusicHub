import * as React from 'react';
import {IMusic} from "../common/interfaces";
import {Link} from "react-router-dom";

import 'styleAlias/music-list.scss';

interface IMusicListItemProps {
    music: IMusic
}

interface IMusicListItemState {
    music: IMusic
}


export class MusicListItem extends React.Component<IMusicListItemProps, IMusicListItemState> {
    constructor(props: IMusicListItemProps) {
        super(props);
        this.state = {
            music: props.music
        };
    }

    getCover(cover: string) {
        return `/images/cover/${(!cover ? 'music-placeholder.png' : cover + '/thumbnail')}`;
    }

    render() {
        return (
            <div className="music-list-item">
                <Link to={`/music/${this.state.music._id}`}>
                    <div className="wrapper">
                        <div className="genre">{this.state.music.genre ? this.state.music.genre.title : 'Unknown'}</div>
                        <img src={this.getCover(this.state.music.album.cover)} alt=""/>
                        <div className="opacity-block"></div>
                        <div className="info">
                            <div className="title">{this.state.music.title}</div>
                            <div className="author">{this.state.music.author.title}</div>
                            <div className="album">{this.state.music.album.title}</div>
                        </div>
                    </div>
                </Link>
            </div>
        );
    }
}
