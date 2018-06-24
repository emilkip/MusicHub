import * as React from 'react';
import {connect} from 'react-redux';
import toast from '../common/utils/toast';
import {FileUpload} from './FileUpload';
import {AddAuthor} from './AddAuthor';
import {AddAlbum} from './AddAlbum';
import {FormSelect} from './FormSelect';
import {createMusic, fetchGenres} from "../thunkActions/musicActions";
import {clearAlbums} from "../actions/albumActions";
import {fetchAlbumsForAuthor, fetchAuthors} from "../thunkActions/authorActions";
import {IReduxAction} from "../common/interfaces/CommonInterfaces";
import {IAuthor, IGenre, IAlbum, INewMusic} from "../common/interfaces";
import 'styleAlias/music-create.scss';


interface IProps {
    dispatch?: (action: IReduxAction) => void
    createMusic?: (music: INewMusic) => void
    fetchGenres?: () => void
    fetchAuthors?: () => void
    fetchAlbumsForAuthor?: (authorId: string) => void
    clearAlbums?: () => void
}

interface IState {
    isAuthorModalOpen: boolean
    isAlbumModalOpen: boolean
    authors: IAuthor[]
    albums: IAlbum[]
    genres: IGenre[]
    newMusic: INewMusic
}


@(connect((state: any) => ({
    authors: state.authorReducer.authors,
    genres: state.musicReducer.genres,
    albums: state.albumReducer.currentAlbums
}), (dispatch: any) => ({
    createMusic: (music: INewMusic) => dispatch(createMusic(music)),
    fetchGenres: () => dispatch(fetchGenres()),
    fetchAuthors: () => dispatch(fetchAuthors()),
    fetchAlbumsForAuthor: (authorId: string) => dispatch(fetchAlbumsForAuthor(authorId)),
    clearAlbums: () => dispatch(clearAlbums())
})) as any)
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
                audio_file: undefined
            }
        };

        this.initData = this.initData.bind(this);
        this.toggleAuthorModal = this.toggleAuthorModal.bind(this);
        this.toggleAlbumModal = this.toggleAlbumModal.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onAuthorCreate = this.onAuthorCreate.bind(this);
        this.validate = this.validate.bind(this);
        this.createTrack = this.createTrack.bind(this);
    }

    componentDidMount() {
        this.initData();
    }

    componentWillUnmount() {
        this.props.clearAlbums();
    }

    static getDerivedStateFromProps(nextProps: any, prevState: any) {
        return {
            authors: nextProps.authors || [],
            genres: nextProps.genres || [],
            albums: nextProps.albums || []
        };
    }

    initData() {
        this.props.fetchAuthors();
        this.props.fetchGenres();
    }

    validate() {
        if (!this.state.newMusic.title.length || this.state.newMusic.title.length > 100) {
            toast.warn('A title should not be empty or longer than 100 symbols');
            return false;
        }
        if (!this.state.newMusic.author.length) {
            toast.warn('Choose author');
            return false;
        }
        if (!this.state.newMusic.album.length) {
            toast.warn('Choose album');
            return false;
        }
        if (!this.state.newMusic.genre.length) {
            toast.warn('Choose genre');
            return false;
        }
        if (!this.state.newMusic.audio_file) {
            toast.warn('Choose audio file to upload');
            return false;
        }
        return true;
    }

    createTrack() {
        if (!this.validate()) return;

        this.props.createMusic(this.state.newMusic);
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
            this.props.fetchAlbumsForAuthor(event.target.value);
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
                <div className="d-flex flex-column">
                    <h3>Create music</h3>
                    <div className="music-create">
                        <div className="form-group">
                            <input type="text" className="form-control" id="title" placeholder="Title"
                                   onChange={this.handleChange}/>
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
                                <button className="btn-black" onClick={this.toggleAuthorModal}>
                                    <i className="fa fa-plus"/>Add author
                                </button>
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
                                <button className="btn-black" onClick={this.toggleAlbumModal}><i
                                    className="fa fa-plus"/>Add album
                                </button>
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
                        <button className="btn-black" onClick={this.createTrack}>Create</button>
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
