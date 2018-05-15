import * as React from 'react';
import toast from '../../common/utils/toast';
import {SingleMusicPlayer} from '../../components/SingleMusicPlayer';
import {MusicService} from '../../services';
import {IMusic} from "../../common/interfaces";


interface IState {
    music: IMusic
    musicId: string
}

export class MusicScreen extends React.Component<any, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            music: {} as any,
            musicId: props.match.params.id
        };

        this.fetchMusic = this.fetchMusic.bind(this);
        this.fetchMusic(this.state.musicId);
    }

    componentDidCatch(error: Error) {
        toast.error(error.toString());
    }

    async fetchMusic(id: string) {
        try {
            const music = await MusicService.getByID(id);
            this.setState({
                music: music.data
            });
        } catch (err) {
            toast.error(err.response.data.message || err.response.data);
        }
    }

    render() {
        return (
            <div>
                <SingleMusicPlayer music={this.state.music}/>
            </div>
        );
    }
}
