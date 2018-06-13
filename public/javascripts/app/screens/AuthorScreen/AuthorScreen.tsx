import * as React from 'react';
import {AlbumList, EmptyListMsg} from "../../components";
import {IAlbum, IAuthor} from "../../common/interfaces";
import 'styleAlias/music-list.scss';
import {connect} from "react-redux";
import {fetchAuthor} from "../../thunkActions/authorActions";
import {clearCurrentAuthor} from "../../actions/authorActions";

interface IProps {
    fetchAuthor?: (id: string) => void
    clearCurrentAuthor?: () => void
}

interface IState {
    author: IAuthor
    albums: IAlbum[]
    authorId: string
}


@(connect((state: any) => ({
    author: state.authorReducer.currentAuthor.author,
    albums: state.authorReducer.currentAuthor.albums
}), (dispatch: any) => ({
    fetchAuthor: (id: string) => dispatch(fetchAuthor(id)),
    clearCurrentAuthor: () => dispatch(clearCurrentAuthor())
})) as any)
export class AuthorScreen extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props);

        this.state = {
            author: {} as any,
            albums: [],
            authorId: props.match.params.id
        };

        this.renderList = this.renderList.bind(this);
    }

    componentDidMount() {
        this.props.fetchAuthor(this.state.authorId);
    }

    componentWillUnmount() {
        // this.props.clearCurrentAuthor();
    }

    static getDerivedStateFromProps(nextProps: any, prevState: any) {
        return {
            author: nextProps.author,
            albums: nextProps.albums
        };
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
