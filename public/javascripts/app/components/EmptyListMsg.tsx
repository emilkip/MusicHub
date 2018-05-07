import * as React from 'react';
import 'styleAlias/common.scss';

interface IProps {
    message: string
    render?: boolean
}

export const EmptyListMsg = (props: IProps) => {
    if (!props.render) {
        return (<div></div>);
    }
    return (<div className="empty-list-msg">{props.message}</div>);
};
