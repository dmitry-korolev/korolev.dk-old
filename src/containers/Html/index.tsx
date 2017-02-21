import * as React from 'react';
import * as Helmet from 'react-helmet';
import { Store } from 'redux';

// Types
import { IStore } from 'models/store';

interface IHtmlProps {
    manifest?: Object;
    markup?: string;
    store?: Store<IStore>;
}

class Html extends React.Component<IHtmlProps, {}> {
    private resolve(files: any[]): any[] {
        return files.map((src: string) => {
            if (!this.props.manifest[src]) { return; }
            return '/public/' + this.props.manifest[src];
        }).filter((file: any) => file !== undefined);
    }

    public render(): JSX.Element {
        const head = Helmet.rewind();
        const { markup, store } = this.props;

        const styles = this.resolve(['vendor.css', 'app.css']);
        const renderStyles = styles.map((src: string, i: number) =>
            <link key={ i } rel='stylesheet' type='text/css' href={ src } />
        );

        const scripts = this.resolve(['vendor.js', 'app.js']);
        const renderScripts = scripts.map((src: string, i: number) =>
            <script src={ src } key={ i } />
        );

        const initialState = <script
            dangerouslySetInnerHTML={
                {
                    __html: `window.__INITIAL_STATE__="${encodeURIComponent(JSON.stringify(store.getState()))}";`
                }
            }
            charSet='UTF-8'
        />;

        return (
            <html>
            <head>
                { head.base.toComponent() }
                { head.title.toComponent() }
                { head.meta.toComponent() }
                { head.link.toComponent() }
                { head.script.toComponent() }

                { renderStyles }
                <link rel='shortcut icon' href='/favicon.ico' />
            </head>
            <body>
            <main id='app' dangerouslySetInnerHTML={ { __html: markup } } />
            { initialState }
            { renderScripts }
            </body>
            </html>
        );
    }
}

export { Html }
