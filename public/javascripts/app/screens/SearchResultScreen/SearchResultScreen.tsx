import * as React from 'react';
import {connect} from "react-redux";
import {clearResults} from '../../actions/searchAction';
import {MusicList} from '../../components/MusicList';
import {AlbumList} from '../../components/AlbumList';
import {AuthorList} from '../../components/AuthorList';
import {Playlists} from '../../components/Playlists';
import {Search} from '../../components/Search';
import {EmptyListMsg} from '../../components/EmptyListMsg';
import {IAuthor, IMusic, IAlbum, IPlaylist} from "../../common/interfaces";
import {IReduxAction, ISearchResults} from "../../common/interfaces/CommonInterfaces";
import 'styleAlias/music-list.scss';


interface IProps {
    results: ISearchResults
    dispatch?: (action: IReduxAction) => void
}

interface IState {
    musicList: IMusic[]
    playlists: IPlaylist[]
    albums: IAlbum[]
    authors: IAuthor[]
}


@(connect((state: any) => ({
    results: state.searchResultReducer
})) as any)
export default class SearchResultScreen extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            musicList: props.results.musicList || [],
            playlists: props.results.playlists || [],
            albums: props.results.albums || [],
            authors: props.results.authors || []
        }
    }

    static getDerivedStateFromProps(nextProps: IProps, prevState: IState) {
        return {
            musicList: nextProps.results.musicList,
            playlists: nextProps.results.playlists,
            albums: nextProps.results.albums,
            authors: nextProps.results.authors
        };
    }

    componentWillUnmount() {
        this.props.dispatch(clearResults())
    }

    render() {
        return (
            <div>
                <Search/>
                <h2>Search results:</h2>
                <div>
                    <h3>Tracks</h3>
                    <MusicList includeAdding={false} musicList={this.state.musicList}/>
                    <EmptyListMsg message="No tracks" render={this.state.musicList.length === 0}/>
                </div>
                <hr/>
                <div>
                    <h3>Play lists</h3>
                    <Playlists playlists={this.state.playlists}/>
                    <EmptyListMsg message="No play lists" render={this.state.playlists.length === 0}/>
                </div>
                <hr/>
                <div>
                    <h3>Albums</h3>
                    <AlbumList albums={this.state.albums}/>
                    <EmptyListMsg message="No albums" render={this.state.albums.length === 0}/>
                </div>
                <hr/>
                <div>
                    <h3>Authors</h3>
                    <AuthorList authors={this.state.authors}/>
                    <EmptyListMsg message="No authors" render={this.state.authors.length === 0}/>
                </div>
            </div>
        );
    }
}

