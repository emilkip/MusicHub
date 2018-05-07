import * as React from 'react';
import * as Modal from 'react-modal';
import * as toastr from 'toastr';
import ModalStyle from '../common/styles/AddModalStyle'
import {AuthorService} from "../services";


interface IAddAuthorProps {
    isOpen: boolean
    onModalClose?: () => void
    onAuthorCreate?: (author: any) => void
}

interface IAddAuthorState extends IAddAuthorProps {
    authorName: string
}

Modal.setAppElement('#app');


export class AddAuthor extends React.Component<IAddAuthorProps, IAddAuthorState> {
    constructor(props: IAddAuthorProps) {
        super(props);
        this.state = {
            isOpen: props.isOpen,
            authorName: ''
        };

        this.closeModal = this.closeModal.bind(this);
        this.createAuthor = this.createAuthor.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillReceiveProps(props: IAddAuthorProps) {
        this.setState({
            isOpen: props.isOpen
        });
    }

    closeModal(): void {
        this.props.onModalClose();
    }

    async createAuthor() {
        try {
            const newAuthor = await AuthorService.createAuthor({ title: this.state.authorName });
            this.props.onAuthorCreate(newAuthor.data);
            this.closeModal();
        } catch(err) {
            toastr.error(err.response.data.message || err.response.data);
        }
    }

    handleChange(event: any) {
        const changes: any = {};
        changes[event.target.id] = event.target.value;
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
                        <h3>New author</h3>
                    </div>
                    <div className="col-md-2">
                        <i className="fa fa-times" onClick={this.closeModal}/>
                    </div>
                </div>
                <hr/>
                <div className="col">
                    <div className="form-group">
                        <input type="text"
                               className="form-control"
                               id="authorName"
                               placeholder="Author name"
                               value={this.state.authorName}
                               onChange={this.handleChange}/>
                    </div>
                    <div className="btn-black" onClick={this.createAuthor}>Create</div>
                </div>
            </Modal>
        );
    }
}
