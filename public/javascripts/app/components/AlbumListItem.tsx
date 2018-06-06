import * as React from 'react';
import {Link} from 'react-router-dom';
import {IAlbum} from "../common/interfaces";
import {buildCoverUrl} from '../common/utils/cover';
import 'styleAlias/music-list.scss';


interface IProps {
    album: IAlbum
}

export const AlbumListItem = (props: IProps) => {
    return (
        <div className="music-grid-item">
            <Link to={`/album/${props.album._id}`}>
                <div className="wrapper">
                    <img src={buildCoverUrl(props.album.cover, 'thumbnail')} alt=""/>
                    <div className="opacity-block"></div>
                    <div className="info">
                        <div className="title">{props.album.title}</div>
                        <div className="author">{props.album.author.title}</div>
                    </div>
                </div>
            </Link>
        </div>
    );
};
