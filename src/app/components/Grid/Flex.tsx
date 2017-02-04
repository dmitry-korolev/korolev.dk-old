import * as React from 'react';
import * as classNames from 'classnames';

const s = require('./style.css');

interface IFlexContainerProps extends React.HTMLProps<HTMLElement> {
    is?: string;
    d?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
    w?: 'nowrap' | 'wrap' | 'wrap-reverse';
    j?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around';
    ai?: 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';
    ac?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'stretch';
}

const getDirection = ({ d = 'row' }: IFlexContainerProps) => d !== 'row' ? {
    WebkitFlexDirection: d,
    msFlexDirection: d,
    flexDirection: d
} : {};

const getWrap = ({ w = 'nowrap' }: IFlexContainerProps) => w !== 'nowrap' ? {
    WebkitFlexWrap: w,
    msFlexWrap: w,
    flexWrap: w
} : {};

const getMsJustify = (j: string) => ({
    ['flex-end']: 'end',
    ['space-between']: 'justify',
    ['space-around']: 'distribute'
}[j] || j);

const getJustify = ({ j = 'flex-start' }: IFlexContainerProps) => j !== 'flex-start' ? {
    WebkitJustifyContent: j,
    msFlexPack: getMsJustify(j),
    justifyContent: j
} : {};

const getMsAlignItems = (ai: string) => ({
    ['flex-end']: 'end'
}[ai] || ai);

const getAlignItems = ({ ai = 'flex-start' }: IFlexContainerProps) => ai !== 'flex-start' ? {
    WebkitAlignItems: ai,
    msFlexAlign: getMsAlignItems(ai),
    alignItems: ai
} : {};

const getMsAlignContent = getMsJustify;

const getAlignContent = ({ ac = 'flex-start' }: IFlexContainerProps) => ac !== 'flex-start' ? {
    WebkitAlignContent: ac,
    msFlexLinePack: getMsAlignContent(ac),
    aAlignContent: ac
} : {};

export const Flex: React.StatelessComponent<IFlexContainerProps> = ({
    is,
    className = '',
    ...props
}: IFlexContainerProps = {}) => {
    const Container = is || 'div';

    return <Container
        className={ classNames({
            [s.flex]: true,
            [className]: !!className
        }) }
        style={ {
        ...getDirection(props),
        ...getWrap(props),
        ...getJustify(props),
        ...getAlignItems(props),
        ...getAlignContent(props)
    } }
    >
        { props.children }
    </Container>;
};
