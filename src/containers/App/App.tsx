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

// Styles
import * as styles from './App.css';

interface IProps {
    headline: string;
    application: IApplication;
    isMainPage: boolean;
}

const headlinePath = path(['current', 'content']);
const mapState = ({
      headlines,
      application
}: IStore): IProps => ({
    headline: headlinePath(headlines),
    application,
    isMainPage: application.location.pathname === '/'
});

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
    mapState
)
class App extends React.PureComponent<IProps, object> {
    public render(): JSX.Element {
        const {
            headline,
            children,
            isMainPage,
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
            <div className={ styles.appContainer }>
                <Helmet
                    title={ title }
                    titleTemplate={ titleTemplate }
                    meta={ meta }
                    link={ link }
                />
                <SiteHeader
                    isMainPage={ isMainPage }
                    headline={ headline }
                />
                { children }
            </div>
        );
    }
}

export { App }
