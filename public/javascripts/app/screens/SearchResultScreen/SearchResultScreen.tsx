import * as React from 'react';
import {connect} from "react-redux";
import {clearResults} from '../../actions/searchAction';
import {MusicList, AlbumList, AuthorList, Search, EmptyListMsg} from "../../components";
import {IAuthor, IMusic, IAlbum} from "../../common/interfaces";
import {IReduxAction, ISearchResults} from "../../common/interfaces/CommonInterfaces";
import 'styleAlias/music-list.scss';


interface IProps {
    results: ISearchResults
    dispatch?(action: IReduxAction): void
}

interface IState {
    musicList: IMusic[]
    albums: IAlbum[]
    authors: IAuthor[]
}


@(connect((state: any) => {
    return {
        results: state.searchResultReducer
    }
}) as any)
export class SearchResultScreen extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            musicList: props.results.musicList || [],
            albums: props.results.albums || [],
            authors: props.results.authors || []
        }
    }

    static getDerivedStateFromProps(nextProps: IProps, prevState: IState) {
        return {
            musicList: nextProps.results.musicList,
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

