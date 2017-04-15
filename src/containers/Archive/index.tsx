import * as React from 'react';
import { asyncConnect } from 'redux-connect';
import { equals, path, pathOr } from 'utils/ramda';

// Actions
import { getPosts } from 'state/posts';

// Components
import { PostList, Pagination } from 'components';
import { IConnectArguments, IStore } from 'models/store';

interface IProps {
    itemIds: string[];
    totalPages: number;
    currentPage: number;
    basePath: string;
}

const basepathP = path(['location', 'basepath']);
const pageNumberP = pathOr(1, ['params', 'pageNumber']);

@asyncConnect(
    [{
        promise: ({ store: { dispatch, getState }, params: { pageNumber } }: IConnectArguments ): Promise<void> => {
            const { application } = getState();

            return dispatch(getPosts({
                pagination: {
                    pageNumber: pageNumber || 1,
                    key: basepathP(application)
                }
            }));
        }
    }],
    ({ pagination, application }: IStore, { router }: any) => {
        const basePath = basepathP(application);
        const pageNumber = pageNumberP(router);

        return {
            itemIds: path([basePath, pageNumber], pagination) || [],
            totalPages: path([basePath, 'totalPages'], pagination),
            currentPage: pageNumber,
            basePath
        };
    }
)
class Archive extends React.PureComponent<IProps, any> {
    public shouldComponentUpdate({ itemIds }: IProps): boolean {
        return !equals(this.props.itemIds, itemIds);
    }

    constructor() {
        super();
        this.linkBuilder = this.linkBuilder.bind(this);
    }

    private linkBuilder(pageNumber: number): string {
        const { basePath } = this.props;
        if (pageNumber === 1) {
            return basePath;
        }

        return `${basePath}page/${pageNumber}`;
    }

    public render(): JSX.Element {
        const {
            itemIds,
            totalPages,
            currentPage
        } = this.props;

        return (
            <div>
                <section>
                    <PostList
                        itemIds={ itemIds }
                    />
                </section>
                <Pagination
                    currentPage={ currentPage }
                    linkBuilder={ this.linkBuilder }
                    pageCount={ totalPages }
                />
            </div>
        );
    }
}

export { Archive }
