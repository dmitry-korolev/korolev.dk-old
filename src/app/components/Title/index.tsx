import * as React from 'react';

interface IProps extends React.HTMLProps<HTMLElement> {
    tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export const Title: React.StatelessComponent<IProps> = (props: IProps) => {
    const {
        tag: Component = 'h2',
        children,
        ...htmlProps
    } = props;

    return <Component
        { ...htmlProps }
    >
        { children }
    </Component>;
};
