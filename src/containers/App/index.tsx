import * as React from 'react';
import * as Helmet from 'react-helmet';
import { asyncConnect } from 'redux-connect';

import { SiteHeader } from 'components';
import { getCategories } from 'state/categories';
import { runGlobalActions } from 'state/globalActions';
import { getHeadlines, headlinesSet } from 'state/headlines';
// import { userLogin } from 'state/user';

// Models
import { IApplication } from 'models/appication';
import { IAsyncConnectArguments, IStore } from 'models/store';
import { Dispatch } from 'redux';

// Styles
const s = require('./style.css');

const path = require('ramda/src/path');

interface IProps {
    dispatch: Dispatch<IStore>;
    headline: string;
    application: IApplication;
    location: {
        pathname: string;
    };
    changeHeadline(): void;
}

const headlinePath = path(['current', 'content']);

@asyncConnect(
    [{
        promise:
            ({ store: { dispatch } }: IAsyncConnectArguments): Promise<void> => runGlobalActions(
                dispatch,
                [
                    getHeadlines,
                    getCategories
                ],
                [
                    headlinesSet
                ]
            )

    }],
    ({
        headlines,
        application
    }: IStore) => ({
        headline: headlinePath(headlines),
        application
    })
)
class App extends React.Component<IProps, {}> {
    // public componentDidMount(): void {
    //     this.props.dispatch(userLogin());
    // }

    public render(): JSX.Element {
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
