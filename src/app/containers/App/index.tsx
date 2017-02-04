import * as React from 'react';
import * as Helmet from 'react-helmet';
import { IHeadlines } from 'models/headlines';

import { SiteHeader } from 'components';
import { getHeadlines } from 'redux/modules/headlines/index';
import { randomFromArray } from 'utils/randomFromArray';

const { connect } = require('react-redux');
const { asyncConnect } = require('redux-connect');
const appConfig = require('../../../../config/main');
const s = require('./style.css');

interface IProps {
    headlines: IHeadlines;
    location: {
        pathname: string;
    };
}

@asyncConnect([{
    promise: ({ store: { dispatch } }) => dispatch(getHeadlines())
}])
@connect(
    ({ headlines }) => ({ headlines })
)
class App extends React.PureComponent<IProps, any> {
    public componentWillMount() {
        this.setState({
            headline: '...'
        });
    }

    public componentDidMount() {
        this.updateHeadline();
    }

    public componentWillUpdate(prevProps: IProps) {
        if (this.props.location.pathname !== prevProps.location.pathname) {
            this.updateHeadline();
        }
    }

    private updateHeadline() {
        this.setState({
            headline: randomFromArray(this.props.headlines.headlines)
        });
    }

    public render() {
        const { headline } = this.state;

        return (
            <div className={ s.appContainer }>
                <Helmet
                    { ...appConfig.app }
                    { ...appConfig.app.head }
                />
                <SiteHeader
                    headline={ headline }
                />
                { this.props.children }
            </div>
        );
    }
}

export { App }
