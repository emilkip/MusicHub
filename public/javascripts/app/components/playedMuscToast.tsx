import * as React from 'react';

interface IProps {
    coverUrl: string
    title: string
    author: string
}

export const PlayedMusicToast = ({ coverUrl, title, author }: IProps) => {
    const getCover = (cover: string) => (`/images/cover/${(!cover ? 'music-placeholder.png' : cover + '/full')}`);

    return (
        <div className="played-music-toast">
            <div className="cover">
                <img src={getCover(coverUrl)} alt=""/>
            </div>
            <div className="info">
                <div className="title">{title}</div>
                <div className="author">{author}</div>
            </div>
        </div>
    );
};
