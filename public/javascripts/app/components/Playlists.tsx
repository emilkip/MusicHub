import * as React from 'react';
import {IPlaylist} from "../common/interfaces";
import 'styleAlias/common.scss';
import history from "../configs/history";


interface IProps {
    playlists: IPlaylist[]
}

interface IState extends IProps {}


export class Playlists extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            playlists: props.playlists || []
        };

        this.renderPlaylists = this.renderPlaylists.bind(this);
    }

    static getDerivedStateFromProps(nextProps: IProps, prevState: IState) {
        return {
            playlists: nextProps.playlists || []
        };
    }

    renderPlaylists() {
        return this.state.playlists.map((item: any) => {
            const uKey: string = Math.random().toString(36).substr(2, 9);
            return (
                <div key={uKey} className="list-of-playlist-item" onClick={() => history.push(`/playlist/${item._id}`)}>
                    <div className="list-of-playlist-owner">{item.owner.username}</div>
                    <div className="list-of-playlist-title">{item.title}</div>
                    {item.count ? <div className="list-of-playlist-count">Music count: {item.count}</div> : ''}
                </div>
            );
        });
    }

    render() {
        return (
            <div className="list-of-playlist">
                {this.renderPlaylists()}
            </div>
        );
    }
}
