import * as React from 'react';
import * as Helmet from 'react-helmet';

import { SiteHeader } from 'components';
import { getHeadlines, headlinesSet } from 'redux/modules/headlines';

const { connect } = require('react-redux');
const { asyncConnect } = require('redux-connect');
const appConfig = require('../../../../config/main');
const s = require('./style.css');

interface IProps {
    headline: string;
    location: {
        pathname: string;
    };
    changeHeadline(): void;
}

@asyncConnect(
    [{
        promise: ({ store: { dispatch } }) => dispatch(getHeadlines())
    }]
)
@connect(
    ({ headlines }) => ({ headline: headlines.current }),
    (dispatch) => ({ changeHeadline: () => dispatch(headlinesSet()) })
)
class App extends React.PureComponent<IProps, any> {
    public componentDidUpdate(prevProps: IProps) {
        if (prevProps.location.pathname !== this.props.location.pathname) {
            this.props.changeHeadline();
        }
    }

    public render() {
        const { headline, children } = this.props;

        return (
            <div className={ s.appContainer }>
                <Helmet
                    { ...appConfig.app }
                    { ...appConfig.app.head }
                />
                <SiteHeader
                    headline={ headline }
                />
                { children }
            </div>
        );
    }
}

export { App }
