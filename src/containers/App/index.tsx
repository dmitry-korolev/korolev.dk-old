import * as React from 'react';
import * as Helmet from 'react-helmet';
import { asyncConnect } from 'redux-connect';
import { path } from 'utils/ramda';

import { SiteHeader } from 'components';
import { runGlobalActions } from 'state/globalActions';
import { getHeadlines, headlinesSet } from 'state/headlines';
import { getTags } from 'state/tags';

// Models
import { IApplication } from 'models/appication';
import { IConnectArguments, IStore } from 'models/store';
import { Dispatch } from 'redux';

// Styles
import * as s from './style.css';

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
            ({ store: { dispatch } }: IConnectArguments): Promise<void> => runGlobalActions(
                dispatch,
                [
                    getHeadlines,
                    getTags
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
class App extends React.PureComponent<IProps, {}> {
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
