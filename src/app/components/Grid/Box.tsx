import * as React from 'react';
import * as cn from 'classnames';

const s = require('./style.css');

interface IFlexItemProps extends React.HTMLProps<HTMLElement> {
    o?: number;
    f?: string;
    a?: 'auto' | 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';
}

const getOrder = ({ o }: IFlexItemProps) => o ? {
    WebkitOrder: o,
    msFlexOrder: o,
    order: o
} : {};

const getFlex = ({ f = '0 1 auto' }: IFlexItemProps) => f !== '0 1 auto' ? {
    WebkitFlex: f,
    msFlex: f,
    flex: f
} : {};

const getMsAlign = (a: string) => ({
    ['flex-start']: 'start',
    ['flex-end']: 'end'
}[a] || a);

const getSelfAlign = ({ a = 'auto' }: IFlexItemProps) => a !== 'auto' ? {
    WebkitAlignSelf: a,
    msFlexItemAlign: getMsAlign(a),
    alignSelf: a
} : {};

export const Box: React.StatelessComponent<IFlexItemProps> = ({
    className = '',
    ...props
}: IFlexItemProps = {}) => <div
    style={ {
        ...getOrder(props),
        ...getFlex(props),
        ...getSelfAlign(props)
    } }
    className={ cn({
        [s.box]: true,
        [className]: !!className
    }) }
>
    { props.children }
</div>;
