import * as React from 'react';
import {connect} from 'react-redux';
import toast from '../common/utils/toast';
import {FileUpload, AddAuthor, AddAlbum, FormSelect} from "./";
import {createMusic} from "../actions/musicActions";
import {IReduxAction} from "../common/interfaces/CommonInterfaces";
import {IAuthor, IGenre, IAlbum} from "../common/interfaces";
import {AuthorService, GenreService, MusicService} from "../services";
import 'styleAlias/music-create.scss';

import history from "../configs/history";

interface IProps {
    dispatch?(action: IReduxAction): void
}

interface IState {
    isAuthorModalOpen: boolean
    isAlbumModalOpen: boolean
    authors: IAuthor[]
    albums: IAlbum[]
    genres: IGenre[]
    newMusic: {
        title: string
        author: string
        album: string
        genre: string
        file: any
    }
}


@(connect() as any)
export class MusicForm extends React.PureComponent<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            isAuthorModalOpen: false,
            isAlbumModalOpen: false,
            authors: [],
            albums: [],
            genres: [],
            newMusic: {
                title: '',
                author: '',
                album: '',
                genre: '',
                file: undefined
            }
        };

        this.initData = this.initData.bind(this);
        this.fetchAlbumsForAuthor = this.fetchAlbumsForAuthor.bind(this);
        this.toggleAuthorModal = this.toggleAuthorModal.bind(this);
        this.toggleAlbumModal = this.toggleAlbumModal.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onAuthorCreate = this.onAuthorCreate.bind(this);
        this.createTrack = this.createTrack.bind(this);
    }

    componentDidMount() {
        this.initData();
    }

    fetchInitialData(): Promise<any> {
        return Promise.all([
            AuthorService.getAuthors(),
            GenreService.getGenres()
        ]);
    }

    async initData() {
        try {
            const fetchedData = await this.fetchInitialData();
            this.setState({
                authors: fetchedData[0].data || [],
                genres: fetchedData[1].data || []
            });
        } catch (err) {
            toast.error(err.response.data.message || err.response.data);
        }
    }

    async fetchAlbumsForAuthor(authorId: string) {
        try {
            const response = await AuthorService.getAlbumsForAuthor(authorId);
            this.setState({
                albums: response.data.albums
            });
        } catch (err) {
            toast.error(err.response.data.message || err.response.data);
        }
    }

    async createTrack() {
        try {
            const createdTrack = await MusicService.create(this.state.newMusic);
            this.props.dispatch(createMusic(createdTrack.data));
            history.push('/');
        } catch (err) {
            toast.error(err.response.data.message || err.response.data);
        }
    }

    toggleAuthorModal() {
        this.setState({isAuthorModalOpen: !this.state.isAuthorModalOpen})
    }

    toggleAlbumModal() {
        this.setState({isAlbumModalOpen: !this.state.isAlbumModalOpen})
    }

    handleChange(event: any) {
        const changes: any = {
            ...this.state
        };
        if (event.target.id === 'audio_file') {
            changes.newMusic[event.target.id] = event.target.files[0];
        } else {
            changes.newMusic[event.target.id] = event.target.value;
        }
        this.setState(changes);

        if (event.target.id === 'author' && event.target.value) {
            this.fetchAlbumsForAuthor(event.target.value);
        }
    }

    onAuthorCreate(author: any) {
        this.setState({
            authors: [...this.state.authors, author]
        });
    }

    render() {
        return (
            <div>
                <div className="d-flex justify-content-center">
                    <div className="music-create">
                        <div className="col">
                            <h2>New track</h2>
                            <div className="col">
                                <div className="form-group">
                                    <input type="text" className="form-control" id="title" placeholder="Title"
                                           onChange={this.handleChange}/>
                                </div>
                            </div>
                            <div className="row justify-content-between align-items-center">
                                <div className="form-group col-md-7">
                                    <FormSelect options={this.state.authors}
                                                valueField="_id"
                                                labelField="title"
                                                type="author"
                                                onSelect={this.handleChange}/>
                                </div>
                                <div className="row col-md-5 justify-content-end">
                                    <div className="btn-black" onClick={this.toggleAuthorModal}><i
                                        className="fa fa-plus"/>Add author
                                    </div>
                                </div>
                            </div>
                            <div className="row justify-content-between align-items-center">
                                <div className="col-md-7">
                                    <div className="form-group">
                                        <FormSelect options={this.state.albums}
                                                    valueField="_id"
                                                    labelField="title"
                                                    type="album"
                                                    onSelect={this.handleChange}/>
                                    </div>
                                </div>
                                <div className="row col-md-5 justify-content-end">
                                    <div className="btn-black" onClick={this.toggleAlbumModal}><i
                                        className="fa fa-plus"/>Add album
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-7">
                                    <div className="form-group">
                                        <FormSelect options={this.state.genres}
                                                    valueField="_id"
                                                    labelField="title"
                                                    type="genre"
                                                    onSelect={this.handleChange}/>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <FileUpload id="audio_file" onFileUpload={this.handleChange}
                                                params={{accept: "audio/*"}}
                                                label="Select track"/>
                                </div>
                            </div>
                            <div className="btn-black" onClick={this.createTrack}>Create</div>
                        </div>
                    </div>
                </div>
                <AddAuthor isOpen={this.state.isAuthorModalOpen} onModalClose={this.toggleAuthorModal}
                           onAuthorCreate={this.onAuthorCreate}/>
                <AddAlbum isOpen={this.state.isAlbumModalOpen} authors={this.state.authors}
                          onModalClose={this.toggleAlbumModal}/>
            </div>
        );
    }
}
