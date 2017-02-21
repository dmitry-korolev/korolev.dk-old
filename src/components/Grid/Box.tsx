import * as cn from 'classnames';
import * as React from 'react';

const s = require('./style.css');

interface IFlexItemProps extends React.HTMLProps<HTMLElement> {
    o?: number; // Order
    f?: string; // Flex
    a?: 'auto' | 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch'; // Align
}

interface IFlexOrder {
    WebkitOrder?: number;
    msFlexOrder?: number;
    order?: number;
}

interface IFlex {
    WebkitFlex?: string;
    msFlex?: string;
    flex?: string;
}

interface IFlexAlign {
    WebkitAlignSelf?: string;
    msFlexItemAlign?: string;
    alignSelf?: string;
}

const getOrder = ({ o }: IFlexItemProps): IFlexOrder => o ? {
    WebkitOrder: o,
    msFlexOrder: o,
    order: o
} : {};

const getFlex = ({ f = '0 1 auto' }: IFlexItemProps): IFlex => f !== '0 1 auto' ? {
    WebkitFlex: f,
    msFlex: f,
    flex: f
} : {};

const getMsAlign = (a: string): string => ({
    ['flex-start']: 'start',
    ['flex-end']: 'end'
}[a] || a);

const getSelfAlign = ({ a = 'auto' }: IFlexItemProps): IFlexAlign => a !== 'auto' ? {
    WebkitAlignSelf: a,
    msFlexItemAlign: getMsAlign(a),
    alignSelf: a
} : {};

const Box: React.StatelessComponent<IFlexItemProps> = ({
    className = '',
    ...props
}: IFlexItemProps = {}): JSX.Element => <div
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

Box.displayName = 'Box';

export { Box };
