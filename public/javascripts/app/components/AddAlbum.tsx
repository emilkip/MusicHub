import * as React from 'react';
import * as Modal from 'react-modal';
import toast from '../common/utils/toast';
import {AlbumService} from "../services";
import ModalStyle from '../common/styles/AddModalStyle'
import {FormSelect} from "./FormSelect";
import {FileUpload} from "./FileUpload";


interface IProps {
    authors: any[]
    isOpen: boolean
    onModalClose?: () => void
}

interface IState extends IProps {
    newAlbum: {
        title: string
        author: string
        cover_file: any
    }
}

Modal.setAppElement('#app');



export class AddAlbum extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            isOpen: props.isOpen,
            authors: props.authors,
            newAlbum: {
                title: '',
                author: '',
                cover_file: undefined
            }
        };

        this.closeModal = this.closeModal.bind(this);
        this.createAlbum = this.createAlbum.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.validate = this.validate.bind(this);
    }

    componentWillReceiveProps(props: IProps) {
        this.setState({
            authors: props.authors,
            isOpen: props.isOpen
        });
    }

    closeModal() {
        this.props.onModalClose();
    }

    validate() {
        if (!this.state.newAlbum.title.length || this.state.newAlbum.title.length > 50) {
            toast.warn('An album name should not be empty or longer than 50 symbols');
            return false;
        }
        if (!this.state.newAlbum.author) {
            toast.warn('Choose author');
            return false;
        }
        return true;
    }

    async createAlbum() {
        if (!this.validate()) return;

        try {
            await AlbumService.createAlbum(this.state.newAlbum);
            this.closeModal();
        } catch(err) {
            toast.error(err.message || err);
        }
    }

    handleChange(event: any) {
        const changes: any = {
            ...this.state
        };
        if (event.target.id === 'cover_file') {
            changes.newAlbum[event.target.id] = event.target.files[0];
        } else {
            changes.newAlbum[event.target.id] = event.target.value;
        }
        this.setState(changes);
    }

    render() {
        return (
            <Modal isOpen={this.state.isOpen}
                   shouldCloseOnOverlayClick={true}
                   shouldCloseOnEsc={true}
                   style={ModalStyle}>
                <div className="row align-items-center">
                    <div className="col-md-10 justify-content-start">
                        <h3>New album</h3>
                    </div>
                    <div className="col-md-2">
                        <button className="fa fa-times" onClick={this.closeModal}/>
                    </div>
                </div>
                <hr/>
                <div className="col">
                    <div className="form-group">
                        <input type="text"
                               className="form-control"
                               id="title"
                               placeholder="Album name"
                               value={this.state.newAlbum.title}
                               onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <FormSelect options={this.state.authors} valueField="_id" labelField="title" type="author" onSelect={this.handleChange}/>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <FileUpload id="cover_file" onFileUpload={this.handleChange} params={{accept: "image/*"}} label="Select image" />
                        </div>
                    </div>
                    <button className="btn-black" onClick={this.createAlbum}>Create</button>
                </div>
            </Modal>
        );
    }
}
