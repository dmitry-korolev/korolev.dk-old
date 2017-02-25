import * as React from 'react';
import * as Helmet from 'react-helmet';
import { asyncConnect } from 'redux-connect';

import { SiteHeader } from 'components';

// Models
import { IApplication } from 'models/appication';
import { IStore } from 'models/store';
import { Dispatch } from 'redux';
import { doActions } from '../../state/globalActions';

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

@asyncConnect(
    [{
        promise:
            ({ store: { dispatch } }: { store: { dispatch: Dispatch<any> } }): Promise<any[]> =>
                doActions(dispatch)
    }],
    ({
        headlines,
        application
    }: IStore) => ({
        headline: headlinePath(headlines),
        application
    })
)
class App extends React.Component<IProps, any> {
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
