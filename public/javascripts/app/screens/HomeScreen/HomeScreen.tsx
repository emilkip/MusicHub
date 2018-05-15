import * as React from 'react';
import {connect} from "react-redux";
import {MusicList, Search} from '../../components';
import {MusicService} from "../../services";
import {getMusic} from "../../actions/musicActions";
import {IMusic} from "../../common/interfaces";
import {IReduxAction} from "../../common/interfaces/CommonInterfaces";
import toast from '../../common/utils/toast';
import 'styleAlias/music-list.scss';



interface IProps {
    musicList: IMusic[]
    dispatch?(action: IReduxAction): void
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

        this.fetchMusicList = this.fetchMusicList.bind(this);

        if (!props.musicList.length) {
            this.fetchMusicList();
        }
    }

    async fetchMusicList() {
        try {
            const musicList = await MusicService.getAll();
            this.props.dispatch(getMusic(musicList.data));
        } catch (err) {
            toast.error(err.message || err);
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
