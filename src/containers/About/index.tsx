import * as React from 'react';

import * as s from './style.css';

class About extends React.Component<any, any> {
    public render(): JSX.Element {
        return (
            <div className={ s.about }>
                <h4>About</h4>
            </div>
        );
    }
}

export { About }
