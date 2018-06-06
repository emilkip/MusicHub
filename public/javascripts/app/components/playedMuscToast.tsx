import * as React from 'react';
import {buildCoverUrl} from '../common/utils/cover';

interface IProps {
    coverUrl: string
    title: string
    author: string
}

export const PlayedMusicToast = ({ coverUrl, title, author }: IProps) => {
    return (
        <div className="played-music-toast">
            <div className="cover">
                <img src={buildCoverUrl(coverUrl, 'thumbnail')} alt=""/>
            </div>
            <div className="info">
                <div className="title">{title}</div>
                <div className="author">{author}</div>
            </div>
        </div>
    );
};
