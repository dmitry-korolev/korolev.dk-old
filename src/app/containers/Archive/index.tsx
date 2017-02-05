import * as React from 'react';

// Components
// import { PostList } from 'components';

interface IProps extends React.HTMLProps<HTMLElement> {
    test: string;
}

export class Archive extends React.PureComponent<IProps, any> {

    public render() {
        return (
            <section />
        );
    }
}
