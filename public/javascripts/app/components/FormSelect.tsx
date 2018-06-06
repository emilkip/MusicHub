import * as React from 'react';

interface IProps {
    type?: string
    valueField?: string
    labelField?: string
    options: any[]
    onSelect: (event: any) => void
}

interface IState {
    type: string
    valueField: string
    labelField: string
    options: any[]
    renderedOptions: JSX.Element[]
}


export class FormSelect extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            type: props.type,
            options: props.options || [],
            valueField: props.valueField,
            labelField: props.labelField,
            renderedOptions: [],
        };
    }

    componentDidMount() {
        this.setState({
            renderedOptions: FormSelect.renderOptions(this.props.options, this.state.valueField, this.state.labelField)
        });
    }

    static getDerivedStateFromProps(nextProps: IProps, prevState: IState) {
        return {
            options: nextProps.options || [],
            renderedOptions: FormSelect.renderOptions(nextProps.options, nextProps.valueField, nextProps.labelField)
        }
    }

    static renderOptions(options: any[], valueField: string, labelField: string): JSX.Element[] {
        return options.map((option: any, i: number) => {
            if (!valueField) return (<option key={i} value={option}>{option}</option>);

            return (<option key={i} value={option[valueField]}>{option[labelField]}</option>);
        });
    }

    render() {
        return (
            <div className="form-select">
                <select id={this.props.type} onChange={this.props.onSelect}>
                    <option value="">Select {this.state.type || 'option'}</option>
                    {this.state.renderedOptions}
                </select>
            </div>
        );
    }
}
