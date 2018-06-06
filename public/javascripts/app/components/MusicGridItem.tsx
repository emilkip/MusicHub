import * as React from 'react';
import {IMusic} from "../common/interfaces";
import {buildCoverUrl} from '../common/utils/cover';
import {Link} from "react-router-dom";

import 'styleAlias/music-list.scss';

interface IMusicGridItemProps {
    music: IMusic
}

interface IMusicGridItemState {
    music: IMusic
}


export class MusicGridItem extends React.Component<IMusicGridItemProps, IMusicGridItemState> {
    constructor(props: IMusicGridItemProps) {
        super(props);
        this.state = {
            music: props.music
        };
    }

    render() {
        return (
            <div className="music-grid-item">
                <Link to={`/music/${this.state.music._id}`}>
                    <div className="wrapper">
                        <div className="genre">{this.state.music.genre ? this.state.music.genre.title : 'Unknown'}</div>
                        <img src={buildCoverUrl(this.state.music.album.cover, 'thumbnail')} alt=""/>
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
