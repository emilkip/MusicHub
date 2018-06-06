import * as React from 'react';
import * as Modal from 'react-modal';
import toast from '../common/utils/toast';
import ModalStyle from '../common/styles/AddModalStyle'
import {AuthorService} from "../services";


interface IProps {
    isOpen: boolean
    onModalClose?: () => void
    onAuthorCreate?: (author: any) => void
}

interface IState extends IProps {
    authorName: string
}

Modal.setAppElement('#app');


export class AddAuthor extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            isOpen: props.isOpen,
            authorName: ''
        };

        this.closeModal = this.closeModal.bind(this);
        this.createAuthor = this.createAuthor.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.validate = this.validate.bind(this);
    }

    componentWillReceiveProps(props: IProps) {
        this.setState({
            isOpen: props.isOpen
        });
    }

    closeModal(): void {
        this.props.onModalClose();
    }

    validate() {
        if (!this.state.authorName.length || this.state.authorName.length > 50) {
            toast.warn('An author name should not be empty or longer than 50 symbols');
            return false;
        }
        return true;
    }

    async createAuthor() {
        if (!this.validate()) return;

        try {
            const newAuthor = await AuthorService.createAuthor({ title: this.state.authorName });
            this.props.onAuthorCreate(newAuthor.data);
            this.closeModal();
        } catch(err) {
            toast.error(err.response.data.message || err.response.data);
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
