import * as React from 'react';
import * as Helmet from 'react-helmet';
import { asyncConnect } from 'redux-connect';

import { getHeadlines, headlinesSet } from 'state/headlines';
import { getCategories } from 'state/categories';
import { SiteHeader } from 'components';

// Models
import { IApplication } from 'models/appication';

// Styles
const s = require('./style.css');

const path = require('ramda/src/path');

interface IProps {
    headline: string;
    application: IApplication;
    location: {
        pathname: string;
    };
    changeHeadline(): void;
}

const headlinePath = path(['current', 'content']);
const pathnamePath = path(['location', 'pathname']);

@asyncConnect(
    [{
        promise: ({ store: { dispatch } }) => Promise.all([
            dispatch(getHeadlines()),
            dispatch(getCategories())
        ])
    }],
    ({
        headlines,
        application
    }) => ({
        headline: headlinePath(headlines),
        application
    }),
    (dispatch) => ({ changeHeadline: () => dispatch(headlinesSet()) })
)
class App extends React.Component<IProps, any> {
    public componentDidUpdate(prevProps: IProps) {
        if (pathnamePath(prevProps) !== pathnamePath(this.props)) {
            this.props.changeHeadline();
        }
    }

    public render() {
        const {
            headline,
            children,
            application: {
                title,
                titleTemplate,
                head: {
                    meta,
                    link
                }
            }
        } = this.props;

        return (
            <div className={ s.appContainer }>
                <Helmet
                    title={ title }
                    titleTemplate={ titleTemplate }
                    meta={ meta }
                    link={ link }
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
