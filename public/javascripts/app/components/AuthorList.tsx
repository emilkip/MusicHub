import * as React from 'react';
import {Link} from 'react-router-dom';
import {IAuthor} from "../common/interfaces";
import 'styleAlias/author.scss'


interface IProps {
    authors: IAuthor[]
}

interface IState extends IProps {}


export class AuthorList extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            authors: props.authors || []
        };

        this.renderAuthorList = this.renderAuthorList.bind(this);
    }

    static getDerivedStateFromProps(nextProps: IProps, prevState: IState) {
        return {
            authors: nextProps.authors
        };
    }

    renderAuthorList() {
        return this.state.authors.map((author) => {
            const uKey: string = Math.random().toString(36).substr(2, 9);
            return (
                <Link to={`/author/${author._id}`} key={uKey}>
                    <div className="author-list-item">
                        <span>{author.title}</span>
                    </div>
                </Link>
            );
        });
    }

    render() {
        return (
            <div className="author-list">
                {this.renderAuthorList()}
            </div>
        );
    }
}
