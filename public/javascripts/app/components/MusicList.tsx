import * as React from 'react';
import {Link} from 'react-router-dom';
import {MusicListItem} from './';
import {IMusic} from "../common/interfaces";
import 'styleAlias/music-list.scss';


interface IProps {
    musicList: IMusic[]
    includeAdding: boolean
}

interface IState {
    showAddBtn: boolean
    musicList: IMusic[]
    renderedList: JSX.Element[]
}


export class MusicList extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            showAddBtn: props.includeAdding || false,
            musicList: props.musicList || [],
            renderedList: []
        };
    }

    static getDerivedStateFromProps(nextProps: IProps, prevState: IState) {
        return {
            musicList: nextProps.musicList,
            renderedList: MusicList.renderMusicList(nextProps.musicList)
        };
    }

    static renderMusicList(list: IMusic[] = []): JSX.Element[] {
        return list.map((music: IMusic, i: number) => {
            const uKey: string = Math.random().toString(36).substr(2, 9);
            return (<MusicListItem key={uKey} music={music}/>);
        });
    }

    renderAddBtn() {
        return (
            <div className="music-list-item">
                <Link to="/create_music">
                    <div className="mi-wrapper add-music">
                        <i className="fa fa-plus"></i>
                        <p>New track</p>
                    </div>
                </Link>
            </div>
        );
    }

    render() {
        return (
            <div className="music-list">
                <div className="d-flex flex-wrap align-content-between">
                    {this.state.showAddBtn ? this.renderAddBtn() : ''}
                    {this.state.renderedList}
                </div>
            </div>
        );
    }
}
