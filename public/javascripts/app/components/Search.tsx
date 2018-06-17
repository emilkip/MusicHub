import * as React from 'react';
import {connect} from "react-redux";
import {IReduxAction} from "../common/interfaces/CommonInterfaces";
import {search} from "../thunkActions/searchActions";
import 'styleAlias/music-list.scss';


interface IState {
    query: string
    isRequested: boolean
}

interface IProps {
    dispatch?: (action: IReduxAction) => void
    search?: (query: string) => void
}


@(connect(
    () => ({}),
    (dispatch: any) => ({
        search: (query: string) => dispatch(search(query))
    })
) as any)
export class Search extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            query: '',
            isRequested: false
        };

        this.search = this.search.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    search() {
        this.props.search(this.state.query);
        this.setState({ isRequested: true });
    }

    handleInput(event: any): void {
        this.setState({
            query: event.target.value
        });
    }

    shouldComponentUpdate(nextProps: any, nextState: any) {
        return nextState.isRequested;
    }

    render() {
        return (
            <div className="form-row">
                <div className="col-auto">
                    <input type="text" className="form-control" placeholder="Search" onChange={this.handleInput}/>
                </div>
                <div className="col-auto">
                    <button className="btn" onClick={this.search}><i className="fa fa-search" /></button>
                </div>
            </div>
        );
    }
}
