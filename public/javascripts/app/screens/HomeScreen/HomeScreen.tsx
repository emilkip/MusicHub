import * as React from 'react';
import {connect} from "react-redux";
import {MusicList, Search} from '../../components';
import {IMusic} from "../../common/interfaces";
import {IReduxAction} from "../../common/interfaces/CommonInterfaces";
import 'styleAlias/music-list.scss';
import {fetchMusicList} from "../../thunkActions/musicActions";



interface IProps {
    musicList: IMusic[]
    dispatch?: (action: IReduxAction) => void
    fetchMusicList?: () => void
}

interface IState {
    musicList: IMusic[]
}

@(connect((state: any) => ({
    musicList: state.musicReducer.musicList
}), (dispatch: any) => ({
    fetchMusicList: () => dispatch(fetchMusicList())
})) as any)
export class HomeScreen extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            musicList: props.musicList || []
        };
    }

    componentDidMount() {
        if (!this.state.musicList.length) {
            this.props.fetchMusicList();
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
