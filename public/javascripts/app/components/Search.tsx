import * as React from 'react';
import {MusicService} from '../services';
import {connect} from "react-redux";
import toast from '../common/utils/toast';
import {putResults} from "../actions/searchAction";
import history from "../configs/history";
import {IReduxAction} from "../common/interfaces/CommonInterfaces";
import 'styleAlias/music-list.scss';


interface IState {
    query: string
    isRequested: boolean
}

interface IProps {
    dispatch?: (action: IReduxAction) => void
}


@(connect(() => ({})) as any)
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

    async search() {
        try {
            const results = await MusicService.searchAll(this.state.query);
            this.setState({isRequested: true});
            this.props.dispatch(putResults(results.data));
            history.push('/search_result');
        } catch (err) {
            toast.error(err.message || err);
        }
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
                    <button className="btn" onClick={this.search}><i className="fa fa-search"></i></button>
                </div>
            </div>
        );
    }
}
