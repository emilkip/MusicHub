import * as React from 'react';
import {IAlbum} from "../common/interfaces";
import {AlbumListItem} from "../components";
import 'styleAlias/music-list.scss';


interface IProps {
    albums: IAlbum[]
}

interface IState extends IProps {
}


export class AlbumList extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            albums: props.albums || []
        };

        this.renderAlbumsList = this.renderAlbumsList.bind(this);
    }

    static getDerivedStateFromProps(nextProps: IProps, prevState: IState) {
        return {
            albums: nextProps.albums
        };
    }

    renderAlbumsList() {
        return this.state.albums.map((album) => {
            const uKey: string = Math.random().toString(36).substr(2, 9);
            return (<AlbumListItem key={uKey} album={album}/>);
        });
    }


    render() {
        return (
            <div className="music-list">
                <div className="d-flex flex-wrap align-content-between">
                    {this.renderAlbumsList()}
                </div>
            </div>
        );
    }
}
