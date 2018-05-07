import * as React from 'react';
import {Link} from 'react-router-dom';
import {IAlbum} from "../common/interfaces";
import 'styleAlias/music-list.scss';


interface IProps {
    album: IAlbum
}

export const AlbumListItem = (props: IProps) => {
    function getCover(cover: string) {
        return `/images/cover/${(!cover ? 'music-placeholder.png' : cover + '/thumbnail')}`;
    }

    return (
        <div className="music-list-item">
            <Link to={`/album/${props.album._id}`}>
                <div className="wrapper">
                    <img src={getCover(props.album.cover)} alt=""/>
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
