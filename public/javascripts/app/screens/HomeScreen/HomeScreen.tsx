import * as React from 'react';
import {connect} from "react-redux";
import {MusicList, Search} from '../../components';
import {IMusic} from "../../common/interfaces";
import {IReduxAction} from "../../common/interfaces/CommonInterfaces";
import 'styleAlias/music-list.scss';



interface IProps {
    musicList: IMusic[]
    dispatch?: (action: IReduxAction) => void
}

interface IState {
    musicList: IMusic[]
}

@(connect((state: any) => ({
    musicList: state.musicReducer.musicList
})) as any)
export class HomeScreen extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            musicList: props.musicList || []
        };

        if (!props.musicList.length) {
            this.props.dispatch({ type: 'REQUEST_MUSIC_LIST' });
        }
    }

    static getDerivedStateFromProps(nextProps: any, prevState: any) {
        return {
            musicList: nextProps.musicList
        };
    }

    render() {
        return (
            <div>
                <Search/>
                <MusicList includeAdding={true} musicList={this.state.musicList}/>
            </div>
        );
    }
}
