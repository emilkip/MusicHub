import * as React from 'react';
import 'styleAlias/file-upload.scss';

interface IUploadProps {
    id: string
    label: string
    onFileUpload?: (event: any) => void
    params: object
}

interface IUploadState extends IUploadProps {
    filename: string
}


export class FileUpload extends React.Component<IUploadProps, IUploadState> {
    constructor(props: any) {
        super(props);

        this.state = {
            id: props.id,
            label: props.label,
            params: props.params,
            filename: ''
        };

        this.handleUpload = this.handleUpload.bind(this);
    }

    handleUpload(event: any) {
        this.setState({
            filename: event.target.files[0].name
        });
        this.props.onFileUpload(event);
    }

    render() {
        return (
            <div className="upload-component">
                <label htmlFor={this.state.id}>
                    <span className="fa fa-upload" />
                    <span>{this.state.label}</span>
                </label>
                <input type="file" name="file" id={this.state.id} {...this.state.params} onChange={this.handleUpload}/>
                <div>
                    { this.state.filename ? (<div className="upload-filename">{this.state.filename}</div>) : '' }
                </div>
            </div>
        );
    }
}
