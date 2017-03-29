import * as cn from 'classnames';
import * as React from 'react';

const s = require('./style.css');

interface IFlexContainerProps extends React.HTMLProps<HTMLElement> {
    is?: string; // Container
    d?: 'row' | 'row-reverse' | 'column' | 'column-reverse'; // Direction
    w?: 'nowrap' | 'wrap' | 'wrap-reverse'; // Wrap
    j?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around'; // Justify-content
    ai?: 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch'; // Align items
    ac?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'stretch'; // Align content
}

interface IFlexDirection {
    WebkitFlexDirection?: string;
    msFlexDirection?: string;
    flexDirection?: string;
}

interface IFlexWrap {
    WebkitFlexWrap?: string;
    msFlexWrap?: string;
    flexWrap?: string;
}

interface IFlexJustify {
    WebkitJustifyContent?: string;
    msFlexPack?: string;
    justifyContent?: string;
}

interface IFlexAlignItems {
    WebkitAlignItems?: string;
    msFlexAlign?: string;
    alignItems?: string;
}

interface IFlexAlignContent {
    WebkitAlignContent?: string;
    msFlexLinePack?: string;
    aAlignContent?: string;
}

const getDirection = ({ d = 'row' }: IFlexContainerProps): IFlexDirection => d !== 'row' ? {
    WebkitFlexDirection: d,
    msFlexDirection: d,
    flexDirection: d
} : {};

const getWrap = ({ w = 'nowrap' }: IFlexContainerProps): IFlexWrap => w !== 'nowrap' ? {
    WebkitFlexWrap: w,
    msFlexWrap: w,
    flexWrap: w
} : {};

const getMsJustify = (j: string): string => ({
    ['flex-end']: 'end',
    ['space-between']: 'justify',
    ['space-around']: 'distribute'
}[j] || j);

const getJustify = ({ j = 'flex-start' }: IFlexContainerProps): IFlexJustify => j !== 'flex-start' ? {
    WebkitJustifyContent: j,
    msFlexPack: getMsJustify(j),
    justifyContent: j
} : {};

const getMsAlignItems = (ai: string): string => ({
    ['flex-end']: 'end'
}[ai] || ai);

const getAlignItems = ({ ai = 'flex-start' }: IFlexContainerProps): IFlexAlignItems => ai !== 'flex-start' ? {
    WebkitAlignItems: ai,
    msFlexAlign: getMsAlignItems(ai),
    alignItems: ai
} : {};

const getMsAlignContent = getMsJustify;

const getAlignContent = ({ ac = 'flex-start' }: IFlexContainerProps): IFlexAlignContent => ac !== 'flex-start' ? {
    WebkitAlignContent: ac,
    msFlexLinePack: getMsAlignContent(ac),
    aAlignContent: ac
} : {};

const Flex: React.StatelessComponent<IFlexContainerProps> = ({
    is,
    className = '',
    ...props
}: IFlexContainerProps = {}): JSX.Element => {
    const Container = is || 'div';

    return (
        <Container
            className={ cn({
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
        </Container>
    );
};

Flex.displayName = 'Flex';

export { Flex };
