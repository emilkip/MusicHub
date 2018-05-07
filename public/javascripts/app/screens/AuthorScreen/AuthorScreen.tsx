import * as React from 'react';
import {AlbumList, EmptyListMsg} from "../../components";
import {AuthorService} from "../../services";
import {IAlbum, IAuthor} from "../../common/interfaces";
import 'styleAlias/music-list.scss';

interface IState {
    author: IAuthor
    albums: IAlbum[]
    authorId: string
}

export class AuthorScreen extends React.Component<any, IState> {
    constructor(props: any) {
        super(props);

        this.state = {
            author: {} as any,
            albums: [],
            authorId: props.match.params.id
        };

        this.fetchAuthorAlbums = this.fetchAuthorAlbums.bind(this);
        this.renderList = this.renderList.bind(this);
        this.fetchAuthorAlbums();
    }

    async fetchAuthorAlbums() {
        try {
            const authorData: any = await AuthorService.getAlbumsForAuthor(this.state.authorId);

            this.setState({
                author: authorData.data.author || {},
                albums: authorData.data.albums.map((album: any) => {
                    album.author = authorData.data.author;
                    return album;
                })
            });
        } catch (err) {
            console.log(err);
        }
    }

    renderList() {
        if (!this.state.albums.length) {
            return (<EmptyListMsg message="No albums for author" render={true}/>);
        }
        return (<AlbumList albums={this.state.albums}/>);
    }

    render() {
        return (
            <div>
                <h1><span className="fa fa-"></span>{this.state.author.title}</h1>
                {this.renderList()}
            </div>
        );
    }
}
